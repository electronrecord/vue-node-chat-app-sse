<template>
  <div class="home">
    <h1 class="title">Welcome to my chat :))</h1>
    <form v-if="!name"
          @submit.prevent="handleName"
          class="has-text-left">
      <label for="name">please enter your name:</label>
      <input type="text" placeholder="your name"
             id="name"
             v-model="nameValue">
      <button class="button is-success is-block">SEND</button>
    </form>
    <form v-else
          class="has-text-left"
          @submit.prevent="handleSubmit">
      <label>messages:</label>
      <br>
      <div class="messages">
        <span class="is-block" v-for="(item, index) in messages"
              :key="index">
          {{ item.name }}: {{ item.newMsg }}
        </span>
      </div>
      <br>
      <label for="message">message:</label>
      <br>
      <input v-model="msg"
             type="text"
             id="message">
      <button class="button is-success is-block">SEND</button>
      <span>Connected clients: {{ clientsCount }}</span>
    </form>
    <span v-if="removeName"
          class="is-block has-text-left has-text-danger mt-2">{{ removeName }} a parasit chat-ul!</span>
  </div>
</template>

<script>
  import { mapState } from 'vuex'
  export default {
    name: 'Home',
    data () {
      return {
        msg: '',
        nameValue: undefined
      }
    },
    computed: {
      ...mapState({
        clientsCount: 'clientsCount',
        messages: 'messages',
        name: 'name',
        removeName: 'removeName',
      })
    },
    methods: {
      handleSubmit () {
        this.$store.dispatch('send_msg', {msg: this.msg})
        this.msg = ''
      },
      handleName () {
        this.$store.commit('SET_CLIENT_NAME', this.nameValue)
      }
    }
  }
</script>

<style lang="scss">
  .home {
    padding: 24px;
    max-width: 400px;
    margin: 0 auto;
    .messages {
      min-height: 40px;
      border: 1px solid lightgray;
      border-radius: 4px;
    }
    input {
      width: 100%;
    }
    input {
      padding: 8px;
    }
    button {
      margin-top: 16px;
      margin-left: auto;
    }
  }
</style>
