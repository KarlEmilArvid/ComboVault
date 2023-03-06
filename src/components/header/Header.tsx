import Search from '../search/Search'
import './header.scss'

const Header = () => {
    return (
        <header>
            <button>Kuggis</button>
            <section>
                <h1>Game Name - karaktär namn - visas ej i desktop vy</h1>
                <h2>/breadcrumb/goes/here</h2>
            </section>
            <Search />
            <nav className='header-overlay'>
                <ul>
                    <li>
                        <img src="" alt="" />
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