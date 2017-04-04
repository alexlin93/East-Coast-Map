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

          var $nytHeaderElem = $('#nytimes-header');
          var $nytElem = $('#nytimes-articles');

          // clear out old data before new request
          $nytElem.text("");

          var college = obj.title;

          var nytURL = 'https://api.nytimes.com/svc/search/v2/articlesearch.json';
          nytURL += '?' + $.param({
              'api-key': "a95a6716530741a9b3561d0c3ab53d58",
              'q': college,
              'sort': "newest"
          });

          $.getJSON(nytURL)
              .done(function(data) {
                  $nytHeaderElem.text('New York Times Articles About ' + college)
                      ;

                  articles = data.response.docs;
                  for (var i = 0; i < articles.length; i++) {
                      var article = articles[i];
                      $nytElem.append('<li class="article">' +
                          '<a href="' + article.web_url + '">' + article.headline.main +
                              '</a>' +
                          '<p>' + article.snippet + '</p>' +
                      '</li>');
                      }
              })
              .fail(function(e) {
                  $nytHeaderElem.text('New York Times Articles Could Not Be Loaded');
          });
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
