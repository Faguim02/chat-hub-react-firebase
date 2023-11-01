import { addDoc, collection, getFirestore } from "firebase/firestore"
import { app } from "../firebaseConfig"

interface paramsBody{
    displayName: string,
    photoURL: string,
    uid: string,
    message: string
}

export async function SendMessage(body: paramsBody){
    const db = getFirestore(app)

    try {

        await addDoc(collection(db, 'messages'), body)

        console.log("Deu certo")

    } catch (error) {
        
        console.log("Erro ao enviar mensagem: "+error)

    }
}