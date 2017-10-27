<template lang="pug">
  #app
    //- ContactBar
    //- Conversation
    ProductDetail
</template>

<script>
import ContactBar from './components/ContactBar'
import Conversation from './components/Conversation'
import ProductDetail from './components/ProductDetail'

export default {
  name: 'app',
  components: {
    ContactBar,
    Conversation,
    ProductDetail
  }
}
</script>

<style lang="sass">
@import '../node_modules/normalize.css/normalize.css'
@import './sass/base'
</style>
