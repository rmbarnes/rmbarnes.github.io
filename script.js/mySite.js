// Current Location Scripts
$(function () {

    var status = $('#status');

    (function getGeoLocation() {
        status.text('Getting Location...');
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function (position) {
                var lat = position.coords.latitude;
                var long = position.coords.longitude;

                // Call the getData function, send the lat and long
                getData(lat, long);

            });
        } else {
            status.text("Your browser doesn't support Geolocation or it is not enabled!");
        }

    })();

    // Get the data from the wunderground API
    function getData(lat, long) {
        $.ajax({
            url: "http://api.wunderground.com/api/7f040ad384cf4dfb/geolookup/conditions/q/" + lat + "," + long + ".json",
            dataType: "jsonp",
            success: function (data) {
                var location = data['location']['city'];
                var temp_f = data['current_observation']['temp_f'];
                $("#cityDisplay").text(data.current_observation.display_location.full);

                $("title").text(data.current_observation.display_location.full + " | Weather Home");

                $("#currentTemp").html("Current " + Math.round(data.current_observation.temp_f) + "\xB0" + "F");

                $(".summary").text("Current Condition: " + data.current_observation.weather);
                $(".add1").text("Precipitation: " + data.current_observation.precip_today_in);
                $("#add2").text("Wind Speed: " + data.current_observation.wind_mph + " mph");
                $("#add3").text("Wind Direction: " + data.current_observation.wind_dir);
                $("#longitude").text("Longitude: " + data.current_observation.display_location.longitude);
                $("#latitude").text("Longitude: " + data.current_observation.display_location.latitude);
                $("#zip").text("Zip: " + data.current_observation.display_location.zip);


                $("#cover").fadeOut(250);

                console.log(data);
            }
        });

    }

    // A function for changing a string to TitleCase
    function toTitleCase(str) {
        return str.replace(/\w+/g, function (txt) {
            return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
        });
    }
});
