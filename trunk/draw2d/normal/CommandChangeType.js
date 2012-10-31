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
draw2d.CommandChangeType=function(/*:draw2d.Figure*/ figure, /*:string*/ newtype, /*:string*/ oldtype)
{
   draw2d.Command.call(this,"change type");
   this.figure = figure;
   this.newtype = newtype;
   this.oldtype = oldtype;
};

draw2d.CommandChangeType.prototype = new draw2d.Command();
/** @private **/
draw2d.CommandChangeType.prototype.type="draw2d.CommandChangeType";

/**
 * Execute the command the first time
 * 
 **/
draw2d.CommandChangeType.prototype.execute=function()
{
	this.redo();
};

/**
 * Undo the command
 *
 **/
draw2d.CommandChangeType.prototype.redo=function()
{
    if (this.newtype == "PreCondicaoL")
        this.figure.makePreCondicao("left");
    else if (this.newtype == "PreCondicaoR")
        this.figure.makePreCondicao("right");
    else if (this.newtype == "Meta")
        this.figure.makeMeta();
    else if (this.newtype == "Tarefa")
        this.figure.makeTarefa();
    else if (this.newtype == "TarefaOpcional")
        this.figure.makeTarefa(true);
    else if (this.newtype == "Operador")            
        this.figure.makeOperador();
};

/** Redo the command after the user has undo this command
 *
 **/
draw2d.CommandChangeType.prototype.undo=function()
{	
    if (this.oldtype == "PreCondicaoL")
        this.figure.makePreCondicao("left");
    else if (this.oldtype == "PreCondicaoR")
        this.figure.makePreCondicao("right");
    else if (this.oldtype == "Meta")
        this.figure.makeMeta();
    else if (this.oldtype == "Tarefa")
        this.figure.makeTarefa();
    else if (this.oldtype == "TarefaOpcional")
        this.figure.makeTarefa(true);
    else if (this.oldtype == "Operador")            
        this.figure.makeOperador();
};
