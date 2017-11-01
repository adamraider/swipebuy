import _ from 'lodash'

export const chatActionable = state => state.chatActionable

export const chatHistory = state => state.chatHistory

export const productDetailOpen = state => state.productDetailOpen

export const actionStep = state => state.actionStep

export const chatHeightOffset = state => state.chatHeightOffset

export const availableActions = state => {
  if (state.chatActionable) {
    return _.sortBy(state.merchant[state.currentState].action.options, 'order')
  }
}
