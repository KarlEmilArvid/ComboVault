import { createAction, createReducer } from '@reduxjs/toolkit'
import { GAMES } from '../types/types'

//Reducer
let initialState: [] = []
const getGames = createAction<GAMES>('namngivning utav actionet')
const actions = { getGames, }

const reducer = createReducer(initialState, {
    [getGames.toString()]: (state, action) => {
        console.log(action.payload)
        state = action.payload

        return state
    }
})

export { reducer, actions }