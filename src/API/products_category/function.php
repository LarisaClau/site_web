<?php

require '../dbcon.php';

function getCategoryList(){

    global $conn; 

    $query = "SELECT * FROM products_category"; 
    $query_run = mysqli_query($conn, $query); 

    if($query_run){ 
        if(mysqli_num_rows($query_run) > 0){ 

            $res = mysqli_fetch_all($query_run, MYSQLI_ASSOC); 

            $data = [
                'status' => 200,
                'message' => 'Category List Fetched Successfully',
                'data' => $res
            ];
            header("HTTP/1.0 200 Internal OK");
            return json_encode($data);

        }else {
            $data = [
                'status' => 404,
                'message' => 'No Category Found',
            ];
            header("HTTP/1.0 404  No Category Found");
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

function getCategory($categoryInput)
{
    global $conn;

    $id = mysqli_real_escape_string($conn, $categoryInput['id']);

    $querySelectProduct = "SELECT * FROM products WHERE id_category = '$id'";
    $querySelectCategoryName = "SELECT name FROM products_category WHERE id_category = '$id'";

    $query_run = mysqli_query($conn, $querySelectProduct);
    $query_run2 = mysqli_query($conn, $querySelectCategoryName);

    if (mysqli_num_rows($query_run) != 0) {
        $res = mysqli_fetch_all($query_run, MYSQLI_ASSOC); 
        $res2 = mysqli_fetch_all($query_run2, MYSQLI_ASSOC); 

            $data = [
                'status' => 200,
                'message' => 'Categoria a fost gasita cu succes!',
                'data' => $res,
                'id_category' => $id,
                'category_name' => $res2
            ];
            header("HTTP/1.0 200");
            return json_encode($data);
        
    } else {
        $data = [
            'status' => 100,
            'message' => 'Categoria nu a fost gasita!',
            'id_category' => $id
        ];
        header("HTTP/1.0");
        return json_encode($data);
    }
}

function getTotalProductsByCategory($categoryInput) {
    global $conn;

    $id = mysqli_real_escape_string($conn, $categoryInput['id']);

    $query = "SELECT COUNT(*) AS total FROM products WHERE id_category = '$id'";
    $result = mysqli_query($conn, $query);

    if ($result) {
        $total = mysqli_fetch_assoc($result)['total'];
        $data = [
            'status' => 200,
            'message' => 'Totalul produselor a fost găsit cu succes!',
            'total' => $total
        ];
        header("HTTP/1.0 200");
        return json_encode($data);
    } else {
        $data = [
            'status' => 100,
            'message' => 'Nu s-a putut găsi totalul produselor!',
            'total' => 0
        ];
        header("HTTP/1.0");
        return json_encode($data);
    }
}



