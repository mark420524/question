module.exports =
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
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _hanziWriterContext = __webpack_require__(1);

var _hanziWriterContext2 = _interopRequireDefault(_hanziWriterContext);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = function (options) {
  return new _hanziWriterContext2.default(options);
};

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _hanziWriter = __webpack_require__(2);

var _hanziWriter2 = _interopRequireDefault(_hanziWriter);

var _RenderTarget = __webpack_require__(3);

var _RenderTarget2 = _interopRequireDefault(_RenderTarget);

var _utils = __webpack_require__(5);

var _defaultCharDataLoader = __webpack_require__(6);

var _defaultCharDataLoader2 = _interopRequireDefault(_defaultCharDataLoader);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var HanziWriterContext = function () {
  function HanziWriterContext(_ref) {
    var id = _ref.id,
        page = _ref.page,
        charDataLoader = _ref.charDataLoader,
        character = _ref.character,
        onLoadCharDataError = _ref.onLoadCharDataError,
        onLoadCharDataSuccess = _ref.onLoadCharDataSuccess,
        showOutline = _ref.showOutline,
        showCharacter = _ref.showCharacter,
        padding = _ref.padding,
        strokeAnimationSpeed = _ref.strokeAnimationSpeed,
        strokeFadeDuration = _ref.strokeFadeDuration,
        strokeHighlightDuration = _ref.strokeHighlightDuration,
        strokeHighlightSpeed = _ref.strokeHighlightSpeed,
        delayBetweenStrokes = _ref.delayBetweenStrokes,
        delayBetweenLoops = _ref.delayBetweenLoops,
        strokeColor = _ref.strokeColor,
        radicalColor = _ref.radicalColor,
        highlightColor = _ref.highlightColor,
        outlineColor = _ref.outlineColor,
        drawingColor = _ref.drawingColor,
        leniency = _ref.leniency,
        showHintAfterMisses = _ref.showHintAfterMisses,
        highlightOnComplete = _ref.highlightOnComplete,
        highlightCompleteColor = _ref.highlightCompleteColor;

    _classCallCheck(this, HanziWriterContext);

    if (!id || !page) {
      throw new Error('parameter id, page are required');
    }

    this.comp = page.selectComponent('#' + id);
    if (!this.comp) {
      throw new Error('hanzi-writer-view with id ' + id + ' not found');
    }

    this.isDestroyed = false;

    this.writer = new _hanziWriter2.default(this.comp, (0, _utils.removeEmptyKeys)({
      width: this.comp.data.width,
      height: this.comp.data.height,
      charDataLoader: charDataLoader || _defaultCharDataLoader2.default,
      onLoadCharDataError: onLoadCharDataError,
      onLoadCharDataSuccess: onLoadCharDataSuccess,
      showOutline: showOutline,
      showCharacter: showCharacter,
      padding: padding,
      strokeAnimationSpeed: strokeAnimationSpeed,
      strokeFadeDuration: strokeFadeDuration,
      strokeHighlightDuration: strokeHighlightDuration,
      strokeHighlightSpeed: strokeHighlightSpeed,
      delayBetweenStrokes: delayBetweenStrokes,
      delayBetweenLoops: delayBetweenLoops,
      strokeColor: strokeColor,
      radicalColor: radicalColor,
      highlightColor: highlightColor,
      outlineColor: outlineColor,
      drawingColor: drawingColor,
      leniency: leniency,
      showHintAfterMisses: showHintAfterMisses,
      highlightOnComplete: highlightOnComplete,
      highlightCompleteColor: highlightCompleteColor,
      rendererOverride: { createRenderTarget: _RenderTarget2.default.init },
      renderer: 'canvas'
    }));

    if (character) {
      this.setCharacter(character);
    }
    this.comp.connectContext(this);
  }

  HanziWriterContext.prototype._ensureNotDestroyed = function _ensureNotDestroyed() {
    if (this.isDestroyed) throw new Error('This context has already been destroyed');
  };

  HanziWriterContext.prototype.showCharacter = function showCharacter() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    this._ensureNotDestroyed();
    return this.writer.showCharacter(options);
  };

  HanziWriterContext.prototype.hideCharacter = function hideCharacter() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    this._ensureNotDestroyed();
    return this.writer.hideCharacter(options);
  };

  HanziWriterContext.prototype.animateCharacter = function animateCharacter() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    this._ensureNotDestroyed();
    this.comp.setIsQuizzing(false);
    return this.writer.animateCharacter(options);
  };

  HanziWriterContext.prototype.animateStroke = function animateStroke(strokeNum) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    this._ensureNotDestroyed();
    this.comp.setIsQuizzing(false);
    return this.writer.animateStroke(strokeNum, options);
  };

  HanziWriterContext.prototype.loopCharacterAnimation = function loopCharacterAnimation() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    this._ensureNotDestroyed();
    this.comp.setIsQuizzing(false);
    return this.writer.loopCharacterAnimation(options);
  };

  HanziWriterContext.prototype.showOutline = function showOutline() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    this._ensureNotDestroyed();
    return this.writer.showOutline(options);
  };

  HanziWriterContext.prototype.hideOutline = function hideOutline() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    this._ensureNotDestroyed();
    return this.writer.hideOutline(options);
  };

  HanziWriterContext.prototype.updateColor = function updateColor(colorName, colorVal) {
    var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

    this._ensureNotDestroyed();
    return this.writer.updateColor(colorName, colorVal, options);
  };

  HanziWriterContext.prototype.quiz = function quiz() {
    var quizOptions = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    this._ensureNotDestroyed();
    this.comp.setIsQuizzing(true);
    return this.writer.quiz(quizOptions);
  };

  HanziWriterContext.prototype.cancelQuiz = function cancelQuiz() {
    this._ensureNotDestroyed();
    this.comp.setIsQuizzing(false);
    return this.writer.cancelQuiz();
  };

  HanziWriterContext.prototype.setCharacter = function setCharacter(character) {
    this._ensureNotDestroyed();
    this.comp.setIsQuizzing(false);
    return this.writer.setCharacter(character);
  };

  HanziWriterContext.prototype.trigger = function trigger(evtName, evt) {
    this.writer.target.trigger(evtName, evt);
  };

  HanziWriterContext.prototype.destroy = function destroy() {
    if (this.isDestroyed) return;
    this.comp.disconnectContext();
    this.writer.target.removeAllListeners();
    this.writer.cancelQuiz();
    this.writer.hideCharacter();
    this.writer.hideOutline();
    this.isDestroyed = true;
  };

  return HanziWriterContext;
}();

