export class ModuleData {
  generate (state) {
    return {
      namespaced: true,
      state,
      mutations: {
        insert_list (state, payload) {
          Object.assign(state, { ...state, ...payload })
        },

        insert (state, payload) {
          Object.assign(state, { ...state, ...payload })
        }
      },
      actions: {
        insert_list ({ commit }, payload) {
          commit(`insert_list`, payload)
        },
        insert ({ commit }, payload) {
          commit(`insert`, payload)
        }
      }
    }
  }
}
