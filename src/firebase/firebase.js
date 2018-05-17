import * as firebase from 'firebase';

const prodConfig = {
  apiKey: "AIzaSyAZqINZwPUCTxLJ0Cfk9MmC4dtN-zwgES0",
  authDomain: "cinemania-d8888.firebaseapp.com",
  databaseURL: "https://cinemania-d8888.firebaseio.com",
  projectId: "cinemania-d8888",
  storageBucket: "cinemania-d8888.appspot.com",
  messagingSenderId: "38948468652",
};

const devConfig = {
  apiKey: "AIzaSyAZqINZwPUCTxLJ0Cfk9MmC4dtN-zwgES0",
  authDomain: "cinemania-d8888.firebaseapp.com",
  databaseURL: "https://cinemania-d8888.firebaseio.com",
  projectId: "cinemania-d8888",
  storageBucket: "cinemania-d8888.appspot.com",
  messagingSenderId: "38948468652",
};

const config = process.env.NODE_ENV === 'production'
  ? prodConfig
  : devConfig;

if (!firebase.apps.length) {
  firebase.initializeApp(config);
}

const db = firebase.database();
const auth = firebase.auth();

export {
  db,
  auth,
};
