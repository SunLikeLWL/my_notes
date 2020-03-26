JQuery源码解读


JQ的事件绑定（ 妙味讲堂 - 视频笔记）


1、实例


// 1、普通的事件绑定
<div id = 'box'>box</div>
$("#box").on("click",{name:'sunlike'},function(ev){
    // 参数1 type 事件类型
    // 参数2 data 传入的参数
    // 参数3 fn 回调函数
     console.log(ev.data.name)
})
// 点击的时候输出sunlike


///2、事件委托delegate()
<div id = 'box'>box</div>
$("body").delegate("#box","click",function(ev){
    // 参数1 obj 实际要触发事件的节点
    // 参数2 type 事件类型
    // 参数3 fn 回调函数
     console.log(123)
})
// 点击的时候输出123
// 实际上是调用的是on
// delegate:function(seletor,types,data,fn){
//    return this.on(types,selector,data,fn)
// }


//3、事件委托on()
<div id = 'box'>box</div>
$("body").on("click","#box",{name:"sunlike"},function(ev){
    // 参数1 obj 实际要触发事件的节点
    // 参数2 type 事件类型
    // 参数3 data 传入参数
    // 参数4 fn 回调函数
     console.log(ev.data.name)
})
// 点击的时候输出sunlike


// 4、同时绑定多个事件on()
$("#box").on({
    "click", function() {
        console.log(123)
    }
    },
    {
    "mouseover", function() {
        console.log(456)
    }
})
// 鼠标移入输出456
// 点击的时候输出123

// 5、只绑定一次事件one()
<div id = 'box'>box</div>
$("#box").one("click",{name:'sunlike'},function(ev){
    // 参数1 type 事件类型
    // 参数2 data 传入的参数
    // 参数3 fn 回调函数
     console.log(ev.data.name)
})
// 点击的时候输出sunlike



// 6、trigger()主动触发事件
<input id = 'name'/>
$("#name").focus(function(){
    console.log(123)
})
$("#name").trigger("focus");
// 输出123
// 光标的的聚焦行为也会被触发




// 7、triggerHandler主动触发事件
<input id = 'name'/>
$("#name").focus(function(){
    console.log(123)
})
$("#name").triggerHandler("focus");
// 输出123
// 光标聚焦行为没有触发
// 添加了阻止默认事件和冒泡事件


// 8、trigger()主动触发自定义事件
<input id = 'name'/>
$("#name").show(function(){
    console.log(123)
})
$("#name").trigger("show");
// 输出123



// 9、实现简单的事件绑定、事件解绑

<div id = 'div1'>
	<span id = 'span1'></span>
</div>
window.onload = function(){
	let mDiv = document.getElementById("div1");
	let mSpan  =document.getElementById("span1");
	var bar = function(){
		console.log("bar");
	} 
    var foo = function(){
		console.log("foo")
	}
	add(mDiv,"show",bar);
	add(mSpan,"click",foo);

    trigger(mDiv,"show");
}
//实现
function add(obj,types,fn){
	// 将事件添加到对应的事件列表里
	// 并且给节点添加事件
	obj.listeners = obj.listeners||{};
	obj.listeners[types] = obj.listeners[types]||[];
	obj.listeners[types].push(fn);
	obj.addEventListener(types,fn,false)
}
function remove(obj,types,fn){
	// 移除节点事件
	// 并且删除事件列表里对应的事件
	obj.removeEventListener(types,fn,false);
	delete obj.listeners[types];
}
function trigger(obj,types){
	// 循环执行事件列表里面的绑定的函数
	var arr  =obj.listeners[types];
	for(var i=0;i<arr.length;i++){
		arr[i]();
	}
}
// 大量事件挂载到DOM节点可能会造成内存泄漏
// 所以jq使用data数据缓存来保存事件数据


// 10、事件缓存的结构
// 代码
<div id = 'box'>
	<span id = 'span1'></span>
