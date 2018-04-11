<template>
  <div class="answer-menu-item" @click="parentSelectAnswer(answer.text)">
      <span class="fixed-text">{{answer.text}}</span>
  </div>
</template>

<script>
export default {
  props: ['answer', 'clickEvent'],
  computed: {
    mode () {
      return this.$store.state.mode;
    },
    answerClass () {
      switch (this.mode) {
        case 'editQuestion':
          return 'answer-box';
        case 'previewQuestion':
          return 'answer-menu-item';
      }
    }
  },
  methods: {
    parentSelectAnswer (text) {
      this.clickEvent(text);
    }
  }
};
</script>

<style lang="sass">
  .answer-menu-item
    border: 1px solid #979797
    width: 686px
    height: 60px
    padding: 0px 0px 0px 22px
    align-self: flex-end
    margin-top: -1px;
</style>
