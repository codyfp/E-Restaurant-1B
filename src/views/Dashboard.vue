<template>
  <div class="bg-image">
    <v-container>
      <v-layout row>
        <div id="maps"></div>
        <v-flex>
          <div>
            <h1 class="white pa-3">Welcome, {{ name }}!</h1>
          </div>
          <v-card
            class="justify-center"
            color="rgba(0,0,0,0.2)"
            min-width="1000"
            tile
          >
            <div class="main-text">
              <v-btn color="indigo" class="ma-2" tile dark to="/Booking"
                >Book Now</v-btn
              >
              <v-btn class="ma-2" tile color="indigo" dark to="/Menu"
                >Menu</v-btn
              >
            </div>
          </v-card>
          <v-col>
            <v-card min-height="550" flat>
              <v-card-text>
                <h1>Current Bookings</h1>
                <v-spacer class="pb-5"></v-spacer>
              </v-card-text>
              <v-row class="pl-13">
                <h4>Filter By:</h4>
              </v-row>
              <v-card class="d-flex pl-10 mb-6 align-center" flat>
                <v-card width="300" flat>
                  <v-menu
                    v-model="menu"
                    :close-on-content-click="false"
                    :nudge-right="40"
                    transition="scale-transition"
                    offset-y
                    min-width="290px"
                  >
                    <template v-slot:activator="{ on }">
                      <v-text-field
                        v-model="formattedDate"
                        label="Date"
                        append-icon="mdi-calendar"
                        readonly
                        v-on="on"
                      ></v-text-field>
                    </template>
                    <v-date-picker
                      v-model="date"
                      @input="menu = false"
                    ></v-date-picker>
                  </v-menu>
                </v-card>
                <v-card style="padding-left: 15px" flat>
                  <v-btn @click="clearFilter">Clear</v-btn>
                </v-card>
              </v-card>
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
import firebase from "firebase";
import db from "@/firebase/init";

export default {
  data() {
    return {
      name: "",
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
        db.collection("users")
          .doc(user.email)
          .get()
          .then((result) => {
            if (!result.exists) {
              console.log("No such document!");
            } else {
              this.name = result.data().fullName;
            }
          });
      } else {
        this.user = null;
      }
    });
    // db.collection("users")
    //   .doc("asdfhasdkfjads")
    //   .get()
    //   .then((result) => {
    //     if (!result.exists) {
    //       console.log("No such document!");
    //     } else {
    //       this.name = result.data().fullName;
    //     }
    //   });
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
    filteredBookings: function () {
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
      db.collection("bookings").doc(this.ID).delete();
      this.dialog = false;
    },
    formatDate(date) {
      if (!date) return null;
      return this.$moment(date).format("dddd, Do MMM YYYY");
    },
    clearFilter: function () {
      this.date = "";
    },
    placement: function (id) {
      let array = [];
      if (this.edit) {
        array = this.bookings;
      } else {
        array = this.filteredBookings;
      }
      let place = array
        .map(function (e) {
          return e.id;
        })
        .indexOf(id);
      return place;
    },
    orderDisable: function (time) {
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
    created() {
      firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          this.user = user;
        } else {
          this.user = null;
        }
      });
    },
  },
};
</script>

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
  padding: 1px;
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