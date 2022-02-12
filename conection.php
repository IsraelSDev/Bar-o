<?php

$servidor = "127.0.0.1";
$usuario = "root";
$senha = "";
$dbname = "pesquisabarao";

//Criar conexão
$conn = mysql_connect($servidor, $usuario, $senha, $dbname);

if (!$conn) {echo 'Não foi possível conectar ao banco MySQL.
    '; exit;}
    else {echo 'Parabéns!! A conexão ao banco de dados ocorreu normalmente!.
    ';}
    mysql_close(); 

?>