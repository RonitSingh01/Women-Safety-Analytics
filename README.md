

## Women Safety Analytics App
A full-stack, AI-powered women's safety platform built with React, Node.js, and Google's Gemini LLM. It analyzes real-time user situations and provides a situational risk assessment.

### Features
- **AI Threat Analysis**: Leverages Google Gemini (`gemini-2.5-flash`) via the `@google/genai` SDK to process user text and location.
- **Risk Assessment**: Outputs a categorized `threatLevel` (Low, Medium, High), a numerical `threatScore`, a detailed `analysis`, and tailored `safetyTips`.
- **Alert System**: Built-in routing for alerts and safety notifications.

### Tech Stack
*   **Frontend**: React (Vite), Tailwind CSS, React Router, Axios, Lucide React icons.
*   **Backend**: Node.js, Express, MongoDB (Mongoose), `multer` for data handling.
*   **AI Integration**: Google Gen AI SDK.

### Setup Instructions

#### Prerequisites
- Node.js installed
- MongoDB URI
- Google Gemini API Key
- Groq API Key (for the Jupyter notebook)

#### Backend Setup
1. Navigate to the backend folder: `cd "GEN AI Assignment/backend"`
2. Install dependencies: `npm install`
3. Create a `.env` file based on `.env.example` and add your keys (e.g., `GEMINI_API_KEY`, `PORT`, MongoDB URI).
4. Start the server: `npm start` (or `node server.js`) - runs on port 5000 by default.

#### Frontend Setup
1. Navigate to the frontend folder: `cd "GEN AI Assignment/frontend"`
2. Install dependencies: `npm install`
3. Start the Vite development server: `npm run dev`

### Future Enhancements
- Expand location processing and real-time mapping.
- Add image-based threat evaluation.
- Enhance UI/UX with more interactive dashboards.
