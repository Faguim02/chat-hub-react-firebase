import logo from '../../assets/Chat-hub-logo.svg'
import { AiOutlineGithub, AiOutlineInstagram } from 'react-icons/ai'
import style from './style.module.css'

export default function HeaderInformation(){
    return (
        <header className={style.container}>
            <section className={style.sectionInfo}>
                <figure>
                    <img src={logo} alt="logo" />  
                </figure>
                <nav>
                    <ul>
                        <li>
                            <a href="https://www.instagram.com/faguim_02/" target="_blank" rel="noopener noreferrer">
                                <AiOutlineInstagram size={30} color={'#FB4A5E'}/>
                            </a>
                            <a href="https://github.com/Faguim02" target="_blank" rel="noopener noreferrer">
                                <AiOutlineGithub size={30} color={'#FB4A5E'}/>
                            </a>
                        </li>
                        <li></li>
                    </ul>
                </nav>
            </section>

            <p className={style.directzes}>© Fagner</p>
            
        </header>
    )
}