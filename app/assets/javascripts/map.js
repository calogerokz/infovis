$( document ).ready(function() {
    $("#monthSlider").slider({});
    $("#monthSlider").slider().on('slideStop', function(ev){
        $("#startDate").html($("#monthSlider").data('slider').getValue()[0]);
        $("#endDate").html($("#monthSlider").data('slider').getValue()[1]);
    });

});

