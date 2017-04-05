var markers = [];
var map, bounds;

function initMap() {
    // Constructor that creates a new map with specified center and zoom.
    map = new google.maps.Map(document.getElementById('map'), {
        zoom: 7,
        center: schools[4].location,
        mapTypeControl: true,
        mapTypeControlOptions: {
            position: google.maps.ControlPosition.TOP_RIGHT
        }
    });

    bounds = new google.maps.LatLngBounds();
    var largeInfowindow = new google.maps.InfoWindow();

    for (var i = 0; i < schools.length; i++) {
        // Get position from the locations array.
        var position = schools[i].location;
        var title = schools[i].title;
        // Create markers per location and put into an array.
        var marker = new google.maps.Marker({
            position: position,
            title: title,
            map: map,
            animation: google.maps.Animation.DROP,
            id: i
        });
        // Add marker into markers array.
        markers.push(marker);
        // Create click event to open the infowindow for each marker.
        marker.addListener('click', function() {
            populateInfoWindow(this, largeInfowindow);
        });
        bounds.extend(markers[i].position);
    };

    // Extend the boundaries of the map for each marker.
    map.fitBounds(bounds);
};

// Toggle infowindow to show the marker
function populateInfoWindow(marker, infowindow) {

    // Reset other markers
    markers.forEach(function(obj, key) {
        markers[key].setIcon();
        markers[key].setAnimation(null);
    });

    // Check to make sure the infowindow is not already opened on this marker.
    if (infowindow.marker != marker) {
        // Clear the infowindow content to give the streetview time to load.
        infowindow.marker = marker;
        // NY Times API empty variables.
        var search = marker.title;
        var nytTitle, nytLink;
        // Function highlight will animate the marker with Bounce and fill infowindow.
        var highlight = function() {
            marker.setAnimation(google.maps.Animation.BOUNCE);
            infowindow.setContent('<div><h3>' +
                search +
                '</h3><hr><img src="img/' + search + '.jpg" alt="' + search + '"width="300px"><hr>' +
                '<h4>Recent NY Times Articles:</h4>' +
                '<ul><a target="_blank" href="' +
                nytLink +
                '">' +
                nytTitle +
                '!</a></ul></div>');
            infowindow.open(map, marker);
            // Make sure the marker property is cleared if the infowindow is closed.
            infowindow.addListener('closeclick', function() {
                infowindow.highlight = null;
                marker.setAnimation(null);
            });
        };
        // Function searchNYT will load articles about the marker.title (school's name).
        var searchNYT = function(search) {
            var nytURL = 'https://api.nytimes.com/svc/search/v2/articlesearch.json';
            nytURL += '?' + $.param({
                'api-key': "a95a6716530741a9b3561d0c3ab53d58",
                'q': search,
                'sort': "newest"
            });

            $.getJSON(nytURL)
                .done(function(data) {
                    if (data[0] !== 'undefined') {
                        articles = data.response.docs;
                        for (var i = 0; i < articles.length; i++) {
                            var article = articles[i];
                            nytTitle = article.headline.main;
                            nytLink = article.web_url;
                        }
                        highlight();
                    }
                })
                .fail(function(data) {
                    nytTitle = "Failed to load articles";
                    highlight();
                });
        };
        searchNYT(search);
    };
};
