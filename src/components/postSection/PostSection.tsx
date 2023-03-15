import { useEffect, useState } from 'react';
import { getDocs, collection } from 'firebase/firestore';
import { db } from '../../firebase/firebase';
import { useDispatch, useSelector } from 'react-redux';
import PostOverlay from '../postOverlay/PostOverlay'
import Post from '../post/Post'
import './PostSection.scss'
import { actions as posts } from '../../redux/postsReducer';

type Props = {
    name: string;
    characterName: string;
}

type Posts = {
    Name: string;
    PostText: string;
    PostTitle: string;
    Private: boolean;
    User: string;
}

const PostSection = ({ name, characterName }: Props) => {

    const [overlay, setOverlay] = useState<boolean>(false);
    const [allPosts, setAllPosts] = useState<Posts[]>([]);
    const [privatePosts, setPrivatePosts] = useState<any[]>();
    const [publicPosts, setPublicPosts] = useState<any[]>();

    const dispatch = useDispatch();

    useEffect(() => {
		(async () => {
			const querySnapshot = await getDocs(collection(db, 'Posts'))
			const tempArray: any[] = [];
			querySnapshot.forEach((doc) => {
				tempArray.push(doc.data())
			})
            dispatch(posts.getPosts(allPosts))
            setAllPosts(tempArray);
		})()

	}, [])


    useEffect(() => {
        const privatePost = allPosts?.filter(post => post.Name === characterName && post.Private);
        setPrivatePosts(privatePost);
        const publicPost = allPosts?.filter(post => post.Name === characterName && !post.Private);
        setPublicPosts(publicPost);
    }, [characterName, allPosts]);


    const openOverlay = () => {
        setOverlay(true);

    }


    return (
        <section className="posts-wrapper">
            <h2>{name}</h2>
            <ul className='posts-list'>
                {
                    name === 'My Posts' ? privatePosts?.map((post, i) => {
                        return (
                            <Post key={i} PostTitle={privatePosts[i].PostTitle} PostText={privatePosts[i].PostText}/>
                        )
                    })
                        :
                        name === 'Public Posts' ? publicPosts?.map((post, i) => {
                            return (
                                <Post key={i} PostTitle={publicPosts[i].PostTitle} PostText={publicPosts[i].PostText}/>
                            )
                        })
                            : null
                }
            </ul>
            <button onClick={openOverlay} className='new-post-button'>New Post</button>
            {
                overlay ?
                    <PostOverlay characterName={characterName} overlay={overlay} setOverlay={setOverlay} />
                    :
                    null
            }
        </section>
    )
}

export default PostSection

