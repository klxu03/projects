import { ref } from 'vue';

export default function useLogin(ctx) {
  const inputUsername = ref('');

  const Login = () => {
    if (inputUsername.value !== '' || inputUsername.value != null) {
      ctx.emit('login', inputUsername.value);
      inputUsername.value = '';
    }
  };

  return {
    inputUsername,
    Login,
  };
}
