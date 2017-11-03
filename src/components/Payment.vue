<template lang="pug">
  .fields
    .fields__content(@submit.prevent="")
      form.fields__inner(ref="fields", @submit.prevent="next()")
        input.input(
          type="text",
          placeholder="Email",
          v-validate="'required|email'",
          name="email",
          :class="{ 'input--error': errors.has('email') }"
        )
        input.input(
          type="text",
          placeholder="Card Number",
          v-validate="'required|credit_card'",
          name="card_number",
          :class="{ 'input--error': errors.has('card_number') }"
        )
        .inputs__flex
          input.input(
            type="text",
            placeholder="MM/YY",
            v-validate="'required'",
            name="expiration",
            :class="{ 'input--error': errors.has('expiration') }"
          )
          input.input(
            type="text",
            placeholder="CVC",
            v-validate="'required'",
            name="cvc",
            :class="{ 'input--error': errors.has('cvc') }"
          )
        .encryption
          .encryption__icon: i.icon-lock
          .encryption__text This website uses 256-bit SSL encryption. Your info is safe.

        button(type="submit") Purchase
        button.btn--secondary(type="button" @click.prevent="cancel()") Cancel
</template>

<script>
export default {
  name: 'Payment',
  mounted () {
    this.setHeight()
  },
  updated () {
    this.setHeight()
  },
  methods: {
    setHeight () {
      this.$store.commit('SET_CHAT_OFFSET', this.height)
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
  },
  computed: {
    height () {
      return this.$refs.fields.offsetHeight
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
    padding: $padding $padding calc(50vh + #{$padding})
    border-radius: 1.5rem
    box-shadow: 0 0 35px rgba(0,0,0,0.2)

.encryption
  margin-top: 0.25rem
  margin-bottom: 0.75rem
  display: flex
  align-items: center
  opacity: 0.5
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

</style>
