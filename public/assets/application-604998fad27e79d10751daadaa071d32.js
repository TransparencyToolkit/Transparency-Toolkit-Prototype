/*!
 * jQuery JavaScript Library v1.11.0
 * http://jquery.com/
 *
 * Includes Sizzle.js
 * http://sizzlejs.com/
 *
 * Copyright 2005, 2014 jQuery Foundation, Inc. and other contributors
 * Released under the MIT license
 * http://jquery.org/license
 *
 * Date: 2014-01-23T21:02Z
 */


(function( global, factory ) {

	if ( typeof module === "object" && typeof module.exports === "object" ) {
		// For CommonJS and CommonJS-like environments where a proper window is present,
		// execute the factory and get jQuery
		// For environments that do not inherently posses a window with a document
		// (such as Node.js), expose a jQuery-making factory as module.exports
		// This accentuates the need for the creation of a real window
		// e.g. var jQuery = require("jquery")(window);
		// See ticket #14549 for more info
		module.exports = global.document ?
			factory( global, true ) :
			function( w ) {
				if ( !w.document ) {
					throw new Error( "jQuery requires a window with a document" );
				}
				return factory( w );
			};
	} else {
		factory( global );
	}

// Pass this if window is not defined yet
}(typeof window !== "undefined" ? window : this, function( window, noGlobal ) {

// Can't do this because several apps including ASP.NET trace
// the stack via arguments.caller.callee and Firefox dies if
// you try to trace through "use strict" call chains. (#13335)
// Support: Firefox 18+
//

var deletedIds = [];

var slice = deletedIds.slice;

var concat = deletedIds.concat;

var push = deletedIds.push;

var indexOf = deletedIds.indexOf;

var class2type = {};

var toString = class2type.toString;

var hasOwn = class2type.hasOwnProperty;

var trim = "".trim;

var support = {};



var
	version = "1.11.0",

	// Define a local copy of jQuery
	jQuery = function( selector, context ) {
		// The jQuery object is actually just the init constructor 'enhanced'
		// Need init if jQuery is called (just allow error to be thrown if not included)
		return new jQuery.fn.init( selector, context );
	},

	// Make sure we trim BOM and NBSP (here's looking at you, Safari 5.0 and IE)
	rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,

	// Matches dashed string for camelizing
	rmsPrefix = /^-ms-/,
	rdashAlpha = /-([\da-z])/gi,

	// Used by jQuery.camelCase as callback to replace()
	fcamelCase = function( all, letter ) {
		return letter.toUpperCase();
	};

jQuery.fn = jQuery.prototype = {
	// The current version of jQuery being used
	jquery: version,

	constructor: jQuery,

	// Start with an empty selector
	selector: "",

	// The default length of a jQuery object is 0
	length: 0,

	toArray: function() {
		return slice.call( this );
	},

	// Get the Nth element in the matched element set OR
	// Get the whole matched element set as a clean array
	get: function( num ) {
		return num != null ?

			// Return a 'clean' array
			( num < 0 ? this[ num + this.length ] : this[ num ] ) :

			// Return just the object
			slice.call( this );
	},

	// Take an array of elements and push it onto the stack
	// (returning the new matched element set)
	pushStack: function( elems ) {

		// Build a new jQuery matched element set
		var ret = jQuery.merge( this.constructor(), elems );

		// Add the old object onto the stack (as a reference)
		ret.prevObject = this;
		ret.context = this.context;

		// Return the newly-formed element set
		return ret;
	},

	// Execute a callback for every element in the matched set.
	// (You can seed the arguments with an array of args, but this is
	// only used internally.)
	each: function( callback, args ) {
		return jQuery.each( this, callback, args );
	},

	map: function( callback ) {
		return this.pushStack( jQuery.map(this, function( elem, i ) {
			return callback.call( elem, i, elem );
		}));
	},

	slice: function() {
		return this.pushStack( slice.apply( this, arguments ) );
	},

	first: function() {
		return this.eq( 0 );
	},

	last: function() {
		return this.eq( -1 );
	},

	eq: function( i ) {
		var len = this.length,
			j = +i + ( i < 0 ? len : 0 );
		return this.pushStack( j >= 0 && j < len ? [ this[j] ] : [] );
	},

	end: function() {
		return this.prevObject || this.constructor(null);
	},

	// For internal use only.
	// Behaves like an Array's method, not like a jQuery method.
	push: push,
	sort: deletedIds.sort,
	splice: deletedIds.splice
};

jQuery.extend = jQuery.fn.extend = function() {
	var src, copyIsArray, copy, name, options, clone,
		target = arguments[0] || {},
		i = 1,
		length = arguments.length,
		deep = false;

	// Handle a deep copy situation
	if ( typeof target === "boolean" ) {
		deep = target;

		// skip the boolean and the target
		target = arguments[ i ] || {};
		i++;
	}

	// Handle case when target is a string or something (possible in deep copy)
	if ( typeof target !== "object" && !jQuery.isFunction(target) ) {
		target = {};
	}

	// extend jQuery itself if only one argument is passed
	if ( i === length ) {
		target = this;
		i--;
	}

	for ( ; i < length; i++ ) {
		// Only deal with non-null/undefined values
		if ( (options = arguments[ i ]) != null ) {
			// Extend the base object
			for ( name in options ) {
				src = target[ name ];
				copy = options[ name ];

				// Prevent never-ending loop
				if ( target === copy ) {
					continue;
				}

				// Recurse if we're merging plain objects or arrays
				if ( deep && copy && ( jQuery.isPlainObject(copy) || (copyIsArray = jQuery.isArray(copy)) ) ) {
					if ( copyIsArray ) {
						copyIsArray = false;
						clone = src && jQuery.isArray(src) ? src : [];

					} else {
						clone = src && jQuery.isPlainObject(src) ? src : {};
					}

					// Never move original objects, clone them
					target[ name ] = jQuery.extend( deep, clone, copy );

				// Don't bring in undefined values
				} else if ( copy !== undefined ) {
					target[ name ] = copy;
				}
			}
		}
	}

	// Return the modified object
	return target;
};

jQuery.extend({
	// Unique for each copy of jQuery on the page
	expando: "jQuery" + ( version + Math.random() ).replace( /\D/g, "" ),

	// Assume jQuery is ready without the ready module
	isReady: true,

	error: function( msg ) {
		throw new Error( msg );
	},

	noop: function() {},

	// See test/unit/core.js for details concerning isFunction.
	// Since version 1.3, DOM methods and functions like alert
	// aren't supported. They return false on IE (#2968).
	isFunction: function( obj ) {
		return jQuery.type(obj) === "function";
	},

	isArray: Array.isArray || function( obj ) {
		return jQuery.type(obj) === "array";
	},

	isWindow: function( obj ) {
		/* jshint eqeqeq: false */
		return obj != null && obj == obj.window;
	},

	isNumeric: function( obj ) {
		// parseFloat NaNs numeric-cast false positives (null|true|false|"")
		// ...but misinterprets leading-number strings, particularly hex literals ("0x...")
		// subtraction forces infinities to NaN
		return obj - parseFloat( obj ) >= 0;
	},

	isEmptyObject: function( obj ) {
		var name;
		for ( name in obj ) {
			return false;
		}
		return true;
	},

	isPlainObject: function( obj ) {
		var key;

		// Must be an Object.
		// Because of IE, we also have to check the presence of the constructor property.
		// Make sure that DOM nodes and window objects don't pass through, as well
		if ( !obj || jQuery.type(obj) !== "object" || obj.nodeType || jQuery.isWindow( obj ) ) {
			return false;
		}

		try {
			// Not own constructor property must be Object
			if ( obj.constructor &&
				!hasOwn.call(obj, "constructor") &&
				!hasOwn.call(obj.constructor.prototype, "isPrototypeOf") ) {
				return false;
			}
		} catch ( e ) {
			// IE8,9 Will throw exceptions on certain host objects #9897
			return false;
		}

		// Support: IE<9
		// Handle iteration over inherited properties before own properties.
		if ( support.ownLast ) {
			for ( key in obj ) {
				return hasOwn.call( obj, key );
			}
		}

		// Own properties are enumerated firstly, so to speed up,
		// if last one is own, then all properties are own.
		for ( key in obj ) {}

		return key === undefined || hasOwn.call( obj, key );
	},

	type: function( obj ) {
		if ( obj == null ) {
			return obj + "";
		}
		return typeof obj === "object" || typeof obj === "function" ?
			class2type[ toString.call(obj) ] || "object" :
			typeof obj;
	},

	// Evaluates a script in a global context
	// Workarounds based on findings by Jim Driscoll
	// http://weblogs.java.net/blog/driscoll/archive/2009/09/08/eval-javascript-global-context
	globalEval: function( data ) {
		if ( data && jQuery.trim( data ) ) {
			// We use execScript on Internet Explorer
			// We use an anonymous function so that context is window
			// rather than jQuery in Firefox
			( window.execScript || function( data ) {
				window[ "eval" ].call( window, data );
			} )( data );
		}
	},

	// Convert dashed to camelCase; used by the css and data modules
	// Microsoft forgot to hump their vendor prefix (#9572)
	camelCase: function( string ) {
		return string.replace( rmsPrefix, "ms-" ).replace( rdashAlpha, fcamelCase );
	},

	nodeName: function( elem, name ) {
		return elem.nodeName && elem.nodeName.toLowerCase() === name.toLowerCase();
	},

	// args is for internal usage only
	each: function( obj, callback, args ) {
		var value,
			i = 0,
			length = obj.length,
			isArray = isArraylike( obj );

		if ( args ) {
			if ( isArray ) {
				for ( ; i < length; i++ ) {
					value = callback.apply( obj[ i ], args );

					if ( value === false ) {
						break;
					}
				}
			} else {
				for ( i in obj ) {
					value = callback.apply( obj[ i ], args );

					if ( value === false ) {
						break;
					}
				}
			}

		// A special, fast, case for the most common use of each
		} else {
			if ( isArray ) {
				for ( ; i < length; i++ ) {
					value = callback.call( obj[ i ], i, obj[ i ] );

					if ( value === false ) {
						break;
					}
				}
			} else {
				for ( i in obj ) {
					value = callback.call( obj[ i ], i, obj[ i ] );

					if ( value === false ) {
						break;
					}
				}
			}
		}

		return obj;
	},

	// Use native String.trim function wherever possible
	trim: trim && !trim.call("\uFEFF\xA0") ?
		function( text ) {
			return text == null ?
				"" :
				trim.call( text );
		} :

		// Otherwise use our own trimming functionality
		function( text ) {
			return text == null ?
				"" :
				( text + "" ).replace( rtrim, "" );
		},

	// results is for internal usage only
	makeArray: function( arr, results ) {
		var ret = results || [];

		if ( arr != null ) {
			if ( isArraylike( Object(arr) ) ) {
				jQuery.merge( ret,
					typeof arr === "string" ?
					[ arr ] : arr
				);
			} else {
				push.call( ret, arr );
			}
		}

		return ret;
	},

	inArray: function( elem, arr, i ) {
		var len;

		if ( arr ) {
			if ( indexOf ) {
				return indexOf.call( arr, elem, i );
			}

			len = arr.length;
			i = i ? i < 0 ? Math.max( 0, len + i ) : i : 0;

			for ( ; i < len; i++ ) {
				// Skip accessing in sparse arrays
				if ( i in arr && arr[ i ] === elem ) {
					return i;
				}
			}
		}

		return -1;
	},

	merge: function( first, second ) {
		var len = +second.length,
			j = 0,
			i = first.length;

		while ( j < len ) {
			first[ i++ ] = second[ j++ ];
		}

		// Support: IE<9
		// Workaround casting of .length to NaN on otherwise arraylike objects (e.g., NodeLists)
		if ( len !== len ) {
			while ( second[j] !== undefined ) {
				first[ i++ ] = second[ j++ ];
			}
		}

		first.length = i;

		return first;
	},

	grep: function( elems, callback, invert ) {
		var callbackInverse,
			matches = [],
			i = 0,
			length = elems.length,
			callbackExpect = !invert;

		// Go through the array, only saving the items
		// that pass the validator function
		for ( ; i < length; i++ ) {
			callbackInverse = !callback( elems[ i ], i );
			if ( callbackInverse !== callbackExpect ) {
				matches.push( elems[ i ] );
			}
		}

		return matches;
	},

	// arg is for internal usage only
	map: function( elems, callback, arg ) {
		var value,
			i = 0,
			length = elems.length,
			isArray = isArraylike( elems ),
			ret = [];

		// Go through the array, translating each of the items to their new values
		if ( isArray ) {
			for ( ; i < length; i++ ) {
				value = callback( elems[ i ], i, arg );

				if ( value != null ) {
					ret.push( value );
				}
			}

		// Go through every key on the object,
		} else {
			for ( i in elems ) {
				value = callback( elems[ i ], i, arg );

				if ( value != null ) {
					ret.push( value );
				}
			}
		}

		// Flatten any nested arrays
		return concat.apply( [], ret );
	},

	// A global GUID counter for objects
	guid: 1,

	// Bind a function to a context, optionally partially applying any
	// arguments.
	proxy: function( fn, context ) {
		var args, proxy, tmp;

		if ( typeof context === "string" ) {
			tmp = fn[ context ];
			context = fn;
			fn = tmp;
		}

		// Quick check to determine if target is callable, in the spec
		// this throws a TypeError, but we will just return undefined.
		if ( !jQuery.isFunction( fn ) ) {
			return undefined;
		}

		// Simulated bind
		args = slice.call( arguments, 2 );
		proxy = function() {
			return fn.apply( context || this, args.concat( slice.call( arguments ) ) );
		};

		// Set the guid of unique handler to the same of original handler, so it can be removed
		proxy.guid = fn.guid = fn.guid || jQuery.guid++;

		return proxy;
	},

	now: function() {
		return +( new Date() );
	},

	// jQuery.support is not used in Core but other projects attach their
	// properties to it so it needs to exist.
	support: support
});

// Populate the class2type map
jQuery.each("Boolean Number String Function Array Date RegExp Object Error".split(" "), function(i, name) {
	class2type[ "[object " + name + "]" ] = name.toLowerCase();
});

function isArraylike( obj ) {
	var length = obj.length,
		type = jQuery.type( obj );

	if ( type === "function" || jQuery.isWindow( obj ) ) {
		return false;
	}

	if ( obj.nodeType === 1 && length ) {
		return true;
	}

	return type === "array" || length === 0 ||
		typeof length === "number" && length > 0 && ( length - 1 ) in obj;
}
var Sizzle =
/*!
 * Sizzle CSS Selector Engine v1.10.16
 * http://sizzlejs.com/
 *
 * Copyright 2013 jQuery Foundation, Inc. and other contributors
 * Released under the MIT license
 * http://jquery.org/license
 *
 * Date: 2014-01-13
 */
(function( window ) {

var i,
	support,
	Expr,
	getText,
	isXML,
	compile,
	outermostContext,
	sortInput,
	hasDuplicate,

	// Local document vars
	setDocument,
	document,
	docElem,
	documentIsHTML,
	rbuggyQSA,
	rbuggyMatches,
	matches,
	contains,

	// Instance-specific data
	expando = "sizzle" + -(new Date()),
	preferredDoc = window.document,
	dirruns = 0,
	done = 0,
	classCache = createCache(),
	tokenCache = createCache(),
	compilerCache = createCache(),
	sortOrder = function( a, b ) {
		if ( a === b ) {
			hasDuplicate = true;
		}
		return 0;
	},

	// General-purpose constants
	strundefined = typeof undefined,
	MAX_NEGATIVE = 1 << 31,

	// Instance methods
	hasOwn = ({}).hasOwnProperty,
	arr = [],
	pop = arr.pop,
	push_native = arr.push,
	push = arr.push,
	slice = arr.slice,
	// Use a stripped-down indexOf if we can't use a native one
	indexOf = arr.indexOf || function( elem ) {
		var i = 0,
			len = this.length;
		for ( ; i < len; i++ ) {
			if ( this[i] === elem ) {
				return i;
			}
		}
		return -1;
	},

	booleans = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",

	// Regular expressions

	// Whitespace characters http://www.w3.org/TR/css3-selectors/#whitespace
	whitespace = "[\\x20\\t\\r\\n\\f]",
	// http://www.w3.org/TR/css3-syntax/#characters
	characterEncoding = "(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+",

	// Loosely modeled on CSS identifier characters
	// An unquoted value should be a CSS identifier http://www.w3.org/TR/css3-selectors/#attribute-selectors
	// Proper syntax: http://www.w3.org/TR/CSS21/syndata.html#value-def-identifier
	identifier = characterEncoding.replace( "w", "w#" ),

	// Acceptable operators http://www.w3.org/TR/selectors/#attribute-selectors
	attributes = "\\[" + whitespace + "*(" + characterEncoding + ")" + whitespace +
		"*(?:([*^$|!~]?=)" + whitespace + "*(?:(['\"])((?:\\\\.|[^\\\\])*?)\\3|(" + identifier + ")|)|)" + whitespace + "*\\]",

	// Prefer arguments quoted,
	//   then not containing pseudos/brackets,
	//   then attribute selectors/non-parenthetical expressions,
	//   then anything else
	// These preferences are here to reduce the number of selectors
	//   needing tokenize in the PSEUDO preFilter
	pseudos = ":(" + characterEncoding + ")(?:\\(((['\"])((?:\\\\.|[^\\\\])*?)\\3|((?:\\\\.|[^\\\\()[\\]]|" + attributes.replace( 3, 8 ) + ")*)|.*)\\)|)",

	// Leading and non-escaped trailing whitespace, capturing some non-whitespace characters preceding the latter
	rtrim = new RegExp( "^" + whitespace + "+|((?:^|[^\\\\])(?:\\\\.)*)" + whitespace + "+$", "g" ),

	rcomma = new RegExp( "^" + whitespace + "*," + whitespace + "*" ),
	rcombinators = new RegExp( "^" + whitespace + "*([>+~]|" + whitespace + ")" + whitespace + "*" ),

	rattributeQuotes = new RegExp( "=" + whitespace + "*([^\\]'\"]*?)" + whitespace + "*\\]", "g" ),

	rpseudo = new RegExp( pseudos ),
	ridentifier = new RegExp( "^" + identifier + "$" ),

	matchExpr = {
		"ID": new RegExp( "^#(" + characterEncoding + ")" ),
		"CLASS": new RegExp( "^\\.(" + characterEncoding + ")" ),
		"TAG": new RegExp( "^(" + characterEncoding.replace( "w", "w*" ) + ")" ),
		"ATTR": new RegExp( "^" + attributes ),
		"PSEUDO": new RegExp( "^" + pseudos ),
		"CHILD": new RegExp( "^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + whitespace +
			"*(even|odd|(([+-]|)(\\d*)n|)" + whitespace + "*(?:([+-]|)" + whitespace +
			"*(\\d+)|))" + whitespace + "*\\)|)", "i" ),
		"bool": new RegExp( "^(?:" + booleans + ")$", "i" ),
		// For use in libraries implementing .is()
		// We use this for POS matching in `select`
		"needsContext": new RegExp( "^" + whitespace + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" +
			whitespace + "*((?:-\\d)?\\d*)" + whitespace + "*\\)|)(?=[^-]|$)", "i" )
	},

	rinputs = /^(?:input|select|textarea|button)$/i,
	rheader = /^h\d$/i,

	rnative = /^[^{]+\{\s*\[native \w/,

	// Easily-parseable/retrievable ID or TAG or CLASS selectors
	rquickExpr = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,

	rsibling = /[+~]/,
	rescape = /'|\\/g,

	// CSS escapes http://www.w3.org/TR/CSS21/syndata.html#escaped-characters
	runescape = new RegExp( "\\\\([\\da-f]{1,6}" + whitespace + "?|(" + whitespace + ")|.)", "ig" ),
	funescape = function( _, escaped, escapedWhitespace ) {
		var high = "0x" + escaped - 0x10000;
		// NaN means non-codepoint
		// Support: Firefox
		// Workaround erroneous numeric interpretation of +"0x"
		return high !== high || escapedWhitespace ?
			escaped :
			high < 0 ?
				// BMP codepoint
				String.fromCharCode( high + 0x10000 ) :
				// Supplemental Plane codepoint (surrogate pair)
				String.fromCharCode( high >> 10 | 0xD800, high & 0x3FF | 0xDC00 );
	};

// Optimize for push.apply( _, NodeList )
try {
	push.apply(
		(arr = slice.call( preferredDoc.childNodes )),
		preferredDoc.childNodes
	);
	// Support: Android<4.0
	// Detect silently failing push.apply
	arr[ preferredDoc.childNodes.length ].nodeType;
} catch ( e ) {
	push = { apply: arr.length ?

		// Leverage slice if possible
		function( target, els ) {
			push_native.apply( target, slice.call(els) );
		} :

		// Support: IE<9
		// Otherwise append directly
		function( target, els ) {
			var j = target.length,
				i = 0;
			// Can't trust NodeList.length
			while ( (target[j++] = els[i++]) ) {}
			target.length = j - 1;
		}
	};
}

function Sizzle( selector, context, results, seed ) {
	var match, elem, m, nodeType,
		// QSA vars
		i, groups, old, nid, newContext, newSelector;

	if ( ( context ? context.ownerDocument || context : preferredDoc ) !== document ) {
		setDocument( context );
	}

	context = context || document;
	results = results || [];

	if ( !selector || typeof selector !== "string" ) {
		return results;
	}

	if ( (nodeType = context.nodeType) !== 1 && nodeType !== 9 ) {
		return [];
	}

	if ( documentIsHTML && !seed ) {

		// Shortcuts
		if ( (match = rquickExpr.exec( selector )) ) {
			// Speed-up: Sizzle("#ID")
			if ( (m = match[1]) ) {
				if ( nodeType === 9 ) {
					elem = context.getElementById( m );
					// Check parentNode to catch when Blackberry 4.6 returns
					// nodes that are no longer in the document (jQuery #6963)
					if ( elem && elem.parentNode ) {
						// Handle the case where IE, Opera, and Webkit return items
						// by name instead of ID
						if ( elem.id === m ) {
							results.push( elem );
							return results;
						}
					} else {
						return results;
					}
				} else {
					// Context is not a document
					if ( context.ownerDocument && (elem = context.ownerDocument.getElementById( m )) &&
						contains( context, elem ) && elem.id === m ) {
						results.push( elem );
						return results;
					}
				}

			// Speed-up: Sizzle("TAG")
			} else if ( match[2] ) {
				push.apply( results, context.getElementsByTagName( selector ) );
				return results;

			// Speed-up: Sizzle(".CLASS")
			} else if ( (m = match[3]) && support.getElementsByClassName && context.getElementsByClassName ) {
				push.apply( results, context.getElementsByClassName( m ) );
				return results;
			}
		}

		// QSA path
		if ( support.qsa && (!rbuggyQSA || !rbuggyQSA.test( selector )) ) {
			nid = old = expando;
			newContext = context;
			newSelector = nodeType === 9 && selector;

			// qSA works strangely on Element-rooted queries
			// We can work around this by specifying an extra ID on the root
			// and working up from there (Thanks to Andrew Dupont for the technique)
			// IE 8 doesn't work on object elements
			if ( nodeType === 1 && context.nodeName.toLowerCase() !== "object" ) {
				groups = tokenize( selector );

				if ( (old = context.getAttribute("id")) ) {
					nid = old.replace( rescape, "\\$&" );
				} else {
					context.setAttribute( "id", nid );
				}
				nid = "[id='" + nid + "'] ";

				i = groups.length;
				while ( i-- ) {
					groups[i] = nid + toSelector( groups[i] );
				}
				newContext = rsibling.test( selector ) && testContext( context.parentNode ) || context;
				newSelector = groups.join(",");
			}

			if ( newSelector ) {
				try {
					push.apply( results,
						newContext.querySelectorAll( newSelector )
					);
					return results;
				} catch(qsaError) {
				} finally {
					if ( !old ) {
						context.removeAttribute("id");
					}
				}
			}
		}
	}

	// All others
	return select( selector.replace( rtrim, "$1" ), context, results, seed );
}

/**
 * Create key-value caches of limited size
 * @returns {Function(string, Object)} Returns the Object data after storing it on itself with
 *	property name the (space-suffixed) string and (if the cache is larger than Expr.cacheLength)
 *	deleting the oldest entry
 */
function createCache() {
	var keys = [];

	function cache( key, value ) {
		// Use (key + " ") to avoid collision with native prototype properties (see Issue #157)
		if ( keys.push( key + " " ) > Expr.cacheLength ) {
			// Only keep the most recent entries
			delete cache[ keys.shift() ];
		}
		return (cache[ key + " " ] = value);
	}
	return cache;
}

/**
 * Mark a function for special use by Sizzle
 * @param {Function} fn The function to mark
 */
function markFunction( fn ) {
	fn[ expando ] = true;
	return fn;
}

/**
 * Support testing using an element
 * @param {Function} fn Passed the created div and expects a boolean result
 */
function assert( fn ) {
	var div = document.createElement("div");

	try {
		return !!fn( div );
	} catch (e) {
		return false;
	} finally {
		// Remove from its parent by default
		if ( div.parentNode ) {
			div.parentNode.removeChild( div );
		}
		// release memory in IE
		div = null;
	}
}

/**
 * Adds the same handler for all of the specified attrs
 * @param {String} attrs Pipe-separated list of attributes
 * @param {Function} handler The method that will be applied
 */
function addHandle( attrs, handler ) {
	var arr = attrs.split("|"),
		i = attrs.length;

	while ( i-- ) {
		Expr.attrHandle[ arr[i] ] = handler;
	}
}

/**
 * Checks document order of two siblings
 * @param {Element} a
 * @param {Element} b
 * @returns {Number} Returns less than 0 if a precedes b, greater than 0 if a follows b
 */
function siblingCheck( a, b ) {
	var cur = b && a,
		diff = cur && a.nodeType === 1 && b.nodeType === 1 &&
			( ~b.sourceIndex || MAX_NEGATIVE ) -
			( ~a.sourceIndex || MAX_NEGATIVE );

	// Use IE sourceIndex if available on both nodes
	if ( diff ) {
		return diff;
	}

	// Check if b follows a
	if ( cur ) {
		while ( (cur = cur.nextSibling) ) {
			if ( cur === b ) {
				return -1;
			}
		}
	}

	return a ? 1 : -1;
}

/**
 * Returns a function to use in pseudos for input types
 * @param {String} type
 */
function createInputPseudo( type ) {
	return function( elem ) {
		var name = elem.nodeName.toLowerCase();
		return name === "input" && elem.type === type;
	};
}

/**
 * Returns a function to use in pseudos for buttons
 * @param {String} type
 */
function createButtonPseudo( type ) {
	return function( elem ) {
		var name = elem.nodeName.toLowerCase();
		return (name === "input" || name === "button") && elem.type === type;
	};
}

/**
 * Returns a function to use in pseudos for positionals
 * @param {Function} fn
 */
function createPositionalPseudo( fn ) {
	return markFunction(function( argument ) {
		argument = +argument;
		return markFunction(function( seed, matches ) {
			var j,
				matchIndexes = fn( [], seed.length, argument ),
				i = matchIndexes.length;

			// Match elements found at the specified indexes
			while ( i-- ) {
				if ( seed[ (j = matchIndexes[i]) ] ) {
					seed[j] = !(matches[j] = seed[j]);
				}
			}
		});
	});
}

/**
 * Checks a node for validity as a Sizzle context
 * @param {Element|Object=} context
 * @returns {Element|Object|Boolean} The input node if acceptable, otherwise a falsy value
 */
function testContext( context ) {
	return context && typeof context.getElementsByTagName !== strundefined && context;
}

// Expose support vars for convenience
support = Sizzle.support = {};

/**
 * Detects XML nodes
 * @param {Element|Object} elem An element or a document
 * @returns {Boolean} True iff elem is a non-HTML XML node
 */
isXML = Sizzle.isXML = function( elem ) {
	// documentElement is verified for cases where it doesn't yet exist
	// (such as loading iframes in IE - #4833)
	var documentElement = elem && (elem.ownerDocument || elem).documentElement;
	return documentElement ? documentElement.nodeName !== "HTML" : false;
};

/**
 * Sets document-related variables once based on the current document
 * @param {Element|Object} [doc] An element or document object to use to set the document
 * @returns {Object} Returns the current document
 */
setDocument = Sizzle.setDocument = function( node ) {
	var hasCompare,
		doc = node ? node.ownerDocument || node : preferredDoc,
		parent = doc.defaultView;

	// If no document and documentElement is available, return
	if ( doc === document || doc.nodeType !== 9 || !doc.documentElement ) {
		return document;
	}

	// Set our document
	document = doc;
	docElem = doc.documentElement;

	// Support tests
	documentIsHTML = !isXML( doc );

	// Support: IE>8
	// If iframe document is assigned to "document" variable and if iframe has been reloaded,
	// IE will throw "permission denied" error when accessing "document" variable, see jQuery #13936
	// IE6-8 do not support the defaultView property so parent will be undefined
	if ( parent && parent !== parent.top ) {
		// IE11 does not have attachEvent, so all must suffer
		if ( parent.addEventListener ) {
			parent.addEventListener( "unload", function() {
				setDocument();
			}, false );
		} else if ( parent.attachEvent ) {
			parent.attachEvent( "onunload", function() {
				setDocument();
			});
		}
	}

	/* Attributes
	---------------------------------------------------------------------- */

	// Support: IE<8
	// Verify that getAttribute really returns attributes and not properties (excepting IE8 booleans)
	support.attributes = assert(function( div ) {
		div.className = "i";
		return !div.getAttribute("className");
	});

	/* getElement(s)By*
	---------------------------------------------------------------------- */

	// Check if getElementsByTagName("*") returns only elements
	support.getElementsByTagName = assert(function( div ) {
		div.appendChild( doc.createComment("") );
		return !div.getElementsByTagName("*").length;
	});

	// Check if getElementsByClassName can be trusted
	support.getElementsByClassName = rnative.test( doc.getElementsByClassName ) && assert(function( div ) {
		div.innerHTML = "<div class='a'></div><div class='a i'></div>";

		// Support: Safari<4
		// Catch class over-caching
		div.firstChild.className = "i";
		// Support: Opera<10
		// Catch gEBCN failure to find non-leading classes
		return div.getElementsByClassName("i").length === 2;
	});

	// Support: IE<10
	// Check if getElementById returns elements by name
	// The broken getElementById methods don't pick up programatically-set names,
	// so use a roundabout getElementsByName test
	support.getById = assert(function( div ) {
		docElem.appendChild( div ).id = expando;
		return !doc.getElementsByName || !doc.getElementsByName( expando ).length;
	});

	// ID find and filter
	if ( support.getById ) {
		Expr.find["ID"] = function( id, context ) {
			if ( typeof context.getElementById !== strundefined && documentIsHTML ) {
				var m = context.getElementById( id );
				// Check parentNode to catch when Blackberry 4.6 returns
				// nodes that are no longer in the document #6963
				return m && m.parentNode ? [m] : [];
			}
		};
		Expr.filter["ID"] = function( id ) {
			var attrId = id.replace( runescape, funescape );
			return function( elem ) {
				return elem.getAttribute("id") === attrId;
			};
		};
	} else {
		// Support: IE6/7
		// getElementById is not reliable as a find shortcut
		delete Expr.find["ID"];

		Expr.filter["ID"] =  function( id ) {
			var attrId = id.replace( runescape, funescape );
			return function( elem ) {
				var node = typeof elem.getAttributeNode !== strundefined && elem.getAttributeNode("id");
				return node && node.value === attrId;
			};
		};
	}

	// Tag
	Expr.find["TAG"] = support.getElementsByTagName ?
		function( tag, context ) {
			if ( typeof context.getElementsByTagName !== strundefined ) {
				return context.getElementsByTagName( tag );
			}
		} :
		function( tag, context ) {
			var elem,
				tmp = [],
				i = 0,
				results = context.getElementsByTagName( tag );

			// Filter out possible comments
			if ( tag === "*" ) {
				while ( (elem = results[i++]) ) {
					if ( elem.nodeType === 1 ) {
						tmp.push( elem );
					}
				}

				return tmp;
			}
			return results;
		};

	// Class
	Expr.find["CLASS"] = support.getElementsByClassName && function( className, context ) {
		if ( typeof context.getElementsByClassName !== strundefined && documentIsHTML ) {
			return context.getElementsByClassName( className );
		}
	};

	/* QSA/matchesSelector
	---------------------------------------------------------------------- */

	// QSA and matchesSelector support

	// matchesSelector(:active) reports false when true (IE9/Opera 11.5)
	rbuggyMatches = [];

	// qSa(:focus) reports false when true (Chrome 21)
	// We allow this because of a bug in IE8/9 that throws an error
	// whenever `document.activeElement` is accessed on an iframe
	// So, we allow :focus to pass through QSA all the time to avoid the IE error
	// See http://bugs.jquery.com/ticket/13378
	rbuggyQSA = [];

	if ( (support.qsa = rnative.test( doc.querySelectorAll )) ) {
		// Build QSA regex
		// Regex strategy adopted from Diego Perini
		assert(function( div ) {
			// Select is set to empty string on purpose
			// This is to test IE's treatment of not explicitly
			// setting a boolean content attribute,
			// since its presence should be enough
			// http://bugs.jquery.com/ticket/12359
			div.innerHTML = "<select t=''><option selected=''></option></select>";

			// Support: IE8, Opera 10-12
			// Nothing should be selected when empty strings follow ^= or $= or *=
			if ( div.querySelectorAll("[t^='']").length ) {
				rbuggyQSA.push( "[*^$]=" + whitespace + "*(?:''|\"\")" );
			}

			// Support: IE8
			// Boolean attributes and "value" are not treated correctly
			if ( !div.querySelectorAll("[selected]").length ) {
				rbuggyQSA.push( "\\[" + whitespace + "*(?:value|" + booleans + ")" );
			}

			// Webkit/Opera - :checked should return selected option elements
			// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
			// IE8 throws error here and will not see later tests
			if ( !div.querySelectorAll(":checked").length ) {
				rbuggyQSA.push(":checked");
			}
		});

		assert(function( div ) {
			// Support: Windows 8 Native Apps
			// The type and name attributes are restricted during .innerHTML assignment
			var input = doc.createElement("input");
			input.setAttribute( "type", "hidden" );
			div.appendChild( input ).setAttribute( "name", "D" );

			// Support: IE8
			// Enforce case-sensitivity of name attribute
			if ( div.querySelectorAll("[name=d]").length ) {
				rbuggyQSA.push( "name" + whitespace + "*[*^$|!~]?=" );
			}

			// FF 3.5 - :enabled/:disabled and hidden elements (hidden elements are still enabled)
			// IE8 throws error here and will not see later tests
			if ( !div.querySelectorAll(":enabled").length ) {
				rbuggyQSA.push( ":enabled", ":disabled" );
			}

			// Opera 10-11 does not throw on post-comma invalid pseudos
			div.querySelectorAll("*,:x");
			rbuggyQSA.push(",.*:");
		});
	}

	if ( (support.matchesSelector = rnative.test( (matches = docElem.webkitMatchesSelector ||
		docElem.mozMatchesSelector ||
		docElem.oMatchesSelector ||
		docElem.msMatchesSelector) )) ) {

		assert(function( div ) {
			// Check to see if it's possible to do matchesSelector
			// on a disconnected node (IE 9)
			support.disconnectedMatch = matches.call( div, "div" );

			// This should fail with an exception
			// Gecko does not error, returns false instead
			matches.call( div, "[s!='']:x" );
			rbuggyMatches.push( "!=", pseudos );
		});
	}

	rbuggyQSA = rbuggyQSA.length && new RegExp( rbuggyQSA.join("|") );
	rbuggyMatches = rbuggyMatches.length && new RegExp( rbuggyMatches.join("|") );

	/* Contains
	---------------------------------------------------------------------- */
	hasCompare = rnative.test( docElem.compareDocumentPosition );

	// Element contains another
	// Purposefully does not implement inclusive descendent
	// As in, an element does not contain itself
	contains = hasCompare || rnative.test( docElem.contains ) ?
		function( a, b ) {
			var adown = a.nodeType === 9 ? a.documentElement : a,
				bup = b && b.parentNode;
			return a === bup || !!( bup && bup.nodeType === 1 && (
				adown.contains ?
					adown.contains( bup ) :
					a.compareDocumentPosition && a.compareDocumentPosition( bup ) & 16
			));
		} :
		function( a, b ) {
			if ( b ) {
				while ( (b = b.parentNode) ) {
					if ( b === a ) {
						return true;
					}
				}
			}
			return false;
		};

	/* Sorting
	---------------------------------------------------------------------- */

	// Document order sorting
	sortOrder = hasCompare ?
	function( a, b ) {

		// Flag for duplicate removal
		if ( a === b ) {
			hasDuplicate = true;
			return 0;
		}

		// Sort on method existence if only one input has compareDocumentPosition
		var compare = !a.compareDocumentPosition - !b.compareDocumentPosition;
		if ( compare ) {
			return compare;
		}

		// Calculate position if both inputs belong to the same document
		compare = ( a.ownerDocument || a ) === ( b.ownerDocument || b ) ?
			a.compareDocumentPosition( b ) :

			// Otherwise we know they are disconnected
			1;

		// Disconnected nodes
		if ( compare & 1 ||
			(!support.sortDetached && b.compareDocumentPosition( a ) === compare) ) {

			// Choose the first element that is related to our preferred document
			if ( a === doc || a.ownerDocument === preferredDoc && contains(preferredDoc, a) ) {
				return -1;
			}
			if ( b === doc || b.ownerDocument === preferredDoc && contains(preferredDoc, b) ) {
				return 1;
			}

			// Maintain original order
			return sortInput ?
				( indexOf.call( sortInput, a ) - indexOf.call( sortInput, b ) ) :
				0;
		}

		return compare & 4 ? -1 : 1;
	} :
	function( a, b ) {
		// Exit early if the nodes are identical
		if ( a === b ) {
			hasDuplicate = true;
			return 0;
		}

		var cur,
			i = 0,
			aup = a.parentNode,
			bup = b.parentNode,
			ap = [ a ],
			bp = [ b ];

		// Parentless nodes are either documents or disconnected
		if ( !aup || !bup ) {
			return a === doc ? -1 :
				b === doc ? 1 :
				aup ? -1 :
				bup ? 1 :
				sortInput ?
				( indexOf.call( sortInput, a ) - indexOf.call( sortInput, b ) ) :
				0;

		// If the nodes are siblings, we can do a quick check
		} else if ( aup === bup ) {
			return siblingCheck( a, b );
		}

		// Otherwise we need full lists of their ancestors for comparison
		cur = a;
		while ( (cur = cur.parentNode) ) {
			ap.unshift( cur );
		}
		cur = b;
		while ( (cur = cur.parentNode) ) {
			bp.unshift( cur );
		}

		// Walk down the tree looking for a discrepancy
		while ( ap[i] === bp[i] ) {
			i++;
		}

		return i ?
			// Do a sibling check if the nodes have a common ancestor
			siblingCheck( ap[i], bp[i] ) :

			// Otherwise nodes in our document sort first
			ap[i] === preferredDoc ? -1 :
			bp[i] === preferredDoc ? 1 :
			0;
	};

	return doc;
};

Sizzle.matches = function( expr, elements ) {
	return Sizzle( expr, null, null, elements );
};

Sizzle.matchesSelector = function( elem, expr ) {
	// Set document vars if needed
	if ( ( elem.ownerDocument || elem ) !== document ) {
		setDocument( elem );
	}

	// Make sure that attribute selectors are quoted
	expr = expr.replace( rattributeQuotes, "='$1']" );

	if ( support.matchesSelector && documentIsHTML &&
		( !rbuggyMatches || !rbuggyMatches.test( expr ) ) &&
		( !rbuggyQSA     || !rbuggyQSA.test( expr ) ) ) {

		try {
			var ret = matches.call( elem, expr );

			// IE 9's matchesSelector returns false on disconnected nodes
			if ( ret || support.disconnectedMatch ||
					// As well, disconnected nodes are said to be in a document
					// fragment in IE 9
					elem.document && elem.document.nodeType !== 11 ) {
				return ret;
			}
		} catch(e) {}
	}

	return Sizzle( expr, document, null, [elem] ).length > 0;
};

Sizzle.contains = function( context, elem ) {
	// Set document vars if needed
	if ( ( context.ownerDocument || context ) !== document ) {
		setDocument( context );
	}
	return contains( context, elem );
};

Sizzle.attr = function( elem, name ) {
	// Set document vars if needed
	if ( ( elem.ownerDocument || elem ) !== document ) {
		setDocument( elem );
	}

	var fn = Expr.attrHandle[ name.toLowerCase() ],
		// Don't get fooled by Object.prototype properties (jQuery #13807)
		val = fn && hasOwn.call( Expr.attrHandle, name.toLowerCase() ) ?
			fn( elem, name, !documentIsHTML ) :
			undefined;

	return val !== undefined ?
		val :
		support.attributes || !documentIsHTML ?
			elem.getAttribute( name ) :
			(val = elem.getAttributeNode(name)) && val.specified ?
				val.value :
				null;
};

Sizzle.error = function( msg ) {
	throw new Error( "Syntax error, unrecognized expression: " + msg );
};

/**
 * Document sorting and removing duplicates
 * @param {ArrayLike} results
 */
Sizzle.uniqueSort = function( results ) {
	var elem,
		duplicates = [],
		j = 0,
		i = 0;

	// Unless we *know* we can detect duplicates, assume their presence
	hasDuplicate = !support.detectDuplicates;
	sortInput = !support.sortStable && results.slice( 0 );
	results.sort( sortOrder );

	if ( hasDuplicate ) {
		while ( (elem = results[i++]) ) {
			if ( elem === results[ i ] ) {
				j = duplicates.push( i );
			}
		}
		while ( j-- ) {
			results.splice( duplicates[ j ], 1 );
		}
	}

	// Clear input after sorting to release objects
	// See https://github.com/jquery/sizzle/pull/225
	sortInput = null;

	return results;
};

/**
 * Utility function for retrieving the text value of an array of DOM nodes
 * @param {Array|Element} elem
 */
getText = Sizzle.getText = function( elem ) {
	var node,
		ret = "",
		i = 0,
		nodeType = elem.nodeType;

	if ( !nodeType ) {
		// If no nodeType, this is expected to be an array
		while ( (node = elem[i++]) ) {
			// Do not traverse comment nodes
			ret += getText( node );
		}
	} else if ( nodeType === 1 || nodeType === 9 || nodeType === 11 ) {
		// Use textContent for elements
		// innerText usage removed for consistency of new lines (jQuery #11153)
		if ( typeof elem.textContent === "string" ) {
			return elem.textContent;
		} else {
			// Traverse its children
			for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
				ret += getText( elem );
			}
		}
	} else if ( nodeType === 3 || nodeType === 4 ) {
		return elem.nodeValue;
	}
	// Do not include comment or processing instruction nodes

	return ret;
};

Expr = Sizzle.selectors = {

	// Can be adjusted by the user
	cacheLength: 50,

	createPseudo: markFunction,

	match: matchExpr,

	attrHandle: {},

	find: {},

	relative: {
		">": { dir: "parentNode", first: true },
		" ": { dir: "parentNode" },
		"+": { dir: "previousSibling", first: true },
		"~": { dir: "previousSibling" }
	},

	preFilter: {
		"ATTR": function( match ) {
			match[1] = match[1].replace( runescape, funescape );

			// Move the given value to match[3] whether quoted or unquoted
			match[3] = ( match[4] || match[5] || "" ).replace( runescape, funescape );

			if ( match[2] === "~=" ) {
				match[3] = " " + match[3] + " ";
			}

			return match.slice( 0, 4 );
		},

		"CHILD": function( match ) {
			/* matches from matchExpr["CHILD"]
				1 type (only|nth|...)
				2 what (child|of-type)
				3 argument (even|odd|\d*|\d*n([+-]\d+)?|...)
				4 xn-component of xn+y argument ([+-]?\d*n|)
				5 sign of xn-component
				6 x of xn-component
				7 sign of y-component
				8 y of y-component
			*/
			match[1] = match[1].toLowerCase();

			if ( match[1].slice( 0, 3 ) === "nth" ) {
				// nth-* requires argument
				if ( !match[3] ) {
					Sizzle.error( match[0] );
				}

				// numeric x and y parameters for Expr.filter.CHILD
				// remember that false/true cast respectively to 0/1
				match[4] = +( match[4] ? match[5] + (match[6] || 1) : 2 * ( match[3] === "even" || match[3] === "odd" ) );
				match[5] = +( ( match[7] + match[8] ) || match[3] === "odd" );

			// other types prohibit arguments
			} else if ( match[3] ) {
				Sizzle.error( match[0] );
			}

			return match;
		},

		"PSEUDO": function( match ) {
			var excess,
				unquoted = !match[5] && match[2];

			if ( matchExpr["CHILD"].test( match[0] ) ) {
				return null;
			}

			// Accept quoted arguments as-is
			if ( match[3] && match[4] !== undefined ) {
				match[2] = match[4];

			// Strip excess characters from unquoted arguments
			} else if ( unquoted && rpseudo.test( unquoted ) &&
				// Get excess from tokenize (recursively)
				(excess = tokenize( unquoted, true )) &&
				// advance to the next closing parenthesis
				(excess = unquoted.indexOf( ")", unquoted.length - excess ) - unquoted.length) ) {

				// excess is a negative index
				match[0] = match[0].slice( 0, excess );
				match[2] = unquoted.slice( 0, excess );
			}

			// Return only captures needed by the pseudo filter method (type and argument)
			return match.slice( 0, 3 );
		}
	},

	filter: {

		"TAG": function( nodeNameSelector ) {
			var nodeName = nodeNameSelector.replace( runescape, funescape ).toLowerCase();
			return nodeNameSelector === "*" ?
				function() { return true; } :
				function( elem ) {
					return elem.nodeName && elem.nodeName.toLowerCase() === nodeName;
				};
		},

		"CLASS": function( className ) {
			var pattern = classCache[ className + " " ];

			return pattern ||
				(pattern = new RegExp( "(^|" + whitespace + ")" + className + "(" + whitespace + "|$)" )) &&
				classCache( className, function( elem ) {
					return pattern.test( typeof elem.className === "string" && elem.className || typeof elem.getAttribute !== strundefined && elem.getAttribute("class") || "" );
				});
		},

		"ATTR": function( name, operator, check ) {
			return function( elem ) {
				var result = Sizzle.attr( elem, name );

				if ( result == null ) {
					return operator === "!=";
				}
				if ( !operator ) {
					return true;
				}

				result += "";

				return operator === "=" ? result === check :
					operator === "!=" ? result !== check :
					operator === "^=" ? check && result.indexOf( check ) === 0 :
					operator === "*=" ? check && result.indexOf( check ) > -1 :
					operator === "$=" ? check && result.slice( -check.length ) === check :
					operator === "~=" ? ( " " + result + " " ).indexOf( check ) > -1 :
					operator === "|=" ? result === check || result.slice( 0, check.length + 1 ) === check + "-" :
					false;
			};
		},

		"CHILD": function( type, what, argument, first, last ) {
			var simple = type.slice( 0, 3 ) !== "nth",
				forward = type.slice( -4 ) !== "last",
				ofType = what === "of-type";

			return first === 1 && last === 0 ?

				// Shortcut for :nth-*(n)
				function( elem ) {
					return !!elem.parentNode;
				} :

				function( elem, context, xml ) {
					var cache, outerCache, node, diff, nodeIndex, start,
						dir = simple !== forward ? "nextSibling" : "previousSibling",
						parent = elem.parentNode,
						name = ofType && elem.nodeName.toLowerCase(),
						useCache = !xml && !ofType;

					if ( parent ) {

						// :(first|last|only)-(child|of-type)
						if ( simple ) {
							while ( dir ) {
								node = elem;
								while ( (node = node[ dir ]) ) {
									if ( ofType ? node.nodeName.toLowerCase() === name : node.nodeType === 1 ) {
										return false;
									}
								}
								// Reverse direction for :only-* (if we haven't yet done so)
								start = dir = type === "only" && !start && "nextSibling";
							}
							return true;
						}

						start = [ forward ? parent.firstChild : parent.lastChild ];

						// non-xml :nth-child(...) stores cache data on `parent`
						if ( forward && useCache ) {
							// Seek `elem` from a previously-cached index
							outerCache = parent[ expando ] || (parent[ expando ] = {});
							cache = outerCache[ type ] || [];
							nodeIndex = cache[0] === dirruns && cache[1];
							diff = cache[0] === dirruns && cache[2];
							node = nodeIndex && parent.childNodes[ nodeIndex ];

							while ( (node = ++nodeIndex && node && node[ dir ] ||

								// Fallback to seeking `elem` from the start
								(diff = nodeIndex = 0) || start.pop()) ) {

								// When found, cache indexes on `parent` and break
								if ( node.nodeType === 1 && ++diff && node === elem ) {
									outerCache[ type ] = [ dirruns, nodeIndex, diff ];
									break;
								}
							}

						// Use previously-cached element index if available
						} else if ( useCache && (cache = (elem[ expando ] || (elem[ expando ] = {}))[ type ]) && cache[0] === dirruns ) {
							diff = cache[1];

						// xml :nth-child(...) or :nth-last-child(...) or :nth(-last)?-of-type(...)
						} else {
							// Use the same loop as above to seek `elem` from the start
							while ( (node = ++nodeIndex && node && node[ dir ] ||
								(diff = nodeIndex = 0) || start.pop()) ) {

								if ( ( ofType ? node.nodeName.toLowerCase() === name : node.nodeType === 1 ) && ++diff ) {
									// Cache the index of each encountered element
									if ( useCache ) {
										(node[ expando ] || (node[ expando ] = {}))[ type ] = [ dirruns, diff ];
									}

									if ( node === elem ) {
										break;
									}
								}
							}
						}

						// Incorporate the offset, then check against cycle size
						diff -= last;
						return diff === first || ( diff % first === 0 && diff / first >= 0 );
					}
				};
		},

		"PSEUDO": function( pseudo, argument ) {
			// pseudo-class names are case-insensitive
			// http://www.w3.org/TR/selectors/#pseudo-classes
			// Prioritize by case sensitivity in case custom pseudos are added with uppercase letters
			// Remember that setFilters inherits from pseudos
			var args,
				fn = Expr.pseudos[ pseudo ] || Expr.setFilters[ pseudo.toLowerCase() ] ||
					Sizzle.error( "unsupported pseudo: " + pseudo );

			// The user may use createPseudo to indicate that
			// arguments are needed to create the filter function
			// just as Sizzle does
			if ( fn[ expando ] ) {
				return fn( argument );
			}

			// But maintain support for old signatures
			if ( fn.length > 1 ) {
				args = [ pseudo, pseudo, "", argument ];
				return Expr.setFilters.hasOwnProperty( pseudo.toLowerCase() ) ?
					markFunction(function( seed, matches ) {
						var idx,
							matched = fn( seed, argument ),
							i = matched.length;
						while ( i-- ) {
							idx = indexOf.call( seed, matched[i] );
							seed[ idx ] = !( matches[ idx ] = matched[i] );
						}
					}) :
					function( elem ) {
						return fn( elem, 0, args );
					};
			}

			return fn;
		}
	},

	pseudos: {
		// Potentially complex pseudos
		"not": markFunction(function( selector ) {
			// Trim the selector passed to compile
			// to avoid treating leading and trailing
			// spaces as combinators
			var input = [],
				results = [],
				matcher = compile( selector.replace( rtrim, "$1" ) );

			return matcher[ expando ] ?
				markFunction(function( seed, matches, context, xml ) {
					var elem,
						unmatched = matcher( seed, null, xml, [] ),
						i = seed.length;

					// Match elements unmatched by `matcher`
					while ( i-- ) {
						if ( (elem = unmatched[i]) ) {
							seed[i] = !(matches[i] = elem);
						}
					}
				}) :
				function( elem, context, xml ) {
					input[0] = elem;
					matcher( input, null, xml, results );
					return !results.pop();
				};
		}),

		"has": markFunction(function( selector ) {
			return function( elem ) {
				return Sizzle( selector, elem ).length > 0;
			};
		}),

		"contains": markFunction(function( text ) {
			return function( elem ) {
				return ( elem.textContent || elem.innerText || getText( elem ) ).indexOf( text ) > -1;
			};
		}),

		// "Whether an element is represented by a :lang() selector
		// is based solely on the element's language value
		// being equal to the identifier C,
		// or beginning with the identifier C immediately followed by "-".
		// The matching of C against the element's language value is performed case-insensitively.
		// The identifier C does not have to be a valid language name."
		// http://www.w3.org/TR/selectors/#lang-pseudo
		"lang": markFunction( function( lang ) {
			// lang value must be a valid identifier
			if ( !ridentifier.test(lang || "") ) {
				Sizzle.error( "unsupported lang: " + lang );
			}
			lang = lang.replace( runescape, funescape ).toLowerCase();
			return function( elem ) {
				var elemLang;
				do {
					if ( (elemLang = documentIsHTML ?
						elem.lang :
						elem.getAttribute("xml:lang") || elem.getAttribute("lang")) ) {

						elemLang = elemLang.toLowerCase();
						return elemLang === lang || elemLang.indexOf( lang + "-" ) === 0;
					}
				} while ( (elem = elem.parentNode) && elem.nodeType === 1 );
				return false;
			};
		}),

		// Miscellaneous
		"target": function( elem ) {
			var hash = window.location && window.location.hash;
			return hash && hash.slice( 1 ) === elem.id;
		},

		"root": function( elem ) {
			return elem === docElem;
		},

		"focus": function( elem ) {
			return elem === document.activeElement && (!document.hasFocus || document.hasFocus()) && !!(elem.type || elem.href || ~elem.tabIndex);
		},

		// Boolean properties
		"enabled": function( elem ) {
			return elem.disabled === false;
		},

		"disabled": function( elem ) {
			return elem.disabled === true;
		},

		"checked": function( elem ) {
			// In CSS3, :checked should return both checked and selected elements
			// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
			var nodeName = elem.nodeName.toLowerCase();
			return (nodeName === "input" && !!elem.checked) || (nodeName === "option" && !!elem.selected);
		},

		"selected": function( elem ) {
			// Accessing this property makes selected-by-default
			// options in Safari work properly
			if ( elem.parentNode ) {
				elem.parentNode.selectedIndex;
			}

			return elem.selected === true;
		},

		// Contents
		"empty": function( elem ) {
			// http://www.w3.org/TR/selectors/#empty-pseudo
			// :empty is negated by element (1) or content nodes (text: 3; cdata: 4; entity ref: 5),
			//   but not by others (comment: 8; processing instruction: 7; etc.)
			// nodeType < 6 works because attributes (2) do not appear as children
			for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
				if ( elem.nodeType < 6 ) {
					return false;
				}
			}
			return true;
		},

		"parent": function( elem ) {
			return !Expr.pseudos["empty"]( elem );
		},

		// Element/input types
		"header": function( elem ) {
			return rheader.test( elem.nodeName );
		},

		"input": function( elem ) {
			return rinputs.test( elem.nodeName );
		},

		"button": function( elem ) {
			var name = elem.nodeName.toLowerCase();
			return name === "input" && elem.type === "button" || name === "button";
		},

		"text": function( elem ) {
			var attr;
			return elem.nodeName.toLowerCase() === "input" &&
				elem.type === "text" &&

				// Support: IE<8
				// New HTML5 attribute values (e.g., "search") appear with elem.type === "text"
				( (attr = elem.getAttribute("type")) == null || attr.toLowerCase() === "text" );
		},

		// Position-in-collection
		"first": createPositionalPseudo(function() {
			return [ 0 ];
		}),

		"last": createPositionalPseudo(function( matchIndexes, length ) {
			return [ length - 1 ];
		}),

		"eq": createPositionalPseudo(function( matchIndexes, length, argument ) {
			return [ argument < 0 ? argument + length : argument ];
		}),

		"even": createPositionalPseudo(function( matchIndexes, length ) {
			var i = 0;
			for ( ; i < length; i += 2 ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"odd": createPositionalPseudo(function( matchIndexes, length ) {
			var i = 1;
			for ( ; i < length; i += 2 ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"lt": createPositionalPseudo(function( matchIndexes, length, argument ) {
			var i = argument < 0 ? argument + length : argument;
			for ( ; --i >= 0; ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"gt": createPositionalPseudo(function( matchIndexes, length, argument ) {
			var i = argument < 0 ? argument + length : argument;
			for ( ; ++i < length; ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		})
	}
};

Expr.pseudos["nth"] = Expr.pseudos["eq"];

// Add button/input type pseudos
for ( i in { radio: true, checkbox: true, file: true, password: true, image: true } ) {
	Expr.pseudos[ i ] = createInputPseudo( i );
}
for ( i in { submit: true, reset: true } ) {
	Expr.pseudos[ i ] = createButtonPseudo( i );
}

// Easy API for creating new setFilters
function setFilters() {}
setFilters.prototype = Expr.filters = Expr.pseudos;
Expr.setFilters = new setFilters();

function tokenize( selector, parseOnly ) {
	var matched, match, tokens, type,
		soFar, groups, preFilters,
		cached = tokenCache[ selector + " " ];

	if ( cached ) {
		return parseOnly ? 0 : cached.slice( 0 );
	}

	soFar = selector;
	groups = [];
	preFilters = Expr.preFilter;

	while ( soFar ) {

		// Comma and first run
		if ( !matched || (match = rcomma.exec( soFar )) ) {
			if ( match ) {
				// Don't consume trailing commas as valid
				soFar = soFar.slice( match[0].length ) || soFar;
			}
			groups.push( (tokens = []) );
		}

		matched = false;

		// Combinators
		if ( (match = rcombinators.exec( soFar )) ) {
			matched = match.shift();
			tokens.push({
				value: matched,
				// Cast descendant combinators to space
				type: match[0].replace( rtrim, " " )
			});
			soFar = soFar.slice( matched.length );
		}

		// Filters
		for ( type in Expr.filter ) {
			if ( (match = matchExpr[ type ].exec( soFar )) && (!preFilters[ type ] ||
				(match = preFilters[ type ]( match ))) ) {
				matched = match.shift();
				tokens.push({
					value: matched,
					type: type,
					matches: match
				});
				soFar = soFar.slice( matched.length );
			}
		}

		if ( !matched ) {
			break;
		}
	}

	// Return the length of the invalid excess
	// if we're just parsing
	// Otherwise, throw an error or return tokens
	return parseOnly ?
		soFar.length :
		soFar ?
			Sizzle.error( selector ) :
			// Cache the tokens
			tokenCache( selector, groups ).slice( 0 );
}

function toSelector( tokens ) {
	var i = 0,
		len = tokens.length,
		selector = "";
	for ( ; i < len; i++ ) {
		selector += tokens[i].value;
	}
	return selector;
}

function addCombinator( matcher, combinator, base ) {
	var dir = combinator.dir,
		checkNonElements = base && dir === "parentNode",
		doneName = done++;

	return combinator.first ?
		// Check against closest ancestor/preceding element
		function( elem, context, xml ) {
			while ( (elem = elem[ dir ]) ) {
				if ( elem.nodeType === 1 || checkNonElements ) {
					return matcher( elem, context, xml );
				}
			}
		} :

		// Check against all ancestor/preceding elements
		function( elem, context, xml ) {
			var oldCache, outerCache,
				newCache = [ dirruns, doneName ];

			// We can't set arbitrary data on XML nodes, so they don't benefit from dir caching
			if ( xml ) {
				while ( (elem = elem[ dir ]) ) {
					if ( elem.nodeType === 1 || checkNonElements ) {
						if ( matcher( elem, context, xml ) ) {
							return true;
						}
					}
				}
			} else {
				while ( (elem = elem[ dir ]) ) {
					if ( elem.nodeType === 1 || checkNonElements ) {
						outerCache = elem[ expando ] || (elem[ expando ] = {});
						if ( (oldCache = outerCache[ dir ]) &&
							oldCache[ 0 ] === dirruns && oldCache[ 1 ] === doneName ) {

							// Assign to newCache so results back-propagate to previous elements
							return (newCache[ 2 ] = oldCache[ 2 ]);
						} else {
							// Reuse newcache so results back-propagate to previous elements
							outerCache[ dir ] = newCache;

							// A match means we're done; a fail means we have to keep checking
							if ( (newCache[ 2 ] = matcher( elem, context, xml )) ) {
								return true;
							}
						}
					}
				}
			}
		};
}

function elementMatcher( matchers ) {
	return matchers.length > 1 ?
		function( elem, context, xml ) {
			var i = matchers.length;
			while ( i-- ) {
				if ( !matchers[i]( elem, context, xml ) ) {
					return false;
				}
			}
			return true;
		} :
		matchers[0];
}

function condense( unmatched, map, filter, context, xml ) {
	var elem,
		newUnmatched = [],
		i = 0,
		len = unmatched.length,
		mapped = map != null;

	for ( ; i < len; i++ ) {
		if ( (elem = unmatched[i]) ) {
			if ( !filter || filter( elem, context, xml ) ) {
				newUnmatched.push( elem );
				if ( mapped ) {
					map.push( i );
				}
			}
		}
	}

	return newUnmatched;
}

function setMatcher( preFilter, selector, matcher, postFilter, postFinder, postSelector ) {
	if ( postFilter && !postFilter[ expando ] ) {
		postFilter = setMatcher( postFilter );
	}
	if ( postFinder && !postFinder[ expando ] ) {
		postFinder = setMatcher( postFinder, postSelector );
	}
	return markFunction(function( seed, results, context, xml ) {
		var temp, i, elem,
			preMap = [],
			postMap = [],
			preexisting = results.length,

			// Get initial elements from seed or context
			elems = seed || multipleContexts( selector || "*", context.nodeType ? [ context ] : context, [] ),

			// Prefilter to get matcher input, preserving a map for seed-results synchronization
			matcherIn = preFilter && ( seed || !selector ) ?
				condense( elems, preMap, preFilter, context, xml ) :
				elems,

			matcherOut = matcher ?
				// If we have a postFinder, or filtered seed, or non-seed postFilter or preexisting results,
				postFinder || ( seed ? preFilter : preexisting || postFilter ) ?

					// ...intermediate processing is necessary
					[] :

					// ...otherwise use results directly
					results :
				matcherIn;

		// Find primary matches
		if ( matcher ) {
			matcher( matcherIn, matcherOut, context, xml );
		}

		// Apply postFilter
		if ( postFilter ) {
			temp = condense( matcherOut, postMap );
			postFilter( temp, [], context, xml );

			// Un-match failing elements by moving them back to matcherIn
			i = temp.length;
			while ( i-- ) {
				if ( (elem = temp[i]) ) {
					matcherOut[ postMap[i] ] = !(matcherIn[ postMap[i] ] = elem);
				}
			}
		}

		if ( seed ) {
			if ( postFinder || preFilter ) {
				if ( postFinder ) {
					// Get the final matcherOut by condensing this intermediate into postFinder contexts
					temp = [];
					i = matcherOut.length;
					while ( i-- ) {
						if ( (elem = matcherOut[i]) ) {
							// Restore matcherIn since elem is not yet a final match
							temp.push( (matcherIn[i] = elem) );
						}
					}
					postFinder( null, (matcherOut = []), temp, xml );
				}

				// Move matched elements from seed to results to keep them synchronized
				i = matcherOut.length;
				while ( i-- ) {
					if ( (elem = matcherOut[i]) &&
						(temp = postFinder ? indexOf.call( seed, elem ) : preMap[i]) > -1 ) {

						seed[temp] = !(results[temp] = elem);
					}
				}
			}

		// Add elements to results, through postFinder if defined
		} else {
			matcherOut = condense(
				matcherOut === results ?
					matcherOut.splice( preexisting, matcherOut.length ) :
					matcherOut
			);
			if ( postFinder ) {
				postFinder( null, results, matcherOut, xml );
			} else {
				push.apply( results, matcherOut );
			}
		}
	});
}

function matcherFromTokens( tokens ) {
	var checkContext, matcher, j,
		len = tokens.length,
		leadingRelative = Expr.relative[ tokens[0].type ],
		implicitRelative = leadingRelative || Expr.relative[" "],
		i = leadingRelative ? 1 : 0,

		// The foundational matcher ensures that elements are reachable from top-level context(s)
		matchContext = addCombinator( function( elem ) {
			return elem === checkContext;
		}, implicitRelative, true ),
		matchAnyContext = addCombinator( function( elem ) {
			return indexOf.call( checkContext, elem ) > -1;
		}, implicitRelative, true ),
		matchers = [ function( elem, context, xml ) {
			return ( !leadingRelative && ( xml || context !== outermostContext ) ) || (
				(checkContext = context).nodeType ?
					matchContext( elem, context, xml ) :
					matchAnyContext( elem, context, xml ) );
		} ];

	for ( ; i < len; i++ ) {
		if ( (matcher = Expr.relative[ tokens[i].type ]) ) {
			matchers = [ addCombinator(elementMatcher( matchers ), matcher) ];
		} else {
			matcher = Expr.filter[ tokens[i].type ].apply( null, tokens[i].matches );

			// Return special upon seeing a positional matcher
			if ( matcher[ expando ] ) {
				// Find the next relative operator (if any) for proper handling
				j = ++i;
				for ( ; j < len; j++ ) {
					if ( Expr.relative[ tokens[j].type ] ) {
						break;
					}
				}
				return setMatcher(
					i > 1 && elementMatcher( matchers ),
					i > 1 && toSelector(
						// If the preceding token was a descendant combinator, insert an implicit any-element `*`
						tokens.slice( 0, i - 1 ).concat({ value: tokens[ i - 2 ].type === " " ? "*" : "" })
					).replace( rtrim, "$1" ),
					matcher,
					i < j && matcherFromTokens( tokens.slice( i, j ) ),
					j < len && matcherFromTokens( (tokens = tokens.slice( j )) ),
					j < len && toSelector( tokens )
				);
			}
			matchers.push( matcher );
		}
	}

	return elementMatcher( matchers );
}

function matcherFromGroupMatchers( elementMatchers, setMatchers ) {
	var bySet = setMatchers.length > 0,
		byElement = elementMatchers.length > 0,
		superMatcher = function( seed, context, xml, results, outermost ) {
			var elem, j, matcher,
				matchedCount = 0,
				i = "0",
				unmatched = seed && [],
				setMatched = [],
				contextBackup = outermostContext,
				// We must always have either seed elements or outermost context
				elems = seed || byElement && Expr.find["TAG"]( "*", outermost ),
				// Use integer dirruns iff this is the outermost matcher
				dirrunsUnique = (dirruns += contextBackup == null ? 1 : Math.random() || 0.1),
				len = elems.length;

			if ( outermost ) {
				outermostContext = context !== document && context;
			}

			// Add elements passing elementMatchers directly to results
			// Keep `i` a string if there are no elements so `matchedCount` will be "00" below
			// Support: IE<9, Safari
			// Tolerate NodeList properties (IE: "length"; Safari: <number>) matching elements by id
			for ( ; i !== len && (elem = elems[i]) != null; i++ ) {
				if ( byElement && elem ) {
					j = 0;
					while ( (matcher = elementMatchers[j++]) ) {
						if ( matcher( elem, context, xml ) ) {
							results.push( elem );
							break;
						}
					}
					if ( outermost ) {
						dirruns = dirrunsUnique;
					}
				}

				// Track unmatched elements for set filters
				if ( bySet ) {
					// They will have gone through all possible matchers
					if ( (elem = !matcher && elem) ) {
						matchedCount--;
					}

					// Lengthen the array for every element, matched or not
					if ( seed ) {
						unmatched.push( elem );
					}
				}
			}

			// Apply set filters to unmatched elements
			matchedCount += i;
			if ( bySet && i !== matchedCount ) {
				j = 0;
				while ( (matcher = setMatchers[j++]) ) {
					matcher( unmatched, setMatched, context, xml );
				}

				if ( seed ) {
					// Reintegrate element matches to eliminate the need for sorting
					if ( matchedCount > 0 ) {
						while ( i-- ) {
							if ( !(unmatched[i] || setMatched[i]) ) {
								setMatched[i] = pop.call( results );
							}
						}
					}

					// Discard index placeholder values to get only actual matches
					setMatched = condense( setMatched );
				}

				// Add matches to results
				push.apply( results, setMatched );

				// Seedless set matches succeeding multiple successful matchers stipulate sorting
				if ( outermost && !seed && setMatched.length > 0 &&
					( matchedCount + setMatchers.length ) > 1 ) {

					Sizzle.uniqueSort( results );
				}
			}

			// Override manipulation of globals by nested matchers
			if ( outermost ) {
				dirruns = dirrunsUnique;
				outermostContext = contextBackup;
			}

			return unmatched;
		};

	return bySet ?
		markFunction( superMatcher ) :
		superMatcher;
}

compile = Sizzle.compile = function( selector, group /* Internal Use Only */ ) {
	var i,
		setMatchers = [],
		elementMatchers = [],
		cached = compilerCache[ selector + " " ];

	if ( !cached ) {
		// Generate a function of recursive functions that can be used to check each element
		if ( !group ) {
			group = tokenize( selector );
		}
		i = group.length;
		while ( i-- ) {
			cached = matcherFromTokens( group[i] );
			if ( cached[ expando ] ) {
				setMatchers.push( cached );
			} else {
				elementMatchers.push( cached );
			}
		}

		// Cache the compiled function
		cached = compilerCache( selector, matcherFromGroupMatchers( elementMatchers, setMatchers ) );
	}
	return cached;
};

function multipleContexts( selector, contexts, results ) {
	var i = 0,
		len = contexts.length;
	for ( ; i < len; i++ ) {
		Sizzle( selector, contexts[i], results );
	}
	return results;
}

function select( selector, context, results, seed ) {
	var i, tokens, token, type, find,
		match = tokenize( selector );

	if ( !seed ) {
		// Try to minimize operations if there is only one group
		if ( match.length === 1 ) {

			// Take a shortcut and set the context if the root selector is an ID
			tokens = match[0] = match[0].slice( 0 );
			if ( tokens.length > 2 && (token = tokens[0]).type === "ID" &&
					support.getById && context.nodeType === 9 && documentIsHTML &&
					Expr.relative[ tokens[1].type ] ) {

				context = ( Expr.find["ID"]( token.matches[0].replace(runescape, funescape), context ) || [] )[0];
				if ( !context ) {
					return results;
				}
				selector = selector.slice( tokens.shift().value.length );
			}

			// Fetch a seed set for right-to-left matching
			i = matchExpr["needsContext"].test( selector ) ? 0 : tokens.length;
			while ( i-- ) {
				token = tokens[i];

				// Abort if we hit a combinator
				if ( Expr.relative[ (type = token.type) ] ) {
					break;
				}
				if ( (find = Expr.find[ type ]) ) {
					// Search, expanding context for leading sibling combinators
					if ( (seed = find(
						token.matches[0].replace( runescape, funescape ),
						rsibling.test( tokens[0].type ) && testContext( context.parentNode ) || context
					)) ) {

						// If seed is empty or no tokens remain, we can return early
						tokens.splice( i, 1 );
						selector = seed.length && toSelector( tokens );
						if ( !selector ) {
							push.apply( results, seed );
							return results;
						}

						break;
					}
				}
			}
		}
	}

	// Compile and execute a filtering function
	// Provide `match` to avoid retokenization if we modified the selector above
	compile( selector, match )(
		seed,
		context,
		!documentIsHTML,
		results,
		rsibling.test( selector ) && testContext( context.parentNode ) || context
	);
	return results;
}

// One-time assignments

// Sort stability
support.sortStable = expando.split("").sort( sortOrder ).join("") === expando;

// Support: Chrome<14
// Always assume duplicates if they aren't passed to the comparison function
support.detectDuplicates = !!hasDuplicate;

// Initialize against the default document
setDocument();

// Support: Webkit<537.32 - Safari 6.0.3/Chrome 25 (fixed in Chrome 27)
// Detached nodes confoundingly follow *each other*
support.sortDetached = assert(function( div1 ) {
	// Should return 1, but returns 4 (following)
	return div1.compareDocumentPosition( document.createElement("div") ) & 1;
});

// Support: IE<8
// Prevent attribute/property "interpolation"
// http://msdn.microsoft.com/en-us/library/ms536429%28VS.85%29.aspx
if ( !assert(function( div ) {
	div.innerHTML = "<a href='#'></a>";
	return div.firstChild.getAttribute("href") === "#" ;
}) ) {
	addHandle( "type|href|height|width", function( elem, name, isXML ) {
		if ( !isXML ) {
			return elem.getAttribute( name, name.toLowerCase() === "type" ? 1 : 2 );
		}
	});
}

// Support: IE<9
// Use defaultValue in place of getAttribute("value")
if ( !support.attributes || !assert(function( div ) {
	div.innerHTML = "<input/>";
	div.firstChild.setAttribute( "value", "" );
	return div.firstChild.getAttribute( "value" ) === "";
}) ) {
	addHandle( "value", function( elem, name, isXML ) {
		if ( !isXML && elem.nodeName.toLowerCase() === "input" ) {
			return elem.defaultValue;
		}
	});
}

// Support: IE<9
// Use getAttributeNode to fetch booleans when getAttribute lies
if ( !assert(function( div ) {
	return div.getAttribute("disabled") == null;
}) ) {
	addHandle( booleans, function( elem, name, isXML ) {
		var val;
		if ( !isXML ) {
			return elem[ name ] === true ? name.toLowerCase() :
					(val = elem.getAttributeNode( name )) && val.specified ?
					val.value :
				null;
		}
	});
}

return Sizzle;

})( window );



jQuery.find = Sizzle;
jQuery.expr = Sizzle.selectors;
jQuery.expr[":"] = jQuery.expr.pseudos;
jQuery.unique = Sizzle.uniqueSort;
jQuery.text = Sizzle.getText;
jQuery.isXMLDoc = Sizzle.isXML;
jQuery.contains = Sizzle.contains;



var rneedsContext = jQuery.expr.match.needsContext;

var rsingleTag = (/^<(\w+)\s*\/?>(?:<\/\1>|)$/);



var risSimple = /^.[^:#\[\.,]*$/;

// Implement the identical functionality for filter and not
function winnow( elements, qualifier, not ) {
	if ( jQuery.isFunction( qualifier ) ) {
		return jQuery.grep( elements, function( elem, i ) {
			/* jshint -W018 */
			return !!qualifier.call( elem, i, elem ) !== not;
		});

	}

	if ( qualifier.nodeType ) {
		return jQuery.grep( elements, function( elem ) {
			return ( elem === qualifier ) !== not;
		});

	}

	if ( typeof qualifier === "string" ) {
		if ( risSimple.test( qualifier ) ) {
			return jQuery.filter( qualifier, elements, not );
		}

		qualifier = jQuery.filter( qualifier, elements );
	}

	return jQuery.grep( elements, function( elem ) {
		return ( jQuery.inArray( elem, qualifier ) >= 0 ) !== not;
	});
}

jQuery.filter = function( expr, elems, not ) {
	var elem = elems[ 0 ];

	if ( not ) {
		expr = ":not(" + expr + ")";
	}

	return elems.length === 1 && elem.nodeType === 1 ?
		jQuery.find.matchesSelector( elem, expr ) ? [ elem ] : [] :
		jQuery.find.matches( expr, jQuery.grep( elems, function( elem ) {
			return elem.nodeType === 1;
		}));
};

jQuery.fn.extend({
	find: function( selector ) {
		var i,
			ret = [],
			self = this,
			len = self.length;

		if ( typeof selector !== "string" ) {
			return this.pushStack( jQuery( selector ).filter(function() {
				for ( i = 0; i < len; i++ ) {
					if ( jQuery.contains( self[ i ], this ) ) {
						return true;
					}
				}
			}) );
		}

		for ( i = 0; i < len; i++ ) {
			jQuery.find( selector, self[ i ], ret );
		}

		// Needed because $( selector, context ) becomes $( context ).find( selector )
		ret = this.pushStack( len > 1 ? jQuery.unique( ret ) : ret );
		ret.selector = this.selector ? this.selector + " " + selector : selector;
		return ret;
	},
	filter: function( selector ) {
		return this.pushStack( winnow(this, selector || [], false) );
	},
	not: function( selector ) {
		return this.pushStack( winnow(this, selector || [], true) );
	},
	is: function( selector ) {
		return !!winnow(
			this,

			// If this is a positional/relative selector, check membership in the returned set
			// so $("p:first").is("p:last") won't return true for a doc with two "p".
			typeof selector === "string" && rneedsContext.test( selector ) ?
				jQuery( selector ) :
				selector || [],
			false
		).length;
	}
});


// Initialize a jQuery object


// A central reference to the root jQuery(document)
var rootjQuery,

	// Use the correct document accordingly with window argument (sandbox)
	document = window.document,

	// A simple way to check for HTML strings
	// Prioritize #id over <tag> to avoid XSS via location.hash (#9521)
	// Strict HTML recognition (#11290: must start with <)
	rquickExpr = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/,

	init = jQuery.fn.init = function( selector, context ) {
		var match, elem;

		// HANDLE: $(""), $(null), $(undefined), $(false)
		if ( !selector ) {
			return this;
		}

		// Handle HTML strings
		if ( typeof selector === "string" ) {
			if ( selector.charAt(0) === "<" && selector.charAt( selector.length - 1 ) === ">" && selector.length >= 3 ) {
				// Assume that strings that start and end with <> are HTML and skip the regex check
				match = [ null, selector, null ];

			} else {
				match = rquickExpr.exec( selector );
			}

			// Match html or make sure no context is specified for #id
			if ( match && (match[1] || !context) ) {

				// HANDLE: $(html) -> $(array)
				if ( match[1] ) {
					context = context instanceof jQuery ? context[0] : context;

					// scripts is true for back-compat
					// Intentionally let the error be thrown if parseHTML is not present
					jQuery.merge( this, jQuery.parseHTML(
						match[1],
						context && context.nodeType ? context.ownerDocument || context : document,
						true
					) );

					// HANDLE: $(html, props)
					if ( rsingleTag.test( match[1] ) && jQuery.isPlainObject( context ) ) {
						for ( match in context ) {
							// Properties of context are called as methods if possible
							if ( jQuery.isFunction( this[ match ] ) ) {
								this[ match ]( context[ match ] );

							// ...and otherwise set as attributes
							} else {
								this.attr( match, context[ match ] );
							}
						}
					}

					return this;

				// HANDLE: $(#id)
				} else {
					elem = document.getElementById( match[2] );

					// Check parentNode to catch when Blackberry 4.6 returns
					// nodes that are no longer in the document #6963
					if ( elem && elem.parentNode ) {
						// Handle the case where IE and Opera return items
						// by name instead of ID
						if ( elem.id !== match[2] ) {
							return rootjQuery.find( selector );
						}

						// Otherwise, we inject the element directly into the jQuery object
						this.length = 1;
						this[0] = elem;
					}

					this.context = document;
					this.selector = selector;
					return this;
				}

			// HANDLE: $(expr, $(...))
			} else if ( !context || context.jquery ) {
				return ( context || rootjQuery ).find( selector );

			// HANDLE: $(expr, context)
			// (which is just equivalent to: $(context).find(expr)
			} else {
				return this.constructor( context ).find( selector );
			}

		// HANDLE: $(DOMElement)
		} else if ( selector.nodeType ) {
			this.context = this[0] = selector;
			this.length = 1;
			return this;

		// HANDLE: $(function)
		// Shortcut for document ready
		} else if ( jQuery.isFunction( selector ) ) {
			return typeof rootjQuery.ready !== "undefined" ?
				rootjQuery.ready( selector ) :
				// Execute immediately if ready is not present
				selector( jQuery );
		}

		if ( selector.selector !== undefined ) {
			this.selector = selector.selector;
			this.context = selector.context;
		}

		return jQuery.makeArray( selector, this );
	};

// Give the init function the jQuery prototype for later instantiation
init.prototype = jQuery.fn;

// Initialize central reference
rootjQuery = jQuery( document );


var rparentsprev = /^(?:parents|prev(?:Until|All))/,
	// methods guaranteed to produce a unique set when starting from a unique set
	guaranteedUnique = {
		children: true,
		contents: true,
		next: true,
		prev: true
	};

jQuery.extend({
	dir: function( elem, dir, until ) {
		var matched = [],
			cur = elem[ dir ];

		while ( cur && cur.nodeType !== 9 && (until === undefined || cur.nodeType !== 1 || !jQuery( cur ).is( until )) ) {
			if ( cur.nodeType === 1 ) {
				matched.push( cur );
			}
			cur = cur[dir];
		}
		return matched;
	},

	sibling: function( n, elem ) {
		var r = [];

		for ( ; n; n = n.nextSibling ) {
			if ( n.nodeType === 1 && n !== elem ) {
				r.push( n );
			}
		}

		return r;
	}
});

jQuery.fn.extend({
	has: function( target ) {
		var i,
			targets = jQuery( target, this ),
			len = targets.length;

		return this.filter(function() {
			for ( i = 0; i < len; i++ ) {
				if ( jQuery.contains( this, targets[i] ) ) {
					return true;
				}
			}
		});
	},

	closest: function( selectors, context ) {
		var cur,
			i = 0,
			l = this.length,
			matched = [],
			pos = rneedsContext.test( selectors ) || typeof selectors !== "string" ?
				jQuery( selectors, context || this.context ) :
				0;

		for ( ; i < l; i++ ) {
			for ( cur = this[i]; cur && cur !== context; cur = cur.parentNode ) {
				// Always skip document fragments
				if ( cur.nodeType < 11 && (pos ?
					pos.index(cur) > -1 :

					// Don't pass non-elements to Sizzle
					cur.nodeType === 1 &&
						jQuery.find.matchesSelector(cur, selectors)) ) {

					matched.push( cur );
					break;
				}
			}
		}

		return this.pushStack( matched.length > 1 ? jQuery.unique( matched ) : matched );
	},

	// Determine the position of an element within
	// the matched set of elements
	index: function( elem ) {

		// No argument, return index in parent
		if ( !elem ) {
			return ( this[0] && this[0].parentNode ) ? this.first().prevAll().length : -1;
		}

		// index in selector
		if ( typeof elem === "string" ) {
			return jQuery.inArray( this[0], jQuery( elem ) );
		}

		// Locate the position of the desired element
		return jQuery.inArray(
			// If it receives a jQuery object, the first element is used
			elem.jquery ? elem[0] : elem, this );
	},

	add: function( selector, context ) {
		return this.pushStack(
			jQuery.unique(
				jQuery.merge( this.get(), jQuery( selector, context ) )
			)
		);
	},

	addBack: function( selector ) {
		return this.add( selector == null ?
			this.prevObject : this.prevObject.filter(selector)
		);
	}
});

function sibling( cur, dir ) {
	do {
		cur = cur[ dir ];
	} while ( cur && cur.nodeType !== 1 );

	return cur;
}

jQuery.each({
	parent: function( elem ) {
		var parent = elem.parentNode;
		return parent && parent.nodeType !== 11 ? parent : null;
	},
	parents: function( elem ) {
		return jQuery.dir( elem, "parentNode" );
	},
	parentsUntil: function( elem, i, until ) {
		return jQuery.dir( elem, "parentNode", until );
	},
	next: function( elem ) {
		return sibling( elem, "nextSibling" );
	},
	prev: function( elem ) {
		return sibling( elem, "previousSibling" );
	},
	nextAll: function( elem ) {
		return jQuery.dir( elem, "nextSibling" );
	},
	prevAll: function( elem ) {
		return jQuery.dir( elem, "previousSibling" );
	},
	nextUntil: function( elem, i, until ) {
		return jQuery.dir( elem, "nextSibling", until );
	},
	prevUntil: function( elem, i, until ) {
		return jQuery.dir( elem, "previousSibling", until );
	},
	siblings: function( elem ) {
		return jQuery.sibling( ( elem.parentNode || {} ).firstChild, elem );
	},
	children: function( elem ) {
		return jQuery.sibling( elem.firstChild );
	},
	contents: function( elem ) {
		return jQuery.nodeName( elem, "iframe" ) ?
			elem.contentDocument || elem.contentWindow.document :
			jQuery.merge( [], elem.childNodes );
	}
}, function( name, fn ) {
	jQuery.fn[ name ] = function( until, selector ) {
		var ret = jQuery.map( this, fn, until );

		if ( name.slice( -5 ) !== "Until" ) {
			selector = until;
		}

		if ( selector && typeof selector === "string" ) {
			ret = jQuery.filter( selector, ret );
		}

		if ( this.length > 1 ) {
			// Remove duplicates
			if ( !guaranteedUnique[ name ] ) {
				ret = jQuery.unique( ret );
			}

			// Reverse order for parents* and prev-derivatives
			if ( rparentsprev.test( name ) ) {
				ret = ret.reverse();
			}
		}

		return this.pushStack( ret );
	};
});
var rnotwhite = (/\S+/g);



// String to Object options format cache
var optionsCache = {};

// Convert String-formatted options into Object-formatted ones and store in cache
function createOptions( options ) {
	var object = optionsCache[ options ] = {};
	jQuery.each( options.match( rnotwhite ) || [], function( _, flag ) {
		object[ flag ] = true;
	});
	return object;
}

/*
 * Create a callback list using the following parameters:
 *
 *	options: an optional list of space-separated options that will change how
 *			the callback list behaves or a more traditional option object
 *
 * By default a callback list will act like an event callback list and can be
 * "fired" multiple times.
 *
 * Possible options:
 *
 *	once:			will ensure the callback list can only be fired once (like a Deferred)
 *
 *	memory:			will keep track of previous values and will call any callback added
 *					after the list has been fired right away with the latest "memorized"
 *					values (like a Deferred)
 *
 *	unique:			will ensure a callback can only be added once (no duplicate in the list)
 *
 *	stopOnFalse:	interrupt callings when a callback returns false
 *
 */
jQuery.Callbacks = function( options ) {

	// Convert options from String-formatted to Object-formatted if needed
	// (we check in cache first)
	options = typeof options === "string" ?
		( optionsCache[ options ] || createOptions( options ) ) :
		jQuery.extend( {}, options );

	var // Flag to know if list is currently firing
		firing,
		// Last fire value (for non-forgettable lists)
		memory,
		// Flag to know if list was already fired
		fired,
		// End of the loop when firing
		firingLength,
		// Index of currently firing callback (modified by remove if needed)
		firingIndex,
		// First callback to fire (used internally by add and fireWith)
		firingStart,
		// Actual callback list
		list = [],
		// Stack of fire calls for repeatable lists
		stack = !options.once && [],
		// Fire callbacks
		fire = function( data ) {
			memory = options.memory && data;
			fired = true;
			firingIndex = firingStart || 0;
			firingStart = 0;
			firingLength = list.length;
			firing = true;
			for ( ; list && firingIndex < firingLength; firingIndex++ ) {
				if ( list[ firingIndex ].apply( data[ 0 ], data[ 1 ] ) === false && options.stopOnFalse ) {
					memory = false; // To prevent further calls using add
					break;
				}
			}
			firing = false;
			if ( list ) {
				if ( stack ) {
					if ( stack.length ) {
						fire( stack.shift() );
					}
				} else if ( memory ) {
					list = [];
				} else {
					self.disable();
				}
			}
		},
		// Actual Callbacks object
		self = {
			// Add a callback or a collection of callbacks to the list
			add: function() {
				if ( list ) {
					// First, we save the current length
					var start = list.length;
					(function add( args ) {
						jQuery.each( args, function( _, arg ) {
							var type = jQuery.type( arg );
							if ( type === "function" ) {
								if ( !options.unique || !self.has( arg ) ) {
									list.push( arg );
								}
							} else if ( arg && arg.length && type !== "string" ) {
								// Inspect recursively
								add( arg );
							}
						});
					})( arguments );
					// Do we need to add the callbacks to the
					// current firing batch?
					if ( firing ) {
						firingLength = list.length;
					// With memory, if we're not firing then
					// we should call right away
					} else if ( memory ) {
						firingStart = start;
						fire( memory );
					}
				}
				return this;
			},
			// Remove a callback from the list
			remove: function() {
				if ( list ) {
					jQuery.each( arguments, function( _, arg ) {
						var index;
						while ( ( index = jQuery.inArray( arg, list, index ) ) > -1 ) {
							list.splice( index, 1 );
							// Handle firing indexes
							if ( firing ) {
								if ( index <= firingLength ) {
									firingLength--;
								}
								if ( index <= firingIndex ) {
									firingIndex--;
								}
							}
						}
					});
				}
				return this;
			},
			// Check if a given callback is in the list.
			// If no argument is given, return whether or not list has callbacks attached.
			has: function( fn ) {
				return fn ? jQuery.inArray( fn, list ) > -1 : !!( list && list.length );
			},
			// Remove all callbacks from the list
			empty: function() {
				list = [];
				firingLength = 0;
				return this;
			},
			// Have the list do nothing anymore
			disable: function() {
				list = stack = memory = undefined;
				return this;
			},
			// Is it disabled?
			disabled: function() {
				return !list;
			},
			// Lock the list in its current state
			lock: function() {
				stack = undefined;
				if ( !memory ) {
					self.disable();
				}
				return this;
			},
			// Is it locked?
			locked: function() {
				return !stack;
			},
			// Call all callbacks with the given context and arguments
			fireWith: function( context, args ) {
				if ( list && ( !fired || stack ) ) {
					args = args || [];
					args = [ context, args.slice ? args.slice() : args ];
					if ( firing ) {
						stack.push( args );
					} else {
						fire( args );
					}
				}
				return this;
			},
			// Call all the callbacks with the given arguments
			fire: function() {
				self.fireWith( this, arguments );
				return this;
			},
			// To know if the callbacks have already been called at least once
			fired: function() {
				return !!fired;
			}
		};

	return self;
};


jQuery.extend({

	Deferred: function( func ) {
		var tuples = [
				// action, add listener, listener list, final state
				[ "resolve", "done", jQuery.Callbacks("once memory"), "resolved" ],
				[ "reject", "fail", jQuery.Callbacks("once memory"), "rejected" ],
				[ "notify", "progress", jQuery.Callbacks("memory") ]
			],
			state = "pending",
			promise = {
				state: function() {
					return state;
				},
				always: function() {
					deferred.done( arguments ).fail( arguments );
					return this;
				},
				then: function( /* fnDone, fnFail, fnProgress */ ) {
					var fns = arguments;
					return jQuery.Deferred(function( newDefer ) {
						jQuery.each( tuples, function( i, tuple ) {
							var fn = jQuery.isFunction( fns[ i ] ) && fns[ i ];
							// deferred[ done | fail | progress ] for forwarding actions to newDefer
							deferred[ tuple[1] ](function() {
								var returned = fn && fn.apply( this, arguments );
								if ( returned && jQuery.isFunction( returned.promise ) ) {
									returned.promise()
										.done( newDefer.resolve )
										.fail( newDefer.reject )
										.progress( newDefer.notify );
								} else {
									newDefer[ tuple[ 0 ] + "With" ]( this === promise ? newDefer.promise() : this, fn ? [ returned ] : arguments );
								}
							});
						});
						fns = null;
					}).promise();
				},
				// Get a promise for this deferred
				// If obj is provided, the promise aspect is added to the object
				promise: function( obj ) {
					return obj != null ? jQuery.extend( obj, promise ) : promise;
				}
			},
			deferred = {};

		// Keep pipe for back-compat
		promise.pipe = promise.then;

		// Add list-specific methods
		jQuery.each( tuples, function( i, tuple ) {
			var list = tuple[ 2 ],
				stateString = tuple[ 3 ];

			// promise[ done | fail | progress ] = list.add
			promise[ tuple[1] ] = list.add;

			// Handle state
			if ( stateString ) {
				list.add(function() {
					// state = [ resolved | rejected ]
					state = stateString;

				// [ reject_list | resolve_list ].disable; progress_list.lock
				}, tuples[ i ^ 1 ][ 2 ].disable, tuples[ 2 ][ 2 ].lock );
			}

			// deferred[ resolve | reject | notify ]
			deferred[ tuple[0] ] = function() {
				deferred[ tuple[0] + "With" ]( this === deferred ? promise : this, arguments );
				return this;
			};
			deferred[ tuple[0] + "With" ] = list.fireWith;
		});

		// Make the deferred a promise
		promise.promise( deferred );

		// Call given func if any
		if ( func ) {
			func.call( deferred, deferred );
		}

		// All done!
		return deferred;
	},

	// Deferred helper
	when: function( subordinate /* , ..., subordinateN */ ) {
		var i = 0,
			resolveValues = slice.call( arguments ),
			length = resolveValues.length,

			// the count of uncompleted subordinates
			remaining = length !== 1 || ( subordinate && jQuery.isFunction( subordinate.promise ) ) ? length : 0,

			// the master Deferred. If resolveValues consist of only a single Deferred, just use that.
			deferred = remaining === 1 ? subordinate : jQuery.Deferred(),

			// Update function for both resolve and progress values
			updateFunc = function( i, contexts, values ) {
				return function( value ) {
					contexts[ i ] = this;
					values[ i ] = arguments.length > 1 ? slice.call( arguments ) : value;
					if ( values === progressValues ) {
						deferred.notifyWith( contexts, values );

					} else if ( !(--remaining) ) {
						deferred.resolveWith( contexts, values );
					}
				};
			},

			progressValues, progressContexts, resolveContexts;

		// add listeners to Deferred subordinates; treat others as resolved
		if ( length > 1 ) {
			progressValues = new Array( length );
			progressContexts = new Array( length );
			resolveContexts = new Array( length );
			for ( ; i < length; i++ ) {
				if ( resolveValues[ i ] && jQuery.isFunction( resolveValues[ i ].promise ) ) {
					resolveValues[ i ].promise()
						.done( updateFunc( i, resolveContexts, resolveValues ) )
						.fail( deferred.reject )
						.progress( updateFunc( i, progressContexts, progressValues ) );
				} else {
					--remaining;
				}
			}
		}

		// if we're not waiting on anything, resolve the master
		if ( !remaining ) {
			deferred.resolveWith( resolveContexts, resolveValues );
		}

		return deferred.promise();
	}
});


// The deferred used on DOM ready
var readyList;

jQuery.fn.ready = function( fn ) {
	// Add the callback
	jQuery.ready.promise().done( fn );

	return this;
};

jQuery.extend({
	// Is the DOM ready to be used? Set to true once it occurs.
	isReady: false,

	// A counter to track how many items to wait for before
	// the ready event fires. See #6781
	readyWait: 1,

	// Hold (or release) the ready event
	holdReady: function( hold ) {
		if ( hold ) {
			jQuery.readyWait++;
		} else {
			jQuery.ready( true );
		}
	},

	// Handle when the DOM is ready
	ready: function( wait ) {

		// Abort if there are pending holds or we're already ready
		if ( wait === true ? --jQuery.readyWait : jQuery.isReady ) {
			return;
		}

		// Make sure body exists, at least, in case IE gets a little overzealous (ticket #5443).
		if ( !document.body ) {
			return setTimeout( jQuery.ready );
		}

		// Remember that the DOM is ready
		jQuery.isReady = true;

		// If a normal DOM Ready event fired, decrement, and wait if need be
		if ( wait !== true && --jQuery.readyWait > 0 ) {
			return;
		}

		// If there are functions bound, to execute
		readyList.resolveWith( document, [ jQuery ] );

		// Trigger any bound ready events
		if ( jQuery.fn.trigger ) {
			jQuery( document ).trigger("ready").off("ready");
		}
	}
});

/**
 * Clean-up method for dom ready events
 */
function detach() {
	if ( document.addEventListener ) {
		document.removeEventListener( "DOMContentLoaded", completed, false );
		window.removeEventListener( "load", completed, false );

	} else {
		document.detachEvent( "onreadystatechange", completed );
		window.detachEvent( "onload", completed );
	}
}

/**
 * The ready event handler and self cleanup method
 */
function completed() {
	// readyState === "complete" is good enough for us to call the dom ready in oldIE
	if ( document.addEventListener || event.type === "load" || document.readyState === "complete" ) {
		detach();
		jQuery.ready();
	}
}

jQuery.ready.promise = function( obj ) {
	if ( !readyList ) {

		readyList = jQuery.Deferred();

		// Catch cases where $(document).ready() is called after the browser event has already occurred.
		// we once tried to use readyState "interactive" here, but it caused issues like the one
		// discovered by ChrisS here: http://bugs.jquery.com/ticket/12282#comment:15
		if ( document.readyState === "complete" ) {
			// Handle it asynchronously to allow scripts the opportunity to delay ready
			setTimeout( jQuery.ready );

		// Standards-based browsers support DOMContentLoaded
		} else if ( document.addEventListener ) {
			// Use the handy event callback
			document.addEventListener( "DOMContentLoaded", completed, false );

			// A fallback to window.onload, that will always work
			window.addEventListener( "load", completed, false );

		// If IE event model is used
		} else {
			// Ensure firing before onload, maybe late but safe also for iframes
			document.attachEvent( "onreadystatechange", completed );

			// A fallback to window.onload, that will always work
			window.attachEvent( "onload", completed );

			// If IE and not a frame
			// continually check to see if the document is ready
			var top = false;

			try {
				top = window.frameElement == null && document.documentElement;
			} catch(e) {}

			if ( top && top.doScroll ) {
				(function doScrollCheck() {
					if ( !jQuery.isReady ) {

						try {
							// Use the trick by Diego Perini
							// http://javascript.nwbox.com/IEContentLoaded/
							top.doScroll("left");
						} catch(e) {
							return setTimeout( doScrollCheck, 50 );
						}

						// detach all dom ready events
						detach();

						// and execute any waiting functions
						jQuery.ready();
					}
				})();
			}
		}
	}
	return readyList.promise( obj );
};


var strundefined = typeof undefined;



// Support: IE<9
// Iteration over object's inherited properties before its own
var i;
for ( i in jQuery( support ) ) {
	break;
}
support.ownLast = i !== "0";

// Note: most support tests are defined in their respective modules.
// false until the test is run
support.inlineBlockNeedsLayout = false;

jQuery(function() {
	// We need to execute this one support test ASAP because we need to know
	// if body.style.zoom needs to be set.

	var container, div,
		body = document.getElementsByTagName("body")[0];

	if ( !body ) {
		// Return for frameset docs that don't have a body
		return;
	}

	// Setup
	container = document.createElement( "div" );
	container.style.cssText = "border:0;width:0;height:0;position:absolute;top:0;left:-9999px;margin-top:1px";

	div = document.createElement( "div" );
	body.appendChild( container ).appendChild( div );

	if ( typeof div.style.zoom !== strundefined ) {
		// Support: IE<8
		// Check if natively block-level elements act like inline-block
		// elements when setting their display to 'inline' and giving
		// them layout
		div.style.cssText = "border:0;margin:0;width:1px;padding:1px;display:inline;zoom:1";

		if ( (support.inlineBlockNeedsLayout = ( div.offsetWidth === 3 )) ) {
			// Prevent IE 6 from affecting layout for positioned elements #11048
			// Prevent IE from shrinking the body in IE 7 mode #12869
			// Support: IE<8
			body.style.zoom = 1;
		}
	}

	body.removeChild( container );

	// Null elements to avoid leaks in IE
	container = div = null;
});




(function() {
	var div = document.createElement( "div" );

	// Execute the test only if not already executed in another module.
	if (support.deleteExpando == null) {
		// Support: IE<9
		support.deleteExpando = true;
		try {
			delete div.test;
		} catch( e ) {
			support.deleteExpando = false;
		}
	}

	// Null elements to avoid leaks in IE.
	div = null;
})();


/**
 * Determines whether an object can have data
 */
jQuery.acceptData = function( elem ) {
	var noData = jQuery.noData[ (elem.nodeName + " ").toLowerCase() ],
		nodeType = +elem.nodeType || 1;

	// Do not set data on non-element DOM nodes because it will not be cleared (#8335).
	return nodeType !== 1 && nodeType !== 9 ?
		false :

		// Nodes accept data unless otherwise specified; rejection can be conditional
		!noData || noData !== true && elem.getAttribute("classid") === noData;
};


var rbrace = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,
	rmultiDash = /([A-Z])/g;

function dataAttr( elem, key, data ) {
	// If nothing was found internally, try to fetch any
	// data from the HTML5 data-* attribute
	if ( data === undefined && elem.nodeType === 1 ) {

		var name = "data-" + key.replace( rmultiDash, "-$1" ).toLowerCase();

		data = elem.getAttribute( name );

		if ( typeof data === "string" ) {
			try {
				data = data === "true" ? true :
					data === "false" ? false :
					data === "null" ? null :
					// Only convert to a number if it doesn't change the string
					+data + "" === data ? +data :
					rbrace.test( data ) ? jQuery.parseJSON( data ) :
					data;
			} catch( e ) {}

			// Make sure we set the data so it isn't changed later
			jQuery.data( elem, key, data );

		} else {
			data = undefined;
		}
	}

	return data;
}

// checks a cache object for emptiness
function isEmptyDataObject( obj ) {
	var name;
	for ( name in obj ) {

		// if the public data object is empty, the private is still empty
		if ( name === "data" && jQuery.isEmptyObject( obj[name] ) ) {
			continue;
		}
		if ( name !== "toJSON" ) {
			return false;
		}
	}

	return true;
}

function internalData( elem, name, data, pvt /* Internal Use Only */ ) {
	if ( !jQuery.acceptData( elem ) ) {
		return;
	}

	var ret, thisCache,
		internalKey = jQuery.expando,

		// We have to handle DOM nodes and JS objects differently because IE6-7
		// can't GC object references properly across the DOM-JS boundary
		isNode = elem.nodeType,

		// Only DOM nodes need the global jQuery cache; JS object data is
		// attached directly to the object so GC can occur automatically
		cache = isNode ? jQuery.cache : elem,

		// Only defining an ID for JS objects if its cache already exists allows
		// the code to shortcut on the same path as a DOM node with no cache
		id = isNode ? elem[ internalKey ] : elem[ internalKey ] && internalKey;

	// Avoid doing any more work than we need to when trying to get data on an
	// object that has no data at all
	if ( (!id || !cache[id] || (!pvt && !cache[id].data)) && data === undefined && typeof name === "string" ) {
		return;
	}

	if ( !id ) {
		// Only DOM nodes need a new unique ID for each element since their data
		// ends up in the global cache
		if ( isNode ) {
			id = elem[ internalKey ] = deletedIds.pop() || jQuery.guid++;
		} else {
			id = internalKey;
		}
	}

	if ( !cache[ id ] ) {
		// Avoid exposing jQuery metadata on plain JS objects when the object
		// is serialized using JSON.stringify
		cache[ id ] = isNode ? {} : { toJSON: jQuery.noop };
	}

	// An object can be passed to jQuery.data instead of a key/value pair; this gets
	// shallow copied over onto the existing cache
	if ( typeof name === "object" || typeof name === "function" ) {
		if ( pvt ) {
			cache[ id ] = jQuery.extend( cache[ id ], name );
		} else {
			cache[ id ].data = jQuery.extend( cache[ id ].data, name );
		}
	}

	thisCache = cache[ id ];

	// jQuery data() is stored in a separate object inside the object's internal data
	// cache in order to avoid key collisions between internal data and user-defined
	// data.
	if ( !pvt ) {
		if ( !thisCache.data ) {
			thisCache.data = {};
		}

		thisCache = thisCache.data;
	}

	if ( data !== undefined ) {
		thisCache[ jQuery.camelCase( name ) ] = data;
	}

	// Check for both converted-to-camel and non-converted data property names
	// If a data property was specified
	if ( typeof name === "string" ) {

		// First Try to find as-is property data
		ret = thisCache[ name ];

		// Test for null|undefined property data
		if ( ret == null ) {

			// Try to find the camelCased property
			ret = thisCache[ jQuery.camelCase( name ) ];
		}
	} else {
		ret = thisCache;
	}

	return ret;
}

function internalRemoveData( elem, name, pvt ) {
	if ( !jQuery.acceptData( elem ) ) {
		return;
	}

	var thisCache, i,
		isNode = elem.nodeType,

		// See jQuery.data for more information
		cache = isNode ? jQuery.cache : elem,
		id = isNode ? elem[ jQuery.expando ] : jQuery.expando;

	// If there is already no cache entry for this object, there is no
	// purpose in continuing
	if ( !cache[ id ] ) {
		return;
	}

	if ( name ) {

		thisCache = pvt ? cache[ id ] : cache[ id ].data;

		if ( thisCache ) {

			// Support array or space separated string names for data keys
			if ( !jQuery.isArray( name ) ) {

				// try the string as a key before any manipulation
				if ( name in thisCache ) {
					name = [ name ];
				} else {

					// split the camel cased version by spaces unless a key with the spaces exists
					name = jQuery.camelCase( name );
					if ( name in thisCache ) {
						name = [ name ];
					} else {
						name = name.split(" ");
					}
				}
			} else {
				// If "name" is an array of keys...
				// When data is initially created, via ("key", "val") signature,
				// keys will be converted to camelCase.
				// Since there is no way to tell _how_ a key was added, remove
				// both plain key and camelCase key. #12786
				// This will only penalize the array argument path.
				name = name.concat( jQuery.map( name, jQuery.camelCase ) );
			}

			i = name.length;
			while ( i-- ) {
				delete thisCache[ name[i] ];
			}

			// If there is no data left in the cache, we want to continue
			// and let the cache object itself get destroyed
			if ( pvt ? !isEmptyDataObject(thisCache) : !jQuery.isEmptyObject(thisCache) ) {
				return;
			}
		}
	}

	// See jQuery.data for more information
	if ( !pvt ) {
		delete cache[ id ].data;

		// Don't destroy the parent cache unless the internal data object
		// had been the only thing left in it
		if ( !isEmptyDataObject( cache[ id ] ) ) {
			return;
		}
	}

	// Destroy the cache
	if ( isNode ) {
		jQuery.cleanData( [ elem ], true );

	// Use delete when supported for expandos or `cache` is not a window per isWindow (#10080)
	/* jshint eqeqeq: false */
	} else if ( support.deleteExpando || cache != cache.window ) {
		/* jshint eqeqeq: true */
		delete cache[ id ];

	// When all else fails, null
	} else {
		cache[ id ] = null;
	}
}

jQuery.extend({
	cache: {},

	// The following elements (space-suffixed to avoid Object.prototype collisions)
	// throw uncatchable exceptions if you attempt to set expando properties
	noData: {
		"applet ": true,
		"embed ": true,
		// ...but Flash objects (which have this classid) *can* handle expandos
		"object ": "clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"
	},

	hasData: function( elem ) {
		elem = elem.nodeType ? jQuery.cache[ elem[jQuery.expando] ] : elem[ jQuery.expando ];
		return !!elem && !isEmptyDataObject( elem );
	},

	data: function( elem, name, data ) {
		return internalData( elem, name, data );
	},

	removeData: function( elem, name ) {
		return internalRemoveData( elem, name );
	},

	// For internal use only.
	_data: function( elem, name, data ) {
		return internalData( elem, name, data, true );
	},

	_removeData: function( elem, name ) {
		return internalRemoveData( elem, name, true );
	}
});

jQuery.fn.extend({
	data: function( key, value ) {
		var i, name, data,
			elem = this[0],
			attrs = elem && elem.attributes;

		// Special expections of .data basically thwart jQuery.access,
		// so implement the relevant behavior ourselves

		// Gets all values
		if ( key === undefined ) {
			if ( this.length ) {
				data = jQuery.data( elem );

				if ( elem.nodeType === 1 && !jQuery._data( elem, "parsedAttrs" ) ) {
					i = attrs.length;
					while ( i-- ) {
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
			elem ? dataAttr( elem, key, jQuery.data( elem, key ) ) : undefined;
	},

	removeData: function( key ) {
		return this.each(function() {
			jQuery.removeData( this, key );
		});
	}
});


jQuery.extend({
	queue: function( elem, type, data ) {
		var queue;

		if ( elem ) {
			type = ( type || "fx" ) + "queue";
			queue = jQuery._data( elem, type );

			// Speed up dequeue by getting out quickly if this is just a lookup
			if ( data ) {
				if ( !queue || jQuery.isArray(data) ) {
					queue = jQuery._data( elem, type, jQuery.makeArray(data) );
				} else {
					queue.push( data );
				}
			}
			return queue || [];
		}
	},

	dequeue: function( elem, type ) {
		type = type || "fx";

		var queue = jQuery.queue( elem, type ),
			startLength = queue.length,
			fn = queue.shift(),
			hooks = jQuery._queueHooks( elem, type ),
			next = function() {
				jQuery.dequeue( elem, type );
			};

		// If the fx queue is dequeued, always remove the progress sentinel
		if ( fn === "inprogress" ) {
			fn = queue.shift();
			startLength--;
		}

		if ( fn ) {

			// Add a progress sentinel to prevent the fx queue from being
			// automatically dequeued
			if ( type === "fx" ) {
				queue.unshift( "inprogress" );
			}

			// clear up the last queue stop function
			delete hooks.stop;
			fn.call( elem, next, hooks );
		}

		if ( !startLength && hooks ) {
			hooks.empty.fire();
		}
	},

	// not intended for public consumption - generates a queueHooks object, or returns the current one
	_queueHooks: function( elem, type ) {
		var key = type + "queueHooks";
		return jQuery._data( elem, key ) || jQuery._data( elem, key, {
			empty: jQuery.Callbacks("once memory").add(function() {
				jQuery._removeData( elem, type + "queue" );
				jQuery._removeData( elem, key );
			})
		});
	}
});

jQuery.fn.extend({
	queue: function( type, data ) {
		var setter = 2;

		if ( typeof type !== "string" ) {
			data = type;
			type = "fx";
			setter--;
		}

		if ( arguments.length < setter ) {
			return jQuery.queue( this[0], type );
		}

		return data === undefined ?
			this :
			this.each(function() {
				var queue = jQuery.queue( this, type, data );

				// ensure a hooks for this queue
				jQuery._queueHooks( this, type );

				if ( type === "fx" && queue[0] !== "inprogress" ) {
					jQuery.dequeue( this, type );
				}
			});
	},
	dequeue: function( type ) {
		return this.each(function() {
			jQuery.dequeue( this, type );
		});
	},
	clearQueue: function( type ) {
		return this.queue( type || "fx", [] );
	},
	// Get a promise resolved when queues of a certain type
	// are emptied (fx is the type by default)
	promise: function( type, obj ) {
		var tmp,
			count = 1,
			defer = jQuery.Deferred(),
			elements = this,
			i = this.length,
			resolve = function() {
				if ( !( --count ) ) {
					defer.resolveWith( elements, [ elements ] );
				}
			};

		if ( typeof type !== "string" ) {
			obj = type;
			type = undefined;
		}
		type = type || "fx";

		while ( i-- ) {
			tmp = jQuery._data( elements[ i ], type + "queueHooks" );
			if ( tmp && tmp.empty ) {
				count++;
				tmp.empty.add( resolve );
			}
		}
		resolve();
		return defer.promise( obj );
	}
});
var pnum = (/[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/).source;

var cssExpand = [ "Top", "Right", "Bottom", "Left" ];

var isHidden = function( elem, el ) {
		// isHidden might be called from jQuery#filter function;
		// in that case, element will be second argument
		elem = el || elem;
		return jQuery.css( elem, "display" ) === "none" || !jQuery.contains( elem.ownerDocument, elem );
	};



// Multifunctional method to get and set values of a collection
// The value/s can optionally be executed if it's a function
var access = jQuery.access = function( elems, fn, key, value, chainable, emptyGet, raw ) {
	var i = 0,
		length = elems.length,
		bulk = key == null;

	// Sets many values
	if ( jQuery.type( key ) === "object" ) {
		chainable = true;
		for ( i in key ) {
			jQuery.access( elems, fn, i, key[i], true, emptyGet, raw );
		}

	// Sets one value
	} else if ( value !== undefined ) {
		chainable = true;

		if ( !jQuery.isFunction( value ) ) {
			raw = true;
		}

		if ( bulk ) {
			// Bulk operations run against the entire set
			if ( raw ) {
				fn.call( elems, value );
				fn = null;

			// ...except when executing function values
			} else {
				bulk = fn;
				fn = function( elem, key, value ) {
					return bulk.call( jQuery( elem ), value );
				};
			}
		}

		if ( fn ) {
			for ( ; i < length; i++ ) {
				fn( elems[i], key, raw ? value : value.call( elems[i], i, fn( elems[i], key ) ) );
			}
		}
	}

	return chainable ?
		elems :

		// Gets
		bulk ?
			fn.call( elems ) :
			length ? fn( elems[0], key ) : emptyGet;
};
var rcheckableType = (/^(?:checkbox|radio)$/i);



(function() {
	var fragment = document.createDocumentFragment(),
		div = document.createElement("div"),
		input = document.createElement("input");

	// Setup
	div.setAttribute( "className", "t" );
	div.innerHTML = "  <link/><table></table><a href='/a'>a</a>";

	// IE strips leading whitespace when .innerHTML is used
	support.leadingWhitespace = div.firstChild.nodeType === 3;

	// Make sure that tbody elements aren't automatically inserted
	// IE will insert them into empty tables
	support.tbody = !div.getElementsByTagName( "tbody" ).length;

	// Make sure that link elements get serialized correctly by innerHTML
	// This requires a wrapper element in IE
	support.htmlSerialize = !!div.getElementsByTagName( "link" ).length;

	// Makes sure cloning an html5 element does not cause problems
	// Where outerHTML is undefined, this still works
	support.html5Clone =
		document.createElement( "nav" ).cloneNode( true ).outerHTML !== "<:nav></:nav>";

	// Check if a disconnected checkbox will retain its checked
	// value of true after appended to the DOM (IE6/7)
	input.type = "checkbox";
	input.checked = true;
	fragment.appendChild( input );
	support.appendChecked = input.checked;

	// Make sure textarea (and checkbox) defaultValue is properly cloned
	// Support: IE6-IE11+
	div.innerHTML = "<textarea>x</textarea>";
	support.noCloneChecked = !!div.cloneNode( true ).lastChild.defaultValue;

	// #11217 - WebKit loses check when the name is after the checked attribute
	fragment.appendChild( div );
	div.innerHTML = "<input type='radio' checked='checked' name='t'/>";

	// Support: Safari 5.1, iOS 5.1, Android 4.x, Android 2.3
	// old WebKit doesn't clone checked state correctly in fragments
	support.checkClone = div.cloneNode( true ).cloneNode( true ).lastChild.checked;

	// Support: IE<9
	// Opera does not clone events (and typeof div.attachEvent === undefined).
	// IE9-10 clones events bound via attachEvent, but they don't trigger with .click()
	support.noCloneEvent = true;
	if ( div.attachEvent ) {
		div.attachEvent( "onclick", function() {
			support.noCloneEvent = false;
		});

		div.cloneNode( true ).click();
	}

	// Execute the test only if not already executed in another module.
	if (support.deleteExpando == null) {
		// Support: IE<9
		support.deleteExpando = true;
		try {
			delete div.test;
		} catch( e ) {
			support.deleteExpando = false;
		}
	}

	// Null elements to avoid leaks in IE.
	fragment = div = input = null;
})();


(function() {
	var i, eventName,
		div = document.createElement( "div" );

	// Support: IE<9 (lack submit/change bubble), Firefox 23+ (lack focusin event)
	for ( i in { submit: true, change: true, focusin: true }) {
		eventName = "on" + i;

		if ( !(support[ i + "Bubbles" ] = eventName in window) ) {
			// Beware of CSP restrictions (https://developer.mozilla.org/en/Security/CSP)
			div.setAttribute( eventName, "t" );
			support[ i + "Bubbles" ] = div.attributes[ eventName ].expando === false;
		}
	}

	// Null elements to avoid leaks in IE.
	div = null;
})();


var rformElems = /^(?:input|select|textarea)$/i,
	rkeyEvent = /^key/,
	rmouseEvent = /^(?:mouse|contextmenu)|click/,
	rfocusMorph = /^(?:focusinfocus|focusoutblur)$/,
	rtypenamespace = /^([^.]*)(?:\.(.+)|)$/;

function returnTrue() {
	return true;
}

function returnFalse() {
	return false;
}

function safeActiveElement() {
	try {
		return document.activeElement;
	} catch ( err ) { }
}

/*
 * Helper functions for managing events -- not part of the public interface.
 * Props to Dean Edwards' addEvent library for many of the ideas.
 */
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
				return typeof jQuery !== strundefined && (!e || jQuery.event.triggered !== e.type) ?
					jQuery.event.dispatch.apply( eventHandle.elem, arguments ) :
					undefined;
			};
			// Add elem as a property of the handle fn to prevent a memory leak with IE non-native events
			eventHandle.elem = elem;
		}

		// Handle multiple events separated by a space
		types = ( types || "" ).match( rnotwhite ) || [ "" ];
		t = types.length;
		while ( t-- ) {
			tmp = rtypenamespace.exec( types[t] ) || [];
			type = origType = tmp[1];
			namespaces = ( tmp[2] || "" ).split( "." ).sort();

			// There *must* be a type, no attaching namespace-only handlers
			if ( !type ) {
				continue;
			}

			// If event changes its type, use the special event handlers for the changed type
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
					// Bind the global event handler to the element
					if ( elem.addEventListener ) {
						elem.addEventListener( type, eventHandle, false );

					} else if ( elem.attachEvent ) {
						elem.attachEvent( "on" + type, eventHandle );
					}
				}
			}

			if ( special.add ) {
				special.add.call( elem, handleObj );

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
		types = ( types || "" ).match( rnotwhite ) || [ "" ];
		t = types.length;
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
			type = hasOwn.call( event, "type" ) ? event.type : event,
			namespaces = hasOwn.call( event, "namespace" ) ? event.namespace.split(".") : [];

		cur = tmp = elem = elem || document;

		// Don't do events on text and comment nodes
		if ( elem.nodeType === 3 || elem.nodeType === 8 ) {
			return;
		}

		// focus/blur morphs to focusin/out; ensure we're not firing them right now
		if ( rfocusMorph.test( type + jQuery.event.triggered ) ) {
			return;
		}

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
		if ( !event.target ) {
			event.target = elem;
		}

		// Clone any incoming data and prepend the event, creating the handler arg list
		data = data == null ?
			[ event ] :
			jQuery.makeArray( data, [ event ] );

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
		i = 0;
		while ( (cur = eventPath[i++]) && !event.isPropagationStopped() ) {

			event.type = i > 1 ?
				bubbleType :
				special.bindType || type;

			// jQuery handler
			handle = ( jQuery._data( cur, "events" ) || {} )[ event.type ] && jQuery._data( cur, "handle" );
			if ( handle ) {
				handle.apply( cur, data );
			}

			// Native handler
			handle = ontype && cur[ ontype ];
			if ( handle && handle.apply && jQuery.acceptData( cur ) ) {
				event.result = handle.apply( cur, data );
				if ( event.result === false ) {
					event.preventDefault();
				}
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

		// Make a writable jQuery.Event from the native event object
		event = jQuery.event.fix( event );

		var i, ret, handleObj, matched, j,
			handlerQueue = [],
			args = slice.call( arguments ),
			handlers = ( jQuery._data( this, "events" ) || {} )[ event.type ] || [],
			special = jQuery.event.special[ event.type ] || {};

		// Use the fix-ed jQuery.Event rather than the (read-only) native event
		args[0] = event;
		event.delegateTarget = this;

		// Call the preDispatch hook for the mapped type, and let it bail if desired
		if ( special.preDispatch && special.preDispatch.call( this, event ) === false ) {
			return;
		}

		// Determine handlers
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

					ret = ( (jQuery.event.special[ handleObj.origType ] || {}).handle || handleObj.handler )
							.apply( matched.elem, args );

					if ( ret !== undefined ) {
						if ( (event.result = ret) === false ) {
							event.preventDefault();
							event.stopPropagation();
						}
					}
				}
			}
		}

		// Call the postDispatch hook for the mapped type
		if ( special.postDispatch ) {
			special.postDispatch.call( this, event );
		}

		return event.result;
	},

	handlers: function( event, handlers ) {
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

	fix: function( event ) {
		if ( event[ jQuery.expando ] ) {
			return event;
		}

		// Create a writable copy of the event object and normalize some properties
		var i, prop, copy,
			type = event.type,
			originalEvent = event,
			fixHook = this.fixHooks[ type ];

		if ( !fixHook ) {
			this.fixHooks[ type ] = fixHook =
				rmouseEvent.test( type ) ? this.mouseHooks :
				rkeyEvent.test( type ) ? this.keyHooks :
				{};
		}
		copy = fixHook.props ? this.props.concat( fixHook.props ) : this.props;

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

		return fixHook.filter ? fixHook.filter( event, originalEvent ) : event;
	},

	// Includes some event props shared by KeyEvent and MouseEvent
	props: "altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),

	fixHooks: {},

	keyHooks: {
		props: "char charCode key keyCode".split(" "),
		filter: function( event, original ) {

			// Add which for key events
			if ( event.which == null ) {
				event.which = original.charCode != null ? original.charCode : original.keyCode;
			}

			return event;
		}
	},

	mouseHooks: {
		props: "button buttons clientX clientY fromElement offsetX offsetY pageX pageY screenX screenY toElement".split(" "),
		filter: function( event, original ) {
			var body, eventDoc, doc,
				button = original.button,
				fromElement = original.fromElement;

			// Calculate pageX/Y if missing and clientX/Y available
			if ( event.pageX == null && original.clientX != null ) {
				eventDoc = event.target.ownerDocument || document;
				doc = eventDoc.documentElement;
				body = eventDoc.body;

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
				if ( jQuery.nodeName( this, "input" ) && this.type === "checkbox" && this.click ) {
					this.click();
					return false;
				}
			},

			// For cross-browser consistency, don't fire native .click() on links
			_default: function( event ) {
				return jQuery.nodeName( event.target, "a" );
			}
		},

		beforeunload: {
			postDispatch: function( event ) {

				// Even when returnValue equals to undefined Firefox will still show alert
				if ( event.result !== undefined ) {
					event.originalEvent.returnValue = event.result;
				}
			}
		}
	},

	simulate: function( type, elem, event, bubble ) {
		// Piggyback on a donor event to simulate a different one.
		// Fake originalEvent to avoid donor's stopPropagation, but if the
		// simulated event prevents default then we do the same on the donor.
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
			jQuery.event.trigger( e, null, elem );
		} else {
			jQuery.event.dispatch.call( elem, e );
		}
		if ( e.isDefaultPrevented() ) {
			event.preventDefault();
		}
	}
};

jQuery.removeEvent = document.removeEventListener ?
	function( elem, type, handle ) {
		if ( elem.removeEventListener ) {
			elem.removeEventListener( type, handle, false );
		}
	} :
	function( elem, type, handle ) {
		var name = "on" + type;

		if ( elem.detachEvent ) {

			// #8545, #7054, preventing memory leaks for custom events in IE6-8
			// detachEvent needed property on element, by name of that event, to properly expose it to GC
			if ( typeof elem[ name ] === strundefined ) {
				elem[ name ] = null;
			}

			elem.detachEvent( name, handle );
		}
	};

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
		this.isDefaultPrevented = src.defaultPrevented ||
				src.defaultPrevented === undefined && (
				// Support: IE < 9
				src.returnValue === false ||
				// Support: Android < 4.0
				src.getPreventDefault && src.getPreventDefault() ) ?
			returnTrue :
			returnFalse;

	// Event type
	} else {
		this.type = src;
	}

	// Put explicitly provided properties onto the event object
	if ( props ) {
		jQuery.extend( this, props );
	}

	// Create a timestamp if incoming event doesn't have one
	this.timeStamp = src && src.timeStamp || jQuery.now();

	// Mark it as fixed
	this[ jQuery.expando ] = true;
};

// jQuery.Event is based on DOM3 Events as specified by the ECMAScript Language Binding
// http://www.w3.org/TR/2003/WD-DOM-Level-3-Events-20030331/ecma-script-binding.html
jQuery.Event.prototype = {
	isDefaultPrevented: returnFalse,
	isPropagationStopped: returnFalse,
	isImmediatePropagationStopped: returnFalse,

	preventDefault: function() {
		var e = this.originalEvent;

		this.isDefaultPrevented = returnTrue;
		if ( !e ) {
			return;
		}

		// If preventDefault exists, run it on the original event
		if ( e.preventDefault ) {
			e.preventDefault();

		// Support: IE
		// Otherwise set the returnValue property of the original event to false
		} else {
			e.returnValue = false;
		}
	},
	stopPropagation: function() {
		var e = this.originalEvent;

		this.isPropagationStopped = returnTrue;
		if ( !e ) {
			return;
		}
		// If stopPropagation exists, run it on the original event
		if ( e.stopPropagation ) {
			e.stopPropagation();
		}

		// Support: IE
		// Set the cancelBubble property of the original event to true
		e.cancelBubble = true;
	},
	stopImmediatePropagation: function() {
		this.isImmediatePropagationStopped = returnTrue;
		this.stopPropagation();
	}
};

// Create mouseenter/leave events using mouseover/out and event-time checks
jQuery.each({
	mouseenter: "mouseover",
	mouseleave: "mouseout"
}, function( orig, fix ) {
	jQuery.event.special[ orig ] = {
		delegateType: fix,
		bindType: fix,

		handle: function( event ) {
			var ret,
				target = this,
				related = event.relatedTarget,
				handleObj = event.handleObj;

			// For mousenter/leave call the handler if related is outside the target.
			// NB: No relatedTarget if the mouse left/entered the browser window
			if ( !related || (related !== target && !jQuery.contains( target, related )) ) {
				event.type = handleObj.origType;
				ret = handleObj.handler.apply( this, arguments );
				event.type = fix;
			}
			return ret;
		}
	};
});

// IE submit delegation
if ( !support.submitBubbles ) {

	jQuery.event.special.submit = {
		setup: function() {
			// Only need this for delegated form submit events
			if ( jQuery.nodeName( this, "form" ) ) {
				return false;
			}

			// Lazy-add a submit handler when a descendant form may potentially be submitted
			jQuery.event.add( this, "click._submit keypress._submit", function( e ) {
				// Node name check avoids a VML-related crash in IE (#9807)
				var elem = e.target,
					form = jQuery.nodeName( elem, "input" ) || jQuery.nodeName( elem, "button" ) ? elem.form : undefined;
				if ( form && !jQuery._data( form, "submitBubbles" ) ) {
					jQuery.event.add( form, "submit._submit", function( event ) {
						event._submit_bubble = true;
					});
					jQuery._data( form, "submitBubbles", true );
				}
			});
			// return undefined since we don't need an event listener
		},

		postDispatch: function( event ) {
			// If form was submitted by the user, bubble the event up the tree
			if ( event._submit_bubble ) {
				delete event._submit_bubble;
				if ( this.parentNode && !event.isTrigger ) {
					jQuery.event.simulate( "submit", this.parentNode, event, true );
				}
			}
		},

		teardown: function() {
			// Only need this for delegated form submit events
			if ( jQuery.nodeName( this, "form" ) ) {
				return false;
			}

			// Remove delegated handlers; cleanData eventually reaps submit handlers attached above
			jQuery.event.remove( this, "._submit" );
		}
	};
}

// IE change delegation and checkbox/radio fix
if ( !support.changeBubbles ) {

	jQuery.event.special.change = {

		setup: function() {

			if ( rformElems.test( this.nodeName ) ) {
				// IE doesn't fire change on a check/radio until blur; trigger it on click
				// after a propertychange. Eat the blur-change in special.change.handle.
				// This still fires onchange a second time for check/radio after blur.
				if ( this.type === "checkbox" || this.type === "radio" ) {
					jQuery.event.add( this, "propertychange._change", function( event ) {
						if ( event.originalEvent.propertyName === "checked" ) {
							this._just_changed = true;
						}
					});
					jQuery.event.add( this, "click._change", function( event ) {
						if ( this._just_changed && !event.isTrigger ) {
							this._just_changed = false;
						}
						// Allow triggered, simulated change events (#11500)
						jQuery.event.simulate( "change", this, event, true );
					});
				}
				return false;
			}
			// Delegated event; lazy-add a change handler on descendant inputs
			jQuery.event.add( this, "beforeactivate._change", function( e ) {
				var elem = e.target;

				if ( rformElems.test( elem.nodeName ) && !jQuery._data( elem, "changeBubbles" ) ) {
					jQuery.event.add( elem, "change._change", function( event ) {
						if ( this.parentNode && !event.isSimulated && !event.isTrigger ) {
							jQuery.event.simulate( "change", this.parentNode, event, true );
						}
					});
					jQuery._data( elem, "changeBubbles", true );
				}
			});
		},

		handle: function( event ) {
			var elem = event.target;

			// Swallow native change events from checkbox/radio, we already triggered them above
			if ( this !== elem || event.isSimulated || event.isTrigger || (elem.type !== "radio" && elem.type !== "checkbox") ) {
				return event.handleObj.handler.apply( this, arguments );
			}
		},

		teardown: function() {
			jQuery.event.remove( this, "._change" );

			return !rformElems.test( this.nodeName );
		}
	};
}

// Create "bubbling" focus and blur events
if ( !support.focusinBubbles ) {
	jQuery.each({ focus: "focusin", blur: "focusout" }, function( orig, fix ) {

		// Attach a single capturing handler on the document while someone wants focusin/focusout
		var handler = function( event ) {
				jQuery.event.simulate( fix, event.target, jQuery.event.fix( event ), true );
			};

		jQuery.event.special[ fix ] = {
			setup: function() {
				var doc = this.ownerDocument || this,
					attaches = jQuery._data( doc, fix );

				if ( !attaches ) {
					doc.addEventListener( orig, handler, true );
				}
				jQuery._data( doc, fix, ( attaches || 0 ) + 1 );
			},
			teardown: function() {
				var doc = this.ownerDocument || this,
					attaches = jQuery._data( doc, fix ) - 1;

				if ( !attaches ) {
					doc.removeEventListener( orig, handler, true );
					jQuery._removeData( doc, fix );
				} else {
					jQuery._data( doc, fix, attaches );
				}
			}
		};
	});
}

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

		if ( one === 1 ) {
			origFn = fn;
			fn = function( event ) {
				// Can use an empty set, since event contains the info
				jQuery().off( event );
				return origFn.apply( this, arguments );
			};
			// Use same guid so caller can remove using origFn
			fn.guid = origFn.guid || ( origFn.guid = jQuery.guid++ );
		}
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


function createSafeFragment( document ) {
	var list = nodeNames.split( "|" ),
		safeFrag = document.createDocumentFragment();

	if ( safeFrag.createElement ) {
		while ( list.length ) {
			safeFrag.createElement(
				list.pop()
			);
		}
	}
	return safeFrag;
}

var nodeNames = "abbr|article|aside|audio|bdi|canvas|data|datalist|details|figcaption|figure|footer|" +
		"header|hgroup|mark|meter|nav|output|progress|section|summary|time|video",
	rinlinejQuery = / jQuery\d+="(?:null|\d+)"/g,
	rnoshimcache = new RegExp("<(?:" + nodeNames + ")[\\s/>]", "i"),
	rleadingWhitespace = /^\s+/,
	rxhtmlTag = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,
	rtagName = /<([\w:]+)/,
	rtbody = /<tbody/i,
	rhtml = /<|&#?\w+;/,
	rnoInnerhtml = /<(?:script|style|link)/i,
	// checked="checked" or checked
	rchecked = /checked\s*(?:[^=]|=\s*.checked.)/i,
	rscriptType = /^$|\/(?:java|ecma)script/i,
	rscriptTypeMasked = /^true\/(.*)/,
	rcleanScript = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g,

	// We have to close these tags to support XHTML (#13200)
	wrapMap = {
		option: [ 1, "<select multiple='multiple'>", "</select>" ],
		legend: [ 1, "<fieldset>", "</fieldset>" ],
		area: [ 1, "<map>", "</map>" ],
		param: [ 1, "<object>", "</object>" ],
		thead: [ 1, "<table>", "</table>" ],
		tr: [ 2, "<table><tbody>", "</tbody></table>" ],
		col: [ 2, "<table><tbody></tbody><colgroup>", "</colgroup></table>" ],
		td: [ 3, "<table><tbody><tr>", "</tr></tbody></table>" ],

		// IE6-8 can't serialize link, script, style, or any html5 (NoScope) tags,
		// unless wrapped in a div with non-breaking characters in front of it.
		_default: support.htmlSerialize ? [ 0, "", "" ] : [ 1, "X<div>", "</div>"  ]
	},
	safeFragment = createSafeFragment( document ),
	fragmentDiv = safeFragment.appendChild( document.createElement("div") );

wrapMap.optgroup = wrapMap.option;
wrapMap.tbody = wrapMap.tfoot = wrapMap.colgroup = wrapMap.caption = wrapMap.thead;
wrapMap.th = wrapMap.td;

function getAll( context, tag ) {
	var elems, elem,
		i = 0,
		found = typeof context.getElementsByTagName !== strundefined ? context.getElementsByTagName( tag || "*" ) :
			typeof context.querySelectorAll !== strundefined ? context.querySelectorAll( tag || "*" ) :
			undefined;

	if ( !found ) {
		for ( found = [], elems = context.childNodes || context; (elem = elems[i]) != null; i++ ) {
			if ( !tag || jQuery.nodeName( elem, tag ) ) {
				found.push( elem );
			} else {
				jQuery.merge( found, getAll( elem, tag ) );
			}
		}
	}

	return tag === undefined || tag && jQuery.nodeName( context, tag ) ?
		jQuery.merge( [ context ], found ) :
		found;
}

// Used in buildFragment, fixes the defaultChecked property
function fixDefaultChecked( elem ) {
	if ( rcheckableType.test( elem.type ) ) {
		elem.defaultChecked = elem.checked;
	}
}

// Support: IE<8
// Manipulating tables requires a tbody
function manipulationTarget( elem, content ) {
	return jQuery.nodeName( elem, "table" ) &&
		jQuery.nodeName( content.nodeType !== 11 ? content : content.firstChild, "tr" ) ?

		elem.getElementsByTagName("tbody")[0] ||
			elem.appendChild( elem.ownerDocument.createElement("tbody") ) :
		elem;
}

// Replace/restore the type attribute of script elements for safe DOM manipulation
function disableScript( elem ) {
	elem.type = (jQuery.find.attr( elem, "type" ) !== null) + "/" + elem.type;
	return elem;
}
function restoreScript( elem ) {
	var match = rscriptTypeMasked.exec( elem.type );
	if ( match ) {
		elem.type = match[1];
	} else {
		elem.removeAttribute("type");
	}
	return elem;
}

// Mark scripts as having already been evaluated
function setGlobalEval( elems, refElements ) {
	var elem,
		i = 0;
	for ( ; (elem = elems[i]) != null; i++ ) {
		jQuery._data( elem, "globalEval", !refElements || jQuery._data( refElements[i], "globalEval" ) );
	}
}

function cloneCopyEvent( src, dest ) {

	if ( dest.nodeType !== 1 || !jQuery.hasData( src ) ) {
		return;
	}

	var type, i, l,
		oldData = jQuery._data( src ),
		curData = jQuery._data( dest, oldData ),
		events = oldData.events;

	if ( events ) {
		delete curData.handle;
		curData.events = {};

		for ( type in events ) {
			for ( i = 0, l = events[ type ].length; i < l; i++ ) {
				jQuery.event.add( dest, type, events[ type ][ i ] );
			}
		}
	}

	// make the cloned public data object a copy from the original
	if ( curData.data ) {
		curData.data = jQuery.extend( {}, curData.data );
	}
}

function fixCloneNodeIssues( src, dest ) {
	var nodeName, e, data;

	// We do not need to do anything for non-Elements
	if ( dest.nodeType !== 1 ) {
		return;
	}

	nodeName = dest.nodeName.toLowerCase();

	// IE6-8 copies events bound via attachEvent when using cloneNode.
	if ( !support.noCloneEvent && dest[ jQuery.expando ] ) {
		data = jQuery._data( dest );

		for ( e in data.events ) {
			jQuery.removeEvent( dest, e, data.handle );
		}

		// Event data gets referenced instead of copied if the expando gets copied too
		dest.removeAttribute( jQuery.expando );
	}

	// IE blanks contents when cloning scripts, and tries to evaluate newly-set text
	if ( nodeName === "script" && dest.text !== src.text ) {
		disableScript( dest ).text = src.text;
		restoreScript( dest );

	// IE6-10 improperly clones children of object elements using classid.
	// IE10 throws NoModificationAllowedError if parent is null, #12132.
	} else if ( nodeName === "object" ) {
		if ( dest.parentNode ) {
			dest.outerHTML = src.outerHTML;
		}

		// This path appears unavoidable for IE9. When cloning an object
		// element in IE9, the outerHTML strategy above is not sufficient.
		// If the src has innerHTML and the destination does not,
		// copy the src.innerHTML into the dest.innerHTML. #10324
		if ( support.html5Clone && ( src.innerHTML && !jQuery.trim(dest.innerHTML) ) ) {
			dest.innerHTML = src.innerHTML;
		}

	} else if ( nodeName === "input" && rcheckableType.test( src.type ) ) {
		// IE6-8 fails to persist the checked state of a cloned checkbox
		// or radio button. Worse, IE6-7 fail to give the cloned element
		// a checked appearance if the defaultChecked value isn't also set

		dest.defaultChecked = dest.checked = src.checked;

		// IE6-7 get confused and end up setting the value of a cloned
		// checkbox/radio button to an empty string instead of "on"
		if ( dest.value !== src.value ) {
			dest.value = src.value;
		}

	// IE6-8 fails to return the selected option to the default selected
	// state when cloning options
	} else if ( nodeName === "option" ) {
		dest.defaultSelected = dest.selected = src.defaultSelected;

	// IE6-8 fails to set the defaultValue to the correct value when
	// cloning other types of input fields
	} else if ( nodeName === "input" || nodeName === "textarea" ) {
		dest.defaultValue = src.defaultValue;
	}
}

jQuery.extend({
	clone: function( elem, dataAndEvents, deepDataAndEvents ) {
		var destElements, node, clone, i, srcElements,
			inPage = jQuery.contains( elem.ownerDocument, elem );

		if ( support.html5Clone || jQuery.isXMLDoc(elem) || !rnoshimcache.test( "<" + elem.nodeName + ">" ) ) {
			clone = elem.cloneNode( true );

		// IE<=8 does not properly clone detached, unknown element nodes
		} else {
			fragmentDiv.innerHTML = elem.outerHTML;
			fragmentDiv.removeChild( clone = fragmentDiv.firstChild );
		}

		if ( (!support.noCloneEvent || !support.noCloneChecked) &&
				(elem.nodeType === 1 || elem.nodeType === 11) && !jQuery.isXMLDoc(elem) ) {

			// We eschew Sizzle here for performance reasons: http://jsperf.com/getall-vs-sizzle/2
			destElements = getAll( clone );
			srcElements = getAll( elem );

			// Fix all IE cloning issues
			for ( i = 0; (node = srcElements[i]) != null; ++i ) {
				// Ensure that the destination node is not null; Fixes #9587
				if ( destElements[i] ) {
					fixCloneNodeIssues( node, destElements[i] );
				}
			}
		}

		// Copy the events from the original to the clone
		if ( dataAndEvents ) {
			if ( deepDataAndEvents ) {
				srcElements = srcElements || getAll( elem );
				destElements = destElements || getAll( clone );

				for ( i = 0; (node = srcElements[i]) != null; i++ ) {
					cloneCopyEvent( node, destElements[i] );
				}
			} else {
				cloneCopyEvent( elem, clone );
			}
		}

		// Preserve script evaluation history
		destElements = getAll( clone, "script" );
		if ( destElements.length > 0 ) {
			setGlobalEval( destElements, !inPage && getAll( elem, "script" ) );
		}

		destElements = srcElements = node = null;

		// Return the cloned set
		return clone;
	},

	buildFragment: function( elems, context, scripts, selection ) {
		var j, elem, contains,
			tmp, tag, tbody, wrap,
			l = elems.length,

			// Ensure a safe fragment
			safe = createSafeFragment( context ),

			nodes = [],
			i = 0;

		for ( ; i < l; i++ ) {
			elem = elems[ i ];

			if ( elem || elem === 0 ) {

				// Add nodes directly
				if ( jQuery.type( elem ) === "object" ) {
					jQuery.merge( nodes, elem.nodeType ? [ elem ] : elem );

				// Convert non-html into a text node
				} else if ( !rhtml.test( elem ) ) {
					nodes.push( context.createTextNode( elem ) );

				// Convert html into DOM nodes
				} else {
					tmp = tmp || safe.appendChild( context.createElement("div") );

					// Deserialize a standard representation
					tag = (rtagName.exec( elem ) || [ "", "" ])[ 1 ].toLowerCase();
					wrap = wrapMap[ tag ] || wrapMap._default;

					tmp.innerHTML = wrap[1] + elem.replace( rxhtmlTag, "<$1></$2>" ) + wrap[2];

					// Descend through wrappers to the right content
					j = wrap[0];
					while ( j-- ) {
						tmp = tmp.lastChild;
					}

					// Manually add leading whitespace removed by IE
					if ( !support.leadingWhitespace && rleadingWhitespace.test( elem ) ) {
						nodes.push( context.createTextNode( rleadingWhitespace.exec( elem )[0] ) );
					}

					// Remove IE's autoinserted <tbody> from table fragments
					if ( !support.tbody ) {

						// String was a <table>, *may* have spurious <tbody>
						elem = tag === "table" && !rtbody.test( elem ) ?
							tmp.firstChild :

							// String was a bare <thead> or <tfoot>
							wrap[1] === "<table>" && !rtbody.test( elem ) ?
								tmp :
								0;

						j = elem && elem.childNodes.length;
						while ( j-- ) {
							if ( jQuery.nodeName( (tbody = elem.childNodes[j]), "tbody" ) && !tbody.childNodes.length ) {
								elem.removeChild( tbody );
							}
						}
					}

					jQuery.merge( nodes, tmp.childNodes );

					// Fix #12392 for WebKit and IE > 9
					tmp.textContent = "";

					// Fix #12392 for oldIE
					while ( tmp.firstChild ) {
						tmp.removeChild( tmp.firstChild );
					}

					// Remember the top-level container for proper cleanup
					tmp = safe.lastChild;
				}
			}
		}

		// Fix #11356: Clear elements from fragment
		if ( tmp ) {
			safe.removeChild( tmp );
		}

		// Reset defaultChecked for any radios and checkboxes
		// about to be appended to the DOM in IE 6/7 (#8060)
		if ( !support.appendChecked ) {
			jQuery.grep( getAll( nodes, "input" ), fixDefaultChecked );
		}

		i = 0;
		while ( (elem = nodes[ i++ ]) ) {

			// #4087 - If origin and destination elements are the same, and this is
			// that element, do not do anything
			if ( selection && jQuery.inArray( elem, selection ) !== -1 ) {
				continue;
			}

			contains = jQuery.contains( elem.ownerDocument, elem );

			// Append to fragment
			tmp = getAll( safe.appendChild( elem ), "script" );

			// Preserve script evaluation history
			if ( contains ) {
				setGlobalEval( tmp );
			}

			// Capture executables
			if ( scripts ) {
				j = 0;
				while ( (elem = tmp[ j++ ]) ) {
					if ( rscriptType.test( elem.type || "" ) ) {
						scripts.push( elem );
					}
				}
			}
		}

		tmp = null;

		return safe;
	},

	cleanData: function( elems, /* internal */ acceptData ) {
		var elem, type, id, data,
			i = 0,
			internalKey = jQuery.expando,
			cache = jQuery.cache,
			deleteExpando = support.deleteExpando,
			special = jQuery.event.special;

		for ( ; (elem = elems[i]) != null; i++ ) {
			if ( acceptData || jQuery.acceptData( elem ) ) {

				id = elem[ internalKey ];
				data = id && cache[ id ];

				if ( data ) {
					if ( data.events ) {
						for ( type in data.events ) {
							if ( special[ type ] ) {
								jQuery.event.remove( elem, type );

							// This is a shortcut to avoid jQuery.event.remove's overhead
							} else {
								jQuery.removeEvent( elem, type, data.handle );
							}
						}
					}

					// Remove cache only if it was not already removed by jQuery.event.remove
					if ( cache[ id ] ) {

						delete cache[ id ];

						// IE does not allow us to delete expando properties from nodes,
						// nor does it have a removeAttribute function on Document nodes;
						// we must handle all of these cases
						if ( deleteExpando ) {
							delete elem[ internalKey ];

						} else if ( typeof elem.removeAttribute !== strundefined ) {
							elem.removeAttribute( internalKey );

						} else {
							elem[ internalKey ] = null;
						}

						deletedIds.push( id );
					}
				}
			}
		}
	}
});

jQuery.fn.extend({
	text: function( value ) {
		return access( this, function( value ) {
			return value === undefined ?
				jQuery.text( this ) :
				this.empty().append( ( this[0] && this[0].ownerDocument || document ).createTextNode( value ) );
		}, null, value, arguments.length );
	},

	append: function() {
		return this.domManip( arguments, function( elem ) {
			if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
				var target = manipulationTarget( this, elem );
				target.appendChild( elem );
			}
		});
	},

	prepend: function() {
		return this.domManip( arguments, function( elem ) {
			if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
				var target = manipulationTarget( this, elem );
				target.insertBefore( elem, target.firstChild );
			}
		});
	},

	before: function() {
		return this.domManip( arguments, function( elem ) {
			if ( this.parentNode ) {
				this.parentNode.insertBefore( elem, this );
			}
		});
	},

	after: function() {
		return this.domManip( arguments, function( elem ) {
			if ( this.parentNode ) {
				this.parentNode.insertBefore( elem, this.nextSibling );
			}
		});
	},

	remove: function( selector, keepData /* Internal Use Only */ ) {
		var elem,
			elems = selector ? jQuery.filter( selector, this ) : this,
			i = 0;

		for ( ; (elem = elems[i]) != null; i++ ) {

			if ( !keepData && elem.nodeType === 1 ) {
				jQuery.cleanData( getAll( elem ) );
			}

			if ( elem.parentNode ) {
				if ( keepData && jQuery.contains( elem.ownerDocument, elem ) ) {
					setGlobalEval( getAll( elem, "script" ) );
				}
				elem.parentNode.removeChild( elem );
			}
		}

		return this;
	},

	empty: function() {
		var elem,
			i = 0;

		for ( ; (elem = this[i]) != null; i++ ) {
			// Remove element nodes and prevent memory leaks
			if ( elem.nodeType === 1 ) {
				jQuery.cleanData( getAll( elem, false ) );
			}

			// Remove any remaining nodes
			while ( elem.firstChild ) {
				elem.removeChild( elem.firstChild );
			}

			// If this is a select, ensure that it displays empty (#12336)
			// Support: IE<9
			if ( elem.options && jQuery.nodeName( elem, "select" ) ) {
				elem.options.length = 0;
			}
		}

		return this;
	},

	clone: function( dataAndEvents, deepDataAndEvents ) {
		dataAndEvents = dataAndEvents == null ? false : dataAndEvents;
		deepDataAndEvents = deepDataAndEvents == null ? dataAndEvents : deepDataAndEvents;

		return this.map(function() {
			return jQuery.clone( this, dataAndEvents, deepDataAndEvents );
		});
	},

	html: function( value ) {
		return access( this, function( value ) {
			var elem = this[ 0 ] || {},
				i = 0,
				l = this.length;

			if ( value === undefined ) {
				return elem.nodeType === 1 ?
					elem.innerHTML.replace( rinlinejQuery, "" ) :
					undefined;
			}

			// See if we can take a shortcut and just use innerHTML
			if ( typeof value === "string" && !rnoInnerhtml.test( value ) &&
				( support.htmlSerialize || !rnoshimcache.test( value )  ) &&
				( support.leadingWhitespace || !rleadingWhitespace.test( value ) ) &&
				!wrapMap[ (rtagName.exec( value ) || [ "", "" ])[ 1 ].toLowerCase() ] ) {

				value = value.replace( rxhtmlTag, "<$1></$2>" );

				try {
					for (; i < l; i++ ) {
						// Remove element nodes and prevent memory leaks
						elem = this[i] || {};
						if ( elem.nodeType === 1 ) {
							jQuery.cleanData( getAll( elem, false ) );
							elem.innerHTML = value;
						}
					}

					elem = 0;

				// If using innerHTML throws an exception, use the fallback method
				} catch(e) {}
			}

			if ( elem ) {
				this.empty().append( value );
			}
		}, null, value, arguments.length );
	},

	replaceWith: function() {
		var arg = arguments[ 0 ];

		// Make the changes, replacing each context element with the new content
		this.domManip( arguments, function( elem ) {
			arg = this.parentNode;

			jQuery.cleanData( getAll( this ) );

			if ( arg ) {
				arg.replaceChild( elem, this );
			}
		});

		// Force removal if there was no new content (e.g., from empty arguments)
		return arg && (arg.length || arg.nodeType) ? this : this.remove();
	},

	detach: function( selector ) {
		return this.remove( selector, true );
	},

	domManip: function( args, callback ) {

		// Flatten any nested arrays
		args = concat.apply( [], args );

		var first, node, hasScripts,
			scripts, doc, fragment,
			i = 0,
			l = this.length,
			set = this,
			iNoClone = l - 1,
			value = args[0],
			isFunction = jQuery.isFunction( value );

		// We can't cloneNode fragments that contain checked, in WebKit
		if ( isFunction ||
				( l > 1 && typeof value === "string" &&
					!support.checkClone && rchecked.test( value ) ) ) {
			return this.each(function( index ) {
				var self = set.eq( index );
				if ( isFunction ) {
					args[0] = value.call( this, index, self.html() );
				}
				self.domManip( args, callback );
			});
		}

		if ( l ) {
			fragment = jQuery.buildFragment( args, this[ 0 ].ownerDocument, false, this );
			first = fragment.firstChild;

			if ( fragment.childNodes.length === 1 ) {
				fragment = first;
			}

			if ( first ) {
				scripts = jQuery.map( getAll( fragment, "script" ), disableScript );
				hasScripts = scripts.length;

				// Use the original fragment for the last item instead of the first because it can end up
				// being emptied incorrectly in certain situations (#8070).
				for ( ; i < l; i++ ) {
					node = fragment;

					if ( i !== iNoClone ) {
						node = jQuery.clone( node, true, true );

						// Keep references to cloned scripts for later restoration
						if ( hasScripts ) {
							jQuery.merge( scripts, getAll( node, "script" ) );
						}
					}

					callback.call( this[i], node, i );
				}

				if ( hasScripts ) {
					doc = scripts[ scripts.length - 1 ].ownerDocument;

					// Reenable scripts
					jQuery.map( scripts, restoreScript );

					// Evaluate executable scripts on first document insertion
					for ( i = 0; i < hasScripts; i++ ) {
						node = scripts[ i ];
						if ( rscriptType.test( node.type || "" ) &&
							!jQuery._data( node, "globalEval" ) && jQuery.contains( doc, node ) ) {

							if ( node.src ) {
								// Optional AJAX dependency, but won't run scripts if not present
								if ( jQuery._evalUrl ) {
									jQuery._evalUrl( node.src );
								}
							} else {
								jQuery.globalEval( ( node.text || node.textContent || node.innerHTML || "" ).replace( rcleanScript, "" ) );
							}
						}
					}
				}

				// Fix #11809: Avoid leaking memory
				fragment = first = null;
			}
		}

		return this;
	}
});

jQuery.each({
	appendTo: "append",
	prependTo: "prepend",
	insertBefore: "before",
	insertAfter: "after",
	replaceAll: "replaceWith"
}, function( name, original ) {
	jQuery.fn[ name ] = function( selector ) {
		var elems,
			i = 0,
			ret = [],
			insert = jQuery( selector ),
			last = insert.length - 1;

		for ( ; i <= last; i++ ) {
			elems = i === last ? this : this.clone(true);
			jQuery( insert[i] )[ original ]( elems );

			// Modern browsers can apply jQuery collections as arrays, but oldIE needs a .get()
			push.apply( ret, elems.get() );
		}

		return this.pushStack( ret );
	};
});


var iframe,
	elemdisplay = {};

/**
 * Retrieve the actual display of a element
 * @param {String} name nodeName of the element
 * @param {Object} doc Document object
 */
// Called only from within defaultDisplay
function actualDisplay( name, doc ) {
	var elem = jQuery( doc.createElement( name ) ).appendTo( doc.body ),

		// getDefaultComputedStyle might be reliably used only on attached element
		display = window.getDefaultComputedStyle ?

			// Use of this method is a temporary fix (more like optmization) until something better comes along,
			// since it was removed from specification and supported only in FF
			window.getDefaultComputedStyle( elem[ 0 ] ).display : jQuery.css( elem[ 0 ], "display" );

	// We don't have any data stored on the element,
	// so use "detach" method as fast way to get rid of the element
	elem.detach();

	return display;
}

/**
 * Try to determine the default display value of an element
 * @param {String} nodeName
 */
function defaultDisplay( nodeName ) {
	var doc = document,
		display = elemdisplay[ nodeName ];

	if ( !display ) {
		display = actualDisplay( nodeName, doc );

		// If the simple way fails, read from inside an iframe
		if ( display === "none" || !display ) {

			// Use the already-created iframe if possible
			iframe = (iframe || jQuery( "<iframe frameborder='0' width='0' height='0'/>" )).appendTo( doc.documentElement );

			// Always write a new HTML skeleton so Webkit and Firefox don't choke on reuse
			doc = ( iframe[ 0 ].contentWindow || iframe[ 0 ].contentDocument ).document;

			// Support: IE
			doc.write();
			doc.close();

			display = actualDisplay( nodeName, doc );
			iframe.detach();
		}

		// Store the correct default display
		elemdisplay[ nodeName ] = display;
	}

	return display;
}


(function() {
	var a, shrinkWrapBlocksVal,
		div = document.createElement( "div" ),
		divReset =
			"-webkit-box-sizing:content-box;-moz-box-sizing:content-box;box-sizing:content-box;" +
			"display:block;padding:0;margin:0;border:0";

	// Setup
	div.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>";
	a = div.getElementsByTagName( "a" )[ 0 ];

	a.style.cssText = "float:left;opacity:.5";

	// Make sure that element opacity exists
	// (IE uses filter instead)
	// Use a regex to work around a WebKit issue. See #5145
	support.opacity = /^0.5/.test( a.style.opacity );

	// Verify style float existence
	// (IE uses styleFloat instead of cssFloat)
	support.cssFloat = !!a.style.cssFloat;

	div.style.backgroundClip = "content-box";
	div.cloneNode( true ).style.backgroundClip = "";
	support.clearCloneStyle = div.style.backgroundClip === "content-box";

	// Null elements to avoid leaks in IE.
	a = div = null;

	support.shrinkWrapBlocks = function() {
		var body, container, div, containerStyles;

		if ( shrinkWrapBlocksVal == null ) {
			body = document.getElementsByTagName( "body" )[ 0 ];
			if ( !body ) {
				// Test fired too early or in an unsupported environment, exit.
				return;
			}

			containerStyles = "border:0;width:0;height:0;position:absolute;top:0;left:-9999px";
			container = document.createElement( "div" );
			div = document.createElement( "div" );

			body.appendChild( container ).appendChild( div );

			// Will be changed later if needed.
			shrinkWrapBlocksVal = false;

			if ( typeof div.style.zoom !== strundefined ) {
				// Support: IE6
				// Check if elements with layout shrink-wrap their children
				div.style.cssText = divReset + ";width:1px;padding:1px;zoom:1";
				div.innerHTML = "<div></div>";
				div.firstChild.style.width = "5px";
				shrinkWrapBlocksVal = div.offsetWidth !== 3;
			}

			body.removeChild( container );

			// Null elements to avoid leaks in IE.
			body = container = div = null;
		}

		return shrinkWrapBlocksVal;
	};

})();
var rmargin = (/^margin/);

var rnumnonpx = new RegExp( "^(" + pnum + ")(?!px)[a-z%]+$", "i" );



var getStyles, curCSS,
	rposition = /^(top|right|bottom|left)$/;

if ( window.getComputedStyle ) {
	getStyles = function( elem ) {
		return elem.ownerDocument.defaultView.getComputedStyle( elem, null );
	};

	curCSS = function( elem, name, computed ) {
		var width, minWidth, maxWidth, ret,
			style = elem.style;

		computed = computed || getStyles( elem );

		// getPropertyValue is only needed for .css('filter') in IE9, see #12537
		ret = computed ? computed.getPropertyValue( name ) || computed[ name ] : undefined;

		if ( computed ) {

			if ( ret === "" && !jQuery.contains( elem.ownerDocument, elem ) ) {
				ret = jQuery.style( elem, name );
			}

			// A tribute to the "awesome hack by Dean Edwards"
			// Chrome < 17 and Safari 5.0 uses "computed value" instead of "used value" for margin-right
			// Safari 5.1.7 (at least) returns percentage for a larger set of values, but width seems to be reliably pixels
			// this is against the CSSOM draft spec: http://dev.w3.org/csswg/cssom/#resolved-values
			if ( rnumnonpx.test( ret ) && rmargin.test( name ) ) {

				// Remember the original values
				width = style.width;
				minWidth = style.minWidth;
				maxWidth = style.maxWidth;

				// Put in the new values to get a computed value out
				style.minWidth = style.maxWidth = style.width = ret;
				ret = computed.width;

				// Revert the changed values
				style.width = width;
				style.minWidth = minWidth;
				style.maxWidth = maxWidth;
			}
		}

		// Support: IE
		// IE returns zIndex value as an integer.
		return ret === undefined ?
			ret :
			ret + "";
	};
} else if ( document.documentElement.currentStyle ) {
	getStyles = function( elem ) {
		return elem.currentStyle;
	};

	curCSS = function( elem, name, computed ) {
		var left, rs, rsLeft, ret,
			style = elem.style;

		computed = computed || getStyles( elem );
		ret = computed ? computed[ name ] : undefined;

		// Avoid setting ret to empty string here
		// so we don't default to auto
		if ( ret == null && style && style[ name ] ) {
			ret = style[ name ];
		}

		// From the awesome hack by Dean Edwards
		// http://erik.eae.net/archives/2007/07/27/18.54.15/#comment-102291

		// If we're not dealing with a regular pixel number
		// but a number that has a weird ending, we need to convert it to pixels
		// but not position css attributes, as those are proportional to the parent element instead
		// and we can't measure the parent instead because it might trigger a "stacking dolls" problem
		if ( rnumnonpx.test( ret ) && !rposition.test( name ) ) {

			// Remember the original values
			left = style.left;
			rs = elem.runtimeStyle;
			rsLeft = rs && rs.left;

			// Put in the new values to get a computed value out
			if ( rsLeft ) {
				rs.left = elem.currentStyle.left;
			}
			style.left = name === "fontSize" ? "1em" : ret;
			ret = style.pixelLeft + "px";

			// Revert the changed values
			style.left = left;
			if ( rsLeft ) {
				rs.left = rsLeft;
			}
		}

		// Support: IE
		// IE returns zIndex value as an integer.
		return ret === undefined ?
			ret :
			ret + "" || "auto";
	};
}




function addGetHookIf( conditionFn, hookFn ) {
	// Define the hook, we'll check on the first run if it's really needed.
	return {
		get: function() {
			var condition = conditionFn();

			if ( condition == null ) {
				// The test was not ready at this point; screw the hook this time
				// but check again when needed next time.
				return;
			}

			if ( condition ) {
				// Hook not needed (or it's not possible to use it due to missing dependency),
				// remove it.
				// Since there are no other hooks for marginRight, remove the whole object.
				delete this.get;
				return;
			}

			// Hook needed; redefine it so that the support test is not executed again.

			return (this.get = hookFn).apply( this, arguments );
		}
	};
}


(function() {
	var a, reliableHiddenOffsetsVal, boxSizingVal, boxSizingReliableVal,
		pixelPositionVal, reliableMarginRightVal,
		div = document.createElement( "div" ),
		containerStyles = "border:0;width:0;height:0;position:absolute;top:0;left:-9999px",
		divReset =
			"-webkit-box-sizing:content-box;-moz-box-sizing:content-box;box-sizing:content-box;" +
			"display:block;padding:0;margin:0;border:0";

	// Setup
	div.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>";
	a = div.getElementsByTagName( "a" )[ 0 ];

	a.style.cssText = "float:left;opacity:.5";

	// Make sure that element opacity exists
	// (IE uses filter instead)
	// Use a regex to work around a WebKit issue. See #5145
	support.opacity = /^0.5/.test( a.style.opacity );

	// Verify style float existence
	// (IE uses styleFloat instead of cssFloat)
	support.cssFloat = !!a.style.cssFloat;

	div.style.backgroundClip = "content-box";
	div.cloneNode( true ).style.backgroundClip = "";
	support.clearCloneStyle = div.style.backgroundClip === "content-box";

	// Null elements to avoid leaks in IE.
	a = div = null;

	jQuery.extend(support, {
		reliableHiddenOffsets: function() {
			if ( reliableHiddenOffsetsVal != null ) {
				return reliableHiddenOffsetsVal;
			}

			var container, tds, isSupported,
				div = document.createElement( "div" ),
				body = document.getElementsByTagName( "body" )[ 0 ];

			if ( !body ) {
				// Return for frameset docs that don't have a body
				return;
			}

			// Setup
			div.setAttribute( "className", "t" );
			div.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>";

			container = document.createElement( "div" );
			container.style.cssText = containerStyles;

			body.appendChild( container ).appendChild( div );

			// Support: IE8
			// Check if table cells still have offsetWidth/Height when they are set
			// to display:none and there are still other visible table cells in a
			// table row; if so, offsetWidth/Height are not reliable for use when
			// determining if an element has been hidden directly using
			// display:none (it is still safe to use offsets if a parent element is
			// hidden; don safety goggles and see bug #4512 for more information).
			div.innerHTML = "<table><tr><td></td><td>t</td></tr></table>";
			tds = div.getElementsByTagName( "td" );
			tds[ 0 ].style.cssText = "padding:0;margin:0;border:0;display:none";
			isSupported = ( tds[ 0 ].offsetHeight === 0 );

			tds[ 0 ].style.display = "";
			tds[ 1 ].style.display = "none";

			// Support: IE8
			// Check if empty table cells still have offsetWidth/Height
			reliableHiddenOffsetsVal = isSupported && ( tds[ 0 ].offsetHeight === 0 );

			body.removeChild( container );

			// Null elements to avoid leaks in IE.
			div = body = null;

			return reliableHiddenOffsetsVal;
		},

		boxSizing: function() {
			if ( boxSizingVal == null ) {
				computeStyleTests();
			}
			return boxSizingVal;
		},

		boxSizingReliable: function() {
			if ( boxSizingReliableVal == null ) {
				computeStyleTests();
			}
			return boxSizingReliableVal;
		},

		pixelPosition: function() {
			if ( pixelPositionVal == null ) {
				computeStyleTests();
			}
			return pixelPositionVal;
		},

		reliableMarginRight: function() {
			var body, container, div, marginDiv;

			// Use window.getComputedStyle because jsdom on node.js will break without it.
			if ( reliableMarginRightVal == null && window.getComputedStyle ) {
				body = document.getElementsByTagName( "body" )[ 0 ];
				if ( !body ) {
					// Test fired too early or in an unsupported environment, exit.
					return;
				}

				container = document.createElement( "div" );
				div = document.createElement( "div" );
				container.style.cssText = containerStyles;

				body.appendChild( container ).appendChild( div );

				// Check if div with explicit width and no margin-right incorrectly
				// gets computed margin-right based on width of container. (#3333)
				// Fails in WebKit before Feb 2011 nightlies
				// WebKit Bug 13343 - getComputedStyle returns wrong value for margin-right
				marginDiv = div.appendChild( document.createElement( "div" ) );
				marginDiv.style.cssText = div.style.cssText = divReset;
				marginDiv.style.marginRight = marginDiv.style.width = "0";
				div.style.width = "1px";

				reliableMarginRightVal =
					!parseFloat( ( window.getComputedStyle( marginDiv, null ) || {} ).marginRight );

				body.removeChild( container );
			}

			return reliableMarginRightVal;
		}
	});

	function computeStyleTests() {
		var container, div,
			body = document.getElementsByTagName( "body" )[ 0 ];

		if ( !body ) {
			// Test fired too early or in an unsupported environment, exit.
			return;
		}

		container = document.createElement( "div" );
		div = document.createElement( "div" );
		container.style.cssText = containerStyles;

		body.appendChild( container ).appendChild( div );

		div.style.cssText =
			"-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box;" +
				"position:absolute;display:block;padding:1px;border:1px;width:4px;" +
				"margin-top:1%;top:1%";

		// Workaround failing boxSizing test due to offsetWidth returning wrong value
		// with some non-1 values of body zoom, ticket #13543
		jQuery.swap( body, body.style.zoom != null ? { zoom: 1 } : {}, function() {
			boxSizingVal = div.offsetWidth === 4;
		});

		// Will be changed later if needed.
		boxSizingReliableVal = true;
		pixelPositionVal = false;
		reliableMarginRightVal = true;

		// Use window.getComputedStyle because jsdom on node.js will break without it.
		if ( window.getComputedStyle ) {
			pixelPositionVal = ( window.getComputedStyle( div, null ) || {} ).top !== "1%";
			boxSizingReliableVal =
				( window.getComputedStyle( div, null ) || { width: "4px" } ).width === "4px";
		}

		body.removeChild( container );

		// Null elements to avoid leaks in IE.
		div = body = null;
	}

})();


// A method for quickly swapping in/out CSS properties to get correct calculations.
jQuery.swap = function( elem, options, callback, args ) {
	var ret, name,
		old = {};

	// Remember the old values, and insert the new ones
	for ( name in options ) {
		old[ name ] = elem.style[ name ];
		elem.style[ name ] = options[ name ];
	}

	ret = callback.apply( elem, args || [] );

	// Revert the old values
	for ( name in options ) {
		elem.style[ name ] = old[ name ];
	}

	return ret;
};


var
		ralpha = /alpha\([^)]*\)/i,
	ropacity = /opacity\s*=\s*([^)]*)/,

	// swappable if display is none or starts with table except "table", "table-cell", or "table-caption"
	// see here for display values: https://developer.mozilla.org/en-US/docs/CSS/display
	rdisplayswap = /^(none|table(?!-c[ea]).+)/,
	rnumsplit = new RegExp( "^(" + pnum + ")(.*)$", "i" ),
	rrelNum = new RegExp( "^([+-])=(" + pnum + ")", "i" ),

	cssShow = { position: "absolute", visibility: "hidden", display: "block" },
	cssNormalTransform = {
		letterSpacing: 0,
		fontWeight: 400
	},

	cssPrefixes = [ "Webkit", "O", "Moz", "ms" ];


// return a css property mapped to a potentially vendor prefixed property
function vendorPropName( style, name ) {

	// shortcut for names that are not vendor prefixed
	if ( name in style ) {
		return name;
	}

	// check for vendor prefixed names
	var capName = name.charAt(0).toUpperCase() + name.slice(1),
		origName = name,
		i = cssPrefixes.length;

	while ( i-- ) {
		name = cssPrefixes[ i ] + capName;
		if ( name in style ) {
			return name;
		}
	}

	return origName;
}

function showHide( elements, show ) {
	var display, elem, hidden,
		values = [],
		index = 0,
		length = elements.length;

	for ( ; index < length; index++ ) {
		elem = elements[ index ];
		if ( !elem.style ) {
			continue;
		}

		values[ index ] = jQuery._data( elem, "olddisplay" );
		display = elem.style.display;
		if ( show ) {
			// Reset the inline display of this element to learn if it is
			// being hidden by cascaded rules or not
			if ( !values[ index ] && display === "none" ) {
				elem.style.display = "";
			}

			// Set elements which have been overridden with display: none
			// in a stylesheet to whatever the default browser style is
			// for such an element
			if ( elem.style.display === "" && isHidden( elem ) ) {
				values[ index ] = jQuery._data( elem, "olddisplay", defaultDisplay(elem.nodeName) );
			}
		} else {

			if ( !values[ index ] ) {
				hidden = isHidden( elem );

				if ( display && display !== "none" || !hidden ) {
					jQuery._data( elem, "olddisplay", hidden ? display : jQuery.css( elem, "display" ) );
				}
			}
		}
	}

	// Set the display of most of the elements in a second loop
	// to avoid the constant reflow
	for ( index = 0; index < length; index++ ) {
		elem = elements[ index ];
		if ( !elem.style ) {
			continue;
		}
		if ( !show || elem.style.display === "none" || elem.style.display === "" ) {
			elem.style.display = show ? values[ index ] || "" : "none";
		}
	}

	return elements;
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
		isBorderBox = support.boxSizing() && jQuery.css( elem, "boxSizing", false, styles ) === "border-box";

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
		valueIsBorderBox = isBorderBox && ( support.boxSizingReliable() || val === elem.style[ name ] );

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

jQuery.extend({
	// Add in style property hooks for overriding the default
	// behavior of getting and setting a style property
	cssHooks: {
		opacity: {
			get: function( elem, computed ) {
				if ( computed ) {
					// We should always get a number back from opacity
					var ret = curCSS( elem, "opacity" );
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
		"float": support.cssFloat ? "cssFloat" : "styleFloat"
	},

	// Get and set the style property on a DOM Node
	style: function( elem, name, value, extra ) {
		// Don't set styles on text and comment nodes
		if ( !elem || elem.nodeType === 3 || elem.nodeType === 8 || !elem.style ) {
			return;
		}

		// Make sure that we're working with the right name
		var ret, type, hooks,
			origName = jQuery.camelCase( name ),
			style = elem.style;

		name = jQuery.cssProps[ origName ] || ( jQuery.cssProps[ origName ] = vendorPropName( style, origName ) );

		// gets hook for the prefixed version
		// followed by the unprefixed version
		hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

		// Check if we're setting a value
		if ( value !== undefined ) {
			type = typeof value;

			// convert relative number strings (+= or -=) to relative numbers. #7345
			if ( type === "string" && (ret = rrelNum.exec( value )) ) {
				value = ( ret[1] + 1 ) * ret[2] + parseFloat( jQuery.css( elem, name ) );
				// Fixes bug #9237
				type = "number";
			}

			// Make sure that null and NaN values aren't set. See: #7116
			if ( value == null || value !== value ) {
				return;
			}

			// If a number was passed in, add 'px' to the (except for certain CSS properties)
			if ( type === "number" && !jQuery.cssNumber[ origName ] ) {
				value += "px";
			}

			// Fixes #8908, it can be done more correctly by specifing setters in cssHooks,
			// but it would mean to define eight (for every problematic property) identical functions
			if ( !support.clearCloneStyle && value === "" && name.indexOf("background") === 0 ) {
				style[ name ] = "inherit";
			}

			// If a hook was provided, use that value, otherwise just set the specified value
			if ( !hooks || !("set" in hooks) || (value = hooks.set( elem, value, extra )) !== undefined ) {

				// Support: IE
				// Swallow errors from 'invalid' CSS values (#5509)
				try {
					// Support: Chrome, Safari
					// Setting style to blank string required to delete "style: x !important;"
					style[ name ] = "";
					style[ name ] = value;
				} catch(e) {}
			}

		} else {
			// If a hook was provided get the non-computed value from there
			if ( hooks && "get" in hooks && (ret = hooks.get( elem, false, extra )) !== undefined ) {
				return ret;
			}

			// Otherwise just get the value from the style object
			return style[ name ];
		}
	},

	css: function( elem, name, extra, styles ) {
		var num, val, hooks,
			origName = jQuery.camelCase( name );

		// Make sure that we're working with the right name
		name = jQuery.cssProps[ origName ] || ( jQuery.cssProps[ origName ] = vendorPropName( elem.style, origName ) );

		// gets hook for the prefixed version
		// followed by the unprefixed version
		hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

		// If a hook was provided get the computed value from there
		if ( hooks && "get" in hooks ) {
			val = hooks.get( elem, true, extra );
		}

		// Otherwise, if a way to get the computed value exists, use that
		if ( val === undefined ) {
			val = curCSS( elem, name, styles );
		}

		//convert "normal" to computed value
		if ( val === "normal" && name in cssNormalTransform ) {
			val = cssNormalTransform[ name ];
		}

		// Return, converting to number if forced or a qualifier was provided and val looks numeric
		if ( extra === "" || extra ) {
			num = parseFloat( val );
			return extra === true || jQuery.isNumeric( num ) ? num || 0 : val;
		}
		return val;
	}
});

jQuery.each([ "height", "width" ], function( i, name ) {
	jQuery.cssHooks[ name ] = {
		get: function( elem, computed, extra ) {
			if ( computed ) {
				// certain elements can have dimension info if we invisibly show them
				// however, it must have a current display style that would benefit from this
				return elem.offsetWidth === 0 && rdisplayswap.test( jQuery.css( elem, "display" ) ) ?
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
					support.boxSizing() && jQuery.css( elem, "boxSizing", false, styles ) === "border-box",
					styles
				) : 0
			);
		}
	};
});

if ( !support.opacity ) {
	jQuery.cssHooks.opacity = {
		get: function( elem, computed ) {
			// IE uses filters for opacity
			return ropacity.test( (computed && elem.currentStyle ? elem.currentStyle.filter : elem.style.filter) || "" ) ?
				( 0.01 * parseFloat( RegExp.$1 ) ) + "" :
				computed ? "1" : "";
		},

		set: function( elem, value ) {
			var style = elem.style,
				currentStyle = elem.currentStyle,
				opacity = jQuery.isNumeric( value ) ? "alpha(opacity=" + value * 100 + ")" : "",
				filter = currentStyle && currentStyle.filter || style.filter || "";

			// IE has trouble with opacity if it does not have layout
			// Force it by setting the zoom level
			style.zoom = 1;

			// if setting opacity to 1, and no other filters exist - attempt to remove filter attribute #6652
			// if value === "", then remove inline opacity #12685
			if ( ( value >= 1 || value === "" ) &&
					jQuery.trim( filter.replace( ralpha, "" ) ) === "" &&
					style.removeAttribute ) {

				// Setting style.filter to null, "" & " " still leave "filter:" in the cssText
				// if "filter:" is present at all, clearType is disabled, we want to avoid this
				// style.removeAttribute is IE Only, but so apparently is this code path...
				style.removeAttribute( "filter" );

				// if there is no filter style applied in a css rule or unset inline opacity, we are done
				if ( value === "" || currentStyle && !currentStyle.filter ) {
					return;
				}
			}

			// otherwise, set new filter values
			style.filter = ralpha.test( filter ) ?
				filter.replace( ralpha, opacity ) :
				filter + " " + opacity;
		}
	};
}

jQuery.cssHooks.marginRight = addGetHookIf( support.reliableMarginRight,
	function( elem, computed ) {
		if ( computed ) {
			// WebKit Bug 13343 - getComputedStyle returns wrong value for margin-right
			// Work around by temporarily setting element display to inline-block
			return jQuery.swap( elem, { "display": "inline-block" },
				curCSS, [ elem, "marginRight" ] );
		}
	}
);

// These hooks are used by animate to expand properties
jQuery.each({
	margin: "",
	padding: "",
	border: "Width"
}, function( prefix, suffix ) {
	jQuery.cssHooks[ prefix + suffix ] = {
		expand: function( value ) {
			var i = 0,
				expanded = {},

				// assumes a single number if not a string
				parts = typeof value === "string" ? value.split(" ") : [ value ];

			for ( ; i < 4; i++ ) {
				expanded[ prefix + cssExpand[ i ] + suffix ] =
					parts[ i ] || parts[ i - 2 ] || parts[ 0 ];
			}

			return expanded;
		}
	};

	if ( !rmargin.test( prefix ) ) {
		jQuery.cssHooks[ prefix + suffix ].set = setPositiveNumber;
	}
});

jQuery.fn.extend({
	css: function( name, value ) {
		return access( this, function( elem, name, value ) {
			var styles, len,
				map = {},
				i = 0;

			if ( jQuery.isArray( name ) ) {
				styles = getStyles( elem );
				len = name.length;

				for ( ; i < len; i++ ) {
					map[ name[ i ] ] = jQuery.css( elem, name[ i ], false, styles );
				}

				return map;
			}

			return value !== undefined ?
				jQuery.style( elem, name, value ) :
				jQuery.css( elem, name );
		}, name, value, arguments.length > 1 );
	},
	show: function() {
		return showHide( this, true );
	},
	hide: function() {
		return showHide( this );
	},
	toggle: function( state ) {
		if ( typeof state === "boolean" ) {
			return state ? this.show() : this.hide();
		}

		return this.each(function() {
			if ( isHidden( this ) ) {
				jQuery( this ).show();
			} else {
				jQuery( this ).hide();
			}
		});
	}
});


function Tween( elem, options, prop, end, easing ) {
	return new Tween.prototype.init( elem, options, prop, end, easing );
}
jQuery.Tween = Tween;

Tween.prototype = {
	constructor: Tween,
	init: function( elem, options, prop, end, easing, unit ) {
		this.elem = elem;
		this.prop = prop;
		this.easing = easing || "swing";
		this.options = options;
		this.start = this.now = this.cur();
		this.end = end;
		this.unit = unit || ( jQuery.cssNumber[ prop ] ? "" : "px" );
	},
	cur: function() {
		var hooks = Tween.propHooks[ this.prop ];

		return hooks && hooks.get ?
			hooks.get( this ) :
			Tween.propHooks._default.get( this );
	},
	run: function( percent ) {
		var eased,
			hooks = Tween.propHooks[ this.prop ];

		if ( this.options.duration ) {
			this.pos = eased = jQuery.easing[ this.easing ](
				percent, this.options.duration * percent, 0, 1, this.options.duration
			);
		} else {
			this.pos = eased = percent;
		}
		this.now = ( this.end - this.start ) * eased + this.start;

		if ( this.options.step ) {
			this.options.step.call( this.elem, this.now, this );
		}

		if ( hooks && hooks.set ) {
			hooks.set( this );
		} else {
			Tween.propHooks._default.set( this );
		}
		return this;
	}
};

Tween.prototype.init.prototype = Tween.prototype;

Tween.propHooks = {
	_default: {
		get: function( tween ) {
			var result;

			if ( tween.elem[ tween.prop ] != null &&
				(!tween.elem.style || tween.elem.style[ tween.prop ] == null) ) {
				return tween.elem[ tween.prop ];
			}

			// passing an empty string as a 3rd parameter to .css will automatically
			// attempt a parseFloat and fallback to a string if the parse fails
			// so, simple values such as "10px" are parsed to Float.
			// complex values such as "rotate(1rad)" are returned as is.
			result = jQuery.css( tween.elem, tween.prop, "" );
			// Empty strings, null, undefined and "auto" are converted to 0.
			return !result || result === "auto" ? 0 : result;
		},
		set: function( tween ) {
			// use step hook for back compat - use cssHook if its there - use .style if its
			// available and use plain properties where available
			if ( jQuery.fx.step[ tween.prop ] ) {
				jQuery.fx.step[ tween.prop ]( tween );
			} else if ( tween.elem.style && ( tween.elem.style[ jQuery.cssProps[ tween.prop ] ] != null || jQuery.cssHooks[ tween.prop ] ) ) {
				jQuery.style( tween.elem, tween.prop, tween.now + tween.unit );
			} else {
				tween.elem[ tween.prop ] = tween.now;
			}
		}
	}
};

// Support: IE <=9
// Panic based approach to setting things on disconnected nodes

Tween.propHooks.scrollTop = Tween.propHooks.scrollLeft = {
	set: function( tween ) {
		if ( tween.elem.nodeType && tween.elem.parentNode ) {
			tween.elem[ tween.prop ] = tween.now;
		}
	}
};

jQuery.easing = {
	linear: function( p ) {
		return p;
	},
	swing: function( p ) {
		return 0.5 - Math.cos( p * Math.PI ) / 2;
	}
};

jQuery.fx = Tween.prototype.init;

// Back Compat <1.8 extension point
jQuery.fx.step = {};




var
	fxNow, timerId,
	rfxtypes = /^(?:toggle|show|hide)$/,
	rfxnum = new RegExp( "^(?:([+-])=|)(" + pnum + ")([a-z%]*)$", "i" ),
	rrun = /queueHooks$/,
	animationPrefilters = [ defaultPrefilter ],
	tweeners = {
		"*": [ function( prop, value ) {
			var tween = this.createTween( prop, value ),
				target = tween.cur(),
				parts = rfxnum.exec( value ),
				unit = parts && parts[ 3 ] || ( jQuery.cssNumber[ prop ] ? "" : "px" ),

				// Starting value computation is required for potential unit mismatches
				start = ( jQuery.cssNumber[ prop ] || unit !== "px" && +target ) &&
					rfxnum.exec( jQuery.css( tween.elem, prop ) ),
				scale = 1,
				maxIterations = 20;

			if ( start && start[ 3 ] !== unit ) {
				// Trust units reported by jQuery.css
				unit = unit || start[ 3 ];

				// Make sure we update the tween properties later on
				parts = parts || [];

				// Iteratively approximate from a nonzero starting point
				start = +target || 1;

				do {
					// If previous iteration zeroed out, double until we get *something*
					// Use a string for doubling factor so we don't accidentally see scale as unchanged below
					scale = scale || ".5";

					// Adjust and apply
					start = start / scale;
					jQuery.style( tween.elem, prop, start + unit );

				// Update scale, tolerating zero or NaN from tween.cur()
				// And breaking the loop if scale is unchanged or perfect, or if we've just had enough
				} while ( scale !== (scale = tween.cur() / target) && scale !== 1 && --maxIterations );
			}

			// Update tween properties
			if ( parts ) {
				start = tween.start = +start || +target || 0;
				tween.unit = unit;
				// If a +=/-= token was provided, we're doing a relative animation
				tween.end = parts[ 1 ] ?
					start + ( parts[ 1 ] + 1 ) * parts[ 2 ] :
					+parts[ 2 ];
			}

			return tween;
		} ]
	};

// Animations created synchronously will run synchronously
function createFxNow() {
	setTimeout(function() {
		fxNow = undefined;
	});
	return ( fxNow = jQuery.now() );
}

// Generate parameters to create a standard animation
function genFx( type, includeWidth ) {
	var which,
		attrs = { height: type },
		i = 0;

	// if we include width, step value is 1 to do all cssExpand values,
	// if we don't include width, step value is 2 to skip over Left and Right
	includeWidth = includeWidth ? 1 : 0;
	for ( ; i < 4 ; i += 2 - includeWidth ) {
		which = cssExpand[ i ];
		attrs[ "margin" + which ] = attrs[ "padding" + which ] = type;
	}

	if ( includeWidth ) {
		attrs.opacity = attrs.width = type;
	}

	return attrs;
}

function createTween( value, prop, animation ) {
	var tween,
		collection = ( tweeners[ prop ] || [] ).concat( tweeners[ "*" ] ),
		index = 0,
		length = collection.length;
	for ( ; index < length; index++ ) {
		if ( (tween = collection[ index ].call( animation, prop, value )) ) {

			// we're done with this property
			return tween;
		}
	}
}

function defaultPrefilter( elem, props, opts ) {
	/* jshint validthis: true */
	var prop, value, toggle, tween, hooks, oldfire, display, dDisplay,
		anim = this,
		orig = {},
		style = elem.style,
		hidden = elem.nodeType && isHidden( elem ),
		dataShow = jQuery._data( elem, "fxshow" );

	// handle queue: false promises
	if ( !opts.queue ) {
		hooks = jQuery._queueHooks( elem, "fx" );
		if ( hooks.unqueued == null ) {
			hooks.unqueued = 0;
			oldfire = hooks.empty.fire;
			hooks.empty.fire = function() {
				if ( !hooks.unqueued ) {
					oldfire();
				}
			};
		}
		hooks.unqueued++;

		anim.always(function() {
			// doing this makes sure that the complete handler will be called
			// before this completes
			anim.always(function() {
				hooks.unqueued--;
				if ( !jQuery.queue( elem, "fx" ).length ) {
					hooks.empty.fire();
				}
			});
		});
	}

	// height/width overflow pass
	if ( elem.nodeType === 1 && ( "height" in props || "width" in props ) ) {
		// Make sure that nothing sneaks out
		// Record all 3 overflow attributes because IE does not
		// change the overflow attribute when overflowX and
		// overflowY are set to the same value
		opts.overflow = [ style.overflow, style.overflowX, style.overflowY ];

		// Set display property to inline-block for height/width
		// animations on inline elements that are having width/height animated
		display = jQuery.css( elem, "display" );
		dDisplay = defaultDisplay( elem.nodeName );
		if ( display === "none" ) {
			display = dDisplay;
		}
		if ( display === "inline" &&
				jQuery.css( elem, "float" ) === "none" ) {

			// inline-level elements accept inline-block;
			// block-level elements need to be inline with layout
			if ( !support.inlineBlockNeedsLayout || dDisplay === "inline" ) {
				style.display = "inline-block";
			} else {
				style.zoom = 1;
			}
		}
	}

	if ( opts.overflow ) {
		style.overflow = "hidden";
		if ( !support.shrinkWrapBlocks() ) {
			anim.always(function() {
				style.overflow = opts.overflow[ 0 ];
				style.overflowX = opts.overflow[ 1 ];
				style.overflowY = opts.overflow[ 2 ];
			});
		}
	}

	// show/hide pass
	for ( prop in props ) {
		value = props[ prop ];
		if ( rfxtypes.exec( value ) ) {
			delete props[ prop ];
			toggle = toggle || value === "toggle";
			if ( value === ( hidden ? "hide" : "show" ) ) {

				// If there is dataShow left over from a stopped hide or show and we are going to proceed with show, we should pretend to be hidden
				if ( value === "show" && dataShow && dataShow[ prop ] !== undefined ) {
					hidden = true;
				} else {
					continue;
				}
			}
			orig[ prop ] = dataShow && dataShow[ prop ] || jQuery.style( elem, prop );
		}
	}

	if ( !jQuery.isEmptyObject( orig ) ) {
		if ( dataShow ) {
			if ( "hidden" in dataShow ) {
				hidden = dataShow.hidden;
			}
		} else {
			dataShow = jQuery._data( elem, "fxshow", {} );
		}

		// store state if its toggle - enables .stop().toggle() to "reverse"
		if ( toggle ) {
			dataShow.hidden = !hidden;
		}
		if ( hidden ) {
			jQuery( elem ).show();
		} else {
			anim.done(function() {
				jQuery( elem ).hide();
			});
		}
		anim.done(function() {
			var prop;
			jQuery._removeData( elem, "fxshow" );
			for ( prop in orig ) {
				jQuery.style( elem, prop, orig[ prop ] );
			}
		});
		for ( prop in orig ) {
			tween = createTween( hidden ? dataShow[ prop ] : 0, prop, anim );

			if ( !( prop in dataShow ) ) {
				dataShow[ prop ] = tween.start;
				if ( hidden ) {
					tween.end = tween.start;
					tween.start = prop === "width" || prop === "height" ? 1 : 0;
				}
			}
		}
	}
}

function propFilter( props, specialEasing ) {
	var index, name, easing, value, hooks;

	// camelCase, specialEasing and expand cssHook pass
	for ( index in props ) {
		name = jQuery.camelCase( index );
		easing = specialEasing[ name ];
		value = props[ index ];
		if ( jQuery.isArray( value ) ) {
			easing = value[ 1 ];
			value = props[ index ] = value[ 0 ];
		}

		if ( index !== name ) {
			props[ name ] = value;
			delete props[ index ];
		}

		hooks = jQuery.cssHooks[ name ];
		if ( hooks && "expand" in hooks ) {
			value = hooks.expand( value );
			delete props[ name ];

			// not quite $.extend, this wont overwrite keys already present.
			// also - reusing 'index' from above because we have the correct "name"
			for ( index in value ) {
				if ( !( index in props ) ) {
					props[ index ] = value[ index ];
					specialEasing[ index ] = easing;
				}
			}
		} else {
			specialEasing[ name ] = easing;
		}
	}
}

function Animation( elem, properties, options ) {
	var result,
		stopped,
		index = 0,
		length = animationPrefilters.length,
		deferred = jQuery.Deferred().always( function() {
			// don't match elem in the :animated selector
			delete tick.elem;
		}),
		tick = function() {
			if ( stopped ) {
				return false;
			}
			var currentTime = fxNow || createFxNow(),
				remaining = Math.max( 0, animation.startTime + animation.duration - currentTime ),
				// archaic crash bug won't allow us to use 1 - ( 0.5 || 0 ) (#12497)
				temp = remaining / animation.duration || 0,
				percent = 1 - temp,
				index = 0,
				length = animation.tweens.length;

			for ( ; index < length ; index++ ) {
				animation.tweens[ index ].run( percent );
			}

			deferred.notifyWith( elem, [ animation, percent, remaining ]);

			if ( percent < 1 && length ) {
				return remaining;
			} else {
				deferred.resolveWith( elem, [ animation ] );
				return false;
			}
		},
		animation = deferred.promise({
			elem: elem,
			props: jQuery.extend( {}, properties ),
			opts: jQuery.extend( true, { specialEasing: {} }, options ),
			originalProperties: properties,
			originalOptions: options,
			startTime: fxNow || createFxNow(),
			duration: options.duration,
			tweens: [],
			createTween: function( prop, end ) {
				var tween = jQuery.Tween( elem, animation.opts, prop, end,
						animation.opts.specialEasing[ prop ] || animation.opts.easing );
				animation.tweens.push( tween );
				return tween;
			},
			stop: function( gotoEnd ) {
				var index = 0,
					// if we are going to the end, we want to run all the tweens
					// otherwise we skip this part
					length = gotoEnd ? animation.tweens.length : 0;
				if ( stopped ) {
					return this;
				}
				stopped = true;
				for ( ; index < length ; index++ ) {
					animation.tweens[ index ].run( 1 );
				}

				// resolve when we played the last frame
				// otherwise, reject
				if ( gotoEnd ) {
					deferred.resolveWith( elem, [ animation, gotoEnd ] );
				} else {
					deferred.rejectWith( elem, [ animation, gotoEnd ] );
				}
				return this;
			}
		}),
		props = animation.props;

	propFilter( props, animation.opts.specialEasing );

	for ( ; index < length ; index++ ) {
		result = animationPrefilters[ index ].call( animation, elem, props, animation.opts );
		if ( result ) {
			return result;
		}
	}

	jQuery.map( props, createTween, animation );

	if ( jQuery.isFunction( animation.opts.start ) ) {
		animation.opts.start.call( elem, animation );
	}

	jQuery.fx.timer(
		jQuery.extend( tick, {
			elem: elem,
			anim: animation,
			queue: animation.opts.queue
		})
	);

	// attach callbacks from options
	return animation.progress( animation.opts.progress )
		.done( animation.opts.done, animation.opts.complete )
		.fail( animation.opts.fail )
		.always( animation.opts.always );
}

jQuery.Animation = jQuery.extend( Animation, {
	tweener: function( props, callback ) {
		if ( jQuery.isFunction( props ) ) {
			callback = props;
			props = [ "*" ];
		} else {
			props = props.split(" ");
		}

		var prop,
			index = 0,
			length = props.length;

		for ( ; index < length ; index++ ) {
			prop = props[ index ];
			tweeners[ prop ] = tweeners[ prop ] || [];
			tweeners[ prop ].unshift( callback );
		}
	},

	prefilter: function( callback, prepend ) {
		if ( prepend ) {
			animationPrefilters.unshift( callback );
		} else {
			animationPrefilters.push( callback );
		}
	}
});

jQuery.speed = function( speed, easing, fn ) {
	var opt = speed && typeof speed === "object" ? jQuery.extend( {}, speed ) : {
		complete: fn || !fn && easing ||
			jQuery.isFunction( speed ) && speed,
		duration: speed,
		easing: fn && easing || easing && !jQuery.isFunction( easing ) && easing
	};

	opt.duration = jQuery.fx.off ? 0 : typeof opt.duration === "number" ? opt.duration :
		opt.duration in jQuery.fx.speeds ? jQuery.fx.speeds[ opt.duration ] : jQuery.fx.speeds._default;

	// normalize opt.queue - true/undefined/null -> "fx"
	if ( opt.queue == null || opt.queue === true ) {
		opt.queue = "fx";
	}

	// Queueing
	opt.old = opt.complete;

	opt.complete = function() {
		if ( jQuery.isFunction( opt.old ) ) {
			opt.old.call( this );
		}

		if ( opt.queue ) {
			jQuery.dequeue( this, opt.queue );
		}
	};

	return opt;
};

jQuery.fn.extend({
	fadeTo: function( speed, to, easing, callback ) {

		// show any hidden elements after setting opacity to 0
		return this.filter( isHidden ).css( "opacity", 0 ).show()

			// animate to the value specified
			.end().animate({ opacity: to }, speed, easing, callback );
	},
	animate: function( prop, speed, easing, callback ) {
		var empty = jQuery.isEmptyObject( prop ),
			optall = jQuery.speed( speed, easing, callback ),
			doAnimation = function() {
				// Operate on a copy of prop so per-property easing won't be lost
				var anim = Animation( this, jQuery.extend( {}, prop ), optall );

				// Empty animations, or finishing resolves immediately
				if ( empty || jQuery._data( this, "finish" ) ) {
					anim.stop( true );
				}
			};
			doAnimation.finish = doAnimation;

		return empty || optall.queue === false ?
			this.each( doAnimation ) :
			this.queue( optall.queue, doAnimation );
	},
	stop: function( type, clearQueue, gotoEnd ) {
		var stopQueue = function( hooks ) {
			var stop = hooks.stop;
			delete hooks.stop;
			stop( gotoEnd );
		};

		if ( typeof type !== "string" ) {
			gotoEnd = clearQueue;
			clearQueue = type;
			type = undefined;
		}
		if ( clearQueue && type !== false ) {
			this.queue( type || "fx", [] );
		}

		return this.each(function() {
			var dequeue = true,
				index = type != null && type + "queueHooks",
				timers = jQuery.timers,
				data = jQuery._data( this );

			if ( index ) {
				if ( data[ index ] && data[ index ].stop ) {
					stopQueue( data[ index ] );
				}
			} else {
				for ( index in data ) {
					if ( data[ index ] && data[ index ].stop && rrun.test( index ) ) {
						stopQueue( data[ index ] );
					}
				}
			}

			for ( index = timers.length; index--; ) {
				if ( timers[ index ].elem === this && (type == null || timers[ index ].queue === type) ) {
					timers[ index ].anim.stop( gotoEnd );
					dequeue = false;
					timers.splice( index, 1 );
				}
			}

			// start the next in the queue if the last step wasn't forced
			// timers currently will call their complete callbacks, which will dequeue
			// but only if they were gotoEnd
			if ( dequeue || !gotoEnd ) {
				jQuery.dequeue( this, type );
			}
		});
	},
	finish: function( type ) {
		if ( type !== false ) {
			type = type || "fx";
		}
		return this.each(function() {
			var index,
				data = jQuery._data( this ),
				queue = data[ type + "queue" ],
				hooks = data[ type + "queueHooks" ],
				timers = jQuery.timers,
				length = queue ? queue.length : 0;

			// enable finishing flag on private data
			data.finish = true;

			// empty the queue first
			jQuery.queue( this, type, [] );

			if ( hooks && hooks.stop ) {
				hooks.stop.call( this, true );
			}

			// look for any active animations, and finish them
			for ( index = timers.length; index--; ) {
				if ( timers[ index ].elem === this && timers[ index ].queue === type ) {
					timers[ index ].anim.stop( true );
					timers.splice( index, 1 );
				}
			}

			// look for any animations in the old queue and finish them
			for ( index = 0; index < length; index++ ) {
				if ( queue[ index ] && queue[ index ].finish ) {
					queue[ index ].finish.call( this );
				}
			}

			// turn off finishing flag
			delete data.finish;
		});
	}
});

jQuery.each([ "toggle", "show", "hide" ], function( i, name ) {
	var cssFn = jQuery.fn[ name ];
	jQuery.fn[ name ] = function( speed, easing, callback ) {
		return speed == null || typeof speed === "boolean" ?
			cssFn.apply( this, arguments ) :
			this.animate( genFx( name, true ), speed, easing, callback );
	};
});

// Generate shortcuts for custom animations
jQuery.each({
	slideDown: genFx("show"),
	slideUp: genFx("hide"),
	slideToggle: genFx("toggle"),
	fadeIn: { opacity: "show" },
	fadeOut: { opacity: "hide" },
	fadeToggle: { opacity: "toggle" }
}, function( name, props ) {
	jQuery.fn[ name ] = function( speed, easing, callback ) {
		return this.animate( props, speed, easing, callback );
	};
});

jQuery.timers = [];
jQuery.fx.tick = function() {
	var timer,
		timers = jQuery.timers,
		i = 0;

	fxNow = jQuery.now();

	for ( ; i < timers.length; i++ ) {
		timer = timers[ i ];
		// Checks the timer has not already been removed
		if ( !timer() && timers[ i ] === timer ) {
			timers.splice( i--, 1 );
		}
	}

	if ( !timers.length ) {
		jQuery.fx.stop();
	}
	fxNow = undefined;
};

jQuery.fx.timer = function( timer ) {
	jQuery.timers.push( timer );
	if ( timer() ) {
		jQuery.fx.start();
	} else {
		jQuery.timers.pop();
	}
};

jQuery.fx.interval = 13;

jQuery.fx.start = function() {
	if ( !timerId ) {
		timerId = setInterval( jQuery.fx.tick, jQuery.fx.interval );
	}
};

jQuery.fx.stop = function() {
	clearInterval( timerId );
	timerId = null;
};

jQuery.fx.speeds = {
	slow: 600,
	fast: 200,
	// Default speed
	_default: 400
};


// Based off of the plugin by Clint Helfers, with permission.
// http://blindsignals.com/index.php/2009/07/jquery-delay/
jQuery.fn.delay = function( time, type ) {
	time = jQuery.fx ? jQuery.fx.speeds[ time ] || time : time;
	type = type || "fx";

	return this.queue( type, function( next, hooks ) {
		var timeout = setTimeout( next, time );
		hooks.stop = function() {
			clearTimeout( timeout );
		};
	});
};


(function() {
	var a, input, select, opt,
		div = document.createElement("div" );

	// Setup
	div.setAttribute( "className", "t" );
	div.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>";
	a = div.getElementsByTagName("a")[ 0 ];

	// First batch of tests.
	select = document.createElement("select");
	opt = select.appendChild( document.createElement("option") );
	input = div.getElementsByTagName("input")[ 0 ];

	a.style.cssText = "top:1px";

	// Test setAttribute on camelCase class. If it works, we need attrFixes when doing get/setAttribute (ie6/7)
	support.getSetAttribute = div.className !== "t";

	// Get the style information from getAttribute
	// (IE uses .cssText instead)
	support.style = /top/.test( a.getAttribute("style") );

	// Make sure that URLs aren't manipulated
	// (IE normalizes it by default)
	support.hrefNormalized = a.getAttribute("href") === "/a";

	// Check the default checkbox/radio value ("" on WebKit; "on" elsewhere)
	support.checkOn = !!input.value;

	// Make sure that a selected-by-default option has a working selected property.
	// (WebKit defaults to false instead of true, IE too, if it's in an optgroup)
	support.optSelected = opt.selected;

	// Tests for enctype support on a form (#6743)
	support.enctype = !!document.createElement("form").enctype;

	// Make sure that the options inside disabled selects aren't marked as disabled
	// (WebKit marks them as disabled)
	select.disabled = true;
	support.optDisabled = !opt.disabled;

	// Support: IE8 only
	// Check if we can trust getAttribute("value")
	input = document.createElement( "input" );
	input.setAttribute( "value", "" );
	support.input = input.getAttribute( "value" ) === "";

	// Check if an input maintains its value after becoming a radio
	input.value = "t";
	input.setAttribute( "type", "radio" );
	support.radioValue = input.value === "t";

	// Null elements to avoid leaks in IE.
	a = input = select = opt = div = null;
})();


var rreturn = /\r/g;

jQuery.fn.extend({
	val: function( value ) {
		var hooks, ret, isFunction,
			elem = this[0];

		if ( !arguments.length ) {
			if ( elem ) {
				hooks = jQuery.valHooks[ elem.type ] || jQuery.valHooks[ elem.nodeName.toLowerCase() ];

				if ( hooks && "get" in hooks && (ret = hooks.get( elem, "value" )) !== undefined ) {
					return ret;
				}

				ret = elem.value;

				return typeof ret === "string" ?
					// handle most common string cases
					ret.replace(rreturn, "") :
					// handle cases where value is null/undef or number
					ret == null ? "" : ret;
			}

			return;
		}

		isFunction = jQuery.isFunction( value );

		return this.each(function( i ) {
			var val;

			if ( this.nodeType !== 1 ) {
				return;
			}

			if ( isFunction ) {
				val = value.call( this, i, jQuery( this ).val() );
			} else {
				val = value;
			}

			// Treat null/undefined as ""; convert numbers to string
			if ( val == null ) {
				val = "";
			} else if ( typeof val === "number" ) {
				val += "";
			} else if ( jQuery.isArray( val ) ) {
				val = jQuery.map( val, function( value ) {
					return value == null ? "" : value + "";
				});
			}

			hooks = jQuery.valHooks[ this.type ] || jQuery.valHooks[ this.nodeName.toLowerCase() ];

			// If set returns undefined, fall back to normal setting
			if ( !hooks || !("set" in hooks) || hooks.set( this, val, "value" ) === undefined ) {
				this.value = val;
			}
		});
	}
});

jQuery.extend({
	valHooks: {
		option: {
			get: function( elem ) {
				var val = jQuery.find.attr( elem, "value" );
				return val != null ?
					val :
					jQuery.text( elem );
			}
		},
		select: {
			get: function( elem ) {
				var value, option,
					options = elem.options,
					index = elem.selectedIndex,
					one = elem.type === "select-one" || index < 0,
					values = one ? null : [],
					max = one ? index + 1 : options.length,
					i = index < 0 ?
						max :
						one ? index : 0;

				// Loop through all the selected options
				for ( ; i < max; i++ ) {
					option = options[ i ];

					// oldIE doesn't update selected after form reset (#2551)
					if ( ( option.selected || i === index ) &&
							// Don't return options that are disabled or in a disabled optgroup
							( support.optDisabled ? !option.disabled : option.getAttribute("disabled") === null ) &&
							( !option.parentNode.disabled || !jQuery.nodeName( option.parentNode, "optgroup" ) ) ) {

						// Get the specific value for the option
						value = jQuery( option ).val();

						// We don't need an array for one selects
						if ( one ) {
							return value;
						}

						// Multi-Selects return an array
						values.push( value );
					}
				}

				return values;
			},

			set: function( elem, value ) {
				var optionSet, option,
					options = elem.options,
					values = jQuery.makeArray( value ),
					i = options.length;

				while ( i-- ) {
					option = options[ i ];

					if ( jQuery.inArray( jQuery.valHooks.option.get( option ), values ) >= 0 ) {

						// Support: IE6
						// When new option element is added to select box we need to
						// force reflow of newly added node in order to workaround delay
						// of initialization properties
						try {
							option.selected = optionSet = true;

						} catch ( _ ) {

							// Will be executed only in IE6
							option.scrollHeight;
						}

					} else {
						option.selected = false;
					}
				}

				// Force browsers to behave consistently when non-matching value is set
				if ( !optionSet ) {
					elem.selectedIndex = -1;
				}

				return options;
			}
		}
	}
});

// Radios and checkboxes getter/setter
jQuery.each([ "radio", "checkbox" ], function() {
	jQuery.valHooks[ this ] = {
		set: function( elem, value ) {
			if ( jQuery.isArray( value ) ) {
				return ( elem.checked = jQuery.inArray( jQuery(elem).val(), value ) >= 0 );
			}
		}
	};
	if ( !support.checkOn ) {
		jQuery.valHooks[ this ].get = function( elem ) {
			// Support: Webkit
			// "" is returned instead of "on" if a value isn't specified
			return elem.getAttribute("value") === null ? "on" : elem.value;
		};
	}
});




var nodeHook, boolHook,
	attrHandle = jQuery.expr.attrHandle,
	ruseDefault = /^(?:checked|selected)$/i,
	getSetAttribute = support.getSetAttribute,
	getSetInput = support.input;

jQuery.fn.extend({
	attr: function( name, value ) {
		return access( this, jQuery.attr, name, value, arguments.length > 1 );
	},

	removeAttr: function( name ) {
		return this.each(function() {
			jQuery.removeAttr( this, name );
		});
	}
});

jQuery.extend({
	attr: function( elem, name, value ) {
		var hooks, ret,
			nType = elem.nodeType;

		// don't get/set attributes on text, comment and attribute nodes
		if ( !elem || nType === 3 || nType === 8 || nType === 2 ) {
			return;
		}

		// Fallback to prop when attributes are not supported
		if ( typeof elem.getAttribute === strundefined ) {
			return jQuery.prop( elem, name, value );
		}

		// All attributes are lowercase
		// Grab necessary hook if one is defined
		if ( nType !== 1 || !jQuery.isXMLDoc( elem ) ) {
			name = name.toLowerCase();
			hooks = jQuery.attrHooks[ name ] ||
				( jQuery.expr.match.bool.test( name ) ? boolHook : nodeHook );
		}

		if ( value !== undefined ) {

			if ( value === null ) {
				jQuery.removeAttr( elem, name );

			} else if ( hooks && "set" in hooks && (ret = hooks.set( elem, value, name )) !== undefined ) {
				return ret;

			} else {
				elem.setAttribute( name, value + "" );
				return value;
			}

		} else if ( hooks && "get" in hooks && (ret = hooks.get( elem, name )) !== null ) {
			return ret;

		} else {
			ret = jQuery.find.attr( elem, name );

			// Non-existent attributes return null, we normalize to undefined
			return ret == null ?
				undefined :
				ret;
		}
	},

	removeAttr: function( elem, value ) {
		var name, propName,
			i = 0,
			attrNames = value && value.match( rnotwhite );

		if ( attrNames && elem.nodeType === 1 ) {
			while ( (name = attrNames[i++]) ) {
				propName = jQuery.propFix[ name ] || name;

				// Boolean attributes get special treatment (#10870)
				if ( jQuery.expr.match.bool.test( name ) ) {
					// Set corresponding property to false
					if ( getSetInput && getSetAttribute || !ruseDefault.test( name ) ) {
						elem[ propName ] = false;
					// Support: IE<9
					// Also clear defaultChecked/defaultSelected (if appropriate)
					} else {
						elem[ jQuery.camelCase( "default-" + name ) ] =
							elem[ propName ] = false;
					}

				// See #9699 for explanation of this approach (setting first, then removal)
				} else {
					jQuery.attr( elem, name, "" );
				}

				elem.removeAttribute( getSetAttribute ? name : propName );
			}
		}
	},

	attrHooks: {
		type: {
			set: function( elem, value ) {
				if ( !support.radioValue && value === "radio" && jQuery.nodeName(elem, "input") ) {
					// Setting the type on a radio button after the value resets the value in IE6-9
					// Reset value to default in case type is set after value during creation
					var val = elem.value;
					elem.setAttribute( "type", value );
					if ( val ) {
						elem.value = val;
					}
					return value;
				}
			}
		}
	}
});

// Hook for boolean attributes
boolHook = {
	set: function( elem, value, name ) {
		if ( value === false ) {
			// Remove boolean attributes when set to false
			jQuery.removeAttr( elem, name );
		} else if ( getSetInput && getSetAttribute || !ruseDefault.test( name ) ) {
			// IE<8 needs the *property* name
			elem.setAttribute( !getSetAttribute && jQuery.propFix[ name ] || name, name );

		// Use defaultChecked and defaultSelected for oldIE
		} else {
			elem[ jQuery.camelCase( "default-" + name ) ] = elem[ name ] = true;
		}

		return name;
	}
};

// Retrieve booleans specially
jQuery.each( jQuery.expr.match.bool.source.match( /\w+/g ), function( i, name ) {

	var getter = attrHandle[ name ] || jQuery.find.attr;

	attrHandle[ name ] = getSetInput && getSetAttribute || !ruseDefault.test( name ) ?
		function( elem, name, isXML ) {
			var ret, handle;
			if ( !isXML ) {
				// Avoid an infinite loop by temporarily removing this function from the getter
				handle = attrHandle[ name ];
				attrHandle[ name ] = ret;
				ret = getter( elem, name, isXML ) != null ?
					name.toLowerCase() :
					null;
				attrHandle[ name ] = handle;
			}
			return ret;
		} :
		function( elem, name, isXML ) {
			if ( !isXML ) {
				return elem[ jQuery.camelCase( "default-" + name ) ] ?
					name.toLowerCase() :
					null;
			}
		};
});

// fix oldIE attroperties
if ( !getSetInput || !getSetAttribute ) {
	jQuery.attrHooks.value = {
		set: function( elem, value, name ) {
			if ( jQuery.nodeName( elem, "input" ) ) {
				// Does not return so that setAttribute is also used
				elem.defaultValue = value;
			} else {
				// Use nodeHook if defined (#1954); otherwise setAttribute is fine
				return nodeHook && nodeHook.set( elem, value, name );
			}
		}
	};
}

// IE6/7 do not support getting/setting some attributes with get/setAttribute
if ( !getSetAttribute ) {

	// Use this for any attribute in IE6/7
	// This fixes almost every IE6/7 issue
	nodeHook = {
		set: function( elem, value, name ) {
			// Set the existing or create a new attribute node
			var ret = elem.getAttributeNode( name );
			if ( !ret ) {
				elem.setAttributeNode(
					(ret = elem.ownerDocument.createAttribute( name ))
				);
			}

			ret.value = value += "";

			// Break association with cloned elements by also using setAttribute (#9646)
			if ( name === "value" || value === elem.getAttribute( name ) ) {
				return value;
			}
		}
	};

	// Some attributes are constructed with empty-string values when not defined
	attrHandle.id = attrHandle.name = attrHandle.coords =
		function( elem, name, isXML ) {
			var ret;
			if ( !isXML ) {
				return (ret = elem.getAttributeNode( name )) && ret.value !== "" ?
					ret.value :
					null;
			}
		};

	// Fixing value retrieval on a button requires this module
	jQuery.valHooks.button = {
		get: function( elem, name ) {
			var ret = elem.getAttributeNode( name );
			if ( ret && ret.specified ) {
				return ret.value;
			}
		},
		set: nodeHook.set
	};

	// Set contenteditable to false on removals(#10429)
	// Setting to empty string throws an error as an invalid value
	jQuery.attrHooks.contenteditable = {
		set: function( elem, value, name ) {
			nodeHook.set( elem, value === "" ? false : value, name );
		}
	};

	// Set width and height to auto instead of 0 on empty string( Bug #8150 )
	// This is for removals
	jQuery.each([ "width", "height" ], function( i, name ) {
		jQuery.attrHooks[ name ] = {
			set: function( elem, value ) {
				if ( value === "" ) {
					elem.setAttribute( name, "auto" );
					return value;
				}
			}
		};
	});
}

if ( !support.style ) {
	jQuery.attrHooks.style = {
		get: function( elem ) {
			// Return undefined in the case of empty string
			// Note: IE uppercases css property names, but if we were to .toLowerCase()
			// .cssText, that would destroy case senstitivity in URL's, like in "background"
			return elem.style.cssText || undefined;
		},
		set: function( elem, value ) {
			return ( elem.style.cssText = value + "" );
		}
	};
}




var rfocusable = /^(?:input|select|textarea|button|object)$/i,
	rclickable = /^(?:a|area)$/i;

jQuery.fn.extend({
	prop: function( name, value ) {
		return access( this, jQuery.prop, name, value, arguments.length > 1 );
	},

	removeProp: function( name ) {
		name = jQuery.propFix[ name ] || name;
		return this.each(function() {
			// try/catch handles cases where IE balks (such as removing a property on window)
			try {
				this[ name ] = undefined;
				delete this[ name ];
			} catch( e ) {}
		});
	}
});

jQuery.extend({
	propFix: {
		"for": "htmlFor",
		"class": "className"
	},

	prop: function( elem, name, value ) {
		var ret, hooks, notxml,
			nType = elem.nodeType;

		// don't get/set properties on text, comment and attribute nodes
		if ( !elem || nType === 3 || nType === 8 || nType === 2 ) {
			return;
		}

		notxml = nType !== 1 || !jQuery.isXMLDoc( elem );

		if ( notxml ) {
			// Fix name and attach hooks
			name = jQuery.propFix[ name ] || name;
			hooks = jQuery.propHooks[ name ];
		}

		if ( value !== undefined ) {
			return hooks && "set" in hooks && (ret = hooks.set( elem, value, name )) !== undefined ?
				ret :
				( elem[ name ] = value );

		} else {
			return hooks && "get" in hooks && (ret = hooks.get( elem, name )) !== null ?
				ret :
				elem[ name ];
		}
	},

	propHooks: {
		tabIndex: {
			get: function( elem ) {
				// elem.tabIndex doesn't always return the correct value when it hasn't been explicitly set
				// http://fluidproject.org/blog/2008/01/09/getting-setting-and-removing-tabindex-values-with-javascript/
				// Use proper attribute retrieval(#12072)
				var tabindex = jQuery.find.attr( elem, "tabindex" );

				return tabindex ?
					parseInt( tabindex, 10 ) :
					rfocusable.test( elem.nodeName ) || rclickable.test( elem.nodeName ) && elem.href ?
						0 :
						-1;
			}
		}
	}
});

// Some attributes require a special call on IE
// http://msdn.microsoft.com/en-us/library/ms536429%28VS.85%29.aspx
if ( !support.hrefNormalized ) {
	// href/src property should get the full normalized URL (#10299/#12915)
	jQuery.each([ "href", "src" ], function( i, name ) {
		jQuery.propHooks[ name ] = {
			get: function( elem ) {
				return elem.getAttribute( name, 4 );
			}
		};
	});
}

// Support: Safari, IE9+
// mis-reports the default selected property of an option
// Accessing the parent's selectedIndex property fixes it
if ( !support.optSelected ) {
	jQuery.propHooks.selected = {
		get: function( elem ) {
			var parent = elem.parentNode;

			if ( parent ) {
				parent.selectedIndex;

				// Make sure that it also works with optgroups, see #5701
				if ( parent.parentNode ) {
					parent.parentNode.selectedIndex;
				}
			}
			return null;
		}
	};
}

jQuery.each([
	"tabIndex",
	"readOnly",
	"maxLength",
	"cellSpacing",
	"cellPadding",
	"rowSpan",
	"colSpan",
	"useMap",
	"frameBorder",
	"contentEditable"
], function() {
	jQuery.propFix[ this.toLowerCase() ] = this;
});

// IE6/7 call enctype encoding
if ( !support.enctype ) {
	jQuery.propFix.enctype = "encoding";
}




var rclass = /[\t\r\n\f]/g;

jQuery.fn.extend({
	addClass: function( value ) {
		var classes, elem, cur, clazz, j, finalValue,
			i = 0,
			len = this.length,
			proceed = typeof value === "string" && value;

		if ( jQuery.isFunction( value ) ) {
			return this.each(function( j ) {
				jQuery( this ).addClass( value.call( this, j, this.className ) );
			});
		}

		if ( proceed ) {
			// The disjunction here is for better compressibility (see removeClass)
			classes = ( value || "" ).match( rnotwhite ) || [];

			for ( ; i < len; i++ ) {
				elem = this[ i ];
				cur = elem.nodeType === 1 && ( elem.className ?
					( " " + elem.className + " " ).replace( rclass, " " ) :
					" "
				);

				if ( cur ) {
					j = 0;
					while ( (clazz = classes[j++]) ) {
						if ( cur.indexOf( " " + clazz + " " ) < 0 ) {
							cur += clazz + " ";
						}
					}

					// only assign if different to avoid unneeded rendering.
					finalValue = jQuery.trim( cur );
					if ( elem.className !== finalValue ) {
						elem.className = finalValue;
					}
				}
			}
		}

		return this;
	},

	removeClass: function( value ) {
		var classes, elem, cur, clazz, j, finalValue,
			i = 0,
			len = this.length,
			proceed = arguments.length === 0 || typeof value === "string" && value;

		if ( jQuery.isFunction( value ) ) {
			return this.each(function( j ) {
				jQuery( this ).removeClass( value.call( this, j, this.className ) );
			});
		}
		if ( proceed ) {
			classes = ( value || "" ).match( rnotwhite ) || [];

			for ( ; i < len; i++ ) {
				elem = this[ i ];
				// This expression is here for better compressibility (see addClass)
				cur = elem.nodeType === 1 && ( elem.className ?
					( " " + elem.className + " " ).replace( rclass, " " ) :
					""
				);

				if ( cur ) {
					j = 0;
					while ( (clazz = classes[j++]) ) {
						// Remove *all* instances
						while ( cur.indexOf( " " + clazz + " " ) >= 0 ) {
							cur = cur.replace( " " + clazz + " ", " " );
						}
					}

					// only assign if different to avoid unneeded rendering.
					finalValue = value ? jQuery.trim( cur ) : "";
					if ( elem.className !== finalValue ) {
						elem.className = finalValue;
					}
				}
			}
		}

		return this;
	},

	toggleClass: function( value, stateVal ) {
		var type = typeof value;

		if ( typeof stateVal === "boolean" && type === "string" ) {
			return stateVal ? this.addClass( value ) : this.removeClass( value );
		}

		if ( jQuery.isFunction( value ) ) {
			return this.each(function( i ) {
				jQuery( this ).toggleClass( value.call(this, i, this.className, stateVal), stateVal );
			});
		}

		return this.each(function() {
			if ( type === "string" ) {
				// toggle individual class names
				var className,
					i = 0,
					self = jQuery( this ),
					classNames = value.match( rnotwhite ) || [];

				while ( (className = classNames[ i++ ]) ) {
					// check each className given, space separated list
					if ( self.hasClass( className ) ) {
						self.removeClass( className );
					} else {
						self.addClass( className );
					}
				}

			// Toggle whole class name
			} else if ( type === strundefined || type === "boolean" ) {
				if ( this.className ) {
					// store className if set
					jQuery._data( this, "__className__", this.className );
				}

				// If the element has a class name or if we're passed "false",
				// then remove the whole classname (if there was one, the above saved it).
				// Otherwise bring back whatever was previously saved (if anything),
				// falling back to the empty string if nothing was stored.
				this.className = this.className || value === false ? "" : jQuery._data( this, "__className__" ) || "";
			}
		});
	},

	hasClass: function( selector ) {
		var className = " " + selector + " ",
			i = 0,
			l = this.length;
		for ( ; i < l; i++ ) {
			if ( this[i].nodeType === 1 && (" " + this[i].className + " ").replace(rclass, " ").indexOf( className ) >= 0 ) {
				return true;
			}
		}

		return false;
	}
});




// Return jQuery for attributes-only inclusion


jQuery.each( ("blur focus focusin focusout load resize scroll unload click dblclick " +
	"mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave " +
	"change select submit keydown keypress keyup error contextmenu").split(" "), function( i, name ) {

	// Handle event binding
	jQuery.fn[ name ] = function( data, fn ) {
		return arguments.length > 0 ?
			this.on( name, null, data, fn ) :
			this.trigger( name );
	};
});

jQuery.fn.extend({
	hover: function( fnOver, fnOut ) {
		return this.mouseenter( fnOver ).mouseleave( fnOut || fnOver );
	},

	bind: function( types, data, fn ) {
		return this.on( types, null, data, fn );
	},
	unbind: function( types, fn ) {
		return this.off( types, null, fn );
	},

	delegate: function( selector, types, data, fn ) {
		return this.on( types, selector, data, fn );
	},
	undelegate: function( selector, types, fn ) {
		// ( namespace ) or ( selector, types [, fn] )
		return arguments.length === 1 ? this.off( selector, "**" ) : this.off( types, selector || "**", fn );
	}
});


var nonce = jQuery.now();

var rquery = (/\?/);



var rvalidtokens = /(,)|(\[|{)|(}|])|"(?:[^"\\\r\n]|\\["\\\/bfnrt]|\\u[\da-fA-F]{4})*"\s*:?|true|false|null|-?(?!0\d)\d+(?:\.\d+|)(?:[eE][+-]?\d+|)/g;

jQuery.parseJSON = function( data ) {
	// Attempt to parse using the native JSON parser first
	if ( window.JSON && window.JSON.parse ) {
		// Support: Android 2.3
		// Workaround failure to string-cast null input
		return window.JSON.parse( data + "" );
	}

	var requireNonComma,
		depth = null,
		str = jQuery.trim( data + "" );

	// Guard against invalid (and possibly dangerous) input by ensuring that nothing remains
	// after removing valid tokens
	return str && !jQuery.trim( str.replace( rvalidtokens, function( token, comma, open, close ) {

		// Force termination if we see a misplaced comma
		if ( requireNonComma && comma ) {
			depth = 0;
		}

		// Perform no more replacements after returning to outermost depth
		if ( depth === 0 ) {
			return token;
		}

		// Commas must not follow "[", "{", or ","
		requireNonComma = open || comma;

		// Determine new depth
		// array/object open ("[" or "{"): depth += true - false (increment)
		// array/object close ("]" or "}"): depth += false - true (decrement)
		// other cases ("," or primitive): depth += true - true (numeric cast)
		depth += !close - !open;

		// Remove this token
		return "";
	}) ) ?
		( Function( "return " + str ) )() :
		jQuery.error( "Invalid JSON: " + data );
};


// Cross-browser xml parsing
jQuery.parseXML = function( data ) {
	var xml, tmp;
	if ( !data || typeof data !== "string" ) {
		return null;
	}
	try {
		if ( window.DOMParser ) { // Standard
			tmp = new DOMParser();
			xml = tmp.parseFromString( data, "text/xml" );
		} else { // IE
			xml = new ActiveXObject( "Microsoft.XMLDOM" );
			xml.async = "false";
			xml.loadXML( data );
		}
	} catch( e ) {
		xml = undefined;
	}
	if ( !xml || !xml.documentElement || xml.getElementsByTagName( "parsererror" ).length ) {
		jQuery.error( "Invalid XML: " + data );
	}
	return xml;
};


var
	// Document location
	ajaxLocParts,
	ajaxLocation,

	rhash = /#.*$/,
	rts = /([?&])_=[^&]*/,
	rheaders = /^(.*?):[ \t]*([^\r\n]*)\r?$/mg, // IE leaves an \r character at EOL
	// #7653, #8125, #8152: local protocol detection
	rlocalProtocol = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/,
	rnoContent = /^(?:GET|HEAD)$/,
	rprotocol = /^\/\//,
	rurl = /^([\w.+-]+:)(?:\/\/(?:[^\/?#]*@|)([^\/?#:]*)(?::(\d+)|)|)/,

	/* Prefilters
	 * 1) They are useful to introduce custom dataTypes (see ajax/jsonp.js for an example)
	 * 2) These are called:
	 *    - BEFORE asking for a transport
	 *    - AFTER param serialization (s.data is a string if s.processData is true)
	 * 3) key is the dataType
	 * 4) the catchall symbol "*" can be used
	 * 5) execution will start with transport dataType and THEN continue down to "*" if needed
	 */
	prefilters = {},

	/* Transports bindings
	 * 1) key is the dataType
	 * 2) the catchall symbol "*" can be used
	 * 3) selection will start with transport dataType and THEN go to "*" if needed
	 */
	transports = {},

	// Avoid comment-prolog char sequence (#10098); must appease lint and evade compression
	allTypes = "*/".concat("*");

// #8138, IE may throw an exception when accessing
// a field from window.location if document.domain has been set
try {
	ajaxLocation = location.href;
} catch( e ) {
	// Use the href attribute of an A element
	// since IE will modify it given document.location
	ajaxLocation = document.createElement( "a" );
	ajaxLocation.href = "";
	ajaxLocation = ajaxLocation.href;
}

// Segment location into parts
ajaxLocParts = rurl.exec( ajaxLocation.toLowerCase() ) || [];

// Base "constructor" for jQuery.ajaxPrefilter and jQuery.ajaxTransport
function addToPrefiltersOrTransports( structure ) {

	// dataTypeExpression is optional and defaults to "*"
	return function( dataTypeExpression, func ) {

		if ( typeof dataTypeExpression !== "string" ) {
			func = dataTypeExpression;
			dataTypeExpression = "*";
		}

		var dataType,
			i = 0,
			dataTypes = dataTypeExpression.toLowerCase().match( rnotwhite ) || [];

		if ( jQuery.isFunction( func ) ) {
			// For each dataType in the dataTypeExpression
			while ( (dataType = dataTypes[i++]) ) {
				// Prepend if requested
				if ( dataType.charAt( 0 ) === "+" ) {
					dataType = dataType.slice( 1 ) || "*";
					(structure[ dataType ] = structure[ dataType ] || []).unshift( func );

				// Otherwise append
				} else {
					(structure[ dataType ] = structure[ dataType ] || []).push( func );
				}
			}
		}
	};
}

// Base inspection function for prefilters and transports
function inspectPrefiltersOrTransports( structure, options, originalOptions, jqXHR ) {

	var inspected = {},
		seekingTransport = ( structure === transports );

	function inspect( dataType ) {
		var selected;
		inspected[ dataType ] = true;
		jQuery.each( structure[ dataType ] || [], function( _, prefilterOrFactory ) {
			var dataTypeOrTransport = prefilterOrFactory( options, originalOptions, jqXHR );
			if ( typeof dataTypeOrTransport === "string" && !seekingTransport && !inspected[ dataTypeOrTransport ] ) {
				options.dataTypes.unshift( dataTypeOrTransport );
				inspect( dataTypeOrTransport );
				return false;
			} else if ( seekingTransport ) {
				return !( selected = dataTypeOrTransport );
			}
		});
		return selected;
	}

	return inspect( options.dataTypes[ 0 ] ) || !inspected[ "*" ] && inspect( "*" );
}

// A special extend for ajax options
// that takes "flat" options (not to be deep extended)
// Fixes #9887
function ajaxExtend( target, src ) {
	var deep, key,
		flatOptions = jQuery.ajaxSettings.flatOptions || {};

	for ( key in src ) {
		if ( src[ key ] !== undefined ) {
			( flatOptions[ key ] ? target : ( deep || (deep = {}) ) )[ key ] = src[ key ];
		}
	}
	if ( deep ) {
		jQuery.extend( true, target, deep );
	}

	return target;
}

/* Handles responses to an ajax request:
 * - finds the right dataType (mediates between content-type and expected dataType)
 * - returns the corresponding response
 */
function ajaxHandleResponses( s, jqXHR, responses ) {
	var firstDataType, ct, finalDataType, type,
		contents = s.contents,
		dataTypes = s.dataTypes;

	// Remove auto dataType and get content-type in the process
	while ( dataTypes[ 0 ] === "*" ) {
		dataTypes.shift();
		if ( ct === undefined ) {
			ct = s.mimeType || jqXHR.getResponseHeader("Content-Type");
		}
	}

	// Check if we're dealing with a known content-type
	if ( ct ) {
		for ( type in contents ) {
			if ( contents[ type ] && contents[ type ].test( ct ) ) {
				dataTypes.unshift( type );
				break;
			}
		}
	}

	// Check to see if we have a response for the expected dataType
	if ( dataTypes[ 0 ] in responses ) {
		finalDataType = dataTypes[ 0 ];
	} else {
		// Try convertible dataTypes
		for ( type in responses ) {
			if ( !dataTypes[ 0 ] || s.converters[ type + " " + dataTypes[0] ] ) {
				finalDataType = type;
				break;
			}
			if ( !firstDataType ) {
				firstDataType = type;
			}
		}
		// Or just use first one
		finalDataType = finalDataType || firstDataType;
	}

	// If we found a dataType
	// We add the dataType to the list if needed
	// and return the corresponding response
	if ( finalDataType ) {
		if ( finalDataType !== dataTypes[ 0 ] ) {
			dataTypes.unshift( finalDataType );
		}
		return responses[ finalDataType ];
	}
}

/* Chain conversions given the request and the original response
 * Also sets the responseXXX fields on the jqXHR instance
 */
function ajaxConvert( s, response, jqXHR, isSuccess ) {
	var conv2, current, conv, tmp, prev,
		converters = {},
		// Work with a copy of dataTypes in case we need to modify it for conversion
		dataTypes = s.dataTypes.slice();

	// Create converters map with lowercased keys
	if ( dataTypes[ 1 ] ) {
		for ( conv in s.converters ) {
			converters[ conv.toLowerCase() ] = s.converters[ conv ];
		}
	}

	current = dataTypes.shift();

	// Convert to each sequential dataType
	while ( current ) {

		if ( s.responseFields[ current ] ) {
			jqXHR[ s.responseFields[ current ] ] = response;
		}

		// Apply the dataFilter if provided
		if ( !prev && isSuccess && s.dataFilter ) {
			response = s.dataFilter( response, s.dataType );
		}

		prev = current;
		current = dataTypes.shift();

		if ( current ) {

			// There's only work to do if current dataType is non-auto
			if ( current === "*" ) {

				current = prev;

			// Convert response if prev dataType is non-auto and differs from current
			} else if ( prev !== "*" && prev !== current ) {

				// Seek a direct converter
				conv = converters[ prev + " " + current ] || converters[ "* " + current ];

				// If none found, seek a pair
				if ( !conv ) {
					for ( conv2 in converters ) {

						// If conv2 outputs current
						tmp = conv2.split( " " );
						if ( tmp[ 1 ] === current ) {

							// If prev can be converted to accepted input
							conv = converters[ prev + " " + tmp[ 0 ] ] ||
								converters[ "* " + tmp[ 0 ] ];
							if ( conv ) {
								// Condense equivalence converters
								if ( conv === true ) {
									conv = converters[ conv2 ];

								// Otherwise, insert the intermediate dataType
								} else if ( converters[ conv2 ] !== true ) {
									current = tmp[ 0 ];
									dataTypes.unshift( tmp[ 1 ] );
								}
								break;
							}
						}
					}
				}

				// Apply converter (if not an equivalence)
				if ( conv !== true ) {

					// Unless errors are allowed to bubble, catch and return them
					if ( conv && s[ "throws" ] ) {
						response = conv( response );
					} else {
						try {
							response = conv( response );
						} catch ( e ) {
							return { state: "parsererror", error: conv ? e : "No conversion from " + prev + " to " + current };
						}
					}
				}
			}
		}
	}

	return { state: "success", data: response };
}

jQuery.extend({

	// Counter for holding the number of active queries
	active: 0,

	// Last-Modified header cache for next request
	lastModified: {},
	etag: {},

	ajaxSettings: {
		url: ajaxLocation,
		type: "GET",
		isLocal: rlocalProtocol.test( ajaxLocParts[ 1 ] ),
		global: true,
		processData: true,
		async: true,
		contentType: "application/x-www-form-urlencoded; charset=UTF-8",
		/*
		timeout: 0,
		data: null,
		dataType: null,
		username: null,
		password: null,
		cache: null,
		throws: false,
		traditional: false,
		headers: {},
		*/

		accepts: {
			"*": allTypes,
			text: "text/plain",
			html: "text/html",
			xml: "application/xml, text/xml",
			json: "application/json, text/javascript"
		},

		contents: {
			xml: /xml/,
			html: /html/,
			json: /json/
		},

		responseFields: {
			xml: "responseXML",
			text: "responseText",
			json: "responseJSON"
		},

		// Data converters
		// Keys separate source (or catchall "*") and destination types with a single space
		converters: {

			// Convert anything to text
			"* text": String,

			// Text to html (true = no transformation)
			"text html": true,

			// Evaluate text as a json expression
			"text json": jQuery.parseJSON,

			// Parse text as xml
			"text xml": jQuery.parseXML
		},

		// For options that shouldn't be deep extended:
		// you can add your own custom options here if
		// and when you create one that shouldn't be
		// deep extended (see ajaxExtend)
		flatOptions: {
			url: true,
			context: true
		}
	},

	// Creates a full fledged settings object into target
	// with both ajaxSettings and settings fields.
	// If target is omitted, writes into ajaxSettings.
	ajaxSetup: function( target, settings ) {
		return settings ?

			// Building a settings object
			ajaxExtend( ajaxExtend( target, jQuery.ajaxSettings ), settings ) :

			// Extending ajaxSettings
			ajaxExtend( jQuery.ajaxSettings, target );
	},

	ajaxPrefilter: addToPrefiltersOrTransports( prefilters ),
	ajaxTransport: addToPrefiltersOrTransports( transports ),

	// Main method
	ajax: function( url, options ) {

		// If url is an object, simulate pre-1.5 signature
		if ( typeof url === "object" ) {
			options = url;
			url = undefined;
		}

		// Force options to be an object
		options = options || {};

		var // Cross-domain detection vars
			parts,
			// Loop variable
			i,
			// URL without anti-cache param
			cacheURL,
			// Response headers as string
			responseHeadersString,
			// timeout handle
			timeoutTimer,

			// To know if global events are to be dispatched
			fireGlobals,

			transport,
			// Response headers
			responseHeaders,
			// Create the final options object
			s = jQuery.ajaxSetup( {}, options ),
			// Callbacks context
			callbackContext = s.context || s,
			// Context for global events is callbackContext if it is a DOM node or jQuery collection
			globalEventContext = s.context && ( callbackContext.nodeType || callbackContext.jquery ) ?
				jQuery( callbackContext ) :
				jQuery.event,
			// Deferreds
			deferred = jQuery.Deferred(),
			completeDeferred = jQuery.Callbacks("once memory"),
			// Status-dependent callbacks
			statusCode = s.statusCode || {},
			// Headers (they are sent all at once)
			requestHeaders = {},
			requestHeadersNames = {},
			// The jqXHR state
			state = 0,
			// Default abort message
			strAbort = "canceled",
			// Fake xhr
			jqXHR = {
				readyState: 0,

				// Builds headers hashtable if needed
				getResponseHeader: function( key ) {
					var match;
					if ( state === 2 ) {
						if ( !responseHeaders ) {
							responseHeaders = {};
							while ( (match = rheaders.exec( responseHeadersString )) ) {
								responseHeaders[ match[1].toLowerCase() ] = match[ 2 ];
							}
						}
						match = responseHeaders[ key.toLowerCase() ];
					}
					return match == null ? null : match;
				},

				// Raw string
				getAllResponseHeaders: function() {
					return state === 2 ? responseHeadersString : null;
				},

				// Caches the header
				setRequestHeader: function( name, value ) {
					var lname = name.toLowerCase();
					if ( !state ) {
						name = requestHeadersNames[ lname ] = requestHeadersNames[ lname ] || name;
						requestHeaders[ name ] = value;
					}
					return this;
				},

				// Overrides response content-type header
				overrideMimeType: function( type ) {
					if ( !state ) {
						s.mimeType = type;
					}
					return this;
				},

				// Status-dependent callbacks
				statusCode: function( map ) {
					var code;
					if ( map ) {
						if ( state < 2 ) {
							for ( code in map ) {
								// Lazy-add the new callback in a way that preserves old ones
								statusCode[ code ] = [ statusCode[ code ], map[ code ] ];
							}
						} else {
							// Execute the appropriate callbacks
							jqXHR.always( map[ jqXHR.status ] );
						}
					}
					return this;
				},

				// Cancel the request
				abort: function( statusText ) {
					var finalText = statusText || strAbort;
					if ( transport ) {
						transport.abort( finalText );
					}
					done( 0, finalText );
					return this;
				}
			};

		// Attach deferreds
		deferred.promise( jqXHR ).complete = completeDeferred.add;
		jqXHR.success = jqXHR.done;
		jqXHR.error = jqXHR.fail;

		// Remove hash character (#7531: and string promotion)
		// Add protocol if not provided (#5866: IE7 issue with protocol-less urls)
		// Handle falsy url in the settings object (#10093: consistency with old signature)
		// We also use the url parameter if available
		s.url = ( ( url || s.url || ajaxLocation ) + "" ).replace( rhash, "" ).replace( rprotocol, ajaxLocParts[ 1 ] + "//" );

		// Alias method option to type as per ticket #12004
		s.type = options.method || options.type || s.method || s.type;

		// Extract dataTypes list
		s.dataTypes = jQuery.trim( s.dataType || "*" ).toLowerCase().match( rnotwhite ) || [ "" ];

		// A cross-domain request is in order when we have a protocol:host:port mismatch
		if ( s.crossDomain == null ) {
			parts = rurl.exec( s.url.toLowerCase() );
			s.crossDomain = !!( parts &&
				( parts[ 1 ] !== ajaxLocParts[ 1 ] || parts[ 2 ] !== ajaxLocParts[ 2 ] ||
					( parts[ 3 ] || ( parts[ 1 ] === "http:" ? "80" : "443" ) ) !==
						( ajaxLocParts[ 3 ] || ( ajaxLocParts[ 1 ] === "http:" ? "80" : "443" ) ) )
			);
		}

		// Convert data if not already a string
		if ( s.data && s.processData && typeof s.data !== "string" ) {
			s.data = jQuery.param( s.data, s.traditional );
		}

		// Apply prefilters
		inspectPrefiltersOrTransports( prefilters, s, options, jqXHR );

		// If request was aborted inside a prefilter, stop there
		if ( state === 2 ) {
			return jqXHR;
		}

		// We can fire global events as of now if asked to
		fireGlobals = s.global;

		// Watch for a new set of requests
		if ( fireGlobals && jQuery.active++ === 0 ) {
			jQuery.event.trigger("ajaxStart");
		}

		// Uppercase the type
		s.type = s.type.toUpperCase();

		// Determine if request has content
		s.hasContent = !rnoContent.test( s.type );

		// Save the URL in case we're toying with the If-Modified-Since
		// and/or If-None-Match header later on
		cacheURL = s.url;

		// More options handling for requests with no content
		if ( !s.hasContent ) {

			// If data is available, append data to url
			if ( s.data ) {
				cacheURL = ( s.url += ( rquery.test( cacheURL ) ? "&" : "?" ) + s.data );
				// #9682: remove data so that it's not used in an eventual retry
				delete s.data;
			}

			// Add anti-cache in url if needed
			if ( s.cache === false ) {
				s.url = rts.test( cacheURL ) ?

					// If there is already a '_' parameter, set its value
					cacheURL.replace( rts, "$1_=" + nonce++ ) :

					// Otherwise add one to the end
					cacheURL + ( rquery.test( cacheURL ) ? "&" : "?" ) + "_=" + nonce++;
			}
		}

		// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
		if ( s.ifModified ) {
			if ( jQuery.lastModified[ cacheURL ] ) {
				jqXHR.setRequestHeader( "If-Modified-Since", jQuery.lastModified[ cacheURL ] );
			}
			if ( jQuery.etag[ cacheURL ] ) {
				jqXHR.setRequestHeader( "If-None-Match", jQuery.etag[ cacheURL ] );
			}
		}

		// Set the correct header, if data is being sent
		if ( s.data && s.hasContent && s.contentType !== false || options.contentType ) {
			jqXHR.setRequestHeader( "Content-Type", s.contentType );
		}

		// Set the Accepts header for the server, depending on the dataType
		jqXHR.setRequestHeader(
			"Accept",
			s.dataTypes[ 0 ] && s.accepts[ s.dataTypes[0] ] ?
				s.accepts[ s.dataTypes[0] ] + ( s.dataTypes[ 0 ] !== "*" ? ", " + allTypes + "; q=0.01" : "" ) :
				s.accepts[ "*" ]
		);

		// Check for headers option
		for ( i in s.headers ) {
			jqXHR.setRequestHeader( i, s.headers[ i ] );
		}

		// Allow custom headers/mimetypes and early abort
		if ( s.beforeSend && ( s.beforeSend.call( callbackContext, jqXHR, s ) === false || state === 2 ) ) {
			// Abort if not done already and return
			return jqXHR.abort();
		}

		// aborting is no longer a cancellation
		strAbort = "abort";

		// Install callbacks on deferreds
		for ( i in { success: 1, error: 1, complete: 1 } ) {
			jqXHR[ i ]( s[ i ] );
		}

		// Get transport
		transport = inspectPrefiltersOrTransports( transports, s, options, jqXHR );

		// If no transport, we auto-abort
		if ( !transport ) {
			done( -1, "No Transport" );
		} else {
			jqXHR.readyState = 1;

			// Send global event
			if ( fireGlobals ) {
				globalEventContext.trigger( "ajaxSend", [ jqXHR, s ] );
			}
			// Timeout
			if ( s.async && s.timeout > 0 ) {
				timeoutTimer = setTimeout(function() {
					jqXHR.abort("timeout");
				}, s.timeout );
			}

			try {
				state = 1;
				transport.send( requestHeaders, done );
			} catch ( e ) {
				// Propagate exception as error if not done
				if ( state < 2 ) {
					done( -1, e );
				// Simply rethrow otherwise
				} else {
					throw e;
				}
			}
		}

		// Callback for when everything is done
		function done( status, nativeStatusText, responses, headers ) {
			var isSuccess, success, error, response, modified,
				statusText = nativeStatusText;

			// Called once
			if ( state === 2 ) {
				return;
			}

			// State is "done" now
			state = 2;

			// Clear timeout if it exists
			if ( timeoutTimer ) {
				clearTimeout( timeoutTimer );
			}

			// Dereference transport for early garbage collection
			// (no matter how long the jqXHR object will be used)
			transport = undefined;

			// Cache response headers
			responseHeadersString = headers || "";

			// Set readyState
			jqXHR.readyState = status > 0 ? 4 : 0;

			// Determine if successful
			isSuccess = status >= 200 && status < 300 || status === 304;

			// Get response data
			if ( responses ) {
				response = ajaxHandleResponses( s, jqXHR, responses );
			}

			// Convert no matter what (that way responseXXX fields are always set)
			response = ajaxConvert( s, response, jqXHR, isSuccess );

			// If successful, handle type chaining
			if ( isSuccess ) {

				// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
				if ( s.ifModified ) {
					modified = jqXHR.getResponseHeader("Last-Modified");
					if ( modified ) {
						jQuery.lastModified[ cacheURL ] = modified;
					}
					modified = jqXHR.getResponseHeader("etag");
					if ( modified ) {
						jQuery.etag[ cacheURL ] = modified;
					}
				}

				// if no content
				if ( status === 204 || s.type === "HEAD" ) {
					statusText = "nocontent";

				// if not modified
				} else if ( status === 304 ) {
					statusText = "notmodified";

				// If we have data, let's convert it
				} else {
					statusText = response.state;
					success = response.data;
					error = response.error;
					isSuccess = !error;
				}
			} else {
				// We extract error from statusText
				// then normalize statusText and status for non-aborts
				error = statusText;
				if ( status || !statusText ) {
					statusText = "error";
					if ( status < 0 ) {
						status = 0;
					}
				}
			}

			// Set data for the fake xhr object
			jqXHR.status = status;
			jqXHR.statusText = ( nativeStatusText || statusText ) + "";

			// Success/Error
			if ( isSuccess ) {
				deferred.resolveWith( callbackContext, [ success, statusText, jqXHR ] );
			} else {
				deferred.rejectWith( callbackContext, [ jqXHR, statusText, error ] );
			}

			// Status-dependent callbacks
			jqXHR.statusCode( statusCode );
			statusCode = undefined;

			if ( fireGlobals ) {
				globalEventContext.trigger( isSuccess ? "ajaxSuccess" : "ajaxError",
					[ jqXHR, s, isSuccess ? success : error ] );
			}

			// Complete
			completeDeferred.fireWith( callbackContext, [ jqXHR, statusText ] );

			if ( fireGlobals ) {
				globalEventContext.trigger( "ajaxComplete", [ jqXHR, s ] );
				// Handle the global AJAX counter
				if ( !( --jQuery.active ) ) {
					jQuery.event.trigger("ajaxStop");
				}
			}
		}

		return jqXHR;
	},

	getJSON: function( url, data, callback ) {
		return jQuery.get( url, data, callback, "json" );
	},

	getScript: function( url, callback ) {
		return jQuery.get( url, undefined, callback, "script" );
	}
});

jQuery.each( [ "get", "post" ], function( i, method ) {
	jQuery[ method ] = function( url, data, callback, type ) {
		// shift arguments if data argument was omitted
		if ( jQuery.isFunction( data ) ) {
			type = type || callback;
			callback = data;
			data = undefined;
		}

		return jQuery.ajax({
			url: url,
			type: method,
			dataType: type,
			data: data,
			success: callback
		});
	};
});

// Attach a bunch of functions for handling common AJAX events
jQuery.each( [ "ajaxStart", "ajaxStop", "ajaxComplete", "ajaxError", "ajaxSuccess", "ajaxSend" ], function( i, type ) {
	jQuery.fn[ type ] = function( fn ) {
		return this.on( type, fn );
	};
});


jQuery._evalUrl = function( url ) {
	return jQuery.ajax({
		url: url,
		type: "GET",
		dataType: "script",
		async: false,
		global: false,
		"throws": true
	});
};


jQuery.fn.extend({
	wrapAll: function( html ) {
		if ( jQuery.isFunction( html ) ) {
			return this.each(function(i) {
				jQuery(this).wrapAll( html.call(this, i) );
			});
		}

		if ( this[0] ) {
			// The elements to wrap the target around
			var wrap = jQuery( html, this[0].ownerDocument ).eq(0).clone(true);

			if ( this[0].parentNode ) {
				wrap.insertBefore( this[0] );
			}

			wrap.map(function() {
				var elem = this;

				while ( elem.firstChild && elem.firstChild.nodeType === 1 ) {
					elem = elem.firstChild;
				}

				return elem;
			}).append( this );
		}

		return this;
	},

	wrapInner: function( html ) {
		if ( jQuery.isFunction( html ) ) {
			return this.each(function(i) {
				jQuery(this).wrapInner( html.call(this, i) );
			});
		}

		return this.each(function() {
			var self = jQuery( this ),
				contents = self.contents();

			if ( contents.length ) {
				contents.wrapAll( html );

			} else {
				self.append( html );
			}
		});
	},

	wrap: function( html ) {
		var isFunction = jQuery.isFunction( html );

		return this.each(function(i) {
			jQuery( this ).wrapAll( isFunction ? html.call(this, i) : html );
		});
	},

	unwrap: function() {
		return this.parent().each(function() {
			if ( !jQuery.nodeName( this, "body" ) ) {
				jQuery( this ).replaceWith( this.childNodes );
			}
		}).end();
	}
});


jQuery.expr.filters.hidden = function( elem ) {
	// Support: Opera <= 12.12
	// Opera reports offsetWidths and offsetHeights less than zero on some elements
	return elem.offsetWidth <= 0 && elem.offsetHeight <= 0 ||
		(!support.reliableHiddenOffsets() &&
			((elem.style && elem.style.display) || jQuery.css( elem, "display" )) === "none");
};

jQuery.expr.filters.visible = function( elem ) {
	return !jQuery.expr.filters.hidden( elem );
};




var r20 = /%20/g,
	rbracket = /\[\]$/,
	rCRLF = /\r?\n/g,
	rsubmitterTypes = /^(?:submit|button|image|reset|file)$/i,
	rsubmittable = /^(?:input|select|textarea|keygen)/i;

function buildParams( prefix, obj, traditional, add ) {
	var name;

	if ( jQuery.isArray( obj ) ) {
		// Serialize array item.
		jQuery.each( obj, function( i, v ) {
			if ( traditional || rbracket.test( prefix ) ) {
				// Treat each array item as a scalar.
				add( prefix, v );

			} else {
				// Item is non-scalar (array or object), encode its numeric index.
				buildParams( prefix + "[" + ( typeof v === "object" ? i : "" ) + "]", v, traditional, add );
			}
		});

	} else if ( !traditional && jQuery.type( obj ) === "object" ) {
		// Serialize object item.
		for ( name in obj ) {
			buildParams( prefix + "[" + name + "]", obj[ name ], traditional, add );
		}

	} else {
		// Serialize scalar item.
		add( prefix, obj );
	}
}

// Serialize an array of form elements or a set of
// key/values into a query string
jQuery.param = function( a, traditional ) {
	var prefix,
		s = [],
		add = function( key, value ) {
			// If value is a function, invoke it and return its value
			value = jQuery.isFunction( value ) ? value() : ( value == null ? "" : value );
			s[ s.length ] = encodeURIComponent( key ) + "=" + encodeURIComponent( value );
		};

	// Set traditional to true for jQuery <= 1.3.2 behavior.
	if ( traditional === undefined ) {
		traditional = jQuery.ajaxSettings && jQuery.ajaxSettings.traditional;
	}

	// If an array was passed in, assume that it is an array of form elements.
	if ( jQuery.isArray( a ) || ( a.jquery && !jQuery.isPlainObject( a ) ) ) {
		// Serialize the form elements
		jQuery.each( a, function() {
			add( this.name, this.value );
		});

	} else {
		// If traditional, encode the "old" way (the way 1.3.2 or older
		// did it), otherwise encode params recursively.
		for ( prefix in a ) {
			buildParams( prefix, a[ prefix ], traditional, add );
		}
	}

	// Return the resulting serialization
	return s.join( "&" ).replace( r20, "+" );
};

jQuery.fn.extend({
	serialize: function() {
		return jQuery.param( this.serializeArray() );
	},
	serializeArray: function() {
		return this.map(function() {
			// Can add propHook for "elements" to filter or add form elements
			var elements = jQuery.prop( this, "elements" );
			return elements ? jQuery.makeArray( elements ) : this;
		})
		.filter(function() {
			var type = this.type;
			// Use .is(":disabled") so that fieldset[disabled] works
			return this.name && !jQuery( this ).is( ":disabled" ) &&
				rsubmittable.test( this.nodeName ) && !rsubmitterTypes.test( type ) &&
				( this.checked || !rcheckableType.test( type ) );
		})
		.map(function( i, elem ) {
			var val = jQuery( this ).val();

			return val == null ?
				null :
				jQuery.isArray( val ) ?
					jQuery.map( val, function( val ) {
						return { name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
					}) :
					{ name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
		}).get();
	}
});


// Create the request object
// (This is still attached to ajaxSettings for backward compatibility)
jQuery.ajaxSettings.xhr = window.ActiveXObject !== undefined ?
	// Support: IE6+
	function() {

		// XHR cannot access local files, always use ActiveX for that case
		return !this.isLocal &&

			// Support: IE7-8
			// oldIE XHR does not support non-RFC2616 methods (#13240)
			// See http://msdn.microsoft.com/en-us/library/ie/ms536648(v=vs.85).aspx
			// and http://www.w3.org/Protocols/rfc2616/rfc2616-sec9.html#sec9
			// Although this check for six methods instead of eight
			// since IE also does not support "trace" and "connect"
			/^(get|post|head|put|delete|options)$/i.test( this.type ) &&

			createStandardXHR() || createActiveXHR();
	} :
	// For all other browsers, use the standard XMLHttpRequest object
	createStandardXHR;

var xhrId = 0,
	xhrCallbacks = {},
	xhrSupported = jQuery.ajaxSettings.xhr();

// Support: IE<10
// Open requests must be manually aborted on unload (#5280)
if ( window.ActiveXObject ) {
	jQuery( window ).on( "unload", function() {
		for ( var key in xhrCallbacks ) {
			xhrCallbacks[ key ]( undefined, true );
		}
	});
}

// Determine support properties
support.cors = !!xhrSupported && ( "withCredentials" in xhrSupported );
xhrSupported = support.ajax = !!xhrSupported;

// Create transport if the browser can provide an xhr
if ( xhrSupported ) {

	jQuery.ajaxTransport(function( options ) {
		// Cross domain only allowed if supported through XMLHttpRequest
		if ( !options.crossDomain || support.cors ) {

			var callback;

			return {
				send: function( headers, complete ) {
					var i,
						xhr = options.xhr(),
						id = ++xhrId;

					// Open the socket
					xhr.open( options.type, options.url, options.async, options.username, options.password );

					// Apply custom fields if provided
					if ( options.xhrFields ) {
						for ( i in options.xhrFields ) {
							xhr[ i ] = options.xhrFields[ i ];
						}
					}

					// Override mime type if needed
					if ( options.mimeType && xhr.overrideMimeType ) {
						xhr.overrideMimeType( options.mimeType );
					}

					// X-Requested-With header
					// For cross-domain requests, seeing as conditions for a preflight are
					// akin to a jigsaw puzzle, we simply never set it to be sure.
					// (it can always be set on a per-request basis or even using ajaxSetup)
					// For same-domain requests, won't change header if already provided.
					if ( !options.crossDomain && !headers["X-Requested-With"] ) {
						headers["X-Requested-With"] = "XMLHttpRequest";
					}

					// Set headers
					for ( i in headers ) {
						// Support: IE<9
						// IE's ActiveXObject throws a 'Type Mismatch' exception when setting
						// request header to a null-value.
						//
						// To keep consistent with other XHR implementations, cast the value
						// to string and ignore `undefined`.
						if ( headers[ i ] !== undefined ) {
							xhr.setRequestHeader( i, headers[ i ] + "" );
						}
					}

					// Do send the request
					// This may raise an exception which is actually
					// handled in jQuery.ajax (so no try/catch here)
					xhr.send( ( options.hasContent && options.data ) || null );

					// Listener
					callback = function( _, isAbort ) {
						var status, statusText, responses;

						// Was never called and is aborted or complete
						if ( callback && ( isAbort || xhr.readyState === 4 ) ) {
							// Clean up
							delete xhrCallbacks[ id ];
							callback = undefined;
							xhr.onreadystatechange = jQuery.noop;

							// Abort manually if needed
							if ( isAbort ) {
								if ( xhr.readyState !== 4 ) {
									xhr.abort();
								}
							} else {
								responses = {};
								status = xhr.status;

								// Support: IE<10
								// Accessing binary-data responseText throws an exception
								// (#11426)
								if ( typeof xhr.responseText === "string" ) {
									responses.text = xhr.responseText;
								}

								// Firefox throws an exception when accessing
								// statusText for faulty cross-domain requests
								try {
									statusText = xhr.statusText;
								} catch( e ) {
									// We normalize with Webkit giving an empty statusText
									statusText = "";
								}

								// Filter status for non standard behaviors

								// If the request is local and we have data: assume a success
								// (success with no data won't get notified, that's the best we
								// can do given current implementations)
								if ( !status && options.isLocal && !options.crossDomain ) {
									status = responses.text ? 200 : 404;
								// IE - #1450: sometimes returns 1223 when it should be 204
								} else if ( status === 1223 ) {
									status = 204;
								}
							}
						}

						// Call complete if needed
						if ( responses ) {
							complete( status, statusText, responses, xhr.getAllResponseHeaders() );
						}
					};

					if ( !options.async ) {
						// if we're in sync mode we fire the callback
						callback();
					} else if ( xhr.readyState === 4 ) {
						// (IE6 & IE7) if it's in cache and has been
						// retrieved directly we need to fire the callback
						setTimeout( callback );
					} else {
						// Add to the list of active xhr callbacks
						xhr.onreadystatechange = xhrCallbacks[ id ] = callback;
					}
				},

				abort: function() {
					if ( callback ) {
						callback( undefined, true );
					}
				}
			};
		}
	});
}

// Functions to create xhrs
function createStandardXHR() {
	try {
		return new window.XMLHttpRequest();
	} catch( e ) {}
}

function createActiveXHR() {
	try {
		return new window.ActiveXObject( "Microsoft.XMLHTTP" );
	} catch( e ) {}
}




// Install script dataType
jQuery.ajaxSetup({
	accepts: {
		script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"
	},
	contents: {
		script: /(?:java|ecma)script/
	},
	converters: {
		"text script": function( text ) {
			jQuery.globalEval( text );
			return text;
		}
	}
});

// Handle cache's special case and global
jQuery.ajaxPrefilter( "script", function( s ) {
	if ( s.cache === undefined ) {
		s.cache = false;
	}
	if ( s.crossDomain ) {
		s.type = "GET";
		s.global = false;
	}
});

// Bind script tag hack transport
jQuery.ajaxTransport( "script", function(s) {

	// This transport only deals with cross domain requests
	if ( s.crossDomain ) {

		var script,
			head = document.head || jQuery("head")[0] || document.documentElement;

		return {

			send: function( _, callback ) {

				script = document.createElement("script");

				script.async = true;

				if ( s.scriptCharset ) {
					script.charset = s.scriptCharset;
				}

				script.src = s.url;

				// Attach handlers for all browsers
				script.onload = script.onreadystatechange = function( _, isAbort ) {

					if ( isAbort || !script.readyState || /loaded|complete/.test( script.readyState ) ) {

						// Handle memory leak in IE
						script.onload = script.onreadystatechange = null;

						// Remove the script
						if ( script.parentNode ) {
							script.parentNode.removeChild( script );
						}

						// Dereference the script
						script = null;

						// Callback if not abort
						if ( !isAbort ) {
							callback( 200, "success" );
						}
					}
				};

				// Circumvent IE6 bugs with base elements (#2709 and #4378) by prepending
				// Use native DOM manipulation to avoid our domManip AJAX trickery
				head.insertBefore( script, head.firstChild );
			},

			abort: function() {
				if ( script ) {
					script.onload( undefined, true );
				}
			}
		};
	}
});




var oldCallbacks = [],
	rjsonp = /(=)\?(?=&|$)|\?\?/;

// Default jsonp settings
jQuery.ajaxSetup({
	jsonp: "callback",
	jsonpCallback: function() {
		var callback = oldCallbacks.pop() || ( jQuery.expando + "_" + ( nonce++ ) );
		this[ callback ] = true;
		return callback;
	}
});

// Detect, normalize options and install callbacks for jsonp requests
jQuery.ajaxPrefilter( "json jsonp", function( s, originalSettings, jqXHR ) {

	var callbackName, overwritten, responseContainer,
		jsonProp = s.jsonp !== false && ( rjsonp.test( s.url ) ?
			"url" :
			typeof s.data === "string" && !( s.contentType || "" ).indexOf("application/x-www-form-urlencoded") && rjsonp.test( s.data ) && "data"
		);

	// Handle iff the expected data type is "jsonp" or we have a parameter to set
	if ( jsonProp || s.dataTypes[ 0 ] === "jsonp" ) {

		// Get callback name, remembering preexisting value associated with it
		callbackName = s.jsonpCallback = jQuery.isFunction( s.jsonpCallback ) ?
			s.jsonpCallback() :
			s.jsonpCallback;

		// Insert callback into url or form data
		if ( jsonProp ) {
			s[ jsonProp ] = s[ jsonProp ].replace( rjsonp, "$1" + callbackName );
		} else if ( s.jsonp !== false ) {
			s.url += ( rquery.test( s.url ) ? "&" : "?" ) + s.jsonp + "=" + callbackName;
		}

		// Use data converter to retrieve json after script execution
		s.converters["script json"] = function() {
			if ( !responseContainer ) {
				jQuery.error( callbackName + " was not called" );
			}
			return responseContainer[ 0 ];
		};

		// force json dataType
		s.dataTypes[ 0 ] = "json";

		// Install callback
		overwritten = window[ callbackName ];
		window[ callbackName ] = function() {
			responseContainer = arguments;
		};

		// Clean-up function (fires after converters)
		jqXHR.always(function() {
			// Restore preexisting value
			window[ callbackName ] = overwritten;

			// Save back as free
			if ( s[ callbackName ] ) {
				// make sure that re-using the options doesn't screw things around
				s.jsonpCallback = originalSettings.jsonpCallback;

				// save the callback name for future use
				oldCallbacks.push( callbackName );
			}

			// Call if it was a function and we have a response
			if ( responseContainer && jQuery.isFunction( overwritten ) ) {
				overwritten( responseContainer[ 0 ] );
			}

			responseContainer = overwritten = undefined;
		});

		// Delegate to script
		return "script";
	}
});




// data: string of html
// context (optional): If specified, the fragment will be created in this context, defaults to document
// keepScripts (optional): If true, will include scripts passed in the html string
jQuery.parseHTML = function( data, context, keepScripts ) {
	if ( !data || typeof data !== "string" ) {
		return null;
	}
	if ( typeof context === "boolean" ) {
		keepScripts = context;
		context = false;
	}
	context = context || document;

	var parsed = rsingleTag.exec( data ),
		scripts = !keepScripts && [];

	// Single tag
	if ( parsed ) {
		return [ context.createElement( parsed[1] ) ];
	}

	parsed = jQuery.buildFragment( [ data ], context, scripts );

	if ( scripts && scripts.length ) {
		jQuery( scripts ).remove();
	}

	return jQuery.merge( [], parsed.childNodes );
};


// Keep a copy of the old load method
var _load = jQuery.fn.load;

/**
 * Load a url into a page
 */
jQuery.fn.load = function( url, params, callback ) {
	if ( typeof url !== "string" && _load ) {
		return _load.apply( this, arguments );
	}

	var selector, response, type,
		self = this,
		off = url.indexOf(" ");

	if ( off >= 0 ) {
		selector = url.slice( off, url.length );
		url = url.slice( 0, off );
	}

	// If it's a function
	if ( jQuery.isFunction( params ) ) {

		// We assume that it's the callback
		callback = params;
		params = undefined;

	// Otherwise, build a param string
	} else if ( params && typeof params === "object" ) {
		type = "POST";
	}

	// If we have elements to modify, make the request
	if ( self.length > 0 ) {
		jQuery.ajax({
			url: url,

			// if "type" variable is undefined, then "GET" method will be used
			type: type,
			dataType: "html",
			data: params
		}).done(function( responseText ) {

			// Save response for use in complete callback
			response = arguments;

			self.html( selector ?

				// If a selector was specified, locate the right elements in a dummy div
				// Exclude scripts to avoid IE 'Permission Denied' errors
				jQuery("<div>").append( jQuery.parseHTML( responseText ) ).find( selector ) :

				// Otherwise use the full result
				responseText );

		}).complete( callback && function( jqXHR, status ) {
			self.each( callback, response || [ jqXHR.responseText, status, jqXHR ] );
		});
	}

	return this;
};




jQuery.expr.filters.animated = function( elem ) {
	return jQuery.grep(jQuery.timers, function( fn ) {
		return elem === fn.elem;
	}).length;
};





var docElem = window.document.documentElement;

/**
 * Gets a window from an element
 */
function getWindow( elem ) {
	return jQuery.isWindow( elem ) ?
		elem :
		elem.nodeType === 9 ?
			elem.defaultView || elem.parentWindow :
			false;
}

jQuery.offset = {
	setOffset: function( elem, options, i ) {
		var curPosition, curLeft, curCSSTop, curTop, curOffset, curCSSLeft, calculatePosition,
			position = jQuery.css( elem, "position" ),
			curElem = jQuery( elem ),
			props = {};

		// set position first, in-case top/left are set even on static elem
		if ( position === "static" ) {
			elem.style.position = "relative";
		}

		curOffset = curElem.offset();
		curCSSTop = jQuery.css( elem, "top" );
		curCSSLeft = jQuery.css( elem, "left" );
		calculatePosition = ( position === "absolute" || position === "fixed" ) &&
			jQuery.inArray("auto", [ curCSSTop, curCSSLeft ] ) > -1;

		// need to be able to calculate position if either top or left is auto and position is either absolute or fixed
		if ( calculatePosition ) {
			curPosition = curElem.position();
			curTop = curPosition.top;
			curLeft = curPosition.left;
		} else {
			curTop = parseFloat( curCSSTop ) || 0;
			curLeft = parseFloat( curCSSLeft ) || 0;
		}

		if ( jQuery.isFunction( options ) ) {
			options = options.call( elem, i, curOffset );
		}

		if ( options.top != null ) {
			props.top = ( options.top - curOffset.top ) + curTop;
		}
		if ( options.left != null ) {
			props.left = ( options.left - curOffset.left ) + curLeft;
		}

		if ( "using" in options ) {
			options.using.call( elem, props );
		} else {
			curElem.css( props );
		}
	}
};

jQuery.fn.extend({
	offset: function( options ) {
		if ( arguments.length ) {
			return options === undefined ?
				this :
				this.each(function( i ) {
					jQuery.offset.setOffset( this, options, i );
				});
		}

		var docElem, win,
			box = { top: 0, left: 0 },
			elem = this[ 0 ],
			doc = elem && elem.ownerDocument;

		if ( !doc ) {
			return;
		}

		docElem = doc.documentElement;

		// Make sure it's not a disconnected DOM node
		if ( !jQuery.contains( docElem, elem ) ) {
			return box;
		}

		// If we don't have gBCR, just use 0,0 rather than error
		// BlackBerry 5, iOS 3 (original iPhone)
		if ( typeof elem.getBoundingClientRect !== strundefined ) {
			box = elem.getBoundingClientRect();
		}
		win = getWindow( doc );
		return {
			top: box.top  + ( win.pageYOffset || docElem.scrollTop )  - ( docElem.clientTop  || 0 ),
			left: box.left + ( win.pageXOffset || docElem.scrollLeft ) - ( docElem.clientLeft || 0 )
		};
	},

	position: function() {
		if ( !this[ 0 ] ) {
			return;
		}

		var offsetParent, offset,
			parentOffset = { top: 0, left: 0 },
			elem = this[ 0 ];

		// fixed elements are offset from window (parentOffset = {top:0, left: 0}, because it is its only offset parent
		if ( jQuery.css( elem, "position" ) === "fixed" ) {
			// we assume that getBoundingClientRect is available when computed position is fixed
			offset = elem.getBoundingClientRect();
		} else {
			// Get *real* offsetParent
			offsetParent = this.offsetParent();

			// Get correct offsets
			offset = this.offset();
			if ( !jQuery.nodeName( offsetParent[ 0 ], "html" ) ) {
				parentOffset = offsetParent.offset();
			}

			// Add offsetParent borders
			parentOffset.top  += jQuery.css( offsetParent[ 0 ], "borderTopWidth", true );
			parentOffset.left += jQuery.css( offsetParent[ 0 ], "borderLeftWidth", true );
		}

		// Subtract parent offsets and element margins
		// note: when an element has margin: auto the offsetLeft and marginLeft
		// are the same in Safari causing offset.left to incorrectly be 0
		return {
			top:  offset.top  - parentOffset.top - jQuery.css( elem, "marginTop", true ),
			left: offset.left - parentOffset.left - jQuery.css( elem, "marginLeft", true)
		};
	},

	offsetParent: function() {
		return this.map(function() {
			var offsetParent = this.offsetParent || docElem;

			while ( offsetParent && ( !jQuery.nodeName( offsetParent, "html" ) && jQuery.css( offsetParent, "position" ) === "static" ) ) {
				offsetParent = offsetParent.offsetParent;
			}
			return offsetParent || docElem;
		});
	}
});

// Create scrollLeft and scrollTop methods
jQuery.each( { scrollLeft: "pageXOffset", scrollTop: "pageYOffset" }, function( method, prop ) {
	var top = /Y/.test( prop );

	jQuery.fn[ method ] = function( val ) {
		return access( this, function( elem, method, val ) {
			var win = getWindow( elem );

			if ( val === undefined ) {
				return win ? (prop in win) ? win[ prop ] :
					win.document.documentElement[ method ] :
					elem[ method ];
			}

			if ( win ) {
				win.scrollTo(
					!top ? val : jQuery( win ).scrollLeft(),
					top ? val : jQuery( win ).scrollTop()
				);

			} else {
				elem[ method ] = val;
			}
		}, method, val, arguments.length, null );
	};
});

// Add the top/left cssHooks using jQuery.fn.position
// Webkit bug: https://bugs.webkit.org/show_bug.cgi?id=29084
// getComputedStyle returns percent when specified for top/left/bottom/right
// rather than make the css module depend on the offset module, we just check for it here
jQuery.each( [ "top", "left" ], function( i, prop ) {
	jQuery.cssHooks[ prop ] = addGetHookIf( support.pixelPosition,
		function( elem, computed ) {
			if ( computed ) {
				computed = curCSS( elem, prop );
				// if curCSS returns percentage, fallback to offset
				return rnumnonpx.test( computed ) ?
					jQuery( elem ).position()[ prop ] + "px" :
					computed;
			}
		}
	);
});


// Create innerHeight, innerWidth, height, width, outerHeight and outerWidth methods
jQuery.each( { Height: "height", Width: "width" }, function( name, type ) {
	jQuery.each( { padding: "inner" + name, content: type, "": "outer" + name }, function( defaultExtra, funcName ) {
		// margin is only for outerHeight, outerWidth
		jQuery.fn[ funcName ] = function( margin, value ) {
			var chainable = arguments.length && ( defaultExtra || typeof margin !== "boolean" ),
				extra = defaultExtra || ( margin === true || value === true ? "margin" : "border" );

			return access( this, function( elem, type, value ) {
				var doc;

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
					jQuery.css( elem, type, extra ) :

					// Set width or height on the element
					jQuery.style( elem, type, value, extra );
			}, type, chainable ? margin : undefined, chainable, null );
		};
	});
});


// The number of elements contained in the matched element set
jQuery.fn.size = function() {
	return this.length;
};

jQuery.fn.andSelf = jQuery.fn.addBack;




// Register as a named AMD module, since jQuery can be concatenated with other
// files that may use define, but not via a proper concatenation script that
// understands anonymous AMD modules. A named AMD is safest and most robust
// way to register. Lowercase jquery is used because AMD module names are
// derived from file names, and jQuery is normally delivered in a lowercase
// file name. Do this after creating the global so that if an AMD module wants
// to call noConflict to hide this version of jQuery, it will work.
if ( typeof define === "function" && define.amd ) {
	define( "jquery", [], function() {
		return jQuery;
	});
}




var
	// Map over jQuery in case of overwrite
	_jQuery = window.jQuery,

	// Map over the $ in case of overwrite
	_$ = window.$;

jQuery.noConflict = function( deep ) {
	if ( window.$ === jQuery ) {
		window.$ = _$;
	}

	if ( deep && window.jQuery === jQuery ) {
		window.jQuery = _jQuery;
	}

	return jQuery;
};

// Expose jQuery and $ identifiers, even in
// AMD (#7102#comment:10, https://github.com/jquery/jquery/pull/557)
// and CommonJS for browser emulators (#13566)
if ( typeof noGlobal === strundefined ) {
	window.jQuery = window.$ = jQuery;
}




return jQuery;

}));
(function($, undefined) {

/**
 * Unobtrusive scripting adapter for jQuery
 * https://github.com/rails/jquery-ujs
 *
 * Requires jQuery 1.7.0 or later.
 *
 * Released under the MIT license
 *
 */

  // Cut down on the number of issues from people inadvertently including jquery_ujs twice
  // by detecting and raising an error when it happens.
  if ( $.rails !== undefined ) {
    $.error('jquery-ujs has already been loaded!');
  }

  // Shorthand to make it a little easier to call public rails functions from within rails.js
  var rails;
  var $document = $(document);

  $.rails = rails = {
    // Link elements bound by jquery-ujs
    linkClickSelector: 'a[data-confirm], a[data-method], a[data-remote], a[data-disable-with]',

    // Button elements bound by jquery-ujs
    buttonClickSelector: 'button[data-remote]',

    // Select elements bound by jquery-ujs
    inputChangeSelector: 'select[data-remote], input[data-remote], textarea[data-remote]',

    // Form elements bound by jquery-ujs
    formSubmitSelector: 'form',

    // Form input elements bound by jquery-ujs
    formInputClickSelector: 'form input[type=submit], form input[type=image], form button[type=submit], form button:not([type])',

    // Form input elements disabled during form submission
    disableSelector: 'input[data-disable-with], button[data-disable-with], textarea[data-disable-with]',

    // Form input elements re-enabled after form submission
    enableSelector: 'input[data-disable-with]:disabled, button[data-disable-with]:disabled, textarea[data-disable-with]:disabled',

    // Form required input elements
    requiredInputSelector: 'input[name][required]:not([disabled]),textarea[name][required]:not([disabled])',

    // Form file input elements
    fileInputSelector: 'input[type=file]',

    // Link onClick disable selector with possible reenable after remote submission
    linkDisableSelector: 'a[data-disable-with]',

    // Make sure that every Ajax request sends the CSRF token
    CSRFProtection: function(xhr) {
      var token = $('meta[name="csrf-token"]').attr('content');
      if (token) xhr.setRequestHeader('X-CSRF-Token', token);
    },

    // making sure that all forms have actual up-to-date token(cached forms contain old one)
    refreshCSRFTokens: function(){
      var csrfToken = $('meta[name=csrf-token]').attr('content');
      var csrfParam = $('meta[name=csrf-param]').attr('content');
      $('form input[name="' + csrfParam + '"]').val(csrfToken);
    },

    // Triggers an event on an element and returns false if the event result is false
    fire: function(obj, name, data) {
      var event = $.Event(name);
      obj.trigger(event, data);
      return event.result !== false;
    },

    // Default confirm dialog, may be overridden with custom confirm dialog in $.rails.confirm
    confirm: function(message) {
      return confirm(message);
    },

    // Default ajax function, may be overridden with custom function in $.rails.ajax
    ajax: function(options) {
      return $.ajax(options);
    },

    // Default way to get an element's href. May be overridden at $.rails.href.
    href: function(element) {
      return element.attr('href');
    },

    // Submits "remote" forms and links with ajax
    handleRemote: function(element) {
      var method, url, data, elCrossDomain, crossDomain, withCredentials, dataType, options;

      if (rails.fire(element, 'ajax:before')) {
        elCrossDomain = element.data('cross-domain');
        crossDomain = elCrossDomain === undefined ? null : elCrossDomain;
        withCredentials = element.data('with-credentials') || null;
        dataType = element.data('type') || ($.ajaxSettings && $.ajaxSettings.dataType);

        if (element.is('form')) {
          method = element.attr('method');
          url = element.attr('action');
          data = element.serializeArray();
          // memoized value from clicked submit button
          var button = element.data('ujs:submit-button');
          if (button) {
            data.push(button);
            element.data('ujs:submit-button', null);
          }
        } else if (element.is(rails.inputChangeSelector)) {
          method = element.data('method');
          url = element.data('url');
          data = element.serialize();
          if (element.data('params')) data = data + "&" + element.data('params');
        } else if (element.is(rails.buttonClickSelector)) {
          method = element.data('method') || 'get';
          url = element.data('url');
          data = element.serialize();
          if (element.data('params')) data = data + "&" + element.data('params');
        } else {
          method = element.data('method');
          url = rails.href(element);
          data = element.data('params') || null;
        }

        options = {
          type: method || 'GET', data: data, dataType: dataType,
          // stopping the "ajax:beforeSend" event will cancel the ajax request
          beforeSend: function(xhr, settings) {
            if (settings.dataType === undefined) {
              xhr.setRequestHeader('accept', '*/*;q=0.5, ' + settings.accepts.script);
            }
            return rails.fire(element, 'ajax:beforeSend', [xhr, settings]);
          },
          success: function(data, status, xhr) {
            element.trigger('ajax:success', [data, status, xhr]);
          },
          complete: function(xhr, status) {
            element.trigger('ajax:complete', [xhr, status]);
          },
          error: function(xhr, status, error) {
            element.trigger('ajax:error', [xhr, status, error]);
          },
          crossDomain: crossDomain
        };

        // There is no withCredentials for IE6-8 when
        // "Enable native XMLHTTP support" is disabled
        if (withCredentials) {
          options.xhrFields = {
            withCredentials: withCredentials
          };
        }

        // Only pass url to `ajax` options if not blank
        if (url) { options.url = url; }

        var jqxhr = rails.ajax(options);
        element.trigger('ajax:send', jqxhr);
        return jqxhr;
      } else {
        return false;
      }
    },

    // Handles "data-method" on links such as:
    // <a href="/users/5" data-method="delete" rel="nofollow" data-confirm="Are you sure?">Delete</a>
    handleMethod: function(link) {
      var href = rails.href(link),
        method = link.data('method'),
        target = link.attr('target'),
        csrfToken = $('meta[name=csrf-token]').attr('content'),
        csrfParam = $('meta[name=csrf-param]').attr('content'),
        form = $('<form method="post" action="' + href + '"></form>'),
        metadataInput = '<input name="_method" value="' + method + '" type="hidden" />';

      if (csrfParam !== undefined && csrfToken !== undefined) {
        metadataInput += '<input name="' + csrfParam + '" value="' + csrfToken + '" type="hidden" />';
      }

      if (target) { form.attr('target', target); }

      form.hide().append(metadataInput).appendTo('body');
      form.submit();
    },

    /* Disables form elements:
      - Caches element value in 'ujs:enable-with' data store
      - Replaces element text with value of 'data-disable-with' attribute
      - Sets disabled property to true
    */
    disableFormElements: function(form) {
      form.find(rails.disableSelector).each(function() {
        var element = $(this), method = element.is('button') ? 'html' : 'val';
        element.data('ujs:enable-with', element[method]());
        element[method](element.data('disable-with'));
        element.prop('disabled', true);
      });
    },

    /* Re-enables disabled form elements:
      - Replaces element text with cached value from 'ujs:enable-with' data store (created in `disableFormElements`)
      - Sets disabled property to false
    */
    enableFormElements: function(form) {
      form.find(rails.enableSelector).each(function() {
        var element = $(this), method = element.is('button') ? 'html' : 'val';
        if (element.data('ujs:enable-with')) element[method](element.data('ujs:enable-with'));
        element.prop('disabled', false);
      });
    },

   /* For 'data-confirm' attribute:
      - Fires `confirm` event
      - Shows the confirmation dialog
      - Fires the `confirm:complete` event

      Returns `true` if no function stops the chain and user chose yes; `false` otherwise.
      Attaching a handler to the element's `confirm` event that returns a `falsy` value cancels the confirmation dialog.
      Attaching a handler to the element's `confirm:complete` event that returns a `falsy` value makes this function
      return false. The `confirm:complete` event is fired whether or not the user answered true or false to the dialog.
   */
    allowAction: function(element) {
      var message = element.data('confirm'),
          answer = false, callback;
      if (!message) { return true; }

      if (rails.fire(element, 'confirm')) {
        answer = rails.confirm(message);
        callback = rails.fire(element, 'confirm:complete', [answer]);
      }
      return answer && callback;
    },

    // Helper function which checks for blank inputs in a form that match the specified CSS selector
    blankInputs: function(form, specifiedSelector, nonBlank) {
      var inputs = $(), input, valueToCheck,
          selector = specifiedSelector || 'input,textarea',
          allInputs = form.find(selector);

      allInputs.each(function() {
        input = $(this);
        valueToCheck = input.is('input[type=checkbox],input[type=radio]') ? input.is(':checked') : input.val();
        // If nonBlank and valueToCheck are both truthy, or nonBlank and valueToCheck are both falsey
        if (!valueToCheck === !nonBlank) {

          // Don't count unchecked required radio if other radio with same name is checked
          if (input.is('input[type=radio]') && allInputs.filter('input[type=radio]:checked[name="' + input.attr('name') + '"]').length) {
            return true; // Skip to next input
          }

          inputs = inputs.add(input);
        }
      });
      return inputs.length ? inputs : false;
    },

    // Helper function which checks for non-blank inputs in a form that match the specified CSS selector
    nonBlankInputs: function(form, specifiedSelector) {
      return rails.blankInputs(form, specifiedSelector, true); // true specifies nonBlank
    },

    // Helper function, needed to provide consistent behavior in IE
    stopEverything: function(e) {
      $(e.target).trigger('ujs:everythingStopped');
      e.stopImmediatePropagation();
      return false;
    },

    //  replace element's html with the 'data-disable-with' after storing original html
    //  and prevent clicking on it
    disableElement: function(element) {
      element.data('ujs:enable-with', element.html()); // store enabled state
      element.html(element.data('disable-with')); // set to disabled state
      element.bind('click.railsDisable', function(e) { // prevent further clicking
        return rails.stopEverything(e);
      });
    },

    // restore element to its original state which was disabled by 'disableElement' above
    enableElement: function(element) {
      if (element.data('ujs:enable-with') !== undefined) {
        element.html(element.data('ujs:enable-with')); // set to old enabled state
        element.removeData('ujs:enable-with'); // clean up cache
      }
      element.unbind('click.railsDisable'); // enable element
    }

  };

  if (rails.fire($document, 'rails:attachBindings')) {

    $.ajaxPrefilter(function(options, originalOptions, xhr){ if ( !options.crossDomain ) { rails.CSRFProtection(xhr); }});

    $document.delegate(rails.linkDisableSelector, 'ajax:complete', function() {
        rails.enableElement($(this));
    });

    $document.delegate(rails.linkClickSelector, 'click.rails', function(e) {
      var link = $(this), method = link.data('method'), data = link.data('params'), metaClick = e.metaKey || e.ctrlKey;
      if (!rails.allowAction(link)) return rails.stopEverything(e);

      if (!metaClick && link.is(rails.linkDisableSelector)) rails.disableElement(link);

      if (link.data('remote') !== undefined) {
        if (metaClick && (!method || method === 'GET') && !data) { return true; }

        var handleRemote = rails.handleRemote(link);
        // response from rails.handleRemote() will either be false or a deferred object promise.
        if (handleRemote === false) {
          rails.enableElement(link);
        } else {
          handleRemote.error( function() { rails.enableElement(link); } );
        }
        return false;

      } else if (link.data('method')) {
        rails.handleMethod(link);
        return false;
      }
    });

    $document.delegate(rails.buttonClickSelector, 'click.rails', function(e) {
      var button = $(this);
      if (!rails.allowAction(button)) return rails.stopEverything(e);

      rails.handleRemote(button);
      return false;
    });

    $document.delegate(rails.inputChangeSelector, 'change.rails', function(e) {
      var link = $(this);
      if (!rails.allowAction(link)) return rails.stopEverything(e);

      rails.handleRemote(link);
      return false;
    });

    $document.delegate(rails.formSubmitSelector, 'submit.rails', function(e) {
      var form = $(this),
        remote = form.data('remote') !== undefined,
        blankRequiredInputs = rails.blankInputs(form, rails.requiredInputSelector),
        nonBlankFileInputs = rails.nonBlankInputs(form, rails.fileInputSelector);

      if (!rails.allowAction(form)) return rails.stopEverything(e);

      // skip other logic when required values are missing or file upload is present
      if (blankRequiredInputs && form.attr("novalidate") == undefined && rails.fire(form, 'ajax:aborted:required', [blankRequiredInputs])) {
        return rails.stopEverything(e);
      }

      if (remote) {
        if (nonBlankFileInputs) {
          // slight timeout so that the submit button gets properly serialized
          // (make it easy for event handler to serialize form without disabled values)
          setTimeout(function(){ rails.disableFormElements(form); }, 13);
          var aborted = rails.fire(form, 'ajax:aborted:file', [nonBlankFileInputs]);

          // re-enable form elements if event bindings return false (canceling normal form submission)
          if (!aborted) { setTimeout(function(){ rails.enableFormElements(form); }, 13); }

          return aborted;
        }

        rails.handleRemote(form);
        return false;

      } else {
        // slight timeout so that the submit button gets properly serialized
        setTimeout(function(){ rails.disableFormElements(form); }, 13);
      }
    });

    $document.delegate(rails.formInputClickSelector, 'click.rails', function(event) {
      var button = $(this);

      if (!rails.allowAction(button)) return rails.stopEverything(event);

      // register the pressed submit button
      var name = button.attr('name'),
        data = name ? {name:name, value:button.val()} : null;

      button.closest('form').data('ujs:submit-button', data);
    });

    $document.delegate(rails.formSubmitSelector, 'ajax:beforeSend.rails', function(event) {
      if (this == event.target) rails.disableFormElements($(this));
    });

    $document.delegate(rails.formSubmitSelector, 'ajax:complete.rails', function(event) {
      if (this == event.target) rails.enableFormElements($(this));
    });

    $(function(){
      rails.refreshCSRFTokens();
    });
  }

})( jQuery );
/*
 * Foundation Responsive Library
 * http://foundation.zurb.com
 * Copyright 2014, ZURB
 * Free to use under the MIT license.
 * http://www.opensource.org/licenses/mit-license.php
*/


(function ($, window, document, undefined) {
  'use strict';

  var header_helpers = function (class_array) {
    var i = class_array.length;
    var head = $('head');

    while (i--) {
      if($('head').has('.' + class_array[i]).length === 0) {
        $('head').append('<meta class="' + class_array[i] + '" />');
      }
    }
  };

  header_helpers([
    'foundation-mq-small',
    'foundation-mq-medium',
    'foundation-mq-large',
    'foundation-mq-xlarge',
    'foundation-mq-xxlarge',
    'foundation-data-attribute-namespace']);

  // Enable FastClick if present

  $(function() {
    if (typeof FastClick !== 'undefined') {
      // Don't attach to body if undefined
      if (typeof document.body !== 'undefined') {
        FastClick.attach(document.body);
      }
    }
  });

  // private Fast Selector wrapper,
  // returns jQuery object. Only use where
  // getElementById is not available.
  var S = function (selector, context) {
    if (typeof selector === 'string') {
      if (context) {
        var cont;
        if (context.jquery) {
          cont = context[0];
          if (!cont) return context;
        } else {
          cont = context;
        }
        return $(cont.querySelectorAll(selector));
      }

      return $(document.querySelectorAll(selector));
    }

    return $(selector, context);
  };

  // Namespace functions.

  var attr_name = function (init) {
    var arr = [];
    if (!init) arr.push('data');
    if (this.namespace.length > 0) arr.push(this.namespace);
    arr.push(this.name);

    return arr.join('-');
  };

  var add_namespace = function (str) {
    var parts = str.split('-'),
        i = parts.length,
        arr = [];

    while (i--) {
      if (i !== 0) {
        arr.push(parts[i]);
      } else {
        if (this.namespace.length > 0) {
          arr.push(this.namespace, parts[i]);
        } else {
          arr.push(parts[i]);
        }
      }
    }

    return arr.reverse().join('-');
  };

  // Event binding and data-options updating.

  var bindings = function (method, options) {
    var self = this,
        should_bind_events = !S(this).data(this.attr_name(true));

    if (typeof method === 'string') {
      return this[method].call(this, options);
    }

    if (S(this.scope).is('[' + this.attr_name() +']')) {
      S(this.scope).data(this.attr_name(true) + '-init', $.extend({}, this.settings, (options || method), this.data_options(S(this.scope))));

      if (should_bind_events) {
        this.events(this.scope);
      }

    } else {
      S('[' + this.attr_name() +']', this.scope).each(function () {
        var should_bind_events = !S(this).data(self.attr_name(true) + '-init');
        S(this).data(self.attr_name(true) + '-init', $.extend({}, self.settings, (options || method), self.data_options(S(this))));

        if (should_bind_events) {
          self.events(this);
        }
      });
    }
  };

  var single_image_loaded = function (image, callback) {
    function loaded () {
      callback(image[0]);
    }

    function bindLoad () {
      this.one('load', loaded);

      if (/MSIE (\d+\.\d+);/.test(navigator.userAgent)) {
        var src = this.attr( 'src' ),
            param = src.match( /\?/ ) ? '&' : '?';

        param += 'random=' + (new Date()).getTime();
        this.attr('src', src + param);
      }
    }

    if (!image.attr('src')) {
      loaded();
      return;
    }

    if (image[0].complete || image[0].readyState === 4) {
      loaded();
    } else {
      bindLoad.call(image);
    }
  };
  
  /*
    https://github.com/paulirish/matchMedia.js
  */

  window.matchMedia = window.matchMedia || (function( doc, undefined ) {

    "use strict";

    var bool,
        docElem = doc.documentElement,
        refNode = docElem.firstElementChild || docElem.firstChild,
        // fakeBody required for <FF4 when executed in <head>
        fakeBody = doc.createElement( "body" ),
        div = doc.createElement( "div" );

    div.id = "mq-test-1";
    div.style.cssText = "position:absolute;top:-100em";
    fakeBody.style.background = "none";
    fakeBody.appendChild(div);

    return function (q) {

      div.innerHTML = "&shy;<style media=\"" + q + "\"> #mq-test-1 { width: 42px; }</style>";

      docElem.insertBefore( fakeBody, refNode );
      bool = div.offsetWidth === 42;
      docElem.removeChild( fakeBody );

      return {
        matches: bool,
        media: q
      };

    };

  }( document ));

  /*
   * jquery.requestAnimationFrame
   * https://github.com/gnarf37/jquery-requestAnimationFrame
   * Requires jQuery 1.8+
   *
   * Copyright (c) 2012 Corey Frang
   * Licensed under the MIT license.
   */

  (function($) {

  // requestAnimationFrame polyfill adapted from Erik Möller
  // fixes from Paul Irish and Tino Zijdel
  // http://paulirish.com/2011/requestanimationframe-for-smart-animating/
  // http://my.opera.com/emoller/blog/2011/12/20/requestanimationframe-for-smart-er-animating

  var animating,
      lastTime = 0,
      vendors = ['webkit', 'moz'],
      requestAnimationFrame = window.requestAnimationFrame,
      cancelAnimationFrame = window.cancelAnimationFrame,
      jqueryFxAvailable = 'undefined' !== typeof jQuery.fx;

  for (; lastTime < vendors.length && !requestAnimationFrame; lastTime++) {
    requestAnimationFrame = window[ vendors[lastTime] + "RequestAnimationFrame" ];
    cancelAnimationFrame = cancelAnimationFrame ||
      window[ vendors[lastTime] + "CancelAnimationFrame" ] || 
      window[ vendors[lastTime] + "CancelRequestAnimationFrame" ];
  }

  function raf() {
    if (animating) {
      requestAnimationFrame(raf);
      
      if (jqueryFxAvailable) {
        jQuery.fx.tick();
      }
    }
  }

  if (requestAnimationFrame) {
    // use rAF
    window.requestAnimationFrame = requestAnimationFrame;
    window.cancelAnimationFrame = cancelAnimationFrame;
    
    if (jqueryFxAvailable) {
      jQuery.fx.timer = function (timer) {
        if (timer() && jQuery.timers.push(timer) && !animating) {
          animating = true;
          raf();
        }
      };

      jQuery.fx.stop = function () {
        animating = false;
      };
    }
  } else {
    // polyfill
    window.requestAnimationFrame = function (callback, element) {
      var currTime = new Date().getTime(),
        timeToCall = Math.max(0, 16 - (currTime - lastTime)),
        id = window.setTimeout(function () {
          callback(currTime + timeToCall);
        }, timeToCall);
      lastTime = currTime + timeToCall;
      return id;
    };

    window.cancelAnimationFrame = function (id) {
      clearTimeout(id);
    };

  }

  }( jQuery ));


  function removeQuotes (string) {
    if (typeof string === 'string' || string instanceof String) {
      string = string.replace(/^['\\/"]+|(;\s?})+|['\\/"]+$/g, '');
    }

    return string;
  }

  window.Foundation = {
    name : 'Foundation',

    version : '5.2.1',

    media_queries : {
      small : S('.foundation-mq-small').css('font-family').replace(/^[\/\\'"]+|(;\s?})+|[\/\\'"]+$/g, ''),
      medium : S('.foundation-mq-medium').css('font-family').replace(/^[\/\\'"]+|(;\s?})+|[\/\\'"]+$/g, ''),
      large : S('.foundation-mq-large').css('font-family').replace(/^[\/\\'"]+|(;\s?})+|[\/\\'"]+$/g, ''),
      xlarge: S('.foundation-mq-xlarge').css('font-family').replace(/^[\/\\'"]+|(;\s?})+|[\/\\'"]+$/g, ''),
      xxlarge: S('.foundation-mq-xxlarge').css('font-family').replace(/^[\/\\'"]+|(;\s?})+|[\/\\'"]+$/g, '')
    },

    stylesheet : $('<style></style>').appendTo('head')[0].sheet,

    global: {
      namespace: ''
    },

    init : function (scope, libraries, method, options, response) {
      var library_arr,
          args = [scope, method, options, response],
          responses = [];

      // check RTL
      this.rtl = /rtl/i.test(S('html').attr('dir'));

      // set foundation global scope
      this.scope = scope || this.scope;

      this.set_namespace();

      if (libraries && typeof libraries === 'string' && !/reflow/i.test(libraries)) {
        if (this.libs.hasOwnProperty(libraries)) {
          responses.push(this.init_lib(libraries, args));
        }
      } else {
        for (var lib in this.libs) {
          responses.push(this.init_lib(lib, libraries));
        }
      }

      return scope;
    },

    init_lib : function (lib, args) {
      if (this.libs.hasOwnProperty(lib)) {
        this.patch(this.libs[lib]);

        if (args && args.hasOwnProperty(lib)) {
            if (typeof this.libs[lib].settings !== 'undefined') {
                $.extend(true, this.libs[lib].settings, args[lib]);
            }
            else if (typeof this.libs[lib].defaults !== 'undefined') {
                $.extend(true, this.libs[lib].defaults, args[lib]);
            }
          return this.libs[lib].init.apply(this.libs[lib], [this.scope, args[lib]]);
        }

        args = args instanceof Array ? args : Array(args);    // PATCH: added this line
        return this.libs[lib].init.apply(this.libs[lib], args);
      }

      return function () {};
    },

    patch : function (lib) {
      lib.scope = this.scope;
      lib.namespace = this.global.namespace;
      lib.rtl = this.rtl;
      lib['data_options'] = this.utils.data_options;
      lib['attr_name'] = attr_name;
      lib['add_namespace'] = add_namespace;
      lib['bindings'] = bindings;
      lib['S'] = this.utils.S;
    },

    inherit : function (scope, methods) {
      var methods_arr = methods.split(' '),
          i = methods_arr.length;

      while (i--) {
        if (this.utils.hasOwnProperty(methods_arr[i])) {
          scope[methods_arr[i]] = this.utils[methods_arr[i]];
        }
      }
    },

    set_namespace: function () {

      // Don't bother reading the namespace out of the meta tag
      // if the namespace has been set globally in javascript
      //
      // Example: something like Foundation.global.namespace = 'my-namespace';
      //
      // Otherwise, if the namespace hasn't been set globally,
      // read it out of the meta tag
      //
      var namespace = this.global.namespace || $('.foundation-data-attribute-namespace').css('font-family');

      if (/false/i.test(namespace)) return;
      
      this.global.namespace = namespace;
    },

    libs : {},

    // methods that can be inherited in libraries
    utils : {

      // Description:
      //    Fast Selector wrapper returns jQuery object. Only use where getElementById 
      //    is not available.
      //
      // Arguments:
      //    Selector (String): CSS selector describing the element(s) to be 
      //    returned as a jQuery object.
      //
      //    Scope (String): CSS selector describing the area to be searched. Default 
      //    is document.
      //
      // Returns:
      //    Element (jQuery Object): jQuery object containing elements matching the 
      //    selector within the scope.
      S : S,

      // Description:
      //    Executes a function a max of once every n milliseconds 
      //
      // Arguments:
      //    Func (Function): Function to be throttled.
      //
      //    Delay (Integer): Function execution threshold in milliseconds.
      //
      // Returns:
      //    Lazy_function (Function): Function with throttling applied.
      throttle : function (func, delay) {
        var timer = null;

        return function () {
          var context = this, args = arguments;

          clearTimeout(timer);
          timer = setTimeout(function () {
            func.apply(context, args);
          }, delay);
        };
      },

      // Description:
      //    Executes a function when it stops being invoked for n seconds
      //    Modified version of _.debounce() http://underscorejs.org
      //
      // Arguments:
      //    Func (Function): Function to be debounced.
      //
      //    Delay (Integer): Function execution threshold in milliseconds.
      // 
      //    Immediate (Bool): Whether the function should be called at the beginning 
      //    of the delay instead of the end. Default is false.
      //
      // Returns:
      //    Lazy_function (Function): Function with debouncing applied.
      debounce : function (func, delay, immediate) {
        var timeout, result;
        return function () {
          var context = this, args = arguments;
          var later = function () {
            timeout = null;
            if (!immediate) result = func.apply(context, args);
          };
          var callNow = immediate && !timeout;
          clearTimeout(timeout);
          timeout = setTimeout(later, delay);
          if (callNow) result = func.apply(context, args);
          return result;
        };
      },

      // Description:
      //    Parses data-options attribute
      //
      // Arguments:
      //    El (jQuery Object): Element to be parsed.
      //
      // Returns:
      //    Options (Javascript Object): Contents of the element's data-options 
      //    attribute.
      data_options : function (el) {
        var opts = {}, ii, p, opts_arr,
            data_options = function (el) {
              var namespace = Foundation.global.namespace;

              if (namespace.length > 0) {
                return el.data(namespace + '-options');
              }

              return el.data('options');
            };

        var cached_options = data_options(el);

        if (typeof cached_options === 'object') {
          return cached_options;
        }

        opts_arr = (cached_options || ':').split(';'),
        ii = opts_arr.length;

        function isNumber (o) {
          return ! isNaN (o-0) && o !== null && o !== "" && o !== false && o !== true;
        }

        function trim (str) {
          if (typeof str === 'string') return $.trim(str);
          return str;
        }

        while (ii--) {
          p = opts_arr[ii].split(':');

          if (/true/i.test(p[1])) p[1] = true;
          if (/false/i.test(p[1])) p[1] = false;
          if (isNumber(p[1])) {
            if (p[1].indexOf('.') === -1) {
              p[1] = parseInt(p[1], 10);
            } else {
              p[1] = parseFloat(p[1], 10);
            }
          }

          if (p.length === 2 && p[0].length > 0) {
            opts[trim(p[0])] = trim(p[1]);
          }
        }

        return opts;
      },

      // Description:
      //    Adds JS-recognizable media queries
      //
      // Arguments:
      //    Media (String): Key string for the media query to be stored as in 
      //    Foundation.media_queries
      //
      //    Class (String): Class name for the generated <meta> tag
      register_media : function (media, media_class) {
        if(Foundation.media_queries[media] === undefined) {
          $('head').append('<meta class="' + media_class + '">');
          Foundation.media_queries[media] = removeQuotes($('.' + media_class).css('font-family'));
        }
      },

      // Description:
      //    Add custom CSS within a JS-defined media query
      //
      // Arguments:
      //    Rule (String): CSS rule to be appended to the document.
      //
      //    Media (String): Optional media query string for the CSS rule to be 
      //    nested under.
      add_custom_rule : function (rule, media) {
        if (media === undefined) {
          Foundation.stylesheet.insertRule(rule, Foundation.stylesheet.cssRules.length);
        } else {
          var query = Foundation.media_queries[media];

          if (query !== undefined) {
            Foundation.stylesheet.insertRule('@media ' + 
              Foundation.media_queries[media] + '{ ' + rule + ' }');
          }
        }
      },

      // Description:
      //    Performs a callback function when an image is fully loaded
      //
      // Arguments:
      //    Image (jQuery Object): Image(s) to check if loaded.
      //
      //    Callback (Function): Fundation to execute when image is fully loaded.
      image_loaded : function (images, callback) {
        var self = this,
            unloaded = images.length;

        if (unloaded === 0) {
          callback(images);
        }

        images.each(function () {
          single_image_loaded(self.S(this), function () {
            unloaded -= 1;
            if (unloaded === 0) {
              callback(images);
            }
          });
        });
      },

      // Description:
      //    Returns a random, alphanumeric string
      //
      // Arguments:
      //    Length (Integer): Length of string to be generated. Defaults to random 
      //    integer.
      //
      // Returns:
      //    Rand (String): Pseudo-random, alphanumeric string.
      random_str : function () {
        if (!this.fidx) this.fidx = 0;
        this.prefix = this.prefix || [(this.name || 'F'), (+new Date).toString(36)].join('-');

        return this.prefix + (this.fidx++).toString(36);
      }
    }
  };

  $.fn.foundation = function () {
    var args = Array.prototype.slice.call(arguments, 0);

    return this.each(function () {
      Foundation.init.apply(Foundation, [this].concat(args));
      return this;
    });
  };

}(jQuery, this, this.document));
;(function ($, window, document, undefined) {
  'use strict';

  Foundation.libs.abide = {
    name : 'abide',

    version : '5.2.1',

    settings : {
      live_validate : true,
      focus_on_invalid : true,
      error_labels: true, // labels with a for="inputId" will recieve an `error` class
      timeout : 1000,
      patterns : {
        alpha: /^[a-zA-Z]+$/,
        alpha_numeric : /^[a-zA-Z0-9]+$/,
        integer: /^\d+$/,
        number: /-?(?:\d+|\d{1,3}(?:,\d{3})+)?(?:\.\d+)?/,

        // amex, visa, diners
        card : /^(?:4[0-9]{12}(?:[0-9]{3})?|5[1-5][0-9]{14}|6(?:011|5[0-9][0-9])[0-9]{12}|3[47][0-9]{13}|3(?:0[0-5]|[68][0-9])[0-9]{11}|(?:2131|1800|35\d{3})\d{11})$/,
        cvv : /^([0-9]){3,4}$/,

        // http://www.whatwg.org/specs/web-apps/current-work/multipage/states-of-the-type-attribute.html#valid-e-mail-address
        email : /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/,

        url: /(https?|ftp|file|ssh):\/\/(((([a-zA-Z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-zA-Z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-zA-Z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-zA-Z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-zA-Z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-zA-Z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-zA-Z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-zA-Z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-zA-Z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-zA-Z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-zA-Z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-zA-Z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(\#((([a-zA-Z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?/,
        // abc.de
        domain: /^([a-zA-Z0-9]([a-zA-Z0-9\-]{0,61}[a-zA-Z0-9])?\.)+[a-zA-Z]{2,6}$/,

        datetime: /([0-2][0-9]{3})\-([0-1][0-9])\-([0-3][0-9])T([0-5][0-9])\:([0-5][0-9])\:([0-5][0-9])(Z|([\-\+]([0-1][0-9])\:00))/,
        // YYYY-MM-DD
        date: /(?:19|20)[0-9]{2}-(?:(?:0[1-9]|1[0-2])-(?:0[1-9]|1[0-9]|2[0-9])|(?:(?!02)(?:0[1-9]|1[0-2])-(?:30))|(?:(?:0[13578]|1[02])-31))/,
        // HH:MM:SS
        time : /(0[0-9]|1[0-9]|2[0-3])(:[0-5][0-9]){2}/,
        dateISO: /\d{4}[\/\-]\d{1,2}[\/\-]\d{1,2}/,
        // MM/DD/YYYY
        month_day_year : /(0[1-9]|1[012])[- \/.](0[1-9]|[12][0-9]|3[01])[- \/.](19|20)\d\d/,

        // #FFF or #FFFFFF
        color: /^#?([a-fA-F0-9]{6}|[a-fA-F0-9]{3})$/
      },
      validators : {
        equalTo: function(el, required, parent) {
          var from  = document.getElementById(el.getAttribute(this.add_namespace('data-equalto'))).value,
              to    = el.value,
              valid = (from === to);

          return valid;
        }
      }
    },

    timer : null,

    init : function (scope, method, options) {
      this.bindings(method, options);
    },

    events : function (scope) {
      var self = this,
          form = self.S(scope).attr('novalidate', 'novalidate'),
          settings = form.data(this.attr_name(true) + '-init');

      this.invalid_attr = this.add_namespace('data-invalid');

      form
        .off('.abide')
        .on('submit.fndtn.abide validate.fndtn.abide', function (e) {
          var is_ajax = /ajax/i.test(self.S(this).attr(self.attr_name()));
          return self.validate(self.S(this).find('input, textarea, select').get(), e, is_ajax);
        })
        .on('reset', function() {
          return self.reset($(this));
        })
        .find('input, textarea, select')
          .off('.abide')
          .on('blur.fndtn.abide change.fndtn.abide', function (e) {
            self.validate([this], e);
          })
          .on('keydown.fndtn.abide', function (e) {
            var settings = $(this).closest('form').data(self.attr_name(true) + '-init');
            if (settings.live_validate === true) {
              clearTimeout(self.timer);
              self.timer = setTimeout(function () {
                self.validate([this], e);
              }.bind(this), settings.timeout);
            }
          });
    },

    reset : function (form) {
      form.removeAttr(this.invalid_attr);
      $(this.invalid_attr, form).removeAttr(this.invalid_attr);
      $('.error', form).not('small').removeClass('error');
    },

    validate : function (els, e, is_ajax) {
      var validations = this.parse_patterns(els),
          validation_count = validations.length,
          form = this.S(els[0]).closest('form'),
          submit_event = /submit/.test(e.type);

      // Has to count up to make sure the focus gets applied to the top error
      for (var i=0; i < validation_count; i++) {
        if (!validations[i] && (submit_event || is_ajax)) {
          if (this.settings.focus_on_invalid) els[i].focus();
          form.trigger('invalid');
          this.S(els[i]).closest('form').attr(this.invalid_attr, '');
          return false;
        }
      }

      if (submit_event || is_ajax) {
        form.trigger('valid');
      }

      form.removeAttr(this.invalid_attr);

      if (is_ajax) return false;

      return true;
    },

    parse_patterns : function (els) {
      var i = els.length,
          el_patterns = [];

      while (i--) {
        el_patterns.push(this.pattern(els[i]));
      }

      return this.check_validation_and_apply_styles(el_patterns);
    },

    pattern : function (el) {
      var type = el.getAttribute('type'),
          required = typeof el.getAttribute('required') === 'string';

      var pattern = el.getAttribute('pattern') || '';

      if (this.settings.patterns.hasOwnProperty(pattern) && pattern.length > 0) {
        return [el, this.settings.patterns[pattern], required];
      } else if (pattern.length > 0) {
        return [el, new RegExp(pattern), required];
      }

      if (this.settings.patterns.hasOwnProperty(type)) {
        return [el, this.settings.patterns[type], required];
      }

      pattern = /.*/;

      return [el, pattern, required];
    },

    check_validation_and_apply_styles : function (el_patterns) {
      var i = el_patterns.length,
          validations = [];

      while (i--) {
        var el = el_patterns[i][0],
            required = el_patterns[i][2],
            value = el.value,
            direct_parent = this.S(el).parent(),
            validator = el.getAttribute(this.add_namespace('data-abide-validator')),
            is_radio = el.type === "radio",
            is_checkbox = el.type === "checkbox",
            label = this.S('label[for="' + el.getAttribute('id') + '"]'),
            valid_length = (required) ? (el.value.length > 0) : true;

        var parent, valid;

        // support old way to do equalTo validations
        if(el.getAttribute(this.add_namespace('data-equalto'))) { validator = "equalTo" }

        if (!direct_parent.is('label')) {
          parent = direct_parent;
        } else {
          parent = direct_parent.parent();
        }

        if (is_radio && required) {
          validations.push(this.valid_radio(el, required));
        } else if (is_checkbox && required) {
          validations.push(this.valid_checkbox(el, required));
        } else if (validator) {
          valid = this.settings.validators[validator].apply(this, [el, required, parent])
          validations.push(valid);

          if (valid) {
            this.S(el).removeAttr(this.invalid_attr);
            parent.removeClass('error');
          } else {
            this.S(el).attr(this.invalid_attr, '');
            parent.addClass('error');
          }
        } else {

          if (el_patterns[i][1].test(value) && valid_length ||
            !required && el.value.length < 1 || $(el).attr('disabled')) {
            this.S(el).removeAttr(this.invalid_attr);
            parent.removeClass('error');
            if (label.length > 0 && this.settings.error_labels) label.removeClass('error');

            validations.push(true);
            $(el).triggerHandler('valid');
          } else {
            this.S(el).attr(this.invalid_attr, '');
            parent.addClass('error');
            if (label.length > 0 && this.settings.error_labels) label.addClass('error');

            validations.push(false);
            $(el).triggerHandler('invalid');
          }
        }
      }

      return validations;
    },

    valid_checkbox : function(el, required) {
      var el = this.S(el),
          valid = (el.is(':checked') || !required);

      if (valid) {
        el.removeAttr(this.invalid_attr).parent().removeClass('error');
      } else {
        el.attr(this.invalid_attr, '').parent().addClass('error');
      }

      return valid;
    },

    valid_radio : function (el, required) {
      var name = el.getAttribute('name'),
          group = document.getElementsByName(name),
          count = group.length,
          valid = false;

      // Has to count up to make sure the focus gets applied to the top error
      for (var i=0; i < count; i++) {
        if (group[i].checked) valid = true;
      }

      // Has to count up to make sure the focus gets applied to the top error
      for (var i=0; i < count; i++) {
        if (valid) {
          this.S(group[i]).removeAttr(this.invalid_attr).parent().removeClass('error');
        } else {
          this.S(group[i]).attr(this.invalid_attr, '').parent().addClass('error');
        }
      }

      return valid;
    }
  };
}(jQuery, this, this.document));
;(function ($, window, document, undefined) {
  'use strict';

  Foundation.libs.accordion = {
    name : 'accordion',

    version : '5.2.1',

    settings : {
      active_class: 'active',
      toggleable: true
    },

    init : function (scope, method, options) {
      this.bindings(method, options);
    },

    events : function () {
      var self = this;
      var S = this.S;
      S(this.scope)
      .off('.fndtn.accordion')
      .on('click.fndtn.accordion', '[' + this.attr_name() + '] dd > a', function (e) {
        var accordion = S(this).closest('[' + self.attr_name() + ']'),
            target = S('#' + this.href.split('#')[1]),
            siblings = S('dd > .content', accordion),
            aunts = $('> dd', accordion),
            settings = accordion.data(self.attr_name(true) + '-init'),
            active_content = S('dd > .content.' + settings.active_class, accordion),
            active_parent = S('dd.' + settings.active_class, accordion);
        e.preventDefault();

        if (! S(this).closest('dl').is(accordion)) { return; }

        if (active_content[0] == target[0] && settings.toggleable) {
          active_parent.toggleClass(settings.active_class, false);
          return target.toggleClass(settings.active_class, false);
        }

        siblings.removeClass(settings.active_class);
        aunts.removeClass(settings.active_class);
        target.addClass(settings.active_class).parent().addClass(settings.active_class);
      });
    },

    off : function () {},

    reflow : function () {}
  };
}(jQuery, this, this.document));
;(function ($, window, document, undefined) {
  'use strict';

  Foundation.libs.alert = {
    name : 'alert',

    version : '5.2.1',

    settings : {
      animation: 'fadeOut',
      speed: 300, // fade out speed
      callback: function (){}
    },

    init : function (scope, method, options) {
      this.bindings(method, options);
    },

    events : function () {
      var self = this,
          S = this.S;

      $(this.scope).off('.alert').on('click.fndtn.alert', '[' + this.attr_name() + '] a.close', function (e) {
          var alertBox = S(this).closest('[' + self.attr_name() + ']'),
              settings = alertBox.data(self.attr_name(true) + '-init') || self.settings;

        e.preventDefault();
        alertBox[settings.animation](settings.speed, function () {
          S(this).trigger('close').remove();
          settings.callback();
        });
      });
    },

    reflow : function () {}
  };
}(jQuery, this, this.document));
;(function ($, window, document, undefined) {
  'use strict';

  Foundation.libs.clearing = {
    name : 'clearing',

    version: '5.2.1',

    settings : {
      templates : {
        viewing : '<a href="#" class="clearing-close">&times;</a>' +
          '<div class="visible-img" style="display: none"><div class="clearing-touch-label"></div><img src="data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs%3D" alt="" />' +
          '<p class="clearing-caption"></p><a href="#" class="clearing-main-prev"><span></span></a>' +
          '<a href="#" class="clearing-main-next"><span></span></a></div>'
      },

      // comma delimited list of selectors that, on click, will close clearing,
      // add 'div.clearing-blackout, div.visible-img' to close on background click
      close_selectors : '.clearing-close',

      touch_label : '&larr;&nbsp;Swipe to Advance&nbsp;&rarr;',

      // event initializers and locks
      init : false,
      locked : false
    },

    init : function (scope, method, options) {
      var self = this;
      Foundation.inherit(this, 'throttle image_loaded');

      this.bindings(method, options);

      if (self.S(this.scope).is('[' + this.attr_name() + ']')) {
        this.assemble(self.S('li', this.scope));
      } else {
        self.S('[' + this.attr_name() + ']', this.scope).each(function () {
          self.assemble(self.S('li', this));
        });
      }
    },

    events : function (scope) {
      var self = this,
      S = self.S;

      if ($('.scroll-container').length > 0) {
        this.scope = $('.scroll-container');
      }

      S(this.scope)
        .off('.clearing')
        .on('click.fndtn.clearing', 'ul[' + this.attr_name() + '] li',
          function (e, current, target) {
            var current = current || S(this),
                target = target || current,
                next = current.next('li'),
                settings = current.closest('[' + self.attr_name() + ']').data(self.attr_name(true) + '-init'),
                image = S(e.target);

            e.preventDefault();

            if (!settings) {
              self.init();
              settings = current.closest('[' + self.attr_name() + ']').data(self.attr_name(true) + '-init');
            }

            // if clearing is open and the current image is
            // clicked, go to the next image in sequence
            if (target.hasClass('visible') &&
              current[0] === target[0] &&
              next.length > 0 && self.is_open(current)) {
              target = next;
              image = S('img', target);
            }

            // set current and target to the clicked li if not otherwise defined.
            self.open(image, current, target);
            self.update_paddles(target);
          })

        .on('click.fndtn.clearing', '.clearing-main-next',
          function (e) { self.nav(e, 'next') })
        .on('click.fndtn.clearing', '.clearing-main-prev',
          function (e) { self.nav(e, 'prev') })
        .on('click.fndtn.clearing', this.settings.close_selectors,
          function (e) { Foundation.libs.clearing.close(e, this) });

      $(document).on('keydown.fndtn.clearing',
          function (e) { self.keydown(e) });

      S(window).off('.clearing').on('resize.fndtn.clearing',
        function () { self.resize() });

      this.swipe_events(scope);
    },

    swipe_events : function (scope) {
      var self = this,
      S = self.S;

      S(this.scope)
        .on('touchstart.fndtn.clearing', '.visible-img', function(e) {
          if (!e.touches) { e = e.originalEvent; }
          var data = {
                start_page_x: e.touches[0].pageX,
                start_page_y: e.touches[0].pageY,
                start_time: (new Date()).getTime(),
                delta_x: 0,
                is_scrolling: undefined
              };

          S(this).data('swipe-transition', data);
          e.stopPropagation();
        })
        .on('touchmove.fndtn.clearing', '.visible-img', function(e) {
          if (!e.touches) { e = e.originalEvent; }
          // Ignore pinch/zoom events
          if(e.touches.length > 1 || e.scale && e.scale !== 1) return;

          var data = S(this).data('swipe-transition');

          if (typeof data === 'undefined') {
            data = {};
          }

          data.delta_x = e.touches[0].pageX - data.start_page_x;

          if ( typeof data.is_scrolling === 'undefined') {
            data.is_scrolling = !!( data.is_scrolling || Math.abs(data.delta_x) < Math.abs(e.touches[0].pageY - data.start_page_y) );
          }

          if (!data.is_scrolling && !data.active) {
            e.preventDefault();
            var direction = (data.delta_x < 0) ? 'next' : 'prev';
            data.active = true;
            self.nav(e, direction);
          }
        })
        .on('touchend.fndtn.clearing', '.visible-img', function(e) {
          S(this).data('swipe-transition', {});
          e.stopPropagation();
        });
    },

    assemble : function ($li) {
      var $el = $li.parent();

      if ($el.parent().hasClass('carousel')) return;
      $el.after('<div id="foundationClearingHolder"></div>');

      var holder = this.S('#foundationClearingHolder'),
          settings = $el.data(this.attr_name(true) + '-init'),
          grid = $el.detach(),
          data = {
            grid: '<div class="carousel">' + grid[0].outerHTML + '</div>',
            viewing: settings.templates.viewing
          },
          wrapper = '<div class="clearing-assembled"><div>' + data.viewing +
            data.grid + '</div></div>',
          touch_label = this.settings.touch_label;

      if (Modernizr.touch) {
        wrapper = $(wrapper).find('.clearing-touch-label').html(touch_label).end();
      }

      holder.after(wrapper).remove();
    },

    open : function ($image, current, target) {
      var self = this,
          body = $(document.body),
          root = target.closest('.clearing-assembled'),
          container = $('div', root).first(),
          visible_image = $('.visible-img', container),
          image = $('img', visible_image).not($image),
          label = $('.clearing-touch-label', '.clearing-blackout'),
          error = false;

      image.error(function () {
        error = true;
      });

      function startLoad() {
        setTimeout(function () {
          this.image_loaded(image, function () {
            if (image.outerWidth() === 1 && !error) {
              startLoad.call(this);
            } else {
              cb.call(this, image);
            }
          }.bind(this));
        }.bind(this), 50);
      }

      function cb (image) {
        var $image = $(image);
        image.css('visibility', 'visible');
        // toggle the gallery
        body.css('overflow', 'hidden');
        root.addClass('clearing-blackout');
        container.addClass('clearing-container');
        visible_image.show();
        this.fix_height(target)
          .caption(self.S('.clearing-caption', visible_image), self.S('img', target))
          .center_and_label(image, label)
          .shift(current, target, function () {
            target.siblings().removeClass('visible');
            target.addClass('visible');
          });
      }

      if (!this.locked()) {
        // set the image to the selected thumbnail
        image
          .attr('src', this.load($image))
          .css('visibility', 'hidden');

        startLoad.call(this);

      }
    },

    close : function (e, el) {
      e.preventDefault();

      var root = (function (target) {
            if (/blackout/.test(target.selector)) {
              return target;
            } else {
              return target.closest('.clearing-blackout');
            }
          }($(el))),
          body = $(document.body), container, visible_image;

      if (el === e.target && root) {
        body.css('overflow', '');
        container = $('div', root).first();
        visible_image = $('.visible-img', container);
        this.settings.prev_index = 0;
        $('ul[' + this.attr_name() + ']', root)
          .attr('style', '').closest('.clearing-blackout')
          .removeClass('clearing-blackout');
        container.removeClass('clearing-container');
        visible_image.hide();
      }

      return false;
    },

    is_open : function (current) {
      return current.parent().prop('style').length > 0;
    },

    keydown : function (e) {
      var clearing = $('.clearing-blackout ul[' + this.attr_name() + ']'),
          NEXT_KEY = this.rtl ? 37 : 39,
          PREV_KEY = this.rtl ? 39 : 37,
          ESC_KEY = 27;

      if (e.which === NEXT_KEY) this.go(clearing, 'next');
      if (e.which === PREV_KEY) this.go(clearing, 'prev');
      if (e.which === ESC_KEY) this.S('a.clearing-close').trigger('click');
    },

    nav : function (e, direction) {
      var clearing = $('ul[' + this.attr_name() + ']', '.clearing-blackout');

      e.preventDefault();
      this.go(clearing, direction);
    },

    resize : function () {
      var image = $('img', '.clearing-blackout .visible-img'),
          label = $('.clearing-touch-label', '.clearing-blackout');

      if (image.length) {
        this.center_and_label(image, label);
      }
    },

    // visual adjustments
    fix_height : function (target) {
      var lis = target.parent().children(),
          self = this;

      lis.each(function () {
          var li = self.S(this),
              image = li.find('img');

          if (li.height() > image.outerHeight()) {
            li.addClass('fix-height');
          }
        })
        .closest('ul')
        .width(lis.length * 100 + '%');

      return this;
    },

    update_paddles : function (target) {
      var visible_image = target
        .closest('.carousel')
        .siblings('.visible-img');

      if (target.next().length > 0) {
        this.S('.clearing-main-next', visible_image)
          .removeClass('disabled');
      } else {
        this.S('.clearing-main-next', visible_image)
          .addClass('disabled');
      }

      if (target.prev().length > 0) {
        this.S('.clearing-main-prev', visible_image)
          .removeClass('disabled');
      } else {
        this.S('.clearing-main-prev', visible_image)
          .addClass('disabled');
      }
    },

    center_and_label : function (target, label) {
      if (!this.rtl) {
        target.css({
          marginLeft : -(target.outerWidth() / 2),
          marginTop : -(target.outerHeight() / 2)
        });

        if (label.length > 0) {
          label.css({
            marginLeft : -(label.outerWidth() / 2),
            marginTop : -(target.outerHeight() / 2)-label.outerHeight()-10
          });
        }
      } else {
        target.css({
          marginRight : -(target.outerWidth() / 2),
          marginTop : -(target.outerHeight() / 2),
          left: 'auto',
          right: '50%'
        });

        if (label.length > 0) {
          label.css({
            marginRight : -(label.outerWidth() / 2),
            marginTop : -(target.outerHeight() / 2)-label.outerHeight()-10,
            left: 'auto',
            right: '50%'
          });
        }
      }
      return this;
    },

    // image loading and preloading

    load : function ($image) {
      if ($image[0].nodeName === "A") {
        var href = $image.attr('href');
      } else {
        var href = $image.parent().attr('href');
      }

      this.preload($image);

      if (href) return href;
      return $image.attr('src');
    },

    preload : function ($image) {
      this
        .img($image.closest('li').next())
        .img($image.closest('li').prev());
    },

    img : function (img) {
      if (img.length) {
        var new_img = new Image(),
            new_a = this.S('a', img);

        if (new_a.length) {
          new_img.src = new_a.attr('href');
        } else {
          new_img.src = this.S('img', img).attr('src');
        }
      }
      return this;
    },

    // image caption

    caption : function (container, $image) {
      var caption = $image.attr('data-caption');

      if (caption) {
        container
          .html(caption)
          .show();
      } else {
        container
          .text('')
          .hide();
      }
      return this;
    },

    // directional methods

    go : function ($ul, direction) {
      var current = this.S('.visible', $ul),
          target = current[direction]();

      if (target.length) {
        this.S('img', target)
          .trigger('click', [current, target]);
      }
    },

    shift : function (current, target, callback) {
      var clearing = target.parent(),
          old_index = this.settings.prev_index || target.index(),
          direction = this.direction(clearing, current, target),
          dir = this.rtl ? 'right' : 'left',
          left = parseInt(clearing.css('left'), 10),
          width = target.outerWidth(),
          skip_shift;

      var dir_obj = {};

      // we use jQuery animate instead of CSS transitions because we
      // need a callback to unlock the next animation
      // needs support for RTL **
      if (target.index() !== old_index && !/skip/.test(direction)){
        if (/left/.test(direction)) {
          this.lock();
          dir_obj[dir] = left + width;
          clearing.animate(dir_obj, 300, this.unlock());
        } else if (/right/.test(direction)) {
          this.lock();
          dir_obj[dir] = left - width;
          clearing.animate(dir_obj, 300, this.unlock());
        }
      } else if (/skip/.test(direction)) {
        // the target image is not adjacent to the current image, so
        // do we scroll right or not
        skip_shift = target.index() - this.settings.up_count;
        this.lock();

        if (skip_shift > 0) {
          dir_obj[dir] = -(skip_shift * width);
          clearing.animate(dir_obj, 300, this.unlock());
        } else {
          dir_obj[dir] = 0;
          clearing.animate(dir_obj, 300, this.unlock());
        }
      }

      callback();
    },

    direction : function ($el, current, target) {
      var lis = this.S('li', $el),
          li_width = lis.outerWidth() + (lis.outerWidth() / 4),
          up_count = Math.floor(this.S('.clearing-container').outerWidth() / li_width) - 1,
          target_index = lis.index(target),
          response;

      this.settings.up_count = up_count;

      if (this.adjacent(this.settings.prev_index, target_index)) {
        if ((target_index > up_count)
          && target_index > this.settings.prev_index) {
          response = 'right';
        } else if ((target_index > up_count - 1)
          && target_index <= this.settings.prev_index) {
          response = 'left';
        } else {
          response = false;
        }
      } else {
        response = 'skip';
      }

      this.settings.prev_index = target_index;

      return response;
    },

    adjacent : function (current_index, target_index) {
      for (var i = target_index + 1; i >= target_index - 1; i--) {
        if (i === current_index) return true;
      }
      return false;
    },

    // lock management

    lock : function () {
      this.settings.locked = true;
    },

    unlock : function () {
      this.settings.locked = false;
    },

    locked : function () {
      return this.settings.locked;
    },

    off : function () {
      this.S(this.scope).off('.fndtn.clearing');
      this.S(window).off('.fndtn.clearing');
    },

    reflow : function () {
      this.init();
    }
  };

}(jQuery, this, this.document));
;(function ($, window, document, undefined) {
  'use strict';

  Foundation.libs.dropdown = {
    name : 'dropdown',

    version : '5.2.1',

    settings : {
      active_class: 'open',
      align: 'bottom',
      is_hover: false,
      opened: function(){},
      closed: function(){}
    },

    init : function (scope, method, options) {
      Foundation.inherit(this, 'throttle');

      this.bindings(method, options);
    },

    events : function (scope) {
      var self = this,
          S = self.S;

      S(this.scope)
        .off('.dropdown')
        .on('click.fndtn.dropdown', '[' + this.attr_name() + ']', function (e) {
          var settings = S(this).data(self.attr_name(true) + '-init') || self.settings;
          e.preventDefault();
          if (!settings.is_hover || Modernizr.touch) self.toggle(S(this));
        })
        .on('mouseenter.fndtn.dropdown', '[' + this.attr_name() + '], [' + this.attr_name() + '-content]', function (e) {
          var $this = S(this);
          clearTimeout(self.timeout);

          if ($this.data(self.data_attr())) {
            var dropdown = S('#' + $this.data(self.data_attr())),
                target = $this;
          } else {
            var dropdown = $this;
                target = S("[" + self.attr_name() + "='" + dropdown.attr('id') + "']");
          }

          var settings = target.data(self.attr_name(true) + '-init') || self.settings;
          
          if(S(e.target).data(self.data_attr()) && settings.is_hover) {
            self.closeall.call(self);
          }
          
          if (settings.is_hover) self.open.apply(self, [dropdown, target]);
        })
        .on('mouseleave.fndtn.dropdown', '[' + this.attr_name() + '], [' + this.attr_name() + '-content]', function (e) {
          var $this = S(this);
          self.timeout = setTimeout(function () {
            if ($this.data(self.data_attr())) {
              var settings = $this.data(self.data_attr(true) + '-init') || self.settings;
              if (settings.is_hover) self.close.call(self, S('#' + $this.data(self.data_attr())));
            } else {
              var target = S('[' + self.attr_name() + '="' + S(this).attr('id') + '"]'),
                  settings = target.data(self.attr_name(true) + '-init') || self.settings;
              if (settings.is_hover) self.close.call(self, $this);
            }
          }.bind(this), 150);
        })
        .on('click.fndtn.dropdown', function (e) {
          var parent = S(e.target).closest('[' + self.attr_name() + '-content]');

          if (S(e.target).data(self.data_attr()) || S(e.target).parent().data(self.data_attr())) {
            return;
          }
          if (!(S(e.target).data('revealId')) && 
            (parent.length > 0 && (S(e.target).is('[' + self.attr_name() + '-content]') || 
              $.contains(parent.first()[0], e.target)))) {
            e.stopPropagation();
            return;
          }

          self.close.call(self, S('[' + self.attr_name() + '-content]'));
        })
        .on('opened.fndtn.dropdown', '[' + self.attr_name() + '-content]', function () {
            self.settings.opened.call(this);
        })
        .on('closed.fndtn.dropdown', '[' + self.attr_name() + '-content]', function () {
            self.settings.closed.call(this);
        });

      S(window)
        .off('.dropdown')
        .on('resize.fndtn.dropdown', self.throttle(function () {
          self.resize.call(self);
        }, 50));

      this.resize();
    },

    close: function (dropdown) {
      var self = this;
      dropdown.each(function () {
        if (self.S(this).hasClass(self.settings.active_class)) {
          self.S(this)
            .css(Foundation.rtl ? 'right':'left', '-99999px')
            .removeClass(self.settings.active_class);

          self.S(this).trigger('closed', [dropdown]);
        }
      });
    },

    closeall: function() {
      var self = this;
      $.each(self.S('[' + this.attr_name() + '-content]'), function() {
        self.close.call(self, self.S(this))
      });
    },

    open: function (dropdown, target) {
        this
          .css(dropdown
            .addClass(this.settings.active_class), target);
        dropdown.trigger('opened', [dropdown, target]);
    },

    data_attr: function () {
      if (this.namespace.length > 0) {
        return this.namespace + '-' + this.name;
      }

      return this.name;
    },

    toggle : function (target) {
      var dropdown = this.S('#' + target.data(this.data_attr()));
      if (dropdown.length === 0) {
        // No dropdown found, not continuing
        return;
      }

      this.close.call(this, this.S('[' + this.attr_name() + '-content]').not(dropdown));

      if (dropdown.hasClass(this.settings.active_class)) {
        this.close.call(this, dropdown);
      } else {
        this.close.call(this, this.S('[' + this.attr_name() + '-content]'))
        this.open.call(this, dropdown, target);
      }
    },

    resize : function () {
      var dropdown = this.S('[' + this.attr_name() + '-content].open'),
          target = this.S("[" + this.attr_name() + "='" + dropdown.attr('id') + "']");

      if (dropdown.length && target.length) {
        this.css(dropdown, target);
      }
    },

    css : function (dropdown, target) {
      this.clear_idx();

      if (this.small()) {
        var p = this.dirs.bottom.call(dropdown, target);

        dropdown.attr('style', '').removeClass('drop-left drop-right drop-top').css({
          position : 'absolute',
          width: '95%',
          'max-width': 'none',
          top: p.top
        });

        dropdown.css(Foundation.rtl ? 'right':'left', '2.5%');
      } else {
        var settings = target.data(this.attr_name(true) + '-init') || this.settings;

        this.style(dropdown, target, settings);
      }

      return dropdown;
    },

    style : function (dropdown, target, settings) {
      var css = $.extend({position: 'absolute'}, 
        this.dirs[settings.align].call(dropdown, target, settings));

      dropdown.attr('style', '').css(css);
    },

    // return CSS property object
    // `this` is the dropdown
    dirs : {
      // Calculate target offset
      _base : function (t) {
        var o_p = this.offsetParent(),
            o = o_p.offset(),
            p = t.offset();

        p.top -= o.top;
        p.left -= o.left;

        return p;
      },
      top: function (t, s) {
        var self = Foundation.libs.dropdown,
            p = self.dirs._base.call(this, t),
            pip_offset_base = (t.outerWidth() / 2) - 8;

        this.addClass('drop-top');

        if (t.outerWidth() < this.outerWidth() || self.small()) {
          self.adjust_pip(pip_offset_base, p);
        }

        if (Foundation.rtl) {
          return {left: p.left - this.outerWidth() + t.outerWidth(), 
            top: p.top - this.outerHeight()};
        }

        return {left: p.left, top: p.top - this.outerHeight()};
      },
      bottom: function (t, s) {
        var self = Foundation.libs.dropdown,
            p = self.dirs._base.call(this, t),
            pip_offset_base = (t.outerWidth() / 2) - 8;

        if (t.outerWidth() < this.outerWidth() || self.small()) {
          self.adjust_pip(pip_offset_base, p);
        }

        if (self.rtl) {
          return {left: p.left - this.outerWidth() + t.outerWidth(), top: p.top + t.outerHeight()};
        }

        return {left: p.left, top: p.top + t.outerHeight()};
      },
      left: function (t, s) {
        var p = Foundation.libs.dropdown.dirs._base.call(this, t);

        this.addClass('drop-left');

        return {left: p.left - this.outerWidth(), top: p.top};
      },
      right: function (t, s) {
        var p = Foundation.libs.dropdown.dirs._base.call(this, t);

        this.addClass('drop-right');

        return {left: p.left + t.outerWidth(), top: p.top};
      }
    },

    // Insert rule to style psuedo elements
    adjust_pip : function (pip_offset_base, p) {
      var sheet = Foundation.stylesheet;

      if (this.small()) {
        pip_offset_base += p.left - 8;
      }

      this.rule_idx = sheet.cssRules.length;

      var sel_before = '.f-dropdown.open:before',
          sel_after  = '.f-dropdown.open:after',
          css_before = 'left: ' + pip_offset_base + 'px;',
          css_after  = 'left: ' + (pip_offset_base - 1) + 'px;';

      if (sheet.insertRule) {
        sheet.insertRule([sel_before, '{', css_before, '}'].join(' '), this.rule_idx);
        sheet.insertRule([sel_after, '{', css_after, '}'].join(' '), this.rule_idx + 1);
      } else {
        sheet.addRule(sel_before, css_before, this.rule_idx);
        sheet.addRule(sel_after, css_after, this.rule_idx + 1);
      }
    },

    // Remove old dropdown rule index
    clear_idx : function () {
      var sheet = Foundation.stylesheet;

      if (this.rule_idx) {
        sheet.deleteRule(this.rule_idx);
        sheet.deleteRule(this.rule_idx);
        delete this.rule_idx;
      }
    },

    small : function () {
      return matchMedia(Foundation.media_queries.small).matches &&
        !matchMedia(Foundation.media_queries.medium).matches;
    },

    off: function () {
      this.S(this.scope).off('.fndtn.dropdown');
      this.S('html, body').off('.fndtn.dropdown');
      this.S(window).off('.fndtn.dropdown');
      this.S('[data-dropdown-content]').off('.fndtn.dropdown');
    },

    reflow : function () {}
  };
}(jQuery, this, this.document));
;(function ($, window, document, undefined) {
  'use strict';

  Foundation.libs.interchange = {
    name : 'interchange',

    version : '5.2.1',

    cache : {},

    images_loaded : false,
    nodes_loaded : false,

    settings : {
      load_attr : 'interchange',

      named_queries : {
        'default' : 'only screen',
        small : Foundation.media_queries.small,
        medium : Foundation.media_queries.medium,
        large : Foundation.media_queries.large,
        xlarge : Foundation.media_queries.xlarge,
        xxlarge: Foundation.media_queries.xxlarge,
        landscape : 'only screen and (orientation: landscape)',
        portrait : 'only screen and (orientation: portrait)',
        retina : 'only screen and (-webkit-min-device-pixel-ratio: 2),' +
          'only screen and (min--moz-device-pixel-ratio: 2),' +
          'only screen and (-o-min-device-pixel-ratio: 2/1),' +
          'only screen and (min-device-pixel-ratio: 2),' +
          'only screen and (min-resolution: 192dpi),' +
          'only screen and (min-resolution: 2dppx)'
      },

      directives : {
        replace: function (el, path, trigger) {
          // The trigger argument, if called within the directive, fires
          // an event named after the directive on the element, passing
          // any parameters along to the event that you pass to trigger.
          //
          // ex. trigger(), trigger([a, b, c]), or trigger(a, b, c)
          //
          // This allows you to bind a callback like so:
          // $('#interchangeContainer').on('replace', function (e, a, b, c) {
          //   console.log($(this).html(), a, b, c);
          // });

          if (/IMG/.test(el[0].nodeName)) {
            var orig_path = el[0].src;

            if (new RegExp(path, 'i').test(orig_path)) return;

            el[0].src = path;

            return trigger(el[0].src);
          }
          var last_path = el.data(this.data_attr + '-last-path');

          if (last_path == path) return;


          var regex = "/^.(\.jpg|\.jpeg|\.png|\.gif|\.tiff|\.bmp)\??|#?./";

          if (new RegExp(regex,'i').test(path)){

              $(el).css('background-image', 'url('+path+')');
              el.data('interchange-last-path', path);
              return trigger(path);
          }

          return $.get(path, function (response) {
            el.html(response);
            el.data(this.data_attr + '-last-path', path);
            trigger();
          });

        }
      }
    },

    init : function (scope, method, options) {
      Foundation.inherit(this, 'throttle random_str');

      this.data_attr = this.set_data_attr();
      $.extend(true, this.settings, method, options);
      this.bindings(method, options);
      this.load('images');
      this.load('nodes');
    },

    get_media_hash : function() {
        var mediaHash='';
        for (var queryName in this.settings.named_queries ) {
            mediaHash += matchMedia(this.settings.named_queries[queryName]).matches.toString();
        }
        return mediaHash;
    },

    events : function () {
      var self = this, prevMediaHash;

      $(window)
        .off('.interchange')
        .on('resize.fndtn.interchange', self.throttle(function () {
            var currMediaHash = self.get_media_hash();
            if (currMediaHash !== prevMediaHash) {
                self.resize();
            }
            prevMediaHash = currMediaHash;
        }, 50));

      return this;
    },

    resize : function () {
      var cache = this.cache;

      if(!this.images_loaded || !this.nodes_loaded) {
        setTimeout($.proxy(this.resize, this), 50);
        return;
      }

      for (var uuid in cache) {
        if (cache.hasOwnProperty(uuid)) {
          var passed = this.results(uuid, cache[uuid]);

          if (passed) {
            this.settings.directives[passed
              .scenario[1]].call(this, passed.el, passed.scenario[0], function () {
                if (arguments[0] instanceof Array) { 
                  var args = arguments[0];
                } else { 
                  var args = Array.prototype.slice.call(arguments, 0);
                }

                passed.el.trigger(passed.scenario[1], args);
              });
          }
        }
      }

    },

    results : function (uuid, scenarios) {
      var count = scenarios.length;

      if (count > 0) {
        var el = this.S('[' + this.add_namespace('data-uuid') + '="' + uuid + '"]');

        while (count--) {
          var mq, rule = scenarios[count][2];
          if (this.settings.named_queries.hasOwnProperty(rule)) {
            mq = matchMedia(this.settings.named_queries[rule]);
          } else {
            mq = matchMedia(rule);
          }
          if (mq.matches) {
            return {el: el, scenario: scenarios[count]};
          }
        }
      }

      return false;
    },

    load : function (type, force_update) {
      if (typeof this['cached_' + type] === 'undefined' || force_update) {
        this['update_' + type]();
      }

      return this['cached_' + type];
    },

    update_images : function () {
      var images = this.S('img[' + this.data_attr + ']'),
          count = images.length,
          i = count,
          loaded_count = 0,
          data_attr = this.data_attr;

      this.cache = {};
      this.cached_images = [];
      this.images_loaded = (count === 0);

      while (i--) {
        loaded_count++;
        if (images[i]) {
          var str = images[i].getAttribute(data_attr) || '';

          if (str.length > 0) {
            this.cached_images.push(images[i]);
          }
        }

        if (loaded_count === count) {
          this.images_loaded = true;
          this.enhance('images');
        }
      }

      return this;
    },

    update_nodes : function () {
      var nodes = this.S('[' + this.data_attr + ']').not('img'),
          count = nodes.length,
          i = count,
          loaded_count = 0,
          data_attr = this.data_attr;

      this.cached_nodes = [];
      this.nodes_loaded = (count === 0);


      while (i--) {
        loaded_count++;
        var str = nodes[i].getAttribute(data_attr) || '';

        if (str.length > 0) {
          this.cached_nodes.push(nodes[i]);
        }

        if(loaded_count === count) {
          this.nodes_loaded = true;
          this.enhance('nodes');
        }
      }

      return this;
    },

    enhance : function (type) {
      var i = this['cached_' + type].length;

      while (i--) {
        this.object($(this['cached_' + type][i]));
      }

      return $(window).trigger('resize');
    },

    parse_params : function (path, directive, mq) {
      return [this.trim(path), this.convert_directive(directive), this.trim(mq)];
    },

    convert_directive : function (directive) {

      var trimmed = this.trim(directive);

      if (trimmed.length > 0) {
        return trimmed;
      }

      return 'replace';
    },

    object : function(el) {
      var raw_arr = this.parse_data_attr(el),
          scenarios = [], 
          i = raw_arr.length;

      if (i > 0) {
        while (i--) {
          var split = raw_arr[i].split(/\((.*?)(\))$/);

          if (split.length > 1) {
            var cached_split = split[0].split(','),
                params = this.parse_params(cached_split[0],
                  cached_split[1], split[1]);

            scenarios.push(params);
          }
        }
      }

      return this.store(el, scenarios);
    },

    store : function (el, scenarios) {
      var uuid = this.random_str(),
          current_uuid = el.data(this.add_namespace('uuid', true));

      if (this.cache[current_uuid]) return this.cache[current_uuid];

      el.attr(this.add_namespace('data-uuid'), uuid);

      return this.cache[uuid] = scenarios;
    },

    trim : function(str) {

      if (typeof str === 'string') {
        return $.trim(str);
      }

      return str;
    },

    set_data_attr: function (init) {
      if (init) {
        if (this.namespace.length > 0) {
          return this.namespace + '-' + this.settings.load_attr;
        }

        return this.settings.load_attr;
      }

      if (this.namespace.length > 0) {
        return 'data-' + this.namespace + '-' + this.settings.load_attr;
      }

      return 'data-' + this.settings.load_attr;
    },

    parse_data_attr : function (el) {
      var raw = el.attr(this.attr_name()).split(/\[(.*?)\]/),
          i = raw.length, 
          output = [];

      while (i--) {
        if (raw[i].replace(/[\W\d]+/, '').length > 4) {
          output.push(raw[i]);
        }
      }

      return output;
    },

    reflow : function () {
      this.load('images', true);
      this.load('nodes', true);
    }

  };

}(jQuery, this, this.document));
;(function ($, window, document, undefined) {
  'use strict';

  var Modernizr = Modernizr || false;

  Foundation.libs.joyride = {
    name : 'joyride',

    version : '5.2.1',

    defaults : {
      expose                   : false,     // turn on or off the expose feature
      modal                    : true,      // Whether to cover page with modal during the tour
      tip_location             : 'bottom',  // 'top' or 'bottom' in relation to parent
      nub_position             : 'auto',    // override on a per tooltip bases
      scroll_speed             : 1500,      // Page scrolling speed in milliseconds, 0 = no scroll animation
      scroll_animation         : 'linear',  // supports 'swing' and 'linear', extend with jQuery UI.
      timer                    : 0,         // 0 = no timer , all other numbers = timer in milliseconds
      start_timer_on_click     : true,      // true or false - true requires clicking the first button start the timer
      start_offset             : 0,         // the index of the tooltip you want to start on (index of the li)
      next_button              : true,      // true or false to control whether a next button is used
      tip_animation            : 'fade',    // 'pop' or 'fade' in each tip
      pause_after              : [],        // array of indexes where to pause the tour after
      exposed                  : [],        // array of expose elements
      tip_animation_fade_speed : 300,       // when tipAnimation = 'fade' this is speed in milliseconds for the transition
      cookie_monster           : false,     // true or false to control whether cookies are used
      cookie_name              : 'joyride', // Name the cookie you'll use
      cookie_domain            : false,     // Will this cookie be attached to a domain, ie. '.notableapp.com'
      cookie_expires           : 365,       // set when you would like the cookie to expire.
      tip_container            : 'body',    // Where will the tip be attached
      tip_location_patterns    : {
        top: ['bottom'],
        bottom: [], // bottom should not need to be repositioned
        left: ['right', 'top', 'bottom'],
        right: ['left', 'top', 'bottom']
      },
      post_ride_callback     : function (){},    // A method to call once the tour closes (canceled or complete)
      post_step_callback     : function (){},    // A method to call after each step
      pre_step_callback      : function (){},    // A method to call before each step
      pre_ride_callback      : function (){},    // A method to call before the tour starts (passed index, tip, and cloned exposed element)
      post_expose_callback   : function (){},    // A method to call after an element has been exposed
      template : { // HTML segments for tip layout
        link    : '<a href="#close" class="joyride-close-tip">&times;</a>',
        timer   : '<div class="joyride-timer-indicator-wrap"><span class="joyride-timer-indicator"></span></div>',
        tip     : '<div class="joyride-tip-guide"><span class="joyride-nub"></span></div>',
        wrapper : '<div class="joyride-content-wrapper"></div>',
        button  : '<a href="#" class="small button joyride-next-tip"></a>',
        modal   : '<div class="joyride-modal-bg"></div>',
        expose  : '<div class="joyride-expose-wrapper"></div>',
        expose_cover: '<div class="joyride-expose-cover"></div>'
      },
      expose_add_class : '' // One or more space-separated class names to be added to exposed element
    },

    init : function (scope, method, options) {
      Foundation.inherit(this, 'throttle random_str');

      this.settings = this.settings || $.extend({}, this.defaults, (options || method));

      this.bindings(method, options)
    },

    events : function () {
      var self = this;

      $(this.scope)
        .off('.joyride')
        .on('click.fndtn.joyride', '.joyride-next-tip, .joyride-modal-bg', function (e) {
          e.preventDefault();

          if (this.settings.$li.next().length < 1) {
            this.end();
          } else if (this.settings.timer > 0) {
            clearTimeout(this.settings.automate);
            this.hide();
            this.show();
            this.startTimer();
          } else {
            this.hide();
            this.show();
          }

        }.bind(this))

        .on('click.fndtn.joyride', '.joyride-close-tip', function (e) {
          e.preventDefault();
          this.end();
        }.bind(this));

      $(window)
        .off('.joyride')
        .on('resize.fndtn.joyride', self.throttle(function () {
          if ($('[' + self.attr_name() + ']').length > 0 && self.settings.$next_tip) {
            if (self.settings.exposed.length > 0) {
              var $els = $(self.settings.exposed);

              $els.each(function () {
                var $this = $(this);
                self.un_expose($this);
                self.expose($this);
              });
            }

            if (self.is_phone()) {
              self.pos_phone();
            } else {
              self.pos_default(false, true);
            }
          }
        }, 100));
    },

    start : function () {
      var self = this,
          $this = $('[' + this.attr_name() + ']', this.scope),
          integer_settings = ['timer', 'scrollSpeed', 'startOffset', 'tipAnimationFadeSpeed', 'cookieExpires'],
          int_settings_count = integer_settings.length;

      if (!$this.length > 0) return;

      if (!this.settings.init) this.events();

      this.settings = $this.data(this.attr_name(true) + '-init');

      // non configureable settings
      this.settings.$content_el = $this;
      this.settings.$body = $(this.settings.tip_container);
      this.settings.body_offset = $(this.settings.tip_container).position();
      this.settings.$tip_content = this.settings.$content_el.find('> li');
      this.settings.paused = false;
      this.settings.attempts = 0;

      // can we create cookies?
      if (typeof $.cookie !== 'function') {
        this.settings.cookie_monster = false;
      }

      // generate the tips and insert into dom.
      if (!this.settings.cookie_monster || this.settings.cookie_monster && !$.cookie(this.settings.cookie_name)) {
        this.settings.$tip_content.each(function (index) {
          var $this = $(this);
          this.settings = $.extend({}, self.defaults, self.data_options($this))

          // Make sure that settings parsed from data_options are integers where necessary
          var i = int_settings_count;
          while (i--) {
            self.settings[integer_settings[i]] = parseInt(self.settings[integer_settings[i]], 10);
          }
          self.create({$li : $this, index : index});
        });

        // show first tip
        if (!this.settings.start_timer_on_click && this.settings.timer > 0) {
          this.show('init');
          this.startTimer();
        } else {
          this.show('init');
        }

      }
    },

    resume : function () {
      this.set_li();
      this.show();
    },

    tip_template : function (opts) {
      var $blank, content;

      opts.tip_class = opts.tip_class || '';

      $blank = $(this.settings.template.tip).addClass(opts.tip_class);
      content = $.trim($(opts.li).html()) +
        this.button_text(opts.button_text) +
        this.settings.template.link +
        this.timer_instance(opts.index);

      $blank.append($(this.settings.template.wrapper));
      $blank.first().attr(this.add_namespace('data-index'), opts.index);
      $('.joyride-content-wrapper', $blank).append(content);

      return $blank[0];
    },

    timer_instance : function (index) {
      var txt;

      if ((index === 0 && this.settings.start_timer_on_click && this.settings.timer > 0) || this.settings.timer === 0) {
        txt = '';
      } else {
        txt = $(this.settings.template.timer)[0].outerHTML;
      }
      return txt;
    },

    button_text : function (txt) {
      if (this.settings.next_button) {
        txt = $.trim(txt) || 'Next';
        txt = $(this.settings.template.button).append(txt)[0].outerHTML;
      } else {
        txt = '';
      }
      return txt;
    },

    create : function (opts) {
      var buttonText = opts.$li.attr(this.add_namespace('data-button')) 
        || opts.$li.attr(this.add_namespace('data-text')),
        tipClass = opts.$li.attr('class'),
        $tip_content = $(this.tip_template({
          tip_class : tipClass,
          index : opts.index,
          button_text : buttonText,
          li : opts.$li
        }));

      $(this.settings.tip_container).append($tip_content);
    },

    show : function (init) {
      var $timer = null;

      // are we paused?
      if (this.settings.$li === undefined
        || ($.inArray(this.settings.$li.index(), this.settings.pause_after) === -1)) {

        // don't go to the next li if the tour was paused
        if (this.settings.paused) {
          this.settings.paused = false;
        } else {
          this.set_li(init);
        }

        this.settings.attempts = 0;

        if (this.settings.$li.length && this.settings.$target.length > 0) {
          if (init) { //run when we first start
            this.settings.pre_ride_callback(this.settings.$li.index(), this.settings.$next_tip);
            if (this.settings.modal) {
              this.show_modal();
            }
          }

          this.settings.pre_step_callback(this.settings.$li.index(), this.settings.$next_tip);

          if (this.settings.modal && this.settings.expose) {
            this.expose();
          }

          this.settings.tip_settings = $.extend({}, this.settings, this.data_options(this.settings.$li));

          this.settings.timer = parseInt(this.settings.timer, 10);

          this.settings.tip_settings.tip_location_pattern = this.settings.tip_location_patterns[this.settings.tip_settings.tip_location];

          // scroll if not modal
          if (!/body/i.test(this.settings.$target.selector)) {
            this.scroll_to();
          }

          if (this.is_phone()) {
            this.pos_phone(true);
          } else {
            this.pos_default(true);
          }

          $timer = this.settings.$next_tip.find('.joyride-timer-indicator');

          if (/pop/i.test(this.settings.tip_animation)) {

            $timer.width(0);

            if (this.settings.timer > 0) {

              this.settings.$next_tip.show();

              setTimeout(function () {
                $timer.animate({
                  width: $timer.parent().width()
                }, this.settings.timer, 'linear');
              }.bind(this), this.settings.tip_animation_fade_speed);

            } else {
              this.settings.$next_tip.show();

            }


          } else if (/fade/i.test(this.settings.tip_animation)) {

            $timer.width(0);

            if (this.settings.timer > 0) {

              this.settings.$next_tip
                .fadeIn(this.settings.tip_animation_fade_speed)
                .show();

              setTimeout(function () {
                $timer.animate({
                  width: $timer.parent().width()
                }, this.settings.timer, 'linear');
              }.bind(this), this.settings.tip_animation_fadeSpeed);

            } else {
              this.settings.$next_tip.fadeIn(this.settings.tip_animation_fade_speed);
            }
          }

          this.settings.$current_tip = this.settings.$next_tip;

        // skip non-existant targets
        } else if (this.settings.$li && this.settings.$target.length < 1) {

          this.show();

        } else {

          this.end();

        }
      } else {

        this.settings.paused = true;

      }

    },

    is_phone : function () {
      return matchMedia(Foundation.media_queries.small).matches &&
        !matchMedia(Foundation.media_queries.medium).matches;
    },

    hide : function () {
      if (this.settings.modal && this.settings.expose) {
        this.un_expose();
      }

      if (!this.settings.modal) {
        $('.joyride-modal-bg').hide();
      }

      // Prevent scroll bouncing...wait to remove from layout
      this.settings.$current_tip.css('visibility', 'hidden');
      setTimeout($.proxy(function() {
        this.hide();
        this.css('visibility', 'visible');
      }, this.settings.$current_tip), 0);
      this.settings.post_step_callback(this.settings.$li.index(),
        this.settings.$current_tip);
    },

    set_li : function (init) {
      if (init) {
        this.settings.$li = this.settings.$tip_content.eq(this.settings.start_offset);
        this.set_next_tip();
        this.settings.$current_tip = this.settings.$next_tip;
      } else {
        this.settings.$li = this.settings.$li.next();
        this.set_next_tip();
      }

      this.set_target();
    },

    set_next_tip : function () {
      this.settings.$next_tip = $(".joyride-tip-guide").eq(this.settings.$li.index());
      this.settings.$next_tip.data('closed', '');
    },

    set_target : function () {
      var cl = this.settings.$li.attr(this.add_namespace('data-class')),
          id = this.settings.$li.attr(this.add_namespace('data-id')),
          $sel = function () {
            if (id) {
              return $(document.getElementById(id));
            } else if (cl) {
              return $('.' + cl).first();
            } else {
              return $('body');
            }
          };

      this.settings.$target = $sel();
    },

    scroll_to : function () {
      var window_half, tipOffset;

      window_half = $(window).height() / 2;
      tipOffset = Math.ceil(this.settings.$target.offset().top - window_half + this.settings.$next_tip.outerHeight());

      if (tipOffset != 0) {
        $('html, body').animate({
          scrollTop: tipOffset
        }, this.settings.scroll_speed, 'swing');
      }
    },

    paused : function () {
      return ($.inArray((this.settings.$li.index() + 1), this.settings.pause_after) === -1);
    },

    restart : function () {
      this.hide();
      this.settings.$li = undefined;
      this.show('init');
    },

    pos_default : function (init, resizing) {
      var half_fold = Math.ceil($(window).height() / 2),
          tip_position = this.settings.$next_tip.offset(),
          $nub = this.settings.$next_tip.find('.joyride-nub'),
          nub_width = Math.ceil($nub.outerWidth() / 2),
          nub_height = Math.ceil($nub.outerHeight() / 2),
          toggle = init || false;

      // tip must not be "display: none" to calculate position
      if (toggle) {
        this.settings.$next_tip.css('visibility', 'hidden');
        this.settings.$next_tip.show();
      }

      if (typeof resizing === 'undefined') {
        resizing = false;
      }

      if (!/body/i.test(this.settings.$target.selector)) {
          if (this.bottom()) {
            if (this.rtl) {
              this.settings.$next_tip.css({
                top: (this.settings.$target.offset().top + nub_height + this.settings.$target.outerHeight()),
                left: this.settings.$target.offset().left + this.settings.$target.outerWidth() - this.settings.$next_tip.outerWidth()});
            } else {
              this.settings.$next_tip.css({
                top: (this.settings.$target.offset().top + nub_height + this.settings.$target.outerHeight()),
                left: this.settings.$target.offset().left});
            }

            this.nub_position($nub, this.settings.tip_settings.nub_position, 'top');

          } else if (this.top()) {
            if (this.rtl) {
              this.settings.$next_tip.css({
                top: (this.settings.$target.offset().top - this.settings.$next_tip.outerHeight() - nub_height),
                left: this.settings.$target.offset().left + this.settings.$target.outerWidth() - this.settings.$next_tip.outerWidth()});
            } else {
              this.settings.$next_tip.css({
                top: (this.settings.$target.offset().top - this.settings.$next_tip.outerHeight() - nub_height),
                left: this.settings.$target.offset().left});
            }

            this.nub_position($nub, this.settings.tip_settings.nub_position, 'bottom');

          } else if (this.right()) {

            this.settings.$next_tip.css({
              top: this.settings.$target.offset().top,
              left: (this.settings.$target.outerWidth() + this.settings.$target.offset().left + nub_width)});

            this.nub_position($nub, this.settings.tip_settings.nub_position, 'left');

          } else if (this.left()) {

            this.settings.$next_tip.css({
              top: this.settings.$target.offset().top,
              left: (this.settings.$target.offset().left - this.settings.$next_tip.outerWidth() - nub_width)});

            this.nub_position($nub, this.settings.tip_settings.nub_position, 'right');

          }

          if (!this.visible(this.corners(this.settings.$next_tip)) && this.settings.attempts < this.settings.tip_settings.tip_location_pattern.length) {

            $nub.removeClass('bottom')
              .removeClass('top')
              .removeClass('right')
              .removeClass('left');

            this.settings.tip_settings.tip_location = this.settings.tip_settings.tip_location_pattern[this.settings.attempts];

            this.settings.attempts++;

            this.pos_default();

          }

      } else if (this.settings.$li.length) {

        this.pos_modal($nub);

      }

      if (toggle) {
        this.settings.$next_tip.hide();
        this.settings.$next_tip.css('visibility', 'visible');
      }

    },

    pos_phone : function (init) {
      var tip_height = this.settings.$next_tip.outerHeight(),
          tip_offset = this.settings.$next_tip.offset(),
          target_height = this.settings.$target.outerHeight(),
          $nub = $('.joyride-nub', this.settings.$next_tip),
          nub_height = Math.ceil($nub.outerHeight() / 2),
          toggle = init || false;

      $nub.removeClass('bottom')
        .removeClass('top')
        .removeClass('right')
        .removeClass('left');

      if (toggle) {
        this.settings.$next_tip.css('visibility', 'hidden');
        this.settings.$next_tip.show();
      }

      if (!/body/i.test(this.settings.$target.selector)) {

        if (this.top()) {

            this.settings.$next_tip.offset({top: this.settings.$target.offset().top - tip_height - nub_height});
            $nub.addClass('bottom');

        } else {

          this.settings.$next_tip.offset({top: this.settings.$target.offset().top + target_height + nub_height});
          $nub.addClass('top');

        }

      } else if (this.settings.$li.length) {
        this.pos_modal($nub);
      }

      if (toggle) {
        this.settings.$next_tip.hide();
        this.settings.$next_tip.css('visibility', 'visible');
      }
    },

    pos_modal : function ($nub) {
      this.center();
      $nub.hide();

      this.show_modal();
    },

    show_modal : function () {
      if (!this.settings.$next_tip.data('closed')) {
        var joyridemodalbg =  $('.joyride-modal-bg');
        if (joyridemodalbg.length < 1) {
          $('body').append(this.settings.template.modal).show();
        }

        if (/pop/i.test(this.settings.tip_animation)) {
            joyridemodalbg.show();
        } else {
            joyridemodalbg.fadeIn(this.settings.tip_animation_fade_speed);
        }
      }
    },

    expose : function () {
      var expose,
          exposeCover,
          el,
          origCSS,
          origClasses,
          randId = 'expose-' + this.random_str(6);

      if (arguments.length > 0 && arguments[0] instanceof $) {
        el = arguments[0];
      } else if(this.settings.$target && !/body/i.test(this.settings.$target.selector)){
        el = this.settings.$target;
      }  else {
        return false;
      }

      if(el.length < 1){
        if(window.console){
          console.error('element not valid', el);
        }
        return false;
      }

      expose = $(this.settings.template.expose);
      this.settings.$body.append(expose);
      expose.css({
        top: el.offset().top,
        left: el.offset().left,
        width: el.outerWidth(true),
        height: el.outerHeight(true)
      });

      exposeCover = $(this.settings.template.expose_cover);

      origCSS = {
        zIndex: el.css('z-index'),
        position: el.css('position')
      };

      origClasses = el.attr('class') == null ? '' : el.attr('class');

      el.css('z-index',parseInt(expose.css('z-index'))+1);

      if (origCSS.position == 'static') {
        el.css('position','relative');
      }

      el.data('expose-css',origCSS);
      el.data('orig-class', origClasses);
      el.attr('class', origClasses + ' ' + this.settings.expose_add_class);

      exposeCover.css({
        top: el.offset().top,
        left: el.offset().left,
        width: el.outerWidth(true),
        height: el.outerHeight(true)
      });

      if (this.settings.modal) this.show_modal();

      this.settings.$body.append(exposeCover);
      expose.addClass(randId);
      exposeCover.addClass(randId);
      el.data('expose', randId);
      this.settings.post_expose_callback(this.settings.$li.index(), this.settings.$next_tip, el);
      this.add_exposed(el);
    },

    un_expose : function () {
      var exposeId,
          el,
          expose ,
          origCSS,
          origClasses,
          clearAll = false;

      if (arguments.length > 0 && arguments[0] instanceof $) {
        el = arguments[0];
      } else if(this.settings.$target && !/body/i.test(this.settings.$target.selector)){
        el = this.settings.$target;
      }  else {
        return false;
      }

      if(el.length < 1){
        if (window.console) {
          console.error('element not valid', el);
        }
        return false;
      }

      exposeId = el.data('expose');
      expose = $('.' + exposeId);

      if (arguments.length > 1) {
        clearAll = arguments[1];
      }

      if (clearAll === true) {
        $('.joyride-expose-wrapper,.joyride-expose-cover').remove();
      } else {
        expose.remove();
      }

      origCSS = el.data('expose-css');

      if (origCSS.zIndex == 'auto') {
        el.css('z-index', '');
      } else {
        el.css('z-index', origCSS.zIndex);
      }

      if (origCSS.position != el.css('position')) {
        if(origCSS.position == 'static') {// this is default, no need to set it.
          el.css('position', '');
        } else {
          el.css('position', origCSS.position);
        }
      }

      origClasses = el.data('orig-class');
      el.attr('class', origClasses);
      el.removeData('orig-classes');

      el.removeData('expose');
      el.removeData('expose-z-index');
      this.remove_exposed(el);
    },

    add_exposed: function(el){
      this.settings.exposed = this.settings.exposed || [];
      if (el instanceof $ || typeof el === 'object') {
        this.settings.exposed.push(el[0]);
      } else if (typeof el == 'string') {
        this.settings.exposed.push(el);
      }
    },

    remove_exposed: function(el){
      var search, i;
      if (el instanceof $) {
        search = el[0]
      } else if (typeof el == 'string'){
        search = el;
      }

      this.settings.exposed = this.settings.exposed || [];
      i = this.settings.exposed.length;

      while (i--) {
        if (this.settings.exposed[i] == search) {
          this.settings.exposed.splice(i, 1);
          return;
        }
      }
    },

    center : function () {
      var $w = $(window);

      this.settings.$next_tip.css({
        top : ((($w.height() - this.settings.$next_tip.outerHeight()) / 2) + $w.scrollTop()),
        left : ((($w.width() - this.settings.$next_tip.outerWidth()) / 2) + $w.scrollLeft())
      });

      return true;
    },

    bottom : function () {
      return /bottom/i.test(this.settings.tip_settings.tip_location);
    },

    top : function () {
      return /top/i.test(this.settings.tip_settings.tip_location);
    },

    right : function () {
      return /right/i.test(this.settings.tip_settings.tip_location);
    },

    left : function () {
      return /left/i.test(this.settings.tip_settings.tip_location);
    },

    corners : function (el) {
      var w = $(window),
          window_half = w.height() / 2,
          //using this to calculate since scroll may not have finished yet.
          tipOffset = Math.ceil(this.settings.$target.offset().top - window_half + this.settings.$next_tip.outerHeight()),
          right = w.width() + w.scrollLeft(),
          offsetBottom =  w.height() + tipOffset,
          bottom = w.height() + w.scrollTop(),
          top = w.scrollTop();

      if (tipOffset < top) {
        if (tipOffset < 0) {
          top = 0;
        } else {
          top = tipOffset;
        }
      }

      if (offsetBottom > bottom) {
        bottom = offsetBottom;
      }

      return [
        el.offset().top < top,
        right < el.offset().left + el.outerWidth(),
        bottom < el.offset().top + el.outerHeight(),
        w.scrollLeft() > el.offset().left
      ];
    },

    visible : function (hidden_corners) {
      var i = hidden_corners.length;

      while (i--) {
        if (hidden_corners[i]) return false;
      }

      return true;
    },

    nub_position : function (nub, pos, def) {
      if (pos === 'auto') {
        nub.addClass(def);
      } else {
        nub.addClass(pos);
      }
    },

    startTimer : function () {
      if (this.settings.$li.length) {
        this.settings.automate = setTimeout(function () {
          this.hide();
          this.show();
          this.startTimer();
        }.bind(this), this.settings.timer);
      } else {
        clearTimeout(this.settings.automate);
      }
    },

    end : function () {
      if (this.settings.cookie_monster) {
        $.cookie(this.settings.cookie_name, 'ridden', { expires: this.settings.cookie_expires, domain: this.settings.cookie_domain });
      }

      if (this.settings.timer > 0) {
        clearTimeout(this.settings.automate);
      }

      if (this.settings.modal && this.settings.expose) {
        this.un_expose();
      }

      this.settings.$next_tip.data('closed', true);

      $('.joyride-modal-bg').hide();
      this.settings.$current_tip.hide();
      this.settings.post_step_callback(this.settings.$li.index(), this.settings.$current_tip);
      this.settings.post_ride_callback(this.settings.$li.index(), this.settings.$current_tip);
      $('.joyride-tip-guide').remove();
    },

    off : function () {
      $(this.scope).off('.joyride');
      $(window).off('.joyride');
      $('.joyride-close-tip, .joyride-next-tip, .joyride-modal-bg').off('.joyride');
      $('.joyride-tip-guide, .joyride-modal-bg').remove();
      clearTimeout(this.settings.automate);
      this.settings = {};
    },

    reflow : function () {}
  };
}(jQuery, this, this.document));
;(function ($, window, document, undefined) {
  'use strict';

  Foundation.libs['magellan-expedition'] = {
    name : 'magellan-expedition',

    version : '5.2.1',

    settings : {
      active_class: 'active',
      threshold: 0, // pixels from the top of the expedition for it to become fixes
      destination_threshold: 20, // pixels from the top of destination for it to be considered active
      throttle_delay: 30 // calculation throttling to increase framerate
    }, 

    init : function (scope, method, options) {
      Foundation.inherit(this, 'throttle');
      this.bindings(method, options);
    },

    events : function () {
      var self = this,
          S = self.S,
          settings = self.settings;
      
      // initialize expedition offset
      self.set_expedition_position();
      
      S(self.scope)
        .off('.magellan')
        .on('click.fndtn.magellan', '[' + self.add_namespace('data-magellan-arrival') + '] a[href^="#"]', function (e) {
            e.preventDefault();
            var expedition = $(this).closest('[' + self.attr_name() + ']'),
                settings = expedition.data('magellan-expedition-init');

            var hash = this.hash.split('#').join(''),
                target = $('a[name='+hash+']');
            if (target.length === 0) target = $('#'+hash);

            // Account for expedition height if fixed position
            var scroll_top = target.offset().top;
            if (expedition.css('position') === 'fixed') {
              scroll_top = scroll_top - expedition.outerHeight();
            }

            $('html, body').stop().animate({
                'scrollTop': scroll_top
            }, 700, 'swing', function () {
                window.location.hash = '#'+hash;
            });
        })
        .on('scroll.fndtn.magellan', self.throttle(this.check_for_arrivals.bind(this), settings.throttle_delay))
        $(window).on('resize.fndtn.magellan', self.throttle(this.set_expedition_position.bind(this), settings.throttle_delay));
    },

    check_for_arrivals : function() {
      var self = this;
      self.update_arrivals();
      self.update_expedition_positions();
    },

    set_expedition_position : function() {
      var self = this;
      $('[' + this.attr_name() + '=fixed]', self.scope).each(function(idx, el) {
        var expedition = $(this),
            styles = expedition.attr('styles'), // save styles
            top_offset;

        expedition.attr('style', '');
        top_offset = expedition.offset().top;

        expedition.data(self.data_attr('magellan-top-offset'), top_offset);
        expedition.attr('style', styles);
      });
    },

    update_expedition_positions : function() {
      var self = this,
          window_top_offset = $(window).scrollTop();

      $('[' + this.attr_name() + '=fixed]', self.scope).each(function() {
        var expedition = $(this),
            top_offset = expedition.data('magellan-top-offset');
        
        if (window_top_offset >= top_offset) {
          // Placeholder allows height calculations to be consistent even when
          // appearing to switch between fixed/non-fixed placement
          var placeholder = expedition.prev('[' + self.add_namespace('data-magellan-expedition-clone') + ']');
          if (placeholder.length === 0) {
            placeholder = expedition.clone();
            placeholder.removeAttr(self.attr_name());
            placeholder.attr(self.add_namespace('data-magellan-expedition-clone'),'');
            expedition.before(placeholder);
          }
          expedition.css({position:'fixed', top: 0});
        } else {
          expedition.prev('[' + self.add_namespace('data-magellan-expedition-clone') + ']').remove();
          expedition.attr('style','');
        }
      });
    },

    update_arrivals : function() {
      var self = this,
          window_top_offset = $(window).scrollTop();

      $('[' + this.attr_name() + ']', self.scope).each(function() {
        var expedition = $(this),
            settings = settings = expedition.data(self.attr_name(true) + '-init'),
            offsets = self.offsets(expedition, window_top_offset),
            arrivals = expedition.find('[' + self.add_namespace('data-magellan-arrival') + ']'),
            active_item = false;
        offsets.each(function(idx, item) {
          if (item.viewport_offset >= item.top_offset) {
            var arrivals = expedition.find('[' + self.add_namespace('data-magellan-arrival') + ']');
            arrivals.not(item.arrival).removeClass(settings.active_class);
            item.arrival.addClass(settings.active_class);
            active_item = true;
            return true;
          }
        });

        if (!active_item) arrivals.removeClass(settings.active_class);
      });
    },

    offsets : function(expedition, window_offset) {
      var self = this,
          settings = expedition.data(self.attr_name(true) + '-init'),
          viewport_offset = (window_offset + settings.destination_threshold);

      return expedition.find('[' + self.add_namespace('data-magellan-arrival') + ']').map(function(idx, el) {
        var name = $(this).data(self.data_attr('magellan-arrival')),
            dest = $('[' + self.add_namespace('data-magellan-destination') + '=' + name + ']');
        if (dest.length > 0) {
          var top_offset = dest.offset().top;
          return {
            destination : dest,
            arrival : $(this),
            top_offset : top_offset,
            viewport_offset : viewport_offset
          }
        }
      }).sort(function(a, b) {
        if (a.top_offset < b.top_offset) return -1;
        if (a.top_offset > b.top_offset) return 1;
        return 0;
      });
    },

    data_attr: function (str) {
      if (this.namespace.length > 0) {
        return this.namespace + '-' + str;
      }

      return str;
    },

    off : function () {
      this.S(this.scope).off('.magellan');
      this.S(window).off('.magellan');
    },

    reflow : function () {
      var self = this;
      // remove placeholder expeditions used for height calculation purposes
      $('[' + self.add_namespace('data-magellan-expedition-clone') + ']', self.scope).remove();
    }
  };
}(jQuery, this, this.document));
;(function ($, window, document, undefined) {
  'use strict';

  Foundation.libs.offcanvas = {
    name : 'offcanvas',

    version : '5.2.1',

    settings : {},

    init : function (scope, method, options) {
      this.events();
    },

    events : function () {
      var S = this.S;

      S(this.scope).off('.offcanvas')
        .on('click.fndtn.offcanvas', '.left-off-canvas-toggle', function (e) {
          e.preventDefault();
          S(this).closest('.off-canvas-wrap').toggleClass('move-right');
        })
        .on('click.fndtn.offcanvas', '.exit-off-canvas', function (e) {
          e.preventDefault();
          S(".off-canvas-wrap").removeClass("move-right");
        })
        .on('click.fndtn.offcanvas', '.left-off-canvas-menu a', function (e) {
          e.preventDefault();
          var href = $(this).attr('href');
          S('.off-canvas-wrap').on('transitionend webkitTransitionEnd oTransitionEnd', function(e) {
              window.location = href
              S('.off-canvas-wrap').off('transitionend webkitTransitionEnd oTransitionEnd');
          });
          S(".off-canvas-wrap").removeClass("move-right");
        })
        .on('click.fndtn.offcanvas', '.right-off-canvas-toggle', function (e) {
          e.preventDefault();
          S(this).closest(".off-canvas-wrap").toggleClass("move-left");
        })
        .on('click.fndtn.offcanvas', '.exit-off-canvas', function (e) {
          e.preventDefault();
          S(".off-canvas-wrap").removeClass("move-left");
        })
        .on('click.fndtn.offcanvas', '.right-off-canvas-menu a', function (e) {
          e.preventDefault();
          var href = $(this).attr('href');
          S('.off-canvas-wrap').on('transitionend webkitTransitionEnd oTransitionEnd', function(e) {
              window.location = href
              S('.off-canvas-wrap').off('transitionend webkitTransitionEnd oTransitionEnd');
          });
          S(".off-canvas-wrap").removeClass("move-left");
        });
    },

    reflow : function () {}
  };
}(jQuery, this, this.document));
;(function ($, window, document, undefined) {
  'use strict';

  var noop = function() {};

  var Orbit = function(el, settings) {
    // Don't reinitialize plugin
    if (el.hasClass(settings.slides_container_class)) {
      return this;
    }

    var self = this,
        container,
        slides_container = el,
        number_container,
        bullets_container,
        timer_container,
        idx = 0,
        animate,
        adjust_height_after = false;

    self.cache = {};

    self.slides = function() {
      return slides_container.children(settings.slide_selector);
    };

    self.slides().first().addClass(settings.active_slide_class);

    self.update_slide_number = function(index) {
      if (settings.slide_number) {
        number_container.find('span:first').text(parseInt(index)+1);
        number_container.find('span:last').text(self.slides().length);
      }
      if (settings.bullets) {
        bullets_container.children().removeClass(settings.bullets_active_class);
        $(bullets_container.children().get(index)).addClass(settings.bullets_active_class);
      }
    };

    self.update_active_link = function(index) {
      var link = $('[data-orbit-link="'+self.slides().eq(index).attr('data-orbit-slide')+'"]');
      link.siblings().removeClass(settings.bullets_active_class);
      link.addClass(settings.bullets_active_class);
    };

    self.build_markup = function() {
      slides_container.wrap('<div class="'+settings.container_class+'"></div>');
      container = slides_container.parent();
      slides_container.addClass(settings.slides_container_class);
      
      if (settings.navigation_arrows) {
        container.append($('<a href="#"><span></span></a>').addClass(settings.prev_class));
        container.append($('<a href="#"><span></span></a>').addClass(settings.next_class));
      }

      if (settings.timer) {
        timer_container = $('<div>').addClass(settings.timer_container_class);
        timer_container.append('<span>');
        timer_container.append($('<div>').addClass(settings.timer_progress_class));
        timer_container.addClass(settings.timer_paused_class);
        container.append(timer_container);
      }

      if (settings.slide_number) {
        number_container = $('<div>').addClass(settings.slide_number_class);
        number_container.append('<span></span> ' + settings.slide_number_text + ' <span></span>');
        container.append(number_container);
      }

      if (settings.bullets) {
        bullets_container = $('<ol>').addClass(settings.bullets_container_class);
        container.append(bullets_container);
        bullets_container.wrap('<div class="orbit-bullets-container"></div>');
        self.slides().each(function(idx, el) {
          var bullet = $('<li>').attr('data-orbit-slide', idx);
          bullets_container.append(bullet);
        });
      }

      if (settings.stack_on_small) {
        container.addClass(settings.stack_on_small_class);
      }
    };

    self._prepare_direction = function(next_idx, current_direction) {
      var dir = 'next';
      if (next_idx <= idx) { dir = 'prev'; }
      
      if (settings.animation === 'slide') {    
        setTimeout(function(){
          slides_container.removeClass("swipe-prev swipe-next");
          if (dir === 'next') {slides_container.addClass("swipe-next");}
          else if (dir === 'prev') {slides_container.addClass("swipe-prev");}
        },0);
      }
      
      var slides = self.slides();
      if (next_idx >= slides.length) {
        if (!settings.circular) return false;
        next_idx = 0;
      } else if (next_idx < 0) {
        if (!settings.circular) return false;
        next_idx = slides.length - 1;
      }
      var current = $(slides.get(idx))
        , next = $(slides.get(next_idx));
      

      return [dir, current, next, next_idx];
    };

    self._goto = function(next_idx, start_timer) {
      if (next_idx === null) {return false;}
      if (self.cache.animating) {return false;}
      if (next_idx === idx) {return false;}
      if (typeof self.cache.timer === 'object') {self.cache.timer.restart();}
      
      var slides = self.slides();
      self.cache.animating = true;
      var res = self._prepare_direction(next_idx)
        , dir = res[0]
        , current = res[1]
        , next = res[2]
        , next_idx = res[3];

      slides_container.trigger('before-slide-change.fndtn.orbit');
      settings.before_slide_change();
      idx = next_idx;

      current.css("transitionDuration", settings.animation_speed+"ms");
      next.css("transitionDuration", settings.animation_speed+"ms");
      
      var callback = function() {
        var unlock = function() {
          if (start_timer === true) {self.cache.timer.restart();}
          self.update_slide_number(idx);
          next.addClass(settings.active_slide_class);
          self.update_active_link(next_idx);
          slides_container.trigger('after-slide-change.fndtn.orbit',[{slide_number: idx, total_slides: slides.length}]);
          settings.after_slide_change(idx, slides.length);
          setTimeout(function(){
            self.cache.animating = false;
          }, 100);
          
        };
        if (slides_container.height() != next.height() && settings.variable_height) {
          slides_container.animate({'height': next.height()}, 250, 'linear', unlock);
        } else {
          unlock();
        }
      };

      if (slides.length === 1) {callback(); return false;}

      var start_animation = function() {
        if (dir === 'next') {animate.next(current, next, callback);}
        if (dir === 'prev') {animate.prev(current, next, callback);}        
      };

      if (next.height() > slides_container.height() && settings.variable_height) {
        slides_container.animate({'height': next.height()}, 250, 'linear', start_animation);
      } else {
        start_animation();
      }
    };
    
    self.next = function(e) {
      e.stopImmediatePropagation();
      e.preventDefault();
      self._prepare_direction(idx + 1);
      setTimeout(function(){
        self._goto(idx + 1);
    }, 100);
    };
    
    self.prev = function(e) {
      e.stopImmediatePropagation();
      e.preventDefault();
      self._prepare_direction(idx - 1);
      setTimeout(function(){
        self._goto(idx - 1)
      }, 100);
    };

    self.link_custom = function(e) {
      e.preventDefault();
      var link = $(this).attr('data-orbit-link');
      if ((typeof link === 'string') && (link = $.trim(link)) != "") {
        var slide = container.find('[data-orbit-slide='+link+']');
        if (slide.index() != -1) {
          setTimeout(function(){
            self._goto(slide.index());
          },100);
        }
      }
    };

    self.link_bullet = function(e) {    
      var index = $(this).attr('data-orbit-slide');
      if ((typeof index === 'string') && (index = $.trim(index)) != "") {
        if(isNaN(parseInt(index)))
        {
          var slide = container.find('[data-orbit-slide='+index+']');
          if (slide.index() != -1) {
            setTimeout(function(){
              self._goto(slide.index() + 1);
            },100);
          }
        }
        else
        {
          setTimeout(function(){
            self._goto(parseInt(index));
          },100);
        }
      }

    }

    self.timer_callback = function() {
      self._goto(idx + 1, true);
    }
    
    self.compute_dimensions = function() {
      var current = $(self.slides().get(idx));
      var h = current.height();
      if (!settings.variable_height) {
        self.slides().each(function(){
          if ($(this).height() > h) { h = $(this).height(); }
        });
      }
      slides_container.height(h);
    };

    self.create_timer = function() {
      var t = new Timer(
        container.find('.'+settings.timer_container_class), 
        settings, 
        self.timer_callback
      );
      return t;
    };

    self.stop_timer = function() {
      if (typeof self.cache.timer === 'object') self.cache.timer.stop();
    };

    self.toggle_timer = function() {
      var t = container.find('.'+settings.timer_container_class);
      if (t.hasClass(settings.timer_paused_class)) {
        if (typeof self.cache.timer === 'undefined') {self.cache.timer = self.create_timer();}
        self.cache.timer.start();     
      }
      else {
        if (typeof self.cache.timer === 'object') {self.cache.timer.stop();}
      }
    };

    self.init = function() {
      self.build_markup();
      if (settings.timer) {
        self.cache.timer = self.create_timer(); 
        Foundation.utils.image_loaded(this.slides().children('img'), self.cache.timer.start);
      }
      // animate = new FadeAnimation(settings, slides_container);
      // if (settings.animation === 'slide') 
      //   animate = new SlideAnimation(settings, slides_container);
      if(settings.animation === 'fade') {slides_container.addClass('fade');}
      animate = new CSSAnimation(settings, slides_container);
      container.on('click', '.'+settings.next_class, self.next);
      container.on('click', '.'+settings.prev_class, self.prev);

      container.on('click', '[data-orbit-slide]', self.link_bullet);
      container.on('click', self.toggle_timer);
      if (settings.swipe) {
        slides_container.on('touchstart.fndtn.orbit',function(e) {
          if (self.cache.animating) {return;}
          if (!e.touches) {e = e.originalEvent;}

          self.cache.start_page_x = e.touches[0].pageX;
          self.cache.start_page_y = e.touches[0].pageY;
          self.cache.start_time = (new Date()).getTime();
          self.cache.delta_x = 0;
          self.cache.is_scrolling = null;
          self.cache.direction = null;
          
          self.stop_timer(); // does not appear to prevent callback from occurring          
        })
        .on('touchmove.fndtn.orbit',function(e) {
          if (Math.abs(self.cache.delta_x) > 5) {
            e.preventDefault();
            e.stopPropagation();
          }

          if (self.cache.animating) {return;}          
          requestAnimationFrame(function(){
            if (!e.touches) { e = e.originalEvent; }

            // Ignore pinch/zoom events
            if(e.touches.length > 1 || e.scale && e.scale !== 1) return;

            self.cache.delta_x = e.touches[0].pageX - self.cache.start_page_x;

            if (self.cache.is_scrolling === null) {
              self.cache.is_scrolling = !!( self.cache.is_scrolling || Math.abs(self.cache.delta_x) < Math.abs(e.touches[0].pageY - self.cache.start_page_y) );
            }

            if (self.cache.is_scrolling) {
              return;
            }
            
            var direction = (self.cache.delta_x < 0) ? (idx+1) : (idx-1);
            if (self.cache.direction !== direction) {
              var res = self._prepare_direction(direction);
              self.cache.direction = direction;
              self.cache.dir = res[0];
              self.cache.current = res[1];
              self.cache.next = res[2];
            }

            if (settings.animation === 'slide') {
              var offset, next_offset;
              
              offset = (self.cache.delta_x / container.width()) * 100;
              if (offset >= 0) {next_offset = -(100 - offset);}
              else {next_offset = 100 + offset;}

              self.cache.current.css("transform","translate3d("+offset+"%,0,0)");
              self.cache.next.css("transform","translate3d("+next_offset+"%,0,0)");
            }
          });
        })
        .on('touchend.fndtn.orbit', function(e) {
          if (self.cache.animating) {return;}
          e.preventDefault();
          e.stopPropagation();
          setTimeout(function(){
            self._goto(self.cache.direction);
          }, 50);
        });
      }
      container.on('mouseenter.fndtn.orbit', function(e) {
        if (settings.timer && settings.pause_on_hover) {
          self.stop_timer();
        }
      })
      .on('mouseleave.fndtn.orbit', function(e) {
        if (settings.timer && settings.resume_on_mouseout) {
          self.cache.timer.start();
        }
      });
      
      $(document).on('click', '[data-orbit-link]', self.link_custom);
      $(window).on('resize', self.compute_dimensions);
      Foundation.utils.image_loaded(this.slides().children('img'), self.compute_dimensions);
      Foundation.utils.image_loaded(this.slides().children('img'), function() {
        container.prev('.preloader').css('display', 'none');
        self.update_slide_number(0);
        self.update_active_link(0);
        slides_container.trigger('ready.fndtn.orbit');
      });
    };

    self.init();
  };

  var Timer = function(el, settings, callback) {
    var self = this,
        duration = settings.timer_speed,
        progress = el.find('.'+settings.timer_progress_class),
        start, 
        timeout,
        left = -1;

    this.update_progress = function(w) {
      var new_progress = progress.clone();
      new_progress.attr('style', '');
      new_progress.css('width', w+'%');
      progress.replaceWith(new_progress);
      progress = new_progress;
    };

    this.restart = function() {
      clearTimeout(timeout);
      el.addClass(settings.timer_paused_class);
      left = -1;
      self.update_progress(0);
      self.start();
    };

    this.start = function() {
      if (!el.hasClass(settings.timer_paused_class)) {return true;}
      left = (left === -1) ? duration : left;
      el.removeClass(settings.timer_paused_class);
      start = new Date().getTime();
      progress.animate({'width': '100%'}, left, 'linear');
      timeout = setTimeout(function() {
        self.restart();
        callback();
      }, left);
      el.trigger('timer-started.fndtn.orbit')
    };

    this.stop = function() {
      if (el.hasClass(settings.timer_paused_class)) {return true;}
      clearTimeout(timeout);
      el.addClass(settings.timer_paused_class);
      var end = new Date().getTime();
      left = left - (end - start);
      var w = 100 - ((left / duration) * 100);
      self.update_progress(w);
      el.trigger('timer-stopped.fndtn.orbit');
    };
  };

  var CSSAnimation = function(settings, container) {
    var animation_end = "webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend";

    this.next = function(current, next, callback) {
      next.on(animation_end, function(e){
        next.unbind(animation_end);
        current.removeClass("active animate-out");
        next.removeClass("animate-in");
        callback();
      });
      container.children().css({
        "transform":"", 
        "transitionDuration":""
      });
      current.addClass("animate-out");
      next.addClass("animate-in");
    };

    this.prev = function(current, prev, callback) {
      prev.on(animation_end, function(e){
        prev.unbind(animation_end);
        current.removeClass("active animate-out");
        prev.removeClass("animate-in");
        callback();
      });
      current.css({"transform":"", "transitionDuration":""}).addClass("animate-out");
      prev.css({"transform":"", "transitionDuration":""}).addClass("animate-in");
    };
  };


  Foundation.libs = Foundation.libs || {};

  Foundation.libs.orbit = {
    name: 'orbit',

    version: '5.2.1',

    settings: {
      animation: 'slide',
      timer_speed: 10000,
      pause_on_hover: true,
      resume_on_mouseout: false,
      animation_speed: 500,
      stack_on_small: false,
      navigation_arrows: true,
      slide_number: true,
      slide_number_text: 'of',
      container_class: 'orbit-container',
      stack_on_small_class: 'orbit-stack-on-small',
      next_class: 'orbit-next',
      prev_class: 'orbit-prev',
      timer_container_class: 'orbit-timer',
      timer_paused_class: 'paused',
      timer_progress_class: 'orbit-progress',
      slides_container_class: 'orbit-slides-container',
      slide_selector: '*',
      bullets_container_class: 'orbit-bullets',
      bullets_active_class: 'active',
      slide_number_class: 'orbit-slide-number',
      caption_class: 'orbit-caption',
      active_slide_class: 'active',
      orbit_transition_class: 'orbit-transitioning',
      bullets: true,
      circular: true,
      timer: true,
      variable_height: false,
      swipe: true,
      before_slide_change: noop,
      after_slide_change: noop
    },

    init : function (scope, method, options) {
      var self = this;
      this.bindings(method, options);
    },

    events : function (instance) {
      var orbit_instance = new Orbit(this.S(instance), this.S(instance).data('orbit-init'));
      this.S(instance).data(self.name + '-instance', orbit_instance);
    },

    reflow : function () {
      var self = this;

      if (self.S(self.scope).is('[data-orbit]')) {
        var $el = self.S(self.scope);
        var instance = $el.data(self.name + '-instance');
        instance.compute_dimensions();
      } else {
        self.S('[data-orbit]', self.scope).each(function(idx, el) {
          var $el = self.S(el);
          var opts = self.data_options($el);
          var instance = $el.data(self.name + '-instance');
          instance.compute_dimensions();
        });
      }
    }
  };

    
}(jQuery, this, this.document));
;(function ($, window, document, undefined) {
  'use strict';

  Foundation.libs.reveal = {
    name : 'reveal',

    version : '5.2.1',

    locked : false,

    settings : {
      animation: 'fadeAndPop',
      animation_speed: 250,
      close_on_background_click: true,
      close_on_esc: true,
      dismiss_modal_class: 'close-reveal-modal',
      bg_class: 'reveal-modal-bg',
      open: function(){},
      opened: function(){},
      close: function(){},
      closed: function(){},
      bg : $('.reveal-modal-bg'),
      css : {
        open : {
          'opacity': 0,
          'visibility': 'visible',
          'display' : 'block'
        },
        close : {
          'opacity': 1,
          'visibility': 'hidden',
          'display': 'none'
        }
      }
    },

    init : function (scope, method, options) {
      $.extend(true, this.settings, method, options);
      this.bindings(method, options);
    },

    events : function (scope) {
      var self = this,
          S = self.S;

      S(this.scope)
        .off('.reveal')
        .on('click.fndtn.reveal', '[' + this.add_namespace('data-reveal-id') + ']', function (e) {
          e.preventDefault();

          if (!self.locked) {
            var element = S(this),
                ajax = element.data(self.data_attr('reveal-ajax'));

            self.locked = true;

            if (typeof ajax === 'undefined') {
              self.open.call(self, element);
            } else {
              var url = ajax === true ? element.attr('href') : ajax;

              self.open.call(self, element, {url: url});
            }
          }
        });

      S(document)
        .on('touchend.fndtn.reveal click.fndtn.reveal', this.close_targets(), function (e) {

          e.preventDefault();

          if (!self.locked) {
            var settings = S('[' + self.attr_name() + '].open').data(self.attr_name(true) + '-init'),
                bg_clicked = S(e.target)[0] === S('.' + settings.bg_class)[0];

            if (bg_clicked) {
              if (settings.close_on_background_click) {
                e.stopPropagation();
              } else {
                return;
              }
            }

            self.locked = true;
            self.close.call(self, bg_clicked ? S('[' + self.attr_name() + '].open') : S(this).closest('[' + self.attr_name() + ']'));
          }
        });

      if(S('[' + self.attr_name() + ']', this.scope).length > 0) {
        S(this.scope)
          // .off('.reveal')
          .on('open.fndtn.reveal', this.settings.open)
          .on('opened.fndtn.reveal', this.settings.opened)
          .on('opened.fndtn.reveal', this.open_video)
          .on('close.fndtn.reveal', this.settings.close)
          .on('closed.fndtn.reveal', this.settings.closed)
          .on('closed.fndtn.reveal', this.close_video);
      } else {
        S(this.scope)
          // .off('.reveal')
          .on('open.fndtn.reveal', '[' + self.attr_name() + ']', this.settings.open)
          .on('opened.fndtn.reveal', '[' + self.attr_name() + ']', this.settings.opened)
          .on('opened.fndtn.reveal', '[' + self.attr_name() + ']', this.open_video)
          .on('close.fndtn.reveal', '[' + self.attr_name() + ']', this.settings.close)
          .on('closed.fndtn.reveal', '[' + self.attr_name() + ']', this.settings.closed)
          .on('closed.fndtn.reveal', '[' + self.attr_name() + ']', this.close_video);
      }

      return true;
    },

    // PATCH #3: turning on key up capture only when a reveal window is open
    key_up_on : function (scope) {
      var self = this;

      // PATCH #1: fixing multiple keyup event trigger from single key press
      self.S('body').off('keyup.fndtn.reveal').on('keyup.fndtn.reveal', function ( event ) {
        var open_modal = self.S('[' + self.attr_name() + '].open'),
            settings = open_modal.data(self.attr_name(true) + '-init');
        // PATCH #2: making sure that the close event can be called only while unlocked,
        //           so that multiple keyup.fndtn.reveal events don't prevent clean closing of the reveal window.
        if ( settings && event.which === 27  && settings.close_on_esc && !self.locked) { // 27 is the keycode for the Escape key
          self.close.call(self, open_modal);
        }
      });

      return true;
    },

    // PATCH #3: turning on key up capture only when a reveal window is open
    key_up_off : function (scope) {
      this.S('body').off('keyup.fndtn.reveal');
      return true;
    },

    open : function (target, ajax_settings) {
      var self = this;
      if (target) {
        if (typeof target.selector !== 'undefined') {
          var modal = self.S('#' + target.data(self.data_attr('reveal-id')));
        } else {
          var modal = self.S(this.scope);

          ajax_settings = target;
        }
      } else {
        var modal = self.S(this.scope);
      }

      var settings = modal.data(self.attr_name(true) + '-init');

      if (!modal.hasClass('open')) {
        var open_modal = self.S('[' + self.attr_name() + '].open');

        if (typeof modal.data('css-top') === 'undefined') {
          modal.data('css-top', parseInt(modal.css('top'), 10))
            .data('offset', this.cache_offset(modal));
        }

        this.key_up_on(modal);    // PATCH #3: turning on key up capture only when a reveal window is open
        modal.trigger('open');

        if (open_modal.length < 1) {
          this.toggle_bg(modal);
        }

        if (typeof ajax_settings === 'string') {
          ajax_settings = {
            url: ajax_settings
          };
        }

        if (typeof ajax_settings === 'undefined' || !ajax_settings.url) {
          if (open_modal.length > 0) {
            this.hide(open_modal, settings.css.close);
          }

          this.show(modal, settings.css.open);
        } else {
          var old_success = typeof ajax_settings.success !== 'undefined' ? ajax_settings.success : null;

          $.extend(ajax_settings, {
            success: function (data, textStatus, jqXHR) {
              if ( $.isFunction(old_success) ) {
                old_success(data, textStatus, jqXHR);
              }

              modal.html(data);
              self.S(modal).foundation('section', 'reflow');

              if (open_modal.length > 0) {
                self.hide(open_modal, settings.css.close);
              }
              self.show(modal, settings.css.open);
            }
          });

          $.ajax(ajax_settings);
        }
      }
    },

    close : function (modal) {
      var modal = modal && modal.length ? modal : this.S(this.scope),
          open_modals = this.S('[' + this.attr_name() + '].open'),
          settings = modal.data(this.attr_name(true) + '-init');

      if (open_modals.length > 0) {
        this.locked = true;
        this.key_up_off(modal);   // PATCH #3: turning on key up capture only when a reveal window is open
        modal.trigger('close');
        this.toggle_bg(modal);
        this.hide(open_modals, settings.css.close, settings);
      }
    },

    close_targets : function () {
      var base = '.' + this.settings.dismiss_modal_class;

      if (this.settings.close_on_background_click) {
        return base + ', .' + this.settings.bg_class;
      }

      return base;
    },

    toggle_bg : function (modal) {
      var settings = modal.data(this.attr_name(true));

      if (this.S('.' + this.settings.bg_class).length === 0) {
        this.settings.bg = $('<div />', {'class': this.settings.bg_class})
          .appendTo('body').hide();
      }

      if (this.settings.bg.filter(':visible').length > 0) {
        this.hide(this.settings.bg);
      } else {
        this.show(this.settings.bg);
      }
    },

    show : function (el, css) {
      // is modal
      if (css) {
        var settings = el.data(this.attr_name(true) + '-init');
        if (el.parent('body').length === 0) {
          var placeholder = el.wrap('<div style="display: none;" />').parent(),
              rootElement = this.settings.rootElement || 'body';

          el.on('closed.fndtn.reveal.wrapped', function() {
            el.detach().appendTo(placeholder);
            el.unwrap().unbind('closed.fndtn.reveal.wrapped');
          });

          el.detach().appendTo(rootElement);
        }

        var animData = getAnimationData(settings.animation);
        if (!animData.animate) {
          this.locked = false;
        }
        if (animData.pop) {
          css.top = $(window).scrollTop() - el.data('offset') + 'px';
          var end_css = {
            top: $(window).scrollTop() + el.data('css-top') + 'px',
            opacity: 1
          };

          return setTimeout(function () {
            return el
              .css(css)
              .animate(end_css, settings.animation_speed, 'linear', function () {
                this.locked = false;
                el.trigger('opened');
              }.bind(this))
              .addClass('open');
          }.bind(this), settings.animation_speed / 2);
        }

        if (animData.fade) {
          css.top = $(window).scrollTop() + el.data('css-top') + 'px';
          var end_css = {opacity: 1};

          return setTimeout(function () {
            return el
              .css(css)
              .animate(end_css, settings.animation_speed, 'linear', function () {
                this.locked = false;
                el.trigger('opened');
              }.bind(this))
              .addClass('open');
          }.bind(this), settings.animation_speed / 2);
        }

        return el.css(css).show().css({opacity: 1}).addClass('open').trigger('opened');
      }

      var settings = this.settings;

      // should we animate the background?
      if (getAnimationData(settings.animation).fade) {
        return el.fadeIn(settings.animation_speed / 2);
      }

      this.locked = false;

      return el.show();
    },

    hide : function (el, css) {
      // is modal
      if (css) {
        var settings = el.data(this.attr_name(true) + '-init');
        var animData = getAnimationData(settings.animation);
        if (!animData.animate) {
          this.locked = false;
        }
        if (animData.pop) {
          var end_css = {
            top: - $(window).scrollTop() - el.data('offset') + 'px',
            opacity: 0
          };

          return setTimeout(function () {
            return el
              .animate(end_css, settings.animation_speed, 'linear', function () {
                this.locked = false;
                el.css(css).trigger('closed');
              }.bind(this))
              .removeClass('open');
          }.bind(this), settings.animation_speed / 2);
        }

        if (animData.fade) {
          var end_css = {opacity: 0};

          return setTimeout(function () {
            return el
              .animate(end_css, settings.animation_speed, 'linear', function () {
                this.locked = false;
                el.css(css).trigger('closed');
              }.bind(this))
              .removeClass('open');
          }.bind(this), settings.animation_speed / 2);
        }

        return el.hide().css(css).removeClass('open').trigger('closed');
      }

      var settings = this.settings;

      // should we animate the background?
      if (getAnimationData(settings.animation).fade) {
        return el.fadeOut(settings.animation_speed / 2);
      }

      return el.hide();
    },

    close_video : function (e) {
      var video = $('.flex-video', e.target),
          iframe = $('iframe', video);

      if (iframe.length > 0) {
        iframe.attr('data-src', iframe[0].src);
        iframe.attr('src', 'about:blank');
        video.hide();
      }
    },

    open_video : function (e) {
      var video = $('.flex-video', e.target),
          iframe = video.find('iframe');

      if (iframe.length > 0) {
        var data_src = iframe.attr('data-src');
        if (typeof data_src === 'string') {
          iframe[0].src = iframe.attr('data-src');
        } else {
          var src = iframe[0].src;
          iframe[0].src = undefined;
          iframe[0].src = src;
        }
        video.show();
      }
    },

    data_attr: function (str) {
      if (this.namespace.length > 0) {
        return this.namespace + '-' + str;
      }

      return str;
    },

    cache_offset : function (modal) {
      var offset = modal.show().height() + parseInt(modal.css('top'), 10);

      modal.hide();

      return offset;
    },

    off : function () {
      $(this.scope).off('.fndtn.reveal');
    },

    reflow : function () {}
  };

  /*
   * getAnimationData('popAndFade') // {animate: true,  pop: true,  fade: true}
   * getAnimationData('fade')       // {animate: true,  pop: false, fade: true}
   * getAnimationData('pop')        // {animate: true,  pop: true,  fade: false}
   * getAnimationData('foo')        // {animate: false, pop: false, fade: false}
   * getAnimationData(null)         // {animate: false, pop: false, fade: false}
   */
  function getAnimationData(str) {
    var fade = /fade/i.test(str);
    var pop = /pop/i.test(str);
    return {
      animate: fade || pop,
      pop: pop,
      fade: fade
    };
  }
}(jQuery, this, this.document));
/*jslint unparam: true, browser: true, indent: 2 */

;(function ($, window, document, undefined) {
  'use strict';

  Foundation.libs.tab = {
    name : 'tab',

    version : '5.2.1',

    settings : {
      active_class: 'active',
      callback : function () {},
      deep_linking: false,
      scroll_to_content: true
    },

    default_tab_hashes: [],

    init : function (scope, method, options) {
      var self = this,
          S = this.S;

      this.bindings(method, options);
      this.handle_location_hash_change();

      // Store the default active tabs which will be referenced when the
      // location hash is absent, as in the case of navigating the tabs and
      // returning to the first viewing via the browser Back button.
      S('[' + this.attr_name() + '] > dd.active > a', this.scope).each(function () {
        self.default_tab_hashes.push(this.hash);
      });
    },

    events : function () {
      var self = this,
          S = this.S;

      // Click event: tab title
      S(this.scope).off('.tab').on('click.fndtn.tab', '[' + this.attr_name() + '] > dd > a', function (e) {
        e.preventDefault();
        e.stopPropagation();
        self.toggle_active_tab(S(this).parent());
      });

      // Location hash change event
      S(window).on('hashchange.fndtn.tab', function (e) {
        e.preventDefault();
        self.handle_location_hash_change();
      });
    },

    handle_location_hash_change : function () {
      var self = this,
          S = this.S;

      S('[' + this.attr_name() + ']', this.scope).each(function () {
        var settings = S(this).data(self.attr_name(true) + '-init');
        if (settings.deep_linking) {
          // Match the location hash to a label
          var hash = self.scope.location.hash;
          if (hash != '') {
            // Check whether the location hash references a tab content div or
            // another element on the page (inside or outside the tab content div)
            var hash_element = S(hash);
            if (hash_element.hasClass('content') && hash_element.parent().hasClass('tab-content')) {
              // Tab content div
              self.toggle_active_tab($('[' + self.attr_name() + '] > dd > a[href=' + hash + ']').parent());
            } else {
              // Not the tab content div. If inside the tab content, find the
              // containing tab and toggle it as active.
              var hash_tab_container_id = hash_element.closest('.content').attr('id');
              if (hash_tab_container_id != undefined) {
                self.toggle_active_tab($('[' + self.attr_name() + '] > dd > a[href=#' + hash_tab_container_id + ']').parent(), hash);
              }
            }
          } else {
            // Reference the default tab hashes which were initialized in the init function
            for (var ind in self.default_tab_hashes) {
              self.toggle_active_tab($('[' + self.attr_name() + '] > dd > a[href=' + self.default_tab_hashes[ind] + ']').parent());
            }
          }
        }
       });
     },

    toggle_active_tab: function (tab, location_hash) {
      var S = this.S,
          tabs = tab.closest('[' + this.attr_name() + ']'),
          anchor = tab.children('a').first(),
          target_hash = '#' + anchor.attr('href').split('#')[1],
          target = S(target_hash),
          siblings = tab.siblings(),
          settings = tabs.data(this.attr_name(true) + '-init');

      // allow usage of data-tab-content attribute instead of href
      if (S(this).data(this.data_attr('tab-content'))) {
        target_hash = '#' + S(this).data(this.data_attr('tab-content')).split('#')[1];
        target = S(target_hash);
      }

      if (settings.deep_linking) {
        // Get the scroll Y position prior to moving to the hash ID
        var cur_ypos = $('body,html').scrollTop();

        // Update the location hash to preserve browser history
        // Note that the hash does not need to correspond to the
        // tab content ID anchor; it can be an ID inside or outside of the tab
        // content div.
        if (location_hash != undefined) {
          window.location.hash = location_hash;
        } else {
          window.location.hash = target_hash;
        }

        if (settings.scroll_to_content) {
          // If the user is requesting the content of a tab, then scroll to the
          // top of the title area; otherwise, scroll to the element within
          // the content area as defined by the hash value.
          if (location_hash == undefined || location_hash == target_hash) {
            tab.parent()[0].scrollIntoView();
          } else {
            S(target_hash)[0].scrollIntoView();
          }
        } else {
          // Adjust the scrollbar to the Y position prior to setting the hash
          // Only do this for the tab content anchor, otherwise there will be
          // conflicts with in-tab anchor links nested in the tab-content div
          if (location_hash == undefined || location_hash == target_hash) {
            $('body,html').scrollTop(cur_ypos);
          }
        }
      }

      // WARNING: The activation and deactivation of the tab content must
      // occur after the deep linking in order to properly refresh the browser
      // window (notably in Chrome).
      tab.addClass(settings.active_class).triggerHandler('opened');
      siblings.removeClass(settings.active_class);
      target.siblings().removeClass(settings.active_class).end().addClass(settings.active_class);
      settings.callback(tab);
      target.triggerHandler('toggled', [tab]);
      tabs.triggerHandler('toggled', [target]);
    },

    data_attr: function (str) {
      if (this.namespace.length > 0) {
        return this.namespace + '-' + str;
      }

      return str;
    },

    off : function () {},

    reflow : function () {}
  };
}(jQuery, this, this.document));
;(function ($, window, document, undefined) {
  'use strict';

  Foundation.libs.tooltip = {
    name : 'tooltip',

    version : '5.2.1',

    settings : {
      additional_inheritable_classes : [],
      tooltip_class : '.tooltip',
      append_to: 'body',
      touch_close_text: 'Tap To Close',
      disable_for_touch: false,
      hover_delay: 200,
      tip_template : function (selector, content) {
        return '<span data-selector="' + selector + '" class="'
          + Foundation.libs.tooltip.settings.tooltip_class.substring(1)
          + '">' + content + '<span class="nub"></span></span>';
      }
    },

    cache : {},

    init : function (scope, method, options) {
      Foundation.inherit(this, 'random_str');
      this.bindings(method, options);
    },

    events : function (instance) {
      var self = this,
          S = self.S;

      self.create(this.S(instance));

      $(this.scope)
        .off('.tooltip')
        .on('mouseenter.fndtn.tooltip mouseleave.fndtn.tooltip touchstart.fndtn.tooltip MSPointerDown.fndtn.tooltip',
          '[' + this.attr_name() + ']:not(a)', function (e) {
          var $this = S(this),
              settings = $.extend({}, self.settings, self.data_options($this)),
              is_touch = false;

          if (/mouse/i.test(e.type) && self.ie_touch(e)) return false;

          if ($this.hasClass('open')) {
            if (Modernizr.touch && /touchstart|MSPointerDown/i.test(e.type)) e.preventDefault();
            self.hide($this);
          } else {
            if (settings.disable_for_touch && Modernizr.touch && /touchstart|MSPointerDown/i.test(e.type)) {
              return;
            } else if(!settings.disable_for_touch && Modernizr.touch && /touchstart|MSPointerDown/i.test(e.type)) {
              e.preventDefault();
              S(settings.tooltip_class + '.open').hide();
              is_touch = true;
            }

            if (/enter|over/i.test(e.type)) {
              this.timer = setTimeout(function () {
                var tip = self.showTip($this);
              }.bind(this), self.settings.hover_delay);
            } else if (e.type === 'mouseout' || e.type === 'mouseleave') {
              clearTimeout(this.timer);
              self.hide($this);
            } else {
              self.showTip($this);
            }
          }
        })
        .on('mouseleave.fndtn.tooltip touchstart.fndtn.tooltip MSPointerDown.fndtn.tooltip', '[' + this.attr_name() + '].open', function (e) {
          if (/mouse/i.test(e.type) && self.ie_touch(e)) return false;

          if($(this).data('tooltip-open-event-type') == 'touch' && e.type == 'mouseleave') {
            return;
          }
          else if($(this).data('tooltip-open-event-type') == 'mouse' && /MSPointerDown|touchstart/i.test(e.type)) {
            self.convert_to_touch($(this));
          } else {
            self.hide($(this));
          }
        })
        .on('DOMNodeRemoved DOMAttrModified', '[' + this.attr_name() + ']:not(a)', function (e) {
          self.hide(S(this));
        });
    },

    ie_touch : function (e) {
      // How do I distinguish between IE11 and Windows Phone 8?????
      return false;
    },

    showTip : function ($target) {
      var $tip = this.getTip($target);

        return this.show($target);
    },

    getTip : function ($target) {
      var selector = this.selector($target),
          settings = $.extend({}, this.settings, this.data_options($target)),
          tip = null;

      if (selector) {
        tip = this.S('span[data-selector="' + selector + '"]' + settings.tooltip_class);
      }

      return (typeof tip === 'object') ? tip : false;
    },

    selector : function ($target) {
      var id = $target.attr('id'),
          dataSelector = $target.attr(this.attr_name()) || $target.attr('data-selector');

      if ((id && id.length < 1 || !id) && typeof dataSelector != 'string') {
        dataSelector = this.random_str(6);
        $target.attr('data-selector', dataSelector);
      }

      return (id && id.length > 0) ? id : dataSelector;
    },

    create : function ($target) {
      var self = this,
          settings = $.extend({}, this.settings, this.data_options($target)),
          tip_template = this.settings.tip_template;

      if (typeof settings.tip_template === 'string' && window.hasOwnProperty(settings.tip_template)) {
        tip_template = window[settings.tip_template];
      }

      var $tip = $(tip_template(this.selector($target), $('<div></div>').html($target.attr('title')).html())),
          classes = this.inheritable_classes($target);

      $tip.addClass(classes).appendTo(settings.append_to);

      if (Modernizr.touch) {
        $tip.append('<span class="tap-to-close">'+settings.touch_close_text+'</span>');
        $tip.on('touchstart.fndtn.tooltip MSPointerDown.fndtn.tooltip', function(e) {
          self.hide($target);
        });
      }

      $target.removeAttr('title').attr('title','');
    },

    reposition : function (target, tip, classes) {
      var width, nub, nubHeight, nubWidth, column, objPos;

      tip.css('visibility', 'hidden').show();

      width = target.data('width');
      nub = tip.children('.nub');
      nubHeight = nub.outerHeight();
      nubWidth = nub.outerHeight();

      if (this.small()) {
        tip.css({'width' : '100%' });
      } else {
        tip.css({'width' : (width) ? width : 'auto'});
      }

      objPos = function (obj, top, right, bottom, left, width) {
        return obj.css({
          'top' : (top) ? top : 'auto',
          'bottom' : (bottom) ? bottom : 'auto',
          'left' : (left) ? left : 'auto',
          'right' : (right) ? right : 'auto',
        }).end();
      };

      objPos(tip, (target.offset().top + target.outerHeight() + 10), 'auto', 'auto', target.offset().left);

      if (this.small()) {
        objPos(tip, (target.offset().top + target.outerHeight() + 10), 'auto', 'auto', 12.5, $(this.scope).width());
        tip.addClass('tip-override');
        objPos(nub, -nubHeight, 'auto', 'auto', target.offset().left);
      } else {
        var left = target.offset().left;
        if (Foundation.rtl) {
          nub.addClass('rtl');
          left = target.offset().left + target.outerWidth() - tip.outerWidth();
        }
        objPos(tip, (target.offset().top + target.outerHeight() + 10), 'auto', 'auto', left);
        tip.removeClass('tip-override');
        if (classes && classes.indexOf('tip-top') > -1) {
          if (Foundation.rtl) nub.addClass('rtl');
          objPos(tip, (target.offset().top - tip.outerHeight()), 'auto', 'auto', left)
            .removeClass('tip-override');
        } else if (classes && classes.indexOf('tip-left') > -1) {
          objPos(tip, (target.offset().top + (target.outerHeight() / 2) - (tip.outerHeight() / 2)), 'auto', 'auto', (target.offset().left - tip.outerWidth() - nubHeight))
            .removeClass('tip-override');
          nub.removeClass('rtl');
        } else if (classes && classes.indexOf('tip-right') > -1) {
          objPos(tip, (target.offset().top + (target.outerHeight() / 2) - (tip.outerHeight() / 2)), 'auto', 'auto', (target.offset().left + target.outerWidth() + nubHeight))
            .removeClass('tip-override');
          nub.removeClass('rtl');
        }
      }

      tip.css('visibility', 'visible').hide();
    },

    small : function () {
      return matchMedia(Foundation.media_queries.small).matches;
    },

    inheritable_classes : function ($target) {
      var settings = $.extend({}, this.settings, this.data_options($target)),
          inheritables = ['tip-top', 'tip-left', 'tip-bottom', 'tip-right', 'radius', 'round'].concat(settings.additional_inheritable_classes),
          classes = $target.attr('class'),
          filtered = classes ? $.map(classes.split(' '), function (el, i) {
            if ($.inArray(el, inheritables) !== -1) {
              return el;
            }
          }).join(' ') : '';

      return $.trim(filtered);
    },

    convert_to_touch : function($target) {
      var self = this,
          $tip = self.getTip($target),
          settings = $.extend({}, self.settings, self.data_options($target));

      if ($tip.find('.tap-to-close').length === 0) {
        $tip.append('<span class="tap-to-close">'+settings.touch_close_text+'</span>');
        $tip.on('click.fndtn.tooltip.tapclose touchstart.fndtn.tooltip.tapclose MSPointerDown.fndtn.tooltip.tapclose', function(e) {
          self.hide($target);
        });
      }

      $target.data('tooltip-open-event-type', 'touch');
    },

    show : function ($target) {
      var $tip = this.getTip($target);

      if ($target.data('tooltip-open-event-type') == 'touch') {
        this.convert_to_touch($target);
      }

      this.reposition($target, $tip, $target.attr('class'));
      $target.addClass('open');
      $tip.fadeIn(150);
    },

    hide : function ($target) {
      var $tip = this.getTip($target);

      $tip.fadeOut(150, function() {
        $tip.find('.tap-to-close').remove();
        $tip.off('click.fndtn.tooltip.tapclose touchstart.fndtn.tooltip.tapclose MSPointerDown.fndtn.tapclose');
        $target.removeClass('open');
      });
    },

    off : function () {
      var self = this;
      this.S(this.scope).off('.fndtn.tooltip');
      this.S(this.settings.tooltip_class).each(function (i) {
        $('[' + self.attr_name() + ']').get(i).attr('title', $(this).text());
      }).remove();
    },

    reflow : function () {}
  };
}(jQuery, this, this.document));
;(function ($, window, document, undefined) {
  'use strict';

  Foundation.libs.topbar = {
    name : 'topbar',

    version: '5.2.1',

    settings : {
      index : 0,
      sticky_class : 'sticky',
      custom_back_text: true,
      back_text: 'Back',
      is_hover: true,
      mobile_show_parent_link: false,
      scrolltop : true, // jump to top when sticky nav menu toggle is clicked
      sticky_on : 'all'
    },

    init : function (section, method, options) {
      Foundation.inherit(this, 'add_custom_rule register_media throttle');
      var self = this;

      self.register_media('topbar', 'foundation-mq-topbar');

      this.bindings(method, options);

      self.S('[' + this.attr_name() + ']', this.scope).each(function () {
        var topbar = $(this),
            settings = topbar.data(self.attr_name(true) + '-init'),
            section = self.S('section', this),
            titlebar = topbar.children().filter('ul').first();
        topbar.data('index', 0);
        var topbarContainer = topbar.parent();
        if(topbarContainer.hasClass('fixed') || self.is_sticky(topbar, topbarContainer, settings) ) {
          self.settings.sticky_class = settings.sticky_class;
          self.settings.sticky_topbar = topbar;
          topbar.data('height', topbarContainer.outerHeight());
          topbar.data('stickyoffset', topbarContainer.offset().top);
        } else {
          topbar.data('height', topbar.outerHeight());
        }

        if (!settings.assembled) self.assemble(topbar);

        if (settings.is_hover) {
          self.S('.has-dropdown', topbar).addClass('not-click');
        } else {
          self.S('.has-dropdown', topbar).removeClass('not-click');
        }

        // Pad body when sticky (scrolled) or fixed.
        self.add_custom_rule('.f-topbar-fixed { padding-top: ' + topbar.data('height') + 'px }');

        if (topbarContainer.hasClass('fixed')) {
          self.S('body').addClass('f-topbar-fixed');
        }
      });

    },

    is_sticky: function (topbar, topbarContainer, settings) {
      var sticky = topbarContainer.hasClass(settings.sticky_class);

      if (sticky && settings.sticky_on === 'all') {
        return true;
      } else if (sticky && this.small() && settings.sticky_on === 'small') {
        return true;
      } else if (sticky && this.medium() && settings.sticky_on === 'medium') {
        return true;
      } else if (sticky && this.large() && settings.sticky_on === 'large') {
        return true;
      }

      return false;
    },

    toggle: function (toggleEl) {
      var self = this;

      if (toggleEl) {
        var topbar = self.S(toggleEl).closest('[' + this.attr_name() + ']');
      } else {
        var topbar = self.S('[' + this.attr_name() + ']');
      }

      var settings = topbar.data(this.attr_name(true) + '-init');

      var section = self.S('section, .section', topbar);

      if (self.breakpoint()) {
        if (!self.rtl) {
          section.css({left: '0%'});
          $('>.name', section).css({left: '100%'});
        } else {
          section.css({right: '0%'});
          $('>.name', section).css({right: '100%'});
        }

        self.S('li.moved', section).removeClass('moved');
        topbar.data('index', 0);

        topbar
          .toggleClass('expanded')
          .css('height', '');
      }

      if (settings.scrolltop) {
        if (!topbar.hasClass('expanded')) {
          if (topbar.hasClass('fixed')) {
            topbar.parent().addClass('fixed');
            topbar.removeClass('fixed');
            self.S('body').addClass('f-topbar-fixed');
          }
        } else if (topbar.parent().hasClass('fixed')) {
          if (settings.scrolltop) {
            topbar.parent().removeClass('fixed');
            topbar.addClass('fixed');
            self.S('body').removeClass('f-topbar-fixed');

            window.scrollTo(0,0);
          } else {
              topbar.parent().removeClass('expanded');
          }
        }
      } else {
        if(self.is_sticky(topbar, topbar.parent(), settings)) {
          topbar.parent().addClass('fixed');
        }

        if(topbar.parent().hasClass('fixed')) {
          if (!topbar.hasClass('expanded')) {
            topbar.removeClass('fixed');
            topbar.parent().removeClass('expanded');
            self.update_sticky_positioning();
          } else {
            topbar.addClass('fixed');
            topbar.parent().addClass('expanded');
            self.S('body').addClass('f-topbar-fixed');
          }
        }
      }
    },

    timer : null,

    events : function (bar) {
      var self = this,
          S = this.S;

      S(this.scope)
        .off('.topbar')
        .on('click.fndtn.topbar', '[' + this.attr_name() + '] .toggle-topbar', function (e) {
          e.preventDefault();
          self.toggle(this);
        })
        .on('click.fndtn.topbar','.top-bar .top-bar-section li a[href^="#"],[' + this.attr_name() + '] .top-bar-section li a[href^="#"]',function (e) {
            var li = $(this).closest('li');
            if(self.breakpoint() && !li.hasClass('back') && !li.hasClass('has-dropdown'))
            {
            self.toggle();
            }
        })
        .on('click.fndtn.topbar', '[' + this.attr_name() + '] li.has-dropdown', function (e) {
          var li = S(this),
              target = S(e.target),
              topbar = li.closest('[' + self.attr_name() + ']'),
              settings = topbar.data(self.attr_name(true) + '-init');

          if(target.data('revealId')) {
            self.toggle();
            return;
          }

          if (self.breakpoint()) return;
          if (settings.is_hover && !Modernizr.touch) return;

          e.stopImmediatePropagation();

          if (li.hasClass('hover')) {
            li
              .removeClass('hover')
              .find('li')
              .removeClass('hover');

            li.parents('li.hover')
              .removeClass('hover');
          } else {
            li.addClass('hover');

            if (target[0].nodeName === 'A' && target.parent().hasClass('has-dropdown')) {
              e.preventDefault();
            }
          }
        })
        .on('click.fndtn.topbar', '[' + this.attr_name() + '] .has-dropdown>a', function (e) {
          if (self.breakpoint()) {

            e.preventDefault();

            var $this = S(this),
                topbar = $this.closest('[' + self.attr_name() + ']'),
                section = topbar.find('section, .section'),
                dropdownHeight = $this.next('.dropdown').outerHeight(),
                $selectedLi = $this.closest('li');

            topbar.data('index', topbar.data('index') + 1);
            $selectedLi.addClass('moved');

            if (!self.rtl) {
              section.css({left: -(100 * topbar.data('index')) + '%'});
              section.find('>.name').css({left: 100 * topbar.data('index') + '%'});
            } else {
              section.css({right: -(100 * topbar.data('index')) + '%'});
              section.find('>.name').css({right: 100 * topbar.data('index') + '%'});
            }

            topbar.css('height', $this.siblings('ul').outerHeight(true) + topbar.data('height'));
          }
        });
      
      S(window).off('.topbar').on('resize.fndtn.topbar', self.throttle(function () {
        self.resize.call(self);
      }, 50)).trigger('resize');

      S('body').off('.topbar').on('click.fndtn.topbar touchstart.fndtn.topbar', function (e) {
        var parent = S(e.target).closest('li').closest('li.hover');

        if (parent.length > 0) {
          return;
        }

        S('[' + self.attr_name() + '] li').removeClass('hover');
      });

      // Go up a level on Click
      S(this.scope).on('click.fndtn.topbar', '[' + this.attr_name() + '] .has-dropdown .back', function (e) {
        e.preventDefault();

        var $this = S(this),
            topbar = $this.closest('[' + self.attr_name() + ']'),
            section = topbar.find('section, .section'),
            settings = topbar.data(self.attr_name(true) + '-init'),
            $movedLi = $this.closest('li.moved'),
            $previousLevelUl = $movedLi.parent();

        topbar.data('index', topbar.data('index') - 1);

        if (!self.rtl) {
          section.css({left: -(100 * topbar.data('index')) + '%'});
          section.find('>.name').css({left: 100 * topbar.data('index') + '%'});
        } else {
          section.css({right: -(100 * topbar.data('index')) + '%'});
          section.find('>.name').css({right: 100 * topbar.data('index') + '%'});
        }

        if (topbar.data('index') === 0) {
          topbar.css('height', '');
        } else {
          topbar.css('height', $previousLevelUl.outerHeight(true) + topbar.data('height'));
        }

        setTimeout(function () {
          $movedLi.removeClass('moved');
        }, 300);
      });
    },

    resize : function () {
      var self = this;
      self.S('[' + this.attr_name() + ']').each(function () {
        var topbar = self.S(this),
            settings = topbar.data(self.attr_name(true) + '-init');

        var stickyContainer = topbar.parent('.' + self.settings.sticky_class);
        var stickyOffset;

        if (!self.breakpoint()) {
          var doToggle = topbar.hasClass('expanded');
          topbar
            .css('height', '')
            .removeClass('expanded')
            .find('li')
            .removeClass('hover');

            if(doToggle) {
              self.toggle(topbar);
            }
        }

        if(self.is_sticky(topbar, stickyContainer, settings)) {
          if(stickyContainer.hasClass('fixed')) {
            // Remove the fixed to allow for correct calculation of the offset.
            stickyContainer.removeClass('fixed');

            stickyOffset = stickyContainer.offset().top;
            if(self.S(document.body).hasClass('f-topbar-fixed')) {
              stickyOffset -= topbar.data('height');
            }

            topbar.data('stickyoffset', stickyOffset);
            stickyContainer.addClass('fixed');
          } else {
            stickyOffset = stickyContainer.offset().top;
            topbar.data('stickyoffset', stickyOffset);
          }
        }

      });
    },

    breakpoint : function () {
      return !matchMedia(Foundation.media_queries['topbar']).matches;
    },

    small : function () {
      return matchMedia(Foundation.media_queries['small']).matches;
    },

    medium : function () {
      return matchMedia(Foundation.media_queries['medium']).matches;
    },

    large : function () {
      return matchMedia(Foundation.media_queries['large']).matches;
    },

    assemble : function (topbar) {
      var self = this,
          settings = topbar.data(this.attr_name(true) + '-init'),
          section = self.S('section', topbar),
          titlebar = $(this).children().filter('ul').first();

      // Pull element out of the DOM for manipulation
      section.detach();

      self.S('.has-dropdown>a', section).each(function () {
        var $link = self.S(this),
            $dropdown = $link.siblings('.dropdown'),
            url = $link.attr('href');

        if (!$dropdown.find('.title.back').length) {
          if (settings.mobile_show_parent_link && url && url.length > 1) {
            var $titleLi = $('<li class="title back js-generated"><h5><a href="javascript:void(0)"></a></h5></li><li><a class="parent-link js-generated" href="' + url + '">' + $link.text() +'</a></li>');
          } else {
            var $titleLi = $('<li class="title back js-generated"><h5><a href="javascript:void(0)"></a></h5></li>');
          }
  
          // Copy link to subnav
          if (settings.custom_back_text == true) {
            $('h5>a', $titleLi).html(settings.back_text);
          } else {
            $('h5>a', $titleLi).html('&laquo; ' + $link.html());
          }
          $dropdown.prepend($titleLi);
        }
      });

      // Put element back in the DOM
      section.appendTo(topbar);

      // check for sticky
      this.sticky();

      this.assembled(topbar);
    },

    assembled : function (topbar) {
      topbar.data(this.attr_name(true), $.extend({}, topbar.data(this.attr_name(true)), {assembled: true}));
    },

    height : function (ul) {
      var total = 0,
          self = this;

      $('> li', ul).each(function () { total += self.S(this).outerHeight(true); });

      return total;
    },

    sticky : function () {
      var $window = this.S(window),
          self = this;

      this.S(window).on('scroll', function() {
        self.update_sticky_positioning();
      });
    },

    update_sticky_positioning: function() {
      var klass = '.' + this.settings.sticky_class,
          $window = this.S(window), 
          self = this;

      if (self.settings.sticky_topbar && self.is_sticky(this.settings.sticky_topbar,this.settings.sticky_topbar.parent(), this.settings)) {
        var distance = this.settings.sticky_topbar.data('stickyoffset');
        if (!self.S(klass).hasClass('expanded')) {
          if ($window.scrollTop() > (distance)) {
            if (!self.S(klass).hasClass('fixed')) {
              self.S(klass).addClass('fixed');
              self.S('body').addClass('f-topbar-fixed');
            }
          } else if ($window.scrollTop() <= distance) {
            if (self.S(klass).hasClass('fixed')) {
              self.S(klass).removeClass('fixed');
              self.S('body').removeClass('f-topbar-fixed');
            }
          }
        }
      }
    },

    off : function () {
      this.S(this.scope).off('.fndtn.topbar');
      this.S(window).off('.fndtn.topbar');
    },

    reflow : function () {}
  };
}(jQuery, this, this.document));
;(function ($, window, document, undefined) {
  'use strict';

  Foundation.libs.equalizer = {
    name : 'equalizer',

    version : '5.2.1',

    settings : {
      use_tallest: true,
      before_height_change: $.noop,
      after_height_change: $.noop
    },

    init : function (scope, method, options) {
      this.bindings(method, options);
      this.reflow();
    },

    events : function () {
      this.S(window).off('.equalizer').on('resize.fndtn.equalizer', function(e){
        this.reflow();
      }.bind(this));
    },

    equalize: function(equalizer) {
      var isStacked = false,
          vals = equalizer.find('[' + this.attr_name() + '-watch]'),
          firstTopOffset = vals.first().offset().top,
          settings = equalizer.data(this.attr_name(true)+'-init');

      if (vals.length === 0) return;
      settings.before_height_change();
      equalizer.trigger('before-height-change');
      vals.height('inherit');
      vals.each(function(){
        var el = $(this);
        if (el.offset().top !== firstTopOffset) {
          isStacked = true;
        }
      });
      if (isStacked) return;

      var heights = vals.map(function(){ return $(this).outerHeight() }).get();
      if (settings.use_tallest) {
        var max = Math.max.apply(null, heights);
        vals.css('height', max);
      } else {
        var min = Math.min.apply(null, heights);
        vals.css('height', min);
      }
      settings.after_height_change();
      equalizer.trigger('after-height-change');
    },

    reflow : function () {
      var self = this;

      this.S('[' + this.attr_name() + ']', this.scope).each(function(){
        self.equalize($(this));
      });
    }
  };
}(jQuery, this, this.document));
















/*!
	TimelineJS
	Version 2.17
	Designed and built by Zach Wise at VéritéCo

	This Source Code Form is subject to the terms of the Mozilla Public
	License, v. 2.0. If a copy of the MPL was not distributed with this
	file, You can obtain one at http://mozilla.org/MPL/2.0/.

*/

/* **********************************************
     Begin VMM.StoryJS.License.js
********************************************** */

/*!
	StoryJS
	Designed and built by Zach Wise at VéritéCo

	This Source Code Form is subject to the terms of the Mozilla Public
	License, v. 2.0. If a copy of the MPL was not distributed with this
	file, You can obtain one at http://mozilla.org/MPL/2.0/.
*/

/* **********************************************
     Begin VMM.js
********************************************** */

/**
	* VéritéCo JS Core
	* Designed and built by Zach Wise at VéritéCo zach@verite.co

	* This Source Code Form is subject to the terms of the Mozilla Public
	* License, v. 2.0. If a copy of the MPL was not distributed with this
	* file, You can obtain one at http://mozilla.org/MPL/2.0/.

*/


/*	Simple JavaScript Inheritance
	By John Resig http://ejohn.org/
	MIT Licensed.
================================================== */

(function() {
	var initializing = false,
	fnTest = /xyz/.test(function() {
		xyz;
		}) ? /\b_super\b/: /.*/;
		// The base Class implementation (does nothing)
	this.Class = function() {};

    // Create a new Class that inherits from this class
	Class.extend = function(prop) {
		var _super = this.prototype;

        // Instantiate a base class (but only create the instance,
        // don't run the init constructor)
		initializing = true;
		var prototype = new this();
		initializing = false;

        // Copy the properties over onto the new prototype
		for (var name in prop) {
            // Check if we're overwriting an existing function
			prototype[name] = typeof prop[name] == "function" &&
			typeof _super[name] == "function" && fnTest.test(prop[name]) ?
			(function(name, fn) {
				return function() {
					var tmp = this._super;

					// Add a new ._super() method that is the same method
					// but on the super-class
					this._super = _super[name];

					// The method only need to be bound temporarily, so we
					// remove it when we're done executing
					var ret = fn.apply(this, arguments);
					this._super = tmp;

					return ret;
				};
			})(name, prop[name]) :
			prop[name];
		}

		// The dummy class constructor
		function Class() {
			// All construction is actually done in the init method
			if (!initializing && this.init)
			this.init.apply(this, arguments);
		}

		// Populate our constructed prototype object
		Class.prototype = prototype;

		// Enforce the constructor to be what we expect
		Class.prototype.constructor = Class;

		// And make this class extendable
		Class.extend = arguments.callee;

		return Class;
    };
})();

/*	Access to the Global Object
	access the global object without hard-coding the identifier window
================================================== */
var global = (function () {
   return this || (1,eval)('this');
}());

/* VMM
================================================== */
if (typeof VMM == 'undefined') {

	/* Main Scope Container
	================================================== */
	//var VMM = {};
	var VMM = Class.extend({});

	/* Debug
	================================================== */
	VMM.debug = true;

	/* Master Config
	================================================== */

	VMM.master_config = ({

		init: function() {
			return this;
		},

		sizes: {
			api: {
				width:			0,
				height:			0
			}
		},

		vp:				"Pellentesque nibh felis, eleifend id, commodo in, interdum vitae, leo",

		api_keys_master: {
			flickr:		"RAIvxHY4hE/Elm5cieh4X5ptMyDpj7MYIxziGxi0WGCcy1s+yr7rKQ==",
			//google:		"jwNGnYw4hE9lmAez4ll0QD+jo6SKBJFknkopLS4FrSAuGfIwyj57AusuR0s8dAo=",
			google:		"uQKadH1VMlCsp560gN2aOiMz4evWkl1s34yryl3F/9FJOsn+/948CbBUvKLN46U=",
			twitter:	""
		},

		timers: {
			api:			7000
		},

		api:	{
			pushques:		[]

		},

		twitter: {
			active:			false,
			array:			[],
			api_loaded:		false,
			que:			[]
		},

		flickr: {
			active:			false,
			array:			[],
			api_loaded:		false,
			que:			[]
		},

		youtube: {
			active:			false,
			array:			[],
			api_loaded:		false,
			que:			[]
		},

		vimeo: {
			active:			false,
			array:			[],
			api_loaded:		false,
			que:			[]
		},

		vine: {
			active:			false,
			array:			[],
			api_loaded:		false,
			que:			[]
		},

		webthumb: {
			active:			false,
			array:			[],
			api_loaded:		false,
			que:			[]
		},

		googlemaps: {
			active:			false,
			map_active:		false,
			places_active:	false,
			array:			[],
			api_loaded:		false,
			que:			[]
		},

		googledocs: {
			active:			false,
			array:			[],
			api_loaded:		false,
			que:			[]
		},

		googleplus: {
			active:			false,
			array:			[],
			api_loaded:		false,
			que:			[]
		},

		wikipedia: {
			active:			false,
			array:			[],
			api_loaded:		false,
			que:			[],
			tries:			0
		},

		soundcloud: {
			active:			false,
			array:			[],
			api_loaded:		false,
			que:			[]
		}

	}).init();

	//VMM.createElement(tag, value, cName, attrs, styles);
	VMM.createElement = function(tag, value, cName, attrs, styles) {

		var ce = "";

		if (tag != null && tag != "") {

			// TAG
			ce += "<" + tag;
			if (cName != null && cName != "") {
				ce += " class='" + cName + "'";
			};

			if (attrs != null && attrs != "") {
				ce += " " + attrs;
			};

			if (styles != null && styles != "") {
				ce += " style='" + styles + "'";
			};

			ce += ">";

			if (value != null && value != "") {
				ce += value;
			}

			// CLOSE TAG
			ce = ce + "</" + tag + ">";
		}

		return ce;

    };

	VMM.createMediaElement = function(media, caption, credit) {

		var ce = "";

		var _valid = false;

		ce += "<div class='media'>";

		if (media != null && media != "") {

			valid = true;

			ce += "<img src='" + media + "'>";

			// CREDIT
			if (credit != null && credit != "") {
				ce += VMM.createElement("div", credit, "credit");
			}

			// CAPTION
			if (caption != null && caption != "") {
				ce += VMM.createElement("div", caption, "caption");
			}

		}

		ce += "</div>";

		return ce;

    };

	// Hide URL Bar for iOS and Android by Scott Jehl
	// https://gist.github.com/1183357

	VMM.hideUrlBar = function () {
		var win = window,
			doc = win.document;

		// If there's a hash, or addEventListener is undefined, stop here
		if( !location.hash || !win.addEventListener ){

			//scroll to 1
			window.scrollTo( 0, 1 );
			var scrollTop = 1,

			//reset to 0 on bodyready, if needed
			bodycheck = setInterval(function(){
				if( doc.body ){
					clearInterval( bodycheck );
					scrollTop = "scrollTop" in doc.body ? doc.body.scrollTop : 1;
					win.scrollTo( 0, scrollTop === 1 ? 0 : 1 );
				}
			}, 15 );

			win.addEventListener( "load", function(){
				setTimeout(function(){
					//reset to hide addr bar at onload
					win.scrollTo( 0, scrollTop === 1 ? 0 : 1 );
				}, 0);
			}, false );
		}
	};


}

/* Trace (console.log)
================================================== */
function trace( msg ) {
	if (VMM.debug) {
		if (window.console) {
			console.log(msg);
		} else if ( typeof( jsTrace ) != 'undefined' ) {
			jsTrace.send( msg );
		} else {
			//alert(msg);
		}
	}
}

/*	Array Remove - By John Resig (MIT Licensed)
	http://ejohn.org/blog/javascript-array-remove/
================================================== */
Array.prototype.remove = function(from, to) {
  var rest = this.slice((to || from) + 1 || this.length);
  this.length = from < 0 ? this.length + from : from;
  return this.push.apply(this, rest);
}

/* Extending Date to include Week
================================================== */
Date.prototype.getWeek = function() {
	var onejan = new Date(this.getFullYear(),0,1);
	return Math.ceil((((this - onejan) / 86400000) + onejan.getDay()+1)/7);
}

/* Extending Date to include Day of Year
================================================== */
Date.prototype.getDayOfYear = function() {
	var onejan = new Date(this.getFullYear(),0,1);
	return Math.ceil((this - onejan) / 86400000);
}

/* A MORE SPECIFIC TYPEOF();
//	http://rolandog.com/archives/2007/01/18/typeof-a-more-specific-typeof/
================================================== */
// type.of()
var is={
	Null:function(a){return a===null;},
	Undefined:function(a){return a===undefined;},
	nt:function(a){return(a===null||a===undefined);},
	Function:function(a){return(typeof(a)==="function")?a.constructor.toString().match(/Function/)!==null:false;},
	String:function(a){return(typeof(a)==="string")?true:(typeof(a)==="object")?a.constructor.toString().match(/string/i)!==null:false;},
	Array:function(a){return(typeof(a)==="object")?a.constructor.toString().match(/array/i)!==null||a.length!==undefined:false;},
	Boolean:function(a){return(typeof(a)==="boolean")?true:(typeof(a)==="object")?a.constructor.toString().match(/boolean/i)!==null:false;},
	Date:function(a){return(typeof(a)==="date")?true:(typeof(a)==="object")?a.constructor.toString().match(/date/i)!==null:false;},
	HTML:function(a){return(typeof(a)==="object")?a.constructor.toString().match(/html/i)!==null:false;},
	Number:function(a){return(typeof(a)==="number")?true:(typeof(a)==="object")?a.constructor.toString().match(/Number/)!==null:false;},
	Object:function(a){return(typeof(a)==="object")?a.constructor.toString().match(/object/i)!==null:false;},
	RegExp:function(a){return(typeof(a)==="function")?a.constructor.toString().match(/regexp/i)!==null:false;}
};
var type={
	of:function(a){
		for(var i in is){
			if(is[i](a)){
				return i.toLowerCase();
			}
		}
	}
};





/* **********************************************
     Begin VMM.Library.js
********************************************** */

/*	* LIBRARY ABSTRACTION
================================================== */
if(typeof VMM != 'undefined') {

	VMM.modal = function(elem, opt) {
		if( typeof( jQuery ) != 'undefined' ){
			jQuery(elem).fancybox(opt);
		}
	};

	VMM.smoothScrollTo = function(elem, duration, ease) {
		if( typeof( jQuery ) != 'undefined' ){
			var _ease		= "easein",
				_duration	= 1000;

			if (duration != null) {
				if (duration < 1) {
					_duration = 1;
				} else {
					_duration = Math.round(duration);
				}

			}

			if (ease != null && ease != "") {
				_ease = ease;
			}

			if (jQuery(window).scrollTop() != VMM.Lib.offset(elem).top) {
				VMM.Lib.animate('html,body', _duration, _ease, {scrollTop: VMM.Lib.offset(elem).top})
			}

		}

	};

	VMM.attachElement = function(element, content) {
		if( typeof( jQuery ) != 'undefined' ){
			jQuery(element).html(content);
		}

	};

	VMM.appendElement = function(element, content) {

		if( typeof( jQuery ) != 'undefined' ){
			jQuery(element).append(content);
		}

	};

	VMM.getHTML = function(element) {
		var e;
		if( typeof( jQuery ) != 'undefined' ){
			e = jQuery(element).html();
			return e;
		}

	};

	VMM.getElement = function(element, p) {
		var e;
		if( typeof( jQuery ) != 'undefined' ){
			if (p) {
				e = jQuery(element).parent().get(0);

			} else {
				e = jQuery(element).get(0);
			}
			return e;
		}

	};

	VMM.bindEvent = function(element, the_handler, the_event_type, event_data) {
		var e;
		var _event_type = "click";
		var _event_data = {};

		if (the_event_type != null && the_event_type != "") {
			_event_type = the_event_type;
		}

		if (_event_data != null && _event_data != "") {
			_event_data = event_data;
		}

		if( typeof( jQuery ) != 'undefined' ){
			jQuery(element).bind(_event_type, _event_data, the_handler);

			//return e;
		}

	};

	VMM.unbindEvent = function(element, the_handler, the_event_type) {
		var e;
		var _event_type = "click";
		var _event_data = {};

		if (the_event_type != null && the_event_type != "") {
			_event_type = the_event_type;
		}

		if( typeof( jQuery ) != 'undefined' ){
			jQuery(element).unbind(_event_type, the_handler);

			//return e;
		}

	};

	VMM.fireEvent = function(element, the_event_type, the_data) {
		var e;
		var _event_type = "click";
		var _data = [];

		if (the_event_type != null && the_event_type != "") {
			_event_type = the_event_type;
		}
		if (the_data != null && the_data != "") {
			_data = the_data;
		}

		if( typeof( jQuery ) != 'undefined' ){
			jQuery(element).trigger(_event_type, _data);

			//return e;
		}

	};

	VMM.getJSON = function(url, data, callback) {
		if( typeof( jQuery ) != 'undefined' ){
			jQuery.ajaxSetup({
			     timeout: VMM.Timeline.Config.ajax_timeout
			});
			/* CHECK FOR IE
			================================================== */
			if ( VMM.Browser.browser == "Explorer" && parseInt(VMM.Browser.version, 10) >= 7 && window.XDomainRequest) {
				trace("IE JSON");
				var ie_url = url;
				if (ie_url.match('^http://')){
					return jQuery.getJSON(ie_url, data, callback);
				} else if (ie_url.match('^https://')) {
					ie_url = ie_url.replace("https://","http://");
					return jQuery.getJSON(ie_url, data, callback);
				} else {
					return jQuery.getJSON(url, data, callback);
				}

			} else {
				return jQuery.getJSON(url, data, callback);

			}
		}
	}

	VMM.parseJSON = function(the_json) {
		if( typeof( jQuery ) != 'undefined' ){
			return jQuery.parseJSON(the_json);
		}
	}

	// ADD ELEMENT AND RETURN IT
	VMM.appendAndGetElement = function(append_to_element, tag, cName, content) {
		var e,
			_tag		= "<div>",
			_class		= "",
			_content	= "",
			_id			= "";

		if (tag != null && tag != "") {
			_tag = tag;
		}

		if (cName != null && cName != "") {
			_class = cName;
		}

		if (content != null && content != "") {
			_content = content;
		}

		if( typeof( jQuery ) != 'undefined' ){

			e = jQuery(tag);

			e.addClass(_class);
			e.html(_content);

			jQuery(append_to_element).append(e);

		}

		return e;

	};

	VMM.Lib = {

		init: function() {
			return this;
		},

		hide: function(element, duration) {
			if (duration != null && duration != "") {
				if( typeof( jQuery ) != 'undefined' ){
					jQuery(element).hide(duration);
				}
			} else {
				if( typeof( jQuery ) != 'undefined' ){
					jQuery(element).hide();
				}
			}

		},

		remove: function(element) {
			if( typeof( jQuery ) != 'undefined' ){
				jQuery(element).remove();
			}
		},

		detach: function(element) {
			if( typeof( jQuery ) != 'undefined' ){
				jQuery(element).detach();
			}
		},

		append: function(element, value) {
			if( typeof( jQuery ) != 'undefined' ){
				jQuery(element).append(value);
			}
		},

		prepend: function(element, value) {
			if( typeof( jQuery ) != 'undefined' ){
				jQuery(element).prepend(value);
			}
		},

		show: function(element, duration) {
			if (duration != null && duration != "") {
				if( typeof( jQuery ) != 'undefined' ){
					jQuery(element).show(duration);
				}
			} else {
				if( typeof( jQuery ) != 'undefined' ){
					jQuery(element).show();
				}
			}

		},

		load: function(element, callback_function, event_data) {
			var _event_data = {elem:element}; // return element by default
			if (_event_data != null && _event_data != "") {
				_event_data = event_data;
			}
			if( typeof( jQuery ) != 'undefined' ){
				jQuery(element).load(_event_data, callback_function);
			}
		},

		addClass: function(element, cName) {
			if( typeof( jQuery ) != 'undefined' ){
				jQuery(element).addClass(cName);
			}
		},

		removeClass: function(element, cName) {
			if( typeof( jQuery ) != 'undefined' ){
				jQuery(element).removeClass(cName);
			}
		},

		attr: function(element, aName, value) {
			if (value != null && value != "") {
				if( typeof( jQuery ) != 'undefined' ){
					jQuery(element).attr(aName, value);
				}
			} else {
				if( typeof( jQuery ) != 'undefined' ){
					return jQuery(element).attr(aName);
				}
			}
		},

		prop: function(element, aName, value) {
			if (typeof jQuery == 'undefined' || !/[1-9]\.[3-9].[1-9]/.test(jQuery.fn.jquery)) {
			    VMM.Lib.attribute(element, aName, value);
			} else {
				jQuery(element).prop(aName, value);
			}
		},

		attribute: function(element, aName, value) {

			if (value != null && value != "") {
				if( typeof( jQuery ) != 'undefined' ){
					jQuery(element).attr(aName, value);
				}
			} else {
				if( typeof( jQuery ) != 'undefined' ){
					return jQuery(element).attr(aName);
				}
			}
		},

		visible: function(element, show) {
			if (show != null) {
				if( typeof( jQuery ) != 'undefined' ){
					if (show) {
						jQuery(element).show(0);
					} else {
						jQuery(element).hide(0);
					}
				}
			} else {
				if( typeof( jQuery ) != 'undefined' ){
					if ( jQuery(element).is(':visible')){
						return true;
					} else {
						return false;
					}
				}
			}
		},

		css: function(element, prop, value) {

			if (value != null && value != "") {
				if( typeof( jQuery ) != 'undefined' ){
					jQuery(element).css(prop, value);
				}
			} else {
				if( typeof( jQuery ) != 'undefined' ){
					return jQuery(element).css(prop);
				}
			}
		},

		cssmultiple: function(element, propval) {

			if( typeof( jQuery ) != 'undefined' ){
				return jQuery(element).css(propval);
			}
		},

		offset: function(element) {
			var p;
			if( typeof( jQuery ) != 'undefined' ){
				p = jQuery(element).offset();
			}
			return p;
		},

		position: function(element) {
			var p;
			if( typeof( jQuery ) != 'undefined' ){
				p = jQuery(element).position();
			}
			return p;
		},

		width: function(element, s) {
			if (s != null && s != "") {
				if( typeof( jQuery ) != 'undefined' ){
					jQuery(element).width(s);
				}
			} else {
				if( typeof( jQuery ) != 'undefined' ){
					return jQuery(element).width();
				}
			}
		},

		height: function(element, s) {
			if (s != null && s != "") {
				if( typeof( jQuery ) != 'undefined' ){
					jQuery(element).height(s);
				}
			} else {
				if( typeof( jQuery ) != 'undefined' ){
					return jQuery(element).height();
				}
			}
		},

		toggleClass: function(element, cName) {
			if( typeof( jQuery ) != 'undefined' ){
				jQuery(element).toggleClass(cName);
			}
		},

		each:function(element, return_function) {
			if( typeof( jQuery ) != 'undefined' ){
				jQuery(element).each(return_function);
			}

		},

		html: function(element, str) {
			var e;
			if( typeof( jQuery ) != 'undefined' ){
				e = jQuery(element).html();
				return e;
			}

			if (str != null && str != "") {
				if( typeof( jQuery ) != 'undefined' ){
					jQuery(element).html(str);
				}
			} else {
				var e;
				if( typeof( jQuery ) != 'undefined' ){
					e = jQuery(element).html();
					return e;
				}
			}

		},

		find: function(element, selec) {
			if( typeof( jQuery ) != 'undefined' ){
				return jQuery(element).find(selec);
			}
		},

		stop: function(element) {
			if( typeof( jQuery ) != 'undefined' ){
				jQuery(element).stop();
			}
		},

		delay_animate: function(delay, element, duration, ease, att, callback_function) {
			if (VMM.Browser.device == "mobile" || VMM.Browser.device == "tablet") {
				var _tdd		= Math.round((duration/1500)*10)/10,
					__duration	= _tdd + 's';

				VMM.Lib.css(element, '-webkit-transition', 'all '+ __duration + ' ease');
				VMM.Lib.css(element, '-moz-transition', 'all '+ __duration + ' ease');
				VMM.Lib.css(element, '-o-transition', 'all '+ __duration + ' ease');
				VMM.Lib.css(element, '-ms-transition', 'all '+ __duration + ' ease');
				VMM.Lib.css(element, 'transition', 'all '+ __duration + ' ease');
				VMM.Lib.cssmultiple(element, _att);
			} else {
				if( typeof( jQuery ) != 'undefined' ){
					jQuery(element).delay(delay).animate(att, {duration:duration, easing:ease} );
				}
			}

		},

		animate: function(element, duration, ease, att, que, callback_function) {

			var _ease		= "easein",
				_que		= false,
				_duration	= 1000,
				_att		= {};

			if (duration != null) {
				if (duration < 1) {
					_duration = 1;
				} else {
					_duration = Math.round(duration);
				}

			}

			if (ease != null && ease != "") {
				_ease = ease;
			}

			if (que != null && que != "") {
				_que = que;
			}


			if (att != null) {
				_att = att
			} else {
				_att = {opacity: 0}
			}


			if (VMM.Browser.device == "mobile" || VMM.Browser.device == "tablet") {

				var _tdd		= Math.round((_duration/1500)*10)/10,
					__duration	= _tdd + 's';

				_ease = " cubic-bezier(0.33, 0.66, 0.66, 1)";
				//_ease = " ease-in-out";
				for (x in _att) {
					if (Object.prototype.hasOwnProperty.call(_att, x)) {
						trace(x + " to " + _att[x]);
						VMM.Lib.css(element, '-webkit-transition',  x + ' ' + __duration + _ease);
						VMM.Lib.css(element, '-moz-transition', x + ' ' + __duration + _ease);
						VMM.Lib.css(element, '-o-transition', x + ' ' + __duration + _ease);
						VMM.Lib.css(element, '-ms-transition', x + ' ' + __duration + _ease);
						VMM.Lib.css(element, 'transition', x + ' ' + __duration + _ease);
					}
				}

				VMM.Lib.cssmultiple(element, _att);

			} else {
				if( typeof( jQuery ) != 'undefined' ){
					if (callback_function != null && callback_function != "") {
						jQuery(element).animate(_att, {queue:_que, duration:_duration, easing:_ease, complete:callback_function} );
					} else {
						jQuery(element).animate(_att, {queue:_que, duration:_duration, easing:_ease} );
					}
				}
			}

		}

	}
}

if( typeof( jQuery ) != 'undefined' ){

	/*	XDR AJAX EXTENTION FOR jQuery
		https://github.com/jaubourg/ajaxHooks/blob/master/src/ajax/xdr.js
	================================================== */
	(function( jQuery ) {
		if ( window.XDomainRequest ) {
			jQuery.ajaxTransport(function( s ) {
				if ( s.crossDomain && s.async ) {
					if ( s.timeout ) {
						s.xdrTimeout = s.timeout;
						delete s.timeout;
					}
					var xdr;
					return {
						send: function( _, complete ) {
							function callback( status, statusText, responses, responseHeaders ) {
								xdr.onload = xdr.onerror = xdr.ontimeout = jQuery.noop;
								xdr = undefined;
								complete( status, statusText, responses, responseHeaders );
							}
							xdr = new XDomainRequest();
							xdr.open( s.type, s.url );
							xdr.onload = function() {
								callback( 200, "OK", { text: xdr.responseText }, "Content-Type: " + xdr.contentType );
							};
							xdr.onerror = function() {
								callback( 404, "Not Found" );
							};
							if ( s.xdrTimeout ) {
								xdr.ontimeout = function() {
									callback( 0, "timeout" );
								};
								xdr.timeout = s.xdrTimeout;
							}
							xdr.send( ( s.hasContent && s.data ) || null );
						},
						abort: function() {
							if ( xdr ) {
								xdr.onerror = jQuery.noop();
								xdr.abort();
							}
						}
					};
				}
			});
		}
	})( jQuery );

	/*	jQuery Easing v1.3
		http://gsgd.co.uk/sandbox/jquery/easing/
	================================================== */
	jQuery.easing['jswing'] = jQuery.easing['swing'];

	jQuery.extend( jQuery.easing, {
		def: 'easeOutQuad',
		swing: function (x, t, b, c, d) {
			//alert(jQuery.easing.default);
			return jQuery.easing[jQuery.easing.def](x, t, b, c, d);
		},
		easeInExpo: function (x, t, b, c, d) {
			return (t==0) ? b : c * Math.pow(2, 10 * (t/d - 1)) + b;
		},
		easeOutExpo: function (x, t, b, c, d) {
			return (t==d) ? b+c : c * (-Math.pow(2, -10 * t/d) + 1) + b;
		},
		easeInOutExpo: function (x, t, b, c, d) {
			if (t==0) return b;
			if (t==d) return b+c;
			if ((t/=d/2) < 1) return c/2 * Math.pow(2, 10 * (t - 1)) + b;
			return c/2 * (-Math.pow(2, -10 * --t) + 2) + b;
		},
		easeInQuad: function (x, t, b, c, d) {
			return c*(t/=d)*t + b;
		},
		easeOutQuad: function (x, t, b, c, d) {
			return -c *(t/=d)*(t-2) + b;
		},
		easeInOutQuad: function (x, t, b, c, d) {
			if ((t/=d/2) < 1) return c/2*t*t + b;
			return -c/2 * ((--t)*(t-2) - 1) + b;
		}
	});
}


/* **********************************************
     Begin VMM.Browser.js
********************************************** */

/*	* DEVICE AND BROWSER DETECTION
================================================== */
if(typeof VMM != 'undefined' && typeof VMM.Browser == 'undefined') {

	VMM.Browser = {
		init: function () {
			this.browser = this.searchString(this.dataBrowser) || "An unknown browser";
			this.version = this.searchVersion(navigator.userAgent)
				|| this.searchVersion(navigator.appVersion)
				|| "an unknown version";
			this.OS = this.searchString(this.dataOS) || "an unknown OS";
			this.device = this.searchDevice(navigator.userAgent);
			this.orientation = this.searchOrientation(window.orientation);
		},
		searchOrientation: function(orientation) {
			var orient = "";
			if ( orientation == 0  || orientation == 180) {
				orient = "portrait";
			} else if ( orientation == 90 || orientation == -90) {
				orient = "landscape";
			} else {
				orient = "normal";
			}
			return orient;
		},
		searchDevice: function(d) {
			var device = "";
			if (d.match(/Android/i) || d.match(/iPhone|iPod/i)) {
				device = "mobile";
			} else if (d.match(/iPad/i)) {
				device = "tablet";
			} else if (d.match(/BlackBerry/i) || d.match(/IEMobile/i)) {
				device = "other mobile";
			} else {
				device = "desktop";
			}
			return device;
		},
		searchString: function (data) {
			for (var i=0;i<data.length;i++)	{
				var dataString	= data[i].string,
					dataProp	= data[i].prop;

				this.versionSearchString = data[i].versionSearch || data[i].identity;

				if (dataString) {
					if (dataString.indexOf(data[i].subString) != -1) {
						return data[i].identity;
					}
				} else if (dataProp) {
					return data[i].identity;
				}
			}
		},
		searchVersion: function (dataString) {
			var index = dataString.indexOf(this.versionSearchString);
			if (index == -1) return;
			return parseFloat(dataString.substring(index+this.versionSearchString.length+1));
		},
		dataBrowser: [
			{
				string: navigator.userAgent,
				subString: "Chrome",
				identity: "Chrome"
			},
			{ 	string: navigator.userAgent,
				subString: "OmniWeb",
				versionSearch: "OmniWeb/",
				identity: "OmniWeb"
			},
			{
				string: navigator.vendor,
				subString: "Apple",
				identity: "Safari",
				versionSearch: "Version"
			},
			{
				prop: window.opera,
				identity: "Opera",
				versionSearch: "Version"
			},
			{
				string: navigator.vendor,
				subString: "iCab",
				identity: "iCab"
			},
			{
				string: navigator.vendor,
				subString: "KDE",
				identity: "Konqueror"
			},
			{
				string: navigator.userAgent,
				subString: "Firefox",
				identity: "Firefox"
			},
			{
				string: navigator.vendor,
				subString: "Camino",
				identity: "Camino"
			},
			{		// for newer Netscapes (6+)
				string: navigator.userAgent,
				subString: "Netscape",
				identity: "Netscape"
			},
			{
				string: navigator.userAgent,
				subString: "MSIE",
				identity: "Explorer",
				versionSearch: "MSIE"
			},
			{
				string: navigator.userAgent,
				subString: "Gecko",
				identity: "Mozilla",
				versionSearch: "rv"
			},
			{ 		// for older Netscapes (4-)
				string: navigator.userAgent,
				subString: "Mozilla",
				identity: "Netscape",
				versionSearch: "Mozilla"
			}
		],
		dataOS : [
			{
				string: navigator.platform,
				subString: "Win",
				identity: "Windows"
			},
			{
				string: navigator.platform,
				subString: "Mac",
				identity: "Mac"
			},
			{
				string: navigator.userAgent,
				subString: "iPhone",
				identity: "iPhone/iPod"
		    },
			{
				string: navigator.userAgent,
				subString: "iPad",
				identity: "iPad"
		    },
			{
				string: navigator.platform,
				subString: "Linux",
				identity: "Linux"
			}
		]

	}
	VMM.Browser.init();
}

/* **********************************************
     Begin VMM.FileExtention.js
********************************************** */

/*	* File Extention
================================================== */
if(typeof VMM != 'undefined' && typeof VMM.FileExtention == 'undefined') {
	VMM.FileExtention = {
		googleDocType: function(url) {
			var fileName			= url.replace(/\s\s*$/, ''),
				fileExtension		= "",
				validFileExtensions = ["DOC","DOCX","XLS","XLSX","PPT","PPTX","PDF","PAGES","AI","PSD","TIFF","DXF","SVG","EPS","PS","TTF","XPS","ZIP","RAR"],
				flag				= false;

			fileExtension = fileName.substr(fileName.length - 5, 5);

			for (var i = 0; i < validFileExtensions.length; i++) {
				if (fileExtension.toLowerCase().match(validFileExtensions[i].toString().toLowerCase()) || fileName.match("docs.google.com") ) {
					flag = true;
				}
			}
			return flag;
		}
	}
}

/* **********************************************
     Begin VMM.Date.js
********************************************** */

/*	* Utilities and Useful Functions
================================================== */
if(typeof VMM != 'undefined' && typeof VMM.Date == 'undefined') {

	VMM.Date = ({

		init: function() {
			return this;
		},

		dateformats: {
			year: "yyyy",
			month_short: "mmm",
			month: "mmmm yyyy",
			full_short: "mmm d",
			full: "mmmm d',' yyyy",
			time_short: "h:MM:ss TT",
			time_no_seconds_short: "h:MM TT",
			time_no_seconds_small_date: "h:MM TT'<br/><small>'mmmm d',' yyyy'</small>'",
			full_long: "mmm d',' yyyy 'at' hh:MM TT",
			full_long_small_date: "hh:MM TT'<br/><small>mmm d',' yyyy'</small>'"
		},

		month: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
		month_abbr: ["Jan.", "Feb.", "March", "April", "May", "June", "July", "Aug.", "Sept.", "Oct.", "Nov.", "Dec."],
		day: ["Sunday","Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
		day_abbr: ["Sun.", "Mon.", "Tues.", "Wed.", "Thurs.", "Fri.", "Sat."],
		hour: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
		hour_suffix: ["am"],

		//B.C.
		bc_format: {
			year: "yyyy",
			month_short: "mmm",
			month: "mmmm yyyy",
			full_short: "mmm d",
			full: "mmmm d',' yyyy",
			time_no_seconds_short: "h:MM TT",
			time_no_seconds_small_date: "dddd', 'h:MM TT'<br/><small>'mmmm d',' yyyy'</small>'",
			full_long: "dddd',' mmm d',' yyyy 'at' hh:MM TT",
			full_long_small_date: "hh:MM TT'<br/><small>'dddd',' mmm d',' yyyy'</small>'"
		},

		setLanguage: function(lang) {
			trace("SET DATE LANGUAGE");
			VMM.Date.dateformats		=	lang.dateformats;
			VMM.Date.month				=	lang.date.month;
			VMM.Date.month_abbr			=	lang.date.month_abbr;
			VMM.Date.day				=	lang.date.day;
			VMM.Date.day_abbr			=	lang.date.day_abbr;
			dateFormat.i18n.dayNames	=	lang.date.day_abbr.concat(lang.date.day);
			dateFormat.i18n.monthNames	=	lang.date.month_abbr.concat(lang.date.month);
		},

		parse: function(d, precision) {
			"use strict";
			var date,
				date_array,
				time_array,
				time_parse,
				p = {
					year: 			false,
					month: 			false,
					day: 			false,
					hour: 			false,
					minute: 		false,
					second: 		false,
					millisecond: 	false
				};

			if (type.of(d) == "date") {
				trace("DEBUG THIS, ITs A DATE");
				date = d;
			} else {
				date = new Date(0, 0, 1, 0, 0, 0, 0);

				if ( d.match(/,/gi) ) {
					date_array = d.split(",");
					for(var i = 0; i < date_array.length; i++) {
						date_array[i] = parseInt(date_array[i], 10);
					}
					if (date_array[0]) {
						date.setFullYear(date_array[0]);
						p.year = true;
					}
					if (date_array[1]) {
						date.setMonth(date_array[1] - 1);
						p.month = true;
					}
					if (date_array[2]) {
						date.setDate(date_array[2]);
						p.day = true;
					}
					if (date_array[3]) {
						date.setHours(date_array[3]);
						p.hour = true;
					}
					if (date_array[4]) {
						date.setMinutes(date_array[4]);
						p.minute = true;
					}
					if (date_array[5]) {
						date.setSeconds(date_array[5]);
						if (date_array[5] >= 1) {
							p.second = true;
						}
					}
					if (date_array[6]) {
						date.setMilliseconds(date_array[6]);
						if (date_array[6] >= 1) {
							p.millisecond = true;
						}
					}
				} else if (d.match("/")) {
					if (d.match(" ")) {

						time_parse = d.split(" ");
						if (d.match(":")) {
							time_array = time_parse[1].split(":");
							if (time_array[0] >= 0 ) {
								date.setHours(time_array[0]);
								p.hour = true;
							}
							if (time_array[1] >= 0) {
								date.setMinutes(time_array[1]);
								p.minute = true;
							}
							if (time_array[2] >= 0) {
								date.setSeconds(time_array[2]);
								p.second = true;
							}
							if (time_array[3] >= 0) {
								date.setMilliseconds(time_array[3]);
								p.millisecond = true;
							}
						}
						date_array = time_parse[0].split("/");
					} else {
						date_array = d.split("/");
					}
					if (date_array[2]) {
						date.setFullYear(date_array[2]);
						p.year = true;
					}
					if (date_array[0] >= 0) {
						date.setMonth(date_array[0] - 1);
						p.month = true;
					}
					if (date_array[1] >= 0) {
						if (date_array[1].length > 2) {
							date.setFullYear(date_array[1]);
							p.year = true;
						} else {
							date.setDate(date_array[1]);
							p.day = true;
						}
					}
				} else if (d.match("now")) {
					var now = new Date();

					date.setFullYear(now.getFullYear());
					p.year = true;

					date.setMonth(now.getMonth());
					p.month = true;

					date.setDate(now.getDate());
					p.day = true;

					if (d.match("hours")) {
						date.setHours(now.getHours());
						p.hour = true;
					}
					if (d.match("minutes")) {
						date.setHours(now.getHours());
						date.setMinutes(now.getMinutes());
						p.hour = true;
						p.minute = true;
					}
					if (d.match("seconds")) {
						date.setHours(now.getHours());
						date.setMinutes(now.getMinutes());
						date.setSeconds(now.getSeconds());
						p.hour = true;
						p.minute = true;
						p.second = true;
					}
					if (d.match("milliseconds")) {
						date.setHours(now.getHours());
						date.setMinutes(now.getMinutes());
						date.setSeconds(now.getSeconds());
						date.setMilliseconds(now.getMilliseconds());
						p.hour = true;
						p.minute = true;
						p.second = true;
						p.millisecond = true;
					}
				} else if (d.length <= 8) {
					p.year = true;
					date.setFullYear(parseInt(d, 10));
					date.setMonth(0);
					date.setDate(1);
					date.setHours(0);
					date.setMinutes(0);
					date.setSeconds(0);
					date.setMilliseconds(0);
				} else if (d.match("T")) {
					if (navigator.userAgent.match(/MSIE\s(?!9.0)/)) {
					    // IE 8 < Won't accept dates with a "-" in them.
						time_parse = d.split("T");
						if (d.match(":")) {
							time_array = time_parse[1].split(":");
							if (time_array[0] >= 1) {
								date.setHours(time_array[0]);
								p.hour = true;
							}
							if (time_array[1] >= 1) {
								date.setMinutes(time_array[1]);
								p.minute = true;
							}
							if (time_array[2] >= 1) {
								date.setSeconds(time_array[2]);
								if (time_array[2] >= 1) {
									p.second = true;
								}
							}
							if (time_array[3] >= 1) {
								date.setMilliseconds(time_array[3]);
								if (time_array[3] >= 1) {
									p.millisecond = true;
								}
							}
						}
						date_array = time_parse[0].split("-");
						if (date_array[0]) {
							date.setFullYear(date_array[0]);
							p.year = true;
						}
						if (date_array[1] >= 0) {
							date.setMonth(date_array[1] - 1);
							p.month = true;
						}
						if (date_array[2] >= 0) {
							date.setDate(date_array[2]);
							p.day = true;
						}

					} else {
						date = new Date(Date.parse(d));
						p.year = true;
						p.month = true;
						p.day = true;
						p.hour = true;
						p.minute = true;
						if (date.getSeconds() >= 1) {
							p.second = true;
						}
						if (date.getMilliseconds() >= 1) {
							p.millisecond = true;
						}
					}
				} else {
					date = new Date(
						parseInt(d.slice(0,4), 10),
						parseInt(d.slice(4,6), 10) - 1,
						parseInt(d.slice(6,8), 10),
						parseInt(d.slice(8,10), 10),
						parseInt(d.slice(10,12), 10)
					);
					p.year = true;
					p.month = true;
					p.day = true;
					p.hour = true;
					p.minute = true;
					if (date.getSeconds() >= 1) {
						p.second = true;
					}
					if (date.getMilliseconds() >= 1) {
						p.millisecond = true;
					}

				}

			}

			if (precision != null && precision != "") {
				return {
					date: 		date,
					precision: 	p
				};
			} else {
				return date;
			}
		},



		prettyDate: function(d, is_abbr, p, d2) {
			var _date,
				_date2,
				format,
				bc_check,
				is_pair = false,
				bc_original,
				bc_number,
				bc_string;

			if (d2 != null && d2 != "" && typeof d2 != 'undefined') {
				is_pair = true;
				trace("D2 " + d2);
			}


			if (type.of(d) == "date") {

				if (type.of(p) == "object") {
					if (p.millisecond || p.second && d.getSeconds() >= 1) {
						// YEAR MONTH DAY HOUR MINUTE
						if (is_abbr){
							format = VMM.Date.dateformats.time_short;
						} else {
							format = VMM.Date.dateformats.time_short;
						}
					} else if (p.minute) {
						// YEAR MONTH DAY HOUR MINUTE
						if (is_abbr){
							format = VMM.Date.dateformats.time_no_seconds_short;
						} else {
							format = VMM.Date.dateformats.time_no_seconds_small_date;
						}
					} else if (p.hour) {
						// YEAR MONTH DAY HOUR
						if (is_abbr) {
							format = VMM.Date.dateformats.time_no_seconds_short;
						} else {
							format = VMM.Date.dateformats.time_no_seconds_small_date;
						}
					} else if (p.day) {
						// YEAR MONTH DAY
						if (is_abbr) {
							format = VMM.Date.dateformats.full_short;
						} else {
							format = VMM.Date.dateformats.full;
						}
					} else if (p.month) {
						// YEAR MONTH
						if (is_abbr) {
							format = VMM.Date.dateformats.month_short;
						} else {
							format = VMM.Date.dateformats.month;
						}
					} else if (p.year) {
						format = VMM.Date.dateformats.year;
					} else {
						format = VMM.Date.dateformats.year;
					}

				} else {

					if (d.getMonth() === 0 && d.getDate() == 1 && d.getHours() === 0 && d.getMinutes() === 0 ) {
						// YEAR ONLY
						format = VMM.Date.dateformats.year;
					} else if (d.getDate() <= 1 && d.getHours() === 0 && d.getMinutes() === 0) {
						// YEAR MONTH
						if (is_abbr) {
							format = VMM.Date.dateformats.month_short;
						} else {
							format = VMM.Date.dateformats.month;
						}
					} else if (d.getHours() === 0 && d.getMinutes() === 0) {
						// YEAR MONTH DAY
						if (is_abbr) {
							format = VMM.Date.dateformats.full_short;
						} else {
							format = VMM.Date.dateformats.full;
						}
					} else  if (d.getMinutes() === 0) {
						// YEAR MONTH DAY HOUR
						if (is_abbr) {
							format = VMM.Date.dateformats.time_no_seconds_short;
						} else {
							format = VMM.Date.dateformats.time_no_seconds_small_date;
						}
					} else {
						// YEAR MONTH DAY HOUR MINUTE
						if (is_abbr){
							format = VMM.Date.dateformats.time_no_seconds_short;
						} else {
							format = VMM.Date.dateformats.full_long;
						}
					}
				}

				_date = dateFormat(d, format, false);
				//_date = "Jan"
				bc_check = _date.split(" ");

				// BC TIME SUPPORT
				for(var i = 0; i < bc_check.length; i++) {
					if ( parseInt(bc_check[i], 10) < 0 ) {
						trace("YEAR IS BC");
						bc_original	= bc_check[i];
						bc_number	= Math.abs( parseInt(bc_check[i], 10) );
						bc_string	= bc_number.toString() + " B.C.";
						_date		= _date.replace(bc_original, bc_string);
					}
				}


				if (is_pair) {
					_date2 = dateFormat(d2, format, false);
					bc_check = _date2.split(" ");
					// BC TIME SUPPORT
					for(var j = 0; j < bc_check.length; j++) {
						if ( parseInt(bc_check[j], 10) < 0 ) {
							trace("YEAR IS BC");
							bc_original	= bc_check[j];
							bc_number	= Math.abs( parseInt(bc_check[j], 10) );
							bc_string	= bc_number.toString() + " B.C.";
							_date2			= _date2.replace(bc_original, bc_string);
						}
					}

				}
			} else {
				trace("NOT A VALID DATE?");
				trace(d);
			}

			if (is_pair) {
				return _date + " &mdash; " + _date2;
			} else {
				return _date;
			}
		}

	}).init();

	/*
	 * Date Format 1.2.3
	 * (c) 2007-2009 Steven Levithan <stevenlevithan.com>
	 * MIT license
	 *
	 * Includes enhancements by Scott Trenda <scott.trenda.net>
	 * and Kris Kowal <cixar.com/~kris.kowal/>
	 *
	 * Accepts a date, a mask, or a date and a mask.
	 * Returns a formatted version of the given date.
	 * The date defaults to the current date/time.
	 * The mask defaults to dateFormat.masks.default.
	 */

	var dateFormat = function () {
		var	token = /d{1,4}|m{1,4}|yy(?:yy)?|([HhMsTt])\1?|[LloSZ]|"[^"]*"|'[^']*'/g,
			timezone = /\b(?:[PMCEA][SDP]T|(?:Pacific|Mountain|Central|Eastern|Atlantic) (?:Standard|Daylight|Prevailing) Time|(?:GMT|UTC)(?:[-+]\d{4})?)\b/g,
			timezoneClip = /[^-+\dA-Z]/g,
			pad = function (val, len) {
				val = String(val);
				len = len || 2;
				while (val.length < len) val = "0" + val;
				return val;
			};

		// Regexes and supporting functions are cached through closure
		return function (date, mask, utc) {
			var dF = dateFormat;

			// You can't provide utc if you skip other args (use the "UTC:" mask prefix)
			if (arguments.length == 1 && Object.prototype.toString.call(date) == "[object String]" && !/\d/.test(date)) {
				mask = date;
				date = undefined;
			}

			// Passing date through Date applies Date.parse, if necessary
			// Caused problems in IE
			// date = date ? new Date(date) : new Date;
			if (isNaN(date)) {
				trace("invalid date " + date);
				//return "";
			}

			mask = String(dF.masks[mask] || mask || dF.masks["default"]);

			// Allow setting the utc argument via the mask
			if (mask.slice(0, 4) == "UTC:") {
				mask = mask.slice(4);
				utc = true;
			}

			var	_ = utc ? "getUTC" : "get",
				d = date[_ + "Date"](),
				D = date[_ + "Day"](),
				m = date[_ + "Month"](),
				y = date[_ + "FullYear"](),
				H = date[_ + "Hours"](),
				M = date[_ + "Minutes"](),
				s = date[_ + "Seconds"](),
				L = date[_ + "Milliseconds"](),
				o = utc ? 0 : date.getTimezoneOffset(),
				flags = {
					d:    d,
					dd:   pad(d),
					ddd:  dF.i18n.dayNames[D],
					dddd: dF.i18n.dayNames[D + 7],
					m:    m + 1,
					mm:   pad(m + 1),
					mmm:  dF.i18n.monthNames[m],
					mmmm: dF.i18n.monthNames[m + 12],
					yy:   String(y).slice(2),
					yyyy: y,
					h:    H % 12 || 12,
					hh:   pad(H % 12 || 12),
					H:    H,
					HH:   pad(H),
					M:    M,
					MM:   pad(M),
					s:    s,
					ss:   pad(s),
					l:    pad(L, 3),
					L:    pad(L > 99 ? Math.round(L / 10) : L),
					t:    H < 12 ? "a"  : "p",
					tt:   H < 12 ? "am" : "pm",
					T:    H < 12 ? "A"  : "P",
					TT:   H < 12 ? "AM" : "PM",
					Z:    utc ? "UTC" : (String(date).match(timezone) || [""]).pop().replace(timezoneClip, ""),
					o:    (o > 0 ? "-" : "+") + pad(Math.floor(Math.abs(o) / 60) * 100 + Math.abs(o) % 60, 4),
					S:    ["th", "st", "nd", "rd"][d % 10 > 3 ? 0 : (d % 100 - d % 10 != 10) * d % 10]
				};

			return mask.replace(token, function ($0) {
				return $0 in flags ? flags[$0] : $0.slice(1, $0.length - 1);
			});
		};
	}();

	// Some common format strings
	dateFormat.masks = {
		"default":      "ddd mmm dd yyyy HH:MM:ss",
		shortDate:      "m/d/yy",
		mediumDate:     "mmm d, yyyy",
		longDate:       "mmmm d, yyyy",
		fullDate:       "dddd, mmmm d, yyyy",
		shortTime:      "h:MM TT",
		mediumTime:     "h:MM:ss TT",
		longTime:       "h:MM:ss TT Z",
		isoDate:        "yyyy-mm-dd",
		isoTime:        "HH:MM:ss",
		isoDateTime:    "yyyy-mm-dd'T'HH:MM:ss",
		isoUtcDateTime: "UTC:yyyy-mm-dd'T'HH:MM:ss'Z'"
	};

	// Internationalization strings
	dateFormat.i18n = {
		dayNames: [
			"Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat",
			"Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"
		],
		monthNames: [
			"Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
			"January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"
		]
	};

	// For convenience...
	Date.prototype.format = function (mask, utc) {
		return dateFormat(this, mask, utc);
	};

}

/* **********************************************
     Begin VMM.Util.js
********************************************** */

/*	* Utilities and Useful Functions
================================================== */
if(typeof VMM != 'undefined' && typeof VMM.Util == 'undefined') {

	VMM.Util = ({

		init: function() {
			return this;
		},

		/*	* CORRECT PROTOCOL (DOES NOT WORK)
		================================================== */
		correctProtocol: function(url) {
			var loc = (window.parent.location.protocol).toString(),
				prefix = "",
				the_url = url.split("://", 2);

			if (loc.match("http")) {
				prefix = loc;
			} else {
				prefix = "https";
			}

			return prefix + "://" + the_url[1];

		},

		/*	* MERGE CONFIG
		================================================== */
		mergeConfig: function(config_main, config_to_merge) {
			var x;
			for (x in config_to_merge) {
				if (Object.prototype.hasOwnProperty.call(config_to_merge, x)) {
					config_main[x] = config_to_merge[x];
				}
			}
			return config_main;
		},

		/*	* GET OBJECT ATTRIBUTE BY INDEX
		================================================== */
		getObjectAttributeByIndex: function(obj, index) {
			if(typeof obj != 'undefined') {
				var i = 0;
				for (var attr in obj){
					if (index === i){
						return obj[attr];
					}
					i++;
				}
				return "";
			} else {
				return "";
			}

		},

		/*	* ORDINAL
		================================================== */
		ordinal: function(n) {
		    return ["th","st","nd","rd"][(!( ((n%10) >3) || (Math.floor(n%100/10)==1)) ) * (n%10)];
		},

		/*	* RANDOM BETWEEN
		================================================== */
		//VMM.Util.randomBetween(1, 3)
		randomBetween: function(min, max) {
			return Math.floor(Math.random() * (max - min + 1) + min);
		},

		/*	* AVERAGE
			* http://jsfromhell.com/array/average
			* var x = VMM.Util.average([2, 3, 4]);
			* VMM.Util.average([2, 3, 4]).mean
		================================================== */
		average: function(a) {
		    var r = {mean: 0, variance: 0, deviation: 0}, t = a.length;
		    for(var m, s = 0, l = t; l--; s += a[l]);
		    for(m = r.mean = s / t, l = t, s = 0; l--; s += Math.pow(a[l] - m, 2));
		    return r.deviation = Math.sqrt(r.variance = s / t), r;
		},

		/*	* CUSTOM SORT
		================================================== */
		customSort: function(a, b) {
			var a1= a, b1= b;
			if(a1== b1) return 0;
			return a1> b1? 1: -1;
		},

		/*	* Remove Duplicates from Array
		================================================== */
		deDupeArray: function(arr) {
			var i,
				len=arr.length,
				out=[],
				obj={};

			for (i=0;i<len;i++) {
				obj[arr[i]]=0;
			}
			for (i in obj) {
				out.push(i);
			}
			return out;
		},

		/*	* Given an int or decimal, turn that into string in $xxx,xxx.xx format.
		================================================== */
		number2money: function(n, symbol, padding) {
			var symbol = (symbol !== null) ? symbol : true; // add $
			var padding = (padding !== null) ? padding : false; //pad with .00
			var number = VMM.Math2.floatPrecision(n,2); // rounded correctly to two digits, if decimals passed
			var formatted = this.niceNumber(number);
			// no decimal and padding is enabled
			if (!formatted.split(/\./g)[1] && padding) formatted = formatted + ".00";
			// add money sign
			if (symbol) formatted = "$"+formatted;
			return formatted;
		},

		/*	* Returns a word count number
		================================================== */
		wordCount: function(s) {
			var fullStr = s + " ";
			var initial_whitespace_rExp = /^[^A-Za-z0-9\'\-]+/gi;
			var left_trimmedStr = fullStr.replace(initial_whitespace_rExp, "");
			var non_alphanumerics_rExp = /[^A-Za-z0-9\'\-]+/gi;
			var cleanedStr = left_trimmedStr.replace(non_alphanumerics_rExp, " ");
			var splitString = cleanedStr.split(" ");
			var word_count = splitString.length -1;
			if (fullStr.length <2) {
				word_count = 0;
			}
			return word_count;
		},

		ratio: {
			fit: function(w, h, ratio_w, ratio_h) {
				//VMM.Util.ratio.fit(w, h, ratio_w, ratio_h).width;
				var _fit = {width:0,height:0};
				// TRY WIDTH FIRST
				_fit.width = w;
				//_fit.height = Math.round((h / ratio_h) * ratio_w);
				_fit.height = Math.round((w / ratio_w) * ratio_h);
				if (_fit.height > h) {
					_fit.height = h;
					//_fit.width = Math.round((w / ratio_w) * ratio_h);
					_fit.width = Math.round((h / ratio_h) * ratio_w);

					if (_fit.width > w) {
						trace("FIT: DIDN'T FIT!!! ")
					}
				}

				return _fit;

			},
			r16_9: function(w,h) {
				//VMM.Util.ratio.r16_9(w, h) // Returns corresponding number
				if (w !== null && w !== "") {
					return Math.round((h / 16) * 9);
				} else if (h !== null && h !== "") {
					return Math.round((w / 9) * 16);
				}
			},
			r4_3: function(w,h) {
				if (w !== null && w !== "") {
					return Math.round((h / 4) * 3);
				} else if (h !== null && h !== "") {
					return Math.round((w / 3) * 4);
				}
			}
		},

		doubledigit: function(n) {
			return (n < 10 ? '0' : '') + n;
		},

		/*	* Returns a truncated segement of a long string of between min and max words. If possible, ends on a period (otherwise goes to max).
		================================================== */
		truncateWords: function(s, min, max) {

			if (!min) min = 30;
			if (!max) max = min;

			var initial_whitespace_rExp = /^[^A-Za-z0-9\'\-]+/gi;
			var left_trimmedStr = s.replace(initial_whitespace_rExp, "");
			var words = left_trimmedStr.split(" ");

			var result = [];

			min = Math.min(words.length, min);
			max = Math.min(words.length, max);

			for (var i = 0; i<min; i++) {
				result.push(words[i]);
			}

			for (var j = min; i<max; i++) {
				var word = words[i];

				result.push(word);

				if (word.charAt(word.length-1) == '.') {
					break;
				}
			}

			return (result.join(' '));
		},

		/*	* Turns plain text links into real links
		================================================== */
		linkify: function(text,targets,is_touch) {

			// http://, https://, ftp://
			var urlPattern = /\b(?:https?|ftp):\/\/[a-z0-9-+&@#\/%?=~_|!:,.;]*[a-z0-9-+&@#\/%=~_|]/gim;

			// www. sans http:// or https://
			var pseudoUrlPattern = /(^|[^\/])(www\.[\S]+(\b|$))/gim;

			// Email addresses
			var emailAddressPattern = /(([a-zA-Z0-9_\-\.]+)@[a-zA-Z_]+?(?:\.[a-zA-Z]{2,6}))+/gim;


			return text
				.replace(urlPattern, "<a target='_blank' href='$&' onclick='void(0)'>$&</a>")
				.replace(pseudoUrlPattern, "$1<a target='_blank' onclick='void(0)' href='http://$2'>$2</a>")
				.replace(emailAddressPattern, "<a target='_blank' onclick='void(0)' href='mailto:$1'>$1</a>");
		},

		linkify_with_twitter: function(text,targets,is_touch) {

			// http://, https://, ftp://
			var urlPattern = /\b(?:https?|ftp):\/\/[a-z0-9-+&@#\/%?=~_|!:,.;]*[a-z0-9-+&@#\/%=~_|]/gim;
			var url_pattern = /(\()((?:ht|f)tps?:\/\/[a-z0-9\-._~!$&'()*+,;=:\/?#[\]@%]+)(\))|(\[)((?:ht|f)tps?:\/\/[a-z0-9\-._~!$&'()*+,;=:\/?#[\]@%]+)(\])|(\{)((?:ht|f)tps?:\/\/[a-z0-9\-._~!$&'()*+,;=:\/?#[\]@%]+)(\})|(<|&(?:lt|#60|#x3c);)((?:ht|f)tps?:\/\/[a-z0-9\-._~!$&'()*+,;=:\/?#[\]@%]+)(>|&(?:gt|#62|#x3e);)|((?:^|[^=\s'"\]])\s*['"]?|[^=\s]\s+)(\b(?:ht|f)tps?:\/\/[a-z0-9\-._~!$'()*+,;=:\/?#[\]@%]+(?:(?!&(?:gt|#0*62|#x0*3e);|&(?:amp|apos|quot|#0*3[49]|#x0*2[27]);[.!&',:?;]?(?:[^a-z0-9\-._~!$&'()*+,;=:\/?#[\]@%]|$))&[a-z0-9\-._~!$'()*+,;=:\/?#[\]@%]*)*[a-z0-9\-_~$()*+=\/#[\]@%])/img;
			var url_replace = '$1$4$7$10$13<a href="$2$5$8$11$14" target="_blank" class="hyphenate">$2$5$8$11$14</a>$3$6$9$12';

			// www. sans http:// or https://
			var pseudoUrlPattern = /(^|[^\/])(www\.[\S]+(\b|$))/gim;
			function replaceURLWithHTMLLinks(text) {
			    var exp = /(\b(https?|ftp|file):\/\/([-A-Z0-9+&@#%?=~_|!:,.;]*)([-A-Z0-9+&@#%?\/=~_|!:,.;]*)[-A-Z0-9+&@#\/%=~_|])/ig;
			    return text.replace(exp, "<a href='$1' target='_blank'>$3</a>");
			}
			// Email addresses
			var emailAddressPattern = /(([a-zA-Z0-9_\-\.]+)@[a-zA-Z_]+?(?:\.[a-zA-Z]{2,6}))+/gim;

			//var twitterHandlePattern = /(@([\w]+))/g;
			var twitterHandlePattern = /\B@([\w-]+)/gm;
			var twitterSearchPattern = /(#([\w]+))/g;

			return text
				//.replace(urlPattern, "<a target='_blank' href='$&' onclick='void(0)'>$&</a>")
				.replace(url_pattern, url_replace)
				.replace(pseudoUrlPattern, "$1<a target='_blank' class='hyphenate' onclick='void(0)' href='http://$2'>$2</a>")
				.replace(emailAddressPattern, "<a target='_blank' onclick='void(0)' href='mailto:$1'>$1</a>")
				.replace(twitterHandlePattern, "<a href='http://twitter.com/$1' target='_blank' onclick='void(0)'>@$1</a>");

				// TURN THIS BACK ON TO AUTOMAGICALLY LINK HASHTAGS TO TWITTER SEARCH
				//.replace(twitterSearchPattern, "<a href='http://twitter.com/#search?q=%23$2' target='_blank' 'void(0)'>$1</a>");
		},

		linkify_wikipedia: function(text) {

			var urlPattern = /<i[^>]*>(.*?)<\/i>/gim;
			return text
				.replace(urlPattern, "<a target='_blank' href='http://en.wikipedia.org/wiki/$&' onclick='void(0)'>$&</a>")
				.replace(/<i\b[^>]*>/gim, "")
				.replace(/<\/i>/gim, "")
				.replace(/<b\b[^>]*>/gim, "")
				.replace(/<\/b>/gim, "");
		},

		/*	* Turns plain text links into real links
		================================================== */
		// VMM.Util.unlinkify();
		unlinkify: function(text) {
			if(!text) return text;
			text = text.replace(/<a\b[^>]*>/i,"");
			text = text.replace(/<\/a>/i, "");
			return text;
		},

		untagify: function(text) {
			if (!text) {
				return text;
			}
			text = text.replace(/<\s*\w.*?>/g,"");
			return text;
		},

		/*	* TK
		================================================== */
		nl2br: function(text) {
			return text.replace(/(\r\n|[\r\n]|\\n|\\r)/g,"<br/>");
		},

		/*	* Generate a Unique ID
		================================================== */
		// VMM.Util.unique_ID(size);
		unique_ID: function(size) {

			var getRandomNumber = function(range) {
				return Math.floor(Math.random() * range);
			};

			var getRandomChar = function() {
				var chars = "abcdefghijklmnopqurstuvwxyzABCDEFGHIJKLMNOPQURSTUVWXYZ";
				return chars.substr( getRandomNumber(62), 1 );
			};

			var randomID = function(size) {
				var str = "";
				for(var i = 0; i < size; i++) {
					str += getRandomChar();
				}
				return str;
			};

			return randomID(size);
		},
		/*	* Tells you if a number is even or not
		================================================== */
		// VMM.Util.isEven(n)
		isEven: function(n){
			return (n%2 === 0) ? true : false;
		},
		/*	* Get URL Variables
		================================================== */
		//	var somestring = VMM.Util.getUrlVars(str_url)["varname"];
		getUrlVars: function(string) {

			var str = string.toString();

			if (str.match('&#038;')) {
				str = str.replace("&#038;", "&");
			} else if (str.match('&#38;')) {
				str = str.replace("&#38;", "&");
			} else if (str.match('&amp;')) {
				str = str.replace("&amp;", "&");
			}

			var vars = [], hash;
			var hashes = str.slice(str.indexOf('?') + 1).split('&');
			for(var i = 0; i < hashes.length; i++) {
				hash = hashes[i].split('=');
				vars.push(hash[0]);
				vars[hash[0]] = hash[1];
			}


			return vars;
		},

		/*	* Cleans up strings to become real HTML
		================================================== */
		toHTML: function(text) {

			text = this.nl2br(text);
			text = this.linkify(text);

			return text.replace(/\s\s/g,"&nbsp;&nbsp;");
		},

		/*	* Returns text strings as CamelCase
		================================================== */
		toCamelCase: function(s,forceLowerCase) {

			if(forceLowerCase !== false) forceLowerCase = true;

			var sps = ((forceLowerCase) ? s.toLowerCase() : s).split(" ");

			for(var i=0; i<sps.length; i++) {

				sps[i] = sps[i].substr(0,1).toUpperCase() + sps[i].substr(1);
			}

			return sps.join(" ");
		},

		/*	* Replaces dumb quote marks with smart ones
		================================================== */
		properQuotes: function(str) {
			return str.replace(/\"([^\"]*)\"/gi,"&#8220;$1&#8221;");
		},
		/*	* Add Commas to numbers
		================================================== */
		niceNumber: function(nStr){
			nStr += '';
			x = nStr.split('.');
			x1 = x[0];
			x2 = x.length > 1 ? '.' + x[1] : '';
			var rgx = /(\d+)(\d{3})/;
			while (rgx.test(x1)) {
				x1 = x1.replace(rgx, '$1' + ',' + '$2');
			}
			return x1 + x2;
		},
		/*	* Transform text to Title Case
		================================================== */
		toTitleCase: function(t){
			if ( VMM.Browser.browser == "Explorer" && parseInt(VMM.Browser.version, 10) >= 7) {
				return t.replace("_", "%20");
			} else {
				var __TitleCase = {
					__smallWords: ['a', 'an', 'and', 'as', 'at', 'but','by', 'en', 'for', 'if', 'in', 'of', 'on', 'or','the', 'to', 'v[.]?', 'via', 'vs[.]?'],

					init: function() {
						this.__smallRE = this.__smallWords.join('|');
						this.__lowerCaseWordsRE = new RegExp('\\b(' + this.__smallRE + ')\\b', 'gi');
						this.__firstWordRE = new RegExp('^([^a-zA-Z0-9 \\r\\n\\t]*)(' + this.__smallRE + ')\\b', 'gi');
						this.__lastWordRE = new RegExp('\\b(' + this.__smallRE + ')([^a-zA-Z0-9 \\r\\n\\t]*)$', 'gi');
					},

					toTitleCase: function(string) {
						var line = '';

						var split = string.split(/([:.;?!][ ]|(?:[ ]|^)["“])/);

						for (var i = 0; i < split.length; ++i) {
							var s = split[i];

							s = s.replace(/\b([a-zA-Z][a-z.'’]*)\b/g,this.__titleCaseDottedWordReplacer);

			 				// lowercase the list of small words
							s = s.replace(this.__lowerCaseWordsRE, this.__lowerReplacer);

							// if the first word in the title is a small word then capitalize it
							s = s.replace(this.__firstWordRE, this.__firstToUpperCase);

							// if the last word in the title is a small word, then capitalize it
							s = s.replace(this.__lastWordRE, this.__firstToUpperCase);

							line += s;
						}

						// special cases
						line = line.replace(/ V(s?)\. /g, ' v$1. ');
						line = line.replace(/(['’])S\b/g, '$1s');
						line = line.replace(/\b(AT&T|Q&A)\b/ig, this.__upperReplacer);

						return line;
					},

					__titleCaseDottedWordReplacer: function (w) {
						return (w.match(/[a-zA-Z][.][a-zA-Z]/)) ? w : __TitleCase.__firstToUpperCase(w);
					},

					__lowerReplacer: function (w) { return w.toLowerCase() },

					__upperReplacer: function (w) { return w.toUpperCase() },

					__firstToUpperCase: function (w) {
						var split = w.split(/(^[^a-zA-Z0-9]*[a-zA-Z0-9])(.*)$/);
						if (split[1]) {
							split[1] = split[1].toUpperCase();
						}

						return split.join('');


					}
				};

				__TitleCase.init();

				t = t.replace(/_/g," ");
				t = __TitleCase.toTitleCase(t);

				return t;

			}

		}

	}).init();
}

/* **********************************************
     Begin LazyLoad.js
********************************************** */

/*jslint browser: true, eqeqeq: true, bitwise: true, newcap: true, immed: true, regexp: false */

/*
LazyLoad makes it easy and painless to lazily load one or more external
JavaScript or CSS files on demand either during or after the rendering of a web
page.

Supported browsers include Firefox 2+, IE6+, Safari 3+ (including Mobile
Safari), Google Chrome, and Opera 9+. Other browsers may or may not work and
are not officially supported.

Visit https://github.com/rgrove/lazyload/ for more info.

Copyright (c) 2011 Ryan Grove <ryan@wonko.com>
All rights reserved.

Permission is hereby granted, free of charge, to any person obtaining a copy of
this software and associated documentation files (the 'Software'), to deal in
the Software without restriction, including without limitation the rights to
use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of
the Software, and to permit persons to whom the Software is furnished to do so,
subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

@module lazyload
@class LazyLoad
@static
@version 2.0.3 (git)
*/

LazyLoad = (function (doc) {
  // -- Private Variables ------------------------------------------------------

  // User agent and feature test information.
  var env,

  // Reference to the <head> element (populated lazily).
  head,

  // Requests currently in progress, if any.
  pending = {},

  // Number of times we've polled to check whether a pending stylesheet has
  // finished loading. If this gets too high, we're probably stalled.
  pollCount = 0,

  // Queued requests.
  queue = {css: [], js: []},

  // Reference to the browser's list of stylesheets.
  styleSheets = doc.styleSheets;

  // -- Private Methods --------------------------------------------------------

  /**
  Creates and returns an HTML element with the specified name and attributes.

  @method createNode
  @param {String} name element name
  @param {Object} attrs name/value mapping of element attributes
  @return {HTMLElement}
  @private
  */
  function createNode(name, attrs) {
    var node = doc.createElement(name), attr;

    for (attr in attrs) {
      if (attrs.hasOwnProperty(attr)) {
        node.setAttribute(attr, attrs[attr]);
      }
    }

    return node;
  }

  /**
  Called when the current pending resource of the specified type has finished
  loading. Executes the associated callback (if any) and loads the next
  resource in the queue.

  @method finish
  @param {String} type resource type ('css' or 'js')
  @private
  */
  function finish(type) {
    var p = pending[type],
        callback,
        urls;

    if (p) {
      callback = p.callback;
      urls     = p.urls;

      urls.shift();
      pollCount = 0;

      // If this is the last of the pending URLs, execute the callback and
      // start the next request in the queue (if any).
      if (!urls.length) {
        callback && callback.call(p.context, p.obj);
        pending[type] = null;
        queue[type].length && load(type);
      }
    }
  }

  /**
  Populates the <code>env</code> variable with user agent and feature test
  information.

  @method getEnv
  @private
  */
  function getEnv() {
    var ua = navigator.userAgent;

    env = {
      // True if this browser supports disabling async mode on dynamically
      // created script nodes. See
      // http://wiki.whatwg.org/wiki/Dynamic_Script_Execution_Order
      async: doc.createElement('script').async === true
    };

    (env.webkit = /AppleWebKit\//.test(ua))
      || (env.ie = /MSIE/.test(ua))
      || (env.opera = /Opera/.test(ua))
      || (env.gecko = /Gecko\//.test(ua))
      || (env.unknown = true);
  }

  /**
  Loads the specified resources, or the next resource of the specified type
  in the queue if no resources are specified. If a resource of the specified
  type is already being loaded, the new request will be queued until the
  first request has been finished.

  When an array of resource URLs is specified, those URLs will be loaded in
  parallel if it is possible to do so while preserving execution order. All
  browsers support parallel loading of CSS, but only Firefox and Opera
  support parallel loading of scripts. In other browsers, scripts will be
  queued and loaded one at a time to ensure correct execution order.

  @method load
  @param {String} type resource type ('css' or 'js')
  @param {String|Array} urls (optional) URL or array of URLs to load
  @param {Function} callback (optional) callback function to execute when the
    resource is loaded
  @param {Object} obj (optional) object to pass to the callback function
  @param {Object} context (optional) if provided, the callback function will
    be executed in this object's context
  @private
  */
  function load(type, urls, callback, obj, context) {
    var _finish = function () { finish(type); },
        isCSS   = type === 'css',
        nodes   = [],
        i, len, node, p, pendingUrls, url;

    env || getEnv();

    if (urls) {
      // If urls is a string, wrap it in an array. Otherwise assume it's an
      // array and create a copy of it so modifications won't be made to the
      // original.
      urls = typeof urls === 'string' ? [urls] : urls.concat();

      // Create a request object for each URL. If multiple URLs are specified,
      // the callback will only be executed after all URLs have been loaded.
      //
      // Sadly, Firefox and Opera are the only browsers capable of loading
      // scripts in parallel while preserving execution order. In all other
      // browsers, scripts must be loaded sequentially.
      //
      // All browsers respect CSS specificity based on the order of the link
      // elements in the DOM, regardless of the order in which the stylesheets
      // are actually downloaded.
      if (isCSS || env.async || env.gecko || env.opera) {
        // Load in parallel.
        queue[type].push({
          urls    : urls,
          callback: callback,
          obj     : obj,
          context : context
        });
      } else {
        // Load sequentially.
        for (i = 0, len = urls.length; i < len; ++i) {
          queue[type].push({
            urls    : [urls[i]],
            callback: i === len - 1 ? callback : null, // callback is only added to the last URL
            obj     : obj,
            context : context
          });
        }
      }
    }

    // If a previous load request of this type is currently in progress, we'll
    // wait our turn. Otherwise, grab the next item in the queue.
    if (pending[type] || !(p = pending[type] = queue[type].shift())) {
      return;
    }

    head || (head = doc.head || doc.getElementsByTagName('head')[0]);
    pendingUrls = p.urls;

    for (i = 0, len = pendingUrls.length; i < len; ++i) {
      url = pendingUrls[i];

      if (isCSS) {
          node = env.gecko ? createNode('style') : createNode('link', {
            href: url,
            rel : 'stylesheet'
          });
      } else {
        node = createNode('script', {src: url});
        node.async = false;
      }

      node.className = 'lazyload';
      node.setAttribute('charset', 'utf-8');

      if (env.ie && !isCSS) {
        node.onreadystatechange = function () {
          if (/loaded|complete/.test(node.readyState)) {
            node.onreadystatechange = null;
            _finish();
          }
        };
      } else if (isCSS && (env.gecko || env.webkit)) {
        // Gecko and WebKit don't support the onload event on link nodes.
        if (env.webkit) {
          // In WebKit, we can poll for changes to document.styleSheets to
          // figure out when stylesheets have loaded.
          p.urls[i] = node.href; // resolve relative URLs (or polling won't work)
          pollWebKit();
        } else {
          // In Gecko, we can import the requested URL into a <style> node and
          // poll for the existence of node.sheet.cssRules. Props to Zach
          // Leatherman for calling my attention to this technique.
          node.innerHTML = '@import "' + url + '";';
          pollGecko(node);
        }
      } else {
        node.onload = node.onerror = _finish;
      }

      nodes.push(node);
    }

    for (i = 0, len = nodes.length; i < len; ++i) {
      head.appendChild(nodes[i]);
    }
  }

  /**
  Begins polling to determine when the specified stylesheet has finished loading
  in Gecko. Polling stops when all pending stylesheets have loaded or after 10
  seconds (to prevent stalls).

  Thanks to Zach Leatherman for calling my attention to the @import-based
  cross-domain technique used here, and to Oleg Slobodskoi for an earlier
  same-domain implementation. See Zach's blog for more details:
  http://www.zachleat.com/web/2010/07/29/load-css-dynamically/

  @method pollGecko
  @param {HTMLElement} node Style node to poll.
  @private
  */
  function pollGecko(node) {
    var hasRules;

    try {
      // We don't really need to store this value or ever refer to it again, but
      // if we don't store it, Closure Compiler assumes the code is useless and
      // removes it.
      hasRules = !!node.sheet.cssRules;
    } catch (ex) {
      // An exception means the stylesheet is still loading.
      pollCount += 1;

      if (pollCount < 200) {
        setTimeout(function () { pollGecko(node); }, 50);
      } else {
        // We've been polling for 10 seconds and nothing's happened. Stop
        // polling and finish the pending requests to avoid blocking further
        // requests.
        hasRules && finish('css');
      }

      return;
    }

    // If we get here, the stylesheet has loaded.
    finish('css');
  }

  /**
  Begins polling to determine when pending stylesheets have finished loading
  in WebKit. Polling stops when all pending stylesheets have loaded or after 10
  seconds (to prevent stalls).

  @method pollWebKit
  @private
  */
  function pollWebKit() {
    var css = pending.css, i;

    if (css) {
      i = styleSheets.length;

      // Look for a stylesheet matching the pending URL.
      while (--i >= 0) {
        if (styleSheets[i].href === css.urls[0]) {
          finish('css');
          break;
        }
      }

      pollCount += 1;

      if (css) {
        if (pollCount < 200) {
          setTimeout(pollWebKit, 50);
        } else {
          // We've been polling for 10 seconds and nothing's happened, which may
          // indicate that the stylesheet has been removed from the document
          // before it had a chance to load. Stop polling and finish the pending
          // request to prevent blocking further requests.
          finish('css');
        }
      }
    }
  }

  return {

    /**
    Requests the specified CSS URL or URLs and executes the specified
    callback (if any) when they have finished loading. If an array of URLs is
    specified, the stylesheets will be loaded in parallel and the callback
    will be executed after all stylesheets have finished loading.

    @method css
    @param {String|Array} urls CSS URL or array of CSS URLs to load
    @param {Function} callback (optional) callback function to execute when
      the specified stylesheets are loaded
    @param {Object} obj (optional) object to pass to the callback function
    @param {Object} context (optional) if provided, the callback function
      will be executed in this object's context
    @static
    */
    css: function (urls, callback, obj, context) {
      load('css', urls, callback, obj, context);
    },

    /**
    Requests the specified JavaScript URL or URLs and executes the specified
    callback (if any) when they have finished loading. If an array of URLs is
    specified and the browser supports it, the scripts will be loaded in
    parallel and the callback will be executed after all scripts have
    finished loading.

    Currently, only Firefox and Opera support parallel loading of scripts while
    preserving execution order. In other browsers, scripts will be
    queued and loaded one at a time to ensure correct execution order.

    @method js
    @param {String|Array} urls JS URL or array of JS URLs to load
    @param {Function} callback (optional) callback function to execute when
      the specified scripts are loaded
    @param {Object} obj (optional) object to pass to the callback function
    @param {Object} context (optional) if provided, the callback function
      will be executed in this object's context
    @static
    */
    js: function (urls, callback, obj, context) {
      load('js', urls, callback, obj, context);
    }

  };
})(this.document);


/* **********************************************
     Begin VMM.LoadLib.js
********************************************** */

/*
	LoadLib
	Designed and built by Zach Wise digitalartwork.net
*/

/*	* CodeKit Import
	* http://incident57.com/codekit/
================================================== */
// @codekit-prepend "../Library/LazyLoad.js";

LoadLib = (function (doc) {
	var loaded	= [];

	function isLoaded(url) {

		var i			= 0,
			has_loaded	= false;

		for (i = 0; i < loaded.length; i++) {
			if (loaded[i] == url) {
				has_loaded = true;
			}
		}

		if (has_loaded) {
			return true;
		} else {
			loaded.push(url);
			return false;
		}

	}

	return {

		css: function (urls, callback, obj, context) {
			if (!isLoaded(urls)) {
				LazyLoad.css(urls, callback, obj, context);
			}
		},

		js: function (urls, callback, obj, context) {
			if (!isLoaded(urls)) {
				LazyLoad.js(urls, callback, obj, context);
			}
		}
    };

})(this.document);


/* **********************************************
     Begin VMM.Core.js
********************************************** */

/* VeriteCo Core
================================================== */

/*	* CodeKit Import
	* http://incident57.com/codekit/
================================================== */
// @codekit-prepend "VMM.js";
// @codekit-prepend "VMM.Library.js";
// @codekit-prepend "VMM.Browser.js";
// @codekit-prepend "VMM.FileExtention.js";
// @codekit-prepend "VMM.Date.js";
// @codekit-prepend "VMM.Util.js";
// @codekit-prepend "VMM.LoadLib.js";
// @codekit-prepend "VMM.Language.js";



/* **********************************************
     Begin VMM.Language.js
********************************************** */

/* DEFAULT LANGUAGE
================================================== */
if(typeof VMM != 'undefined' && typeof VMM.Language == 'undefined') {
	VMM.Language = {
		lang: "en",
		api: {
			wikipedia: "en"
		},
		date: {
			month: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
			month_abbr: ["Jan.", "Feb.", "March", "April", "May", "June", "July", "Aug.", "Sept.", "Oct.", "Nov.", "Dec."],
			day: ["Sunday","Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
			day_abbr: ["Sun.","Mon.", "Tues.", "Wed.", "Thurs.", "Fri.", "Sat."]
		},
		dateformats: {
			year: "yyyy",
			month_short: "mmm",
			month: "mmmm yyyy",
			full_short: "mmm d",
			full: "mmmm d',' yyyy",
			time_short: "h:MM:ss TT",
			time_no_seconds_short: "h:MM TT",
			time_no_seconds_small_date: "h:MM TT'<br/><small>'mmmm d',' yyyy'</small>'",
			full_long: "mmm d',' yyyy 'at' h:MM TT",
			full_long_small_date: "h:MM TT'<br/><small>mmm d',' yyyy'</small>'"
		},
		messages: {
			loading_timeline: "Loading Timeline... ",
			return_to_title: "Return to Title",
			expand_timeline: "Expand Timeline",
			contract_timeline: "Contract Timeline",
			wikipedia: "From Wikipedia, the free encyclopedia",
			loading_content: "Loading Content",
			loading: "Loading"
		}
	}
};

/* **********************************************
     Begin VMM.ExternalAPI.js
********************************************** */

/* External API
================================================== */
if(typeof VMM != 'undefined' && typeof VMM.ExternalAPI == 'undefined') {

	VMM.ExternalAPI = ({

		keys: {
			google:				"",
			flickr:				"",
			twitter:			""
		},

		keys_master: {
			vp:			"Pellentesque nibh felis, eleifend id, commodo in, interdum vitae, leo",
			flickr:		"RAIvxHY4hE/Elm5cieh4X5ptMyDpj7MYIxziGxi0WGCcy1s+yr7rKQ==",
			google:		"jwNGnYw4hE9lmAez4ll0QD+jo6SKBJFknkopLS4FrSAuGfIwyj57AusuR0s8dAo=",
			twitter:	""
		},

		init: function() {
			return this;
		},

		setKeys: function(d) {
			VMM.ExternalAPI.keys	= d;
		},

		pushQues: function() {

			if (VMM.master_config.googlemaps.active) {
				VMM.ExternalAPI.googlemaps.pushQue();
			}
			if (VMM.master_config.youtube.active) {
				VMM.ExternalAPI.youtube.pushQue();
			}
			if (VMM.master_config.soundcloud.active) {
				VMM.ExternalAPI.soundcloud.pushQue();
			}
			if (VMM.master_config.googledocs.active) {
				VMM.ExternalAPI.googledocs.pushQue();
			}
			if (VMM.master_config.googleplus.active) {
				VMM.ExternalAPI.googleplus.pushQue();
			}
			if (VMM.master_config.wikipedia.active) {
				VMM.ExternalAPI.wikipedia.pushQue();
			}
			if (VMM.master_config.vimeo.active) {
				VMM.ExternalAPI.vimeo.pushQue();
			}
			if (VMM.master_config.vine.active) {
				VMM.ExternalAPI.vine.pushQue();
			}
			if (VMM.master_config.twitter.active) {
				VMM.ExternalAPI.twitter.pushQue();
			}
			if (VMM.master_config.flickr.active) {
				VMM.ExternalAPI.flickr.pushQue();
			}
			if (VMM.master_config.webthumb.active) {
				VMM.ExternalAPI.webthumb.pushQue();
			}
		},

		twitter: {
			tweetArray: [],

			get: function(m) {
				var tweet = {mid: m.id, id: m.uid};
				VMM.master_config.twitter.que.push(tweet);
				VMM.master_config.twitter.active = true;
				//VMM.master_config.api.pushques.push(VMM.ExternalAPI.twitter.pushQue);

			},

			create: function(tweet, callback) {

				var id				= tweet.mid.toString(),
					error_obj		= { twitterid: tweet.mid },
					the_url			= "http://api.twitter.com/1/statuses/show.json?id=" + tweet.mid + "&include_entities=true&callback=?";
					//twitter_timeout	= setTimeout(VMM.ExternalAPI.twitter.errorTimeOut, VMM.master_config.timers.api, tweet),
					//callback_timeout= setTimeout(callback, VMM.master_config.timers.api, tweet);

				VMM.ExternalAPI.twitter.getOEmbed(tweet, callback);

				/*
				// Disabled thanks to twitter's new api

				VMM.getJSON(the_url, function(d) {
					var id		= d.id_str,
						twit	= "<blockquote><p>",
						td		= VMM.Util.linkify_with_twitter(d.text, "_blank");

					//	TWEET CONTENT
					twit += td;
					twit += "</p></blockquote>";

					//	TWEET MEDIA
					if (typeof d.entities.media != 'undefined') {
						if (d.entities.media[0].type == "photo") {
							//twit += "<img src=' " + d.entities.media[0].media_url + "'  alt=''>"
						}
					}

					//	TWEET AUTHOR
					twit += "<div class='vcard author'>";
					twit += "<a class='screen-name url' href='https://twitter.com/" + d.user.screen_name + "' data-screen-name='" + d.user.screen_name + "' target='_blank'>";
					twit += "<span class='avatar'><img src=' " + d.user.profile_image_url + "'  alt=''></span>";
					twit += "<span class='fn'>" + d.user.name + "</span>";
					twit += "<span class='nickname'>@" + d.user.screen_name + "<span class='thumbnail-inline'></span></span>";
					twit += "</a>";
					twit += "</div>";



					VMM.attachElement("#"+tweet.id.toString(), twit );
					VMM.attachElement("#text_thumb_"+tweet.id.toString(), d.text );
					VMM.attachElement("#marker_content_" + tweet.id.toString(), d.text );

				})
				.error(function(jqXHR, textStatus, errorThrown) {
					trace("TWITTER error");
					trace("TWITTER ERROR: " + textStatus + " " + jqXHR.responseText);
					VMM.attachElement("#"+tweet.id, VMM.MediaElement.loadingmessage("ERROR LOADING TWEET " + tweet.mid) );
				})
				.success(function(d) {
					clearTimeout(twitter_timeout);
					clearTimeout(callback_timeout);
					callback();
				});

				*/
			},

			errorTimeOut: function(tweet) {
				trace("TWITTER JSON ERROR TIMEOUT " + tweet.mid);
				VMM.attachElement("#"+tweet.id.toString(), VMM.MediaElement.loadingmessage("Still waiting on Twitter: " + tweet.mid) );
				// CHECK RATE STATUS
				VMM.getJSON("http://api.twitter.com/1/account/rate_limit_status.json", function(d) {
					trace("REMAINING TWITTER API CALLS " + d.remaining_hits);
					trace("TWITTER RATE LIMIT WILL RESET AT " + d.reset_time);
					var mes = "";
					if (d.remaining_hits == 0) {
						mes		= 	"<p>You've reached the maximum number of tweets you can load in an hour.</p>";
						mes 	+=	"<p>You can view tweets again starting at: <br/>" + d.reset_time + "</p>";
					} else {
						mes		=	"<p>Still waiting on Twitter. " + tweet.mid + "</p>";
						//mes 	= 	"<p>Tweet " + id + " was not found.</p>";
					}
					VMM.attachElement("#"+tweet.id.toString(), VMM.MediaElement.loadingmessage(mes) );
				});

			},

			errorTimeOutOembed: function(tweet) {
				trace("TWITTER JSON ERROR TIMEOUT " + tweet.mid);
				VMM.attachElement("#"+tweet.id.toString(), VMM.MediaElement.loadingmessage("Still waiting on Twitter: " + tweet.mid) );
			},

			pushQue: function() {
				if (VMM.master_config.twitter.que.length > 0) {
					VMM.ExternalAPI.twitter.create(VMM.master_config.twitter.que[0], VMM.ExternalAPI.twitter.pushQue);
					VMM.master_config.twitter.que.remove(0);
				}
			},

			getOEmbed: function(tweet, callback) {

				var the_url = "http://api.twitter.com/1/statuses/oembed.json?id=" + tweet.mid + "&omit_script=true&include_entities=true&callback=?",
					twitter_timeout	= setTimeout(VMM.ExternalAPI.twitter.errorTimeOutOembed, VMM.master_config.timers.api, tweet);
					//callback_timeout= setTimeout(callback, VMM.master_config.timers.api, tweet);

				VMM.getJSON(the_url, function(d) {
					var twit	= "",
						tuser	= "";


					//	TWEET CONTENT
					twit += d.html.split("<\/p>\&mdash;")[0] + "</p></blockquote>";
					tuser = d.author_url.split("twitter.com\/")[1];


					//	TWEET AUTHOR
					twit += "<div class='vcard author'>";
					twit += "<a class='screen-name url' href='" + d.author_url + "' target='_blank'>";
					twit += "<span class='avatar'></span>";
					twit += "<span class='fn'>" + d.author_name + "</span>";
					twit += "<span class='nickname'>@" + tuser + "<span class='thumbnail-inline'></span></span>";
					twit += "</a>";
					twit += "</div>";

					VMM.attachElement("#"+tweet.id.toString(), twit );
					VMM.attachElement("#text_thumb_"+tweet.id.toString(), d.html );
					VMM.attachElement("#marker_content_" + tweet.id.toString(), d.html );
				})
				.error(function(jqXHR, textStatus, errorThrown) {
					trace("TWITTER error");
					trace("TWITTER ERROR: " + textStatus + " " + jqXHR.responseText);
					clearTimeout(twitter_timeout);
					//clearTimeout(callback_timeout);
					VMM.attachElement("#"+tweet.id, VMM.MediaElement.loadingmessage("ERROR LOADING TWEET " + tweet.mid) );
				})
				.success(function(d) {
					clearTimeout(twitter_timeout);
					clearTimeout(callback_timeout);
					callback();
				});

			},

			getHTML: function(id) {
				//var the_url = document.location.protocol + "//api.twitter.com/1/statuses/oembed.json?id=" + id+ "&callback=?";
				var the_url = "http://api.twitter.com/1/statuses/oembed.json?id=" + id+ "&omit_script=true&include_entities=true&callback=?";
				VMM.getJSON(the_url, VMM.ExternalAPI.twitter.onJSONLoaded);
			},

			onJSONLoaded: function(d) {
				trace("TWITTER JSON LOADED");
				var id = d.id;
				VMM.attachElement("#"+id, VMM.Util.linkify_with_twitter(d.html) );
			},

			parseTwitterDate: function(d) {
				var date = new Date(Date.parse(d));
				/*
				var t = d.replace(/(\d{1,2}[:]\d{2}[:]\d{2}) (.*)/, '$2 $1');
				t = t.replace(/(\+\S+) (.*)/, '$2 $1');
				var date = new Date(Date.parse(t)).toLocaleDateString();
				var time = new Date(Date.parse(t)).toLocaleTimeString();
				*/
				return date;
			},

			prettyParseTwitterDate: function(d) {
				var date = new Date(Date.parse(d));
				return VMM.Date.prettyDate(date, true);
			},

			getTweets: function(tweets) {
				var tweetArray = [];
				var number_of_tweets = tweets.length;

				for(var i = 0; i < tweets.length; i++) {

					var twitter_id = "";


					/* FIND THE TWITTER ID
					================================================== */
					if (tweets[i].tweet.match("status\/")) {
						twitter_id = tweets[i].tweet.split("status\/")[1];
					} else if (tweets[i].tweet.match("statuses\/")) {
						twitter_id = tweets[i].tweet.split("statuses\/")[1];
					} else {
						twitter_id = "";
					}

					/* FETCH THE DATA
					================================================== */
					var the_url = "http://api.twitter.com/1/statuses/show.json?id=" + twitter_id + "&include_entities=true&callback=?";
					VMM.getJSON(the_url, function(d) {

						var tweet = {}
						/* FORMAT RESPONSE
						================================================== */
						var twit = "<div class='twitter'><blockquote><p>";
						var td = VMM.Util.linkify_with_twitter(d.text, "_blank");
						twit += td;
						twit += "</p>";

						twit += "— " + d.user.name + " (<a href='https://twitter.com/" + d.user.screen_name + "'>@" + d.user.screen_name + "</a>) <a href='https://twitter.com/" + d.user.screen_name + "/status/" + d.id + "'>" + VMM.ExternalAPI.twitter.prettyParseTwitterDate(d.created_at) + " </a></blockquote></div>";

						tweet.content = twit;
						tweet.raw = d;

						tweetArray.push(tweet);


						/* CHECK IF THATS ALL OF THEM
						================================================== */
						if (tweetArray.length == number_of_tweets) {
							var the_tweets = {tweetdata: tweetArray}
							VMM.fireEvent(global, "TWEETSLOADED", the_tweets);
						}
					})
					.success(function() { trace("second success"); })
					.error(function() { trace("error"); })
					.complete(function() { trace("complete"); });

				}


			},

			getTweetSearch: function(tweets, number_of_tweets) {
				var _number_of_tweets = 40;
				if (number_of_tweets != null && number_of_tweets != "") {
					_number_of_tweets = number_of_tweets;
				}

				var the_url = "http://search.twitter.com/search.json?q=" + tweets + "&rpp=" + _number_of_tweets + "&include_entities=true&result_type=mixed";
				var tweetArray = [];
				VMM.getJSON(the_url, function(d) {

					/* FORMAT RESPONSE
					================================================== */
					for(var i = 0; i < d.results.length; i++) {
						var tweet = {}
						var twit = "<div class='twitter'><blockquote><p>";
						var td = VMM.Util.linkify_with_twitter(d.results[i].text, "_blank");
						twit += td;
						twit += "</p>";
						twit += "— " + d.results[i].from_user_name + " (<a href='https://twitter.com/" + d.results[i].from_user + "'>@" + d.results[i].from_user + "</a>) <a href='https://twitter.com/" + d.results[i].from_user + "/status/" + d.id + "'>" + VMM.ExternalAPI.twitter.prettyParseTwitterDate(d.results[i].created_at) + " </a></blockquote></div>";
						tweet.content = twit;
						tweet.raw = d.results[i];
						tweetArray.push(tweet);
					}
					var the_tweets = {tweetdata: tweetArray}
					VMM.fireEvent(global, "TWEETSLOADED", the_tweets);
				});

			},

			prettyHTML: function(id, secondary) {
				var id = id.toString();
				var error_obj = {
					twitterid: id
				};
				var the_url = "http://api.twitter.com/1/statuses/show.json?id=" + id + "&include_entities=true&callback=?";
				var twitter_timeout = setTimeout(VMM.ExternalAPI.twitter.errorTimeOut, VMM.master_config.timers.api, id);

				VMM.getJSON(the_url, VMM.ExternalAPI.twitter.formatJSON)
					.error(function(jqXHR, textStatus, errorThrown) {
						trace("TWITTER error");
						trace("TWITTER ERROR: " + textStatus + " " + jqXHR.responseText);
						VMM.attachElement("#twitter_"+id, "<p>ERROR LOADING TWEET " + id + "</p>" );
					})
					.success(function(d) {
						clearTimeout(twitter_timeout);
						if (secondary) {
							VMM.ExternalAPI.twitter.secondaryMedia(d);
						}
					});
			},



			formatJSON: function(d) {
				var id = d.id_str;

				var twit = "<blockquote><p>";
				var td = VMM.Util.linkify_with_twitter(d.text, "_blank");
				//td = td.replace(/(@([\w]+))/g,"<a href='http://twitter.com/$2' target='_blank'>$1</a>");
				//td = td.replace(/(#([\w]+))/g,"<a href='http://twitter.com/#search?q=%23$2' target='_blank'>$1</a>");
				twit += td;
				twit += "</p></blockquote>";
				//twit += " <a href='https://twitter.com/" + d.user.screen_name + "/status/" + d.id_str + "' target='_blank' alt='link to original tweet' title='link to original tweet'>" + "<span class='created-at'></span>" + " </a>";

				twit += "<div class='vcard author'>";
				twit += "<a class='screen-name url' href='https://twitter.com/" + d.user.screen_name + "' data-screen-name='" + d.user.screen_name + "' target='_blank'>";
				twit += "<span class='avatar'><img src=' " + d.user.profile_image_url + "'  alt=''></span>";
				twit += "<span class='fn'>" + d.user.name + "</span>";
				twit += "<span class='nickname'>@" + d.user.screen_name + "<span class='thumbnail-inline'></span></span>";
				twit += "</a>";
				twit += "</div>";

				if (typeof d.entities.media != 'undefined') {
					if (d.entities.media[0].type == "photo") {
						twit += "<img src=' " + d.entities.media[0].media_url + "'  alt=''>"
					}
				}

				VMM.attachElement("#twitter_"+id.toString(), twit );
				VMM.attachElement("#text_thumb_"+id.toString(), d.text );

			}


		},

		googlemaps: {

			maptype: "toner",

			setMapType: function(d) {
				if (d != "") {
					VMM.ExternalAPI.googlemaps.maptype = d;
				}
			},

			get: function(m) {
				var timer,
					api_key,
					map_url;

				m.vars = VMM.Util.getUrlVars(m.id);

				if (VMM.ExternalAPI.keys.google != "") {
					api_key = VMM.ExternalAPI.keys.google;
				} else {
					api_key = Aes.Ctr.decrypt(VMM.ExternalAPI.keys_master.google, VMM.ExternalAPI.keys_master.vp, 256);
				}


				/*
					Investigating a google map api change on the latest release that causes custom map types to stop working
					http://stackoverflow.com/questions/13486271/google-map-markermanager-cannot-call-method-substr-of-undefined
					soulution is to use api ver 3.9
				*/
				map_url = "http://maps.googleapis.com/maps/api/js?key=" + api_key + "&v=3.9&libraries=places&sensor=false&callback=VMM.ExternalAPI.googlemaps.onMapAPIReady";

				if (VMM.master_config.googlemaps.active) {
					VMM.master_config.googlemaps.que.push(m);
				} else {
					VMM.master_config.googlemaps.que.push(m);

					if (VMM.master_config.googlemaps.api_loaded) {

					} else {
						LoadLib.js(map_url, function() {
							trace("Google Maps API Library Loaded");
						});
					}
				}
			},

			create: function(m) {
				VMM.ExternalAPI.googlemaps.createAPIMap(m);
			},

			createiFrameMap: function(m) {
				var embed_url		= m.id + "&output=embed",
					mc				= "",
					unique_map_id	= m.uid.toString() + "_gmap";

				mc				+= "<div class='google-map' id='" + unique_map_id + "' style='width=100%;height=100%;'>";
				mc				+= "<iframe width='100%' height='100%' frameborder='0' scrolling='no' marginheight='0' marginwidth='0' src='" + embed_url + "'></iframe>";
				mc				+= "</div>";

				VMM.attachElement("#" + m.uid, mc);

			},

			createAPIMap: function(m) {
				var map_attribution	= "",
					layer,
					map,
					map_options,
					unique_map_id			= m.uid.toString() + "_gmap",
					map_attribution_html	= "",
					location				= new google.maps.LatLng(41.875696,-87.624207),
					latlong,
					zoom					= 11,
					has_location			= false,
					has_zoom				= false,
					api_limit				= false,
					map_bounds;


				function mapProvider(name) {
					if (name in VMM.ExternalAPI.googlemaps.map_providers) {
						map_attribution = VMM.ExternalAPI.googlemaps.map_attribution[VMM.ExternalAPI.googlemaps.map_providers[name].attribution];
						return VMM.ExternalAPI.googlemaps.map_providers[name];
					} else {
						if (VMM.ExternalAPI.googlemaps.defaultType(name)) {
							trace("GOOGLE MAP DEFAULT TYPE");
							return google.maps.MapTypeId[name.toUpperCase()];
						} else {
							trace("Not a maptype: " + name );
						}
					}
				}

				google.maps.VeriteMapType = function(name) {
					if (VMM.ExternalAPI.googlemaps.defaultType(name)) {
						return google.maps.MapTypeId[name.toUpperCase()];
					} else {
						var provider = 			mapProvider(name);
						return google.maps.ImageMapType.call(this, {
							"getTileUrl": function(coord, zoom) {
								var index = 	(zoom + coord.x + coord.y) % VMM.ExternalAPI.googlemaps.map_subdomains.length;
								return [
									provider.url
										.replace("{S}", VMM.ExternalAPI.googlemaps.map_subdomains[index])
										.replace("{Z}", zoom)
										.replace("{X}", coord.x)
										.replace("{Y}", coord.y)
										.replace("{z}", zoom)
										.replace("{x}", coord.x)
										.replace("{y}", coord.y)
								];
							},
							"tileSize": 		new google.maps.Size(256, 256),
							"name":				name,
							"minZoom":			provider.minZoom,
							"maxZoom":			provider.maxZoom
						});
					}
				};

				google.maps.VeriteMapType.prototype = new google.maps.ImageMapType("_");

				/* Make the Map
				================================================== */

				if (VMM.ExternalAPI.googlemaps.maptype != "") {
					if (VMM.ExternalAPI.googlemaps.defaultType(VMM.ExternalAPI.googlemaps.maptype)) {
						layer				=	google.maps.MapTypeId[VMM.ExternalAPI.googlemaps.maptype.toUpperCase()];
					} else {
						layer				=	VMM.ExternalAPI.googlemaps.maptype;
					}
				} else {
					layer					=	"toner";
				}


				if (type.of(VMM.Util.getUrlVars(m.id)["ll"]) == "string") {
					has_location			= true;
					latlong					= VMM.Util.getUrlVars(m.id)["ll"].split(",");
					location				= new google.maps.LatLng(parseFloat(latlong[0]),parseFloat(latlong[1]));

				} else if (type.of(VMM.Util.getUrlVars(m.id)["sll"]) == "string") {
					latlong					= VMM.Util.getUrlVars(m.id)["sll"].split(",");
					location				= new google.maps.LatLng(parseFloat(latlong[0]),parseFloat(latlong[1]));
				}

				if (type.of(VMM.Util.getUrlVars(m.id)["z"]) == "string") {
					has_zoom				=	true;
					zoom					=	parseFloat(VMM.Util.getUrlVars(m.id)["z"]);
				}

				map_options = {
					zoom:						zoom,
					draggable: 					false,
					disableDefaultUI:			true,
					mapTypeControl:				false,
					zoomControl:				true,
					zoomControlOptions: {
						style:					google.maps.ZoomControlStyle.SMALL,
						position:				google.maps.ControlPosition.TOP_RIGHT
					},
					center: 					location,
					mapTypeId:					layer,
					mapTypeControlOptions: {
				        mapTypeIds:				[layer]
				    }
				}

				VMM.attachElement("#" + m.uid, "<div class='google-map' id='" + unique_map_id + "' style='width=100%;height=100%;'></div>");

				map		= new google.maps.Map(document.getElementById(unique_map_id), map_options);

				if (VMM.ExternalAPI.googlemaps.defaultType(VMM.ExternalAPI.googlemaps.maptype)) {

				} else {
					map.mapTypes.set(layer, new google.maps.VeriteMapType(layer));
					// ATTRIBUTION
					map_attribution_html =	"<div class='map-attribution'><div class='attribution-text'>" + map_attribution + "</div></div>";
					VMM.appendElement("#"+unique_map_id, map_attribution_html);
				}

				// DETERMINE IF KML IS POSSIBLE
				if (type.of(VMM.Util.getUrlVars(m.id)["msid"]) == "string") {
					loadKML();
				} else {
					//loadPlaces();
					if (type.of(VMM.Util.getUrlVars(m.id)["q"]) == "string") {
						geocodePlace();
					}
				}

				// GEOCODE
				function geocodePlace() {



					var geocoder	= new google.maps.Geocoder(),
						address		= VMM.Util.getUrlVars(m.id)["q"],
						marker;

					if (address.match("loc:")) {
						var address_latlon = address.split(":")[1].split("+");
						location = new google.maps.LatLng(parseFloat(address_latlon[0]),parseFloat(address_latlon[1]));
						has_location = true;
					}

					geocoder.geocode( { 'address': address}, function(results, status) {
						if (status == google.maps.GeocoderStatus.OK) {

							marker = new google.maps.Marker({
								map: map,
								position: results[0].geometry.location
							});

							// POSITION MAP
							//map.setCenter(results[0].geometry.location);
							//map.panTo(location);
							if (typeof results[0].geometry.viewport != 'undefined') {
								map.fitBounds(results[0].geometry.viewport);
							} else if (typeof results[0].geometry.bounds != 'undefined') {
								map.fitBounds(results[0].geometry.bounds);
							} else {
								map.setCenter(results[0].geometry.location);
							}

							if (has_location) {
								map.panTo(location);
							}
							if (has_zoom) {
								map.setZoom(zoom);
							}

						} else {
							trace("Geocode for " + address + " was not successful for the following reason: " + status);
							trace("TRYING PLACES SEARCH");

							if (has_location) {
								map.panTo(location);
							}
							if (has_zoom) {
								map.setZoom(zoom);
							}

							loadPlaces();
						}
					});
				}

				// PLACES
				function loadPlaces() {
					var place,
						search_request,
						infowindow,
						search_bounds,
						bounds_sw,
						bounds_ne;

					place_search	= new google.maps.places.PlacesService(map);
					infowindow		= new google.maps.InfoWindow();

					search_request = {
						query:		"",
						types:		['country', 'neighborhood', 'political', 'locality', 'geocode']
					};

					if (type.of(VMM.Util.getUrlVars(m.id)["q"]) == "string") {
						search_request.query	= VMM.Util.getUrlVars(m.id)["q"];
					}

					if (has_location) {
						search_request.location	= location;
						search_request.radius	= "15000";
					} else {
						bounds_sw = new google.maps.LatLng(-89.999999,-179.999999);
						bounds_ne = new google.maps.LatLng(89.999999,179.999999);
						search_bounds = new google.maps.LatLngBounds(bounds_sw,bounds_ne);

						//search_request.location	= search_bounds;
					}

					place_search.textSearch(search_request, placeResults);

					function placeResults(results, status) {

						if (status == google.maps.places.PlacesServiceStatus.OK) {

							for (var i = 0; i < results.length; i++) {
								//createMarker(results[i]);
							}

							if (has_location) {
								map.panTo(location);
							} else {
								if (results.length >= 1) {
									map.panTo(results[0].geometry.location);
									if (has_zoom) {
										map.setZoom(zoom);
									}
								}
							}


						} else {
							trace("Place search for " + search_request.query + " was not successful for the following reason: " + status);
							// IF There's a problem loading the map, load a simple iFrame version instead
							trace("YOU MAY NEED A GOOGLE MAPS API KEY IN ORDER TO USE THIS FEATURE OF TIMELINEJS");
							trace("FIND OUT HOW TO GET YOUR KEY HERE: https://developers.google.com/places/documentation/#Authentication");


							if (has_location) {
								map.panTo(location);
								if (has_zoom) {
									map.setZoom(zoom);
								}
							} else {
								trace("USING SIMPLE IFRAME MAP EMBED");
								if (m.id[0].match("https")) {
									m.id = m.url[0].replace("https", "http");
								}
								VMM.ExternalAPI.googlemaps.createiFrameMap(m);
							}

						}

					}

					function createMarker(place) {
						var marker, placeLoc;

						placeLoc = place.geometry.location;
						marker = new google.maps.Marker({
							map: map,
							position: place.geometry.location
						});

						google.maps.event.addListener(marker, 'click', function() {
							infowindow.setContent(place.name);
							infowindow.open(map, this);
						});
					}

				}

				function loadPlacesAlt() {
					var api_key,
						places_url,
						has_key		= false;

					trace("LOADING PLACES API FOR GOOGLE MAPS");

					if (VMM.ExternalAPI.keys.google != "") {
						api_key	= VMM.ExternalAPI.keys.google;
						has_key	= true;
					} else {
						trace("YOU NEED A GOOGLE MAPS API KEY IN ORDER TO USE THIS FEATURE OF TIMELINEJS");
						trace("FIND OUT HOW TO GET YOUR KEY HERE: https://developers.google.com/places/documentation/#Authentication");
					}

					places_url		= "https://maps.googleapis.com/maps/api/place/textsearch/json?key=" + api_key + "&sensor=false&language=" + m.lang + "&";

					if (type.of(VMM.Util.getUrlVars(m.id)["q"]) == "string") {
						places_url	+= "query=" + VMM.Util.getUrlVars(m.id)["q"];
					}

					if (has_location) {
						places_url	+= "&location=" + location;
					}

					if (has_key) {
						VMM.getJSON(places_url, function(d) {
							trace("PLACES JSON");

							var places_location 	= "",
								places_bounds		= "",
								places_bounds_ne	= "",
								places_bounds_sw	= "";

							trace(d);

							if (d.status == "OVER_QUERY_LIMIT") {
								trace("OVER_QUERY_LIMIT");
								if (has_location) {
									map.panTo(location);
									if (has_zoom) {
										map.setZoom(zoom);
									}
								} else {
									trace("DOING TRADITIONAL MAP IFRAME EMBED UNTIL QUERY LIMIT RESTORED");
									api_limit = true;
									VMM.ExternalAPI.googlemaps.createiFrameMap(m);
								}

							} else {
								if (d.results.length >= 1) {
									//location = new google.maps.LatLng(parseFloat(d.results[0].geometry.location.lat),parseFloat(d.results[0].geometry.location.lng));
									//map.panTo(location);

									places_bounds_ne	= new google.maps.LatLng(parseFloat(d.results[0].geometry.viewport.northeast.lat),parseFloat(d.results[0].geometry.viewport.northeast.lng));
									places_bounds_sw	= new google.maps.LatLng(parseFloat(d.results[0].geometry.viewport.southwest.lat),parseFloat(d.results[0].geometry.viewport.southwest.lng));

									places_bounds = new google.maps.LatLngBounds(places_bounds_sw, places_bounds_ne)
									map.fitBounds(places_bounds);

								} else {
									trace("NO RESULTS");
								}

								if (has_location) {
									map.panTo(location);
								}
								if (has_zoom) {
									map.setZoom(zoom);
								}
							}

						})
						.error(function(jqXHR, textStatus, errorThrown) {
							trace("PLACES JSON ERROR");
							trace("PLACES JSON ERROR: " + textStatus + " " + jqXHR.responseText);
						})
						.success(function(d) {
							trace("PLACES JSON SUCCESS");
						});
					} else {
						if (has_location) {
							map.panTo(location);
							if (has_zoom) {
								map.setZoom(zoom);
							}
						} else {
							trace("DOING TRADITIONAL MAP IFRAME EMBED BECAUSE NO GOOGLE MAP API KEY WAS PROVIDED");
							VMM.ExternalAPI.googlemaps.createiFrameMap(m);
						}
					}


				}

				// KML
				function loadKML() {
					var kml_url, kml_layer, infowindow, text;

					kml_url				= m.id + "&output=kml";
					kml_url				= kml_url.replace("&output=embed", "");
					kml_layer			= new google.maps.KmlLayer(kml_url, {preserveViewport:true});
					infowindow			= new google.maps.InfoWindow();
					kml_layer.setMap(map);

					google.maps.event.addListenerOnce(kml_layer, "defaultviewport_changed", function() {

						if (has_location) {
							map.panTo(location);
						} else {
							map.fitBounds(kml_layer.getDefaultViewport() );
						}
						if (has_zoom) {
							map.setZoom(zoom);
						}
					});

					google.maps.event.addListener(kml_layer, 'click', function(kmlEvent) {
						text			= kmlEvent.featureData.description;
						showInfoWindow(text);

						function showInfoWindow(c) {
							infowindow.setContent(c);
							infowindow.open(map);
						}
					});
				}


			},

			pushQue: function() {
				for(var i = 0; i < VMM.master_config.googlemaps.que.length; i++) {
					VMM.ExternalAPI.googlemaps.create(VMM.master_config.googlemaps.que[i]);
				}
				VMM.master_config.googlemaps.que = [];
			},

			onMapAPIReady: function() {
				VMM.master_config.googlemaps.map_active = true;
				VMM.master_config.googlemaps.places_active = true;
				VMM.ExternalAPI.googlemaps.onAPIReady();
			},

			onPlacesAPIReady: function() {
				VMM.master_config.googlemaps.places_active = true;
				VMM.ExternalAPI.googlemaps.onAPIReady();
			},

			onAPIReady: function() {
				if (!VMM.master_config.googlemaps.active) {
					if (VMM.master_config.googlemaps.map_active && VMM.master_config.googlemaps.places_active) {
						VMM.master_config.googlemaps.active = true;
						VMM.ExternalAPI.googlemaps.pushQue();
					}
				}
			},

			defaultType: function(name) {
				if (name.toLowerCase() == "satellite" || name.toLowerCase() == "hybrid" || name.toLowerCase() == "terrain" || name.toLowerCase() == "roadmap") {
					return true;
				} else {
					return false;
				}
			},

			map_subdomains: ["", "a.", "b.", "c.", "d."],

			map_attribution: {
				"stamen": 			"Map tiles by <a href='http://stamen.com'>Stamen Design</a>, under <a href='http://creativecommons.org/licenses/by/3.0'>CC BY 3.0</a>. Data by <a href='http://openstreetmap.org'>OpenStreetMap</a>, under <a href='http://creativecommons.org/licenses/by-sa/3.0'>CC BY SA</a>.",
				"apple": 			"Map data &copy; 2012  Apple, Imagery &copy; 2012 Apple"
			},

			map_providers: {
				"toner": {
					"url": 			"http://{S}tile.stamen.com/toner/{Z}/{X}/{Y}.png",
					"minZoom": 		0,
					"maxZoom": 		20,
					"attribution": 	"stamen"

				},
				"toner-lines": {
					"url": 			"http://{S}tile.stamen.com/toner-lines/{Z}/{X}/{Y}.png",
					"minZoom": 		0,
					"maxZoom": 		20,
					"attribution": 	"stamen"
				},
				"toner-labels": {
					"url": 			"http://{S}tile.stamen.com/toner-labels/{Z}/{X}/{Y}.png",
					"minZoom": 		0,
					"maxZoom": 		20,
					"attribution": 	"stamen"
				},
				"sterrain": {
					"url": 			"http://{S}tile.stamen.com/terrain/{Z}/{X}/{Y}.jpg",
					"minZoom": 		4,
					"maxZoom": 		20,
					"attribution": 	"stamen"
				},
				"apple": {
					"url": 			"http://gsp2.apple.com/tile?api=1&style=slideshow&layers=default&lang=en_US&z={z}&x={x}&y={y}&v=9",
					"minZoom": 		4,
					"maxZoom": 		14,
					"attribution": 	"apple"
				},
				"watercolor": {
					"url": 			"http://{S}tile.stamen.com/watercolor/{Z}/{X}/{Y}.jpg",
					"minZoom": 		3,
					"maxZoom": 		16,
					"attribution": 	"stamen"
				}
			}
		},

		googleplus: {

			get: function(m) {
				var api_key;
				var gplus = {user: m.user, activity: m.id, id: m.uid};

				VMM.master_config.googleplus.que.push(gplus);
				VMM.master_config.googleplus.active = true;
			},

			create: function(gplus, callback) {
				var mediaElem			= "",
					api_key				= "",
					g_activity			= "",
					g_content			= "",
					g_attachments		= "",
					gperson_api_url,
					gactivity_api_url;
					googleplus_timeout	= setTimeout(VMM.ExternalAPI.googleplus.errorTimeOut, VMM.master_config.timers.api, gplus),
					callback_timeout	= setTimeout(callback, VMM.master_config.timers.api, gplus);


				if (VMM.master_config.Timeline.api_keys.google != "") {
					api_key = VMM.master_config.Timeline.api_keys.google;
				} else {
					api_key = Aes.Ctr.decrypt(VMM.master_config.api_keys_master.google, VMM.master_config.vp, 256);
				}

				gperson_api_url = "https://www.googleapis.com/plus/v1/people/" + gplus.user + "/activities/public?alt=json&maxResults=100&fields=items(id,url)&key=" + api_key;

				//mediaElem	=	"<iframe class='doc' frameborder='0' width='100%' height='100%' src='" + gplus.url + "&amp;embedded=true'></iframe>";
				mediaElem = "GOOGLE PLUS API CALL";

				VMM.getJSON(gperson_api_url, function(p_data) {
					for(var i = 0; i < p_data.items.length; i++) {
						trace("loop");
						if (p_data.items[i].url.split("posts/")[1] == gplus.activity) {
							trace("FOUND IT!!");

							g_activity = p_data.items[i].id;
							gactivity_api_url = "https://www.googleapis.com/plus/v1/activities/" + g_activity + "?alt=json&key=" + api_key;

							VMM.getJSON(gactivity_api_url, function(a_data) {
								trace(a_data);
								//a_data.url
								//a_data.image.url
								//a_data.actor.displayName
								//a_data.provider.title
								//a_data.object.content

								//g_content		+=	"<h4>" + a_data.title + "</h4>";

								if (typeof a_data.annotation != 'undefined') {
									g_content	+=	"<div class='googleplus-annotation'>'" + a_data.annotation + "</div>";
									g_content	+=	a_data.object.content;
								} else {
									g_content	+=	a_data.object.content;
								}

								if (typeof a_data.object.attachments != 'undefined') {

									//g_attachments	+=	"<div class='googleplus-attachemnts'>";

									for(var k = 0; k < a_data.object.attachments.length; k++) {
										if (a_data.object.attachments[k].objectType == "photo") {
											g_attachments	=	"<a href='" + a_data.object.url + "' target='_blank'>" + "<img src='" + a_data.object.attachments[k].image.url + "' class='article-thumb'></a>" + g_attachments;
										} else if (a_data.object.attachments[k].objectType == "video") {
											g_attachments	=	"<img src='" + a_data.object.attachments[k].image.url + "' class='article-thumb'>" + g_attachments;
											g_attachments	+=	"<div>";
											g_attachments	+=	"<a href='" + a_data.object.attachments[k].url + "' target='_blank'>"
											g_attachments	+=	"<h5>" + a_data.object.attachments[k].displayName + "</h5>";
											//g_attachments	+=	"<p>" + a_data.object.attachments[k].content + "</p>";
											g_attachments	+=	"</a>";
											g_attachments	+=	"</div>";
										} else if (a_data.object.attachments[k].objectType == "article") {
											g_attachments	+=	"<div>";
											g_attachments	+=	"<a href='" + a_data.object.attachments[k].url + "' target='_blank'>"
											g_attachments	+=	"<h5>" + a_data.object.attachments[k].displayName + "</h5>";
											g_attachments	+=	"<p>" + a_data.object.attachments[k].content + "</p>";
											g_attachments	+=	"</a>";
											g_attachments	+=	"</div>";
										}

										trace(a_data.object.attachments[k]);
									}

									g_attachments	=	"<div class='googleplus-attachments'>" + g_attachments + "</div>";
								}

								//mediaElem		=	"<div class='googleplus'>";
								mediaElem		=	"<div class='googleplus-content'>" + g_content + g_attachments + "</div>";

								mediaElem		+=	"<div class='vcard author'><a class='screen-name url' href='" + a_data.url + "' target='_blank'>";
								mediaElem		+=	"<span class='avatar'><img src='" + a_data.actor.image.url + "' style='max-width: 32px; max-height: 32px;'></span>"
								mediaElem		+=	"<span class='fn'>" + a_data.actor.displayName + "</span>";
								mediaElem		+=	"<span class='nickname'><span class='thumbnail-inline'></span></span>";
								mediaElem		+=	"</a></div>";

								VMM.attachElement("#googleplus_" + gplus.activity, mediaElem);


							});

							break;
						}
					}



				})
				.error(function(jqXHR, textStatus, errorThrown) {
					var error_obj = VMM.parseJSON(jqXHR.responseText);
					trace(error_obj.error.message);
					VMM.attachElement("#googleplus_" + gplus.activity, VMM.MediaElement.loadingmessage("<p>ERROR LOADING GOOGLE+ </p><p>" + error_obj.error.message + "</p>"));
				})
				.success(function(d) {
					clearTimeout(googleplus_timeout);
					clearTimeout(callback_timeout);
					callback();
				});



			},

			pushQue: function() {
				if (VMM.master_config.googleplus.que.length > 0) {
					VMM.ExternalAPI.googleplus.create(VMM.master_config.googleplus.que[0], VMM.ExternalAPI.googleplus.pushQue);
					VMM.master_config.googleplus.que.remove(0);
				}
				/*
				for(var i = 0; i < VMM.master_config.googleplus.que.length; i++) {
					VMM.ExternalAPI.googleplus.create(VMM.master_config.googleplus.que[i]);
				}
				VMM.master_config.googleplus.que = [];
				*/
			},

			errorTimeOut: function(gplus) {
				trace("GOOGLE+ JSON ERROR TIMEOUT " + gplus.activity);
				VMM.attachElement("#googleplus_" + gplus.activity, VMM.MediaElement.loadingmessage("<p>Still waiting on GOOGLE+ </p><p>" + gplus.activity + "</p>"));

			}

		},

		googledocs: {

			get: function(m) {
				VMM.master_config.googledocs.que.push(m);
				VMM.master_config.googledocs.active = true;
			},

			create: function(m) {
				var mediaElem = "";
				if (m.id.match(/docs.google.com/i)) {
					mediaElem	=	"<iframe class='doc' frameborder='0' width='100%' height='100%' src='" + m.id + "&amp;embedded=true'></iframe>";
				} else {
					mediaElem	=	"<iframe class='doc' frameborder='0' width='100%' height='100%' src='" + "http://docs.google.com/viewer?url=" + m.id + "&amp;embedded=true'></iframe>";
				}
				VMM.attachElement("#"+m.uid, mediaElem);
			},

			pushQue: function() {

				for(var i = 0; i < VMM.master_config.googledocs.que.length; i++) {
					VMM.ExternalAPI.googledocs.create(VMM.master_config.googledocs.que[i]);
				}
				VMM.master_config.googledocs.que = [];
			}

		},

		flickr: {

			get: function(m) {
				VMM.master_config.flickr.que.push(m);
				VMM.master_config.flickr.active = true;
			},

			create: function(m, callback) {
				var api_key,
					callback_timeout= setTimeout(callback, VMM.master_config.timers.api, m);

				if (typeof VMM.master_config.Timeline != 'undefined' && VMM.master_config.Timeline.api_keys.flickr != "") {
					api_key = VMM.master_config.Timeline.api_keys.flickr;
				} else {
					api_key = Aes.Ctr.decrypt(VMM.master_config.api_keys_master.flickr, VMM.master_config.vp, 256)
				}
				var the_url = "http://api.flickr.com/services/rest/?method=flickr.photos.getSizes&api_key=" + api_key + "&photo_id=" + m.id + "&format=json&jsoncallback=?";

				VMM.getJSON(the_url, function(d) {
					var flickr_id = d.sizes.size[0].url.split("photos\/")[1].split("/")[1];

					var flickr_large_id = "#" + m.uid,
						flickr_thumb_id = "#" + m.uid + "_thumb";
						//flickr_thumb_id = "flickr_" + uid + "_thumb";

					var flickr_img_size,
						flickr_img_thumb,
						flickr_size_found = false,
						flickr_best_size = "Large";

					flickr_best_size = VMM.ExternalAPI.flickr.sizes(VMM.master_config.sizes.api.height);
					for(var i = 0; i < d.sizes.size.length; i++) {
						if (d.sizes.size[i].label == flickr_best_size) {

							flickr_size_found = true;
							flickr_img_size = d.sizes.size[i].source;
						}
					}
					if (!flickr_size_found) {
						flickr_img_size = d.sizes.size[d.sizes.size.length - 2].source;
					}

					flickr_img_thumb = d.sizes.size[0].source;
					VMM.Lib.attr(flickr_large_id, "src", flickr_img_size);
					//VMM.attachElement(flickr_large_id, "<a href='" + flick.link + "' target='_blank'><img src='" + flickr_img_size + "'></a>");
					VMM.attachElement(flickr_thumb_id, "<img src='" + flickr_img_thumb + "'>");

				})
				.error(function(jqXHR, textStatus, errorThrown) {
					trace("FLICKR error");
					trace("FLICKR ERROR: " + textStatus + " " + jqXHR.responseText);
				})
				.success(function(d) {
					clearTimeout(callback_timeout);
					callback();
				});

			},

			pushQue: function() {
				if (VMM.master_config.flickr.que.length > 0) {
					VMM.ExternalAPI.flickr.create(VMM.master_config.flickr.que[0], VMM.ExternalAPI.flickr.pushQue);
					VMM.master_config.flickr.que.remove(0);
				}
			},

			sizes: function(s) {
				var _size = "";
				if (s <= 75) {
					_size = "Thumbnail";
				} else if (s <= 180) {
					_size = "Small";
				} else if (s <= 240) {
					_size = "Small 320";
				} else if (s <= 375) {
					_size = "Medium";
				} else if (s <= 480) {
					_size = "Medium 640";
				} else if (s <= 600) {
					_size = "Large";
				} else {
					_size = "Large";
				}

				return _size;
			}

		},

		instagram: {
			get: function(m, thumb) {
				if (thumb) {
					return "http://instagr.am/p/" + m.id + "/media/?size=t";
				} else {
					return "http://instagr.am/p/" + m.id + "/media/?size=" + VMM.ExternalAPI.instagram.sizes(VMM.master_config.sizes.api.height);
				}
			},

			sizes: function(s) {
				var _size = "";
				if (s <= 150) {
					_size = "t";
				} else if (s <= 306) {
					_size = "m";
				} else {
					_size = "l";
				}

				return _size;
			}
		},

		soundcloud: {

			get: function(m) {
				VMM.master_config.soundcloud.que.push(m);
				VMM.master_config.soundcloud.active = true;
			},

			create: function(m, callback) {
				var the_url = "http://soundcloud.com/oembed?url=" + m.id + "&format=js&callback=?";
				VMM.getJSON(the_url, function(d) {
					VMM.attachElement("#"+m.uid, d.html);
					callback();
				});
			},

			pushQue: function() {
				if (VMM.master_config.soundcloud.que.length > 0) {
					VMM.ExternalAPI.soundcloud.create(VMM.master_config.soundcloud.que[0], VMM.ExternalAPI.soundcloud.pushQue);
					VMM.master_config.soundcloud.que.remove(0);
				}
			}

		},

		wikipedia: {

			get: function(m) {
				VMM.master_config.wikipedia.que.push(m);
				VMM.master_config.wikipedia.active = true;
			},

			create: function(m, callback) {
				var the_url = "http://" + m.lang + ".wikipedia.org/w/api.php?action=query&prop=extracts&redirects=&titles=" + m.id + "&exintro=1&format=json&callback=?";
				callback_timeout= setTimeout(callback, VMM.master_config.timers.api, m);

				if ( VMM.Browser.browser == "Explorer" && parseInt(VMM.Browser.version, 10) >= 7 && window.XDomainRequest) {
					var temp_text	=	"<h4><a href='http://" + VMM.master_config.language.api.wikipedia + ".wikipedia.org/wiki/" + m.id + "' target='_blank'>" + m.url + "</a></h4>";
					temp_text		+=	"<span class='wiki-source'>" + VMM.master_config.language.messages.wikipedia + "</span>";
					temp_text		+=	"<p>Wikipedia entry unable to load using Internet Explorer 8 or below.</p>";
					VMM.attachElement("#"+m.uid, temp_text );
				}

				VMM.getJSON(the_url, function(d) {
					if (d.query) {
						var wiki_extract,
							wiki_title,
							_wiki = "",
							wiki_text = "",
							wiki_number_of_paragraphs = 1,
							wiki_text_array = [];

						wiki_extract = VMM.Util.getObjectAttributeByIndex(d.query.pages, 0).extract;
						wiki_title = VMM.Util.getObjectAttributeByIndex(d.query.pages, 0).title;

						if (wiki_extract.match("<p>")) {
							wiki_text_array = wiki_extract.split("<p>");
						} else {
							wiki_text_array.push(wiki_extract);
						}

						for(var i = 0; i < wiki_text_array.length; i++) {
							if (i+1 <= wiki_number_of_paragraphs && i+1 < wiki_text_array.length) {
								wiki_text	+= "<p>" + wiki_text_array[i+1];
							}
						}

						_wiki		=	"<h4><a href='http://" + VMM.master_config.language.api.wikipedia + ".wikipedia.org/wiki/" + wiki_title + "' target='_blank'>" + wiki_title + "</a></h4>";
						_wiki		+=	"<span class='wiki-source'>" + VMM.master_config.language.messages.wikipedia + "</span>";
						_wiki		+=	VMM.Util.linkify_wikipedia(wiki_text);

						if (wiki_extract.match("REDIRECT")) {

						} else {
							VMM.attachElement("#"+m.uid, _wiki );
						}
					}
					//callback();
				})
				.error(function(jqXHR, textStatus, errorThrown) {
					trace("WIKIPEDIA error");
					trace("WIKIPEDIA ERROR: " + textStatus + " " + jqXHR.responseText);
					trace(errorThrown);

					VMM.attachElement("#"+m.uid, VMM.MediaElement.loadingmessage("<p>Wikipedia is not responding</p>"));
					// TRY AGAIN?
					clearTimeout(callback_timeout);
					if (VMM.master_config.wikipedia.tries < 4) {
						trace("WIKIPEDIA ATTEMPT " + VMM.master_config.wikipedia.tries);
						trace(m);
						VMM.master_config.wikipedia.tries++;
						VMM.ExternalAPI.wikipedia.create(m, callback);
					} else {
						callback();
					}

				})
				.success(function(d) {
					VMM.master_config.wikipedia.tries = 0;
					clearTimeout(callback_timeout);
					callback();
				});


			},

			pushQue: function() {

				if (VMM.master_config.wikipedia.que.length > 0) {
					trace("WIKIPEDIA PUSH QUE " + VMM.master_config.wikipedia.que.length);
					VMM.ExternalAPI.wikipedia.create(VMM.master_config.wikipedia.que[0], VMM.ExternalAPI.wikipedia.pushQue);
					VMM.master_config.wikipedia.que.remove(0);
				}

			}

		},

		youtube: {

			get: function(m) {
				var the_url = "http://gdata.youtube.com/feeds/api/videos/" + m.id + "?v=2&alt=jsonc&callback=?";

				VMM.master_config.youtube.que.push(m);

				if (!VMM.master_config.youtube.active) {
					if (!VMM.master_config.youtube.api_loaded) {
						LoadLib.js('http://www.youtube.com/player_api', function() {
							trace("YouTube API Library Loaded");
						});
					}
				}

				// THUMBNAIL
				VMM.getJSON(the_url, function(d) {
					VMM.ExternalAPI.youtube.createThumb(d, m)
				});

			},

			create: function(m) {
				if (typeof(m.start) != 'undefined') {

					var vidstart			= m.start.toString(),
						vid_start_minutes	= 0,
						vid_start_seconds	= 0;

					if (vidstart.match('m')) {
						vid_start_minutes = parseInt(vidstart.split("m")[0], 10);
						vid_start_seconds = parseInt(vidstart.split("m")[1].split("s")[0], 10);
						m.start = (vid_start_minutes * 60) + vid_start_seconds;
					} else {
						m.start = 0;
					}
				} else {
					m.start = 0;
				}

				var p = {
					active: 				false,
					player: 				{},
					name:					m.uid,
					playing:				false,
					hd:						false
				};

				if (typeof(m.hd) != 'undefined') {
					p.hd = true;
				}

				p.player[m.id] = new YT.Player(m.uid, {
					height: 				'390',
					width: 					'640',
					playerVars: {
						enablejsapi:		1,
						color: 				'white',
						showinfo:			0,
						theme:				'light',
						start:				m.start,
						rel:				0
					},
					videoId: m.id,
					events: {
						'onReady': 			VMM.ExternalAPI.youtube.onPlayerReady,
						'onStateChange': 	VMM.ExternalAPI.youtube.onStateChange
					}
				});

				VMM.master_config.youtube.array.push(p);
			},

			createThumb: function(d, m) {
				trace("CREATE THUMB");
				trace(d);
				trace(m);
				if (typeof d.data != 'undefined') {
					var thumb_id = "#" + m.uid + "_thumb";
					VMM.attachElement(thumb_id, "<img src='" + d.data.thumbnail.sqDefault + "'>");

				}
			},

			pushQue: function() {
				for(var i = 0; i < VMM.master_config.youtube.que.length; i++) {
					VMM.ExternalAPI.youtube.create(VMM.master_config.youtube.que[i]);
				}
				VMM.master_config.youtube.que = [];
			},

			onAPIReady: function() {
				VMM.master_config.youtube.active = true;
				VMM.ExternalAPI.youtube.pushQue();
			},

			stopPlayers: function() {
				for(var i = 0; i < VMM.master_config.youtube.array.length; i++) {
					if (VMM.master_config.youtube.array[i].playing) {
						var the_name = VMM.master_config.youtube.array[i].name;
						VMM.master_config.youtube.array[i].player[the_name].stopVideo();
					}
				}
			},

			onStateChange: function(e) {
				for(var i = 0; i < VMM.master_config.youtube.array.length; i++) {
					var the_name = VMM.master_config.youtube.array[i].name;
					if (VMM.master_config.youtube.array[i].player[the_name] == e.target) {
						if (e.data == YT.PlayerState.PLAYING) {
							VMM.master_config.youtube.array[i].playing = true;
							trace(VMM.master_config.youtube.array[i].hd)
							if (VMM.master_config.youtube.array[i].hd) {
								// SET TO HD
								// DOESN'T WORK AS OF NOW
								//VMM.master_config.youtube.array[i].player.setPlaybackQuality("hd720");
							}
						}
					}
				}
			},

			onPlayerReady: function(e) {

			}


		},

		vimeo: {

			get: function(m) {
				VMM.master_config.vimeo.que.push(m);
				VMM.master_config.vimeo.active = true;
			},

			create: function(m, callback) {
				trace("VIMEO CREATE");

				// THUMBNAIL
				var thumb_url	= "http://vimeo.com/api/v2/video/" + m.id + ".json",
					video_url	= "http://player.vimeo.com/video/" + m.id + "?title=0&amp;byline=0&amp;portrait=0&amp;color=ffffff";

				VMM.getJSON(thumb_url, function(d) {
					VMM.ExternalAPI.vimeo.createThumb(d, m);
					callback();
				});


				// VIDEO
				VMM.attachElement("#" + m.uid, "<iframe autostart='false' frameborder='0' width='100%' height='100%' src='" + video_url + "'></iframe>");

			},

			createThumb: function(d, m) {
				trace("VIMEO CREATE THUMB");
				var thumb_id = "#" + m.uid + "_thumb";
				VMM.attachElement(thumb_id, "<img src='" + d[0].thumbnail_small + "'>");
			},

			pushQue: function() {
				if (VMM.master_config.vimeo.que.length > 0) {
					VMM.ExternalAPI.vimeo.create(VMM.master_config.vimeo.que[0], VMM.ExternalAPI.vimeo.pushQue);
					VMM.master_config.vimeo.que.remove(0);
				}
			}

		},

		vine: {

			get: function(m) {
				VMM.master_config.vine.que.push(m);
				VMM.master_config.vine.active = true;
			},

			create: function(m, callback) {
				trace("VINE CREATE");

				var video_url	= "https://vine.co/v/" + m.id + "/embed/simple";



				// VIDEO
				// TODO: NEED TO ADD ASYNC SCRIPT TO TIMELINE FLOW
				VMM.attachElement("#" + m.uid, "<iframe frameborder='0' width='100%' height='100%' src='" + video_url + "'></iframe><script async src='http://platform.vine.co/static/scripts/embed.js' charset='utf-8'></script>");

			},

			pushQue: function() {
				if (VMM.master_config.vine.que.length > 0) {
					VMM.ExternalAPI.vine.create(VMM.master_config.vine.que[0], VMM.ExternalAPI.vine.pushQue);
					VMM.master_config.vine.que.remove(0);
				}
			}

		},

		webthumb: {

			get: function(m, thumb) {
				VMM.master_config.webthumb.que.push(m);
				VMM.master_config.webthumb.active = true;
			},

			sizes: function(s) {
				var _size = "";
				if (s <= 150) {
					_size = "t";
				} else if (s <= 306) {
					_size = "m";
				} else {
					_size = "l";
				}

				return _size;
			},

			create: function(m) {
				trace("WEB THUMB CREATE");

				var thumb_url	= "http://free.pagepeeker.com/v2/thumbs.php?";
					url			= m.id.replace("http://", "");//.split("/")[0];

				// Main Image
				VMM.attachElement("#" + m.uid, "<a href='" + m.id + "' target='_blank'><img src='" + thumb_url + "size=x&url=" + url + "'></a>");

				// Thumb
				VMM.attachElement("#" + m.uid + "_thumb", "<img src='" + thumb_url + "size=t&url=" + url + "'>");
			},

			pushQue: function() {
				for(var i = 0; i < VMM.master_config.webthumb.que.length; i++) {
					VMM.ExternalAPI.webthumb.create(VMM.master_config.webthumb.que[i]);
				}
				VMM.master_config.webthumb.que = [];
			}
		}

	}).init();

}

/*  YOUTUBE API READY
	Can't find a way to customize this callback and keep it in the VMM namespace
	Youtube wants it to be this function.
================================================== */
function onYouTubePlayerAPIReady() {
	trace("GLOBAL YOUTUBE API CALLED")
	VMM.ExternalAPI.youtube.onAPIReady();
}

/* **********************************************
     Begin VMM.MediaElement.js
********************************************** */

/* MediaElement
================================================== */
if(typeof VMM != 'undefined' && typeof VMM.MediaElement == 'undefined') {

	VMM.MediaElement = ({

		init: function() {
			return this;
		},

		loadingmessage: function(m) {
			return "<div class='vco-loading'><div class='vco-loading-container'><div class='vco-loading-icon'></div>" + "<div class='vco-message'><p>" + m + "</p></div></div></div>";
		},

		thumbnail: function(data, w, h, uid) {
			var _w		= 16,
				_h		= 24,
				_uid	= "";

			if (w != null && w != "") {_w = w};
			if (h != null && h != "") {_h = h};
			if (uid != null && uid != "") {_uid = uid};

			if (data.media != null && data.media != "") {
				var _valid		= true,
					mediaElem	= "",
					m			= VMM.MediaType(data.media); //returns an object with .type and .id

				// DETERMINE THUMBNAIL OR ICON
				if (data.thumbnail != null && data.thumbnail != "") {
					trace("CUSTOM THUMB");
					mediaElem		=	"<div class='thumbnail thumb-custom' id='" + uid + "_custom_thumb'><img src='" + data.thumbnail + "'></div>";
					return mediaElem;
				} else if (m.type == "image") {
					mediaElem		=	"<div class='thumbnail thumb-photo'></div>";
					return mediaElem;
				} else if (m.type	==	"flickr") {
					mediaElem		=	"<div class='thumbnail thumb-photo' id='" + uid + "_thumb'></div>";
					return mediaElem;
				} else if (m.type	==	"instagram") {
					mediaElem		=	"<div class='thumbnail thumb-instagram' id='" + uid + "_thumb'><img src='" + VMM.ExternalAPI.instagram.get(m.id, true) + "'></div>";
					return mediaElem;
				} else if (m.type	==	"youtube") {
					mediaElem		=	"<div class='thumbnail thumb-youtube' id='" + uid + "_thumb'></div>";
					return mediaElem;
				} else if (m.type	==	"googledoc") {
					mediaElem		=	"<div class='thumbnail thumb-document'></div>";
					return mediaElem;
				} else if (m.type	==	"vimeo") {
					mediaElem		=	"<div class='thumbnail thumb-vimeo' id='" + uid + "_thumb'></div>";
					return mediaElem;
				} else if (m.type  ==  "vine") {
					mediaElem		=  "<div class='thumbnail thumb-vine'></div>";
					return mediaElem;
				} else if (m.type  ==  "dailymotion") {
					mediaElem		=  "<div class='thumbnail thumb-video'></div>";
					return mediaElem;
				} else if (m.type	==	"twitter"){
					mediaElem		=	"<div class='thumbnail thumb-twitter'></div>";
					return mediaElem;
				} else if (m.type	==	"twitter-ready") {
					mediaElem		=	"<div class='thumbnail thumb-twitter'></div>";
					return mediaElem;
				} else if (m.type	==	"soundcloud") {
					mediaElem		=	"<div class='thumbnail thumb-audio'></div>";
					return mediaElem;
				} else if (m.type	==	"google-map") {
					mediaElem		=	"<div class='thumbnail thumb-map'></div>";
					return mediaElem;
				} else if (m.type		==	"googleplus") {
					mediaElem		=	"<div class='thumbnail thumb-googleplus'></div>";
					return mediaElem;
				} else if (m.type	==	"wikipedia") {
					mediaElem		=	"<div class='thumbnail thumb-wikipedia'></div>";
					return mediaElem;
				} else if (m.type	==	"storify") {
					mediaElem		=	"<div class='thumbnail thumb-storify'></div>";
					return mediaElem;
				} else if (m.type	==	"quote") {
					mediaElem		=	"<div class='thumbnail thumb-quote'></div>";
					return mediaElem;
				} else if (m.type	==	"iframe") {
					mediaElem		=	"<div class='thumbnail thumb-video'></div>";
					return mediaElem;
				} else if (m.type	==	"unknown") {
					if (m.id.match("blockquote")) {
						mediaElem	=	"<div class='thumbnail thumb-quote'></div>";
					} else {
						mediaElem	=	"<div class='thumbnail thumb-plaintext'></div>";
					}
					return mediaElem;
				} else if (m.type	==	"website") {
					mediaElem		=	"<div class='thumbnail thumb-website' id='" + uid + "_thumb'></div>";
					return mediaElem;
				} else {
					mediaElem = "<div class='thumbnail thumb-plaintext'></div>";
					return mediaElem;
				}
			}
		},

		create: function(data, uid) {
			var _valid = false,
				//loading_messege			=	"<span class='messege'><p>" + VMM.master_config.language.messages.loading + "</p></span>";
				loading_messege			=	VMM.MediaElement.loadingmessage(VMM.master_config.language.messages.loading + "...");

			if (data.media != null && data.media != "") {
				var mediaElem = "", captionElem = "", creditElem = "", _id = "", isTextMedia = false, m;

				m = VMM.MediaType(data.media); //returns an object with .type and .id
				m.uid = uid;
				_valid = true;

			// CREDIT
				if (data.credit != null && data.credit != "") {
					creditElem			=	"<div class='credit'>" + VMM.Util.linkify_with_twitter(data.credit, "_blank") + "</div>";
				}
			// CAPTION
				if (data.caption != null && data.caption != "") {
					captionElem			=	"<div class='caption'>" + VMM.Util.linkify_with_twitter(data.caption, "_blank") + "</div>";
				}
			// IMAGE
				if (m.type				==	"image") {
					if (m.id.match("https://")) {
						m.id = m.id.replace("https://","http://");
					}
					mediaElem			=	"<div class='media-image media-shadow'><img src='" + m.id + "' class='media-image'></div>";
			// FLICKR
				} else if (m.type		==	"flickr") {
					//mediaElem			=	"<div class='media-image media-shadow' id='" + uid + "'>" + loading_messege + "</div>";
					mediaElem			=	"<div class='media-image media-shadow'><a href='" + m.link + "' target='_blank'><img id='" + uid + "'></a></div>";
					VMM.ExternalAPI.flickr.get(m);
			// INSTAGRAM
				} else if (m.type		==	"instagram") {
					mediaElem			=	"<div class='media-image media-shadow'><a href='" + m.link + "' target='_blank'><img src='" + VMM.ExternalAPI.instagram.get(m) + "'></a></div>";
					//VMM.ExternalAPI.instagram.get(m.id, uid);
			// GOOGLE DOCS
				} else if (m.type		==	"googledoc") {
					mediaElem			=	"<div class='media-frame media-shadow doc' id='" + m.uid + "'>" + loading_messege + "</div>";
					VMM.ExternalAPI.googledocs.get(m);
			// YOUTUBE
				} else if (m.type		==	"youtube") {
					mediaElem			=	"<div class='media-shadow'><div class='media-frame video youtube' id='" + m.uid + "'>" + loading_messege + "</div></div>";
					VMM.ExternalAPI.youtube.get(m);
			// VIMEO
				} else if (m.type		==	"vimeo") {
					mediaElem			=	"<div class='media-shadow media-frame video vimeo' id='" + m.uid + "'>" + loading_messege + "</div>";
					VMM.ExternalAPI.vimeo.get(m);
			// DAILYMOTION
				} else if (m.type		==	"dailymotion") {
					mediaElem			=	"<div class='media-shadow'><iframe class='media-frame video dailymotion' autostart='false' frameborder='0' width='100%' height='100%' src='http://www.dailymotion.com/embed/video/" + m.id + "'></iframe></div>";
			// VINE
				} else if (m.type		==	"vine") {
					mediaElem			=	"<div class='media-shadow media-frame video vine' id='" + m.uid + "'>" + loading_messege + "</div>";
					VMM.ExternalAPI.vine.get(m);
			// TWITTER
				} else if (m.type		==	"twitter"){
					mediaElem			=	"<div class='twitter' id='" + m.uid + "'>" + loading_messege + "</div>";
					isTextMedia			=	true;
					VMM.ExternalAPI.twitter.get(m);
			// TWITTER
				} else if (m.type		==	"twitter-ready") {
					isTextMedia			=	true;
					mediaElem			=	m.id;
			// SOUNDCLOUD
				} else if (m.type		==	"soundcloud") {
					mediaElem			=	"<div class='media-frame media-shadow soundcloud' id='" + m.uid + "'>" + loading_messege + "</div>";
					VMM.ExternalAPI.soundcloud.get(m);
			// GOOGLE MAPS
				} else if (m.type		==	"google-map") {
					mediaElem			=	"<div class='media-frame media-shadow map' id='" + m.uid + "'>" + loading_messege + "</div>";
					VMM.ExternalAPI.googlemaps.get(m);
			// GOOGLE PLUS
				} else if (m.type		==	"googleplus") {
					_id					=	"googleplus_" + m.id;
					mediaElem			=	"<div class='googleplus' id='" + _id + "'>" + loading_messege + "</div>";
					isTextMedia			=	true;
					VMM.ExternalAPI.googleplus.get(m);
			// WIKIPEDIA
				} else if (m.type		==	"wikipedia") {
					mediaElem			=	"<div class='wikipedia' id='" + m.uid + "'>" + loading_messege + "</div>";
					isTextMedia			=	true;
					VMM.ExternalAPI.wikipedia.get(m);
			// STORIFY
				} else if (m.type		==	"storify") {
					isTextMedia			=	true;
					mediaElem			=	"<div class='plain-text-quote'>" + m.id + "</div>";
			// IFRAME
				} else if (m.type		==	"iframe") {
					isTextMedia			=	true;
					mediaElem			=	"<div class='media-shadow'><iframe class='media-frame video' autostart='false' frameborder='0' width='100%' height='100%' src='" + m.id + "'></iframe></div>";
			// QUOTE
				} else if (m.type		==	"quote") {
					isTextMedia			=	true;
					mediaElem			=	"<div class='plain-text-quote'>" + m.id + "</div>";
			// UNKNOWN
				} else if (m.type		==	"unknown") {
					trace("NO KNOWN MEDIA TYPE FOUND TRYING TO JUST PLACE THE HTML");
					isTextMedia			=	true;
					mediaElem			=	"<div class='plain-text'><div class='container'>" + VMM.Util.properQuotes(m.id) + "</div></div>";
			// WEBSITE
				} else if (m.type		==	"website") {

					mediaElem			=	"<div class='media-shadow website' id='" + m.uid + "'>" + loading_messege + "</div>";
					VMM.ExternalAPI.webthumb.get(m);
					//mediaElem			=	"<div class='media-shadow website'><a href='" + m.id + "' target='_blank'>" + "<img src='http://api1.thumbalizr.com/?url=" + m.id.replace(/[\./]$/g, "") + "&width=300' class='media-image'></a></div>";

			// NO MATCH
				} else {
					trace("NO KNOWN MEDIA TYPE FOUND");
					trace(m.type);
				}

			// WRAP THE MEDIA ELEMENT
				mediaElem				=	"<div class='media-container' >" + mediaElem + creditElem + captionElem + "</div>";
			// RETURN
				if (isTextMedia) {
					return "<div class='text-media'><div class='media-wrapper'>" + mediaElem + "</div></div>";
				} else {
					return "<div class='media-wrapper'>" + mediaElem + "</div>";
				}

			};

		}

	}).init();
}

/* **********************************************
     Begin VMM.MediaType.js
********************************************** */

/*	MediaType
	Determines the type of media the url string is.
	returns an object with .type and .id
	the id is a key piece of information needed to make
	the request of the api.
================================================== */
if(typeof VMM != 'undefined' && typeof VMM.MediaType == 'undefined') {

	VMM.MediaType = function(_d) {
		var d		= _d.replace(/^\s\s*/, '').replace(/\s\s*$/, ''),
			success	= false,
			media	= {
				type:		"unknown",
				id:			"",
				start:		0,
				hd:			false,
				link:		"",
				lang:		VMM.Language.lang,
				uniqueid:	VMM.Util.unique_ID(6)
			};

		if (d.match("div class='twitter'")) {
			media.type = "twitter-ready";
		    media.id = d;
		    success = true;
		} else if (d.match('(www.)?youtube|youtu\.be')) {
			if (d.match('v=')) {
				media.id	= VMM.Util.getUrlVars(d)["v"];
			} else if (d.match('\/embed\/')) {
				media.id	= d.split("embed\/")[1].split(/[?&]/)[0];
			} else if (d.match(/v\/|v=|youtu\.be\//)){
				media.id	= d.split(/v\/|v=|youtu\.be\//)[1].split(/[?&]/)[0];
			} else {
				trace("YOUTUBE IN URL BUT NOT A VALID VIDEO");
			}
			media.start	= VMM.Util.getUrlVars(d)["t"];
			media.hd	= VMM.Util.getUrlVars(d)["hd"];
		    media.type = "youtube";
		    success = true;
		} else if (d.match('(player.)?vimeo\.com')) {
		    media.type = "vimeo";
		    media.id = d.split(/video\/|\/\/vimeo\.com\//)[1].split(/[?&]/)[0];;
		    success = true;
	    } else if (d.match('(www.)?dailymotion\.com')) {
			media.id = d.split(/video\/|\/\/dailymotion\.com\//)[1];
			media.type = "dailymotion";
			success = true;
	    } else if (d.match('(www.)?vine\.co')) {
			trace("VINE");
			//https://vine.co/v/b55LOA1dgJU
			if (d.match("vine.co/v/")) {
				media.id = d.split("vine.co/v/")[1];
				trace(media.id);
			}
			trace(d);
			media.type = "vine";
			success = true;
		} else if (d.match('(player.)?soundcloud\.com')) {
			media.type = "soundcloud";
			media.id = d;
			success = true;
		} else if (d.match('(www.)?twitter\.com') && d.match('status') ) {
			if (d.match("status\/")) {
				media.id = d.split("status\/")[1];
			} else if (d.match("statuses\/")) {
				media.id = d.split("statuses\/")[1];
			} else {
				media.id = "";
			}
			media.type = "twitter";
			success = true;
		} else if (d.match("maps.google") && !d.match("staticmap")) {
			media.type = "google-map";
		    media.id = d.split(/src=['|"][^'|"]*?['|"]/gi);
			success = true;
		} else if (d.match("plus.google")) {
			media.type = "googleplus";
		    media.id = d.split("/posts/")[1];
			//https://plus.google.com/u/0/112374836634096795698/posts/bRJSvCb5mUU
			//https://plus.google.com/107096716333816995401/posts/J5iMpEDHWNL
			if (d.split("/posts/")[0].match("u/0/")) {
				media.user = d.split("u/0/")[1].split("/posts")[0];
			} else {
				media.user = d.split("google.com/")[1].split("/posts/")[0];
			}
			success = true;
		} else if (d.match("flickr.com/photos")) {
			media.type = "flickr";
			media.id = d.split("photos\/")[1].split("/")[1];
			media.link = d;
			success = true;
		} else if (d.match("instagr.am/p/")) {
			media.type = "instagram";
			media.link = d;
			media.id = d.split("\/p\/")[1].split("/")[0];
			success = true;
		} else if (d.match(/jpg|jpeg|png|gif/i) || d.match("staticmap") || d.match("yfrog.com") || d.match("twitpic.com")) {
			media.type = "image";
			media.id = d;
			success = true;
		} else if (VMM.FileExtention.googleDocType(d)) {
			media.type = "googledoc";
			media.id = d;
			success = true;
		} else if (d.match('(www.)?wikipedia\.org')) {
			media.type = "wikipedia";
			//media.id = d.split("wiki\/")[1];
			var wiki_id = d.split("wiki\/")[1].split("#")[0].replace("_", " ");
			media.id = wiki_id.replace(" ", "%20");
			media.lang = d.split("//")[1].split(".wikipedia")[0];
			success = true;
		} else if (d.indexOf('http://') == 0) {
			media.type = "website";
			media.id = d;
			success = true;
		} else if (d.match('storify')) {
			media.type = "storify";
			media.id = d;
			success = true;
		} else if (d.match('blockquote')) {
			media.type = "quote";
			media.id = d;
			success = true;
		} else if (d.match('iframe')) {
			media.type = "iframe";
			trace("IFRAME")
			trace( d.match(/src\=([^\s]*)\s/)[1].split(/"/)[1]);
			media.id = d.match(/src\=([^\s]*)\s/)[1].split(/"/)[1];
			success = true;
		} else {
			trace("unknown media");
			media.type = "unknown";
			media.id = d;
			success = true;
		}

		if (success) {
			return media;
		} else {
			trace("No valid media id detected");
			trace(d);
		}
		return false;
	}
}

/* **********************************************
     Begin VMM.TextElement.js
********************************************** */

/* TextElement
================================================== */
if(typeof VMM != 'undefined' && typeof VMM.TextElement == 'undefined') {

	VMM.TextElement = ({

		init: function() {
			return this;
		},

		create: function(data) {
			return data;
		}

	}).init();
}

/* **********************************************
     Begin VMM.Media.js
********************************************** */

/* Media
================================================== */

/*	* CodeKit Import
	* http://incident57.com/codekit/
================================================== */
// @codekit-prepend "VMM.ExternalAPI.js";
// @codekit-prepend "VMM.MediaElement.js";
// @codekit-prepend "VMM.MediaType.js";
// @codekit-prepend "VMM.TextElement.js";


/* **********************************************
     Begin VMM.DragSlider.js
********************************************** */

/* DRAG SLIDER
================================================== */
if(typeof VMM != 'undefined' && typeof VMM.DragSlider == 'undefined') {

	VMM.DragSlider = function() {
		var drag = {
			element:		"",
			element_move:	"",
			constraint:		"",
			sliding:		false,
			pagex: {
				start:		0,
				end:		0
			},
			pagey: {
				start:		0,
				end:		0
			},
			left: {
				start:		0,
				end:		0
			},
			time: {
				start:		0,
				end:		0
			},
			touch:			false,
			ease:			"easeOutExpo"
		},
		dragevent = {
			down:		"mousedown",
			up:			"mouseup",
			leave:		"mouseleave",
			move:		"mousemove"
		},
		mousedrag = {
			down:		"mousedown",
			up:			"mouseup",
			leave:		"mouseleave",
			move:		"mousemove"
		},
		touchdrag = {
			down:		"touchstart",
			up:			"touchend",
			leave:		"mouseleave",
			move:		"touchmove"
		},
		dragslider		= this,
		is_sticky		= false;

		/* PUBLIC FUNCTIONS
		================================================== */
		this.createPanel = function(drag_object, move_object, constraint, touch, sticky) {
			drag.element		= drag_object;
			drag.element_move	= move_object;
			//dragslider			= drag_object;
			if ( sticky != null && sticky != "") {
				is_sticky = sticky;
			}
			if ( constraint != null && constraint != "") {
				drag.constraint = constraint;
			} else {
				drag.constraint = false;
			}
			if ( touch) {
				drag.touch = touch;
			} else {
				drag.touch = false;
			}
			trace("TOUCH" + drag.touch);
			if (drag.touch) {
				dragevent = touchdrag;
			} else {
				dragevent = mousedrag;
			}

			makeDraggable(drag.element, drag.element_move);
		}

		this.updateConstraint = function(constraint) {
			trace("updateConstraint");
			drag.constraint = constraint;
		}

		this.cancelSlide = function(e) {
			VMM.unbindEvent(drag.element, onDragMove, dragevent.move);
			return true;
		}

		/* PRIVATE FUNCTIONS
		================================================== */
		function makeDraggable(drag_object, move_object) {

			VMM.bindEvent(drag_object, onDragStart, dragevent.down, {element: move_object, delement: drag_object});
			VMM.bindEvent(drag_object, onDragEnd, dragevent.up, {element: move_object, delement: drag_object});
			VMM.bindEvent(drag_object, onDragLeave, dragevent.leave, {element: move_object, delement: drag_object});

	    }

		function onDragLeave(e) {
			VMM.unbindEvent(e.data.delement, onDragMove, dragevent.move);
			if (!drag.touch) {
				e.preventDefault();
			}
			e.stopPropagation();
			if (drag.sliding) {
				drag.sliding = false;
				dragEnd(e.data.element, e.data.delement, e);
				return false;
			} else {
				return true;
			}
		}

		function onDragStart(e) {
			dragStart(e.data.element, e.data.delement, e);
			if (!drag.touch) {
				e.preventDefault();
			}
			//e.stopPropagation();
			return true;
		}

		function onDragEnd(e) {
			if (!drag.touch) {
				e.preventDefault();
			}
			//e.stopPropagation();
			if (drag.sliding) {
				drag.sliding = false;
				dragEnd(e.data.element, e.data.delement, e);
				return false;
			} else {
				return true;
			}
		}

		function onDragMove(e) {
			dragMove(e.data.element, e);

		}

		function dragStart(elem, delem, e) {
			if (drag.touch) {
				trace("IS TOUCH")
				VMM.Lib.css(elem, '-webkit-transition-duration', '0');
				drag.pagex.start = e.originalEvent.touches[0].screenX;
				drag.pagey.start = e.originalEvent.touches[0].screenY;
			} else {
				drag.pagex.start = e.pageX;
				drag.pagey.start = e.pageY;
			}
			drag.left.start = getLeft(elem);
			drag.time.start = new Date().getTime();

			VMM.Lib.stop(elem);
			VMM.bindEvent(delem, onDragMove, dragevent.move, {element: elem});

	    }

		function dragEnd(elem, delem, e) {
			VMM.unbindEvent(delem, onDragMove, dragevent.move);
			dragMomentum(elem, e);
		}

		function dragMove(elem, e) {
			var drag_to, drag_to_y;
			drag.sliding = true;
			if (drag.touch) {
				drag.pagex.end = e.originalEvent.touches[0].screenX;
				drag.pagey.end = e.originalEvent.touches[0].screenY;
			} else {
				drag.pagex.end = e.pageX;
				drag.pagey.end = e.pageY;
			}

			drag.left.end	= getLeft(elem);
			drag_to			= -(drag.pagex.start - drag.pagex.end - drag.left.start);


			if (Math.abs(drag.pagey.start) - Math.abs(drag.pagey.end) > 10) {
				trace("SCROLLING Y")
				trace(Math.abs(drag.pagey.start) - Math.abs(drag.pagey.end));
			}
			if (Math.abs(drag_to - drag.left.start) > 10) {
				VMM.Lib.css(elem, 'left', drag_to);
				e.preventDefault();
				e.stopPropagation();
			}
		}

		function dragMomentum(elem, e) {
			var drag_info = {
					left:			drag.left.end,
					left_adjust:	0,
					change: {
						x:			0
					},
					time:			(new Date().getTime() - drag.time.start) * 10,
					time_adjust:	(new Date().getTime() - drag.time.start) * 10
				},
				multiplier = 3000;

			if (drag.touch) {
				multiplier = 6000;
			}

			drag_info.change.x = multiplier * (Math.abs(drag.pagex.end) - Math.abs(drag.pagex.start));


			drag_info.left_adjust = Math.round(drag_info.change.x / drag_info.time);

			drag_info.left = Math.min(drag_info.left + drag_info.left_adjust);

			if (drag.constraint) {
				if (drag_info.left > drag.constraint.left) {
					drag_info.left = drag.constraint.left;
					if (drag_info.time > 5000) {
						drag_info.time = 5000;
					}
				} else if (drag_info.left < drag.constraint.right) {
					drag_info.left = drag.constraint.right;
					if (drag_info.time > 5000) {
						drag_info.time = 5000;
					}
				}
			}

			VMM.fireEvent(dragslider, "DRAGUPDATE", [drag_info]);

			if (!is_sticky) {
				if (drag_info.time > 0) {
					if (drag.touch) {
						VMM.Lib.animate(elem, drag_info.time, "easeOutCirc", {"left": drag_info.left});
					} else {
						VMM.Lib.animate(elem, drag_info.time, drag.ease, {"left": drag_info.left});
					}
				}
			}
		}

		function getLeft(elem) {
			return parseInt(VMM.Lib.css(elem, 'left').substring(0, VMM.Lib.css(elem, 'left').length - 2), 10);
		}

	}
}

/* **********************************************
     Begin VMM.Slider.js
********************************************** */

/* Slider
================================================== */
/*	* CodeKit Import
	* http://incident57.com/codekit/
================================================== */
// @codekit-append "VMM.Slider.Slide.js";

if(typeof VMM != 'undefined' && typeof VMM.Slider == 'undefined') {

	VMM.Slider = function(parent, parent_config) {

		var config,
			timer,
			$slider,
			$slider_mask,
			$slider_container,
			$slides_items,
			$dragslide,
			$explainer,
			events				= {},
			data				= [],
			slides				= [],
			slide_positions		= [],
			slides_content		= "",
			current_slide		= 0,
			current_width		= 960,
			touch = {
				move:			false,
				x:				10,
				y:				0,
				off:			0,
				dampen:			48
			},
			content				= "",
			_active				= false,
			layout				= parent,
			navigation = {
				nextBtn:		"",
				prevBtn:		"",
				nextDate:		"",
				prevDate:		"",
				nextTitle:		"",
				prevTitle:		""
			};

		// CONFIG
		if(typeof parent_config != 'undefined') {
			config	= parent_config;
		} else {
			config	= {
				preload:			4,
				current_slide:		0,
				interval:			10,
				something:			0,
				width:				720,
				height:				400,
				ease:				"easeInOutExpo",
				duration:			1000,
				timeline:			false,
				spacing:			15,
                ajax_timeout:       3000,
				slider: {
					width:			720,
					height:			400,
					content: {
						width:		720,
						height:		400,
						padding:	120,
						padding_default: 120
					},
					nav: {
						width:		100,
						height:		200
					}
				}
			};
		}

		/* PUBLIC VARS
		================================================== */
		this.ver = "0.6";

		config.slider.width		= config.width;
		config.slider.height	= config.height;

		/* PUBLIC FUNCTIONS
		================================================== */
		this.init = function(d) {
			slides			= [];
			slide_positions	= [];

			if(typeof d != 'undefined') {
				this.setData(d);
			} else {
				trace("WAITING ON DATA");
			}
		};

		this.width = function(w) {
			if (w != null && w != "") {
				config.slider.width = w;
				reSize();
			} else {
				return config.slider.width;
			}
		}

		this.height = function(h) {
			if (h != null && h != "") {
				config.slider.height = h;
				reSize();
			} else {
				return config.slider.height;
			}
		}

		/* GETTERS AND SETTERS
		================================================== */
		this.setData = function(d) {
			if(typeof d != 'undefined') {
				data = d;
				build();
			} else{
				trace("NO DATA");
			}
		};

		this.getData = function() {
			return data;
		};

		this.setConfig = function(d) {
			if(typeof d != 'undefined') {
				config = d;
			} else{
				trace("NO CONFIG DATA");
			}
		}

		this.getConfig = function() {
			return config;
		};

		this.setSize = function(w, h) {
			if (w != null) {config.slider.width = w};
			if (h != null) {config.slider.height = h};
			if (_active) {
				reSize();
			}

		}

		this.active = function() {
			return _active;
		};

		this.getCurrentNumber = function() {
			return current_slide;
		};

		this.setSlide = function(n) {
			goToSlide(n);
		};

		/* ON EVENT
		================================================== */
		function onConfigSet() {
			trace("onConfigSet");
		};

		function reSize(go_to_slide, from_start) {
			var _go_to_slide	= true,
				_from_start		= false;

			if (go_to_slide != null) {_go_to_slide = go_to_slide};
			if (from_start != null) {_from_start = from_start};

			current_width = config.slider.width;

			config.slider.nav.height = VMM.Lib.height(navigation.prevBtnContainer);

			// Handle smaller sizes
			if (VMM.Browser.device == "mobile" || current_width <= 640) {
				config.slider.content.padding	= 10;
			} else {
				config.slider.content.padding	= config.slider.content.padding_default;
			}

			config.slider.content.width = current_width - (config.slider.content.padding *2);

			VMM.Lib.width($slides_items, (slides.length * config.slider.content.width));

			if (_from_start) {
				VMM.Lib.css($slider_container, "left", slides[current_slide].leftpos());
			}

			// RESIZE SLIDES
			sizeSlides();

			// POSITION SLIDES
			positionSlides();

			// POSITION NAV
			VMM.Lib.css(navigation.nextBtn, "left", (current_width - config.slider.nav.width));
			VMM.Lib.height(navigation.prevBtn, config.slider.height);
			VMM.Lib.height(navigation.nextBtn, config.slider.height);
			VMM.Lib.css(navigation.nextBtnContainer, "top", ( (config.slider.height/2) - (config.slider.nav.height/2) ) + 10 );
			VMM.Lib.css(navigation.prevBtnContainer, "top", ( (config.slider.height/2) - (config.slider.nav.height/2) ) + 10 );

			// Animate Changes
			VMM.Lib.height($slider_mask, config.slider.height);
			VMM.Lib.width($slider_mask, current_width);

			if (_go_to_slide) {
				goToSlide(current_slide, "linear", 1);
			};

			if (current_slide == 0) {
				VMM.Lib.visible(navigation.prevBtn, false);
			}

		}

		function onDragFinish(e, d) {
			trace("DRAG FINISH");
			trace(d.left_adjust);
			trace((config.slider.width / 2));

			if (d.left_adjust < 0 ) {
				if (Math.abs(d.left_adjust) > (config.slider.width / 2) ) {
					//onNextClick(e);
					if (current_slide == slides.length - 1) {
						backToCurrentSlide();
					} else {
						goToSlide(current_slide+1, "easeOutExpo");
						upDate();
					}
				} else {
					backToCurrentSlide();

				}
			} else if (Math.abs(d.left_adjust) > (config.slider.width / 2) ) {
				if (current_slide == 0) {
					backToCurrentSlide();
				} else {
					goToSlide(current_slide-1, "easeOutExpo");
					upDate();
				}
			} else {
				backToCurrentSlide();
			}



		}
		/* NAVIGATION
		================================================== */
		function onNextClick(e) {
			if (current_slide == slides.length - 1) {
				backToCurrentSlide();
			} else {
				goToSlide(current_slide+1);
				upDate();
			}
		}

		function onPrevClick(e) {
			if (current_slide == 0) {
				backToCurrentSlide();
			} else {
				goToSlide(current_slide-1);
				upDate();
			}
		}

		function onKeypressNav(e) {
			switch(e.keyCode) {
				case 39:
					// RIGHT ARROW
					onNextClick(e);
					break;
				case 37:
					// LEFT ARROW
					onPrevClick(e);
					break;
			}
		}

		function onTouchUpdate(e, b) {
			if (slide_positions.length == 0) {
				for(var i = 0; i < slides.length; i++) {
					slide_positions.push( slides[i].leftpos() );
				}
			}
			if (typeof b.left == "number") {
				var _pos = b.left;
				var _slide_pos = -(slides[current_slide].leftpos());
				if (_pos < _slide_pos - (config.slider_width/3)) {
					onNextClick();
				} else if (_pos > _slide_pos + (config.slider_width/3)) {
					onPrevClick();
				} else {
					VMM.Lib.animate($slider_container, config.duration, config.ease, {"left": _slide_pos });
				}
			} else {
				VMM.Lib.animate($slider_container, config.duration, config.ease, {"left": _slide_pos });
			}

			if (typeof b.top == "number") {
				VMM.Lib.animate($slider_container, config.duration, config.ease, {"top": -b.top});
			} else {

			}
		};

		function onExplainerClick(e) {
			detachMessege();
		}

		/* UPDATE
		================================================== */
		function upDate() {
			config.current_slide = current_slide;
			VMM.fireEvent(layout, "UPDATE");
		};

		/* GET DATA
		================================================== */
		function getData(d) {
			data = d;
		};

		/* BUILD SLIDES
		================================================== */
		function buildSlides(d) {
			var i	= 0;

			VMM.attachElement($slides_items, "");
			slides = [];

			for(i = 0; i < d.length; i++) {
				var _slide = new VMM.Slider.Slide(d[i], $slides_items);
				//_slide.show();
				slides.push(_slide);
			}
		}

		function preloadSlides(skip) {
			var i	= 0;

			if (skip) {
				preloadTimeOutSlides();
			} else {
				for(i = 0; i < slides.length; i++) {
					slides[i].clearTimers();
				}
				timer = setTimeout(preloadTimeOutSlides, config.duration);

			}
		}

		function preloadTimeOutSlides() {
			var i = 0;

			for(i = 0; i < slides.length; i++) {
				slides[i].enqueue = true;
			}

			for(i = 0; i < config.preload; i++) {
				if ( !((current_slide + i) > slides.length - 1)) {
					slides[current_slide + i].show();
					slides[current_slide + i].enqueue = false;
				}
				if ( !( (current_slide - i) < 0 ) ) {
					slides[current_slide - i].show();
					slides[current_slide - i].enqueue = false;
				}
			}

			if (slides.length > 50) {
				for(i = 0; i < slides.length; i++) {
					if (slides[i].enqueue) {
						slides[i].hide();
					}
				}
			}

			sizeSlides();
		}

		function sizeSlide(slide_id) {

		}

		/* SIZE SLIDES
		================================================== */
		function sizeSlides() {
			var i						= 0,
				layout_text_media		= ".slider-item .layout-text-media .media .media-container ",
				layout_media			= ".slider-item .layout-media .media .media-container ",
				layout_both				= ".slider-item .media .media-container",
				layout_caption			= ".slider-item .media .media-container .media-shadow .caption",
				is_skinny				= false,
				mediasize = {
					text_media: {
						width: 			(config.slider.content.width/100) * 60,
						height: 		config.slider.height - 60,
						video: {
							width:		0,
							height:		0
						},
						text: {
							width:		((config.slider.content.width/100) * 40) - 30,
							height:		config.slider.height
						}
					},
					media: {
						width: 			config.slider.content.width,
						height: 		config.slider.height - 110,
						video: {
							width: 		0,
							height: 	0
						}
					}
				};

			// Handle smaller sizes
			if (VMM.Browser.device == "mobile" || current_width < 641) {
				is_skinny = true;

			}

			VMM.master_config.sizes.api.width	= mediasize.media.width;
			VMM.master_config.sizes.api.height	= mediasize.media.height;

			mediasize.text_media.video			= VMM.Util.ratio.fit(mediasize.text_media.width, mediasize.text_media.height, 16, 9);
			mediasize.media.video				= VMM.Util.ratio.fit(mediasize.media.width, mediasize.media.height, 16, 9);

			VMM.Lib.css(".slider-item", "width", config.slider.content.width );
			VMM.Lib.height(".slider-item", config.slider.height);



			if (is_skinny) {

				mediasize.text_media.width = 	config.slider.content.width - (config.slider.content.padding*2);
				mediasize.media.width = 		config.slider.content.width - (config.slider.content.padding*2);
				mediasize.text_media.height = 	((config.slider.height/100) * 50 ) - 50;
				mediasize.media.height = 		((config.slider.height/100) * 70 ) - 40;

				mediasize.text_media.video = 	VMM.Util.ratio.fit(mediasize.text_media.width, mediasize.text_media.height, 16, 9);
				mediasize.media.video = 		VMM.Util.ratio.fit(mediasize.media.width, mediasize.media.height, 16, 9);

				VMM.Lib.css(".slider-item .layout-text-media .text", "width", "100%" );
				VMM.Lib.css(".slider-item .layout-text-media .text", "display", "block" );
				VMM.Lib.css(".slider-item .layout-text-media .text .container", "display", "block" );
				VMM.Lib.css(".slider-item .layout-text-media .text .container", "width", mediasize.media.width );
				VMM.Lib.css(".slider-item .layout-text-media .text .container .start", "width", "auto" );

				VMM.Lib.css(".slider-item .layout-text-media .media", "float", "none" );
				VMM.Lib.addClass(".slider-item .content-container", "pad-top");

				VMM.Lib.css(".slider-item .media blockquote p", "line-height", "18px" );
				VMM.Lib.css(".slider-item .media blockquote p", "font-size", "16px" );

				VMM.Lib.css(".slider-item", "overflow-y", "auto" );


			} else {

				VMM.Lib.css(".slider-item .layout-text-media .text", "width", "40%" );
				VMM.Lib.css(".slider-item .layout-text-media .text", "display", "table-cell" );
				VMM.Lib.css(".slider-item .layout-text-media .text .container", "display", "table-cell" );
				VMM.Lib.css(".slider-item .layout-text-media .text .container", "width", "auto" );
				VMM.Lib.css(".slider-item .layout-text-media .text .container .start", "width", mediasize.text_media.text.width );
				//VMM.Lib.addClass(".slider-item .content-container", "pad-left");
				VMM.Lib.removeClass(".slider-item .content-container", "pad-top");

				VMM.Lib.css(".slider-item .layout-text-media .media", "float", "left" );
				VMM.Lib.css(".slider-item .layout-text-media", "display", "table" );

				VMM.Lib.css(".slider-item .media blockquote p", "line-height", "36px" );
				VMM.Lib.css(".slider-item .media blockquote p", "font-size", "28px" );

				VMM.Lib.css(".slider-item", "display", "table" );
				VMM.Lib.css(".slider-item", "overflow-y", "auto" );
			}

			// MEDIA FRAME
			VMM.Lib.css(	layout_text_media + ".media-frame", 		"max-width", 	mediasize.text_media.width);
			VMM.Lib.height(	layout_text_media + ".media-frame", 						mediasize.text_media.height);
			VMM.Lib.width(	layout_text_media + ".media-frame", 						mediasize.text_media.width);

			// WEBSITES
			//VMM.Lib.css(	layout_both + 		".website", 			"max-width", 	300 );

			// IMAGES
			VMM.Lib.css(	layout_text_media + "img", 					"max-height", 	mediasize.text_media.height );
			VMM.Lib.css(	layout_media + 		"img", 					"max-height", 	mediasize.media.height );

			// FIX FOR NON-WEBKIT BROWSERS
			VMM.Lib.css(	layout_text_media + "img", 					"max-width", 	mediasize.text_media.width );
			VMM.Lib.css(	layout_text_media + ".avatar img", "max-width", 			32 );
			VMM.Lib.css(	layout_text_media + ".avatar img", "max-height", 			32 );
			VMM.Lib.css(	layout_media + 		".avatar img", "max-width", 			32 );
			VMM.Lib.css(	layout_media + 		".avatar img", "max-height", 			32 );

			VMM.Lib.css(	layout_text_media + ".article-thumb", "max-width", 			"50%" );
			//VMM.Lib.css(	layout_text_media + ".article-thumb", "max-height", 		100 );
			VMM.Lib.css(	layout_media + 		".article-thumb", "max-width", 			200 );
			//VMM.Lib.css(	layout_media + 		".article-thumb", "max-height", 		100 );


			// IFRAME FULL SIZE VIDEO
			VMM.Lib.width(	layout_text_media + ".media-frame", 						mediasize.text_media.video.width);
			VMM.Lib.height(	layout_text_media + ".media-frame", 						mediasize.text_media.video.height);
			VMM.Lib.width(	layout_media + 		".media-frame", 						mediasize.media.video.width);
			VMM.Lib.height(	layout_media + 		".media-frame", 						mediasize.media.video.height);
			VMM.Lib.css(	layout_media + 		".media-frame", 		"max-height", 	mediasize.media.video.height);
			VMM.Lib.css(	layout_media + 		".media-frame", 		"max-width", 	mediasize.media.video.width);

			// SOUNDCLOUD
			VMM.Lib.height(	layout_media + 		".soundcloud", 							168);
			VMM.Lib.height(	layout_text_media + ".soundcloud", 							168);
			VMM.Lib.width(	layout_media + 		".soundcloud", 							mediasize.media.width);
			VMM.Lib.width(	layout_text_media + ".soundcloud", 							mediasize.text_media.width);
			VMM.Lib.css(	layout_both + 		".soundcloud", 			"max-height", 	168 );

			// MAPS
			VMM.Lib.height(	layout_text_media	+ ".map", 								mediasize.text_media.height);
			VMM.Lib.width(	layout_text_media	+ ".map", 								mediasize.text_media.width);
			VMM.Lib.css(	layout_media		+ ".map", 				"max-height", 	mediasize.media.height);
			VMM.Lib.width(	layout_media		+ ".map", 								mediasize.media.width);


			// DOCS
			VMM.Lib.height(	layout_text_media + ".doc", 								mediasize.text_media.height);
			VMM.Lib.width(	layout_text_media	+ ".doc", 								mediasize.text_media.width);
			VMM.Lib.height(	layout_media + 		".doc", 								mediasize.media.height);
			VMM.Lib.width(	layout_media		+ ".doc", 								mediasize.media.width);

			// IE8 NEEDS THIS
			VMM.Lib.width(	layout_media + 		".wikipedia", 							mediasize.media.width);
			VMM.Lib.width(	layout_media + 		".twitter", 							mediasize.media.width);
			VMM.Lib.width(	layout_media + 		".plain-text-quote", 					mediasize.media.width);
			VMM.Lib.width(	layout_media + 		".plain-text", 							mediasize.media.width);

			VMM.Lib.css(	layout_both, 		"max-width", 							mediasize.media.width);


			// CAPTION WIDTH
			VMM.Lib.css( layout_text_media + 	".caption",	"max-width",	mediasize.text_media.video.width);
			VMM.Lib.css( layout_media + 		".caption",	"max-width",	mediasize.media.video.width);
			//VMM.Lib.css( layout_text_media + 	".caption",	"max-width",	mediasize.text_media.width);
			//VMM.Lib.css( layout_media + 		".caption",	"max-width",	mediasize.media.width);

			// MAINTAINS VERTICAL CENTER IF IT CAN
			for(i = 0; i < slides.length; i++) {

				slides[i].layout(is_skinny);

				if (slides[i].content_height() > config.slider.height + 20) {
					slides[i].css("display", "block");
				} else {
					slides[i].css("display", "table");
				}
			}

		}

		/* POSITION SLIDES
		================================================== */
		function positionSlides() {
			var pos = 0,
				i	= 0;

			for(i = 0; i < slides.length; i++) {
				pos = i * (config.slider.width+config.spacing);
				slides[i].leftpos(pos);
			}
		}

		/* OPACITY SLIDES
		================================================== */
		function opacitySlides(n) {
			var _ease	= "linear",
				i		= 0;

			for(i = 0; i < slides.length; i++) {
				if (i == current_slide) {
					slides[i].animate(config.duration, _ease, {"opacity": 1});
				} else if (i == current_slide - 1 || i == current_slide + 1) {
					slides[i].animate(config.duration, _ease, {"opacity": 0.1});
				} else {
					slides[i].opacity(n);
				}
			}
		}

		/* GO TO SLIDE
			goToSlide(n, ease, duration);
		================================================== */
		function goToSlide(n, ease, duration, fast, firstrun) {
			var _ease		= config.ease,
				_duration	= config.duration,
				is_last		= false,
				is_first	= false,
				_title		= "",
				_pos;

			/* STOP ANY VIDEO PLAYERS ACTIVE
			================================================== */
			VMM.ExternalAPI.youtube.stopPlayers();

			// Set current slide
			current_slide	= n;
			_pos			= slides[current_slide].leftpos();


			if (current_slide == 0) {is_first = true};
			if (current_slide +1 >= slides.length) {is_last = true};
			if (ease != null && ease != "") {_ease = ease};
			if (duration != null && duration != "") {_duration = duration};

			/*	NAVIGATION
				set proper nav titles and dates etc.
			================================================== */
			// Handle smaller sizes
			if (VMM.Browser.device == "mobile") {
			//if (VMM.Browser.device == "mobile" || current_width <= 640) {
				VMM.Lib.visible(navigation.prevBtn, false);
				VMM.Lib.visible(navigation.nextBtn, false);
			} else {
				if (is_first) {
					VMM.Lib.visible(navigation.prevBtn, false);
				} else {
					VMM.Lib.visible(navigation.prevBtn, true);
					_title = VMM.Util.unlinkify(data[current_slide - 1].title)
					if (config.type == "timeline") {
						if(typeof data[current_slide - 1].date === "undefined") {
							VMM.attachElement(navigation.prevDate, _title);
							VMM.attachElement(navigation.prevTitle, "");
						} else {
							VMM.attachElement(navigation.prevDate, VMM.Date.prettyDate(data[current_slide - 1].startdate, false, data[current_slide - 1].precisiondate));
							VMM.attachElement(navigation.prevTitle, _title);
						}
					} else {
						VMM.attachElement(navigation.prevTitle, _title);
					}

				}
				if (is_last) {
					VMM.Lib.visible(navigation.nextBtn, false);
				} else {
					VMM.Lib.visible(navigation.nextBtn, true);
					_title = VMM.Util.unlinkify(data[current_slide + 1].title);
					if (config.type == "timeline") {
						if(typeof data[current_slide + 1].date === "undefined") {
							VMM.attachElement(navigation.nextDate, _title);
							VMM.attachElement(navigation.nextTitle, "");
						} else {
							VMM.attachElement(navigation.nextDate, VMM.Date.prettyDate(data[current_slide + 1].startdate, false, data[current_slide + 1].precisiondate) );
							VMM.attachElement(navigation.nextTitle, _title);
						}
					} else {
						VMM.attachElement(navigation.nextTitle,  _title);
					}

				}
			}


			/* ANIMATE SLIDE
			================================================== */
			if (fast) {
				VMM.Lib.css($slider_container, "left", -(_pos - config.slider.content.padding));
			} else{
				VMM.Lib.stop($slider_container);
				VMM.Lib.animate($slider_container, _duration, _ease, {"left": -(_pos - config.slider.content.padding)});
			}

			if (firstrun) {
				VMM.fireEvent(layout, "LOADED");
			}

			/* SET Vertical Scoll
			================================================== */
			if (slides[current_slide].height() > config.slider_height) {
				VMM.Lib.css(".slider", "overflow-y", "scroll" );
			} else {
				VMM.Lib.css(layout, "overflow-y", "hidden" );
				var scroll_height = 0;
				try {
					scroll_height = VMM.Lib.prop(layout, "scrollHeight");
					VMM.Lib.animate(layout, _duration, _ease, {scrollTop: scroll_height - VMM.Lib.height(layout) });
				}
				catch(err) {
					scroll_height = VMM.Lib.height(layout);
				}
			}

			preloadSlides();
			VMM.fireEvent($slider, "MESSAGE", "TEST");
		}

		function backToCurrentSlide() {
			VMM.Lib.stop($slider_container);
			VMM.Lib.animate($slider_container, config.duration, "easeOutExpo", {"left": -(slides[current_slide].leftpos()) +  config.slider.content.padding} );
		}

		/* MESSEGES
		================================================== */
		function showMessege(e, msg, other) {
			trace("showMessege " + msg);
			//VMM.attachElement($timeline, $feedback);
			VMM.attachElement($explainer, "<div class='vco-explainer'><div class='vco-explainer-container'><div class='vco-bezel'><div class='vco-gesture-icon'></div>" + "<div class='vco-message'><p>" + msg + "</p></div></div></div></div>");
		};

		function hideMessege() {
			VMM.Lib.animate($explainer, config.duration, config.ease, {"opacity": 0}, detachMessege);
		};

		function detachMessege() {
			VMM.Lib.detach($explainer);
		}

		/* BUILD NAVIGATION
		================================================== */
		function buildNavigation() {

			var temp_icon = "<div class='icon'>&nbsp;</div>";

			navigation.nextBtn = VMM.appendAndGetElement($slider, "<div>", "nav-next");
			navigation.prevBtn = VMM.appendAndGetElement($slider, "<div>", "nav-previous");
			navigation.nextBtnContainer = VMM.appendAndGetElement(navigation.nextBtn, "<div>", "nav-container", temp_icon);
			navigation.prevBtnContainer = VMM.appendAndGetElement(navigation.prevBtn, "<div>", "nav-container", temp_icon);
			if (config.type == "timeline") {
				navigation.nextDate = VMM.appendAndGetElement(navigation.nextBtnContainer, "<div>", "date", "");
				navigation.prevDate = VMM.appendAndGetElement(navigation.prevBtnContainer, "<div>", "date", "");
			}
			navigation.nextTitle = VMM.appendAndGetElement(navigation.nextBtnContainer, "<div>", "title", "");
			navigation.prevTitle = VMM.appendAndGetElement(navigation.prevBtnContainer, "<div>", "title", "");

			VMM.bindEvent(".nav-next", onNextClick);
			VMM.bindEvent(".nav-previous", onPrevClick);
			VMM.bindEvent(window, onKeypressNav, 'keydown');

		}

		/* BUILD
		================================================== */
		function build() {
			var __duration = 3000;
			// Clear out existing content
			VMM.attachElement(layout, "");

			// Get DOM Objects to local objects
			$slider				= VMM.getElement(layout);
			$slider_mask		= VMM.appendAndGetElement($slider, "<div>", "slider-container-mask");
			$slider_container	= VMM.appendAndGetElement($slider_mask, "<div>", "slider-container");
			$slides_items		= VMM.appendAndGetElement($slider_container, "<div>", "slider-item-container");


			// BUILD NAVIGATION
			buildNavigation();

			// ATTACH SLIDES
			buildSlides(data);

			/* MAKE SLIDER DRAGGABLE/TOUCHABLE
			================================================== */

			if (VMM.Browser.device == "tablet" || VMM.Browser.device == "mobile") {
				// Different Animation duration for touch
				config.duration = 500;
				__duration = 1000;

				// Make touchable
				$dragslide = new VMM.DragSlider();
				$dragslide.createPanel($slider, $slider_container, "", config.touch, true);
				VMM.bindEvent($dragslide, onDragFinish, 'DRAGUPDATE');

				// EXPLAINER
				$explainer = VMM.appendAndGetElement($slider_mask, "<div>", "vco-feedback", "");
				showMessege(null, "Swipe to Navigate");
				VMM.Lib.height($explainer, config.slider.height);
				VMM.bindEvent($explainer, onExplainerClick);
				VMM.bindEvent($explainer, onExplainerClick, 'touchend');
			}

			reSize(false, true);


			VMM.Lib.visible(navigation.prevBtn, false);
			goToSlide(config.current_slide, "easeOutExpo", __duration, true, true);

			_active = true;
		};

	};

}






/* **********************************************
     Begin VMM.Slider.Slide.js
********************************************** */

/* Slider Slide
================================================== */

if (typeof VMM.Slider != 'undefined') {
	VMM.Slider.Slide = function(d, _parent) {

		var $media, $text, $slide, $wrap, element, c,
			data		= d,
			slide		= {},
			element		= "",
			media		= "",
			loaded		= false,
			preloaded	= false,
			is_skinny	= false,
			_enqueue	= true,
			_removeque	= false,
			_id			= "slide_",
			_class		= 0,
			timer		= {pushque:"", render:"", relayout:"", remove:"", skinny:false},
			times		= {pushque:500, render:100, relayout:100, remove:30000};

		_id				= _id + data.uniqueid;
		this.enqueue	= _enqueue;
		this.id			= _id;


		element		=	VMM.appendAndGetElement(_parent, "<div>", "slider-item");

		if (typeof data.classname != 'undefined') {
			trace("HAS CLASSNAME");
			VMM.Lib.addClass(element, data.classname);
		} else {
			trace("NO CLASSNAME");
			trace(data);
		}

		c = {slide:"", text: "", media: "", media_element: "", layout: "content-container layout", has: { headline: false, text: false, media: false }};

		/* PUBLIC
		================================================== */
		this.show = function(skinny) {
			_enqueue = false;
			timer.skinny = skinny;
			_removeque = false;
			clearTimeout(timer.remove);

			if (!loaded) {
				if (preloaded) {
					clearTimeout(timer.relayout);
					timer.relayout = setTimeout(reloadLayout, times.relayout);
				} else {
					render(skinny);
				}
			}
		};

		this.hide = function() {
			if (loaded && !_removeque) {
				_removeque = true;
				clearTimeout(timer.remove);
				timer.remove = setTimeout(removeSlide, times.remove);
			}
		};

		this.clearTimers = function() {
			//clearTimeout(timer.remove);
			clearTimeout(timer.relayout);
			clearTimeout(timer.pushque);
			clearTimeout(timer.render);
		};

		this.layout = function(skinny) {
			if (loaded && preloaded) {
				reLayout(skinny);
			}
		};

		this.elem = function() {
			return element;
		};

		this.position = function() {
			return VMM.Lib.position(element);
		};

		this.leftpos = function(p) {
			if(typeof p != 'undefined') {
				VMM.Lib.css(element, "left", p);
			} else {
				return VMM.Lib.position(element).left
			}
		};

		this.animate = function(d, e, p) {
			VMM.Lib.animate(element, d, e, p);
		};

		this.css = function(p, v) {
			VMM.Lib.css(element, p, v );
		}

		this.opacity = function(p) {
			VMM.Lib.css(element, "opacity", p);
		}

		this.width = function() {
			return VMM.Lib.width(element);
		};

		this.height = function() {
			return VMM.Lib.height(element);
		};

		this.content_height = function () {
			var ch = VMM.Lib.find( element, ".content")[0];

			if (ch != 'undefined' && ch != null) {
				return VMM.Lib.height(ch);
			} else {
				return 0;
			}
		}

		/* PRIVATE
		================================================== */
		var render = function(skinny) {
			trace("RENDER " + _id);

			loaded = true;
			preloaded = true;
			timer.skinny = skinny;

			buildSlide();

			clearTimeout(timer.pushque);
			clearTimeout(timer.render);
			timer.pushque = setTimeout(VMM.ExternalAPI.pushQues, times.pushque);

		};

		var removeSlide = function() {
			//VMM.attachElement(element, "");
			trace("REMOVE SLIDE TIMER FINISHED");
			loaded = false;
			VMM.Lib.detach($text);
			VMM.Lib.detach($media);

		};

		var reloadLayout = function() {
			loaded = true;
			reLayout(timer.skinny, true);
		};

		var reLayout = function(skinny, reload) {
			if (c.has.text)	{
				if (skinny) {
					if (!is_skinny || reload) {
						VMM.Lib.removeClass($slide, "pad-left");
						VMM.Lib.detach($text);
						VMM.Lib.detach($media);
						VMM.Lib.append($slide, $text);
						VMM.Lib.append($slide, $media);
						is_skinny = true;
					}
				} else {
					if (is_skinny || reload) {
						VMM.Lib.addClass($slide, "pad-left");
						VMM.Lib.detach($text);
						VMM.Lib.detach($media);
						VMM.Lib.append($slide, $media);
						VMM.Lib.append($slide, $text);
						is_skinny = false;

					}
				}
			} else if (reload) {
				if (c.has.headline) {
					VMM.Lib.detach($text);
					VMM.Lib.append($slide, $text);
				}
				VMM.Lib.detach($media);
				VMM.Lib.append($slide, $media);
			}
		}

		var buildSlide = function() {
			trace("BUILDSLIDE");
			$wrap	= VMM.appendAndGetElement(element, "<div>", "content");
			$slide	= VMM.appendAndGetElement($wrap, "<div>");

			/* DATE
			================================================== */
			if (data.startdate != null && data.startdate != "") {
				if (type.of(data.startdate) == "date") {
					if (data.type != "start") {
						var st	= VMM.Date.prettyDate(data.startdate, false, data.precisiondate);
						var en	= VMM.Date.prettyDate(data.enddate, false, data.precisiondate);
						var tag	= "";
						/* TAG / CATEGORY
						================================================== */
						if (data.tag != null && data.tag != "") {
							tag		= VMM.createElement("span", data.tag, "slide-tag");
						}

						if (st != en) {
							c.text += VMM.createElement("h2", st + " &mdash; " + en + tag, "date");
						} else {
							c.text += VMM.createElement("h2", st + tag, "date");
						}
					}
				}
			}

			/* HEADLINE
			================================================== */
			if (data.headline != null && data.headline != "") {
				c.has.headline	=	true;
				if (data.type == "start") {
					c.text		+=	VMM.createElement("h2", VMM.Util.linkify_with_twitter(data.headline, "_blank"), "start");
				} else {
					c.text		+=	VMM.createElement("h3", VMM.Util.linkify_with_twitter(data.headline, "_blank"));
				}
			}

			/* TEXT
			================================================== */
			if (data.text != null && data.text != "") {
				c.has.text		=  true;
				c.text			+= VMM.createElement("p", VMM.Util.linkify_with_twitter(data.text, "_blank"));

			}

			if (c.has.text || c.has.headline) {
				c.text		= VMM.createElement("div", c.text, "container");
				//$text		=	VMM.appendAndGetElement($slide, "<div>", "text", c.text);

				$text		= VMM.appendAndGetElement($slide, "<div>", "text", VMM.TextElement.create(c.text));

			}

			/* SLUG
			================================================== */
			if (data.needs_slug) {

			}

			/* MEDIA
			================================================== */
			if (data.asset != null && data.asset != "") {
				if (data.asset.media != null && data.asset.media != "") {
					c.has.media	= true;
					$media		= VMM.appendAndGetElement($slide, "<div>", "media", VMM.MediaElement.create(data.asset, data.uniqueid));
				}
			}

			/* COMBINE
			================================================== */
			if (c.has.text)	{ c.layout		+=	"-text"		};
			if (c.has.media){ c.layout		+=	"-media"	};

			if (c.has.text)	{
				if (timer.skinny) {
					VMM.Lib.addClass($slide, c.layout);
					is_skinny = true;
				} else {
					VMM.Lib.addClass($slide, c.layout);
					VMM.Lib.addClass($slide, "pad-left");
					VMM.Lib.detach($text);
					VMM.Lib.append($slide, $text);
				}

			} else {
				VMM.Lib.addClass($slide, c.layout);
			}

			/* ADD MODALS
			================================================== */
			// MOVE TO EVENT LISTENER UP THE FOOD CHAIN
			/*
			VMM.modal('.vmm-modal', {
				openEffect: 	'elastic',
				closeEffect: 	'elastic',
				padding: 		[2, 2, 2, 2]
			});
			*/
		};

	}

};


/* **********************************************
     Begin jquery.fancybox.js
********************************************** */

/*!
 * fancyBox - jQuery Plugin
 * version: 2.1.5 (Fri, 14 Jun 2013)
 * @requires jQuery v1.6 or later
 *
 * Examples at http://fancyapps.com/fancybox/
 * License: www.fancyapps.com/fancybox/#license
 *
 * Copyright 2012 Janis Skarnelis - janis@fancyapps.com
 *
 */

(function (window, document, $, undefined) {
	"use strict";

	var H = $("html"),
		W = $(window),
		D = $(document),
		F = $.fancybox = function () {
			F.open.apply( this, arguments );
		},
		IE =  navigator.userAgent.match(/msie/i),
		didUpdate	= null,
		isTouch		= document.createTouch !== undefined,

		isQuery	= function(obj) {
			return obj && obj.hasOwnProperty && obj instanceof $;
		},
		isString = function(str) {
			return str && $.type(str) === "string";
		},
		isPercentage = function(str) {
			return isString(str) && str.indexOf('%') > 0;
		},
		isScrollable = function(el) {
			return (el && !(el.style.overflow && el.style.overflow === 'hidden') && ((el.clientWidth && el.scrollWidth > el.clientWidth) || (el.clientHeight && el.scrollHeight > el.clientHeight)));
		},
		getScalar = function(orig, dim) {
			var value = parseInt(orig, 10) || 0;

			if (dim && isPercentage(orig)) {
				value = F.getViewport()[ dim ] / 100 * value;
			}

			return Math.ceil(value);
		},
		getValue = function(value, dim) {
			return getScalar(value, dim) + 'px';
		};

	$.extend(F, {
		// The current version of fancyBox
		version: '2.1.5',

		defaults: {
			padding : 15,
			margin  : 20,

			width     : 800,
			height    : 600,
			minWidth  : 100,
			minHeight : 100,
			maxWidth  : 9999,
			maxHeight : 9999,
			pixelRatio: 1, // Set to 2 for retina display support

			autoSize   : true,
			autoHeight : false,
			autoWidth  : false,

			autoResize  : true,
			autoCenter  : !isTouch,
			fitToView   : true,
			aspectRatio : false,
			topRatio    : 0.5,
			leftRatio   : 0.5,

			scrolling : 'auto', // 'auto', 'yes' or 'no'
			wrapCSS   : '',

			arrows     : true,
			closeBtn   : true,
			closeClick : false,
			nextClick  : false,
			mouseWheel : true,
			autoPlay   : false,
			playSpeed  : 3000,
			preload    : 3,
			modal      : false,
			loop       : true,

			ajax  : {
				dataType : 'html',
				headers  : { 'X-fancyBox': true }
			},
			iframe : {
				scrolling : 'auto',
				preload   : true
			},
			swf : {
				wmode: 'transparent',
				allowfullscreen   : 'true',
				allowscriptaccess : 'always'
			},

			keys  : {
				next : {
					13 : 'left', // enter
					34 : 'up',   // page down
					39 : 'left', // right arrow
					40 : 'up'    // down arrow
				},
				prev : {
					8  : 'right',  // backspace
					33 : 'down',   // page up
					37 : 'right',  // left arrow
					38 : 'down'    // up arrow
				},
				close  : [27], // escape key
				play   : [32], // space - start/stop slideshow
				toggle : [70]  // letter "f" - toggle fullscreen
			},

			direction : {
				next : 'left',
				prev : 'right'
			},

			scrollOutside  : true,

			// Override some properties
			index   : 0,
			type    : null,
			href    : null,
			content : null,
			title   : null,

			// HTML templates
			tpl: {
				wrap     : '<div class="fancybox-wrap" tabIndex="-1"><div class="fancybox-skin"><div class="fancybox-outer"><div class="fancybox-inner"></div></div></div></div>',
				image    : '<img class="fancybox-image" src="{href}" alt="" />',
				iframe   : '<iframe id="fancybox-frame{rnd}" name="fancybox-frame{rnd}" class="fancybox-iframe" frameborder="0" vspace="0" hspace="0" webkitAllowFullScreen mozallowfullscreen allowFullScreen' + (IE ? ' allowtransparency="true"' : '') + '></iframe>',
				error    : '<p class="fancybox-error">The requested content cannot be loaded.<br/>Please try again later.</p>',
				closeBtn : '<a title="Close" class="fancybox-item fancybox-close" href="javascript:;"></a>',
				next     : '<a title="Next" class="fancybox-nav fancybox-next" href="javascript:;"><span></span></a>',
				prev     : '<a title="Previous" class="fancybox-nav fancybox-prev" href="javascript:;"><span></span></a>'
			},

			// Properties for each animation type
			// Opening fancyBox
			openEffect  : 'fade', // 'elastic', 'fade' or 'none'
			openSpeed   : 250,
			openEasing  : 'swing',
			openOpacity : true,
			openMethod  : 'zoomIn',

			// Closing fancyBox
			closeEffect  : 'fade', // 'elastic', 'fade' or 'none'
			closeSpeed   : 250,
			closeEasing  : 'swing',
			closeOpacity : true,
			closeMethod  : 'zoomOut',

			// Changing next gallery item
			nextEffect : 'elastic', // 'elastic', 'fade' or 'none'
			nextSpeed  : 250,
			nextEasing : 'swing',
			nextMethod : 'changeIn',

			// Changing previous gallery item
			prevEffect : 'elastic', // 'elastic', 'fade' or 'none'
			prevSpeed  : 250,
			prevEasing : 'swing',
			prevMethod : 'changeOut',

			// Enable default helpers
			helpers : {
				overlay : true,
				title   : true
			},

			// Callbacks
			onCancel     : $.noop, // If canceling
			beforeLoad   : $.noop, // Before loading
			afterLoad    : $.noop, // After loading
			beforeShow   : $.noop, // Before changing in current item
			afterShow    : $.noop, // After opening
			beforeChange : $.noop, // Before changing gallery item
			beforeClose  : $.noop, // Before closing
			afterClose   : $.noop  // After closing
		},

		//Current state
		group    : {}, // Selected group
		opts     : {}, // Group options
		previous : null,  // Previous element
		coming   : null,  // Element being loaded
		current  : null,  // Currently loaded element
		isActive : false, // Is activated
		isOpen   : false, // Is currently open
		isOpened : false, // Have been fully opened at least once

		wrap  : null,
		skin  : null,
		outer : null,
		inner : null,

		player : {
			timer    : null,
			isActive : false
		},

		// Loaders
		ajaxLoad   : null,
		imgPreload : null,

		// Some collections
		transitions : {},
		helpers     : {},

		/*
		 *	Static methods
		 */

		open: function (group, opts) {
			if (!group) {
				return;
			}

			if (!$.isPlainObject(opts)) {
				opts = {};
			}

			// Close if already active
			if (false === F.close(true)) {
				return;
			}

			// Normalize group
			if (!$.isArray(group)) {
				group = isQuery(group) ? $(group).get() : [group];
			}

			// Recheck if the type of each element is `object` and set content type (image, ajax, etc)
			$.each(group, function(i, element) {
				var obj = {},
					href,
					title,
					content,
					type,
					rez,
					hrefParts,
					selector;

				if ($.type(element) === "object") {
					// Check if is DOM element
					if (element.nodeType) {
						element = $(element);
					}

					if (isQuery(element)) {
						obj = {
							href    : element.data('fancybox-href') || element.attr('href'),
							title   : element.data('fancybox-title') || element.attr('title'),
							isDom   : true,
							element : element
						};

						if ($.metadata) {
							$.extend(true, obj, element.metadata());
						}

					} else {
						obj = element;
					}
				}

				href  = opts.href  || obj.href || (isString(element) ? element : null);
				title = opts.title !== undefined ? opts.title : obj.title || '';

				content = opts.content || obj.content;
				type    = content ? 'html' : (opts.type  || obj.type);

				if (!type && obj.isDom) {
					type = element.data('fancybox-type');

					if (!type) {
						rez  = element.prop('class').match(/fancybox\.(\w+)/);
						type = rez ? rez[1] : null;
					}
				}

				if (isString(href)) {
					// Try to guess the content type
					if (!type) {
						if (F.isImage(href)) {
							type = 'image';

						} else if (F.isSWF(href)) {
							type = 'swf';

						} else if (href.charAt(0) === '#') {
							type = 'inline';

						} else if (isString(element)) {
							type    = 'html';
							content = element;
						}
					}

					// Split url into two pieces with source url and content selector, e.g,
					// "/mypage.html #my_id" will load "/mypage.html" and display element having id "my_id"
					if (type === 'ajax') {
						hrefParts = href.split(/\s+/, 2);
						href      = hrefParts.shift();
						selector  = hrefParts.shift();
					}
				}

				if (!content) {
					if (type === 'inline') {
						if (href) {
							content = $( isString(href) ? href.replace(/.*(?=#[^\s]+$)/, '') : href ); //strip for ie7

						} else if (obj.isDom) {
							content = element;
						}

					} else if (type === 'html') {
						content = href;

					} else if (!type && !href && obj.isDom) {
						type    = 'inline';
						content = element;
					}
				}

				$.extend(obj, {
					href     : href,
					type     : type,
					content  : content,
					title    : title,
					selector : selector
				});

				group[ i ] = obj;
			});

			// Extend the defaults
			F.opts = $.extend(true, {}, F.defaults, opts);

			// All options are merged recursive except keys
			if (opts.keys !== undefined) {
				F.opts.keys = opts.keys ? $.extend({}, F.defaults.keys, opts.keys) : false;
			}

			F.group = group;

			return F._start(F.opts.index);
		},

		// Cancel image loading or abort ajax request
		cancel: function () {
			var coming = F.coming;

			if (!coming || false === F.trigger('onCancel')) {
				return;
			}

			F.hideLoading();

			if (F.ajaxLoad) {
				F.ajaxLoad.abort();
			}

			F.ajaxLoad = null;

			if (F.imgPreload) {
				F.imgPreload.onload = F.imgPreload.onerror = null;
			}

			if (coming.wrap) {
				coming.wrap.stop(true, true).trigger('onReset').remove();
			}

			F.coming = null;

			// If the first item has been canceled, then clear everything
			if (!F.current) {
				F._afterZoomOut( coming );
			}
		},

		// Start closing animation if is open; remove immediately if opening/closing
		close: function (event) {
			F.cancel();

			if (false === F.trigger('beforeClose')) {
				return;
			}

			F.unbindEvents();

			if (!F.isActive) {
				return;
			}

			if (!F.isOpen || event === true) {
				$('.fancybox-wrap').stop(true).trigger('onReset').remove();

				F._afterZoomOut();

			} else {
				F.isOpen = F.isOpened = false;
				F.isClosing = true;

				$('.fancybox-item, .fancybox-nav').remove();

				F.wrap.stop(true, true).removeClass('fancybox-opened');

				F.transitions[ F.current.closeMethod ]();
			}
		},

		// Manage slideshow:
		//   $.fancybox.play(); - toggle slideshow
		//   $.fancybox.play( true ); - start
		//   $.fancybox.play( false ); - stop
		play: function ( action ) {
			var clear = function () {
					clearTimeout(F.player.timer);
				},
				set = function () {
					clear();

					if (F.current && F.player.isActive) {
						F.player.timer = setTimeout(F.next, F.current.playSpeed);
					}
				},
				stop = function () {
					clear();

					D.unbind('.player');

					F.player.isActive = false;

					F.trigger('onPlayEnd');
				},
				start = function () {
					if (F.current && (F.current.loop || F.current.index < F.group.length - 1)) {
						F.player.isActive = true;

						D.bind({
							'onCancel.player beforeClose.player' : stop,
							'onUpdate.player'   : set,
							'beforeLoad.player' : clear
						});

						set();

						F.trigger('onPlayStart');
					}
				};

			if (action === true || (!F.player.isActive && action !== false)) {
				start();
			} else {
				stop();
			}
		},

		// Navigate to next gallery item
		next: function ( direction ) {
			var current = F.current;

			if (current) {
				if (!isString(direction)) {
					direction = current.direction.next;
				}

				F.jumpto(current.index + 1, direction, 'next');
			}
		},

		// Navigate to previous gallery item
		prev: function ( direction ) {
			var current = F.current;

			if (current) {
				if (!isString(direction)) {
					direction = current.direction.prev;
				}

				F.jumpto(current.index - 1, direction, 'prev');
			}
		},

		// Navigate to gallery item by index
		jumpto: function ( index, direction, router ) {
			var current = F.current;

			if (!current) {
				return;
			}

			index = getScalar(index);

			F.direction = direction || current.direction[ (index >= current.index ? 'next' : 'prev') ];
			F.router    = router || 'jumpto';

			if (current.loop) {
				if (index < 0) {
					index = current.group.length + (index % current.group.length);
				}

				index = index % current.group.length;
			}

			if (current.group[ index ] !== undefined) {
				F.cancel();

				F._start(index);
			}
		},

		// Center inside viewport and toggle position type to fixed or absolute if needed
		reposition: function (e, onlyAbsolute) {
			var current = F.current,
				wrap    = current ? current.wrap : null,
				pos;

			if (wrap) {
				pos = F._getPosition(onlyAbsolute);

				if (e && e.type === 'scroll') {
					delete pos.position;

					wrap.stop(true, true).animate(pos, 200);

				} else {
					wrap.css(pos);

					current.pos = $.extend({}, current.dim, pos);
				}
			}
		},

		update: function (e) {
			var type = (e && e.type),
				anyway = !type || type === 'orientationchange';

			if (anyway) {
				clearTimeout(didUpdate);

				didUpdate = null;
			}

			if (!F.isOpen || didUpdate) {
				return;
			}

			didUpdate = setTimeout(function() {
				var current = F.current;

				if (!current || F.isClosing) {
					return;
				}

				F.wrap.removeClass('fancybox-tmp');

				if (anyway || type === 'load' || (type === 'resize' && current.autoResize)) {
					F._setDimension();
				}

				if (!(type === 'scroll' && current.canShrink)) {
					F.reposition(e);
				}

				F.trigger('onUpdate');

				didUpdate = null;

			}, (anyway && !isTouch ? 0 : 300));
		},

		// Shrink content to fit inside viewport or restore if resized
		toggle: function ( action ) {
			if (F.isOpen) {
				F.current.fitToView = $.type(action) === "boolean" ? action : !F.current.fitToView;

				// Help browser to restore document dimensions
				if (isTouch) {
					F.wrap.removeAttr('style').addClass('fancybox-tmp');

					F.trigger('onUpdate');
				}

				F.update();
			}
		},

		hideLoading: function () {
			D.unbind('.loading');

			$('#fancybox-loading').remove();
		},

		showLoading: function () {
			var el, viewport;

			F.hideLoading();

			el = $('<div id="fancybox-loading"><div></div></div>').click(F.cancel).appendTo('body');

			// If user will press the escape-button, the request will be canceled
			D.bind('keydown.loading', function(e) {
				if ((e.which || e.keyCode) === 27) {
					e.preventDefault();

					F.cancel();
				}
			});

			if (!F.defaults.fixed) {
				viewport = F.getViewport();

				el.css({
					position : 'absolute',
					top  : (viewport.h * 0.5) + viewport.y,
					left : (viewport.w * 0.5) + viewport.x
				});
			}
		},

		getViewport: function () {
			var locked = (F.current && F.current.locked) || false,
				rez    = {
					x: W.scrollLeft(),
					y: W.scrollTop()
				};

			if (locked) {
				rez.w = locked[0].clientWidth;
				rez.h = locked[0].clientHeight;

			} else {
				// See http://bugs.jquery.com/ticket/6724
				rez.w = isTouch && window.innerWidth  ? window.innerWidth  : W.width();
				rez.h = isTouch && window.innerHeight ? window.innerHeight : W.height();
			}

			return rez;
		},

		// Unbind the keyboard / clicking actions
		unbindEvents: function () {
			if (F.wrap && isQuery(F.wrap)) {
				F.wrap.unbind('.fb');
			}

			D.unbind('.fb');
			W.unbind('.fb');
		},

		bindEvents: function () {
			var current = F.current,
				keys;

			if (!current) {
				return;
			}

			// Changing document height on iOS devices triggers a 'resize' event,
			// that can change document height... repeating infinitely
			W.bind('orientationchange.fb' + (isTouch ? '' : ' resize.fb') + (current.autoCenter && !current.locked ? ' scroll.fb' : ''), F.update);

			keys = current.keys;

			if (keys) {
				D.bind('keydown.fb', function (e) {
					var code   = e.which || e.keyCode,
						target = e.target || e.srcElement;

					// Skip esc key if loading, because showLoading will cancel preloading
					if (code === 27 && F.coming) {
						return false;
					}

					// Ignore key combinations and key events within form elements
					if (!e.ctrlKey && !e.altKey && !e.shiftKey && !e.metaKey && !(target && (target.type || $(target).is('[contenteditable]')))) {
						$.each(keys, function(i, val) {
							if (current.group.length > 1 && val[ code ] !== undefined) {
								F[ i ]( val[ code ] );

								e.preventDefault();
								return false;
							}

							if ($.inArray(code, val) > -1) {
								F[ i ] ();

								e.preventDefault();
								return false;
							}
						});
					}
				});
			}

			if ($.fn.mousewheel && current.mouseWheel) {
				F.wrap.bind('mousewheel.fb', function (e, delta, deltaX, deltaY) {
					var target = e.target || null,
						parent = $(target),
						canScroll = false;

					while (parent.length) {
						if (canScroll || parent.is('.fancybox-skin') || parent.is('.fancybox-wrap')) {
							break;
						}

						canScroll = isScrollable( parent[0] );
						parent    = $(parent).parent();
					}

					if (delta !== 0 && !canScroll) {
						if (F.group.length > 1 && !current.canShrink) {
							if (deltaY > 0 || deltaX > 0) {
								F.prev( deltaY > 0 ? 'down' : 'left' );

							} else if (deltaY < 0 || deltaX < 0) {
								F.next( deltaY < 0 ? 'up' : 'right' );
							}

							e.preventDefault();
						}
					}
				});
			}
		},

		trigger: function (event, o) {
			var ret, obj = o || F.coming || F.current;

			if (!obj) {
				return;
			}

			if ($.isFunction( obj[event] )) {
				ret = obj[event].apply(obj, Array.prototype.slice.call(arguments, 1));
			}

			if (ret === false) {
				return false;
			}

			if (obj.helpers) {
				$.each(obj.helpers, function (helper, opts) {
					if (opts && F.helpers[helper] && $.isFunction(F.helpers[helper][event])) {
						F.helpers[helper][event]($.extend(true, {}, F.helpers[helper].defaults, opts), obj);
					}
				});
			}

			D.trigger(event);
		},

		isImage: function (str) {
			return isString(str) && str.match(/(^data:image\/.*,)|(\.(jp(e|g|eg)|gif|png|bmp|webp|svg)((\?|#).*)?$)/i);
		},

		isSWF: function (str) {
			return isString(str) && str.match(/\.(swf)((\?|#).*)?$/i);
		},

		_start: function (index) {
			var coming = {},
				obj,
				href,
				type,
				margin,
				padding;

			index = getScalar( index );
			obj   = F.group[ index ] || null;

			if (!obj) {
				return false;
			}

			coming = $.extend(true, {}, F.opts, obj);

			// Convert margin and padding properties to array - top, right, bottom, left
			margin  = coming.margin;
			padding = coming.padding;

			if ($.type(margin) === 'number') {
				coming.margin = [margin, margin, margin, margin];
			}

			if ($.type(padding) === 'number') {
				coming.padding = [padding, padding, padding, padding];
			}

			// 'modal' propery is just a shortcut
			if (coming.modal) {
				$.extend(true, coming, {
					closeBtn   : false,
					closeClick : false,
					nextClick  : false,
					arrows     : false,
					mouseWheel : false,
					keys       : null,
					helpers: {
						overlay : {
							closeClick : false
						}
					}
				});
			}

			// 'autoSize' property is a shortcut, too
			if (coming.autoSize) {
				coming.autoWidth = coming.autoHeight = true;
			}

			if (coming.width === 'auto') {
				coming.autoWidth = true;
			}

			if (coming.height === 'auto') {
				coming.autoHeight = true;
			}

			/*
			 * Add reference to the group, so it`s possible to access from callbacks, example:
			 * afterLoad : function() {
			 *     this.title = 'Image ' + (this.index + 1) + ' of ' + this.group.length + (this.title ? ' - ' + this.title : '');
			 * }
			 */

			coming.group  = F.group;
			coming.index  = index;

			// Give a chance for callback or helpers to update coming item (type, title, etc)
			F.coming = coming;

			if (false === F.trigger('beforeLoad')) {
				F.coming = null;

				return;
			}

			type = coming.type;
			href = coming.href;

			if (!type) {
				F.coming = null;

				//If we can not determine content type then drop silently or display next/prev item if looping through gallery
				if (F.current && F.router && F.router !== 'jumpto') {
					F.current.index = index;

					return F[ F.router ]( F.direction );
				}

				return false;
			}

			F.isActive = true;

			if (type === 'image' || type === 'swf') {
				coming.autoHeight = coming.autoWidth = false;
				coming.scrolling  = 'visible';
			}

			if (type === 'image') {
				coming.aspectRatio = true;
			}

			if (type === 'iframe' && isTouch) {
				coming.scrolling = 'scroll';
			}

			// Build the neccessary markup
			coming.wrap = $(coming.tpl.wrap).addClass('fancybox-' + (isTouch ? 'mobile' : 'desktop') + ' fancybox-type-' + type + ' fancybox-tmp ' + coming.wrapCSS).appendTo( coming.parent || 'body' );

			$.extend(coming, {
				skin  : $('.fancybox-skin',  coming.wrap),
				outer : $('.fancybox-outer', coming.wrap),
				inner : $('.fancybox-inner', coming.wrap)
			});

			$.each(["Top", "Right", "Bottom", "Left"], function(i, v) {
				coming.skin.css('padding' + v, getValue(coming.padding[ i ]));
			});

			F.trigger('onReady');

			// Check before try to load; 'inline' and 'html' types need content, others - href
			if (type === 'inline' || type === 'html') {
				if (!coming.content || !coming.content.length) {
					return F._error( 'content' );
				}

			} else if (!href) {
				return F._error( 'href' );
			}

			if (type === 'image') {
				F._loadImage();

			} else if (type === 'ajax') {
				F._loadAjax();

			} else if (type === 'iframe') {
				F._loadIframe();

			} else {
				F._afterLoad();
			}
		},

		_error: function ( type ) {
			$.extend(F.coming, {
				type       : 'html',
				autoWidth  : true,
				autoHeight : true,
				minWidth   : 0,
				minHeight  : 0,
				scrolling  : 'no',
				hasError   : type,
				content    : F.coming.tpl.error
			});

			F._afterLoad();
		},

		_loadImage: function () {
			// Reset preload image so it is later possible to check "complete" property
			var img = F.imgPreload = new Image();

			img.onload = function () {
				this.onload = this.onerror = null;

				F.coming.width  = this.width / F.opts.pixelRatio;
				F.coming.height = this.height / F.opts.pixelRatio;

				F._afterLoad();
			};

			img.onerror = function () {
				this.onload = this.onerror = null;

				F._error( 'image' );
			};

			img.src = F.coming.href;

			if (img.complete !== true) {
				F.showLoading();
			}
		},

		_loadAjax: function () {
			var coming = F.coming;

			F.showLoading();

			F.ajaxLoad = $.ajax($.extend({}, coming.ajax, {
				url: coming.href,
				error: function (jqXHR, textStatus) {
					if (F.coming && textStatus !== 'abort') {
						F._error( 'ajax', jqXHR );

					} else {
						F.hideLoading();
					}
				},
				success: function (data, textStatus) {
					if (textStatus === 'success') {
						coming.content = data;

						F._afterLoad();
					}
				}
			}));
		},

		_loadIframe: function() {
			var coming = F.coming,
				iframe = $(coming.tpl.iframe.replace(/\{rnd\}/g, new Date().getTime()))
					.attr('scrolling', isTouch ? 'auto' : coming.iframe.scrolling)
					.attr('src', coming.href);

			// This helps IE
			$(coming.wrap).bind('onReset', function () {
				try {
					$(this).find('iframe').hide().attr('src', '//about:blank').end().empty();
				} catch (e) {}
			});

			if (coming.iframe.preload) {
				F.showLoading();

				iframe.one('load', function() {
					$(this).data('ready', 1);

					// iOS will lose scrolling if we resize
					if (!isTouch) {
						$(this).bind('load.fb', F.update);
					}

					// Without this trick:
					//   - iframe won't scroll on iOS devices
					//   - IE7 sometimes displays empty iframe
					$(this).parents('.fancybox-wrap').width('100%').removeClass('fancybox-tmp').show();

					F._afterLoad();
				});
			}

			coming.content = iframe.appendTo( coming.inner );

			if (!coming.iframe.preload) {
				F._afterLoad();
			}
		},

		_preloadImages: function() {
			var group   = F.group,
				current = F.current,
				len     = group.length,
				cnt     = current.preload ? Math.min(current.preload, len - 1) : 0,
				item,
				i;

			for (i = 1; i <= cnt; i += 1) {
				item = group[ (current.index + i ) % len ];

				if (item.type === 'image' && item.href) {
					new Image().src = item.href;
				}
			}
		},

		_afterLoad: function () {
			var coming   = F.coming,
				previous = F.current,
				placeholder = 'fancybox-placeholder',
				current,
				content,
				type,
				scrolling,
				href,
				embed;

			F.hideLoading();

			if (!coming || F.isActive === false) {
				return;
			}

			if (false === F.trigger('afterLoad', coming, previous)) {
				coming.wrap.stop(true).trigger('onReset').remove();

				F.coming = null;

				return;
			}

			if (previous) {
				F.trigger('beforeChange', previous);

				previous.wrap.stop(true).removeClass('fancybox-opened')
					.find('.fancybox-item, .fancybox-nav')
					.remove();
			}

			F.unbindEvents();

			current   = coming;
			content   = coming.content;
			type      = coming.type;
			scrolling = coming.scrolling;

			$.extend(F, {
				wrap  : current.wrap,
				skin  : current.skin,
				outer : current.outer,
				inner : current.inner,
				current  : current,
				previous : previous
			});

			href = current.href;

			switch (type) {
				case 'inline':
				case 'ajax':
				case 'html':
					if (current.selector) {
						content = $('<div>').html(content).find(current.selector);

					} else if (isQuery(content)) {
						if (!content.data(placeholder)) {
							content.data(placeholder, $('<div class="' + placeholder + '"></div>').insertAfter( content ).hide() );
						}

						content = content.show().detach();

						current.wrap.bind('onReset', function () {
							if ($(this).find(content).length) {
								content.hide().replaceAll( content.data(placeholder) ).data(placeholder, false);
							}
						});
					}
				break;

				case 'image':
					content = current.tpl.image.replace('{href}', href);
				break;

				case 'swf':
					content = '<object id="fancybox-swf" classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" width="100%" height="100%"><param name="movie" value="' + href + '"></param>';
					embed   = '';

					$.each(current.swf, function(name, val) {
						content += '<param name="' + name + '" value="' + val + '"></param>';
						embed   += ' ' + name + '="' + val + '"';
					});

					content += '<embed src="' + href + '" type="application/x-shockwave-flash" width="100%" height="100%"' + embed + '></embed></object>';
				break;
			}

			if (!(isQuery(content) && content.parent().is(current.inner))) {
				current.inner.append( content );
			}

			// Give a chance for helpers or callbacks to update elements
			F.trigger('beforeShow');

			// Set scrolling before calculating dimensions
			current.inner.css('overflow', scrolling === 'yes' ? 'scroll' : (scrolling === 'no' ? 'hidden' : scrolling));

			// Set initial dimensions and start position
			F._setDimension();

			F.reposition();

			F.isOpen = false;
			F.coming = null;

			F.bindEvents();

			if (!F.isOpened) {
				$('.fancybox-wrap').not( current.wrap ).stop(true).trigger('onReset').remove();

			} else if (previous.prevMethod) {
				F.transitions[ previous.prevMethod ]();
			}

			F.transitions[ F.isOpened ? current.nextMethod : current.openMethod ]();

			F._preloadImages();
		},

		_setDimension: function () {
			var viewport   = F.getViewport(),
				steps      = 0,
				canShrink  = false,
				canExpand  = false,
				wrap       = F.wrap,
				skin       = F.skin,
				inner      = F.inner,
				current    = F.current,
				width      = current.width,
				height     = current.height,
				minWidth   = current.minWidth,
				minHeight  = current.minHeight,
				maxWidth   = current.maxWidth,
				maxHeight  = current.maxHeight,
				scrolling  = current.scrolling,
				scrollOut  = current.scrollOutside ? current.scrollbarWidth : 0,
				margin     = current.margin,
				wMargin    = getScalar(margin[1] + margin[3]),
				hMargin    = getScalar(margin[0] + margin[2]),
				wPadding,
				hPadding,
				wSpace,
				hSpace,
				origWidth,
				origHeight,
				origMaxWidth,
				origMaxHeight,
				ratio,
				width_,
				height_,
				maxWidth_,
				maxHeight_,
				iframe,
				body;

			// Reset dimensions so we could re-check actual size
			wrap.add(skin).add(inner).width('auto').height('auto').removeClass('fancybox-tmp');

			wPadding = getScalar(skin.outerWidth(true)  - skin.width());
			hPadding = getScalar(skin.outerHeight(true) - skin.height());

			// Any space between content and viewport (margin, padding, border, title)
			wSpace = wMargin + wPadding;
			hSpace = hMargin + hPadding;

			origWidth  = isPercentage(width)  ? (viewport.w - wSpace) * getScalar(width)  / 100 : width;
			origHeight = isPercentage(height) ? (viewport.h - hSpace) * getScalar(height) / 100 : height;

			if (current.type === 'iframe') {
				iframe = current.content;

				if (current.autoHeight && iframe.data('ready') === 1) {
					try {
						if (iframe[0].contentWindow.document.location) {
							inner.width( origWidth ).height(9999);

							body = iframe.contents().find('body');

							if (scrollOut) {
								body.css('overflow-x', 'hidden');
							}

							origHeight = body.outerHeight(true);
						}

					} catch (e) {}
				}

			} else if (current.autoWidth || current.autoHeight) {
				inner.addClass( 'fancybox-tmp' );

				// Set width or height in case we need to calculate only one dimension
				if (!current.autoWidth) {
					inner.width( origWidth );
				}

				if (!current.autoHeight) {
					inner.height( origHeight );
				}

				if (current.autoWidth) {
					origWidth = inner.width();
				}

				if (current.autoHeight) {
					origHeight = inner.height();
				}

				inner.removeClass( 'fancybox-tmp' );
			}

			width  = getScalar( origWidth );
			height = getScalar( origHeight );

			ratio  = origWidth / origHeight;

			// Calculations for the content
			minWidth  = getScalar(isPercentage(minWidth) ? getScalar(minWidth, 'w') - wSpace : minWidth);
			maxWidth  = getScalar(isPercentage(maxWidth) ? getScalar(maxWidth, 'w') - wSpace : maxWidth);

			minHeight = getScalar(isPercentage(minHeight) ? getScalar(minHeight, 'h') - hSpace : minHeight);
			maxHeight = getScalar(isPercentage(maxHeight) ? getScalar(maxHeight, 'h') - hSpace : maxHeight);

			// These will be used to determine if wrap can fit in the viewport
			origMaxWidth  = maxWidth;
			origMaxHeight = maxHeight;

			if (current.fitToView) {
				maxWidth  = Math.min(viewport.w - wSpace, maxWidth);
				maxHeight = Math.min(viewport.h - hSpace, maxHeight);
			}

			maxWidth_  = viewport.w - wMargin;
			maxHeight_ = viewport.h - hMargin;

			if (current.aspectRatio) {
				if (width > maxWidth) {
					width  = maxWidth;
					height = getScalar(width / ratio);
				}

				if (height > maxHeight) {
					height = maxHeight;
					width  = getScalar(height * ratio);
				}

				if (width < minWidth) {
					width  = minWidth;
					height = getScalar(width / ratio);
				}

				if (height < minHeight) {
					height = minHeight;
					width  = getScalar(height * ratio);
				}

			} else {
				width = Math.max(minWidth, Math.min(width, maxWidth));

				if (current.autoHeight && current.type !== 'iframe') {
					inner.width( width );

					height = inner.height();
				}

				height = Math.max(minHeight, Math.min(height, maxHeight));
			}

			// Try to fit inside viewport (including the title)
			if (current.fitToView) {
				inner.width( width ).height( height );

				wrap.width( width + wPadding );

				// Real wrap dimensions
				width_  = wrap.width();
				height_ = wrap.height();

				if (current.aspectRatio) {
					while ((width_ > maxWidth_ || height_ > maxHeight_) && width > minWidth && height > minHeight) {
						if (steps++ > 19) {
							break;
						}

						height = Math.max(minHeight, Math.min(maxHeight, height - 10));
						width  = getScalar(height * ratio);

						if (width < minWidth) {
							width  = minWidth;
							height = getScalar(width / ratio);
						}

						if (width > maxWidth) {
							width  = maxWidth;
							height = getScalar(width / ratio);
						}

						inner.width( width ).height( height );

						wrap.width( width + wPadding );

						width_  = wrap.width();
						height_ = wrap.height();
					}

				} else {
					width  = Math.max(minWidth,  Math.min(width,  width  - (width_  - maxWidth_)));
					height = Math.max(minHeight, Math.min(height, height - (height_ - maxHeight_)));
				}
			}

			if (scrollOut && scrolling === 'auto' && height < origHeight && (width + wPadding + scrollOut) < maxWidth_) {
				width += scrollOut;
			}

			inner.width( width ).height( height );

			wrap.width( width + wPadding );

			width_  = wrap.width();
			height_ = wrap.height();

			canShrink = (width_ > maxWidth_ || height_ > maxHeight_) && width > minWidth && height > minHeight;
			canExpand = current.aspectRatio ? (width < origMaxWidth && height < origMaxHeight && width < origWidth && height < origHeight) : ((width < origMaxWidth || height < origMaxHeight) && (width < origWidth || height < origHeight));

			$.extend(current, {
				dim : {
					width	: getValue( width_ ),
					height	: getValue( height_ )
				},
				origWidth  : origWidth,
				origHeight : origHeight,
				canShrink  : canShrink,
				canExpand  : canExpand,
				wPadding   : wPadding,
				hPadding   : hPadding,
				wrapSpace  : height_ - skin.outerHeight(true),
				skinSpace  : skin.height() - height
			});

			if (!iframe && current.autoHeight && height > minHeight && height < maxHeight && !canExpand) {
				inner.height('auto');
			}
		},

		_getPosition: function (onlyAbsolute) {
			var current  = F.current,
				viewport = F.getViewport(),
				margin   = current.margin,
				width    = F.wrap.width()  + margin[1] + margin[3],
				height   = F.wrap.height() + margin[0] + margin[2],
				rez      = {
					position: 'absolute',
					top  : margin[0],
					left : margin[3]
				};

			if (current.autoCenter && current.fixed && !onlyAbsolute && height <= viewport.h && width <= viewport.w) {
				rez.position = 'fixed';

			} else if (!current.locked) {
				rez.top  += viewport.y;
				rez.left += viewport.x;
			}

			rez.top  = getValue(Math.max(rez.top,  rez.top  + ((viewport.h - height) * current.topRatio)));
			rez.left = getValue(Math.max(rez.left, rez.left + ((viewport.w - width)  * current.leftRatio)));

			return rez;
		},

		_afterZoomIn: function () {
			var current = F.current;

			if (!current) {
				return;
			}

			F.isOpen = F.isOpened = true;

			F.wrap.css('overflow', 'visible').addClass('fancybox-opened');

			F.update();

			// Assign a click event
			if ( current.closeClick || (current.nextClick && F.group.length > 1) ) {
				F.inner.css('cursor', 'pointer').bind('click.fb', function(e) {
					if (!$(e.target).is('a') && !$(e.target).parent().is('a')) {
						e.preventDefault();

						F[ current.closeClick ? 'close' : 'next' ]();
					}
				});
			}

			// Create a close button
			if (current.closeBtn) {
				$(current.tpl.closeBtn).appendTo(F.skin).bind('click.fb', function(e) {
					e.preventDefault();

					F.close();
				});
			}

			// Create navigation arrows
			if (current.arrows && F.group.length > 1) {
				if (current.loop || current.index > 0) {
					$(current.tpl.prev).appendTo(F.outer).bind('click.fb', F.prev);
				}

				if (current.loop || current.index < F.group.length - 1) {
					$(current.tpl.next).appendTo(F.outer).bind('click.fb', F.next);
				}
			}

			F.trigger('afterShow');

			// Stop the slideshow if this is the last item
			if (!current.loop && current.index === current.group.length - 1) {
				F.play( false );

			} else if (F.opts.autoPlay && !F.player.isActive) {
				F.opts.autoPlay = false;

				F.play();
			}
		},

		_afterZoomOut: function ( obj ) {
			obj = obj || F.current;

			$('.fancybox-wrap').trigger('onReset').remove();

			$.extend(F, {
				group  : {},
				opts   : {},
				router : false,
				current   : null,
				isActive  : false,
				isOpened  : false,
				isOpen    : false,
				isClosing : false,
				wrap   : null,
				skin   : null,
				outer  : null,
				inner  : null
			});

			F.trigger('afterClose', obj);
		}
	});

	/*
	 *	Default transitions
	 */

	F.transitions = {
		getOrigPosition: function () {
			var current  = F.current,
				element  = current.element,
				orig     = current.orig,
				pos      = {},
				width    = 50,
				height   = 50,
				hPadding = current.hPadding,
				wPadding = current.wPadding,
				viewport = F.getViewport();

			if (!orig && current.isDom && element.is(':visible')) {
				orig = element.find('img:first');

				if (!orig.length) {
					orig = element;
				}
			}

			if (isQuery(orig)) {
				pos = orig.offset();

				if (orig.is('img')) {
					width  = orig.outerWidth();
					height = orig.outerHeight();
				}

			} else {
				pos.top  = viewport.y + (viewport.h - height) * current.topRatio;
				pos.left = viewport.x + (viewport.w - width)  * current.leftRatio;
			}

			if (F.wrap.css('position') === 'fixed' || current.locked) {
				pos.top  -= viewport.y;
				pos.left -= viewport.x;
			}

			pos = {
				top     : getValue(pos.top  - hPadding * current.topRatio),
				left    : getValue(pos.left - wPadding * current.leftRatio),
				width   : getValue(width  + wPadding),
				height  : getValue(height + hPadding)
			};

			return pos;
		},

		step: function (now, fx) {
			var ratio,
				padding,
				value,
				prop       = fx.prop,
				current    = F.current,
				wrapSpace  = current.wrapSpace,
				skinSpace  = current.skinSpace;

			if (prop === 'width' || prop === 'height') {
				ratio = fx.end === fx.start ? 1 : (now - fx.start) / (fx.end - fx.start);

				if (F.isClosing) {
					ratio = 1 - ratio;
				}

				padding = prop === 'width' ? current.wPadding : current.hPadding;
				value   = now - padding;

				F.skin[ prop ](  getScalar( prop === 'width' ?  value : value - (wrapSpace * ratio) ) );
				F.inner[ prop ]( getScalar( prop === 'width' ?  value : value - (wrapSpace * ratio) - (skinSpace * ratio) ) );
			}
		},

		zoomIn: function () {
			var current  = F.current,
				startPos = current.pos,
				effect   = current.openEffect,
				elastic  = effect === 'elastic',
				endPos   = $.extend({opacity : 1}, startPos);

			// Remove "position" property that breaks older IE
			delete endPos.position;

			if (elastic) {
				startPos = this.getOrigPosition();

				if (current.openOpacity) {
					startPos.opacity = 0.1;
				}

			} else if (effect === 'fade') {
				startPos.opacity = 0.1;
			}

			F.wrap.css(startPos).animate(endPos, {
				duration : effect === 'none' ? 0 : current.openSpeed,
				easing   : current.openEasing,
				step     : elastic ? this.step : null,
				complete : F._afterZoomIn
			});
		},

		zoomOut: function () {
			var current  = F.current,
				effect   = current.closeEffect,
				elastic  = effect === 'elastic',
				endPos   = {opacity : 0.1};

			if (elastic) {
				endPos = this.getOrigPosition();

				if (current.closeOpacity) {
					endPos.opacity = 0.1;
				}
			}

			F.wrap.animate(endPos, {
				duration : effect === 'none' ? 0 : current.closeSpeed,
				easing   : current.closeEasing,
				step     : elastic ? this.step : null,
				complete : F._afterZoomOut
			});
		},

		changeIn: function () {
			var current   = F.current,
				effect    = current.nextEffect,
				startPos  = current.pos,
				endPos    = { opacity : 1 },
				direction = F.direction,
				distance  = 200,
				field;

			startPos.opacity = 0.1;

			if (effect === 'elastic') {
				field = direction === 'down' || direction === 'up' ? 'top' : 'left';

				if (direction === 'down' || direction === 'right') {
					startPos[ field ] = getValue(getScalar(startPos[ field ]) - distance);
					endPos[ field ]   = '+=' + distance + 'px';

				} else {
					startPos[ field ] = getValue(getScalar(startPos[ field ]) + distance);
					endPos[ field ]   = '-=' + distance + 'px';
				}
			}

			// Workaround for http://bugs.jquery.com/ticket/12273
			if (effect === 'none') {
				F._afterZoomIn();

			} else {
				F.wrap.css(startPos).animate(endPos, {
					duration : current.nextSpeed,
					easing   : current.nextEasing,
					complete : F._afterZoomIn
				});
			}
		},

		changeOut: function () {
			var previous  = F.previous,
				effect    = previous.prevEffect,
				endPos    = { opacity : 0.1 },
				direction = F.direction,
				distance  = 200;

			if (effect === 'elastic') {
				endPos[ direction === 'down' || direction === 'up' ? 'top' : 'left' ] = ( direction === 'up' || direction === 'left' ? '-' : '+' ) + '=' + distance + 'px';
			}

			previous.wrap.animate(endPos, {
				duration : effect === 'none' ? 0 : previous.prevSpeed,
				easing   : previous.prevEasing,
				complete : function () {
					$(this).trigger('onReset').remove();
				}
			});
		}
	};

	/*
	 *	Overlay helper
	 */

	F.helpers.overlay = {
		defaults : {
			closeClick : true,      // if true, fancyBox will be closed when user clicks on the overlay
			speedOut   : 200,       // duration of fadeOut animation
			showEarly  : true,      // indicates if should be opened immediately or wait until the content is ready
			css        : {},        // custom CSS properties
			locked     : !isTouch,  // if true, the content will be locked into overlay
			fixed      : true       // if false, the overlay CSS position property will not be set to "fixed"
		},

		overlay : null,      // current handle
		fixed   : false,     // indicates if the overlay has position "fixed"
		el      : $('html'), // element that contains "the lock"

		// Public methods
		create : function(opts) {
			opts = $.extend({}, this.defaults, opts);

			if (this.overlay) {
				this.close();
			}

			this.overlay = $('<div class="fancybox-overlay"></div>').appendTo( F.coming ? F.coming.parent : opts.parent );
			this.fixed   = false;

			if (opts.fixed && F.defaults.fixed) {
				this.overlay.addClass('fancybox-overlay-fixed');

				this.fixed = true;
			}
		},

		open : function(opts) {
			var that = this;

			opts = $.extend({}, this.defaults, opts);

			if (this.overlay) {
				this.overlay.unbind('.overlay').width('auto').height('auto');

			} else {
				this.create(opts);
			}

			if (!this.fixed) {
				W.bind('resize.overlay', $.proxy( this.update, this) );

				this.update();
			}

			if (opts.closeClick) {
				this.overlay.bind('click.overlay', function(e) {
					if ($(e.target).hasClass('fancybox-overlay')) {
						if (F.isActive) {
							F.close();
						} else {
							that.close();
						}

						return false;
					}
				});
			}

			this.overlay.css( opts.css ).show();
		},

		close : function() {
			var scrollV, scrollH;

			W.unbind('resize.overlay');

			if (this.el.hasClass('fancybox-lock')) {
				$('.fancybox-margin').removeClass('fancybox-margin');

				scrollV = W.scrollTop();
				scrollH = W.scrollLeft();

				this.el.removeClass('fancybox-lock');

				W.scrollTop( scrollV ).scrollLeft( scrollH );
			}

			$('.fancybox-overlay').remove().hide();

			$.extend(this, {
				overlay : null,
				fixed   : false
			});
		},

		// Private, callbacks

		update : function () {
			var width = '100%', offsetWidth;

			// Reset width/height so it will not mess
			this.overlay.width(width).height('100%');

			// jQuery does not return reliable result for IE
			if (IE) {
				offsetWidth = Math.max(document.documentElement.offsetWidth, document.body.offsetWidth);

				if (D.width() > offsetWidth) {
					width = D.width();
				}

			} else if (D.width() > W.width()) {
				width = D.width();
			}

			this.overlay.width(width).height(D.height());
		},

		// This is where we can manipulate DOM, because later it would cause iframes to reload
		onReady : function (opts, obj) {
			var overlay = this.overlay;

			$('.fancybox-overlay').stop(true, true);

			if (!overlay) {
				this.create(opts);
			}

			if (opts.locked && this.fixed && obj.fixed) {
				if (!overlay) {
					this.margin = D.height() > W.height() ? $('html').css('margin-right').replace("px", "") : false;
				}

				obj.locked = this.overlay.append( obj.wrap );
				obj.fixed  = false;
			}

			if (opts.showEarly === true) {
				this.beforeShow.apply(this, arguments);
			}
		},

		beforeShow : function(opts, obj) {
			var scrollV, scrollH;

			if (obj.locked) {
				if (this.margin !== false) {
					$('*').filter(function(){
						return ($(this).css('position') === 'fixed' && !$(this).hasClass("fancybox-overlay") && !$(this).hasClass("fancybox-wrap") );
					}).addClass('fancybox-margin');

					this.el.addClass('fancybox-margin');
				}

				scrollV = W.scrollTop();
				scrollH = W.scrollLeft();

				this.el.addClass('fancybox-lock');

				W.scrollTop( scrollV ).scrollLeft( scrollH );
			}

			this.open(opts);
		},

		onUpdate : function() {
			if (!this.fixed) {
				this.update();
			}
		},

		afterClose: function (opts) {
			// Remove overlay if exists and fancyBox is not opening
			// (e.g., it is not being open using afterClose callback)
			//if (this.overlay && !F.isActive) {
			if (this.overlay && !F.coming) {
				this.overlay.fadeOut(opts.speedOut, $.proxy( this.close, this ));
			}
		}
	};

	/*
	 *	Title helper
	 */

	F.helpers.title = {
		defaults : {
			type     : 'float', // 'float', 'inside', 'outside' or 'over',
			position : 'bottom' // 'top' or 'bottom'
		},

		beforeShow: function (opts) {
			var current = F.current,
				text    = current.title,
				type    = opts.type,
				title,
				target;

			if ($.isFunction(text)) {
				text = text.call(current.element, current);
			}

			if (!isString(text) || $.trim(text) === '') {
				return;
			}

			title = $('<div class="fancybox-title fancybox-title-' + type + '-wrap">' + text + '</div>');

			switch (type) {
				case 'inside':
					target = F.skin;
				break;

				case 'outside':
					target = F.wrap;
				break;

				case 'over':
					target = F.inner;
				break;

				default: // 'float'
					target = F.skin;

					title.appendTo('body');

					if (IE) {
						title.width( title.width() );
					}

					title.wrapInner('<span class="child"></span>');

					//Increase bottom margin so this title will also fit into viewport
					F.current.margin[2] += Math.abs( getScalar(title.css('margin-bottom')) );
				break;
			}

			title[ (opts.position === 'top' ? 'prependTo'  : 'appendTo') ](target);
		}
	};

	// jQuery plugin initialization
	$.fn.fancybox = function (options) {
		var index,
			that     = $(this),
			selector = this.selector || '',
			run      = function(e) {
				var what = $(this).blur(), idx = index, relType, relVal;

				if (!(e.ctrlKey || e.altKey || e.shiftKey || e.metaKey) && !what.is('.fancybox-wrap')) {
					relType = options.groupAttr || 'data-fancybox-group';
					relVal  = what.attr(relType);

					if (!relVal) {
						relType = 'rel';
						relVal  = what.get(0)[ relType ];
					}

					if (relVal && relVal !== '' && relVal !== 'nofollow') {
						what = selector.length ? $(selector) : that;
						what = what.filter('[' + relType + '="' + relVal + '"]');
						idx  = what.index(this);
					}

					options.index = idx;

					// Stop an event from bubbling if everything is fine
					if (F.open(what, options) !== false) {
						e.preventDefault();
					}
				}
			};

		options = options || {};
		index   = options.index || 0;

		if (!selector || options.live === false) {
			that.unbind('click.fb-start').bind('click.fb-start', run);

		} else {
			D.undelegate(selector, 'click.fb-start').delegate(selector + ":not('.fancybox-item, .fancybox-nav')", 'click.fb-start', run);
		}

		this.filter('[data-fancybox-start=1]').trigger('click');

		return this;
	};

	// Tests that need a body at doc ready
	D.ready(function() {
		var w1, w2;

		if ( $.scrollbarWidth === undefined ) {
			// http://benalman.com/projects/jquery-misc-plugins/#scrollbarwidth
			$.scrollbarWidth = function() {
				var parent = $('<div style="width:50px;height:50px;overflow:auto"><div/></div>').appendTo('body'),
					child  = parent.children(),
					width  = child.innerWidth() - child.height( 99 ).innerWidth();

				parent.remove();

				return width;
			};
		}

		if ( $.support.fixedPosition === undefined ) {
			$.support.fixedPosition = (function() {
				var elem  = $('<div style="position:fixed;top:20px;"></div>').appendTo('body'),
					fixed = ( elem[0].offsetTop === 20 || elem[0].offsetTop === 15 );

				elem.remove();

				return fixed;
			}());
		}

		$.extend(F.defaults, {
			scrollbarWidth : $.scrollbarWidth(),
			fixed  : $.support.fixedPosition,
			parent : $('body')
		});

		//Get real width of page scroll-bar
		w1 = $(window).width();

		H.addClass('fancybox-lock-test');

		w2 = $(window).width();

		H.removeClass('fancybox-lock-test');

		$("<style type='text/css'>.fancybox-margin{margin-right:" + (w2 - w1) + "px;}</style>").appendTo("head");
	});

}(window, document, jQuery));

/* **********************************************
     Begin AES.js
********************************************** */

/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -  */
/*  AES implementation in JavaScript (c) Chris Veness 2005-2011                                   */
/*   - see http://csrc.nist.gov/publications/PubsFIPS.html#197                                    */
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -  */

var Aes = {};  // Aes namespace

/**
 * AES Cipher function: encrypt 'input' state with Rijndael algorithm
 *   applies Nr rounds (10/12/14) using key schedule w for 'add round key' stage
 *
 * @param {Number[]} input 16-byte (128-bit) input state array
 * @param {Number[][]} w   Key schedule as 2D byte-array (Nr+1 x Nb bytes)
 * @returns {Number[]}     Encrypted output state array
 */
Aes.cipher = function(input, w) {    // main Cipher function [§5.1]
  var Nb = 4;               // block size (in words): no of columns in state (fixed at 4 for AES)
  var Nr = w.length/Nb - 1; // no of rounds: 10/12/14 for 128/192/256-bit keys

  var state = [[],[],[],[]];  // initialise 4xNb byte-array 'state' with input [§3.4]
  for (var i=0; i<4*Nb; i++) state[i%4][Math.floor(i/4)] = input[i];

  state = Aes.addRoundKey(state, w, 0, Nb);

  for (var round=1; round<Nr; round++) {
    state = Aes.subBytes(state, Nb);
    state = Aes.shiftRows(state, Nb);
    state = Aes.mixColumns(state, Nb);
    state = Aes.addRoundKey(state, w, round, Nb);
  }

  state = Aes.subBytes(state, Nb);
  state = Aes.shiftRows(state, Nb);
  state = Aes.addRoundKey(state, w, Nr, Nb);

  var output = new Array(4*Nb);  // convert state to 1-d array before returning [§3.4]
  for (var i=0; i<4*Nb; i++) output[i] = state[i%4][Math.floor(i/4)];
  return output;
}

/**
 * Perform Key Expansion to generate a Key Schedule
 *
 * @param {Number[]} key Key as 16/24/32-byte array
 * @returns {Number[][]} Expanded key schedule as 2D byte-array (Nr+1 x Nb bytes)
 */
Aes.keyExpansion = function(key) {  // generate Key Schedule (byte-array Nr+1 x Nb) from Key [§5.2]
  var Nb = 4;            // block size (in words): no of columns in state (fixed at 4 for AES)
  var Nk = key.length/4  // key length (in words): 4/6/8 for 128/192/256-bit keys
  var Nr = Nk + 6;       // no of rounds: 10/12/14 for 128/192/256-bit keys

  var w = new Array(Nb*(Nr+1));
  var temp = new Array(4);

  for (var i=0; i<Nk; i++) {
    var r = [key[4*i], key[4*i+1], key[4*i+2], key[4*i+3]];
    w[i] = r;
  }

  for (var i=Nk; i<(Nb*(Nr+1)); i++) {
    w[i] = new Array(4);
    for (var t=0; t<4; t++) temp[t] = w[i-1][t];
    if (i % Nk == 0) {
      temp = Aes.subWord(Aes.rotWord(temp));
      for (var t=0; t<4; t++) temp[t] ^= Aes.rCon[i/Nk][t];
    } else if (Nk > 6 && i%Nk == 4) {
      temp = Aes.subWord(temp);
    }
    for (var t=0; t<4; t++) w[i][t] = w[i-Nk][t] ^ temp[t];
  }

  return w;
}

/*
 * ---- remaining routines are private, not called externally ----
 */

Aes.subBytes = function(s, Nb) {    // apply SBox to state S [§5.1.1]
  for (var r=0; r<4; r++) {
    for (var c=0; c<Nb; c++) s[r][c] = Aes.sBox[s[r][c]];
  }
  return s;
}

Aes.shiftRows = function(s, Nb) {    // shift row r of state S left by r bytes [§5.1.2]
  var t = new Array(4);
  for (var r=1; r<4; r++) {
    for (var c=0; c<4; c++) t[c] = s[r][(c+r)%Nb];  // shift into temp copy
    for (var c=0; c<4; c++) s[r][c] = t[c];         // and copy back
  }          // note that this will work for Nb=4,5,6, but not 7,8 (always 4 for AES):
  return s;  // see asmaes.sourceforge.net/rijndael/rijndaelImplementation.pdf
}

Aes.mixColumns = function(s, Nb) {   // combine bytes of each col of state S [§5.1.3]
  for (var c=0; c<4; c++) {
    var a = new Array(4);  // 'a' is a copy of the current column from 's'
    var b = new Array(4);  // 'b' is a•{02} in GF(2^8)
    for (var i=0; i<4; i++) {
      a[i] = s[i][c];
      b[i] = s[i][c]&0x80 ? s[i][c]<<1 ^ 0x011b : s[i][c]<<1;

    }
    // a[n] ^ b[n] is a•{03} in GF(2^8)
    s[0][c] = b[0] ^ a[1] ^ b[1] ^ a[2] ^ a[3]; // 2*a0 + 3*a1 + a2 + a3
    s[1][c] = a[0] ^ b[1] ^ a[2] ^ b[2] ^ a[3]; // a0 * 2*a1 + 3*a2 + a3
    s[2][c] = a[0] ^ a[1] ^ b[2] ^ a[3] ^ b[3]; // a0 + a1 + 2*a2 + 3*a3
    s[3][c] = a[0] ^ b[0] ^ a[1] ^ a[2] ^ b[3]; // 3*a0 + a1 + a2 + 2*a3
  }
  return s;
}

Aes.addRoundKey = function(state, w, rnd, Nb) {  // xor Round Key into state S [§5.1.4]
  for (var r=0; r<4; r++) {
    for (var c=0; c<Nb; c++) state[r][c] ^= w[rnd*4+c][r];
  }
  return state;
}

Aes.subWord = function(w) {    // apply SBox to 4-byte word w
  for (var i=0; i<4; i++) w[i] = Aes.sBox[w[i]];
  return w;
}

Aes.rotWord = function(w) {    // rotate 4-byte word w left by one byte
  var tmp = w[0];
  for (var i=0; i<3; i++) w[i] = w[i+1];
  w[3] = tmp;
  return w;
}

// sBox is pre-computed multiplicative inverse in GF(2^8) used in subBytes and keyExpansion [§5.1.1]
Aes.sBox =  [0x63,0x7c,0x77,0x7b,0xf2,0x6b,0x6f,0xc5,0x30,0x01,0x67,0x2b,0xfe,0xd7,0xab,0x76,
             0xca,0x82,0xc9,0x7d,0xfa,0x59,0x47,0xf0,0xad,0xd4,0xa2,0xaf,0x9c,0xa4,0x72,0xc0,
             0xb7,0xfd,0x93,0x26,0x36,0x3f,0xf7,0xcc,0x34,0xa5,0xe5,0xf1,0x71,0xd8,0x31,0x15,
             0x04,0xc7,0x23,0xc3,0x18,0x96,0x05,0x9a,0x07,0x12,0x80,0xe2,0xeb,0x27,0xb2,0x75,
             0x09,0x83,0x2c,0x1a,0x1b,0x6e,0x5a,0xa0,0x52,0x3b,0xd6,0xb3,0x29,0xe3,0x2f,0x84,
             0x53,0xd1,0x00,0xed,0x20,0xfc,0xb1,0x5b,0x6a,0xcb,0xbe,0x39,0x4a,0x4c,0x58,0xcf,
             0xd0,0xef,0xaa,0xfb,0x43,0x4d,0x33,0x85,0x45,0xf9,0x02,0x7f,0x50,0x3c,0x9f,0xa8,
             0x51,0xa3,0x40,0x8f,0x92,0x9d,0x38,0xf5,0xbc,0xb6,0xda,0x21,0x10,0xff,0xf3,0xd2,
             0xcd,0x0c,0x13,0xec,0x5f,0x97,0x44,0x17,0xc4,0xa7,0x7e,0x3d,0x64,0x5d,0x19,0x73,
             0x60,0x81,0x4f,0xdc,0x22,0x2a,0x90,0x88,0x46,0xee,0xb8,0x14,0xde,0x5e,0x0b,0xdb,
             0xe0,0x32,0x3a,0x0a,0x49,0x06,0x24,0x5c,0xc2,0xd3,0xac,0x62,0x91,0x95,0xe4,0x79,
             0xe7,0xc8,0x37,0x6d,0x8d,0xd5,0x4e,0xa9,0x6c,0x56,0xf4,0xea,0x65,0x7a,0xae,0x08,
             0xba,0x78,0x25,0x2e,0x1c,0xa6,0xb4,0xc6,0xe8,0xdd,0x74,0x1f,0x4b,0xbd,0x8b,0x8a,
             0x70,0x3e,0xb5,0x66,0x48,0x03,0xf6,0x0e,0x61,0x35,0x57,0xb9,0x86,0xc1,0x1d,0x9e,
             0xe1,0xf8,0x98,0x11,0x69,0xd9,0x8e,0x94,0x9b,0x1e,0x87,0xe9,0xce,0x55,0x28,0xdf,
             0x8c,0xa1,0x89,0x0d,0xbf,0xe6,0x42,0x68,0x41,0x99,0x2d,0x0f,0xb0,0x54,0xbb,0x16];

// rCon is Round Constant used for the Key Expansion [1st col is 2^(r-1) in GF(2^8)] [§5.2]
Aes.rCon = [ [0x00, 0x00, 0x00, 0x00],
             [0x01, 0x00, 0x00, 0x00],
             [0x02, 0x00, 0x00, 0x00],
             [0x04, 0x00, 0x00, 0x00],
             [0x08, 0x00, 0x00, 0x00],
             [0x10, 0x00, 0x00, 0x00],
             [0x20, 0x00, 0x00, 0x00],
             [0x40, 0x00, 0x00, 0x00],
             [0x80, 0x00, 0x00, 0x00],
             [0x1b, 0x00, 0x00, 0x00],
             [0x36, 0x00, 0x00, 0x00] ];


/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -  */
/*  AES Counter-mode implementation in JavaScript (c) Chris Veness 2005-2011                      */
/*   - see http://csrc.nist.gov/publications/nistpubs/800-38a/sp800-38a.pdf                       */
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -  */

Aes.Ctr = {};  // Aes.Ctr namespace: a subclass or extension of Aes

/**
 * Encrypt a text using AES encryption in Counter mode of operation
 *
 * Unicode multi-byte character safe
 *
 * @param {String} plaintext Source text to be encrypted
 * @param {String} password  The password to use to generate a key
 * @param {Number} nBits     Number of bits to be used in the key (128, 192, or 256)
 * @returns {string}         Encrypted text
 */
Aes.Ctr.encrypt = function(plaintext, password, nBits) {
  var blockSize = 16;  // block size fixed at 16 bytes / 128 bits (Nb=4) for AES
  if (!(nBits==128 || nBits==192 || nBits==256)) return '';  // standard allows 128/192/256 bit keys
  plaintext = Utf8.encode(plaintext);
  password = Utf8.encode(password);
  //var t = new Date();  // timer

  // use AES itself to encrypt password to get cipher key (using plain password as source for key
  // expansion) - gives us well encrypted key (though hashed key might be preferred for prod'n use)
  var nBytes = nBits/8;  // no bytes in key (16/24/32)
  var pwBytes = new Array(nBytes);
  for (var i=0; i<nBytes; i++) {  // use 1st 16/24/32 chars of password for key
    pwBytes[i] = isNaN(password.charCodeAt(i)) ? 0 : password.charCodeAt(i);
  }
  var key = Aes.cipher(pwBytes, Aes.keyExpansion(pwBytes));  // gives us 16-byte key
  key = key.concat(key.slice(0, nBytes-16));  // expand key to 16/24/32 bytes long

  // initialise 1st 8 bytes of counter block with nonce (NIST SP800-38A §B.2): [0-1] = millisec,
  // [2-3] = random, [4-7] = seconds, together giving full sub-millisec uniqueness up to Feb 2106
  var counterBlock = new Array(blockSize);

  var nonce = (new Date()).getTime();  // timestamp: milliseconds since 1-Jan-1970
  var nonceMs = nonce%1000;
  var nonceSec = Math.floor(nonce/1000);
  var nonceRnd = Math.floor(Math.random()*0xffff);

  for (var i=0; i<2; i++) counterBlock[i]   = (nonceMs  >>> i*8) & 0xff;
  for (var i=0; i<2; i++) counterBlock[i+2] = (nonceRnd >>> i*8) & 0xff;
  for (var i=0; i<4; i++) counterBlock[i+4] = (nonceSec >>> i*8) & 0xff;

  // and convert it to a string to go on the front of the ciphertext
  var ctrTxt = '';
  for (var i=0; i<8; i++) ctrTxt += String.fromCharCode(counterBlock[i]);

  // generate key schedule - an expansion of the key into distinct Key Rounds for each round
  var keySchedule = Aes.keyExpansion(key);

  var blockCount = Math.ceil(plaintext.length/blockSize);
  var ciphertxt = new Array(blockCount);  // ciphertext as array of strings

  for (var b=0; b<blockCount; b++) {
    // set counter (block #) in last 8 bytes of counter block (leaving nonce in 1st 8 bytes)
    // done in two stages for 32-bit ops: using two words allows us to go past 2^32 blocks (68GB)
    for (var c=0; c<4; c++) counterBlock[15-c] = (b >>> c*8) & 0xff;
    for (var c=0; c<4; c++) counterBlock[15-c-4] = (b/0x100000000 >>> c*8)

    var cipherCntr = Aes.cipher(counterBlock, keySchedule);  // -- encrypt counter block --

    // block size is reduced on final block
    var blockLength = b<blockCount-1 ? blockSize : (plaintext.length-1)%blockSize+1;
    var cipherChar = new Array(blockLength);

    for (var i=0; i<blockLength; i++) {  // -- xor plaintext with ciphered counter char-by-char --
      cipherChar[i] = cipherCntr[i] ^ plaintext.charCodeAt(b*blockSize+i);
      cipherChar[i] = String.fromCharCode(cipherChar[i]);
    }
    ciphertxt[b] = cipherChar.join('');
  }

  // Array.join is more efficient than repeated string concatenation in IE
  var ciphertext = ctrTxt + ciphertxt.join('');
  ciphertext = Base64.encode(ciphertext);  // encode in base64

  //alert((new Date()) - t);
  return ciphertext;
}

/**
 * Decrypt a text encrypted by AES in counter mode of operation
 *
 * @param {String} ciphertext Source text to be encrypted
 * @param {String} password   The password to use to generate a key
 * @param {Number} nBits      Number of bits to be used in the key (128, 192, or 256)
 * @returns {String}          Decrypted text
 */
Aes.Ctr.decrypt = function(ciphertext, password, nBits) {
  var blockSize = 16;  // block size fixed at 16 bytes / 128 bits (Nb=4) for AES
  if (!(nBits==128 || nBits==192 || nBits==256)) return '';  // standard allows 128/192/256 bit keys
  ciphertext = Base64.decode(ciphertext);
  password = Utf8.encode(password);
  //var t = new Date();  // timer

  // use AES to encrypt password (mirroring encrypt routine)
  var nBytes = nBits/8;  // no bytes in key
  var pwBytes = new Array(nBytes);
  for (var i=0; i<nBytes; i++) {
    pwBytes[i] = isNaN(password.charCodeAt(i)) ? 0 : password.charCodeAt(i);
  }
  var key = Aes.cipher(pwBytes, Aes.keyExpansion(pwBytes));
  key = key.concat(key.slice(0, nBytes-16));  // expand key to 16/24/32 bytes long

  // recover nonce from 1st 8 bytes of ciphertext
  var counterBlock = new Array(8);
  ctrTxt = ciphertext.slice(0, 8);
  for (var i=0; i<8; i++) counterBlock[i] = ctrTxt.charCodeAt(i);

  // generate key schedule
  var keySchedule = Aes.keyExpansion(key);

  // separate ciphertext into blocks (skipping past initial 8 bytes)
  var nBlocks = Math.ceil((ciphertext.length-8) / blockSize);
  var ct = new Array(nBlocks);
  for (var b=0; b<nBlocks; b++) ct[b] = ciphertext.slice(8+b*blockSize, 8+b*blockSize+blockSize);
  ciphertext = ct;  // ciphertext is now array of block-length strings

  // plaintext will get generated block-by-block into array of block-length strings
  var plaintxt = new Array(ciphertext.length);

  for (var b=0; b<nBlocks; b++) {
    // set counter (block #) in last 8 bytes of counter block (leaving nonce in 1st 8 bytes)
    for (var c=0; c<4; c++) counterBlock[15-c] = ((b) >>> c*8) & 0xff;
    for (var c=0; c<4; c++) counterBlock[15-c-4] = (((b+1)/0x100000000-1) >>> c*8) & 0xff;

    var cipherCntr = Aes.cipher(counterBlock, keySchedule);  // encrypt counter block

    var plaintxtByte = new Array(ciphertext[b].length);
    for (var i=0; i<ciphertext[b].length; i++) {
      // -- xor plaintxt with ciphered counter byte-by-byte --
      plaintxtByte[i] = cipherCntr[i] ^ ciphertext[b].charCodeAt(i);
      plaintxtByte[i] = String.fromCharCode(plaintxtByte[i]);
    }
    plaintxt[b] = plaintxtByte.join('');
  }

  // join array of blocks into single plaintext string
  var plaintext = plaintxt.join('');
  plaintext = Utf8.decode(plaintext);  // decode from UTF8 back to Unicode multi-byte chars

  //alert((new Date()) - t);
  return plaintext;
}


/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -  */
/*  Base64 class: Base 64 encoding / decoding (c) Chris Veness 2002-2011                          */
/*    note: depends on Utf8 class                                                                 */
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -  */

var Base64 = {};  // Base64 namespace

Base64.code = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";

/**
 * Encode string into Base64, as defined by RFC 4648 [http://tools.ietf.org/html/rfc4648]
 * (instance method extending String object). As per RFC 4648, no newlines are added.
 *
 * @param {String} str The string to be encoded as base-64
 * @param {Boolean} [utf8encode=false] Flag to indicate whether str is Unicode string to be encoded
 *   to UTF8 before conversion to base64; otherwise string is assumed to be 8-bit characters
 * @returns {String} Base64-encoded string
 */
Base64.encode = function(str, utf8encode) {  // http://tools.ietf.org/html/rfc4648
  utf8encode =  (typeof utf8encode == 'undefined') ? false : utf8encode;
  var o1, o2, o3, bits, h1, h2, h3, h4, e=[], pad = '', c, plain, coded;
  var b64 = Base64.code;

  plain = utf8encode ? str.encodeUTF8() : str;

  c = plain.length % 3;  // pad string to length of multiple of 3
  if (c > 0) { while (c++ < 3) { pad += '='; plain += '\0'; } }
  // note: doing padding here saves us doing special-case packing for trailing 1 or 2 chars

  for (c=0; c<plain.length; c+=3) {  // pack three octets into four hexets
    o1 = plain.charCodeAt(c);
    o2 = plain.charCodeAt(c+1);
    o3 = plain.charCodeAt(c+2);

    bits = o1<<16 | o2<<8 | o3;

    h1 = bits>>18 & 0x3f;
    h2 = bits>>12 & 0x3f;
    h3 = bits>>6 & 0x3f;
    h4 = bits & 0x3f;

    // use hextets to index into code string
    e[c/3] = b64.charAt(h1) + b64.charAt(h2) + b64.charAt(h3) + b64.charAt(h4);
  }
  coded = e.join('');  // join() is far faster than repeated string concatenation in IE

  // replace 'A's from padded nulls with '='s
  coded = coded.slice(0, coded.length-pad.length) + pad;

  return coded;
}

/**
 * Decode string from Base64, as defined by RFC 4648 [http://tools.ietf.org/html/rfc4648]
 * (instance method extending String object). As per RFC 4648, newlines are not catered for.
 *
 * @param {String} str The string to be decoded from base-64
 * @param {Boolean} [utf8decode=false] Flag to indicate whether str is Unicode string to be decoded
 *   from UTF8 after conversion from base64
 * @returns {String} decoded string
 */
Base64.decode = function(str, utf8decode) {
  utf8decode =  (typeof utf8decode == 'undefined') ? false : utf8decode;
  var o1, o2, o3, h1, h2, h3, h4, bits, d=[], plain, coded;
  var b64 = Base64.code;

  coded = utf8decode ? str.decodeUTF8() : str;


  for (var c=0; c<coded.length; c+=4) {  // unpack four hexets into three octets
    h1 = b64.indexOf(coded.charAt(c));
    h2 = b64.indexOf(coded.charAt(c+1));
    h3 = b64.indexOf(coded.charAt(c+2));
    h4 = b64.indexOf(coded.charAt(c+3));

    bits = h1<<18 | h2<<12 | h3<<6 | h4;

    o1 = bits>>>16 & 0xff;
    o2 = bits>>>8 & 0xff;
    o3 = bits & 0xff;

    d[c/4] = String.fromCharCode(o1, o2, o3);
    // check for padding
    if (h4 == 0x40) d[c/4] = String.fromCharCode(o1, o2);
    if (h3 == 0x40) d[c/4] = String.fromCharCode(o1);
  }
  plain = d.join('');  // join() is far faster than repeated string concatenation in IE

  return utf8decode ? plain.decodeUTF8() : plain;
}


/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -  */
/*  Utf8 class: encode / decode between multi-byte Unicode characters and UTF-8 multiple          */
/*              single-byte character encoding (c) Chris Veness 2002-2011                         */
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -  */

var Utf8 = {};  // Utf8 namespace

/**
 * Encode multi-byte Unicode string into utf-8 multiple single-byte characters
 * (BMP / basic multilingual plane only)
 *
 * Chars in range U+0080 - U+07FF are encoded in 2 chars, U+0800 - U+FFFF in 3 chars
 *
 * @param {String} strUni Unicode string to be encoded as UTF-8
 * @returns {String} encoded string
 */
Utf8.encode = function(strUni) {
  // use regular expressions & String.replace callback function for better efficiency
  // than procedural approaches
  var strUtf = strUni.replace(
      /[\u0080-\u07ff]/g,  // U+0080 - U+07FF => 2 bytes 110yyyyy, 10zzzzzz
      function(c) {
        var cc = c.charCodeAt(0);
        return String.fromCharCode(0xc0 | cc>>6, 0x80 | cc&0x3f); }
    );
  strUtf = strUtf.replace(
      /[\u0800-\uffff]/g,  // U+0800 - U+FFFF => 3 bytes 1110xxxx, 10yyyyyy, 10zzzzzz
      function(c) {
        var cc = c.charCodeAt(0);
        return String.fromCharCode(0xe0 | cc>>12, 0x80 | cc>>6&0x3F, 0x80 | cc&0x3f); }
    );
  return strUtf;
}

/**
 * Decode utf-8 encoded string back into multi-byte Unicode characters
 *
 * @param {String} strUtf UTF-8 string to be decoded back to Unicode
 * @returns {String} decoded string
 */
Utf8.decode = function(strUtf) {
  // note: decode 3-byte chars first as decoded 2-byte strings could appear to be 3-byte char!
  var strUni = strUtf.replace(
      /[\u00e0-\u00ef][\u0080-\u00bf][\u0080-\u00bf]/g,  // 3-byte chars
      function(c) {  // (note parentheses for precence)
        var cc = ((c.charCodeAt(0)&0x0f)<<12) | ((c.charCodeAt(1)&0x3f)<<6) | ( c.charCodeAt(2)&0x3f);
        return String.fromCharCode(cc); }
    );
  strUni = strUni.replace(
      /[\u00c0-\u00df][\u0080-\u00bf]/g,                 // 2-byte chars
      function(c) {  // (note parentheses for precence)
        var cc = (c.charCodeAt(0)&0x1f)<<6 | c.charCodeAt(1)&0x3f;
        return String.fromCharCode(cc); }
    );
  return strUni;
}

/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -  */

/* **********************************************
     Begin bootstrap-tooltip.js
********************************************** */

/* ===========================================================
 * bootstrap-tooltip.js v2.0.1
 * http://twitter.github.com/bootstrap/javascript.html#tooltips
 * Inspired by the original jQuery.tipsy by Jason Frame
 * ===========================================================
 * Copyright 2012 Twitter, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ========================================================== */

!function( $ ) {

  "use strict"

 /* TOOLTIP PUBLIC CLASS DEFINITION
  * =============================== */

  var Tooltip = function ( element, options ) {
    this.init('tooltip', element, options)
  }

  Tooltip.prototype = {

    constructor: Tooltip

  , init: function ( type, element, options ) {
      var eventIn
        , eventOut

      this.type = type
      this.$element = $(element)
      this.options = this.getOptions(options)
      this.enabled = true

      if (this.options.trigger != 'manual') {
        eventIn  = this.options.trigger == 'hover' ? 'mouseenter' : 'focus'
        eventOut = this.options.trigger == 'hover' ? 'mouseleave' : 'blur'
        this.$element.on(eventIn, this.options.selector, $.proxy(this.enter, this))
        this.$element.on(eventOut, this.options.selector, $.proxy(this.leave, this))
      }

      this.options.selector ?
        (this._options = $.extend({}, this.options, { trigger: 'manual', selector: '' })) :
        this.fixTitle()
    }

  , getOptions: function ( options ) {
      options = $.extend({}, $.fn[this.type].defaults, options, this.$element.data())

      if (options.delay && typeof options.delay == 'number') {
        options.delay = {
          show: options.delay
        , hide: options.delay
        }
      }

      return options
    }

  , enter: function ( e ) {
      var self = $(e.currentTarget)[this.type](this._options).data(this.type)

      if (!self.options.delay || !self.options.delay.show) {
        self.show()
      } else {
        self.hoverState = 'in'
        setTimeout(function() {
          if (self.hoverState == 'in') {
            self.show()
          }
        }, self.options.delay.show)
      }
    }

  , leave: function ( e ) {
      var self = $(e.currentTarget)[this.type](this._options).data(this.type)

      if (!self.options.delay || !self.options.delay.hide) {
        self.hide()
      } else {
        self.hoverState = 'out'
        setTimeout(function() {
          if (self.hoverState == 'out') {
            self.hide()
          }
        }, self.options.delay.hide)
      }
    }

  , show: function () {
      var $tip
        , inside
        , pos
        , actualWidth
        , actualHeight
        , placement
        , tp

      if (this.hasContent() && this.enabled) {
        $tip = this.tip()
        this.setContent()

        if (this.options.animation) {
          $tip.addClass('fade')
        }

        placement = typeof this.options.placement == 'function' ?
          this.options.placement.call(this, $tip[0], this.$element[0]) :
          this.options.placement

        inside = /in/.test(placement)

        $tip
          .remove()
          .css({ top: 0, left: 0, display: 'block' })
          .appendTo(inside ? this.$element : document.body)

        pos = this.getPosition(inside)

        actualWidth = $tip[0].offsetWidth
        actualHeight = $tip[0].offsetHeight

        switch (inside ? placement.split(' ')[1] : placement) {
          case 'bottom':
            tp = {top: pos.top + pos.height, left: pos.left + pos.width / 2 - actualWidth / 2}
            break
          case 'top':
            tp = {top: pos.top - actualHeight, left: pos.left + pos.width / 2 - actualWidth / 2}
            break
          case 'left':
            tp = {top: pos.top + pos.height / 2 - actualHeight / 2, left: pos.left - actualWidth}
            break
          case 'right':
            tp = {top: pos.top + pos.height / 2 - actualHeight / 2, left: pos.left + pos.width}
            break
        }

        $tip
          .css(tp)
          .addClass(placement)
          .addClass('in')
      }
    }

  , setContent: function () {
      var $tip = this.tip()
      $tip.find('.timeline-tooltip-inner').html(this.getTitle())
      $tip.removeClass('fade in top bottom left right')
    }

  , hide: function () {
      var that = this
        , $tip = this.tip()

      $tip.removeClass('in')

      function removeWithAnimation() {
        var timeout = setTimeout(function () {
          $tip.off($.support.transition.end).remove()
        }, 500)

        $tip.one($.support.transition.end, function () {
          clearTimeout(timeout)
          $tip.remove()
        })
      }

      $.support.transition && this.$tip.hasClass('fade') ?
        removeWithAnimation() :
        $tip.remove()
    }

  , fixTitle: function () {
      var $e = this.$element
      if ($e.attr('title') || typeof($e.attr('data-original-title')) != 'string') {
        $e.attr('data-original-title', $e.attr('title') || '').removeAttr('title')
      }
    }

  , hasContent: function () {
      return this.getTitle()
    }

  , getPosition: function (inside) {
      return $.extend({}, (inside ? {top: 0, left: 0} : this.$element.offset()), {
        width: this.$element[0].offsetWidth
      , height: this.$element[0].offsetHeight
      })
    }

  , getTitle: function () {
      var title
        , $e = this.$element
        , o = this.options

      title = $e.attr('data-original-title')
        || (typeof o.title == 'function' ? o.title.call($e[0]) :  o.title)

      title = title.toString().replace(/(^\s*|\s*$)/, "")

      return title
    }

  , tip: function () {
      return this.$tip = this.$tip || $(this.options.template)
    }

  , validate: function () {
      if (!this.$element[0].parentNode) {
        this.hide()
        this.$element = null
        this.options = null
      }
    }

  , enable: function () {
      this.enabled = true
    }

  , disable: function () {
      this.enabled = false
    }

  , toggleEnabled: function () {
      this.enabled = !this.enabled
    }

  , toggle: function () {
      this[this.tip().hasClass('in') ? 'hide' : 'show']()
    }

  }


 /* TOOLTIP PLUGIN DEFINITION
  * ========================= */

  $.fn.tooltip = function ( option ) {
    return this.each(function () {
      var $this = $(this)
        , data = $this.data('tooltip')
        , options = typeof option == 'object' && option
      if (!data) $this.data('tooltip', (data = new Tooltip(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  $.fn.tooltip.Constructor = Tooltip

  $.fn.tooltip.defaults = {
    animation: true
  , delay: 0
  , selector: false
  , placement: 'top'
  , trigger: 'hover'
  , title: ''
  , template: '<div class="timeline-tooltip"><div class="timeline-tooltip-arrow"></div><div class="timeline-tooltip-inner"></div></div>'
  }

}( window.jQuery );

/* **********************************************
     Begin VMM.StoryJS.js
********************************************** */

/* VeriteCo StoryJS
================================================== */

/*	* CodeKit Import
	* http://incident57.com/codekit/
================================================== */
// @codekit-prepend "VMM.StoryJS.License.js";
// @codekit-prepend "Core/VMM.Core.js";
// @codekit-prepend "Language/VMM.Language.js";
// @codekit-prepend "Media/VMM.Media.js";
// @codekit-prepend "Slider/VMM.DragSlider.js";
// @codekit-prepend "Slider/VMM.Slider.js";
// @codekit-prepend "Library/jquery.fancybox.js";
// @codekit-prepend "Library/AES.js";
// @codekit-prepend "Library/bootstrap-tooltip.js";


if(typeof VMM != 'undefined' && typeof VMM.StoryJS == 'undefined') {

	VMM.StoryJS = function() {

		/* PRIVATE VARS
		================================================== */

		/* PUBLIC FUNCTIONS
		================================================== */
		this.init = function(d) {

		};

	}
}


/* **********************************************
     Begin VMM.Timeline.js
********************************************** */

/**
	* TimelineJS
	* Designed and built by Zach Wise at VéritéCo

	* This Source Code Form is subject to the terms of the Mozilla Public
	* License, v. 2.0. If a copy of the MPL was not distributed with this
	* file, You can obtain one at http://mozilla.org/MPL/2.0/.
*/

/*	* CodeKit Import
	* http://incident57.com/codekit/
================================================== */
// @codekit-prepend "VMM.Timeline.License.js";

// @codekit-prepend "Core/VMM.StoryJS.js";

// @codekit-append "VMM.Timeline.TimeNav.js";
// @codekit-append "VMM.Timeline.DataObj.js";


/* Timeline
================================================== */

if(typeof VMM != 'undefined' && typeof VMM.Timeline == 'undefined') {

	VMM.Timeline = function(_timeline_id, w, h) {

		var $timeline,
			$container,
			$feature,
			$feedback,
			$slider,
			$navigation,
			slider,
			timenav,
			version		= "2.x",
			timeline_id	= "#timelinejs",
			events		= {},
			data		= {},
			_dates		= [],
			config		= {},
			has_width	= false,
			has_height	= false,
			ie7			= false,
			is_moving	= false;


		if (type.of(_timeline_id) == "string") {
			if (_timeline_id.match("#")) {
				timeline_id	= _timeline_id;
			} else {
				timeline_id	= "#" + _timeline_id;
			}
		} else {
			timeline_id		= "#timelinejs";
		}


		/* CONFIG
		================================================== */
		config = {
			embed:					false,
			events: {
				data_ready:			"DATAREADY",
				messege:			"MESSEGE",
				headline:			"HEADLINE",
				slide_change:		"SLIDE_CHANGE",
				resize:				"resize"
			},
			id: 					timeline_id,
			source:					"nothing",
			type: 					"timeline",
			touch:					false,
			orientation: 			"normal",
			maptype: 				"toner",
			version: 				"2.x",
			preload:				4,
			current_slide:			0,
			hash_bookmark:			false,
			start_at_end: 			false,
			start_at_slide:			0,
			start_zoom_adjust:		0,
			start_page: 			false,
			api_keys: {
				google:				"",
				flickr:				"",
				twitter:			""
			},
			interval: 				10,
			something: 				0,
			width: 					960,
			height: 				540,
			spacing: 				15,
			loaded: {
				slider: 			false,
				timenav: 			false,
				percentloaded: 		0
			},
			nav: {
				start_page: 		false,
				interval_width: 	200,
				interval_override: 	false, // change this to override the interval of years, months etc.
				density: 			4,
				minor_width: 		0,
				minor_left:			0,
				constraint: {
					left:			0,
					right:			0,
					right_min:		0,
					right_max:		0
				},
				zoom: {
					adjust:			0
				},
				multiplier: {
					current: 		6,
					min: 			.1,
					max: 			50
				},
				rows: 				[1, 1, 1],
				width: 				960,
				height: 			200,
				marker: {
					width: 			150,
					height: 		50
				}
			},
			feature: {
				width: 				960,
				height: 			540
			},
			slider: {
				width: 				720,
				height: 			400,
				content: {
					width: 			720,
					height: 		400,
					padding: 		130,
					padding_default:130
				},
				nav: {
					width: 			100,
					height: 		200
				}
			},
			ease: 					"easeInOutExpo",
			duration: 				1000,
			gmap_key: 				"",
			language: 				VMM.Language
		};

		if ( w != null && w != "") {
			config.width = w;
			has_width = true;
		}

		if ( h != null && h != "") {
			config.height = h;
			has_height = true;
		}

		if(window.location.hash) {
			 var hash					=	window.location.hash.substring(1);
			 if (!isNaN(hash)) {
			 	 config.current_slide	=	parseInt(hash);
			 }
		}

		window.onhashchange = function () {
			var hash					=	window.location.hash.substring(1);
			if (config.hash_bookmark) {
				if (is_moving) {
					goToEvent(parseInt(hash));
				} else {
					is_moving = false;
				}
			} else {
				goToEvent(parseInt(hash));
			}
		}

		/* CREATE CONFIG
		================================================== */
		function createConfig(conf) {

			// APPLY SUPPLIED CONFIG TO TIMELINE CONFIG
			if (typeof embed_config == 'object') {
				timeline_config = embed_config;
			}
			if (typeof timeline_config == 'object') {
				trace("HAS TIMELINE CONFIG");
				config = VMM.Util.mergeConfig(config, timeline_config);
			} else if (typeof conf == 'object') {
				config = VMM.Util.mergeConfig(config, conf);
			}

			if (VMM.Browser.device == "mobile" || VMM.Browser.device == "tablet") {
				config.touch = true;
			}

			config.nav.width			= config.width;
			config.nav.height			= 200;
			config.feature.width		= config.width;
			config.feature.height		= config.height - config.nav.height;
			config.nav.zoom.adjust		= parseInt(config.start_zoom_adjust, 10);
			VMM.Timeline.Config			= config;
			VMM.master_config.Timeline	= VMM.Timeline.Config;
			this.events					= config.events;

			if (config.gmap_key != "") {
				config.api_keys.google = config.gmap_key;
			}

			trace("VERSION " + config.version);
			version = config.version;
		}

		/* CREATE TIMELINE STRUCTURE
		================================================== */
		function createStructure() {
			// CREATE DOM STRUCTURE
			$timeline	= VMM.getElement(timeline_id);
			VMM.Lib.addClass($timeline, "vco-timeline");
			VMM.Lib.addClass($timeline, "vco-storyjs");

			$container	= VMM.appendAndGetElement($timeline, "<div>", "vco-container vco-main");
			$feature	= VMM.appendAndGetElement($container, "<div>", "vco-feature");
			$slider		= VMM.appendAndGetElement($feature, "<div>", "vco-slider");
			$navigation	= VMM.appendAndGetElement($container, "<div>", "vco-navigation");
			$feedback	= VMM.appendAndGetElement($timeline, "<div>", "vco-feedback", "");


			if (typeof config.language.right_to_left != 'undefined') {
				VMM.Lib.addClass($timeline, "vco-right-to-left");
			}

			slider		= new VMM.Slider($slider, config);
			timenav		= new VMM.Timeline.TimeNav($navigation);

			if (!has_width) {
				config.width = VMM.Lib.width($timeline);
			} else {
				VMM.Lib.width($timeline, config.width);
			}

			if (!has_height) {
				config.height = VMM.Lib.height($timeline);
			} else {
				VMM.Lib.height($timeline, config.height);
			}

			if (config.touch) {
				VMM.Lib.addClass($timeline, "vco-touch");
			} else {
				VMM.Lib.addClass($timeline, "vco-notouch");
			}


		}

		/* ON EVENT
		================================================== */

		function onDataReady(e, d) {
			trace("onDataReady");
			data = d.timeline;

			if (type.of(data.era) != "array") {
				data.era = [];
			}

			buildDates();

		};

		function onDatesProcessed() {
			build();
		}

		function reSize() {

			updateSize();

			slider.setSize(config.feature.width, config.feature.height);
			timenav.setSize(config.width, config.height);
			if (orientationChange()) {
				setViewport();
			}

		};

		function onSliderLoaded(e) {
			config.loaded.slider = true;
			onComponentLoaded();
		};

		function onComponentLoaded(e) {
			config.loaded.percentloaded = config.loaded.percentloaded + 25;

			if (config.loaded.slider && config.loaded.timenav) {
				hideMessege();
			}
		}

		function onTimeNavLoaded(e) {
			config.loaded.timenav = true;
			onComponentLoaded();
		}

		function onSlideUpdate(e) {
			is_moving = true;
			config.current_slide = slider.getCurrentNumber();
			setHash(config.current_slide);
			timenav.setMarker(config.current_slide, config.ease,config.duration);
		};

		function onMarkerUpdate(e) {
			is_moving = true;
			config.current_slide = timenav.getCurrentNumber();
			setHash(config.current_slide);
			slider.setSlide(config.current_slide);
		};

		function goToEvent(n) {
			if (n <= _dates.length - 1 && n >= 0) {
				config.current_slide = n;
				slider.setSlide(config.current_slide);
				timenav.setMarker(config.current_slide, config.ease,config.duration);
			}
		}

		function setHash(n) {
			if (config.hash_bookmark) {
				window.location.hash = "#" + n.toString();
			}
		}

		function getViewport() {

		}

		function setViewport() {
			var viewport_content		= "",
				viewport_orientation	= searchOrientation(window.orientation);

			if (VMM.Browser.device == "mobile") {
				if (viewport_orientation == "portrait") {
					//viewport_content	= "width=device-width; initial-scale=0.75, maximum-scale=0.75";
					viewport_content	= "width=device-width; initial-scale=0.5, maximum-scale=0.5";
				} else if (viewport_orientation == "landscape") {
					viewport_content	= "width=device-width; initial-scale=0.5, maximum-scale=0.5";
				} else {
					viewport_content	= "width=device-width, initial-scale=1, maximum-scale=1.0";
				}
			} else if (VMM.Browser.device == "tablet") {
				//viewport_content		= "width=device-width, initial-scale=1, maximum-scale=1.0";
			}

			if (document.getElementById("viewport")) {
				//VMM.Lib.attr("#viewport", "content", viewport_content);
			} else {
				//VMM.appendElement("head", "<meta id='viewport' name='viewport' content=" + viewport_content + "/>");
			}

		}

		/* ORIENTATION
		================================================== */
		function searchOrientation(orientation) {
			var orient = "";

			if ( orientation == 0  || orientation == 180) {
				orient = "portrait";
			} else if ( orientation == 90 || orientation == -90) {
				orient = "landscape";
			} else {
				orient = "normal";
			}

			return orient;
		}

		function orientationChange() {
			var orientation	= searchOrientation(window.orientation);

			if (orientation == config.orientation) {
				return false;
			} else {
				config.orientation = orientation;
				return true;
			}

		}


		/* PUBLIC FUNCTIONS
		================================================== */
		this.init = function(c, _data) {
			trace('INIT');
			setViewport();
			createConfig(c);
			createStructure();

			if (type.of(_data) == "string") {
				config.source	= _data;
			}

			// LANGUAGE
			VMM.Date.setLanguage(config.language);
			VMM.master_config.language = config.language;

			// EXTERNAL API
			VMM.ExternalAPI.setKeys(config.api_keys);
			VMM.ExternalAPI.googlemaps.setMapType(config.maptype);

			// EVENTS
			VMM.bindEvent(global, onDataReady, config.events.data_ready);
			VMM.bindEvent(global, showMessege, config.events.messege);

			VMM.fireEvent(global, config.events.messege, config.language.messages.loading_timeline);

			/* GET DATA
			================================================== */
			if (VMM.Browser.browser == "Explorer" || VMM.Browser.browser == "MSIE") {
				if ( parseInt(VMM.Browser.version, 10) <= 7 ) {
					ie7 = true;
				}
			}

			if (type.of(config.source) == "string" || type.of(config.source) == "object") {
				VMM.Timeline.DataObj.getData(config.source);
			} else {
				VMM.fireEvent(global, config.events.messege, "No data source provided");
				//VMM.Timeline.DataObj.getData(VMM.getElement(timeline_id));
			}

		};

		this.iframeLoaded = function() {
			trace("iframeLoaded");
		};

		this.reload = function(_d) {
			trace("Load new timeline data" + _d);
			VMM.fireEvent(global, config.events.messege, config.language.messages.loading_timeline);
			data = {};
			VMM.Timeline.DataObj.getData(_d);
			config.current_slide = 0;
			slider.setSlide(0);
			timenav.setMarker(0, config.ease,config.duration);
		};

		/* DATA
		================================================== */
		function getData(url) {
			VMM.getJSON(url, function(d) {
				data = VMM.Timeline.DataObj.getData(d);
				VMM.fireEvent(global, config.events.data_ready);
			});
		};

		/* MESSEGES
		================================================== */
		function showMessege(e, msg, other) {
			trace("showMessege " + msg);
			//VMM.attachElement($timeline, $feedback);
			if (other) {
				VMM.attachElement($feedback, msg);
			} else{
				VMM.attachElement($feedback, VMM.MediaElement.loadingmessage(msg));
			}
		};

		function hideMessege() {
			VMM.Lib.animate($feedback, config.duration, config.ease*4, {"opacity": 0}, detachMessege);
		};

		function detachMessege() {
			VMM.Lib.detach($feedback);
		}

		/* BUILD DISPLAY
		================================================== */
		function build() {

			// START AT SLIDE
			if (parseInt(config.start_at_slide) > 0 && config.current_slide == 0) {
				config.current_slide = parseInt(config.start_at_slide);
			}
			// START AT END
			if (config.start_at_end && config.current_slide == 0) {
				config.current_slide = _dates.length - 1;
			}


			// IE7
			if (ie7) {
				ie7 = true;
				VMM.fireEvent(global, config.events.messege, "Internet Explorer " + VMM.Browser.version + " is not supported by TimelineJS. Please update your browser to version 8 or higher.");
			} else {

				detachMessege();
				reSize();

				// EVENT LISTENERS
				VMM.bindEvent($slider, onSliderLoaded, "LOADED");
				VMM.bindEvent($navigation, onTimeNavLoaded, "LOADED");
				VMM.bindEvent($slider, onSlideUpdate, "UPDATE");
				VMM.bindEvent($navigation, onMarkerUpdate, "UPDATE");

				// INITIALIZE COMPONENTS
				slider.init(_dates);
				timenav.init(_dates, data.era);

				// RESIZE EVENT LISTENERS
				VMM.bindEvent(global, reSize, config.events.resize);



			}


		};

		function updateSize() {
			trace("UPDATE SIZE");
			config.width = VMM.Lib.width($timeline);
			config.height = VMM.Lib.height($timeline);

			config.nav.width = config.width;
			config.feature.width = config.width;

			config.feature.height = config.height - config.nav.height - 3;

			if (VMM.Browser.device == "mobile") {
				/*
				if (VMM.Browser.orientation == "portrait") {
					config.feature.height	= 480;
					config.height			= 480 + config.nav.height;
				} else if(VMM.Browser.orientation == "landscape") {
					config.feature.height	= 320;
					config.height			= 320 + config.nav.height;
				} else {
					config.feature.height = config.height - config.nav.height - 3;
				}
				*/
			}

			if (config.width < 641) {
				VMM.Lib.addClass($timeline, "vco-skinny");
			} else {
				VMM.Lib.removeClass($timeline, "vco-skinny");
			}

		};

		// BUILD DATE OBJECTS
		function buildDates() {

			_dates = [];
			VMM.fireEvent(global, config.events.messege, "Building Dates");
			updateSize();

			for(var i = 0; i < data.date.length; i++) {

				if (data.date[i].startDate != null && data.date[i].startDate != "") {

					var _date		= {},
						do_start	= VMM.Date.parse(data.date[i].startDate, true),
						do_end;

					_date.startdate		= do_start.date;
					_date.precisiondate	= do_start.precision;

					if (!isNaN(_date.startdate)) {


						// END DATE
						if (data.date[i].endDate != null && data.date[i].endDate != "") {
							_date.enddate = VMM.Date.parse(data.date[i].endDate);
						} else {
							_date.enddate = _date.startdate;
						}

						_date.needs_slug = false;

						if (data.date[i].headline == "") {
							if (data.date[i].slug != null && data.date[i].slug != "") {
								_date.needs_slug = true;
							}
						}

						_date.title				= data.date[i].headline;
						_date.headline			= data.date[i].headline;
						_date.type				= data.date[i].type;
						_date.date				= VMM.Date.prettyDate(_date.startdate, false, _date.precisiondate);
						_date.asset				= data.date[i].asset;
						_date.fulldate			= _date.startdate.getTime();
						_date.text				= data.date[i].text;
						_date.content			= "";
						_date.tag				= data.date[i].tag;
						_date.slug				= data.date[i].slug;
						_date.uniqueid			= VMM.Util.unique_ID(7);
						_date.classname			= data.date[i].classname;


						_dates.push(_date);
					}

				}

			};

			/* CUSTOM SORT
			================================================== */
			if (data.type != "storify") {
				_dates.sort(function(a, b){
					return a.fulldate - b.fulldate
				});
			}

			/* CREATE START PAGE IF AVAILABLE
			================================================== */
			if (data.headline != null && data.headline != "" && data.text != null && data.text != "") {

				var startpage_date,
					do_start,
					_date			= {},
					td_num			= 0,
					td;

				if (typeof data.startDate != 'undefined') {
					do_start		= VMM.Date.parse(data.startDate, true);
					startpage_date	= do_start.date;
				} else {
					startpage_date = false;
				}
				trace("HAS STARTPAGE");
				trace(startpage_date);

				if (startpage_date && startpage_date < _dates[0].startdate) {
					_date.startdate = new Date(startpage_date);
				} else {
					td = _dates[0].startdate;
					_date.startdate = new Date(_dates[0].startdate);

					if (td.getMonth() === 0 && td.getDate() == 1 && td.getHours() === 0 && td.getMinutes() === 0 ) {
						// trace("YEAR ONLY");
						_date.startdate.setFullYear(td.getFullYear() - 1);
					} else if (td.getDate() <= 1 && td.getHours() === 0 && td.getMinutes() === 0) {
						// trace("YEAR MONTH");
						_date.startdate.setMonth(td.getMonth() - 1);
					} else if (td.getHours() === 0 && td.getMinutes() === 0) {
						// trace("YEAR MONTH DAY");
						_date.startdate.setDate(td.getDate() - 1);
					} else  if (td.getMinutes() === 0) {
						// trace("YEAR MONTH DAY HOUR");
						_date.startdate.setHours(td.getHours() - 1);
					} else {
						// trace("YEAR MONTH DAY HOUR MINUTE");
						_date.startdate.setMinutes(td.getMinutes() - 1);
					}
				}

				_date.uniqueid		= VMM.Util.unique_ID(7);
				_date.enddate		= _date.startdate;
				_date.precisiondate	= do_start.precision;
				_date.title			= data.headline;
				_date.headline		= data.headline;
				_date.text			= data.text;
				_date.type			= "start";
				_date.date			= VMM.Date.prettyDate(data.startDate, false, _date.precisiondate);
				_date.asset			= data.asset;
				_date.slug			= false;
				_date.needs_slug	= false;
				_date.fulldate		= _date.startdate.getTime();

				if (config.embed) {
					VMM.fireEvent(global, config.events.headline, _date.headline);
				}

				_dates.unshift(_date);
			}

			/* CUSTOM SORT
			================================================== */
			if (data.type != "storify") {
				_dates.sort(function(a, b){
					return a.fulldate - b.fulldate
				});
			}

			onDatesProcessed();
		}

	};

	VMM.Timeline.Config = {};

};

/* **********************************************
     Begin VMM.Timeline.TimeNav.js
********************************************** */

/* 	TimeNav
	This class handles the bottom timeline navigation.
	It requires the VMM.Util class and VMM.Date class
================================================== */

if(typeof VMM.Timeline != 'undefined' && typeof VMM.Timeline.TimeNav == 'undefined') {

	VMM.Timeline.TimeNav = function(parent, content_width, content_height) {
		trace("VMM.Timeline.TimeNav");

		var $timenav, $content, $time, $timeintervalminor, $timeinterval, $timeintervalmajor, $timebackground,
			$timeintervalbackground, $timenavline, $timenavindicator, $timeintervalminor_minor, $toolbar, $zoomin, $zoomout, $dragslide,
			config					= VMM.Timeline.Config,
			row_height,
			events					= {},
			timespan				= {},
			layout					= parent,
			data					= [],
			era_markers				= [],
			markers					= [],
			interval_array			= [],
			interval_major_array	= [],
			tags					= [],
			current_marker			= 0,
			_active					= false,
			eras,
			content,
			timeouts = {
				interval_position:	""
			},
			timenav_pos = {
				left:				"",
				visible: {
					left:			"",
					right:			""
				}
			},
			timelookup = {
				day:			24,
				month:			12,
				year:			10,
				hour:			60,
				minute:			60,
				second:			1000,
				decade:			10,
				century:		100,
				millenium:		1000,
				age:			1000000,
				epoch:			10000000,
				era:			100000000,
				eon:			500000000,
				week:			4.34812141,
				days_in_month:	30.4368499,
				days_in_week:	7,
				weeks_in_month:	4.34812141,
				weeks_in_year:	52.177457,
				days_in_year:	365.242199,
				hours_in_day:	24
			},
			dateFractionBrowser = {
				day:			86400000,
				week:			7,
				month:			30.4166666667,
				year:			12,
				hour:			24,
				minute:			1440,
				second:			86400,
				decade:			10,
				century:		100,
				millenium:		1000,
				age:			1000000,
				epoch:			10000000,
				era:			100000000,
				eon:			500000000
			},
			interval = {
				type:			"year",
				number:			10,
				first:			1970,
				last:			2011,
				multiplier:		100,
				classname:		"_idd",
				interval_type:	"interval"
			},
			interval_major = {
				type:			"year",
				number:			10,
				first:			1970,
				last:			2011,
				multiplier:		100,
				classname:		"major",
				interval_type:	"interval major"
			},
			interval_macro = {
				type:			"year",
				number:			10,
				first:			1970,
				last:			2011,
				multiplier:		100,
				classname:		"_dd_minor",
				interval_type:	"interval minor"
			},
			interval_calc = {
				day: {},
				month: {},
				year: {},
				hour: {},
				minute: {},
				second: {},
				decade: {},
				century: {},
				millenium: {},
				week: {},
				age: {},
				epoch: {},
				era: {},
				eon: {}
			};


		/* ADD to Config
		================================================== */
		row_height			=	config.nav.marker.height/2;
		config.nav.rows = {
			full:				[1, row_height*2, row_height*4],
			half:				[1, row_height, row_height*2, row_height*3, row_height*4, row_height*5],
			current:			[]
		}

		if (content_width != null && content_width != "") {
			config.nav.width	= 	content_width;
		}
		if (content_height != null && content_height != "") {
			config.nav.height	= 	content_height;
		}

		/* INIT
		================================================== */
		this.init = function(d,e) {
			trace('VMM.Timeline.TimeNav init');
			// need to evaluate d
			// some function to determine type of data and prepare it
			if(typeof d != 'undefined') {
				this.setData(d, e);
			} else {
				trace("WAITING ON DATA");
			}
		};

		/* GETTERS AND SETTERS
		================================================== */
		this.setData = function(d,e) {
			if(typeof d != 'undefined') {
				data = {};
				data = d;
				eras = e;
				build();
			} else{
				trace("NO DATA");
			}
		};

		this.setSize = function(w, h) {
			if (w != null) {config.width = w};
			if (h != null) {config.height = h};
			if (_active) {
				reSize();
			}


		}

		this.setMarker = function(n, ease, duration, fast) {
			goToMarker(n, ease, duration);
		}

		this.getCurrentNumber = function() {
			return current_marker;
		}

		/* ON EVENT
		================================================== */

		function onConfigSet() {
			trace("onConfigSet");
		};

		function reSize(firstrun) {
			config.nav.constraint.left = (config.width/2);
			config.nav.constraint.right = config.nav.constraint.right_min - (config.width/2);
			$dragslide.updateConstraint(config.nav.constraint);

			VMM.Lib.css($timenavline, "left", Math.round(config.width/2)+2);
			VMM.Lib.css($timenavindicator, "left", Math.round(config.width/2)-8);
			goToMarker(config.current_slide, config.ease, config.duration, true, firstrun);
		};

		function upDate() {
			VMM.fireEvent(layout, "UPDATE");
		}

		function onZoomIn() {

			$dragslide.cancelSlide();
			if (config.nav.multiplier.current > config.nav.multiplier.min) {
				if (config.nav.multiplier.current <= 1) {
					config.nav.multiplier.current = config.nav.multiplier.current - .25;
				} else {
					if (config.nav.multiplier.current > 5) {
						if (config.nav.multiplier.current > 16) {
							config.nav.multiplier.current = Math.round(config.nav.multiplier.current - 10);
						} else {
							config.nav.multiplier.current = Math.round(config.nav.multiplier.current - 4);
						}
					} else {
						config.nav.multiplier.current = Math.round(config.nav.multiplier.current - 1);
					}

				}
				if (config.nav.multiplier.current <= 0) {
					config.nav.multiplier.current = config.nav.multiplier.min;
				}
				refreshTimeline();
			}
		}

		function onZoomOut() {
			$dragslide.cancelSlide();
			if (config.nav.multiplier.current < config.nav.multiplier.max) {
				if (config.nav.multiplier.current > 4) {
					if (config.nav.multiplier.current > 16) {
						config.nav.multiplier.current = Math.round(config.nav.multiplier.current + 10);
					} else {
						config.nav.multiplier.current = Math.round(config.nav.multiplier.current + 4);
					}
				} else {
					config.nav.multiplier.current = Math.round(config.nav.multiplier.current + 1);
				}

				if (config.nav.multiplier.current >= config.nav.multiplier.max) {
					config.nav.multiplier.current = config.nav.multiplier.max;
				}
				refreshTimeline();
			}
		}

		function onBackHome(e) {
			$dragslide.cancelSlide();
			goToMarker(0);
			upDate();
		}

		function onMouseScroll(e) {
			var delta		= 0,
				scroll_to	= 0;
			if (!e) {
				e = window.event;
			}
			if (e.originalEvent) {
				e = e.originalEvent;
			}

			// Browsers unable to differntiate between up/down and left/right scrolling
			/*
			if (e.wheelDelta) {
				delta = e.wheelDelta/6;
			} else if (e.detail) {
				delta = -e.detail*12;
			}
			*/

			// Webkit and browsers able to differntiate between up/down and left/right scrolling
			if (typeof e.wheelDeltaX != 'undefined' ) {
				delta = e.wheelDeltaY/6;
				if (Math.abs(e.wheelDeltaX) > Math.abs(e.wheelDeltaY)) {
					delta = e.wheelDeltaX/6;
				} else {
					//delta = e.wheelDeltaY/6;
					delta = 0;
				}
			}
			if (delta) {
				if (e.preventDefault) {
					 e.preventDefault();
				}
				e.returnValue = false;
			}
			// Stop from scrolling too far
			scroll_to = VMM.Lib.position($timenav).left + delta;

			if (scroll_to > config.nav.constraint.left) {
				scroll_to = config.width/2;
			} else if (scroll_to < config.nav.constraint.right) {
				scroll_to = config.nav.constraint.right;
			}

			//VMM.Lib.stop($timenav);
			//VMM.Lib.animate($timenav, config.duration/2, "linear", {"left": scroll_to});
			VMM.Lib.css($timenav, "left", scroll_to);
		}

		function refreshTimeline() {
			trace("config.nav.multiplier " + config.nav.multiplier.current);
			positionMarkers(true);
			positionEras(true);
			positionInterval($timeinterval, interval_array, true, true);
			positionInterval($timeintervalmajor, interval_major_array, true);
			config.nav.constraint.left = (config.width/2);
			config.nav.constraint.right = config.nav.constraint.right_min - (config.width/2);
			$dragslide.updateConstraint(config.nav.constraint);
		};

		/* MARKER EVENTS
		================================================== */
		function onMarkerClick(e) {
			$dragslide.cancelSlide();
			goToMarker(e.data.number);
			upDate();
		};

		function onMarkerHover(e) {
			VMM.Lib.toggleClass(e.data.elem, "zFront");
		};

		function goToMarker(n, ease, duration, fast, firstrun) {
			trace("GO TO MARKER");
			var _ease		= config.ease,
				_duration	= config.duration,
				is_last		= false,
				is_first	= false;

			current_marker = 	n;

			timenav_pos.left			= (config.width/2) - markers[current_marker].pos_left
			timenav_pos.visible.left	= Math.abs(timenav_pos.left) - 100;
			timenav_pos.visible.right	= Math.abs(timenav_pos.left) + config.width + 100;

			if (current_marker == 0) {
				is_first = true;
			}
			if (current_marker +1 == markers.length) {
				is_last = true
			}
			if (ease != null && ease != "") {_ease = ease};
			if (duration != null && duration != "") {_duration = duration};

			// set marker style
			for(var i = 0; i < markers.length; i++) {
				VMM.Lib.removeClass(markers[i].marker, "active");
			}

			if (config.start_page && markers[0].type == "start") {
				VMM.Lib.visible(markers[0].marker, false);
				VMM.Lib.addClass(markers[0].marker, "start");
			}

			VMM.Lib.addClass(markers[current_marker].marker, "active");

			// ANIMATE MARKER
			VMM.Lib.stop($timenav);
			VMM.Lib.animate($timenav, _duration, _ease, {"left": timenav_pos.left});

		}

		/* TOUCH EVENTS
		================================================== */
		function onTouchUpdate(e, b) {
			VMM.Lib.animate($timenav, b.time/2, config.ease, {"left": b.left});
		};

		/* CALCULATIONS
		================================================== */
		function averageMarkerPositionDistance() {
			var last_pos	= 0,
				pos			= 0,
				pos_dif		= 0,
				mp_diff		= [],
				i			= 0;

			for(i = 0; i < markers.length; i++) {
				if (data[i].type == "start") {

				} else {
					var _pos = positionOnTimeline(interval, markers[i].relative_pos),
					last_pos = pos;
					pos = _pos.begin;
					pos_dif = pos - last_pos;
					mp_diff.push(pos_dif);
				}
			}
			return VMM.Util.average(mp_diff).mean;
		}

		function averageDateDistance() {
			var last_dd			= 0,
				dd				= 0,
				_dd				= "",
				date_dif		= 0,
				date_diffs		= [],
				is_first_date	= true,
				i				= 0;

			for(i = 0; i < data.length; i++) {
				if (data[i].type == "start") {
					trace("DATA DATE IS START")
				} else {
					_dd			= data[i].startdate;
					last_dd		= dd;
					dd			= _dd;
					date_dif	= dd - last_dd;
					date_diffs.push(date_dif);
				}
			}

			return VMM.Util.average(date_diffs);
		}

		function calculateMultiplier() {
			var temp_multiplier	= config.nav.multiplier.current,
				i				= 0;

			for(i = 0; i < temp_multiplier; i++) {
				if (averageMarkerPositionDistance() < 75) {
					if (config.nav.multiplier.current > 1) {
						config.nav.multiplier.current = (config.nav.multiplier.current - 1);
					}
				}
			}

		}

		function calculateInterval() {
			// NEED TO REWRITE ALL OF THIS
			var _first								= getDateFractions(data[0].startdate),
				_last								= getDateFractions(data[data.length - 1].enddate);

			// EON
			interval_calc.eon.type					=	"eon";
			interval_calc.eon.first					=	_first.eons;
			interval_calc.eon.base					=	Math.floor(_first.eons);
			interval_calc.eon.last					=	_last.eons;
			interval_calc.eon.number				=	timespan.eons;
			interval_calc.eon.multiplier		 	=	timelookup.eons;
			interval_calc.eon.minor					=	timelookup.eons;

			// ERA
			interval_calc.era.type					=	"era";
			interval_calc.era.first					=	_first.eras;
			interval_calc.era.base					=	Math.floor(_first.eras);
			interval_calc.era.last					=	_last.eras;
			interval_calc.era.number				=	timespan.eras;
			interval_calc.era.multiplier		 	=	timelookup.eras;
			interval_calc.era.minor					=	timelookup.eras;

			// EPOCH
			interval_calc.epoch.type				=	"epoch";
			interval_calc.epoch.first				=	_first.epochs;
			interval_calc.epoch.base				=	Math.floor(_first.epochs);
			interval_calc.epoch.last				=	_last.epochs;
			interval_calc.epoch.number				=	timespan.epochs;
			interval_calc.epoch.multiplier		 	=	timelookup.epochs;
			interval_calc.epoch.minor				=	timelookup.epochs;

			// AGE
			interval_calc.age.type					=	"age";
			interval_calc.age.first					=	_first.ages;
			interval_calc.age.base					=	Math.floor(_first.ages);
			interval_calc.age.last					=	_last.ages;
			interval_calc.age.number				=	timespan.ages;
			interval_calc.age.multiplier		 	=	timelookup.ages;
			interval_calc.age.minor					=	timelookup.ages;

			// MILLENIUM
			interval_calc.millenium.type 			=	"millenium";
			interval_calc.millenium.first			=	_first.milleniums;
			interval_calc.millenium.base			=	Math.floor(_first.milleniums);
			interval_calc.millenium.last			=	_last.milleniums;
			interval_calc.millenium.number			=	timespan.milleniums;
			interval_calc.millenium.multiplier	 	=	timelookup.millenium;
			interval_calc.millenium.minor			=	timelookup.millenium;

			// CENTURY
			interval_calc.century.type 				= "century";
			interval_calc.century.first 			= _first.centuries;
			interval_calc.century.base 				= Math.floor(_first.centuries);
			interval_calc.century.last 				= _last.centuries;
			interval_calc.century.number 			= timespan.centuries;
			interval_calc.century.multiplier	 	= timelookup.century;
			interval_calc.century.minor 			= timelookup.century;

			// DECADE
			interval_calc.decade.type 				= "decade";
			interval_calc.decade.first 				= _first.decades;
			interval_calc.decade.base 				= Math.floor(_first.decades);
			interval_calc.decade.last 				= _last.decades;
			interval_calc.decade.number 			= timespan.decades;
			interval_calc.decade.multiplier 		= timelookup.decade;
			interval_calc.decade.minor 				= timelookup.decade;

			// YEAR
			interval_calc.year.type					= "year";
			interval_calc.year.first 				= _first.years;
			interval_calc.year.base 				= Math.floor(_first.years);
			interval_calc.year.last					= _last.years;
			interval_calc.year.number 				= timespan.years;
			interval_calc.year.multiplier 			= 1;
			interval_calc.year.minor 				= timelookup.month;

			// MONTH
			interval_calc.month.type 				= "month";
			interval_calc.month.first 				= _first.months;
			interval_calc.month.base 				= Math.floor(_first.months);
			interval_calc.month.last 				= _last.months;
			interval_calc.month.number 				= timespan.months;
			interval_calc.month.multiplier 			= 1;
			interval_calc.month.minor 				= Math.round(timelookup.week);

			// WEEK
			// NOT DONE
			interval_calc.week.type 				= "week";
			interval_calc.week.first 				= _first.weeks;
			interval_calc.week.base 				= Math.floor(_first.weeks);
			interval_calc.week.last 				= _last.weeks;
			interval_calc.week.number 				= timespan.weeks;
			interval_calc.week.multiplier 			= 1;
			interval_calc.week.minor 				= 7;

			// DAY
			interval_calc.day.type 					= "day";
			interval_calc.day.first 				= _first.days;
			interval_calc.day.base	 				= Math.floor(_first.days);
			interval_calc.day.last 					= _last.days;
			interval_calc.day.number 				= timespan.days;
			interval_calc.day.multiplier 			= 1;
			interval_calc.day.minor 				= 24;

			// HOUR
			interval_calc.hour.type 				= "hour";
			interval_calc.hour.first 				= _first.hours;
			interval_calc.hour.base 				= Math.floor(_first.hours);
			interval_calc.hour.last 				= _last.hours;
			interval_calc.hour.number 				= timespan.hours;
			interval_calc.hour.multiplier 			= 1;
			interval_calc.hour.minor 				= 60;

			// MINUTE
			interval_calc.minute.type 				= "minute";
			interval_calc.minute.first 				= _first.minutes;
			interval_calc.minute.base 				= Math.floor(_first.minutes);
			interval_calc.minute.last 				= _last.minutes;
			interval_calc.minute.number 			= timespan.minutes;
			interval_calc.minute.multiplier 		= 1;
			interval_calc.minute.minor 				= 60;

			// SECOND
			interval_calc.second.type 				= "decade";
			interval_calc.second.first 				= _first.seconds;
			interval_calc.second.base 				= Math.floor(_first.seconds);
			interval_calc.second.last 				= _last.seconds;
			interval_calc.second.number 			= timespan.seconds;
			interval_calc.second.multiplier 		= 1;
			interval_calc.second.minor 				= 10;
		}

		function getDateFractions(the_date, is_utc) {

			var _time = {};
			_time.days			=		the_date		/	dateFractionBrowser.day;
			_time.weeks 		=		_time.days		/	dateFractionBrowser.week;
			_time.months 		=		_time.days		/	dateFractionBrowser.month;
			_time.years 		=		_time.months 	/	dateFractionBrowser.year;
			_time.hours 		=		_time.days		*	dateFractionBrowser.hour;
			_time.minutes 		=		_time.days		*	dateFractionBrowser.minute;
			_time.seconds 		=		_time.days		*	dateFractionBrowser.second;
			_time.decades 		=		_time.years		/	dateFractionBrowser.decade;
			_time.centuries 	=		_time.years		/	dateFractionBrowser.century;
			_time.milleniums 	=		_time.years		/	dateFractionBrowser.millenium;
			_time.ages			=		_time.years		/	dateFractionBrowser.age;
			_time.epochs		=		_time.years		/	dateFractionBrowser.epoch;
			_time.eras			=		_time.years		/	dateFractionBrowser.era;
			_time.eons			=		_time.years		/	dateFractionBrowser.eon;

			/*
			trace("AGES "		 + 		_time.ages);
			trace("EPOCHS "		 + 		_time.epochs);
			trace("MILLENIUMS "  + 		_time.milleniums);
			trace("CENTURIES "	 + 		_time.centuries);
			trace("DECADES "	 + 		_time.decades);
			trace("YEARS "		 + 		_time.years);
			trace("MONTHS "		 + 		_time.months);
			trace("WEEKS "		 + 		_time.weeks);
			trace("DAYS "		 + 		_time.days);
			trace("HOURS "		 + 		_time.hours);
			trace("MINUTES "	 + 		_time.minutes);
			trace("SECONDS "	 + 		_time.seconds);
			*/
			return _time;
		}

		/*	POSITION
			Positions elements on the timeline based on date
			relative to the calculated interval
		================================================== */
		function positionRelative(_interval, first, last) {
			var _first,
				_last,
				_type			= _interval.type,
				timerelative = {
					start:		"",
					end:		"",
					type:		_type
				};

			/* FIRST
			================================================== */
			_first					= getDateFractions(first);
			timerelative.start		= first.months;

			if (_type == "eon") {
				timerelative.start	= _first.eons;
			} else if (_type == "era") {
				timerelative.start	= _first.eras;
			} else if (_type == "epoch") {
				timerelative.start	= _first.epochs;
			} else if (_type == "age") {
				timerelative.start	= _first.ages;
			} else if (_type == "millenium") {
				timerelative.start	= first.milleniums;
			} else if (_type == "century") {
				timerelative.start	= _first.centuries;
			} else if (_type == "decade") {
				timerelative.start	= _first.decades;
			} else if (_type == "year") {
				timerelative.start	= _first.years;
			} else if (_type == "month") {
				timerelative.start	= _first.months;
			} else if (_type == "week") {
				timerelative.start	= _first.weeks;
			} else if (_type == "day") {
				timerelative.start	= _first.days;
			} else if (_type == "hour") {
				timerelative.start	= _first.hours;
			} else if (_type == "minute") {
				timerelative.start	= _first.minutes;
			}

			/* LAST
			================================================== */
			if (type.of(last) == "date") {

				_last					= getDateFractions(last);
				timerelative.end		= last.months;

				if (_type == "eon") {
					timerelative.end	= _last.eons;
				} else if (_type == "era") {
					timerelative.end	= _last.eras;
				} else if (_type == "epoch") {
					timerelative.end	= _last.epochs;
				} else if (_type == "age") {
					timerelative.end	= _last.ages;
				} else if (_type == "millenium") {
					timerelative.end	= last.milleniums;
				} else if (_type == "century") {
					timerelative.end	= _last.centuries;
				} else if (_type == "decade") {
					timerelative.end	= _last.decades;
				} else if (_type == "year") {
					timerelative.end	= _last.years;
				} else if (_type == "month") {
					timerelative.end	= _last.months;
				} else if (_type == "week") {
					timerelative.end	= _last.weeks;
				} else if (_type == "day") {
					timerelative.end	= _last.days;
				} else if (_type == "hour") {
					timerelative.end	= _last.hours;
				} else if (_type == "minute") {
					timerelative.end	= _last.minutes;
				}

			} else {

				timerelative.end		= timerelative.start;

			}

			return timerelative
		}

		function positionOnTimeline(the_interval, timerelative) {
			return {
				begin:	(timerelative.start	-	interval.base) * (config.nav.interval_width / config.nav.multiplier.current),
				end:	(timerelative.end	-	interval.base) * (config.nav.interval_width / config.nav.multiplier.current)
			};
		}

		function positionMarkers(is_animated) {

			var row						= 2,
				previous_pos			= 0,
				pos_offset				= -2,
				row_depth				= 0,
				row_depth_sub			= 0,
				line_last_height_pos	= 150,
				line_height				= 6,
				cur_mark				= 0,
				in_view_margin			= config.width,
				pos_cache_array			= [],
				pos_cache_obj			= {id: i, pos: 0, row: 0, marker: 0},
				pos_cache_max			= 6,
				in_view = {
					left:				timenav_pos.visible.left - in_view_margin,
					right:				timenav_pos.visible.right + in_view_margin
				},
				i						= 0,
				k						= 0;

			config.nav.minor_width = config.width;

			VMM.Lib.removeClass(".flag", "row1");
			VMM.Lib.removeClass(".flag", "row2");
			VMM.Lib.removeClass(".flag", "row3");

			for(i = 0; i < markers.length; i++) {

				var line,
					marker				= markers[i],
					pos					= positionOnTimeline(interval, markers[i].relative_pos),
					row_pos				= 0,
					is_in_view			= false,

					pos_cache_close		= 0;


				// COMPENSATE FOR DATES BEING POITIONED IN THE MIDDLE
				pos.begin				= Math.round(pos.begin +  pos_offset);
				pos.end					= Math.round(pos.end + pos_offset);
				line					= Math.round(pos.end - pos.begin);
				marker.pos_left			= pos.begin;

				if (current_marker == i) {
					timenav_pos.left			= (config.width/2) - pos;
					timenav_pos.visible.left	= Math.abs(timenav_pos.left);
					timenav_pos.visible.right	= Math.abs(timenav_pos.left) + config.width;
					in_view.left				= timenav_pos.visible.left - in_view_margin;
					in_view.right				= timenav_pos.visible.right + in_view_margin;
				}

				if (Math.abs(pos.begin) >= in_view.left && Math.abs(pos.begin) <= in_view.right ) {
					is_in_view = true;
				}

				// APPLY POSITION TO MARKER
				if (is_animated) {
					VMM.Lib.stop(marker.marker);
					VMM.Lib.animate(marker.marker, config.duration/2, config.ease, {"left": pos.begin});
				} else {
					VMM.Lib.stop(marker.marker);
					VMM.Lib.css(marker.marker, "left", pos.begin);
				}

				if (i == current_marker) {
					cur_mark = pos.begin;
				}

				// EVENT LENGTH LINE
				if (line > 5) {
					VMM.Lib.css(marker.lineevent, "height", line_height);
					VMM.Lib.css(marker.lineevent, "top", line_last_height_pos);
					if (is_animated) {
						VMM.Lib.animate(marker.lineevent, config.duration/2, config.ease, {"width": line});
					} else {
						VMM.Lib.css(marker.lineevent, "width", line);
					}
				}

				// CONTROL ROW POSITION
				if (tags.length > 0) {
					var need_half_row =		false,
						half_row_number = 	0;

					for (k = 0; k < tags.length; k++) {
						if (k < config.nav.rows.current.length) {
							if (marker.tag == tags[k]) {
								row = k;
								if (k == config.nav.rows.current.length - 1) {
									trace("ON LAST ROW");
									VMM.Lib.addClass(marker.flag, "flag-small-last");
								}

								// Experimental, to try and avoid too much stacking on tagged flags
								if (pos.begin - previous_pos.begin < 5) {
									if (pos_cache_obj.row == row) {
										trace("TAGGED FLAG TOO CLOSE ON SAME ROW");
										trace(pos_cache_obj.row);
										trace(row);
										VMM.Lib.addClass(marker.flag, "flag-small");
										VMM.Lib.addClass(pos_cache_obj.marker.flag, "flag-small");

										if (row < config.nav.rows.half.length - 1) {
											//row ++;
											half_row_number = (row *2) + 1;
											need_half_row = true;
										}
									}
								} else {
									VMM.Lib.removeClass(marker.flag, "flag-small");
								}
								// END Experimental

							}
						}
					}
					if (need_half_row) {
						row_pos = config.nav.rows.half[half_row_number];
					} else {
						row_pos = config.nav.rows.current[row];
					}
				} else {

					if (pos.begin - previous_pos.begin < (config.nav.marker.width + config.spacing)) {
						if (row < config.nav.rows.current.length - 1) {
							row ++;

						} else {
							row = 0;
							row_depth ++;
						}
					} else {
						row_depth = 1;
						row = 1;
					}
					row_pos = config.nav.rows.current[row];

				}

				// SET LAST MARKER POSITION
				previous_pos = pos;

				// POSITION CACHE
				pos_cache_obj.pos = pos;
				pos_cache_obj.row = row;
				pos_cache_obj.marker = marker;

				pos_cache_array.push(pos_cache_obj);
				if (pos_cache_array.length > pos_cache_max) {
					pos_cache_array.remove(0);
				}

				//if (is_animated && is_in_view) {
				if (is_animated) {
					VMM.Lib.stop(marker.flag);
					VMM.Lib.animate(marker.flag, config.duration, config.ease, {"top": row_pos});
				} else {
					VMM.Lib.stop(marker.flag);
					VMM.Lib.css(marker.flag, "top", row_pos);
				}

				// IS THE MARKER A REPRESENTATION OF A START SCREEN?
				if (config.start_page && markers[i].type == "start") {
					VMM.Lib.visible(marker.marker, false);

				}

				if (pos > config.nav.minor_width) {
					config.nav.minor_width = pos;
				}

				if (pos < config.nav.minor_left) {
					config.nav.minor_left = pos;
				}

			}

			// ANIMATE THE TIMELINE TO ADJUST TO CHANGES
			if (is_animated) {
				VMM.Lib.stop($timenav);
				VMM.Lib.animate($timenav, config.duration/2, config.ease, {"left": (config.width/2) - (cur_mark)});
			} else {

			}

			//VMM.Lib.delay_animate(config.duration, $timenav, config.duration/2, config.ease, {"left": (config.width/2) - (cur_mark)});


		}

		function positionEras(is_animated) {
			var i	= 0,
				p	= 0;

			for(i = 0; i < era_markers.length; i++) {
				var era			= era_markers[i],
					pos			= positionOnTimeline(interval, era.relative_pos),
					row_pos		= 0,
					row			= 0,
					era_height	= config.nav.marker.height * config.nav.rows.full.length,
					era_length	= pos.end - pos.begin;

				// CONTROL ROW POSITION
				if (era.tag != "") {
					era_height = (config.nav.marker.height * config.nav.rows.full.length) / config.nav.rows.current.length;
					for (p = 0; p < tags.length; p++) {
						if (p < config.nav.rows.current.length) {
							if (era.tag == tags[p]) {
								row = p;
							}
						}
					}
					row_pos = config.nav.rows.current[row];

				} else {
					row_pos = -1;
				}

				// APPLY POSITION TO MARKER
				if (is_animated) {
					VMM.Lib.stop(era.content);
					VMM.Lib.stop(era.text_content);
					VMM.Lib.animate(era.content, config.duration/2, config.ease, {"top": row_pos, "left": pos.begin, "width": era_length, "height":era_height});
					VMM.Lib.animate(era.text_content, config.duration/2, config.ease, {"left": pos.begin});
				} else {
					VMM.Lib.stop(era.content);
					VMM.Lib.stop(era.text_content);
					VMM.Lib.css(era.content, "left", pos.begin);
					VMM.Lib.css(era.content, "width", era_length);
					VMM.Lib.css(era.content, "height", era_height);
					VMM.Lib.css(era.content, "top", row_pos);
					VMM.Lib.css(era.text_content, "left", pos.begin);

				}

			}
		}

		function positionInterval(the_main_element, the_intervals, is_animated, is_minor) {

			var last_position		= 0,
				last_position_major	= 0,
				//in_view_margin		= (config.nav.minor_width/config.nav.multiplier.current)/2,
				in_view_margin		= config.width,
				in_view = {
					left:			timenav_pos.visible.left - in_view_margin,
					right:			timenav_pos.visible.right + in_view_margin
				}
				not_too_many		= true,
				i					= 0;

			config.nav.minor_left = 0;

			if (the_intervals.length > 100) {
				not_too_many = false;
				trace("TOO MANY " + the_intervals.length);
			}


			for(i = 0; i < the_intervals.length; i++) {
				var _interval			= the_intervals[i].element,
					_interval_date		= the_intervals[i].date,
					_interval_visible	= the_intervals[i].visible,
					_pos				= positionOnTimeline(interval, the_intervals[i].relative_pos),
					pos					= _pos.begin,
					_animation			= the_intervals[i].animation,
					is_visible			= true,
					is_in_view			= false,
					pos_offset			= 50;


				_animation.pos			= pos;
				_animation.animate		= false;

				if (Math.abs(pos) >= in_view.left && Math.abs(pos) <= in_view.right ) {
					is_in_view = true;
				}

				if (true) {

					// CONDENSE WHAT IS DISPLAYED
					if (config.nav.multiplier.current > 16 && is_minor) {
						is_visible = false;
					} else {
						if ((pos - last_position) < 65 ) {
							if ((pos - last_position) < 35 ) {
								if (i%4 == 0) {
									if (pos == 0) {
										is_visible = false;
									}
								} else {
									is_visible = false;
								}
							} else {
								if (!VMM.Util.isEven(i)) {
									is_visible = false;
								}
							}
						}
					}

					if (is_visible) {
						if (the_intervals[i].is_detached) {
							VMM.Lib.append(the_main_element, _interval);
							the_intervals[i].is_detached = false;
						}
					} else {
						the_intervals[i].is_detached = true;
						VMM.Lib.detach(_interval);
					}


					if (_interval_visible) {
						if (!is_visible) {
							_animation.opacity	= "0";
							if (is_animated && not_too_many) {
								_animation.animate	= true;
							}
							the_intervals[i].interval_visible = false;
						} else {
							_animation.opacity	= "100";
							if (is_animated && is_in_view) {
								_animation.animate	= true;
							}
						}
					} else {
						_animation.opacity	= "100";
						if (is_visible) {
							if (is_animated && not_too_many) {
								_animation.animate	= true;
							} else {
								if (is_animated && is_in_view) {
									_animation.animate	= true;
								}
							}
							the_intervals[i].interval_visible = true;
						} else {
							if (is_animated && not_too_many) {
								_animation.animate	= true;
							}
						}
					}

					last_position = pos;

					if (pos > config.nav.minor_width) {
						config.nav.minor_width = pos;
					}

					if (pos < config.nav.minor_left) {
						config.nav.minor_left = pos;
					}

				}

				if (_animation.animate) {
					VMM.Lib.animate(_interval, config.duration/2, config.ease, {opacity: _animation.opacity, left: _animation.pos});
				} else {
					VMM.Lib.css(_interval, "opacity", _animation.opacity);
					VMM.Lib.css(_interval, "left", pos);
				}
			}

			config.nav.constraint.right_min = -(config.nav.minor_width)+(config.width);
			config.nav.constraint.right = config.nav.constraint.right_min + (config.width/2);

			VMM.Lib.css($timeintervalminor_minor, "left", config.nav.minor_left - (config.width)/2);
			VMM.Lib.width($timeintervalminor_minor, (config.nav.minor_width)+(config.width) + Math.abs(config.nav.minor_left) );

		}

		/* Interval Elements
		================================================== */
		function createIntervalElements(_interval, _array, _element_parent) {

			var inc_time			= 0,
				_first_run			= true,
				_last_pos			= 0,
				_largest_pos		= 0,
				_timezone_offset,
				_first_date,
				_last_date,
				int_number			= Math.ceil(_interval.number) + 2,
				firefox = {
					flag:			false,
					offset:			0
				},
				i					= 0;

			VMM.attachElement(_element_parent, "");

			_interval.date = new Date(data[0].startdate.getFullYear(), 0, 1, 0,0,0);
			_timezone_offset = _interval.date.getTimezoneOffset();

			for(i = 0; i < int_number; i++) {
				trace(_interval.type);
				var _is_year			= false,
					int_obj = {
						element: 		VMM.appendAndGetElement(_element_parent, "<div>", _interval.classname),
						date: 			new Date(data[0].startdate.getFullYear(), 0, 1, 0,0,0),
						visible: 		false,
						date_string:	"",
						type: 			_interval.interval_type,
						relative_pos:	0,
						is_detached:	false,
						animation: {
							animate:	false,
							pos:		"",
							opacity:	"100"

						}
					};

				if (_interval.type == "eon") {
					if (_first_run) {
						_first_date = Math.floor(data[0].startdate.getFullYear() / 500000000) * 500000000;
					}
					int_obj.date.setFullYear(_first_date + (inc_time * 500000000));
					_is_year = true;
				} else if (_interval.type == "era") {
					if (_first_run) {
						_first_date = Math.floor(data[0].startdate.getFullYear() / 100000000) * 100000000;
					}
					int_obj.date.setFullYear(_first_date + (inc_time * 100000000));
					_is_year = true;
				} else if (_interval.type == "epoch") {
					if (_first_run) {
						_first_date = Math.floor(data[0].startdate.getFullYear() / 10000000) * 10000000
					}
					int_obj.date.setFullYear(_first_date + (inc_time * 10000000));
					_is_year = true;
				} else if (_interval.type == "age") {
					if (_first_run) {
						_first_date = Math.floor(data[0].startdate.getFullYear() / 1000000) * 1000000
					}
					int_obj.date.setFullYear(_first_date + (inc_time * 1000000));
					_is_year = true;
				} else if (_interval.type == "millenium") {
					if (_first_run) {
						_first_date = Math.floor(data[0].startdate.getFullYear() / 1000) * 1000;
					}
					int_obj.date.setFullYear(_first_date + (inc_time * 1000));
					_is_year = true;
				} else if (_interval.type == "century") {
					if (_first_run) {
						_first_date = Math.floor(data[0].startdate.getFullYear() / 100) * 100
					}
					int_obj.date.setFullYear(_first_date + (inc_time * 100));
					_is_year = true;
				} else if (_interval.type == "decade") {
					if (_first_run) {
						_first_date = Math.floor(data[0].startdate.getFullYear() / 10) * 10;
					}
					int_obj.date.setFullYear(_first_date + (inc_time * 10));
					_is_year = true;
				} else if (_interval.type == "year") {
					if (_first_run) {
						_first_date = data[0].startdate.getFullYear();
					}
					int_obj.date.setFullYear(_first_date + inc_time);
					_is_year = true;
				} else if (_interval.type == "month") {
					if (_first_run) {
						_first_date = data[0].startdate.getMonth();
					}
					int_obj.date.setMonth(_first_date + inc_time);
				} else if (_interval.type == "week") {
					if (_first_run) {
						_first_date = data[0].startdate.getMonth();
					}
					int_obj.date.setMonth(data[0].startdate.getMonth());
					int_obj.date.setDate(_first_date + (inc_time * 7) );
				} else if (_interval.type == "day") {
					if (_first_run) {
						_first_date = data[0].startdate.getDate();
					}
					int_obj.date.setMonth(data[0].startdate.getMonth());
					int_obj.date.setDate(_first_date + inc_time);
				} else if (_interval.type == "hour") {
					if (_first_run) {
						_first_date = data[0].startdate.getHours();
					}
					int_obj.date.setMonth(data[0].startdate.getMonth());
					int_obj.date.setDate(data[0].startdate.getDate());
					int_obj.date.setHours(_first_date + inc_time);
				} else if (_interval.type == "minute") {
					if (_first_run) {
						_first_date = data[0].startdate.getMinutes();
					}
					int_obj.date.setMonth(data[0].startdate.getMonth());
					int_obj.date.setDate(data[0].startdate.getDate());
					int_obj.date.setHours(data[0].startdate.getHours());
					int_obj.date.setMinutes(_first_date + inc_time);
				} else if (_interval.type == "second") {
					if (_first_run) {
						_first_date = data[0].startdate.getSeconds();
					}
					int_obj.date.setMonth(data[0].startdate.getMonth());
					int_obj.date.setDate(data[0].startdate.getDate());
					int_obj.date.setHours(data[0].startdate.getHours());
					int_obj.date.setMinutes(data[0].startdate.getMinutes());
					int_obj.date.setSeconds(_first_date + inc_time);
				}	else if (_interval.type == "millisecond") {
					if (_first_run) {
						_first_date = data[0].startdate.getMilliseconds();
					}
					int_obj.date.setMonth(data[0].startdate.getMonth());
					int_obj.date.setDate(data[0].startdate.getDate());
					int_obj.date.setHours(data[0].startdate.getHours());
					int_obj.date.setMinutes(data[0].startdate.getMinutes());
					int_obj.date.setSeconds(data[0].startdate.getSeconds());
					int_obj.date.setMilliseconds(_first_date + inc_time);
				}

				// FIX WEIRD FIREFOX BUG FOR GMT TIME FORMATTING
				if (VMM.Browser.browser == "Firefox") {
					if (int_obj.date.getFullYear() == "1970" && int_obj.date.getTimezoneOffset() != _timezone_offset) {

						trace("FIREFOX 1970 TIMEZONE OFFSET " + int_obj.date.getTimezoneOffset() + " SHOULD BE " + _timezone_offset);
						trace(_interval.type + " " + _interval.date);

						// try and fix firefox bug, if not the flag will catch it
						firefox.offset = (int_obj.date.getTimezoneOffset()/60);
						firefox.flag = true;
						int_obj.date.setHours(int_obj.date.getHours() + firefox.offset );

					} else if (firefox.flag) {
						// catch the bug the second time around
						firefox.flag = false;
						int_obj.date.setHours(int_obj.date.getHours() + firefox.offset );
						if (_is_year) {
							firefox.flag = true;
						}
					}

				}

				if (_is_year) {
					if ( int_obj.date.getFullYear() < 0 ) {
						int_obj.date_string = 	Math.abs( int_obj.date.getFullYear() ).toString() + " B.C.";
					} else {
						int_obj.date_string = int_obj.date.getFullYear();
					}
				} else {
					int_obj.date_string = VMM.Date.prettyDate(int_obj.date, true);
				}

				// Increment Time
				inc_time = inc_time + 1;

				// No longer first run
				_first_run = false;

				int_obj.relative_pos = positionRelative(interval, int_obj.date);
				_last_pos = int_obj.relative_pos.begin;
				if (int_obj.relative_pos.begin > _largest_pos) {
					_largest_pos = int_obj.relative_pos.begin;
				}

				// Add the time string to the element and position it.
				VMM.appendElement(int_obj.element, int_obj.date_string);
				VMM.Lib.css(int_obj.element, "text-indent", -(VMM.Lib.width(int_obj.element)/2));
				VMM.Lib.css(int_obj.element, "opacity", "0");

				// add the interval element to the array
				_array.push(int_obj);

			}

			VMM.Lib.width($timeintervalminor_minor, _largest_pos);

			positionInterval(_element_parent, _array);



		}

		/* BUILD
		================================================== */
		function build() {
			var i	= 0,
				j	= 0;

			VMM.attachElement(layout, "");

			$timenav					= VMM.appendAndGetElement(layout, "<div>", "timenav");
			$content					= VMM.appendAndGetElement($timenav, "<div>", "content");
			$time						= VMM.appendAndGetElement($timenav, "<div>", "time");
			$timeintervalminor			= VMM.appendAndGetElement($time, "<div>", "time-interval-minor");
			$timeintervalminor_minor	= VMM.appendAndGetElement($timeintervalminor, "<div>", "minor");
			$timeintervalmajor			= VMM.appendAndGetElement($time, "<div>", "time-interval-major");
			$timeinterval				= VMM.appendAndGetElement($time, "<div>", "time-interval");
			$timebackground				= VMM.appendAndGetElement(layout, "<div>", "timenav-background");
			$timenavline				= VMM.appendAndGetElement($timebackground, "<div>", "timenav-line");
			$timenavindicator			= VMM.appendAndGetElement($timebackground, "<div>", "timenav-indicator");
			$timeintervalbackground		= VMM.appendAndGetElement($timebackground, "<div>", "timenav-interval-background", "<div class='top-highlight'></div>");
			$toolbar					= VMM.appendAndGetElement(layout, "<div>", "vco-toolbar");


			buildInterval();
			buildMarkers();
			buildEras();
			calculateMultiplier();
			positionMarkers(false);
			positionEras();

			positionInterval($timeinterval, interval_array, false, true);
			positionInterval($timeintervalmajor, interval_major_array);


			if (config.start_page) {
				$backhome = VMM.appendAndGetElement($toolbar, "<div>", "back-home", "<div class='icon'></div>");
				VMM.bindEvent(".back-home", onBackHome, "click");
				VMM.Lib.attribute($backhome, "title", VMM.master_config.language.messages.return_to_title);
				VMM.Lib.attribute($backhome, "rel", "timeline-tooltip");

			}


			// MAKE TIMELINE DRAGGABLE/TOUCHABLE
			$dragslide = new VMM.DragSlider;
			$dragslide.createPanel(layout, $timenav, config.nav.constraint, config.touch);



			if (config.touch && config.start_page) {
				VMM.Lib.addClass($toolbar, "touch");
				VMM.Lib.css($toolbar, "top", 55);
				VMM.Lib.css($toolbar, "left", 10);
			} else {
				if (config.start_page) {
					VMM.Lib.css($toolbar, "top", 27);
				}
				$zoomin		= VMM.appendAndGetElement($toolbar, "<div>", "zoom-in", "<div class='icon'></div>");
				$zoomout	= VMM.appendAndGetElement($toolbar, "<div>", "zoom-out", "<div class='icon'></div>");
				// ZOOM EVENTS
				VMM.bindEvent($zoomin, onZoomIn, "click");
				VMM.bindEvent($zoomout, onZoomOut, "click");
				// TOOLTIP
				VMM.Lib.attribute($zoomin, "title", VMM.master_config.language.messages.expand_timeline);
				VMM.Lib.attribute($zoomin, "rel", "timeline-tooltip");
				VMM.Lib.attribute($zoomout, "title", VMM.master_config.language.messages.contract_timeline);
				VMM.Lib.attribute($zoomout, "rel", "timeline-tooltip");
				$toolbar.tooltip({selector: "div[rel=timeline-tooltip]", placement: "right"});


				// MOUSE EVENTS
				VMM.bindEvent(layout, onMouseScroll, 'DOMMouseScroll');
				VMM.bindEvent(layout, onMouseScroll, 'mousewheel');
			}



			// USER CONFIGURABLE ADJUSTMENT TO DEFAULT ZOOM
			if (config.nav.zoom.adjust != 0) {
				if (config.nav.zoom.adjust < 0) {
					for(i = 0; i < Math.abs(config.nav.zoom.adjust); i++) {
						onZoomOut();
					}
				} else {
					for(j = 0; j < config.nav.zoom.adjust; j++) {
						onZoomIn();
					}
				}
			}

			//VMM.fireEvent(layout, "LOADED");
			_active = true;

			reSize(true);
			VMM.fireEvent(layout, "LOADED");

		};

		function buildInterval() {
			var i	= 0,
				j	= 0;
			// CALCULATE INTERVAL
			timespan = getDateFractions((data[data.length - 1].enddate) - (data[0].startdate), true);
			trace(timespan);
			calculateInterval();

			/* DETERMINE DEFAULT INTERVAL TYPE
				millenium, ages, epoch, era and eon are not optimized yet. They may never be.
			================================================== */
			/*
			if (timespan.eons				>		data.length / config.nav.density) {
				interval					=		interval_calc.eon;
				interval_major				=		interval_calc.eon;
				interval_macro				=		interval_calc.era;
			} else if (timespan.eras		>		data.length / config.nav.density) {
				interval					=		interval_calc.era;
				interval_major				=		interval_calc.eon;
				interval_macro				=		interval_calc.epoch;
			} else if (timespan.epochs		>		data.length / config.nav.density) {
				interval					=		interval_calc.epoch;
				interval_major				=		interval_calc.era;
				interval_macro				=		interval_calc.age;
			} else if (timespan.ages		>		data.length / config.nav.density) {
				interval					=		interval_calc.ages;
				interval_major				=		interval_calc.epoch;
				interval_macro				=		interval_calc.millenium;
			} else if (timespan.milleniums			>		data.length / config.nav.density) {
				interval					=		interval_calc.millenium;
				interval_major				=		interval_calc.age;
				interval_macro				=		interval_calc.century;
			} else
			*/
			if (timespan.centuries			>		data.length / config.nav.density) {
				interval					=		interval_calc.century;
				interval_major				=		interval_calc.millenium;
				interval_macro				=		interval_calc.decade;
			} else if (timespan.decades		>		data.length / config.nav.density) {
				interval					=		interval_calc.decade;
				interval_major				=		interval_calc.century;
				interval_macro				=		interval_calc.year;
			} else if (timespan.years		>		data.length / config.nav.density) {
				interval					=		interval_calc.year;
				interval_major				=		interval_calc.decade;
				interval_macro				=		interval_calc.month;
			} else if (timespan.months		>		data.length / config.nav.density) {
				interval					=		interval_calc.month;
				interval_major				=		interval_calc.year;
				interval_macro				=		interval_calc.day;
			} else if (timespan.days		>		data.length / config.nav.density) {
				interval					=		interval_calc.day;
				interval_major				=		interval_calc.month;
				interval_macro				=		interval_calc.hour;
			} else if (timespan.hours		>		data.length / config.nav.density) {
				interval					=		interval_calc.hour;
				interval_major				=		interval_calc.day;
				interval_macro				=		interval_calc.minute;
			} else if (timespan.minutes		>		data.length / config.nav.density) {
				interval					=		interval_calc.minute;
				interval_major				=		interval_calc.hour;
				interval_macro				=		interval_calc.second;
			} else if (timespan.seconds		>		data.length / config.nav.density) {
				interval					=		interval_calc.second;
				interval_major				=		interval_calc.minute;
				interval_macro				=		interval_calc.second;
			} else {
				trace("NO IDEA WHAT THE TYPE SHOULD BE");
				interval					=		interval_calc.day;
				interval_major				=		interval_calc.month;
				interval_macro				=		interval_calc.hour;
			}

			trace("INTERVAL TYPE: " + interval.type);
			trace("INTERVAL MAJOR TYPE: " + interval_major.type);

			// OVERRIDE INTERVAL USING CONFIG
			if (config.nav.interval_override) {
				trace("INTERVAL OVERRIDE");
				if (config.nav.interval_override == "centuries") {
					interval					=		interval_calc.century;
					interval_major				=		interval_calc.millenium;
					interval_macro				=		interval_calc.decade;
				} else if (config.nav.interval_override == "decades") {
					interval					=		interval_calc.decade;
					interval_major				=		interval_calc.century;
					interval_macro				=		interval_calc.year;
				} else if (config.nav.interval_override == "years") {
					interval					=		interval_calc.year;
					interval_major				=		interval_calc.decade;
					interval_macro				=		interval_calc.month;
				} else if (config.nav.interval_override == "months") {
					interval					=		interval_calc.month;
					interval_major				=		interval_calc.year;
					interval_macro				=		interval_calc.day;
				} else if (config.nav.interval_override == "days") {
					interval					=		interval_calc.day;
					interval_major				=		interval_calc.month;
					interval_macro				=		interval_calc.hour;
				} else if (config.nav.interval_override == "hours") {
					interval					=		interval_calc.hour;
					interval_major				=		interval_calc.day;
					interval_macro				=		interval_calc.minute;
				} else if (config.nav.interval_override == "minutes") {
					interval					=		interval_calc.minute;
					interval_major				=		interval_calc.hour;
					interval_macro				=		interval_calc.second;
				} else if (config.nav.interval_override == "seconds") {
					interval					=		interval_calc.second;
					interval_major				=		interval_calc.minute;
					interval_macro				=		interval_calc.second;
				} else {
					trace("NO IDEA WHAT THE TYPE SHOULD BE");
					interval					=		interval_calc.day;
					interval_major				=		interval_calc.month;
					interval_macro				=		interval_calc.hour;
				}
			}

			createIntervalElements(interval, interval_array, $timeinterval);
			createIntervalElements(interval_major, interval_major_array, $timeintervalmajor);

			// Cleanup duplicate interval elements between normal and major
			for(i = 0; i < interval_array.length; i++) {
				for(j = 0; j < interval_major_array.length; j++) {
					if (interval_array[i].date_string == interval_major_array[j].date_string) {
						VMM.attachElement(interval_array[i].element, "");
					}
				}
			}
		}

		function buildMarkers() {

			var row			= 2,
				lpos		= 0,
				row_depth	= 0,
				i			= 0,
				k			= 0,
				l			= 0;


			markers			= [];
			era_markers		= [];

			for(i = 0; i < data.length; i++) {

				var _marker,
					_marker_flag,
					_marker_content,
					_marker_dot,
					_marker_line,
					_marker_line_event,
					_marker_obj,
					_marker_title		= "",
					has_title			= false;


				_marker					= VMM.appendAndGetElement($content, "<div>", "marker");
				_marker_flag			= VMM.appendAndGetElement(_marker, "<div>", "flag");
				_marker_content			= VMM.appendAndGetElement(_marker_flag, "<div>", "flag-content");
				_marker_dot				= VMM.appendAndGetElement(_marker, "<div>", "dot");
				_marker_line			= VMM.appendAndGetElement(_marker, "<div>", "line");
				_marker_line_event		= VMM.appendAndGetElement(_marker_line, "<div>", "event-line");
				_marker_relative_pos	= positionRelative(interval, data[i].startdate, data[i].enddate);
				_marker_thumb			= "";

				// THUMBNAIL
				//trace(data[i].asset);
				//trace(data[i].asset.thumbnail);
				if (data[i].asset != null && data[i].asset != "") {
					if (data[i].asset.thumbnail != null && data[i].asset.thumbnail != "") {
						trace("HAS THUMBNAIL");
						VMM.appendElement(_marker_content, VMM.MediaElement.thumbnail(data[i].asset, 24, 24, data[i].uniqueid));
					} else {
						VMM.appendElement(_marker_content, VMM.MediaElement.thumbnail(data[i].asset, 24, 24, data[i].uniqueid));
					}
				} else {
					VMM.appendElement(_marker_content, "<div style='margin-right:7px;height:50px;width:2px;float:left;'></div>");
				}

				// ADD DATE AND TITLE
				if (data[i].title == "" || data[i].title == " " ) {
					trace("TITLE NOTHING")
					if (typeof data[i].slug != 'undefined' && data[i].slug != "") {
						trace("SLUG")
						_marker_title = VMM.Util.untagify(data[i].slug);
						has_title = true;
					} else {
						var m = VMM.MediaType(data[i].asset.media);
						if (m.type == "quote" || m.type == "unknown") {
							_marker_title = VMM.Util.untagify(m.id);
							has_title = true;
						} else {
							has_title = false;
						}
					}
				} else if (data[i].title != "" || data[i].title != " ") {
					trace(data[i].title)
					_marker_title = VMM.Util.untagify(data[i].title);
					has_title = true;
				} else {
					trace("TITLE SLUG NOT FOUND " + data[i].slug)
				}

				if (has_title) {
					VMM.appendElement(_marker_content, "<h3>" + _marker_title + "</h3>");
				} else {
					VMM.appendElement(_marker_content, "<h3>" + _marker_title + "</h3>");
					VMM.appendElement(_marker_content, "<h3 id='marker_content_" + data[i].uniqueid + "'>" + _marker_title + "</h3>");
				}

				// ADD ID
				VMM.Lib.attr(_marker, "id", ( "marker_" + data[i].uniqueid).toString() );

				// MARKER CLICK
				VMM.bindEvent(_marker_flag, onMarkerClick, "", {number: i});
				VMM.bindEvent(_marker_flag, onMarkerHover, "mouseenter mouseleave", {number: i, elem:_marker_flag});

				_marker_obj = {
					marker: 			_marker,
					flag: 				_marker_flag,
					lineevent: 			_marker_line_event,
					type: 				"marker",
					full:				true,
					relative_pos:		_marker_relative_pos,
					tag:				data[i].tag,
					pos_left:			0
				};


				if (data[i].type == "start") {
					trace("BUILD MARKER HAS START PAGE");
					config.start_page = true;
					_marker_obj.type = "start";
				}

				if (data[i].type == "storify") {
					_marker_obj.type = "storify";
				}


				if (data[i].tag) {
					tags.push(data[i].tag);
				}

				markers.push(_marker_obj);



			}

			// CREATE TAGS
			tags = VMM.Util.deDupeArray(tags);
			if (tags.length > 3) {
				config.nav.rows.current = config.nav.rows.half;
			} else {
				config.nav.rows.current = config.nav.rows.full;
			}
			for(k = 0; k < tags.length; k++) {
				if (k < config.nav.rows.current.length) {
					var tag_element = VMM.appendAndGetElement($timebackground, "<div>", "timenav-tag");
					VMM.Lib.addClass(tag_element, "timenav-tag-row-" + (k+1));
					if (tags.length > 3) {
						VMM.Lib.addClass(tag_element, "timenav-tag-size-half");
					} else {
						VMM.Lib.addClass(tag_element, "timenav-tag-size-full");
					}
					VMM.appendElement(tag_element, "<div><h3>" + tags[k] + "</h3></div>");
				}

			}

			// RESIZE FLAGS IF NEEDED
			if (tags.length > 3) {
				for(l = 0; l < markers.length; l++) {
					VMM.Lib.addClass(markers[l].flag, "flag-small");
					markers[l].full = false;
				}
			}


		}

		function buildEras() {
			var number_of_colors	= 6,
				current_color		= 0,
				j					= 0;
			// CREATE ERAS
			for(j = 0; j < eras.length; j++) {
				var era = {
						content: 			VMM.appendAndGetElement($content, "<div>", "era"),
						text_content: 		VMM.appendAndGetElement($timeinterval, "<div>", "era"),
						startdate: 			VMM.Date.parse(eras[j].startDate),
						enddate: 			VMM.Date.parse(eras[j].endDate),
						title: 				eras[j].headline,
						uniqueid: 			VMM.Util.unique_ID(6),
						tag:				"",
						relative_pos:	 	""
					},
					st						= VMM.Date.prettyDate(era.startdate),
					en						= VMM.Date.prettyDate(era.enddate),
					era_text				= "<div>&nbsp;</div>";

				if (typeof eras[j].tag != "undefined") {
					era.tag = eras[j].tag;
				}

				era.relative_pos = positionRelative(interval, era.startdate, era.enddate);

				VMM.Lib.attr(era.content, "id", era.uniqueid);
				VMM.Lib.attr(era.text_content, "id", era.uniqueid + "_text");

				// Background Color
				VMM.Lib.addClass(era.content, "era"+(current_color+1));
				VMM.Lib.addClass(era.text_content, "era"+(current_color+1));

				if (current_color < number_of_colors) {
					current_color++;
				} else {
					current_color = 0;
				}

				VMM.appendElement(era.content, era_text);
				VMM.appendElement(era.text_content, VMM.Util.unlinkify(era.title));

				era_markers.push(era);

			}

		}

	};

}


/* **********************************************
     Begin VMM.Timeline.DataObj.js
********************************************** */

/*	TIMELINE SOURCE DATA PROCESSOR
================================================== */

if (typeof VMM.Timeline !== 'undefined' && typeof VMM.Timeline.DataObj == 'undefined') {
	VMM.Timeline.DataObj = {
		data_obj: {},
		model_array: [],
		getData: function (raw_data) {
			VMM.Timeline.DataObj.data_obj = {};
			VMM.fireEvent(global, VMM.Timeline.Config.events.messege, VMM.Timeline.Config.language.messages.loading_timeline);
			if (type.of(raw_data) == "object") {
				trace("DATA SOURCE: JSON OBJECT");
				VMM.Timeline.DataObj.parseJSON(raw_data);
			} else if (type.of(raw_data) == "string") {
				if (raw_data.match("%23")) {
					trace("DATA SOURCE: TWITTER SEARCH");
					VMM.Timeline.DataObj.model.tweets.getData("%23medill");
				} else if (	raw_data.match("spreadsheet") ) {
					trace("DATA SOURCE: GOOGLE SPREADSHEET");
					VMM.Timeline.DataObj.model.googlespreadsheet.getData(raw_data);
				} else if (raw_data.match("storify.com")) {
					trace("DATA SOURCE: STORIFY");
					VMM.Timeline.DataObj.model.storify.getData(raw_data);
					//http://api.storify.com/v1/stories/number10gov/g8-and-nato-chicago-summit
				} else if (raw_data.match("\.jsonp")) {
					trace("DATA SOURCE: JSONP");
					LoadLib.js(raw_data, VMM.Timeline.DataObj.onJSONPLoaded);
				} else {
					trace("DATA SOURCE: JSON");
					var req = "";
					if (raw_data.indexOf("?") > -1) {
						req = raw_data + "&callback=onJSONP_Data";
					} else {
						req = raw_data + "?callback=onJSONP_Data";
					}
					VMM.getJSON(req, VMM.Timeline.DataObj.parseJSON);
				}
			} else if (type.of(raw_data) == "html") {
				trace("DATA SOURCE: HTML");
				VMM.Timeline.DataObj.parseHTML(raw_data);
			} else {
				trace("DATA SOURCE: UNKNOWN");
			}

		},

		onJSONPLoaded: function() {
			trace("JSONP IS LOADED");
			VMM.fireEvent(global, VMM.Timeline.Config.events.data_ready, storyjs_jsonp_data);
		},

		parseHTML: function (d) {
			trace("parseHTML");
			trace("WARNING: THIS IS STILL ALPHA AND WILL NOT WORK WITH ID's other than #timeline");
			var _data_obj = VMM.Timeline.DataObj.data_template_obj;

			/*	Timeline start slide
			================================================== */
			if (VMM.Lib.find("#timeline section", "time")[0]) {
				_data_obj.timeline.startDate = VMM.Lib.html(VMM.Lib.find("#timeline section", "time")[0]);
				_data_obj.timeline.headline = VMM.Lib.html(VMM.Lib.find("#timeline section", "h2"));
				_data_obj.timeline.text = VMM.Lib.html(VMM.Lib.find("#timeline section", "article"));

				var found_main_media = false;

				if (VMM.Lib.find("#timeline section", "figure img").length != 0) {
					found_main_media = true;
					_data_obj.timeline.asset.media = VMM.Lib.attr(VMM.Lib.find("#timeline section", "figure img"), "src");
				} else if (VMM.Lib.find("#timeline section", "figure a").length != 0) {
					found_main_media = true;
					_data_obj.timeline.asset.media = VMM.Lib.attr(VMM.Lib.find("#timeline section", "figure a"), "href");
				} else {
					//trace("NOT FOUND");
				}

				if (found_main_media) {
					if (VMM.Lib.find("#timeline section", "cite").length != 0) {
						_data_obj.timeline.asset.credit = VMM.Lib.html(VMM.Lib.find("#timeline section", "cite"));
					}
					if (VMM.Lib.find(this, "figcaption").length != 0) {
						_data_obj.timeline.asset.caption = VMM.Lib.html(VMM.Lib.find("#timeline section", "figcaption"));
					}
				}
			}

			/*	Timeline Date Slides
			================================================== */
			VMM.Lib.each("#timeline li", function(i, elem){

				var valid_date = false;

				var _date = {
					"type":"default",
					"startDate":"",
		            "headline":"",
		            "text":"",
		            "asset":
		            {
		                "media":"",
		                "credit":"",
		                "caption":""
		            },
		            "tags":"Optional"
				};

				if (VMM.Lib.find(this, "time") != 0) {

					valid_date = true;

					_date.startDate = VMM.Lib.html(VMM.Lib.find(this, "time")[0]);

					if (VMM.Lib.find(this, "time")[1]) {
						_date.endDate = VMM.Lib.html(VMM.Lib.find(this, "time")[1]);
					}

					_date.headline = VMM.Lib.html(VMM.Lib.find(this, "h3"));

					_date.text = VMM.Lib.html(VMM.Lib.find(this, "article"));

					var found_media = false;
					if (VMM.Lib.find(this, "figure img").length != 0) {
						found_media = true;
						_date.asset.media = VMM.Lib.attr(VMM.Lib.find(this, "figure img"), "src");
					} else if (VMM.Lib.find(this, "figure a").length != 0) {
						found_media = true;
						_date.asset.media = VMM.Lib.attr(VMM.Lib.find(this, "figure a"), "href");
					} else {
						//trace("NOT FOUND");
					}

					if (found_media) {
						if (VMM.Lib.find(this, "cite").length != 0) {
							_date.asset.credit = VMM.Lib.html(VMM.Lib.find(this, "cite"));
						}
						if (VMM.Lib.find(this, "figcaption").length != 0) {
							_date.asset.caption = VMM.Lib.html(VMM.Lib.find(this, "figcaption"));
						}
					}

					trace(_date);
					_data_obj.timeline.date.push(_date);

				}

			});

			VMM.fireEvent(global, VMM.Timeline.Config.events.data_ready, _data_obj);

		},

		parseJSON: function(d) {
			trace("parseJSON");
			if (d.timeline.type == "default") {
				trace("DATA SOURCE: JSON STANDARD TIMELINE");
				VMM.fireEvent(global, VMM.Timeline.Config.events.data_ready, d);
			} else if (d.timeline.type == "twitter") {
				trace("DATA SOURCE: JSON TWEETS");
				VMM.Timeline.DataObj.model_Tweets.buildData(d);

			} else {
				trace("DATA SOURCE: UNKNOWN JSON");
				trace(type.of(d.timeline));
			};
		},

		/*	MODEL OBJECTS
			New Types of Data can be formatted for the timeline here
		================================================== */

		model: {

			googlespreadsheet: {

				getData: function(raw) {
					var getjsondata, key, worksheet, url, timeout, tries = 0;

					key	= VMM.Util.getUrlVars(raw)["key"];
					worksheet = VMM.Util.getUrlVars(raw)["worksheet"];
					if (typeof worksheet == "undefined") worksheet = "od6";

					url	= "https://spreadsheets.google.com/feeds/list/" + key + "/" + worksheet + "/public/values?alt=json";

					timeout = setTimeout(function() {
						trace("Google Docs timeout " + url);
						trace(url);
						if (tries < 3) {
							VMM.fireEvent(global, VMM.Timeline.Config.events.messege, "Still waiting on Google Docs, trying again " + tries);
							tries ++;
							getjsondata.abort()
							requestJsonData();
						} else {
							VMM.fireEvent(global, VMM.Timeline.Config.events.messege, "Google Docs is not responding");
						}
					}, 16000);

					function requestJsonData() {
						getjsondata = VMM.getJSON(url, function(d) {
							clearTimeout(timeout);
							VMM.Timeline.DataObj.model.googlespreadsheet.buildData(d);
						})
							.error(function(jqXHR, textStatus, errorThrown) {
								trace("Google Docs ERROR");
								trace("Google Docs ERROR: " + textStatus + " " + jqXHR.responseText);
							})
							.success(function(d) {
								clearTimeout(timeout);
							});
					}

					requestJsonData();
				},

				buildData: function(d) {
					var data_obj	= VMM.Timeline.DataObj.data_template_obj,
						is_valid	= false;

					VMM.fireEvent(global, VMM.Timeline.Config.events.messege, "Parsing Google Doc Data");

					function getGVar(v) {
						if (typeof v != 'undefined') {
							return v.$t;
						} else {
							return "";
						}
					}
					if (typeof d.feed.entry != 'undefined') {
						is_valid = true;

						for(var i = 0; i < d.feed.entry.length; i++) {
							var dd		= d.feed.entry[i],
								dd_type	= "";

							if (typeof dd.gsx$type != 'undefined') {
								dd_type = dd.gsx$type.$t;
							} else if (typeof dd.gsx$titleslide != 'undefined') {
								dd_type = dd.gsx$titleslide.$t;
							}

							if (dd_type.match("start") || dd_type.match("title") ) {
								data_obj.timeline.startDate		= getGVar(dd.gsx$startdate);
								data_obj.timeline.headline		= getGVar(dd.gsx$headline);
								data_obj.timeline.asset.media	= getGVar(dd.gsx$media);
								data_obj.timeline.asset.caption	= getGVar(dd.gsx$mediacaption);
								data_obj.timeline.asset.credit	= getGVar(dd.gsx$mediacredit);
								data_obj.timeline.text			= getGVar(dd.gsx$text);
								data_obj.timeline.type			= "google spreadsheet";
							} else if (dd_type.match("era")) {
								var era = {
									startDate:		getGVar(dd.gsx$startdate),
									endDate:		getGVar(dd.gsx$enddate),
									headline:		getGVar(dd.gsx$headline),
									text:			getGVar(dd.gsx$text),
									tag:			getGVar(dd.gsx$tag)
								}
								data_obj.timeline.era.push(era);
							} else {
								var date = {
										type:			"google spreadsheet",
										startDate:		getGVar(dd.gsx$startdate),
										endDate:		getGVar(dd.gsx$enddate),
										headline:		getGVar(dd.gsx$headline),
										text:			getGVar(dd.gsx$text),
										tag:			getGVar(dd.gsx$tag),
										asset: {
											media:		getGVar(dd.gsx$media),
											credit:		getGVar(dd.gsx$mediacredit),
											caption:	getGVar(dd.gsx$mediacaption),
											thumbnail:	getGVar(dd.gsx$mediathumbnail)
										}
								};

								data_obj.timeline.date.push(date);
							}
						};

					} else {

					}


					if (is_valid) {
						VMM.fireEvent(global, VMM.Timeline.Config.events.messege, "Finished Parsing Data");
						VMM.fireEvent(global, VMM.Timeline.Config.events.data_ready, data_obj);
					} else {
						VMM.fireEvent(global, VMM.Timeline.Config.events.messege, VMM.Language.messages.loading + " Google Doc Data (cells)");
						trace("There may be too many entries. Still trying to load data. Now trying to load cells to avoid Googles limitation on cells");
						VMM.Timeline.DataObj.model.googlespreadsheet.getDataCells(d.feed.link[0].href);
					}
				},

				getDataCells: function(raw) {
					var getjsondata, key, url, timeout, tries = 0;

					key	= VMM.Util.getUrlVars(raw)["key"];
					url	= "https://spreadsheets.google.com/feeds/cells/" + key + "/od6/public/values?alt=json";

					timeout = setTimeout(function() {
						trace("Google Docs timeout " + url);
						trace(url);
						if (tries < 3) {
							VMM.fireEvent(global, VMM.Timeline.Config.events.messege, "Still waiting on Google Docs, trying again " + tries);
							tries ++;
							getjsondata.abort()
							requestJsonData();
						} else {
							VMM.fireEvent(global, VMM.Timeline.Config.events.messege, "Google Docs is not responding");
						}
					}, 16000);

					function requestJsonData() {
						getjsondata = VMM.getJSON(url, function(d) {
							clearTimeout(timeout);
							VMM.Timeline.DataObj.model.googlespreadsheet.buildDataCells(d);
						})
							.error(function(jqXHR, textStatus, errorThrown) {
								trace("Google Docs ERROR");
								trace("Google Docs ERROR: " + textStatus + " " + jqXHR.responseText);
							})
							.success(function(d) {
								clearTimeout(timeout);
							});
					}

					requestJsonData();
				},

				buildDataCells: function(d) {
					var data_obj	= VMM.Timeline.DataObj.data_template_obj,
						is_valid	= false,
						cellnames	= ["timeline"],
						list 		= [],
						max_row		= 0,
						i			= 0,
						k			= 0;

					VMM.fireEvent(global, VMM.Timeline.Config.events.messege, VMM.Language.messages.loading_timeline + " Parsing Google Doc Data (cells)");

					function getGVar(v) {
						if (typeof v != 'undefined') {
							return v.$t;
						} else {
							return "";
						}
					}

					if (typeof d.feed.entry != 'undefined') {
						is_valid = true;

						// DETERMINE NUMBER OF ROWS
						for(i = 0; i < d.feed.entry.length; i++) {
							var dd				= d.feed.entry[i];

							if (parseInt(dd.gs$cell.row) > max_row) {
								max_row = parseInt(dd.gs$cell.row);
							}
						}

						// CREATE OBJECT FOR EACH ROW
						for(var i = 0; i < max_row + 1; i++) {
							var date = {
								type:			"",
								startDate:		"",
								endDate:		"",
								headline:		"",
								text:			"",
								tag:			"",
								asset: {
									media:		"",
									credit:		"",
									caption:	"",
									thumbnail:	""
								}
							};
							list.push(date);
						}

						// PREP GOOGLE DOC CELL DATA TO EVALUATE
						for(i = 0; i < d.feed.entry.length; i++) {
							var dd				= d.feed.entry[i],
								dd_type			= "",
								column_name		= "",
								cell = {
									content: 	getGVar(dd.gs$cell),
									col: 		dd.gs$cell.col,
									row: 		dd.gs$cell.row,
									name: 		""
								};

							//trace(cell);

							if (cell.row == 1) {
								if (cell.content == "Start Date") {
									column_name = "startDate";
								} else if (cell.content == "End Date") {
									column_name = "endDate";
								} else if (cell.content == "Headline") {
									column_name = "headline";
								} else if (cell.content == "Text") {
									column_name = "text";
								} else if (cell.content == "Media") {
									column_name = "media";
								} else if (cell.content == "Media Credit") {
									column_name = "credit";
								} else if (cell.content == "Media Caption") {
									column_name = "caption";
								} else if (cell.content == "Media Thumbnail") {
									column_name = "thumbnail";
								} else if (cell.content == "Type") {
									column_name = "type";
								} else if (cell.content == "Tag") {
									column_name = "tag";
								}

								cellnames.push(column_name);

							} else {
								cell.name = cellnames[cell.col];
								list[cell.row][cell.name] = cell.content;
							}

						};


						for(i = 0; i < list.length; i++) {
							var date	= list[i];

							if (date.type.match("start") || date.type.match("title") ) {
								data_obj.timeline.startDate		= date.startDate;
								data_obj.timeline.headline		= date.headline;
								data_obj.timeline.asset.media	= date.media;
								data_obj.timeline.asset.caption	= date.caption;
								data_obj.timeline.asset.credit	= date.credit;
								data_obj.timeline.text			= date.text;
								data_obj.timeline.type			= "google spreadsheet";
							} else if (date.type.match("era")) {
								var era = {
									startDate:		date.startDate,
									endDate:		date.endDate,
									headline:		date.headline,
									text:			date.text,
									tag:			date.tag
								}
								data_obj.timeline.era.push(era);
							} else {
								var date = {
										type:			"google spreadsheet",
										startDate:		date.startDate,
										endDate:		date.endDate,
										headline:		date.headline,
										text:			date.text,
										tag:			date.tag,
										asset: {
											media:		date.media,
											credit:		date.credit,
											caption:	date.caption,
											thumbnail:	date.thumbnail
										}
								};

								data_obj.timeline.date.push(date);
							}

						}

						//trace(cellnames);
						//trace(max_row);
						//trace(list);

					}

					if (is_valid) {
						VMM.fireEvent(global, VMM.Timeline.Config.events.messege, "Finished Parsing Data");
						VMM.fireEvent(global, VMM.Timeline.Config.events.data_ready, data_obj);
					} else {
						VMM.fireEvent(global, VMM.Timeline.Config.events.messege, "Unable to load Google Doc data source");
					}
				}

			},

			storify: {

				getData: function(raw) {
					var key, url, storify_timeout;
					//http://storify.com/number10gov/g8-and-nato-chicago-summit
					//http://api.storify.com/v1/stories/number10gov/g8-and-nato-chicago-summit

					VMM.fireEvent(global, VMM.Timeline.Config.events.messege, "Loading Storify...");

					key	= raw.split("storify.com\/")[1];
					url	= "http://api.storify.com/v1/stories/" + key + "?per_page=300&callback=?";

					storify_timeout = setTimeout(function() {
						trace("STORIFY timeout");
						VMM.fireEvent(global, VMM.Timeline.Config.events.messege, "Storify is not responding");
					}, 6000);

					VMM.getJSON(url, VMM.Timeline.DataObj.model.storify.buildData)
						.error(function(jqXHR, textStatus, errorThrown) {
							trace("STORIFY error");
							trace("STORIFY ERROR: " + textStatus + " " + jqXHR.responseText);
						})
						.success(function(d) {
							clearTimeout(storify_timeout);
						});

				},

				buildData: function(d) {
					VMM.fireEvent(global, VMM.Timeline.Config.events.messege, "Parsing Data");
					var _data_obj = VMM.Timeline.DataObj.data_template_obj;

					_data_obj.timeline.startDate	= 	new Date(d.content.date.created);;
					_data_obj.timeline.headline		= 	d.content.title;

					trace(d);
					//d.permalink
					var tt			=	"";
					var t_name		=	d.content.author.username;
					var t_nickname	=	"";
					if (typeof d.content.author.name != 'undefined') {
						t_name		=	d.content.author.name;
						t_nickname	=	d.content.author.username + "&nbsp;";
					}
					if (typeof d.content.description != 'undefined' && d.content.description != null) {
						tt			+=	d.content.description;
					}

					tt				+=	"<div class='storify'>"
					//tt				 += " <a href='" + d.content.permalink + "' target='_blank' alt='link to original story' title='link to original story'>" + "<span class='created-at'></span>" + " </a>";

					tt				+=	"<div class='vcard author'><a class='screen-name url' href='" + d.content.author.permalink + "' target='_blank'>";

					tt				+=	"<span class='avatar'><img src='" + d.content.author.avatar + "' style='max-width: 32px; max-height: 32px;'></span>"
					tt				+=	"<span class='fn'>" + t_name + "</span>";
					tt				+=	"<span class='nickname'>" + t_nickname + "<span class='thumbnail-inline'></span></span>";
					tt				+=	"</a>";
					//tt				+=	"<span class='nickname'>" + d.content.author.stats.stories + " Stories</span>";
					//tt				+=	"<span class='nickname'>" + d.content.author.stats.subscribers + " Subscribers</span>";
					tt				+=	"</div>"
					tt				+=	"</div>";

					_data_obj.timeline.text = tt;
					_data_obj.timeline.asset.media = d.content.thumbnail;

					//_data_obj.timeline.asset.media = 		dd.gsx$media.$t;
					//_data_obj.timeline.asset.caption = 		dd.gsx$mediacaption.$t;
					//_data_obj.timeline.asset.credit = 		dd.gsx$mediacredit.$t;
					_data_obj.timeline.type = 				"storify";

					for(var i = 0; i < d.content.elements.length; i++) {
						var dd = d.content.elements[i];
						var is_text = false;
						var d_date = new Date(dd.posted_at);
						//trace(tempdat);
						trace(dd.type);
						//trace(dd);
						var _date = {
							"type": 		"storify",
							"startDate": 	dd.posted_at,
							"endDate": 		dd.posted_at,
				            "headline": 	" ",
							"slug": 		"",
				            "text": 		"",
				            "asset": {
								"media": 	"",
								"credit": 	"",
								"caption": 	""
							}
						};

						/*	MEDIA
						================================================== */
						if (dd.type == "image") {

							if (typeof dd.source.name != 'undefined') {
								if (dd.source.name == "flickr") {
									_date.asset.media		=	"http://flickr.com/photos/" + dd.meta.pathalias + "/" + dd.meta.id + "/";
									_date.asset.credit		=	"<a href='" + _date.asset.media + "'>" + dd.attribution.name + "</a>";
									_date.asset.credit		+=	" on <a href='" + dd.source.href + "'>" + dd.source.name + "</a>";
								} else if (dd.source.name	==	"instagram") {
									_date.asset.media		=	dd.permalink;
									_date.asset.credit		=	"<a href='" + dd.permalink + "'>" + dd.attribution.name + "</a>";
									_date.asset.credit		+=	" on <a href='" + dd.source.href + "'>" + dd.source.name + "</a>";
								} else {
									_date.asset.credit		=	"<a href='" + dd.permalink + "'>" + dd.attribution.name + "</a>";

									if (typeof dd.source.href != 'undefined') {
										_date.asset.credit	+=	" on <a href='" + dd.source.href + "'>" + dd.source.name + "</a>";
									}

									_date.asset.media		=	dd.data.image.src;
								}
							} else {
								_date.asset.credit			=	"<a href='" + dd.permalink + "'>" + dd.attribution.name + "</a>";
								_date.asset.media			=	dd.data.image.src;
							}

							_date.slug	 					=	dd.attribution.name;
							if (typeof dd.data.image.caption != 'undefined') {
								if (dd.data.image.caption != 'undefined') {
									_date.asset.caption				=	dd.data.image.caption;
									_date.slug	 					=	dd.data.image.caption;
								}
							}

						} else if (dd.type == "quote") {
							if (dd.permalink.match("twitter")) {
								_date.asset.media	=	dd.permalink;
								_date.slug = VMM.Util.untagify(dd.data.quote.text);
							} else if (dd.permalink.match("storify")) {
								is_text = true;
								_date.asset.media	=	"<blockquote>" + dd.data.quote.text.replace(/<\s*\/?\s*b\s*.*?>/g,"") + "</blockquote>";
							}
						} else if (dd.type == "link") {
							_date.headline		=	dd.data.link.title;
							_date.text			=	dd.data.link.description;
							if (dd.data.link.thumbnail != 'undefined' && dd.data.link.thumbnail != '') {
								_date.asset.media	=	dd.data.link.thumbnail;
							} else {
								_date.asset.media	=	dd.permalink;
							}
							//_date.asset.media	=	dd.permalink;
							_date.asset.caption	=	"<a href='" + dd.permalink + "' target='_blank'>" + dd.data.link.title + "</a>"
							_date.slug			=	dd.data.link.title;

						} else if (dd.type == "text") {
							if (dd.permalink.match("storify")) {
								is_text = true;
								var d_name		=	d.content.author.username;
								var d_nickname	=	"";
								if (typeof dd.attribution.name != 'undefined') {
									t_name		=	dd.attribution.name;
									t_nickname	=	dd.attribution.username + "&nbsp;";
								}

								var asset_text	=	"<div class='storify'>"
								asset_text		+=	"<blockquote><p>" + dd.data.text.replace(/<\s*\/?\s*b\s*.*?>/g,"") + "</p></blockquote>";
								//asset_text		+=	" <a href='" + dd.attribution.href + "' target='_blank' alt='link to author' title='link to author'>" + "<span class='created-at'></span>" + " </a>";

								asset_text		+=	"<div class='vcard author'><a class='screen-name url' href='" + dd.attribution.href + "' target='_blank'>";
								asset_text		+=	"<span class='avatar'><img src='" + dd.attribution.thumbnail + "' style='max-width: 32px; max-height: 32px;'></span>"
								asset_text		+=	"<span class='fn'>" + t_name + "</span>";
								asset_text		+=	"<span class='nickname'>" + t_nickname + "<span class='thumbnail-inline'></span></span>";
								asset_text		+=	"</a></div></div>";
								_date.text		=	asset_text;

								// Try and put it before the element where it is expected on storify
								if ( (i+1) >= d.content.elements.length ) {
									_date.startDate = d.content.elements[i-1].posted_at;

								} else {
									if (d.content.elements[i+1].type == "text" && d.content.elements[i+1].permalink.match("storify")) {
										if ( (i+2) >= d.content.elements.length ) {
											_date.startDate = d.content.elements[i-1].posted_at;
										} else {
											if (d.content.elements[i+2].type == "text" && d.content.elements[i+2].permalink.match("storify")) {
												if ( (i+3) >= d.content.elements.length ) {
													_date.startDate = d.content.elements[i-1].posted_at;
												} else {
													if (d.content.elements[i+3].type == "text" && d.content.elements[i+3].permalink.match("storify")) {
														_date.startDate = d.content.elements[i-1].posted_at;
													} else {
														trace("LEVEL 3");
														_date.startDate = d.content.elements[i+3].posted_at;
													}
												}
											} else {
												trace("LEVEL 2");
												_date.startDate = d.content.elements[i+2].posted_at;
											}
										}
									} else {
										trace("LEVEL 1");
										_date.startDate = d.content.elements[i+1].posted_at;
									}

								}
								_date.endDate = _date.startDate
							}


						} else if (dd.type == "video") {
							_date.headline		=	dd.data.video.title;
							_date.asset.caption	=	dd.data.video.description;
							_date.asset.caption	=	dd.source.username;
							_date.asset.media	=	dd.data.video.src;
						} else {
							trace("NO MATCH ");
							trace(dd);
						}

						if (is_text) {
							_date.slug = VMM.Util.untagify(dd.data.text);
						}

						_data_obj.timeline.date.push(_date);


					};

					VMM.fireEvent(global, VMM.Timeline.Config.events.data_ready, _data_obj);
				}

			},

			tweets: {

				type: "twitter",

				buildData: function(raw_data) {
					VMM.bindEvent(global, VMM.Timeline.DataObj.model.tweets.onTwitterDataReady, "TWEETSLOADED");
					VMM.ExternalAPI.twitter.getTweets(raw_data.timeline.tweets);
				},

				getData: function(raw_data) {
					VMM.bindEvent(global, VMM.Timeline.DataObj.model.tweets.onTwitterDataReady, "TWEETSLOADED");
					VMM.ExternalAPI.twitter.getTweetSearch(raw_data);
				},

				onTwitterDataReady: function(e, d) {
					var _data_obj = VMM.Timeline.DataObj.data_template_obj;

					for(var i = 0; i < d.tweetdata.length; i++) {

						var _date = {
							"type":"tweets",
							"startDate":"",
				            "headline":"",
				            "text":"",
				            "asset":
				            {
				                "media":"",
				                "credit":"",
				                "caption":""
				            },
				            "tags":"Optional"
						};
						// pass in the 'created_at' string returned from twitter //
						// stamp arrives formatted as Tue Apr 07 22:52:51 +0000 2009 //

						//var twit_date = VMM.ExternalAPI.twitter.parseTwitterDate(d.tweetdata[i].raw.created_at);
						//trace(twit_date);

						_date.startDate = d.tweetdata[i].raw.created_at;

						if (type.of(d.tweetdata[i].raw.from_user_name)) {
							_date.headline = d.tweetdata[i].raw.from_user_name + " (<a href='https://twitter.com/" + d.tweetdata[i].raw.from_user + "'>" + "@" + d.tweetdata[i].raw.from_user + "</a>)" ;
						} else {
							_date.headline = d.tweetdata[i].raw.user.name + " (<a href='https://twitter.com/" + d.tweetdata[i].raw.user.screen_name + "'>" + "@" + d.tweetdata[i].raw.user.screen_name + "</a>)" ;
						}

						_date.asset.media = d.tweetdata[i].content;
						_data_obj.timeline.date.push(_date);

					};

					VMM.fireEvent(global, VMM.Timeline.Config.events.data_ready, _data_obj);
				}

			}
		},


		/*	TEMPLATE OBJECTS
		================================================== */
		data_template_obj: {  "timeline": { "headline":"", "description":"", "asset": { "media":"", "credit":"", "caption":"" }, "date": [], "era":[] } },
		date_obj: {"startDate":"2012,2,2,11,30", "headline":"", "text":"", "asset": {"media":"http://youtu.be/vjVfu8-Wp6s", "credit":"", "caption":"" }, "tags":"Optional"}

	};

}
;


/* CREATE StoryJS Embed
================================================== */

function createStoryJS(c, src) {
	/* VARS
	================================================== */
	var storyjs_embedjs, t, te, x,
		isCDN = false,
		storyjs_e_config = {
			debug: false,
			type: 'timeline',
			id: 'storyjs',
			embed_id: 'timeline-embed',
			embed: true,
			width: '100%',
			height: '100%',
			source:	'https://docs.google.com/spreadsheet/pub?key=0Agl_Dv6iEbDadFYzRjJPUGktY0NkWXFUWkVIZDNGRHc&output=html',
			api_keys: {
				google:	"",
				flickr:	"",
				twitter: ""
			},
			gmap_key: "",
            ajax_timeout: 3000
		};

	/* Build Timeline
	================================================== */
	function createEmbedDiv() {
		var embed_classname	= "storyjs-embed";

		t = document.createElement('div');

		if (storyjs_e_config.embed_id != "") {
			te = document.getElementById(storyjs_e_config.embed_id);
		} else {
			te = document.getElementById("timeline-embed");
		}

		te.appendChild(t);
		t.setAttribute("id", storyjs_e_config.id);

		if (storyjs_e_config.width.toString().match("%") ) {
			te.style.width = storyjs_e_config.width.split("%")[0] + "%";
		} else {
			storyjs_e_config.width = storyjs_e_config.width - 2;
			te.style.width = (storyjs_e_config.width) + 'px';
		}

		if (storyjs_e_config.height.toString().match("%")) {
			te.style.height = storyjs_e_config.height;
			embed_classname	+= " full-embed";
			te.style.height = storyjs_e_config.height.split("%")[0] + "%";

		} else if (storyjs_e_config.width.toString().match("%")) {
			embed_classname	+= " full-embed";
			storyjs_e_config.height = storyjs_e_config.height - 16;
			te.style.height = (storyjs_e_config.height) + 'px';
		} else {
			embed_classname	+= " sized-embed";
			storyjs_e_config.height = storyjs_e_config.height - 16;
			te.style.height = (storyjs_e_config.height) + 'px';
		}

		te.setAttribute("class", embed_classname);
		te.setAttribute("className", embed_classname);
		t.style.position = 'relative';
	}

	function buildEmbed() {
		VMM.debug = storyjs_e_config.debug;
		storyjs_embedjs = new VMM.Timeline(storyjs_e_config.id);
		storyjs_embedjs.init(storyjs_e_config);
		if (isCDN) {
			VMM.bindEvent(global, onHeadline, "HEADLINE");
		}
	}

	/* BUILD CONFIG
	================================================== */
	if (typeof c == 'object') {
		for (x in c) {
			if (Object.prototype.hasOwnProperty.call(c, x)) {
				storyjs_e_config[x] = c[x];
			}
		}
	}

	if (typeof src != 'undefined') {
		storyjs_e_config.source = src;
	}

	/* CDN VERSION?
	================================================== */
	if (typeof url_config == 'object') {
		isCDN = true;

		/* IS THE SOURCE GOOGLE SPREADSHEET WITH JUST THE KEY?
		================================================== */
		if (storyjs_e_config.source.match("docs.google.com") || storyjs_e_config.source.match("json") || storyjs_e_config.source.match("storify") ) {

		} else {
			storyjs_e_config.source = "https://docs.google.com/spreadsheet/pub?key=" + storyjs_e_config.source + "&output=html";
		}

	}

	createEmbedDiv();
	buildEmbed();
}
;
(function() {
  var CSRFToken, allowLinkExtensions, anchoredLink, browserCompatibleDocumentParser, browserIsntBuggy, browserSupportsCustomEvents, browserSupportsPushState, browserSupportsTurbolinks, bypassOnLoadPopstate, cacheCurrentPage, cacheSize, changePage, constrainPageCacheTo, createDocument, crossOriginLink, currentState, enableTransitionCache, executeScriptTags, extractLink, extractTitleAndBody, fetch, fetchHistory, fetchReplacement, handleClick, historyStateIsDefined, htmlExtensions, ignoreClick, initializeTurbolinks, installClickHandlerLast, installDocumentReadyPageEventTriggers, installHistoryChangeHandler, installJqueryAjaxSuccessPageUpdateTrigger, loadedAssets, noTurbolink, nonHtmlLink, nonStandardClick, pageCache, pageChangePrevented, pagesCached, popCookie, processResponse, recallScrollPosition, referer, reflectNewUrl, reflectRedirectedUrl, rememberCurrentState, rememberCurrentUrl, rememberReferer, removeHash, removeHashForIE10compatiblity, removeNoscriptTags, requestMethodIsSafe, resetScrollPosition, targetLink, transitionCacheEnabled, transitionCacheFor, triggerEvent, visit, xhr, _ref,
    __indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; },
    __slice = [].slice;

  pageCache = {};

  cacheSize = 10;

  transitionCacheEnabled = false;

  currentState = null;

  loadedAssets = null;

  htmlExtensions = ['html'];

  referer = null;

  createDocument = null;

  xhr = null;

  fetch = function(url) {
    var cachedPage;
    rememberReferer();
    cacheCurrentPage();
    reflectNewUrl(url);
    if (transitionCacheEnabled && (cachedPage = transitionCacheFor(url))) {
      fetchHistory(cachedPage);
      return fetchReplacement(url);
    } else {
      return fetchReplacement(url, resetScrollPosition);
    }
  };

  transitionCacheFor = function(url) {
    var cachedPage;
    cachedPage = pageCache[url];
    if (cachedPage && !cachedPage.transitionCacheDisabled) {
      return cachedPage;
    }
  };

  enableTransitionCache = function(enable) {
    if (enable == null) {
      enable = true;
    }
    return transitionCacheEnabled = enable;
  };

  fetchReplacement = function(url, onLoadFunction) {
    var _this = this;
    if (onLoadFunction == null) {
      onLoadFunction = function() {};
    }
    triggerEvent('page:fetch', {
      url: url
    });
    if (xhr != null) {
      xhr.abort();
    }
    xhr = new XMLHttpRequest;
    xhr.open('GET', removeHashForIE10compatiblity(url), true);
    xhr.setRequestHeader('Accept', 'text/html, application/xhtml+xml, application/xml');
    xhr.setRequestHeader('X-XHR-Referer', referer);
    xhr.onload = function() {
      var doc;
      triggerEvent('page:receive');
      if (doc = processResponse()) {
        changePage.apply(null, extractTitleAndBody(doc));
        reflectRedirectedUrl();
        onLoadFunction();
        return triggerEvent('page:load');
      } else {
        return document.location.href = url;
      }
    };
    xhr.onloadend = function() {
      return xhr = null;
    };
    xhr.onerror = function() {
      return document.location.href = url;
    };
    return xhr.send();
  };

  fetchHistory = function(cachedPage) {
    if (xhr != null) {
      xhr.abort();
    }
    changePage(cachedPage.title, cachedPage.body);
    recallScrollPosition(cachedPage);
    return triggerEvent('page:restore');
  };

  cacheCurrentPage = function() {
    pageCache[currentState.url] = {
      url: document.location.href,
      body: document.body,
      title: document.title,
      positionY: window.pageYOffset,
      positionX: window.pageXOffset,
      cachedAt: new Date().getTime(),
      transitionCacheDisabled: document.querySelector('[data-no-transition-cache]') != null
    };
    return constrainPageCacheTo(cacheSize);
  };

  pagesCached = function(size) {
    if (size == null) {
      size = cacheSize;
    }
    if (/^[\d]+$/.test(size)) {
      return cacheSize = parseInt(size);
    }
  };

  constrainPageCacheTo = function(limit) {
    var cacheTimesRecentFirst, key, pageCacheKeys, _i, _len, _results;
    pageCacheKeys = Object.keys(pageCache);
    cacheTimesRecentFirst = pageCacheKeys.map(function(url) {
      return pageCache[url].cachedAt;
    }).sort(function(a, b) {
      return b - a;
    });
    _results = [];
    for (_i = 0, _len = pageCacheKeys.length; _i < _len; _i++) {
      key = pageCacheKeys[_i];
      if (!(pageCache[key].cachedAt <= cacheTimesRecentFirst[limit])) {
        continue;
      }
      triggerEvent('page:expire', pageCache[key]);
      _results.push(delete pageCache[key]);
    }
    return _results;
  };

  changePage = function(title, body, csrfToken, runScripts) {
    document.title = title;
    document.documentElement.replaceChild(body, document.body);
    if (csrfToken != null) {
      CSRFToken.update(csrfToken);
    }
    if (runScripts) {
      executeScriptTags();
    }
    currentState = window.history.state;
    triggerEvent('page:change');
    return triggerEvent('page:update');
  };

  executeScriptTags = function() {
    var attr, copy, nextSibling, parentNode, script, scripts, _i, _j, _len, _len1, _ref, _ref1;
    scripts = Array.prototype.slice.call(document.body.querySelectorAll('script:not([data-turbolinks-eval="false"])'));
    for (_i = 0, _len = scripts.length; _i < _len; _i++) {
      script = scripts[_i];
      if (!((_ref = script.type) === '' || _ref === 'text/javascript')) {
        continue;
      }
      copy = document.createElement('script');
      _ref1 = script.attributes;
      for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
        attr = _ref1[_j];
        copy.setAttribute(attr.name, attr.value);
      }
      copy.appendChild(document.createTextNode(script.innerHTML));
      parentNode = script.parentNode, nextSibling = script.nextSibling;
      parentNode.removeChild(script);
      parentNode.insertBefore(copy, nextSibling);
    }
  };

  removeNoscriptTags = function(node) {
    node.innerHTML = node.innerHTML.replace(/<noscript[\S\s]*?<\/noscript>/ig, '');
    return node;
  };

  reflectNewUrl = function(url) {
    if (url !== referer) {
      return window.history.pushState({
        turbolinks: true,
        url: url
      }, '', url);
    }
  };

  reflectRedirectedUrl = function() {
    var location, preservedHash;
    if (location = xhr.getResponseHeader('X-XHR-Redirected-To')) {
      preservedHash = removeHash(location) === location ? document.location.hash : '';
      return window.history.replaceState(currentState, '', location + preservedHash);
    }
  };

  rememberReferer = function() {
    return referer = document.location.href;
  };

  rememberCurrentUrl = function() {
    return window.history.replaceState({
      turbolinks: true,
      url: document.location.href
    }, '', document.location.href);
  };

  rememberCurrentState = function() {
    return currentState = window.history.state;
  };

  recallScrollPosition = function(page) {
    return window.scrollTo(page.positionX, page.positionY);
  };

  resetScrollPosition = function() {
    if (document.location.hash) {
      return document.location.href = document.location.href;
    } else {
      return window.scrollTo(0, 0);
    }
  };

  removeHashForIE10compatiblity = function(url) {
    return removeHash(url);
  };

  removeHash = function(url) {
    var link;
    link = url;
    if (url.href == null) {
      link = document.createElement('A');
      link.href = url;
    }
    return link.href.replace(link.hash, '');
  };

  popCookie = function(name) {
    var value, _ref;
    value = ((_ref = document.cookie.match(new RegExp(name + "=(\\w+)"))) != null ? _ref[1].toUpperCase() : void 0) || '';
    document.cookie = name + '=; expires=Thu, 01-Jan-70 00:00:01 GMT; path=/';
    return value;
  };

  triggerEvent = function(name, data) {
    var event;
    event = document.createEvent('Events');
    if (data) {
      event.data = data;
    }
    event.initEvent(name, true, true);
    return document.dispatchEvent(event);
  };

  pageChangePrevented = function() {
    return !triggerEvent('page:before-change');
  };

  processResponse = function() {
    var assetsChanged, clientOrServerError, doc, extractTrackAssets, intersection, validContent;
    clientOrServerError = function() {
      var _ref;
      return (400 <= (_ref = xhr.status) && _ref < 600);
    };
    validContent = function() {
      return xhr.getResponseHeader('Content-Type').match(/^(?:text\/html|application\/xhtml\+xml|application\/xml)(?:;|$)/);
    };
    extractTrackAssets = function(doc) {
      var node, _i, _len, _ref, _results;
      _ref = doc.head.childNodes;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        node = _ref[_i];
        if ((typeof node.getAttribute === "function" ? node.getAttribute('data-turbolinks-track') : void 0) != null) {
          _results.push(node.getAttribute('src') || node.getAttribute('href'));
        }
      }
      return _results;
    };
    assetsChanged = function(doc) {
      var fetchedAssets;
      loadedAssets || (loadedAssets = extractTrackAssets(document));
      fetchedAssets = extractTrackAssets(doc);
      return fetchedAssets.length !== loadedAssets.length || intersection(fetchedAssets, loadedAssets).length !== loadedAssets.length;
    };
    intersection = function(a, b) {
      var value, _i, _len, _ref, _results;
      if (a.length > b.length) {
        _ref = [b, a], a = _ref[0], b = _ref[1];
      }
      _results = [];
      for (_i = 0, _len = a.length; _i < _len; _i++) {
        value = a[_i];
        if (__indexOf.call(b, value) >= 0) {
          _results.push(value);
        }
      }
      return _results;
    };
    if (!clientOrServerError() && validContent()) {
      doc = createDocument(xhr.responseText);
      if (doc && !assetsChanged(doc)) {
        return doc;
      }
    }
  };

  extractTitleAndBody = function(doc) {
    var title;
    title = doc.querySelector('title');
    return [title != null ? title.textContent : void 0, removeNoscriptTags(doc.body), CSRFToken.get(doc).token, 'runScripts'];
  };

  CSRFToken = {
    get: function(doc) {
      var tag;
      if (doc == null) {
        doc = document;
      }
      return {
        node: tag = doc.querySelector('meta[name="csrf-token"]'),
        token: tag != null ? typeof tag.getAttribute === "function" ? tag.getAttribute('content') : void 0 : void 0
      };
    },
    update: function(latest) {
      var current;
      current = this.get();
      if ((current.token != null) && (latest != null) && current.token !== latest) {
        return current.node.setAttribute('content', latest);
      }
    }
  };

  browserCompatibleDocumentParser = function() {
    var createDocumentUsingDOM, createDocumentUsingParser, createDocumentUsingWrite, e, testDoc, _ref;
    createDocumentUsingParser = function(html) {
      return (new DOMParser).parseFromString(html, 'text/html');
    };
    createDocumentUsingDOM = function(html) {
      var doc;
      doc = document.implementation.createHTMLDocument('');
      doc.documentElement.innerHTML = html;
      return doc;
    };
    createDocumentUsingWrite = function(html) {
      var doc;
      doc = document.implementation.createHTMLDocument('');
      doc.open('replace');
      doc.write(html);
      doc.close();
      return doc;
    };
    try {
      if (window.DOMParser) {
        testDoc = createDocumentUsingParser('<html><body><p>test');
        return createDocumentUsingParser;
      }
    } catch (_error) {
      e = _error;
      testDoc = createDocumentUsingDOM('<html><body><p>test');
      return createDocumentUsingDOM;
    } finally {
      if ((testDoc != null ? (_ref = testDoc.body) != null ? _ref.childNodes.length : void 0 : void 0) !== 1) {
        return createDocumentUsingWrite;
      }
    }
  };

  installClickHandlerLast = function(event) {
    if (!event.defaultPrevented) {
      document.removeEventListener('click', handleClick, false);
      return document.addEventListener('click', handleClick, false);
    }
  };

  handleClick = function(event) {
    var link;
    if (!event.defaultPrevented) {
      link = extractLink(event);
      if (link.nodeName === 'A' && !ignoreClick(event, link)) {
        if (!pageChangePrevented()) {
          visit(link.href);
        }
        return event.preventDefault();
      }
    }
  };

  extractLink = function(event) {
    var link;
    link = event.target;
    while (!(!link.parentNode || link.nodeName === 'A')) {
      link = link.parentNode;
    }
    return link;
  };

  crossOriginLink = function(link) {
    return location.protocol !== link.protocol || location.host !== link.host;
  };

  anchoredLink = function(link) {
    return ((link.hash && removeHash(link)) === removeHash(location)) || (link.href === location.href + '#');
  };

  nonHtmlLink = function(link) {
    var url;
    url = removeHash(link);
    return url.match(/\.[a-z]+(\?.*)?$/g) && !url.match(new RegExp("\\.(?:" + (htmlExtensions.join('|')) + ")?(\\?.*)?$", 'g'));
  };

  noTurbolink = function(link) {
    var ignore;
    while (!(ignore || link === document)) {
      ignore = link.getAttribute('data-no-turbolink') != null;
      link = link.parentNode;
    }
    return ignore;
  };

  targetLink = function(link) {
    return link.target.length !== 0;
  };

  nonStandardClick = function(event) {
    return event.which > 1 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey;
  };

  ignoreClick = function(event, link) {
    return crossOriginLink(link) || anchoredLink(link) || nonHtmlLink(link) || noTurbolink(link) || targetLink(link) || nonStandardClick(event);
  };

  allowLinkExtensions = function() {
    var extension, extensions, _i, _len;
    extensions = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
    for (_i = 0, _len = extensions.length; _i < _len; _i++) {
      extension = extensions[_i];
      htmlExtensions.push(extension);
    }
    return htmlExtensions;
  };

  bypassOnLoadPopstate = function(fn) {
    return setTimeout(fn, 500);
  };

  installDocumentReadyPageEventTriggers = function() {
    return document.addEventListener('DOMContentLoaded', (function() {
      triggerEvent('page:change');
      return triggerEvent('page:update');
    }), true);
  };

  installJqueryAjaxSuccessPageUpdateTrigger = function() {
    if (typeof jQuery !== 'undefined') {
      return jQuery(document).on('ajaxSuccess', function(event, xhr, settings) {
        if (!jQuery.trim(xhr.responseText)) {
          return;
        }
        return triggerEvent('page:update');
      });
    }
  };

  installHistoryChangeHandler = function(event) {
    var cachedPage, _ref;
    if ((_ref = event.state) != null ? _ref.turbolinks : void 0) {
      if (cachedPage = pageCache[event.state.url]) {
        cacheCurrentPage();
        return fetchHistory(cachedPage);
      } else {
        return visit(event.target.location.href);
      }
    }
  };

  initializeTurbolinks = function() {
    rememberCurrentUrl();
    rememberCurrentState();
    createDocument = browserCompatibleDocumentParser();
    document.addEventListener('click', installClickHandlerLast, true);
    return bypassOnLoadPopstate(function() {
      return window.addEventListener('popstate', installHistoryChangeHandler, false);
    });
  };

  historyStateIsDefined = window.history.state !== void 0 || navigator.userAgent.match(/Firefox\/2[6|7]/);

  browserSupportsPushState = window.history && window.history.pushState && window.history.replaceState && historyStateIsDefined;

  browserIsntBuggy = !navigator.userAgent.match(/CriOS\//);

  requestMethodIsSafe = (_ref = popCookie('request_method')) === 'GET' || _ref === '';

  browserSupportsTurbolinks = browserSupportsPushState && browserIsntBuggy && requestMethodIsSafe;

  browserSupportsCustomEvents = document.addEventListener && document.createEvent;

  if (browserSupportsCustomEvents) {
    installDocumentReadyPageEventTriggers();
    installJqueryAjaxSuccessPageUpdateTrigger();
  }

  if (browserSupportsTurbolinks) {
    visit = fetch;
    initializeTurbolinks();
  } else {
    visit = function(url) {
      return document.location.href = url;
    };
  }

  this.Turbolinks = {
    visit: visit,
    pagesCached: pagesCached,
    enableTransitionCache: enableTransitionCache,
    allowLinkExtensions: allowLinkExtensions,
    supported: browserSupportsTurbolinks
  };

}).call(this);

//@ sourceMappingURL=turbolinks.js.map(function() {
  window.Inputtest2 = {
    Models: {},
    Collections: {},
    Routers: {},
    Views: {}
  };

}).call(this);

//@ sourceMappingURL=inputtest2.js.map(function() {
  $('form').on('click', '.add_fields', function(event) {
    var regexp, time;
    time = new Date().getTime();
    regexp = new RegExp($(this).data('id'), 'g');
    $(this).before($(this).data('fields').replace(regexp, time));
    return event.preventDefault();
  });

}).call(this);

//@ sourceMappingURL=form_handlers.js.map(function() {


}).call(this);

//@ sourceMappingURL=main.js.map(function() {
  $(document).on('click', 'form .remove_fields', function(event) {
    $(this).prev('input[type=hidden]').val('1');
    $(this).closest('fieldset').hide();
    return event.preventDefault();
  });

  $(document).on('click', 'form .add_fields', function(event) {
    var regexp, time;
    time = new Date().getTime();
    regexp = new RegExp($(this).data('id'), 'g');
    $(this).before($(this).data('fields').replace(regexp, time));
    return event.preventDefault();
  });

}).call(this);

//@ sourceMappingURL=plugin_calls.js.map(function() {


}).call(this);

//@ sourceMappingURL=plugins.js.map(function() {


}).call(this);

//@ sourceMappingURL=recipes.js.map(function() {


}).call(this);

//@ sourceMappingURL=step_steps.js.map(function() {


}).call(this);

//@ sourceMappingURL=steps.js.map// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or vendor/assets/javascripts of plugins, if any, can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file.
//
// Read Sprockets README (https://github.com/sstephenson/sprockets#sprockets-directives) for details
// about supported directives.
//






//= require_self.


$(function() {
    $(document).foundation();
});
