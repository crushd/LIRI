var axios = require("axios");

var queryUrl = "https://www.google.com";


axios.get(queryUrl).then(function(err,data) {

    if (err) {
        console.log(err);
    }

});

console.log("Hello World.");