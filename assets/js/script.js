// °
var city;
var asideSection = document.getElementById("clickListener");
var date = moment().format('L');

var flipHistory = [];
for (var y = 0; y < 7; y++) {

    if (localStorage.getItem("History" + y) !== null){
        flipHistory[y] = localStorage.getItem("History" + y);
    }

}

console.log(flipHistory);
var flipHistory1 = flipHistory.reverse();
console.log(flipHistory1);

for (var j = 0; j < 7; j++) {
    var historybtn = document.getElementById("btn" + j);
    historybtn.textContent = flipHistory1[j];
}

console.log(flipHistory);

var latLon = {
    APIKey: "a837c12832ce1b1f143bd6108aa84e92",

    fetchLocation: function () {
        fetch(
            "https://api.openweathermap.org/geo/1.0/direct?q="
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
    getLocation: function (data) {

        var lat = data[0].lat;
        var lon = data[0].lon;

        return { lat, lon };
    },

}

var weather = {
    APIKey: "a837c12832ce1b1f143bd6108aa84e92",

    fetchWeather: function (a) {

        fetch(
            "https://api.openweathermap.org/data/2.5/onecall?lat="
            + a.lat
            + "&lon="
            + a.lon
            + "&units=imperial"
            + "&appid="
            + this.APIKey
        )
            .then((response) => {
                return response.json();
            })
            .then((data) => this.displayWeather(data));
    },
    displayWeather: function (data) {
        console.log(data);
        const { temp, humidity } = data.current;
        const { uvi } = data.current;
        const { wind_speed } = data.current;
        const { icon, description } = data.current.weather[0];
        document.querySelector(".description").innerText = description;
        document.querySelector(".temp").innerText = "Temp: " + temp + " °F";
        document.querySelector(".wind").innerText = "Wind: " + wind_speed + " MPH";
        document.querySelector(".humidity").innerText = "Humidity: " + humidity + "%";
        document.querySelector(".uv").innerText = "UV Index: " + uvi;
        document.querySelector(".icon").src =
            "https://openweathermap.org/img/wn/" + icon + ".png";


        console.log(data.daily[0].weather);
        for (var k = 0; k < 5; k++) {
            //Time of the forecasted data, Unix, UTC
            const { dt } = data.daily[k];
            //Temperature
            const { day } = data.daily[k].temp;
            const { wind_speed } = data.daily[k];
            const { humidity } = data.daily[k];
            const { icon } = data.daily[k].weather[0];


            document.getElementById("forecastDate" + [k]).innerText = moment.unix(dt).format("MM/DD/YYYY");
            document.getElementById("temp" + [k]).innerText = "Temp: " + day + " °F";
            document.getElementById("wind" + [k]).innerText = "Wind: " + wind_speed + " MPH";
            document.getElementById("hmidity" + [k]).innerText = "Humidity: " + humidity + "%";
            document.getElementById("icon" + [k]).src =
                "https://openweathermap.org/img/wn/" + icon + ".png";

        }

    }
};

var i = 0;
asideSection.addEventListener('click', function (event) {

    if (localStorage.getItem("Index") !== null)
        i = localStorage.getItem("Index");

    var selectedButton = event.target;
    if (selectedButton.tagName != 'BUTTON')
        return;

    city = document.getElementById("searchInput").value;
    var displayCity = document.getElementById("cityName");
    displayCity.textContent = city + " (" + date + ")";

    localStorage.setItem("History" + [i], city);

    if (i < 7) {
        i++;
    }
    else {
        i = 0;
    }

    localStorage.setItem("Index", i);
    latLon.fetchLocation();

});



