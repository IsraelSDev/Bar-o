<?php

    $servidor = "localhost";
    $usuario = "root";
    $senha = "";
    $dbname = "pesquisabarao";

    //Criar conexão
    $conn = mysqli_connect($servidor, $usuario, $senha, $dbname);

    $atendimentoCaixa = $_POST['question_1'];
    $sujestaoCaixa = $_POST['additional_message'];
    $recomendaService = $_POST['question_2'];
    $sujestaoRecomendaService = $_POST['additional_message_2'];
    $howMeet = implode("|",$_POST['question_3']);
    $name = $_POST['firstname'];
    $lastName = $_POST['lastname'];
    $email = $_POST['email'];
    $phone = $_POST['telephone'];
    $age = $_POST['age'];
    $gender = $_POST['gender'];
    
    $data_form = "INSERT INTO userdata(atendimentoCaixa, sujestaoCaixa, recomendaServico, sujestaoRecomendaServico, comoConheceu, nome, sobreNome, email, fone, idade, genero, dataEnvio) VALUES ('$atendimentoCaixa', '$sujestaoCaixa', '$recomendaService', '$sujestaoRecomendaService', '$howMeet', '$name', '$lastName', '$email', '$phone', '$age', '$gender', NOW())";

   mysqli_query($conn, $data_form);
   
   echo  "<script>alert('Email enviado com Sucesso!'); location.href=\"index.html\";</script>";
    
?>