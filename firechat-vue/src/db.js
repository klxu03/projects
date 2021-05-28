import firebase from 'firebase/app';
import 'firebase/database';

const config = {
  apiKey: 'AIzaSyAGCoZQmep2AUDNaM_b1o3VDX0VfGBoMUA',
  authDomain: 'firechat-vue-81f51.firebaseapp.com',
  databaseURL: 'https://firechat-vue-81f51-default-rtdb.firebaseio.com',
  projectId: 'firechat-vue-81f51',
  storageBucket: 'firechat-vue-81f51.appspot.com',
  messagingSenderId: '1095567111695',
  appId: '1:1095567111695:web:5687b3347a7b0e5b88957a',
};

const db = firebase.initializeApp(config);
export default db;
