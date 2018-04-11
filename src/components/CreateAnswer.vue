<template>
<div class="answer">
    <input v-model="newAnswer"
        class="answer-box input-text"
        placeholder="Type answer here."/>
        <button class='input-button' v-on:click="addAnswer">Add Another Answer</button>
</div>
</template>

<script>
export default {
  props: ['questionId'],
  data () {
    return {
      newAnswer: ''
    };
  },
  methods: {
    addAnswer () {
      this.$store.commit('addAnswer', {
        questionId: this.questionId,
        text: this.newAnswer
      });
      if (localStorage.getItem('answer1')) {
        localStorage.setItem('answer2', localStorage.getItem('answer1'));
      }
      localStorage.setItem('answer1', this.newAnswer);
      this.newAnswer = '';
    }
  }
};
</script>

<style>

</style>
