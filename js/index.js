const url = "http://en.wikipedia.org/w/api.php?action=opensearch&format=json&limit=15&search=";
const $results = $('#results');
const $search = $("#search");

function getResult(title, descrption, link) {
    const html = `<li><a href=${link}><h2>${title}</h2><p>${descrption}</p></a></li>`;
    $results.append(html);
}

function search() {
    $.ajax({
        // To avoid unexpected requests to the server, you should call encodeURIComponent 
        // on any user-entered parameters that will be passed as part of a URI.
        url: url + encodeURIComponent($search.val()),
        jsonp: "callback",
        dataType: "jsonp",
        success: function(data) {
            // Empty before inserting everything
            $results.empty();
            for (var i = 0; i < data[1].length; i++) {
                getResult(data[1][i], data[2][i], data[3][i]);
            }
        }
    });
}
$search.keyup(event => search());

$("#empty").click(() => {
    $search.val('');
    $results.empty();
});