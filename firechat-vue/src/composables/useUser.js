import { ref } from 'vue';

export default function useUser() {
  const inputUsername = ref('');
  const username = ref('');

  const Login = () => {
    if (inputUsername.value !== '' || inputUsername.value != null) {
      username.value = inputUsername.value;
      inputUsername.value = '';
    }
  };

  const Logout = () => {
    username.value = '';
  };

  return {
    inputUsername,
    username,
    Login,
    Logout,
  };
}
