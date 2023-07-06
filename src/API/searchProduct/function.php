<?php

require '../dbcon.php';

function searchProduct($valueInput)
{
    global $conn;
    $searchValue = mysqli_real_escape_string($conn, $valueInput['searchValue']);

    $query = "SELECT * FROM products WHERE name LIKE '%$searchValue%'";
    $query_run = mysqli_query($conn, $query);

    if (mysqli_num_rows($query_run) != 0) {
        $res = mysqli_fetch_all($query_run, MYSQLI_ASSOC);
            $data = [
                'status' => 200,
                'data' => $res,
                'message' => 'Produsele cautate au fost gasite',
                'searchValue' => $searchValue,
            ];
            header("HTTP/1.0 200 OK");
    } elseif (mysqli_num_rows($query_run) == 0) {
        $data = [
            'status' => 100,
            'message' => 'Nu exista produse cu numele cautat!',
        ];
        header("HTTP/1.0");
    } else {
        $data = [
            'status' => 100,
            'message' => 'Ceva nu a functionat bine, incearca din nou mai tarziu!',
        ];
        header("HTTP/1.0");
    }

    return json_encode($data);
}
