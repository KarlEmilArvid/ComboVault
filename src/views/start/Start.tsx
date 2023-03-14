import Header from '../../components/header/Header'
import Square from '../../components/square/Square'
import './start.scss'

type Props = {
    games: any[] | undefined;
    showCharacter: (name: string, image: string) => void;
}

const Start = ({ games, showCharacter }: Props) => {

    const gameImage: string[] | undefined = games?.map((game) => {
        return game.Game.Image;
    })

    const gameName: string[] | undefined = games?.map((name) => {
        return name.Game.Name;
    })

    return (
        <>
            <Header />
            <main className='square-wrapper'>
                {
                    games?.map((square, i) => {
                        return <Square key={i} gameImage={gameImage![i]} gameName={gameName![i]} name='' image='' showCharacter={showCharacter} />
                    })
                }
            </main>
        </>
    )
}

export default Start