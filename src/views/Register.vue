<template>
  <div class="signup container">
    <br /><br />
    <h1>Register</h1>
    <br /><br />
    <v-card ref="form" @submit.prevent="signup">
      <v-card-text>
        <v-text-field
          ref="fullName"
          v-model="fullName"
          :rules="[() => !!fullName || 'This field is required']"
          :error-messages="errorMessages"
          label="Full Name"
          placeholder="John Citizen"
          required
        ></v-text-field>
      </v-card-text>

      <v-card-text>
        <v-text-field
          ref="email"
          v-model="email"
          :rules="[() => !!email || 'This field is required', emailCheck]"
          label="Email Address"
          required
        ></v-text-field>
      </v-card-text>

      <v-card-text>
        <v-text-field
          v-model="password"
          :type="show1 ? 'text' : 'password'"
          name="input-10-0"
          label="Password"
          @click:append="show1 = !show1"
        ></v-text-field>
      </v-card-text>

      <p class="red-text center" v-if="feedback">{{ feedback }}</p>

      <v-card-actions>
        <v-btn to="/" text>Cancel</v-btn>
        <v-spacer></v-spacer>

        <v-btn @click="signup" color="primary">Register Account</v-btn>
      </v-card-actions>
    </v-card>
  </div>
  <!--   <v-row justify="center">
    <v-col cols="12" sm="10" md="8" lg="6">
      <br />
      <br />
      <h1>Register</h1>
      <br />
      <br />
      <v-card ref="form" @submit.prevent="signup">
        <v-card-text>
          <v-text-field
            ref="fullName"
            v-model="fullName"
            :rules="[() => !!fullName || 'This field is required']"
            :error-messages="errorMessages"
            label="Full Name"
            placeholder="John Citizen"
            required
          ></v-text-field>
          
          <v-text-field
            ref="email"
            v-model="email"
            :rules="[
              () => !!email || 'This field is required',
              emailCheck
            ]"
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
          <p class="feedback" v-if="feedback">{{ feedback }}</p>
        </v-card-text>
        <v-divider class="mt-12"></v-divider>


        <v-card-actions>
          <v-btn text>Cancel</v-btn>
          <v-spacer></v-spacer>
       
          <v-btn @click="signup" color="primary">Register Account</v-btn>
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row> -->
</template>

<script>
import firebase from "firebase";
import db from "@/firebase/init";
import slugify from "slugify";
export default {
  name: "Signup",
  data() {
    return {
      email: null,
      password: null,
      fullName: null,
      feedback: null,
      slug: null,
    };
  },

  // Email
  mounted() {
    let Script = document.createElement("script");
    Script.setAttribute("src", "https://smtpjs.com/v3/smtp.js");
    document.head.appendChild(Script);
  },

  methods: {
    signup() {
      if (this.email && this.fullName && this.password) {
        this.slug = slugify(this.email, {
          lower: true,
        });
        let ref = db.collection("users").doc(this.slug);
        ref.get().then((doc) => {
          if (doc.exists) {
            this.feedback = "this email is in use!";
          } else {
            firebase
              .auth()
              .createUserWithEmailAndPassword(this.email, this.password)
              .then((cred) => {
                ref.set({
                  fullName: this.fullName,
                  email: this.email,
                  user_id: cred.user.uid,
                });
              })
              .then(() => {
                this.$router.push({ name: "Dashboard" });
              })
              .catch((err) => {
                console.log(err);
                this.feedback = err.message;
              });
            this.feedback = "Signing In";
            this.emailSuccess();
          }
        });
      } else {
        this.feedback = "Please fill in all required fields.";
      }
    },
    resetForm() {
      this.errorMessages = [];
      this.formHasErrors = false;

      Object.keys(this.form).forEach((f) => {
        this.$refs[f].reset();
      });
    },
    submit() {
      this.formHasErrors = false;

      Object.keys(this.form).forEach((f) => {
        if (!this.form[f]) this.formHasErrors = true;

        this.$refs[f].validate(true);
      });
    },

    //Method for Email
    emailSuccess() {
      window.Email.send({
        SecureToken: "d9e936a8-27cb-443b-827c-72937ef20e82",
        To: "customerefooddemo@gmail.com",
        From: "LeBistrotdAndre@gmail.com",
        FromName: "Le Bistrot d'Andre",
        Subject: "Account Register Success!",
        Body:
          "Dear " +
          this.fullName +
          ",<br /><br />Welcome to Le Bistrot d'Andre!<br /><br />We are please to inform you that your account has been created.<br /><br />To log into our site, please click on 'Login' located at the top of the website. Once clicked, just enter your email and password then click next to proceed to your very own dashboard.<br /><br />If you have any questions about your account or other matter, please feel free to contact us at 02 9281 3322 or eat@lebistrot.com.au.<br /><br />Thanks,<br />Le Bistrot d'Andre Customer Support Team",
      });
    },
  },
};
</script>

<style>
.signup {
  max-width: 400px;
  margin-top: 60px;
}
.signup h2 {
  font-size: 2.4em;
}
.signup .field {
  margin-bottom: 16px;
}
</style>




