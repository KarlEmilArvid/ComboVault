import Start from './views/start/Start'
import Game from './views/game/Game'
import Character from './views/character/Character'
import About from './views/about/About'
import { Route, Routes, useNavigate } from 'react-router-dom'
import { getDocs, collection, doc, setDoc, DocumentData } from 'firebase/firestore'
import { db } from './firebase/firebase'
//import { auth } from './firebase/firebase'
import { SetStateAction, useEffect, useState } from 'react'
import { actions as games } from './redux/gamesReducer'
import { useDispatch } from 'react-redux'
import './scss/global.scss'

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
	const dispatch = useDispatch()
	const navigate = useNavigate();

	useEffect(() => {
		(async () => {
			const querySnapshot = await getDocs(collection(db, 'Games'))
			const tempArray: any[] = [];
			querySnapshot.forEach((doc) => {
				tempArray.push(doc.data())
			})

			console.log(tempArray)
			dispatch(games.getGames(tempArray))
		})()
	}, [])

	const showCharacter = (name: string, image: string) => {
		if (name !== undefined && image !== undefined) {
			setCharacter({ characterName: name, characterImage: image })
		}
	}

	const pickGame = (name: string, image: string) => {
		setGame({ gameName: name, gameImage: image })
		navigate('/Game')
	}

	return (
		<div className='App'>
			<Routes>
				<Route path='/' element={<Start showCharacter={showCharacter} pickGame={pickGame} />} />
				<Route path='/game' element={<Game showCharacter={showCharacter} games={game} pickGame={pickGame} />} />
				<Route path='/character' element={<Character character={character} showCharacter={showCharacter} pickGame={pickGame} />} />
				<Route path='/about' element={<About />} />
			</Routes>
		</div>
	)
}

export default App