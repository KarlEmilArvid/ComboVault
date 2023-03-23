import { createAction, createReducer } from '@reduxjs/toolkit'

type Posts = {
    Name: string;
    PostText: string | undefined;
    PostTitle: string | undefined;
    Private: boolean;
    User: string;
    PostId: number | undefined;
}

//Reducer
let initialState: Posts[] = [];
const getPosts = createAction<Posts[]>('get posts');
const createPosts = createAction<Posts>('create posts');
const updatePosts = createAction<Posts>('update posts');
const actions = { getPosts, createPosts, updatePosts }

//hämta posts

const reducer = createReducer(initialState, {
    [getPosts.toString()]: (state, action) => {
        state = action.payload

        return state
    },
    [createPosts.toString()]: (state, action) => {

        const newPosts: Posts[] = [...state, action.payload];
        console.log(newPosts);
        return newPosts;
    },
    [updatePosts.toString()]: (state, action) => {

        const stateCopy = [...state];

        const newPosts = stateCopy.forEach((post) => {
            if (post.PostId === action.payload.PostId) {
                post.User = action.payload.User,
                post.Name = action.payload.Name,
                post.PostTitle = action.payload.PostTitle,
                post.PostText = action.payload.PostText,
                post.Private = action.payload.PrivatePost,
                post.PostId = action.payload.Id
            }
        })

        return newPosts;

    }
})

export { reducer, actions }