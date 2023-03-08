import Search from '../search/Search'
import kugghjul from '../../images/kugghjul.svg';
import './header.scss'
import { useState } from 'react';

const Header = () => {

    const [ overlay, setOverlay ] = useState<boolean>(false);

    const openOverlay = () => {
        setOverlay(!overlay);
    }

    return (
        <header>
            <img onClick={openOverlay} className="gearwheel_icon" src={ kugghjul } alt="" />
            <section>
                <h1>Game Name</h1>
                <h3>/Game/GameName</h3>
            </section>
            <Search />
            <nav className={'header_overlay' + `-${ overlay }`}>
                <ul>
                    <li>
                        <img src={ kugghjul } alt="" />
                        <p>Options</p>
                    </li>
                    <li>
                        <img src="" alt="" />
                        <p>Home</p>
                    </li>
                    <li>
                        <img src="" alt="" />
                        <p>Favourites</p>
                    </li>
                    <li>
                        <img src="" alt="" />
                        <p>About us</p>
                    </li>
                    <li>
                        <img src="" alt="" />
                        <p>Log in/out</p>
                    </li>
                </ul>
            </nav>
        </header>
    )
}

export default Header