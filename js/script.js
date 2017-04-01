function viewModel() {
    var self = this;

    self.schoolOptions = ko.observableArray();
    self.selectedSchool = ko.observable();

    schools.forEach(function(obj, key) {
        self.schoolOptions.push(schools[key]);
    });

    // Sets the marker on the map for that school.
    self.setmarker = function() {

        self.selectedSchool(this.name);
        schools.forEach(function(obj, key) {
            // markers[key].setIcon();
            if (obj.title == self.selectedSchool()) {
              new google.maps.event.trigger(markers[key], 'click');
            }
        });
    };
}

ko.applyBindings(new viewModel());

var googleError = function() {
    alert("Failed to load GoogleMaps API");
    $('#map').append('<br>' + "Failed to load GoogleMaps API");
    $('#map').css({'font-size': '3em', 'color': '#f21'});
};
