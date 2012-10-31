<?php
require_once("dompdf/dompdf_config.inc.php");

$nome = $_POST['hidden2']; 


$dompdf = new DOMPDF();
$dompdf->set_paper('letter', 'landscape');
$dompdf->load_html($nome);
$dompdf->render();
$dompdf->stream("exemplo-01.pdf");
?> 