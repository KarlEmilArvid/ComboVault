import { useEffect, useState } from 'react';
import Post from '../post/Post'
import PostOverlay from '../postOverlay/PostOverlay'
import './PostSection.scss'

type Props = {
    name: string;
    characterName: string;
    games: any[] | undefined;
}

const PostSection = ({ name, characterName, games }: Props) => {

    const [postArray, setPostArray] = useState<any[]>()
    const [ overlay, setOverlay ] = useState<boolean>(false);

    useEffect(() => {
        games?.map((game, i) => {
            if (i === 1) {
                const tempArray: any[] = []
                game.Characters.map((character: { Name: string; Posts: { MyPosts: any; PublicPosts: any; }; }) => {
                    if (character.Name === characterName && name === 'My Post') {
                        character.Posts.MyPosts.map((post: any) => {
                            tempArray.push(post)
                        })
                    }
                    else if (character.Name === characterName && name === 'Public Post') {
                        character.Posts.PublicPosts.map((post: any) => {
                            tempArray.push(post)
                        })
                    }
                })
                setPostArray(tempArray)
            }
        })
    }, [name])

    const openOverlay = () => {
        setOverlay(true);
    }

    //console.log(postArray![0][0].PostTitle)

    return (
        <section className="posts-wrapper">
            <h2>{name}</h2>
            <ul className='posts-list'>
                {postArray?.map((post, i) => {
                    return (
                        <Post key={i} PostTitle={post.PostTitle} PostText={post.PostText} />
                    )
                })
                }
            </ul>
            <button onClick={ openOverlay } className='new-post-button'>New Post</button>
            {
                overlay ?
                    <PostOverlay overlay={ overlay } setOverlay={setOverlay}/>
                    :
                    null
            }
        </section>
    )
}

export default PostSection