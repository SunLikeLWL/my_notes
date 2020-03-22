JQuery源码解读



JQ的data（ 妙味讲堂 - 视频笔记 - 第六部分）


1、attr()方法
$("div").attr("name", "hello");
console.log($("div").attr("name")); //hello


document.getElementsById("div").setAttribute("name","hello");
document.getElementsById("div").getAttribute("name");





2、prop()方法
$("div").prop("name", "hello");
console.log($("div").prop("name")); //hello

document.getElementsById("div")["name"] = "hello"
document.getElementsById("div").getAttribute("name");





3、jquery实现的数据缓存
$("div").data("name", "hello");
console.log($("div").data("name")); //hello




源码实现：
data: function( key, value ) {
	var attrs, name,
		data = null,
		i = 0,
		elem = this[0];

	// Special expections of .data basically thwart jQuery.access,
	// so implement the relevant behavior ourselves

	// Gets all values
	if ( key === undefined ) {
		if ( this.length ) {
			data = jQuery.data( elem );

			if ( elem.nodeType === 1 && !jQuery._data( elem, "parsedAttrs" ) ) {
				attrs = elem.attributes;
				for ( ; i < attrs.length; i++ ) {
					name = attrs[i].name;

					if ( name.indexOf("data-") === 0 ) {
						name = jQuery.camelCase( name.slice(5) );

						dataAttr( elem, name, data[ name ] );
					}
				}
				jQuery._data( elem, "parsedAttrs", true );
			}
		}

		return data;
	}

	// Sets multiple values
	if ( typeof key === "object" ) {
		return this.each(function() {
			jQuery.data( this, key );
		});
	}

	return arguments.length > 1 ?

		// Sets one value
		this.each(function() {
			jQuery.data( this, key, value );
		}) :

		// Gets one value
		// Try to fetch any internally stored data first
		elem ? dataAttr( elem, key, jQuery.data( elem, key ) ) : null;
}




