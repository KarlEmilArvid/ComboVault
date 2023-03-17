import { useState, useEffect } from 'react'
import './PostOverlay.scss'
import { doc, setDoc, getDocs, collection, getDoc, updateDoc, deleteDoc } from 'firebase/firestore'
import { db } from '../../firebase/firebase'
import { auth } from '../../firebase/firebase'

type Props = {
    overlay: boolean
    setOverlay: React.Dispatch<React.SetStateAction<boolean>>
    characterName: string
    pickedTitle: string | undefined;
    currentPost: CurrentPost;
    overlayButton: string | undefined;
    Id: number | undefined;
}

type CurrentPost = {
    postTitle: string;
    postText: string;
}

type PostType = {
    Name: string
    PostText: string | undefined
    PostTitle: string | undefined
    Private: boolean | undefined
}

const PostOverlay = ({ overlay, setOverlay, characterName, pickedTitle, currentPost, overlayButton, Id }: Props) => {
    const [showOverlay, setShowOverlay] = useState<string>('post-overlay-wrapper')
    const [postTitle, setPostTitle] = useState<string>()
    const [postText, setPostText] = useState<string>()
    const [privatePost, setPrivatePost] = useState<boolean>(true)


    useEffect(() => {
        overlay ? setShowOverlay('post-overlay-wrapper-show') : setShowOverlay('post-overlay-wrapper')

        if (overlayButton == 'Save Changes') {
            setPostTitle(currentPost.postTitle);
            setPostText(currentPost.postText);
        }

    }, [])

    const closeOverlay = () => {
        setOverlay(false)
    }

    const addPost = () => {
        if ( overlayButton == 'Save Changes' ) {

            (async () => {
                const user: string | undefined = auth.currentUser?.uid
                await updateDoc(doc(db, 'Posts', `${Id}`), {
                    User: `${user}`,
                    Name: characterName,
                    PostTitle: postTitle,
                    PostText: postText,
                    Private: privatePost,
                    PostId: Id
                })
                setOverlay(false)
            })()
        }

        if ( overlayButton == 'Create Post' ) {

            const postId = Math.random() * 1000 ** 100;

            (async () => {
                const user: string | undefined = auth.currentUser?.uid
                await setDoc(doc(db, 'Posts', `${postId}`), {
                    User: `${user}`,
                    Name: characterName,
                    PostTitle: postTitle,
                    PostText: postText,
                    Private: privatePost,
                    PostId: postId
                })
                setOverlay(false)
            })()
        }

        if ( overlayButton == 'Delete' ) {

            (async () => {

                await deleteDoc(doc(db, 'Posts', `${Id}`));
                setOverlay(false)
            })()
        
        }
    }

    return (
        <div className={showOverlay}>
            <button className="close-button" onClick={closeOverlay}>X</button>
            <section className="create-post-container">
                { overlayButton == 'Save Changes' || overlayButton == 'Create Post' ?
                <>
                    <h2>{ pickedTitle }</h2>
                    <input type="text" placeholder='post name:' defaultValue={ currentPost.postTitle } onChange={(e) => setPostTitle(e.target.value)} />
                    <textarea className="text-input" placeholder='post text goes here...' defaultValue={currentPost.postText} onChange={(e) => setPostText(e.target.value)} />
                    <button onClick={() => setPrivatePost(!privatePost)}>Public/Private</button>
                    <button onClick={addPost}>{ overlayButton }</button>
                </>
                :
                <>
                    <button onClick={addPost}>YES</button>
                    <button onClick={ () => setOverlay(false) }>NO</button>
                </>
                }
            </section>
        </div>
    )
}

export default PostOverlay