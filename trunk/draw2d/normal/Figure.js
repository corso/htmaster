/* This notice must be untouched at all times.

FreeGroup Draw2D 0.9.26
The latest version is available at
http://www.freegroup.de

Copyright (c) 2006 Andreas Herz. All rights reserved.
Created 5. 11. 2006 by Andreas Herz (Web: http://www.freegroup.de )

LICENSE: LGPL

This library is free software; you can redistribute it and/or
modify it under the terms of the GNU Lesser General Public
License (LGPL) as published by the Free Software Foundation; either
version 2.1 of the License, or (at your option) any later version.

This library is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU
Lesser General Public License for more details.

You should have received a copy of the GNU Lesser General Public
License along with this library; if not, write to the Free Software
Foundation, Inc., 59 Temple Place, Suite 330, Boston, MA  02111-1307  USA,
or see http://www.gnu.org/copyleft/lesser.html
*/

/**
 * 
 * @version 0.9.26
 * @author Andreas Herz
 * @constructor
 */
draw2d.Figure=function()
{
  this.construct();
};

/** 
 * All objects have a member called "type", which uniquely identifies 
 * a property type. This is a provision for a possible serialization.
 *
 **/
draw2d.Figure.prototype.type="draw2d.Figure";

/** @private **/
draw2d.Figure.ZOrderBaseIndex = 100;

/**
 * Set the common z-index of the window element. This method exists for
 * compatibility reason to dojo or another UI javascript library. 
 * It is now possible to arange the draw2d elements behind/before other UI elements-
 *
 * @see #setZOrder
 * @static
 * @param {int} index The z-order for all new figure objects.
 **/
draw2d.Figure.setZOrderBaseIndex=function(/*:int*/ index)
{
  draw2d.Figure.ZOrderBaseIndex = index;
};

/**
 * @private
 **/
draw2d.Figure.prototype.construct=function()
{
  this.lastDragStartTime =0;
  /** @private **/
  this.x = 0;
  /** @private **/
  this.y = 0;
  /** @private **/
  this.width = 200;
  /** @private **/
  this.height= 70;
  /** @private **/
  this.border=null;  /*:draw2d.Border*/
  /** @private **/
  this.id   = draw2d.UUID.create();  /*:String*/
  /** @private **/
  this.html = this.createHTMLElement(); /*:HTMLElement*/
  /** @private **/
  this.canvas = null;    /*:draw2d.Canvas*/ 
  /** @private **/
  this.workflow = null;  /*:draw2d.Workflow*/
  /** @private **/
  this.draggable = null; /*:HTMLElement*/
  /** @private **/
  this.parent    = null; /*:draw2d.CompartmentFigure*/
  /** @private **/
  this.isMoving  = false; /*:boolean*/
  /** @private **/
  this.canSnapToHelper = true; /*:boolean*/
  /** @private **/
  this.snapToGridAnchor = new draw2d.Point(0,0);
  /** @private **/
  this.timer = -1; // Fadein/Fadeout timer id.
  /** @private **/
  this.model = null; /*:draw2d.AbstractObjectModel*/
  /** @private **/
  this.alpha = 1.0;
  /** @private **/
  this.alphaBeforeOnDrag = 1.0;
  
  /** @private*/
  this.ports = new draw2d.ArrayList();

  // a figure can store additional, user defined properties
  //
  /** @private **/
  this.properties = {} /*:Map<name,value>*/

  // Hier werden Object registriert welche informiert werden wollen wenn sich dieses
  // Object bewegt hat.
  //
  /** @private **/
  this.moveListener = new draw2d.ArrayList();
    
  // It is important to set the flags below. Otherwise the flags will be <null>
  //
  this.setDimension(this.width,this.height);
  this.setDeleteable(true);
  this.setCanDrag(true);
  this.setResizeable(true);
  this.setSelectable(true);
};

/**
 * Override this method to free your resource too.
 *
 * @private
 **/
draw2d.Figure.prototype.dispose=function(/*:string*/ subtype)
{
  //this.id   = null; don't dispose the id! This is important for deregistration
  //this.html = null; don't dispose the html! This is important for deregistration
  this.canvas = null;
  this.workflow = null;
  this.moveListener = null;
  if(this.draggable!==null)
  {
    this.draggable.removeEventListener("mouseenter", this.tmpMouseEnter);
    this.draggable.removeEventListener("mouseleave", this.tmpMouseLeave);
    this.draggable.removeEventListener("dragend", this.tmpDragend);
    this.draggable.removeEventListener("dragstart",this.tmpDragstart );
    this.draggable.removeEventListener("drag",this.tmpDrag);
    this.draggable.removeEventListener("dblclick",this.tmpDoubleClick );
    this.draggable.node = null;
    this.draggable.target.removeAllElements();
  }
  this.draggable = null;
  if(this.border!==null)
    this.border.dispose();
  this.border = null;

  for(var i=0;i<this.ports.getSize();i++)
  {
     this.ports.get(i).dispose();
  }
  this.ports = null;
  
  // remove this figure from the parent CompartmentFigure
  //
  if(this.parent!==null)
    this.parent.removeChild(this);
};


/**
 * A figure can store user defined attributes. This method returns all properties stored in this figure.<br>
 *
 * @see #setProperty
 * @returns All user defined properties of the figure
 * @type Map
 **/
draw2d.Figure.prototype.getProperties=function()
{
  return this.properties;
};

draw2d.Figure.prototype.teste=function()
{
  alert('teste');
};


/**
 * A figure can store user defined attributes. This method returns the requested property.<br>
 *
 * @see #setProperty
 * @returns The user defined property of this figure.
 * @type String
 **/
draw2d.Figure.prototype.getProperty=function(/*:String*/ key)
{
  return this.properties[key];
};


/**
 * A figure can store any type of information. You can use this to attach any String or Object to this
 * figure.
 *
 * @see #getProperty
 * @param {String} key The key of the property.
 * @param {String} value The value of the property.
 **/
draw2d.Figure.prototype.setProperty=function(/*:String*/ key,/*:String*/ value)
{
  this.properties[key]=value;
  this.setDocumentDirty();
};


/**
 * Return the document unique id of this element. It is not an uuid or guid
 * @type String
 **/
draw2d.Figure.prototype.getId=function()
{
  return this.id;
};

/**
 * Set the unique id of this element.
 *
 * @param {String} id The new unique id of this element
 * @since 0.9.15
 **/
draw2d.Figure.prototype.setId=function(/*:String*/ id)
{
  this.id=id;
  if(this.html!==null)
     this.html.id = id;
};


/**
 * @private
 * @param {draw2d.Canvas} canvas
 **/
draw2d.Figure.prototype.setCanvas= function(/*:draw2d.Canvas*/ canvas)
{
  this.canvas = canvas;
};

/**
 * Returns the associated worklow canvas.
 *
 * @type draw2d.Workflow
 **/
draw2d.Figure.prototype.getWorkflow=function()
{
   return this.workflow;
};


/**
 * @type string
 **/
draw2d.Figure.prototype.getInnerHTML=function()
{
  return this.innerHTML;
};

/**
 * @param string
 **/
draw2d.Figure.prototype.setInnerHTML=function(/*:string*/ text)
{
  this.innerHTML = text;
};


/**
 * @type string
 **/
draw2d.Figure.prototype.getSubType=function()
{
  return this.subType;
};

/**
 * @param string
 **/
draw2d.Figure.prototype.setSubType=function(/*:string*/ subtype)
{
  this.subType = subtype;
};

/**
 * @type string
 **/
draw2d.Figure.prototype.getCard=function()
{
  return this.card;
};

/**
 * @param string
 **/
draw2d.Figure.prototype.setCard=function(/*:string*/ card)
{
  this.card = card;
};

/**
 * @type string
 **/
draw2d.Figure.prototype.getExec=function()
{
  return this.exec;
};

/**
 * @param string
 **/
draw2d.Figure.prototype.setExec=function(/*:string*/ exec)
{
  this.exec = exec;
};


/**
 * @private
 * @param {draw2d.Workflow} workflow
 **/
draw2d.Figure.prototype.setWorkflow= function(/*:draw2d.Workflow*/ workflow)
{
  // The parent is a Workflow class - now we create the Drag-Objekt
  //
  if(this.draggable===null)
  {
    // Firefox seems to need to have the tabindex="0" property set to some value 
    // so it knows this Div or Span is keyboard selectable. That allows the keyboard 
    // event to be triggered. It is not so dumb - you might want to trap Delete or 
    // Insert keys on a figure etc. 
    this.html.tabIndex="0";

    var oThis = this;

    this.keyDown=function(event)
    {
      event.cancelBubble = true; // Stop event propagation
      event.returnValue = true;  // Execute the standard event for this event. Important for Input Fields/Dialogs
      oThis.onKeyDown(event.keyCode, event.ctrlKey);
    }
    if (this.html.addEventListener) 
      this.html.addEventListener("keydown", this.keyDown, false);
    else if (this.html.attachEvent) 
      this.html.attachEvent("onkeydown", this.keyDown);

    this.draggable = new draw2d.Draggable(this.html, draw2d.Draggable.DRAG_X | draw2d.Draggable.DRAG_Y);
    this.draggable.node = this;
    this.tmpContextMenu = function (oEvent)
    {
       oThis.onContextMenu(oThis.x+oEvent.x, oEvent.y+oThis.y);
    };

    this.tmpMouseEnter  = function (oEvent)
    {
       oThis.onMouseEnter();
    };

    this.tmpMouseLeave  = function (oEvent){oThis.onMouseLeave();};
    this.tmpDragend     = function (oEvent){oThis.onDragend();};
    this.tmpDragstart   = function (oEvent){
       var w = oThis.workflow;
       w.showMenu(null);

       // reset old action of the toolbar
       if(w.toolPalette && w.toolPalette.activeTool)
       {
          oEvent.returnValue = false;
          w.onMouseDown(oThis.x+oEvent.x, oEvent.y+oThis.y);
          w.onMouseUp(oThis.x+oEvent.x, oEvent.y+oThis.y);
          return;
       }
       // check if a line has been hit. Unfortunately a line cant receive the mouseDown,mouseUp
       // event correct. This depends on the wz_vector library implementation
       // 
       if(!(oThis instanceof draw2d.ResizeHandle) && !(oThis instanceof draw2d.Port))
       {
          var line = w.getBestLine(oThis.x+oEvent.x, oEvent.y+oThis.y);
          if(line!==null)
          {
             oEvent.returnValue = false;
             w.setCurrentSelection(line);
             w.showLineResizeHandles(line);
             w.onMouseDown(oThis.x+oEvent.x, oEvent.y+oThis.y);
             return;
          }
          else if(oThis.isSelectable())
          {
            w.showResizeHandles(oThis);
            w.setCurrentSelection(oThis);
          }
       }
       oEvent.returnValue = oThis.onDragstart(oEvent.x,oEvent.y);
    };

    this.tmpDrag        = function (oEvent){oThis.onDrag();};
    this.tmpDoubleClick = function (oEvent){oThis.onDoubleClick();};

    this.draggable.addEventListener("contextmenu", this.tmpContextMenu);
    this.draggable.addEventListener("mouseenter", this.tmpMouseEnter);
    this.draggable.addEventListener("mouseleave", this.tmpMouseLeave);
    this.draggable.addEventListener("dragend", this.tmpDragend);
    this.draggable.addEventListener("dragstart",this.tmpDragstart );
    this.draggable.addEventListener("drag",this.tmpDrag);
    this.draggable.addEventListener("dblclick",this.tmpDoubleClick );
  }
  this.workflow = workflow;
};

