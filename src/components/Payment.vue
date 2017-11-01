<template lang="pug">
  .fields
    .fields__content(@submit.prevent="")
      form.fields__inner(ref="fields", @submit.prevent="next()")
        input(type="text" placeholder="Email")
        input(type="text" placeholder="Card Number")
        .inputs__flex
          input(type="text" placeholder="MM/YY")
          input(type="text" placeholder="CVC")
        .encryption
          .encryption__icon: i.icon-lock
          .encryption__text This website uses 256-bit SSL encryption. Your info is safe.

        button(type="submit") Purchase
        button.btn--secondary(type="submit") Cancel
</template>

<script>
// import _ from 'lodash'
// import { mapGetters } from 'vuex'

export default {
  name: 'Payment',
  mounted () {
    this.setHeight()
  },
  updated () {
    this.setHeight()
  },
  methods: {
    setHeight () {
      this.$store.commit('SET_CHAT_OFFSET', this.height)
    },
    next () {
      this.$store.commit('CLOSE_ACTION')
      this.$store.commit('PUSH_MESSAGE', {
        author: 'user',
        text: 'Done',
        type: 'text'
      })
      this.$store.dispatch('next')
    }
  },
  computed: {
    height () {
      return this.$refs.fields.offsetHeight
    }
  }
}
</script>

<style lang="sass" scoped>
@import '../sass/vars'
$padding: 2rem
.fields
  width: 100%
  position: fixed
  bottom: -50vh
  z-index: 1000
  display: flex
  flex-direction: column
  animation: actionsIn
  animation-duration: 0.25s

  &__content
    background-color: #fff
    margin: 0 1rem
    padding: $padding $padding calc(50vh + #{$padding})
    border-radius: 1.5rem
    box-shadow: 0 0 35px rgba(0,0,0,0.2)

  input
    background-color: #F1F1F1
    border: 0
    outline: 0
    margin-bottom: 0.5rem
    width: 100%
    padding: 0.6rem 1.2rem
    border-radius: 6px

  button
    margin: 0 auto
    display: block
    width: auto
    background: linear-gradient(to bottom right, #00BAFF, #0084FF)
    outline: 0
    border: 0
    color: #fff
    padding: 0.7rem 1.6rem
    border-radius: 10rem
  
  .btn--secondary
    background: none
    color: rgba(0,0,0,0.5)
    font-size: 0.85rem
    padding: 0
    margin-top: 0.85rem

.encryption
  margin-top: 0.25rem
  margin-bottom: 0.75rem
  display: flex
  align-items: center
  opacity: 0.5
  &__icon
    font-size: 1rem
    margin-right: 0.5rem
  &__text
    font-size: 0.75rem

.inputs__flex
  display: flex
  input
    &:not(:last-child)
      margin-right: 0.5rem

@keyframes actionsIn
  0%
    opacity: 0
    transform: translateY(2rem)
  100%
    opacity: 1
    transform: translateY(0)

</style>
