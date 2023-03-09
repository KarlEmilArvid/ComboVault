import './Post.scss'
import star from '../../images/star.svg';
import accordionArrow from '../../images/accordionArrow.svg';

const Post = () => {
    return (
        <li className='post-container'>
            <h3>post title</h3>
            <img className='accordion' src={accordionArrow} alt="down-button" />
            <img src={star} alt="star" />
            {/**dragspels funktion goes here */}
        </li>
    )
}

export default Post