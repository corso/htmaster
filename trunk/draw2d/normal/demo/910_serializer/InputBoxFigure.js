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
draw2d.InputBoxFigure=function(/*:String */ title)
{
  /** @private **/
  if(title)
     this.title =title;
  else
     this.title = "";
  draw2d.Figure.call(this);
};

draw2d.InputBoxFigure.prototype = new draw2d.Figure();
/** @private **/
draw2d.InputBoxFigure.prototype.type="InputBoxFigure";

/**
 * @private
 **/
draw2d.InputBoxFigure.prototype.createHTMLElement=function()
{
  var item = draw2d.Figure.prototype.createHTMLElement.call(this);
  item.style.margin="0px";
  item.style.padding="0px";

  this.ui_element = document.createElement("div");
  this.ui_element.style.position="absolute";
  this.ui_element.style.left   = "0px";
  this.ui_element.style.top    = "0px";
  this.ui_element.style.cursor="move";
  this.ui_element.style.borderStyle="inset";
  
  item.appendChild(this.ui_element);
  return item;
};

/**
 * @param {int} w new width of the window. 
 * @param {int} h new height of the window. 
 **/
draw2d.InputBoxFigure.prototype.setDimension=function( w /*:int*/, h /*:int*/)
{
  draw2d.Figure.prototype.setDimension.call(this,w,20);
  if(this.ui_element!==null)
  {
    this.ui_element.style.width= (this.getWidth() -4)+"px";
    this.ui_element.style.height=(this.getHeight()-4)+"px";
  }
};

/**
 * @type int
 **/
draw2d.InputBoxFigure.prototype.getMinWidth=function()
{
  return 50;
};

