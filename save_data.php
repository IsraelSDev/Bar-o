<?php

    $servidor = "localhost";
    $usuario = "root";
    $senha = "";
    $dbname = "avaliacao";

    //Criar conexão
    $conn = mysqli_connect($servidor, $usuario, $senha, $dbname);

    $atendimentoCaixa = $_POST['question_1'];
    $esperaFila = $_POST['question_2'];
    $recebiInfoSobre = implode(" | ",$_POST['question_3']);
    $itensNaoEncontrados = $_POST['question_4'];
    $itensNaoEncontradosMenssagem = $_POST['additional_message_1'];

      
    $data_form = "INSERT INTO userdata(atendimentoCaixa, esperaFila, recebiInfoSobre, itensNaoEncontrados, itensNaoEncontradosMenssagem, dataEnvio) VALUES ('$atendimentoCaixa',  '$esperaFila', '$recebiInfoSobre', '$itensNaoEncontrados',  '$itensNaoEncontradosMenssagem', NOW())";

   mysqli_query($conn, $data_form);
   
   echo  "<script>alert('Email enviado com Sucesso!'); setTimeout(function () {location.href=\"index.html\"}, 2000);</script>";

?>