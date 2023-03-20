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
    openOverlay: (overlayTitle: string, currentPost: CurrentPost, currentButton: string, Id: number) => void;
    Id: number;
}

const Post = ({ PostTitle, PostText, name, openOverlay, Id }: Props) => {
    const [accordion, setAccordion] = useState<boolean>(false)

    const overlayTitle = 'Edit';
    const editButton = 'Save Changes';
    const deleteButton = 'Delete';

    useEffect(() => {
        setAccordion(true)
    }, [name])


    return (
        <div className='post-container--border'>

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
                        </section>
                        {name === 'My Posts' ?
                            <section className='button-section'>
                                <div className="edit-buttons--border">
                                    <button onClick={() => openOverlay(overlayTitle, { postText: PostText, postTitle: PostTitle }, editButton, Id)} className='edit-buttons'>Edit</button>
                                </div>
                                <div className="edit-buttons--border">
                                    <button onClick={() => openOverlay(overlayTitle, { postText: PostText, postTitle: PostTitle }, deleteButton, Id)} className='edit-buttons'>Delete</button>
                                </div>
                            </section>
                            : null
                        }
                    </>
                }
            </li>

        </div>
    )
}

export default Post