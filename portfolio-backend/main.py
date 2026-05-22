import os
from pathlib import Path

from dotenv import load_dotenv
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

# ---------------------------------------------------------------------------
# Load environment variables from .env (optional — backend works without it)
# ---------------------------------------------------------------------------
load_dotenv()

ANTHROPIC_API_KEY = os.getenv("ANTHROPIC_API_KEY", "")
CLAUDE_MODEL      = os.getenv("CLAUDE_MODEL", "claude-haiku-4-5-20251001")

# ---------------------------------------------------------------------------
# App setup
# ---------------------------------------------------------------------------
app = FastAPI(title="Portfolio Assistant API")

# Allow requests from any origin (covers Vercel, localhost, and future deployments)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ---------------------------------------------------------------------------
# Load all data files once at startup
# ---------------------------------------------------------------------------
DATA_DIR = Path(__file__).parent / "data"

def load_data_files() -> dict:
    """Read every .txt file in /data and store by name (without extension)."""
    data = {}
    for filepath in DATA_DIR.glob("*.txt"):
        key = filepath.stem      # e.g. "resume", "projects", "skills"
        data[key] = filepath.read_text(encoding="utf-8")
    return data

KNOWLEDGE: dict = load_data_files()

# ---------------------------------------------------------------------------
# Simple keyword-based context search (used by Claude path)
# ---------------------------------------------------------------------------
KEYWORD_MAP: dict = {
    "resume":     ["resume", "background", "about", "who is", "contact", "email",
                   "linkedin", "github", "hire", "available"],
    "projects":   ["project", "built", "build", "fabflix", "movie", "crawler", "crawl",
                   "nlp", "search engine", "inverted", "tf-idf", "portfolio", "assistant"],
    "skills":     ["skill", "tech", "language", "framework", "tool", "stack", "know",
                   "python", "javascript", "react", "java", "sql", "docker", "flask", "fastapi"],
    "coursework": ["course", "coursework", "education", "degree", "school", "university",
                   "study", "class", "graduate", "graduation", "gpa", "bachelor"],
}

def search_context(query: str) -> str:
    """Return the most relevant sections from the data files for a given query."""
    query_lower = query.lower()
    matched: list = []

    for section, keywords in KEYWORD_MAP.items():
        if any(kw in query_lower for kw in keywords):
            if section in KNOWLEDGE:
                matched.append(f"=== {section.upper()} ===\n{KNOWLEDGE[section]}")

    if not matched:
        matched = [f"=== {key.upper()} ===\n{text}" for key, text in KNOWLEDGE.items()]

    return "\n\n".join(matched)

