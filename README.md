# Gen AI Assignment Project

This repository contains two main components: a practical lab on prompt engineering using Groq and a full-stack Generative AI application for Women Safety Analytics.

## 1. Prompt Engineering Lab (`Lab_Assignment.ipynb`)
A Jupyter notebook demonstrating the capabilities of LLMs using the Groq API (`llama-3.1-8b-instant`). It covers several crucial prompt engineering techniques:
- **Zero-Shot Prompting**: Direct task execution without examples.
- **Few-Shot Prompting**: Providing examples to guide the model's output (e.g., sentiment classification).
- **Chain of Thought (CoT)**: Step-by-step reasoning for problem-solving.
- **Tree of Thoughts/Consistency Check**: Solving a problem using multiple reasoning paths to find the most consistent answer.

## 2. Women Safety Analytics App (`GEN AI Assignment/`)
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
