$('#myQuery').keyup(function() {

    var value = $('#myQuery').val();
    var rExp = new RegExp(value, "i");



    $.getJSON("http://autocomplete.wunderground.com/aq?query=" + value + "&cb=?", function (data) {
        console.log(data);

        //Begin building output
        var output = '<ol>';
        $.each(data.RESULTS, function (key, val) {
            if (val.name.search(rExp) != -1) {
                output += '<li>';
                output += '<a href="//www.wunderground.com' + val.l + '" title="See results for ' + val.name + '">' + val.name + '</a>';
                output += '</li>';

            }
        });
        output += '</ol>';
        $("#sResults").html(output);
    });
});
