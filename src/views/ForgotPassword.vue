<template>
<v-container>
  
  
  <div>
    <!---<h1 class="heading">Doctor Finder</h1> --> 
    <form class="forget" @submit.prevent="forgotpass">
      <div class="square"  > 
        <h2> Forgot Password</h2>
        <br>
        <v-layout row justify-center>
        <v-card width=400px flat>
        
        <v-text-field type="email" id="email" placeholder="Enter Email Address" name="email" v-model="email"></v-text-field><br>
         <p v-if="feedback" class="red-text center">{{ feedback}}</p>
        <v-btn  color="primary" type="submit" value="Send Email">Send Email</v-btn> <br>
        <router-link to="/FAQ" >Need Help?</router-link>
           </v-card>
          </v-layout>
      </div>
    </form>             
  </div> 
  
</v-container>
</template>

<script>
import firebase from 'firebase'
export default {
  name: 'ForgotPass',
  data () {
    return {
      email: null,
      feedback: null,
      msg: 'Welcome to forgot password page'
    }
  },
  methods: {
    forgotpass(){
      if (this.email){
        firebase.auth().sendPasswordResetEmail(this.email)
           /* .then(this.$router.push({ name: 'U'})) */
         .catch(err=> {
                this.feedback= err.message
              })
              this.feedback = 'Please check your inbox to reset your password'
      }else{
        this.feedback = 'Please enter a valid email address'
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.heading{

    margin: 0px;
    padding: 10px;
    color: red;
    font-size: xx-large;
}
.form{
    margin: 20px 300px;
    padding: 100px;
    display: grid;
    grid-template-columns: auto;
    align-items: center;
    text-align: center;
}
button{
margin: 5px;
margin-bottom: 5px;
}
.button{
    width: 100px;
    margin-bottom: 5px;
}

</style>