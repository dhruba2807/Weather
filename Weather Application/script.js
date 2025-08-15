const apiKey = "2aa205ca2f68e9b2df07cf385c898ffe"; 
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const search = document.querySelector(".search input");
const btn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");
const modeToggle = document.querySelector(".toggle-mode");
const recentList = document.getElementById("recentList");
const suggestionsBox = document.querySelector(".suggestions");

// 🌗 Toggle light/dark mode
modeToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark");
  modeToggle.innerText = document.body.classList.contains("dark") ? "☀️" : "🌙";
});

// 🌦️ Weather icons mapping
const iconMap = {
  clouds: "images/clouds.png",
  rain: "images/rain.png",
  clear: "images/clear.png",
  snow: "images/snow.png",
  thunderstorm: "images/thunderstorm.png",
  drizzle: "images/drizzle.png",
  mist: "images/mist.png",
  haze: "images/mist.png",
  fog: "images/mist.png",
  smoke: "images/mist.png",
  dust: "images/mist.png"
};

async function checkWeather(city) {
  const response = await fetch(`${apiUrl}${city}&appid=${apiKey}`);

  if (response.status === 404) {
    document.querySelector(".error").style.display = "block";
    document.querySelector(".weather").style.display = "none";
    return;
  }

  const data = await response.json();

  // 🌍 Display city, temp, humidity, wind, feels-like
  document.querySelector(".city").innerHTML = `${data.name}, ${data.sys.country}`;
  document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°C";
  document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
  document.querySelector(".wind").innerHTML = data.wind.speed + " Km/h";
  document.querySelector(".feels").innerHTML = "Feels like: " + Math.round(data.main.feels_like) + "°C";

  // 🌤️ Set correct icon
  let weatherMain = data.weather[0].main.toLowerCase();
  weatherIcon.src = iconMap[weatherMain] || "images/clear.png";

  // Show result
  document.querySelector(".weather").style.display = "block";
  document.querySelector(".error").style.display = "none";

  saveRecent(city);
}

// 🔄 Save & Render recent searches
function saveRecent(city) {
  let recent = JSON.parse(localStorage.getItem("recentCities")) || [];
  city = city.charAt(0).toUpperCase() + city.slice(1).toLowerCase();

  if (!recent.includes(city)) {
    recent.unshift(city);
    if (recent.length > 5) recent.pop(); // keep max 5
    localStorage.setItem("recentCities", JSON.stringify(recent));
  }
  renderRecent();
}

function renderRecent() {
  let recent = JSON.parse(localStorage.getItem("recentCities")) || [];
  if (recent.length > 0) suggestionsBox.style.display = "block";
  recentList.innerHTML = "";
  recent.forEach(city => {
    let li = document.createElement("li");
    li.textContent = city;
    li.onclick = () => checkWeather(city);
    recentList.appendChild(li);
  });
}

// 🔍 Search events
btn.addEventListener("click", () => checkWeather(search.value));
search.addEventListener("keypress", (e) => {
  if (e.key === "Enter") checkWeather(search.value);
});

// Load recents on startup
renderRecent();
