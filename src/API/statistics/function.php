<?php

require '../dbcon.php';

function getNrOfProducts(){

    global $conn; 

    $product_number = "SELECT COUNT(id) AS nrProducts FROM products"; 
    $result = mysqli_query($conn, $product_number); 

    if($result){ 
        if(mysqli_num_rows($result) > 0){ 

            $res = mysqli_fetch_all($result, MYSQLI_ASSOC); 

            $data = [
                'status' => 200,
                'message' => 'Nr. de produse s-a afisat cu succes!',
                'data' => $res
            ];
            header("HTTP/1.0 200 Internal OK");
            return json_encode($data);

        }else {
            $data = [
                'status' => 404,
                'message' => 'Nu s-a putut afisa nr. de produse!',
            ];
            header("HTTP/1.0 404  No Product Found");
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


function getNrOfSubcategories(){

    global $conn; 

    $product_number = "SELECT COUNT(id_subcategory) AS nrSubcateg FROM products_subcategory"; 
    $result = mysqli_query($conn, $product_number); 

    if($result){ 
        if(mysqli_num_rows($result) > 0){ 

            $res = mysqli_fetch_all($result, MYSQLI_ASSOC); 

            $data = [
                'status' => 200,
                'message' => 'Nr. de subcategorii s-a afisat cu succes!',
                'data' => $res
            ];
            header("HTTP/1.0 200 Internal OK");
            return json_encode($data);

        }else {
            $data = [
                'status' => 404,
                'message' => 'Nu s-a putut afisa nr. de subcategorii!',
            ];
            header("HTTP/1.0 404  No Product Found");
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

function getNrOfTrainers(){

    global $conn; 

    $product_number = "SELECT COUNT(DISTINCT trainer) AS nrTrainers FROM courses"; 
    $result = mysqli_query($conn, $product_number); 

    if($result){ 
        if(mysqli_num_rows($result) > 0){ 

            $res = mysqli_fetch_all($result, MYSQLI_ASSOC); 

            $data = [
                'status' => 200,
                'message' => 'Nr. trainerilor s-a afisat cu succes!',
                'data' => $res
            ];
            header("HTTP/1.0 200 Internal OK");
            return json_encode($data);

        }else {
            $data = [
                'status' => 404,
                'message' => 'Nu s-a putut afisa nr. trainerilor!',
            ];
            header("HTTP/1.0 404  No Product Found");
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

function getNrOfCities(){

    global $conn; 

    $product_number = "SELECT COUNT(DISTINCT city) AS nrCities FROM tehnicians"; 
    $result = mysqli_query($conn, $product_number); 

    if($result){ 
        if(mysqli_num_rows($result) > 0){ 

            $res = mysqli_fetch_all($result, MYSQLI_ASSOC); 

            $data = [
                'status' => 200,
                'message' => 'Nr. oraselor s-a afisat cu succes!',
                'data' => $res
            ];
            header("HTTP/1.0 200 Internal OK");
            return json_encode($data);

        }else {
            $data = [
                'status' => 404,
                'message' => 'Nu s-a putut afisa nr. oraselor!',
            ];
            header("HTTP/1.0 404  No Product Found");
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

function getNrOfUsers(){

    global $conn; 

    $product_number = "SELECT COUNT(id) AS nrUsers FROM register"; 
    $result = mysqli_query($conn, $product_number); 

    if($result){ 
        if(mysqli_num_rows($result) > 0){ 

            $res = mysqli_fetch_all($result, MYSQLI_ASSOC); 

            $data = [
                'status' => 200,
                'message' => 'Nr. utilizatorilor s-a afisat cu succes!',
                'data' => $res
            ];
            header("HTTP/1.0 200 Internal OK");
            return json_encode($data);

        }else {
            $data = [
                'status' => 404,
                'message' => 'Nu s-a putut afisa nr. utilizatorilor!',
            ];
            header("HTTP/1.0 404  No Product Found");
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

function getNrOfOrders(){

    global $conn; 

    $product_number = "SELECT COUNT(id_order) AS nrOrders FROM orders"; 
    $result = mysqli_query($conn, $product_number); 

    if($result){ 
        if(mysqli_num_rows($result) > 0){ 

            $res = mysqli_fetch_all($result, MYSQLI_ASSOC); 

            $data = [
                'status' => 200,
                'message' => 'Nr. comenzilor s-a afisat cu succes!',
                'data' => $res
            ];
            header("HTTP/1.0 200 Internal OK");
            return json_encode($data);

        }else {
            $data = [
                'status' => 404,
                'message' => 'Nu s-a putut afisa nr. comenzilor!',
            ];
            header("HTTP/1.0 404  No Product Found");
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

function getNrOfAppointments(){

    global $conn; 

    $appointment_number = "SELECT COUNT(id_appointments) AS nrAppointments FROM appointments"; 
    $result = mysqli_query($conn, $appointment_number); 

    if($result){ 
        if(mysqli_num_rows($result) > 0){ 

            $res = mysqli_fetch_all($result, MYSQLI_ASSOC); 

            $data = [
                'status' => 200,
                'message' => 'Nr. programarilor s-a afisat cu succes!',
                'data' => $res
            ];
            header("HTTP/1.0 200 Internal OK");
            return json_encode($data);

        }else {
            $data = [
                'status' => 404,
                'message' => 'Nu s-a putut afisa nr. programarilor!',
            ];
            header("HTTP/1.0 404  No Product Found");
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

function getNrOfCourses(){

    global $conn; 

    $courses_number = "SELECT COUNT(id) AS nrCourses FROM courses"; 
    $result = mysqli_query($conn, $courses_number); 

    if($result){ 
        if(mysqli_num_rows($result) > 0){ 

            $res = mysqli_fetch_all($result, MYSQLI_ASSOC); 

            $data = [
                'status' => 200,
                'message' => 'Nr. cursurilor s-a afisat cu succes!',
                'data' => $res
            ];
            header("HTTP/1.0 200 Internal OK");
            return json_encode($data);

        }else {
            $data = [
                'status' => 404,
                'message' => 'Nu s-a putut afisa nr. cursurilor!',
            ];
            header("HTTP/1.0 404  No Product Found");
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


?>