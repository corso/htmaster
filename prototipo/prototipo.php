<!DOCTYPE html>
<html lang="pt-br">
<head>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
        <meta http-equiv="Content-Language" content="pt_BR" />
        
	<title>HTMaster - Prot&oacute;tipo</title>
	
	<link type="text/css" rel="stylesheet" href="prototipo.css" />

    <!-- common, all times required, imports -->        
    <!--REGEXP_START_REMOVE-->
	<SCRIPT src="../draw2d/normal/String.js"></SCRIPT>
	<SCRIPT src="../draw2d/normal/wz_jsgraphics.js"></SCRIPT>
	<SCRIPT src="../draw2d/normal/events.js"></SCRIPT>
	<SCRIPT src="../draw2d/normal/debug.js"></SCRIPT>
	<SCRIPT src="../draw2d/normal/dragdrop.js"></SCRIPT>
	<SCRIPT src="../draw2d/normal/UUID.js"></SCRIPT>
	<SCRIPT src="../draw2d/normal/PositionConstants.js"></SCRIPT>
	<SCRIPT src="../draw2d/normal/Graphics.js"></SCRIPT>
	<SCRIPT src="../draw2d/normal/Color.js"></SCRIPT>
	<SCRIPT src="../draw2d/normal/ArrayList.js"></SCRIPT>
	<SCRIPT src="../draw2d/normal/Point.js"></SCRIPT>
	<SCRIPT src="../draw2d/normal/Dimension.js"></SCRIPT>
	<SCRIPT src="../draw2d/normal/Border.js"></SCRIPT>
	<SCRIPT src="../draw2d/normal/LineBorder.js"></SCRIPT>
	<SCRIPT src="../draw2d/normal/Figure.js"></SCRIPT>
	<SCRIPT src="../draw2d/normal/Node.js"></SCRIPT>
        <SCRIPT src="../draw2d/normal/VectorFigure.js"></SCRIPT>
        <SCRIPT src="../draw2d/normal/SVGFigure.js"></SCRIPT>
	<SCRIPT src="../draw2d/normal/Label.js"></SCRIPT>
	<SCRIPT src="../draw2d/normal/Oval.js"></SCRIPT>
	<SCRIPT src="../draw2d/normal/Circle.js"></SCRIPT>
	<SCRIPT src="../draw2d/normal/Rectangle.js"></SCRIPT>
	<SCRIPT src="../draw2d/normal/ImageFigure.js"></SCRIPT>
	<SCRIPT src="../draw2d/normal/Port.js"></SCRIPT>
	<SCRIPT src="../draw2d/normal/InputPort.js"></SCRIPT>
	<SCRIPT src="../draw2d/normal/OutputPort.js"></SCRIPT>
	<SCRIPT src="../draw2d/normal/Line.js"></SCRIPT>
	<SCRIPT src="../draw2d/normal/ConnectionRouter.js"></SCRIPT>
	<SCRIPT src="../draw2d/normal/NullConnectionRouter.js"></SCRIPT>
	<SCRIPT src="../draw2d/normal/ManhattanConnectionRouter.js"></SCRIPT>
	<SCRIPT src="../draw2d/normal/BezierConnectionRouter.js"></SCRIPT>
	<SCRIPT src="../draw2d/normal/FanConnectionRouter.js"></SCRIPT>
	<SCRIPT src="../draw2d/normal/Connection.js"></SCRIPT>
	<SCRIPT src="../draw2d/normal/ConnectionAnchor.js"></SCRIPT>
	<SCRIPT src="../draw2d/normal/ChopboxConnectionAnchor.js"></SCRIPT>
	<SCRIPT src="../draw2d/normal/ConnectionDecorator.js"></SCRIPT>
	<SCRIPT src="../draw2d/normal/ArrowConnectionDecorator.js"></SCRIPT>
	<SCRIPT src="../draw2d/normal/CompartmentFigure.js"></SCRIPT>
	<SCRIPT src="../draw2d/normal/CanvasDocument.js"></SCRIPT>
	<SCRIPT src="../draw2d/normal/Annotation.js"></SCRIPT>
	<SCRIPT src="../draw2d/normal/ResizeHandle.js"></SCRIPT>
	<SCRIPT src="../draw2d/normal/LineStartResizeHandle.js"></SCRIPT>
	<SCRIPT src="../draw2d/normal/LineEndResizeHandle.js"></SCRIPT>
	<SCRIPT src="../draw2d/normal/Canvas.js"></SCRIPT>
	<SCRIPT src="../draw2d/normal/Workflow.js"></SCRIPT>
	<SCRIPT src="../draw2d/normal/WindowFigure.js"></SCRIPT>
	<SCRIPT src="../draw2d/normal/Button.js"></SCRIPT>
	<SCRIPT src="../draw2d/normal/ToggleButton.js"></SCRIPT>
	<SCRIPT src="../draw2d/normal/SnapToHelper.js"></SCRIPT>
	<SCRIPT src="../draw2d/normal/SnapToGeometry.js"></SCRIPT>
	<SCRIPT src="../draw2d/normal/SnapToGeometryEntry.js"></SCRIPT>
	<SCRIPT src="../draw2d/normal/SnapToGrid.js"></SCRIPT>
	<SCRIPT src="../draw2d/normal/ToggleButton.js"></SCRIPT>
	<SCRIPT src="../draw2d/normal/ToolGeneric.js"></SCRIPT>
	<SCRIPT src="../draw2d/normal/ToolPalette.js"></SCRIPT>
	<SCRIPT src="../draw2d/normal/Dialog.js"></SCRIPT>
	<SCRIPT src="../draw2d/normal/InputDialog.js"></SCRIPT>
	<SCRIPT src="../draw2d/normal/PropertyDialog.js"></SCRIPT>
	<SCRIPT src="../draw2d/normal/AnnotationDialog.js"></SCRIPT>
	<SCRIPT src="../draw2d/normal/PropertyWindow.js"></SCRIPT>
	<SCRIPT src="../draw2d/normal/ColorDialog.js"></SCRIPT>
	<SCRIPT src="../draw2d/normal/LineColorDialog.js"></SCRIPT>
	<SCRIPT src="../draw2d/normal/BackgroundColorDialog.js"></SCRIPT>
	<SCRIPT src="../draw2d/normal/EditPartFactory.js"></SCRIPT>
	<SCRIPT src="../draw2d/normal/AbstractObjectModel.js"></SCRIPT>
	<SCRIPT src="../draw2d/normal/PropertyChangeEvent.js"></SCRIPT>
	<SCRIPT src="../draw2d/normal/GraphicalViewer.js"></SCRIPT>
	<SCRIPT src="../draw2d/normal/GraphicalEditor.js"></SCRIPT>
	<SCRIPT src="../draw2d/normal/xmlsax.js"></SCRIPT>
	<SCRIPT src="../draw2d/normal/xmlw3cdom.js"></SCRIPT>
	<SCRIPT src="../draw2d/normal/XMLSerializer.js"></SCRIPT>
	<SCRIPT src="../draw2d/normal/XMLDeserializer.js"></SCRIPT>
	<SCRIPT src="../draw2d/normal/EditPolicy.js"></SCRIPT>

    <!-- undo/redo support (all times required too) -->
	<SCRIPT src="../draw2d/normal/Command.js"></SCRIPT>
	<SCRIPT src="../draw2d/normal/CommandStack.js"></SCRIPT>
	<SCRIPT src="../draw2d/normal/CommandStackEvent.js"></SCRIPT>
	<SCRIPT src="../draw2d/normal/CommandStackEventListener.js"></SCRIPT>
	<SCRIPT src="../draw2d/normal/CommandAdd.js"></SCRIPT>
	<SCRIPT src="../draw2d/normal/CommandDelete.js"></SCRIPT>
	<SCRIPT src="../draw2d/normal/CommandMove.js"></SCRIPT>
	<SCRIPT src="../draw2d/normal/CommandMoveLine.js"></SCRIPT>
	<SCRIPT src="../draw2d/normal/CommandMovePort.js"></SCRIPT>
	<SCRIPT src="../draw2d/normal/CommandResize.js"></SCRIPT>
	<SCRIPT src="../draw2d/normal/CommandSetText.js"></SCRIPT>
	<SCRIPT src="../draw2d/normal/CommandSetColor.js"></SCRIPT>
	<SCRIPT src="../draw2d/normal/CommandSetBackgroundColor.js"></SCRIPT>
	<SCRIPT src="../draw2d/normal/CommandConnect.js"></SCRIPT>
	<SCRIPT src="../draw2d/normal/CommandReconnect.js"></SCRIPT>
	<SCRIPT src="../draw2d/normal/CommandChangeType.js"></SCRIPT>
        <SCRIPT src="../draw2d/normal/CommandAddCardinal.js"></SCRIPT>
        <SCRIPT src="../draw2d/normal/CommandAddExecucao.js"></SCRIPT>
	<SCRIPT src="../draw2d/normal/Menu.js"></SCRIPT>
	<SCRIPT src="../draw2d/normal/MenuItem.js"></SCRIPT>
	<SCRIPT src="../draw2d/normal/mootools.js"></SCRIPT>
	<SCRIPT src="../draw2d/normal/moocanvas.js"></SCRIPT>
    <!--REGEXP_END_REMOVE-->

    <!-- example specific imports -->
        <SCRIPT src="javascript/Tarefa.js"></SCRIPT>
	<SCRIPT src="javascript/ToolRectangle.js"></SCRIPT>
	<SCRIPT src="javascript/ToolOval.js"></SCRIPT>
	<SCRIPT src="javascript/ToolCircle.js"></SCRIPT>
	<SCRIPT src="javascript/ToolCircleUnfilled.js"></SCRIPT>
	<SCRIPT src="javascript/ToolRectangleUnfilled.js"></SCRIPT>
	<SCRIPT src="javascript/ToolOvalUnfilled.js"></SCRIPT>
	<SCRIPT src="javascript/ToolLine.js"></SCRIPT>
	<SCRIPT src="javascript/ToolUndo.js"></SCRIPT>
	<SCRIPT src="javascript/ToolRedo.js"></SCRIPT>
	<SCRIPT src="javascript/VectorPalette.js"></SCRIPT>
	<SCRIPT src="javascript/VectorPropertyWindow.js"></SCRIPT>
		
	<link rel="stylesheet" href="../jquery/development-bundle/themes/base/jquery.ui.all.css">
	<script src="../jquery/development-bundle/jquery-1.6.2.js"></script>
	<script src="../jquery/development-bundle/ui/jquery.ui.core.js"></script>
	<script src="../jquery/development-bundle/ui/jquery.ui.widget.js"></script>
	<script src="../jquery/development-bundle/ui/jquery.ui.mouse.js"></script>
	<script src="../jquery/development-bundle/ui/jquery.ui.draggable.js"></script>
	<script src="../jquery/development-bundle/ui/jquery.ui.resizable.js"></script>
	<script src="../jquery/development-bundle/ui/jquery.ui.accordion.js"></script>
	<link rel="stylesheet" href="../jquery/development-bundle/demos/demos.css">
        <script src="../jquery/development-bundle/ui/jquery.ui.dialog.js"></script>
        
   	<!-- autoresize -->
        <script src="../jquery/js/jquery.autoresize.js"></script>
