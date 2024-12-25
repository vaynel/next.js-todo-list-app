import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyDffhXAjyL1uexCM72xVOa9XvOW152OLas',
  authDomain: 'my-todo-calendar.firebaseapp.com',
  projectId: 'my-todo-calendar',
  storageBucket: 'my-todo-calendar.firebasestorage.app',
  messagingSenderId: '803667522447',
  appId: '1:803667522447:web:3c3642639448eaa33a11fa',
  measurementId: 'G-3B6FDFQHHJ',
};

// Firebase 앱 초기화
const firebaseApp = initializeApp(firebaseConfig);
//const analytics = getAnalytics(firebaseApp);

// Firebase 인증 인스턴스 export
export const auth = getAuth(firebaseApp);
export default firebaseApp;
