import os
from pathlib import Path

import anthropic
from dotenv import load_dotenv
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

# ---------------------------------------------------------------------------
# Load environment variables from .env
# ---------------------------------------------------------------------------
load_dotenv()

ANTHROPIC_API_KEY = os.getenv("ANTHROPIC_API_KEY")
CLAUDE_MODEL = os.getenv("CLAUDE_MODEL", "claude-haiku-4-5-20251001")

if not ANTHROPIC_API_KEY:
    raise RuntimeError("ANTHROPIC_API_KEY is not set. Copy .env.example to .env and add your key.")

# ---------------------------------------------------------------------------
# App setup
# ---------------------------------------------------------------------------
app = FastAPI(title="Portfolio Assistant API")

# Allow requests from the React frontend (Vite runs on port 5173 by default)
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ---------------------------------------------------------------------------
# Load all data files once at startup
# ---------------------------------------------------------------------------
DATA_DIR = Path(__file__).parent / "data"

def load_data_files() -> dict[str, str]:
    """Read every .txt file in /data and store by name (without extension)."""
    data = {}
    for filepath in DATA_DIR.glob("*.txt"):
        key = filepath.stem          # e.g. "resume", "projects", "skills"
        data[key] = filepath.read_text(encoding="utf-8")
    return data

KNOWLEDGE: dict[str, str] = load_data_files()

# ---------------------------------------------------------------------------
# Simple keyword-based context search
# ---------------------------------------------------------------------------

# Map query keywords → which data file is most relevant
KEYWORD_MAP: dict[str, list[str]] = {
    "resume":     ["resume", "background", "about", "who is", "contact", "email", "linkedin", "github", "hire", "available"],
    "projects":   ["project", "built", "build", "fabflix", "movie", "crawler", "crawl", "nlp",
                   "search engine", "inverted", "tf-idf", "portfolio", "assistant"],
    "skills":     ["skill", "tech", "language", "framework", "tool", "stack", "know", "python",
                   "javascript", "react", "java", "sql", "docker", "flask", "fastapi"],
    "coursework": ["course", "coursework", "education", "degree", "school", "university",
                   "study", "class", "graduate", "graduation", "gpa"],
}

def search_context(query: str) -> str:
    """
    Return the most relevant sections from the data files for a given query.
    Falls back to all sections if no keyword matches.
    """
    query_lower = query.lower()
    matched_sections: list[str] = []

    for section, keywords in KEYWORD_MAP.items():
        if any(kw in query_lower for kw in keywords):
            if section in KNOWLEDGE:
                matched_sections.append(
                    f"=== {section.upper()} ===\n{KNOWLEDGE[section]}"
                )

    # If nothing matched, send all context so Claude can still give a useful answer
    if not matched_sections:
        matched_sections = [
            f"=== {key.upper()} ===\n{text}"
            for key, text in KNOWLEDGE.items()
        ]

    return "\n\n".join(matched_sections)

# ---------------------------------------------------------------------------
# Request / Response models
# ---------------------------------------------------------------------------

class ChatRequest(BaseModel):
    message: str

class ChatResponse(BaseModel):
    reply: str

# ---------------------------------------------------------------------------
# Endpoints
# ---------------------------------------------------------------------------

@app.get("/")
def root():
    """Health check — visit http://localhost:8000 to confirm the server is running."""
    return {"status": "Portfolio backend is running"}


@app.post("/chat", response_model=ChatResponse)
def chat(request: ChatRequest):
    """
    Accept a user message, find relevant context from the data files,
    and return Claude's answer.
    """
    if not request.message.strip():
        raise HTTPException(status_code=400, detail="Message cannot be empty.")

    # 1. Find the most relevant context for this question
    context = search_context(request.message)

    # 2. Build the system prompt — Claude stays grounded in Yaqub's real info
    system_prompt = f"""You are an AI assistant embedded in Yaqub Hasan's portfolio website.
Your only job is to answer questions about Yaqub's background, education, technical skills,
and projects — based strictly on the information provided below.

Rules:
- Only use facts that appear in the provided information.
- If something is not mentioned, say "I don't have that information."
- Do not invent internships, companies, GPA, school name, or projects.
- Be concise and professional. Aim for 2–4 sentences unless more detail is clearly needed.
- Refer to Yaqub in the third person (e.g. "Yaqub has..." or "He built...").

Yaqub's information:
{context}"""

    # 3. Call the Claude API
    client = anthropic.Anthropic(api_key=ANTHROPIC_API_KEY)

    response = client.messages.create(
        model=CLAUDE_MODEL,
        max_tokens=512,
        system=system_prompt,
        messages=[
            {"role": "user", "content": request.message}
        ],
    )

    reply_text = response.content[0].text
    return ChatResponse(reply=reply_text)