</div>	
$(function(){
     $("#div").on("click",function(a){
		 console.log("普通点击事件a");
	 })
	 $("#div").on("click",function(b){
		 console.log("普通事件b")
	 })
	 $("body").on("click","#box",function(c){
		console.log("body代理事件c")
	})
	$("#div").on("click","#span1",function(d){
		console.log("div代理事件e")
	})
	$("#div").on("click.aaa",function(e){
		console.log("命名空间aaa事件")
	})
	 $("#div").on("mouseover",function(f){
		 console.log("mouseover事件")
	 })
	 $("#div").on("mouseenter",function(g){
		console.log("mouseenter事件")
	})
})
// 数据缓存结构
var elemData  = {
	events:{
		'click':[
			 // arr  有arr.length=2,arr.delegateCount = 1属性
			 // delegate 事件委托的个数
			{
				// 委托的项放到首位
				data: undefined,
				guid:3, // 当前事件的唯一标识
				handler:function(d){},// 绑定的事件的事件函数
				namespace:"",//命名空间
				needsContext: false,
				origType:"click",
				selector:'span',
				type:"click"
			},
			{
				data: undefined,
				guid:3,
				handler:function(){},
				namespace:"",
				needsContext: false,
				origType:"click",
				selector:undefined,
				type:"click"
			},
			{},
			{},
			{}
		]
		'mouseover':[
			{},
			{
				data: undefined,
				guid:3,
				handler:function(){},
				namespace:"",
				needsContext: false,
				origType:"mouseenter",// 原始类型，
				selector:undefined,
				type:"mouseover",//真正的已经模拟成mouseover
			}
		],
	     handle:function(e){
			//  真正的事件函数
		 }
	}
}


// 11、命名空间
$("#div").on("click",function(){
	// 指定一个命名空间aaa
	console.log(1);
})
$("#div").on("click.aaa",function(){
	// 指定一个命名空间aaa
    console.log(2)
})
$("#div").trigger("click.aaa");
// 只输出1，因为只触发了aaa命名空间绑定的事件



// 12、同时绑定多个事件
<div id = 'box'>
	<span id = 'span1'></span>
</div>	

$("#div").on("click mouseover",function(){
	console.log("同时给节点绑定一个click和mouseover事件");
})
// 只要用空格隔开，事件类型的个数是没有限制的


//13、pageX、pageY兼容
// 不是所有的浏览器都支持
event.pageX = original.clientX + ( doc && doc.scrollLeft || body && body.scrollLeft || 0 ) - ( doc && doc.clientLeft || body && body.clientLeft || 0 );
event.pageY = original.clientY + ( doc && doc.scrollTop  || body && body.scrollTop  || 0 ) - ( doc && doc.clientTop  || body && body.clientTop  || 0 );




// 14、keyCode
document.onkeyup(function(event){
	console.log(event.keyCode)
	console.log(event.charCode);
	// 兼容比较好的
})



源码实现

// 事件对象(构造函数)，采用的是面向对象的编程思想
jQuery.Event = function( src, props ) {
	// Allow instantiation without the 'new' keyword
	if ( !(this instanceof jQuery.Event) ) {
		return new jQuery.Event( src, props );
	}

	// Event object
	if ( src && src.type ) {
		this.originalEvent = src;
		this.type = src.type;

		// Events bubbling up the document may have been marked as prevented
		// by a handler lower down the tree; reflect the correct value.
		this.isDefaultPrevented = ( src.defaultPrevented || src.returnValue === false ||
			src.getPreventDefault && src.getPreventDefault() ) ? returnTrue : returnFalse;

	// Event type
	} else {
		this.type = src;
	}

	// Put explicitly provided properties onto the event object
	// 将属性继承到当前对象
	if ( props ) {
		jQuery.extend( this, props );
	}

	// Create a timestamp if incoming event doesn't have one
	this.timeStamp = src && src.timeStamp || jQuery.now();

	// Mark it as fixed
	// 设置缓存
	this[ jQuery.expando ] = true;
};



// 事件对象原型(构造函数)，采用的是面向对象的编程思想
jQuery.Event.prototype = {
    // 设置三个阻止事件的属性
	isDefaultPrevented: returnFalse,
	isPropagationStopped: returnFalse,
	isImmediatePropagationStopped: returnFalse,
    // 阻止冒泡事件
	preventDefault: function() {
		var e = this.originalEvent;

		this.isDefaultPrevented = returnTrue;
		if ( !e ) {
			return;
		}

		// preventDefault()函数存在
		if ( e.preventDefault ) {
			e.preventDefault();
		} else {
            // IE某些不支持preventDefault
			e.returnValue = false;
		}
    },
    // 阻止默认事件
	stopPropagation: function() {
		var e = this.originalEvent;
		this.isPropagationStopped = returnTrue;
		if ( !e ) {
			return;
		}
		//preventDefault函数存在
		if ( e.stopPropagation ) {
			e.stopPropagation();
        }
        // 兼容某些IE不支持preventDefault
		e.cancelBubble = true;
	},
	// 相同元素的其他事件会被阻止掉
	stopImmediatePropagation: function() {
		this.isImmediatePropagationStopped = returnTrue;
		this.stopPropagation();
	}
};

