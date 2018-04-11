<template>
  <div id="app">
    <Banner/>
    <div class="main" >
    <Instructions :headline="headline"/>
    <CreateQuestion v-if="mode==='newQuestion'"/>
    <EditQuestion v-else-if="mode==='editQuestion'"  v-bind:question="currentQuestion"/>
    <PreviewQuestion v-else-if="mode==='previewQuestion'"  v-bind:question="currentQuestion"/>
  </div>
  <div class= "button-row" v-if="mode!=='end'">
    <button class="add-question-button" v-on:click="restartMode">Add Question</button>
    <button v-bind:class="navButtonClass" v-on:click="changeMode">{{navButtonText}}</button>
    </div>
  </div>
</template>

<script>
import Instructions from './components/Instructions';
import Banner from './components/Banner';
import CreateQuestion from './components/CreateQuestion';
import PreviewQuestion from './components/PreviewQuestion';
import EditQuestion from './components/EditQuestion';

export default {
  name: 'App',
  components: {
    Banner,
    Instructions,
    CreateQuestion,
    EditQuestion,
    PreviewQuestion
  },
  mounted: function () {
    if (this.$store.state.questions.length === 0) {
      const newQuestion = localStorage.getItem('question');
      if (newQuestion) {
        this.$store.commit('addQuestion', newQuestion);
        const answer1 = localStorage.getItem('answer1');
        if (answer1) {
          this.$store.commit('addAnswer', {
            text: answer1,
            questionId: 1
          });
        }
        const answer2 = localStorage.getItem('answer2');
        if (answer2) {
          this.$store.commit('addAnswer', {
            text: answer2,
            questionId: 1
          });
        }
        localStorage.removeItem('question');
        localStorage.removeItem('answer1');
        localStorage.removeItem('answer2');
        this.$store.commit('changeMode', 'previewQuestion');
      }
    }
  },
  computed: {
    questions () {
      return this.$store.state.questions;
    },
    currentQuestion () {
      return this.$store.state.currentQuestion;
    },
    mode () {
      return this.$store.state.mode;
    },
    navButtonText () {
      switch (this.mode) {
        case 'newQuestion':
          return 'Done';
        case 'editQuestion':
          return 'Preview';
        case 'previewQuestion':
          return 'Submit';
      }
    },
    navButtonClass () {
      switch (this.mode) {
        case 'previewQuestion':
          return 'nav-button-preview';
        case 'end':
          return 'nav-button-end';
        default:
          return 'nav-button';
      }
    },
    headline () {
      switch (this.mode) {
        case 'newQuestion':
        case 'editQuestion':
          return "Welcome to Survey Squirrel. Let's build a survey!";
        case 'previewQuestion':
          return 'Review Survey';
        case 'end':
          return 'Your survey has been created!';
      }
    }
  },
  methods: {
    changeMode: function () {
      switch (this.mode) {
        case 'editQuestion':
          this.$store.commit('changeMode', 'previewQuestion');
          break;
        case 'newQuestion':
        case 'previewQuestion':
          this.$store.commit('changeMode', 'end');
      }
    },
    restartMode: function () {
      this.$store.commit('changeMode', 'newQuestion');
    }
  }
};
</script>

<style lang="sass">

body
  font-family: 'Roboto'

button
  background-color: #f2f2f2
  border: 1px solid #808080
  border-radius: 2px
  height: 40px
  min-width: 125px
  color: #3f3f3f
  font-size: 14px
  font-weight: 500
  line-height: 17px

.header
  color: #808080
  font-size: 22px
  font-weight: 500
  letter-spacing: -0.57px
  line-height: 62px
  height: 62px
  text-align: left
  padding: 0px 0px 0px 4px

.main
  display: flex
  margin: 138px 0px 0px 0px
  flex-direction: column
  min-height: 100vh
  align-items: center

.button-row
  text-align: right
  margin: 45px 0px 33px 0px

.input-button
  margin: 0 0 0 25px

.add-question-button
  margin-right: 15px
  border: 1px solid #9B9B9B

.nav-button
  background-color: #009BAB
  color: #FFFFFF
  border: 1px solid #007480

.nav-button-preview
  background-color: #4A90E2
  color: #FFFFFF
  border: 1px solid #4A90E2

.nav-button-end
  background-color: #009BAB
  border: 1px solid #007480
  border-radius: 2px
  width: 249px

.question-wrapper
  margin-top: 33px
  display: flex
  flex-direction: column

.question-box
  background-color: #ffffff
  border: 1px solid #979797
  border-radius: 4px
  width: 735px
  height: 60px
  padding: 0px 0px 0px 23px

.answer-box
  border: 1px solid #979797
  border-radius: 4px
  width: 353px
  height: 60px
  padding: 0px 0px 0px 11px
  margin: 0px 0px 22px 0px

%form-text-shared
  font-size: 22px
  font-weight: 300
  letter-spacing: -0.57px
  line-height: 62px
  text-align: left

.input-text
  @extend %form-text-shared
  color: #808080

.fixed-text
  @extend %form-text-shared
  color: #3f3f3f

</style>
