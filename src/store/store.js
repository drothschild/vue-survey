import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    mode: 'newQuestion',
    questions: [],
    currentQuestion: {},
    answers: []
  },
  getters: {
    getQuestionById: state => id => {
      return state.questions.find(question => question.id === id)
    },
    getAnswersByQuestionId: state => questionId => {
      return state.answers.filter(answer => answer.questionId === questionId)
    }
  },
  mutations: {
    addQuestion (state, question) {
      const newQuestion = {
        id: state.questions.length + 1,
        text: question
      }
      state.questions.push(newQuestion)
      state.currentQuestion = newQuestion
    },
    addAnswer (state, answer) {
      const newAnswer = {
        id: state.answers.length,
        questionId: answer.questionId,
        text: answer.text
      }
      state.answers.push(newAnswer)
    },
    changeMode (state, mode) {
      state.mode = mode
    }
  }
})