jQuery.event = {

	global: {},

	add: function( elem, types, handler, data, selector ) {
		var tmp, events, t, handleObjIn,
			special, eventHandle, handleObj,
			handlers, type, namespaces, origType,
			elemData = jQuery._data( elem );

		// Don't attach events to noData or text/comment nodes (but allow plain objects)
		if ( !elemData ) {
			return;
		}

		// Caller can pass in an object of custom data in lieu of the handler
		if ( handler.handler ) {
			handleObjIn = handler;
			handler = handleObjIn.handler;
			selector = handleObjIn.selector;
		}

		// Make sure that the handler has a unique ID, used to find/remove it later
		if ( !handler.guid ) {
			handler.guid = jQuery.guid++;
		}

		// Init the element's event structure and main handler, if this is the first
		if ( !(events = elemData.events) ) {
			events = elemData.events = {};
		}
		if ( !(eventHandle = elemData.handle) ) {
			eventHandle = elemData.handle = function( e ) {
				// Discard the second event of a jQuery.event.trigger() and
				// when an event is called after a page has unloaded
				return typeof jQuery !== core_strundefined && (!e || jQuery.event.triggered !== e.type) ?
					jQuery.event.dispatch.apply( eventHandle.elem, arguments ) :
					undefined;
			};
			// Add elem as a property of the handle fn to prevent a memory leak with IE non-native events
			eventHandle.elem = elem;
		}

		// Handle multiple events separated by a space
		// 获取一次同时绑定了多少种类型的事件types
		types = ( types || "" ).match( core_rnotwhite ) || [""];
		t = types.length;
		// 循环把事件绑定到节点上
		while ( t-- ) {
			tmp = rtypenamespace.exec( types[t] ) || [];
			type = origType = tmp[1];
			// 对命名空间进行排序
			namespaces = ( tmp[2] || "" ).split( "." ).sort();

			// There *must* be a type, no attaching namespace-only handlers
			if ( !type ) {
				continue;
			}

			// If event changes its type, use the special event handlers for the changed type
			// 处理特殊情况的事件
			// 使用已有的事件模拟特殊事件
			special = jQuery.event.special[ type ] || {};

			// If selector defined, determine special event api type, otherwise given type
			type = ( selector ? special.delegateType : special.bindType ) || type;

			// Update special based on newly reset type
			special = jQuery.event.special[ type ] || {};

			// handleObj is passed to all event handlers
			handleObj = jQuery.extend({
				type: type,
				origType: origType,
				data: data,
				handler: handler,
				guid: handler.guid,
				selector: selector,
				needsContext: selector && jQuery.expr.match.needsContext.test( selector ),
				namespace: namespaces.join(".")
			}, handleObjIn );

			// Init the event handler queue if we're the first
			if ( !(handlers = events[ type ]) ) {
				handlers = events[ type ] = [];
				handlers.delegateCount = 0;

				// Only use addEventListener/attachEvent if the special events handler returns false
				if ( !special.setup || special.setup.call( elem, data, namespaces, eventHandle ) === false ) {
					// 真正绑定事件的地方
					if ( elem.addEventListener ) {
						// false: 默认冒泡事件
						elem.addEventListener( type, eventHandle, false );
					} else if ( elem.attachEvent ) {
						// 兼容IE不支持addEventListener的事件绑定
						elem.attachEvent( "on" + type, eventHandle );
					}
				}
			}
             
			if ( special.add ) {
				// 添加事件
				special.add.call( elem, handleObj );
                // 不存在guid就添加一个事件id
				if ( !handleObj.handler.guid ) {
					handleObj.handler.guid = handler.guid;
				}
			}

			// Add to the element's handler list, delegates in front
			if ( selector ) {
				handlers.splice( handlers.delegateCount++, 0, handleObj );
			} else {
				handlers.push( handleObj );
			}

			// Keep track of which events have ever been used, for event optimization
			jQuery.event.global[ type ] = true;
		}

		// Nullify elem to prevent memory leaks in IE
		// 防止IE内存泄漏，讲元素置空
		elem = null;
	},

	// Detach an event or set of events from an element
	remove: function( elem, types, handler, selector, mappedTypes ) {
		var j, handleObj, tmp,
			origCount, t, events,
			special, handlers, type,
			namespaces, origType,
			elemData = jQuery.hasData( elem ) && jQuery._data( elem );

		if ( !elemData || !(events = elemData.events) ) {
			return;
		}

		// Once for each type.namespace in types; type may be omitted
		types = ( types || "" ).match( core_rnotwhite ) || [""];
		t = types.length;
		// off("click.aaa") off(".aaa") off();
		// 考虑命名空间的兼容问题
  		while ( t-- ) {
			tmp = rtypenamespace.exec( types[t] ) || [];
			type = origType = tmp[1];
			namespaces = ( tmp[2] || "" ).split( "." ).sort();

			// Unbind all events (on this namespace, if provided) for the element
			if ( !type ) {
				for ( type in events ) {
					jQuery.event.remove( elem, type + types[ t ], handler, selector, true );
				}
				continue;
			}

			special = jQuery.event.special[ type ] || {};
			type = ( selector ? special.delegateType : special.bindType ) || type;
			handlers = events[ type ] || [];
			tmp = tmp[2] && new RegExp( "(^|\\.)" + namespaces.join("\\.(?:.*\\.|)") + "(\\.|$)" );

			// Remove matching events
			origCount = j = handlers.length;
			// 
			while ( j-- ) {
				handleObj = handlers[ j ];

				if ( ( mappedTypes || origType === handleObj.origType ) &&
					( !handler || handler.guid === handleObj.guid ) &&
					( !tmp || tmp.test( handleObj.namespace ) ) &&
					( !selector || selector === handleObj.selector || selector === "**" && handleObj.selector ) ) {
					handlers.splice( j, 1 );

					if ( handleObj.selector ) {
						handlers.delegateCount--;
					}
					if ( special.remove ) {
						special.remove.call( elem, handleObj );
					}
				}
			}

			// Remove generic event handler if we removed something and no more handlers exist
			// (avoids potential for endless recursion during removal of special event handlers)
			if ( origCount && !handlers.length ) {
				if ( !special.teardown || special.teardown.call( elem, namespaces, elemData.handle ) === false ) {
					jQuery.removeEvent( elem, type, elemData.handle );
				}

				delete events[ type ];
			}
		}

		// Remove the expando if it's no longer used
		if ( jQuery.isEmptyObject( events ) ) {
			delete elemData.handle;

			// removeData also checks for emptiness and clears the expando if empty
			// so use it instead of delete
			jQuery._removeData( elem, "events" );
		}
	},

	trigger: function( event, data, elem, onlyHandlers ) {
		var handle, ontype, cur,
			bubbleType, special, tmp, i,
			eventPath = [ elem || document ],
			type = core_hasOwn.call( event, "type" ) ? event.type : event,
			namespaces = core_hasOwn.call( event, "namespace" ) ? event.namespace.split(".") : [];

		cur = tmp = elem = elem || document;

		// Don't do events on text and comment nodes
		if ( elem.nodeType === 3 || elem.nodeType === 8 ) {
			return;
		}

		// focus/blur morphs to focusin/out; ensure we're not firing them right now
		if ( rfocusMorph.test( type + jQuery.event.triggered ) ) {
			return;
		}
        // 命名空间
		if ( type.indexOf(".") >= 0 ) {
			// Namespaced trigger; create a regexp to match event type in handle()
			namespaces = type.split(".");
			type = namespaces.shift();
			namespaces.sort();
		}
		ontype = type.indexOf(":") < 0 && "on" + type;

		// Caller can pass in a jQuery.Event object, Object, or just an event type string
		event = event[ jQuery.expando ] ?
			event :
			new jQuery.Event( type, typeof event === "object" && event );

		// Trigger bitmask: & 1 for native handlers; & 2 for jQuery (always true)
		event.isTrigger = onlyHandlers ? 2 : 3;
		event.namespace = namespaces.join(".");
		event.namespace_re = event.namespace ?
			new RegExp( "(^|\\.)" + namespaces.join("\\.(?:.*\\.|)") + "(\\.|$)" ) :
			null;

		// Clean up the event in case it is being reused
		event.result = undefined;
		// 移动端不存在事件源event.target就拿elem给移动端用
		if ( !event.target ) {
			event.target = elem;
		}

		// Clone any incoming data and prepend the event, creating the handler arg list
		data = data == null ?
			[ event ] :
			jQuery.makeArray( data, [ event ] );
        // 特殊事件处理
		// Allow special events to draw outside the lines
		special = jQuery.event.special[ type ] || {};
		if ( !onlyHandlers && special.trigger && special.trigger.apply( elem, data ) === false ) {
			return;
		}

		// Determine event propagation path in advance, per W3C events spec (#9951)
		// Bubble up to document, then to window; watch for a global ownerDocument var (#9724)
		if ( !onlyHandlers && !special.noBubble && !jQuery.isWindow( elem ) ) {

			bubbleType = special.delegateType || type;
			if ( !rfocusMorph.test( bubbleType + type ) ) {
				cur = cur.parentNode;
			}
			for ( ; cur; cur = cur.parentNode ) {
				eventPath.push( cur );
				tmp = cur;
			}

			// Only add window if we got to document (e.g., not plain obj or detached DOM)
			if ( tmp === (elem.ownerDocument || document) ) {
				eventPath.push( tmp.defaultView || tmp.parentWindow || window );
			}
		}

		// Fire handlers on the event path
		// 循环触发该节点的事件
		i = 0;
		while ( (cur = eventPath[i++]) && !event.isPropagationStopped() ) {

			event.type = i > 1 ?
				bubbleType :
				special.bindType || type;

			// jQuery handler
			handle = ( jQuery._data( cur, "events" ) || {} )[ event.type ] && jQuery._data( cur, "handle" );
			if ( handle ) {
				// 执行函数
				handle.apply( cur, data );
			}

			// Native handler
			handle = ontype && cur[ ontype ];
			if ( handle && jQuery.acceptData( cur ) && handle.apply && handle.apply( cur, data ) === false ) {
				event.preventDefault();
			}
		}
		event.type = type;

		// If nobody prevented the default action, do it now
		if ( !onlyHandlers && !event.isDefaultPrevented() ) {

			if ( (!special._default || special._default.apply( eventPath.pop(), data ) === false) &&
				jQuery.acceptData( elem ) ) {

				// Call a native DOM method on the target with the same name name as the event.
				// Can't use an .isFunction() check here because IE6/7 fails that test.
				// Don't do default actions on window, that's where global variables be (#6170)
				if ( ontype && elem[ type ] && !jQuery.isWindow( elem ) ) {

					// Don't re-trigger an onFOO event when we call its FOO() method
					tmp = elem[ ontype ];

					if ( tmp ) {
						elem[ ontype ] = null;
					}

					// Prevent re-triggering of the same event, since we already bubbled it above
					jQuery.event.triggered = type;
					try {
						elem[ type ]();
					} catch ( e ) {
						// IE<9 dies on focus/blur to hidden element (#1486,#12518)
						// only reproducible on winXP IE8 native, not IE9 in IE8 mode
					}
					jQuery.event.triggered = undefined;

					if ( tmp ) {
						elem[ ontype ] = tmp;
					}
				}
			}
		}

		return event.result;
	},

	dispatch: function( event ) {
		// 真正事件处理的后继函数
		// 分发事件具体操作
		// Make a writable jQuery.Event from the native event object
		event = jQuery.event.fix( event );

		var i, ret, handleObj, matched, j,
			handlerQueue = [],
			args = core_slice.call( arguments ),
			handlers = ( jQuery._data( this, "events" ) || {} )[ event.type ] || [],
			special = jQuery.event.special[ event.type ] || {};

		// Use the fix-ed jQuery.Event rather than the (read-only) native event
		args[0] = event;
		event.delegateTarget = this;

		// Call the preDispatch hook for the mapped type, and let it bail if desired
		// 事件触发前触发
		if ( special.preDispatch && special.preDispatch.call( this, event ) === false ) {
			return;
		}

		// Determine handlers
		// 事件队列处理
		handlerQueue = jQuery.event.handlers.call( this, event, handlers );

		// Run delegates first; they may want to stop propagation beneath us
		i = 0;
		while ( (matched = handlerQueue[ i++ ]) && !event.isPropagationStopped() ) {
			event.currentTarget = matched.elem;

			j = 0;
			while ( (handleObj = matched.handlers[ j++ ]) && !event.isImmediatePropagationStopped() ) {

				// Triggered event must either 1) have no namespace, or
				// 2) have namespace(s) a subset or equal to those in the bound event (both can have no namespace).
				if ( !event.namespace_re || event.namespace_re.test( handleObj.namespace ) ) {

					event.handleObj = handleObj;
					event.data = handleObj.data;
                    //  找到对应的回调
					ret = ( (jQuery.event.special[ handleObj.origType ] || {}).handle || handleObj.handler )
							.apply( matched.elem, args );

					if ( ret !== undefined ) {
						// 阻止冒泡和默认
						if ( (event.result = ret) === false ) {
							event.preventDefault();
							event.stopPropagation();
						}
					}
				}
			}
		}

		// Call the postDispatch hook for the mapped type
		// 事件触发后触发
		if ( special.postDispatch ) {
			// 执行之后的特殊处理
			special.postDispatch.call( this, event );
		}
        // 返回执行结果
		return event.result;
	},

	handlers: function( event, handlers ) {
		// 处理事件队列顺序
		// 委托，层级越深，执行越早
		var sel, handleObj, matches, i,
			handlerQueue = [],
			delegateCount = handlers.delegateCount,
			cur = event.target;

		// Find delegate handlers
		// Black-hole SVG <use> instance trees (#13180)
		// Avoid non-left-click bubbling in Firefox (#3861)
		if ( delegateCount && cur.nodeType && (!event.button || event.type !== "click") ) {

			/* jshint eqeqeq: false */
			for ( ; cur != this; cur = cur.parentNode || this ) {
				/* jshint eqeqeq: true */

				// Don't check non-elements (#13208)
				// Don't process clicks on disabled elements (#6911, #8165, #11382, #11764)
				if ( cur.nodeType === 1 && (cur.disabled !== true || event.type !== "click") ) {
					matches = [];
					for ( i = 0; i < delegateCount; i++ ) {
						handleObj = handlers[ i ];

						// Don't conflict with Object.prototype properties (#13203)
						sel = handleObj.selector + " ";

						if ( matches[ sel ] === undefined ) {
							matches[ sel ] = handleObj.needsContext ?
								jQuery( sel, this ).index( cur ) >= 0 :
								jQuery.find( sel, this, null, [ cur ] ).length;
						}
						if ( matches[ sel ] ) {
							matches.push( handleObj );
						}
					}
					if ( matches.length ) {
						handlerQueue.push({ elem: cur, handlers: matches });
					}
				}
			}
		}

		// Add the remaining (directly-bound) handlers
		if ( delegateCount < handlers.length ) {
			handlerQueue.push({ elem: this, handlers: handlers.slice( delegateCount ) });
		}

		return handlerQueue;
	},
   
	// 对event兼容处理
	fix: function( event ) {
		// 查看是否有缓存
		// 有缓存直接返回
		if ( event[ jQuery.expando ] ) {
			return event;
		}

		// Create a writable copy of the event object and normalize some properties
		var i, prop, copy,
			type = event.type,
			originalEvent = event,
			// 检查要做兼容事件
			fixHook = this.fixHooks[ type ];

		if ( !fixHook ) {
			// 有兼容事件要处理
			// mouseHooks 鼠标事件兼容
			this.fixHooks[ type ] = fixHook =
				rmouseEvent.test( type ) ? this.mouseHooks :
				rkeyEvent.test( type ) ? this.keyHooks :
				{};
		} 
		copy = fixHook.props ? this.props.concat( fixHook.props ) : this.props;
        // 创建jq的event
		event = new jQuery.Event( originalEvent );

		i = copy.length;
		while ( i-- ) {
			prop = copy[ i ];
			event[ prop ] = originalEvent[ prop ];
		}

		// Support: IE<9
		// Fix target property (#1925)
		if ( !event.target ) {
			event.target = originalEvent.srcElement || document;
		}

		// Support: Chrome 23+, Safari?
		// Target should not be a text node (#504, #13143)
		if ( event.target.nodeType === 3 ) {
			event.target = event.target.parentNode;
		}

		// Support: IE<9
		// For mouse/key events, metaKey==false if it's undefined (#3368, #11328)
		event.metaKey = !!event.metaKey;
        // 转为兼容的事件
		return fixHook.filter ? fixHook.filter( event, originalEvent ) : event;
	},

	// Includes some event props shared by KeyEvent and MouseEvent
	props: "altKey bubbles cancelable ctrlKey currentTarget eventPhase"+
	 " metaKey relatedTarget shiftKey target timeStamp view which".split(" "),

	fixHooks: {},

	keyHooks: {
		props: "char charCode key keyCode".split(" "),
		filter: function( event, original ) {
			// Add which for key events
			// 低版本witch不支持
            // charCode不存在就用keyCode，不断降级
			if ( event.which == null ) {
				event.which = original.charCode != null ? original.charCode : original.keyCode;
			}

			return event;
		}
	},

	mouseHooks: {
		props: "button buttons clientX clientY fromElement "+
		"offsetX offsetY pageY screenX screenY toElement".split(" "),
		// event：jq对象
		// orginal：原生对象
		filter: function( event, original ) {
			var body, eventDoc, doc,
				button = original.button,
				fromElement = original.fromElement;

			// Calculate pageX/Y if missing and clientX/Y available
			// 配置pageX,pageY的兼容性，低版本IE不支持
			if ( event.pageX == null && original.clientX != null ) {
				eventDoc = event.target.ownerDocument || document;
				doc = eventDoc.documentElement;
				body = eventDoc.body;
				// clientX、clientY目标位置距离当前body可视区域的x、y坐标
				// scrollLeft、scrollTop滚动超出可视区域的x轴和y轴的偏移量
				// clientLeft、clientTop元素border的宽度
				// 超出可视部分+可视部分距离顶部-边框
				event.pageX = original.clientX + ( doc && doc.scrollLeft || body && body.scrollLeft || 0 ) - ( doc && doc.clientLeft || body && body.clientLeft || 0 );
				event.pageY = original.clientY + ( doc && doc.scrollTop  || body && body.scrollTop  || 0 ) - ( doc && doc.clientTop  || body && body.clientTop  || 0 );
			}

			// Add relatedTarget, if necessary
			if ( !event.relatedTarget && fromElement ) {
				event.relatedTarget = fromElement === event.target ? original.toElement : fromElement;
			}

			// Add which for click: 1 === left; 2 === middle; 3 === right
			// Note: button is not normalized, so don't use it
			if ( !event.which && button !== undefined ) {
				event.which = ( button & 1 ? 1 : ( button & 2 ? 3 : ( button & 4 ? 2 : 0 ) ) );
			}

			return event;
		}
	},

	special: {
		load: {
			// Prevent triggered image.load events from bubbling to window.load
			// 没有冒泡
			// window.load
			// img.load 不允许冒泡
			noBubble: true
		},
		focus: {
			// Fire native event if possible so blur/focus sequence is correct
			trigger: function() {
				if ( this !== safeActiveElement() && this.focus ) {
					try {
						this.focus();
						return false;
					} catch ( e ) {
						// Support: IE<9
						// If we error on focus to hidden element (#1486, #12518),
						// let .trigger() run the handlers
					}
				}
			},
			// 委托的时候不支持光标事件，就模拟实现
			delegateType: "focusin"
		},
		blur: {
			trigger: function() {
				if ( this === safeActiveElement() && this.blur ) {
					this.blur();
					return false;
				}
			},
			delegateType: "focusout"
		},
		click: {
			// For checkbox, fire native event so checked state will be right
			trigger: function() {
				// 当元素是复选框的时候，触发点击事件的时候起效默认事件
				if ( jQuery.nodeName( this, "input" ) && this.type === "checkbox" && this.click ) {
					this.click();
					return false;
				}
			},

			// For cross-browser consistency, don't fire native .click() on links
			// 针对a标签的时候阻止默认行为，不跳转
			_default: function( event ) {
				return jQuery.nodeName( event.target, "a" );
			}
		},

		beforeunload: {
			// 事件执行结束
			postDispatch: function( event ) {

				// Even when returnValue equals to undefined Firefox will still show alert
				if ( event.result !== undefined ) {
					// 火狐下不设置这个值就不会有提示弹框
					event.originalEvent.returnValue = event.result;
				}
			}
		}
	},
	
	// 事件模拟
	simulate: function( type, elem, event, bubble ) {
		// Piggyback on a donor event to simulate a different one.
		// Fake originalEvent to avoid donor's stopPropagation, but if the
		// simulated event prevents default then we do the same on the donor.
		// 模拟事件操作（自定义事件）trigger、dispatch
		var e = jQuery.extend(
			new jQuery.Event(),
			event,
			{
				type: type,
				isSimulated: true,
				originalEvent: {}
			}
		);
		if ( bubble ) {
			// 支持冒泡
			jQuery.event.trigger( e, null, elem );
		} else {
			// 不支持冒泡
			jQuery.event.dispatch.call( elem, e );
		}
		if ( e.isDefaultPrevented() ) {
			// 
			event.preventDefault();
		}
	}
};


