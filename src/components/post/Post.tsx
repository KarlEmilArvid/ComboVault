import './Post.scss'
import star from '../../images/star.svg';
import accordionArrow from '../../images/accordionArrow.svg';

const Post = () => {
    return (
        <li>
            <h3></h3>
            <img src={accordionArrow} alt="down-button" />
            <img src={star} alt="star" />
            {/**dragspels funktion goes here */}
        </li>
    )
}

export default Post