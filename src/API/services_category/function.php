<?php

require '../dbcon.php';

function getServicesCategory()
{
    global $conn;

    //$id_tehnician = mysqli_real_escape_string($conn, $categoryInput['id_tehnician']);
    //$id_service = mysqli_real_escape_string($conn, $categoryInput['id_service']);

    $querySelectServices = "SELECT * FROM services_category";
    $query_run = mysqli_query($conn, $querySelectServices);
    

    if (mysqli_num_rows($query_run) != 0) {
        $res = mysqli_fetch_all($query_run, MYSQLI_ASSOC); 
            $data = [
                'status' => 200,
                'message' => 'Categoriile serviciilor au fost gasite cu succes!',
                'data' => $res,
                
            ];
            header("HTTP/1.0 200");
            return json_encode($data);
        
    } else {
        $data = [
            'status' => 100,
            'message' => 'Categoriile serviciilor nu au fost gasite!',
            
        ];
        header("HTTP/1.0");
        return json_encode($data);
    }
}