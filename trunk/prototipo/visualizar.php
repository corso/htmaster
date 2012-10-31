<?php
    $conteudo = $_POST['hidden1'];
?>
<html>
<head>
</head>
<body>
    <div id='toPrint'>
         <? echo $conteudo; ?>
    </div>
    <script type="text/javascript">
        var divToolWD = document.getElementById('toolwd');
        document.getElementById('toPrint').removeChild(divToolWD);

        function printContent(id){
            str=document.getElementById(id).innerHTML;
            newwin=window.open('','printwin','left=100,top=100,width=400,height=400');
            newwin.document.write('<HTML>\n<HEAD>\n');
            newwin.document.write('<TITLE>HTMaster - Print Version</TITLE>\n');
            newwin.document.write('<script>\n');
            newwin.document.write('function chkstate(){\n');
            newwin.document.write('if(document.readyState=="complete"){\n');
            newwin.document.write('window.close()\n');
            newwin.document.write('}\n');
            newwin.document.write('else{\n');
            newwin.document.write('setTimeout("chkstate()",2000)\n');
            newwin.document.write('}\n');
            newwin.document.write('}\n');
            newwin.document.write('function print_win(){\n');
            newwin.document.write('window.print();\n');
            newwin.document.write('chkstate();\n');
            newwin.document.write('}\n')
            newwin.document.write('<\/script>\n');
            newwin.document.write('</HEAD>\n');
            newwin.document.write('<BODY onload="print_win()">\n');
            newwin.document.write(str);
            newwin.document.write('</BODY>\n');
            newwin.document.write('</HTML>\n');
            newwin.document.close();
        }
    </script>
    <input id="simplePrint" type="button" value="Imprimir" onclick="printContent('toPrint')"/>
</body>
</html>