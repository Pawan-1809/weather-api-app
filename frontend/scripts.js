// NOTE: Update these URLs after backend deployment!
// Example: const API_URL = "https://your-backend.onrender.com/weather";
//          const FORECAST_URL = "https://your-backend.onrender.com/forecast";
const API_URL = "http://localhost:8000/weather";
const FORECAST_URL = "http://localhost:8000/forecast";
const form = document.getElementById("search-form");
const cityInput = document.getElementById("city-input");
const weatherCard = document.getElementById("weather-card");
const forecastSection = document.getElementById("forecast");
const loading = document.getElementById("loading");
const parallaxBg = document.getElementById("parallax-bg");
const particlesCanvas = document.getElementById("particles");
const showForecastBtn = document.getElementById("show-forecast-btn");
const mainFlex = document.getElementById("main-flex");

let lastForecast = null;

// --- Weather Fetch Logic ---
async function fetchWeather(city) {
    loading.classList.remove("hidden");
    weatherCard.classList.add("hidden");
    forecastSection.innerHTML = "";
    forecastSection.classList.add("hidden");
    showForecastBtn.classList.add("hidden");
    mainFlex.classList.remove("show-forecast");
    mainFlex.classList.remove("searched");
    try {
        const [weatherRes, forecastRes] = await Promise.all([
            fetch(`${API_URL}?city=${encodeURIComponent(city)}`),
            fetch(`${FORECAST_URL}?city=${encodeURIComponent(city)}`)
        ]);
        if (!weatherRes.ok) throw new Error("City not found");
        const weatherData = await weatherRes.json();
        const forecastData = forecastRes.ok ? await forecastRes.json() : null;
        renderWeather(weatherData);
        if (forecastData && forecastData.forecast) {
            lastForecast = forecastData.forecast;
            showForecastBtn.classList.remove("hidden");
        } else {
            lastForecast = null;
        }
        mainFlex.classList.add("searched");
    } catch (err) {
        weatherCard.innerHTML = `<div class='error'>${err.message}</div>`;
        weatherCard.classList.remove("hidden");
    } finally {
        loading.classList.add("hidden");
    }
}

function renderWeather(data) {
    weatherCard.innerHTML = `
        <div class="city">${data.city}</div>
        <img class="icon" src="${data.icon}" alt="icon" />
        <div class="temp">${Math.round(data.temperature)}°C</div>
        <div class="desc">${data.description}</div>
        <div class="details">
            <span><span class="label">Humidity</span>${data.humidity}%</span>
            <span><span class="label">Wind</span>${data.wind_speed} m/s</span>
            <span><span class="label">Condition</span>${data.condition}</span>
        </div>
    `;
    weatherCard.classList.remove("hidden");
}

function renderForecast(forecast) {
    forecastSection.innerHTML = forecast.map(day => `
        <div class="forecast-card glass">
            <div class="day">${formatDay(day.date)}</div>
            <img class="icon" src="${day.icon}" alt="icon" />
            <div class="temp">${Math.round(day.min_temp)}° / ${Math.round(day.max_temp)}°C</div>
            <div class="desc">${day.description}</div>
        </div>
    `).join("");
    // Animate forecast cards
    setTimeout(() => {
        document.querySelectorAll('.forecast-card').forEach((card, i) => {
            card.style.opacity = 0;
            card.style.transform = 'translateY(40px)';
            setTimeout(() => {
                card.style.transition = 'opacity 0.6s, transform 0.6s';
                card.style.opacity = 1;
                card.style.transform = 'translateY(0)';
            }, 120 * i);
        });
    }, 100);
}

function formatDay(dateStr) {
    const d = new Date(dateStr);
    return d.toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric' });
}

form.addEventListener("submit", e => {
    e.preventDefault();
    const city = cityInput.value.trim();
    if (city) fetchWeather(city);
    // Reset forecast view
    forecastSection.classList.add("hidden");
    showForecastBtn.classList.add("hidden");
    mainFlex.classList.remove("show-forecast");
    mainFlex.classList.remove("searched");
});

showForecastBtn.addEventListener("click", () => {
    if (lastForecast) {
        renderForecast(lastForecast);
        forecastSection.classList.remove("hidden");
        mainFlex.classList.add("show-forecast");
        // Scroll to main to keep both boxes in view
        setTimeout(() => {
            document.getElementById("main-flex").scrollIntoView({ behavior: "smooth", block: "center" });
        }, 200);
    }
});

// --- Parallax Background ---
window.addEventListener("scroll", () => {
    const y = window.scrollY;
    parallaxBg.style.transform = `translateY(${y * 0.3}px)`;
    // Nav highlight on scroll
    highlightNav();
});

function highlightNav() {
    const navLinks = document.querySelectorAll('.nav-links a');
    const sections = [
        { id: '', el: document.body },
        { id: 'forecast', el: document.getElementById('forecast') },
        { id: 'dev', el: document.getElementById('dev') }
    ];
    let active = 0;
    const scrollY = window.scrollY + 80;
    for (let i = 1; i < sections.length; i++) {
        if (sections[i].el && sections[i].el.offsetTop < scrollY) active = i;
    }
    navLinks.forEach((link, i) => {
        if (i === active) link.classList.add('active');
        else link.classList.remove('active');
    });
}

// --- Cursor-following Particles ---
const ctx = particlesCanvas.getContext("2d");
let particles = [];
let mouse = { x: window.innerWidth / 2, y: window.innerHeight / 2 };

function resizeCanvas() {
    particlesCanvas.width = window.innerWidth;
    particlesCanvas.height = window.innerHeight;
}
window.addEventListener("resize", resizeCanvas);
resizeCanvas();

document.addEventListener("mousemove", e => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
});

function createParticle() {
    const angle = Math.random() * 2 * Math.PI;
    const speed = Math.random() * 1.5 + 0.5;
    return {
        x: mouse.x,
        y: mouse.y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        alpha: 1,
        size: Math.random() * 4 + 2,
        color: `hsla(${Math.random() * 360}, 80%, 70%, 1)`
    };
}

function animateParticles() {
    ctx.clearRect(0, 0, particlesCanvas.width, particlesCanvas.height);
    particles = particles.filter(p => p.alpha > 0.05);
    for (let p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        p.alpha *= 0.96;
        ctx.globalAlpha = p.alpha;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, 2 * Math.PI);
        ctx.fillStyle = p.color;
        ctx.shadowColor = p.color;
        ctx.shadowBlur = 16;
        ctx.fill();
    }
    ctx.globalAlpha = 1;
    requestAnimationFrame(animateParticles);
}
setInterval(() => {
    for (let i = 0; i < 3; i++) particles.push(createParticle());
}, 18);
animateParticles();

// --- UI Animations ---
weatherCard.addEventListener("mouseenter", () => {
    weatherCard.style.boxShadow = "0 8px 32px #fc5c7d99, 0 0 32px #6a82fb55";
    weatherCard.style.transform = "scale(1.03)";
});
weatherCard.addEventListener("mouseleave", () => {
    weatherCard.style.boxShadow = "var(--shadow)";
    weatherCard.style.transform = "scale(1)";
});

// --- Initial State ---
weatherCard.classList.add("hidden");
loading.classList.add("hidden");
forecastSection.classList.add("hidden");
showForecastBtn.classList.add("hidden");
mainFlex.classList.add("center-flex");
