// Font-awesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as icon from "@fortawesome/free-solid-svg-icons";

const SearchBar = () => {
    return (
        <div className="search-bar">
            <form method="GET" action="#">
                <input id="search-input" type="search" placeholder="Rechercher..."/>
                <button id="submit">
                    <FontAwesomeIcon icon={icon.faMagnifyingGlass} />
                </button>
            </form>
        </div>
    )
}

export default SearchBar;