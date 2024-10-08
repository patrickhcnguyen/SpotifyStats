const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const path = require('path');

const app = express();
app.use(express.json()); 

app.use(cors({
  origin: ['http://localhost:3000', 'https://accounts.spotify.com'], 
  methods: ['GET', 'POST', 'PUT', 'DELETE'], 
  credentials: true, 
}));

app.use(cookieParser());

const authRoutes = require('./Routes/auth');
const topArtistsRoutes = require('./Routes/topArtists');
const topTrackRoutes = require('./Routes/topTracks');
const topGenreRoutes = require('./Routes/topGenres');
const recentlyPlayedRoutes = require ('./Routes/recentlyPlayed');
const getUserProfileRoutes = require('./Routes/getUserProfile')
const createPlaylistRoute = require('./Routes/createPlaylists');
const addTracksRoute = require('./Routes/addItems')
const getRecommendationsRoute = require('./Routes/getRecommendations')

app.use(authRoutes);
app.use(topArtistsRoutes);
app.use(topTrackRoutes);
app.use(topGenreRoutes);
app.use(recentlyPlayedRoutes);
app.use(getUserProfileRoutes);
app.use(createPlaylistRoute);
app.use(addTracksRoute)
app.use(getRecommendationsRoute)

app.use(express.static(path.join(__dirname, 'client/build')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
});

const PORT = process.env.PORT || 8888;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});