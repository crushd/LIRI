require("dotenv").config();
var Spotify = require('node-spotify-api');
var keys = require("./keys.js");
var spotify = new Spotify(keys.spotify);
var fs = require("fs");
var axios = require("axios");
var moment = require("moment");
var logText;
var action = process.argv[2];


function logThis(text) {

    fs.appendFile("log.txt", text, function(err) {
        // If an error was experienced we will log it.
        if (err) {
            console.log(err);
        }
    });

};

function getBand(artist) {
    // getBand() axios call to Spotify
    //var artist = process.argv[3];
    var f_artist = artist.replace('"','');
    var queryUrl = "https://rest.bandsintown.com/artists/" + f_artist + "/events?app_id=codingbootcamp";
    
    // console this url for debugging
    console.log(queryUrl);
    
    axios.get(queryUrl).then(
        function(response) {

            var eventDetails = [];

            console.log(" ");
            console.log(artist);
            console.log("===========================");

            //console.log(response.data.length);

            if (response.data.length > 0) {
                for (var a = 0; a < response.data.length; a++) {
                    var venueName = response.data[a].venue.name;
                    var venueLocation = response.data[a].venue.city + ", " + response.data[a].venue.region + response.data[a].venue.country;
                    var showDateTime = moment(response.data[a].datetime).format("MM/DD/YYYY");
                    
                    logText = "\r\n" + "concert-this: " + showDateTime + ";" + venueName + ";" + response.data[a].venue.city + ", " + response.data[a].venue.region;
                    logThis(logText);
                    
                    console.log(showDateTime + "; " + venueName + "; " + response.data[a].venue.city);
                    
                }
            } else {
                getBand("Ace of Bass");
            }
            console.log(" ");
    });

};

function getMovie(movie) {

    //var movie = process.argv[3];

    // getBand() axios call to Spotify
    var queryUrl = "http://www.omdbapi.com/?i=tt3896198&apikey=3c945aef" + "&t=" + movie;
    
    // console this url for debugging
    console.log(queryUrl);

    console.log(" ");
    console.log(movie);
    console.log("===========================");

    axios.get(queryUrl).then(
        function(response) {

            // console.log(response);

            console.log("Title: " + response.data.Title);
            console.log("Release Date: " + response.data.Released);
            console.log("IMDB Rating: " + response.data.imdbRating);
            console.log("Country: " + response.data.Country);
            console.log("Language: " + response.data.Language);
            console.log("Plot: " + response.data.Plot);
            console.log("Actors: " + response.data.Actors);
            console.log(" ");
                
            logText = "\r\n" + "movie-this: " + response.data.Title + ";" + response.data.Released + ";" + response.data.imdbRating + ";" + response.data.Country + ";" + response.data.Language + ";" + response.data.Plot + ";" + response.data.Actors;
            logThis(logText);

        }
    );
};

function getMusic(track) {

    //var track = process.argv[3];

    console.log(" ");
    console.log(track);
    console.log("===========================");

    spotify.search({type: 'track', query: track, limit: 20}, function(err,data) {
        
        if (err) {
            return console.log('Error occurred: ' + err);
        }

        var spotifyTracks = data.tracks;
        var spotifyItems = data.tracks.items;
        var spotifyItemsLength = spotifyItems.length;

        //console.log(spotifyItems);

        for (var s = 0 ; s < spotifyItemsLength ; s++){
            //  * The artist(s) name

            var artistList = [];

            for (var a = 0 ; a < spotifyItems[s].artists.length; a++) {
                artistList.push(spotifyItems[s].artists[a].name);
            }
        
            //  * The song name
            var songName = spotifyItems[s].name

            //  * A preview link of the song from Spotify
            var previewUrl = spotifyItems[s].preview_url;

            //  * The album that the song is from
            var albumTitle = spotifyItems[s].album.name;

            console.log("Song: " + songName);
            console.log("Artist: " + artistList);
            console.log("Album: " + albumTitle)
            if (previewUrl) {
                var previewOutput = previewUrl;
                console.log("URL: " + previewOutput)
            } else {
                var previewOutput = "URL: No preivew available.";
                console.log(previewOutput);
            }
            
            logText = "\r\n" + "spotify-this-song: " + songName + ";" + artistList + ";" + albumTitle + ";" + previewOutput;
            logThis(logText);
            
            console.log(" ");
        }
    });

};

function doWhatItSays() {
    //console.log("do-what-it-says");

    fs.readFile("random.txt","utf8", function(err,data) {
        
        if (err) {
            return console.log(err)
        }

        var dataArr = data.split(",");

        var randomNumber = Math.floor(Math.random() * 3) + 1;  // returns a random integer from 1 to 3
        
        //console.log(dataArr[1]);

        if(randomNumber === 1) {
            getMusic(dataArr[1]);
        } else if (randomNumber === 2) {
            getBand(dataArr[1]);
        } else {
            getMovie(dataArr[1]);
        }

    });

};

switch (action) {

    case "concert-this":
        console.log(" ");
        console.log("================");
        console.log("concert-this");
        console.log("================");
        console.log(" ");

        getBand(process.argv[3]);
    break;

    case "spotify-this-song":
        console.log(" ");
        console.log("====================");
        console.log("spotify-this-song");
        console.log("====================");
        console.log(" ");

        getMusic(process.argv[3]);
    break;

    case "movie-this":
        console.log(" ");
        console.log("====================");
        console.log("movie-this");
        console.log("====================");
        console.log(" ");

        getMovie(process.argv[3]);
    break;

    case "do-what-it-says":
        console.log(" ");
        console.log("====================");
        console.log("do-what-it-says");
        console.log("====================");
        console.log(" ");

        doWhatItSays();
    break;

};