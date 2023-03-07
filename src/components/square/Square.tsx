import './square.scss'
import { useNavigate } from 'react-router-dom';

type Props = {
    gameImage: string;
    gameName: string;
    name: string;
    image: string;
}

const Square = ({gameImage, gameName, name, image} : Props) => {

    const navigate = useNavigate();

    const pickGame = () => {
        navigate('/Game');
    }

    console.log(name, image);
    console.log(gameName, gameImage);

    return (
        <div>
            { window.location.href.includes('/Game') ? (
                <>
                    <figure onClick={ pickGame }>
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
            ): null }
        </div>
    )
}

export default Square