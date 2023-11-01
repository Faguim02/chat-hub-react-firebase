import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { app } from "../firebaseConfig";

export function SignInGooglePopUp(){
    const provider = new GoogleAuthProvider()

    const auth = getAuth(app)

    signInWithPopup(auth, provider)
    .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        
        const token = credential?.accessToken;

        const user = result.user

        console.log(token)
        console.log(user)

        window.location.pathname = '/'
    })
    .catch((error) => {
        const errorCode = error.code;

        const errorMessage = error.message;

        console.error(`Erro code ${errorCode}: ${errorMessage}`)
    })
}