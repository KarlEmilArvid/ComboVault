import Square from '../square/Square'
import './CharacterCard.scss'
import '../square/square.scss'
import { useState, useEffect } from 'react';

type CharacterType = {
    characterName: string;
    characterImage: string;
}

type Props = {
    showCharacter: (name: string, image: string) => void;
    character: CharacterType;
}

const CharacterCard = ({ character, showCharacter }: Props) => {
    const [validCharacter, setValidCharacter] = useState<CharacterType>({ characterName: '', characterImage: '' })

    useEffect(() => {
        setValidCharacter(character)
    }, [])

    return (
        <section className="character-wrapper">
            <Square name={validCharacter.characterName} image={validCharacter.characterImage} gameImage={''} gameName={''} showCharacter={showCharacter} />
            <section className="character-container">
                <h2 className="character-name">karaktär namn enbart i desktop</h2>
                <p className='character-intro'>karaktär text goes here, sträng med text kommer visas här</p>
            </section>
        </section>
    )
}

export default CharacterCard