import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router'
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

    console.log(games.gameName)
    const param = useParams();


    useEffect(() => {
        const gameArray = dispatchedGames.Games
        console.log("här är vår gameArray:", gameArray)
        setCharacter(gameArray)
        //setCharacter(dispatchedGames)
    }, [dispatchedGames])
    /*
        const characterArray: any = []
    
        const characterMap = character?.map((game: any, i: number) => {
    
            if (games.gameName === game.Game.Name) {
                game.Characters.map((character: any) => {
                    characterArray.push({ name: character.Name, image: character.Image })
                })
            }
        })
    */

    //games == vad vi klickat
    //game.Game.Name == databas

    console.log(character)

    let characterArray: any[] = []
    character?.map((game: any, i: number) => {
        game.GameTitle.map((character: any) => {
            if (games.gameName === character.Game.Name) {
                character.Characters.map((validCharacters: any) => {
                    console.log(validCharacters.Name)
                    console.log("check", validCharacters.Name)
                    characterArray.push({ name: validCharacters.Name, image: validCharacters.Image })
                })
            }
        })
    })

    console.log("character array här", characterArray)

    //char används inte? pröva att ändra

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