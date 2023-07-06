<?php

require '../dbcon.php';

function storeUserDetails($userInput)
{
    global $conn;
    $idUser = mysqli_real_escape_string($conn, $userInput['id']);

    $name = mysqli_real_escape_string($conn, $userInput['name']);
    $fname = mysqli_real_escape_string($conn, $userInput['fname']);
    $birthday = mysqli_real_escape_string($conn, $userInput['birthday']);
    $phone = mysqli_real_escape_string($conn, $userInput['phone']);

    $update = "UPDATE register SET name = '$name', fname = '$fname' , birthday = '$birthday', phone = '$phone' WHERE id = '$idUser'";
    $update_run = mysqli_query($conn, $update);


    if ($update_run) {
        $data = [
            'status' => 200,
            'message' => 'S-au actualizat datele despre utilizator',
        ];
        header("HTTP/1.0 200 OK");
    } else {
        $data = [
            'status' => 100,
            'message' => 'Nu s-au putut actualiza datele despre utilizator',
        ];
        header("HTTP/1.0");
    }
    
    return json_encode($data);

}
