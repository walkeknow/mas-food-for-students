import { initializeApp, getApp, getApps } from 'firebase/app';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';

const firebaseConfig = {
    authDomain: 'mas-food-for-s-default-rtdb.firebaseapp.com',
    databaseURL: 'https://mas-food-for-s-default-rtdb.firebaseio.com/',
    projectId: 'mas-food-for-s-default-rtdb',
    storageBucket: 'mas-food-for-s-default-rtdb.appspot.com'
}

/*
var temp
var appAuthTemp
if (!getApps().length) {
    temp = initializeApp(firebaseConfig);
    appAuthTemp = firebase.auth();
 } else {
    temp = getApp();
 }
const app = temp
*/
var app = initializeApp(firebaseConfig);
export const appAuth = firebase.auth();
export default app;