/**
 * @private
 **/
draw2d.Figure.prototype.createHTMLElement=function(subtype)
{
    var item = document.createElement('div');
    item.id        = this.id;
    item.style.position="absolute";
    item.style.left   = this.x+"px";
    item.style.top    = this.y+"px";
    item.style.height = this.width+"px";
    item.style.width  = this.height+"px";
    item.style.margin = "0px";
    item.style.padding= "0px";
    item.style.outline= "none";
    item.style.zIndex = ""+draw2d.Figure.ZOrderBaseIndex;
    
    this.subType = subtype;
    
//    if (this.subType)
//    	alert(this.subType);
            
    return item;
};



/**
 * @private
 **/
draw2d.Figure.prototype.paint=function()
{
  for(var i=0;i<this.ports.getSize();i++)
  {
     this.ports.get(i).paint();
  }
};

/**
 * Return all ports of the node.
 *
 * @type  draw2d.ArrayList
 **/
draw2d.Figure.prototype.getPorts=function()
{
  return this.ports;
};


/**
 * Return all input ports of the node.
 *
 * @since 0.9.18
 * @type  draw2d.ArrayList
 **/
draw2d.Figure.prototype.getInputPorts=function()
{
  var result = new draw2d.ArrayList();
  for(var i=0;i<this.ports.getSize();i++)
  {
   var port = this.ports.get(i);
   if(port instanceof draw2d.InputPort)
      result.add(port);
  }
  return result;
};


draw2d.Figure.prototype.getInputPorts=function()
{
  var result = new draw2d.ArrayList();
  for(var i=0;i<this.ports.getSize();i++)
  {
   var port = this.ports.get(i);
   if(port instanceof draw2d.InputPort)
      result.add(port);
  }
  return result;
};



draw2d.Figure.prototype.getPortaEnt=function()
{
  for(var i=0;i<this.ports.getSize();i++)
  {
   var port = this.ports.get(i);
   if(port instanceof draw2d.InputPort)
      return port;
  }
  return null;
};

draw2d.Figure.prototype.getPortaSai=function()
{
  for(var i=0;i<this.ports.getSize();i++)
  {
   var port = this.ports.get(i);
   if(port instanceof draw2d.OutputPort)
      return port;
  }
  return null;
};


/**
 * Return all output ports of the node.
 *
 * @since 0.9.18
 * @type  draw2d.ArrayList
 **/
draw2d.Figure.prototype.getOutputPorts=function()
{
  var result = new draw2d.ArrayList();
  for(var i=0;i<this.ports.getSize();i++)
  {
   var port = this.ports.get(i);
   if(port instanceof draw2d.OutputPort)
      result.add(port);
  }
  return result;
};

/**
 * Return the port with the corresponding name.
 *
 * @see draw2d.Port#getName
 * @see draw2d.Port#setName
 * @param {String} portName The name of the port to return.
 * @return Returns the port with the hands over name or null.
 * @type draw2d.Port
 **/
draw2d.Figure.prototype.getPort= function(/*:String*/ portName)
{
  if(this.ports===null)
    return null;
  for(var i=0;i<this.ports.getSize();i++)
  {
   var port = this.ports.get(i);
   if(port.getName() == portName)
      return port;
  }
};

/**
 * Return the input port with the corresponding name.
 *
 * @see draw2d.Port#getName
 * @see draw2d.Port#setName
 * @param {String} portName The name of the port to return.
 * @return Returns the port with the hands over name or null.
 * @since 0.9.18
 * @type draw2d.InputPort
 **/
draw2d.Figure.prototype.getInputPort= function(/*:String*/ portName)
{
  if(this.ports===null)
    return null;
  for(var i=0;i<this.ports.getSize();i++)
  {
   var port = this.ports.get(i);
   if(port.getName() == portName && port instanceof draw2d.InputPort)
      return port;
  }
};

/**
 * Return the output port with the corresponding name.
 *
 * @see draw2d.Port#getName
 * @see draw2d.Port#setName
 * @param {String} portName The name of the port to return.
 * @return Returns the port with the hands over name or null.
 * @since 0.9.18
 * @type draw2d.OutputPort
 **/
draw2d.Figure.prototype.getOutputPort= function(/*:String*/ portName)
{
  if(this.ports===null)
    return null;
  for(var i=0;i<this.ports.getSize();i++)
  {
   var port = this.ports.get(i);
   if(port.getName() == portName && port instanceof draw2d.OutputPort)
      return port;
  }
};

/**
 * Add a port to this node at the given position.<br>
 *
 * @param {draw2d.Port} port The new port to add.
 * @param {int}  x The x position.
 * @param {int}  y The y position.
 **/
draw2d.Figure.prototype.addPort=function(/*:draw2d.Port*/ port, /*:int*/ x, /*:int*/y)
{
  this.ports.add(port);
  port.setOrigin(x,y);
  port.setPosition(x,y);
  port.setParent(this);
  // You can't delete a port with the [DEL] key if a port is a child of a node
  port.setDeleteable(false);

  this.html.appendChild(port.getHTMLElement());
  if(this.workflow!==null)
  {
    this.workflow.registerPort(port);
  }
};

/**
 * Removes a port and all related connections from this node.<br>
 *
 * @param {draw2d.Port} port The port to remove.
 *
 **/
draw2d.Figure.prototype.removePort=function(/*:draw2d.Port*/ port)
{
  if(this.ports!==null)
    this.ports.remove(port);
  try
  {
    this.html.removeChild(port.getHTMLElement());
  }
  catch(exc)
  {
    // es kann sein, dass es noch nicht eingehï¿½ngt wurde
  }
  if(this.workflow!==null)
    this.workflow.unregisterPort(port);

  // remove the related connections of the port too.
  var connections = port.getConnections();
  for (var i = 0; i < connections.getSize(); ++i)
  {
    this.workflow.removeFigure(connections.get(i));
  }
};



/**
 * Set the parent of this figure.
 * Don't call them manually. Is CompartmentFigre.appendChild() instead.

 * @param {draw2d.CompartmentFigure} parent The new parent of this figure
 * @private
 **/
draw2d.Figure.prototype.setParent=function(/*:draw2d.CompartmentFigure*/ parent)
{
  this.parent = parent;
};

/**
 * Get the parent of this figure.
 *
 * @type draw2d.CompartmentFigure
 **/
draw2d.Figure.prototype.getParent=function()
{
  return this.parent;
};


/**
 * @return Returns the z-index of the element.
 * @type int
 **/
draw2d.Figure.prototype.getZOrder=function()
{
    return this.html.style.zIndex;
};

/**
 * @param {int} index Set the new z-index of the element
 **/
draw2d.Figure.prototype.setZOrder=function(/*:int*/ index)
{
    this.html.style.zIndex=index;
};


/**
 * Return true if the origin of the Object is the window and not
 * the document. This is usefull if you want implement a window or a
 * dialog element. The element doesn't move if the user scroll the document.
 *
 * @returns Returns [true] if the origin of the object the window.
 * @type boolean
 **/
draw2d.Figure.prototype.hasFixedPosition=function()
{
  return false;
};

/**
 * This value is relevant for the interactive resize of the figure.
 *
 * @returns Returns the min width of this object.
 * @type int
 **/
draw2d.Figure.prototype.getMinWidth=function()
{
  return 5;
};

/**
 * This value is relevant for the interactive resize of the figure.
 *
 * @returns Returns the min height of this object.
 * @type int
 **/
draw2d.Figure.prototype.getMinHeight=function()
{
  return 5;
};

/**
 * @private
 **/
draw2d.Figure.prototype.getHTMLElement=function()
{
  if(this.html===null)
    this.html = this.createHTMLElement();
  return this.html;
};

/**
 * @see draw2d.Circle for an example implementation.
 * @private
 **/
draw2d.Figure.prototype.paint=function()
{
  // called after the element has been added to the document
};

/**
 * @param {draw2d.Border} border Set the border for this figure
 **/
draw2d.Figure.prototype.setBorder=function(/*:draw2d.Border*/ border)
{
  if(this.border!==null)
    this.border.figure=null;

  this.border=border;
  this.border.figure=this;
  this.border.refresh();
  this.setDocumentDirty();
};

/**
 * Callback method if the figure has been remove from the Workflow object.<br>
 * Usefull to trigger additional actions.
 *
 * @protected
 * @param {draw2d.Workflow} workflow
 * @since 0.9.19
 **/
draw2d.Figure.prototype.onRemove= function(/*:draw2d.Workflow*/ workflow)
{
};


/**
 * Callback method for the context menu interaction.
 * Don't override this method! Implement getContextMenu instead.
 *
 * @see #getContextMenu
 * @private
 * @final
 * @param {int} x The absolute x coordinate of the right mouse button click
 * @param {int} y The absolute y coordinate of the right mouse button click
 **/
draw2d.Figure.prototype.onContextMenu=function(/*:int*/ x, /*:int*/y)
{
    var menu = this.getContextMenu();
    if(menu!==null)
      this.workflow.showMenu(menu,x,y);
};

/**
 * @returns null or the Menu object for this figure.
 * @type draw2d.Menu
 **/
