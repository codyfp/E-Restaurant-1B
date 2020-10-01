<template>
  <div class= "signup container">
    <h1>Register</h1>
    <form @submit.prevent="signup" class="card-panel">
      <div class="field">
        <label for="fullName">Full Name:</label>
        <input type="name" name="fullName" v-model="fullName">
      </div>
      <div class="field">
        <label for="email">Email:</label>
        <input type="email" name="email" v-model="email">
      </div>
      <div class="field">
        <label for="password">Password:</label>
        <input type="password" name="password" v-model="password">
      </div>
      <p class="red-text center" v-if="feedback">{{ feedback }}</p>
      <div class="field center">
        <button class="btn yellow">Register</button>
      </div>
    </form>  
  </div>
</template>

<script>
import firebase from "firebase";
import db from "@/firebase/init";
import slugify from "slugify";
  export default {
    name: 'Signup',
    data(){
      return{
        email: null,
        password: null,
        fullName: null,
        feedback: null,
        slug: null,
      }
    },
    methods:{
    signup() {
      if (
        this.email &&
        this.fullName &&
        this.password
      ) {
        this.slug = slugify(this.email, {
          lower: true
        });
        let ref = db.collection("users").doc(this.slug);
        ref.get().then(doc => {
          if (doc.exists) {
            this.feedback = "this email is in use!";
          } else {
            firebase
              .auth()
              .createUserWithEmailAndPassword(this.email, this.password)
              .then(cred => {
                ref.set({
                  firstname: this.firstname,
                  email: this.email,
                  user_id: cred.user.uid
                });
              })
              .then(() => {
                this.$router.push({ name: 'Booking'});
              })
              .catch(err => {
                console.log(err);
                this.feedback = err.message;
              });
            this.feedback = "Signing In";
          }
        });
      } else {
        this.feedback = "Please fill in all required fields.";
      }
    },
       resetForm() {
      this.errorMessages = [];
      this.formHasErrors = false;

      Object.keys(this.form).forEach(f => {
        this.$refs[f].reset();
      });
    },
    submit() {
      this.formHasErrors = false;

      Object.keys(this.form).forEach(f => {
        if (!this.form[f]) this.formHasErrors = true;

        this.$refs[f].validate(true);
      });
    }
  }
};
</script>

<style>
.signup{
  max-width: 400px;
  margin-top: 60px;
}
.signup h2{
  font-size:2.4em;
}
.signup .field{
  margin-bottom: 16px;
}
</style>