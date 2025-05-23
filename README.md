# 🐱 Cat Classifier Web App

A sleek, modern web application that classifies cat images using a machine learning backend. Built with React and React-Bootstrap, this app features a minimalist interface and smooth UX.

## Features

- Drag and drop or browse to upload cat images
- Predictions powered by a Flask + PyTorch backend
- Prediction result and image are persisted across page refresh
- Responsive and modern Apple-inspired UI
- Dynamic file labeling: “Upload another image” if an image exists
- Route navigation between Home (`/`) and Cats (`/cats`) pages

## Tech Stack

- **Frontend**: React, React Router DOM, React-Bootstrap
- **Styling**: Custom CSS with modern glassmorphism, utility-first spacing
- **Backend**: Flask (runs independently)
- **ML Model**: PyTorch-based CNN (e.g. ResNet18 or similar)

## Getting Started

### Prerequisites

- **Node.js** (v16 or later)
- **Python** (3.8+) with Flask backend running at `http://localhost:5000` and exposing a `/predict` endpoint

### Frontend Setup

```bash
git clone https://github.com/your-username/cat-classifier-frontend.git
cd cat-classifier-frontend
npm install
npm run dev
```

### Backend (Flask) Setup

```bash
cd cat-classifier-backend
pip install -r requirements.txt
python app.py
```

Ensure the `/predict` endpoint accepts image uploads and returns:

```json
{ "prediction": "toothless" }
```

## License

MIT
