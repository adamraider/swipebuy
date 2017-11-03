<template lang="pug">
  #app
    template(v-if="loading")
      span loading
    template(v-else)
      ContactBar(:brandName="brandName", :brandImage="brandImage")
      Conversation
      ProductDetail(v-if="productDetailOpen", :itemName="itemName", :itemImage="itemImage", :itemDescription="itemDescription", :itemPrice="itemPrice")
      Action(v-if="showAction")
      Fields(v-if="showAddress")
      Payment(v-if="showPayment")

</template>

<script>
import { marty } from './api'
import { mapGetters } from 'vuex'

import ContactBar from './components/ContactBar'
import Conversation from './components/Conversation'
import ProductDetail from './components/ProductDetail'
import Action from './components/Action'
import Fields from './components/Fields'
import Payment from './components/Payment'

export default {
  name: 'app',
  components: {
    ContactBar,
    Conversation,
    ProductDetail,
    Action,
    Fields,
    Payment
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
    showAction () {
      return this.chatActionable && !this.productDetailOpen && this.actionStep === 'buy'
    },
    showAddress () {
      return this.chatActionable && !this.productDetailOpen && this.actionStep === 'address'
    },
    showPayment () {
      return this.chatActionable && !this.productDetailOpen && this.actionStep === 'payment'
    },
    ...mapGetters([
      'actionStep',
      'chatActionable',
      'productDetailOpen',
      'brandName',
      'brandImage',
      'itemName',
      'itemImage',
      'itemPrice',
      'itemDescription',
      'loading'
    ])
  }
}
</script>

<style lang="sass">
@import './sass/vars'
@import '../node_modules/normalize.css/normalize.css'
@import './sass/fonts'
@import './sass/base'
@import './sass/forms'
@import './assets/icomoon/variables'
@import './assets/icomoon/style'
</style>
