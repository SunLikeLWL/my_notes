/+-+96
‘JQuery源码解读

CSS操作\
（ 妙味讲堂 - 视频笔记）



1、实例

    // 1、q取值

<style >
    #div1{
        width: 100px;
        padding: 10px;
        border: 1px solid red;
        margin: 5px;
    }
</style>

<div id='div1'></div>
$("#div1").width();//100 width
$("#div1").innerWidth();//120 width+padding
$("#div1").outerWidth();//122 width+padding+border
$("#div1").outerWidth(true);//132 width+padding+border+margin


// 2、设置值

<style>
#div1{
    padding: 10px;
    border: 1px solid red;
    margin: 5px;
}
</style>
<div id='div1'></div>
$("#div1").width(200);// width = 200
$("#div1").innerWidth(200);// width = 200-padding
$("#div1").outerWidth(200);// width = 200-padding-border
$("#div1").outerWidth(200, true);// width = 200-padding-border-padding


// 3、原生取值和jq取值
<style>
    #div1{
    with:200px;
    padding: 10px;
    border: 1px solid red;
    margin: 5px;
    display:none;
}
</style>

$("#div1").get(0).offsetWidth();//0 隐藏内容默认为0
$("#div1").width();// 200 隐藏内容也能正常获取尺寸值




2、源码实现


$(function () {
    var iframe, getStyles, curCSS,
        ralpha = /alpha\([^)]*\)/i,
        ropacity = /opacity\s*=\s*([^)]*)/,
        rposition = /^(top|right|bottom|left)$/,
        // swappable if display is none or starts with table except "table", "table-cell", or "table-caption"
        // see here for display values: https://developer.mozilla.org/en-US/docs/CSS/display
        rdisplayswap = /^(none|table(?!-c[ea]).+)/,
        rmargin = /^margin/,
        rnumsplit = new RegExp("^(" + core_pnum + ")(.*)$", "i"),
        rnumnonpx = new RegExp("^(" + core_pnum + ")(?!px)[a-z%]+$", "i"),
        rrelNum = new RegExp("^([+-])=(" + core_pnum + ")", "i"),
        elemdisplay = { BODY: "block" },

        cssShow = { position: "absolute", visibility: "hidden", display: "block" },
        cssNormalTransform = {
            letterSpacing: 0,
            fontWeight: 400
        },

        cssExpand = ["Top", "Right", "Bottom", "Left"],

        cssPrefixes = ["Webkit", "O", "Moz", "ms"];
})

rmsPrefix = /^-ms-/,
    rdashAlpha = /-([\da-z])/gi,
    function camelCase(string) {
        return string.replace(rmsPrefix, "ms-").replace(rdashAlpha, fcamelCase);
    }

// return a css property mapped to a potentially vendor prefixed property
function vendorPropName(style, name) {

    // shortcut for names that are not vendor prefixed
    if (name in style) {
        return name;
    }

    // check for vendor prefixed names
    var capName = name.charAt(0).toUpperCase() + name.slice(1),
        origName = name,
        i = cssPrefixes.length;

    while (i--) {
        name = cssPrefixes[i] + capName;
        if (name in style) {
            return name;
        }
    }

    return origName;
}

function isHidden(elem, el) {
    // isHidden might be called from jQuery#filter function;
    // in that case, element will be second argument
    elem = el || elem;
    // jQuery.contains(elem.ownerDocument, elem) 未创建元素
    return jQuery.css(elem, "display") === "none" || !jQuery.contains(elem.ownerDocument, elem);
}

