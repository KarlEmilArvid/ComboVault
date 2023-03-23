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
const actions = { getPosts, createPosts }

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
    }
})

export { reducer, actions }