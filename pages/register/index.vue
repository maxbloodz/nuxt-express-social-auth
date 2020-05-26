<template>
  <v-container class="app-container" style="min-height: 550px;">
    <v-layout row fill-height justify-center align-content-center>
      <v-flex xs12 sm10 md8 class="px-1">
        <v-card px-3>
          <v-card-title class="headline pt-2">
            <v-icon class="pr-3">mdi-account-plus</v-icon>
            <h1
              class="flex xs-12 headline font-weight-bold"
              style="color: rgba(0, 0, 0, 0.54); font-family: 'Kanit', sans-serif !important;"
            >
              REGISTER
            </h1>
          </v-card-title>
          <v-divider />
          <v-card-text>
            <form @submit="submit">
              <v-row>
                <v-col cols="12" sm="6" class="py-0">
                  <v-text-field
                    id="firstName"
                    v-model="register.first_name"
                    label="First name"
                    :error-messages="error.message ? ' ' : firstNameErrors"
                    name="firstName"
                    class="mini-input"
                    outlined
                    rounded
                    required
                  >
                  </v-text-field>
                </v-col>
                <v-col cols="12" sm="6" class="py-0">
                  <v-text-field
                    id="lastName"
                    v-model="register.last_name"
                    label="Last name"
                    :error-messages="error.message ? ' ' : lastNameErrors"
                    name="lastName"
                    class="mini-input"
                    outlined
                    rounded
                    required
                  >
                  </v-text-field>
                </v-col>
              </v-row>

              <v-text-field
                id="email"
                v-model="register.email"
                label="Email"
                :error-messages="error.message ? ' ' : emailErrors"
                name="email"
                class="mini-input"
                autocomplete="email"
                outlined
                rounded
                required
              >
              </v-text-field>
              <v-text-field
                id="password"
                v-model="register.password"
                label="Password"
                :error-messages="error.message ? ' ' : passwordErrors"
                :append-icon="showPassword ? 'mdi-eye-off' : 'mdi-eye'"
                :type="showPassword ? 'text' : 'password'"
                name="password"
                class="mini-input"
                autocomplete="password"
                outlined
                rounded
                required
                @click:append="showPassword = !showPassword"
              ></v-text-field>
              <v-text-field
                id="re_password"
                v-model="register.re_password"
                label="Confirm password"
                :error-messages="repasswordErrors"
                :append-icon="showRePassword ? 'mdi-eye-off' : 'mdi-eye'"
                :type="showRePassword ? 'text' : 'password'"
                name="re_password"
                class="mini-input"
                outlined
                rounded
                required
                @click:append="showRePassword = !showRePassword"
              ></v-text-field>
              <v-btn
                :loading="loading.signUp"
                height="42"
                rounded
                block
                color="primary white--text"
                @click="submit"
              >
                REGISTER
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
              REGISTER USING FACEBOOK
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
              REGISTER USING GOOGLE
            </v-btn>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { validationMixin } from 'vuelidate'
import { required, email, minLength } from 'vuelidate/lib/validators'
import Alert from '~/components/function/Alert'

export default {
  mixins: [validationMixin],
  middleware: 'guest',
  props: {
    size: {
      type: String,
      default: '250px'
    }
  },
  validations: {
    register: {
      first_name: { required },
      last_name: { required },
      email: { required, email },
      password: { required, minLength: minLength(6) },
      re_password: { required, minLength: minLength(6) }
    }
  },
  data() {
    return {
      showPassword: false,
      showRePassword: false,
      register: {
        first_name: null,
        last_name: null,
        email: null,
        password: null,
        re_password: null
      },
      loading: {
        signUp: false,
        facebook: false,
        google: false
      },
      error: {
        message: null,
        data: {
          first_name: null,
          last_name: null,
          email: null,
          password: null,
          re_password: null
        }
      }
    }
  },
  computed: {
    firstNameErrors() {
      const errors = []
      if (!this.$v.register.first_name.$dirty) return errors
      !this.$v.register.first_name.required &&
        errors.push('First name is required.')
      return errors
    },
    lastNameErrors() {
      const errors = []
      if (!this.$v.register.last_name.$dirty) return errors
      !this.$v.register.last_name.required &&
        errors.push('Last name is required.')
      return errors
    },
    emailErrors() {
      const errors = []
      if (!this.$v.register.email.$dirty) return errors
      !this.$v.register.email.required && errors.push('Email is required.')
      !this.$v.register.email.email && errors.push('Email is wrong format.')
      return errors
    },
    passwordErrors() {
      const errors = []
      if (!this.$v.register.password.$dirty) return errors
      !this.$v.register.password.required &&
        errors.push('Password is required.')
      !this.$v.register.password.minLength &&
        errors.push('Password must have length at least 6.')
      return errors
    },
    repasswordErrors() {
      const errors = []
      if (!this.$v.register.re_password.$dirty) return errors
      !this.$v.register.re_password.required &&
        errors.push('Confirm password is required.')
      !this.$v.register.re_password.minLength &&
        errors.push('Wrong Confirm password.')
      this.register.password !== this.register.re_password &&
        errors.push('Password and confirm password mismatch.')
      return errors
    }
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
  methods: {
    socialLogin(service) {
      this.loading[service] = true
      window.location.href = `/api/login/${service}`
    },
    submit(event) {
      const vn = this
      event.preventDefault()
      this.error = {
        message: null,
        data: {
          first_name: null,
          last_name: null,
          email: null,
          password: null,
          re_password: null
        }
      }
      vn.$v.$touch()
      if (!vn.$v.$error) {
        vn.loading.signUp = true
        vn.$axios
          .post('/register', vn.register)
          .then((response) => {
            if (response.status === 201) {
              vn.loading.signUp = false
              Alert.success(
                vn,
                () => {
                  vn.$router.push('/')
                },
                5000
              )
            }
          })
          .catch(() => {
            this.loading.signUp = false
            Alert.success(
              vn,
              () => {
                vn.$router.push('/')
              },
              5000
            )
          })
      }
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
