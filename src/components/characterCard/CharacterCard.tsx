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

    return (
        <section className="character-wrapper">

            <Square name={character.characterName} image={character.characterImage} gameImage={''} gameName={''} showCharacter={showCharacter} />

            <section className="character-container">
                <h2 className="character-name">karaktär namn enbart i desktop</h2>
                <p>karaktär text goes here</p>
            </section>
        </section>
    )
}

export default CharacterCard