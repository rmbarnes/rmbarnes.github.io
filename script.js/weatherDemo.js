jQuery(document).ready(function ($) {
    $.ajax({
        url: "https://api.wunderground.com/api/7f040ad384cf4dfb/forecast/geolookup/conditions/q/SC/Greenville.json",
        dataType: "jsonp",
        success: function (data) {
            var location = data['Greenville']['city'];
            var temp_f = data['Greenville']['high'];
            console.log("Current temperature in " + location + " is: " + temp_f);

            var locName = $('#locName');
            var highTemp = $('#highTemp');
            var tempMessage = $('#tempMessage');

            locName.text(location);
            highTemp.text(temp_f);
            tempMessage.text("Current temperature in " + location + " is: " + temp_f);
        }
    });
});
