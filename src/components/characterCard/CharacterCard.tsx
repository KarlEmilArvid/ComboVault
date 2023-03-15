import Square from '../square/Square'
import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import './CharacterCard.scss'
import '../square/square.scss'

type CharacterType = {
    characterName: string
    characterImage: string
}

type Props = {
    showCharacter: (name: string, image: string) => void
    character: CharacterType
    pickGame: (gameName: string, gameImage: string) => void
}

const CharacterCard = ({ character, showCharacter, pickGame }: Props) => {
    const [validCharacter, setValidCharacter] = useState<CharacterType>({ characterName: '', characterImage: '' })
    const [intro, setIntro] = useState<string>('')

    useEffect(() => {
        setValidCharacter(character)
    }, [])

    const games = useSelector((state: any) => state.games)

    useEffect(() => {
        games?.map((game: any, i: number) => {
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
        <section className='character-wrapper'>
            <Square name={validCharacter.characterName} image={validCharacter.characterImage} gameImage={''} gameName={''} showCharacter={showCharacter} pickGame={pickGame} />
            <section className='character-container'>
                <h2 className='character-name'>{validCharacter.characterName}</h2>
                <p className='character-intro'>{intro}</p>
            </section>
        </section>
    )
}

export default CharacterCard