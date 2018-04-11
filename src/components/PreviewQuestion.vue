<template>
<div class="question-wrapper">
    <div class="header"> {{ headerText }}</div>
  <div class="question-box">
     <span class="fixed-text">{{ questionBoxText }}</span>

     <img :src="chevronDown" viewBox="0 0 26 17" class="field-button" @click="expandAnswers = !expandAnswers"/>
  </div>

  <div class="answers-menu" v-if="expandAnswers"  >
          <div v-for="answer in answers"
          is="PreviewAnswer"
          :answer="answer"
          :clickEvent="selectAnswer"
          :key="answer.id"
          ></div>
      </div>
  </div>
</template>

<script>
import CreateAnswer from './CreateAnswer';
import PreviewAnswer from './PreviewAnswer';
export default {
  data () {
    return {
      chevronDown: require('../assets/chevron-down.svg'),
      expandAnswers: false,
      headerText: `Question ${this.question.id}`,
      questionBoxText: this.question.text
    };
  },
  components: {
    CreateAnswer,
    PreviewAnswer
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
  methods: {
    selectAnswer: function (text) {
      this.questionBoxText = text;
      this.headerText = this.question.text;
    }
  },
  props: ['question']
};
</script>

<style lang="sass">
  .answers-menu
    display: flex
    align-self: flex-end
    flex-direction: column

  .field-button
    width: 26px
    float: right
    margin: 17px 30px 0px 0px
    display: block
</style>
