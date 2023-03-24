import { useState } from 'react'
import CharacterCard from '../../components/characterCard/CharacterCard'
import Header from '../../components/header/Header'
import InformationSection from '../../components/informationSection/InformationSection'
import PostSection from '../../components/postSection/PostSection'
import ToggleComponent from '../../components/toggleComponent/ToggleComponent'
import './character.scss'

type CharacterType = {
    characterName: string
    characterImage: string
}

type Props = {
    showCharacter: (name: string, image: string) => void
    character: CharacterType
    pickGame: (gameName: string, gameImage: string) => void
    availableSearches: (foundNames: string[] | []) => void
    searchFunction: (searchTerm: string) => void
}

const Character = ({ character, showCharacter, pickGame, availableSearches, searchFunction }: Props) => {
    const [name, setName] = useState<string>('My Posts')

    const getName = (name: string) => {
        setName(name)
    }

    return (
        <div>
            <Header availableSearches={availableSearches} searchFunction={searchFunction}/>
            <CharacterCard character={character} showCharacter={showCharacter} pickGame={pickGame} />
            <ToggleComponent getName={getName} />
            {
                name === 'My Posts' ? <PostSection name={name} characterName={character.characterName} /> :
                    name === 'Public Posts' ? <PostSection name={name} characterName={character.characterName} /> :
                        name === 'Information' ? <InformationSection characterName={character.characterName} /> :
                            null
            }
        </div>
    )
}

export default Character