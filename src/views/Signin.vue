<template>
    <v-row justify="center">
        <v-col cols="12" sm="8" md="6" lg="4">
           <br><br>
          <h1>Login</h1>
            <br><br> 
            <v-card ref="form"  @submit.prevent="login">
            <v-card-text>
				<v-text-field
					ref="name"
					v-model="email"
					:rules="[() => !!email || 'This field is required']"
					:error-messages="errorMessages"
					label="Email Address"
					required
				></v-text-field>

				<v-text-field
					v-model="password"
					:append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
					:rules="[rules.required, rules.min]"
					:type="show1 ? 'text' : 'password'"
					name="input-10-1"
					label="Password"
					@click:append="show1 = !show1"
				></v-text-field>
                </v-card-text>
				<p class="feedback" v-if="feedback">{{ feedback }}</p>
				<router-link to="/ForgotPassword" tag="button" style="color: light grey;">Forget Password?</router-link>
        <router-link to="/FAQ" tag="button">Need Help?</router-link>
				
			<v-divider class="mt-6"></v-divider>
				<v-card-actions>
					<v-btn to="/Signin" >Cancel</v-btn>
					<v-spacer></v-spacer>
					<v-btn @click='login' color="primary" >Login</v-btn>
                    </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import firebase from 'firebase'
export default {
  name: 'Dsignin',
  data () {
    return {
      email: null,
      password:null,
      feedback: null,
      show1: false,
      msg: 'Welcome to the sign in page',
      rules: {
          required: value => !!value || 'Required.',
          min: v => v.length >= 6 || 'Min 6 characters',
          emailMatch: () => ('The email and password you entered don\'t match'),
        },
    }
  },
  methods: {
      login(){
          if(this.email && this.password){
              firebase.auth().signInWithEmailAndPassword(this.email, this.password)
              .then(cred => {console.log(cred.user)
                this.$router.push({ name: 'Dashboard'})
              }).catch(err=> {
                this.feedback= err.message
              })
              this.feedback = null

          } else{
              this.feedback = 'Please fill in both fields'
          }
      }
  }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.heading{
    background-color: rgb(17, 17, 11);
    margin: 0px;
    padding: 10px;
    color: white;
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
.square{
    background-color: #dfdfdf;
}
.feedback{
    color: red ; 
}
</style>