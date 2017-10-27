<template lang="pug">
  .contact
    .brand
      .brand__image
      .brand__name Marty McFly
</template>

<script>
export default {
  name: 'ContactBar',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  }
}
</script>

<style lang="sass" scoped>
@import '../sass/vars'

.contact
  width: 100%
  height: $contactBar-height
  display: flex
  background-color: #F9F9F9
  border-bottom: 1px solid #D9D9D9
  font-size: 1rem

.brand
  margin: 0 auto
  display: flex
  flex-direction: column
  align-items: center
  padding: 0.25rem 0
  &__image
    width: 2.5rem
    height: 2.5rem
    border-radius: 3rem
    background-image: url(../assets/marty.png)
    background-size: cover
    margin-bottom: 0.15rem  
  &__name
    font-size: 0.75em

</style>
