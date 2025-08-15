const apikey = "YOUR_API_KEY"; 
const apiurl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchInput = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherEl = document.querySelector(".weather");
const errorEl = document.querySelector(".error");
const toggleBtn = document.querySelector(".toggle-mode");

async function checkWeather(city) {
  const response = await fetch(`${apiurl}${city}&appid=${apikey}`);

  if (response.status == 404) {
    errorEl.style.display = "block";
    weatherEl.style.display = "none";
    return;
  }

  let data = await response.json();
  errorEl.style.display = "none";
  weatherEl.style.display = "block";

  document.querySelector(".city").innerText = data.name;
  document.querySelector(".country").innerText = `🌍 ${data.sys.country}`;
  document.querySelector(".temp").innerText = Math.round(data.main.temp) + "°C";
  document.querySelector(".humidity").innerText = data.main.humidity + "%";
  document.querySelector(".wind").innerText = Math.round(data.wind.speed) + " km/h";
  document.querySelector(".feels").innerText = Math.round(data.main.feels_like) + "°C";

  const weatherIcon = document.querySelector(".weather-icon");
  const condition = data.weather[0].main.toLowerCase();

  if (condition.includes("cloud")) weatherIcon.src = "images/clouds.png";
  else if (condition.includes("rain")) weatherIcon.src = "images/rain.png";
  else if (condition.includes("clear")) weatherIcon.src = "images/clear.png";
  else if (condition.includes("snow")) weatherIcon.src = "images/snow.png";
  else if (condition.includes("thunder")) weatherIcon.src = "images/thunderstorm.png";
  else if (condition.includes("drizzle")) weatherIcon.src = "images/drizzle.png";
  else if (condition.includes("mist")) weatherIcon.src = "images/mist.png";
  else weatherIcon.src = "images/clear.png";
}

// search button
searchBtn.addEventListener("click", () => {
  checkWeather(searchInput.value);
});

// press Enter
searchInput.addEventListener("keyup", (e) => {
  if (e.key === "Enter") checkWeather(searchInput.value);
});

// toggle dark/light mode
toggleBtn.addEventListener("click", () => {
  document.body.classList.toggle("dark");
  toggleBtn.innerText = document.body.classList.contains("dark") ? "☀️" : "🌙";
});
