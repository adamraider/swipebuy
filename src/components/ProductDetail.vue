<template lang="pug">
  .product
    .product__close(@click="closeProductDetail()"): i.icon-x
    .product__image.js_slider.carousel-group
      .carousel-cell(v-for="image in itemImages", :style="{ backgroundImage: `url(${image})` }")
    .product__info
      .product__info__primary
        .product__name {{ itemName }}
        .product__price {{ itemPrice }}
      .product__info__description {{ itemDescription }}
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
import Flickity from 'flickity'

export default {
  name: 'ProductDetail',
  props: {
    itemName: {
      required: true,
      type: String
    },
    itemPrice: {
      required: true,
      type: String
    },
    itemImages: {
      required: true,
      type: Array
    },
    itemDescription: {
      type: String
    }
  },
  mounted () {
    /* eslint-disable no-new */
    new Flickity('.js_slider', {
      prevNextButtons: false
    })
  },
  methods: {
    closeProductDetail () {
      this.$store.commit('CLOSE_PRODUCT_DETAIL')
    }
  }
}
</script>

<style lang="sass">
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
  animation: popin
  animation-duration: 0.35s
  &__close
    position: absolute
    top: 1rem
    right: 1rem
    font-size: 1.5em
    color: #fff
    text-shadow: 0 1px 0 rgba(0,0,0,0.35)
    z-index: 1
    cursor: pointer

  &__image
    width: 100% 

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

@keyframes popin
  0%
    transform: scale(0.9)
    opacity: 0
  100%
    transform: scale(1)
    opacity: 1

.frame
  position: relative
  overflow: hidden
  white-space: nowrap

.slides
  display: inline-block

.carousel-cell
  position: relative
  display: inline-block
  width: 100vw
  padding-bottom: 100vw
  background-size: cover
  background-position: center

.flickity-page-dots
  bottom: 1rem
</style>
