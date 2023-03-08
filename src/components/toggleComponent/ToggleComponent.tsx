import './ToggleComponent.scss'
import star from '../../images/star.svg';

const ToggleComponent = () => {
    return (
        <section className="toggle-wrapper">
            <button>My Posts</button>
            <button>Public Posts</button>
            <button>Information</button>
            <figure>
                <img src={ star } alt="Favourites/Starred" />
                <p>Favourites/Starred</p>
            </figure>
        </section>
    )
}

export default ToggleComponent