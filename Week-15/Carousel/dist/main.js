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
/******/ 	return __webpack_require__(__webpack_require__.s = "./animation-demo.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./animation-demo.js":
/*!***************************!*\
  !*** ./animation-demo.js ***!
  \***************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _animation__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./animation */ \"./animation.js\");\n/* harmony import */ var _timingFunction__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./timingFunction */ \"./timingFunction.js\");\n\n\nvar tl = new _animation__WEBPACK_IMPORTED_MODULE_0__[\"Timeline\"]();\nvar el = document.getElementById(\"el\").style;\nvar pauseBtn = document.getElementById(\"pause\");\nvar resumeBtn = document.getElementById(\"resume\");\nvar animation = new _animation__WEBPACK_IMPORTED_MODULE_0__[\"Animation\"](el, \"transform\", 0, 500, 2000, 0, _timingFunction__WEBPACK_IMPORTED_MODULE_1__[\"easeIn\"], function (v) {\n  return \"translateX(\".concat(v, \"px)\");\n});\nvar el2 = document.getElementById(\"el2\").style;\nel2.transition = \"transform ease-in 2s\";\nel2.transform = \"translateX(500px)\";\nwindow.tl = tl;\nwindow.animation = animation;\nwindow.el = el;\ntl.add(animation);\ntl.start();\n\npauseBtn.onclick = function () {\n  return tl.pause();\n};\n\nresumeBtn.onclick = function () {\n  return tl.resume();\n};\n\n//# sourceURL=webpack:///./animation-demo.js?");

/***/ }),

/***/ "./animation.js":
/*!**********************!*\
  !*** ./animation.js ***!
  \**********************/
/*! exports provided: Timeline, Animation */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Timeline\", function() { return Timeline; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Animation\", function() { return Animation; });\n/* harmony import */ var _timingFunction__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./timingFunction */ \"./timingFunction.js\");\nfunction _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === \"undefined\" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === \"number\") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError(\"Invalid attempt to iterate non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.\"); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it[\"return\"] != null) it[\"return\"](); } finally { if (didErr) throw err; } } }; }\n\nfunction _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === \"string\") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === \"Object\" && o.constructor) n = o.constructor.name; if (n === \"Map\" || n === \"Set\") return Array.from(o); if (n === \"Arguments\" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }\n\nfunction _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }\n\nfunction _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }\n\n/**\n * 1. ??????delay\n * 2. ??????timingFunction\n */\n //??????Symbol????????????????????????\n\nvar TICK = Symbol(\"tick\"); //?????????????????????\n\nvar TICK_HANDLER = Symbol(\"tick-handler\"); //????????????????????????\n\nvar ANIMATIONS = Symbol(\"animations\"); //??????\n\nvar START_TIME = Symbol(\"start-time\"); //???????????????????????????\n\nvar PAUSE_START = Symbol(\"pause-start\"); //??????????????????\n\nvar PAUSE_TIME = Symbol(\"pause-time\"); //???????????????????????????\n\nvar Timeline = /*#__PURE__*/function () {\n  function Timeline() {\n    _classCallCheck(this, Timeline);\n\n    this[ANIMATIONS] = new Set();\n    this[START_TIME] = new Map();\n  }\n\n  _createClass(Timeline, [{\n    key: \"start\",\n    value: function start() {\n      var _this = this;\n\n      var startTime = Date.now();\n      this[PAUSE_TIME] = 0;\n      var p = 0;\n      var test = document.getElementById(\"test\");\n\n      this[TICK] = function () {\n        debugger;\n        p = performance.now() - p;\n        test.appendChild(document.createTextNode(p));\n        test.appendChild(document.createElement(\"br\"));\n        var now = Date.now();\n\n        var _iterator = _createForOfIteratorHelper(_this[ANIMATIONS]),\n            _step;\n\n        try {\n          for (_iterator.s(); !(_step = _iterator.n()).done;) {\n            var animation = _step.value;\n            var t = void 0;\n\n            if (_this[START_TIME].get(animation) < startTime) {\n              t = now - startTime - _this[PAUSE_TIME] - animation.delay; //??????1\n            } else {\n              t = now - _this[START_TIME].get(animation) - _this[PAUSE_TIME] - animation.delay; //??????1\n            }\n\n            if (animation.duration < t) {\n              _this[ANIMATIONS][\"delete\"](animation);\n\n              t = animation.duration;\n            }\n\n            if (t > 0) animation.receive(t); //??????1\n          }\n        } catch (err) {\n          _iterator.e(err);\n        } finally {\n          _iterator.f();\n        }\n\n        _this[TICK_HANDLER] = requestAnimationFrame(_this[TICK]);\n      };\n\n      this[TICK]();\n    }\n  }, {\n    key: \"pause\",\n    value: function pause() {\n      this[PAUSE_START] = Date.now();\n      cancelAnimationFrame(this[TICK_HANDLER]);\n    }\n  }, {\n    key: \"resume\",\n    value: function resume() {\n      this[PAUSE_TIME] += Date.now() - this[PAUSE_START];\n      console.log(this[PAUSE_TIME]);\n      this[TICK]();\n    }\n  }, {\n    key: \"reset\",\n    value: function reset() {}\n  }, {\n    key: \"add\",\n    value: function add(animation, startTime) {\n      if (arguments.length < 2) {\n        startTime = Date.now();\n      }\n\n      this[ANIMATIONS].add(animation);\n      this[START_TIME].set(animation, startTime);\n    }\n  }, {\n    key: \"rate\",\n    set: function set(val) {\n      this.rate = val;\n    },\n    get: function get() {\n      return this.rate;\n    }\n  }]);\n\n  return Timeline;\n}();\n\nvar Animation = /*#__PURE__*/function () {\n  function Animation(object, property, startValue, endValue, duration, delay, timingFunction, template) {\n    _classCallCheck(this, Animation);\n\n    this.timingFunction = timingFunction || _timingFunction__WEBPACK_IMPORTED_MODULE_0__[\"linear\"];\n\n    this.template = template || function (v) {\n      return v;\n    };\n\n    this.object = object;\n    this.property = property;\n    this.startValue = startValue;\n    this.endValue = endValue;\n    this.duration = duration;\n    this.delay = delay;\n  }\n\n  _createClass(Animation, [{\n    key: \"receive\",\n    value: function receive(time) {\n      var range = this.endValue - this.startValue;\n      var progress = time / this.duration;\n      var stepDiff = range * this.timingFunction(progress);\n      this.object[this.property] = this.template(this.startValue + stepDiff);\n    }\n  }]);\n\n  return Animation;\n}();\n\n\n\n//# sourceURL=webpack:///./animation.js?");

