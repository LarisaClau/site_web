<?php

require '../dbcon.php';

function getOrders($userInput)
{
    global $conn;

    $id = mysqli_real_escape_string($conn, $userInput['id']);

    $querySelectOrder = "SELECT * 
                         FROM orders
                         WHERE id_user = '$id'";
    $query_run = mysqli_query($conn, $querySelectOrder);


    if (mysqli_num_rows($query_run) != 0) {
        $res = mysqli_fetch_all($query_run, MYSQLI_ASSOC);

        $data = [
            'status' => 200,
            'message' => 'Comenzile au fost gasite cu succes!',
            'data' => $res,
            'id' => $id
        ];
        header("HTTP/1.0 200");
        return json_encode($data);
    } else {
        $data = [
            'status' => 100,
            'message' => 'Comenzile nu au fost gasite!',
            'id' => $id
        ];
        header("HTTP/1.0");
        return json_encode($data);
    }
}
