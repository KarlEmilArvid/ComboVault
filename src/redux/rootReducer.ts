import { combineReducers } from 'redux';
import { reducer as gamesReducer } from './gamesReducer'

const rootReducer: any = combineReducers({
    games: gamesReducer
})

export { rootReducer }