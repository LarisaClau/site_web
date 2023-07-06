<?php

require '../dbcon.php';

function deleteCartItem($cartInput)
{
    global $conn;

    $cart_item_id = mysqli_real_escape_string($conn, $cartInput['cart_id']);

    $queryDeleteCartItem = "DELETE FROM cart WHERE id_cart = '$cart_item_id'";
    mysqli_query($conn, $queryDeleteCartItem);

    if (mysqli_query($conn, $queryDeleteCartItem) != 0) {

        $data = [
            'status' => 200,
            'message' => 'Elementul a fost șters din cos!',
            'id' => $cart_item_id
        ];
        header("HTTP/1.0 200");
        return json_encode($data);
    } else {
        $data = [
            'status' => 100,
            'message' => 'Elementul nu a fost șters din cos!',
            'id' => $cart_item_id
        ];
        header("HTTP/1.0 200");
        return json_encode($data);
    }
}
