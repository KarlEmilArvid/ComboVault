import './square.scss'
import { useNavigate } from 'react-router-dom';

type Props = {
    gameImage: string;
    gameName: string;
    name: string;
    image: string;
    showCharacter: (name: string, image: string) => void;

}

const Square = ({gameImage, gameName, name, image, showCharacter} : Props) => {

    const navigate = useNavigate();

    const pickGame = () => {
        navigate('/Game');
    }

    const pickCharacter = (name: string, image: string) => {
        showCharacter(name, image);
        navigate('/Character');
    }



    return (
        <div>
            { window.location.href.includes('/Game') ? (
                <>
                    <figure onClick={ () => pickCharacter(name, image) }>
                        <img src={image} title={name} />
                        <span>{name}</span>
                    </figure>
                </>
            ): window.location.href.includes('') ? (
                <>
                    <figure onClick={ pickGame }>
                        <img src={gameImage} title={gameName} />
                        <span>{gameName}</span>
                    </figure>
                </>
            ): window.location.href.includes('/Character') ? (
                <>
                    <figure >
                        <img src={image} title={name} />
                        <span>{name}</span>
                    </figure>
                </>
            ): null }
        </div>
    )
}

export default Square