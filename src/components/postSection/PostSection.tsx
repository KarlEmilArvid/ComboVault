import Post from '../post/Post'
import PostOverlay from '../postOverlay/PostOverlay'
import './PostSection.scss'

type Props = {
    name: string
}

const PostSection = ({ name }: Props) => {

    return (
        <section className="posts-wrapper">
            <h2>{name}</h2>
            <ul className='posts-list'>
                <Post />
                <Post />
                <Post />
                <Post />
            </ul>
            <button className='new-post-button'>New Post</button>
            <PostOverlay />
        </section>
    )
}

export default PostSection