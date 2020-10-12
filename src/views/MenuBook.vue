<template>
  <div class="pa-6">
    <v-container class="white" rounded>
      <v-row>
        <v-col>
          <h1>Menu</h1>
          <v-btn @click="meal = 'breakfast'">Breakfast</v-btn>
          <v-btn @click="meal = 'lunch'">Lunch</v-btn>
          <v-btn @click="meal = 'dinner'">Dinner</v-btn>
          <v-card v-for="m in menu[meal]" :key="m.id">
            <v-row>
              <v-col>
                <v-img
                  height="100"
                  width="100"
                  src="../assets/baguette.jpg"
                ></v-img>
              </v-col>
              <v-col>
                <v-row>
                  <h2>{{ m.food }}</h2>
                </v-row>
                <v-row>
                  <p>{{ m.description }}</p>
                </v-row>
              </v-col>
              <v-col>
                <v-row>
                  <p>{{ m.price }}</p>
                </v-row>
                <v-row>
                  <v-btn rounded @click="(overlay = !overlay), (index = m.id)"
                    >Add to order</v-btn
                  >
                </v-row>
              </v-col>
            </v-row>
          </v-card>
        </v-col>
      </v-row>
      <v-row align="center" justify="center">
        <v-row justify="center">
          <v-overlay :absolute="absolute" :value="overlay">
            <AddToOrder
              v-on:updateBasket="updateBasket"
              :itemName="menu[meal][index].food"
              :itemPrice="menu[meal][index].price"
            />
            <v-btn color="success" @click="overlay = false">Cancel </v-btn>
          </v-overlay>
        </v-row>
      </v-row>
      <div>
        <div class="basket" v-for="b in basket" :key="b">
          <p>{{ b.itemName }}:</p>
          <p>{{ b.quantity }}</p>
        </div>
        <p>Total Price: ${{ parseFloat(totalPrice).toFixed(2) }}</p>
      </div>
      <v-btn @click="addToBooking">Add to Booking</v-btn>
      <v-btn to="/Booking">Back</v-btn>
    </v-container>
  </div>
</template>

<script>
import db from "@/firebase/init";
import AddToOrder from "@/components/AddToOrder.vue";

export default {
  name: "Menu",
  components: {
    AddToOrder,
  },
  props: ["bookingdetails"],
  data() {
    return {
      meal: "dinner",
      absolute: true,
      index: 0,
      overlay: false,
      menu: {},
      basket: [],
      totalPrice: 0.0,
      id: 0,
    };
  },
  created() {
    let menuRef = db.collection("Menu").doc("menu");
    menuRef.get().then((doc) => {
      let menuHolder = doc.data();
      this.menu = menuHolder;
      console.log(this.test);
    });
  },
  methods: {
    updateBasket(e) {
      console.log(e);
      this.basket.push(e);
      this.overlay = false;
      this.totalPrice += e.itemPrice * e.quantity;
    },
    addToBooking() {
      let order = {
        UsrID: this.bookingdetails.userid,
        datetime: this.bookingdetails.date,
        seat: this.bookingdetails.seat,
        meal: this.bookingdetails.meal,
        order: this.basket,
        totalprice: (this.totalPrice = parseFloat(this.totalPrice).toFixed(2)),
      };
      this.id = Math.floor(Math.random() * 999999999);
      //   console.log(order);
      db.collection("bookings")
        .doc(JSON.stringify(this.id))
        .set(order)
        .then(
          this.$router.push({
            name: "OrderSuccess",
            params: {
              id: this.id,
              name: this.bookingdetails.name,
              email: this.bookingdetails.email,
            },
          })
        );
    },
  },
};
</script>

<style>
.basket {
  display: flex;
}
</style>