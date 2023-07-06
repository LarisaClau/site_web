<?php

require '../dbcon.php';


function storeCheckout($orderInput)
{
    global $conn;

    $idUser = mysqli_real_escape_string($conn, $orderInput['id_user']);

    $deliveryMethod = mysqli_real_escape_string($conn, $orderInput['delivery_method']);
    $paymentMethod =  mysqli_real_escape_string($conn, $orderInput['payment_method']);
    $shipping_address = mysqli_real_escape_string($conn, $orderInput['shipping_address']);
    $billing_address = mysqli_real_escape_string($conn, $orderInput['billing_address']);
    $total = mysqli_real_escape_string($conn, $orderInput['total']);

    $insertOrder = "INSERT INTO orders(id_user, delivery_method, payment_method, shipping_address, billing_address, total_price) VALUES ('$idUser', '$deliveryMethod', '$paymentMethod', '$shipping_address', '$billing_address', '$total')";
    $query_run = mysqli_query($conn, $insertOrder);


    if ($query_run) {
        $res = mysqli_fetch_all($query_run, MYSQLI_ASSOC);
        $row = mysqli_fetch_assoc($query_run); //luam rez din interogare
        //$id_order = $row['id_order'];
        $id_order = mysqli_insert_id($conn);

        $cartProducts = "SELECT * FROM cart WHERE id_user = '$idUser'";
        $query_run_cart = mysqli_query($conn, $cartProducts);

        if (mysqli_num_rows($query_run_cart) != 0) {
            $res_cart = mysqli_fetch_all($query_run_cart, MYSQLI_ASSOC);

            // Parcurgeți fiecare rând și inserați-l într-un alt tabel
            foreach ($res_cart as $cart_item) {
                $id_product = mysqli_real_escape_string($conn, $cart_item['id_product']);
                $type = mysqli_real_escape_string($conn, $cart_item['product_type']);
                $quantity = mysqli_real_escape_string($conn, $cart_item['quantity']);
                $course_year = mysqli_real_escape_string($conn, $cart_item['course_year']);
                $course_city = mysqli_real_escape_string($conn, $cart_item['course_city']);
                $course_date = mysqli_real_escape_string($conn, $cart_item['course_date']);
                $teaches_classes = mysqli_real_escape_string($conn, $cart_item['teaches_classes']);
                $course_payment = mysqli_real_escape_string($conn, $cart_item['course_payment']);
                

                $insert_cart_item = "INSERT INTO orders_products(id_order, id_product, type, quantity, course_year, course_city, course_date, teaches_classes, course_payment) VALUES ('$id_order', '$id_product', '$type', '$quantity', '$course_year', '$course_city', '$course_date',  '$teaches_classes','$course_payment')";
                $query_run_insert = mysqli_query($conn, $insert_cart_item);

                 if($query_run_insert){
                     $query_delete_cart_item = "DELETE FROM cart WHERE id_user = '$idUser'";
                     $query_run_delete = mysqli_query($conn, $query_delete_cart_item);
                 }
            }
        }


        $data = [
            'status' => 200,
            'message' => 'Comanda a fost plasata cu succes!',
            'data' => $res,
            'idOrder' => $id_order,
        ];
        header("HTTP/1.0 200");
        return json_encode($data);
    } else {
        $data = [
            'status' => 100,
            'message' => 'Comanda nu a putut fi plasata!',
        ];
        header("HTTP/1.0");
        return json_encode($data);
    }
}