# ---------------------------------------------------------------------------
# Keyword-based fallback (no API key required)
# ---------------------------------------------------------------------------
def build_fallback_reply(query: str) -> str:
    """
    Compose an accurate answer from local data files using keyword matching.
    No API call required. All facts come directly from the /data files.
    """
    q = query.lower()

    # --- Specific project: Fabflix ---
    if any(kw in q for kw in ["fabflix", "movie", "database migration", "mysql to mongo",
                               "mongodb migration", "tomcat"]):
        return (
            "Yaqub built Fabflix, a full-stack database migration project. "
            "He migrated a movie database application from MySQL to MongoDB, redesigning the schema "
            "for NoSQL scalability. He built Java migration tools to transform relational datasets "
            "into document-based MongoDB collections, and replaced JDBC with the MongoDB Java driver — "
            "implementing authentication, cart, search, and security features."
        )

    # --- Specific project: NLP Search Engine ---
    if any(kw in q for kw in ["nlp", "search engine", "inverted index", "tf-idf", "tfidf",
                               "information retrieval", "nltk", "beautifulsoup"]):
        return (
            "Yaqub built an NLP Search Engine with Inverted Indexing. "
            "It processes large-scale web data using NLP techniques and tf-idf ranking with "
            "compressed index storage. He designed a memory-efficient partial indexing system to "
            "handle large datasets, and built both a CLI and Flask-based web interface with "
            "millisecond-level query response times."
        )

    # --- Specific project: Distributed Web Crawler ---
    if any(kw in q for kw in ["crawler", "crawl", "web crawler", "distributed crawler",
                               "multithreading", "url frontier", "url dedup"]):
        return (
            "Yaqub built a Distributed Web Crawler in Python. "
            "It collects and processes large volumes of web pages from distributed cache servers, "
            "with URL frontier management, filtering, deduplication, and HTML parsing. "
            "It enforces politeness policies and rate limiting for compliant crawling behavior."
        )

    # --- Specific project: AI Portfolio Assistant ---
    if any(kw in q for kw in ["portfolio", "assistant", "this website", "this site",
                               "this project", "chatbot"]):
        return (
            "The AI Portfolio Assistant is the project you're currently viewing! "
            "Yaqub built a React + Vite frontend with a FastAPI backend that uses the Claude API "
            "to answer questions about his resume and projects. Context is retrieved from structured "
            "data files using keyword matching, grounding responses in real resume data. "
            "He used AI-assisted development workflows throughout the build."
        )

    # --- All projects ---
    if any(kw in q for kw in ["project", "built", "build", "what has he", "what have you"]):
        return (
            "Yaqub has built four projects: "
            "(1) AI Portfolio Assistant — a React + FastAPI app with an integrated Claude-powered chatbot; "
            "(2) Fabflix — a full-stack database migration from MySQL to MongoDB using Java; "
            "(3) NLP Search Engine — a Python search engine using inverted indexing and tf-idf ranking; "
            "(4) Distributed Web Crawler — a Python multithreaded crawler with URL deduplication "
            "and rate limiting."
        )

    # --- Skills / tech stack ---
    if any(kw in q for kw in ["skill", "tech", "stack", "language", "framework", "tool",
                               "know", "python", "javascript", "react", "java", "sql",
                               "docker", "flask", "fastapi", "experience with", "proficient",
                               "technologies", "programming"]):
        return (
            "Yaqub's technical skills include: "
            "Languages — JavaScript, Python, C/C++, SQL. "
            "Frameworks & Tools — React, Node.js, Flask, FastAPI, Docker, Git, Apache Tomcat. "
            "Databases — MongoDB, MySQL. "
            "AI & Developer Tools — Claude API, OpenAI API, GitHub Copilot, Prompt Engineering, "
            "AI-Assisted Development. "
            "Concepts — Data Structures & Algorithms, REST APIs, Full-Stack Development, "
            "Object-Oriented Programming, Retrieval-Augmented Generation."
        )

    # --- Education / coursework ---
    if any(kw in q for kw in ["education", "degree", "school", "university", "course",
                               "coursework", "study", "graduate", "gpa", "major", "bachelor",
                               "computer science"]):
        return (
            "Yaqub holds a Bachelor of Science in Computer Science, graduated December 2025. "
            "Relevant coursework includes: Data Structures, Computer Organization, "
            "Computer Systems and Programming, Operating Systems, "
            "Design and Analysis of Algorithms, Database Management Systems, "
            "Software Engineering, Linear Algebra, and Discrete Mathematics."
        )

    # --- Contact / availability ---
    if any(kw in q for kw in ["contact", "email", "hire", "available", "reach", "linkedin",
                               "github", "opportunity", "role", "job", "full-time",
                               "full time", "looking for"]):
        return (
            "Yaqub is actively looking for full-time software engineering roles. "
            "You can reach him at yaqubhasann@gmail.com, "
            "on GitHub at github.com/yaqubhasan, "
            "or on LinkedIn at linkedin.com/in/yaqub-hasan."
        )

    # --- Background / about ---
    if any(kw in q for kw in ["who", "about", "background", "yaqub", "tell me", "introduce",
                               "summary", "overview"]):
        return (
            "Yaqub Hasan is a Computer Science graduate (December 2025) focused on full-stack "
            "web development, databases, search systems, and AI-integrated applications. "
            "He builds practical software projects and uses AI-assisted development workflows, "
            "and is actively looking for full-time software engineering roles."
        )

    # --- Default ---
    return (
        "I can answer questions about Yaqub's skills, projects, education, and background. "
        "Try asking: 'What projects has he built?', 'What is his tech stack?', "
        "'Tell me about his education', or 'How do I contact him?'"
    )

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
    return {"status": "Portfolio backend is running"}


@app.post("/chat", response_model=ChatResponse)
def chat(request: ChatRequest):
    """
    Accept a user message and return a reply.
    Tries the Claude API first; falls back to local keyword matching if the
    API key is missing, invalid, or has insufficient credits.
    """
    if not request.message.strip():
        raise HTTPException(status_code=400, detail="Message cannot be empty.")

    # --- Attempt Claude API (optional) ---
    if ANTHROPIC_API_KEY:
        try:
            import anthropic

            context = search_context(request.message)

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

            client   = anthropic.Anthropic(api_key=ANTHROPIC_API_KEY)
            response = client.messages.create(
                model=CLAUDE_MODEL,
                max_tokens=512,
                system=system_prompt,
                messages=[{"role": "user", "content": request.message}],
            )
            return ChatResponse(reply=response.content[0].text)

        except Exception:
            # API unavailable, no credits, bad key — fall through to local fallback
            pass

    # --- Local fallback (always works, no API key needed) ---
    return ChatResponse(reply=build_fallback_reply(request.message))
