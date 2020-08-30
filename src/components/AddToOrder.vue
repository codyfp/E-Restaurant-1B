<template>
  <div class="add-to-order">
      <v-card>
          <v-col>
          <v-row>
              <v-col>
                  <h3>Quantity: </h3>
              </v-col>
              <v-col>
                  <v-row @click='quantity++'>
                      <v-btn icon>
                          <v-icon>mdi-plus</v-icon>
                        </v-btn>
                    </v-row>
                  <v-row>{{quantity}}</v-row>
                  <v-row v-if='quantity>0' @click='quantity--'>
                      <v-btn icon>
                          <v-icon>mdi-minus</v-icon>
                        </v-btn>
                    </v-row>
              </v-col>
              <v-col>
                  <v-btn @click='addNote=true'>add a note</v-btn>
                  <v-btn @click='removeNote' v-if='addNote'>Remove Note</v-btn>
                  <v-textarea v-if="addNote" v-model='note'></v-textarea>
              </v-col>
          </v-row>
          <v-row>
              <v-btn v-if='quantity>0' @click='test'>add to order</v-btn>
          </v-row>
        </v-col>
      </v-card>
  </div>
</template>

<script>
export default {
    name: "AddToOrder",
    data() {
        return {
            quantity: 1,
            addNote: false,
            note: null
        }
    },
    methods: {
        test(){
            console.log(this.note)
        },
        removeNote(){
            this.addNote = false
            this.note = null
        }
    }
}
</script>

<style>

</style>