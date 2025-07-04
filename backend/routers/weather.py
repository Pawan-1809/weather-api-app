from fastapi import APIRouter, HTTPException, Query
import requests
import os
from datetime import datetime
from collections import defaultdict

router = APIRouter()

OPENWEATHER_API_KEY = os.getenv("OPENWEATHER_API_KEY", "7fa5b6dcf2ff283f4bc23485949c1998")  # Replace demo_key with your actual key or set as env var
OPENWEATHER_URL = "https://api.openweathermap.org/data/2.5/weather";
OPENWEATHER_FORECAST_URL = "https://api.openweathermap.org/data/2.5/forecast"

@router.get("/weather")
def get_weather(city: str = Query(..., description="City name to fetch weather for")):
    params = {
        "q": city,
        "appid": OPENWEATHER_API_KEY,
        "units": "metric"
    }
    try:
        response = requests.get(OPENWEATHER_URL, params=params, timeout=5)
        data = response.json()
        if response.status_code != 200:
            raise HTTPException(status_code=404, detail=data.get("message", "City not found"))
        weather = {
            "city": data["name"],
            "temperature": data["main"]["temp"],
            "humidity": data["main"]["humidity"],
            "wind_speed": data["wind"]["speed"],
            "condition": data["weather"][0]["main"],
            "description": data["weather"][0]["description"],
            "icon": f"https://openweathermap.org/img/wn/{data['weather'][0]['icon']}@4x.png"
        }
        return weather
    except requests.RequestException:
        raise HTTPException(status_code=500, detail="Failed to fetch weather data")

@router.get("/forecast")
def get_forecast(city: str = Query(..., description="City name to fetch forecast for")):
    params = {
        "q": city,
        "appid": OPENWEATHER_API_KEY,
        "units": "metric"
    }
    try:
        response = requests.get(OPENWEATHER_FORECAST_URL, params=params, timeout=5)
        data = response.json()
        if response.status_code != 200:
            raise HTTPException(status_code=404, detail=data.get("message", "City not found"))
        # Group by date, take min/max/condition/icon for each day
        days = defaultdict(list)
        for entry in data["list"]:
            date = datetime.utcfromtimestamp(entry["dt"]).strftime("%Y-%m-%d")
            days[date].append(entry)
        forecast = []
        for i, (date, entries) in enumerate(days.items()):
            if i >= 5:
                break
            temps = [e["main"]["temp"] for e in entries]
            min_temp = min(temps)
            max_temp = max(temps)
            # Use the first entry's weather for icon/desc
            condition = entries[0]["weather"][0]["main"]
            description = entries[0]["weather"][0]["description"]
            icon = f"https://openweathermap.org/img/wn/{entries[0]['weather'][0]['icon']}@2x.png"
            forecast.append({
                "date": date,
                "min_temp": min_temp,
                "max_temp": max_temp,
                "condition": condition,
                "description": description,
                "icon": icon
            })
        return {"city": data["city"]["name"], "forecast": forecast}
    except requests.RequestException:
        raise HTTPException(status_code=500, detail="Failed to fetch forecast data") 