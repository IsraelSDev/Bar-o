<?php

    include_once('conection.php');

    $atendimentoCaixa = $_POST['question_1'];
    $recomendaService = $_POST['question_2'];
    $howMeet = $_POST['question_3[]'];
    $name = $_POST['firstname'];
    $lastName = $_POST['lastname'];
    $email = $_POST['email'];
    $phone = $_POST['telephone'];
    $age = $_POST['age'];
    $gender = $_POST['gender'];
    
    $data_form = "INSERT INTO userdata(atendimentoCaixa, recomendaService, howMeet, firstName, lastName, 	email, 	phone, age, gender, dataEnvio) VALUES ('$atendimentoCaixa', '$recomendaService', '$howMeet', '$name', '$lastName', '$email', '$phone', '$age', '$gender', NOW())";

    $result_data_form = mysqli_query($conn, $data_form);

?>