import './search.scss'
import search from '../../images/search.svg';

const Search = () => {
    return (
        <section className="search_wrapper">
            <img className="search_icon" src={ search } alt="" />
            <section className="search_toggle">
                <img src={ search } alt="" />
                <input type="text" />
            </section>
        </section>
    )
}

export default Search