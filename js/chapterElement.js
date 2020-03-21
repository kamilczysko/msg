function fillMenuItemsWithChapterNumbers(){
    selectedBookChapters.forEach((chapter)=>{
        addChapter(chapter);
    });
    setChapter(1);
}

function addChapter(chapter){
    let chapterNumber = chapter.chapterNumber;
    let chapterElement = document.createElement("div");
    chapterElement.setAttribute("class", "menu_item");
    chapterElement.innerHTML = '<a id="chapter_' + chapterNumber + '" href=#>' + chapterNumber + '</a>';
    document.getElementById("dropdown-content-chapter").appendChild(chapterElement);
    document.getElementById("chapter_" + chapterNumber).onclick = function () {
        setChapter(chapterNumber);
    };
}

function setChapter(chapterNumber) {
    cleanContent();
    document.getElementById("chapter-label").innerHTML = chapterNumber;
    selectedChapter = chapterNumber;
    let chapterContent = getChapter(chapterNumber).verses;
    for (let verse of chapterContent){
        drawVerse(verse);
    }
}

function setChapterForSearch(chapterNumber, foundVerses) {
    cleanContent();
    document.getElementById("chapter-label").innerHTML = chapterNumber;
    selectedChapter = chapterNumber;
    let chapterContent = getChapter(chapterNumber).verses;
    for (let verse of chapterContent){
        if(foundVerses.includes(parseInt(verse.verseNumber))){
            drawVerseWithSearchResult(verse);
        }
        else {
            drawVerse(verse);
        }
    }
}

function cleanContent() {
    document.getElementById("content").innerHTML = "";
    document.getElementById("content-translated").innerHTML = "";
}

function clearChapterMenuItems(){
    document.getElementById("dropdown-content-chapter").innerHTML = "";
    document.getElementById("chapter-label").innerHTML = translate("Chapter");
}