import Header from '../../components/header/Header'
import Square from '../../components/square/Square'
import './game.scss'
import { useEffect, useState } from 'react';

type Props = {
    games: any[] | undefined;
}


const Game = ({games}: Props) => {


    return (
        <>
            <Header />
            <main className='square-wrapper'>

            </main>
        </>
    )
}

export default Game