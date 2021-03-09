<template>
<div class="view chat" >
<header>
  <button class="logout" @click="Logout">Logout</button>
  <h1>Welcome, {{ username }}!</h1>
</header>
<section class="chat-box">
  <div
    v-for="message in state.messages"
    :key="message.key"
    :class="
          message.username === username ? 'message current-user' : 'message'
        "
  >
    <!-- v-bind:key is the same as :key -->
    <div class="message-inner">
      <div class="username">{{ message.username }}</div>
      <div class="content">{{ message.content }}</div>
    </div>
  </div>
</section>
<footer>
  <form @submit.prevent="SendMessage">
    <input
      type="text"
      v-model="inputMessage"
      placeholder="Write a message..."
    />
    <input type="submit" value="Send" />
  </form>
</footer>
</div>
</template>

<script>
import useMessages from '@/composables/useMessages';
import {toRefs} from 'vue';


export default {
  props: {
    username: {
      type: String,
      required: true,
    }
  },
  setup(props, ctx) {
    const { SendMessage, inputMessage, state } = useMessages(
      toRefs(props).username
    );

    function Logout() {
      ctx.emit("logout");
    }

    return {
      Logout,
      SendMessage,
      inputMessage,
      state,
    }
  }
}
</script>
