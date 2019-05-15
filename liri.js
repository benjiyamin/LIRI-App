require('dotenv').config()

const fs = require('fs')

const axios = require('axios')
const Spotify = require('node-spotify-api')
const moment = require('moment')
const Table = require('cli-table3')

const keys = require('./keys.js')

// Instantiate Spotify client
let spotify = new Spotify(keys.spotify)

// Get the input command
let command = process.argv[2]
let optionalArg = process.argv
  .slice(3)
  .join(' ')

// When node executes script
if (!module.parent) {
  execute(command, optionalArg)
}

// Process the command
function execute(cmd, arg) {
  if (cmd) {
    switch (cmd) {

      case 'concert-this':
        let artistName = arg
        if (artistName) {
          concertThis(artistName)
        } else {
          throw new Error('No artist name defined')
        }
        break

      case 'spotify-this-song':
        let songName = arg
        if (songName) {
          spotifyThisSong(songName)
        } else {
          spotifyThisSong('the sign ace of base')
        }
        break

      case 'movie-this':
        let movieName = arg
        if (movieName) {
          movieThis(movieName)
        } else {
          movieThis('Mr. Nobody')
        }
        break

      case 'do-what-it-says':
        doWhatItSays()
        break

      default:
        throw new Error('Not a valid command')

    }

  } else {
    // No command error
    throw new Error('No command given')
  }
}

function concertTable(concerts) {
  let table = new Table({
    head: ['Venue', 'Location', 'Date']
  })
  concerts.forEach(concert => {
    let venue = concert.venue.name
    let location = concert.venue.city
    if (concert.venue.region) {
      location += `, ${concert.venue.region}`
    }
    let date = moment(concert.datetime).format('MMMM Do YYYY')
    table.push(
      [venue, location, date]
    )
  })
  return table
}

// node liri.js concert-this <artistName>
function concertThis(artistName) {
  let queryUrl = `https://rest.bandsintown.com/artists/${artistName}/events?app_id=${keys.bandsInTown.id}`
  axios.get(queryUrl)
    .then(function (response) {
      console.log(`${response.data.length} results found.`)
      let table = concertTable(concerts = response.data)
      console.log(table.toString())
    })
    .catch(function (error) {
      console.log(error)
    })
}

function trackTable(track) {
  let table = new Table()
  let artistNames = []
  track.artists.forEach(artist => {
    artistNames.push(artist.name)
  });
  table.push(
    ['Artist(s)', artistNames.join(', '), ],
    ['Name', track.name],
    ['Preview', track.preview_url],
    ['Album', track.album.name],
  )
  return table
}

// node liri.js spotify-this-song <songName>
function spotifyThisSong(songName) {
  spotify.search({
      type: 'track',
      query: songName,
      limit: 1
    })
    .then(function (response) {
      let table = trackTable(track = response.tracks.items[0])
      console.log(table.toString())
    })
    .catch(function (error) {
      console.log(error)
    })
}

function movieTable(movie) {
  let table = new Table({
    colWidths: [null, 80],
    wordWrap: true
  })
  table.push(
    ['Title', movie.Title],
    ['Year', movie.Year],
    ['Country', movie.Country],
    ['Language', movie.Language],
    ['Plot', movie.Plot],
    ['Actors', movie.Actors],
  )
  movie.Ratings.forEach(rating => {
    table.push([rating.Source, rating.Value])
  });
  return table
}

// node liri.js movie-this <movieName>
function movieThis(movieName) {
  let queryUrl = `https://www.omdbapi.com/?t=${movieName}&apikey=${keys.omdb.key}`
  axios.get(queryUrl)
    .then(function (response) {
      let table = movieTable(movie = response.data)
      console.log(table.toString())
    })
    .catch(function (error) {
      console.log(error)
    })
}

// node liri.js do-what-it-says
function doWhatItSays() {
  fs.readFile("random.txt", "utf8", function (error, data) {

    if (!error) {
      let dataArr = data.split(",");
      let cmd = dataArr[0]
      let arg = dataArr[1]
      execute(cmd, arg)
    } else {
      // If the code experiences any errors it will log the error to the console.
      return console.log(error);
    }

  });
}

exports.execute = execute