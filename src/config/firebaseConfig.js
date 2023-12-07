// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
	apiKey: "AIzaSyCKAtrVIXhKghyqXxwIz_FOx6oU01reXu8",
	authDomain: "carhoster-486c2.firebaseapp.com",
	projectId: "carhoster-486c2",
	storageBucket: "carhoster-486c2.appspot.com",
	messagingSenderId: "938187848199",
	appId: "1:938187848199:web:1c8dcc3d60aa1a6b4cc8a2",
	measurementId: "G-3H6YH9W9DB",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const imgStorage = getStorage(app);
