import Chat from "../../components/Chat";
import HeaderInformation from "../../components/HeaderInformation";
import ProfileInformations from "../../components/ProfileInformations";
import style from './style.module.css'

export default function ChatPage(){    

    return(
        <div className={style.container}>
            <HeaderInformation/>
            <Chat/>
            <ProfileInformations/>
        </div>
    )
}