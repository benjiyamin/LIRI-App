require('dotenv').config()
require('console.table')

const fs = require('fs')

const axios = require('axios')
const Spotify = require('node-spotify-api')
const moment = require('moment')
const columnify = require('columnify')
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
        doWhatItSays() // New to account for recursive commands
        break

      default:
        throw new Error('Not a valid command')

    }

  } else {
    // No command error
    throw new Error('No command given')
  }
}

function concertData(concerts) {
  data = []
  concerts.forEach(concert => {
    let venue = concert.venue.name
    let location = concert.venue.city
    if (concert.venue.region) {
      location += `, ${concert.venue.region}`
    }
    let date = moment(concert.datetime).format('MMMM Do YYYY')
    data.push({
      'Venue': venue,
      'Location': location,
      'Date': date
    })
  })
  return data
}

function concertThis(artistName) {
  let queryUrl = `https://rest.bandsintown.com/artists/${artistName}/events?app_id=${keys.bandsInTown.id}`
  axios.get(queryUrl)
    .then(function (response) {
      let data = concertData(concerts = response.data)
      console.log(`${data.length} results found.`)
      console.table(data)
    })
    .catch(function (error) {
      console.log(error)
    })
}

function trackData(track) {
  let artistNames = []
  track.artists.forEach(artist => {
    artistNames.push(artist.name)
  });
  let data = {
    'Artist(s)': artistNames.join(', '),
    'Name': track.name,
    'Preview': track.preview_url,
    'Album': track.album.name
  }
  return data
}

function spotifyThisSong(songName) {
  spotify.search({
      type: 'track',
      query: songName,
      limit: 1
    })
    .then(function (response) {
      let data = trackData(track = response.tracks.items[0])
      console.table(data)
    })
    .catch(function (error) {
      console.log(error)
    })
}

function movieData(movie) {
  let data = {
    'Title': movie.Title,
    'Year': movie.Year,
    'Country': movie.Country,
    'Language': movie.Language,
    'Plot': movie.Plot,
    'Actors': movie.Actors
  }
  movie.Ratings.forEach(rating => {
    data[rating.Source] = rating.Value
  });
  return data
}

function pushMovieToTable(movie, table) {
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

function movieThis(movieName) {
  let queryUrl = `https://www.omdbapi.com/?t=${movieName}&apikey=${keys.omdb.key}`
  axios.get(queryUrl)
    .then(function (response) {
      const table = new Table({
        colWidths: [null, 80],
        wordWrap: true
      })
      pushMovieToTable(movie = response.data, table)
      console.log(table.toString())
    })
    .catch(function (error) {
      console.log(error)
    })
}

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