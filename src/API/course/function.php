<?php

require '../dbcon.php';

function getCoursesList()
{

    global $conn;

    $query = "SELECT * FROM courses";
    $query_run = mysqli_query($conn, $query);

    if ($query_run) {
        if (mysqli_num_rows($query_run) > 0) {

            $res = mysqli_fetch_all($query_run, MYSQLI_ASSOC);

            $data = [
                'status' => 200,
                'message' => 'Courses List Fetched Successfully',
                'data' => $res
            ];
            header("HTTP/1.0 200 Internal OK");
            return json_encode($data);
        } else {
            $data = [
                'status' => 404,
                'message' => 'No Courses Found',
            ];
            header("HTTP/1.0 404  No Courses Found");
            return json_encode($data);
        }
    } else {
        $data = [
            'status' => 500,
            'message' => 'Internal Server Error',
        ];
        header("HTTP/1.0 500 Internal Server Error");
        return json_encode($data);
    }
}

// function getCourse($courseInput)
// {
//     global $conn;

//     $id = mysqli_real_escape_string($conn, $courseInput['id']);

//     $querySelectCourse = "SELECT * 
//                           FROM courses 
//                           INNER JOIN year_courses ON courses.id = year_courses.id_course
//                           WHERE courses.id = '$id'";
//     $query_run = mysqli_query($conn, $querySelectCourse);


//     if (mysqli_num_rows($query_run) != 0) {
//         $row = mysqli_fetch_assoc($query_run);
//         $idCourses = $row['id']; // luam id ul (denumirea vine din baza de date)

//         $querySelectCity = "SELECT * 
//                             FROM year_courses
//                             INNER JOIN city_courses ON year_courses.id_y = city_courses.id_year
//                             WHERE year_courses.id_course = '$idCourses'";
//         $query_run_1 = mysqli_query($conn, $querySelectCity);

//         if (mysqli_num_rows($query_run_1) != 0) {
//             $data = [
//                 'status' => 200,
//                 'message' => 'Cursul si orasul au fost gasite cu succes!',
//                 'id' => $idCourses
//             ];
//             header("HTTP/1.0 200");
//             return json_encode($data);

//     } else {
//         $data = [
//             'status' => 100,
//             'message' => 'Cursul nu a fost gasit!',
//             'id' => $idCourses
//         ];
//         header("HTTP/1.0");
//         return json_encode($data);
//     }
// }
// }

function getCourse($courseInput)
{
    global $conn;

    $id = mysqli_real_escape_string($conn, $courseInput['id']);

    //Selectam cursurile toate
    $querySelectCourse = "SELECT * 
                          FROM courses 
                          WHERE courses.id = '$id'";

    // Selectam anii
    $querySelectCourseYear = "SELECT * 
    FROM courses 
    INNER JOIN year_courses ON courses.id = year_courses.id_course
    WHERE courses.id = '$id'";

    $query_run = mysqli_query($conn, $querySelectCourse);
    $query_run2 = mysqli_query($conn, $querySelectCourseYear);



    if (mysqli_num_rows($query_run) != 0) {
        $res = mysqli_fetch_all($query_run, MYSQLI_ASSOC);
        $resYear = mysqli_fetch_all($query_run2, MYSQLI_ASSOC);

        $data = [
            'status' => 200,
            'message' => 'Cursul a fost gasit cu succes!',
            'data' => $res,
            'years' => $resYear, 
            'id' => $id
        ];
        header("HTTP/1.0 200");
        return json_encode($data);
    } else {
        $data = [
            'status' => 100,
            'message' => 'Cursul nu a fost gasit!',
            'id' => $id
        ];
        header("HTTP/1.0");
        return json_encode($data);
    }
}

function getYear($yearInput) {

    global $conn;

    $id = mysqli_real_escape_string($conn, $yearInput['id']);

    $querySelectCity = "SELECT * 
                            FROM year_courses
                            INNER JOIN city_courses ON year_courses.id_y = city_courses.id_year
                            WHERE year_courses.id_y = '$id'";
    $query_run = mysqli_query($conn, $querySelectCity);

    if (mysqli_num_rows($query_run) != 0) {
        $res = mysqli_fetch_all($query_run, MYSQLI_ASSOC);
        $data = [
            'status' => 200,
            'message' => 'Anul fost gasit cu succes!',
            'data' => $res,
            'id' => $id
        ];
        header("HTTP/1.0 200");
        return json_encode($data);
    }else{
        $data = [
            'status' => 100,
            'message' => 'Anul nu a fost gasit!',
            'id' => $id
        ];
        header("HTTP/1.0");
        return json_encode($data);
    }
}

function getCity($cityInput) {

    global $conn;

    $id = mysqli_real_escape_string($conn, $cityInput['id']);

    $querySelectCity = "SELECT * 
                            FROM city_courses
                            INNER JOIN date_courses ON city_courses.id_c = date_courses.id_city
                            WHERE city_courses.id_c = '$id'";
    $query_run = mysqli_query($conn, $querySelectCity);

    if (mysqli_num_rows($query_run) != 0) {
        $res = mysqli_fetch_all($query_run, MYSQLI_ASSOC);
        $data = [
            'status' => 200,
            'message' => 'Orasul fost gasit cu succes!',
            'data' => $res,
            'id' => $id
        ];
        header("HTTP/1.0 200");
        return json_encode($data);
    }else{
        $data = [
            'status' => 100,
            'message' => 'Orasul nu a fost gasit!',
            'id' => $id
        ];
        header("HTTP/1.0");
        return json_encode($data);
    }
}
