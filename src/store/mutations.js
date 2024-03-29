import Vue from 'vue'
import _ from 'lodash'

function nextAction (currentAction) {
  switch (currentAction) {
    case null:
      return 'buy'

    case 'buy':
      return 'address'

    case 'address':
      return 'payment'

    case 'payment':
      return 'receipt'
  }
}

export const CHANGE_STATE = (state, newState) => {
  state.currentState = newState
}

export const PUSH_MESSAGE = (state, message) => {
  Vue.set(message, 'id', uniqueId())
  state.chatHistory.push(message)
}

export const INIT_MERCHANT = (state, payload) => {
  state.merchant = payload
}

export const START_TYPING = (state, messageId) => {
  const message = _.find(state.chatHistory, m => m.id === messageId)
  Vue.set(message, 'typing', true)
}

export const STOP_TYPING = (state, messageId) => {
  const message = _.find(state.chatHistory, m => m.id === messageId)
  Vue.set(message, 'typing', false)
}

export const OPEN_ACTION = (state) => {
  state.actionStep = nextAction(state.actionStep)
  state.chatActionable = true
}

export const CLOSE_ACTION = (state) => {
  state.chatActionable = false
}

export const OPEN_PRODUCT_DETAIL = (state) => {
  state.productDetailOpen = true
}

export const CLOSE_PRODUCT_DETAIL = (state) => {
  state.productDetailOpen = false
}

export const SET_CHAT_OFFSET = (state, offset) => {
  state.chatHeightOffset = offset
}

export const APP_READY = (state) => {
  state.loading = false
}

function uniqueId () {
  const randomNumber = Math.floor(Math.random() * 1000)
  const date = new Date().getTime()
  return `${date}-${randomNumber}`
}
