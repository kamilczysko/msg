function clearAllLabels() {
    document.getElementById("book-label").innerHTML = translate("Book");
    document.getElementById("chapter-label").innerHTML = translate("Chapter");
    document.getElementById("testament-label").innerHTML = "Testament";
    document.getElementById("dropdown-content-books").innerHTML = "";
}


function clearContent() {
    document.getElementById("content").innerHTML = "";
    document.getElementById("content-translated").innerHTML = "";
}

function clearSelectedItems() {
    selectedTestament = null;
    selectedBook = null;
    selectedChapter = null;
    selectedBookChapters = null;
    selectedTranslatedBookChapters = null;
}

function getChaptersByBook(book) {
    let books = Array.from(bible[selectedTestament]);
    console.log(books);
    for (let b of books) {
        if (b['bookName'] === book) {
            console.log("found");
            return b['chapters'];
        }
    }
}

function getTranslatedChaptersByBook(book) {
    let books = Array.from(bibleTranslated[selectedTestament]);
    console.log(books);
    for (let b of books) {
        if (b['bookName'] === book) {
            return b['chapters'];
        }
    }
}

function getChapter(chapterNumber) {
    return selectedBookChapters[parseInt(chapterNumber) - 1];
}

function getActualChapter() {
    return selectedBookChapters[parseInt(selectedChapter) - 1];
}

function getActualTranslatedChapter() {
    return selectedTranslatedBookChapters[parseInt(selectedChapter) - 1];
}


function setVerseHoverEnglishSite(verseNumber) {
    document.getElementById("verse_" + verseNumber).onmouseover = () => {
        document.getElementById("verse_translated_" + verseNumber).classList.add("verse-hover");
    };

    document.getElementById("verse_" + verseNumber).onmouseleave = () => {
        document.getElementById("verse_translated_" + verseNumber).classList.remove("verse-hover");
    };
}

function setVerseHoverTranslatedSite(verseNumber) {
    document.getElementById("verse_translated_" + verseNumber).onmouseover = () => {
        document.getElementById("verse_" + verseNumber).classList.add("verse-hover");
    };

    document.getElementById("verse_translated_" + verseNumber).onmouseleave = () => {
        document.getElementById("verse_" + verseNumber).classList.remove("verse-hover");
    };
}

function okMessage(message) {
    let messageContainer = document.createElement("div");
    messageContainer.setAttribute("class", "alert alert-success");
    messageContainer.innerHTML = message;
    setTimeout(function () {
        messageContainer.parentNode.removeChild(messageContainer);
    }, 2500);
    document.getElementById("messages").appendChild(messageContainer);
}

function nokMessage(message) {
    let messageContainer = document.createElement("div");
    messageContainer.setAttribute("class", "alert alert-danger");
    messageContainer.innerHTML = message;
    setTimeout(function () {
        messageContainer.parentNode.removeChild(messageContainer);
    }, 2500);
    document.getElementById("messages").appendChild(messageContainer);
}

function startSaveLoader() {
    document.getElementById("loader").innerHTML = ' <div class="lds-facebook"><div></div><div></div><div></div></div><span class="save-loader-label">zapis</span>';
}

function stopSaveLoader() {
    document.getElementById("loader").innerHTML = "";
}

function startSearchProgress() {
    document.getElementById("loader-search").innerHTML = ' <div class="lds-facebook"><div></div><div></div><div></div></div><span class="save-loader-label">Szukanie</span>';
}

function stopSearchProgress(){
    document.getElementById("loader-search").innerHTML = '';
}

function startTranslateProgress() {
    document.getElementById("loader").innerHTML = ' <div class="lds-facebook"><div></div><div></div><div></div></div><span class="save-loader-label">tłumaczenie</span>';
}
function stopTranslateProgress() {
    document.getElementById("loader").innerHTML = '';
}