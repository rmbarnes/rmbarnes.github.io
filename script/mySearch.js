$('#myQuery').keyup(function() {

    var value = $('#myQuery').val();
    var rExp = new RegExp(value, "i");



    $.getJSON("https://autocomplete.wunderground.com/aq?query=" + value + "&cb=?", function (data) {
        console.log(data);

        //Begin building output
        var output = '<ol>';
        $.each(data.RESULTS, function (key, val) {
            if (val.name.search(rExp) != -1) {
                output += '<li>';
                output += '<a href=# value=' + val.lat + "," + val.lon + ' title="See results for ' + val.name + '">' + val.name + '</a>';
                output += '</li>';

            }
        });


        output += '</ol>';
        $("#sResults").html(output);
    });
});

// Get weather data from wunderground.com
function getData(input) {
    // Get the data from the wunderground API
    $.ajax({
        url: "//api.wunderground.com/api/7f040ad384cf4dfb/geolookup/conditions/q/"
        + input + ".jsonp"
        , dataType: "jsonp"
        , success: function (data) {
            console.log(data);
            var location = data.location.city + ', ' + data.location.state;
            var temp_f = data.current_observation.temp_f;
            console.log('Location is: ' + location);
            console.log('Temp is: ' + temp_f);
            $("#cityDisplay").text(location);
            $("title").html(location + " | Weather Center");
            $("#currentTemp").html("Current temperature: " + Math.round(temp_f) + '°');



            $(".summary").text("Current Condition: " + data.current_observation.weather);
            $(".add1").text("Precipitation: " + data.current_observation.precip_today_in + "%");
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


$("#sResults").on("click", "a", function(event) {
    var elem = $(this);
    console.log(elem);
    var loc = elem.attr("value");
    console.log(loc);
    getData(loc);
    $("#sResults").hide();

    });

$("#toggleButton").click(function() {
    $("#sResults").slideToggle();
});



function toTitleCase(str){
    return str.replace(/\w+/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
}


