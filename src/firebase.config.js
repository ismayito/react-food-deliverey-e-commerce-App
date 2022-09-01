import {getApp,getApps,initializeApp} from "firebase/app";
import {Firestore, getFirestore} from "firebase/firestore";
 import {getStorage} from "firebase/storage"
const firebaseConfig = {
    apiKey: "AIzaSyC-vgJ81hIeGXv5makmM4O3Go_0Ux04Jks",
    authDomain: "restaurantapp-90171.firebaseapp.com",
    databaseURL: "https://restaurantapp-90171-default-rtdb.firebaseio.com",
    projectId: "restaurantapp-90171",
    storageBucket: "restaurantapp-90171.appspot.com",
    messagingSenderId: "915665913731",
    appId: "1:915665913731:web:4d45a9f3498cc2028998b6"
  };
  const App=getApps.length>0 ?getApp():initializeApp(firebaseConfig);
  const firestore=getFirestore(App);
  const storage=getStorage(App);
  export {App,firestore,storage};
