<template>
<div class="question-wrapper">
    <div class="header">Question {{ question.id }}</div>
  <div class="question-box">
     <span class="fixed-text">{{ question.text }}</span>
  </div>

  <div class="answers-list">
    <div class="header">Answers</div>
      <CreateAnswer v-bind:questionId=question.id />
          <div is="answer"
          v-for="answer in answers"
          v-bind:answer="answer"
          v-bind:key="answer.id"></div>
      </div>
  </div>
</template>

<script>
import CreateAnswer from './CreateAnswer';
import Answer from './Answer';
export default {
  data () {
    return {
      chevronDown: require('../assets/chevron-down.svg')
    };
  },
  components: {
    CreateAnswer,
    Answer
  },
  computed: {
    answers () {
      return this.$store.getters
        .getAnswersByQuestionId(this.question.id)
        .sort((a, b) => {
          return b.id - a.id;
        });
    }
  },
  props: ['question']
};
</script>

<style lang="sass">

  .answers-list
    display: flex
    align-self: flex-end
    flex-direction: column

</style>
