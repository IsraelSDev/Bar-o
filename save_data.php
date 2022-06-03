<?php

    $servidor = "localhost";
    $usuario = "root";
    $senha = "";
    $dbname = "pesquisabarao";

    //Criar conexão
    $conn = mysqli_connect($servidor, $usuario, $senha, $dbname);

    $atendimentoCaixa = $_POST['question_1'];
    $esperaFila = $_POST['question_2'];
    $recomendaService = $_POST['question_2'];
    $howMeet = implode("|",$_POST['question_3']);
      
    $data_form = "INSERT INTO userdata(atendimentoCaixa, recomendaServico, sujestaoRecomendaServico, comoConheceu,  dataEnvio) VALUES ('$atendimentoCaixa',  '$recomendaService', '$esperaFila', '$howMeet',  NOW())";

   mysqli_query($conn, $data_form);
   
   echo  "<script>alert('Email enviado com Sucesso!'); location.href=\"index.html\";</script>";

?>