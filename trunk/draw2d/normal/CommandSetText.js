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
draw2d.CommandSetText=function(/*:draw2d.Figure*/ figure, /*:string*/ newtext, /*:string*/ oldtext, /*:boolean*/ hasPreCond, /*:string*/ side)
{
   var alterado = ''; 
   alterado = newtext.replace('|', '-');
   alterado = alterado.replace(':',';');
   draw2d.Command.call(this,"set text");
   this.figure = figure;
   this.newtext = alterado;
   this.oldtext = oldtext;
   this.hasPreCond = hasPreCond;
   this.side = side;
};


draw2d.CommandSetText.prototype = new draw2d.Command();
/** @private **/
draw2d.CommandSetText.prototype.type="draw2d.CommandSetText";

/**
 * Execute the command the first time
 * 
 **/
draw2d.CommandSetText.prototype.execute=function()
{
	this.redo();
};


/** Redo the command after the user has undo this command
 *
 **/
draw2d.CommandSetText.prototype.redo=function()
{
        var id = this.figure.getId();
        //seta o texto na div
	$("#"+id+'_text_in').html(this.newtext);
        //ajusta a dimensao da div da Figure                                            
        this.figure.setDimension($("#"+id+"_text").width()+2, $("#"+id+"_text").height()+2);
        
        if (this.hasPreCond)
            this.figure.makePreCondicao(this.side);
};


/**
 * Undo the command
 *
 **/
draw2d.CommandSetText.prototype.undo=function()
{
        var id = this.figure.getId();
        //seta o texto na div
	$("#"+id+'_text_in').html(this.oldtext);
        //ajusta a dimensao da div da Figure                                            
        this.figure.setDimension($("#"+id+"_text").width()+2, $("#"+id+"_text").height()+2);
        
        if (this.hasPreCond)
            this.figure.makePreCondicao(this.side);
};
