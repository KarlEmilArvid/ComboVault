import './search.scss'
import search from '../../images/search.svg';
import { useEffect, useState } from 'react';


type Props = {
    allGames: any[];
}

const Search = ({ allGames }: Props) => {

    const [searching, setSearching] = useState<boolean>(false);
    const [ searchTerm, setSearchTerm ] = useState<string>('');
    
    useEffect(() => {
        /*const gameNames: string[] = [];
        allGames?.map((gameArray: any) => {
            gameArray.GameTitle.map((game: any) => {
                    gameNames.push(game.Game.Name);
            })
        })*/

        const gameNames: string[] = [];
        allGames?.map((gameArray: any) => {
            gameArray.GameTitle.map((game: any) => {
                gameNames.push(game.Game.Name);
            })
        })
        const characterNames: string[] = [];
        allGames?.map((charactersArray: any) => {
            charactersArray.GameTitle.map((game: any) => {
                game.Characters.map((character: any) => {
                    characterNames.push(character.Name);
                })
            })
        })

        console.log(characterNames)
    }, [searchTerm]);

    return (
        <section className="search_wrapper">
            <section className="search_toggle">
                <img onClick={ () => setSearching(!searching) } src={ search } alt="" />
                {
                    searching ?
                    <input type="text" onChange={ () => setSearchTerm(searchTerm) } />
                    :
                    null
                }
            </section>
        </section>
    )
}

export default Search