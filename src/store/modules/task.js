export default {
  state: () => ({
    tasks: [
      {
        label: "Принять душ",
        status: "done",
        id: 1,
        created_at: "2024-03-29T18:30:05.593Z"
      },
      {
        label: "Уложить детей",
        status: "new",
        id: 2,
        created_at: "2024-03-29T20:51:05.593Z"
      },
      {
        label: "Приготовить спагетти",
        status: "cancel",
        id: 3,
        created_at: "2024-03-29T14:24:05.593Z"
      },
    ],
  }),

  getters: {
    tasks(state) {
      return state.tasks.sort((a, b) => {
        return a.id - b.id;
      });
    }
  },

  mutations: {
    ADD_TASK(state, task) {
      state.tasks.push({ ...task, id: state.tasks[state.tasks.length - 1].id + 1, 'created_at': new Date().toISOString() });
    },
    DELETE_TASK(state, task) {
      const index = state.tasks.indexOf(task)
      state.tasks.splice(index, 1)
    },
    UPDATE_TASK(state, task) {
      const element = state.tasks.find((el) => el.id === task.id)
      state.tasks.splice(state.tasks.indexOf(element), 1, { ...task, label: task.label, status: task.status, 'created_at': new Date().toISOString() })
    },
    UPDATE_TASKS(state) {
      state.tasks.sort()
    },
  },

  actions: {
    addTask({ commit }, task) {
      return new Promise((resolve) => {
        setTimeout(() => {
          commit('ADD_TASK', task)
          resolve()
        }, 500)
      })
    },
    deleteTask({ commit }, task) {
      return new Promise((resolve) => {
        setTimeout(() => {
          commit('DELETE_TASK', task)
          resolve()
        }, 0)
      })
    },
    updateTask({ commit }, task) {
      return new Promise((resolve) => {
        setTimeout(() => {
          commit('UPDATE_TASK', task)
          resolve()
        }, 500)
      })
    }
  }
};
