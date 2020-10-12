<template>
  <div class="bg">
    <Menu
      v-if="addOrder == true"
      :kbookingdetails="'jim'"
      :bookingdetails="{
        userid: booking.UsrID,
        seat: booking.seat,
        meal: booking.meal,
        date: booking.datetime,
        name: this.name,
        email: this.user,
      }"
    />
    <v-container v-if="addOrder == false">
      <v-layout row>
        <v-flex>
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
                  <h3>
                    Booking at Le Bistrot d'Andre on
                    {{ date | moment("dddd Do MMMM YYYY") }}{{ SEAT }}{{ TIME }}
                  </h3>
                </v-card-text>

                <!-- DatePicker -->
                <v-card height="400">
                  <v-date-picker v-model="date" :min="tomorrow"></v-date-picker>
                </v-card>

                <v-card width="500" flat>
                  <!-- Inputs -->
                  <v-autocomplete
                    :items="seats"
                    :rules="[(v) => !!v || 'This field is required']"
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
                    :rules="[(v) => !!v || 'This field is required']"
                    label="Time of Day"
                    placeholder="Select..."
                    persistent-hint
                    required
                  ></v-autocomplete>

                  <!-- Times -->
                  <v-card
                    v-if="meal == 'Breakfast'"
                    class="d-flex flex-wrap pt-5"
                    flat
                  >
                    <v-radio-group v-model="selected" row>
                      <v-radio
                        width="100"
                        v-for="i in BTimes"
                        :key="i"
                        :label="i"
                        :checked="true"
                        @click="selectTime(i)"
                        :disabled="disabledTime(i)"
                        v-bind:style="{ background: dColour(i) }"
                      ></v-radio>
                    </v-radio-group>
                  </v-card>
                  <v-card
                    v-if="meal == 'Lunch'"
                    class="d-flex flex-wrap pt-5"
                    flat
                  >
                    <v-radio-group v-model="selected" row>
                      <v-radio
                        width="100"
                        v-for="i in LTimes"
                        :key="i"
                        :label="i"
                        :checked="true"
                        @click="selectTime(i)"
                        :disabled="disabledTime(i)"
                        v-bind:style="{ background: dColour(i) }"
                      ></v-radio>
                    </v-radio-group>
                  </v-card>
                  <v-card
                    v-if="meal == 'Dinner'"
                    class="d-flex flex-wrap pt-5"
                    flat
                  >
                    <v-radio-group v-model="selected" row>
                      <v-radio
                        width="100"
                        v-for="i in DTimes"
                        :key="i"
                        :label="i"
                        :checked="true"
                        @click="selectTime(i)"
                        :disabled="disabledTime(i)"
                        v-bind:style="{ background: dColour(i) }"
                      ></v-radio>
                    </v-radio-group>
                  </v-card>
                  <v-card flat class="red--text">{{ feedback }}</v-card>
                  <!-- Next Button -->
                  <v-card flat>
                    <v-btn color="primary" @click="btnNext">Next</v-btn>
                  </v-card>
                </v-card>
              </v-card>
              <v-dialog v-model="dialog" width="400" persistent>
                <v-card>
                  <v-btn
                    @click="addToOrder"
                    width="250"
                    height="50"
                    class="ma-5"
                  >
                    Order Menu
                  </v-btn>

                  <v-spacer></v-spacer>
                  <v-btn
                    @click="btnSkip"
                    width="250"
                    height="50"
                    class="ma-2 mb-4"
                  >
                    Skip Menu
                  </v-btn>
                  <v-spacer></v-spacer>
                  <v-btn color="error" @click="dialog = false" class="my-5"
                    >Back</v-btn
                  >
                </v-card>
              </v-dialog>
              <v-dialog v-model="dialog2" width="410">
                <v-card>
                  <v-card-title primary-title class="justify-center">
                    <span class="headline">Booking Error</span>
                  </v-card-title>
                  <v-card-text>
                    Only one booking can be made for each of the restaurant
                    service times (e.g. breakfast, lunch, dinner) per day.
                    Please refer to Booking Reference No. {{ queryResult }}.
                  </v-card-text>
                  <v-btn color="error" @click="dialog2 = false" class="my-1"
                    >Back</v-btn
                  >
                </v-card>
              </v-dialog>
            </v-form>
          </v-col>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
import Menu from "@/views/MenuBook.vue";
import db from "@/firebase/init";
import firebase from "firebase";
export default {
  name: "Booking",
  components: {
    Menu,
  },
  data() {
    return {
      addOrder: false,
      user: "",
      id: 0,
      name: "",
      today: new Date().toISOString().substr(0, 10),
      tomorrow: "",
      date: new Date().toISOString().substr(0, 10),
      next: "",
      valid: false,
      dialog: false,
      dialog2: false,
      booking: {},
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
      profileData: "",
      queryResult: [],
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
    this.date = this.$moment(this.date).add(1, "days").format("YYYY-MM-DD");
    this.tomorrow = this.$moment(this.today)
      .add(1, "days")
      .format("YYYY-MM-DD");
    this.getDisabled(this.tomorrow);
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
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
      }
    });
  },

  watch: {
    seat(val) {
      if (val == "1") {
        this.SEAT = " for " + val + " person";
      } else {
        this.SEAT = " for " + val + " people";
      }
      this.TIME = "";
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
    test() {
      console.log(this.booking);
    },
    selectTime(time) {
      // this.TIME = " at " + this.$moment(time * 1000).format("h:mm a");
      this.TIME = " at " + time;
      this.time = time;
    },
    btnSkip() {
      this.booking.UsrID = this.user;
      this.booking.seat = this.seat;
      this.booking.meal = this.meal;
      this.booking.order = [];
      this.booking.totalprice = 0;
      this.booking.datetime = new Date(this.date + " " + this.time);
      this.id = Math.floor(Math.random() * 999999999);
      db.collection("bookings")
        .doc(JSON.stringify(this.id))
        .set(this.booking)
        .then(
          this.$router.push({
            name: "OrderSuccess",
            params: { id: this.id, name: this.name, email: this.user },
          })
        );
    },
    addToOrder() {
      this.dialog = false;
      (this.addOrder = true),
        // console.log("working")

        (this.booking.UsrID = this.user);
      this.booking.seat = this.seat;
      this.booking.meal = this.meal;
      this.booking.datetime = new Date(this.date + " " + this.time);
      // this.id = Math.floor(Math.random() * 999999999);
    },

    btnNext() {
      let qResult = [];
      this.$refs.form.validate();
      if (this.valid && this.TIME != "") {
        db.collection("bookings")
          .where("UsrID", "==", this.user)
          .where("datetime", ">=", new Date(this.date))
          .where(
            "datetime",
            "<",
            new Date(
              this.$moment(this.date).add(1, "days").format("YYYY-MM-DD")
            )
          )
          .where("meal", "==", this.meal)
          .get()
          .then(function (querySnapshot) {
            querySnapshot.forEach(function (doc) {
              qResult.push(doc.id);
            });
          })
          .catch(function (error) {
            console.log("Error getting documents: ", error);
          });
        var that = this;
        setTimeout(function () {
          that.queryResult = qResult[0];
          if (qResult.length > 0) {
            that.dialog2 = true;
          } else {
            that.dialog = true;
          }
        }, 500);
      } else if (this.valid && this.TIME == "") {
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
