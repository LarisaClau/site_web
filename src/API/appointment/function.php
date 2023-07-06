<?php

require '../dbcon.php';

function getTehnicianList(){

    global $conn; 

    $query_all = "SELECT * FROM tehnicians"; 
    $result_all = mysqli_query($conn, $query_all); 

    if($result_all){ 
        if(mysqli_num_rows($result_all) > 0){ 

            $res = mysqli_fetch_all($result_all, MYSQLI_ASSOC); 

            $data = [
                'status' => 200,
                'message' => 'Tehnicians List Fetched Successfully',
                'data' => $res
            ];
            header("HTTP/1.0 200 Internal OK");
            return json_encode($data);

        }else {
            $data = [
                'status' => 404,
                'message' => 'No Product Found',
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

// function getPriceList() {
//     global $conn; 

//     $query = "SELECT price_range FROM tehnicians"; 
//     $result = mysqli_query($conn, $query); 

//     // $query_location = "SELECT * FROM tehnicians WHERE city ='$city'";
//     // $result_location = mysqli_query($conn, $query_location); 


//     // $query_price = "SELECT * FROM tehnicians WHERE price_range ='$price'";
//     // $result_location = mysqli_query($conn, $query_price); 



//     if($result){ 
//         if(mysqli_num_rows($result) > 0){ 

//             $res = mysqli_fetch_all($result, MYSQLI_ASSOC); 

//             $data = [
//                 'status' => 200,
//                 'message' => 'Tehnician List Fetched Successfully',
//                 'data' => $res
//             ];
//             header("HTTP/1.0 200 Internal OK");
//             return json_encode($data);

//         }else {
//             $data = [
//                 'status' => 404,
//                 'message' => 'No Product Found',
//             ];
//             header("HTTP/1.0 404  No Product Found");
//             return json_encode($data);
//         }
//     }
//     else
//     {
//         $data = [
//             'status' => 500,
//             'message' => 'Internal Server Error',
//         ];
//         header("HTTP/1.0 500 Internal Server Error");
//         return json_encode($data);
//     }
// }

?>