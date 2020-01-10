import menu from '../menu'

export default {
  namespaced: true,
  state: {
    menuIndexDefault: "1",
    menuIndex: "1",
    menu
  },
  mutations: {
    setMenuIndex(state, routePath) {
      if(routePath === '' || routePath === '/'){
        state.menuIndex = state.menuIndexDefault;
      }
      state.menu.map((m,index) => {
        if(m.path === routePath){
          state.menuIndex = index.toString()
        }
      })
    }
  },
  actions: {
    positionMenu({commit}, routePath){
      commit('setMenuIndex', routePath)
    }
  }
}
