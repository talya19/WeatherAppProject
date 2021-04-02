function displayTemperature (response){
    console.log(response.data.main.temp);
    let temperatureElement=document.querySelector("#temperature");
    temperatureElement.innerHTML=Math.round(response.data.main.temp);
}

let apiKey="e0f9cf2497fe0ed03d06e212d42c8fba";
let apiUrl=`https://api.openweathermap.org/data/2.5/weather?q=London&appid=${apiKey}&units=metric`;

axios.get(apiUrl).then (displayTemperature);