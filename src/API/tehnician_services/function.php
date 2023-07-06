<?php

require '../dbcon.php';

function getServices($servicesInput)
{
    global $conn;

    $id_tehnician = mysqli_real_escape_string($conn, $servicesInput['id_tehnician']);

    $querySelectServices = "SELECT * FROM tehnician_services
                            INNER JOIN service ON tehnician_services.id_service = service.id_service 
                            WHERE tehnician_services.id_tehnician = '$id_tehnician'";
    $query_run = mysqli_query($conn, $querySelectServices);
    

    if (mysqli_num_rows($query_run) != 0) {
        $res = mysqli_fetch_all($query_run, MYSQLI_ASSOC); 
            $data = [
                'status' => 200,
                'message' => 'Serviciilor au fost gasite cu succes!',
                'data' => $res,
                'id_tehnician' => $id_tehnician
            ];
            header("HTTP/1.0 200");
            return json_encode($data);
        
    } else {
        $data = [
            'status' => 100,
            'message' => 'Serviciilor nu au fost gasite!',
            'id_tehnician' => $id_tehnician
        ];
        header("HTTP/1.0");
        return json_encode($data);
    }
}