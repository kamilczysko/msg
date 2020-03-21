function selectBook(book) {
    document.getElementById("book-label").innerHTML = translate(book);
    selectedBook = book;
    selectedChapter = null;
    selectedBookChapters = getChaptersByBook(book);
    selectedTranslatedBookChapters = getTranslatedChaptersByBook(book);
    fillMenuItemsWithChapterNumbers();
}

function addBookToMenu(book) {
    let bookElement = document.createElement("div");
    bookElement.setAttribute("class", "menu_item");
    bookElement.innerHTML = '<a id="book_' + book + '" href=# )>' + translate(book) + '</a>';
    document.getElementById("dropdown-content-books").appendChild(bookElement);
    document.getElementById("book_" + book).onclick = function () {
        clearChapterMenuItems();
        selectBook(book);
    };
}

