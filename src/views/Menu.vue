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
            <h1>Entrees</h1>
            <v-card v-for='entree in entrees' :key='entree'>
                <v-row>
                    <v-col>
                        <v-img height=100 width=100 src='../assets/baguette.jpg'></v-img>
                    </v-col>
                    <v-col>
                        <v-row>
                            <h2 >{{entree.food}}</h2>
                        </v-row>
                        <v-row>
                            <p>{{entree.description}}</p>
                        </v-row>
                    </v-col>
                    <v-col>
                        <v-row>
                            <p>{{entree.price}}</p>
                        </v-row>
                        <v-row>
                            <v-btn rounded @click="overlay = !overlay">Add to Order</v-btn>
                        </v-row>
                    </v-col>
                </v-row>
            </v-card>
        </v-col>
        <v-col>
            <h1>Mains</h1>
            <v-card v-for='main in mains' :key='main'>
                <v-row>
                    <v-col>
                        <v-img height=100 width=100 src='../assets/baguette.jpg'></v-img>
                    </v-col>
                    <v-col>
                        <v-row>
                            <h2 >{{main.food}}</h2>
                        </v-row>
                        <v-row>
                            <p>{{main.description}}</p>
                        </v-row>
                    </v-col>
                    <v-col>
                        <v-row>
                            <p>{{main.price}}</p>
                        </v-row>
                        <v-row>
                            <v-btn rounded @click="overlay = !overlay">Add to Order</v-btn>
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
        <AddToOrder />
          <v-btn
            color="success"
            @click="overlay = false"
          >Cancel
          </v-btn>
        </v-overlay>
      </v-row>
  </v-row>
  </div>
</template>

<script>
import AddToOrder from '@/components/AddToOrder.vue'
export default {
    name: 'Menu',
    components:{
        AddToOrder
    },
    data(){
        return{
            absolute: true,
            overlay: false,
            entrees: [
                {food: "Baguette", description: "Toasted to Perfection", price: 4.35, },
                {food: "Garlic Bread", description: "Toasted to Perfection also", price: 6.95, }
            ],
            mains: [
                {food: "Snails", description: "Fresh from the garden", price: 38.95, },
                {food: "Truffles Spaghettini", description: "I dont know what this is", price: 25.95, },
                {food: "Vegan Food", description: "Yuck", price: 44.35, },
            ]
        }    
    }

    
}
</script>

<style>

</style>