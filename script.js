let displayCity = document.getElementsByClassName(`city`)[0];
let displayDate = document.getElementsByClassName(`date`)[0];
let displayTemp = document.getElementsByClassName('temp')[0];
let displayWeather = document.getElementsByClassName('weather')[0];
let displayHiLow = document.getElementsByClassName('hi-low')[0];
const api = {
    key: `96e47d2be72d386760961a0fa0e18893`,
    base: `https://api.openweathermap.org/data/2.5/`
}

const searchbox = document.getElementsByClassName(`search-box`)[0];
searchbox.addEventListener(`keypress`, setQuery);

function setQuery(evt) {
    if (evt.keyCode == 13) {
        getResults(searchbox.value);
        console.log(searchbox.value);
    }
}

function getResults(query) {
    fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
    .then(weather => {
        return weather.json();
    }).then(displayResults);
}

function displayResults(weather) {
    console.log(weather);
    displayCity.innerHTML = `${weather.name}, ${weather.sys.country}`;
    let date = new Date();
    displayDate.innerHTML = dateBuilder(date);
    displayTemp.innerHTML = `${weather.main.temp}<span>°C</span>`;
    displayWeather.innerHTML = weather.weather[0].description;
    displayHiLow.innerHTML = `${weather.main.temp_max}°C / ${weather.main.temp_min}°C`;
}

function dateBuilder(d) {
    let month = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let day = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    return `${day[d.getDay()]}, ${d.getDate()} ${month[d.getMonth()]}, ${d.getFullYear()}`
}