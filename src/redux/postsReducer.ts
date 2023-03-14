import { createAction, createReducer } from "@reduxjs/toolkit";

//Reducer
let initialState: string = 'games';
const checkGames = createAction('check games');
const actions = { checkGames, }

//hämta posts

const reducer = createReducer(initialState, {
    [checkGames.toString()]: (state, action) => {
        let checkGames = 'något något annat'
        return checkGames
    }
})

export { reducer, actions }