<?php

require '../dbcon.php';

function getRezervariUser($rezervareInput){

    global $conn; 
    $idUser = mysqli_real_escape_string($conn, $rezervareInput['id_user']);

    $query = "SELECT * FROM appointments 
              INNER JOIN tehnician_details ON appointments.id_tehnician = tehnician_details.id_tehnician
              INNER JOIN tehnicians ON tehnicians.id_tehnician = tehnician_details.id_tehnician
              INNER JOIN service ON service.id_service = appointments.id_service
              WHERE appointments.id_user = '$idUser'"; 
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

            $data = [
                'status' => 100,
                'message' => 'No Appointments Found',
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

function deleteAppointment($appointmentInput)
{
    global $conn;

    $id_appointment = mysqli_real_escape_string($conn, $appointmentInput['id_appointment']);

    $queryDeleteAppointment = "DELETE FROM appointments WHERE id_appointments = '$id_appointment'";
    mysqli_query($conn, $queryDeleteAppointment);

    if (mysqli_query($conn, $queryDeleteAppointment) != 0) {

        $data = [
            'status' => 200,
            'message' => 'Programarea a fost anulata!',
            'id' => $id_appointment
        ];
        header("HTTP/1.0 200");
        return json_encode($data);
    } else {
        $data = [
            'status' => 100,
            'message' => 'Programarea nu a fost anulata!',
            'id' => $id_appointment
        ];
        header("HTTP/1.0 200");
        return json_encode($data);
    }
}

?>