<template lang="pug">
  .actions(ref="fields")
    .btn(v-for="action in availableActions", @click="next($event)", :class="{ 'btn--primary': action.type === 'primary', 'btn--secondary': action.type === 'secondary' }") {{ action.text }}
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Action',
  data () {
    return {
      syncHeight: true
    }
  },
  methods: {
    next (e) {
      const classList = e.target.classList
      classList.add('btn--clicked')
      this.$store.commit('CLOSE_ACTION')
      this.$store.commit('PUSH_MESSAGE', {
        author: 'user',
        text: 'Yea!',
        type: 'text'
      })
      this.$store.dispatch('next')
    },
    setHeight () {
      this.$store.dispatch('animateChatOffset', { offsetHeight: this.height })
    }
  },
  mounted () {
    this.setHeight()
  },
  updated () {
    if (this.syncHeight) {
      this.setHeight()
    }
  },
  computed: {
    height () {
      return this.$refs.fields.offsetHeight
    },
    ...mapGetters([
      'chatActionable',
      'availableActions'
    ])
  }
}
</script>

<style lang="sass" scoped>
@import '../sass/vars'

.actions
  margin-top: auto
  display: flex
  justify-content: center
  width: 100%
  align-items: flex-start
  flex-direction: row
  padding: 2rem
  position: fixed
  bottom: 0
  z-index: 10

@keyframes actionsIn
  0%
    opacity: 0
    transform: translateY(2rem)
  100%
    opacity: 1
    transform: translateY(0)

@for $i from 1 through 10
  .btn:nth-child(#{$i})
    animation-delay:(#{$i*0.15s-0.1s})

.btn
  width: 100%
  height: 2.25em
  padding: 0 1.5em 0.1em
  border-radius: 0.35em
  display: flex
  align-items: center
  justify-content: center
  font-size: 1.25rem
  line-height: 1
  position: relative
  margin: 0
  animation: actionsIn
  animation-duration: 0.5s
  animation-fill-mode: forwards
  opacity: 0
  box-shadow: 0 1px 1px rgba(0,0,0,0.25)
  
  &::after
    position: absolute
    top: 0
    left: 0
    right: 0
    bottom: 0
    content: ''
    border-style: solid
    border-width: 2px
    border-radius: 0.35em
    transform: scale(1)
    display: none

  &--secondary
    background-color: rgba(0,0,0,0.075)
    color: #8d8d8d
    &::after
      border-color: rgba(0,0,0,0.3)
  
  &--primary
    background-color: #321bf3
    color: #fff
    font-weight: 600
    &::after
      border-color: #321bf3

  &--clicked
    &::after
      display: block
      animation: btnClicked
      animation-duration: 1s
      animation-fill-mode: forwards

  &:not(:last-of-type)
    margin-right: 1em

@keyframes btnClicked
  0%
    transform: scale(1, 1)
    opacity: 1
  75%
    opacity: 0
  100%
    transform: scale(1.1, 1.4)
    opacity: 0
</style>
