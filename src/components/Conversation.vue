<template lang="pug">
  .conversation
    message(v-for="(m, index) in history", :message="m", key="index")
    .actions(v-if="action")
      .btn.btn--secondary Nope
      .btn.btn--primary Yes!
</template>

<script>
import axios from 'axios'
import Vue from 'vue'
import Message from '@/components/Message'

export default {
  name: 'Conversation',
  components: { Message },
  data () {
    return {
      history: [],
      data: {},
      action: null
    }
  },
  mounted () {
    axios.get('/static/marty.json', {
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(res => {
      this.data = res.data
      this.pushMessage(this.data.intro.messages, 0, 700)
    })
  },
  methods: {
    pushMessage (arr, index, timeout = 1800) {
      const message = arr[index]
      Vue.set(message, 'typing', true)
      console.log(message.text)
      this.history.push(message)
      setTimeout(() => {
        Vue.set(message, 'typing', false)
        console.log(message.text)
        if (arr[index + 1]) {
          setTimeout(() => {
            this.pushMessage(arr, index + 1)
          }, 400)
        } else {
          setTimeout(() => {
            this.action = 'intro'
          }, 400)
        }
      }, timeout)
    }
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
  height: calc(100vh - #{$contactBar-height}

.actions
  margin-top: auto
  display: flex
  justify-content: center
  width: 100%
  align-items: flex-start
  flex-direction: row
  padding-bottom: 1.5rem
  animation: actionsIn
  animation-duration: 0.75s

@keyframes actionsIn
  0%
    opacity: 0
    transform: translateY(2rem)
  100%
    opacity: 1
    transform: translateY(0)

.btn
  min-width: 6em
  height: 2.25em
  padding: 0 1.5em
  border-radius: 2em
  display: flex
  align-items: center
  justify-content: center
  font-size: 1.25rem
  line-height: 1
  &--secondary
    border: 1px solid rgba(0,0,0,0.2)
    font-weight: 400
    color: rgba(0,0,0,0.4)
  &--primary
    background-color: #50E3C2
    color: #fff
    font-weight: 600
  &:not(:last-of-type)
    margin-right: 1em
</style>
