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
draw2d.CommandAddCardinal=function(/*:draw2d.Figure*/ figure, /*:string*/ newcard, /*:string*/ oldcard)
{
   draw2d.Command.call(this,"add cardinalidade");
   this.figure = figure;
   this.newcard = newcard;
   this.oldcard = oldcard;
};

draw2d.CommandAddCardinal.prototype = new draw2d.Command();
/** @private **/
draw2d.CommandAddCardinal.prototype.type="draw2d.CommandAddCardinal";

/**
 * Execute the command the first time
 * 
 **/
draw2d.CommandAddCardinal.prototype.execute=function()
{
	this.redo();
};

/**
 * Undo the command
 *
 **/
draw2d.CommandAddCardinal.prototype.redo=function()
{
    if (this.newcard != null)
        this.figure.addCardinal(this.newcard);
    else
        this.figure.removeCardinal(this.figure.getId());
};

/** Redo the command after the user has undo this command
 *
 **/
draw2d.CommandAddCardinal.prototype.undo=function()
{
    if (this.oldcard != null)
        this.figure.addCardinal(this.oldcard);
    else
        this.figure.removeCardinal(this.figure.getId());
};
