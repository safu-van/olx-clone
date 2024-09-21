import {initializeApp} from "firebase/app"
import {getAuth} from "firebase/auth"
import {getFirestore} from "firebase/firestore"
import {getStorage} from "firebase/storage"

const firebaseConfig = {
    apiKey: "AIzaSyCgKJ3E1XK83gAjSubS7VGtiE0yureq46M",
    authDomain: "olx-clone-58210.firebaseapp.com",
    projectId: "olx-clone-58210",
    storageBucket: "olx-clone-58210.appspot.com",
    messagingSenderId: "786033724082",
    appId: "1:786033724082:web:65cde027a3693154e0d7ab",
    measurementId: "G-0NVGPMLGWC"
};

const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)
export const firestore = getFirestore(app)
export const storage = getStorage(app)