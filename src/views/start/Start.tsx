import Header from '../../components/header/Header'
import Square from '../../components/square/Square'
import './start.scss'
import { useEffect, useState } from 'react';

type Props = {
    games: any[] | undefined;
}

const Start = ({games}: Props) => {

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
                        return <Square key={i} gameImage={gameImage![i]} gameName={gameName![i]} name='' image=''/>
                    })
                }
            </main>
        </>
    )
}

export default Start