/**
This notice must be untouched at all times.
This is the COMPRESSED version of Draw2D
WebSite: http://www.draw2d.org
Copyright: 2006 Andreas Herz. All rights reserved.
Created: 5.11.2006 by Andreas Herz (Web: http://www.freegroup.de )
LICENSE: LGPL
**/

draw2d.AbstractCloudNodeModel=function(id){draw2d.AbstractObjectModel.call(this);if(id!==undefined&&id!==null){this.id=id;draw2d.IdGenerator.reserve(this.id);}else{this.id=draw2d.IdGenerator.getNext();}this.connections=new draw2d.ArrayList();};draw2d.AbstractCloudNodeModel.EVENT_PROPERTY_CHANGED="property changed";draw2d.AbstractCloudNodeModel.EVENT_POSITION_CHANGED="position changed";draw2d.AbstractCloudNodeModel.prototype=new draw2d.AbstractObjectModel();draw2d.AbstractCloudNodeModel.prototype.type="draw2d.AbstractCloudNodeModel";draw2d.AbstractCloudNodeModel.prototype.setId=function(id){var save=this.id;this.id=id;this.firePropertyChange(draw2d.AbstractCloudNodeModel.EVENT_ID_CHANGED,save,this.id);};draw2d.AbstractCloudNodeModel.prototype.getId=function(){return this.id;};draw2d.AbstractCloudNodeModel.prototype.getNetworkCloudModel=function(){return this.getModelParent().getNetworkCloudModel();};draw2d.AbstractCloudNodeModel.prototype.getConnectionModels=function(){return this.connections;};draw2d.AbstractCloudNodeModel.prototype.addConnectionModel=function(_7a4){if(!(_7a4 instanceof draw2d.AbstractConnectionModel)){throw "Invalid parameter type in [AbstractCloudNodeModel.prototype.addConnectionModel]";}if(this.connections.indexOf(_7a4)===-1){this.connections.add(_7a4);_7a4.setModelParent(this);this.firePropertyChange(draw2d.AbstractObjectModel.EVENT_CONNECTION_ADDED,null,_7a4);}};draw2d.AbstractCloudNodeModel.prototype.removeConnectionModel=function(_7a5){if(!(_7a5 instanceof draw2d.AbstractConnectionModel)){throw "Invalid parameter type in [AbstractCloudNodeModel.prototype.removeConnectionModel]";}if(this.connections.remove(_7a5)!==null){_7a5.setModelParent(null);this.firePropertyChange(draw2d.AbstractObjectModel.EVENT_CONNECTION_REMOVED,_7a5,null);}};draw2d.AbstractCloudNodeModel.prototype.getPersistentAttributes=function(){var _7a6={attributes:{}};return _7a6;};