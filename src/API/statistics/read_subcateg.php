<?php 

include('../headers.php'); 
include('function.php'); 

$requestMethod = $_SERVER["REQUEST_METHOD"]; 
if($requestMethod == "GET") { 
    $nrOfSubcategories = getNrOfSubcategories(); 
    echo $nrOfSubcategories; 
}
else 
{
    $data = [
        'status' => 405,
        'message' => $requestMethod. 'Method Not Allowed',
    ];
    header("HTTP/1.0 405 Method Not Allowed");
    echo json_encode($data); 
}

?>