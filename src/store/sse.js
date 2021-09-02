import store from './index'

export const sse = function (name) {
  const evtSource = new EventSource(`/api/events?name=${name}`)

  evtSource.onmessage = async function(e) {
    const msg = JSON.parse(e.data)
    console.log(`message from server`, msg)
    msg.clientCount && store.commit('SET_CLIENTS_COUNT', msg.clientCount)
    msg.newMsg && store.commit('UPDATE_MSGS', msg)
    msg.remove && store.commit('REMOVE_CLIENT', msg.remove)
  }

  evtSource.onclose = function (e) {
    console.log(`msg: `, e.data)
  }
}
