<template>
  <div class="bg">
    <v-container>
      <v-layout row>
        <v-flex>
          <v-col>
            <v-card class="pa-5" min-height="850" flat>
              <v-card-text>
                <h1>Edit Order</h1>
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
                    <v-date-picker v-model="date" @input="menu = false"></v-date-picker>
                  </v-menu>
                </v-card>
                <v-card style="padding-left:15px;" flat>
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
                    <th>Edit Order</th>
                    <th>Edit Booking</th>
                  </tr>
                  <tr v-for="booking in filteredBookings" :key="booking.id">
                    <td>{{placement(booking.id) + 1}}</td>
                    <td>{{booking.datetime.seconds | moment("DD MMM YYYY")}}</td>
                    <td>{{booking.datetime.seconds | moment("h:mm a")}}</td>
                    <td>{{booking.seat}}</td>
                    <td>Surry Hills</td>
                    <td>
                      <v-btn color="primary">Edit Order</v-btn>
                    </td>
                    <td>
                      <v-btn color="error">Edit Booking</v-btn>
                    </td>
                  </tr>
                </table>
              </v-card>
            </v-card>
          </v-col>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
import db from "@/firebase/init";
// import firebase from "firebase";

export default {
  name: "EditOrder",

  data() {
    return {
      user: "TEST@TESTIES.COM",
      date: "",
      menu: false,
      dateFormatted: this.formatDate(new Date().toISOString().substr(0, 10)),
      bookings: [],
    };
  },

  created() {
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
      return this.bookings.filter((booking) => {
        return booking.UsrID.match(this.user);
      });
    },
    formattedDate() {
      return this.formatDate(this.date);
    },
  },

  watch: {},

  methods: {
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
        array = this.timeslots;
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
  },
};
</script>

<style scoped>
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
