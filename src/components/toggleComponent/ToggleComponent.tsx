import ToggleButton from '../toggleButton/ToggleButton'
import star from '../../images/star.svg'
import './ToggleComponent.scss'


type Props = {
    getName: (name: string) => void
}

const ToggleComponent = ({ getName }: Props) => {

    return (
        <section className="toggle-wrapper">
            <ToggleButton name='My Posts' getName={getName} />
            <ToggleButton name='Public Posts' getName={getName} />
            <ToggleButton name='Information' getName={getName} />
            <figure>
                <img src={star} alt="Favourites/Starred" />
                <p>Favourites/Starred</p>
            </figure>
        </section >
    )
}

export default ToggleComponent