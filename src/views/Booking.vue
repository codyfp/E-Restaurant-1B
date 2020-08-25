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
              <v-card class="d-flex flex-wrap justify-space-around pb-9 pt-5" flat>
                <v-card-text>
                  <h1>Booking</h1>
                  <v-spacer class="pb-5"></v-spacer>
                  <h3>Booking at Le Bistrot d'Andre on {{date | moment("dddd Do MMMM YYYY")}}</h3>
                </v-card-text>
                <v-card>
                  <v-date-picker v-model="date"></v-date-picker>
                </v-card>
                <v-card flat>
                  <v-autocomplete
                    :items="seats"
                    label="Number of Seats"
                    placeholder="Select..."
                    required
                  ></v-autocomplete>
                  <v-autocomplete
                    :items="meals"
                    label="Time of Day"
                    placeholder="Select..."
                    required
                  ></v-autocomplete>
                </v-card>
              </v-card>
            </v-col>
          </v-row>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
export default {
  name: "Home",

  data() {
    return {
      date: new Date().toISOString().substr(0, 10),
      seats: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"],
      meals: ["Breakfast", "Lunch", "Dinner"],
    };
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
</style>
