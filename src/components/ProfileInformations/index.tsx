import { useEffect, useState } from 'react'
import style from './style.module.css'
import { GetAuthGoogle } from '../../services/Auth/GetAuthGoogle'
import { SignOut } from '../../services/Auth/SignOutGoogle'

export default function ProfileInformations(){

    const [user, setUser] = useState<any>()

    useEffect(()=>{
        (async() => {
            const user: any = await GetAuthGoogle()

            if(user){
                setUser(user)
            }
        })()
    },[])

    if(user){
        
        return(
            <section className={style.container}>
                <img src={user.photoURL} alt="photo" />
                <h2>{user.displayName}</h2>
                <button onClick={SignOut}>Sair</button>
            </section>
        )
    }
}