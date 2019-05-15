# LIRI App

LIRI is a Language Interpretation and Recognition Interface; a command line node app that takes in parameters and gives you back data.

## Installation

1. Create a local clone.
   
    ```bash
    $ git clone git@github.com:benjiyamin/LIRI-App.git
    Cloning into `LIRI-App`...
    remote: Counting objects: 10, done.
    remote: Compressing objects: 100% (8/8), done.
    remove: Total 10 (delta 1), reused 10 (delta 1)
    Unpacking objects: 100% (10/10), done.
    ```

2. Navigate to the project root directory.

    ```bash
    $ cd LIRI-App/
    ```

3. Install dependencies using npm.
   
    ```bash
    $ npm i
    ```

4. Create a `.env` file.
   
    ```bash
    $ touch .env
    ```

5. Within your `.env`, set your API credentials.
   
    ```
    SPOTIFY_ID=your-spotify-id
    SPOTIFY_SECRET=your-spotify-secret

    BANDSINTOWN_ID=your-bandsintown-id
    OMDB_KEY=your-omdb-key
    ```


## Basic Usage

Ask LIRI about some upcoming concert information with `node liri.js concert-this <artist/band name here>`.

```bash
$ node liri.js concert-this Porter Robinson
10 results found.
┌──────────────────────────────┬───────────────┬────────────────────┐
│ Venue                        │ Location      │ Date               │
├──────────────────────────────┼───────────────┼────────────────────┤
│ Porter Robinson (DJ Set) at  │ Las Vegas, NV │ May 16th 2019      │
│ Omnia                        │               │                    │
├──────────────────────────────┼───────────────┼────────────────────┤
│ Virtual Self at ULTRA Korea  │ Seoul         │ June 7th 2019      │
│ (June 7 - 9)                 │               │                    │
├──────────────────────────────┼───────────────┼────────────────────┤
│ Porter Robinson (DJ Set) at  │ Singapore     │ June 8th 2019      │
│ ULTRA Singapore (June 8 - 9) │               │                    │
├──────────────────────────────┼───────────────┼────────────────────┤
│ Second Sky Music Festival    │ Oakland, CA   │ June 15th 2019     │
├──────────────────────────────┼───────────────┼────────────────────┤
│ Virtual Self at Brooklyn at  │ New York, NY  │ June 23rd 2019     │
│ Mirage (CLUBSYSTEM)          │               │                    │
├──────────────────────────────┼───────────────┼────────────────────┤
│ Porter Robinson (DJ Set) at  │ San Diego, CA │ July 19th 2019     │
│ Omnia                        │               │                    │
├──────────────────────────────┼───────────────┼────────────────────┤
│ Porter Robinson (DJ Set) at  │ Las Vegas, NV │ July 21st 2019     │
│ Hakkasan                     │               │                    │
├──────────────────────────────┼───────────────┼────────────────────┤
│ Porter Robinson (DJ Set) at  │ Las Vegas, NV │ August 9th 2019    │
│ Hakkasan                     │               │                    │
├──────────────────────────────┼───────────────┼────────────────────┤
│ Porter Robinson (DJ Set) at  │ Las Vegas, NV │ September 2nd 2019 │
│ Wet Republic                 │               │                    │
├──────────────────────────────┼───────────────┼────────────────────┤
│ Porter Robinson (DJ Set) at  │ Las Vegas, NV │ October 11th 2019  │
│ Hakkasan                     │               │                    │
└──────────────────────────────┴───────────────┴────────────────────┘

```

Find out about  a song you just heard with the power of Spotify using `node liri.js spotify-this-song <song name here>`.

```bash
$ node liri.js spotify-this-song Banquet Bloc Party
┌───────────┬─────────────────────────────┐
│ Artist(s) │ Bloc Party                  │
├───────────┼─────────────────────────────┤
│ Name      │ Banquet                     │
├───────────┼─────────────────────────────┤
│ Preview   │ https://is.gd/T2Besd        │
├───────────┼─────────────────────────────┤
│ Album     │ Silent Alarm (U.S. Version) │
└───────────┴─────────────────────────────┘

```

LIRI even knows movie trivia: `node liri.js movie-this <movie name here>`.

```bash
$ node liri.js movie-this The Matrix
┌─────────────────────────┬──────────────────────────────────────────────────┐
│ Title                   │ The Matrix                                       │
├─────────────────────────┼──────────────────────────────────────────────────┤
│ Year                    │ 1999                                             │
├─────────────────────────┼──────────────────────────────────────────────────┤
│ Country                 │ USA                                              │
├─────────────────────────┼──────────────────────────────────────────────────┤
│ Language                │ English                                          │
├─────────────────────────┼──────────────────────────────────────────────────┤
│ Plot                    │ A computer hacker learns from mysterious rebels  │
│                         │ about the true nature of his reality and his     │
│                         │ role in the war against its controllers.         │
├─────────────────────────┼──────────────────────────────────────────────────┤
│ Actors                  │ Keanu Reeves, Laurence Fishburne, Carrie-Anne    │
│                         │ Moss, Hugo Weaving                               │
├─────────────────────────┼──────────────────────────────────────────────────┤
│ Internet Movie Database │ 8.7/10                                           │
├─────────────────────────┼──────────────────────────────────────────────────┤
│ Rotten Tomatoes         │ 88%                                              │
├─────────────────────────┼──────────────────────────────────────────────────┤
│ Metacritic              │ 73/100                                           │
└─────────────────────────┴──────────────────────────────────────────────────┘

```

`node liri.js do-what-it-says` activates a command from the `random.txt` file.

```bash
$ node liri.js do-what-it-says
┌───────────┬───────────────────────┐
│ Artist(s) │ Backstreet Boys       │
├───────────┼───────────────────────┤
│ Name      │ I Want It That Way    │
├───────────┼───────────────────────┤
│ Preview   │ https://is.gd/nUXybv  │
├───────────┼───────────────────────┤
│ Album     │ The Hits--Chapter One │
└───────────┴───────────────────────┘

```



## License

This project is licensed under GPL 3.0 - see [LICENSE](LICENSE.md) for details.
