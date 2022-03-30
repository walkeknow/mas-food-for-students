import { initializeApp, getApp, getApps } from 'firebase/app';

const firebaseConfig = {
    authDomain: 'mas-food-for-s-default-rtdb.firebaseapp.com',
    databaseURL: 'https://mas-food-for-s-default-rtdb.firebaseio.com/',
    projectId: 'mas-food-for-s-default-rtdb',
    storageBucket: 'mas-food-for-s-default-rtdb.appspot.com'
}

var temp
if (!getApps().length) {
    temp = initializeApp(firebaseConfig);
 }else {
    temp = getApp();
 }

 const app = temp
 
export default app;