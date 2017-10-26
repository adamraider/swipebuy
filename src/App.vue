<template lang="pug">
  #app
    ContactBar
    Conversation
</template>

<script>
import ContactBar from './components/ContactBar'
import Conversation from './components/Conversation'

export default {
  name: 'app',
  components: {
    ContactBar,
    Conversation
  }
}
</script>

<style lang="sass">
@import '../node_modules/normalize.css/normalize.css'
@import './sass/base'
</style>
