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
    <v-app-bar color="deep-purple accent-4" dense dark>
      <v-app-bar-nav-icon @click.stop="nav = !nav"></v-app-bar-nav-icon>

      <v-toolbar-title>Le Bistrot d'Andre</v-toolbar-title>

      <v-spacer></v-spacer>

      <v-spacer></v-spacer>

      <v-spacer></v-spacer>
      <!-- // Sign Up / Login -->
      <v-btn icon>
        <v-icon>mdi-heart</v-icon>
      </v-btn>

      <v-btn icon>
        <v-icon>mdi-dots-vertical</v-icon>
      </v-btn>
    </v-app-bar>

    <!-- <v-navigation-drawer v-model="nav">
        <v-list></v-list>
    </v-navigation-drawer>-->

    <v-container fluid>
      <v-layout>
        <!-- <v-col>
          <v-row>
            <v-col>
              <v-img height="100" width="100" src="../assets/baguette.jpg"></v-img>
            </v-col>
            <v-col></v-col>
          </v-row>
        </v-col>-->
        <div id="maps"></div>
        <div class="blur">
          <h1>HellWorld</h1>
        </div>
        <!-- <div align="center">
          <h1 style="text-align: center;">Le Bistrot d'Andre</h1>
        </div>-->

        <div class="bg-text">
          <h1>BOOKINGS NOW AVAILABLE</h1>
          <h2>69 Commonwealth St, Surry Hills NSW 2010</h2>
          <h3>02 9281 3322</h3>
          <h3>eat@lebistrot.com.au</h3>
        </div>
        <div>
          <v-row class="bg-text-style">
            <div class="text-center">
              <v-btn color="indigo" class="ma-2" tile dark href="/booking">Book Now</v-btn>
            </div>
            <v-spacer></v-spacer>
            <div class="text-center">
              <!-- <v-btn rounded color="primary" dark href="/menu">Menu</v-btn> -->
              <v-btn class="ma-2" tile color="indigo" dark href="/menu">Menu</v-btn>
            </div>
          </v-row>
        </div>
        <!-- <v-img
          src="https://e7.pngegg.com/pngimages/686/914/png-clipart-sad-frog-illustration-pepe-the-frog-sadness-alt-right-meme-sad-leaf-animals.png"
        ></v-img>-->
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
