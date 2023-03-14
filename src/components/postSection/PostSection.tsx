import { useEffect, useState } from 'react';
import Post from '../post/Post'
import PostOverlay from '../postOverlay/PostOverlay'
import './PostSection.scss'
import { getDocs, collection } from 'firebase/firestore';
import { db } from '../../firebase/firebase';

type Props = {
    name: string;
    characterName: string;
}

const PostSection = ({ name, characterName }: Props) => {

    const [overlay, setOverlay] = useState<boolean>(false);
    const [posts, setPosts] = useState<any[]>();
    const [privatePosts, setPrivatePosts] = useState<any[]>();
    const [publicPosts, setPublicPosts] = useState<any[]>();

    useEffect(() => {

        (async () => {
            const querySnapshot = await getDocs(collection(db, "Posts"));
            const tempArr: any[] = [];
            querySnapshot.forEach((doc: any) => {
                tempArr.push(doc.data());
            });

            setPosts(tempArr);
        })();

    }, [characterName, overlay]);


    useEffect(() => {
        const privatePost = posts?.filter(post => post.Name === characterName && post.Private);
        setPrivatePosts(privatePost);
        const publicPost = posts?.filter(post => post.Name === characterName && !post.Private);
        setPublicPosts(publicPost);
    }, [characterName, posts]);


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
                            <Post key={i} PostTitle={post.PostTitle} PostText={post.PostText} />
                        )
                    })
                        :
                        name === 'Public Posts' ? publicPosts?.map((post, i) => {
                            return (
                                <Post key={i} PostTitle={post.PostTitle} PostText={post.PostText} />
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