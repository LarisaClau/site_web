<?php

require '../dbcon.php';

function getProductsWishList()
{

    global $conn;

    $query = "SELECT * 
              FROM ((wishlist
              INNER JOIN register ON wishlist.id_user = register.id)
              INNER JOIN products ON wishlist.id_product = products.id)";
    $query_run = mysqli_query($conn, $query);

    if ($query_run) {
        if (mysqli_num_rows($query_run) > 0) {

            $res = mysqli_fetch_all($query_run, MYSQLI_ASSOC);

            $data = [
                'status' => 200,
                'message' => 'Product List Fetched Successfully',
                'data' => $res
            ];
            header("HTTP/1.0 200 Internal OK");
            return json_encode($data);
        } else {
            $data = [
                'status' => 404,
                'message' => 'No Product Found',
            ];
            header("HTTP/1.0 404  No Product Found");
            return json_encode($data);
        }
    } else {
        $data = [
            'status' => 500,
            'message' => 'Internal Server Error',
        ];
        header("HTTP/1.0 500 Internal Server Error");
        return json_encode($data);
    }
}

function getWishlist($userInput)
{
    global $conn;

    $id = mysqli_real_escape_string($conn, $userInput['id']);

    $querySelectWishlist = "SELECT * 
                            FROM wishlist
                            INNER JOIN products ON wishlist.id_product = products.id
                            WHERE id_user = '$id' AND product_type = 'product'";
    $query_run = mysqli_query($conn, $querySelectWishlist);

    $querySelectWishlistCourse = "SELECT * 
                            FROM wishlist
                            INNER JOIN courses ON wishlist.id_product = courses.id
                            WHERE id_user = '$id' AND product_type = 'course'";
    $query_run_2 = mysqli_query($conn, $querySelectWishlistCourse);


    if (mysqli_num_rows($query_run) != 0 || mysqli_num_rows($query_run_2) != 0) {
        $res = mysqli_fetch_all($query_run, MYSQLI_ASSOC);
        $res_2 = mysqli_fetch_all($query_run_2, MYSQLI_ASSOC);

        $data = [
            'status' => 200,
            'message' => 'Wishlist-ul a fost gasit cu succes!',
            'data' => $res,
            'data_2' => $res_2,
            'id' => $id
        ];
        header("HTTP/1.0 200");
        return json_encode($data);
    } else {
        $data = [
            'status' => 100,
            'message' => 'Wishlist-ul nu a fost gasit!',
            'id' => $id
        ];
        header("HTTP/1.0");
        return json_encode($data);
    }
}
