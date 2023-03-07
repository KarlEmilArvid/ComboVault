import Header from '../../components/header/Header'
import Square from '../../components/square/Square'
import './game.scss'
import { useEffect, useState } from 'react';

type Props = {
    games: any[] | undefined;
}

const Game = ({games}: Props) => {
    /*
    const characterImage: string[] | undefined = games?.map((game) => {
        return game.Characters.Image;
    }); */

    const characterArray: any = [];

    const gameCharacters: any = games?.map((game, i) => {
        if ( i === 1) {
            game.Characters.map((character: any) => {
                characterArray.push({name: character.Name, image: character.Image})
            });
        }
    })

    console.log(characterArray);


    return (
        <>
            <Header />
            <main className='square-wrapper'>
                { characterArray.map((char: any, i: any) => {
                    return <Square key={i} name={characterArray[i].name} image={characterArray[i].image} gameImage='' gameName=''/>
                }) }

            </main>
        </>
    )
}

export default Game