function showHide(elements, show) {
    var display, elem, hidden,
        values = [],
        index = 0,
        length = elements.length;

    for (; index < length; index++) {
        elem = elements[index];
        if (!elem.style) {
            continue;
        }

        values[index] = jQuery._data(elem, "olddisplay");
        display = elem.style.display;
        if (show) {
            // Reset the inline display of this element to learn if it is
            // being hidden by cascaded rules or not
            if (!values[index] && display === "none") {
                elem.style.display = "";
            }

            // Set elements which have been overridden with display: none
            // in a stylesheet to whatever the default browser style is
            // for such an element
            //   获取display的值
            if (elem.style.display === "" && isHidden(elem)) {
                values[index] = jQuery._data(elem, "olddisplay", css_defaultDisplay(elem.nodeName));
            }
        } else {

            if (!values[index]) {
                // 是隐藏的
                hidden = isHidden(elem);
                // 
                if (display && display !== "none" || !hidden) {
                    // 保存display的值，show的时候可以获取
                    // 获取节点的类型，并通过createElemt创建一个该种元素的节点，获取display的值
                    jQuery._data(elem, "olddisplay", hidden ? display : jQuery.css(elem, "display"));
                }
            }
        }
    }

    // Set the display of most of the elements in a second loop
    // to avoid the constant reflow
    for (index = 0; index < length; index++) {
        elem = elements[index];
        if (!elem.style) {
            continue;
        }
        if (!show || elem.style.display === "none" || elem.style.display === "") {
            elem.style.display = show ? values[index] || "" : "none";
        }
    }

    return elements;
}

jQuery.fn.extend({
    css: function (name, value) {
        return jQuery.access(this, function (elem, name, value) {
            var len, styles,
                map = {},
                i = 0;
            if (jQuery.isArray(name)) {
                styles = getStyles(elem);
                len = name.length;
                for (; i < len; i++) {
                    map[name[i]] = jQuery.css(elem, name[i], false, styles);
                }
                return map;
            }
            return value !== undefined ?
                jQuery.style(elem, name, value) :
                jQuery.css(elem, name);
        }, name, value, arguments.length > 1);
    },
    show: function () {
        return showHide(this, true);
    },
    hide: function () {
        return showHide(this);
    },
    toggle: function (state) {
        if (typeof state === "boolean") {
            return state ? this.show() : this.hide();
        }
        return this.each(function () {
            if (isHidden(this)) {
                jQuery(this).show();
            } else {
                jQuery(this).hide();
            }
        });
    }
});

jQuery.extend({
    // Add in style property hooks for overriding the default
    // behavior of getting and setting a style property
    cssHooks: {
        opacity: {
            // 获取透明度的时候，如果没有设置，jq默认返回1
            get: function (elem, computed) {
                if (computed) {
                    // We should always get a number back from opacity
                    var ret = curCSS(elem, "opacity");
                    return ret === "" ? "1" : ret;
                }
            }
        }
    },

    // Don't automatically add "px" to these possibly-unitless properties
    cssNumber: {
        "columnCount": true,
        "fillOpacity": true,
        "fontWeight": true,
        "lineHeight": true,
        "opacity": true,
        "order": true,
        "orphans": true,
        "widows": true,
        "zIndex": true,
        "zoom": true
    },

    // Add in properties whose names you wish to fix before
    // setting or getting the value
    cssProps: {
        // normalize float css property
        "float": jQuery.support.cssFloat ? "cssFloat" : "styleFloat"
    },

    // Get and set the style property on a DOM Node
    // extra:获取设置值的区分
    // extra: content/padding/border/margin
    style: function (elem, name, value, extra) {
        // Don't set styles on text and comment nodes
        if (!elem || elem.nodeType === 3 || elem.nodeType === 8 || !elem.style) {
            return;
        }

        // Make sure that we're working with the right name
        var ret, type, hooks,
            //   将属性名进行转驼峰操作
            origName = jQuery.camelCase(name),
            style = elem.style;

        name = jQuery.cssProps[origName] || (jQuery.cssProps[origName] = vendorPropName(style, origName));

        // gets hook for the prefixed version
        // followed by the unprefixed version
        hooks = jQuery.cssHooks[name] || jQuery.cssHooks[origName];

        // Check if we're setting a value
        if (value !== undefined) {
            type = typeof value;

            // convert relative number strings (+= or -=) to relative numbers. #7345
            // $("div").css("width","+=100")
            if (type === "string" && (ret = rrelNum.exec(value))) {
                value = (ret[1] + 1) * ret[2] + parseFloat(jQuery.css(elem, name));
                // Fixes bug #9237
                type = "number";
            }

            // Make sure that NaN and null values aren't set. See: #7116
            if (value == null || type === "number" && isNaN(value)) {
                return;
            }

            // If a number was passed in, add 'px' to the (except for certain CSS properties)
            // 
            if (type === "number" && !jQuery.cssNumber[origName]) {
                value += "px";
            }

            // Fixes #8908, it can be done more correctly by specifing setters in cssHooks,
            // but it would mean to define eight (for every problematic property) identical functions
            // 
            if (!jQuery.support.clearCloneStyle && value === "" && name.indexOf("background") === 0) {
                style[name] = "inherit";
            }

            // If a hook was provided, use that value, otherwise just set the specified value
            if (!hooks || !("set" in hooks) || (value = hooks.set(elem, value, extra)) !== undefined) {

                // Wrapped to prevent IE from throwing errors when 'invalid' values are provided
                // Fixes bug #5509
                try {
                    style[name] = value;
                } catch (e) { }
            }

        } else {
            // If a hook was provided get the non-computed value from there
            if (hooks && "get" in hooks && (ret = hooks.get(elem, false, extra)) !== undefined) {
                return ret;
            }

            // Otherwise just get the value from the style object
            return style[name];
        }
    },

    css: function (elem, name, extra, styles) {
        // extra:获取设置值的区分
        // extra: content/padding/border/margin
        var num, val, hooks,
            origName = jQuery.camelCase(name);

        // Make sure that we're working with the right name
        name = jQuery.cssProps[origName] || (jQuery.cssProps[origName] = vendorPropName(elem.style, origName));

        // gets hook for the prefixed version
        // followed by the unprefixed version
        hooks = jQuery.cssHooks[name] || jQuery.cssHooks[origName];

        // If a hook was provided get the computed value from there
        if (hooks && "get" in hooks) {
            val = hooks.get(elem, true, extra);
        }

        // Otherwise, if a way to get the computed value exists, use that
        if (val === undefined) {
            val = curCSS(elem, name, styles);
        }

        //convert "normal" to computed value
        if (val === "normal" && name in cssNormalTransform) {
            val = cssNormalTransform[name];
        }

        // Return, converting to number if forced or a qualifier was provided and val looks numeric
        if (extra === "" || extra) {
            num = parseFloat(val);
            return extra === true || jQuery.isNumeric(num) ? num || 0 : val;
        }
        return val;
    }
});




