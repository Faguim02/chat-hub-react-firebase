import style from './style.module.css'

interface propsType{
    myMessage: boolean,
    message: string,
    photoURL: string,
    displayName: string
}

export default function MessageConponent({myMessage, message, photoURL, displayName}: propsType){
    return(
        <li className={myMessage == true ? style.myMessage : style.message}>
            {myMessage == false && (<img src={photoURL} alt="image" />)}
            <section className={style.messageContext}>
                {myMessage == false && (<span>{displayName}</span>)}
                <p>{message}</p>
            </section>
        </li>
    )
}