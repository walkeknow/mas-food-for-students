import { initializeApp, getApp, getApps } from 'firebase/app';

const firebaseConfig = {
    apiKey: 'AIzaSyAxpJhPDq3hepF_FMMbh__qtVb-oRMSHmk',
    authDomain: 'mas-food-for-s.firebaseapp.com',
    databaseURL: 'https://mas-food-for-s-default-rtdb.firebaseio.com/',
    projectId: 'mas-food-for-s',
    storageBucket: 'mas-food-for-s.appspot.com'
}

var temp
if (!getApps().length) {
    temp = initializeApp(firebaseConfig);
 }else {
    temp = getApp();
 }

 const app = temp
 
export default app;