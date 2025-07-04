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

## 🖥️ Run Locally (Step-by-Step)

### 1. Clone the Repository
```bash
git clone https://github.com/Pawan-1809/weather-api-app.git
cd weather-api-app
```

### 2. Backend Setup (FastAPI)
```bash
cd backend
pip install -r requirements.txt
```

#### Set Your OpenWeatherMap API Key
- Get a free API key from [OpenWeatherMap](https://openweathermap.org/api)
- Set it as an environment variable:
  - **Windows:**
    ```bash
    set OPENWEATHER_API_KEY=your_api_key_here
    ```
  - **Linux/Mac:**
    ```bash
    export OPENWEATHER_API_KEY=your_api_key_here
    ```

#### Start the FastAPI Server
```bash
uvicorn main:app --reload
```
- The API will be available at: [http://localhost:8000](http://localhost:8000)

### 3. Frontend Setup
- Open a new terminal window/tab.
- Navigate to the frontend folder:
  ```bash
  cd ../frontend
  ```
- Open `index.html` in your browser (double-click or use Live Server extension in VSCode for best experience).
- **Make sure the backend is running before searching for weather!**

#### Update API URLs (if needed)
- By default, the frontend fetches from `http://localhost:8000/weather` and `/forecast`.
- If you change the backend port, update the URLs in `scripts.js` accordingly.

---

## 🛠️ Troubleshooting
- **ModuleNotFoundError:**
  - Make sure you are in the correct directory (`backend`) when running the backend.
  - Use `uvicorn main:app --reload` (not `backend.main:app`) if you are inside the `backend` folder.
- **CORS errors:**
  - The backend is set up with CORS enabled for local development.
- **API key errors:**
  - Double-check your OpenWeatherMap API key and that it is set as an environment variable.
- **Frontend not updating:**
  - Clear your browser cache or do a hard refresh (Ctrl+Shift+R).

---

## 🎨 Finishing Touches & Customization
- **UI/UX:**
  - The frontend uses glassmorphism and cyberpunk styles. Tweak `styles.css` for your own color palette or effects.
- **API:**
  - You can extend the backend to support more endpoints or data sources.
- **Deployment:**
  - See comments in `scripts.js` and the README for tips on deploying to Render, Railway, Vercel, or Netlify.
- **Credits:**
  - Built by [Pawan Kumar](https://github.com/Pawan-1809). Powered by [OpenWeatherMap](https://openweathermap.org/).

---

**Enjoy your futuristic weather dashboard! If you like this project, give it a ⭐ on GitHub!** 