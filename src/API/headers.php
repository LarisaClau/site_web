<?php
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') { 
    header('Access-Control-Allow-Origin: *'); 
    header('Access-Control-Allow-Methods: POST, GET, DELETE, PUT, PATCH, OPTIONS'); 
    header('Access-Control-Allow-Headers: token, Content-Type'); 
    header('Access-Control-Max-Age: 1728000'); 
    header('Content-Length: 0'); 
    header('Content-Type: text/plain'); 
    die(); 
} 


error_reporting(0);

header('Access-Control-Allow-Origin: *'); 
header('Content-Type: application/json'); 
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, HEAD, OPTIONS");
header('Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Request-With, Access-Control-Allow-Methods, Origin'); 

?>