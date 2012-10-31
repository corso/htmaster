/* 
 * classe responsável por criar a paleta de elementos 
*/
draw2d.VectorPalette=function()
{
  draw2d.ToolPalette.call(this, "Elementos");

  this.tool1 = new draw2d.Tarefa(this, "PreCondicao");  
  this.tool2 = new draw2d.Tarefa(this, "Meta");
  this.tool3 = new draw2d.Tarefa(this, "Tarefa"); 
  this.tool4 = new draw2d.Tarefa(this, "TarefaOpcional");
  this.tool5 = new draw2d.Tarefa(this, "Operador");
  this.tool6 = new draw2d.Tarefa(this, "caixatexto");

  this.tool1.setPosition(10,30);
  this.tool2.setPosition(40,30);
  this.tool3.setPosition(10,60);
  this.tool4.setPosition(40,60);
  this.tool5.setPosition(10,90);
  this.tool6.setPosition(40,90);

  this.addChild(this.tool1);
  this.addChild(this.tool2);
  this.addChild(this.tool3);
  this.addChild(this.tool4);
  this.addChild(this.tool5);
  this.addChild(this.tool6);

  // undo support 
  this.undoTool = new draw2d.ToolUndo(this);
  this.undoTool.setPosition(10,180);
  this.undoTool.setEnabled(false);
  this.addChild(this.undoTool);
  
  // redo support
  this.redoTool = new draw2d.ToolRedo(this);
  this.redoTool.setPosition(40,180);
  this.redoTool.setEnabled(false);
  this.addChild(this.redoTool);
};

draw2d.VectorPalette.prototype = new draw2d.ToolPalette();
/** @private */
draw2d.VectorPalette.prototype.type="VectorPalette";


draw2d.VectorPalette.prototype.onSetDocumentDirty=function()
{
  this.undoTool.setEnabled(this.workflow.getCommandStack().canUndo());
  this.redoTool.setEnabled(this.workflow.getCommandStack().canRedo());
};
