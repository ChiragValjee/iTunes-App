import './App.css';
import ItunesInfo from "./components/itunesInfo";
import FavoriteItunesSongs from "./components/favourites";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import {useState} from "react";

// Main App component that renders two routes using the react-router-dom library.
// The ItunesInfo component is rendered for the root URL and displays a search form for iTunes media along with a list of results.
// The FavoriteItunesSongs component is rendered for the /favorites route and displays a list of favorite iTunes songs that can be removed from the list.
// The App component maintains the state of the favorite songs list and passes it down to the two child components as props.
// The handleRemoveFavorite function is used to remove a song from the favorites list when the remove button is clicked in the FavoriteItunesSongs component.

function App() {
    const [favorites, setFavorites] = useState([]);

    function handleRemoveFavorite(id) {
        const newFavorites = favorites.filter((favorite) => favorite.id !== id);
        setFavorites(newFavorites);
    }

    return (

        <div className="App">
            <Router>
                <Routes>
                    <Route path="/favorites" element={<FavoriteItunesSongs favorites={favorites}
                                                                           handleRemoveFavorite={handleRemoveFavorite}
                                                                           setFavorites={setFavorites}/>}/>
                    <Route path="/"
                           element={<ItunesInfo favorites={favorites} handleRemoveFavorite={handleRemoveFavorite}
                                                setFavorites={setFavorites}/>}/>
                </Routes>
            </Router>
        </div>
    );
}

export default App;
