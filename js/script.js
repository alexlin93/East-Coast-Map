function viewModel() {
    var self = this;

    self.schoolOptions = ko.observableArray();
    self.selectedState = ko.observable();
    self.selectedSchool = ko.observable();

    schools.forEach(function(obj, key) {
        self.schoolOptions.push(schools[key]);
    });

    // Sets the marker on the map for that school.
    self.filter = function() {

        self.schoolOptions.removeAll();
        schools.forEach(function(obj, key) {
            self.schoolOptions.push(schools[key]);
            markers[key].setVisible(true);
        });

        schools.forEach(function(obj, key) {
            if (self.selectedState() !== 'All') {
              if (obj.state !== self.selectedState()) {
                self.schoolOptions.remove(obj);
                markers[key].setVisible(false);
              }
            }
        });
    };

    self.setmarker = function() {
      self.selectedSchool(this.title);
      schools.forEach(function(obj, key) {
        if (obj.title === self.selectedSchool()) {
          new google.maps.event.trigger(markers[key], 'click');
        }
      });
    };
};

ko.applyBindings(new viewModel());

var googleError = function() {
    alert("Failed to load GoogleMaps API");
    $('#map').append('<br>' + "Failed to load GoogleMaps API");
    $('#map').css({'font-size': '3em', 'color': '#f21'});
};
