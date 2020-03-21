document.getElementById("prev-chapter").onclick = function () {
    console.log(selectedChapter);
    let actualChapter = parseInt(selectedChapter);
    if (selectedChapter != null && actualChapter - 1 >= 1) {
        actualChapter -= 1;
        setChapter(actualChapter);
    }
};

document.getElementById("next-chapter").onclick = function () {
    let actualChapter = parseInt(selectedChapter);
    if (selectedChapter != null && actualChapter - 1 < selectedBookChapters.length - 1) {
        actualChapter += 1;
        setChapter(actualChapter);
    }
};