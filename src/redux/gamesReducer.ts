import { createAction, createReducer } from '@reduxjs/toolkit'
//import { collection, getDocs } from 'firebase/firestore'
//import { db } from '../firebase/firebase'
import { GAMES } from '../types/types'

//Reducer
let initialState: [] = [];
//hämta games här, all data från alla spel
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