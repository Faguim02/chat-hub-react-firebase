import { Button, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerFooter, DrawerHeader, DrawerOverlay, Input, InputGroup, InputRightElement, useDisclosure } from '@chakra-ui/react'
import logo from '../../assets/logo.svg'
import {BsFillSendFill} from 'react-icons/bs'
import { AiOutlineMenu, AiFillInstagram, AiFillGithub } from 'react-icons/ai'
import style from './style.module.css'
import React, { useEffect, useState } from 'react'
import { GetAuthGoogle } from '../../services/Auth/GetAuthGoogle'
import { SendMessage } from '../../services/DataBase/SendMessage'
import { collection, onSnapshot, query } from 'firebase/firestore'
import { db } from '../../services/firebaseConfig'
import MessageConponent from '../MessageComponent'
import { SignOut } from '../../services/Auth/SignOutGoogle'

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
    
    const { isOpen, onOpen, onClose } = useDisclosure()
    const btnRef: any = React.useRef()

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
            <header className={style.nav}>
                <div>
                    <img src={logo} alt="logo" />
                    <h1>ChatHub</h1>
                </div>

                <Button ref={btnRef} colorScheme='teal' onClick={onOpen}>
                    <AiOutlineMenu/>
                </Button>

                <Drawer
                 isOpen={isOpen}
                 placement='right'
                 onClose={onClose}
                 finalFocusRef={btnRef}
                >
                    <DrawerOverlay/>
                    <DrawerContent backgroundColor={'#161B33'}>
                        <DrawerCloseButton color={'white'}/>
                        <DrawerHeader>Informações</DrawerHeader>

                        <DrawerBody>
                            <div className={style.drawerBody}>
                                {user && (
                                    <>
                                        <img src={user.photoURL} alt="avatar" />
                                        <h2>{user.displayName}</h2>
                                    </>
                                )}
                                <Button onClick={SignOut}>Sair</Button>
                            </div>
                        </DrawerBody>

                        <DrawerFooter>
                            <footer className={style.DrawerFooter}>
                                <div>
                                    <a href="https://www.instagram.com/faguim_02/" target="_blank" rel="noopener noreferrer"><AiFillInstagram size={35}/></a>
                                    <a href="https://github.com/Faguim02" target="_blank" rel="noopener noreferrer"><AiFillGithub size={35}/></a>
                                </div>
                                <span>© Fagner</span>
                            </footer>
                        </DrawerFooter>
                    </DrawerContent>

                </Drawer>

            </header>
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
                <InputGroup size={'md'} className={style.inputSend}>
                    <Input
                     type={'text'}
                     pr={'3.5rem'}
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