import { initializeApp, getApp, getApps } from 'firebase/app';

const firebaseConfig = {
    apiKey: 'AIzaSyCsER_FMu1E1LK4_zmiuCc3lpsZEpiay38',
    authDomain: 'mas-food-for-2.firebaseapp.com',
    databaseURL: 'https://mas-food-for-2-default-rtdb.firebaseio.com/',
    projectId: 'mas-food-for-2',
    storageBucket: 'mas-food-for-2.appspot.com'
}

var temp
if (!getApps().length) {
    temp = initializeApp(firebaseConfig);
 }else {
    temp = getApp();
 }

 const app = temp
 
export default app;