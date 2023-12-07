import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "./firebaseConfig";
const googleAuth = async () => {
	const provider = new GoogleAuthProvider();

	try {
		const result = await signInWithPopup(auth, provider);
		const user = result.user;
		const name = user.displayName;
		console.log(name);
	} catch (error) {
		console.log(error.message);
	}
};

export default googleAuth;
