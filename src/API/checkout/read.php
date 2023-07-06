<?php 
include('../headers.php'); 
include('function.php'); 

$requestMethod = $_SERVER["REQUEST_METHOD"];

if($requestMethod == "POST") { 
    $inputData = json_decode(file_get_contents("php://input"), true);

    if(empty($inputData)) {
        $storeCheckout = storeCheckout($_POST);
    }
    else 
    {
        $storeCheckout = storeCheckout($inputData); 
    }
    echo $storeCheckout;
    
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