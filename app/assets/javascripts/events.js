$( document ).ready(function() {
    $("#seasonSlider").slider({});
    $("#seasonSlider").slider().on('slideStop', function(ev){
        console.log($("#seasonSlider").data('slider').getValue());
    });

});

