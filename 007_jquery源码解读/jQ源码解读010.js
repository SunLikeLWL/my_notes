JQuery源码解读



DOM元素节点筛选（ 妙味讲堂 - 视频笔记）


0、添加、删除、获取、包装、DOM筛选




1、实例

    // 1、find、filter、not、has、is过滤器
< body >
    <div class='box'></div>
    <div class='tip'></div>
</body >

    $("div").find(".box").css("border", "1px solid red");
// 找到带有类名为box的元素
$("div").filter(".box").css("border", "1px solid red");
// 过滤带有类名为box的元素
$("div").not(".box").css("border", "1px solid red");
// 过滤没有类名为box的元素
$("div").has(".box").css("border", "1px solid red");
// 过滤含有类名为box的元素
$("div").is(".box").css("border", "1px solid red");
// 过滤类名为box的元素


var isSimple = /^.[^:#\[\.,]*$/,

    匹配成功：.box div #div1: odd  ul li

匹配不成功： div: odd ul#li ul[title = 'Hello'] div.box  ul, li 等复杂的选择器




//2、回调函数winnow
$("div").filter(function (e, i) {
    return true; // 返回匹配的
})

$("div").filter(function () {
    return false; // 返回不匹配的
})


// 3、传入元素
$("div").filter($(".box"));
// div下包含box类名的 


// 4、find
// 对包含的元素进行操作
<ul>
    <li></li>
    <li></li>
    <li></li>
</ul>
    <ol>
        <li></li>
        <li></li>
        <li></li>
    </ol>

$("ul").find("li").css("backgroud", "red");
// ul下的li
$("ol").find("li").css("backgroud", "yellow");
// ol下的li




// 4、index
// 不区分类型，在兄弟元素中的排列序号
<body>
    <div></div>
    <div class='box'></div>
    <div></div>
</body>

$(".box").index();// 1
$("div").index(".box");// 1
// div 集合中找.box的元素


// 5、closet
// 找最近的一个祖先节点
<body class='box'>
    <div class='div1'></div>
</body>

$(".div1").closest(".box");


$(".div1").closest(".box", $("body"));
// 第二个参数表示查找的范围



//  6、add
// 讲元素添加到之前的集合之中

<body>
    <div></div>
    <span></span>
</body>

$("div").add("span").css("color", "red");



// 7、end、addBack
<body>
    <div><span></span></div>
</body>
// $("div")的时候div先进栈，find("span")的时候span进栈
$("div").find("span").end();
// 选中的是div，也就是span的上一层栈元素div
$("div").find("span").addBack();
// 选中的是div,span，也就是span和span的上一层元素div






2、源码实现



var isSimple = /^.[^:#\[\.,]*$/,
	rparentsprev = /^(?:parents|prev(?:Until|All))/,
	rneedsContext = jQuery.expr.match.needsContext,
	// methods guaranteed to produce a unique set when starting from a unique set
	guaranteedUnique = {
		children: true,
		contents: true,
		next: true,
		prev: true
	};


jQuery.fn.extend({
    find: function (selector) {
        var i,
            ret = [],
            self = this,
            len = self.length;
        // 不是字符串
        // obj.find(child)
        // obj.find($("div"))
        if (typeof selector !== "string") {
            // $("ul").find("li")
            // 循环ul
            return this.pushStack(jQuery(selector).filter(function () {
                for (i = 0; i < len; i++) {
                    if (jQuery.contains(self[i], this)) {
                        return true;
                        // ul return true;
                        // ol return false;
                    }
                }
            }));
        }
        // $("ul").find(".box")
        // find() 参数是字符串
        for (i = 0; i < len; i++) {
            // 保存到ret
            jQuery.find(selector, self[i], ret);
        }

        // Needed because $( selector, context ) becomes $( context ).find( selector )
        // unique DOM几点去重<ul><li><ul><li></li></ul></li></ul>
        // 嵌套的li会存在重复情况
        ret = this.pushStack(len > 1 ? jQuery.unique(ret) : ret);
        ret.selector = this.selector ? this.selector + " " + selector : selector;
        // 返回结果集
        return ret;
    },

    has: function (target) {
        var i,
            targets = jQuery(target, this),
            len = targets.length;

        return this.filter(function () {
            for (i = 0; i < len; i++) {
                if (jQuery.contains(this, targets[i])) {
                    return true;
                }
            }
        });
    },
    // 过滤掉 
    not: function (selector) {
        return this.pushStack(winnow(this, selector || [], true));
    },
    // 选中
    filter: function (selector) {
        return this.pushStack(winnow(this, selector || [], false));
    },

    is: function (selector) {
        return !!winnow(
            this,

            // If this is a positional/relative selector, check membership in the returned set
            // so $("p:first").is("p:last") won't return true for a doc with two "p".
            // 匹配字符串&&伪类
            typeof selector === "string" && rneedsContext.test(selector) ?
                jQuery(selector) :
                selector || [],
            false
        ).length;
    },

    closest: function (selectors, context) {
        // $(".div1").closest(".box",$("body"));
        // 第二个参数表示查找的范围
        var cur,
            i = 0,
            l = this.length,
            ret = [],
            // 伪类或者字符串的情况
            pos = rneedsContext.test(selectors) || typeof selectors !== "string" ?
                jQuery(selectors, context || this.context) :
                0;

        for (; i < l; i++) {
            // 遍历目标对象匹配条件的兄弟元素
            for (cur = this[i]; cur && cur !== context; cur = cur.parentNode) {
                // Always skip document fragments
                if (cur.nodeType < 11 && (pos ?
                    pos.index(cur) > -1 :

                    // Don't pass non-elements to Sizzle
                    cur.nodeType === 1 &&
                    jQuery.find.matchesSelector(cur, selectors))) {

                    cur = ret.push(cur);
                    break;
                }
            }
        }
        //  把去重的元素返回   
        return this.pushStack(ret.length > 1 ? jQuery.unique(ret) : ret);
    },



    // Determine the position of an element within
    // the matched set of elements
    index: function (elem) {

        // No argument, return index in parent
        if (!elem) {
            // 找不到返回-1
            // 找到目标元素返回目标元素前面所有元素的长度，就是他的下表
            return (this[0] && this[0].parentNode) ? this.first().prevAll().length : -1;
        }

        // index in selector
        // <body>div<div></div></body>
        // $("div").index();//0 div不是标签元素
        if (typeof elem === "string") {
            return jQuery.inArray(this[0], jQuery(elem));
        }

        // Locate the position of the desired element
        return jQuery.inArray(
            // If it receives a jQuery object, the first element is used
            elem.jquery ? elem[0] : elem, this);
    },

    add: function (selector, context) {
        // context 范围
        var set = typeof selector === "string" ?
            jQuery(selector, context) :
            // makeArray转为数组
            jQuery.makeArray(selector && selector.nodeType ? [selector] : selector),
            // merge数组，jq中merge还可以合并特殊对象
            all = jQuery.merge(this.get(), set);
        // 去重之后添加到栈
        return this.pushStack(jQuery.unique(all));
    },

    addBack: function (selector) {
        // 参数为空的时候，直接找到栈的下一层
        return this.add(selector == null ?
            this.prevObject : this.prevObject.filter(selector)
        );
    }
});


function sibling(cur, dir) {
    do {
        cur = cur[dir];
    } while (cur && cur.nodeType !== 1);
    // nodeType===1 文本节点    
    // 去除文本，精准定位
    return cur;
}




jQuery.each({
    // 找祖先节点
    parent: function (elem) {
        var parent = elem.parentNode;
        return parent && parent.nodeType !== 11 ? parent : null;
    },
    // 找所有祖先节点
    parents: function (elem) {
        return jQuery.dir(elem, "parentNode");
    },
    // 找祖先节点到*为止
    parentsUntil: function (elem, i, until) {
        return jQuery.dir(elem, "parentNode", until);
    },
    // 找下一个兄弟元素
    next: function (elem) {
        return sibling(elem, "nextSibling");
    },
    // 找上一个兄弟元素
    prev: function (elem) {
        return sibling(elem, "previousSibling");
    },
    // 找当前节点后面的所有兄弟节点
    nextAll: function (elem) {
        return jQuery.dir(elem, "nextSibling");
    },
    // 找当前节点前面的所有兄弟节点
    prevAll: function (elem) {
        return jQuery.dir(elem, "previousSibling");
    },
    // 找当前节点后面的所有兄弟节点直到*
    nextUntil: function (elem, i, until) {
        return jQuery.dir(elem, "nextSibling", until);
    },
      // 找当前节点前面的所有兄弟节点直到*
    prevUntil: function (elem, i, until) {
        return jQuery.dir(elem, "previousSibling", until);
    },
    // 除了当前节点外所有兄弟节点
    siblings: function (elem) {
        return jQuery.sibling((elem.parentNode || {}).firstChild, elem);
    },
    // 所有子节点不包括文本
    children: function (elem) {
        return jQuery.sibling(elem.firstChild);
    },
    // 节点的子节点，包括文本
    contents: function (elem) {
        // elem.contentDocument 对应的文档对象
        return jQuery.nodeName(elem, "iframe") ?
            elem.contentDocument || elem.contentWindow.document :
            jQuery.merge([], elem.childNodes);
    }
    // 以上都是节点方法

}, 
//  each的第二个参数
function (name, fn) {
    // 扩展fn的方法
    jQuery.fn[name] = function (until, selector) {
        // this 目标元素数组
        var ret = jQuery.map(this, fn, until);

        if (name.slice(-5) !== "Until") {
            selector = until;
        }
        // 参数是字符串
        if (selector && typeof selector === "string") {
            ret = jQuery.filter(selector, ret);
        }
        // this是多个节点
        if (this.length > 1) {
            // Remove duplicates
            // 存在重复去重
            // parent/prev存在顺序的问题
            if (!guaranteedUnique[name]) {
                // 去重并重新排序，倒序
                ret = jQuery.unique(ret);
            }

            // Reverse order for parents* and prev-derivatives
            if (rparentsprev.test(name)) {
                // 数组反转
                ret = ret.reverse();
            }
        }

        return this.pushStack(ret);
    };
});

jQuery.extend({
    filter: function (expr, elems, not) {
        var elem = elems[0];

        if (not) {
            expr = ":not(" + expr + ")";
        }
        // 复杂还是调用find，find对应的是sizzle
        return elems.length === 1 && elem.nodeType === 1 ?
            jQuery.find.matchesSelector(elem, expr) ? [elem] : [] :
            jQuery.find.matches(expr, jQuery.grep(elems, function (elem) {
                return elem.nodeType === 1;
            }));
    },

    dir: function (elem, dir, until) {
        // elem:当前要操作的每一个元素
        // dir 操作父节点还是兄弟节点
        // util 范围
        var matched = [],
            cur = elem[dir];

        while (cur && cur.nodeType !== 9 && (until === undefined || cur.nodeType !== 1 || !jQuery(cur).is(until))) {
            if (cur.nodeType === 1) {
                // 文本
                matched.push(cur);
            }
            cur = cur[dir];
        }
        return matched;
    },

    sibling: function (n, elem) {
        var r = [];
        for (; n; n = n.nextSibling) {
            // n!==elem 排除当前元素节点
            if (n.nodeType === 1 && n !== elem) {
                r.push(n);
            }
        }
        return r;
    }
});



// Implement the identical functionality for filter and not
function winnow(elements, qualifier, not) {
    // 接收函数
    if (jQuery.isFunction(qualifier)) {
        // grep 筛选函数
        return jQuery.grep(elements, function (elem, i) {
            /* jshint -W018 */
            return !!qualifier.call(elem, i, elem) !== not;
        });

    }
    // 传一个选中的节点元素
    if (qualifier.nodeType) {
        return jQuery.grep(elements, function (elem) {
            return (elem === qualifier) !== not;
        });

    }
    //  传入字符串参数
    if (typeof qualifier === "string") {
        if (isSimple.test(qualifier)) {
            return jQuery.filter(qualifier, elements, not);
        }

        qualifier = jQuery.filter(qualifier, elements);
    }

    return jQuery.grep(elements, function (elem) {
        return (jQuery.inArray(elem, qualifier) >= 0) !== not;
    });
}