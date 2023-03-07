import { Route, Routes } from 'react-router-dom'
import './scss/global.scss'
import Start from './views/start/Start'
import Game from './views/game/Game'
import Character from './views/character/Character'
import About from './views/about/About'
import { getDocs, collection, doc } from 'firebase/firestore';
import { db } from './firebase/firebase';
import { useEffect, useState } from 'react';

function App() {

  const [ games, setGames ] = useState<any[]>();
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



  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Start games={games}/>} />
        <Route path='/game' element={<Game games={games}/>} />
        <Route path='/character' element={<Character />} />
        <Route path='/about' element={<About />} />
      </Routes>
    </div>
  )
}

export default App