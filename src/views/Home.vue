<style>
body,
html {
  height: 100%;
  margin: 0;
  font-family: Arial, Helvetica, sans-serif;
}

* {
  box-sizing: border-box;
}

.bg-image {
  /* The image used */
  background-image: url("./img/bg-blur-image.jpg");

  /* Add the blur effect */
  /* filter: blur(8px);
  -webkit-filter: blur(8px); */

  /* Full height */
  height: 100%;

  /* Center and scale the image nicely */
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
}

/* Position text in the middle of the page/image */
.bg-text {
  background-color: rgb(0, 0, 0); /* Fallback color */
  background-color: rgba(0, 0, 0, 0.4); /* Black w/opacity/see-through */
  color: white;
  font-weight: bold;
  border: 3px solid #f1f1f1;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 2;
  width: 80%;
  padding: 20px;
  text-align: center;
}
.main-text {
  background-color: rgb(0, 0, 0); /* Fallback color */
  background-color: rgba(0, 0, 0, 0.4); /* Black w/opacity/see-through */
  color: white;
  font-weight: bold;
  border: 3px solid #f1f1f1;
  padding: 20px;
  text-align: center;
  font-size: 50px;
}
.bg-text-style {
  background-color: rgb(0, 0, 0); /* Fallback color */
  background-color: rgba(0, 0, 0, 0.4); /* Black w/opacity/see-through */
  color: white;
  font-weight: bold;
  border: 3px solid #f1f1f1;
  position: absolute;
  top: 70%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 2;
  width: 20%;
  padding: 20px;
  text-align: center;
}
.blur {
  z-index: 1;
  height: 100%;
  filter: blur(8px);
  -webkit-filter: blur(8px);
}
</style>
 
<template>
  <div class="bg-image">
    <v-container fluid>
      <v-layout>
        <v-flex>
          <v-col>
            <v-col>
              <div class="main-text" align="center">
                <h1 style="text-align: center;">Le Bistrot d'Andre</h1>
              </div>
            </v-col>
        
            <v-row>
              <div id="maps"></div>
            </v-row>

            <v-col>
              <div class="bg-text">
                <h1>BOOKINGS NOW AVAILABLE</h1>
                <h2>69 Commonwealth St, Surry Hills NSW 2010</h2>
                <h3>02 9281 3322</h3>
                <h3>eat@lebistrot.com.au</h3>
              </div>
            </v-col>      
          </v-col>
        </v-flex>
      </v-layout>
    </v-container>
  </div>

</template>


<script async defer
    src="https://maps.googleapis.com/maps/api/js?key=AIzaSyALKwFMBtlWJ8nZgTeKTmkFwbH_J0B2pQM&libraries=places&callback=initMap">
</script>

<script>
export default {
	name: "Home",
};

var locations = [
  { lat: -33.865143, lng: 151.206 },
  { lat: -33.8652, lng: 151.21 },
  { lat: -33.79, lng: 151.2091 },
  { lat: -33.84, lng: 151.2098 },
  { lat: -33.9, lng: 149.6 },
  { lat: -33.9, lng: 149.6 },
  { lat: -35.9, lng: 149.2 },
];
var names = [
  "Aiden Boal",
  "Bryan Lifschitz",
  "Ethel Podany",
  "Fabian Sanderford",
  "Gage Wildridge",
  "Dr Tim",
];
var markers = [];
var map;
var image =
  "https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png";

function initMap() {
  map = new google.maps.Map(document.getElementById("maps"), {
    zoom: 12,
    center: { lat: -33.865143, lng: 151.2099 },
    streetViewControl: false,
    rotateControl: false,
    fullscreenControl: false,
    styles: [
      { elementType: "geometry", stylers: [{ color: "#242f3e" }] },
      { elementType: "labels.text.stroke", stylers: [{ color: "#242f3e" }] },
      { elementType: "labels.text.fill", stylers: [{ color: "#746855" }] },
      {
        featureType: "administrative.locality",
        elementType: "labels.text.fill",
        stylers: [{ color: "#d59563" }],
      },
      {
        featureType: "poi",
        elementType: "labels.text.fill",
        stylers: [{ color: "#d59563" }],
      },
      {
        featureType: "poi.park",
        elementType: "geometry",
        stylers: [{ color: "#263c3f" }],
      },
      {
        featureType: "poi.park",
        elementType: "labels.text.fill",
        stylers: [{ color: "#6b9a76" }],
      },
      {
        featureType: "road",
        elementType: "geometry",
        stylers: [{ color: "#38414e" }],
      },
      {
        featureType: "road",
        elementType: "geometry.stroke",
        stylers: [{ color: "#212a37" }],
      },
      {
        featureType: "road",
        elementType: "labels.text.fill",
        stylers: [{ color: "#9ca5b3" }],
      },
      {
        featureType: "road.highway",
        elementType: "geometry",
        stylers: [{ color: "#746855" }],
      },
      {
        featureType: "road.highway",
        elementType: "geometry.stroke",
        stylers: [{ color: "#1f2835" }],
      },
      {
        featureType: "road.highway",
        elementType: "labels.text.fill",
        stylers: [{ color: "#f3d19c" }],
      },
      {
        featureType: "transit",
        elementType: "geometry",
        stylers: [{ color: "#2f3948" }],
      },
      {
        featureType: "transit.station",
        elementType: "labels.text.fill",
        stylers: [{ color: "#d59563" }],
      },
      {
        featureType: "water",
        elementType: "geometry",
        stylers: [{ color: "#17263c" }],
      },
      {
        featureType: "water",
        elementType: "labels.text.fill",
        stylers: [{ color: "#515c6d" }],
      },
      {
        featureType: "water",
        elementType: "labels.text.stroke",
        stylers: [{ color: "#17263c" }],
      },
    ],
  });
}
function drop() {
  clearMarkers();
  for (var i = 0; i < locations.length; i++) {
    addMarkerWithTimeout(locations[i], i * 200, i, names[i]);
  }
}
drop();

function createMarker(point, map, index, name) {
  var markerOpts = {
    position: point,
    map: map,
    animation: google.maps.Animation.DROP,
    label: name.charAt(0),
    title: name,
  };

  var marker = new google.maps.Marker(markerOpts);

  google.maps.event.addListener(marker, "click", function () {
    //window.alert(marker.getTitle());
    messageIn(marker.getTitle());
  });
  google.maps.event.addListener(marker, "mouseover", function () {
    //messageIn(marker.getTitle());
  });
}

function addMarkerWithTimeout(position, timeout, index, name) {
  clearMarkers();
  window.setTimeout(function () {
    markers.push(createMarker(position, map, index, name));
  }, timeout);
  //window.alert(index);
}

function clearMarkers() {
  for (var i = 0; i < markers.length; i++) {
    markers[i].setMap(null);
  }
  markers = [];
}

function messageIn(message) {
  var messageDiv = document.createElement("div"); // create <div>
  messageDiv.style.clear = "both";
  messageDiv.className = "inbox-message in";
  // create text for message div
  var messageP = document.createElement("p"); //create <p> tag

  // append text to message div
  messageDiv.appendChild(messageP); // add <p> to <div>
  messageP.appendChild(document.createTextNode(message)); // insert text into <p>
  //append message div to chat history
  document.getElementById("history").appendChild(messageDiv);
}
</script>
