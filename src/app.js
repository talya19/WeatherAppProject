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
    let temperatureElement=document.querySelector("#temperature");
    temperatureElement.innerHTML=Math.round(response.data.main.temp);
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

}

function search (city){
let apiKey="e0f9cf2497fe0ed03d06e212d42c8fba";
let apiUrl=`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
axios.get(apiUrl).then(displayTemperature);
}


function handleSubmit(event){
event.preventDefault();
let cityInput= document.querySelector("#cityInput");
search(cityInput.value);
}

let form=document.querySelector("#search-form");
form.addEventListener("submit",handleSubmit)