if (window.getComputedStyle) {
    getStyles = function (elem) {
        return window.getComputedStyle(elem, null);
    };

    curCSS = function (elem, name, _computed) {
        // elem 元素
        // name 获取的属性
        // _conputed getComputyStyle 原生方法
        var width, minWidth, maxWidth,
            computed = _computed || getStyles(elem),

            // getPropertyValue is only needed for .css('filter') in IE9, see #12537
            // 兼容IE的 filter属性
            ret = computed ? computed.getPropertyValue(name) || computed[name] : undefined,
            style = elem.style;

        if (computed) {
            //   elem.ownerDocument document，一般都有document
            // 动态添加的元素，还没添加到文档就没有document
            if (ret === "" && !jQuery.contains(elem.ownerDocument, elem)) {
                ret = jQuery.style(elem, name);
            }

            // A tribute to the "awesome hack by Dean Edwards"
            // Chrome < 17 and Safari 5.0 uses "computed value" instead of "used value" for margin-right
            // Safari 5.1.7 (at least) returns percentage for a larger set of values, but width seems to be reliably pixels
            // this is against the CSSOM draft spec: http://dev.w3.org/csswg/cssom/#resolved-values

            //  rmargin = /^margin/,
            // 匹配margin
            // rnumnonpx
            //  rnumnonpx = new RegExp("^(" + core_pnum + ")(?!px)[a-z%]+$", "i"),
            // 匹配的是百分比的
            if (rnumnonpx.test(ret) && rmargin.test(name)) {

                // Remember the original values
                width = style.width;
                minWidth = style.minWidth;
                maxWidth = style.maxWidth;

                // Put in the new values to get a computed value out
                style.minWidth = style.maxWidth = style.width = ret;
                // 获取像素值
                ret = computed.width;

                // Revert the changed values
                style.width = width;
                style.minWidth = minWidth;
                style.maxWidth = maxWidth;
            }
        }

        return ret;
    };
} else if (document.documentElement.currentStyle) {
    getStyles = function (elem) {
        return elem.currentStyle;
    };

    curCSS = function (elem, name, _computed) {
        var left, rs, rsLeft,
            computed = _computed || getStyles(elem),
            ret = computed ? computed[name] : undefined,
            style = elem.style;

        // Avoid setting ret to empty string here
        // so we don't default to auto
        if (ret == null && style && style[name]) {
            ret = style[name];
        }

        // From the awesome hack by Dean Edwards
        // http://erik.eae.net/archives/2007/07/27/18.54.15/#comment-102291

        // If we're not dealing with a regular pixel number
        // but a number that has a weird ending, we need to convert it to pixels
        // but not position css attributes, as those are proportional to the parent element instead
        // and we can't measure the parent instead because it might trigger a "stacking dolls" problem
        if (rnumnonpx.test(ret) && !rposition.test(name)) {

            // Remember the original values
            left = style.left;
            rs = elem.runtimeStyle;
            rsLeft = rs && rs.left;

            // Put in the new values to get a computed value out
            if (rsLeft) {
                rs.left = elem.currentStyle.left;
            }
            style.left = name === "fontSize" ? "1em" : ret;
            ret = style.pixelLeft + "px";

            // Revert the changed values
            style.left = left;
            if (rsLeft) {
                rs.left = rsLeft;
            }
        }

        return ret === "" ? "auto" : ret;
    };
}



