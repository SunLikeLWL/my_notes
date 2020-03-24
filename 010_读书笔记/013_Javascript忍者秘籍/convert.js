// 浏览器自闭合标签

const tags = /^(area|base|br|col|embed|hr|img|input|keygen|link|menuitem|meta|param|source|track|wbr)$/i;
//　使用正则表达式匹配我们不需要关心的元素名
function convert(html) {
    //　转换函数，通过使用正则表达式将自闭合标签转为“正常”形式的标签对

    return html.replace(/(<(\w+)[^>]*?)\/>/g, (all, front, tag) => { 
        return tags.test(tag) ? all : front + "></" + tag + ">"; 
    });
} 

console.log(convert("<a/>") === "<a></a>", "Check anchor conversion."); 
console.log(convert("<hr/>") === "<hr/>", "Check hr conversion.");