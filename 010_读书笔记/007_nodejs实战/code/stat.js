const fs = require("fs");

fs.stat("index.js", function(err, stats) {
    if (err) {
        console.log(err)
    }
    else{
        console.log(stats);
    }
})