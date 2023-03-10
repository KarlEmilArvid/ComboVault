import { useState } from 'react'
import CharacterCard from '../../components/characterCard/CharacterCard'
import Header from '../../components/header/Header'
import InformationSection from '../../components/informationSection/InformationSection'
import PostSection from '../../components/postSection/PostSection'
import ToggleComponent from '../../components/toggleComponent/ToggleComponent'
import ToggleButton from '../../components/toggleButton/ToggleButton'
import './character.scss'

type CharacterType = {
    characterName: string;
    characterImage: string;
}

type Props = {
    showCharacter: (name: string, image: string) => void;
    character: CharacterType;
    games: any[] | undefined;
}

const Character = ({ character, showCharacter, games }: Props) => {

    const [name, setName] = useState<string>('My Post')

    const getName = (name: string) => {
        console.log('här tar vi emot name')
        setName(name)
    }

    console.log(name)

    return (
        <div>
            <Header />
            <CharacterCard games={games} character={character} showCharacter={showCharacter} />
            <ToggleComponent getName={getName} />
            {
                name === 'My Post' ? <PostSection name={name} games={games} characterName={character.characterName} /> :
                    name === 'Public Post' ? <PostSection name={name} games={games} characterName={character.characterName} /> :
                        name === 'Information' ? <InformationSection games={games} characterName={character.characterName} /> :
                            null
            }
        </div>
    )
}

export default Character