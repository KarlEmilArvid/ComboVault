import CharacterCard from '../../components/characterCard/CharacterCard'
import Header from '../../components/header/Header'
import InformationSection from '../../components/informationSection/InformationSection'
import PostSection from '../../components/postSection/PostSection'
import ToggleComponent from '../../components/toggleComponent/ToggleComponent'
import './character.scss'

type CharacterType = {
	characterName: string;
	characterImage: string;
}

type Props = {
    showCharacter: (name: string, image: string) => void;
    character: CharacterType;
}


const Character = ({ character, showCharacter }: Props) => {
    
    
    return (
        <div>
            <Header />
            <CharacterCard character={character} showCharacter={showCharacter}/>
            <ToggleComponent />
            <PostSection />
            <InformationSection />
        </div>
    )
}

export default Character