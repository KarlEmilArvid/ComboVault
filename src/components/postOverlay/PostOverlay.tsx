import { useState, useEffect } from 'react'
import { doc, setDoc, updateDoc, deleteDoc } from 'firebase/firestore'
import { db } from '../../firebase/firebase'
import { auth } from '../../firebase/firebase'
import './PostOverlay.scss'

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
    const [activeButton, setActiveButton] = useState<string>('post-button')

    useEffect(() => {
        overlay ? setShowOverlay('post-overlay-wrapper-show') : setShowOverlay('post-overlay-wrapper')

        if (overlayButton == 'Save Changes') {
            setPostTitle(currentPost.postTitle);
            setPostText(currentPost.postText);
        }

    }, [])

    useEffect(() => {
        privatePost ? setActiveButton('post-button-active') : setActiveButton('post-button')
    }, [privatePost])

    const closeOverlay = () => {
        setOverlay(false)
    }

    const addPost = () => {
        if (overlayButton == 'Save Changes') {

            (async () => {
                const user: string | undefined = auth.currentUser?.uid
                await updateDoc(doc(db, `${characterName}`, `${Id}`), {
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

        if (overlayButton == 'Create Post') {

            const postId = Math.random() * 1000 ** 100;

            (async () => {
                const user: string | undefined = auth.currentUser?.uid
                await setDoc(doc(db, `${characterName}`, `${postId}`), {
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

        if (overlayButton == 'Delete') {
            (async () => {
                await deleteDoc(doc(db, `${characterName}`, `${Id}`));
                setOverlay(false)
            })()
        }
    }

    console.log(privatePost)

    return (
        <div className={showOverlay}>
            <button className="close-button" onClick={closeOverlay}>X</button>
            <section className="create-post-container">
                {overlayButton == 'Save Changes' || overlayButton == 'Create Post' ?
                    <>

                        <h2>{pickedTitle}</h2>

                        <section className="input-border">
                            <input type="text" placeholder='post name:' defaultValue={currentPost.postTitle} onChange={(e) => setPostTitle(e.target.value)} />
                        </section>

                        <section className="text-border">
                            <textarea className="text-input" placeholder='post text goes here...' defaultValue={currentPost.postText} onChange={(e) => setPostText(e.target.value)} />
                        </section>

                        <section className='button-section'>
                            <button className={activeButton} onClick={() => setPrivatePost(!privatePost)}><span>Public</span> / <span>Private</span></button>
                        </section>

                        <section className="create-button--border">
                            <button onClick={addPost}>{overlayButton}</button>
                        </section>
                    </>
                    :
                    <section className='delete-section'>

                        <section className="delete-button--border">
                            <button onClick={addPost}>YES</button>
                        </section>
                        <section className="delete-button--border">
                            <button onClick={() => setOverlay(false)}>NO</button>
                        </section>
                    </section>
                }
            </section>
        </div>
    )
}

export default PostOverlay