// 暴露在外的实例函数
jQuery.fn.extend({
	on: function( types, selector, data, fn, /*INTERNAL*/ one ) {
		var type, origFn;
		// Types can be a map of types/handlers
		if ( typeof types === "object" ) {
			// ( types-Object, selector, data )
			if ( typeof selector !== "string" ) {
				// ( types-Object, data )
				data = data || selector;
				selector = undefined;
			}
			for ( type in types ) {
				this.on( type, selector, data, types[ type ], one );
			}
			return this;
		}

		if ( data == null && fn == null ) {
			// ( types, fn )
			fn = selector;
			data = selector = undefined;
		} else if ( fn == null ) {
			if ( typeof selector === "string" ) {
				// ( types, selector, fn )
				fn = data;
				data = undefined;
			} else {
				// ( types, data, fn )
				fn = data;
				data = selector;
				selector = undefined;
			}
		}
		if ( fn === false ) {
			fn = returnFalse;
		} else if ( !fn ) {
			return this;
		}
        // one()事件绑定一次性事件
		if ( one === 1 ) {
			origFn = fn;
			fn = function( event ) {
				// 先把事件取消掉，再另外触发事件
				jQuery().off( event );
				return origFn.apply( this, arguments );
			};
            // Use same guid so caller can remove using origFn
            // 添加函数唯一标识，当方便移除函数
			fn.guid = origFn.guid || ( origFn.guid = jQuery.guid++ );
        }
        // 把事件列表使用add()函数进行进步一处理
		return this.each( function() {
			jQuery.event.add( this, types, fn, data, selector );
		});
	},
	one: function( types, selector, data, fn ) {
		return this.on( types, selector, data, fn, 1 );
	},
	off: function( types, selector, fn ) {
		var handleObj, type;
		if ( types && types.preventDefault && types.handleObj ) {
			// ( event )  dispatched jQuery.Event
			handleObj = types.handleObj;
			jQuery( types.delegateTarget ).off(
				handleObj.namespace ? handleObj.origType + "." + handleObj.namespace : handleObj.origType,
				handleObj.selector,
				handleObj.handler
			);
			return this;
		}
		if ( typeof types === "object" ) {
			// ( types-object [, selector] )
			for ( type in types ) {
				this.off( type, selector, types[ type ] );
			}
			return this;
		}
		if ( selector === false || typeof selector === "function" ) {
			// ( types [, fn] )
			fn = selector;
			selector = undefined;
		}
		if ( fn === false ) {
			fn = returnFalse;
        }
        // 对所有事件执行remove操作
		return this.each(function() {
			jQuery.event.remove( this, types, fn, selector );
		});
	},

	trigger: function( type, data ) {
		return this.each(function() {
			jQuery.event.trigger( type, data, this );
		});
	},
	triggerHandler: function( type, data ) {
		var elem = this[0];
		if ( elem ) {
			return jQuery.event.trigger( type, data, elem, true );
		}
	}
});


// 分别调用方法on或trigger来实现对应的时间绑定
jQuery.each( ("blur focus focusin focusout load resize scroll unload click dblclick " +
	"mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave " +
    "change select submit keydown keypress keyup error contextmenu").split(" "), 
    function( i, name ) {
	// Handle event binding
	jQuery.fn[ name ] = function( data, fn ) {
		return arguments.length > 0 ?
			this.on( name, null, data, fn ) :
			this.trigger( name );
	};
});
// 暴露在外的实例奇函数
jQuery.fn.extend({
    // hover事件
	hover: function( fnOver, fnOut ) {
		return this.mouseenter( fnOver ).mouseleave( fnOut || fnOver );
	},
    // 事件绑定
	bind: function( types, data, fn ) {
		return this.on( types, null, data, fn );
    },
    // 事件解绑
	unbind: function( types, fn ) {
		return this.off( types, null, fn );
	},
    // 事件代理
	delegate: function( selector, types, data, fn ) {
		return this.on( types, selector, data, fn );
    },
    // 取消事件代理
	undelegate: function( selector, types, fn ) {
		return arguments.length === 1 ? this.off( selector, "**" ) : this.off( types, selector || "**", fn );
	}
});