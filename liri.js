var axios = require("axios");

var queryUrl = "https://www.google.com";


axios.get(queryUrl).then(
    
    function(response) {

        console.log(response);

});
