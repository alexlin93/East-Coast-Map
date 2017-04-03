var states = ko.observableArray([
  'All',
  'New Jersey',
  'Pennsylvania',
  'Virginia',
  'Washington D.C.',
  ]);

  // each school has the properties:
  // title : '',
  // state : '',
  // location : {lat: , lng: },

var schools = [
  {
    title : 'Carnegie Mellon University',
    state : 'Washington D.C.',
    location : {lat: 38.897985, lng: -77.028252}
  },
  {
    title : 'George Mason University',
    state : 'Virginia',
    location : {lat: 38.8345098, lng: -77.31111559999999}
  },
  {
    title : 'Rutgers University',
    state : 'New Jersey',
    location : {lat: 40.5014869, lng: -74.44705359999999}
  },
  {
    title : 'University of Pittsburgh',
    state : 'Pennsylvania',
    location : {lat: 40.4443282, lng: -79.95315479999999}
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
