$(function () {
    $.getJSON("/acme/js/acme.json", function (data) {
        console.log(data);

        //Begin building output
        var output = '<li><a href="/acme/support/index.html">Home</a></li>';
        var counter = 0;
        $.each(data.Navigation, function (key) {

            output += '<li>';
            output += '<a href=#>' + data.Navigation[counter] + '</a>';
            output += '</li>';
            counter++;
        });

        $(".pageNav ul").html(output);
//        $("#productContent").css("display", "none");
    });
});


// Intercept the menu link clicks
$(".pageNav").on("click", "a", function (evt) {
    //evt.preventDefault();
    // With the text value get the needed value from the acme.json file
    var site = $(this).text(); // Anvils, etc...
    console.log(site);
    $.ajax({
        url: "/acme/js/acme.json",
        dataType: "json",
        success: function (data) {
            console.log(data[site].name);
            $("title").html(site + " | ACME");

            $(".mainTitle").html(site);
            $("#name").html(data[site].name);

            console.log(data[site].path);
            $("#productPic").empty("img");
            $("#productPic").append("<img src='" + data[site].path + "'alt='product picture ' >");
//            $("#productPic").attr("alt", "Picture of product");


            $("#descr").html(data[site].description);
            $("#manu").html("Made by: " + data[site].manufacturer);
            $("#price").html("Price: $" + data[site].price);
            $("#rev").html("Reviews: " + data[site].reviews + "/5 stars");
            $(".homeContent").css("display", "none");
            $(".mainTitle").css("display", "none");
            $("#bottomHalf").css("display", "none");
//            $("#productContent").css("display", "inline");


        }
    });
});


// A function for changing a string to TitleCase
function toTitleCase(str) {
    return str.replace(/\w+/g, function (txt) {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
}
