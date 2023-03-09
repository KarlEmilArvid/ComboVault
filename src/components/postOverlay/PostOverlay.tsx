import './PostOverlay.scss'

const PostOverlay = () => {
    return (
        <div className='post-overlay-wrapper'>
            <button>X</button>
            <section>
                <h2>Create/Edit Post</h2>
                <input type="text" placeholder='post name:' />
                <input type="text" placeholder='post text goes here...' />
                <button>Public/Private</button>
                <button>Submit/Save</button>
            </section>
        </div>
    )
}

export default PostOverlay