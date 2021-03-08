import { ref, reactive, onMounted } from 'vue';
import db from '../db';

export default function useMessages(username) {
  const inputMessage = ref('');
  const state = reactive({
    messages: [],
  });

  const SendMessage = () => {
    const messagesRef = db.database().ref('messages');

    if (inputMessage.value === '' || inputMessage.value === null) {
      return;
    }

    const message = {
      username: username.value,
      content: inputMessage.value,
    };

    messagesRef.push(message);
    inputMessage.value = '';
  };

  onMounted(() => {
    const messagesRef = db.database().ref('messages');

    messagesRef.on('value', (snapshot) => {
      const data = snapshot.val();
      const messages = [];

      Object.keys(data).forEach((key) => {
        messages.push({
          id: key,
          username: data[key].username,
          content: data[key].content,
        });
      });

      state.messages = messages;
    });
  });

  return {
    inputMessage,
    state,
    SendMessage,
  };
}
