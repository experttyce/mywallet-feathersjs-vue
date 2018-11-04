<template>
  <v-container fluid>
    <v-slide-y-transition mode="out-in">
      <v-layout column align-center>
        <v-card>
          <v-card-title class="title">
            Sign In
          </v-card-title>
          <v-card-text>
            <span class="red--text" v-if="loginError">{{ loginError }}</span>
            <v-form ref="form" v-model="valid" v-if="!loading">
              <v-text-field
                v-model="user.email"
                type="email"
                label="Username"
                :rules="notEmptyRules"
                required
              ></v-text-field>
              <v-text-field
                v-model="user.password"
                label="Password"
                type="password"
                :rules="notEmptyRules"
                required
              ></v-text-field>

              <v-btn
                @click="login"
                :disabled="!valid"
              >
                submit
              </v-btn>
              <v-btn @click="clear">clear</v-btn>
            </v-form>
            <v-progress-circular
              v-if="loading"
              :size="70"
              :width="7"
              color="purple"
              indeterminate
            ></v-progress-circular>
          </v-card-text>
        </v-card>

      </v-layout>
    </v-slide-y-transition>
  </v-container>
</template>
<script>
import { mapState, mapActions } from 'vuex'
export default {
  name: 'login',
  data () {
    return {
      valid: false,
      loginError: '',
      user: {
        email: null,
        password: null
      },
      notEmptyRules: [
        (value) => !!value || 'Cannot be empty'
      ]
    }
  },
  computed: {
    ...mapState('auth', { loading: 'isAuthenticatePending' })
  },
  methods: {
    ...mapActions('auth', ['authenticate']),
    login () {
      if (this.$refs.form.validate()) {
        this.loginError = ''
        this.authenticate({
          strategy: 'local',
          email: this.user.email,
          password: this.user.password
        }).then((u) => {
          this.$router.push('/')
        }).catch(e => {
          this.loginError = e.message
        })
      }
    },
    clear () {
      this.$refs.form.reset()
    }
  }
}
</script>
