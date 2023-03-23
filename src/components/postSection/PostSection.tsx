import { useEffect, useState } from 'react'
import { getDocs, collection, doc, getDoc } from 'firebase/firestore'
import { auth, db, signIn } from '../../firebase/firebase'
import { useDispatch, useSelector } from 'react-redux'
import { actions as posts } from '../../redux/postsReducer'
import { RootState } from "../../store";
import PostOverlay from '../postOverlay/PostOverlay'
import Post from '../post/Post'
import './PostSection.scss'

type Props = {
    name: string
    characterName: string
}

type Posts = {
    Name: string
    PostText: string
    PostTitle: string
    Private: boolean
    User: string
    PostId: number
}

type CurrentPost = {
    postTitle: string;
    postText: string;
}

const PostSection = ({ name, characterName }: Props) => {
    const [overlay, setOverlay] = useState<boolean>(false)
    //const [allPosts, setAllPosts] = useState<Posts[]>([])
    const [privatePosts, setPrivatePosts] = useState<any[]>()
    const [publicPosts, setPublicPosts] = useState<any[]>()
    const [pickedTitle, setPickedTitle] = useState<string>()
    const [overlayButton, setOverlayButton] = useState<string>()
    const [postId, setPostId] = useState<number>(0);
    const [currentPost, setCurrentPost] = useState<CurrentPost>({ postTitle: '', postText: '' });

    const overlayTitle = 'New Post';
    const currentButton = 'Create Post';

    const allPosts: Posts[] = useSelector((state: RootState) => state.posts);

    const dispatch = useDispatch()

    //TODO: flytta till app
    useEffect(() => {
        (async () => {
            const querySnapshot = await getDocs(collection(db, `${characterName}`))
            const tempArray: any[] = []
            querySnapshot.forEach((doc) => {
                tempArray.push(doc.data())
            })
            console.log("här hämtar vi posts", tempArray)
            dispatch(posts.getPosts(tempArray));

        })()
    }, [])

    const connectUser = () => {
        signIn()
    }
    

    useEffect(() => {
        const privatePost = allPosts?.filter((post: any) => post.Name === characterName && post.User === auth.currentUser?.uid && post.Private)
        setPrivatePosts(privatePost)
        const publicPost = allPosts?.filter((post: any) => post.Name === characterName && !post.Private)
        setPublicPosts(publicPost)
    }, [characterName, allPosts, overlay])

    const openOverlay = (overlayTitle: string, post: CurrentPost, currentButton: string, Id: number) => {
        setPickedTitle(overlayTitle);
        setOverlayButton(currentButton);
        setCurrentPost(post);
        setPostId(Id);
        setOverlay(true);
    }

    return (
        <div className="posts-wrapper--border">
            <section className="posts-wrapper">
                <h2>{name}</h2>
                <ul className='posts-list'>
                    {
                        name === 'My Posts' ? privatePosts?.map((post, i) => {
                            return (
                                <Post key={i} name={name} PostTitle={privatePosts[i].PostTitle} PostText={privatePosts[i].PostText} openOverlay={openOverlay} Id={privatePosts[i].PostId} />
                            )
                        })
                            :
                            name === 'Public Posts' ? publicPosts?.map((post, i) => {
                                return (
                                    <Post key={i} name={name} PostTitle={publicPosts[i].PostTitle} PostText={publicPosts[i].PostText} openOverlay={openOverlay} Id={publicPosts[i].PostId} />
                                )
                            })
                                : null
                    }
                </ul>
                {auth.currentUser?.uid != undefined ?
                    <section className="new-post-button--border">

                        <button onClick={() => openOverlay(overlayTitle, { postText: '', postTitle: '' }, currentButton, postId)} className='new-post-button'>New Post</button>

                    </section>
                    :
                    <section className="posts-wrapper--loggedout">
                        <section className="sign-in-button--border">
                            <button onClick={connectUser} className="sign-in-button">Sign in</button>
                        </section>
                    </section>
                }
                {
                    overlay ?
                        <PostOverlay characterName={characterName} overlay={overlay} setOverlay={setOverlay} pickedTitle={pickedTitle} currentPost={currentPost} overlayButton={overlayButton} Id={postId} />
                        :
                        null
                }
            </section>
        </div>
    )
}

export default PostSection