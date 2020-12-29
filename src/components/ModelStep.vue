<template>
  <div class="step">
    <h2>Deine Daten</h2>
    <form ref="form" v-bind:class="{touched: dirty}">
      <div>
        <label for="name">
          Dein Name:
        </label>
        <input v-if="!readOnlyMode" v-model="name" v-on:change="onChange" type="text" pattern="\S+\s.+" name="name"
               id="name"
               required>
        <span v-else>{{ name }}</span>
      </div>
      <div>
        <label for="geburtstag">
          Dein Geburtstag:
        </label>
        <input v-if="!readOnlyMode" class="w-3/4" v-model="birthday" v-on:change="onChange" v-bind:max="maxDate"
               type="date"
               name="geburtstag"
               id="geburtstag"
               required>
        <span v-else class="light">{{ birthday }}</span>
        <div class="w-1/4 inline-block pl-4">
          Dein Alter: {{ age }} Jahre
        </div>
      </div>
      <div>
        <label for="email">
          Deine E-Mail Adresse
        </label>
        <input v-if="!readOnlyMode" v-model="email" v-on:change="changeEmail" type="email" name="email" id="email"
               required placeholder="meine@email.com">
        <span v-else>{{ email }}</span>
      </div>
    </form>
    <div class="fail text-center m-2 p-2 text-2xl" v-if="dirty &&!formValid">Bitte korrigiere deine Daten</div>
    <div>

    </div>
  </div>
</template>
<script>
export default {
  data: function () {
    return {
      formValid: false,
      dirty: false,
      birthday: '',
      email: '',
      name: ''
    }
  },
  methods: {
    changeEmail() {
      this.$store.commit('changeEMail', this.email);
      this.onChange();
    },
    onChange() {
      const formValidityBefore = this.formValid
      const newFormValidity = this.formValidity();
      if (formValidityBefore !== newFormValidity) {
        this.formValid = newFormValidity;
        if (newFormValidity) {
          this.$store.commit('plus')
        } else {
          this.$store.commit('minus')
        }
      }
    },
    formValidity() {
      const form = this.$refs.form;
      this.dirty = true;
      return form.checkValidity()
    }
  },
  computed: {
    maxDate() {
      const date = new Date();
      return date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + (date.getUTCDate() - 1);
    },
    age() {
      const now = new Date();
      const parts = this.birthday.split('-')
      const bday = new Date(parseInt(parts[0], 10),
          parseInt(parts[1], 10) - 1,
          parseInt(parts[2], 10));

      const dateExact = (now - bday) / (1000 * 60 * 60 * 24 * 365.249)
      return Math.round(dateExact * 100) / 100
    },
    readOnlyMode: function () {
      return this.$store.state.readOnlyMode
    }
  }
}
</script>