draw2d.Figure.prototype.getContextMenu=function()
{	
    var menu = null;
    
    // evita que a janela de texto seja exibida ao clicar duas vezes na Tools e na Property Window
    string = this.getId();
    substr = string.substring(string.length-6,string.length);
    
    if (substr != "dialog" && substr != "toolwd") {    
        menu = new draw2d.Menu();
        var oThis = this;

        menu.appendMenuItem(new draw2d.MenuItem("Elementos:", null, function(){}));        
        menu.appendMenuItem(new draw2d.MenuItem("&nbsp;&nbsp;-&nbsp; Pr&eacute;-condi&ccedil;&atilde;o (L)", null,function(){
            oThis.callChangeType("PreCondicaoL");
        }));
        menu.appendMenuItem(new draw2d.MenuItem("&nbsp;&nbsp;-&nbsp; Pr&eacute;-condi&ccedil;&atilde;o (R)", null,function(){
            oThis.callChangeType("PreCondicaoR");
        }));
        menu.appendMenuItem(new draw2d.MenuItem("&nbsp;&nbsp;-&nbsp; Meta", null,function(){
            oThis.callChangeType("Meta");
        }));
        menu.appendMenuItem(new draw2d.MenuItem("&nbsp;&nbsp;-&nbsp; Tarefa", null,function(){
            oThis.callChangeType("Tarefa");
        }));
        menu.appendMenuItem(new draw2d.MenuItem("&nbsp;&nbsp;-&nbsp; Tarefa Opcional", null,function(){
            oThis.callChangeType("TarefaOpcional");
        }));
        menu.appendMenuItem(new draw2d.MenuItem("&nbsp;&nbsp;-&nbsp; Operador", null,function(){ 
            oThis.callChangeType("Operador");
        }));  
        
        if (!this.getSubType().match("PreCondicao")) {
            if (this.haveOutConnection()) {
                menu.appendMenuItem(new draw2d.MenuItem("Cardinalidades:", null, function(){})); 
                menu.appendMenuItem(new draw2d.MenuItem("&nbsp;&nbsp;-&nbsp; Sequencial", null,function(){ 
                    oThis.callAddCardinal("sequencial");
                })); 
                menu.appendMenuItem(new draw2d.MenuItem("&nbsp;&nbsp;-&nbsp; Independente de Ordem", null,function(){ 
                    oThis.callAddCardinal("independente");
                })); 
                menu.appendMenuItem(new draw2d.MenuItem("&nbsp;&nbsp;-&nbsp; Alternativa", null,function(){ 
                    oThis.callAddCardinal("alternativa");
                })); 
                menu.appendMenuItem(new draw2d.MenuItem("&nbsp;&nbsp;-&nbsp; (Remove cardinalidades)", null,function(){ 
                    oThis.callAddCardinal();
                }));  
            }
            if (!this.getSubType().match("Meta") && !document.getElementById(this.getId()+"_execalternativa")) {
                menu.appendMenuItem(new draw2d.MenuItem("Executabilidade:", null, function(){})); 
                menu.appendMenuItem(new draw2d.MenuItem("&nbsp;&nbsp;-&nbsp; Ub&iacute;qua", null,function(){
                    oThis.callAddExecucao("ubiqua");
                })); 
                menu.appendMenuItem(new draw2d.MenuItem("&nbsp;&nbsp;-&nbsp; Iterativa", null,function(){
                    oThis.callAddExecucao("iterativa");
                }));
                menu.appendMenuItem(new draw2d.MenuItem("&nbsp;&nbsp;-&nbsp; (Remove executabilidade)", null,function(){ 
                    oThis.callAddExecucao();
                }));  
            }
        }
    }
    
    return menu;
};

draw2d.Figure.prototype.callChangeType= function(/*:string*/ newtype)
{
    if (newtype != this.getSubType())
        this.getWorkflow().getCommandStack().execute(new draw2d.CommandChangeType(this, newtype, this.getSubType()));
};

draw2d.Figure.prototype.callAddCardinal= function(/*:string*/ newcard)
{
    if (newcard != this.getCard())
        this.getWorkflow().getCommandStack().execute(new draw2d.CommandAddCardinal(this, newcard, this.getCard()));
};

draw2d.Figure.prototype.callAddExecucao= function(/*:string*/ newexec)
{
    if (newexec != this.getExec())
        this.getWorkflow().getCommandStack().execute(new draw2d.CommandAddExecucao(this, newexec, this.getExec()));
};

/**
*
* @param string The new border-type of the Figure.
**/
draw2d.Figure.prototype.setBorderType= function(/*:string*/ borderType)
{
	this.html.style.border = this.lineStroke+"px "+borderType+" "+this.lineColor.getHTMLStyle();
};

/**
*
* @param string color The size of border-radius of the Figure.
**/
draw2d.Figure.prototype.setBorderRadius= function(/*:string*/ borderRadius)
{
	this.html.style.borderRadius = borderRadius+"px";
};


/**
*
* adjust Figure to Meta pattern
**/
draw2d.Figure.prototype.makeMeta= function()
{    
        this.setBorderRadius(10);
        this.setBorderType('solid');

        //remove a div operador
        if(document.getElementById(this.getId()+"_operador")) {
            var divOper = document.getElementById(this.getId()+"_operador");
            document.getElementById(this.getId()).removeChild(divOper);
        } //remove a div precondicaol
        else if(document.getElementById(this.getId()+"_precondicaol")) {
            var divPreCond = document.getElementById(this.getId()+"_precondicaol");
            document.getElementById(this.getId()).removeChild(divPreCond);
        } //remove a div precondicaor
        else if(document.getElementById(this.getId()+"_precondicaor")) {
            var divPreCond = document.getElementById(this.getId()+"_precondicaor");
            document.getElementById(this.getId()).removeChild(divPreCond);
        }
        var htmlCardseq = "";
        if(document.getElementById(this.getId()+"_cardsequencial")) {
            htmlCardseq = $("#"+this.getId()+"_cardsequencial").html();
            var divCardSeq = document.getElementById(this.getId()+"_cardsequencial");
            document.getElementById(this.getId()).removeChild(divCardSeq);
        }
        var htmlCardInd = "";
        if(document.getElementById(this.getId()+"_cardindependente")) {
            htmlCardInd = $("#"+this.getId()+"_cardindependente").html();
            var divCardInd = document.getElementById(this.getId()+"_cardindependente");
            document.getElementById(this.getId()).removeChild(divCardInd);
        }
        var htmlCardAlt = "";
        if(document.getElementById(this.getId()+"_cardalternativa")) {
            htmlCardAlt = $("#"+this.getId()+"_cardalternativa").html();
            var divCardAlt = document.getElementById(this.getId()+"_cardalternativa");
            document.getElementById(this.getId()).removeChild(divCardAlt);
        }
        if(document.getElementById(this.getId()+"_execubiqua")) {
            var divExecSeq = document.getElementById(this.getId()+"_execubiqua");
            document.getElementById(this.getId()).removeChild(divExecSeq);
        }
        if(document.getElementById(this.getId()+"_execiterativa")) {
            var divExecInd = document.getElementById(this.getId()+"_execiterativa");
            document.getElementById(this.getId()).removeChild(divExecInd);
        }
        if(document.getElementById(this.getId()+"_execalternativa")) {
            var divExecAlt = document.getElementById(this.getId()+"_execalternativa");
            document.getElementById(this.getId()).removeChild(divExecAlt);
        }

        //add a porta de entrada caso nao exista
        existsInPort = false;
        inputPorts = this.getInputPorts();  
        for(var i=0;i<inputPorts.getSize();i++)
        {
            //se jÃ¡ tiver, aproveita e ajusta a posicao
            inputPorts.get(i).setPosition(this.width/2,0);
            existsInPort = true;
        }
        if (!existsInPort) {
            ip = new draw2d.InputPort();
            ip.setWorkflow(this.getWorkflow());
            ip.setUiRepresentation(new draw2d.Circle(8,8));
            ip.setBackgroundColor(new draw2d.Color(0,0,0));  
            ip.setHideIfConnected(true);              
            this.addPort(ip,this.width/2,0);
        }

        //add a porta de saida caso nao exista
        existsOutPort = false;
        outputPorts = this.getOutputPorts();  
        for(var i=0;i<outputPorts.getSize();i++)
        {
            //se jÃ¡ tiver, aproveita e ajusta a posicao
            outputPorts.get(i).setPosition(this.width/2,this.height);
            existsOutPort = true;
        }
        if (!existsOutPort) {
            op = new draw2d.OutputPort();
            op.setWorkflow(this.getWorkflow());
            op.setUiRepresentation(new draw2d.Circle(8,8));
            op.setBackgroundColor(new draw2d.Color(0,0,0));  
            //op.setHideIfConnected(true);
            this.addPort(op,this.width/2,this.height);
        }   
        
        if (htmlCardseq != "")
            this.addCardinalDiv(this.getId(), "sequencial", htmlCardseq);
        else if (htmlCardInd != "")
            this.addCardinalDiv(this.getId(), "independente", htmlCardInd);
        else if (htmlCardAlt != "")
            this.addCardinalDiv(this.getId(), "alternativa", htmlCardAlt);  
          
        // set type
        this.setSubType("Meta");
};

