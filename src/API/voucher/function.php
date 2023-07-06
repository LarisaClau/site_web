<?php

require '../dbcon.php';

function storeVoucher($userInput)
{
    global $conn;
    //$idUser = mysqli_real_escape_string($conn, $userInput['id']);

    $voucher_code = mysqli_real_escape_string($conn, $userInput['voucher_code']);

    $query = "SELECT * FROM vouchers WHERE cod_voucher = '$voucher_code'";
    $query_run = mysqli_query($conn, $query);


    if (mysqli_num_rows($query_run) != 0) {
        $res = mysqli_fetch_all($query_run, MYSQLI_ASSOC);
        
        $data = [
            'status' => 200,
            'message' => 'Voucher-ul a fost aplicat cu succes!',
            'data' => $res
        ];
        header("HTTP/1.0 200 OK");
    } else {
        $data = [
            'status' => 100,
            'message' => 'Voucherul nu s-a putut aplica!',
        ];
        header("HTTP/1.0");
        
    }
    
    return json_encode($data);

}
