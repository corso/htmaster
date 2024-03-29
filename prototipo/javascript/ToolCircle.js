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

draw2d.ToolCircle=function(/*:draw2d.PaletteWindow*/ palette)
{
  draw2d.ToolGeneric.call(this,palette);
  this.setDimension(24,24);
};

draw2d.ToolCircle.prototype = new draw2d.ToolGeneric();
/** @private */
draw2d.ToolCircle.prototype.type="ToolCircle";


draw2d.ToolCircle.prototype.execute=function(/*:int*/ x,/*:int*/ y)
{
  var figure= new draw2d.Circle();
  figure.setDimension(100,100);
  figure.setBackgroundColor(new  draw2d.Color(255,255,255));

  // 1.) Undo/Redo support
  this.palette.workflow.getCommandStack().execute(new draw2d.CommandAdd(this.palette.workflow,figure,x,y));

  // 2.) without undo/redo
  //this.palette.workflow.addFigure(figure,x,y);

  draw2d.ToolGeneric.prototype.execute.call(this,x,y);
  
  $( 'div[id*="-"]' ).draggable( {containment: ".Workflow"});
};
