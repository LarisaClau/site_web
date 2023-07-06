<?php

require '../dbcon.php';

function updateCart($cartData)
{
    global $conn;

    $idUser = mysqli_real_escape_string($conn, $cartData['idUser']);
    $idProduct = mysqli_real_escape_string($conn, $cartData['idProduct']);
    $quantity = mysqli_real_escape_string($conn, $cartData['quantity']);
    $productType = mysqli_real_escape_string($conn, $cartData['productType']);


    $verifyIfProductExist = "SELECT * FROM cart INNER JOIN products ON cart.id_product = products.id WHERE cart.id_product = '$idProduct' AND cart.id_user = '$idUser' AND product_type = '$productType'";
    $query_run_2 = mysqli_query($conn, $verifyIfProductExist);

    if ((mysqli_num_rows($query_run_2) != 0) && $productType == 'product') {
        $row = mysqli_fetch_assoc($query_run_2); //luam rez din interogare
        $idCart = $row['id_cart']; // luam id ul (denumirea vine din baza de date)
        $quantityFromDatabase = $row['quantity'];
        $price = $row['price'];

        $final_quantity = $quantity + $quantityFromDatabase;

        $price_total = $final_quantity * $price;

        $update = "UPDATE cart SET quantity = '$final_quantity', price_total = '$price_total' WHERE id_cart = '$idCart' AND product_type = '$productType'";
        $update_run = mysqli_query($conn, $update);

        if (mysqli_num_rows($update_run) != 0) {

            $data = [
                'status' => 100,
                'message' =>  'A apărut o eroare la actualizarea cantității produsului în coș. Vă rugăm să încercați din nou!'

            ];
            header("HTTP/1.0");
            return json_encode($data);
        } else {
            $data = [
                'status' => 200,
                'message' => 'Produsul există deja în coș, cantitatea a fost actualizată la ' . $final_quantity . ' bucăți!',
            ];
            header("HTTP/1.0 200");
            return json_encode($data);
        }
    } else {
        if ($productType == 'product') {
            $selecProductPrice = "SELECT * FROM products WHERE id = '$idProduct'";
            $query_run_2 = mysqli_query($conn, $selecProductPrice);

            $row = mysqli_fetch_assoc($query_run_2); //luam rez din interogare
            $price = $row['price']; // luam id ul (denumirea vine din baza de date)

            $queryAddProductItem = "INSERT INTO cart(id_user, id_product, quantity, product_type, price_total) VALUES ('$idUser', '$idProduct', '$quantity', '$productType', '$price')";
            $query_run = mysqli_query($conn, $queryAddProductItem);

            if (mysqli_num_rows($query_run) != 0) {

                $data = [
                    'status' => 100,
                    'message' => 'Produsul nu a putut fi adaugat in cos!'

                ];
                header("HTTP/1.0");
                return json_encode($data);
            } else {
                $data = [
                    'status' => 200,
                    'message' => 'Produsul a fost adaugat in cos!',
                ];
                header("HTTP/1.0 200");
                return json_encode($data);
            }
        } else {

            $idYear = mysqli_real_escape_string($conn, $cartData['year']);
            $idCity = mysqli_real_escape_string($conn, $cartData['city']);
            $idDate = mysqli_real_escape_string($conn, $cartData['date']);
            $teach = mysqli_real_escape_string($conn, $cartData['teach']);
            $payment = mysqli_real_escape_string($conn, $cartData['payment']);

            if ($productType == 'course') {
                $selectCourse = "SELECT * FROM courses WHERE id = '$idProduct'";
                $query_run = mysqli_query($conn, $selectCourse);

                $row = mysqli_fetch_assoc($query_run); //luam rez din interogare
                $fullPrice = $row['price'];
                $firstRate = $row['rate_1'];

                if ($payment == 'integral') {
                    $queryAddCourseItem = "INSERT INTO cart(id_user, id_product, quantity, product_type, price_total, course_year, course_city, course_date, teaches_classes, course_payment) VALUES ('$idUser', '$idProduct', '$quantity', '$productType', '$fullPrice', '$idYear', '$idCity', '$idDate', '$teach', '$payment')";
                    $query_run_2 = mysqli_query($conn, $queryAddCourseItem);

                    if (mysqli_num_rows($query_run_2) != 0) {

                        $data = [
                            'status' => 100,
                            'message' => 'Cursul nu a putut fi adaugat in cos!'

                        ];
                        header("HTTP/1.0");
                        return json_encode($data);
                    } else {
                        $data = [
                            'status' => 200,
                            'message' => 'Cursul a fost adaugat in cos!',
                        ];
                        header("HTTP/1.0 200");
                        return json_encode($data);
                    }
                } else {
                    if ($payment == 'avans') {
                        $queryAddCourseItem = "INSERT INTO cart(id_user, id_product, quantity, product_type, price_total, course_year, course_city, course_date, teaches_classes, course_payment) VALUES ('$idUser', '$idProduct', '$quantity', '$productType', '$firstRate', '$idYear', '$idCity', '$idDate', '$teach', '$payment')";
                        $query_run_3 = mysqli_query($conn, $queryAddCourseItem);

                        if (mysqli_num_rows($query_run_3) != 0) {

                            $data = [
                                'status' => 100,
                                'message' => 'Cursul nu a putut fi adaugat in cos!'

                            ];
                            header("HTTP/1.0");
                            return json_encode($data);
                        } else {
                            $data = [
                                'status' => 200,
                                'message' => 'Cursul a fost adaugat in cos!',
                            ];
                            header("HTTP/1.0 200");
                            return json_encode($data);
                        }
                    }
                }
            }
        }
    }
}
