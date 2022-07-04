var APIKey = "a837c12832ce1b1f143bd6108aa84e92";
var city;
var asideSection = document.getElementById("clickListener");


asideSection.addEventListener('click', function(event){
    var selectedButton = event.target;
    if (selectedButton.tagName != 'BUTTON') 
    return;
    city = document.getElementById("searchInput").value;
    var displayCity = document.getElementById("cityName");
    displayCity.textContent = city;
    var queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + APIKey;
    localStorage.setItem("LastSearched", city);
    console.log("LastSearched", city)
    fetch(queryURL);
    console.log("queryURL " + queryURL)
    console.log("queryURL " + city)
   
})