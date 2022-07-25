const input = document.querySelector("input");
const button = document.querySelector("button");
const cityName = document.querySelector(".city-name");
const warning = document.querySelector(".warning");
const photo = document.querySelector(".photo");
const weather = document.querySelector(".weather");
const temperature = document.querySelector(".temperature");
const humidity = document.querySelector(".humidity");
const resetBtn = document.querySelector(".button-reset");

const API_URL = "https://api.openweathermap.org/data/2.5/weather?q=";
const API_KEY = "&appid=a64f5a91434162a39dd42288b876fd0a";
const API_UNITS = "&units=metric";

const getWeather = () => {
  const city = input.value
  const URL = API_URL + city + API_KEY + API_UNITS;

  axios.get(URL).then((res) => {
    console.log(res.data)

    temp = res.data.main.temp.toFixed(1) 
    hum = res.data.main.humidity
    weatherInfo = Object.assign({}, ...res.data.weather)
    console.log(weatherInfo)

    cityName.textContent = res.data.name
    temperature.textContent = temp + '°C'
    humidity.textContent = hum + '%'
    weather.textContent = weatherInfo.main
    input.value = ''
    warning.textContent = ''
   

    if (weatherInfo.id >= 200 && weatherInfo.id < 300) {
      photo.setAttribute("src", "img/thunderstorm.png");
    } else if (weatherInfo.id >= 300 && weatherInfo.id < 400) {
      photo.setAttribute("src", "img/drizzle.png");
    } else if (weatherInfo.id >= 500 && weatherInfo.id < 600) {
      photo.setAttribute("src", "img/rain.png");
    } else if (weatherInfo.id >= 600 && weatherInfo.id < 700) {
      photo.setAttribute("src", "img/ice.png");
    } else if (weatherInfo.id >= 700 && weatherInfo.id < 800) {
      photo.setAttribute("src", "img/fog.png");
    } else if (weatherInfo.id === 800) {
      photo.setAttribute("src", "img/sun.png");
    } else if (weatherInfo.id >= 800 && weatherInfo.id < 900) {
      photo.setAttribute("src", "img/cloud.png");
    } else {
      photo.setAttribute("src", "img/unknown.png");
    }
  }).catch(() => warning.textContent = 'Podaj poprawną nazwę miasta')
};

const checkEnter = (e) => {
  if (e.key === 'Enter') {
    getWeather()
  }
}
  const reset = () => {
    cityName.textContent = ''
    temperature.textContent = ''
    humidity.textContent = ''
    weather.textContent = ''
    input.value = ''
    warning.textContent = ''
    photo.setAttribute("src", "img/unknown.png")
  }


resetBtn.addEventListener('click', reset)
input.addEventListener('keyup', checkEnter)
button.addEventListener("click", getWeather);