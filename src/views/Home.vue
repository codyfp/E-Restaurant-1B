<style lang="stylus" scoped></style>

<template>
  <div class="home" style="background: url('./img/bg.jpg');">
    <div class="bg">
      <v-app-bar color="deep-purple accent-4" dense dark>
        <v-app-bar-nav-icon @click.stop="nav = !nav"></v-app-bar-nav-icon>

        <v-toolbar-title>Le Bistrot d'Andre</v-toolbar-title>

        <v-spacer></v-spacer>

        <v-btn icon>
          <a href="/booking">
            Booking
          </a>
        </v-btn>

        <v-spacer></v-spacer>

        <v-btn icon> <a href="/menu"></a>Menu </v-btn>

        <v-spacer></v-spacer>
        <!-- // Sign Up / Login -->
        <v-btn icon>
          <v-icon>mdi-heart</v-icon>
        </v-btn>

        <v-btn icon>
          <v-icon>mdi-dots-vertical</v-icon>
        </v-btn>
      </v-app-bar>

      <!-- <v-navigation-drawer v-model="nav">
        <v-list></v-list>
      </v-navigation-drawer>-->

      <v-container>
        <v-layout></v-layout>
      </v-container>
    </div>
    <!-- <h1>This is the Homepage</h1> -->
    <!-- <v-img src="https://e7.pngegg.com/pngimages/686/914/png-clipart-sad-frog-illustration-pepe-the-frog-sadness-alt-right-meme-sad-leaf-animals.png"></v-img> -->
  </div>
</template>

<script>
export default {
  name: "Home",
};
</script>
