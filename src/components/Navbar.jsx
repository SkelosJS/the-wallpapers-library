// CSS
import "../css/Navbar.css";
import "../css/SearchBar.css";

// Components
import SearchBar from "./SearchBar";

// React-router-dom
import { Link } from "react-router-dom";
const Navbar = () => {
    return (
        <nav className="navbar">
            <div className="nav-title">
                <Link to={'/'}>The Wallpapers Library</Link>
            </div>
            <SearchBar />
            <ul id="links">
                <Link to={'/upload'} id="upload-route">Poster une image</Link>
            </ul>
        </nav>
    )
}

export default Navbar;