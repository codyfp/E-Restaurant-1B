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
.bg {
  width: 100%;
  height: 100%;
  position: absolute;
  background: url("./img/bg.jpg");
  background-size: cover;
}
.schedule {
  font-family: Arial, Helvetica, sans-serif;
  border-collapse: collapse;
  width: 100%;
  text-align: center;
}

.schedule td,
.schedule th {
  border: 1px solid #ddd;
  padding: 8px;
}

.schedule tr:nth-child(even) {
  background-color: #f2f2f2;
}

.schedule tr:hover {
  background-color: #ddd;
}

.schedule th {
  padding-top: 12px;
  padding-bottom: 12px;
  text-align: left;
  background-color: #009688;
  color: white;
  text-align: center;
}

.schedule v-btn {
  cursor: pointer;
}
</style>

<template>
  <div class="bg-image">
    <v-container>
      <v-layout row>
        <div id="maps"></div>
        <v-flex>
          <div class="main-text">
            <!-- <h1>Welcome, {{ user.email }}!</h1> -->
            <!-- <v-btn color="white" text rounded class="my-2 right-btn">Logged in as: {{ user.name }}</v-btn> -->
          </div>

          <v-col style="margin-top: 100px;">
            <v-card class="main-text" min-height="720" flat>
              <v-card-text>
                <h1>Current Bookings</h1>
                <v-spacer class="pb-5"></v-spacer>
              </v-card-text>
              <v-card class="d-flex justify-center" flat>
                <table class="schedule">
                  <tr>
                    <th>Number</th>
                    <th>Date</th>
                    <th>Time</th>
                    <th>Seats</th>
                    <th>Location</th>
                    <th>Menu</th>
                    <th>Booking</th>
                  </tr>
                  <tr v-for="booking in filteredBookings" :key="booking.id">
                    <td>{{ placement(booking.id) + 1 }}</td>
                    <td>
                      {{ booking.datetime.seconds | moment("DD MMM YYYY") }}
                    </td>
                    <td>{{ booking.datetime.seconds | moment("h:mm a") }}</td>
                    <td>{{ booking.seat }}</td>
                    <td>Surry Hills</td>
                    <td>
                      <v-btn
                        color="primary"
                        :disabled="orderDisable(booking.datetime.seconds)"
                        >Edit Menu
                      </v-btn>
                    </td>
                    <td>
                      <v-btn
                        color="error"
                        @click="editBook(booking.id)"
                        :disabled="orderDisable(booking.datetime.seconds)"
                        >Edit Booking
                      </v-btn>
                    </td>
                  </tr>
                </table>
              </v-card>
              <v-dialog v-model="dialog" width="400">
                <v-card>
                  <router-link
                    :to="{
                      name: 'EditBooking',
                      params: { id: this.ID },
                    }"
                    tag="button"
                  >
                    <v-btn
                      @click="dialog = false"
                      width="250"
                      height="50"
                      class="ma-5"
                    >
                      Edit Booking
                    </v-btn>
                  </router-link>
                  <v-spacer></v-spacer>
                  <v-btn
                    @click="deleteOrder"
                    width="250"
                    height="50"
                    class="ma-2 mb-4"
                  >
                    Cancel Booking
                  </v-btn>
                  <v-spacer></v-spacer>
                  <v-btn color="error" @click="dialog = false" class="my-5"
                    >Close</v-btn
                  >
                </v-card>
              </v-dialog>
            </v-card>
          </v-col>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
// import db from "@/firebase/init";
import firebase from "firebase";
import db from "@/firebase/init";

// import EditBooking from "@/views/EditBooking";

export default {
  data() {
    return {
      user: "",
      date: "",
      menu: false,
      bookings: [],
      dialog: false,
      ID: 0,
    };
  },

  created() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.user = user.email;
      } else {
        this.user = null;
      }
    });
    let refBookings = db.collection("bookings").orderBy("datetime", "asc");
    refBookings.onSnapshot((snapshot) => {
      snapshot.docChanges().forEach((change) => {
        let doc = change.doc;
        if (change.type === "removed") {
          this.edit = true;
          this.bookings.splice(this.placement(doc.id), 1);
          this.edit = false;
        } else if (change.type === "modified") {
          this.edit = true;
          this.bookings.splice(this.placement(doc.id), 1, {
            id: doc.id,
            UsrID: doc.data().UsrID,
            datetime: doc.data().datetime,
            seat: doc.data().seat,
          });
          refBookings.orderBy("datetime", "asc");
          this.edit = false;
        } else {
          this.bookings.push({
            id: doc.id,
            UsrID: doc.data().UsrID,
            datetime: doc.data().datetime,
            seat: doc.data().seat,
          });
        }
      });
    });
  },

  computed: {
    filteredBookings: function() {
      if (this.user == "staffefooddemo@gmail.com" && this.date.length == 0) {
        return this.bookings;
      }
      return this.bookings.filter((booking) => {
        if (this.user == "staffefooddemo@gmail.com" && this.date.length > 0) {
          if (
            JSON.stringify(
              this.$moment(booking.datetime.seconds * 1000).format("YYYY-MM-DD")
            ) == JSON.stringify(this.date)
          ) {
            return true;
          } else {
            return false;
          }
        } else if (this.date.length == 0) return booking.UsrID.match(this.user);
        else {
          if (
            JSON.stringify(
              this.$moment(booking.datetime.seconds * 1000).format("YYYY-MM-DD")
            ) == JSON.stringify(this.date)
          ) {
            return booking.UsrID.match(this.user);
          } else {
            return false;
          }
        }
      });
    },
    formattedDate() {
      return this.formatDate(this.date);
    },
  },

  watch: {},

  methods: {
    editBook(id) {
      this.ID = id;
      this.dialog = true;
    },
    deleteOrder() {
      db.collection("bookings")
        .doc(this.ID)
        .delete();
      this.dialog = false;
    },
    formatDate(date) {
      if (!date) return null;
      return this.$moment(date).format("dddd, Do MMM YYYY");
    },
    clearFilter: function() {
      this.date = "";
    },
    placement: function(id) {
      let array = [];
      if (this.edit) {
        array = this.bookings;
      } else {
        array = this.filteredBookings;
      }
      let place = array
        .map(function(e) {
          return e.id;
        })
        .indexOf(id);
      return place;
    },
    orderDisable: function(time) {
      if (this.user == "staffefooddemo@gmail.com") {
        return false;
      }
      time = (time - 7200) * 1000;
      let now = Date.now();
      time = time - now;
      if (time <= 0) {
        return true;
      }
      return false;
    },
  },
};
</script>

<script
  async
  defer
  src="https://maps.googleapis.com/maps/api/js?key=AIzaSyALKwFMBtlWJ8nZgTeKTmkFwbH_J0B2pQM&libraries=places&callback=initMap"
></script>

<script>
export default {
  name: "Dashboard",
};

var locations = [{ lat: -33.865143, lng: 151.206 }];
var names = ["Aiden Boal"];
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

  google.maps.event.addListener(marker, "click", function() {
    //window.alert(marker.getTitle());
    messageIn(marker.getTitle());
  });
  google.maps.event.addListener(marker, "mouseover", function() {
    //messageIn(marker.getTitle());
  });
}

function addMarkerWithTimeout(position, timeout, index, name) {
  clearMarkers();
  window.setTimeout(function() {
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
