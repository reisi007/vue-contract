<template>
  <SimpleStep filename="akt"></SimpleStep>

  <div class="step">
    <h2>Wähle eine der folgenden Optionen bezüglich Veröffentlichung der Bilder aus</h2>
    <ul class="my-2">
      <template v-for="(item, index) in optionen">
        <li class="border p-2 my-1 font-bold hover:bg-gray-200"
            v-bind:class="{'button-success':index === selectedIndex}"
            v-if="!readOnlyMode || index === selectedIndex"
            v-on:click="onSelect(index)"> {{ item }}
        </li>
      </template>
    </ul>
  </div>
</template>
<script>
import SimpleStep from "./SimpleStep.vue";

export default {
  components: {SimpleStep},
  data: function () {
    return {
      selectedIndex: -1,
      optionen: [
        "Ich fülle dein Feedback Formular aus und der Fotograf darf zumindest ein Foto im Querformat von mir veröffentlichen (auf den veröffentlichten Fotos muss man dich nicht erkennen können)",
        "Der Fotograf darf alle Fotos aus dem Shooting auf seiner Webseite / Social Media / etc. veröffentlichen. (Ich möchte eine möglichst große Vielfalt an Fotos auf meiner Webseite herzeigen können)",
        "Ich  nehme ein kurzes Video auf, wo ich sagst wie mir das Shooting gefallen hat und wie ich mich davor, währenddessen und danach gefühlt habe (hier wird kein Foto veröffentlicht)",
        "Ich gebe den Fotografen großzügig Feedback zum Prozess vor / während und nach dem Shooting. Zusätzlich gibt es während des Shooting einen Teil, wo der Fotograf neues ausprobieren kann (bitte frag nach, was ich ausprobieren möchte)"
      ]
    }
  },
  methods: {
    onSelect: function (index) {
      if (this.selectedIndex === -1)
        this.$store.commit("plus")
      this.selectedIndex = index
    }
  },
  mounted() {
    this.$store.commit("addStep")
  },
  unmounted() {
    this.$store.commit("removeStep")
    if (this.selectedIndex >= 0)
      this.$store.commit("minus")
  },
  computed: {
    readOnlyMode: function () {
      return this.$store.state.readOnlyMode
    }
  }
}
</script>