<?php

require '../dbcon.php';

function getReview($userInput)
{
    global $conn;

    $id_user = mysqli_real_escape_string($conn, $userInput['id_user']);
    $user_name= mysqli_real_escape_string($conn, $userInput['user_name']);
    $review = mysqli_real_escape_string($conn, $userInput['review']);
    $stars = mysqli_real_escape_string($conn, $userInput['stars']);
    $id_product = mysqli_real_escape_string($conn, $userInput['id_product']);
    $type = mysqli_real_escape_string($conn, $userInput['type']);


    $queryAddReview = "INSERT INTO reviews(id_user, user_name, review, star, id_product, type) VALUES ('$id_user', '$user_name', '$review', '$stars', '$id_product', '$type')";
    $query_run = mysqli_query($conn, $queryAddReview);


    if ($query_run) {
        //$res = mysqli_fetch_all($query_run, MYSQLI_ASSOC);

        $data = [
            'status' => 200,
            'message' => 'Review-ul a fost trimis cu succes!',
        ];
        header("HTTP/1.0 200");
        return json_encode($data);
    } else {
        $data = [
            'status' => 100,
            'message' => 'Review-ul nu s-a putut trimite!',
            
        ];
        header("HTTP/1.0");
        return json_encode($data);   
    }
}

function getReviews($userInput)
{
    global $conn;

    $id = mysqli_real_escape_string($conn, $userInput['id']);

    $querySelecReviews = "SELECT * 
                            FROM reviews
                            INNER JOIN products ON reviews.id_product = products.id
                            WHERE id_user = '$id' AND type = 'product'";
    $query_run = mysqli_query($conn, $querySelecReviews);

    $querySelecReviewsCourses = "SELECT * 
                            FROM reviews
                            INNER JOIN courses ON reviews.id_product = courses.id
                            WHERE id_user = '$id' AND type = 'course'";
    $query_run_2 = mysqli_query($conn, $querySelecReviewsCourses);


    if (mysqli_num_rows($query_run) != 0 || mysqli_num_rows($query_run_2) != 0) {
        $res = mysqli_fetch_all($query_run, MYSQLI_ASSOC);
        $res_2 = mysqli_fetch_all($query_run_2, MYSQLI_ASSOC);

        $data = [
            'status' => 200,
            'message' => 'Review-urile au fost gasite cu succes!',
            'data' => $res,
            'data_2' => $res_2,
            'id' => $id
        ];
        header("HTTP/1.0 200");
        return json_encode($data);
    } else {
        $data = [
            'status' => 100,
            'message' => 'Review-urile nu au fost gasite!',
            'id' => $id
        ];
        header("HTTP/1.0");
        return json_encode($data);
    }
}

function deleteReview($reviewInput)
{
    global $conn;

    $user_id = mysqli_real_escape_string($conn, $reviewInput['userId']);
    $id_review = mysqli_real_escape_string($conn, $reviewInput['id_review']);


    $queryDeleteWishlistItem = "DELETE FROM reviews WHERE id_user = '$user_id' AND id_review = '$id_review'";
    $query_run = mysqli_query($conn, $queryDeleteWishlistItem);

    if (mysqli_num_rows($query_run) != 0) {
        $data = [
            'status' => 100,
            'message' => 'Review-ul nu s-a putut sterge!',
            'userId' => $user_id,
            'id_review' => $id_review
        ];
        header("HTTP/1.0");
        return json_encode($data);
    } else {
        $data = [
            'status' => 200,
            'message' => 'Review-ul a fost sters!',
            'userId' => $user_id,
            'id_review' => $id_review
        ];
        header("HTTP/1.0 200");
        return json_encode($data);
    }
}

