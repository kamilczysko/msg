function drawVerse(verse){
    let verseNumber = verse.verseNumber;
    let verseContent = verse.verseContent;

    let verseContainer = document.createElement("div");
    verseContainer.setAttribute("class", "verse");
    verseContainer.setAttribute("id", "verse_" + verseNumber);
    verseContainer.innerHTML = '<div class="verse" href=#><span class="verse-number"><strong>' + verseNumber + '</strong></span><span class="verse-content">' + verseContent + '</span></div>';
    document.getElementById("content").appendChild(verseContainer);
    document.getElementById("verse_" + verseNumber).onclick = function () {
        console.log("selected verse: " + selectedTestament + " - " + selectedBook + " - " + selectedChapter + "-" + verseNumber);
        doTranslation(verseContent, verseNumber);
    };
    getTranslatedVerses(verseNumber);
}

function getTranslatedVerses(verseNumber){
    let verseIndex = parseInt(verseNumber)-1;

    let verseTranslatedContainer = document.createElement("div");
    verseTranslatedContainer.setAttribute("class", "verse verse-translated");
    verseTranslatedContainer.setAttribute("id", "verse_translated_" + verseNumber);

    let translatedContent = getActualTranslatedChapter().verses[verseIndex].verseContent;
    verseTranslatedContainer.innerHTML = '<div class="verse"><span class="verse-number"><strong>' + verseNumber + '</strong></span><span class="verse-content" id="translated_verse_' + verseNumber + '" contenteditable="true">' + translatedContent + '</span></div>';

    document.getElementById("content-translated").appendChild(verseTranslatedContainer);

    document.getElementById("translated_verse_" + verseNumber).addEventListener("focusout", function (e) {
        let contentToSave = document.getElementById("translated_verse_" + verseNumber).textContent;
        updateTranslatedContent(verseNumber, contentToSave);
    });

    setVerseHoverEnglishSite(verseNumber);
    setVerseHoverTranslatedSite(verseNumber);
}

function drawVerseWithSearchResult(verse){
    let verseNumber = verse.verseNumber;
    let verseContent = verse.verseContent;

    let verseContainer = document.createElement("div");
    verseContainer.setAttribute("class", "verse");
    verseContainer.setAttribute("id", "verse_" + verseNumber);
    verseContainer.innerHTML = '<div class="verse verse-selected" href=#><span class="verse-number"><strong>' + verseNumber + '</strong></span><span class="verse-content">' + verseContent + '</span></div>';
    document.getElementById("content").appendChild(verseContainer);
    document.getElementById("verse_" + verseNumber).onclick = function () {
        console.log("selected verse: " + selectedTestament + " - " + selectedBook + " - " + selectedChapter + "-" + verseNumber);
        doTranslation(verseContent, verseNumber);
    };
    getTranslatedVersesWithSerchResult(verseNumber);
}

function getTranslatedVersesWithSerchResult(verseNumber){
    let verseIndex = parseInt(verseNumber)-1;

    let verseTranslatedContainer = document.createElement("div");
    verseTranslatedContainer.setAttribute("class", "verse verse-translated");
    verseTranslatedContainer.setAttribute("id", "verse_translated_" + verseNumber);

    let translatedContent = getActualTranslatedChapter().verses[verseIndex].verseContent;
    verseTranslatedContainer.innerHTML = '<div class="verse verse-selected"><span class="verse-number"><strong>' + verseNumber + '</strong></span><span class="verse-content" id="translated_verse_' + verseNumber + '" contenteditable="true">' + translatedContent + '</span></div>';

    document.getElementById("content-translated").appendChild(verseTranslatedContainer);

    document.getElementById("translated_verse_" + verseNumber).addEventListener("focusout", function (e) {
        let contentToSave = document.getElementById("translated_verse_" + verseNumber).textContent;
        updateTranslatedContent(verseNumber, contentToSave);
    });

    setVerseHoverEnglishSite(verseNumber);
    setVerseHoverTranslatedSite(verseNumber);
}