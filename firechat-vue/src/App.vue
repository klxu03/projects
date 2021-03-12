<template>
  <Login v-if="!username" @login="username = $event" />
  <VueChat v-else :username="username" @logout="username = ''" />
</template>

<script>
import { ref } from 'vue';
import VueChat from './components/VueChat.vue';
import Login from './components/Login.vue';

export default {
  components: { Login, VueChat },
  setup() {
    const username = ref('');

    return {
      username,
    };
  },
};
</script>

<style lang="scss">
* {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
.view {
  display: flex;
  justify-content: center;
  min-height: 100vh;
  background-color: #ea526f;
}
</style>
