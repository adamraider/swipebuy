import Vue from 'vue'
import Vuex from 'vuex'

import * as mutations from './mutations'
import * as actions from './actions'
import * as getters from './getters'

Vue.use(Vuex)

const state = {
  merchant: null,
  chatHistory: [],
  actionStep: null,
  chatActionable: false,
  productDetailOpen: false,
  chatHeightOffset: 0
}

const debug = process.env.NODE_ENV !== 'production'

export const store = new Vuex.Store({
  strict: debug,
  state,
  mutations,
  actions,
  getters
})
