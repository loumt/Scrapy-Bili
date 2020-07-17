import Vuex from 'vuex';
import Vue from 'vue'
import BiliBili from './BiliBili'
import AttentionUp from './AttentionUp'
import AttentionCartoon from './AttentionCartoon'
import SearchUp from './SearchUp'
import SearchCartoon from './SearchCartoon'
import Export from './Export'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    BiliBili,AttentionUp, AttentionCartoon,SearchUp ,SearchCartoon,Export
  }
})
