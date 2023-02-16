let input = document.querySelector('input');
let btn = document.querySelector('button');
let container = document.querySelector('#container');

function weekDay(day) {
    switch (day) {
        case 0:
            return day = "Sunday";
        case 1:
            return day = "Monday"; 
        case 2:
            return day = "Tuesday";
        case 3:
            return day = "Wednesday";
        case 4:
            return day = "Thursday";
        case 5:
            return day = "Friday";
        case 6:
            return day = "Saturday";
        case 7:
            return day = "Sunday";
        case 8:
            return day = "Monday"; 
        case 9:
            return day = "Tuesday";
        case 10:
            return day = "Wednesday";
    }
};

btn.addEventListener('click', getInfo);
input.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        console.log(e);
        getInfo();
    }
});

function getInfo() {
    let xhr = new XMLHttpRequest;

    xhr.open('GET', `https://api.openweathermap.org/data/2.5/forecast?q=${input.value}&appid=8c0d6a6e3c285afa92b0398479b3ce9e&units=metric`);

    xhr.addEventListener('readystatechange', function() {
        console.log(xhr.readyState);
        if (xhr.readyState === xhr.DONE) {
            console.log('DONE');
            let data = JSON.parse(xhr.responseText);
            console.log(data);
            formatData(data);
        }});

    xhr.send(null);
}

const date = new Date();
const day = date.getDay();



let city = document.createElement('h1');
let today = document.createElement('h2');
today.textContent = weekDay(day);
let temp = document.createElement('h3');

function formatData(data) {
    // Initiate counter for days
    let dayCount = 0;

    // Add dynamic background
    let bg = data.list[0].weather[0].id.toString();
    bg = generateBackground(bg);
    container.style.backgroundImage = `url(${bg[0]})`;
    container.style.color = `${bg[1]}`;

    const contentDiv = document.querySelector('#content');

    // Restart the content
    contentDiv.innerHTML = '';
    // Add city name
    city.textContent = `The wonderful city of ${data.city.name}`;
    contentDiv.appendChild(city);
    contentDiv.appendChild(today);

    // Add img
    let weatherPic = document.createElement('img');
    let icon = data.list[0].weather[0].icon;

    // Add weather description
    let description = document.createElement('h3');
    description.textContent = data.list[0].weather[0].description;
    weatherPic.setAttribute('src', `http://openweathermap.org/img/wn/${icon}@2x.png`);
    weatherPic.setAttribute('alt', `Icon of ${description}`);
    contentDiv.appendChild(weatherPic);

    // Add temperature
    temp.textContent = `${data.list[0].main.temp.toFixed(0)}°`;
    contentDiv.appendChild(temp);
    contentDiv.appendChild(description);

    // Add the extra info (wind, pressure, cloudiness, huMUDity)
    let moreDiv = document.createElement('div');
    moreDiv.setAttribute('id', 'more');
    contentDiv.appendChild(moreDiv);
    let wind = document.createElement('h4');
    wind.textContent = `Wind: ${data.list[0].wind.speed.toFixed(0)} m/s`;
    moreDiv.appendChild(wind);
    let humidity = document.createElement('h4');
    humidity.textContent = `Humidity: ${data.list[0].main.humidity}%`;
    moreDiv.appendChild(humidity);
    let pressure = document.createElement('h4');
    pressure.textContent = `Pressure: ${data.list[0].main.pressure} hPa`;
    moreDiv.appendChild(pressure);
    let cloudiness = document.createElement('h4');
    cloudiness.textContent = `Cloudiness: ${data.list[0].clouds.all}%`;
    moreDiv.appendChild(cloudiness);
    
    // 
    let future = document.createElement('div');
    future.setAttribute('id', 'future');
    contentDiv.appendChild(future);
    // 8 is because the data is in 3 hour increments
    // so 8 * 3hours = 24hours to get the next day
    for (let i = 8; i < data.list.length; i+=8) {
        dayCount++;
        let another = document.createElement('div');
        another.classList.add('another');
        let bg = data.list[i].weather[0].id.toString()
        bg = generateBackground(bg);
        another.style.backgroundImage = `url(${bg[0]})`;
        another.style.color = `${bg[1]}`;
        let tom = document.createElement('p');
        tom.textContent = weekDay(day+dayCount);
        another.appendChild(tom);
        let moreWeatherPic = document.createElement('img');
        let moreIcon = data.list[i].weather[0].icon;
        moreWeatherPic.setAttribute('src', `http://openweathermap.org/img/wn/${moreIcon}@2x.png`);
        another.appendChild(moreWeatherPic);
        let moreTemp = document.createElement('p');
        moreTemp.textContent = `${data.list[i].main.temp.toFixed(0)}°`;
        another.appendChild(moreTemp);
        let moreDisc = document.createElement('p');
        moreDisc.textContent = `${data.list[i].weather[0].description}`;
        another.appendChild(moreDisc);
        future.appendChild(another);
    }
};

function generateBackground(bg) {
    if (bg[0] == 2 ||
        bg[0] == 3 ||
        bg[0] == 5 ||
        bg[0] == 6 ||
        bg[0] == 7) {
            return ['./rain.png', 'black'];
    } else if (bg[0] == 8 && bg[2] == 0) {
            return ['./sun.png', 'blue'];
    } else {
        return ['./cloud.png', 'coral'];
    }
};