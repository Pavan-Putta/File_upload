import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyAV8ns85-tMUsGvS-7ZQMzucJo42QLU6Og",
  authDomain: "fileupload-auth.firebaseapp.com",
  projectId: "fileupload-auth",
  storageBucket: "fileupload-auth.appspot.com",
  messagingSenderId: "179035579656",
  appId: "1:179035579656:web:52b8dec8b772a9d02d78bd"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export default auth;