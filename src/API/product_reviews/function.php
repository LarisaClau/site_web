<?php

require '../dbcon.php';

function getReviews($reviewsInput)
{
    global $conn;

    $id_product = mysqli_real_escape_string($conn, $reviewsInput['id_product']);
    $type = mysqli_real_escape_string($conn, $reviewsInput['type']);

    $querySelectProduct = "SELECT * FROM reviews WHERE id_product = '$id_product' AND type = '$type'";
    $query_run = mysqli_query($conn, $querySelectProduct);


    if (mysqli_num_rows($query_run) != 0) {
        $res = mysqli_fetch_all($query_run, MYSQLI_ASSOC); 
            $data = [
                'status' => 200,
                'message' => 'Produsul a fost gasit cu succes!',
                'data' => $res,
                'id' => $id_product
            ];
            header("HTTP/1.0 200");
            return json_encode($data);
        
    } else {
        $data = [
            'status' => 100,
            'message' => 'Produsul nu a fost gasit!',
            'id' => $id_product
        ];
        header("HTTP/1.0");
        return json_encode($data);
    }
}


?>