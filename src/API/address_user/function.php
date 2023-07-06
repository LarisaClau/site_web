<?php

require '../dbcon.php';

function storeUserAddress($userInput)
{
    global $conn;
    $idUser = mysqli_real_escape_string($conn, $userInput['id']);

    $address = mysqli_real_escape_string($conn, $userInput['address']);

    $update = "UPDATE register SET address = '$address' WHERE id = '$idUser'";
    $update_run = mysqli_query($conn, $update);


    if ($update_run) {
        $data = [
            'status' => 200,
            'message' => 'Adresa a fost actualizata',
        ];
        header("HTTP/1.0 200 OK");
    } else {
        $data = [
            'status' => 100,
            'message' => 'Adresa nu s-au putut actualiza',
        ];
        header("HTTP/1.0");
    }
    
    return json_encode($data);

}
