<template lang="pug">
  .conversation(ref="conversation", :class="{ 'conversation--action': chatActionable }", :style="{ paddingBottom: `calc(${offset}px + 1rem)` }")
    message(v-for="(m, index) in chatHistory", :message="m", key="index")
</template>

<script>
import Message from '@/components/Message'
import { mapGetters } from 'vuex'

export default {
  name: 'Conversation',
  components: { Message },
  computed: {
    offset () {
      return this.chatActionable ? this.chatHeightOffset : 0
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
  padding-bottom: 1rem
  align-items: flex-start
  flex-direction: column
</style>
