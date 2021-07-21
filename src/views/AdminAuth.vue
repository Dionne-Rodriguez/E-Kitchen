<template>

  <b-modal ref="modal" @ok="signInWithAdminEmailAndPassword" :ok-title="'Send'" id="modal-log-in" title="Log in">
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
</template>

<script>
export default {
name: "AdminAuth",
  data() {
  return {
    credentials: {
      email: null,
      password: null
    },
    message: null,
    code:null
  }
  },
  methods: {
    signInWithAdminEmailAndPassword(bvModalEvt) {
      bvModalEvt.preventDefault()

      if(this.credentials.email != null && this.credentials.password != null) {
        this.handleAdminSignIn(this.credentials)
            .then((data) => {
              this.code = data.code
              this.message = data.message
            }).catch((err) => {
          this.code = err.error.code
          this.message = err.error.message
        })
      }
    },
  },
  mounted(){
    this.$bvModal.show('modal-log-in')
  }
}
</script>

<style scoped>

</style>