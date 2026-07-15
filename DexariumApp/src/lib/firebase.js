import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyBlR1sW_bw2afgHnQP6-MtBJbCb-aK69jE",
  authDomain: "dexarium-f9896.firebaseapp.com",
  projectId: "dexarium-f9896",
  storageBucket: "dexarium-f9896.firebasestorage.app",
  messagingSenderId: "930355720623",
  appId: "1:930355720623:web:3d86b1a11df9813a0a3f5a",
  measurementId: "G-89KDB91B59"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
console.log(analytics)

export default app;