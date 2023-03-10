import Square from '../square/Square'
import { useState, useEffect } from 'react';
import './CharacterCard.scss'
import '../square/square.scss'

type CharacterType = {
    characterName: string;
    characterImage: string;
}

type Props = {
    showCharacter: (name: string, image: string) => void;
    character: CharacterType;
    games: any[] | undefined;
}

const CharacterCard = ({ character, showCharacter, games }: Props) => {
    const [validCharacter, setValidCharacter] = useState<CharacterType>({ characterName: '', characterImage: '' })
    const [intro, setIntro] = useState<string>('')

    useEffect(() => {
        setValidCharacter(character)
    }, [])

    useEffect(() => {
        games?.map((game, i) => {
            if (i === 1) {
                let tempString: string = ''
                game.Characters.map((character: { Name: string; characterName: string; Intro: string; }) => {
                    if (character.Name === validCharacter.characterName) {
                        tempString = character.Intro
                    }
                })
                setIntro(tempString)
            }
        })
    }, [validCharacter])

    return (
        <section className="character-wrapper">
            <Square name={validCharacter.characterName} image={validCharacter.characterImage} gameImage={''} gameName={''} showCharacter={showCharacter} />
            <section className="character-container">
                <h2 className="character-name">{validCharacter.characterName}</h2>
                <p className='character-intro'>{intro}</p>
            </section>
        </section>
    )
}

export default CharacterCard