# Portfolio Backend

FastAPI backend for the AI Portfolio Assistant chatbot.
Uses Claude API to answer questions about Yaqub's resume, projects, and skills.

## Requirements

- Python 3.10+
- An Anthropic API key — get one at https://console.anthropic.com

## Setup

```bash
cd portfolio-backend

# Create and activate a virtual environment
python -m venv venv
venv\Scripts\activate        # Windows
# source venv/bin/activate   # Mac/Linux

# Install dependencies
pip install -r requirements.txt

# Create your .env file
copy .env.example .env       # Windows
# cp .env.example .env       # Mac/Linux
```

Open `.env` and replace `your_api_key_here` with your real Anthropic API key.

## Run

```bash
uvicorn main:app --reload
```

Server starts at **http://localhost:8000**

Health check: open http://localhost:8000 in your browser.
You should see: `{"status": "Portfolio backend is running"}`

## How it works

1. On startup, all `.txt` files in `/data` are loaded into memory
2. When the frontend sends a `POST /chat` with a user message, the backend finds the most relevant data file(s) using keyword matching
3. The matched context is passed to Claude as a system prompt
4. Claude's response is returned to the frontend as JSON

## Files

```
portfolio-backend/
├── main.py            # FastAPI app and /chat endpoint
├── requirements.txt   # Python dependencies
├── .env.example       # Environment variable template
├── .gitignore         # Keeps .env out of Git
└── data/
    ├── resume.txt     # Name, contact, background
    ├── projects.txt   # All four projects with bullets
    ├── skills.txt     # Tech stack
    └── coursework.txt # Degree and relevant courses
```
