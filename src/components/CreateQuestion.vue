<template>
    <div class="create-question">
        <div class="header">What’s your question?</div>
        <input v-model="newQuestion"
            class="question-box input-text"
            placeholder="Type question here."
            />
        <button class='input-button' v-on:click="addQuestion">Save Question</button>
    </div>
</template>

<script>
export default {
  data () {
    return {
      newQuestion: ''
    };
  },
  methods: {
    addQuestion () {
      this.$store.commit('addQuestion', this.newQuestion);
      localStorage.setItem('question', this.newQuestion);
      this.newQuestion = '';
      this.$store.commit('changeMode', 'editQuestion');
    }
  }
};
</script>

<style lang="sass">
.create-question
  margin-top: 33px
</style>
