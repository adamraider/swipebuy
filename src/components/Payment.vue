<template lang="pug">
  .fields(ref="fields")
    .fields__content
      .example.example3
        .form__header
          .form__heading Payment
        form.fields__inner(@submit.prevent="next()")
          .fieldset
            #card-number.field.empty
            #card-expiry.field.empty.half-width
            #card-cvc.field.empty.half-width
          .encryption
            .encryption__icon: i.icon-lock
            .encryption__text This website uses 256-bit SSL encryption. Your info is safe.

          .error(v-if="errorMessage")
            .message {{ errorMessage }}

          button.btn.btn--primary(type="submit") Pay $1,319
</template>

<script>
import Stripe from 'Stripe'

export default {
  name: 'Payment',
  data () {
    return {
      errorMessage: null
    }
  },
  mounted () {
    const self = this
    const stripe = Stripe(process.env.STRIPE_PUBLIC_KEY)

    const elements = stripe.elements({
      fonts: [
        { cssSrc: 'https://fonts.googleapis.com/css?family=Titillium+Web' }
      ]
    })

    const elementStyles = {
      base: {
        fontWeight: 400,
        fontFamily: ', -apple-system, BlinkMacSystemFont, Avenir, Proxima Nova, Open Sans, Segoe UI, Helvetica, sans-serif',
        fontSize: '16px',
        fontSmoothing: 'antialiased',

        ':focus': {
          color: '#2c3e50'
        },

        '::placeholder': {
          color: '#959595'
        },

        ':focus::placeholder': {
          color: '#959595'
        }
      },
      invalid: {
        color: '#ff2a34',
        ':focus': {
          color: '#ff2a34'
        },
        '::placeholder': {
          color: '#2c3e50'
        }
      }
    }

    const elementClasses = {
      focus: 'focus',
      empty: 'empty',
      invalid: 'invalid'
    }

    const cardNumber = elements.create('cardNumber', {
      style: elementStyles,
      classes: elementClasses
    })
    cardNumber.mount('#card-number')

    const cardExpiry = elements.create('cardExpiry', {
      style: elementStyles,
      classes: elementClasses
    })
    cardExpiry.mount('#card-expiry')

    const cardCvc = elements.create('cardCvc', {
      style: elementStyles,
      classes: elementClasses
    })
    cardCvc.mount('#card-cvc')

    function registerElements (elements, exampleName) {
      const formClass = '.' + exampleName
      const example = document.querySelector(formClass)

      const form = example.querySelector('form')

      function enableInputs () {
        Array.prototype.forEach.call(
          form.querySelectorAll(
            "input[type='text'], input[type='email'], input[type='tel']"
          ),
          function (input) {
            input.removeAttribute('disabled')
          }
        )
      }

      function disableInputs () {
        Array.prototype.forEach.call(
          form.querySelectorAll(
            "input[type='text'], input[type='email'], input[type='tel']"
          ),
          function (input) {
            input.setAttribute('disabled', 'true')
          }
        )
      }

      // Listen for errors from each Element, and show error messages in the UI.
      elements.forEach((element) => {
        element.on('change', (event) => {
          if (event.error) {
            self.errorMessage = event.error.message
          } else {
            self.errorMessage = null
          }
        })
      })

      // Listen on the form's 'submit' handler...
      form.addEventListener('submit', function (e) {
        e.preventDefault()

        // Show a loading screen...
        example.classList.add('submitting')

        // Disable all inputs.
        disableInputs()

        // Gather additional customer data we may have collected in our form.
        var name = form.querySelector('#' + exampleName + '-name')
        var address1 = form.querySelector('#' + exampleName + '-address')
        var city = form.querySelector('#' + exampleName + '-city')
        var state = form.querySelector('#' + exampleName + '-state')
        var zip = form.querySelector('#' + exampleName + '-zip')
        var additionalData = {
          name: name ? name.value : undefined,
          address_line1: address1 ? address1.value : undefined,
          address_city: city ? city.value : undefined,
          address_state: state ? state.value : undefined,
          address_zip: zip ? zip.value : undefined
        }

        // Use Stripe.js to create a token. We only need to pass in one Element
        // from the Element group in order to create a token. We can also pass
        // in the additional customer data we collected in our form.
        stripe.createToken(elements[0], additionalData).then(function (result) {
          // Stop loading!
          example.classList.remove('submitting')

          if (result.token) {
            // If we received a token, show the token ID.
            example.querySelector('.token').innerText = result.token.id
            example.classList.add('submitted')
          } else {
            // Otherwise, un-disable inputs.
            enableInputs()
          }
        })
      })
    }

    registerElements(
      [cardNumber, cardExpiry, cardCvc],
      'example3'
    )
    this.setHeight()
  },
  updated () {
    this.setHeight()
  },
  methods: {
    setHeight () {
      this.$store.commit('SET_CHAT_OFFSET', this.$refs.fields.offsetHeight - (window.innerHeight / 2))
      this.$nextTick(() => window.scrollTo(0, 1000000))
    },
    next () {
      this.$validator.validateAll().then((result) => {
        if (result) {
          this.$store.commit('CLOSE_ACTION')
          this.$store.commit('PUSH_MESSAGE', {
            author: 'user',
            text: 'Done',
            type: 'text'
          })
          this.$store.dispatch('next')
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
  }
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
  animation: actionsIn
  animation-duration: 0.25s

  &__content
    background-color: #fff
    margin: 0 1rem
    padding: $padding $padding calc(50vh + #{$padding * 1.25})
    border-radius: 1.5rem
    box-shadow: 0 0 35px rgba(0,0,0,0.2)

.encryption
  margin-top: 0.25rem
  margin-bottom: 1rem
  display: flex
  align-items: center
  opacity: 0.5
  line-height: 1.4
  &__icon
    font-size: 1rem
    margin-right: 0.5rem
  &__text
    font-size: 0.75rem

.inputs__flex
  display: flex
  input
    &:not(:last-child)
      margin-right: 0.5rem

@keyframes actionsIn
  0%
    opacity: 0
    transform: translateY(2rem)
  100%
    opacity: 1
    transform: translateY(0)

.example.example3
  *
    font-family: inherit

  .fieldset
    padding: 0
    border: 0
    display: flex
    flex-flow: row wrap
    justify-content: space-between

  .field
    background-color: #F1F1F1
    border: 1px solid #F1F1F1
    outline: 0
    margin-bottom: 0.5em
    width: 100%
    padding: 0.65em 1em
    border-radius: 6px
    transition: border 0.1s ease
    color: #2c3e50
    &.half-width
      width: calc(50% - (0.25em))
      &:not(:last-child)
        margin-right: 0.5em
    &.third-width
      width: calc(33% - (5px / 3))
    &.invalid
      border: 1px solid #ff2a34
      background-color: #fff
      &.focus
        background-color: #f6f9fc
    &.focus::-webkit-input-placeholder, &:focus::-webkit-input-placeholder, &.focus::-moz-placeholder, &:focus::-moz-placeholder, &.focus:-ms-input-placeholder, &:focus:-ms-input-placeholder
      color: #cfd7df
  input, button
    appearance: none
    outline: none
    border-style: none
  input
    color: #fff
    &::-webkit-input-placeholder, &::-moz-placeholder, &:-ms-input-placeholder
      color: #9bacc8

  .error
    color: #ff2a34
    font-size: 0.75rem
    margin-bottom: 1rem
    text-align: center

  .error
    svg
      .base
        fill: #fa755a
      .glyph
        fill: #fff
  .success
    .icon
      .border
        stroke: #fcd669
      .checkmark
        stroke: #fff
    .title
      color: #fff
    .message
      color: #9cabc8
    .reset path
      fill: #fff
</style>
