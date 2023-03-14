import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import Header from '../../components/header/Header'
import Square from '../../components/square/Square'
import './start.scss'

type Props = {
    showCharacter: (name: string, image: string) => void;
}

const Start = ({ showCharacter }: Props) => {
    const [games, setGames] = useState<[]>()

    const dispatchedGames = useSelector((state: any) => state.games)

    useEffect(() => {
        setGames(dispatchedGames)
    }, [dispatchedGames])

    console.log(games)

    const gameImage: string[] | undefined = games?.map((game: any) => {
        return game.Game.Image;
    })

    const gameName: string[] | undefined = games?.map((name: any) => {
        return name.Game.Name;
    })

    return (
        <>
            <Header />
            <main className='square-wrapper'>
                {
                    games?.map((square: any, i: number) => {
                        return <Square key={i} gameImage={gameImage![i]} gameName={gameName![i]} name='' image='' showCharacter={showCharacter} />
                    })
                }
            </main>
        </>
    )
}

export default Start