<template lang="pug">
  .conversation(ref="conversation", :class="{ 'conversation--action': chatActionable }")
    message(v-for="(m, index) in chatHistory", :message="m", key="index")
</template>

<script>
import Message from '@/components/Message'
import _ from 'lodash'
import { mapGetters } from 'vuex'

export default {
  name: 'Conversation',
  components: { Message },
  methods: {
    next (e) {
      this.$store.commit('CLOSE_ACTION')
      this.$store.commit('PUSH_MESSAGE', {
        author: 'user',
        text: 'Yea!',
        type: 'text'
      })
      const classList = e.target.classList
      classList.add('btn--clicked')
      setTimeout(() => {
        this.$store.dispatch('renderPhrase', {
          arr: _.cloneDeep(this.$store.state.merchant.address.messages),
          index: 0,
          timeout: process.env.PHRASE_TIMEOUT
        })
      }, process.env.PHRASE_TIMEOUT)
    }
  },
  watch: {
    chatHistory: {
      handler: _.debounce(function (history) {
        const yOffset = this.$refs.conversation.offsetHeight
        window.scrollTo(0, yOffset)
      }, 10),
      deep: true
    }
  },
  computed: {
    ...mapGetters([
      'chatActionable',
      'chatHistory',
      'availableActions',
      'typing'
    ])
  }
}
</script>

<style lang="sass" scoped>
@import '../sass/vars'

.conversation
  background-color: #fff
  display: flex
  flex-direction: column
  padding-top: 1rem
  align-items: flex-start
  flex-direction: column
  min-height: calc(100vh - #{$contactBar-height})
  &--action
    padding-bottom: calc(94px + 1rem)
</style>