/**
*
* adjust Figure to Tarefa normal or optional pattern
**/
draw2d.Figure.prototype.makeTarefa= function(/*:boolean*/optional)
{    
        this.setBorderRadius(0);
        if (optional)
            this.setBorderType('dashed');
        else
            this.setBorderType('solid');

        //remove a div operador
        if(document.getElementById(this.getId()+"_operador")) {
            var divOper = document.getElementById(this.getId()+"_operador");
            document.getElementById(this.getId()).removeChild(divOper);
        } //remove a div precondicaol
        else if(document.getElementById(this.getId()+"_precondicaol")) {
            var divPreCond = document.getElementById(this.getId()+"_precondicaol");
            document.getElementById(this.getId()).removeChild(divPreCond);
        } //remove a div precondicaor
        else if(document.getElementById(this.getId()+"_precondicaor")) {
            var divPreCond = document.getElementById(this.getId()+"_precondicaor");
            document.getElementById(this.getId()).removeChild(divPreCond);
        }
        var htmlCardseq = "";
        if(document.getElementById(this.getId()+"_cardsequencial")) {
            htmlCardseq = $("#"+this.getId()+"_cardsequencial").html();
            var divCardSeq = document.getElementById(this.getId()+"_cardsequencial");
            document.getElementById(this.getId()).removeChild(divCardSeq);
        }
        var htmlCardInd = "";
        if(document.getElementById(this.getId()+"_cardindependente")) {
            htmlCardInd = $("#"+this.getId()+"_cardindependente").html();
            var divCardInd = document.getElementById(this.getId()+"_cardindependente");
            document.getElementById(this.getId()).removeChild(divCardInd);
        }
        var htmlCardAlt = "";
        if(document.getElementById(this.getId()+"_cardalternativa")) {
            htmlCardAlt = $("#"+this.getId()+"_cardalternativa").html();
            var divCardAlt = document.getElementById(this.getId()+"_cardalternativa");
            document.getElementById(this.getId()).removeChild(divCardAlt);
        }

        //add a porta de entrada caso nao exista
        existsInPort = false;
        inputPorts = this.getInputPorts();  
        for(var i=0;i<inputPorts.getSize();i++)
        {
            //se jÃ¡ tiver, aproveita e ajusta a posicao
            inputPorts.get(i).setPosition(this.width/2,0);
            existsInPort = true;
        }
        if (!existsInPort) {
            ip = new draw2d.InputPort();
            ip.setWorkflow(this.getWorkflow());
            ip.setUiRepresentation(new draw2d.Circle(8,8));
            ip.setBackgroundColor(new draw2d.Color(0,0,0));  
            ip.setHideIfConnected(true);              
            this.addPort(ip,this.width/2,0);
        } 

        //add a porta de saida caso nao exista
        existsOutPort = false;
        outputPorts = this.getOutputPorts();  
        for(var i=0;i<outputPorts.getSize();i++)
        {
            //se jÃ¡ tiver, aproveita e ajusta a posicao
            outputPorts.get(i).setPosition(this.width/2,this.height);
            existsOutPort = true;
        }
        if (!existsOutPort) {
            op = new draw2d.OutputPort();
            op.setWorkflow(this.getWorkflow());
            op.setUiRepresentation(new draw2d.Circle(8,8));
            op.setBackgroundColor(new draw2d.Color(0,0,0));  
            //op.setHideIfConnected(true);
            this.addPort(op,this.width/2,this.height);
        }   
        
        if (htmlCardseq != "")
            this.addCardinalDiv(this.getId(), "sequencial", htmlCardseq);        
        else if (htmlCardInd != "")
            this.addCardinalDiv(this.getId(), "independente", htmlCardInd);
        else if (htmlCardAlt != "")
            this.addCardinalDiv(this.getId(), "alternativa", htmlCardAlt);
        
        // set type
        if (optional)
        	this.setSubType("TarefaOpcional");
        else
        	this.setSubType("Tarefa");
};

/**
*
* adjust Figure to Operador pattern
**/
draw2d.Figure.prototype.makeOperador= function()
{
        this.setBorderRadius(0);
        this.setBorderType('solid');
                    
        //remove a div precondicaol
        if(document.getElementById(this.getId()+"_precondicaol")) {
            var divPreCond = document.getElementById(this.getId()+"_precondicaol");
            document.getElementById(this.getId()).removeChild(divPreCond);
        } //remove a div precondicaor
        else if(document.getElementById(this.getId()+"_precondicaor")) {
            var divPreCond = document.getElementById(this.getId()+"_precondicaor");
            document.getElementById(this.getId()).removeChild(divPreCond);
        }      
        var htmlCardseq = "";
        if(document.getElementById(this.getId()+"_cardsequencial")) {
            htmlCardseq = $("#"+this.getId()+"_cardsequencial").html();
            var divCardSeq = document.getElementById(this.getId()+"_cardsequencial");
            document.getElementById(this.getId()).removeChild(divCardSeq);
        }
        var htmlCardInd = "";
        if(document.getElementById(this.getId()+"_cardindependente")) {
            htmlCardInd = $("#"+this.getId()+"_cardindependente").html();
            var divCardInd = document.getElementById(this.getId()+"_cardindependente");
            document.getElementById(this.getId()).removeChild(divCardInd);
        }
        var htmlCardAlt = "";
        if(document.getElementById(this.getId()+"_cardalternativa")) {
            htmlCardAlt = $("#"+this.getId()+"_cardalternativa").html();
            var divCardAlt = document.getElementById(this.getId()+"_cardalternativa");
            document.getElementById(this.getId()).removeChild(divCardAlt);
        }   
        var htmlExecUbi = "";
        if(document.getElementById(this.getId()+"_execubiqua")) {
            htmlExecUbi = $("#"+this.getId()+"_execubiqua").html();
            var divExecUbi = document.getElementById(this.getId()+"_execubiqua");
            document.getElementById(this.getId()).removeChild(divExecUbi);
        }
        var htmlExecIte = "";
        if(document.getElementById(this.getId()+"_execiterativa")) {
            htmlExecIte = $("#"+this.getId()+"_execiterativa").html();
            var divExecIte = document.getElementById(this.getId()+"_execiterativa");
            document.getElementById(this.getId()).removeChild(divExecIte);
        }
        
        //remove as cardinalidades antes de remover a outputport senÃ£o depois nÃ£o dÃ¡ mais
        this.removeCardinal(this.getId());
           
        //add a porta de entrada caso nao exista
        existsInPort = false;
        inputPorts = this.getInputPorts();  
        for(var i=0;i<inputPorts.getSize();i++)
        {
            //se jÃ¡ tiver, aproveita e ajusta a posicao
            inputPorts.get(i).setPosition(this.width/2,0);
            existsInPort = true;
        }
        if (!existsInPort) {
            ip = new draw2d.InputPort();
            ip.setWorkflow(this.getWorkflow());
            ip.setUiRepresentation(new draw2d.Circle(8,8));
            ip.setBackgroundColor(new draw2d.Color(0,0,0));  
            ip.setHideIfConnected(true);              
            this.addPort(ip,this.width/2,0);
        } 
        
        //remove a porta de saida
        outputPorts = this.getOutputPorts();  
        for(var i=0;i<outputPorts.getSize();i++)
        {
            this.removePort(outputPorts.get(i));
        }
        
        //remove a div operador
        if(document.getElementById(this.getId()+"_operador")) {
            var divOper = document.getElementById(this.getId()+"_operador");
            document.getElementById(this.getId()).removeChild(divOper);
        } 
        
        //add a div operador caso nao exista
        if(!document.getElementById(this.getId()+"_operador")) {
	        var divOper = document.createElement("div");     	 
	        divOper.id = this.getId()+"_operador"; 
	        divOper.style.borderBottom = "1px solid #000";        
	        //se ja tiver a div de texto entao o margin Ã© diferente
	        if(document.getElementById(this.getId()+"_text"))
	        	divOper.style.marginTop = "10px";
	        else
	        	divOper.style.marginTop = (this.getHeight()+8)+"px";        
	        divOper.style.width = "100%";
	        document.getElementById(this.getId()).appendChild(divOper); 
        }
        
        if (htmlCardseq != "")
            this.addCardinalDiv(this.getId(), "sequencial", htmlCardseq);
        else if (htmlCardInd != "")
            this.addCardinalDiv(this.getId(), "independente", htmlCardInd);
        else if (htmlCardAlt != "")
            this.addCardinalDiv(this.getId(), "alternativa", htmlCardAlt);
        
        if (htmlExecUbi != "")
            this.addExecucaoDiv("ubiqua", true);
        else if (htmlExecIte != "")
            this.addExecucaoDiv("iterativa", true);
        	
        // set type
        this.setSubType("Operador");
};

/**
*
* adjust Figure to PreCondicao pattern
**/
draw2d.Figure.prototype.makePreCondicao= function(/*:string*/side)
{    
        this.setBorderRadius(0);
        this.setBorderType('solid');
                    
        //remove a div operador
        if(document.getElementById(this.getId()+"_operador")) {
            var divOper = document.getElementById(this.getId()+"_operador");
            document.getElementById(this.getId()).removeChild(divOper);
        } 
        if(document.getElementById(this.getId()+"_cardsequencial")) {
            var divCardSeq = document.getElementById(this.getId()+"_cardsequencial");
            document.getElementById(this.getId()).removeChild(divCardSeq);
        }
        if(document.getElementById(this.getId()+"_cardindependente")) {
            var divCardInd = document.getElementById(this.getId()+"_cardindependente");
            document.getElementById(this.getId()).removeChild(divCardInd);
        }
        if(document.getElementById(this.getId()+"_cardalternativa")) {
            var divCardAlt = document.getElementById(this.getId()+"_cardalternativa");
            document.getElementById(this.getId()).removeChild(divCardAlt);
        }
        if(document.getElementById(this.getId()+"_execubiqua")) {
            var divExecSeq = document.getElementById(this.getId()+"_execubiqua");
            document.getElementById(this.getId()).removeChild(divExecSeq);
        }
        if(document.getElementById(this.getId()+"_execiterativa")) {
            var divExecInd = document.getElementById(this.getId()+"_execiterativa");
            document.getElementById(this.getId()).removeChild(divExecInd);
        }
        if(document.getElementById(this.getId()+"_execalternativa")) {
            var divExecAlt = document.getElementById(this.getId()+"_execalternativa");
            document.getElementById(this.getId()).removeChild(divExecAlt);
        }

        //remove a porta de entrada
        inputPorts = this.getInputPorts();  
        for(var i=0;i<inputPorts.getSize();i++)
        {
            this.removePort(inputPorts.get(i));
        }

        //add a porta de saida caso nao exista
        existsOutPort = false;
        outputPorts = this.getOutputPorts();  
        for(var i=0;i<outputPorts.getSize();i++)
        {
            //se jÃ¡ tiver, aproveita e ajusta a posicao
            if (side == "left")
                outputPorts.get(i).setPosition(-12, this.height/2);
            else
                outputPorts.get(i).setPosition((this.width + 12.5),this.height/2);
            existsOutPort = true;
        }
        if (!existsOutPort) {
            op = new draw2d.OutputPort();
            op.setWorkflow(this.getWorkflow());
            op.setUiRepresentation(new draw2d.Circle(8,8));
            op.setBackgroundColor(new draw2d.Color(0,0,0));  
            //op.setHideIfConnected(true);
            if (side == "left")
                this.addPort(op,-12,this.height/2); 
            else
                this.addPort(op,(this.width + 12.5),this.height/2);
        }              
        
        //remove a div precondicaol
        if(document.getElementById(this.getId()+"_precondicaol")) {
            var divPreCond = document.getElementById(this.getId()+"_precondicaol");
            document.getElementById(this.getId()).removeChild(divPreCond);
        } //remove a div precondicaor
        else if(document.getElementById(this.getId()+"_precondicaor")) {
            var divPreCond = document.getElementById(this.getId()+"_precondicaor");
            document.getElementById(this.getId()).removeChild(divPreCond);
        } 
        
        //add a div precondicao
        var divPreCond = document.createElement("div");
        if (side == "left")
            divPreCond.id = this.getId()+"_precondicaol"; 
        else
            divPreCond.id = this.getId()+"_precondicaor"; 
        if (side == "left")
            divPreCond.style.borderLeft = "1px solid #000"; 
        else
            divPreCond.style.borderLeft = "1px solid #000";    

        //se ja tiver a div de texto entao o margin Ã© diferente
        if(document.getElementById(this.getId()+"_text")) {
            if (side == "left")
                divPreCond.style.marginLeft = "-13px";
            else    
                divPreCond.style.marginLeft = (this.getWidth()+10)+"px";  
            divPreCond.style.marginTop = "-"+(this.getHeight()-2)+"px";
        } else {
            if (side == "left")
                divPreCond.style.marginLeft = "-13px";
            else
                divPreCond.style.marginLeft = (this.getWidth()+10)+"px";
        }        

        divPreCond.style.height = this.getHeight()+"px";
        document.getElementById(this.getId()).appendChild(divPreCond);
        
        // set type
        if (side == "left")
            this.setSubType("PreCondicaoL");
        else
            this.setSubType("PreCondicaoR");
};

