import './search.scss'
import searchIcon from '../../images/search.svg';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router';


type Props = {
    allGames: any[];
    availableSearches: (foundNames: string[] | []) => void
}

const Search = ({ allGames, availableSearches }: Props) => {

    const [searching, setSearching] = useState<boolean>(false);
    const [ searchTerm, setSearchTerm ] = useState<string>('');
    const [ searchQuery, setSearchQuery ] = useState<string[]>([]);
    const [ foundNames, setFoundNames ] = useState<string[]>([]);
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
                            const characterName = character.Name.slice(2);
                            characterNames.push(characterName);
                        })
                    }
                })
            })

            setSearchQuery(characterNames);
        }

    }, [param]);

    useEffect(() => {

        if ( searchQuery?.length > 0 ) {
            const names: string[] = [];
            searchQuery?.forEach((query) => {

                const tempString = searchTerm.toLowerCase();
                const tempQuery = query.toLowerCase();

                if ( tempQuery.substring(0, searchTerm.length) == tempString.substring(0, searchTerm.length) ) {
                    names.push(query);
                }
            })

            setFoundNames(names);
    
        }

    }, [searchTerm]);
    
    useEffect(() => {

        availableSearches(foundNames);

    }, [foundNames]);


    return (
        <section className="search_wrapper">
            <section className="search_toggle">
                <img onClick={ () => setSearching(!searching) } src={ searchIcon } alt="" />
                {
                    searching ?
                    <input type="text" onChange={ (e) => setSearchTerm(e.target.value) } />
                    :
                    null
                }
            </section>
        </section>
    )
}

export default Search