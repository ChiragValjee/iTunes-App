import React, {useState} from "react";
import axios from "axios";
import {useEffect} from "react";
import 'bootstrap/dist/css/bootstrap.css';
import FavoriteItunesSongs from "./favourites";
import {Link} from "react-router-dom";

// The functional component named ItunesInfo declares four state variables.
// SearchTerm and media to hold the current search term and selected media type, respectively.
// Results to hold search results and favorites to store user's preferred results, using the useState hook.

function ItunesInfo({favorites, handleRemoveFavorite, setFavorites}) {
    const [searchTerm, setSearchTerm] = useState("");
    const [media, setMedia] = useState("all");
    const [results, setResults] = useState([]);


// This asynchronous function sends a GET request to the specified endpoint using the Axios library.
// The endpoint URL includes query parameters for the search term (searchTerm) and the selected media type (media).

    async function handleSubmit(e) {
        e.preventDefault();

        try {
            const response = await axios.get(`/api/search?term=${searchTerm}&media=${media}`);
            setResults(response.data);
        } catch (error) {
            console.error(error);
        }
    };

// The handleFavorite function takes a result object as a parameter and adds it to the favorites state using setFavorites
// The function will be called when the user clicks on the favorite button.

    function handleFavorite(result) {
        const newFavorites = [...favorites, result];
        setFavorites(newFavorites);
        result.favorite = true
    };

// UseEffect hook used to save the favorites array to the browsers internal storage whenever it changes


    useEffect(() => {
        localStorage.setItem("favorites", JSON.stringify(favorites));
    }, [favorites]);

// When the component mounts. We need to retrieve the favorites array from the browsers internal storage using "localstorage.getItem".
// We need to set it to the favorites state using "setFavorites"
// If there are no favorites in the storage, initialize the favorites state with an empty array.

    useEffect(() => {
        const storedFavorites = localStorage.getItem("favorites");
        if (storedFavorites) {
            setFavorites(JSON.parse(storedFavorites));
        } else {
            setFavorites([]);
        }
    }, []);

// The code is rendering a form with two input fields:
// a text input for searching an artist name, and a dropdown select input for filtering media types (movies, podcasts, or music).
// When the user submits the form, it triggers a function called handleSubmit.
    return (
        <div>
            <Link to="/favorites" className="link">View Favorites</Link>
            <h2 className="mainHeading">itunes Explora</h2>
            <div className="formDetails">
                <form onSubmit={handleSubmit}>
                    <label className="label1">
                        Artist Name:
                        <input type="text" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}
                               className="input1" placeholder="Artist Name"/>
                    </label>
                    <br/>
                    <label className="label2">
                        Media:
                        <select value={media} onChange={(e) => setMedia(e.target.value)} className="input2">
                            <option value="all">All</option>
                            <option value="movie">Movies</option>
                            <option value="podcast">Podcasts</option>
                            <option value="music">Music</option>
                        </select>
                    </label>
                    <br/>
                    <button type="submit" className="searchButton">Search</button>
                </form>
            </div>

            {/*renders a list of results based on the user's search query and selected media type.
            The results are displayed in a grid layout, with each result showing the name of the song, artist, album artwork, and a preview audio player.
            Each result also has a "Favorite" button that the user can click to add the song to their favorites list.
            The code maps through an array of results and generates a div for each result with its corresponding information.*/}

            <div className="container justify-content-center">
                <div className="row">
                    {results.map((result) => (
                        <div key={result.id} className="col-md-4">
                            <div className="spotifySongs">
                                <h2 className="songHeading">{result.name}</h2>
                                <p>{result.artist}</p>
                                <img src={result.artwork} alt={`${result.name} by ${result.artist}`}/>
                                <audio controls className="audio">
                                    <source src={result.previewUrl} type="audio/mpeg"/>
                                    Your browser does not support the audio element.
                                </audio>

                                <button onClick={() => handleFavorite(result)}
                                        className={result.favorite ? "newFavoriteButton" : "favoriteButton"}>Favorite
                                </button>
                            </div>
                        </div>
                    ))}
                </div>


            </div>
        </div>

    );
}

export default ItunesInfo;