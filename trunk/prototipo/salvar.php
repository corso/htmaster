<?php

//Recebe os dados da pagina
$dados = $_POST['hidden3'];

$arquivoNome = 'dados.txt';

//Cria o novo arquivo no servidor
$arquivo = fopen('C:\Temp\\'.$arquivoNome, 'w');

//encripta os dados.
$codificada = base64_encode($dados);

fwrite($arquivo, $codificada);

fclose($arquivo);

set_time_limit(0);

//Prepara para download
$arquivoHtma = 'C:\Temp\\'.$arquivoNome; // Pega o arquivo criado

$novoNome = 'htmaster.htma';

header('Content-Description: File Transfer');

header('Content-Disposition: attachment; filename="'.$novoNome.'"');

header('Content-Type: application/octet-stream');

header('Content-Transfer-Encoding: binary');

header('Content-Length: ' . filesize($arquivoHtma));

header('Cache-Control: must-revalidate, post-check=0, pre-check=0');

header('Pragma: public');

header('Expires: 0');


readfile($arquivoHtma);

//Deleta arquivo do servidor
!unlink($arquivoHtma);

?>