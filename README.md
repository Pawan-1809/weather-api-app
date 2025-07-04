# 🚀 WeatherX Dashboard

![FastAPI](https://img.shields.io/badge/FastAPI-005571?style=for-the-badge&logo=fastapi&logoColor=white)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![OpenWeatherMap](https://img.shields.io/badge/OpenWeatherMap-FFB300?style=for-the-badge&logo=OpenWeatherMap&logoColor=black)

> **A futuristic, glassmorphism/cyberpunk-inspired weather dashboard.**

---

## 🌐 Live Demo

- **Frontend:** [Vercel/Netlify Link Here](#)
- **Backend API:** [Render/Railway Link Here](#)

---

## ✨ Features
- Real-time weather & 5-day forecast (OpenWeatherMap)
- Search by city, instant results
- Glassmorphism & cyberpunk UI (parallax, particles, gradients)
- Responsive, mobile-friendly, smooth transitions
- Animated forecast cards, interactive effects

---

## 📸 Screenshots

| Home (Initial) | Weather + Forecast |
|:-------------:|:-----------------:|
| ![screenshot1](assets/screenshot1.png) | ![screenshot2](assets/screenshot2.png) |

---

## 🏗️ Project Structure

```
/backend
  main.py
  requirements.txt
  Procfile
  /routers
    weather.py
    __init__.py
/frontend
  index.html
  styles.css
  scripts.js
```

---

## 🚀 Getting Started

### 1. Clone the Repo
```bash
git clone https://github.com/Pawan-1809/weather-api-app.git
cd weather-api-app
```

### 2. Backend Setup (FastAPI)
```bash
cd backend
pip install -r requirements.txt
# Set your OpenWeatherMap API key:
# Windows:
set OPENWEATHER_API_KEY=your_api_key_here
# Linux/Mac:
export OPENWEATHER_API_KEY=your_api_key_here
# Run the server:
uvicorn backend.main:app --reload
```
API available at: `http://localhost:8000`

### 3. Frontend Usage
- Open `frontend/index.html` in your browser.
- Search for any city to see real-time weather data.

---

## ☁️ Deployment

### Backend (Render/Railway/Fly.io)
- Deploy `/backend` folder as a web service
- Use `Procfile` and set `OPENWEATHER_API_KEY` in environment variables
- Example start command: `uvicorn backend.main:app --host=0.0.0.0 --port=10000`

### Frontend (Vercel/Netlify/GitHub Pages)
- Deploy `/frontend` as a static site
- **Update API URLs in `scripts.js` to point to your deployed backend!**

---

## 🛠️ Tech Stack
- FastAPI, Uvicorn, Requests
- HTML5, CSS3 (Glassmorphism, Gradients, Animations)
- JavaScript (ES6+), Canvas (Particles)
- OpenWeatherMap API

---

## 📖 API Endpoints
- `/weather?city=CityName` — Get current weather
- `/forecast?city=CityName` — Get 5-day forecast

---

## 👨‍💻 Credits
- **Pawan Kumar** — [@Pawan-1809](https://github.com/Pawan-1809)
- UI/UX inspired by modern glassmorphism/cyberpunk trends
- Powered by [OpenWeatherMap](https://openweathermap.org/)

---

**Enjoy your futuristic weather dashboard!** 