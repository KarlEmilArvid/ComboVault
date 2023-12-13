import { useNavigate, useParams } from 'react-router-dom'
import './square.scss'

type Props = {
    gameImage: string
    gameName: string
    name: string
    image: string
    showCharacter: (name: string, image: string) => void
    pickGame: (gameName: string, gameImage: string) => void
}

//TODO: gör en funktion för window.scrollTo? temp fix som ligger på många ställen.

const Square = ({ gameImage, gameName, name, image, showCharacter, pickGame }: Props) => {
    const navigate = useNavigate()
    const param = useParams()

    const pickCharacter = (name: string, image: string) => {
        if (!param.character) {
            showCharacter(name, image)
            window.scrollTo(0, 0);
            navigate(`/${param.game?.replace(/\s+/g, '-')}/${name.slice(2)?.replace(/\s+/g, '-')}`)
        }
    }

    return (
        <div className='square-border--wrapper'>
            {window.location.href.includes(`/${gameName}`) ? (
                <>
                    <figure className='square-border'>
                        <figure className='square-container square-hover' onClick={() => pickCharacter(name, image)}>
                            <img src={image} title={name.slice(2)} />
                        </figure>
                    </figure>
                </>
            ) : window.location.href.includes(`/${param.game?.replace(/\s+/g, '-')}/${name.slice(2)?.replace(/\s+/g, '-')}`) ? (
                <>
                    <figure className='square-border'>
                        <figure className='square-container'>
                            <img src={image} title={name.slice(2)} />
                        </figure>
                    </figure>
                </>
            ) : window.location.href.includes('') ? (
                <>
                    <figure className='square-border'>
                        <figure className='square-container square-hover' onClick={() => pickGame(gameName, gameImage)}>
                            <img src={gameImage} title={gameName} />
                        </figure>
                    </figure>
                </>
            ) : null}
        </div>
    )
}

export default Square