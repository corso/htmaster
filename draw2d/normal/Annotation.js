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
 * @author Andreas Herz
 * @version 0.9.26
 * @param {String} msg The annotation text to display.
 * @constructor
 */
draw2d.Annotation=function(/*:String*/ msg)
{
  /** @private **/
  this.msg = msg;
  /** @private **/
  this.alpha =1.0;
  /** @private **/
  this.color = new  draw2d.Color(0,0,0);
  /** @private **/
  this.bgColor = new  draw2d.Color(241,241,121);
  /** @private **/
  this.fontSize= 10;
  /** @private **/
  this.textNode = null;
  draw2d.Figure.call(this);
};

draw2d.Annotation.prototype = new draw2d.Figure();
/** @private **/
draw2d.Annotation.prototype.type="draw2d.Annotation";

/**
 * @private
 **/
draw2d.Annotation.prototype.createHTMLElement=function()
{
    var item = draw2d.Figure.prototype.createHTMLElement.call(this);
    item.style.color=this.color.getHTMLStyle();
    item.style.backgroundColor=this.bgColor.getHTMLStyle();
    item.style.fontSize=this.fontSize+"pt";
    item.style.width="auto";
    item.style.height="auto";
    item.style.margin="0px";
    item.style.padding="0px";
    item.onselectstart = function() {return false;};
    item.unselectable = "on";
    item.style.cursor = "default";

    this.textNode = document.createTextNode(this.msg);
    item.appendChild(this.textNode);
    this.disableTextSelection(item);

    return item;
};

/**
 * This method will be called from the framework if the user dbl click on this
 * figure. Sub classes can override this method to implement there own behaviour.<br>
 *
 **/
draw2d.Annotation.prototype.onDoubleClick=function()
{
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

                    //add a div mais de fora
                    var divTextPai = document.createElement("div");
                    divTextPai.id = id;
                    divTextPai.style.textAlign = "left";
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
                    figure.getWorkflow().getCommandStack().execute(new draw2d.CommandSetText(figure, str, textOld));
                }

                return true;
          },
          "Cancelar": function() {
              $(this).dialog("close");
              return false;
          }
      }
    });
};


/**
 * @returns null or the Menu object for this figure.
 * @type draw2d.Menu
 **/
draw2d.Annotation.prototype.getContextMenu=function()
{
    var menu = new draw2d.Menu();
    var oThis = this;

    menu.appendMenuItem(new draw2d.MenuItem("Cor de fundo:", null, function(){}));
    menu.appendMenuItem(new draw2d.MenuItem("&nbsp;&nbsp;-&nbsp; Amarelo", null,function(){
        oThis.setBackgroundColor(new draw2d.Color(241,241,121));
    }));
    menu.appendMenuItem(new draw2d.MenuItem("&nbsp;&nbsp;-&nbsp; Branco", null,function(){
        oThis.setBackgroundColor(new draw2d.Color(255,255,255));
    }));

    return menu;
}


/**
 * Set the background color of this figure 
 *
 * @param {draw2d.Color} color The new background color of this object.
 **/
draw2d.Annotation.prototype.setBackgroundColor= function(/*:draw2d.Color*/ color)
{
  this.bgColor = color;
  if(this.bgColor!==null)
    this.html.style.backgroundColor=this.bgColor.getHTMLStyle();
  else
    this.html.style.backgroundColor="transparent";
};


/**
 * Returns the current background color of this objetc. 
 *
 * @returns Returns the current background color of this figure.
 * @type draw2d.Color
 **/
draw2d.Annotation.prototype.getBackgroundColor=function()
{
  return this.bgColor;
};


/**
 * Set the font size of the annotation text
 * @param {int} size The font size in <code>pt</code>
 **/
draw2d.Annotation.prototype.setFontSize= function(/*:int*/ size)
{
  this.fontSize = size;
  this.html.style.fontSize = this.fontSize+"pt";
};
/**
 * @type String
 * @returns Returns the annotation text.
 **/ 
draw2d.Annotation.prototype.getText=function()
{
  return this.msg;
};

/**
 * Set the text or message of this annotation figure.
 *
 * @param {String} text The new text of the annotation.
 **/
draw2d.Annotation.prototype.setText=function(/*:String*/ text)
{
  this.msg = text;
  this.html.removeChild(this.textNode);
  this.textNode = document.createTextNode(this.msg);
  this.html.appendChild(this.textNode);
};


draw2d.Annotation.prototype.setStyledText=function(/*:String*/ text)
{
  this.msg = text;
  this.html.removeChild(this.textNode);
  this.textNode = document.createElement("div");
  this.textNode.innerHTML=text;
  this.html.appendChild(this.textNode);
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


