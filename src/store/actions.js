import Vue from 'vue'
import _ from 'lodash'

function nextStep (step) {
  switch (step) {
    case 'introduction':
      return 'address'
    case 'address':
      return 'payment'
    case 'payment':
      return 'receipt'
    case 'receipt':
  }
}

export const setupMerchant = (store, payload) => {
  store.commit('INIT_MERCHANT', payload.merchant)
  store.commit('CHANGE_STATE', 'introduction')
  store.commit('APP_READY')
  store.dispatch('renderPhrase', {
    arr: _.cloneDeep(payload.merchant[store.state.currentState].messages),
    index: 0,
    timeout: process.env.PHRASE_TIMEOUT
  })
}

export function renderPhrase (store, payload) {
  const arr = payload.arr
  const index = payload.index
  const timeout = payload.timeout || process.env.MESSAGE_TIMEOUT
  const message = arr[index]
  store.commit('CLOSE_ACTION')
  Vue.set(message, 'typing', true)
  store.commit('PUSH_MESSAGE', message)
  setTimeout(() => {
    store.commit('STOP_TYPING', message.id)
    window.scrollBy(0, 10000000)
    if (arr[index + 1]) {
      setTimeout(() => {
        store.dispatch('renderPhrase', {
          arr: arr,
          index: index + 1
        })
      }, process.env.MESSAGE_TIMEOUT)
    } else {
      setTimeout(() => {
        store.commit('OPEN_ACTION')
      }, process.env.MESSAGE_TIMEOUT)
    }
  }, timeout)
}

export function next ({ commit, state, dispatch }, payload) {
  commit('CHANGE_STATE', nextStep(state.currentState))
  setTimeout(() => {
    dispatch('renderPhrase', {
      arr: _.cloneDeep(state.merchant[state.currentState].messages),
      index: 0,
      timeout: process.env.PHRASE_TIMEOUT
    })
  }, process.env.PHRASE_TIMEOUT)
}

export function animateChatOffset (store, payload) {
  store.commit('SET_CHAT_OFFSET', payload.offsetHeight)
}
