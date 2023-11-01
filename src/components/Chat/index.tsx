import { Input, InputGroup, InputRightElement } from '@chakra-ui/react'
import {BsFillSendFill} from 'react-icons/bs'
import style from './style.module.css'
import { useEffect, useState } from 'react'
import { GetAuthGoogle } from '../../services/Auth/GetAuthGoogle'
import { SendMessage } from '../../services/DataBase/SendMessage'
import { collection, onSnapshot, query } from 'firebase/firestore'
import { db } from '../../services/firebaseConfig'
import MessageConponent from '../MessageComponent'

interface messagesType{
    id: number,
    displayName: string,
    photoURL: string,
    uid: string,
    message: string
}

export default function Chat(){

    const [user, setUser] = useState<any>()
    const [message, setMessage] = useState<string>('')
    const [messages, setMessages] = useState<messagesType[]>([])
    
    useEffect(()=>{
        const q = query(
            collection(db, 'messages'),
            
        )

        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            const messages: any[] = []
            querySnapshot.forEach((doc) => {
                messages.push({ ...doc.data()})
            })

            let messagesOrd = messages.sort((a, b) => a.id - b.id)

            setMessages(messagesOrd)
            console.log(messagesOrd)
        })

        return () => unsubscribe()
    },[])

    useEffect(()=>{
        (async() => {
            const user: any = await GetAuthGoogle()

            if(user == null){
                window.location.pathname = '/signIn'
            }else{
                setUser(user)
            }
        })()

    },[])

    function addMessage(e: any){
        e.preventDefault()

        if(message.length != 0){
            
            const body: messagesType = {
                id: new Date().getTime(),
                displayName: user.displayName,
                photoURL: user.photoURL,
                uid: user.uid,
                message: message
            }

            SendMessage(body)

            setMessage('')
        }
    }

    return(
        <main className={style.container}>
            <article className={style.messagesArticle}>
                <ul>
                   {messages.map((item, index) => {
                    
                    let verifyMessage: boolean = item.uid == user.uid ? true : false

                    return(
                        <MessageConponent myMessage={verifyMessage} displayName={item.displayName} message={item.message} photoURL={item.photoURL} key={index}/>
                    )
                   })}
                </ul>
            </article>
            <form className={style.formChat}>
                <InputGroup size={'md'}className={style.inputSend}>
                    <Input
                     type={'text'}
                     placeholder='Digite uma mensagem'
                     onChange={(e)=>setMessage(e.target.value)}
                     value={message}
                    />
                    <InputRightElement width='4.5rem'>
                        <button onClick={addMessage}>
                            <BsFillSendFill className={style.iconSend} size={30}/>
                        </button>
                    </InputRightElement>
                </InputGroup>
            </form>
        </main>
    )
}