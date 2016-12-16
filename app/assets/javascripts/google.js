// function initMap() {
//   var map = new google.maps.Map(document.getElementById('map'), {
//     zoom: 4,
//     center: {lat: 34.698520, lng: 135.547215}  // osaka.
//   });

//   var directionsService = new google.maps.DirectionsService;
//   var directionsDisplay = new google.maps.DirectionsRenderer({
//     draggable: true,
//     map: map,
//     panel: document.getElementById('right-panel')
//   });

//   directionsDisplay.addListener('directions_changed', function() {
//     computeTotalDistance(directionsDisplay.getDirections());
//   });
//   displayRoute({lat: 34.685805, lng: 135.520839}, {lat: 34.638419, lng: 135.419228}, directionsService,
//       directionsDisplay);
// }
// function displayRoute(origin, destination, service, display) {
//   service.route({
//     origin: origin,
//     destination: destination,
//     waypoints: [{location: {lat: 34.681447, lng: 135.533316}},
//                 {location: {lat: 34.666009, lng: 135.528898}},
//                 {location: {lat: 34.667120, lng: 135.500377}},
//                 {location: {lat: 34.692524, lng: 135.501049}},
//                 {location: {lat: 34.692847, lng: 135.525379}},
//                 {location: {lat: 34.694361, lng: 135.501093}},
//                 {location: {lat: 34.666946, lng: 135.500048}},
//                 {location: {lat: 34.667551, lng: 135.479776}},
//                 {location: {lat: 34.674991, lng: 135.481133}},
//                 {location: {lat: 34.667551, lng: 135.479776}},
//                 {location: {lat: 34.666946, lng: 135.500048}},
//                 {location: {lat: 34.655325, lng: 135.497787}},
//                 {location: {lat: 34.654449, lng: 135.505484}},
//                 {location: {lat: 34.659037, lng: 135.490179}},
//                 {location: {lat: 34.649553, lng: 135.490243}},
//                 {location: {lat: 34.649389, lng: 135.497482}},
//                 {location: {lat: 34.623359, lng: 135.490346}},
//                 {location: {lat: 34.620749, lng: 135.475964}},
//                 {location: {lat: 34.609081, lng: 135.473201}},
//                 {location: {lat: 34.627606, lng: 135.432100}},
//                 {location: {lat: 34.630179, lng: 135.438037}},
//                 {location: {lat: 34.638693, lng: 135.436335}},
//                 {location: {lat: 34.637278, lng: 135.427844}},
//                 {location: {lat: 34.641450, lng: 135.422025}},
//                 {location: {lat: 34.640108, lng: 135.414006}}],
//     travelMode: google.maps.TravelMode.WALKING,
//     avoidTolls: true
//   }, function(response, status) {
//     if (status === google.maps.DirectionsStatus.OK) {
//       display.setDirections(response);
//     } else {
//       alert('Could not display directions due to: ' + status);
//     }
//   });
// }

// function computeTotalDistance(result) {
//   var total = 0;
//   var myroute = result.routes[0];
//   for (var i = 0; i < myroute.legs.length; i++) {
//     total += myroute.legs[i].distance.value;
//   }
//   total = total / 1000;
//   document.getElementById('total').innerHTML = total + ' km';
// }
// function initialize() {
//   var fenway = {lat: 42.345573, lng: -71.098326};
//   var map = new google.maps.Map(document.getElementById('map'), {
//     center: fenway,
//     zoom: 14
//   });
//   var panorama = new google.maps.StreetViewPanorama(
//       document.getElementById('pano'), {
//         position: fenway,
//         pov: {
//           heading: 214,
//           pitch: 100
//         }
//       });
//   map.setStreetView(panorama);
// }

// This example creates a simple polygon representing the Bermuda Triangle.
// When the user clicks on the polygon an info window opens, showing
// information about the polygon's coordinates.

var map;
var infoWindow;

function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    zoom: 5,
    center: {lat: 24.886, lng: -70.268},
    mapTypeId: google.maps.MapTypeId.TERRAIN
  });

  // Define the LatLng coordinates for the polygon.
  var triangleCoords = [
      {lat: 25.774, lng: -80.190},
      {lat: 18.466, lng: -66.118},
      {lat: 32.321, lng: -64.757}
  ];

  // Construct the polygon.
  var bermudaTriangle = new google.maps.Polygon({
    paths: triangleCoords,
    strokeColor: '#FF0000',
    strokeOpacity: 0.8,
    strokeWeight: 3,
    fillColor: '#FF0000',
    fillOpacity: 0.35
  });
  bermudaTriangle.setMap(map);

  // Add a listener for the click event.
  bermudaTriangle.addListener('click', showArrays);

  infoWindow = new google.maps.InfoWindow;
  alert(triangleCoords.latLng);
}

/** @this {google.maps.Polygon} */
function showArrays(event) {
  // Since this polygon has only one path, we can call getPath() to return the
  // MVCArray of LatLngs.
  var vertices = this.getPath();

  var contentString = '<b>Bermuda Triangle polygon</b><br>' +
      'Clicked location: <br>' + event.latLng.lat() + ',' + event.latLng.lng() +
      '<br>';

  // Iterate over the vertices.
  for (var i =0; i < vertices.getLength(); i++) {
    var xy = vertices.getAt(i);
    contentString += '<br>' + 'Coordinate ' + i + ':<br>' + xy.lat() + ',' +
        xy.lng();
  }

  // Replace the info window's content and position.
  infoWindow.setContent(contentString);
  infoWindow.setPosition(event.latLng);
  infoWindow.open(map);


}