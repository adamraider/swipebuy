<template lang="pug">
  .conversation
    .message(v-for="m in messages" v-class="{ 'message--brand': true }")
      span {{ m.text }}
    .message.message--brand Hey it's Marty
    .message.message--brand I’m selling my limited edition hoverboards. Want one?
    .message.message--user yo wazzup
    .message.message--brand.message--link
      .message__graphic
        .message__graphic__text Hoverboard 2.0
        .message__graphic__image
        .message__graphic__overlay
      .message__details Details
    //- .message.message--brand.message--typing #[.dot] #[.dot] #[.dot]
</template>

<script>
import axios from 'axios'

export default {
  name: 'Conversation',
  data () {
    return {
      messages: []
    }
  },
  mounted () {
    axios.get('/static/marty.json').then(res => {
      console.log(res)
    })
  }
}
</script>

<style lang="sass" scoped>
.conversation
  background-color: #fff
  display: flex
  flex-direction: column
  margin-top: 1rem
  align-items: flex-start

.message
  background-color: #eae9ea
  width: auto
  font-size: 1rem
  padding: 0.6rem 1.15rem
  border-radius: 1.2rem
  margin-left: 1rem
  margin-right: 1rem
  color: #2E2E2E
  min-height: 1rem
  max-width: 15rem
  overflow: hidden
  position: relative
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
    animation: popin
    animation-duration: 0.2s
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
  80%
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
