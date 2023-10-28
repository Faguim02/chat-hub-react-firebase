import { Input, InputGroup, InputRightElement } from '@chakra-ui/react'
import {BsFillSendFill} from 'react-icons/bs'
import style from './style.module.css'
import MessageConponent from '../MessageComponent'
import { useState } from 'react'

interface messagesType{
    myMessage: boolean,
    message: string
}

export default function Chat(){

    const [message, setMessage] = useState<string>('')
    const [messages, setMessages] = useState<messagesType[]>([])
    const [yourMessage, setYourMessage] = useState<boolean>(true)

    function addMessage(e: any){
        e.preventDefault()

        if(message.length != 0){
            const data: messagesType = {
                myMessage: yourMessage,
                message: message
            }
            setMessages([...messages, data])
            setMessage('')

            setYourMessage(!yourMessage)
        }
    }

    return(
        <main className={style.container}>
            <article className={style.messagesArticle}>
                <ul>
                    {messages.map((item, index) => <MessageConponent myMessage={item.myMessage} key={index} message={item.message}/>)}
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