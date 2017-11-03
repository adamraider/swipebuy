<template lang="pug">
  .fields
    .fields__content
      form.fields__inner(ref="fields", @submit.prevent="next()")
        .flex
          input.input(type="text" v-validate="'required'", :class="{ 'input--error': errors.has('street_address') }", name="street_address" placeholder="Street Address")
          input.input.input--aptnum(type="text" v-validate="'required'", :class="{ 'input--error': errors.has('apt_num') }", name="apt_num" placeholder="Apt. #")
        input.input(type="text" v-validate="'required'", :class="{ 'input--error': errors.has('city') }", name="city" placeholder="City")
        .flex
          input.input(type="text" v-validate="'required'", :class="{ 'input--error': errors.has('postal_code') }", name="postal_code" placeholder="Postal Code")
          input.input(type="text" v-validate="'required'", :class="{ 'input--error': errors.has('state') }", name="state" placeholder="State")

        .actions
          button(type="submit") Done
          button.btn--secondary(@click.prevent="cancel()") Cancel
</template>

<script>
export default {
  name: 'Fields',
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
            text: '20 West Derp St., 10232, New York NY!',
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
      return this.$refs.fields.offsetHeight
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
    padding: $padding $padding calc(50vh + #{$padding})
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
