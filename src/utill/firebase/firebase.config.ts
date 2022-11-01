import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAiN4WY4marbFf3r8h6-7uK89epmD_Jszw",
  authDomain: "fir-rtc-e4674.firebaseapp.com",
  projectId: "fir-rtc-e4674",
  storageBucket: "fir-rtc-e4674.appspot.com",
  messagingSenderId: "555641907673",
  appId: "1:555641907673:web:9704577aee2ca4b38fd1c8",
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
