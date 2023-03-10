import './Post.scss'
import star from '../../images/star.svg';
import accordionArrow from '../../images/accordionArrow.svg';
import { useEffect, useState } from 'react';

type Props = {
    PostTitle: string;
    PostText: string;
}

const Post = ({ PostTitle, PostText }: Props) => {

    const [accordion, setAccordion] = useState<boolean>(false)

    useEffect(() => {
        setAccordion(true);
    }, [])

    return (
        <li onClick={() => setAccordion(!accordion)} className='post-container'>

            {accordion ?
                <>
                    <h3>{PostTitle}</h3>
                    <img className='accordion' src={accordionArrow} alt="down-button" />
                    <img src={star} alt="star" />
                </>
                :
                <>
                    <h3>{PostTitle}</h3>
                    <img className='accordion' src={accordionArrow} alt="down-button" />
                    <img src={star} alt="star" />
                    <section>
                        <p>{PostText}</p>
                    </section>
                </>
            }
        </li>
    )
}

export default Post