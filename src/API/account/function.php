<?php

require '../dbcon.php';

function error422($message)
{
    $data = [
        'status' => 422,
        'message' => $message,
    ];

    header("HTTP/1.0 422 Unprocessable Entity");
    echo json_encode($data);
    exit();
}

//Functie pentru a inregistra utilizatorul
function storeUser($userInput)
{
    global $conn;

    $name = mysqli_real_escape_string($conn, $userInput['name']);
    $fname = mysqli_real_escape_string($conn, $userInput['fname']);
    $birthday = mysqli_real_escape_string($conn, $userInput['birthday']);
    $email = mysqli_real_escape_string($conn, $userInput['email']);
    $password = mysqli_real_escape_string($conn, $userInput['password']);

    $queryVerifyAlreadyUser = "SELECT * FROM register WHERE email = '$email' ";
    $resultQueryVerifyAlreadyUser = mysqli_query($conn, $queryVerifyAlreadyUser);


    if (mysqli_num_rows($resultQueryVerifyAlreadyUser) == 0) {

        $query = "INSERT INTO register (name, fname, birthday, email, password) VALUES ('$name', '$fname', '$birthday', '$email', '$password')";
        $result = mysqli_query($conn, $query);

        if ($result) {
            $data = [
                'status' => 200,
                'message' => 'Ati fost inregistrat cu succes!',
            ];
            header("HTTP/1.0 201 Created");
            return json_encode($data);
        } else {
            $data = [
                'status' => 100,
                'message' => 'Internal Server Error',
            ];
            header("HTTP/1.0");
            return json_encode($data);
        }
    } else {
        $data = [
            'status' => 100,
            'message' => 'Utilizatorul exista deja',
        ];
        header("HTTP/1.0");
        return json_encode($data);
    }
}





//Functie pentru a conecta utilizatorul
function loginUser($userInput)
{
    global $conn;

    $email = mysqli_real_escape_string($conn, $userInput['email']);
    $password = mysqli_real_escape_string($conn, $userInput['password']);

    $queryVerifyUserExist = "SELECT * FROM register WHERE email = '$email' AND password = '$password' ";
    $query_run = mysqli_query($conn, $queryVerifyUserExist);


    if (mysqli_num_rows($query_run) != 0) {
        $res = mysqli_fetch_all($query_run, MYSQLI_ASSOC); 
            $data = [
                'status' => 200,
                'message' => 'Ai fost conectat cu succes!',
                'data' => $res
            ];
            header("HTTP/1.0 200");
            return json_encode($data);
        
    } else {
        $data = [
            'status' => 100,
            'message' => 'Emailul sau parola nu sunt corecte. Incearca din nou!',
        ];
        header("HTTP/1.0");
        return json_encode($data);
    }
}

