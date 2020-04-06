function doTranslation(verseContent, verseNumber, isLastTranslation) {
    let verseTranslatedContainer = document.createElement("div");
    verseTranslatedContainer.setAttribute("class", "verse verse-translated");
    verseTranslatedContainer.setAttribute("id", "verse_translated_" + verseNumber);
    let isFreeTranslationAvailable = true;
    getTranslatedText(verseContent).then(function (text) {
        if (text.includes("MYMEMORY WARNING")) {
            isFreeTranslationAvailable = false;
            let hours = text.match("(\\d{1,}) HOURS")[1];
            let minutes = text.match("(\\d{1,}) MINUTES")[1];
            let seconds = text.match("(\\d{1,}) SECONDS")[1];
            nokMessage("Następne darmowe tłumaczenie za <br>"+hours+" godzin "+minutes+" minut "+seconds+" sekund");
        }
        if (!isFreeTranslationAvailable) {
            stopTranslateProgress();
            return;
        }
        let quote = '\"';
        let finalText = text.replace(/["|”]/g, quote)
            .replace(/[„|']/g, quote)
            .replace(/[']/g, quote)
            .replace(/&#39;/g, quote)
            .replace(/&quot;/g, quote).trim();
        verseTranslatedContainer.innerHTML = '<div class="verse"><span class="verse-number"><strong>' + verseNumber + '</strong></span><span class="verse-content" id="translated_verse_' + verseNumber + '" contenteditable="true" >' + finalText + '</span></div>';
        document.getElementById("verse_translated_" + verseNumber).innerHTML = "";
        document.getElementById("verse_translated_" + verseNumber).appendChild(verseTranslatedContainer);

        updateTranslatedContent(verseNumber, finalText);

        document.getElementById("translated_verse_" + verseNumber).addEventListener("focusout", function (e) {
            let contentToSave = document.getElementById("translated_verse_" + verseNumber).textContent;
            updateTranslatedContent(verseNumber, contentToSave);
        });
        if (isLastTranslation) {
            stopTranslateProgress();
            okMessage("Przetłumaczono");
        }
    });
}

function setNewIndex(verse, newContent) {
    let key = selectedTestament + "_" + selectedBook + "_" + selectedChapter + "_" + verse + "_pl";
    if (newContent === "") {
        newIndexes.delete(key);
    } else {
        newIndexes.set(key, newContent);
    }
}

function setNewBibleTranslationLocal(verse, newContent) {
    let booksList = bibleTranslated[selectedTestament];
    booksList.forEach((book) => {
        if (book.bookName === selectedBook) {
            let chapterIndex = parseInt(selectedChapter) - 1;
            let verseIndex = parseInt(verse) - 1;
            book.chapters[chapterIndex].verses[verseIndex].verseContent = newContent;
        }
    });
}

function updateTranslatedContent(verse, newContent) {
    needSave = true;
    let verseTranslated = document.getElementById("translated_verse_"+verse);
    verseTranslated.classList.add("verse-translated-new");

    setNewBibleTranslationLocal(verse, newContent);
    setNewIndex(verse, newContent);
}

async function getTranslatedText(text) {
    if (text === "") {
        return "";
    }
    let translatedValue = "";
    if (useFreeTranslator) {
        translatedValue = await getFreeTranslation(text).then(function (value) {
            return value;
        });
        return JSON.parse(translatedValue).text[0];
    } else {
        translatedValue = await getTranslation(text).then(function (value) {
            return value;
        });
        return JSON.parse(translatedValue).responseData.translatedText;
    }
}

function getFreeTranslation(text) {
    return new Promise(function (resolve) {
        let xhr = new XMLHttpRequest();
        const key = 'trnsl.1.1.20200309T081944Z.adcba4bfddab489e.8958e1d8316582266abeecb473d0c2cd1c651b9a&lang=en-pl';
        xhr.open('POST', 'https://translate.yandex.net/api/v1.5/tr.json/translate?key=' + key, true);
        xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xhr.responseType = "text";
        xhr.onload = function () {
            resolve(xhr.response);
        };

        xhr.send("text=" + text);
    });
}

function getTranslation(text) {
    return new Promise(function (resolve) {
        let xhr = new XMLHttpRequest();//eafa5a5bfe5eb9869b24
        //05465b163d73187adb76
        xhr.open('POST', 'https://api.mymemory.translated.net/get?q=' + text + '&key=05465b163d73187adb76&langpair=en|pl&de=kamiwal92@gmail.com', true);
        xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xhr.onload = function () {
            resolve(xhr.response);
        };
        xhr.send();
    });
}
