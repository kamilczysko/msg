document.getElementById("translate-all").onclick = async function () {
    startTranslateProgress(true);
    console.log("translate all");
    let versesToTranslate = getActualChapter().verses;
    for (let i = 0; i < versesToTranslate.length; i++) {
        let verseNumber = i + 1;
        let isLast = (i === versesToTranslate.length - 1);
        await doTranslation(versesToTranslate[i].verseContent, verseNumber, isLast);
    }
};

document.getElementById("translate-empty").onclick = function () {
    console.log("translate empty");
    let versesToTranslate = getActualChapter().verses;
    let versesTranslated = getActualTranslatedChapter().verses;
    let itemsToTranslate = [];

    for (let i = 0; i < versesToTranslate.length; i++) {
        if (versesTranslated[i].verseContent === "" || versesTranslated[i].verseContent.includes("MYMEMORY WARNING")) {
            itemsToTranslate.push(versesToTranslate[i]);
        }
    }
    if (itemsToTranslate.length > 0) {
        startTranslateProgress();
    }
    itemsToTranslate.forEach(async (verse, i) => {
        let isLast = i === itemsToTranslate.length - 1;
        await doTranslation(verse.verseContent, verse.verseNumber, isLast);
    });
};

document.getElementById("translator_choose").onclick = () => {
    useFreeTranslator = document.getElementById("translator_choose").checked;
};

document.getElementById("save-button").onclick = function () {
    console.log("save");
    startSaveLoader();
    let dataToSave = prepareProperIndexes();
    let stats = prepareStats(dataToSave);
    console.log("STATS"+stats);
    let xhr = requestSaveTranslationService();
    xhr.onload = function () {
        console.log("save translations - service response: " + xhr.response);
        console.log("save translations - service response: " + xhr.status);
        if (parseInt(xhr.response) === 500) {
            nokMessage("Błąd zapisu");
        }
        if (parseInt(xhr.response) === 200) {
            let idx = requestSaveIndexService();
            idx.onload = function () {
                console.log("save index - service response: " + idx.response);
                console.log("SAVE OK");
                if (parseInt(idx.response) === 200) {
                    stopSaveLoader();
                    okMessage("Zapisano");
                    addToLocalIndexes();
                    blankStyleForModifiedVersesOnVisibleSite();
                    searchIdx = null;
                    newIndexes = new Map();
                    needSave = false;
                } else {
                    nokMessage("Błąd zapisu indeksu" + idx.response);
                    document.getElementById("loader").innerHTML = "";
                }
            };
            idx.send("translated=" + JSON.stringify(dataToSave));
            let r = saveStats("stats="+JSON.stringify(stats));
            r.onload = function(){
                console.log(r.response);
            };
            
        } else {
            nokMessage("Błąd zapisu tłumaczeń" + xhr.response);
            document.getElementById("loader").innerHTML = "";
        }
    };
    xhr.send("translated=" + JSON.stringify(dataToSave));
};

function blankStyleForModifiedVersesOnVisibleSite() {
    let versesToBlank = document.getElementsByClassName("verse-translated-new");
    let length = versesToBlank.length;
    for (let index = 0; index < length; index++) {
        versesToBlank[0].classList.remove("verse-translated-new");
    }
}

function addToLocalIndexes() {
    newIndexes.forEach((value, key) => {
        let wasReplaced = false;
        for (let i = 0; i < bibleIndex.length; i++) {
            if (bibleIndex[i]['location'] === key) {
                console.log("replace: " + key + " -- " + value);
                console.log(bibleIndex[i]);
                bibleIndex[i]['content'] = value;
                wasReplaced = true;
                console.log(bibleIndex[i]);
            }
        }
        if (!wasReplaced) {
            console.log("added local index: " + key);
            bibleIndex.push({"location": key, "content": value});
        }
    });

}

function prepareProperIndexes() {
    let toSave = [];
    newIndexes.forEach((value, key) => {
        if (value !== null && value.trim() !== "") {
            let contentToSave = value.trim();
            let i = {"location": key, "content": contentToSave};
            console.log(i);
            toSave.push(i);
        }
    });
    return toSave;
}

function prepareStats(data){
    let stats = [];
    data.forEach((value)=>{
        let loc = value["location"].toString();
        let a = loc.split("_");
        let resLoc = a[1]+"_"+a[2];
        stats.push({"location": resLoc, "date": new Date().toString()});
    });
        return [...new Map(stats.map(item =>
            [item["location"], item])).values()];
}


function requestSaveIndexService() {
    let idx = new XMLHttpRequest();
    idx.open('POST', 'saveIndex.php', true);
    idx.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    return idx;
}

function requestSaveTranslationService() {
    let idx = new XMLHttpRequest();
    idx.open('POST', 'saveTranslations.php', true);
    idx.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    return idx;
}

document.getElementById("search-field").addEventListener("keyup", function (event) {
    if (event.key === "Enter") {
        searchThing();
    }
});