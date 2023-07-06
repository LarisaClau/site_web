<?php 
include('../headers.php'); 
include('function.php'); 


$requestMethod = $_SERVER["REQUEST_METHOD"];

if($requestMethod == "POST") { 
    $inputData = json_decode(file_get_contents("php://input"), true);


    if(empty($inputData)) {
        $storeYear = getYear($_POST);
    }
    else 
    {
        $storeYear = getYear($inputData); 
    }
    echo $storeYear;
    
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