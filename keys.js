require('dotenv').config()

exports.spotify = {
  id: process.env.SPOTIFY_ID,
  secret: process.env.SPOTIFY_SECRET,
}
exports.bandsInTown = {
  id: process.env.BANDSINTOWN_ID
}
exports.omdb = {
  key: process.env.OMDB_KEY
}