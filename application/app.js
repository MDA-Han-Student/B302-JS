function $(query) {
  return document.querySelector(query);
}

const bookAdd = $("#bookAddForm"),
  bookUpdate = $("#bookUpdateForm"),
  bookDelete = $("#bookDeleteForm"),
  authorAdd = $("#authorAddForm"),
  authorUpdate = $("#authorUpdateForm"),
  authorDelete = $("#authorDeleteForm"),
  genreAdd = $("#genreAddForm"),
  genreUpdate = $("#genreUpdateForm"),
  genreDelete = $("#genreDeleteForm");

async function get(place, id = "") {
  try {
    let response = await fetch("http://api.training.theburo.nl" + "/" + place);
    if (id != "") {
      response = await fetch(
        "http://api.training.theburo.nl" + "/" + place + "/" + id
      );
    }

    const result = await response.json();

    return result;
  } catch (error) {
    throw new Error(error);
  }
}

async function post(place, data) {
  try {
    const response = await fetch(
      "http://api.training.theburo.nl" + "/" + place,
      {
        method: "POST",
        headers: {
          Accept: "Application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );
    const result = await response.json();
  } catch (error) {
    throw new Error(error);
  }
}

async function update(place, id, data) {
  try {
    const response = await fetch(
      "http://api.training.theburo.nl" + "/" + place + "/" + id,
      {
        method: "PUT",
        headers: {
          Accept: "Application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );
    const result = await response.json();
  } catch (error) {
    throw new Error(error);
  }
}

async function _delete(place, id) {
  try {
    const response = await fetch(
      "http://api.training.theburo.nl" + "/" + place + "/" + id,
      {
        method: "DELETE",
      }
    );
    const result = await response.json();
  } catch (error) {
    throw new Error(error);
  }
}

const books = $("#bookList"),
  authors = $("#authorsList"),
  genres = $("#genresList");

const bookAuthor = $("#bookAuthor"),
  bookGenre = $("#bookGenre"),
  bookUpdateSelect = $("#bookUpdate"),
  bookUpdateAuthor = $("#bookUpdateAuthor"),
  bookUpdateGenre = $("#bookUpdateGenre"),
  bookDeleteSelect = $("#bookDeleteSelect");
const authorUpdateSelect = $("#authorUpdateSelect"),
  updateDeleteSelect = $("#authorDeleteSelect");
const genreUpdateSelect = $("#genreUpdateSelect"),
  genreDeleteSelect = $("#genreDeleteSelect");

async function addBooks() {
  const data = await get("books");

  for (let i = 0; i < data.length; i++) {
    const li = `
            <li>${data[i]["name"]}</li>
            `;
    books.innerHTML += li;

    const select = `
            <option value=${data[i]["id"]}>${data[i]["name"]}</option>
            `;

    bookUpdateSelect.innerHTML += select;
    bookDeleteSelect.innerHTML += select;
  }
}

async function addAuthors() {
  const data = await get("authors");

  for (let i = 0; i < data.length; i++) {
    const li = `
            <li>${data[i]["name"]}</li>
            `;
    authors.innerHTML += li;

    const select = `
            <option value=${data[i]["id"]}>${data[i]["name"]}</option>
            `;

    bookAuthor.innerHTML += select;
    bookUpdateAuthor.innerHTML += select;
    authorUpdateSelect.innerHTML += select;
    authorDeleteSelect.innerHTML += select;
  }
}

async function addGenres() {
  const data = await get("genres");

  for (let i = 0; i < data.length; i++) {
    const li = `
            <li>${data[i]["name"]}</li>
            `;
    genres.innerHTML += li;

    const select = `
            <option value=${data[i]["id"]}>${data[i]["name"]}</option>
            `;

    bookGenre.innerHTML += select;
    bookUpdateGenre.innerHTML += select;
    genreUpdateSelect.innerHTML += select;
    genreDeleteSelect.innerHTML += select;
  }
}

async function addElement(type, toAdd, id) {
  const li = `
    <li>${toAdd}</li>
    `;
  let select = "";

  if (type === "book") {
    books.innerHTML += li;
    const data = await get("books", id);
    select = `
        <option value=${data[data.length - 1]["id"]}>${
      data[data.length - 1]["name"]
    }</option>
        `;
    bookUpdateSelect.innerHTML += select;
    bookDeleteSelect.innerHTML += select;
  } else if (type === "author") {
    authors.innerHTML += li;
    const data = await get("authors", id);
    select = `
        <option value=${data[data.length - 1]["id"]}>${
      data[data.length - 1]["name"]
    }</option>
        `;
    authorUpdateSelect.innerHTML += select;
    authorDeleteSelect.innerHTML += select;
  } else if (type === "genre") {
    genres.innerHTML += li;
    const data = await get("genres", id);
    select = `
        <option value=${data[data.length - 1]["id"]}>${
      data[data.length - 1]["name"]
    }</option>
        `;
    genreUpdateSelect.innerHTML += select;
    genreDeleteSelect.innerHTML += select;
  }
}

// --- In Progress --- //
function deleteElement(type, toDelete, id) {}
// --- ----------- --- //

addBooks();
addAuthors();
addGenres();

bookAdd.addEventListener("submit", (e) => {
  e.preventDefault();

  const title = $("#bookTitle").value;
  const author_id = bookAuthor.value;
  const genre_id = bookGenre.value;

  const data = {
    name: title,
    author_id: author_id,
    genre_id: genre_id,
  };

  post("books", data).then(() => {
    addElement("book", title);
  });
});
bookUpdate.addEventListener("submit", (e) => {
  e.preventDefault();

  const id = $("#bookUpdate").value;
  const name = $("#bookUpdateTitle").value;
  const author_id = bookUpdateAuthor.value;
  const genre_id = bookUpdateGenre.value;

  const data = {
    name: name,
    author_id: author_id,
    genre_id: genre_id
  };

  //if (Object.keys(data).length > 0) {
    update("books", id, data);
  //}
});
bookDelete.addEventListener("submit", (e) => {
  e.preventDefault();

  const id = bookDeleteSelect.value;

  _delete("books", id);
});
authorAdd.addEventListener("submit", (e) => {
  e.preventDefault();

  const name = $("#authorAddName").value;
  const age = $("#authorAddAge").value;

  const data = {
    name: name,
    age: age,
  };

  post("authors", data).then(() => {
    addElement("author", name);
  });
});
authorUpdate.addEventListener("submit", (e) => {
  e.preventDefault();

  const id = authorUpdateSelect.value;
  const name = $("#authorUpdateName").value;
  const age = $("#authorUpdateAge").value;

  const data = {
    name: name,
    age: age
  };

  update("authors", id, data);
});
authorDelete.addEventListener("submit", (e) => {
  e.preventDefault();

  const id = authorDeleteSelect.value;

  _delete("authors", id);
});
genreAdd.addEventListener("submit", (e) => {
  e.preventDefault();

  const genre = $("#genreAddName").value;

  const data = {
    name: genre,
  };

  post("genres", data).then(() => {
    addElement("genre", genre);
  });
});
genreUpdate.addEventListener("submit", (e) => {
  e.preventDefault();

  const id = genreUpdateSelect.value;
  const name = $("#genreUpdateName").value;

  const data = {
    name: name,
  };

  update("genres", id, data);
});
genreDelete.addEventListener("submit", (e) => {
  e.preventDefault();

  const id = genreDeleteSelect.value;

  _delete("genres", id);
});