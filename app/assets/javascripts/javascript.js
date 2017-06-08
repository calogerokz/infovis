
var request = function() {
    var input = $("#inputQ").val();
    $.ajax({
        url: "/query/"+"select id from random311",
    }).done(function( data ) {
        console.log(data)
  });
};

