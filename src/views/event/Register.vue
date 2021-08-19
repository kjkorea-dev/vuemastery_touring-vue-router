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
  methods: {
    register() {
      this.$router.push({
        name: 'EventDetails'
      })
    }
  }
}
</script>
