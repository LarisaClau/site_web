<?php

require '../dbcon.php';

function getProductCart($userInput)
{
    global $conn;

    $id = mysqli_real_escape_string($conn, $userInput['id']);

    $querySelectProductCart = "SELECT * 
                            FROM cart
                            INNER JOIN products ON cart.id_product = products.id
                            WHERE id_user = '$id' AND product_type = 'product'";
    $query_run = mysqli_query($conn, $querySelectProductCart);

    $querySelectCourseCart = "SELECT * 
                              FROM cart
                              INNER JOIN courses ON cart.id_product = courses.id
                              WHERE id_user = '$id' AND product_type = 'course'";
    $query_run_2 = mysqli_query($conn, $querySelectCourseCart);

    if (mysqli_num_rows($query_run) != 0 || mysqli_num_rows($query_run_2) != 0) {
        $res = mysqli_fetch_all($query_run, MYSQLI_ASSOC);
        $res_2 = mysqli_fetch_all($query_run_2, MYSQLI_ASSOC);

        $data = [
            'status' => 200,
            'message' => 'Cosul de cumparaturi cu produse a fost gasit cu succes!',
            'data' => $res,
            'data_2' => $res_2,
            'id' => $id
        ];
        header("HTTP/1.0 200");
        return json_encode($data);
    } else {
        $data = [
            'status' => 100,
            'message' => 'Cosul de cumparaturi nu a fost gasit!',
            'id' => $id
        ];
        header("HTTP/1.0");
        return json_encode($data);
    }
    

}
