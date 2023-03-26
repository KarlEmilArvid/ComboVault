import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router'
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
    availableSearches: (foundNames: string[] | []) => void
    foundGames: string[];
    searching: string | undefined;
    searchFunction: (searchTerm: string) => void;
}

const Game = ({ showCharacter, games, pickGame, availableSearches, foundGames, searchFunction, searching }: Props) => {
    const [character, setCharacter] = useState<[]>()
    const dispatchedGames = useSelector((state: any) => state.games)
    const navigate = useNavigate()

    //navigerar oss till start om vi inte går från start>spel>karaktär
    useEffect(() => {
        if (!games.gameName && !games.gameImage) {
            return navigate('/')
        }
    }, [])

    useEffect(() => {
        const gameArray = dispatchedGames.Games
        setCharacter(gameArray)
    }, [dispatchedGames])

    let characterArray: any[] = []
    character?.map((game: any, i: number) => {
        game.GameTitle.map((character: any) => {
            if (games.gameName === character.Game.Name) {
                character.Characters.map((validCharacters: any) => {
                    const tempName = validCharacters.Name.slice(2);
                    if (foundGames.length > 0 && foundGames.includes(tempName)) {
                        characterArray.push({ name: validCharacters.Name, image: validCharacters.Image })
                    } else if (!foundGames.includes(tempName) && searching!.length > 0) {
                        return
                    } else if (searching!.length == 0) {
                        characterArray.push({ name: validCharacters.Name, image: validCharacters.Image })
                    }
                })
            }
        })
    })


    return (
        <>
            <Header availableSearches={availableSearches} searchFunction={searchFunction} />
            
            <div className="main-wrapper">

                <main className='square-wrapper'>
                    {characterArray.map((char: any, i: number) => {
                        if (i < characterArray.length) {
                            return <Square key={i} name={characterArray[i].name} image={characterArray[i].image} gameImage='' gameName='' showCharacter={showCharacter} pickGame={pickGame} />
                        }
                    })}
                </main>

            </div>
        </>
    )
}

export default Game