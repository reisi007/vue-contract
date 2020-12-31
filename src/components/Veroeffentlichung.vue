<template xmlns="http://www.w3.org/1999/html">
  <div v-if="!readOnlyMode" class="mx-auto flex justify-center items-center">
    <input id="shootingType" v-model="isBoudoir" type="checkbox" class="text-reisishot h-5 w-5" checked/>
    <label for="shootingType" class="inline-block ml-2"> Ist das Shooting im Bereich Boudoir / Bikini / Akt?
    </label>
  </div>
  <AktVeroeffentlichung v-if="isBoudoir"></AktVeroeffentlichung>
  <SimpleStep v-else filename="6"></SimpleStep>
</template>
<script>
import SimpleStep from "./SimpleStep.vue";
import AktVeroeffentlichung from "./AktVeroeffentlichung.vue";

export default {
  components: {AktVeroeffentlichung, SimpleStep},
  data: function () {
    return {
      isBoudoir: false
    }
  },
  computed: {
    readOnlyMode: function () {
      return this.$store.state.readOnlyMode
    }
  }
}

</script>