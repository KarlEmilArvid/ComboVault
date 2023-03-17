import Search from '../search/Search'
import kugghjul from '../../images/kugghjul.svg'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useParams } from 'react-router-dom';
import { auth, signIn } from '../../firebase/firebase';
import './header.scss'

const Header = () => {
    const [overlay, setOverlay] = useState<boolean>(false)
    //state här för "game name" men byt till mer lämpligt namn då det blir både game och character
    //breadcrumbs state här
    const navigate = useNavigate()
    const param = useParams();
    console.log(param);

    const openOverlay = () => {
        setOverlay(!overlay)
    }

    const goHome = () => {
        navigate('/')
        setOverlay(!overlay)
    }

    const connectUser = () => {
        signIn()
        navigate('/')
    }

    const gameParam = param.game?.replaceAll('-', ' ')
    const characterParam = param.character?.replaceAll('-', ' ')

    console.log(auth.currentUser?.uid)

    return (
        <header>
            <section className="header_container">
                <img onClick={openOverlay} className="gearwheel_icon" src={kugghjul} alt="" />
                <section>
                    {param.character ? <h1 className='game-name'>{characterParam}</h1> : <h1 className='game-name'>{gameParam}</h1>}
                    {
                        param.hasOwnProperty('game') && param.hasOwnProperty('character') ?
                            <h3>{`${gameParam}` + `/${characterParam}`}</h3>
                            : param.hasOwnProperty('game') ?
                                <h3>{`${param.game?.replaceAll('-', ' ')}`}</h3>
                                :
                                null
                    }
                </section>
                <Search />
            </section>
            <nav className={'header_overlay' + `-${overlay}`}>
                <ul>
                    <li>
                        <img className="gearwheel_icon" onClick={openOverlay} src={kugghjul} alt="" />
                        <h2>Options</h2>
                    </li>
                    <li onClick={goHome}>
                        <img src="" alt="" />
                        <h3>Home</h3>
                    </li>
                    <li>
                        <img src="" alt="" />
                        <h3>Favourites</h3>
                    </li>
                    <li>
                        <img src="" alt="" />
                        <h3>About us</h3>
                    </li>
                    <li>
                        <img src="" alt="" />
                        <h3 onClick={connectUser}>Sign in</h3>
                    </li>
                </ul>
            </nav>
        </header>
    )
}

export default Header