/**
*
* verify if element have any out connection
**/
draw2d.Figure.prototype.haveOutConnection= function(/*:String*/ type)
{                
    outputPorts = this.getOutputPorts();  
    for(var i=0;i<outputPorts.getSize();i++)
    {
        connections = outputPorts.get(i).getConnections();
        for(var j=0;j<connections.getSize();j++)
        {
            return true;	        		
        }
        return false;
    }
};

/**
*
* add in FigureChilds the cardinality stereotypes
**/
draw2d.Figure.prototype.addCardinal= function(/*:String*/ type)
{             	
    if (!this.getSubType().match("PreCondicao")) {
        outputPorts = this.getOutputPorts();  
        for(var i=0;i<outputPorts.getSize();i++)
        {
            connections = outputPorts.get(i).getConnections();
            //remove as cardinalidades dos filhos
            for(var j=0;j<connections.getSize();j++)
            {
                portTarget = connections.get(j).getTarget();	
                idPortPai = document.getElementById(portTarget.getId()).parentNode.id;  
                this.removeCardinal(idPortPai);
            }
            //add as cardinalidades aos filhos
            for(var j=0;j<connections.getSize();j++)
            {
                portTarget = connections.get(j).getTarget();	
                idPortPai = document.getElementById(portTarget.getId()).parentNode.id;                
                this.addCardinalDiv(idPortPai, type, j+1);		
            }
        }				
    }
    
};

/**
*
* add in FigureChilds the div of cardinality stereotypes
**/
draw2d.Figure.prototype.addCardinalDiv= function(/*:String*/ id, /*:String*/ type, /*:String*/ num)
{
	if(!document.getElementById(id+"_card"+type)) {	
	    var divCard = document.createElement("div");     	 
	    divCard.id = id+"_card"+type;    
	    divCard.style.marginLeft = "-15px";	            
	    if (this.haveChild(id, "operador")) {
	    	divCard.style.marginTop = "-"+($("#"+id).height() + 27)+"px";
            } else if (this.haveChild(id, "text")) {
	    	divCard.style.marginTop = "-"+($("#"+id).height() + 16)+"px";
            } else {
	    	divCard.style.marginTop = "-16px";
            }
	    divCard.style.width = "20px";
	    divCard.style.height = "15px";
            if (type == "independente") {
                if (!this.isInt(num))
                    divCard.innerHTML = num.substr(0, num.length - 1) + "?";
                else
                    divCard.innerHTML = num + "?";
            } else if (type == "alternativa") {
                if (this.isInt(num)) {
                    letras = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];
                    divCard.innerHTML = letras[num-1];
                } else {
                    divCard.innerHTML = num;
                }

                figPortPai = this.getWorkflow().getFigure(id);
                figPortPai.addExecucaoDiv(type);
            }
            else {
                divCard.innerHTML = num;
            }
	    document.getElementById(id).appendChild(divCard);

            this.setCard(type);
            
            //reset exec divs
            if(document.getElementById(id+"_execubiqua")) {
                var divExecUbi = document.getElementById(id+"_execubiqua");
                document.getElementById(id).removeChild(divExecUbi);

                figPortPai = this.getWorkflow().getFigure(id);
                figPortPai.addExecucaoDiv("ubiqua",true);
            }
            if(document.getElementById(id+"_execiterativa")) {
                var divExecIte = document.getElementById(id+"_execiterativa");
                document.getElementById(id).removeChild(divExecIte);

                figPortPai = this.getWorkflow().getFigure(id);
                figPortPai.addExecucaoDiv("iterativa",true);
            }
            if(document.getElementById(id+"_execalternativa")) {
                var divExecAlt = document.getElementById(id+"_execalternativa");
                document.getElementById(id).removeChild(divExecAlt);

                figPortPai = this.getWorkflow().getFigure(id);
                figPortPai.addExecucaoDiv("alternativa",true);
            }
	}
}

/**
*
* remove in FigureChilds the cardinality stereotypes
**/
draw2d.Figure.prototype.removeCardinal= function(/*:String*/ id, /*:Boolean*/isWorkflow, /*:Workflow*/workflow, /*:Boolean*/isConnectless)
{        
    if (isConnectless) {
        if(document.getElementById(id+"_cardsequencial")) {
            var divCardSeq = document.getElementById(id+"_cardsequencial");
            document.getElementById(id).removeChild(divCardSeq);
        } 
        else if(document.getElementById(id+"_cardindependente")) {
            var divCardInd = document.getElementById(id+"_cardindependente");
            document.getElementById(id).removeChild(divCardInd);
        }
        else if(document.getElementById(id+"_cardalternativa")) {
            var divCardAlt = document.getElementById(id+"_cardalternativa");
            document.getElementById(id).removeChild(divCardAlt);

            figPortPai = this.getWorkflow().getFigure(id);
            figPortPai.removeExecucao("alternativa");
        }
    }
    else {
        outputPorts = this.getOutputPorts();      
        for(var i=0;i<outputPorts.getSize();i++)
        {
            connections = outputPorts.get(i).getConnections();
            for(var j=0;j<connections.getSize();j++)
            {
                portTarget = connections.get(j).getTarget();	
                idPortPai = document.getElementById(portTarget.getId()).parentNode.id;

                if (id == idPortPai || id == this.getId()) {
                    if(document.getElementById(idPortPai+"_cardsequencial")) {
                        var divCardSeq = document.getElementById(idPortPai+"_cardsequencial");
                        document.getElementById(idPortPai).removeChild(divCardSeq);
                    } 
                    else if(document.getElementById(idPortPai+"_cardindependente")) {
                        var divCardInd = document.getElementById(idPortPai+"_cardindependente");
                        document.getElementById(idPortPai).removeChild(divCardInd);
                    }
                    else if(document.getElementById(idPortPai+"_cardalternativa")) {
                        var divCardAlt = document.getElementById(idPortPai+"_cardalternativa");
                        document.getElementById(idPortPai).removeChild(divCardAlt);

                        figPortPai = this.getWorkflow().getFigure(idPortPai);
                        figPortPai.removeExecucao("alternativa");
                    }

                    if (!isWorkflow) {
                        //reset exec divs
                        if(document.getElementById(idPortPai+"_execubiqua")) {
                            var divExecUbi = document.getElementById(idPortPai+"_execubiqua");
                            document.getElementById(idPortPai).removeChild(divExecUbi);

                            figPortPai = this.getWorkflow().getFigure(idPortPai);
                            figPortPai.addExecucaoDiv("ubiqua",true);
                        }
                        if(document.getElementById(idPortPai+"_execiterativa")) {
                            var divExecIte = document.getElementById(idPortPai+"_execiterativa");
                            document.getElementById(idPortPai).removeChild(divExecIte);

                            figPortPai = this.getWorkflow().getFigure(idPortPai);
                            figPortPai.addExecucaoDiv("iterativa",true);
                        }
                    } else {
                        //reset exec divs
                        if(document.getElementById(idPortPai+"_execubiqua")) {
                            var divExecUbi = document.getElementById(idPortPai+"_execubiqua");
                            document.getElementById(idPortPai).removeChild(divExecUbi);

                            figPortPai = workflow.getFigure(idPortPai);
                            figPortPai.addExecucaoDiv("ubiqua",true);
                        }
                        if(document.getElementById(idPortPai+"_execiterativa")) {
                            var divExecIte = document.getElementById(idPortPai+"_execiterativa");
                            document.getElementById(idPortPai).removeChild(divExecIte);

                            figPortPai = workflow.getFigure(idPortPai);
                            figPortPai.addExecucaoDiv("iterativa",true);
                        }
                    }

                    this.setCard(null);
                }
            }
        }
    }
};


/**
*
* add in figure the div of execution stereotypes
**/
draw2d.Figure.prototype.addExecucaoDiv= function(/*:String*/ type,/*:Boolean*/ alwaysExecute)
{
    if(!document.getElementById(this.getId()+"_exec"+type) || alwaysExecute) {        
        this.removeExecucao(type);
        
        var divExec = document.createElement("div");     	 
        divExec.id = this.getId()+"_exec"+type;    
        divExec.style.marginLeft = (this.getWidth() - 15)+"px";	            
        if (this.haveChild(this.getId(), "operador")) {
            if ((this.haveChild(this.getId(), "text") && this.haveChild(this.getId(), "card")) || this.haveChild(this.getId(), "card"))
                divExec.style.marginTop = "0px";
            else
                divExec.style.marginTop = "-"+(this.getHeight() + 10)+"px";
        }
        else if (this.haveChild(this.getId(), "text")) {
            if (!this.haveChild(this.getId(), "card"))
                divExec.style.marginTop = "-"+(this.getHeight() - 1)+"px";
        }
        else {
            divExec.style.marginTop = "-1px";
        }
        divExec.style.width = "20px";
        divExec.style.height = "15px";
        if (type == "ubiqua") {
            divExec.innerHTML = "<img src='../../tc2/prototipo/images/ubiqua.gif' height='10' width='10'/>";
        } 
        else if (type == "iterativa") {
            divExec.innerHTML = "<img src='../../tc2/prototipo/images/iterativa.jpg' height='10' width='10'/>";
        }
        else {
            divExec.innerHTML = "<img src='../../tc2/prototipo/images/alternativa.gif' height='10' width='10'/>";
        }
        document.getElementById(this.getId()).appendChild(divExec);

        this.setExec(type);
    }
}

