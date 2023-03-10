import { useState, useEffect } from 'react';
import './PostOverlay.scss'
import { doc, setDoc } from 'firebase/firestore';
import { db } from '../../firebase/firebase';
import { auth } from '../../firebase/firebase';

type Props = {
    overlay: boolean;
    setOverlay: React.Dispatch<React.SetStateAction<boolean>>;
}

const PostOverlay = ({ overlay, setOverlay }: Props) => {
    
    const [ showOverlay, setShowOverlay ] = useState<string>('post-overlay-wrapper');
    const [ postTitle, setPostTitle ] = useState<string>();
    const [ postText, setPostText ] = useState<string>();

    useEffect(() => {
        overlay ? setShowOverlay('post-overlay-wrapper-show') : setShowOverlay('post-overlay-wrapper');
    }, []);

    const closeOverlay = () => {
        setOverlay(false);
    }

    const addPost = () => {
        if (postTitle !== undefined && postText !== undefined) {
            if (postTitle.length > 0 && postText.length > 0) {
                (async () => {

                    const user: string | undefined = auth.currentUser?.uid;

                    await setDoc(doc(db, 'Posts', `${user}`), {
                        Post: { Name: "Skullgirls", PostText: postText, PostTitle: postTitle, Private: true }
                    });
                })();
            }
        }
    }


    return (
        <div className={ showOverlay }>
            <button className="close-button" onClick={ closeOverlay }>X</button>
            <section className="create-post-container">
                <h2>Create/Edit Post</h2>
                <input type="text" placeholder='post name:' onChange={ (e) => setPostTitle(e.target.value) }/>
                <textarea className="text-input" placeholder='post text goes here...' onChange={ (e) => setPostText(e.target.value) }/>
                <button>Public/Private</button>
                <button onClick={ addPost }>Submit/Save</button>
            </section>
        </div>
    )
}

export default PostOverlay