exports.default = HanziWriterContext;

/***/ }),
/* 2 */
/***/ (function(module, exports) {

module.exports = require("hanzi-writer");

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _EventEmitter = __webpack_require__(4);

var _EventEmitter2 = _interopRequireDefault(_EventEmitter);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var polyfillCanvasCtx = function polyfillCanvasCtx(ctx) {
  // need to polyfill missing setters from the wechat context...
  ['globalAlpha', 'strokeStyle', 'fillStyle', 'lineWidth', 'lineCap', 'lineJoin'].forEach(function (setter) {
    var setterMethod = 'set' + setter[0].toUpperCase() + setter.slice(1);
    Object.defineProperty(ctx, setter, { set: ctx[setterMethod].bind(ctx) });
  });
  return ctx;
};

var eventify = function eventify(evt, boundingRect) {
  var getPoint = function getPoint() {
    var x = evt.touches[0].clientX - boundingRect.left;
    var y = evt.touches[0].clientY - boundingRect.top;
    return { x: x, y: y };
  };

  return { preventDefault: function preventDefault() {}, getPoint: getPoint };
};

var RenderTarget = function () {
  function RenderTarget(view) {
    _classCallCheck(this, RenderTarget);

    this.view = view;
    this.eventEmitter = new _EventEmitter2.default();
    this.ctx = polyfillCanvasCtx(wx.createCanvasContext('writer-canvas', view));
    this.canvas = this.view.selectComponent('#writer-canvas');
  }

  RenderTarget.prototype.addPointerStartListener = function addPointerStartListener(callback) {
    this.eventEmitter.addListener('pointerStart', callback);
  };

  RenderTarget.prototype.addPointerMoveListener = function addPointerMoveListener(callback) {
    this.eventEmitter.addListener('pointerMove', callback);
  };

  RenderTarget.prototype.addPointerEndListener = function addPointerEndListener(callback) {
    this.eventEmitter.addListener('pointerEnd', callback);
  };

  RenderTarget.prototype.trigger = function trigger(eventName, evt) {
    var _this = this;

    this._getClientBoundingRect().then(function (rect) {
      _this.eventEmitter.trigger(eventName, eventify(evt, rect));
    });
  };

  RenderTarget.prototype.removeAllListeners = function removeAllListeners() {
    return this.eventEmitter.removeAllListeners();
  };

  RenderTarget.prototype.getContext = function getContext() {
    return this.ctx;
  };

  RenderTarget.prototype._getClientBoundingRect = function _getClientBoundingRect() {
    var _this2 = this;

    return new Promise(function (resolve) {
      _this2.view.createSelectorQuery().select('#writer-canvas').boundingClientRect(resolve).exec();
    });
  };

  return RenderTarget;
}();

RenderTarget.init = function (initData) {
  return new RenderTarget(initData);
};

module.exports = RenderTarget;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// lightweight partial EventEmitter, since the full node EventEmitter isn't present in wechat

var EventEmitter = function () {
  function EventEmitter() {
    _classCallCheck(this, EventEmitter);

    this._listeners = {};
  }

  EventEmitter.prototype.addListener = function addListener(name, callback) {
    if (!this._listeners[name]) this._listeners[name] = [];
    this._listeners[name].push(callback);
  };

  EventEmitter.prototype.trigger = function trigger(name, evt) {
    if (this._listeners[name]) {
      this._listeners[name].forEach(function (listener) {
        return listener(evt);
      });
    }
  };

  EventEmitter.prototype.removeAllListeners = function removeAllListeners() {
    this._listeners = {};
  };

  return EventEmitter;
}();

exports.default = EventEmitter;

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
var removeEmptyKeys = exports.removeEmptyKeys = function removeEmptyKeys(obj) {
  var newObj = {};
  Object.keys(obj).forEach(function (key) {
    var val = obj[key];
    if (val !== undefined && val !== null) {
      newObj[key] = val;
    }
  });
  return newObj;
};

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
var VERSION = '2.0';
var getCharDataUrl = function getCharDataUrl(char) {
  return 'https://cdn.jsdelivr.net/npm/hanzi-writer-data@' + VERSION + '/' + encodeURIComponent(char) + '.json';
};

exports.default = function (char, onLoad, onError) {
  wx.request({
    url: getCharDataUrl(char),
    header: {
      'content-type': 'application/json'
    },
    success: function success(res) {
      onLoad(res.data);
    },
    fail: onError
  });
};

/***/ })
/******/ ]);