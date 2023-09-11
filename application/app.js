const path = require("path");

function $(query) {
    return document.querySelector(query);
}

const bookAdd = $("bookAddForm"), bookUpdate = $("bookUpdateForm"), 
        bookDelete = $("bookDeleteForm"), authorAdd = $("authorAddForm"), 
        authorUpdate = $("authorUpdateForm"), authorDelete = $("authorDeleteForm"),
        genreAdd = $("genreAddForm"), genreUpdate = $("genreUpdateForm"), 
        genreDelete = $("genreDeleteForm");

async function sendInfo() {

}

async function post (place, data) {
    try {
        const response = await fetch(path.join("http://api.training.theburo.nl", place, "/"), {
            method: "POST", 
            headers: {
                "Accept": "Application/json",
            },
            body: JSON.stringify(data)
        });
        const result = await response.json();
        console.log(result);
    } catch (error) {
        console.log(error);
    }
    
}

bookAdd.addEventListener("submit", () => {
    evt.preventDefault();

    const title = $('#bookTitle');
    const author = $('#bookAuthor');
    const genre = $('#bookGenre');

    const data = {
        title: title,
        author: author,
        genre: genre
    }

    post("books", data);
});
bookUpdate.addEventListener("submit", () => {
    evt.preventDefault();
    sendInfo();
});
bookDelete.addEventListener("submit", () => {
    evt.preventDefault();
    sendInfo();
});
authorAdd.addEventListener("submit", () => {
    evt.preventDefault();
    
    const name = $('authorAddName');
    const age = $('authorAddAge');

    const data = {
        name: name,
        age: age
    }

    post("authors", data);
});
authorUpdate.addEventListener("submit", () => {
    evt.preventDefault();
    sendInfo();
});
authorDelete.addEventListener("submit", () => {
    evt.preventDefault();
    sendInfo();
});
genreAdd.addEventListener("submit", () => {
    evt.preventDefault();
    
    const genre = $('genreAddName');

    const data = {
        genre: genre
    }
    
    post("genres", data);
});
genreUpdate.addEventListener("submit", () => {
    evt.preventDefault();
    sendInfo();
});
genreDelete.addEventListener("submit", () => {
    evt.preventDefault();
    sendInfo();
});