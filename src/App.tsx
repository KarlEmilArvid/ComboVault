import { Route, Routes } from 'react-router-dom'
import './scss/global.scss'
import Start from './views/start/Start'
import Game from './views/game/Game'
import Character from './views/character/Character'
import About from './views/about/About'

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Start />} />
        <Route path='/game' element={<Game />} />
        <Route path='/character' element={<Character />} />
        <Route path='/about' element={<About />} />
      </Routes>
    </div>
  )
}

export default App