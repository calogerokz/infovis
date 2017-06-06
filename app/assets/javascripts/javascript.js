
var request = function() {
    var input = $("#inputQ").val();
    $.ajax({
        url: "/query/"+input,
    }).done(function( data ) {
        for (i=0; i<data[0].length; i++) {
            for (j=0; j<data[0][i][0].length; j++) {
                $("#display").append(data[0][i][0][j]+" ");
            }
            $("#display").append("<br />");
        }
  });
};

