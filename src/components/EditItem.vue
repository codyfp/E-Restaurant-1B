<template>
  <div class="add-to-order">
      <v-card>
          <v-col>
              <v-row>
                  <h3 class='mx-auto'>{{itemName}}: {{itemPrice}}</h3>
              </v-row>
          <v-row>
              <v-col>
                  <h3>Item Name: </h3>
              </v-col>
              <v-col>
                  <v-text-field v-model="itemName"></v-text-field>
             </v-col>
              <v-col>
                  <h3>New Price: </h3>
              </v-col>
              <v-col>
                  <v-text-field v-model="itemPrice"></v-text-field>
             </v-col>
          </v-row>
          <v-row>
              <v-btn @click='saveChange'>Save Changes</v-btn>
          </v-row>
        </v-col>
      </v-card>
  </div>
</template>

<script>
export default {
    name: "AddToOrder",
    props: ['itemName', 'itemPrice', 'meal', 'itemId'],
    data() {
        return {
            note: null,
            overlay: false,
            itemUpdate: {}
        }
    },
    methods: {
        saveChange(){
            this.itemUpdate = {name: this.itemName, price: this.itemPrice, meal: this.meal, id: this.itemId}
            this.$emit('updateItem', this.itemUpdate)
        }
    }
}
</script>

<style>

</style>