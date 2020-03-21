<!DOCTYPE html>
<html lang="pl">
<head>
    <meta charset="utf-8">
    <link rel="stylesheet" href="./style.css">
    <script type="text/javascript" src="https://unpkg.com/lunr/lunr.js"></script>
    <script type="text/javascript" src="js/testamentElement.js"></script>
    <script type="text/javascript" src="js/bookElement.js"></script>
    <script type="text/javascript" src="js/chapterElement.js"></script>
    <script type="text/javascript" src="js/verseContent.js"></script>
    <script type="text/javascript" src="js/translation.js"></script>
    <script type="text/javascript" src="js/utils.js"></script>
    <title>The Message</title>
</head>
<body>
<?php
$translations = file_get_contents("./bible/translations/pl.json");
$books = file_get_contents("./bible/books.json");
$bible_en = file_get_contents("./bible/bible_book.json");
$bible_translated = file_get_contents("./bible/translations/bible_pl.json");
$bible_index = file_get_contents("./bible/bible_index.json");
?>
<script>
    let translationsFromFile = <?php echo $translations?>;
    let translations = JSON.parse(JSON.stringify(translationsFromFile));

    function translate(text) {
        return translations[text];
    }
</script>
<script>
    let booksFromFile = <?php echo $books?>;
    let books = JSON.parse(JSON.stringify(booksFromFile));
    let testaments = Object.keys(books);

    let bibleFromFile = <?php echo $bible_en?>;
    let bible = JSON.parse(JSON.stringify(bibleFromFile));

    let bibleTranslatedFromFile = <?php echo $bible_translated?>;
    let bibleTranslated = JSON.parse(JSON.stringify(bibleTranslatedFromFile));

    let bibleIndexFromFile = <?php echo $bible_index?>;
    let bibleIndex = JSON.parse(JSON.stringify(bibleIndexFromFile));

    let selectedTestament = null;
    let selectedBook = null;
    let selectedBookChapters = null;
    let selectedTranslatedBookChapters = null;
    let selectedChapter = null;

    let useFreeTranslator = false;
    let newIndexes = new Map();
    let searchIdx = null;
</script>

<script>function getIndexByLoc(loc) {
        for (let idx of bibleIndex) {
            if (idx.location.includes(loc)) {
                console.log(idx);
            }
        }
    }</script>
<div>
    <div class="messages" id="messages">
    </div>
    <div class="nav-bar" id="nav-bar">
        <div class="header-container">
            <div class="nav-header">
                <div class="title">
                    <div class="nav-title"><a href="index.php" style="color:black;text-decoration: none;">MSG</a></div>
                    <div class="vl"></div>
                </div>
                <div class="search-container">
                    <div class="search-component">
                        <input type="text" class="search-field" id="search-field" placeholder="Szukaj">
                        <button class="search-button" onclick="searchThing()"></button>

                    </div>
                    <div class="dropdown dropdown-search">
                        <button class="dropbtn-search" id="search-label">Wyniki wyszukiwania</button>
                        <div class="dropdown-content dropdown-content-search" id="dropdown-content-search"></div>
                    </div>

                </div>
            </div>
            <div id="vh"></div>
            <div class="dropdown-main-container">
                <div class="dropdown">
                    <button class="dropbtn" id="testament-label">Testament</button>
                    <div class="dropdown-content" id="dropdown-content-testaments"></div>
                    <script>
                        testaments.forEach((testament) => {
                            drawTestament(testament);
                        });
                    </script>
                </div>
                <div class="dropdown">
                    <button class="dropbtn" id="book-label"></button>
                    <div class="dropdown-content" id="dropdown-content-books"></div>
                </div>
                <div class="dropdown-chapter-container">
                    <div class="switch-bar"><a class="arrow-left" id="prev-chapter" href=#></a></div>
                    <div class="dropdown dropdown-chapter">
                        <button class="dropbtn dropbtn-chapter" id="chapter-label"></button>
                        <div class="dropdown-content" id="dropdown-content-chapter"></div>
                    </div>
                    <div class="switch-bar"><a class="arrow-right" id="next-chapter" href=#></a></div>
                </div>
                <script src="js/arrows.js"></script>
            </div>
            <div class="loader-search" id="loader-search"></div>
        </div>

        <div class="action-menu-container">
            <div id="loader" class="loader"></div>
            <div class="dropdown dropdown-action">
                <button class="dropbtn dropbtn-action">Akcja</button>
                <div class="dropdown-content dropdown-content-action">
                    <a id="translate-all" href=#>Tłumacz wszystko</a>
                    <a id="translate-empty" href=#>Tłumacz pozostałe</a>
                    <hr>
                    <a id="save-button" href=#>Zapisz zmiany</a>
                </div>
            </div>
        </div>
    </div>
</div>

<div class="content" id="content"></div>
<div class="content workspace">
    <div class="content content-translated" id="content-translated"></div>
    <div id="popup1" class="overlay"></div>
</div>
<div class="translator-container">
    <div class="translator">
        <label for="translator_choose">Darmowy tłumacz</label><input type="checkbox" id="translator_choose"
                                                                     name="Darmowy tłumacz">
    </div>
</div>
<script type="text/javascript" src="js/search.js"></script>
<script src="js/listeners.js"></script>
<script>clearAllLabels();</script>

</body>
</html>
