<template>
  <v-card>
    <v-toolbar
      dark
      color="primary"
    >
      <v-btn
        icon
        dark
        @click="close"
      >
        <v-icon>close</v-icon>
      </v-btn>
      <v-toolbar-title>Login and Start Shopping!</v-toolbar-title>
    </v-toolbar>
    <v-divider />

    <v-container fluid>
      <v-form
        ref="form"
        v-model="valid"
        lazy-validation
      >
        <v-text-field
          v-model="email"
          :rules="emailRules"
          label="E-mail"
          required
          append-icon="email"
        />
        <v-text-field
          v-model="password"
          :append-icon="showPassword ? 'visibility' : 'visibility_off'"
          :rules="passwordRules"
          :type="showPassword ? 'text' : 'password'"
          label="Password"
          hint="At least 6 characters"
          counter
          @click:append="showPassword = !showPassword"
        />

        <div class="text-xs-center">
          <v-btn
            color="accent lighten-1"
            :disabled="!valid"
            @click="submit"
          >
            Login
            <v-icon
              right
              dark
            >
              lock_open
            </v-icon>
          </v-btn>
        </div>
      </v-form>
    </v-container>
  </v-card>
</template>
<script>
  import { mapGetters, mapActions } from 'vuex'
  import axios from 'axios'
  export default {
    name: 'Login',
    data () {
      return {
        valid: true,
        email: 'lou56@example.org',
        emailRules: [
          v => !!v || 'E-mail is required',
          v => /([a-zA-Z0-9_]{1,})(@)([a-zA-Z0-9_]{2,}).([a-zA-Z0-9_]{2,})+/.test(v) || 'E-mail must be valid'
        ],
        showPassword: false,
        password: '',
        passwordRules: [
          v => !!v || 'Password required.',
          v => (v && v.length >= 6) || 'Min 6 characters',
        ],
      }
    },
    computed: {
      ...mapGetters({
        user  : 'auth/user',
         prevUrl : 'prevUrl',
      }),
    },
    methods: {
      ...mapActions({
          setAlert  : 'alert/set',
          setStatusDialog   : 'dialog/setStatus',
          setAuth   : 'auth/set',
      }),
      close(){
          this.setStatusDialog(false)
      },
      submit () {
          let urlLogin = `${process.env.VUE_APP_BACKEND_URL}login` 
        //   $url = 'http://127.0.0.1:8000/api/v1/login'
        console.log(urlLogin)
          if (this.$refs.form.validate()) {
            let formData = {
              'email' : this.email,
              'password' : this.password
            }
            axios.post(urlLogin, formData)
              .then((response) => {
                let data_user = response.data.data
                this.setAuth(data_user)
                if(this.user.id>0){
                  this.setAlert({
                    status : true,
                    text  : 'Login success',
                    type  : 'success',
                  })
                  this.setStatusDialog(false)
                }
                else{
                  this.setAlert({
                    status : true,
                    text  : 'Login error',
                    type  : 'error',
                  })
                }
              })
              .catch((error) => {
                let responses = error.response
                this.setAlert({
                    status : true,
                    text  : responses.data.message,
                    type  : 'error',
                })
              })
              
            if(this.prevUrl.length>0) this.$router.push(this.prevUrl) // ini previous url
            this.close()
          }
      },
    },
  }
</script>