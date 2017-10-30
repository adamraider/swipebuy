<template lang="pug">
  #app
    ContactBar
    Conversation
    ProductDetail(v-if="productDetailOpen")
    Action(v-if="chatActionable && !productDetailOpen")
    Fields
</template>

<script>
import { marty } from './api'
import { mapGetters } from 'vuex'

import ContactBar from './components/ContactBar'
import Conversation from './components/Conversation'
import ProductDetail from './components/ProductDetail'
import Action from './components/Action'
import Fields from './components/Fields'

export default {
  name: 'app',
  components: {
    ContactBar,
    Conversation,
    ProductDetail,
    Action,
    Fields
  },
  data () {
    return {
      marty: null
    }
  },
  mounted () {
    marty().then(marty => {
      this.$store.dispatch('setupMerchant', { merchant: marty })
    })
  },
  computed: {
    ...mapGetters([
      'chatActionable',
      'productDetailOpen'
    ])
  }
}
</script>

<style lang="sass">
@import '../node_modules/normalize.css/normalize.css'
@import './sass/base'
</style>
