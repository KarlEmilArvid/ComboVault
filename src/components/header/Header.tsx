import Search from '../search/Search'
import kugghjul from '../../images/kugghjul.svg';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './header.scss'

const Header = () => {

    const [overlay, setOverlay] = useState<boolean>(false);
    const navigate = useNavigate()

    const openOverlay = () => {
        console.log(overlay);
        setOverlay(!overlay);
    }

    const goHome = () => {
        navigate('/')
    }

    return (
        <header>
            <section className="header_container">
                <img onClick={openOverlay} className="gearwheel_icon" src={kugghjul} alt="" />
                <section>
                    <h1>Game Name</h1>
                    <h3>/Game/GameName</h3>
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
                        <h3>Log in/out</h3>
                    </li>
                </ul>
            </nav>
        </header>
    )
}

export default Header