// Try to determine the default display value of an element
function css_defaultDisplay(nodeName) {
    var doc = document,
        display = elemdisplay[nodeName];
    //  不是body节点
    if (!display) {
        display = actualDisplay(nodeName, doc);

        // If the simple way fails, read from inside an iframe
        if (display === "none" || !display) {
            // Use the already-created iframe if possible
            iframe = (iframe ||
                jQuery("<iframe frameborder='0' width='0' height='0'/>")
                    .css("cssText", "display:block !important")
            ).appendTo(doc.documentElement);

            // Always write a new HTML skeleton so Webkit and Firefox don't choke on reuse
            doc = (iframe[0].contentWindow || iframe[0].contentDocument).document;
            doc.write("<!doctype html><html><body>");
            doc.close();

            display = actualDisplay(nodeName, doc);
            iframe.detach();
        }

        // Store the correct default display
        elemdisplay[nodeName] = display;
    }

    return display;
}

// Called ONLY from within css_defaultDisplay
function actualDisplay(name, doc) {
    // 创建一个该节点类型的元素并添加到body
    // 获取该节点类型display的值
    var elem = jQuery(doc.createElement(name)).appendTo(doc.body),
        display = jQuery.css(elem[0], "display");
    // 移除该创建的节点
    elem.remove();
    // 返回display的值
    return display;
}



function setPositiveNumber( elem, value, subtract ) {
	var matches = rnumsplit.exec( value );
	return matches ?
		// Guard against undefined "subtract", e.g., when used as in cssHooks
		Math.max( 0, matches[ 1 ] - ( subtract || 0 ) ) + ( matches[ 2 ] || "px" ) :
		value;
}

function augmentWidthOrHeight( elem, name, extra, isBorderBox, styles ) {
	var i = extra === ( isBorderBox ? "border" : "content" ) ?
		// If we already have the right measurement, avoid augmentation
		4 :
		// Otherwise initialize for horizontal or vertical properties
		name === "width" ? 1 : 0,

		val = 0;

	for ( ; i < 4; i += 2 ) {
		// both box models exclude margin, so add it if we want it
		if ( extra === "margin" ) {
			val += jQuery.css( elem, extra + cssExpand[ i ], true, styles );
		}

		if ( isBorderBox ) {
			// border-box includes padding, so remove it if we want content
			if ( extra === "content" ) {
				val -= jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );
			}

			// at this point, extra isn't border nor margin, so remove border
			if ( extra !== "margin" ) {
				val -= jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
			}
		} else {
			// at this point, extra isn't content, so add padding
			val += jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );

			// at this point, extra isn't content nor padding, so add border
			if ( extra !== "padding" ) {
				val += jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
			}
		}
	}

	return val;
}

