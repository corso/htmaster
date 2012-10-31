/**
This notice must be untouched at all times.
This is the COMPRESSED version of Draw2D
WebSite: http://www.draw2d.org
Copyright: 2006 Andreas Herz. All rights reserved.
Created: 5.11.2006 by Andreas Herz (Web: http://www.freegroup.de )
LICENSE: LGPL
**/

draw2d.TableModel=function(){draw2d.AbstractObjectModel.call(this);this.name="default";this.pos=new draw2d.Point(42,42);this.fields=new draw2d.ArrayList();this.keys=new draw2d.ArrayList();};draw2d.TableModel.EVENT_FIELD_ADDED="field added";draw2d.TableModel.EVENT_KEY_ADDED="key added";draw2d.TableModel.EVENT_NAME_CHANGED="name changed";draw2d.TableModel.EVENT_POSITION_CHANGED="position changed";draw2d.TableModel.prototype=new draw2d.AbstractObjectModel();draw2d.TableModel.prototype.type="draw2d.TableModel";draw2d.TableModel.prototype.setName=function(name){var save=this.name;this.name=name;this.firePropertyChange(draw2d.TableModel.EVENT_NAME_CHANGED,save,this.name);};draw2d.TableModel.prototype.getName=function(){return this.name;};draw2d.TableModel.prototype.setPosition=function(xPos,yPos){var save=this.pos;if(save.x==xPos&&save.y==yPos){return;}this.pos=new draw2d.Point(xPos,yPos);this.firePropertyChange(draw2d.TableModel.EVENT_POSITION_CHANGED,save,this.pos);};draw2d.TableModel.prototype.getPosition=function(){return this.pos;};draw2d.TableModel.prototype.getForeignKeyModels=function(){return this.keys;};draw2d.TableModel.prototype.addForeignKeyModel=function(key){if(!(key instanceof draw2d.ForeignKeyModel)){throw "Invalid parameter type in [TableModel.prototype.addForeignKeyModel]";}if(this.keys.indexOf(key)==-1){this.keys.add(key);key.setModelParent(this);this.firePropertyChange(draw2d.TableModel.EVENT_KEY_ADDED,null,key);}};draw2d.TableModel.prototype.getFieldModels=function(){return this.fields;};draw2d.TableModel.prototype.addFieldModel=function(_175){if(!(_175 instanceof draw2d.FieldModel)){throw "Invalid parameter type in [TableModel.prototype.addFieldModel]";}if(this.fields.indexOf(_175)==-1){this.fields.add(_175);_175.setModelParent(this);this.firePropertyChange(draw2d.TableModel.EVENT_FIELD_ADDED,null,_175);}};draw2d.TableModel.prototype.getDatabaseModel=function(){return this.getModelParent().getDatabaseModel();};draw2d.TableModel.prototype.getPersistentAttributes=function(){var att=draw2d.AbstractObjectModel.prototype.getPersistentAttributes.call(this);att.name=this.name;att.pos=this.pos;att.fields=this.fields;return att;};