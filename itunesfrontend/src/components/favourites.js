import React from "react";

//Component called FavoriteItunesSongs created. The component takes two props: favorites and handleRemoveFavorite.

// The component is rendering a list of favorite iTunes songs.
// The list is generated using the favorites prop, which is an array of objects representing the user's favorite songs.
// Each song is displayed in a div that contains the song's name, artist, artwork, and a preview audio player.

// In addition to the song information, each div also includes a "Remove" button.
// When the user clicks the button, it triggers the handleRemoveFavorite function with the ID of the song to be removed.
// The handleRemoveFavorite function is passed down as a prop from the parent component and is responsible for removing the song from the favorites list.

function FavoriteItunesSongs({favorites, handleRemoveFavorite}) {
    return (
        <div>
            <h2 className="favoritesHeading">Your Itunes Playlist</h2>
            <div className="container justify-content-center">
                <div className="row">

                    {favorites.map((favorite) => (
                        <div key={favorite.id} className="col-md-4">
                            <div className="spotifySongs">
                                <h2 className="songHeading">{favorite.name}</h2>
                                <p>{favorite.artist}</p>
                                <img src={favorite.artwork} alt={`${favorite.name} by ${favorite.artist}`}/>
                                <audio controls className="audio">
                                    <source src={favorite.previewUrl} type="audio/mpeg"/>
                                    Your browser does not support the audio element.
                                </audio>
                                <button onClick={() => handleRemoveFavorite(favorite.id)} className="deleteButton">Remove</button>
                            </div>
                        </div>

                    ))}

                </div>
            </div>
        </div>
    );
}

export default FavoriteItunesSongs



