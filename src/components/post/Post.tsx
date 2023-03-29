//import star from '../../images/star.svg'
import { useEffect, useState } from 'react'
import accordionArrow from '../../images/accordionArrow.svg'
import './Post.scss'

type CurrentPost = {
    postTitle: string
    postText: string
}

type Props = {
    PostTitle: string
    PostText: string
    name: string
    openOverlay: (overlayTitle: string, currentPost: CurrentPost, currentButton: string, Id: number) => void
    Id: number
}

const Post = ({ PostTitle, PostText, name, openOverlay, Id }: Props) => {
    const [accordion, setAccordion] = useState<boolean>(false)
    const [toggle, setToggle] = useState<boolean>(false)

    const overlayTitle = 'Edit'
    const editButton = 'Save Changes'
    const deleteButton = 'Delete'

    const sentences = PostText.split('. ');
    const PostWithBreak = sentences.join('.\n');

    useEffect(() => {
        setAccordion(true)
        setToggle(true)
    }, [name, toggle])

    return (
        <li className='post-container--border'>
            <article className='post-container'>
                {accordion ?
                    <>
                        <section onClick={() => setAccordion(!accordion)} className='post-information'>
                            <h3>{PostTitle}</h3>
                            <img className='accordion-up' src={accordionArrow} alt="down-button" />
                            {/*<img src={star} alt="star" />*/}
                        </section>
                    </>
                    :
                    <>
                        <section onClick={() => setAccordion(!accordion)} className='post-information'>
                            <h3>{PostTitle}</h3>
                            {toggle ?
                                <img className='accordion' src={accordionArrow} alt="down-button" /> :
                                <img className='accordion-up' src={accordionArrow} alt="down-button" />
                            }
                            {/*<img src={star} alt="star" />*/}
                        </section>
                        <section className='post-section'>
                            <p>{PostWithBreak}</p>
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
            </article>
        </li>
    )
}

export default Post