/**
*
* remove from figure the execution stereotypes
**/
draw2d.Figure.prototype.removeExecucao= function(type)
{
    if (type == "alternativa") {
        if(document.getElementById(this.getId()+"_execubiqua")) {
            var divExec = document.getElementById(this.getId()+"_execubiqua");
            document.getElementById(this.getId()).removeChild(divExec);
        }
        else if(document.getElementById(this.getId()+"_execiterativa")) {
            var divExec = document.getElementById(this.getId()+"_execiterativa");
            document.getElementById(this.getId()).removeChild(divExec);
        }
        if(document.getElementById(this.getId()+"_execalternativa")) {
            var divExec = document.getElementById(this.getId()+"_execalternativa");
            document.getElementById(this.getId()).removeChild(divExec);
        }
    }
    else {
        if(document.getElementById(this.getId()+"_execubiqua")) {
            var divExec = document.getElementById(this.getId()+"_execubiqua");
            document.getElementById(this.getId()).removeChild(divExec);
        }
        else if(document.getElementById(this.getId()+"_execiterativa")) {
            var divExec = document.getElementById(this.getId()+"_execiterativa");
            document.getElementById(this.getId()).removeChild(divExec);
        }
    }
    this.setExec(null);
};


draw2d.Figure.prototype.isInt=function(n) {
    return typeof n === 'number' && parseFloat(n) == parseInt(n) && !isNaN(n);
}

/**
*
* return the connections of this inputport
**/
draw2d.Figure.prototype.getInConnections= function()
{         
    inputPorts = this.getInputPorts();      
    for(var i=0;i<inputPorts.getSize();i++)
    {
        return inputPorts.get(i).getConnections();
    }
};

/**
*
* return the connections of this outputport
**/
draw2d.Figure.prototype.getOutConnections= function()
{         
    outputPorts = this.getOutputPorts();      
    for(var i=0;i<outputPorts.getSize();i++)
    {
        return outputPorts.get(i).getConnections();
    }
};

/**
*
* return true if the div have a child with the param name
**/
draw2d.Figure.prototype.haveChild= function(/*:String*/ id, /*:String*/ childName)
{    
    if (document.getElementById(id)) {
        childs = document.getElementById(id).getElementsByTagName('div');
        for (i=0; i < childs.length ;i++) {
            if (childs[i].id.match(childName))
                return true;		
        }
    }
    return false;
}

/**
 * Callback method for the double click event of user interaction.
 * Sub classes can override this method to implement their own behaviour.
 **/
draw2d.Figure.prototype.onDoubleClick=function()
{	
    // evita que a janela de texto seja exibida ao clicar duas vezes na Tools e na Property Window
    string = this.getId();
    substr = string.substring(string.length-6,string.length);
    		
    if (substr != "dialog" && substr != "toolwd" && this.getSubType() != undefined) {    
        var id = this.getId()+"_text";
        var idIn = id+"_in";    

        if(document.getElementById(idIn))
            var textOld = document.getElementById(idIn).innerHTML;
        else
            var textOld = "";

        //substitui chars especiais
        while (textOld.indexOf("<br>") > -1)
        	textOld = textOld.replace("<br>","\n");

        //pega o texto antigo, caso haja e passa pra textarea do dialog
        var dialogText = $( "#dialog_text" ); 
        dialogText.val(textOld);

        // mostra o jQuery dialog
        $( "#dialog" ).dialog({
                    zIndex: 50001,
                    modal: true,
                    draggable: false,
                    resizable: false,
                    idFigure: this.getId(),
                    figure: this,
                    buttons: {
                    "OK": function() {
                                $(this).dialog("close");

                                //seta os ids para usar depois
                                var idFigure = $(this).dialog( "option", "idFigure" );
                                var id = idFigure+"_text";
                                var idIn = id+"_in";
                                var dialogText = $( "#dialog_text" );

                                var str = dialogText.val();
                                //substitui chars especiais
                                while (str.indexOf("/") > -1)
                                    str = str.replace("/", "");
                               
                               while (str.indexOf("|") > -1)
                                    str = str.replace("|", "");
  
                                while (str.indexOf("\n") > -1)
                                    str = str.replace("\n","<br/>");

                                if(str != "" && str != null) { 
                                    figure = $(this).dialog( "option", "figure" );

                                    textOld = figure.getTextIn();

                                    //remove o texto antigo
                                    if(document.getElementById(id)) {
                                        var divTextOld = document.getElementById(id);
                                        document.getElementById(idFigure).removeChild(divTextOld);
                                    } 

                                    //remove a div operador/precondicao
                                    var hasOperador = false;                                            
                                    if(document.getElementById(idFigure+"_operador")) {
                                        var divOper = document.getElementById(idFigure+"_operador");
                                        document.getElementById(idFigure).removeChild(divOper);
                                        hasOperador = true;
                                    } 
                                    var hasPreCond = false;
                                    var side = null;
                                    if(document.getElementById(idFigure+"_precondicaol")) {
                                        var divPreCond = document.getElementById(idFigure+"_precondicaol");
                                        document.getElementById(idFigure).removeChild(divPreCond);
                                        hasPreCond = true;
                                        side = "left";
                                    }
                                    if(document.getElementById(idFigure+"_precondicaor")) {
                                        var divPreCond = document.getElementById(idFigure+"_precondicaor");
                                        document.getElementById(idFigure).removeChild(divPreCond);
                                        hasPreCond = true;
                                        side = "right";
                                    }
                                    var htmlCardseq = "";
                                    if(document.getElementById(idFigure+"_cardsequencial")) {
                                        htmlCardseq = $("#"+idFigure+"_cardsequencial").html();
                                        var divCardSeq = document.getElementById(idFigure+"_cardsequencial");
                                        document.getElementById(idFigure).removeChild(divCardSeq);
                                    }
                                    var htmlCardInd = "";
                                    if(document.getElementById(idFigure+"_cardindependente")) {
                                        htmlCardInd = $("#"+idFigure+"_cardindependente").html();
                                        var divCardInd = document.getElementById(idFigure+"_cardindependente");
                                        document.getElementById(idFigure).removeChild(divCardInd);
                                    }
                                    var htmlCardAlt = "";
                                    if(document.getElementById(idFigure+"_cardalternativa")) {
                                        htmlCardAlt = $("#"+idFigure+"_cardalternativa").html();
                                        var divCardAlt = document.getElementById(idFigure+"_cardalternativa");
                                        document.getElementById(idFigure).removeChild(divCardAlt);
                                    }  
                                    var hasExecUbi = false;
                                    if(document.getElementById(idFigure+"_execubiqua")) {
                                        var divExecUbi = document.getElementById(idFigure+"_execubiqua");
                                        document.getElementById(idFigure).removeChild(divExecUbi);
                                        hasExecUbi = true;
                                    }
                                    var hasExecIte = false;
                                    if(document.getElementById(idFigure+"_execiterativa")) {
                                        var divExecIte = document.getElementById(idFigure+"_execiterativa");
                                        document.getElementById(idFigure).removeChild(divExecIte);
                                        hasExecIte = true;
                                    }
                                    var hasExecAlt = false;
                                    if(document.getElementById(idFigure+"_execalternativa")) {
                                        var divExecAlt = document.getElementById(idFigure+"_execalternativa");
                                        document.getElementById(idFigure).removeChild(divExecAlt);
                                        hasExecAlt = true;
                                    }
                                    
                                    //add a div mais de fora
                                    var divTextPai = document.createElement("div");     	 
                                    divTextPai.id = id; 
                                    divTextPai.style.textAlign = "center";
                                    divTextPai.style.display = "table";
                                    divTextPai.style.width = "100%";
                                    divTextPai.style.height = "100%";
                                    document.getElementById(idFigure).appendChild(divTextPai); 

                                    //add a div do texto mesmo
                                    var divText = document.createElement("div");
                                    divText.id = idIn; 
                                    divText.style.display = "table-cell";
                                    divText.style.verticalAlign = "middle";
                                    divText.style.overflow = "auto";
                                    document.getElementById(id).appendChild(divText);   
                                                                                                            
                                    // add o texto no undo/redo
                                    figure.getWorkflow().getCommandStack().execute(new draw2d.CommandSetText(figure, str, textOld, hasPreCond, side));
                                                                        
                                    //ajustes de operador caso seja
                                    if (hasOperador) {
                                        figure.makeOperador(); 
                                    }
                                    //ajustes de precondicao caso seja
                                    if (hasPreCond) {
                                        figure.makePreCondicao(side);
                                    } 
                                    if (htmlCardseq != "")
                                        figure.addCardinalDiv(idFigure, "sequencial", htmlCardseq);
                                    else if (htmlCardInd != "")
                                        figure.addCardinalDiv(idFigure, "independente", htmlCardInd);
                                    else if (htmlCardAlt != "")
                                        figure.addCardinalDiv(idFigure, "alternativa", htmlCardAlt);
                                    if (hasExecUbi)
                                        figure.addExecucaoDiv("ubiqua");
                                    else if (hasExecIte)
                                        figure.addExecucaoDiv("iterativa");
                                    else if (hasExecAlt)
                                        figure.addExecucaoDiv("alternativa");
                                }

                                return true;
              },
              "Cancelar": function() {
                  $(this).dialog("close");
                  return false;
              }
          }
        });  
    }
};


draw2d.Figure.prototype.getTextIn=function()
{
	return $("#"+this.getId()+'_text_in').html();
};

/**
 * Callback method for the mouse enter event. Usefull for mouse hover-effects.
 * Sub classes can override this method to implement their own behaviour.
 **/
draw2d.Figure.prototype.onMouseEnter=function()
{
};


/**
 * Callback method for the mouse leave event. Usefull for mouse hover-effects.
 * 
 **/
draw2d.Figure.prototype.onMouseLeave=function()
{
};

/**
 * Don't call them manually. This will be done by the framework.<br>
 * Will be called if the object are moved via drag and drop.
 * Sub classes can override this method to implement additional stuff. Don't forget to call
 * the super implementation via <code>Figure.prototype.onDrag.call(this);</code>
 * @private
 **/
draw2d.Figure.prototype.onDrag = function()
{
  this.x = this.draggable.getLeft();
  this.y = this.draggable.getTop();

  // enable the  blending o the first real move of the object
  //
  if(this.isMoving==false)
  {
   this.isMoving = true;
   this.alphaBeforeOnDrag = this.getAlpha();
   this.setAlpha(this.alphaBeforeOnDrag*0.5);
  }
  this.fireMoveEvent();
};

