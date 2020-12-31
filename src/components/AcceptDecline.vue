<template>
  <div class="button-bar">
    <button v-if="!readOnlyMode || isStepOk === true" class="button-success" v-on:click="okClicked"
            v-bind:class="{'button-gray': isStepOk === false}">
      Akzeptiert
    </button>
    <button v-if="!readOnlyMode || isStepOk !== true" class="button-fail" v-on:click="notOkClicked"
            v-bind:class="{'button-gray': isStepOk === true}">
      Nicht akzeptiert
    </button>
  </div>
</template>
<script>

export default {
  data() {
    return {
      isStepOk: null
    }
  },
  methods: {
    okClicked: function () {
      if (this.readOnlyMode)
        return
      if (this.isStepOk !== true) {
        this.isStepOk = true;
        this.$store.commit('plus')
      }
    },
    notOkClicked: function () {
      if (this.readOnlyMode)
        return
      if (this.isStepOk === true) {
        this.$store.commit('minus')
      }
      this.isStepOk = false;
    }
  },
  mounted() {
    this.$store.commit("addStep")
  },
  unmounted() {
    this.$store.commit("removeStep")
    if (this.isStepOk)
      this.$store.commit("minus")
  },
  computed: {
    readOnlyMode: function () {
      return this.$store.state.readOnlyMode
    }
  }
}
</script>