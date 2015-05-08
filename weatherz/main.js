buttonZip = document.querySelector('.zipButton');
buttonGeo = document.querySelector('.geoButton');
locality = document.querySelector('h4')
var API_URL = 'http://api.wunderground.com/api/2b16c107eda21585/';
var geoLookup = 'forecast/geolookup/q/autoip.json';
var tenDay = 'forecast10day/geolookup/q/autoip.json';
var day0 = document.querySelector(".day0");
var day1 = document.querySelector(".day1");
var day2 = document.querySelector(".day2");
var day3 = document.querySelector(".day3");
var day4 = document.querySelector(".day4");

buttonGeo.onclick = function () {
getJSON(API_URL + geoLookup, function(data) {
  var span = document.querySelector('span');
  var locationMessage = 'for ' + data.location.city + ', ' + data.location.state;
  span.innerHTML = data.forecast.simpleforecast.forecastday[0].high.fahrenheit;
  locality.innerHTML = locationMessage;
});




var forecast = ["","","","",""];
    
    getJSON(API_URL + geoLookup, function(data) {
      data.forecast.simpleforecast.forecastday.forEach(function(day, i){
        forecast[i] += "<div>" + data.forecast.simpleforecast.forecastday[i].date.weekday + "</div>";
        forecast[i] += "<div>" + data.forecast.simpleforecast.forecastday[i].high.fahrenheit + "</div>";
        forecast[i] += "<img src='" + data.forecast.simpleforecast.forecastday[i].icon_url + "'>";
        forecast[i] += "<div>" + data.forecast.simpleforecast.forecastday[i].low.fahrenheit + "</div>";  
        day0.innerHTML = forecast[0];
        day1.innerHTML = forecast[1];
        day2.innerHTML = forecast[2];
        day3.innerHTML = forecast[3];
        day4.innerHTML = forecast[4];
      });
    });
};

buttonZip.onclick = function () {
  var input = document.querySelector('.zip');
  var zip = input.value;
getJSON(API_URL + 'forecast/q/'+ zip + '.json', function(data) {
  var locationMessage = 'for ' + data.location.city + ', ' + data.location.state;
  var span = document.querySelector('span');
  span.innerHTML = data.forecast.simpleforecast.forecastday[0].high.fahrenheit
  locality.innerHTML = locationMessage;
});
};




function getJSON(url, cb) {
  var xhr = new XMLHttpRequest ();
  xhr.open('GET', url);
  xhr.onload = function () {
    if (this.status >=200 && this.status <400) {
      cb(JSON.parse(this.response));
    }
};
xhr.send();
};

