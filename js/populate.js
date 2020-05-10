$.getJSON( "../data/courses.json", function( data ) {
    $.each(data, function(_, element) {
        var items = [];
        $.each(element, function(key, val) {
            console.log(key);
            console.log(val);
            items.push( `<li>${key}: ${val}</li>` );
        });
        $( "<ul/>", {
            "class": "course",
            html: items.join("\n")
        }).appendTo(".rows");
    });
});