<template>
  <div class="bg">
    <v-app-bar color="deep-purple accent-4" dense dark>
      <v-app-bar-nav-icon></v-app-bar-nav-icon>

      <v-toolbar-title>Page title</v-toolbar-title>

      <v-spacer></v-spacer>

      <v-btn icon>
        <v-icon>mdi-heart</v-icon>
      </v-btn>

      <v-btn icon>
        <v-icon>mdi-magnify</v-icon>
      </v-btn>

      <v-menu left bottom>
        <template v-slot:activator="{ on, attrs }">
          <v-btn icon v-bind="attrs" v-on="on">
            <v-icon>mdi-dots-vertical</v-icon>
          </v-btn>
        </template>
      </v-menu>
    </v-app-bar>
    <v-container>
      <v-layout row>
        <v-flex>
          <v-row justify="center">
            <v-col>
              <v-form ref="form" v-model="valid">
                <v-card
                  class="d-flex flex-wrap justify-center justify-space-around pb-10 pa-5"
                  flat
                >
                  <v-card-text>
                    <h1>Booking</h1>
                    <v-spacer class="pb-5"></v-spacer>

                    <!-- Result -->
                    <h3>Booking at Le Bistrot d'Andre on {{date | moment("dddd Do MMMM YYYY")}}{{SEAT}}{{TIME}}</h3>
                  </v-card-text>

                  <!-- DatePicker -->
                  <v-card height="400">
                    <v-date-picker v-model="date" :min="today"></v-date-picker>
                  </v-card>

                  <v-card width="500" flat>
                    <!-- Inputs -->
                    <v-autocomplete
                      :items="seats"
                      :rules="[v => !!v || 'This field is required']"
                      v-model="seat"
                      label="Number of Seats"
                      hint="For bookings over 10 people, please call us."
                      persistent-hint
                      placeholder="Select..."
                      required
                    ></v-autocomplete>
                    <v-autocomplete
                      v-if="seat != ''"
                      v-model="meal"
                      :items="meals"
                      :rules="[v => !!v || 'This field is required']"
                      label="Time of Day"
                      placeholder="Select..."
                      persistent-hint
                      required
                    ></v-autocomplete>

                    <!-- Times -->
                    <v-card v-if="meal == 'Breakfast'" class="d-flex flex-wrap pt-5" flat>
                      <v-radio-group v-model="selected" row>
                        <v-radio
                          width="100"
                          v-for="i in BTimes"
                          :key="i"
                          :label="i"
                          :checked="true"
                          @click="selectTime(i)"
                          :disabled="disabledTime(i)"
                          v-bind:style="{ background: dColour(i)}"
                        ></v-radio>
                      </v-radio-group>
                    </v-card>
                    <v-card v-if="meal == 'Lunch'" class="d-flex flex-wrap pt-5" flat>
                      <v-radio-group v-model="selected" row>
                        <v-radio
                          width="100"
                          v-for="i in LTimes"
                          :key="i"
                          :label="i"
                          :checked="true"
                          @click="selectTime(i)"
                          :disabled="disabledTime(i)"
                          v-bind:style="{ background: dColour(i)}"
                        ></v-radio>
                      </v-radio-group>
                    </v-card>
                    <v-card v-if="meal == 'Dinner'" class="d-flex flex-wrap pt-5" flat>
                      <v-radio-group v-model="selected" row>
                        <v-radio
                          width="100"
                          v-for="i in DTimes"
                          :key="i"
                          :label="i"
                          :checked="true"
                          @click="selectTime(i)"
                          :disabled="disabledTime(i)"
                          v-bind:style="{ background: dColour(i)}"
                        ></v-radio>
                      </v-radio-group>
                    </v-card>
                    <v-card flat class="red--text">{{feedback}}</v-card>
                    <!-- Next Button -->
                    <v-card flat>
                      <v-btn color="primary" @click="btnNext">Next</v-btn>
                    </v-card>
                  </v-card>
                </v-card>
              </v-form>
            </v-col>
          </v-row>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