</head>
<body>
	<div style=" margin: 0 auto; width: 994px;">
		<div class="cabecalho">
			<div class="actions">
				<div class="section1">
					<span style="padding: 5px 2px 0 0;">
						<a href="javascript:void(0)" title="Novo" onClick="recarregar()"><img src="images/new.png" alt="Novo"/></a>
					</span>
					<span style="padding: 5px 2px 0 0;">	
						<a href="javascript:void(0)" title="Abrir" onclick="abrir()"><img src="images/open.png" alt="Abrir"/></a>
					</span>		
					<span style="padding: 5px 2px 0 0;">
						<a href="javascript:void(0)" title="Salvar" onclick="salvar()"><img src="images/save.png" alt="Salvar"/></a>
					</span>		
					<span style="padding: 5px 2px 0 0;"> 
						<a id="simplePrint" href="javascript:void(0)" title="Imprimir" onclick="btVisualizar()"><img src="images/print.png" alt="Imprimir"/></a>
					</span>
				</div>
				
				<div class="section2">					
					<span style="padding: 5px 2px 0 0;">
                                            <a href="javascript:void(0)" title="Validar"><img src="images/validate.png" alt="Validar" onClick="workflow.valida()"/></a>
					</span>
                                </div>
                            
                                <div class="section6">	   
					<span style="padding: 5px 2px 0 0;">	
						<a href="javascript:void(0)" title="Limpar" onClick="limpar()"><img src="images/clear.png" alt="Limpar"/></a>
					</span>	
				</div>
				
				<div class="section3">
					<span style="padding: 5px 2px 0 0;"> 
						<a href="javascript:void(0)" onClick="riseDeskVert()" title="Aumentar Desktop Verticalmente"><img src="images/wf_rise_bottom.png" alt="Aumentar Desktop Verticalmente"/></a>
					</span>
					<span style="padding: 5px 2px 0 0;">
						<a href="javascript:void(0)" onClick="fallDeskVert()" title="Diminuir Desktop Verticalmente"><img src="images/wf_fall_top.png" alt="Diminuir Desktop Verticalmente"/></a>
					</span>
					<span style="padding: 5px 2px 0 0;"> 
						<a href="javascript:void(0)" onClick="riseDeskHoriz()" title="Aumentar Desktop Horizontalmente"><img src="images/wf_rise_right.png" alt="Aumentar Desktop Horizontalmente"/></a>
					</span>
					<span style="padding: 5px 2px 0 0;">
						<a href="javascript:void(0)" onClick="fallDeskHoriz()" title="Diminuir Desktop Horizontalmente"><img src="images/wf_fall_left.png" alt="Diminuir Desktop Horizontalmente"/></a>
					</span>
				</div>
				
				<div class="section4">
					<span style="padding: 5px 2px 0 0;">
						<a href="javascript:void(0)" onClick="openWindow('ajuda.html')" title="Ajuda"><img src="images/help.png" alt="Ajuda"/></a>
					</span>
                                     <span style="padding: 5px 2px 0 0;">
						<a href="javascript:void(0)" onClick="openWindow('sobre.html',true)" title="Sobre"><img src="images/about.png" alt="Sobre"/></a>
					</span>
				</div>	
                            
                                <div class="section5">
                                        HTMaster
                                </div>
                    </div>
		</div>
		
		<div class="menuleft">
                        <form NAME="formm" METHOD="post" ACTION="visualizar.php" target="popup">
                            <input type="hidden" method="post" value="" id="hidden1" name="hidden1">
                        </form>

                        <form NAME="form1" METHOD="post" ACTION="imprimir.php">
                            <input type="hidden" method="post" value="" id="hidden2" name="hidden2">
                        </form>

			<form NAME="formSalvar" METHOD="post" ACTION="salvar.php">
				<input type="hidden" method="post" value="" id="hidden3" name="hidden3">
			</form>
			<form NAME="formAbrir" METHOD="post" ACTION="abrir.html">  </form>
			
			<div class="titulo">
				Valida&ccedil;&atilde;o
				<div style="float: right; padding-top: 4px;">
					<a href="#" title="Limpar Avisos" onClick="limparAvisos()"><img src="images/clear.png" alt="Limpar Avisos" width="16" height="16"/></a>
				</div>
			</div>
			<div id="workflowValidaResult" class="valida">
                            
			</div>
		</div>
	           
        <script>
            $(function() {
                    $( ".WindowFigure" ).draggable( {containment: ".Workflow"});

                    $( "textarea" ).resizable({ disabled: true, handles: 'htma' });

                    $( "#desktop" ).resizable({minWidth: 820, minHeight: 570});
            });
        </script>
	           
        <div class="desktop">
            <div tabindex="0" class="Workflow" id="desktop" style="overflow: hidden; width: 820px; height: 570px; cursor: default; background-image: url(&quot;grid_10.png&quot;);">                                                             
                
            </div>

            <script>
                var workflow  = new draw2d.Workflow("desktop");

                // Add the Tool Window to the screen
                var toolWindow = new draw2d.VectorPalette();
                toolWindow.setId('toolwd');
                workflow.setToolWindow(toolWindow);
                toolWindow.setPosition(4,4);
                toolWindow.setDimension(75, 250);
                workflow.getLines()
				
                window.onscroll = function(){workflow.onScroll();};                   
            </script>           
         </div>

         <script>
                  //função que carrega uma nova página em branco
                 function recarregar() {
                      if (confirm("Você tem certeza que deseja iniciar um novo diagrama?")) {location.href="prototipo.php";}
                  }

                  function imprimir() {
                      $('#desktop').printElement();
                      return false;
                  }

                //abre a pagina de impressao php
                  function visualizar(){
                      window.open('visualizar.php', new Date().getTime(),'width=460,height=355,top=0,left=0');
                  }

               //pega conteudo de uma div e salva em um campo invisivel
                  function salvar(){
                      if (confirm("Você tem certeza que deseja salvar o diagrama?")){
                          document.getElementById('hidden3').value = (workflow.getListaFigure());
                          document.formSalvar.submit();
                       }
                  }
                  
                  
                  function limpar() {
                      if (confirm("Você tem certeza que deseja limpar completamente o diagrama?")){
                          workflow.clear();
                      }
                  }
                  
                  function monta(){
                      var aux = document.getElementById('hidden3').value;

                      document.getElementById('hidden3').value = '';
                      var objetos = aux.split('|');
                      for(x = 0; x < objetos.length -1; x++){
                        criaObjeto(objetos[x]);
                        alteraTexto(objetos[x]);
                      }
					  
                      for(x = 0; x < objetos.length -1; x++){
                            ligaPai(objetos[x]);
                      }

                      workflow.ativaFigures();
                      
                      for(x = 0; x < objetos.length -1; x++){                        
                        criaCardinalidade(objetos[x]);
                        criaExe(objetos[x]);
                      }					  
                  }
              
                  
                  function alteraTexto(obj){
                      var aux = obj.split('/');
                      if(aux[6] != null && aux[6] != 'null'){
                          workflow.setTextoo(aux[0], aux[6]);
                       }
                  }
                  
                  function ligaPai(obj){
                      var aux = obj.split('/');
                      if(aux[9]!= null && aux[9]!= '' && aux[0] != null && aux[0] != ''){
                          workflow.liga(aux[9], aux[0], workflow);
                       }
                  }
                   
                  function criaObjeto(obj){
                      var aux = obj.split('/');
                      if(aux[1]!= null){
                        var tarefa = new draw2d.Tarefa(toolWindow,aux[1]);
                        tarefa.execute(aux[4],aux[5]);
                        workflow.setDimensoes(aux[0], aux[3], aux[2]);}
                  }
                  
                  function criaCardinalidade(obj){
                      var aux = obj.split('/');
                          if(aux[7] != 'undefined' && aux[7] != null){
                              workflow.setCardinalidadeFromPai(aux[0],aux[7]);
                      }
                  }
                  
                  function criaExe(obj){
                      var aux = obj.split('/');
                          if(aux[8] != 'undefined' && aux[8] != null){
                              workflow.setExeFromPai(aux[0],aux[8]);
                      }
                  }

                  function abrir(){                             
                          $( "#dialog2" ).dialog({
                                zIndex: 50001,
                                modal: true,
                                draggable: false,
                                resizable: false
                          });
                          limparAvisos();
                  }

                  function openWindow(link, opc) {
                      if (opc)
                        window.open(link, new Date().getTime(),'width=500,height=300,top=150,left=400');
                      else
                        window.open(link, new Date().getTime(),'width=700,height=500,top=150,left=400,resizable=yes,scrollbars=yes,status=yes');
                  }
                  
                  function btVisualizar() {
                          document.getElementById('hidden1').value =  document.getElementById('desktop').innerHTML;
                          var frase = document.getElementById('desktop').innerHTML;
                          document.formm.submit();
                  }
                  function pdf(){
                          document.getElementById('hidden2').value =  document.getElementById('desktop').innerHTML;
                          document.form1.submit();
                  }
                  function riseDeskVert() {
                          $('#desktop').height($('#desktop').height() + 100);
                  }
                  function fallDeskVert() {
                          if ($('#desktop').height() > 570)
                                $('#desktop').height($('#desktop').height() - 100);
                  }
                  function riseDeskHoriz() {
                          $('#desktop').width($('#desktop').width() + 100);
                  }
                  function fallDeskHoriz() {
                          if ($('#desktop').width() > 820)
                                $('#desktop').width($('#desktop').width() - 100);
                  }
				  
                  function limpar() {
                      if (confirm("Você tem certeza que deseja limpar completa e definitivamente o diagrama?")){
                          workflow.clear();
                          limparAvisos();
                      }
                  }
				  
                  function limparAvisos() {
                        document.getElementById('workflowValidaResult').innerHTML = '';
                  }
          </script>	

          <div id="dialog" title="Digite o texto" style="display: none; background-color: #ddd;">
              <textarea id="dialog_text" style="width: 270px; height: 55px;"></textarea>
          </div>
          <div id="dialog2" title="Abrir arquivo:" style="display: none; background-color: #ddd;">
              <form action="prototipo.php" method="post" enctype="multipart/form-data">
                    <br/>
                    <input type="file" name="arquivo" class="width233" /> <br/><br/>
                    <input type="submit" name="enviar" value="Enviar" />
              </form>
          </div>
	</div>
<?php
    abrir();
    function abrir() {
        if (array_key_exists('arquivo', $_FILES)) {
                $arquivo = $_FILES['arquivo'];

                if ($arquivo["type"] == "application/octet-stream") {
                  echo "";
                } else {
                  echo "<script language='Javascript'>alert('Arquivo inválido. Somente são permitidos arquivos .htma');</script>";
                  return false;
                }

                $novonome = $arquivo['name'];

                $arquivoAbre = fopen($arquivo['tmp_name'], "r");

                $conteudo = fread($arquivoAbre,10000000);

                //desencripta os dados
                $original = base64_decode($conteudo);
                
                fclose($arquivoAbre);

                echo "<script language='Javascript'>";
                echo "document.getElementById('hidden3').value = '".$original."';";
                echo "monta();";
                echo "</script>";
        }
    }
?>
</body>
</html>