
// Creating a promise and resolving with the then() function
function getWeather(city) {
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
            xhr.open("GET", 'https://query.yahooapis.com/v1/public/yql?q=select * from weather.forecast ' +
                'where woeid in (select woeid from geo.places(1) where text="' + city + '") and u="c"&format=json');
            xhr.onload = () => resolve(xhr.response);
            xhr.onerror = () => reject(xhr.statusText);
            xhr.send();
    });
}
getWeather("Sydney").then((result) => {
    var weatherObj = JSON.parse(result);
    var todayForecast = weatherObj.query.results.channel.item.forecast[0];
    console.log(todayForecast);
})
.catch(function(e) {
    console.log(e);
});


// Using Promise.all 
var sydneyForecast = getWeather("Sydney");
var berlinForecast = getWeather("Berlin");
var londonForecast = getWeather("London");

Promise.all([sydneyForecast, berlinForecast, londonForecast]).then(forecasts => {
    forecasts.forEach((result) => {
        var weatherObj = JSON.parse(result);
        var todayForecast = weatherObj.query.results.channel.item.forecast[0];
        console.log(todayForecast);
    })
})
.catch(function(e) {
    console.log(e);
});


// Using Promise.race
function getWoeid(city) {
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
            xhr.open("GET", 'https://query.yahooapis.com/v1/public/yql?q=select woeid from geo.places where text="' + city + '"&format=json');
            xhr.onload = () => resolve(xhr.response);
            xhr.onerror = () => reject(xhr.statusText);
            xhr.send();
    });
}

var sydneyForecast = getWoeid("Sydney");
var berlinForecast = getWoeid("Berlin");
var londonForecast = getWoeid("London");

//only the fastest to resolve or reject will be resolved
Promise.race([sydneyForecast, berlinForecast, londonForecast]).then(result => {
    var woeidObj = JSON.parse(result);
    console.log(woeidObj);
})
.catch(function(e) {
    console.log(e);
});
