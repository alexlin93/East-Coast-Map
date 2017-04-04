var states = ko.observableArray([
  'All',
  'New Jersey',
  'Pennsylvania',
  'Virginia',
  ]);

  // each school has the properties:
  // title : '',
  // state : '',
  // location : {lat: , lng: },

var schools = [
  {
    title : 'Carnegie Mellon University',
    state : 'Pennsylvania',
    location : {lat: 40.443466, lng: -79.943457}
  },
  {
    title : 'George Mason University',
    state : 'Virginia',
    location : {lat: 38.831554, lng: -77.312089}
  },
  {
    title : 'Rutgers University',
    state : 'New Jersey',
    location : {lat: 40.500819, lng: -74.447399}
  },
  {
    title : 'University of Pittsburgh',
    state : 'Pennsylvania',
    location : {lat: 40.4443282, lng: -79.960835}
  },
  {
    title : 'University of Pennsylvania',
    state : 'Pennsylvania',
    location : {lat: 39.952219, lng:-75.193214}
  },
  {
    title : 'Drexel University',
    state : 'Pennsylvania',
    location : {lat: 39.956613, lng:-75.189944}
  },
];
