import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { GAME } from '../../types/types'
import Header from '../../components/header/Header'
import Square from '../../components/square/Square'

type Props = {
    showCharacter: (name: string, image: string) => void
    pickGame: (gameName: string, gameImage: string) => void
    foundGames: string[];
    availableSearches: (foundNames: string[] | []) => void
    searching: string | undefined;
    searchFunction: (searchTerm: string) => void;
}

const Start = ({ showCharacter, pickGame, availableSearches, foundGames, searchFunction, searching }: Props) => {
    const [games, setGames] = useState<GAME>()
    const dispatchedGames = useSelector((state: any) => state.games)

    console.log(foundGames);

    useEffect(() => {
        const gameArray = dispatchedGames.Games
        setGames(gameArray)
    }, [dispatchedGames])

    let gameNamesImages: any[] = []
    games?.map((game: any) => {
        game.GameTitle.map((game: any) => {
            if (foundGames.length > 0 && foundGames.includes(game.Game.Name)) {
                gameNamesImages.push({ name: game.Game.Name, image: game.Game.Image })
            } else if (!foundGames.includes(game.Game.Name) && searching!.length > 0) {
                return
            } else if (searching!.length == 0) {
                gameNamesImages.push({ name: game.Game.Name, image: game.Game.Image })
            }
        })
        return gameNamesImages
    })

    const gamesSorted = gameNamesImages.sort((a: any, b: any) => {
        if (b.name <= a.name) {
            return a.name <= b.name ? -1 : 1;
        } else {
            return b.name > a.name ? -1 : 1;
        }
    });
    

    return (
        <>
            <Header availableSearches={availableSearches} searchFunction={searchFunction}/>

            <div className="main-wrapper">

                <main className='square-wrapper'>
                    {
                        games?.map((square: any, i: number) => {
                            if (i < gamesSorted.length) {
                                return <Square key={i} gameImage={gamesSorted[i].image} gameName={gamesSorted[i].name} name='' image='' showCharacter={showCharacter} pickGame={pickGame} />
                            }
                        })
                    }
                </main>
                
            </div>
        </>
    )
}

export default Start