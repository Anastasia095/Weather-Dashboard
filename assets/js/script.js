// °
var city;
var asideSection = document.getElementById("clickListener");
var date = moment().format('L');


var latLon = {
    APIKey: "a837c12832ce1b1f143bd6108aa84e92",

    fetchLocation: function() {
        fetch(
            "http://api.openweathermap.org/geo/1.0/direct?q="
            + city
            + "&limit=1&appid="
            + this.APIKey
        ).then((response) => {
            return response.json();
          })
          .then((data) => this.getLocation(data))
            .then((data) => {
                weather.fetchWeather(data);
            });

    },
    getLocation: function(data) {

        var lat = data[0].lat;
        var lon = data[0].lon;
        
        return { lat, lon };   
    },

}


// var location = this.getLocation;
// fetch(
//     "https://api.openweathermap.org/data/2.5/onecall?lat="
//     + lat
//     + "&lon="
//     + lon
//     + "&appid="
//     + this.APIKey
// )

var weather = {
    APIKey: "a837c12832ce1b1f143bd6108aa84e92",
    
    fetchWeather: function(a) {

        fetch(
            "https://api.openweathermap.org/data/2.5/onecall?lat="
            + a.lat
            + "&lon="
            + a.lon
            + "&units=imperial"
            + "&appid="
            + this.APIKey
            // "http://api.openweathermap.org/data/2.5/weather?q="
            // + city
            // + "&units=imperial"
            // + "&appid="
            // + this.APIKey
        )
        .then((response) => {
            return response.json();
          })
          .then((data) => this.displayWeather(data));
      },
    displayWeather: function(data) {
        console.log(data);
        // const { name } = data;
        // const { temp, humidity} = data.main;
        const { temp, humidity} = data.current;
        const { uvi } = data.current;
        // const { speed } = data.wind;
        const { wind_speed } = data.current;
        document.querySelector(".temp").innerText = "Temp: " + temp + "°F";
        document.querySelector(".wind").innerText = "Wind: " + wind_speed + " MPH";
        document.querySelector(".humidity").innerText = "Humidity: " + humidity + "%";
        document.querySelector(".uv").innerText = "UV Index: " + uvi;
    }
};


asideSection.addEventListener('click', function(event){
    var selectedButton = event.target;
    if (selectedButton.tagName != 'BUTTON') 
    return;
    city = document.getElementById("searchInput").value;
    var displayCity = document.getElementById("cityName");
    displayCity.textContent = city + " (" + date + ")";

    localStorage.setItem("LastSearched", city);
    //console.log("LastSearched", city)

    latLon.fetchLocation();

    //var locInfo = latLon.fetchLocation();
    /*var latLonResult;

    console.log(locInfo);

    locInfo.then((data) => weather.fetchWeather(data));*/
   
    /*const locInfoResult = async () => {
        const a = await locInfo;
        weather.fetchWeather(a);

        //console.log(a);
      };    
    locInfoResult();*/

    //latLonResult = locInfoResult();
    
    //locInfo.then((data) => weather.fetchWeather(data));
    //weather.fetchWeather();

    
    //console.log(latLonResult);
});



