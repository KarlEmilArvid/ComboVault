import Header from '../../components/header/Header'
import Square from '../../components/square/Square'
import './start.scss'
import { useEffect, useState } from 'react';

type Props = {
    games: any[] | undefined;
}

const Start = ({games}: Props) => {

    const gameName = games?.map((game) => {
        game.map(() => {
            //hej
        });
    })

    return (
        <>
            <Header />
            <main className='square-wrapper'>
                {
                    games?.map((square, index) => {
                        return <Square key={index}/>
                    })
                }
            </main>
        </>
    )
}

export default Start