function getWidthOrHeight( elem, name, extra ) {

	// Start with offset property, which is equivalent to the border-box value
	var valueIsBorderBox = true,
		val = name === "width" ? elem.offsetWidth : elem.offsetHeight,
        styles = getStyles( elem ),
        // boxSizing 检查盒模型
		isBorderBox = jQuery.support.boxSizing && jQuery.css( elem, "boxSizing", false, styles ) === "border-box";

	// some non-html elements return undefined for offsetWidth, so check for null/undefined
	// svg - https://bugzilla.mozilla.org/show_bug.cgi?id=649285
	// MathML - https://bugzilla.mozilla.org/show_bug.cgi?id=491668
	if ( val <= 0 || val == null ) {
		// Fall back to computed then uncomputed css if necessary
		val = curCSS( elem, name, styles );
		if ( val < 0 || val == null ) {
			val = elem.style[ name ];
		}

		// Computed unit is not pixels. Stop here and return.
		if ( rnumnonpx.test(val) ) {
			return val;
		}

		// we need the check for style in case a browser which returns unreliable values
		// for getComputedStyle silently falls back to the reliable elem.style
		valueIsBorderBox = isBorderBox && ( jQuery.support.boxSizingReliable || val === elem.style[ name ] );

		// Normalize "", auto, and prepare for extra
		val = parseFloat( val ) || 0;
	}

	// use the active box-sizing model to add/subtract irrelevant styles
	return ( val +
		augmentWidthOrHeight(
			elem,
			name,
			extra || ( isBorderBox ? "border" : "content" ),
			valueIsBorderBox,
			styles
		)
	) + "px";
}


function getWindow( elem ) {
	return jQuery.isWindow( elem ) ?
		elem :
		elem.nodeType === 9 ?
			elem.defaultView || elem.parentWindow :
			false;
}


jQuery.each( { Height: "height", Width: "width" }, function( name, type ) {

	jQuery.each( { padding: "inner" + name, content: type, "": "outer" + name }, function( defaultExtra, funcName ) {
		// margin is only for outerHeight, outerWidth
		jQuery.fn[ funcName ] = function( margin, value ) {
			var chainable = arguments.length && ( defaultExtra || typeof margin !== "boolean" ),
				extra = defaultExtra || ( margin === true || value === true ? "margin" : "border" );

			return jQuery.access( this, function( elem, type, value ) {
				var doc;
                
                // window的狂傲
				if ( jQuery.isWindow( elem ) ) {
					// As of 5/8/2012 this will yield incorrect results for Mobile Safari, but there
					// isn't a whole lot we can do. See pull request at this URL for discussion:
					// https://github.com/jquery/jquery/pull/764
					return elem.document.documentElement[ "client" + name ];
				}

				// Get document width or height
				if ( elem.nodeType === 9 ) {
					doc = elem.documentElement;

					// Either scroll[Width/Height] or offset[Width/Height] or client[Width/Height], whichever is greatest
					// unfortunately, this causes bug #3838 in IE6/8 only, but there is currently no good, small way to fix it.
					return Math.max(
						elem.body[ "scroll" + name ], doc[ "scroll" + name ],
						elem.body[ "offset" + name ], doc[ "offset" + name ],
						doc[ "client" + name ]
					);
				}

				return value === undefined ?
					// Get width or height on the element, requesting but not forcing parseFloat
                    // 没值获取
                    jQuery.css( elem, type, extra ) :
                    // 有值设置
					// Set width or height on the element
					jQuery.style( elem, type, value, extra );
			}, type, chainable ? margin : undefined, chainable, null );
		};
	});
});


jQuery.each([ "height", "width" ], function( i, name ) {
	jQuery.cssHooks[ name ] = {
		get: function( elem, computed, extra ) {
			if ( computed ) {
				// certain elements can have dimension info if we invisibly show them
				// however, it must have a current display style that would benefit from this
				return elem.offsetWidth === 0 && rdisplayswap.test( jQuery.css( elem, "display" ) ) ?
                // 隐藏元素显示出来获取值后再还原 
                   jQuery.swap( elem, cssShow, function() {
						return getWidthOrHeight( elem, name, extra );
					}) :
					getWidthOrHeight( elem, name, extra );
			}
		},

		set: function( elem, value, extra ) {
			var styles = extra && getStyles( elem );
			return setPositiveNumber( elem, value, extra ?
				augmentWidthOrHeight(
					elem,
					name,
					extra,
					jQuery.support.boxSizing && jQuery.css( elem, "boxSizing", false, styles ) === "border-box",
					styles
				) : 0
			);
		}
	};
});
