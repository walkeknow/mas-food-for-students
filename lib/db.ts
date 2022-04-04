import { initializeApp, getApp, getApps } from 'firebase/app';
import { getDatabase } from 'firebase/database'
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';

const firebaseConfig = {
    authDomain: 'mas-food-for-s-default-rtdb.firebaseapp.com',
    databaseURL: 'https://mas-food-for-s-default-rtdb.firebaseio.com/',
    projectId: 'mas-food-for-s-default-rtdb',
    storageBucket: 'mas-food-for-s-default-rtdb.appspot.com'
}

var app
//var appAuthTemp
if (!getApps().length) {
    app = initializeApp(firebaseConfig);
    //appAuthTemp = firebase.auth();
 } else {
    app = getApp();
 }
const db = gtDatabase(app)

export const appAuth = firebase.auth();
export default db;
