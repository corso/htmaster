/**
This notice must be untouched at all times.
This is the COMPRESSED version of Draw2D
WebSite: http://www.draw2d.org
Copyright: 2006 Andreas Herz. All rights reserved.
Created: 5.11.2006 by Andreas Herz (Web: http://www.freegroup.de )
LICENSE: LGPL
**/

draw2d.Dialog=function(_938){this.buttonbar=null;if(_938){draw2d.WindowFigure.call(this,_938);}else{draw2d.WindowFigure.call(this,"Dialog");}this.setDimension(400,300);};draw2d.Dialog.prototype=new draw2d.WindowFigure();draw2d.Dialog.prototype.type="draw2d.Dialog";draw2d.Dialog.prototype.createHTMLElement=function(){var item=draw2d.WindowFigure.prototype.createHTMLElement.call(this);var _93a=this;this.buttonbar=document.createElement("div");this.buttonbar.style.position="absolute";this.buttonbar.style.left="0px";this.buttonbar.style.bottom="0px";this.buttonbar.style.width=this.getWidth()+"px";this.buttonbar.style.height="30px";this.buttonbar.style.margin="0px";this.buttonbar.style.padding="0px";this.buttonbar.style.font="normal 10px verdana";this.buttonbar.style.backgroundColor="#c0c0c0";this.buttonbar.style.borderBottom="2px solid gray";this.buttonbar.style.whiteSpace="nowrap";this.buttonbar.style.textAlign="center";this.buttonbar.className="Dialog_buttonbar";this.okbutton=document.createElement("button");this.okbutton.style.border="1px solid gray";this.okbutton.style.font="normal 10px verdana";this.okbutton.style.width="80px";this.okbutton.style.margin="5px";this.okbutton.className="Dialog_okbutton";this.okbutton.innerHTML="Ok";this.okbutton.onclick=function(){var _93b=null;try{_93a.onOk();}catch(e){_93b=e;}_93a.workflow.removeFigure(_93a);if(_93b!==null){throw _93b;}};this.buttonbar.appendChild(this.okbutton);this.cancelbutton=document.createElement("button");this.cancelbutton.innerHTML="Cancel";this.cancelbutton.style.font="normal 10px verdana";this.cancelbutton.style.border="1px solid gray";this.cancelbutton.style.width="80px";this.cancelbutton.style.margin="5px";this.cancelbutton.className="Dialog_cancelbutton";this.cancelbutton.onclick=function(){var _93c=null;try{_93a.onCancel();}catch(e){_93c=e;}_93a.workflow.removeFigure(_93a);if(_93c!==null){throw _93c;}};this.buttonbar.appendChild(this.cancelbutton);item.appendChild(this.buttonbar);return item;};draw2d.Dialog.prototype.onOk=function(){};draw2d.Dialog.prototype.onCancel=function(){};draw2d.Dialog.prototype.setDimension=function(w,h){draw2d.WindowFigure.prototype.setDimension.call(this,w,h);if(this.buttonbar!==null){this.buttonbar.style.width=this.getWidth()+"px";}};draw2d.Dialog.prototype.setWorkflow=function(_93f){draw2d.WindowFigure.prototype.setWorkflow.call(this,_93f);this.setFocus();};draw2d.Dialog.prototype.setFocus=function(){};draw2d.Dialog.prototype.onSetDocumentDirty=function(){};