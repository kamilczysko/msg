<?php
$listOfChangedVerses = json_decode($_POST['translated'], true);

$bibleToSave = NULL;
$translatedBible = json_decode(str_replace("bible_pl=", "", file_get_contents("./bible/translations/bible_pl.json")), true);
foreach ($listOfChangedVerses as &$record) {
    $location = $record['location'];
    $locationParts = explode("_", $location);
    $testament = $locationParts[0];
    $bookName = $locationParts[1];
    $chapter = $locationParts[2];
    $verseNumber = $locationParts[3];
    $bookIndex = NULL;
    for ($i = 0; $i < count($translatedBible[$testament]); $i++) {
        if ($translatedBible[$testament][$i]['bookName'] == $bookName) {
            $bookIndex = $i;
            break;
        }
    }

    if (is_null($bookIndex)) {
        continue;
    }

    $translatedBible[$testament][$bookIndex]['chapters'][intval($chapter) - 1]['verses'][intval($verseNumber) - 1]['verseContent'] = $record['content'];
}
$saved_file = file_put_contents('./bible/translations/bible_pl.json', "bible_pl=" . json_encode($translatedBible));
if (($saved_file === false) || ($saved_file == -1)) {
    var_export(http_response_code(500));
} else {
    var_export(http_response_code(200));
}
