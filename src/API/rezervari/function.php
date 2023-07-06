<?php


require '../dbcon.php';

function getRezervari($rezervareInput){

    global $conn; 
    $idTehnician = mysqli_real_escape_string($conn, $rezervareInput['id_tehnician']);
    $query = "SELECT * FROM appointments INNER JOIN tehnician_details ON appointments.id_tehnician = tehnician_details.id_tehnician WHERE tehnician_details.id_tehnician = '$idTehnician'"; 
    $query_run = mysqli_query($conn, $query); 

    if($query_run){ 
        if(mysqli_num_rows($query_run) > 0){ 

            $res = mysqli_fetch_all($query_run, MYSQLI_ASSOC); 

            $data = [
                'status' => 200,
                'message' => 'Appointments List Fetched Successfully',
                'data' => $res
            ];
            header("HTTP/1.0 200");
            return json_encode($data);

        }else {
        $query2 = "SELECT * FROM tehnician_details WHERE id_tehnician = '$idTehnician'"; 
         $query_run2 = mysqli_query($conn, $query2); 
         $res2 = mysqli_fetch_all($query_run2, MYSQLI_ASSOC); 


            $data = [
                'status' => 100,
                'message' => 'No Appointments Found',
                'data' => $res2
            ];
            header("HTTP/1.0");
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

function insertRezervare($rezervareInput)
{
    global $conn;
    $userId = mysqli_real_escape_string($conn, $rezervareInput['userId']);
    $idTehnician = mysqli_real_escape_string($conn, $rezervareInput['idTehnician']);
    $selectedDay = $rezervareInput['selectedDay']; 
    $selectedIdService = mysqli_real_escape_string($conn, $rezervareInput['selectedIdService']);
    $hour = mysqli_real_escape_string($conn, $rezervareInput['hour']);
    // Convertirea datei în formatul dorit
    date_default_timezone_set("Europe/Bucharest");


        $query = "INSERT INTO appointments (id_user, id_tehnician, appointment_date, id_service, appointment_hour) VALUES ('$userId', '$idTehnician', '$selectedDay', '$selectedIdService', '$hour')";
        $result = mysqli_query($conn, $query);

        if($result) {
            $data = [
                'status' => 200,
                'message' => 'Rezervarea a fost efectuata cu succes!',
                'data' => $selectedDay
            ];
            header("HTTP/1.0");
            return json_encode($data);

        }else{

            $data = [
                'status' => 100,
                'message' => 'Ceva nu a functionat bine, incearca din nou mai tarziu!',
            ];
            header("HTTP/1.0");
            return json_encode($data);
        }
}
?>