<template lang="pug">
  .fields(ref="fields")
    .fields__content
      .form__header
        .form__heading Address
      form.fields__inner(@submit.prevent="next()")
        .flex
          input.input(type="text"
                      v-validate="'required'", 
                      :class="{ 'input--error': errors.has('first_name') }", 
                      name="first_name" 
                      v-model="first_name" 
                      placeholder="First Name")
          
          input.input(type="text"
                      v-validate="'required'", 
                      :class="{ 'input--error': errors.has('last_name') }", 
                      name="last_name" 
                      v-model="last_name" 
                      placeholder="Last Name")

        .flex
          input.input(type="text"
                      v-validate="'required'", 
                      :class="{ 'input--error': errors.has('street_address') }", 
                      name="street_address" 
                      v-model="street_address" 
                      placeholder="Street Address")
         
          input.input.input--aptnum(type="text"
                      name="apt_num" 
                      v-model="apt_num" 
                      placeholder="Apt. #")
       
        .flex
          input.input(type="text"
                      v-validate="'required'", 
                      :class="{ 'input--error': errors.has('city') }", 
                      name="city" 
                      v-model="city" 
                      placeholder="City")
        .flex
          input.input(type="text"
                      v-validate="'required'", 
                      :class="{ 'input--error': errors.has('state') }", 
                      name="state" 
                      v-model="state" 
                      placeholder="State")
          
          input.input(type="text"
                      v-validate="'required'", 
                      :class="{ 'input--error': errors.has('postal_code') }", 
                      name="postal_code" 
                      pattern="[0-9]*"
                      v-model="postal_code" 
                      placeholder="Zip")
        .actions
          button.btn.btn--primary(type="submit") Done
</template>

<script>
export default {
  name: 'AddressForm',
  data () {
    return {
      first_name: null,
      last_name: null,
      street_address: null,
      apt_num: null,
      city: null,
      postal_code: null,
      state: null
    }
  },
  mounted () {
    this.setHeight()
  },
  updated () {
    this.setHeight()
  },
  methods: {
    setHeight () {
      this.$store.commit('SET_CHAT_OFFSET', this.height)
      this.$nextTick(() => window.scrollTo(0, 1000000))
    },
    next () {
      this.$validator.validateAll().then((result) => {
        if (result) {
          this.$store.commit('CLOSE_ACTION')
          this.$store.commit('PUSH_MESSAGE', {
            author: 'user',
            text: this.addressMessage,
            type: 'text'
          })
          this.$store.dispatch('next')
        } else {

        }
      })
    },
    cancel () {
      this.$store.commit('CLOSE_ACTION')
      this.$store.commit('PUSH_MESSAGE', {
        author: 'user',
        text: 'You suck',
        type: 'text'
      })
    }
  },
  computed: {
    height () {
      return this.$refs.fields.offsetHeight - (window.innerHeight / 2)
    },
    addressMessage () {
      return `${this.street_address} ${this.apt_num}, ${this.city}, ${this.state} ${this.postal_code}`
    }
  }
}
</script>

<style lang="sass" scoped>
@import '../sass/vars'
$padding: 2em

.fields
  width: 100%
  position: fixed
  bottom: -50vh
  z-index: 1000
  display: flex
  flex-direction: column
  animation: actionsIn
  animation-duration: 0.25s
  font-size: 0.9rem

  &__content
    background-color: #fff
    margin: 0 0.5em
    padding: $padding $padding calc(50vh + #{$padding * 1.25})
    border-radius: 1em
    box-shadow: 0 0 100px rgba(0,0,0,0.35)

.flex
  display: flex
  input:not(:last-child)
    margin-right: 0.5em

.input--aptnum
  width: 50%

.actions
  margin-top: 0.5rem

@keyframes actionsIn
  0%
    opacity: 0
    transform: translateY(2em)
  100%
    opacity: 1
    transform: translateY(0)

</style>
