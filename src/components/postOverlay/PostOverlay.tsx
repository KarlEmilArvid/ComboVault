import { useState, useEffect } from 'react';
import './PostOverlay.scss'

type Props = {
    overlay: boolean;
    setOverlay: React.Dispatch<React.SetStateAction<boolean>>;
}

const PostOverlay = ({ overlay, setOverlay }: Props) => {
    
    const [ showOverlay, setShowOverlay ] = useState<string>('post-overlay-wrapper');

    useEffect(() => {
        overlay ? setShowOverlay('post-overlay-wrapper-show') : setShowOverlay('post-overlay-wrapper');
    }, []);

    const closeOverlay = () => {
        setOverlay(false);
    }

    return (
        <div className={ showOverlay }>
            <button className="close-button" onClick={ closeOverlay }>X</button>
            <section className="create-post-container">
                <h2>Create/Edit Post</h2>
                <input type="text" placeholder='post name:' />
                <textarea className="text-input" placeholder='post text goes here...' />
                <button>Public/Private</button>
                <button>Submit/Save</button>
            </section>
        </div>
    )
}

export default PostOverlay