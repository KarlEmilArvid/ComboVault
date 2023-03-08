import Square from '../square/Square'
import './CharacterCard.scss'
import '../square/square.scss'
import { useState } from 'react';

type CharacterType = {
    characterName: string;
    characterImage: string;
}

type Props = {
    showCharacter: (name: string, image: string) => void;
    character: CharacterType | undefined;
}

const CharacterCard = ({ character, showCharacter }: Props) => {
    /*
        console.log(character);
        console.log(character?.characterName, character?.characterImage);
    */


    return (
        <section>
            <figure >
                <img src={character?.characterImage} title={character?.characterName} />
                <span>{character?.characterName}</span>
            </figure>
            {
                character ?
                    <Square name={character.characterName} image={character.characterImage} gameImage={''} gameName={''} showCharacter={showCharacter} />
                    :
                    ''
            }
            <section>
                <h2>karaktär namn enbart i desktop</h2>
                <p>karaktär text goes here</p>
            </section>
        </section>
    )
}

export default CharacterCard