import { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router';
import searchIcon from '../../images/search.svg';
import './search.scss'


type Props = {
    allGames: any[];
    availableSearches: (foundNames: string[] | []) => void
    searchFunction: (searchTerm: string) => void
    searching: boolean;
    activeSearching: () => void;
}

const Search = ({ allGames, availableSearches, searchFunction, searching, activeSearching }: Props) => {

    const [searchTerm, setSearchTerm] = useState<string>('');
    const [searchQuery, setSearchQuery] = useState<string[]>([]);
    const [foundNames, setFoundNames] = useState<string[]>([]);
    const param = useParams();
    const paramGame = param.game?.replaceAll('-', ' ');

    const ref = useRef<HTMLInputElement>(null)

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

        if (searchQuery?.length > 0) {
            const names: string[] = [];
            searchQuery?.forEach((query) => {

                const tempString = searchTerm.toLowerCase();
                const tempQuery = query.toLowerCase();

                if (tempQuery.substring(0, searchTerm.length) == tempString.substring(0, searchTerm.length)) {
                    names.push(query);
                }
            })

            setFoundNames(names);

        }

        searchFunction(searchTerm);

    }, [searchTerm]);

    useEffect(() => {

        availableSearches(foundNames);

    }, [foundNames]);

    useEffect(() => {
        if (searching === true) {
            ref.current?.focus();
        } else {
            setSearchTerm('')
        }
    }, [searching])

    return (
        <>
            {!param.character ?
                <section className="search-wrapper">
                    <section className="search-toggle">
                        <img className="search-icon" onClick={activeSearching} src={searchIcon} alt="" />
                        {
                            searching ?
                                <div className="input-border">
                                    <input ref={ref} type="text" onChange={(e) => setSearchTerm(e.target.value)} />
                                </div>
                                :
                                null
                        }
                    </section>
                </section> :
                <section className="search-wrapper-none">
                    <section className="search-toggle">
                        <img className="search-icon" onClick={activeSearching} src={searchIcon} alt="" />
                        {
                            searching ?
                                <div className="input-border">
                                    <input ref={ref} type="text" onChange={(e) => setSearchTerm(e.target.value)} />
                                </div>
                                :
                                null
                        }
                    </section>
                </section>
            }
        </>
    )
}

export default Search