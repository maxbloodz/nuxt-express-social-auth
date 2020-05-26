<template>
  <v-layout column justify-center align-center>
    <v-flex xs12 sm8 md6>
      <v-card>
        <v-container class="app-container">
          <v-layout column justify-center align-center>
            <v-flex xs12 style="width: 100%;">
              <v-card-title class="headline">
                <h2 class="text-center">
                  Nuxt.js Express social login
                </h2>
                <h5 class="text-center mt-3">
                  Make JWT Authentication web application using nuxt.js,
                  vuetify, express and passport.js.
                </h5>
              </v-card-title>
              <v-card-text>
                <v-row>
                  <v-col
                    cols="12"
                    md="10"
                    offset-md="1"
                    lg="8"
                    offset-lg="2"
                    xl="6"
                    offset-xl="3"
                    class="text-center"
                  >
                    <v-btn
                      dark
                      large
                      block
                      rounded
                      class="login-button"
                      @click.stop="button1"
                    >
                      {{ $auth.loggedIn ? 'SECURE PAGE' : 'LOGIN NOW' }}
                    </v-btn>
                    <v-flex
                      class="xs-12 text-center py-2"
                      style="display: flex;"
                    >
                      <v-divider class="mt-auto mb-auto mr-2" />
                      OR
                      <v-divider class="mt-auto mb-auto ml-2" />
                    </v-flex>
                    <v-btn
                      dark
                      large
                      block
                      rounded
                      class="register-button"
                      @click.stop="button2"
                    >
                      {{ $auth.loggedIn ? 'LOGOUT' : 'REGISTER' }}
                    </v-btn>
                  </v-col>
                </v-row>
              </v-card-text>
            </v-flex>
          </v-layout>
        </v-container>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
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
    button1() {
      if (this.$auth.loggedIn) {
        this.$auth.logout()
      } else {
        this.$router.push('/register')
      }
    },
    button2() {
      if (this.$auth.loggedIn) {
        this.$auth.logout()
      } else {
        this.$router.push('/register')
      }
    }
  }
}
</script>

<style scoped>
.headline {
  line-height: 2.75rem;
}

.headline > h2 {
  width: 100%;
}

.headline > h5 {
  width: 100%;
  font-weight: normal;
  line-height: 2rem;
  color: #6b7068;
}

.login-button {
  background: linear-gradient(to right, #64af31, #91d861);
  min-height: 44px;
  height: auto !important;
}

.register-button {
  background: linear-gradient(to right, #fdcb57, #f5902a);
  min-height: 44px;
  height: auto !important;
}
</style>
