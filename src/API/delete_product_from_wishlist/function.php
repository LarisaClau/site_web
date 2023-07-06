<?php

require '../dbcon.php';

function deleteWishlistItem($wishlistInput)
{
    global $conn;

    $productId = mysqli_real_escape_string($conn, $wishlistInput['productId']);
    $userId = mysqli_real_escape_string($conn, $wishlistInput['userId']);
    $productType = mysqli_real_escape_string($conn, $wishlistInput['productType']);


    $queryDeleteWishlistItem = "DELETE FROM wishlist WHERE id_product = '$productId' AND id_user = '$userId' AND product_type = '$productType'";
    $query_run = mysqli_query($conn, $queryDeleteWishlistItem);

    if (mysqli_num_rows($query_run) != 0) {
        $data = [
            'status' => 100,
            'message' => 'Elementul nu a fost șters din lista de dorințe!',
            'productId' => $productId,
            'userId' => $userId,
            'productType' => $productType
        ];
        header("HTTP/1.0 200");
        return json_encode($data);
    } else {
        $data = [
            'status' => 200,
            'message' => 'Elementul a fost șters din lista de dorințe!',
            'productId' => $productId,
            'userId' => $userId,
            'productType' => $productType
        ];
        header("HTTP/1.0 200");
        return json_encode($data);
    }
}
