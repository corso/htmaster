draw2d.Server=function(pkey,ip,state){
this.label=new draw2d.Label(ip);
this.label.setCanDrag(false);
this.label.setSelectable(false);
this.label.setBackgroundColor(new draw2d.Color(255,255,255));
this.label.setBorder(new draw2d.LineBorder());
this.req===null;
this.pkey=pkey;
this.ip=ip;
this.state=state;
if(this.state=="up"){
draw2d.ImageFigure.call(this,"Server_up.png");
}else{
draw2d.ImageFigure.call(this,"Server_down.png");
}
this.setDimension(54,60);
};
draw2d.Server.prototype=new draw2d.ImageFigure();
draw2d.Server.prototype.type="Server";
draw2d.Server.prototype.dispose=function(){
overviewWindow.removeServer(this);
this.workflow.removeFigure(this.label);
draw2d.ImageFigure.prototype.dispose.call(this);
};
draw2d.Server.prototype.isReachable=function(){
return this.state=="up";
};
draw2d.Server.prototype.createHTMLElement=function(){
var item=draw2d.ImageFigure.prototype.createHTMLElement.call(this);
item.style.width=this.width+"px";
item.style.height=this.height+"px";
item.style.margin="0px";
item.style.padding="0px";
item.style.border="0px";
return item;
};
draw2d.Server.prototype.setWorkflow=function(_2745){
draw2d.ImageFigure.prototype.setWorkflow.call(this,_2745);
if(_2745===null){
return;
}
_2745.addFigure(this.label,this.x-20,this.y-10);
};
draw2d.Server.prototype.onDragend=function(){
draw2d.ImageFigure.prototype.onDragend.call(this);
};
draw2d.Server.prototype.onDoubleClick=function(){
var value=prompt("Server IP:",this.ip);
if(value===null){
return;
}
this.ip=value;
this.updateLabel();
};
draw2d.Server.prototype.onDrag=function(){
draw2d.ImageFigure.prototype.onDrag.call(this);
this.updateLabel();
};
draw2d.Server.prototype.setPosition=function(xPos,yPos){
draw2d.ImageFigure.prototype.setPosition.call(this,xPos,yPos);
this.updateLabel();
};
draw2d.Server.prototype.updateLabel=function(){
this.label.setText(this.ip);
var xpos=this.getX()+(this.getWidth()/2)-(this.label.getWidth()/2);
this.label.setPosition(xpos,this.y-this.label.getHeight()-3);
};
