import { getAuth, signOut } from "firebase/auth";
import { app } from "../firebaseConfig";


export function SignOut(){
    const auth = getAuth(app);

    signOut(auth).then(() => {
        window.location.pathname = '/signIn'
    }).catch((error) => {
        console.log("ERRO: " + error)
    });
}