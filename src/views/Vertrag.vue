<template>
  <main v-if="!mailSent">
    <div id="steps">

      <SimpleStep filename="1"></SimpleStep>
      <ModelStep></ModelStep>
      <SimpleStep filename="2"></SimpleStep>
      <SimpleStep filename="3"></SimpleStep>
      <SimpleStep filename="4"></SimpleStep>
      <SimpleStep filename="5"></SimpleStep>
      <SimpleStep filename="6"></SimpleStep>
      <SimpleStep filename="7"></SimpleStep>
    </div>

    <div class="state"> Bisher wurden {{ acceptedSteps }} von {{ steps }} Teilen akzeptiert.</div>

    <button v-if="!signed && !signRequested" class="button-primary-large" v-on:click="signContract"
            :disabled=" acceptedSteps < steps">
      Vertrag jetzt unterschreiben
    </button>
    <SignaturePad class="mt-8" v-if="signRequested || signed" :width=500 :height=300
                  v-on:signed="signed=true"></SignaturePad>

    <button v-if="signRequested" class="button-primary-large" v-on:click="sendContract" :disabled="!signed">
      Vertrag absenden
    </button>
    <p class="faint text-center pb-2">
      Eine Kopie wird an <i>{{ email }}</i> gesendet!
    </p>
  </main>
  <main class="h-full" v-if="mailSent">
    <div class="mail-sent">
      <p>
        Der Vertrag wurde als E-Mail an dich versandt!
      </p>
      <p>
        Bitte kontrolliere deinen Posteingang. Deine E-Mail wurde versendet.
      </p>
      <p class="strong">
        Von deiner Seite ist alles erledigt
      </p>
    </div>
  </main>
</template>
<script>
import SimpleStep from "../components/SimpleStep.vue";
import ModelStep from "../components/ModelStep.vue";
import SignaturePad from "../components/SignaturePad.vue";

export default {
  components: {SignaturePad, ModelStep, SimpleStep},
  data: function () {
    return {
      steps: 8,
      signRequested: false,
      signed: false,
      mailSent: false
    }
  },
  methods: {
    sendContract: function () {
      this.$forceUpdate();

      const textToSend = document.body.innerHTML

      const host = "https://api.reisishot.pictures/send_contract.php"

      const data = {
        text: textToSend,
        mail: this.email
      };
      console.log("Sending", data, "to", host)

      const request = new XMLHttpRequest()
      request.open("POST", host, true);
      request.setRequestHeader("Content-Type", "application/json");
      request.onreadystatechange = () => {
        if (request.readyState === 4 && request.status === 204) {
          this.mailSent = true

        }
      };
      window.scrollTo({top: 0, behavior: 'smooth'});
      request.send(JSON.stringify(data))
    },
    signContract: function () {
      this.$store.commit("enforceReadOnly")
      this.signRequested = true;
    }
  },
  computed: {
    acceptedSteps: function () {
      return this.$store.state.acceptedSteps;
    },
    email: function () {
      return this.$store.state.email
    }
  }
}
</script>