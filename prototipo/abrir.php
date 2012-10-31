<?php
$arquivo = $_FILES["arquivo"];

if ($arquivo["type"] == "application/octet-stream")
{
  echo "";
} else{
  echo "Arquivo invalido. Somente permitido arquivos .htma";
}

$novonome = md5(mt_rand(1,10000).$arquivo['name']).'.htma';

$dir = "C:\\Windows\\Temp\\";
  if (!file_exists($dir))
  {
    mkdir($dir, 0755);
  }
  $caminho = $dir.$novonome;
  move_uploaded_file($arquivo['tmp_name'],$caminho);


$arquivoSalvo = fopen("C:\\Windows\\Temp\\".$novonome, "r");

$conteudo = fread($arquivoSalvo,10000000);

//session_start();
//$_SESSION['DadosArq'] = $conteudo;
// setcookie("dadosArq", $conteudo);
$_REQUEST['dadosArq'] = $conteudo;

//desencripta os dados
$original = base64_decode($conteudo);

//echo $original;

fclose($arquivoSalvo);

echo "<script language='Javascript'>
        function carregar(){
          window.opener = window
          window.close()
     }
     </script>" ;

echo "<script language='Javascript'> carregar() </script>" ;

?>


