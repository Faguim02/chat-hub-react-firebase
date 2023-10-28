import style from './style.module.css'
import image from '../../assets/logo.svg'

interface propsType{
    myMessage: boolean,
    message: string
}

export default function MessageConponent({myMessage, message}: propsType){
    return(
        <li className={myMessage == true ? style.myMessage : style.message}>
            {myMessage == false && (<img src={image} alt="image" />)}
            <section className={style.messageContext}>
                {myMessage == false && (<span>Faguim</span>)}
                <p>{message}</p>
            </section>
        </li>
    )
}