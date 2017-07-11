$( document ).ready(function() {
    $("#seasonSlider").slider({id: "sSlider", min:1, max:4, value:1, step:1, tooltip:"hide", ticks:[1,2,3,4], ticks_labels:["winter","spring","summer","autum"]});
    $("#seasonSlider").slider().on('slideStop', function(ev){
        var sliderDay = $("#seasonSlider").data('slider').getValue();
        sliderF(sliderDay);
    });
    sliderF("noSeason");
});

var sliderF = function(sd){
    $.ajax({
        url: "/events/"+sd,
    }).done(function( data ) {
        $("#eventContainer").html("");
        for(i=0; i<data[0].length; i++) {
            $("#eventContainer").append("<div class='row'><h4><a href='#statistics' class='evTitle' onclick='show("+data[0][i][0][0]+")'>"+data[0][i][0][6]+"</a></h4><p>"+data[0][i][0][7]+"</p></div>");

        }
    });
    if (sd == "1") {
        $("#eventStream").html('<iframe width="800" height="600" src="https://app.powerbi.com/view?r=eyJrIjoiNTBhZmRlYTctNDYxYS00MWQ0LTllYzktYmUxZjJlMDE3MThmIiwidCI6IjMwNWU1OTVmLWU5YzItNDRmOC05ZGEwLTNhODMzNzA1MTg4YyIsImMiOjh9" frameborder="0" allowFullScreen="true"></iframe>');
    } else if (sd == "2") {
        $("#eventStream").html('<iframe width="800" height="600" src="https://app.powerbi.com/view?r=eyJrIjoiZmU1YTg3YTctODNhOC00MDVlLThmZjYtODQ4MjhhMGI4Nzc3IiwidCI6IjMwNWU1OTVmLWU5YzItNDRmOC05ZGEwLTNhODMzNzA1MTg4YyIsImMiOjh9" frameborder="0" allowFullScreen="true"></iframe>');
    } else if (sd == "3") {
        $("#eventStream").html('<iframe width="800" height="600" src="https://app.powerbi.com/view?r=eyJrIjoiM2UzMmJkNDEtYjVjYS00MzA4LTgzYmMtNDVmYmY0ZDZiMmI4IiwidCI6IjMwNWU1OTVmLWU5YzItNDRmOC05ZGEwLTNhODMzNzA1MTg4YyIsImMiOjh9" frameborder="0" allowFullScreen="true"></iframe>');
    } else if (sd == "4") {
        $("#eventStream").html('<iframe width="800" height="600" src="https://app.powerbi.com/view?r=eyJrIjoiODEyMTNhNWQtYWJhZC00NzY3LWJhZDUtOGQ2ZmY3MGQyYmEzIiwidCI6IjMwNWU1OTVmLWU5YzItNDRmOC05ZGEwLTNhODMzNzA1MTg4YyIsImMiOjh9" frameborder="0" allowFullScreen="true"></iframe>');
    }
};

var dayStart = "";
var dayTransit ="";

var show = function(id) {
    var url = "/events/id/"+id;
    $.ajax({
        url: url,
    }).done(function( data ) {
            dayStart = moment(data[0][11]);
            var nrDays = moment(data[0][13],"YYYY-MM-DD").diff(moment(data[0][11],"YYYY-MM-DD"))/86400000+1;
            $("#eventTitle").html("<center><h3>"+data[0][6]+"</h3></center>");
            var ticks = "[";
            for (i = 1; i <= nrDays; i++) {
                if (i==nrDays) {
                    ticks = ticks+i+"]";
                } else {
                    ticks = ticks+i+", ";
                }
            }
            $("#event").html("<input id='eventSlider' type='text' data-provide='slider' data-slider-ticks="+ticks+" data-slider-min='1' data-slider-max="+nrDays+" data-slider-step='1' data-slider-value='1' data-slider-tooltip='hide' style='width:100%;' /><br/><br/>");
            $("#eventSlider").slider({});
            $("#eventSlider").slider().on('slideStop', function(ev){
                var day = $("#eventSlider").data('slider').getValue();
                day = day-1;
                dayTransit = dayStart;
                dayTransit.add(day, 'days');
                getPoints(dayTransit.format(),data[0][12]);
            });
            $("#event").append("<div id='title' style='height:50px;'><h3>"+data[0][12]+"</h3></div>");
            $("#event").append("<div id='map' style='height:500px;'></div>");

            initMap();
            getPoints(dayStart.format(),data[0][12]);
            $("#event").append("<br/><h3>Top 5 complaints statistics for 3 days</h3>1."+data[0][1]+"<br/> 2."+data[0][2]+"<br/> 3."+data[0][3]+"<br/> 4."+data[0][4]+"<br/> 5."+data[0][5]);
    });
};

var map, heatmap;

function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        zoom: 10,
        center: {lat: 40.8100776000249, lng: -73.9211481585962},
        mapTypeId: 'roadmap'
    });

    heatmap = new google.maps.visualization.HeatmapLayer({
        data: [],
        map: map
    });
}

function getPoints(d,highlight) {
    var dateString = d.split("-")[2].split("T")[0]+"/"+d.split("-")[1]+"/"+d.split("-")[0];
    $.ajax({
        url: "/events/highlight/"+highlight+"/"+dateString,
    }).done(function( data ) {
        points = [];
        for (i=0;i<data[0].length;i++) {
            points.push(new google.maps.LatLng(parseFloat(data[0][i][0][0]),parseFloat(data[0][i][0][1])));
        }
        heatmap.setData(points);

    });
}

function getCount(d,e1,e2,e3,e4,e5) {
    $.ajax({
        url: "/events/count/"+e1+"/"+e2+"/"+e3+"/"+e4+"/"+e5+"/"+dateString,
    }).done(function( data ) {
        console.log(data);
    });
}

