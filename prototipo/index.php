<?
print "<b>Arquivos existentes neste diret�rio:</b>";
$dir=@opendir(".");
if ($dir):
$esconde = array(".", "..", ".htaccess", "index.php", ".htuh");
while ($lista = readdir($dir)) {
if (!in_array($lista, $esconde))
print "<br> <a href=./$lista target=_blank>$lista</a>";
}
endif;
closedir($dir);
?>