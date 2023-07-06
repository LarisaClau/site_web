<?php

require '../dbcon.php';

function storeUserPassword($userInput)
{
    global $conn;
    $idUser = mysqli_real_escape_string($conn, $userInput['id']);

    $password = mysqli_real_escape_string($conn, $userInput['password']);
    $newPassword = mysqli_real_escape_string($conn, $userInput['newPassword']);

    $query = "SELECT * FROM register WHERE id = '$idUser' AND password = '$password'";
    $query_run = mysqli_query($conn, $query);

    if (mysqli_num_rows($query_run) != 0) {
        $update = "UPDATE register SET password = '$newPassword' WHERE id = '$idUser'";
        $update_run = mysqli_query($conn, $update);

        if ($update_run) {
            $data = [
                'status' => 200,
                'message' => 'Parola a fost schimbata!',
            ];
            header("HTTP/1.0 200 OK");
        } else {
            $data = [
                'status' => 100,
                'message' => 'Parola nu s-a putut schimba!',
            ];
            header("HTTP/1.0");
        }
    } else {
        $data = [
            'status' => 100,
            'message' => 'Parola actuala este gresita!',
        ];
        header("HTTP/1.0");
    }

    return json_encode($data);
}
