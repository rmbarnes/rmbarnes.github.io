// Get weather data from wunderground.com
function getData(input) {
    // Get the data from the wunderground API
    $.ajax({
        url: "//api.wunderground.com/api/7f040ad384cf4dfb/geolookup/conditions/q/"
        + input + ".json"
        , dataType: "jsonp"
        , success: function(data) {
            console.log(data);
            var location = data.location.city + ', ' + data.location.state;
            var temp_f = data.current_observation.temp_f;
            console.log('Location is: ' + location);
            console.log('Temp is: ' + temp_f);
            $("#cityDisplays").text(location);
            $("title").html(location + " | Weather Center");
            $("#currentT").html("Current temperature: " + Math.round(temp_f) + '°');

            $(".summary").text("Current Condition: " + data.current_observation.weather);
            $(".precip").text("Precipitation: " + data.current_observation.precip_today_in + "%");
            $("#add2").text("Wind Speed: " + data.current_observation.wind_mph + " mph");
            $("#add3").text("Wind Direction: " + data.current_observation.wind_dir);
            $("#longitude").text("Longitude: " + data.current_observation.display_location.longitude);
            $("#latitude").text("Longitude: " + data.current_observation.display_location.latitude);
            $("#zip").text("Zip: " + data.current_observation.display_location.zip);

            $("#cover").fadeOut(250);
        }
    });
}


// Intercept the menu link clicks
$("#page-nav").on("click", "a", function(evt) {
    evt.preventDefault();
    // With the text value get the needed value from the weather.json file
    var jsonCity = $(this).text(); // Franklin, etc...
    console.log(jsonCity);
    $.ajax({
        url: "/script/weather.json"
        , dataType: "json"
        , success: function (data) {
            console.log(data);
            console.log(data[jsonCity]);
            var zip = data[jsonCity].zip;
            console.log(zip);
            getData(zip);
        }
    });
});


// A function for changing a string to TitleCase
function toTitleCase(str){
    return str.replace(/\w+/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
}
