<template>
  <div class="menu">
    <v-row>
        <v-col>
            <h1>Menu</h1>
            <v-btn @click='saveChanges'>Save Menu Changes</v-btn>
            <!-- <v-btn @click="uploadmenu">Upload Menu</v-btn> -->
            <v-btn @click="meal = 'breakfast'">Breakfast</v-btn>
            <v-btn @click="meal = 'lunch'">Lunch</v-btn>
            <v-btn @click="meal = 'dinner'">Dinner</v-btn>
            <v-card v-for='m in menu[meal]' :key='m.id'>
                <v-row>
                    <v-col>
                        <v-img height=100 width=100 src='../assets/baguette.jpg'></v-img>
                    </v-col>
                    <v-col>
                        <v-row>
                            <h2 >{{m.food}}</h2>
                        </v-row>
                        <v-row>
                            <p>{{m.description}}</p>
                        </v-row>
                    </v-col>
                    <v-col>
                        <v-row>
                            <p>{{m.price}}</p>
                        </v-row>
                        <v-row>
                            <v-btn rounded @click="overlay = !overlay, index = m.id">Edit Item</v-btn>
                        </v-row>
                    </v-col>
                </v-row>
            </v-card>
      </v-col>
    </v-row>
    <v-row align="center" justify="center">
      <v-row justify="center">
        <v-overlay
          :absolute="absolute"
          :value="overlay"
        >
        <EditItem 
        v-on:updateItem='updateItem' 
        :itemName='menu[meal][index].food' 
        :itemPrice='menu[meal][index].price'
        :itemId='menu[meal][index].id'
        :meal='meal'/>
          <v-btn
            color="success"
            @click="overlay = false"
          >Cancel
          </v-btn>
        </v-overlay>
      </v-row>
  </v-row>
    <div>
        <div class='basket' v-for='b in basket' :key='b'>
            <p>{{b.itemName}}: </p>
            <p>{{b.quantity}} </p>
        </div>
        <p>Total Price: ${{Math.round(totalPrice)}}</p>
    </div>
    <v-btn @click='addToBooking'>Add to Booking</v-btn>
  </div>
</template>

<script>
import db from "@/firebase/init";

import EditItem from '@/components/EditItem.vue'
export default {
    name: 'Menu',
    components:{
        EditItem
    },
    data(){
        return{
            meal: 'dinner',
            absolute: true,
            index: 0,
            overlay: false,
            menu: {},
            basket: [],
            totalPrice: 0.00
        }    
    },
    created(){
        let menuRef = db.collection("Menu").doc("menu")
        menuRef.get().then(doc => {
            let menuHolder = doc.data()
            this.menu = menuHolder
            console.log(this.test)
        })
    },
    methods: {
        addToBooking(){
            let bookingref = db.collection("Orders Online")
            bookingref.add({
                    basket: this.basket 
                })
        },
        uploadmenu(){
            db.collection("Menu").doc("menu").set(this.menu)
        },
        updateItem(e){
            let item = e.name
            let price = e.price
            this.menu[e.meal][e.id].food = item
            this.menu[e.meal][e.id].price = price
        },
        saveChanges(){
            db.collection("Menu").doc("menu").set(this.menu)
            console.log("mad")
        }
    }
}
</script>

<style>

.basket{
    display: flex
}

</style>