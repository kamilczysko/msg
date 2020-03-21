<?php
$listOfChangedVerses = json_decode($_POST['translated'], true);
$indexToSave = NULL;
$indexes = json_decode(str_replace("bible_index=", "", file_get_contents("./bible/bible_index.json")), true);
foreach ($listOfChangedVerses as &$record) {
    $shouldAddNewRecord = TRUE;
    for ($i = 0; $i < count($indexes); $i++) {
        if ($indexes[$i]['location'] == $record['location']) {
            $indexes[$i]['content'] = $record['content'];
            $shouldAddNewRecord = FALSE;
            break;
        }
    }
    if($shouldAddNewRecord){
        array_push($indexes, $record);
    }
}


$saved_file = file_put_contents('./bible/bible_index.json', utf8_decode("bible_index=" . json_encode($indexes)));

if (($saved_file === false) || ($saved_file == -1)) {
    var_export(http_response_code(500));
} else {
    var_export(http_response_code(200));
}