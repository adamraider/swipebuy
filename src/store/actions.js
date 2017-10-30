import Vue from 'vue'
import _ from 'lodash'

export const setupMerchant = (store, payload) => {
  store.commit('INIT_MERCHANT', payload.merchant)
  store.commit('CHANGE_STATE', 'introduction')
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
  Vue.set(message, 'typing', true)
  store.commit('PUSH_MESSAGE', message)
  setTimeout(() => {
    store.commit('STOP_TYPING', message.id)
    setTimeout(() => {
      if (arr[index + 1]) {
        store.dispatch('renderPhrase', {
          arr: arr,
          index: index + 1
        })
      } else {
        store.commit('OPEN_ACTION')
      }
    }, process.env.MESSAGE_TIMEOUT)
  }, timeout)
}
