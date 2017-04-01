// Blank array for all the markers.
var markers = [];
var map, bounds;

function initMap() {
    // Constructor that creates a new map with specified center and zoom.
    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 12,
        center: {lat: 39.768403, lng: -86.158068},
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
        var title = schools[i].name;
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

// Reset infowindow to show only the marker.
function populateInfoWindow(marker, infowindow) {
// Check to make sure the infowindow is not already opened on this marker.
    if (infowindow.marker != marker) {
      // Clear the infowindow content to give the streetview time to load.
      infowindow.setContent('');
      infowindow.marker = marker;
      // Make sure the marker property is cleared if the infowindow is closed.
      infowindow.addListener('closeclick', function() {
        infowindow.marker = null;
      });
      var streetViewService = new google.maps.StreetViewService();
      var radius = 50;
      // In case the status is OK, which means the pano was found, compute the
      // position of the streetview image, then calculate the heading, then get a
      // panorama from that and set the options
      function getStreetView(data, status) {
        if (status == google.maps.StreetViewStatus.OK) {
          var nearStreetViewLocation = data.location.latLng;
          var heading = google.maps.geometry.spherical.computeHeading(
            nearStreetViewLocation, marker.position);
            infowindow.setContent('<div>' + marker.title + '</div><div id="pano"></div>');
            var panoramaOptions = {
              position: nearStreetViewLocation,
              pov: {
                heading: heading,
                pitch: 30
              }
            };
          var panorama = new google.maps.StreetViewPanorama(
            document.getElementById('pano'), panoramaOptions);
        } else {
          infowindow.setContent('<div>' + marker.title + '</div>' +
            '<div>No Street View Found</div>');
        }
      }
      // Use streetview service to get the closest streetview image within
      // 50 meters of the markers position
      streetViewService.getPanoramaByLocation(marker.position, radius, getStreetView);
      // Open the infowindow on the correct marker.
      infowindow.open(map, marker);
    }
  }

