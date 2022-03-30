import { initializeApp } from 'firebase/app';

const firebaseConfig = {
    authDomain: 'mas-food-for-s.firebaseapp.com',
    databaseURL: 'https://mas-food-for-s.firebaseio.com',
    projectId: 'mas-food-for-s',
    storageBucket: 'mas-food-for-s.appspot.com'
  }
  
const app = initializeApp(firebaseConfig);
export default app;