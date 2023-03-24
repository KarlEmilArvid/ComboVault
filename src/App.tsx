import Start from './views/start/Start'
import Game from './views/game/Game'
import Character from './views/character/Character'
import About from './views/about/About'
import { Route, Routes, useNavigate } from 'react-router-dom'
//import { getDocs, collection, doc, setDoc, DocumentData } from 'firebase/firestore'
//import { db } from './firebase/firebase'
//import { auth } from './firebase/firebase'
import { useEffect, useState } from 'react'
import { actions as games } from './redux/gamesReducer'
import { useDispatch } from 'react-redux'
import './scss/global.scss'
import gamesDatabase from './firebase/gamesDatabase.json'

type CharacterType = {
	characterName: string;
	characterImage: string;
}

type GameType = {
	gameName: string;
	gameImage: string;
}

function App() {
	const [character, setCharacter] = useState<CharacterType>({ characterName: '', characterImage: '' })
	const [game, setGame] = useState<GameType>({ gameName: '', gameImage: '' })
	const [ foundGames, setFoundGames ] = useState<string[]>(['']);
	const dispatch = useDispatch()
	const navigate = useNavigate();

	useEffect(() => {
		dispatch(games.getGames(gamesDatabase))
	}, [])

	const showCharacter = (name: string, image: string) => {
		if (name !== undefined && image !== undefined) {
			setCharacter({ characterName: name, characterImage: image })
		}
	}

	const pickGame = (name: string, image: string) => {
		setGame({ gameName: name, gameImage: image })
		navigate(`/${name?.replace(/\s+/g, '-')}`);
	}

	const availableSearches = (foundNames: string[]) => {
        setFoundGames(foundNames);
    }

	return (
		<div className='App'>
			<Routes>
				<Route path='/' element={<Start showCharacter={showCharacter} pickGame={pickGame} availableSearches={availableSearches} foundGames={foundGames} />} />
				<Route path='/:game' element={<Game showCharacter={showCharacter} games={game} pickGame={pickGame} availableSearches={availableSearches} foundGames={foundGames} />} />
				<Route path='/:game/:character' element={<Character character={character} showCharacter={showCharacter} pickGame={pickGame} availableSearches={availableSearches} />} />
				<Route path='/about' element={<About />} />
			</Routes>
		</div>
	)
}

export default App