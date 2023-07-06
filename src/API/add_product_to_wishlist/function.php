<?php

require '../dbcon.php';

function addWishlistItem($productWishlistData)
{
    global $conn;

    $productId = mysqli_real_escape_string($conn, $productWishlistData['productId']);
    $userId = mysqli_real_escape_string($conn, $productWishlistData['userId']);
    $productType = mysqli_real_escape_string($conn, $productWishlistData['productType']);

    if ($productType == 'product') {
        $queryAddProductItem = "INSERT INTO wishlist(id_product, id_user, product_type) VALUES ('$productId', '$userId', '$productType')";
        $query_run = mysqli_query($conn, $queryAddProductItem);

        if (mysqli_num_rows($query_run) != 0) {

            $data = [
                'status' => 100,
                'message' => 'Produsul nu a putut fi adaugat in wishlist!',
                'productId' => $productId,
                'userId' => $userId
            ];
            header("HTTP/1.0");
            return json_encode($data);
        } else {
            $data = [
                'status' => 200,
                'message' => 'Produsul a fost adaugat in wishlist!',
                'productId' => $productId,
                'userId' => $userId,
                'productType' => $productType
            ];
            header("HTTP/1.0 200");
            return json_encode($data);
        }
    } else {
        if ($productType == 'course') {
            $queryAddCourseItem = "INSERT INTO wishlist(id_product, id_user, product_type) VALUES ('$productId', '$userId', '$productType')";
            $query_run_2 = mysqli_query($conn, $queryAddCourseItem);

            if (mysqli_num_rows($query_run_2) != 0) {

                $data = [
                    'status' => 100,
                    'message' => 'Cursul nu a putut fi adaugat in wishlist!',
                    'productId' => $productId,
                    'userId' => $userId
                ];
                header("HTTP/1.0");
                return json_encode($data);
            } else {
                $data = [
                    'status' => 200,
                    'message' => 'Cursul a fost adaugat in wishlist!',
                    'productId' => $productId,
                    'userId' => $userId,
                    'productType' => $productType
                ];
                header("HTTP/1.0 200");
                return json_encode($data);
            }
        }
    }
}
