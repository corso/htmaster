/* 
 * Classe que representa o elemento Tarefa
*/

//construtor que chama a ToolGeneric passando a paleta e o tipo da tarefa
draw2d.Tarefa=function(/*:draw2d.PaletteWindow*/ palette, type)
{
    this.outputPort = null;
    this.inputPort = null; 
    
    draw2d.ToolGeneric.call(this,palette,type);
    this.setDimension(24,24);
    this.type = type;   
};

//inst�ncia a ToolGeneric e add no palette
draw2d.Tarefa.prototype=new draw2d.ToolGeneric;

//esta fun��o � chamada no evento do clique na tarefa, seu objetivo � add o elemento na tela
draw2d.Tarefa.prototype.execute=function(/*:int*/ x ,/*:int*/ y)
{
    if (this.type != "caixatexto") {
        var figure = new draw2d.Rectangle(100,60,this.type);
        figure.setBackgroundColor(new draw2d.Color(255,255,255));

        // Undo/Redo support para a tarefa
        this.palette.workflow.getCommandStack().execute(new draw2d.CommandAdd(this.palette.workflow,figure,x,y));

        // ajusta a figure para o tipo que for
        if (this.type == "PreCondicao")
            figure.makePreCondicao();
        else if (this.type == "PreCondicaoL")
            figure.makePreCondicao('left');
        else if (this.type == "PreCondicaoR")
            figure.makePreCondicao('right');
        else if (this.type == "Meta")
            figure.makeMeta();
        else if (this.type == "Tarefa")
            figure.makeTarefa();
        else if (this.type == "TarefaOpcional")
            figure.makeTarefa(true);
        else if (this.type == "Operador")
            figure.makeOperador();

        // add na tela
        draw2d.ToolGeneric.prototype.execute.call(this,x,y);

        // faz o containment
        $( 'div[id*="-"]' ).draggable( {snap:true, containment: ".Workflow"});

        // seta o cursor das ports, por hora vai ficar aqui mesmo, pq não achei onde seta o id da port. By Gustavo: 03/04/2012.
        ports = document.getElementById(figure.getId()).getElementsByTagName('div');
        for (i=0; i < ports.length ;i++) {
            //impede que a linha do operador/precondicao fique com mouse = pointer, o certo é tentar setar os ids das Ports
            if (!ports[i].id.match("_operador") && !ports[i].id.match("_precondicao") && !ports[i].id.match("_card") && !ports[i].id.match("_exec"))
                ports[i].style.cursor = "pointer";
        }

        //tira o draggable da linha do operador/precondicao
        $( 'div[id*="_operador"]' ).draggable("destroy");
        $( 'div[id*="_precondicao"]' ).draggable("destroy");
        $( 'div[id*="_card"]' ).draggable("destroy");
    }
    else {
        var figure = new draw2d.Annotation("");
        figure.setSubType(this.type);

        // add na tela
        draw2d.ToolGeneric.prototype.execute.call(this,x,y);

        // Undo/Redo support para a tarefa
        this.palette.workflow.getCommandStack().execute(new draw2d.CommandAdd(this.palette.workflow,figure,x,y));
    }
};
