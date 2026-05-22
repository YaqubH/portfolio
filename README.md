# AI Portfolio Assistant

A personal portfolio website with an integrated AI chatbot that answers questions about my resume, projects, and technical background. The chatbot is powered by the Claude API via a FastAPI backend, with context retrieved from structured resume data files.

---

## Screenshots

> _Add screenshots here once deployed._

| Portfolio Home | Chatbot in Action |
|---|---|
| `[screenshot]` | `[screenshot]` |

---

## Features

- **AI Chatbot** — Floating chat UI that sends questions to Claude API and returns grounded, accurate answers about Yaqub's background
- **Context-Aware Responses** — Backend uses keyword matching to find the most relevant resume data before querying Claude
- **Portfolio Sections** — Hero, Skills, Projects, Education & Coursework, and Contact
- **Project Cards** — All four projects displayed with real GitHub links and bullet-point descriptions
- **Error Handling** — Chatbot displays a clear message if the backend is unreachable
- **Mobile Responsive** — Layout and chat panel adapt to all screen sizes
- **Suggestion Chips** — Quick-start prompts shown when the chatbot first opens

---

## Tech Stack

### Frontend
| Technology | Purpose |
|---|---|
| React 18 | UI framework |
| Vite | Build tool and dev server |
| Tailwind CSS | Styling |
| Lucide React | Icons |

### Backend
| Technology | Purpose |
|---|---|
| Python | Backend language |
| FastAPI | API framework |
| Anthropic SDK | Claude API client |
| python-dotenv | Environment variable management |
| Uvicorn | ASGI server |

---

## Folder Structure

```
Desktop/
├── portfolio-frontend/          # React frontend
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.jsx
│   │   │   ├── Hero.jsx
│   │   │   ├── Skills.jsx
│   │   │   ├── Projects.jsx
│   │   │   ├── Experience.jsx   # Education & Coursework section
│   │   │   ├── Contact.jsx
│   │   │   └── ChatBot.jsx
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── index.html
│   ├── tailwind.config.js
│   ├── vite.config.js
│   └── package.json
│
└── portfolio-backend/           # FastAPI backend
    ├── data/
    │   ├── resume.txt           # Name, contact info, background
    │   ├── projects.txt         # All four projects with bullets
    │   ├── skills.txt           # Full tech stack
    │   └── coursework.txt       # Degree and relevant courses
    ├── main.py                  # FastAPI app and /chat endpoint
    ├── requirements.txt
    ├── .env.example
    └── .gitignore
```

---

## Setup & Running

### 1. Backend

```bash
cd portfolio-backend

# Create and activate a virtual environment
python -m venv venv
venv\Scripts\activate          # Windows
# source venv/bin/activate     # Mac / Linux

# Install dependencies
pip install -r requirements.txt

# Create your .env file
copy .env.example .env         # Windows
# cp .env.example .env         # Mac / Linux
```

**Start the server:**

```bash
uvicorn main:app --reload
```

Backend runs at **http://localhost:8000**

Confirm it's working: open http://localhost:8000 in your browser. You should see:
```json
{"status": "Portfolio backend is running"}
```

---

### 2. Frontend

```bash
cd portfolio-frontend
npm install
npm run dev
```

Frontend runs at **http://localhost:5173**

> **Important:** Start the backend before opening the frontend. The chatbot calls `http://localhost:8000/chat` — if the backend is not running, it will show an error message in the chat window.

---

## Environment Variables

Copy `.env.example` to `.env` inside `portfolio-backend/` and fill in your values:

```env
ANTHROPIC_API_KEY=your_api_key_here
CLAUDE_MODEL=claude-haiku-4-5-20251001
```

- Get your API key at [console.anthropic.com](https://console.anthropic.com)
- `CLAUDE_MODEL` can be changed to any Anthropic model (e.g. `claude-sonnet-4-6` for higher quality)
- **Never commit your `.env` file** — it is already listed in `.gitignore`

---

## How the Chatbot Works

1. User types a question in the chat panel
2. The React frontend sends a `POST /chat` request to FastAPI with the message
3. The backend runs a keyword search across the four data files to find the most relevant context
4. The matched context is injected into Claude's system prompt, grounding its answers in real resume data
5. Claude's response is returned as JSON and displayed in the chat

The keyword matching prevents Claude from hallucinating content not in the data files. If no keywords match, all four files are passed as context.

---

## Example Chatbot Questions

```
What projects has Yaqub built?
What is his tech stack?
Tell me about the Fabflix project.
What is the NLP Search Engine?
What programming languages does he know?
What courses has he taken?
What is his educational background?
How do I contact him?
Is he available for full-time roles?
What AI tools has he worked with?
```

---

## Projects

| Project | Tech | GitHub |
|---|---|---|
| AI Portfolio Assistant | React, FastAPI, Claude API, Python | [yaqubhasan](https://github.com/yaqubhasan) |
| Fabflix: Full-Stack DB Migration | Java, MySQL, MongoDB, Tomcat | [repo](https://github.com/uci-jherold2-fall25-cs122b/2025-fall-cs-122b-y) |
| NLP Search Engine | Python, Flask, NLTK, BeautifulSoup | [repo](https://github.com/nobantahir/NLP_Web_Search_Engine) |
| Distributed Web Crawler | Python, Multithreading, Networking | [repo](https://github.com/Yuanbao2000/Yuanbao2000-cs121_A2Crawler) |

---

## Future Improvements

- **Semantic search** — Replace keyword matching with vector embeddings and a database like Chroma or Pinecone for more accurate context retrieval
- **Contact form backend** — Wire the contact form to send real emails
- **Streaming responses** — Stream Claude's reply token by token for a faster-feeling chat experience
- **Deployment** — Host frontend on Vercel and backend on Render or Railway
- **Live project links** — Add demo URLs to project cards once projects are deployed
- **Conversation memory** — Pass message history to Claude so the chatbot can reference earlier parts of the conversation

---

## Author

**Yaqub Hasan**
- Email: [yaqubhasann@gmail.com](mailto:yaqubhasann@gmail.com)
- GitHub: [github.com/yaqubhasan](https://github.com/yaqubhasan)
- LinkedIn: [linkedin.com/in/yaqub-hasan](https://linkedin.com/in/yaqub-hasan)
