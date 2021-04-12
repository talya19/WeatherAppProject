function formatDate(timestamp){
 let date= new Date (timestamp);
 let hours= date.getHours();
 let minutes=date.getMinutes();
 let days=["Sunday","Monday","Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
 let day=days[date.getDay()];
 if (minutes<10){
     minutes=`0${minutes}`;
 }
 if (hours<10){
     hours=`0${hours}`;
 }
    return `${day}, ${hours}:${minutes}`
}

function displayTemperature (response){
    celsiusTemperature=response.data.main.temp;
    let temperatureElement=document.querySelector("#temperature");
    temperatureElement.innerHTML=Math.round(celsiusTemperature);
    let cityElement=document.querySelector("#city");
    cityElement.innerHTML=response.data.name;
    let descriptionElement=document.querySelector("#description");
    descriptionElement.innerHTML=response.data.weather[0].description;
    let humidityElement=document.querySelector("#humidity");
    humidityElement.innerHTML=response.data.main.humidity;
    let windElement=document.querySelector("#wind");
    windElement.innerHTML=Math.round(response.data.wind.speed);
    let dateElement=document.querySelector("#date");
    dateElement.innerHTML=formatDate(response.data.dt*1000);
    let imageElement=document.querySelector("#weatherImage");
    imageElement.setAttribute("src",`http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
    imageElement.setAttribute("alt",response.data.weather[0].description);
getForecast(response.data.coord)
}

function search (city){
let apiKey="e0f9cf2497fe0ed03d06e212d42c8fba";
let apiUrl=`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
axios.get(apiUrl).then(displayTemperature);
}

function displayFahrenheitTemperature(event){
event.preventDefault();
let temperatureElement=document.querySelector("#temperature");
let fahrenheitTemperature=(celsiusTemperature*9/5) +32;
celsiusLink.classList.remove("active");
fahrenheitLink.classList.add("active");
temperatureElement.innerHTML=Math.round(fahrenheitTemperature);
}
function displaycelsiusTemperature(event){
event.preventDefault();
let temperatureElement=document.querySelector("#temperature");
fahrenheitLink.classList.remove("active");
celsiusLink.classList.add("active");
temperatureElement.innerHTML=Math.round(celsiusTemperature);
}
function getForecast(coordinates){
let apiKey="e0f9cf2497fe0ed03d06e212d42c8fba";
let apiUrl=`https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
axios.get(apiUrl).then(displayForecast);
}

function formatDay(timestamp){
let date=new Date(timestamp*1000);
let day=date.getDay();
let days=["Sun", "Mon", "Tue", "Wed", "Thu","Fri","Sat"];

return day=days[day];
}


function displayForecast(response){   
let forecast=response.data.daily;

let forecastElement=document.querySelector(".weather-forecast");
let forecastHTML=`<div class=row>`;
forecast.forEach(function(forecastDay,index){
    if (index<6){
forecastHTML=
forecastHTML+`<div class="col-2">
     <div class="weather-forecast-date"> 
        ${formatDay(forecastDay.dt)}
    </div>
    <img src="http://openweathermap.org/img/wn/${forecastDay.weather[0].icon}@2x.png" alt=${forecastDay.weather[0].description} class="weather-forecast-img">
    <div> <span class="weather-forecast-temp-max">${Math.round(forecastDay.temp.max)}º</span>|<span class="weather-forecast-temp-min"> ${Math.round(forecastDay.temp.min)}º</span> </div>
</div>`;    } 
})
forecastHTML=forecastHTML+`</div>`;
forecastElement.innerHTML=forecastHTML;
}

let celsiusTemperature=null;

let fahrenheitLink=document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click",displayFahrenheitTemperature);

let celsiusLink=document.querySelector("#celsius-link");
celsiusLink.addEventListener("click",displaycelsiusTemperature);

function handleSubmit(event){
event.preventDefault();
let cityInput= document.querySelector("#cityInput");
search(cityInput.value);
}

let form=document.querySelector("#search-form");
form.addEventListener("submit",handleSubmit);

search("Tel Aviv");