import db from "@/firebase/init";
// import firebase from "firebase";
export default {
  name: "Home",

  data() {
    return {
      today: new Date().toISOString().substr(0, 10),
      date: new Date().toISOString().substr(0, 10),
      valid: false,
      booking: {
        seat: "",
        datetime: "",
      },
      bookings: [],
      seats: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"],
      seat: "",
      meals: ["Breakfast", "Lunch", "Dinner"],
      BTimes: [
        "7:30 am",
        "7:45 am",
        "8:00 am",
        "8:15 am",
        "8:30 am",
        "8:45 am",
        "9:00 am",
        "9:15 am",
        "9:30 am",
        "9:45 am",
        "10:00 am",
        "10:15 am",
      ],
      LTimes: [
        "11:45 am",
        "12:00 pm",
        "12:15 pm",
        "12:30 pm",
        "12:45 pm",
        "1:00 pm",
        "1:15 pm",
        "1:35 pm",
        "1:45 pm",
      ],
      DTimes: [
        "5:30 pm",
        "5:45 pm",
        "6:00 pm",
        "6:15 pm",
        "6:30 pm",
        "6:45 pm",
        "7:00 pm",
        "7:15 pm",
        "7:30 pm",
        "7:45 pm",
        "8:00 pm",
        "8:15 pm",
        "8:30 pm",
        "8:45 pm",
        "9:00 pm",
        "9:15 pm",
        "9:30 pm",
        "9:45 pm",
      ],
      meal: "",
      message: "",
      SEAT: "",
      TIME: "",
      time: "",
      selected: false,
      feedback: "",
    };
  },

  created() {
    this.getDisabled(this.today);
  },

  watch: {
    seat(val) {
      if (val == "1") {
        this.SEAT = " for " + val + " person";
      } else {
        this.SEAT = " for " + val + " people";
      }
      this.selected = false;
    },
    meal() {
      this.TIME = "";
      this.selected = false;
    },
    disabledTime() {
      if (this.dTime) {
        this.dColour = "rgba(0, 0, 0, 0.1)";
      }
    },
    date(date) {
      this.bookings = [];
      this.selected = false;
      this.getDisabled(date);
    },
  },

  methods: {
    selectTime(time) {
      // this.TIME = " at " + this.$moment(time * 1000).format("h:mm a");
      this.TIME = " at " + time;
      this.time = time;
    },
    btnNext() {
      // this.booking.UsrID = "TEST@TESTIES.COM";
      // this.booking.seat = this.seat;
      // this.booking.datetime = new Date(this.date + " " + this.time);
      // db.collection("bookings").add(this.booking);
      this.$refs.form.validate();
      if (this.valid && this.time != "") {
        this.$router.push({ name: "Menu" });
      } else if (this.valid && this.time == "") {
        this.feedback = "Please select a time above.";
      } else this.feedback = "Please complete all required fields.";
    },
    getDisabled(date) {
      let refBookings = db.collection("bookings");
      refBookings.onSnapshot((snapshot) => {
        snapshot.docChanges().forEach((change) => {
          let doc = change.doc;
          if (
            this.$moment(doc.data().datetime.seconds * 1000).format(
              "YYYY-MM-DD"
            ) == date
          ) {
            this.bookings.push({
              datetime: doc.data().datetime,
              seat: doc.data().seat,
            });
          }
        });
      });
    },
    disabledTime(t) {
      //Test for disabled
      for (var i = 0; i < this.bookings.length; i++) {
        if (
          t ==
            this.$moment(this.bookings[i].datetime.seconds * 1000).format(
              "h:mm a"
            ) &&
          this.seat == this.bookings[i].seat
        )
          return true;
      }
      return;
    },
    dColour(t) {
      //Test for disabled
      for (var i = 0; i < this.bookings.length; i++) {
        if (
          t ==
            this.$moment(this.bookings[i].datetime.seconds * 1000).format(
              "h:mm a"
            ) &&
          this.seat == this.bookings[i].seat
        )
          return "rgba(0, 0, 0, 0.1)";
      }
      return;
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
.v-radio {
  border: 1px solid #ddd;
  padding: 0.5rem 1.25rem;
  color: #444;
  width: 150px;
}

.v-radio:hover {
  border: 1px solid rgba(0, 128, 0, 0.8);
  background-color: rgba(0, 128, 0, 0.1);
}

.v-radio:active {
  background-color: rgba(0, 128, 0, 0.3);
}

.v-radio /deep/ label {
  color: black;
}
</style>
