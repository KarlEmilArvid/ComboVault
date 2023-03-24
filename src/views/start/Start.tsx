import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { GAME } from '../../types/types'
import Header from '../../components/header/Header'
import Square from '../../components/square/Square'
import './start.scss'

type Props = {
    showCharacter: (name: string, image: string) => void
    pickGame: (gameName: string, gameImage: string) => void
    foundGames: string[];
    availableSearches: (foundNames: string[] | []) => void
}

const Start = ({ showCharacter, pickGame, availableSearches, foundGames }: Props) => {
    const [games, setGames] = useState<GAME>()
    const dispatchedGames = useSelector((state: any) => state.games)

    console.log(foundGames);

    useEffect(() => {
        const gameArray = dispatchedGames.Games
        setGames(gameArray)
    }, [dispatchedGames])

    let gameImages: string[] = []
    games?.map((game: any) => {
        game.GameTitle.map((game: any) => {
            if (foundGames.length > 0 && foundGames.includes(game.Game.Name)) {
                gameImages.push(game.Game.Image)
            } else if (foundGames.length == 0) {
                gameImages.push(game.Game.Image)
            }
        })
        return gameImages
    })

    let gameNames: string[] = []
    games?.map((game: any) => {
        game.GameTitle.map((game: any) => {
            if (foundGames.length > 0 && foundGames.includes(game.Game.Name)) {
                gameNames.push(game.Game.Name)
            } else if (foundGames.length == 0) {
                gameNames.push(game.Game.Name)
            }
        })
        return gameNames
    })


    return (
        <>
            <Header availableSearches={availableSearches} />
            <main className='square-wrapper'>
                {
                    games?.map((square: any, i: number) => {
                        if (i < gameNames.length) {
                            return <Square key={i} gameImage={gameImages![i]} gameName={gameNames![i]} name='' image='' showCharacter={showCharacter} pickGame={pickGame} />
                        }
                    })
                }
            </main>
        </>
    )
}

export default Start