import { app } from "../firebaseConfig";
import { getAuth } from "firebase/auth";

export async function GetAuthGoogle() {
  return new Promise((resolve) => {
    const auth = getAuth(app);
    auth.onAuthStateChanged((user) => {
      if (user) {
        resolve(user);
      } else {
        resolve(null);
      }
    });
  });
}
