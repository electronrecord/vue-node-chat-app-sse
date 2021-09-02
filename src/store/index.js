import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import {SEND_MSG, GET_STATUS} from "@/store/api"
import {sse} from "@/store/sse"

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    clientsCount: 0,
    messages: [],
    name: undefined,
    removeName: undefined
  },
  mutations: {
    SET_CLIENT_NAME (state, name) {
      !state.name && sse(name);
      Vue.set(state, 'name', name)
    },
    SET_CLIENTS_COUNT (state, count) {
      Vue.set(state, 'clientsCount', count)
    },
    UPDATE_MSGS (state, client) {
      state.messages.push(client)
    },
    REMOVE_CLIENT (state, name) {
      Vue.set(state, 'removeName', name);
      setTimeout(() => {
        Vue.set(state, 'removeName', undefined);
      }, 3000)
    }
  },
  actions: {
    async send_msg ({state, commit}, {msg}) {
      try {
        const {data} = await axios.post(SEND_MSG, {msg, name: state.name})
        console.log(data)
      } catch (e) {
        console.log(e)
      }
    }
  },
  modules: {
  }
})
