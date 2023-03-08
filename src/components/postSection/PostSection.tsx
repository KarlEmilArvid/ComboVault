import Post from '../post/Post'
import PostOverlay from '../postOverlay/PostOverlay'
import './PostSection.scss'

const PostSection = () => {
    return (
        <section className="posts-wrapper">
            <h2>My Posts/Public Posts</h2>
            <ul>
                <Post />
            </ul>
            <button>New Post</button>
            <PostOverlay />
        </section>
    )
}

export default PostSection