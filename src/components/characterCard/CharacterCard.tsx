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
        <section>


            <Square name={character.characterName} image={character.characterImage} gameImage={''} gameName={''} showCharacter={showCharacter} />

            <section>
                <h2>karaktär namn enbart i desktop</h2>
                <p>karaktär text goes here</p>
            </section>
        </section>
    )
}

export default CharacterCard