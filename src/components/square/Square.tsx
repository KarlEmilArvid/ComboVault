import { useNavigate } from 'react-router-dom'
import './square.scss'

type Props = {
    gameImage: string;
    gameName: string;
    name: string;
    image: string;
    showCharacter: (name: string, image: string) => void;
    pickGame: (gameName: string, gameImage: string) => void
}

const Square = ({ gameImage, gameName, name, image, showCharacter, pickGame }: Props) => {

    const navigate = useNavigate();

    const pickCharacter = (name: string, image: string) => {
        showCharacter(name, image);
        navigate('/Character');
    }

    return (
        <div>
            {window.location.href.includes('/Game') ? (
                <>
                    <figure className="square-border" onClick={() => pickCharacter(name, image)}>
                        <img src={image} title={name} />
                    </figure>
                </>
            ) : window.location.href.includes('/Character') ? (
                <>
                    <figure className="square-border">
                        <img src={image} title={name} />
                    </figure>
                </>
            ) : window.location.href.includes('') ? (
                <>
                    <figure className="square-border" onClick={() => pickGame(gameName, gameImage)}>
                        <img src={gameImage} title={gameName} />
                    </figure>
                </>
            ) : null}
        </div>
    )
}

export default Square