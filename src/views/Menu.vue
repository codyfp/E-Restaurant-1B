<template>
  <div class="menu">
    <v-row>
      <v-col>
        <h1 id="menu">Menu</h1>
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
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>
    <v-row align="center" justify="center"> </v-row>
    <div>
      <div class="basket" v-for="b in basket" :key="b">
        <p>{{ b.itemName }}:</p>
        <p>{{ b.quantity }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import db from "@/firebase/init";

export default {
  name: "Menu",
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
        booking: this.bookingdetails,
        order: this.basket,
        totalprice: this.totalPrice,
      };
      console.log(order);
      db.collection("bookings")
        .add(order)
        .then(
          this.$router.push({
            name: "OrderSuccess",
            params: { id: this.id, name: this.name },
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