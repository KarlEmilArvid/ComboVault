import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import Header from '../../components/header/Header'
import Square from '../../components/square/Square'
import './game.scss'

type GameType = {
    gameName: string;
    gameImage: string;
}

type Props = {
    showCharacter: (name: string, image: string) => void
    games: GameType;
    pickGame: (gameName: string, gameImage: string) => void
}

const Game = ({ showCharacter, games, pickGame }: Props) => {
    const [character, setCharacter] = useState<[]>()
    const dispatchedGames = useSelector((state: any) => state.games)
    const characterArray: any = []
    

    useEffect(() => {
        setCharacter(dispatchedGames)
    }, [dispatchedGames])


    const characterMap = character?.map((game: any, i: number) => {

        if (games.gameName === game.Game.Name) {
            game.Characters.map((character: any) => {
                characterArray.push({ name: character.Name, image: character.Image })
            })
        }
    })


    return (
        <>
            <Header />
            <main className='square-wrapper'>
                {characterArray.map((char: any, i: number) => {
                    return <Square key={i} name={characterArray[i].name} image={characterArray[i].image} gameImage='' gameName='' showCharacter={showCharacter} pickGame={pickGame} />
                })}
            </main>
        </>
    )
}

export default Game