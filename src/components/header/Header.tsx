import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { auth, signIn } from '../../firebase/firebase'
import { signOut } from 'firebase/auth'
import { RootState } from '../../store'
import { useSelector } from 'react-redux'
import Search from '../search/Search'
import kugghjul from '../../images/kugghjul.svg'
import './header.scss'

type Props = {
    availableSearches: (foundNames: string[] | []) => void
    searchFunction: (searchTerm: string) => void
}

const Header = ({ availableSearches, searchFunction }: Props) => {
    const [overlay, setOverlay] = useState<boolean>(false)
    const [searching, setSearching] = useState<boolean>(false)

    const allGames = useSelector((state: RootState) => state.games.Games)
    const navigate = useNavigate()
    const param = useParams()
    const gameParam = param.game?.replaceAll('-', ' ')
    const characterParam = param.character?.replaceAll('-', ' ')

    const openOverlay = () => {
        setOverlay(!overlay)
    }

    const goHome = () => {
        window.scrollTo(0, 0);
        navigate('/')
        setOverlay(!overlay)
    }

    const connectUser = () => {
        signIn()
        setOverlay(!overlay)
        navigate('/')
    }

    const disconnectUser = () => {
        signOut(auth).then(() => {
            console.log(auth.currentUser?.uid, 'has signed out')
        }).catch((error) => {
            console.log(error)
        })
        setOverlay(!overlay)
        navigate('/')
    }

    const activeSearching = () => {
        setSearching(!searching)
    }

    return (
        <header>
            <section className='header_container'>
                <img onClick={openOverlay} className='gearwheel-icon' src={kugghjul} alt='gear icon' />
                <section className={`param-section ${searching}`}>
                    {param.character ? <h1 className='game-name'>{characterParam}</h1> : <h1 className='game-name'>{gameParam}</h1>}
                    {
                        param.hasOwnProperty('game') && param.hasOwnProperty('character') && param ?
                            <div className='param-wrapper'>
                                <div>
                                    <h3 onClick={() => navigate('/')} className='home-param'>/Home/</h3>
                                </div>
                                <div>
                                    <h3 onClick={() => navigate(-1)} className='game-param'>{`${gameParam}`}</h3>
                                </div>
                                <h3>{`/${characterParam}`}</h3>
                            </div>
                            : param.hasOwnProperty('game') ?
                                <div className='param-wrapper'>
                                    <div>
                                        <h3 onClick={() => navigate(-1)} className='home-param'>/Home/</h3>
                                    </div>
                                    <h3>{`${param.game?.replaceAll('-', ' ')}`}</h3>
                                </div>
                                :
                                null
                    }
                </section>
                <Search allGames={allGames} availableSearches={availableSearches} searchFunction={searchFunction} searching={searching} activeSearching={activeSearching} />
            </section>
            <nav className={'header_overlay' + `-${overlay}`}>
                <ul>
                    <li className='gearwheel-list'>
                        <img className='gearwheel-icon' onClick={openOverlay} src={kugghjul} alt='gear icon' />
                        <h2>Options</h2>
                    </li>
                    <li onClick={goHome}>
                        <h3 className='gear-title'>Home</h3>
                    </li>
                    {/*
                    <li>
                        <img src="" alt="" />
                        <h3>Favourites</h3>
                    </li>
                    */}
                    {/*
                    <li>
                        <img src="" alt="" />
                        <h3 className='gear-title'>About us</h3>
                    </li>
                    */}
                    <li>
                        {auth.currentUser?.uid == undefined ?
                            <h3 className='gear-title' onClick={connectUser}>Sign in</h3>
                            :
                            <h3 className='gear-title' onClick={disconnectUser}>Sign Out</h3>
                        }
                    </li>
                </ul>
            </nav>
        </header>
    )
}

export default Header