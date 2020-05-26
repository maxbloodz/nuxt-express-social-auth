<template>
  <v-app light style="background-color: transparent;">
    <v-navigation-drawer v-model="drawer" disable-resize-watcher app>
      <v-list>
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          :to="item.to"
          router
          exact
        >
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="item.title" />
          </v-list-item-content>
        </v-list-item>
        <v-list-item v-if="$auth.loggedIn" router exact @click="$auth.logout()">
          <v-list-item-action>
            <v-icon>mdi-logout</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Logout</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar fixed app>
      <v-toolbar-title v-text="title" />
      <v-spacer />
      <v-list
        v-if="$auth.loggedIn"
        style="padding: 0px; background-color: transparent;"
      >
        <v-list-item
          right
          two-line
          style="min-height: auto; padding: 0px 8px; float: right;"
        >
          <v-list-item-avatar style="margin: 5px 12px 5px 0px;">
            <v-avatar color="#eaeaea">
              <v-icon>mdi-account</v-icon>
            </v-avatar>
          </v-list-item-avatar>

          <v-list-item-content style="display: block; padding: 0px;">
            <v-list-item-title>
              {{ $auth.user.first_name }}
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
    </v-app-bar>
    <v-content>
      <v-container>
        <nuxt />
      </v-container>
    </v-content>
    <v-footer :fixed="false" color="transparent" app>
      <v-spacer />
      <span>Maxbloodz &copy; {{ new Date().getFullYear() }}</span
      ><v-spacer />
    </v-footer>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      drawer: false,
      guestItems: [
        {
          icon: 'mdi-home',
          title: 'Home',
          to: '/'
        },
        {
          icon: 'mdi-login',
          title: 'Login',
          to: '/login'
        },
        {
          icon: 'mdi-account-plus',
          title: 'Register',
          to: '/register'
        }
      ],
      authItems: [
        {
          icon: 'mdi-home',
          title: 'Home',
          to: '/'
        }
      ],
      title: 'Nuxt.js Social Authentication'
    }
  },
  computed: {
    items() {
      return this.$auth.loggedIn ? this.authItems : this.guestItems
    }
  }
}
</script>
