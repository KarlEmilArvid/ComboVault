import star from '../../images/star.svg'
import accordionArrow from '../../images/accordionArrow.svg'
import { useEffect, useState } from 'react'
import './Post.scss'

type CurrentPost = {
    postTitle: string;
    postText: string;
}

type Props = {
    PostTitle: string
    PostText: string
    name: string
    openOverlay: (overlayTitle: string, currentPost: CurrentPost, currentButton: string, postId: string) => void;
    postId: string;
}

const Post = ({ PostTitle, PostText, name, openOverlay, postId }: Props) => {
    const [accordion, setAccordion] = useState<boolean>(false)

    const overlayTitle = 'Edit';
    const currentButton = 'Save Changes';

    console.log(postId);

    useEffect(() => {
        setAccordion(true)
    }, [name])


    return (
        <li className='post-container'>
            {accordion ?
                <>
                    <section onClick={() => setAccordion(!accordion)} className='post-information'>
                        <h3>{PostTitle}</h3>
                        <img className='accordion' src={accordionArrow} alt="down-button" />
                        <img src={star} alt="star" />
                    </section>
                </>
                :
                <>
                    <section onClick={() => setAccordion(!accordion)} className='post-information'>
                        <h3>{PostTitle}</h3>
                        <img className='accordion' src={accordionArrow} alt="down-button" />
                        <img src={star} alt="star" />
                    </section>
                    <section className='post-section'>
                        <p>{PostText}</p>
                        <section className='button-section'>
                            <button onClick={() => openOverlay(overlayTitle, { postText: PostText, postTitle: PostTitle }, currentButton, postId)} className='post-buttons'>edit</button>
                            <button className='post-buttons'>delete</button>
                        </section>
                    </section>
                </>
            }
        </li>
    )
}

export default Post