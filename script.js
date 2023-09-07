const api_key = "a3f8bb84aba9ed21eed9da33b4da85e6";
const api_url = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const search_box = document.querySelector(".search input");
const search_btn = document.querySelector(".search button");
const weather_icons = document.querySelector(".weather_icon");

async function checkWeather(city) {
            const response = await fetch(api_url + city + `&appid=${api_key}`);

            if(response.status == 404) {
                document.querySelector(".error").style.display = "block";
                document.querySelector(".weather").style.display = "none";
            }
            else {
            var data = await response.json();
            //console.log(data);
            let unix_1=data.sys.sunrise;
            var time_1=new Date(unix_1*1000).toLocaleTimeString('it-IT');
            time_1=time_1.slice(0,5);
            let unix_2=data.sys.sunset;
            var time_2=new Date(unix_2*1000).toLocaleTimeString('it-IT');
            time_2=time_2.slice(0,5);

            document.querySelector(".city").innerHTML = data.name;
            document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°C";
            document.querySelector(".humidity").innerHTML = data.main.humidity  + "%";
            document.querySelector(".wind").innerHTML = Math.round(data.main.feels_like) + "°C";
            document.querySelector(".speed").innerHTML = data.wind.speed + " m/s";
            document.querySelector(".pressure").innerHTML = data.main.pressure + " hPa";
            document.querySelector(".sunrise").innerHTML = time_1;
            document.querySelector(".sunset").innerHTML = time_2;

            if(data.weather[0].main == "Clouds") {
                weather_icons.src = "images/clouds.png";
            }
            else if(data.weather[0].main == "Clear") {
                weather_icons.src = "images/clear.png";
            }
            else if(data.weather[0].main == "Rain") {
                weather_icons.src = "images/rain.png";
            }
            else if(data.weather[0].main == "Drizzle") {
                weather_icons.src = "images/drizzle.png";
            }
            else if(data.weather[0].main == "Mist" || data.weather[0].main == "Fog") {
                weather_icons.src = "images/mist.png";
            }
            else if(data.weather[0].main == "Thunderstorm") {
                weather_icons.src = "images/thunderstorm.png";
            }
            else if(data.weather[0].main == "Snow") {
                weather_icons.src = "images/snow.png";
            }

            document.querySelector(".weather").style.display = "block";
            document.querySelector(".error").style.display = "none";
        }
}

search_btn.addEventListener("click", ()=>{
            checkWeather(search_box.value);
})