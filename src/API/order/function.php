<?php

require '../dbcon.php';

function getOrder($userInput)
{
    global $conn;

    $id_user = mysqli_real_escape_string($conn, $userInput['id']);
    $id_order = mysqli_real_escape_string($conn, $userInput['id_order']);


    $querySelectOrder = "SELECT * 
                         FROM orders
                         LEFT JOIN orders_products ON orders.id_order = orders_products.id_order
                         LEFT JOIN products ON products.id = orders_products.id_product
                         WHERE orders.id_user = '$id_user' AND orders.id_order = '$id_order'";
    $query_run = mysqli_query($conn, $querySelectOrder);

    $querySelectOrder2 = "SELECT * 
                         FROM orders
                         WHERE orders.id_user = '$id_user' AND orders.id_order = '$id_order'";
    $query_run2 = mysqli_query($conn, $querySelectOrder2);


    if (mysqli_num_rows($query_run) != 0) {
        $res = mysqli_fetch_all($query_run, MYSQLI_ASSOC);
        $res2 = mysqli_fetch_all($query_run2, MYSQLI_ASSOC);

        $data = [
            'status' => 200,
            'message' => 'Comanda a fost gasita cu succes!',
            'data' => $res,
            'id' => $id_user,
            'id_order' => $id_order,
            'order' => $res2,
        ];
        header("HTTP/1.0 200");
        return json_encode($data);
    } else {
        $data = [
            'status' => 100,
            'message' => 'Comanda nu a fost gasita!',
            'id' => $id_user,
            'id_order' => $id_order
        ];
        header("HTTP/1.0");
        return json_encode($data);   
    }
}
