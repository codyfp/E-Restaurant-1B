<template>
  <div class="bg-image">
    <v-container fill-height fluid>
      <v-row align="center" justify="center">
        <v-card color="rgba(0,0,0,0)">
          <div>
            <h1 class="white pa-3">Staff Dashboard</h1>
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
              <v-btn class="ma-2" tile color="indigo" dark to="/StaffMenu"
                >Menu</v-btn
              >
              <v-btn class="ma-2" tile color="indigo" dark to="/EditOrder"
                >Edit Order</v-btn
              >
            </div>
          </v-card>
        </v-card>
      </v-row>

       <v-row align="center" justify="center">
        <v-card color="rgba(255,255,255,255)">
        <h2>Staff Details</h2>
          <table style="width:100%">
            <tr>
              <th>Firstname</th>
              <th>Lastname</th> 
              <th>Position</th>
              <th>Mobile Number</th>
              <th>Email</th>
            </tr>
            <tr>
              <td>Jill</td>
              <td>Smith</td>
              <td>Head Chef</td>
              <td>0426 456 843</td>
              <td>Jill@gmail.com</td>
            </tr>
            <tr>
              <td>Eve</td>
              <td>Jackson</td>
              <td>Waiter</td>
              <td>0458 543 231</td>
              <td>Eve.Jackson@yahoo.com.au</td>
            </tr>
            <tr>
              <td>John</td>
              <td>Doe</td>
              <td>Manager</td>
              <td>0498 354 654</td>
              <td>John_Manger@gmail.com</td>
            </tr>
            <tr>
              <td>Emmanuel</td>
              <td>Macaron</td>
              <td>French Ingredients Importer</td>
              <td>0466 545 468</td>
              <td>President@France.gov.fr</td>
            </tr>
          </table>
          </v-card>
          </v-row>
    </v-container>
  </div>
</template>

<script>
export default {
  data() {
    return {

    };
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
</style>