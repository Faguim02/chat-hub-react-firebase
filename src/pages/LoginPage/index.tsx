import style from './style.module.css'
import logo from '../../assets/Chat-hub-logo.svg'
import { FcGoogle } from 'react-icons/fc'

export default function LoginPage(){
    return(
        <main className={style.container}>
            <figure>
                <img src={logo} alt="logo" />
            </figure>

            <section>
                <h1>Entre para o ChatHub</h1>
                <button>
                    <FcGoogle size={25}/>
                    Entrar com o Google
                </button>
            </section>
        </main>
    )
}