(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
!function() {
  var d3 = {
    version: "3.5.17"
  };
  var d3_arraySlice = [].slice, d3_array = function(list) {
    return d3_arraySlice.call(list);
  };
  var d3_document = this.document;
  function d3_documentElement(node) {
    return node && (node.ownerDocument || node.document || node).documentElement;
  }
  function d3_window(node) {
    return node && (node.ownerDocument && node.ownerDocument.defaultView || node.document && node || node.defaultView);
  }
  if (d3_document) {
    try {
      d3_array(d3_document.documentElement.childNodes)[0].nodeType;
    } catch (e) {
      d3_array = function(list) {
        var i = list.length, array = new Array(i);
        while (i--) array[i] = list[i];
        return array;
      };
    }
  }
  if (!Date.now) Date.now = function() {
    return +new Date();
  };
  if (d3_document) {
    try {
      d3_document.createElement("DIV").style.setProperty("opacity", 0, "");
    } catch (error) {
      var d3_element_prototype = this.Element.prototype, d3_element_setAttribute = d3_element_prototype.setAttribute, d3_element_setAttributeNS = d3_element_prototype.setAttributeNS, d3_style_prototype = this.CSSStyleDeclaration.prototype, d3_style_setProperty = d3_style_prototype.setProperty;
      d3_element_prototype.setAttribute = function(name, value) {
        d3_element_setAttribute.call(this, name, value + "");
      };
      d3_element_prototype.setAttributeNS = function(space, local, value) {
        d3_element_setAttributeNS.call(this, space, local, value + "");
      };
      d3_style_prototype.setProperty = function(name, value, priority) {
        d3_style_setProperty.call(this, name, value + "", priority);
      };
    }
  }
  d3.ascending = d3_ascending;
  function d3_ascending(a, b) {
    return a < b ? -1 : a > b ? 1 : a >= b ? 0 : NaN;
  }
  d3.descending = function(a, b) {
    return b < a ? -1 : b > a ? 1 : b >= a ? 0 : NaN;
  };
  d3.min = function(array, f) {
    var i = -1, n = array.length, a, b;
    if (arguments.length === 1) {
      while (++i < n) if ((b = array[i]) != null && b >= b) {
        a = b;
        break;
      }
      while (++i < n) if ((b = array[i]) != null && a > b) a = b;
    } else {
      while (++i < n) if ((b = f.call(array, array[i], i)) != null && b >= b) {
        a = b;
        break;
      }
      while (++i < n) if ((b = f.call(array, array[i], i)) != null && a > b) a = b;
    }
    return a;
  };
  d3.max = function(array, f) {
    var i = -1, n = array.length, a, b;
    if (arguments.length === 1) {
      while (++i < n) if ((b = array[i]) != null && b >= b) {
        a = b;
        break;
      }
      while (++i < n) if ((b = array[i]) != null && b > a) a = b;
    } else {
      while (++i < n) if ((b = f.call(array, array[i], i)) != null && b >= b) {
        a = b;
        break;
      }
      while (++i < n) if ((b = f.call(array, array[i], i)) != null && b > a) a = b;
    }
    return a;
  };
  d3.extent = function(array, f) {
    var i = -1, n = array.length, a, b, c;
    if (arguments.length === 1) {
      while (++i < n) if ((b = array[i]) != null && b >= b) {
        a = c = b;
        break;
      }
      while (++i < n) if ((b = array[i]) != null) {
        if (a > b) a = b;
        if (c < b) c = b;
      }
    } else {
      while (++i < n) if ((b = f.call(array, array[i], i)) != null && b >= b) {
        a = c = b;
        break;
      }
      while (++i < n) if ((b = f.call(array, array[i], i)) != null) {
        if (a > b) a = b;
        if (c < b) c = b;
      }
    }
    return [ a, c ];
  };
  function d3_number(x) {
    return x === null ? NaN : +x;
  }
  function d3_numeric(x) {
    return !isNaN(x);
  }
  d3.sum = function(array, f) {
    var s = 0, n = array.length, a, i = -1;
    if (arguments.length === 1) {
      while (++i < n) if (d3_numeric(a = +array[i])) s += a;
    } else {
      while (++i < n) if (d3_numeric(a = +f.call(array, array[i], i))) s += a;
    }
    return s;
  };
  d3.mean = function(array, f) {
    var s = 0, n = array.length, a, i = -1, j = n;
    if (arguments.length === 1) {
      while (++i < n) if (d3_numeric(a = d3_number(array[i]))) s += a; else --j;
    } else {
      while (++i < n) if (d3_numeric(a = d3_number(f.call(array, array[i], i)))) s += a; else --j;
    }
    if (j) return s / j;
  };
  d3.quantile = function(values, p) {
    var H = (values.length - 1) * p + 1, h = Math.floor(H), v = +values[h - 1], e = H - h;
    return e ? v + e * (values[h] - v) : v;
  };
  d3.median = function(array, f) {
    var numbers = [], n = array.length, a, i = -1;
    if (arguments.length === 1) {
      while (++i < n) if (d3_numeric(a = d3_number(array[i]))) numbers.push(a);
    } else {
      while (++i < n) if (d3_numeric(a = d3_number(f.call(array, array[i], i)))) numbers.push(a);
    }
    if (numbers.length) return d3.quantile(numbers.sort(d3_ascending), .5);
  };
  d3.variance = function(array, f) {
    var n = array.length, m = 0, a, d, s = 0, i = -1, j = 0;
    if (arguments.length === 1) {
      while (++i < n) {
        if (d3_numeric(a = d3_number(array[i]))) {
          d = a - m;
          m += d / ++j;
          s += d * (a - m);
        }
      }
    } else {
      while (++i < n) {
        if (d3_numeric(a = d3_number(f.call(array, array[i], i)))) {
          d = a - m;
          m += d / ++j;
          s += d * (a - m);
        }
      }
    }
    if (j > 1) return s / (j - 1);
  };
  d3.deviation = function() {
    var v = d3.variance.apply(this, arguments);
    return v ? Math.sqrt(v) : v;
  };
  function d3_bisector(compare) {
    return {
      left: function(a, x, lo, hi) {
        if (arguments.length < 3) lo = 0;
        if (arguments.length < 4) hi = a.length;
        while (lo < hi) {
          var mid = lo + hi >>> 1;
          if (compare(a[mid], x) < 0) lo = mid + 1; else hi = mid;
        }
        return lo;
      },
      right: function(a, x, lo, hi) {
        if (arguments.length < 3) lo = 0;
        if (arguments.length < 4) hi = a.length;
        while (lo < hi) {
          var mid = lo + hi >>> 1;
          if (compare(a[mid], x) > 0) hi = mid; else lo = mid + 1;
        }
        return lo;
      }
    };
  }
  var d3_bisect = d3_bisector(d3_ascending);
  d3.bisectLeft = d3_bisect.left;
  d3.bisect = d3.bisectRight = d3_bisect.right;
  d3.bisector = function(f) {
    return d3_bisector(f.length === 1 ? function(d, x) {
      return d3_ascending(f(d), x);
    } : f);
  };
  d3.shuffle = function(array, i0, i1) {
    if ((m = arguments.length) < 3) {
      i1 = array.length;
      if (m < 2) i0 = 0;
    }
    var m = i1 - i0, t, i;
    while (m) {
      i = Math.random() * m-- | 0;
      t = array[m + i0], array[m + i0] = array[i + i0], array[i + i0] = t;
    }
    return array;
  };
  d3.permute = function(array, indexes) {
    var i = indexes.length, permutes = new Array(i);
    while (i--) permutes[i] = array[indexes[i]];
    return permutes;
  };
  d3.pairs = function(array) {
    var i = 0, n = array.length - 1, p0, p1 = array[0], pairs = new Array(n < 0 ? 0 : n);
    while (i < n) pairs[i] = [ p0 = p1, p1 = array[++i] ];
    return pairs;
  };
  d3.transpose = function(matrix) {
    if (!(n = matrix.length)) return [];
    for (var i = -1, m = d3.min(matrix, d3_transposeLength), transpose = new Array(m); ++i < m; ) {
      for (var j = -1, n, row = transpose[i] = new Array(n); ++j < n; ) {
        row[j] = matrix[j][i];
      }
    }
    return transpose;
  };
  function d3_transposeLength(d) {
    return d.length;
  }
  d3.zip = function() {
    return d3.transpose(arguments);
  };
  d3.keys = function(map) {
    var keys = [];
    for (var key in map) keys.push(key);
    return keys;
  };
  d3.values = function(map) {
    var values = [];
    for (var key in map) values.push(map[key]);
    return values;
  };
  d3.entries = function(map) {
    var entries = [];
    for (var key in map) entries.push({
      key: key,
      value: map[key]
    });
    return entries;
  };
  d3.merge = function(arrays) {
    var n = arrays.length, m, i = -1, j = 0, merged, array;
    while (++i < n) j += arrays[i].length;
    merged = new Array(j);
    while (--n >= 0) {
      array = arrays[n];
      m = array.length;
      while (--m >= 0) {
        merged[--j] = array[m];
      }
    }
    return merged;
  };
  var abs = Math.abs;
  d3.range = function(start, stop, step) {
    if (arguments.length < 3) {
      step = 1;
      if (arguments.length < 2) {
        stop = start;
        start = 0;
      }
    }
    if ((stop - start) / step === Infinity) throw new Error("infinite range");
    var range = [], k = d3_range_integerScale(abs(step)), i = -1, j;
    start *= k, stop *= k, step *= k;
    if (step < 0) while ((j = start + step * ++i) > stop) range.push(j / k); else while ((j = start + step * ++i) < stop) range.push(j / k);
    return range;
  };
  function d3_range_integerScale(x) {
    var k = 1;
    while (x * k % 1) k *= 10;
    return k;
  }
  function d3_class(ctor, properties) {
    for (var key in properties) {
      Object.defineProperty(ctor.prototype, key, {
        value: properties[key],
        enumerable: false
      });
    }
  }
  d3.map = function(object, f) {
    var map = new d3_Map();
    if (object instanceof d3_Map) {
      object.forEach(function(key, value) {
        map.set(key, value);
      });
    } else if (Array.isArray(object)) {
      var i = -1, n = object.length, o;
      if (arguments.length === 1) while (++i < n) map.set(i, object[i]); else while (++i < n) map.set(f.call(object, o = object[i], i), o);
    } else {
      for (var key in object) map.set(key, object[key]);
    }
    return map;
  };
  function d3_Map() {
    this._ = Object.create(null);
  }
  var d3_map_proto = "__proto__", d3_map_zero = "\x00";
  d3_class(d3_Map, {
    has: d3_map_has,
    get: function(key) {
      return this._[d3_map_escape(key)];
    },
    set: function(key, value) {
      return this._[d3_map_escape(key)] = value;
    },
    remove: d3_map_remove,
    keys: d3_map_keys,
    values: function() {
      var values = [];
      for (var key in this._) values.push(this._[key]);
      return values;
    },
    entries: function() {
      var entries = [];
      for (var key in this._) entries.push({
        key: d3_map_unescape(key),
        value: this._[key]
      });
      return entries;
    },
    size: d3_map_size,
    empty: d3_map_empty,
    forEach: function(f) {
      for (var key in this._) f.call(this, d3_map_unescape(key), this._[key]);
    }
  });
  function d3_map_escape(key) {
    return (key += "") === d3_map_proto || key[0] === d3_map_zero ? d3_map_zero + key : key;
  }
  function d3_map_unescape(key) {
    return (key += "")[0] === d3_map_zero ? key.slice(1) : key;
  }
  function d3_map_has(key) {
    return d3_map_escape(key) in this._;
  }
  function d3_map_remove(key) {
    return (key = d3_map_escape(key)) in this._ && delete this._[key];
  }
  function d3_map_keys() {
    var keys = [];
    for (var key in this._) keys.push(d3_map_unescape(key));
    return keys;
  }
  function d3_map_size() {
    var size = 0;
    for (var key in this._) ++size;
    return size;
  }
  function d3_map_empty() {
    for (var key in this._) return false;
    return true;
  }
  d3.nest = function() {
    var nest = {}, keys = [], sortKeys = [], sortValues, rollup;
    function map(mapType, array, depth) {
      if (depth >= keys.length) return rollup ? rollup.call(nest, array) : sortValues ? array.sort(sortValues) : array;
      var i = -1, n = array.length, key = keys[depth++], keyValue, object, setter, valuesByKey = new d3_Map(), values;
      while (++i < n) {
        if (values = valuesByKey.get(keyValue = key(object = array[i]))) {
          values.push(object);
        } else {
          valuesByKey.set(keyValue, [ object ]);
        }
      }
      if (mapType) {
        object = mapType();
        setter = function(keyValue, values) {
          object.set(keyValue, map(mapType, values, depth));
        };
      } else {
        object = {};
        setter = function(keyValue, values) {
          object[keyValue] = map(mapType, values, depth);
        };
      }
      valuesByKey.forEach(setter);
      return object;
    }
    function entries(map, depth) {
      if (depth >= keys.length) return map;
      var array = [], sortKey = sortKeys[depth++];
      map.forEach(function(key, keyMap) {
        array.push({
          key: key,
          values: entries(keyMap, depth)
        });
      });
      return sortKey ? array.sort(function(a, b) {
        return sortKey(a.key, b.key);
      }) : array;
    }
    nest.map = function(array, mapType) {
      return map(mapType, array, 0);
    };
    nest.entries = function(array) {
      return entries(map(d3.map, array, 0), 0);
    };
    nest.key = function(d) {
      keys.push(d);
      return nest;
    };
    nest.sortKeys = function(order) {
      sortKeys[keys.length - 1] = order;
      return nest;
    };
    nest.sortValues = function(order) {
      sortValues = order;
      return nest;
    };
    nest.rollup = function(f) {
      rollup = f;
      return nest;
    };
    return nest;
  };
  d3.set = function(array) {
    var set = new d3_Set();
    if (array) for (var i = 0, n = array.length; i < n; ++i) set.add(array[i]);
    return set;
  };
  function d3_Set() {
    this._ = Object.create(null);
  }
  d3_class(d3_Set, {
    has: d3_map_has,
    add: function(key) {
      this._[d3_map_escape(key += "")] = true;
      return key;
    },
    remove: d3_map_remove,
    values: d3_map_keys,
    size: d3_map_size,
    empty: d3_map_empty,
    forEach: function(f) {
      for (var key in this._) f.call(this, d3_map_unescape(key));
    }
  });
  d3.behavior = {};
  function d3_identity(d) {
    return d;
  }
  d3.rebind = function(target, source) {
    var i = 1, n = arguments.length, method;
    while (++i < n) target[method = arguments[i]] = d3_rebind(target, source, source[method]);
    return target;
  };
  function d3_rebind(target, source, method) {
    return function() {
      var value = method.apply(source, arguments);
      return value === source ? target : value;
    };
  }
  function d3_vendorSymbol(object, name) {
    if (name in object) return name;
    name = name.charAt(0).toUpperCase() + name.slice(1);
    for (var i = 0, n = d3_vendorPrefixes.length; i < n; ++i) {
      var prefixName = d3_vendorPrefixes[i] + name;
      if (prefixName in object) return prefixName;
    }
  }
  var d3_vendorPrefixes = [ "webkit", "ms", "moz", "Moz", "o", "O" ];
  function d3_noop() {}
  d3.dispatch = function() {
    var dispatch = new d3_dispatch(), i = -1, n = arguments.length;
    while (++i < n) dispatch[arguments[i]] = d3_dispatch_event(dispatch);
    return dispatch;
  };
  function d3_dispatch() {}
  d3_dispatch.prototype.on = function(type, listener) {
    var i = type.indexOf("."), name = "";
    if (i >= 0) {
      name = type.slice(i + 1);
      type = type.slice(0, i);
    }
    if (type) return arguments.length < 2 ? this[type].on(name) : this[type].on(name, listener);
    if (arguments.length === 2) {
      if (listener == null) for (type in this) {
        if (this.hasOwnProperty(type)) this[type].on(name, null);
      }
      return this;
    }
  };
  function d3_dispatch_event(dispatch) {
    var listeners = [], listenerByName = new d3_Map();
    function event() {
      var z = listeners, i = -1, n = z.length, l;
      while (++i < n) if (l = z[i].on) l.apply(this, arguments);
      return dispatch;
    }
    event.on = function(name, listener) {
      var l = listenerByName.get(name), i;
      if (arguments.length < 2) return l && l.on;
      if (l) {
        l.on = null;
        listeners = listeners.slice(0, i = listeners.indexOf(l)).concat(listeners.slice(i + 1));
        listenerByName.remove(name);
      }
      if (listener) listeners.push(listenerByName.set(name, {
        on: listener
      }));
      return dispatch;
    };
    return event;
  }
  d3.event = null;
  function d3_eventPreventDefault() {
    d3.event.preventDefault();
  }
  function d3_eventSource() {
    var e = d3.event, s;
    while (s = e.sourceEvent) e = s;
    return e;
  }
  function d3_eventDispatch(target) {
    var dispatch = new d3_dispatch(), i = 0, n = arguments.length;
    while (++i < n) dispatch[arguments[i]] = d3_dispatch_event(dispatch);
    dispatch.of = function(thiz, argumentz) {
      return function(e1) {
        try {
          var e0 = e1.sourceEvent = d3.event;
          e1.target = target;
          d3.event = e1;
          dispatch[e1.type].apply(thiz, argumentz);
        } finally {
          d3.event = e0;
        }
      };
    };
    return dispatch;
  }
  d3.requote = function(s) {
    return s.replace(d3_requote_re, "\\$&");
  };
  var d3_requote_re = /[\\\^\$\*\+\?\|\[\]\(\)\.\{\}]/g;
  var d3_subclass = {}.__proto__ ? function(object, prototype) {
    object.__proto__ = prototype;
  } : function(object, prototype) {
    for (var property in prototype) object[property] = prototype[property];
  };
  function d3_selection(groups) {
    d3_subclass(groups, d3_selectionPrototype);
    return groups;
  }
  var d3_select = function(s, n) {
    return n.querySelector(s);
  }, d3_selectAll = function(s, n) {
    return n.querySelectorAll(s);
  }, d3_selectMatches = function(n, s) {
    var d3_selectMatcher = n.matches || n[d3_vendorSymbol(n, "matchesSelector")];
    d3_selectMatches = function(n, s) {
      return d3_selectMatcher.call(n, s);
    };
    return d3_selectMatches(n, s);
  };
  if (typeof Sizzle === "function") {
    d3_select = function(s, n) {
      return Sizzle(s, n)[0] || null;
    };
    d3_selectAll = Sizzle;
    d3_selectMatches = Sizzle.matchesSelector;
  }
  d3.selection = function() {
    return d3.select(d3_document.documentElement);
  };
  var d3_selectionPrototype = d3.selection.prototype = [];
  d3_selectionPrototype.select = function(selector) {
    var subgroups = [], subgroup, subnode, group, node;
    selector = d3_selection_selector(selector);
    for (var j = -1, m = this.length; ++j < m; ) {
      subgroups.push(subgroup = []);
      subgroup.parentNode = (group = this[j]).parentNode;
      for (var i = -1, n = group.length; ++i < n; ) {
        if (node = group[i]) {
          subgroup.push(subnode = selector.call(node, node.__data__, i, j));
          if (subnode && "__data__" in node) subnode.__data__ = node.__data__;
        } else {
          subgroup.push(null);
        }
      }
    }
    return d3_selection(subgroups);
  };
  function d3_selection_selector(selector) {
    return typeof selector === "function" ? selector : function() {
      return d3_select(selector, this);
    };
  }
  d3_selectionPrototype.selectAll = function(selector) {
    var subgroups = [], subgroup, node;
    selector = d3_selection_selectorAll(selector);
    for (var j = -1, m = this.length; ++j < m; ) {
      for (var group = this[j], i = -1, n = group.length; ++i < n; ) {
        if (node = group[i]) {
          subgroups.push(subgroup = d3_array(selector.call(node, node.__data__, i, j)));
          subgroup.parentNode = node;
        }
      }
    }
    return d3_selection(subgroups);
  };
  function d3_selection_selectorAll(selector) {
    return typeof selector === "function" ? selector : function() {
      return d3_selectAll(selector, this);
    };
  }
  var d3_nsXhtml = "http://www.w3.org/1999/xhtml";
  var d3_nsPrefix = {
    svg: "http://www.w3.org/2000/svg",
    xhtml: d3_nsXhtml,
    xlink: "http://www.w3.org/1999/xlink",
    xml: "http://www.w3.org/XML/1998/namespace",
    xmlns: "http://www.w3.org/2000/xmlns/"
  };
  d3.ns = {
    prefix: d3_nsPrefix,
    qualify: function(name) {
      var i = name.indexOf(":"), prefix = name;
      if (i >= 0 && (prefix = name.slice(0, i)) !== "xmlns") name = name.slice(i + 1);
      return d3_nsPrefix.hasOwnProperty(prefix) ? {
        space: d3_nsPrefix[prefix],
        local: name
      } : name;
    }
  };
  d3_selectionPrototype.attr = function(name, value) {
    if (arguments.length < 2) {
      if (typeof name === "string") {
        var node = this.node();
        name = d3.ns.qualify(name);
        return name.local ? node.getAttributeNS(name.space, name.local) : node.getAttribute(name);
      }
      for (value in name) this.each(d3_selection_attr(value, name[value]));
      return this;
    }
    return this.each(d3_selection_attr(name, value));
  };
  function d3_selection_attr(name, value) {
    name = d3.ns.qualify(name);
    function attrNull() {
      this.removeAttribute(name);
    }
    function attrNullNS() {
      this.removeAttributeNS(name.space, name.local);
    }
    function attrConstant() {
      this.setAttribute(name, value);
    }
    function attrConstantNS() {
      this.setAttributeNS(name.space, name.local, value);
    }
    function attrFunction() {
      var x = value.apply(this, arguments);
      if (x == null) this.removeAttribute(name); else this.setAttribute(name, x);
    }
    function attrFunctionNS() {
      var x = value.apply(this, arguments);
      if (x == null) this.removeAttributeNS(name.space, name.local); else this.setAttributeNS(name.space, name.local, x);
    }
    return value == null ? name.local ? attrNullNS : attrNull : typeof value === "function" ? name.local ? attrFunctionNS : attrFunction : name.local ? attrConstantNS : attrConstant;
  }
  function d3_collapse(s) {
    return s.trim().replace(/\s+/g, " ");
  }
  d3_selectionPrototype.classed = function(name, value) {
    if (arguments.length < 2) {
      if (typeof name === "string") {
        var node = this.node(), n = (name = d3_selection_classes(name)).length, i = -1;
        if (value = node.classList) {
          while (++i < n) if (!value.contains(name[i])) return false;
        } else {
          value = node.getAttribute("class");
          while (++i < n) if (!d3_selection_classedRe(name[i]).test(value)) return false;
        }
        return true;
      }
      for (value in name) this.each(d3_selection_classed(value, name[value]));
      return this;
    }
    return this.each(d3_selection_classed(name, value));
  };
  function d3_selection_classedRe(name) {
    return new RegExp("(?:^|\\s+)" + d3.requote(name) + "(?:\\s+|$)", "g");
  }
  function d3_selection_classes(name) {
    return (name + "").trim().split(/^|\s+/);
  }
  function d3_selection_classed(name, value) {
    name = d3_selection_classes(name).map(d3_selection_classedName);
    var n = name.length;
    function classedConstant() {
      var i = -1;
      while (++i < n) name[i](this, value);
    }
    function classedFunction() {
      var i = -1, x = value.apply(this, arguments);
      while (++i < n) name[i](this, x);
    }
    return typeof value === "function" ? classedFunction : classedConstant;
  }
  function d3_selection_classedName(name) {
    var re = d3_selection_classedRe(name);
    return function(node, value) {
      if (c = node.classList) return value ? c.add(name) : c.remove(name);
      var c = node.getAttribute("class") || "";
      if (value) {
        re.lastIndex = 0;
        if (!re.test(c)) node.setAttribute("class", d3_collapse(c + " " + name));
      } else {
        node.setAttribute("class", d3_collapse(c.replace(re, " ")));
      }
    };
  }
  d3_selectionPrototype.style = function(name, value, priority) {
    var n = arguments.length;
    if (n < 3) {
      if (typeof name !== "string") {
        if (n < 2) value = "";
        for (priority in name) this.each(d3_selection_style(priority, name[priority], value));
        return this;
      }
      if (n < 2) {
        var node = this.node();
        return d3_window(node).getComputedStyle(node, null).getPropertyValue(name);
      }
      priority = "";
    }
    return this.each(d3_selection_style(name, value, priority));
  };
  function d3_selection_style(name, value, priority) {
    function styleNull() {
      this.style.removeProperty(name);
    }
    function styleConstant() {
      this.style.setProperty(name, value, priority);
    }
    function styleFunction() {
      var x = value.apply(this, arguments);
      if (x == null) this.style.removeProperty(name); else this.style.setProperty(name, x, priority);
    }
    return value == null ? styleNull : typeof value === "function" ? styleFunction : styleConstant;
  }
  d3_selectionPrototype.property = function(name, value) {
    if (arguments.length < 2) {
      if (typeof name === "string") return this.node()[name];
      for (value in name) this.each(d3_selection_property(value, name[value]));
      return this;
    }
    return this.each(d3_selection_property(name, value));
  };
  function d3_selection_property(name, value) {
    function propertyNull() {
      delete this[name];
    }
    function propertyConstant() {
      this[name] = value;
    }
    function propertyFunction() {
      var x = value.apply(this, arguments);
      if (x == null) delete this[name]; else this[name] = x;
    }
    return value == null ? propertyNull : typeof value === "function" ? propertyFunction : propertyConstant;
  }
  d3_selectionPrototype.text = function(value) {
    return arguments.length ? this.each(typeof value === "function" ? function() {
      var v = value.apply(this, arguments);
      this.textContent = v == null ? "" : v;
    } : value == null ? function() {
      this.textContent = "";
    } : function() {
      this.textContent = value;
    }) : this.node().textContent;
  };
  d3_selectionPrototype.html = function(value) {
    return arguments.length ? this.each(typeof value === "function" ? function() {
      var v = value.apply(this, arguments);
      this.innerHTML = v == null ? "" : v;
    } : value == null ? function() {
      this.innerHTML = "";
    } : function() {
      this.innerHTML = value;
    }) : this.node().innerHTML;
  };
  d3_selectionPrototype.append = function(name) {
    name = d3_selection_creator(name);
    return this.select(function() {
      return this.appendChild(name.apply(this, arguments));
    });
  };
  function d3_selection_creator(name) {
    function create() {
      var document = this.ownerDocument, namespace = this.namespaceURI;
      return namespace === d3_nsXhtml && document.documentElement.namespaceURI === d3_nsXhtml ? document.createElement(name) : document.createElementNS(namespace, name);
    }
    function createNS() {
      return this.ownerDocument.createElementNS(name.space, name.local);
    }
    return typeof name === "function" ? name : (name = d3.ns.qualify(name)).local ? createNS : create;
  }
  d3_selectionPrototype.insert = function(name, before) {
    name = d3_selection_creator(name);
    before = d3_selection_selector(before);
    return this.select(function() {
      return this.insertBefore(name.apply(this, arguments), before.apply(this, arguments) || null);
    });
  };
  d3_selectionPrototype.remove = function() {
    return this.each(d3_selectionRemove);
  };
  function d3_selectionRemove() {
    var parent = this.parentNode;
    if (parent) parent.removeChild(this);
  }
  d3_selectionPrototype.data = function(value, key) {
    var i = -1, n = this.length, group, node;
    if (!arguments.length) {
      value = new Array(n = (group = this[0]).length);
      while (++i < n) {
        if (node = group[i]) {
          value[i] = node.__data__;
        }
      }
      return value;
    }
    function bind(group, groupData) {
      var i, n = group.length, m = groupData.length, n0 = Math.min(n, m), updateNodes = new Array(m), enterNodes = new Array(m), exitNodes = new Array(n), node, nodeData;
      if (key) {
        var nodeByKeyValue = new d3_Map(), keyValues = new Array(n), keyValue;
        for (i = -1; ++i < n; ) {
          if (node = group[i]) {
            if (nodeByKeyValue.has(keyValue = key.call(node, node.__data__, i))) {
              exitNodes[i] = node;
            } else {
              nodeByKeyValue.set(keyValue, node);
            }
            keyValues[i] = keyValue;
          }
        }
        for (i = -1; ++i < m; ) {
          if (!(node = nodeByKeyValue.get(keyValue = key.call(groupData, nodeData = groupData[i], i)))) {
            enterNodes[i] = d3_selection_dataNode(nodeData);
          } else if (node !== true) {
            updateNodes[i] = node;
            node.__data__ = nodeData;
          }
          nodeByKeyValue.set(keyValue, true);
        }
        for (i = -1; ++i < n; ) {
          if (i in keyValues && nodeByKeyValue.get(keyValues[i]) !== true) {
            exitNodes[i] = group[i];
          }
        }
      } else {
        for (i = -1; ++i < n0; ) {
          node = group[i];
          nodeData = groupData[i];
          if (node) {
            node.__data__ = nodeData;
            updateNodes[i] = node;
          } else {
            enterNodes[i] = d3_selection_dataNode(nodeData);
          }
        }
        for (;i < m; ++i) {
          enterNodes[i] = d3_selection_dataNode(groupData[i]);
        }
        for (;i < n; ++i) {
          exitNodes[i] = group[i];
        }
      }
      enterNodes.update = updateNodes;
      enterNodes.parentNode = updateNodes.parentNode = exitNodes.parentNode = group.parentNode;
      enter.push(enterNodes);
      update.push(updateNodes);
      exit.push(exitNodes);
    }
    var enter = d3_selection_enter([]), update = d3_selection([]), exit = d3_selection([]);
    if (typeof value === "function") {
      while (++i < n) {
        bind(group = this[i], value.call(group, group.parentNode.__data__, i));
      }
    } else {
      while (++i < n) {
        bind(group = this[i], value);
      }
    }
    update.enter = function() {
      return enter;
    };
    update.exit = function() {
      return exit;
    };
    return update;
  };
  function d3_selection_dataNode(data) {
    return {
      __data__: data
    };
  }
  d3_selectionPrototype.datum = function(value) {
    return arguments.length ? this.property("__data__", value) : this.property("__data__");
  };
  d3_selectionPrototype.filter = function(filter) {
    var subgroups = [], subgroup, group, node;
    if (typeof filter !== "function") filter = d3_selection_filter(filter);
    for (var j = 0, m = this.length; j < m; j++) {
      subgroups.push(subgroup = []);
      subgroup.parentNode = (group = this[j]).parentNode;
      for (var i = 0, n = group.length; i < n; i++) {
        if ((node = group[i]) && filter.call(node, node.__data__, i, j)) {
          subgroup.push(node);
        }
      }
    }
    return d3_selection(subgroups);
  };
  function d3_selection_filter(selector) {
    return function() {
      return d3_selectMatches(this, selector);
    };
  }
  d3_selectionPrototype.order = function() {
    for (var j = -1, m = this.length; ++j < m; ) {
      for (var group = this[j], i = group.length - 1, next = group[i], node; --i >= 0; ) {
        if (node = group[i]) {
          if (next && next !== node.nextSibling) next.parentNode.insertBefore(node, next);
          next = node;
        }
      }
    }
    return this;
  };
  d3_selectionPrototype.sort = function(comparator) {
    comparator = d3_selection_sortComparator.apply(this, arguments);
    for (var j = -1, m = this.length; ++j < m; ) this[j].sort(comparator);
    return this.order();
  };
  function d3_selection_sortComparator(comparator) {
    if (!arguments.length) comparator = d3_ascending;
    return function(a, b) {
      return a && b ? comparator(a.__data__, b.__data__) : !a - !b;
    };
  }
  d3_selectionPrototype.each = function(callback) {
    return d3_selection_each(this, function(node, i, j) {
      callback.call(node, node.__data__, i, j);
    });
  };
  function d3_selection_each(groups, callback) {
    for (var j = 0, m = groups.length; j < m; j++) {
      for (var group = groups[j], i = 0, n = group.length, node; i < n; i++) {
        if (node = group[i]) callback(node, i, j);
      }
    }
    return groups;
  }
  d3_selectionPrototype.call = function(callback) {
    var args = d3_array(arguments);
    callback.apply(args[0] = this, args);
    return this;
  };
  d3_selectionPrototype.empty = function() {
    return !this.node();
  };
  d3_selectionPrototype.node = function() {
    for (var j = 0, m = this.length; j < m; j++) {
      for (var group = this[j], i = 0, n = group.length; i < n; i++) {
        var node = group[i];
        if (node) return node;
      }
    }
    return null;
  };
  d3_selectionPrototype.size = function() {
    var n = 0;
    d3_selection_each(this, function() {
      ++n;
    });
    return n;
  };
  function d3_selection_enter(selection) {
    d3_subclass(selection, d3_selection_enterPrototype);
    return selection;
  }
  var d3_selection_enterPrototype = [];
  d3.selection.enter = d3_selection_enter;
  d3.selection.enter.prototype = d3_selection_enterPrototype;
  d3_selection_enterPrototype.append = d3_selectionPrototype.append;
  d3_selection_enterPrototype.empty = d3_selectionPrototype.empty;
  d3_selection_enterPrototype.node = d3_selectionPrototype.node;
  d3_selection_enterPrototype.call = d3_selectionPrototype.call;
  d3_selection_enterPrototype.size = d3_selectionPrototype.size;
  d3_selection_enterPrototype.select = function(selector) {
    var subgroups = [], subgroup, subnode, upgroup, group, node;
    for (var j = -1, m = this.length; ++j < m; ) {
      upgroup = (group = this[j]).update;
      subgroups.push(subgroup = []);
      subgroup.parentNode = group.parentNode;
      for (var i = -1, n = group.length; ++i < n; ) {
        if (node = group[i]) {
          subgroup.push(upgroup[i] = subnode = selector.call(group.parentNode, node.__data__, i, j));
          subnode.__data__ = node.__data__;
        } else {
          subgroup.push(null);
        }
      }
    }
    return d3_selection(subgroups);
  };
  d3_selection_enterPrototype.insert = function(name, before) {
    if (arguments.length < 2) before = d3_selection_enterInsertBefore(this);
    return d3_selectionPrototype.insert.call(this, name, before);
  };
  function d3_selection_enterInsertBefore(enter) {
    var i0, j0;
    return function(d, i, j) {
      var group = enter[j].update, n = group.length, node;
      if (j != j0) j0 = j, i0 = 0;
      if (i >= i0) i0 = i + 1;
      while (!(node = group[i0]) && ++i0 < n) ;
      return node;
    };
  }
  d3.select = function(node) {
    var group;
    if (typeof node === "string") {
      group = [ d3_select(node, d3_document) ];
      group.parentNode = d3_document.documentElement;
    } else {
      group = [ node ];
      group.parentNode = d3_documentElement(node);
    }
    return d3_selection([ group ]);
  };
  d3.selectAll = function(nodes) {
    var group;
    if (typeof nodes === "string") {
      group = d3_array(d3_selectAll(nodes, d3_document));
      group.parentNode = d3_document.documentElement;
    } else {
      group = d3_array(nodes);
      group.parentNode = null;
    }
    return d3_selection([ group ]);
  };
  d3_selectionPrototype.on = function(type, listener, capture) {
    var n = arguments.length;
    if (n < 3) {
      if (typeof type !== "string") {
        if (n < 2) listener = false;
        for (capture in type) this.each(d3_selection_on(capture, type[capture], listener));
        return this;
      }
      if (n < 2) return (n = this.node()["__on" + type]) && n._;
      capture = false;
    }
    return this.each(d3_selection_on(type, listener, capture));
  };
  function d3_selection_on(type, listener, capture) {
    var name = "__on" + type, i = type.indexOf("."), wrap = d3_selection_onListener;
    if (i > 0) type = type.slice(0, i);
    var filter = d3_selection_onFilters.get(type);
    if (filter) type = filter, wrap = d3_selection_onFilter;
    function onRemove() {
      var l = this[name];
      if (l) {
        this.removeEventListener(type, l, l.$);
        delete this[name];
      }
    }
    function onAdd() {
      var l = wrap(listener, d3_array(arguments));
      onRemove.call(this);
      this.addEventListener(type, this[name] = l, l.$ = capture);
      l._ = listener;
    }
    function removeAll() {
      var re = new RegExp("^__on([^.]+)" + d3.requote(type) + "$"), match;
      for (var name in this) {
        if (match = name.match(re)) {
          var l = this[name];
          this.removeEventListener(match[1], l, l.$);
          delete this[name];
        }
      }
    }
    return i ? listener ? onAdd : onRemove : listener ? d3_noop : removeAll;
  }
  var d3_selection_onFilters = d3.map({
    mouseenter: "mouseover",
    mouseleave: "mouseout"
  });
  if (d3_document) {
    d3_selection_onFilters.forEach(function(k) {
      if ("on" + k in d3_document) d3_selection_onFilters.remove(k);
    });
  }
  function d3_selection_onListener(listener, argumentz) {
    return function(e) {
      var o = d3.event;
      d3.event = e;
      argumentz[0] = this.__data__;
      try {
        listener.apply(this, argumentz);
      } finally {
        d3.event = o;
      }
    };
  }
  function d3_selection_onFilter(listener, argumentz) {
    var l = d3_selection_onListener(listener, argumentz);
    return function(e) {
      var target = this, related = e.relatedTarget;
      if (!related || related !== target && !(related.compareDocumentPosition(target) & 8)) {
        l.call(target, e);
      }
    };
  }
  var d3_event_dragSelect, d3_event_dragId = 0;
  function d3_event_dragSuppress(node) {
    var name = ".dragsuppress-" + ++d3_event_dragId, click = "click" + name, w = d3.select(d3_window(node)).on("touchmove" + name, d3_eventPreventDefault).on("dragstart" + name, d3_eventPreventDefault).on("selectstart" + name, d3_eventPreventDefault);
    if (d3_event_dragSelect == null) {
      d3_event_dragSelect = "onselectstart" in node ? false : d3_vendorSymbol(node.style, "userSelect");
    }
    if (d3_event_dragSelect) {
      var style = d3_documentElement(node).style, select = style[d3_event_dragSelect];
      style[d3_event_dragSelect] = "none";
    }
    return function(suppressClick) {
      w.on(name, null);
      if (d3_event_dragSelect) style[d3_event_dragSelect] = select;
      if (suppressClick) {
        var off = function() {
          w.on(click, null);
        };
        w.on(click, function() {
          d3_eventPreventDefault();
          off();
        }, true);
        setTimeout(off, 0);
      }
    };
  }
  d3.mouse = function(container) {
    return d3_mousePoint(container, d3_eventSource());
  };
  var d3_mouse_bug44083 = this.navigator && /WebKit/.test(this.navigator.userAgent) ? -1 : 0;
  function d3_mousePoint(container, e) {
    if (e.changedTouches) e = e.changedTouches[0];
    var svg = container.ownerSVGElement || container;
    if (svg.createSVGPoint) {
      var point = svg.createSVGPoint();
      if (d3_mouse_bug44083 < 0) {
        var window = d3_window(container);
        if (window.scrollX || window.scrollY) {
          svg = d3.select("body").append("svg").style({
            position: "absolute",
            top: 0,
            left: 0,
            margin: 0,
            padding: 0,
            border: "none"
          }, "important");
          var ctm = svg[0][0].getScreenCTM();
          d3_mouse_bug44083 = !(ctm.f || ctm.e);
          svg.remove();
        }
      }
      if (d3_mouse_bug44083) point.x = e.pageX, point.y = e.pageY; else point.x = e.clientX, 
      point.y = e.clientY;
      point = point.matrixTransform(container.getScreenCTM().inverse());
      return [ point.x, point.y ];
    }
    var rect = container.getBoundingClientRect();
    return [ e.clientX - rect.left - container.clientLeft, e.clientY - rect.top - container.clientTop ];
  }
  d3.touch = function(container, touches, identifier) {
    if (arguments.length < 3) identifier = touches, touches = d3_eventSource().changedTouches;
    if (touches) for (var i = 0, n = touches.length, touch; i < n; ++i) {
      if ((touch = touches[i]).identifier === identifier) {
        return d3_mousePoint(container, touch);
      }
    }
  };
  d3.behavior.drag = function() {
    var event = d3_eventDispatch(drag, "drag", "dragstart", "dragend"), origin = null, mousedown = dragstart(d3_noop, d3.mouse, d3_window, "mousemove", "mouseup"), touchstart = dragstart(d3_behavior_dragTouchId, d3.touch, d3_identity, "touchmove", "touchend");
    function drag() {
      this.on("mousedown.drag", mousedown).on("touchstart.drag", touchstart);
    }
    function dragstart(id, position, subject, move, end) {
      return function() {
        var that = this, target = d3.event.target.correspondingElement || d3.event.target, parent = that.parentNode, dispatch = event.of(that, arguments), dragged = 0, dragId = id(), dragName = ".drag" + (dragId == null ? "" : "-" + dragId), dragOffset, dragSubject = d3.select(subject(target)).on(move + dragName, moved).on(end + dragName, ended), dragRestore = d3_event_dragSuppress(target), position0 = position(parent, dragId);
        if (origin) {
          dragOffset = origin.apply(that, arguments);
          dragOffset = [ dragOffset.x - position0[0], dragOffset.y - position0[1] ];
        } else {
          dragOffset = [ 0, 0 ];
        }
        dispatch({
          type: "dragstart"
        });
        function moved() {
          var position1 = position(parent, dragId), dx, dy;
          if (!position1) return;
          dx = position1[0] - position0[0];
          dy = position1[1] - position0[1];
          dragged |= dx | dy;
          position0 = position1;
          dispatch({
            type: "drag",
            x: position1[0] + dragOffset[0],
            y: position1[1] + dragOffset[1],
            dx: dx,
            dy: dy
          });
        }
        function ended() {
          if (!position(parent, dragId)) return;
          dragSubject.on(move + dragName, null).on(end + dragName, null);
          dragRestore(dragged);
          dispatch({
            type: "dragend"
          });
        }
      };
    }
    drag.origin = function(x) {
      if (!arguments.length) return origin;
      origin = x;
      return drag;
    };
    return d3.rebind(drag, event, "on");
  };
  function d3_behavior_dragTouchId() {
    return d3.event.changedTouches[0].identifier;
  }
  d3.touches = function(container, touches) {
    if (arguments.length < 2) touches = d3_eventSource().touches;
    return touches ? d3_array(touches).map(function(touch) {
      var point = d3_mousePoint(container, touch);
      point.identifier = touch.identifier;
      return point;
    }) : [];
  };
  var ε = 1e-6, ε2 = ε * ε, π = Math.PI, τ = 2 * π, τε = τ - ε, halfπ = π / 2, d3_radians = π / 180, d3_degrees = 180 / π;
  function d3_sgn(x) {
    return x > 0 ? 1 : x < 0 ? -1 : 0;
  }
  function d3_cross2d(a, b, c) {
    return (b[0] - a[0]) * (c[1] - a[1]) - (b[1] - a[1]) * (c[0] - a[0]);
  }
  function d3_acos(x) {
    return x > 1 ? 0 : x < -1 ? π : Math.acos(x);
  }
  function d3_asin(x) {
    return x > 1 ? halfπ : x < -1 ? -halfπ : Math.asin(x);
  }
  function d3_sinh(x) {
    return ((x = Math.exp(x)) - 1 / x) / 2;
  }
  function d3_cosh(x) {
    return ((x = Math.exp(x)) + 1 / x) / 2;
  }
  function d3_tanh(x) {
    return ((x = Math.exp(2 * x)) - 1) / (x + 1);
  }
  function d3_haversin(x) {
    return (x = Math.sin(x / 2)) * x;
  }
  var ρ = Math.SQRT2, ρ2 = 2, ρ4 = 4;
  d3.interpolateZoom = function(p0, p1) {
    var ux0 = p0[0], uy0 = p0[1], w0 = p0[2], ux1 = p1[0], uy1 = p1[1], w1 = p1[2], dx = ux1 - ux0, dy = uy1 - uy0, d2 = dx * dx + dy * dy, i, S;
    if (d2 < ε2) {
      S = Math.log(w1 / w0) / ρ;
      i = function(t) {
        return [ ux0 + t * dx, uy0 + t * dy, w0 * Math.exp(ρ * t * S) ];
      };
    } else {
      var d1 = Math.sqrt(d2), b0 = (w1 * w1 - w0 * w0 + ρ4 * d2) / (2 * w0 * ρ2 * d1), b1 = (w1 * w1 - w0 * w0 - ρ4 * d2) / (2 * w1 * ρ2 * d1), r0 = Math.log(Math.sqrt(b0 * b0 + 1) - b0), r1 = Math.log(Math.sqrt(b1 * b1 + 1) - b1);
      S = (r1 - r0) / ρ;
      i = function(t) {
        var s = t * S, coshr0 = d3_cosh(r0), u = w0 / (ρ2 * d1) * (coshr0 * d3_tanh(ρ * s + r0) - d3_sinh(r0));
        return [ ux0 + u * dx, uy0 + u * dy, w0 * coshr0 / d3_cosh(ρ * s + r0) ];
      };
    }
    i.duration = S * 1e3;
    return i;
  };
  d3.behavior.zoom = function() {
    var view = {
      x: 0,
      y: 0,
      k: 1
    }, translate0, center0, center, size = [ 960, 500 ], scaleExtent = d3_behavior_zoomInfinity, duration = 250, zooming = 0, mousedown = "mousedown.zoom", mousemove = "mousemove.zoom", mouseup = "mouseup.zoom", mousewheelTimer, touchstart = "touchstart.zoom", touchtime, event = d3_eventDispatch(zoom, "zoomstart", "zoom", "zoomend"), x0, x1, y0, y1;
    if (!d3_behavior_zoomWheel) {
      d3_behavior_zoomWheel = "onwheel" in d3_document ? (d3_behavior_zoomDelta = function() {
        return -d3.event.deltaY * (d3.event.deltaMode ? 120 : 1);
      }, "wheel") : "onmousewheel" in d3_document ? (d3_behavior_zoomDelta = function() {
        return d3.event.wheelDelta;
      }, "mousewheel") : (d3_behavior_zoomDelta = function() {
        return -d3.event.detail;
      }, "MozMousePixelScroll");
    }
    function zoom(g) {
      g.on(mousedown, mousedowned).on(d3_behavior_zoomWheel + ".zoom", mousewheeled).on("dblclick.zoom", dblclicked).on(touchstart, touchstarted);
    }
    zoom.event = function(g) {
      g.each(function() {
        var dispatch = event.of(this, arguments), view1 = view;
        if (d3_transitionInheritId) {
          d3.select(this).transition().each("start.zoom", function() {
            view = this.__chart__ || {
              x: 0,
              y: 0,
              k: 1
            };
            zoomstarted(dispatch);
          }).tween("zoom:zoom", function() {
            var dx = size[0], dy = size[1], cx = center0 ? center0[0] : dx / 2, cy = center0 ? center0[1] : dy / 2, i = d3.interpolateZoom([ (cx - view.x) / view.k, (cy - view.y) / view.k, dx / view.k ], [ (cx - view1.x) / view1.k, (cy - view1.y) / view1.k, dx / view1.k ]);
            return function(t) {
              var l = i(t), k = dx / l[2];
              this.__chart__ = view = {
                x: cx - l[0] * k,
                y: cy - l[1] * k,
                k: k
              };
              zoomed(dispatch);
            };
          }).each("interrupt.zoom", function() {
            zoomended(dispatch);
          }).each("end.zoom", function() {
            zoomended(dispatch);
          });
        } else {
          this.__chart__ = view;
          zoomstarted(dispatch);
          zoomed(dispatch);
          zoomended(dispatch);
        }
      });
    };
    zoom.translate = function(_) {
      if (!arguments.length) return [ view.x, view.y ];
      view = {
        x: +_[0],
        y: +_[1],
        k: view.k
      };
      rescale();
      return zoom;
    };
    zoom.scale = function(_) {
      if (!arguments.length) return view.k;
      view = {
        x: view.x,
        y: view.y,
        k: null
      };
      scaleTo(+_);
      rescale();
      return zoom;
    };
    zoom.scaleExtent = function(_) {
      if (!arguments.length) return scaleExtent;
      scaleExtent = _ == null ? d3_behavior_zoomInfinity : [ +_[0], +_[1] ];
      return zoom;
    };
    zoom.center = function(_) {
      if (!arguments.length) return center;
      center = _ && [ +_[0], +_[1] ];
      return zoom;
    };
    zoom.size = function(_) {
      if (!arguments.length) return size;
      size = _ && [ +_[0], +_[1] ];
      return zoom;
    };
    zoom.duration = function(_) {
      if (!arguments.length) return duration;
      duration = +_;
      return zoom;
    };
    zoom.x = function(z) {
      if (!arguments.length) return x1;
      x1 = z;
      x0 = z.copy();
      view = {
        x: 0,
        y: 0,
        k: 1
      };
      return zoom;
    };
    zoom.y = function(z) {
      if (!arguments.length) return y1;
      y1 = z;
      y0 = z.copy();
      view = {
        x: 0,
        y: 0,
        k: 1
      };
      return zoom;
    };
    function location(p) {
      return [ (p[0] - view.x) / view.k, (p[1] - view.y) / view.k ];
    }
    function point(l) {
      return [ l[0] * view.k + view.x, l[1] * view.k + view.y ];
    }
    function scaleTo(s) {
      view.k = Math.max(scaleExtent[0], Math.min(scaleExtent[1], s));
    }
    function translateTo(p, l) {
      l = point(l);
      view.x += p[0] - l[0];
      view.y += p[1] - l[1];
    }
    function zoomTo(that, p, l, k) {
      that.__chart__ = {
        x: view.x,
        y: view.y,
        k: view.k
      };
      scaleTo(Math.pow(2, k));
      translateTo(center0 = p, l);
      that = d3.select(that);
      if (duration > 0) that = that.transition().duration(duration);
      that.call(zoom.event);
    }
    function rescale() {
      if (x1) x1.domain(x0.range().map(function(x) {
        return (x - view.x) / view.k;
      }).map(x0.invert));
      if (y1) y1.domain(y0.range().map(function(y) {
        return (y - view.y) / view.k;
      }).map(y0.invert));
    }
    function zoomstarted(dispatch) {
      if (!zooming++) dispatch({
        type: "zoomstart"
      });
    }
    function zoomed(dispatch) {
      rescale();
      dispatch({
        type: "zoom",
        scale: view.k,
        translate: [ view.x, view.y ]
      });
    }
    function zoomended(dispatch) {
      if (!--zooming) dispatch({
        type: "zoomend"
      }), center0 = null;
    }
    function mousedowned() {
      var that = this, dispatch = event.of(that, arguments), dragged = 0, subject = d3.select(d3_window(that)).on(mousemove, moved).on(mouseup, ended), location0 = location(d3.mouse(that)), dragRestore = d3_event_dragSuppress(that);
      d3_selection_interrupt.call(that);
      zoomstarted(dispatch);
      function moved() {
        dragged = 1;
        translateTo(d3.mouse(that), location0);
        zoomed(dispatch);
      }
      function ended() {
        subject.on(mousemove, null).on(mouseup, null);
        dragRestore(dragged);
        zoomended(dispatch);
      }
    }
    function touchstarted() {
      var that = this, dispatch = event.of(that, arguments), locations0 = {}, distance0 = 0, scale0, zoomName = ".zoom-" + d3.event.changedTouches[0].identifier, touchmove = "touchmove" + zoomName, touchend = "touchend" + zoomName, targets = [], subject = d3.select(that), dragRestore = d3_event_dragSuppress(that);
      started();
      zoomstarted(dispatch);
      subject.on(mousedown, null).on(touchstart, started);
      function relocate() {
        var touches = d3.touches(that);
        scale0 = view.k;
        touches.forEach(function(t) {
          if (t.identifier in locations0) locations0[t.identifier] = location(t);
        });
        return touches;
      }
      function started() {
        var target = d3.event.target;
        d3.select(target).on(touchmove, moved).on(touchend, ended);
        targets.push(target);
        var changed = d3.event.changedTouches;
        for (var i = 0, n = changed.length; i < n; ++i) {
          locations0[changed[i].identifier] = null;
        }
        var touches = relocate(), now = Date.now();
        if (touches.length === 1) {
          if (now - touchtime < 500) {
            var p = touches[0];
            zoomTo(that, p, locations0[p.identifier], Math.floor(Math.log(view.k) / Math.LN2) + 1);
            d3_eventPreventDefault();
          }
          touchtime = now;
        } else if (touches.length > 1) {
          var p = touches[0], q = touches[1], dx = p[0] - q[0], dy = p[1] - q[1];
          distance0 = dx * dx + dy * dy;
        }
      }
      function moved() {
        var touches = d3.touches(that), p0, l0, p1, l1;
        d3_selection_interrupt.call(that);
        for (var i = 0, n = touches.length; i < n; ++i, l1 = null) {
          p1 = touches[i];
          if (l1 = locations0[p1.identifier]) {
            if (l0) break;
            p0 = p1, l0 = l1;
          }
        }
        if (l1) {
          var distance1 = (distance1 = p1[0] - p0[0]) * distance1 + (distance1 = p1[1] - p0[1]) * distance1, scale1 = distance0 && Math.sqrt(distance1 / distance0);
          p0 = [ (p0[0] + p1[0]) / 2, (p0[1] + p1[1]) / 2 ];
          l0 = [ (l0[0] + l1[0]) / 2, (l0[1] + l1[1]) / 2 ];
          scaleTo(scale1 * scale0);
        }
        touchtime = null;
        translateTo(p0, l0);
        zoomed(dispatch);
      }
      function ended() {
        if (d3.event.touches.length) {
          var changed = d3.event.changedTouches;
          for (var i = 0, n = changed.length; i < n; ++i) {
            delete locations0[changed[i].identifier];
          }
          for (var identifier in locations0) {
            return void relocate();
          }
        }
        d3.selectAll(targets).on(zoomName, null);
        subject.on(mousedown, mousedowned).on(touchstart, touchstarted);
        dragRestore();
        zoomended(dispatch);
      }
    }
    function mousewheeled() {
      var dispatch = event.of(this, arguments);
      if (mousewheelTimer) clearTimeout(mousewheelTimer); else d3_selection_interrupt.call(this), 
      translate0 = location(center0 = center || d3.mouse(this)), zoomstarted(dispatch);
      mousewheelTimer = setTimeout(function() {
        mousewheelTimer = null;
        zoomended(dispatch);
      }, 50);
      d3_eventPreventDefault();
      scaleTo(Math.pow(2, d3_behavior_zoomDelta() * .002) * view.k);
      translateTo(center0, translate0);
      zoomed(dispatch);
    }
    function dblclicked() {
      var p = d3.mouse(this), k = Math.log(view.k) / Math.LN2;
      zoomTo(this, p, location(p), d3.event.shiftKey ? Math.ceil(k) - 1 : Math.floor(k) + 1);
    }
    return d3.rebind(zoom, event, "on");
  };
  var d3_behavior_zoomInfinity = [ 0, Infinity ], d3_behavior_zoomDelta, d3_behavior_zoomWheel;
  d3.color = d3_color;
  function d3_color() {}
  d3_color.prototype.toString = function() {
    return this.rgb() + "";
  };
  d3.hsl = d3_hsl;
  function d3_hsl(h, s, l) {
    return this instanceof d3_hsl ? void (this.h = +h, this.s = +s, this.l = +l) : arguments.length < 2 ? h instanceof d3_hsl ? new d3_hsl(h.h, h.s, h.l) : d3_rgb_parse("" + h, d3_rgb_hsl, d3_hsl) : new d3_hsl(h, s, l);
  }
  var d3_hslPrototype = d3_hsl.prototype = new d3_color();
  d3_hslPrototype.brighter = function(k) {
    k = Math.pow(.7, arguments.length ? k : 1);
    return new d3_hsl(this.h, this.s, this.l / k);
  };
  d3_hslPrototype.darker = function(k) {
    k = Math.pow(.7, arguments.length ? k : 1);
    return new d3_hsl(this.h, this.s, k * this.l);
  };
  d3_hslPrototype.rgb = function() {
    return d3_hsl_rgb(this.h, this.s, this.l);
  };
  function d3_hsl_rgb(h, s, l) {
    var m1, m2;
    h = isNaN(h) ? 0 : (h %= 360) < 0 ? h + 360 : h;
    s = isNaN(s) ? 0 : s < 0 ? 0 : s > 1 ? 1 : s;
    l = l < 0 ? 0 : l > 1 ? 1 : l;
    m2 = l <= .5 ? l * (1 + s) : l + s - l * s;
    m1 = 2 * l - m2;
    function v(h) {
      if (h > 360) h -= 360; else if (h < 0) h += 360;
      if (h < 60) return m1 + (m2 - m1) * h / 60;
      if (h < 180) return m2;
      if (h < 240) return m1 + (m2 - m1) * (240 - h) / 60;
      return m1;
    }
    function vv(h) {
      return Math.round(v(h) * 255);
    }
    return new d3_rgb(vv(h + 120), vv(h), vv(h - 120));
  }
  d3.hcl = d3_hcl;
  function d3_hcl(h, c, l) {
    return this instanceof d3_hcl ? void (this.h = +h, this.c = +c, this.l = +l) : arguments.length < 2 ? h instanceof d3_hcl ? new d3_hcl(h.h, h.c, h.l) : h instanceof d3_lab ? d3_lab_hcl(h.l, h.a, h.b) : d3_lab_hcl((h = d3_rgb_lab((h = d3.rgb(h)).r, h.g, h.b)).l, h.a, h.b) : new d3_hcl(h, c, l);
  }
  var d3_hclPrototype = d3_hcl.prototype = new d3_color();
  d3_hclPrototype.brighter = function(k) {
    return new d3_hcl(this.h, this.c, Math.min(100, this.l + d3_lab_K * (arguments.length ? k : 1)));
  };
  d3_hclPrototype.darker = function(k) {
    return new d3_hcl(this.h, this.c, Math.max(0, this.l - d3_lab_K * (arguments.length ? k : 1)));
  };
  d3_hclPrototype.rgb = function() {
    return d3_hcl_lab(this.h, this.c, this.l).rgb();
  };
  function d3_hcl_lab(h, c, l) {
    if (isNaN(h)) h = 0;
    if (isNaN(c)) c = 0;
    return new d3_lab(l, Math.cos(h *= d3_radians) * c, Math.sin(h) * c);
  }
  d3.lab = d3_lab;
  function d3_lab(l, a, b) {
    return this instanceof d3_lab ? void (this.l = +l, this.a = +a, this.b = +b) : arguments.length < 2 ? l instanceof d3_lab ? new d3_lab(l.l, l.a, l.b) : l instanceof d3_hcl ? d3_hcl_lab(l.h, l.c, l.l) : d3_rgb_lab((l = d3_rgb(l)).r, l.g, l.b) : new d3_lab(l, a, b);
  }
  var d3_lab_K = 18;
  var d3_lab_X = .95047, d3_lab_Y = 1, d3_lab_Z = 1.08883;
  var d3_labPrototype = d3_lab.prototype = new d3_color();
  d3_labPrototype.brighter = function(k) {
    return new d3_lab(Math.min(100, this.l + d3_lab_K * (arguments.length ? k : 1)), this.a, this.b);
  };
  d3_labPrototype.darker = function(k) {
    return new d3_lab(Math.max(0, this.l - d3_lab_K * (arguments.length ? k : 1)), this.a, this.b);
  };
  d3_labPrototype.rgb = function() {
    return d3_lab_rgb(this.l, this.a, this.b);
  };
  function d3_lab_rgb(l, a, b) {
    var y = (l + 16) / 116, x = y + a / 500, z = y - b / 200;
    x = d3_lab_xyz(x) * d3_lab_X;
    y = d3_lab_xyz(y) * d3_lab_Y;
    z = d3_lab_xyz(z) * d3_lab_Z;
    return new d3_rgb(d3_xyz_rgb(3.2404542 * x - 1.5371385 * y - .4985314 * z), d3_xyz_rgb(-.969266 * x + 1.8760108 * y + .041556 * z), d3_xyz_rgb(.0556434 * x - .2040259 * y + 1.0572252 * z));
  }
  function d3_lab_hcl(l, a, b) {
    return l > 0 ? new d3_hcl(Math.atan2(b, a) * d3_degrees, Math.sqrt(a * a + b * b), l) : new d3_hcl(NaN, NaN, l);
  }
  function d3_lab_xyz(x) {
    return x > .206893034 ? x * x * x : (x - 4 / 29) / 7.787037;
  }
  function d3_xyz_lab(x) {
    return x > .008856 ? Math.pow(x, 1 / 3) : 7.787037 * x + 4 / 29;
  }
  function d3_xyz_rgb(r) {
    return Math.round(255 * (r <= .00304 ? 12.92 * r : 1.055 * Math.pow(r, 1 / 2.4) - .055));
  }
  d3.rgb = d3_rgb;
  function d3_rgb(r, g, b) {
    return this instanceof d3_rgb ? void (this.r = ~~r, this.g = ~~g, this.b = ~~b) : arguments.length < 2 ? r instanceof d3_rgb ? new d3_rgb(r.r, r.g, r.b) : d3_rgb_parse("" + r, d3_rgb, d3_hsl_rgb) : new d3_rgb(r, g, b);
  }
  function d3_rgbNumber(value) {
    return new d3_rgb(value >> 16, value >> 8 & 255, value & 255);
  }
  function d3_rgbString(value) {
    return d3_rgbNumber(value) + "";
  }
  var d3_rgbPrototype = d3_rgb.prototype = new d3_color();
  d3_rgbPrototype.brighter = function(k) {
    k = Math.pow(.7, arguments.length ? k : 1);
    var r = this.r, g = this.g, b = this.b, i = 30;
    if (!r && !g && !b) return new d3_rgb(i, i, i);
    if (r && r < i) r = i;
    if (g && g < i) g = i;
    if (b && b < i) b = i;
    return new d3_rgb(Math.min(255, r / k), Math.min(255, g / k), Math.min(255, b / k));
  };
  d3_rgbPrototype.darker = function(k) {
    k = Math.pow(.7, arguments.length ? k : 1);
    return new d3_rgb(k * this.r, k * this.g, k * this.b);
  };
  d3_rgbPrototype.hsl = function() {
    return d3_rgb_hsl(this.r, this.g, this.b);
  };
  d3_rgbPrototype.toString = function() {
    return "#" + d3_rgb_hex(this.r) + d3_rgb_hex(this.g) + d3_rgb_hex(this.b);
  };
  function d3_rgb_hex(v) {
    return v < 16 ? "0" + Math.max(0, v).toString(16) : Math.min(255, v).toString(16);
  }
  function d3_rgb_parse(format, rgb, hsl) {
    var r = 0, g = 0, b = 0, m1, m2, color;
    m1 = /([a-z]+)\((.*)\)/.exec(format = format.toLowerCase());
    if (m1) {
      m2 = m1[2].split(",");
      switch (m1[1]) {
       case "hsl":
        {
          return hsl(parseFloat(m2[0]), parseFloat(m2[1]) / 100, parseFloat(m2[2]) / 100);
        }

       case "rgb":
        {
          return rgb(d3_rgb_parseNumber(m2[0]), d3_rgb_parseNumber(m2[1]), d3_rgb_parseNumber(m2[2]));
        }
      }
    }
    if (color = d3_rgb_names.get(format)) {
      return rgb(color.r, color.g, color.b);
    }
    if (format != null && format.charAt(0) === "#" && !isNaN(color = parseInt(format.slice(1), 16))) {
      if (format.length === 4) {
        r = (color & 3840) >> 4;
        r = r >> 4 | r;
        g = color & 240;
        g = g >> 4 | g;
        b = color & 15;
        b = b << 4 | b;
      } else if (format.length === 7) {
        r = (color & 16711680) >> 16;
        g = (color & 65280) >> 8;
        b = color & 255;
      }
    }
    return rgb(r, g, b);
  }
  function d3_rgb_hsl(r, g, b) {
    var min = Math.min(r /= 255, g /= 255, b /= 255), max = Math.max(r, g, b), d = max - min, h, s, l = (max + min) / 2;
    if (d) {
      s = l < .5 ? d / (max + min) : d / (2 - max - min);
      if (r == max) h = (g - b) / d + (g < b ? 6 : 0); else if (g == max) h = (b - r) / d + 2; else h = (r - g) / d + 4;
      h *= 60;
    } else {
      h = NaN;
      s = l > 0 && l < 1 ? 0 : h;
    }
    return new d3_hsl(h, s, l);
  }
  function d3_rgb_lab(r, g, b) {
    r = d3_rgb_xyz(r);
    g = d3_rgb_xyz(g);
    b = d3_rgb_xyz(b);
    var x = d3_xyz_lab((.4124564 * r + .3575761 * g + .1804375 * b) / d3_lab_X), y = d3_xyz_lab((.2126729 * r + .7151522 * g + .072175 * b) / d3_lab_Y), z = d3_xyz_lab((.0193339 * r + .119192 * g + .9503041 * b) / d3_lab_Z);
    return d3_lab(116 * y - 16, 500 * (x - y), 200 * (y - z));
  }
  function d3_rgb_xyz(r) {
    return (r /= 255) <= .04045 ? r / 12.92 : Math.pow((r + .055) / 1.055, 2.4);
  }
  function d3_rgb_parseNumber(c) {
    var f = parseFloat(c);
    return c.charAt(c.length - 1) === "%" ? Math.round(f * 2.55) : f;
  }
  var d3_rgb_names = d3.map({
    aliceblue: 15792383,
    antiquewhite: 16444375,
    aqua: 65535,
    aquamarine: 8388564,
    azure: 15794175,
    beige: 16119260,
    bisque: 16770244,
    black: 0,
    blanchedalmond: 16772045,
    blue: 255,
    blueviolet: 9055202,
    brown: 10824234,
    burlywood: 14596231,
    cadetblue: 6266528,
    chartreuse: 8388352,
    chocolate: 13789470,
    coral: 16744272,
    cornflowerblue: 6591981,
    cornsilk: 16775388,
    crimson: 14423100,
    cyan: 65535,
    darkblue: 139,
    darkcyan: 35723,
    darkgoldenrod: 12092939,
    darkgray: 11119017,
    darkgreen: 25600,
    darkgrey: 11119017,
    darkkhaki: 12433259,
    darkmagenta: 9109643,
    darkolivegreen: 5597999,
    darkorange: 16747520,
    darkorchid: 10040012,
    darkred: 9109504,
    darksalmon: 15308410,
    darkseagreen: 9419919,
    darkslateblue: 4734347,
    darkslategray: 3100495,
    darkslategrey: 3100495,
    darkturquoise: 52945,
    darkviolet: 9699539,
    deeppink: 16716947,
    deepskyblue: 49151,
    dimgray: 6908265,
    dimgrey: 6908265,
    dodgerblue: 2003199,
    firebrick: 11674146,
    floralwhite: 16775920,
    forestgreen: 2263842,
    fuchsia: 16711935,
    gainsboro: 14474460,
    ghostwhite: 16316671,
    gold: 16766720,
    goldenrod: 14329120,
    gray: 8421504,
    green: 32768,
    greenyellow: 11403055,
    grey: 8421504,
    honeydew: 15794160,
    hotpink: 16738740,
    indianred: 13458524,
    indigo: 4915330,
    ivory: 16777200,
    khaki: 15787660,
    lavender: 15132410,
    lavenderblush: 16773365,
    lawngreen: 8190976,
    lemonchiffon: 16775885,
    lightblue: 11393254,
    lightcoral: 15761536,
    lightcyan: 14745599,
    lightgoldenrodyellow: 16448210,
    lightgray: 13882323,
    lightgreen: 9498256,
    lightgrey: 13882323,
    lightpink: 16758465,
    lightsalmon: 16752762,
    lightseagreen: 2142890,
    lightskyblue: 8900346,
    lightslategray: 7833753,
    lightslategrey: 7833753,
    lightsteelblue: 11584734,
    lightyellow: 16777184,
    lime: 65280,
    limegreen: 3329330,
    linen: 16445670,
    magenta: 16711935,
    maroon: 8388608,
    mediumaquamarine: 6737322,
    mediumblue: 205,
    mediumorchid: 12211667,
    mediumpurple: 9662683,
    mediumseagreen: 3978097,
    mediumslateblue: 8087790,
    mediumspringgreen: 64154,
    mediumturquoise: 4772300,
    mediumvioletred: 13047173,
    midnightblue: 1644912,
    mintcream: 16121850,
    mistyrose: 16770273,
    moccasin: 16770229,
    navajowhite: 16768685,
    navy: 128,
    oldlace: 16643558,
    olive: 8421376,
    olivedrab: 7048739,
    orange: 16753920,
    orangered: 16729344,
    orchid: 14315734,
    palegoldenrod: 15657130,
    palegreen: 10025880,
    paleturquoise: 11529966,
    palevioletred: 14381203,
    papayawhip: 16773077,
    peachpuff: 16767673,
    peru: 13468991,
    pink: 16761035,
    plum: 14524637,
    powderblue: 11591910,
    purple: 8388736,
    rebeccapurple: 6697881,
    red: 16711680,
    rosybrown: 12357519,
    royalblue: 4286945,
    saddlebrown: 9127187,
    salmon: 16416882,
    sandybrown: 16032864,
    seagreen: 3050327,
    seashell: 16774638,
    sienna: 10506797,
    silver: 12632256,
    skyblue: 8900331,
    slateblue: 6970061,
    slategray: 7372944,
    slategrey: 7372944,
    snow: 16775930,
    springgreen: 65407,
    steelblue: 4620980,
    tan: 13808780,
    teal: 32896,
    thistle: 14204888,
    tomato: 16737095,
    turquoise: 4251856,
    violet: 15631086,
    wheat: 16113331,
    white: 16777215,
    whitesmoke: 16119285,
    yellow: 16776960,
    yellowgreen: 10145074
  });
  d3_rgb_names.forEach(function(key, value) {
    d3_rgb_names.set(key, d3_rgbNumber(value));
  });
  function d3_functor(v) {
    return typeof v === "function" ? v : function() {
      return v;
    };
  }
  d3.functor = d3_functor;
  d3.xhr = d3_xhrType(d3_identity);
  function d3_xhrType(response) {
    return function(url, mimeType, callback) {
      if (arguments.length === 2 && typeof mimeType === "function") callback = mimeType, 
      mimeType = null;
      return d3_xhr(url, mimeType, response, callback);
    };
  }
  function d3_xhr(url, mimeType, response, callback) {
    var xhr = {}, dispatch = d3.dispatch("beforesend", "progress", "load", "error"), headers = {}, request = new XMLHttpRequest(), responseType = null;
    if (this.XDomainRequest && !("withCredentials" in request) && /^(http(s)?:)?\/\//.test(url)) request = new XDomainRequest();
    "onload" in request ? request.onload = request.onerror = respond : request.onreadystatechange = function() {
      request.readyState > 3 && respond();
    };
    function respond() {
      var status = request.status, result;
      if (!status && d3_xhrHasResponse(request) || status >= 200 && status < 300 || status === 304) {
        try {
          result = response.call(xhr, request);
        } catch (e) {
          dispatch.error.call(xhr, e);
          return;
        }
        dispatch.load.call(xhr, result);
      } else {
        dispatch.error.call(xhr, request);
      }
    }
    request.onprogress = function(event) {
      var o = d3.event;
      d3.event = event;
      try {
        dispatch.progress.call(xhr, request);
      } finally {
        d3.event = o;
      }
    };
    xhr.header = function(name, value) {
      name = (name + "").toLowerCase();
      if (arguments.length < 2) return headers[name];
      if (value == null) delete headers[name]; else headers[name] = value + "";
      return xhr;
    };
    xhr.mimeType = function(value) {
      if (!arguments.length) return mimeType;
      mimeType = value == null ? null : value + "";
      return xhr;
    };
    xhr.responseType = function(value) {
      if (!arguments.length) return responseType;
      responseType = value;
      return xhr;
    };
    xhr.response = function(value) {
      response = value;
      return xhr;
    };
    [ "get", "post" ].forEach(function(method) {
      xhr[method] = function() {
        return xhr.send.apply(xhr, [ method ].concat(d3_array(arguments)));
      };
    });
    xhr.send = function(method, data, callback) {
      if (arguments.length === 2 && typeof data === "function") callback = data, data = null;
      request.open(method, url, true);
      if (mimeType != null && !("accept" in headers)) headers["accept"] = mimeType + ",*/*";
      if (request.setRequestHeader) for (var name in headers) request.setRequestHeader(name, headers[name]);
      if (mimeType != null && request.overrideMimeType) request.overrideMimeType(mimeType);
      if (responseType != null) request.responseType = responseType;
      if (callback != null) xhr.on("error", callback).on("load", function(request) {
        callback(null, request);
      });
      dispatch.beforesend.call(xhr, request);
      request.send(data == null ? null : data);
      return xhr;
    };
    xhr.abort = function() {
      request.abort();
      return xhr;
    };
    d3.rebind(xhr, dispatch, "on");
    return callback == null ? xhr : xhr.get(d3_xhr_fixCallback(callback));
  }
  function d3_xhr_fixCallback(callback) {
    return callback.length === 1 ? function(error, request) {
      callback(error == null ? request : null);
    } : callback;
  }
  function d3_xhrHasResponse(request) {
    var type = request.responseType;
    return type && type !== "text" ? request.response : request.responseText;
  }
  d3.dsv = function(delimiter, mimeType) {
    var reFormat = new RegExp('["' + delimiter + "\n]"), delimiterCode = delimiter.charCodeAt(0);
    function dsv(url, row, callback) {
      if (arguments.length < 3) callback = row, row = null;
      var xhr = d3_xhr(url, mimeType, row == null ? response : typedResponse(row), callback);
      xhr.row = function(_) {
        return arguments.length ? xhr.response((row = _) == null ? response : typedResponse(_)) : row;
      };
      return xhr;
    }
    function response(request) {
      return dsv.parse(request.responseText);
    }
    function typedResponse(f) {
      return function(request) {
        return dsv.parse(request.responseText, f);
      };
    }
    dsv.parse = function(text, f) {
      var o;
      return dsv.parseRows(text, function(row, i) {
        if (o) return o(row, i - 1);
        var a = new Function("d", "return {" + row.map(function(name, i) {
          return JSON.stringify(name) + ": d[" + i + "]";
        }).join(",") + "}");
        o = f ? function(row, i) {
          return f(a(row), i);
        } : a;
      });
    };
    dsv.parseRows = function(text, f) {
      var EOL = {}, EOF = {}, rows = [], N = text.length, I = 0, n = 0, t, eol;
      function token() {
        if (I >= N) return EOF;
        if (eol) return eol = false, EOL;
        var j = I;
        if (text.charCodeAt(j) === 34) {
          var i = j;
          while (i++ < N) {
            if (text.charCodeAt(i) === 34) {
              if (text.charCodeAt(i + 1) !== 34) break;
              ++i;
            }
          }
          I = i + 2;
          var c = text.charCodeAt(i + 1);
          if (c === 13) {
            eol = true;
            if (text.charCodeAt(i + 2) === 10) ++I;
          } else if (c === 10) {
            eol = true;
          }
          return text.slice(j + 1, i).replace(/""/g, '"');
        }
        while (I < N) {
          var c = text.charCodeAt(I++), k = 1;
          if (c === 10) eol = true; else if (c === 13) {
            eol = true;
            if (text.charCodeAt(I) === 10) ++I, ++k;
          } else if (c !== delimiterCode) continue;
          return text.slice(j, I - k);
        }
        return text.slice(j);
      }
      while ((t = token()) !== EOF) {
        var a = [];
        while (t !== EOL && t !== EOF) {
          a.push(t);
          t = token();
        }
        if (f && (a = f(a, n++)) == null) continue;
        rows.push(a);
      }
      return rows;
    };
    dsv.format = function(rows) {
      if (Array.isArray(rows[0])) return dsv.formatRows(rows);
      var fieldSet = new d3_Set(), fields = [];
      rows.forEach(function(row) {
        for (var field in row) {
          if (!fieldSet.has(field)) {
            fields.push(fieldSet.add(field));
          }
        }
      });
      return [ fields.map(formatValue).join(delimiter) ].concat(rows.map(function(row) {
        return fields.map(function(field) {
          return formatValue(row[field]);
        }).join(delimiter);
      })).join("\n");
    };
    dsv.formatRows = function(rows) {
      return rows.map(formatRow).join("\n");
    };
    function formatRow(row) {
      return row.map(formatValue).join(delimiter);
    }
    function formatValue(text) {
      return reFormat.test(text) ? '"' + text.replace(/\"/g, '""') + '"' : text;
    }
    return dsv;
  };
  d3.csv = d3.dsv(",", "text/csv");
  d3.tsv = d3.dsv("	", "text/tab-separated-values");
  var d3_timer_queueHead, d3_timer_queueTail, d3_timer_interval, d3_timer_timeout, d3_timer_frame = this[d3_vendorSymbol(this, "requestAnimationFrame")] || function(callback) {
    setTimeout(callback, 17);
  };
  d3.timer = function() {
    d3_timer.apply(this, arguments);
  };
  function d3_timer(callback, delay, then) {
    var n = arguments.length;
    if (n < 2) delay = 0;
    if (n < 3) then = Date.now();
    var time = then + delay, timer = {
      c: callback,
      t: time,
      n: null
    };
    if (d3_timer_queueTail) d3_timer_queueTail.n = timer; else d3_timer_queueHead = timer;
    d3_timer_queueTail = timer;
    if (!d3_timer_interval) {
      d3_timer_timeout = clearTimeout(d3_timer_timeout);
      d3_timer_interval = 1;
      d3_timer_frame(d3_timer_step);
    }
    return timer;
  }
  function d3_timer_step() {
    var now = d3_timer_mark(), delay = d3_timer_sweep() - now;
    if (delay > 24) {
      if (isFinite(delay)) {
        clearTimeout(d3_timer_timeout);
        d3_timer_timeout = setTimeout(d3_timer_step, delay);
      }
      d3_timer_interval = 0;
    } else {
      d3_timer_interval = 1;
      d3_timer_frame(d3_timer_step);
    }
  }
  d3.timer.flush = function() {
    d3_timer_mark();
    d3_timer_sweep();
  };
  function d3_timer_mark() {
    var now = Date.now(), timer = d3_timer_queueHead;
    while (timer) {
      if (now >= timer.t && timer.c(now - timer.t)) timer.c = null;
      timer = timer.n;
    }
    return now;
  }
  function d3_timer_sweep() {
    var t0, t1 = d3_timer_queueHead, time = Infinity;
    while (t1) {
      if (t1.c) {
        if (t1.t < time) time = t1.t;
        t1 = (t0 = t1).n;
      } else {
        t1 = t0 ? t0.n = t1.n : d3_timer_queueHead = t1.n;
      }
    }
    d3_timer_queueTail = t0;
    return time;
  }
  function d3_format_precision(x, p) {
    return p - (x ? Math.ceil(Math.log(x) / Math.LN10) : 1);
  }
  d3.round = function(x, n) {
    return n ? Math.round(x * (n = Math.pow(10, n))) / n : Math.round(x);
  };
  var d3_formatPrefixes = [ "y", "z", "a", "f", "p", "n", "µ", "m", "", "k", "M", "G", "T", "P", "E", "Z", "Y" ].map(d3_formatPrefix);
  d3.formatPrefix = function(value, precision) {
    var i = 0;
    if (value = +value) {
      if (value < 0) value *= -1;
      if (precision) value = d3.round(value, d3_format_precision(value, precision));
      i = 1 + Math.floor(1e-12 + Math.log(value) / Math.LN10);
      i = Math.max(-24, Math.min(24, Math.floor((i - 1) / 3) * 3));
    }
    return d3_formatPrefixes[8 + i / 3];
  };
  function d3_formatPrefix(d, i) {
    var k = Math.pow(10, abs(8 - i) * 3);
    return {
      scale: i > 8 ? function(d) {
        return d / k;
      } : function(d) {
        return d * k;
      },
      symbol: d
    };
  }
  function d3_locale_numberFormat(locale) {
    var locale_decimal = locale.decimal, locale_thousands = locale.thousands, locale_grouping = locale.grouping, locale_currency = locale.currency, formatGroup = locale_grouping && locale_thousands ? function(value, width) {
      var i = value.length, t = [], j = 0, g = locale_grouping[0], length = 0;
      while (i > 0 && g > 0) {
        if (length + g + 1 > width) g = Math.max(1, width - length);
        t.push(value.substring(i -= g, i + g));
        if ((length += g + 1) > width) break;
        g = locale_grouping[j = (j + 1) % locale_grouping.length];
      }
      return t.reverse().join(locale_thousands);
    } : d3_identity;
    return function(specifier) {
      var match = d3_format_re.exec(specifier), fill = match[1] || " ", align = match[2] || ">", sign = match[3] || "-", symbol = match[4] || "", zfill = match[5], width = +match[6], comma = match[7], precision = match[8], type = match[9], scale = 1, prefix = "", suffix = "", integer = false, exponent = true;
      if (precision) precision = +precision.substring(1);
      if (zfill || fill === "0" && align === "=") {
        zfill = fill = "0";
        align = "=";
      }
      switch (type) {
       case "n":
        comma = true;
        type = "g";
        break;

       case "%":
        scale = 100;
        suffix = "%";
        type = "f";
        break;

       case "p":
        scale = 100;
        suffix = "%";
        type = "r";
        break;

       case "b":
       case "o":
       case "x":
       case "X":
        if (symbol === "#") prefix = "0" + type.toLowerCase();

       case "c":
        exponent = false;

       case "d":
        integer = true;
        precision = 0;
        break;

       case "s":
        scale = -1;
        type = "r";
        break;
      }
      if (symbol === "$") prefix = locale_currency[0], suffix = locale_currency[1];
      if (type == "r" && !precision) type = "g";
      if (precision != null) {
        if (type == "g") precision = Math.max(1, Math.min(21, precision)); else if (type == "e" || type == "f") precision = Math.max(0, Math.min(20, precision));
      }
      type = d3_format_types.get(type) || d3_format_typeDefault;
      var zcomma = zfill && comma;
      return function(value) {
        var fullSuffix = suffix;
        if (integer && value % 1) return "";
        var negative = value < 0 || value === 0 && 1 / value < 0 ? (value = -value, "-") : sign === "-" ? "" : sign;
        if (scale < 0) {
          var unit = d3.formatPrefix(value, precision);
          value = unit.scale(value);
          fullSuffix = unit.symbol + suffix;
        } else {
          value *= scale;
        }
        value = type(value, precision);
        var i = value.lastIndexOf("."), before, after;
        if (i < 0) {
          var j = exponent ? value.lastIndexOf("e") : -1;
          if (j < 0) before = value, after = ""; else before = value.substring(0, j), after = value.substring(j);
        } else {
          before = value.substring(0, i);
          after = locale_decimal + value.substring(i + 1);
        }
        if (!zfill && comma) before = formatGroup(before, Infinity);
        var length = prefix.length + before.length + after.length + (zcomma ? 0 : negative.length), padding = length < width ? new Array(length = width - length + 1).join(fill) : "";
        if (zcomma) before = formatGroup(padding + before, padding.length ? width - after.length : Infinity);
        negative += prefix;
        value = before + after;
        return (align === "<" ? negative + value + padding : align === ">" ? padding + negative + value : align === "^" ? padding.substring(0, length >>= 1) + negative + value + padding.substring(length) : negative + (zcomma ? value : padding + value)) + fullSuffix;
      };
    };
  }
  var d3_format_re = /(?:([^{])?([<>=^]))?([+\- ])?([$#])?(0)?(\d+)?(,)?(\.-?\d+)?([a-z%])?/i;
  var d3_format_types = d3.map({
    b: function(x) {
      return x.toString(2);
    },
    c: function(x) {
      return String.fromCharCode(x);
    },
    o: function(x) {
      return x.toString(8);
    },
    x: function(x) {
      return x.toString(16);
    },
    X: function(x) {
      return x.toString(16).toUpperCase();
    },
    g: function(x, p) {
      return x.toPrecision(p);
    },
    e: function(x, p) {
      return x.toExponential(p);
    },
    f: function(x, p) {
      return x.toFixed(p);
    },
    r: function(x, p) {
      return (x = d3.round(x, d3_format_precision(x, p))).toFixed(Math.max(0, Math.min(20, d3_format_precision(x * (1 + 1e-15), p))));
    }
  });
  function d3_format_typeDefault(x) {
    return x + "";
  }
  var d3_time = d3.time = {}, d3_date = Date;
  function d3_date_utc() {
    this._ = new Date(arguments.length > 1 ? Date.UTC.apply(this, arguments) : arguments[0]);
  }
  d3_date_utc.prototype = {
    getDate: function() {
      return this._.getUTCDate();
    },
    getDay: function() {
      return this._.getUTCDay();
    },
    getFullYear: function() {
      return this._.getUTCFullYear();
    },
    getHours: function() {
      return this._.getUTCHours();
    },
    getMilliseconds: function() {
      return this._.getUTCMilliseconds();
    },
    getMinutes: function() {
      return this._.getUTCMinutes();
    },
    getMonth: function() {
      return this._.getUTCMonth();
    },
    getSeconds: function() {
      return this._.getUTCSeconds();
    },
    getTime: function() {
      return this._.getTime();
    },
    getTimezoneOffset: function() {
      return 0;
    },
    valueOf: function() {
      return this._.valueOf();
    },
    setDate: function() {
      d3_time_prototype.setUTCDate.apply(this._, arguments);
    },
    setDay: function() {
      d3_time_prototype.setUTCDay.apply(this._, arguments);
    },
    setFullYear: function() {
      d3_time_prototype.setUTCFullYear.apply(this._, arguments);
    },
    setHours: function() {
      d3_time_prototype.setUTCHours.apply(this._, arguments);
    },
    setMilliseconds: function() {
      d3_time_prototype.setUTCMilliseconds.apply(this._, arguments);
    },
    setMinutes: function() {
      d3_time_prototype.setUTCMinutes.apply(this._, arguments);
    },
    setMonth: function() {
      d3_time_prototype.setUTCMonth.apply(this._, arguments);
    },
    setSeconds: function() {
      d3_time_prototype.setUTCSeconds.apply(this._, arguments);
    },
    setTime: function() {
      d3_time_prototype.setTime.apply(this._, arguments);
    }
  };
  var d3_time_prototype = Date.prototype;
  function d3_time_interval(local, step, number) {
    function round(date) {
      var d0 = local(date), d1 = offset(d0, 1);
      return date - d0 < d1 - date ? d0 : d1;
    }
    function ceil(date) {
      step(date = local(new d3_date(date - 1)), 1);
      return date;
    }
    function offset(date, k) {
      step(date = new d3_date(+date), k);
      return date;
    }
    function range(t0, t1, dt) {
      var time = ceil(t0), times = [];
      if (dt > 1) {
        while (time < t1) {
          if (!(number(time) % dt)) times.push(new Date(+time));
          step(time, 1);
        }
      } else {
        while (time < t1) times.push(new Date(+time)), step(time, 1);
      }
      return times;
    }
    function range_utc(t0, t1, dt) {
      try {
        d3_date = d3_date_utc;
        var utc = new d3_date_utc();
        utc._ = t0;
        return range(utc, t1, dt);
      } finally {
        d3_date = Date;
      }
    }
    local.floor = local;
    local.round = round;
    local.ceil = ceil;
    local.offset = offset;
    local.range = range;
    var utc = local.utc = d3_time_interval_utc(local);
    utc.floor = utc;
    utc.round = d3_time_interval_utc(round);
    utc.ceil = d3_time_interval_utc(ceil);
    utc.offset = d3_time_interval_utc(offset);
    utc.range = range_utc;
    return local;
  }
  function d3_time_interval_utc(method) {
    return function(date, k) {
      try {
        d3_date = d3_date_utc;
        var utc = new d3_date_utc();
        utc._ = date;
        return method(utc, k)._;
      } finally {
        d3_date = Date;
      }
    };
  }
  d3_time.year = d3_time_interval(function(date) {
    date = d3_time.day(date);
    date.setMonth(0, 1);
    return date;
  }, function(date, offset) {
    date.setFullYear(date.getFullYear() + offset);
  }, function(date) {
    return date.getFullYear();
  });
  d3_time.years = d3_time.year.range;
  d3_time.years.utc = d3_time.year.utc.range;
  d3_time.day = d3_time_interval(function(date) {
    var day = new d3_date(2e3, 0);
    day.setFullYear(date.getFullYear(), date.getMonth(), date.getDate());
    return day;
  }, function(date, offset) {
    date.setDate(date.getDate() + offset);
  }, function(date) {
    return date.getDate() - 1;
  });
  d3_time.days = d3_time.day.range;
  d3_time.days.utc = d3_time.day.utc.range;
  d3_time.dayOfYear = function(date) {
    var year = d3_time.year(date);
    return Math.floor((date - year - (date.getTimezoneOffset() - year.getTimezoneOffset()) * 6e4) / 864e5);
  };
  [ "sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday" ].forEach(function(day, i) {
    i = 7 - i;
    var interval = d3_time[day] = d3_time_interval(function(date) {
      (date = d3_time.day(date)).setDate(date.getDate() - (date.getDay() + i) % 7);
      return date;
    }, function(date, offset) {
      date.setDate(date.getDate() + Math.floor(offset) * 7);
    }, function(date) {
      var day = d3_time.year(date).getDay();
      return Math.floor((d3_time.dayOfYear(date) + (day + i) % 7) / 7) - (day !== i);
    });
    d3_time[day + "s"] = interval.range;
    d3_time[day + "s"].utc = interval.utc.range;
    d3_time[day + "OfYear"] = function(date) {
      var day = d3_time.year(date).getDay();
      return Math.floor((d3_time.dayOfYear(date) + (day + i) % 7) / 7);
    };
  });
  d3_time.week = d3_time.sunday;
  d3_time.weeks = d3_time.sunday.range;
  d3_time.weeks.utc = d3_time.sunday.utc.range;
  d3_time.weekOfYear = d3_time.sundayOfYear;
  function d3_locale_timeFormat(locale) {
    var locale_dateTime = locale.dateTime, locale_date = locale.date, locale_time = locale.time, locale_periods = locale.periods, locale_days = locale.days, locale_shortDays = locale.shortDays, locale_months = locale.months, locale_shortMonths = locale.shortMonths;
    function d3_time_format(template) {
      var n = template.length;
      function format(date) {
        var string = [], i = -1, j = 0, c, p, f;
        while (++i < n) {
          if (template.charCodeAt(i) === 37) {
            string.push(template.slice(j, i));
            if ((p = d3_time_formatPads[c = template.charAt(++i)]) != null) c = template.charAt(++i);
            if (f = d3_time_formats[c]) c = f(date, p == null ? c === "e" ? " " : "0" : p);
            string.push(c);
            j = i + 1;
          }
        }
        string.push(template.slice(j, i));
        return string.join("");
      }
      format.parse = function(string) {
        var d = {
          y: 1900,
          m: 0,
          d: 1,
          H: 0,
          M: 0,
          S: 0,
          L: 0,
          Z: null
        }, i = d3_time_parse(d, template, string, 0);
        if (i != string.length) return null;
        if ("p" in d) d.H = d.H % 12 + d.p * 12;
        var localZ = d.Z != null && d3_date !== d3_date_utc, date = new (localZ ? d3_date_utc : d3_date)();
        if ("j" in d) date.setFullYear(d.y, 0, d.j); else if ("W" in d || "U" in d) {
          if (!("w" in d)) d.w = "W" in d ? 1 : 0;
          date.setFullYear(d.y, 0, 1);
          date.setFullYear(d.y, 0, "W" in d ? (d.w + 6) % 7 + d.W * 7 - (date.getDay() + 5) % 7 : d.w + d.U * 7 - (date.getDay() + 6) % 7);
        } else date.setFullYear(d.y, d.m, d.d);
        date.setHours(d.H + (d.Z / 100 | 0), d.M + d.Z % 100, d.S, d.L);
        return localZ ? date._ : date;
      };
      format.toString = function() {
        return template;
      };
      return format;
    }
    function d3_time_parse(date, template, string, j) {
      var c, p, t, i = 0, n = template.length, m = string.length;
      while (i < n) {
        if (j >= m) return -1;
        c = template.charCodeAt(i++);
        if (c === 37) {
          t = template.charAt(i++);
          p = d3_time_parsers[t in d3_time_formatPads ? template.charAt(i++) : t];
          if (!p || (j = p(date, string, j)) < 0) return -1;
        } else if (c != string.charCodeAt(j++)) {
          return -1;
        }
      }
      return j;
    }
    d3_time_format.utc = function(template) {
      var local = d3_time_format(template);
      function format(date) {
        try {
          d3_date = d3_date_utc;
          var utc = new d3_date();
          utc._ = date;
          return local(utc);
        } finally {
          d3_date = Date;
        }
      }
      format.parse = function(string) {
        try {
          d3_date = d3_date_utc;
          var date = local.parse(string);
          return date && date._;
        } finally {
          d3_date = Date;
        }
      };
      format.toString = local.toString;
      return format;
    };
    d3_time_format.multi = d3_time_format.utc.multi = d3_time_formatMulti;
    var d3_time_periodLookup = d3.map(), d3_time_dayRe = d3_time_formatRe(locale_days), d3_time_dayLookup = d3_time_formatLookup(locale_days), d3_time_dayAbbrevRe = d3_time_formatRe(locale_shortDays), d3_time_dayAbbrevLookup = d3_time_formatLookup(locale_shortDays), d3_time_monthRe = d3_time_formatRe(locale_months), d3_time_monthLookup = d3_time_formatLookup(locale_months), d3_time_monthAbbrevRe = d3_time_formatRe(locale_shortMonths), d3_time_monthAbbrevLookup = d3_time_formatLookup(locale_shortMonths);
    locale_periods.forEach(function(p, i) {
      d3_time_periodLookup.set(p.toLowerCase(), i);
    });
    var d3_time_formats = {
      a: function(d) {
        return locale_shortDays[d.getDay()];
      },
      A: function(d) {
        return locale_days[d.getDay()];
      },
      b: function(d) {
        return locale_shortMonths[d.getMonth()];
      },
      B: function(d) {
        return locale_months[d.getMonth()];
      },
      c: d3_time_format(locale_dateTime),
      d: function(d, p) {
        return d3_time_formatPad(d.getDate(), p, 2);
      },
      e: function(d, p) {
        return d3_time_formatPad(d.getDate(), p, 2);
      },
      H: function(d, p) {
        return d3_time_formatPad(d.getHours(), p, 2);
      },
      I: function(d, p) {
        return d3_time_formatPad(d.getHours() % 12 || 12, p, 2);
      },
      j: function(d, p) {
        return d3_time_formatPad(1 + d3_time.dayOfYear(d), p, 3);
      },
      L: function(d, p) {
        return d3_time_formatPad(d.getMilliseconds(), p, 3);
      },
      m: function(d, p) {
        return d3_time_formatPad(d.getMonth() + 1, p, 2);
      },
      M: function(d, p) {
        return d3_time_formatPad(d.getMinutes(), p, 2);
      },
      p: function(d) {
        return locale_periods[+(d.getHours() >= 12)];
      },
      S: function(d, p) {
        return d3_time_formatPad(d.getSeconds(), p, 2);
      },
      U: function(d, p) {
        return d3_time_formatPad(d3_time.sundayOfYear(d), p, 2);
      },
      w: function(d) {
        return d.getDay();
      },
      W: function(d, p) {
        return d3_time_formatPad(d3_time.mondayOfYear(d), p, 2);
      },
      x: d3_time_format(locale_date),
      X: d3_time_format(locale_time),
      y: function(d, p) {
        return d3_time_formatPad(d.getFullYear() % 100, p, 2);
      },
      Y: function(d, p) {
        return d3_time_formatPad(d.getFullYear() % 1e4, p, 4);
      },
      Z: d3_time_zone,
      "%": function() {
        return "%";
      }
    };
    var d3_time_parsers = {
      a: d3_time_parseWeekdayAbbrev,
      A: d3_time_parseWeekday,
      b: d3_time_parseMonthAbbrev,
      B: d3_time_parseMonth,
      c: d3_time_parseLocaleFull,
      d: d3_time_parseDay,
      e: d3_time_parseDay,
      H: d3_time_parseHour24,
      I: d3_time_parseHour24,
      j: d3_time_parseDayOfYear,
      L: d3_time_parseMilliseconds,
      m: d3_time_parseMonthNumber,
      M: d3_time_parseMinutes,
      p: d3_time_parseAmPm,
      S: d3_time_parseSeconds,
      U: d3_time_parseWeekNumberSunday,
      w: d3_time_parseWeekdayNumber,
      W: d3_time_parseWeekNumberMonday,
      x: d3_time_parseLocaleDate,
      X: d3_time_parseLocaleTime,
      y: d3_time_parseYear,
      Y: d3_time_parseFullYear,
      Z: d3_time_parseZone,
      "%": d3_time_parseLiteralPercent
    };
    function d3_time_parseWeekdayAbbrev(date, string, i) {
      d3_time_dayAbbrevRe.lastIndex = 0;
      var n = d3_time_dayAbbrevRe.exec(string.slice(i));
      return n ? (date.w = d3_time_dayAbbrevLookup.get(n[0].toLowerCase()), i + n[0].length) : -1;
    }
    function d3_time_parseWeekday(date, string, i) {
      d3_time_dayRe.lastIndex = 0;
      var n = d3_time_dayRe.exec(string.slice(i));
      return n ? (date.w = d3_time_dayLookup.get(n[0].toLowerCase()), i + n[0].length) : -1;
    }
    function d3_time_parseMonthAbbrev(date, string, i) {
      d3_time_monthAbbrevRe.lastIndex = 0;
      var n = d3_time_monthAbbrevRe.exec(string.slice(i));
      return n ? (date.m = d3_time_monthAbbrevLookup.get(n[0].toLowerCase()), i + n[0].length) : -1;
    }
    function d3_time_parseMonth(date, string, i) {
      d3_time_monthRe.lastIndex = 0;
      var n = d3_time_monthRe.exec(string.slice(i));
      return n ? (date.m = d3_time_monthLookup.get(n[0].toLowerCase()), i + n[0].length) : -1;
    }
    function d3_time_parseLocaleFull(date, string, i) {
      return d3_time_parse(date, d3_time_formats.c.toString(), string, i);
    }
    function d3_time_parseLocaleDate(date, string, i) {
      return d3_time_parse(date, d3_time_formats.x.toString(), string, i);
    }
    function d3_time_parseLocaleTime(date, string, i) {
      return d3_time_parse(date, d3_time_formats.X.toString(), string, i);
    }
    function d3_time_parseAmPm(date, string, i) {
      var n = d3_time_periodLookup.get(string.slice(i, i += 2).toLowerCase());
      return n == null ? -1 : (date.p = n, i);
    }
    return d3_time_format;
  }
  var d3_time_formatPads = {
    "-": "",
    _: " ",
    "0": "0"
  }, d3_time_numberRe = /^\s*\d+/, d3_time_percentRe = /^%/;
  function d3_time_formatPad(value, fill, width) {
    var sign = value < 0 ? "-" : "", string = (sign ? -value : value) + "", length = string.length;
    return sign + (length < width ? new Array(width - length + 1).join(fill) + string : string);
  }
  function d3_time_formatRe(names) {
    return new RegExp("^(?:" + names.map(d3.requote).join("|") + ")", "i");
  }
  function d3_time_formatLookup(names) {
    var map = new d3_Map(), i = -1, n = names.length;
    while (++i < n) map.set(names[i].toLowerCase(), i);
    return map;
  }
  function d3_time_parseWeekdayNumber(date, string, i) {
    d3_time_numberRe.lastIndex = 0;
    var n = d3_time_numberRe.exec(string.slice(i, i + 1));
    return n ? (date.w = +n[0], i + n[0].length) : -1;
  }
  function d3_time_parseWeekNumberSunday(date, string, i) {
    d3_time_numberRe.lastIndex = 0;
    var n = d3_time_numberRe.exec(string.slice(i));
    return n ? (date.U = +n[0], i + n[0].length) : -1;
  }
  function d3_time_parseWeekNumberMonday(date, string, i) {
    d3_time_numberRe.lastIndex = 0;
    var n = d3_time_numberRe.exec(string.slice(i));
    return n ? (date.W = +n[0], i + n[0].length) : -1;
  }
  function d3_time_parseFullYear(date, string, i) {
    d3_time_numberRe.lastIndex = 0;
    var n = d3_time_numberRe.exec(string.slice(i, i + 4));
    return n ? (date.y = +n[0], i + n[0].length) : -1;
  }
  function d3_time_parseYear(date, string, i) {
    d3_time_numberRe.lastIndex = 0;
    var n = d3_time_numberRe.exec(string.slice(i, i + 2));
    return n ? (date.y = d3_time_expandYear(+n[0]), i + n[0].length) : -1;
  }
  function d3_time_parseZone(date, string, i) {
    return /^[+-]\d{4}$/.test(string = string.slice(i, i + 5)) ? (date.Z = -string, 
    i + 5) : -1;
  }
  function d3_time_expandYear(d) {
    return d + (d > 68 ? 1900 : 2e3);
  }
  function d3_time_parseMonthNumber(date, string, i) {
    d3_time_numberRe.lastIndex = 0;
    var n = d3_time_numberRe.exec(string.slice(i, i + 2));
    return n ? (date.m = n[0] - 1, i + n[0].length) : -1;
  }
  function d3_time_parseDay(date, string, i) {
    d3_time_numberRe.lastIndex = 0;
    var n = d3_time_numberRe.exec(string.slice(i, i + 2));
    return n ? (date.d = +n[0], i + n[0].length) : -1;
  }
  function d3_time_parseDayOfYear(date, string, i) {
    d3_time_numberRe.lastIndex = 0;
    var n = d3_time_numberRe.exec(string.slice(i, i + 3));
    return n ? (date.j = +n[0], i + n[0].length) : -1;
  }
  function d3_time_parseHour24(date, string, i) {
    d3_time_numberRe.lastIndex = 0;
    var n = d3_time_numberRe.exec(string.slice(i, i + 2));
    return n ? (date.H = +n[0], i + n[0].length) : -1;
  }
  function d3_time_parseMinutes(date, string, i) {
    d3_time_numberRe.lastIndex = 0;
    var n = d3_time_numberRe.exec(string.slice(i, i + 2));
    return n ? (date.M = +n[0], i + n[0].length) : -1;
  }
  function d3_time_parseSeconds(date, string, i) {
    d3_time_numberRe.lastIndex = 0;
    var n = d3_time_numberRe.exec(string.slice(i, i + 2));
    return n ? (date.S = +n[0], i + n[0].length) : -1;
  }
  function d3_time_parseMilliseconds(date, string, i) {
    d3_time_numberRe.lastIndex = 0;
    var n = d3_time_numberRe.exec(string.slice(i, i + 3));
    return n ? (date.L = +n[0], i + n[0].length) : -1;
  }
  function d3_time_zone(d) {
    var z = d.getTimezoneOffset(), zs = z > 0 ? "-" : "+", zh = abs(z) / 60 | 0, zm = abs(z) % 60;
    return zs + d3_time_formatPad(zh, "0", 2) + d3_time_formatPad(zm, "0", 2);
  }
  function d3_time_parseLiteralPercent(date, string, i) {
    d3_time_percentRe.lastIndex = 0;
    var n = d3_time_percentRe.exec(string.slice(i, i + 1));
    return n ? i + n[0].length : -1;
  }
  function d3_time_formatMulti(formats) {
    var n = formats.length, i = -1;
    while (++i < n) formats[i][0] = this(formats[i][0]);
    return function(date) {
      var i = 0, f = formats[i];
      while (!f[1](date)) f = formats[++i];
      return f[0](date);
    };
  }
  d3.locale = function(locale) {
    return {
      numberFormat: d3_locale_numberFormat(locale),
      timeFormat: d3_locale_timeFormat(locale)
    };
  };
  var d3_locale_enUS = d3.locale({
    decimal: ".",
    thousands: ",",
    grouping: [ 3 ],
    currency: [ "$", "" ],
    dateTime: "%a %b %e %X %Y",
    date: "%m/%d/%Y",
    time: "%H:%M:%S",
    periods: [ "AM", "PM" ],
    days: [ "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday" ],
    shortDays: [ "Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat" ],
    months: [ "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December" ],
    shortMonths: [ "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec" ]
  });
  d3.format = d3_locale_enUS.numberFormat;
  d3.geo = {};
  function d3_adder() {}
  d3_adder.prototype = {
    s: 0,
    t: 0,
    add: function(y) {
      d3_adderSum(y, this.t, d3_adderTemp);
      d3_adderSum(d3_adderTemp.s, this.s, this);
      if (this.s) this.t += d3_adderTemp.t; else this.s = d3_adderTemp.t;
    },
    reset: function() {
      this.s = this.t = 0;
    },
    valueOf: function() {
      return this.s;
    }
  };
  var d3_adderTemp = new d3_adder();
  function d3_adderSum(a, b, o) {
    var x = o.s = a + b, bv = x - a, av = x - bv;
    o.t = a - av + (b - bv);
  }
  d3.geo.stream = function(object, listener) {
    if (object && d3_geo_streamObjectType.hasOwnProperty(object.type)) {
      d3_geo_streamObjectType[object.type](object, listener);
    } else {
      d3_geo_streamGeometry(object, listener);
    }
  };
  function d3_geo_streamGeometry(geometry, listener) {
    if (geometry && d3_geo_streamGeometryType.hasOwnProperty(geometry.type)) {
      d3_geo_streamGeometryType[geometry.type](geometry, listener);
    }
  }
  var d3_geo_streamObjectType = {
    Feature: function(feature, listener) {
      d3_geo_streamGeometry(feature.geometry, listener);
    },
    FeatureCollection: function(object, listener) {
      var features = object.features, i = -1, n = features.length;
      while (++i < n) d3_geo_streamGeometry(features[i].geometry, listener);
    }
  };
  var d3_geo_streamGeometryType = {
    Sphere: function(object, listener) {
      listener.sphere();
    },
    Point: function(object, listener) {
      object = object.coordinates;
      listener.point(object[0], object[1], object[2]);
    },
    MultiPoint: function(object, listener) {
      var coordinates = object.coordinates, i = -1, n = coordinates.length;
      while (++i < n) object = coordinates[i], listener.point(object[0], object[1], object[2]);
    },
    LineString: function(object, listener) {
      d3_geo_streamLine(object.coordinates, listener, 0);
    },
    MultiLineString: function(object, listener) {
      var coordinates = object.coordinates, i = -1, n = coordinates.length;
      while (++i < n) d3_geo_streamLine(coordinates[i], listener, 0);
    },
    Polygon: function(object, listener) {
      d3_geo_streamPolygon(object.coordinates, listener);
    },
    MultiPolygon: function(object, listener) {
      var coordinates = object.coordinates, i = -1, n = coordinates.length;
      while (++i < n) d3_geo_streamPolygon(coordinates[i], listener);
    },
    GeometryCollection: function(object, listener) {
      var geometries = object.geometries, i = -1, n = geometries.length;
      while (++i < n) d3_geo_streamGeometry(geometries[i], listener);
    }
  };
  function d3_geo_streamLine(coordinates, listener, closed) {
    var i = -1, n = coordinates.length - closed, coordinate;
    listener.lineStart();
    while (++i < n) coordinate = coordinates[i], listener.point(coordinate[0], coordinate[1], coordinate[2]);
    listener.lineEnd();
  }
  function d3_geo_streamPolygon(coordinates, listener) {
    var i = -1, n = coordinates.length;
    listener.polygonStart();
    while (++i < n) d3_geo_streamLine(coordinates[i], listener, 1);
    listener.polygonEnd();
  }
  d3.geo.area = function(object) {
    d3_geo_areaSum = 0;
    d3.geo.stream(object, d3_geo_area);
    return d3_geo_areaSum;
  };
  var d3_geo_areaSum, d3_geo_areaRingSum = new d3_adder();
  var d3_geo_area = {
    sphere: function() {
      d3_geo_areaSum += 4 * π;
    },
    point: d3_noop,
    lineStart: d3_noop,
    lineEnd: d3_noop,
    polygonStart: function() {
      d3_geo_areaRingSum.reset();
      d3_geo_area.lineStart = d3_geo_areaRingStart;
    },
    polygonEnd: function() {
      var area = 2 * d3_geo_areaRingSum;
      d3_geo_areaSum += area < 0 ? 4 * π + area : area;
      d3_geo_area.lineStart = d3_geo_area.lineEnd = d3_geo_area.point = d3_noop;
    }
  };
  function d3_geo_areaRingStart() {
    var λ00, φ00, λ0, cosφ0, sinφ0;
    d3_geo_area.point = function(λ, φ) {
      d3_geo_area.point = nextPoint;
      λ0 = (λ00 = λ) * d3_radians, cosφ0 = Math.cos(φ = (φ00 = φ) * d3_radians / 2 + π / 4), 
      sinφ0 = Math.sin(φ);
    };
    function nextPoint(λ, φ) {
      λ *= d3_radians;
      φ = φ * d3_radians / 2 + π / 4;
      var dλ = λ - λ0, sdλ = dλ >= 0 ? 1 : -1, adλ = sdλ * dλ, cosφ = Math.cos(φ), sinφ = Math.sin(φ), k = sinφ0 * sinφ, u = cosφ0 * cosφ + k * Math.cos(adλ), v = k * sdλ * Math.sin(adλ);
      d3_geo_areaRingSum.add(Math.atan2(v, u));
      λ0 = λ, cosφ0 = cosφ, sinφ0 = sinφ;
    }
    d3_geo_area.lineEnd = function() {
      nextPoint(λ00, φ00);
    };
  }
  function d3_geo_cartesian(spherical) {
    var λ = spherical[0], φ = spherical[1], cosφ = Math.cos(φ);
    return [ cosφ * Math.cos(λ), cosφ * Math.sin(λ), Math.sin(φ) ];
  }
  function d3_geo_cartesianDot(a, b) {
    return a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
  }
  function d3_geo_cartesianCross(a, b) {
    return [ a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0] ];
  }
  function d3_geo_cartesianAdd(a, b) {
    a[0] += b[0];
    a[1] += b[1];
    a[2] += b[2];
  }
  function d3_geo_cartesianScale(vector, k) {
    return [ vector[0] * k, vector[1] * k, vector[2] * k ];
  }
  function d3_geo_cartesianNormalize(d) {
    var l = Math.sqrt(d[0] * d[0] + d[1] * d[1] + d[2] * d[2]);
    d[0] /= l;
    d[1] /= l;
    d[2] /= l;
  }
  function d3_geo_spherical(cartesian) {
    return [ Math.atan2(cartesian[1], cartesian[0]), d3_asin(cartesian[2]) ];
  }
  function d3_geo_sphericalEqual(a, b) {
    return abs(a[0] - b[0]) < ε && abs(a[1] - b[1]) < ε;
  }
  d3.geo.bounds = function() {
    var λ0, φ0, λ1, φ1, λ_, λ__, φ__, p0, dλSum, ranges, range;
    var bound = {
      point: point,
      lineStart: lineStart,
      lineEnd: lineEnd,
      polygonStart: function() {
        bound.point = ringPoint;
        bound.lineStart = ringStart;
        bound.lineEnd = ringEnd;
        dλSum = 0;
        d3_geo_area.polygonStart();
      },
      polygonEnd: function() {
        d3_geo_area.polygonEnd();
        bound.point = point;
        bound.lineStart = lineStart;
        bound.lineEnd = lineEnd;
        if (d3_geo_areaRingSum < 0) λ0 = -(λ1 = 180), φ0 = -(φ1 = 90); else if (dλSum > ε) φ1 = 90; else if (dλSum < -ε) φ0 = -90;
        range[0] = λ0, range[1] = λ1;
      }
    };
    function point(λ, φ) {
      ranges.push(range = [ λ0 = λ, λ1 = λ ]);
      if (φ < φ0) φ0 = φ;
      if (φ > φ1) φ1 = φ;
    }
    function linePoint(λ, φ) {
      var p = d3_geo_cartesian([ λ * d3_radians, φ * d3_radians ]);
      if (p0) {
        var normal = d3_geo_cartesianCross(p0, p), equatorial = [ normal[1], -normal[0], 0 ], inflection = d3_geo_cartesianCross(equatorial, normal);
        d3_geo_cartesianNormalize(inflection);
        inflection = d3_geo_spherical(inflection);
        var dλ = λ - λ_, s = dλ > 0 ? 1 : -1, λi = inflection[0] * d3_degrees * s, antimeridian = abs(dλ) > 180;
        if (antimeridian ^ (s * λ_ < λi && λi < s * λ)) {
          var φi = inflection[1] * d3_degrees;
          if (φi > φ1) φ1 = φi;
        } else if (λi = (λi + 360) % 360 - 180, antimeridian ^ (s * λ_ < λi && λi < s * λ)) {
          var φi = -inflection[1] * d3_degrees;
          if (φi < φ0) φ0 = φi;
        } else {
          if (φ < φ0) φ0 = φ;
          if (φ > φ1) φ1 = φ;
        }
        if (antimeridian) {
          if (λ < λ_) {
            if (angle(λ0, λ) > angle(λ0, λ1)) λ1 = λ;
          } else {
            if (angle(λ, λ1) > angle(λ0, λ1)) λ0 = λ;
          }
        } else {
          if (λ1 >= λ0) {
            if (λ < λ0) λ0 = λ;
            if (λ > λ1) λ1 = λ;
          } else {
            if (λ > λ_) {
              if (angle(λ0, λ) > angle(λ0, λ1)) λ1 = λ;
            } else {
              if (angle(λ, λ1) > angle(λ0, λ1)) λ0 = λ;
            }
          }
        }
      } else {
        point(λ, φ);
      }
      p0 = p, λ_ = λ;
    }
    function lineStart() {
      bound.point = linePoint;
    }
    function lineEnd() {
      range[0] = λ0, range[1] = λ1;
      bound.point = point;
      p0 = null;
    }
    function ringPoint(λ, φ) {
      if (p0) {
        var dλ = λ - λ_;
        dλSum += abs(dλ) > 180 ? dλ + (dλ > 0 ? 360 : -360) : dλ;
      } else λ__ = λ, φ__ = φ;
      d3_geo_area.point(λ, φ);
      linePoint(λ, φ);
    }
    function ringStart() {
      d3_geo_area.lineStart();
    }
    function ringEnd() {
      ringPoint(λ__, φ__);
      d3_geo_area.lineEnd();
      if (abs(dλSum) > ε) λ0 = -(λ1 = 180);
      range[0] = λ0, range[1] = λ1;
      p0 = null;
    }
    function angle(λ0, λ1) {
      return (λ1 -= λ0) < 0 ? λ1 + 360 : λ1;
    }
    function compareRanges(a, b) {
      return a[0] - b[0];
    }
    function withinRange(x, range) {
      return range[0] <= range[1] ? range[0] <= x && x <= range[1] : x < range[0] || range[1] < x;
    }
    return function(feature) {
      φ1 = λ1 = -(λ0 = φ0 = Infinity);
      ranges = [];
      d3.geo.stream(feature, bound);
      var n = ranges.length;
      if (n) {
        ranges.sort(compareRanges);
        for (var i = 1, a = ranges[0], b, merged = [ a ]; i < n; ++i) {
          b = ranges[i];
          if (withinRange(b[0], a) || withinRange(b[1], a)) {
            if (angle(a[0], b[1]) > angle(a[0], a[1])) a[1] = b[1];
            if (angle(b[0], a[1]) > angle(a[0], a[1])) a[0] = b[0];
          } else {
            merged.push(a = b);
          }
        }
        var best = -Infinity, dλ;
        for (var n = merged.length - 1, i = 0, a = merged[n], b; i <= n; a = b, ++i) {
          b = merged[i];
          if ((dλ = angle(a[1], b[0])) > best) best = dλ, λ0 = b[0], λ1 = a[1];
        }
      }
      ranges = range = null;
      return λ0 === Infinity || φ0 === Infinity ? [ [ NaN, NaN ], [ NaN, NaN ] ] : [ [ λ0, φ0 ], [ λ1, φ1 ] ];
    };
  }();
  d3.geo.centroid = function(object) {
    d3_geo_centroidW0 = d3_geo_centroidW1 = d3_geo_centroidX0 = d3_geo_centroidY0 = d3_geo_centroidZ0 = d3_geo_centroidX1 = d3_geo_centroidY1 = d3_geo_centroidZ1 = d3_geo_centroidX2 = d3_geo_centroidY2 = d3_geo_centroidZ2 = 0;
    d3.geo.stream(object, d3_geo_centroid);
    var x = d3_geo_centroidX2, y = d3_geo_centroidY2, z = d3_geo_centroidZ2, m = x * x + y * y + z * z;
    if (m < ε2) {
      x = d3_geo_centroidX1, y = d3_geo_centroidY1, z = d3_geo_centroidZ1;
      if (d3_geo_centroidW1 < ε) x = d3_geo_centroidX0, y = d3_geo_centroidY0, z = d3_geo_centroidZ0;
      m = x * x + y * y + z * z;
      if (m < ε2) return [ NaN, NaN ];
    }
    return [ Math.atan2(y, x) * d3_degrees, d3_asin(z / Math.sqrt(m)) * d3_degrees ];
  };
  var d3_geo_centroidW0, d3_geo_centroidW1, d3_geo_centroidX0, d3_geo_centroidY0, d3_geo_centroidZ0, d3_geo_centroidX1, d3_geo_centroidY1, d3_geo_centroidZ1, d3_geo_centroidX2, d3_geo_centroidY2, d3_geo_centroidZ2;
  var d3_geo_centroid = {
    sphere: d3_noop,
    point: d3_geo_centroidPoint,
    lineStart: d3_geo_centroidLineStart,
    lineEnd: d3_geo_centroidLineEnd,
    polygonStart: function() {
      d3_geo_centroid.lineStart = d3_geo_centroidRingStart;
    },
    polygonEnd: function() {
      d3_geo_centroid.lineStart = d3_geo_centroidLineStart;
    }
  };
  function d3_geo_centroidPoint(λ, φ) {
    λ *= d3_radians;
    var cosφ = Math.cos(φ *= d3_radians);
    d3_geo_centroidPointXYZ(cosφ * Math.cos(λ), cosφ * Math.sin(λ), Math.sin(φ));
  }
  function d3_geo_centroidPointXYZ(x, y, z) {
    ++d3_geo_centroidW0;
    d3_geo_centroidX0 += (x - d3_geo_centroidX0) / d3_geo_centroidW0;
    d3_geo_centroidY0 += (y - d3_geo_centroidY0) / d3_geo_centroidW0;
    d3_geo_centroidZ0 += (z - d3_geo_centroidZ0) / d3_geo_centroidW0;
  }
  function d3_geo_centroidLineStart() {
    var x0, y0, z0;
    d3_geo_centroid.point = function(λ, φ) {
      λ *= d3_radians;
      var cosφ = Math.cos(φ *= d3_radians);
      x0 = cosφ * Math.cos(λ);
      y0 = cosφ * Math.sin(λ);
      z0 = Math.sin(φ);
      d3_geo_centroid.point = nextPoint;
      d3_geo_centroidPointXYZ(x0, y0, z0);
    };
    function nextPoint(λ, φ) {
      λ *= d3_radians;
      var cosφ = Math.cos(φ *= d3_radians), x = cosφ * Math.cos(λ), y = cosφ * Math.sin(λ), z = Math.sin(φ), w = Math.atan2(Math.sqrt((w = y0 * z - z0 * y) * w + (w = z0 * x - x0 * z) * w + (w = x0 * y - y0 * x) * w), x0 * x + y0 * y + z0 * z);
      d3_geo_centroidW1 += w;
      d3_geo_centroidX1 += w * (x0 + (x0 = x));
      d3_geo_centroidY1 += w * (y0 + (y0 = y));
      d3_geo_centroidZ1 += w * (z0 + (z0 = z));
      d3_geo_centroidPointXYZ(x0, y0, z0);
    }
  }
  function d3_geo_centroidLineEnd() {
    d3_geo_centroid.point = d3_geo_centroidPoint;
  }
  function d3_geo_centroidRingStart() {
    var λ00, φ00, x0, y0, z0;
    d3_geo_centroid.point = function(λ, φ) {
      λ00 = λ, φ00 = φ;
      d3_geo_centroid.point = nextPoint;
      λ *= d3_radians;
      var cosφ = Math.cos(φ *= d3_radians);
      x0 = cosφ * Math.cos(λ);
      y0 = cosφ * Math.sin(λ);
      z0 = Math.sin(φ);
      d3_geo_centroidPointXYZ(x0, y0, z0);
    };
    d3_geo_centroid.lineEnd = function() {
      nextPoint(λ00, φ00);
      d3_geo_centroid.lineEnd = d3_geo_centroidLineEnd;
      d3_geo_centroid.point = d3_geo_centroidPoint;
    };
    function nextPoint(λ, φ) {
      λ *= d3_radians;
      var cosφ = Math.cos(φ *= d3_radians), x = cosφ * Math.cos(λ), y = cosφ * Math.sin(λ), z = Math.sin(φ), cx = y0 * z - z0 * y, cy = z0 * x - x0 * z, cz = x0 * y - y0 * x, m = Math.sqrt(cx * cx + cy * cy + cz * cz), u = x0 * x + y0 * y + z0 * z, v = m && -d3_acos(u) / m, w = Math.atan2(m, u);
      d3_geo_centroidX2 += v * cx;
      d3_geo_centroidY2 += v * cy;
      d3_geo_centroidZ2 += v * cz;
      d3_geo_centroidW1 += w;
      d3_geo_centroidX1 += w * (x0 + (x0 = x));
      d3_geo_centroidY1 += w * (y0 + (y0 = y));
      d3_geo_centroidZ1 += w * (z0 + (z0 = z));
      d3_geo_centroidPointXYZ(x0, y0, z0);
    }
  }
  function d3_geo_compose(a, b) {
    function compose(x, y) {
      return x = a(x, y), b(x[0], x[1]);
    }
    if (a.invert && b.invert) compose.invert = function(x, y) {
      return x = b.invert(x, y), x && a.invert(x[0], x[1]);
    };
    return compose;
  }
  function d3_true() {
    return true;
  }
  function d3_geo_clipPolygon(segments, compare, clipStartInside, interpolate, listener) {
    var subject = [], clip = [];
    segments.forEach(function(segment) {
      if ((n = segment.length - 1) <= 0) return;
      var n, p0 = segment[0], p1 = segment[n];
      if (d3_geo_sphericalEqual(p0, p1)) {
        listener.lineStart();
        for (var i = 0; i < n; ++i) listener.point((p0 = segment[i])[0], p0[1]);
        listener.lineEnd();
        return;
      }
      var a = new d3_geo_clipPolygonIntersection(p0, segment, null, true), b = new d3_geo_clipPolygonIntersection(p0, null, a, false);
      a.o = b;
      subject.push(a);
      clip.push(b);
      a = new d3_geo_clipPolygonIntersection(p1, segment, null, false);
      b = new d3_geo_clipPolygonIntersection(p1, null, a, true);
      a.o = b;
      subject.push(a);
      clip.push(b);
    });
    clip.sort(compare);
    d3_geo_clipPolygonLinkCircular(subject);
    d3_geo_clipPolygonLinkCircular(clip);
    if (!subject.length) return;
    for (var i = 0, entry = clipStartInside, n = clip.length; i < n; ++i) {
      clip[i].e = entry = !entry;
    }
    var start = subject[0], points, point;
    while (1) {
      var current = start, isSubject = true;
      while (current.v) if ((current = current.n) === start) return;
      points = current.z;
      listener.lineStart();
      do {
        current.v = current.o.v = true;
        if (current.e) {
          if (isSubject) {
            for (var i = 0, n = points.length; i < n; ++i) listener.point((point = points[i])[0], point[1]);
          } else {
            interpolate(current.x, current.n.x, 1, listener);
          }
          current = current.n;
        } else {
          if (isSubject) {
            points = current.p.z;
            for (var i = points.length - 1; i >= 0; --i) listener.point((point = points[i])[0], point[1]);
          } else {
            interpolate(current.x, current.p.x, -1, listener);
          }
          current = current.p;
        }
        current = current.o;
        points = current.z;
        isSubject = !isSubject;
      } while (!current.v);
      listener.lineEnd();
    }
  }
  function d3_geo_clipPolygonLinkCircular(array) {
    if (!(n = array.length)) return;
    var n, i = 0, a = array[0], b;
    while (++i < n) {
      a.n = b = array[i];
      b.p = a;
      a = b;
    }
    a.n = b = array[0];
    b.p = a;
  }
  function d3_geo_clipPolygonIntersection(point, points, other, entry) {
    this.x = point;
    this.z = points;
    this.o = other;
    this.e = entry;
    this.v = false;
    this.n = this.p = null;
  }
  function d3_geo_clip(pointVisible, clipLine, interpolate, clipStart) {
    return function(rotate, listener) {
      var line = clipLine(listener), rotatedClipStart = rotate.invert(clipStart[0], clipStart[1]);
      var clip = {
        point: point,
        lineStart: lineStart,
        lineEnd: lineEnd,
        polygonStart: function() {
          clip.point = pointRing;
          clip.lineStart = ringStart;
          clip.lineEnd = ringEnd;
          segments = [];
          polygon = [];
        },
        polygonEnd: function() {
          clip.point = point;
          clip.lineStart = lineStart;
          clip.lineEnd = lineEnd;
          segments = d3.merge(segments);
          var clipStartInside = d3_geo_pointInPolygon(rotatedClipStart, polygon);
          if (segments.length) {
            if (!polygonStarted) listener.polygonStart(), polygonStarted = true;
            d3_geo_clipPolygon(segments, d3_geo_clipSort, clipStartInside, interpolate, listener);
          } else if (clipStartInside) {
            if (!polygonStarted) listener.polygonStart(), polygonStarted = true;
            listener.lineStart();
            interpolate(null, null, 1, listener);
            listener.lineEnd();
          }
          if (polygonStarted) listener.polygonEnd(), polygonStarted = false;
          segments = polygon = null;
        },
        sphere: function() {
          listener.polygonStart();
          listener.lineStart();
          interpolate(null, null, 1, listener);
          listener.lineEnd();
          listener.polygonEnd();
        }
      };
      function point(λ, φ) {
        var point = rotate(λ, φ);
        if (pointVisible(λ = point[0], φ = point[1])) listener.point(λ, φ);
      }
      function pointLine(λ, φ) {
        var point = rotate(λ, φ);
        line.point(point[0], point[1]);
      }
      function lineStart() {
        clip.point = pointLine;
        line.lineStart();
      }
      function lineEnd() {
        clip.point = point;
        line.lineEnd();
      }
      var segments;
      var buffer = d3_geo_clipBufferListener(), ringListener = clipLine(buffer), polygonStarted = false, polygon, ring;
      function pointRing(λ, φ) {
        ring.push([ λ, φ ]);
        var point = rotate(λ, φ);
        ringListener.point(point[0], point[1]);
      }
      function ringStart() {
        ringListener.lineStart();
        ring = [];
      }
      function ringEnd() {
        pointRing(ring[0][0], ring[0][1]);
        ringListener.lineEnd();
        var clean = ringListener.clean(), ringSegments = buffer.buffer(), segment, n = ringSegments.length;
        ring.pop();
        polygon.push(ring);
        ring = null;
        if (!n) return;
        if (clean & 1) {
          segment = ringSegments[0];
          var n = segment.length - 1, i = -1, point;
          if (n > 0) {
            if (!polygonStarted) listener.polygonStart(), polygonStarted = true;
            listener.lineStart();
            while (++i < n) listener.point((point = segment[i])[0], point[1]);
            listener.lineEnd();
          }
          return;
        }
        if (n > 1 && clean & 2) ringSegments.push(ringSegments.pop().concat(ringSegments.shift()));
        segments.push(ringSegments.filter(d3_geo_clipSegmentLength1));
      }
      return clip;
    };
  }
  function d3_geo_clipSegmentLength1(segment) {
    return segment.length > 1;
  }
  function d3_geo_clipBufferListener() {
    var lines = [], line;
    return {
      lineStart: function() {
        lines.push(line = []);
      },
      point: function(λ, φ) {
        line.push([ λ, φ ]);
      },
      lineEnd: d3_noop,
      buffer: function() {
        var buffer = lines;
        lines = [];
        line = null;
        return buffer;
      },
      rejoin: function() {
        if (lines.length > 1) lines.push(lines.pop().concat(lines.shift()));
      }
    };
  }
  function d3_geo_clipSort(a, b) {
    return ((a = a.x)[0] < 0 ? a[1] - halfπ - ε : halfπ - a[1]) - ((b = b.x)[0] < 0 ? b[1] - halfπ - ε : halfπ - b[1]);
  }
  var d3_geo_clipAntimeridian = d3_geo_clip(d3_true, d3_geo_clipAntimeridianLine, d3_geo_clipAntimeridianInterpolate, [ -π, -π / 2 ]);
  function d3_geo_clipAntimeridianLine(listener) {
    var λ0 = NaN, φ0 = NaN, sλ0 = NaN, clean;
    return {
      lineStart: function() {
        listener.lineStart();
        clean = 1;
      },
      point: function(λ1, φ1) {
        var sλ1 = λ1 > 0 ? π : -π, dλ = abs(λ1 - λ0);
        if (abs(dλ - π) < ε) {
          listener.point(λ0, φ0 = (φ0 + φ1) / 2 > 0 ? halfπ : -halfπ);
          listener.point(sλ0, φ0);
          listener.lineEnd();
          listener.lineStart();
          listener.point(sλ1, φ0);
          listener.point(λ1, φ0);
          clean = 0;
        } else if (sλ0 !== sλ1 && dλ >= π) {
          if (abs(λ0 - sλ0) < ε) λ0 -= sλ0 * ε;
          if (abs(λ1 - sλ1) < ε) λ1 -= sλ1 * ε;
          φ0 = d3_geo_clipAntimeridianIntersect(λ0, φ0, λ1, φ1);
          listener.point(sλ0, φ0);
          listener.lineEnd();
          listener.lineStart();
          listener.point(sλ1, φ0);
          clean = 0;
        }
        listener.point(λ0 = λ1, φ0 = φ1);
        sλ0 = sλ1;
      },
      lineEnd: function() {
        listener.lineEnd();
        λ0 = φ0 = NaN;
      },
      clean: function() {
        return 2 - clean;
      }
    };
  }
  function d3_geo_clipAntimeridianIntersect(λ0, φ0, λ1, φ1) {
    var cosφ0, cosφ1, sinλ0_λ1 = Math.sin(λ0 - λ1);
    return abs(sinλ0_λ1) > ε ? Math.atan((Math.sin(φ0) * (cosφ1 = Math.cos(φ1)) * Math.sin(λ1) - Math.sin(φ1) * (cosφ0 = Math.cos(φ0)) * Math.sin(λ0)) / (cosφ0 * cosφ1 * sinλ0_λ1)) : (φ0 + φ1) / 2;
  }
  function d3_geo_clipAntimeridianInterpolate(from, to, direction, listener) {
    var φ;
    if (from == null) {
      φ = direction * halfπ;
      listener.point(-π, φ);
      listener.point(0, φ);
      listener.point(π, φ);
      listener.point(π, 0);
      listener.point(π, -φ);
      listener.point(0, -φ);
      listener.point(-π, -φ);
      listener.point(-π, 0);
      listener.point(-π, φ);
    } else if (abs(from[0] - to[0]) > ε) {
      var s = from[0] < to[0] ? π : -π;
      φ = direction * s / 2;
      listener.point(-s, φ);
      listener.point(0, φ);
      listener.point(s, φ);
    } else {
      listener.point(to[0], to[1]);
    }
  }
  function d3_geo_pointInPolygon(point, polygon) {
    var meridian = point[0], parallel = point[1], meridianNormal = [ Math.sin(meridian), -Math.cos(meridian), 0 ], polarAngle = 0, winding = 0;
    d3_geo_areaRingSum.reset();
    for (var i = 0, n = polygon.length; i < n; ++i) {
      var ring = polygon[i], m = ring.length;
      if (!m) continue;
      var point0 = ring[0], λ0 = point0[0], φ0 = point0[1] / 2 + π / 4, sinφ0 = Math.sin(φ0), cosφ0 = Math.cos(φ0), j = 1;
      while (true) {
        if (j === m) j = 0;
        point = ring[j];
        var λ = point[0], φ = point[1] / 2 + π / 4, sinφ = Math.sin(φ), cosφ = Math.cos(φ), dλ = λ - λ0, sdλ = dλ >= 0 ? 1 : -1, adλ = sdλ * dλ, antimeridian = adλ > π, k = sinφ0 * sinφ;
        d3_geo_areaRingSum.add(Math.atan2(k * sdλ * Math.sin(adλ), cosφ0 * cosφ + k * Math.cos(adλ)));
        polarAngle += antimeridian ? dλ + sdλ * τ : dλ;
        if (antimeridian ^ λ0 >= meridian ^ λ >= meridian) {
          var arc = d3_geo_cartesianCross(d3_geo_cartesian(point0), d3_geo_cartesian(point));
          d3_geo_cartesianNormalize(arc);
          var intersection = d3_geo_cartesianCross(meridianNormal, arc);
          d3_geo_cartesianNormalize(intersection);
          var φarc = (antimeridian ^ dλ >= 0 ? -1 : 1) * d3_asin(intersection[2]);
          if (parallel > φarc || parallel === φarc && (arc[0] || arc[1])) {
            winding += antimeridian ^ dλ >= 0 ? 1 : -1;
          }
        }
        if (!j++) break;
        λ0 = λ, sinφ0 = sinφ, cosφ0 = cosφ, point0 = point;
      }
    }
    return (polarAngle < -ε || polarAngle < ε && d3_geo_areaRingSum < -ε) ^ winding & 1;
  }
  function d3_geo_clipCircle(radius) {
    var cr = Math.cos(radius), smallRadius = cr > 0, notHemisphere = abs(cr) > ε, interpolate = d3_geo_circleInterpolate(radius, 6 * d3_radians);
    return d3_geo_clip(visible, clipLine, interpolate, smallRadius ? [ 0, -radius ] : [ -π, radius - π ]);
    function visible(λ, φ) {
      return Math.cos(λ) * Math.cos(φ) > cr;
    }
    function clipLine(listener) {
      var point0, c0, v0, v00, clean;
      return {
        lineStart: function() {
          v00 = v0 = false;
          clean = 1;
        },
        point: function(λ, φ) {
          var point1 = [ λ, φ ], point2, v = visible(λ, φ), c = smallRadius ? v ? 0 : code(λ, φ) : v ? code(λ + (λ < 0 ? π : -π), φ) : 0;
          if (!point0 && (v00 = v0 = v)) listener.lineStart();
          if (v !== v0) {
            point2 = intersect(point0, point1);
            if (d3_geo_sphericalEqual(point0, point2) || d3_geo_sphericalEqual(point1, point2)) {
              point1[0] += ε;
              point1[1] += ε;
              v = visible(point1[0], point1[1]);
            }
          }
          if (v !== v0) {
            clean = 0;
            if (v) {
              listener.lineStart();
              point2 = intersect(point1, point0);
              listener.point(point2[0], point2[1]);
            } else {
              point2 = intersect(point0, point1);
              listener.point(point2[0], point2[1]);
              listener.lineEnd();
            }
            point0 = point2;
          } else if (notHemisphere && point0 && smallRadius ^ v) {
            var t;
            if (!(c & c0) && (t = intersect(point1, point0, true))) {
              clean = 0;
              if (smallRadius) {
                listener.lineStart();
                listener.point(t[0][0], t[0][1]);
                listener.point(t[1][0], t[1][1]);
                listener.lineEnd();
              } else {
                listener.point(t[1][0], t[1][1]);
                listener.lineEnd();
                listener.lineStart();
                listener.point(t[0][0], t[0][1]);
              }
            }
          }
          if (v && (!point0 || !d3_geo_sphericalEqual(point0, point1))) {
            listener.point(point1[0], point1[1]);
          }
          point0 = point1, v0 = v, c0 = c;
        },
        lineEnd: function() {
          if (v0) listener.lineEnd();
          point0 = null;
        },
        clean: function() {
          return clean | (v00 && v0) << 1;
        }
      };
    }
    function intersect(a, b, two) {
      var pa = d3_geo_cartesian(a), pb = d3_geo_cartesian(b);
      var n1 = [ 1, 0, 0 ], n2 = d3_geo_cartesianCross(pa, pb), n2n2 = d3_geo_cartesianDot(n2, n2), n1n2 = n2[0], determinant = n2n2 - n1n2 * n1n2;
      if (!determinant) return !two && a;
      var c1 = cr * n2n2 / determinant, c2 = -cr * n1n2 / determinant, n1xn2 = d3_geo_cartesianCross(n1, n2), A = d3_geo_cartesianScale(n1, c1), B = d3_geo_cartesianScale(n2, c2);
      d3_geo_cartesianAdd(A, B);
      var u = n1xn2, w = d3_geo_cartesianDot(A, u), uu = d3_geo_cartesianDot(u, u), t2 = w * w - uu * (d3_geo_cartesianDot(A, A) - 1);
      if (t2 < 0) return;
      var t = Math.sqrt(t2), q = d3_geo_cartesianScale(u, (-w - t) / uu);
      d3_geo_cartesianAdd(q, A);
      q = d3_geo_spherical(q);
      if (!two) return q;
      var λ0 = a[0], λ1 = b[0], φ0 = a[1], φ1 = b[1], z;
      if (λ1 < λ0) z = λ0, λ0 = λ1, λ1 = z;
      var δλ = λ1 - λ0, polar = abs(δλ - π) < ε, meridian = polar || δλ < ε;
      if (!polar && φ1 < φ0) z = φ0, φ0 = φ1, φ1 = z;
      if (meridian ? polar ? φ0 + φ1 > 0 ^ q[1] < (abs(q[0] - λ0) < ε ? φ0 : φ1) : φ0 <= q[1] && q[1] <= φ1 : δλ > π ^ (λ0 <= q[0] && q[0] <= λ1)) {
        var q1 = d3_geo_cartesianScale(u, (-w + t) / uu);
        d3_geo_cartesianAdd(q1, A);
        return [ q, d3_geo_spherical(q1) ];
      }
    }
    function code(λ, φ) {
      var r = smallRadius ? radius : π - radius, code = 0;
      if (λ < -r) code |= 1; else if (λ > r) code |= 2;
      if (φ < -r) code |= 4; else if (φ > r) code |= 8;
      return code;
    }
  }
  function d3_geom_clipLine(x0, y0, x1, y1) {
    return function(line) {
      var a = line.a, b = line.b, ax = a.x, ay = a.y, bx = b.x, by = b.y, t0 = 0, t1 = 1, dx = bx - ax, dy = by - ay, r;
      r = x0 - ax;
      if (!dx && r > 0) return;
      r /= dx;
      if (dx < 0) {
        if (r < t0) return;
        if (r < t1) t1 = r;
      } else if (dx > 0) {
        if (r > t1) return;
        if (r > t0) t0 = r;
      }
      r = x1 - ax;
      if (!dx && r < 0) return;
      r /= dx;
      if (dx < 0) {
        if (r > t1) return;
        if (r > t0) t0 = r;
      } else if (dx > 0) {
        if (r < t0) return;
        if (r < t1) t1 = r;
      }
      r = y0 - ay;
      if (!dy && r > 0) return;
      r /= dy;
      if (dy < 0) {
        if (r < t0) return;
        if (r < t1) t1 = r;
      } else if (dy > 0) {
        if (r > t1) return;
        if (r > t0) t0 = r;
      }
      r = y1 - ay;
      if (!dy && r < 0) return;
      r /= dy;
      if (dy < 0) {
        if (r > t1) return;
        if (r > t0) t0 = r;
      } else if (dy > 0) {
        if (r < t0) return;
        if (r < t1) t1 = r;
      }
      if (t0 > 0) line.a = {
        x: ax + t0 * dx,
        y: ay + t0 * dy
      };
      if (t1 < 1) line.b = {
        x: ax + t1 * dx,
        y: ay + t1 * dy
      };
      return line;
    };
  }
  var d3_geo_clipExtentMAX = 1e9;
  d3.geo.clipExtent = function() {
    var x0, y0, x1, y1, stream, clip, clipExtent = {
      stream: function(output) {
        if (stream) stream.valid = false;
        stream = clip(output);
        stream.valid = true;
        return stream;
      },
      extent: function(_) {
        if (!arguments.length) return [ [ x0, y0 ], [ x1, y1 ] ];
        clip = d3_geo_clipExtent(x0 = +_[0][0], y0 = +_[0][1], x1 = +_[1][0], y1 = +_[1][1]);
        if (stream) stream.valid = false, stream = null;
        return clipExtent;
      }
    };
    return clipExtent.extent([ [ 0, 0 ], [ 960, 500 ] ]);
  };
  function d3_geo_clipExtent(x0, y0, x1, y1) {
    return function(listener) {
      var listener_ = listener, bufferListener = d3_geo_clipBufferListener(), clipLine = d3_geom_clipLine(x0, y0, x1, y1), segments, polygon, ring;
      var clip = {
        point: point,
        lineStart: lineStart,
        lineEnd: lineEnd,
        polygonStart: function() {
          listener = bufferListener;
          segments = [];
          polygon = [];
          clean = true;
        },
        polygonEnd: function() {
          listener = listener_;
          segments = d3.merge(segments);
          var clipStartInside = insidePolygon([ x0, y1 ]), inside = clean && clipStartInside, visible = segments.length;
          if (inside || visible) {
            listener.polygonStart();
            if (inside) {
              listener.lineStart();
              interpolate(null, null, 1, listener);
              listener.lineEnd();
            }
            if (visible) {
              d3_geo_clipPolygon(segments, compare, clipStartInside, interpolate, listener);
            }
            listener.polygonEnd();
          }
          segments = polygon = ring = null;
        }
      };
      function insidePolygon(p) {
        var wn = 0, n = polygon.length, y = p[1];
        for (var i = 0; i < n; ++i) {
          for (var j = 1, v = polygon[i], m = v.length, a = v[0], b; j < m; ++j) {
            b = v[j];
            if (a[1] <= y) {
              if (b[1] > y && d3_cross2d(a, b, p) > 0) ++wn;
            } else {
              if (b[1] <= y && d3_cross2d(a, b, p) < 0) --wn;
            }
            a = b;
          }
        }
        return wn !== 0;
      }
      function interpolate(from, to, direction, listener) {
        var a = 0, a1 = 0;
        if (from == null || (a = corner(from, direction)) !== (a1 = corner(to, direction)) || comparePoints(from, to) < 0 ^ direction > 0) {
          do {
            listener.point(a === 0 || a === 3 ? x0 : x1, a > 1 ? y1 : y0);
          } while ((a = (a + direction + 4) % 4) !== a1);
        } else {
          listener.point(to[0], to[1]);
        }
      }
      function pointVisible(x, y) {
        return x0 <= x && x <= x1 && y0 <= y && y <= y1;
      }
      function point(x, y) {
        if (pointVisible(x, y)) listener.point(x, y);
      }
      var x__, y__, v__, x_, y_, v_, first, clean;
      function lineStart() {
        clip.point = linePoint;
        if (polygon) polygon.push(ring = []);
        first = true;
        v_ = false;
        x_ = y_ = NaN;
      }
      function lineEnd() {
        if (segments) {
          linePoint(x__, y__);
          if (v__ && v_) bufferListener.rejoin();
          segments.push(bufferListener.buffer());
        }
        clip.point = point;
        if (v_) listener.lineEnd();
      }
      function linePoint(x, y) {
        x = Math.max(-d3_geo_clipExtentMAX, Math.min(d3_geo_clipExtentMAX, x));
        y = Math.max(-d3_geo_clipExtentMAX, Math.min(d3_geo_clipExtentMAX, y));
        var v = pointVisible(x, y);
        if (polygon) ring.push([ x, y ]);
        if (first) {
          x__ = x, y__ = y, v__ = v;
          first = false;
          if (v) {
            listener.lineStart();
            listener.point(x, y);
          }
        } else {
          if (v && v_) listener.point(x, y); else {
            var l = {
              a: {
                x: x_,
                y: y_
              },
              b: {
                x: x,
                y: y
              }
            };
            if (clipLine(l)) {
              if (!v_) {
                listener.lineStart();
                listener.point(l.a.x, l.a.y);
              }
              listener.point(l.b.x, l.b.y);
              if (!v) listener.lineEnd();
              clean = false;
            } else if (v) {
              listener.lineStart();
              listener.point(x, y);
              clean = false;
            }
          }
        }
        x_ = x, y_ = y, v_ = v;
      }
      return clip;
    };
    function corner(p, direction) {
      return abs(p[0] - x0) < ε ? direction > 0 ? 0 : 3 : abs(p[0] - x1) < ε ? direction > 0 ? 2 : 1 : abs(p[1] - y0) < ε ? direction > 0 ? 1 : 0 : direction > 0 ? 3 : 2;
    }
    function compare(a, b) {
      return comparePoints(a.x, b.x);
    }
    function comparePoints(a, b) {
      var ca = corner(a, 1), cb = corner(b, 1);
      return ca !== cb ? ca - cb : ca === 0 ? b[1] - a[1] : ca === 1 ? a[0] - b[0] : ca === 2 ? a[1] - b[1] : b[0] - a[0];
    }
  }
  function d3_geo_conic(projectAt) {
    var φ0 = 0, φ1 = π / 3, m = d3_geo_projectionMutator(projectAt), p = m(φ0, φ1);
    p.parallels = function(_) {
      if (!arguments.length) return [ φ0 / π * 180, φ1 / π * 180 ];
      return m(φ0 = _[0] * π / 180, φ1 = _[1] * π / 180);
    };
    return p;
  }
  function d3_geo_conicEqualArea(φ0, φ1) {
    var sinφ0 = Math.sin(φ0), n = (sinφ0 + Math.sin(φ1)) / 2, C = 1 + sinφ0 * (2 * n - sinφ0), ρ0 = Math.sqrt(C) / n;
    function forward(λ, φ) {
      var ρ = Math.sqrt(C - 2 * n * Math.sin(φ)) / n;
      return [ ρ * Math.sin(λ *= n), ρ0 - ρ * Math.cos(λ) ];
    }
    forward.invert = function(x, y) {
      var ρ0_y = ρ0 - y;
      return [ Math.atan2(x, ρ0_y) / n, d3_asin((C - (x * x + ρ0_y * ρ0_y) * n * n) / (2 * n)) ];
    };
    return forward;
  }
  (d3.geo.conicEqualArea = function() {
    return d3_geo_conic(d3_geo_conicEqualArea);
  }).raw = d3_geo_conicEqualArea;
  d3.geo.albers = function() {
    return d3.geo.conicEqualArea().rotate([ 96, 0 ]).center([ -.6, 38.7 ]).parallels([ 29.5, 45.5 ]).scale(1070);
  };
  d3.geo.albersUsa = function() {
    var lower48 = d3.geo.albers();
    var alaska = d3.geo.conicEqualArea().rotate([ 154, 0 ]).center([ -2, 58.5 ]).parallels([ 55, 65 ]);
    var hawaii = d3.geo.conicEqualArea().rotate([ 157, 0 ]).center([ -3, 19.9 ]).parallels([ 8, 18 ]);
    var point, pointStream = {
      point: function(x, y) {
        point = [ x, y ];
      }
    }, lower48Point, alaskaPoint, hawaiiPoint;
    function albersUsa(coordinates) {
      var x = coordinates[0], y = coordinates[1];
      point = null;
      (lower48Point(x, y), point) || (alaskaPoint(x, y), point) || hawaiiPoint(x, y);
      return point;
    }
    albersUsa.invert = function(coordinates) {
      var k = lower48.scale(), t = lower48.translate(), x = (coordinates[0] - t[0]) / k, y = (coordinates[1] - t[1]) / k;
      return (y >= .12 && y < .234 && x >= -.425 && x < -.214 ? alaska : y >= .166 && y < .234 && x >= -.214 && x < -.115 ? hawaii : lower48).invert(coordinates);
    };
    albersUsa.stream = function(stream) {
      var lower48Stream = lower48.stream(stream), alaskaStream = alaska.stream(stream), hawaiiStream = hawaii.stream(stream);
      return {
        point: function(x, y) {
          lower48Stream.point(x, y);
          alaskaStream.point(x, y);
          hawaiiStream.point(x, y);
        },
        sphere: function() {
          lower48Stream.sphere();
          alaskaStream.sphere();
          hawaiiStream.sphere();
        },
        lineStart: function() {
          lower48Stream.lineStart();
          alaskaStream.lineStart();
          hawaiiStream.lineStart();
        },
        lineEnd: function() {
          lower48Stream.lineEnd();
          alaskaStream.lineEnd();
          hawaiiStream.lineEnd();
        },
        polygonStart: function() {
          lower48Stream.polygonStart();
          alaskaStream.polygonStart();
          hawaiiStream.polygonStart();
        },
        polygonEnd: function() {
          lower48Stream.polygonEnd();
          alaskaStream.polygonEnd();
          hawaiiStream.polygonEnd();
        }
      };
    };
    albersUsa.precision = function(_) {
      if (!arguments.length) return lower48.precision();
      lower48.precision(_);
      alaska.precision(_);
      hawaii.precision(_);
      return albersUsa;
    };
    albersUsa.scale = function(_) {
      if (!arguments.length) return lower48.scale();
      lower48.scale(_);
      alaska.scale(_ * .35);
      hawaii.scale(_);
      return albersUsa.translate(lower48.translate());
    };
    albersUsa.translate = function(_) {
      if (!arguments.length) return lower48.translate();
      var k = lower48.scale(), x = +_[0], y = +_[1];
      lower48Point = lower48.translate(_).clipExtent([ [ x - .455 * k, y - .238 * k ], [ x + .455 * k, y + .238 * k ] ]).stream(pointStream).point;
      alaskaPoint = alaska.translate([ x - .307 * k, y + .201 * k ]).clipExtent([ [ x - .425 * k + ε, y + .12 * k + ε ], [ x - .214 * k - ε, y + .234 * k - ε ] ]).stream(pointStream).point;
      hawaiiPoint = hawaii.translate([ x - .205 * k, y + .212 * k ]).clipExtent([ [ x - .214 * k + ε, y + .166 * k + ε ], [ x - .115 * k - ε, y + .234 * k - ε ] ]).stream(pointStream).point;
      return albersUsa;
    };
    return albersUsa.scale(1070);
  };
  var d3_geo_pathAreaSum, d3_geo_pathAreaPolygon, d3_geo_pathArea = {
    point: d3_noop,
    lineStart: d3_noop,
    lineEnd: d3_noop,
    polygonStart: function() {
      d3_geo_pathAreaPolygon = 0;
      d3_geo_pathArea.lineStart = d3_geo_pathAreaRingStart;
    },
    polygonEnd: function() {
      d3_geo_pathArea.lineStart = d3_geo_pathArea.lineEnd = d3_geo_pathArea.point = d3_noop;
      d3_geo_pathAreaSum += abs(d3_geo_pathAreaPolygon / 2);
    }
  };
  function d3_geo_pathAreaRingStart() {
    var x00, y00, x0, y0;
    d3_geo_pathArea.point = function(x, y) {
      d3_geo_pathArea.point = nextPoint;
      x00 = x0 = x, y00 = y0 = y;
    };
    function nextPoint(x, y) {
      d3_geo_pathAreaPolygon += y0 * x - x0 * y;
      x0 = x, y0 = y;
    }
    d3_geo_pathArea.lineEnd = function() {
      nextPoint(x00, y00);
    };
  }
  var d3_geo_pathBoundsX0, d3_geo_pathBoundsY0, d3_geo_pathBoundsX1, d3_geo_pathBoundsY1;
  var d3_geo_pathBounds = {
    point: d3_geo_pathBoundsPoint,
    lineStart: d3_noop,
    lineEnd: d3_noop,
    polygonStart: d3_noop,
    polygonEnd: d3_noop
  };
  function d3_geo_pathBoundsPoint(x, y) {
    if (x < d3_geo_pathBoundsX0) d3_geo_pathBoundsX0 = x;
    if (x > d3_geo_pathBoundsX1) d3_geo_pathBoundsX1 = x;
    if (y < d3_geo_pathBoundsY0) d3_geo_pathBoundsY0 = y;
    if (y > d3_geo_pathBoundsY1) d3_geo_pathBoundsY1 = y;
  }
  function d3_geo_pathBuffer() {
    var pointCircle = d3_geo_pathBufferCircle(4.5), buffer = [];
    var stream = {
      point: point,
      lineStart: function() {
        stream.point = pointLineStart;
      },
      lineEnd: lineEnd,
      polygonStart: function() {
        stream.lineEnd = lineEndPolygon;
      },
      polygonEnd: function() {
        stream.lineEnd = lineEnd;
        stream.point = point;
      },
      pointRadius: function(_) {
        pointCircle = d3_geo_pathBufferCircle(_);
        return stream;
      },
      result: function() {
        if (buffer.length) {
          var result = buffer.join("");
          buffer = [];
          return result;
        }
      }
    };
    function point(x, y) {
      buffer.push("M", x, ",", y, pointCircle);
    }
    function pointLineStart(x, y) {
      buffer.push("M", x, ",", y);
      stream.point = pointLine;
    }
    function pointLine(x, y) {
      buffer.push("L", x, ",", y);
    }
    function lineEnd() {
      stream.point = point;
    }
    function lineEndPolygon() {
      buffer.push("Z");
    }
    return stream;
  }
  function d3_geo_pathBufferCircle(radius) {
    return "m0," + radius + "a" + radius + "," + radius + " 0 1,1 0," + -2 * radius + "a" + radius + "," + radius + " 0 1,1 0," + 2 * radius + "z";
  }
  var d3_geo_pathCentroid = {
    point: d3_geo_pathCentroidPoint,
    lineStart: d3_geo_pathCentroidLineStart,
    lineEnd: d3_geo_pathCentroidLineEnd,
    polygonStart: function() {
      d3_geo_pathCentroid.lineStart = d3_geo_pathCentroidRingStart;
    },
    polygonEnd: function() {
      d3_geo_pathCentroid.point = d3_geo_pathCentroidPoint;
      d3_geo_pathCentroid.lineStart = d3_geo_pathCentroidLineStart;
      d3_geo_pathCentroid.lineEnd = d3_geo_pathCentroidLineEnd;
    }
  };
  function d3_geo_pathCentroidPoint(x, y) {
    d3_geo_centroidX0 += x;
    d3_geo_centroidY0 += y;
    ++d3_geo_centroidZ0;
  }
  function d3_geo_pathCentroidLineStart() {
    var x0, y0;
    d3_geo_pathCentroid.point = function(x, y) {
      d3_geo_pathCentroid.point = nextPoint;
      d3_geo_pathCentroidPoint(x0 = x, y0 = y);
    };
    function nextPoint(x, y) {
      var dx = x - x0, dy = y - y0, z = Math.sqrt(dx * dx + dy * dy);
      d3_geo_centroidX1 += z * (x0 + x) / 2;
      d3_geo_centroidY1 += z * (y0 + y) / 2;
      d3_geo_centroidZ1 += z;
      d3_geo_pathCentroidPoint(x0 = x, y0 = y);
    }
  }
  function d3_geo_pathCentroidLineEnd() {
    d3_geo_pathCentroid.point = d3_geo_pathCentroidPoint;
  }
  function d3_geo_pathCentroidRingStart() {
    var x00, y00, x0, y0;
    d3_geo_pathCentroid.point = function(x, y) {
      d3_geo_pathCentroid.point = nextPoint;
      d3_geo_pathCentroidPoint(x00 = x0 = x, y00 = y0 = y);
    };
    function nextPoint(x, y) {
      var dx = x - x0, dy = y - y0, z = Math.sqrt(dx * dx + dy * dy);
      d3_geo_centroidX1 += z * (x0 + x) / 2;
      d3_geo_centroidY1 += z * (y0 + y) / 2;
      d3_geo_centroidZ1 += z;
      z = y0 * x - x0 * y;
      d3_geo_centroidX2 += z * (x0 + x);
      d3_geo_centroidY2 += z * (y0 + y);
      d3_geo_centroidZ2 += z * 3;
      d3_geo_pathCentroidPoint(x0 = x, y0 = y);
    }
    d3_geo_pathCentroid.lineEnd = function() {
      nextPoint(x00, y00);
    };
  }
  function d3_geo_pathContext(context) {
    var pointRadius = 4.5;
    var stream = {
      point: point,
      lineStart: function() {
        stream.point = pointLineStart;
      },
      lineEnd: lineEnd,
      polygonStart: function() {
        stream.lineEnd = lineEndPolygon;
      },
      polygonEnd: function() {
        stream.lineEnd = lineEnd;
        stream.point = point;
      },
      pointRadius: function(_) {
        pointRadius = _;
        return stream;
      },
      result: d3_noop
    };
    function point(x, y) {
      context.moveTo(x + pointRadius, y);
      context.arc(x, y, pointRadius, 0, τ);
    }
    function pointLineStart(x, y) {
      context.moveTo(x, y);
      stream.point = pointLine;
    }
    function pointLine(x, y) {
      context.lineTo(x, y);
    }
    function lineEnd() {
      stream.point = point;
    }
    function lineEndPolygon() {
      context.closePath();
    }
    return stream;
  }
  function d3_geo_resample(project) {
    var δ2 = .5, cosMinDistance = Math.cos(30 * d3_radians), maxDepth = 16;
    function resample(stream) {
      return (maxDepth ? resampleRecursive : resampleNone)(stream);
    }
    function resampleNone(stream) {
      return d3_geo_transformPoint(stream, function(x, y) {
        x = project(x, y);
        stream.point(x[0], x[1]);
      });
    }
    function resampleRecursive(stream) {
      var λ00, φ00, x00, y00, a00, b00, c00, λ0, x0, y0, a0, b0, c0;
      var resample = {
        point: point,
        lineStart: lineStart,
        lineEnd: lineEnd,
        polygonStart: function() {
          stream.polygonStart();
          resample.lineStart = ringStart;
        },
        polygonEnd: function() {
          stream.polygonEnd();
          resample.lineStart = lineStart;
        }
      };
      function point(x, y) {
        x = project(x, y);
        stream.point(x[0], x[1]);
      }
      function lineStart() {
        x0 = NaN;
        resample.point = linePoint;
        stream.lineStart();
      }
      function linePoint(λ, φ) {
        var c = d3_geo_cartesian([ λ, φ ]), p = project(λ, φ);
        resampleLineTo(x0, y0, λ0, a0, b0, c0, x0 = p[0], y0 = p[1], λ0 = λ, a0 = c[0], b0 = c[1], c0 = c[2], maxDepth, stream);
        stream.point(x0, y0);
      }
      function lineEnd() {
        resample.point = point;
        stream.lineEnd();
      }
      function ringStart() {
        lineStart();
        resample.point = ringPoint;
        resample.lineEnd = ringEnd;
      }
      function ringPoint(λ, φ) {
        linePoint(λ00 = λ, φ00 = φ), x00 = x0, y00 = y0, a00 = a0, b00 = b0, c00 = c0;
        resample.point = linePoint;
      }
      function ringEnd() {
        resampleLineTo(x0, y0, λ0, a0, b0, c0, x00, y00, λ00, a00, b00, c00, maxDepth, stream);
        resample.lineEnd = lineEnd;
        lineEnd();
      }
      return resample;
    }
    function resampleLineTo(x0, y0, λ0, a0, b0, c0, x1, y1, λ1, a1, b1, c1, depth, stream) {
      var dx = x1 - x0, dy = y1 - y0, d2 = dx * dx + dy * dy;
      if (d2 > 4 * δ2 && depth--) {
        var a = a0 + a1, b = b0 + b1, c = c0 + c1, m = Math.sqrt(a * a + b * b + c * c), φ2 = Math.asin(c /= m), λ2 = abs(abs(c) - 1) < ε || abs(λ0 - λ1) < ε ? (λ0 + λ1) / 2 : Math.atan2(b, a), p = project(λ2, φ2), x2 = p[0], y2 = p[1], dx2 = x2 - x0, dy2 = y2 - y0, dz = dy * dx2 - dx * dy2;
        if (dz * dz / d2 > δ2 || abs((dx * dx2 + dy * dy2) / d2 - .5) > .3 || a0 * a1 + b0 * b1 + c0 * c1 < cosMinDistance) {
          resampleLineTo(x0, y0, λ0, a0, b0, c0, x2, y2, λ2, a /= m, b /= m, c, depth, stream);
          stream.point(x2, y2);
          resampleLineTo(x2, y2, λ2, a, b, c, x1, y1, λ1, a1, b1, c1, depth, stream);
        }
      }
    }
    resample.precision = function(_) {
      if (!arguments.length) return Math.sqrt(δ2);
      maxDepth = (δ2 = _ * _) > 0 && 16;
      return resample;
    };
    return resample;
  }
  d3.geo.path = function() {
    var pointRadius = 4.5, projection, context, projectStream, contextStream, cacheStream;
    function path(object) {
      if (object) {
        if (typeof pointRadius === "function") contextStream.pointRadius(+pointRadius.apply(this, arguments));
        if (!cacheStream || !cacheStream.valid) cacheStream = projectStream(contextStream);
        d3.geo.stream(object, cacheStream);
      }
      return contextStream.result();
    }
    path.area = function(object) {
      d3_geo_pathAreaSum = 0;
      d3.geo.stream(object, projectStream(d3_geo_pathArea));
      return d3_geo_pathAreaSum;
    };
    path.centroid = function(object) {
      d3_geo_centroidX0 = d3_geo_centroidY0 = d3_geo_centroidZ0 = d3_geo_centroidX1 = d3_geo_centroidY1 = d3_geo_centroidZ1 = d3_geo_centroidX2 = d3_geo_centroidY2 = d3_geo_centroidZ2 = 0;
      d3.geo.stream(object, projectStream(d3_geo_pathCentroid));
      return d3_geo_centroidZ2 ? [ d3_geo_centroidX2 / d3_geo_centroidZ2, d3_geo_centroidY2 / d3_geo_centroidZ2 ] : d3_geo_centroidZ1 ? [ d3_geo_centroidX1 / d3_geo_centroidZ1, d3_geo_centroidY1 / d3_geo_centroidZ1 ] : d3_geo_centroidZ0 ? [ d3_geo_centroidX0 / d3_geo_centroidZ0, d3_geo_centroidY0 / d3_geo_centroidZ0 ] : [ NaN, NaN ];
    };
    path.bounds = function(object) {
      d3_geo_pathBoundsX1 = d3_geo_pathBoundsY1 = -(d3_geo_pathBoundsX0 = d3_geo_pathBoundsY0 = Infinity);
      d3.geo.stream(object, projectStream(d3_geo_pathBounds));
      return [ [ d3_geo_pathBoundsX0, d3_geo_pathBoundsY0 ], [ d3_geo_pathBoundsX1, d3_geo_pathBoundsY1 ] ];
    };
    path.projection = function(_) {
      if (!arguments.length) return projection;
      projectStream = (projection = _) ? _.stream || d3_geo_pathProjectStream(_) : d3_identity;
      return reset();
    };
    path.context = function(_) {
      if (!arguments.length) return context;
      contextStream = (context = _) == null ? new d3_geo_pathBuffer() : new d3_geo_pathContext(_);
      if (typeof pointRadius !== "function") contextStream.pointRadius(pointRadius);
      return reset();
    };
    path.pointRadius = function(_) {
      if (!arguments.length) return pointRadius;
      pointRadius = typeof _ === "function" ? _ : (contextStream.pointRadius(+_), +_);
      return path;
    };
    function reset() {
      cacheStream = null;
      return path;
    }
    return path.projection(d3.geo.albersUsa()).context(null);
  };
  function d3_geo_pathProjectStream(project) {
    var resample = d3_geo_resample(function(x, y) {
      return project([ x * d3_degrees, y * d3_degrees ]);
    });
    return function(stream) {
      return d3_geo_projectionRadians(resample(stream));
    };
  }
  d3.geo.transform = function(methods) {
    return {
      stream: function(stream) {
        var transform = new d3_geo_transform(stream);
        for (var k in methods) transform[k] = methods[k];
        return transform;
      }
    };
  };
  function d3_geo_transform(stream) {
    this.stream = stream;
  }
  d3_geo_transform.prototype = {
    point: function(x, y) {
      this.stream.point(x, y);
    },
    sphere: function() {
      this.stream.sphere();
    },
    lineStart: function() {
      this.stream.lineStart();
    },
    lineEnd: function() {
      this.stream.lineEnd();
    },
    polygonStart: function() {
      this.stream.polygonStart();
    },
    polygonEnd: function() {
      this.stream.polygonEnd();
    }
  };
  function d3_geo_transformPoint(stream, point) {
    return {
      point: point,
      sphere: function() {
        stream.sphere();
      },
      lineStart: function() {
        stream.lineStart();
      },
      lineEnd: function() {
        stream.lineEnd();
      },
      polygonStart: function() {
        stream.polygonStart();
      },
      polygonEnd: function() {
        stream.polygonEnd();
      }
    };
  }
  d3.geo.projection = d3_geo_projection;
  d3.geo.projectionMutator = d3_geo_projectionMutator;
  function d3_geo_projection(project) {
    return d3_geo_projectionMutator(function() {
      return project;
    })();
  }
  function d3_geo_projectionMutator(projectAt) {
    var project, rotate, projectRotate, projectResample = d3_geo_resample(function(x, y) {
      x = project(x, y);
      return [ x[0] * k + δx, δy - x[1] * k ];
    }), k = 150, x = 480, y = 250, λ = 0, φ = 0, δλ = 0, δφ = 0, δγ = 0, δx, δy, preclip = d3_geo_clipAntimeridian, postclip = d3_identity, clipAngle = null, clipExtent = null, stream;
    function projection(point) {
      point = projectRotate(point[0] * d3_radians, point[1] * d3_radians);
      return [ point[0] * k + δx, δy - point[1] * k ];
    }
    function invert(point) {
      point = projectRotate.invert((point[0] - δx) / k, (δy - point[1]) / k);
      return point && [ point[0] * d3_degrees, point[1] * d3_degrees ];
    }
    projection.stream = function(output) {
      if (stream) stream.valid = false;
      stream = d3_geo_projectionRadians(preclip(rotate, projectResample(postclip(output))));
      stream.valid = true;
      return stream;
    };
    projection.clipAngle = function(_) {
      if (!arguments.length) return clipAngle;
      preclip = _ == null ? (clipAngle = _, d3_geo_clipAntimeridian) : d3_geo_clipCircle((clipAngle = +_) * d3_radians);
      return invalidate();
    };
    projection.clipExtent = function(_) {
      if (!arguments.length) return clipExtent;
      clipExtent = _;
      postclip = _ ? d3_geo_clipExtent(_[0][0], _[0][1], _[1][0], _[1][1]) : d3_identity;
      return invalidate();
    };
    projection.scale = function(_) {
      if (!arguments.length) return k;
      k = +_;
      return reset();
    };
    projection.translate = function(_) {
      if (!arguments.length) return [ x, y ];
      x = +_[0];
      y = +_[1];
      return reset();
    };
    projection.center = function(_) {
      if (!arguments.length) return [ λ * d3_degrees, φ * d3_degrees ];
      λ = _[0] % 360 * d3_radians;
      φ = _[1] % 360 * d3_radians;
      return reset();
    };
    projection.rotate = function(_) {
      if (!arguments.length) return [ δλ * d3_degrees, δφ * d3_degrees, δγ * d3_degrees ];
      δλ = _[0] % 360 * d3_radians;
      δφ = _[1] % 360 * d3_radians;
      δγ = _.length > 2 ? _[2] % 360 * d3_radians : 0;
      return reset();
    };
    d3.rebind(projection, projectResample, "precision");
    function reset() {
      projectRotate = d3_geo_compose(rotate = d3_geo_rotation(δλ, δφ, δγ), project);
      var center = project(λ, φ);
      δx = x - center[0] * k;
      δy = y + center[1] * k;
      return invalidate();
    }
    function invalidate() {
      if (stream) stream.valid = false, stream = null;
      return projection;
    }
    return function() {
      project = projectAt.apply(this, arguments);
      projection.invert = project.invert && invert;
      return reset();
    };
  }
  function d3_geo_projectionRadians(stream) {
    return d3_geo_transformPoint(stream, function(x, y) {
      stream.point(x * d3_radians, y * d3_radians);
    });
  }
  function d3_geo_equirectangular(λ, φ) {
    return [ λ, φ ];
  }
  (d3.geo.equirectangular = function() {
    return d3_geo_projection(d3_geo_equirectangular);
  }).raw = d3_geo_equirectangular.invert = d3_geo_equirectangular;
  d3.geo.rotation = function(rotate) {
    rotate = d3_geo_rotation(rotate[0] % 360 * d3_radians, rotate[1] * d3_radians, rotate.length > 2 ? rotate[2] * d3_radians : 0);
    function forward(coordinates) {
      coordinates = rotate(coordinates[0] * d3_radians, coordinates[1] * d3_radians);
      return coordinates[0] *= d3_degrees, coordinates[1] *= d3_degrees, coordinates;
    }
    forward.invert = function(coordinates) {
      coordinates = rotate.invert(coordinates[0] * d3_radians, coordinates[1] * d3_radians);
      return coordinates[0] *= d3_degrees, coordinates[1] *= d3_degrees, coordinates;
    };
    return forward;
  };
  function d3_geo_identityRotation(λ, φ) {
    return [ λ > π ? λ - τ : λ < -π ? λ + τ : λ, φ ];
  }
  d3_geo_identityRotation.invert = d3_geo_equirectangular;
  function d3_geo_rotation(δλ, δφ, δγ) {
    return δλ ? δφ || δγ ? d3_geo_compose(d3_geo_rotationλ(δλ), d3_geo_rotationφγ(δφ, δγ)) : d3_geo_rotationλ(δλ) : δφ || δγ ? d3_geo_rotationφγ(δφ, δγ) : d3_geo_identityRotation;
  }
  function d3_geo_forwardRotationλ(δλ) {
    return function(λ, φ) {
      return λ += δλ, [ λ > π ? λ - τ : λ < -π ? λ + τ : λ, φ ];
    };
  }
  function d3_geo_rotationλ(δλ) {
    var rotation = d3_geo_forwardRotationλ(δλ);
    rotation.invert = d3_geo_forwardRotationλ(-δλ);
    return rotation;
  }
  function d3_geo_rotationφγ(δφ, δγ) {
    var cosδφ = Math.cos(δφ), sinδφ = Math.sin(δφ), cosδγ = Math.cos(δγ), sinδγ = Math.sin(δγ);
    function rotation(λ, φ) {
      var cosφ = Math.cos(φ), x = Math.cos(λ) * cosφ, y = Math.sin(λ) * cosφ, z = Math.sin(φ), k = z * cosδφ + x * sinδφ;
      return [ Math.atan2(y * cosδγ - k * sinδγ, x * cosδφ - z * sinδφ), d3_asin(k * cosδγ + y * sinδγ) ];
    }
    rotation.invert = function(λ, φ) {
      var cosφ = Math.cos(φ), x = Math.cos(λ) * cosφ, y = Math.sin(λ) * cosφ, z = Math.sin(φ), k = z * cosδγ - y * sinδγ;
      return [ Math.atan2(y * cosδγ + z * sinδγ, x * cosδφ + k * sinδφ), d3_asin(k * cosδφ - x * sinδφ) ];
    };
    return rotation;
  }
  d3.geo.circle = function() {
    var origin = [ 0, 0 ], angle, precision = 6, interpolate;
    function circle() {
      var center = typeof origin === "function" ? origin.apply(this, arguments) : origin, rotate = d3_geo_rotation(-center[0] * d3_radians, -center[1] * d3_radians, 0).invert, ring = [];
      interpolate(null, null, 1, {
        point: function(x, y) {
          ring.push(x = rotate(x, y));
          x[0] *= d3_degrees, x[1] *= d3_degrees;
        }
      });
      return {
        type: "Polygon",
        coordinates: [ ring ]
      };
    }
    circle.origin = function(x) {
      if (!arguments.length) return origin;
      origin = x;
      return circle;
    };
    circle.angle = function(x) {
      if (!arguments.length) return angle;
      interpolate = d3_geo_circleInterpolate((angle = +x) * d3_radians, precision * d3_radians);
      return circle;
    };
    circle.precision = function(_) {
      if (!arguments.length) return precision;
      interpolate = d3_geo_circleInterpolate(angle * d3_radians, (precision = +_) * d3_radians);
      return circle;
    };
    return circle.angle(90);
  };
  function d3_geo_circleInterpolate(radius, precision) {
    var cr = Math.cos(radius), sr = Math.sin(radius);
    return function(from, to, direction, listener) {
      var step = direction * precision;
      if (from != null) {
        from = d3_geo_circleAngle(cr, from);
        to = d3_geo_circleAngle(cr, to);
        if (direction > 0 ? from < to : from > to) from += direction * τ;
      } else {
        from = radius + direction * τ;
        to = radius - .5 * step;
      }
      for (var point, t = from; direction > 0 ? t > to : t < to; t -= step) {
        listener.point((point = d3_geo_spherical([ cr, -sr * Math.cos(t), -sr * Math.sin(t) ]))[0], point[1]);
      }
    };
  }
  function d3_geo_circleAngle(cr, point) {
    var a = d3_geo_cartesian(point);
    a[0] -= cr;
    d3_geo_cartesianNormalize(a);
    var angle = d3_acos(-a[1]);
    return ((-a[2] < 0 ? -angle : angle) + 2 * Math.PI - ε) % (2 * Math.PI);
  }
  d3.geo.distance = function(a, b) {
    var Δλ = (b[0] - a[0]) * d3_radians, φ0 = a[1] * d3_radians, φ1 = b[1] * d3_radians, sinΔλ = Math.sin(Δλ), cosΔλ = Math.cos(Δλ), sinφ0 = Math.sin(φ0), cosφ0 = Math.cos(φ0), sinφ1 = Math.sin(φ1), cosφ1 = Math.cos(φ1), t;
    return Math.atan2(Math.sqrt((t = cosφ1 * sinΔλ) * t + (t = cosφ0 * sinφ1 - sinφ0 * cosφ1 * cosΔλ) * t), sinφ0 * sinφ1 + cosφ0 * cosφ1 * cosΔλ);
  };
  d3.geo.graticule = function() {
    var x1, x0, X1, X0, y1, y0, Y1, Y0, dx = 10, dy = dx, DX = 90, DY = 360, x, y, X, Y, precision = 2.5;
    function graticule() {
      return {
        type: "MultiLineString",
        coordinates: lines()
      };
    }
    function lines() {
      return d3.range(Math.ceil(X0 / DX) * DX, X1, DX).map(X).concat(d3.range(Math.ceil(Y0 / DY) * DY, Y1, DY).map(Y)).concat(d3.range(Math.ceil(x0 / dx) * dx, x1, dx).filter(function(x) {
        return abs(x % DX) > ε;
      }).map(x)).concat(d3.range(Math.ceil(y0 / dy) * dy, y1, dy).filter(function(y) {
        return abs(y % DY) > ε;
      }).map(y));
    }
    graticule.lines = function() {
      return lines().map(function(coordinates) {
        return {
          type: "LineString",
          coordinates: coordinates
        };
      });
    };
    graticule.outline = function() {
      return {
        type: "Polygon",
        coordinates: [ X(X0).concat(Y(Y1).slice(1), X(X1).reverse().slice(1), Y(Y0).reverse().slice(1)) ]
      };
    };
    graticule.extent = function(_) {
      if (!arguments.length) return graticule.minorExtent();
      return graticule.majorExtent(_).minorExtent(_);
    };
    graticule.majorExtent = function(_) {
      if (!arguments.length) return [ [ X0, Y0 ], [ X1, Y1 ] ];
      X0 = +_[0][0], X1 = +_[1][0];
      Y0 = +_[0][1], Y1 = +_[1][1];
      if (X0 > X1) _ = X0, X0 = X1, X1 = _;
      if (Y0 > Y1) _ = Y0, Y0 = Y1, Y1 = _;
      return graticule.precision(precision);
    };
    graticule.minorExtent = function(_) {
      if (!arguments.length) return [ [ x0, y0 ], [ x1, y1 ] ];
      x0 = +_[0][0], x1 = +_[1][0];
      y0 = +_[0][1], y1 = +_[1][1];
      if (x0 > x1) _ = x0, x0 = x1, x1 = _;
      if (y0 > y1) _ = y0, y0 = y1, y1 = _;
      return graticule.precision(precision);
    };
    graticule.step = function(_) {
      if (!arguments.length) return graticule.minorStep();
      return graticule.majorStep(_).minorStep(_);
    };
    graticule.majorStep = function(_) {
      if (!arguments.length) return [ DX, DY ];
      DX = +_[0], DY = +_[1];
      return graticule;
    };
    graticule.minorStep = function(_) {
      if (!arguments.length) return [ dx, dy ];
      dx = +_[0], dy = +_[1];
      return graticule;
    };
    graticule.precision = function(_) {
      if (!arguments.length) return precision;
      precision = +_;
      x = d3_geo_graticuleX(y0, y1, 90);
      y = d3_geo_graticuleY(x0, x1, precision);
      X = d3_geo_graticuleX(Y0, Y1, 90);
      Y = d3_geo_graticuleY(X0, X1, precision);
      return graticule;
    };
    return graticule.majorExtent([ [ -180, -90 + ε ], [ 180, 90 - ε ] ]).minorExtent([ [ -180, -80 - ε ], [ 180, 80 + ε ] ]);
  };
  function d3_geo_graticuleX(y0, y1, dy) {
    var y = d3.range(y0, y1 - ε, dy).concat(y1);
    return function(x) {
      return y.map(function(y) {
        return [ x, y ];
      });
    };
  }
  function d3_geo_graticuleY(x0, x1, dx) {
    var x = d3.range(x0, x1 - ε, dx).concat(x1);
    return function(y) {
      return x.map(function(x) {
        return [ x, y ];
      });
    };
  }
  function d3_source(d) {
    return d.source;
  }
  function d3_target(d) {
    return d.target;
  }
  d3.geo.greatArc = function() {
    var source = d3_source, source_, target = d3_target, target_;
    function greatArc() {
      return {
        type: "LineString",
        coordinates: [ source_ || source.apply(this, arguments), target_ || target.apply(this, arguments) ]
      };
    }
    greatArc.distance = function() {
      return d3.geo.distance(source_ || source.apply(this, arguments), target_ || target.apply(this, arguments));
    };
    greatArc.source = function(_) {
      if (!arguments.length) return source;
      source = _, source_ = typeof _ === "function" ? null : _;
      return greatArc;
    };
    greatArc.target = function(_) {
      if (!arguments.length) return target;
      target = _, target_ = typeof _ === "function" ? null : _;
      return greatArc;
    };
    greatArc.precision = function() {
      return arguments.length ? greatArc : 0;
    };
    return greatArc;
  };
  d3.geo.interpolate = function(source, target) {
    return d3_geo_interpolate(source[0] * d3_radians, source[1] * d3_radians, target[0] * d3_radians, target[1] * d3_radians);
  };
  function d3_geo_interpolate(x0, y0, x1, y1) {
    var cy0 = Math.cos(y0), sy0 = Math.sin(y0), cy1 = Math.cos(y1), sy1 = Math.sin(y1), kx0 = cy0 * Math.cos(x0), ky0 = cy0 * Math.sin(x0), kx1 = cy1 * Math.cos(x1), ky1 = cy1 * Math.sin(x1), d = 2 * Math.asin(Math.sqrt(d3_haversin(y1 - y0) + cy0 * cy1 * d3_haversin(x1 - x0))), k = 1 / Math.sin(d);
    var interpolate = d ? function(t) {
      var B = Math.sin(t *= d) * k, A = Math.sin(d - t) * k, x = A * kx0 + B * kx1, y = A * ky0 + B * ky1, z = A * sy0 + B * sy1;
      return [ Math.atan2(y, x) * d3_degrees, Math.atan2(z, Math.sqrt(x * x + y * y)) * d3_degrees ];
    } : function() {
      return [ x0 * d3_degrees, y0 * d3_degrees ];
    };
    interpolate.distance = d;
    return interpolate;
  }
  d3.geo.length = function(object) {
    d3_geo_lengthSum = 0;
    d3.geo.stream(object, d3_geo_length);
    return d3_geo_lengthSum;
  };
  var d3_geo_lengthSum;
  var d3_geo_length = {
    sphere: d3_noop,
    point: d3_noop,
    lineStart: d3_geo_lengthLineStart,
    lineEnd: d3_noop,
    polygonStart: d3_noop,
    polygonEnd: d3_noop
  };
  function d3_geo_lengthLineStart() {
    var λ0, sinφ0, cosφ0;
    d3_geo_length.point = function(λ, φ) {
      λ0 = λ * d3_radians, sinφ0 = Math.sin(φ *= d3_radians), cosφ0 = Math.cos(φ);
      d3_geo_length.point = nextPoint;
    };
    d3_geo_length.lineEnd = function() {
      d3_geo_length.point = d3_geo_length.lineEnd = d3_noop;
    };
    function nextPoint(λ, φ) {
      var sinφ = Math.sin(φ *= d3_radians), cosφ = Math.cos(φ), t = abs((λ *= d3_radians) - λ0), cosΔλ = Math.cos(t);
      d3_geo_lengthSum += Math.atan2(Math.sqrt((t = cosφ * Math.sin(t)) * t + (t = cosφ0 * sinφ - sinφ0 * cosφ * cosΔλ) * t), sinφ0 * sinφ + cosφ0 * cosφ * cosΔλ);
      λ0 = λ, sinφ0 = sinφ, cosφ0 = cosφ;
    }
  }
  function d3_geo_azimuthal(scale, angle) {
    function azimuthal(λ, φ) {
      var cosλ = Math.cos(λ), cosφ = Math.cos(φ), k = scale(cosλ * cosφ);
      return [ k * cosφ * Math.sin(λ), k * Math.sin(φ) ];
    }
    azimuthal.invert = function(x, y) {
      var ρ = Math.sqrt(x * x + y * y), c = angle(ρ), sinc = Math.sin(c), cosc = Math.cos(c);
      return [ Math.atan2(x * sinc, ρ * cosc), Math.asin(ρ && y * sinc / ρ) ];
    };
    return azimuthal;
  }
  var d3_geo_azimuthalEqualArea = d3_geo_azimuthal(function(cosλcosφ) {
    return Math.sqrt(2 / (1 + cosλcosφ));
  }, function(ρ) {
    return 2 * Math.asin(ρ / 2);
  });
  (d3.geo.azimuthalEqualArea = function() {
    return d3_geo_projection(d3_geo_azimuthalEqualArea);
  }).raw = d3_geo_azimuthalEqualArea;
  var d3_geo_azimuthalEquidistant = d3_geo_azimuthal(function(cosλcosφ) {
    var c = Math.acos(cosλcosφ);
    return c && c / Math.sin(c);
  }, d3_identity);
  (d3.geo.azimuthalEquidistant = function() {
    return d3_geo_projection(d3_geo_azimuthalEquidistant);
  }).raw = d3_geo_azimuthalEquidistant;
  function d3_geo_conicConformal(φ0, φ1) {
    var cosφ0 = Math.cos(φ0), t = function(φ) {
      return Math.tan(π / 4 + φ / 2);
    }, n = φ0 === φ1 ? Math.sin(φ0) : Math.log(cosφ0 / Math.cos(φ1)) / Math.log(t(φ1) / t(φ0)), F = cosφ0 * Math.pow(t(φ0), n) / n;
    if (!n) return d3_geo_mercator;
    function forward(λ, φ) {
      if (F > 0) {
        if (φ < -halfπ + ε) φ = -halfπ + ε;
      } else {
        if (φ > halfπ - ε) φ = halfπ - ε;
      }
      var ρ = F / Math.pow(t(φ), n);
      return [ ρ * Math.sin(n * λ), F - ρ * Math.cos(n * λ) ];
    }
    forward.invert = function(x, y) {
      var ρ0_y = F - y, ρ = d3_sgn(n) * Math.sqrt(x * x + ρ0_y * ρ0_y);
      return [ Math.atan2(x, ρ0_y) / n, 2 * Math.atan(Math.pow(F / ρ, 1 / n)) - halfπ ];
    };
    return forward;
  }
  (d3.geo.conicConformal = function() {
    return d3_geo_conic(d3_geo_conicConformal);
  }).raw = d3_geo_conicConformal;
  function d3_geo_conicEquidistant(φ0, φ1) {
    var cosφ0 = Math.cos(φ0), n = φ0 === φ1 ? Math.sin(φ0) : (cosφ0 - Math.cos(φ1)) / (φ1 - φ0), G = cosφ0 / n + φ0;
    if (abs(n) < ε) return d3_geo_equirectangular;
    function forward(λ, φ) {
      var ρ = G - φ;
      return [ ρ * Math.sin(n * λ), G - ρ * Math.cos(n * λ) ];
    }
    forward.invert = function(x, y) {
      var ρ0_y = G - y;
      return [ Math.atan2(x, ρ0_y) / n, G - d3_sgn(n) * Math.sqrt(x * x + ρ0_y * ρ0_y) ];
    };
    return forward;
  }
  (d3.geo.conicEquidistant = function() {
    return d3_geo_conic(d3_geo_conicEquidistant);
  }).raw = d3_geo_conicEquidistant;
  var d3_geo_gnomonic = d3_geo_azimuthal(function(cosλcosφ) {
    return 1 / cosλcosφ;
  }, Math.atan);
  (d3.geo.gnomonic = function() {
    return d3_geo_projection(d3_geo_gnomonic);
  }).raw = d3_geo_gnomonic;
  function d3_geo_mercator(λ, φ) {
    return [ λ, Math.log(Math.tan(π / 4 + φ / 2)) ];
  }
  d3_geo_mercator.invert = function(x, y) {
    return [ x, 2 * Math.atan(Math.exp(y)) - halfπ ];
  };
  function d3_geo_mercatorProjection(project) {
    var m = d3_geo_projection(project), scale = m.scale, translate = m.translate, clipExtent = m.clipExtent, clipAuto;
    m.scale = function() {
      var v = scale.apply(m, arguments);
      return v === m ? clipAuto ? m.clipExtent(null) : m : v;
    };
    m.translate = function() {
      var v = translate.apply(m, arguments);
      return v === m ? clipAuto ? m.clipExtent(null) : m : v;
    };
    m.clipExtent = function(_) {
      var v = clipExtent.apply(m, arguments);
      if (v === m) {
        if (clipAuto = _ == null) {
          var k = π * scale(), t = translate();
          clipExtent([ [ t[0] - k, t[1] - k ], [ t[0] + k, t[1] + k ] ]);
        }
      } else if (clipAuto) {
        v = null;
      }
      return v;
    };
    return m.clipExtent(null);
  }
  (d3.geo.mercator = function() {
    return d3_geo_mercatorProjection(d3_geo_mercator);
  }).raw = d3_geo_mercator;
  var d3_geo_orthographic = d3_geo_azimuthal(function() {
    return 1;
  }, Math.asin);
  (d3.geo.orthographic = function() {
    return d3_geo_projection(d3_geo_orthographic);
  }).raw = d3_geo_orthographic;
  var d3_geo_stereographic = d3_geo_azimuthal(function(cosλcosφ) {
    return 1 / (1 + cosλcosφ);
  }, function(ρ) {
    return 2 * Math.atan(ρ);
  });
  (d3.geo.stereographic = function() {
    return d3_geo_projection(d3_geo_stereographic);
  }).raw = d3_geo_stereographic;
  function d3_geo_transverseMercator(λ, φ) {
    return [ Math.log(Math.tan(π / 4 + φ / 2)), -λ ];
  }
  d3_geo_transverseMercator.invert = function(x, y) {
    return [ -y, 2 * Math.atan(Math.exp(x)) - halfπ ];
  };
  (d3.geo.transverseMercator = function() {
    var projection = d3_geo_mercatorProjection(d3_geo_transverseMercator), center = projection.center, rotate = projection.rotate;
    projection.center = function(_) {
      return _ ? center([ -_[1], _[0] ]) : (_ = center(), [ _[1], -_[0] ]);
    };
    projection.rotate = function(_) {
      return _ ? rotate([ _[0], _[1], _.length > 2 ? _[2] + 90 : 90 ]) : (_ = rotate(), 
      [ _[0], _[1], _[2] - 90 ]);
    };
    return rotate([ 0, 0, 90 ]);
  }).raw = d3_geo_transverseMercator;
  d3.geom = {};
  function d3_geom_pointX(d) {
    return d[0];
  }
  function d3_geom_pointY(d) {
    return d[1];
  }
  d3.geom.hull = function(vertices) {
    var x = d3_geom_pointX, y = d3_geom_pointY;
    if (arguments.length) return hull(vertices);
    function hull(data) {
      if (data.length < 3) return [];
      var fx = d3_functor(x), fy = d3_functor(y), i, n = data.length, points = [], flippedPoints = [];
      for (i = 0; i < n; i++) {
        points.push([ +fx.call(this, data[i], i), +fy.call(this, data[i], i), i ]);
      }
      points.sort(d3_geom_hullOrder);
      for (i = 0; i < n; i++) flippedPoints.push([ points[i][0], -points[i][1] ]);
      var upper = d3_geom_hullUpper(points), lower = d3_geom_hullUpper(flippedPoints);
      var skipLeft = lower[0] === upper[0], skipRight = lower[lower.length - 1] === upper[upper.length - 1], polygon = [];
      for (i = upper.length - 1; i >= 0; --i) polygon.push(data[points[upper[i]][2]]);
      for (i = +skipLeft; i < lower.length - skipRight; ++i) polygon.push(data[points[lower[i]][2]]);
      return polygon;
    }
    hull.x = function(_) {
      return arguments.length ? (x = _, hull) : x;
    };
    hull.y = function(_) {
      return arguments.length ? (y = _, hull) : y;
    };
    return hull;
  };
  function d3_geom_hullUpper(points) {
    var n = points.length, hull = [ 0, 1 ], hs = 2;
    for (var i = 2; i < n; i++) {
      while (hs > 1 && d3_cross2d(points[hull[hs - 2]], points[hull[hs - 1]], points[i]) <= 0) --hs;
      hull[hs++] = i;
    }
    return hull.slice(0, hs);
  }
  function d3_geom_hullOrder(a, b) {
    return a[0] - b[0] || a[1] - b[1];
  }
  d3.geom.polygon = function(coordinates) {
    d3_subclass(coordinates, d3_geom_polygonPrototype);
    return coordinates;
  };
  var d3_geom_polygonPrototype = d3.geom.polygon.prototype = [];
  d3_geom_polygonPrototype.area = function() {
    var i = -1, n = this.length, a, b = this[n - 1], area = 0;
    while (++i < n) {
      a = b;
      b = this[i];
      area += a[1] * b[0] - a[0] * b[1];
    }
    return area * .5;
  };
  d3_geom_polygonPrototype.centroid = function(k) {
    var i = -1, n = this.length, x = 0, y = 0, a, b = this[n - 1], c;
    if (!arguments.length) k = -1 / (6 * this.area());
    while (++i < n) {
      a = b;
      b = this[i];
      c = a[0] * b[1] - b[0] * a[1];
      x += (a[0] + b[0]) * c;
      y += (a[1] + b[1]) * c;
    }
    return [ x * k, y * k ];
  };
  d3_geom_polygonPrototype.clip = function(subject) {
    var input, closed = d3_geom_polygonClosed(subject), i = -1, n = this.length - d3_geom_polygonClosed(this), j, m, a = this[n - 1], b, c, d;
    while (++i < n) {
      input = subject.slice();
      subject.length = 0;
      b = this[i];
      c = input[(m = input.length - closed) - 1];
      j = -1;
      while (++j < m) {
        d = input[j];
        if (d3_geom_polygonInside(d, a, b)) {
          if (!d3_geom_polygonInside(c, a, b)) {
            subject.push(d3_geom_polygonIntersect(c, d, a, b));
          }
          subject.push(d);
        } else if (d3_geom_polygonInside(c, a, b)) {
          subject.push(d3_geom_polygonIntersect(c, d, a, b));
        }
        c = d;
      }
      if (closed) subject.push(subject[0]);
      a = b;
    }
    return subject;
  };
  function d3_geom_polygonInside(p, a, b) {
    return (b[0] - a[0]) * (p[1] - a[1]) < (b[1] - a[1]) * (p[0] - a[0]);
  }
  function d3_geom_polygonIntersect(c, d, a, b) {
    var x1 = c[0], x3 = a[0], x21 = d[0] - x1, x43 = b[0] - x3, y1 = c[1], y3 = a[1], y21 = d[1] - y1, y43 = b[1] - y3, ua = (x43 * (y1 - y3) - y43 * (x1 - x3)) / (y43 * x21 - x43 * y21);
    return [ x1 + ua * x21, y1 + ua * y21 ];
  }
  function d3_geom_polygonClosed(coordinates) {
    var a = coordinates[0], b = coordinates[coordinates.length - 1];
    return !(a[0] - b[0] || a[1] - b[1]);
  }
  var d3_geom_voronoiEdges, d3_geom_voronoiCells, d3_geom_voronoiBeaches, d3_geom_voronoiBeachPool = [], d3_geom_voronoiFirstCircle, d3_geom_voronoiCircles, d3_geom_voronoiCirclePool = [];
  function d3_geom_voronoiBeach() {
    d3_geom_voronoiRedBlackNode(this);
    this.edge = this.site = this.circle = null;
  }
  function d3_geom_voronoiCreateBeach(site) {
    var beach = d3_geom_voronoiBeachPool.pop() || new d3_geom_voronoiBeach();
    beach.site = site;
    return beach;
  }
  function d3_geom_voronoiDetachBeach(beach) {
    d3_geom_voronoiDetachCircle(beach);
    d3_geom_voronoiBeaches.remove(beach);
    d3_geom_voronoiBeachPool.push(beach);
    d3_geom_voronoiRedBlackNode(beach);
  }
  function d3_geom_voronoiRemoveBeach(beach) {
    var circle = beach.circle, x = circle.x, y = circle.cy, vertex = {
      x: x,
      y: y
    }, previous = beach.P, next = beach.N, disappearing = [ beach ];
    d3_geom_voronoiDetachBeach(beach);
    var lArc = previous;
    while (lArc.circle && abs(x - lArc.circle.x) < ε && abs(y - lArc.circle.cy) < ε) {
      previous = lArc.P;
      disappearing.unshift(lArc);
      d3_geom_voronoiDetachBeach(lArc);
      lArc = previous;
    }
    disappearing.unshift(lArc);
    d3_geom_voronoiDetachCircle(lArc);
    var rArc = next;
    while (rArc.circle && abs(x - rArc.circle.x) < ε && abs(y - rArc.circle.cy) < ε) {
      next = rArc.N;
      disappearing.push(rArc);
      d3_geom_voronoiDetachBeach(rArc);
      rArc = next;
    }
    disappearing.push(rArc);
    d3_geom_voronoiDetachCircle(rArc);
    var nArcs = disappearing.length, iArc;
    for (iArc = 1; iArc < nArcs; ++iArc) {
      rArc = disappearing[iArc];
      lArc = disappearing[iArc - 1];
      d3_geom_voronoiSetEdgeEnd(rArc.edge, lArc.site, rArc.site, vertex);
    }
    lArc = disappearing[0];
    rArc = disappearing[nArcs - 1];
    rArc.edge = d3_geom_voronoiCreateEdge(lArc.site, rArc.site, null, vertex);
    d3_geom_voronoiAttachCircle(lArc);
    d3_geom_voronoiAttachCircle(rArc);
  }
  function d3_geom_voronoiAddBeach(site) {
    var x = site.x, directrix = site.y, lArc, rArc, dxl, dxr, node = d3_geom_voronoiBeaches._;
    while (node) {
      dxl = d3_geom_voronoiLeftBreakPoint(node, directrix) - x;
      if (dxl > ε) node = node.L; else {
        dxr = x - d3_geom_voronoiRightBreakPoint(node, directrix);
        if (dxr > ε) {
          if (!node.R) {
            lArc = node;
            break;
          }
          node = node.R;
        } else {
          if (dxl > -ε) {
            lArc = node.P;
            rArc = node;
          } else if (dxr > -ε) {
            lArc = node;
            rArc = node.N;
          } else {
            lArc = rArc = node;
          }
          break;
        }
      }
    }
    var newArc = d3_geom_voronoiCreateBeach(site);
    d3_geom_voronoiBeaches.insert(lArc, newArc);
    if (!lArc && !rArc) return;
    if (lArc === rArc) {
      d3_geom_voronoiDetachCircle(lArc);
      rArc = d3_geom_voronoiCreateBeach(lArc.site);
      d3_geom_voronoiBeaches.insert(newArc, rArc);
      newArc.edge = rArc.edge = d3_geom_voronoiCreateEdge(lArc.site, newArc.site);
      d3_geom_voronoiAttachCircle(lArc);
      d3_geom_voronoiAttachCircle(rArc);
      return;
    }
    if (!rArc) {
      newArc.edge = d3_geom_voronoiCreateEdge(lArc.site, newArc.site);
      return;
    }
    d3_geom_voronoiDetachCircle(lArc);
    d3_geom_voronoiDetachCircle(rArc);
    var lSite = lArc.site, ax = lSite.x, ay = lSite.y, bx = site.x - ax, by = site.y - ay, rSite = rArc.site, cx = rSite.x - ax, cy = rSite.y - ay, d = 2 * (bx * cy - by * cx), hb = bx * bx + by * by, hc = cx * cx + cy * cy, vertex = {
      x: (cy * hb - by * hc) / d + ax,
      y: (bx * hc - cx * hb) / d + ay
    };
    d3_geom_voronoiSetEdgeEnd(rArc.edge, lSite, rSite, vertex);
    newArc.edge = d3_geom_voronoiCreateEdge(lSite, site, null, vertex);
    rArc.edge = d3_geom_voronoiCreateEdge(site, rSite, null, vertex);
    d3_geom_voronoiAttachCircle(lArc);
    d3_geom_voronoiAttachCircle(rArc);
  }
  function d3_geom_voronoiLeftBreakPoint(arc, directrix) {
    var site = arc.site, rfocx = site.x, rfocy = site.y, pby2 = rfocy - directrix;
    if (!pby2) return rfocx;
    var lArc = arc.P;
    if (!lArc) return -Infinity;
    site = lArc.site;
    var lfocx = site.x, lfocy = site.y, plby2 = lfocy - directrix;
    if (!plby2) return lfocx;
    var hl = lfocx - rfocx, aby2 = 1 / pby2 - 1 / plby2, b = hl / plby2;
    if (aby2) return (-b + Math.sqrt(b * b - 2 * aby2 * (hl * hl / (-2 * plby2) - lfocy + plby2 / 2 + rfocy - pby2 / 2))) / aby2 + rfocx;
    return (rfocx + lfocx) / 2;
  }
  function d3_geom_voronoiRightBreakPoint(arc, directrix) {
    var rArc = arc.N;
    if (rArc) return d3_geom_voronoiLeftBreakPoint(rArc, directrix);
    var site = arc.site;
    return site.y === directrix ? site.x : Infinity;
  }
  function d3_geom_voronoiCell(site) {
    this.site = site;
    this.edges = [];
  }
  d3_geom_voronoiCell.prototype.prepare = function() {
    var halfEdges = this.edges, iHalfEdge = halfEdges.length, edge;
    while (iHalfEdge--) {
      edge = halfEdges[iHalfEdge].edge;
      if (!edge.b || !edge.a) halfEdges.splice(iHalfEdge, 1);
    }
    halfEdges.sort(d3_geom_voronoiHalfEdgeOrder);
    return halfEdges.length;
  };
  function d3_geom_voronoiCloseCells(extent) {
    var x0 = extent[0][0], x1 = extent[1][0], y0 = extent[0][1], y1 = extent[1][1], x2, y2, x3, y3, cells = d3_geom_voronoiCells, iCell = cells.length, cell, iHalfEdge, halfEdges, nHalfEdges, start, end;
    while (iCell--) {
      cell = cells[iCell];
      if (!cell || !cell.prepare()) continue;
      halfEdges = cell.edges;
      nHalfEdges = halfEdges.length;
      iHalfEdge = 0;
      while (iHalfEdge < nHalfEdges) {
        end = halfEdges[iHalfEdge].end(), x3 = end.x, y3 = end.y;
        start = halfEdges[++iHalfEdge % nHalfEdges].start(), x2 = start.x, y2 = start.y;
        if (abs(x3 - x2) > ε || abs(y3 - y2) > ε) {
          halfEdges.splice(iHalfEdge, 0, new d3_geom_voronoiHalfEdge(d3_geom_voronoiCreateBorderEdge(cell.site, end, abs(x3 - x0) < ε && y1 - y3 > ε ? {
            x: x0,
            y: abs(x2 - x0) < ε ? y2 : y1
          } : abs(y3 - y1) < ε && x1 - x3 > ε ? {
            x: abs(y2 - y1) < ε ? x2 : x1,
            y: y1
          } : abs(x3 - x1) < ε && y3 - y0 > ε ? {
            x: x1,
            y: abs(x2 - x1) < ε ? y2 : y0
          } : abs(y3 - y0) < ε && x3 - x0 > ε ? {
            x: abs(y2 - y0) < ε ? x2 : x0,
            y: y0
          } : null), cell.site, null));
          ++nHalfEdges;
        }
      }
    }
  }
  function d3_geom_voronoiHalfEdgeOrder(a, b) {
    return b.angle - a.angle;
  }
  function d3_geom_voronoiCircle() {
    d3_geom_voronoiRedBlackNode(this);
    this.x = this.y = this.arc = this.site = this.cy = null;
  }
  function d3_geom_voronoiAttachCircle(arc) {
    var lArc = arc.P, rArc = arc.N;
    if (!lArc || !rArc) return;
    var lSite = lArc.site, cSite = arc.site, rSite = rArc.site;
    if (lSite === rSite) return;
    var bx = cSite.x, by = cSite.y, ax = lSite.x - bx, ay = lSite.y - by, cx = rSite.x - bx, cy = rSite.y - by;
    var d = 2 * (ax * cy - ay * cx);
    if (d >= -ε2) return;
    var ha = ax * ax + ay * ay, hc = cx * cx + cy * cy, x = (cy * ha - ay * hc) / d, y = (ax * hc - cx * ha) / d, cy = y + by;
    var circle = d3_geom_voronoiCirclePool.pop() || new d3_geom_voronoiCircle();
    circle.arc = arc;
    circle.site = cSite;
    circle.x = x + bx;
    circle.y = cy + Math.sqrt(x * x + y * y);
    circle.cy = cy;
    arc.circle = circle;
    var before = null, node = d3_geom_voronoiCircles._;
    while (node) {
      if (circle.y < node.y || circle.y === node.y && circle.x <= node.x) {
        if (node.L) node = node.L; else {
          before = node.P;
          break;
        }
      } else {
        if (node.R) node = node.R; else {
          before = node;
          break;
        }
      }
    }
    d3_geom_voronoiCircles.insert(before, circle);
    if (!before) d3_geom_voronoiFirstCircle = circle;
  }
  function d3_geom_voronoiDetachCircle(arc) {
    var circle = arc.circle;
    if (circle) {
      if (!circle.P) d3_geom_voronoiFirstCircle = circle.N;
      d3_geom_voronoiCircles.remove(circle);
      d3_geom_voronoiCirclePool.push(circle);
      d3_geom_voronoiRedBlackNode(circle);
      arc.circle = null;
    }
  }
  function d3_geom_voronoiClipEdges(extent) {
    var edges = d3_geom_voronoiEdges, clip = d3_geom_clipLine(extent[0][0], extent[0][1], extent[1][0], extent[1][1]), i = edges.length, e;
    while (i--) {
      e = edges[i];
      if (!d3_geom_voronoiConnectEdge(e, extent) || !clip(e) || abs(e.a.x - e.b.x) < ε && abs(e.a.y - e.b.y) < ε) {
        e.a = e.b = null;
        edges.splice(i, 1);
      }
    }
  }
  function d3_geom_voronoiConnectEdge(edge, extent) {
    var vb = edge.b;
    if (vb) return true;
    var va = edge.a, x0 = extent[0][0], x1 = extent[1][0], y0 = extent[0][1], y1 = extent[1][1], lSite = edge.l, rSite = edge.r, lx = lSite.x, ly = lSite.y, rx = rSite.x, ry = rSite.y, fx = (lx + rx) / 2, fy = (ly + ry) / 2, fm, fb;
    if (ry === ly) {
      if (fx < x0 || fx >= x1) return;
      if (lx > rx) {
        if (!va) va = {
          x: fx,
          y: y0
        }; else if (va.y >= y1) return;
        vb = {
          x: fx,
          y: y1
        };
      } else {
        if (!va) va = {
          x: fx,
          y: y1
        }; else if (va.y < y0) return;
        vb = {
          x: fx,
          y: y0
        };
      }
    } else {
      fm = (lx - rx) / (ry - ly);
      fb = fy - fm * fx;
      if (fm < -1 || fm > 1) {
        if (lx > rx) {
          if (!va) va = {
            x: (y0 - fb) / fm,
            y: y0
          }; else if (va.y >= y1) return;
          vb = {
            x: (y1 - fb) / fm,
            y: y1
          };
        } else {
          if (!va) va = {
            x: (y1 - fb) / fm,
            y: y1
          }; else if (va.y < y0) return;
          vb = {
            x: (y0 - fb) / fm,
            y: y0
          };
        }
      } else {
        if (ly < ry) {
          if (!va) va = {
            x: x0,
            y: fm * x0 + fb
          }; else if (va.x >= x1) return;
          vb = {
            x: x1,
            y: fm * x1 + fb
          };
        } else {
          if (!va) va = {
            x: x1,
            y: fm * x1 + fb
          }; else if (va.x < x0) return;
          vb = {
            x: x0,
            y: fm * x0 + fb
          };
        }
      }
    }
    edge.a = va;
    edge.b = vb;
    return true;
  }
  function d3_geom_voronoiEdge(lSite, rSite) {
    this.l = lSite;
    this.r = rSite;
    this.a = this.b = null;
  }
  function d3_geom_voronoiCreateEdge(lSite, rSite, va, vb) {
    var edge = new d3_geom_voronoiEdge(lSite, rSite);
    d3_geom_voronoiEdges.push(edge);
    if (va) d3_geom_voronoiSetEdgeEnd(edge, lSite, rSite, va);
    if (vb) d3_geom_voronoiSetEdgeEnd(edge, rSite, lSite, vb);
    d3_geom_voronoiCells[lSite.i].edges.push(new d3_geom_voronoiHalfEdge(edge, lSite, rSite));
    d3_geom_voronoiCells[rSite.i].edges.push(new d3_geom_voronoiHalfEdge(edge, rSite, lSite));
    return edge;
  }
  function d3_geom_voronoiCreateBorderEdge(lSite, va, vb) {
    var edge = new d3_geom_voronoiEdge(lSite, null);
    edge.a = va;
    edge.b = vb;
    d3_geom_voronoiEdges.push(edge);
    return edge;
  }
  function d3_geom_voronoiSetEdgeEnd(edge, lSite, rSite, vertex) {
    if (!edge.a && !edge.b) {
      edge.a = vertex;
      edge.l = lSite;
      edge.r = rSite;
    } else if (edge.l === rSite) {
      edge.b = vertex;
    } else {
      edge.a = vertex;
    }
  }
  function d3_geom_voronoiHalfEdge(edge, lSite, rSite) {
    var va = edge.a, vb = edge.b;
    this.edge = edge;
    this.site = lSite;
    this.angle = rSite ? Math.atan2(rSite.y - lSite.y, rSite.x - lSite.x) : edge.l === lSite ? Math.atan2(vb.x - va.x, va.y - vb.y) : Math.atan2(va.x - vb.x, vb.y - va.y);
  }
  d3_geom_voronoiHalfEdge.prototype = {
    start: function() {
      return this.edge.l === this.site ? this.edge.a : this.edge.b;
    },
    end: function() {
      return this.edge.l === this.site ? this.edge.b : this.edge.a;
    }
  };
  function d3_geom_voronoiRedBlackTree() {
    this._ = null;
  }
  function d3_geom_voronoiRedBlackNode(node) {
    node.U = node.C = node.L = node.R = node.P = node.N = null;
  }
  d3_geom_voronoiRedBlackTree.prototype = {
    insert: function(after, node) {
      var parent, grandpa, uncle;
      if (after) {
        node.P = after;
        node.N = after.N;
        if (after.N) after.N.P = node;
        after.N = node;
        if (after.R) {
          after = after.R;
          while (after.L) after = after.L;
          after.L = node;
        } else {
          after.R = node;
        }
        parent = after;
      } else if (this._) {
        after = d3_geom_voronoiRedBlackFirst(this._);
        node.P = null;
        node.N = after;
        after.P = after.L = node;
        parent = after;
      } else {
        node.P = node.N = null;
        this._ = node;
        parent = null;
      }
      node.L = node.R = null;
      node.U = parent;
      node.C = true;
      after = node;
      while (parent && parent.C) {
        grandpa = parent.U;
        if (parent === grandpa.L) {
          uncle = grandpa.R;
          if (uncle && uncle.C) {
            parent.C = uncle.C = false;
            grandpa.C = true;
            after = grandpa;
          } else {
            if (after === parent.R) {
              d3_geom_voronoiRedBlackRotateLeft(this, parent);
              after = parent;
              parent = after.U;
            }
            parent.C = false;
            grandpa.C = true;
            d3_geom_voronoiRedBlackRotateRight(this, grandpa);
          }
        } else {
          uncle = grandpa.L;
          if (uncle && uncle.C) {
            parent.C = uncle.C = false;
            grandpa.C = true;
            after = grandpa;
          } else {
            if (after === parent.L) {
              d3_geom_voronoiRedBlackRotateRight(this, parent);
              after = parent;
              parent = after.U;
            }
            parent.C = false;
            grandpa.C = true;
            d3_geom_voronoiRedBlackRotateLeft(this, grandpa);
          }
        }
        parent = after.U;
      }
      this._.C = false;
    },
    remove: function(node) {
      if (node.N) node.N.P = node.P;
      if (node.P) node.P.N = node.N;
      node.N = node.P = null;
      var parent = node.U, sibling, left = node.L, right = node.R, next, red;
      if (!left) next = right; else if (!right) next = left; else next = d3_geom_voronoiRedBlackFirst(right);
      if (parent) {
        if (parent.L === node) parent.L = next; else parent.R = next;
      } else {
        this._ = next;
      }
      if (left && right) {
        red = next.C;
        next.C = node.C;
        next.L = left;
        left.U = next;
        if (next !== right) {
          parent = next.U;
          next.U = node.U;
          node = next.R;
          parent.L = node;
          next.R = right;
          right.U = next;
        } else {
          next.U = parent;
          parent = next;
          node = next.R;
        }
      } else {
        red = node.C;
        node = next;
      }
      if (node) node.U = parent;
      if (red) return;
      if (node && node.C) {
        node.C = false;
        return;
      }
      do {
        if (node === this._) break;
        if (node === parent.L) {
          sibling = parent.R;
          if (sibling.C) {
            sibling.C = false;
            parent.C = true;
            d3_geom_voronoiRedBlackRotateLeft(this, parent);
            sibling = parent.R;
          }
          if (sibling.L && sibling.L.C || sibling.R && sibling.R.C) {
            if (!sibling.R || !sibling.R.C) {
              sibling.L.C = false;
              sibling.C = true;
              d3_geom_voronoiRedBlackRotateRight(this, sibling);
              sibling = parent.R;
            }
            sibling.C = parent.C;
            parent.C = sibling.R.C = false;
            d3_geom_voronoiRedBlackRotateLeft(this, parent);
            node = this._;
            break;
          }
        } else {
          sibling = parent.L;
          if (sibling.C) {
            sibling.C = false;
            parent.C = true;
            d3_geom_voronoiRedBlackRotateRight(this, parent);
            sibling = parent.L;
          }
          if (sibling.L && sibling.L.C || sibling.R && sibling.R.C) {
            if (!sibling.L || !sibling.L.C) {
              sibling.R.C = false;
              sibling.C = true;
              d3_geom_voronoiRedBlackRotateLeft(this, sibling);
              sibling = parent.L;
            }
            sibling.C = parent.C;
            parent.C = sibling.L.C = false;
            d3_geom_voronoiRedBlackRotateRight(this, parent);
            node = this._;
            break;
          }
        }
        sibling.C = true;
        node = parent;
        parent = parent.U;
      } while (!node.C);
      if (node) node.C = false;
    }
  };
  function d3_geom_voronoiRedBlackRotateLeft(tree, node) {
    var p = node, q = node.R, parent = p.U;
    if (parent) {
      if (parent.L === p) parent.L = q; else parent.R = q;
    } else {
      tree._ = q;
    }
    q.U = parent;
    p.U = q;
    p.R = q.L;
    if (p.R) p.R.U = p;
    q.L = p;
  }
  function d3_geom_voronoiRedBlackRotateRight(tree, node) {
    var p = node, q = node.L, parent = p.U;
    if (parent) {
      if (parent.L === p) parent.L = q; else parent.R = q;
    } else {
      tree._ = q;
    }
    q.U = parent;
    p.U = q;
    p.L = q.R;
    if (p.L) p.L.U = p;
    q.R = p;
  }
  function d3_geom_voronoiRedBlackFirst(node) {
    while (node.L) node = node.L;
    return node;
  }
  function d3_geom_voronoi(sites, bbox) {
    var site = sites.sort(d3_geom_voronoiVertexOrder).pop(), x0, y0, circle;
    d3_geom_voronoiEdges = [];
    d3_geom_voronoiCells = new Array(sites.length);
    d3_geom_voronoiBeaches = new d3_geom_voronoiRedBlackTree();
    d3_geom_voronoiCircles = new d3_geom_voronoiRedBlackTree();
    while (true) {
      circle = d3_geom_voronoiFirstCircle;
      if (site && (!circle || site.y < circle.y || site.y === circle.y && site.x < circle.x)) {
        if (site.x !== x0 || site.y !== y0) {
          d3_geom_voronoiCells[site.i] = new d3_geom_voronoiCell(site);
          d3_geom_voronoiAddBeach(site);
          x0 = site.x, y0 = site.y;
        }
        site = sites.pop();
      } else if (circle) {
        d3_geom_voronoiRemoveBeach(circle.arc);
      } else {
        break;
      }
    }
    if (bbox) d3_geom_voronoiClipEdges(bbox), d3_geom_voronoiCloseCells(bbox);
    var diagram = {
      cells: d3_geom_voronoiCells,
      edges: d3_geom_voronoiEdges
    };
    d3_geom_voronoiBeaches = d3_geom_voronoiCircles = d3_geom_voronoiEdges = d3_geom_voronoiCells = null;
    return diagram;
  }
  function d3_geom_voronoiVertexOrder(a, b) {
    return b.y - a.y || b.x - a.x;
  }
  d3.geom.voronoi = function(points) {
    var x = d3_geom_pointX, y = d3_geom_pointY, fx = x, fy = y, clipExtent = d3_geom_voronoiClipExtent;
    if (points) return voronoi(points);
    function voronoi(data) {
      var polygons = new Array(data.length), x0 = clipExtent[0][0], y0 = clipExtent[0][1], x1 = clipExtent[1][0], y1 = clipExtent[1][1];
      d3_geom_voronoi(sites(data), clipExtent).cells.forEach(function(cell, i) {
        var edges = cell.edges, site = cell.site, polygon = polygons[i] = edges.length ? edges.map(function(e) {
          var s = e.start();
          return [ s.x, s.y ];
        }) : site.x >= x0 && site.x <= x1 && site.y >= y0 && site.y <= y1 ? [ [ x0, y1 ], [ x1, y1 ], [ x1, y0 ], [ x0, y0 ] ] : [];
        polygon.point = data[i];
      });
      return polygons;
    }
    function sites(data) {
      return data.map(function(d, i) {
        return {
          x: Math.round(fx(d, i) / ε) * ε,
          y: Math.round(fy(d, i) / ε) * ε,
          i: i
        };
      });
    }
    voronoi.links = function(data) {
      return d3_geom_voronoi(sites(data)).edges.filter(function(edge) {
        return edge.l && edge.r;
      }).map(function(edge) {
        return {
          source: data[edge.l.i],
          target: data[edge.r.i]
        };
      });
    };
    voronoi.triangles = function(data) {
      var triangles = [];
      d3_geom_voronoi(sites(data)).cells.forEach(function(cell, i) {
        var site = cell.site, edges = cell.edges.sort(d3_geom_voronoiHalfEdgeOrder), j = -1, m = edges.length, e0, s0, e1 = edges[m - 1].edge, s1 = e1.l === site ? e1.r : e1.l;
        while (++j < m) {
          e0 = e1;
          s0 = s1;
          e1 = edges[j].edge;
          s1 = e1.l === site ? e1.r : e1.l;
          if (i < s0.i && i < s1.i && d3_geom_voronoiTriangleArea(site, s0, s1) < 0) {
            triangles.push([ data[i], data[s0.i], data[s1.i] ]);
          }
        }
      });
      return triangles;
    };
    voronoi.x = function(_) {
      return arguments.length ? (fx = d3_functor(x = _), voronoi) : x;
    };
    voronoi.y = function(_) {
      return arguments.length ? (fy = d3_functor(y = _), voronoi) : y;
    };
    voronoi.clipExtent = function(_) {
      if (!arguments.length) return clipExtent === d3_geom_voronoiClipExtent ? null : clipExtent;
      clipExtent = _ == null ? d3_geom_voronoiClipExtent : _;
      return voronoi;
    };
    voronoi.size = function(_) {
      if (!arguments.length) return clipExtent === d3_geom_voronoiClipExtent ? null : clipExtent && clipExtent[1];
      return voronoi.clipExtent(_ && [ [ 0, 0 ], _ ]);
    };
    return voronoi;
  };
  var d3_geom_voronoiClipExtent = [ [ -1e6, -1e6 ], [ 1e6, 1e6 ] ];
  function d3_geom_voronoiTriangleArea(a, b, c) {
    return (a.x - c.x) * (b.y - a.y) - (a.x - b.x) * (c.y - a.y);
  }
  d3.geom.delaunay = function(vertices) {
    return d3.geom.voronoi().triangles(vertices);
  };
  d3.geom.quadtree = function(points, x1, y1, x2, y2) {
    var x = d3_geom_pointX, y = d3_geom_pointY, compat;
    if (compat = arguments.length) {
      x = d3_geom_quadtreeCompatX;
      y = d3_geom_quadtreeCompatY;
      if (compat === 3) {
        y2 = y1;
        x2 = x1;
        y1 = x1 = 0;
      }
      return quadtree(points);
    }
    function quadtree(data) {
      var d, fx = d3_functor(x), fy = d3_functor(y), xs, ys, i, n, x1_, y1_, x2_, y2_;
      if (x1 != null) {
        x1_ = x1, y1_ = y1, x2_ = x2, y2_ = y2;
      } else {
        x2_ = y2_ = -(x1_ = y1_ = Infinity);
        xs = [], ys = [];
        n = data.length;
        if (compat) for (i = 0; i < n; ++i) {
          d = data[i];
          if (d.x < x1_) x1_ = d.x;
          if (d.y < y1_) y1_ = d.y;
          if (d.x > x2_) x2_ = d.x;
          if (d.y > y2_) y2_ = d.y;
          xs.push(d.x);
          ys.push(d.y);
        } else for (i = 0; i < n; ++i) {
          var x_ = +fx(d = data[i], i), y_ = +fy(d, i);
          if (x_ < x1_) x1_ = x_;
          if (y_ < y1_) y1_ = y_;
          if (x_ > x2_) x2_ = x_;
          if (y_ > y2_) y2_ = y_;
          xs.push(x_);
          ys.push(y_);
        }
      }
      var dx = x2_ - x1_, dy = y2_ - y1_;
      if (dx > dy) y2_ = y1_ + dx; else x2_ = x1_ + dy;
      function insert(n, d, x, y, x1, y1, x2, y2) {
        if (isNaN(x) || isNaN(y)) return;
        if (n.leaf) {
          var nx = n.x, ny = n.y;
          if (nx != null) {
            if (abs(nx - x) + abs(ny - y) < .01) {
              insertChild(n, d, x, y, x1, y1, x2, y2);
            } else {
              var nPoint = n.point;
              n.x = n.y = n.point = null;
              insertChild(n, nPoint, nx, ny, x1, y1, x2, y2);
              insertChild(n, d, x, y, x1, y1, x2, y2);
            }
          } else {
            n.x = x, n.y = y, n.point = d;
          }
        } else {
          insertChild(n, d, x, y, x1, y1, x2, y2);
        }
      }
      function insertChild(n, d, x, y, x1, y1, x2, y2) {
        var xm = (x1 + x2) * .5, ym = (y1 + y2) * .5, right = x >= xm, below = y >= ym, i = below << 1 | right;
        n.leaf = false;
        n = n.nodes[i] || (n.nodes[i] = d3_geom_quadtreeNode());
        if (right) x1 = xm; else x2 = xm;
        if (below) y1 = ym; else y2 = ym;
        insert(n, d, x, y, x1, y1, x2, y2);
      }
      var root = d3_geom_quadtreeNode();
      root.add = function(d) {
        insert(root, d, +fx(d, ++i), +fy(d, i), x1_, y1_, x2_, y2_);
      };
      root.visit = function(f) {
        d3_geom_quadtreeVisit(f, root, x1_, y1_, x2_, y2_);
      };
      root.find = function(point) {
        return d3_geom_quadtreeFind(root, point[0], point[1], x1_, y1_, x2_, y2_);
      };
      i = -1;
      if (x1 == null) {
        while (++i < n) {
          insert(root, data[i], xs[i], ys[i], x1_, y1_, x2_, y2_);
        }
        --i;
      } else data.forEach(root.add);
      xs = ys = data = d = null;
      return root;
    }
    quadtree.x = function(_) {
      return arguments.length ? (x = _, quadtree) : x;
    };
    quadtree.y = function(_) {
      return arguments.length ? (y = _, quadtree) : y;
    };
    quadtree.extent = function(_) {
      if (!arguments.length) return x1 == null ? null : [ [ x1, y1 ], [ x2, y2 ] ];
      if (_ == null) x1 = y1 = x2 = y2 = null; else x1 = +_[0][0], y1 = +_[0][1], x2 = +_[1][0], 
      y2 = +_[1][1];
      return quadtree;
    };
    quadtree.size = function(_) {
      if (!arguments.length) return x1 == null ? null : [ x2 - x1, y2 - y1 ];
      if (_ == null) x1 = y1 = x2 = y2 = null; else x1 = y1 = 0, x2 = +_[0], y2 = +_[1];
      return quadtree;
    };
    return quadtree;
  };
  function d3_geom_quadtreeCompatX(d) {
    return d.x;
  }
  function d3_geom_quadtreeCompatY(d) {
    return d.y;
  }
  function d3_geom_quadtreeNode() {
    return {
      leaf: true,
      nodes: [],
      point: null,
      x: null,
      y: null
    };
  }
  function d3_geom_quadtreeVisit(f, node, x1, y1, x2, y2) {
    if (!f(node, x1, y1, x2, y2)) {
      var sx = (x1 + x2) * .5, sy = (y1 + y2) * .5, children = node.nodes;
      if (children[0]) d3_geom_quadtreeVisit(f, children[0], x1, y1, sx, sy);
      if (children[1]) d3_geom_quadtreeVisit(f, children[1], sx, y1, x2, sy);
      if (children[2]) d3_geom_quadtreeVisit(f, children[2], x1, sy, sx, y2);
      if (children[3]) d3_geom_quadtreeVisit(f, children[3], sx, sy, x2, y2);
    }
  }
  function d3_geom_quadtreeFind(root, x, y, x0, y0, x3, y3) {
    var minDistance2 = Infinity, closestPoint;
    (function find(node, x1, y1, x2, y2) {
      if (x1 > x3 || y1 > y3 || x2 < x0 || y2 < y0) return;
      if (point = node.point) {
        var point, dx = x - node.x, dy = y - node.y, distance2 = dx * dx + dy * dy;
        if (distance2 < minDistance2) {
          var distance = Math.sqrt(minDistance2 = distance2);
          x0 = x - distance, y0 = y - distance;
          x3 = x + distance, y3 = y + distance;
          closestPoint = point;
        }
      }
      var children = node.nodes, xm = (x1 + x2) * .5, ym = (y1 + y2) * .5, right = x >= xm, below = y >= ym;
      for (var i = below << 1 | right, j = i + 4; i < j; ++i) {
        if (node = children[i & 3]) switch (i & 3) {
         case 0:
          find(node, x1, y1, xm, ym);
          break;

         case 1:
          find(node, xm, y1, x2, ym);
          break;

         case 2:
          find(node, x1, ym, xm, y2);
          break;

         case 3:
          find(node, xm, ym, x2, y2);
          break;
        }
      }
    })(root, x0, y0, x3, y3);
    return closestPoint;
  }
  d3.interpolateRgb = d3_interpolateRgb;
  function d3_interpolateRgb(a, b) {
    a = d3.rgb(a);
    b = d3.rgb(b);
    var ar = a.r, ag = a.g, ab = a.b, br = b.r - ar, bg = b.g - ag, bb = b.b - ab;
    return function(t) {
      return "#" + d3_rgb_hex(Math.round(ar + br * t)) + d3_rgb_hex(Math.round(ag + bg * t)) + d3_rgb_hex(Math.round(ab + bb * t));
    };
  }
  d3.interpolateObject = d3_interpolateObject;
  function d3_interpolateObject(a, b) {
    var i = {}, c = {}, k;
    for (k in a) {
      if (k in b) {
        i[k] = d3_interpolate(a[k], b[k]);
      } else {
        c[k] = a[k];
      }
    }
    for (k in b) {
      if (!(k in a)) {
        c[k] = b[k];
      }
    }
    return function(t) {
      for (k in i) c[k] = i[k](t);
      return c;
    };
  }
  d3.interpolateNumber = d3_interpolateNumber;
  function d3_interpolateNumber(a, b) {
    a = +a, b = +b;
    return function(t) {
      return a * (1 - t) + b * t;
    };
  }
  d3.interpolateString = d3_interpolateString;
  function d3_interpolateString(a, b) {
    var bi = d3_interpolate_numberA.lastIndex = d3_interpolate_numberB.lastIndex = 0, am, bm, bs, i = -1, s = [], q = [];
    a = a + "", b = b + "";
    while ((am = d3_interpolate_numberA.exec(a)) && (bm = d3_interpolate_numberB.exec(b))) {
      if ((bs = bm.index) > bi) {
        bs = b.slice(bi, bs);
        if (s[i]) s[i] += bs; else s[++i] = bs;
      }
      if ((am = am[0]) === (bm = bm[0])) {
        if (s[i]) s[i] += bm; else s[++i] = bm;
      } else {
        s[++i] = null;
        q.push({
          i: i,
          x: d3_interpolateNumber(am, bm)
        });
      }
      bi = d3_interpolate_numberB.lastIndex;
    }
    if (bi < b.length) {
      bs = b.slice(bi);
      if (s[i]) s[i] += bs; else s[++i] = bs;
    }
    return s.length < 2 ? q[0] ? (b = q[0].x, function(t) {
      return b(t) + "";
    }) : function() {
      return b;
    } : (b = q.length, function(t) {
      for (var i = 0, o; i < b; ++i) s[(o = q[i]).i] = o.x(t);
      return s.join("");
    });
  }
  var d3_interpolate_numberA = /[-+]?(?:\d+\.?\d*|\.?\d+)(?:[eE][-+]?\d+)?/g, d3_interpolate_numberB = new RegExp(d3_interpolate_numberA.source, "g");
  d3.interpolate = d3_interpolate;
  function d3_interpolate(a, b) {
    var i = d3.interpolators.length, f;
    while (--i >= 0 && !(f = d3.interpolators[i](a, b))) ;
    return f;
  }
  d3.interpolators = [ function(a, b) {
    var t = typeof b;
    return (t === "string" ? d3_rgb_names.has(b.toLowerCase()) || /^(#|rgb\(|hsl\()/i.test(b) ? d3_interpolateRgb : d3_interpolateString : b instanceof d3_color ? d3_interpolateRgb : Array.isArray(b) ? d3_interpolateArray : t === "object" && isNaN(b) ? d3_interpolateObject : d3_interpolateNumber)(a, b);
  } ];
  d3.interpolateArray = d3_interpolateArray;
  function d3_interpolateArray(a, b) {
    var x = [], c = [], na = a.length, nb = b.length, n0 = Math.min(a.length, b.length), i;
    for (i = 0; i < n0; ++i) x.push(d3_interpolate(a[i], b[i]));
    for (;i < na; ++i) c[i] = a[i];
    for (;i < nb; ++i) c[i] = b[i];
    return function(t) {
      for (i = 0; i < n0; ++i) c[i] = x[i](t);
      return c;
    };
  }
  var d3_ease_default = function() {
    return d3_identity;
  };
  var d3_ease = d3.map({
    linear: d3_ease_default,
    poly: d3_ease_poly,
    quad: function() {
      return d3_ease_quad;
    },
    cubic: function() {
      return d3_ease_cubic;
    },
    sin: function() {
      return d3_ease_sin;
    },
    exp: function() {
      return d3_ease_exp;
    },
    circle: function() {
      return d3_ease_circle;
    },
    elastic: d3_ease_elastic,
    back: d3_ease_back,
    bounce: function() {
      return d3_ease_bounce;
    }
  });
  var d3_ease_mode = d3.map({
    "in": d3_identity,
    out: d3_ease_reverse,
    "in-out": d3_ease_reflect,
    "out-in": function(f) {
      return d3_ease_reflect(d3_ease_reverse(f));
    }
  });
  d3.ease = function(name) {
    var i = name.indexOf("-"), t = i >= 0 ? name.slice(0, i) : name, m = i >= 0 ? name.slice(i + 1) : "in";
    t = d3_ease.get(t) || d3_ease_default;
    m = d3_ease_mode.get(m) || d3_identity;
    return d3_ease_clamp(m(t.apply(null, d3_arraySlice.call(arguments, 1))));
  };
  function d3_ease_clamp(f) {
    return function(t) {
      return t <= 0 ? 0 : t >= 1 ? 1 : f(t);
    };
  }
  function d3_ease_reverse(f) {
    return function(t) {
      return 1 - f(1 - t);
    };
  }
  function d3_ease_reflect(f) {
    return function(t) {
      return .5 * (t < .5 ? f(2 * t) : 2 - f(2 - 2 * t));
    };
  }
  function d3_ease_quad(t) {
    return t * t;
  }
  function d3_ease_cubic(t) {
    return t * t * t;
  }
  function d3_ease_cubicInOut(t) {
    if (t <= 0) return 0;
    if (t >= 1) return 1;
    var t2 = t * t, t3 = t2 * t;
    return 4 * (t < .5 ? t3 : 3 * (t - t2) + t3 - .75);
  }
  function d3_ease_poly(e) {
    return function(t) {
      return Math.pow(t, e);
    };
  }
  function d3_ease_sin(t) {
    return 1 - Math.cos(t * halfπ);
  }
  function d3_ease_exp(t) {
    return Math.pow(2, 10 * (t - 1));
  }
  function d3_ease_circle(t) {
    return 1 - Math.sqrt(1 - t * t);
  }
  function d3_ease_elastic(a, p) {
    var s;
    if (arguments.length < 2) p = .45;
    if (arguments.length) s = p / τ * Math.asin(1 / a); else a = 1, s = p / 4;
    return function(t) {
      return 1 + a * Math.pow(2, -10 * t) * Math.sin((t - s) * τ / p);
    };
  }
  function d3_ease_back(s) {
    if (!s) s = 1.70158;
    return function(t) {
      return t * t * ((s + 1) * t - s);
    };
  }
  function d3_ease_bounce(t) {
    return t < 1 / 2.75 ? 7.5625 * t * t : t < 2 / 2.75 ? 7.5625 * (t -= 1.5 / 2.75) * t + .75 : t < 2.5 / 2.75 ? 7.5625 * (t -= 2.25 / 2.75) * t + .9375 : 7.5625 * (t -= 2.625 / 2.75) * t + .984375;
  }
  d3.interpolateHcl = d3_interpolateHcl;
  function d3_interpolateHcl(a, b) {
    a = d3.hcl(a);
    b = d3.hcl(b);
    var ah = a.h, ac = a.c, al = a.l, bh = b.h - ah, bc = b.c - ac, bl = b.l - al;
    if (isNaN(bc)) bc = 0, ac = isNaN(ac) ? b.c : ac;
    if (isNaN(bh)) bh = 0, ah = isNaN(ah) ? b.h : ah; else if (bh > 180) bh -= 360; else if (bh < -180) bh += 360;
    return function(t) {
      return d3_hcl_lab(ah + bh * t, ac + bc * t, al + bl * t) + "";
    };
  }
  d3.interpolateHsl = d3_interpolateHsl;
  function d3_interpolateHsl(a, b) {
    a = d3.hsl(a);
    b = d3.hsl(b);
    var ah = a.h, as = a.s, al = a.l, bh = b.h - ah, bs = b.s - as, bl = b.l - al;
    if (isNaN(bs)) bs = 0, as = isNaN(as) ? b.s : as;
    if (isNaN(bh)) bh = 0, ah = isNaN(ah) ? b.h : ah; else if (bh > 180) bh -= 360; else if (bh < -180) bh += 360;
    return function(t) {
      return d3_hsl_rgb(ah + bh * t, as + bs * t, al + bl * t) + "";
    };
  }
  d3.interpolateLab = d3_interpolateLab;
  function d3_interpolateLab(a, b) {
    a = d3.lab(a);
    b = d3.lab(b);
    var al = a.l, aa = a.a, ab = a.b, bl = b.l - al, ba = b.a - aa, bb = b.b - ab;
    return function(t) {
      return d3_lab_rgb(al + bl * t, aa + ba * t, ab + bb * t) + "";
    };
  }
  d3.interpolateRound = d3_interpolateRound;
  function d3_interpolateRound(a, b) {
    b -= a;
    return function(t) {
      return Math.round(a + b * t);
    };
  }
  d3.transform = function(string) {
    var g = d3_document.createElementNS(d3.ns.prefix.svg, "g");
    return (d3.transform = function(string) {
      if (string != null) {
        g.setAttribute("transform", string);
        var t = g.transform.baseVal.consolidate();
      }
      return new d3_transform(t ? t.matrix : d3_transformIdentity);
    })(string);
  };
  function d3_transform(m) {
    var r0 = [ m.a, m.b ], r1 = [ m.c, m.d ], kx = d3_transformNormalize(r0), kz = d3_transformDot(r0, r1), ky = d3_transformNormalize(d3_transformCombine(r1, r0, -kz)) || 0;
    if (r0[0] * r1[1] < r1[0] * r0[1]) {
      r0[0] *= -1;
      r0[1] *= -1;
      kx *= -1;
      kz *= -1;
    }
    this.rotate = (kx ? Math.atan2(r0[1], r0[0]) : Math.atan2(-r1[0], r1[1])) * d3_degrees;
    this.translate = [ m.e, m.f ];
    this.scale = [ kx, ky ];
    this.skew = ky ? Math.atan2(kz, ky) * d3_degrees : 0;
  }
  d3_transform.prototype.toString = function() {
    return "translate(" + this.translate + ")rotate(" + this.rotate + ")skewX(" + this.skew + ")scale(" + this.scale + ")";
  };
  function d3_transformDot(a, b) {
    return a[0] * b[0] + a[1] * b[1];
  }
  function d3_transformNormalize(a) {
    var k = Math.sqrt(d3_transformDot(a, a));
    if (k) {
      a[0] /= k;
      a[1] /= k;
    }
    return k;
  }
  function d3_transformCombine(a, b, k) {
    a[0] += k * b[0];
    a[1] += k * b[1];
    return a;
  }
  var d3_transformIdentity = {
    a: 1,
    b: 0,
    c: 0,
    d: 1,
    e: 0,
    f: 0
  };
  d3.interpolateTransform = d3_interpolateTransform;
  function d3_interpolateTransformPop(s) {
    return s.length ? s.pop() + "," : "";
  }
  function d3_interpolateTranslate(ta, tb, s, q) {
    if (ta[0] !== tb[0] || ta[1] !== tb[1]) {
      var i = s.push("translate(", null, ",", null, ")");
      q.push({
        i: i - 4,
        x: d3_interpolateNumber(ta[0], tb[0])
      }, {
        i: i - 2,
        x: d3_interpolateNumber(ta[1], tb[1])
      });
    } else if (tb[0] || tb[1]) {
      s.push("translate(" + tb + ")");
    }
  }
  function d3_interpolateRotate(ra, rb, s, q) {
    if (ra !== rb) {
      if (ra - rb > 180) rb += 360; else if (rb - ra > 180) ra += 360;
      q.push({
        i: s.push(d3_interpolateTransformPop(s) + "rotate(", null, ")") - 2,
        x: d3_interpolateNumber(ra, rb)
      });
    } else if (rb) {
      s.push(d3_interpolateTransformPop(s) + "rotate(" + rb + ")");
    }
  }
  function d3_interpolateSkew(wa, wb, s, q) {
    if (wa !== wb) {
      q.push({
        i: s.push(d3_interpolateTransformPop(s) + "skewX(", null, ")") - 2,
        x: d3_interpolateNumber(wa, wb)
      });
    } else if (wb) {
      s.push(d3_interpolateTransformPop(s) + "skewX(" + wb + ")");
    }
  }
  function d3_interpolateScale(ka, kb, s, q) {
    if (ka[0] !== kb[0] || ka[1] !== kb[1]) {
      var i = s.push(d3_interpolateTransformPop(s) + "scale(", null, ",", null, ")");
      q.push({
        i: i - 4,
        x: d3_interpolateNumber(ka[0], kb[0])
      }, {
        i: i - 2,
        x: d3_interpolateNumber(ka[1], kb[1])
      });
    } else if (kb[0] !== 1 || kb[1] !== 1) {
      s.push(d3_interpolateTransformPop(s) + "scale(" + kb + ")");
    }
  }
  function d3_interpolateTransform(a, b) {
    var s = [], q = [];
    a = d3.transform(a), b = d3.transform(b);
    d3_interpolateTranslate(a.translate, b.translate, s, q);
    d3_interpolateRotate(a.rotate, b.rotate, s, q);
    d3_interpolateSkew(a.skew, b.skew, s, q);
    d3_interpolateScale(a.scale, b.scale, s, q);
    a = b = null;
    return function(t) {
      var i = -1, n = q.length, o;
      while (++i < n) s[(o = q[i]).i] = o.x(t);
      return s.join("");
    };
  }
  function d3_uninterpolateNumber(a, b) {
    b = (b -= a = +a) || 1 / b;
    return function(x) {
      return (x - a) / b;
    };
  }
  function d3_uninterpolateClamp(a, b) {
    b = (b -= a = +a) || 1 / b;
    return function(x) {
      return Math.max(0, Math.min(1, (x - a) / b));
    };
  }
  d3.layout = {};
  d3.layout.bundle = function() {
    return function(links) {
      var paths = [], i = -1, n = links.length;
      while (++i < n) paths.push(d3_layout_bundlePath(links[i]));
      return paths;
    };
  };
  function d3_layout_bundlePath(link) {
    var start = link.source, end = link.target, lca = d3_layout_bundleLeastCommonAncestor(start, end), points = [ start ];
    while (start !== lca) {
      start = start.parent;
      points.push(start);
    }
    var k = points.length;
    while (end !== lca) {
      points.splice(k, 0, end);
      end = end.parent;
    }
    return points;
  }
  function d3_layout_bundleAncestors(node) {
    var ancestors = [], parent = node.parent;
    while (parent != null) {
      ancestors.push(node);
      node = parent;
      parent = parent.parent;
    }
    ancestors.push(node);
    return ancestors;
  }
  function d3_layout_bundleLeastCommonAncestor(a, b) {
    if (a === b) return a;
    var aNodes = d3_layout_bundleAncestors(a), bNodes = d3_layout_bundleAncestors(b), aNode = aNodes.pop(), bNode = bNodes.pop(), sharedNode = null;
    while (aNode === bNode) {
      sharedNode = aNode;
      aNode = aNodes.pop();
      bNode = bNodes.pop();
    }
    return sharedNode;
  }
  d3.layout.chord = function() {
    var chord = {}, chords, groups, matrix, n, padding = 0, sortGroups, sortSubgroups, sortChords;
    function relayout() {
      var subgroups = {}, groupSums = [], groupIndex = d3.range(n), subgroupIndex = [], k, x, x0, i, j;
      chords = [];
      groups = [];
      k = 0, i = -1;
      while (++i < n) {
        x = 0, j = -1;
        while (++j < n) {
          x += matrix[i][j];
        }
        groupSums.push(x);
        subgroupIndex.push(d3.range(n));
        k += x;
      }
      if (sortGroups) {
        groupIndex.sort(function(a, b) {
          return sortGroups(groupSums[a], groupSums[b]);
        });
      }
      if (sortSubgroups) {
        subgroupIndex.forEach(function(d, i) {
          d.sort(function(a, b) {
            return sortSubgroups(matrix[i][a], matrix[i][b]);
          });
        });
      }
      k = (τ - padding * n) / k;
      x = 0, i = -1;
      while (++i < n) {
        x0 = x, j = -1;
        while (++j < n) {
          var di = groupIndex[i], dj = subgroupIndex[di][j], v = matrix[di][dj], a0 = x, a1 = x += v * k;
          subgroups[di + "-" + dj] = {
            index: di,
            subindex: dj,
            startAngle: a0,
            endAngle: a1,
            value: v
          };
        }
        groups[di] = {
          index: di,
          startAngle: x0,
          endAngle: x,
          value: groupSums[di]
        };
        x += padding;
      }
      i = -1;
      while (++i < n) {
        j = i - 1;
        while (++j < n) {
          var source = subgroups[i + "-" + j], target = subgroups[j + "-" + i];
          if (source.value || target.value) {
            chords.push(source.value < target.value ? {
              source: target,
              target: source
            } : {
              source: source,
              target: target
            });
          }
        }
      }
      if (sortChords) resort();
    }
    function resort() {
      chords.sort(function(a, b) {
        return sortChords((a.source.value + a.target.value) / 2, (b.source.value + b.target.value) / 2);
      });
    }
    chord.matrix = function(x) {
      if (!arguments.length) return matrix;
      n = (matrix = x) && matrix.length;
      chords = groups = null;
      return chord;
    };
    chord.padding = function(x) {
      if (!arguments.length) return padding;
      padding = x;
      chords = groups = null;
      return chord;
    };
    chord.sortGroups = function(x) {
      if (!arguments.length) return sortGroups;
      sortGroups = x;
      chords = groups = null;
      return chord;
    };
    chord.sortSubgroups = function(x) {
      if (!arguments.length) return sortSubgroups;
      sortSubgroups = x;
      chords = null;
      return chord;
    };
    chord.sortChords = function(x) {
      if (!arguments.length) return sortChords;
      sortChords = x;
      if (chords) resort();
      return chord;
    };
    chord.chords = function() {
      if (!chords) relayout();
      return chords;
    };
    chord.groups = function() {
      if (!groups) relayout();
      return groups;
    };
    return chord;
  };
  d3.layout.force = function() {
    var force = {}, event = d3.dispatch("start", "tick", "end"), timer, size = [ 1, 1 ], drag, alpha, friction = .9, linkDistance = d3_layout_forceLinkDistance, linkStrength = d3_layout_forceLinkStrength, charge = -30, chargeDistance2 = d3_layout_forceChargeDistance2, gravity = .1, theta2 = .64, nodes = [], links = [], distances, strengths, charges;
    function repulse(node) {
      return function(quad, x1, _, x2) {
        if (quad.point !== node) {
          var dx = quad.cx - node.x, dy = quad.cy - node.y, dw = x2 - x1, dn = dx * dx + dy * dy;
          if (dw * dw / theta2 < dn) {
            if (dn < chargeDistance2) {
              var k = quad.charge / dn;
              node.px -= dx * k;
              node.py -= dy * k;
            }
            return true;
          }
          if (quad.point && dn && dn < chargeDistance2) {
            var k = quad.pointCharge / dn;
            node.px -= dx * k;
            node.py -= dy * k;
          }
        }
        return !quad.charge;
      };
    }
    force.tick = function() {
      if ((alpha *= .99) < .005) {
        timer = null;
        event.end({
          type: "end",
          alpha: alpha = 0
        });
        return true;
      }
      var n = nodes.length, m = links.length, q, i, o, s, t, l, k, x, y;
      for (i = 0; i < m; ++i) {
        o = links[i];
        s = o.source;
        t = o.target;
        x = t.x - s.x;
        y = t.y - s.y;
        if (l = x * x + y * y) {
          l = alpha * strengths[i] * ((l = Math.sqrt(l)) - distances[i]) / l;
          x *= l;
          y *= l;
          t.x -= x * (k = s.weight + t.weight ? s.weight / (s.weight + t.weight) : .5);
          t.y -= y * k;
          s.x += x * (k = 1 - k);
          s.y += y * k;
        }
      }
      if (k = alpha * gravity) {
        x = size[0] / 2;
        y = size[1] / 2;
        i = -1;
        if (k) while (++i < n) {
          o = nodes[i];
          o.x += (x - o.x) * k;
          o.y += (y - o.y) * k;
        }
      }
      if (charge) {
        d3_layout_forceAccumulate(q = d3.geom.quadtree(nodes), alpha, charges);
        i = -1;
        while (++i < n) {
          if (!(o = nodes[i]).fixed) {
            q.visit(repulse(o));
          }
        }
      }
      i = -1;
      while (++i < n) {
        o = nodes[i];
        if (o.fixed) {
          o.x = o.px;
          o.y = o.py;
        } else {
          o.x -= (o.px - (o.px = o.x)) * friction;
          o.y -= (o.py - (o.py = o.y)) * friction;
        }
      }
      event.tick({
        type: "tick",
        alpha: alpha
      });
    };
    force.nodes = function(x) {
      if (!arguments.length) return nodes;
      nodes = x;
      return force;
    };
    force.links = function(x) {
      if (!arguments.length) return links;
      links = x;
      return force;
    };
    force.size = function(x) {
      if (!arguments.length) return size;
      size = x;
      return force;
    };
    force.linkDistance = function(x) {
      if (!arguments.length) return linkDistance;
      linkDistance = typeof x === "function" ? x : +x;
      return force;
    };
    force.distance = force.linkDistance;
    force.linkStrength = function(x) {
      if (!arguments.length) return linkStrength;
      linkStrength = typeof x === "function" ? x : +x;
      return force;
    };
    force.friction = function(x) {
      if (!arguments.length) return friction;
      friction = +x;
      return force;
    };
    force.charge = function(x) {
      if (!arguments.length) return charge;
      charge = typeof x === "function" ? x : +x;
      return force;
    };
    force.chargeDistance = function(x) {
      if (!arguments.length) return Math.sqrt(chargeDistance2);
      chargeDistance2 = x * x;
      return force;
    };
    force.gravity = function(x) {
      if (!arguments.length) return gravity;
      gravity = +x;
      return force;
    };
    force.theta = function(x) {
      if (!arguments.length) return Math.sqrt(theta2);
      theta2 = x * x;
      return force;
    };
    force.alpha = function(x) {
      if (!arguments.length) return alpha;
      x = +x;
      if (alpha) {
        if (x > 0) {
          alpha = x;
        } else {
          timer.c = null, timer.t = NaN, timer = null;
          event.end({
            type: "end",
            alpha: alpha = 0
          });
        }
      } else if (x > 0) {
        event.start({
          type: "start",
          alpha: alpha = x
        });
        timer = d3_timer(force.tick);
      }
      return force;
    };
    force.start = function() {
      var i, n = nodes.length, m = links.length, w = size[0], h = size[1], neighbors, o;
      for (i = 0; i < n; ++i) {
        (o = nodes[i]).index = i;
        o.weight = 0;
      }
      for (i = 0; i < m; ++i) {
        o = links[i];
        if (typeof o.source == "number") o.source = nodes[o.source];
        if (typeof o.target == "number") o.target = nodes[o.target];
        ++o.source.weight;
        ++o.target.weight;
      }
      for (i = 0; i < n; ++i) {
        o = nodes[i];
        if (isNaN(o.x)) o.x = position("x", w);
        if (isNaN(o.y)) o.y = position("y", h);
        if (isNaN(o.px)) o.px = o.x;
        if (isNaN(o.py)) o.py = o.y;
      }
      distances = [];
      if (typeof linkDistance === "function") for (i = 0; i < m; ++i) distances[i] = +linkDistance.call(this, links[i], i); else for (i = 0; i < m; ++i) distances[i] = linkDistance;
      strengths = [];
      if (typeof linkStrength === "function") for (i = 0; i < m; ++i) strengths[i] = +linkStrength.call(this, links[i], i); else for (i = 0; i < m; ++i) strengths[i] = linkStrength;
      charges = [];
      if (typeof charge === "function") for (i = 0; i < n; ++i) charges[i] = +charge.call(this, nodes[i], i); else for (i = 0; i < n; ++i) charges[i] = charge;
      function position(dimension, size) {
        if (!neighbors) {
          neighbors = new Array(n);
          for (j = 0; j < n; ++j) {
            neighbors[j] = [];
          }
          for (j = 0; j < m; ++j) {
            var o = links[j];
            neighbors[o.source.index].push(o.target);
            neighbors[o.target.index].push(o.source);
          }
        }
        var candidates = neighbors[i], j = -1, l = candidates.length, x;
        while (++j < l) if (!isNaN(x = candidates[j][dimension])) return x;
        return Math.random() * size;
      }
      return force.resume();
    };
    force.resume = function() {
      return force.alpha(.1);
    };
    force.stop = function() {
      return force.alpha(0);
    };
    force.drag = function() {
      if (!drag) drag = d3.behavior.drag().origin(d3_identity).on("dragstart.force", d3_layout_forceDragstart).on("drag.force", dragmove).on("dragend.force", d3_layout_forceDragend);
      if (!arguments.length) return drag;
      this.on("mouseover.force", d3_layout_forceMouseover).on("mouseout.force", d3_layout_forceMouseout).call(drag);
    };
    function dragmove(d) {
      d.px = d3.event.x, d.py = d3.event.y;
      force.resume();
    }
    return d3.rebind(force, event, "on");
  };
  function d3_layout_forceDragstart(d) {
    d.fixed |= 2;
  }
  function d3_layout_forceDragend(d) {
    d.fixed &= ~6;
  }
  function d3_layout_forceMouseover(d) {
    d.fixed |= 4;
    d.px = d.x, d.py = d.y;
  }
  function d3_layout_forceMouseout(d) {
    d.fixed &= ~4;
  }
  function d3_layout_forceAccumulate(quad, alpha, charges) {
    var cx = 0, cy = 0;
    quad.charge = 0;
    if (!quad.leaf) {
      var nodes = quad.nodes, n = nodes.length, i = -1, c;
      while (++i < n) {
        c = nodes[i];
        if (c == null) continue;
        d3_layout_forceAccumulate(c, alpha, charges);
        quad.charge += c.charge;
        cx += c.charge * c.cx;
        cy += c.charge * c.cy;
      }
    }
    if (quad.point) {
      if (!quad.leaf) {
        quad.point.x += Math.random() - .5;
        quad.point.y += Math.random() - .5;
      }
      var k = alpha * charges[quad.point.index];
      quad.charge += quad.pointCharge = k;
      cx += k * quad.point.x;
      cy += k * quad.point.y;
    }
    quad.cx = cx / quad.charge;
    quad.cy = cy / quad.charge;
  }
  var d3_layout_forceLinkDistance = 20, d3_layout_forceLinkStrength = 1, d3_layout_forceChargeDistance2 = Infinity;
  d3.layout.hierarchy = function() {
    var sort = d3_layout_hierarchySort, children = d3_layout_hierarchyChildren, value = d3_layout_hierarchyValue;
    function hierarchy(root) {
      var stack = [ root ], nodes = [], node;
      root.depth = 0;
      while ((node = stack.pop()) != null) {
        nodes.push(node);
        if ((childs = children.call(hierarchy, node, node.depth)) && (n = childs.length)) {
          var n, childs, child;
          while (--n >= 0) {
            stack.push(child = childs[n]);
            child.parent = node;
            child.depth = node.depth + 1;
          }
          if (value) node.value = 0;
          node.children = childs;
        } else {
          if (value) node.value = +value.call(hierarchy, node, node.depth) || 0;
          delete node.children;
        }
      }
      d3_layout_hierarchyVisitAfter(root, function(node) {
        var childs, parent;
        if (sort && (childs = node.children)) childs.sort(sort);
        if (value && (parent = node.parent)) parent.value += node.value;
      });
      return nodes;
    }
    hierarchy.sort = function(x) {
      if (!arguments.length) return sort;
      sort = x;
      return hierarchy;
    };
    hierarchy.children = function(x) {
      if (!arguments.length) return children;
      children = x;
      return hierarchy;
    };
    hierarchy.value = function(x) {
      if (!arguments.length) return value;
      value = x;
      return hierarchy;
    };
    hierarchy.revalue = function(root) {
      if (value) {
        d3_layout_hierarchyVisitBefore(root, function(node) {
          if (node.children) node.value = 0;
        });
        d3_layout_hierarchyVisitAfter(root, function(node) {
          var parent;
          if (!node.children) node.value = +value.call(hierarchy, node, node.depth) || 0;
          if (parent = node.parent) parent.value += node.value;
        });
      }
      return root;
    };
    return hierarchy;
  };
  function d3_layout_hierarchyRebind(object, hierarchy) {
    d3.rebind(object, hierarchy, "sort", "children", "value");
    object.nodes = object;
    object.links = d3_layout_hierarchyLinks;
    return object;
  }
  function d3_layout_hierarchyVisitBefore(node, callback) {
    var nodes = [ node ];
    while ((node = nodes.pop()) != null) {
      callback(node);
      if ((children = node.children) && (n = children.length)) {
        var n, children;
        while (--n >= 0) nodes.push(children[n]);
      }
    }
  }
  function d3_layout_hierarchyVisitAfter(node, callback) {
    var nodes = [ node ], nodes2 = [];
    while ((node = nodes.pop()) != null) {
      nodes2.push(node);
      if ((children = node.children) && (n = children.length)) {
        var i = -1, n, children;
        while (++i < n) nodes.push(children[i]);
      }
    }
    while ((node = nodes2.pop()) != null) {
      callback(node);
    }
  }
  function d3_layout_hierarchyChildren(d) {
    return d.children;
  }
  function d3_layout_hierarchyValue(d) {
    return d.value;
  }
  function d3_layout_hierarchySort(a, b) {
    return b.value - a.value;
  }
  function d3_layout_hierarchyLinks(nodes) {
    return d3.merge(nodes.map(function(parent) {
      return (parent.children || []).map(function(child) {
        return {
          source: parent,
          target: child
        };
      });
    }));
  }
  d3.layout.partition = function() {
    var hierarchy = d3.layout.hierarchy(), size = [ 1, 1 ];
    function position(node, x, dx, dy) {
      var children = node.children;
      node.x = x;
      node.y = node.depth * dy;
      node.dx = dx;
      node.dy = dy;
      if (children && (n = children.length)) {
        var i = -1, n, c, d;
        dx = node.value ? dx / node.value : 0;
        while (++i < n) {
          position(c = children[i], x, d = c.value * dx, dy);
          x += d;
        }
      }
    }
    function depth(node) {
      var children = node.children, d = 0;
      if (children && (n = children.length)) {
        var i = -1, n;
        while (++i < n) d = Math.max(d, depth(children[i]));
      }
      return 1 + d;
    }
    function partition(d, i) {
      var nodes = hierarchy.call(this, d, i);
      position(nodes[0], 0, size[0], size[1] / depth(nodes[0]));
      return nodes;
    }
    partition.size = function(x) {
      if (!arguments.length) return size;
      size = x;
      return partition;
    };
    return d3_layout_hierarchyRebind(partition, hierarchy);
  };
  d3.layout.pie = function() {
    var value = Number, sort = d3_layout_pieSortByValue, startAngle = 0, endAngle = τ, padAngle = 0;
    function pie(data) {
      var n = data.length, values = data.map(function(d, i) {
        return +value.call(pie, d, i);
      }), a = +(typeof startAngle === "function" ? startAngle.apply(this, arguments) : startAngle), da = (typeof endAngle === "function" ? endAngle.apply(this, arguments) : endAngle) - a, p = Math.min(Math.abs(da) / n, +(typeof padAngle === "function" ? padAngle.apply(this, arguments) : padAngle)), pa = p * (da < 0 ? -1 : 1), sum = d3.sum(values), k = sum ? (da - n * pa) / sum : 0, index = d3.range(n), arcs = [], v;
      if (sort != null) index.sort(sort === d3_layout_pieSortByValue ? function(i, j) {
        return values[j] - values[i];
      } : function(i, j) {
        return sort(data[i], data[j]);
      });
      index.forEach(function(i) {
        arcs[i] = {
          data: data[i],
          value: v = values[i],
          startAngle: a,
          endAngle: a += v * k + pa,
          padAngle: p
        };
      });
      return arcs;
    }
    pie.value = function(_) {
      if (!arguments.length) return value;
      value = _;
      return pie;
    };
    pie.sort = function(_) {
      if (!arguments.length) return sort;
      sort = _;
      return pie;
    };
    pie.startAngle = function(_) {
      if (!arguments.length) return startAngle;
      startAngle = _;
      return pie;
    };
    pie.endAngle = function(_) {
      if (!arguments.length) return endAngle;
      endAngle = _;
      return pie;
    };
    pie.padAngle = function(_) {
      if (!arguments.length) return padAngle;
      padAngle = _;
      return pie;
    };
    return pie;
  };
  var d3_layout_pieSortByValue = {};
  d3.layout.stack = function() {
    var values = d3_identity, order = d3_layout_stackOrderDefault, offset = d3_layout_stackOffsetZero, out = d3_layout_stackOut, x = d3_layout_stackX, y = d3_layout_stackY;
    function stack(data, index) {
      if (!(n = data.length)) return data;
      var series = data.map(function(d, i) {
        return values.call(stack, d, i);
      });
      var points = series.map(function(d) {
        return d.map(function(v, i) {
          return [ x.call(stack, v, i), y.call(stack, v, i) ];
        });
      });
      var orders = order.call(stack, points, index);
      series = d3.permute(series, orders);
      points = d3.permute(points, orders);
      var offsets = offset.call(stack, points, index);
      var m = series[0].length, n, i, j, o;
      for (j = 0; j < m; ++j) {
        out.call(stack, series[0][j], o = offsets[j], points[0][j][1]);
        for (i = 1; i < n; ++i) {
          out.call(stack, series[i][j], o += points[i - 1][j][1], points[i][j][1]);
        }
      }
      return data;
    }
    stack.values = function(x) {
      if (!arguments.length) return values;
      values = x;
      return stack;
    };
    stack.order = function(x) {
      if (!arguments.length) return order;
      order = typeof x === "function" ? x : d3_layout_stackOrders.get(x) || d3_layout_stackOrderDefault;
      return stack;
    };
    stack.offset = function(x) {
      if (!arguments.length) return offset;
      offset = typeof x === "function" ? x : d3_layout_stackOffsets.get(x) || d3_layout_stackOffsetZero;
      return stack;
    };
    stack.x = function(z) {
      if (!arguments.length) return x;
      x = z;
      return stack;
    };
    stack.y = function(z) {
      if (!arguments.length) return y;
      y = z;
      return stack;
    };
    stack.out = function(z) {
      if (!arguments.length) return out;
      out = z;
      return stack;
    };
    return stack;
  };
  function d3_layout_stackX(d) {
    return d.x;
  }
  function d3_layout_stackY(d) {
    return d.y;
  }
  function d3_layout_stackOut(d, y0, y) {
    d.y0 = y0;
    d.y = y;
  }
  var d3_layout_stackOrders = d3.map({
    "inside-out": function(data) {
      var n = data.length, i, j, max = data.map(d3_layout_stackMaxIndex), sums = data.map(d3_layout_stackReduceSum), index = d3.range(n).sort(function(a, b) {
        return max[a] - max[b];
      }), top = 0, bottom = 0, tops = [], bottoms = [];
      for (i = 0; i < n; ++i) {
        j = index[i];
        if (top < bottom) {
          top += sums[j];
          tops.push(j);
        } else {
          bottom += sums[j];
          bottoms.push(j);
        }
      }
      return bottoms.reverse().concat(tops);
    },
    reverse: function(data) {
      return d3.range(data.length).reverse();
    },
    "default": d3_layout_stackOrderDefault
  });
  var d3_layout_stackOffsets = d3.map({
    silhouette: function(data) {
      var n = data.length, m = data[0].length, sums = [], max = 0, i, j, o, y0 = [];
      for (j = 0; j < m; ++j) {
        for (i = 0, o = 0; i < n; i++) o += data[i][j][1];
        if (o > max) max = o;
        sums.push(o);
      }
      for (j = 0; j < m; ++j) {
        y0[j] = (max - sums[j]) / 2;
      }
      return y0;
    },
    wiggle: function(data) {
      var n = data.length, x = data[0], m = x.length, i, j, k, s1, s2, s3, dx, o, o0, y0 = [];
      y0[0] = o = o0 = 0;
      for (j = 1; j < m; ++j) {
        for (i = 0, s1 = 0; i < n; ++i) s1 += data[i][j][1];
        for (i = 0, s2 = 0, dx = x[j][0] - x[j - 1][0]; i < n; ++i) {
          for (k = 0, s3 = (data[i][j][1] - data[i][j - 1][1]) / (2 * dx); k < i; ++k) {
            s3 += (data[k][j][1] - data[k][j - 1][1]) / dx;
          }
          s2 += s3 * data[i][j][1];
        }
        y0[j] = o -= s1 ? s2 / s1 * dx : 0;
        if (o < o0) o0 = o;
      }
      for (j = 0; j < m; ++j) y0[j] -= o0;
      return y0;
    },
    expand: function(data) {
      var n = data.length, m = data[0].length, k = 1 / n, i, j, o, y0 = [];
      for (j = 0; j < m; ++j) {
        for (i = 0, o = 0; i < n; i++) o += data[i][j][1];
        if (o) for (i = 0; i < n; i++) data[i][j][1] /= o; else for (i = 0; i < n; i++) data[i][j][1] = k;
      }
      for (j = 0; j < m; ++j) y0[j] = 0;
      return y0;
    },
    zero: d3_layout_stackOffsetZero
  });
  function d3_layout_stackOrderDefault(data) {
    return d3.range(data.length);
  }
  function d3_layout_stackOffsetZero(data) {
    var j = -1, m = data[0].length, y0 = [];
    while (++j < m) y0[j] = 0;
    return y0;
  }
  function d3_layout_stackMaxIndex(array) {
    var i = 1, j = 0, v = array[0][1], k, n = array.length;
    for (;i < n; ++i) {
      if ((k = array[i][1]) > v) {
        j = i;
        v = k;
      }
    }
    return j;
  }
  function d3_layout_stackReduceSum(d) {
    return d.reduce(d3_layout_stackSum, 0);
  }
  function d3_layout_stackSum(p, d) {
    return p + d[1];
  }
  d3.layout.histogram = function() {
    var frequency = true, valuer = Number, ranger = d3_layout_histogramRange, binner = d3_layout_histogramBinSturges;
    function histogram(data, i) {
      var bins = [], values = data.map(valuer, this), range = ranger.call(this, values, i), thresholds = binner.call(this, range, values, i), bin, i = -1, n = values.length, m = thresholds.length - 1, k = frequency ? 1 : 1 / n, x;
      while (++i < m) {
        bin = bins[i] = [];
        bin.dx = thresholds[i + 1] - (bin.x = thresholds[i]);
        bin.y = 0;
      }
      if (m > 0) {
        i = -1;
        while (++i < n) {
          x = values[i];
          if (x >= range[0] && x <= range[1]) {
            bin = bins[d3.bisect(thresholds, x, 1, m) - 1];
            bin.y += k;
            bin.push(data[i]);
          }
        }
      }
      return bins;
    }
    histogram.value = function(x) {
      if (!arguments.length) return valuer;
      valuer = x;
      return histogram;
    };
    histogram.range = function(x) {
      if (!arguments.length) return ranger;
      ranger = d3_functor(x);
      return histogram;
    };
    histogram.bins = function(x) {
      if (!arguments.length) return binner;
      binner = typeof x === "number" ? function(range) {
        return d3_layout_histogramBinFixed(range, x);
      } : d3_functor(x);
      return histogram;
    };
    histogram.frequency = function(x) {
      if (!arguments.length) return frequency;
      frequency = !!x;
      return histogram;
    };
    return histogram;
  };
  function d3_layout_histogramBinSturges(range, values) {
    return d3_layout_histogramBinFixed(range, Math.ceil(Math.log(values.length) / Math.LN2 + 1));
  }
  function d3_layout_histogramBinFixed(range, n) {
    var x = -1, b = +range[0], m = (range[1] - b) / n, f = [];
    while (++x <= n) f[x] = m * x + b;
    return f;
  }
  function d3_layout_histogramRange(values) {
    return [ d3.min(values), d3.max(values) ];
  }
  d3.layout.pack = function() {
    var hierarchy = d3.layout.hierarchy().sort(d3_layout_packSort), padding = 0, size = [ 1, 1 ], radius;
    function pack(d, i) {
      var nodes = hierarchy.call(this, d, i), root = nodes[0], w = size[0], h = size[1], r = radius == null ? Math.sqrt : typeof radius === "function" ? radius : function() {
        return radius;
      };
      root.x = root.y = 0;
      d3_layout_hierarchyVisitAfter(root, function(d) {
        d.r = +r(d.value);
      });
      d3_layout_hierarchyVisitAfter(root, d3_layout_packSiblings);
      if (padding) {
        var dr = padding * (radius ? 1 : Math.max(2 * root.r / w, 2 * root.r / h)) / 2;
        d3_layout_hierarchyVisitAfter(root, function(d) {
          d.r += dr;
        });
        d3_layout_hierarchyVisitAfter(root, d3_layout_packSiblings);
        d3_layout_hierarchyVisitAfter(root, function(d) {
          d.r -= dr;
        });
      }
      d3_layout_packTransform(root, w / 2, h / 2, radius ? 1 : 1 / Math.max(2 * root.r / w, 2 * root.r / h));
      return nodes;
    }
    pack.size = function(_) {
      if (!arguments.length) return size;
      size = _;
      return pack;
    };
    pack.radius = function(_) {
      if (!arguments.length) return radius;
      radius = _ == null || typeof _ === "function" ? _ : +_;
      return pack;
    };
    pack.padding = function(_) {
      if (!arguments.length) return padding;
      padding = +_;
      return pack;
    };
    return d3_layout_hierarchyRebind(pack, hierarchy);
  };
  function d3_layout_packSort(a, b) {
    return a.value - b.value;
  }
  function d3_layout_packInsert(a, b) {
    var c = a._pack_next;
    a._pack_next = b;
    b._pack_prev = a;
    b._pack_next = c;
    c._pack_prev = b;
  }
  function d3_layout_packSplice(a, b) {
    a._pack_next = b;
    b._pack_prev = a;
  }
  function d3_layout_packIntersects(a, b) {
    var dx = b.x - a.x, dy = b.y - a.y, dr = a.r + b.r;
    return .999 * dr * dr > dx * dx + dy * dy;
  }
  function d3_layout_packSiblings(node) {
    if (!(nodes = node.children) || !(n = nodes.length)) return;
    var nodes, xMin = Infinity, xMax = -Infinity, yMin = Infinity, yMax = -Infinity, a, b, c, i, j, k, n;
    function bound(node) {
      xMin = Math.min(node.x - node.r, xMin);
      xMax = Math.max(node.x + node.r, xMax);
      yMin = Math.min(node.y - node.r, yMin);
      yMax = Math.max(node.y + node.r, yMax);
    }
    nodes.forEach(d3_layout_packLink);
    a = nodes[0];
    a.x = -a.r;
    a.y = 0;
    bound(a);
    if (n > 1) {
      b = nodes[1];
      b.x = b.r;
      b.y = 0;
      bound(b);
      if (n > 2) {
        c = nodes[2];
        d3_layout_packPlace(a, b, c);
        bound(c);
        d3_layout_packInsert(a, c);
        a._pack_prev = c;
        d3_layout_packInsert(c, b);
        b = a._pack_next;
        for (i = 3; i < n; i++) {
          d3_layout_packPlace(a, b, c = nodes[i]);
          var isect = 0, s1 = 1, s2 = 1;
          for (j = b._pack_next; j !== b; j = j._pack_next, s1++) {
            if (d3_layout_packIntersects(j, c)) {
              isect = 1;
              break;
            }
          }
          if (isect == 1) {
            for (k = a._pack_prev; k !== j._pack_prev; k = k._pack_prev, s2++) {
              if (d3_layout_packIntersects(k, c)) {
                break;
              }
            }
          }
          if (isect) {
            if (s1 < s2 || s1 == s2 && b.r < a.r) d3_layout_packSplice(a, b = j); else d3_layout_packSplice(a = k, b);
            i--;
          } else {
            d3_layout_packInsert(a, c);
            b = c;
            bound(c);
          }
        }
      }
    }
    var cx = (xMin + xMax) / 2, cy = (yMin + yMax) / 2, cr = 0;
    for (i = 0; i < n; i++) {
      c = nodes[i];
      c.x -= cx;
      c.y -= cy;
      cr = Math.max(cr, c.r + Math.sqrt(c.x * c.x + c.y * c.y));
    }
    node.r = cr;
    nodes.forEach(d3_layout_packUnlink);
  }
  function d3_layout_packLink(node) {
    node._pack_next = node._pack_prev = node;
  }
  function d3_layout_packUnlink(node) {
    delete node._pack_next;
    delete node._pack_prev;
  }
  function d3_layout_packTransform(node, x, y, k) {
    var children = node.children;
    node.x = x += k * node.x;
    node.y = y += k * node.y;
    node.r *= k;
    if (children) {
      var i = -1, n = children.length;
      while (++i < n) d3_layout_packTransform(children[i], x, y, k);
    }
  }
  function d3_layout_packPlace(a, b, c) {
    var db = a.r + c.r, dx = b.x - a.x, dy = b.y - a.y;
    if (db && (dx || dy)) {
      var da = b.r + c.r, dc = dx * dx + dy * dy;
      da *= da;
      db *= db;
      var x = .5 + (db - da) / (2 * dc), y = Math.sqrt(Math.max(0, 2 * da * (db + dc) - (db -= dc) * db - da * da)) / (2 * dc);
      c.x = a.x + x * dx + y * dy;
      c.y = a.y + x * dy - y * dx;
    } else {
      c.x = a.x + db;
      c.y = a.y;
    }
  }
  d3.layout.tree = function() {
    var hierarchy = d3.layout.hierarchy().sort(null).value(null), separation = d3_layout_treeSeparation, size = [ 1, 1 ], nodeSize = null;
    function tree(d, i) {
      var nodes = hierarchy.call(this, d, i), root0 = nodes[0], root1 = wrapTree(root0);
      d3_layout_hierarchyVisitAfter(root1, firstWalk), root1.parent.m = -root1.z;
      d3_layout_hierarchyVisitBefore(root1, secondWalk);
      if (nodeSize) d3_layout_hierarchyVisitBefore(root0, sizeNode); else {
        var left = root0, right = root0, bottom = root0;
        d3_layout_hierarchyVisitBefore(root0, function(node) {
          if (node.x < left.x) left = node;
          if (node.x > right.x) right = node;
          if (node.depth > bottom.depth) bottom = node;
        });
        var tx = separation(left, right) / 2 - left.x, kx = size[0] / (right.x + separation(right, left) / 2 + tx), ky = size[1] / (bottom.depth || 1);
        d3_layout_hierarchyVisitBefore(root0, function(node) {
          node.x = (node.x + tx) * kx;
          node.y = node.depth * ky;
        });
      }
      return nodes;
    }
    function wrapTree(root0) {
      var root1 = {
        A: null,
        children: [ root0 ]
      }, queue = [ root1 ], node1;
      while ((node1 = queue.pop()) != null) {
        for (var children = node1.children, child, i = 0, n = children.length; i < n; ++i) {
          queue.push((children[i] = child = {
            _: children[i],
            parent: node1,
            children: (child = children[i].children) && child.slice() || [],
            A: null,
            a: null,
            z: 0,
            m: 0,
            c: 0,
            s: 0,
            t: null,
            i: i
          }).a = child);
        }
      }
      return root1.children[0];
    }
    function firstWalk(v) {
      var children = v.children, siblings = v.parent.children, w = v.i ? siblings[v.i - 1] : null;
      if (children.length) {
        d3_layout_treeShift(v);
        var midpoint = (children[0].z + children[children.length - 1].z) / 2;
        if (w) {
          v.z = w.z + separation(v._, w._);
          v.m = v.z - midpoint;
        } else {
          v.z = midpoint;
        }
      } else if (w) {
        v.z = w.z + separation(v._, w._);
      }
      v.parent.A = apportion(v, w, v.parent.A || siblings[0]);
    }
    function secondWalk(v) {
      v._.x = v.z + v.parent.m;
      v.m += v.parent.m;
    }
    function apportion(v, w, ancestor) {
      if (w) {
        var vip = v, vop = v, vim = w, vom = vip.parent.children[0], sip = vip.m, sop = vop.m, sim = vim.m, som = vom.m, shift;
        while (vim = d3_layout_treeRight(vim), vip = d3_layout_treeLeft(vip), vim && vip) {
          vom = d3_layout_treeLeft(vom);
          vop = d3_layout_treeRight(vop);
          vop.a = v;
          shift = vim.z + sim - vip.z - sip + separation(vim._, vip._);
          if (shift > 0) {
            d3_layout_treeMove(d3_layout_treeAncestor(vim, v, ancestor), v, shift);
            sip += shift;
            sop += shift;
          }
          sim += vim.m;
          sip += vip.m;
          som += vom.m;
          sop += vop.m;
        }
        if (vim && !d3_layout_treeRight(vop)) {
          vop.t = vim;
          vop.m += sim - sop;
        }
        if (vip && !d3_layout_treeLeft(vom)) {
          vom.t = vip;
          vom.m += sip - som;
          ancestor = v;
        }
      }
      return ancestor;
    }
    function sizeNode(node) {
      node.x *= size[0];
      node.y = node.depth * size[1];
    }
    tree.separation = function(x) {
      if (!arguments.length) return separation;
      separation = x;
      return tree;
    };
    tree.size = function(x) {
      if (!arguments.length) return nodeSize ? null : size;
      nodeSize = (size = x) == null ? sizeNode : null;
      return tree;
    };
    tree.nodeSize = function(x) {
      if (!arguments.length) return nodeSize ? size : null;
      nodeSize = (size = x) == null ? null : sizeNode;
      return tree;
    };
    return d3_layout_hierarchyRebind(tree, hierarchy);
  };
  function d3_layout_treeSeparation(a, b) {
    return a.parent == b.parent ? 1 : 2;
  }
  function d3_layout_treeLeft(v) {
    var children = v.children;
    return children.length ? children[0] : v.t;
  }
  function d3_layout_treeRight(v) {
    var children = v.children, n;
    return (n = children.length) ? children[n - 1] : v.t;
  }
  function d3_layout_treeMove(wm, wp, shift) {
    var change = shift / (wp.i - wm.i);
    wp.c -= change;
    wp.s += shift;
    wm.c += change;
    wp.z += shift;
    wp.m += shift;
  }
  function d3_layout_treeShift(v) {
    var shift = 0, change = 0, children = v.children, i = children.length, w;
    while (--i >= 0) {
      w = children[i];
      w.z += shift;
      w.m += shift;
      shift += w.s + (change += w.c);
    }
  }
  function d3_layout_treeAncestor(vim, v, ancestor) {
    return vim.a.parent === v.parent ? vim.a : ancestor;
  }
  d3.layout.cluster = function() {
    var hierarchy = d3.layout.hierarchy().sort(null).value(null), separation = d3_layout_treeSeparation, size = [ 1, 1 ], nodeSize = false;
    function cluster(d, i) {
      var nodes = hierarchy.call(this, d, i), root = nodes[0], previousNode, x = 0;
      d3_layout_hierarchyVisitAfter(root, function(node) {
        var children = node.children;
        if (children && children.length) {
          node.x = d3_layout_clusterX(children);
          node.y = d3_layout_clusterY(children);
        } else {
          node.x = previousNode ? x += separation(node, previousNode) : 0;
          node.y = 0;
          previousNode = node;
        }
      });
      var left = d3_layout_clusterLeft(root), right = d3_layout_clusterRight(root), x0 = left.x - separation(left, right) / 2, x1 = right.x + separation(right, left) / 2;
      d3_layout_hierarchyVisitAfter(root, nodeSize ? function(node) {
        node.x = (node.x - root.x) * size[0];
        node.y = (root.y - node.y) * size[1];
      } : function(node) {
        node.x = (node.x - x0) / (x1 - x0) * size[0];
        node.y = (1 - (root.y ? node.y / root.y : 1)) * size[1];
      });
      return nodes;
    }
    cluster.separation = function(x) {
      if (!arguments.length) return separation;
      separation = x;
      return cluster;
    };
    cluster.size = function(x) {
      if (!arguments.length) return nodeSize ? null : size;
      nodeSize = (size = x) == null;
      return cluster;
    };
    cluster.nodeSize = function(x) {
      if (!arguments.length) return nodeSize ? size : null;
      nodeSize = (size = x) != null;
      return cluster;
    };
    return d3_layout_hierarchyRebind(cluster, hierarchy);
  };
  function d3_layout_clusterY(children) {
    return 1 + d3.max(children, function(child) {
      return child.y;
    });
  }
  function d3_layout_clusterX(children) {
    return children.reduce(function(x, child) {
      return x + child.x;
    }, 0) / children.length;
  }
  function d3_layout_clusterLeft(node) {
    var children = node.children;
    return children && children.length ? d3_layout_clusterLeft(children[0]) : node;
  }
  function d3_layout_clusterRight(node) {
    var children = node.children, n;
    return children && (n = children.length) ? d3_layout_clusterRight(children[n - 1]) : node;
  }
  d3.layout.treemap = function() {
    var hierarchy = d3.layout.hierarchy(), round = Math.round, size = [ 1, 1 ], padding = null, pad = d3_layout_treemapPadNull, sticky = false, stickies, mode = "squarify", ratio = .5 * (1 + Math.sqrt(5));
    function scale(children, k) {
      var i = -1, n = children.length, child, area;
      while (++i < n) {
        area = (child = children[i]).value * (k < 0 ? 0 : k);
        child.area = isNaN(area) || area <= 0 ? 0 : area;
      }
    }
    function squarify(node) {
      var children = node.children;
      if (children && children.length) {
        var rect = pad(node), row = [], remaining = children.slice(), child, best = Infinity, score, u = mode === "slice" ? rect.dx : mode === "dice" ? rect.dy : mode === "slice-dice" ? node.depth & 1 ? rect.dy : rect.dx : Math.min(rect.dx, rect.dy), n;
        scale(remaining, rect.dx * rect.dy / node.value);
        row.area = 0;
        while ((n = remaining.length) > 0) {
          row.push(child = remaining[n - 1]);
          row.area += child.area;
          if (mode !== "squarify" || (score = worst(row, u)) <= best) {
            remaining.pop();
            best = score;
          } else {
            row.area -= row.pop().area;
            position(row, u, rect, false);
            u = Math.min(rect.dx, rect.dy);
            row.length = row.area = 0;
            best = Infinity;
          }
        }
        if (row.length) {
          position(row, u, rect, true);
          row.length = row.area = 0;
        }
        children.forEach(squarify);
      }
    }
    function stickify(node) {
      var children = node.children;
      if (children && children.length) {
        var rect = pad(node), remaining = children.slice(), child, row = [];
        scale(remaining, rect.dx * rect.dy / node.value);
        row.area = 0;
        while (child = remaining.pop()) {
          row.push(child);
          row.area += child.area;
          if (child.z != null) {
            position(row, child.z ? rect.dx : rect.dy, rect, !remaining.length);
            row.length = row.area = 0;
          }
        }
        children.forEach(stickify);
      }
    }
    function worst(row, u) {
      var s = row.area, r, rmax = 0, rmin = Infinity, i = -1, n = row.length;
      while (++i < n) {
        if (!(r = row[i].area)) continue;
        if (r < rmin) rmin = r;
        if (r > rmax) rmax = r;
      }
      s *= s;
      u *= u;
      return s ? Math.max(u * rmax * ratio / s, s / (u * rmin * ratio)) : Infinity;
    }
    function position(row, u, rect, flush) {
      var i = -1, n = row.length, x = rect.x, y = rect.y, v = u ? round(row.area / u) : 0, o;
      if (u == rect.dx) {
        if (flush || v > rect.dy) v = rect.dy;
        while (++i < n) {
          o = row[i];
          o.x = x;
          o.y = y;
          o.dy = v;
          x += o.dx = Math.min(rect.x + rect.dx - x, v ? round(o.area / v) : 0);
        }
        o.z = true;
        o.dx += rect.x + rect.dx - x;
        rect.y += v;
        rect.dy -= v;
      } else {
        if (flush || v > rect.dx) v = rect.dx;
        while (++i < n) {
          o = row[i];
          o.x = x;
          o.y = y;
          o.dx = v;
          y += o.dy = Math.min(rect.y + rect.dy - y, v ? round(o.area / v) : 0);
        }
        o.z = false;
        o.dy += rect.y + rect.dy - y;
        rect.x += v;
        rect.dx -= v;
      }
    }
    function treemap(d) {
      var nodes = stickies || hierarchy(d), root = nodes[0];
      root.x = root.y = 0;
      if (root.value) root.dx = size[0], root.dy = size[1]; else root.dx = root.dy = 0;
      if (stickies) hierarchy.revalue(root);
      scale([ root ], root.dx * root.dy / root.value);
      (stickies ? stickify : squarify)(root);
      if (sticky) stickies = nodes;
      return nodes;
    }
    treemap.size = function(x) {
      if (!arguments.length) return size;
      size = x;
      return treemap;
    };
    treemap.padding = function(x) {
      if (!arguments.length) return padding;
      function padFunction(node) {
        var p = x.call(treemap, node, node.depth);
        return p == null ? d3_layout_treemapPadNull(node) : d3_layout_treemapPad(node, typeof p === "number" ? [ p, p, p, p ] : p);
      }
      function padConstant(node) {
        return d3_layout_treemapPad(node, x);
      }
      var type;
      pad = (padding = x) == null ? d3_layout_treemapPadNull : (type = typeof x) === "function" ? padFunction : type === "number" ? (x = [ x, x, x, x ], 
      padConstant) : padConstant;
      return treemap;
    };
    treemap.round = function(x) {
      if (!arguments.length) return round != Number;
      round = x ? Math.round : Number;
      return treemap;
    };
    treemap.sticky = function(x) {
      if (!arguments.length) return sticky;
      sticky = x;
      stickies = null;
      return treemap;
    };
    treemap.ratio = function(x) {
      if (!arguments.length) return ratio;
      ratio = x;
      return treemap;
    };
    treemap.mode = function(x) {
      if (!arguments.length) return mode;
      mode = x + "";
      return treemap;
    };
    return d3_layout_hierarchyRebind(treemap, hierarchy);
  };
  function d3_layout_treemapPadNull(node) {
    return {
      x: node.x,
      y: node.y,
      dx: node.dx,
      dy: node.dy
    };
  }
  function d3_layout_treemapPad(node, padding) {
    var x = node.x + padding[3], y = node.y + padding[0], dx = node.dx - padding[1] - padding[3], dy = node.dy - padding[0] - padding[2];
    if (dx < 0) {
      x += dx / 2;
      dx = 0;
    }
    if (dy < 0) {
      y += dy / 2;
      dy = 0;
    }
    return {
      x: x,
      y: y,
      dx: dx,
      dy: dy
    };
  }
  d3.random = {
    normal: function(µ, σ) {
      var n = arguments.length;
      if (n < 2) σ = 1;
      if (n < 1) µ = 0;
      return function() {
        var x, y, r;
        do {
          x = Math.random() * 2 - 1;
          y = Math.random() * 2 - 1;
          r = x * x + y * y;
        } while (!r || r > 1);
        return µ + σ * x * Math.sqrt(-2 * Math.log(r) / r);
      };
    },
    logNormal: function() {
      var random = d3.random.normal.apply(d3, arguments);
      return function() {
        return Math.exp(random());
      };
    },
    bates: function(m) {
      var random = d3.random.irwinHall(m);
      return function() {
        return random() / m;
      };
    },
    irwinHall: function(m) {
      return function() {
        for (var s = 0, j = 0; j < m; j++) s += Math.random();
        return s;
      };
    }
  };
  d3.scale = {};
  function d3_scaleExtent(domain) {
    var start = domain[0], stop = domain[domain.length - 1];
    return start < stop ? [ start, stop ] : [ stop, start ];
  }
  function d3_scaleRange(scale) {
    return scale.rangeExtent ? scale.rangeExtent() : d3_scaleExtent(scale.range());
  }
  function d3_scale_bilinear(domain, range, uninterpolate, interpolate) {
    var u = uninterpolate(domain[0], domain[1]), i = interpolate(range[0], range[1]);
    return function(x) {
      return i(u(x));
    };
  }
  function d3_scale_nice(domain, nice) {
    var i0 = 0, i1 = domain.length - 1, x0 = domain[i0], x1 = domain[i1], dx;
    if (x1 < x0) {
      dx = i0, i0 = i1, i1 = dx;
      dx = x0, x0 = x1, x1 = dx;
    }
    domain[i0] = nice.floor(x0);
    domain[i1] = nice.ceil(x1);
    return domain;
  }
  function d3_scale_niceStep(step) {
    return step ? {
      floor: function(x) {
        return Math.floor(x / step) * step;
      },
      ceil: function(x) {
        return Math.ceil(x / step) * step;
      }
    } : d3_scale_niceIdentity;
  }
  var d3_scale_niceIdentity = {
    floor: d3_identity,
    ceil: d3_identity
  };
  function d3_scale_polylinear(domain, range, uninterpolate, interpolate) {
    var u = [], i = [], j = 0, k = Math.min(domain.length, range.length) - 1;
    if (domain[k] < domain[0]) {
      domain = domain.slice().reverse();
      range = range.slice().reverse();
    }
    while (++j <= k) {
      u.push(uninterpolate(domain[j - 1], domain[j]));
      i.push(interpolate(range[j - 1], range[j]));
    }
    return function(x) {
      var j = d3.bisect(domain, x, 1, k) - 1;
      return i[j](u[j](x));
    };
  }
  d3.scale.linear = function() {
    return d3_scale_linear([ 0, 1 ], [ 0, 1 ], d3_interpolate, false);
  };
  function d3_scale_linear(domain, range, interpolate, clamp) {
    var output, input;
    function rescale() {
      var linear = Math.min(domain.length, range.length) > 2 ? d3_scale_polylinear : d3_scale_bilinear, uninterpolate = clamp ? d3_uninterpolateClamp : d3_uninterpolateNumber;
      output = linear(domain, range, uninterpolate, interpolate);
      input = linear(range, domain, uninterpolate, d3_interpolate);
      return scale;
    }
    function scale(x) {
      return output(x);
    }
    scale.invert = function(y) {
      return input(y);
    };
    scale.domain = function(x) {
      if (!arguments.length) return domain;
      domain = x.map(Number);
      return rescale();
    };
    scale.range = function(x) {
      if (!arguments.length) return range;
      range = x;
      return rescale();
    };
    scale.rangeRound = function(x) {
      return scale.range(x).interpolate(d3_interpolateRound);
    };
    scale.clamp = function(x) {
      if (!arguments.length) return clamp;
      clamp = x;
      return rescale();
    };
    scale.interpolate = function(x) {
      if (!arguments.length) return interpolate;
      interpolate = x;
      return rescale();
    };
    scale.ticks = function(m) {
      return d3_scale_linearTicks(domain, m);
    };
    scale.tickFormat = function(m, format) {
      return d3_scale_linearTickFormat(domain, m, format);
    };
    scale.nice = function(m) {
      d3_scale_linearNice(domain, m);
      return rescale();
    };
    scale.copy = function() {
      return d3_scale_linear(domain, range, interpolate, clamp);
    };
    return rescale();
  }
  function d3_scale_linearRebind(scale, linear) {
    return d3.rebind(scale, linear, "range", "rangeRound", "interpolate", "clamp");
  }
  function d3_scale_linearNice(domain, m) {
    d3_scale_nice(domain, d3_scale_niceStep(d3_scale_linearTickRange(domain, m)[2]));
    d3_scale_nice(domain, d3_scale_niceStep(d3_scale_linearTickRange(domain, m)[2]));
    return domain;
  }
  function d3_scale_linearTickRange(domain, m) {
    if (m == null) m = 10;
    var extent = d3_scaleExtent(domain), span = extent[1] - extent[0], step = Math.pow(10, Math.floor(Math.log(span / m) / Math.LN10)), err = m / span * step;
    if (err <= .15) step *= 10; else if (err <= .35) step *= 5; else if (err <= .75) step *= 2;
    extent[0] = Math.ceil(extent[0] / step) * step;
    extent[1] = Math.floor(extent[1] / step) * step + step * .5;
    extent[2] = step;
    return extent;
  }
  function d3_scale_linearTicks(domain, m) {
    return d3.range.apply(d3, d3_scale_linearTickRange(domain, m));
  }
  function d3_scale_linearTickFormat(domain, m, format) {
    var range = d3_scale_linearTickRange(domain, m);
    if (format) {
      var match = d3_format_re.exec(format);
      match.shift();
      if (match[8] === "s") {
        var prefix = d3.formatPrefix(Math.max(abs(range[0]), abs(range[1])));
        if (!match[7]) match[7] = "." + d3_scale_linearPrecision(prefix.scale(range[2]));
        match[8] = "f";
        format = d3.format(match.join(""));
        return function(d) {
          return format(prefix.scale(d)) + prefix.symbol;
        };
      }
      if (!match[7]) match[7] = "." + d3_scale_linearFormatPrecision(match[8], range);
      format = match.join("");
    } else {
      format = ",." + d3_scale_linearPrecision(range[2]) + "f";
    }
    return d3.format(format);
  }
  var d3_scale_linearFormatSignificant = {
    s: 1,
    g: 1,
    p: 1,
    r: 1,
    e: 1
  };
  function d3_scale_linearPrecision(value) {
    return -Math.floor(Math.log(value) / Math.LN10 + .01);
  }
  function d3_scale_linearFormatPrecision(type, range) {
    var p = d3_scale_linearPrecision(range[2]);
    return type in d3_scale_linearFormatSignificant ? Math.abs(p - d3_scale_linearPrecision(Math.max(abs(range[0]), abs(range[1])))) + +(type !== "e") : p - (type === "%") * 2;
  }
  d3.scale.log = function() {
    return d3_scale_log(d3.scale.linear().domain([ 0, 1 ]), 10, true, [ 1, 10 ]);
  };
  function d3_scale_log(linear, base, positive, domain) {
    function log(x) {
      return (positive ? Math.log(x < 0 ? 0 : x) : -Math.log(x > 0 ? 0 : -x)) / Math.log(base);
    }
    function pow(x) {
      return positive ? Math.pow(base, x) : -Math.pow(base, -x);
    }
    function scale(x) {
      return linear(log(x));
    }
    scale.invert = function(x) {
      return pow(linear.invert(x));
    };
    scale.domain = function(x) {
      if (!arguments.length) return domain;
      positive = x[0] >= 0;
      linear.domain((domain = x.map(Number)).map(log));
      return scale;
    };
    scale.base = function(_) {
      if (!arguments.length) return base;
      base = +_;
      linear.domain(domain.map(log));
      return scale;
    };
    scale.nice = function() {
      var niced = d3_scale_nice(domain.map(log), positive ? Math : d3_scale_logNiceNegative);
      linear.domain(niced);
      domain = niced.map(pow);
      return scale;
    };
    scale.ticks = function() {
      var extent = d3_scaleExtent(domain), ticks = [], u = extent[0], v = extent[1], i = Math.floor(log(u)), j = Math.ceil(log(v)), n = base % 1 ? 2 : base;
      if (isFinite(j - i)) {
        if (positive) {
          for (;i < j; i++) for (var k = 1; k < n; k++) ticks.push(pow(i) * k);
          ticks.push(pow(i));
        } else {
          ticks.push(pow(i));
          for (;i++ < j; ) for (var k = n - 1; k > 0; k--) ticks.push(pow(i) * k);
        }
        for (i = 0; ticks[i] < u; i++) {}
        for (j = ticks.length; ticks[j - 1] > v; j--) {}
        ticks = ticks.slice(i, j);
      }
      return ticks;
    };
    scale.tickFormat = function(n, format) {
      if (!arguments.length) return d3_scale_logFormat;
      if (arguments.length < 2) format = d3_scale_logFormat; else if (typeof format !== "function") format = d3.format(format);
      var k = Math.max(1, base * n / scale.ticks().length);
      return function(d) {
        var i = d / pow(Math.round(log(d)));
        if (i * base < base - .5) i *= base;
        return i <= k ? format(d) : "";
      };
    };
    scale.copy = function() {
      return d3_scale_log(linear.copy(), base, positive, domain);
    };
    return d3_scale_linearRebind(scale, linear);
  }
  var d3_scale_logFormat = d3.format(".0e"), d3_scale_logNiceNegative = {
    floor: function(x) {
      return -Math.ceil(-x);
    },
    ceil: function(x) {
      return -Math.floor(-x);
    }
  };
  d3.scale.pow = function() {
    return d3_scale_pow(d3.scale.linear(), 1, [ 0, 1 ]);
  };
  function d3_scale_pow(linear, exponent, domain) {
    var powp = d3_scale_powPow(exponent), powb = d3_scale_powPow(1 / exponent);
    function scale(x) {
      return linear(powp(x));
    }
    scale.invert = function(x) {
      return powb(linear.invert(x));
    };
    scale.domain = function(x) {
      if (!arguments.length) return domain;
      linear.domain((domain = x.map(Number)).map(powp));
      return scale;
    };
    scale.ticks = function(m) {
      return d3_scale_linearTicks(domain, m);
    };
    scale.tickFormat = function(m, format) {
      return d3_scale_linearTickFormat(domain, m, format);
    };
    scale.nice = function(m) {
      return scale.domain(d3_scale_linearNice(domain, m));
    };
    scale.exponent = function(x) {
      if (!arguments.length) return exponent;
      powp = d3_scale_powPow(exponent = x);
      powb = d3_scale_powPow(1 / exponent);
      linear.domain(domain.map(powp));
      return scale;
    };
    scale.copy = function() {
      return d3_scale_pow(linear.copy(), exponent, domain);
    };
    return d3_scale_linearRebind(scale, linear);
  }
  function d3_scale_powPow(e) {
    return function(x) {
      return x < 0 ? -Math.pow(-x, e) : Math.pow(x, e);
    };
  }
  d3.scale.sqrt = function() {
    return d3.scale.pow().exponent(.5);
  };
  d3.scale.ordinal = function() {
    return d3_scale_ordinal([], {
      t: "range",
      a: [ [] ]
    });
  };
  function d3_scale_ordinal(domain, ranger) {
    var index, range, rangeBand;
    function scale(x) {
      return range[((index.get(x) || (ranger.t === "range" ? index.set(x, domain.push(x)) : NaN)) - 1) % range.length];
    }
    function steps(start, step) {
      return d3.range(domain.length).map(function(i) {
        return start + step * i;
      });
    }
    scale.domain = function(x) {
      if (!arguments.length) return domain;
      domain = [];
      index = new d3_Map();
      var i = -1, n = x.length, xi;
      while (++i < n) if (!index.has(xi = x[i])) index.set(xi, domain.push(xi));
      return scale[ranger.t].apply(scale, ranger.a);
    };
    scale.range = function(x) {
      if (!arguments.length) return range;
      range = x;
      rangeBand = 0;
      ranger = {
        t: "range",
        a: arguments
      };
      return scale;
    };
    scale.rangePoints = function(x, padding) {
      if (arguments.length < 2) padding = 0;
      var start = x[0], stop = x[1], step = domain.length < 2 ? (start = (start + stop) / 2, 
      0) : (stop - start) / (domain.length - 1 + padding);
      range = steps(start + step * padding / 2, step);
      rangeBand = 0;
      ranger = {
        t: "rangePoints",
        a: arguments
      };
      return scale;
    };
    scale.rangeRoundPoints = function(x, padding) {
      if (arguments.length < 2) padding = 0;
      var start = x[0], stop = x[1], step = domain.length < 2 ? (start = stop = Math.round((start + stop) / 2), 
      0) : (stop - start) / (domain.length - 1 + padding) | 0;
      range = steps(start + Math.round(step * padding / 2 + (stop - start - (domain.length - 1 + padding) * step) / 2), step);
      rangeBand = 0;
      ranger = {
        t: "rangeRoundPoints",
        a: arguments
      };
      return scale;
    };
    scale.rangeBands = function(x, padding, outerPadding) {
      if (arguments.length < 2) padding = 0;
      if (arguments.length < 3) outerPadding = padding;
      var reverse = x[1] < x[0], start = x[reverse - 0], stop = x[1 - reverse], step = (stop - start) / (domain.length - padding + 2 * outerPadding);
      range = steps(start + step * outerPadding, step);
      if (reverse) range.reverse();
      rangeBand = step * (1 - padding);
      ranger = {
        t: "rangeBands",
        a: arguments
      };
      return scale;
    };
    scale.rangeRoundBands = function(x, padding, outerPadding) {
      if (arguments.length < 2) padding = 0;
      if (arguments.length < 3) outerPadding = padding;
      var reverse = x[1] < x[0], start = x[reverse - 0], stop = x[1 - reverse], step = Math.floor((stop - start) / (domain.length - padding + 2 * outerPadding));
      range = steps(start + Math.round((stop - start - (domain.length - padding) * step) / 2), step);
      if (reverse) range.reverse();
      rangeBand = Math.round(step * (1 - padding));
      ranger = {
        t: "rangeRoundBands",
        a: arguments
      };
      return scale;
    };
    scale.rangeBand = function() {
      return rangeBand;
    };
    scale.rangeExtent = function() {
      return d3_scaleExtent(ranger.a[0]);
    };
    scale.copy = function() {
      return d3_scale_ordinal(domain, ranger);
    };
    return scale.domain(domain);
  }
  d3.scale.category10 = function() {
    return d3.scale.ordinal().range(d3_category10);
  };
  d3.scale.category20 = function() {
    return d3.scale.ordinal().range(d3_category20);
  };
  d3.scale.category20b = function() {
    return d3.scale.ordinal().range(d3_category20b);
  };
  d3.scale.category20c = function() {
    return d3.scale.ordinal().range(d3_category20c);
  };
  var d3_category10 = [ 2062260, 16744206, 2924588, 14034728, 9725885, 9197131, 14907330, 8355711, 12369186, 1556175 ].map(d3_rgbString);
  var d3_category20 = [ 2062260, 11454440, 16744206, 16759672, 2924588, 10018698, 14034728, 16750742, 9725885, 12955861, 9197131, 12885140, 14907330, 16234194, 8355711, 13092807, 12369186, 14408589, 1556175, 10410725 ].map(d3_rgbString);
  var d3_category20b = [ 3750777, 5395619, 7040719, 10264286, 6519097, 9216594, 11915115, 13556636, 9202993, 12426809, 15186514, 15190932, 8666169, 11356490, 14049643, 15177372, 8077683, 10834324, 13528509, 14589654 ].map(d3_rgbString);
  var d3_category20c = [ 3244733, 7057110, 10406625, 13032431, 15095053, 16616764, 16625259, 16634018, 3253076, 7652470, 10607003, 13101504, 7695281, 10394312, 12369372, 14342891, 6513507, 9868950, 12434877, 14277081 ].map(d3_rgbString);
  d3.scale.quantile = function() {
    return d3_scale_quantile([], []);
  };
  function d3_scale_quantile(domain, range) {
    var thresholds;
    function rescale() {
      var k = 0, q = range.length;
      thresholds = [];
      while (++k < q) thresholds[k - 1] = d3.quantile(domain, k / q);
      return scale;
    }
    function scale(x) {
      if (!isNaN(x = +x)) return range[d3.bisect(thresholds, x)];
    }
    scale.domain = function(x) {
      if (!arguments.length) return domain;
      domain = x.map(d3_number).filter(d3_numeric).sort(d3_ascending);
      return rescale();
    };
    scale.range = function(x) {
      if (!arguments.length) return range;
      range = x;
      return rescale();
    };
    scale.quantiles = function() {
      return thresholds;
    };
    scale.invertExtent = function(y) {
      y = range.indexOf(y);
      return y < 0 ? [ NaN, NaN ] : [ y > 0 ? thresholds[y - 1] : domain[0], y < thresholds.length ? thresholds[y] : domain[domain.length - 1] ];
    };
    scale.copy = function() {
      return d3_scale_quantile(domain, range);
    };
    return rescale();
  }
  d3.scale.quantize = function() {
    return d3_scale_quantize(0, 1, [ 0, 1 ]);
  };
  function d3_scale_quantize(x0, x1, range) {
    var kx, i;
    function scale(x) {
      return range[Math.max(0, Math.min(i, Math.floor(kx * (x - x0))))];
    }
    function rescale() {
      kx = range.length / (x1 - x0);
      i = range.length - 1;
      return scale;
    }
    scale.domain = function(x) {
      if (!arguments.length) return [ x0, x1 ];
      x0 = +x[0];
      x1 = +x[x.length - 1];
      return rescale();
    };
    scale.range = function(x) {
      if (!arguments.length) return range;
      range = x;
      return rescale();
    };
    scale.invertExtent = function(y) {
      y = range.indexOf(y);
      y = y < 0 ? NaN : y / kx + x0;
      return [ y, y + 1 / kx ];
    };
    scale.copy = function() {
      return d3_scale_quantize(x0, x1, range);
    };
    return rescale();
  }
  d3.scale.threshold = function() {
    return d3_scale_threshold([ .5 ], [ 0, 1 ]);
  };
  function d3_scale_threshold(domain, range) {
    function scale(x) {
      if (x <= x) return range[d3.bisect(domain, x)];
    }
    scale.domain = function(_) {
      if (!arguments.length) return domain;
      domain = _;
      return scale;
    };
    scale.range = function(_) {
      if (!arguments.length) return range;
      range = _;
      return scale;
    };
    scale.invertExtent = function(y) {
      y = range.indexOf(y);
      return [ domain[y - 1], domain[y] ];
    };
    scale.copy = function() {
      return d3_scale_threshold(domain, range);
    };
    return scale;
  }
  d3.scale.identity = function() {
    return d3_scale_identity([ 0, 1 ]);
  };
  function d3_scale_identity(domain) {
    function identity(x) {
      return +x;
    }
    identity.invert = identity;
    identity.domain = identity.range = function(x) {
      if (!arguments.length) return domain;
      domain = x.map(identity);
      return identity;
    };
    identity.ticks = function(m) {
      return d3_scale_linearTicks(domain, m);
    };
    identity.tickFormat = function(m, format) {
      return d3_scale_linearTickFormat(domain, m, format);
    };
    identity.copy = function() {
      return d3_scale_identity(domain);
    };
    return identity;
  }
  d3.svg = {};
  function d3_zero() {
    return 0;
  }
  d3.svg.arc = function() {
    var innerRadius = d3_svg_arcInnerRadius, outerRadius = d3_svg_arcOuterRadius, cornerRadius = d3_zero, padRadius = d3_svg_arcAuto, startAngle = d3_svg_arcStartAngle, endAngle = d3_svg_arcEndAngle, padAngle = d3_svg_arcPadAngle;
    function arc() {
      var r0 = Math.max(0, +innerRadius.apply(this, arguments)), r1 = Math.max(0, +outerRadius.apply(this, arguments)), a0 = startAngle.apply(this, arguments) - halfπ, a1 = endAngle.apply(this, arguments) - halfπ, da = Math.abs(a1 - a0), cw = a0 > a1 ? 0 : 1;
      if (r1 < r0) rc = r1, r1 = r0, r0 = rc;
      if (da >= τε) return circleSegment(r1, cw) + (r0 ? circleSegment(r0, 1 - cw) : "") + "Z";
      var rc, cr, rp, ap, p0 = 0, p1 = 0, x0, y0, x1, y1, x2, y2, x3, y3, path = [];
      if (ap = (+padAngle.apply(this, arguments) || 0) / 2) {
        rp = padRadius === d3_svg_arcAuto ? Math.sqrt(r0 * r0 + r1 * r1) : +padRadius.apply(this, arguments);
        if (!cw) p1 *= -1;
        if (r1) p1 = d3_asin(rp / r1 * Math.sin(ap));
        if (r0) p0 = d3_asin(rp / r0 * Math.sin(ap));
      }
      if (r1) {
        x0 = r1 * Math.cos(a0 + p1);
        y0 = r1 * Math.sin(a0 + p1);
        x1 = r1 * Math.cos(a1 - p1);
        y1 = r1 * Math.sin(a1 - p1);
        var l1 = Math.abs(a1 - a0 - 2 * p1) <= π ? 0 : 1;
        if (p1 && d3_svg_arcSweep(x0, y0, x1, y1) === cw ^ l1) {
          var h1 = (a0 + a1) / 2;
          x0 = r1 * Math.cos(h1);
          y0 = r1 * Math.sin(h1);
          x1 = y1 = null;
        }
      } else {
        x0 = y0 = 0;
      }
      if (r0) {
        x2 = r0 * Math.cos(a1 - p0);
        y2 = r0 * Math.sin(a1 - p0);
        x3 = r0 * Math.cos(a0 + p0);
        y3 = r0 * Math.sin(a0 + p0);
        var l0 = Math.abs(a0 - a1 + 2 * p0) <= π ? 0 : 1;
        if (p0 && d3_svg_arcSweep(x2, y2, x3, y3) === 1 - cw ^ l0) {
          var h0 = (a0 + a1) / 2;
          x2 = r0 * Math.cos(h0);
          y2 = r0 * Math.sin(h0);
          x3 = y3 = null;
        }
      } else {
        x2 = y2 = 0;
      }
      if (da > ε && (rc = Math.min(Math.abs(r1 - r0) / 2, +cornerRadius.apply(this, arguments))) > .001) {
        cr = r0 < r1 ^ cw ? 0 : 1;
        var rc1 = rc, rc0 = rc;
        if (da < π) {
          var oc = x3 == null ? [ x2, y2 ] : x1 == null ? [ x0, y0 ] : d3_geom_polygonIntersect([ x0, y0 ], [ x3, y3 ], [ x1, y1 ], [ x2, y2 ]), ax = x0 - oc[0], ay = y0 - oc[1], bx = x1 - oc[0], by = y1 - oc[1], kc = 1 / Math.sin(Math.acos((ax * bx + ay * by) / (Math.sqrt(ax * ax + ay * ay) * Math.sqrt(bx * bx + by * by))) / 2), lc = Math.sqrt(oc[0] * oc[0] + oc[1] * oc[1]);
          rc0 = Math.min(rc, (r0 - lc) / (kc - 1));
          rc1 = Math.min(rc, (r1 - lc) / (kc + 1));
        }
        if (x1 != null) {
          var t30 = d3_svg_arcCornerTangents(x3 == null ? [ x2, y2 ] : [ x3, y3 ], [ x0, y0 ], r1, rc1, cw), t12 = d3_svg_arcCornerTangents([ x1, y1 ], [ x2, y2 ], r1, rc1, cw);
          if (rc === rc1) {
            path.push("M", t30[0], "A", rc1, ",", rc1, " 0 0,", cr, " ", t30[1], "A", r1, ",", r1, " 0 ", 1 - cw ^ d3_svg_arcSweep(t30[1][0], t30[1][1], t12[1][0], t12[1][1]), ",", cw, " ", t12[1], "A", rc1, ",", rc1, " 0 0,", cr, " ", t12[0]);
          } else {
            path.push("M", t30[0], "A", rc1, ",", rc1, " 0 1,", cr, " ", t12[0]);
          }
        } else {
          path.push("M", x0, ",", y0);
        }
        if (x3 != null) {
          var t03 = d3_svg_arcCornerTangents([ x0, y0 ], [ x3, y3 ], r0, -rc0, cw), t21 = d3_svg_arcCornerTangents([ x2, y2 ], x1 == null ? [ x0, y0 ] : [ x1, y1 ], r0, -rc0, cw);
          if (rc === rc0) {
            path.push("L", t21[0], "A", rc0, ",", rc0, " 0 0,", cr, " ", t21[1], "A", r0, ",", r0, " 0 ", cw ^ d3_svg_arcSweep(t21[1][0], t21[1][1], t03[1][0], t03[1][1]), ",", 1 - cw, " ", t03[1], "A", rc0, ",", rc0, " 0 0,", cr, " ", t03[0]);
          } else {
            path.push("L", t21[0], "A", rc0, ",", rc0, " 0 0,", cr, " ", t03[0]);
          }
        } else {
          path.push("L", x2, ",", y2);
        }
      } else {
        path.push("M", x0, ",", y0);
        if (x1 != null) path.push("A", r1, ",", r1, " 0 ", l1, ",", cw, " ", x1, ",", y1);
        path.push("L", x2, ",", y2);
        if (x3 != null) path.push("A", r0, ",", r0, " 0 ", l0, ",", 1 - cw, " ", x3, ",", y3);
      }
      path.push("Z");
      return path.join("");
    }
    function circleSegment(r1, cw) {
      return "M0," + r1 + "A" + r1 + "," + r1 + " 0 1," + cw + " 0," + -r1 + "A" + r1 + "," + r1 + " 0 1," + cw + " 0," + r1;
    }
    arc.innerRadius = function(v) {
      if (!arguments.length) return innerRadius;
      innerRadius = d3_functor(v);
      return arc;
    };
    arc.outerRadius = function(v) {
      if (!arguments.length) return outerRadius;
      outerRadius = d3_functor(v);
      return arc;
    };
    arc.cornerRadius = function(v) {
      if (!arguments.length) return cornerRadius;
      cornerRadius = d3_functor(v);
      return arc;
    };
    arc.padRadius = function(v) {
      if (!arguments.length) return padRadius;
      padRadius = v == d3_svg_arcAuto ? d3_svg_arcAuto : d3_functor(v);
      return arc;
    };
    arc.startAngle = function(v) {
      if (!arguments.length) return startAngle;
      startAngle = d3_functor(v);
      return arc;
    };
    arc.endAngle = function(v) {
      if (!arguments.length) return endAngle;
      endAngle = d3_functor(v);
      return arc;
    };
    arc.padAngle = function(v) {
      if (!arguments.length) return padAngle;
      padAngle = d3_functor(v);
      return arc;
    };
    arc.centroid = function() {
      var r = (+innerRadius.apply(this, arguments) + +outerRadius.apply(this, arguments)) / 2, a = (+startAngle.apply(this, arguments) + +endAngle.apply(this, arguments)) / 2 - halfπ;
      return [ Math.cos(a) * r, Math.sin(a) * r ];
    };
    return arc;
  };
  var d3_svg_arcAuto = "auto";
  function d3_svg_arcInnerRadius(d) {
    return d.innerRadius;
  }
  function d3_svg_arcOuterRadius(d) {
    return d.outerRadius;
  }
  function d3_svg_arcStartAngle(d) {
    return d.startAngle;
  }
  function d3_svg_arcEndAngle(d) {
    return d.endAngle;
  }
  function d3_svg_arcPadAngle(d) {
    return d && d.padAngle;
  }
  function d3_svg_arcSweep(x0, y0, x1, y1) {
    return (x0 - x1) * y0 - (y0 - y1) * x0 > 0 ? 0 : 1;
  }
  function d3_svg_arcCornerTangents(p0, p1, r1, rc, cw) {
    var x01 = p0[0] - p1[0], y01 = p0[1] - p1[1], lo = (cw ? rc : -rc) / Math.sqrt(x01 * x01 + y01 * y01), ox = lo * y01, oy = -lo * x01, x1 = p0[0] + ox, y1 = p0[1] + oy, x2 = p1[0] + ox, y2 = p1[1] + oy, x3 = (x1 + x2) / 2, y3 = (y1 + y2) / 2, dx = x2 - x1, dy = y2 - y1, d2 = dx * dx + dy * dy, r = r1 - rc, D = x1 * y2 - x2 * y1, d = (dy < 0 ? -1 : 1) * Math.sqrt(Math.max(0, r * r * d2 - D * D)), cx0 = (D * dy - dx * d) / d2, cy0 = (-D * dx - dy * d) / d2, cx1 = (D * dy + dx * d) / d2, cy1 = (-D * dx + dy * d) / d2, dx0 = cx0 - x3, dy0 = cy0 - y3, dx1 = cx1 - x3, dy1 = cy1 - y3;
    if (dx0 * dx0 + dy0 * dy0 > dx1 * dx1 + dy1 * dy1) cx0 = cx1, cy0 = cy1;
    return [ [ cx0 - ox, cy0 - oy ], [ cx0 * r1 / r, cy0 * r1 / r ] ];
  }
  function d3_svg_line(projection) {
    var x = d3_geom_pointX, y = d3_geom_pointY, defined = d3_true, interpolate = d3_svg_lineLinear, interpolateKey = interpolate.key, tension = .7;
    function line(data) {
      var segments = [], points = [], i = -1, n = data.length, d, fx = d3_functor(x), fy = d3_functor(y);
      function segment() {
        segments.push("M", interpolate(projection(points), tension));
      }
      while (++i < n) {
        if (defined.call(this, d = data[i], i)) {
          points.push([ +fx.call(this, d, i), +fy.call(this, d, i) ]);
        } else if (points.length) {
          segment();
          points = [];
        }
      }
      if (points.length) segment();
      return segments.length ? segments.join("") : null;
    }
    line.x = function(_) {
      if (!arguments.length) return x;
      x = _;
      return line;
    };
    line.y = function(_) {
      if (!arguments.length) return y;
      y = _;
      return line;
    };
    line.defined = function(_) {
      if (!arguments.length) return defined;
      defined = _;
      return line;
    };
    line.interpolate = function(_) {
      if (!arguments.length) return interpolateKey;
      if (typeof _ === "function") interpolateKey = interpolate = _; else interpolateKey = (interpolate = d3_svg_lineInterpolators.get(_) || d3_svg_lineLinear).key;
      return line;
    };
    line.tension = function(_) {
      if (!arguments.length) return tension;
      tension = _;
      return line;
    };
    return line;
  }
  d3.svg.line = function() {
    return d3_svg_line(d3_identity);
  };
  var d3_svg_lineInterpolators = d3.map({
    linear: d3_svg_lineLinear,
    "linear-closed": d3_svg_lineLinearClosed,
    step: d3_svg_lineStep,
    "step-before": d3_svg_lineStepBefore,
    "step-after": d3_svg_lineStepAfter,
    basis: d3_svg_lineBasis,
    "basis-open": d3_svg_lineBasisOpen,
    "basis-closed": d3_svg_lineBasisClosed,
    bundle: d3_svg_lineBundle,
    cardinal: d3_svg_lineCardinal,
    "cardinal-open": d3_svg_lineCardinalOpen,
    "cardinal-closed": d3_svg_lineCardinalClosed,
    monotone: d3_svg_lineMonotone
  });
  d3_svg_lineInterpolators.forEach(function(key, value) {
    value.key = key;
    value.closed = /-closed$/.test(key);
  });
  function d3_svg_lineLinear(points) {
    return points.length > 1 ? points.join("L") : points + "Z";
  }
  function d3_svg_lineLinearClosed(points) {
    return points.join("L") + "Z";
  }
  function d3_svg_lineStep(points) {
    var i = 0, n = points.length, p = points[0], path = [ p[0], ",", p[1] ];
    while (++i < n) path.push("H", (p[0] + (p = points[i])[0]) / 2, "V", p[1]);
    if (n > 1) path.push("H", p[0]);
    return path.join("");
  }
  function d3_svg_lineStepBefore(points) {
    var i = 0, n = points.length, p = points[0], path = [ p[0], ",", p[1] ];
    while (++i < n) path.push("V", (p = points[i])[1], "H", p[0]);
    return path.join("");
  }
  function d3_svg_lineStepAfter(points) {
    var i = 0, n = points.length, p = points[0], path = [ p[0], ",", p[1] ];
    while (++i < n) path.push("H", (p = points[i])[0], "V", p[1]);
    return path.join("");
  }
  function d3_svg_lineCardinalOpen(points, tension) {
    return points.length < 4 ? d3_svg_lineLinear(points) : points[1] + d3_svg_lineHermite(points.slice(1, -1), d3_svg_lineCardinalTangents(points, tension));
  }
  function d3_svg_lineCardinalClosed(points, tension) {
    return points.length < 3 ? d3_svg_lineLinearClosed(points) : points[0] + d3_svg_lineHermite((points.push(points[0]), 
    points), d3_svg_lineCardinalTangents([ points[points.length - 2] ].concat(points, [ points[1] ]), tension));
  }
  function d3_svg_lineCardinal(points, tension) {
    return points.length < 3 ? d3_svg_lineLinear(points) : points[0] + d3_svg_lineHermite(points, d3_svg_lineCardinalTangents(points, tension));
  }
  function d3_svg_lineHermite(points, tangents) {
    if (tangents.length < 1 || points.length != tangents.length && points.length != tangents.length + 2) {
      return d3_svg_lineLinear(points);
    }
    var quad = points.length != tangents.length, path = "", p0 = points[0], p = points[1], t0 = tangents[0], t = t0, pi = 1;
    if (quad) {
      path += "Q" + (p[0] - t0[0] * 2 / 3) + "," + (p[1] - t0[1] * 2 / 3) + "," + p[0] + "," + p[1];
      p0 = points[1];
      pi = 2;
    }
    if (tangents.length > 1) {
      t = tangents[1];
      p = points[pi];
      pi++;
      path += "C" + (p0[0] + t0[0]) + "," + (p0[1] + t0[1]) + "," + (p[0] - t[0]) + "," + (p[1] - t[1]) + "," + p[0] + "," + p[1];
      for (var i = 2; i < tangents.length; i++, pi++) {
        p = points[pi];
        t = tangents[i];
        path += "S" + (p[0] - t[0]) + "," + (p[1] - t[1]) + "," + p[0] + "," + p[1];
      }
    }
    if (quad) {
      var lp = points[pi];
      path += "Q" + (p[0] + t[0] * 2 / 3) + "," + (p[1] + t[1] * 2 / 3) + "," + lp[0] + "," + lp[1];
    }
    return path;
  }
  function d3_svg_lineCardinalTangents(points, tension) {
    var tangents = [], a = (1 - tension) / 2, p0, p1 = points[0], p2 = points[1], i = 1, n = points.length;
    while (++i < n) {
      p0 = p1;
      p1 = p2;
      p2 = points[i];
      tangents.push([ a * (p2[0] - p0[0]), a * (p2[1] - p0[1]) ]);
    }
    return tangents;
  }
  function d3_svg_lineBasis(points) {
    if (points.length < 3) return d3_svg_lineLinear(points);
    var i = 1, n = points.length, pi = points[0], x0 = pi[0], y0 = pi[1], px = [ x0, x0, x0, (pi = points[1])[0] ], py = [ y0, y0, y0, pi[1] ], path = [ x0, ",", y0, "L", d3_svg_lineDot4(d3_svg_lineBasisBezier3, px), ",", d3_svg_lineDot4(d3_svg_lineBasisBezier3, py) ];
    points.push(points[n - 1]);
    while (++i <= n) {
      pi = points[i];
      px.shift();
      px.push(pi[0]);
      py.shift();
      py.push(pi[1]);
      d3_svg_lineBasisBezier(path, px, py);
    }
    points.pop();
    path.push("L", pi);
    return path.join("");
  }
  function d3_svg_lineBasisOpen(points) {
    if (points.length < 4) return d3_svg_lineLinear(points);
    var path = [], i = -1, n = points.length, pi, px = [ 0 ], py = [ 0 ];
    while (++i < 3) {
      pi = points[i];
      px.push(pi[0]);
      py.push(pi[1]);
    }
    path.push(d3_svg_lineDot4(d3_svg_lineBasisBezier3, px) + "," + d3_svg_lineDot4(d3_svg_lineBasisBezier3, py));
    --i;
    while (++i < n) {
      pi = points[i];
      px.shift();
      px.push(pi[0]);
      py.shift();
      py.push(pi[1]);
      d3_svg_lineBasisBezier(path, px, py);
    }
    return path.join("");
  }
  function d3_svg_lineBasisClosed(points) {
    var path, i = -1, n = points.length, m = n + 4, pi, px = [], py = [];
    while (++i < 4) {
      pi = points[i % n];
      px.push(pi[0]);
      py.push(pi[1]);
    }
    path = [ d3_svg_lineDot4(d3_svg_lineBasisBezier3, px), ",", d3_svg_lineDot4(d3_svg_lineBasisBezier3, py) ];
    --i;
    while (++i < m) {
      pi = points[i % n];
      px.shift();
      px.push(pi[0]);
      py.shift();
      py.push(pi[1]);
      d3_svg_lineBasisBezier(path, px, py);
    }
    return path.join("");
  }
  function d3_svg_lineBundle(points, tension) {
    var n = points.length - 1;
    if (n) {
      var x0 = points[0][0], y0 = points[0][1], dx = points[n][0] - x0, dy = points[n][1] - y0, i = -1, p, t;
      while (++i <= n) {
        p = points[i];
        t = i / n;
        p[0] = tension * p[0] + (1 - tension) * (x0 + t * dx);
        p[1] = tension * p[1] + (1 - tension) * (y0 + t * dy);
      }
    }
    return d3_svg_lineBasis(points);
  }
  function d3_svg_lineDot4(a, b) {
    return a[0] * b[0] + a[1] * b[1] + a[2] * b[2] + a[3] * b[3];
  }
  var d3_svg_lineBasisBezier1 = [ 0, 2 / 3, 1 / 3, 0 ], d3_svg_lineBasisBezier2 = [ 0, 1 / 3, 2 / 3, 0 ], d3_svg_lineBasisBezier3 = [ 0, 1 / 6, 2 / 3, 1 / 6 ];
  function d3_svg_lineBasisBezier(path, x, y) {
    path.push("C", d3_svg_lineDot4(d3_svg_lineBasisBezier1, x), ",", d3_svg_lineDot4(d3_svg_lineBasisBezier1, y), ",", d3_svg_lineDot4(d3_svg_lineBasisBezier2, x), ",", d3_svg_lineDot4(d3_svg_lineBasisBezier2, y), ",", d3_svg_lineDot4(d3_svg_lineBasisBezier3, x), ",", d3_svg_lineDot4(d3_svg_lineBasisBezier3, y));
  }
  function d3_svg_lineSlope(p0, p1) {
    return (p1[1] - p0[1]) / (p1[0] - p0[0]);
  }
  function d3_svg_lineFiniteDifferences(points) {
    var i = 0, j = points.length - 1, m = [], p0 = points[0], p1 = points[1], d = m[0] = d3_svg_lineSlope(p0, p1);
    while (++i < j) {
      m[i] = (d + (d = d3_svg_lineSlope(p0 = p1, p1 = points[i + 1]))) / 2;
    }
    m[i] = d;
    return m;
  }
  function d3_svg_lineMonotoneTangents(points) {
    var tangents = [], d, a, b, s, m = d3_svg_lineFiniteDifferences(points), i = -1, j = points.length - 1;
    while (++i < j) {
      d = d3_svg_lineSlope(points[i], points[i + 1]);
      if (abs(d) < ε) {
        m[i] = m[i + 1] = 0;
      } else {
        a = m[i] / d;
        b = m[i + 1] / d;
        s = a * a + b * b;
        if (s > 9) {
          s = d * 3 / Math.sqrt(s);
          m[i] = s * a;
          m[i + 1] = s * b;
        }
      }
    }
    i = -1;
    while (++i <= j) {
      s = (points[Math.min(j, i + 1)][0] - points[Math.max(0, i - 1)][0]) / (6 * (1 + m[i] * m[i]));
      tangents.push([ s || 0, m[i] * s || 0 ]);
    }
    return tangents;
  }
  function d3_svg_lineMonotone(points) {
    return points.length < 3 ? d3_svg_lineLinear(points) : points[0] + d3_svg_lineHermite(points, d3_svg_lineMonotoneTangents(points));
  }
  d3.svg.line.radial = function() {
    var line = d3_svg_line(d3_svg_lineRadial);
    line.radius = line.x, delete line.x;
    line.angle = line.y, delete line.y;
    return line;
  };
  function d3_svg_lineRadial(points) {
    var point, i = -1, n = points.length, r, a;
    while (++i < n) {
      point = points[i];
      r = point[0];
      a = point[1] - halfπ;
      point[0] = r * Math.cos(a);
      point[1] = r * Math.sin(a);
    }
    return points;
  }
  function d3_svg_area(projection) {
    var x0 = d3_geom_pointX, x1 = d3_geom_pointX, y0 = 0, y1 = d3_geom_pointY, defined = d3_true, interpolate = d3_svg_lineLinear, interpolateKey = interpolate.key, interpolateReverse = interpolate, L = "L", tension = .7;
    function area(data) {
      var segments = [], points0 = [], points1 = [], i = -1, n = data.length, d, fx0 = d3_functor(x0), fy0 = d3_functor(y0), fx1 = x0 === x1 ? function() {
        return x;
      } : d3_functor(x1), fy1 = y0 === y1 ? function() {
        return y;
      } : d3_functor(y1), x, y;
      function segment() {
        segments.push("M", interpolate(projection(points1), tension), L, interpolateReverse(projection(points0.reverse()), tension), "Z");
      }
      while (++i < n) {
        if (defined.call(this, d = data[i], i)) {
          points0.push([ x = +fx0.call(this, d, i), y = +fy0.call(this, d, i) ]);
          points1.push([ +fx1.call(this, d, i), +fy1.call(this, d, i) ]);
        } else if (points0.length) {
          segment();
          points0 = [];
          points1 = [];
        }
      }
      if (points0.length) segment();
      return segments.length ? segments.join("") : null;
    }
    area.x = function(_) {
      if (!arguments.length) return x1;
      x0 = x1 = _;
      return area;
    };
    area.x0 = function(_) {
      if (!arguments.length) return x0;
      x0 = _;
      return area;
    };
    area.x1 = function(_) {
      if (!arguments.length) return x1;
      x1 = _;
      return area;
    };
    area.y = function(_) {
      if (!arguments.length) return y1;
      y0 = y1 = _;
      return area;
    };
    area.y0 = function(_) {
      if (!arguments.length) return y0;
      y0 = _;
      return area;
    };
    area.y1 = function(_) {
      if (!arguments.length) return y1;
      y1 = _;
      return area;
    };
    area.defined = function(_) {
      if (!arguments.length) return defined;
      defined = _;
      return area;
    };
    area.interpolate = function(_) {
      if (!arguments.length) return interpolateKey;
      if (typeof _ === "function") interpolateKey = interpolate = _; else interpolateKey = (interpolate = d3_svg_lineInterpolators.get(_) || d3_svg_lineLinear).key;
      interpolateReverse = interpolate.reverse || interpolate;
      L = interpolate.closed ? "M" : "L";
      return area;
    };
    area.tension = function(_) {
      if (!arguments.length) return tension;
      tension = _;
      return area;
    };
    return area;
  }
  d3_svg_lineStepBefore.reverse = d3_svg_lineStepAfter;
  d3_svg_lineStepAfter.reverse = d3_svg_lineStepBefore;
  d3.svg.area = function() {
    return d3_svg_area(d3_identity);
  };
  d3.svg.area.radial = function() {
    var area = d3_svg_area(d3_svg_lineRadial);
    area.radius = area.x, delete area.x;
    area.innerRadius = area.x0, delete area.x0;
    area.outerRadius = area.x1, delete area.x1;
    area.angle = area.y, delete area.y;
    area.startAngle = area.y0, delete area.y0;
    area.endAngle = area.y1, delete area.y1;
    return area;
  };
  d3.svg.chord = function() {
    var source = d3_source, target = d3_target, radius = d3_svg_chordRadius, startAngle = d3_svg_arcStartAngle, endAngle = d3_svg_arcEndAngle;
    function chord(d, i) {
      var s = subgroup(this, source, d, i), t = subgroup(this, target, d, i);
      return "M" + s.p0 + arc(s.r, s.p1, s.a1 - s.a0) + (equals(s, t) ? curve(s.r, s.p1, s.r, s.p0) : curve(s.r, s.p1, t.r, t.p0) + arc(t.r, t.p1, t.a1 - t.a0) + curve(t.r, t.p1, s.r, s.p0)) + "Z";
    }
    function subgroup(self, f, d, i) {
      var subgroup = f.call(self, d, i), r = radius.call(self, subgroup, i), a0 = startAngle.call(self, subgroup, i) - halfπ, a1 = endAngle.call(self, subgroup, i) - halfπ;
      return {
        r: r,
        a0: a0,
        a1: a1,
        p0: [ r * Math.cos(a0), r * Math.sin(a0) ],
        p1: [ r * Math.cos(a1), r * Math.sin(a1) ]
      };
    }
    function equals(a, b) {
      return a.a0 == b.a0 && a.a1 == b.a1;
    }
    function arc(r, p, a) {
      return "A" + r + "," + r + " 0 " + +(a > π) + ",1 " + p;
    }
    function curve(r0, p0, r1, p1) {
      return "Q 0,0 " + p1;
    }
    chord.radius = function(v) {
      if (!arguments.length) return radius;
      radius = d3_functor(v);
      return chord;
    };
    chord.source = function(v) {
      if (!arguments.length) return source;
      source = d3_functor(v);
      return chord;
    };
    chord.target = function(v) {
      if (!arguments.length) return target;
      target = d3_functor(v);
      return chord;
    };
    chord.startAngle = function(v) {
      if (!arguments.length) return startAngle;
      startAngle = d3_functor(v);
      return chord;
    };
    chord.endAngle = function(v) {
      if (!arguments.length) return endAngle;
      endAngle = d3_functor(v);
      return chord;
    };
    return chord;
  };
  function d3_svg_chordRadius(d) {
    return d.radius;
  }
  d3.svg.diagonal = function() {
    var source = d3_source, target = d3_target, projection = d3_svg_diagonalProjection;
    function diagonal(d, i) {
      var p0 = source.call(this, d, i), p3 = target.call(this, d, i), m = (p0.y + p3.y) / 2, p = [ p0, {
        x: p0.x,
        y: m
      }, {
        x: p3.x,
        y: m
      }, p3 ];
      p = p.map(projection);
      return "M" + p[0] + "C" + p[1] + " " + p[2] + " " + p[3];
    }
    diagonal.source = function(x) {
      if (!arguments.length) return source;
      source = d3_functor(x);
      return diagonal;
    };
    diagonal.target = function(x) {
      if (!arguments.length) return target;
      target = d3_functor(x);
      return diagonal;
    };
    diagonal.projection = function(x) {
      if (!arguments.length) return projection;
      projection = x;
      return diagonal;
    };
    return diagonal;
  };
  function d3_svg_diagonalProjection(d) {
    return [ d.x, d.y ];
  }
  d3.svg.diagonal.radial = function() {
    var diagonal = d3.svg.diagonal(), projection = d3_svg_diagonalProjection, projection_ = diagonal.projection;
    diagonal.projection = function(x) {
      return arguments.length ? projection_(d3_svg_diagonalRadialProjection(projection = x)) : projection;
    };
    return diagonal;
  };
  function d3_svg_diagonalRadialProjection(projection) {
    return function() {
      var d = projection.apply(this, arguments), r = d[0], a = d[1] - halfπ;
      return [ r * Math.cos(a), r * Math.sin(a) ];
    };
  }
  d3.svg.symbol = function() {
    var type = d3_svg_symbolType, size = d3_svg_symbolSize;
    function symbol(d, i) {
      return (d3_svg_symbols.get(type.call(this, d, i)) || d3_svg_symbolCircle)(size.call(this, d, i));
    }
    symbol.type = function(x) {
      if (!arguments.length) return type;
      type = d3_functor(x);
      return symbol;
    };
    symbol.size = function(x) {
      if (!arguments.length) return size;
      size = d3_functor(x);
      return symbol;
    };
    return symbol;
  };
  function d3_svg_symbolSize() {
    return 64;
  }
  function d3_svg_symbolType() {
    return "circle";
  }
  function d3_svg_symbolCircle(size) {
    var r = Math.sqrt(size / π);
    return "M0," + r + "A" + r + "," + r + " 0 1,1 0," + -r + "A" + r + "," + r + " 0 1,1 0," + r + "Z";
  }
  var d3_svg_symbols = d3.map({
    circle: d3_svg_symbolCircle,
    cross: function(size) {
      var r = Math.sqrt(size / 5) / 2;
      return "M" + -3 * r + "," + -r + "H" + -r + "V" + -3 * r + "H" + r + "V" + -r + "H" + 3 * r + "V" + r + "H" + r + "V" + 3 * r + "H" + -r + "V" + r + "H" + -3 * r + "Z";
    },
    diamond: function(size) {
      var ry = Math.sqrt(size / (2 * d3_svg_symbolTan30)), rx = ry * d3_svg_symbolTan30;
      return "M0," + -ry + "L" + rx + ",0" + " 0," + ry + " " + -rx + ",0" + "Z";
    },
    square: function(size) {
      var r = Math.sqrt(size) / 2;
      return "M" + -r + "," + -r + "L" + r + "," + -r + " " + r + "," + r + " " + -r + "," + r + "Z";
    },
    "triangle-down": function(size) {
      var rx = Math.sqrt(size / d3_svg_symbolSqrt3), ry = rx * d3_svg_symbolSqrt3 / 2;
      return "M0," + ry + "L" + rx + "," + -ry + " " + -rx + "," + -ry + "Z";
    },
    "triangle-up": function(size) {
      var rx = Math.sqrt(size / d3_svg_symbolSqrt3), ry = rx * d3_svg_symbolSqrt3 / 2;
      return "M0," + -ry + "L" + rx + "," + ry + " " + -rx + "," + ry + "Z";
    }
  });
  d3.svg.symbolTypes = d3_svg_symbols.keys();
  var d3_svg_symbolSqrt3 = Math.sqrt(3), d3_svg_symbolTan30 = Math.tan(30 * d3_radians);
  d3_selectionPrototype.transition = function(name) {
    var id = d3_transitionInheritId || ++d3_transitionId, ns = d3_transitionNamespace(name), subgroups = [], subgroup, node, transition = d3_transitionInherit || {
      time: Date.now(),
      ease: d3_ease_cubicInOut,
      delay: 0,
      duration: 250
    };
    for (var j = -1, m = this.length; ++j < m; ) {
      subgroups.push(subgroup = []);
      for (var group = this[j], i = -1, n = group.length; ++i < n; ) {
        if (node = group[i]) d3_transitionNode(node, i, ns, id, transition);
        subgroup.push(node);
      }
    }
    return d3_transition(subgroups, ns, id);
  };
  d3_selectionPrototype.interrupt = function(name) {
    return this.each(name == null ? d3_selection_interrupt : d3_selection_interruptNS(d3_transitionNamespace(name)));
  };
  var d3_selection_interrupt = d3_selection_interruptNS(d3_transitionNamespace());
  function d3_selection_interruptNS(ns) {
    return function() {
      var lock, activeId, active;
      if ((lock = this[ns]) && (active = lock[activeId = lock.active])) {
        active.timer.c = null;
        active.timer.t = NaN;
        if (--lock.count) delete lock[activeId]; else delete this[ns];
        lock.active += .5;
        active.event && active.event.interrupt.call(this, this.__data__, active.index);
      }
    };
  }
  function d3_transition(groups, ns, id) {
    d3_subclass(groups, d3_transitionPrototype);
    groups.namespace = ns;
    groups.id = id;
    return groups;
  }
  var d3_transitionPrototype = [], d3_transitionId = 0, d3_transitionInheritId, d3_transitionInherit;
  d3_transitionPrototype.call = d3_selectionPrototype.call;
  d3_transitionPrototype.empty = d3_selectionPrototype.empty;
  d3_transitionPrototype.node = d3_selectionPrototype.node;
  d3_transitionPrototype.size = d3_selectionPrototype.size;
  d3.transition = function(selection, name) {
    return selection && selection.transition ? d3_transitionInheritId ? selection.transition(name) : selection : d3.selection().transition(selection);
  };
  d3.transition.prototype = d3_transitionPrototype;
  d3_transitionPrototype.select = function(selector) {
    var id = this.id, ns = this.namespace, subgroups = [], subgroup, subnode, node;
    selector = d3_selection_selector(selector);
    for (var j = -1, m = this.length; ++j < m; ) {
      subgroups.push(subgroup = []);
      for (var group = this[j], i = -1, n = group.length; ++i < n; ) {
        if ((node = group[i]) && (subnode = selector.call(node, node.__data__, i, j))) {
          if ("__data__" in node) subnode.__data__ = node.__data__;
          d3_transitionNode(subnode, i, ns, id, node[ns][id]);
          subgroup.push(subnode);
        } else {
          subgroup.push(null);
        }
      }
    }
    return d3_transition(subgroups, ns, id);
  };
  d3_transitionPrototype.selectAll = function(selector) {
    var id = this.id, ns = this.namespace, subgroups = [], subgroup, subnodes, node, subnode, transition;
    selector = d3_selection_selectorAll(selector);
    for (var j = -1, m = this.length; ++j < m; ) {
      for (var group = this[j], i = -1, n = group.length; ++i < n; ) {
        if (node = group[i]) {
          transition = node[ns][id];
          subnodes = selector.call(node, node.__data__, i, j);
          subgroups.push(subgroup = []);
          for (var k = -1, o = subnodes.length; ++k < o; ) {
            if (subnode = subnodes[k]) d3_transitionNode(subnode, k, ns, id, transition);
            subgroup.push(subnode);
          }
        }
      }
    }
    return d3_transition(subgroups, ns, id);
  };
  d3_transitionPrototype.filter = function(filter) {
    var subgroups = [], subgroup, group, node;
    if (typeof filter !== "function") filter = d3_selection_filter(filter);
    for (var j = 0, m = this.length; j < m; j++) {
      subgroups.push(subgroup = []);
      for (var group = this[j], i = 0, n = group.length; i < n; i++) {
        if ((node = group[i]) && filter.call(node, node.__data__, i, j)) {
          subgroup.push(node);
        }
      }
    }
    return d3_transition(subgroups, this.namespace, this.id);
  };
  d3_transitionPrototype.tween = function(name, tween) {
    var id = this.id, ns = this.namespace;
    if (arguments.length < 2) return this.node()[ns][id].tween.get(name);
    return d3_selection_each(this, tween == null ? function(node) {
      node[ns][id].tween.remove(name);
    } : function(node) {
      node[ns][id].tween.set(name, tween);
    });
  };
  function d3_transition_tween(groups, name, value, tween) {
    var id = groups.id, ns = groups.namespace;
    return d3_selection_each(groups, typeof value === "function" ? function(node, i, j) {
      node[ns][id].tween.set(name, tween(value.call(node, node.__data__, i, j)));
    } : (value = tween(value), function(node) {
      node[ns][id].tween.set(name, value);
    }));
  }
  d3_transitionPrototype.attr = function(nameNS, value) {
    if (arguments.length < 2) {
      for (value in nameNS) this.attr(value, nameNS[value]);
      return this;
    }
    var interpolate = nameNS == "transform" ? d3_interpolateTransform : d3_interpolate, name = d3.ns.qualify(nameNS);
    function attrNull() {
      this.removeAttribute(name);
    }
    function attrNullNS() {
      this.removeAttributeNS(name.space, name.local);
    }
    function attrTween(b) {
      return b == null ? attrNull : (b += "", function() {
        var a = this.getAttribute(name), i;
        return a !== b && (i = interpolate(a, b), function(t) {
          this.setAttribute(name, i(t));
        });
      });
    }
    function attrTweenNS(b) {
      return b == null ? attrNullNS : (b += "", function() {
        var a = this.getAttributeNS(name.space, name.local), i;
        return a !== b && (i = interpolate(a, b), function(t) {
          this.setAttributeNS(name.space, name.local, i(t));
        });
      });
    }
    return d3_transition_tween(this, "attr." + nameNS, value, name.local ? attrTweenNS : attrTween);
  };
  d3_transitionPrototype.attrTween = function(nameNS, tween) {
    var name = d3.ns.qualify(nameNS);
    function attrTween(d, i) {
      var f = tween.call(this, d, i, this.getAttribute(name));
      return f && function(t) {
        this.setAttribute(name, f(t));
      };
    }
    function attrTweenNS(d, i) {
      var f = tween.call(this, d, i, this.getAttributeNS(name.space, name.local));
      return f && function(t) {
        this.setAttributeNS(name.space, name.local, f(t));
      };
    }
    return this.tween("attr." + nameNS, name.local ? attrTweenNS : attrTween);
  };
  d3_transitionPrototype.style = function(name, value, priority) {
    var n = arguments.length;
    if (n < 3) {
      if (typeof name !== "string") {
        if (n < 2) value = "";
        for (priority in name) this.style(priority, name[priority], value);
        return this;
      }
      priority = "";
    }
    function styleNull() {
      this.style.removeProperty(name);
    }
    function styleString(b) {
      return b == null ? styleNull : (b += "", function() {
        var a = d3_window(this).getComputedStyle(this, null).getPropertyValue(name), i;
        return a !== b && (i = d3_interpolate(a, b), function(t) {
          this.style.setProperty(name, i(t), priority);
        });
      });
    }
    return d3_transition_tween(this, "style." + name, value, styleString);
  };
  d3_transitionPrototype.styleTween = function(name, tween, priority) {
    if (arguments.length < 3) priority = "";
    function styleTween(d, i) {
      var f = tween.call(this, d, i, d3_window(this).getComputedStyle(this, null).getPropertyValue(name));
      return f && function(t) {
        this.style.setProperty(name, f(t), priority);
      };
    }
    return this.tween("style." + name, styleTween);
  };
  d3_transitionPrototype.text = function(value) {
    return d3_transition_tween(this, "text", value, d3_transition_text);
  };
  function d3_transition_text(b) {
    if (b == null) b = "";
    return function() {
      this.textContent = b;
    };
  }
  d3_transitionPrototype.remove = function() {
    var ns = this.namespace;
    return this.each("end.transition", function() {
      var p;
      if (this[ns].count < 2 && (p = this.parentNode)) p.removeChild(this);
    });
  };
  d3_transitionPrototype.ease = function(value) {
    var id = this.id, ns = this.namespace;
    if (arguments.length < 1) return this.node()[ns][id].ease;
    if (typeof value !== "function") value = d3.ease.apply(d3, arguments);
    return d3_selection_each(this, function(node) {
      node[ns][id].ease = value;
    });
  };
  d3_transitionPrototype.delay = function(value) {
    var id = this.id, ns = this.namespace;
    if (arguments.length < 1) return this.node()[ns][id].delay;
    return d3_selection_each(this, typeof value === "function" ? function(node, i, j) {
      node[ns][id].delay = +value.call(node, node.__data__, i, j);
    } : (value = +value, function(node) {
      node[ns][id].delay = value;
    }));
  };
  d3_transitionPrototype.duration = function(value) {
    var id = this.id, ns = this.namespace;
    if (arguments.length < 1) return this.node()[ns][id].duration;
    return d3_selection_each(this, typeof value === "function" ? function(node, i, j) {
      node[ns][id].duration = Math.max(1, value.call(node, node.__data__, i, j));
    } : (value = Math.max(1, value), function(node) {
      node[ns][id].duration = value;
    }));
  };
  d3_transitionPrototype.each = function(type, listener) {
    var id = this.id, ns = this.namespace;
    if (arguments.length < 2) {
      var inherit = d3_transitionInherit, inheritId = d3_transitionInheritId;
      try {
        d3_transitionInheritId = id;
        d3_selection_each(this, function(node, i, j) {
          d3_transitionInherit = node[ns][id];
          type.call(node, node.__data__, i, j);
        });
      } finally {
        d3_transitionInherit = inherit;
        d3_transitionInheritId = inheritId;
      }
    } else {
      d3_selection_each(this, function(node) {
        var transition = node[ns][id];
        (transition.event || (transition.event = d3.dispatch("start", "end", "interrupt"))).on(type, listener);
      });
    }
    return this;
  };
  d3_transitionPrototype.transition = function() {
    var id0 = this.id, id1 = ++d3_transitionId, ns = this.namespace, subgroups = [], subgroup, group, node, transition;
    for (var j = 0, m = this.length; j < m; j++) {
      subgroups.push(subgroup = []);
      for (var group = this[j], i = 0, n = group.length; i < n; i++) {
        if (node = group[i]) {
          transition = node[ns][id0];
          d3_transitionNode(node, i, ns, id1, {
            time: transition.time,
            ease: transition.ease,
            delay: transition.delay + transition.duration,
            duration: transition.duration
          });
        }
        subgroup.push(node);
      }
    }
    return d3_transition(subgroups, ns, id1);
  };
  function d3_transitionNamespace(name) {
    return name == null ? "__transition__" : "__transition_" + name + "__";
  }
  function d3_transitionNode(node, i, ns, id, inherit) {
    var lock = node[ns] || (node[ns] = {
      active: 0,
      count: 0
    }), transition = lock[id], time, timer, duration, ease, tweens;
    function schedule(elapsed) {
      var delay = transition.delay;
      timer.t = delay + time;
      if (delay <= elapsed) return start(elapsed - delay);
      timer.c = start;
    }
    function start(elapsed) {
      var activeId = lock.active, active = lock[activeId];
      if (active) {
        active.timer.c = null;
        active.timer.t = NaN;
        --lock.count;
        delete lock[activeId];
        active.event && active.event.interrupt.call(node, node.__data__, active.index);
      }
      for (var cancelId in lock) {
        if (+cancelId < id) {
          var cancel = lock[cancelId];
          cancel.timer.c = null;
          cancel.timer.t = NaN;
          --lock.count;
          delete lock[cancelId];
        }
      }
      timer.c = tick;
      d3_timer(function() {
        if (timer.c && tick(elapsed || 1)) {
          timer.c = null;
          timer.t = NaN;
        }
        return 1;
      }, 0, time);
      lock.active = id;
      transition.event && transition.event.start.call(node, node.__data__, i);
      tweens = [];
      transition.tween.forEach(function(key, value) {
        if (value = value.call(node, node.__data__, i)) {
          tweens.push(value);
        }
      });
      ease = transition.ease;
      duration = transition.duration;
    }
    function tick(elapsed) {
      var t = elapsed / duration, e = ease(t), n = tweens.length;
      while (n > 0) {
        tweens[--n].call(node, e);
      }
      if (t >= 1) {
        transition.event && transition.event.end.call(node, node.__data__, i);
        if (--lock.count) delete lock[id]; else delete node[ns];
        return 1;
      }
    }
    if (!transition) {
      time = inherit.time;
      timer = d3_timer(schedule, 0, time);
      transition = lock[id] = {
        tween: new d3_Map(),
        time: time,
        timer: timer,
        delay: inherit.delay,
        duration: inherit.duration,
        ease: inherit.ease,
        index: i
      };
      inherit = null;
      ++lock.count;
    }
  }
  d3.svg.axis = function() {
    var scale = d3.scale.linear(), orient = d3_svg_axisDefaultOrient, innerTickSize = 6, outerTickSize = 6, tickPadding = 3, tickArguments_ = [ 10 ], tickValues = null, tickFormat_;
    function axis(g) {
      g.each(function() {
        var g = d3.select(this);
        var scale0 = this.__chart__ || scale, scale1 = this.__chart__ = scale.copy();
        var ticks = tickValues == null ? scale1.ticks ? scale1.ticks.apply(scale1, tickArguments_) : scale1.domain() : tickValues, tickFormat = tickFormat_ == null ? scale1.tickFormat ? scale1.tickFormat.apply(scale1, tickArguments_) : d3_identity : tickFormat_, tick = g.selectAll(".tick").data(ticks, scale1), tickEnter = tick.enter().insert("g", ".domain").attr("class", "tick").style("opacity", ε), tickExit = d3.transition(tick.exit()).style("opacity", ε).remove(), tickUpdate = d3.transition(tick.order()).style("opacity", 1), tickSpacing = Math.max(innerTickSize, 0) + tickPadding, tickTransform;
        var range = d3_scaleRange(scale1), path = g.selectAll(".domain").data([ 0 ]), pathUpdate = (path.enter().append("path").attr("class", "domain"), 
        d3.transition(path));
        tickEnter.append("line");
        tickEnter.append("text");
        var lineEnter = tickEnter.select("line"), lineUpdate = tickUpdate.select("line"), text = tick.select("text").text(tickFormat), textEnter = tickEnter.select("text"), textUpdate = tickUpdate.select("text"), sign = orient === "top" || orient === "left" ? -1 : 1, x1, x2, y1, y2;
        if (orient === "bottom" || orient === "top") {
          tickTransform = d3_svg_axisX, x1 = "x", y1 = "y", x2 = "x2", y2 = "y2";
          text.attr("dy", sign < 0 ? "0em" : ".71em").style("text-anchor", "middle");
          pathUpdate.attr("d", "M" + range[0] + "," + sign * outerTickSize + "V0H" + range[1] + "V" + sign * outerTickSize);
        } else {
          tickTransform = d3_svg_axisY, x1 = "y", y1 = "x", x2 = "y2", y2 = "x2";
          text.attr("dy", ".32em").style("text-anchor", sign < 0 ? "end" : "start");
          pathUpdate.attr("d", "M" + sign * outerTickSize + "," + range[0] + "H0V" + range[1] + "H" + sign * outerTickSize);
        }
        lineEnter.attr(y2, sign * innerTickSize);
        textEnter.attr(y1, sign * tickSpacing);
        lineUpdate.attr(x2, 0).attr(y2, sign * innerTickSize);
        textUpdate.attr(x1, 0).attr(y1, sign * tickSpacing);
        if (scale1.rangeBand) {
          var x = scale1, dx = x.rangeBand() / 2;
          scale0 = scale1 = function(d) {
            return x(d) + dx;
          };
        } else if (scale0.rangeBand) {
          scale0 = scale1;
        } else {
          tickExit.call(tickTransform, scale1, scale0);
        }
        tickEnter.call(tickTransform, scale0, scale1);
        tickUpdate.call(tickTransform, scale1, scale1);
      });
    }
    axis.scale = function(x) {
      if (!arguments.length) return scale;
      scale = x;
      return axis;
    };
    axis.orient = function(x) {
      if (!arguments.length) return orient;
      orient = x in d3_svg_axisOrients ? x + "" : d3_svg_axisDefaultOrient;
      return axis;
    };
    axis.ticks = function() {
      if (!arguments.length) return tickArguments_;
      tickArguments_ = d3_array(arguments);
      return axis;
    };
    axis.tickValues = function(x) {
      if (!arguments.length) return tickValues;
      tickValues = x;
      return axis;
    };
    axis.tickFormat = function(x) {
      if (!arguments.length) return tickFormat_;
      tickFormat_ = x;
      return axis;
    };
    axis.tickSize = function(x) {
      var n = arguments.length;
      if (!n) return innerTickSize;
      innerTickSize = +x;
      outerTickSize = +arguments[n - 1];
      return axis;
    };
    axis.innerTickSize = function(x) {
      if (!arguments.length) return innerTickSize;
      innerTickSize = +x;
      return axis;
    };
    axis.outerTickSize = function(x) {
      if (!arguments.length) return outerTickSize;
      outerTickSize = +x;
      return axis;
    };
    axis.tickPadding = function(x) {
      if (!arguments.length) return tickPadding;
      tickPadding = +x;
      return axis;
    };
    axis.tickSubdivide = function() {
      return arguments.length && axis;
    };
    return axis;
  };
  var d3_svg_axisDefaultOrient = "bottom", d3_svg_axisOrients = {
    top: 1,
    right: 1,
    bottom: 1,
    left: 1
  };
  function d3_svg_axisX(selection, x0, x1) {
    selection.attr("transform", function(d) {
      var v0 = x0(d);
      return "translate(" + (isFinite(v0) ? v0 : x1(d)) + ",0)";
    });
  }
  function d3_svg_axisY(selection, y0, y1) {
    selection.attr("transform", function(d) {
      var v0 = y0(d);
      return "translate(0," + (isFinite(v0) ? v0 : y1(d)) + ")";
    });
  }
  d3.svg.brush = function() {
    var event = d3_eventDispatch(brush, "brushstart", "brush", "brushend"), x = null, y = null, xExtent = [ 0, 0 ], yExtent = [ 0, 0 ], xExtentDomain, yExtentDomain, xClamp = true, yClamp = true, resizes = d3_svg_brushResizes[0];
    function brush(g) {
      g.each(function() {
        var g = d3.select(this).style("pointer-events", "all").style("-webkit-tap-highlight-color", "rgba(0,0,0,0)").on("mousedown.brush", brushstart).on("touchstart.brush", brushstart);
        var background = g.selectAll(".background").data([ 0 ]);
        background.enter().append("rect").attr("class", "background").style("visibility", "hidden").style("cursor", "crosshair");
        g.selectAll(".extent").data([ 0 ]).enter().append("rect").attr("class", "extent").style("cursor", "move");
        var resize = g.selectAll(".resize").data(resizes, d3_identity);
        resize.exit().remove();
        resize.enter().append("g").attr("class", function(d) {
          return "resize " + d;
        }).style("cursor", function(d) {
          return d3_svg_brushCursor[d];
        }).append("rect").attr("x", function(d) {
          return /[ew]$/.test(d) ? -3 : null;
        }).attr("y", function(d) {
          return /^[ns]/.test(d) ? -3 : null;
        }).attr("width", 6).attr("height", 6).style("visibility", "hidden");
        resize.style("display", brush.empty() ? "none" : null);
        var gUpdate = d3.transition(g), backgroundUpdate = d3.transition(background), range;
        if (x) {
          range = d3_scaleRange(x);
          backgroundUpdate.attr("x", range[0]).attr("width", range[1] - range[0]);
          redrawX(gUpdate);
        }
        if (y) {
          range = d3_scaleRange(y);
          backgroundUpdate.attr("y", range[0]).attr("height", range[1] - range[0]);
          redrawY(gUpdate);
        }
        redraw(gUpdate);
      });
    }
    brush.event = function(g) {
      g.each(function() {
        var event_ = event.of(this, arguments), extent1 = {
          x: xExtent,
          y: yExtent,
          i: xExtentDomain,
          j: yExtentDomain
        }, extent0 = this.__chart__ || extent1;
        this.__chart__ = extent1;
        if (d3_transitionInheritId) {
          d3.select(this).transition().each("start.brush", function() {
            xExtentDomain = extent0.i;
            yExtentDomain = extent0.j;
            xExtent = extent0.x;
            yExtent = extent0.y;
            event_({
              type: "brushstart"
            });
          }).tween("brush:brush", function() {
            var xi = d3_interpolateArray(xExtent, extent1.x), yi = d3_interpolateArray(yExtent, extent1.y);
            xExtentDomain = yExtentDomain = null;
            return function(t) {
              xExtent = extent1.x = xi(t);
              yExtent = extent1.y = yi(t);
              event_({
                type: "brush",
                mode: "resize"
              });
            };
          }).each("end.brush", function() {
            xExtentDomain = extent1.i;
            yExtentDomain = extent1.j;
            event_({
              type: "brush",
              mode: "resize"
            });
            event_({
              type: "brushend"
            });
          });
        } else {
          event_({
            type: "brushstart"
          });
          event_({
            type: "brush",
            mode: "resize"
          });
          event_({
            type: "brushend"
          });
        }
      });
    };
    function redraw(g) {
      g.selectAll(".resize").attr("transform", function(d) {
        return "translate(" + xExtent[+/e$/.test(d)] + "," + yExtent[+/^s/.test(d)] + ")";
      });
    }
    function redrawX(g) {
      g.select(".extent").attr("x", xExtent[0]);
      g.selectAll(".extent,.n>rect,.s>rect").attr("width", xExtent[1] - xExtent[0]);
    }
    function redrawY(g) {
      g.select(".extent").attr("y", yExtent[0]);
      g.selectAll(".extent,.e>rect,.w>rect").attr("height", yExtent[1] - yExtent[0]);
    }
    function brushstart() {
      var target = this, eventTarget = d3.select(d3.event.target), event_ = event.of(target, arguments), g = d3.select(target), resizing = eventTarget.datum(), resizingX = !/^(n|s)$/.test(resizing) && x, resizingY = !/^(e|w)$/.test(resizing) && y, dragging = eventTarget.classed("extent"), dragRestore = d3_event_dragSuppress(target), center, origin = d3.mouse(target), offset;
      var w = d3.select(d3_window(target)).on("keydown.brush", keydown).on("keyup.brush", keyup);
      if (d3.event.changedTouches) {
        w.on("touchmove.brush", brushmove).on("touchend.brush", brushend);
      } else {
        w.on("mousemove.brush", brushmove).on("mouseup.brush", brushend);
      }
      g.interrupt().selectAll("*").interrupt();
      if (dragging) {
        origin[0] = xExtent[0] - origin[0];
        origin[1] = yExtent[0] - origin[1];
      } else if (resizing) {
        var ex = +/w$/.test(resizing), ey = +/^n/.test(resizing);
        offset = [ xExtent[1 - ex] - origin[0], yExtent[1 - ey] - origin[1] ];
        origin[0] = xExtent[ex];
        origin[1] = yExtent[ey];
      } else if (d3.event.altKey) center = origin.slice();
      g.style("pointer-events", "none").selectAll(".resize").style("display", null);
      d3.select("body").style("cursor", eventTarget.style("cursor"));
      event_({
        type: "brushstart"
      });
      brushmove();
      function keydown() {
        if (d3.event.keyCode == 32) {
          if (!dragging) {
            center = null;
            origin[0] -= xExtent[1];
            origin[1] -= yExtent[1];
            dragging = 2;
          }
          d3_eventPreventDefault();
        }
      }
      function keyup() {
        if (d3.event.keyCode == 32 && dragging == 2) {
          origin[0] += xExtent[1];
          origin[1] += yExtent[1];
          dragging = 0;
          d3_eventPreventDefault();
        }
      }
      function brushmove() {
        var point = d3.mouse(target), moved = false;
        if (offset) {
          point[0] += offset[0];
          point[1] += offset[1];
        }
        if (!dragging) {
          if (d3.event.altKey) {
            if (!center) center = [ (xExtent[0] + xExtent[1]) / 2, (yExtent[0] + yExtent[1]) / 2 ];
            origin[0] = xExtent[+(point[0] < center[0])];
            origin[1] = yExtent[+(point[1] < center[1])];
          } else center = null;
        }
        if (resizingX && move1(point, x, 0)) {
          redrawX(g);
          moved = true;
        }
        if (resizingY && move1(point, y, 1)) {
          redrawY(g);
          moved = true;
        }
        if (moved) {
          redraw(g);
          event_({
            type: "brush",
            mode: dragging ? "move" : "resize"
          });
        }
      }
      function move1(point, scale, i) {
        var range = d3_scaleRange(scale), r0 = range[0], r1 = range[1], position = origin[i], extent = i ? yExtent : xExtent, size = extent[1] - extent[0], min, max;
        if (dragging) {
          r0 -= position;
          r1 -= size + position;
        }
        min = (i ? yClamp : xClamp) ? Math.max(r0, Math.min(r1, point[i])) : point[i];
        if (dragging) {
          max = (min += position) + size;
        } else {
          if (center) position = Math.max(r0, Math.min(r1, 2 * center[i] - min));
          if (position < min) {
            max = min;
            min = position;
          } else {
            max = position;
          }
        }
        if (extent[0] != min || extent[1] != max) {
          if (i) yExtentDomain = null; else xExtentDomain = null;
          extent[0] = min;
          extent[1] = max;
          return true;
        }
      }
      function brushend() {
        brushmove();
        g.style("pointer-events", "all").selectAll(".resize").style("display", brush.empty() ? "none" : null);
        d3.select("body").style("cursor", null);
        w.on("mousemove.brush", null).on("mouseup.brush", null).on("touchmove.brush", null).on("touchend.brush", null).on("keydown.brush", null).on("keyup.brush", null);
        dragRestore();
        event_({
          type: "brushend"
        });
      }
    }
    brush.x = function(z) {
      if (!arguments.length) return x;
      x = z;
      resizes = d3_svg_brushResizes[!x << 1 | !y];
      return brush;
    };
    brush.y = function(z) {
      if (!arguments.length) return y;
      y = z;
      resizes = d3_svg_brushResizes[!x << 1 | !y];
      return brush;
    };
    brush.clamp = function(z) {
      if (!arguments.length) return x && y ? [ xClamp, yClamp ] : x ? xClamp : y ? yClamp : null;
      if (x && y) xClamp = !!z[0], yClamp = !!z[1]; else if (x) xClamp = !!z; else if (y) yClamp = !!z;
      return brush;
    };
    brush.extent = function(z) {
      var x0, x1, y0, y1, t;
      if (!arguments.length) {
        if (x) {
          if (xExtentDomain) {
            x0 = xExtentDomain[0], x1 = xExtentDomain[1];
          } else {
            x0 = xExtent[0], x1 = xExtent[1];
            if (x.invert) x0 = x.invert(x0), x1 = x.invert(x1);
            if (x1 < x0) t = x0, x0 = x1, x1 = t;
          }
        }
        if (y) {
          if (yExtentDomain) {
            y0 = yExtentDomain[0], y1 = yExtentDomain[1];
          } else {
            y0 = yExtent[0], y1 = yExtent[1];
            if (y.invert) y0 = y.invert(y0), y1 = y.invert(y1);
            if (y1 < y0) t = y0, y0 = y1, y1 = t;
          }
        }
        return x && y ? [ [ x0, y0 ], [ x1, y1 ] ] : x ? [ x0, x1 ] : y && [ y0, y1 ];
      }
      if (x) {
        x0 = z[0], x1 = z[1];
        if (y) x0 = x0[0], x1 = x1[0];
        xExtentDomain = [ x0, x1 ];
        if (x.invert) x0 = x(x0), x1 = x(x1);
        if (x1 < x0) t = x0, x0 = x1, x1 = t;
        if (x0 != xExtent[0] || x1 != xExtent[1]) xExtent = [ x0, x1 ];
      }
      if (y) {
        y0 = z[0], y1 = z[1];
        if (x) y0 = y0[1], y1 = y1[1];
        yExtentDomain = [ y0, y1 ];
        if (y.invert) y0 = y(y0), y1 = y(y1);
        if (y1 < y0) t = y0, y0 = y1, y1 = t;
        if (y0 != yExtent[0] || y1 != yExtent[1]) yExtent = [ y0, y1 ];
      }
      return brush;
    };
    brush.clear = function() {
      if (!brush.empty()) {
        xExtent = [ 0, 0 ], yExtent = [ 0, 0 ];
        xExtentDomain = yExtentDomain = null;
      }
      return brush;
    };
    brush.empty = function() {
      return !!x && xExtent[0] == xExtent[1] || !!y && yExtent[0] == yExtent[1];
    };
    return d3.rebind(brush, event, "on");
  };
  var d3_svg_brushCursor = {
    n: "ns-resize",
    e: "ew-resize",
    s: "ns-resize",
    w: "ew-resize",
    nw: "nwse-resize",
    ne: "nesw-resize",
    se: "nwse-resize",
    sw: "nesw-resize"
  };
  var d3_svg_brushResizes = [ [ "n", "e", "s", "w", "nw", "ne", "se", "sw" ], [ "e", "w" ], [ "n", "s" ], [] ];
  var d3_time_format = d3_time.format = d3_locale_enUS.timeFormat;
  var d3_time_formatUtc = d3_time_format.utc;
  var d3_time_formatIso = d3_time_formatUtc("%Y-%m-%dT%H:%M:%S.%LZ");
  d3_time_format.iso = Date.prototype.toISOString && +new Date("2000-01-01T00:00:00.000Z") ? d3_time_formatIsoNative : d3_time_formatIso;
  function d3_time_formatIsoNative(date) {
    return date.toISOString();
  }
  d3_time_formatIsoNative.parse = function(string) {
    var date = new Date(string);
    return isNaN(date) ? null : date;
  };
  d3_time_formatIsoNative.toString = d3_time_formatIso.toString;
  d3_time.second = d3_time_interval(function(date) {
    return new d3_date(Math.floor(date / 1e3) * 1e3);
  }, function(date, offset) {
    date.setTime(date.getTime() + Math.floor(offset) * 1e3);
  }, function(date) {
    return date.getSeconds();
  });
  d3_time.seconds = d3_time.second.range;
  d3_time.seconds.utc = d3_time.second.utc.range;
  d3_time.minute = d3_time_interval(function(date) {
    return new d3_date(Math.floor(date / 6e4) * 6e4);
  }, function(date, offset) {
    date.setTime(date.getTime() + Math.floor(offset) * 6e4);
  }, function(date) {
    return date.getMinutes();
  });
  d3_time.minutes = d3_time.minute.range;
  d3_time.minutes.utc = d3_time.minute.utc.range;
  d3_time.hour = d3_time_interval(function(date) {
    var timezone = date.getTimezoneOffset() / 60;
    return new d3_date((Math.floor(date / 36e5 - timezone) + timezone) * 36e5);
  }, function(date, offset) {
    date.setTime(date.getTime() + Math.floor(offset) * 36e5);
  }, function(date) {
    return date.getHours();
  });
  d3_time.hours = d3_time.hour.range;
  d3_time.hours.utc = d3_time.hour.utc.range;
  d3_time.month = d3_time_interval(function(date) {
    date = d3_time.day(date);
    date.setDate(1);
    return date;
  }, function(date, offset) {
    date.setMonth(date.getMonth() + offset);
  }, function(date) {
    return date.getMonth();
  });
  d3_time.months = d3_time.month.range;
  d3_time.months.utc = d3_time.month.utc.range;
  function d3_time_scale(linear, methods, format) {
    function scale(x) {
      return linear(x);
    }
    scale.invert = function(x) {
      return d3_time_scaleDate(linear.invert(x));
    };
    scale.domain = function(x) {
      if (!arguments.length) return linear.domain().map(d3_time_scaleDate);
      linear.domain(x);
      return scale;
    };
    function tickMethod(extent, count) {
      var span = extent[1] - extent[0], target = span / count, i = d3.bisect(d3_time_scaleSteps, target);
      return i == d3_time_scaleSteps.length ? [ methods.year, d3_scale_linearTickRange(extent.map(function(d) {
        return d / 31536e6;
      }), count)[2] ] : !i ? [ d3_time_scaleMilliseconds, d3_scale_linearTickRange(extent, count)[2] ] : methods[target / d3_time_scaleSteps[i - 1] < d3_time_scaleSteps[i] / target ? i - 1 : i];
    }
    scale.nice = function(interval, skip) {
      var domain = scale.domain(), extent = d3_scaleExtent(domain), method = interval == null ? tickMethod(extent, 10) : typeof interval === "number" && tickMethod(extent, interval);
      if (method) interval = method[0], skip = method[1];
      function skipped(date) {
        return !isNaN(date) && !interval.range(date, d3_time_scaleDate(+date + 1), skip).length;
      }
      return scale.domain(d3_scale_nice(domain, skip > 1 ? {
        floor: function(date) {
          while (skipped(date = interval.floor(date))) date = d3_time_scaleDate(date - 1);
          return date;
        },
        ceil: function(date) {
          while (skipped(date = interval.ceil(date))) date = d3_time_scaleDate(+date + 1);
          return date;
        }
      } : interval));
    };
    scale.ticks = function(interval, skip) {
      var extent = d3_scaleExtent(scale.domain()), method = interval == null ? tickMethod(extent, 10) : typeof interval === "number" ? tickMethod(extent, interval) : !interval.range && [ {
        range: interval
      }, skip ];
      if (method) interval = method[0], skip = method[1];
      return interval.range(extent[0], d3_time_scaleDate(+extent[1] + 1), skip < 1 ? 1 : skip);
    };
    scale.tickFormat = function() {
      return format;
    };
    scale.copy = function() {
      return d3_time_scale(linear.copy(), methods, format);
    };
    return d3_scale_linearRebind(scale, linear);
  }
  function d3_time_scaleDate(t) {
    return new Date(t);
  }
  var d3_time_scaleSteps = [ 1e3, 5e3, 15e3, 3e4, 6e4, 3e5, 9e5, 18e5, 36e5, 108e5, 216e5, 432e5, 864e5, 1728e5, 6048e5, 2592e6, 7776e6, 31536e6 ];
  var d3_time_scaleLocalMethods = [ [ d3_time.second, 1 ], [ d3_time.second, 5 ], [ d3_time.second, 15 ], [ d3_time.second, 30 ], [ d3_time.minute, 1 ], [ d3_time.minute, 5 ], [ d3_time.minute, 15 ], [ d3_time.minute, 30 ], [ d3_time.hour, 1 ], [ d3_time.hour, 3 ], [ d3_time.hour, 6 ], [ d3_time.hour, 12 ], [ d3_time.day, 1 ], [ d3_time.day, 2 ], [ d3_time.week, 1 ], [ d3_time.month, 1 ], [ d3_time.month, 3 ], [ d3_time.year, 1 ] ];
  var d3_time_scaleLocalFormat = d3_time_format.multi([ [ ".%L", function(d) {
    return d.getMilliseconds();
  } ], [ ":%S", function(d) {
    return d.getSeconds();
  } ], [ "%I:%M", function(d) {
    return d.getMinutes();
  } ], [ "%I %p", function(d) {
    return d.getHours();
  } ], [ "%a %d", function(d) {
    return d.getDay() && d.getDate() != 1;
  } ], [ "%b %d", function(d) {
    return d.getDate() != 1;
  } ], [ "%B", function(d) {
    return d.getMonth();
  } ], [ "%Y", d3_true ] ]);
  var d3_time_scaleMilliseconds = {
    range: function(start, stop, step) {
      return d3.range(Math.ceil(start / step) * step, +stop, step).map(d3_time_scaleDate);
    },
    floor: d3_identity,
    ceil: d3_identity
  };
  d3_time_scaleLocalMethods.year = d3_time.year;
  d3_time.scale = function() {
    return d3_time_scale(d3.scale.linear(), d3_time_scaleLocalMethods, d3_time_scaleLocalFormat);
  };
  var d3_time_scaleUtcMethods = d3_time_scaleLocalMethods.map(function(m) {
    return [ m[0].utc, m[1] ];
  });
  var d3_time_scaleUtcFormat = d3_time_formatUtc.multi([ [ ".%L", function(d) {
    return d.getUTCMilliseconds();
  } ], [ ":%S", function(d) {
    return d.getUTCSeconds();
  } ], [ "%I:%M", function(d) {
    return d.getUTCMinutes();
  } ], [ "%I %p", function(d) {
    return d.getUTCHours();
  } ], [ "%a %d", function(d) {
    return d.getUTCDay() && d.getUTCDate() != 1;
  } ], [ "%b %d", function(d) {
    return d.getUTCDate() != 1;
  } ], [ "%B", function(d) {
    return d.getUTCMonth();
  } ], [ "%Y", d3_true ] ]);
  d3_time_scaleUtcMethods.year = d3_time.year.utc;
  d3_time.scale.utc = function() {
    return d3_time_scale(d3.scale.linear(), d3_time_scaleUtcMethods, d3_time_scaleUtcFormat);
  };
  d3.text = d3_xhrType(function(request) {
    return request.responseText;
  });
  d3.json = function(url, callback) {
    return d3_xhr(url, "application/json", d3_json, callback);
  };
  function d3_json(request) {
    return JSON.parse(request.responseText);
  }
  d3.html = function(url, callback) {
    return d3_xhr(url, "text/html", d3_html, callback);
  };
  function d3_html(request) {
    var range = d3_document.createRange();
    range.selectNode(d3_document.body);
    return range.createContextualFragment(request.responseText);
  }
  d3.xml = d3_xhrType(function(request) {
    return request.responseXML;
  });
  if (typeof define === "function" && define.amd) this.d3 = d3, define(d3); else if (typeof module === "object" && module.exports) module.exports = d3; else this.d3 = d3;
}();
},{}],2:[function(require,module,exports){
"use strict";

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

/**
 * math.js
 * https://github.com/josdejong/mathjs
 *
 * Math.js is an extensive math library for JavaScript and Node.js,
 * It features real and complex numbers, units, matrices, a large set of
 * mathematical functions, and a flexible expression parser.
 *
 * @version 3.8.0
 * @date    2016-11-18
 *
 * @license
 * Copyright (C) 2013-2016 Jos de Jong <wjosdejong@gmail.com>
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not
 * use this file except in compliance with the License. You may obtain a copy
 * of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
 * License for the specific language governing permissions and limitations under
 * the License.
 */
!function (e, t) {
  "object" == (typeof exports === "undefined" ? "undefined" : _typeof(exports)) && "object" == (typeof module === "undefined" ? "undefined" : _typeof(module)) ? module.exports = t() : "function" == typeof define && define.amd ? define([], t) : "object" == (typeof exports === "undefined" ? "undefined" : _typeof(exports)) ? exports.math = t() : e.math = t();
}(undefined, function () {
  return function (e) {
    function t(n) {
      if (r[n]) return r[n].exports;var i = r[n] = { exports: {}, id: n, loaded: !1 };return e[n].call(i.exports, i, i.exports, t), i.loaded = !0, i.exports;
    }var r = {};return t.m = e, t.c = r, t.p = "", t(0);
  }([function (e, t, r) {
    function n(e) {
      var t = i.create(e);return t.create = n, t["import"](r(13)), t;
    }var i = r(1);e.exports = n();
  }, function (e, t, r) {
    e.exports = r(2);
  }, function (e, t, r) {
    var n = r(3).isFactory,
        i = (r(3).deepExtend, r(4)),
        a = r(8),
        o = r(10),
        s = r(12);t.create = function (e) {
      function t(e) {
        if (!n(e)) throw new Error("Factory object with properties `type`, `name`, and `factory` expected");var i,
            a = r.indexOf(e);return -1 === a ? (i = e.math === !0 ? e.factory(c.type, f, t, c.typed, c) : e.factory(c.type, f, t, c.typed), r.push(e), u.push(i)) : i = u[a], i;
      }if ("function" != typeof Object.create) throw new Error("ES5 not supported by this JavaScript engine. Please load the es5-shim and es5-sham library for compatibility.");var r = [],
          u = [],
          c = a.mixin({});c.type = {}, c.expression = { transform: Object.create(c) }, c.typed = i.create(c.type);var f = { epsilon: 1e-12, matrix: "Matrix", number: "number", precision: 64, predictable: !1 };return c["import"] = t(o), c.config = t(s), e && c.config(e), c;
    };
  }, function (e, t) {
    "use strict";
    t.clone = function r(e) {
      var t = typeof e === "undefined" ? "undefined" : _typeof(e);if ("number" === t || "string" === t || "boolean" === t || null === e || void 0 === e) return e;if ("function" == typeof e.clone) return e.clone();if (Array.isArray(e)) return e.map(function (e) {
        return r(e);
      });if (e instanceof Number) return new Number(e.valueOf());if (e instanceof String) return new String(e.valueOf());if (e instanceof Boolean) return new Boolean(e.valueOf());if (e instanceof Date) return new Date(e.valueOf());if (e && e.isBigNumber === !0) return e;if (e instanceof RegExp) throw new TypeError("Cannot clone " + e);var n = {};for (var i in e) {
        e.hasOwnProperty(i) && (n[i] = r(e[i]));
      }return n;
    }, t.extend = function (e, t) {
      for (var r in t) {
        t.hasOwnProperty(r) && (e[r] = t[r]);
      }return e;
    }, t.deepExtend = function n(e, t) {
      if (Array.isArray(t)) throw new TypeError("Arrays are not supported by deepExtend");for (var r in t) {
        if (t.hasOwnProperty(r)) if (t[r] && t[r].constructor === Object) void 0 === e[r] && (e[r] = {}), e[r].constructor === Object ? n(e[r], t[r]) : e[r] = t[r];else {
          if (Array.isArray(t[r])) throw new TypeError("Arrays are not supported by deepExtend");e[r] = t[r];
        }
      }return e;
    }, t.deepEqual = function (e, r) {
      var n, i, a;if (Array.isArray(e)) {
        if (!Array.isArray(r)) return !1;if (e.length != r.length) return !1;for (i = 0, a = e.length; a > i; i++) {
          if (!t.deepEqual(e[i], r[i])) return !1;
        }return !0;
      }if (e instanceof Object) {
        if (Array.isArray(r) || !(r instanceof Object)) return !1;for (n in e) {
          if (!t.deepEqual(e[n], r[n])) return !1;
        }for (n in r) {
          if (!t.deepEqual(e[n], r[n])) return !1;
        }return !0;
      }return (typeof e === "undefined" ? "undefined" : _typeof(e)) == (typeof r === "undefined" ? "undefined" : _typeof(r)) && e == r;
    }, t.canDefineProperty = function () {
      try {
        if (Object.defineProperty) return Object.defineProperty({}, "x", { get: function get() {} }), !0;
      } catch (e) {}return !1;
    }, t.lazy = function (e, r, n) {
      if (t.canDefineProperty()) {
        var i,
            a = !0;Object.defineProperty(e, r, { get: function get() {
            return a && (i = n(), a = !1), i;
          }, set: function set(e) {
            i = e, a = !1;
          }, configurable: !0, enumerable: !0 });
      } else e[r] = n();
    }, t.traverse = function (e, t) {
      var r = e;if (t) for (var n = t.split("."), i = 0; i < n.length; i++) {
        var a = n[i];a in r || (r[a] = {}), r = r[a];
      }return r;
    }, t.isFactory = function (e) {
      return e && "function" == typeof e.factory;
    };
  }, function (e, t, r) {
    var n = r(5),
        i = r(6).digits,
        _a = function a() {
      return _a = n.create, n;
    };t.create = function (e) {
      var t = _a();return t.types = [{ name: "number", test: function test(e) {
          return "number" == typeof e;
        } }, { name: "Complex", test: function test(e) {
          return e && e.isComplex;
        } }, { name: "BigNumber", test: function test(e) {
          return e && e.isBigNumber;
        } }, { name: "Fraction", test: function test(e) {
          return e && e.isFraction;
        } }, { name: "Unit", test: function test(e) {
          return e && e.isUnit;
        } }, { name: "string", test: function test(e) {
          return "string" == typeof e;
        } }, { name: "Array", test: Array.isArray }, { name: "Matrix", test: function test(e) {
          return e && e.isMatrix;
        } }, { name: "DenseMatrix", test: function test(e) {
          return e && e.isDenseMatrix;
        } }, { name: "SparseMatrix", test: function test(e) {
          return e && e.isSparseMatrix;
        } }, { name: "ImmutableDenseMatrix", test: function test(e) {
          return e && e.isImmutableDenseMatrix;
        } }, { name: "Range", test: function test(e) {
          return e && e.isRange;
        } }, { name: "Index", test: function test(e) {
          return e && e.isIndex;
        } }, { name: "boolean", test: function test(e) {
          return "boolean" == typeof e;
        } }, { name: "ResultSet", test: function test(e) {
          return e && e.isResultSet;
        } }, { name: "Help", test: function test(e) {
          return e && e.isHelp;
        } }, { name: "function", test: function test(e) {
          return "function" == typeof e;
        } }, { name: "Date", test: function test(e) {
          return e instanceof Date;
        } }, { name: "RegExp", test: function test(e) {
          return e instanceof RegExp;
        } }, { name: "Object", test: function test(e) {
          return "object" == (typeof e === "undefined" ? "undefined" : _typeof(e));
        } }, { name: "null", test: function test(e) {
          return null === e;
        } }, { name: "undefined", test: function test(e) {
          return void 0 === e;
        } }], t.conversions = [{ from: "number", to: "BigNumber", convert: function convert(t) {
          if (i(t) > 15) throw new TypeError("Cannot implicitly convert a number with >15 significant digits to BigNumber (value: " + t + "). Use function bignumber(x) to convert to BigNumber.");return new e.BigNumber(t);
        } }, { from: "number", to: "Complex", convert: function convert(t) {
          return new e.Complex(t, 0);
        } }, { from: "number", to: "string", convert: function convert(e) {
          return e + "";
        } }, { from: "BigNumber", to: "Complex", convert: function convert(t) {
          return new e.Complex(t.toNumber(), 0);
        } }, { from: "Fraction", to: "BigNumber", convert: function convert(e) {
          throw new TypeError("Cannot implicitly convert a Fraction to BigNumber or vice versa. Use function bignumber(x) to convert to BigNumber or fraction(x) to convert to Fraction.");
        } }, { from: "Fraction", to: "Complex", convert: function convert(t) {
          return new e.Complex(t.valueOf(), 0);
        } }, { from: "number", to: "Fraction", convert: function convert(t) {
          if (i(t) > 15) throw new TypeError("Cannot implicitly convert a number with >15 significant digits to Fraction (value: " + t + "). Use function fraction(x) to convert to Fraction.");return new e.Fraction(t);
        } }, { from: "string", to: "number", convert: function convert(e) {
          var t = Number(e);if (isNaN(t)) throw new Error('Cannot convert "' + e + '" to a number');return t;
        } }, { from: "boolean", to: "number", convert: function convert(e) {
          return +e;
        } }, { from: "boolean", to: "BigNumber", convert: function convert(t) {
          return new e.BigNumber(+t);
        } }, { from: "boolean", to: "Fraction", convert: function convert(t) {
          return new e.Fraction(+t);
        } }, { from: "boolean", to: "string", convert: function convert(e) {
          return +e;
        } }, { from: "null", to: "number", convert: function convert() {
          return 0;
        } }, { from: "null", to: "string", convert: function convert() {
          return "null";
        } }, { from: "null", to: "BigNumber", convert: function convert() {
          return new e.BigNumber(0);
        } }, { from: "null", to: "Fraction", convert: function convert() {
          return new e.Fraction(0);
        } }, { from: "Array", to: "Matrix", convert: function convert(t) {
          return new e.DenseMatrix(t);
        } }, { from: "Matrix", to: "Array", convert: function convert(e) {
          return e.valueOf();
        } }], t;
    };
  }, function (e, t, r) {
    var n, i, a;!function (r, o) {
      i = [], n = o, a = "function" == typeof n ? n.apply(t, i) : n, !(void 0 !== a && (e.exports = a));
    }(this, function () {
      function e() {
        function t(e) {
          for (var t, r = 0; r < M.types.length; r++) {
            var n = M.types[r];if (n.name === e) {
              t = n.test;break;
            }
          }if (!t) {
            var i;for (r = 0; r < M.types.length; r++) {
              if (n = M.types[r], n.name.toLowerCase() == e.toLowerCase()) {
                i = n.name;break;
              }
            }throw new Error('Unknown type "' + e + '"' + (i ? '. Did you mean "' + i + '"?' : ""));
          }return t;
        }function r(e) {
          for (var t = "", r = 0; r < e.length; r++) {
            var n = e[r];if (n.signatures && "" != n.name) if ("" == t) t = n.name;else if (t != n.name) {
              var i = new Error("Function names do not match (expected: " + t + ", actual: " + n.name + ")");throw i.data = { actual: n.name, expected: t }, i;
            }
          }return t;
        }function n(e, t, r, n, i) {
          var a,
              o = d(n),
              s = i ? i.split(",") : null,
              u = e || "unnamed",
              c = s && g(s, "any"),
              f = { fn: e, index: r, actual: n, expected: s };a = s ? t > r && !c ? "Unexpected type of argument in function " + u + " (expected: " + s.join(" or ") + ", actual: " + o + ", index: " + r + ")" : "Too few arguments in function " + u + " (expected: " + s.join(" or ") + ", index: " + r + ")" : "Too many arguments in function " + u + " (expected: " + r + ", actual: " + t + ")";var l = new TypeError(a);return l.data = f, l;
        }function i(e) {
          this.name = e || "refs", this.categories = {};
        }function a(e, t) {
          if ("string" == typeof e) {
            var r = e.trim(),
                n = "..." === r.substr(0, 3);if (n && (r = r.substr(3)), "" === r) this.types = ["any"];else {
              this.types = r.split("|");for (var i = 0; i < this.types.length; i++) {
                this.types[i] = this.types[i].trim();
              }
            }
          } else {
            if (!Array.isArray(e)) {
              if (e instanceof a) return e.clone();throw new Error("String or Array expected");
            }this.types = e;
          }this.conversions = [], this.varArgs = n || t || !1, this.anyType = -1 !== this.types.indexOf("any");
        }function o(e, t) {
          var r;if ("string" == typeof e) r = "" !== e ? e.split(",") : [];else {
            if (!Array.isArray(e)) throw new Error("string or Array expected");r = e;
          }this.params = new Array(r.length), this.anyType = !1, this.varArgs = !1;for (var n = 0; n < r.length; n++) {
            var i = new a(r[n]);if (this.params[n] = i, i.anyType && (this.anyType = !0), n === r.length - 1) this.varArgs = i.varArgs;else if (i.varArgs) throw new SyntaxError('Unexpected variable arguments operator "..."');
          }this.fn = t;
        }function s(e, t, r, n) {
          this.path = e || [], this.param = e[e.length - 1] || null, this.signature = t || null, this.childs = r || [], this.fallThrough = n || !1;
        }function u(e) {
          var t,
              r,
              n = {},
              i = [];for (var a in e) {
            if (e.hasOwnProperty(a)) {
              var s = e[a];if (t = new o(a, s), t.ignore()) continue;var u = t.expand();for (r = 0; r < u.length; r++) {
                var c = u[r],
                    f = c.toString(),
                    l = n[f];if (l) {
                  var p = o.compare(c, l);if (0 > p) n[f] = c;else if (0 === p) throw new Error('Signature "' + f + '" is defined twice');
                } else n[f] = c;
              }
            }
          }for (f in n) {
            n.hasOwnProperty(f) && i.push(n[f]);
          }for (i.sort(function (e, t) {
            return o.compare(e, t);
          }), r = 0; r < i.length; r++) {
            if (t = i[r], t.varArgs) for (var h = t.params.length - 1, m = t.params[h], d = 0; d < m.types.length;) {
              if (m.conversions[d]) for (var v = m.types[d], y = 0; y < i.length; y++) {
                var x = i[y],
                    b = x.params[h];if (x !== t && b && g(b.types, v) && !b.conversions[h]) {
                  m.types.splice(d, 1), m.conversions.splice(d, 1), d--;break;
                }
              }d++;
            }
          }return i;
        }function c(e) {
          for (var t = [], r = 0; r < e.length; r++) {
            e[r].anyType && t.push(e[r]);
          }return t;
        }function f(e) {
          for (var t = {}, r = 0; r < e.length; r++) {
            var n = e[r];if (n.fn && !n.hasConversions()) {
              var i = n.params.join(",");t[i] = n.fn;
            }
          }return t;
        }function l(e, t, r) {
          var n,
              i,
              o,
              u = t.length,
              c = [];for (n = 0; n < e.length; n++) {
            i = e[n], i.params.length !== u || o || (o = i), void 0 != i.params[u] && c.push(i);
          }c.sort(function (e, t) {
            return a.compare(e.params[u], t.params[u]);
          });var f = [];for (n = 0; n < c.length; n++) {
            i = c[n];var p = i.params[u],
                h = f.filter(function (e) {
              return e.param.overlapping(p);
            })[0];if (h) {
              if (h.param.varArgs) throw new Error('Conflicting types "' + h.param + '" and "' + p + '"');h.signatures.push(i);
            } else f.push({ param: p, signatures: [i] });
          }var m = [];for (n = 0; n < r.length; n++) {
            r[n].paramsStartWith(t) && m.push(r[n]);
          }var d = !1;for (n = 0; n < m.length; n++) {
            if (!g(e, m[n])) {
              d = !0;break;
            }
          }var v = new Array(f.length);for (n = 0; n < f.length; n++) {
            var y = f[n];v[n] = l(y.signatures, t.concat(y.param), m);
          }return new s(t, o, v, d);
        }function p(e) {
          for (var t = [], r = 0; e > r; r++) {
            t[r] = "arg" + r;
          }return t;
        }function h(e, t) {
          var r = new i(),
              a = u(t);if (0 == a.length) throw new Error("No signatures provided");var o = c(a),
              s = l(a, [], o),
              h = [],
              d = e || "",
              g = p(m(a));h.push("function " + d + "(" + g.join(", ") + ") {"), h.push('  "use strict";'), h.push("  var name = '" + d + "';"), h.push(s.toCode(r, "  ", !1)), h.push("}");var v = [r.toCode(), "return " + h.join("\n")].join("\n"),
              y = new Function(r.name, "createError", v),
              x = y(r, n);return x.signatures = f(a), x;
        }function m(e) {
          for (var t = 0, r = 0; r < e.length; r++) {
            var n = e[r].params.length;n > t && (t = n);
          }return t;
        }function d(e) {
          for (var t, r = 0; r < M.types.length; r++) {
            var n = M.types[r];if ("Object" === n.name) t = n;else if (n.test(e)) return n.name;
          }return t && t.test(e) ? t.name : "unknown";
        }function g(e, t) {
          return -1 !== e.indexOf(t);
        }function v(e) {
          return e[e.length - 1];
        }function y(e, t) {
          if (!e.signatures) throw new TypeError("Function is no typed-function");var r;if ("string" == typeof t) {
            r = t.split(",");for (var n = 0; n < r.length; n++) {
              r[n] = r[n].trim();
            }
          } else {
            if (!Array.isArray(t)) throw new TypeError("String array or a comma separated string expected");r = t;
          }var i = r.join(","),
              a = e.signatures[i];if (a) return a;throw new TypeError("Signature not found (signature: " + (e.name || "unnamed") + "(" + r.join(", ") + "))");
        }function x(e, t) {
          var r = d(e);if (t === r) return e;for (var n = 0; n < M.conversions.length; n++) {
            var i = M.conversions[n];if (i.from === r && i.to === t) return i.convert(e);
          }throw new Error("Cannot convert from " + r + " to " + t);
        }i.prototype.add = function (e, t) {
          var r = t || "fn";this.categories[r] || (this.categories[r] = []);var n = this.categories[r].indexOf(e);return -1 == n && (n = this.categories[r].length, this.categories[r].push(e)), r + n;
        }, i.prototype.toCode = function () {
          var e = [],
              t = this.name + ".categories",
              r = this.categories;for (var n in r) {
            if (r.hasOwnProperty(n)) for (var i = r[n], a = 0; a < i.length; a++) {
              e.push("var " + n + a + " = " + t + "['" + n + "'][" + a + "];");
            }
          }return e.join("\n");
        }, a.compare = function (e, t) {
          if (e.anyType) return 1;if (t.anyType) return -1;if (g(e.types, "Object")) return 1;if (g(t.types, "Object")) return -1;if (e.hasConversions()) {
            if (t.hasConversions()) {
              var r, n, i;for (r = 0; r < e.conversions.length; r++) {
                if (void 0 !== e.conversions[r]) {
                  n = e.conversions[r];break;
                }
              }for (r = 0; r < t.conversions.length; r++) {
                if (void 0 !== t.conversions[r]) {
                  i = t.conversions[r];break;
                }
              }return M.conversions.indexOf(n) - M.conversions.indexOf(i);
            }return 1;
          }if (t.hasConversions()) return -1;var a, o;for (r = 0; r < M.types.length; r++) {
            if (M.types[r].name === e.types[0]) {
              a = r;break;
            }
          }for (r = 0; r < M.types.length; r++) {
            if (M.types[r].name === t.types[0]) {
              o = r;break;
            }
          }return a - o;
        }, a.prototype.overlapping = function (e) {
          for (var t = 0; t < this.types.length; t++) {
            if (g(e.types, this.types[t])) return !0;
          }return !1;
        }, a.prototype.matches = function (e) {
          return this.anyType || e.anyType || this.overlapping(e);
        }, a.prototype.clone = function () {
          var e = new a(this.types.slice(), this.varArgs);return e.conversions = this.conversions.slice(), e;
        }, a.prototype.hasConversions = function () {
          return this.conversions.length > 0;
        }, a.prototype.contains = function (e) {
          for (var t = 0; t < this.types.length; t++) {
            if (e[this.types[t]]) return !0;
          }return !1;
        }, a.prototype.toString = function (e) {
          for (var t = [], r = {}, n = 0; n < this.types.length; n++) {
            var i = this.conversions[n],
                a = e && i ? i.to : this.types[n];a in r || (r[a] = !0, t.push(a));
          }return (this.varArgs ? "..." : "") + t.join("|");
        }, o.prototype.clone = function () {
          return new o(this.params.slice(), this.fn);
        }, o.prototype.expand = function () {
          function e(r, n) {
            if (n.length < r.params.length) {
              var i,
                  s,
                  u,
                  c = r.params[n.length];if (c.varArgs) {
                for (s = c.clone(), i = 0; i < M.conversions.length; i++) {
                  if (u = M.conversions[i], !g(c.types, u.from) && g(c.types, u.to)) {
                    var f = s.types.length;s.types[f] = u.from, s.conversions[f] = u;
                  }
                }e(r, n.concat(s));
              } else {
                for (i = 0; i < c.types.length; i++) {
                  e(r, n.concat(new a(c.types[i])));
                }for (i = 0; i < M.conversions.length; i++) {
                  u = M.conversions[i], !g(c.types, u.from) && g(c.types, u.to) && (s = new a(u.from), s.conversions[0] = u, e(r, n.concat(s)));
                }
              }
            } else t.push(new o(n, r.fn));
          }var t = [];return e(this, []), t;
        }, o.compare = function (e, t) {
          if (e.params.length > t.params.length) return 1;if (e.params.length < t.params.length) return -1;var r,
              n = e.params.length,
              i = 0,
              o = 0;for (r = 0; n > r; r++) {
            e.params[r].hasConversions() && i++, t.params[r].hasConversions() && o++;
          }if (i > o) return 1;if (o > i) return -1;for (r = 0; r < e.params.length; r++) {
            var s = a.compare(e.params[r], t.params[r]);if (0 !== s) return s;
          }return 0;
        }, o.prototype.hasConversions = function () {
          for (var e = 0; e < this.params.length; e++) {
            if (this.params[e].hasConversions()) return !0;
          }return !1;
        }, o.prototype.ignore = function () {
          for (var e = {}, t = 0; t < M.ignore.length; t++) {
            e[M.ignore[t]] = !0;
          }for (t = 0; t < this.params.length; t++) {
            if (this.params[t].contains(e)) return !0;
          }return !1;
        }, o.prototype.paramsStartWith = function (e) {
          if (0 === e.length) return !0;for (var t = v(this.params), r = v(e), n = 0; n < e.length; n++) {
            var i = this.params[n] || (t.varArgs ? t : null),
                a = e[n] || (r.varArgs ? r : null);if (!i || !a || !i.matches(a)) return !1;
          }return !0;
        }, o.prototype.toCode = function (e, t) {
          for (var r = [], n = new Array(this.params.length), i = 0; i < this.params.length; i++) {
            var a = this.params[i],
                o = a.conversions[0];a.varArgs ? n[i] = "varArgs" : o ? n[i] = e.add(o.convert, "convert") + "(arg" + i + ")" : n[i] = "arg" + i;
          }var s = this.fn ? e.add(this.fn, "signature") : void 0;return s ? t + "return " + s + "(" + n.join(", ") + "); // signature: " + this.params.join(", ") : r.join("\n");
        }, o.prototype.toString = function () {
          return this.params.join(", ");
        }, s.prototype.toCode = function (e, r) {
          var n = [];if (this.param) {
            var i = this.path.length - 1,
                a = this.param.conversions[0],
                o = "// type: " + (a ? a.from + " (convert to " + a.to + ")" : this.param);if (this.param.varArgs) {
              if (this.param.anyType) n.push(r + "if (arguments.length > " + i + ") {"), n.push(r + "  var varArgs = [];"), n.push(r + "  for (var i = " + i + "; i < arguments.length; i++) {"), n.push(r + "    varArgs.push(arguments[i]);"), n.push(r + "  }"), n.push(this.signature.toCode(e, r + "  ")), n.push(r + "}");else {
                for (var s = function (r, n) {
                  for (var i = [], a = 0; a < r.length; a++) {
                    i[a] = e.add(t(r[a]), "test") + "(" + n + ")";
                  }return i.join(" || ");
                }.bind(this), u = this.param.types, c = [], f = 0; f < u.length; f++) {
                  void 0 === this.param.conversions[f] && c.push(u[f]);
                }n.push(r + "if (" + s(u, "arg" + i) + ") { " + o), n.push(r + "  var varArgs = [arg" + i + "];"), n.push(r + "  for (var i = " + (i + 1) + "; i < arguments.length; i++) {"), n.push(r + "    if (" + s(c, "arguments[i]") + ") {"), n.push(r + "      varArgs.push(arguments[i]);");for (var f = 0; f < u.length; f++) {
                  var l = this.param.conversions[f];if (l) {
                    var p = e.add(t(u[f]), "test"),
                        h = e.add(l.convert, "convert");n.push(r + "    }"), n.push(r + "    else if (" + p + "(arguments[i])) {"), n.push(r + "      varArgs.push(" + h + "(arguments[i]));");
                  }
                }n.push(r + "    } else {"), n.push(r + "      throw createError(name, arguments.length, i, arguments[i], '" + c.join(",") + "');"), n.push(r + "    }"), n.push(r + "  }"), n.push(this.signature.toCode(e, r + "  ")), n.push(r + "}");
              }
            } else if (this.param.anyType) n.push(r + "// type: any"), n.push(this._innerCode(e, r));else {
              var m = this.param.types[0],
                  p = "any" !== m ? e.add(t(m), "test") : null;n.push(r + "if (" + p + "(arg" + i + ")) { " + o), n.push(this._innerCode(e, r + "  ")), n.push(r + "}");
            }
          } else n.push(this._innerCode(e, r));return n.join("\n");
        }, s.prototype._innerCode = function (e, t) {
          var r,
              n = [];for (this.signature && (n.push(t + "if (arguments.length === " + this.path.length + ") {"), n.push(this.signature.toCode(e, t + "  ")), n.push(t + "}")), r = 0; r < this.childs.length; r++) {
            n.push(this.childs[r].toCode(e, t));
          }if (!this.fallThrough || this.param && this.param.anyType) {
            var i = this._exceptions(e, t);i && n.push(i);
          }return n.join("\n");
        }, s.prototype._exceptions = function (e, t) {
          var r = this.path.length;if (0 === this.childs.length) return [t + "if (arguments.length > " + r + ") {", t + "  throw createError(name, arguments.length, " + r + ", arguments[" + r + "]);", t + "}"].join("\n");for (var n = {}, i = [], a = 0; a < this.childs.length; a++) {
            var o = this.childs[a];if (o.param) for (var s = 0; s < o.param.types.length; s++) {
              var u = o.param.types[s];u in n || o.param.conversions[s] || (n[u] = !0, i.push(u));
            }
          }return t + "throw createError(name, arguments.length, " + r + ", arguments[" + r + "], '" + i.join(",") + "');";
        };var b = [{ name: "number", test: function test(e) {
            return "number" == typeof e;
          } }, { name: "string", test: function test(e) {
            return "string" == typeof e;
          } }, { name: "boolean", test: function test(e) {
            return "boolean" == typeof e;
          } }, { name: "Function", test: function test(e) {
            return "function" == typeof e;
          } }, { name: "Array", test: Array.isArray }, { name: "Date", test: function test(e) {
            return e instanceof Date;
          } }, { name: "RegExp", test: function test(e) {
            return e instanceof RegExp;
          } }, { name: "Object", test: function test(e) {
            return "object" == (typeof e === "undefined" ? "undefined" : _typeof(e));
          } }, { name: "null", test: function test(e) {
            return null === e;
          } }, { name: "undefined", test: function test(e) {
            return void 0 === e;
          } }],
            w = {},
            N = [],
            E = [],
            M = { config: w, types: b, conversions: N, ignore: E };return M = h("typed", { Object: function Object(e) {
            var t = [];for (var n in e) {
              e.hasOwnProperty(n) && t.push(e[n]);
            }var i = r(t);return h(i, e);
          }, "string, Object": h, "...Function": function Function(e) {
            for (var t, n = r(e), i = {}, a = 0; a < e.length; a++) {
              var o = e[a];if ("object" != _typeof(o.signatures)) throw t = new TypeError("Function is no typed-function (index: " + a + ")"), t.data = { index: a }, t;for (var s in o.signatures) {
                if (o.signatures.hasOwnProperty(s)) if (i.hasOwnProperty(s)) {
                  if (o.signatures[s] !== i[s]) throw t = new Error('Signature "' + s + '" is defined twice'), t.data = { signature: s }, t;
                } else i[s] = o.signatures[s];
              }
            }return h(n, i);
          } }), M.config = w, M.types = b, M.conversions = N, M.ignore = E, M.create = e, M.find = y, M.convert = x, M.addType = function (e) {
          if (!e || "string" != typeof e.name || "function" != typeof e.test) throw new TypeError("Object with properties {name: string, test: function} expected");M.types.push(e);
        }, M.addConversion = function (e) {
          if (!e || "string" != typeof e.from || "string" != typeof e.to || "function" != typeof e.convert) throw new TypeError("Object with properties {from: string, to: string, convert: function} expected");M.conversions.push(e);
        }, M;
      }return e();
    });
  }, function (e, t, r) {
    "use strict";
    var n = r(7);t.isNumber = function (e) {
      return "number" == typeof e;
    }, t.isInteger = function (e) {
      return isFinite(e) ? e == Math.round(e) : !1;
    }, t.sign = Math.sign || function (e) {
      return e > 0 ? 1 : 0 > e ? -1 : 0;
    }, t.format = function (e, r) {
      if ("function" == typeof r) return r(e);if (e === 1 / 0) return "Infinity";if (e === -(1 / 0)) return "-Infinity";if (isNaN(e)) return "NaN";var n = "auto",
          i = void 0;switch (r && (r.notation && (n = r.notation), t.isNumber(r) ? i = r : r.precision && (i = r.precision)), n) {case "fixed":
          return t.toFixed(e, i);case "exponential":
          return t.toExponential(e, i);case "engineering":
          return t.toEngineering(e, i);case "auto":
          return t.toPrecision(e, i, r && r.exponential).replace(/((\.\d*?)(0+))($|e)/, function () {
            var e = arguments[2],
                t = arguments[4];return "." !== e ? e + t : t;
          });default:
          throw new Error('Unknown notation "' + n + '". Choose "auto", "exponential", or "fixed".');}
    }, t.toExponential = function (e, t) {
      return new n(e).toExponential(t);
    }, t.toEngineering = function (e, t) {
      return new n(e).toEngineering(t);
    }, t.toFixed = function (e, t) {
      return new n(e).toFixed(t);
    }, t.toPrecision = function (e, t, r) {
      return new n(e).toPrecision(t, r);
    }, t.digits = function (e) {
      return e.toExponential().replace(/e.*$/, "").replace(/^0\.?0*|\./, "").length;
    }, t.DBL_EPSILON = Number.EPSILON || 2.220446049250313e-16, t.nearlyEqual = function (e, r, n) {
      if (null == n) return e == r;if (e == r) return !0;if (isNaN(e) || isNaN(r)) return !1;if (isFinite(e) && isFinite(r)) {
        var i = Math.abs(e - r);return i < t.DBL_EPSILON ? !0 : i <= Math.max(Math.abs(e), Math.abs(r)) * n;
      }return !1;
    };
  }, function (e, t) {
    "use strict";
    function r(e) {
      var t = String(e).toLowerCase().match(/^0*?(-?)(\d+\.?\d*)(e([+-]?\d+))?$/);if (!t) throw new SyntaxError("Invalid number");var r = t[1],
          n = t[2],
          i = parseFloat(t[4] || "0"),
          a = n.indexOf(".");i += -1 !== a ? a - 1 : n.length - 1, this.sign = r, this.coefficients = n.replace(".", "").replace(/^0*/, function (e) {
        return i -= e.length, "";
      }).replace(/0*$/, "").split("").map(function (e) {
        return parseInt(e);
      }), 0 === this.coefficients.length && (this.coefficients.push(0), i++), this.exponent = i;
    }function n(e) {
      for (var t = [], r = 0; e > r; r++) {
        t.push(0);
      }return t;
    }r.prototype.toEngineering = function (e) {
      var t = this.roundDigits(e),
          r = t.exponent,
          i = t.coefficients,
          a = r % 3 === 0 ? r : 0 > r ? r - 3 - r % 3 : r - r % 3,
          o = r >= 0 ? r : Math.abs(a);i.length - 1 < o && (i = i.concat(n(o - (i.length - 1))));for (var s = Math.abs(r - a), u = 1, c = ""; --s >= 0;) {
        u++;
      }var f = i.slice(u).join(""),
          l = f.match(/[1-9]/) ? "." + f : "";return c = i.slice(0, u).join("") + l, c += "e" + (r >= 0 ? "+" : "") + a.toString(), t.sign + c;
    }, r.prototype.toFixed = function (e) {
      var t = this.roundDigits(this.exponent + 1 + (e || 0)),
          r = t.coefficients,
          i = t.exponent + 1,
          a = i + (e || 0);return r.length < a && (r = r.concat(n(a - r.length))), 0 > i && (r = n(-i + 1).concat(r), i = 1), e && r.splice(i, 0, 0 === i ? "0." : "."), this.sign + r.join("");
    }, r.prototype.toExponential = function (e) {
      var t = e ? this.roundDigits(e) : this.clone(),
          r = t.coefficients,
          i = t.exponent;r.length < e && (r = r.concat(n(e - r.length)));var a = r.shift();return this.sign + a + (r.length > 0 ? "." + r.join("") : "") + "e" + (i >= 0 ? "+" : "") + i;
    }, r.prototype.toPrecision = function (e, t) {
      var r = t && void 0 !== t.lower ? t.lower : .001,
          i = t && void 0 !== t.upper ? t.upper : 1e5,
          a = Math.abs(Math.pow(10, this.exponent));if (r > a || a >= i) return this.toExponential(e);var o = e ? this.roundDigits(e) : this.clone(),
          s = o.coefficients,
          u = o.exponent;s.length < e && (s = s.concat(n(e - s.length))), s = s.concat(n(u - s.length + 1 + (s.length < e ? e - s.length : 0))), s = n(-u).concat(s);var c = u > 0 ? u : 0;return c < s.length - 1 && s.splice(c + 1, 0, "."), this.sign + s.join("");
    }, r.prototype.clone = function () {
      var e = new r("0");return e.sign = this.sign, e.coefficients = this.coefficients.slice(0), e.exponent = this.exponent, e;
    }, r.prototype.roundDigits = function (e) {
      for (var t = this.clone(), r = t.coefficients; 0 >= e;) {
        r.unshift(0), t.exponent++, e++;
      }if (r.length > e) {
        var n = r.splice(e, r.length - e);if (n[0] >= 5) {
          var i = e - 1;for (r[i]++; 10 === r[i];) {
            r.pop(), 0 === i && (r.unshift(0), t.exponent++, i++), i--, r[i]++;
          }
        }
      }return t;
    }, e.exports = r;
  }, function (e, t, r) {
    var n = r(9);t.mixin = function (e) {
      var t = new n();return e.on = t.on.bind(t), e.off = t.off.bind(t), e.once = t.once.bind(t), e.emit = t.emit.bind(t), e;
    };
  }, function (e, t) {
    function r() {}r.prototype = { on: function on(e, t, r) {
        var n = this.e || (this.e = {});return (n[e] || (n[e] = [])).push({ fn: t, ctx: r }), this;
      }, once: function once(e, t, r) {
        function n() {
          i.off(e, n), t.apply(r, arguments);
        }var i = this;return n._ = t, this.on(e, n, r);
      }, emit: function emit(e) {
        var t = [].slice.call(arguments, 1),
            r = ((this.e || (this.e = {}))[e] || []).slice(),
            n = 0,
            i = r.length;for (n; i > n; n++) {
          r[n].fn.apply(r[n].ctx, t);
        }return this;
      }, off: function off(e, t) {
        var r = this.e || (this.e = {}),
            n = r[e],
            i = [];if (n && t) for (var a = 0, o = n.length; o > a; a++) {
          n[a].fn !== t && n[a].fn._ !== t && i.push(n[a]);
        }return i.length ? r[e] = i : delete r[e], this;
      } }, e.exports = r;
  }, function (e, t, r) {
    "use strict";
    function n(e, t, r, n, u) {
      function c(e, t) {
        var r = arguments.length;if (1 != r && 2 != r) throw new s("import", r, 1, 2);if (t || (t = {}), a(e)) h(e, t);else if (Array.isArray(e)) e.forEach(function (e) {
          c(e, t);
        });else if ("object" == (typeof e === "undefined" ? "undefined" : _typeof(e))) {
          for (var n in e) {
            if (e.hasOwnProperty(n)) {
              var i = e[n];m(i) ? f(n, i, t) : a(e) ? h(e, t) : c(i, t);
            }
          }
        } else if (!t.silent) throw new TypeError("Factory, Object, or Array expected");
      }function f(e, t, r) {
        if (r.wrap && "function" == typeof t && (t = p(t)), d(u[e]) && d(t)) return t = r.override ? n(e, t.signatures) : n(u[e], t), u[e] = t, l(e, t), void u.emit("import", e, function () {
          return t;
        });if (void 0 === u[e] || r.override) return u[e] = t, l(e, t), void u.emit("import", e, function () {
          return t;
        });if (!r.silent) throw new Error('Cannot import "' + e + '": already exists');
      }function l(e, t) {
        t && "function" == typeof t.transform && (u.expression.transform[e] = t.transform);
      }function p(e) {
        var t = function t() {
          for (var t = [], r = 0, n = arguments.length; n > r; r++) {
            var i = arguments[r];t[r] = i && i.valueOf();
          }return e.apply(u, t);
        };return e.transform && (t.transform = e.transform), t;
      }function h(e, t) {
        if ("string" == typeof e.name) {
          var a = e.name,
              s = e.path ? o(u, e.path) : u,
              c = s.hasOwnProperty(a) ? s[a] : void 0,
              f = function f() {
            var i = r(e);if (d(c) && d(i)) return t.override || (i = n(c, i)), i;if (void 0 === c || t.override) return i;if (!t.silent) throw new Error('Cannot import "' + a + '": already exists');
          };e.lazy !== !1 ? i(s, a, f) : s[a] = f(), u.emit("import", a, f, e.path);
        } else r(e);
      }function m(e) {
        return "function" == typeof e || "number" == typeof e || "string" == typeof e || "boolean" == typeof e || null === e || e && e.isUnit === !0 || e && e.isComplex === !0 || e && e.isBigNumber === !0 || e && e.isFraction === !0 || e && e.isMatrix === !0 || e && Array.isArray(e) === !0;
      }function d(e) {
        return "function" == typeof e && "object" == _typeof(e.signatures);
      }return c;
    }var i = r(3).lazy,
        a = r(3).isFactory,
        o = r(3).traverse,
        s = (r(3).extend, r(11));t.math = !0, t.name = "import", t.factory = n, t.lazy = !0;
  }, function (e, t) {
    "use strict";
    function r(e, t, n, i) {
      if (!(this instanceof r)) throw new SyntaxError("Constructor must be called with the new operator");this.fn = e, this.count = t, this.min = n, this.max = i, this.message = "Wrong number of arguments in function " + e + " (" + t + " provided, " + n + (void 0 != i ? "-" + i : "") + " expected)", this.stack = new Error().stack;
    }r.prototype = new Error(), r.prototype.constructor = Error, r.prototype.name = "ArgumentsError", r.prototype.isArgumentsError = !0, e.exports = r;
  }, function (e, t, r) {
    "use strict";
    function n(e, t, r, n, i) {
      function a(e) {
        if (e) {
          var r = s.clone(t);o(e, "matrix", u), o(e, "number", c), s.deepExtend(t, e);var n = s.clone(t);return i.emit("config", n, r), n;
        }return s.clone(t);
      }var u = ["Matrix", "Array"],
          c = ["number", "BigNumber", "Fraction"];return a.MATRIX = u, a.NUMBER = c, a;
    }function i(e, t) {
      return -1 !== e.indexOf(t);
    }function a(e, t) {
      return e.map(function (e) {
        return e.toLowerCase();
      }).indexOf(t.toLowerCase());
    }function o(e, t, r) {
      if (void 0 !== e[t] && !i(r, e[t])) {
        var n = a(r, e[t]);-1 !== n ? (console.warn('Warning: Wrong casing for configuration option "' + t + '", should be "' + r[n] + '" instead of "' + e[t] + '".'), e[t] = r[n]) : console.warn('Warning: Unknown value "' + e[t] + '" for configuration option "' + t + '". Available options: ' + r.map(JSON.stringify).join(", ") + ".");
      }
    }var s = r(3);t.name = "config", t.math = !0, t.factory = n;
  }, function (e, t, r) {
    e.exports = [r(14), r(100), r(102), r(338), r(504), r(506)];
  }, function (e, t, r) {
    e.exports = [r(15), r(20), r(21), r(26), r(33), r(37), r(70), r(71), r(73), r(74)];
  }, function (e, t, r) {
    e.exports = [r(16), r(18)];
  }, function (e, t, r) {
    function n(e, t, r, n, a) {
      var o = i.clone({ precision: t.precision });return o.prototype.type = "BigNumber", o.prototype.isBigNumber = !0, o.prototype.toJSON = function () {
        return { mathjs: "BigNumber", value: this.toString() };
      }, o.fromJSON = function (e) {
        return new o(e.value);
      }, a.on("config", function (e, t) {
        e.precision !== t.precision && o.config({ precision: e.precision });
      }), o;
    }var i = r(17);t.name = "BigNumber", t.path = "type", t.factory = n, t.math = !0;
  }, function (e, t, r) {
    var n;!function (i) {
      "use strict";
      function a(e) {
        var t,
            r,
            n,
            i = e.length - 1,
            a = "",
            o = e[0];if (i > 0) {
          for (a += o, t = 1; i > t; t++) {
            n = e[t] + "", r = Pe - n.length, r && (a += g(r)), a += n;
          }o = e[t], n = o + "", r = Pe - n.length, r && (a += g(r));
        } else if (0 === o) return "0";for (; o % 10 === 0;) {
          o /= 10;
        }return a + o;
      }function o(e, t, r) {
        if (e !== ~~e || t > e || e > r) throw Error(Oe + e);
      }function s(e, t, r, n) {
        var i, a, o, s;for (a = e[0]; a >= 10; a /= 10) {
          --t;
        }return --t < 0 ? (t += Pe, i = 0) : (i = Math.ceil((t + 1) / Pe), t %= Pe), a = Ce(10, Pe - t), s = e[i] % a | 0, null == n ? 3 > t ? (0 == t ? s = s / 100 | 0 : 1 == t && (s = s / 10 | 0), o = 4 > r && 99999 == s || r > 3 && 49999 == s || 5e4 == s || 0 == s) : o = (4 > r && s + 1 == a || r > 3 && s + 1 == a / 2) && (e[i + 1] / a / 100 | 0) == Ce(10, t - 2) - 1 || (s == a / 2 || 0 == s) && 0 == (e[i + 1] / a / 100 | 0) : 4 > t ? (0 == t ? s = s / 1e3 | 0 : 1 == t ? s = s / 100 | 0 : 2 == t && (s = s / 10 | 0), o = (n || 4 > r) && 9999 == s || !n && r > 3 && 4999 == s) : o = ((n || 4 > r) && s + 1 == a || !n && r > 3 && s + 1 == a / 2) && (e[i + 1] / a / 1e3 | 0) == Ce(10, t - 3) - 1, o;
      }function u(e, t, r) {
        for (var n, i, a = [0], o = 0, s = e.length; s > o;) {
          for (i = a.length; i--;) {
            a[i] *= t;
          }for (a[0] += xe.indexOf(e.charAt(o++)), n = 0; n < a.length; n++) {
            a[n] > r - 1 && (void 0 === a[n + 1] && (a[n + 1] = 0), a[n + 1] += a[n] / r | 0, a[n] %= r);
          }
        }return a.reverse();
      }function c(e, t) {
        var r,
            n,
            i = t.d.length;32 > i ? (r = Math.ceil(i / 3), n = Math.pow(4, -r).toString()) : (r = 16, n = "2.3283064365386962890625e-10"), e.precision += r, t = O(e, 1, t.times(n), new e(1));for (var a = r; a--;) {
          var o = t.times(t);t = o.times(o).minus(o).times(8).plus(1);
        }return e.precision -= r, t;
      }function f(e, t, r, n) {
        var i,
            a,
            o,
            s,
            u,
            c,
            f,
            l,
            p,
            h = e.constructor;e: if (null != t) {
          if (l = e.d, !l) return e;for (i = 1, s = l[0]; s >= 10; s /= 10) {
            i++;
          }if (a = t - i, 0 > a) a += Pe, o = t, f = l[p = 0], u = f / Ce(10, i - o - 1) % 10 | 0;else if (p = Math.ceil((a + 1) / Pe), s = l.length, p >= s) {
            if (!n) break e;for (; s++ <= p;) {
              l.push(0);
            }f = u = 0, i = 1, a %= Pe, o = a - Pe + 1;
          } else {
            for (f = s = l[p], i = 1; s >= 10; s /= 10) {
              i++;
            }a %= Pe, o = a - Pe + i, u = 0 > o ? 0 : f / Ce(10, i - o - 1) % 10 | 0;
          }if (n = n || 0 > t || void 0 !== l[p + 1] || (0 > o ? f : f % Ce(10, i - o - 1)), c = 4 > r ? (u || n) && (0 == r || r == (e.s < 0 ? 3 : 2)) : u > 5 || 5 == u && (4 == r || n || 6 == r && (a > 0 ? o > 0 ? f / Ce(10, i - o) : 0 : l[p - 1]) % 10 & 1 || r == (e.s < 0 ? 8 : 7)), 1 > t || !l[0]) return l.length = 0, c ? (t -= e.e + 1, l[0] = Ce(10, (Pe - t % Pe) % Pe), e.e = -t || 0) : l[0] = e.e = 0, e;if (0 == a ? (l.length = p, s = 1, p--) : (l.length = p + 1, s = Ce(10, Pe - a), l[p] = o > 0 ? (f / Ce(10, i - o) % Ce(10, o) | 0) * s : 0), c) for (;;) {
            if (0 == p) {
              for (a = 1, o = l[0]; o >= 10; o /= 10) {
                a++;
              }for (o = l[0] += s, s = 1; o >= 10; o /= 10) {
                s++;
              }a != s && (e.e++, l[0] == Ie && (l[0] = 1));break;
            }if (l[p] += s, l[p] != Ie) break;l[p--] = 0, s = 1;
          }for (a = l.length; 0 === l[--a];) {
            l.pop();
          }
        }return Me && (e.e > h.maxE ? (e.d = null, e.e = NaN) : e.e < h.minE && (e.e = 0, e.d = [0])), e;
      }function l(e, t, r) {
        if (!e.isFinite()) return N(e);var n,
            i = e.e,
            o = a(e.d),
            s = o.length;return t ? (r && (n = r - s) > 0 ? o = o.charAt(0) + "." + o.slice(1) + g(n) : s > 1 && (o = o.charAt(0) + "." + o.slice(1)), o = o + (e.e < 0 ? "e" : "e+") + e.e) : 0 > i ? (o = "0." + g(-i - 1) + o, r && (n = r - s) > 0 && (o += g(n))) : i >= s ? (o += g(i + 1 - s), r && (n = r - i - 1) > 0 && (o = o + "." + g(n))) : ((n = i + 1) < s && (o = o.slice(0, n) + "." + o.slice(n)), r && (n = r - s) > 0 && (i + 1 === s && (o += "."), o += g(n))), o;
      }function p(e, t) {
        for (var r = 1, n = e[0]; n >= 10; n /= 10) {
          r++;
        }return r + t * Pe - 1;
      }function h(e, t, r) {
        if (t > Ue) throw Me = !0, r && (e.precision = r), Error(_e);return f(new e(be), t, 1, !0);
      }function m(e, t, r) {
        if (t > qe) throw Error(_e);return f(new e(we), t, r, !0);
      }function d(e) {
        var t = e.length - 1,
            r = t * Pe + 1;if (t = e[t]) {
          for (; t % 10 == 0; t /= 10) {
            r--;
          }for (t = e[0]; t >= 10; t /= 10) {
            r++;
          }
        }return r;
      }function g(e) {
        for (var t = ""; e--;) {
          t += "0";
        }return t;
      }function v(e, t, r, n) {
        var i,
            a = new e(1),
            o = Math.ceil(n / Pe + 4);for (Me = !1;;) {
          if (r % 2 && (a = a.times(t), C(a.d, o) && (i = !0)), r = Te(r / 2), 0 === r) {
            r = a.d.length - 1, i && 0 === a.d[r] && ++a.d[r];break;
          }t = t.times(t), C(t.d, o);
        }return Me = !0, a;
      }function y(e) {
        return 1 & e.d[e.d.length - 1];
      }function x(e, t, r) {
        for (var n, i = new e(t[0]), a = 0; ++a < t.length;) {
          if (n = new e(t[a]), !n.s) {
            i = n;break;
          }i[r](n) && (i = n);
        }return i;
      }function b(e, t) {
        var r,
            n,
            i,
            o,
            u,
            c,
            l,
            p = 0,
            h = 0,
            m = 0,
            d = e.constructor,
            g = d.rounding,
            v = d.precision;if (!e.d || !e.d[0] || e.e > 17) return new d(e.d ? e.d[0] ? e.s < 0 ? 0 : 1 / 0 : 1 : e.s ? e.s < 0 ? 0 : e : NaN);for (null == t ? (Me = !1, l = v) : l = t, c = new d(.03125); e.e > -2;) {
          e = e.times(c), m += 5;
        }for (n = Math.log(Ce(2, m)) / Math.LN10 * 2 + 5 | 0, l += n, r = o = u = new d(1), d.precision = l;;) {
          if (o = f(o.times(e), l, 1), r = r.times(++h), c = u.plus(je(o, r, l, 1)), a(c.d).slice(0, l) === a(u.d).slice(0, l)) {
            for (i = m; i--;) {
              u = f(u.times(u), l, 1);
            }if (null != t) return d.precision = v, u;if (!(3 > p && s(u.d, l - n, g, p))) return f(u, d.precision = v, g, Me = !0);d.precision = l += 10, r = o = c = new d(1), h = 0, p++;
          }u = c;
        }
      }function w(e, t) {
        var r,
            n,
            i,
            o,
            u,
            c,
            l,
            p,
            m,
            d,
            g,
            v = 1,
            y = 10,
            x = e,
            b = x.d,
            N = x.constructor,
            E = N.rounding,
            M = N.precision;if (x.s < 0 || !b || !b[0] || !x.e && 1 == b[0] && 1 == b.length) return new N(b && !b[0] ? -1 / 0 : 1 != x.s ? NaN : b ? 0 : x);if (null == t ? (Me = !1, m = M) : m = t, N.precision = m += y, r = a(b), n = r.charAt(0), !(Math.abs(o = x.e) < 15e14)) return p = h(N, m + 2, M).times(o + ""), x = w(new N(n + "." + r.slice(1)), m - y).plus(p), N.precision = M, null == t ? f(x, M, E, Me = !0) : x;for (; 7 > n && 1 != n || 1 == n && r.charAt(1) > 3;) {
          x = x.times(e), r = a(x.d), n = r.charAt(0), v++;
        }for (o = x.e, n > 1 ? (x = new N("0." + r), o++) : x = new N(n + "." + r.slice(1)), d = x, l = u = x = je(x.minus(1), x.plus(1), m, 1), g = f(x.times(x), m, 1), i = 3;;) {
          if (u = f(u.times(g), m, 1), p = l.plus(je(u, new N(i), m, 1)), a(p.d).slice(0, m) === a(l.d).slice(0, m)) {
            if (l = l.times(2), 0 !== o && (l = l.plus(h(N, m + 2, M).times(o + ""))), l = je(l, new N(v), m, 1), null != t) return N.precision = M, l;if (!s(l.d, m - y, E, c)) return f(l, N.precision = M, E, Me = !0);N.precision = m += y, p = u = x = je(d.minus(1), d.plus(1), m, 1), g = f(x.times(x), m, 1), i = c = 1;
          }l = p, i += 2;
        }
      }function N(e) {
        return String(e.s * e.s / 0);
      }function E(e, t) {
        var r, n, i;for ((r = t.indexOf(".")) > -1 && (t = t.replace(".", "")), (n = t.search(/e/i)) > 0 ? (0 > r && (r = n), r += +t.slice(n + 1), t = t.substring(0, n)) : 0 > r && (r = t.length), n = 0; 48 === t.charCodeAt(n); n++) {}for (i = t.length; 48 === t.charCodeAt(i - 1); --i) {}if (t = t.slice(n, i)) {
          if (i -= n, e.e = r = r - n - 1, e.d = [], n = (r + 1) % Pe, 0 > r && (n += Pe), i > n) {
            for (n && e.d.push(+t.slice(0, n)), i -= Pe; i > n;) {
              e.d.push(+t.slice(n, n += Pe));
            }t = t.slice(n), n = Pe - t.length;
          } else n -= i;for (; n--;) {
            t += "0";
          }e.d.push(+t), Me && (e.e > e.constructor.maxE ? (e.d = null, e.e = NaN) : e.e < e.constructor.minE && (e.e = 0, e.d = [0]));
        } else e.e = 0, e.d = [0];return e;
      }function M(e, t) {
        var r, n, i, a, o, s, c, f, l;if ("Infinity" === t || "NaN" === t) return +t || (e.s = NaN), e.e = NaN, e.d = null, e;if (ze.test(t)) r = 16, t = t.toLowerCase();else if (Se.test(t)) r = 2;else {
          if (!Be.test(t)) throw Error(Oe + t);r = 8;
        }for (a = t.search(/p/i), a > 0 ? (c = +t.slice(a + 1), t = t.substring(2, a)) : t = t.slice(2), a = t.indexOf("."), o = a >= 0, n = e.constructor, o && (t = t.replace(".", ""), s = t.length, a = s - a, i = v(n, new n(r), a, 2 * a)), f = u(t, r, Ie), l = f.length - 1, a = l; 0 === f[a]; --a) {
          f.pop();
        }return 0 > a ? new n(0 * e.s) : (e.e = p(f, l), e.d = f, Me = !1, o && (e = je(e, i, 4 * s)), c && (e = e.times(Math.abs(c) < 54 ? Math.pow(2, c) : Ne.pow(2, c))), Me = !0, e);
      }function A(e, t) {
        var r,
            n = t.d.length;if (3 > n) return O(e, 2, t, t);r = 1.4 * Math.sqrt(n), r = r > 16 ? 16 : 0 | r, t = t.times(Math.pow(5, -r)), t = O(e, 2, t, t);for (var i, a = new e(5), o = new e(16), s = new e(20); r--;) {
          i = t.times(t), t = t.times(a.plus(i.times(o.times(i).minus(s))));
        }return t;
      }function O(e, t, r, n, i) {
        var a,
            o,
            s,
            u,
            c = 1,
            f = e.precision,
            l = Math.ceil(f / Pe);for (Me = !1, u = r.times(r), s = new e(n);;) {
          if (o = je(s.times(u), new e(t++ * t++), f, 1), s = i ? n.plus(o) : n.minus(o), n = je(o.times(u), new e(t++ * t++), f, 1), o = s.plus(n), void 0 !== o.d[l]) {
            for (a = l; o.d[a] === s.d[a] && a--;) {}if (-1 == a) break;
          }a = s, s = n, n = o, o = a, c++;
        }return Me = !0, o.d.length = l + 1, o;
      }function _(e, t) {
        var r,
            n = t.s < 0,
            i = m(e, e.precision, 1),
            a = i.times(.5);if (t = t.abs(), t.lte(a)) return ge = n ? 4 : 1, t;if (r = t.divToInt(i), r.isZero()) ge = n ? 3 : 2;else {
          if (t = t.minus(r.times(i)), t.lte(a)) return ge = y(r) ? n ? 2 : 3 : n ? 4 : 1, t;ge = y(r) ? n ? 1 : 4 : n ? 3 : 2;
        }return t.minus(i).abs();
      }function T(e, t, r, n) {
        var i,
            a,
            s,
            c,
            f,
            p,
            h,
            m,
            d,
            g = e.constructor,
            v = void 0 !== r;if (v ? (o(r, 1, ye), void 0 === n ? n = g.rounding : o(n, 0, 8)) : (r = g.precision, n = g.rounding), e.isFinite()) {
          for (h = l(e), s = h.indexOf("."), v ? (i = 2, 16 == t ? r = 4 * r - 3 : 8 == t && (r = 3 * r - 2)) : i = t, s >= 0 && (h = h.replace(".", ""), d = new g(1), d.e = h.length - s, d.d = u(l(d), 10, i), d.e = d.d.length), m = u(h, 10, i), a = f = m.length; 0 == m[--f];) {
            m.pop();
          }if (m[0]) {
            if (0 > s ? a-- : (e = new g(e), e.d = m, e.e = a, e = je(e, d, r, n, 0, i), m = e.d, a = e.e, p = de), s = m[r], c = i / 2, p = p || void 0 !== m[r + 1], p = 4 > n ? (void 0 !== s || p) && (0 === n || n === (e.s < 0 ? 3 : 2)) : s > c || s === c && (4 === n || p || 6 === n && 1 & m[r - 1] || n === (e.s < 0 ? 8 : 7)), m.length = r, p) for (; ++m[--r] > i - 1;) {
              m[r] = 0, r || (++a, m.unshift(1));
            }for (f = m.length; !m[f - 1]; --f) {}for (s = 0, h = ""; f > s; s++) {
              h += xe.charAt(m[s]);
            }if (v) {
              if (f > 1) if (16 == t || 8 == t) {
                for (s = 16 == t ? 4 : 3, --f; f % s; f++) {
                  h += "0";
                }for (m = u(h, i, t), f = m.length; !m[f - 1]; --f) {}for (s = 1, h = "1."; f > s; s++) {
                  h += xe.charAt(m[s]);
                }
              } else h = h.charAt(0) + "." + h.slice(1);h = h + (0 > a ? "p" : "p+") + a;
            } else if (0 > a) {
              for (; ++a;) {
                h = "0" + h;
              }h = "0." + h;
            } else if (++a > f) for (a -= f; a--;) {
              h += "0";
            } else f > a && (h = h.slice(0, a) + "." + h.slice(a));
          } else h = v ? "0p+0" : "0";h = (16 == t ? "0x" : 2 == t ? "0b" : 8 == t ? "0o" : "") + h;
        } else h = N(e);return e.s < 0 ? "-" + h : h;
      }function C(e, t) {
        return e.length > t ? (e.length = t, !0) : void 0;
      }function S(e) {
        return new this(e).abs();
      }function z(e) {
        return new this(e).acos();
      }function B(e) {
        return new this(e).acosh();
      }function k(e, t) {
        return new this(e).plus(t);
      }function I(e) {
        return new this(e).asin();
      }function P(e) {
        return new this(e).asinh();
      }function R(e) {
        return new this(e).atan();
      }function U(e) {
        return new this(e).atanh();
      }function q(e, t) {
        e = new this(e), t = new this(t);var r,
            n = this.precision,
            i = this.rounding,
            a = n + 4;return e.s && t.s ? e.d || t.d ? !t.d || e.isZero() ? (r = t.s < 0 ? m(this, n, i) : new this(0), r.s = e.s) : !e.d || t.isZero() ? (r = m(this, a, 1).times(.5), r.s = e.s) : t.s < 0 ? (this.precision = a, this.rounding = 1, r = this.atan(je(e, t, a, 1)), t = m(this, a, 1), this.precision = n, this.rounding = i, r = e.s < 0 ? r.minus(t) : r.plus(t)) : r = this.atan(je(e, t, a, 1)) : (r = m(this, a, 1).times(t.s > 0 ? .25 : .75), r.s = e.s) : r = new this(NaN), r;
      }function L(e) {
        return new this(e).cbrt();
      }function j(e) {
        return f(e = new this(e), e.e + 1, 2);
      }function F(e) {
        if (!e || "object" != (typeof e === "undefined" ? "undefined" : _typeof(e))) throw Error(Ae + "Object expected");var t,
            r,
            n,
            i = ["precision", 1, ye, "rounding", 0, 8, "toExpNeg", -ve, 0, "toExpPos", 0, ve, "maxE", 0, ve, "minE", -ve, 0, "modulo", 0, 9];for (t = 0; t < i.length; t += 3) {
          if (void 0 !== (n = e[r = i[t]])) {
            if (!(Te(n) === n && n >= i[t + 1] && n <= i[t + 2])) throw Error(Oe + r + ": " + n);this[r] = n;
          }
        }if (e.hasOwnProperty(r = "crypto")) if (void 0 === (n = e[r])) this[r] = n;else {
          if (n !== !0 && n !== !1 && 0 !== n && 1 !== n) throw Error(Oe + r + ": " + n);this[r] = !(!n || !Ee || !Ee.getRandomValues && !Ee.randomBytes);
        }return this;
      }function D(e) {
        return new this(e).cos();
      }function $(e) {
        return new this(e).cosh();
      }function G(e) {
        function t(e) {
          var r,
              n,
              i,
              a = this;if (!(a instanceof t)) return new t(e);if (a.constructor = t, e instanceof t) return a.s = e.s, a.e = e.e, void (a.d = (e = e.d) ? e.slice() : e);if (i = typeof e === "undefined" ? "undefined" : _typeof(e), "number" === i) {
            if (0 === e) return a.s = 0 > 1 / e ? -1 : 1, a.e = 0, void (a.d = [0]);if (0 > e ? (e = -e, a.s = -1) : a.s = 1, e === ~~e && 1e7 > e) {
              for (r = 0, n = e; n >= 10; n /= 10) {
                r++;
              }return a.e = r, void (a.d = [e]);
            }return 0 * e !== 0 ? (e || (a.s = NaN), a.e = NaN, void (a.d = null)) : E(a, e.toString());
          }if ("string" !== i) throw Error(Oe + e);return 45 === e.charCodeAt(0) ? (e = e.slice(1), a.s = -1) : a.s = 1, ke.test(e) ? E(a, e) : M(a, e);
        }var r, n, i;if (t.prototype = Le, t.ROUND_UP = 0, t.ROUND_DOWN = 1, t.ROUND_CEIL = 2, t.ROUND_FLOOR = 3, t.ROUND_HALF_UP = 4, t.ROUND_HALF_DOWN = 5, t.ROUND_HALF_EVEN = 6, t.ROUND_HALF_CEIL = 7, t.ROUND_HALF_FLOOR = 8, t.EUCLID = 9, t.config = F, t.clone = G, t.abs = S, t.acos = z, t.acosh = B, t.add = k, t.asin = I, t.asinh = P, t.atan = R, t.atanh = U, t.atan2 = q, t.cbrt = L, t.ceil = j, t.cos = D, t.cosh = $, t.div = H, t.exp = Z, t.floor = V, t.fromJSON = W, t.hypot = Y, t.ln = X, t.log = J, t.log10 = K, t.log2 = Q, t.max = ee, t.min = te, t.mod = re, t.mul = ne, t.pow = ie, t.random = ae, t.round = oe, t.sign = se, t.sin = ue, t.sinh = ce, t.sqrt = fe, t.sub = le, t.tan = pe, t.tanh = he, t.trunc = me, void 0 === e && (e = {}), e) for (i = ["precision", "rounding", "toExpNeg", "toExpPos", "maxE", "minE", "modulo", "crypto"], r = 0; r < i.length;) {
          e.hasOwnProperty(n = i[r++]) || (e[n] = this[n]);
        }return t.config(e), t;
      }function H(e, t) {
        return new this(e).div(t);
      }function Z(e) {
        return new this(e).exp();
      }function V(e) {
        return f(e = new this(e), e.e + 1, 3);
      }function W(e) {
        var t, r, n, i;if ("string" != typeof e || !e) throw Error(Oe + e);if (n = e.length, i = xe.indexOf(e.charAt(0)), 1 === n) return new this(i > 81 ? [-1 / 0, 1 / 0, NaN][i - 82] : i > 40 ? -(i - 41) : i);if (64 & i) r = 16 & i, t = r ? (7 & i) - 3 : (15 & i) - 7, n = 1;else {
          if (2 === n) return i = 88 * i + xe.indexOf(e.charAt(1)), new this(i >= 2816 ? -(i - 2816) - 41 : i + 41);if (r = 32 & i, !(31 & i)) return e = u(e.slice(1), 88, 10).join(""), new this(r ? "-" + e : e);t = 15 & i, n = t + 1, t = 1 === t ? xe.indexOf(e.charAt(1)) : 2 === t ? 88 * xe.indexOf(e.charAt(1)) + xe.indexOf(e.charAt(2)) : +u(e.slice(1, n), 88, 10).join(""), 16 & i && (t = -t);
        }return e = u(e.slice(n), 88, 10).join(""), t = t - e.length + 1, e = e + "e" + t, new this(r ? "-" + e : e);
      }function Y() {
        var e,
            t,
            r = new this(0);for (Me = !1, e = 0; e < arguments.length;) {
          if (t = new this(arguments[e++]), t.d) r.d && (r = r.plus(t.times(t)));else {
            if (t.s) return Me = !0, new this(1 / 0);r = t;
          }
        }return Me = !0, r.sqrt();
      }function X(e) {
        return new this(e).ln();
      }function J(e, t) {
        return new this(e).log(t);
      }function Q(e) {
        return new this(e).log(2);
      }function K(e) {
        return new this(e).log(10);
      }function ee() {
        return x(this, arguments, "lt");
      }function te() {
        return x(this, arguments, "gt");
      }function re(e, t) {
        return new this(e).mod(t);
      }function ne(e, t) {
        return new this(e).mul(t);
      }function ie(e, t) {
        return new this(e).pow(t);
      }function ae(e) {
        var t,
            r,
            n,
            i,
            a = 0,
            s = new this(1),
            u = [];if (void 0 === e ? e = this.precision : o(e, 1, ye), n = Math.ceil(e / Pe), this.crypto === !1) for (; n > a;) {
          u[a++] = 1e7 * Math.random() | 0;
        } else if (Ee && Ee.getRandomValues) for (t = Ee.getRandomValues(new Uint32Array(n)); n > a;) {
          i = t[a], i >= 429e7 ? t[a] = Ee.getRandomValues(new Uint32Array(1))[0] : u[a++] = i % 1e7;
        } else if (Ee && Ee.randomBytes) {
          for (t = Ee.randomBytes(n *= 4); n > a;) {
            i = t[a] + (t[a + 1] << 8) + (t[a + 2] << 16) + ((127 & t[a + 3]) << 24), i >= 214e7 ? Ee.randomBytes(4).copy(t, a) : (u.push(i % 1e7), a += 4);
          }a = n / 4;
        } else {
          if (this.crypto) throw Error(Ae + "crypto unavailable");for (; n > a;) {
            u[a++] = 1e7 * Math.random() | 0;
          }
        }for (n = u[--a], e %= Pe, n && e && (i = Ce(10, Pe - e), u[a] = (n / i | 0) * i); 0 === u[a]; a--) {
          u.pop();
        }if (0 > a) r = 0, u = [0];else {
          for (r = -1; 0 === u[0]; r -= Pe) {
            u.shift();
          }for (n = 1, i = u[0]; i >= 10; i /= 10) {
            n++;
          }Pe > n && (r -= Pe - n);
        }return s.e = r, s.d = u, s;
      }function oe(e) {
        return f(e = new this(e), e.e + 1, this.rounding);
      }function se(e) {
        return e = new this(e), e.d ? e.d[0] ? e.s : 0 * e.s : e.s || NaN;
      }function ue(e) {
        return new this(e).sin();
      }function ce(e) {
        return new this(e).sinh();
      }function fe(e) {
        return new this(e).sqrt();
      }function le(e, t) {
        return new this(e).sub(t);
      }function pe(e) {
        return new this(e).tan();
      }function he(e) {
        return new this(e).tanh();
      }function me(e) {
        return f(e = new this(e), e.e + 1, 1);
      }var de,
          ge,
          ve = 9e15,
          ye = 1e9,
          xe = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ!#$%()*+,-./:;=?@[]^_`{|}~",
          be = "2.3025850929940456840179914546843642076011014886287729760333279009675726096773524802359972050895982983419677840422862486334095254650828067566662873690987816894829072083255546808437998948262331985283935053089653777326288461633662222876982198867465436674744042432743651550489343149393914796194044002221051017141748003688084012647080685567743216228355220114804663715659121373450747856947683463616792101806445070648000277502684916746550586856935673420670581136429224554405758925724208241314695689016758940256776311356919292033376587141660230105703089634572075440370847469940168269282808481184289314848524948644871927809676271275775397027668605952496716674183485704422507197965004714951050492214776567636938662976979522110718264549734772662425709429322582798502585509785265383207606726317164309505995087807523710333101197857547331541421808427543863591778117054309827482385045648019095610299291824318237525357709750539565187697510374970888692180205189339507238539205144634197265287286965110862571492198849978748873771345686209167058",
          we = "3.1415926535897932384626433832795028841971693993751058209749445923078164062862089986280348253421170679821480865132823066470938446095505822317253594081284811174502841027019385211055596446229489549303819644288109756659334461284756482337867831652712019091456485669234603486104543266482133936072602491412737245870066063155881748815209209628292540917153643678925903600113305305488204665213841469519415116094330572703657595919530921861173819326117931051185480744623799627495673518857527248912279381830119491298336733624406566430860213949463952247371907021798609437027705392171762931767523846748184676694051320005681271452635608277857713427577896091736371787214684409012249534301465495853710507922796892589235420199561121290219608640344181598136297747713099605187072113499999983729780499510597317328160963185950244594553469083026425223082533446850352619311881710100031378387528865875332083814206171776691473035982534904287554687311595628638823537875937519577818577805321712268066130019278766111959092164201989380952572010654858632789",
          Ne = { precision: 20, rounding: 4, modulo: 1, toExpNeg: -7, toExpPos: 21, minE: -ve, maxE: ve, crypto: void 0 },
          Ee = "undefined" != typeof crypto ? crypto : null,
          Me = !0,
          Ae = "[DecimalError] ",
          Oe = Ae + "Invalid argument: ",
          _e = Ae + "Precision limit exceeded",
          Te = Math.floor,
          Ce = Math.pow,
          Se = /^0b([01]+(\.[01]*)?|\.[01]+)(p[+-]?\d+)?$/i,
          ze = /^0x([0-9a-f]+(\.[0-9a-f]*)?|\.[0-9a-f]+)(p[+-]?\d+)?$/i,
          Be = /^0o([0-7]+(\.[0-7]*)?|\.[0-7]+)(p[+-]?\d+)?$/i,
          ke = /^(\d+(\.\d*)?|\.\d+)(e[+-]?\d+)?$/i,
          Ie = 1e7,
          Pe = 7,
          Re = 9007199254740991,
          Ue = be.length - 1,
          qe = we.length - 1,
          Le = {};Le.absoluteValue = Le.abs = function () {
        var e = new this.constructor(this);return e.s < 0 && (e.s = 1), f(e);
      }, Le.ceil = function () {
        return f(new this.constructor(this), this.e + 1, 2);
      }, Le.comparedTo = Le.cmp = function (e) {
        var t,
            r,
            n,
            i,
            a = this,
            o = a.d,
            s = (e = new a.constructor(e)).d,
            u = a.s,
            c = e.s;if (!o || !s) return u && c ? u !== c ? u : o === s ? 0 : !o ^ 0 > u ? 1 : -1 : NaN;if (!o[0] || !s[0]) return o[0] ? u : s[0] ? -c : 0;if (u !== c) return u;if (a.e !== e.e) return a.e > e.e ^ 0 > u ? 1 : -1;for (n = o.length, i = s.length, t = 0, r = i > n ? n : i; r > t; ++t) {
          if (o[t] !== s[t]) return o[t] > s[t] ^ 0 > u ? 1 : -1;
        }return n === i ? 0 : n > i ^ 0 > u ? 1 : -1;
      }, Le.cosine = Le.cos = function () {
        var e,
            t,
            r = this,
            n = r.constructor;return r.d ? r.d[0] ? (e = n.precision, t = n.rounding, n.precision = e + Math.max(r.e, r.sd()) + Pe, n.rounding = 1, r = c(n, _(n, r)), n.precision = e, n.rounding = t, f(2 == ge || 3 == ge ? r.neg() : r, e, t, !0)) : new n(1) : new n(NaN);
      }, Le.cubeRoot = Le.cbrt = function () {
        var e,
            t,
            r,
            n,
            i,
            o,
            s,
            u,
            c,
            l,
            p = this,
            h = p.constructor;if (!p.isFinite() || p.isZero()) return new h(p);for (Me = !1, o = p.s * Math.pow(p.s * p, 1 / 3), o && Math.abs(o) != 1 / 0 ? n = new h(o.toString()) : (r = a(p.d), e = p.e, (o = (e - r.length + 1) % 3) && (r += 1 == o || -2 == o ? "0" : "00"), o = Math.pow(r, 1 / 3), e = Te((e + 1) / 3) - (e % 3 == (0 > e ? -1 : 2)), o == 1 / 0 ? r = "5e" + e : (r = o.toExponential(), r = r.slice(0, r.indexOf("e") + 1) + e), n = new h(r), n.s = p.s), s = (e = h.precision) + 3;;) {
          if (u = n, c = u.times(u).times(u), l = c.plus(p), n = je(l.plus(p).times(u), l.plus(c), s + 2, 1), a(u.d).slice(0, s) === (r = a(n.d)).slice(0, s)) {
            if (r = r.slice(s - 3, s + 1), "9999" != r && (i || "4999" != r)) {
              +r && (+r.slice(1) || "5" != r.charAt(0)) || (f(n, e + 1, 1), t = !n.times(n).times(n).eq(p));break;
            }if (!i && (f(u, e + 1, 0), u.times(u).times(u).eq(p))) {
              n = u;break;
            }s += 4, i = 1;
          }
        }return Me = !0, f(n, e, h.rounding, t);
      }, Le.decimalPlaces = Le.dp = function () {
        var e,
            t = this.d,
            r = NaN;if (t) {
          if (e = t.length - 1, r = (e - Te(this.e / Pe)) * Pe, e = t[e]) for (; e % 10 == 0; e /= 10) {
            r--;
          }0 > r && (r = 0);
        }return r;
      }, Le.dividedBy = Le.div = function (e) {
        return je(this, new this.constructor(e));
      }, Le.dividedToIntegerBy = Le.divToInt = function (e) {
        var t = this,
            r = t.constructor;return f(je(t, new r(e), 0, 1, 1), r.precision, r.rounding);
      }, Le.equals = Le.eq = function (e) {
        return 0 === this.cmp(e);
      }, Le.floor = function () {
        return f(new this.constructor(this), this.e + 1, 3);
      }, Le.greaterThan = Le.gt = function (e) {
        return this.cmp(e) > 0;
      }, Le.greaterThanOrEqualTo = Le.gte = function (e) {
        var t = this.cmp(e);return 1 == t || 0 === t;
      }, Le.hyperbolicCosine = Le.cosh = function () {
        var e,
            t,
            r,
            n,
            i,
            a = this,
            o = a.constructor,
            s = new o(1);if (!a.isFinite()) return new o(a.s ? 1 / 0 : NaN);if (a.isZero()) return s;r = o.precision, n = o.rounding, o.precision = r + Math.max(a.e, a.sd()) + 4, o.rounding = 1, i = a.d.length, 32 > i ? (e = Math.ceil(i / 3), t = Math.pow(4, -e).toString()) : (e = 16, t = "2.3283064365386962890625e-10"), a = O(o, 1, a.times(t), new o(1), !0);for (var u, c = e, l = new o(8); c--;) {
          u = a.times(a), a = s.minus(u.times(l.minus(u.times(l))));
        }return f(a, o.precision = r, o.rounding = n, !0);
      }, Le.hyperbolicSine = Le.sinh = function () {
        var e,
            t,
            r,
            n,
            i = this,
            a = i.constructor;if (!i.isFinite() || i.isZero()) return new a(i);if (t = a.precision, r = a.rounding, a.precision = t + Math.max(i.e, i.sd()) + 4, a.rounding = 1, n = i.d.length, 3 > n) i = O(a, 2, i, i, !0);else {
          e = 1.4 * Math.sqrt(n), e = e > 16 ? 16 : 0 | e, i = i.times(Math.pow(5, -e)), i = O(a, 2, i, i, !0);for (var o, s = new a(5), u = new a(16), c = new a(20); e--;) {
            o = i.times(i), i = i.times(s.plus(o.times(u.times(o).plus(c))));
          }
        }return a.precision = t, a.rounding = r, f(i, t, r, !0);
      }, Le.hyperbolicTangent = Le.tanh = function () {
        var e,
            t,
            r = this,
            n = r.constructor;return r.isFinite() ? r.isZero() ? new n(r) : (e = n.precision, t = n.rounding, n.precision = e + 7, n.rounding = 1, je(r.sinh(), r.cosh(), n.precision = e, n.rounding = t)) : new n(r.s);
      }, Le.inverseCosine = Le.acos = function () {
        var e,
            t = this,
            r = t.constructor,
            n = t.abs().cmp(1),
            i = r.precision,
            a = r.rounding;return -1 !== n ? 0 === n ? t.isNeg() ? m(r, i, a) : new r(0) : new r(NaN) : t.isZero() ? m(r, i + 4, a).times(.5) : (r.precision = i + 6, r.rounding = 1, t = t.asin(), e = m(r, i + 4, a).times(.5), r.precision = i, r.rounding = a, e.minus(t));
      }, Le.inverseHyperbolicCosine = Le.acosh = function () {
        var e,
            t,
            r = this,
            n = r.constructor;return r.lte(1) ? new n(r.eq(1) ? 0 : NaN) : r.isFinite() ? (e = n.precision, t = n.rounding, n.precision = e + Math.max(Math.abs(r.e), r.sd()) + 4, n.rounding = 1, Me = !1, r = r.times(r).minus(1).sqrt().plus(r), Me = !0, n.precision = e, n.rounding = t, r.ln()) : new n(r);
      }, Le.inverseHyperbolicSine = Le.asinh = function () {
        var e,
            t,
            r = this,
            n = r.constructor;return !r.isFinite() || r.isZero() ? new n(r) : (e = n.precision, t = n.rounding, n.precision = e + 2 * Math.max(Math.abs(r.e), r.sd()) + 6, n.rounding = 1, Me = !1, r = r.times(r).plus(1).sqrt().plus(r), Me = !0, n.precision = e, n.rounding = t, r.ln());
      }, Le.inverseHyperbolicTangent = Le.atanh = function () {
        var e,
            t,
            r,
            n,
            i = this,
            a = i.constructor;return i.isFinite() ? i.e >= 0 ? new a(i.abs().eq(1) ? i.s / 0 : i.isZero() ? i : NaN) : (e = a.precision, t = a.rounding, n = i.sd(), Math.max(n, e) < 2 * -i.e - 1 ? f(new a(i), e, t, !0) : (a.precision = r = n - i.e, i = je(i.plus(1), new a(1).minus(i), r + e, 1), a.precision = e + 4, a.rounding = 1, i = i.ln(), a.precision = e, a.rounding = t, i.times(.5))) : new a(NaN);
      }, Le.inverseSine = Le.asin = function () {
        var e,
            t,
            r,
            n,
            i = this,
            a = i.constructor;return i.isZero() ? new a(i) : (t = i.abs().cmp(1), r = a.precision, n = a.rounding, -1 !== t ? 0 === t ? (e = m(a, r + 4, n).times(.5), e.s = i.s, e) : new a(NaN) : (a.precision = r + 6, a.rounding = 1, i = i.div(new a(1).minus(i.times(i)).sqrt().plus(1)).atan(), a.precision = r, a.rounding = n, i.times(2)));
      }, Le.inverseTangent = Le.atan = function () {
        var e,
            t,
            r,
            n,
            i,
            a,
            o,
            s,
            u,
            c = this,
            l = c.constructor,
            p = l.precision,
            h = l.rounding;if (c.isFinite()) {
          if (c.isZero()) return new l(c);if (c.abs().eq(1) && qe >= p + 4) return o = m(l, p + 4, h).times(.25), o.s = c.s, o;
        } else {
          if (!c.s) return new l(NaN);if (qe >= p + 4) return o = m(l, p + 4, h).times(.5), o.s = c.s, o;
        }for (l.precision = s = p + 10, l.rounding = 1, r = Math.min(28, s / Pe + 2 | 0), e = r; e; --e) {
          c = c.div(c.times(c).plus(1).sqrt().plus(1));
        }for (Me = !1, t = Math.ceil(s / Pe), n = 1, u = c.times(c), o = new l(c), i = c; -1 !== e;) {
          if (i = i.times(u), a = o.minus(i.div(n += 2)), i = i.times(u), o = a.plus(i.div(n += 2)), void 0 !== o.d[t]) for (e = t; o.d[e] === a.d[e] && e--;) {}
        }return r && (o = o.times(2 << r - 1)), Me = !0, f(o, l.precision = p, l.rounding = h, !0);
      }, Le.isFinite = function () {
        return !!this.d;
      }, Le.isInteger = Le.isInt = function () {
        return !!this.d && Te(this.e / Pe) > this.d.length - 2;
      }, Le.isNaN = function () {
        return !this.s;
      }, Le.isNegative = Le.isNeg = function () {
        return this.s < 0;
      }, Le.isPositive = Le.isPos = function () {
        return this.s > 0;
      }, Le.isZero = function () {
        return !!this.d && 0 === this.d[0];
      }, Le.lessThan = Le.lt = function (e) {
        return this.cmp(e) < 0;
      }, Le.lessThanOrEqualTo = Le.lte = function (e) {
        return this.cmp(e) < 1;
      }, Le.logarithm = Le.log = function (e) {
        var t,
            r,
            n,
            i,
            o,
            u,
            c,
            l,
            p = this,
            m = p.constructor,
            d = m.precision,
            g = m.rounding,
            v = 5;if (null == e) e = new m(10), t = !0;else {
          if (e = new m(e), r = e.d, e.s < 0 || !r || !r[0] || e.eq(1)) return new m(NaN);t = e.eq(10);
        }if (r = p.d, p.s < 0 || !r || !r[0] || p.eq(1)) return new m(r && !r[0] ? -1 / 0 : 1 != p.s ? NaN : r ? 0 : 1 / 0);if (t) if (r.length > 1) o = !0;else {
          for (i = r[0]; i % 10 === 0;) {
            i /= 10;
          }o = 1 !== i;
        }if (Me = !1, c = d + v, u = w(p, c), n = t ? h(m, c + 10) : w(e, c), l = je(u, n, c, 1), s(l.d, i = d, g)) do {
          if (c += 10, u = w(p, c), n = t ? h(m, c + 10) : w(e, c), l = je(u, n, c, 1), !o) {
            +a(l.d).slice(i + 1, i + 15) + 1 == 1e14 && (l = f(l, d + 1, 0));break;
          }
        } while (s(l.d, i += 10, g));return Me = !0, f(l, d, g);
      }, Le.minus = Le.sub = function (e) {
        var t,
            r,
            n,
            i,
            a,
            o,
            s,
            u,
            c,
            l,
            h,
            m,
            d = this,
            g = d.constructor;if (e = new g(e), !d.d || !e.d) return d.s && e.s ? d.d ? e.s = -e.s : e = new g(e.d || d.s !== e.s ? d : NaN) : e = new g(NaN), e;if (d.s != e.s) return e.s = -e.s, d.plus(e);if (c = d.d, m = e.d, s = g.precision, u = g.rounding, !c[0] || !m[0]) {
          if (m[0]) e.s = -e.s;else {
            if (!c[0]) return new g(3 === u ? -0 : 0);e = new g(d);
          }return Me ? f(e, s, u) : e;
        }if (r = Te(e.e / Pe), l = Te(d.e / Pe), c = c.slice(), a = l - r) {
          for (h = 0 > a, h ? (t = c, a = -a, o = m.length) : (t = m, r = l, o = c.length), n = Math.max(Math.ceil(s / Pe), o) + 2, a > n && (a = n, t.length = 1), t.reverse(), n = a; n--;) {
            t.push(0);
          }t.reverse();
        } else {
          for (n = c.length, o = m.length, h = o > n, h && (o = n), n = 0; o > n; n++) {
            if (c[n] != m[n]) {
              h = c[n] < m[n];break;
            }
          }a = 0;
        }for (h && (t = c, c = m, m = t, e.s = -e.s), o = c.length, n = m.length - o; n > 0; --n) {
          c[o++] = 0;
        }for (n = m.length; n > a;) {
          if (c[--n] < m[n]) {
            for (i = n; i && 0 === c[--i];) {
              c[i] = Ie - 1;
            }--c[i], c[n] += Ie;
          }c[n] -= m[n];
        }for (; 0 === c[--o];) {
          c.pop();
        }for (; 0 === c[0]; c.shift()) {
          --r;
        }return c[0] ? (e.d = c, e.e = p(c, r), Me ? f(e, s, u) : e) : new g(3 === u ? -0 : 0);
      }, Le.modulo = Le.mod = function (e) {
        var t,
            r = this,
            n = r.constructor;return e = new n(e), !r.d || !e.s || e.d && !e.d[0] ? new n(NaN) : !e.d || r.d && !r.d[0] ? f(new n(r), n.precision, n.rounding) : (Me = !1, 9 == n.modulo ? (t = je(r, e.abs(), 0, 3, 1), t.s *= e.s) : t = je(r, e, 0, n.modulo, 1), t = t.times(e), Me = !0, r.minus(t));
      }, Le.naturalExponential = Le.exp = function () {
        return b(this);
      }, Le.naturalLogarithm = Le.ln = function () {
        return w(this);
      }, Le.negated = Le.neg = function () {
        var e = new this.constructor(this);return e.s = -e.s, f(e);
      }, Le.plus = Le.add = function (e) {
        var t,
            r,
            n,
            i,
            a,
            o,
            s,
            u,
            c,
            l,
            h = this,
            m = h.constructor;if (e = new m(e), !h.d || !e.d) return h.s && e.s ? h.d || (e = new m(e.d || h.s === e.s ? h : NaN)) : e = new m(NaN), e;if (h.s != e.s) return e.s = -e.s, h.minus(e);if (c = h.d, l = e.d, s = m.precision, u = m.rounding, !c[0] || !l[0]) return l[0] || (e = new m(h)), Me ? f(e, s, u) : e;if (a = Te(h.e / Pe), n = Te(e.e / Pe), c = c.slice(), i = a - n) {
          for (0 > i ? (r = c, i = -i, o = l.length) : (r = l, n = a, o = c.length), a = Math.ceil(s / Pe), o = a > o ? a + 1 : o + 1, i > o && (i = o, r.length = 1), r.reverse(); i--;) {
            r.push(0);
          }r.reverse();
        }for (o = c.length, i = l.length, 0 > o - i && (i = o, r = l, l = c, c = r), t = 0; i;) {
          t = (c[--i] = c[i] + l[i] + t) / Ie | 0, c[i] %= Ie;
        }for (t && (c.unshift(t), ++n), o = c.length; 0 == c[--o];) {
          c.pop();
        }return e.d = c, e.e = p(c, n), Me ? f(e, s, u) : e;
      }, Le.precision = Le.sd = function (e) {
        var t,
            r = this;if (void 0 !== e && e !== !!e && 1 !== e && 0 !== e) throw Error(Oe + e);return r.d ? (t = d(r.d), e && r.e + 1 > t && (t = r.e + 1)) : t = NaN, t;
      }, Le.round = function () {
        var e = this,
            t = e.constructor;return f(new t(e), e.e + 1, t.rounding);
      }, Le.sine = Le.sin = function () {
        var e,
            t,
            r = this,
            n = r.constructor;return r.isFinite() ? r.isZero() ? new n(r) : (e = n.precision, t = n.rounding, n.precision = e + Math.max(r.e, r.sd()) + Pe, n.rounding = 1, r = A(n, _(n, r)), n.precision = e, n.rounding = t, f(ge > 2 ? r.neg() : r, e, t, !0)) : new n(NaN);
      }, Le.squareRoot = Le.sqrt = function () {
        var e,
            t,
            r,
            n,
            i,
            o,
            s = this,
            u = s.d,
            c = s.e,
            l = s.s,
            p = s.constructor;if (1 !== l || !u || !u[0]) return new p(!l || 0 > l && (!u || u[0]) ? NaN : u ? s : 1 / 0);for (Me = !1, l = Math.sqrt(+s), 0 == l || l == 1 / 0 ? (t = a(u), (t.length + c) % 2 == 0 && (t += "0"), l = Math.sqrt(t), c = Te((c + 1) / 2) - (0 > c || c % 2), l == 1 / 0 ? t = "1e" + c : (t = l.toExponential(), t = t.slice(0, t.indexOf("e") + 1) + c), n = new p(t)) : n = new p(l.toString()), r = (c = p.precision) + 3;;) {
          if (o = n, n = o.plus(je(s, o, r + 2, 1)).times(.5), a(o.d).slice(0, r) === (t = a(n.d)).slice(0, r)) {
            if (t = t.slice(r - 3, r + 1), "9999" != t && (i || "4999" != t)) {
              +t && (+t.slice(1) || "5" != t.charAt(0)) || (f(n, c + 1, 1), e = !n.times(n).eq(s));break;
            }if (!i && (f(o, c + 1, 0), o.times(o).eq(s))) {
              n = o;break;
            }r += 4, i = 1;
          }
        }return Me = !0, f(n, c, p.rounding, e);
      }, Le.tangent = Le.tan = function () {
        var e,
            t,
            r = this,
            n = r.constructor;return r.isFinite() ? r.isZero() ? new n(r) : (e = n.precision, t = n.rounding, n.precision = e + 10, n.rounding = 1, r = r.sin(), r.s = 1, r = je(r, new n(1).minus(r.times(r)).sqrt(), e + 10, 0), n.precision = e, n.rounding = t, f(2 == ge || 4 == ge ? r.neg() : r, e, t, !0)) : new n(NaN);
      }, Le.times = Le.mul = function (e) {
        var t,
            r,
            n,
            i,
            a,
            o,
            s,
            u,
            c,
            l = this,
            h = l.constructor,
            m = l.d,
            d = (e = new h(e)).d;if (e.s *= l.s, !(m && m[0] && d && d[0])) return new h(!e.s || m && !m[0] && !d || d && !d[0] && !m ? NaN : m && d ? 0 * e.s : e.s / 0);for (r = Te(l.e / Pe) + Te(e.e / Pe), u = m.length, c = d.length, c > u && (a = m, m = d, d = a, o = u, u = c, c = o), a = [], o = u + c, n = o; n--;) {
          a.push(0);
        }for (n = c; --n >= 0;) {
          for (t = 0, i = u + n; i > n;) {
            s = a[i] + d[n] * m[i - n - 1] + t, a[i--] = s % Ie | 0, t = s / Ie | 0;
          }a[i] = (a[i] + t) % Ie | 0;
        }for (; !a[--o];) {
          a.pop();
        }for (t ? ++r : a.shift(), n = a.length; !a[--n];) {
          a.pop();
        }return e.d = a, e.e = p(a, r), Me ? f(e, h.precision, h.rounding) : e;
      }, Le.toBinary = function (e, t) {
        return T(this, 2, e, t);
      }, Le.toDecimalPlaces = Le.toDP = function (e, t) {
        var r = this,
            n = r.constructor;return r = new n(r), void 0 === e ? r : (o(e, 0, ye), void 0 === t ? t = n.rounding : o(t, 0, 8), f(r, e + r.e + 1, t));
      }, Le.toExponential = function (e, t) {
        var r,
            n = this,
            i = n.constructor;return void 0 === e ? r = l(n, !0) : (o(e, 0, ye), void 0 === t ? t = i.rounding : o(t, 0, 8), n = f(new i(n), e + 1, t), r = l(n, !0, e + 1)), n.isNeg() && !n.isZero() ? "-" + r : r;
      }, Le.toFixed = function (e, t) {
        var r,
            n,
            i = this,
            a = i.constructor;return void 0 === e ? r = l(i) : (o(e, 0, ye), void 0 === t ? t = a.rounding : o(t, 0, 8), n = f(new a(i), e + i.e + 1, t), r = l(n, !1, e + n.e + 1)), i.isNeg() && !i.isZero() ? "-" + r : r;
      }, Le.toFraction = function (e) {
        var t,
            r,
            n,
            i,
            o,
            s,
            u,
            c,
            f,
            l,
            p,
            h,
            m = this,
            g = m.d,
            v = m.constructor;if (!g) return new v(m);if (f = r = new v(1), n = c = new v(0), t = new v(n), o = t.e = d(g) - m.e - 1, s = o % Pe, t.d[0] = Ce(10, 0 > s ? Pe + s : s), null == e) e = o > 0 ? t : f;else {
          if (u = new v(e), !u.isInt() || u.lt(f)) throw Error(Oe + u);e = u.gt(t) ? o > 0 ? t : f : u;
        }for (Me = !1, u = new v(a(g)), l = v.precision, v.precision = o = g.length * Pe * 2; p = je(u, t, 0, 1, 1), i = r.plus(p.times(n)), 1 != i.cmp(e);) {
          r = n, n = i, i = f, f = c.plus(p.times(i)), c = i, i = t, t = u.minus(p.times(i)), u = i;
        }return i = je(e.minus(r), n, 0, 1, 1), c = c.plus(i.times(f)), r = r.plus(i.times(n)), c.s = f.s = m.s, h = je(f, n, o, 1).minus(m).abs().cmp(je(c, r, o, 1).minus(m).abs()) < 1 ? [f, n] : [c, r], v.precision = l, Me = !0, h;
      }, Le.toHexadecimal = Le.toHex = function (e, t) {
        return T(this, 16, e, t);
      }, Le.toJSON = function () {
        var e,
            t,
            r,
            n,
            i,
            o,
            s,
            c,
            f = this,
            l = f.s < 0;if (!f.d) return xe.charAt(f.s ? l ? 82 : 83 : 84);if (t = f.e, 1 === f.d.length && 4 > t && t >= 0 && (o = f.d[0], 2857 > o)) return 41 > o ? xe.charAt(l ? o + 41 : o) : (o -= 41, l && (o += 2816), n = o / 88 | 0, xe.charAt(n) + xe.charAt(o - 88 * n));if (c = a(f.d), s = "", !l && 8 >= t && t >= -7) n = 64 + t + 7;else if (l && 4 >= t && t >= -3) n = 80 + t + 3;else if (c.length === t + 1) n = 32 * l;else if (n = 32 * l + 16 * (0 > t), t = Math.abs(t), 88 > t) n += 1, s = xe.charAt(t);else if (7744 > t) n += 2, o = t / 88 | 0, s = xe.charAt(o) + xe.charAt(t - 88 * o);else for (e = u(String(t), 10, 88), i = e.length, n += i, r = 0; i > r; r++) {
          s += xe.charAt(e[r]);
        }for (s = xe.charAt(n) + s, e = u(c, 10, 88), i = e.length, r = 0; i > r; r++) {
          s += xe.charAt(e[r]);
        }return s;
      }, Le.toNearest = function (e, t) {
        var r = this,
            n = r.constructor;if (r = new n(r), null == e) {
          if (!r.d) return r;e = new n(1), t = n.rounding;
        } else {
          if (e = new n(e), void 0 !== t && o(t, 0, 8), !r.d) return e.s ? r : e;if (!e.d) return e.s && (e.s = r.s), e;
        }return e.d[0] ? (Me = !1, 4 > t && (t = [4, 5, 7, 8][t]), r = je(r, e, 0, t, 1).times(e), Me = !0, f(r)) : (e.s = r.s, r = e), r;
      }, Le.toNumber = function () {
        return +this;
      }, Le.toOctal = function (e, t) {
        return T(this, 8, e, t);
      }, Le.toPower = Le.pow = function (e) {
        var t,
            r,
            n,
            i,
            o,
            u,
            c,
            l = this,
            p = l.constructor,
            h = +(e = new p(e));if (!(l.d && e.d && l.d[0] && e.d[0])) return new p(Ce(+l, h));if (l = new p(l), l.eq(1)) return l;if (n = p.precision, o = p.rounding, e.eq(1)) return f(l, n, o);if (t = Te(e.e / Pe), r = e.d.length - 1, c = t >= r, u = l.s, c) {
          if ((r = 0 > h ? -h : h) <= Re) return i = v(p, l, r, n), e.s < 0 ? new p(1).div(i) : f(i, n, o);
        } else if (0 > u) return new p(NaN);return u = 0 > u && 1 & e.d[Math.max(t, r)] ? -1 : 1, r = Ce(+l, h), t = 0 != r && isFinite(r) ? new p(r + "").e : Te(h * (Math.log("0." + a(l.d)) / Math.LN10 + l.e + 1)), t > p.maxE + 1 || t < p.minE - 1 ? new p(t > 0 ? u / 0 : 0) : (Me = !1, p.rounding = l.s = 1, r = Math.min(12, (t + "").length), i = b(e.times(w(l, n + r)), n), i = f(i, n + 5, 1), s(i.d, n, o) && (t = n + 10, i = f(b(e.times(w(l, t + r)), t), t + 5, 1), +a(i.d).slice(n + 1, n + 15) + 1 == 1e14 && (i = f(i, n + 1, 0))), i.s = u, Me = !0, p.rounding = o, f(i, n, o));
      }, Le.toPrecision = function (e, t) {
        var r,
            n = this,
            i = n.constructor;return void 0 === e ? r = l(n, n.e <= i.toExpNeg || n.e >= i.toExpPos) : (o(e, 1, ye), void 0 === t ? t = i.rounding : o(t, 0, 8), n = f(new i(n), e, t), r = l(n, e <= n.e || n.e <= i.toExpNeg, e)), n.isNeg() && !n.isZero() ? "-" + r : r;
      }, Le.toSignificantDigits = Le.toSD = function (e, t) {
        var r = this,
            n = r.constructor;return void 0 === e ? (e = n.precision, t = n.rounding) : (o(e, 1, ye), void 0 === t ? t = n.rounding : o(t, 0, 8)), f(new n(r), e, t);
      }, Le.toString = function () {
        var e = this,
            t = e.constructor,
            r = l(e, e.e <= t.toExpNeg || e.e >= t.toExpPos);return e.isNeg() && !e.isZero() ? "-" + r : r;
      }, Le.truncated = Le.trunc = function () {
        return f(new this.constructor(this), this.e + 1, 1);
      }, Le.valueOf = function () {
        var e = this,
            t = e.constructor,
            r = l(e, e.e <= t.toExpNeg || e.e >= t.toExpPos);return e.isNeg() ? "-" + r : r;
      };var je = function () {
        function e(e, t, r) {
          var n,
              i = 0,
              a = e.length;for (e = e.slice(); a--;) {
            n = e[a] * t + i, e[a] = n % r | 0, i = n / r | 0;
          }return i && e.unshift(i), e;
        }function t(e, t, r, n) {
          var i, a;if (r != n) a = r > n ? 1 : -1;else for (i = a = 0; r > i; i++) {
            if (e[i] != t[i]) {
              a = e[i] > t[i] ? 1 : -1;break;
            }
          }return a;
        }function r(e, t, r, n) {
          for (var i = 0; r--;) {
            e[r] -= i, i = e[r] < t[r] ? 1 : 0, e[r] = i * n + e[r] - t[r];
          }for (; !e[0] && e.length > 1;) {
            e.shift();
          }
        }return function (n, i, a, o, s, u) {
          var c,
              l,
              p,
              h,
              m,
              d,
              g,
              v,
              y,
              x,
              b,
              w,
              N,
              E,
              M,
              A,
              O,
              _,
              T,
              C,
              S = n.constructor,
              z = n.s == i.s ? 1 : -1,
              B = n.d,
              k = i.d;if (!(B && B[0] && k && k[0])) return new S(n.s && i.s && (B ? !k || B[0] != k[0] : k) ? B && 0 == B[0] || !k ? 0 * z : z / 0 : NaN);for (u ? (m = 1, l = n.e - i.e) : (u = Ie, m = Pe, l = Te(n.e / m) - Te(i.e / m)), T = k.length, O = B.length, y = new S(z), x = y.d = [], p = 0; k[p] == (B[p] || 0); p++) {}if (k[p] > (B[p] || 0) && l--, null == a ? (E = a = S.precision, o = S.rounding) : E = s ? a + (n.e - i.e) + 1 : a, 0 > E) x.push(1), d = !0;else {
            if (E = E / m + 2 | 0, p = 0, 1 == T) {
              for (h = 0, k = k[0], E++; (O > p || h) && E--; p++) {
                M = h * u + (B[p] || 0), x[p] = M / k | 0, h = M % k | 0;
              }d = h || O > p;
            } else {
              for (h = u / (k[0] + 1) | 0, h > 1 && (k = e(k, h, u), B = e(B, h, u), T = k.length, O = B.length), A = T, b = B.slice(0, T), w = b.length; T > w;) {
                b[w++] = 0;
              }C = k.slice(), C.unshift(0), _ = k[0], k[1] >= u / 2 && ++_;do {
                h = 0, c = t(k, b, T, w), 0 > c ? (N = b[0], T != w && (N = N * u + (b[1] || 0)), h = N / _ | 0, h > 1 ? (h >= u && (h = u - 1), g = e(k, h, u), v = g.length, w = b.length, c = t(g, b, v, w), 1 == c && (h--, r(g, v > T ? C : k, v, u))) : (0 == h && (c = h = 1), g = k.slice()), v = g.length, w > v && g.unshift(0), r(b, g, w, u), -1 == c && (w = b.length, c = t(k, b, T, w), 1 > c && (h++, r(b, w > T ? C : k, w, u))), w = b.length) : 0 === c && (h++, b = [0]), x[p++] = h, c && b[0] ? b[w++] = B[A] || 0 : (b = [B[A]], w = 1);
              } while ((A++ < O || void 0 !== b[0]) && E--);d = void 0 !== b[0];
            }x[0] || x.shift();
          }if (1 == m) y.e = l, de = d;else {
            for (p = 1, h = x[0]; h >= 10; h /= 10) {
              p++;
            }y.e = p + l * m - 1, f(y, s ? a + y.e + 1 : a, o, d);
          }return y;
        };
      }();Ne = G(Ne), be = new Ne(be), we = new Ne(we), n = function () {
        return Ne;
      }.call(t, r, t, e), !(void 0 !== n && (e.exports = n));
    }(this);
  }, function (e, t, r) {
    "use strict";
    function n(e, t, r, n) {
      var a = n("bignumber", { "": function _() {
          return new e.BigNumber(0);
        }, number: function number(t) {
          return new e.BigNumber(t + "");
        }, string: function string(t) {
          return new e.BigNumber(t);
        }, BigNumber: function BigNumber(e) {
          return e;
        }, Fraction: function Fraction(t) {
          return new e.BigNumber(t.n).div(t.d);
        }, "Array | Matrix": function ArrayMatrix(e) {
          return i(e, a);
        } });return a.toTex = { 0: "0", 1: "\\left(${args[0]}\\right)" }, a;
    }var i = r(19);t.name = "bignumber", t.factory = n;
  }, function (e, t) {
    "use strict";
    e.exports = function r(e, t, n) {
      return e && "function" == typeof e.map ? e.map(function (e) {
        return r(e, t, n);
      }) : t(e);
    };
  }, function (e, t, r) {
    "use strict";
    function n(e, t, r, n) {
      var a = n("bool", { "": function _() {
          return !1;
        }, "boolean": function boolean(e) {
          return e;
        }, number: function number(e) {
          return !!e;
        }, BigNumber: function BigNumber(e) {
          return !e.isZero();
        }, string: function string(e) {
          var t = e.toLowerCase();if ("true" === t) return !0;if ("false" === t) return !1;var r = Number(e);if ("" != e && !isNaN(r)) return !!r;throw new Error('Cannot convert "' + e + '" to a boolean');
        }, "Array | Matrix": function ArrayMatrix(e) {
          return i(e, a);
        } });return a;
    }var i = r(19);t.name = "boolean", t.factory = n;
  }, function (e, t, r) {
    e.exports = [r(22), r(25)];
  }, function (e, t, r) {
    "use strict";
    function n(e, t, r, n, o) {
      function s(e) {
        if (!(this instanceof s)) throw new SyntaxError("Constructor must be called with the new operator");e && e.isChain ? this.value = e.value : this.value = e;
      }function u(e, t) {
        "function" == typeof t && (s.prototype[e] = f(t));
      }function c(e, t) {
        a(s.prototype, e, function () {
          var e = t();return "function" == typeof e ? f(e) : void 0;
        });
      }function f(e) {
        return function () {
          for (var t = [this.value], r = 0; r < arguments.length; r++) {
            t[r + 1] = arguments[r];
          }return new s(e.apply(e, t));
        };
      }return s.prototype.type = "Chain", s.prototype.isChain = !0, s.prototype.done = function () {
        return this.value;
      }, s.prototype.valueOf = function () {
        return this.value;
      }, s.prototype.toString = function () {
        return i(this.value);
      }, s.createProxy = function (e, t) {
        if ("string" == typeof e) u(e, t);else for (var r in e) {
          e.hasOwnProperty(r) && u(r, e[r]);
        }
      }, s.createProxy(o), o.on("import", function (e, t, r) {
        void 0 === r && c(e, t);
      }), s;
    }var i = r(23).format,
        a = r(3).lazy;t.name = "Chain", t.path = "type", t.factory = n, t.math = !0, t.lazy = !1;
  }, function (e, t, r) {
    "use strict";
    function n(e, r) {
      if (Array.isArray(e)) {
        for (var i = "[", a = e.length, o = 0; a > o; o++) {
          0 != o && (i += ", "), i += n(e[o], r);
        }return i += "]";
      }return t.format(e, r);
    }var i = r(6).format,
        a = r(24).format;t.isString = function (e) {
      return "string" == typeof e;
    }, t.endsWith = function (e, t) {
      var r = e.length - t.length,
          n = e.length;return e.substring(r, n) === t;
    }, t.format = function (e, r) {
      if ("number" == typeof e) return i(e, r);if (e && e.isBigNumber === !0) return a(e, r);if (e && e.isFraction === !0) return r && "decimal" === r.fraction ? e.toString() : e.s * e.n + "/" + e.d;if (Array.isArray(e)) return n(e, r);if (t.isString(e)) return '"' + e + '"';if ("function" == typeof e) return e.syntax ? String(e.syntax) : "function";if (e && "object" == (typeof e === "undefined" ? "undefined" : _typeof(e))) {
        if ("function" == typeof e.format) return e.format(r);if (e && e.toString() !== {}.toString()) return e.toString();var o = [];for (var s in e) {
          e.hasOwnProperty(s) && o.push('"' + s + '": ' + t.format(e[s], r));
        }return "{" + o.join(", ") + "}";
      }return String(e);
    };
  }, function (e, t) {
    t.format = function (e, r) {
      if ("function" == typeof r) return r(e);if (!e.isFinite()) return e.isNaN() ? "NaN" : e.gt(0) ? "Infinity" : "-Infinity";var n = "auto",
          i = void 0;switch (void 0 !== r && (r.notation && (n = r.notation), "number" == typeof r ? i = r : r.precision && (i = r.precision)), n) {case "fixed":
          return t.toFixed(e, i);case "exponential":
          return t.toExponential(e, i);case "auto":
          var a = .001,
              o = 1e5;r && r.exponential && (void 0 !== r.exponential.lower && (a = r.exponential.lower), void 0 !== r.exponential.upper && (o = r.exponential.upper));({ toExpNeg: e.constructor.toExpNeg, toExpPos: e.constructor.toExpPos });if (e.constructor.config({ toExpNeg: Math.round(Math.log(a) / Math.LN10), toExpPos: Math.round(Math.log(o) / Math.LN10) }), e.isZero()) return "0";var s,
              u = e.abs();return s = u.gte(a) && u.lt(o) ? e.toSignificantDigits(i).toFixed() : t.toExponential(e, i), s.replace(/((\.\d*?)(0+))($|e)/, function () {
            var e = arguments[2],
                t = arguments[4];return "." !== e ? e + t : t;
          });default:
          throw new Error('Unknown notation "' + n + '". Choose "auto", "exponential", or "fixed".');}
    }, t.toExponential = function (e, t) {
      return void 0 !== t ? e.toExponential(t - 1) : e.toExponential();
    }, t.toFixed = function (e, t) {
      return e.toFixed(t || 0);
    };
  }, function (e, t) {
    "use strict";
    function r(e, t, r, n) {
      return n("chain", { "": function _() {
          return new e.Chain();
        }, any: function any(t) {
          return new e.Chain(t);
        } });
    }t.name = "chain", t.factory = r;
  }, function (e, t, r) {
    e.exports = [r(27), r(31)];
  }, function (e, t, r) {
    function n(e, t, r, n, s) {
      return i.prototype.type = "Complex", i.prototype.isComplex = !0, i.prototype.toJSON = function () {
        return { mathjs: "Complex", re: this.re, im: this.im };
      }, i.prototype.toPolar = function () {
        return { r: this.abs(), phi: this.arg() };
      }, i.prototype.format = function (e) {
        var t = "",
            r = this.im,
            n = this.re,
            i = a(this.re, e),
            s = a(this.im, e),
            u = o(e) ? e : e ? e.precision : null;if (null !== u) {
          var c = Math.pow(10, -u);Math.abs(n / r) < c && (n = 0), Math.abs(r / n) < c && (r = 0);
        }return t = 0 == r ? i : 0 == n ? 1 == r ? "i" : -1 == r ? "-i" : s + "i" : r > 0 ? 1 == r ? i + " + i" : i + " + " + s + "i" : -1 == r ? i + " - i" : i + " - " + s.substring(1) + "i";
      }, i.fromPolar = function (e) {
        switch (arguments.length) {case 1:
            var t = arguments[0];if ("object" == (typeof t === "undefined" ? "undefined" : _typeof(t))) return i(t);throw new TypeError("Input has to be an object with r and phi keys.");case 2:
            var r = arguments[0],
                n = arguments[1];if (o(r)) {
              if (n && n.isUnit && n.hasBase("ANGLE") && (n = n.toNumber("rad")), o(n)) return new i({ r: r, phi: n });throw new TypeError("Phi is not a number nor an angle unit.");
            }throw new TypeError("Radius r is not a number.");default:
            throw new SyntaxError("Wrong number of arguments in function fromPolar");}
      }, i.prototype.valueOf = i.prototype.toString, i.fromJSON = function (e) {
        return new i(e);
      }, i.EPSILON = t.epsilon, s.on("config", function (e, t) {
        e.epsilon !== t.epsilon && (i.EPSILON = e.epsilon);
      }), i;
    }var i = r(28),
        a = r(6).format,
        o = r(6).isNumber;t.name = "Complex", t.path = "type", t.factory = n, t.math = !0;
  }, function (e, t, r) {
    var n, i;(function (e) {
      /**
      * @license Complex.js v2.0.1 11/02/2016
      *
      * Copyright (c) 2016, Robert Eisele (robert@xarg.org)
      * Dual licensed under the MIT or GPL Version 2 licenses.
      **/
      !function (a) {
        "use strict";
        function o(e, t) {
          var r = Math.abs(e),
              n = Math.abs(t);return 0 === e ? Math.log(n) : 0 === t ? Math.log(r) : 3e3 > r && 3e3 > n ? .5 * Math.log(e * e + t * t) : Math.log(e / Math.cos(Math.atan2(t, e)));
        }function s(e, t) {
          return this instanceof s ? (f(e, t), this.re = u.re, void (this.im = u.im)) : new s(e, t);
        }var u = { re: 0, im: 0 };Math.cosh = Math.cosh || function (e) {
          return .5 * (Math.exp(e) + Math.exp(-e));
        }, Math.sinh = Math.sinh || function (e) {
          return .5 * (Math.exp(e) - Math.exp(-e));
        };var c = function c() {
          throw SyntaxError("Invalid Param");
        },
            f = function f(e, t) {
          if (void 0 === e || null === e) u.re = u.im = 0;else if (void 0 !== t) u.re = e, u.im = t;else switch (typeof e === "undefined" ? "undefined" : _typeof(e)) {case "object":
              "im" in e && "re" in e ? (u.re = e.re, u.im = e.im) : "abs" in e && "arg" in e ? (u.re = e.abs * Math.cos(e.arg), u.im = e.abs * Math.sin(e.arg)) : "r" in e && "phi" in e ? (u.re = e.r * Math.cos(e.phi), u.im = e.r * Math.sin(e.phi)) : c();break;case "string":
              u.im = u.re = 0;var r = e.match(/\d+\.?\d*e[+-]?\d+|\d+\.?\d*|\.\d+|./g),
                  n = 1,
                  i = 0;null === r && c();for (var a = 0; a < r.length; a++) {
                var o = r[a];" " === o || "	" === o || "\n" === o || ("+" === o ? n++ : "-" === o ? i++ : "i" === o || "I" === o ? (n + i === 0 && c(), " " === r[a + 1] || isNaN(r[a + 1]) ? u.im += parseFloat((i % 2 ? "-" : "") + "1") : (u.im += parseFloat((i % 2 ? "-" : "") + r[a + 1]), a++), n = i = 0) : ((n + i === 0 || isNaN(o)) && c(), "i" === r[a + 1] || "I" === r[a + 1] ? (u.im += parseFloat((i % 2 ? "-" : "") + o), a++) : u.re += parseFloat((i % 2 ? "-" : "") + o), n = i = 0));
              }n + i > 0 && c();break;case "number":
              u.im = 0, u.re = e;break;default:
              c();}isNaN(u.re) || isNaN(u.im);
        };s.prototype = { re: 0, im: 0, sign: function sign() {
            var e = this.abs();return new s(this.re / e, this.im / e);
          }, add: function add(e, t) {
            return f(e, t), new s(this.re + u.re, this.im + u.im);
          }, sub: function sub(e, t) {
            return f(e, t), new s(this.re - u.re, this.im - u.im);
          }, mul: function mul(e, t) {
            return f(e, t), 0 === u.im && 0 === this.im ? new s(this.re * u.re, 0) : new s(this.re * u.re - this.im * u.im, this.re * u.im + this.im * u.re);
          }, div: function div(e, t) {
            f(e, t), e = this.re, t = this.im;var r,
                n,
                i = u.re,
                a = u.im;return 0 === i && 0 === a ? new s(0 !== e ? e / 0 : 0, 0 !== t ? t / 0 : 0) : 0 === a ? new s(e / i, t / i) : Math.abs(i) < Math.abs(a) ? (n = i / a, r = i * n + a, new s((e * n + t) / r, (t * n - e) / r)) : (n = a / i, r = a * n + i, new s((e + t * n) / r, (t - e * n) / r));
          }, pow: function pow(e, t) {
            if (f(e, t), e = this.re, t = this.im, 0 === e && 0 === t) return new s(0, 0);var r = Math.atan2(t, e),
                n = o(e, t);if (0 === u.im) {
              if (0 === t && e >= 0) return new s(Math.pow(e, u.re), 0);if (0 === e) switch (u.re % 4) {case 0:
                  return new s(Math.pow(t, u.re), 0);case 1:
                  return new s(0, Math.pow(t, u.re));case 2:
                  return new s(-Math.pow(t, u.re), 0);case 3:
                  return new s(0, -Math.pow(t, u.re));}
            }return e = Math.exp(u.re * n - u.im * r), t = u.im * n + u.re * r, new s(e * Math.cos(t), e * Math.sin(t));
          }, sqrt: function sqrt() {
            var e,
                t,
                r = this.re,
                n = this.im,
                i = this.abs();return r >= 0 && 0 === n ? new s(Math.sqrt(r), 0) : (e = r >= 0 ? .5 * Math.sqrt(2 * (i + r)) : Math.abs(n) / Math.sqrt(2 * (i - r)), t = 0 >= r ? .5 * Math.sqrt(2 * (i - r)) : Math.abs(n) / Math.sqrt(2 * (i + r)), new s(e, n >= 0 ? t : -t));
          }, exp: function exp() {
            var e = Math.exp(this.re);return 0 === this.im, new s(e * Math.cos(this.im), e * Math.sin(this.im));
          }, log: function log() {
            var e = this.re,
                t = this.im;return new s(o(e, t), Math.atan2(t, e));
          }, abs: function abs() {
            var e = Math.abs(this.re),
                t = Math.abs(this.im);return 3e3 > e && 3e3 > t ? Math.sqrt(e * e + t * t) : (t > e ? (e = t, t = this.re / this.im) : t = this.im / this.re, e * Math.sqrt(1 + t * t));
          }, arg: function arg() {
            return Math.atan2(this.im, this.re);
          }, sin: function sin() {
            var e = this.re,
                t = this.im;return new s(Math.sin(e) * Math.cosh(t), Math.cos(e) * Math.sinh(t));
          }, cos: function cos() {
            var e = this.re,
                t = this.im;return new s(Math.cos(e) * Math.cosh(t), -Math.sin(e) * Math.sinh(t));
          }, tan: function tan() {
            var e = 2 * this.re,
                t = 2 * this.im,
                r = Math.cos(e) + Math.cosh(t);return new s(Math.sin(e) / r, Math.sinh(t) / r);
          }, cot: function cot() {
            var e = 2 * this.re,
                t = 2 * this.im,
                r = Math.cos(e) - Math.cosh(t);return new s(-Math.sin(e) / r, Math.sinh(t) / r);
          }, sec: function sec() {
            var e = this.re,
                t = this.im,
                r = .5 * Math.cosh(2 * t) + .5 * Math.cos(2 * e);return new s(Math.cos(e) * Math.cosh(t) / r, Math.sin(e) * Math.sinh(t) / r);
          }, csc: function csc() {
            var e = this.re,
                t = this.im,
                r = .5 * Math.cosh(2 * t) - .5 * Math.cos(2 * e);return new s(Math.sin(e) * Math.cosh(t) / r, -Math.cos(e) * Math.sinh(t) / r);
          }, asin: function asin() {
            var e = this.re,
                t = this.im,
                r = new s(t * t - e * e + 1, -2 * e * t).sqrt(),
                n = new s(r.re - t, r.im + e).log();return new s(n.im, -n.re);
          }, acos: function acos() {
            var e = this.re,
                t = this.im,
                r = new s(t * t - e * e + 1, -2 * e * t).sqrt(),
                n = new s(r.re - t, r.im + e).log();return new s(Math.PI / 2 - n.im, n.re);
          }, atan: function atan() {
            var e = this.re,
                t = this.im;if (0 === e) {
              if (1 === t) return new s(0, 1 / 0);if (-1 === t) return new s(0, -(1 / 0));
            }var r = e * e + (1 - t) * (1 - t),
                n = new s((1 - t * t - e * e) / r, -2 * e / r).log();return new s(-.5 * n.im, .5 * n.re);
          }, acot: function acot() {
            var e = this.re,
                t = this.im;if (0 === t) return new s(Math.atan2(1, e), 0);var r = e * e + t * t;return 0 !== r ? new s(e / r, -t / r).atan() : new s(0 !== e ? e / 0 : 0, 0 !== t ? -t / 0 : 0).atan();
          }, asec: function asec() {
            var e = this.re,
                t = this.im;if (0 === e && 0 === t) return new s(0, 1 / 0);var r = e * e + t * t;return 0 !== r ? new s(e / r, -t / r).acos() : new s(0 !== e ? e / 0 : 0, 0 !== t ? -t / 0 : 0).acos();
          }, acsc: function acsc() {
            var e = this.re,
                t = this.im;if (0 === e && 0 === t) return new s(Math.PI / 2, 1 / 0);var r = e * e + t * t;return 0 !== r ? new s(e / r, -t / r).asin() : new s(0 !== e ? e / 0 : 0, 0 !== t ? -t / 0 : 0).asin();
          }, sinh: function sinh() {
            var e = this.re,
                t = this.im;return new s(Math.sinh(e) * Math.cos(t), Math.cosh(e) * Math.sin(t));
          }, cosh: function cosh() {
            var e = this.re,
                t = this.im;return new s(Math.cosh(e) * Math.cos(t), Math.sinh(e) * Math.sin(t));
          }, tanh: function tanh() {
            var e = 2 * this.re,
                t = 2 * this.im,
                r = Math.cosh(e) + Math.cos(t);return new s(Math.sinh(e) / r, Math.sin(t) / r);
          }, coth: function coth() {
            var e = 2 * this.re,
                t = 2 * this.im,
                r = Math.cosh(e) - Math.cos(t);return new s(Math.sinh(e) / r, -Math.sin(t) / r);
          }, csch: function csch() {
            var e = this.re,
                t = this.im,
                r = Math.cos(2 * t) - Math.cosh(2 * e);return new s(-2 * Math.sinh(e) * Math.cos(t) / r, 2 * Math.cosh(e) * Math.sin(t) / r);
          }, sech: function sech() {
            var e = this.re,
                t = this.im,
                r = Math.cos(2 * t) + Math.cosh(2 * e);return new s(2 * Math.cosh(e) * Math.cos(t) / r, -2 * Math.sinh(e) * Math.sin(t) / r);
          }, asinh: function asinh() {
            var e = this.im;this.im = -this.re, this.re = e;var t = this.asin();return this.re = -this.im, this.im = e, e = t.re, t.re = -t.im, t.im = e, t;
          }, acosh: function acosh() {
            var e,
                t = this.acos();return t.im <= 0 ? (e = t.re, t.re = -t.im, t.im = e) : (e = t.im, t.im = -t.re, t.re = e), t;
          }, atanh: function atanh() {
            var e = this.re,
                t = this.im,
                r = e > 1 && 0 === t,
                n = 1 - e,
                i = 1 + e,
                a = n * n + t * t,
                u = 0 !== a ? new s((i * n - t * t) / a, (t * n + i * t) / a) : new s(-1 !== e ? e / 0 : 0, 0 !== t ? t / 0 : 0),
                c = u.re;return u.re = o(u.re, u.im) / 2, u.im = Math.atan2(u.im, c) / 2, r && (u.im = -u.im), u;
          }, acoth: function acoth() {
            var e = this.re,
                t = this.im;if (0 === e && 0 === t) return new s(0, Math.PI / 2);var r = e * e + t * t;return 0 !== r ? new s(e / r, -t / r).atanh() : new s(0 !== e ? e / 0 : 0, 0 !== t ? -t / 0 : 0).atanh();
          }, acsch: function acsch() {
            var e = this.re,
                t = this.im;if (0 === t) return new s(0 !== e ? Math.log(e + Math.sqrt(e * e + 1)) : 1 / 0, 0);var r = e * e + t * t;return 0 !== r ? new s(e / r, -t / r).asinh() : new s(0 !== e ? e / 0 : 0, 0 !== t ? -t / 0 : 0).asinh();
          }, asech: function asech() {
            var e = this.re,
                t = this.im;if (0 === e && 0 === t) return new s(1 / 0, 0);var r = e * e + t * t;return 0 !== r ? new s(e / r, -t / r).acosh() : new s(0 !== e ? e / 0 : 0, 0 !== t ? -t / 0 : 0).acosh();
          }, inverse: function inverse() {
            var e = this.re,
                t = this.im,
                r = e * e + t * t;return new s(0 !== e ? e / r : 0, 0 !== t ? -t / r : 0);
          }, conjugate: function conjugate() {
            return new s(this.re, -this.im);
          }, neg: function neg() {
            return new s(-this.re, -this.im);
          }, ceil: function ceil(e) {
            return e = Math.pow(10, e || 0), new s(Math.ceil(this.re * e) / e, Math.ceil(this.im * e) / e);
          }, floor: function floor(e) {
            return e = Math.pow(10, e || 0), new s(Math.floor(this.re * e) / e, Math.floor(this.im * e) / e);
          }, round: function round(e) {
            return e = Math.pow(10, e || 0), new s(Math.round(this.re * e) / e, Math.round(this.im * e) / e);
          }, equals: function equals(e, t) {
            return f(e, t), Math.abs(u.re - this.re) <= s.EPSILON && Math.abs(u.im - this.im) <= s.EPSILON;
          }, clone: function clone() {
            return new s(this.re, this.im);
          }, toString: function toString() {
            var e = this.re,
                t = this.im,
                r = "";return isNaN(e) || isNaN(t) ? "NaN" : (0 !== e && (r += e), 0 !== t && (0 !== e ? r += 0 > t ? " - " : " + " : 0 > t && (r += "-"), t = Math.abs(t), 1 !== t && (r += t), r += "i"), r ? r : "0");
          }, toVector: function toVector() {
            return [this.re, this.im];
          }, valueOf: function valueOf() {
            return 0 === this.im ? this.re : null;
          }, isNaN: function (_isNaN) {
            function isNaN() {
              return _isNaN.apply(this, arguments);
            }

            isNaN.toString = function () {
              return _isNaN.toString();
            };

            return isNaN;
          }(function () {
            return isNaN(this.re) || isNaN(this.im);
          }) }, s.ZERO = new s(0, 0), s.ONE = new s(1, 0), s.I = new s(0, 1), s.PI = new s(Math.PI, 0), s.E = new s(Math.E, 0), s.EPSILON = 1e-16, r(30).amd ? (n = [], i = function () {
          return s;
        }.apply(t, n), !(void 0 !== i && (e.exports = i))) : e.exports = s;
      }(this);
    }).call(t, r(29)(e));
  }, function (e, t) {
    e.exports = function (e) {
      return e.webpackPolyfill || (e.deprecate = function () {}, e.paths = [], e.children = [], e.webpackPolyfill = 1), e;
    };
  }, function (e, t) {
    e.exports = function () {
      throw new Error("define cannot be used indirect");
    };
  }, function (e, t, r) {
    "use strict";
    function n(e, t, n, a) {
      var o = r(32),
          s = a("complex", { "": function _() {
          return e.Complex.ZERO;
        }, number: function number(t) {
          return new e.Complex(t, 0);
        }, "number, number": function numberNumber(t, r) {
          return new e.Complex(t, r);
        }, "BigNumber, BigNumber": function BigNumberBigNumber(t, r) {
          return new e.Complex(t.toNumber(), r.toNumber());
        }, Complex: function Complex(e) {
          return e.clone();
        }, string: function string(t) {
          return e.Complex(t);
        }, Object: function Object(t) {
          if ("re" in t && "im" in t) return new e.Complex(t.re, t.im);if ("r" in t && "phi" in t) return new e.Complex(t);throw new Error("Expected object with either properties re and im, or properties r and phi.");
        }, "Array | Matrix": function ArrayMatrix(e) {
          return i(e, s);
        } });return s.toTex = { 0: "0", 1: "\\left(${args[0]}\\right)", 2: "\\left(\\left(${args[0]}\\right)+" + o.symbols.i + "\\cdot\\left(${args[1]}\\right)\\right)" }, s;
    }var i = r(19);t.name = "complex", t.factory = n;
  }, function (e, t) {
    "use strict";
    t.symbols = { Alpha: "A", alpha: "\\alpha", Beta: "B", beta: "\\beta", Gamma: "\\Gamma", gamma: "\\gamma", Delta: "\\Delta", delta: "\\delta", Epsilon: "E", epsilon: "\\epsilon", varepsilon: "\\varepsilon", Zeta: "Z", zeta: "\\zeta", Eta: "H", eta: "\\eta", Theta: "\\Theta", theta: "\\theta", vartheta: "\\vartheta", Iota: "I", iota: "\\iota", Kappa: "K", kappa: "\\kappa", varkappa: "\\varkappa", Lambda: "\\Lambda", lambda: "\\lambda", Mu: "M", mu: "\\mu", Nu: "N", nu: "\\nu", Xi: "\\Xi", xi: "\\xi", Omicron: "O", omicron: "o", Pi: "\\Pi", pi: "\\pi", varpi: "\\varpi", Rho: "P", rho: "\\rho", varrho: "\\varrho", Sigma: "\\Sigma", sigma: "\\sigma", varsigma: "\\varsigma", Tau: "T", tau: "\\tau", Upsilon: "\\Upsilon", upsilon: "\\upsilon", Phi: "\\Phi", phi: "\\phi", varphi: "\\varphi", Chi: "X", chi: "\\chi", Psi: "\\Psi", psi: "\\psi", Omega: "\\Omega", omega: "\\omega", "true": "\\mathrm{True}", "false": "\\mathrm{False}", i: "i", inf: "\\infty", Inf: "\\infty", infinity: "\\infty", Infinity: "\\infty", oo: "\\infty", lim: "\\lim", undefined: "\\mathbf{?}" }, t.operators = { transpose: "^\\top", factorial: "!", pow: "^", dotPow: ".^\\wedge", unaryPlus: "+", unaryMinus: "-", bitNot: "~", not: "\\neg", multiply: "\\cdot", divide: "\\frac", dotMultiply: ".\\cdot", dotDivide: ".:", mod: "\\mod", add: "+", subtract: "-", to: "\\rightarrow", leftShift: "<<", rightArithShift: ">>", rightLogShift: ">>>", equal: "=", unequal: "\\neq", smaller: "<", larger: ">", smallerEq: "\\leq", largerEq: "\\geq", bitAnd: "\\&", bitXor: "\\underline{|}", bitOr: "|", and: "\\wedge", xor: "\\veebar", or: "\\vee" }, t.defaultTemplate = "\\mathrm{${name}}\\left(${args}\\right)";var r = { deg: "^\\circ" };t.toSymbol = function (e, n) {
      if (n = "undefined" == typeof n ? !1 : n) return r.hasOwnProperty(e) ? r[e] : "\\mathrm{" + e + "}";if (t.symbols.hasOwnProperty(e)) return t.symbols[e];if (-1 !== e.indexOf("_")) {
        var i = e.indexOf("_");return t.toSymbol(e.substring(0, i)) + "_{" + t.toSymbol(e.substring(i + 1)) + "}";
      }return e;
    };
  }, function (e, t, r) {
    e.exports = [r(34), r(36)];
  }, function (e, t, r) {
    function n(e, t, r, n) {
      return i;
    }var i = r(35);i.prototype.type = "Fraction", i.prototype.isFraction = !0, i.prototype.toJSON = function () {
      return { mathjs: "Fraction", n: this.s * this.n, d: this.d };
    }, i.fromJSON = function (e) {
      return new i(e);
    }, t.name = "Fraction", t.path = "type", t.factory = n;
  }, function (e, t, r) {
    var n, i;(function (e) {
      /**
      * @license Fraction.js v3.3.1 09/09/2015
      * http://www.xarg.org/2014/03/precise-calculations-in-javascript/
      *
      * Copyright (c) 2015, Robert Eisele (robert@xarg.org)
      * Dual licensed under the MIT or GPL Version 2 licenses.
      **/
      !function (a) {
        "use strict";
        function o(e, t) {
          return isNaN(e = parseInt(e, 10)) && s(), e * t;
        }function s() {
          throw "Invalid Param";
        }function u(e, t) {
          return this instanceof u ? (l(e, t), e = u.REDUCE ? d(f.d, f.n) : 1, this.s = f.s, this.n = f.n / e, void (this.d = f.d / e)) : new u(e, t);
        }var c = 2e3,
            f = { s: 1, n: 0, d: 1 },
            l = function l(e, t) {
          var r,
              n = 0,
              i = 1,
              a = 1,
              u = 0,
              c = 0,
              l = 0,
              p = 1,
              h = 1,
              m = 0,
              d = 1,
              g = 1,
              v = 1,
              y = 1e7;if (void 0 === e || null === e) ;else if (void 0 !== t) n = e, i = t, a = n * i;else switch (typeof e === "undefined" ? "undefined" : _typeof(e)) {case "object":
              "d" in e && "n" in e ? (n = e.n, i = e.d, "s" in e && (n *= e.s)) : 0 in e ? (n = e[0], 1 in e && (i = e[1])) : s(), a = n * i;break;case "number":
              if (0 > e && (a = e, e = -e), e % 1 === 0) n = e;else if (e > 0) {
                for (e >= 1 && (h = Math.pow(10, Math.floor(1 + Math.log(e) / Math.LN10)), e /= h); y >= d && y >= v;) {
                  if (r = (m + g) / (d + v), e === r) {
                    y >= d + v ? (n = m + g, i = d + v) : v > d ? (n = g, i = v) : (n = m, i = d);break;
                  }e > r ? (m += g, d += v) : (g += m, v += d), d > y ? (n = g, i = v) : (n = m, i = d);
                }n *= h;
              } else (isNaN(e) || isNaN(t)) && (i = n = NaN);break;case "string":
              if (d = e.match(/\d+|./g), "-" === d[m] ? (a = -1, m++) : "+" === d[m] && m++, d.length === m + 1 ? c = o(d[m++], a) : "." === d[m + 1] || "." === d[m] ? ("." !== d[m] && (u = o(d[m++], a)), m++, (m + 1 === d.length || "(" === d[m + 1] && ")" === d[m + 3] || "'" === d[m + 1] && "'" === d[m + 3]) && (c = o(d[m], a), p = Math.pow(10, d[m].length), m++), ("(" === d[m] && ")" === d[m + 2] || "'" === d[m] && "'" === d[m + 2]) && (l = o(d[m + 1], a), h = Math.pow(10, d[m + 1].length) - 1, m += 3)) : "/" === d[m + 1] || ":" === d[m + 1] ? (c = o(d[m], a), p = o(d[m + 2], 1), m += 3) : "/" === d[m + 3] && " " === d[m + 1] && (u = o(d[m], a), c = o(d[m + 2], a), p = o(d[m + 4], 1), m += 5), d.length <= m) {
                i = p * h, a = n = l + i * u + h * c;break;
              }default:
              s();}if (0 === i) throw "DIV/0";f.s = 0 > a ? -1 : 1, f.n = Math.abs(n), f.d = Math.abs(i);
        },
            p = function p(e, t, r) {
          for (var n = 1; t > 0; e = e * e % r, t >>= 1) {
            1 & t && (n = n * e % r);
          }return n;
        },
            h = function h(e, t) {
          for (; t % 2 === 0; t /= 2) {}for (; t % 5 === 0; t /= 5) {}if (1 === t) return 0;for (var r = 10 % t, n = 1; 1 !== r; n++) {
            if (r = 10 * r % t, n > c) return 0;
          }return n;
        },
            m = function m(e, t, r) {
          for (var n = 1, i = p(10, r, t), a = 0; 300 > a; a++) {
            if (n === i) return a;n = 10 * n % t, i = 10 * i % t;
          }return 0;
        },
            d = function d(e, t) {
          if (!e) return t;if (!t) return e;for (;;) {
            if (e %= t, !e) return t;if (t %= e, !t) return e;
          }
        };u.REDUCE = 1, u.prototype = { s: 1, n: 0, d: 1, abs: function abs() {
            return new u(this.n, this.d);
          }, neg: function neg() {
            return new u(-this.s * this.n, this.d);
          }, add: function add(e, t) {
            return l(e, t), new u(this.s * this.n * f.d + f.s * this.d * f.n, this.d * f.d);
          }, sub: function sub(e, t) {
            return l(e, t), new u(this.s * this.n * f.d - f.s * this.d * f.n, this.d * f.d);
          }, mul: function mul(e, t) {
            return l(e, t), new u(this.s * f.s * this.n * f.n, this.d * f.d);
          }, div: function div(e, t) {
            return l(e, t), new u(this.s * f.s * this.n * f.d, this.d * f.n);
          }, clone: function clone() {
            return new u(this);
          }, mod: function mod(e, t) {
            return isNaN(this.n) || isNaN(this.d) ? new u(NaN) : void 0 === e ? new u(this.s * this.n % this.d, 1) : (l(e, t), 0 === f.n && 0 === this.d && u(0, 0), new u(this.s * f.d * this.n % (f.n * this.d), f.d * this.d));
          }, gcd: function gcd(e, t) {
            return l(e, t), new u(d(f.n, this.n), f.d * this.d / d(f.d, this.d));
          }, lcm: function lcm(e, t) {
            return l(e, t), 0 === f.n && 0 === this.n ? new u() : new u(f.n * this.n / d(f.n, this.n), d(f.d, this.d));
          }, ceil: function ceil(e) {
            return e = Math.pow(10, e || 0), isNaN(this.n) || isNaN(this.d) ? new u(NaN) : new u(Math.ceil(e * this.s * this.n / this.d), e);
          }, floor: function floor(e) {
            return e = Math.pow(10, e || 0), isNaN(this.n) || isNaN(this.d) ? new u(NaN) : new u(Math.floor(e * this.s * this.n / this.d), e);
          }, round: function round(e) {
            return e = Math.pow(10, e || 0), isNaN(this.n) || isNaN(this.d) ? new u(NaN) : new u(Math.round(e * this.s * this.n / this.d), e);
          }, inverse: function inverse() {
            return new u(this.s * this.d, this.n);
          }, pow: function pow(e) {
            return 0 > e ? new u(Math.pow(this.s * this.d, -e), Math.pow(this.n, -e)) : new u(Math.pow(this.s * this.n, e), Math.pow(this.d, e));
          }, equals: function equals(e, t) {
            return l(e, t), this.s * this.n * f.d === f.s * f.n * this.d;
          }, compare: function compare(e, t) {
            l(e, t);var r = this.s * this.n * f.d - f.s * f.n * this.d;return (r > 0) - (0 > r);
          }, divisible: function divisible(e, t) {
            return l(e, t), !(!(f.n * this.d) || this.n * f.d % (f.n * this.d));
          }, valueOf: function valueOf() {
            return this.s * this.n / this.d;
          }, toFraction: function toFraction(e) {
            var t,
                r = "",
                n = this.n,
                i = this.d;return this.s < 0 && (r += "-"), 1 === i ? r += n : (e && (t = Math.floor(n / i)) > 0 && (r += t, r += " ", n %= i), r += n, r += "/", r += i), r;
          }, toLatex: function toLatex(e) {
            var t,
                r = "",
                n = this.n,
                i = this.d;return this.s < 0 && (r += "-"), 1 === i ? r += n : (e && (t = Math.floor(n / i)) > 0 && (r += t, n %= i), r += "\\frac{", r += n, r += "}{", r += i, r += "}"), r;
          }, toContinued: function toContinued() {
            var e,
                t = this.n,
                r = this.d,
                n = [];do {
              n.push(Math.floor(t / r)), e = t % r, t = r, r = e;
            } while (1 !== t);return n;
          }, toString: function toString() {
            var e,
                t = this.n,
                r = this.d;if (isNaN(t) || isNaN(r)) return "NaN";u.REDUCE || (e = d(t, r), t /= e, r /= e);for (var n = String(t).split(""), i = 0, a = [~this.s ? "" : "-", "", ""], o = "", s = h(t, r), c = m(t, r, s), f = -1, l = 1, p = 15 + s + c + n.length, g = 0; p > g; g++, i *= 10) {
              if (g < n.length ? i += Number(n[g]) : (l = 2, f++), s > 0) if (f === c) a[l] += o + "(", o = "";else if (f === s + c) {
                a[l] += o + ")";break;
              }i >= r ? (a[l] += o + (i / r | 0), o = "", i %= r) : l > 1 ? o += "0" : a[l] && (a[l] += "0");
            }return a[0] += a[1] || "0", a[2] ? a[0] + "." + a[2] : a[0];
          } }, r(30).amd ? (n = [], i = function () {
          return u;
        }.apply(t, n), !(void 0 !== i && (e.exports = i))) : e.exports = u;
      }(this);
    }).call(t, r(29)(e));
  }, function (e, t, r) {
    "use strict";
    function n(e, t, r, n) {
      var a = n("fraction", { number: function number(t) {
          if (!isFinite(t) || isNaN(t)) throw new Error(t + " cannot be represented as a fraction");return new e.Fraction(t);
        }, string: function string(t) {
          return new e.Fraction(t);
        }, "number, number": function numberNumber(t, r) {
          return new e.Fraction(t, r);
        }, BigNumber: function BigNumber(t) {
          return new e.Fraction(t.toString());
        }, Fraction: function Fraction(e) {
          return e;
        }, Object: function Object(t) {
          return new e.Fraction(t);
        }, "Array | Matrix": function ArrayMatrix(e) {
          return i(e, a);
        } });return a;
    }var i = r(19);t.name = "fraction", t.factory = n;
  }, function (e, t, r) {
    e.exports = [r(38), r(46), r(47), r(50), r(59), r(65), r(66), r(67), r(68), r(52), r(69)];
  }, function (e, t, r) {
    "use strict";
    function n(e, t, r, n) {
      function i() {
        if (!(this instanceof i)) throw new SyntaxError("Constructor must be called with the new operator");
      }return i.prototype.type = "Matrix", i.prototype.isMatrix = !0, i.storage = function (e) {
        if (!o(e)) throw new TypeError("format must be a string value");var t = i._storage[e];if (!t) throw new SyntaxError("Unsupported matrix storage format: " + e);return t;
      }, i._storage = {}, i.prototype.storage = function () {
        throw new Error("Cannot invoke storage on a Matrix interface");
      }, i.prototype.datatype = function () {
        throw new Error("Cannot invoke datatype on a Matrix interface");
      }, i.prototype.create = function (e, t) {
        throw new Error("Cannot invoke create on a Matrix interface");
      }, i.prototype.subset = function (e, t, r) {
        throw new Error("Cannot invoke subset on a Matrix interface");
      }, i.prototype.get = function (e) {
        throw new Error("Cannot invoke get on a Matrix interface");
      }, i.prototype.set = function (e, t, r) {
        throw new Error("Cannot invoke set on a Matrix interface");
      }, i.prototype.resize = function (e, t) {
        throw new Error("Cannot invoke resize on a Matrix interface");
      }, i.prototype.clone = function () {
        throw new Error("Cannot invoke clone on a Matrix interface");
      }, i.prototype.size = function () {
        throw new Error("Cannot invoke size on a Matrix interface");
      }, i.prototype.map = function (e, t) {
        throw new Error("Cannot invoke map on a Matrix interface");
      }, i.prototype.forEach = function (e) {
        throw new Error("Cannot invoke forEach on a Matrix interface");
      }, i.prototype.toArray = function () {
        throw new Error("Cannot invoke toArray on a Matrix interface");
      }, i.prototype.valueOf = function () {
        throw new Error("Cannot invoke valueOf on a Matrix interface");
      }, i.prototype.format = function (e) {
        throw new Error("Cannot invoke format on a Matrix interface");
      }, i.prototype.toString = function () {
        throw new Error("Cannot invoke toString on a Matrix interface");
      }, i;
    }var i = r(39),
        a = i.string,
        o = a.isString;t.name = "Matrix", t.path = "type", t.factory = n;
  }, function (e, t, r) {
    "use strict";
    t.array = r(40), t["boolean"] = r(44), t["function"] = r(45), t.number = r(6), t.object = r(3), t.string = r(23), t.types = r(41), t.emitter = r(8);
  }, function (e, t, r) {
    "use strict";
    function n(e, t, r) {
      var i,
          a = e.length;if (a != t[r]) throw new c(a, t[r]);if (r < t.length - 1) {
        var o = r + 1;for (i = 0; a > i; i++) {
          var s = e[i];if (!Array.isArray(s)) throw new c(t.length - 1, t.length, "<");n(e[i], t, o);
        }
      } else for (i = 0; a > i; i++) {
        if (Array.isArray(e[i])) throw new c(t.length + 1, t.length, ">");
      }
    }function i(e, r, n, a) {
      var o,
          s,
          u = e.length,
          c = r[n],
          f = Math.min(u, c);if (e.length = c, n < r.length - 1) {
        var l = n + 1;for (o = 0; f > o; o++) {
          s = e[o], Array.isArray(s) || (s = [s], e[o] = s), i(s, r, l, a);
        }for (o = f; c > o; o++) {
          s = [], e[o] = s, i(s, r, l, a);
        }
      } else {
        for (o = 0; f > o; o++) {
          for (; Array.isArray(e[o]);) {
            e[o] = e[o][0];
          }
        }if (a !== t.UNINITIALIZED) for (o = f; c > o; o++) {
          e[o] = a;
        }
      }
    }function a(e, t, r) {
      var n, i;if (t > r) {
        var o = r + 1;for (n = 0, i = e.length; i > n; n++) {
          e[n] = a(e[n], t, o);
        }
      } else for (; Array.isArray(e);) {
        e = e[0];
      }return e;
    }function o(e, t, r) {
      var n, i;if (Array.isArray(e)) {
        var a = r + 1;for (n = 0, i = e.length; i > n; n++) {
          e[n] = o(e[n], t, a);
        }
      } else for (var s = r; t > s; s++) {
        e = [e];
      }return e;
    }var s = r(6),
        u = r(23),
        c = (r(3), r(41), r(42)),
        f = r(43);t.size = function (e) {
      for (var t = []; Array.isArray(e);) {
        t.push(e.length), e = e[0];
      }return t;
    }, t.validate = function (e, t) {
      var r = 0 == t.length;if (r) {
        if (Array.isArray(e)) throw new c(e.length, 0);
      } else n(e, t, 0);
    }, t.validateIndex = function (e, t) {
      if (!s.isNumber(e) || !s.isInteger(e)) throw new TypeError("Index must be an integer (value: " + e + ")");if (0 > e || "number" == typeof t && e >= t) throw new f(e, t);
    }, t.UNINITIALIZED = {}, t.resize = function (e, t, r) {
      if (!Array.isArray(e) || !Array.isArray(t)) throw new TypeError("Array expected");if (0 === t.length) throw new Error("Resizing to scalar is not supported");t.forEach(function (e) {
        if (!s.isNumber(e) || !s.isInteger(e) || 0 > e) throw new TypeError("Invalid size, must contain positive integers (size: " + u.format(t) + ")");
      });var n = void 0 !== r ? r : 0;return i(e, t, 0, n), e;
    }, t.squeeze = function (e, r) {
      for (var n = r || t.size(e); Array.isArray(e) && 1 === e.length;) {
        e = e[0], n.shift();
      }for (var i = n.length; 1 === n[i - 1];) {
        i--;
      }return i < n.length && (e = a(e, i, 0), n.length = i), e;
    }, t.unsqueeze = function (e, r, n, i) {
      var a = i || t.size(e);if (n) for (var s = 0; n > s; s++) {
        e = [e], a.unshift(1);
      }for (e = o(e, r, 0); a.length < r;) {
        a.push(1);
      }return e;
    }, t.flatten = function (e) {
      if (!Array.isArray(e)) return e;var t = [];return e.forEach(function r(e) {
        Array.isArray(e) ? e.forEach(r) : t.push(e);
      }), t;
    }, t.isArray = Array.isArray;
  }, function (e, t) {
    "use strict";
    t.type = function (e) {
      var t = typeof e === "undefined" ? "undefined" : _typeof(e);return "object" === t ? null === e ? "null" : e instanceof Boolean ? "boolean" : e instanceof Number ? "number" : e instanceof String ? "string" : Array.isArray(e) ? "Array" : e instanceof Date ? "Date" : e instanceof RegExp ? "RegExp" : "Object" : "function" === t ? "Function" : t;
    }, t.isScalar = function (e) {
      return !(e && e.isMatrix || Array.isArray(e));
    };
  }, function (e, t) {
    "use strict";
    function r(e, t, n) {
      if (!(this instanceof r)) throw new SyntaxError("Constructor must be called with the new operator");this.actual = e, this.expected = t, this.relation = n, this.message = "Dimension mismatch (" + (Array.isArray(e) ? "[" + e.join(", ") + "]" : e) + " " + (this.relation || "!=") + " " + (Array.isArray(t) ? "[" + t.join(", ") + "]" : t) + ")", this.stack = new Error().stack;
    }r.prototype = new RangeError(), r.prototype.constructor = RangeError, r.prototype.name = "DimensionError", r.prototype.isDimensionError = !0, e.exports = r;
  }, function (e, t) {
    "use strict";
    function r(e, t, n) {
      if (!(this instanceof r)) throw new SyntaxError("Constructor must be called with the new operator");this.index = e, arguments.length < 3 ? (this.min = 0, this.max = t) : (this.min = t, this.max = n), void 0 !== this.min && this.index < this.min ? this.message = "Index out of range (" + this.index + " < " + this.min + ")" : void 0 !== this.max && this.index >= this.max ? this.message = "Index out of range (" + this.index + " > " + (this.max - 1) + ")" : this.message = "Index out of range (" + this.index + ")", this.stack = new Error().stack;
    }r.prototype = new RangeError(), r.prototype.constructor = RangeError, r.prototype.name = "IndexError", r.prototype.isIndexError = !0, e.exports = r;
  }, function (e, t) {
    "use strict";
    t.isBoolean = function (e) {
      return "boolean" == typeof e;
    };
  }, function (e, t) {
    t.memoize = function (e, t) {
      return function r() {
        "object" != _typeof(r.cache) && (r.cache = {});for (var n = [], i = 0; i < arguments.length; i++) {
          n[i] = arguments[i];
        }var a = t ? t(n) : JSON.stringify(n);return a in r.cache ? r.cache[a] : r.cache[a] = e.apply(e, n);
      };
    }, t.maxArgumentCount = function (e) {
      return Object.keys(e.signatures || {}).reduce(function (e, t) {
        var r = (t.match(/,/g) || []).length + 1;return Math.max(e, r);
      }, -1);
    };
  }, function (e, t, r) {
    "use strict";
    function n(e, t, n, c) {
      function d(e, t) {
        if (!(this instanceof d)) throw new SyntaxError("Constructor must be called with the new operator");if (t && !h(t)) throw new Error("Invalid datatype: " + t);if (e && e.isMatrix === !0) "DenseMatrix" === e.type ? (this._data = u.clone(e._data), this._size = u.clone(e._size), this._datatype = t || e._datatype) : (this._data = e.toArray(), this._size = e.size(), this._datatype = t || e._datatype);else if (e && f(e.data) && f(e.size)) this._data = e.data, this._size = e.size, this._datatype = t || e.datatype;else if (f(e)) this._data = w(e), this._size = s.size(this._data), s.validate(this._data, this._size), this._datatype = t;else {
          if (e) throw new TypeError("Unsupported type of data (" + i.types.type(e) + ")");this._data = [], this._size = [0], this._datatype = t;
        }
      }function g(e, t) {
        if (!t || t.isIndex !== !0) throw new TypeError("Invalid index");var r = t.isScalar();if (r) return e.get(t.min());var n = t.size();if (n.length != e._size.length) throw new a(n.length, e._size.length);for (var i = t.min(), o = t.max(), s = 0, u = e._size.length; u > s; s++) {
          m(i[s], e._size[s]), m(o[s], e._size[s]);
        }return new d(v(e._data, t, n.length, 0), e._datatype);
      }function v(e, t, r, n) {
        var i = n == r - 1,
            a = t.dimension(n);return i ? a.map(function (t) {
          return e[t];
        }).valueOf() : a.map(function (i) {
          var a = e[i];return v(a, t, r, n + 1);
        }).valueOf();
      }function y(e, t, r, n) {
        if (!t || t.isIndex !== !0) throw new TypeError("Invalid index");var i,
            o = t.size(),
            c = t.isScalar();if (r && r.isMatrix === !0 ? (i = r.size(), r = r.valueOf()) : i = s.size(r), c) {
          if (0 !== i.length) throw new TypeError("Scalar expected");e.set(t.min(), r, n);
        } else {
          if (o.length < e._size.length) throw new a(o.length, e._size.length, "<");if (i.length < o.length) {
            for (var f = 0, l = 0; 1 === o[f] && 1 === i[f];) {
              f++;
            }for (; 1 === o[f];) {
              l++, f++;
            }r = s.unsqueeze(r, o.length, l, i);
          }if (!u.deepEqual(o, i)) throw new a(o, i, ">");var p = t.max().map(function (e) {
            return e + 1;
          });b(e, p, n);var h = o.length,
              m = 0;x(e._data, t, r, h, m);
        }return e;
      }function x(e, t, r, n, i) {
        var a = i == n - 1,
            o = t.dimension(i);a ? o.forEach(function (t, n) {
          m(t), e[t] = r[n[0]];
        }) : o.forEach(function (a, o) {
          m(a), x(e[a], t, r[o[0]], n, i + 1);
        });
      }function b(e, t, r) {
        for (var n = e._size.slice(0), i = !1; n.length < t.length;) {
          n.push(0), i = !0;
        }for (var a = 0, o = t.length; o > a; a++) {
          t[a] > n[a] && (n[a] = t[a], i = !0);
        }i && E(e, n, r);
      }function w(e) {
        for (var t = 0, r = e.length; r > t; t++) {
          var n = e[t];f(n) ? e[t] = w(n) : n && n.isMatrix === !0 && (e[t] = w(n.valueOf()));
        }return e;
      }var N = n(r(38));d.prototype = new N(), d.prototype.type = "DenseMatrix", d.prototype.isDenseMatrix = !0, d.prototype.storage = function () {
        return "dense";
      }, d.prototype.datatype = function () {
        return this._datatype;
      }, d.prototype.create = function (e, t) {
        return new d(e, t);
      }, d.prototype.subset = function (e, t, r) {
        switch (arguments.length) {case 1:
            return g(this, e);case 2:case 3:
            return y(this, e, t, r);default:
            throw new SyntaxError("Wrong number of arguments");}
      }, d.prototype.get = function (e) {
        if (!f(e)) throw new TypeError("Array expected");if (e.length != this._size.length) throw new a(e.length, this._size.length);for (var t = 0; t < e.length; t++) {
          m(e[t], this._size[t]);
        }for (var r = this._data, n = 0, i = e.length; i > n; n++) {
          var o = e[n];m(o, r.length), r = r[o];
        }return r;
      }, d.prototype.set = function (e, t, r) {
        if (!f(e)) throw new TypeError("Array expected");if (e.length < this._size.length) throw new a(e.length, this._size.length, "<");var n,
            i,
            o,
            s = e.map(function (e) {
          return e + 1;
        });b(this, s, r);var u = this._data;for (n = 0, i = e.length - 1; i > n; n++) {
          o = e[n], m(o, u.length), u = u[o];
        }return o = e[e.length - 1], m(o, u.length), u[o] = t, this;
      }, d.prototype.resize = function (e, t, r) {
        if (!f(e)) throw new TypeError("Array expected");var n = r ? this.clone() : this;return E(n, e, t);
      };var E = function E(e, t, r) {
        if (0 === t.length) {
          for (var n = e._data; f(n);) {
            n = n[0];
          }return n;
        }return e._size = t.slice(0), e._data = s.resize(e._data, e._size, r), e;
      };return d.prototype.clone = function () {
        var e = new d({ data: u.clone(this._data), size: u.clone(this._size), datatype: this._datatype });return e;
      }, d.prototype.size = function () {
        return this._size.slice(0);
      }, d.prototype.map = function (e) {
        var t = this,
            r = function r(n, i) {
          return f(n) ? n.map(function (e, t) {
            return r(e, i.concat(t));
          }) : e(n, i, t);
        };return new d({ data: r(this._data, []), size: u.clone(this._size), datatype: this._datatype });
      }, d.prototype.forEach = function (e) {
        var t = this,
            r = function r(n, i) {
          f(n) ? n.forEach(function (e, t) {
            r(e, i.concat(t));
          }) : e(n, i, t);
        };r(this._data, []);
      }, d.prototype.toArray = function () {
        return u.clone(this._data);
      }, d.prototype.valueOf = function () {
        return this._data;
      }, d.prototype.format = function (e) {
        return o.format(this._data, e);
      }, d.prototype.toString = function () {
        return o.format(this._data);
      }, d.prototype.toJSON = function () {
        return { mathjs: "DenseMatrix", data: this._data, size: this._size, datatype: this._datatype };
      }, d.prototype.diagonal = function (e) {
        if (e) {
          if (e.isBigNumber === !0 && (e = e.toNumber()), !l(e) || !p(e)) throw new TypeError("The parameter k must be an integer number");
        } else e = 0;for (var t = e > 0 ? e : 0, r = 0 > e ? -e : 0, n = this._size[0], i = this._size[1], a = Math.min(n - r, i - t), o = [], s = 0; a > s; s++) {
          o[s] = this._data[s + r][s + t];
        }return new d({ data: o, size: [a], datatype: this._datatype });
      }, d.diagonal = function (t, r, n, i, a) {
        if (!f(t)) throw new TypeError("Array expected, size parameter");if (2 !== t.length) throw new Error("Only two dimensions matrix are supported");if (t = t.map(function (e) {
          if (e && e.isBigNumber === !0 && (e = e.toNumber()), !l(e) || !p(e) || 1 > e) throw new Error("Size values must be positive integers");return e;
        }), n) {
          if (n && n.isBigNumber === !0 && (n = n.toNumber()), !l(n) || !p(n)) throw new TypeError("The parameter k must be an integer number");
        } else n = 0;i && h(a) && (i = c.convert(i, a));var o,
            u = n > 0 ? n : 0,
            m = 0 > n ? -n : 0,
            g = t[0],
            v = t[1],
            y = Math.min(g - m, v - u);if (f(r)) {
          if (r.length !== y) throw new Error("Invalid value array length");o = function o(e) {
            return r[e];
          };
        } else if (r && r.isMatrix === !0) {
          var x = r.size();if (1 !== x.length || x[0] !== y) throw new Error("Invalid matrix length");o = function o(e) {
            return r.get([e]);
          };
        } else o = function o() {
          return r;
        };i || (i = o(0) && o(0).isBigNumber === !0 ? new e.BigNumber(0) : 0);var b = [];if (t.length > 0) {
          b = s.resize(b, t, i);for (var w = 0; y > w; w++) {
            b[w + m][w + u] = o(w);
          }
        }return new d({ data: b, size: [g, v] });
      }, d.fromJSON = function (e) {
        return new d(e);
      }, d.prototype.swapRows = function (e, t) {
        if (!(l(e) && p(e) && l(t) && p(t))) throw new Error("Row index must be positive integers");if (2 !== this._size.length) throw new Error("Only two dimensional matrix is supported");return m(e, this._size[0]), m(t, this._size[0]), d._swapRows(e, t, this._data), this;
      }, d._swapRows = function (e, t, r) {
        var n = r[e];r[e] = r[t], r[t] = n;
      }, e.Matrix._storage.dense = d, e.Matrix._storage["default"] = d, d;
    }var i = r(39),
        a = r(42),
        o = i.string,
        s = i.array,
        u = i.object,
        c = i.number,
        f = Array.isArray,
        l = c.isNumber,
        p = c.isInteger,
        h = o.isString,
        m = s.validateIndex;t.name = "DenseMatrix", t.path = "type", t.factory = n, t.lazy = !1;
  }, function (e, t, r) {
    "use strict";
    function n(e, t, n, d) {
      function g(e, t) {
        if (!(this instanceof g)) throw new SyntaxError("Constructor must be called with the new operator");if (t && !h(t)) throw new Error("Invalid datatype: " + t);if (e && e.isMatrix === !0) x(this, e, t);else if (e && f(e.index) && f(e.ptr) && f(e.size)) this._values = e.values, this._index = e.index, this._ptr = e.ptr, this._size = e.size, this._datatype = t || e.datatype;else if (f(e)) b(this, e, t);else {
          if (e) throw new TypeError("Unsupported type of data (" + i.types.type(e) + ")");this._values = [], this._index = [], this._ptr = [0], this._size = [0, 0], this._datatype = t;
        }
      }var v = n(r(38)),
          y = n(r(48)),
          x = function x(e, t, r) {
        "SparseMatrix" === t.type ? (e._values = t._values ? s.clone(t._values) : void 0, e._index = s.clone(t._index), e._ptr = s.clone(t._ptr), e._size = s.clone(t._size), e._datatype = r || t._datatype) : b(e, t.valueOf(), r || t._datatype);
      },
          b = function b(e, t, r) {
        e._values = [], e._index = [], e._ptr = [], e._datatype = r;var n = t.length,
            i = 0,
            a = y,
            o = 0;if (h(r) && (a = d.find(y, [r, r]) || y, o = d.convert(0, r)), n > 0) {
          var s = 0;do {
            e._ptr.push(e._index.length);for (var u = 0; n > u; u++) {
              var c = t[u];if (f(c)) {
                if (0 === s && i < c.length && (i = c.length), s < c.length) {
                  var l = c[s];a(l, o) || (e._values.push(l), e._index.push(u));
                }
              } else 0 === s && 1 > i && (i = 1), a(c, o) || (e._values.push(c), e._index.push(u));
            }s++;
          } while (i > s);
        }e._ptr.push(e._index.length), e._size = [n, i];
      };g.prototype = new v(), g.prototype.type = "SparseMatrix", g.prototype.isSparseMatrix = !0, g.prototype.storage = function () {
        return "sparse";
      }, g.prototype.datatype = function () {
        return this._datatype;
      }, g.prototype.create = function (e, t) {
        return new g(e, t);
      }, g.prototype.density = function () {
        var e = this._size[0],
            t = this._size[1];return 0 !== e && 0 !== t ? this._index.length / (e * t) : 0;
      }, g.prototype.subset = function (e, t, r) {
        if (!this._values) throw new Error("Cannot invoke subset on a Pattern only matrix");switch (arguments.length) {case 1:
            return w(this, e);case 2:case 3:
            return N(this, e, t, r);default:
            throw new SyntaxError("Wrong number of arguments");}
      };var w = function w(e, t) {
        if (!t || t.isIndex !== !0) throw new TypeError("Invalid index");var r = t.isScalar();if (r) return e.get(t.min());var n = t.size();if (n.length != e._size.length) throw new a(n.length, e._size.length);var i,
            o,
            s,
            u,
            c = t.min(),
            f = t.max();for (i = 0, o = e._size.length; o > i; i++) {
          m(c[i], e._size[i]), m(f[i], e._size[i]);
        }var l = e._values,
            p = e._index,
            h = e._ptr,
            d = t.dimension(0),
            v = t.dimension(1),
            y = [],
            x = [];d.forEach(function (e, t) {
          x[e] = t[0], y[e] = !0;
        });var b = l ? [] : void 0,
            w = [],
            N = [];return v.forEach(function (e) {
          for (N.push(w.length), s = h[e], u = h[e + 1]; u > s; s++) {
            i = p[s], y[i] === !0 && (w.push(x[i]), b && b.push(l[s]));
          }
        }), N.push(w.length), new g({ values: b, index: w, ptr: N, size: n, datatype: e._datatype });
      },
          N = function N(e, t, r, n) {
        if (!t || t.isIndex !== !0) throw new TypeError("Invalid index");var i,
            u = t.size(),
            c = t.isScalar();if (r && r.isMatrix === !0 ? (i = r.size(), r = r.toArray()) : i = o.size(r), c) {
          if (0 !== i.length) throw new TypeError("Scalar expected");e.set(t.min(), r, n);
        } else {
          if (1 !== u.length && 2 !== u.length) throw new a(u.length, e._size.length, "<");if (i.length < u.length) {
            for (var f = 0, l = 0; 1 === u[f] && 1 === i[f];) {
              f++;
            }for (; 1 === u[f];) {
              l++, f++;
            }r = o.unsqueeze(r, u.length, l, i);
          }if (!s.deepEqual(u, i)) throw new a(u, i, ">");for (var p = t.min()[0], h = t.min()[1], m = i[0], d = i[1], g = 0; m > g; g++) {
            for (var v = 0; d > v; v++) {
              var y = r[g][v];e.set([g + p, v + h], y, n);
            }
          }
        }return e;
      };g.prototype.get = function (e) {
        if (!f(e)) throw new TypeError("Array expected");if (e.length != this._size.length) throw new a(e.length, this._size.length);if (!this._values) throw new Error("Cannot invoke get on a Pattern only matrix");var t = e[0],
            r = e[1];m(t, this._size[0]), m(r, this._size[1]);var n = E(t, this._ptr[r], this._ptr[r + 1], this._index);return n < this._ptr[r + 1] && this._index[n] === t ? this._values[n] : 0;
      }, g.prototype.set = function (e, t, r) {
        if (!f(e)) throw new TypeError("Array expected");if (e.length != this._size.length) throw new a(e.length, this._size.length);if (!this._values) throw new Error("Cannot invoke set on a Pattern only matrix");var n = e[0],
            i = e[1],
            o = this._size[0],
            s = this._size[1],
            u = y,
            c = 0;h(this._datatype) && (u = d.find(y, [this._datatype, this._datatype]) || y, c = d.convert(0, this._datatype)), (n > o - 1 || i > s - 1) && (O(this, Math.max(n + 1, o), Math.max(i + 1, s), r), o = this._size[0], s = this._size[1]), m(n, o), m(i, s);var l = E(n, this._ptr[i], this._ptr[i + 1], this._index);return l < this._ptr[i + 1] && this._index[l] === n ? u(t, c) ? M(l, i, this._values, this._index, this._ptr) : this._values[l] = t : A(l, n, i, t, this._values, this._index, this._ptr), this;
      };var E = function E(e, t, r, n) {
        if (r - t === 0) return r;for (var i = t; r > i; i++) {
          if (n[i] === e) return i;
        }return t;
      },
          M = function M(e, t, r, n, i) {
        r.splice(e, 1), n.splice(e, 1);for (var a = t + 1; a < i.length; a++) {
          i[a]--;
        }
      },
          A = function A(e, t, r, n, i, a, o) {
        i.splice(e, 0, n), a.splice(e, 0, t);for (var s = r + 1; s < o.length; s++) {
          o[s]++;
        }
      };g.prototype.resize = function (e, t, r) {
        if (!f(e)) throw new TypeError("Array expected");if (2 !== e.length) throw new Error("Only two dimensions matrix are supported");e.forEach(function (t) {
          if (!c.isNumber(t) || !c.isInteger(t) || 0 > t) throw new TypeError("Invalid size, must contain positive integers (size: " + u.format(e) + ")");
        });var n = r ? this.clone() : this;return O(n, e[0], e[1], t);
      };var O = function O(e, t, r, n) {
        var i = n || 0,
            a = y,
            o = 0;h(e._datatype) && (a = d.find(y, [e._datatype, e._datatype]) || y, o = d.convert(0, e._datatype), i = d.convert(i, e._datatype));var s,
            u,
            c,
            f = !a(i, o),
            l = e._size[0],
            p = e._size[1];if (r > p) {
          for (u = p; r > u; u++) {
            if (e._ptr[u] = e._values.length, f) for (s = 0; l > s; s++) {
              e._values.push(i), e._index.push(s);
            }
          }e._ptr[r] = e._values.length;
        } else p > r && (e._ptr.splice(r + 1, p - r), e._values.splice(e._ptr[r], e._values.length), e._index.splice(e._ptr[r], e._index.length));if (p = r, t > l) {
          if (f) {
            var m = 0;for (u = 0; p > u; u++) {
              e._ptr[u] = e._ptr[u] + m, c = e._ptr[u + 1] + m;var g = 0;for (s = l; t > s; s++, g++) {
                e._values.splice(c + g, 0, i), e._index.splice(c + g, 0, s), m++;
              }
            }e._ptr[p] = e._values.length;
          }
        } else if (l > t) {
          var v = 0;for (u = 0; p > u; u++) {
            e._ptr[u] = e._ptr[u] - v;var x = e._ptr[u],
                b = e._ptr[u + 1] - v;for (c = x; b > c; c++) {
              s = e._index[c], s > t - 1 && (e._values.splice(c, 1), e._index.splice(c, 1), v++);
            }
          }e._ptr[u] = e._values.length;
        }return e._size[0] = t, e._size[1] = r, e;
      };g.prototype.clone = function () {
        var e = new g({ values: this._values ? s.clone(this._values) : void 0, index: s.clone(this._index), ptr: s.clone(this._ptr), size: s.clone(this._size), datatype: this._datatype });return e;
      }, g.prototype.size = function () {
        return this._size.slice(0);
      }, g.prototype.map = function (e, t) {
        if (!this._values) throw new Error("Cannot invoke map on a Pattern only matrix");var r = this,
            n = this._size[0],
            i = this._size[1],
            a = function a(t, n, i) {
          return e(t, [n, i], r);
        };return _(this, 0, n - 1, 0, i - 1, a, t);
      };var _ = function _(e, t, r, n, i, a, o) {
        var s = [],
            u = [],
            c = [],
            f = y,
            l = 0;h(e._datatype) && (f = d.find(y, [e._datatype, e._datatype]) || y, l = d.convert(0, e._datatype));for (var p = function p(e, t, r) {
          e = a(e, t, r), f(e, l) || (s.push(e), u.push(t));
        }, m = n; i >= m; m++) {
          c.push(s.length);for (var v = e._ptr[m], x = e._ptr[m + 1], b = t, w = v; x > w; w++) {
            var N = e._index[w];if (N >= t && r >= N) {
              if (!o) for (var E = b; N > E; E++) {
                p(0, E - t, m - n);
              }p(e._values[w], N - t, m - n);
            }b = N + 1;
          }if (!o) for (var M = b; r >= M; M++) {
            p(0, M - t, m - n);
          }
        }return c.push(s.length), new g({ values: s, index: u, ptr: c, size: [r - t + 1, i - n + 1] });
      };g.prototype.forEach = function (e, t) {
        if (!this._values) throw new Error("Cannot invoke forEach on a Pattern only matrix");for (var r = this, n = this._size[0], i = this._size[1], a = 0; i > a; a++) {
          for (var o = this._ptr[a], s = this._ptr[a + 1], u = 0, c = o; s > c; c++) {
            var f = this._index[c];if (!t) for (var l = u; f > l; l++) {
              e(0, [l, a], r);
            }e(this._values[c], [f, a], r), u = f + 1;
          }if (!t) for (var p = u; n > p; p++) {
            e(0, [p, a], r);
          }
        }
      }, g.prototype.toArray = function () {
        return T(this._values, this._index, this._ptr, this._size, !0);
      }, g.prototype.valueOf = function () {
        return T(this._values, this._index, this._ptr, this._size, !1);
      };var T = function T(e, t, r, n, i) {
        var a,
            o,
            u = n[0],
            c = n[1],
            f = [];for (a = 0; u > a; a++) {
          for (f[a] = [], o = 0; c > o; o++) {
            f[a][o] = 0;
          }
        }for (o = 0; c > o; o++) {
          for (var l = r[o], p = r[o + 1], h = l; p > h; h++) {
            a = t[h], f[a][o] = e ? i ? s.clone(e[h]) : e[h] : 1;
          }
        }return f;
      };return g.prototype.format = function (e) {
        for (var t = this._size[0], r = this._size[1], n = this.density(), i = "Sparse Matrix [" + u.format(t, e) + " x " + u.format(r, e) + "] density: " + u.format(n, e) + "\n", a = 0; r > a; a++) {
          for (var o = this._ptr[a], s = this._ptr[a + 1], c = o; s > c; c++) {
            var f = this._index[c];i += "\n    (" + u.format(f, e) + ", " + u.format(a, e) + ") ==> " + (this._values ? u.format(this._values[c], e) : "X");
          }
        }return i;
      }, g.prototype.toString = function () {
        return u.format(this.toArray());
      }, g.prototype.toJSON = function () {
        return { mathjs: "SparseMatrix", values: this._values, index: this._index, ptr: this._ptr, size: this._size, datatype: this._datatype };
      }, g.prototype.diagonal = function (e) {
        if (e) {
          if (e.isBigNumber === !0 && (e = e.toNumber()), !l(e) || !p(e)) throw new TypeError("The parameter k must be an integer number");
        } else e = 0;var t = e > 0 ? e : 0,
            r = 0 > e ? -e : 0,
            n = this._size[0],
            i = this._size[1],
            a = Math.min(n - r, i - t),
            o = [],
            s = [],
            u = [];u[0] = 0;for (var c = t; i > c && o.length < a; c++) {
          for (var f = this._ptr[c], h = this._ptr[c + 1], m = f; h > m; m++) {
            var d = this._index[m];if (d === c - t + r) {
              o.push(this._values[m]), s[o.length - 1] = d - r;break;
            }
          }
        }return u.push(o.length), new g({ values: o, index: s, ptr: u, size: [a, 1] });
      }, g.fromJSON = function (e) {
        return new g(e);
      }, g.diagonal = function (e, t, r, n, i) {
        if (!f(e)) throw new TypeError("Array expected, size parameter");if (2 !== e.length) throw new Error("Only two dimensions matrix are supported");if (e = e.map(function (e) {
          if (e && e.isBigNumber === !0 && (e = e.toNumber()), !l(e) || !p(e) || 1 > e) throw new Error("Size values must be positive integers");return e;
        }), r) {
          if (r.isBigNumber === !0 && (r = r.toNumber()), !l(r) || !p(r)) throw new TypeError("The parameter k must be an integer number");
        } else r = 0;var a = y,
            o = 0;h(i) && (a = d.find(y, [i, i]) || y, o = d.convert(0, i));var s,
            u = r > 0 ? r : 0,
            c = 0 > r ? -r : 0,
            m = e[0],
            v = e[1],
            x = Math.min(m - c, v - u);if (f(t)) {
          if (t.length !== x) throw new Error("Invalid value array length");s = function s(e) {
            return t[e];
          };
        } else if (t && t.isMatrix === !0) {
          var b = t.size();if (1 !== b.length || b[0] !== x) throw new Error("Invalid matrix length");s = function s(e) {
            return t.get([e]);
          };
        } else s = function s() {
          return t;
        };for (var w = [], N = [], E = [], M = 0; v > M; M++) {
          E.push(w.length);var A = M - u;if (A >= 0 && x > A) {
            var O = s(A);a(O, o) || (N.push(A + c), w.push(O));
          }
        }return E.push(w.length), new g({ values: w, index: N, ptr: E, size: [m, v] });
      }, g.prototype.swapRows = function (e, t) {
        if (!(l(e) && p(e) && l(t) && p(t))) throw new Error("Row index must be positive integers");if (2 !== this._size.length) throw new Error("Only two dimensional matrix is supported");return m(e, this._size[0]), m(t, this._size[0]), g._swapRows(e, t, this._size[1], this._values, this._index, this._ptr), this;
      }, g._forEachRow = function (e, t, r, n, i) {
        for (var a = n[e], o = n[e + 1], s = a; o > s; s++) {
          i(r[s], t[s]);
        }
      }, g._swapRows = function (e, t, r, n, i, a) {
        for (var o = 0; r > o; o++) {
          var s = a[o],
              u = a[o + 1],
              c = E(e, s, u, i),
              f = E(t, s, u, i);if (u > c && u > f && i[c] === e && i[f] === t) {
            if (n) {
              var l = n[c];n[c] = n[f], n[f] = l;
            }
          } else if (u > c && i[c] === e && (f >= u || i[f] !== t)) {
            var p = n ? n[c] : void 0;i.splice(f, 0, t), n && n.splice(f, 0, p), i.splice(c >= f ? c + 1 : c, 1), n && n.splice(c >= f ? c + 1 : c, 1);
          } else if (u > f && i[f] === t && (c >= u || i[c] !== e)) {
            var h = n ? n[f] : void 0;i.splice(c, 0, e), n && n.splice(c, 0, h), i.splice(f >= c ? f + 1 : f, 1), n && n.splice(f >= c ? f + 1 : f, 1);
          }
        }
      }, e.Matrix._storage.sparse = g, g;
    }var i = r(39),
        a = r(42),
        o = i.array,
        s = i.object,
        u = i.string,
        c = i.number,
        f = Array.isArray,
        l = c.isNumber,
        p = c.isInteger,
        h = u.isString,
        m = o.validateIndex;t.name = "SparseMatrix", t.path = "type", t.factory = n, t.lazy = !1;
  }, function (e, t, r) {
    "use strict";
    function n(e, t, r, n) {
      var o = n("equalScalar", { "boolean, boolean": function booleanBoolean(e, t) {
          return e === t;
        }, "number, number": function numberNumber(e, r) {
          return e === r || i(e, r, t.epsilon);
        }, "BigNumber, BigNumber": function BigNumberBigNumber(e, r) {
          return e.eq(r) || a(e, r, t.epsilon);
        }, "Fraction, Fraction": function FractionFraction(e, t) {
          return e.equals(t);
        }, "Complex, Complex": function ComplexComplex(e, t) {
          return e.equals(t);
        }, "Unit, Unit": function UnitUnit(e, t) {
          if (!e.equalBase(t)) throw new Error("Cannot compare units with different base");return o(e.value, t.value);
        }, "string, string": function stringString(e, t) {
          return e === t;
        } });return o;
    }var i = r(6).nearlyEqual,
        a = r(49);t.factory = n;
  }, function (e, t) {
    "use strict";
    e.exports = function (e, t, r) {
      if (null == r) return e.eq(t);if (e.eq(t)) return !0;if (e.isNaN() || t.isNaN()) return !1;if (e.isFinite() && t.isFinite()) {
        var n = e.minus(t).abs();if (n.isZero()) return !0;var i = e.constructor.max(e.abs(), t.abs());return n.lte(i.times(r));
      }return !1;
    };
  }, function (e, t, r) {
    "use strict";
    function n(e, t, n) {
      function i() {
        if (!(this instanceof i)) throw new SyntaxError("Constructor must be called with the new operator");this._values = [], this._heap = new e.FibonacciHeap();
      }var a = n(r(51)),
          o = n(r(48));return i.prototype.type = "Spa", i.prototype.isSpa = !0, i.prototype.set = function (e, t) {
        if (this._values[e]) this._values[e].value = t;else {
          var r = this._heap.insert(e, t);this._values[e] = r;
        }
      }, i.prototype.get = function (e) {
        var t = this._values[e];return t ? t.value : 0;
      }, i.prototype.accumulate = function (e, t) {
        var r = this._values[e];r ? r.value = a(r.value, t) : (r = this._heap.insert(e, t), this._values[e] = r);
      }, i.prototype.forEach = function (e, t, r) {
        var n = this._heap,
            i = this._values,
            a = [],
            s = n.extractMinimum();for (s && a.push(s); s && s.key <= t;) {
          s.key >= e && (o(s.value, 0) || r(s.key, s.value, this)), s = n.extractMinimum(), s && a.push(s);
        }for (var u = 0; u < a.length; u++) {
          var c = a[u];s = n.insert(c.key, c.value), i[s.key] = s;
        }
      }, i.prototype.swap = function (e, t) {
        var r = this._values[e],
            n = this._values[t];if (!r && n) r = this._heap.insert(e, n.value), this._heap.remove(n), this._values[e] = r, this._values[t] = void 0;else if (r && !n) n = this._heap.insert(t, r.value), this._heap.remove(r), this._values[t] = n, this._values[e] = void 0;else if (r && n) {
          var i = r.value;r.value = n.value, n.value = i;
        }
      }, i;
    }t.name = "Spa", t.path = "type", t.factory = n;
  }, function (e, t, r) {
    "use strict";
    function n(e, t, n, a) {
      var o = n(r(52)),
          s = n(r(53)),
          u = r(32),
          c = n(r(54)),
          f = n(r(55)),
          l = n(r(56)),
          p = n(r(57)),
          h = n(r(58)),
          m = a("add", i({ "Matrix, Matrix": function MatrixMatrix(e, t) {
          var r;switch (e.storage()) {case "sparse":
              switch (t.storage()) {case "sparse":
                  r = f(e, t, s);break;default:
                  r = c(t, e, s, !0);}break;default:
              switch (t.storage()) {case "sparse":
                  r = c(e, t, s, !1);break;default:
                  r = p(e, t, s);}}return r;
        }, "Array, Array": function ArrayArray(e, t) {
          return m(o(e), o(t)).valueOf();
        }, "Array, Matrix": function ArrayMatrix(e, t) {
          return m(o(e), t);
        }, "Matrix, Array": function MatrixArray(e, t) {
          return m(e, o(t));
        }, "Matrix, any": function MatrixAny(e, t) {
          var r;switch (e.storage()) {case "sparse":
              r = l(e, t, s, !1);break;default:
              r = h(e, t, s, !1);}return r;
        }, "any, Matrix": function anyMatrix(e, t) {
          var r;switch (t.storage()) {case "sparse":
              r = l(t, e, s, !0);break;default:
              r = h(t, e, s, !0);}return r;
        }, "Array, any": function ArrayAny(e, t) {
          return h(o(e), t, s, !1).valueOf();
        }, "any, Array": function anyArray(e, t) {
          return h(o(t), e, s, !0).valueOf();
        }, "any, any": s, "any, any, ...any": function anyAnyAny(e, t, r) {
          for (var n = m(e, t), i = 0; i < r.length; i++) {
            n = m(n, r[i]);
          }return n;
        } }, s.signatures));return m.toTex = { 2: "\\left(${args[0]}" + u.operators.add + "${args[1]}\\right)"
      }, m;
    }var i = r(3).extend;t.name = "add", t.factory = n;
  }, function (e, t) {
    "use strict";
    function r(e, t, r, n) {
      function i(t, r, n) {
        var i = e.Matrix.storage(r || "default");return new i(t, n);
      }var a = n("matrix", { "": function _() {
          return i([]);
        }, string: function string(e) {
          return i([], e);
        }, "string, string": function stringString(e, t) {
          return i([], e, t);
        }, Array: function Array(e) {
          return i(e);
        }, Matrix: function Matrix(e) {
          return i(e, e.storage());
        }, "Array | Matrix, string": i, "Array | Matrix, string, string": i });return a.toTex = { 0: "\\begin{bmatrix}\\end{bmatrix}", 1: "\\left(${args[0]}\\right)", 2: "\\left(${args[0]}\\right)" }, a;
    }t.name = "matrix", t.factory = r;
  }, function (e, t) {
    "use strict";
    function r(e, t, r, n) {
      var i = n("add", { "number, number": function numberNumber(e, t) {
          return e + t;
        }, "Complex, Complex": function ComplexComplex(e, t) {
          return e.add(t);
        }, "BigNumber, BigNumber": function BigNumberBigNumber(e, t) {
          return e.plus(t);
        }, "Fraction, Fraction": function FractionFraction(e, t) {
          return e.add(t);
        }, "Unit, Unit": function UnitUnit(e, t) {
          if (null == e.value) throw new Error("Parameter x contains a unit with undefined value");if (null == t.value) throw new Error("Parameter y contains a unit with undefined value");if (!e.equalBase(t)) throw new Error("Units do not match");var r = e.clone();return r.value = i(r.value, t.value), r.fixPrefix = !1, r;
        } });return i;
    }t.factory = r;
  }, function (e, t, r) {
    "use strict";
    function n(e, t, r, n) {
      var a = e.DenseMatrix,
          o = function o(e, t, r, _o) {
        var s = e._data,
            u = e._size,
            c = e._datatype,
            f = t._values,
            l = t._index,
            p = t._ptr,
            h = t._size,
            m = t._datatype;if (u.length !== h.length) throw new i(u.length, h.length);if (u[0] !== h[0] || u[1] !== h[1]) throw new RangeError("Dimension mismatch. Matrix A (" + u + ") must match Matrix B (" + h + ")");if (!f) throw new Error("Cannot perform operation on Dense Matrix and Pattern Sparse Matrix");var d,
            g,
            v = u[0],
            y = u[1],
            x = "string" == typeof c && c === m ? c : void 0,
            b = x ? n.find(r, [x, x]) : r,
            w = [];for (d = 0; v > d; d++) {
          w[d] = [];
        }var N = [],
            E = [];for (g = 0; y > g; g++) {
          for (var M = g + 1, A = p[g], O = p[g + 1], _ = A; O > _; _++) {
            d = l[_], N[d] = _o ? b(f[_], s[d][g]) : b(s[d][g], f[_]), E[d] = M;
          }for (d = 0; v > d; d++) {
            E[d] === M ? w[d][g] = N[d] : w[d][g] = s[d][g];
          }
        }return new a({ data: w, size: [v, y], datatype: x });
      };return o;
    }var i = r(42);t.name = "algorithm01", t.factory = n;
  }, function (e, t, r) {
    "use strict";
    function n(e, t, n, a) {
      var o = n(r(48)),
          s = e.SparseMatrix,
          u = function u(e, t, r) {
        var n = e._values,
            u = e._index,
            c = e._ptr,
            f = e._size,
            l = e._datatype,
            p = t._values,
            h = t._index,
            m = t._ptr,
            d = t._size,
            g = t._datatype;if (f.length !== d.length) throw new i(f.length, d.length);if (f[0] !== d[0] || f[1] !== d[1]) throw new RangeError("Dimension mismatch. Matrix A (" + f + ") must match Matrix B (" + d + ")");var v,
            y = f[0],
            x = f[1],
            b = o,
            w = 0,
            N = r;"string" == typeof l && l === g && (v = l, b = a.find(o, [v, v]), w = a.convert(0, v), N = a.find(r, [v, v]));var E,
            M,
            A,
            O,
            _,
            T = n && p ? [] : void 0,
            C = [],
            S = [],
            z = new s({ values: T, index: C, ptr: S, size: [y, x], datatype: v }),
            B = n && p ? [] : void 0,
            k = n && p ? [] : void 0,
            I = [],
            P = [];for (M = 0; x > M; M++) {
          S[M] = C.length;var R = M + 1;for (O = c[M], _ = c[M + 1], A = O; _ > A; A++) {
            E = u[A], C.push(E), I[E] = R, B && (B[E] = n[A]);
          }for (O = m[M], _ = m[M + 1], A = O; _ > A; A++) {
            if (E = h[A], I[E] === R) {
              if (B) {
                var U = N(B[E], p[A]);b(U, w) ? I[E] = null : B[E] = U;
              }
            } else C.push(E), P[E] = R, k && (k[E] = p[A]);
          }if (B && k) for (A = S[M]; A < C.length;) {
            E = C[A], I[E] === R ? (T[A] = B[E], A++) : P[E] === R ? (T[A] = k[E], A++) : C.splice(A, 1);
          }
        }return S[x] = C.length, z;
      };return u;
    }var i = r(42);t.name = "algorithm04", t.factory = n;
  }, function (e, t) {
    "use strict";
    function r(e, t, r, n) {
      var i = e.DenseMatrix,
          a = function a(e, t, r, _a2) {
        var o = e._values,
            s = e._index,
            u = e._ptr,
            c = e._size,
            f = e._datatype;if (!o) throw new Error("Cannot perform operation on Pattern Sparse Matrix and Scalar value");var l,
            p = c[0],
            h = c[1],
            m = r;"string" == typeof f && (l = f, t = n.convert(t, l), m = n.find(r, [l, l]));for (var d = [], g = new i({ data: d, size: [p, h], datatype: l }), v = [], y = [], x = 0; h > x; x++) {
          for (var b = x + 1, w = u[x], N = u[x + 1], E = w; N > E; E++) {
            var M = s[E];v[M] = o[E], y[M] = b;
          }for (var A = 0; p > A; A++) {
            0 === x && (d[A] = []), y[A] === b ? d[A][x] = _a2 ? m(t, v[A]) : m(v[A], t) : d[A][x] = t;
          }
        }return g;
      };return a;
    }t.name = "algorithm10", t.factory = r;
  }, function (e, t, r) {
    "use strict";
    function n(e, t, r, n) {
      var i = e.DenseMatrix,
          o = function o(e, t, r) {
        var o = e._data,
            u = e._size,
            c = e._datatype,
            f = t._data,
            l = t._size,
            p = t._datatype,
            h = [];if (u.length !== l.length) throw new a(u.length, l.length);for (var m = 0; m < u.length; m++) {
          if (u[m] !== l[m]) throw new RangeError("Dimension mismatch. Matrix A (" + u + ") must match Matrix B (" + l + ")");h[m] = u[m];
        }var d,
            g = r;"string" == typeof c && c === p && (d = c, t = n.convert(t, d), g = n.find(r, [d, d]));var v = h.length > 0 ? s(g, 0, h, h[0], o, f) : [];return new i({ data: v, size: h, datatype: d });
      },
          s = function s(e, t, r, n, i, a) {
        var o = [];if (t === r.length - 1) for (var u = 0; n > u; u++) {
          o[u] = e(i[u], a[u]);
        } else for (var c = 0; n > c; c++) {
          o[c] = s(e, t + 1, r, r[t + 1], i[c], a[c]);
        }return o;
      };return o;
    }var i = r(39),
        a = r(42),
        o = i.string;o.isString;t.name = "algorithm13", t.factory = n;
  }, function (e, t, r) {
    "use strict";
    function n(e, t, r, n) {
      var a = e.DenseMatrix,
          o = function o(e, t, r, _o2) {
        var u,
            c = e._data,
            f = e._size,
            l = e._datatype,
            p = r;"string" == typeof l && (u = l, t = n.convert(t, u), p = n.find(r, [u, u]));var h = f.length > 0 ? s(p, 0, f, f[0], c, t, _o2) : [];return new a({ data: h, size: i(f), datatype: u });
      },
          s = function s(e, t, r, n, i, a, o) {
        var u = [];if (t === r.length - 1) for (var c = 0; n > c; c++) {
          u[c] = o ? e(a, i[c]) : e(i[c], a);
        } else for (var f = 0; n > f; f++) {
          u[f] = s(e, t + 1, r, r[t + 1], i[f], a, o);
        }return u;
      };return o;
    }var i = r(3).clone;t.name = "algorithm14", t.factory = n;
  }, function (e, t, r) {
    "use strict";
    function n(e, t, n, i) {
      function a() {
        if (!(this instanceof a)) throw new SyntaxError("Constructor must be called with the new operator");this._minimum = null, this._size = 0;
      }var o = n(r(60)),
          s = n(r(64)),
          u = 1 / Math.log((1 + Math.sqrt(5)) / 2);a.prototype.type = "FibonacciHeap", a.prototype.isFibonacciHeap = !0, a.prototype.insert = function (e, t) {
        var r = { key: e, value: t, degree: 0 };if (this._minimum) {
          var n = this._minimum;r.left = n, r.right = n.right, n.right = r, r.right.left = r, o(e, n.key) && (this._minimum = r);
        } else r.left = r, r.right = r, this._minimum = r;return this._size++, r;
      }, a.prototype.size = function () {
        return this._size;
      }, a.prototype.clear = function () {
        this._minimum = null, this._size = 0;
      }, a.prototype.isEmpty = function () {
        return !!this._minimum;
      }, a.prototype.extractMinimum = function () {
        var e = this._minimum;if (null === e) return e;for (var t = this._minimum, r = e.degree, n = e.child; r > 0;) {
          var i = n.right;n.left.right = n.right, n.right.left = n.left, n.left = t, n.right = t.right, t.right = n, n.right.left = n, n.parent = null, n = i, r--;
        }return e.left.right = e.right, e.right.left = e.left, e == e.right ? t = null : (t = e.right, t = h(t, this._size)), this._size--, this._minimum = t, e;
      }, a.prototype.remove = function (e) {
        this._minimum = c(this._minimum, e, -1), this.extractMinimum();
      };var c = function c(e, t, r) {
        t.key = r;var n = t.parent;return n && o(t.key, n.key) && (f(e, t, n), l(e, n)), o(t.key, e.key) && (e = t), e;
      },
          f = function f(e, t, r) {
        t.left.right = t.right, t.right.left = t.left, r.degree--, r.child == t && (r.child = t.right), 0 === r.degree && (r.child = null), t.left = e, t.right = e.right, e.right = t, t.right.left = t, t.parent = null, t.mark = !1;
      },
          l = function l(e, t) {
        var r = t.parent;r && (t.mark ? (f(e, t, r), l(r)) : t.mark = !0);
      },
          p = function p(e, t) {
        e.left.right = e.right, e.right.left = e.left, e.parent = t, t.child ? (e.left = t.child, e.right = t.child.right, t.child.right = e, e.right.left = e) : (t.child = e, e.right = e, e.left = e), t.degree++, e.mark = !1;
      },
          h = function h(e, t) {
        var r = Math.floor(Math.log(t) * u) + 1,
            n = new Array(r),
            i = 0,
            a = e;if (a) for (i++, a = a.right; a !== e;) {
          i++, a = a.right;
        }for (var c; i > 0;) {
          for (var f = a.degree, l = a.right;;) {
            if (c = n[f], !c) break;if (s(a.key, c.key)) {
              var h = c;c = a, a = h;
            }p(c, a), n[f] = null, f++;
          }n[f] = a, a = l, i--;
        }e = null;for (var m = 0; r > m; m++) {
          c = n[m], c && (e ? (c.left.right = c.right, c.right.left = c.left, c.left = e, c.right = e.right, e.right = c, c.right.left = c, o(c.key, e.key) && (e = c)) : e = c);
        }return e;
      };return a;
    }t.name = "FibonacciHeap", t.path = "type", t.factory = n;
  }, function (e, t, r) {
    "use strict";
    function n(e, t, n, o) {
      var s = n(r(52)),
          u = n(r(61)),
          c = n(r(62)),
          f = n(r(63)),
          l = n(r(57)),
          p = n(r(58)),
          h = r(32),
          m = o("smaller", { "boolean, boolean": function booleanBoolean(e, t) {
          return t > e;
        }, "number, number": function numberNumber(e, r) {
          return r > e && !i(e, r, t.epsilon);
        }, "BigNumber, BigNumber": function BigNumberBigNumber(e, r) {
          return e.lt(r) && !a(e, r, t.epsilon);
        }, "Fraction, Fraction": function FractionFraction(e, t) {
          return -1 === e.compare(t);
        }, "Complex, Complex": function ComplexComplex(e, t) {
          throw new TypeError("No ordering relation is defined for complex numbers");
        }, "Unit, Unit": function UnitUnit(e, t) {
          if (!e.equalBase(t)) throw new Error("Cannot compare units with different base");return m(e.value, t.value);
        }, "string, string": function stringString(e, t) {
          return t > e;
        }, "Matrix, Matrix": function MatrixMatrix(e, t) {
          var r;switch (e.storage()) {case "sparse":
              switch (t.storage()) {case "sparse":
                  r = c(e, t, m);break;default:
                  r = u(t, e, m, !0);}break;default:
              switch (t.storage()) {case "sparse":
                  r = u(e, t, m, !1);break;default:
                  r = l(e, t, m);}}return r;
        }, "Array, Array": function ArrayArray(e, t) {
          return m(s(e), s(t)).valueOf();
        }, "Array, Matrix": function ArrayMatrix(e, t) {
          return m(s(e), t);
        }, "Matrix, Array": function MatrixArray(e, t) {
          return m(e, s(t));
        }, "Matrix, any": function MatrixAny(e, t) {
          var r;switch (e.storage()) {case "sparse":
              r = f(e, t, m, !1);break;default:
              r = p(e, t, m, !1);}return r;
        }, "any, Matrix": function anyMatrix(e, t) {
          var r;switch (t.storage()) {case "sparse":
              r = f(t, e, m, !0);break;default:
              r = p(t, e, m, !0);}return r;
        }, "Array, any": function ArrayAny(e, t) {
          return p(s(e), t, m, !1).valueOf();
        }, "any, Array": function anyArray(e, t) {
          return p(s(t), e, m, !0).valueOf();
        } });return m.toTex = { 2: "\\left(${args[0]}" + h.operators.smaller + "${args[1]}\\right)" }, m;
    }var i = r(6).nearlyEqual,
        a = r(49);t.name = "smaller", t.factory = n;
  }, function (e, t, r) {
    "use strict";
    function n(e, t, r, n) {
      var a = e.DenseMatrix,
          o = function o(e, t, r, _o3) {
        var s = e._data,
            u = e._size,
            c = e._datatype,
            f = t._values,
            l = t._index,
            p = t._ptr,
            h = t._size,
            m = t._datatype;if (u.length !== h.length) throw new i(u.length, h.length);if (u[0] !== h[0] || u[1] !== h[1]) throw new RangeError("Dimension mismatch. Matrix A (" + u + ") must match Matrix B (" + h + ")");if (!f) throw new Error("Cannot perform operation on Dense Matrix and Pattern Sparse Matrix");var d,
            g = u[0],
            v = u[1],
            y = 0,
            x = r;"string" == typeof c && c === m && (d = c, y = n.convert(0, d), x = n.find(r, [d, d]));for (var b = [], w = 0; g > w; w++) {
          b[w] = [];
        }for (var N = [], E = [], M = 0; v > M; M++) {
          for (var A = M + 1, O = p[M], _ = p[M + 1], T = O; _ > T; T++) {
            var C = l[T];N[C] = _o3 ? x(f[T], s[C][M]) : x(s[C][M], f[T]), E[C] = A;
          }for (var S = 0; g > S; S++) {
            E[S] === A ? b[S][M] = N[S] : b[S][M] = _o3 ? x(y, s[S][M]) : x(s[S][M], y);
          }
        }return new a({ data: b, size: [g, v], datatype: d });
      };return o;
    }var i = r(42);t.name = "algorithm03", t.factory = n;
  }, function (e, t, r) {
    "use strict";
    function n(e, t, r, n) {
      var a = e.DenseMatrix,
          o = function o(e, t, r) {
        var o = e._size,
            u = e._datatype,
            c = t._size,
            f = t._datatype;if (o.length !== c.length) throw new i(o.length, c.length);if (o[0] !== c[0] || o[1] !== c[1]) throw new RangeError("Dimension mismatch. Matrix A (" + o + ") must match Matrix B (" + c + ")");var l,
            p = o[0],
            h = o[1],
            m = 0,
            d = r;"string" == typeof u && u === f && (l = u, m = n.convert(0, l), d = n.find(r, [l, l]));var g,
            v,
            y = [];for (g = 0; p > g; g++) {
          y[g] = [];
        }var x = new a({ data: y, size: [p, h], datatype: l }),
            b = [],
            w = [],
            N = [],
            E = [];for (v = 0; h > v; v++) {
          var M = v + 1;for (s(e, v, N, b, M), s(t, v, E, w, M), g = 0; p > g; g++) {
            var A = N[g] === M ? b[g] : m,
                O = E[g] === M ? w[g] : m;y[g][v] = d(A, O);
          }
        }return x;
      },
          s = function s(e, t, r, n, i) {
        for (var a = e._values, o = e._index, s = e._ptr, u = s[t], c = s[t + 1]; c > u; u++) {
          var f = o[u];r[f] = i, n[f] = a[u];
        }
      };return o;
    }var i = r(42);t.name = "algorithm07", t.factory = n;
  }, function (e, t) {
    "use strict";
    function r(e, t, r, n) {
      var i = e.DenseMatrix,
          a = function a(e, t, r, _a3) {
        var o = e._values,
            s = e._index,
            u = e._ptr,
            c = e._size,
            f = e._datatype;if (!o) throw new Error("Cannot perform operation on Pattern Sparse Matrix and Scalar value");var l,
            p = c[0],
            h = c[1],
            m = r;"string" == typeof f && (l = f, t = n.convert(t, l), m = n.find(r, [l, l]));for (var d = [], g = new i({ data: d, size: [p, h], datatype: l }), v = [], y = [], x = 0; h > x; x++) {
          for (var b = x + 1, w = u[x], N = u[x + 1], E = w; N > E; E++) {
            var M = s[E];v[M] = o[E], y[M] = b;
          }for (var A = 0; p > A; A++) {
            0 === x && (d[A] = []), y[A] === b ? d[A][x] = _a3 ? m(t, v[A]) : m(v[A], t) : d[A][x] = _a3 ? m(t, 0) : m(0, t);
          }
        }return g;
      };return a;
    }t.name = "algorithm12", t.factory = r;
  }, function (e, t, r) {
    "use strict";
    function n(e, t, n, o) {
      var s = n(r(52)),
          u = n(r(61)),
          c = n(r(62)),
          f = n(r(63)),
          l = n(r(57)),
          p = n(r(58)),
          h = r(32),
          m = o("larger", { "boolean, boolean": function booleanBoolean(e, t) {
          return e > t;
        }, "number, number": function numberNumber(e, r) {
          return e > r && !i(e, r, t.epsilon);
        }, "BigNumber, BigNumber": function BigNumberBigNumber(e, r) {
          return e.gt(r) && !a(e, r, t.epsilon);
        }, "Fraction, Fraction": function FractionFraction(e, t) {
          return 1 === e.compare(t);
        }, "Complex, Complex": function ComplexComplex() {
          throw new TypeError("No ordering relation is defined for complex numbers");
        }, "Unit, Unit": function UnitUnit(e, t) {
          if (!e.equalBase(t)) throw new Error("Cannot compare units with different base");return m(e.value, t.value);
        }, "string, string": function stringString(e, t) {
          return e > t;
        }, "Matrix, Matrix": function MatrixMatrix(e, t) {
          var r;switch (e.storage()) {case "sparse":
              switch (t.storage()) {case "sparse":
                  r = c(e, t, m);break;default:
                  r = u(t, e, m, !0);}break;default:
              switch (t.storage()) {case "sparse":
                  r = u(e, t, m, !1);break;default:
                  r = l(e, t, m);}}return r;
        }, "Array, Array": function ArrayArray(e, t) {
          return m(s(e), s(t)).valueOf();
        }, "Array, Matrix": function ArrayMatrix(e, t) {
          return m(s(e), t);
        }, "Matrix, Array": function MatrixArray(e, t) {
          return m(e, s(t));
        }, "Matrix, any": function MatrixAny(e, t) {
          var r;switch (e.storage()) {case "sparse":
              r = f(e, t, m, !1);break;default:
              r = p(e, t, m, !1);}return r;
        }, "any, Matrix": function anyMatrix(e, t) {
          var r;switch (t.storage()) {case "sparse":
              r = f(t, e, m, !0);break;default:
              r = p(t, e, m, !0);}return r;
        }, "Array, any": function ArrayAny(e, t) {
          return p(s(e), t, m, !1).valueOf();
        }, "any, Array": function anyArray(e, t) {
          return p(s(t), e, m, !0).valueOf();
        } });return m.toTex = { 2: "\\left(${args[0]}" + h.operators.larger + "${args[1]}\\right)" }, m;
    }var i = r(6).nearlyEqual,
        a = r(49);t.name = "larger", t.factory = n;
  }, function (e, t, r) {
    "use strict";
    function n(e, t, n) {
      function a(e, t) {
        if (!(this instanceof a)) throw new SyntaxError("Constructor must be called with the new operator");if (t && !u(t)) throw new Error("Invalid datatype: " + t);if (e && e.isMatrix === !0 || s(e)) {
          var r = new c(e, t);this._data = r._data, this._size = r._size, this._datatype = r._datatype, this._min = null, this._max = null;
        } else if (e && s(e.data) && s(e.size)) this._data = e.data, this._size = e.size, this._datatype = e.datatype, this._min = "undefined" != typeof e.min ? e.min : null, this._max = "undefined" != typeof e.max ? e.max : null;else {
          if (e) throw new TypeError("Unsupported type of data (" + i.types.type(e) + ")");this._data = [], this._size = [0], this._datatype = t, this._min = null, this._max = null;
        }
      }var c = n(r(46)),
          f = n(r(60));return a.prototype = new c(), a.prototype.type = "ImmutableDenseMatrix", a.prototype.isImmutableDenseMatrix = !0, a.prototype.subset = function (e) {
        switch (arguments.length) {case 1:
            var t = c.prototype.subset.call(this, e);return t.isMatrix ? new a({ data: t._data, size: t._size, datatype: t._datatype }) : t;case 2:case 3:
            throw new Error("Cannot invoke set subset on an Immutable Matrix instance");default:
            throw new SyntaxError("Wrong number of arguments");}
      }, a.prototype.set = function () {
        throw new Error("Cannot invoke set on an Immutable Matrix instance");
      }, a.prototype.resize = function () {
        throw new Error("Cannot invoke resize on an Immutable Matrix instance");
      }, a.prototype.clone = function () {
        var e = new a({ data: o.clone(this._data), size: o.clone(this._size), datatype: this._datatype });return e;
      }, a.prototype.toJSON = function () {
        return { mathjs: "ImmutableDenseMatrix", data: this._data, size: this._size, datatype: this._datatype };
      }, a.fromJSON = function (e) {
        return new a(e);
      }, a.prototype.swapRows = function () {
        throw new Error("Cannot invoke swapRows on an Immutable Matrix instance");
      }, a.prototype.min = function () {
        if (null === this._min) {
          var e = null;this.forEach(function (t) {
            (null === e || f(t, e)) && (e = t);
          }), this._min = null !== e ? e : void 0;
        }return this._min;
      }, a.prototype.max = function () {
        if (null === this._max) {
          var e = null;this.forEach(function (t) {
            (null === e || f(e, t)) && (e = t);
          }), this._max = null !== e ? e : void 0;
        }return this._max;
      }, a;
    }var i = r(39),
        a = i.string,
        o = i.object,
        s = Array.isArray,
        u = a.isString;t.name = "ImmutableDenseMatrix", t.path = "type", t.factory = n;
  }, function (e, t, r) {
    "use strict";
    function n(e) {
      function t(e) {
        if (!(this instanceof t)) throw new SyntaxError("Constructor must be called with the new operator");this._dimensions = [], this._isScalar = !0;for (var n = 0, i = arguments.length; i > n; n++) {
          var a = arguments[n];if (a && a.isRange === !0) this._dimensions.push(a), this._isScalar = !1;else if (a && (Array.isArray(a) || a.isMatrix === !0)) {
            var o = r(a.valueOf());this._dimensions.push(o);var s = o.size();1 === s.length && 1 === s[0] || (this._isScalar = !1);
          } else if ("number" == typeof a) this._dimensions.push(r([a]));else {
            if ("string" != typeof a) throw new TypeError("Dimension must be an Array, Matrix, number, string, or Range");this._dimensions.push(a);
          }
        }
      }function r(t) {
        for (var r = 0, n = t.length; n > r; r++) {
          if ("number" != typeof t[r] || !a(t[r])) throw new TypeError("Index parameters must be positive integer numbers");
        }return new e.ImmutableDenseMatrix(t);
      }return t.prototype.type = "Index", t.prototype.isIndex = !0, t.prototype.clone = function () {
        var e = new t();return e._dimensions = i(this._dimensions), e._isScalar = this._isScalar, e;
      }, t.create = function (e) {
        var r = new t();return t.apply(r, e), r;
      }, t.prototype.size = function () {
        for (var e = [], t = 0, r = this._dimensions.length; r > t; t++) {
          var n = this._dimensions[t];e[t] = "string" == typeof n ? 1 : n.size()[0];
        }return e;
      }, t.prototype.max = function () {
        for (var e = [], t = 0, r = this._dimensions.length; r > t; t++) {
          var n = this._dimensions[t];e[t] = "string" == typeof n ? n : n.max();
        }return e;
      }, t.prototype.min = function () {
        for (var e = [], t = 0, r = this._dimensions.length; r > t; t++) {
          var n = this._dimensions[t];e[t] = "string" == typeof n ? n : n.min();
        }return e;
      }, t.prototype.forEach = function (e) {
        for (var t = 0, r = this._dimensions.length; r > t; t++) {
          e(this._dimensions[t], t, this);
        }
      }, t.prototype.dimension = function (e) {
        return this._dimensions[e] || null;
      }, t.prototype.isObjectProperty = function () {
        return 1 === this._dimensions.length && "string" == typeof this._dimensions[0];
      }, t.prototype.getObjectProperty = function () {
        return this.isObjectProperty() ? this._dimensions[0] : null;
      }, t.prototype.isScalar = function () {
        return this._isScalar;
      }, t.prototype.toArray = function () {
        for (var e = [], t = 0, r = this._dimensions.length; r > t; t++) {
          var n = this._dimensions[t];e.push("string" == typeof n ? n : n.toArray());
        }return e;
      }, t.prototype.valueOf = t.prototype.toArray, t.prototype.toString = function () {
        for (var e = [], t = 0, r = this._dimensions.length; r > t; t++) {
          var n = this._dimensions[t];"string" == typeof n ? e.push(JSON.stringify(n)) : e.push(n.toString());
        }return "[" + e.join(", ") + "]";
      }, t.prototype.toJSON = function () {
        return { mathjs: "Index", dimensions: this._dimensions };
      }, t.fromJSON = function (e) {
        return t.create(e.dimensions);
      }, t;
    }var i = r(3).clone,
        a = r(6).isInteger;t.name = "Index", t.path = "type", t.factory = n;
  }, function (e, t, r) {
    "use strict";
    function n(e, t, r, n) {
      function a(e, t, r) {
        if (!(this instanceof a)) throw new SyntaxError("Constructor must be called with the new operator");if (null != e) if (e.isBigNumber === !0) e = e.toNumber();else if ("number" != typeof e) throw new TypeError("Parameter start must be a number");if (null != t) if (t.isBigNumber === !0) t = t.toNumber();else if ("number" != typeof t) throw new TypeError("Parameter end must be a number");if (null != r) if (r.isBigNumber === !0) r = r.toNumber();else if ("number" != typeof r) throw new TypeError("Parameter step must be a number");this.start = null != e ? parseFloat(e) : 0, this.end = null != t ? parseFloat(t) : 0, this.step = null != r ? parseFloat(r) : 1;
      }return a.prototype.type = "Range", a.prototype.isRange = !0, a.parse = function (e) {
        if ("string" != typeof e) return null;var t = e.split(":"),
            r = t.map(function (e) {
          return parseFloat(e);
        }),
            n = r.some(function (e) {
          return isNaN(e);
        });if (n) return null;switch (r.length) {case 2:
            return new a(r[0], r[1]);case 3:
            return new a(r[0], r[2], r[1]);default:
            return null;}
      }, a.prototype.clone = function () {
        return new a(this.start, this.end, this.step);
      }, a.prototype.size = function () {
        var e = 0,
            t = this.start,
            r = this.step,
            n = this.end,
            a = n - t;return i.sign(r) == i.sign(a) ? e = Math.ceil(a / r) : 0 == a && (e = 0), isNaN(e) && (e = 0), [e];
      }, a.prototype.min = function () {
        var e = this.size()[0];return e > 0 ? this.step > 0 ? this.start : this.start + (e - 1) * this.step : void 0;
      }, a.prototype.max = function () {
        var e = this.size()[0];return e > 0 ? this.step > 0 ? this.start + (e - 1) * this.step : this.start : void 0;
      }, a.prototype.forEach = function (e) {
        var t = this.start,
            r = this.step,
            n = this.end,
            i = 0;if (r > 0) for (; n > t;) {
          e(t, [i], this), t += r, i++;
        } else if (0 > r) for (; t > n;) {
          e(t, [i], this), t += r, i++;
        }
      }, a.prototype.map = function (e) {
        var t = [];return this.forEach(function (r, n, i) {
          t[n[0]] = e(r, n, i);
        }), t;
      }, a.prototype.toArray = function () {
        var e = [];return this.forEach(function (t, r) {
          e[r[0]] = t;
        }), e;
      }, a.prototype.valueOf = function () {
        return this.toArray();
      }, a.prototype.format = function (e) {
        var t = i.format(this.start, e);return 1 != this.step && (t += ":" + i.format(this.step, e)), t += ":" + i.format(this.end, e);
      }, a.prototype.toString = function () {
        return this.format();
      }, a.prototype.toJSON = function () {
        return { mathjs: "Range", start: this.start, end: this.end, step: this.step };
      }, a.fromJSON = function (e) {
        return new a(e.start, e.end, e.step);
      }, a;
    }var i = r(6);t.name = "Range", t.path = "type", t.factory = n;
  }, function (e, t) {
    "use strict";
    function r(e, t, r, n) {
      return n("index", { "...number | string | BigNumber | Range | Array | Matrix": function numberStringBigNumberRangeArrayMatrix(t) {
          var r = t.map(function (e) {
            return e && e.isBigNumber === !0 ? e.toNumber() : e && (Array.isArray(e) || e.isMatrix === !0) ? e.map(function (e) {
              return e && e.isBigNumber === !0 ? e.toNumber() : e;
            }) : e;
          }),
              n = new e.Index();return e.Index.apply(n, r), n;
        } });
    }t.name = "index", t.factory = r;
  }, function (e, t) {
    "use strict";
    function r(e, t, r, n) {
      var i = e.SparseMatrix,
          a = n("sparse", { "": function _() {
          return new i([]);
        }, string: function string(e) {
          return new i([], e);
        }, "Array | Matrix": function ArrayMatrix(e) {
          return new i(e);
        }, "Array | Matrix, string": function ArrayMatrixString(e, t) {
          return new i(e, t);
        } });return a.toTex = { 0: "\\begin{bsparse}\\end{bsparse}", 1: "\\left(${args[0]}\\right)" }, a;
    }t.name = "sparse", t.factory = r;
  }, function (e, t, r) {
    "use strict";
    function n(e, t, r, n) {
      var a = n("number", { "": function _() {
          return 0;
        }, number: function number(e) {
          return e;
        }, string: function string(e) {
          var t = Number(e);if (isNaN(t)) throw new SyntaxError('String "' + e + '" is no valid number');return t;
        }, BigNumber: function BigNumber(e) {
          return e.toNumber();
        }, Fraction: function Fraction(e) {
          return e.valueOf();
        }, Unit: function Unit(e) {
          throw new Error("Second argument with valueless unit expected");
        }, "Unit, string | Unit": function UnitStringUnit(e, t) {
          return e.toNumber(t);
        }, "Array | Matrix": function ArrayMatrix(e) {
          return i(e, a);
        } });return a.toTex = { 0: "0", 1: "\\left(${args[0]}\\right)", 2: "\\left(\\left(${args[0]}\\right)${args[1]}\\right)" }, a;
    }var i = r(19);t.name = "number", t.factory = n;
  }, function (e, t, r) {
    e.exports = [r(72)];
  }, function (e, t) {
    "use strict";
    function r(e, t, r, n) {
      function i(e) {
        if (!(this instanceof i)) throw new SyntaxError("Constructor must be called with the new operator");this.entries = e || [];
      }return i.prototype.type = "ResultSet", i.prototype.isResultSet = !0, i.prototype.valueOf = function () {
        return this.entries;
      }, i.prototype.toString = function () {
        return "[" + this.entries.join(", ") + "]";
      }, i.prototype.toJSON = function () {
        return { mathjs: "ResultSet", entries: this.entries };
      }, i.fromJSON = function (e) {
        return new i(e.entries);
      }, i;
    }t.name = "ResultSet", t.path = "type", t.factory = r;
  }, function (e, t, r) {
    "use strict";
    function n(e, t, r, n) {
      var o = n("string", { "": function _() {
          return "";
        }, number: a.format, "null": function _null(e) {
          return "null";
        }, "boolean": function boolean(e) {
          return e + "";
        }, string: function string(e) {
          return e;
        }, "Array | Matrix": function ArrayMatrix(e) {
          return i(e, o);
        }, any: function any(e) {
          return String(e);
        } });return o.toTex = { 0: '\\mathtt{""}', 1: "\\mathrm{string}\\left(${args[0]}\\right)" }, o;
    }var i = r(19),
        a = r(6);t.name = "string", t.factory = n;
  }, function (e, t, r) {
    e.exports = [r(75), r(96), r(97), r(98), r(99)];
  }, function (e, t, r) {
    "use strict";
    function n(e, t, n, s, u) {
      function c(e, t) {
        if (!(this instanceof c)) throw new Error("Constructor must be called with the new operator");if (void 0 !== e && !C(e) && !e.isComplex) throw new TypeError("First parameter in Unit constructor must be number, BigNumber, Fraction, Complex, or undefined");if (void 0 != t && ("string" != typeof t || "" == t)) throw new TypeError("Second parameter in Unit constructor must be a string");if (void 0 != t) {
          var r = c.parse(t);this.units = r.units, this.dimensions = r.dimensions;
        } else {
          this.units = [{ unit: $, prefix: q.NONE, power: 0 }], this.dimensions = [];for (var n = 0; n < j.length; n++) {
            this.dimensions[n] = 0;
          }
        }this.value = void 0 != e ? this._normalize(e) : null, this.fixPrefix = !1, this.isUnitListSimplified = !0;
      }function f() {
        for (; " " == R || "	" == R;) {
          h();
        }
      }function l(e) {
        return e >= "0" && "9" >= e || "." == e;
      }function p(e) {
        return e >= "0" && "9" >= e;
      }function h() {
        P++, R = I.charAt(P);
      }function m(e) {
        P = e, R = I.charAt(P);
      }function d() {
        var e,
            t = "";if (e = P, "+" == R ? h() : "-" == R && (t += R, h()), !l(R)) return m(e), null;if ("." == R) {
          if (t += R, h(), !p(R)) return m(e), null;
        } else {
          for (; p(R);) {
            t += R, h();
          }"." == R && (t += R, h());
        }for (; p(R);) {
          t += R, h();
        }if ("E" == R || "e" == R) {
          var r = "",
              n = P;if (r += R, h(), "+" != R && "-" != R || (r += R, h()), !p(R)) return m(n), t;for (t += r; p(R);) {
            t += R, h();
          }
        }return t;
      }function g() {
        for (var e = "", t = I.charCodeAt(P); t >= 48 && 57 >= t || t >= 65 && 90 >= t || t >= 97 && 122 >= t;) {
          e += R, h(), t = I.charCodeAt(P);
        }return t = e.charCodeAt(0), t >= 65 && 90 >= t || t >= 97 && 122 >= t ? e || null : null;
      }function v(e) {
        return R === e ? (h(), e) : null;
      }function y(e) {
        if (G.hasOwnProperty(e)) {
          var t = G[e],
              r = t.prefixes[""];return { unit: t, prefix: r };
        }for (var n in G) {
          if (G.hasOwnProperty(n) && i(e, n)) {
            var t = G[n],
                a = e.length - n.length,
                o = e.substring(0, a),
                r = t.prefixes[o];if (void 0 !== r) return { unit: t, prefix: r };
          }
        }return null;
      }function x(t) {
        if ("BigNumber" === t.number) {
          var r = o.pi(e.BigNumber);G.rad.value = new e.BigNumber(1), G.deg.value = r.div(180), G.grad.value = r.div(200), G.cycle.value = r.times(2), G.arcsec.value = r.div(648e3), G.arcmin.value = r.div(10800);
        } else G.rad.value = 1, G.deg.value = Math.PI / 180, G.grad.value = Math.PI / 200, G.cycle.value = 2 * Math.PI, G.arcsec.value = Math.PI / 648e3, G.arcmin.value = Math.PI / 10800;
      }function b(e) {
        for (var t = 0; t < e.length; t++) {
          var r = e.charAt(t),
              n = function n(e) {
            return (/^[a-zA-Z]$/.test(e)
            );
          },
              i = function i(e) {
            return e >= "0" && "9" >= e;
          };if (0 === t && !n(r)) throw new Error('Invalid unit name (must begin with alpha character): "' + e + '"');if (t > 0 && !n(r) && !i(r)) throw new Error('Invalid unit name (only alphanumeric characters are allowed): "' + e + '"');
        }
      }var w = n(r(53)),
          N = n(r(77)),
          E = n(r(80)),
          M = n(r(81)),
          A = n(r(82)),
          O = n(r(86)),
          _ = n(r(87)),
          T = n(r(88)),
          C = n(r(89)),
          S = n(r(90)),
          z = n(r(91)),
          B = n(r(70)),
          k = n(r(27));c.prototype.type = "Unit", c.prototype.isUnit = !0;var I, P, R;c.parse = function (r, n) {
        if (n = n || {}, I = r, P = -1, R = "", "string" != typeof I) throw new TypeError("Invalid argument in Unit.parse, string expected");var i = new c();i.units = [], h(), f();var a = d(),
            o = null;a && (o = "BigNumber" === t.number ? new e.BigNumber(a) : "Fraction" === t.number ? new e.Fraction(a) : parseFloat(a)), f();for (var s = 1, u = !1, l = [], p = 1;;) {
          for (f(); "(" === R;) {
            l.push(s), p *= s, s = 1, h(), f();
          }if (!R) break;var m = R,
              x = g();if (null == x) throw new SyntaxError('Unexpected "' + m + '" in "' + I + '" at index ' + P.toString());var b = y(x);if (null == b) throw new SyntaxError('Unit "' + x + '" not found.');var w = s * p;if (f(), v("^")) {
            f();var N = d();if (null == N) throw new SyntaxError('In "' + r + '", "^" must be followed by a floating-point number');w *= N;
          }i.units.push({ unit: b.unit, prefix: b.prefix, power: w });for (var E = 0; E < j.length; E++) {
            i.dimensions[E] += (b.unit.dimensions[E] || 0) * w;
          }for (f(); ")" === R;) {
            if (0 === l.length) throw new SyntaxError('Unmatched ")" in "' + I + '" at index ' + P.toString());p /= l.pop(), h(), f();
          }if (u = !1, v("*") ? (s = 1, u = !0) : v("/") ? (s = -1, u = !0) : s = 1, b.unit.base) {
            var M = b.unit.base.key;Z.auto[M] = { unit: b.unit, prefix: b.prefix };
          }
        }if (f(), R) throw new SyntaxError('Could not parse: "' + r + '"');if (u) throw new SyntaxError('Trailing characters: "' + r + '"');if (0 !== l.length) throw new SyntaxError('Unmatched "(" in "' + I + '"');if (0 == i.units.length && !n.allowNoUnits) throw new SyntaxError('"' + r + '" contains no units');return i.value = void 0 != o ? i._normalize(o) : null, i;
      }, c.prototype.clone = function () {
        var e = new c();e.fixPrefix = this.fixPrefix, e.isUnitListSimplified = this.isUnitListSimplified, e.value = a(this.value), e.dimensions = this.dimensions.slice(0), e.units = [];for (var t = 0; t < this.units.length; t++) {
          e.units[t] = {};for (var r in this.units[t]) {
            this.units[t].hasOwnProperty(r) && (e.units[t][r] = this.units[t][r]);
          }
        }return e;
      }, c.prototype._isDerived = function () {
        return 0 === this.units.length ? !1 : this.units.length > 1 || Math.abs(this.units[0].power - 1) > 1e-15;
      }, c.prototype._normalize = function (e) {
        var t, r, n, i, a;if (null == e || 0 === this.units.length) return e;if (this._isDerived()) {
          var o = e;a = c._getNumberConverter(z(e));for (var s = 0; s < this.units.length; s++) {
            t = a(this.units[s].unit.value), i = a(this.units[s].prefix.value), n = a(this.units[s].power), o = E(o, A(E(t, i), n));
          }return o;
        }return a = c._getNumberConverter(z(e)), t = a(this.units[0].unit.value), r = a(this.units[0].unit.offset), i = a(this.units[0].prefix.value), E(w(e, r), E(t, i));
      }, c.prototype._denormalize = function (e, t) {
        var r, n, i, a, o;if (null == e || 0 === this.units.length) return e;if (this._isDerived()) {
          var s = e;o = c._getNumberConverter(z(e));for (var u = 0; u < this.units.length; u++) {
            r = o(this.units[u].unit.value), a = o(this.units[u].prefix.value), i = o(this.units[u].power), s = M(s, A(E(r, a), i));
          }return s;
        }return o = c._getNumberConverter(z(e)), r = o(this.units[0].unit.value), a = o(this.units[0].prefix.value), n = o(this.units[0].unit.offset), void 0 == t ? N(M(M(e, r), a), n) : N(M(M(e, r), t), n);
      }, c.isValuelessUnit = function (e) {
        return null != y(e);
      }, c.prototype.hasBase = function (e) {
        if ("string" == typeof e && (e = F[e]), !e) return !1;for (var t = 0; t < j.length; t++) {
          if (Math.abs((this.dimensions[t] || 0) - (e.dimensions[t] || 0)) > 1e-12) return !1;
        }return !0;
      }, c.prototype.equalBase = function (e) {
        for (var t = 0; t < j.length; t++) {
          if (Math.abs((this.dimensions[t] || 0) - (e.dimensions[t] || 0)) > 1e-12) return !1;
        }return !0;
      }, c.prototype.equals = function (e) {
        return this.equalBase(e) && T(this.value, e.value);
      }, c.prototype.multiply = function (e) {
        for (var t = this.clone(), r = 0; r < j.length; r++) {
          t.dimensions[r] = (this.dimensions[r] || 0) + (e.dimensions[r] || 0);
        }for (var r = 0; r < e.units.length; r++) {
          var n = {};for (var i in e.units[r]) {
            n[i] = e.units[r][i];
          }t.units.push(n);
        }if (null != this.value || null != e.value) {
          var a = null == this.value ? this._normalize(1) : this.value,
              o = null == e.value ? e._normalize(1) : e.value;t.value = E(a, o);
        } else t.value = null;return t.isUnitListSimplified = !1, U(t);
      }, c.prototype.divide = function (e) {
        for (var t = this.clone(), r = 0; r < j.length; r++) {
          t.dimensions[r] = (this.dimensions[r] || 0) - (e.dimensions[r] || 0);
        }for (var r = 0; r < e.units.length; r++) {
          var n = {};for (var i in e.units[r]) {
            n[i] = e.units[r][i];
          }n.power = -n.power, t.units.push(n);
        }if (null != this.value || null != e.value) {
          var a = null == this.value ? this._normalize(1) : this.value,
              o = null == e.value ? e._normalize(1) : e.value;t.value = M(a, o);
        } else t.value = null;return t.isUnitListSimplified = !1, U(t);
      }, c.prototype.pow = function (e) {
        for (var t = this.clone(), r = 0; r < j.length; r++) {
          t.dimensions[r] = (this.dimensions[r] || 0) * e;
        }for (var r = 0; r < t.units.length; r++) {
          t.units[r].power *= e;
        }return null != t.value ? t.value = A(t.value, e) : t.value = null, t.isUnitListSimplified = !1, U(t);
      };var U = function U(e) {
        return e.equalBase(F.NONE) && null !== e.value && !t.predictable ? e.value : e;
      };c.prototype.abs = function () {
        var e = this.clone();e.value = O(e.value);for (var t in e.units) {
          "VA" !== e.units[t].unit.name && "VAR" !== e.units[t].unit.name || (e.units[t].unit = G.W);
        }return e;
      }, c.prototype.to = function (e) {
        var t,
            r = null == this.value ? this._normalize(1) : this.value;if ("string" == typeof e) {
          if (t = c.parse(e), !this.equalBase(t)) throw new Error("Units do not match");if (null !== t.value) throw new Error("Cannot convert to a unit with a value");return t.value = a(r), t.fixPrefix = !0, t.isUnitListSimplified = !0, t;
        }if (e && e.isUnit) {
          if (!this.equalBase(e)) throw new Error("Units do not match");if (null !== e.value) throw new Error("Cannot convert to a unit with a value");return t = e.clone(), t.value = a(r), t.fixPrefix = !0, t.isUnitListSimplified = !0, t;
        }throw new Error("String or Unit expected as parameter");
      }, c.prototype.toNumber = function (e) {
        return B(this.toNumeric(e));
      }, c.prototype.toNumeric = function (e) {
        var t = this;return e && (t = this.to(e)), t._isDerived() ? t._denormalize(t.value) : t._denormalize(t.value, t.units[0].prefix.value);
      }, c.prototype.toString = function () {
        return this.format();
      }, c.prototype.toJSON = function () {
        return { mathjs: "Unit", value: this._denormalize(this.value), unit: this.formatUnits(), fixPrefix: this.fixPrefix };
      }, c.fromJSON = function (e) {
        var t = new c(e.value, e.unit);return t.fixPrefix = e.fixPrefix || !1, t;
      }, c.prototype.valueOf = c.prototype.toString, c.prototype.simplifyUnitListLazy = function () {
        if (!this.isUnitListSimplified && null != this.value) {
          var e,
              t = [];for (var n in V) {
            if (this.hasBase(F[n])) {
              e = n;break;
            }
          }if ("NONE" === e) this.units = [];else {
            var i;e && V.hasOwnProperty(e) && (i = V[e]);if (i) this.units = [{ unit: i.unit, prefix: i.prefix, power: 1 }];else {
              for (var a = !1, o = 0; o < j.length; o++) {
                var s = j[o];Math.abs(this.dimensions[o] || 0) > 1e-12 && (V.hasOwnProperty(s) ? t.push({ unit: V[s].unit, prefix: V[s].prefix, power: this.dimensions[o] || 0 }) : a = !0);
              }r(92);t.length < this.units.length && !a && (this.units = t);
            }
          }this.isUnitListSimplified = !0;
        }
      }, c.prototype.formatUnits = function () {
        this.simplifyUnitListLazy();for (var e = "", t = "", r = 0, n = 0, i = 0; i < this.units.length; i++) {
          this.units[i].power > 0 ? (r++, e += " " + this.units[i].prefix.name + this.units[i].unit.name, Math.abs(this.units[i].power - 1) > 1e-15 && (e += "^" + this.units[i].power)) : this.units[i].power < 0 && n++;
        }if (n > 0) for (var i = 0; i < this.units.length; i++) {
          this.units[i].power < 0 && (r > 0 ? (t += " " + this.units[i].prefix.name + this.units[i].unit.name, Math.abs(this.units[i].power + 1) > 1e-15 && (t += "^" + -this.units[i].power)) : (t += " " + this.units[i].prefix.name + this.units[i].unit.name, t += "^" + this.units[i].power));
        }e = e.substr(1), t = t.substr(1), r > 1 && n > 0 && (e = "(" + e + ")"), n > 1 && r > 0 && (t = "(" + t + ")");var a = e;return r > 0 && n > 0 && (a += " / "), a += t;
      }, c.prototype.format = function (e) {
        this.simplifyUnitListLazy();var t = !1,
            r = !0;"undefined" != typeof this.value && null !== this.value && this.value.isComplex && (t = Math.abs(this.value.re) < 1e-14, r = Math.abs(this.value.im) < 1e-14);for (var n in this.units) {
          this.units[n].unit && ("VA" === this.units[n].unit.name && t ? this.units[n].unit = G.VAR : "VAR" !== this.units[n].unit.name || t || (this.units[n].unit = G.VA));
        }1 !== this.units.length || this.fixPrefix || Math.abs(this.units[0].power - Math.round(this.units[0].power)) < 1e-14 && (this.units[0].prefix = this._bestPrefix());var i = this._denormalize(this.value),
            a = null !== this.value ? S(i, e || {}) : "",
            o = this.formatUnits();return this.value && this.value.isComplex && (a = "(" + a + ")"), o.length > 0 && a.length > 0 && (a += " "), a += o;
      }, c.prototype._bestPrefix = function () {
        if (1 !== this.units.length) throw new Error("Can only compute the best prefix for single units with integer powers, like kg, s^2, N^-1, and so forth!");if (Math.abs(this.units[0].power - Math.round(this.units[0].power)) >= 1e-14) throw new Error("Can only compute the best prefix for single units with integer powers, like kg, s^2, N^-1, and so forth!");var e = O(this.value),
            t = O(this.units[0].unit.value),
            r = this.units[0].prefix;if (0 === e) return r;var n = this.units[0].power,
            i = Math.log(e / Math.pow(r.value * t, n)) / Math.LN10 - 1.2;if (i > -2.200001 && 1.800001 > i) return r;i = Math.abs(i);var a = this.units[0].unit.prefixes;for (var o in a) {
          if (a.hasOwnProperty(o)) {
            var s = a[o];if (s.scientific) {
              var u = Math.abs(Math.log(e / Math.pow(s.value * t, n)) / Math.LN10 - 1.2);(i > u || u === i && s.name.length < r.name.length) && (r = s, i = u);
            }
          }
        }return r;
      }, c.prototype.splitUnit = function (e) {
        for (var t = this.clone(), r = [], n = 0; n < e.length && (t = t.to(e[n]), n != e.length - 1); n++) {
          var i = _(t.toNumeric()),
              a = new c(i, e[n].toString());r.push(a), t = N(t, a);
        }return r.push(t), r;
      };var q = { NONE: { "": { name: "", value: 1, scientific: !0 } }, SHORT: { "": { name: "", value: 1, scientific: !0 }, da: { name: "da", value: 10, scientific: !1 }, h: { name: "h", value: 100, scientific: !1 }, k: { name: "k", value: 1e3, scientific: !0 }, M: { name: "M", value: 1e6, scientific: !0 }, G: { name: "G", value: 1e9, scientific: !0 }, T: { name: "T", value: 1e12, scientific: !0 }, P: { name: "P", value: 1e15, scientific: !0 }, E: { name: "E", value: 1e18, scientific: !0 }, Z: { name: "Z", value: 1e21, scientific: !0 }, Y: { name: "Y", value: 1e24, scientific: !0 }, d: { name: "d", value: .1, scientific: !1 }, c: { name: "c", value: .01, scientific: !1 }, m: { name: "m", value: .001, scientific: !0 }, u: { name: "u", value: 1e-6, scientific: !0 }, n: { name: "n", value: 1e-9, scientific: !0 }, p: { name: "p", value: 1e-12, scientific: !0 }, f: { name: "f", value: 1e-15, scientific: !0 }, a: { name: "a", value: 1e-18, scientific: !0 }, z: { name: "z", value: 1e-21, scientific: !0 }, y: { name: "y", value: 1e-24, scientific: !0 } }, LONG: { "": { name: "", value: 1, scientific: !0 }, deca: { name: "deca", value: 10, scientific: !1 }, hecto: { name: "hecto", value: 100, scientific: !1 }, kilo: { name: "kilo", value: 1e3, scientific: !0 }, mega: { name: "mega", value: 1e6, scientific: !0 }, giga: { name: "giga", value: 1e9, scientific: !0 }, tera: { name: "tera", value: 1e12, scientific: !0 }, peta: { name: "peta", value: 1e15, scientific: !0 }, exa: { name: "exa", value: 1e18, scientific: !0 }, zetta: { name: "zetta", value: 1e21, scientific: !0 }, yotta: { name: "yotta", value: 1e24, scientific: !0 }, deci: { name: "deci", value: .1, scientific: !1 }, centi: { name: "centi", value: .01, scientific: !1 }, milli: { name: "milli", value: .001, scientific: !0 }, micro: { name: "micro", value: 1e-6, scientific: !0 }, nano: { name: "nano", value: 1e-9, scientific: !0 }, pico: { name: "pico", value: 1e-12, scientific: !0 }, femto: { name: "femto", value: 1e-15, scientific: !0 }, atto: { name: "atto", value: 1e-18, scientific: !0 }, zepto: { name: "zepto", value: 1e-21, scientific: !0 }, yocto: { name: "yocto", value: 1e-24, scientific: !0 } }, SQUARED: { "": { name: "", value: 1, scientific: !0 }, da: { name: "da", value: 100, scientific: !1 }, h: { name: "h", value: 1e4, scientific: !1 }, k: { name: "k", value: 1e6, scientific: !0 }, M: { name: "M", value: 1e12, scientific: !0 }, G: { name: "G", value: 1e18, scientific: !0 }, T: { name: "T", value: 1e24, scientific: !0 }, P: { name: "P", value: 1e30, scientific: !0 }, E: { name: "E", value: 1e36, scientific: !0 }, Z: { name: "Z", value: 1e42, scientific: !0 }, Y: { name: "Y", value: 1e48, scientific: !0 }, d: { name: "d", value: .01, scientific: !1 }, c: { name: "c", value: 1e-4, scientific: !1 }, m: { name: "m", value: 1e-6, scientific: !0 }, u: { name: "u", value: 1e-12, scientific: !0 }, n: { name: "n", value: 1e-18, scientific: !0 }, p: { name: "p", value: 1e-24, scientific: !0 }, f: { name: "f", value: 1e-30, scientific: !0 }, a: { name: "a", value: 1e-36, scientific: !0 }, z: { name: "z", value: 1e-42, scientific: !0 }, y: { name: "y", value: 1e-48, scientific: !0 } }, CUBIC: { "": { name: "", value: 1, scientific: !0 }, da: { name: "da", value: 1e3, scientific: !1 }, h: { name: "h", value: 1e6, scientific: !1 }, k: { name: "k", value: 1e9, scientific: !0 }, M: { name: "M", value: 1e18, scientific: !0 }, G: { name: "G", value: 1e27, scientific: !0 }, T: { name: "T", value: 1e36, scientific: !0 }, P: { name: "P", value: 1e45, scientific: !0 }, E: { name: "E", value: 1e54, scientific: !0 }, Z: { name: "Z", value: 1e63, scientific: !0 }, Y: { name: "Y", value: 1e72, scientific: !0 }, d: { name: "d", value: .001, scientific: !1 }, c: { name: "c", value: 1e-6, scientific: !1 }, m: { name: "m", value: 1e-9, scientific: !0 }, u: { name: "u", value: 1e-18, scientific: !0 }, n: { name: "n", value: 1e-27, scientific: !0 }, p: { name: "p", value: 1e-36, scientific: !0 }, f: { name: "f", value: 1e-45, scientific: !0 }, a: { name: "a", value: 1e-54, scientific: !0 }, z: { name: "z", value: 1e-63, scientific: !0 }, y: { name: "y", value: 1e-72, scientific: !0 } }, BINARY_SHORT: { "": { name: "", value: 1, scientific: !0 }, k: { name: "k", value: 1e3, scientific: !0 }, M: { name: "M", value: 1e6, scientific: !0 }, G: { name: "G", value: 1e9, scientific: !0 }, T: { name: "T", value: 1e12, scientific: !0 }, P: { name: "P", value: 1e15, scientific: !0 }, E: { name: "E", value: 1e18, scientific: !0 }, Z: { name: "Z", value: 1e21, scientific: !0 }, Y: { name: "Y", value: 1e24, scientific: !0 }, Ki: { name: "Ki", value: 1024, scientific: !0 }, Mi: { name: "Mi", value: Math.pow(1024, 2), scientific: !0 }, Gi: { name: "Gi", value: Math.pow(1024, 3), scientific: !0 }, Ti: { name: "Ti", value: Math.pow(1024, 4), scientific: !0 }, Pi: { name: "Pi", value: Math.pow(1024, 5), scientific: !0 }, Ei: { name: "Ei", value: Math.pow(1024, 6), scientific: !0 }, Zi: { name: "Zi", value: Math.pow(1024, 7), scientific: !0 }, Yi: { name: "Yi", value: Math.pow(1024, 8), scientific: !0 } }, BINARY_LONG: { "": { name: "", value: 1, scientific: !0 }, kilo: { name: "kilo", value: 1e3, scientific: !0 }, mega: { name: "mega", value: 1e6, scientific: !0 }, giga: { name: "giga", value: 1e9, scientific: !0 }, tera: { name: "tera", value: 1e12, scientific: !0 }, peta: { name: "peta", value: 1e15, scientific: !0 }, exa: { name: "exa", value: 1e18, scientific: !0 }, zetta: { name: "zetta", value: 1e21, scientific: !0 }, yotta: { name: "yotta", value: 1e24, scientific: !0 }, kibi: { name: "kibi", value: 1024, scientific: !0 }, mebi: { name: "mebi", value: Math.pow(1024, 2), scientific: !0 }, gibi: { name: "gibi", value: Math.pow(1024, 3), scientific: !0 }, tebi: { name: "tebi", value: Math.pow(1024, 4), scientific: !0 }, pebi: { name: "pebi", value: Math.pow(1024, 5), scientific: !0 }, exi: { name: "exi", value: Math.pow(1024, 6), scientific: !0 }, zebi: { name: "zebi", value: Math.pow(1024, 7), scientific: !0 }, yobi: { name: "yobi", value: Math.pow(1024, 8), scientific: !0 } }, BTU: { "": { name: "", value: 1, scientific: !0 }, MM: { name: "MM", value: 1e6, scientific: !0 } } };q.SHORTLONG = {};for (var L in q.SHORT) {
        q.SHORT.hasOwnProperty(L) && (q.SHORTLONG[L] = q.SHORT[L]);
      }for (var L in q.LONG) {
        q.LONG.hasOwnProperty(L) && (q.SHORTLONG[L] = q.LONG[L]);
      }var j = ["MASS", "LENGTH", "TIME", "CURRENT", "TEMPERATURE", "LUMINOUS_INTENSITY", "AMOUNT_OF_SUBSTANCE", "ANGLE", "BIT"],
          F = { NONE: { dimensions: [0, 0, 0, 0, 0, 0, 0, 0, 0] }, MASS: { dimensions: [1, 0, 0, 0, 0, 0, 0, 0, 0] }, LENGTH: { dimensions: [0, 1, 0, 0, 0, 0, 0, 0, 0] }, TIME: { dimensions: [0, 0, 1, 0, 0, 0, 0, 0, 0] }, CURRENT: { dimensions: [0, 0, 0, 1, 0, 0, 0, 0, 0] }, TEMPERATURE: { dimensions: [0, 0, 0, 0, 1, 0, 0, 0, 0] }, LUMINOUS_INTENSITY: { dimensions: [0, 0, 0, 0, 0, 1, 0, 0, 0] }, AMOUNT_OF_SUBSTANCE: { dimensions: [0, 0, 0, 0, 0, 0, 1, 0, 0] }, FORCE: { dimensions: [1, 1, -2, 0, 0, 0, 0, 0, 0] }, SURFACE: { dimensions: [0, 2, 0, 0, 0, 0, 0, 0, 0] }, VOLUME: { dimensions: [0, 3, 0, 0, 0, 0, 0, 0, 0] }, ENERGY: { dimensions: [1, 2, -2, 0, 0, 0, 0, 0, 0] }, POWER: { dimensions: [1, 2, -3, 0, 0, 0, 0, 0, 0] }, PRESSURE: { dimensions: [1, -1, -2, 0, 0, 0, 0, 0, 0] }, ELECTRIC_CHARGE: { dimensions: [0, 0, 1, 1, 0, 0, 0, 0, 0] }, ELECTRIC_CAPACITANCE: { dimensions: [-1, -2, 4, 2, 0, 0, 0, 0, 0] }, ELECTRIC_POTENTIAL: { dimensions: [1, 2, -3, -1, 0, 0, 0, 0, 0] }, ELECTRIC_RESISTANCE: { dimensions: [1, 2, -3, -2, 0, 0, 0, 0, 0] }, ELECTRIC_INDUCTANCE: { dimensions: [1, 2, -2, -2, 0, 0, 0, 0, 0] }, ELECTRIC_CONDUCTANCE: { dimensions: [-1, -2, 3, 2, 0, 0, 0, 0, 0] }, MAGNETIC_FLUX: { dimensions: [1, 2, -2, -1, 0, 0, 0, 0, 0] }, MAGNETIC_FLUX_DENSITY: { dimensions: [1, 0, -2, -1, 0, 0, 0, 0, 0] }, FREQUENCY: { dimensions: [0, 0, -1, 0, 0, 0, 0, 0, 0] }, ANGLE: { dimensions: [0, 0, 0, 0, 0, 0, 0, 1, 0] }, BIT: { dimensions: [0, 0, 0, 0, 0, 0, 0, 0, 1] } };for (var L in F) {
        F[L].key = L;
      }var D = {},
          $ = { name: "", base: D, value: 1, offset: 0, dimensions: [0, 0, 0, 0, 0, 0, 0, 0, 0] },
          G = { meter: { name: "meter", base: F.LENGTH, prefixes: q.LONG, value: 1, offset: 0 }, inch: { name: "inch", base: F.LENGTH, prefixes: q.NONE, value: .0254, offset: 0 }, foot: { name: "foot", base: F.LENGTH, prefixes: q.NONE, value: .3048, offset: 0 }, yard: { name: "yard", base: F.LENGTH, prefixes: q.NONE, value: .9144, offset: 0 }, mile: { name: "mile", base: F.LENGTH, prefixes: q.NONE, value: 1609.344, offset: 0 }, link: { name: "link", base: F.LENGTH, prefixes: q.NONE, value: .201168, offset: 0 }, rod: { name: "rod", base: F.LENGTH, prefixes: q.NONE, value: 5.02921, offset: 0 }, chain: { name: "chain", base: F.LENGTH, prefixes: q.NONE, value: 20.1168, offset: 0 }, angstrom: { name: "angstrom", base: F.LENGTH, prefixes: q.NONE, value: 1e-10, offset: 0 }, m: { name: "m", base: F.LENGTH, prefixes: q.SHORT, value: 1, offset: 0 }, "in": { name: "in", base: F.LENGTH, prefixes: q.NONE, value: .0254, offset: 0 }, ft: { name: "ft", base: F.LENGTH, prefixes: q.NONE, value: .3048, offset: 0 }, yd: { name: "yd", base: F.LENGTH, prefixes: q.NONE, value: .9144, offset: 0 }, mi: { name: "mi", base: F.LENGTH, prefixes: q.NONE, value: 1609.344, offset: 0 }, li: { name: "li", base: F.LENGTH, prefixes: q.NONE, value: .201168, offset: 0 }, rd: { name: "rd", base: F.LENGTH, prefixes: q.NONE, value: 5.02921, offset: 0 }, ch: { name: "ch", base: F.LENGTH, prefixes: q.NONE, value: 20.1168, offset: 0 }, mil: { name: "mil", base: F.LENGTH, prefixes: q.NONE, value: 254e-7, offset: 0 }, m2: { name: "m2", base: F.SURFACE, prefixes: q.SQUARED, value: 1, offset: 0 }, sqin: { name: "sqin", base: F.SURFACE, prefixes: q.NONE, value: 64516e-8, offset: 0 }, sqft: { name: "sqft", base: F.SURFACE, prefixes: q.NONE, value: .09290304, offset: 0 }, sqyd: { name: "sqyd", base: F.SURFACE, prefixes: q.NONE, value: .83612736, offset: 0 }, sqmi: { name: "sqmi", base: F.SURFACE, prefixes: q.NONE, value: 2589988.110336, offset: 0 }, sqrd: { name: "sqrd", base: F.SURFACE, prefixes: q.NONE, value: 25.29295, offset: 0 }, sqch: { name: "sqch", base: F.SURFACE, prefixes: q.NONE, value: 404.6873, offset: 0 }, sqmil: { name: "sqmil", base: F.SURFACE, prefixes: q.NONE, value: 6.4516e-10, offset: 0 }, acre: { name: "acre", base: F.SURFACE, prefixes: q.NONE, value: 4046.86, offset: 0 }, hectare: { name: "hectare", base: F.SURFACE, prefixes: q.NONE, value: 1e4, offset: 0 }, m3: { name: "m3", base: F.VOLUME, prefixes: q.CUBIC, value: 1, offset: 0 }, L: { name: "L", base: F.VOLUME, prefixes: q.SHORT, value: .001, offset: 0 }, l: { name: "l", base: F.VOLUME, prefixes: q.SHORT, value: .001, offset: 0 }, litre: { name: "litre", base: F.VOLUME, prefixes: q.LONG, value: .001, offset: 0 }, cuin: { name: "cuin", base: F.VOLUME, prefixes: q.NONE, value: 16387064e-12, offset: 0 }, cuft: { name: "cuft", base: F.VOLUME, prefixes: q.NONE, value: .028316846592, offset: 0 }, cuyd: { name: "cuyd", base: F.VOLUME, prefixes: q.NONE, value: .764554857984, offset: 0 }, teaspoon: { name: "teaspoon", base: F.VOLUME, prefixes: q.NONE, value: 5e-6, offset: 0 }, tablespoon: { name: "tablespoon", base: F.VOLUME, prefixes: q.NONE, value: 15e-6, offset: 0 }, drop: { name: "drop", base: F.VOLUME, prefixes: q.NONE, value: 5e-8, offset: 0 }, gtt: { name: "gtt", base: F.VOLUME, prefixes: q.NONE, value: 5e-8, offset: 0 }, minim: { name: "minim", base: F.VOLUME, prefixes: q.NONE, value: 6.161152e-8, offset: 0 }, fluiddram: { name: "fluiddram", base: F.VOLUME, prefixes: q.NONE, value: 36966911e-13, offset: 0 }, fluidounce: { name: "fluidounce", base: F.VOLUME, prefixes: q.NONE, value: 2957353e-11, offset: 0 }, gill: { name: "gill", base: F.VOLUME, prefixes: q.NONE, value: .0001182941, offset: 0 }, cc: { name: "cc", base: F.VOLUME, prefixes: q.NONE, value: 1e-6, offset: 0 }, cup: { name: "cup", base: F.VOLUME, prefixes: q.NONE, value: .0002365882, offset: 0 }, pint: { name: "pint", base: F.VOLUME, prefixes: q.NONE, value: .0004731765, offset: 0 }, quart: { name: "quart", base: F.VOLUME, prefixes: q.NONE, value: .0009463529, offset: 0 }, gallon: { name: "gallon", base: F.VOLUME, prefixes: q.NONE, value: .003785412, offset: 0 }, beerbarrel: { name: "beerbarrel", base: F.VOLUME, prefixes: q.NONE, value: .1173478, offset: 0 }, oilbarrel: { name: "oilbarrel", base: F.VOLUME, prefixes: q.NONE, value: .1589873, offset: 0 }, hogshead: { name: "hogshead", base: F.VOLUME, prefixes: q.NONE, value: .238481, offset: 0 }, fldr: { name: "fldr", base: F.VOLUME, prefixes: q.NONE, value: 36966911e-13, offset: 0 }, floz: { name: "floz", base: F.VOLUME, prefixes: q.NONE, value: 2957353e-11, offset: 0 }, gi: { name: "gi", base: F.VOLUME, prefixes: q.NONE, value: .0001182941, offset: 0 }, cp: { name: "cp", base: F.VOLUME, prefixes: q.NONE, value: .0002365882, offset: 0 }, pt: { name: "pt", base: F.VOLUME, prefixes: q.NONE, value: .0004731765, offset: 0 }, qt: { name: "qt", base: F.VOLUME, prefixes: q.NONE, value: .0009463529, offset: 0 }, gal: { name: "gal", base: F.VOLUME, prefixes: q.NONE, value: .003785412, offset: 0 }, bbl: { name: "bbl", base: F.VOLUME, prefixes: q.NONE, value: .1173478, offset: 0 }, obl: { name: "obl", base: F.VOLUME, prefixes: q.NONE, value: .1589873, offset: 0 }, g: { name: "g", base: F.MASS, prefixes: q.SHORT, value: .001, offset: 0 }, gram: { name: "gram", base: F.MASS, prefixes: q.LONG, value: .001, offset: 0 }, ton: { name: "ton", base: F.MASS, prefixes: q.SHORT, value: 907.18474, offset: 0 }, tonne: { name: "tonne", base: F.MASS, prefixes: q.SHORT, value: 1e3, offset: 0 }, grain: { name: "grain", base: F.MASS, prefixes: q.NONE, value: 6479891e-11, offset: 0 }, dram: { name: "dram", base: F.MASS, prefixes: q.NONE, value: .0017718451953125, offset: 0 }, ounce: { name: "ounce", base: F.MASS, prefixes: q.NONE, value: .028349523125, offset: 0 }, poundmass: { name: "poundmass", base: F.MASS, prefixes: q.NONE, value: .45359237, offset: 0 }, hundredweight: { name: "hundredweight", base: F.MASS, prefixes: q.NONE, value: 45.359237, offset: 0 }, stick: { name: "stick", base: F.MASS, prefixes: q.NONE, value: .115, offset: 0 }, stone: { name: "stone", base: F.MASS, prefixes: q.NONE, value: 6.35029318, offset: 0 }, gr: { name: "gr", base: F.MASS, prefixes: q.NONE, value: 6479891e-11, offset: 0 }, dr: { name: "dr", base: F.MASS, prefixes: q.NONE, value: .0017718451953125, offset: 0 }, oz: { name: "oz", base: F.MASS, prefixes: q.NONE, value: .028349523125, offset: 0 }, lbm: { name: "lbm", base: F.MASS, prefixes: q.NONE, value: .45359237, offset: 0 }, cwt: { name: "cwt", base: F.MASS, prefixes: q.NONE, value: 45.359237, offset: 0 }, s: { name: "s", base: F.TIME, prefixes: q.SHORT, value: 1, offset: 0 }, min: { name: "min", base: F.TIME, prefixes: q.NONE, value: 60, offset: 0 }, h: { name: "h", base: F.TIME, prefixes: q.NONE, value: 3600, offset: 0 }, second: { name: "second", base: F.TIME, prefixes: q.LONG, value: 1, offset: 0 }, sec: { name: "sec", base: F.TIME, prefixes: q.LONG, value: 1, offset: 0 }, minute: { name: "minute", base: F.TIME, prefixes: q.NONE, value: 60, offset: 0 }, hour: { name: "hour", base: F.TIME, prefixes: q.NONE, value: 3600, offset: 0 }, day: { name: "day", base: F.TIME, prefixes: q.NONE, value: 86400, offset: 0 }, week: { name: "week", base: F.TIME, prefixes: q.NONE, value: 604800, offset: 0 }, month: { name: "month", base: F.TIME, prefixes: q.NONE, value: 2629800, offset: 0 }, year: { name: "year", base: F.TIME, prefixes: q.NONE, value: 31557600, offset: 0 }, decade: { name: "year", base: F.TIME, prefixes: q.NONE, value: 315576e3, offset: 0 }, century: { name: "century", base: F.TIME, prefixes: q.NONE, value: 315576e4, offset: 0 }, millennium: { name: "millennium", base: F.TIME, prefixes: q.NONE, value: 315576e5, offset: 0 }, hertz: { name: "Hertz", base: F.FREQUENCY, prefixes: q.LONG, value: 1, offset: 0, reciprocal: !0 }, Hz: { name: "Hz", base: F.FREQUENCY, prefixes: q.SHORT, value: 1, offset: 0, reciprocal: !0 }, rad: { name: "rad", base: F.ANGLE, prefixes: q.LONG, value: 1, offset: 0 }, deg: { name: "deg", base: F.ANGLE, prefixes: q.LONG, value: null, offset: 0 }, grad: { name: "grad", base: F.ANGLE, prefixes: q.LONG, value: null, offset: 0 }, cycle: { name: "cycle", base: F.ANGLE, prefixes: q.NONE, value: null, offset: 0 }, arcsec: { name: "arcsec", base: F.ANGLE, prefixes: q.NONE, value: null, offset: 0 }, arcmin: { name: "arcmin", base: F.ANGLE, prefixes: q.NONE, value: null, offset: 0 }, A: { name: "A", base: F.CURRENT, prefixes: q.SHORT, value: 1, offset: 0 }, ampere: { name: "ampere", base: F.CURRENT, prefixes: q.LONG, value: 1, offset: 0 }, K: { name: "K", base: F.TEMPERATURE, prefixes: q.NONE, value: 1, offset: 0 }, degC: { name: "degC", base: F.TEMPERATURE, prefixes: q.NONE, value: 1, offset: 273.15 }, degF: { name: "degF", base: F.TEMPERATURE, prefixes: q.NONE, value: 1 / 1.8, offset: 459.67 }, degR: { name: "degR", base: F.TEMPERATURE, prefixes: q.NONE, value: 1 / 1.8, offset: 0 }, kelvin: { name: "kelvin", base: F.TEMPERATURE, prefixes: q.NONE, value: 1, offset: 0 }, celsius: { name: "celsius", base: F.TEMPERATURE, prefixes: q.NONE, value: 1, offset: 273.15 }, fahrenheit: { name: "fahrenheit", base: F.TEMPERATURE, prefixes: q.NONE, value: 1 / 1.8, offset: 459.67 }, rankine: { name: "rankine", base: F.TEMPERATURE, prefixes: q.NONE, value: 1 / 1.8, offset: 0 }, mol: { name: "mol", base: F.AMOUNT_OF_SUBSTANCE, prefixes: q.SHORT, value: 1, offset: 0 }, mole: { name: "mole", base: F.AMOUNT_OF_SUBSTANCE, prefixes: q.LONG, value: 1, offset: 0 }, cd: { name: "cd", base: F.LUMINOUS_INTENSITY, prefixes: q.NONE, value: 1, offset: 0 }, candela: { name: "candela", base: F.LUMINOUS_INTENSITY, prefixes: q.NONE, value: 1, offset: 0 }, N: { name: "N", base: F.FORCE, prefixes: q.SHORT, value: 1, offset: 0 }, newton: { name: "newton", base: F.FORCE, prefixes: q.LONG, value: 1, offset: 0 }, dyn: { name: "dyn", base: F.FORCE, prefixes: q.SHORT, value: 1e-5, offset: 0 }, dyne: { name: "dyne", base: F.FORCE, prefixes: q.LONG, value: 1e-5, offset: 0 }, lbf: { name: "lbf", base: F.FORCE, prefixes: q.NONE, value: 4.4482216152605, offset: 0 }, poundforce: { name: "poundforce", base: F.FORCE, prefixes: q.NONE, value: 4.4482216152605, offset: 0 }, kip: { name: "kip", base: F.FORCE, prefixes: q.LONG, value: 4448.2216, offset: 0 }, J: { name: "J", base: F.ENERGY, prefixes: q.SHORT, value: 1, offset: 0 }, joule: { name: "joule", base: F.ENERGY, prefixes: q.SHORT, value: 1, offset: 0 }, erg: { name: "erg", base: F.ENERGY, prefixes: q.NONE, value: 1e-5, offset: 0 }, Wh: { name: "Wh", base: F.ENERGY, prefixes: q.SHORT, value: 3600, offset: 0 }, BTU: { name: "BTU", base: F.ENERGY, prefixes: q.BTU, value: 1055.05585262, offset: 0 }, eV: { name: "eV", base: F.ENERGY, prefixes: q.SHORT, value: 1.602176565e-19, offset: 0 }, electronvolt: { name: "electronvolt", base: F.ENERGY, prefixes: q.LONG, value: 1.602176565e-19, offset: 0 }, W: { name: "W", base: F.POWER, prefixes: q.SHORT, value: 1, offset: 0 }, watt: { name: "W", base: F.POWER, prefixes: q.LONG, value: 1, offset: 0 }, hp: { name: "hp", base: F.POWER, prefixes: q.NONE, value: 745.6998715386, offset: 0 }, VAR: { name: "VAR", base: F.POWER, prefixes: q.SHORT, value: k.I, offset: 0 }, VA: { name: "VA", base: F.POWER, prefixes: q.SHORT, value: 1, offset: 0 }, Pa: { name: "Pa", base: F.PRESSURE, prefixes: q.SHORT, value: 1, offset: 0 }, psi: { name: "psi", base: F.PRESSURE, prefixes: q.NONE, value: 6894.75729276459, offset: 0 }, atm: { name: "atm", base: F.PRESSURE, prefixes: q.NONE, value: 101325, offset: 0 }, bar: { name: "bar", base: F.PRESSURE, prefixes: q.NONE, value: 1e5, offset: 0 }, torr: { name: "torr", base: F.PRESSURE, prefixes: q.NONE, value: 133.322, offset: 0 }, mmHg: { name: "mmHg", base: F.PRESSURE, prefixes: q.NONE, value: 133.322, offset: 0 }, mmH2O: { name: "mmH2O", base: F.PRESSURE, prefixes: q.NONE, value: 9.80665, offset: 0 }, cmH2O: { name: "cmH2O", base: F.PRESSURE, prefixes: q.NONE, value: 98.0665, offset: 0 }, coulomb: { name: "coulomb", base: F.ELECTRIC_CHARGE, prefixes: q.LONG, value: 1, offset: 0 }, C: { name: "C", base: F.ELECTRIC_CHARGE, prefixes: q.SHORT, value: 1, offset: 0 }, farad: { name: "farad", base: F.ELECTRIC_CAPACITANCE, prefixes: q.LONG, value: 1, offset: 0 }, F: { name: "F", base: F.ELECTRIC_CAPACITANCE, prefixes: q.SHORT, value: 1, offset: 0 }, volt: { name: "volt", base: F.ELECTRIC_POTENTIAL, prefixes: q.LONG, value: 1, offset: 0 }, V: { name: "V", base: F.ELECTRIC_POTENTIAL, prefixes: q.SHORT, value: 1, offset: 0 }, ohm: { name: "ohm", base: F.ELECTRIC_RESISTANCE, prefixes: q.SHORTLONG, value: 1, offset: 0 }, henry: { name: "henry", base: F.ELECTRIC_INDUCTANCE, prefixes: q.LONG, value: 1, offset: 0 }, H: { name: "H", base: F.ELECTRIC_INDUCTANCE, prefixes: q.SHORT, value: 1, offset: 0 }, siemens: { name: "siemens", base: F.ELECTRIC_CONDUCTANCE, prefixes: q.LONG, value: 1, offset: 0 }, S: { name: "S", base: F.ELECTRIC_CONDUCTANCE, prefixes: q.SHORT, value: 1, offset: 0 }, weber: { name: "weber", base: F.MAGNETIC_FLUX, prefixes: q.LONG, value: 1, offset: 0 }, Wb: { name: "Wb", base: F.MAGNETIC_FLUX, prefixes: q.SHORT, value: 1, offset: 0 }, tesla: { name: "tesla", base: F.MAGNETIC_FLUX_DENSITY, prefixes: q.LONG, value: 1, offset: 0 }, T: { name: "T", base: F.MAGNETIC_FLUX_DENSITY, prefixes: q.SHORT, value: 1, offset: 0 }, b: { name: "b", base: F.BIT, prefixes: q.BINARY_SHORT, value: 1, offset: 0 }, bits: { name: "bits", base: F.BIT, prefixes: q.BINARY_LONG, value: 1, offset: 0 }, B: { name: "B", base: F.BIT, prefixes: q.BINARY_SHORT, value: 8, offset: 0 }, bytes: { name: "bytes", base: F.BIT, prefixes: q.BINARY_LONG, value: 8, offset: 0 } },
          H = { meters: "meter", inches: "inch", feet: "foot", yards: "yard", miles: "mile", links: "link", rods: "rod", chains: "chain", angstroms: "angstrom", lt: "l", litres: "litre", liter: "litre", liters: "litre", teaspoons: "teaspoon", tablespoons: "tablespoon", minims: "minim", fluiddrams: "fluiddram", fluidounces: "fluidounce", gills: "gill", cups: "cup", pints: "pint", quarts: "quart", gallons: "gallon", beerbarrels: "beerbarrel", oilbarrels: "oilbarrel", hogsheads: "hogshead", gtts: "gtt", grams: "gram", tons: "ton", tonnes: "tonne", grains: "grain", drams: "dram", ounces: "ounce", poundmasses: "poundmass", hundredweights: "hundredweight", sticks: "stick", lb: "lbm", lbs: "lbm", kips: "kip", acres: "acre", hectares: "hectare", sqfeet: "sqft", sqyard: "sqyd", sqmile: "sqmi", sqmiles: "sqmi", mmhg: "mmHg", mmh2o: "mmH2O", cmh2o: "cmH2O", seconds: "second", secs: "second", minutes: "minute", mins: "minute", hours: "hour", hr: "hour", hrs: "hour", days: "day", weeks: "week", months: "month", years: "year", hertz: "hertz", radians: "rad", degree: "deg", degrees: "deg", gradian: "grad", gradians: "grad", cycles: "cycle", arcsecond: "arcsec", arcseconds: "arcsec", arcminute: "arcmin", arcminutes: "arcmin", BTUs: "BTU", watts: "watt", joules: "joule", amperes: "ampere", coulombs: "coulomb", volts: "volt", ohms: "ohm", farads: "farad", webers: "weber", teslas: "tesla", electronvolts: "electronvolt", moles: "mole" };x(t), u.on("config", function (e, t) {
        e.number !== t.number && x(e);
      });var Z = { si: { NONE: { unit: $, prefix: q.NONE[""] }, LENGTH: { unit: G.m, prefix: q.SHORT[""] }, MASS: { unit: G.g, prefix: q.SHORT.k }, TIME: { unit: G.s, prefix: q.SHORT[""] }, CURRENT: { unit: G.A, prefix: q.SHORT[""] }, TEMPERATURE: { unit: G.K, prefix: q.SHORT[""] }, LUMINOUS_INTENSITY: { unit: G.cd, prefix: q.SHORT[""] }, AMOUNT_OF_SUBSTANCE: { unit: G.mol, prefix: q.SHORT[""] }, ANGLE: { unit: G.rad, prefix: q.SHORT[""] }, BIT: { unit: G.bit, prefix: q.SHORT[""] }, FORCE: { unit: G.N, prefix: q.SHORT[""] }, ENERGY: { unit: G.J, prefix: q.SHORT[""] }, POWER: { unit: G.W, prefix: q.SHORT[""] }, PRESSURE: { unit: G.Pa, prefix: q.SHORT[""] }, ELECTRIC_CHARGE: { unit: G.C, prefix: q.SHORT[""] }, ELECTRIC_CAPACITANCE: { unit: G.F, prefix: q.SHORT[""] }, ELECTRIC_POTENTIAL: { unit: G.V, prefix: q.SHORT[""] }, ELECTRIC_RESISTANCE: { unit: G.ohm, prefix: q.SHORT[""] }, ELECTRIC_INDUCTANCE: { unit: G.H, prefix: q.SHORT[""] }, ELECTRIC_CONDUCTANCE: { unit: G.S, prefix: q.SHORT[""] }, MAGNETIC_FLUX: { unit: G.Wb, prefix: q.SHORT[""] }, MAGNETIC_FLUX_DENSITY: { unit: G.T, prefix: q.SHORT[""] }, FREQUENCY: { unit: G.Hz, prefix: q.SHORT[""] } } };Z.cgs = JSON.parse(JSON.stringify(Z.si)), Z.cgs.LENGTH = { unit: G.m, prefix: q.SHORT.c }, Z.cgs.MASS = { unit: G.g, prefix: q.SHORT[""] }, Z.cgs.FORCE = { unit: G.dyn, prefix: q.SHORT[""] }, Z.cgs.ENERGY = { unit: G.erg, prefix: q.NONE[""] }, Z.us = JSON.parse(JSON.stringify(Z.si)), Z.us.LENGTH = { unit: G.ft, prefix: q.NONE[""] }, Z.us.MASS = { unit: G.lbm, prefix: q.NONE[""] }, Z.us.TEMPERATURE = { unit: G.degF, prefix: q.NONE[""] }, Z.us.FORCE = { unit: G.lbf, prefix: q.NONE[""] }, Z.us.ENERGY = { unit: G.BTU, prefix: q.BTU[""] }, Z.us.POWER = { unit: G.hp, prefix: q.NONE[""] }, Z.us.PRESSURE = { unit: G.psi, prefix: q.NONE[""] }, Z.auto = JSON.parse(JSON.stringify(Z.si));var V = Z.auto;c.setUnitSystem = function (e) {
        if (!Z.hasOwnProperty(e)) throw new Error("Unit system " + e + " does not exist. Choices are: " + Object.keys(Z).join(", "));V = Z[e];
      }, c.getUnitSystem = function () {
        for (var e in Z) {
          if (Z[e] === V) return e;
        }
      }, c.typeConverters = { BigNumber: function BigNumber(t) {
          return new e.BigNumber(t + "");
        }, Fraction: function Fraction(t) {
          return new e.Fraction(t);
        }, Complex: function Complex(e) {
          return e;
        }, number: function number(e) {
          return e;
        } }, c._getNumberConverter = function (e) {
        if (!c.typeConverters[e]) throw new TypeError('Unsupported type "' + e + '"');return c.typeConverters[e];
      };for (var L in G) {
        var W = G[L];W.dimensions = W.base.dimensions;
      }for (var Y in H) {
        if (H.hasOwnProperty(Y)) {
          var W = G[H[Y]],
              X = {};for (var L in W) {
            W.hasOwnProperty(L) && (X[L] = W[L]);
          }X.name = Y, G[Y] = X;
        }
      }return c.createUnit = function (e, t) {
        if ("object" != (typeof e === "undefined" ? "undefined" : _typeof(e))) throw new TypeError("createUnit expects first parameter to be of type 'Object'");if (t && t.override) for (var r in e) {
          if (e.hasOwnProperty(r) && c.deleteUnit(r), e[r].aliases) for (var n = 0; n < e[r].aliases.length; n++) {
            c.deleteUnit(e[r].aliases[n]);
          }
        }var i;for (var r in e) {
          e.hasOwnProperty(r) && (i = c.createUnitSingle(r, e[r]));
        }return i;
      }, c.createUnitSingle = function (e, t, r) {
        if ("undefined" != typeof t && null !== t || (t = {}), "string" != typeof e) throw new TypeError("createUnitSingle expects first parameter to be of type 'string'");if (G.hasOwnProperty(e)) throw new Error('Cannot create unit "' + e + '": a unit with that name already exists');b(e);var n,
            i,
            a = null,
            o = [],
            s = 0;if (t && "Unit" === t.type) a = t.clone();else if ("string" == typeof t) "" !== t && (n = t);else {
          if ("object" != (typeof t === "undefined" ? "undefined" : _typeof(t))) throw new TypeError('Cannot create unit "' + e + '" from "' + t.toString() + '": expecting "string" or "Unit" or "Object"');n = t.definition, i = t.prefixes, s = t.offset, o = t.aliases;
        }if (o) for (var u = 0; u < o.length; u++) {
          if (G.hasOwnProperty(o[u])) throw new Error('Cannot create alias "' + o[u] + '": a unit with that name already exists');
        }if (n && "string" == typeof n && !a) try {
          a = c.parse(n, { allowNoUnits: !0 });
        } catch (f) {
          throw f.message = 'Could not create unit "' + e + '" from "' + n + '": ' + f.message, f;
        } else n && "Unit" === n.type && (a = n.clone());o = o || [], s = s || 0, i = i && i.toUpperCase ? q[i.toUpperCase()] || q.NONE : q.NONE;var l = {};if (a) {
          l = { name: e, value: a.value, dimensions: a.dimensions.slice(0), prefixes: i, offset: s };var p = !1;for (var u in F) {
            if (F.hasOwnProperty(u)) {
              for (var h = !0, m = 0; m < j.length; m++) {
                if (Math.abs((l.dimensions[m] || 0) - (F[u].dimensions[m] || 0)) > 1e-12) {
                  h = !1;break;
                }
              }if (h) {
                p = !0;break;
              }
            }
          }if (!p) {
            var d = e + "_STUFF",
                g = { dimensions: a.dimensions.slice(0) };g.key = d, F[d] = g, V[d] = { unit: l, prefix: q.NONE[""] }, l.base = d;
          }
        } else {
          var d = e + "_STUFF";if (j.indexOf(d) >= 0) throw new Error('Cannot create new base unit "' + e + '": a base unit with that name already exists (and cannot be overridden)');j.push(d);for (var v in F) {
            F.hasOwnProperty(v) && (F[v].dimensions[j.length - 1] = 0);
          }for (var g = { dimensions: [] }, u = 0; u < j.length; u++) {
            g.dimensions[u] = 0;
          }g.dimensions[j.length - 1] = 1, g.key = d, F[d] = g, l = { name: e, value: 1, dimensions: F[d].dimensions.slice(0), prefixes: i, offset: s, base: d }, V[d] = { unit: l, prefix: q.NONE[""] };
        }c.UNITS[e] = l;for (var u = 0; u < o.length; u++) {
          var y = o[u],
              x = {};for (var w in l) {
            l.hasOwnProperty(w) && (x[w] = l[w]);
          }x.name = y, c.UNITS[y] = x;
        }return new c(null, e);
      }, c.deleteUnit = function (e) {
        delete c.UNITS[e];
      }, c.PREFIXES = q, c.BASE_UNITS = F, c.UNITS = G, c.UNIT_SYSTEMS = Z, c;
    }var i = r(23).endsWith,
        a = r(3).clone,
        o = r(76);t.name = "Unit", t.path = "type", t.factory = n, t.math = !0;
  }, function (e, t, r) {
    function n(e) {
      return e[0].precision;
    }var i = r(45).memoize;t.e = i(function (e) {
      return new e(1).exp();
    }, n), t.phi = i(function (e) {
      return new e(1).plus(new e(5).sqrt()).div(2);
    }, n), t.pi = i(function (e) {
      return pi = e.acos(-1);
    }, n), t.tau = i(function (e) {
      return t.pi(e).times(2);
    }, n);
  }, function (e, t, r) {
    "use strict";
    function n(e, t, n, a) {
      var o = r(32),
          s = n(r(52)),
          u = n(r(53)),
          c = n(r(78)),
          f = n(r(54)),
          l = n(r(61)),
          p = n(r(79)),
          h = n(r(56)),
          m = n(r(57)),
          d = n(r(58)),
          g = a("subtract", { "number, number": function numberNumber(e, t) {
          return e - t;
        }, "Complex, Complex": function ComplexComplex(e, t) {
          return e.sub(t);
        }, "BigNumber, BigNumber": function BigNumberBigNumber(e, t) {
          return e.minus(t);
        }, "Fraction, Fraction": function FractionFraction(e, t) {
          return e.sub(t);
        }, "Unit, Unit": function UnitUnit(e, t) {
          if (null == e.value) throw new Error("Parameter x contains a unit with undefined value");if (null == t.value) throw new Error("Parameter y contains a unit with undefined value");if (!e.equalBase(t)) throw new Error("Units do not match");var r = e.clone();return r.value = g(r.value, t.value), r.fixPrefix = !1, r;
        }, "Matrix, Matrix": function MatrixMatrix(e, t) {
          var r = e.size(),
              n = t.size();if (r.length !== n.length) throw new i(r.length, n.length);var a;switch (e.storage()) {case "sparse":
              switch (t.storage()) {case "sparse":
                  a = p(e, t, g);break;default:
                  a = l(t, e, g, !0);}break;default:
              switch (t.storage()) {case "sparse":
                  a = f(e, t, g, !1);break;default:
                  a = m(e, t, g);}}return a;
        }, "Array, Array": function ArrayArray(e, t) {
          return g(s(e), s(t)).valueOf();
        }, "Array, Matrix": function ArrayMatrix(e, t) {
          return g(s(e), t);
        }, "Matrix, Array": function MatrixArray(e, t) {
          return g(e, s(t));
        }, "Matrix, any": function MatrixAny(e, t) {
          var r;switch (e.storage()) {case "sparse":
              r = h(e, c(t), u);break;default:
              r = d(e, t, g);}return r;
        }, "any, Matrix": function anyMatrix(e, t) {
          var r;switch (t.storage()) {case "sparse":
              r = h(t, e, g, !0);break;default:
              r = d(t, e, g, !0);}return r;
        }, "Array, any": function ArrayAny(e, t) {
          return d(s(e), t, g, !1).valueOf();
        }, "any, Array": function anyArray(e, t) {
          return d(s(t), e, g, !0).valueOf();
        } });return g.toTex = { 2: "\\left(${args[0]}" + o.operators.subtract + "${args[1]}\\right)" }, g;
    }var i = r(42);t.name = "subtract", t.factory = n;
  }, function (e, t, r) {
    "use strict";
    function n(e, t, n, a) {
      var o = r(32),
          s = a("unaryMinus", { number: function number(e) {
          return -e;
        }, Complex: function Complex(e) {
          return e.neg();
        }, BigNumber: function BigNumber(e) {
          return e.neg();
        }, Fraction: function Fraction(e) {
          return e.neg();
        }, Unit: function Unit(e) {
          var t = e.clone();return t.value = s(e.value), t;
        }, "Array | Matrix": function ArrayMatrix(e) {
          return i(e, s, !0);
        } });return s.toTex = { 1: o.operators.unaryMinus + "\\left(${args[0]}\\right)" }, s;
    }var i = r(19);t.name = "unaryMinus", t.factory = n;
  }, function (e, t, r) {
    "use strict";
    function n(e, t, n, a) {
      var o = n(r(48)),
          s = e.SparseMatrix,
          u = function u(e, t, r) {
        var n = e._values,
            u = e._index,
            c = e._ptr,
            f = e._size,
            l = e._datatype,
            p = t._values,
            h = t._index,
            m = t._ptr,
            d = t._size,
            g = t._datatype;if (f.length !== d.length) throw new i(f.length, d.length);if (f[0] !== d[0] || f[1] !== d[1]) throw new RangeError("Dimension mismatch. Matrix A (" + f + ") must match Matrix B (" + d + ")");var v,
            y = f[0],
            x = f[1],
            b = o,
            w = 0,
            N = r;"string" == typeof l && l === g && (v = l, b = a.find(o, [v, v]), w = a.convert(0, v), N = a.find(r, [v, v]));var E,
            M,
            A,
            O,
            _ = n && p ? [] : void 0,
            T = [],
            C = [],
            S = new s({ values: _, index: T, ptr: C, size: [y, x], datatype: v }),
            z = _ ? [] : void 0,
            B = _ ? [] : void 0,
            k = [],
            I = [];for (M = 0; x > M; M++) {
          C[M] = T.length;var P = M + 1;for (A = c[M], O = c[M + 1]; O > A; A++) {
            E = u[A], T.push(E), k[E] = P, z && (z[E] = n[A]);
          }for (A = m[M], O = m[M + 1]; O > A; A++) {
            E = h[A], k[E] !== P && T.push(E), I[E] = P, B && (B[E] = p[A]);
          }if (_) for (A = C[M]; A < T.length;) {
            E = T[A];var R = k[E],
                U = I[E];if (R === P || U === P) {
              var q = R === P ? z[E] : w,
                  L = U === P ? B[E] : w,
                  j = N(q, L);b(j, w) ? T.splice(A, 1) : (_.push(j), A++);
            }
          }
        }return C[x] = T.length, S;
      };return u;
    }var i = r(42);t.name = "algorithm05", t.factory = n;
  }, function (e, t) {
    "use strict";
    function r(e, t, r, n) {
      var i = n("multiplyScalar", { "number, number": function numberNumber(e, t) {
          return e * t;
        }, "Complex, Complex": function ComplexComplex(e, t) {
          return e.mul(t);
        }, "BigNumber, BigNumber": function BigNumberBigNumber(e, t) {
          return e.times(t);
        }, "Fraction, Fraction": function FractionFraction(e, t) {
          return e.mul(t);
        }, "number | Fraction | BigNumber | Complex, Unit": function numberFractionBigNumberComplexUnit(e, t) {
          var r = t.clone();return r.value = null === r.value ? r._normalize(e) : i(r.value, e), r;
        }, "Unit, number | Fraction | BigNumber | Complex": function UnitNumberFractionBigNumberComplex(e, t) {
          var r = e.clone();return r.value = null === r.value ? r._normalize(t) : i(r.value, t), r;
        }, "Unit, Unit": function UnitUnit(e, t) {
          return e.multiply(t);
        } });return i;
    }t.factory = r;
  }, function (e, t, r) {
    "use strict";
    function n(e, t, n, i) {
      var a = n(r(80)),
          o = i("divide", { "number, number": function numberNumber(e, t) {
          return e / t;
        }, "Complex, Complex": function ComplexComplex(e, t) {
          return e.div(t);
        }, "BigNumber, BigNumber": function BigNumberBigNumber(e, t) {
          return e.div(t);
        }, "Fraction, Fraction": function FractionFraction(e, t) {
          return e.div(t);
        }, "Unit, number | Fraction | BigNumber": function UnitNumberFractionBigNumber(e, t) {
          var r = e.clone();return r.value = o(null === r.value ? r._normalize(1) : r.value, t), r;
        }, "number | Fraction | BigNumber, Unit": function numberFractionBigNumberUnit(e, t) {
          var r = t.pow(-1);return r.value = a(null === r.value ? r._normalize(1) : r.value, e), r;
        }, "Unit, Unit": function UnitUnit(e, t) {
          return e.divide(t);
        } });return o;
    }t.factory = n;
  }, function (e, t, r) {
    "use strict";
    function n(e, t, n, o) {
      function s(r, n) {
        if (t.predictable && !i(n) && 0 > r) try {
          var a = m(n),
              o = d(a);if ((n === o || Math.abs((n - o) / n) < 1e-14) && a.d % 2 === 1) return (a.n % 2 === 0 ? 1 : -1) * Math.pow(-r, n);
        } catch (s) {}return i(n) || r >= 0 || t.predictable ? Math.pow(r, n) : new e.Complex(r, 0).pow(n, 0);
      }function u(e, t) {
        if (!i(t) || 0 > t) throw new TypeError("For A^b, b must be a positive integer (value is " + t + ")");var r = a(e);if (2 != r.length) throw new Error("For A^b, A must be 2 dimensional (A has " + r.length + " dimensions)");if (r[0] != r[1]) throw new Error("For A^b, A must be square (size is " + r[0] + "x" + r[1] + ")");for (var n = l(r[0]).valueOf(), o = e; t >= 1;) {
          1 == (1 & t) && (n = p(o, n)), t >>= 1, o = p(o, o);
        }return n;
      }function c(e, t) {
        return h(u(e.valueOf(), t));
      }var f = r(32),
          l = n(r(83)),
          p = n(r(84)),
          h = n(r(52)),
          m = n(r(36)),
          d = n(r(70)),
          g = o("pow", { "number, number": s, "Complex, Complex": function ComplexComplex(e, t) {
          return e.pow(t);
        }, "BigNumber, BigNumber": function BigNumberBigNumber(r, n) {
          return n.isInteger() || r >= 0 || t.predictable ? r.pow(n) : new e.Complex(r.toNumber(), 0).pow(n.toNumber(), 0);
        }, "Fraction, Fraction": function FractionFraction(e, r) {
          if (1 !== r.d) {
            if (t.predictable) throw new Error("Function pow does not support non-integer exponents for fractions.");return s(e.valueOf(), r.valueOf());
          }return e.pow(r);
        }, "Array, number": u, "Array, BigNumber": function ArrayBigNumber(e, t) {
          return u(e, t.toNumber());
        }, "Matrix, number": c, "Matrix, BigNumber": function MatrixBigNumber(e, t) {
          return c(e, t.toNumber());
        }, "Unit, number": function UnitNumber(e, t) {
          return e.pow(t);
        } });return g.toTex = { 2: "\\left(${args[0]}\\right)" + f.operators.pow + "{${args[1]}}"
      }, g;
    }var i = r(6).isInteger,
        a = r(40).size;t.name = "pow", t.factory = n;
  }, function (e, t, r) {
    "use strict";
    function n(e, t, n, o) {
      function s(e, t) {
        switch (e.length) {case 0:
            return t ? c(t) : [];case 1:
            return u(e[0], e[0], t);case 2:
            return u(e[0], e[1], t);default:
            throw new Error("Vector containing two values expected");}
      }function u(t, r, n) {
        var o = t && t.isBigNumber === !0 ? e.BigNumber : r && r.isBigNumber === !0 ? e.BigNumber : null;if (t && t.isBigNumber === !0 && (t = t.toNumber()), r && r.isBigNumber === !0 && (r = r.toNumber()), !a(t) || 1 > t) throw new Error("Parameters in function eye must be positive integers");if (!a(r) || 1 > r) throw new Error("Parameters in function eye must be positive integers");var s = o ? new e.BigNumber(1) : 1,
            u = o ? new o(0) : 0,
            c = [t, r];if (n) {
          var f = e.Matrix.storage(n);return f.diagonal(c, s, 0, u);
        }for (var l = i.resize([], c, u), p = r > t ? t : r, h = 0; p > h; h++) {
          l[h][h] = s;
        }return l;
      }var c = n(r(52)),
          f = o("eye", { "": function _() {
          return "Matrix" === t.matrix ? c([]) : [];
        }, string: function string(e) {
          return c(e);
        }, "number | BigNumber": function numberBigNumber(e) {
          return u(e, e, "Matrix" === t.matrix ? "default" : void 0);
        }, "number | BigNumber, string": function numberBigNumberString(e, t) {
          return u(e, e, t);
        }, "number | BigNumber, number | BigNumber": function numberBigNumberNumberBigNumber(e, r) {
          return u(e, r, "Matrix" === t.matrix ? "default" : void 0);
        }, "number | BigNumber, number | BigNumber, string": function numberBigNumberNumberBigNumberString(e, t, r) {
          return u(e, t, r);
        }, Array: function Array(e) {
          return s(e);
        }, "Array, string": function ArrayString(e, t) {
          return s(e, t);
        }, Matrix: function Matrix(e) {
          return s(e.valueOf(), e.storage());
        }, "Matrix, string": function MatrixString(e, t) {
          return s(e.valueOf(), t);
        } });return f.toTex = void 0, f;
    }var i = r(40),
        a = r(6).isInteger;t.name = "eye", t.factory = n;
  }, function (e, t, r) {
    "use strict";
    function n(e, t, n, o) {
      var s = r(32),
          u = n(r(52)),
          c = n(r(53)),
          f = n(r(80)),
          l = n(r(48)),
          p = n(r(85)),
          h = n(r(58)),
          m = e.DenseMatrix,
          d = e.SparseMatrix,
          g = o("multiply", i({ "Array, Array": function ArrayArray(e, t) {
          v(a.size(e), a.size(t));var r = g(u(e), u(t));return r && r.isMatrix === !0 ? r.valueOf() : r;
        }, "Matrix, Matrix": function MatrixMatrix(e, t) {
          var r = e.size(),
              n = t.size();return v(r, n), 1 === r.length ? 1 === n.length ? y(e, t, r[0]) : x(e, t) : 1 === n.length ? w(e, t) : N(e, t);
        }, "Matrix, Array": function MatrixArray(e, t) {
          return g(e, u(t));
        }, "Array, Matrix": function ArrayMatrix(e, t) {
          return g(u(e, t.storage()), t);
        }, "Matrix, any": function MatrixAny(e, t) {
          var r;switch (e.storage()) {case "sparse":
              r = p(e, t, f, !1);break;case "dense":
              r = h(e, t, f, !1);}return r;
        }, "any, Matrix": function anyMatrix(e, t) {
          var r;switch (t.storage()) {case "sparse":
              r = p(t, e, f, !0);break;case "dense":
              r = h(t, e, f, !0);}return r;
        }, "Array, any": function ArrayAny(e, t) {
          return h(u(e), t, f, !1).valueOf();
        }, "any, Array": function anyArray(e, t) {
          return h(u(t), e, f, !0).valueOf();
        }, "any, any": f, "any, any, ...any": function anyAnyAny(e, t, r) {
          for (var n = g(e, t), i = 0; i < r.length; i++) {
            n = g(n, r[i]);
          }return n;
        } }, f.signatures)),
          v = function v(e, t) {
        switch (e.length) {case 1:
            switch (t.length) {case 1:
                if (e[0] !== t[0]) throw new RangeError("Dimension mismatch in multiplication. Vectors must have the same length");break;case 2:
                if (e[0] !== t[0]) throw new RangeError("Dimension mismatch in multiplication. Vector length (" + e[0] + ") must match Matrix rows (" + t[0] + ")");break;default:
                throw new Error("Can only multiply a 1 or 2 dimensional matrix (Matrix B has " + t.length + " dimensions)");}break;case 2:
            switch (t.length) {case 1:
                if (e[1] !== t[0]) throw new RangeError("Dimension mismatch in multiplication. Matrix columns (" + e[1] + ") must match Vector length (" + t[0] + ")");break;case 2:
                if (e[1] !== t[0]) throw new RangeError("Dimension mismatch in multiplication. Matrix A columns (" + e[1] + ") must match Matrix B rows (" + t[0] + ")");break;default:
                throw new Error("Can only multiply a 1 or 2 dimensional matrix (Matrix B has " + t.length + " dimensions)");}break;default:
            throw new Error("Can only multiply a 1 or 2 dimensional matrix (Matrix A has " + e.length + " dimensions)");}
      },
          y = function y(e, t, r) {
        if (0 === r) throw new Error("Cannot multiply two empty vectors");var n,
            i = e._data,
            a = e._datatype,
            s = t._data,
            u = t._datatype,
            l = c,
            p = f;a && u && a === u && "string" == typeof a && (n = a, l = o.find(c, [n, n]), p = o.find(f, [n, n]));for (var h = p(i[0], s[0]), m = 1; r > m; m++) {
          h = l(h, p(i[m], s[m]));
        }return h;
      },
          x = function x(e, t) {
        switch (t.storage()) {case "dense":
            return b(e, t);}throw new Error("Not implemented");
      },
          b = function b(e, t) {
        var r,
            n = e._data,
            i = e._size,
            a = e._datatype,
            s = t._data,
            u = t._size,
            l = t._datatype,
            p = i[0],
            h = u[1],
            d = c,
            g = f;a && l && a === l && "string" == typeof a && (r = a, d = o.find(c, [r, r]), g = o.find(f, [r, r]));for (var v = [], y = 0; h > y; y++) {
          for (var x = g(n[0], s[0][y]), b = 1; p > b; b++) {
            x = d(x, g(n[b], s[b][y]));
          }v[y] = x;
        }return new m({ data: v, size: [h], datatype: r });
      },
          w = function w(e, t) {
        switch (e.storage()) {case "dense":
            return E(e, t);case "sparse":
            return O(e, t);}
      },
          N = function N(e, t) {
        switch (e.storage()) {case "dense":
            switch (t.storage()) {case "dense":
                return M(e, t);case "sparse":
                return A(e, t);}break;case "sparse":
            switch (t.storage()) {case "dense":
                return _(e, t);case "sparse":
                return T(e, t);}}
      },
          E = function E(e, t) {
        var r,
            n = e._data,
            i = e._size,
            a = e._datatype,
            s = t._data,
            u = t._datatype,
            l = i[0],
            p = i[1],
            h = c,
            d = f;a && u && a === u && "string" == typeof a && (r = a, h = o.find(c, [r, r]), d = o.find(f, [r, r]));for (var g = [], v = 0; l > v; v++) {
          for (var y = n[v], x = d(y[0], s[0]), b = 1; p > b; b++) {
            x = h(x, d(y[b], s[b]));
          }g[v] = x;
        }return new m({ data: g, size: [l], datatype: r });
      },
          M = function M(e, t) {
        var r,
            n = e._data,
            i = e._size,
            a = e._datatype,
            s = t._data,
            u = t._size,
            l = t._datatype,
            p = i[0],
            h = i[1],
            d = u[1],
            g = c,
            v = f;a && l && a === l && "string" == typeof a && (r = a, g = o.find(c, [r, r]), v = o.find(f, [r, r]));for (var y = [], x = 0; p > x; x++) {
          var b = n[x];y[x] = [];for (var w = 0; d > w; w++) {
            for (var N = v(b[0], s[0][w]), E = 1; h > E; E++) {
              N = g(N, v(b[E], s[E][w]));
            }y[x][w] = N;
          }
        }return new m({ data: y, size: [p, d], datatype: r });
      },
          A = function A(e, t) {
        var r = e._data,
            n = e._size,
            i = e._datatype,
            a = t._values,
            s = t._index,
            u = t._ptr,
            p = t._size,
            h = t._datatype;if (!a) throw new Error("Cannot multiply Dense Matrix times Pattern only Matrix");var m,
            g = n[0],
            v = p[1],
            y = c,
            x = f,
            b = l,
            w = 0;i && h && i === h && "string" == typeof i && (m = i, y = o.find(c, [m, m]), x = o.find(f, [m, m]), b = o.find(l, [m, m]), w = o.convert(0, m));for (var N = [], E = [], M = [], A = new d({ values: N, index: E, ptr: M, size: [g, v], datatype: m }), O = 0; v > O; O++) {
          M[O] = E.length;var _ = u[O],
              T = u[O + 1];if (T > _) for (var C = 0, S = 0; g > S; S++) {
            for (var z, B = S + 1, k = _; T > k; k++) {
              var I = s[k];C !== B ? (z = x(r[S][I], a[k]), C = B) : z = y(z, x(r[S][I], a[k]));
            }C !== B || b(z, w) || (E.push(S), N.push(z));
          }
        }return M[v] = E.length, A;
      },
          O = function O(e, t) {
        var r = e._values,
            n = e._index,
            i = e._ptr,
            a = e._datatype;if (!r) throw new Error("Cannot multiply Pattern only Matrix times Dense Matrix");var s,
            u = t._data,
            p = t._datatype,
            h = e._size[0],
            m = t._size[0],
            g = [],
            v = [],
            y = [],
            x = c,
            b = f,
            w = l,
            N = 0;a && p && a === p && "string" == typeof a && (s = a, x = o.find(c, [s, s]), b = o.find(f, [s, s]), w = o.find(l, [s, s]), N = o.convert(0, s));var E = [],
            M = [];y[0] = 0;for (var A = 0; m > A; A++) {
          var O = u[A];if (!w(O, N)) for (var _ = i[A], T = i[A + 1], C = _; T > C; C++) {
            var S = n[C];M[S] ? E[S] = x(E[S], b(O, r[C])) : (M[S] = !0, v.push(S), E[S] = b(O, r[C]));
          }
        }for (var z = v.length, B = 0; z > B; B++) {
          var k = v[B];g[B] = E[k];
        }return y[1] = v.length, new d({ values: g, index: v, ptr: y, size: [h, 1], datatype: s });
      },
          _ = function _(e, t) {
        var r = e._values,
            n = e._index,
            i = e._ptr,
            a = e._datatype;if (!r) throw new Error("Cannot multiply Pattern only Matrix times Dense Matrix");var s,
            u = t._data,
            p = t._datatype,
            h = e._size[0],
            m = t._size[0],
            g = t._size[1],
            v = c,
            y = f,
            x = l,
            b = 0;a && p && a === p && "string" == typeof a && (s = a, v = o.find(c, [s, s]), y = o.find(f, [s, s]), x = o.find(l, [s, s]), b = o.convert(0, s));for (var w = [], N = [], E = [], M = new d({ values: w, index: N, ptr: E, size: [h, g], datatype: s }), A = [], O = [], _ = 0; g > _; _++) {
          E[_] = N.length;for (var T = _ + 1, C = 0; m > C; C++) {
            var S = u[C][_];if (!x(S, b)) for (var z = i[C], B = i[C + 1], k = z; B > k; k++) {
              var I = n[k];O[I] !== T ? (O[I] = T, N.push(I), A[I] = y(S, r[k])) : A[I] = v(A[I], y(S, r[k]));
            }
          }for (var P = E[_], R = N.length, U = P; R > U; U++) {
            var q = N[U];w[U] = A[q];
          }
        }return E[g] = N.length, M;
      },
          T = function T(e, t) {
        var r,
            n = e._values,
            i = e._index,
            a = e._ptr,
            s = e._datatype,
            u = t._values,
            l = t._index,
            p = t._ptr,
            h = t._datatype,
            m = e._size[0],
            g = t._size[1],
            v = n && u,
            y = c,
            x = f;s && h && s === h && "string" == typeof s && (r = s, y = o.find(c, [r, r]), x = o.find(f, [r, r]));for (var b, w, N, E, M, A, O, _, T = v ? [] : void 0, C = [], S = [], z = new d({ values: T, index: C, ptr: S, size: [m, g], datatype: r }), B = v ? [] : void 0, k = [], I = 0; g > I; I++) {
          S[I] = C.length;var P = I + 1;for (M = p[I], A = p[I + 1], E = M; A > E; E++) {
            if (_ = l[E], v) for (w = a[_], N = a[_ + 1], b = w; N > b; b++) {
              O = i[b], k[O] !== P ? (k[O] = P, C.push(O), B[O] = x(u[E], n[b])) : B[O] = y(B[O], x(u[E], n[b]));
            } else for (w = a[_], N = a[_ + 1], b = w; N > b; b++) {
              O = i[b], k[O] !== P && (k[O] = P, C.push(O));
            }
          }if (v) for (var R = S[I], U = C.length, q = R; U > q; q++) {
            var L = C[q];T[q] = B[L];
          }
        }return S[g] = C.length, z;
      };return g.toTex = { 2: "\\left(${args[0]}" + s.operators.multiply + "${args[1]}\\right)" }, g;
    }var i = r(3).extend,
        a = r(40);t.name = "multiply", t.factory = n;
  }, function (e, t, r) {
    "use strict";
    function n(e, t, n, i) {
      var a = n(r(48)),
          o = e.SparseMatrix,
          s = function s(e, t, r, n) {
        var s = e._values,
            u = e._index,
            c = e._ptr,
            f = e._size,
            l = e._datatype;if (!s) throw new Error("Cannot perform operation on Pattern Sparse Matrix and Scalar value");var p,
            h = f[0],
            m = f[1],
            d = a,
            g = 0,
            v = r;"string" == typeof l && (p = l, d = i.find(a, [p, p]), g = i.convert(0, p), t = i.convert(t, p), v = i.find(r, [p, p]));for (var y = [], x = [], b = [], w = new o({ values: y, index: x, ptr: b, size: [h, m], datatype: p }), N = 0; m > N; N++) {
          b[N] = x.length;for (var E = c[N], M = c[N + 1], A = E; M > A; A++) {
            var O = u[A],
                _ = n ? v(t, s[A]) : v(s[A], t);d(_, g) || (x.push(O), y.push(_));
          }
        }return b[m] = x.length, w;
      };return s;
    }t.name = "algorithm11", t.factory = n;
  }, function (e, t, r) {
    "use strict";
    function n(e, t, r, n) {
      var a = n("abs", { number: Math.abs, Complex: function Complex(e) {
          return e.abs();
        }, BigNumber: function BigNumber(e) {
          return e.abs();
        }, Fraction: function Fraction(e) {
          return e.abs();
        }, "Array | Matrix": function ArrayMatrix(e) {
          return i(e, a, !0);
        }, Unit: function Unit(e) {
          return e.abs();
        } });return a.toTex = { 1: "\\left|${args[0]}\\right|" }, a;
    }var i = r(19);t.name = "abs", t.factory = n;
  }, function (e, t, r) {
    "use strict";
    function n(e, t, r, n) {
      var a = n("fix", { number: function number(e) {
          return e > 0 ? Math.floor(e) : Math.ceil(e);
        }, Complex: function Complex(t) {
          return new e.Complex(t.re > 0 ? Math.floor(t.re) : Math.ceil(t.re), t.im > 0 ? Math.floor(t.im) : Math.ceil(t.im));
        }, BigNumber: function BigNumber(e) {
          return e.isNegative() ? e.ceil() : e.floor();
        }, Fraction: function Fraction(e) {
          return e.s < 0 ? e.ceil() : e.floor();
        }, "Array | Matrix": function ArrayMatrix(e) {
          return i(e, a, !0);
        } });return a.toTex = { 1: "\\mathrm{${name}}\\left(${args[0]}\\right)" }, a;
    }var i = r(19);t.name = "fix", t.factory = n;
  }, function (e, t, r) {
    "use strict";
    function n(e, t, n, i) {
      var a = n(r(52)),
          o = n(r(48)),
          s = n(r(61)),
          u = n(r(62)),
          c = n(r(63)),
          f = n(r(57)),
          l = n(r(58)),
          p = r(32),
          h = i("equal", { "any, any": function anyAny(e, t) {
          return null === e ? null === t : null === t ? null === e : void 0 === e ? void 0 === t : void 0 === t ? void 0 === e : o(e, t);
        }, "Matrix, Matrix": function MatrixMatrix(e, t) {
          var r;switch (e.storage()) {case "sparse":
              switch (t.storage()) {case "sparse":
                  r = u(e, t, o);break;default:
                  r = s(t, e, o, !0);}break;default:
              switch (t.storage()) {case "sparse":
                  r = s(e, t, o, !1);break;default:
                  r = f(e, t, o);}}return r;
        }, "Array, Array": function ArrayArray(e, t) {
          return h(a(e), a(t)).valueOf();
        }, "Array, Matrix": function ArrayMatrix(e, t) {
          return h(a(e), t);
        }, "Matrix, Array": function MatrixArray(e, t) {
          return h(e, a(t));
        }, "Matrix, any": function MatrixAny(e, t) {
          var r;switch (e.storage()) {case "sparse":
              r = c(e, t, o, !1);break;default:
              r = l(e, t, o, !1);}return r;
        }, "any, Matrix": function anyMatrix(e, t) {
          var r;switch (t.storage()) {case "sparse":
              r = c(t, e, o, !0);break;default:
              r = l(t, e, o, !0);}return r;
        }, "Array, any": function ArrayAny(e, t) {
          return l(a(e), t, o, !1).valueOf();
        }, "any, Array": function anyArray(e, t) {
          return l(a(t), e, o, !0).valueOf();
        } });return h.toTex = { 2: "\\left(${args[0]}" + p.operators.equal + "${args[1]}\\right)" }, h;
    }t.name = "equal", t.factory = n;
  }, function (e, t, r) {
    "use strict";
    function n(e, t, r, n) {
      var a = n("isNumeric", { "number | BigNumber | Fraction | boolean": function numberBigNumberFractionBoolean() {
          return !0;
        }, "Complex | Unit | string": function ComplexUnitString() {
          return !1;
        }, "Array | Matrix": function ArrayMatrix(e) {
          return i(e, a);
        } });return a;
    }var i = r(19);r(6);t.name = "isNumeric", t.factory = n;
  }, function (e, t, r) {
    "use strict";
    function n(e, t, r, n) {
      var a = n("format", { any: i.format, "any, Object | function | number": i.format });return a.toTex = void 0, a;
    }var i = r(23);t.name = "format", t.factory = n;
  }, function (e, t, r) {
    "use strict";
    function n(e, t, r, n) {
      var a = n("_typeof", { any: function any(e) {
          var t = i.type(e);if ("Object" === t) {
            if (e.isBigNumber === !0) return "BigNumber";if (e.isComplex === !0) return "Complex";if (e.isFraction === !0) return "Fraction";if (e.isMatrix === !0) return "Matrix";if (e.isUnit === !0) return "Unit";if (e.isIndex === !0) return "Index";if (e.isRange === !0) return "Range";if (e.isChain === !0) return "Chain";if (e.isHelp === !0) return "Help";
          }return t;
        } });return a.toTex = void 0, a;
    }var i = r(41);t.name = "typeof", t.factory = n;
  }, function (e, t, r) {
    (function (e, n) {
      function i(e, r) {
        var n = { seen: [], stylize: o };return arguments.length >= 3 && (n.depth = arguments[2]), arguments.length >= 4 && (n.colors = arguments[3]), d(r) ? n.showHidden = r : r && t._extend(n, r), w(n.showHidden) && (n.showHidden = !1), w(n.depth) && (n.depth = 2), w(n.colors) && (n.colors = !1), w(n.customInspect) && (n.customInspect = !0), n.colors && (n.stylize = a), u(n, e, n.depth);
      }function a(e, t) {
        var r = i.styles[t];return r ? "[" + i.colors[r][0] + "m" + e + "[" + i.colors[r][1] + "m" : e;
      }function o(e, t) {
        return e;
      }function s(e) {
        var t = {};return e.forEach(function (e, r) {
          t[e] = !0;
        }), t;
      }function u(e, r, n) {
        if (e.customInspect && r && O(r.inspect) && r.inspect !== t.inspect && (!r.constructor || r.constructor.prototype !== r)) {
          var i = r.inspect(n, e);return x(i) || (i = u(e, i, n)), i;
        }var a = c(e, r);if (a) return a;var o = Object.keys(r),
            d = s(o);if (e.showHidden && (o = Object.getOwnPropertyNames(r)), A(r) && (o.indexOf("message") >= 0 || o.indexOf("description") >= 0)) return f(r);if (0 === o.length) {
          if (O(r)) {
            var g = r.name ? ": " + r.name : "";return e.stylize("[Function" + g + "]", "special");
          }if (N(r)) return e.stylize(RegExp.prototype.toString.call(r), "regexp");if (M(r)) return e.stylize(Date.prototype.toString.call(r), "date");if (A(r)) return f(r);
        }var v = "",
            y = !1,
            b = ["{", "}"];if (m(r) && (y = !0, b = ["[", "]"]), O(r)) {
          var w = r.name ? ": " + r.name : "";v = " [Function" + w + "]";
        }if (N(r) && (v = " " + RegExp.prototype.toString.call(r)), M(r) && (v = " " + Date.prototype.toUTCString.call(r)), A(r) && (v = " " + f(r)), 0 === o.length && (!y || 0 == r.length)) return b[0] + v + b[1];if (0 > n) return N(r) ? e.stylize(RegExp.prototype.toString.call(r), "regexp") : e.stylize("[Object]", "special");e.seen.push(r);var E;return E = y ? l(e, r, n, d, o) : o.map(function (t) {
          return p(e, r, n, d, t, y);
        }), e.seen.pop(), h(E, v, b);
      }function c(e, t) {
        if (w(t)) return e.stylize("undefined", "undefined");if (x(t)) {
          var r = "'" + JSON.stringify(t).replace(/^"|"$/g, "").replace(/'/g, "\\'").replace(/\\"/g, '"') + "'";return e.stylize(r, "string");
        }return y(t) ? e.stylize("" + t, "number") : d(t) ? e.stylize("" + t, "boolean") : g(t) ? e.stylize("null", "null") : void 0;
      }function f(e) {
        return "[" + Error.prototype.toString.call(e) + "]";
      }function l(e, t, r, n, i) {
        for (var a = [], o = 0, s = t.length; s > o; ++o) {
          z(t, String(o)) ? a.push(p(e, t, r, n, String(o), !0)) : a.push("");
        }return i.forEach(function (i) {
          i.match(/^\d+$/) || a.push(p(e, t, r, n, i, !0));
        }), a;
      }function p(e, t, r, n, i, a) {
        var o, s, c;if (c = Object.getOwnPropertyDescriptor(t, i) || { value: t[i] }, c.get ? s = c.set ? e.stylize("[Getter/Setter]", "special") : e.stylize("[Getter]", "special") : c.set && (s = e.stylize("[Setter]", "special")), z(n, i) || (o = "[" + i + "]"), s || (e.seen.indexOf(c.value) < 0 ? (s = g(r) ? u(e, c.value, null) : u(e, c.value, r - 1), s.indexOf("\n") > -1 && (s = a ? s.split("\n").map(function (e) {
          return "  " + e;
        }).join("\n").substr(2) : "\n" + s.split("\n").map(function (e) {
          return "   " + e;
        }).join("\n"))) : s = e.stylize("[Circular]", "special")), w(o)) {
          if (a && i.match(/^\d+$/)) return s;o = JSON.stringify("" + i), o.match(/^"([a-zA-Z_][a-zA-Z_0-9]*)"$/) ? (o = o.substr(1, o.length - 2), o = e.stylize(o, "name")) : (o = o.replace(/'/g, "\\'").replace(/\\"/g, '"').replace(/(^"|"$)/g, "'"), o = e.stylize(o, "string"));
        }return o + ": " + s;
      }function h(e, t, r) {
        var n = 0,
            i = e.reduce(function (e, t) {
          return n++, t.indexOf("\n") >= 0 && n++, e + t.replace(/\u001b\[\d\d?m/g, "").length + 1;
        }, 0);return i > 60 ? r[0] + ("" === t ? "" : t + "\n ") + " " + e.join(",\n  ") + " " + r[1] : r[0] + t + " " + e.join(", ") + " " + r[1];
      }function m(e) {
        return Array.isArray(e);
      }function d(e) {
        return "boolean" == typeof e;
      }function g(e) {
        return null === e;
      }function v(e) {
        return null == e;
      }function y(e) {
        return "number" == typeof e;
      }function x(e) {
        return "string" == typeof e;
      }function b(e) {
        return "symbol" == (typeof e === "undefined" ? "undefined" : _typeof(e));
      }function w(e) {
        return void 0 === e;
      }function N(e) {
        return E(e) && "[object RegExp]" === T(e);
      }function E(e) {
        return "object" == (typeof e === "undefined" ? "undefined" : _typeof(e)) && null !== e;
      }function M(e) {
        return E(e) && "[object Date]" === T(e);
      }function A(e) {
        return E(e) && ("[object Error]" === T(e) || e instanceof Error);
      }function O(e) {
        return "function" == typeof e;
      }function _(e) {
        return null === e || "boolean" == typeof e || "number" == typeof e || "string" == typeof e || "symbol" == (typeof e === "undefined" ? "undefined" : _typeof(e)) || "undefined" == typeof e;
      }function T(e) {
        return Object.prototype.toString.call(e);
      }function C(e) {
        return 10 > e ? "0" + e.toString(10) : e.toString(10);
      }function S() {
        var e = new Date(),
            t = [C(e.getHours()), C(e.getMinutes()), C(e.getSeconds())].join(":");return [e.getDate(), P[e.getMonth()], t].join(" ");
      }function z(e, t) {
        return Object.prototype.hasOwnProperty.call(e, t);
      }var B = /%[sdj%]/g;t.format = function (e) {
        if (!x(e)) {
          for (var t = [], r = 0; r < arguments.length; r++) {
            t.push(i(arguments[r]));
          }return t.join(" ");
        }for (var r = 1, n = arguments, a = n.length, o = String(e).replace(B, function (e) {
          if ("%%" === e) return "%";if (r >= a) return e;switch (e) {case "%s":
              return String(n[r++]);case "%d":
              return Number(n[r++]);case "%j":
              try {
                return JSON.stringify(n[r++]);
              } catch (t) {
                return "[Circular]";
              }default:
              return e;}
        }), s = n[r]; a > r; s = n[++r]) {
          o += g(s) || !E(s) ? " " + s : " " + i(s);
        }return o;
      }, t.deprecate = function (r, i) {
        function a() {
          if (!o) {
            if (n.throwDeprecation) throw new Error(i);n.traceDeprecation ? console.trace(i) : console.error(i), o = !0;
          }return r.apply(this, arguments);
        }if (w(e.process)) return function () {
          return t.deprecate(r, i).apply(this, arguments);
        };if (n.noDeprecation === !0) return r;var o = !1;return a;
      };var k,
          I = {};t.debuglog = function (e) {
        if (w(k) && (k = n.env.NODE_DEBUG || ""), e = e.toUpperCase(), !I[e]) if (new RegExp("\\b" + e + "\\b", "i").test(k)) {
          var r = n.pid;I[e] = function () {
            var n = t.format.apply(t, arguments);console.error("%s %d: %s", e, r, n);
          };
        } else I[e] = function () {};return I[e];
      }, t.inspect = i, i.colors = { bold: [1, 22], italic: [3, 23], underline: [4, 24], inverse: [7, 27], white: [37, 39], grey: [90, 39], black: [30, 39], blue: [34, 39], cyan: [36, 39], green: [32, 39], magenta: [35, 39], red: [31, 39], yellow: [33, 39] }, i.styles = { special: "cyan", number: "yellow", "boolean": "yellow", undefined: "grey", "null": "bold", string: "green", date: "magenta", regexp: "red" }, t.isArray = m, t.isBoolean = d, t.isNull = g, t.isNullOrUndefined = v, t.isNumber = y, t.isString = x, t.isSymbol = b, t.isUndefined = w, t.isRegExp = N, t.isObject = E, t.isDate = M, t.isError = A, t.isFunction = O, t.isPrimitive = _, t.isBuffer = r(94);var P = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];t.log = function () {
        console.log("%s - %s", S(), t.format.apply(t, arguments));
      }, t.inherits = r(95), t._extend = function (e, t) {
        if (!t || !E(t)) return e;for (var r = Object.keys(t), n = r.length; n--;) {
          e[r[n]] = t[r[n]];
        }return e;
      };
    }).call(t, function () {
      return this;
    }(), r(93));
  }, function (e, t) {
    function r() {
      c = !1, o.length ? u = o.concat(u) : f = -1, u.length && n();
    }function n() {
      if (!c) {
        var e = setTimeout(r);c = !0;for (var t = u.length; t;) {
          for (o = u, u = []; ++f < t;) {
            o && o[f].run();
          }f = -1, t = u.length;
        }o = null, c = !1, clearTimeout(e);
      }
    }function i(e, t) {
      this.fun = e, this.array = t;
    }function a() {}var o,
        s = e.exports = {},
        u = [],
        c = !1,
        f = -1;s.nextTick = function (e) {
      var t = new Array(arguments.length - 1);if (arguments.length > 1) for (var r = 1; r < arguments.length; r++) {
        t[r - 1] = arguments[r];
      }u.push(new i(e, t)), 1 !== u.length || c || setTimeout(n, 0);
    }, i.prototype.run = function () {
      this.fun.apply(null, this.array);
    }, s.title = "browser", s.browser = !0, s.env = {}, s.argv = [], s.version = "", s.versions = {}, s.on = a, s.addListener = a, s.once = a, s.off = a, s.removeListener = a, s.removeAllListeners = a, s.emit = a, s.binding = function (e) {
      throw new Error("process.binding is not supported");
    }, s.cwd = function () {
      return "/";
    }, s.chdir = function (e) {
      throw new Error("process.chdir is not supported");
    }, s.umask = function () {
      return 0;
    };
  }, function (e, t) {
    e.exports = function (e) {
      return e && "object" == (typeof e === "undefined" ? "undefined" : _typeof(e)) && "function" == typeof e.copy && "function" == typeof e.fill && "function" == typeof e.readUInt8;
    };
  }, function (e, t) {
    "function" == typeof Object.create ? e.exports = function (e, t) {
      e.super_ = t, e.prototype = Object.create(t.prototype, { constructor: { value: e, enumerable: !1, writable: !0, configurable: !0 } });
    } : e.exports = function (e, t) {
      e.super_ = t;var r = function r() {};r.prototype = t.prototype, e.prototype = new r(), e.prototype.constructor = e;
    };
  }, function (e, t, r) {
    "use strict";
    function n(e, t, r, n) {
      var a = n("unit", { Unit: function Unit(e) {
          return e.clone();
        }, string: function string(t) {
          return e.Unit.isValuelessUnit(t) ? new e.Unit(null, t) : e.Unit.parse(t);
        }, "number | BigNumber | Fraction | Complex, string": function numberBigNumberFractionComplexString(t, r) {
          return new e.Unit(t, r);
        }, "Array | Matrix": function ArrayMatrix(e) {
          return i(e, a);
        } });return a.toTex = { 1: "\\left(${args[0]}\\right)", 2: "\\left(\\left(${args[0]}\\right)${args[1]}\\right)" }, a;
    }var i = r(19);t.name = "unit", t.factory = n;
  }, function (e, t, r) {
    "use strict";
    function n(e, t, r, n) {
      var i = n("createUnit", { "Object, Object": function ObjectObject(t, r) {
          return e.Unit.createUnit(t, r);
        }, Object: function Object(t) {
          return e.Unit.createUnit(t, {});
        }, "string, Unit | string | Object, Object": function stringUnitStringObjectObject(t, r, n) {
          var i = {};return i[t] = r, e.Unit.createUnit(i, n);
        }, "string, Unit | string | Object": function stringUnitStringObject(t, r) {
          var n = {};return n[t] = r, e.Unit.createUnit(n, {});
        }, string: function string(t) {
          var r = {};return r[t] = {}, e.Unit.createUnit(r, {});
        } });return i;
    }r(19);t.name = "createUnit", t.factory = n;
  }, function (e, t, r) {
    "use strict";
    function n(e, t, r, n) {
      var i = n("splitUnit", { "Unit, Array": function UnitArray(e, t) {
          return e.splitUnit(t);
        } });return i;
    }r(19);t.name = "splitUnit", t.factory = n;
  }, function (e, t, r) {
    function n(e, t, r, n, a) {
      function o(t) {
        var r = e.Unit.parse(t);return r.fixPrefix = !0, r;
      }i(a, "speedOfLight", function () {
        return o("299792458 m s^-1");
      }), i(a, "gravitationConstant", function () {
        return o("6.6738480e-11 m^3 kg^-1 s^-2");
      }), i(a, "planckConstant", function () {
        return o("6.626069311e-34 J s");
      }), i(a, "reducedPlanckConstant", function () {
        return o("1.05457172647e-34 J s");
      }), i(a, "magneticConstant", function () {
        return o("1.2566370614e-6 N A^-2");
      }), i(a, "electricConstant", function () {
        return o("8.854187817e-12 F m^-1");
      }), i(a, "vacuumImpedance", function () {
        return o("376.730313461 ohm");
      }), i(a, "coulomb", function () {
        return o("8.9875517873681764e9 N m^2 C^-2");
      }), i(a, "elementaryCharge", function () {
        return o("1.60217656535e-19 C");
      }), i(a, "bohrMagneton", function () {
        return o("9.2740096820e-24 J T^-1");
      }), i(a, "conductanceQuantum", function () {
        return o("7.748091734625e-5 S");
      }), i(a, "inverseConductanceQuantum", function () {
        return o("12906.403721742 ohm");
      }), i(a, "magneticFluxQuantum", function () {
        return o("2.06783375846e-15 Wb");
      }), i(a, "nuclearMagneton", function () {
        return o("5.0507835311e-27 J T^-1");
      }), i(a, "klitzing", function () {
        return o("25812.807443484 ohm");
      }), i(a, "bohrRadius", function () {
        return o("5.291772109217e-11 m");
      }), i(a, "classicalElectronRadius", function () {
        return o("2.817940326727e-15 m");
      }), i(a, "electronMass", function () {
        return o("9.1093829140e-31 kg");
      }), i(a, "fermiCoupling", function () {
        return o("1.1663645e-5 GeV^-2");
      }), i(a, "fineStructure", function () {
        return .007297352569824;
      }), i(a, "hartreeEnergy", function () {
        return o("4.3597443419e-18 J");
      }), i(a, "protonMass", function () {
        return o("1.67262177774e-27 kg");
      }), i(a, "deuteronMass", function () {
        return o("3.3435830926e-27 kg");
      }), i(a, "neutronMass", function () {
        return o("1.6749271613e-27 kg");
      }), i(a, "quantumOfCirculation", function () {
        return o("3.636947552024e-4 m^2 s^-1");
      }), i(a, "rydberg", function () {
        return o("10973731.56853955 m^-1");
      }), i(a, "thomsonCrossSection", function () {
        return o("6.65245873413e-29 m^2");
      }), i(a, "weakMixingAngle", function () {
        return .222321;
      }), i(a, "efimovFactor", function () {
        return 22.7;
      }), i(a, "atomicMass", function () {
        return o("1.66053892173e-27 kg");
      }), i(a, "avogadro", function () {
        return o("6.0221412927e23 mol^-1");
      }), i(a, "boltzmann", function () {
        return o("1.380648813e-23 J K^-1");
      }), i(a, "faraday", function () {
        return o("96485.336521 C mol^-1");
      }), i(a, "firstRadiation", function () {
        return o("3.7417715317e-16 W m^2");
      }), i(a, "loschmidt", function () {
        return o("2.686780524e25 m^-3");
      }), i(a, "gasConstant", function () {
        return o("8.314462175 J K^-1 mol^-1");
      }), i(a, "molarPlanckConstant", function () {
        return o("3.990312717628e-10 J s mol^-1");
      }), i(a, "molarVolume", function () {
        return o("2.241396820e-10 m^3 mol^-1");
      }), i(a, "sackurTetrode", function () {
        return -1.164870823;
      }), i(a, "secondRadiation", function () {
        return o("1.438777013e-2 m K");
      }), i(a, "stefanBoltzmann", function () {
        return o("5.67037321e-8 W m^-2 K^-4");
      }), i(a, "wienDisplacement", function () {
        return o("2.897772126e-3 m K");
      }), i(a, "molarMass", function () {
        return o("1e-3 kg mol^-1");
      }), i(a, "molarMassC12", function () {
        return o("1.2e-2 kg mol^-1");
      }), i(a, "gravity", function () {
        return o("9.80665 m s^-2");
      }), i(a, "planckLength", function () {
        return o("1.61619997e-35 m");
      }), i(a, "planckMass", function () {
        return o("2.1765113e-8 kg");
      }), i(a, "planckTime", function () {
        return o("5.3910632e-44 s");
      }), i(a, "planckCharge", function () {
        return o("1.87554595641e-18 C");
      }), i(a, "planckTemperature", function () {
        return o("1.41683385e+32 K");
      });
    }var i = r(3).lazy;t.factory = n, t.lazy = !1, t.math = !0;
  }, function (e, t, r) {
    "use strict";
    function n(e, t, o, s, u) {
      u.on("config", function (r, i) {
        r.number !== i.number && n(e, t, o, s, u);
      }), u["true"] = !0, u["false"] = !1, u["null"] = null, u.uninitialized = r(40).UNINITIALIZED, "BigNumber" === t.number ? (u.Infinity = new e.BigNumber(1 / 0), u.NaN = new e.BigNumber(NaN), i.lazy(u, "pi", function () {
        return a.pi(e.BigNumber);
      }), i.lazy(u, "tau", function () {
        return a.tau(e.BigNumber);
      }), i.lazy(u, "e", function () {
        return a.e(e.BigNumber);
      }), i.lazy(u, "phi", function () {
        return a.phi(e.BigNumber);
      }), i.lazy(u, "E", function () {
        return u.e;
      }), i.lazy(u, "LN2", function () {
        return new e.BigNumber(2).ln();
      }), i.lazy(u, "LN10", function () {
        return new e.BigNumber(10).ln();
      }), i.lazy(u, "LOG2E", function () {
        return new e.BigNumber(1).div(new e.BigNumber(2).ln());
      }), i.lazy(u, "LOG10E", function () {
        return new e.BigNumber(1).div(new e.BigNumber(10).ln());
      }), i.lazy(u, "PI", function () {
        return u.pi;
      }), i.lazy(u, "SQRT1_2", function () {
        return new e.BigNumber("0.5").sqrt();
      }), i.lazy(u, "SQRT2", function () {
        return new e.BigNumber(2).sqrt();
      })) : (u.Infinity = 1 / 0, u.NaN = NaN, u.pi = Math.PI, u.tau = 2 * Math.PI, u.e = Math.E, u.phi = 1.618033988749895, u.E = u.e, u.LN2 = Math.LN2, u.LN10 = Math.LN10, u.LOG2E = Math.LOG2E, u.LOG10E = Math.LOG10E, u.PI = u.pi, u.SQRT1_2 = Math.SQRT1_2, u.SQRT2 = Math.SQRT2), u.i = e.Complex.I, u.version = r(101);
    }var i = r(3),
        a = r(76);t.factory = n, t.lazy = !1, t.math = !0;
  }, function (e, t) {
    e.exports = "3.8.0";
  }, function (e, t, r) {
    e.exports = [r(103), r(280), r(309), r(311), r(337), r(282), r(308)];
  }, function (e, t, r) {
    function n(e, t, n, i) {
      var a = {};return a.bignumber = r(104), a["boolean"] = r(105), a.complex = r(106), a.createUnit = r(107), a.fraction = r(108), a.index = r(109), a.matrix = r(110), a.number = r(111), a.sparse = r(112), a.splitUnit = r(113), a.string = r(114), a.unit = r(115), a.e = r(116), a.E = r(116), a["false"] = r(117), a.i = r(118), a.Infinity = r(119), a.LN2 = r(120), a.LN10 = r(121), a.LOG2E = r(122), a.LOG10E = r(123), a.NaN = r(124), a["null"] = r(125), a.pi = r(126), a.PI = r(126), a.phi = r(127), a.SQRT1_2 = r(128), a.SQRT2 = r(129), a.tau = r(130), a["true"] = r(131), a.version = r(132), a.speedOfLight = { description: "Speed of light in vacuum", examples: ["speedOfLight"] }, a.gravitationConstant = { description: "Newtonian constant of gravitation", examples: ["gravitationConstant"] }, a.planckConstant = { description: "Planck constant", examples: ["planckConstant"] }, a.reducedPlanckConstant = { description: "Reduced Planck constant", examples: ["reducedPlanckConstant"] }, a.magneticConstant = { description: "Magnetic constant (vacuum permeability)", examples: ["magneticConstant"] }, a.electricConstant = { description: "Electric constant (vacuum permeability)", examples: ["electricConstant"] }, a.vacuumImpedance = { description: "Characteristic impedance of vacuum", examples: ["vacuumImpedance"] }, a.coulomb = { description: "Coulomb's constant", examples: ["coulomb"] }, a.elementaryCharge = { description: "Elementary charge", examples: ["elementaryCharge"] }, a.bohrMagneton = { description: "Borh magneton", examples: ["bohrMagneton"] }, a.conductanceQuantum = { description: "Conductance quantum", examples: ["conductanceQuantum"] }, a.inverseConductanceQuantum = { description: "Inverse conductance quantum", examples: ["inverseConductanceQuantum"] }, a.magneticFluxQuantum = { description: "Magnetic flux quantum", examples: ["magneticFluxQuantum"] }, a.nuclearMagneton = { description: "Nuclear magneton", examples: ["nuclearMagneton"] }, a.klitzing = { description: "Von Klitzing constant", examples: ["klitzing"] }, a.bohrRadius = { description: "Borh radius", examples: ["bohrRadius"] }, a.classicalElectronRadius = { description: "Classical electron radius", examples: ["classicalElectronRadius"] }, a.electronMass = { description: "Electron mass", examples: ["electronMass"] }, a.fermiCoupling = { description: "Fermi coupling constant", examples: ["fermiCoupling"] }, a.fineStructure = { description: "Fine-structure constant", examples: ["fineStructure"] }, a.hartreeEnergy = { description: "Hartree energy", examples: ["hartreeEnergy"] }, a.protonMass = { description: "Proton mass", examples: ["protonMass"] }, a.deuteronMass = { description: "Deuteron Mass", examples: ["deuteronMass"] }, a.neutronMass = { description: "Neutron mass", examples: ["neutronMass"] }, a.quantumOfCirculation = { description: "Quantum of circulation", examples: ["quantumOfCirculation"] }, a.rydberg = { description: "Rydberg constant", examples: ["rydberg"] }, a.thomsonCrossSection = { description: "Thomson cross section", examples: ["thomsonCrossSection"] }, a.weakMixingAngle = { description: "Weak mixing angle", examples: ["weakMixingAngle"] }, a.efimovFactor = { description: "Efimov factor", examples: ["efimovFactor"] }, a.atomicMass = { description: "Atomic mass constant", examples: ["atomicMass"] }, a.avogadro = { description: "Avogadro's number", examples: ["avogadro"] }, a.boltzmann = { description: "Boltzmann constant", examples: ["boltzmann"] }, a.faraday = { description: "Faraday constant", examples: ["faraday"] }, a.firstRadiation = { description: "First radiation constant", examples: ["firstRadiation"] }, a.loschmidt = { description: "Loschmidt constant at T=273.15 K and p=101.325 kPa", examples: ["loschmidt"] }, a.gasConstant = { description: "Gas constant", examples: ["gasConstant"] }, a.molarPlanckConstant = { description: "Molar Planck constant", examples: ["molarPlanckConstant"] }, a.molarVolume = { description: "Molar volume of an ideal gas at T=273.15 K and p=101.325 kPa", examples: ["molarVolume"] }, a.sackurTetrode = { description: "Sackur-Tetrode constant at T=1 K and p=101.325 kPa", examples: ["sackurTetrode"] }, a.secondRadiation = { description: "Second radiation constant", examples: ["secondRadiation"] }, a.stefanBoltzmann = { description: "Stefan-Boltzmann constant", examples: ["stefanBoltzmann"] }, a.wienDisplacement = { description: "Wien displacement law constant", examples: ["wienDisplacement"] }, a.molarMass = { description: "Molar mass constant", examples: ["molarMass"] }, a.molarMassC12 = { description: "Molar mass constant of carbon-12", examples: ["molarMassC12"] }, a.gravity = { description: "Standard acceleration of gravity (standard acceleration of free-fall on Earth)", examples: ["gravity"] }, a.planckLength = { description: "Planck length", examples: ["planckLength"] }, a.planckMass = { description: "Planck mass", examples: ["planckMass"] }, a.planckTime = { description: "Planck time", examples: ["planckTime"] }, a.planckCharge = { description: "Planck charge", examples: ["planckCharge"] }, a.planckTemperature = { description: "Planck temperature", examples: ["planckTemperature"] }, a.lsolve = r(133), a.lup = r(134), a.lusolve = r(135), a.slu = r(136), a.usolve = r(137), a.abs = r(138), a.add = r(139), a.cbrt = r(140), a.ceil = r(141), a.cube = r(142), a.divide = r(143), a.dotDivide = r(144), a.dotMultiply = r(145), a.dotPow = r(146), a.exp = r(147), a.fix = r(148), a.floor = r(149), a.gcd = r(150), a.hypot = r(151), a.lcm = r(152), a.log = r(153), a.log10 = r(154), a.mod = r(155), a.multiply = r(156), a.norm = r(157), a.nthRoot = r(158), a.pow = r(159), a.round = r(160), a.sign = r(161), a.sqrt = r(162), a.square = r(163), a.subtract = r(164), a.unaryMinus = r(165), a.unaryPlus = r(166), a.xgcd = r(167), a.bitAnd = r(168), a.bitNot = r(169), a.bitOr = r(170), a.bitXor = r(171), a.leftShift = r(172), a.rightArithShift = r(173), a.rightLogShift = r(174), a.bellNumbers = r(175), a.catalan = r(176), a.composition = r(177), a.stirlingS2 = r(178), a.config = r(179), a["import"] = r(180), a.typed = r(181), a.arg = r(182), a.conj = r(183), a.re = r(184), a.im = r(185), a.eval = r(186), a.help = r(187), a.distance = r(188), a.intersect = r(189), a.and = r(190), a.not = r(191), a.or = r(192), a.xor = r(193), a.concat = r(194), a.cross = r(195), a.det = r(196), a.diag = r(197), a.dot = r(198), a.eye = r(199), a.filter = r(200), a.flatten = r(201), a.forEach = r(202), a.inv = r(203), a.map = r(204), a.ones = r(205), a.partitionSelect = r(206), a.range = r(207), a.resize = r(208), a.size = r(209), a.sort = r(210), a.squeeze = r(211), a.subset = r(212), a.trace = r(213), a.transpose = r(214), a.zeros = r(215), a.combinations = r(216), a.factorial = r(217), a.gamma = r(218), a.kldivergence = r(219), a.multinomial = r(220), a.permutations = r(221), a.pickRandom = r(222), a.random = r(223), a.randomInt = r(224), a.compare = r(225), a.deepEqual = r(226), a.equal = r(227), a.larger = r(228), a.largerEq = r(229), a.smaller = r(230), a.smallerEq = r(231), a.unequal = r(232), a.erf = r(233), a.max = r(234), a.mean = r(235), a.median = r(236), a.min = r(237), a.mode = r(238), a.prod = r(239), a.quantileSeq = r(240), a.std = r(241), a.sum = r(242), a["var"] = r(243), a.acos = r(244), a.acosh = r(245), a.acot = r(246), a.acoth = r(247), a.acsc = r(248), a.acsch = r(249), a.asec = r(250), a.asech = r(251), a.asin = r(252), a.asinh = r(253), a.atan = r(254), a.atanh = r(255), a.atan2 = r(256), a.cos = r(257), a.cosh = r(258), a.cot = r(259), a.coth = r(260), a.csc = r(261), a.csch = r(262), a.sec = r(263), a.sech = r(264), a.sin = r(265), a.sinh = r(266), a.tan = r(267), a.tanh = r(268), a.to = r(269), a.clone = r(270), a.format = r(271), a.isNaN = r(272), a.isInteger = r(273), a.isNegative = r(274), a.isNumeric = r(275), a.isPositive = r(276), a.isPrime = r(277), a.isZero = r(278), a["typeof"] = r(279), a;
    }t.name = "docs", t.path = "expression", t.factory = n;
  }, function (e, t) {
    e.exports = { name: "bignumber", category: "Construction", syntax: ["bignumber(x)"], description: "Create a big number from a number or string.", examples: ["0.1 + 0.2", "bignumber(0.1) + bignumber(0.2)", 'bignumber("7.2")', 'bignumber("7.2e500")', "bignumber([0.1, 0.2, 0.3])"], seealso: ["boolean", "complex", "fraction", "index", "matrix", "string", "unit"] };
  }, function (e, t) {
    e.exports = { name: "boolean", category: "Construction", syntax: ["x", "boolean(x)"], description: "Convert a string or number into a boolean.", examples: ["boolean(0)", "boolean(1)", "boolean(3)", 'boolean("true")', 'boolean("false")', "boolean([1, 0, 1, 1])"], seealso: ["bignumber", "complex", "index", "matrix", "number", "string", "unit"] };
  }, function (e, t) {
    e.exports = { name: "complex", category: "Construction", syntax: ["complex()", "complex(re, im)", "complex(string)"], description: "Create a complex number.", examples: ["complex()", "complex(2, 3)", 'complex("7 - 2i")'], seealso: ["bignumber", "boolean", "index", "matrix", "number", "string", "unit"] };
  }, function (e, t) {
    e.exports = { name: "createUnit", category: "Construction", syntax: ["createUnit(definitions)", "createUnit(name, definition)"], description: "Create a user-defined unit and register it with the Unit type.", examples: ['createUnit("foo")', 'createUnit("knot", {definition: "0.514444444 m/s", aliases: ["knots", "kt", "kts"]})', 'createUnit("mph", "1 mile/hour")'], seealso: ["unit", "splitUnit"] };
  }, function (e, t) {
    e.exports = { name: "fraction", category: "Construction", syntax: ["fraction(num)", "fraction(num,den)"], description: "Create a fraction from a number or from a numerator and denominator.", examples: ["fraction(0.125)", "fraction(1, 3) + fraction(2, 5)"], seealso: ["bignumber", "boolean", "complex", "index", "matrix", "string", "unit"] };
  }, function (e, t) {
    e.exports = { name: "index", category: "Construction", syntax: ["[start]", "[start:end]", "[start:step:end]", "[start1, start 2, ...]", "[start1:end1, start2:end2, ...]", "[start1:step1:end1, start2:step2:end2, ...]"], description: "Create an index to get or replace a subset of a matrix", examples: ["[]", "[1, 2, 3]", "A = [1, 2, 3; 4, 5, 6]", "A[1, :]", "A[1, 2] = 50", "A[0:2, 0:2] = ones(2, 2)"], seealso: ["bignumber", "boolean", "complex", "matrix,", "number", "range", "string", "unit"] };
  }, function (e, t) {
    e.exports = { name: "matrix", category: "Construction", syntax: ["[]", "[a1, b1, ...; a2, b2, ...]", "matrix()", 'matrix("dense")', "matrix([...])"], description: "Create a matrix.", examples: ["[]", "[1, 2, 3]", "[1, 2, 3; 4, 5, 6]", "matrix()", "matrix([3, 4])", 'matrix([3, 4; 5, 6], "sparse")', 'matrix([3, 4; 5, 6], "sparse", "number")'], seealso: ["bignumber", "boolean", "complex", "index", "number", "string", "unit", "sparse"] };
  }, function (e, t) {
    e.exports = { name: "number", category: "Construction", syntax: ["x", "number(x)"], description: "Create a number or convert a string or boolean into a number.", examples: ["2", "2e3", "4.05", "number(2)", 'number("7.2")', "number(true)", "number([true, false, true, true])", 'number("52cm", "m")'], seealso: ["bignumber", "boolean", "complex", "fraction", "index", "matrix", "string", "unit"] };
  }, function (e, t) {
    e.exports = { name: "sparse", category: "Construction", syntax: ["sparse()", "sparse([a1, b1, ...; a1, b2, ...])", 'sparse([a1, b1, ...; a1, b2, ...], "number")'], description: "Create a sparse matrix.", examples: ["sparse()", "sparse([3, 4; 5, 6])", 'sparse([3, 0; 5, 0], "number")'], seealso: ["bignumber", "boolean", "complex", "index", "number", "string", "unit", "matrix"] };
  }, function (e, t) {
    e.exports = { name: "splitUnit", category: "Construction", syntax: ["splitUnit(unit: Unit, parts: Unit[])"], description: "Split a unit in an array of units whose sum is equal to the original unit.", examples: ['splitUnit(1 m, ["feet", "inch"])'], seealso: ["unit", "createUnit"] };
  }, function (e, t) {
    e.exports = { name: "string", category: "Construction", syntax: ['"text"', "string(x)"], description: "Create a string or convert a value to a string", examples: ['"Hello World!"', "string(4.2)", "string(3 + 2i)"], seealso: ["bignumber", "boolean", "complex", "index", "matrix", "number", "unit"] };
  }, function (e, t) {
    e.exports = { name: "unit", category: "Construction", syntax: ["value unit", "unit(value, unit)", "unit(string)"], description: "Create a unit.", examples: ["5.5 mm", "3 inch", 'unit(7.1, "kilogram")', 'unit("23 deg")'], seealso: ["bignumber", "boolean", "complex", "index", "matrix", "number", "string"] };
  }, function (e, t) {
    e.exports = { name: "e", category: "Constants", syntax: ["e"], description: "Euler's number, the base of the natural logarithm. Approximately equal to 2.71828", examples: ["e", "e ^ 2", "exp(2)", "log(e)"], seealso: ["exp"] };
  }, function (e, t) {
    e.exports = { name: "false", category: "Constants", syntax: ["false"], description: "Boolean value false", examples: ["false"], seealso: ["true"] };
  }, function (e, t) {
    e.exports = { name: "i", category: "Constants", syntax: ["i"], description: "Imaginary unit, defined as i*i=-1. A complex number is described as a + b*i, where a is the real part, and b is the imaginary part.", examples: ["i", "i * i", "sqrt(-1)"], seealso: [] };
  }, function (e, t) {
    e.exports = { name: "Infinity", category: "Constants", syntax: ["Infinity"], description: "Infinity, a number which is larger than the maximum number that can be handled by a floating point number.", examples: ["Infinity", "1 / 0"], seealso: [] };
  }, function (e, t) {
    e.exports = { name: "LN2", category: "Constants", syntax: ["LN2"], description: "Returns the natural logarithm of 2, approximately equal to 0.693", examples: ["LN2", "log(2)"], seealso: [] };
  }, function (e, t) {
    e.exports = { name: "LN10", category: "Constants", syntax: ["LN10"], description: "Returns the natural logarithm of 10, approximately equal to 2.302", examples: ["LN10", "log(10)"], seealso: [] };
  }, function (e, t) {
    e.exports = { name: "LOG2E", category: "Constants", syntax: ["LOG2E"], description: "Returns the base-2 logarithm of E, approximately equal to 1.442", examples: ["LOG2E", "log(e, 2)"], seealso: [] };
  }, function (e, t) {
    e.exports = { name: "LOG10E", category: "Constants", syntax: ["LOG10E"], description: "Returns the base-10 logarithm of E, approximately equal to 0.434", examples: ["LOG10E", "log(e, 10)"], seealso: [] };
  }, function (e, t) {
    e.exports = { name: "NaN", category: "Constants", syntax: ["NaN"], description: "Not a number", examples: ["NaN", "0 / 0"], seealso: [] };
  }, function (e, t) {
    e.exports = { name: "null", category: "Constants", syntax: ["null"], description: "Value null", examples: ["null"], seealso: ["true", "false"] };
  }, function (e, t) {
    e.exports = { name: "pi", category: "Constants", syntax: ["pi"], description: "The number pi is a mathematical constant that is the ratio of a circle's circumference to its diameter, and is approximately equal to 3.14159", examples: ["pi", "sin(pi/2)"], seealso: ["tau"] };
  }, function (e, t) {
    e.exports = { name: "phi", category: "Constants", syntax: ["phi"], description: "Phi is the golden ratio. Two quantities are in the golden ratio if their ratio is the same as the ratio of their sum to the larger of the two quantities. Phi is defined as `(1 + sqrt(5)) / 2` and is approximately 1.618034...", examples: ["tau"], seealso: [] };
  }, function (e, t) {
    e.exports = { name: "SQRT1_2", category: "Constants", syntax: ["SQRT1_2"], description: "Returns the square root of 1/2, approximately equal to 0.707", examples: ["SQRT1_2", "sqrt(1/2)"], seealso: [] };
  }, function (e, t) {
    e.exports = { name: "SQRT2", category: "Constants", syntax: ["SQRT2"], description: "Returns the square root of 2, approximately equal to 1.414", examples: ["SQRT2", "sqrt(2)"], seealso: [] };
  }, function (e, t) {
    e.exports = { name: "tau", category: "Constants", syntax: ["tau"], description: "Tau is the ratio constant of a circle's circumference to radius, equal to 2 * pi, approximately 6.2832.", examples: ["tau", "2 * pi"], seealso: ["pi"] };
  }, function (e, t) {
    e.exports = { name: "true", category: "Constants", syntax: ["true"], description: "Boolean value true", examples: ["true"], seealso: ["false"] };
  }, function (e, t) {
    e.exports = { name: "version", category: "Constants", syntax: ["version"], description: "A string with the version number of math.js", examples: ["version"], seealso: [] };
  }, function (e, t) {
    e.exports = { name: "lsolve", category: "Algebra", syntax: ["x=lsolve(L, b)"], description: "Solves the linear system L * x = b where L is an [n x n] lower triangular matrix and b is a [n] column vector.", examples: ["a = [-2, 3; 2, 1]", "b = [11, 9]", "x = lsolve(a, b)"], seealso: ["lup", "lusolve", "usolve", "matrix", "sparse"] };
  }, function (e, t) {
    e.exports = { name: "lup", category: "Algebra", syntax: ["lup(m)"], description: "Calculate the Matrix LU decomposition with partial pivoting. Matrix A is decomposed in three matrices (L, U, P) where P * A = L * U", examples: ["lup([[2, 1], [1, 4]])", "lup(matrix([[2, 1], [1, 4]]))", "lup(sparse([[2, 1], [1, 4]]))"], seealso: ["lusolve", "lsolve", "usolve", "matrix", "sparse", "slu"] };
  }, function (e, t) {
    e.exports = { name: "lusolve", category: "Algebra", syntax: ["x=lusolve(A, b)", "x=lusolve(lu, b)"], description: "Solves the linear system A * x = b where A is an [n x n] matrix and b is a [n] column vector.", examples: ["a = [-2, 3; 2, 1]", "b = [11, 9]", "x = lusolve(a, b)"], seealso: ["lup", "slu", "lsolve", "usolve", "matrix", "sparse"] };
  }, function (e, t) {
    e.exports = { name: "slu", category: "Algebra", syntax: ["slu(A, order, threshold)"], description: "Calculate the Matrix LU decomposition with full pivoting. Matrix A is decomposed in two matrices (L, U) and two permutation vectors (pinv, q) where P * A * Q = L * U", examples: ["slu(sparse([4.5, 0, 3.2, 0; 3.1, 2.9, 0, 0.9; 0, 1.7, 3, 0; 3.5, 0.4, 0, 1]), 1, 0.001)"], seealso: ["lusolve", "lsolve", "usolve", "matrix", "sparse", "lup"] };
  }, function (e, t) {
    e.exports = { name: "usolve", category: "Algebra", syntax: ["x=usolve(U, b)"], description: "Solves the linear system U * x = b where U is an [n x n] upper triangular matrix and b is a [n] column vector.", examples: ["x=usolve(sparse([1, 1, 1, 1; 0, 1, 1, 1; 0, 0, 1, 1; 0, 0, 0, 1]), [1; 2; 3; 4])"], seealso: ["lup", "lusolve", "lsolve", "matrix", "sparse"] };
  }, function (e, t) {
    e.exports = { name: "abs", category: "Arithmetic", syntax: ["abs(x)"], description: "Compute the absolute value.", examples: ["abs(3.5)", "abs(-4.2)"], seealso: ["sign"] };
  }, function (e, t) {
    e.exports = { name: "add", category: "Operators", syntax: ["x + y", "add(x, y)"], description: "Add two values.", examples: ["a = 2.1 + 3.6", "a - 3.6", "3 + 2i", "3 cm + 2 inch", '"2.3" + "4"'], seealso: ["subtract"] };
  }, function (e, t) {
    e.exports = { name: "cbrt", category: "Arithmetic", syntax: ["cbrt(x)", "cbrt(x, allRoots)"], description: "Compute the cubic root value. If x = y * y * y, then y is the cubic root of x. When `x` is a number or complex number, an optional second argument `allRoots` can be provided to return all three cubic roots. If not provided, the principal root is returned", examples: ["cbrt(64)", "cube(4)", "cbrt(-8)", "cbrt(2 + 3i)", "cbrt(8i)", "cbrt(8i, true)", "cbrt(27 m^3)"], seealso: ["square", "sqrt", "cube", "multiply"] };
  }, function (e, t) {
    e.exports = { name: "ceil", category: "Arithmetic", syntax: ["ceil(x)"], description: "Round a value towards plus infinity. If x is complex, both real and imaginary part are rounded towards plus infinity.", examples: ["ceil(3.2)", "ceil(3.8)", "ceil(-4.2)"], seealso: ["floor", "fix", "round"] };
  }, function (e, t) {
    e.exports = { name: "cube", category: "Arithmetic", syntax: ["cube(x)"], description: "Compute the cube of a value. The cube of x is x * x * x.", examples: ["cube(2)", "2^3", "2 * 2 * 2"], seealso: ["multiply", "square", "pow"] };
  }, function (e, t) {
    e.exports = { name: "divide", category: "Operators", syntax: ["x / y", "divide(x, y)"], description: "Divide two values.", examples: ["a = 2 / 3", "a * 3", "4.5 / 2", "3 + 4 / 2", "(3 + 4) / 2", "18 km / 4.5"], seealso: ["multiply"] };
  }, function (e, t) {
    e.exports = { name: "dotDivide", category: "Operators", syntax: ["x ./ y", "dotDivide(x, y)"], description: "Divide two values element wise.", examples: ["a = [1, 2, 3; 4, 5, 6]", "b = [2, 1, 1; 3, 2, 5]", "a ./ b"], seealso: ["multiply", "dotMultiply", "divide"] };
  }, function (e, t) {
    e.exports = { name: "dotMultiply", category: "Operators", syntax: ["x .* y", "dotMultiply(x, y)"], description: "Multiply two values element wise.", examples: ["a = [1, 2, 3; 4, 5, 6]", "b = [2, 1, 1; 3, 2, 5]", "a .* b"], seealso: ["multiply", "divide", "dotDivide"] };
  }, function (e, t) {
    e.exports = { name: "dotpow", category: "Operators", syntax: ["x .^ y", "dotpow(x, y)"], description: "Calculates the power of x to y element wise.", examples: ["a = [1, 2, 3; 4, 5, 6]", "a .^ 2"], seealso: ["pow"] };
  }, function (e, t) {
    e.exports = { name: "exp", category: "Arithmetic", syntax: ["exp(x)"], description: "Calculate the exponent of a value.", examples: ["exp(1.3)", "e ^ 1.3", "log(exp(1.3))", "x = 2.4", "(exp(i*x) == cos(x) + i*sin(x))   # Euler's formula"], seealso: ["pow", "log"] };
  }, function (e, t) {
    e.exports = { name: "fix", category: "Arithmetic", syntax: ["fix(x)"], description: "Round a value towards zero. If x is complex, both real and imaginary part are rounded towards zero.", examples: ["fix(3.2)", "fix(3.8)", "fix(-4.2)", "fix(-4.8)"], seealso: ["ceil", "floor", "round"] };
  }, function (e, t) {
    e.exports = { name: "floor", category: "Arithmetic", syntax: ["floor(x)"], description: "Round a value towards minus infinity.If x is complex, both real and imaginary part are rounded towards minus infinity.", examples: ["floor(3.2)", "floor(3.8)", "floor(-4.2)"], seealso: ["ceil", "fix", "round"] };
  }, function (e, t) {
    e.exports = { name: "gcd", category: "Arithmetic", syntax: ["gcd(a, b)", "gcd(a, b, c, ...)"], description: "Compute the greatest common divisor.", examples: ["gcd(8, 12)", "gcd(-4, 6)", "gcd(25, 15, -10)"], seealso: ["lcm", "xgcd"] };
  }, function (e, t) {
    e.exports = { name: "hypot", category: "Arithmetic", syntax: ["hypot(a, b, c, ...)", "hypot([a, b, c, ...])"], description: "Calculate the hypotenusa of a list with values. ", examples: ["hypot(3, 4)", "sqrt(3^2 + 4^2)", "hypot(-2)", "hypot([3, 4, 5])"], seealso: ["abs", "norm"] };
  }, function (e, t) {
    e.exports = { name: "lcm", category: "Arithmetic", syntax: ["lcm(x, y)"], description: "Compute the least common multiple.", examples: ["lcm(4, 6)", "lcm(6, 21)", "lcm(6, 21, 5)"], seealso: ["gcd"] };
  }, function (e, t) {
    e.exports = { name: "log", category: "Arithmetic", syntax: ["log(x)", "log(x, base)"], description: "Compute the logarithm of a value. If no base is provided, the natural logarithm of x is calculated. If base if provided, the logarithm is calculated for the specified base. log(x, base) is defined as log(x) / log(base).", examples: ["log(3.5)", "a = log(2.4)", "exp(a)", "10 ^ 4", "log(10000, 10)", "log(10000) / log(10)", "b = log(1024, 2)", "2 ^ b"], seealso: ["exp", "log10"] };
  }, function (e, t) {
    e.exports = { name: "log10", category: "Arithmetic", syntax: ["log10(x)"], description: "Compute the 10-base logarithm of a value.", examples: ["log10(0.00001)", "log10(10000)", "10 ^ 4", "log(10000) / log(10)", "log(10000, 10)"], seealso: ["exp", "log"] };
  }, function (e, t) {
    e.exports = { name: "mod", category: "Operators", syntax: ["x % y", "x mod y", "mod(x, y)"], description: "Calculates the modulus, the remainder of an integer division.", examples: ["7 % 3", "11 % 2", "10 mod 4", "function isOdd(x) = x % 2", "isOdd(2)", "isOdd(3)"], seealso: ["divide"] };
  }, function (e, t) {
    e.exports = { name: "multiply", category: "Operators", syntax: ["x * y", "multiply(x, y)"], description: "multiply two values.", examples: ["a = 2.1 * 3.4", "a / 3.4", "2 * 3 + 4", "2 * (3 + 4)", "3 * 2.1 km"], seealso: ["divide"] };
  }, function (e, t) {
    e.exports = { name: "norm", category: "Arithmetic", syntax: ["norm(x)", "norm(x, p)"], description: "Calculate the norm of a number, vector or matrix.", examples: ["abs(-3.5)", "norm(-3.5)", "norm(3 - 4i))", "norm([1, 2, -3], Infinity)", "norm([1, 2, -3], -Infinity)", "norm([3, 4], 2)", "norm([[1, 2], [3, 4]], 1)", "norm([[1, 2], [3, 4]], 'inf')", "norm([[1, 2], [3, 4]], 'fro')"] };
  }, function (e, t) {
    e.exports = { name: "nthRoot", category: "Arithmetic", syntax: ["nthRoot(a)", "nthRoot(a, root)"], description: 'Calculate the nth root of a value. The principal nth root of a positive real number A, is the positive real solution of the equation "x^root = A".', examples: ["4 ^ 3", "nthRoot(64, 3)", "nthRoot(9, 2)", "sqrt(9)"], seealso: ["sqrt", "pow"] };
  }, function (e, t) {
    e.exports = { name: "pow", category: "Operators", syntax: ["x ^ y", "pow(x, y)"], description: "Calculates the power of x to y, x^y.", examples: ["2^3 = 8", "2*2*2", "1 + e ^ (pi * i)"], seealso: ["multiply"] };
  }, function (e, t) {
    e.exports = { name: "round", category: "Arithmetic", syntax: ["round(x)", "round(x, n)"], description: "round a value towards the nearest integer.If x is complex, both real and imaginary part are rounded towards the nearest integer. When n is specified, the value is rounded to n decimals.", examples: ["round(3.2)", "round(3.8)", "round(-4.2)", "round(-4.8)", "round(pi, 3)", "round(123.45678, 2)"], seealso: ["ceil", "floor", "fix"] };
  }, function (e, t) {
    e.exports = { name: "sign", category: "Arithmetic", syntax: ["sign(x)"], description: "Compute the sign of a value. The sign of a value x is 1 when x>1, -1 when x<0, and 0 when x=0.", examples: ["sign(3.5)", "sign(-4.2)", "sign(0)"], seealso: ["abs"] };
  }, function (e, t) {
    e.exports = { name: "sqrt", category: "Arithmetic", syntax: ["sqrt(x)"], description: "Compute the square root value. If x = y * y, then y is the square root of x.", examples: ["sqrt(25)", "5 * 5", "sqrt(-1)"], seealso: ["square", "multiply"] };
  }, function (e, t) {
    e.exports = { name: "square", category: "Arithmetic", syntax: ["square(x)"], description: "Compute the square of a value. The square of x is x * x.", examples: ["square(3)", "sqrt(9)", "3^2", "3 * 3"], seealso: ["multiply", "pow", "sqrt", "cube"] };
  }, function (e, t) {
    e.exports = { name: "subtract", category: "Operators", syntax: ["x - y", "subtract(x, y)"], description: "subtract two values.", examples: ["a = 5.3 - 2", "a + 2", "2/3 - 1/6", "2 * 3 - 3", "2.1 km - 500m"], seealso: ["add"] };
  }, function (e, t) {
    e.exports = { name: "unaryMinus", category: "Operators", syntax: ["-x", "unaryMinus(x)"], description: "Inverse the sign of a value. Converts booleans and strings to numbers.", examples: ["-4.5", "-(-5.6)", '-"22"'], seealso: ["add", "subtract", "unaryPlus"] };
  }, function (e, t) {
    e.exports = { name: "unaryPlus", category: "Operators", syntax: ["+x", "unaryPlus(x)"], description: "Converts booleans and strings to numbers.", examples: ["+true", '+"2"'], seealso: ["add", "subtract", "unaryMinus"] };
  }, function (e, t) {
    e.exports = { name: "xgcd", category: "Arithmetic", syntax: ["xgcd(a, b)"], description: "Calculate the extended greatest common divisor for two values", examples: ["xgcd(8, 12)", "gcd(8, 12)", "xgcd(36163, 21199)"], seealso: ["gcd", "lcm"] };
  }, function (e, t) {
    e.exports = { name: "bitAnd", category: "Bitwise", syntax: ["x & y", "bitAnd(x, y)"], description: "Bitwise AND operation. Performs the logical AND operation on each pair of the corresponding bits of the two given values by multiplying them. If both bits in the compared position are 1, the bit in the resulting binary representation is 1, otherwise, the result is 0", examples: ["5 & 3", "bitAnd(53, 131)", "[1, 12, 31] & 42"], seealso: ["bitNot", "bitOr", "bitXor", "leftShift", "rightArithShift", "rightLogShift"] };
  }, function (e, t) {
    e.exports = { name: "bitNot", category: "Bitwise", syntax: ["~x", "bitNot(x)"], description: "Bitwise NOT operation. Performs a logical negation on each bit of the given value. Bits that are 0 become 1, and those that are 1 become 0.", examples: ["~1", "~2", "bitNot([2, -3, 4])"], seealso: ["bitAnd", "bitOr", "bitXor", "leftShift", "rightArithShift", "rightLogShift"] };
  }, function (e, t) {
    e.exports = { name: "bitOr", category: "Bitwise", syntax: ["x | y", "bitOr(x, y)"], description: "Bitwise OR operation. Performs the logical inclusive OR operation on each pair of corresponding bits of the two given values. The result in each position is 1 if the first bit is 1 or the second bit is 1 or both bits are 1, otherwise, the result is 0.", examples: ["5 | 3", "bitOr([1, 2, 3], 4)"], seealso: ["bitAnd", "bitNot", "bitXor", "leftShift", "rightArithShift", "rightLogShift"] };
  }, function (e, t) {
    e.exports = { name: "bitXor", category: "Bitwise", syntax: ["bitXor(x, y)"], description: "Bitwise XOR operation, exclusive OR. Performs the logical exclusive OR operation on each pair of corresponding bits of the two given values. The result in each position is 1 if only the first bit is 1 or only the second bit is 1, but will be 0 if both are 0 or both are 1.", examples: ["bitOr(1, 2)", "bitXor([2, 3, 4], 4)"], seealso: ["bitAnd", "bitNot", "bitOr", "leftShift", "rightArithShift", "rightLogShift"] };
  }, function (e, t) {
    e.exports = { name: "leftShift", category: "Bitwise", syntax: ["x << y", "leftShift(x, y)"], description: "Bitwise left logical shift of a value x by y number of bits.", examples: ["4 << 1", "8 >> 1"], seealso: ["bitAnd", "bitNot", "bitOr", "bitXor", "rightArithShift", "rightLogShift"] };
  }, function (e, t) {
    e.exports = { name: "rightArithShift", category: "Bitwise", syntax: ["x >> y", "leftShift(x, y)"], description: "Bitwise right arithmetic shift of a value x by y number of bits.", examples: ["8 >> 1", "4 << 1", "-12 >> 2"], seealso: ["bitAnd", "bitNot", "bitOr", "bitXor", "leftShift", "rightLogShift"] };
  }, function (e, t) {
    e.exports = { name: "rightLogShift", category: "Bitwise", syntax: ["x >> y", "leftShift(x, y)"], description: "Bitwise right logical shift of a value x by y number of bits.", examples: ["8 >>> 1", "4 << 1", "-12 >>> 2"], seealso: ["bitAnd", "bitNot", "bitOr", "bitXor", "leftShift", "rightArithShift"] };
  }, function (e, t) {
    e.exports = { name: "bellNumbers", category: "Combinatorics", syntax: ["bellNumbers(n)"], description: "The Bell Numbers count the number of partitions of a set. A partition is a pairwise disjoint subset of S whose union is S. `bellNumbers` only takes integer arguments. The following condition must be enforced: n >= 0.", examples: ["bellNumbers(3)", "bellNumbers(8)"], seealso: ["stirlingS2"] };
  }, function (e, t) {
    e.exports = { name: "catalan", category: "Combinatorics", syntax: ["catalan(n)"], description: "The Catalan Numbers enumerate combinatorial structures of many different types. catalan only takes integer arguments. The following condition must be enforced: n >= 0.", examples: ["catalan(3)", "catalan(8)"], seealso: ["bellNumbers"] };
  }, function (e, t) {
    e.exports = { name: "composition", category: "Combinatorics", syntax: ["composition(n, k)"], description: "The composition counts of n into k parts. composition only takes integer arguments. The following condition must be enforced: k <= n.", examples: ["composition(5, 3)"], seealso: ["combinations"] };
  }, function (e, t) {
    e.exports = { name: "stirlingS2", category: "Combinatorics", syntax: ["stirlingS2(n, k)"], description: "he Stirling numbers of the second kind, counts the number of ways to partition a set of n labelled objects into k nonempty unlabelled subsets. `stirlingS2` only takes integer arguments. The following condition must be enforced: k <= n. If n = k or k = 1, then s(n,k) = 1.", examples: ["stirlingS2(5, 3)"], seealso: ["bellNumbers"] };
  }, function (e, t) {
    e.exports = { name: "config", category: "Core", syntax: ["config()", "config(options)"], description: "Get configuration or change configuration.", examples: ["config()", "1/3 + 1/4", 'config({number: "Fraction"})', "1/3 + 1/4"], seealso: [] };
  }, function (e, t) {
    e.exports = { name: "import", category: "Core", syntax: ["import(functions)", "import(functions, options)"], description: "Import functions or constants from an object.", examples: ["import({myFn: f(x)=x^2, myConstant: 32 })", "myFn(2)", "myConstant"], seealso: [] };
  }, function (e, t) {
    e.exports = { name: "typed", category: "Core", syntax: ["typed(signatures)", "typed(name, signatures)"], description: "Create a typed function.", examples: ['double = typed({ "number, number": f(x)=x+x })', "double(2)", 'double("hello")'], seealso: [] };
  }, function (e, t) {
    e.exports = { name: "arg", category: "Complex", syntax: ["arg(x)"], description: "Compute the argument of a complex value. If x = a+bi, the argument is computed as atan2(b, a).", examples: ["arg(2 + 2i)", "atan2(3, 2)", "arg(2 + 3i)"], seealso: ["re", "im", "conj", "abs"] };
  }, function (e, t) {
    e.exports = { name: "conj", category: "Complex", syntax: ["conj(x)"], description: "Compute the complex conjugate of a complex value. If x = a+bi, the complex conjugate is a-bi.", examples: ["conj(2 + 3i)", "conj(2 - 3i)", "conj(-5.2i)"], seealso: ["re", "im", "abs", "arg"] };
  }, function (e, t) {
    e.exports = { name: "re", category: "Complex", syntax: ["re(x)"], description: "Get the real part of a complex number.", examples: ["re(2 + 3i)", "im(2 + 3i)", "re(-5.2i)", "re(2.4)"], seealso: ["im", "conj", "abs", "arg"] };
  }, function (e, t) {
    e.exports = { name: "im", category: "Complex", syntax: ["im(x)"], description: "Get the imaginary part of a complex number.", examples: ["im(2 + 3i)", "re(2 + 3i)", "im(-5.2i)", "im(2.4)"], seealso: ["re", "conj", "abs", "arg"] };
  }, function (e, t) {
    e.exports = { name: "eval", category: "Expression", syntax: ["eval(expression)", "eval([expr1, expr2, expr3, ...])"], description: "Evaluate an expression or an array with expressions.", examples: ['eval("2 + 3")', 'eval("sqrt(" + 4 + ")")'], seealso: [] };
  }, function (e, t) {
    e.exports = { name: "help", category: "Expression", syntax: ["help(object)", "help(string)"], description: "Display documentation on a function or data type.", examples: ["help(sqrt)", 'help("complex")'], seealso: [] };
  }, function (e, t) {
    e.exports = { name: "distance", category: "Geometry", syntax: ["distance([x1, y1], [x2, y2])", "distance([[x1, y1], [x2, y2])"], description: "Calculates the Euclidean distance between two points.", examples: ["distance([0,0], [4,4])", "distance([[0,0], [4,4]])"], seealso: [] };
  }, function (e, t) {
    e.exports = { name: "intersect", category: "Geometry", syntax: ["intersect(expr1, expr2, expr3, expr4)", "intersect(expr1, expr2, expr3)"], description: "Computes the intersection point of lines and/or planes.", examples: ["intersect([0, 0], [10, 10], [10, 0], [0, 10])", "intersect([1, 0, 1],  [4, -2, 2], [1, 1, 1, 6])"], seealso: [] };
  }, function (e, t) {
    e.exports = { name: "and", category: "Logical", syntax: ["x and y", "and(x, y)"], description: "Logical and. Test whether two values are both defined with a nonzero/nonempty value.", examples: ["true and false", "true and true", "2 and 4"], seealso: ["not", "or", "xor"] };
  }, function (e, t) {
    e.exports = { name: "not", category: "Logical", syntax: ["not x", "not(x)"], description: "Logical not. Flips the boolean value of given argument.", examples: ["not true", "not false", "not 2", "not 0"], seealso: ["and", "or", "xor"] };
  }, function (e, t) {
    e.exports = { name: "or", category: "Logical", syntax: ["x or y", "or(x, y)"], description: "Logical or. Test if at least one value is defined with a nonzero/nonempty value.", examples: ["true or false", "false or false", "0 or 4"], seealso: ["not", "and", "xor"] };
  }, function (e, t) {
    e.exports = { name: "xor", category: "Logical", syntax: ["x or y", "or(x, y)"], description: "Logical exclusive or, xor. Test whether one and only one value is defined with a nonzero/nonempty value.", examples: ["true xor false", "false xor false", "true xor true", "0 or 4"], seealso: ["not", "and", "or"] };
  }, function (e, t) {
    e.exports = { name: "concat", category: "Matrix", syntax: ["concat(A, B, C, ...)", "concat(A, B, C, ..., dim)"], description: "Concatenate matrices. By default, the matrices are concatenated by the last dimension. The dimension on which to concatenate can be provided as last argument.", examples: ["A = [1, 2; 5, 6]", "B = [3, 4; 7, 8]", "concat(A, B)", "concat(A, B, 1)", "concat(A, B, 2)"], seealso: ["det", "diag", "eye", "inv", "ones", "range", "size", "squeeze", "subset", "trace", "transpose", "zeros"] };
  }, function (e, t) {
    e.exports = { name: "cross", category: "Matrix", syntax: ["cross(A, B)"], description: "Calculate the cross product for two vectors in three dimensional space.", examples: ["cross([1, 1, 0],  [0, 1, 1])", "cross([3, -3, 1], [4, 9, 2])", "cross([2, 3, 4],  [5, 6, 7])"], seealso: ["multiply", "dot"] };
  }, function (e, t) {
    e.exports = { name: "det", category: "Matrix", syntax: ["det(x)"], description: "Calculate the determinant of a matrix", examples: ["det([1, 2; 3, 4])", "det([-2, 2, 3; -1, 1, 3; 2, 0, -1])"], seealso: ["concat", "diag", "eye", "inv", "ones", "range", "size", "squeeze", "subset", "trace", "transpose", "zeros"] };
  }, function (e, t) {
    e.exports = { name: "diag", category: "Matrix", syntax: ["diag(x)", "diag(x, k)"], description: "Create a diagonal matrix or retrieve the diagonal of a matrix. When x is a vector, a matrix with the vector values on the diagonal will be returned. When x is a matrix, a vector with the diagonal values of the matrix is returned. When k is provided, the k-th diagonal will be filled in or retrieved, if k is positive, the values are placed on the super diagonal. When k is negative, the values are placed on the sub diagonal.", examples: ["diag(1:3)", "diag(1:3, 1)", "a = [1, 2, 3; 4, 5, 6; 7, 8, 9]", "diag(a)"], seealso: ["concat", "det", "eye", "inv", "ones", "range", "size", "squeeze", "subset", "trace", "transpose", "zeros"] };
  }, function (e, t) {
    e.exports = { name: "dot", category: "Matrix", syntax: ["dot(A, B)"], description: "Calculate the dot product of two vectors. The dot product of A = [a1, a2, a3, ..., an] and B = [b1, b2, b3, ..., bn] is defined as dot(A, B) = a1 * b1 + a2 * b2 + a3 * b3 + ... + an * bn", examples: ["dot([2, 4, 1], [2, 2, 3])", "[2, 4, 1] * [2, 2, 3]"], seealso: ["multiply", "cross"] };
  }, function (e, t) {
    e.exports = { name: "eye", category: "Matrix", syntax: ["eye(n)", "eye(m, n)", "eye([m, n])", "eye"], description: "Returns the identity matrix with size m-by-n. The matrix has ones on the diagonal and zeros elsewhere.", examples: ["eye(3)", "eye(3, 5)", "a = [1, 2, 3; 4, 5, 6]", "eye(size(a))"], seealso: ["concat", "det", "diag", "inv", "ones", "range", "size", "squeeze", "subset", "trace", "transpose", "zeros"] };
  }, function (e, t) {
    e.exports = { name: "filter", category: "Matrix", syntax: ["filter(x, test)"], description: "Filter items in a matrix.", examples: ["isPositive(x) = x > 0", "filter([6, -2, -1, 4, 3], isPositive)", "filter([6, -2, 0, 1, 0], x != 0)"], seealso: ["sort", "map", "forEach"] };
  }, function (e, t) {
    e.exports = { name: "flatten", category: "Matrix", syntax: ["flatten(x)"], description: "Flatten a multi dimensional matrix into a single dimensional matrix.", examples: ["a = [1, 2, 3; 4, 5, 6]", "size(a)", "b = flatten(a)", "size(b)"], seealso: ["concat", "resize", "size", "squeeze"] };
  }, function (e, t) {
    e.exports = { name: "forEach", category: "Matrix", syntax: ["forEach(x, callback)"], description: "Iterates over all elements of a matrix/array, and executes the given callback function.", examples: ["forEach([1, 2, 3], function(val) { console.log(val) })"], seealso: ["map", "sort", "filter"] };
  }, function (e, t) {
    e.exports = { name: "inv", category: "Matrix", syntax: ["inv(x)"], description: "Calculate the inverse of a matrix", examples: ["inv([1, 2; 3, 4])", "inv(4)", "1 / 4"], seealso: ["concat", "det", "diag", "eye", "ones", "range", "size", "squeeze", "subset", "trace", "transpose", "zeros"] };
  }, function (e, t) {
    e.exports = { name: "map", category: "Matrix", syntax: ["map(x, callback)"], description: "Create a new matrix or array with the results of the callback function executed on each entry of the matrix/array.", examples: ["map([1, 2, 3], function(val) { return value * value })"], seealso: ["filter", "forEach"] };
  }, function (e, t) {
    e.exports = { name: "ones", category: "Matrix", syntax: ["ones(m)", "ones(m, n)", "ones(m, n, p, ...)", "ones([m])", "ones([m, n])", "ones([m, n, p, ...])", "ones"], description: "Create a matrix containing ones.", examples: ["ones(3)", "ones(3, 5)", "ones([2,3]) * 4.5", "a = [1, 2, 3; 4, 5, 6]", "ones(size(a))"], seealso: ["concat", "det", "diag", "eye", "inv", "range", "size", "squeeze", "subset", "trace", "transpose", "zeros"] };
  }, function (e, t) {
    e.exports = { name: "partitionSelect", category: "Matrix", syntax: ["partitionSelect(x, k)", "partitionSelect(x, k, compare)"], description: "Partition-based selection of an array or 1D matrix. Will find the kth smallest value, and mutates the input array. Uses Quickselect.", examples: ["partitionSelect([5, 10, 1], 2)", 'partitionSelect(["C", "B", "A", "D"], 1)'], seealso: ["sort"] };
  }, function (e, t) {
    e.exports = { name: "range", category: "Type", syntax: ["start:end", "start:step:end", "range(start, end)", "range(start, end, step)", "range(string)"], description: "Create a range. Lower bound of the range is included, upper bound is excluded.", examples: ["1:5", "3:-1:-3", "range(3, 7)", "range(0, 12, 2)", 'range("4:10")', "a = [1, 2, 3, 4; 5, 6, 7, 8]", "a[1:2, 1:2]"], seealso: ["concat", "det", "diag", "eye", "inv", "ones", "size", "squeeze", "subset", "trace", "transpose", "zeros"] };
  }, function (e, t) {
    e.exports = { name: "resize", category: "Matrix", syntax: ["resize(x, size)", "resize(x, size, defaultValue)"], description: "Resize a matrix.", examples: ["resize([1,2,3,4,5], [3])", "resize([1,2,3], [5])", "resize([1,2,3], [5], -1)", "resize(2, [2, 3])", 'resize("hello", [8], "!")'], seealso: ["size", "subset", "squeeze"] };
  }, function (e, t) {
    e.exports = { name: "size", category: "Matrix", syntax: ["size(x)"], description: "Calculate the size of a matrix.", examples: ["size(2.3)", 'size("hello world")', "a = [1, 2; 3, 4; 5, 6]", "size(a)", "size(1:6)"],
      seealso: ["concat", "det", "diag", "eye", "inv", "ones", "range", "squeeze", "subset", "trace", "transpose", "zeros"] };
  }, function (e, t) {
    e.exports = { name: "sort", category: "Matrix", syntax: ["sort(x)", "sort(x, compare)"], description: 'Sort the items in a matrix. Compare can be a string "asc" or "desc", or a custom sort function.', examples: ["sort([5, 10, 1])", 'sort(["C", "B", "A", "D"])', "sortByLength(a, b) = size(a)[1] - size(b)[1]", 'sort(["Langdon", "Tom", "Sara"], sortByLength)'], seealso: ["map", "filter", "forEach"] };
  }, function (e, t) {
    e.exports = { name: "squeeze", category: "Matrix", syntax: ["squeeze(x)"], description: "Remove inner and outer singleton dimensions from a matrix.", examples: ["a = zeros(3,2,1)", "size(squeeze(a))", "b = zeros(1,1,3)", "size(squeeze(b))"], seealso: ["concat", "det", "diag", "eye", "inv", "ones", "range", "size", "subset", "trace", "transpose", "zeros"] };
  }, function (e, t) {
    e.exports = { name: "subset", category: "Matrix", syntax: ["value(index)", "value(index) = replacement", "subset(value, [index])", "subset(value, [index], replacement)"], description: "Get or set a subset of a matrix or string. Indexes are one-based. Both the ranges lower-bound and upper-bound are included.", examples: ["d = [1, 2; 3, 4]", "e = []", "e[1, 1:2] = [5, 6]", "e[2, :] = [7, 8]", "f = d * e", "f[2, 1]", "f[:, 1]"], seealso: ["concat", "det", "diag", "eye", "inv", "ones", "range", "size", "squeeze", "trace", "transpose", "zeros"] };
  }, function (e, t) {
    e.exports = { name: "trace", category: "Matrix", syntax: ["trace(A)"], description: "Calculate the trace of a matrix: the sum of the elements on the main diagonal of a square matrix.", examples: ["A = [1, 2, 3; -1, 2, 3; 2, 0, 3]", "trace(A)"], seealso: ["concat", "det", "diag", "eye", "inv", "ones", "range", "size", "squeeze", "subset", "transpose", "zeros"] };
  }, function (e, t) {
    e.exports = { name: "transpose", category: "Matrix", syntax: ["x'", "transpose(x)"], description: "Transpose a matrix", examples: ["a = [1, 2, 3; 4, 5, 6]", "a'", "transpose(a)"], seealso: ["concat", "det", "diag", "eye", "inv", "ones", "range", "size", "squeeze", "subset", "trace", "zeros"] };
  }, function (e, t) {
    e.exports = { name: "zeros", category: "Matrix", syntax: ["zeros(m)", "zeros(m, n)", "zeros(m, n, p, ...)", "zeros([m])", "zeros([m, n])", "zeros([m, n, p, ...])", "zeros"], description: "Create a matrix containing zeros.", examples: ["zeros(3)", "zeros(3, 5)", "a = [1, 2, 3; 4, 5, 6]", "zeros(size(a))"], seealso: ["concat", "det", "diag", "eye", "inv", "ones", "range", "size", "squeeze", "subset", "trace", "transpose"] };
  }, function (e, t) {
    e.exports = { name: "combinations", category: "Probability", syntax: ["combinations(n, k)"], description: "Compute the number of combinations of n items taken k at a time", examples: ["combinations(7, 5)"], seealso: ["permutations", "factorial"] };
  }, function (e, t) {
    e.exports = { name: "factorial", category: "Probability", syntax: ["kldivergence(x, y)"], description: "Compute the factorial of a value", examples: ["5!", "5 * 4 * 3 * 2 * 1", "3!"], seealso: ["combinations", "permutations", "gamma"] };
  }, function (e, t) {
    e.exports = { name: "gamma", category: "Probability", syntax: ["gamma(n)"], description: "Compute the gamma function. For small values, the Lanczos approximation is used, and for large values the extended Stirling approximation.", examples: ["gamma(4)", "3!", "gamma(1/2)", "sqrt(pi)"], seealso: ["factorial"] };
  }, function (e, t) {
    e.exports = { name: "kldivergence", category: "Probability", syntax: ["n!", "factorial(n)"], description: "Calculate the Kullback-Leibler (KL) divergence  between two distributions.", examples: ["math.kldivergence([0.7,0.5,0.4], [0.2,0.9,0.5])"], seealso: [] };
  }, function (e, t) {
    e.exports = { name: "multinomial", category: "Probability", syntax: ["multinomial(A)"], description: "Multinomial Coefficients compute the number of ways of picking a1, a2, ..., ai unordered outcomes from `n` possibilities. multinomial takes one array of integers as an argument. The following condition must be enforced: every ai <= 0.", examples: ["multinomial([1, 2, 1])"], seealso: ["combinations", "factorial"] };
  }, function (e, t) {
    e.exports = { name: "permutations", category: "Probability", syntax: ["permutations(n)", "permutations(n, k)"], description: "Compute the number of permutations of n items taken k at a time", examples: ["permutations(5)", "permutations(5, 3)"], seealso: ["combinations", "factorial"] };
  }, function (e, t) {
    e.exports = { name: "pickRandom", category: "Probability", syntax: ["pickRandom(array)", "pickRandom(array, number)", "pickRandom(array, weights)", "pickRandom(array, number, weights)", "pickRandom(array, weights, number)"], description: "Pick a random entry from a given array.", examples: ["pickRandom(0:10)", "pickRandom([1, 3, 1, 6])", "pickRandom([1, 3, 1, 6], 2)", "pickRandom([1, 3, 1, 6], [2, 3, 2, 1])", "pickRandom([1, 3, 1, 6], 2, [2, 3, 2, 1])", "pickRandom([1, 3, 1, 6], [2, 3, 2, 1], 2)"], seealso: ["random", "randomInt"] };
  }, function (e, t) {
    e.exports = { name: "random", category: "Probability", syntax: ["random()", "random(max)", "random(min, max)", "random(size)", "random(size, max)", "random(size, min, max)"], description: "Return a random number.", examples: ["random()", "random(10, 20)", "random([2, 3])"], seealso: ["pickRandom", "randomInt"] };
  }, function (e, t) {
    e.exports = { name: "randInt", category: "Probability", syntax: ["randInt(max)", "randInt(min, max)", "randInt(size)", "randInt(size, max)", "randInt(size, min, max)"], description: "Return a random integer number", examples: ["randInt(10, 20)", "randInt([2, 3], 10)"], seealso: ["pickRandom", "random"] };
  }, function (e, t) {
    e.exports = { name: "compare", category: "Relational", syntax: ["compare(x, y)"], description: "Compare two values. Returns 1 if x is larger than y, -1 if x is smaller than y, and 0 if x and y are equal.", examples: ["compare(2, 3)", "compare(3, 2)", "compare(2, 2)", "compare(5cm, 40mm)", "compare(2, [1, 2, 3])"], seealso: ["equal", "unequal", "smaller", "smallerEq", "largerEq"] };
  }, function (e, t) {
    e.exports = { name: "deepEqual", category: "Relational", syntax: ["deepEqual(x, y)"], description: "Check equality of two matrices element wise. Returns true if the size of both matrices is equal and when and each of the elements are equal.", examples: ["[1,3,4] == [1,3,4]", "[1,3,4] == [1,3]"], seealso: ["equal", "unequal", "smaller", "larger", "smallerEq", "largerEq", "compare"] };
  }, function (e, t) {
    e.exports = { name: "equal", category: "Relational", syntax: ["x == y", "equal(x, y)"], description: "Check equality of two values. Returns true if the values are equal, and false if not.", examples: ["2+2 == 3", "2+2 == 4", "a = 3.2", "b = 6-2.8", "a == b", "50cm == 0.5m"], seealso: ["unequal", "smaller", "larger", "smallerEq", "largerEq", "compare", "deepEqual"] };
  }, function (e, t) {
    e.exports = { name: "larger", category: "Relational", syntax: ["x > y", "larger(x, y)"], description: "Check if value x is larger than y. Returns true if x is larger than y, and false if not.", examples: ["2 > 3", "5 > 2*2", "a = 3.3", "b = 6-2.8", "(a > b)", "(b < a)", "5 cm > 2 inch"], seealso: ["equal", "unequal", "smaller", "smallerEq", "largerEq", "compare"] };
  }, function (e, t) {
    e.exports = { name: "largerEq", category: "Relational", syntax: ["x >= y", "largerEq(x, y)"], description: "Check if value x is larger or equal to y. Returns true if x is larger or equal to y, and false if not.", examples: ["2 > 1+1", "2 >= 1+1", "a = 3.2", "b = 6-2.8", "(a > b)"], seealso: ["equal", "unequal", "smallerEq", "smaller", "largerEq", "compare"] };
  }, function (e, t) {
    e.exports = { name: "smaller", category: "Relational", syntax: ["x < y", "smaller(x, y)"], description: "Check if value x is smaller than value y. Returns true if x is smaller than y, and false if not.", examples: ["2 < 3", "5 < 2*2", "a = 3.3", "b = 6-2.8", "(a < b)", "5 cm < 2 inch"], seealso: ["equal", "unequal", "larger", "smallerEq", "largerEq", "compare"] };
  }, function (e, t) {
    e.exports = { name: "smallerEq", category: "Relational", syntax: ["x <= y", "smallerEq(x, y)"], description: "Check if value x is smaller or equal to value y. Returns true if x is smaller than y, and false if not.", examples: ["2 < 1+1", "2 <= 1+1", "a = 3.2", "b = 6-2.8", "(a < b)"], seealso: ["equal", "unequal", "larger", "smaller", "largerEq", "compare"] };
  }, function (e, t) {
    e.exports = { name: "unequal", category: "Relational", syntax: ["x != y", "unequal(x, y)"], description: "Check unequality of two values. Returns true if the values are unequal, and false if they are equal.", examples: ["2+2 != 3", "2+2 != 4", "a = 3.2", "b = 6-2.8", "a != b", "50cm != 0.5m", "5 cm != 2 inch"], seealso: ["equal", "smaller", "larger", "smallerEq", "largerEq", "compare", "deepEqual"] };
  }, function (e, t) {
    e.exports = { name: "erf", category: "Special", syntax: ["erf(x)"], description: "Compute the erf function of a value using a rational Chebyshev approximations for different intervals of x", examples: ["erf(0.2)", "erf(-0.5)", "erf(4)"], seealso: [] };
  }, function (e, t) {
    e.exports = { name: "max", category: "Statistics", syntax: ["max(a, b, c, ...)", "max(A)", "max(A, dim)"], description: "Compute the maximum value of a list of values.", examples: ["max(2, 3, 4, 1)", "max([2, 3, 4, 1])", "max([2, 5; 4, 3])", "max([2, 5; 4, 3], 1)", "max([2, 5; 4, 3], 2)", "max(2.7, 7.1, -4.5, 2.0, 4.1)", "min(2.7, 7.1, -4.5, 2.0, 4.1)"], seealso: ["mean", "median", "min", "prod", "std", "sum", "var"] };
  }, function (e, t) {
    e.exports = { name: "mean", category: "Statistics", syntax: ["mean(a, b, c, ...)", "mean(A)", "mean(A, dim)"], description: "Compute the arithmetic mean of a list of values.", examples: ["mean(2, 3, 4, 1)", "mean([2, 3, 4, 1])", "mean([2, 5; 4, 3])", "mean([2, 5; 4, 3], 1)", "mean([2, 5; 4, 3], 2)", "mean([1.0, 2.7, 3.2, 4.0])"], seealso: ["max", "median", "min", "prod", "std", "sum", "var"] };
  }, function (e, t) {
    e.exports = { name: "median", category: "Statistics", syntax: ["median(a, b, c, ...)", "median(A)"], description: "Compute the median of all values. The values are sorted and the middle value is returned. In case of an even number of values, the average of the two middle values is returned.", examples: ["median(5, 2, 7)", "median([3, -1, 5, 7])"], seealso: ["max", "mean", "min", "prod", "std", "sum", "var"] };
  }, function (e, t) {
    e.exports = { name: "min", category: "Statistics", syntax: ["min(a, b, c, ...)", "min(A)", "min(A, dim)"], description: "Compute the minimum value of a list of values.", examples: ["min(2, 3, 4, 1)", "min([2, 3, 4, 1])", "min([2, 5; 4, 3])", "min([2, 5; 4, 3], 1)", "min([2, 5; 4, 3], 2)", "min(2.7, 7.1, -4.5, 2.0, 4.1)", "max(2.7, 7.1, -4.5, 2.0, 4.1)"], seealso: ["max", "mean", "median", "prod", "std", "sum", "var"] };
  }, function (e, t) {
    e.exports = { name: "mode", category: "Statistics", syntax: ["mode(a, b, c, ...)", "mode(A)", "mode(A, a, b, B, c, ...)"], description: "Computes the mode of all values as an array. In case mode being more than one, multiple values are returned in an array.", examples: ["mode(5, 2, 7)", "mode([3, -1, 5, 7])"], seealso: ["max", "mean", "min", "median", "prod", "std", "sum", "var"] };
  }, function (e, t) {
    e.exports = { name: "prod", category: "Statistics", syntax: ["prod(a, b, c, ...)", "prod(A)"], description: "Compute the product of all values.", examples: ["prod(2, 3, 4)", "prod([2, 3, 4])", "prod([2, 5; 4, 3])"], seealso: ["max", "mean", "min", "median", "min", "std", "sum", "var"] };
  }, function (e, t) {
    e.exports = { name: "quantileSeq", category: "Statistics", syntax: ["quantileSeq(A, prob[, sorted])", "quantileSeq(A, [prob1, prob2, ...][, sorted])", "quantileSeq(A, N[, sorted])"], description: "Compute the prob order quantile of a matrix or a list with values. The sequence is sorted and the middle value is returned. Supported types of sequence values are: Number, BigNumber, Unit Supported types of probablity are: Number, BigNumber. \n\nIn case of a (multi dimensional) array or matrix, the prob order quantile of all elements will be calculated.", examples: ["quantileSeq([3, -1, 5, 7], 0.5)", "quantileSeq([3, -1, 5, 7], [1/3, 2/3])", "quantileSeq([3, -1, 5, 7], 2)", "quantileSeq([-1, 3, 5, 7], 0.5, true)"], seealso: ["mean", "median", "min", "max", "prod", "std", "sum", "var"] };
  }, function (e, t) {
    e.exports = { name: "std", category: "Statistics", syntax: ["std(a, b, c, ...)", "std(A)", "std(A, normalization)"], description: 'Compute the standard deviation of all values, defined as std(A) = sqrt(var(A)). Optional parameter normalization can be "unbiased" (default), "uncorrected", or "biased".', examples: ["std(2, 4, 6)", "std([2, 4, 6, 8])", 'std([2, 4, 6, 8], "uncorrected")', 'std([2, 4, 6, 8], "biased")', "std([1, 2, 3; 4, 5, 6])"], seealso: ["max", "mean", "min", "median", "min", "prod", "sum", "var"] };
  }, function (e, t) {
    e.exports = { name: "sum", category: "Statistics", syntax: ["sum(a, b, c, ...)", "sum(A)"], description: "Compute the sum of all values.", examples: ["sum(2, 3, 4, 1)", "sum([2, 3, 4, 1])", "sum([2, 5; 4, 3])"], seealso: ["max", "mean", "median", "min", "prod", "std", "sum", "var"] };
  }, function (e, t) {
    e.exports = { name: "var", category: "Statistics", syntax: ["var(a, b, c, ...)", "var(A)", "var(A, normalization)"], description: 'Compute the variance of all values. Optional parameter normalization can be "unbiased" (default), "uncorrected", or "biased".', examples: ["var(2, 4, 6)", "var([2, 4, 6, 8])", 'var([2, 4, 6, 8], "uncorrected")', 'var([2, 4, 6, 8], "biased")', "var([1, 2, 3; 4, 5, 6])"], seealso: ["max", "mean", "min", "median", "min", "prod", "std", "sum"] };
  }, function (e, t) {
    e.exports = { name: "acos", category: "Trigonometry", syntax: ["acos(x)"], description: "Compute the inverse cosine of a value in radians.", examples: ["acos(0.5)", "acos(cos(2.3))"], seealso: ["cos", "atan", "asin"] };
  }, function (e, t) {
    e.exports = { name: "acosh", category: "Trigonometry", syntax: ["acosh(x)"], description: "Calculate the hyperbolic arccos of a value, defined as `acosh(x) = ln(sqrt(x^2 - 1) + x)`.", examples: ["acosh(1.5)"], seealso: ["cosh", "asinh", "atanh"] };
  }, function (e, t) {
    e.exports = { name: "acot", category: "Trigonometry", syntax: ["acot(x)"], description: "Calculate the inverse cotangent of a value.", examples: ["acot(0.5)", "acot(cot(0.5))", "acot(2)"], seealso: ["cot", "atan"] };
  }, function (e, t) {
    e.exports = { name: "acoth", category: "Trigonometry", syntax: ["acoth(x)"], description: "Calculate the hyperbolic arccotangent of a value, defined as `acoth(x) = (ln((x+1)/x) + ln(x/(x-1))) / 2`.", examples: ["acoth(0.5)"], seealso: ["acsch", "asech"] };
  }, function (e, t) {
    e.exports = { name: "acsc", category: "Trigonometry", syntax: ["acsc(x)"], description: "Calculate the inverse cotangent of a value.", examples: ["acsc(0.5)", "acsc(csc(0.5))", "acsc(2)"], seealso: ["csc", "asin", "asec"] };
  }, function (e, t) {
    e.exports = { name: "acsch", category: "Trigonometry", syntax: ["acsch(x)"], description: "Calculate the hyperbolic arccosecant of a value, defined as `acsch(x) = ln(1/x + sqrt(1/x^2 + 1))`.", examples: ["acsch(0.5)"], seealso: ["asech", "acoth"] };
  }, function (e, t) {
    e.exports = { name: "asec", category: "Trigonometry", syntax: ["asec(x)"], description: "Calculate the inverse secant of a value.", examples: ["asec(0.5)", "asec(sec(0.5))", "asec(2)"], seealso: ["acos", "acot", "acsc"] };
  }, function (e, t) {
    e.exports = { name: "asech", category: "Trigonometry", syntax: ["asech(x)"], description: "Calculate the inverse secant of a value.", examples: ["asech(0.5)"], seealso: ["acsch", "acoth"] };
  }, function (e, t) {
    e.exports = { name: "asin", category: "Trigonometry", syntax: ["asin(x)"], description: "Compute the inverse sine of a value in radians.", examples: ["asin(0.5)", "asin(sin(2.3))"], seealso: ["sin", "acos", "atan"] };
  }, function (e, t) {
    e.exports = { name: "asinh", category: "Trigonometry", syntax: ["asinh(x)"], description: "Calculate the hyperbolic arcsine of a value, defined as `asinh(x) = ln(x + sqrt(x^2 + 1))`.", examples: ["asinh(0.5)"], seealso: ["acosh", "atanh"] };
  }, function (e, t) {
    e.exports = { name: "atan", category: "Trigonometry", syntax: ["atan(x)"], description: "Compute the inverse tangent of a value in radians.", examples: ["atan(0.5)", "atan(tan(2.3))"], seealso: ["tan", "acos", "asin"] };
  }, function (e, t) {
    e.exports = { name: "atanh", category: "Trigonometry", syntax: ["atanh(x)"], description: "Calculate the hyperbolic arctangent of a value, defined as `atanh(x) = ln((1 + x)/(1 - x)) / 2`.", examples: ["atanh(0.5)"], seealso: ["acosh", "asinh"] };
  }, function (e, t) {
    e.exports = { name: "atan2", category: "Trigonometry", syntax: ["atan2(y, x)"], description: "Computes the principal value of the arc tangent of y/x in radians.", examples: ["atan2(2, 2) / pi", "angle = 60 deg in rad", "x = cos(angle)", "y = sin(angle)", "atan2(y, x)"], seealso: ["sin", "cos", "tan"] };
  }, function (e, t) {
    e.exports = { name: "cos", category: "Trigonometry", syntax: ["cos(x)"], description: "Compute the cosine of x in radians.", examples: ["cos(2)", "cos(pi / 4) ^ 2", "cos(180 deg)", "cos(60 deg)", "sin(0.2)^2 + cos(0.2)^2"], seealso: ["acos", "sin", "tan"] };
  }, function (e, t) {
    e.exports = { name: "cosh", category: "Trigonometry", syntax: ["cosh(x)"], description: "Compute the hyperbolic cosine of x in radians.", examples: ["cosh(0.5)"], seealso: ["sinh", "tanh", "coth"] };
  }, function (e, t) {
    e.exports = { name: "cot", category: "Trigonometry", syntax: ["cot(x)"], description: "Compute the cotangent of x in radians. Defined as 1/tan(x)", examples: ["cot(2)", "1 / tan(2)"], seealso: ["sec", "csc", "tan"] };
  }, function (e, t) {
    e.exports = { name: "coth", category: "Trigonometry", syntax: ["coth(x)"], description: "Compute the hyperbolic cotangent of x in radians.", examples: ["coth(2)", "1 / tanh(2)"], seealso: ["sech", "csch", "tanh"] };
  }, function (e, t) {
    e.exports = { name: "csc", category: "Trigonometry", syntax: ["csc(x)"], description: "Compute the cosecant of x in radians. Defined as 1/sin(x)", examples: ["csc(2)", "1 / sin(2)"], seealso: ["sec", "cot", "sin"] };
  }, function (e, t) {
    e.exports = { name: "csch", category: "Trigonometry", syntax: ["csch(x)"], description: "Compute the hyperbolic cosecant of x in radians. Defined as 1/sinh(x)", examples: ["csch(2)", "1 / sinh(2)"], seealso: ["sech", "coth", "sinh"] };
  }, function (e, t) {
    e.exports = { name: "sec", category: "Trigonometry", syntax: ["sec(x)"], description: "Compute the secant of x in radians. Defined as 1/cos(x)", examples: ["sec(2)", "1 / cos(2)"], seealso: ["cot", "csc", "cos"] };
  }, function (e, t) {
    e.exports = { name: "sech", category: "Trigonometry", syntax: ["sech(x)"], description: "Compute the hyperbolic secant of x in radians. Defined as 1/cosh(x)", examples: ["sech(2)", "1 / cosh(2)"], seealso: ["coth", "csch", "cosh"] };
  }, function (e, t) {
    e.exports = { name: "sin", category: "Trigonometry", syntax: ["sin(x)"], description: "Compute the sine of x in radians.", examples: ["sin(2)", "sin(pi / 4) ^ 2", "sin(90 deg)", "sin(30 deg)", "sin(0.2)^2 + cos(0.2)^2"], seealso: ["asin", "cos", "tan"] };
  }, function (e, t) {
    e.exports = { name: "sinh", category: "Trigonometry", syntax: ["sinh(x)"], description: "Compute the hyperbolic sine of x in radians.", examples: ["sinh(0.5)"], seealso: ["cosh", "tanh"] };
  }, function (e, t) {
    e.exports = { name: "tan", category: "Trigonometry", syntax: ["tan(x)"], description: "Compute the tangent of x in radians.", examples: ["tan(0.5)", "sin(0.5) / cos(0.5)", "tan(pi / 4)", "tan(45 deg)"], seealso: ["atan", "sin", "cos"] };
  }, function (e, t) {
    e.exports = { name: "tanh", category: "Trigonometry", syntax: ["tanh(x)"], description: "Compute the hyperbolic tangent of x in radians.", examples: ["tanh(0.5)", "sinh(0.5) / cosh(0.5)"], seealso: ["sinh", "cosh"] };
  }, function (e, t) {
    e.exports = { name: "to", category: "Units", syntax: ["x to unit", "to(x, unit)"], description: "Change the unit of a value.", examples: ["5 inch to cm", "3.2kg to g", "16 bytes in bits"], seealso: [] };
  }, function (e, t) {
    e.exports = { name: "clone", category: "Utils", syntax: ["clone(x)"], description: "Clone a variable. Creates a copy of primitive variables,and a deep copy of matrices", examples: ["clone(3.5)", "clone(2 - 4i)", "clone(45 deg)", "clone([1, 2; 3, 4])", 'clone("hello world")'], seealso: [] };
  }, function (e, t) {
    e.exports = { name: "format", category: "Utils", syntax: ["format(value)", "format(value, precision)"], description: "Format a value of any type as string.", examples: ["format(2.3)", "format(3 - 4i)", "format([])", "format(pi, 3)"], seealso: ["print"] };
  }, function (e, t) {
    e.exports = { name: "isNaN", category: "Utils", syntax: ["isNaN(x)"], description: "Test whether a value is NaN (not a number)", examples: ["isNaN(2)", "isNaN(0 / 0)", "isNaN(NaN)", "isNaN(Infinity)"], seealso: ["isNegative", "isNumeric", "isPositive", "isZero"] };
  }, function (e, t) {
    e.exports = { name: "isInteger", category: "Utils", syntax: ["isInteger(x)"], description: "Test whether a value is an integer number.", examples: ["isInteger(2)", "isInteger(3.5)", "isInteger([3, 0.5, -2])"], seealso: ["isNegative", "isNumeric", "isPositive", "isZero"] };
  }, function (e, t) {
    e.exports = { name: "isNegative", category: "Utils", syntax: ["isNegative(x)"], description: "Test whether a value is negative: smaller than zero.", examples: ["isNegative(2)", "isNegative(0)", "isNegative(-4)", "isNegative([3, 0.5, -2])"], seealso: ["isInteger", "isNumeric", "isPositive", "isZero"] };
  }, function (e, t) {
    e.exports = { name: "isNumeric", category: "Utils", syntax: ["isNumeric(x)"], description: "Test whether a value is a numeric value. Returns true when the input is a number, BigNumber, Fraction, or boolean.", examples: ["isNumeric(2)", "isNumeric(0)", "isNumeric(bignumber(500))", "isNumeric(fraction(0.125))", 'isNumeric("3")', "isNumeric(2 + 3i)", 'isNumeric([2.3, "foo", false])'], seealso: ["isInteger", "isZero", "isNegative", "isPositive", "isNaN"] };
  }, function (e, t) {
    e.exports = { name: "isPositive", category: "Utils", syntax: ["isPositive(x)"], description: "Test whether a value is positive: larger than zero.", examples: ["isPositive(2)", "isPositive(0)", "isPositive(-4)", "isPositive([3, 0.5, -2])"], seealso: ["isInteger", "isNumeric", "isNegative", "isZero"] };
  }, function (e, t) {
    e.exports = { name: "isPrime", category: "Utils", syntax: ["isPrime(x)"], description: "Test whether a value is prime: has no divisors other than itself and one.", examples: ["isPrime(3)", "isPrime(-2)", "isPrime([2, 17, 100])"], seealso: ["isInteger", "isNumeric", "isNegative", "isZero"] };
  }, function (e, t) {
    e.exports = { name: "isZero", category: "Utils", syntax: ["isZero(x)"], description: "Test whether a value is zero.", examples: ["isZero(2)", "isZero(0)", "isZero(-4)", "isZero([3, 0, -2, 0])"], seealso: ["isInteger", "isNumeric", "isNegative", "isPositive"] };
  }, function (e, t) {
    e.exports = { name: "typeof", category: "Utils", syntax: ["typeof(x)"], description: "Get the type of a variable.", examples: ["typeof(3.5)", "typeof(2 - 4i)", "typeof(45 deg)", 'typeof("hello world")'], seealso: [] };
  }, function (e, t, r) {
    e.exports = [r(281), r(304), r(305), r(306), r(307)];
  }, function (e, t, r) {
    "use strict";
    function n(e, t, n, a) {
      var o = n(r(282));return a("compile", { string: function string(e) {
          return o(e).compile();
        }, "Array | Matrix": function ArrayMatrix(e) {
          return i(e, function (e) {
            return o(e).compile();
          });
        } });
    }var i = r(19);t.name = "compile", t.factory = n;
  }, function (e, t, r) {
    "use strict";
    function n(e, t, n, o) {
      function s(t, r) {
        if (1 != arguments.length && 2 != arguments.length) throw new i("parse", arguments.length, 1, 2);if (he = r && r.nodes ? r.nodes : {}, "string" == typeof t) return me = t, v();if (Array.isArray(t) || t instanceof e.Matrix) return a(t, function (e) {
          if ("string" != typeof e) throw new TypeError("String expected");return me = e, v();
        });throw new TypeError("String or matrix expected");
      }function u() {
        ge = 0, ve = me.charAt(0), be = 0, we = null;
      }function c() {
        ge++, ve = me.charAt(ge);
      }function f() {
        return me.charAt(ge - 1);
      }function l() {
        return me.charAt(ge + 1);
      }function p() {
        return me.charAt(ge + 2);
      }function h() {
        for (xe = fe.NULL, ye = "", de = ""; s.isWhitespace(ve, be);) {
          c();
        }if ("#" == ve) for (; "\n" != ve && "" != ve;) {
          de += ve, c();
        }if ("" == ve) return void (xe = fe.DELIMITER);if ("\n" == ve && !be) return xe = fe.DELIMITER, ye = ve, void c();var e = ve + l(),
            t = e + p();if (3 == t.length && le[t]) return xe = fe.DELIMITER, ye = t, c(), c(), void c();if (2 == e.length && le[e]) return xe = fe.DELIMITER, ye = e, c(), void c();if (le[ve]) return xe = fe.DELIMITER, ye = ve, void c();if (!s.isDigitDot(ve)) {
          if (s.isAlpha(ve, f(), l())) {
            for (; s.isAlpha(ve, f(), l()) || s.isDigit(ve);) {
              ye += ve, c();
            }return void (xe = pe.hasOwnProperty(ye) ? fe.DELIMITER : fe.SYMBOL);
          }for (xe = fe.UNKNOWN; "" != ve;) {
            ye += ve, c();
          }throw W('Syntax error in part "' + ye + '"');
        }if (xe = fe.NUMBER, "." == ve) ye += ve, c(), s.isDigit(ve) || (xe = fe.DELIMITER);else {
          for (; s.isDigit(ve);) {
            ye += ve, c();
          }s.isDecimalMark(ve, l()) && (ye += ve, c());
        }for (; s.isDigit(ve);) {
          ye += ve, c();
        }if (e = l(), "E" == ve || "e" == ve) if (s.isDigit(e) || "-" == e || "+" == e) {
          if (ye += ve, c(), "+" != ve && "-" != ve || (ye += ve, c()), !s.isDigit(ve)) throw W('Digit expected, got "' + ve + '"');for (; s.isDigit(ve);) {
            ye += ve, c();
          }if (s.isDecimalMark(ve, l())) throw W('Digit expected, got "' + ve + '"');
        } else if ("." == e) throw c(), W('Digit expected, got "' + ve + '"');
      }function m() {
        do {
          h();
        } while ("\n" == ye);
      }function d() {
        be++;
      }function g() {
        be--;
      }function v() {
        u(), h();var e = y();if ("" != ye) throw xe == fe.DELIMITER ? Y("Unexpected operator " + ye) : W('Unexpected part "' + ye + '"');return e;
      }function y() {
        var e,
            t,
            r = [];if ("" == ye) return e = new te("undefined", "undefined"), e.comment = de, e;for ("\n" != ye && ";" != ye && (e = x(), e.comment = de); "\n" == ye || ";" == ye;) {
          0 == r.length && e && (t = ";" != ye, r.push({ node: e, visible: t })), h(), "\n" != ye && ";" != ye && "" != ye && (e = x(), e.comment = de, t = ";" != ye, r.push({ node: e, visible: t }));
        }return r.length > 0 ? new K(r) : e;
      }function x() {
        var e,
            t,
            r,
            n,
            i = b();if ("=" == ye) {
          if (i && i.isSymbolNode) return e = i.name, m(), r = x(), new Q(new ce(e), r);if (i && i.isAccessorNode) return m(), r = x(), new Q(i.object, i.index, r);if (i && i.isFunctionNode && (n = !0, t = [], e = i.name, i.args.forEach(function (e, r) {
            e && e.isSymbolNode ? t[r] = e.name : n = !1;
          }), n)) return m(), r = x(), new re(e, t, r);throw W("Invalid left hand side of assignment operator =");
        }return i;
      }function b() {
        for (var e = w(); "?" == ye;) {
          var t = we;we = be, m();var r = e,
              n = x();if (":" != ye) throw W("False part of conditional expression expected");we = null, m();var i = x();e = new ee(r, n, i), we = t;
        }return e;
      }function w() {
        for (var e = N(); "or" == ye;) {
          m(), e = new ae("or", "or", [e, N()]);
        }return e;
      }function N() {
        for (var e = E(); "xor" == ye;) {
          m(), e = new ae("xor", "xor", [e, E()]);
        }return e;
      }function E() {
        for (var e = M(); "and" == ye;) {
          m(), e = new ae("and", "and", [e, M()]);
        }return e;
      }function M() {
        for (var e = A(); "|" == ye;) {
          m(), e = new ae("|", "bitOr", [e, A()]);
        }return e;
      }function A() {
        for (var e = O(); "^|" == ye;) {
          m(), e = new ae("^|", "bitXor", [e, O()]);
        }return e;
      }function O() {
        for (var e = _(); "&" == ye;) {
          m(), e = new ae("&", "bitAnd", [e, _()]);
        }return e;
      }function _() {
        var e, t, r, n, i;for (e = T(), t = { "==": "equal", "!=": "unequal", "<": "smaller", ">": "larger", "<=": "smallerEq", ">=": "largerEq" }; ye in t;) {
          r = ye, n = t[r], m(), i = [e, T()], e = new ae(r, n, i);
        }return e;
      }function T() {
        var e, t, r, n, i;for (e = C(), t = { "<<": "leftShift", ">>": "rightArithShift", ">>>": "rightLogShift" }; ye in t;) {
          r = ye, n = t[r], m(), i = [e, C()], e = new ae(r, n, i);
        }return e;
      }function C() {
        var e, t, r, n, i;for (e = S(), t = { to: "to", "in": "to" }; ye in t;) {
          r = ye, n = t[r], m(), "in" === r && "" === ye ? e = new ae("*", "multiply", [e, new ce("in")], !0) : (i = [e, S()], e = new ae(r, n, i));
        }return e;
      }function S() {
        var e,
            t = [];if (e = ":" == ye ? new te("1", "number") : z(), ":" == ye && we !== be) {
          for (t.push(e); ":" == ye && t.length < 3;) {
            m(), ")" == ye || "]" == ye || "," == ye || "" == ye ? t.push(new ce("end")) : t.push(z());
          }e = 3 == t.length ? new ue(t[0], t[2], t[1]) : new ue(t[0], t[1]);
        }return e;
      }function z() {
        var e, t, r, n, i;for (e = B(), t = { "+": "add", "-": "subtract" }; ye in t;) {
          r = ye, n = t[r], m(), i = [e, B()], e = new ae(r, n, i);
        }return e;
      }function B() {
        var e, t, r, n, i;for (e = k(), t = e, r = { "*": "multiply", ".*": "dotMultiply", "/": "divide", "./": "dotDivide", "%": "mod", mod: "mod" };;) {
          if (ye in r) n = ye, i = r[n], m(), t = k(), e = new ae(n, i, [e, t]);else {
            if (!(xe == fe.SYMBOL || "in" == ye && e && e.isConstantNode) && (xe != fe.NUMBER || t.isConstantNode || t.isOperatorNode && "!" !== t.op) && "(" != ye) break;t = k(), e = new ae("*", "multiply", [e, t], !0);
          }
        }return e;
      }function k() {
        var e,
            t,
            r = { "-": "unaryMinus", "+": "unaryPlus", "~": "bitNot", not: "not" }[ye];return r ? (e = ye, m(), t = [k()], new ae(e, r, t)) : I();
      }function I() {
        var e, t, r, n;return e = P(), "^" != ye && ".^" != ye || (t = ye, r = "^" == t ? "pow" : "dotPow", m(), n = [e, k()], e = new ae(t, r, n)), e;
      }function P() {
        var e, t, r, n, i;for (e = R(), t = { "!": "factorial", "'": "transpose" }; ye in t;) {
          r = ye, n = t[r], h(), i = [e], e = new ae(r, n, i), e = q(e);
        }return e;
      }function R() {
        var e,
            t = [];if (xe == fe.SYMBOL && he[ye]) {
          if (e = he[ye], h(), "(" == ye) {
            if (t = [], d(), h(), ")" != ye) for (t.push(x()); "," == ye;) {
              h(), t.push(x());
            }if (")" != ye) throw W("Parenthesis ) expected");g(), h();
          }return new e(t);
        }return U();
      }function U() {
        var e, t;return xe == fe.SYMBOL || xe == fe.DELIMITER && ye in pe ? (t = ye, h(), e = new ce(t), e = q(e)) : L();
      }function q(e, t) {
        for (var r; !("(" != ye && "[" != ye && "." != ye || t && -1 === t.indexOf(ye));) {
          if (r = [], "(" == ye) {
            if (!e.isSymbolNode && !e.isAccessorNode) return e;if (d(), h(), ")" != ye) for (r.push(x()); "," == ye;) {
              h(), r.push(x());
            }if (")" != ye) throw W("Parenthesis ) expected");g(), h(), e = new se(e, r);
          } else if ("[" == ye) {
            if (d(), h(), "]" != ye) for (r.push(x()); "," == ye;) {
              h(), r.push(x());
            }if ("]" != ye) throw W("Parenthesis ] expected");g(), h(), e = new X(e, new ne(r));
          } else {
            if (h(), xe != fe.SYMBOL) throw W("Property name expected after dot");r.push(new te(ye)), h();var n = !0;e = new X(e, new ne(r, n));
          }
        }return e;
      }function L() {
        var e, t;return '"' == ye ? (t = j(), e = new te(t, "string"), e = q(e)) : F();
      }function j() {
        for (var e = ""; "" != ve && '"' != ve;) {
          "\\" == ve && (e += ve, c()), e += ve, c();
        }if (h(), '"' != ye) throw W('End of string " expected');return h(), e;
      }function F() {
        var e, t, r, n;if ("[" == ye) {
          if (d(), h(), "]" != ye) {
            var i = D();if (";" == ye) {
              for (r = 1, t = [i]; ";" == ye;) {
                h(), t[r] = D(), r++;
              }if ("]" != ye) throw W("End of matrix ] expected");g(), h(), n = t[0].items.length;for (var a = 1; r > a; a++) {
                if (t[a].items.length != n) throw Y("Column dimensions mismatch (" + t[a].items.length + " != " + n + ")");
              }e = new J(t);
            } else {
              if ("]" != ye) throw W("End of matrix ] expected");g(), h(), e = i;
            }
          } else g(), h(), e = new J([]);return q(e);
        }return $();
      }function D() {
        for (var e = [x()], t = 1; "," == ye;) {
          h(), e[t] = x(), t++;
        }return new J(e);
      }function $() {
        if ("{" == ye) {
          var e,
              t = {};do {
            if (h(), "}" != ye) {
              if ('"' == ye) e = j();else {
                if (xe != fe.SYMBOL) throw W("Symbol or string expected as object key");e = ye, h();
              }if (":" != ye) throw W("Colon : expected after object key");h(), t[e] = x();
            }
          } while ("," == ye);if ("}" != ye) throw W("Comma , or bracket } expected after object value");h();var r = new ie(t);return r = q(r);
        }return G();
      }function G() {
        var e;return xe == fe.NUMBER ? (e = ye, h(), new te(e, "number")) : H();
      }function H() {
        var e;if ("(" == ye) {
          if (d(), h(), e = x(), ")" != ye) throw W("Parenthesis ) expected");return g(), h(), e = new oe(e), e = q(e);
        }return Z();
      }function Z() {
        throw W("" == ye ? "Unexpected end of expression" : "Value expected");
      }function V() {
        return ge - ye.length + 1;
      }function W(e) {
        var t = V(),
            r = new SyntaxError(e + " (char " + t + ")");return r["char"] = t, r;
      }function Y(e) {
        var t = V(),
            r = new SyntaxError(e + " (char " + t + ")");return r["char"] = t, r;
      }var X = n(r(283)),
          J = n(r(289)),
          Q = n(r(290)),
          K = n(r(293)),
          ee = n(r(294)),
          te = n(r(295)),
          re = n(r(296)),
          ne = n(r(297)),
          ie = n(r(300)),
          ae = n(r(301)),
          oe = n(r(303)),
          se = n(r(302)),
          ue = n(r(298)),
          ce = n(r(299)),
          fe = { NULL: 0, DELIMITER: 1, NUMBER: 2, SYMBOL: 3, UNKNOWN: 4 },
          le = { ",": !0, "(": !0, ")": !0, "[": !0, "]": !0, "{": !0, "}": !0, '"': !0, ";": !0, "+": !0, "-": !0, "*": !0, ".*": !0, "/": !0, "./": !0, "%": !0, "^": !0, ".^": !0, "~": !0, "!": !0, "&": !0, "|": !0, "^|": !0, "'": !0, "=": !0, ":": !0, "?": !0, "==": !0, "!=": !0, "<": !0, ">": !0, "<=": !0, ">=": !0, "<<": !0, ">>": !0, ">>>": !0 },
          pe = { mod: !0, to: !0, "in": !0, and: !0, xor: !0, or: !0, not: !0 },
          he = {},
          me = "",
          de = "",
          ge = 0,
          ve = "",
          ye = "",
          xe = fe.NULL,
          be = 0,
          we = null;return s.isAlpha = function (e, t, r) {
        return s.isValidLatinOrGreek(e) || s.isValidMathSymbol(e, r) || s.isValidMathSymbol(t, e);
      }, s.isValidLatinOrGreek = function (e) {
        return (/^[a-zA-Z_\u00C0-\u02AF\u0370-\u03FF\u2100-\u214F]$/.test(e)
        );
      }, s.isValidMathSymbol = function (e, t) {
        return (/^[\uD835]$/.test(e) && /^[\uDC00-\uDFFF]$/.test(t) && /^[^\uDC55\uDC9D\uDCA0\uDCA1\uDCA3\uDCA4\uDCA7\uDCA8\uDCAD\uDCBA\uDCBC\uDCC4\uDD06\uDD0B\uDD0C\uDD15\uDD1D\uDD3A\uDD3F\uDD45\uDD47-\uDD49\uDD51\uDEA6\uDEA7\uDFCC\uDFCD]$/.test(t)
        );
      }, s.isWhitespace = function (e, t) {
        return " " == e || "	" == e || "\n" == e && t > 0;
      }, s.isDecimalMark = function (e, t) {
        return "." == e && "/" !== t && "*" !== t && "^" !== t;
      }, s.isDigitDot = function (e) {
        return e >= "0" && "9" >= e || "." == e;
      }, s.isDigit = function (e) {
        return e >= "0" && "9" >= e;
      }, s;
    }var i = r(11),
        a = r(19);t.name = "parse", t.path = "expression", t.factory = n;
  }, function (e, t, r) {
    "use strict";
    function n(e, t, n, i) {
      function a(e, t) {
        if (!(this instanceof a)) throw new SyntaxError("Constructor must be called with the new operator");if (!e || !e.isNode) throw new TypeError('Node expected for parameter "object"');if (!t || !t.isIndexNode) throw new TypeError('IndexNode expected for parameter "index"');this.object = e || null, this.index = t, Object.defineProperty(this, "name", { get: function () {
            return this.index ? this.index.isObjectProperty() ? this.index.getObjectProperty() : "" : this.object.name || "";
          }.bind(this), set: function set() {
            throw new Error("Cannot assign a new name, name is read-only");
          } });
      }function o(e) {
        return !(e.isAccessorNode || e.isArrayNode || e.isConstantNode || e.isFunctionNode || e.isObjectNode || e.isParenthesisNode || e.isSymbolNode);
      }var s = n(r(284)),
          u = n(r(286));return a.prototype = new s(), a.prototype.type = "AccessorNode", a.prototype.isAccessorNode = !0, a.prototype._compile = function (e, t) {
        e.access = u;var r = this.object._compile(e, t),
            n = this.index._compile(e, t);return this.index.isObjectProperty() ? r + '["' + this.index.getObjectProperty() + '"]' : this.index.needsSize() ? "(function () {  var object = " + r + ";  var size = math.size(object).valueOf();  return access(object, " + n + ");})()" : "access(" + r + ", " + n + ")";
      }, a.prototype.forEach = function (e) {
        e(this.object, "object", this), e(this.index, "index", this);
      }, a.prototype.map = function (e) {
        return new a(this._ifNode(e(this.object, "object", this)), this._ifNode(e(this.index, "index", this)));
      }, a.prototype.clone = function () {
        return new a(this.object, this.index);
      }, a.prototype._toString = function (e) {
        var t = this.object.toString(e);return o(this.object) && (t = "(" + t + ")"), t + this.index.toString(e);
      }, a.prototype._toTex = function (e) {
        var t = this.object.toTex(e);return o(this.object) && (t = "\\left(" + t + "\\right)"), t + this.index.toTex(e);
      }, a;
    }t.name = "AccessorNode", t.path = "expression.node", t.factory = n;
  }, function (e, t, r) {
    "use strict";
    function n(e, t, r, n, o) {
      function s() {
        if (!(this instanceof s)) throw new SyntaxError("Constructor must be called with the new operator");
      }function u(e) {
        for (var t in e) {
          if (e.hasOwnProperty(t) && t in i) throw new Error('Scope contains an illegal symbol, "' + t + '" is a reserved keyword');
        }
      }return s.prototype.eval = function (e) {
        return this.compile().eval(e);
      }, s.prototype.type = "Node", s.prototype.isNode = !0, s.prototype.comment = "", s.prototype.compile = function () {
        if (arguments.length > 0) throw new Error("Calling compile(math) is deprecated. Call the function as compile() instead.");var e = { math: o.expression.transform, args: {}, _validateScope: u },
            t = {},
            r = this._compile(e, t),
            n = Object.keys(e).map(function (e) {
          return "    var " + e + ' = defs["' + e + '"];';
        }),
            i = n.join(" ") + 'return {  "eval": function (scope) {    if (scope) _validateScope(scope);    scope = scope || {};    return ' + r + ";  }};",
            a = new Function("defs", i);return a(e);
      }, s.prototype._compile = function (e, t) {
        throw new Error("Cannot compile a Node interface");
      }, s.prototype.forEach = function (e) {
        throw new Error("Cannot run forEach on a Node interface");
      }, s.prototype.map = function (e) {
        throw new Error("Cannot run map on a Node interface");
      }, s.prototype._ifNode = function (e) {
        if (!e || !e.isNode) throw new TypeError("Callback function must return a Node");return e;
      }, s.prototype.traverse = function (e) {
        function t(e, r) {
          e.forEach(function (e, n, i) {
            r(e, n, i), t(e, r);
          });
        }e(this, null, null), t(this, e);
      }, s.prototype.transform = function (e) {
        function t(e, r) {
          return e.map(function (e, n, i) {
            var a = r(e, n, i);return t(a, r);
          });
        }var r = e(this, null, null);return t(r, e);
      }, s.prototype.filter = function (e) {
        var t = [];return this.traverse(function (r, n, i) {
          e(r, n, i) && t.push(r);
        }), t;
      }, s.prototype.find = function () {
        throw new Error("Function Node.find is deprecated. Use Node.filter instead.");
      }, s.prototype.match = function () {
        throw new Error("Function Node.match is deprecated. See functions Node.filter, Node.transform, Node.traverse.");
      }, s.prototype.clone = function () {
        throw new Error("Cannot clone a Node interface");
      }, s.prototype.cloneDeep = function () {
        return this.map(function (e) {
          return e.cloneDeep();
        });
      }, s.prototype.equals = function (e) {
        return e ? a(this, e) : !1;
      }, s.prototype.toString = function (e) {
        var t;if (e && "object" == (typeof e === "undefined" ? "undefined" : _typeof(e))) switch (_typeof(e.handler)) {case "object":case "undefined":
            break;case "function":
            t = e.handler(this, e);break;default:
            throw new TypeError("Object or function expected as callback");}return "undefined" != typeof t ? t : this._toString(e);
      }, s.prototype._toString = function () {
        throw new Error("_toString not implemented for " + this.type);
      }, s.prototype.toTex = function (e) {
        var t;if (e && "object" == (typeof e === "undefined" ? "undefined" : _typeof(e))) switch (_typeof(e.handler)) {case "object":case "undefined":
            break;case "function":
            t = e.handler(this, e);break;default:
            throw new TypeError("Object or function expected as callback");}return "undefined" != typeof t ? t : this._toTex(e);
      }, s.prototype._toTex = function (e) {
        throw new Error("_toTex not implemented for " + this.type);
      }, s.prototype.getIdentifier = function () {
        return this.type;
      }, s.prototype.getContent = function () {
        return this;
      }, s;
    }var i = r(285),
        a = (r(3).extend, r(3).deepEqual);t.name = "Node", t.path = "expression.node", t.math = !0, t.factory = n;
  }, function (e, t) {
    "use strict";
    e.exports = { end: !0 };
  }, function (e, t, r) {
    "use strict";
    function n(e, t, n, a) {
      var o = n(r(288)),
          s = n(r(52));return function (e, t) {
        try {
          if (Array.isArray(e)) return s(e).subset(t).valueOf();if (e && "function" == typeof e.subset) return e.subset(t);if ("string" == typeof e) return o(e, t);if ("object" == (typeof e === "undefined" ? "undefined" : _typeof(e))) {
            if (!t.isObjectProperty()) throw TypeError("Cannot apply a numeric index as object property");return e[t.getObjectProperty()];
          }throw new TypeError("Cannot apply index: unsupported type of object");
        } catch (r) {
          throw i(r);
        }
      };
    }var i = r(287).transform;t.factory = n;
  }, function (e, t, r) {
    var n = r(43);t.transform = function (e) {
      return e && e.isIndexError ? new n(e.index + 1, e.min + 1, void 0 !== e.max ? e.max + 1 : void 0) : e;
    };
  }, function (e, t, r) {
    "use strict";
    function n(e, t, n, c) {
      function f(e, t) {
        if (!t || t.isIndex !== !0) throw new TypeError("Index expected");if (1 != t.size().length) throw new u(t.size().length, 1);var r = e.length;s(t.min()[0], r), s(t.max()[0], r);var n = t.dimension(0),
            i = "";return n.forEach(function (t) {
          i += e.charAt(t);
        }), i;
      }function l(e, t, r, n) {
        if (!t || t.isIndex !== !0) throw new TypeError("Index expected");if (1 != t.size().length) throw new u(t.size().length, 1);if (void 0 !== n) {
          if ("string" != typeof n || 1 !== n.length) throw new TypeError("Single character expected as defaultValue");
        } else n = " ";var i = t.dimension(0),
            a = i.size()[0];if (a != r.length) throw new u(i.size()[0], r.length);var o = e.length;s(t.min()[0]), s(t.max()[0]);for (var c = [], f = 0; o > f; f++) {
          c[f] = e.charAt(f);
        }if (i.forEach(function (e, t) {
          c[e] = r.charAt(t[0]);
        }), c.length > o) for (f = o - 1, a = c.length; a > f; f++) {
          c[f] || (c[f] = n);
        }return c.join("");
      }var p = n(r(52)),
          h = c("subset", { "Array, Index": function ArrayIndex(e, t) {
          var r = p(e),
              n = r.subset(t);return n && n.valueOf();
        }, "Matrix, Index": function MatrixIndex(e, t) {
          return e.subset(t);
        }, "Object, Index": i, "string, Index": f, "Array, Index, any": function ArrayIndexAny(e, t, r) {
          return p(o(e)).subset(t, r, void 0).valueOf();
        }, "Array, Index, any, any": function ArrayIndexAnyAny(e, t, r, n) {
          return p(o(e)).subset(t, r, n).valueOf();
        }, "Matrix, Index, any": function MatrixIndexAny(e, t, r) {
          return e.clone().subset(t, r);
        }, "Matrix, Index, any, any": function MatrixIndexAnyAny(e, t, r, n) {
          return e.clone().subset(t, r, n);
        }, "string, Index, string": l, "string, Index, string, string": l, "Object, Index, any": a });return h.toTex = void 0, h;
    }function i(e, t) {
      if (1 !== t.size().length) throw new u(t.size(), 1);var r = t.dimension(0);if ("string" != typeof r) throw new TypeError("String expected as index to retrieve an object property");return e[r];
    }function a(e, t, r) {
      if (1 !== t.size().length) throw new u(t.size(), 1);var n = t.dimension(0);if ("string" != typeof n) throw new TypeError("String expected as index to retrieve an object property");var i = o(e);return i[n] = r, i;
    }var o = r(3).clone,
        s = r(40).validateIndex,
        u = r(42);t.name = "subset", t.factory = n;
  }, function (e, t, r) {
    "use strict";
    function n(e, t, n, i) {
      function a(e) {
        if (!(this instanceof a)) throw new SyntaxError("Constructor must be called with the new operator");if (this.items = e || [], !Array.isArray(this.items) || !this.items.every(function (e) {
          return e && e.isNode;
        })) throw new TypeError("Array containing Nodes expected");var t = function t() {
          throw new Error("Property `ArrayNode.nodes` is deprecated, use `ArrayNode.items` instead");
        };Object.defineProperty(this, "nodes", { get: t, set: t });
      }var o = n(r(284));return a.prototype = new o(), a.prototype.type = "ArrayNode", a.prototype.isArrayNode = !0, a.prototype._compile = function (e, t) {
        var r = "Array" !== e.math.config().matrix,
            n = this.items.map(function (r) {
          return r._compile(e, t);
        });return (r ? "math.matrix([" : "[") + n.join(",") + (r ? "])" : "]");
      }, a.prototype.forEach = function (e) {
        for (var t = 0; t < this.items.length; t++) {
          var r = this.items[t];e(r, "items[" + t + "]", this);
        }
      }, a.prototype.map = function (e) {
        for (var t = [], r = 0; r < this.items.length; r++) {
          t[r] = this._ifNode(e(this.items[r], "items[" + r + "]", this));
        }return new a(t);
      }, a.prototype.clone = function () {
        return new a(this.items.slice(0));
      }, a.prototype._toString = function (e) {
        var t = this.items.map(function (t) {
          return t.toString(e);
        });return "[" + t.join(", ") + "]";
      }, a.prototype._toTex = function (e) {
        var t = "\\begin{bmatrix}";return this.items.forEach(function (r) {
          t += r.items ? r.items.map(function (t) {
            return t.toTex(e);
          }).join("&") : r.toTex(e), t += "\\\\";
        }), t += "\\end{bmatrix}";
      }, a;
    }t.name = "ArrayNode", t.path = "expression.node", t.factory = n;
  }, function (e, t, r) {
    "use strict";
    function n(e, t, n, i) {
      function a(e, t, r) {
        if (!(this instanceof a)) throw new SyntaxError("Constructor must be called with the new operator");if (this.object = e, this.index = r ? t : null, this.value = r ? r : t, !e || !e.isSymbolNode && !e.isAccessorNode) throw new TypeError('SymbolNode or AccessorNode expected as "object"');if (e && e.isSymbolNode && "end" === e.name) throw new Error('Cannot assign to symbol "end"');if (this.index && !this.index.isIndexNode) throw new TypeError('IndexNode expected as "index"');if (!this.value || !this.value.isNode) throw new TypeError('Node expected as "value"');Object.defineProperty(this, "name", { get: function () {
            return this.index ? this.index.isObjectProperty() ? this.index.getObjectProperty() : "" : this.object.name || "";
          }.bind(this), set: function set() {
            throw new Error("Cannot assign a new name, name is read-only");
          } });
      }function o(e, t) {
        t || (t = "keep");var r = f.getPrecedence(e, t),
            n = f.getPrecedence(e.value, t);return "all" === t || null !== n && r >= n;
      }var s = n(r(284)),
          u = (n(r(289)), n(r(52)), n(r(291))),
          c = n(r(286)),
          f = (r(285), r(292));return a.prototype = new s(), a.prototype.type = "AssignmentNode", a.prototype.isAssignmentNode = !0, a.prototype._compile = function (e, t) {
        e.assign = u, e.access = c;var r,
            n = this.object._compile(e, t),
            i = this.index ? this.index._compile(e, t) : null,
            a = this.value._compile(e, t);if (this.index) {
          if (this.index.isObjectProperty()) return n + '["' + this.index.getObjectProperty() + '"] = ' + a;if (this.object.isSymbolNode) return r = this.index.needsSize() ? "var size = math.size(object).valueOf();" : "", "(function () {  var object = " + n + ";  var value = " + a + ";  " + r + '  scope["' + this.object.name + '"] = assign(object, ' + i + ", value);  return value;})()";r = this.index.needsSize() ? "var size = math.size(object).valueOf();" : "";var o = this.object.object._compile(e, t);if (this.object.index.isObjectProperty()) {
            var s = '["' + this.object.index.getObjectProperty() + '"]';return "(function () {  var parent = " + o + ";  var object = parent" + s + ";  var value = " + a + ";" + r + "  parent" + s + " = assign(object, " + i + ", value);  return value;})()";
          }var f = this.object.index.needsSize() ? "var size = math.size(parent).valueOf();" : "",
              l = this.object.index._compile(e, t);return "(function () {  var parent = " + o + ";  " + f + "  var parentIndex = " + l + ";  var object = access(parent, parentIndex);  var value = " + a + ";  " + r + "  assign(parent, parentIndex, assign(object, " + i + ", value));  return value;})()";
        }if (!this.object.isSymbolNode) throw new TypeError("SymbolNode expected as object");return 'scope["' + this.object.name + '"] = ' + a;
      }, a.prototype.forEach = function (e) {
        e(this.object, "object", this), this.index && e(this.index, "index", this), e(this.value, "value", this);
      }, a.prototype.map = function (e) {
        var t = this._ifNode(e(this.object, "object", this)),
            r = this.index ? this._ifNode(e(this.index, "index", this)) : null,
            n = this._ifNode(e(this.value, "value", this));return new a(t, r, n);
      }, a.prototype.clone = function () {
        return new a(this.object, this.index, this.value);
      }, a.prototype._toString = function (e) {
        var t = this.object.toString(e),
            r = this.index ? this.index.toString(e) : "",
            n = this.value.toString(e);return o(this, e && e.parenthesis) && (n = "(" + n + ")"), t + r + " = " + n;
      }, a.prototype._toTex = function (e) {
        var t = this.object.toTex(e),
            r = this.index ? this.index.toTex(e) : "",
            n = this.value.toTex(e);return o(this, e && e.parenthesis) && (n = "\\left(" + n + "\\right)"), t + r + ":=" + n;
      }, a;
    }r(32);t.name = "AssignmentNode", t.path = "expression.node", t.factory = n;
  }, function (e, t, r) {
    "use strict";
    function n(e, t, n, a) {
      var o = n(r(288)),
          s = n(r(52));return function (e, t, r) {
        try {
          if (Array.isArray(e)) return s(e).subset(t, r).valueOf();if (e && "function" == typeof e.subset) return e.subset(t, r);if ("string" == typeof e) return o(e, t, r);if ("object" == (typeof e === "undefined" ? "undefined" : _typeof(e))) {
            if (!t.isObjectProperty()) throw TypeError("Cannot apply a numeric index as object property");return e[t.getObjectProperty()] = r, e;
          }throw new TypeError("Cannot apply index: unsupported type of object");
        } catch (n) {
          throw i(n);
        }
      };
    }var i = r(287).transform;t.factory = n;
  }, function (e, t) {
    "use strict";
    function r(e, t) {
      var r = e;"keep" !== t && (r = e.getContent());for (var n = r.getIdentifier(), i = 0; i < a.length; i++) {
        if (n in a[i]) return i;
      }return null;
    }function n(e, t) {
      var n = e;"keep" !== t && (n = e.getContent());var i = n.getIdentifier(),
          o = r(n, t);if (null === o) return null;var s = a[o][i];if (s.hasOwnProperty("associativity")) {
        if ("left" === s.associativity) return "left";if ("right" === s.associativity) return "right";throw Error("'" + i + "' has the invalid associativity '" + s.associativity + "'.");
      }return null;
    }function i(e, t, n) {
      var i = e,
          o = t;if ("keep" !== n) var i = e.getContent(),
          o = t.getContent();var s = i.getIdentifier(),
          u = o.getIdentifier(),
          c = r(i, n);if (null === c) return null;var f = a[c][s];if (f.hasOwnProperty("associativeWith") && f.associativeWith instanceof Array) {
        for (var l = 0; l < f.associativeWith.length; l++) {
          if (f.associativeWith[l] === u) return !0;
        }return !1;
      }return null;
    }var a = [{ AssignmentNode: {}, FunctionAssignmentNode: {} }, { ConditionalNode: { latexLeftParens: !1, latexRightParens: !1, latexParens: !1 } }, { "OperatorNode:or": { associativity: "left", associativeWith: [] } }, { "OperatorNode:xor": { associativity: "left", associativeWith: [] } }, { "OperatorNode:and": { associativity: "left", associativeWith: [] } }, { "OperatorNode:bitOr": { associativity: "left", associativeWith: [] } }, { "OperatorNode:bitXor": { associativity: "left", associativeWith: [] } }, { "OperatorNode:bitAnd": { associativity: "left", associativeWith: [] } }, { "OperatorNode:equal": { associativity: "left", associativeWith: [] }, "OperatorNode:unequal": { associativity: "left", associativeWith: [] }, "OperatorNode:smaller": { associativity: "left", associativeWith: [] }, "OperatorNode:larger": { associativity: "left", associativeWith: [] }, "OperatorNode:smallerEq": { associativity: "left", associativeWith: [] }, "OperatorNode:largerEq": { associativity: "left", associativeWith: [] } }, { "OperatorNode:leftShift": { associativity: "left", associativeWith: [] }, "OperatorNode:rightArithShift": { associativity: "left", associativeWith: [] }, "OperatorNode:rightLogShift": { associativity: "left", associativeWith: [] } }, { "OperatorNode:to": { associativity: "left", associativeWith: [] } }, { RangeNode: {} }, { "OperatorNode:add": { associativity: "left", associativeWith: ["OperatorNode:add", "OperatorNode:subtract"] }, "OperatorNode:subtract": { associativity: "left", associativeWith: [] } }, { "OperatorNode:multiply": { associativity: "left", associativeWith: ["OperatorNode:multiply", "OperatorNode:divide", "Operator:dotMultiply", "Operator:dotDivide"] }, "OperatorNode:divide": { associativity: "left", associativeWith: [], latexLeftParens: !1, latexRightParens: !1, latexParens: !1 }, "OperatorNode:dotMultiply": { associativity: "left", associativeWith: ["OperatorNode:multiply", "OperatorNode:divide", "OperatorNode:dotMultiply", "OperatorNode:doDivide"] }, "OperatorNode:dotDivide": { associativity: "left", associativeWith: [] }, "OperatorNode:mod": { associativity: "left", associativeWith: [] } }, { "OperatorNode:unaryPlus": { associativity: "right" }, "OperatorNode:unaryMinus": { associativity: "right" }, "OperatorNode:bitNot": { associativity: "right" }, "OperatorNode:not": { associativity: "right" } }, { "OperatorNode:pow": { associativity: "right", associativeWith: [], latexRightParens: !1 }, "OperatorNode:dotPow": { associativity: "right", associativeWith: [] } }, { "OperatorNode:factorial": { associativity: "left" } }, { "OperatorNode:transpose": { associativity: "left" } }];e.exports.properties = a, e.exports.getPrecedence = r, e.exports.getAssociativity = n, e.exports.isAssociativeWith = i;
  }, function (e, t, r) {
    "use strict";
    function n(e, t, n, i) {
      function a(e) {
        if (!(this instanceof a)) throw new SyntaxError("Constructor must be called with the new operator");if (!Array.isArray(e)) throw new Error("Array expected");this.blocks = e.map(function (e) {
          var t = e && e.node,
              r = e && void 0 !== e.visible ? e.visible : !0;if (!t || !t.isNode) throw new TypeError('Property "node" must be a Node');if ("boolean" != typeof r) throw new TypeError('Property "visible" must be a boolean');return { node: t, visible: r };
        });
      }var o = n(r(284)),
          s = n(r(72));return a.prototype = new o(), a.prototype.type = "BlockNode", a.prototype.isBlockNode = !0, a.prototype._compile = function (e, t) {
        e.ResultSet = s;var r = this.blocks.map(function (r) {
          var n = r.node._compile(e, t);return r.visible ? "results.push(" + n + ");" : n + ";";
        });return "(function () {var results = [];" + r.join("") + "return new ResultSet(results);})()";
      }, a.prototype.forEach = function (e) {
        for (var t = 0; t < this.blocks.length; t++) {
          e(this.blocks[t].node, "blocks[" + t + "].node", this);
        }
      }, a.prototype.map = function (e) {
        for (var t = [], r = 0; r < this.blocks.length; r++) {
          var n = this.blocks[r],
              i = this._ifNode(e(n.node, "blocks[" + r + "].node", this));t[r] = { node: i, visible: n.visible };
        }return new a(t);
      }, a.prototype.clone = function () {
        var e = this.blocks.map(function (e) {
          return { node: e.node, visible: e.visible };
        });return new a(e);
      }, a.prototype._toString = function (e) {
        return this.blocks.map(function (t) {
          return t.node.toString(e) + (t.visible ? "" : ";");
        }).join("\n");
      }, a.prototype._toTex = function (e) {
        return this.blocks.map(function (t) {
          return t.node.toTex(e) + (t.visible ? "" : ";");
        }).join("\\;\\;\n");
      }, a;
    }t.name = "BlockNode", t.path = "expression.node", t.factory = n;
  }, function (e, t, r) {
    "use strict";
    function n(e, t, n, a) {
      function o(e, t, r) {
        if (!(this instanceof o)) throw new SyntaxError("Constructor must be called with the new operator");if (!e || !e.isNode) throw new TypeError("Parameter condition must be a Node");if (!t || !t.isNode) throw new TypeError("Parameter trueExpr must be a Node");if (!r || !r.isNode) throw new TypeError("Parameter falseExpr must be a Node");this.condition = e, this.trueExpr = t, this.falseExpr = r;
      }var s = n(r(284));return o.prototype = new s(), o.prototype.type = "ConditionalNode", o.prototype.isConditionalNode = !0, o.prototype._compile = function (e, t) {
        return e.testCondition = function (t) {
          if ("number" == typeof t || "boolean" == typeof t || "string" == typeof t) return !!t;if (t) {
            if (t.isBigNumber === !0) return !t.isZero();if (t.isComplex === !0) return !(!t.re && !t.im);if (t.isUnit === !0) return !!t.value;
          }if (null === t || void 0 === t) return !1;throw new TypeError('Unsupported type of condition "' + e.math["typeof"](t) + '"');
        }, "testCondition(" + this.condition._compile(e, t) + ") ? ( " + this.trueExpr._compile(e, t) + ") : ( " + this.falseExpr._compile(e, t) + ")";
      }, o.prototype.forEach = function (e) {
        e(this.condition, "condition", this), e(this.trueExpr, "trueExpr", this), e(this.falseExpr, "falseExpr", this);
      }, o.prototype.map = function (e) {
        return new o(this._ifNode(e(this.condition, "condition", this)), this._ifNode(e(this.trueExpr, "trueExpr", this)), this._ifNode(e(this.falseExpr, "falseExpr", this)));
      }, o.prototype.clone = function () {
        return new o(this.condition, this.trueExpr, this.falseExpr);
      }, o.prototype._toString = function (e) {
        var t = e && e.parenthesis ? e.parenthesis : "keep",
            r = i.getPrecedence(this, t),
            n = this.condition.toString(e),
            a = i.getPrecedence(this.condition, t);("all" === t || "OperatorNode" === this.condition.type || null !== a && r >= a) && (n = "(" + n + ")");var o = this.trueExpr.toString(e),
            s = i.getPrecedence(this.trueExpr, t);("all" === t || "OperatorNode" === this.trueExpr.type || null !== s && r >= s) && (o = "(" + o + ")");var u = this.falseExpr.toString(e),
            c = i.getPrecedence(this.falseExpr, t);return ("all" === t || "OperatorNode" === this.falseExpr.type || null !== c && r >= c) && (u = "(" + u + ")"), n + " ? " + o + " : " + u;
      }, o.prototype._toTex = function (e) {
        return "\\begin{cases} {" + this.trueExpr.toTex(e) + "}, &\\quad{\\text{if }\\;" + this.condition.toTex(e) + "}\\\\{" + this.falseExpr.toTex(e) + "}, &\\quad{\\text{otherwise}}\\end{cases}";
      }, o;
    }var i = (r(32), r(292));t.name = "ConditionalNode", t.path = "expression.node", t.factory = n;
  }, function (e, t, r) {
    "use strict";
    function n(e, t, n, a) {
      function o(e, t) {
        if (!(this instanceof o)) throw new SyntaxError("Constructor must be called with the new operator");if (t) {
          if ("string" != typeof t) throw new TypeError('String expected for parameter "valueType"');if ("string" != typeof e) throw new TypeError('String expected for parameter "value"');this.value = e, this.valueType = t;
        } else this.value = e + "", this.valueType = i(e);if (!u[this.valueType]) throw new TypeError('Unsupported type of value "' + this.valueType + '"');
      }var s = n(r(284)),
          u = { number: !0, string: !0, "boolean": !0, undefined: !0, "null": !0 };return o.prototype = new s(), o.prototype.type = "ConstantNode", o.prototype.isConstantNode = !0, o.prototype._compile = function (e, t) {
        switch (this.valueType) {case "number":
            var r = e.math.config().number;return "BigNumber" === r ? 'math.bignumber("' + this.value + '")' : "Fraction" === r ? 'math.fraction("' + this.value + '")' : this.value.replace(/^(0*)[0-9]/, function (e, t) {
              return e.substring(t.length);
            });case "string":
            return '"' + this.value + '"';case "boolean":
            return this.value;case "undefined":
            return this.value;case "null":
            return this.value;default:
            throw new TypeError('Unsupported type of constant "' + this.valueType + '"');}
      }, o.prototype.forEach = function (e) {}, o.prototype.map = function (e) {
        return this.clone();
      }, o.prototype.clone = function () {
        return new o(this.value, this.valueType);
      }, o.prototype._toString = function (e) {
        switch (this.valueType) {case "string":
            return '"' + this.value + '"';default:
            return this.value;}
      }, o.prototype._toTex = function (e) {
        var t,
            r = this.value;switch (this.valueType) {case "string":
            return '\\mathtt{"' + r + '"}';case "number":
            return t = r.toLowerCase().indexOf("e"), -1 !== t ? r.substring(0, t) + "\\cdot10^{" + r.substring(t + 1) + "}" : r;default:
            return r;}
      }, o;
    }var i = r(41).type;t.name = "ConstantNode", t.path = "expression.node", t.factory = n;
  }, function (e, t, r) {
    "use strict";
    function n(e, t, n, s) {
      function u(e, t, r) {
        if (!(this instanceof u)) throw new SyntaxError("Constructor must be called with the new operator");if ("string" != typeof e) throw new TypeError('String expected for parameter "name"');if (!Array.isArray(t)) throw new TypeError('Array containing strings or objects expected for parameter "params"');if (!r || !r.isNode) throw new TypeError('Node expected for parameter "expr"');if (e in i) throw new Error('Illegal function name, "' + e + '" is a reserved keyword');this.name = e, this.params = t.map(function (e) {
          return e && e.name || e;
        }), this.types = t.map(function (e) {
          return e && e.type || "any";
        }), this.expr = r;
      }function c(e, t) {
        var r = o.getPrecedence(e, t),
            n = o.getPrecedence(e.expr, t);return "all" === t || null !== n && r >= n;
      }var f = n(r(284));return u.prototype = new f(), u.prototype.type = "FunctionAssignmentNode", u.prototype.isFunctionAssignmentNode = !0, u.prototype._compile = function (e, t) {
        e.typed = s;var r = Object.create(t);this.params.forEach(function (e) {
          r[e] = !0;
        });var n = this.expr._compile(e, r);return 'scope["' + this.name + '"] =   (function () {    var fn = typed("' + this.name + '", {      "' + this.types.join(",") + '": function (' + this.params.join(",") + ") {        return " + n + '      }    });    fn.syntax = "' + this.name + "(" + this.params.join(", ") + ')";    return fn;  })()';
      }, u.prototype.forEach = function (e) {
        e(this.expr, "expr", this);
      }, u.prototype.map = function (e) {
        var t = this._ifNode(e(this.expr, "expr", this));return new u(this.name, this.params.slice(0), t);
      }, u.prototype.clone = function () {
        return new u(this.name, this.params.slice(0), this.expr);
      }, u.prototype._toString = function (e) {
        var t = e && e.parenthesis ? e.parenthesis : "keep",
            r = this.expr.toString(e);return c(this, t) && (r = "(" + r + ")"), "function " + this.name + "(" + this.params.join(", ") + ") = " + r;
      }, u.prototype._toTex = function (e) {
        var t = e && e.parenthesis ? e.parenthesis : "keep",
            r = this.expr.toTex(e);return c(this, t) && (r = "\\left(" + r + "\\right)"), "\\mathrm{" + this.name + "}\\left(" + this.params.map(a.toSymbol).join(",") + "\\right):=" + r;
      }, u;
    }var i = r(285),
        a = r(32),
        o = r(292);t.name = "FunctionAssignmentNode", t.path = "expression.node", t.factory = n;
  }, function (e, t, r) {
    "use strict";
    function n(e, t, n, i) {
      function a(e, t) {
        if (!(this instanceof a)) throw new SyntaxError("Constructor must be called with the new operator");if (this.dimensions = e, this.dotNotation = t || !1, !u(e) || !e.every(function (e) {
          return e && e.isNode;
        })) throw new TypeError('Array containing Nodes expected for parameter "dimensions"');if (this.dotNotation && !this.isObjectProperty()) throw new Error("dotNotation only applicable for object properties");var r = function r() {
          throw new Error("Property `IndexNode.object` is deprecated, use `IndexNode.fn` instead");
        };Object.defineProperty(this, "object", { get: r, set: r });
      }var o = n(r(284)),
          s = (n(r(298)), n(r(299)), n(r(67))),
          u = Array.isArray;return a.prototype = new o(), a.prototype.type = "IndexNode", a.prototype.isIndexNode = !0, a.prototype._compile = function (e, t) {
        var r = Object.create(t);e.range = function (e, t, r) {
          return new s(e && e.isBigNumber === !0 ? e.toNumber() : e, t && t.isBigNumber === !0 ? t.toNumber() : t, r && r.isBigNumber === !0 ? r.toNumber() : r);
        };var n = this.dimensions.map(function (t, n) {
          return t && t.isRangeNode ? t.needsEnd() ? (r.end = !0, "(function () {var end = size[" + n + "]; return range(" + t.start._compile(e, r) + ", " + t.end._compile(e, r) + ", " + (t.step ? t.step._compile(e, r) : "1") + "); })()") : "range(" + t.start._compile(e, r) + ", " + t.end._compile(e, r) + ", " + (t.step ? t.step._compile(e, r) : "1") + ")" : t.isSymbolNode && "end" === t.name ? (r.end = !0, "(function () {var end = size[" + n + "]; return " + t._compile(e, r) + "; })()") : t._compile(e, r);
        });return "math.index(" + n.join(", ") + ")";
      }, a.prototype.forEach = function (e) {
        for (var t = 0; t < this.dimensions.length; t++) {
          e(this.dimensions[t], "dimensions[" + t + "]", this);
        }
      }, a.prototype.map = function (e) {
        for (var t = [], r = 0; r < this.dimensions.length; r++) {
          t[r] = this._ifNode(e(this.dimensions[r], "dimensions[" + r + "]", this));
        }return new a(t);
      }, a.prototype.clone = function () {
        return new a(this.dimensions.slice(0));
      }, a.prototype.isObjectProperty = function () {
        return 1 === this.dimensions.length && this.dimensions[0].isConstantNode && "string" === this.dimensions[0].valueType;
      }, a.prototype.getObjectProperty = function () {
        return this.isObjectProperty() ? this.dimensions[0].value : null;
      }, a.prototype._toString = function (e) {
        return this.dotNotation ? "." + this.getObjectProperty() : "[" + this.dimensions.join(", ") + "]";
      }, a.prototype._toTex = function (e) {
        var t = this.dimensions.map(function (t) {
          return t.toTex(e);
        });return this.dotNotation ? "." + this.getObjectProperty() : "_{" + t.join(",") + "}";
      }, a.prototype.needsSize = function () {
        return this.dimensions.some(function (e) {
          return e.isRangeNode && e.needsEnd() || e.isSymbolNode && "end" === e.name;
        });
      }, a;
    }t.name = "IndexNode", t.path = "expression.node", t.factory = n;
  }, function (e, t, r) {
    "use strict";
    function n(e, t, n, a) {
      function o(e, t, r) {
        if (!(this instanceof o)) throw new SyntaxError("Constructor must be called with the new operator");if (!e || !e.isNode) throw new TypeError("Node expected");if (!t || !t.isNode) throw new TypeError("Node expected");if (r && (!r || !r.isNode)) throw new TypeError("Node expected");if (arguments.length > 3) throw new Error("Too many arguments");this.start = e, this.end = t, this.step = r || null;
      }function s(e, t) {
        var r = i.getPrecedence(e, t),
            n = {},
            a = i.getPrecedence(e.start, t);if (n.start = null !== a && r >= a || "all" === t, e.step) {
          var o = i.getPrecedence(e.step, t);n.step = null !== o && r >= o || "all" === t;
        }var s = i.getPrecedence(e.end, t);return n.end = null !== s && r >= s || "all" === t, n;
      }var u = n(r(284));return o.prototype = new u(), o.prototype.type = "RangeNode", o.prototype.isRangeNode = !0, o.prototype.needsEnd = function () {
        var e = this.filter(function (e) {
          return e && e.isSymbolNode && "end" == e.name;
        });return e.length > 0;
      }, o.prototype._compile = function (e, t) {
        return "math.range(" + this.start._compile(e, t) + ", " + this.end._compile(e, t) + (this.step ? ", " + this.step._compile(e, t) : "") + ")";
      }, o.prototype.forEach = function (e) {
        e(this.start, "start", this), e(this.end, "end", this), this.step && e(this.step, "step", this);
      }, o.prototype.map = function (e) {
        return new o(this._ifNode(e(this.start, "start", this)), this._ifNode(e(this.end, "end", this)), this.step && this._ifNode(e(this.step, "step", this)));
      }, o.prototype.clone = function () {
        return new o(this.start, this.end, this.step && this.step);
      }, o.prototype._toString = function (e) {
        var t,
            r = e && e.parenthesis ? e.parenthesis : "keep",
            n = s(this, r),
            i = this.start.toString(e);if (n.start && (i = "(" + i + ")"), t = i, this.step) {
          var a = this.step.toString(e);n.step && (a = "(" + a + ")"), t += ":" + a;
        }var o = this.end.toString(e);return n.end && (o = "(" + o + ")"), t += ":" + o;
      }, o.prototype._toTex = function (e) {
        var t = e && e.parenthesis ? e.parenthesis : "keep",
            r = s(this, t),
            n = this.start.toTex(e);if (r.start && (n = "\\left(" + n + "\\right)"), this.step) {
          var i = this.step.toTex(e);r.step && (i = "\\left(" + i + "\\right)"), n += ":" + i;
        }var a = this.end.toTex(e);return r.end && (a = "\\left(" + a + "\\right)"), n += ":" + a;
      }, o;
    }var i = r(292);t.name = "RangeNode", t.path = "expression.node", t.factory = n;
  }, function (e, t, r) {
    "use strict";
    function n(e, t, n, a, o) {
      function s(e) {
        if (!(this instanceof s)) throw new SyntaxError("Constructor must be called with the new operator");if ("string" != typeof e) throw new TypeError('String expected for parameter "name"');this.name = e;
      }function u(e) {
        throw new Error("Undefined symbol " + e);
      }var c = n(r(284)),
          f = n(r(75));return s.prototype = new c(), s.prototype.type = "SymbolNode", s.prototype.isSymbolNode = !0, s.prototype._compile = function (e, t) {
        return e.undef = u, e.Unit = f, t[this.name] ? this.name : this.name in e.math ? '("' + this.name + '" in scope ? scope["' + this.name + '"] : math["' + this.name + '"])' : '("' + this.name + '" in scope ? scope["' + this.name + '"] : ' + (f.isValuelessUnit(this.name) ? 'new Unit(null, "' + this.name + '")' : 'undef("' + this.name + '")') + ")";
      }, s.prototype.forEach = function (e) {}, s.prototype.map = function (e) {
        return this.clone();
      }, s.prototype.clone = function () {
        return new s(this.name);
      }, s.prototype._toString = function (e) {
        return this.name;
      }, s.prototype._toTex = function (e) {
        var t = !1;"undefined" == typeof o[this.name] && f.isValuelessUnit(this.name) && (t = !0);var r = i.toSymbol(this.name, t);return "\\" === r[0] ? r : " " + r;
      }, s;
    }var i = r(32);t.name = "SymbolNode", t.path = "expression.node", t.math = !0, t.factory = n;
  }, function (e, t, r) {
    "use strict";
    function n(e, t, n, i) {
      function a(e) {
        if (!(this instanceof a)) throw new SyntaxError("Constructor must be called with the new operator");if (this.properties = e || {}, e && ("object" != (typeof e === "undefined" ? "undefined" : _typeof(e)) || Object.keys(e).some(function (t) {
          return !e[t] || !e[t].isNode;
        }))) throw new TypeError("Object containing Nodes expected");
      }var o = n(r(284));return a.prototype = new o(), a.prototype.type = "ObjectNode", a.prototype.isObjectNode = !0, a.prototype._compile = function (e, t) {
        var r = [];for (var n in this.properties) {
          this.properties.hasOwnProperty(n) && r.push('"' + n + '": ' + this.properties[n]._compile(e, t));
        }return "{" + r.join(", ") + "}";
      }, a.prototype.forEach = function (e) {
        for (var t in this.properties) {
          this.properties.hasOwnProperty(t) && e(this.properties[t], 'properties["' + t + '"]', this);
        }
      }, a.prototype.map = function (e) {
        var t = {};for (var r in this.properties) {
          this.properties.hasOwnProperty(r) && (t[r] = this._ifNode(e(this.properties[r], 'properties["' + r + '"]', this)));
        }return new a(t);
      }, a.prototype.clone = function () {
        var e = {};for (var t in this.properties) {
          this.properties.hasOwnProperty(t) && (e[t] = this.properties[t]);
        }return new a(e);
      }, a.prototype._toString = function (e) {
        var t = [];for (var r in this.properties) {
          this.properties.hasOwnProperty(r) && t.push('"' + r + '": ' + this.properties[r].toString(e));
        }return "{" + t.join(", ") + "}";
      }, a.prototype._toTex = function (e) {
        var t = [];for (var r in this.properties) {
          this.properties.hasOwnProperty(r) && t.push("\\mathbf{" + r + ":} & " + this.properties[r].toTex(e) + "\\\\");
        }return "\\left\\{\\begin{array}{ll}" + t.join("\n") + "\\end{array}\\right\\}";
      }, a;
    }r(23);t.name = "ObjectNode", t.path = "expression.node", t.factory = n;
  }, function (e, t, r) {
    "use strict";
    function n(e, t, n, o, s) {
      function u(e, t, r, n) {
        if (!(this instanceof u)) throw new SyntaxError("Constructor must be called with the new operator");if ("string" != typeof e) throw new TypeError('string expected for parameter "op"');if ("string" != typeof t) throw new TypeError('string expected for parameter "fn"');if (!Array.isArray(r) || !r.every(function (e) {
          return e && e.isNode;
        })) throw new TypeError('Array containing Nodes expected for parameter "args"');this.implicit = n === !0, this.op = e, this.fn = t, this.args = r || [];
      }function c(e, t, r, n) {
        var i = a.getPrecedence(e, t),
            o = a.getAssociativity(e, t);if ("all" === t || r.length > 2 && "OperatorNode:add" !== e.getIdentifier() && "OperatorNode:multiply" !== e.getIdentifier()) {
          var s = r.map(function (e) {
            switch (e.getContent().type) {case "ArrayNode":case "ConstantNode":case "SymbolNode":case "ParenthesisNode":
                return !1;default:
                return !0;}
          });return s;
        }if (0 === r.length) return [];if (1 === r.length) {
          var u = a.getPrecedence(r[0], t);if (n && null !== u) {
            var c, f;if ("keep" === t ? (c = r[0].getIdentifier(), f = e.getIdentifier()) : (c = r[0].getContent().getIdentifier(), f = e.getContent().getIdentifier()), a.properties[i][f].latexLeftParens === !1) return [!1];if (a.properties[u][c].latexParens === !1) return [!1];
          }return null === u ? [!1] : i >= u ? [!0] : [!1];
        }if (2 === r.length) {
          var l,
              p = a.getPrecedence(r[0], t),
              h = a.isAssociativeWith(e, r[0], t);l = null === p ? !1 : p !== i || "right" !== o || h ? i > p : !0;var m,
              d = a.getPrecedence(r[1], t),
              g = a.isAssociativeWith(e, r[1], t);if (m = null === d ? !1 : d !== i || "left" !== o || g ? i > d : !0, n) {
            var f, v, y;"keep" === t ? (f = e.getIdentifier(), v = e.args[0].getIdentifier(), y = e.args[1].getIdentifier()) : (f = e.getContent().getIdentifier(), v = e.args[0].getContent().getIdentifier(), y = e.args[1].getContent().getIdentifier()), null !== p && (a.properties[i][f].latexLeftParens === !1 && (l = !1), a.properties[p][v].latexParens === !1 && (l = !1)), null !== d && (a.properties[i][f].latexRightParens === !1 && (m = !1), a.properties[d][y].latexParens === !1 && (m = !1));
          }return [l, m];
        }if (r.length > 2 && ("OperatorNode:add" === e.getIdentifier() || "OperatorNode:multiply" === e.getIdentifier())) {
          var x = r.map(function (r) {
            var n = a.getPrecedence(r, t),
                s = a.isAssociativeWith(e, r, t),
                u = a.getAssociativity(r, t);return null === n ? !1 : i !== n || o !== u || s ? i > n : !0;
          });return x;
        }
      }var f = n(r(284));n(r(295)), n(r(299)), n(r(302));return u.prototype = new f(), u.prototype.type = "OperatorNode", u.prototype.isOperatorNode = !0, u.prototype._compile = function (e, t) {
        if (!e.math[this.fn]) throw new Error("Function " + this.fn + ' missing in provided namespace "math"');var r = this.args.map(function (r) {
          return r._compile(e, t);
        });return "math." + this.fn + "(" + r.join(", ") + ")";
      }, u.prototype.forEach = function (e) {
        for (var t = 0; t < this.args.length; t++) {
          e(this.args[t], "args[" + t + "]", this);
        }
      }, u.prototype.map = function (e) {
        for (var t = [], r = 0; r < this.args.length; r++) {
          t[r] = this._ifNode(e(this.args[r], "args[" + r + "]", this));
        }return new u(this.op, this.fn, t);
      }, u.prototype.clone = function () {
        return new u(this.op, this.fn, this.args.slice(0), this.implicit);
      }, u.prototype._toString = function (e) {
        var t = e && e.parenthesis ? e.parenthesis : "keep",
            r = e && e.implicit ? e.implicit : "hide",
            n = this.args,
            i = c(this, t, n, !1);if (1 === n.length) {
          var o = a.getAssociativity(this, t),
              s = n[0].toString(e);return i[0] && (s = "(" + s + ")"), "right" === o ? this.op + s : "left" === o ? s + this.op : s + this.op;
        }if (2 == n.length) {
          var u = n[0].toString(e),
              f = n[1].toString(e);return i[0] && (u = "(" + u + ")"), i[1] && (f = "(" + f + ")"), this.implicit && "OperatorNode:multiply" === this.getIdentifier() && "hide" == r ? u + " " + f : u + " " + this.op + " " + f;
        }if (n.length > 2 && ("OperatorNode:add" === this.getIdentifier() || "OperatorNode:multiply" === this.getIdentifier())) {
          var l = n.map(function (t, r) {
            return t = t.toString(e), i[r] && (t = "(" + t + ")"), t;
          });return this.implicit && "OperatorNode:multiply" === this.getIdentifier() && "hide" === r ? l.join(" ") : l.join(" " + this.op + " ");
        }return this.fn + "(" + this.args.join(", ") + ")";
      }, u.prototype._toTex = function (e) {
        var t = e && e.parenthesis ? e.parenthesis : "keep",
            r = e && e.implicit ? e.implicit : "hide",
            n = this.args,
            o = c(this, t, n, !0),
            s = i.operators[this.fn];if (s = "undefined" == typeof s ? this.op : s, 1 === n.length) {
          var u = a.getAssociativity(this, t),
              f = n[0].toTex(e);return o[0] && (f = "\\left(" + f + "\\right)"), "right" === u ? s + f : "left" === u ? f + s : f + s;
        }if (2 === n.length) {
          var l = n[0],
              p = l.toTex(e);o[0] && (p = "\\left(" + p + "\\right)");var h = n[1],
              m = h.toTex(e);o[1] && (m = "\\left(" + m + "\\right)");var d;switch (d = "keep" === t ? l.getIdentifier() : l.getContent().getIdentifier(), this.getIdentifier()) {case "OperatorNode:divide":
              return s + "{" + p + "}{" + m + "}";case "OperatorNode:pow":
              switch (p = "{" + p + "}", m = "{" + m + "}", d) {case "ConditionalNode":case "OperatorNode:divide":
                  p = "\\left(" + p + "\\right)";}case "OperatorNode:multiply":
              if (this.implicit && "hide" === r) return p + "~" + m;}return p + s + m;
        }if (n.length > 2 && ("OperatorNode:add" === this.getIdentifier() || "OperatorNode:multiply" === this.getIdentifier())) {
          var g = n.map(function (t, r) {
            return t = t.toTex(e), o[r] && (t = "\\left(" + t + "\\right)"), t;
          });return "OperatorNode:multiply" === this.getIdentifier() && this.implicit ? g.join("~") : g.join(s);
        }return "\\mathrm{" + this.fn + "}\\left(" + n.map(function (t) {
          return t.toTex(e);
        }).join(",") + "\\right)";
      }, u.prototype.getIdentifier = function () {
        return this.type + ":" + this.fn;
      }, u;
    }var i = r(32),
        a = r(292);t.name = "OperatorNode", t.path = "expression.node", t.math = !0, t.factory = n;
  }, function (e, t, r) {
    "use strict";
    function n(e, t, n, a, o) {
      function s(e, t) {
        if (!(this instanceof s)) throw new SyntaxError("Constructor must be called with the new operator");if ("string" == typeof e && (console.warn("WARNING: passing a string to FunctionNode is deprecated, pass a SymbolNode instead."), e = new f(e)), !e || !e.isNode) throw new TypeError('Node expected as parameter "fn"');if (!Array.isArray(t) || !t.every(function (e) {
          return e && e.isNode;
        })) throw new TypeError('Array containing Nodes expected for parameter "args"');this.fn = e, this.args = t || [], Object.defineProperty(this, "name", { get: function () {
            return this.fn.name || "";
          }.bind(this), set: function set() {
            throw new Error("Cannot assign a new name, name is read-only");
          } });var r = function r() {
          throw new Error("Property `FunctionNode.object` is deprecated, use `FunctionNode.fn` instead");
        };Object.defineProperty(this, "object", { get: r, set: r });
      }function u(e, t, r) {
        for (var n, i = "", a = new RegExp("\\$(?:\\{([a-z_][a-z_0-9]*)(?:\\[([0-9]+)\\])?\\}|\\$)", "ig"), o = 0; null !== (n = a.exec(e));) {
          if (i += e.substring(o, n.index), o = n.index, "$$" === n[0]) i += "$", o++;else {
            o += n[0].length;var s = t[n[1]];if (!s) throw new ReferenceError("Template: Property " + n[1] + " does not exist.");if (void 0 === n[2]) switch (typeof s === "undefined" ? "undefined" : _typeof(s)) {case "string":
                i += s;break;case "object":
                if (s.isNode) i += s.toTex(r);else {
                  if (!Array.isArray(s)) throw new TypeError("Template: " + n[1] + " has to be a Node, String or array of Nodes");i += s.map(function (e, t) {
                    if (e && e.isNode) return e.toTex(r);throw new TypeError("Template: " + n[1] + "[" + t + "] is not a Node.");
                  }).join(",");
                }break;default:
                throw new TypeError("Template: " + n[1] + " has to be a Node, String or array of Nodes");} else {
              if (!s[n[2]] || !s[n[2]].isNode) throw new TypeError("Template: " + n[1] + "[" + n[2] + "] is not a Node.");i += s[n[2]].toTex(r);
            }
          }
        }return i += e.slice(o);
      }var c = n(r(284)),
          f = n(r(299));s.prototype = new c(), s.prototype.type = "FunctionNode", s.prototype.isFunctionNode = !0, s.prototype._compile = function (e, t) {
        var r,
            n = this.fn._compile(e, t),
            i = this.args.map(function (r) {
          return r._compile(e, t);
        });if (this.fn.isSymbolNode) {
          var a = this.fn.name,
              o = e.math[a],
              s = "function" == typeof o && 1 == o.rawArgs;return s ? (r = this._getUniqueArgumentsName(e), e[r] = this.args, n + "(" + r + ", math, scope)") : n + "(" + i.join(", ") + ")";
        }if (this.fn.isAccessorNode && this.fn.index.isObjectProperty()) {
          r = this._getUniqueArgumentsName(e), e[r] = this.args;var u = this.fn.object._compile(e, t),
              c = this.fn.index.getObjectProperty();return "(function () {var object = " + u + ';return (object["' + c + '"] && object["' + c + '"].rawArgs)  ? object["' + c + '"](' + r + ', math, scope) : object["' + c + '"](' + i.join(", ") + ")})()";
        }return r = this._getUniqueArgumentsName(e), e[r] = this.args, "(function () {var fn = " + n + ";return (fn && fn.rawArgs)  ? fn(" + r + ", math, scope) : fn(" + i.join(", ") + ")})()";
      }, s.prototype._getUniqueArgumentsName = function (e) {
        var t,
            r = 0;do {
          t = "args" + r, r++;
        } while (t in e);return t;
      }, s.prototype.forEach = function (e) {
        for (var t = 0; t < this.args.length; t++) {
          e(this.args[t], "args[" + t + "]", this);
        }
      }, s.prototype.map = function (e) {
        for (var t = this.fn.map(e), r = [], n = 0; n < this.args.length; n++) {
          r[n] = this._ifNode(e(this.args[n], "args[" + n + "]", this));
        }return new s(t, r);
      }, s.prototype.clone = function () {
        return new s(this.fn, this.args.slice(0));
      };var l = s.prototype.toString;s.prototype.toString = function (e) {
        var t,
            r = this.fn.toString(e);return e && "object" == _typeof(e.handler) && e.handler.hasOwnProperty(r) && (t = e.handler[r](this, e)), "undefined" != typeof t ? t : l.call(this, e);
      }, s.prototype._toString = function (e) {
        var t = this.args.map(function (t) {
          return t.toString(e);
        });return this.fn.toString(e) + "(" + t.join(", ") + ")";
      };var p = s.prototype.toTex;return s.prototype.toTex = function (e) {
        var t;return e && "object" == _typeof(e.handler) && e.handler.hasOwnProperty(this.name) && (t = e.handler[this.name](this, e)), "undefined" != typeof t ? t : p.call(this, e);
      }, s.prototype._toTex = function (e) {
        var t,
            r = this.args.map(function (t) {
          return t.toTex(e);
        });!o[this.name] || "function" != typeof o[this.name].toTex && "object" != _typeof(o[this.name].toTex) && "string" != typeof o[this.name].toTex || (t = o[this.name].toTex);var n;switch (typeof t === "undefined" ? "undefined" : _typeof(t)) {case "function":
            n = t(this, e);break;case "string":
            n = u(t, this, e);break;case "object":
            switch (_typeof(t[r.length])) {case "function":
                n = t[r.length](this, e);break;case "string":
                n = u(t[r.length], this, e);}}return "undefined" != typeof n ? n : u(i.defaultTemplate, this, e);
      }, s.prototype.getIdentifier = function () {
        return this.type + ":" + this.name;
      }, s;
    }var i = r(32);t.name = "FunctionNode", t.path = "expression.node", t.math = !0, t.factory = n;
  }, function (e, t, r) {
    "use strict";
    function n(e, t, n, i) {
      function a(e) {
        if (!(this instanceof a)) throw new SyntaxError("Constructor must be called with the new operator");if (!e || !e.isNode) throw new TypeError('Node expected for parameter "content"');this.content = e;
      }var o = n(r(284));return a.prototype = new o(), a.prototype.type = "ParenthesisNode", a.prototype.isParenthesisNode = !0, a.prototype._compile = function (e, t) {
        return this.content._compile(e, t);
      }, a.prototype.getContent = function () {
        return this.content.getContent();
      }, a.prototype.forEach = function (e) {
        e(this.content, "content", this);
      }, a.prototype.map = function (e) {
        var t = e(this.content, "content", this);return new a(t);
      }, a.prototype.clone = function () {
        return new a(this.content);
      }, a.prototype._toString = function (e) {
        return !e || e && !e.parenthesis || e && "keep" === e.parenthesis ? "(" + this.content.toString(e) + ")" : this.content.toString(e);
      }, a.prototype._toTex = function (e) {
        return !e || e && !e.parenthesis || e && "keep" === e.parenthesis ? "\\left(" + this.content.toTex(e) + "\\right)" : this.content.toTex(e);
      }, a;
    }t.name = "ParenthesisNode", t.path = "expression.node", t.factory = n;
  }, function (e, t, r) {
    "use strict";
    function n(e, t, n, a) {
      var o = n(r(282));return a("compile", { string: function string(e) {
          var t = {};return o(e).compile().eval(t);
        }, "string, Object": function stringObject(e, t) {
          return o(e).compile().eval(t);
        }, "Array | Matrix": function ArrayMatrix(e) {
          var t = {};return i(e, function (e) {
            return o(e).compile().eval(t);
          });
        }, "Array | Matrix, Object": function ArrayMatrixObject(e, t) {
          return i(e, function (e) {
            return o(e).compile().eval(t);
          });
        } });
    }var i = r(19);t.name = "eval", t.factory = n;
  }, function (e, t, r) {
    "use strict";
    function n(e, t, n, i, a) {
      var o = n(r(103));return i("help", { any: function any(t) {
          var r,
              n = t;if ("string" != typeof t) for (r in a) {
            if (a.hasOwnProperty(r) && t === a[r]) {
              n = r;break;
            }
          }var i = o[n];if (!i) throw new Error('No documentation found on "' + n + '"');return new e.Help(i);
        } });
    }t.math = !0, t.name = "help", t.factory = n;
  }, function (e, t, r) {
    "use strict";
    function n(e, t, n, i) {
      var a = n(r(282));return i("parse", { "string | Array | Matrix": a, "string | Array | Matrix, Object": a });
    }t.name = "parse", t.factory = n;
  }, function (e, t, r) {
    "use strict";
    function n(e, t, n, i, a) {
      var o = n(r(308));return i("parser", { "": function _() {
          return new o(a);
        } });
    }t.name = "parser", t.factory = n, t.math = !0;
  }, function (e, t, r) {
    "use strict";
    function n(e, t, n, a, o) {
      function s() {
        if (!(this instanceof s)) throw new SyntaxError("Constructor must be called with the new operator");this.scope = {};
      }var u = n(r(282));return s.prototype.type = "Parser", s.prototype.isParser = !0, s.prototype.parse = function (e) {
        throw new Error("Parser.parse is deprecated. Use math.parse instead.");
      }, s.prototype.compile = function (e) {
        throw new Error("Parser.compile is deprecated. Use math.compile instead.");
      }, s.prototype.eval = function (e) {
        return u(e).compile().eval(this.scope);
      }, s.prototype.get = function (e) {
        return this.scope[e];
      }, s.prototype.getAll = function () {
        return i({}, this.scope);
      }, s.prototype.set = function (e, t) {
        return this.scope[e] = t;
      }, s.prototype.remove = function (e) {
        delete this.scope[e];
      }, s.prototype.clear = function () {
        for (var e in this.scope) {
          this.scope.hasOwnProperty(e) && delete this.scope[e];
        }
      }, s;
    }var i = r(3).extend;t.name = "Parser", t.path = "expression", t.factory = n, t.math = !0;
  }, function (e, t, r) {
    e.exports = [r(283), r(289), r(290), r(293), r(294), r(295), r(297), r(296), r(302), r(284), r(300), r(301), r(303), r(298), r(299), r(310)];
  }, function (e, t) {
    "use strict";
    function r(e, t, r, n) {
      function i() {
        throw new Error("UpdateNode is deprecated. Use AssignmentNode instead.");
      }return i;
    }t.name = "UpdateNode", t.path = "expression.node", t.factory = r;
  }, function (e, t, r) {
    e.exports = [r(312), r(314), r(316), r(318), r(319), r(321), r(327), r(332), r(334), r(336)];
  }, function (e, t, r) {
    "use strict";
    function n(e, t, n, a) {
      var o = n(r(313));return a("concat", { "...any": function any(e) {
          var t = e.length - 1,
              r = e[t];"number" == typeof r ? e[t] = r - 1 : r && r.isBigNumber === !0 && (e[t] = r.minus(1));try {
            return o.apply(null, e);
          } catch (n) {
            throw i(n);
          }
        } });
    }var i = r(287).transform;t.name = "concat", t.path = "expression.transform", t.factory = n;
  }, function (e, t, r) {
    "use strict";
    function n(e, t, n, f) {
      var l = n(r(52)),
          p = f("concat", { "...Array | Matrix | number | BigNumber": function ArrayMatrixNumberBigNumber(e) {
          var t,
              r,
              n = e.length,
              f = -1,
              p = !1,
              h = [];for (t = 0; n > t; t++) {
            var m = e[t];if (m && m.isMatrix === !0 && (p = !0), "number" == typeof m || m && m.isBigNumber === !0) {
              if (t !== n - 1) throw new Error("Dimension must be specified as last argument");if (r = f, f = m.valueOf(), !o(f)) throw new TypeError("Integer number expected for dimension");if (0 > f || t > 0 && f > r) throw new u(f, r + 1);
            } else {
              var d = a(m).valueOf(),
                  g = s.size(d);if (h[t] = d, r = f, f = g.length - 1, t > 0 && f != r) throw new c(r + 1, f + 1);
            }
          }if (0 == h.length) throw new SyntaxError("At least one matrix expected");for (var v = h.shift(); h.length;) {
            v = i(v, h.shift(), f, 0);
          }return p ? l(v) : v;
        }, "...string": function string(e) {
          return e.join("");
        } });return p.toTex = void 0, p;
    }function i(e, t, r, n) {
      if (r > n) {
        if (e.length != t.length) throw new c(e.length, t.length);for (var a = [], o = 0; o < e.length; o++) {
          a[o] = i(e[o], t[o], r, n + 1);
        }return a;
      }return e.concat(t);
    }var a = r(3).clone,
        o = r(6).isInteger,
        s = r(40),
        u = r(43),
        c = r(42);t.name = "concat", t.factory = n;
  }, function (e, t, r) {
    "use strict";
    function n(e, t, n, i) {
      function a(e, t, r) {
        var n, i;if (e[0] && (n = e[0].compile().eval(r)), e[1]) if (e[1] && e[1].isSymbolNode) i = e[1].compile().eval(r);else {
          var a = r || {},
              s = e[1].filter(function (e) {
            return e && e.isSymbolNode && !(e.name in t) && !(e.name in a);
          })[0],
              u = Object.create(a),
              c = e[1].compile();if (!s) throw new Error("No undefined variable found in filter equation");var f = s.name;i = function i(e) {
            return u[f] = e, c.eval(u);
          };
        }return o(n, i);
      }var o = n(r(315));n(r(299));return a.rawArgs = !0, a;
    }r(45).maxArgumentCount;t.name = "filter", t.path = "expression.transform", t.factory = n;
  }, function (e, t, r) {
    "use strict";
    function n(e, t, n, o) {
      var s = n(r(52)),
          u = o("filter", { "Array, function": i, "Array, RegExp": a, "Matrix, function": function MatrixFunction(e, t) {
          return s(i(e.toArray(), t));
        }, "Matrix, RegExp": function MatrixRegExp(e, t) {
          return s(a(e.toArray(), t));
        } });return u.toTex = void 0, u;
    }function i(e, t) {
      if (1 !== o(e).length) throw new Error("Only one dimensional matrices supported");var r = s(t);return e.filter(function (e, n, i) {
        return 1 === r ? t(e) : 2 === r ? t(e, [n]) : t(e, [n], i);
      });
    }function a(e, t) {
      if (1 !== o(e).length) throw new Error("Only one dimensional matrices supported");return e.filter(function (e) {
        return t.test(e);
      });
    }var o = r(40).size,
        s = r(45).maxArgumentCount;t.name = "filter", t.factory = n;
  }, function (e, t, r) {
    "use strict";
    function n(e, t, n, a) {
      n(r(317));return a("forEach", { "Array | Matrix, function": function ArrayMatrixFunction(e, t) {
          var r = i(t),
              n = function n(i, a) {
            Array.isArray(i) ? i.forEach(function (e, t) {
              n(e, a.concat(t + 1));
            }) : 1 === r ? t(i) : 2 === r ? t(i, a) : t(i, a, e);
          };n(e.valueOf(), []);
        } });
    }var i = r(45).maxArgumentCount;t.name = "forEach", t.path = "expression.transform", t.factory = n;
  }, function (e, t, r) {
    "use strict";
    function n(e, t, r, n) {
      var a = n("forEach", { "Array, function": i, "Matrix, function": function MatrixFunction(e, t) {
          return e.forEach(t);
        } });return a.toTex = void 0, a;
    }function i(e, t) {
      var r = a(t),
          n = function n(i, a) {
        Array.isArray(i) ? i.forEach(function (e, t) {
          n(e, a.concat(t));
        }) : 1 === r ? t(i) : 2 === r ? t(i, a) : t(i, a, e);
      };n(e, []);
    }var a = r(45).maxArgumentCount;t.name = "forEach", t.factory = n;
  }, function (e, t) {
    "use strict";
    function r(e, t, r) {
      return function () {
        for (var t = [], r = 0, n = arguments.length; n > r; r++) {
          var i = arguments[r];if (i && i.isRange === !0) i.start--, i.end -= i.step > 0 ? 0 : 2;else if (i && i.isSet === !0) i = i.map(function (e) {
            return e - 1;
          });else if (i && (i.isArray === !0 || i.isMatrix)) i = i.map(function (e) {
            return e - 1;
          });else if ("number" == typeof i) i--;else if (i && i.isBigNumber === !0) i = i.toNumber() - 1;else if ("string" != typeof i) throw new TypeError("Dimension must be an Array, Matrix, number, string, or Range");t[r] = i;
        }var a = new e.Index();return e.Index.apply(a, t), a;
      };
    }t.name = "index", t.path = "expression.transform", t.factory = r;
  }, function (e, t, r) {
    "use strict";
    function n(e, t, n, a) {
      var o = (n(r(320)), n(r(52)));return a("max", { "Array, function": function ArrayFunction(e, t) {
          return i(e, t, e);
        }, "Matrix, function": function MatrixFunction(e, t) {
          return o(i(e.valueOf(), t, e));
        } });
    }function i(e, t, r) {
      function n(e, a) {
        return Array.isArray(e) ? e.map(function (e, t) {
          return n(e, a.concat(t + 1));
        }) : 1 === i ? t(e) : 2 === i ? t(e, a) : t(e, a, r);
      }var i = a(t);return n(e, []);
    }var a = r(45).maxArgumentCount;t.name = "map", t.path = "expression.transform", t.factory = n;
  }, function (e, t, r) {
    "use strict";
    function n(e, t, r, n) {
      var a = n("map", { "Array, function": i, "Matrix, function": function MatrixFunction(e, t) {
          return e.map(t);
        } });return a.toTex = void 0, a;
    }function i(e, t) {
      var r = a(t),
          n = function n(i, a) {
        return Array.isArray(i) ? i.map(function (e, t) {
          return n(e, a.concat(t));
        }) : 1 === r ? t(i) : 2 === r ? t(i, a) : t(i, a, e);
      };return n(e, []);
    }var a = r(45).maxArgumentCount;t.name = "map", t.factory = n;
  }, function (e, t, r) {
    "use strict";
    function n(e, t, n, o) {
      var s = n(r(323));return o("max", { "...any": function any(e) {
          if (2 == e.length && a(e[0])) {
            var t = e[1];"number" == typeof t ? e[1] = t - 1 : t && t.isBigNumber === !0 && (e[1] = t.minus(1));
          }try {
            return s.apply(null, e);
          } catch (r) {
            throw i(r);
          }
        } });
    }var i = r(287).transform,
        a = r(322);t.name = "max", t.path = "expression.transform", t.factory = n;
  }, function (e, t) {
    "use strict";
    e.exports = function (e) {
      return Array.isArray(e) || e && e.isMatrix === !0;
    };
  }, function (e, t, r) {
    "use strict";
    function n(e, t, n, s) {
      function u(e, t) {
        return f(e, t) ? e : t;
      }function c(e) {
        var t = void 0;if (i(e, function (e) {
          (void 0 === t || f(e, t)) && (t = e);
        }), void 0 === t) throw new Error("Cannot calculate max of an empty array");return t;
      }var f = n(r(64)),
          l = s("max", { "Array | Matrix": c, "Array | Matrix, number | BigNumber": function ArrayMatrixNumberBigNumber(e, t) {
          return a(e, t.valueOf(), u);
        }, "...": function _(e) {
          if (o(e)) throw new TypeError("Scalar values expected in function max");return c(e);
        } });return l.toTex = "\\max\\left(${args}\\right)", l;
    }var i = r(324),
        a = r(325),
        o = r(326);t.name = "max", t.factory = n;
  }, function (e, t) {
    "use strict";
    e.exports = function r(e, t) {
      e && e.isMatrix === !0 && (e = e.valueOf());for (var n = 0, i = e.length; i > n; n++) {
        var a = e[n];Array.isArray(a) ? r(a, t) : t(a);
      }
    };
  }, function (e, t, r) {
    "use strict";
    function n(e, t, r) {
      var a, o, s, u;if (0 >= t) {
        if (Array.isArray(e[0])) {
          for (u = i(e), o = [], a = 0; a < u.length; a++) {
            o[a] = n(u[a], t - 1, r);
          }return o;
        }for (s = e[0], a = 1; a < e.length; a++) {
          s = r(s, e[a]);
        }return s;
      }for (o = [], a = 0; a < e.length; a++) {
        o[a] = n(e[a], t - 1, r);
      }return o;
    }function i(e) {
      var t,
          r,
          n = e.length,
          i = e[0].length,
          a = [];for (r = 0; i > r; r++) {
        var o = [];for (t = 0; n > t; t++) {
          o.push(e[t][r]);
        }a.push(o);
      }return a;
    }var a = r(40).size,
        o = r(43);e.exports = function (e, t, r) {
      var i = Array.isArray(e) ? a(e) : e.size();if (0 > t || t >= i.length) throw new o(t, i.length);return e && e.isMatrix === !0 ? e.create(n(e.valueOf(), t, r)) : n(e, t, r);
    };
  }, function (e, t, r) {
    "use strict";
    var n = r(322);e.exports = function (e) {
      for (var t = 0; t < e.length; t++) {
        if (n(e[t])) return !0;
      }return !1;
    };
  }, function (e, t, r) {
    "use strict";
    function n(e, t, n, o) {
      var s = n(r(328));return o("mean", { "...any": function any(e) {
          if (2 == e.length && a(e[0])) {
            var t = e[1];"number" == typeof t ? e[1] = t - 1 : t && t.isBigNumber === !0 && (e[1] = t.minus(1));
          }try {
            return s.apply(null, e);
          } catch (r) {
            throw i(r);
          }
        } });
    }var i = r(287).transform,
        a = r(322);t.name = "mean", t.path = "expression.transform", t.factory = n;
  }, function (e, t, r) {
    "use strict";
    function n(e, t, n, u) {
      function c(e, t) {
        var r = o(e, t, l),
            n = Array.isArray(e) ? i(e) : e.size();return p(r, n[t]);
      }function f(e) {
        var t = 0,
            r = 0;if (a(e, function (e) {
          t = l(t, e), r++;
        }), 0 === r) throw new Error("Cannot calculate mean of an empty array");return p(t, r);
      }var l = n(r(51)),
          p = n(r(329)),
          h = u("mean", { "Array | Matrix": f, "Array | Matrix, number | BigNumber": c, "...": function _(e) {
          if (s(e)) throw new TypeError("Scalar values expected in function mean");return f(e);
        } });return h.toTex = void 0, h;
    }var i = r(40).size,
        a = r(324),
        o = r(325),
        s = r(326);t.name = "mean", t.factory = n;
  }, function (e, t, r) {
    "use strict";
    function n(e, t, n, a) {
      var o = n(r(81)),
          s = n(r(84)),
          u = n(r(330)),
          c = n(r(52)),
          f = n(r(85)),
          l = n(r(58)),
          p = a("divide", i({ "Array | Matrix, Array | Matrix": function ArrayMatrixArrayMatrix(e, t) {
          return s(e, u(t));
        }, "Matrix, any": function MatrixAny(e, t) {
          var r;switch (e.storage()) {case "sparse":
              r = f(e, t, o, !1);break;case "dense":
              r = l(e, t, o, !1);}return r;
        }, "Array, any": function ArrayAny(e, t) {
          return l(c(e), t, o, !1).valueOf();
        }, "any, Array | Matrix": function anyArrayMatrix(e, t) {
          return s(e, u(t));
        } }, o.signatures));return p.toTex = { 2: "\\frac{${args[0]}}{${args[1]}}" }, p;
    }var i = r(3).extend;t.name = "divide", t.factory = n;
  }, function (e, t, r) {
    "use strict";
    function n(e, t, n, a) {
      function o(e, t, r) {
        var n, i, a, o, s;if (1 == t) {
          if (o = e[0][0], 0 == o) throw Error("Cannot calculate inverse, determinant is zero");return [[u(1, o)]];
        }if (2 == t) {
          var m = p(e);if (0 == m) throw Error("Cannot calculate inverse, determinant is zero");return [[u(e[1][1], m), u(l(e[0][1]), m)], [u(l(e[1][0]), m), u(e[0][0], m)]];
        }var d = e.concat();for (n = 0; t > n; n++) {
          d[n] = d[n].concat();
        }for (var g = h(t).valueOf(), v = 0; r > v; v++) {
          for (n = v; t > n && 0 == d[n][v];) {
            n++;
          }if (n == t || 0 == d[n][v]) throw Error("Cannot calculate inverse, determinant is zero");n != v && (s = d[v], d[v] = d[n], d[n] = s, s = g[v], g[v] = g[n], g[n] = s);var y = d[v],
              x = g[v];for (n = 0; t > n; n++) {
            var b = d[n],
                w = g[n];if (n != v) {
              if (0 != b[v]) {
                for (a = u(l(b[v]), y[v]), i = v; r > i; i++) {
                  b[i] = c(b[i], f(a, y[i]));
                }for (i = 0; r > i; i++) {
                  w[i] = c(w[i], f(a, x[i]));
                }
              }
            } else {
              for (a = y[v], i = v; r > i; i++) {
                b[i] = u(b[i], a);
              }for (i = 0; r > i; i++) {
                w[i] = u(w[i], a);
              }
            }
          }
        }return g;
      }var s = n(r(52)),
          u = n(r(81)),
          c = n(r(53)),
          f = n(r(84)),
          l = n(r(78)),
          p = n(r(331)),
          h = n(r(83)),
          m = a("inv", { "Array | Matrix": function ArrayMatrix(e) {
          var t = e.isMatrix === !0 ? e.size() : i.array.size(e);switch (t.length) {case 1:
              if (1 == t[0]) return e.isMatrix === !0 ? s([u(1, e.valueOf()[0])]) : [u(1, e[0])];throw new RangeError("Matrix must be square (size: " + i.string.format(t) + ")");case 2:
              var r = t[0],
                  n = t[1];if (r == n) return e.isMatrix === !0 ? s(o(e.valueOf(), r, n), e.storage()) : o(e, r, n);throw new RangeError("Matrix must be square (size: " + i.string.format(t) + ")");default:
              throw new RangeError("Matrix must be two dimensional (size: " + i.string.format(t) + ")");}
        }, any: function any(e) {
          return u(1, e);
        } });return m.toTex = { 1: "\\left(${args[0]}\\right)^{-1}" }, m;
    }var i = r(39);t.name = "inv", t.factory = n;
  }, function (e, t, r) {
    "use strict";
    function n(e, t, n, i) {
      function s(e, t, r) {
        if (1 == t) return a.clone(e[0][0]);if (2 == t) return f(l(e[0][0], e[1][1]), l(e[1][0], e[0][1]));for (var n = function n(e) {
          var t,
              r,
              n = new Array(e.length),
              i = 0;for (t = 1; t < e.length; t++) {
            i = c(i, e[t][t]);
          }for (t = 0; t < e.length; t++) {
            for (n[t] = new Array(e.length), n[t][t] = p(i), r = 0; t > r; r++) {
              n[t][r] = 0;
            }for (r = t + 1; r < e.length; r++) {
              n[t][r] = e[t][r];
            }t + 1 < e.length && (i = f(i, e[t + 1][t + 1]));
          }return n;
        }, i = e, o = 0; t - 1 > o; o++) {
          i = l(n(i), e);
        }return t % 2 == 0 ? p(i[0][0]) : i[0][0];
      }var u = n(r(52)),
          c = n(r(51)),
          f = n(r(77)),
          l = n(r(84)),
          p = n(r(78)),
          h = i("det", { any: function any(e) {
          return a.clone(e);
        }, "Array | Matrix": function ArrayMatrix(e) {
          var t;switch (e && e.isMatrix === !0 ? t = e.size() : Array.isArray(e) ? (e = u(e), t = e.size()) : t = [], t.length) {case 0:
              return a.clone(e);case 1:
              if (1 == t[0]) return a.clone(e.valueOf()[0]);throw new RangeError("Matrix must be square (size: " + o.format(t) + ")");case 2:
              var r = t[0],
                  n = t[1];if (r == n) return s(e.clone().valueOf(), r, n);throw new RangeError("Matrix must be square (size: " + o.format(t) + ")");default:
              throw new RangeError("Matrix must be two dimensional (size: " + o.format(t) + ")");}
        } });return h.toTex = { 1: "\\det\\left(${args[0]}\\right)" }, h;
    }var i = r(39),
        a = i.object,
        o = i.string;t.name = "det", t.factory = n;
  }, function (e, t, r) {
    "use strict";
    function n(e, t, n, o) {
      var s = n(r(333));return o("min", { "...any": function any(e) {
          if (2 == e.length && a(e[0])) {
            var t = e[1];"number" == typeof t ? e[1] = t - 1 : t && t.isBigNumber === !0 && (e[1] = t.minus(1));
          }try {
            return s.apply(null, e);
          } catch (r) {
            throw i(r);
          }
        } });
    }var i = r(287).transform,
        a = r(322);t.name = "min", t.path = "expression.transform", t.factory = n;
  }, function (e, t, r) {
    "use strict";
    function n(e, t, n, s) {
      function u(e, t) {
        return f(e, t) ? e : t;
      }function c(e) {
        var t = void 0;if (i(e, function (e) {
          (void 0 === t || f(e, t)) && (t = e);
        }), void 0 === t) throw new Error("Cannot calculate min of an empty array");return t;
      }var f = n(r(60)),
          l = s("min", { "Array | Matrix": c, "Array | Matrix, number | BigNumber": function ArrayMatrixNumberBigNumber(e, t) {
          return a(e, t.valueOf(), u);
        }, "...": function _(e) {
          if (o(e)) throw new TypeError("Scalar values expected in function min");return c(e);
        } });return l.toTex = "\\min\\left(${args}\\right)", l;
    }var i = r(324),
        a = r(325),
        o = r(326);t.name = "min", t.factory = n;
  }, function (e, t, r) {
    "use strict";
    function n(e, t, n, i) {
      var a = n(r(335));return i("range", { "...any": function any(e) {
          var t = e.length - 1,
              r = e[t];return "boolean" != typeof r && e.push(!0), a.apply(null, e);
        } });
    }t.name = "range", t.path = "expression.transform", t.factory = n;
  }, function (e, t, r) {
    "use strict";
    function n(e, t, n, i) {
      function a(e) {
        return "Array" === t.matrix ? e : p(e);
      }function o(r, n) {
        var i = l(r);if (!i) throw new SyntaxError('String "' + r + '" is no valid range');var o;return "BigNumber" === t.number ? (o = n ? f : c, a(o(new e.BigNumber(i.start), new e.BigNumber(i.end), new e.BigNumber(i.step)))) : (o = n ? u : s, a(o(i.start, i.end, i.step)));
      }function s(e, t, r) {
        var n = [],
            i = e;if (r > 0) for (; t > i;) {
          n.push(i), i += r;
        } else if (0 > r) for (; i > t;) {
          n.push(i), i += r;
        }return n;
      }function u(e, t, r) {
        var n = [],
            i = e;if (r > 0) for (; t >= i;) {
          n.push(i), i += r;
        } else if (0 > r) for (; i >= t;) {
          n.push(i), i += r;
        }return n;
      }function c(e, t, r) {
        var n = [],
            i = e;if (r.gt(h)) for (; i.lt(t);) {
          n.push(i), i = i.plus(r);
        } else if (r.lt(h)) for (; i.gt(t);) {
          n.push(i), i = i.plus(r);
        }return n;
      }function f(e, t, r) {
        var n = [],
            i = e;if (r.gt(h)) for (; i.lte(t);) {
          n.push(i), i = i.plus(r);
        } else if (r.lt(h)) for (; i.gte(t);) {
          n.push(i), i = i.plus(r);
        }return n;
      }function l(e) {
        var t = e.split(":"),
            r = t.map(function (e) {
          return Number(e);
        }),
            n = r.some(function (e) {
          return isNaN(e);
        });if (n) return null;switch (r.length) {case 2:
            return { start: r[0], end: r[1], step: 1 };case 3:
            return { start: r[0], end: r[2], step: r[1] };default:
            return null;}
      }var p = n(r(52)),
          h = new e.BigNumber(0),
          m = new e.BigNumber(1),
          d = i("range", { string: o, "string, boolean": o, "number, number": function numberNumber(e, t) {
          return a(s(e, t, 1));
        }, "number, number, number": function numberNumberNumber(e, t, r) {
          return a(s(e, t, r));
        }, "number, number, boolean": function numberNumberBoolean(e, t, r) {
          return a(r ? u(e, t, 1) : s(e, t, 1));
        }, "number, number, number, boolean": function numberNumberNumberBoolean(e, t, r, n) {
          return a(n ? u(e, t, r) : s(e, t, r));
        }, "BigNumber, BigNumber": function BigNumberBigNumber(e, t) {
          return a(c(e, t, m));
        }, "BigNumber, BigNumber, BigNumber": function BigNumberBigNumberBigNumber(e, t, r) {
          return a(c(e, t, r));
        }, "BigNumber, BigNumber, boolean": function BigNumberBigNumberBoolean(e, t, r) {
          return a(r ? f(e, t, m) : c(e, t, m));
        }, "BigNumber, BigNumber, BigNumber, boolean": function BigNumberBigNumberBigNumberBoolean(e, t, r, n) {
          return a(n ? f(e, t, r) : c(e, t, r));
        } });return d.toTex = void 0, d;
    }t.name = "range", t.factory = n;
  }, function (e, t, r) {
    "use strict";
    function n(e, t, n, a) {
      var o = n(r(288));return a("subset", { "...any": function any(e) {
          try {
            return o.apply(null, e);
          } catch (t) {
            throw i(t);
          }
        } });
    }var i = r(287).transform;t.name = "subset", t.path = "expression.transform", t.factory = n;
  }, function (e, t, r) {
    "use strict";
    function n(e, t, n, o) {
      function s(e) {
        if (!(this instanceof s)) throw new SyntaxError("Constructor must be called with the new operator");if (!e) throw new Error('Argument "doc" missing');this.doc = e;
      }var u = n(r(307))();return s.prototype.type = "Help", s.prototype.isHelp = !0, s.prototype.toString = function () {
        var e = this.doc || {},
            t = "\n";if (e.name && (t += "Name: " + e.name + "\n\n"), e.category && (t += "Category: " + e.category + "\n\n"), e.description && (t += "Description:\n    " + e.description + "\n\n"), e.syntax && (t += "Syntax:\n    " + e.syntax.join("\n    ") + "\n\n"), e.examples) {
          t += "Examples:\n";for (var r = 0; r < e.examples.length; r++) {
            var n = e.examples[r];t += "    " + n + "\n";var i;try {
              i = u.eval(n);
            } catch (o) {
              i = o;
            }i && !i.isHelp && (t += "        " + a.format(i, { precision: 14 }) + "\n");
          }t += "\n";
        }return e.seealso && (t += "See also: " + e.seealso.join(", ") + "\n"), t;
      }, s.prototype.toJSON = function () {
        var e = i.clone(this.doc);return e.mathjs = "Help", e;
      }, s.fromJSON = function (e) {
        var t = {};for (var r in e) {
          "mathjs" !== r && (t[r] = e[r]);
        }return new s(t);
      }, s.prototype.valueOf = s.prototype.toString, s;
    }var i = r(3),
        a = r(23);t.name = "Help", t.path = "type", t.factory = n;
  }, function (e, t, r) {
    e.exports = [r(339), r(366), r(397), r(413), r(422), r(427), r(430), r(436), r(448), r(457), r(461), r(463), r(470), r(472), r(498), r(500)];
  }, function (e, t, r) {
    e.exports = [r(340), r(341), r(361), r(363), r(365)];
  }, function (e, t, r) {
    "use strict";
    function n(e, t, n, i) {
      var o = n(r(52)),
          s = n(r(86)),
          u = n(r(53)),
          c = n(r(81)),
          f = n(r(80)),
          l = n(r(77)),
          p = n(r(64)),
          h = n(r(48)),
          m = n(r(78)),
          d = e.SparseMatrix,
          g = e.DenseMatrix,
          v = e.Spa,
          y = i("lup", { DenseMatrix: function DenseMatrix(e) {
          return x(e);
        }, SparseMatrix: function SparseMatrix(e) {
          return b(e);
        }, Array: function Array(e) {
          var t = o(e),
              r = x(t);return { L: r.L.valueOf(), U: r.U.valueOf(), p: r.p };
        } }),
          x = function x(e) {
        var t,
            r,
            n,
            i = e._size[0],
            o = e._size[1],
            m = Math.min(i, o),
            d = a.clone(e._data),
            v = [],
            y = [i, m],
            x = [],
            b = [m, o],
            w = [];for (t = 0; i > t; t++) {
          w[t] = t;
        }for (r = 0; o > r; r++) {
          if (r > 0) for (t = 0; i > t; t++) {
            var N = Math.min(t, r),
                E = 0;for (n = 0; N > n; n++) {
              E = u(E, f(d[t][n], d[n][r]));
            }d[t][r] = l(d[t][r], E);
          }var M = r,
              A = 0,
              O = 0;for (t = r; i > t; t++) {
            var _ = d[t][r],
                T = s(_);p(T, A) && (M = t, A = T, O = _);
          }if (r !== M && (w[r] = [w[M], w[M] = w[r]][0], g._swapRows(r, M, d)), i > r) for (t = r + 1; i > t; t++) {
            var C = d[t][r];h(C, 0) || (d[t][r] = c(d[t][r], O));
          }
        }for (r = 0; o > r; r++) {
          for (t = 0; i > t; t++) {
            0 === r && (o > t && (x[t] = []), v[t] = []), r > t ? (o > t && (x[t][r] = d[t][r]), i > r && (v[t][r] = 0)) : t !== r ? (o > t && (x[t][r] = 0), i > r && (v[t][r] = d[t][r])) : (o > t && (x[t][r] = d[t][r]), i > r && (v[t][r] = 1));
          }
        }var S = new g({ data: v, size: y }),
            z = new g({ data: x, size: b }),
            B = [];for (t = 0, m = w.length; m > t; t++) {
          B[w[t]] = t;
        }return { L: S, U: z, p: B, toString: function toString() {
            return "L: " + this.L.toString() + "\nU: " + this.U.toString() + "\nP: " + this.p;
          } };
      },
          b = function b(e) {
        var t,
            r,
            n,
            i = e._size[0],
            a = e._size[1],
            o = Math.min(i, a),
            u = e._values,
            l = e._index,
            g = e._ptr,
            y = [],
            x = [],
            b = [],
            w = [i, o],
            N = [],
            E = [],
            M = [],
            A = [o, a],
            O = [],
            _ = [];for (t = 0; i > t; t++) {
          O[t] = t, _[t] = t;
        }var T = function T(e, t) {
          var r = _[e],
              n = _[t];O[r] = t, O[n] = e, _[e] = n, _[t] = r;
        };for (r = 0; a > r; r++) {
          var C = new v();i > r && (b.push(y.length), y.push(1), x.push(r)), M.push(N.length);var S = g[r],
              z = g[r + 1];for (n = S; z > n; n++) {
            t = l[n], C.set(O[t], u[n]);
          }r > 0 && C.forEach(0, r - 1, function (e, t) {
            d._forEachRow(e, y, x, b, function (r, n) {
              r > e && C.accumulate(r, m(f(n, t)));
            });
          });var B = r,
              k = C.get(r),
              I = s(k);C.forEach(r + 1, i - 1, function (e, t) {
            var r = s(t);p(r, I) && (B = e, I = r, k = t);
          }), r !== B && (d._swapRows(r, B, w[1], y, x, b), d._swapRows(r, B, A[1], N, E, M), C.swap(r, B), T(r, B)), C.forEach(0, i - 1, function (e, t) {
            r >= e ? (N.push(t), E.push(e)) : (t = c(t, k), h(t, 0) || (y.push(t), x.push(e)));
          });
        }return M.push(N.length), b.push(y.length), { L: new d({ values: y, index: x, ptr: b, size: w }), U: new d({ values: N, index: E, ptr: M, size: A }), p: O, toString: function toString() {
            return "L: " + this.L.toString() + "\nU: " + this.U.toString() + "\nP: " + this.p;
          } };
      };return y;
    }var i = r(39),
        a = i.object;t.name = "lup", t.factory = n;
  }, function (e, t, r) {
    "use strict";
    function n(e, t, n, i) {
      var a = n(r(342)),
          s = n(r(353)),
          u = i("slu", { "SparseMatrix, number, number": function SparseMatrixNumberNumber(e, t, r) {
          if (!o(t) || 0 > t || t > 3) throw new Error("Symbolic Ordering and Analysis order must be an integer number in the interval [0, 3]");if (0 > r || r > 1) throw new Error("Partial pivoting threshold must be a number from 0 to 1");var n = a(t, e, !1),
              i = s(e, n, r);return { L: i.L, U: i.U, p: i.pinv, q: n.q, toString: function toString() {
              return "L: " + this.L.toString() + "\nU: " + this.U.toString() + "\np: " + this.p.toString() + (this.q ? "\nq: " + this.q.toString() : "") + "\n";
            } };
        } });return u;
    }var i = r(39),
        a = i.number,
        o = a.isInteger;t.name = "slu", t.factory = n;
  }, function (e, t, r) {
    "use strict";
    function n(e, t, n) {
      var i = n(r(343)),
          a = n(r(348)),
          o = n(r(349)),
          s = n(r(350)),
          u = n(r(351)),
          c = function c(e, t, r) {
        var n,
            c = t._ptr,
            l = t._size,
            p = l[1],
            h = {};if (h.q = i(e, t), e && !h.q) return null;if (r) {
          var m = e ? a(t, null, h.q, 0) : t;h.parent = o(m, 1);var d = s(h.parent, p);if (h.cp = u(m, h.parent, d, 1), m && h.parent && h.cp && f(m, h)) for (h.unz = 0, n = 0; p > n; n++) {
            h.unz += h.cp[n];
          }
        } else h.unz = 4 * c[p] + p, h.lnz = h.unz;return h;
      },
          f = function f(e, t) {
        var r = e._ptr,
            n = e._index,
            i = e._size,
            a = i[0],
            o = i[1];t.pinv = [], t.leftmost = [];var s,
            u,
            c,
            f,
            l,
            p = t.parent,
            h = t.pinv,
            m = t.leftmost,
            d = [],
            g = 0,
            v = a,
            y = a + o,
            x = a + 2 * o;for (u = 0; o > u; u++) {
          d[v + u] = -1, d[y + u] = -1, d[x + u] = 0;
        }for (s = 0; a > s; s++) {
          m[s] = -1;
        }for (u = o - 1; u >= 0; u--) {
          for (f = r[u], l = r[u + 1], c = f; l > c; c++) {
            m[n[c]] = u;
          }
        }for (s = a - 1; s >= 0; s--) {
          h[s] = -1, u = m[s], -1 != u && (0 === d[x + u]++ && (d[y + u] = s), d[g + s] = d[v + u], d[v + u] = s);
        }for (t.lnz = 0, t.m2 = a, u = 0; o > u; u++) {
          if (s = d[v + u], t.lnz++, 0 > s && (s = t.m2++), h[s] = u, !(--x[u] <= 0)) {
            t.lnz += d[x + u];var b = p[u];-1 != b && (0 === d[x + b] && (d[y + b] = d[y + u]), d[g + d[y + u]] = d[v + b], d[v + b] = d[g + s], d[x + b] += d[x + u]);
          }
        }for (s = 0; a > s; s++) {
          h[s] < 0 && (h[s] = u++);
        }return !0;
      };return c;
    }t.name = "cs_sqr", t.path = "sparse", t.factory = n;
  }, function (e, t, r) {
    "use strict";
    function n(e, t, n) {
      var i = n(r(344)),
          a = n(r(345)),
          o = n(r(346)),
          s = n(r(51)),
          u = n(r(84)),
          c = n(r(347)),
          f = function f(e, t) {
        if (!t || 0 >= e || e > 3) return null;var r = t._size,
            n = r[0],
            s = r[1],
            u = 0,
            c = Math.max(16, 10 * Math.sqrt(s));c = Math.min(s - 2, c);var f = l(e, t, n, s, c);a(f, d, null);for (var g, v, y, x, b, w, N, E, M, A, O, _, T, C, S, z, B = f._index, k = f._ptr, I = k[s], P = [], R = [], U = 0, q = s + 1, L = 2 * (s + 1), j = 3 * (s + 1), F = 4 * (s + 1), D = 5 * (s + 1), $ = 6 * (s + 1), G = 7 * (s + 1), H = P, Z = p(s, k, R, U, j, H, L, G, q, $, F, D), V = h(s, k, R, D, F, $, c, q, j, H, L), W = 0; s > V;) {
          for (y = -1; s > W && -1 == (y = R[j + W]); W++) {}-1 != R[L + y] && (H[R[L + y]] = -1), R[j + W] = R[L + y];var Y = R[F + y],
              X = R[q + y];V += X;var J = 0;R[q + y] = -X;var Q = k[y],
              K = 0 === Y ? Q : I,
              ee = K;for (x = 1; Y + 1 >= x; x++) {
            for (x > Y ? (w = y, N = Q, E = R[U + y] - Y) : (w = B[Q++], N = k[w], E = R[U + w]), b = 1; E >= b; b++) {
              g = B[N++], (M = R[q + g]) <= 0 || (J += M, R[q + g] = -M, B[ee++] = g, -1 != R[L + g] && (H[R[L + g]] = H[g]), -1 != H[g] ? R[L + H[g]] = R[L + g] : R[j + R[D + g]] = R[L + g]);
            }w != y && (k[w] = i(y), R[$ + w] = 0);
          }for (0 !== Y && (I = ee), R[D + y] = J, k[y] = K, R[U + y] = ee - K, R[F + y] = -2, Z = m(Z, u, R, $, s), A = K; ee > A; A++) {
            if (g = B[A], !((O = R[F + g]) <= 0)) {
              M = -R[q + g];var te = Z - M;for (Q = k[g], _ = k[g] + O - 1; _ >= Q; Q++) {
                w = B[Q], R[$ + w] >= Z ? R[$ + w] -= M : 0 !== R[$ + w] && (R[$ + w] = R[D + w] + te);
              }
            }
          }for (A = K; ee > A; A++) {
            for (g = B[A], _ = k[g], T = _ + R[F + g] - 1, C = _, S = 0, z = 0, Q = _; T >= Q; Q++) {
              if (w = B[Q], 0 !== R[$ + w]) {
                var re = R[$ + w] - Z;re > 0 ? (z += re, B[C++] = w, S += w) : (k[w] = i(y), R[$ + w] = 0);
              }
            }R[F + g] = C - _ + 1;var ne = C,
                ie = _ + R[U + g];for (Q = T + 1; ie > Q; Q++) {
              v = B[Q];var ae = R[q + v];0 >= ae || (z += ae, B[C++] = v, S += v);
            }0 === z ? (k[g] = i(y), M = -R[q + g], J -= M, X += M, V += M, R[q + g] = 0, R[F + g] = -1) : (R[D + g] = Math.min(R[D + g], z), B[C] = B[ne], B[ne] = B[_], B[_] = y, R[U + g] = C - _ + 1, S = (0 > S ? -S : S) % s, R[L + g] = R[G + S], R[G + S] = g, H[g] = S);
          }for (R[D + y] = J, u = Math.max(u, J), Z = m(Z + u, u, R, $, s), A = K; ee > A; A++) {
            if (g = B[A], !(R[q + g] >= 0)) for (S = H[g], g = R[G + S], R[G + S] = -1; -1 != g && -1 != R[L + g]; g = R[L + g], Z++) {
              for (E = R[U + g], O = R[F + g], Q = k[g] + 1; Q <= k[g] + E - 1; Q++) {
                R[$ + B[Q]] = Z;
              }var oe = g;for (v = R[L + g]; -1 != v;) {
                var se = R[U + v] === E && R[F + v] === O;for (Q = k[v] + 1; se && Q <= k[v] + E - 1; Q++) {
                  R[$ + B[Q]] != Z && (se = 0);
                }se ? (k[v] = i(g), R[q + g] += R[q + v], R[q + v] = 0, R[F + v] = -1, v = R[L + v], R[L + oe] = v) : (oe = v, v = R[L + v]);
              }
            }
          }for (Q = K, A = K; ee > A; A++) {
            g = B[A], (M = -R[q + g]) <= 0 || (R[q + g] = M, z = R[D + g] + J - M, z = Math.min(z, s - V - M), -1 != R[j + z] && (H[R[j + z]] = g), R[L + g] = R[j + z], H[g] = -1, R[j + z] = g, W = Math.min(W, z), R[D + g] = z, B[Q++] = g);
          }R[q + y] = X, 0 === (R[U + y] = Q - K) && (k[y] = -1, R[$ + y] = 0), 0 !== Y && (I = Q);
        }for (g = 0; s > g; g++) {
          k[g] = i(k[g]);
        }for (v = 0; s >= v; v++) {
          R[j + v] = -1;
        }for (v = s; v >= 0; v--) {
          R[q + v] > 0 || (R[L + v] = R[j + k[v]], R[j + k[v]] = v);
        }for (w = s; w >= 0; w--) {
          R[q + w] <= 0 || -1 != k[w] && (R[L + w] = R[j + k[w]], R[j + k[w]] = w);
        }for (y = 0, g = 0; s >= g; g++) {
          -1 == k[g] && (y = o(g, y, R, j, L, P, $));
        }return P.splice(P.length - 1, 1), P;
      },
          l = function l(e, t, r, n, i) {
        var a = c(t);if (1 === e && n === r) return s(t, a);if (2 == e) {
          for (var o = a._index, f = a._ptr, l = 0, p = 0; r > p; p++) {
            var h = f[p];if (f[p] = l, !(f[p + 1] - h > i)) for (var m = f[p + 1]; m > h; h++) {
              o[l++] = o[h];
            }
          }return f[r] = l, t = c(a), u(a, t);
        }return u(a, t);
      },
          p = function p(e, t, r, n, i, a, o, s, u, c, f, l) {
        for (var p = 0; e > p; p++) {
          r[n + p] = t[p + 1] - t[p];
        }r[n + e] = 0;for (var h = 0; e >= h; h++) {
          r[i + h] = -1, a[h] = -1, r[o + h] = -1, r[s + h] = -1, r[u + h] = 1, r[c + h] = 1, r[f + h] = 0, r[l + h] = r[n + h];
        }var d = m(0, 0, r, c, e);return r[f + e] = -2, t[e] = -1, r[c + e] = 0, d;
      },
          h = function h(e, t, r, n, a, o, s, u, c, f, l) {
        for (var p = 0, h = 0; e > h; h++) {
          var m = r[n + h];if (0 === m) r[a + h] = -2, p++, t[h] = -1, r[o + h] = 0;else if (m > s) r[u + h] = 0, r[a + h] = -1, p++, t[h] = i(e), r[u + e]++;else {
            var d = r[c + m];-1 != d && (f[d] = h), r[l + h] = r[c + m], r[c + m] = h;
          }
        }return p;
      },
          m = function m(e, t, r, n, i) {
        if (2 > e || 0 > e + t) {
          for (var a = 0; i > a; a++) {
            0 !== r[n + a] && (r[n + a] = 1);
          }e = 2;
        }return e;
      },
          d = function d(e, t) {
        return e != t;
      };return f;
    }t.name = "cs_amd", t.path = "sparse", t.factory = n;
  }, function (e, t) {
    "use strict";
    function r() {
      var e = function e(_e2) {
        return -_e2 - 2;
      };return e;
    }t.name = "cs_flip", t.path = "sparse", t.factory = r;
  }, function (e, t) {
    "use strict";
    function r() {
      var e = function e(_e3, t, r) {
        for (var n = _e3._values, i = _e3._index, a = _e3._ptr, o = _e3._size, s = o[1], u = 0, c = 0; s > c; c++) {
          var f = a[c];for (a[c] = u; f < a[c + 1]; f++) {
            t(i[f], c, n ? n[f] : 1, r) && (i[u] = i[f], n && (n[u] = n[f]), u++);
          }
        }return a[s] = u, i.splice(u, i.length - u), n && n.splice(u, n.length - u), u;
      };return e;
    }t.name = "cs_fkeep", t.path = "sparse", t.factory = r;
  }, function (e, t) {
    "use strict";
    function r() {
      var e = function e(_e4, t, r, n, i, a, o) {
        var s = 0;for (r[o] = _e4; s >= 0;) {
          var u = r[o + s],
              c = r[n + u];-1 == c ? (s--, a[t++] = u) : (r[n + u] = r[i + c], ++s, r[o + s] = c);
        }return t;
      };return e;
    }t.name = "cs_tdfs", t.path = "sparse", t.factory = r;
  }, function (e, t, r) {
    "use strict";
    function n(e, t, n, o) {
      var s = r(32),
          u = n(r(52)),
          c = e.DenseMatrix,
          f = e.SparseMatrix,
          l = o("transpose", { Array: function Array(e) {
          return l(u(e)).valueOf();
        }, Matrix: function Matrix(e) {
          var t,
              r = e.size();switch (r.length) {case 1:
              t = e.clone();break;case 2:
              var n = r[0],
                  i = r[1];if (0 === i) throw new RangeError("Cannot transpose a 2D matrix with no columns (size: " + a(r) + ")");switch (e.storage()) {case "dense":
                  t = p(e, n, i);break;case "sparse":
                  t = h(e, n, i);}break;default:
              throw new RangeError("Matrix must be a vector or two dimensional (size: " + a(this._size) + ")");}return t;
        }, any: function any(e) {
          return i(e);
        } }),
          p = function p(e, t, r) {
        for (var n, a = e._data, o = [], s = 0; r > s; s++) {
          n = o[s] = [];for (var u = 0; t > u; u++) {
            n[u] = i(a[u][s]);
          }
        }return new c({ data: o, size: [r, t], datatype: e._datatype });
      },
          h = function h(e, t, r) {
        for (var n = e._values, a = e._index, o = e._ptr, s = n ? [] : void 0, u = [], c = [], l = [], p = 0; t > p; p++) {
          l[p] = 0;
        }var h, m, d;for (h = 0, m = a.length; m > h; h++) {
          l[a[h]]++;
        }for (var g = 0, v = 0; t > v; v++) {
          c.push(g), g += l[v], l[v] = c[v];
        }for (c.push(g), d = 0; r > d; d++) {
          for (var y = o[d], x = o[d + 1], b = y; x > b; b++) {
            var w = l[a[b]]++;u[w] = d, n && (s[w] = i(n[b]));
          }
        }return new f({ values: s, index: u, ptr: c, size: [r, t], datatype: e._datatype });
      };return l.toTex = { 1: "\\left(${args[0]}\\right)" + s.operators.transpose }, l;
    }var i = r(3).clone,
        a = r(23).format;t.name = "transpose", t.factory = n;
  }, function (e, t) {
    "use strict";
    function r(e) {
      var t = e.SparseMatrix,
          r = function r(e, _r, n, i) {
        for (var a = e._values, o = e._index, s = e._ptr, u = e._size, c = e._datatype, f = u[0], l = u[1], p = i && e._values ? [] : null, h = [], m = [], d = 0, g = 0; l > g; g++) {
          m[g] = d;for (var v = n ? n[g] : g, y = s[v], x = s[v + 1], b = y; x > b; b++) {
            var w = _r ? _r[o[b]] : o[b];h[d] = w, p && (p[d] = a[b]), d++;
          }
        }return m[l] = d, new t({ values: p, index: h, ptr: m, size: [f, l], datatype: c });
      };return r;
    }t.name = "cs_permute", t.path = "sparse", t.factory = r;
  }, function (e, t) {
    "use strict";
    function r() {
      var e = function e(_e5, t) {
        if (!_e5) return null;var r,
            n,
            i = _e5._index,
            a = _e5._ptr,
            o = _e5._size,
            s = o[0],
            u = o[1],
            c = [],
            f = [],
            l = 0,
            p = u;if (t) for (r = 0; s > r; r++) {
          f[p + r] = -1;
        }for (var h = 0; u > h; h++) {
          c[h] = -1, f[l + h] = -1;for (var m = a[h], d = a[h + 1], g = m; d > g; g++) {
            var v = i[g];for (r = t ? f[p + v] : v; -1 != r && h > r; r = n) {
              n = f[l + r], f[l + r] = h, -1 == n && (c[r] = h);
            }t && (f[p + v] = h);
          }
        }return c;
      };return e;
    }t.name = "cs_etree", t.path = "sparse", t.factory = r;
  }, function (e, t, r) {
    "use strict";
    function n(e, t, n) {
      var i = n(r(346)),
          a = function a(e, t) {
        if (!e) return null;var r,
            n = 0,
            a = [],
            o = [],
            s = 0,
            u = t,
            c = 2 * t;for (r = 0; t > r; r++) {
          o[s + r] = -1;
        }for (r = t - 1; r >= 0; r--) {
          -1 != e[r] && (o[u + r] = o[s + e[r]], o[s + e[r]] = r);
        }for (r = 0; t > r; r++) {
          -1 == e[r] && (n = i(r, n, o, s, u, a, c));
        }return a;
      };return a;
    }t.name = "cs_post", t.path = "sparse", t.factory = n;
  }, function (e, t, r) {
    "use strict";
    function n(e, t, n) {
      var i = n(r(347)),
          a = n(r(352)),
          o = function o(e, t, r, n) {
        if (!e || !t || !r) return null;var o,
            s,
            u,
            c,
            f,
            l,
            p,
            h = e._size,
            m = h[0],
            d = h[1],
            g = 4 * d + (n ? d + m + 1 : 0),
            v = [],
            y = 0,
            x = d,
            b = 2 * d,
            w = 3 * d,
            N = 4 * d,
            E = 5 * d + 1;for (u = 0; g > u; u++) {
          v[u] = -1;
        }var M = [],
            A = i(e),
            O = A._index,
            _ = A._ptr;for (u = 0; d > u; u++) {
          for (s = r[u], M[s] = -1 == v[w + s] ? 1 : 0; -1 != s && -1 == v[w + s]; s = t[s]) {
            v[w + s] = u;
          }
        }if (n) {
          for (u = 0; d > u; u++) {
            v[r[u]] = u;
          }for (o = 0; m > o; o++) {
            for (u = d, l = _[o], p = _[o + 1], f = l; p > f; f++) {
              u = Math.min(u, v[O[f]]);
            }v[E + o] = v[N + u], v[N + u] = o;
          }
        }for (o = 0; d > o; o++) {
          v[y + o] = o;
        }for (u = 0; d > u; u++) {
          for (s = r[u], -1 != t[s] && M[t[s]]--, c = n ? v[N + u] : s; -1 != c; c = n ? v[E + c] : -1) {
            for (f = _[c]; f < _[c + 1]; f++) {
              o = O[f];var T = a(o, s, v, w, x, b, y);T.jleaf >= 1 && M[s]++, 2 == T.jleaf && M[T.q]--;
            }
          }-1 != t[s] && (v[y + s] = t[s]);
        }for (s = 0; d > s; s++) {
          -1 != t[s] && (M[t[s]] += M[s]);
        }return M;
      };return o;
    }t.name = "cs_counts", t.path = "sparse", t.factory = n;
  }, function (e, t) {
    "use strict";
    function r() {
      var e = function e(_e6, t, r, n, i, a, o) {
        var s,
            u,
            c,
            f,
            l = 0;if (t >= _e6 || r[n + t] <= r[i + _e6]) return -1;if (r[i + _e6] = r[n + t], c = r[a + _e6], r[a + _e6] = t, -1 === c) l = 1, f = _e6;else {
          for (l = 2, f = c; f != r[o + f]; f = r[o + f]) {}for (s = c; s != f; s = u) {
            u = r[o + s], r[o + s] = f;
          }
        }return { jleaf: l, q: f };
      };return e;
    }t.name = "cs_leaf", t.path = "sparse", t.factory = r;
  }, function (e, t, r) {
    "use strict";
    function n(e, t, n) {
      var i = n(r(86)),
          a = n(r(81)),
          o = n(r(84)),
          s = n(r(64)),
          u = n(r(354)),
          c = n(r(355)),
          f = e.SparseMatrix,
          l = function l(e, t, r) {
        if (!e) return null;var n,
            l = e._size,
            p = l[1],
            h = 100,
            m = 100;t && (n = t.q, h = t.lnz || h, m = t.unz || m);var d,
            g,
            v = [],
            y = [],
            x = [],
            b = new f({ values: v, index: y, ptr: x, size: [p, p] }),
            w = [],
            N = [],
            E = [],
            M = new f({ values: w, index: N, ptr: E, size: [p, p] }),
            A = [],
            O = [],
            _ = [];for (d = 0; p > d; d++) {
          O[d] = 0, A[d] = -1, x[d + 1] = 0;
        }h = 0, m = 0;for (var T = 0; p > T; T++) {
          x[T] = h, E[T] = m;var C = n ? n[T] : T,
              S = c(b, e, C, _, O, A, 1),
              z = -1,
              B = -1;for (g = S; p > g; g++) {
            if (d = _[g], A[d] < 0) {
              var k = i(O[d]);s(k, B) && (B = k, z = d);
            } else N[m] = A[d], w[m++] = O[d];
          }if (-1 == z || 0 >= B) return null;A[C] < 0 && u(i(O[C]), o(B, r)) && (z = C);var I = O[z];for (N[m] = T, w[m++] = I, A[z] = T, y[h] = z, v[h++] = 1, g = S; p > g; g++) {
            d = _[g], A[d] < 0 && (y[h] = d, v[h++] = a(O[d], I)), O[d] = 0;
          }
        }for (x[p] = h, E[p] = m, g = 0; h > g; g++) {
          y[g] = A[y[g]];
        }return v.splice(h, v.length - h), y.splice(h, y.length - h), w.splice(m, w.length - m), N.splice(m, N.length - m), { L: b, U: M, pinv: A };
      };return l;
    }t.name = "cs_lu", t.path = "sparse", t.factory = n;
  }, function (e, t, r) {
    "use strict";
    function n(e, t, n, o) {
      var s = n(r(52)),
          u = n(r(61)),
          c = n(r(62)),
          f = n(r(63)),
          l = n(r(57)),
          p = n(r(58)),
          h = r(32),
          m = o("largerEq", { "boolean, boolean": function booleanBoolean(e, t) {
          return e >= t;
        }, "number, number": function numberNumber(e, r) {
          return e >= r || i(e, r, t.epsilon);
        }, "BigNumber, BigNumber": function BigNumberBigNumber(e, r) {
          return e.gte(r) || a(e, r, t.epsilon);
        }, "Fraction, Fraction": function FractionFraction(e, t) {
          return -1 !== e.compare(t);
        }, "Complex, Complex": function ComplexComplex() {
          throw new TypeError("No ordering relation is defined for complex numbers");
        }, "Unit, Unit": function UnitUnit(e, t) {
          if (!e.equalBase(t)) throw new Error("Cannot compare units with different base");return m(e.value, t.value);
        }, "string, string": function stringString(e, t) {
          return e >= t;
        }, "Matrix, Matrix": function MatrixMatrix(e, t) {
          var r;switch (e.storage()) {case "sparse":
              switch (t.storage()) {case "sparse":
                  r = c(e, t, m);break;default:
                  r = u(t, e, m, !0);}break;default:
              switch (t.storage()) {case "sparse":
                  r = u(e, t, m, !1);break;default:
                  r = l(e, t, m);}}return r;
        }, "Array, Array": function ArrayArray(e, t) {
          return m(s(e), s(t)).valueOf();
        }, "Array, Matrix": function ArrayMatrix(e, t) {
          return m(s(e), t);
        }, "Matrix, Array": function MatrixArray(e, t) {
          return m(e, s(t));
        }, "Matrix, any": function MatrixAny(e, t) {
          var r;switch (e.storage()) {case "sparse":
              r = f(e, t, m, !1);break;default:
              r = p(e, t, m, !1);}return r;
        }, "any, Matrix": function anyMatrix(e, t) {
          var r;switch (t.storage()) {case "sparse":
              r = f(t, e, m, !0);break;default:
              r = p(t, e, m, !0);}return r;
        }, "Array, any": function ArrayAny(e, t) {
          return p(s(e), t, m, !1).valueOf();
        }, "any, Array": function anyArray(e, t) {
          return p(s(t), e, m, !0).valueOf();
        } });return m.toTex = { 2: "\\left(${args[0]}" + h.operators.largerEq + "${args[1]}\\right)" }, m;
    }var i = r(6).nearlyEqual,
        a = r(49);t.name = "largerEq", t.factory = n;
  }, function (e, t, r) {
    "use strict";
    function n(e, t, n) {
      var i = n(r(81)),
          a = n(r(84)),
          o = n(r(77)),
          s = n(r(356)),
          u = function u(e, t, r, n, _u, c, f) {
        var l,
            p,
            h,
            m,
            d = e._values,
            g = e._index,
            v = e._ptr,
            y = e._size,
            x = y[1],
            b = t._values,
            w = t._index,
            N = t._ptr,
            E = s(e, t, r, n, c);for (l = E; x > l; l++) {
          _u[n[l]] = 0;
        }for (p = N[r], h = N[r + 1], l = p; h > l; l++) {
          _u[w[l]] = b[l];
        }for (var M = E; x > M; M++) {
          var A = n[M],
              O = c ? c[A] : A;if (!(0 > O)) for (p = v[O], h = v[O + 1], _u[A] = i(_u[A], d[f ? p : h - 1]), l = f ? p + 1 : p, m = f ? h : h - 1; m > l; l++) {
            var _ = g[l];_u[_] = o(_u[_], a(d[l], _u[A]));
          }
        }return E;
      };return u;
    }t.name = "cs_spsolve", t.path = "sparse", t.factory = n;
  }, function (e, t, r) {
    "use strict";
    function n(e, t, n) {
      var i = n(r(357)),
          a = n(r(358)),
          o = n(r(359)),
          s = function s(e, t, r, n, _s) {
        var u,
            c,
            f,
            l = e._ptr,
            p = e._size,
            h = t._index,
            m = t._ptr,
            d = p[1],
            g = d;for (c = m[r], f = m[r + 1], u = c; f > u; u++) {
          var v = h[u];a(l, v) || (g = i(v, e, g, n, _s));
        }for (u = g; d > u; u++) {
          o(l, n[u]);
        }return g;
      };return s;
    }t.name = "cs_reach", t.path = "sparse", t.factory = n;
  }, function (e, t, r) {
    "use strict";
    function n(e, t, n) {
      var i = n(r(358)),
          a = n(r(359)),
          o = n(r(360)),
          s = function s(e, t, r, n, _s2) {
        var u,
            c,
            f,
            l = t._index,
            p = t._ptr,
            h = t._size,
            m = h[1],
            d = 0;for (n[0] = e; d >= 0;) {
          e = n[d];var g = _s2 ? _s2[e] : e;i(p, e) || (a(p, e), n[m + d] = 0 > g ? 0 : o(p[g]));var v = 1;for (c = n[m + d], f = 0 > g ? 0 : o(p[g + 1]); f > c; c++) {
            if (u = l[c], !i(p, u)) {
              n[m + d] = c, n[++d] = u, v = 0;break;
            }
          }v && (d--, n[--r] = e);
        }return r;
      };return s;
    }t.name = "cs_dfs", t.path = "sparse", t.factory = n;
  }, function (e, t) {
    "use strict";
    function r() {
      var e = function e(_e7, t) {
        return _e7[t] < 0;
      };return e;
    }t.name = "cs_marked", t.path = "sparse", t.factory = r;
  }, function (e, t, r) {
    "use strict";
    function n(e, t, n) {
      var i = n(r(344)),
          a = function a(e, t) {
        e[t] = i(e[t]);
      };return a;
    }t.name = "cs_mark", t.path = "sparse", t.factory = n;
  }, function (e, t, r) {
    "use strict";
    function n(e, t, n) {
      var i = n(r(344)),
          a = function a(e) {
        return 0 > e ? i(e) : e;
      };return a;
    }t.name = "cs_unflip", t.path = "sparse", t.factory = n;
  }, function (e, t, r) {
    "use strict";
    function n(e, t, n, i) {
      var a = n(r(52)),
          o = n(r(81)),
          s = n(r(80)),
          u = n(r(77)),
          c = n(r(48)),
          f = n(r(362)),
          l = e.DenseMatrix,
          p = i("lsolve", { "SparseMatrix, Array | Matrix": function SparseMatrixArrayMatrix(e, t) {
          return m(e, t);
        }, "DenseMatrix, Array | Matrix": function DenseMatrixArrayMatrix(e, t) {
          return h(e, t);
        }, "Array, Array | Matrix": function ArrayArrayMatrix(e, t) {
          var r = a(e),
              n = h(r, t);return n.valueOf();
        } }),
          h = function h(e, t) {
        t = f(e, t, !0);for (var r = t._data, n = e._size[0], i = e._size[1], a = [], p = e._data, h = 0; i > h; h++) {
          var m,
              d = r[h][0] || 0;if (c(d, 0)) m = 0;else {
            var g = p[h][h];if (c(g, 0)) throw new Error("Linear system cannot be solved since matrix is singular");m = o(d, g);for (var v = h + 1; n > v; v++) {
              r[v] = [u(r[v][0] || 0, s(m, p[v][h]))];
            }
          }a[h] = [m];
        }return new l({ data: a, size: [n, 1] });
      },
          m = function m(e, t) {
        t = f(e, t, !0);for (var r, n, i = t._data, a = e._size[0], p = e._size[1], h = e._values, m = e._index, d = e._ptr, g = [], v = 0; p > v; v++) {
          var y = i[v][0] || 0;if (c(y, 0)) g[v] = [0];else {
            var x = 0,
                b = [],
                w = [],
                N = d[v + 1];for (n = d[v]; N > n; n++) {
              r = m[n], r === v ? x = h[n] : r > v && (b.push(h[n]), w.push(r));
            }if (c(x, 0)) throw new Error("Linear system cannot be solved since matrix is singular");var E = o(y, x);for (n = 0, N = w.length; N > n; n++) {
              r = w[n], i[r] = [u(i[r][0] || 0, s(E, b[n]))];
            }g[v] = [E];
          }
        }return new l({ data: g, size: [a, 1] });
      };return p;
    }t.name = "lsolve", t.factory = n;
  }, function (e, t, r) {
    "use strict";
    function n(e) {
      var t = e.DenseMatrix,
          r = function r(e, _r2, n) {
        var i = e.size();if (2 !== i.length) throw new RangeError("Matrix must be two dimensional (size: " + a.format(i) + ")");var u = i[0],
            c = i[1];if (u !== c) throw new RangeError("Matrix must be square (size: " + a.format(i) + ")");var f, l, p;if (_r2 && _r2.isMatrix === !0) {
          var h = _r2.size();if (1 === h.length) {
            if (h[0] !== u) throw new RangeError("Dimension mismatch. Matrix columns must match vector length.");for (f = [], p = _r2._data, l = 0; u > l; l++) {
              f[l] = [p[l]];
            }return new t({ data: f, size: [u, 1], datatype: _r2._datatype });
          }if (2 === h.length) {
            if (h[0] !== u || 1 !== h[1]) throw new RangeError("Dimension mismatch. Matrix columns must match vector length.");if (_r2.isDenseMatrix === !0) {
              if (n) {
                for (f = [], p = _r2._data, l = 0; u > l; l++) {
                  f[l] = [p[l][0]];
                }return new t({ data: f, size: [u, 1], datatype: _r2._datatype });
              }return _r2;
            }for (f = [], l = 0; u > l; l++) {
              f[l] = [0];
            }for (var m = _r2._values, d = _r2._index, g = _r2._ptr, v = g[1], y = g[0]; v > y; y++) {
              l = d[y], f[l][0] = m[y];
            }return new t({ data: f, size: [u, 1], datatype: _r2._datatype });
          }throw new RangeError("Dimension mismatch. Matrix columns must match vector length.");
        }if (s(_r2)) {
          var x = o.size(_r2);if (1 === x.length) {
            if (x[0] !== u) throw new RangeError("Dimension mismatch. Matrix columns must match vector length.");for (f = [], l = 0; u > l; l++) {
              f[l] = [_r2[l]];
            }return new t({ data: f, size: [u, 1] });
          }if (2 === x.length) {
            if (x[0] !== u || 1 !== x[1]) throw new RangeError("Dimension mismatch. Matrix columns must match vector length.");for (f = [], l = 0; u > l; l++) {
              f[l] = [_r2[l][0]];
            }return new t({ data: f, size: [u, 1] });
          }throw new RangeError("Dimension mismatch. Matrix columns must match vector length.");
        }
      };return r;
    }var i = r(39),
        a = i.string,
        o = i.array,
        s = Array.isArray;t.factory = n;
  }, function (e, t, r) {
    "use strict";
    function n(e, t, n, a) {
      var o = n(r(52)),
          s = n(r(340)),
          u = n(r(341)),
          c = n(r(364)),
          f = n(r(362)),
          l = n(r(365)),
          p = n(r(361)),
          h = a("lusolve", { "Array, Array | Matrix": function ArrayArrayMatrix(e, t) {
          e = o(e);var r = s(e),
              n = d(r.L, r.U, r.p, null, t);return n.valueOf();
        }, "DenseMatrix, Array | Matrix": function DenseMatrixArrayMatrix(e, t) {
          var r = s(e);return d(r.L, r.U, r.p, null, t);
        }, "SparseMatrix, Array | Matrix": function SparseMatrixArrayMatrix(e, t) {
          var r = s(e);return d(r.L, r.U, r.p, null, t);
        }, "SparseMatrix, Array | Matrix, number, number": function SparseMatrixArrayMatrixNumberNumber(e, t, r, n) {
          var i = u(e, r, n);return d(i.L, i.U, i.p, i.q, t);
        }, "Object, Array | Matrix": function ObjectArrayMatrix(e, t) {
          return d(e.L, e.U, e.p, e.q, t);
        } }),
          m = function m(e) {
        if (e && e.isMatrix === !0) return e;if (i(e)) return o(e);throw new TypeError("Invalid Matrix LU decomposition");
      },
          d = function d(e, t, r, n, i) {
        e = m(e), t = m(t), i = f(e, i, !1), r && (i._data = c(r, i._data));var a = p(e, i),
            o = l(t, a);return n && (o._data = c(n, o._data)), o;
      };return h;
    }var i = Array.isArray;t.name = "lusolve", t.factory = n;
  }, function (e, t) {
    "use strict";
    function r() {
      var e = function e(_e8, t, r) {
        var n,
            r = t.length,
            i = [];if (_e8) for (n = 0; r > n; n++) {
          i[_e8[n]] = t[n];
        } else for (n = 0; r > n; n++) {
          i[n] = t[n];
        }return i;
      };return e;
    }t.name = "cs_ipvec", t.path = "sparse", t.factory = r;
  }, function (e, t, r) {
    "use strict";
    function n(e, t, n, i) {
      var a = n(r(52)),
          o = n(r(81)),
          s = n(r(80)),
          u = n(r(77)),
          c = n(r(48)),
          f = n(r(362)),
          l = e.DenseMatrix,
          p = i("usolve", { "SparseMatrix, Array | Matrix": function SparseMatrixArrayMatrix(e, t) {
          return m(e, t);
        }, "DenseMatrix, Array | Matrix": function DenseMatrixArrayMatrix(e, t) {
          return h(e, t);
        }, "Array, Array | Matrix": function ArrayArrayMatrix(e, t) {
          var r = a(e),
              n = h(r, t);return n.valueOf();
        } }),
          h = function h(e, t) {
        t = f(e, t, !0);for (var r = t._data, n = e._size[0], i = e._size[1], a = [], p = e._data, h = i - 1; h >= 0; h--) {
          var m,
              d = r[h][0] || 0;if (c(d, 0)) m = 0;else {
            var g = p[h][h];if (c(g, 0)) throw new Error("Linear system cannot be solved since matrix is singular");m = o(d, g);for (var v = h - 1; v >= 0; v--) {
              r[v] = [u(r[v][0] || 0, s(m, p[v][h]))];
            }
          }a[h] = [m];
        }return new l({ data: a, size: [n, 1] });
      },
          m = function m(e, t) {
        t = f(e, t, !0);for (var r, n, i = t._data, a = e._size[0], p = e._size[1], h = e._values, m = e._index, d = e._ptr, g = [], v = p - 1; v >= 0; v--) {
          var y = i[v][0] || 0;if (c(y, 0)) g[v] = [0];else {
            var x = 0,
                b = [],
                w = [],
                N = d[v],
                E = d[v + 1];for (n = E - 1; n >= N; n--) {
              r = m[n], r === v ? x = h[n] : v > r && (b.push(h[n]), w.push(r));
            }if (c(x, 0)) throw new Error("Linear system cannot be solved since matrix is singular");var M = o(y, x);for (n = 0, E = w.length; E > n; n++) {
              r = w[n], i[r] = [u(i[r][0], s(M, b[n]))];
            }g[v] = [M];
          }
        }return new l({ data: g, size: [a, 1] });
      };return p;
    }t.name = "usolve", t.factory = n;
  }, function (e, t, r) {
    e.exports = [r(86), r(51), r(53), r(367), r(369), r(370), r(329), r(371), r(373), r(375), r(376), r(87), r(377), r(378), r(379), r(382), r(385), r(386), r(387), r(84), r(388), r(390), r(82), r(391), r(393), r(380), r(394), r(77), r(78), r(395), r(396)];
  }, function (e, t, r) {
    "use strict";
    function n(e, t, n, o) {
      function s(r, n) {
        var i = r.arg() / 3,
            o = r.abs(),
            s = new e.Complex(a(o), 0).mul(new e.Complex(0, i).exp());if (n) {
          var u = [s, new e.Complex(a(o), 0).mul(new e.Complex(0, i + 2 * Math.PI / 3).exp()), new e.Complex(a(o), 0).mul(new e.Complex(0, i - 2 * Math.PI / 3).exp())];return "Array" === t.matrix ? u : l(u);
        }return s;
      }function u(t) {
        if (t.value && t.value.isComplex) {
          var r = t.clone();return r.value = 1, r = r.pow(1 / 3), r.value = s(t.value), r;
        }var n = f(t.value);n && (t.value = c(t.value));var i;i = t.value && t.value.isBigNumber ? new e.BigNumber(1).div(3) : t.value && t.value.isFraction ? new e.Fraction(1, 3) : 1 / 3;var r = t.pow(i);return n && (r.value = c(r.value)), r;
      }var c = n(r(78)),
          f = n(r(368)),
          l = n(r(52)),
          p = o("cbrt", { number: a, Complex: s, "Complex, boolean": s, BigNumber: function BigNumber(e) {
          return e.cbrt();
        }, Unit: u, "Array | Matrix": function ArrayMatrix(e) {
          return i(e, p, !0);
        } });return p.toTex = { 1: "\\sqrt[3]{${args[0]}}" }, p;
    }var i = r(19),
        a = Math.cbrt || function (e) {
      if (0 === e) return e;var t,
          r = 0 > e;return r && (e = -e), isFinite(e) ? (t = Math.exp(Math.log(e) / 3), t = (e / (t * t) + 2 * t) / 3) : t = e, r ? -t : t;
    };t.name = "cbrt", t.factory = n;
  }, function (e, t, r) {
    "use strict";
    function n(e, t, r, n) {
      var a = n("isNegative", { number: function number(e) {
          return 0 > e;
        }, BigNumber: function BigNumber(e) {
          return e.isNeg() && !e.isZero() && !e.isNaN();
        }, Fraction: function Fraction(e) {
          return e.s < 0;
        }, Unit: function Unit(e) {
          return a(e.value);
        }, "Array | Matrix": function ArrayMatrix(e) {
          return i(e, a);
        } });return a;
    }var i = r(19);r(6);t.name = "isNegative", t.factory = n;
  }, function (e, t, r) {
    "use strict";
    function n(e, t, r, n) {
      var a = n("ceil", { number: Math.ceil, Complex: function Complex(e) {
          return e.ceil();
        }, BigNumber: function BigNumber(e) {
          return e.ceil();
        }, Fraction: function Fraction(e) {
          return e.ceil();
        }, "Array | Matrix": function ArrayMatrix(e) {
          return i(e, a, !0);
        } });return a.toTex = { 1: "\\left\\lceil${args[0]}\\right\\rceil" }, a;
    }var i = r(19);t.name = "ceil", t.factory = n;
  }, function (e, t, r) {
    "use strict";
    function n(e, t, r, n) {
      var a = n("cube", { number: function number(e) {
          return e * e * e;
        }, Complex: function Complex(e) {
          return e.mul(e).mul(e);
        }, BigNumber: function BigNumber(e) {
          return e.times(e).times(e);
        }, Fraction: function Fraction(e) {
          return e.pow(3);
        }, "Array | Matrix": function ArrayMatrix(e) {
          return i(e, a, !0);
        }, Unit: function Unit(e) {
          return e.pow(3);
        } });return a.toTex = { 1: "\\left(${args[0]}\\right)^3" }, a;
    }var i = r(19);t.name = "cube", t.factory = n;
  }, function (e, t, r) {
    "use strict";
    function n(e, t, n, i) {
      var a = n(r(52)),
          o = n(r(81)),
          s = r(32),
          u = n(r(372)),
          c = n(r(61)),
          f = n(r(62)),
          l = n(r(85)),
          p = n(r(63)),
          h = n(r(57)),
          m = n(r(58)),
          d = i("dotDivide", { "any, any": o, "Matrix, Matrix": function MatrixMatrix(e, t) {
          var r;switch (e.storage()) {case "sparse":
              switch (t.storage()) {case "sparse":
                  r = f(e, t, o, !1);break;default:
                  r = u(t, e, o, !0);}break;default:
              switch (t.storage()) {case "sparse":
                  r = c(e, t, o, !1);break;default:
                  r = h(e, t, o);}}return r;
        }, "Array, Array": function ArrayArray(e, t) {
          return d(a(e), a(t)).valueOf();
        }, "Array, Matrix": function ArrayMatrix(e, t) {
          return d(a(e), t);
        }, "Matrix, Array": function MatrixArray(e, t) {
          return d(e, a(t));
        }, "Matrix, any": function MatrixAny(e, t) {
          var r;switch (e.storage()) {case "sparse":
              r = l(e, t, o, !1);break;default:
              r = m(e, t, o, !1);}return r;
        }, "any, Matrix": function anyMatrix(e, t) {
          var r;switch (t.storage()) {case "sparse":
              r = p(t, e, o, !0);break;default:
              r = m(t, e, o, !0);}return r;
        }, "Array, any": function ArrayAny(e, t) {
          return m(a(e), t, o, !1).valueOf();
        }, "any, Array": function anyArray(e, t) {
          return m(a(t), e, o, !0).valueOf();
        } });return d.toTex = { 2: "\\left(${args[0]}" + s.operators.dotDivide + "${args[1]}\\right)" }, d;
    }t.name = "dotDivide", t.factory = n;
  }, function (e, t, r) {
    "use strict";
    function n(e, t, n, a) {
      var o = n(r(48)),
          s = e.SparseMatrix,
          u = function u(e, t, r, n) {
        var u = e._data,
            c = e._size,
            f = e._datatype,
            l = t._values,
            p = t._index,
            h = t._ptr,
            m = t._size,
            d = t._datatype;if (c.length !== m.length) throw new i(c.length, m.length);if (c[0] !== m[0] || c[1] !== m[1]) throw new RangeError("Dimension mismatch. Matrix A (" + c + ") must match Matrix B (" + m + ")");if (!l) throw new Error("Cannot perform operation on Dense Matrix and Pattern Sparse Matrix");var g,
            v = c[0],
            y = c[1],
            x = o,
            b = 0,
            w = r;"string" == typeof f && f === d && (g = f, x = a.find(o, [g, g]), b = a.convert(0, g), w = a.find(r, [g, g]));for (var N = [], E = [], M = [], A = 0; y > A; A++) {
          M[A] = E.length;for (var O = h[A], _ = h[A + 1], T = O; _ > T; T++) {
            var C = p[T],
                S = n ? w(l[T], u[C][A]) : w(u[C][A], l[T]);x(S, b) || (E.push(C), N.push(S));
          }
        }return M[y] = E.length, new s({ values: N, index: E, ptr: M, size: [v, y], datatype: g });
      };return u;
    }var i = r(42);t.name = "algorithm02", t.factory = n;
  }, function (e, t, r) {
    "use strict";
    function n(e, t, n, i) {
      var a = n(r(52)),
          o = n(r(80)),
          s = r(32),
          u = n(r(372)),
          c = n(r(374)),
          f = n(r(85)),
          l = n(r(57)),
          p = n(r(58)),
          h = i("dotMultiply", { "any, any": o, "Matrix, Matrix": function MatrixMatrix(e, t) {
          var r;switch (e.storage()) {case "sparse":
              switch (t.storage()) {case "sparse":
                  r = c(e, t, o, !1);break;default:
                  r = u(t, e, o, !0);}break;default:
              switch (t.storage()) {case "sparse":
                  r = u(e, t, o, !1);break;default:
                  r = l(e, t, o);}}return r;
        }, "Array, Array": function ArrayArray(e, t) {
          return h(a(e), a(t)).valueOf();
        }, "Array, Matrix": function ArrayMatrix(e, t) {
          return h(a(e), t);
        }, "Matrix, Array": function MatrixArray(e, t) {
          return h(e, a(t));
        }, "Matrix, any": function MatrixAny(e, t) {
          var r;switch (e.storage()) {case "sparse":
              r = f(e, t, o, !1);break;default:
              r = p(e, t, o, !1);}return r;
        }, "any, Matrix": function anyMatrix(e, t) {
          var r;switch (t.storage()) {case "sparse":
              r = f(t, e, o, !0);break;default:
              r = p(t, e, o, !0);}return r;
        }, "Array, any": function ArrayAny(e, t) {
          return p(a(e), t, o, !1).valueOf();
        }, "any, Array": function anyArray(e, t) {
          return p(a(t), e, o, !0).valueOf();
        } });return h.toTex = { 2: "\\left(${args[0]}" + s.operators.dotMultiply + "${args[1]}\\right)" }, h;
    }t.name = "dotMultiply", t.factory = n;
  }, function (e, t, r) {
    "use strict";
    function n(e, t, n, a) {
      var o = n(r(48)),
          s = e.SparseMatrix,
          u = function u(e, t, r) {
        var n = e._values,
            u = e._index,
            c = e._ptr,
            f = e._size,
            l = e._datatype,
            p = t._values,
            h = t._index,
            m = t._ptr,
            d = t._size,
            g = t._datatype;if (f.length !== d.length) throw new i(f.length, d.length);if (f[0] !== d[0] || f[1] !== d[1]) throw new RangeError("Dimension mismatch. Matrix A (" + f + ") must match Matrix B (" + d + ")");var v,
            y = f[0],
            x = f[1],
            b = o,
            w = 0,
            N = r;"string" == typeof l && l === g && (v = l, b = a.find(o, [v, v]), w = a.convert(0, v), N = a.find(r, [v, v]));var E,
            M,
            A,
            O,
            _,
            T = n && p ? [] : void 0,
            C = [],
            S = [],
            z = new s({ values: T, index: C, ptr: S, size: [y, x], datatype: v }),
            B = T ? [] : void 0,
            k = [];for (M = 0; x > M; M++) {
          S[M] = C.length;var I = M + 1;if (B) for (O = m[M], _ = m[M + 1], A = O; _ > A; A++) {
            E = h[A], k[E] = I, B[E] = p[A];
          }for (O = c[M], _ = c[M + 1], A = O; _ > A; A++) {
            if (E = u[A], B) {
              var P = k[E] === I ? B[E] : w,
                  R = N(n[A], P);b(R, w) || (C.push(E), T.push(R));
            } else C.push(E);
          }
        }return S[x] = C.length, z;
      };return u;
    }var i = r(42);t.name = "algorithm09", t.factory = n;
  }, function (e, t, r) {
    "use strict";
    function n(e, t, n, i) {
      var a = n(r(52)),
          o = n(r(82)),
          s = r(32),
          u = n(r(61)),
          c = n(r(62)),
          f = n(r(85)),
          l = n(r(63)),
          p = n(r(57)),
          h = n(r(58)),
          m = i("dotPow", { "any, any": o, "Matrix, Matrix": function MatrixMatrix(e, t) {
          var r;switch (e.storage()) {case "sparse":
              switch (t.storage()) {case "sparse":
                  r = c(e, t, o, !1);break;default:
                  r = u(t, e, o, !0);}break;default:
              switch (t.storage()) {case "sparse":
                  r = u(e, t, o, !1);break;default:
                  r = p(e, t, o);}}return r;
        }, "Array, Array": function ArrayArray(e, t) {
          return m(a(e), a(t)).valueOf();
        }, "Array, Matrix": function ArrayMatrix(e, t) {
          return m(a(e), t);
        }, "Matrix, Array": function MatrixArray(e, t) {
          return m(e, a(t));
        }, "Matrix, any": function MatrixAny(e, t) {
          var r;switch (e.storage()) {case "sparse":
              r = f(e, t, m, !1);break;default:
              r = h(e, t, m, !1);}return r;
        }, "any, Matrix": function anyMatrix(e, t) {
          var r;switch (t.storage()) {case "sparse":
              r = l(t, e, m, !0);break;default:
              r = h(t, e, m, !0);}return r;
        }, "Array, any": function ArrayAny(e, t) {
          return h(a(e), t, m, !1).valueOf();
        }, "any, Array": function anyArray(e, t) {
          return h(a(t), e, m, !0).valueOf();
        } });return m.toTex = { 2: "\\left(${args[0]}" + s.operators.dotPow + "${args[1]}\\right)" }, m;
    }t.name = "dotPow", t.factory = n;
  }, function (e, t, r) {
    "use strict";
    function n(e, t, r, n) {
      var a = n("exp", { number: Math.exp, Complex: function Complex(e) {
          return e.exp();
        }, BigNumber: function BigNumber(e) {
          return e.exp();
        }, "Array | Matrix": function ArrayMatrix(e) {
          return i(e, a);
        } });return a.toTex = { 1: "\\exp\\left(${args[0]}\\right)" }, a;
    }var i = r(19);t.name = "exp", t.factory = n;
  }, function (e, t, r) {
    "use strict";
    function n(e, t, r, n) {
      var a = n("floor", { number: Math.floor, Complex: function Complex(e) {
          return e.floor();
        }, BigNumber: function BigNumber(e) {
          return e.floor();
        }, Fraction: function Fraction(e) {
          return e.floor();
        }, "Array | Matrix": function ArrayMatrix(e) {
          return i(e, a, !0);
        } });return a.toTex = { 1: "\\left\\lfloor${args[0]}\\right\\rfloor" }, a;
    }var i = r(19);t.name = "floor", t.factory = n;
  }, function (e, t, r) {
    "use strict";
    function n(e, t, n, a) {
      function o(t, r) {
        if (!t.isInt() || !r.isInt()) throw new Error("Parameters in function gcd must be integer numbers");for (var n = new e.BigNumber(0); !r.isZero();) {
          var i = t.mod(r);t = r, r = i;
        }return t.lt(n) ? t.neg() : t;
      }var s = n(r(52)),
          u = n(r(54)),
          c = n(r(55)),
          f = n(r(56)),
          l = n(r(57)),
          p = n(r(58)),
          h = a("gcd", { "number, number": i, "BigNumber, BigNumber": o, "Fraction, Fraction": function FractionFraction(e, t) {
          return e.gcd(t);
        }, "Matrix, Matrix": function MatrixMatrix(e, t) {
          var r;switch (e.storage()) {case "sparse":
              switch (t.storage()) {case "sparse":
                  r = c(e, t, h);break;default:
                  r = u(t, e, h, !0);}break;default:
              switch (t.storage()) {case "sparse":
                  r = u(e, t, h, !1);break;default:
                  r = l(e, t, h);}}return r;
        }, "Array, Array": function ArrayArray(e, t) {
          return h(s(e), s(t)).valueOf();
        }, "Array, Matrix": function ArrayMatrix(e, t) {
          return h(s(e), t);
        }, "Matrix, Array": function MatrixArray(e, t) {
          return h(e, s(t));
        }, "Matrix, number | BigNumber": function MatrixNumberBigNumber(e, t) {
          var r;switch (e.storage()) {case "sparse":
              r = f(e, t, h, !1);break;default:
              r = p(e, t, h, !1);}return r;
        }, "number | BigNumber, Matrix": function numberBigNumberMatrix(e, t) {
          var r;switch (t.storage()) {case "sparse":
              r = f(t, e, h, !0);break;default:
              r = p(t, e, h, !0);}return r;
        }, "Array, number | BigNumber": function ArrayNumberBigNumber(e, t) {
          return p(s(e), t, h, !1).valueOf();
        }, "number | BigNumber, Array": function numberBigNumberArray(e, t) {
          return p(s(t), e, h, !0).valueOf();
        }, "Array | Matrix | number | BigNumber, Array | Matrix | number | BigNumber, ...Array | Matrix | number | BigNumber": function ArrayMatrixNumberBigNumberArrayMatrixNumberBigNumberArrayMatrixNumberBigNumber(e, t, r) {
          for (var n = h(e, t), i = 0; i < r.length; i++) {
            n = h(n, r[i]);
          }return n;
        } });return h.toTex = "\\gcd\\left(${args}\\right)", h;
    }function i(e, t) {
      if (!a(e) || !a(t)) throw new Error("Parameters in function gcd must be integer numbers");for (var r; 0 != t;) {
        r = e % t, e = t, t = r;
      }return 0 > e ? -e : e;
    }var a = r(6).isInteger;t.name = "gcd", t.factory = n;
  }, function (e, t, r) {
    "use strict";
    function n(e, t, n, a) {
      function o(e) {
        for (var t = 0, r = 0, n = 0; n < e.length; n++) {
          var i = s(e[n]);p(r, i) ? (t = f(t, f(c(r, i), c(r, i))), t = u(t, 1), r = i) : t = u(t, h(i) ? f(c(i, r), c(i, r)) : i);
        }return f(r, l(t));
      }var s = n(r(86)),
          u = n(r(53)),
          c = n(r(81)),
          f = n(r(80)),
          l = n(r(380)),
          p = n(r(60)),
          h = n(r(381)),
          m = a("hypot", { "... number | BigNumber": o, Array: function Array(e) {
          return m.apply(m, i(e));
        }, Matrix: function Matrix(e) {
          return m.apply(m, i(e.toArray()));
        } });return m.toTex = "\\hypot\\left(${args}\\right)", m;
    }var i = r(40).flatten;t.name = "hypot", t.factory = n;
  }, function (e, t, r) {
    "use strict";
    function n(e, t, r, n) {
      function a(r) {
        return r >= 0 || t.predictable ? Math.sqrt(r) : new e.Complex(r, 0).sqrt();
      }var o = n("sqrt", { number: a, Complex: function Complex(e) {
          return e.sqrt();
        }, BigNumber: function BigNumber(e) {
          return !e.isNegative() || t.predictable ? e.sqrt() : a(e.toNumber());
        }, "Array | Matrix": function ArrayMatrix(e) {
          return i(e, o, !0);
        }, Unit: function Unit(e) {
          return e.pow(.5);
        } });return o.toTex = { 1: "\\sqrt{${args[0]}}" }, o;
    }var i = r(19);t.name = "sqrt", t.factory = n;
  }, function (e, t, r) {
    "use strict";
    function n(e, t, r, n) {
      var a = n("isPositive", { number: function number(e) {
          return e > 0;
        }, BigNumber: function BigNumber(e) {
          return !e.isNeg() && !e.isZero() && !e.isNaN();
        }, Fraction: function Fraction(e) {
          return e.s > 0 && e.n > 0;
        }, Unit: function Unit(e) {
          return a(e.value);
        }, "Array | Matrix": function ArrayMatrix(e) {
          return i(e, a);
        } });return a;
    }var i = r(19);r(6);t.name = "isPositive", t.factory = n;
  }, function (e, t, r) {
    "use strict";
    function n(e, t, n, a) {
      function o(t, r) {
        if (!t.isInt() || !r.isInt()) throw new Error("Parameters in function lcm must be integer numbers");if (t.isZero() || r.isZero()) return new e.BigNumber(0);for (var n = t.times(r); !r.isZero();) {
          var i = r;r = t.mod(i), t = i;
        }return n.div(t).abs();
      }var s = n(r(52)),
          u = n(r(372)),
          c = n(r(383)),
          f = n(r(85)),
          l = n(r(57)),
          p = n(r(58)),
          h = a("lcm", { "number, number": i, "BigNumber, BigNumber": o, "Fraction, Fraction": function FractionFraction(e, t) {
          return e.lcm(t);
        }, "Matrix, Matrix": function MatrixMatrix(e, t) {
          var r;switch (e.storage()) {case "sparse":
              switch (t.storage()) {case "sparse":
                  r = c(e, t, h);break;default:
                  r = u(t, e, h, !0);}break;default:
              switch (t.storage()) {case "sparse":
                  r = u(e, t, h, !1);break;default:
                  r = l(e, t, h);}}return r;
        }, "Array, Array": function ArrayArray(e, t) {
          return h(s(e), s(t)).valueOf();
        }, "Array, Matrix": function ArrayMatrix(e, t) {
          return h(s(e), t);
        }, "Matrix, Array": function MatrixArray(e, t) {
          return h(e, s(t));
        }, "Matrix, number | BigNumber": function MatrixNumberBigNumber(e, t) {
          var r;switch (e.storage()) {case "sparse":
              r = f(e, t, h, !1);break;default:
              r = p(e, t, h, !1);}return r;
        }, "number | BigNumber, Matrix": function numberBigNumberMatrix(e, t) {
          var r;switch (t.storage()) {case "sparse":
              r = f(t, e, h, !0);break;default:
              r = p(t, e, h, !0);}return r;
        }, "Array, number | BigNumber": function ArrayNumberBigNumber(e, t) {
          return p(s(e), t, h, !1).valueOf();
        }, "number | BigNumber, Array": function numberBigNumberArray(e, t) {
          return p(s(t), e, h, !0).valueOf();
        }, "Array | Matrix | number | BigNumber, Array | Matrix | number | BigNumber, ...Array | Matrix | number | BigNumber": function ArrayMatrixNumberBigNumberArrayMatrixNumberBigNumberArrayMatrixNumberBigNumber(e, t, r) {
          for (var n = h(e, t), i = 0; i < r.length; i++) {
            n = h(n, r[i]);
          }return n;
        } });return h.toTex = void 0, h;
    }function i(e, t) {
      if (!a(e) || !a(t)) throw new Error("Parameters in function lcm must be integer numbers");if (0 == e || 0 == t) return 0;for (var r, n = e * t; 0 != t;) {
        r = t, t = e % r, e = r;
      }return Math.abs(n / e);
    }var a = r(6).isInteger;t.name = "lcm", t.factory = n;
  }, function (e, t, r) {
    "use strict";
    function n(e, t, n, o) {
      var s = n(r(48)),
          u = e.SparseMatrix,
          c = function c(e, t, r) {
        var n = e._values,
            c = e._size,
            f = e._datatype,
            l = t._values,
            p = t._size,
            h = t._datatype;if (c.length !== p.length) throw new a(c.length, p.length);if (c[0] !== p[0] || c[1] !== p[1]) throw new RangeError("Dimension mismatch. Matrix A (" + c + ") must match Matrix B (" + p + ")");var m,
            d = c[0],
            g = c[1],
            v = s,
            y = 0,
            x = r;"string" == typeof f && f === h && (m = f, v = o.find(s, [m, m]), y = o.convert(0, m), x = o.find(r, [m, m]));for (var b = n && l ? [] : void 0, w = [], N = [], E = new u({ values: b, index: w, ptr: N, size: [d, g], datatype: m }), M = b ? [] : void 0, A = [], O = [], _ = 0; g > _; _++) {
          N[_] = w.length;var T = _ + 1;if (i(e, _, A, M, O, T, E, x), i(t, _, A, M, O, T, E, x), M) for (var C = N[_]; C < w.length;) {
            var S = w[C];if (O[S] === T) {
              var z = M[S];v(z, y) ? w.splice(C, 1) : (b.push(z), C++);
            } else w.splice(C, 1);
          } else for (var B = N[_]; B < w.length;) {
            var k = w[B];O[k] !== T ? w.splice(B, 1) : B++;
          }
        }return N[g] = w.length, E;
      };return c;
    }var i = r(384),
        a = r(42);t.name = "algorithm06", t.factory = n;
  }, function (e, t) {
    "use strict";
    e.exports = function (e, t, r, n, i, a, o, s, u, c, f) {
      var l,
          p,
          h,
          m,
          d = e._values,
          g = e._index,
          v = e._ptr,
          y = o._index;if (n) for (p = v[t], h = v[t + 1], l = p; h > l; l++) {
        m = g[l], r[m] !== a ? (r[m] = a, y.push(m), c ? (n[m] = u ? s(d[l], f) : s(f, d[l]), i[m] = a) : n[m] = d[l]) : (n[m] = u ? s(d[l], n[m]) : s(n[m], d[l]), i[m] = a);
      } else for (p = v[t], h = v[t + 1], l = p; h > l; l++) {
        m = g[l], r[m] !== a ? (r[m] = a, y.push(m)) : i[m] = a;
      }
    };
  }, function (e, t, r) {
    "use strict";
    function n(e, t, n, a) {
      var o = n(r(81)),
          s = a("log", { number: function number(r) {
          return r >= 0 || t.predictable ? Math.log(r) : new e.Complex(r, 0).log();
        }, Complex: function Complex(e) {
          return e.log();
        }, BigNumber: function BigNumber(r) {
          return !r.isNegative() || t.predictable ? r.ln() : new e.Complex(r.toNumber(), 0).log();
        }, "Array | Matrix": function ArrayMatrix(e) {
          return i(e, s);
        }, "any, any": function anyAny(e, t) {
          return o(s(e), s(t));
        } });return s.toTex = { 1: "\\ln\\left(${args[0]}\\right)", 2: "\\log_{${args[1]}}\\left(${args[0]}\\right)" }, s;
    }var i = r(19);t.name = "log", t.factory = n;
  }, function (e, t, r) {
    "use strict";
    function n(e, t, r, n) {
      var o = n("log10", { number: function number(r) {
          return r >= 0 || t.predictable ? a(r) : new e.Complex(r, 0).log().div(Math.LN10);
        }, Complex: function Complex(t) {
          return new e.Complex(t).log().div(Math.LN10);
        }, BigNumber: function BigNumber(r) {
          return !r.isNegative() || t.predictable ? r.log() : new e.Complex(r.toNumber(), 0).log().div(Math.LN10);
        }, "Array | Matrix": function ArrayMatrix(e) {
          return i(e, o);
        } });return o.toTex = { 1: "\\log_{10}\\left(${args[0]}\\right)" }, o;
    }var i = r(19),
        a = Math.log10 || function (e) {
      return Math.log(e) / Math.LN10;
    };t.name = "log10", t.factory = n;
  }, function (e, t, r) {
    "use strict";
    function n(e, t, n, i) {
      function a(e, t) {
        if (t > 0) return e - t * Math.floor(e / t);if (0 === t) return e;throw new Error("Cannot calculate mod for a negative divisor");
      }var o = n(r(52)),
          s = r(32),
          u = n(r(372)),
          c = n(r(61)),
          f = n(r(79)),
          l = n(r(85)),
          p = n(r(63)),
          h = n(r(57)),
          m = n(r(58)),
          d = i("mod", { "number, number": a, "BigNumber, BigNumber": function BigNumberBigNumber(e, t) {
          return t.isZero() ? e : e.mod(t);
        }, "Fraction, Fraction": function FractionFraction(e, t) {
          return e.mod(t);
        }, "Matrix, Matrix": function MatrixMatrix(e, t) {
          var r;switch (e.storage()) {case "sparse":
              switch (t.storage()) {case "sparse":
                  r = f(e, t, d, !1);break;default:
                  r = u(t, e, d, !0);}break;default:
              switch (t.storage()) {case "sparse":
                  r = c(e, t, d, !1);break;default:
                  r = h(e, t, d);}}return r;
        }, "Array, Array": function ArrayArray(e, t) {
          return d(o(e), o(t)).valueOf();
        }, "Array, Matrix": function ArrayMatrix(e, t) {
          return d(o(e), t);
        }, "Matrix, Array": function MatrixArray(e, t) {
          return d(e, o(t));
        }, "Matrix, any": function MatrixAny(e, t) {
          var r;switch (e.storage()) {case "sparse":
              r = l(e, t, d, !1);break;default:
              r = m(e, t, d, !1);}return r;
        }, "any, Matrix": function anyMatrix(e, t) {
          var r;switch (t.storage()) {case "sparse":
              r = p(t, e, d, !0);break;default:
              r = m(t, e, d, !0);}return r;
        }, "Array, any": function ArrayAny(e, t) {
          return m(o(e), t, d, !1).valueOf();
        }, "any, Array": function anyArray(e, t) {
          return m(o(t), e, d, !0).valueOf();
        } });return d.toTex = { 2: "\\left(${args[0]}" + s.operators.mod + "${args[1]}\\right)" }, d;
    }t.name = "mod", t.factory = n;
  }, function (e, t, r) {
    "use strict";
    function n(e, t, n, i) {
      function a(e, t) {
        var r = e.size();if (1 == r.length) {
          if (t === Number.POSITIVE_INFINITY || "inf" === t) {
            var n = 0;return e.forEach(function (e) {
              var t = o(e);
              p(t, n) && (n = t);
            }, !0), n;
          }if (t === Number.NEGATIVE_INFINITY || "-inf" === t) {
            var i;return e.forEach(function (e) {
              var t = o(e);i && !h(t, i) || (i = t);
            }, !0), i || 0;
          }if ("fro" === t) return a(e, 2);if ("number" == typeof t && !isNaN(t)) {
            if (!l(t, 0)) {
              var m = 0;return e.forEach(function (e) {
                m = s(u(o(e), t), m);
              }, !0), u(m, 1 / t);
            }return Number.POSITIVE_INFINITY;
          }throw new Error("Unsupported parameter value");
        }if (2 == r.length) {
          if (1 === t) {
            var v = [],
                y = 0;return e.forEach(function (e, t) {
              var r = t[1],
                  n = s(v[r] || 0, o(e));p(n, y) && (y = n), v[r] = n;
            }, !0), y;
          }if (t === Number.POSITIVE_INFINITY || "inf" === t) {
            var x = [],
                b = 0;return e.forEach(function (e, t) {
              var r = t[0],
                  n = s(x[r] || 0, o(e));p(n, b) && (b = n), x[r] = n;
            }, !0), b;
          }if ("fro" === t) return c(d(f(g(e), e)));if (2 === t) throw new Error("Unsupported parameter value, missing implementation of matrix singular value decomposition");throw new Error("Unsupported parameter value");
        }
      }var o = n(r(86)),
          s = n(r(51)),
          u = n(r(82)),
          c = n(r(380)),
          f = n(r(84)),
          l = n(r(48)),
          p = n(r(64)),
          h = n(r(60)),
          m = n(r(52)),
          d = n(r(389)),
          g = n(r(347)),
          v = i("norm", { number: Math.abs, Complex: function Complex(e) {
          return e.abs();
        }, BigNumber: function BigNumber(e) {
          return e.abs();
        }, "boolean | null": function booleanNull(e) {
          return Math.abs(e);
        }, Array: function Array(e) {
          return a(m(e), 2);
        }, Matrix: function Matrix(e) {
          return a(e, 2);
        }, "number | Complex | BigNumber | boolean | null, number | BigNumber | string": function numberComplexBigNumberBooleanNullNumberBigNumberString(e) {
          return v(e);
        }, "Array, number | BigNumber | string": function ArrayNumberBigNumberString(e, t) {
          return a(m(e), t);
        }, "Matrix, number | BigNumber | string": function MatrixNumberBigNumberString(e, t) {
          return a(e, t);
        } });return v.toTex = { 1: "\\left\\|${args[0]}\\right\\|", 2: void 0 }, v;
    }t.name = "norm", t.factory = n;
  }, function (e, t, r) {
    "use strict";
    function n(e, t, n, o) {
      var s = n(r(52)),
          u = n(r(51)),
          c = o("trace", { Array: function Array(e) {
          return c(s(e));
        }, Matrix: function Matrix(e) {
          var t;switch (e.storage()) {case "dense":
              t = f(e);break;case "sparse":
              t = l(e);}return t;
        }, any: i }),
          f = function f(e) {
        var t = e._size,
            r = e._data;switch (t.length) {case 1:
            if (1 == t[0]) return i(r[0]);throw new RangeError("Matrix must be square (size: " + a(t) + ")");case 2:
            var n = t[0],
                o = t[1];if (n === o) {
              for (var s = 0, c = 0; n > c; c++) {
                s = u(s, r[c][c]);
              }return s;
            }throw new RangeError("Matrix must be square (size: " + a(t) + ")");default:
            throw new RangeError("Matrix must be two dimensional (size: " + a(t) + ")");}
      },
          l = function l(e) {
        var t = e._values,
            r = e._index,
            n = e._ptr,
            i = e._size,
            o = i[0],
            s = i[1];if (o === s) {
          var c = 0;if (t.length > 0) for (var f = 0; s > f; f++) {
            for (var l = n[f], p = n[f + 1], h = l; p > h; h++) {
              var m = r[h];if (m === f) {
                c = u(c, t[h]);break;
              }if (m > f) break;
            }
          }return c;
        }throw new RangeError("Matrix must be square (size: " + a(i) + ")");
      };return c.toTex = { 1: "\\mathrm{tr}\\left(${args[0]}\\right)" }, c;
    }var i = r(3).clone,
        a = r(23).format;t.name = "trace", t.factory = n;
  }, function (e, t, r) {
    "use strict";
    function n(e, t, n, o) {
      function s(t, r) {
        var n = e.BigNumber.precision,
            i = e.BigNumber.clone({ precision: n + 2 }),
            a = new e.BigNumber(0),
            o = new i(1),
            s = r.isNegative();if (s && (r = r.neg()), r.isZero()) throw new Error("Root must be non-zero");if (t.isNegative() && !r.abs().mod(2).equals(1)) throw new Error("Root must be odd when a is negative.");if (t.isZero()) return s ? new i(1 / 0) : 0;if (!t.isFinite()) return s ? a : t;var u = t.abs().pow(o.div(r));return u = t.isNeg() ? u.neg() : u, new e.BigNumber((s ? o.div(u) : u).toPrecision(n));
      }var u = n(r(52)),
          c = n(r(54)),
          f = n(r(372)),
          l = n(r(383)),
          p = n(r(85)),
          h = n(r(57)),
          m = n(r(58)),
          d = o("nthRoot", { number: function number(e) {
          return i(e, 2);
        }, "number, number": i, BigNumber: function BigNumber(t) {
          return s(t, new e.BigNumber(2));
        }, Complex: function Complex(e) {
          return a(e, 2);
        }, "Complex, number": a, "BigNumber, BigNumber": s, "Array | Matrix": function ArrayMatrix(e) {
          return d(e, 2);
        }, "Matrix, Matrix": function MatrixMatrix(e, t) {
          var r;switch (e.storage()) {case "sparse":
              switch (t.storage()) {case "sparse":
                  if (1 !== t.density()) throw new Error("Root must be non-zero");r = l(e, t, d);break;default:
                  r = f(t, e, d, !0);}break;default:
              switch (t.storage()) {case "sparse":
                  if (1 !== t.density()) throw new Error("Root must be non-zero");r = c(e, t, d, !1);break;default:
                  r = h(e, t, d);}}return r;
        }, "Array, Array": function ArrayArray(e, t) {
          return d(u(e), u(t)).valueOf();
        }, "Array, Matrix": function ArrayMatrix(e, t) {
          return d(u(e), t);
        }, "Matrix, Array": function MatrixArray(e, t) {
          return d(e, u(t));
        }, "Matrix, number | BigNumber": function MatrixNumberBigNumber(e, t) {
          var r;switch (e.storage()) {case "sparse":
              r = p(e, t, d, !1);break;default:
              r = m(e, t, d, !1);}return r;
        }, "number | BigNumber, Matrix": function numberBigNumberMatrix(e, t) {
          var r;switch (t.storage()) {case "sparse":
              if (1 !== t.density()) throw new Error("Root must be non-zero");r = p(t, e, d, !0);break;default:
              r = m(t, e, d, !0);}return r;
        }, "Array, number | BigNumber": function ArrayNumberBigNumber(e, t) {
          return d(u(e), t).valueOf();
        }, "number | BigNumber, Array": function numberBigNumberArray(e, t) {
          return d(e, u(t)).valueOf();
        } });return d.toTex = { 2: "\\sqrt[${args[1]}]{${args[0]}}" }, d;
    }function i(e, t) {
      var r = 0 > t;if (r && (t = -t), 0 === t) throw new Error("Root must be non-zero");if (0 > e && Math.abs(t) % 2 != 1) throw new Error("Root must be odd when a is negative.");if (0 == e) return r ? 1 / 0 : 0;if (!isFinite(e)) return r ? 0 : e;var n = Math.pow(Math.abs(e), 1 / t);return n = 0 > e ? -n : n, r ? 1 / n : n;
    }function a(e, t) {
      if (0 > t) throw new Error("Root must be greater than zero");if (0 === t) throw new Error("Root must be non-zero");if (t % 1 !== 0) throw new Error("Root must be an integer");for (var r = e.arg(), n = e.abs(), i = [], a = Math.pow(n, 1 / t), o = 0; t > o; o++) {
        i.push({ r: a, phi: (r + 2 * Math.PI * o) / t });
      }return i;
    }t.name = "nthRoot", t.factory = n;
  }, function (e, t, r) {
    "use strict";
    function n(e, t, n, o) {
      var c = n(r(52)),
          f = n(r(48)),
          l = n(r(392)),
          p = n(r(85)),
          h = n(r(63)),
          m = n(r(58)),
          d = o("round", { number: Math.round, "number, number": function numberNumber(e, t) {
          if (!a(t)) throw new TypeError(u);if (0 > t || t > 15) throw new Error("Number of decimals in function round must be in te range of 0-15");return i(e, t);
        }, Complex: function Complex(e) {
          return e.round();
        }, "Complex, number": function ComplexNumber(e, t) {
          if (t % 1) throw new TypeError(u);return e.round(t);
        }, "Complex, BigNumber": function ComplexBigNumber(e, t) {
          if (!t.isInteger()) throw new TypeError(u);var r = t.toNumber();return e.round(r);
        }, "number, BigNumber": function numberBigNumber(t, r) {
          if (!r.isInteger()) throw new TypeError(u);return new e.BigNumber(t).toDecimalPlaces(r.toNumber());
        }, BigNumber: function BigNumber(e) {
          return e.toDecimalPlaces(0);
        }, "BigNumber, BigNumber": function BigNumberBigNumber(e, t) {
          if (!t.isInteger()) throw new TypeError(u);return e.toDecimalPlaces(t.toNumber());
        }, Fraction: function Fraction(e) {
          return e.round();
        }, "Fraction, number": function FractionNumber(e, t) {
          if (t % 1) throw new TypeError(u);return e.round(t);
        }, "Array | Matrix": function ArrayMatrix(e) {
          return s(e, d, !0);
        }, "Matrix, number | BigNumber": function MatrixNumberBigNumber(e, t) {
          var r;switch (e.storage()) {case "sparse":
              r = p(e, t, d, !1);break;default:
              r = m(e, t, d, !1);}return r;
        }, "number | Complex | BigNumber, Matrix": function numberComplexBigNumberMatrix(e, t) {
          if (!f(e, 0)) {
            var r;switch (t.storage()) {case "sparse":
                r = h(t, e, d, !0);break;default:
                r = m(t, e, d, !0);}return r;
          }return l(t.size(), t.storage());
        }, "Array, number | BigNumber": function ArrayNumberBigNumber(e, t) {
          return m(c(e), t, d, !1).valueOf();
        }, "number | Complex | BigNumber, Array": function numberComplexBigNumberArray(e, t) {
          return m(c(t), e, d, !0).valueOf();
        } });return d.toTex = { 1: "\\left\\lfloor${args[0]}\\right\\rceil", 2: void 0 }, d;
    }function i(e, t) {
      return parseFloat(o(e, t));
    }var a = r(6).isInteger,
        o = r(6).toFixed,
        s = r(19),
        u = "Number of decimals in function round must be an integer";t.name = "round", t.factory = n;
  }, function (e, t, r) {
    "use strict";
    function n(e, t, n, o) {
      function s(t, r) {
        var n = u(t),
            i = n ? new e.BigNumber(0) : 0;if (c(t), r) {
          var o = f(r);return t.length > 0 ? o.resize(t, i) : o;
        }var s = [];return t.length > 0 ? a(s, t, i) : s;
      }function u(e) {
        var t = !1;return e.forEach(function (e, r, n) {
          e && e.isBigNumber === !0 && (t = !0, n[r] = e.toNumber());
        }), t;
      }function c(e) {
        e.forEach(function (e) {
          if ("number" != typeof e || !i(e) || 0 > e) throw new Error("Parameters in function zeros must be positive integers");
        });
      }var f = n(r(52)),
          l = o("zeros", { "": function _() {
          return "Array" === t.matrix ? s([]) : s([], "default");
        }, "...number | BigNumber | string": function numberBigNumberString(e) {
          var r = e[e.length - 1];if ("string" == typeof r) {
            var n = e.pop();return s(e, n);
          }return "Array" === t.matrix ? s(e) : s(e, "default");
        }, Array: s, Matrix: function Matrix(e) {
          var t = e.storage();return s(e.valueOf(), t);
        }, "Array | Matrix, string": function ArrayMatrixString(e, t) {
          return s(e.valueOf(), t);
        } });return l.toTex = void 0, l;
    }var i = r(6).isInteger,
        a = r(40).resize;t.name = "zeros", t.factory = n;
  }, function (e, t, r) {
    "use strict";
    function n(e, t, r, n) {
      var o = n("sign", { number: i.sign, Complex: function Complex(e) {
          return e.sign();
        }, BigNumber: function BigNumber(t) {
          return new e.BigNumber(t.cmp(0));
        }, Fraction: function Fraction(t) {
          return new e.Fraction(t.s, 1);
        }, "Array | Matrix": function ArrayMatrix(e) {
          return a(e, o, !0);
        }, Unit: function Unit(e) {
          return o(e.value);
        } });return o.toTex = { 1: "\\mathrm{${name}}\\left(${args[0]}\\right)" }, o;
    }var i = r(6),
        a = r(19);t.name = "sign", t.factory = n;
  }, function (e, t, r) {
    "use strict";
    function n(e, t, r, n) {
      var a = n("square", { number: function number(e) {
          return e * e;
        }, Complex: function Complex(e) {
          return e.mul(e);
        }, BigNumber: function BigNumber(e) {
          return e.times(e);
        }, Fraction: function Fraction(e) {
          return e.mul(e);
        }, "Array | Matrix": function ArrayMatrix(e) {
          return i(e, a, !0);
        }, Unit: function Unit(e) {
          return e.pow(2);
        } });return a.toTex = { 1: "\\left(${args[0]}\\right)^2" }, a;
    }var i = r(19);t.name = "square", t.factory = n;
  }, function (e, t, r) {
    "use strict";
    function n(e, t, n, a) {
      var o = r(32),
          s = a("unaryPlus", { number: function number(e) {
          return e;
        }, Complex: function Complex(e) {
          return e;
        }, BigNumber: function BigNumber(e) {
          return e;
        }, Fraction: function Fraction(e) {
          return e;
        }, Unit: function Unit(e) {
          return e.clone();
        }, "Array | Matrix": function ArrayMatrix(e) {
          return i(e, s, !0);
        }, "boolean | string | null": function booleanStringNull(r) {
          return "BigNumber" == t.number ? new e.BigNumber(+r) : +r;
        } });return s.toTex = { 1: o.operators.unaryPlus + "\\left(${args[0]}\\right)" }, s;
    }var i = r(19);t.name = "unaryPlus", t.factory = n;
  }, function (e, t, r) {
    "use strict";
    function n(e, t, n, a) {
      function o(e, r) {
        var n,
            a,
            o,
            s = 0,
            c = 1,
            f = 1,
            l = 0;if (!i(e) || !i(r)) throw new Error("Parameters in function xgcd must be integer numbers");for (; r;) {
          a = Math.floor(e / r), o = e % r, n = s, s = c - a * s, c = n, n = f, f = l - a * f, l = n, e = r, r = o;
        }var p;return p = 0 > e ? [-e, -c, -l] : [e, e ? c : 0, l], "Array" === t.matrix ? p : u(p);
      }function s(r, n) {
        var i,
            a,
            o,
            s = new e.BigNumber(0),
            c = new e.BigNumber(1),
            f = s,
            l = c,
            p = c,
            h = s;if (!r.isInt() || !n.isInt()) throw new Error("Parameters in function xgcd must be integer numbers");for (; !n.isZero();) {
          a = r.div(n).floor(), o = r.mod(n), i = f, f = l.minus(a.times(f)), l = i, i = p, p = h.minus(a.times(p)), h = i, r = n, n = o;
        }var m;return m = r.lt(s) ? [r.neg(), l.neg(), h.neg()] : [r, r.isZero() ? 0 : l, h], "Array" === t.matrix ? m : u(m);
      }var u = n(r(52)),
          c = a("xgcd", { "number, number": o, "BigNumber, BigNumber": s });return c.toTex = void 0, c;
    }var i = r(6).isInteger;t.name = "xgcd", t.factory = n;
  }, function (e, t, r) {
    e.exports = [r(398), r(402), r(403), r(405), r(407), r(410), r(412)];
  }, function (e, t, r) {
    "use strict";
    function n(e, t, n, o) {
      var s = r(32),
          u = n(r(52)),
          c = n(r(372)),
          f = n(r(383)),
          l = n(r(85)),
          p = n(r(57)),
          h = n(r(58)),
          m = o("bitAnd", { "number, number": function numberNumber(e, t) {
          if (!i(e) || !i(t)) throw new Error("Integers expected in function bitAnd");return e & t;
        }, "BigNumber, BigNumber": a, "Matrix, Matrix": function MatrixMatrix(e, t) {
          var r;switch (e.storage()) {case "sparse":
              switch (t.storage()) {case "sparse":
                  r = f(e, t, m, !1);break;default:
                  r = c(t, e, m, !0);}break;default:
              switch (t.storage()) {case "sparse":
                  r = c(e, t, m, !1);break;default:
                  r = p(e, t, m);}}return r;
        }, "Array, Array": function ArrayArray(e, t) {
          return m(u(e), u(t)).valueOf();
        }, "Array, Matrix": function ArrayMatrix(e, t) {
          return m(u(e), t);
        }, "Matrix, Array": function MatrixArray(e, t) {
          return m(e, u(t));
        }, "Matrix, any": function MatrixAny(e, t) {
          var r;switch (e.storage()) {case "sparse":
              r = l(e, t, m, !1);break;default:
              r = h(e, t, m, !1);}return r;
        }, "any, Matrix": function anyMatrix(e, t) {
          var r;switch (t.storage()) {case "sparse":
              r = l(t, e, m, !0);break;default:
              r = h(t, e, m, !0);}return r;
        }, "Array, any": function ArrayAny(e, t) {
          return h(u(e), t, m, !1).valueOf();
        }, "any, Array": function anyArray(e, t) {
          return h(u(t), e, m, !0).valueOf();
        } });return m.toTex = { 2: "\\left(${args[0]}" + s.operators.bitAnd + "${args[1]}\\right)" }, m;
    }var i = r(6).isInteger,
        a = r(399);t.name = "bitAnd", t.factory = n;
  }, function (e, t, r) {
    var n = r(400);e.exports = function (e, t) {
      if (e.isFinite() && !e.isInteger() || t.isFinite() && !t.isInteger()) throw new Error("Integers expected in function bitAnd");var r = e.constructor;if (e.isNaN() || t.isNaN()) return new r(NaN);if (e.isZero() || t.eq(-1) || e.eq(t)) return e;if (t.isZero() || e.eq(-1)) return t;if (!e.isFinite() || !t.isFinite()) {
        if (!e.isFinite() && !t.isFinite()) return e.isNegative() == t.isNegative() ? e : new r(0);if (!e.isFinite()) return t.isNegative() ? e : e.isNegative() ? new r(0) : t;if (!t.isFinite()) return e.isNegative() ? t : t.isNegative() ? new r(0) : e;
      }return n(e, t, function (e, t) {
        return e & t;
      });
    };
  }, function (e, t, r) {
    function n(e) {
      for (var t = e.d, r = t[0] + "", n = 1; n < t.length; ++n) {
        for (var i = t[n] + "", a = 7 - i.length; a--;) {
          i = "0" + i;
        }r += i;
      }var o;for (o = r.length - 1; "0" == r.charAt(o); --o) {}var s = e.e,
          u = r.slice(0, o + 1 || 1),
          c = u.length;if (s > 0) if (++s > c) for (s -= c; s--; u += "0") {} else c > s && (u = u.slice(0, s) + "." + u.slice(s));for (var f = [0], n = 0; n < u.length;) {
        for (var l = f.length; l--; f[l] *= 10) {}f[0] += u.charAt(n++) << 0;for (var o = 0; o < f.length; ++o) {
          f[o] > 1 && (null == f[o + 1] && (f[o + 1] = 0), f[o + 1] += f[o] >> 1, f[o] &= 1);
        }
      }return f.reverse();
    }var i = r(401);e.exports = function (e, t, r) {
      var a,
          o,
          s = e.constructor,
          u = +(e.s < 0),
          c = +(t.s < 0);if (u) {
        a = n(i(e));for (var f = 0; f < a.length; ++f) {
          a[f] ^= 1;
        }
      } else a = n(e);if (c) {
        o = n(i(t));for (var f = 0; f < o.length; ++f) {
          o[f] ^= 1;
        }
      } else o = n(t);var l, p, h;a.length <= o.length ? (l = a, p = o, h = u) : (l = o, p = a, h = c);var m = l.length,
          d = p.length,
          g = 1 ^ r(u, c),
          v = new s(1 ^ g),
          y = new s(1),
          x = new s(2),
          b = s.precision;for (s.config({ precision: 1e9 }); m > 0;) {
        r(l[--m], p[--d]) == g && (v = v.plus(y)), y = y.times(x);
      }for (; d > 0;) {
        r(h, p[--d]) == g && (v = v.plus(y)), y = y.times(x);
      }return s.config({ precision: b }), 0 == g && (v.s = -v.s), v;
    };
  }, function (e, t) {
    e.exports = function (e) {
      if (e.isFinite() && !e.isInteger()) throw new Error("Integer expected in function bitNot");var t = e.constructor,
          r = t.precision;t.config({ precision: 1e9 });var e = e.plus(new t(1));return e.s = -e.s || null, t.config({ precision: r }), e;
    };
  }, function (e, t, r) {
    "use strict";
    function n(e, t, n, s) {
      var u = r(32),
          c = s("bitNot", { number: function number(e) {
          if (!o(e)) throw new Error("Integer expected in function bitNot");return ~e;
        }, BigNumber: a, "Array | Matrix": function ArrayMatrix(e) {
          return i(e, c);
        } });return c.toTex = { 1: u.operators.bitNot + "\\left(${args[0]}\\right)" }, c;
    }var i = r(19),
        a = r(401),
        o = r(6).isInteger;t.name = "bitNot", t.factory = n;
  }, function (e, t, r) {
    "use strict";
    function n(e, t, n, o) {
      var s = r(32),
          u = n(r(52)),
          c = n(r(54)),
          f = n(r(55)),
          l = n(r(56)),
          p = n(r(57)),
          h = n(r(58)),
          m = o("bitOr", { "number, number": function numberNumber(e, t) {
          if (!i(e) || !i(t)) throw new Error("Integers expected in function bitOr");return e | t;
        }, "BigNumber, BigNumber": a, "Matrix, Matrix": function MatrixMatrix(e, t) {
          var r;switch (e.storage()) {case "sparse":
              switch (t.storage()) {case "sparse":
                  r = f(e, t, m);break;default:
                  r = c(t, e, m, !0);}break;default:
              switch (t.storage()) {case "sparse":
                  r = c(e, t, m, !1);break;default:
                  r = p(e, t, m);}}return r;
        }, "Array, Array": function ArrayArray(e, t) {
          return m(u(e), u(t)).valueOf();
        }, "Array, Matrix": function ArrayMatrix(e, t) {
          return m(u(e), t);
        }, "Matrix, Array": function MatrixArray(e, t) {
          return m(e, u(t));
        }, "Matrix, any": function MatrixAny(e, t) {
          var r;switch (e.storage()) {case "sparse":
              r = l(e, t, m, !1);break;default:
              r = h(e, t, m, !1);}return r;
        }, "any, Matrix": function anyMatrix(e, t) {
          var r;switch (t.storage()) {case "sparse":
              r = l(t, e, m, !0);break;default:
              r = h(t, e, m, !0);}return r;
        }, "Array, any": function ArrayAny(e, t) {
          return h(u(e), t, m, !1).valueOf();
        }, "any, Array": function anyArray(e, t) {
          return h(u(t), e, m, !0).valueOf();
        } });return m.toTex = { 2: "\\left(${args[0]}" + s.operators.bitOr + "${args[1]}\\right)" }, m;
    }var i = r(6).isInteger,
        a = r(404);t.name = "bitOr", t.factory = n;
  }, function (e, t, r) {
    var n = r(400);e.exports = function (e, t) {
      if (e.isFinite() && !e.isInteger() || t.isFinite() && !t.isInteger()) throw new Error("Integers expected in function bitOr");var r = e.constructor;if (e.isNaN() || t.isNaN()) return new r(NaN);var i = new r(-1);return e.isZero() || t.eq(i) || e.eq(t) ? t : t.isZero() || e.eq(i) ? e : e.isFinite() && t.isFinite() ? n(e, t, function (e, t) {
        return e | t;
      }) : !e.isFinite() && !e.isNegative() && t.isNegative() || e.isNegative() && !t.isNegative() && !t.isFinite() ? i : e.isNegative() && t.isNegative() ? e.isFinite() ? e : t : e.isFinite() ? t : e;
    };
  }, function (e, t, r) {
    "use strict";
    function n(e, t, n, o) {
      var s = r(32),
          u = n(r(52)),
          c = n(r(61)),
          f = n(r(62)),
          l = n(r(63)),
          p = n(r(57)),
          h = n(r(58)),
          m = o("bitXor", { "number, number": function numberNumber(e, t) {
          if (!i(e) || !i(t)) throw new Error("Integers expected in function bitXor");return e ^ t;
        }, "BigNumber, BigNumber": a, "Matrix, Matrix": function MatrixMatrix(e, t) {
          var r;switch (e.storage()) {case "sparse":
              switch (t.storage()) {case "sparse":
                  r = f(e, t, m);break;default:
                  r = c(t, e, m, !0);}break;default:
              switch (t.storage()) {case "sparse":
                  r = c(e, t, m, !1);break;default:
                  r = p(e, t, m);}}return r;
        }, "Array, Array": function ArrayArray(e, t) {
          return m(u(e), u(t)).valueOf();
        }, "Array, Matrix": function ArrayMatrix(e, t) {
          return m(u(e), t);
        }, "Matrix, Array": function MatrixArray(e, t) {
          return m(e, u(t));
        }, "Matrix, any": function MatrixAny(e, t) {
          var r;switch (e.storage()) {case "sparse":
              r = l(e, t, m, !1);break;default:
              r = h(e, t, m, !1);}return r;
        }, "any, Matrix": function anyMatrix(e, t) {
          var r;switch (t.storage()) {case "sparse":
              r = l(t, e, m, !0);break;default:
              r = h(t, e, m, !0);}return r;
        }, "Array, any": function ArrayAny(e, t) {
          return h(u(e), t, m, !1).valueOf();
        }, "any, Array": function anyArray(e, t) {
          return h(u(t), e, m, !0).valueOf();
        } });return m.toTex = { 2: "\\left(${args[0]}" + s.operators.bitXor + "${args[1]}\\right)" }, m;
    }var i = r(6).isInteger,
        a = r(406);t.name = "bitXor", t.factory = n;
  }, function (e, t, r) {
    var n = r(400),
        i = r(401);e.exports = function (e, t) {
      if (e.isFinite() && !e.isInteger() || t.isFinite() && !t.isInteger()) throw new Error("Integers expected in function bitXor");var r = e.constructor;if (e.isNaN() || t.isNaN()) return new r(NaN);if (e.isZero()) return t;if (t.isZero()) return e;if (e.eq(t)) return new r(0);var a = new r(-1);return e.eq(a) ? i(t) : t.eq(a) ? i(e) : e.isFinite() && t.isFinite() ? n(e, t, function (e, t) {
        return e ^ t;
      }) : e.isFinite() || t.isFinite() ? new r(e.isNegative() == t.isNegative() ? 1 / 0 : -(1 / 0)) : a;
    };
  }, function (e, t, r) {
    "use strict";
    function n(e, t, n, o) {
      var s = r(32),
          u = n(r(52)),
          c = n(r(48)),
          f = n(r(392)),
          l = n(r(54)),
          p = n(r(372)),
          h = n(r(409)),
          m = n(r(56)),
          d = n(r(85)),
          g = n(r(57)),
          v = n(r(58)),
          y = o("leftShift", { "number, number": function numberNumber(e, t) {
          if (!i(e) || !i(t)) throw new Error("Integers expected in function leftShift");return e << t;
        }, "BigNumber, BigNumber": a, "Matrix, Matrix": function MatrixMatrix(e, t) {
          var r;switch (e.storage()) {case "sparse":
              switch (t.storage()) {case "sparse":
                  r = h(e, t, y, !1);break;default:
                  r = p(t, e, y, !0);}break;default:
              switch (t.storage()) {case "sparse":
                  r = l(e, t, y, !1);break;default:
                  r = g(e, t, y);}}return r;
        }, "Array, Array": function ArrayArray(e, t) {
          return y(u(e), u(t)).valueOf();
        }, "Array, Matrix": function ArrayMatrix(e, t) {
          return y(u(e), t);
        }, "Matrix, Array": function MatrixArray(e, t) {
          return y(e, u(t));
        }, "Matrix, number | BigNumber": function MatrixNumberBigNumber(e, t) {
          if (!c(t, 0)) {
            var r;switch (e.storage()) {case "sparse":
                r = d(e, t, y, !1);break;default:
                r = v(e, t, y, !1);}return r;
          }return e.clone();
        }, "number | BigNumber, Matrix": function numberBigNumberMatrix(e, t) {
          if (!c(e, 0)) {
            var r;switch (t.storage()) {case "sparse":
                r = m(t, e, y, !0);break;default:
                r = v(t, e, y, !0);}return r;
          }return f(t.size(), t.storage());
        }, "Array, number | BigNumber": function ArrayNumberBigNumber(e, t) {
          return y(u(e), t).valueOf();
        }, "number | BigNumber, Array": function numberBigNumberArray(e, t) {
          return y(e, u(t)).valueOf();
        } });return y.toTex = { 2: "\\left(${args[0]}" + s.operators.leftShift + "${args[1]}\\right)" }, y;
    }var i = r(6).isInteger,
        a = r(408);t.name = "leftShift", t.factory = n;
  }, function (e, t) {
    e.exports = function (e, t) {
      if (e.isFinite() && !e.isInteger() || t.isFinite() && !t.isInteger()) throw new Error("Integers expected in function leftShift");var r = e.constructor;return e.isNaN() || t.isNaN() || t.isNegative() && !t.isZero() ? new r(NaN) : e.isZero() || t.isZero() ? e : e.isFinite() || t.isFinite() ? t.lt(55) ? e.times(Math.pow(2, t.toNumber()) + "") : e.times(new r(2).pow(t)) : new r(NaN);
    };
  }, function (e, t, r) {
    "use strict";
    function n(e, t, n, a) {
      var o = n(r(48)),
          s = e.SparseMatrix,
          u = function u(e, t, r) {
        var n = e._values,
            u = e._index,
            c = e._ptr,
            f = e._size,
            l = e._datatype,
            p = t._values,
            h = t._index,
            m = t._ptr,
            d = t._size,
            g = t._datatype;if (f.length !== d.length) throw new i(f.length, d.length);if (f[0] !== d[0] || f[1] !== d[1]) throw new RangeError("Dimension mismatch. Matrix A (" + f + ") must match Matrix B (" + d + ")");if (!n || !p) throw new Error("Cannot perform operation on Pattern Sparse Matrices");var v,
            y = f[0],
            x = f[1],
            b = o,
            w = 0,
            N = r;"string" == typeof l && l === g && (v = l, b = a.find(o, [v, v]), w = a.convert(0, v), N = a.find(r, [v, v]));for (var E, M, A, O, _ = [], T = [], C = [], S = new s({ values: _, index: T, ptr: C, size: [y, x], datatype: v }), z = [], B = [], k = 0; x > k; k++) {
          C[k] = T.length;var I = k + 1;for (M = c[k], A = c[k + 1], E = M; A > E; E++) {
            O = u[E], B[O] = I, z[O] = n[E], T.push(O);
          }for (M = m[k], A = m[k + 1], E = M; A > E; E++) {
            O = h[E], B[O] === I && (z[O] = N(z[O], p[E]));
          }for (E = C[k]; E < T.length;) {
            O = T[E];var P = z[O];b(P, w) ? T.splice(E, 1) : (_.push(P), E++);
          }
        }return C[x] = T.length, S;
      };return u;
    }var i = r(42);t.name = "algorithm08", t.factory = n;
  }, function (e, t, r) {
    "use strict";
    function n(e, t, n, o) {
      var s = r(32),
          u = n(r(52)),
          c = n(r(48)),
          f = n(r(392)),
          l = n(r(54)),
          p = n(r(372)),
          h = n(r(409)),
          m = n(r(56)),
          d = n(r(85)),
          g = n(r(57)),
          v = n(r(58)),
          y = o("rightArithShift", { "number, number": function numberNumber(e, t) {
          if (!i(e) || !i(t)) throw new Error("Integers expected in function rightArithShift");return e >> t;
        }, "BigNumber, BigNumber": a, "Matrix, Matrix": function MatrixMatrix(e, t) {
          var r;switch (e.storage()) {case "sparse":
              switch (t.storage()) {case "sparse":
                  r = h(e, t, y, !1);break;default:
                  r = p(t, e, y, !0);}break;default:
              switch (t.storage()) {case "sparse":
                  r = l(e, t, y, !1);break;default:
                  r = g(e, t, y);}}return r;
        }, "Array, Array": function ArrayArray(e, t) {
          return y(u(e), u(t)).valueOf();
        }, "Array, Matrix": function ArrayMatrix(e, t) {
          return y(u(e), t);
        }, "Matrix, Array": function MatrixArray(e, t) {
          return y(e, u(t));
        }, "Matrix, number | BigNumber": function MatrixNumberBigNumber(e, t) {
          if (!c(t, 0)) {
            var r;switch (e.storage()) {case "sparse":
                r = d(e, t, y, !1);break;default:
                r = v(e, t, y, !1);}return r;
          }return e.clone();
        }, "number | BigNumber, Matrix": function numberBigNumberMatrix(e, t) {
          if (!c(e, 0)) {
            var r;switch (t.storage()) {case "sparse":
                r = m(t, e, y, !0);break;default:
                r = v(t, e, y, !0);}return r;
          }return f(t.size(), t.storage());
        }, "Array, number | BigNumber": function ArrayNumberBigNumber(e, t) {
          return y(u(e), t).valueOf();
        }, "number | BigNumber, Array": function numberBigNumberArray(e, t) {
          return y(e, u(t)).valueOf();
        } });return y.toTex = { 2: "\\left(${args[0]}" + s.operators.rightArithShift + "${args[1]}\\right)" }, y;
    }var i = r(6).isInteger,
        a = r(411);t.name = "rightArithShift", t.factory = n;
  }, function (e, t) {
    e.exports = function (e, t) {
      if (e.isFinite() && !e.isInteger() || t.isFinite() && !t.isInteger()) throw new Error("Integers expected in function rightArithShift");var r = e.constructor;return e.isNaN() || t.isNaN() || t.isNegative() && !t.isZero() ? new r(NaN) : e.isZero() || t.isZero() ? e : t.isFinite() ? t.lt(55) ? e.div(Math.pow(2, t.toNumber()) + "").floor() : e.div(new r(2).pow(t)).floor() : new r(e.isNegative() ? -1 : e.isFinite() ? 0 : NaN);
    };
  }, function (e, t, r) {
    "use strict";
    function n(e, t, n, a) {
      var o = r(32),
          s = n(r(52)),
          u = n(r(48)),
          c = n(r(392)),
          f = n(r(54)),
          l = n(r(372)),
          p = n(r(409)),
          h = n(r(56)),
          m = n(r(85)),
          d = n(r(57)),
          g = n(r(58)),
          v = a("rightLogShift", { "number, number": function numberNumber(e, t) {
          if (!i(e) || !i(t)) throw new Error("Integers expected in function rightLogShift");return e >>> t;
        }, "Matrix, Matrix": function MatrixMatrix(e, t) {
          var r;switch (e.storage()) {case "sparse":
              switch (t.storage()) {case "sparse":
                  r = p(e, t, v, !1);break;default:
                  r = l(t, e, v, !0);}break;default:
              switch (t.storage()) {case "sparse":
                  r = f(e, t, v, !1);break;default:
                  r = d(e, t, v);}}return r;
        }, "Array, Array": function ArrayArray(e, t) {
          return v(s(e), s(t)).valueOf();
        }, "Array, Matrix": function ArrayMatrix(e, t) {
          return v(s(e), t);
        }, "Matrix, Array": function MatrixArray(e, t) {
          return v(e, s(t));
        }, "Matrix, number | BigNumber": function MatrixNumberBigNumber(e, t) {
          if (!u(t, 0)) {
            var r;switch (e.storage()) {case "sparse":
                r = m(e, t, v, !1);break;default:
                r = g(e, t, v, !1);}return r;
          }return e.clone();
        }, "number | BigNumber, Matrix": function numberBigNumberMatrix(e, t) {
          if (!u(e, 0)) {
            var r;switch (t.storage()) {case "sparse":
                r = h(t, e, v, !0);break;default:
                r = g(t, e, v, !0);}return r;
          }return c(t.size(), t.storage());
        }, "Array, number | BigNumber": function ArrayNumberBigNumber(e, t) {
          return v(s(e), t).valueOf();
        }, "number | BigNumber, Array": function numberBigNumberArray(e, t) {
          return v(e, s(t)).valueOf();
        } });return v.toTex = { 2: "\\left(${args[0]}" + o.operators.rightLogShift + "${args[1]}\\right)" }, v;
    }var i = r(6).isInteger;t.name = "rightLogShift", t.factory = n;
  }, function (e, t, r) {
    e.exports = [r(414), r(420), r(415), r(421)];
  }, function (e, t, r) {
    "use strict";
    function n(e, t, n, i) {
      var a = n(r(51)),
          o = n(r(415)),
          s = n(r(368)),
          u = n(r(419)),
          c = i("bellNumbers", { "number | BigNumber": function numberBigNumber(e) {
          if (!u(e) || s(e)) throw new TypeError("Non-negative integer value expected in function bellNumbers");for (var t = 0, r = 0; e >= r; r++) {
            t = a(t, o(e, r));
          }return t;
        } });return c.toTex = { 1: "\\mathrm{B}_{${args[0]}}" }, c;
    }t.name = "bellNumbers", t.factory = n;
  }, function (e, t, r) {
    "use strict";
    function n(e, t, n, i) {
      var a = n(r(51)),
          o = n(r(77)),
          s = n(r(84)),
          u = n(r(329)),
          c = n(r(82)),
          f = n(r(416)),
          l = n(r(418)),
          p = n(r(368)),
          h = n(r(419)),
          m = n(r(64)),
          d = i("stirlingS2", { "number | BigNumber, number | BigNumber": function numberBigNumberNumberBigNumber(e, t) {
          if (!h(e) || p(e) || !h(t) || p(t)) throw new TypeError("Non-negative integer value expected in function stirlingS2");if (m(t, e)) throw new TypeError("k must be less than or equal to n in function stirlingS2");for (var r = f(t), n = 0, i = 0; t >= i; i++) {
            var d = c(-1, o(t, i)),
                g = l(t, i),
                v = c(i, e);n = a(n, s(s(g, v), d));
          }return u(n, r);
        } });return d.toTex = { 2: "\\mathrm{S}\\left(${args}\\right)" }, d;
    }t.name = "stirlingS2", t.factory = n;
  }, function (e, t, r) {
    "use strict";
    function n(e, t, n, a) {
      var o = n(r(417)),
          s = r(32),
          u = a("factorial", { number: function number(e) {
          if (0 > e) throw new Error("Value must be non-negative");return o(e + 1);
        }, BigNumber: function BigNumber(e) {
          if (e.isNegative()) throw new Error("Value must be non-negative");return o(e.plus(1));
        }, "Array | Matrix": function ArrayMatrix(e) {
          return i(e, u);
        } });return u.toTex = { 1: "\\left(${args[0]}\\right)" + s.operators.factorial }, u;
    }var i = r(19);t.name = "factorial", t.factory = n;
  }, function (e, t, r) {
    "use strict";
    function n(e, t, n, u) {
      function c(r) {
        if (r.isZero()) return new e.BigNumber(1);for (var n = t.precision + (0 | Math.log(r.toNumber())), i = e.BigNumber.clone({ precision: n }), a = new i(r), o = r.toNumber() - 1; o > 1;) {
          a = a.times(o), o--;
        }return new e.BigNumber(a.toPrecision(e.BigNumber.precision));
      }var f = n(r(84)),
          l = n(r(82)),
          p = u("gamma", { number: function number(e) {
          var t, r;if (a(e)) {
            if (0 >= e) return isFinite(e) ? 1 / 0 : NaN;if (e > 171) return 1 / 0;for (var n = e - 2, i = e - 1; n > 1;) {
              i *= n, n--;
            }return 0 == i && (i = 1), i;
          }if (.5 > e) return Math.PI / (Math.sin(Math.PI * e) * p(1 - e));if (e >= 171.35) return 1 / 0;if (e > 85) {
            var u = e * e,
                c = u * e,
                f = c * e,
                l = f * e;return Math.sqrt(2 * Math.PI / e) * Math.pow(e / Math.E, e) * (1 + 1 / (12 * e) + 1 / (288 * u) - 139 / (51840 * c) - 571 / (2488320 * f) + 163879 / (209018880 * l) + 5246819 / (75246796800 * l * e));
          }--e, r = s[0];for (var h = 1; h < s.length; ++h) {
            r += s[h] / (e + h);
          }return t = e + o + .5, Math.sqrt(2 * Math.PI) * Math.pow(t, e + .5) * Math.exp(-t) * r;
        }, Complex: function Complex(t) {
          var r, n;if (0 == t.im) return p(t.re);t = new e.Complex(t.re - 1, t.im), n = new e.Complex(s[0], 0);for (var i = 1; i < s.length; ++i) {
            var a = t.re + i,
                u = a * a + t.im * t.im;0 != u ? (n.re += s[i] * a / u, n.im += -(s[i] * t.im) / u) : n.re = s[i] < 0 ? -(1 / 0) : 1 / 0;
          }r = new e.Complex(t.re + o + .5, t.im);var c = Math.sqrt(2 * Math.PI);t.re += .5;var h = l(r, t);0 == h.im ? h.re *= c : 0 == h.re ? h.im *= c : (h.re *= c, h.im *= c);var m = Math.exp(-r.re);return r.re = m * Math.cos(-r.im), r.im = m * Math.sin(-r.im), f(f(h, r), n);
        }, BigNumber: function BigNumber(t) {
          if (t.isInteger()) return t.isNegative() || t.isZero() ? new e.BigNumber(1 / 0) : c(t.minus(1));if (!t.isFinite()) return new e.BigNumber(t.isNegative() ? NaN : 1 / 0);throw new Error("Integer BigNumber expected");
        }, "Array | Matrix": function ArrayMatrix(e) {
          return i(e, p);
        } });return p.toTex = { 1: "\\Gamma\\left(${args[0]}\\right)" }, p;
    }var i = r(19),
        a = r(6).isInteger,
        o = 4.7421875,
        s = [.9999999999999971, 57.15623566586292, -59.59796035547549, 14.136097974741746, -.4919138160976202, 3399464998481189e-20, 4652362892704858e-20, -9837447530487956e-20, .0001580887032249125, -.00021026444172410488, .00021743961811521265, -.0001643181065367639, 8441822398385275e-20, -26190838401581408e-21, 36899182659531625e-22];t.name = "gamma", t.factory = n;
  }, function (e, t, r) {
    "use strict";
    function n(e, t, r, n) {
      var o = n("combinations", { "number, number": function numberNumber(e, t) {
          var r, n, i;if (!a(e) || 0 > e) throw new TypeError("Positive integer value expected in function combinations");if (!a(t) || 0 > t) throw new TypeError("Positive integer value expected in function combinations");if (t > e) throw new TypeError("k must be less than or equal to n");for (r = Math.max(t, e - t), n = 1, i = 1; e - r >= i; i++) {
            n = n * (r + i) / i;
          }return n;
        }, "BigNumber, BigNumber": function BigNumberBigNumber(t, r) {
          var n,
              a,
              o,
              s,
              u = new e.BigNumber(1);if (!i(t) || !i(r)) throw new TypeError("Positive integer value expected in function combinations");if (r.gt(t)) throw new TypeError("k must be less than n in function combinations");for (n = t.minus(r), r.lt(n) && (n = r), a = u, o = u, s = t.minus(n); o.lte(s); o = o.plus(1)) {
            a = a.times(n.plus(o)).dividedBy(o);
          }return a;
        } });return o.toTex = { 2: "\\binom{${args[0]}}{${args[1]}}" }, o;
    }function i(e) {
      return e.isInteger() && e.gte(0);
    }var a = r(6).isInteger;t.name = "combinations", t.factory = n;
  }, function (e, t, r) {
    "use strict";
    function n(e, t, r, n) {
      var o = n("isInteger", { number: a.isInteger, BigNumber: function BigNumber(e) {
          return e.isInt();
        }, Fraction: function Fraction(e) {
          return 1 === e.d && isFinite(e.n);
        }, "Array | Matrix": function ArrayMatrix(e) {
          return i(e, o);
        } });return o;
    }var i = r(19),
        a = r(6);t.name = "isInteger", t.factory = n;
  }, function (e, t, r) {
    "use strict";
    function n(e, t, n, i) {
      var a = n(r(418)),
          o = n(r(53)),
          s = n(r(381)),
          u = n(r(419)),
          c = n(r(64)),
          f = i("composition", { "number | BigNumber, number | BigNumber": function numberBigNumberNumberBigNumber(e, t) {
          if (!(u(e) && s(e) && u(t) && s(t))) throw new TypeError("Positive integer value expected in function composition");if (c(t, e)) throw new TypeError("k must be less than or equal to n in function composition");return a(o(e, -1), o(t, -1));
        } });return f.toTex = void 0, f;
    }t.name = "composition", t.factory = n;
  }, function (e, t, r) {
    "use strict";
    function n(e, t, n, i) {
      var a = n(r(51)),
          o = n(r(329)),
          s = n(r(84)),
          u = n(r(418)),
          c = n(r(368)),
          f = n(r(419)),
          l = i("catalan", { "number | BigNumber": function numberBigNumber(e) {
          if (!f(e) || c(e)) throw new TypeError("Non-negative integer value expected in function catalan");return o(u(s(e, 2), e), a(e, 1));
        } });return l.toTex = { 1: "\\mathrm{C}_{${args[0]}}" }, l;
    }t.name = "catalan", t.factory = n;
  }, function (e, t, r) {
    e.exports = [r(423), r(424), r(425), r(426)];
  }, function (e, t, r) {
    "use strict";
    function n(e, t, r, n) {
      var a = n("arg", { number: function number(e) {
          return Math.atan2(0, e);
        }, BigNumber: function BigNumber(t) {
          return e.BigNumber.atan2(0, t);
        }, Complex: function Complex(e) {
          return e.arg();
        }, "Array | Matrix": function ArrayMatrix(e) {
          return i(e, a);
        } });return a.toTex = { 1: "\\arg\\left(${args[0]}\\right)" }, a;
    }var i = r(19);t.name = "arg", t.factory = n;
  }, function (e, t, r) {
    "use strict";
    function n(e, t, r, n) {
      var a = n("conj", { number: function number(e) {
          return e;
        }, BigNumber: function BigNumber(e) {
          return e;
        }, Complex: function Complex(e) {
          return e.conjugate();
        }, "Array | Matrix": function ArrayMatrix(e) {
          return i(e, a);
        } });return a.toTex = { 1: "\\left(${args[0]}\\right)^*" }, a;
    }var i = r(19);t.name = "conj", t.factory = n;
  }, function (e, t, r) {
    "use strict";
    function n(e, t, r, n) {
      var a = n("im", { number: function number(e) {
          return 0;
        }, BigNumber: function BigNumber(t) {
          return new e.BigNumber(0);
        }, Complex: function Complex(e) {
          return e.im;
        }, "Array | Matrix": function ArrayMatrix(e) {
          return i(e, a);
        } });return a.toTex = { 1: "\\Im\\left\\lbrace${args[0]}\\right\\rbrace" }, a;
    }var i = r(19);t.name = "im", t.factory = n;
  }, function (e, t, r) {
    "use strict";
    function n(e, t, r, n) {
      var a = n("re", { number: function number(e) {
          return e;
        }, BigNumber: function BigNumber(e) {
          return e;
        }, Complex: function Complex(e) {
          return e.re;
        }, "Array | Matrix": function ArrayMatrix(e) {
          return i(e, a);
        } });return a.toTex = { 1: "\\Re\\left\\lbrace${args[0]}\\right\\rbrace" }, a;
    }var i = r(19);t.name = "re", t.factory = n;
  }, function (e, t, r) {
    e.exports = [r(428), r(429)];
  }, function (e, t, r) {
    "use strict";
    function n(e, t, n, i) {
      function a(e) {
        return 2 === e.length && "number" == typeof e[0] && "number" == typeof e[1];
      }function o(e) {
        return 3 === e.length && "number" == typeof e[0] && "number" == typeof e[1] && "number" == typeof e[2];
      }function s(e) {
        return 4 === e.length && "number" == typeof e[0] && "number" == typeof e[1] && "number" == typeof e[2] && "number" == typeof e[3];
      }function u(e, r, n, i) {
        var a = e,
            o = n,
            s = d(a, r),
            u = d(o, i),
            c = s[0] * u[1] - u[0] * s[1];if (l(c) < t.epsilon) return null;var f = (u[0] * a[1] - u[1] * a[0] - u[0] * o[1] + u[1] * o[0]) / c;return p(m(s, f), a);
      }function c(e, t, r, n, i, a, o, s, u, c, f, l) {
        var p = (e - o) * (c - o) + (t - s) * (f - s) + (r - u) * (l - u),
            h = (c - o) * (n - e) + (f - s) * (i - t) + (l - u) * (a - r),
            m = (e - o) * (n - e) + (t - s) * (i - t) + (r - u) * (a - r),
            d = (c - o) * (c - o) + (f - s) * (f - s) + (l - u) * (l - u),
            g = (n - e) * (n - e) + (i - t) * (i - t) + (a - r) * (a - r),
            v = (p * h - m * d) / (g * d - h * h),
            y = (p + v * h) / d,
            x = e + v * (n - e),
            b = t + v * (i - t),
            w = r + v * (a - r),
            N = o + y * (c - o),
            E = s + y * (f - s),
            M = u + y * (l - u);return x === N && b === E && w === M ? [x, b, w] : null;
      }function f(e, t, r, n, i, a, o, s, u, c) {
        var f = (c - e * o - t * s - r * u) / (n * o + i * s + a * u - e - t - r),
            l = e + f * (n - e),
            p = t + f * (i - t),
            h = r + f * (a - r);return [l, p, h];
      }var l = n(r(86)),
          p = n(r(51)),
          h = n(r(52)),
          m = n(r(84)),
          d = n(r(77)),
          g = i("intersect", { "Array, Array, Array": function ArrayArrayArray(e, t, r) {
          if (!o(e)) throw new TypeError("Array with 3 numbers expected for first argument");if (!o(t)) throw new TypeError("Array with 3 numbers expected for second argument");if (!s(r)) throw new TypeError("Array with 4 numbers expected as third argument");return f(e[0], e[1], e[2], t[0], t[1], t[2], r[0], r[1], r[2], r[3]);
        }, "Array, Array, Array, Array": function ArrayArrayArrayArray(e, t, r, n) {
          if (2 === e.length) {
            if (!a(e)) throw new TypeError("Array with 2 numbers expected for first argument");if (!a(t)) throw new TypeError("Array with 2 numbers expected for second argument");if (!a(r)) throw new TypeError("Array with 2 numbers expected for third argument");if (!a(n)) throw new TypeError("Array with 2 numbers expected for fourth argument");return u(e, t, r, n);
          }if (3 === e.length) {
            if (!o(e)) throw new TypeError("Array with 3 numbers expected for first argument");if (!o(t)) throw new TypeError("Array with 3 numbers expected for second argument");if (!o(r)) throw new TypeError("Array with 3 numbers expected for third argument");if (!o(n)) throw new TypeError("Array with 3 numbers expected for fourth argument");return c(e[0], e[1], e[2], t[0], t[1], t[2], r[0], r[1], r[2], n[0], n[1], n[2]);
          }throw new TypeError("Arrays with two or thee dimensional points expected");
        }, "Matrix, Matrix, Matrix": function MatrixMatrixMatrix(e, t, r) {
          return h(g(e.valueOf(), t.valueOf(), r.valueOf()));
        }, "Matrix, Matrix, Matrix, Matrix": function MatrixMatrixMatrixMatrix(e, t, r, n) {
          return h(g(e.valueOf(), t.valueOf(), r.valueOf(), n.valueOf()));
        } });return g;
    }t.name = "intersect", t.factory = n;
  }, function (e, t, r) {
    "use strict";
    function n(e, t, n, s) {
      var m = (n(r(52)), s("distance", { "Array, Array, Array": function ArrayArrayArray(e, t, r) {
          if (2 == e.length && 2 == t.length && 2 == r.length) {
            if (!i(e)) throw new TypeError("Array with 2 numbers expected for first argument");if (!i(t)) throw new TypeError("Array with 2 numbers expected for second argument");if (!i(r)) throw new TypeError("Array with 2 numbers expected for third argument");var n = (r[1] - r[0]) / (t[1] - t[0]),
                a = n * n * t[0],
                o = -1 * (n * t[0]),
                s = e[1];return c(e[0], e[1], a, o, s);
          }throw new TypeError("Invalid Arguments: Try again");
        }, "Object, Object, Object": function ObjectObjectObject(e, t, r) {
          if (2 == Object.keys(e).length && 2 == Object.keys(t).length && 2 == Object.keys(r).length) {
            if (!i(e)) throw new TypeError("Values of pointX and pointY should be numbers");if (!i(t)) throw new TypeError("Values of lineOnePtX and lineOnePtY should be numbers");if (!i(r)) throw new TypeError("Values of lineTwoPtX and lineTwoPtY should be numbers");if (e.hasOwnProperty("pointX") && e.hasOwnProperty("pointY") && t.hasOwnProperty("lineOnePtX") && t.hasOwnProperty("lineOnePtY") && r.hasOwnProperty("lineTwoPtX") && r.hasOwnProperty("lineTwoPtY")) {
              var n = (r.lineTwoPtY - r.lineTwoPtX) / (t.lineOnePtY - t.lineOnePtX),
                  a = n * n * t.lineOnePtX,
                  o = -1 * (n * t.lineOnePtX),
                  s = e.pointX;return c(e.pointX, e.pointY, a, o, s);
            }throw new TypeError("Key names do not match");
          }throw new TypeError("Invalid Arguments: Try again");
        }, "Array, Array": function ArrayArray(e, t) {
          if (2 == e.length && 3 == t.length) {
            if (!i(e)) throw new TypeError("Array with 2 numbers expected for first argument");if (!a(t)) throw new TypeError("Array with 3 numbers expected for second argument");return c(e[0], e[1], t[0], t[1], t[2]);
          }if (3 == e.length && 6 == t.length) {
            if (!a(e)) throw new TypeError("Array with 3 numbers expected for first argument");if (!o(t)) throw new TypeError("Array with 6 numbers expected for second argument");return f(e[0], e[1], e[2], t[0], t[1], t[2], t[3], t[4], t[5]);
          }if (2 == e.length && 2 == t.length) {
            if (!i(e)) throw new TypeError("Array with 2 numbers expected for first argument");if (!i(t)) throw new TypeError("Array with 2 numbers expected for second argument");return l(e[0], e[1], t[0], t[1]);
          }if (3 == e.length && 3 == t.length) {
            if (!a(e)) throw new TypeError("Array with 3 numbers expected for first argument");if (!a(t)) throw new TypeError("Array with 3 numbers expected for second argument");return p(e[0], e[1], e[2], t[0], t[1], t[2]);
          }throw new TypeError("Invalid Arguments: Try again");
        }, "Object, Object": function ObjectObject(e, t) {
          if (2 == Object.keys(e).length && 3 == Object.keys(t).length) {
            if (!i(e)) throw new TypeError("Values of pointX and pointY should be numbers");if (!a(t)) throw new TypeError("Values of xCoeffLine, yCoeffLine and constant should be numbers");if (e.hasOwnProperty("pointX") && e.hasOwnProperty("pointY") && t.hasOwnProperty("xCoeffLine") && t.hasOwnProperty("yCoeffLine") && t.hasOwnProperty("yCoeffLine")) return c(e.pointX, e.pointY, t.xCoeffLine, t.yCoeffLine, t.constant);throw new TypeError("Key names do not match");
          }if (3 == Object.keys(e).length && 6 == Object.keys(t).length) {
            if (!a(e)) throw new TypeError("Values of pointX, pointY and pointZ should be numbers");if (!o(t)) throw new TypeError("Values of x0, y0, z0, a, b and c should be numbers");if (e.hasOwnProperty("pointX") && e.hasOwnProperty("pointY") && t.hasOwnProperty("x0") && t.hasOwnProperty("y0") && t.hasOwnProperty("z0") && t.hasOwnProperty("a") && t.hasOwnProperty("b") && t.hasOwnProperty("c")) return f(e.pointX, e.pointY, e.pointZ, t.x0, t.y0, t.z0, t.a, t.b, t.c);throw new TypeError("Key names do not match");
          }if (2 == Object.keys(e).length && 2 == Object.keys(t).length) {
            if (!i(e)) throw new TypeError("Values of pointOneX and pointOneY should be numbers");if (!i(t)) throw new TypeError("Values of pointTwoX and pointTwoY should be numbers");if (e.hasOwnProperty("pointOneX") && e.hasOwnProperty("pointOneY") && t.hasOwnProperty("pointTwoX") && t.hasOwnProperty("pointTwoY")) return l(e.pointOneX, e.pointOneY, t.pointTwoX, t.pointTwoY);throw new TypeError("Key names do not match");
          }if (3 == Object.keys(e).length && 3 == Object.keys(t).length) {
            if (!a(e)) throw new TypeError("Values of pointOneX, pointOneY and pointOneZ should be numbers");if (!a(t)) throw new TypeError("Values of pointTwoX, pointTwoY and pointTwoZ should be numbers");if (e.hasOwnProperty("pointOneX") && e.hasOwnProperty("pointOneY") && e.hasOwnProperty("pointOneZ") && t.hasOwnProperty("pointTwoX") && t.hasOwnProperty("pointTwoY") && t.hasOwnProperty("pointTwoZ")) return p(e.pointOneX, e.pointOneY, e.pointOneZ, t.pointTwoX, t.pointTwoY, t.pointTwoZ);throw new TypeError("Key names do not match");
          }throw new TypeError("Invalid Arguments: Try again");
        }, Array: function Array(e) {
          if (!u(e)) throw new TypeError("Incorrect array format entered for pairwise distance calculation");return h(e);
        } }));return m;
    }function i(e) {
      return e.constructor !== Array && (e = s(e)), "number" == typeof e[0] && "number" == typeof e[1];
    }function a(e) {
      return e.constructor !== Array && (e = s(e)), "number" == typeof e[0] && "number" == typeof e[1] && "number" == typeof e[2];
    }function o(e) {
      return e.constructor !== Array && (e = s(e)), "number" == typeof e[0] && "number" == typeof e[1] && "number" == typeof e[2] && "number" == typeof e[3] && "number" == typeof e[4] && "number" == typeof e[5];
    }function s(e) {
      for (var t = Object.keys(e), r = [], n = 0; n < t.length; n++) {
        r.push(e[t[n]]);
      }return r;
    }function u(e) {
      if (2 == e[0].length && "number" == typeof e[0][0] && "number" == typeof e[0][1]) {
        for (var t in e) {
          if (2 != e[t].length || "number" != typeof e[t][0] || "number" != typeof e[t][1]) return !1;
        }
      } else {
        if (3 != e[0].length || "number" != typeof e[0][0] || "number" != typeof e[0][1] || "number" != typeof e[0][2]) return !1;for (var t in e) {
          if (3 != e[t].length || "number" != typeof e[t][0] || "number" != typeof e[t][1] || "number" != typeof e[t][2]) return !1;
        }
      }return !0;
    }function c(e, t, r, n, i) {
      var a = Math.abs(r * e + n * t + i),
          o = Math.pow(r * r + n * n, .5),
          s = a / o;return s;
    }function f(e, t, r, n, i, a, o, s, u) {
      var c = [(i - t) * u - (a - r) * s, (a - r) * o - (n - e) * u, (n - e) * s - (i - t) * o];c = Math.pow(c[0] * c[0] + c[1] * c[1] + c[2] * c[2], .5);var f = Math.pow(o * o + s * s + u * u, .5),
          l = c / f;return l;
    }function l(e, t, r, n) {
      var i = n - t,
          a = r - e,
          o = i * i + a * a,
          s = Math.pow(o, .5);return s;
    }function p(e, t, r, n, i, a) {
      var o = a - r,
          s = i - t,
          u = n - e,
          c = o * o + s * s + u * u,
          f = Math.pow(c, .5);return f;
    }function h(e) {
      for (var t = [], r = 0; r < e.length - 1; r++) {
        for (var n = r + 1; n < e.length; n++) {
          2 == e[0].length ? t.push(l(e[r][0], e[r][1], e[n][0], e[n][1])) : 3 == e[0].length && t.push(p(e[r][0], e[r][1], e[r][2], e[n][0], e[n][1], e[n][2]));
        }
      }return t;
    }t.name = "distance", t.factory = n;
  }, function (e, t, r) {
    e.exports = [r(431), r(432), r(434), r(435)];
  }, function (e, t, r) {
    "use strict";
    function n(e, t, n, i) {
      var a = r(32),
          o = n(r(52)),
          s = n(r(392)),
          u = n(r(432)),
          c = (n(r(433)), n(r(372))),
          f = n(r(383)),
          l = n(r(85)),
          p = n(r(57)),
          h = n(r(58)),
          m = i("and", { "number, number": function numberNumber(e, t) {
          return !(!e || !t);
        }, "Complex, Complex": function ComplexComplex(e, t) {
          return !(0 === e.re && 0 === e.im || 0 === t.re && 0 === t.im);
        }, "BigNumber, BigNumber": function BigNumberBigNumber(e, t) {
          return !(e.isZero() || t.isZero() || e.isNaN() || t.isNaN());
        }, "Unit, Unit": function UnitUnit(e, t) {
          return m(e.value, t.value);
        }, "Matrix, Matrix": function MatrixMatrix(e, t) {
          var r;switch (e.storage()) {case "sparse":
              switch (t.storage()) {case "sparse":
                  r = f(e, t, m, !1);break;default:
                  r = c(t, e, m, !0);}break;default:
              switch (t.storage()) {case "sparse":
                  r = c(e, t, m, !1);break;default:
                  r = p(e, t, m);}}return r;
        }, "Array, Array": function ArrayArray(e, t) {
          return m(o(e), o(t)).valueOf();
        }, "Array, Matrix": function ArrayMatrix(e, t) {
          return m(o(e), t);
        }, "Matrix, Array": function MatrixArray(e, t) {
          return m(e, o(t));
        }, "Matrix, any": function MatrixAny(e, t) {
          if (u(t)) return s(e.size(), e.storage());var r;switch (e.storage()) {case "sparse":
              r = l(e, t, m, !1);break;default:
              r = h(e, t, m, !1);}return r;
        }, "any, Matrix": function anyMatrix(e, t) {
          if (u(e)) return s(e.size(), e.storage());var r;switch (t.storage()) {case "sparse":
              r = l(t, e, m, !0);break;default:
              r = h(t, e, m, !0);}return r;
        }, "Array, any": function ArrayAny(e, t) {
          return m(o(e), t).valueOf();
        }, "any, Array": function anyArray(e, t) {
          return m(e, o(t)).valueOf();
        } });return m.toTex = { 2: "\\left(${args[0]}" + a.operators.and + "${args[1]}\\right)" }, m;
    }t.name = "and", t.factory = n;
  }, function (e, t, r) {
    "use strict";
    function n(e, t, n, a) {
      var o = r(32),
          s = a("not", { number: function number(e) {
          return !e;
        }, Complex: function Complex(e) {
          return 0 === e.re && 0 === e.im;
        }, BigNumber: function BigNumber(e) {
          return e.isZero() || e.isNaN();
        }, Unit: function Unit(e) {
          return s(e.value);
        }, "Array | Matrix": function ArrayMatrix(e) {
          return i(e, s);
        } });return s.toTex = { 1: o.operators.not + "\\left(${args[0]}\\right)" }, s;
    }var i = r(19);t.name = "not", t.factory = n;
  }, function (e, t, r) {
    "use strict";
    function n(e, t, r, n) {
      var a = n("isZero", { number: function number(e) {
          return 0 === e;
        }, BigNumber: function BigNumber(e) {
          return e.isZero();
        }, Complex: function Complex(e) {
          return 0 === e.re && 0 === e.im;
        }, Fraction: function Fraction(e) {
          return 1 === e.d && 0 === e.n;
        }, Unit: function Unit(e) {
          return a(e.value);
        }, "Array | Matrix": function ArrayMatrix(e) {
          return i(e, a);
        } });return a;
    }var i = r(19);r(6);t.name = "isZero", t.factory = n;
  }, function (e, t, r) {
    "use strict";
    function n(e, t, n, i) {
      var a = r(32),
          o = n(r(52)),
          s = n(r(61)),
          u = n(r(79)),
          c = n(r(63)),
          f = n(r(57)),
          l = n(r(58)),
          p = i("or", { "number, number": function numberNumber(e, t) {
          return !(!e && !t);
        }, "Complex, Complex": function ComplexComplex(e, t) {
          return 0 !== e.re || 0 !== e.im || 0 !== t.re || 0 !== t.im;
        }, "BigNumber, BigNumber": function BigNumberBigNumber(e, t) {
          return !e.isZero() && !e.isNaN() || !t.isZero() && !t.isNaN();
        }, "Unit, Unit": function UnitUnit(e, t) {
          return p(e.value, t.value);
        }, "Matrix, Matrix": function MatrixMatrix(e, t) {
          var r;switch (e.storage()) {case "sparse":
              switch (t.storage()) {case "sparse":
                  r = u(e, t, p);break;default:
                  r = s(t, e, p, !0);}break;default:
              switch (t.storage()) {case "sparse":
                  r = s(e, t, p, !1);break;default:
                  r = f(e, t, p);}}return r;
        }, "Array, Array": function ArrayArray(e, t) {
          return p(o(e), o(t)).valueOf();
        }, "Array, Matrix": function ArrayMatrix(e, t) {
          return p(o(e), t);
        }, "Matrix, Array": function MatrixArray(e, t) {
          return p(e, o(t));
        }, "Matrix, any": function MatrixAny(e, t) {
          var r;switch (e.storage()) {case "sparse":
              r = c(e, t, p, !1);break;default:
              r = l(e, t, p, !1);}return r;
        }, "any, Matrix": function anyMatrix(e, t) {
          var r;switch (t.storage()) {case "sparse":
              r = c(t, e, p, !0);break;default:
              r = l(t, e, p, !0);}return r;
        }, "Array, any": function ArrayAny(e, t) {
          return l(o(e), t, p, !1).valueOf();
        }, "any, Array": function anyArray(e, t) {
          return l(o(t), e, p, !0).valueOf();
        } });return p.toTex = { 2: "\\left(${args[0]}" + a.operators.or + "${args[1]}\\right)" }, p;
    }t.name = "or", t.factory = n;
  }, function (e, t, r) {
    "use strict";
    function n(e, t, n, i) {
      var a = r(32),
          o = n(r(52)),
          s = n(r(61)),
          u = n(r(62)),
          c = n(r(63)),
          f = n(r(57)),
          l = n(r(58)),
          p = i("xor", { "number, number": function numberNumber(e, t) {
          return !!(!!e ^ !!t);
        }, "Complex, Complex": function ComplexComplex(e, t) {
          return (0 !== e.re || 0 !== e.im) != (0 !== t.re || 0 !== t.im);
        }, "BigNumber, BigNumber": function BigNumberBigNumber(e, t) {
          return (!e.isZero() && !e.isNaN()) != (!t.isZero() && !t.isNaN());
        }, "Unit, Unit": function UnitUnit(e, t) {
          return p(e.value, t.value);
        }, "Matrix, Matrix": function MatrixMatrix(e, t) {
          var r;switch (e.storage()) {case "sparse":
              switch (t.storage()) {case "sparse":
                  r = u(e, t, p);break;default:
                  r = s(t, e, p, !0);}break;default:
              switch (t.storage()) {case "sparse":
                  r = s(e, t, p, !1);break;default:
                  r = f(e, t, p);}}return r;
        }, "Array, Array": function ArrayArray(e, t) {
          return p(o(e), o(t)).valueOf();
        }, "Array, Matrix": function ArrayMatrix(e, t) {
          return p(o(e), t);
        }, "Matrix, Array": function MatrixArray(e, t) {
          return p(e, o(t));
        }, "Matrix, any": function MatrixAny(e, t) {
          var r;switch (e.storage()) {case "sparse":
              r = c(e, t, p, !1);break;default:
              r = l(e, t, p, !1);}return r;
        }, "any, Matrix": function anyMatrix(e, t) {
          var r;switch (t.storage()) {case "sparse":
              r = c(t, e, p, !0);break;default:
              r = l(t, e, p, !0);}return r;
        }, "Array, any": function ArrayAny(e, t) {
          return l(o(e), t, p, !1).valueOf();
        }, "any, Array": function anyArray(e, t) {
          return l(o(t), e, p, !0).valueOf();
        } });return p.toTex = { 2: "\\left(${args[0]}" + a.operators.xor + "${args[1]}\\right)" }, p;
    }t.name = "xor", t.factory = n;
  }, function (e, t, r) {
    e.exports = [r(313), r(437), r(331), r(438), r(439), r(83), r(315), r(440), r(317), r(330), r(320), r(441), r(442), r(335), r(444), r(445), r(446), r(447), r(288), r(389), r(347), r(392)];
  }, function (e, t, r) {
    "use strict";
    function n(e, t, n, a) {
      function o(e, t) {
        var r = Math.max(i.size(e).length, i.size(t).length);e = i.squeeze(e), t = i.squeeze(t);var n = i.size(e),
            a = i.size(t);if (1 != n.length || 1 != a.length || 3 != n[0] || 3 != a[0]) throw new RangeError("Vectors with length 3 expected (Size A = [" + n.join(", ") + "], B = [" + a.join(", ") + "])");var o = [u(c(e[1], t[2]), c(e[2], t[1])), u(c(e[2], t[0]), c(e[0], t[2])), u(c(e[0], t[1]), c(e[1], t[0]))];return r > 1 ? [o] : o;
      }var s = n(r(52)),
          u = n(r(77)),
          c = n(r(84)),
          f = a("cross", { "Matrix, Matrix": function MatrixMatrix(e, t) {
          return s(o(e.toArray(), t.toArray()));
        }, "Matrix, Array": function MatrixArray(e, t) {
          return s(o(e.toArray(), t));
        }, "Array, Matrix": function ArrayMatrix(e, t) {
          return s(o(e, t.toArray()));
        }, "Array, Array": o });return f.toTex = { 2: "\\left(${args[0]}\\right)\\times\\left(${args[1]}\\right)" }, f;
    }var i = r(40);t.name = "cross", t.factory = n;
  }, function (e, t, r) {
    "use strict";
    function n(e, t, n, o) {
      function s(e, t, r, n) {
        if (!a(t)) throw new TypeError("Second parameter in function diag must be an integer");var i = t > 0 ? t : 0,
            o = 0 > t ? -t : 0;switch (r.length) {case 1:
            return u(e, t, n, r[0], o, i);case 2:
            return c(e, t, n, r, o, i);}throw new RangeError("Matrix for function diag must be 2 dimensional");
      }function u(t, r, n, i, a, o) {
        var s = [i + a, i + o],
            u = e.Matrix.storage(n || "dense"),
            c = u.diagonal(s, t, r);return null !== n ? c : c.valueOf();
      }function c(e, t, r, n, i, a) {
        if (e && e.isMatrix === !0) {
          var o = e.diagonal(t);return null !== r ? r !== o.storage() ? f(o, r) : o : o.valueOf();
        }for (var s = Math.min(n[0] - i, n[1] - a), u = [], c = 0; s > c; c++) {
          u[c] = e[c + i][c + a];
        }return null !== r ? f(u) : u;
      }var f = n(r(52)),
          l = o("diag", { Array: function Array(e) {
          return s(e, 0, i.size(e), null);
        }, "Array, number": function ArrayNumber(e, t) {
          return s(e, t, i.size(e), null);
        }, "Array, BigNumber": function ArrayBigNumber(e, t) {
          return s(e, t.toNumber(), i.size(e), null);
        }, "Array, string": function ArrayString(e, t) {
          return s(e, 0, i.size(e), t);
        }, "Array, number, string": function ArrayNumberString(e, t, r) {
          return s(e, t, i.size(e), r);
        }, "Array, BigNumber, string": function ArrayBigNumberString(e, t, r) {
          return s(e, t.toNumber(), i.size(e), r);
        }, Matrix: function Matrix(e) {
          return s(e, 0, e.size(), e.storage());
        }, "Matrix, number": function MatrixNumber(e, t) {
          return s(e, t, e.size(), e.storage());
        }, "Matrix, BigNumber": function MatrixBigNumber(e, t) {
          return s(e, t.toNumber(), e.size(), e.storage());
        }, "Matrix, string": function MatrixString(e, t) {
          return s(e, 0, e.size(), t);
        }, "Matrix, number, string": function MatrixNumberString(e, t, r) {
          return s(e, t, e.size(), r);
        }, "Matrix, BigNumber, string": function MatrixBigNumberString(e, t, r) {
          return s(e, t.toNumber(), e.size(), r);
        } });return l.toTex = void 0, l;
    }var i = r(40),
        a = (r(3).clone, r(6).isInteger);t.name = "diag", t.factory = n;
  }, function (e, t, r) {
    "use strict";
    function n(e, t, n, a) {
      function o(e, t) {
        var r = i(e),
            n = i(t),
            a = r[0];if (1 !== r.length || 1 !== n.length) throw new RangeError("Vector expected");if (r[0] != n[0]) throw new RangeError("Vectors must have equal length (" + r[0] + " != " + n[0] + ")");if (0 == a) throw new RangeError("Cannot calculate the dot product of empty vectors");for (var o = 0, c = 0; a > c; c++) {
          o = s(o, u(e[c], t[c]));
        }return o;
      }var s = n(r(51)),
          u = n(r(84)),
          c = a("dot", { "Matrix, Matrix": function MatrixMatrix(e, t) {
          return o(e.toArray(), t.toArray());
        }, "Matrix, Array": function MatrixArray(e, t) {
          return o(e.toArray(), t);
        }, "Array, Matrix": function ArrayMatrix(e, t) {
          return o(e, t.toArray());
        }, "Array, Array": o });return c.toTex = { 2: "\\left(${args[0]}\\cdot${args[1]}\\right)" }, c;
    }var i = r(40).size;t.name = "dot", t.factory = n;
  }, function (e, t, r) {
    "use strict";
    function n(e, t, n, o) {
      var s = n(r(52)),
          u = o("flatten", { Array: function Array(e) {
          return a(i(e));
        }, Matrix: function Matrix(e) {
          var t = a(i(e.toArray()));return s(t);
        } });return u.toTex = void 0, u;
    }var i = r(3).clone,
        a = r(40).flatten;t.name = "flatten", t.factory = n;
  }, function (e, t, r) {
    "use strict";
    function n(e, t, n, o) {
      function s(t, r) {
        var n = u(t),
            i = n ? new e.BigNumber(1) : 1;if (c(t), r) {
          var o = f(r);return t.length > 0 ? o.resize(t, i) : o;
        }var s = [];return t.length > 0 ? a(s, t, i) : s;
      }function u(e) {
        var t = !1;return e.forEach(function (e, r, n) {
          e && e.isBigNumber === !0 && (t = !0, n[r] = e.toNumber());
        }), t;
      }function c(e) {
        e.forEach(function (e) {
          if ("number" != typeof e || !i(e) || 0 > e) throw new Error("Parameters in function ones must be positive integers");
        });
      }var f = n(r(52)),
          l = o("ones", { "": function _() {
          return "Array" === t.matrix ? s([]) : s([], "default");
        }, "...number | BigNumber | string": function numberBigNumberString(e) {
          var r = e[e.length - 1];if ("string" == typeof r) {
            var n = e.pop();return s(e, n);
          }return "Array" === t.matrix ? s(e) : s(e, "default");
        }, Array: s, Matrix: function Matrix(e) {
          var t = e.storage();return s(e.valueOf(), t);
        }, "Array | Matrix, string": function ArrayMatrixString(e, t) {
          return s(e.valueOf(), t);
        } });return l.toTex = void 0, l;
    }var i = r(6).isInteger,
        a = r(40).resize;t.name = "ones", t.factory = n;
  }, function (e, t, r) {
    "use strict";
    function n(e, t, n, a) {
      function o(e, t) {
        return -c(e, t);
      }function s(e, t, r) {
        if (!i(t) || 0 > t) throw new Error("k must be a non-negative integer");if (e && e.isMatrix) {
          var n = e.size();if (n.length > 1) throw new Error("Only one dimensional matrices supported");return u(e.valueOf(), t, r);
        }return Array.isArray(e) ? u(e, t, r) : void 0;
      }function u(e, t, r) {
        if (t >= e.length) throw new Error("k out of bounds");for (var n = 0, i = e.length - 1; i > n;) {
          for (var a = n, o = i, s = e[Math.floor(Math.random() * (i - n + 1)) + n]; o > a;) {
            if (r(e[a], s) >= 0) {
              var u = e[o];e[o] = e[a], e[a] = u, --o;
            } else ++a;
          }r(e[a], s) > 0 && --a, a >= t ? i = a : n = a + 1;
        }return e[t];
      }var c = n(r(443));return a("partitionSelect", { "Array | Matrix, number": function ArrayMatrixNumber(e, t) {
          return s(e, t, c);
        }, "Array | Matrix, number, string": function ArrayMatrixNumberString(e, t, r) {
          if ("asc" === r) return s(e, t, c);if ("desc" === r) return s(e, t, o);throw new Error('Compare string must be "asc" or "desc"');
        }, "Array | Matrix, number, function": s });
    }var i = r(6).isInteger;t.name = "partitionSelect", t.factory = n;
  }, function (e, t, r) {
    "use strict";
    function n(e, t, n, o) {
      var s = n(r(52)),
          u = n(r(61)),
          c = n(r(79)),
          f = n(r(63)),
          l = n(r(57)),
          p = n(r(58)),
          h = o("compare", { "boolean, boolean": function booleanBoolean(e, t) {
          return e === t ? 0 : e > t ? 1 : -1;
        }, "number, number": function numberNumber(e, r) {
          return e === r || i(e, r, t.epsilon) ? 0 : e > r ? 1 : -1;
        }, "BigNumber, BigNumber": function BigNumberBigNumber(r, n) {
          return r.eq(n) || a(r, n, t.epsilon) ? new e.BigNumber(0) : new e.BigNumber(r.cmp(n));
        }, "Fraction, Fraction": function FractionFraction(t, r) {
          return new e.Fraction(t.compare(r));
        }, "Complex, Complex": function ComplexComplex() {
          throw new TypeError("No ordering relation is defined for complex numbers");
        }, "Unit, Unit": function UnitUnit(e, t) {
          if (!e.equalBase(t)) throw new Error("Cannot compare units with different base");return h(e.value, t.value);
        }, "string, string": function stringString(e, t) {
          return e === t ? 0 : e > t ? 1 : -1;
        }, "Matrix, Matrix": function MatrixMatrix(e, t) {
          var r;switch (e.storage()) {case "sparse":
              switch (t.storage()) {case "sparse":
                  r = c(e, t, h);break;default:
                  r = u(t, e, h, !0);}break;default:
              switch (t.storage()) {case "sparse":
                  r = u(e, t, h, !1);break;default:
                  r = l(e, t, h);}}return r;
        }, "Array, Array": function ArrayArray(e, t) {
          return h(s(e), s(t)).valueOf();
        }, "Array, Matrix": function ArrayMatrix(e, t) {
          return h(s(e), t);
        }, "Matrix, Array": function MatrixArray(e, t) {
          return h(e, s(t));
        }, "Matrix, any": function MatrixAny(e, t) {
          var r;switch (e.storage()) {case "sparse":
              r = f(e, t, h, !1);break;default:
              r = p(e, t, h, !1);}return r;
        }, "any, Matrix": function anyMatrix(e, t) {
          var r;switch (t.storage()) {case "sparse":
              r = f(t, e, h, !0);break;default:
              r = p(t, e, h, !0);}return r;
        }, "Array, any": function ArrayAny(e, t) {
          return p(s(e), t, h, !1).valueOf();
        }, "any, Array": function anyArray(e, t) {
          return p(s(t), e, h, !0).valueOf();
        } });return h.toTex = void 0, h;
    }var i = r(6).nearlyEqual,
        a = r(49);t.name = "compare", t.factory = n;
  }, function (e, t, r) {
    "use strict";
    function n(e, t, n, f) {
      function l(e, t, r) {
        if (void 0 !== r) {
          if ("string" != typeof r || 1 !== r.length) throw new TypeError("Single character expected as defaultValue");
        } else r = " ";if (1 !== t.length) throw new i(t.length, 1);var n = t[0];if ("number" != typeof n || !o(n)) throw new TypeError("Invalid size, must contain positive integers (size: " + s(t) + ")");if (e.length > n) return e.substring(0, n);if (e.length < n) {
          for (var a = e, u = 0, c = n - e.length; c > u; u++) {
            a += r;
          }return a;
        }return e;
      }var p = n(r(52)),
          h = function h(e, r, n) {
        if (2 != arguments.length && 3 != arguments.length) throw new a("resize", arguments.length, 2, 3);if (r && r.isMatrix === !0 && (r = r.valueOf()), r.length && r[0] && r[0].isBigNumber === !0 && (r = r.map(function (e) {
          return e && e.isBigNumber === !0 ? e.toNumber() : e;
        })), e && e.isMatrix === !0) return e.resize(r, n, !0);if ("string" == typeof e) return l(e, r, n);var i = Array.isArray(e) ? !1 : "Array" !== t.matrix;if (0 == r.length) {
          for (; Array.isArray(e);) {
            e = e[0];
          }return u(e);
        }Array.isArray(e) || (e = [e]), e = u(e);var o = c.resize(e, r, n);return i ? p(o) : o;
      };return h.toTex = void 0, h;
    }var i = r(42),
        a = r(11),
        o = r(6).isInteger,
        s = r(23).format,
        u = r(3).clone,
        c = r(40);t.name = "resize", t.factory = n;
  }, function (e, t, r) {
    "use strict";
    function n(e, t, n, a) {
      var o = n(r(52)),
          s = a("size", { Matrix: function Matrix(e) {
          return o(e.size());
        }, Array: i.size, string: function string(e) {
          return "Array" === t.matrix ? [e.length] : o([e.length]);
        }, "number | Complex | BigNumber | Unit | boolean | null": function numberComplexBigNumberUnitBooleanNull(e) {
          return "Array" === t.matrix ? [] : o([]);
        } });return s.toTex = void 0, s;
    }var i = r(40);t.name = "size", t.factory = n;
  }, function (e, t, r) {
    "use strict";
    function n(e, t, n, a) {
      function o(e) {
        if ("asc" === e) return f;if ("desc" === e) return l;throw new Error('String "asc" or "desc" expected');
      }function s(e) {
        if (1 !== i(e).length) throw new Error("One dimensional array expected");
      }function u(e) {
        if (1 !== e.size().length) throw new Error("One dimensional matrix expected");
      }var c = n(r(52)),
          f = n(r(443)),
          l = function l(e, t) {
        return -f(e, t);
      },
          p = a("sort", { Array: function Array(e) {
          return s(e), e.sort(f);
        }, Matrix: function Matrix(e) {
          return u(e), c(e.toArray().sort(f), e.storage());
        }, "Array, function": function ArrayFunction(e, t) {
          return s(e), e.sort(t);
        }, "Matrix, function": function MatrixFunction(e, t) {
          return u(e), c(e.toArray().sort(t), e.storage());
        }, "Array, string": function ArrayString(e, t) {
          return s(e), e.sort(o(t));
        }, "Matrix, string": function MatrixString(e, t) {
          return u(e), c(e.toArray().sort(o(t)), e.storage());
        } });return p.toTex = void 0, p;
    }var i = r(40).size;t.name = "sort", t.factory = n;
  }, function (e, t, r) {
    "use strict";
    function n(e, t, n, o) {
      var s = n(r(52)),
          u = o("squeeze", { Array: function Array(e) {
          return a.squeeze(i.clone(e));
        }, Matrix: function Matrix(e) {
          var t = a.squeeze(e.toArray());return Array.isArray(t) ? s(t) : t;
        }, any: function any(e) {
          return i.clone(e);
        } });return u.toTex = void 0, u;
    }var i = r(3),
        a = r(40);t.name = "squeeze", t.factory = n;
  }, function (e, t, r) {
    e.exports = [r(418), r(416), r(417), r(449), r(451), r(452), r(453), r(455), r(456)];
  }, function (e, t, r) {
    "use strict";
    function n(e, t, n, i) {
      function a(e, t) {
        var r = t.size().length,
            n = e.size().length;if (r > 1) throw new Error("first object must be one dimensional");if (n > 1) throw new Error("second object must be one dimensional");if (r !== n) throw new Error("Length of two vectors must be equal");var i = u(e);if (0 === i) throw new Error("Sum of elements in first object must be non zero");var a = u(t);if (0 === a) throw new Error("Sum of elements in second object must be non zero");var o = s(e, u(e)),
            h = s(t, u(t)),
            m = u(c(o, l(f(o, h))));return p(m) ? m : Number.NaN;
      }var o = n(r(52)),
          s = n(r(329)),
          u = n(r(450)),
          c = n(r(84)),
          f = n(r(371)),
          l = n(r(385)),
          p = n(r(89)),
          h = i("kldivergence", { "Array, Array": function ArrayArray(e, t) {
          return a(o(e), o(t));
        }, "Matrix, Array": function MatrixArray(e, t) {
          return a(e, o(t));
        }, "Array, Matrix": function ArrayMatrix(e, t) {
          return a(o(e), t);
        }, "Matrix, Matrix": function MatrixMatrix(e, t) {
          return a(e, t);
        } });return h;
    }t.name = "kldivergence", t.factory = n;
  }, function (e, t, r) {
    "use strict";
    function n(e, t, n, a) {
      function o(r) {
        var n = void 0;if (i(r, function (e) {
          n = void 0 === n ? e : s(n, e);
        }), void 0 === n) switch (t.number) {case "number":
            return 0;case "BigNumber":
            return new e.BigNumber(0);case "Fraction":
            return new e.Fraction(0);default:
            return 0;}return n;
      }var s = n(r(53)),
          u = a("sum", { "Array | Matrix": function ArrayMatrix(e) {
          return o(e);
        }, "Array | Matrix, number | BigNumber": function ArrayMatrixNumberBigNumber() {
          throw new Error("sum(A, dim) is not yet supported");
        }, "...": function _(e) {
          return o(e);
        } });return u.toTex = void 0, u;
    }var i = r(324);t.name = "sum", t.factory = n;
  }, function (e, t, r) {
    "use strict";
    function n(e, t, n, a) {
      var o = n(r(51)),
          s = n(r(84)),
          u = n(r(329)),
          c = n(r(416)),
          f = n(r(419)),
          l = n(r(381));return a("multinomial", { "Array | Matrix": function ArrayMatrix(e) {
          var t = 0,
              r = 1;return i(e, function (e) {
            if (!f(e) || !l(e)) throw new TypeError("Positive integer value expected in function multinomial");t = o(t, e), r = s(r, c(e));
          }), u(c(t), r);
        } });
    }var i = r(324);t.name = "multinomial", t.factory = n;
  }, function (e, t, r) {
    "use strict";
    function n(e, t, n, o) {
      var s = n(r(416)),
          u = o("permutations", { "number | BigNumber": s, "number, number": function numberNumber(e, t) {
          var r, n;if (!a(e) || 0 > e) throw new TypeError("Positive integer value expected in function permutations");if (!a(t) || 0 > t) throw new TypeError("Positive integer value expected in function permutations");if (t > e) throw new TypeError("second argument k must be less than or equal to first argument n");for (r = 1, n = e - t + 1; e >= n; n++) {
            r *= n;
          }return r;
        }, "BigNumber, BigNumber": function BigNumberBigNumber(t, r) {
          var n, a;if (!i(t) || !i(r)) throw new TypeError("Positive integer value expected in function permutations");if (r.gt(t)) throw new TypeError("second argument k must be less than or equal to first argument n");for (n = new e.BigNumber(1), a = t.minus(r).plus(1); a.lte(t); a = a.plus(1)) {
            n = n.times(a);
          }return n;
        } });return u.toTex = void 0, u;
    }function i(e) {
      return e.isInteger() && e.gte(0);
    }var a = r(6).isInteger;t.name = "permutations", t.factory = n;
  }, function (e, t, r) {
    "use strict";
    function n(e, t, n, i) {
      var a = n(r(454)),
          o = a("uniform").pickRandom;return o.toTex = void 0, o;
    }t.name = "pickRandom", t.factory = n;
  }, function (e, t, r) {
    "use strict";
    function n(e, t, n, s) {
      function u(e) {
        if (!l.hasOwnProperty(e)) throw new Error("Unknown distribution " + e);var t = Array.prototype.slice.call(arguments, 1),
            r = l[e].apply(this, t);return function (e) {
          var t = { random: function random(e, t, r) {
              var s, u, f;if (arguments.length > 3) throw new i("random", arguments.length, 0, 3);if (1 === arguments.length ? a(e) ? s = e : f = e : 2 === arguments.length ? a(e) ? (s = e, f = t) : (u = e, f = t) : (s = e, u = t, f = r), void 0 !== u && !o(u) || void 0 !== f && !o(f)) throw new TypeError("Invalid argument in function random");if (void 0 === f && (f = 1), void 0 === u && (u = 0), void 0 !== s) {
                var p = l(s.valueOf(), u, f, n);return s && s.isMatrix === !0 ? c(p) : p;
              }return n(u, f);
            }, randomInt: s({ "number | Array": function numberArray(e) {
                var t = 0;if (a(e)) {
                  var r = e,
                      n = 1,
                      i = l(r.valueOf(), t, n, u);return r && r.isMatrix === !0 ? c(i) : i;
                }var n = e;return u(t, n);
              }, "number | Array, number": function numberArrayNumber(e, t) {
                if (a(e)) {
                  var r = e,
                      n = t,
                      i = 0,
                      o = l(r.valueOf(), i, n, u);return r && r.isMatrix === !0 ? c(o) : o;
                }var i = e,
                    n = t;return u(i, n);
              }, "Array, number, number": function ArrayNumberNumber(e, t, r) {
                var n = l(e.valueOf(), t, r, u);return e && e.isMatrix === !0 ? c(n) : n;
              } }), pickRandom: s({ Array: function Array(e) {
                return r(e);
              }, "Array, number | Array": function ArrayNumberArray(e, t) {
                var n, i;if (Array.isArray(t)) i = t;else {
                  if (!o(t)) throw new TypeError("Invalid argument in function pickRandom");n = t;
                }return r(e, n, i);
              }, "Array, number | Array, Array | number": function ArrayNumberArrayArrayNumber(e, t, n) {
                var i, a;if (Array.isArray(t) ? (a = t, i = n) : (a = n, i = t), !Array.isArray(a) || !o(i)) throw new TypeError("Invalid argument in function pickRandom");return r(e, i, a);
              } }) },
              r = function r(e, t, _r3) {
            var n = "undefined" == typeof t;if (n && (t = 1), e && e.isMatrix === !0) e = e.valueOf();else if (!Array.isArray(e)) throw new TypeError("Unsupported type of value in function pickRandom");if (f.size(e).length > 1) throw new Error("Only one dimensional vectors supported");if ("undefined" != typeof _r3) {
              if (_r3.length != e.length) throw new Error("Weights must have the same length as possibles");for (var i = 0, a = 0, s = _r3.length; s > a; a++) {
                if (!o(_r3[a]) || _r3[a] < 0) throw new Error("Weights must be an array of positive numbers");i += _r3[a];
              }
            }var u = e.length;if (0 == u) return [];if (t >= u) return e;for (var c, l = []; l.length < t;) {
              if ("undefined" == typeof _r3) c = e[Math.floor(Math.random() * u)];else for (var p = Math.random() * i, a = 0, s = e.length; s > a; a++) {
                if (p -= _r3[a], 0 > p) {
                  c = e[a];break;
                }
              }-1 == l.indexOf(c) && l.push(c);
            }return n ? l[0] : l;
          },
              n = function n(t, r) {
            return t + e() * (r - t);
          },
              u = function u(t, r) {
            return Math.floor(t + e() * (r - t));
          },
              l = function l(e, t, r, n) {
            var i,
                a,
                o = [];if (e = e.slice(0), e.length > 1) for (var a = 0, i = e.shift(); i > a; a++) {
              o.push(l(e, t, r, n));
            } else for (var a = 0, i = e.shift(); i > a; a++) {
              o.push(n(t, r));
            }return o;
          };return t;
        }(r);
      }var c = n(r(52)),
          f = r(40),
          l = { uniform: function uniform() {
          return Math.random;
        }, normal: function normal() {
          return function () {
            for (var e, t, r = -1; 0 > r || r > 1;) {
              e = Math.random(), t = Math.random(), r = 1 / 6 * Math.pow(-2 * Math.log(e), .5) * Math.cos(2 * Math.PI * t) + .5;
            }return r;
          };
        } };return u.toTex = void 0, u;
    }var i = r(11),
        a = r(322),
        o = r(6).isNumber;t.name = "distribution", t.factory = n;
  }, function (e, t, r) {
    "use strict";
    function n(e, t, n, i) {
      var a = n(r(454)),
          o = a("uniform").random;return o.toTex = void 0, o;
    }t.name = "random", t.factory = n;
  }, function (e, t, r) {
    "use strict";
    function n(e, t, n, i) {
      var a = n(r(454)),
          o = a("uniform").randomInt;return o.toTex = void 0, o;
    }t.name = "randomInt", t.factory = n;
  }, function (e, t, r) {
    e.exports = [r(443), r(458), r(88), r(64), r(354), r(60), r(459), r(460)];
  }, function (e, t, r) {
    "use strict";
    function n(e, t, n, i) {
      function a(e, t) {
        if (Array.isArray(e)) {
          if (Array.isArray(t)) {
            var r = e.length;if (r !== t.length) return !1;for (var n = 0; r > n; n++) {
              if (!a(e[n], t[n])) return !1;
            }return !0;
          }return !1;
        }return Array.isArray(t) ? !1 : o(e, t);
      }var o = n(r(88)),
          s = i("deepEqual", { "any, any": function anyAny(e, t) {
          return a(e.valueOf(), t.valueOf());
        } });return s.toTex = void 0, s;
    }t.name = "deepEqual", t.factory = n;
  }, function (e, t, r) {
    "use strict";
    function n(e, t, n, o) {
      var s = n(r(52)),
          u = n(r(61)),
          c = n(r(62)),
          f = n(r(63)),
          l = n(r(57)),
          p = n(r(58)),
          h = r(32),
          m = o("smallerEq", { "boolean, boolean": function booleanBoolean(e, t) {
          return t >= e;
        }, "number, number": function numberNumber(e, r) {
          return r >= e || i(e, r, t.epsilon);
        }, "BigNumber, BigNumber": function BigNumberBigNumber(e, r) {
          return e.lte(r) || a(e, r, t.epsilon);
        }, "Fraction, Fraction": function FractionFraction(e, t) {
          return 1 !== e.compare(t);
        }, "Complex, Complex": function ComplexComplex() {
          throw new TypeError("No ordering relation is defined for complex numbers");
        }, "Unit, Unit": function UnitUnit(e, t) {
          if (!e.equalBase(t)) throw new Error("Cannot compare units with different base");return m(e.value, t.value);
        }, "string, string": function stringString(e, t) {
          return t >= e;
        }, "Matrix, Matrix": function MatrixMatrix(e, t) {
          var r;switch (e.storage()) {case "sparse":
              switch (t.storage()) {case "sparse":
                  r = c(e, t, m);break;default:
                  r = u(t, e, m, !0);}break;default:
              switch (t.storage()) {case "sparse":
                  r = u(e, t, m, !1);break;default:
                  r = l(e, t, m);}}return r;
        }, "Array, Array": function ArrayArray(e, t) {
          return m(s(e), s(t)).valueOf();
        }, "Array, Matrix": function ArrayMatrix(e, t) {
          return m(s(e), t);
        }, "Matrix, Array": function MatrixArray(e, t) {
          return m(e, s(t));
        }, "Matrix, any": function MatrixAny(e, t) {
          var r;switch (e.storage()) {case "sparse":
              r = f(e, t, m, !1);break;default:
              r = p(e, t, m, !1);}return r;
        }, "any, Matrix": function anyMatrix(e, t) {
          var r;switch (t.storage()) {case "sparse":
              r = f(t, e, m, !0);break;default:
              r = p(t, e, m, !0);}return r;
        }, "Array, any": function ArrayAny(e, t) {
          return p(s(e), t, m, !1).valueOf();
        }, "any, Array": function anyArray(e, t) {
          return p(s(t), e, m, !0).valueOf();
        } });return m.toTex = { 2: "\\left(${args[0]}" + h.operators.smallerEq + "${args[1]}\\right)" }, m;
    }var i = r(6).nearlyEqual,
        a = r(49);t.name = "smallerEq", t.factory = n;
  }, function (e, t, r) {
    "use strict";
    function n(e, t, n, o) {
      var s = n(r(52)),
          u = n(r(61)),
          c = n(r(62)),
          f = n(r(63)),
          l = n(r(57)),
          p = n(r(58)),
          h = r(32),
          m = o("unequal", { "any, any": function anyAny(e, t) {
          return null === e ? null !== t : null === t ? null !== e : void 0 === e ? void 0 !== t : void 0 === t ? void 0 !== e : d(e, t);
        }, "Matrix, Matrix": function MatrixMatrix(e, t) {
          var r;switch (e.storage()) {case "sparse":
              switch (t.storage()) {case "sparse":
                  r = c(e, t, d);break;default:
                  r = u(t, e, d, !0);}break;default:
              switch (t.storage()) {case "sparse":
                  r = u(e, t, d, !1);break;default:
                  r = l(e, t, d);}}return r;
        }, "Array, Array": function ArrayArray(e, t) {
          return m(s(e), s(t)).valueOf();
        }, "Array, Matrix": function ArrayMatrix(e, t) {
          return m(s(e), t);
        }, "Matrix, Array": function MatrixArray(e, t) {
          return m(e, s(t));
        }, "Matrix, any": function MatrixAny(e, t) {
          var r;switch (e.storage()) {case "sparse":
              r = f(e, t, d, !1);break;default:
              r = p(e, t, d, !1);}return r;
        }, "any, Matrix": function anyMatrix(e, t) {
          var r;switch (t.storage()) {case "sparse":
              r = f(t, e, d, !0);break;default:
              r = p(t, e, d, !0);}return r;
        }, "Array, any": function ArrayAny(e, t) {
          return p(s(e), t, d, !1).valueOf();
        }, "any, Array": function anyArray(e, t) {
          return p(s(t), e, d, !0).valueOf();
        } }),
          d = o("_unequal", { "boolean, boolean": function booleanBoolean(e, t) {
          return e !== t;
        }, "number, number": function numberNumber(e, r) {
          return !i(e, r, t.epsilon);
        }, "BigNumber, BigNumber": function BigNumberBigNumber(e, r) {
          return !a(e, r, t.epsilon);
        }, "Fraction, Fraction": function FractionFraction(e, t) {
          return !e.equals(t);
        }, "Complex, Complex": function ComplexComplex(e, t) {
          return !e.equals(t);
        }, "Unit, Unit": function UnitUnit(e, t) {
          if (!e.equalBase(t)) throw new Error("Cannot compare units with different base");return m(e.value, t.value);
        }, "string, string": function stringString(e, t) {
          return e !== t;
        } });return m.toTex = { 2: "\\left(${args[0]}" + h.operators.unequal + "${args[1]}\\right)" }, m;
    }var i = r(6).nearlyEqual,
        a = r(49);t.name = "unequal", t.factory = n;
  }, function (e, t, r) {
    e.exports = [r(462)];
  }, function (e, t, r) {
    "use strict";
    function n(e, t, r, n) {
      function l(e) {
        var t,
            r = e * e,
            n = u[0][4] * r,
            i = r;for (t = 0; 3 > t; t += 1) {
          n = (n + u[0][t]) * r, i = (i + c[0][t]) * r;
        }return e * (n + u[0][3]) / (i + c[0][3]);
      }function p(e) {
        var t,
            r = u[1][8] * e,
            n = e;for (t = 0; 7 > t; t += 1) {
          r = (r + u[1][t]) * e, n = (n + c[1][t]) * e;
        }var i = (r + u[1][7]) / (n + c[1][7]),
            a = parseInt(16 * e) / 16,
            o = (e - a) * (e + a);return Math.exp(-a * a) * Math.exp(-o) * i;
      }function h(e) {
        var t,
            r = 1 / (e * e),
            n = u[2][5] * r,
            i = r;for (t = 0; 4 > t; t += 1) {
          n = (n + u[2][t]) * r, i = (i + c[2][t]) * r;
        }var a = r * (n + u[2][4]) / (i + c[2][4]);a = (s - a) / e, r = parseInt(16 * e) / 16;var o = (e - r) * (e + r);return Math.exp(-r * r) * Math.exp(-o) * a;
      }var m = n("erf", { number: function number(e) {
          var t = Math.abs(e);return t >= f ? a(e) : o >= t ? a(e) * l(t) : 4 >= t ? a(e) * (1 - p(t)) : a(e) * (1 - h(t));
        }, BigNumber: function BigNumber(t) {
          return new e.BigNumber(m(t.toNumber()));
        }, "Array | Matrix": function ArrayMatrix(e) {
          return i(e, m);
        } });return m.toTex = { 1: "erf\\left(${args[0]}\\right)" }, m;
    }var i = r(19),
        a = r(6).sign,
        o = .46875,
        s = .5641895835477563,
        u = [[3.1611237438705655, 113.86415415105016, 377.485237685302, 3209.3775891384694, .18577770618460315], [.5641884969886701, 8.883149794388377, 66.11919063714163, 298.6351381974001, 881.952221241769, 1712.0476126340707, 2051.0783778260716, 1230.3393547979972, 2.1531153547440383e-8], [.30532663496123236, .36034489994980445, .12578172611122926, .016083785148742275, .0006587491615298378, .016315387137302097]],
        c = [[23.601290952344122, 244.02463793444417, 1282.6165260773723, 2844.236833439171], [15.744926110709835, 117.6939508913125, 537.1811018620099, 1621.3895745666903, 3290.7992357334597, 4362.619090143247, 3439.3676741437216, 1230.3393548037495], [2.568520192289822, 1.8729528499234604, .5279051029514285, .06051834131244132, .0023352049762686918]],
        f = Math.pow(2, 53);
    t.name = "erf", t.factory = n;
  }, function (e, t, r) {
    e.exports = [r(323), r(328), r(464), r(333), r(465), r(466), r(467), r(468), r(450), r(469)];
  }, function (e, t, r) {
    "use strict";
    function n(e, t, n, o) {
      function s(e) {
        e = i(e.valueOf());var t = e.length;if (0 == t) throw new Error("Cannot calculate median of an empty array");if (t % 2 == 0) {
          for (var r = t / 2 - 1, n = l(e, r + 1), a = e[r], o = 0; r > o; ++o) {
            f(e[o], a) > 0 && (a = e[o]);
          }return m(a, n);
        }var s = l(e, (t - 1) / 2);return h(s);
      }var u = n(r(53)),
          c = n(r(81)),
          f = n(r(443)),
          l = n(r(442)),
          p = o("median", { "Array | Matrix": s, "Array | Matrix, number | BigNumber": function ArrayMatrixNumberBigNumber(e, t) {
          throw new Error("median(A, dim) is not yet supported");
        }, "...": function _(e) {
          if (a(e)) throw new TypeError("Scalar values expected in function median");return s(e);
        } }),
          h = o({ "number | BigNumber | Unit": function numberBigNumberUnit(e) {
          return e;
        } }),
          m = o({ "number | BigNumber | Unit, number | BigNumber | Unit": function numberBigNumberUnitNumberBigNumberUnit(e, t) {
          return c(u(e, t), 2);
        } });return p.toTex = void 0, p;
    }var i = r(40).flatten,
        a = (r(325), r(326));t.name = "median", t.factory = n;
  }, function (e, t, r) {
    "use strict";
    function n(e, t, r, n) {
      function a(e) {
        e = i(e.valueOf());var t = e.length;if (0 == t) throw new Error("Cannot calculate mode of an empty array");var r = {},
            n = [],
            a = 0;for (var o in e) {
          e[o] in r || (r[e[o]] = 0), r[e[o]]++, r[e[o]] == a ? n.push(e[o]) : r[e[o]] > a && (a = r[e[o]], n = [e[o]]);
        }return n;
      }var o = n("mode", { "Array | Matrix": a, "...": function _(e) {
          return a(e);
        } });return o;
    }var i = r(40).flatten;t.name = "mode", t.factory = n;
  }, function (e, t, r) {
    "use strict";
    function n(e, t, n, a) {
      function o(e) {
        var t = void 0;if (i(e, function (e) {
          t = void 0 === t ? e : s(t, e);
        }), void 0 === t) throw new Error("Cannot calculate prod of an empty array");return t;
      }var s = n(r(80)),
          u = a("prod", { "Array | Matrix": o, "Array | Matrix, number | BigNumber": function ArrayMatrixNumberBigNumber(e, t) {
          throw new Error("prod(A, dim) is not yet supported");
        }, "...": function _(e) {
          return o(e);
        } });return u.toTex = void 0, u;
    }var i = r(324);t.name = "prod", t.factory = n;
  }, function (e, t, r) {
    "use strict";
    function n(e, t, n, u) {
      function c(t, r, n) {
        var o, u, c;if (arguments.length < 2 || arguments.length > 3) throw new SyntaxError("Function quantileSeq requires two or three parameters");if (s(t)) {
          if (n = n || !1, "boolean" == typeof n) {
            if (u = t.valueOf(), a(r)) {
              if (0 > r) throw new Error("N/prob must be non-negative");if (1 >= r) return f(u, r, n);if (r > 1) {
                if (!i(r)) throw new Error("N must be a positive integer");var l = r + 1;o = new Array(r);for (var p = 0; r > p;) {
                  o[p] = f(u, ++p / l, n);
                }return o;
              }
            }if (r && r.isBigNumber) {
              if (r.isNegative()) throw new Error("N/prob must be non-negative");if (c = new r.constructor(1), r.lte(c)) return f(u, r, n);if (r.gt(c)) {
                if (!r.isInteger()) throw new Error("N must be a positive integer");var h = r.toNumber();if (h > 4294967295) throw new Error("N must be less than or equal to 2^32-1, as that is the maximum length of an Array");var l = new e.BigNumber(h + 1);o = new Array(h);for (var p = 0; h > p;) {
                  o[p] = f(u, new e.BigNumber(++p).div(l), n);
                }return o;
              }
            }if (Array.isArray(r)) {
              o = new Array(r.length);for (var p = 0; p < o.length; ++p) {
                var m = r[p];if (a(m)) {
                  if (0 > m || m > 1) throw new Error("Probability must be between 0 and 1, inclusive");
                } else {
                  if (!m || !m.isBigNumber) throw new TypeError("Unexpected type of argument in function quantileSeq");if (c = new m.constructor(1), m.isNegative() || m.gt(c)) throw new Error("Probability must be between 0 and 1, inclusive");
                }o[p] = f(u, m, n);
              }return o;
            }throw new TypeError("Unexpected type of argument in function quantileSeq");
          }throw new TypeError("Unexpected type of argument in function quantileSeq");
        }throw new TypeError("Unexpected type of argument in function quantileSeq");
      }function f(e, t, r) {
        var n = o(e),
            i = n.length;if (0 === i) throw new Error("Cannot calculate quantile of an empty sequence");if (a(t)) {
          var s = t * (i - 1),
              u = s % 1;if (0 === u) {
            var c = r ? n[s] : h(n, s);return d(c), c;
          }var f,
              g,
              v = Math.floor(s);if (r) f = n[v], g = n[v + 1];else {
            g = h(n, v + 1), f = n[v];for (var y = 0; v > y; ++y) {
              m(n[y], f) > 0 && (f = n[y]);
            }
          }return d(f), d(g), l(p(f, 1 - u), p(g, u));
        }var s = t.times(i - 1);if (s.isInteger()) {
          s = s.toNumber();var c = r ? n[s] : h(n, s);return d(c), c;
        }var f,
            g,
            v = s.floor(),
            u = s.minus(v),
            x = v.toNumber();if (r) f = n[x], g = n[x + 1];else {
          g = h(n, x + 1), f = n[x];for (var y = 0; x > y; ++y) {
            m(n[y], f) > 0 && (f = n[y]);
          }
        }d(f), d(g);var b = new u.constructor(1);return l(p(f, b.minus(u)), p(g, u));
      }var l = n(r(51)),
          p = n(r(84)),
          h = n(r(442)),
          m = n(r(443)),
          d = u({ "number | BigNumber | Unit": function numberBigNumberUnit(e) {
          return e;
        } });return c;
    }var i = r(6).isInteger,
        a = r(6).isNumber,
        o = r(40).flatten,
        s = r(322);t.name = "quantileSeq", t.factory = n;
  }, function (e, t, r) {
    "use strict";
    function n(e, t, n, i) {
      function a(e, t) {
        if (0 == e.length) throw new SyntaxError("Function std requires one or more parameters (0 provided)");return o(s.apply(null, arguments));
      }var o = n(r(380)),
          s = n(r(469)),
          u = i("std", { "Array | Matrix": a, "Array | Matrix, string": a, "...": function _(e) {
          return a(e);
        } });return u.toTex = void 0, u;
    }t.name = "std", t.factory = n;
  }, function (e, t, r) {
    "use strict";
    function n(e, t, n, o) {
      function s(t, r) {
        var n = 0,
            i = 0;if (0 == t.length) throw new SyntaxError("Function var requires one or more parameters (0 provided)");if (a(t, function (e) {
          n = u(n, e), i++;
        }), 0 === i) throw new Error("Cannot calculate var of an empty array");var o = l(n, i);switch (n = 0, a(t, function (e) {
          var t = c(e, o);n = u(n, f(t, t));
        }), r) {case "uncorrected":
            return l(n, i);case "biased":
            return l(n, i + 1);case "unbiased":
            var s = n && n.isBigNumber === !0 ? new e.BigNumber(0) : 0;return 1 == i ? s : l(n, i - 1);default:
            throw new Error('Unknown normalization "' + r + '". Choose "unbiased" (default), "uncorrected", or "biased".');}
      }var u = n(r(53)),
          c = n(r(77)),
          f = n(r(80)),
          l = n(r(81)),
          p = o("variance", { "Array | Matrix": function ArrayMatrix(e) {
          return s(e, i);
        }, "Array | Matrix, string": s, "...": function _(e) {
          return s(e, i);
        } });return p.toTex = "\\mathrm{Var}\\left(${args}\\right)", p;
    }var i = "unbiased",
        a = r(324);t.name = "var", t.factory = n;
  }, function (e, t, r) {
    e.exports = [r(90), r(471)];
  }, function (e, t, r) {
    "use strict";
    function n(e, t, r, n) {
      var a = n("print", { "string, Object": i, "string, Object, number | Object": i });return a.toTex = void 0, a;
    }function i(e, t, r) {
      return e.replace(/\$([\w\.]+)/g, function (e, n) {
        for (var i = n.split("."), s = t[i.shift()]; i.length && void 0 !== s;) {
          var u = i.shift();s = u ? s[u] : s + ".";
        }return void 0 !== s ? a(s) ? s : o(s, r) : e;
      });
    }var a = r(23).isString,
        o = r(23).format;t.name = "print", t.factory = n;
  }, function (e, t, r) {
    e.exports = [r(473), r(474), r(475), r(476), r(477), r(478), r(479), r(480), r(481), r(482), r(483), r(484), r(485), r(486), r(487), r(488), r(489), r(490), r(491), r(492), r(493), r(494), r(495), r(496), r(497)];
  }, function (e, t, r) {
    "use strict";
    function n(e, t, r, n) {
      var a = n("acos", { number: function number(r) {
          return r >= -1 && 1 >= r || t.predictable ? Math.acos(r) : new e.Complex(r, 0).acos();
        }, Complex: function Complex(e) {
          return e.acos();
        }, BigNumber: function BigNumber(e) {
          return e.acos();
        }, "Array | Matrix": function ArrayMatrix(e) {
          return i(e, a);
        } });return a.toTex = { 1: "\\cos^{-1}\\left(${args[0]}\\right)" }, a;
    }var i = r(19);t.name = "acos", t.factory = n;
  }, function (e, t, r) {
    "use strict";
    function n(e, t, r, n) {
      var o = n("acosh", { number: function number(r) {
          return r >= 1 || t.predictable ? a(r) : -1 >= r ? new e.Complex(Math.log(Math.sqrt(r * r - 1) - r), Math.PI) : new e.Complex(r, 0).acosh();
        }, Complex: function Complex(e) {
          return e.acosh();
        }, BigNumber: function BigNumber(e) {
          return e.acosh();
        }, "Array | Matrix": function ArrayMatrix(e) {
          return i(e, o);
        } });return o.toTex = { 1: "\\cosh^{-1}\\left(${args[0]}\\right)" }, o;
    }var i = r(19),
        a = Math.acosh || function (e) {
      return Math.log(Math.sqrt(e * e - 1) + e);
    };t.name = "acosh", t.factory = n;
  }, function (e, t, r) {
    "use strict";
    function n(e, t, r, n) {
      var a = n("acot", { number: function number(e) {
          return Math.atan(1 / e);
        }, Complex: function Complex(e) {
          return e.acot();
        }, BigNumber: function BigNumber(t) {
          return new e.BigNumber(1).div(t).atan();
        }, "Array | Matrix": function ArrayMatrix(e) {
          return i(e, a);
        } });return a.toTex = { 1: "\\cot^{-1}\\left(${args[0]}\\right)" }, a;
    }var i = r(19);t.name = "acot", t.factory = n;
  }, function (e, t, r) {
    "use strict";
    function n(e, t, r, n) {
      var a = n("acoth", { number: function number(r) {
          return r >= 1 || -1 >= r || t.predictable ? isFinite(r) ? (Math.log((r + 1) / r) + Math.log(r / (r - 1))) / 2 : 0 : new e.Complex(r, 0).acoth();
        }, Complex: function Complex(e) {
          return e.acoth();
        }, BigNumber: function BigNumber(t) {
          return new e.BigNumber(1).div(t).atanh();
        }, "Array | Matrix": function ArrayMatrix(e) {
          return i(e, a);
        } });return a.toTex = { 1: "\\coth^{-1}\\left(${args[0]}\\right)" }, a;
    }var i = r(19);t.name = "acoth", t.factory = n;
  }, function (e, t, r) {
    "use strict";
    function n(e, t, r, n) {
      var a = n("acsc", { number: function number(r) {
          return -1 >= r || r >= 1 || t.predictable ? Math.asin(1 / r) : new e.Complex(r, 0).acsc();
        }, Complex: function Complex(e) {
          return e.acsc();
        }, BigNumber: function BigNumber(t) {
          return new e.BigNumber(1).div(t).asin();
        }, "Array | Matrix": function ArrayMatrix(e) {
          return i(e, a);
        } });return a.toTex = { 1: "\\csc^{-1}\\left(${args[0]}\\right)" }, a;
    }var i = r(19);t.name = "acsc", t.factory = n;
  }, function (e, t, r) {
    "use strict";
    function n(e, t, r, n) {
      var a = n("acsch", { number: function number(e) {
          return e = 1 / e, Math.log(e + Math.sqrt(e * e + 1));
        }, Complex: function Complex(e) {
          return e.acsch();
        }, BigNumber: function BigNumber(t) {
          return new e.BigNumber(1).div(t).asinh();
        }, "Array | Matrix": function ArrayMatrix(e) {
          return i(e, a);
        } });return a.toTex = { 1: "\\mathrm{csch}^{-1}\\left(${args[0]}\\right)" }, a;
    }var i = r(19);t.name = "acsch", t.factory = n;
  }, function (e, t, r) {
    "use strict";
    function n(e, t, r, n) {
      var a = n("asec", { number: function number(r) {
          return -1 >= r || r >= 1 || t.predictable ? Math.acos(1 / r) : new e.Complex(r, 0).asec();
        }, Complex: function Complex(e) {
          return e.asec();
        }, BigNumber: function BigNumber(t) {
          return new e.BigNumber(1).div(t).acos();
        }, "Array | Matrix": function ArrayMatrix(e) {
          return i(e, a);
        } });return a.toTex = { 1: "\\sec^{-1}\\left(${args[0]}\\right)" }, a;
    }var i = r(19);t.name = "asec", t.factory = n;
  }, function (e, t, r) {
    "use strict";
    function n(e, t, n, a) {
      var o = (a.find(n(r(474)), ["Complex"]), a("asech", { number: function number(r) {
          if (1 >= r && r >= -1 || t.predictable) {
            r = 1 / r;var n = Math.sqrt(r * r - 1);return r > 0 || t.predictable ? Math.log(n + r) : new e.Complex(Math.log(n - r), Math.PI);
          }return new e.Complex(r, 0).asech();
        }, Complex: function Complex(e) {
          return e.asech();
        }, BigNumber: function BigNumber(t) {
          return new e.BigNumber(1).div(t).acosh();
        }, "Array | Matrix": function ArrayMatrix(e) {
          return i(e, o);
        } }));return o.toTex = { 1: "\\mathrm{sech}^{-1}\\left(${args[0]}\\right)" }, o;
    }var i = r(19);t.name = "asech", t.factory = n;
  }, function (e, t, r) {
    "use strict";
    function n(e, t, r, n) {
      var a = n("asin", { number: function number(r) {
          return r >= -1 && 1 >= r || t.predictable ? Math.asin(r) : new e.Complex(r, 0).asin();
        }, Complex: function Complex(e) {
          return e.asin();
        }, BigNumber: function BigNumber(e) {
          return e.asin();
        }, "Array | Matrix": function ArrayMatrix(e) {
          return i(e, a, !0);
        } });return a.toTex = { 1: "\\sin^{-1}\\left(${args[0]}\\right)" }, a;
    }var i = r(19);t.name = "asin", t.factory = n;
  }, function (e, t, r) {
    "use strict";
    function n(e, t, r, n) {
      var a = n("asinh", { number: Math.asinh || function (e) {
          return Math.log(Math.sqrt(e * e + 1) + e);
        }, Complex: function Complex(e) {
          return e.asinh();
        }, BigNumber: function BigNumber(e) {
          return e.asinh();
        }, "Array | Matrix": function ArrayMatrix(e) {
          return i(e, a, !0);
        } });return a.toTex = { 1: "\\sinh^{-1}\\left(${args[0]}\\right)" }, a;
    }var i = r(19);t.name = "asinh", t.factory = n;
  }, function (e, t, r) {
    "use strict";
    function n(e, t, r, n) {
      var a = n("atan", { number: function number(e) {
          return Math.atan(e);
        }, Complex: function Complex(e) {
          return e.atan();
        }, BigNumber: function BigNumber(e) {
          return e.atan();
        }, "Array | Matrix": function ArrayMatrix(e) {
          return i(e, a, !0);
        } });return a.toTex = { 1: "\\tan^{-1}\\left(${args[0]}\\right)" }, a;
    }var i = r(19);t.name = "atan", t.factory = n;
  }, function (e, t, r) {
    "use strict";
    function n(e, t, n, i) {
      var a = n(r(52)),
          o = n(r(372)),
          s = n(r(61)),
          u = n(r(374)),
          c = n(r(85)),
          f = n(r(63)),
          l = n(r(57)),
          p = n(r(58)),
          h = i("atan2", { "number, number": Math.atan2, "BigNumber, BigNumber": function BigNumberBigNumber(t, r) {
          return e.BigNumber.atan2(t, r);
        }, "Matrix, Matrix": function MatrixMatrix(e, t) {
          var r;switch (e.storage()) {case "sparse":
              switch (t.storage()) {case "sparse":
                  r = u(e, t, h, !1);break;default:
                  r = o(t, e, h, !0);}break;default:
              switch (t.storage()) {case "sparse":
                  r = s(e, t, h, !1);break;default:
                  r = l(e, t, h);}}return r;
        }, "Array, Array": function ArrayArray(e, t) {
          return h(a(e), a(t)).valueOf();
        }, "Array, Matrix": function ArrayMatrix(e, t) {
          return h(a(e), t);
        }, "Matrix, Array": function MatrixArray(e, t) {
          return h(e, a(t));
        }, "Matrix, number | BigNumber": function MatrixNumberBigNumber(e, t) {
          var r;switch (e.storage()) {case "sparse":
              r = c(e, t, h, !1);break;default:
              r = p(e, t, h, !1);}return r;
        }, "number | BigNumber, Matrix": function numberBigNumberMatrix(e, t) {
          var r;switch (t.storage()) {case "sparse":
              r = f(t, e, h, !0);break;default:
              r = p(t, e, h, !0);}return r;
        }, "Array, number | BigNumber": function ArrayNumberBigNumber(e, t) {
          return p(a(e), t, h, !1).valueOf();
        }, "number | BigNumber, Array": function numberBigNumberArray(e, t) {
          return p(a(t), e, h, !0).valueOf();
        } });return h.toTex = { 2: "\\mathrm{atan2}\\left(${args}\\right)" }, h;
    }t.name = "atan2", t.factory = n;
  }, function (e, t, r) {
    "use strict";
    function n(e, t, r, n) {
      var o = n("atanh", { number: function number(r) {
          return 1 >= r && r >= -1 || t.predictable ? a(r) : new e.Complex(r, 0).atanh();
        }, Complex: function Complex(e) {
          return e.atanh();
        }, BigNumber: function BigNumber(e) {
          return e.atanh();
        }, "Array | Matrix": function ArrayMatrix(e) {
          return i(e, o, !0);
        } });return o.toTex = { 1: "\\tanh^{-1}\\left(${args[0]}\\right)" }, o;
    }var i = r(19),
        a = Math.atanh || function (e) {
      return Math.log((1 + e) / (1 - e)) / 2;
    };t.name = "atanh", t.factory = n;
  }, function (e, t, r) {
    "use strict";
    function n(e, t, r, n) {
      var a = n("cos", { number: Math.cos, Complex: function Complex(e) {
          return e.cos();
        }, BigNumber: function BigNumber(e) {
          return e.cos();
        }, Unit: function Unit(t) {
          if (!t.hasBase(e.Unit.BASE_UNITS.ANGLE)) throw new TypeError("Unit in function cos is no angle");return a(t.value);
        }, "Array | Matrix": function ArrayMatrix(e) {
          return i(e, a);
        } });return a.toTex = { 1: "\\cos\\left(${args[0]}\\right)" }, a;
    }var i = r(19);t.name = "cos", t.factory = n;
  }, function (e, t, r) {
    "use strict";
    function n(e, t, r, n) {
      var o = n("cosh", { number: a, Complex: function Complex(e) {
          return e.cosh();
        }, BigNumber: function BigNumber(e) {
          return e.cosh();
        }, Unit: function Unit(t) {
          if (!t.hasBase(e.Unit.BASE_UNITS.ANGLE)) throw new TypeError("Unit in function cosh is no angle");return o(t.value);
        }, "Array | Matrix": function ArrayMatrix(e) {
          return i(e, o);
        } });return o.toTex = { 1: "\\cosh\\left(${args[0]}\\right)" }, o;
    }var i = r(19),
        a = Math.cosh || function (e) {
      return (Math.exp(e) + Math.exp(-e)) / 2;
    };t.name = "cosh", t.factory = n;
  }, function (e, t, r) {
    "use strict";
    function n(e, t, r, n) {
      var a = n("cot", { number: function number(e) {
          return 1 / Math.tan(e);
        }, Complex: function Complex(e) {
          return e.cot();
        }, BigNumber: function BigNumber(t) {
          return new e.BigNumber(1).div(t.tan());
        }, Unit: function Unit(t) {
          if (!t.hasBase(e.Unit.BASE_UNITS.ANGLE)) throw new TypeError("Unit in function cot is no angle");return a(t.value);
        }, "Array | Matrix": function ArrayMatrix(e) {
          return i(e, a);
        } });return a.toTex = { 1: "\\cot\\left(${args[0]}\\right)" }, a;
    }var i = r(19);t.name = "cot", t.factory = n;
  }, function (e, t, r) {
    "use strict";
    function n(e, t, r, n) {
      var o = n("coth", { number: i, Complex: function Complex(e) {
          return e.coth();
        }, BigNumber: function BigNumber(t) {
          return new e.BigNumber(1).div(t.tanh());
        }, Unit: function Unit(t) {
          if (!t.hasBase(e.Unit.BASE_UNITS.ANGLE)) throw new TypeError("Unit in function coth is no angle");return o(t.value);
        }, "Array | Matrix": function ArrayMatrix(e) {
          return a(e, o);
        } });return o.toTex = { 1: "\\coth\\left(${args[0]}\\right)" }, o;
    }function i(e) {
      var t = Math.exp(2 * e);return (t + 1) / (t - 1);
    }var a = r(19);t.name = "coth", t.factory = n;
  }, function (e, t, r) {
    "use strict";
    function n(e, t, r, n) {
      var a = n("csc", { number: function number(e) {
          return 1 / Math.sin(e);
        }, Complex: function Complex(e) {
          return e.csc();
        }, BigNumber: function BigNumber(t) {
          return new e.BigNumber(1).div(t.sin());
        }, Unit: function Unit(t) {
          if (!t.hasBase(e.Unit.BASE_UNITS.ANGLE)) throw new TypeError("Unit in function csc is no angle");return a(t.value);
        }, "Array | Matrix": function ArrayMatrix(e) {
          return i(e, a);
        } });return a.toTex = { 1: "\\csc\\left(${args[0]}\\right)" }, a;
    }var i = r(19);t.name = "csc", t.factory = n;
  }, function (e, t, r) {
    "use strict";
    function n(e, t, r, n) {
      var o = n("csch", { number: i, Complex: function Complex(e) {
          return e.csch();
        }, BigNumber: function BigNumber(t) {
          return new e.BigNumber(1).div(t.sinh());
        }, Unit: function Unit(t) {
          if (!t.hasBase(e.Unit.BASE_UNITS.ANGLE)) throw new TypeError("Unit in function csch is no angle");return o(t.value);
        }, "Array | Matrix": function ArrayMatrix(e) {
          return a(e, o);
        } });return o.toTex = { 1: "\\mathrm{csch}\\left(${args[0]}\\right)" }, o;
    }function i(e) {
      return 0 == e ? Number.POSITIVE_INFINITY : Math.abs(2 / (Math.exp(e) - Math.exp(-e))) * o(e);
    }var a = r(19),
        o = r(6).sign;t.name = "csch", t.factory = n;
  }, function (e, t, r) {
    "use strict";
    function n(e, t, r, n) {
      var a = n("sec", { number: function number(e) {
          return 1 / Math.cos(e);
        }, Complex: function Complex(e) {
          return e.sec();
        }, BigNumber: function BigNumber(t) {
          return new e.BigNumber(1).div(t.cos());
        }, Unit: function Unit(t) {
          if (!t.hasBase(e.Unit.BASE_UNITS.ANGLE)) throw new TypeError("Unit in function sec is no angle");return a(t.value);
        }, "Array | Matrix": function ArrayMatrix(e) {
          return i(e, a);
        } });return a.toTex = { 1: "\\sec\\left(${args[0]}\\right)" }, a;
    }var i = r(19);t.name = "sec", t.factory = n;
  }, function (e, t, r) {
    "use strict";
    function n(e, t, r, n) {
      var o = n("sech", { number: i, Complex: function Complex(e) {
          return e.sech();
        }, BigNumber: function BigNumber(t) {
          return new e.BigNumber(1).div(t.cosh());
        }, Unit: function Unit(t) {
          if (!t.hasBase(e.Unit.BASE_UNITS.ANGLE)) throw new TypeError("Unit in function sech is no angle");return o(t.value);
        }, "Array | Matrix": function ArrayMatrix(e) {
          return a(e, o);
        } });return o.toTex = { 1: "\\mathrm{sech}\\left(${args[0]}\\right)" }, o;
    }function i(e) {
      return 2 / (Math.exp(e) + Math.exp(-e));
    }var a = r(19);t.name = "sech", t.factory = n;
  }, function (e, t, r) {
    "use strict";
    function n(e, t, r, n) {
      var a = n("sin", { number: Math.sin, Complex: function Complex(e) {
          return e.sin();
        }, BigNumber: function BigNumber(e) {
          return e.sin();
        }, Unit: function Unit(t) {
          if (!t.hasBase(e.Unit.BASE_UNITS.ANGLE)) throw new TypeError("Unit in function sin is no angle");return a(t.value);
        }, "Array | Matrix": function ArrayMatrix(e) {
          return i(e, a, !0);
        } });return a.toTex = { 1: "\\sin\\left(${args[0]}\\right)" }, a;
    }var i = r(19);t.name = "sin", t.factory = n;
  }, function (e, t, r) {
    "use strict";
    function n(e, t, r, n) {
      var o = n("sinh", { number: a, Complex: function Complex(e) {
          return e.sinh();
        }, BigNumber: function BigNumber(e) {
          return e.sinh();
        }, Unit: function Unit(t) {
          if (!t.hasBase(e.Unit.BASE_UNITS.ANGLE)) throw new TypeError("Unit in function sinh is no angle");return o(t.value);
        }, "Array | Matrix": function ArrayMatrix(e) {
          return i(e, o, !0);
        } });return o.toTex = { 1: "\\sinh\\left(${args[0]}\\right)" }, o;
    }var i = r(19),
        a = Math.sinh || function (e) {
      return (Math.exp(e) - Math.exp(-e)) / 2;
    };t.name = "sinh", t.factory = n;
  }, function (e, t, r) {
    "use strict";
    function n(e, t, r, n) {
      var a = n("tan", { number: Math.tan, Complex: function Complex(e) {
          return e.tan();
        }, BigNumber: function BigNumber(e) {
          return e.tan();
        }, Unit: function Unit(t) {
          if (!t.hasBase(e.Unit.BASE_UNITS.ANGLE)) throw new TypeError("Unit in function tan is no angle");return a(t.value);
        }, "Array | Matrix": function ArrayMatrix(e) {
          return i(e, a, !0);
        } });return a.toTex = { 1: "\\tan\\left(${args[0]}\\right)" }, a;
    }var i = r(19);t.name = "tan", t.factory = n;
  }, function (e, t, r) {
    "use strict";
    function n(e, t, r, n) {
      var o = n("tanh", { number: a, Complex: function Complex(e) {
          return e.tanh();
        }, BigNumber: function BigNumber(e) {
          return e.tanh();
        }, Unit: function Unit(t) {
          if (!t.hasBase(e.Unit.BASE_UNITS.ANGLE)) throw new TypeError("Unit in function tanh is no angle");return o(t.value);
        }, "Array | Matrix": function ArrayMatrix(e) {
          return i(e, o, !0);
        } });return o.toTex = { 1: "\\tanh\\left(${args[0]}\\right)" }, o;
    }var i = r(19),
        a = Math.tanh || function (e) {
      var t = Math.exp(2 * e);return (t - 1) / (t + 1);
    };t.name = "tanh", t.factory = n;
  }, function (e, t, r) {
    e.exports = [r(499)];
  }, function (e, t, r) {
    "use strict";
    function n(e, t, n, i) {
      var a = r(32),
          o = n(r(52)),
          s = n(r(57)),
          u = n(r(58)),
          c = i("to", { "Unit, Unit | string": function UnitUnitString(e, t) {
          return e.to(t);
        }, "Matrix, Matrix": function MatrixMatrix(e, t) {
          return s(e, t, c);
        }, "Array, Array": function ArrayArray(e, t) {
          return c(o(e), o(t)).valueOf();
        }, "Array, Matrix": function ArrayMatrix(e, t) {
          return c(o(e), t);
        }, "Matrix, Array": function MatrixArray(e, t) {
          return c(e, o(t));
        }, "Matrix, any": function MatrixAny(e, t) {
          return u(e, t, c, !1);
        }, "any, Matrix": function anyMatrix(e, t) {
          return u(t, e, c, !0);
        }, "Array, any": function ArrayAny(e, t) {
          return u(o(e), t, c, !1).valueOf();
        }, "any, Array": function anyArray(e, t) {
          return u(o(t), e, c, !0).valueOf();
        } });return c.toTex = { 2: "\\left(${args[0]}" + a.operators.to + "${args[1]}\\right)" }, c;
    }t.name = "to", t.factory = n;
  }, function (e, t, r) {
    e.exports = [r(501), r(419), r(368), r(89), r(381), r(502), r(433), r(503), r(91)];
  }, function (e, t, r) {
    "use strict";
    function n(e, t, r, n) {
      var a = n("clone", { any: i.clone });return a.toTex = void 0, a;
    }var i = r(3);t.name = "clone", t.factory = n;
  }, function (e, t, r) {
    "use strict";
    function n(e, t, r, n) {
      var a = n("isPrime", { number: function number(e) {
          if (2 > e) return !1;if (2 == e) return !0;if (e % 2 == 0) return !1;for (var t = 3; e >= t * t; t += 2) {
            if (e % t == 0) return !1;
          }return !0;
        }, BigNumber: function BigNumber(t) {
          if (t.lt(2)) return !1;if (t.equals(2)) return !0;if (t.mod(2).isZero()) return !1;for (var r = e.BigNumber(3); r.times(r).lte(t); r = r.plus(1)) {
            if (t.mod(r).isZero()) return !1;
          }return !0;
        }, "Array | Matrix": function ArrayMatrix(e) {
          return i(e, a);
        } });return a;
    }var i = r(19);t.name = "isPrime", t.factory = n;
  }, function (e, t, r) {
    "use strict";
    function n(e, t, r, n) {
      var a = n("isNaN", { number: function number(e) {
          return Number.isNaN(e);
        }, BigNumber: function BigNumber(e) {
          return e.isNaN();
        }, Fraction: function Fraction(e) {
          return !1;
        }, Complex: function Complex(e) {
          return Number.isNaN(e.re) && Number.isNaN(e.im);
        }, Unit: function Unit(e) {
          return Number.isNaN(e.value);
        }, "Array | Matrix": function ArrayMatrix(e) {
          return i(e, Number.isNaN);
        } });return a;
    }var i = r(19);r(6);t.name = "isNaN", t.factory = n;
  }, function (e, t, r) {
    e.exports = [r(505)];
  }, function (e, t) {
    "use strict";
    function r(e, t, r, n) {
      return function (t, r) {
        var n = e[r && r.mathjs];return n && "function" == typeof n.fromJSON ? n.fromJSON(r) : r;
      };
    }t.name = "reviver", t.path = "json", t.factory = r;
  }, function (e, t, r) {
    "use strict";
    var n = r(11),
        i = r(42),
        a = r(43);e.exports = [{ name: "ArgumentsError", path: "error", factory: function factory() {
        return n;
      } }, { name: "DimensionError", path: "error", factory: function factory() {
        return i;
      } }, { name: "IndexError", path: "error", factory: function factory() {
        return a;
      } }];
  }]);
});


},{}],3:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.saveSVG = saveSVG;
exports.computeNewNode_old = computeNewNode_old;
exports.computeNewNode = computeNewNode;
exports.createOffsetPoint = createOffsetPoint;
exports.computeVector = computeVector;
exports.computeCrossVector = computeCrossVector;
exports.computeUnitVector = computeUnitVector;
exports.computeSlope = computeSlope;
exports.updateData = updateData;
exports.realtimeRending = realtimeRending;

var _d = require('d3');

var d3 = _interopRequireWildcard(_d);

var _mathMin = require('./lib/math.min.js');

var _mathMin2 = _interopRequireDefault(_mathMin);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var data = [[{ x: 50, y: 50 }, { x: 50, y: 100 }, { x: 100, y: 100 }, { x: 100, y: 50 }]];

var offset = 3; //line offset 
var svg = d3.select('body').append('svg').attr({
  'width': 400,
  'height': 400,
  'id': 'svg'
});

var line = d3.svg.line().x(function (d) {
  return d.x;
}).y(function (d) {
  return d.y;
}).interpolate('linear-closed');

svg.append('path').attr({
  'd': line(data[0]),
  'y': 0,
  'stroke': '#000',
  'stroke-width': '1px',
  'fill': 'none'
});
function saveSVG() {
  //get svg element.
  var svg = document.getElementById("svg");

  //get svg source.
  var serializer = new XMLSerializer();
  var source = serializer.serializeToString(svg);

  //add name spaces.
  if (!source.match(/^<svg[^>]+xmlns="http\:\/\/www\.w3\.org\/2000\/svg"/)) {
    source = source.replace(/^<svg/, '<svg xmlns="http://www.w3.org/2000/svg"');
  }
  if (!source.match(/^<svg[^>]+"http\:\/\/www\.w3\.org\/1999\/xlink"/)) {
    source = source.replace(/^<svg/, '<svg xmlns:xlink="http://www.w3.org/1999/xlink"');
  }

  //add xml declaration
  source = '<?xml version="1.0" standalone="no"?>\r\n' + source;

  //convert svg source to URI data scheme.
  var url = "data:application/octet-stream;charset=utf-8," + encodeURIComponent(source);

  //set url value to a element's href attribute.
  var link = document.getElementById("link");
  link.href = url;
  link.download = 'save.svg';
  //you can download svg file by right click menu.
}
function computeNewNode_old(element) {
  for (var i = 0; i < element.length; i++) {
    var m = [element[i]];
  }
}

function computeNewNode(p1, p2, p3) {

  var vectorData = [{ x: 0, y: 0 }, { x: 0, y: 0 }];
  vectorData[0] = computeCrossVector(computeVector(p1, p2));
  vectorData[1] = computeCrossVector(computeVector(p2, p3));

  var lineData = [],
      linePx = void 0,
      linePy = void 0;

  //first point of line1
  linePx = p1.x + computeUnitVector(vectorData[0]).x * offset;
  linePy = p1.y + computeUnitVector(vectorData[0]).y * offset;
  lineData.push({
    x: linePx,
    y: linePy
  });
  //end point of line1
  linePx = p2.x + computeUnitVector(vectorData[0]).x * offset;
  linePy = p2.y + computeUnitVector(vectorData[0]).y * offset;
  lineData.push({
    x: linePx,
    y: linePy
  });
  //first point of line2
  linePx = p2.x + computeUnitVector(vectorData[1]).x * offset;
  linePy = p2.y + computeUnitVector(vectorData[1]).y * offset;
  lineData.push({
    x: linePx,
    y: linePy
  });
  //end point of line2
  linePx = p3.x + computeUnitVector(vectorData[1]).x * offset;
  linePy = p3.y + computeUnitVector(vectorData[1]).y * offset;
  lineData.push({
    x: linePx,
    y: linePy
  });
  //console.log(math.intersect([lineData[0].x, lineData[0].y], [lineData[1].x, lineData[1].y], [lineData[1].x, lineData[1].y], [lineData[2].x, lineData[2].y]));
  return _mathMin2.default.intersect([lineData[0].x, lineData[0].y], [lineData[1].x, lineData[1].y], [lineData[2].x, lineData[2].y], [lineData[3].x, lineData[3].y]);
}
function createOffsetPoint() {
  var sourceData = data.length - 2,
      targetData = data.length - 1;
  if (data[sourceData].length < 2) console.log("node <= 2");else {

    data[targetData].push({
      x: computeNewNode(data[sourceData][data[sourceData].length - 1], data[sourceData][0], data[sourceData][1])[0],
      y: computeNewNode(data[sourceData][data[sourceData].length - 1], data[sourceData][0], data[sourceData][1])[1]
    });
    for (var i = 0; i < data[sourceData].length - 1; i++) {
      if (i + 2 > data[sourceData].length - 1) {
        data[targetData].push({
          x: computeNewNode(data[sourceData][i], data[sourceData][i + 1], data[sourceData][0])[0],
          y: computeNewNode(data[sourceData][i], data[sourceData][i + 1], data[sourceData][0])[1]
        });
      } else {
        data[targetData].push({
          x: computeNewNode(data[sourceData][i], data[sourceData][i + 1], data[sourceData][i + 2])[0],
          y: computeNewNode(data[sourceData][i], data[sourceData][i + 1], data[sourceData][i + 2])[1]
        });
      }
    }
  }
}

function computeVector(p1, p2) {
  return {
    x: p2.x - p1.x,
    y: p2.y - p1.y
  };
}

function computeCrossVector(p) {
  var temp = -p.x;
  p.x = p.y;
  p.y = temp;
  return p;
}
function computeUnitVector(p) {
  var v = { x: p.x, y: p.y };
  var length = Math.sqrt(Math.pow(p.x, 2) + Math.pow(p.y, 2));
  v.x /= length;
  v.y /= length;
  return v;
}
function computeSlope(p1, p2) {
  return (p2.y - p1.y) / (p2.x - p1.x);
}
//update()
function updateData() {

  svg.selectAll("*").remove();
  for (var i = 0; i < data.length; i++) {
    svg.append('path').attr({
      'd': line(data[i]),
      'y': 0,
      'stroke': '#000',
      'stroke-width': '1px',
      'fill': '#' + (0x1000000 + Math.random() * 0xffffff).toString(16).substr(1, 6)
    });
  }
}
function realtimeRending(d) {
  offset = d;
  data.push([]);
  createOffsetPoint();
  updateData();
}

},{"./lib/math.min.js":2,"d3":1}],4:[function(require,module,exports){
"use strict";

var _offset = require("./js/offset.js");

var offset = _interopRequireWildcard(_offset);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

//let offset = require('./js/offset.js');
var slide = document.getElementById("slide");
slide.onclick = function (event) {
	offset.realtimeRending(event.target.value);
};
var saveSVG = document.getElementById("saveSVG");
saveSVG.onclick = offset.saveSVG();

},{"./js/offset.js":3}]},{},[4])