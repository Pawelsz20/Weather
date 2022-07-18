const input = document.querySelector("input");
const button = document.querySelector("button");
const cityName = document.querySelector(".city-name");
const warning = document.querySelector(".warning");
const photo = document.querySelector(".photo");
const weather = document.querySelector(".weather");
const temperature = document.querySelector(".temperature");
const humidity = document.querySelector(".humidity");
const btnReset = document.querySelector(".button-reset");

const API_URL = "https://api.openweathermap.org/data/2.5/weather?q=";
const API_KEY = "&appid=a64f5a91434162a39dd42288b876fd0a";
const API_UNITS = "&units=metric";
document.addEventListener('DOMContentLoaded', () => {
  const getWeather = () => {
    const city = input.value;
    cityName.textContent = city;
    const URL = API_URL + city + API_KEY + API_UNITS;
  
    axios
      .get(URL)
      .then((res) => {
        temp = res.data.main.temp;
        hum = res.data.main.humidity;
        weath = Object.assign({}, ...res.data.weather);
        console.log(weath);
  
        temperature.textContent = temp.toFixed(0) + "℃";
        humidity.textContent = hum + "%";
        weather.textContent = weath.main;
        input.value = "";
        warning.textContent = "";
  
        if (weath.id >= 200 && weath.id < 300) {
          photo.setAttribute("src", "img/thunderstorm.png");
        } else if (weath.id >= 300 && weath.id < 400) {
          photo.setAttribute("src", "img/drizzle.png");
        } else if (weath.id >= 500 && weath.id < 600) {
          photo.setAttribute("src", "img/rain.png");
        } else if (weath.id >= 600 && weath.id < 700) {
          photo.setAttribute("src", "img/ice.png");
        } else if (weath.id >= 700 && weath.id < 800) {
          photo.setAttribute("src", "img/fog.png");
        } else if (weath.id === 800) {
          photo.setAttribute("src", "img/sun.png");
        } else if (weath.id >= 800 && weath.id < 900) {
          photo.setAttribute("src", "img/cloud.png");
        } else {
          photo.setAttribute("src", "img/unknown.png");
        }
      })
      .catch(() => (warning.textContent = "Give the correct name of the city!"));
  };
  
  const reset = () => {
    temperature.textContent = "";
    humidity.textContent = "";
    weather.textContent = "";
    cityName.textContent = '';
    input.value = "";
    warning.textContent = "";
    photo.setAttribute("src", "img/unknown.png");
  };
  
  
  const checkEnter = (e) => {
    if (e.key === 'Enter') {
      getWeather()
    }
  }
  })


button.addEventListener("click", getWeather);
btnReset.addEventListener('click', reset)
input.addEventListener('keyup', checkEnter)