$( document ).ready(function() {
    $("#seasonSlider").slider({});
    $("#seasonSlider").slider().on('slideStop', function(ev){
        $.ajax({
            url: "/events/"+$("#seasonSlider").data('slider').getValue(),
        }).done(function( data ) {
            $("#eventContainer").html("");
            for(i=0; i<data[0].length; i++) {
                $("#eventContainer").append("<div class='row'><h4><a href='#' onclick='show("+data[0][i][0][0]+")'>"+data[0][i][0][6]+"</a></h4><p>"+data[0][i][0][7]+"</p></div>");

            }
        });
    });
});

var show = function(id) {
    $.ajax({
        url: "/events/"+$("#seasonSlider").data('slider').getValue(),
    }).done(function( data ) {
            $("#eventTitle").html("<center><h3>"+data[0][0][0][6]+"</h3></center>");
    });
};
