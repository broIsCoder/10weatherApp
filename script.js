const weatherIcon = document.querySelector('.weather-icon');
const searchInput = document.querySelector('input');
const searchBtn = document.querySelector('button');

const apiKey = '4200f280c5db9fc16b50de6c8a79a277';
const apiUrl = `https://api.openweathermap.org/data/2.5/weather?&units=metric`;

async function checkWeather(cityName){

    try {
        const response = await fetch(apiUrl +`&appid=${apiKey}`+`&q=${cityName}`);
        if (!response.ok) {
            searchInput.value = ''
            searchInput.placeholder = 'enter correct city only';
            document.querySelector('.weather').style.display = 'none'
            return;
        }
        const data = await response.json(); // Correct way to parse JSON data
        console.log(data);
        
        document.querySelector('.city').innerHTML =  data.name ;
        document.querySelector('.temp').innerHTML = Math.round( data.main.temp )+ '°c' ;
        document.querySelector('.humidity').innerHTML =  data.main.humidity +'%' ;
        document.querySelector('.wind').innerHTML =  data.wind.speed+' km/hr' ;
          
        if(data.weather[0].main == 'Clouds'){
            weatherIcon.src = "images/clouds.png"
        }
        else if(data.weather[0].main == 'Clear'){
            weatherIcon.src = 'images/clear.png'
        }
        else if(data.weather[0].main == 'Rain'){
            weatherIcon.src = 'images/rain.png'
        }
        else if(data.weather[0].main == 'Drizzle'){
            weatherIcon.src = 'images/drizzle.png'
        }
        else if(data.weather[0].main == 'Mist'){
            weatherIcon.src = 'images/mist.png'
        }
    
        document.querySelector('.weather').style.display = 'block';
    } catch (error) {
        console.log('error occured')
    }
}

searchBtn.addEventListener('click',()=>{
    checkWeather(searchInput.value);
})
searchInput.addEventListener('keydown',(e)=>{
    if(e.key == 'Enter'){
        checkWeather(searchInput.value);
    }
})