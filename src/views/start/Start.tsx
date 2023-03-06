import Header from '../../components/header/Header'
import Square from '../../components/square/Square'
import './start.scss'

const Start = () => {
    return (
        <>
            <Header />
            <main className='square-wrapper'>
                <Square />
            </main>
        </>
    )
}

export default Start