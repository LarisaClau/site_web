<?php

require '../dbcon.php';

function getProductList(){

    global $conn; 

    $query = "SELECT * FROM products"; 
    $query_run = mysqli_query($conn, $query); 

    if($query_run){ 
        if(mysqli_num_rows($query_run) > 0){ 

            $res = mysqli_fetch_all($query_run, MYSQLI_ASSOC); 

            $data = [
                'status' => 200,
                'message' => 'Product List Fetched Successfully',
                'data' => $res
            ];
            header("HTTP/1.0 200 Internal OK");
            return json_encode($data);

        }else {
            $data = [
                'status' => 404,
                'message' => 'No Product Found',
            ];
            header("HTTP/1.0 404  No Product Found");
            return json_encode($data);
        }
    }
    else
    {
        $data = [
            'status' => 500,
            'message' => 'Internal Server Error',
        ];
        header("HTTP/1.0 500 Internal Server Error");
        return json_encode($data);
    }
}

function getProduct($productInput)
{
    global $conn;

    $id = mysqli_real_escape_string($conn, $productInput['id']);

    $querySelectProduct = "SELECT * FROM products WHERE id = '$id'";
    $query_run = mysqli_query($conn, $querySelectProduct);


    if (mysqli_num_rows($query_run) != 0) {
        $res = mysqli_fetch_all($query_run, MYSQLI_ASSOC); 
            $data = [
                'status' => 200,
                'message' => 'Produsul a fost gasit cu succes!',
                'data' => $res,
                'id' => $id
            ];
            header("HTTP/1.0 200");
            return json_encode($data);
        
    } else {
        $data = [
            'status' => 100,
            'message' => 'Produsul nu a fost gasit!',
            'id' => $id
        ];
        header("HTTP/1.0");
        return json_encode($data);
    }
}


?>