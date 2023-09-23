// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: process.env.FIREBASE,
	authDomain: 'strides-a5360.firebaseapp.com',
	projectId: 'strides-a5360',
	storageBucket: 'strides-a5360.appspot.com',
	messagingSenderId: '897893223067',
	appId: '1:897893223067:web:e4addb287897265ce3543e',
	measurementId: 'G-WHH5TM5JR6',
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);