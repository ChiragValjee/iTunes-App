//application is importing the required libraries and initializing the Express application instance, app.
// The port variable is set to 3001.
// The app.use(express.json()) is used to parse incoming requests with JSON payloads.

const express = require("express");
const axios = require("axios");

const app = express();
const port = 3001;

const helmet = require('helmet')

app.use(helmet())

app.use(express.json());

// This code block defines a GET route for the /api/search endpoint that expects two query parameters: term and media.
// The route uses Axios to make a GET request to the iTunes API with the term and media parameters included in the URL.
// The response data is then mapped to a new array of objects with specific properties.
// The results are sent back to the client as a JSON response.
// If an error occurs during the request, a 500 status code and a JSON error message are sent back to the client.

app.get("/api/search", async (req, res) => {
    const { term, media } = req.query;

    try {
        const response = await axios.get(
            `https://itunes.apple.com/search?term=${term}&media=${media}`
        );

        const results = response.data.results.map((result) => ({
            id: result.trackId,
            name: result.trackName,
            artist: result.artistName,
            artwork: result.artworkUrl100.replace("100x100", "200x200"),
            previewUrl: result.previewUrl,
            kind: result.kind,
            price: result.trackPrice,
            currency: result.currency,
            favorite: false,
        }));

        res.json(results);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
});



// This code block starts the Express application instance and listens for incoming requests on the specified port.
// When the server is successfully started, a message is logged to the console.

app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});

