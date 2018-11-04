<template>
<v-container fluid>
  <v-slide-y-transition mode="out-in">
    <v-layout column align-center>
      <v-card>
        <v-card-title class="title">Sign Up</v-card-title>
        <v-card-text>
          <span class="red--text" v-if="signupError">{{ signupError }}</span>
            <v-form ref="form" v-model="valid" lazy-validation v-if="!loading">
              <v-text-field
                v-model="user.name"
                :rules="notEmptyRules"
                label="Name"
                required
              ></v-text-field>
              <v-text-field
                v-model="user.email"
                :rules="emailRules"
                label="E-mail"
                type="email"
                required
              ></v-text-field>
              <v-text-field
                v-model="user.password"
                :rules="notEmptyRules"
                label="Password"
                type="password"
                required
              ></v-text-field>
              <v-btn
                :disabled="!valid"
                @click="signUp"
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
import { mapState } from 'vuex'
export default {
  data: () => ({
    valid: true,
    signupError: '',
    user: {
      name: '',
      email: '',
      password: ''
    },
    notEmptyRules: [
      (value) => !!value || 'Cannot be empty'
    ],
    emailRules: [
      v => !!v || 'E-mail is required',
      v => /.+@.+/.test(v) || 'E-mail must be valid'
    ]
  }),

  methods: {
    signUp () {
      this.signupError = ''
      if (this.$refs.form.validate()) {
        const { User } = this.$FeathersVuex
        const user = new User(this.user)
        user.save()
          .then(user => {
            this.$router.push('/signin')
          })
          .catch((err) => {
            this.signupError = err.message
          })
      }
    },
    clear () {
      this.$refs.form.reset()
    }
  },
  computed: {
    ...mapState('users', { loading: 'isCreatePending' })
  }

}
</script>
