import './search.scss'
import search from '../../images/search.svg';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router';


type Props = {
    allGames: any[];
}

const Search = ({ allGames }: Props) => {

    const [searching, setSearching] = useState<boolean>(false);
    const [ searchTerm, setSearchTerm ] = useState<string>('');
    const [ searchQuery, setSearchQuery ] = useState<string[]>();
    const param = useParams();
    const paramGame = param.game?.replaceAll('-', ' ');
    
    useEffect(() => {
        if (!param.game) {

            const gameNames: string[] = [];
            allGames?.map((gameArray: any) => {
                gameArray.GameTitle.map((game: any) => {
                    gameNames.push(game.Game.Name);
                })
            })

            setSearchQuery(gameNames);

        } else if (param.game) {

            const characterNames: string[] = [];
            allGames?.map((charactersArray: any) => {
    
                charactersArray.GameTitle.map((game: any) => {
                    if (game.Game.Name == paramGame) {
    
                        game.Characters.map((character: any) => {
                            characterNames.push(character.Name);
                        })
                    }
                })
            })

            setSearchQuery(characterNames);
        }

    }, [param]);

    console.log(searchQuery);

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