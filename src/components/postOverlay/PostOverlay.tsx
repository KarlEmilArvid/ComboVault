import { useState, useEffect } from 'react';
import './PostOverlay.scss'
import { doc, setDoc, getDocs, collection, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '../../firebase/firebase';
import { auth } from '../../firebase/firebase';


type Props = {
    overlay: boolean;
    setOverlay: React.Dispatch<React.SetStateAction<boolean>>;
}

type PostType = {
        Name: string;
        PostText: string | undefined;
        PostTitle: string | undefined;
        Private: boolean;
}

const PostOverlay = ({ overlay, setOverlay }: Props) => {
    
    const [ showOverlay, setShowOverlay ] = useState<string>('post-overlay-wrapper');
    const [ postTitle, setPostTitle ] = useState<string>();
    const [ postText, setPostText ] = useState<string>();
    const [ characterName, setCharacterName ] = useState<string>('Big Band');
    const [ privatePost, setPrivatePost ] = useState<boolean>(true);

    useEffect(() => {

        overlay ? setShowOverlay('post-overlay-wrapper-show') : setShowOverlay('post-overlay-wrapper');

    }, []);


    const closeOverlay = () => {
        setOverlay(false);
    }
    
    const addPost = () => {

        (async () => {

            const user: string | undefined = auth.currentUser?.uid;

            await setDoc(doc(db, 'Posts', `${Math.random() * 1000 ** 100}`), {
                User: `${user}`,
                Name: characterName,
                PostTitle: postTitle,
                PostText: postText,
                Private: privatePost
            });


        })();

        setOverlay(false);

    }


    return (
        <div className={ showOverlay }>
            <button className="close-button" onClick={ closeOverlay }>X</button>
            <section className="create-post-container">
                <h2>Create/Edit Post</h2>
                <input type="text" placeholder='post name:' onChange={ (e) => setPostTitle(e.target.value) }/>
                <textarea className="text-input" placeholder='post text goes here...' onChange={ (e) => setPostText(e.target.value) }/>
                <button onClick={ () => setPrivatePost(!privatePost) }>Public/Private</button>
                <button onClick={ addPost }>Submit/Save</button>
            </section>
        </div>
    )
}

export default PostOverlay