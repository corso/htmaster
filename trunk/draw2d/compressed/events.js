/**
This notice must be untouched at all times.
This is the COMPRESSED version of Draw2D
WebSite: http://www.draw2d.org
Copyright: 2006 Andreas Herz. All rights reserved.
Created: 5.11.2006 by Andreas Herz (Web: http://www.freegroup.de )
LICENSE: LGPL
**/

var draw2d=new Object();var _errorStack_=[];function pushErrorStack(e,_ae5){_errorStack_.push(_ae5+"\n");throw e;}draw2d.AbstractEvent=function(){this.type=null;this.target=null;this.relatedTarget=null;this.cancelable=false;this.timeStamp=null;this.returnValue=true;};draw2d.AbstractEvent.prototype.initEvent=function(_ae6,_ae7){this.type=_ae6;this.cancelable=_ae7;this.timeStamp=(new Date()).getTime();};draw2d.AbstractEvent.prototype.preventDefault=function(){if(this.cancelable){this.returnValue=false;}};draw2d.AbstractEvent.fireDOMEvent=function(_ae8,_ae9){if(document.createEvent){var evt=document.createEvent("Events");evt.initEvent(_ae8,true,true);_ae9.dispatchEvent(evt);}else{if(document.createEventObject){var evt=document.createEventObject();_ae9.fireEvent("on"+_ae8,evt);}}};draw2d.EventTarget=function(){this.eventhandlers={};};draw2d.EventTarget.prototype.addEventListener=function(_aeb,_aec){if(typeof this.eventhandlers[_aeb]=="undefined"){this.eventhandlers[_aeb]=[];}this.eventhandlers[_aeb][this.eventhandlers[_aeb].length]=_aec;};draw2d.EventTarget.prototype.dispatchEvent=function(_aed){_aed.target=this;if(typeof this.eventhandlers[_aed.type]!="undefined"){for(var i=0;i<this.eventhandlers[_aed.type].length;i++){this.eventhandlers[_aed.type][i](_aed);}}return _aed.returnValue;};draw2d.EventTarget.prototype.removeEventListener=function(_aef,_af0){if(typeof this.eventhandlers[_aef]!="undefined"){var _af1=[];for(var i=0;i<this.eventhandlers[_aef].length;i++){if(this.eventhandlers[_aef][i]!=_af0){_af1[_af1.length]=this.eventhandlers[_aef][i];}}this.eventhandlers[_aef]=_af1;}};