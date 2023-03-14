import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import Header from '../../components/header/Header'
import Square from '../../components/square/Square'
import './game.scss'

type Props = {
    showCharacter: (name: string, image: string) => void
}

const Game = ({ showCharacter }: Props) => {
    /*
    const characterImage: string[] | undefined = games?.map((game) => {
        return game.Characters.Image;
    }); */

    const [character, setCharacter] = useState<[]>()
    const dispatchedGames = useSelector((state: any) => state.games)

    useEffect(() => {
        setCharacter(dispatchedGames)
    }, [dispatchedGames])

    const characterArray: any = []

    const characterMap = character?.map((game: any, i: number) => {
        if (i === 1) {
            game.Characters.map((character: any) => {
                characterArray.push({ name: character.Name, image: character.Image })
            })
        }
    })

    //char används inte? pröva att ändra

    return (
        <>
            <Header />
            <main className='square-wrapper'>
                {characterArray.map((char: any, i: number) => {
                    return <Square key={i} name={characterArray[i].name} image={characterArray[i].image} gameImage='' gameName='' showCharacter={showCharacter} />
                })}

            </main>
        </>
    )
}

export default Game