<template>
    <v-layout row justify="center">
        
        <h1>Edit Account</h1>
        <v-row justify="center">
          <v-col>
            <v-card ref="form">
              <v-card-text>
                <h3>Hello, {{this.user.email}}</h3>
                <v-text-field
                  ref="fullName"
                  v-model="details.fullName"
                  label="New Full Name"
                  placeholder="John Citizen"
                  hint="E.g. Hugh Citizen"
                  required
                ></v-text-field>

                <v-text-field
                  :type="show2 ? 'text' : 'password'"
                  name="input-10-2"
                  label="New Password"
                  hint="At least 6 characters"
                  class="input-group--focused"
                  @click:append="show2 = !show2"
                ></v-text-field>
              </v-card-text>

              <p class="red--text">{{feedback}}</p>

              <v-divider class="mt-12"></v-divider>
              <v-card-actions>
                <v-btn color="primary" text @click="updateField" block>Change</v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
    </v-layout>
</template>

<script>
import db from "@/firebase/init";
import firebase from "firebase";
// Fake data that should instead be empty and replaced on sign in with users data
export default {
  name: "EditAccount",
  components: {
  },
  data() {
    return {
      details: {
        fullName: null,
      },
      feedback: null,
      user: firebase.auth().currentUser
    };
  },

  created() {
    db
      .collection("users")
      .doc(this.user.email)
      .get()
      .then(doc => {
        if (!doc.exists) {
          console.log("User does not exist");
        } else {
          this.details.fullName = doc.data().fullName;
        }
      })
      .catch(err => {
        console.log("Error getting document", err);
      });
  },
  
  methods: {

    updateField() {
      let ref = db.collection("users").doc(this.user.email);
      ref.update({
        FullName: this.details.fullName,
      });
      this.feedback = "Changes Complete";
    }
  }
};
</script>

<style>
</style>
