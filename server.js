const appKey = "e01ebb572c64aeb6901d2a580c46c538";

let searchButton = document.getElementById("search-btn");
let searchInput = document.getElementById("search-txt");
let cityName = document.getElementById("city-name");
let icon = document.getElementById("icon");
let temperature = document.getElementById("temp");
let humidity = document.getElementById("humidity-div");
let flag=0,v;

if(searchButton){
    searchButton.addEventListener("click", findWeatherDetails);
}

//console.log("a"+searchInput.value);
if(searchInput){
    searchInput.addEventListener("keyup", enterPressed);
    //console.log(searchInput.value());
}

if(temperature){
  temperature.addEventListener("click",f);
}

function f(){
  if(flag==0){
    temperature.innerHTML = parseInt(v) + "°F";
    flag=1;
  }
  else{
    temperature.innerHTML = parseInt(v - 273) + "°C";
    flag=0;
  } 
}

function enterPressed(event){
  if (event.key === "Enter") {
    findWeatherDetails();
  }
}

function findWeatherDetails() {
  if (searchInput.value === "") {
  
  }else {
    let searchLink = "https://api.openweathermap.org/data/2.5/weather?q=" + searchInput.value + "&APPID="+appKey;
    httpRequestAsync(searchLink, theResponse);
  }
 }

function theResponse(response) {
    
  let jsonObject = JSON.parse(response);
  console.log(jsonObject);
  cityName.innerHTML = jsonObject.name;
  icon.src = "http://openweathermap.org/img/w/" + jsonObject.weather[0].icon + ".png";
  temperature.innerHTML = parseInt(jsonObject.main.temp - 273) + "°C";
  v = jsonObject.main.temp;
  humidity.innerHTML = jsonObject.main.humidity + "%";
}

function httpRequestAsync(url, callback)
{
  //console.log("hello");
    var httpRequest = new XMLHttpRequest();
    httpRequest.onreadystatechange = () => { 
        if (httpRequest.readyState == 4 && httpRequest.status == 200)
            callback(httpRequest.responseText);
    }
    httpRequest.open("GET", url, true); // true for asynchronous 
    httpRequest.send();
}