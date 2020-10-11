<template>
  <div class="bg">
    <v-container>
      <v-layout row>
        <v-flex>
          <v-col>
            <v-card class="d-flex flex-wrap justify-center pb-10 pa-5" flat>
              <v-card-text>
                <h1>Order Successful!</h1>
                <v-spacer class="pb-5"></v-spacer>
              </v-card-text>
              <v-icon color="green" size="100"> mdi-check-circle </v-icon>
              <v-card-text>
                <h2 class="pb-10">
                  Your order has been confirmed. Please check your email for
                  your invoice.
                </h2>
                <h3>Reference No: {{ id }}</h3>
                <h3>Booking for: {{ name }}</h3>
                {{ this.email }}
                <h3>Number of Seats: {{ seat }}</h3>
                <h3>Booking Time: {{ time }}</h3>
                <h3>Booking Date: {{ date }}</h3>
                <h3>Location: 69 Commonwealth St, Surry Hills NSW 2010</h3>
              </v-card-text>
              <v-card-actions>
                <v-btn to="/dashboard">Return to Dashboard</v-btn>
              </v-card-actions>
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
  name: "OrderSuccess",

  data() {
    return {
      id: 0,
      email: "",
      name: "",
      seat: "",
      date: "",
      time: "",
    };
  },

  mounted() {
    let Script = document.createElement("script");
    Script.setAttribute("src", "https://smtpjs.com/v3/smtp.js");
    document.head.appendChild(Script);
  },

  created() {
    this.id = this.$route.params.id;
    this.name = this.$route.params.name;

    db.collection("bookings")
      .doc(JSON.stringify(this.id))
      .get()
      .then((result) => {
        if (!result.exists) {
          console.log("No such document!");
        } else {
          this.seat = result.data().seat;
          this.date = this.$moment(
            result.data().datetime.seconds * 1000
          ).format("dddd, Do MMM YYYY");
          this.time = this.$moment(
            result.data().datetime.seconds * 1000
          ).format("h:mm a");
          this.emailSuccess();
        }
      });
  },

  watch: {},

  methods: {
    emailSuccess() {
      window.Email.send({
        SecureToken: "d9e936a8-27cb-443b-827c-72937ef20e82",
        To: "customerefooddemo@gmail.com",
        From: "LeBistrotdAndre@gmail.com",
        FromName: "Le Bistrot d'Andre",
        Subject: "Order Confirmation " + this.id,
        Body:
          "Dear " +
          this.name +
          ",<br /><br />We have confirmed your order " +
          this.id +
          ".<br /><br />Thank you for placing an order with Le Bistrot d'Andre.<br /><br />Your order details are as follows:<br /><br />Number of Seats: " +
          this.seat +
          "<br />Booking Time: " +
          this.time +
          "<br />Booking Date: " +
          this.date +
          "<br />Location: 69 Commonwealth St, Surry Hills NSW 2010<br /><br />Thanks,<br />Le Bistrot d'Andre Customer Support Team",
      });
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