/**
 * Will be called after a drag and drop action.<br>
 * Sub classes can override this method to implement additional stuff. Don't forget to call
 * the super implementation via <code>Figure.prototype.onDragend.call(this);</code>
 * @private
 **/
draw2d.Figure.prototype.onDragend = function()
{
   if(this.getWorkflow().getEnableSmoothFigureHandling()===true)
   {
      var oThis = this;
      var slowShow = function()
      {
         if(oThis.alpha<oThis.alphaBeforeOnDrag)
         {
            oThis.setAlpha(Math.min(1.0,oThis.alpha+0.05));
         }
         else
         {
            window.clearInterval(oThis.timer);
            oThis.timer = -1;
         }
      };
      if(oThis.timer>0)
         window.clearInterval(oThis.timer);
      oThis.timer = window.setInterval(slowShow,20);
  }
  else
  {
      this.setAlpha(this.alphaBeforeOnDrag);
  }
  // Element ist zwar schon an seine Position, das Command muss aber trotzdem
  // in dem CommandStack gelegt werden damit das Undo funktioniert.
  //
  this.command.setPosition(this.x, this.y);
  this.workflow.commandStack.execute(this.command);
  this.command = null;
  this.isMoving = false;
  this.workflow.hideSnapToHelperLines();
  this.fireMoveEvent();
};


/**
 * Will be called if the drag and drop action beginns. You can return [false] if you
 * want avoid that the figure can be move.
 * 
 * @param {int} x the x-coordinate of the click event
 * @param {int} y the y-coordinate of the click event
 * @type boolean
 **/
draw2d.Figure.prototype.onDragstart = function(/*:int*/ x, /*:int*/ y)
{
  this.command = this.createCommand(new draw2d.EditPolicy(draw2d.EditPolicy.MOVE));
  return this.command!==null;
};

/**
 * Switch on/off the drag drop behaviour of this object
 *
 * @param {boolean} flag The new drag drop indicator
 **/
draw2d.Figure.prototype.setCanDrag=function(/*:boolean*/flag)
{
  this.canDrag= flag;
  if(flag)
    this.html.style.cursor="move";
  else
    this.html.style.cursor="";
};

/**
 * Return [true] of the object can be moved via drag drop.
 *
 * @type boolean
 * @since 0.9.18
 **/
draw2d.Figure.prototype.getCanDrag=function()
{
  return this.canDrag;
};

/**
 * Set the alpha blending of this figure. 
 *
 * @see #getAlpha
 * @param {float} percent Value between 0-1.
 **/
draw2d.Figure.prototype.setAlpha=function(/*:float 0-1*/ percent)
{
  if(this.alpha===percent)
     return;

  this.alpha = Math.max(0.0,Math.min(1.0,percent));
  if(this.alpha==1.0)
  {
    this.html.style.filter = "";
    this.html.style.opacity = "";
  }
  else
  {
    this.html.style.filter = "alpha(opacity="+Math.round(this.alpha*100)+")";
    this.html.style.opacity = this.alpha;
  }
};

/**
 * Get the alpha blending of this figure. Values are always between [0,1]
 *
 * @see #setAlpha
 * @type {float}
 **/
draw2d.Figure.prototype.getAlpha=function()
{
  return this.alpha;
};

/**
 * Set the new width and height of the figure. 
 *
 * @see #getMinWidth
 * @see #getMinHeight
 * @param {int} w The new width of the figure
 * @param {int} h The new height of the figure
 **/
draw2d.Figure.prototype.setDimension=function(/*:int*/ w, /*:int*/ h)
{
    this.width = Math.max(this.getMinWidth(),w);
    this.height= Math.max(this.getMinHeight(),h);

    // Nothing to do if the figure not part of the current DOM tree
    //
    if(this.html===null)
    return;

    this.html.style.width  = this.width+"px";
    this.html.style.height = this.height+"px";

    this.fireMoveEvent();

    // Update the resize handles if the user change the dimension via an API call
    //
    if(this.workflow!==null && this.workflow.getCurrentSelection()==this)
    {
     this.workflow.showResizeHandles(this);
    }

    //ajusta a posicao das portas, se houver alguma
    inputPorts = this.getInputPorts();  
    for(var i=0;i<inputPorts.getSize();i++)
    {
          inputPorts.get(i).setPosition(this.width/2,0);
    }
    outputPorts = this.getOutputPorts();  
    for(var i=0;i<outputPorts.getSize();i++)
    {
          outputPorts.get(i).setPosition(this.width/2,this.height);
    }

    if(document.getElementById(this.getId()+'_text')) {
        document.getElementById(this.getId()+'_text').offsetHeight = this.getHeight();

        //como a inclusao das cardinalidades vem do pai, eh mais facil setar o marginTop soh
        if (this.haveChild(this.getId(), "_cardsequencial"))
            $("#"+this.getId()+"_cardsequencial").css('marginTop', "-"+(this.getHeight()+16)+'px');
        else if (this.haveChild(this.getId(), "_cardindependente"))
            $("#"+this.getId()+"_cardindependente").css('marginTop', "-"+(this.getHeight()+16)+'px');
        else if (this.haveChild(this.getId(), "_cardalternativa"))
            $("#"+this.getId()+"_cardalternativa").css('marginTop', "-"+(this.getHeight()+16)+'px');
    }
      
    if(document.getElementById(this.getId()+'_precondicaol'))        
        this.makePreCondicao("left");    
    else if(document.getElementById(this.getId()+'_precondicaor'))        
        this.makePreCondicao("right");    
    else if(document.getElementById(this.getId()+'_operador'))        
        this.makeOperador();  
            
    if(document.getElementById(this.getId()+"_execubiqua")) 
        this.addExecucaoDiv("ubiqua",true);
    else if(document.getElementById(this.getId()+"_execiterativa")) 
        this.addExecucaoDiv("iterativa",true);
    else if(document.getElementById(this.getId()+"_execalternativa")) 
        this.addExecucaoDiv("alternativa",true);
};

/**
 * Set the position of the object.
 *
 * @param {int} xPos The new x coordinate of the figure
 * @param {int} yPos The new y coordinate of the figure 
 **/
draw2d.Figure.prototype.setPosition=function(/*:int*/ xPos , /*:int*/ yPos )
{
//  this.x = Math.max(0,xPos);
//  this.y = Math.max(0,yPos);
  this.x= xPos;
  this.y= yPos;
  // Falls das Element noch nie gezeichnet wurde, dann braucht aus das HTML nicht 
  // aktualisiert werden
  //
  if(this.html===null)
    return;

  this.html.style.left = this.x+"px";
  this.html.style.top  = this.y+"px";

  this.fireMoveEvent();

  // Update the resize handles if the user change the position of the element via an API call.
  //
  if(this.workflow!==null && this.workflow.getCurrentSelection()==this)
     this.workflow.showResizeHandles(this);
};

/**
 * Returns the true if the figure can be resized.
 *
 * @see #setResizeable
 * @type boolean
 **/
draw2d.Figure.prototype.isResizeable=function()
{
  return this.resizeable;
};

/**
 * You can change the resizeable behaviour of this object. Hands over [false] and
 * the figure has no resizehandles if you select them with the mouse.<br>
 *
 * @see #getResizeable
 * @param {boolean} flag The resizeable flag.
 **/
draw2d.Figure.prototype.setResizeable=function(/*:boolean*/ flag)
{
  this.resizeable=flag;
};

/**
 * 
 * @type boolean
 **/
draw2d.Figure.prototype.isSelectable=function()
{
  return this.selectable;
};


/**
 * You can change the selectable behaviour of this object. Hands over [false] and
 * the figure has no selection handles if you try to select them with the mouse.<br>
 *
 * @param {boolean} flag The selectable flag.
 **/
draw2d.Figure.prototype.setSelectable=function(/*:boolean*/ flag)
{
  this.selectable=flag;
};

/**
 * Return true if the object doesn't care about the aspect ratio.
 * You can change the hight and width indipendent.
 * @type boolean
 */
draw2d.Figure.prototype.isStrechable=function()
{
  return true;
};

/**
 * Return false if you avoid that the user can delete your figure.
 * Sub class can override this method.
 * @type boolean
 **/
draw2d.Figure.prototype.isDeleteable=function()
{
  return this.deleteable;
};

/**
 * Return false if you avoid that the user can delete your figure.
 * 
 * @param {boolean} flag Enable or disable flag for the delete operation
 **/
draw2d.Figure.prototype.setDeleteable=function(/*:boolean */flag)
{
  this.deleteable = flag;
};


/**
 * Set the flag if this object can snap to grid or geometry.
 * A window of dialog should set this flag to false.
 * @param {boolean} flag The snap to grid/geometry enable flag.
 *
 **/
draw2d.Figure.prototype.setCanSnapToHelper=function(/*:boolean */flag)
{
  this.canSnapToHelper = flag;
};

/**
 * Returns true if the figure cna snap to any helper like a grid, guide, geometrie
 * or something else.
 *
 * @type boolean
 **/
draw2d.Figure.prototype.getCanSnapToHelper=function()
{
  return this.canSnapToHelper;
};

/**
 *
 * @type draw2d.Point
 **/
draw2d.Figure.prototype.getSnapToGridAnchor=function()
{
  return this.snapToGridAnchor;
};

/**
 *
 * @type draw2d.Point
 **/
draw2d.Figure.prototype.setSnapToGridAnchor=function(/*:draw2d.Point*/ point)
{
  this.snapToGridAnchor = point;
};

/**
 * @type draw2d.Dimension
 **/
draw2d.Figure.prototype.getBounds=function()
{
  return new draw2d.Dimension(this.getX(),this.getY(),this.getWidth(),this.getHeight());
};


/**
 * @type int
 **/
draw2d.Figure.prototype.getWidth=function()
{
  return this.width;
};

/**
 * @type int
 **/
draw2d.Figure.prototype.getHeight=function()
{
  return this.height;
};

/**
 * @returns The y-offset to the parent figure.
 * @type int
 **/
draw2d.Figure.prototype.getY=function()
{
    return this.y;
};

/**
 * @returns the x-offset to the parent figure
 * @type int
 **/
draw2d.Figure.prototype.getX=function()
{
    return this.x;
};

/**
 * @returns The Y coordinate in relation the Canvas.
 * @type int
 **/
draw2d.Figure.prototype.getAbsoluteY=function()
{
  return this.y;
};

