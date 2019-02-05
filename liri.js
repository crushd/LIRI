require("dotenv").config();

var keys = require("./keys.js");

/* 
    You should then be able to access your keys information like so

    ```js
    var spotify = new Spotify(keys.spotify);
    ``` 
*/

var axios = require("axios");
var moment = require("moment");


var action = process.argv[2];


function getBand(artist) {
    // getBand() axios call to Spotify
    var artist = process.argv[3];
    var queryUrl = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp";
    
    axios.get(queryUrl).then(
        function(response) {

            var eventDetails = [];

            console.log(" ");
            console.log(artist);
            console.log("===========================");

            for (var a = 0; a < response.data.length; a++) {
                var venueName = response.data[a].venue.name;
                var venueLocation = response.data[a].venue.city + ", " + response.data[a].venue.region + response.data[a].venue.country;
                var showDateTime = moment(response.data[a].datetime).format("MM/DD/YYYY");
                
                console.log(showDateTime + "; " + venueName + "; " + venueLocation);
            }


        }
    );

}

function getMovie() {

    var queryTerm = process.argv[3];

    // getBand() axios call to Spotify
    var queryUrl = "http://www.omdbapi.com/?i=tt3896198&apikey=3c945aef" + "&t=" + queryTerm;
    
    axios.get(queryUrl).then(
        function(response) {
            
            console.log(" ");
            console.log(response.data.Title + ", " + response.data.Released);
            console.log(" ");

        }
    );
}

switch (action) {

    case "concert-this":
        console.log("Band");
        getBand();
    break;

    case "spotify-this-song":
        console.log("Song");
    break;

    case "movie-this":
        console.log("Movies");
        getMovie();
    break;

    case "do-what-it-says":
        console.log("Do it.");
    break;

}
