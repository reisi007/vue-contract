<template>
  <textarea v-if="!readOnlyMode" v-model="data" rows="10" class="w-full"></textarea>
  <span class="whitespace-pre" v-else>
 {{ data }}
  </span>
</template>
<script>
export default {
  data: function () {
    return {
      data: ''
    }
  },
  computed: {
    readOnlyMode: function () {
      return this.$store.state.readOnlyMode
    }
  }
}
</script>