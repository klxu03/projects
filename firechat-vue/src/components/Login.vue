<template>
  <div class="view login">
    <form class="login-form" @submit.prevent="Login">
      <!-- @submit is the same as v-on:submit -->
      <div class="form-inner">
        <h1>Login to FireChat</h1>
        <label for="username">Username</label>
        <input
          id='username'
          type="text"
          v-model="inputUsername"
          placeholder="Please enter your username..."
        />
        <input type="submit" value="Login" />
      </div>
    </form>
  </div>
</template>

<script>
import useLogin from '@/composables/useLogin';

export default {
  setup(props, ctx) {
    const {inputUsername, Login} = useLogin(ctx);

    return {
      Login,
      inputUsername
    }
  }
}
</script>
