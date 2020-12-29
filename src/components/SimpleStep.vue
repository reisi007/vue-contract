<template>
  <div class="step">
    <VueMarkdownIt :source=html></VueMarkdownIt>
    <AcceptDecline></AcceptDecline>
  </div>
</template>
<script>
import VueMarkdownIt from 'vue3-markdown-it';
import AcceptDecline from "./AcceptDecline.vue";

export default {
  components: {
    VueMarkdownIt, AcceptDecline
  },
  props: {
    filename: String
  },
  data() {
    return {
      html: ''
    }
  },
  created() {
    const url = "/assets/" + this.filename + ".md";
    fetch(url)
        .catch(err => console.error("loading Markdown failed", err))
        .then(p => p.text())
        .then(p => this.html = p)
  }
}
</script>