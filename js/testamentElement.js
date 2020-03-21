function selectTestament(testament) {
    getBooksByTestament(testament);
    selectedTestament = testament;
    document.getElementById("testament-label").innerHTML = translate(testament);
}

function drawTestament(testament) {
    let testamentElement = document.createElement("div");
    testamentElement.setAttribute("class", "menu_item");
    testamentElement.innerHTML = '<a id="testament_' + testament + '" href=#>' + translate(testament) + '</a>';
    document.getElementById("dropdown-content-testaments").appendChild(testamentElement);

    document.getElementById("testament_" + testament).onclick = function () {
        clearLabels();
        clearContent();
        clearSelectedItems();

        selectTestament(testament);
    };
}

function clearLabels() {
    document.getElementById("book-label").innerHTML = translate("Book");
    document.getElementById("chapter-label").innerHTML = translate("Chapter");
    document.getElementById("dropdown-content-books").innerHTML = "";
}

function getBooksByTestament(testament) {
    let booksOfTestament = books[testament];
    booksOfTestament.forEach((book) => {
        addBookToMenu(book);
    });
}