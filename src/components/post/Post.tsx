import star from '../../images/star.svg'
import accordionArrow from '../../images/accordionArrow.svg'
import { useEffect, useState } from 'react'
import './Post.scss'

type Props = {
    PostTitle: string
    PostText: string
    name: string
}

const Post = ({ PostTitle, PostText, name }: Props) => {
    const [accordion, setAccordion] = useState<boolean>(false)

    useEffect(() => {
        setAccordion(true)
    }, [name])

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
                    <section className='post-section'>
                        <p>{PostText}</p>
                    </section>
                </>
            }
        </li>
    )
}

export default Post