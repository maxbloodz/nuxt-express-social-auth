<template>
  <v-container class="app-container">
    <v-overlay :value="true" color="white" opacity="1" z-index="7">
      <div :style="styles" class="spinner spinner--gauge">
        <div :style="innerStyles" class="spinner-inner"></div>
      </div>
    </v-overlay>
  </v-container>
</template>

<script>
import Alert from '~/components/function/Alert'

export default {
  middleware: 'guest',
  props: {
    size: {
      type: String,
      default: '250px'
    }
  },
  data() {
    return {
      token: this.$route.query.token ? this.$route.query.token : null,
      error: this.$route.query.error ? this.$route.query.error : null
    }
  },
  computed: {
    innerStyles() {
      const size = parseInt(this.size)
      return {
        transform: 'scale(' + size / 60 + ')'
      }
    },
    styles() {
      const size = parseInt(this.size)
      return {
        width: this.size,
        height: size / 2 + 'px'
      }
    }
  },
  mounted() {
    const vn = this
    this.$nextTick(function() {
      vn.$auth
        .logout()
        .then(() => {
          vn.initial()
        })
        .catch(() => {
          vn.initial()
        })
    })
  },
  methods: {
    logout() {
      const vn = this
      vn.$auth.logout().then(() => {
        vn.$auth.$storage.removeUniversal('_token.token')
        vn.$auth.$storage.removeUniversal('_refresh_token.token')
      })
    },
    initial() {
      const vn = this
      if (vn.token) {
        vn.$auth.setStrategy('token')
        vn.$auth
          .setUserToken(vn.token)
          .then(() => {
            Alert.success(vn, () => {
              vn.$router.push('/')
            })
          })
          .catch((error) => {
            Alert.error(
              vn,
              error.message,
              () => {
                vn.$router.push('/login')
              },
              true,
              5000
            )
          })
      } else if (vn.error) {
        Alert.error(
          vn,
          'Internal Server Error.',
          () => {
            vn.$router.push('/login')
          },
          true,
          5000
        )
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.spinner {
  display: flex;
  justify-content: center;
  align-items: center;
  * {
    line-height: 0;
    box-sizing: border-box;
  }
}
.spinner-inner {
  width: 60px;
  height: 30px;
  flex-shrink: 0;
  background: lightgray;
  border-top-left-radius: 32px;
  border-top-right-radius: 32px;
  display: inline-block;
  overflow: hidden;
  position: relative;
  text-indent: -9999px;
}
.spinner-inner::before {
  animation: gauge-spinner 4000ms infinite ease;
  background: white;
  border-radius: 0px;
  content: '';
  position: absolute;
  left: 30px;
  top: 5.33333px;
  width: 4px;
  height: 26.66667px;
  transform-origin: 50% 100%;
}
.spinner-inner::after {
  content: '';
  background: white;
  border-radius: 8px;
  position: absolute;
  left: 25.6px;
  top: 25.6px;
  width: 12.8px;
  height: 12.8px;
}
@keyframes gauge-spinner {
  0% {
    transform: rotate(-50deg);
  }
  10% {
    transform: rotate(20deg);
  }
  20% {
    transform: rotate(60deg);
  }
  24% {
    transform: rotate(60deg);
  }
  40% {
    transform: rotate(-20deg);
  }
  54% {
    transform: rotate(70deg);
  }
  56% {
    transform: rotate(78deg);
  }
  58% {
    transform: rotate(73deg);
  }
  60% {
    transform: rotate(75deg);
  }
  62% {
    transform: rotate(70deg);
  }
  70% {
    transform: rotate(-20deg);
  }
  80% {
    transform: rotate(20deg);
  }
  83% {
    transform: rotate(25deg);
  }
  86% {
    transform: rotate(20deg);
  }
  89% {
    transform: rotate(25deg);
  }
  100% {
    transform: rotate(-50deg);
  }
}
</style>
