function PriorityQueue(){
    var items = [];
    function QueueElement(element,priority){
        this.element = element;
        this.priority = priority;
    }
    this.enqueue = function(element,priority){
        var queueElement = new QueueElement(element,priority);
        // 如果队列是空的可以直接入队
        if(this.isEmpty()){
            items.push(queueElement);
        }
        // 队列不是空的则在队列中找到第一个比他优先级低的并插入到其前面
        else{
            var added = false;
           for(var i=0;i<items.length;i++){
               if(queueElement.priority<items[i].priority){
                   items.splice(i,0,queueElement);
                   added = true;
                   break;
                }
           }
        //    如果遍历完队列都找不到优先级比他小的就放到队列最后
           if(!added){
               items.push()
           }
        }
    }
}