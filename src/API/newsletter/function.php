<?php

require '../dbcon.php';

function error422($message) {
    $data = [
        'status' => 422,
        'message' => $message,
    ];

    header("HTTP/1.0 422 Unprocessable Entity");
    echo json_encode($data);
    exit();
}

function storeUserNewsletter($userInput) {
    global $conn;

    $email =mysqli_real_escape_string($conn, $userInput['email']);

        $query = "INSERT INTO newsletter (email) VALUES ('$email')";
        $result = mysqli_query($conn, $query);

        if($result) {
            $data = [
                'status' => 200,
                'message' => 'V-ati abonat cu succes la newsletter!',
            ];
            header("HTTP/1.0");
            return json_encode($data);

        }else{

            $data = [
                'status' => 500,
                'message' => 'Internal Server Error',
            ];
            header("HTTP/1.0 500 Internal Server Error");
            return json_encode($data);
        }
}

?>