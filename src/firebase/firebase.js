import { initializeApp } from "firebase/app"
import { getAuth } from "firebase/auth"
//initialize firebase config
const firebaseConfig = {
  apiKey: "AIzaSyCsXwadglpNccVPBrmqNHt3yQHipkH_-yI",
  authDomain: "todo-ceb51.firebaseapp.com",
  projectId: "todo-ceb51",
  storageBucket: "todo-ceb51.appspot.com",
  messagingSenderId: "926542903835",
  appId: "1:926542903835:web:84127aca517d5450c896be",
  measurementId: "G-5269R9P1E8",
};

const app = initializeApp(firebaseConfig)

export const auth = getAuth(app)