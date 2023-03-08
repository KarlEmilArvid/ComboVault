import { Route, Routes } from 'react-router-dom'
import './scss/global.scss'
import Start from './views/start/Start'
import Game from './views/game/Game'
import Character from './views/character/Character'
import About from './views/about/About'
import { getDocs, collection, doc } from 'firebase/firestore';
import { db } from './firebase/firebase';
import { useEffect, useState } from 'react';

type CharacterType = {
	characterName: string;
	characterImage: string;
}

function App() {

	const [games, setGames] = useState<any[]>();
	const [character, setCharacter] = useState<CharacterType>();

	// Hämtar questions från firebase databasen
	useEffect(() => {
		(async () => {
			const querySnapshot = await getDocs(collection(db, "Games"));
			const tempArr: any[] = [];
			querySnapshot.forEach((doc) => {
				tempArr.push(doc.data());
			});

			setGames(tempArr);
		})();
	}, []);

	const showCharacter = (name: string, image: string) => {
		setCharacter({ characterName: name, characterImage: image });
	}



	return (
		<div className="App">
			<Routes>
				<Route path='/' element={<Start games={games} showCharacter={showCharacter}/>} />
				<Route path='/game' element={<Game games={games} showCharacter={showCharacter}/>} />
				<Route path='/character' element={<Character character={character} showCharacter={showCharacter}/>} />
				<Route path='/about' element={<About />} />
			</Routes>
		</div>
	)
}

export default App