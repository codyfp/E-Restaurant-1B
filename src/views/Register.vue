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
      <div class="field center">
        <button class="btn yellow">Register</button>
      </div>
    </form>  
  </div>
</template>

<script>
import slugify from 'slugify'
  export default {
    name: 'Signup',
    data(){
      return{
        email: null,
        password: null,
        fullName: null,
      }
    },
    methods:{
      signup(){
        
      }
    }
  } 
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