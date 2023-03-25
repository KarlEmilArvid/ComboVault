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

    const games = useSelector((state: any) => state.games.Games)
    /*
        useEffect(() => {
            games?.map((game: any, i: number) => {
                game.GameTitle.map((character: any) => {
                    let tempString: string = ''
                    character.Characters.map((character: any) => {
                        if (validCharacter.characterName === character.characterName) {
                            console.log('är det true?')
                            tempString = character.Intro
                        }
                    })
                    setIntro(tempString)
                })
            })
        }, [validCharacter])
    */

    //fungerande kod för att visa intro text
    useEffect(() => {
        let tempString = ''
        games?.forEach((game: any) => {
            game.GameTitle.forEach((title: any) => {
                title.Characters.forEach((character: any) => {
                    if (character.Name === validCharacter.characterName) {
                        tempString = character.Intro
                        return
                    }
                })
            })
        })
        setIntro(tempString)
    }, [validCharacter, games])

    return (
        <div className='character-border'>
            <section className='character-wrapper'>
                <Square name={validCharacter.characterName} image={validCharacter.characterImage} gameImage={''} gameName={''} showCharacter={showCharacter} pickGame={pickGame} />
                <section className='character-container'>
                    <p className='character-intro'>{intro}</p>
                </section>
            </section>
        </div>
    )
}

export default CharacterCard