/***/ }),

/***/ "./timingFunction.js":
/*!***************************!*\
  !*** ./timingFunction.js ***!
  \***************************/
/*! exports provided: linear, cubicBezier, ease, easeIn, easeOut, easeInOut */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"linear\", function() { return linear; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"cubicBezier\", function() { return cubicBezier; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"ease\", function() { return ease; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"easeIn\", function() { return easeIn; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"easeOut\", function() { return easeOut; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"easeInOut\", function() { return easeInOut; });\nvar linear = function linear(v) {\n  return v;\n};\nfunction cubicBezier(p1x, p1y, p2x, p2y) {\n  var ZERO_LIMIT = 1e-6; //Caluate the polynomial coefficients,\n  //implicit first and last control points are (0,0) and (1,1)\n\n  var ax = 3 * p1x - 3 * p2x + 1;\n  var bx = 3 * p2x - 6 * p1x;\n  var cx = 3 * p1x;\n  var ay = 3 * p1y - 3 * p2y + 1;\n  var by = 3 * p2y - 6 * p1y;\n  var cy = 3 * p1y;\n\n  function sampleCurveDerivativeX(t) {\n    return (3 * ax * t + 2 * bx) * t + cx;\n  }\n\n  function sampleCurveX(t) {\n    return ((ax * t + bx) * t + cx) * t;\n  } //Given an x value, find a parametric value it came from.\n\n\n  function solveCurveX(x) {\n    var t2 = x;\n    var derivative;\n    var x2; //https://trac.webkit.org/browser/trunk/Source/WebCore/platform/animation\n    //First try a few iterations of Newton's method -- normally very fast\n    // http://en.wikipedia.org/wiki/Newton's_method  ????????????????????????????????????\n\n    for (var i = 0; i < 8; i++) {\n      // f(t)-x=0\n      x2 = sampleCurveX(t2) - x;\n\n      if (Math.abs(x2) < ZERO_LIMIT) {\n        return t2;\n      }\n\n      derivative = sampleCurveDerivativeX(t2); // == 0, failure\n\n      /* istanbul ignore if */\n\n      if (Math.abs(derivative) < ZERO_LIMIT) {\n        break;\n      }\n\n      t2 -= x2 / derivative; //Fall back to the bisection method for reliability\n      //bisection\n      //http://en.wikipedia.org/wiki/Wifi/bisection_method  ????????????????????????????????????\n\n      var t1 = 1;\n      /* istanbul ignore next */\n\n      var t0 = 0;\n      /* istanbul ignore next */\n\n      t2 = x;\n      /* istanbul ignore next */\n\n      while (t1 > t0) {\n        x2 = sampleCurveX(t2) - x;\n\n        if (Math.abs(x2) < ZERO_LIMIT) {\n          return t2;\n        }\n\n        if (x2 > 0) {\n          t1 = t2;\n        } else {\n          t0 = t2;\n        }\n\n        t2 = (t1 + t0) / 2;\n      } //Failure\n      //return t2;\n\n    }\n\n    function solve(x) {\n      //return sampleCurveY(solveCurveX(x));\n      return sampleCurveX(solveCurveX(x));\n    }\n\n    return solve;\n  }\n}\nvar ease = cubicBezier(0.25, 0.1, 0.25, 1);\nvar easeIn = cubicBezier(0.42, 0, 1, 1);\nvar easeOut = cubicBezier(0, 0, 0.58, 1);\nvar easeInOut = cubicBezier(0.42, 0, 0.58, 1);\n\n//# sourceURL=webpack:///./timingFunction.js?");

/***/ })

/******/ });