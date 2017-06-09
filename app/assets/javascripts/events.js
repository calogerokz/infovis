$( document ).ready(function() {
    $("#seasonSlider").slider({});
    $("#seasonSlider").slider().on('slideStop', function(ev){
        $.ajax({
            url: "/events/"+$("#seasonSlider").data('slider').getValue(),
        }).done(function( data ) {
            $("#eventContainer").html("");
            for(i=0; i<data[0].length; i++) {
                $("#eventContainer").append("<div class='row'><h4>"+data[0][i][0][6]+"</h4><p>"+data[0][i][0][6]+"</p></div>");

            }
            console.log(data[0][0][0][2]);
        });
    });



});

