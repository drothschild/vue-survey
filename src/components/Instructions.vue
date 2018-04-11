<template>
    <div v-bind:class="instructionsClass">
      <div>
          <span class="instructions-text">
            {{ headline }}
            <div>
            <button
              v-if="mode==='end'"
              v-on:click="startOver"
              class="instructions-button">
              Start Another Survey
          </button>
        </div>
         </span>
       </div>
    </div>
</template>

<script>
export default {
  props: ['headline'],
  computed: {
    mode () {
      return this.$store.state.mode;
    },
    instructionsClass () {
      switch (this.mode) {
        case 'end':
          return 'instructions-end';
        default:
          return 'instructions';
      }
    }
  },
  methods: {
    startOver: function () {
      this.$store.commit('changeMode', 'newQuestion');
    }
  }
};
</script>

<style lang="sass">
  .instructions
    border: 1px solid #979797
    width: 1007px
    height: 137px
    display: flex
    align-items: center
    justify-content: center

  .instructions-end
    border: 1px solid #979797
    width: 1007px
    height: 267px
    display: flex
    flex-direction: column
    justify-content: center
    align-items: center

  .instructions-button
    background-color: #009bab
    border: 1px solid #007480
    border-radius: 2px
    width: 249px
    height: 40px
    color: #FFFFFF
    margin-top: 72px

  .instructions-text
    color: #3f3f3f
    font-size: 42px
    font-family: "Roboto"
    font-weight: 300
    letter-spacing: -0.85px
    line-height: 62px
    text-align: center
</style>
