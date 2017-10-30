<template lang="pug">
  .product(@click="closeProductDetail()")
    .product__image
    .product__info
      .product__info__primary
        .product__name {{ name }}
        .product__price {{ price }}
      .product__info__description {{ description }}
      .product__types
        .product__type
          .product__type__name Colors
          .product__type__group
            .product__color
              .product__color__example.product__color__example--neon
              .product__type__example__name Neon
            .product__color
              .product__color__example.product__color__example--pink
              .product__type__example__name Pink
</template>

<script>
export default {
  name: 'ProductDetail',
  data () {
    return {
      name: 'Hoverboard v2',
      price: '$1,499',
      description: 'Brand new McFly Hoverboard v2 Signature Edition. Autographed by Marty McFly. Top speed 30 MPH, nuclear powered.'
    }
  },
  methods: {
    closeProductDetail () {
      this.$store.commit('CLOSE_PRODUCT_DETAIL')
    }
  }
}
</script>

<style lang="sass" scoped>
.product
  width: 100%
  min-height: 100vh
  display: flex
  flex-direction: column
  font-size: 1rem
  position: absolute
  top: 0
  left: 0
  right: 0
  bottom: 0
  z-index: 100
  background-color: #fff
  &__image
    width: 100% 
    padding-bottom: 100%
    background-image: url(../assets/hoverboard.png)
    background-size: cover
    background-position: center

  &__info
    padding: 1rem
    &__primary
      display: flex
      margin-bottom: 1rem
    &__description
      line-height: 1.6
      font-weight: 400
      margin-bottom: 1rem

  &__name
    font-size: 1.25em
    font-weight: 600
  
  &__price
    margin-left: auto
    font-size: 1em
    font-weight: 400

  &__type
    &__name
      font-weight: 600
      margin-bottom: 1em

    &__group
      display: flex

    &__example
      &__name
        font-size: 0.75em
 
  &__color
    display: flex
    flex-direction: column
    align-items: center
    &:not(:last-of-type)
      margin-right: 1em

    &__example
      width: 1em
      height: 1em
      border-radius: 1em
      background-color: red
      margin-bottom: 0.5em
      &--pink
        background-color: #FF6FA2
      &--neon
        background-color: #50E3C2
</style>
