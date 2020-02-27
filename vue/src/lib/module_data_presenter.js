export class ModuleData {
  generate (state) {
    return {
      namespaced: true,
      state,
      mutations: {
        insert_list (state, payload) {
          console.log({ ...state, ...payload })
          Object.assign(state, { ...state, ...payload })
        }
      },
      actions: {
        insert_list ({ commit }, payload) {
          console.log(`${payload.model}/insert_list`, payload.data)
          commit(`insert_list`, payload.data)
        }
      }
    }
  }
}
