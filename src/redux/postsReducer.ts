import { createAction, createReducer } from '@reduxjs/toolkit'

type Posts = {
    Name: string;
    PostText: string;
    PostTitle: string;
    Private: boolean;
    User: string;
}

//Reducer
let initialState: string = 'get posts'
const getPosts = createAction<Posts[]>('get posts')
const actions = { getPosts, }

//hämta posts

const reducer = createReducer(initialState, {
    [getPosts.toString()]: (state, action) => {
        state = action.payload

        return state
    }
})

export { reducer, actions }