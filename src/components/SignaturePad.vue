<template>
  <div class="mx-auto max-w-full">
    <template v-if="svgUrl == null">
      <canvas class="mx-auto border-black border-solid border-2" v-on:resize="recreateSignaturPad"
              v-bind:width="width"
              v-bind:height="height"
              ref="signaturCanvas"></canvas>


      <div class="button-bar">
        <button class="signature-button" v-on:click="storeSignature">Unterschrift speichern</button>
        <button v-on:click="clearSignature">Unterschrift löschen</button>
      </div>
    </template>
    <template v-else>
      <h2 class="text-center">Unterschrift</h2>
      <img class="mx-auto" v-bind:src="svgUrl" v-bind:width="width" v-bind:height="height" alt="Unterschrift">
    </template>
  </div>
</template>
<script>
import SignaturePad from "signature_pad";

let signaturPad = null;

export default {
  props: {
    width: Number,
    height: Number
  },
  data: function () {
    return {
      svgUrl: null
    }
  },
  methods: {
    storeSignature: function () {
      this.svgUrl = signaturPad.toDataURL()
      this.$emit("signed")
    },
    clearSignature: function () {
      signaturPad.clear();
    },
    recreateSignaturPad: function () {
      const signaturCanvas = this.$refs.signaturCanvas;
      let data = null;
      if (signaturPad != null) {
        data = signaturPad.toData();
        signaturPad.off();
      }
      signaturPad = new SignaturePad(signaturCanvas)
      if (data) {
        signaturPad.fromData(data)
      }
      drawCanvasBackground(signaturCanvas)
    }
  },
  mounted() {
    this.recreateSignaturPad()
  }
}


function drawCanvasBackground(signaturCanvas) {
  // Add background text
  const canvasContext = signaturCanvas.getContext('2d');
  const textHeightPx = 10;
  canvasContext.font = textHeightPx + 'px Arial';
  canvasContext.globalCompositeOperation = 'destination-over';
  canvasContext.strokeStyle = '#b2b2b2';
  canvasContext.fillStyle = '#d3d3d3';

  const canvasText = 'Reisishot ' + new Date().toLocaleString()
  const canvasTextMetrics = canvasContext.measureText(canvasText);
  for (let y = 0; y - textHeightPx < signaturCanvas.height; y += 4 + textHeightPx) {
    for (let x = -20 * y; x - canvasTextMetrics.width < signaturCanvas.width; x += 12 + canvasTextMetrics.width) {
      canvasContext.strokeText(canvasText, x, y);
    }
  }
  canvasContext.fillStyle = 'black';
  canvasContext.globalCompositeOperation = 'source-over';
}
</script>