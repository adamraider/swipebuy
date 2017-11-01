<template lang="pug">
  .conversation(ref="conversation", :class="{ 'conversation--action': chatActionable }", :style="conversationStyle")
    message(v-for="(m, index) in chatHistory", :message="m", key="index")
</template>

<script>
import Message from '@/components/Message'
import { mapGetters } from 'vuex'

export default {
  name: 'Conversation',
  components: { Message },
  computed: {
    conversationStyle () {
      const offset = this.chatActionable ? this.chatHeightOffset : 0
      return {
        // 1rem for spacing, 4rem for the contact bar
        paddingBottom: `calc(${offset}px + 5rem)`
      }
    },
    ...mapGetters([
      'chatActionable',
      'chatHistory',
      'chatHeightOffset'
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
  margin-top: 4rem
  padding-top: 1rem
  align-items: flex-start
  flex-direction: column
  transition: padding-bottom 0.25s ease
</style>
