import './square.scss'
import { useNavigate } from 'react-router-dom';

type Props = {
    gameImage: string;
    gameName: string;
}

const Square = ({gameImage, gameName}: Props) => {

    const navigate = useNavigate();

    const gotoChar = () => {
        navigate('/character');
    }

    return (
        <figure onClick={ gotoChar }>
            <img src={gameImage} title={gameName} />
            <span>{gameName}</span>
        </figure>
    )
}

export default Square