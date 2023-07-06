<?php

require '../dbcon.php';

function getProductsNumberCart($userInput)
{
    global $conn;

    $id = mysqli_real_escape_string($conn, $userInput['id_user']);

    $query = "SELECT SUM(quantity) AS total_products
              FROM cart
              WHERE id_user = '$id'";
    $query_run = mysqli_query($conn, $query);

    if (mysqli_num_rows($query_run) != 0) {
        $res = mysqli_fetch_all($query_run, MYSQLI_ASSOC);

        $data = [
            'status' => 200,
            'message' => 'Nr. de produse din cos a fost gasit cu succes!',
            'data' => $res,
            'id' => $id
        ];
        header("HTTP/1.0 200");
        return json_encode($data);
    } else {
        $data = [
            'status' => 100,
            'message' => 'Nr. de produse din cos nu a fost gasit!',
            'id' => $id
        ];
        header("HTTP/1.0");
        return json_encode($data);
    }
    

}
