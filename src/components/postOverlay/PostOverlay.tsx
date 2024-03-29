import { useState, useEffect } from 'react'
import { doc, setDoc, updateDoc, deleteDoc, getDocs, collection } from 'firebase/firestore'
import { db, auth } from '../../firebase/firebase'
import { useDispatch } from 'react-redux'
import { actions as posts } from '../../redux/postsReducer'
import './PostOverlay.scss'

type Props = {
    overlay: boolean
    setOverlay: React.Dispatch<React.SetStateAction<boolean>>
    characterName: string
    pickedTitle: string | undefined
    currentPost: CurrentPost
    overlayButton: string | undefined
    Id: number | undefined
}

type CurrentPost = {
    postTitle: string
    postText: string
}

/* TODO: ta bort?
type PostType = {
    Name: string
    PostText: string | undefined
    PostTitle: string | undefined
    Private: boolean | undefined
}
*/

const PostOverlay = ({ overlay, setOverlay, characterName, pickedTitle, currentPost, overlayButton, Id }: Props) => {
    const [showOverlay, setShowOverlay] = useState<string>('post-overlay-wrapper')
    const [postTitle, setPostTitle] = useState<string>()
    const [postText, setPostText] = useState<string>()
    const [privatePost, setPrivatePost] = useState<boolean>(true)
    const [activeButton, setActiveButton] = useState<string>('post-button')
    const [formSubmitted, setFormSubmitted] = useState(false)
    const dispatch = useDispatch()

    useEffect(() => {
        overlay ? setShowOverlay('post-overlay-wrapper-show') : setShowOverlay('post-overlay-wrapper')
        if (overlayButton == 'Save Changes') {
            setPostTitle(currentPost.postTitle)
            setPostText(currentPost.postText)
        }
    }, [])

    useEffect(() => {
        privatePost ? setActiveButton('post-button-active') : setActiveButton('post-button')
    }, [privatePost])

    const closeOverlay = () => {
        window.scrollTo(0, 0);
        setOverlay(false)
    }

    const addPost = () => {
        if (overlayButton == 'Delete') {
            (async () => {
                await deleteDoc(doc(db, `${characterName}`, `${Id}`))
                getAllPosts()
            })()
            window.scrollTo(0, 0);
            setOverlay(false)
        }
        // Validation logic for post title and post text
        setFormSubmitted(true)
        if (!postTitle?.trim()) {
            console.log('please add post title')
            return
        }

        if (!postText?.trim()) {
            console.log('please add post text')
            return
        }

        if (overlayButton == 'Create Post') {
            const postId = Math.random() * 1000 ** 100
            const date = new Date()
            const fullDate = `${date.toLocaleDateString()}` + ' ' + `${date.toLocaleTimeString()}`;
            (async () => {
                const user: string | undefined = auth.currentUser?.uid
                await setDoc(doc(db, `${characterName}`, `${postId}`), {
                    User: `${user}`,
                    Name: characterName,
                    PostTitle: postTitle,
                    PostText: postText,
                    Private: privatePost,
                    PostId: postId,
                    CreatedAt: fullDate
                })
                dispatch(posts.createPosts({
                    User: `${user}`,
                    Name: characterName,
                    PostTitle: postTitle,
                    PostText: postText,
                    Private: privatePost,
                    PostId: Id,
                    CreatedAt: fullDate
                }))
                getAllPosts()
            })()
            window.scrollTo(0, 0);
            setOverlay(false)
        }

        if (overlayButton == 'Save Changes') {
            const date = new Date()
            const fullDate = `${date.toLocaleDateString()}` + ' ' + `${date.toLocaleTimeString()}`;
            (async () => {
                const user: string | undefined = auth.currentUser?.uid
                await updateDoc(doc(db, `${characterName}`, `${Id}`), {
                    User: `${user}`,
                    Name: characterName,
                    PostTitle: postTitle,
                    PostText: postText,
                    Private: privatePost,
                    PostId: Id,
                    CreatedAt: fullDate
                })
                getAllPosts()
            })()
            window.scrollTo(0, 0);
            setOverlay(false)
        }
    }

    const getAllPosts = () => {
        (async () => {
            const querySnapshot = await getDocs(collection(db, `${characterName}`))
            const tempArray: any[] = []
            querySnapshot.forEach((doc) => {
                tempArray.push(doc.data())
            })
            tempArray.sort((a: any, b: any) => {
                if (a.CreatedAt <= b.CreatedAt) {
                    return b.CreatedAt <= a.CreatedAt ? -1 : 1
                } else {
                    return a.CreatedAt > b.CreatedAt ? -1 : 1
                }
            })
            dispatch(posts.getPosts(tempArray))
        })()
    }

    return (
        <div className={showOverlay}>
            <button className='close-button' onClick={closeOverlay}>X</button>
            <section className='create-post-container'>
                {overlayButton == 'Save Changes' || overlayButton == 'Create Post' ?
                    <>
                        <h2>{pickedTitle}</h2>
                        <section className='input-border'>
                            <input type='text' placeholder='post name:' defaultValue={currentPost.postTitle} onChange={(e) => setPostTitle(e.target.value)} />
                        </section>
                        {(formSubmitted && !postTitle?.trim()) && <div className='alert'>Please enter a post title.</div>}
                        <section className='text-border'>
                            <textarea className='text-input' placeholder='post text goes here...' defaultValue={currentPost.postText} onChange={(e) => setPostText(e.target.value)} />
                        </section>
                        {(formSubmitted && !postText?.trim()) && <div className='alert'>Please enter a post text.</div>}
                        <section className='overlay-button-section'>
                            <button className={activeButton} onClick={() => setPrivatePost(!privatePost)}><span>Public</span> / <span>Private</span></button>
                        </section>
                        <section className='create-button--border'>
                            <button className='overlay-buttons' onClick={addPost}>{overlayButton}</button>
                        </section>
                    </>
                    :
                    <section className='delete-section'>
                        <section className='delete-button--border'>
                            <button className='overlay-buttons' onClick={addPost}>Delete post</button>
                        </section>
                        <section className='delete-button--border'>
                            <button className='overlay-buttons' onClick={() => setOverlay(false)}>Keep post</button>
                        </section>
                    </section>
                }
            </section>
        </div>
    )
}

export default PostOverlay