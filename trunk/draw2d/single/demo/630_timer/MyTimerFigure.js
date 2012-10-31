draw2d.MyTimerFigure=function(delay){
draw2d.Rectangle.call(this);
this.setDimension(50,50);
this.setBackgroundColor(new draw2d.Color(220,255,255));
var oThis=this;
var func=function(){
oThis.toggle();
};
this.timer=window.setInterval(func,delay);
this.highlight=false;
};
draw2d.MyTimerFigure.prototype=new draw2d.Rectangle();
draw2d.MyTimerFigure.prototype.type="MyTimerFigure";
draw2d.MyTimerFigure.prototype.dispose=function(){
draw2d.Rectangle.prototype.dispose.call(this);
window.clearInterval(this.timer);
};
draw2d.MyTimerFigure.prototype.toggle=function(){
if(this.highlight){
this.setBackgroundColor(new draw2d.Color(245,115,115));
}else{
this.setBackgroundColor(new draw2d.Color(115,245,115));
}
this.highlight=!this.highlight;
};
