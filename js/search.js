async function searchThing() {
    startSearchProgress();
    let res = await searchText();
    if (res) {
        stopSearchProgress();
    }
}

function searchText() {
    return new Promise(resolve => {
        setTimeout(function () {
            let textToSearch = document.getElementById("search-field").value;
            console.log("search text: " + textToSearch);
            if (!textToSearch) {
                return;
            }
            makeIndexationIfNecessary();

            let result = searchIdx.search(textToSearch);

            document.getElementById("dropdown-content-search").innerHTML = "";
            document.getElementById("search-label").innerHTML = "Znaleziono: " + result.length + " wyników";

            let locationsToVersesList = getFoundLocationToVerseNumbersList(result);
            let locations = Array.from(locationsToVersesList.keys());
            locations.forEach(function (location) {
                let loc = location.split("_");
                let testament = loc[0];
                let book = loc[1];
                let chapter = loc[2];

                let label = translate(book) + " roz." + chapter + "(" + locationsToVersesList.get(location).length + ")";

                let searchResult = document.createElement("div");
                searchResult.setAttribute("class", "menu-item-search");

                if (testament === 'newTestament') {
                    searchResult.innerHTML = '<a class="new-testament-search-label" id="search_' + loc + '" href=#>' + label + "<strong> (N) </strong>  " + '</a>';
                } else {
                    searchResult.innerHTML = '<a id="search_' + loc + '" href=#>' + label + '</a>';
                }
                document.getElementById("dropdown-content-search").appendChild(searchResult);
                document.getElementById("search_" + loc).onclick = function () {
                    document.getElementById("search-label").innerHTML = label;
                    selectTestament(testament);
                    selectBook(book);
                    selectedChapter = chapter;
                    setChapterForSearch(chapter, locationsToVersesList.get(location));
                };
            });
            resolve(true);
        }, 500);
    });
}

function makeIndexationIfNecessary() {
    if (searchIdx == null) {
        console.log("indexation start");
        searchIdx = lunr(function () {
            this.ref("location");
            this.field("content");

            bibleIndex.forEach(function (doc) {
                this.add(doc);
            }, this);
        });
        console.log("indexation finish");
    }
}

function getFoundLocationToVerseNumbersList(result) {
    let resultMap = new Map();
    result.forEach(function (res) {
        let splitData = res.ref.split("_");
        let key = splitData[0] + "_" + splitData[1] + "_" + splitData[2];
        if (resultMap.has(key)) {
            resultMap.get(key).push(parseInt(splitData[3]));
        } else {
            resultMap.set(key, [parseInt(splitData[3])]);
        }
    });
    return resultMap;
}