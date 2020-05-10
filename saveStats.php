<?php
$listOfChangedVerses = json_decode($_POST['stats'], true);

$stats = json_decode(file_get_contents("./stats.json"), true);
foreach ($listOfChangedVerses as &$record) {
    array_push($stats, $record);
}

$saved_file = file_put_contents('./stats.json', utf8_decode(json_encode($stats)));

if (($saved_file === false) || ($saved_file == -1)) {
    var_export(http_response_code(500));
} else {
    var_export(http_response_code(200));
}
