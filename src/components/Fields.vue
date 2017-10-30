<template lang="pug">
  .fields
    form.fields__content(@submit.prevent="")
      input(type="text" placeholder="Street Address")
      input(type="text" placeholder="Apartment #")
      input(type="text" placeholder="State")
      input(type="text" placeholder="City")
      button(type="submit") Done
      //- button(type="submit") Cancel
</template>

<script>
// import _ from 'lodash'
// import { mapGetters } from 'vuex'

export default {
  name: 'Fields'
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
    border-radius: 10px

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

</style>
