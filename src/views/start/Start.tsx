import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { GAME } from '../../types/types'
import Header from '../../components/header/Header'
import Square from '../../components/square/Square'
import './start.scss'

type Props = {
    showCharacter: (name: string, image: string) => void
    pickGame: (gameName: string, gameImage: string) => void
}

const Start = ({ showCharacter, pickGame }: Props) => {
    const [games, setGames] = useState<GAME>()
    const dispatchedGames = useSelector((state: any) => state.games)

    useEffect(() => {
        const gameArray = dispatchedGames.Games
        setGames(gameArray)
    }, [dispatchedGames])

    let gameImages: string[] = []
    games?.map((game: any) => {
        game.GameTitle.map((game: any) => {
            gameImages.push(game.Game.Image)
        })
        return gameImages
    })

    let gameNames: string[] = []
    games?.map((game: any) => {
        game.GameTitle.map((game: any) => {
            gameNames.push(game.Game.Name)
        })
        return gameNames
    })

    return (
        <>
            <Header />
            <main className='square-wrapper'>
                {
                    games?.map((square: any, i: number) => {
                        return <Square key={i} gameImage={gameImages![i]} gameName={gameNames![i]} name='' image='' showCharacter={showCharacter} pickGame={pickGame} />
                    })
                }
            </main>
        </>
    )
}

export default Start