/**
 * @returns The X coordinate in relation to the canvas
 * @type int
 **/
draw2d.Figure.prototype.getAbsoluteX=function()
{
  return this.x;
};

/**
 * This method will be called from the framework if the objects is selected and the user press any key.
 * Sub class can override this method to implement their own stuff.
 * 
 * @param {int} keyCode The code of the pressed key
 **/
draw2d.Figure.prototype.onKeyDown=function(/*:int*/ keyCode, /*:boolean*/ ctrl)
{
  if(keyCode==46)
     this.workflow.getCommandStack().execute(this.createCommand(new draw2d.EditPolicy(draw2d.EditPolicy.DELETE)));

  // redirect any CTRL key strokes to the parent workflow/canvas
  //
  if(ctrl)
     this.workflow.onKeyDown(keyCode,ctrl);
};

/**
 * Returns the position of the figure.
 *
 * @type draw2d.Point
 * @deprecated
 **/
draw2d.Figure.prototype.getPosition=function()
{
  return new draw2d.Point(this.x, this.y);
};


draw2d.Figure.prototype.isOver = function (/*:int*/ iX ,/*:int*/ iY)
{
    var x = this.getAbsoluteX();
    var y = this.getAbsoluteY();
    var iX2 = x + this.width;
    var iY2 = y + this.height;
    return (iX >= x && iX <= iX2 && iY >= y && iY <= iY2);
};

/**
 * @param {draw2d.Figure} figure The figure to monitor
 *
 **/
draw2d.Figure.prototype.attachMoveListener = function(/*:draw2d.Figure*/ figure)
{
  if(figure===null || this.moveListener===null)
    return;

  this.moveListener.add(figure);
};


/**
 * @param {draw2d.Figure} figure The figure to remove the monitor
 *
 **/
draw2d.Figure.prototype.detachMoveListener = function(/*:draw2d.Figure*/ figure) 
{
  if(figure===null || this.moveListener===null)
    return;

  this.moveListener.remove(figure);
};

/**
 * @private
 **/
draw2d.Figure.prototype.fireMoveEvent=function()
{
  this.setDocumentDirty();
  var size= this.moveListener.getSize();
  for(var i=0;i<size;i++)
  {
    this.moveListener.get(i).onOtherFigureMoved(this);
  }
};

/**
 * Set the primary model object that this Figure represents. This method is used 
 * by an EditPartFactory when creating an Figure.
 * 
 * @param {draw2d.AbstractObjectModel} model The model
 * @since 0.9.15
 * @final
 */
draw2d.Figure.prototype.setModel=function(/*:draw2d.AbstractObjectModel*/ model)
{
   if(this.model!==null)
      this.model.removePropertyChangeListener(this);

   this.model = model;

   if(this.model!==null)
      this.model.addPropertyChangeListener(this);
};


/**
 * Returns the primary model object that this Figure represents.
 * 
 * @type draw2d.AbstractObjectModel
 * @since 0.9.15
 * @final
 */
draw2d.Figure.prototype.getModel=function()
{
   return this.model;
};


/**
 * Falls man sich zuvor an einem Object mit attacheMoveListener(..) registriert hat,
 * wird man hierÃƒÂ¼ber dann informiert wenn sich das Objekt bewegt hat.
 *
 * @param {draw2d.Figure} figure The figure which has changed its position
 * @private
 */
draw2d.Figure.prototype.onOtherFigureMoved=function(/*:draw2d.Figure*/ figure)
{
};

/**
 * This method will be called if the figure has changed any postion, color, dimension or something else.
 *
 * @private
 **/
draw2d.Figure.prototype.setDocumentDirty=function()
{
  if(this.workflow!==null)
    this.workflow.setDocumentDirty();
};


/**
 * Utility function to disable text selection on the handsover element
 *
 * @private
 **/
draw2d.Figure.prototype.disableTextSelection=function(/*:HTMLElement*/ element)
{
  element.onselectstart = function() {return false;};
  element.unselectable = "on";
  element.className = element.className +" unselectable";
  element.onmousedown=function(){return false;};
};


/**
 * Returns the Command to perform the specified Request or null.
 * @param {draw2d.EditPolicy} request describes the Command being requested
 * @return null or a Command
 * @type draw2d.Command 
 * @since 0.9.15
 **/
draw2d.Figure.prototype.createCommand=function(/*:draw2d.EditPolicy*/ request)
{
  if(request.getPolicy() == draw2d.EditPolicy.MOVE)
  {
    if(!this.canDrag)
      return null;
    return new draw2d.CommandMove(this);
  }

  if(request.getPolicy() == draw2d.EditPolicy.DELETE)
  {
    if(!this.isDeleteable())
       return null;
    return new draw2d.CommandDelete(this)
  }
  if(request.getPolicy() == draw2d.EditPolicy.RESIZE)
  {
    if(!this.isResizeable())
       return null;
    return new draw2d.CommandResize(this)
  }
  return null;
};


/**
*
* retorna o pai da conexao ou '' e fecha a string!!!
**/
draw2d.Figure.prototype.getPai= function()
{
    var resultado = '';
    inputPorts = this.getInputPorts();
    for(var i=0;i<inputPorts.getSize();i++){
       connections = inputPorts.get(i).getConnections(); 
       for(var j=0;j<connections.getSize();j++){
            //pega a port de destino dessa connection
            portTarget = connections.get(j).getSource();
            
            idPortt = document.getElementById(portTarget.getId()).parentNode.id; 
            var aux = (idPortt);         // parentNode.id; 
            resultado += (aux)
       }
    }
  //  resultado += '|';
    return resultado; 
}
 
/**
* retorna Cardinalidade!!!
**/
draw2d.Figure.prototype.getCardinalidade= function()
{     
 var Card = "N";
        if(document.getElementById(this.getId()+"_cardsequencial")) {
            Card = 'S';
        }
        if(document.getElementById(this.getId()+"_cardindependente")) {
            Card = 'I';
        }
        if(document.getElementById(this.getId()+"_cardalternativa")) {
            Card = "A";
        }
 return Card;     
}       

/**
* Altera o texto do objeto!!!
**/
draw2d.Figure.prototype.setTexto= function(texto)
{     
        var id = this.getId()+"_text";
        var idIn = id+"_in";    
		var idFigure = this.getId();
		var id = idFigure+"_text";
		var idIn = id+"_in";
		var dialogText = texto;
		var str = texto;

		//remove a div operador/precondicao
		var hasOperador = false;                                            
		if(document.getElementById(idFigure+"_operador")) {
			var divOper = document.getElementById(idFigure+"_operador");
			document.getElementById(idFigure).removeChild(divOper);
			hasOperador = true;
		} 
		var hasPreCond = false;
		var side = null;
		if(document.getElementById(idFigure+"_precondicaol")) {
			var divPreCond = document.getElementById(idFigure+"_precondicaol");
			document.getElementById(idFigure).removeChild(divPreCond);
			hasPreCond = true;
			side = "left";
		}
		if(document.getElementById(idFigure+"_precondicaor")) {
			var divPreCond = document.getElementById(idFigure+"_precondicaor");
			document.getElementById(idFigure).removeChild(divPreCond);
			hasPreCond = true;
			side = "right";
		}
		var htmlCardseq = "";
		if(document.getElementById(idFigure+"_cardsequencial")) {
			htmlCardseq = $("#"+idFigure+"_cardsequencial").html();
			var divCardSeq = document.getElementById(idFigure+"_cardsequencial");
			document.getElementById(idFigure).removeChild(divCardSeq);
		}
		var htmlCardInd = "";
		if(document.getElementById(idFigure+"_cardindependente")) {
			htmlCardInd = $("#"+idFigure+"_cardindependente").html();
			var divCardInd = document.getElementById(idFigure+"_cardindependente");
			document.getElementById(idFigure).removeChild(divCardInd);
		}
		var htmlCardAlt = "";
		if(document.getElementById(idFigure+"_cardalternativa")) {
			htmlCardAlt = $("#"+idFigure+"_cardalternativa").html();
			var divCardAlt = document.getElementById(idFigure+"_cardalternativa");
			document.getElementById(idFigure).removeChild(divCardAlt);
		}  
		var hasExecUbi = false;
		if(document.getElementById(idFigure+"_execubiqua")) {
			var divExecUbi = document.getElementById(idFigure+"_execubiqua");
			document.getElementById(idFigure).removeChild(divExecUbi);
			hasExecUbi = true;
		}
		var hasExecIte = false;
		if(document.getElementById(idFigure+"_execiterativa")) {
			var divExecIte = document.getElementById(idFigure+"_execiterativa");
			document.getElementById(idFigure).removeChild(divExecIte);
			hasExecIte = true;
		}
		var hasExecAlt = false;
		if(document.getElementById(idFigure+"_execalternativa")) {
			var divExecAlt = document.getElementById(idFigure+"_execalternativa");
			document.getElementById(idFigure).removeChild(divExecAlt);
			hasExecAlt = true;
		}
		
		//add a div mais de fora
		var divTextPai = document.createElement("div");     	 
		divTextPai.id = id; 
		divTextPai.style.textAlign = "center";
		divTextPai.style.display = "table";
		divTextPai.style.width = "100%";
		divTextPai.style.height = "100%";
		document.getElementById(idFigure).appendChild(divTextPai); 

		//add a div do texto mesmo
		var divText = document.createElement("div");
		divText.id = idIn; 
		divText.style.display = "table-cell";
		divText.style.verticalAlign = "middle";
		divText.style.overflow = "auto";
		document.getElementById(id).appendChild(divText);   
																												
		//ajustes de operador caso seja
		if (hasOperador) {
			figure.makeOperador(); 
		}
		//ajustes de precondicao caso seja
		if (hasPreCond) {
			figure.makePreCondicao(side);
		} 
		if (htmlCardseq != "")
			figure.addCardinalDiv(idFigure, "sequencial", htmlCardseq);
		else if (htmlCardInd != "")
			figure.addCardinalDiv(idFigure, "independente", htmlCardInd);
		else if (htmlCardAlt != "")
			figure.addCardinalDiv(idFigure, "alternativa", htmlCardAlt);
		if (hasExecUbi)
			figure.addExecucaoDiv("ubiqua");
		else if (hasExecIte)
			figure.addExecucaoDiv("iterativa");
		else if (hasExecAlt)
			figure.addExecucaoDiv("alternativa"); 
                    var textOld = "";
                this.getCommandStack().execute(new draw2d.CommandSetText(this, str, textOld, hasPreCond, side));
} 