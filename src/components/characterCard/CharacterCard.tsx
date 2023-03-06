import Square from '../square/Square'
import './CharacterCard.scss'
import '../square/square.scss'

const CharacterCard = () => {
    return (
        <section>
            <Square />
            <section>
                <h2>karaktär namn enbart i desktop</h2>
                <p>karaktär text goes here</p>
            </section>
        </section>
    )
}

export default CharacterCard