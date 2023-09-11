const path = require("path");

function $(query) {
    return document.querySelector(query);
}

async function get (place) {
    try {
        const response = await fetch(path.join("http://api.training.theburo.nl", place));
        const result = await response.json();
        const data = await JSON.parse(result);

        return data
    } catch (error) {
        console.log(error);
    }
}