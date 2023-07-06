<?php

require '../dbcon.php';

function getNewProductList()
{

    global $conn;

    $query = "SELECT * FROM products ORDER BY add_date DESC LIMIT 5";
    $query_run = mysqli_query($conn, $query);

    if ($query_run) {
        if (mysqli_num_rows($query_run) > 0) {

            $res = mysqli_fetch_all($query_run, MYSQLI_ASSOC);

            $data = [
                'status' => 200,
                'message' => 'New Product From Home List Fetched Successfully',
                'data' => $res
            ];
            header("HTTP/1.0 200 Internal OK");
            return json_encode($data);
        } else {
            $data = [
                'status' => 404,
                'message' => 'No New Product Found',
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

function getBestsellerProductList()
{
    global $conn;

    $query = "SELECT * FROM (
                            SELECT id_product, SUM(quantity) AS total
                            FROM orders_products
                            GROUP BY id_product
                            ORDER BY total DESC
                            LIMIT 5 ) AS orders_products 
              INNER JOIN products ON orders_products.id_product = products.id";
    $query_run = mysqli_query($conn, $query);

    if ($query_run) {
        if (mysqli_num_rows($query_run) > 0) {

            $res = mysqli_fetch_all($query_run, MYSQLI_ASSOC);

            $data = [
                'status' => 200,
                'message' => 'Bestseller Product From Home List Fetched Successfully',
                'data' => $res
            ];
            header("HTTP/1.0 200 Internal OK");
            return json_encode($data);
        } else {
            $data = [
                'status' => 404,
                'message' => 'No Bestseller Product Found',
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
