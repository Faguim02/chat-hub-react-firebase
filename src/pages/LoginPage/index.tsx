import style from './style.module.css'
import logo from '../../assets/Chat-hub-logo.svg'
import { FcGoogle } from 'react-icons/fc'
import { SignInGooglePopUp } from '../../services/Auth/SignInGooglePopUp'
import { GetAuthGoogle } from '../../services/Auth/GetAuthGoogle'
import { useEffect } from 'react'
import { SignInWithRedirect } from '../../services/Auth/SignInWithRedirect'

export default function LoginPage(){

    useEffect(()=>{
       (async() => {
        const user: any = await GetAuthGoogle()

        if(user != null){
            window.location.pathname = '/'
        }
        
       })()
    },[])

    function handleSignIn(){
        if(window.innerWidth > 760){
            SignInGooglePopUp()
        }else{
            SignInWithRedirect()
        }
    }

    return(
        <main className={style.container}>
            <figure>
                <img src={logo} alt="logo" />
            </figure>

            <section>
                <h1>Entre para o ChatHub</h1>
                <button onClick={handleSignIn}>
                    <FcGoogle size={25}/>
                    Entrar com o Google
                </button>
            </section>
        </main>
    )
}