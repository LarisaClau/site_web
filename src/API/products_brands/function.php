<?php

require '../dbcon.php';

function getBrandsList(){

    global $conn; 

    $query = "SELECT* FROM products_brand"; 
    $query_run = mysqli_query($conn, $query); 

    if($query_run){ 
        if(mysqli_num_rows($query_run) > 0){ 

            $res = mysqli_fetch_all($query_run, MYSQLI_ASSOC); 

            $data = [
                'status' => 200,
                'message' => 'Brands List Fetched Successfully',
                'data' => $res
            ];
            header("HTTP/1.0 200 Internal OK");
            return json_encode($data);

        }else {
            $data = [
                'status' => 404,
                'message' => 'No Brands Found',
            ];
            header("HTTP/1.0 404  No Brands Found");
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

function getSubcategory($subcategoryInput)
{
    global $conn;

    $id = mysqli_real_escape_string($conn, $subcategoryInput['id']);

    $querySelectProductSubcategory = "SELECT * FROM products
    WHERE id_subcategory = '$id'
    ";
    $query_run = mysqli_query($conn, $querySelectProductSubcategory);
    

    if (mysqli_num_rows($query_run) != 0) {
        $res = mysqli_fetch_all($query_run, MYSQLI_ASSOC); 
            $data = [
                'status' => 200,
                'message' => 'Subcategoria a fost gasita cu succes!',
                'data' => $res,
                'id_category' => $id
            ];
            header("HTTP/1.0 200");
            return json_encode($data);
        
    } else {
        $data = [
            'status' => 100,
            'message' => 'Subcategoria nu a fost gasita!',
            'id_category' => $id
        ];
        header("HTTP/1.0");
        return json_encode($data);
    }
}
?>