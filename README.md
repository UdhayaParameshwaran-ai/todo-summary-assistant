# Todo Summary Assistant

### A full-stack web app to manage todos, summarize them using Google GenAI, and send to Slack using Incoming Webhook URL.

---

## Technologies Used

- **Frontend**: React + Tailwind CSS + Vite
- **Backend**: Node.js + Express
- **Database**: Supabase (PostgreSQL)
- **LLM**: Google GenAi
- **Slack**: Incoming Webhooks URL

---

## Setup Instructions

### 1. Clone the repository

```bash
git clone https://github.com/UdhayaParameshwaran-ai/todo-summary-assistant.git
cd todo-summary-assistant

```

### 2. Slack & LLM Setup

#### 2.a)Slack Setup

- Navigate to https://api.slack.com/apps.
- Choose the app from the list.
- Ensure you’re on the app’s “Incoming Webhooks” page under the “Features” menu.
- Click on the toggle button to activate incoming webhooks.
- On the incoming webhooks settings page, you will see the newly generated webhook URL.
- Customize the “Name” field to give a specific name to the sender of your messages
- Copy the URL into SLACK_WEBHOOK_URL.

#### 2.b)LLM Setup

- Navigate to https://ai.google.dev/gemini-api/docs/api-key
- Click 'Get a Gemini API key in Google AI Studio' Button
- Generate a new API Key
- Paste it into GENAI_API_KEY.

### 3. To Setup environment variables

- Rename .env.example into .env files in the backend directory
- Replace placeholder values with your actual keys

### 4. To Start the backend

```
cd backend
npm install
npm start
```

### 5. To Start the frontend

```
cd frontend
npm install
npm run dev
```

---

## Design/Architecture Decisions

- Modular backend using routes/ and services/ for scalability.
- Google GenAi LLM integration chosen for summarization.
- Supabase used for fast development with instant RESTful endpoints and PostgreSQL.
- Slack incoming webhook chosen for simple integration
- Frontend styled with React + Tailwind CSS for quick, responsive UI.

---

### API Endpoints

- GET /todos – Fetch all todos.
- POST /todos – Add a new todo.
- DELETE /todos/:id – Delete a todo.
- POST /summarize – Summarize todos and send to Slack.

---

## Screeshots

### UI of the application

### Slack channel post message
