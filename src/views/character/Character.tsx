import CharacterCard from '../../components/characterCard/CharacterCard'
import Header from '../../components/header/Header'
import InformationSection from '../../components/informationSection/InformationSection'
import PostSection from '../../components/postSection/PostSection'
import ToggleComponent from '../../components/toggleComponent/ToggleComponent'
import './character.scss'


const Character = () => {
    return (
        <div>
            <Header />
            <CharacterCard />
            <ToggleComponent />
            <PostSection />
            <InformationSection />
        </div>
    )
}

export default Character