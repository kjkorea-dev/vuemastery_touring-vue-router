<template>
  <p @click="unsavedChanges = !unsavedChanges">
    Edit the event here {{ unsavedChanges ? '(Editing...)' : '' }}
  </p>
</template>

<script>
export default {
  name: 'EventEdit',
  data() {
    return {
      unsavedChanges: false
    }
  },
  beforeRouteLeave() {
    if (this.unsavedChanges) {
      const answer = window.confirm(
        'Do you really want to leave? You have unsaved chnages!'
      )
      if (!answer) return false
    }
  },
  props: {
    event: {
      type: Object,
      required: true
    }
  }
}
</script>
