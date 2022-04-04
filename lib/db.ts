import { initializeApp, getApp, getApps } from 'firebase/app';
import { getDatabase } from 'firebase/database'
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
    apiKey: 'AIzaSyAxpJhPDq3hepF_FMMbh__qtVb-oRMSHmk',
    authDomain: 'mas-food-for-s-default-rtdb.firebaseapp.com',
    databaseURL: 'https://mas-food-for-s-default-rtdb.firebaseio.com/',
    projectId: 'mas-food-for-s-default-rtdb',
    storageBucket: 'mas-food-for-s-default-rtdb.appspot.com'
}

var app
if (!getApps().length) {
   app = initializeApp(firebaseConfig);
} else {
   app = getApp();
}

const db = getDatabase(app)

export const appAuth = getAuth(app);
export default db;
