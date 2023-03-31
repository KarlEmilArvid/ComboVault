import { createAction, createReducer } from '@reduxjs/toolkit'

type Posts = {
    Name: string;
    PostText: string | undefined;
    PostTitle: string | undefined;
    Private: boolean;
    User: string;
    PostId: number | undefined;
    CreatedAt: string;
}

//Reducer
let initialState: Posts[] = []
const getPosts = createAction<Posts[]>('get posts')
const createPosts = createAction<Posts>('create posts')
const actions = { getPosts, createPosts }

const reducer = createReducer(initialState, {
    [getPosts.toString()]: (state, action) => {
        state = action.payload

        return state
    },
    [createPosts.toString()]: (state, action) => {
        const newPosts: Posts[] = [...state, action.payload]

        return newPosts
    }
})

export { reducer, actions }