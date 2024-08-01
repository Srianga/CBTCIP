const container = document.querySelector('.container');
const searchButton = document.querySelector('.search-box button');
const searchInput = document.querySelector('.search-box input');
const weatherBox = document.querySelector('.weather-box');
const weatherDetails = document.querySelector('.weather-details');
const error404 = document.querySelector('.not-found');

const performSearch = () => {
    const APIKey = '4e0302dfa728a614d0fc34af2a6dad1f';
    const city = searchInput.value.trim();

    const regex = /^[A-Za-z\s]+$/;
    
    if (city === "" || !regex.test(city) || city.replace(/\s/g, '') === "") {
        alert('Please enter a valid city name containing only letters and spaces.');
        return;
    }

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APIKey}&units=metric`)
        .then(response => response.json())
        .then(json => {
            if (json.cod === '404') {
                container.style.height = '404px';
                weatherBox.style.display = 'none';
                weatherDetails.style.display = 'none';
                error404.style.display = 'block';
                error404.classList.add('fadeIn');
                return;
            }

            error404.style.display = 'none';
            error404.classList.remove('fadeIn');

            const image = document.querySelector('.weather-box img');
            const temperature = document.querySelector('.weather-box .temperature');
            const description = document.querySelector('.weather-box .description');
            const humidity = document.querySelector('.weather-details .humidity span');
            const wind = document.querySelector('.weather-details .wind span');

            console.log(json.weather[0].description);  // Log the weather description

            switch (json.weather[0].description.toLowerCase()) {
                case 'clear sky':
                    image.src = 'sun.png';
                    break;
                case 'light rain':
                case 'moderate rain':
                case 'heavy intensity rain':
                case 'very heavy rain':
                case 'extreme rain':
                    image.src = 'raincloud.png';
                    break;
                case 'thunderstorm with light rain':
                case 'thunderstorm with rain':
                case 'thunderstorm with heavy rain':
                    image.src = 'thunderstormwithlightrain.png';
                    break;
                case 'snow':
                case 'light snow':
                case 'heavy snow':
                    image.src = 'snow.png';
                    break;
                case 'few clouds':
                case 'scattered clouds':
                case 'broken clouds':
                case 'overcast clouds':
                    image.src = 'cloudysun.png';
                    break;
                case 'mist':
                case 'smoke':
                case 'sand dust whirls':
                case 'fog':
                case 'sand':
                case 'dust':
                case 'volcanic ash':
                case 'squalls':
                case 'tornado':
                    image.src = 'mist.png';
                    break;
                case 'haze':
                    image.src = 'haze.png';
                    break;
                default:
                    image.src = '';
            }

            temperature.innerHTML = `${parseInt(json.main.temp)}<span>°C</span>`;
            description.innerHTML = `${json.weather[0].description}`;
            humidity.innerHTML = `${json.main.humidity}%`;
            wind.innerHTML = `${parseInt(json.wind.speed)} Km/h`;

            weatherBox.style.display = '';
            weatherDetails.style.display = '';
            weatherBox.classList.add('fadeIn');
            weatherDetails.classList.add('fadeIn');
            container.style.height = '590px';
        });
};

searchButton.addEventListener('click', performSearch);

searchInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        performSearch();
    }
});

var loader = document.getElementById("preloader");

window.addEventListener("load", function(){
    this.setTimeout(function(){
        loader.style.display = "none";
    },2500)
});

