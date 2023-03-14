import { combineReducers } from 'redux';
import { reducer as gamesReducer } from './gamesReducer'
import { reducer as postsReducer } from './postsReducer'

const rootReducer: any = combineReducers({
    games: gamesReducer,
    posts: postsReducer
})

export { rootReducer }