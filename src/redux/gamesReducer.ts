import { createAction, createReducer } from '@reduxjs/toolkit'
import { collection, getDocs } from 'firebase/firestore'
import { db } from '../firebase/firebase'
import { GAMES } from '../types/types'

type GameItems = {
    characters: [
        {
            Image: string,
            Information: string,
            Intro: string,
            Name: string
        }
    ],
    game: {
        Image: string,
        Information: string,
        Name: string
    },
}
/*
type GAMES = {
    Games: {
        GameTitle: {
            Characters: {
                Image: string;
                Information: string;
                Intro: string;
                Name: string;
            }[]
            Game: {
                Image: string;
                Information: string;
                Name: string;
            }
        }[]
    }[]
}
*/
//Reducer
let initialState: [] = [];
//hämta games här, all data från alla spel
const getGames = createAction<GAMES>('namngivning utav actionet')
const actions = { getGames, }

console.log(initialState)

//hämta character{}

const reducer = createReducer(initialState, {
    [getGames.toString()]: (state, action) => {
        console.log(action.payload)
        state = action.payload

        return state
    }
})

export { reducer, actions }