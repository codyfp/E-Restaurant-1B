<!-- User Story 
3
As a customer, I want to view and add food 
items to my order so that I can plan my feast.

--use v-card for menu items
--use firebase images to store item images
--hardcode menu items and bind to image
--have an add button 
--have a quantity button 
--have a special notes option (optional)
 -->

<template>
  <div class="menu">
    <v-row>
        <v-col>
            <h1>Menu</h1>
            <v-btn @click="meal = 'lunch'">Lunch</v-btn>
            <v-btn @click="meal = 'dinner'">Dinner</v-btn>
            <v-card v-for='m in menu[meal]' :key='m.id'>
                <v-row>
                    <v-col>
                        <v-img height=100 width=100 src='../assets/baguette.jpg'></v-img>
                    </v-col>
                    <v-col>
                        <v-row>
                            <h2 >.{{m.food}}</h2>
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
                            <v-btn rounded @click="overlay = !overlay, index = m.id">Add to Order</v-btn>
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
        >[[
        <AddToOrder v-on:updateBasket='updateBasket' :itemName='menu[meal][index].food' :itemPrice='menu[meal][index].price'/>
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
            <p>{{b.quantity}}</p>
        </div>
        <p>Total Price: ${{Math.round(totalPrice)}}</p>
    </div>
    <v-btn @click='addToBooking'>Add to Booking</v-btn>
  </div>
</template>

<script>
import db from "@/firebase/init";

import AddToOrder from '@/components/AddToOrder.vue'
export default {
    name: 'Menu',
    components:{
        AddToOrder
    },
    data(){
        return{
            meal: 'dinner',
            absolute: true,
            index: 0,
            overlay: false,
            menu: 
                {
                lunch: [
                    {food: "Burger", description: "Toasted to Perfection", price: 4.35, id: 0},
                    {food: "Bread", description: "Toasted to Perfection also", price: 6.95, id: 1},
                    {food: "Pizza", description: "Fresh from the garden", price: 38.95, id: 2},
                ],
                dinner: [
                    {food: "Baguette", description: "Toasted to Perfection", price: 4.35, id: 0},
                    {food: "Garlic Bread", description: "Toasted to Perfection also", price: 6.95, id: 1},
                    {food: "Snails", description: "Fresh from the garden", price: 38.95, id: 2},
                    {food: "Truffles Spaghettini", description: "I dont know what this is", price: 25.95, id: 3},
                    {food: "Vegan Food", description: "Yuck", price: 44.35, id: 4},  
                    ]
                },
            basket: [],
            totalPrice: 0.00
        }    
    },
    methods: {
        updateBasket(e){
            console.log(e)
            this.basket.push(e)
            this.overlay = false
            this.totalPrice += (e.itemPrice * e.quantity)
            
        },
        addToBooking(){
            let bookingref = db.collection("Orders Online")
            bookingref.add({
                    basket: this.basket
                
            })
        }
    }

    
}
</script>

<style>

.basket{
    display: flex
}

</style>