<template>
<b-container fluid>
  <b-navbar class="white" toggleable type="light" variant="light">
    <!-- <b-navbar-brand href="/">
       <img src="../assets/e-kitchen.png" class="d-inline-block align-top" alt="Kitten">
      </b-navbar-brand> -->
       <b-navbar-brand v-if="mobile" href="/" >
       <img src="../assets/e-kitchen-small.png" class="d-inline-block align-top" alt="E-Kitchen logo">
      </b-navbar-brand>

    <b-navbar-toggle target="navbar-toggle-collapse">
      <template #default="{ expanded }">
        <b-icon v-if="expanded" icon="chevron-bar-up"></b-icon>
        <b-icon v-else icon="chevron-bar-down"></b-icon>
      </template>
    </b-navbar-toggle>

    <b-collapse id="navbar-toggle-collapse" is-nav>
      <b-navbar-nav class="ml-auto">
        <b-nav-item @click="$bvModal.show('modal-log-in')">Sign in</b-nav-item>
        <b-nav-item @click="$bvModal.show('modal-sign-up')">Make an account</b-nav-item>
        <b-nav-item @click="logOut">Log out</b-nav-item>
      </b-navbar-nav>
    </b-collapse>
    <b-modal id="modal-log-in" @ok="LogInWithEmailAndPassword" title="BootstrapVue">
      <form ref="form" @submit.stop.prevent="handleSubmit">
        <b-form-group
            label="Email"
        >
          <b-form-input invalid-feedback="" v-model="credentials.email" type="text" placeholder="Email"></b-form-input>
        </b-form-group>

        <b-form-group
            label="Password"
        >
          <b-form-input v-model="credentials.password" type="text" placeholder="Password"></b-form-input>
        </b-form-group>

        <b-form-group :class="this.code === 200 ? 'success-message' : 'error-message'" v-if="this.message">{{renderErrorMessage}}</b-form-group>
      </form></p>
    </b-modal>

    <b-modal ref="modal" @ok="signUpWithEmailAndPassword" :ok-title="'Send'" id="modal-sign-up" title="Sign up">
      <form ref="form" @submit.stop.prevent="handleSubmit">
        <b-form-group
        label="Email"
        >
          <b-form-input invalid-feedback="" v-model="credentials.email" type="text" placeholder="Email"></b-form-input>
        </b-form-group>

        <b-form-group
        label="Password"
        >
          <b-form-input v-model="credentials.password" type="text" placeholder="Password"></b-form-input>
        </b-form-group>

        <b-form-group :class="this.code === 200 ? 'success-message' : 'error-message'" v-if="this.message">{{renderErrorMessage}}</b-form-group>
      </form>
    </b-modal>
  </b-navbar>
</b-container>


</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "navBar",
  data() {
    return {
      credentials: {
        email: null,
        password: null,
      },
      message: null,
      code: null,
    };
  },
  computed: {
    renderErrorMessage() {
      console.log(this.message);
      return this.message;
    },
    mobile() {
      console.log("vuetify",this.$vuetify);
    return this.$vuetify.breakpoint.sm
  },
  },
  methods: {
    ...mapActions(["handleSignUp", "handleLogIn","handleLogOut"]),
    signUpWithEmailAndPassword(bvModalEvt) {
      bvModalEvt.preventDefault();
      if (this.credentials.email != null && this.credentials.password != null) {
        this.handleSignUp(this.credentials)
          .then((data) => {
            this.code = data.code;
            this.message = data.message;
          })
          .catch((err) => {
            this.code = err.error.code;
            this.message = err.error.message;
          });
      }
    },
    LogInWithEmailAndPassword(bvModalEvt) {
      bvModalEvt.preventDefault();

      if (this.credentials.email != null && this.credentials.password != null) {
        this.handleLogIn(this.credentials)
          .then((data) => {
            this.code = data.code;
            this.message = data.message;
          })
          .catch((err) => {
            this.code = err.error.code;
            this.message = err.error.message;
          });
      }
    },
    logOut(){
      this.handleLogOut()
    },
    handleSubmit() {
      this.$nextTick(() => {
        this.$bvModal.hide("modal-prevent-closing");
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.white {
   background-color: black!important;
}
input {
  width: 100%;
  border-radius: 5px;
  height: 48px;
  padding: 1%;
  border: 1px solid lightgrey;
}

.error-message {
  color: red;
}

.success-message {
  color: green;
}

h5 {
  font-size: 28px;
  margin-top: 16px;
}
</style>