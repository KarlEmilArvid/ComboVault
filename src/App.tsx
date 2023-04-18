import Start from './views/start/Start'
import Game from './views/game/Game'
import Character from './views/character/Character'
import About from './views/about/About'
import { Route, Routes, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { actions as games } from './redux/gamesReducer'
import { useDispatch } from 'react-redux'
import gamesDatabase from './firebase/gamesDatabase.json'
import './scss/global.scss'
import Footer from './components/footer/Footer'

type CharacterType = {
	characterName: string
	characterImage: string
}

type GameType = {
	gameName: string
	gameImage: string
}

function App() {
	const [character, setCharacter] = useState<CharacterType>({ characterName: '', characterImage: '' })
	const [game, setGame] = useState<GameType>({ gameName: '', gameImage: '' })
	const [foundGames, setFoundGames] = useState<string[]>([''])
	const [searching, setSearching] = useState<string | undefined>()
	const dispatch = useDispatch()
	const navigate = useNavigate()

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
		navigate(`/${name?.replace(/\s+/g, '-')}`)
	}

	const availableSearches = (foundNames: string[]) => {
		setFoundGames(foundNames)
	}

	const searchFunction = (searchTerm: string) => {
		setSearching(searchTerm)
	}

	return (
		<div className='App'>
			<Routes>
				<Route path='/' element={<Start showCharacter={showCharacter} pickGame={pickGame} availableSearches={availableSearches}
					foundGames={foundGames} searchFunction={searchFunction} searching={searching} />} />
				<Route path='/:game' element={<Game showCharacter={showCharacter} games={game} pickGame={pickGame}
					availableSearches={availableSearches} foundGames={foundGames} searchFunction={searchFunction} searching={searching} />} />
				<Route path='/:game/:character' element={<Character character={character}
					showCharacter={showCharacter} pickGame={pickGame} availableSearches={availableSearches} searchFunction={searchFunction} />} />
				<Route path='/about' element={<About />} />
			</Routes>
			<Footer />
		</div>
	)
}

export default App