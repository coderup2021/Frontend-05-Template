/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/Realm.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/@antv/g6/dist/g6.min.js":
/*!**********************************************!*\
  !*** ./node_modules/@antv/g6/dist/g6.min.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


/***/ }),

/***/ "./src/Realm.js":
/*!**********************!*\
  !*** ./src/Realm.js ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _antv_g6__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @antv/g6 */ \"./node_modules/@antv/g6/dist/g6.min.js\");\n/* harmony import */ var _antv_g6__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_antv_g6__WEBPACK_IMPORTED_MODULE_0__);\n\r\n\r\n let realmObjs = [\r\n 'Array',\r\n 'ArrayBuffer',\r\n 'ArrayBufferPrototype',\r\n 'ArrayIteratorPrototype',\r\n 'ArrayPrototype',\r\n 'ArrayProto_entries',\r\n 'ArrayProto_forEach',\r\n 'ArrayProto_keys',\r\n 'ArrayProto_values',\r\n 'AsyncFromSyncIteratorPrototype',\r\n 'AsyncFunction',\r\n 'AsyncFunctionPrototype',\r\n 'AsyncGenerator',\r\n 'AsyncGeneratorFunction',\r\n 'AsyncGeneratorPrototype',\r\n 'AsyncIteratorPrototype',\r\n 'Atomics',\r\n 'Boolean',\r\n 'BooleanPrototype',\r\n 'DataView',\r\n 'DataViewPrototype',\r\n 'Date',\r\n 'DatePrototype',\r\n 'decodeURI',\r\n 'decodeURIComponent',\r\n 'encodeURI',\r\n 'encodeURIComponent',\r\n 'Error',\r\n 'ErrorPrototype',\r\n 'eval',\r\n 'EvalError',\r\n 'EvalErrorPrototype',\r\n 'Float32Array',\r\n 'Float32ArrayPrototype',\r\n 'Float64Array',\r\n 'Float64ArrayPrototype',\r\n 'Function',\r\n 'FunctionPrototype',\r\n 'Generator',\r\n 'GeneratorFunction',\r\n 'GeneratorPrototype',\r\n 'Int8Array',\r\n 'Int8ArrayPrototype',\r\n 'Int16Array',\r\n 'Int16ArrayPrototype',\r\n 'Int32Array',\r\n 'Int32ArrayPrototype',\r\n 'isFinite',\r\n 'isNaN',\r\n 'IteratorPrototype',\r\n 'JSON',\r\n 'JSONParse',\r\n 'Map',\r\n 'MapIteratorPrototype',\r\n 'MapPrototype',\r\n 'Math',\r\n 'Number',\r\n 'NumberPrototype',\r\n 'Object',\r\n 'ObjectPrototype',\r\n 'ObjProto_toString',\r\n 'ObjProto_valueOf',\r\n 'parseFloat',\r\n 'parseInt',\r\n 'Promise',\r\n 'PromisePrototype',\r\n 'PromiseProto_then',\r\n 'Promise_all',\r\n 'Promise_reject',\r\n 'Promise_resolve',\r\n 'Proxy',\r\n 'RangeError',\r\n 'RangeErrorPrototype',\r\n 'ReferenceError',\r\n 'ReferenceErrorPrototype',\r\n 'Reflect',\r\n 'RegExp',\r\n 'RegExpPrototype',\r\n 'Set',\r\n 'SetIteratorPrototype',\r\n 'SetPrototype',\r\n 'SharedArrayBuffer',\r\n 'SharedArrayBufferPrototype',\r\n 'String',\r\n 'StringIteratorPrototype',\r\n 'StringPrototype',\r\n 'Symbol',\r\n 'SymbolPrototype',\r\n 'SyntaxError',\r\n 'SyntaxErrorPrototype',\r\n 'ThrowTypeError',\r\n 'TypedArray',\r\n 'TypedArrayPrototype',\r\n 'TypeError',\r\n 'TypeErrorPrototype',\r\n 'Uint8Array',\r\n 'Uint8ArrayPrototype',\r\n 'Uint8ClampedArray',\r\n 'Uint8ClampedArrayPrototype',\r\n 'Uint16Array',\r\n 'Uint16ArrayPrototype',\r\n 'Uint32Array',\r\n 'Uint32ArrayPrototype',\r\n 'URIError',\r\n 'URIErrorPrototype',\r\n 'WeakMap',\r\n 'WeakMapPrototype',\r\n 'WeakSet',\r\n 'WeakSetPrototype',\r\n ]\r\n\r\n let classification = {}\r\n function classificate(){\r\n  let bases = [\r\n         'Array',\r\n         'Async',\r\n         'Atomics',\r\n         'Boolean',\r\n         'DataView',\r\n         'Date',\r\n         'URI',\r\n         'Error',\r\n         'eval',\r\n         'Float',\r\n         'Function',\r\n         'Generator',\r\n         'Int',\r\n         'isFinite',\r\n         'isNaN',\r\n         'IteratorPrototype',\r\n         'JSON',\r\n         'Map',\r\n         'Math',\r\n         'Number',\r\n         'Object',\r\n         'ObjProto',\r\n         'parse',\r\n         'Promise',\r\n         'Proxy',\r\n         'Reflect',\r\n         'Regexp',\r\n         'Set',\r\n         'String',\r\n         'Symbol',\r\n         'Syntax',\r\n         'ThrowType',\r\n         'Unit',\r\n         'Weak',\r\n     ]\r\n     let classification= {}\r\n     for(let base of bases){\r\n         for(let re of realmObjs){\r\n             if(re.includes(base)){\r\n                 if(!classification[base]) classification[base] = []\r\n                 classification[base].push(re)\r\n             }\r\n         }\r\n     }\r\n     console.dir(classification)\r\n }\r\n\r\n classificate(realmObjs)\r\n\r\n// document.getElementById('app').appendChild(document.createTextNode('hello world'))\r\n\r\n\r\n\r\nconst container = document.getElementById('container');\r\nconst width = container.scrollWidth;\r\nconst height = container.scrollHeight || 500;\r\nconst graph = new _antv_g6__WEBPACK_IMPORTED_MODULE_0___default.a.Graph({\r\n  container: 'container',\r\n  width,\r\n  height,\r\n  layout: {\r\n    type: 'force',\r\n    preventOverlap: true,\r\n    linkDistance: (d) => {\r\n      if (d.source.id === 'node0') {\r\n        return 100;\r\n      }\r\n      return 30;\r\n    },\r\n    nodeStrength: (d) => {\r\n      if (d.isLeaf) {\r\n        return -50;\r\n      }\r\n      return -10;\r\n    },\r\n    edgeStrength: (d) => {\r\n      if (d.source.id === 'node1' || d.source.id === 'node2' || d.source.id === 'node3') {\r\n        return 0.7;\r\n      }\r\n      return 0.1;\r\n    },\r\n  },\r\n  defaultNode: {\r\n    color: '#5B8FF9',\r\n  },\r\n  modes: {\r\n    default: ['drag-canvas']\r\n  }\r\n});\r\n\r\nconst data = {\r\n  nodes: [\r\n    { id: 'node0', size: 50 },\r\n    { id: 'node1', size: 30 },\r\n    { id: 'node2', size: 30 },\r\n    { id: 'node3', size: 30 },\r\n    { id: 'node4', size: 30, isLeaf: true },\r\n    { id: 'node5', size: 30, isLeaf: true },\r\n    { id: 'node6', size: 15, isLeaf: true },\r\n    { id: 'node7', size: 15, isLeaf: true },\r\n    { id: 'node8', size: 15, isLeaf: true },\r\n    { id: 'node9', size: 15, isLeaf: true },\r\n    { id: 'node10', size: 15, isLeaf: true },\r\n    { id: 'node11', size: 15, isLeaf: true },\r\n    { id: 'node12', size: 15, isLeaf: true },\r\n    { id: 'node13', size: 15, isLeaf: true },\r\n    { id: 'node14', size: 15, isLeaf: true },\r\n    { id: 'node15', size: 15, isLeaf: true },\r\n    { id: 'node16', size: 15, isLeaf: true },\r\n  ],\r\n  edges: [\r\n    { source: 'node0', target: 'node1' },\r\n    { source: 'node0', target: 'node2' },\r\n    { source: 'node0', target: 'node3' },\r\n    { source: 'node0', target: 'node4' },\r\n    { source: 'node0', target: 'node5' },\r\n    { source: 'node1', target: 'node6' },\r\n    { source: 'node1', target: 'node7' },\r\n    { source: 'node2', target: 'node8' },\r\n    { source: 'node2', target: 'node9' },\r\n    { source: 'node2', target: 'node10' },\r\n    { source: 'node2', target: 'node11' },\r\n    { source: 'node2', target: 'node12' },\r\n    { source: 'node2', target: 'node13' },\r\n    { source: 'node3', target: 'node14' },\r\n    { source: 'node3', target: 'node15' },\r\n    { source: 'node3', target: 'node16' },\r\n  ],\r\n};\r\nconst nodes = data.nodes;\r\ngraph.data({\r\n  nodes,\r\n  edges: data.edges.map(function (edge, i) {\r\n    edge.id = 'edge' + i;\r\n    return Object.assign({}, edge);\r\n  }),\r\n});\r\ngraph.render();\r\n\r\ngraph.on('node:dragstart', function (e) {\r\n  graph.layout();\r\n  refreshDragedNodePosition(e);\r\n});\r\ngraph.on('node:drag', function (e) {\r\n  refreshDragedNodePosition(e);\r\n});\r\ngraph.on('node:dragend', function (e) {\r\n  e.item.get('model').fx = null;\r\n  e.item.get('model').fy = null;\r\n});\r\n\r\nif (typeof window !== 'undefined')\r\n  window.onresize = () => {\r\n    if (!graph || graph.get('destroyed')) return;\r\n    if (!container || !container.scrollWidth || !container.scrollHeight) return;\r\n    graph.changeSize(container.scrollWidth, container.scrollHeight);\r\n  };\r\n\r\nfunction refreshDragedNodePosition(e) {\r\n  const model = e.item.get('model');\r\n  model.fx = e.x;\r\n  model.fy = e.y;\r\n}\r\n\n\n//# sourceURL=webpack:///./src/Realm.js?");

/***/ })

/******/ });