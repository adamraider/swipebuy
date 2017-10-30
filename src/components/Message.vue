<template lang="pug">
  .message(:class="classes")
    template(v-if="typing") #[.dot] #[.dot] #[.dot]
    template(v-else)
      template(v-if="message.type === 'text'")
        span {{ message.text }}
      template(v-if="message.type === 'graphic'")
        .message__graphic(@click="openProductDetail()")
          .message__graphic__text {{ message.text }}
          .message__graphic__image
          .message__graphic__overlay
        .message__details(@click="openProductDetail()") Details
</template>

<script>
export default {
  name: 'Message',
  props: {
    message: {
      required: true,
      type: Object
    }
  },
  methods: {
    openProductDetail () {
      this.$store.commit('OPEN_PRODUCT_DETAIL')
    }
  },
  computed: {
    typing () {
      return this.message.typing
    },
    classes () {
      return {
        'message--brand': this.message.author === 'brand',
        'message--user': this.message.author === 'user',
        'message--link': this.message.type === 'graphic' && !this.typing,
        'message--typing': this.typing
      }
    }
  }
}
</script>

<style lang="sass" scoped>
.message
  background-color: #F1F0F0
  width: auto
  font-size: 1rem
  padding: 0.5rem 1.15rem
  line-height: 1.4
  border-radius: 1.2rem
  margin-left: 1rem
  margin-right: 1rem
  color: #2E2E2E
  min-height: 2.25rem
  max-width: 17rem
  overflow: hidden
  position: relative
  animation: popin
  animation-duration: 0.2s
  animation-timing-function: cubic-bezier(.0,.0,.83,.67)
  &--brand
    transform-origin: left
  
  &--user
    margin-left: auto
    background: linear-gradient(to bottom right, #00BAFF, #0084FF)
    color: #fff
  
  &--typing
    display: flex
    align-items: center
    justify-content: center
    .dot
      width: 0.5rem
      height: 0.5rem
      animation: typing
      animation-duration: 1s
      animation-iteration-count: infinite
      background-color: #EBEBED
      border-radius: 1rem
      display: block
      &:nth-of-type(1)
        animation-delay: -1s
      &:nth-of-type(2)
        animation-delay: -0.3333s
      &:nth-of-type(3)
        animation-delay: -0.6666s
      &:not(:last-child)
        margin-right: 0.2rem

  &--link
    padding: 0
    width: 100%
  
  &__graphic
    width: 100%
    height: 9rem
    position: relative
    display: flex
    align-items: flex-end

    &__image
      position: absolute
      top: 0
      left: 0
      right: 0
      bottom: 0
      width: 100%
      height: 100%
      background-image: url(../assets/hoverboard.png)
      background-size: cover
      background-position: center
      z-index: 1

    &__overlay
      position: absolute
      z-index: 2
      top: 0
      left: 0
      right: 0
      bottom: 0
      background: linear-gradient(to bottom, rgba(0,0,0,0), rgba(0,0,0,0.5))

    &__text
      position: relative
      z-index: 5
      font-weight: 500
      color: #fff
      padding: 0.5rem 1rem
      font-size: 0.85em

  &__details
    text-align: center
    padding: 0.5rem 1rem
    font-weight: 500
    border-color: #BBBBBB
    border-style: solid
    border-top: 0
    border-left-width: 1px
    border-right-width: 1px
    border-bottom-width: 1px
    background-color: #fff
    border-bottom-left-radius: 1.2rem
    border-bottom-right-radius: 1.2rem

  &:not(:last-of-type)
    margin-bottom: 0.6rem

@keyframes popin
  0%
    transform: scale(0)
  85%
    transform: scale(1.1)
  100%
    transform: scale(1)

@keyframes typing
  0%
    background-color: #C3C3C5
  50%
    background-color: #A6A6A9
  100%
    background-color: #C3C3C5
</style>
