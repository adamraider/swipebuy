import _ from 'lodash'

export const loading = state => state.loading

export const chatActionable = state => state.chatActionable

export const chatHistory = state => state.chatHistory

export const productDetailOpen = state => state.productDetailOpen

export const actionStep = state => state.actionStep

export const chatHeightOffset = state => state.chatHeightOffset

export const brandName = state => state.merchant.brand.name

export const brandImage = state => state.merchant.brand.avatar

export const itemName = state => state.merchant.item.name

export const itemDescription = state => state.merchant.item.description

export const itemPrice = state => state.merchant.item.price

export const itemImages = state => state.merchant.item.images

export const availableActions = state => {
  if (state.chatActionable && state.merchant[state.currentState].action) {
    return _.sortBy(state.merchant[state.currentState].action.options, 'order')
  }
}
