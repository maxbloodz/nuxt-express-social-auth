<template>
  <v-container class="app-container" style="min-height: 490px;">
    <v-layout row fill-height justify-center align-content-center>
      <v-flex xs12 sm8 md6 class="px-1">
        <v-card class="px-3">
          <v-card-title class="headline pt-2">
            <v-icon class="pr-3">mdi-login</v-icon>
            <h1
              class="flex xs-12 headline font-weight-bold"
              style="color: rgba(0, 0, 0, 0.54); font-family: 'Kanit', sans-serif !important;"
            >
              SIGN IN
            </h1>
          </v-card-title>
          <v-divider />
          <v-card-text>
            <form @submit="submit">
              <v-text-field
                id="email"
                v-model="email"
                label="email"
                :error-messages="error.message ? ' ' : emailErrors"
                name="email"
                class="mini-input"
                autocomplete="email"
                prepend-inner-icon="mdi-account"
                outlined
                rounded
              >
              </v-text-field>
              <v-text-field
                id="password"
                v-model="password"
                label="password"
                :error-messages="error.message ? ' ' : passwordErrors"
                :append-icon="show ? 'mdi-eye-off' : 'mdi-eye'"
                :type="show ? 'text' : 'password'"
                name="password"
                class="mini-input"
                autocomplete="password"
                prepend-inner-icon="mdi-key-variant"
                outlined
                rounded
                @click:append="show = !show"
              >
              </v-text-field>
              <v-btn
                :loading="loading.signIn"
                height="45"
                type="submit"
                rounded
                block
                color="primary white--text"
              >
                SIGN-IN
              </v-btn>
            </form>
            <v-flex class="xs-12 text-center py-2" style="display: flex;">
              <v-divider class="mt-auto mb-auto mr-2" />
              OR
              <v-divider class="mt-auto mb-auto ml-2" />
            </v-flex>
            <v-btn
              :loading="loading.facebook"
              height="42"
              rounded
              outlined
              block
              color="blue white--text"
              class="mb-3"
              @click="socialLogin('facebook')"
            >
              <v-icon left>mdi-facebook</v-icon>
              Sign-in using facebook
            </v-btn>
            <v-btn
              :loading="loading.google"
              height="42"
              rounded
              outlined
              block
              color="red"
              @click="socialLogin('google')"
            >
              <v-icon left>mdi-google-plus</v-icon>
              Sign-in using google
            </v-btn>
            <v-flex class="xs-12 text-center pt-4" height="56">
              Don't have any account ?
              <a class="blue--text" @click="$router.push('/register')">
                Click here to sign up
              </a>
            </v-flex>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { validationMixin } from 'vuelidate'
import { required, email } from 'vuelidate/lib/validators'

export default {
  mixins: [validationMixin],
  middleware: 'guest',
  validations: {
    email: { required, email },
    password: { required }
  },
  transition(to, from) {
    try {
      if (to.name.split('___', 2)[0] === from.name.split('___', 2)[0]) {
        return 'none'
      }
    } catch (e) {
      return 'page'
    }
    return 'page'
  },
  data: () => ({
    show: false,
    email: '',
    password: '',
    loading: {
      signIn: false,
      facebook: false,
      google: false
    },
    error: {
      message: null,
      data: {
        email: null,
        password: null
      }
    }
  }),
  computed: {
    emailErrors() {
      const errors = []
      if (!this.$v.email.$dirty) return errors
      !this.$v.email.required && errors.push('Email is required.')
      !this.$v.email.email && errors.push('Email is wrong format.')
      return errors
    },
    passwordErrors() {
      const errors = []
      if (!this.$v.password.$dirty) return errors
      !this.$v.password.required && errors.push('Password is required')
      return errors
    }
  },
  methods: {
    submit(event) {
      event.preventDefault()
      this.error = {
        message: null,
        data: {
          email: null,
          password: null
        }
      }
      this.$v.$touch()
      if (!this.$v.$error) {
        this.loading.signIn = true
        this.$auth
          .loginWith('token', {
            data: {
              email: this.email,
              password: this.password
            }
          })
          .then(() => {
            this.loading.signIn = false
            this.$router.push('/')
          })
          .catch((error) => {
            this.loading.signIn = false
            this.error.message = error.message
          })
      }
    },
    socialLogin(service) {
      this.error.message = null
      this.loading[service] = true
      window.location.href = `/api/login/${service}`
    }
  }
}
</script>

<style>
.v-input.mini-input .v-input__control .v-input__slot {
  margin-bottom: 2px;
  min-height: 45px;
}
.v-input.mini-input .v-input__control .v-input__slot .v-input__prepend-inner,
.v-input.mini-input .v-input__control .v-input__slot .v-input__append-inner {
  margin-top: 10px;
}
.v-input.mini-input
  .v-input__control
  .v-input__slot
  .v-text-field__slot
  .v-label {
  top: 12px;
}
.v-input.mini-input
  .v-input__control
  .v-input__slot
  .v-text-field__slot
  .v-label--active {
  transform: translateY(-18px) scale(0.75);
}
.v-input.mini-input.verify .v-input__append-outer {
  margin-top: 5px;
}
.v-input.mini-input.verify .v-input__control .v-text-field__details {
  margin-bottom: 0px;
}
</style>
