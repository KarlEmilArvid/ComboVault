import Header from '../../components/header/Header'
import Square from '../../components/square/Square'
import './game.scss'

const Game = () => {
    return (
        <>
            <Header />
            <main className='square-wrapper'>
                <Square />
            </main>
        </>
    )
}

export default Game