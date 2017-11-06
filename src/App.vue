<template lang="pug">
  #app(:class="{ 'app--scrollLocked': productDetailOpen }")
    .loading(v-if="loading")
    template(v-else)
      ContactBar(:brandName="brandName", :brandImage="brandImage")
      Conversation
      ProductDetail(v-if="productDetailOpen", :itemName="itemName", :itemImages="itemImages", :itemDescription="itemDescription", :itemPrice="itemPrice")
      Action(v-if="showAction")
      AddressForm(v-if="showAddress")
      Payment(v-if="showPayment")

</template>

<script>
import { marty } from './api'
import { mapGetters } from 'vuex'

import ContactBar from './components/ContactBar'
import Conversation from './components/Conversation'
import ProductDetail from './components/ProductDetail'
import Action from './components/Action'
import AddressForm from './components/AddressForm'
import Payment from './components/Payment'

export default {
  name: 'app',
  components: {
    ContactBar,
    Conversation,
    ProductDetail,
    Action,
    AddressForm,
    Payment
  },
  data () {
    return {
      marty: null
    }
  },
  mounted () {
    marty().then(marty => {
      setTimeout(() => {
        this.$store.dispatch('setupMerchant', { merchant: marty })
      }, 0)
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
      'itemImages',
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
@import '../node_modules/flickity/dist/flickity.min.css'

.app--scrollLocked
  max-height: 100vh
  overflow: hidden

.loading
  width: 100%
  height: 100vh
  display: flex
  align-items: center
  justify-content: center
</style>
