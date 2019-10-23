import firebase from 'firebase/app';
import 'firebase/database';
import Rebase from 're-base'

const firebaseConfig = {
    apiKey: "AIzaSyCSwDNAh0iJGb5_q_Lli-D4_bVSKGoK2Zc",
    authDomain: "users-page.firebaseapp.com",
    databaseURL: "https://users-page.firebaseio.com",
    projectId: "users-page",
    storageBucket: "users-page.appspot.com",
    messagingSenderId: "511582874995",
    appId: "1:511582874995:web:fedf891ebce519656f2906",
    measurementId: "G-C39V0HJRRD"
};

const app = firebase.initializeApp(firebaseConfig);
const base = Rebase.createClass(app.database());

export default base;