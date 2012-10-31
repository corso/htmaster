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
 * @author Gustavo Corso Ribeiro
 * @constructor
 */
draw2d.CommandAddExecucao=function(/*:draw2d.Figure*/ figure, /*:string*/ newexec, /*:string*/ oldexec)
{
   draw2d.Command.call(this,"add executabilidade");
   this.figure = figure;
   this.newexec = newexec;
   this.oldexec = oldexec;
};

draw2d.CommandAddExecucao.prototype = new draw2d.Command();
/** @private **/
draw2d.CommandAddExecucao.prototype.type="draw2d.CommandAddExecucao";

/**
 * Execute the command the first time
 * 
 **/
draw2d.CommandAddExecucao.prototype.execute=function()
{
	this.redo();
};

/**
 * Undo the command
 *
 **/
draw2d.CommandAddExecucao.prototype.redo=function()
{
    if (this.newexec != null)
        this.figure.addExecucaoDiv(this.newexec);
    else
        this.figure.removeExecucao();
};

/** Redo the command after the user has undo this command
 *
 **/
draw2d.CommandAddExecucao.prototype.undo=function()
{
    if (this.oldexec != null)
        this.figure.addExecucaoDiv(this.oldexec);
    else
        this.figure.removeExecucao();
};
