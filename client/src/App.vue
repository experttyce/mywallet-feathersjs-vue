<template>
  <v-app>
    <v-toolbar app dense color="green" dark>
      <v-toolbar-title class="headline text-uppercase">
        <span>My</span>
        <span class="font-weight-light"> Wallet</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
          <v-spacer></v-spacer>
    <v-toolbar-items v-if="!user">
      <v-btn flat :to="{name: 'SignIn'}">Login</v-btn>
      <v-btn flat :to="{name: 'SignUp'}">SignUp</v-btn>
    </v-toolbar-items>
    <v-toolbar-items v-if="user">
      <v-layout justify-content align-center>
        <h3>{{user.name}} </h3>
      <v-avatar
        :size="40"
        color="grey lighten-4"
        >
        <img src="@/assets/avatar.png" alt="avatar">
      </v-avatar>
      </v-layout>
      <v-btn flat @click="logout">Logout</v-btn>
    </v-toolbar-items>
    </v-toolbar>
    <v-content>
      <pre>{{ user }}</pre>

      <router-view></router-view>
    </v-content>
  </v-app>
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
  name: 'App',
  data () {
    return {
      title: 'Boletaje V2'
    }
  },
  computed: {
    ...mapState('auth', { user: 'user' })
    // user () {
    //   return this.$store.state.auth.user
    // }
  },
  methods: {
    ...mapActions('auth', { authLogout: 'logout' }),
    logout () {
      this.authLogout().then(() => this.$router.push('/signin'))
    }
  }
}
</script>
