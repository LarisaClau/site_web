<?php

require '../dbcon.php';

function getTehnician($technicianInput)
{
    global $conn;

    $id_tehnician = mysqli_real_escape_string($conn, $technicianInput['id_tehnician']);

    $querySelectTehnician = "SELECT * FROM tehnician_details 
                                   INNER JOIN tehnicians ON tehnician_details.id_tehnician = tehnicians.id_tehnician
                                   WHERE tehnician_details.id_tehnician = '$id_tehnician'";
    $query_run = mysqli_query($conn, $querySelectTehnician);
    

    if (mysqli_num_rows($query_run) != 0) {
        $res = mysqli_fetch_all($query_run, MYSQLI_ASSOC); 
            $data = [
                'status' => 200,
                'message' => 'Tehnicianul a fost gasit cu succes!',
                'data' => $res,
                'id_tehnician' => $id_tehnician
            ];
            header("HTTP/1.0 200");
            return json_encode($data);
        
    } else {
        $data = [
            'status' => 100,
            'message' => 'Tehnicianul nu a fost gasit!',
            'id_tehnician' => $id_tehnician
        ];
        header("HTTP/1.0");
        return json_encode($data);
    }
}