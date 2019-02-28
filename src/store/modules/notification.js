export const namespaced = true

export const state = {
   notifications: []
}

let id = 1
export const mutations = {
   ADD(state, notification) {
      state.notifications.push({ id: ++id, ...notification })
   },
   DELETE(notification) {
      state.notifications = state.notifications.filter(
         _notification => _notification.id === notification.id
      )
   }
}

export const actions = {
   add({ commit }, notification) {
      commit('ADD', notification)
   },
   delete({ commit }, notification) {
      commit('DELETE', notification)
   }
}
