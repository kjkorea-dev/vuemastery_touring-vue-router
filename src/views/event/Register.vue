<template>
  <p>Register the event here</p>
  <button @click="register">Register me</button>
</template>

<script>
export default {
  name: 'EventRegister',
  props: {
    event: {
      type: Object,
      required: true
    }
  },
  inject: ['GStore'],
  methods: {
    register() {
      this.GStore.flashMessage =
        'You are successfully registered for ' + this.event.title
      setTimeout(() => {
        this.GStore.flashMessage = ''
      }, 3000)

      this.$router.push({
        name: 'EventDetails'
      })
    }
  }
}
</script>
