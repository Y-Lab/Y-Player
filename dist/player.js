(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("Player", [], factory);
	else if(typeof exports === 'object')
		exports["Player"] = factory();
	else
		root["Player"] = factory();
})(window, function() {
return /******/ (function(modules) { // webpackBootstrap
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
/******/ 	__webpack_require__.p = "/";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/js/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/art-template/lib/compile/runtime.js":
/*!**********************************************************!*\
  !*** ./node_modules/art-template/lib/compile/runtime.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {

/*! art-template@runtime | https://github.com/aui/art-template */

var detectNode = __webpack_require__(/*! detect-node */ "./node_modules/detect-node/browser.js");
var runtime = Object.create(detectNode ? global : window);
var ESCAPE_REG = /["&'<>]/;

/**
 * 编码模板输出的内容
 * @param  {any}        content
 * @return {string}
 */
runtime.$escape = function (content) {
    return xmlEscape(toString(content));
};

/**
 * 迭代器，支持数组与对象
 * @param {array|Object} data 
 * @param {function}     callback 
 */
runtime.$each = function (data, callback) {
    if (Array.isArray(data)) {
        for (var i = 0, len = data.length; i < len; i++) {
            callback(data[i], i);
        }
    } else {
        for (var _i in data) {
            callback(data[_i], _i);
        }
    }
};

// 将目标转成字符
function toString(value) {
    if (typeof value !== 'string') {
        if (value === undefined || value === null) {
            value = '';
        } else if (typeof value === 'function') {
            value = toString(value.call(value));
        } else {
            value = JSON.stringify(value);
        }
    }

    return value;
};

// 编码 HTML 内容
function xmlEscape(content) {
    var html = '' + content;
    var regexResult = ESCAPE_REG.exec(html);
    if (!regexResult) {
        return content;
    }

    var result = '';
    var i = void 0,
        lastIndex = void 0,
        char = void 0;
    for (i = regexResult.index, lastIndex = 0; i < html.length; i++) {

        switch (html.charCodeAt(i)) {
            case 34:
                char = '&#34;';
                break;
            case 38:
                char = '&#38;';
                break;
            case 39:
                char = '&#39;';
                break;
            case 60:
                char = '&#60;';
                break;
            case 62:
                char = '&#62;';
                break;
            default:
                continue;
        }

        if (lastIndex !== i) {
            result += html.substring(lastIndex, i);
        }

        lastIndex = i + 1;
        result += char;
    }

    if (lastIndex !== i) {
        return result + html.substring(lastIndex, i);
    } else {
        return result;
    }
};

module.exports = runtime;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../webpack/buildin/global.js */ "./node_modules/webpack/buildin/global.js")))

/***/ }),

/***/ "./node_modules/art-template/lib/runtime.js":
/*!**************************************************!*\
  !*** ./node_modules/art-template/lib/runtime.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = __webpack_require__(/*! ./compile/runtime */ "./node_modules/art-template/lib/compile/runtime.js");

/***/ }),

/***/ "./node_modules/css-loader/index.js?!./node_modules/postcss-loader/src/index.js?!./node_modules/balloon-css/balloon.css":
/*!******************************************************************************************************************************!*\
  !*** ./node_modules/css-loader??ref--6-1!./node_modules/postcss-loader/src??ref--6-2!./node_modules/balloon-css/balloon.css ***!
  \******************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../css-loader/lib/css-base.js */ "./node_modules/css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "button[data-balloon] {\n  overflow: visible; }\n\n[data-balloon] {\n  position: relative;\n  cursor: pointer; }\n  [data-balloon]:after {\n    filter: alpha(opactiy=0);\n    -ms-filter: \"progid:DXImageTransform.Microsoft.Alpha(Opacity=0)\";\n    -moz-opacity: 0;\n    -khtml-opacity: 0;\n    opacity: 0;\n    pointer-events: none;\n    transition: all 0.18s ease-out 0.18s;\n    font-family: sans-serif !important;\n    font-weight: normal !important;\n    font-style: normal !important;\n    text-shadow: none !important;\n    font-size: 12px !important;\n    background: rgba(17, 17, 17, 0.9);\n    border-radius: 4px;\n    color: #fff;\n    content: attr(data-balloon);\n    padding: .5em 1em;\n    position: absolute;\n    white-space: nowrap;\n    z-index: 10; }\n  [data-balloon]:before {\n    background: no-repeat url(\"data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http://www.w3.org/2000/svg%22%20width%3D%2236px%22%20height%3D%2212px%22%3E%3Cpath%20fill%3D%22rgba(17, 17, 17, 0.9)%22%20transform%3D%22rotate(0)%22%20d%3D%22M2.658,0.000%20C-13.615,0.000%2050.938,0.000%2034.662,0.000%20C28.662,0.000%2023.035,12.002%2018.660,12.002%20C14.285,12.002%208.594,0.000%202.658,0.000%20Z%22/%3E%3C/svg%3E\");\n    background-size: 100% auto;\n    width: 18px;\n    height: 6px;\n    filter: alpha(opactiy=0);\n    -ms-filter: \"progid:DXImageTransform.Microsoft.Alpha(Opacity=0)\";\n    -moz-opacity: 0;\n    -khtml-opacity: 0;\n    opacity: 0;\n    pointer-events: none;\n    transition: all 0.18s ease-out 0.18s;\n    content: '';\n    position: absolute;\n    z-index: 10; }\n  [data-balloon]:hover:before, [data-balloon]:hover:after, [data-balloon][data-balloon-visible]:before, [data-balloon][data-balloon-visible]:after {\n    filter: alpha(opactiy=100);\n    -ms-filter: \"progid:DXImageTransform.Microsoft.Alpha(Opacity=100)\";\n    -moz-opacity: 1;\n    -khtml-opacity: 1;\n    opacity: 1;\n    pointer-events: auto; }\n  [data-balloon].font-awesome:after {\n    font-family: FontAwesome; }\n  [data-balloon][data-balloon-break]:after {\n    white-space: pre; }\n  [data-balloon][data-balloon-blunt]:before, [data-balloon][data-balloon-blunt]:after {\n    transition: none; }\n  [data-balloon][data-balloon-pos=\"up\"]:after {\n    bottom: 100%;\n    left: 50%;\n    margin-bottom: 11px;\n    -webkit-transform: translate(-50%, 10px);\n    transform: translate(-50%, 10px);\n    -webkit-transform-origin: top;\n    transform-origin: top; }\n  [data-balloon][data-balloon-pos=\"up\"]:before {\n    bottom: 100%;\n    left: 50%;\n    margin-bottom: 5px;\n    -webkit-transform: translate(-50%, 10px);\n    transform: translate(-50%, 10px);\n    -webkit-transform-origin: top;\n    transform-origin: top; }\n  [data-balloon][data-balloon-pos=\"up\"]:hover:after, [data-balloon][data-balloon-pos=\"up\"][data-balloon-visible]:after {\n    -webkit-transform: translate(-50%, 0);\n    transform: translate(-50%, 0); }\n  [data-balloon][data-balloon-pos=\"up\"]:hover:before, [data-balloon][data-balloon-pos=\"up\"][data-balloon-visible]:before {\n    -webkit-transform: translate(-50%, 0);\n    transform: translate(-50%, 0); }\n  [data-balloon][data-balloon-pos=\"up-left\"]:after {\n    bottom: 100%;\n    left: 0;\n    margin-bottom: 11px;\n    -webkit-transform: translate(0, 10px);\n    transform: translate(0, 10px);\n    -webkit-transform-origin: top;\n    transform-origin: top; }\n  [data-balloon][data-balloon-pos=\"up-left\"]:before {\n    bottom: 100%;\n    left: 5px;\n    margin-bottom: 5px;\n    -webkit-transform: translate(0, 10px);\n    transform: translate(0, 10px);\n    -webkit-transform-origin: top;\n    transform-origin: top; }\n  [data-balloon][data-balloon-pos=\"up-left\"]:hover:after, [data-balloon][data-balloon-pos=\"up-left\"][data-balloon-visible]:after {\n    -webkit-transform: translate(0, 0);\n    transform: translate(0, 0); }\n  [data-balloon][data-balloon-pos=\"up-left\"]:hover:before, [data-balloon][data-balloon-pos=\"up-left\"][data-balloon-visible]:before {\n    -webkit-transform: translate(0, 0);\n    transform: translate(0, 0); }\n  [data-balloon][data-balloon-pos=\"up-right\"]:after {\n    bottom: 100%;\n    right: 0;\n    margin-bottom: 11px;\n    -webkit-transform: translate(0, 10px);\n    transform: translate(0, 10px);\n    -webkit-transform-origin: top;\n    transform-origin: top; }\n  [data-balloon][data-balloon-pos=\"up-right\"]:before {\n    bottom: 100%;\n    right: 5px;\n    margin-bottom: 5px;\n    -webkit-transform: translate(0, 10px);\n    transform: translate(0, 10px);\n    -webkit-transform-origin: top;\n    transform-origin: top; }\n  [data-balloon][data-balloon-pos=\"up-right\"]:hover:after, [data-balloon][data-balloon-pos=\"up-right\"][data-balloon-visible]:after {\n    -webkit-transform: translate(0, 0);\n    transform: translate(0, 0); }\n  [data-balloon][data-balloon-pos=\"up-right\"]:hover:before, [data-balloon][data-balloon-pos=\"up-right\"][data-balloon-visible]:before {\n    -webkit-transform: translate(0, 0);\n    transform: translate(0, 0); }\n  [data-balloon][data-balloon-pos='down']:after {\n    left: 50%;\n    margin-top: 11px;\n    top: 100%;\n    -webkit-transform: translate(-50%, -10px);\n    transform: translate(-50%, -10px); }\n  [data-balloon][data-balloon-pos='down']:before {\n    background: no-repeat url(\"data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http://www.w3.org/2000/svg%22%20width%3D%2236px%22%20height%3D%2212px%22%3E%3Cpath%20fill%3D%22rgba(17, 17, 17, 0.9)%22%20transform%3D%22rotate(180 18 6)%22%20d%3D%22M2.658,0.000%20C-13.615,0.000%2050.938,0.000%2034.662,0.000%20C28.662,0.000%2023.035,12.002%2018.660,12.002%20C14.285,12.002%208.594,0.000%202.658,0.000%20Z%22/%3E%3C/svg%3E\");\n    background-size: 100% auto;\n    width: 18px;\n    height: 6px;\n    left: 50%;\n    margin-top: 5px;\n    top: 100%;\n    -webkit-transform: translate(-50%, -10px);\n    transform: translate(-50%, -10px); }\n  [data-balloon][data-balloon-pos='down']:hover:after, [data-balloon][data-balloon-pos='down'][data-balloon-visible]:after {\n    -webkit-transform: translate(-50%, 0);\n    transform: translate(-50%, 0); }\n  [data-balloon][data-balloon-pos='down']:hover:before, [data-balloon][data-balloon-pos='down'][data-balloon-visible]:before {\n    -webkit-transform: translate(-50%, 0);\n    transform: translate(-50%, 0); }\n  [data-balloon][data-balloon-pos='down-left']:after {\n    left: 0;\n    margin-top: 11px;\n    top: 100%;\n    -webkit-transform: translate(0, -10px);\n    transform: translate(0, -10px); }\n  [data-balloon][data-balloon-pos='down-left']:before {\n    background: no-repeat url(\"data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http://www.w3.org/2000/svg%22%20width%3D%2236px%22%20height%3D%2212px%22%3E%3Cpath%20fill%3D%22rgba(17, 17, 17, 0.9)%22%20transform%3D%22rotate(180 18 6)%22%20d%3D%22M2.658,0.000%20C-13.615,0.000%2050.938,0.000%2034.662,0.000%20C28.662,0.000%2023.035,12.002%2018.660,12.002%20C14.285,12.002%208.594,0.000%202.658,0.000%20Z%22/%3E%3C/svg%3E\");\n    background-size: 100% auto;\n    width: 18px;\n    height: 6px;\n    left: 5px;\n    margin-top: 5px;\n    top: 100%;\n    -webkit-transform: translate(0, -10px);\n    transform: translate(0, -10px); }\n  [data-balloon][data-balloon-pos='down-left']:hover:after, [data-balloon][data-balloon-pos='down-left'][data-balloon-visible]:after {\n    -webkit-transform: translate(0, 0);\n    transform: translate(0, 0); }\n  [data-balloon][data-balloon-pos='down-left']:hover:before, [data-balloon][data-balloon-pos='down-left'][data-balloon-visible]:before {\n    -webkit-transform: translate(0, 0);\n    transform: translate(0, 0); }\n  [data-balloon][data-balloon-pos='down-right']:after {\n    right: 0;\n    margin-top: 11px;\n    top: 100%;\n    -webkit-transform: translate(0, -10px);\n    transform: translate(0, -10px); }\n  [data-balloon][data-balloon-pos='down-right']:before {\n    background: no-repeat url(\"data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http://www.w3.org/2000/svg%22%20width%3D%2236px%22%20height%3D%2212px%22%3E%3Cpath%20fill%3D%22rgba(17, 17, 17, 0.9)%22%20transform%3D%22rotate(180 18 6)%22%20d%3D%22M2.658,0.000%20C-13.615,0.000%2050.938,0.000%2034.662,0.000%20C28.662,0.000%2023.035,12.002%2018.660,12.002%20C14.285,12.002%208.594,0.000%202.658,0.000%20Z%22/%3E%3C/svg%3E\");\n    background-size: 100% auto;\n    width: 18px;\n    height: 6px;\n    right: 5px;\n    margin-top: 5px;\n    top: 100%;\n    -webkit-transform: translate(0, -10px);\n    transform: translate(0, -10px); }\n  [data-balloon][data-balloon-pos='down-right']:hover:after, [data-balloon][data-balloon-pos='down-right'][data-balloon-visible]:after {\n    -webkit-transform: translate(0, 0);\n    transform: translate(0, 0); }\n  [data-balloon][data-balloon-pos='down-right']:hover:before, [data-balloon][data-balloon-pos='down-right'][data-balloon-visible]:before {\n    -webkit-transform: translate(0, 0);\n    transform: translate(0, 0); }\n  [data-balloon][data-balloon-pos='left']:after {\n    margin-right: 11px;\n    right: 100%;\n    top: 50%;\n    -webkit-transform: translate(10px, -50%);\n    transform: translate(10px, -50%); }\n  [data-balloon][data-balloon-pos='left']:before {\n    background: no-repeat url(\"data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http://www.w3.org/2000/svg%22%20width%3D%2212px%22%20height%3D%2236px%22%3E%3Cpath%20fill%3D%22rgba(17, 17, 17, 0.9)%22%20transform%3D%22rotate(-90 18 18)%22%20d%3D%22M2.658,0.000%20C-13.615,0.000%2050.938,0.000%2034.662,0.000%20C28.662,0.000%2023.035,12.002%2018.660,12.002%20C14.285,12.002%208.594,0.000%202.658,0.000%20Z%22/%3E%3C/svg%3E\");\n    background-size: 100% auto;\n    width: 6px;\n    height: 18px;\n    margin-right: 5px;\n    right: 100%;\n    top: 50%;\n    -webkit-transform: translate(10px, -50%);\n    transform: translate(10px, -50%); }\n  [data-balloon][data-balloon-pos='left']:hover:after, [data-balloon][data-balloon-pos='left'][data-balloon-visible]:after {\n    -webkit-transform: translate(0, -50%);\n    transform: translate(0, -50%); }\n  [data-balloon][data-balloon-pos='left']:hover:before, [data-balloon][data-balloon-pos='left'][data-balloon-visible]:before {\n    -webkit-transform: translate(0, -50%);\n    transform: translate(0, -50%); }\n  [data-balloon][data-balloon-pos='right']:after {\n    left: 100%;\n    margin-left: 11px;\n    top: 50%;\n    -webkit-transform: translate(-10px, -50%);\n    transform: translate(-10px, -50%); }\n  [data-balloon][data-balloon-pos='right']:before {\n    background: no-repeat url(\"data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http://www.w3.org/2000/svg%22%20width%3D%2212px%22%20height%3D%2236px%22%3E%3Cpath%20fill%3D%22rgba(17, 17, 17, 0.9)%22%20transform%3D%22rotate(90 6 6)%22%20d%3D%22M2.658,0.000%20C-13.615,0.000%2050.938,0.000%2034.662,0.000%20C28.662,0.000%2023.035,12.002%2018.660,12.002%20C14.285,12.002%208.594,0.000%202.658,0.000%20Z%22/%3E%3C/svg%3E\");\n    background-size: 100% auto;\n    width: 6px;\n    height: 18px;\n    left: 100%;\n    margin-left: 5px;\n    top: 50%;\n    -webkit-transform: translate(-10px, -50%);\n    transform: translate(-10px, -50%); }\n  [data-balloon][data-balloon-pos='right']:hover:after, [data-balloon][data-balloon-pos='right'][data-balloon-visible]:after {\n    -webkit-transform: translate(0, -50%);\n    transform: translate(0, -50%); }\n  [data-balloon][data-balloon-pos='right']:hover:before, [data-balloon][data-balloon-pos='right'][data-balloon-visible]:before {\n    -webkit-transform: translate(0, -50%);\n    transform: translate(0, -50%); }\n  [data-balloon][data-balloon-length='small']:after {\n    white-space: normal;\n    width: 80px; }\n  [data-balloon][data-balloon-length='medium']:after {\n    white-space: normal;\n    width: 150px; }\n  [data-balloon][data-balloon-length='large']:after {\n    white-space: normal;\n    width: 260px; }\n  [data-balloon][data-balloon-length='xlarge']:after {\n    white-space: normal;\n    width: 380px; }\n    @media screen and (max-width: 768px) {\n      [data-balloon][data-balloon-length='xlarge']:after {\n        white-space: normal;\n        width: 90vw; } }\n  [data-balloon][data-balloon-length='fit']:after {\n    white-space: normal;\n    width: 100%; }\n", ""]);

// exports


/***/ }),

/***/ "./node_modules/css-loader/index.js?!./node_modules/postcss-loader/src/index.js?!./node_modules/sass-loader/lib/loader.js!./src/scss/index.scss":
/*!******************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader??ref--6-1!./node_modules/postcss-loader/src??ref--6-2!./node_modules/sass-loader/lib/loader.js!./src/scss/index.scss ***!
  \******************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../node_modules/css-loader/lib/css-base.js */ "./node_modules/css-loader/lib/css-base.js")(false);
// imports
exports.i(__webpack_require__(/*! -!../../node_modules/css-loader??ref--6-1!../../node_modules/postcss-loader/src??ref--6-2!../../node_modules/balloon-css/balloon.css */ "./node_modules/css-loader/index.js?!./node_modules/postcss-loader/src/index.js?!./node_modules/balloon-css/balloon.css"), "");

// module
exports.push([module.i, "@-webkit-keyframes my-face {\n  2% {\n    -webkit-transform: translate(0, 1.5px) rotate(1.5deg);\n            transform: translate(0, 1.5px) rotate(1.5deg); }\n  4% {\n    -webkit-transform: translate(0, -1.5px) rotate(-0.5deg);\n            transform: translate(0, -1.5px) rotate(-0.5deg); }\n  6% {\n    -webkit-transform: translate(0, 1.5px) rotate(-1.5deg);\n            transform: translate(0, 1.5px) rotate(-1.5deg); }\n  8% {\n    -webkit-transform: translate(0, -1.5px) rotate(-1.5deg);\n            transform: translate(0, -1.5px) rotate(-1.5deg); }\n  10% {\n    -webkit-transform: translate(0, 2.5px) rotate(1.5deg);\n            transform: translate(0, 2.5px) rotate(1.5deg); }\n  12% {\n    -webkit-transform: translate(0, -0.5px) rotate(1.5deg);\n            transform: translate(0, -0.5px) rotate(1.5deg); }\n  14% {\n    -webkit-transform: translate(0, -1.5px) rotate(1.5deg);\n            transform: translate(0, -1.5px) rotate(1.5deg); }\n  16% {\n    -webkit-transform: translate(0, -0.5px) rotate(-1.5deg);\n            transform: translate(0, -0.5px) rotate(-1.5deg); }\n  18% {\n    -webkit-transform: translate(0, 0.5px) rotate(-1.5deg);\n            transform: translate(0, 0.5px) rotate(-1.5deg); }\n  20% {\n    -webkit-transform: translate(0, -1.5px) rotate(2.5deg);\n            transform: translate(0, -1.5px) rotate(2.5deg); }\n  22% {\n    -webkit-transform: translate(0, 0.5px) rotate(-1.5deg);\n            transform: translate(0, 0.5px) rotate(-1.5deg); }\n  24% {\n    -webkit-transform: translate(0, 1.5px) rotate(1.5deg);\n            transform: translate(0, 1.5px) rotate(1.5deg); }\n  26% {\n    -webkit-transform: translate(0, 0.5px) rotate(0.5deg);\n            transform: translate(0, 0.5px) rotate(0.5deg); }\n  28% {\n    -webkit-transform: translate(0, 0.5px) rotate(1.5deg);\n            transform: translate(0, 0.5px) rotate(1.5deg); }\n  30% {\n    -webkit-transform: translate(0, -0.5px) rotate(2.5deg);\n            transform: translate(0, -0.5px) rotate(2.5deg); }\n  32% {\n    -webkit-transform: translate(0, 1.5px) rotate(-0.5deg);\n            transform: translate(0, 1.5px) rotate(-0.5deg); }\n  34% {\n    -webkit-transform: translate(0, 1.5px) rotate(-0.5deg);\n            transform: translate(0, 1.5px) rotate(-0.5deg); }\n  36% {\n    -webkit-transform: translate(0, -1.5px) rotate(2.5deg);\n            transform: translate(0, -1.5px) rotate(2.5deg); }\n  38% {\n    -webkit-transform: translate(0, 1.5px) rotate(-1.5deg);\n            transform: translate(0, 1.5px) rotate(-1.5deg); }\n  40% {\n    -webkit-transform: translate(0, -0.5px) rotate(2.5deg);\n            transform: translate(0, -0.5px) rotate(2.5deg); }\n  42% {\n    -webkit-transform: translate(0, 2.5px) rotate(-1.5deg);\n            transform: translate(0, 2.5px) rotate(-1.5deg); }\n  44% {\n    -webkit-transform: translate(0, 1.5px) rotate(0.5deg);\n            transform: translate(0, 1.5px) rotate(0.5deg); }\n  46% {\n    -webkit-transform: translate(0, -1.5px) rotate(2.5deg);\n            transform: translate(0, -1.5px) rotate(2.5deg); }\n  48% {\n    -webkit-transform: translate(0, -0.5px) rotate(0.5deg);\n            transform: translate(0, -0.5px) rotate(0.5deg); }\n  50% {\n    -webkit-transform: translate(0, 0.5px) rotate(0.5deg);\n            transform: translate(0, 0.5px) rotate(0.5deg); }\n  52% {\n    -webkit-transform: translate(0, 2.5px) rotate(2.5deg);\n            transform: translate(0, 2.5px) rotate(2.5deg); }\n  54% {\n    -webkit-transform: translate(0, -1.5px) rotate(1.5deg);\n            transform: translate(0, -1.5px) rotate(1.5deg); }\n  56% {\n    -webkit-transform: translate(0, 2.5px) rotate(2.5deg);\n            transform: translate(0, 2.5px) rotate(2.5deg); }\n  58% {\n    -webkit-transform: translate(0, 0.5px) rotate(2.5deg);\n            transform: translate(0, 0.5px) rotate(2.5deg); }\n  60% {\n    -webkit-transform: translate(0, 2.5px) rotate(2.5deg);\n            transform: translate(0, 2.5px) rotate(2.5deg); }\n  62% {\n    -webkit-transform: translate(0, -0.5px) rotate(2.5deg);\n            transform: translate(0, -0.5px) rotate(2.5deg); }\n  64% {\n    -webkit-transform: translate(0, -0.5px) rotate(1.5deg);\n            transform: translate(0, -0.5px) rotate(1.5deg); }\n  66% {\n    -webkit-transform: translate(0, 1.5px) rotate(-0.5deg);\n            transform: translate(0, 1.5px) rotate(-0.5deg); }\n  68% {\n    -webkit-transform: translate(0, -1.5px) rotate(-0.5deg);\n            transform: translate(0, -1.5px) rotate(-0.5deg); }\n  70% {\n    -webkit-transform: translate(0, 1.5px) rotate(0.5deg);\n            transform: translate(0, 1.5px) rotate(0.5deg); }\n  72% {\n    -webkit-transform: translate(0, 2.5px) rotate(1.5deg);\n            transform: translate(0, 2.5px) rotate(1.5deg); }\n  74% {\n    -webkit-transform: translate(0, -0.5px) rotate(0.5deg);\n            transform: translate(0, -0.5px) rotate(0.5deg); }\n  76% {\n    -webkit-transform: translate(0, -0.5px) rotate(2.5deg);\n            transform: translate(0, -0.5px) rotate(2.5deg); }\n  78% {\n    -webkit-transform: translate(0, -0.5px) rotate(1.5deg);\n            transform: translate(0, -0.5px) rotate(1.5deg); }\n  80% {\n    -webkit-transform: translate(0, 1.5px) rotate(1.5deg);\n            transform: translate(0, 1.5px) rotate(1.5deg); }\n  82% {\n    -webkit-transform: translate(0, -0.5px) rotate(0.5deg);\n            transform: translate(0, -0.5px) rotate(0.5deg); }\n  84% {\n    -webkit-transform: translate(0, 1.5px) rotate(2.5deg);\n            transform: translate(0, 1.5px) rotate(2.5deg); }\n  86% {\n    -webkit-transform: translate(0, -1.5px) rotate(-1.5deg);\n            transform: translate(0, -1.5px) rotate(-1.5deg); }\n  88% {\n    -webkit-transform: translate(0, -0.5px) rotate(2.5deg);\n            transform: translate(0, -0.5px) rotate(2.5deg); }\n  90% {\n    -webkit-transform: translate(0, 2.5px) rotate(-0.5deg);\n            transform: translate(0, 2.5px) rotate(-0.5deg); }\n  92% {\n    -webkit-transform: translate(0, 0.5px) rotate(-0.5deg);\n            transform: translate(0, 0.5px) rotate(-0.5deg); }\n  94% {\n    -webkit-transform: translate(0, 2.5px) rotate(0.5deg);\n            transform: translate(0, 2.5px) rotate(0.5deg); }\n  96% {\n    -webkit-transform: translate(0, -0.5px) rotate(1.5deg);\n            transform: translate(0, -0.5px) rotate(1.5deg); }\n  98% {\n    -webkit-transform: translate(0, -1.5px) rotate(-0.5deg);\n            transform: translate(0, -1.5px) rotate(-0.5deg); }\n  0%,\n  100% {\n    -webkit-transform: translate(0, 0) rotate(0deg);\n            transform: translate(0, 0) rotate(0deg); } }\n@keyframes my-face {\n  2% {\n    -webkit-transform: translate(0, 1.5px) rotate(1.5deg);\n            transform: translate(0, 1.5px) rotate(1.5deg); }\n  4% {\n    -webkit-transform: translate(0, -1.5px) rotate(-0.5deg);\n            transform: translate(0, -1.5px) rotate(-0.5deg); }\n  6% {\n    -webkit-transform: translate(0, 1.5px) rotate(-1.5deg);\n            transform: translate(0, 1.5px) rotate(-1.5deg); }\n  8% {\n    -webkit-transform: translate(0, -1.5px) rotate(-1.5deg);\n            transform: translate(0, -1.5px) rotate(-1.5deg); }\n  10% {\n    -webkit-transform: translate(0, 2.5px) rotate(1.5deg);\n            transform: translate(0, 2.5px) rotate(1.5deg); }\n  12% {\n    -webkit-transform: translate(0, -0.5px) rotate(1.5deg);\n            transform: translate(0, -0.5px) rotate(1.5deg); }\n  14% {\n    -webkit-transform: translate(0, -1.5px) rotate(1.5deg);\n            transform: translate(0, -1.5px) rotate(1.5deg); }\n  16% {\n    -webkit-transform: translate(0, -0.5px) rotate(-1.5deg);\n            transform: translate(0, -0.5px) rotate(-1.5deg); }\n  18% {\n    -webkit-transform: translate(0, 0.5px) rotate(-1.5deg);\n            transform: translate(0, 0.5px) rotate(-1.5deg); }\n  20% {\n    -webkit-transform: translate(0, -1.5px) rotate(2.5deg);\n            transform: translate(0, -1.5px) rotate(2.5deg); }\n  22% {\n    -webkit-transform: translate(0, 0.5px) rotate(-1.5deg);\n            transform: translate(0, 0.5px) rotate(-1.5deg); }\n  24% {\n    -webkit-transform: translate(0, 1.5px) rotate(1.5deg);\n            transform: translate(0, 1.5px) rotate(1.5deg); }\n  26% {\n    -webkit-transform: translate(0, 0.5px) rotate(0.5deg);\n            transform: translate(0, 0.5px) rotate(0.5deg); }\n  28% {\n    -webkit-transform: translate(0, 0.5px) rotate(1.5deg);\n            transform: translate(0, 0.5px) rotate(1.5deg); }\n  30% {\n    -webkit-transform: translate(0, -0.5px) rotate(2.5deg);\n            transform: translate(0, -0.5px) rotate(2.5deg); }\n  32% {\n    -webkit-transform: translate(0, 1.5px) rotate(-0.5deg);\n            transform: translate(0, 1.5px) rotate(-0.5deg); }\n  34% {\n    -webkit-transform: translate(0, 1.5px) rotate(-0.5deg);\n            transform: translate(0, 1.5px) rotate(-0.5deg); }\n  36% {\n    -webkit-transform: translate(0, -1.5px) rotate(2.5deg);\n            transform: translate(0, -1.5px) rotate(2.5deg); }\n  38% {\n    -webkit-transform: translate(0, 1.5px) rotate(-1.5deg);\n            transform: translate(0, 1.5px) rotate(-1.5deg); }\n  40% {\n    -webkit-transform: translate(0, -0.5px) rotate(2.5deg);\n            transform: translate(0, -0.5px) rotate(2.5deg); }\n  42% {\n    -webkit-transform: translate(0, 2.5px) rotate(-1.5deg);\n            transform: translate(0, 2.5px) rotate(-1.5deg); }\n  44% {\n    -webkit-transform: translate(0, 1.5px) rotate(0.5deg);\n            transform: translate(0, 1.5px) rotate(0.5deg); }\n  46% {\n    -webkit-transform: translate(0, -1.5px) rotate(2.5deg);\n            transform: translate(0, -1.5px) rotate(2.5deg); }\n  48% {\n    -webkit-transform: translate(0, -0.5px) rotate(0.5deg);\n            transform: translate(0, -0.5px) rotate(0.5deg); }\n  50% {\n    -webkit-transform: translate(0, 0.5px) rotate(0.5deg);\n            transform: translate(0, 0.5px) rotate(0.5deg); }\n  52% {\n    -webkit-transform: translate(0, 2.5px) rotate(2.5deg);\n            transform: translate(0, 2.5px) rotate(2.5deg); }\n  54% {\n    -webkit-transform: translate(0, -1.5px) rotate(1.5deg);\n            transform: translate(0, -1.5px) rotate(1.5deg); }\n  56% {\n    -webkit-transform: translate(0, 2.5px) rotate(2.5deg);\n            transform: translate(0, 2.5px) rotate(2.5deg); }\n  58% {\n    -webkit-transform: translate(0, 0.5px) rotate(2.5deg);\n            transform: translate(0, 0.5px) rotate(2.5deg); }\n  60% {\n    -webkit-transform: translate(0, 2.5px) rotate(2.5deg);\n            transform: translate(0, 2.5px) rotate(2.5deg); }\n  62% {\n    -webkit-transform: translate(0, -0.5px) rotate(2.5deg);\n            transform: translate(0, -0.5px) rotate(2.5deg); }\n  64% {\n    -webkit-transform: translate(0, -0.5px) rotate(1.5deg);\n            transform: translate(0, -0.5px) rotate(1.5deg); }\n  66% {\n    -webkit-transform: translate(0, 1.5px) rotate(-0.5deg);\n            transform: translate(0, 1.5px) rotate(-0.5deg); }\n  68% {\n    -webkit-transform: translate(0, -1.5px) rotate(-0.5deg);\n            transform: translate(0, -1.5px) rotate(-0.5deg); }\n  70% {\n    -webkit-transform: translate(0, 1.5px) rotate(0.5deg);\n            transform: translate(0, 1.5px) rotate(0.5deg); }\n  72% {\n    -webkit-transform: translate(0, 2.5px) rotate(1.5deg);\n            transform: translate(0, 2.5px) rotate(1.5deg); }\n  74% {\n    -webkit-transform: translate(0, -0.5px) rotate(0.5deg);\n            transform: translate(0, -0.5px) rotate(0.5deg); }\n  76% {\n    -webkit-transform: translate(0, -0.5px) rotate(2.5deg);\n            transform: translate(0, -0.5px) rotate(2.5deg); }\n  78% {\n    -webkit-transform: translate(0, -0.5px) rotate(1.5deg);\n            transform: translate(0, -0.5px) rotate(1.5deg); }\n  80% {\n    -webkit-transform: translate(0, 1.5px) rotate(1.5deg);\n            transform: translate(0, 1.5px) rotate(1.5deg); }\n  82% {\n    -webkit-transform: translate(0, -0.5px) rotate(0.5deg);\n            transform: translate(0, -0.5px) rotate(0.5deg); }\n  84% {\n    -webkit-transform: translate(0, 1.5px) rotate(2.5deg);\n            transform: translate(0, 1.5px) rotate(2.5deg); }\n  86% {\n    -webkit-transform: translate(0, -1.5px) rotate(-1.5deg);\n            transform: translate(0, -1.5px) rotate(-1.5deg); }\n  88% {\n    -webkit-transform: translate(0, -0.5px) rotate(2.5deg);\n            transform: translate(0, -0.5px) rotate(2.5deg); }\n  90% {\n    -webkit-transform: translate(0, 2.5px) rotate(-0.5deg);\n            transform: translate(0, 2.5px) rotate(-0.5deg); }\n  92% {\n    -webkit-transform: translate(0, 0.5px) rotate(-0.5deg);\n            transform: translate(0, 0.5px) rotate(-0.5deg); }\n  94% {\n    -webkit-transform: translate(0, 2.5px) rotate(0.5deg);\n            transform: translate(0, 2.5px) rotate(0.5deg); }\n  96% {\n    -webkit-transform: translate(0, -0.5px) rotate(1.5deg);\n            transform: translate(0, -0.5px) rotate(1.5deg); }\n  98% {\n    -webkit-transform: translate(0, -1.5px) rotate(-0.5deg);\n            transform: translate(0, -1.5px) rotate(-0.5deg); }\n  0%,\n  100% {\n    -webkit-transform: translate(0, 0) rotate(0deg);\n            transform: translate(0, 0) rotate(0deg); } }\n\n.y-player {\n  position: relative;\n  overflow: hidden;\n  -webkit-user-select: none;\n     -moz-user-select: none;\n      -ms-user-select: none;\n          user-select: none;\n  line-height: 1; }\n  .y-player * {\n    box-sizing: content-box; }\n  .y-player svg {\n    width: 100%;\n    height: 100%; }\n    .y-player svg path,\n    .y-player svg circle {\n      fill: #fff; }\n  .y-player:-webkit-full-screen {\n    width: 100%;\n    height: 100%;\n    background: #000;\n    position: fixed;\n    z-index: 100000;\n    left: 0;\n    top: 0;\n    margin: 0;\n    padding: 0;\n    -webkit-transform: translate(0, 0);\n            transform: translate(0, 0); }\n  .y-player.y-player-arrow .y-player-icon {\n    margin: 0 -3px; }\n  @media (min-width: 900px) {\n    .y-player.y-player-playing .y-player-controller-mask {\n      opacity: 0; }\n    .y-player.y-player-playing .y-player-controller {\n      opacity: 0; }\n    .y-player.y-player-playing:hover .y-player-controller-mask {\n      opacity: 1; }\n    .y-player.y-player-playing:hover .y-player-controller {\n      opacity: 1; } }\n  .y-player.y-player-loading .y-player-bezel .y-player-loading-icon {\n    display: block; }\n  .y-player.y-player-hide-controller {\n    cursor: none; }\n    .y-player.y-player-hide-controller .y-player-controller-mask {\n      opacity: 0;\n      -webkit-transform: translateY(100%);\n              transform: translateY(100%); }\n    .y-player.y-player-hide-controller .y-player-controller {\n      opacity: 0;\n      -webkit-transform: translateY(100%);\n              transform: translateY(100%); }\n  .y-player.y-player-show-controller .y-player-controller-mask {\n    opacity: 1; }\n  .y-player.y-player-show-controller .y-player-controller {\n    opacity: 1; }\n  .y-player.y-player-fulled {\n    position: fixed;\n    z-index: 100000;\n    left: 0;\n    top: 0;\n    width: 100%;\n    height: 100%; }\n  .y-player.y-player-mobile .y-player-controller .y-player-icons .y-player-volume {\n    display: none; }\n  .y-player.y-player-mobile .y-player-controller .y-player-icons .y-player-full .y-player-full-in-icon {\n    position: static;\n    display: inline-block; }\n  .y-player.y-player-mobile .y-player-bar-time {\n    display: none; }\n\n.y-player-web-fullscreen-fix {\n  position: fixed;\n  top: 0;\n  left: 0;\n  margin: 0;\n  padding: 0; }\n\n[data-balloon]:before {\n  display: none; }\n\n[data-balloon]:after {\n  padding: 0.3em 0.7em;\n  background: rgba(17, 17, 17, 0.7); }\n\n[data-balloon][data-balloon-pos=\"up\"]:after {\n  margin-bottom: 0; }\n\n.y-player-bezel {\n  position: absolute;\n  left: 0;\n  right: 0;\n  top: 0;\n  bottom: 0;\n  font-size: 22px;\n  color: #fff;\n  pointer-events: none; }\n  .y-player-bezel .y-player-bezel-icon {\n    position: absolute;\n    top: 50%;\n    left: 50%;\n    margin: -26px 0 0 -26px;\n    height: 52px;\n    width: 52px;\n    padding: 12px;\n    box-sizing: border-box;\n    background: rgba(0, 0, 0, 0.5);\n    border-radius: 50%;\n    opacity: 0;\n    pointer-events: none; }\n    .y-player-bezel .y-player-bezel-icon.y-player-bezel-transition {\n      -webkit-animation: bezel-hide .5s linear;\n              animation: bezel-hide .5s linear; }\n\n@-webkit-keyframes bezel-hide {\n  from {\n    opacity: 1;\n    -webkit-transform: scale(1);\n            transform: scale(1); }\n  to {\n    opacity: 0;\n    -webkit-transform: scale(2);\n            transform: scale(2); } }\n\n@keyframes bezel-hide {\n  from {\n    opacity: 1;\n    -webkit-transform: scale(1);\n            transform: scale(1); }\n  to {\n    opacity: 0;\n    -webkit-transform: scale(2);\n            transform: scale(2); } }\n  .y-player-bezel .y-player-loading-icon {\n    display: none;\n    position: absolute;\n    top: 50%;\n    left: 50%;\n    margin: -18px 0 0 -18px;\n    height: 36px;\n    width: 36px;\n    pointer-events: none; }\n    .y-player-bezel .y-player-loading-icon .y-player-loading-hide {\n      display: none; }\n    .y-player-bezel .y-player-loading-icon .y-player-loading-dot {\n      -webkit-animation: y-player-loading-dot-fade .8s ease infinite;\n              animation: y-player-loading-dot-fade .8s ease infinite;\n      opacity: 0;\n      -webkit-transform-origin: 4px 4px;\n              transform-origin: 4px 4px; }\n      .y-player-bezel .y-player-loading-icon .y-player-loading-dot.y-player-loading-dot-7 {\n        -webkit-animation-delay: 0.7s;\n                animation-delay: 0.7s; }\n      .y-player-bezel .y-player-loading-icon .y-player-loading-dot.y-player-loading-dot-6 {\n        -webkit-animation-delay: 0.6s;\n                animation-delay: 0.6s; }\n      .y-player-bezel .y-player-loading-icon .y-player-loading-dot.y-player-loading-dot-5 {\n        -webkit-animation-delay: 0.5s;\n                animation-delay: 0.5s; }\n      .y-player-bezel .y-player-loading-icon .y-player-loading-dot.y-player-loading-dot-4 {\n        -webkit-animation-delay: 0.4s;\n                animation-delay: 0.4s; }\n      .y-player-bezel .y-player-loading-icon .y-player-loading-dot.y-player-loading-dot-3 {\n        -webkit-animation-delay: 0.3s;\n                animation-delay: 0.3s; }\n      .y-player-bezel .y-player-loading-icon .y-player-loading-dot.y-player-loading-dot-2 {\n        -webkit-animation-delay: 0.2s;\n                animation-delay: 0.2s; }\n      .y-player-bezel .y-player-loading-icon .y-player-loading-dot.y-player-loading-dot-1 {\n        -webkit-animation-delay: 0.1s;\n                animation-delay: 0.1s; }\n\n@-webkit-keyframes y-player-loading-dot-fade {\n  0% {\n    opacity: .7;\n    -webkit-transform: scale(1.2, 1.2);\n            transform: scale(1.2, 1.2); }\n  50% {\n    opacity: .25;\n    -webkit-transform: scale(0.9, 0.9);\n            transform: scale(0.9, 0.9); }\n  to {\n    opacity: .25;\n    -webkit-transform: scale(0.85, 0.85);\n            transform: scale(0.85, 0.85); } }\n\n@keyframes y-player-loading-dot-fade {\n  0% {\n    opacity: .7;\n    -webkit-transform: scale(1.2, 1.2);\n            transform: scale(1.2, 1.2); }\n  50% {\n    opacity: .25;\n    -webkit-transform: scale(0.9, 0.9);\n            transform: scale(0.9, 0.9); }\n  to {\n    opacity: .25;\n    -webkit-transform: scale(0.85, 0.85);\n            transform: scale(0.85, 0.85); } }\n\n.y-player-controller-mask {\n  background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAADGCAYAAAAT+OqFAAAAdklEQVQoz42QQQ7AIAgEF/T/D+kbq/RWAlnQyyazA4aoAB4FsBSA/bFjuF1EOL7VbrIrBuusmrt4ZZORfb6ehbWdnRHEIiITaEUKa5EJqUakRSaEYBJSCY2dEstQY7AuxahwXFrvZmWl2rh4JZ07z9dLtesfNj5q0FU3A5ObbwAAAABJRU5ErkJggg==) repeat-x bottom;\n  height: 98px;\n  width: 100%;\n  position: absolute;\n  bottom: 0;\n  transition: all 0.3s ease; }\n\n.y-player-controller {\n  position: absolute;\n  bottom: 0;\n  left: 0;\n  right: 0;\n  height: 41px;\n  padding: 0 20px;\n  -webkit-user-select: none;\n     -moz-user-select: none;\n      -ms-user-select: none;\n          user-select: none;\n  transition: all 0.3s ease; }\n  .y-player-controller .y-player-bar-wrap {\n    padding: 5px 0;\n    cursor: pointer;\n    position: absolute;\n    bottom: 33px;\n    width: calc(100% - 40px);\n    height: 3px; }\n    .y-player-controller .y-player-bar-wrap:hover .y-player-bar .y-player-played .y-player-thumb {\n      -webkit-transform: scale(1);\n              transform: scale(1); }\n    .y-player-controller .y-player-bar-wrap:hover .y-player-highlight {\n      display: block;\n      width: 8px;\n      -webkit-transform: translateX(-4px);\n              transform: translateX(-4px);\n      top: 4px;\n      height: 40%; }\n    .y-player-controller .y-player-bar-wrap .y-player-highlight {\n      z-index: 12;\n      position: absolute;\n      top: 5px;\n      width: 6px;\n      height: 20%;\n      border-radius: 6px;\n      background-color: #fff;\n      text-align: center;\n      -webkit-transform: translateX(-3px);\n              transform: translateX(-3px);\n      transition: all .2s ease-in-out; }\n      .y-player-controller .y-player-bar-wrap .y-player-highlight:hover .y-player-highlight-text {\n        display: block; }\n      .y-player-controller .y-player-bar-wrap .y-player-highlight:hover ~ .y-player-bar-preview {\n        opacity: 0; }\n      .y-player-controller .y-player-bar-wrap .y-player-highlight:hover ~ .y-player-bar-time {\n        opacity: 0; }\n      .y-player-controller .y-player-bar-wrap .y-player-highlight .y-player-highlight-text {\n        display: none;\n        position: absolute;\n        left: 50%;\n        top: -24px;\n        padding: 5px 8px;\n        background-color: rgba(0, 0, 0, 0.62);\n        color: #fff;\n        border-radius: 4px;\n        font-size: 12px;\n        white-space: nowrap;\n        -webkit-transform: translateX(-50%);\n                transform: translateX(-50%); }\n    .y-player-controller .y-player-bar-wrap .y-player-bar-preview {\n      position: absolute;\n      background: #fff;\n      pointer-events: none;\n      display: none;\n      background-size: 16000px 100%; }\n    .y-player-controller .y-player-bar-wrap .y-player-bar-preview-canvas {\n      position: absolute;\n      width: 100%;\n      height: 100%;\n      z-index: 1;\n      pointer-events: none; }\n    .y-player-controller .y-player-bar-wrap .y-player-bar-time {\n      position: absolute;\n      left: 0px;\n      top: -20px;\n      border-radius: 4px;\n      padding: 5px 7px;\n      background-color: rgba(0, 0, 0, 0.62);\n      color: #fff;\n      font-size: 12px;\n      text-align: center;\n      opacity: 1;\n      transition: opacity .1s ease-in-out;\n      word-wrap: normal;\n      word-break: normal;\n      z-index: 2;\n      pointer-events: none; }\n      .y-player-controller .y-player-bar-wrap .y-player-bar-time.hidden {\n        opacity: 0; }\n    .y-player-controller .y-player-bar-wrap .y-player-bar {\n      position: relative;\n      height: 3px;\n      width: 100%;\n      background: rgba(255, 255, 255, 0.2);\n      cursor: pointer; }\n      .y-player-controller .y-player-bar-wrap .y-player-bar .y-player-loaded {\n        position: absolute;\n        left: 0;\n        top: 0;\n        bottom: 0;\n        background: rgba(255, 255, 255, 0.4);\n        height: 3px;\n        transition: all 0.5s ease;\n        will-change: width; }\n      .y-player-controller .y-player-bar-wrap .y-player-bar .y-player-played {\n        position: absolute;\n        left: 0;\n        top: 0;\n        bottom: 0;\n        height: 3px;\n        will-change: width; }\n        .y-player-controller .y-player-bar-wrap .y-player-bar .y-player-played .y-player-thumb {\n          position: absolute;\n          top: 0;\n          right: 5px;\n          margin-top: -4px;\n          margin-right: -10px;\n          height: 11px;\n          width: 11px;\n          border-radius: 50%;\n          cursor: pointer;\n          transition: all .3s ease-in-out;\n          -webkit-transform: scale(0);\n                  transform: scale(0); }\n  .y-player-controller .y-player-icons {\n    height: 38px;\n    position: absolute;\n    bottom: 0; }\n    .y-player-controller .y-player-icons.y-player-icons-left .y-player-icon {\n      padding: 7px; }\n    .y-player-controller .y-player-icons.y-player-icons-right {\n      right: 20px; }\n      .y-player-controller .y-player-icons.y-player-icons-right .y-player-icon {\n        padding: 8px; }\n    .y-player-controller .y-player-icons .y-player-time {\n      line-height: 38px;\n      color: #eee;\n      text-shadow: 0 0 2px rgba(0, 0, 0, 0.5);\n      vertical-align: middle;\n      font-size: 13px;\n      cursor: default; }\n    .y-player-controller .y-player-icons .y-player-icon {\n      width: 40px;\n      height: 100%;\n      border: none;\n      background-color: transparent;\n      outline: none;\n      cursor: pointer;\n      vertical-align: middle;\n      box-sizing: border-box;\n      display: inline-block; }\n      .y-player-controller .y-player-icons .y-player-icon .y-player-icon-content {\n        transition: all .2s ease-in-out;\n        opacity: .8; }\n      .y-player-controller .y-player-icons .y-player-icon:hover .y-player-icon-content {\n        opacity: 1; }\n      .y-player-controller .y-player-icons .y-player-icon.y-player-quality-icon {\n        color: #fff;\n        width: auto;\n        line-height: 22px;\n        font-size: 14px; }\n      .y-player-controller .y-player-icons .y-player-icon.y-player-comment-icon {\n        padding: 10px 9px 9px; }\n      .y-player-controller .y-player-icons .y-player-icon.y-player-setting-icon {\n        padding-top: 8.5px; }\n      .y-player-controller .y-player-icons .y-player-icon.y-player-volume-icon {\n        width: 43px; }\n    .y-player-controller .y-player-icons .y-player-volume {\n      position: relative;\n      display: inline-block;\n      cursor: pointer;\n      height: 100%; }\n      .y-player-controller .y-player-icons .y-player-volume:hover .y-player-volume-bar-wrap .y-player-volume-bar {\n        width: 45px; }\n      .y-player-controller .y-player-icons .y-player-volume:hover .y-player-volume-bar-wrap .y-player-volume-bar .y-player-volume-bar-inner .y-player-thumb {\n        -webkit-transform: scale(1);\n                transform: scale(1); }\n      .y-player-controller .y-player-icons .y-player-volume.y-player-volume-active .y-player-volume-bar-wrap .y-player-volume-bar {\n        width: 45px; }\n      .y-player-controller .y-player-icons .y-player-volume.y-player-volume-active .y-player-volume-bar-wrap .y-player-volume-bar .y-player-volume-bar-inner .y-player-thumb {\n        -webkit-transform: scale(1);\n                transform: scale(1); }\n      .y-player-controller .y-player-icons .y-player-volume .y-player-volume-bar-wrap {\n        display: inline-block;\n        margin: 0 10px 0 -5px;\n        vertical-align: middle;\n        height: 100%; }\n        .y-player-controller .y-player-icons .y-player-volume .y-player-volume-bar-wrap .y-player-volume-bar {\n          position: relative;\n          top: 17px;\n          width: 0;\n          height: 3px;\n          background: #aaa;\n          transition: all 0.3s ease-in-out; }\n          .y-player-controller .y-player-icons .y-player-volume .y-player-volume-bar-wrap .y-player-volume-bar .y-player-volume-bar-inner {\n            position: absolute;\n            bottom: 0;\n            left: 0;\n            height: 100%;\n            transition: all 0.1s ease;\n            will-change: width; }\n            .y-player-controller .y-player-icons .y-player-volume .y-player-volume-bar-wrap .y-player-volume-bar .y-player-volume-bar-inner .y-player-thumb {\n              position: absolute;\n              top: 0;\n              right: 5px;\n              margin-top: -4px;\n              margin-right: -10px;\n              height: 11px;\n              width: 11px;\n              border-radius: 50%;\n              cursor: pointer;\n              transition: all .3s ease-in-out;\n              -webkit-transform: scale(0);\n                      transform: scale(0); }\n    .y-player-controller .y-player-icons .y-player-setting {\n      display: inline-block;\n      height: 100%; }\n      .y-player-controller .y-player-icons .y-player-setting .y-player-setting-box {\n        position: absolute;\n        right: 0;\n        bottom: 50px;\n        -webkit-transform: scale(0);\n                transform: scale(0);\n        width: 150px;\n        border-radius: 2px;\n        background: rgba(28, 28, 28, 0.9);\n        padding: 7px 0;\n        transition: all .3s ease-in-out;\n        overflow: hidden;\n        z-index: 2; }\n        .y-player-controller .y-player-icons .y-player-setting .y-player-setting-box > div {\n          display: none; }\n          .y-player-controller .y-player-icons .y-player-setting .y-player-setting-box > div.y-player-setting-origin-panel {\n            display: block; }\n        .y-player-controller .y-player-icons .y-player-setting .y-player-setting-box.y-player-setting-box-open {\n          -webkit-transform: scale(1);\n                  transform: scale(1); }\n        .y-player-controller .y-player-icons .y-player-setting .y-player-setting-box.y-player-setting-box-narrow {\n          width: 70px;\n          height: 180px;\n          text-align: center; }\n        .y-player-controller .y-player-icons .y-player-setting .y-player-setting-box.y-player-setting-box-speed .y-player-setting-origin-panel {\n          display: none; }\n        .y-player-controller .y-player-icons .y-player-setting .y-player-setting-box.y-player-setting-box-speed .y-player-setting-speed-panel {\n          display: block; }\n      .y-player-controller .y-player-icons .y-player-setting .y-player-setting-item,\n      .y-player-controller .y-player-icons .y-player-setting .y-player-setting-speed-item {\n        height: 30px;\n        padding: 5px 10px;\n        box-sizing: border-box;\n        cursor: pointer;\n        position: relative; }\n        .y-player-controller .y-player-icons .y-player-setting .y-player-setting-item:hover,\n        .y-player-controller .y-player-icons .y-player-setting .y-player-setting-speed-item:hover {\n          background-color: rgba(255, 255, 255, 0.1); }\n    .y-player-controller .y-player-icons .y-player-full {\n      display: inline-block;\n      height: 100%;\n      position: relative; }\n      .y-player-controller .y-player-icons .y-player-full:hover .y-player-full-in-icon {\n        display: block; }\n      .y-player-controller .y-player-icons .y-player-full .y-player-full-in-icon {\n        position: absolute;\n        top: -30px;\n        z-index: 1;\n        display: none; }\n    .y-player-controller .y-player-icons .y-player-quality {\n      position: relative;\n      display: inline-block;\n      height: 100%;\n      z-index: 2; }\n      .y-player-controller .y-player-icons .y-player-quality:hover .y-player-quality-list {\n        display: block; }\n      .y-player-controller .y-player-icons .y-player-quality:hover .y-player-quality-mask {\n        display: block; }\n      .y-player-controller .y-player-icons .y-player-quality .y-player-quality-mask {\n        display: none;\n        position: absolute;\n        bottom: 38px;\n        left: -18px;\n        width: 80px;\n        padding-bottom: 12px; }\n      .y-player-controller .y-player-icons .y-player-quality .y-player-quality-list {\n        display: none;\n        font-size: 12px;\n        width: 80px;\n        border-radius: 2px;\n        background: rgba(28, 28, 28, 0.9);\n        padding: 5px 0;\n        transition: all .3s ease-in-out;\n        overflow: hidden;\n        color: #fff;\n        text-align: center; }\n      .y-player-controller .y-player-icons .y-player-quality .y-player-quality-item {\n        height: 25px;\n        box-sizing: border-box;\n        cursor: pointer;\n        line-height: 25px; }\n        .y-player-controller .y-player-icons .y-player-quality .y-player-quality-item:hover {\n          background-color: rgba(255, 255, 255, 0.1); }\n    .y-player-controller .y-player-icons .y-player-label {\n      color: #eee;\n      font-size: 13px;\n      display: inline-block;\n      vertical-align: middle;\n      white-space: nowrap; }\n    .y-player-controller .y-player-icons .y-player-toggle {\n      width: 32px;\n      height: 20px;\n      text-align: center;\n      font-size: 0;\n      vertical-align: middle;\n      position: absolute;\n      top: 5px;\n      right: 10px; }\n      .y-player-controller .y-player-icons .y-player-toggle input {\n        max-height: 0;\n        max-width: 0;\n        display: none; }\n      .y-player-controller .y-player-icons .y-player-toggle input + label {\n        display: inline-block;\n        position: relative;\n        box-shadow: #dfdfdf 0 0 0 0 inset;\n        border: 1px solid #dfdfdf;\n        height: 20px;\n        width: 32px;\n        border-radius: 10px;\n        box-sizing: border-box;\n        cursor: pointer;\n        transition: .2s ease-in-out; }\n      .y-player-controller .y-player-icons .y-player-toggle input + label:before {\n        content: \"\";\n        position: absolute;\n        display: block;\n        height: 18px;\n        width: 18px;\n        top: 0;\n        left: 0;\n        border-radius: 15px;\n        transition: .2s ease-in-out; }\n      .y-player-controller .y-player-icons .y-player-toggle input + label:after {\n        content: \"\";\n        position: absolute;\n        display: block;\n        left: 0;\n        top: 0;\n        border-radius: 15px;\n        background: #fff;\n        transition: .2s ease-in-out;\n        box-shadow: 0 1px 3px rgba(0, 0, 0, 0.4);\n        height: 18px;\n        width: 18px; }\n      .y-player-controller .y-player-icons .y-player-toggle input:checked + label {\n        border-color: rgba(255, 255, 255, 0.5); }\n      .y-player-controller .y-player-icons .y-player-toggle input:checked + label:before {\n        width: 30px;\n        background: rgba(255, 255, 255, 0.5); }\n      .y-player-controller .y-player-icons .y-player-toggle input:checked + label:after {\n        left: 12px; }\n\n.y-player-logo {\n  pointer-events: none;\n  position: absolute;\n  left: 20px;\n  top: 20px;\n  max-width: 50px;\n  max-height: 50px; }\n  .y-player-logo img {\n    max-width: 100%;\n    max-height: 100%;\n    background: none; }\n\n.y-player-menu {\n  position: absolute;\n  width: 170px;\n  border-radius: 2px;\n  background: rgba(28, 28, 28, 0.85);\n  padding: 5px 0;\n  overflow: hidden;\n  z-index: 3;\n  display: none; }\n  .y-player-menu.y-player-menu-show {\n    display: block; }\n  .y-player-menu .y-player-menu-item {\n    height: 30px;\n    box-sizing: border-box;\n    cursor: pointer; }\n    .y-player-menu .y-player-menu-item:hover {\n      background-color: rgba(255, 255, 255, 0.1); }\n    .y-player-menu .y-player-menu-item a {\n      display: inline-block;\n      padding: 0 10px;\n      line-height: 30px;\n      color: #eee;\n      font-size: 13px;\n      display: inline-block;\n      vertical-align: middle;\n      width: 100%;\n      box-sizing: border-box;\n      white-space: nowrap;\n      text-overflow: ellipsis;\n      overflow: hidden; }\n      .y-player-menu .y-player-menu-item a:hover {\n        text-decoration: none; }\n\n.y-player-notice {\n  opacity: 0;\n  position: absolute;\n  bottom: 60px;\n  left: 20px;\n  font-size: 14px;\n  border-radius: 2px;\n  background: rgba(28, 28, 28, 0.9);\n  padding: 7px 20px;\n  transition: all .3s ease-in-out;\n  overflow: hidden;\n  color: #fff;\n  pointer-events: none; }\n\n.y-player-mask {\n  position: absolute;\n  top: 0;\n  bottom: 0;\n  left: 0;\n  right: 0;\n  z-index: 1;\n  display: none; }\n  .y-player-mask.y-player-mask-show {\n    display: block; }\n\n.y-player-video-wrap {\n  position: relative;\n  background: #000;\n  font-size: 0;\n  width: 100%;\n  height: 100%; }\n  .y-player-video-wrap .y-player-video {\n    width: 100%;\n    height: 100%;\n    display: none; }\n  .y-player-video-wrap .y-player-video-current {\n    display: block; }\n  .y-player-video-wrap .y-player-video-prepare {\n    display: none; }\n\n.y-player-info-panel {\n  position: absolute;\n  top: 10px;\n  left: 10px;\n  width: 400px;\n  background: rgba(28, 28, 28, 0.8);\n  padding: 10px;\n  color: #fff;\n  font-size: 12px;\n  border-radius: 2px; }\n  .y-player-info-panel-hide {\n    display: none; }\n  .y-player-info-panel .y-player-info-panel-close {\n    cursor: pointer;\n    position: absolute;\n    right: 10px;\n    top: 10px; }\n  .y-player-info-panel .y-player-info-panel-item > span {\n    display: inline-block;\n    vertical-align: middle;\n    line-height: 15px;\n    white-space: nowrap;\n    text-overflow: ellipsis;\n    overflow: hidden; }\n  .y-player-info-panel .y-player-info-panel-item-title {\n    width: 100px;\n    text-align: right;\n    margin-right: 10px; }\n  .y-player-info-panel .y-player-info-panel-item-data {\n    width: 260px; }\n", ""]);

// exports


/***/ }),

/***/ "./node_modules/css-loader/lib/css-base.js":
/*!*************************************************!*\
  !*** ./node_modules/css-loader/lib/css-base.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
module.exports = function (useSourceMap) {
	var list = [];

	// return the list of modules as css string
	list.toString = function toString() {
		return this.map(function (item) {
			var content = cssWithMappingToString(item, useSourceMap);
			if (item[2]) {
				return "@media " + item[2] + "{" + content + "}";
			} else {
				return content;
			}
		}).join("");
	};

	// import a list of modules into the list
	list.i = function (modules, mediaQuery) {
		if (typeof modules === "string") modules = [[null, modules, ""]];
		var alreadyImportedModules = {};
		for (var i = 0; i < this.length; i++) {
			var id = this[i][0];
			if (typeof id === "number") alreadyImportedModules[id] = true;
		}
		for (i = 0; i < modules.length; i++) {
			var item = modules[i];
			// skip already imported module
			// this implementation is not 100% perfect for weird media query combinations
			//  when a module is imported multiple times with different media queries.
			//  I hope this will never occur (Hey this way we have smaller bundles)
			if (typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
				if (mediaQuery && !item[2]) {
					item[2] = mediaQuery;
				} else if (mediaQuery) {
					item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
				}
				list.push(item);
			}
		}
	};
	return list;
};

function cssWithMappingToString(item, useSourceMap) {
	var content = item[1] || '';
	var cssMapping = item[3];
	if (!cssMapping) {
		return content;
	}

	if (useSourceMap && typeof btoa === 'function') {
		var sourceMapping = toComment(cssMapping);
		var sourceURLs = cssMapping.sources.map(function (source) {
			return '/*# sourceURL=' + cssMapping.sourceRoot + source + ' */';
		});

		return [content].concat(sourceURLs).concat([sourceMapping]).join('\n');
	}

	return [content].join('\n');
}

// Adapted from convert-source-map (MIT)
function toComment(sourceMap) {
	// eslint-disable-next-line no-undef
	var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));
	var data = 'sourceMappingURL=data:application/json;charset=utf-8;base64,' + base64;

	return '/*# ' + data + ' */';
}

/***/ }),

/***/ "./node_modules/detect-node/browser.js":
/*!*********************************************!*\
  !*** ./node_modules/detect-node/browser.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = false;

/***/ }),

/***/ "./node_modules/process/browser.js":
/*!*****************************************!*\
  !*** ./node_modules/process/browser.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout() {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
})();
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch (e) {
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch (e) {
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }
}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e) {
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e) {
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }
}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while (len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) {
    return [];
};

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () {
    return '/';
};
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function () {
    return 0;
};

/***/ }),

/***/ "./node_modules/promise-polyfill/src/finally.js":
/*!******************************************************!*\
  !*** ./node_modules/promise-polyfill/src/finally.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
/**
 * @this {Promise}
 */
function finallyConstructor(callback) {
  var constructor = this.constructor;
  return this.then(function (value) {
    return constructor.resolve(callback()).then(function () {
      return value;
    });
  }, function (reason) {
    return constructor.resolve(callback()).then(function () {
      return constructor.reject(reason);
    });
  });
}

exports.default = finallyConstructor;

/***/ }),

/***/ "./node_modules/promise-polyfill/src/index.js":
/*!****************************************************!*\
  !*** ./node_modules/promise-polyfill/src/index.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(setImmediate) {

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _finally = __webpack_require__(/*! ./finally */ "./node_modules/promise-polyfill/src/finally.js");

var _finally2 = _interopRequireDefault(_finally);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Store setTimeout reference so promise-polyfill will be unaffected by
// other code modifying setTimeout (like sinon.useFakeTimers())
var setTimeoutFunc = setTimeout;

function noop() {}

// Polyfill for Function.prototype.bind
function bind(fn, thisArg) {
  return function () {
    fn.apply(thisArg, arguments);
  };
}

/**
 * @constructor
 * @param {Function} fn
 */
function Promise(fn) {
  if (!(this instanceof Promise)) throw new TypeError('Promises must be constructed via new');
  if (typeof fn !== 'function') throw new TypeError('not a function');
  /** @type {!number} */
  this._state = 0;
  /** @type {!boolean} */
  this._handled = false;
  /** @type {Promise|undefined} */
  this._value = undefined;
  /** @type {!Array<!Function>} */
  this._deferreds = [];

  doResolve(fn, this);
}

function handle(self, deferred) {
  while (self._state === 3) {
    self = self._value;
  }
  if (self._state === 0) {
    self._deferreds.push(deferred);
    return;
  }
  self._handled = true;
  Promise._immediateFn(function () {
    var cb = self._state === 1 ? deferred.onFulfilled : deferred.onRejected;
    if (cb === null) {
      (self._state === 1 ? resolve : reject)(deferred.promise, self._value);
      return;
    }
    var ret;
    try {
      ret = cb(self._value);
    } catch (e) {
      reject(deferred.promise, e);
      return;
    }
    resolve(deferred.promise, ret);
  });
}

function resolve(self, newValue) {
  try {
    // Promise Resolution Procedure: https://github.com/promises-aplus/promises-spec#the-promise-resolution-procedure
    if (newValue === self) throw new TypeError('A promise cannot be resolved with itself.');
    if (newValue && ((typeof newValue === 'undefined' ? 'undefined' : _typeof(newValue)) === 'object' || typeof newValue === 'function')) {
      var then = newValue.then;
      if (newValue instanceof Promise) {
        self._state = 3;
        self._value = newValue;
        finale(self);
        return;
      } else if (typeof then === 'function') {
        doResolve(bind(then, newValue), self);
        return;
      }
    }
    self._state = 1;
    self._value = newValue;
    finale(self);
  } catch (e) {
    reject(self, e);
  }
}

function reject(self, newValue) {
  self._state = 2;
  self._value = newValue;
  finale(self);
}

function finale(self) {
  if (self._state === 2 && self._deferreds.length === 0) {
    Promise._immediateFn(function () {
      if (!self._handled) {
        Promise._unhandledRejectionFn(self._value);
      }
    });
  }

  for (var i = 0, len = self._deferreds.length; i < len; i++) {
    handle(self, self._deferreds[i]);
  }
  self._deferreds = null;
}

/**
 * @constructor
 */
function Handler(onFulfilled, onRejected, promise) {
  this.onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : null;
  this.onRejected = typeof onRejected === 'function' ? onRejected : null;
  this.promise = promise;
}

/**
 * Take a potentially misbehaving resolver function and make sure
 * onFulfilled and onRejected are only called once.
 *
 * Makes no guarantees about asynchrony.
 */
function doResolve(fn, self) {
  var done = false;
  try {
    fn(function (value) {
      if (done) return;
      done = true;
      resolve(self, value);
    }, function (reason) {
      if (done) return;
      done = true;
      reject(self, reason);
    });
  } catch (ex) {
    if (done) return;
    done = true;
    reject(self, ex);
  }
}

Promise.prototype['catch'] = function (onRejected) {
  return this.then(null, onRejected);
};

Promise.prototype.then = function (onFulfilled, onRejected) {
  // @ts-ignore
  var prom = new this.constructor(noop);

  handle(this, new Handler(onFulfilled, onRejected, prom));
  return prom;
};

Promise.prototype['finally'] = _finally2.default;

Promise.all = function (arr) {
  return new Promise(function (resolve, reject) {
    if (!arr || typeof arr.length === 'undefined') throw new TypeError('Promise.all accepts an array');
    var args = Array.prototype.slice.call(arr);
    if (args.length === 0) return resolve([]);
    var remaining = args.length;

    function res(i, val) {
      try {
        if (val && ((typeof val === 'undefined' ? 'undefined' : _typeof(val)) === 'object' || typeof val === 'function')) {
          var then = val.then;
          if (typeof then === 'function') {
            then.call(val, function (val) {
              res(i, val);
            }, reject);
            return;
          }
        }
        args[i] = val;
        if (--remaining === 0) {
          resolve(args);
        }
      } catch (ex) {
        reject(ex);
      }
    }

    for (var i = 0; i < args.length; i++) {
      res(i, args[i]);
    }
  });
};

Promise.resolve = function (value) {
  if (value && (typeof value === 'undefined' ? 'undefined' : _typeof(value)) === 'object' && value.constructor === Promise) {
    return value;
  }

  return new Promise(function (resolve) {
    resolve(value);
  });
};

Promise.reject = function (value) {
  return new Promise(function (resolve, reject) {
    reject(value);
  });
};

Promise.race = function (values) {
  return new Promise(function (resolve, reject) {
    for (var i = 0, len = values.length; i < len; i++) {
      values[i].then(resolve, reject);
    }
  });
};

// Use polyfill for setImmediate for performance gains
Promise._immediateFn = typeof setImmediate === 'function' && function (fn) {
  setImmediate(fn);
} || function (fn) {
  setTimeoutFunc(fn, 0);
};

Promise._unhandledRejectionFn = function _unhandledRejectionFn(err) {
  if (typeof console !== 'undefined' && console) {
    console.warn('Possible Unhandled Promise Rejection:', err); // eslint-disable-line no-console
  }
};

exports.default = Promise;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../timers-browserify/main.js */ "./node_modules/timers-browserify/main.js").setImmediate))

/***/ }),

/***/ "./node_modules/setimmediate/setImmediate.js":
/*!***************************************************!*\
  !*** ./node_modules/setimmediate/setImmediate.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global, process) {

(function (global, undefined) {
    "use strict";

    if (global.setImmediate) {
        return;
    }

    var nextHandle = 1; // Spec says greater than zero
    var tasksByHandle = {};
    var currentlyRunningATask = false;
    var doc = global.document;
    var registerImmediate;

    function setImmediate(callback) {
        // Callback can either be a function or a string
        if (typeof callback !== "function") {
            callback = new Function("" + callback);
        }
        // Copy function arguments
        var args = new Array(arguments.length - 1);
        for (var i = 0; i < args.length; i++) {
            args[i] = arguments[i + 1];
        }
        // Store and register the task
        var task = { callback: callback, args: args };
        tasksByHandle[nextHandle] = task;
        registerImmediate(nextHandle);
        return nextHandle++;
    }

    function clearImmediate(handle) {
        delete tasksByHandle[handle];
    }

    function run(task) {
        var callback = task.callback;
        var args = task.args;
        switch (args.length) {
            case 0:
                callback();
                break;
            case 1:
                callback(args[0]);
                break;
            case 2:
                callback(args[0], args[1]);
                break;
            case 3:
                callback(args[0], args[1], args[2]);
                break;
            default:
                callback.apply(undefined, args);
                break;
        }
    }

    function runIfPresent(handle) {
        // From the spec: "Wait until any invocations of this algorithm started before this one have completed."
        // So if we're currently running a task, we'll need to delay this invocation.
        if (currentlyRunningATask) {
            // Delay by doing a setTimeout. setImmediate was tried instead, but in Firefox 7 it generated a
            // "too much recursion" error.
            setTimeout(runIfPresent, 0, handle);
        } else {
            var task = tasksByHandle[handle];
            if (task) {
                currentlyRunningATask = true;
                try {
                    run(task);
                } finally {
                    clearImmediate(handle);
                    currentlyRunningATask = false;
                }
            }
        }
    }

    function installNextTickImplementation() {
        registerImmediate = function registerImmediate(handle) {
            process.nextTick(function () {
                runIfPresent(handle);
            });
        };
    }

    function canUsePostMessage() {
        // The test against `importScripts` prevents this implementation from being installed inside a web worker,
        // where `global.postMessage` means something completely different and can't be used for this purpose.
        if (global.postMessage && !global.importScripts) {
            var postMessageIsAsynchronous = true;
            var oldOnMessage = global.onmessage;
            global.onmessage = function () {
                postMessageIsAsynchronous = false;
            };
            global.postMessage("", "*");
            global.onmessage = oldOnMessage;
            return postMessageIsAsynchronous;
        }
    }

    function installPostMessageImplementation() {
        // Installs an event handler on `global` for the `message` event: see
        // * https://developer.mozilla.org/en/DOM/window.postMessage
        // * http://www.whatwg.org/specs/web-apps/current-work/multipage/comms.html#crossDocumentMessages

        var messagePrefix = "setImmediate$" + Math.random() + "$";
        var onGlobalMessage = function onGlobalMessage(event) {
            if (event.source === global && typeof event.data === "string" && event.data.indexOf(messagePrefix) === 0) {
                runIfPresent(+event.data.slice(messagePrefix.length));
            }
        };

        if (global.addEventListener) {
            global.addEventListener("message", onGlobalMessage, false);
        } else {
            global.attachEvent("onmessage", onGlobalMessage);
        }

        registerImmediate = function registerImmediate(handle) {
            global.postMessage(messagePrefix + handle, "*");
        };
    }

    function installMessageChannelImplementation() {
        var channel = new MessageChannel();
        channel.port1.onmessage = function (event) {
            var handle = event.data;
            runIfPresent(handle);
        };

        registerImmediate = function registerImmediate(handle) {
            channel.port2.postMessage(handle);
        };
    }

    function installReadyStateChangeImplementation() {
        var html = doc.documentElement;
        registerImmediate = function registerImmediate(handle) {
            // Create a <script> element; its readystatechange event will be fired asynchronously once it is inserted
            // into the document. Do so, thus queuing up the task. Remember to clean up once it's been called.
            var script = doc.createElement("script");
            script.onreadystatechange = function () {
                runIfPresent(handle);
                script.onreadystatechange = null;
                html.removeChild(script);
                script = null;
            };
            html.appendChild(script);
        };
    }

    function installSetTimeoutImplementation() {
        registerImmediate = function registerImmediate(handle) {
            setTimeout(runIfPresent, 0, handle);
        };
    }

    // If supported, we should attach to the prototype of global, since that is where setTimeout et al. live.
    var attachTo = Object.getPrototypeOf && Object.getPrototypeOf(global);
    attachTo = attachTo && attachTo.setTimeout ? attachTo : global;

    // Don't get fooled by e.g. browserify environments.
    if ({}.toString.call(global.process) === "[object process]") {
        // For Node.js before 0.9
        installNextTickImplementation();
    } else if (canUsePostMessage()) {
        // For non-IE10 modern browsers
        installPostMessageImplementation();
    } else if (global.MessageChannel) {
        // For web workers, where supported
        installMessageChannelImplementation();
    } else if (doc && "onreadystatechange" in doc.createElement("script")) {
        // For IE 6–8
        installReadyStateChangeImplementation();
    } else {
        // For older browsers
        installSetTimeoutImplementation();
    }

    attachTo.setImmediate = setImmediate;
    attachTo.clearImmediate = clearImmediate;
})(typeof self === "undefined" ? typeof global === "undefined" ? undefined : global : self);
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../webpack/buildin/global.js */ "./node_modules/webpack/buildin/global.js"), __webpack_require__(/*! ./../process/browser.js */ "./node_modules/process/browser.js")))

/***/ }),

/***/ "./node_modules/style-loader/lib/addStyles.js":
/*!****************************************************!*\
  !*** ./node_modules/style-loader/lib/addStyles.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/

var stylesInDom = {};

var	memoize = function (fn) {
	var memo;

	return function () {
		if (typeof memo === "undefined") memo = fn.apply(this, arguments);
		return memo;
	};
};

var isOldIE = memoize(function () {
	// Test for IE <= 9 as proposed by Browserhacks
	// @see http://browserhacks.com/#hack-e71d8692f65334173fee715c222cb805
	// Tests for existence of standard globals is to allow style-loader
	// to operate correctly into non-standard environments
	// @see https://github.com/webpack-contrib/style-loader/issues/177
	return window && document && document.all && !window.atob;
});

var getTarget = function (target, parent) {
  if (parent){
    return parent.querySelector(target);
  }
  return document.querySelector(target);
};

var getElement = (function (fn) {
	var memo = {};

	return function(target, parent) {
                // If passing function in options, then use it for resolve "head" element.
                // Useful for Shadow Root style i.e
                // {
                //   insertInto: function () { return document.querySelector("#foo").shadowRoot }
                // }
                if (typeof target === 'function') {
                        return target();
                }
                if (typeof memo[target] === "undefined") {
			var styleTarget = getTarget.call(this, target, parent);
			// Special case to return head of iframe instead of iframe itself
			if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
				try {
					// This will throw an exception if access to iframe is blocked
					// due to cross-origin restrictions
					styleTarget = styleTarget.contentDocument.head;
				} catch(e) {
					styleTarget = null;
				}
			}
			memo[target] = styleTarget;
		}
		return memo[target]
	};
})();

var singleton = null;
var	singletonCounter = 0;
var	stylesInsertedAtTop = [];

var	fixUrls = __webpack_require__(/*! ./urls */ "./node_modules/style-loader/lib/urls.js");

module.exports = function(list, options) {
	if (typeof DEBUG !== "undefined" && DEBUG) {
		if (typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
	}

	options = options || {};

	options.attrs = typeof options.attrs === "object" ? options.attrs : {};

	// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
	// tags it will allow on a page
	if (!options.singleton && typeof options.singleton !== "boolean") options.singleton = isOldIE();

	// By default, add <style> tags to the <head> element
        if (!options.insertInto) options.insertInto = "head";

	// By default, add <style> tags to the bottom of the target
	if (!options.insertAt) options.insertAt = "bottom";

	var styles = listToStyles(list, options);

	addStylesToDom(styles, options);

	return function update (newList) {
		var mayRemove = [];

		for (var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];

			domStyle.refs--;
			mayRemove.push(domStyle);
		}

		if(newList) {
			var newStyles = listToStyles(newList, options);
			addStylesToDom(newStyles, options);
		}

		for (var i = 0; i < mayRemove.length; i++) {
			var domStyle = mayRemove[i];

			if(domStyle.refs === 0) {
				for (var j = 0; j < domStyle.parts.length; j++) domStyle.parts[j]();

				delete stylesInDom[domStyle.id];
			}
		}
	};
};

function addStylesToDom (styles, options) {
	for (var i = 0; i < styles.length; i++) {
		var item = styles[i];
		var domStyle = stylesInDom[item.id];

		if(domStyle) {
			domStyle.refs++;

			for(var j = 0; j < domStyle.parts.length; j++) {
				domStyle.parts[j](item.parts[j]);
			}

			for(; j < item.parts.length; j++) {
				domStyle.parts.push(addStyle(item.parts[j], options));
			}
		} else {
			var parts = [];

			for(var j = 0; j < item.parts.length; j++) {
				parts.push(addStyle(item.parts[j], options));
			}

			stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
		}
	}
}

function listToStyles (list, options) {
	var styles = [];
	var newStyles = {};

	for (var i = 0; i < list.length; i++) {
		var item = list[i];
		var id = options.base ? item[0] + options.base : item[0];
		var css = item[1];
		var media = item[2];
		var sourceMap = item[3];
		var part = {css: css, media: media, sourceMap: sourceMap};

		if(!newStyles[id]) styles.push(newStyles[id] = {id: id, parts: [part]});
		else newStyles[id].parts.push(part);
	}

	return styles;
}

function insertStyleElement (options, style) {
	var target = getElement(options.insertInto)

	if (!target) {
		throw new Error("Couldn't find a style target. This probably means that the value for the 'insertInto' parameter is invalid.");
	}

	var lastStyleElementInsertedAtTop = stylesInsertedAtTop[stylesInsertedAtTop.length - 1];

	if (options.insertAt === "top") {
		if (!lastStyleElementInsertedAtTop) {
			target.insertBefore(style, target.firstChild);
		} else if (lastStyleElementInsertedAtTop.nextSibling) {
			target.insertBefore(style, lastStyleElementInsertedAtTop.nextSibling);
		} else {
			target.appendChild(style);
		}
		stylesInsertedAtTop.push(style);
	} else if (options.insertAt === "bottom") {
		target.appendChild(style);
	} else if (typeof options.insertAt === "object" && options.insertAt.before) {
		var nextSibling = getElement(options.insertAt.before, target);
		target.insertBefore(style, nextSibling);
	} else {
		throw new Error("[Style Loader]\n\n Invalid value for parameter 'insertAt' ('options.insertAt') found.\n Must be 'top', 'bottom', or Object.\n (https://github.com/webpack-contrib/style-loader#insertat)\n");
	}
}

function removeStyleElement (style) {
	if (style.parentNode === null) return false;
	style.parentNode.removeChild(style);

	var idx = stylesInsertedAtTop.indexOf(style);
	if(idx >= 0) {
		stylesInsertedAtTop.splice(idx, 1);
	}
}

function createStyleElement (options) {
	var style = document.createElement("style");

	if(options.attrs.type === undefined) {
		options.attrs.type = "text/css";
	}

	if(options.attrs.nonce === undefined) {
		var nonce = getNonce();
		if (nonce) {
			options.attrs.nonce = nonce;
		}
	}

	addAttrs(style, options.attrs);
	insertStyleElement(options, style);

	return style;
}

function createLinkElement (options) {
	var link = document.createElement("link");

	if(options.attrs.type === undefined) {
		options.attrs.type = "text/css";
	}
	options.attrs.rel = "stylesheet";

	addAttrs(link, options.attrs);
	insertStyleElement(options, link);

	return link;
}

function addAttrs (el, attrs) {
	Object.keys(attrs).forEach(function (key) {
		el.setAttribute(key, attrs[key]);
	});
}

function getNonce() {
	if (false) {}

	return __webpack_require__.nc;
}

function addStyle (obj, options) {
	var style, update, remove, result;

	// If a transform function was defined, run it on the css
	if (options.transform && obj.css) {
	    result = options.transform(obj.css);

	    if (result) {
	    	// If transform returns a value, use that instead of the original css.
	    	// This allows running runtime transformations on the css.
	    	obj.css = result;
	    } else {
	    	// If the transform function returns a falsy value, don't add this css.
	    	// This allows conditional loading of css
	    	return function() {
	    		// noop
	    	};
	    }
	}

	if (options.singleton) {
		var styleIndex = singletonCounter++;

		style = singleton || (singleton = createStyleElement(options));

		update = applyToSingletonTag.bind(null, style, styleIndex, false);
		remove = applyToSingletonTag.bind(null, style, styleIndex, true);

	} else if (
		obj.sourceMap &&
		typeof URL === "function" &&
		typeof URL.createObjectURL === "function" &&
		typeof URL.revokeObjectURL === "function" &&
		typeof Blob === "function" &&
		typeof btoa === "function"
	) {
		style = createLinkElement(options);
		update = updateLink.bind(null, style, options);
		remove = function () {
			removeStyleElement(style);

			if(style.href) URL.revokeObjectURL(style.href);
		};
	} else {
		style = createStyleElement(options);
		update = applyToTag.bind(null, style);
		remove = function () {
			removeStyleElement(style);
		};
	}

	update(obj);

	return function updateStyle (newObj) {
		if (newObj) {
			if (
				newObj.css === obj.css &&
				newObj.media === obj.media &&
				newObj.sourceMap === obj.sourceMap
			) {
				return;
			}

			update(obj = newObj);
		} else {
			remove();
		}
	};
}

var replaceText = (function () {
	var textStore = [];

	return function (index, replacement) {
		textStore[index] = replacement;

		return textStore.filter(Boolean).join('\n');
	};
})();

function applyToSingletonTag (style, index, remove, obj) {
	var css = remove ? "" : obj.css;

	if (style.styleSheet) {
		style.styleSheet.cssText = replaceText(index, css);
	} else {
		var cssNode = document.createTextNode(css);
		var childNodes = style.childNodes;

		if (childNodes[index]) style.removeChild(childNodes[index]);

		if (childNodes.length) {
			style.insertBefore(cssNode, childNodes[index]);
		} else {
			style.appendChild(cssNode);
		}
	}
}

function applyToTag (style, obj) {
	var css = obj.css;
	var media = obj.media;

	if(media) {
		style.setAttribute("media", media)
	}

	if(style.styleSheet) {
		style.styleSheet.cssText = css;
	} else {
		while(style.firstChild) {
			style.removeChild(style.firstChild);
		}

		style.appendChild(document.createTextNode(css));
	}
}

function updateLink (link, options, obj) {
	var css = obj.css;
	var sourceMap = obj.sourceMap;

	/*
		If convertToAbsoluteUrls isn't defined, but sourcemaps are enabled
		and there is no publicPath defined then lets turn convertToAbsoluteUrls
		on by default.  Otherwise default to the convertToAbsoluteUrls option
		directly
	*/
	var autoFixUrls = options.convertToAbsoluteUrls === undefined && sourceMap;

	if (options.convertToAbsoluteUrls || autoFixUrls) {
		css = fixUrls(css);
	}

	if (sourceMap) {
		// http://stackoverflow.com/a/26603875
		css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
	}

	var blob = new Blob([css], { type: "text/css" });

	var oldSrc = link.href;

	link.href = URL.createObjectURL(blob);

	if(oldSrc) URL.revokeObjectURL(oldSrc);
}


/***/ }),

/***/ "./node_modules/style-loader/lib/urls.js":
/*!***********************************************!*\
  !*** ./node_modules/style-loader/lib/urls.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * When source maps are enabled, `style-loader` uses a link element with a data-uri to
 * embed the css on the page. This breaks all relative urls because now they are relative to a
 * bundle instead of the current page.
 *
 * One solution is to only use full urls, but that may be impossible.
 *
 * Instead, this function "fixes" the relative urls to be absolute according to the current page location.
 *
 * A rudimentary test suite is located at `test/fixUrls.js` and can be run via the `npm test` command.
 *
 */

module.exports = function (css) {
	// get current location
	var location = typeof window !== "undefined" && window.location;

	if (!location) {
		throw new Error("fixUrls requires window.location");
	}

	// blank or null?
	if (!css || typeof css !== "string") {
		return css;
	}

	var baseUrl = location.protocol + "//" + location.host;
	var currentDir = baseUrl + location.pathname.replace(/\/[^\/]*$/, "/");

	// convert each url(...)
	/*
 This regular expression is just a way to recursively match brackets within
 a string.
 	 /url\s*\(  = Match on the word "url" with any whitespace after it and then a parens
    (  = Start a capturing group
      (?:  = Start a non-capturing group
          [^)(]  = Match anything that isn't a parentheses
          |  = OR
          \(  = Match a start parentheses
              (?:  = Start another non-capturing groups
                  [^)(]+  = Match anything that isn't a parentheses
                  |  = OR
                  \(  = Match a start parentheses
                      [^)(]*  = Match anything that isn't a parentheses
                  \)  = Match a end parentheses
              )  = End Group
              *\) = Match anything and then a close parens
          )  = Close non-capturing group
          *  = Match anything
       )  = Close capturing group
  \)  = Match a close parens
 	 /gi  = Get all matches, not the first.  Be case insensitive.
  */
	var fixedCss = css.replace(/url\s*\(((?:[^)(]|\((?:[^)(]+|\([^)(]*\))*\))*)\)/gi, function (fullMatch, origUrl) {
		// strip quotes (if they exist)
		var unquotedOrigUrl = origUrl.trim().replace(/^"(.*)"$/, function (o, $1) {
			return $1;
		}).replace(/^'(.*)'$/, function (o, $1) {
			return $1;
		});

		// already a full url? no change
		if (/^(#|data:|http:\/\/|https:\/\/|file:\/\/\/|\s*$)/i.test(unquotedOrigUrl)) {
			return fullMatch;
		}

		// convert the url to a full url
		var newUrl;

		if (unquotedOrigUrl.indexOf("//") === 0) {
			//TODO: should we add protocol?
			newUrl = unquotedOrigUrl;
		} else if (unquotedOrigUrl.indexOf("/") === 0) {
			// path should be relative to the base url
			newUrl = baseUrl + unquotedOrigUrl; // already starts with '/'
		} else {
			// path should be relative to current directory
			newUrl = currentDir + unquotedOrigUrl.replace(/^\.\//, ""); // Strip leading './'
		}

		// send back the fixed url(...)
		return "url(" + JSON.stringify(newUrl) + ")";
	});

	// send back the fixed css
	return fixedCss;
};

/***/ }),

/***/ "./node_modules/timers-browserify/main.js":
/*!************************************************!*\
  !*** ./node_modules/timers-browserify/main.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {

var scope = typeof global !== "undefined" && global || typeof self !== "undefined" && self || window;
var apply = Function.prototype.apply;

// DOM APIs, for completeness

exports.setTimeout = function () {
  return new Timeout(apply.call(setTimeout, scope, arguments), clearTimeout);
};
exports.setInterval = function () {
  return new Timeout(apply.call(setInterval, scope, arguments), clearInterval);
};
exports.clearTimeout = exports.clearInterval = function (timeout) {
  if (timeout) {
    timeout.close();
  }
};

function Timeout(id, clearFn) {
  this._id = id;
  this._clearFn = clearFn;
}
Timeout.prototype.unref = Timeout.prototype.ref = function () {};
Timeout.prototype.close = function () {
  this._clearFn.call(scope, this._id);
};

// Does not start the time, just sets up the members needed.
exports.enroll = function (item, msecs) {
  clearTimeout(item._idleTimeoutId);
  item._idleTimeout = msecs;
};

exports.unenroll = function (item) {
  clearTimeout(item._idleTimeoutId);
  item._idleTimeout = -1;
};

exports._unrefActive = exports.active = function (item) {
  clearTimeout(item._idleTimeoutId);

  var msecs = item._idleTimeout;
  if (msecs >= 0) {
    item._idleTimeoutId = setTimeout(function onTimeout() {
      if (item._onTimeout) item._onTimeout();
    }, msecs);
  }
};

// setimmediate attaches itself to the global object
__webpack_require__(/*! setimmediate */ "./node_modules/setimmediate/setImmediate.js");
// On some exotic environments, it's not clear which object `setimmediate` was
// able to install onto.  Search each possibility in the same order as the
// `setimmediate` library.
exports.setImmediate = typeof self !== "undefined" && self.setImmediate || typeof global !== "undefined" && global.setImmediate || undefined && undefined.setImmediate;
exports.clearImmediate = typeof self !== "undefined" && self.clearImmediate || typeof global !== "undefined" && global.clearImmediate || undefined && undefined.clearImmediate;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../webpack/buildin/global.js */ "./node_modules/webpack/buildin/global.js")))

/***/ }),

/***/ "./node_modules/webpack/buildin/global.js":
/*!***********************************!*\
  !*** (webpack)/buildin/global.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var g;

// This works in non-strict mode
g = function () {
	return this;
}();

try {
	// This works if eval is allowed (see CSP)
	g = g || Function("return this")() || (1, eval)("this");
} catch (e) {
	// This works if the window reference is available
	if ((typeof window === "undefined" ? "undefined" : _typeof(window)) === "object") g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;

/***/ }),

/***/ "./src/icons/full-web.svg":
/*!********************************!*\
  !*** ./src/icons/full-web.svg ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<svg xmlns=\"http://www.w3.org/2000/svg\" version=\"1.1\" viewBox=\"0 0 32 33\"><path d=\"M24.965 24.38h-18.132c-1.366 0-2.478-1.113-2.478-2.478v-11.806c0-1.364 1.111-2.478 2.478-2.478h18.132c1.366 0 2.478 1.113 2.478 2.478v11.806c0 1.364-1.11 2.478-2.478 2.478zM6.833 10.097v11.806h18.134l-0.002-11.806h-18.132zM2.478 28.928h5.952c0.684 0 1.238-0.554 1.238-1.239 0-0.684-0.554-1.238-1.238-1.238h-5.952v-5.802c0-0.684-0.554-1.239-1.238-1.239s-1.239 0.556-1.239 1.239v5.802c0 1.365 1.111 2.478 2.478 2.478zM30.761 19.412c-0.684 0-1.238 0.554-1.238 1.238v5.801h-5.951c-0.686 0-1.239 0.554-1.239 1.238 0 0.686 0.554 1.239 1.239 1.239h5.951c1.366 0 2.478-1.111 2.478-2.478v-5.801c0-0.683-0.554-1.238-1.239-1.238zM0 5.55v5.802c0 0.683 0.554 1.238 1.238 1.238s1.238-0.555 1.238-1.238v-5.802h5.952c0.684 0 1.238-0.554 1.238-1.238s-0.554-1.238-1.238-1.238h-5.951c-1.366-0.001-2.478 1.111-2.478 2.476zM32 11.35v-5.801c0-1.365-1.11-2.478-2.478-2.478h-5.951c-0.686 0-1.239 0.554-1.239 1.238s0.554 1.238 1.239 1.238h5.951v5.801c0 0.683 0.554 1.237 1.238 1.237 0.686 0.002 1.239-0.553 1.239-1.236z\"></path></svg>"

/***/ }),

/***/ "./src/icons/full.svg":
/*!****************************!*\
  !*** ./src/icons/full.svg ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<svg xmlns=\"http://www.w3.org/2000/svg\" version=\"1.1\" viewBox=\"0 0 32 33\"><path d=\"M6.667 28h-5.333c-0.8 0-1.333-0.533-1.333-1.333v-5.333c0-0.8 0.533-1.333 1.333-1.333s1.333 0.533 1.333 1.333v4h4c0.8 0 1.333 0.533 1.333 1.333s-0.533 1.333-1.333 1.333zM30.667 28h-5.333c-0.8 0-1.333-0.533-1.333-1.333s0.533-1.333 1.333-1.333h4v-4c0-0.8 0.533-1.333 1.333-1.333s1.333 0.533 1.333 1.333v5.333c0 0.8-0.533 1.333-1.333 1.333zM30.667 12c-0.8 0-1.333-0.533-1.333-1.333v-4h-4c-0.8 0-1.333-0.533-1.333-1.333s0.533-1.333 1.333-1.333h5.333c0.8 0 1.333 0.533 1.333 1.333v5.333c0 0.8-0.533 1.333-1.333 1.333zM1.333 12c-0.8 0-1.333-0.533-1.333-1.333v-5.333c0-0.8 0.533-1.333 1.333-1.333h5.333c0.8 0 1.333 0.533 1.333 1.333s-0.533 1.333-1.333 1.333h-4v4c0 0.8-0.533 1.333-1.333 1.333z\"></path></svg>"

/***/ }),

/***/ "./src/icons/loading.svg":
/*!*******************************!*\
  !*** ./src/icons/loading.svg ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<svg version=\"1.1\" viewBox=\"0 0 22 22\"><svg x=\"7\" y=\"1\"><circle class=\"diplayer-loading-dot diplayer-loading-dot-0\" cx=\"4\" cy=\"4\" r=\"2\"></circle></svg><svg x=\"11\" y=\"3\"><circle class=\"diplayer-loading-dot diplayer-loading-dot-1\" cx=\"4\" cy=\"4\" r=\"2\"></circle></svg><svg x=\"13\" y=\"7\"><circle class=\"diplayer-loading-dot diplayer-loading-dot-2\" cx=\"4\" cy=\"4\" r=\"2\"></circle></svg><svg x=\"11\" y=\"11\"><circle class=\"diplayer-loading-dot diplayer-loading-dot-3\" cx=\"4\" cy=\"4\" r=\"2\"></circle></svg><svg x=\"7\" y=\"13\"><circle class=\"diplayer-loading-dot diplayer-loading-dot-4\" cx=\"4\" cy=\"4\" r=\"2\"></circle></svg><svg x=\"3\" y=\"11\"><circle class=\"diplayer-loading-dot diplayer-loading-dot-5\" cx=\"4\" cy=\"4\" r=\"2\"></circle></svg><svg x=\"1\" y=\"7\"><circle class=\"diplayer-loading-dot diplayer-loading-dot-6\" cx=\"4\" cy=\"4\" r=\"2\"></circle></svg><svg x=\"3\" y=\"3\"><circle class=\"diplayer-loading-dot diplayer-loading-dot-7\" cx=\"4\" cy=\"4\" r=\"2\"></circle></svg></svg>"

/***/ }),

/***/ "./src/icons/pause.svg":
/*!*****************************!*\
  !*** ./src/icons/pause.svg ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<svg xmlns=\"http://www.w3.org/2000/svg\" version=\"1.1\" viewBox=\"0 0 17 32\"><path d=\"M14.080 4.8q2.88 0 2.88 2.048v18.24q0 2.112-2.88 2.112t-2.88-2.112v-18.24q0-2.048 2.88-2.048zM2.88 4.8q2.88 0 2.88 2.048v18.24q0 2.112-2.88 2.112t-2.88-2.112v-18.24q0-2.048 2.88-2.048z\"></path></svg>"

/***/ }),

/***/ "./src/icons/play.svg":
/*!****************************!*\
  !*** ./src/icons/play.svg ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<svg xmlns=\"http://www.w3.org/2000/svg\" version=\"1.1\" viewBox=\"0 0 16 32\"><path d=\"M15.552 15.168q0.448 0.32 0.448 0.832 0 0.448-0.448 0.768l-13.696 8.512q-0.768 0.512-1.312 0.192t-0.544-1.28v-16.448q0-0.96 0.544-1.28t1.312 0.192z\"></path></svg>"

/***/ }),

/***/ "./src/icons/right.svg":
/*!*****************************!*\
  !*** ./src/icons/right.svg ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<svg xmlns=\"http://www.w3.org/2000/svg\" version=\"1.1\" viewBox=\"0 0 32 32\"><path d=\"M22 16l-10.105-10.6-1.895 1.987 8.211 8.613-8.211 8.612 1.895 1.988 8.211-8.613z\"></path></svg>"

/***/ }),

/***/ "./src/icons/setting.svg":
/*!*******************************!*\
  !*** ./src/icons/setting.svg ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<svg xmlns=\"http://www.w3.org/2000/svg\" version=\"1.1\" viewBox=\"0 0 32 28\"><path d=\"M28.633 17.104c0.035 0.21 0.026 0.463-0.026 0.76s-0.14 0.598-0.262 0.904c-0.122 0.306-0.271 0.581-0.445 0.825s-0.367 0.419-0.576 0.524c-0.209 0.105-0.393 0.157-0.55 0.157s-0.332-0.035-0.524-0.105c-0.175-0.052-0.393-0.1-0.655-0.144s-0.528-0.052-0.799-0.026c-0.271 0.026-0.541 0.083-0.812 0.17s-0.502 0.236-0.694 0.445c-0.419 0.437-0.664 0.934-0.734 1.493s0.009 1.092 0.236 1.598c0.175 0.349 0.148 0.699-0.079 1.048-0.105 0.14-0.271 0.284-0.498 0.432s-0.476 0.284-0.747 0.406-0.555 0.218-0.851 0.288c-0.297 0.070-0.559 0.105-0.786 0.105-0.157 0-0.306-0.061-0.445-0.183s-0.236-0.253-0.288-0.393h-0.026c-0.192-0.541-0.52-1.009-0.982-1.402s-1-0.589-1.611-0.589c-0.594 0-1.131 0.197-1.611 0.589s-0.816 0.851-1.009 1.375c-0.087 0.21-0.218 0.362-0.393 0.458s-0.367 0.144-0.576 0.144c-0.244 0-0.52-0.044-0.825-0.131s-0.611-0.197-0.917-0.327c-0.306-0.131-0.581-0.284-0.825-0.458s-0.428-0.349-0.55-0.524c-0.087-0.122-0.135-0.266-0.144-0.432s0.057-0.397 0.197-0.694c0.192-0.402 0.266-0.86 0.223-1.375s-0.266-0.991-0.668-1.428c-0.244-0.262-0.541-0.432-0.891-0.511s-0.681-0.109-0.995-0.092c-0.367 0.017-0.742 0.087-1.127 0.21-0.244 0.070-0.489 0.052-0.734-0.052-0.192-0.070-0.371-0.231-0.537-0.485s-0.314-0.533-0.445-0.838c-0.131-0.306-0.231-0.62-0.301-0.943s-0.087-0.59-0.052-0.799c0.052-0.384 0.227-0.629 0.524-0.734 0.524-0.21 0.995-0.555 1.415-1.035s0.629-1.017 0.629-1.611c0-0.611-0.21-1.144-0.629-1.598s-0.891-0.786-1.415-0.996c-0.157-0.052-0.288-0.179-0.393-0.38s-0.157-0.406-0.157-0.616c0-0.227 0.035-0.48 0.105-0.76s0.162-0.55 0.275-0.812 0.244-0.502 0.393-0.72c0.148-0.218 0.31-0.38 0.485-0.485 0.14-0.087 0.275-0.122 0.406-0.105s0.275 0.052 0.432 0.105c0.524 0.21 1.070 0.275 1.637 0.197s1.070-0.327 1.506-0.747c0.21-0.209 0.362-0.467 0.458-0.773s0.157-0.607 0.183-0.904c0.026-0.297 0.026-0.568 0-0.812s-0.048-0.419-0.065-0.524c-0.035-0.105-0.066-0.227-0.092-0.367s-0.013-0.262 0.039-0.367c0.105-0.244 0.293-0.458 0.563-0.642s0.563-0.336 0.878-0.458c0.314-0.122 0.62-0.214 0.917-0.275s0.533-0.092 0.707-0.092c0.227 0 0.406 0.074 0.537 0.223s0.223 0.301 0.275 0.458c0.192 0.471 0.507 0.886 0.943 1.244s0.952 0.537 1.546 0.537c0.611 0 1.153-0.17 1.624-0.511s0.803-0.773 0.996-1.297c0.070-0.14 0.179-0.284 0.327-0.432s0.301-0.223 0.458-0.223c0.244 0 0.511 0.035 0.799 0.105s0.572 0.166 0.851 0.288c0.279 0.122 0.537 0.279 0.773 0.472s0.423 0.402 0.563 0.629c0.087 0.14 0.113 0.293 0.079 0.458s-0.070 0.284-0.105 0.354c-0.227 0.506-0.297 1.039-0.21 1.598s0.341 1.048 0.76 1.467c0.419 0.419 0.934 0.651 1.546 0.694s1.179-0.057 1.703-0.301c0.14-0.087 0.31-0.122 0.511-0.105s0.371 0.096 0.511 0.236c0.262 0.244 0.493 0.616 0.694 1.113s0.336 1 0.406 1.506c0.035 0.297-0.013 0.528-0.144 0.694s-0.266 0.275-0.406 0.327c-0.542 0.192-1.004 0.528-1.388 1.009s-0.576 1.026-0.576 1.637c0 0.594 0.162 1.113 0.485 1.559s0.747 0.764 1.27 0.956c0.122 0.070 0.227 0.14 0.314 0.21 0.192 0.157 0.323 0.358 0.393 0.602v0zM16.451 19.462c0.786 0 1.528-0.149 2.227-0.445s1.305-0.707 1.821-1.231c0.515-0.524 0.921-1.131 1.218-1.821s0.445-1.428 0.445-2.214c0-0.786-0.148-1.524-0.445-2.214s-0.703-1.292-1.218-1.808c-0.515-0.515-1.122-0.921-1.821-1.218s-1.441-0.445-2.227-0.445c-0.786 0-1.524 0.148-2.214 0.445s-1.292 0.703-1.808 1.218c-0.515 0.515-0.921 1.118-1.218 1.808s-0.445 1.428-0.445 2.214c0 0.786 0.149 1.524 0.445 2.214s0.703 1.297 1.218 1.821c0.515 0.524 1.118 0.934 1.808 1.231s1.428 0.445 2.214 0.445v0z\"></path></svg>"

/***/ }),

/***/ "./src/icons/volume-down.svg":
/*!***********************************!*\
  !*** ./src/icons/volume-down.svg ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<svg xmlns=\"http://www.w3.org/2000/svg\" version=\"1.1\" viewBox=\"0 0 21 32\"><path d=\"M13.728 6.272v19.456q0 0.448-0.352 0.8t-0.8 0.32-0.8-0.32l-5.952-5.952h-4.672q-0.48 0-0.8-0.352t-0.352-0.8v-6.848q0-0.48 0.352-0.8t0.8-0.352h4.672l5.952-5.952q0.32-0.32 0.8-0.32t0.8 0.32 0.352 0.8zM20.576 16q0 1.344-0.768 2.528t-2.016 1.664q-0.16 0.096-0.448 0.096-0.448 0-0.8-0.32t-0.32-0.832q0-0.384 0.192-0.64t0.544-0.448 0.608-0.384 0.512-0.64 0.192-1.024-0.192-1.024-0.512-0.64-0.608-0.384-0.544-0.448-0.192-0.64q0-0.48 0.32-0.832t0.8-0.32q0.288 0 0.448 0.096 1.248 0.48 2.016 1.664t0.768 2.528z\"></path></svg>"

/***/ }),

/***/ "./src/icons/volume-off.svg":
/*!**********************************!*\
  !*** ./src/icons/volume-off.svg ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<svg xmlns=\"http://www.w3.org/2000/svg\" version=\"1.1\" viewBox=\"0 0 21 32\"><path d=\"M13.728 6.272v19.456q0 0.448-0.352 0.8t-0.8 0.32-0.8-0.32l-5.952-5.952h-4.672q-0.48 0-0.8-0.352t-0.352-0.8v-6.848q0-0.48 0.352-0.8t0.8-0.352h4.672l5.952-5.952q0.32-0.32 0.8-0.32t0.8 0.32 0.352 0.8z\"></path></svg>"

/***/ }),

/***/ "./src/icons/volume-up.svg":
/*!*********************************!*\
  !*** ./src/icons/volume-up.svg ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<svg xmlns=\"http://www.w3.org/2000/svg\" version=\"1.1\" viewBox=\"0 0 21 32\"><path d=\"M13.728 6.272v19.456q0 0.448-0.352 0.8t-0.8 0.32-0.8-0.32l-5.952-5.952h-4.672q-0.48 0-0.8-0.352t-0.352-0.8v-6.848q0-0.48 0.352-0.8t0.8-0.352h4.672l5.952-5.952q0.32-0.32 0.8-0.32t0.8 0.32 0.352 0.8zM20.576 16q0 1.344-0.768 2.528t-2.016 1.664q-0.16 0.096-0.448 0.096-0.448 0-0.8-0.32t-0.32-0.832q0-0.384 0.192-0.64t0.544-0.448 0.608-0.384 0.512-0.64 0.192-1.024-0.192-1.024-0.512-0.64-0.608-0.384-0.544-0.448-0.192-0.64q0-0.48 0.32-0.832t0.8-0.32q0.288 0 0.448 0.096 1.248 0.48 2.016 1.664t0.768 2.528zM25.152 16q0 2.72-1.536 5.056t-4 3.36q-0.256 0.096-0.448 0.096-0.48 0-0.832-0.352t-0.32-0.8q0-0.704 0.672-1.056 1.024-0.512 1.376-0.8 1.312-0.96 2.048-2.4t0.736-3.104-0.736-3.104-2.048-2.4q-0.352-0.288-1.376-0.8-0.672-0.352-0.672-1.056 0-0.448 0.32-0.8t0.8-0.352q0.224 0 0.48 0.096 2.496 1.056 4 3.36t1.536 5.056z\"></path></svg>"

/***/ }),

/***/ "./src/js/bar.js":
/*!***********************!*\
  !*** ./src/js/bar.js ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Bar = function () {
    function Bar(template) {
        _classCallCheck(this, Bar);

        this.elements = {};
        this.elements.volume = template.volumeBar;
        this.elements.played = template.playedBar;
        this.elements.loaded = template.loadedBar;
    }

    /**
     * Update progress
     * @param {String} type - Point out which bar it is
     * @param {Number} percentage
     * @param {String} direction - Point out the direction of this bar, should be height or width
     */


    _createClass(Bar, [{
        key: 'set',
        value: function set(type, percentage, direction) {
            percentage = Math.max(percentage, 0);
            percentage = Math.min(percentage, 1);
            this.elements[type].style[direction] = percentage * 100 + '%';
        }
    }, {
        key: 'get',
        value: function get(type) {
            return parseFloat(this.elements[type].style.width) / 100;
        }
    }]);

    return Bar;
}();

exports.default = Bar;

/***/ }),

/***/ "./src/js/bezel.js":
/*!*************************!*\
  !*** ./src/js/bezel.js ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Bezel = function () {
    function Bezel(container) {
        var _this = this;

        _classCallCheck(this, Bezel);

        this.container = container;

        this.container.addEventListener('animationend', function () {
            _this.container.classList.remove('y-player-bezel-transition');
        });
    }

    _createClass(Bezel, [{
        key: 'switch',
        value: function _switch(icon) {
            this.container.innerHTML = icon;
            this.container.classList.add('y-player-bezel-transition');
        }
    }]);

    return Bezel;
}();

exports.default = Bezel;

/***/ }),

/***/ "./src/js/contextmenu.js":
/*!*******************************!*\
  !*** ./src/js/contextmenu.js ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ContextMenu = function () {
    function ContextMenu(player) {
        var _this = this;

        _classCallCheck(this, ContextMenu);

        this.player = player;
        this.shown = false;

        Array.prototype.slice.call(this.player.template.menuItem).forEach(function (item, index) {
            if (_this.player.options.contextmenu[index].click) {
                item.addEventListener('click', function () {
                    _this.player.options.contextmenu[index].click(_this.player);
                    _this.hide();
                });
            }
        });

        this.player.container.addEventListener('contextmenu', function (e) {
            if (_this.shown) {
                _this.hide();
                return;
            }

            var event = e || window.event;
            event.preventDefault();

            var clientRect = _this.player.container.getBoundingClientRect();
            _this.show(event.clientX - clientRect.left, event.clientY - clientRect.top);

            _this.player.template.mask.addEventListener('click', function () {
                _this.hide();
            });
        });
    }

    _createClass(ContextMenu, [{
        key: 'show',
        value: function show(x, y) {
            this.player.template.menu.classList.add('y-player-menu-show');

            var clientRect = this.player.container.getBoundingClientRect();
            if (x + this.player.template.menu.offsetWidth >= clientRect.width) {
                this.player.template.menu.style.right = clientRect.width - x + 'px';
                this.player.template.menu.style.left = 'initial';
            } else {
                this.player.template.menu.style.left = x + 'px';
                this.player.template.menu.style.right = 'initial';
            }
            if (y + this.player.template.menu.offsetHeight >= clientRect.height) {
                this.player.template.menu.style.bottom = clientRect.height - y + 'px';
                this.player.template.menu.style.top = 'initial';
            } else {
                this.player.template.menu.style.top = y + 'px';
                this.player.template.menu.style.bottom = 'initial';
            }

            this.player.template.mask.classList.add('y-player-mask-show');

            this.shown = true;
            this.player.events.trigger('contextmenu_show');
        }
    }, {
        key: 'hide',
        value: function hide() {
            this.player.template.mask.classList.remove('y-player-mask-show');
            this.player.template.menu.classList.remove('y-player-menu-show');

            this.shown = false;
            this.player.events.trigger('contextmenu_hide');
        }
    }]);

    return ContextMenu;
}();

exports.default = ContextMenu;

/***/ }),

/***/ "./src/js/controller.js":
/*!******************************!*\
  !*** ./src/js/controller.js ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _utils = __webpack_require__(/*! ./utils */ "./src/js/utils.js");

var _utils2 = _interopRequireDefault(_utils);

var _thumbnails = __webpack_require__(/*! ./thumbnails */ "./src/js/thumbnails.js");

var _thumbnails2 = _interopRequireDefault(_thumbnails);

var _icons = __webpack_require__(/*! ./icons */ "./src/js/icons.js");

var _icons2 = _interopRequireDefault(_icons);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Controller = function () {
    function Controller(player) {
        var _this = this;

        _classCallCheck(this, Controller);

        this.player = player;

        this.autoHideTimer = 0;
        if (!_utils2.default.isMobile) {
            this.player.container.addEventListener('mousemove', function () {
                _this.setAutoHide();
            });
            this.player.container.addEventListener('click', function () {
                _this.setAutoHide();
            });
            this.player.on('play', function () {
                _this.setAutoHide();
            });
            this.player.on('pause', function () {
                _this.setAutoHide();
            });
        }

        this.initPlayButton();
        this.initThumbnails();
        this.initPlayedBar();
        this.initFullButton();
        this.initQualityButton();
        this.initHighlights();
        if (!_utils2.default.isMobile) {
            this.initVolumeButton();
        }
    }

    _createClass(Controller, [{
        key: 'initPlayButton',
        value: function initPlayButton() {
            var _this2 = this;

            this.player.template.playButton.addEventListener('click', function () {
                _this2.player.toggle();
            });

            if (!_utils2.default.isMobile) {
                this.player.template.videoWrap.addEventListener('click', function () {
                    _this2.player.toggle();
                });
                this.player.template.controllerMask.addEventListener('click', function () {
                    _this2.player.toggle();
                });
            } else {
                this.player.template.videoWrap.addEventListener('click', function () {
                    _this2.toggle();
                });
                this.player.template.controllerMask.addEventListener('click', function () {
                    _this2.toggle();
                });
            }
        }
    }, {
        key: 'initHighlights',
        value: function initHighlights() {
            var _this3 = this;

            this.player.on('durationchange', function () {
                if (_this3.player.video.duration !== 1 && _this3.player.video.duration !== Infinity) {
                    if (_this3.player.options.highlight) {
                        var highlights = document.querySelectorAll('.y-player-highlight');
                        [].slice.call(highlights, 0).forEach(function (item) {
                            _this3.player.template.playedBarWrap.removeChild(item);
                        });
                        for (var i = 0; i < _this3.player.options.highlight.length; i++) {
                            if (!_this3.player.options.highlight[i].text || !_this3.player.options.highlight[i].time) {
                                continue;
                            }
                            var p = document.createElement('div');
                            p.classList.add('y-player-highlight');
                            p.style.left = _this3.player.options.highlight[i].time / _this3.player.video.duration * 100 + '%';
                            p.innerHTML = '<span class="y-player-highlight-text">' + _this3.player.options.highlight[i].text + '</span>';
                            _this3.player.template.playedBarWrap.insertBefore(p, _this3.player.template.playedBarTime);
                        }
                    }
                }
            });
        }
    }, {
        key: 'initThumbnails',
        value: function initThumbnails() {
            var _this4 = this;

            if (this.player.options.video.thumbnails) {
                this.thumbnails = new _thumbnails2.default({
                    container: this.player.template.barPreview,
                    barWidth: this.player.template.barWrap.offsetWidth,
                    url: this.player.options.video.thumbnails,
                    events: this.player.events
                });

                this.player.on('loadedmetadata', function () {
                    _this4.thumbnails.resize(160, _this4.player.video.videoHeight / _this4.player.video.videoWidth * 160);
                });
            }
        }
    }, {
        key: 'initPlayedBar',
        value: function initPlayedBar() {
            var _this5 = this;

            var thumbMove = function thumbMove(e) {
                var percentage = ((e.clientX || e.changedTouches[0].clientX) - _utils2.default.getBoundingClientRectViewLeft(_this5.player.template.playedBarWrap)) / _this5.player.template.playedBarWrap.clientWidth;
                percentage = Math.max(percentage, 0);
                percentage = Math.min(percentage, 1);
                _this5.player.bar.set('played', percentage, 'width');
                _this5.player.template.ptime.innerHTML = _utils2.default.secondToTime(percentage * _this5.player.video.duration);
            };

            var thumbUp = function thumbUp(e) {
                document.removeEventListener(_utils2.default.nameMap.dragEnd, thumbUp);
                document.removeEventListener(_utils2.default.nameMap.dragMove, thumbMove);
                var percentage = ((e.clientX || e.changedTouches[0].clientX) - _utils2.default.getBoundingClientRectViewLeft(_this5.player.template.playedBarWrap)) / _this5.player.template.playedBarWrap.clientWidth;
                percentage = Math.max(percentage, 0);
                percentage = Math.min(percentage, 1);
                _this5.player.bar.set('played', percentage, 'width');
                _this5.player.seek(_this5.player.bar.get('played') * _this5.player.video.duration);
                _this5.player.timer.enable('progress');
            };

            this.player.template.playedBarWrap.addEventListener(_utils2.default.nameMap.dragStart, function () {
                _this5.player.timer.disable('progress');
                document.addEventListener(_utils2.default.nameMap.dragMove, thumbMove);
                document.addEventListener(_utils2.default.nameMap.dragEnd, thumbUp);
            });

            this.player.template.playedBarWrap.addEventListener(_utils2.default.nameMap.dragMove, function (e) {
                if (_this5.player.video.duration) {
                    var px = _utils2.default.cumulativeOffset(_this5.player.template.playedBarWrap).left;
                    var tx = (e.clientX || e.changedTouches[0].clientX) - px;
                    if (tx < 0 || tx > _this5.player.template.playedBarWrap.offsetWidth) {
                        return;
                    }
                    var time = _this5.player.video.duration * (tx / _this5.player.template.playedBarWrap.offsetWidth);
                    if (_utils2.default.isMobile) {
                        _this5.thumbnails && _this5.thumbnails.show();
                    }
                    _this5.thumbnails && _this5.thumbnails.move(tx);
                    _this5.player.template.playedBarTime.style.left = tx - (time >= 3600 ? 25 : 20) + 'px';
                    _this5.player.template.playedBarTime.innerText = _utils2.default.secondToTime(time);
                    _this5.player.template.playedBarTime.classList.remove('hidden');
                }
            });

            this.player.template.playedBarWrap.addEventListener(_utils2.default.nameMap.dragEnd, function () {
                if (_utils2.default.isMobile) {
                    _this5.thumbnails && _this5.thumbnails.hide();
                }
            });

            if (!_utils2.default.isMobile) {
                this.player.template.playedBarWrap.addEventListener('mouseenter', function () {
                    if (_this5.player.video.duration) {
                        _this5.thumbnails && _this5.thumbnails.show();
                        _this5.player.template.playedBarTime.classList.remove('hidden');
                    }
                });

                this.player.template.playedBarWrap.addEventListener('mouseleave', function () {
                    if (_this5.player.video.duration) {
                        _this5.thumbnails && _this5.thumbnails.hide();
                        _this5.player.template.playedBarTime.classList.add('hidden');
                    }
                });
            }
        }
    }, {
        key: 'initFullButton',
        value: function initFullButton() {
            var _this6 = this;

            this.player.template.browserFullButton.addEventListener('click', function () {
                _this6.player.fullScreen.toggle('browser');
            });

            this.player.template.webFullButton.addEventListener('click', function () {
                _this6.player.fullScreen.toggle('web');
            });
        }
    }, {
        key: 'initVolumeButton',
        value: function initVolumeButton() {
            var _this7 = this;

            var vWidth = 35;

            var volumeMove = function volumeMove(event) {
                var e = event || window.event;
                var percentage = ((e.clientX || e.changedTouches[0].clientX) - _utils2.default.getBoundingClientRectViewLeft(_this7.player.template.volumeBarWrap) - 5.5) / vWidth;
                _this7.player.volume(percentage);
            };
            var volumeUp = function volumeUp() {
                document.removeEventListener(_utils2.default.nameMap.dragEnd, volumeUp);
                document.removeEventListener(_utils2.default.nameMap.dragMove, volumeMove);
                _this7.player.template.volumeButton.classList.remove('y-player-volume-active');
            };

            this.player.template.volumeBarWrapWrap.addEventListener('click', function (event) {
                var e = event || window.event;
                var percentage = ((e.clientX || e.changedTouches[0].clientX) - _utils2.default.getBoundingClientRectViewLeft(_this7.player.template.volumeBarWrap) - 5.5) / vWidth;
                _this7.player.volume(percentage);
            });
            this.player.template.volumeBarWrapWrap.addEventListener(_utils2.default.nameMap.dragStart, function () {
                document.addEventListener(_utils2.default.nameMap.dragMove, volumeMove);
                document.addEventListener(_utils2.default.nameMap.dragEnd, volumeUp);
                _this7.player.template.volumeButton.classList.add('y-player-volume-active');
            });
            this.player.template.volumeButtonIcon.addEventListener('click', function () {
                if (_this7.player.video.muted) {
                    _this7.player.video.muted = false;
                    _this7.player.switchVolumeIcon();
                    _this7.player.bar.set('volume', _this7.player.volume(), 'width');
                } else {
                    _this7.player.video.muted = true;
                    _this7.player.template.volumeIcon.innerHTML = _icons2.default.volumeOff;
                    _this7.player.bar.set('volume', 0, 'width');
                }
            });
        }
    }, {
        key: 'initQualityButton',
        value: function initQualityButton() {
            var _this8 = this;

            if (this.player.options.video.quality) {
                this.player.template.qualityList.addEventListener('click', function (e) {
                    if (e.target.classList.contains('y-player-quality-item')) {
                        _this8.player.switchQuality(e.target.dataset.index);
                    }
                });
            }
        }
    }, {
        key: 'setAutoHide',
        value: function setAutoHide() {
            var _this9 = this;

            this.show();
            clearTimeout(this.autoHideTimer);
            this.autoHideTimer = setTimeout(function () {
                if (_this9.player.video.played.length && !_this9.player.paused && !_this9.disableAutoHide) {
                    _this9.hide();
                }
            }, 3000);
        }
    }, {
        key: 'show',
        value: function show() {
            this.player.container.classList.remove('y-player-hide-controller');
        }
    }, {
        key: 'hide',
        value: function hide() {
            this.player.container.classList.add('y-player-hide-controller');
            this.player.setting.hide();
            this.player.comment && this.player.comment.hide();
        }
    }, {
        key: 'isShow',
        value: function isShow() {
            return !this.player.container.classList.contains('y-player-hide-controller');
        }
    }, {
        key: 'toggle',
        value: function toggle() {
            if (this.isShow()) {
                this.hide();
            } else {
                this.show();
            }
        }
    }, {
        key: 'destroy',
        value: function destroy() {
            clearTimeout(this.autoHideTimer);
        }
    }]);

    return Controller;
}();

exports.default = Controller;

/***/ }),

/***/ "./src/js/events.js":
/*!**************************!*\
  !*** ./src/js/events.js ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Events = function () {
    function Events() {
        _classCallCheck(this, Events);

        this.events = {};

        this.videoEvents = ['abort', 'canplay', 'canplaythrough', 'durationchange', 'emptied', 'ended', 'error', 'loadeddata', 'loadedmetadata', 'loadstart', 'mozaudioavailable', 'pause', 'play', 'playing', 'progress', 'ratechange', 'seeked', 'seeking', 'stalled', 'suspend', 'timeupdate', 'volumechange', 'waiting'];
        this.playerEvents = ['thumbnails_show', 'thumbnails_hide', 'contextmenu_show', 'contextmenu_hide', 'notice_show', 'notice_hide', 'quality_start', 'quality_end', 'destroy', 'resize', 'fullscreen', 'fullscreen_cancel', 'webfullscreen', 'webfullscreen_cancel'];
    }

    _createClass(Events, [{
        key: 'on',
        value: function on(name, callback) {
            if (this.type(name) && typeof callback === 'function') {
                if (!this.events[name]) {
                    this.events[name] = [];
                }
                this.events[name].push(callback);
            }
        }
    }, {
        key: 'trigger',
        value: function trigger(name, info) {
            if (this.events[name] && this.events[name].length) {
                for (var i = 0; i < this.events[name].length; i++) {
                    this.events[name][i](info);
                }
            }
        }
    }, {
        key: 'type',
        value: function type(name) {
            if (this.playerEvents.indexOf(name) !== -1) {
                return 'player';
            } else if (this.videoEvents.indexOf(name) !== -1) {
                return 'video';
            }

            console.error('Unknown event name: ' + name);
            return null;
        }
    }]);

    return Events;
}();

exports.default = Events;

/***/ }),

/***/ "./src/js/fullscreen.js":
/*!******************************!*\
  !*** ./src/js/fullscreen.js ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _utils = __webpack_require__(/*! ./utils */ "./src/js/utils.js");

var _utils2 = _interopRequireDefault(_utils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var FullScreen = function () {
    function FullScreen(player) {
        var _this = this;

        _classCallCheck(this, FullScreen);

        this.player = player;

        this.player.events.on('webfullscreen', function () {
            _this.player.resize();
        });
        this.player.events.on('webfullscreen_cancel', function () {
            _this.player.resize();
            _utils2.default.setScrollPosition(_this.lastScrollPosition);
        });

        var fullscreenchange = function fullscreenchange() {
            _this.player.resize();
            if (_this.isFullScreen('browser')) {
                _this.player.events.trigger('fullscreen');
            } else {
                _utils2.default.setScrollPosition(_this.lastScrollPosition);
                _this.player.events.trigger('fullscreen_cancel');
            }
        };
        var docfullscreenchange = function docfullscreenchange() {
            var fullscreenElementRegister = document.fullscreenElement || document.mozFullScreenElement || document.msFullscreenElement;
            if (fullscreenElementRegister && fullscreenElementRegister !== _this.player.container) {
                return;
            }
            _this.player.resize();
            if (fullscreenElementRegister) {
                _this.player.events.trigger('fullscreen');
            } else {
                _utils2.default.setScrollPosition(_this.lastScrollPosition);
                _this.player.events.trigger('fullscreen_cancel');
            }
        };
        if (/Firefox/.test(navigator.userAgent)) {
            document.addEventListener('mozfullscreenchange', docfullscreenchange);
            document.addEventListener('fullscreenchange', docfullscreenchange);
        } else {
            this.player.container.addEventListener('fullscreenchange', fullscreenchange);
            this.player.container.addEventListener('webkitfullscreenchange', fullscreenchange);
            document.addEventListener('msfullscreenchange', docfullscreenchange);
            document.addEventListener('MSFullscreenChange', docfullscreenchange);
        }
    }

    _createClass(FullScreen, [{
        key: 'isFullScreen',
        value: function isFullScreen() {
            var type = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'browser';

            switch (type) {
                case 'browser':
                    return document.fullscreenElement || document.mozFullScreenElement || document.webkitFullscreenElement || document.msFullscreenElement;
                case 'web':
                    return this.player.container.classList.contains('y-player-fulled');
            }
        }
    }, {
        key: 'request',
        value: function request() {
            var type = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'browser';

            var anotherType = type === 'browser' ? 'web' : 'browser';
            var anotherTypeOn = this.isFullScreen(anotherType);
            if (!anotherTypeOn) {
                this.lastScrollPosition = _utils2.default.getScrollPosition();
            }

            switch (type) {
                case 'browser':
                    if (this.player.container.requestFullscreen) {
                        this.player.container.requestFullscreen();
                    } else if (this.player.container.mozRequestFullScreen) {
                        this.player.container.mozRequestFullScreen();
                    } else if (this.player.container.webkitRequestFullscreen) {
                        this.player.container.webkitRequestFullscreen();
                    } else if (this.player.video.webkitEnterFullscreen) {
                        // Safari for iOS
                        this.player.video.webkitEnterFullscreen();
                    } else if (this.player.video.webkitEnterFullScreen) {
                        this.player.video.webkitEnterFullScreen();
                    } else if (this.player.container.msRequestFullscreen) {
                        this.player.container.msRequestFullscreen();
                    }
                    break;
                case 'web':
                    this.player.container.classList.add('y-player-fulled');
                    document.body.classList.add('y-player-web-fullscreen-fix');
                    this.player.events.trigger('webfullscreen');
                    break;
            }

            if (anotherTypeOn) {
                this.cancel(anotherType);
            }
        }
    }, {
        key: 'cancel',
        value: function cancel() {
            var type = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'browser';

            switch (type) {
                case 'browser':
                    if (document.cancelFullScreen) {
                        document.cancelFullScreen();
                    } else if (document.mozCancelFullScreen) {
                        document.mozCancelFullScreen();
                    } else if (document.webkitCancelFullScreen) {
                        document.webkitCancelFullScreen();
                    } else if (document.webkitCancelFullscreen) {
                        document.webkitCancelFullscreen();
                    } else if (document.msCancelFullScreen) {
                        document.msCancelFullScreen();
                    } else if (document.msExitFullscreen) {
                        document.msExitFullscreen();
                    }
                    break;
                case 'web':
                    this.player.container.classList.remove('y-player-fulled');
                    document.body.classList.remove('y-player-web-fullscreen-fix');
                    this.player.events.trigger('webfullscreen_cancel');
                    break;
            }
        }
    }, {
        key: 'toggle',
        value: function toggle() {
            var type = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'browser';

            if (this.isFullScreen(type)) {
                this.cancel(type);
            } else {
                this.request(type);
            }
        }
    }]);

    return FullScreen;
}();

exports.default = FullScreen;

/***/ }),

/***/ "./src/js/hotkey.js":
/*!**************************!*\
  !*** ./src/js/hotkey.js ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var HotKey = function HotKey(player) {
    _classCallCheck(this, HotKey);

    if (player.options.hotkey) {
        document.addEventListener('keydown', function (e) {
            if (player.focus) {
                var tag = document.activeElement.tagName.toUpperCase();
                var editable = document.activeElement.getAttribute('contenteditable');
                if (tag !== 'INPUT' && tag !== 'TEXTAREA' && editable !== '' && editable !== 'true') {
                    var event = e || window.event;
                    var percentage = void 0;
                    switch (event.keyCode) {
                        case 32:
                            event.preventDefault();
                            player.toggle();
                            break;
                        case 37:
                            event.preventDefault();
                            player.seek(player.video.currentTime - 5);
                            player.controller.setAutoHide();
                            break;
                        case 39:
                            event.preventDefault();
                            player.seek(player.video.currentTime + 5);
                            player.controller.setAutoHide();
                            break;
                        case 38:
                            event.preventDefault();
                            percentage = player.volume() + 0.1;
                            player.volume(percentage);
                            break;
                        case 40:
                            event.preventDefault();
                            percentage = player.volume() - 0.1;
                            player.volume(percentage);
                            break;
                    }
                }
            }
        });
    }

    document.addEventListener('keydown', function (e) {
        var event = e || window.event;
        switch (event.keyCode) {
            case 27:
                if (player.fullScreen.isFullScreen('web')) {
                    player.fullScreen.cancel('web');
                }
                break;
        }
    });
};

exports.default = HotKey;

/***/ }),

/***/ "./src/js/i18n.js":
/*!************************!*\
  !*** ./src/js/i18n.js ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
function i18n(lang) {
    var _this = this;

    this.lang = lang;
    this.tran = function (text) {
        if (tranTxt[_this.lang] && tranTxt[_this.lang][text]) {
            return tranTxt[_this.lang][text];
        } else {
            return text;
        }
    };
}

// add translation text here
var tranTxt = {
    'zh-cn': {
        'Top': '顶部',
        'Bottom': '底部',
        'Rolling': '滚动',
        'About author': '关于作者',
        'Y-Player feedback': 'Y-Player意见反馈',
        'About Y-Player': '关于Y-Player',
        'Speed': '速度',
        'Normal': '正常',
        'Video load failed': '视频加载失败',
        'Switching to': '正在切换至',
        'Switched to': '已经切换至',
        'quality': '画质',
        'FF': '快进',
        'REW': '快退',
        'Setting': '设置',
        'Full screen': '全屏',
        'Web full screen': '页面全屏',
        's': '秒',
        'Volume': '音量',
        'Video info': '视频统计信息'
    }
};

exports.default = i18n;

/***/ }),

/***/ "./src/js/icons.js":
/*!*************************!*\
  !*** ./src/js/icons.js ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _play = __webpack_require__(/*! ../icons/play.svg */ "./src/icons/play.svg");

var _play2 = _interopRequireDefault(_play);

var _pause = __webpack_require__(/*! ../icons/pause.svg */ "./src/icons/pause.svg");

var _pause2 = _interopRequireDefault(_pause);

var _volumeUp = __webpack_require__(/*! ../icons/volume-up.svg */ "./src/icons/volume-up.svg");

var _volumeUp2 = _interopRequireDefault(_volumeUp);

var _volumeDown = __webpack_require__(/*! ../icons/volume-down.svg */ "./src/icons/volume-down.svg");

var _volumeDown2 = _interopRequireDefault(_volumeDown);

var _volumeOff = __webpack_require__(/*! ../icons/volume-off.svg */ "./src/icons/volume-off.svg");

var _volumeOff2 = _interopRequireDefault(_volumeOff);

var _full = __webpack_require__(/*! ../icons/full.svg */ "./src/icons/full.svg");

var _full2 = _interopRequireDefault(_full);

var _fullWeb = __webpack_require__(/*! ../icons/full-web.svg */ "./src/icons/full-web.svg");

var _fullWeb2 = _interopRequireDefault(_fullWeb);

var _setting = __webpack_require__(/*! ../icons/setting.svg */ "./src/icons/setting.svg");

var _setting2 = _interopRequireDefault(_setting);

var _right = __webpack_require__(/*! ../icons/right.svg */ "./src/icons/right.svg");

var _right2 = _interopRequireDefault(_right);

var _loading = __webpack_require__(/*! ../icons/loading.svg */ "./src/icons/loading.svg");

var _loading2 = _interopRequireDefault(_loading);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Icons = {
    play: _play2.default,
    pause: _pause2.default,
    volumeUp: _volumeUp2.default,
    volumeDown: _volumeDown2.default,
    volumeOff: _volumeOff2.default,
    full: _full2.default,
    fullWeb: _fullWeb2.default,
    setting: _setting2.default,
    right: _right2.default,
    loading: _loading2.default
};

exports.default = Icons;

/***/ }),

/***/ "./src/js/index.js":
/*!*************************!*\
  !*** ./src/js/index.js ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

__webpack_require__(/*! ../scss/index.scss */ "./src/scss/index.scss");

var _player = __webpack_require__(/*! ./player */ "./src/js/player.js");

var _player2 = _interopRequireDefault(_player);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* global Y_PLAYER_VERSION GIT_HASH */
console.log('\n' + ' %c Y-Player v' + "1.0.0" + ' ' + "3d5e027" + ' %c https://player.y-english.org ' + '\n' + '\n', 'color: #54C8FF; background: #2185D0; padding:5px 0;', 'background: #54C8FF; padding:5px 0;');

exports.default = _player2.default;

/***/ }),

/***/ "./src/js/info-panel.js":
/*!******************************!*\
  !*** ./src/js/info-panel.js ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/* global Y_PLAYER_VERSION GIT_HASH */

var InfoPanel = function () {
    function InfoPanel(player) {
        var _this = this;

        _classCallCheck(this, InfoPanel);

        this.container = player.template.infoPanel;
        this.template = player.template;
        this.video = player.video;
        this.player = player;

        this.template.infoPanelClose.addEventListener('click', function () {
            _this.hide();
        });
    }

    _createClass(InfoPanel, [{
        key: 'show',
        value: function show() {
            this.beginTime = Date.now();
            this.update();
            this.player.timer.enable('info');
            this.player.timer.enable('fps');
            this.container.classList.remove('y-player-info-panel-hide');
        }
    }, {
        key: 'hide',
        value: function hide() {
            this.player.timer.disable('info');
            this.player.timer.disable('fps');
            this.container.classList.add('y-player-info-panel-hide');
        }
    }, {
        key: 'trigger',
        value: function trigger() {
            if (this.container.classList.contains('y-player-info-panel-hide')) {
                this.show();
            } else {
                this.hide();
            }
        }
    }, {
        key: 'update',
        value: function update() {
            this.template.infoVersion.innerHTML = 'v' + "1.0.0" + ' ' + "3d5e027";
            this.template.infoType.innerHTML = this.player.type;
            this.template.infoUrl.innerHTML = this.player.options.video.url;
            this.template.infoResolution.innerHTML = this.player.video.videoWidth + ' x ' + this.player.video.videoHeight;
            this.template.infoDuration.innerHTML = this.player.video.duration;
        }
    }, {
        key: 'fps',
        value: function fps(value) {
            this.template.infoFPS.innerHTML = '' + value.toFixed(1);
        }
    }]);

    return InfoPanel;
}();

exports.default = InfoPanel;

/***/ }),

/***/ "./src/js/options.js":
/*!***************************!*\
  !*** ./src/js/options.js ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

/* global Y_PLAYER_VERSION */

exports.default = function (options) {
    // default options
    var defaultOption = {
        container: options.element || document.getElementsByClassName('y-player')[0],
        autoplay: false,
        theme: {
            bar: '#F00',
            volume: '#FFF'
        },
        lang: (navigator.language || navigator.browserLanguage).toLowerCase(),
        hotkey: true,
        preload: 'metadata',
        volume: 0.5,
        video: {},
        contextmenu: [],
        mutex: true
    };
    for (var defaultKey in defaultOption) {
        if (defaultOption.hasOwnProperty(defaultKey) && !options.hasOwnProperty(defaultKey)) {
            options[defaultKey] = defaultOption[defaultKey];
        }
    }
    if (options.video) {
        !options.video.type && (options.video.type = 'auto');
    }

    if (options.video.quality) {
        options.video.url = options.video.quality[options.video.defaultQuality].url;
    }

    if (options.lang) {
        options.lang = options.lang.toLowerCase();
    }

    options.contextmenu = options.contextmenu.concat([{
        text: 'Video info',
        click: function click(player) {
            player.infoPanel.trigger();
        }
    }, {
        text: 'About author',
        link: 'https://lab.y-english.org'
    }, {
        text: 'Y-Player v' + "1.0.0",
        link: 'https://github.com/Y-Lab/Y-Player'
    }]);

    return options;
};

/***/ }),

/***/ "./src/js/player.js":
/*!**************************!*\
  !*** ./src/js/player.js ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _promisePolyfill = __webpack_require__(/*! promise-polyfill */ "./node_modules/promise-polyfill/src/index.js");

var _promisePolyfill2 = _interopRequireDefault(_promisePolyfill);

var _utils = __webpack_require__(/*! ./utils */ "./src/js/utils.js");

var _utils2 = _interopRequireDefault(_utils);

var _options = __webpack_require__(/*! ./options */ "./src/js/options.js");

var _options2 = _interopRequireDefault(_options);

var _i18n = __webpack_require__(/*! ./i18n */ "./src/js/i18n.js");

var _i18n2 = _interopRequireDefault(_i18n);

var _template = __webpack_require__(/*! ./template */ "./src/js/template.js");

var _template2 = _interopRequireDefault(_template);

var _icons = __webpack_require__(/*! ./icons */ "./src/js/icons.js");

var _icons2 = _interopRequireDefault(_icons);

var _events = __webpack_require__(/*! ./events */ "./src/js/events.js");

var _events2 = _interopRequireDefault(_events);

var _user = __webpack_require__(/*! ./user */ "./src/js/user.js");

var _user2 = _interopRequireDefault(_user);

var _bar = __webpack_require__(/*! ./bar */ "./src/js/bar.js");

var _bar2 = _interopRequireDefault(_bar);

var _bezel = __webpack_require__(/*! ./bezel */ "./src/js/bezel.js");

var _bezel2 = _interopRequireDefault(_bezel);

var _fullscreen = __webpack_require__(/*! ./fullscreen */ "./src/js/fullscreen.js");

var _fullscreen2 = _interopRequireDefault(_fullscreen);

var _controller = __webpack_require__(/*! ./controller */ "./src/js/controller.js");

var _controller2 = _interopRequireDefault(_controller);

var _setting = __webpack_require__(/*! ./setting */ "./src/js/setting.js");

var _setting2 = _interopRequireDefault(_setting);

var _timer = __webpack_require__(/*! ./timer */ "./src/js/timer.js");

var _timer2 = _interopRequireDefault(_timer);

var _hotkey = __webpack_require__(/*! ./hotkey */ "./src/js/hotkey.js");

var _hotkey2 = _interopRequireDefault(_hotkey);

var _contextmenu = __webpack_require__(/*! ./contextmenu */ "./src/js/contextmenu.js");

var _contextmenu2 = _interopRequireDefault(_contextmenu);

var _infoPanel = __webpack_require__(/*! ./info-panel */ "./src/js/info-panel.js");

var _infoPanel2 = _interopRequireDefault(_infoPanel);

var _video = __webpack_require__(/*! ../templates/video.art */ "./src/templates/video.art");

var _video2 = _interopRequireDefault(_video);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var index = 0;
var instances = [];

var Player = function () {

    /**
     * Y-Player constructor function
     *
     * @param {Object} options - See README
     * @constructor
     */
    function Player(options) {
        var _this = this;

        _classCallCheck(this, Player);

        this.options = (0, _options2.default)(options);

        if (this.options.video.quality) {
            this.qualityIndex = this.options.video.defaultQuality;
            this.quality = this.options.video.quality[this.options.video.defaultQuality];
        }
        this.tran = new _i18n2.default(this.options.lang).tran;
        this.events = new _events2.default();
        this.user = new _user2.default(this);
        this.container = this.options.container;

        this.container.classList.add('y-player');
        if (_utils2.default.isMobile) {
            this.container.classList.add('y-player-mobile');
        }
        this.arrow = this.container.offsetWidth <= 500;
        if (this.arrow) {
            this.container.classList.add('y-player-arrow');
        }

        this.template = new _template2.default({
            container: this.container,
            options: this.options,
            index: index,
            tran: this.tran
        });

        this.video = this.template.video;

        this.bar = new _bar2.default(this.template);

        this.bezel = new _bezel2.default(this.template.bezel);

        this.fullScreen = new _fullscreen2.default(this);

        this.controller = new _controller2.default(this);

        this.setting = new _setting2.default(this);

        document.addEventListener('click', function () {
            _this.focus = false;
        }, true);
        this.container.addEventListener('click', function () {
            _this.focus = true;
        }, true);

        this.paused = true;

        this.timer = new _timer2.default(this);

        this.hotkey = new _hotkey2.default(this);

        this.contextmenu = new _contextmenu2.default(this);

        this.initVideo(this.video, this.quality && this.quality.type || this.options.video.type);

        this.infoPanel = new _infoPanel2.default(this);

        if (this.options.autoplay) {
            this.play();
        }

        index++;
        instances.push(this);
    }

    /**
    * Seek video
    */


    _createClass(Player, [{
        key: 'seek',
        value: function seek(time) {
            time = Math.max(time, 0);
            if (this.video.duration) {
                time = Math.min(time, this.video.duration);
            }
            if (this.video.currentTime < time) {
                this.notice(this.tran('FF') + ' ' + (time - this.video.currentTime).toFixed(0) + ' ' + this.tran('s'));
            } else if (this.video.currentTime > time) {
                this.notice(this.tran('REW') + ' ' + (this.video.currentTime - time).toFixed(0) + ' ' + this.tran('s'));
            }

            this.video.currentTime = time;

            this.bar.set('played', time / this.video.duration, 'width');
            this.template.ptime.innerHTML = _utils2.default.secondToTime(time);
        }

        /**
         * Play video
         */

    }, {
        key: 'play',
        value: function play() {
            var _this2 = this;

            this.paused = false;
            if (this.video.paused) {
                this.bezel.switch(_icons2.default.play);
            }

            this.template.playButton.innerHTML = _icons2.default.pause;

            var playedPromise = _promisePolyfill2.default.resolve(this.video.play());
            playedPromise.catch(function () {
                _this2.pause();
            }).then(function () {});
            this.timer.enable('loading');
            this.container.classList.remove('y-player-paused');
            this.container.classList.add('y-player-playing');
            if (this.options.mutex) {
                for (var i = 0; i < instances.length; i++) {
                    if (this !== instances[i]) {
                        instances[i].pause();
                    }
                }
            }
        }

        /**
         * Pause video
         */

    }, {
        key: 'pause',
        value: function pause() {
            this.paused = true;
            this.container.classList.remove('y-player-loading');

            if (!this.video.paused) {
                this.bezel.switch(_icons2.default.pause);
            }

            this.template.playButton.innerHTML = _icons2.default.play;
            this.video.pause();
            this.timer.disable('loading');
            this.container.classList.remove('y-player-playing');
            this.container.classList.add('y-player-paused');
        }
    }, {
        key: 'switchVolumeIcon',
        value: function switchVolumeIcon() {
            if (this.volume() >= 0.95) {
                this.template.volumeIcon.innerHTML = _icons2.default.volumeUp;
            } else if (this.volume() > 0) {
                this.template.volumeIcon.innerHTML = _icons2.default.volumeDown;
            } else {
                this.template.volumeIcon.innerHTML = _icons2.default.volumeOff;
            }
        }

        /**
         * Set volume
         */

    }, {
        key: 'volume',
        value: function volume(percentage, nostorage, nonotice) {
            percentage = parseFloat(percentage);
            if (!isNaN(percentage)) {
                percentage = Math.max(percentage, 0);
                percentage = Math.min(percentage, 1);
                this.bar.set('volume', percentage, 'width');
                var formatPercentage = (percentage * 100).toFixed(0) + '%';
                this.template.volumeBarWrapWrap.dataset.balloon = formatPercentage;
                if (!nostorage) {
                    this.user.set('volume', percentage);
                }
                if (!nonotice) {
                    this.notice(this.tran('Volume') + ' ' + (percentage * 100).toFixed(0) + '%');
                }

                this.video.volume = percentage;
                if (this.video.muted) {
                    this.video.muted = false;
                }
                this.switchVolumeIcon();
            }

            return this.video.volume;
        }

        /**
         * Toggle between play and pause
         */

    }, {
        key: 'toggle',
        value: function toggle() {
            if (this.video.paused) {
                this.play();
            } else {
                this.pause();
            }
        }

        /**
         * attach event
         */

    }, {
        key: 'on',
        value: function on(name, callback) {
            this.events.on(name, callback);
        }

        /**
         * Switch to a new video
         *
         * @param {Object} video - new video info
         */

    }, {
        key: 'switchVideo',
        value: function switchVideo(video) {
            this.pause();
            this.video.poster = video.pic ? video.pic : '';
            this.video.src = video.url;
            this.initMSE(this.video, video.type || 'auto');
        }
    }, {
        key: 'initMSE',
        value: function initMSE(video, type) {
            var _this3 = this;

            this.type = type;
            if (this.options.video.customType && this.options.video.customType[type]) {
                if (Object.prototype.toString.call(this.options.video.customType[type]) === '[object Function]') {
                    this.options.video.customType[type](this.video, this);
                } else {
                    console.error('Illegal video type: ' + type);
                }
            } else {
                if (this.type === 'auto') {
                    if (/m3u8(#|\?|$)/i.exec(video.src)) {
                        this.type = 'hls';
                    } else if (/.flv(#|\?|$)/i.exec(video.src)) {
                        this.type = 'flv';
                    } else if (/.mpd(#|\?|$)/i.exec(video.src)) {
                        this.type = 'dash';
                    } else {
                        this.type = 'normal';
                    }
                }

                if (this.type === 'hls' && (video.canPlayType('application/x-mpegURL') || video.canPlayType('application/vnd.apple.mpegURL'))) {
                    this.type = 'normal';
                }

                switch (this.type) {
                    // https://github.com/video-dev/hls.js
                    case 'hls':
                        if (Hls) {
                            if (Hls.isSupported()) {
                                var hls = new Hls();
                                hls.loadSource(video.src);
                                hls.attachMedia(video);
                            } else {
                                this.notice('Error: Hls is not supported.');
                            }
                        } else {
                            this.notice('Error: Can\'t find Hls.');
                        }
                        break;

                    // https://github.com/Bilibili/flv.js
                    case 'flv':
                        if (flvjs && flvjs.isSupported()) {
                            if (flvjs.isSupported()) {
                                var flvPlayer = flvjs.createPlayer({
                                    type: 'flv',
                                    url: video.src
                                });
                                flvPlayer.attachMediaElement(video);
                                flvPlayer.load();
                            } else {
                                this.notice('Error: flvjs is not supported.');
                            }
                        } else {
                            this.notice('Error: Can\'t find flvjs.');
                        }
                        break;

                    // https://github.com/Dash-Industry-Forum/dash.js
                    case 'dash':
                        if (dashjs) {
                            dashjs.MediaPlayer().create().initialize(video, video.src, false);
                        } else {
                            this.notice('Error: Can\'t find dashjs.');
                        }
                        break;

                    // https://github.com/webtorrent/webtorrent
                    case 'webtorrent':
                        if (WebTorrent) {
                            if (WebTorrent.WEBRTC_SUPPORT) {
                                this.container.classList.add('y-player-loading');
                                var client = new WebTorrent();
                                var torrentId = video.src;
                                client.add(torrentId, function (torrent) {
                                    var file = torrent.files.find(function (file) {
                                        return file.name.endsWith('.mp4');
                                    });
                                    file.renderTo(_this3.video, {
                                        autoplay: _this3.options.autoplay
                                    }, function () {
                                        _this3.container.classList.remove('y-player-loading');
                                    });
                                });
                            } else {
                                this.notice('Error: Webtorrent is not supported.');
                            }
                        } else {
                            this.notice('Error: Can\'t find Webtorrent.');
                        }
                        break;
                }
            }
        }
    }, {
        key: 'initVideo',
        value: function initVideo(video, type) {
            var _this4 = this;

            this.initMSE(video, type);

            /**
             * video events
             */
            // show video time: the metadata has loaded or changed
            this.on('durationchange', function () {
                // compatibility: Android browsers will output 1 or Infinity at first
                if (video.duration !== 1 && video.duration !== Infinity) {
                    _this4.template.dtime.innerHTML = _utils2.default.secondToTime(video.duration);
                }
            });

            // show video loaded bar: to inform interested parties of progress downloading the media
            this.on('progress', function () {
                var percentage = video.buffered.length ? video.buffered.end(video.buffered.length - 1) / video.duration : 0;
                _this4.bar.set('loaded', percentage, 'width');
            });

            // video download error: an error occurs
            this.on('error', function () {
                if (!_this4.video.error) {
                    // Not a video load error, may be poster load failed, see https://github.com/MoePlayer/DPlayer/issues/307
                    return;
                }
                _this4.tran && _this4.notice && _this4.type !== 'webtorrent' & _this4.notice(_this4.tran('Video load failed'), -1);
            });

            // video end
            this.on('ended', function () {
                _this4.bar.set('played', 1, 'width');
                _this4.pause();
            });

            this.on('play', function () {
                if (_this4.paused) {
                    _this4.play();
                }
            });

            this.on('pause', function () {
                if (!_this4.paused) {
                    _this4.pause();
                }
            });

            this.on('timeupdate', function () {
                _this4.bar.set('played', _this4.video.currentTime / _this4.video.duration, 'width');
                var currentTime = _utils2.default.secondToTime(_this4.video.currentTime);
                if (_this4.template.ptime.innerHTML !== currentTime) {
                    _this4.template.ptime.innerHTML = currentTime;
                }
            });

            var _loop = function _loop(i) {
                video.addEventListener(_this4.events.videoEvents[i], function () {
                    _this4.events.trigger(_this4.events.videoEvents[i]);
                });
            };

            for (var i = 0; i < this.events.videoEvents.length; i++) {
                _loop(i);
            }

            this.volume(this.user.get('volume'), true, true);
        }
    }, {
        key: 'switchQuality',
        value: function switchQuality(index) {
            var _this5 = this;

            if (this.qualityIndex === index || this.switchingQuality) {
                return;
            } else {
                this.qualityIndex = index;
            }
            this.switchingQuality = true;
            this.quality = this.options.video.quality[index];
            this.template.qualityButton.innerHTML = this.quality.name;

            var paused = this.video.paused;
            this.video.pause();
            var videoHTML = (0, _video2.default)({
                current: false,
                pic: null,
                screenshot: this.options.screenshot,
                preload: 'auto',
                url: this.quality.url,
                subtitle: this.options.subtitle
            });
            var videoEle = new DOMParser().parseFromString(videoHTML, 'text/html').body.firstChild;
            this.template.videoWrap.insertBefore(videoEle, this.template.videoWrap.getElementsByTagName('div')[0]);
            this.prevVideo = this.video;
            this.video = videoEle;
            this.initVideo(this.video, this.quality.type || this.options.video.type);
            this.seek(this.prevVideo.currentTime);
            this.notice(this.tran('Switching to') + ' ' + this.quality.name + ' ' + this.tran('quality'), -1);
            this.events.trigger('quality_start', this.quality);

            this.on('canplay', function () {
                if (_this5.prevVideo) {
                    if (_this5.video.currentTime !== _this5.prevVideo.currentTime) {
                        _this5.seek(_this5.prevVideo.currentTime);
                        return;
                    }
                    _this5.template.videoWrap.removeChild(_this5.prevVideo);
                    _this5.video.classList.add('y-player-video-current');
                    if (!paused) {
                        _this5.video.play();
                    }
                    _this5.prevVideo = null;
                    _this5.notice(_this5.tran('Switched to') + ' ' + _this5.quality.name + ' ' + _this5.tran('quality'));
                    _this5.switchingQuality = false;

                    _this5.events.trigger('quality_end');
                }
            });
        }
    }, {
        key: 'notice',
        value: function notice(text) {
            var _this6 = this;

            var time = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 2000;
            var opacity = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0.8;

            this.template.notice.innerHTML = text;
            this.template.notice.style.opacity = opacity;
            if (this.noticeTime) {
                clearTimeout(this.noticeTime);
            }
            this.events.trigger('notice_show', text);
            if (time > 0) {
                this.noticeTime = setTimeout(function () {
                    _this6.template.notice.style.opacity = 0;
                    _this6.events.trigger('notice_hide');
                }, time);
            }
        }
    }, {
        key: 'resize',
        value: function resize() {
            this.events.trigger('resize');
        }
    }, {
        key: 'speed',
        value: function speed(rate) {
            this.video.playbackRate = rate;
        }
    }, {
        key: 'destroy',
        value: function destroy() {
            instances.splice(instances.indexOf(this), 1);
            this.pause();
            this.controller.destroy();
            this.timer.destroy();
            this.video.src = '';
            this.container.innerHTML = '';
            this.events.trigger('destroy');
        }
    }], [{
        key: 'version',
        get: function get() {
            /* global Y_PLAYER_VERSION */
            return "1.0.0";
        }
    }]);

    return Player;
}();

exports.default = Player;

/***/ }),

/***/ "./src/js/setting.js":
/*!***************************!*\
  !*** ./src/js/setting.js ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Setting = function () {
    function Setting(player) {
        var _this = this;

        _classCallCheck(this, Setting);

        this.player = player;

        this.player.template.mask.addEventListener('click', function () {
            _this.hide();
        });
        this.player.template.settingButton.addEventListener('click', function () {
            _this.show();
        });

        // speed
        this.player.template.speed.addEventListener('click', function () {
            _this.player.template.settingBox.classList.add('y-player-setting-box-narrow');
            _this.player.template.settingBox.classList.add('y-player-setting-box-speed');
        });

        var _loop = function _loop(i) {
            _this.player.template.speedItem[i].addEventListener('click', function () {
                _this.player.speed(_this.player.template.speedItem[i].dataset.speed);
                _this.hide();
            });
        };

        for (var i = 0; i < this.player.template.speedItem.length; i++) {
            _loop(i);
        }
    }

    _createClass(Setting, [{
        key: 'hide',
        value: function hide() {
            var _this2 = this;

            this.player.template.settingBox.classList.remove('y-player-setting-box-open');
            this.player.template.mask.classList.remove('y-player-mask-show');
            setTimeout(function () {
                _this2.player.template.settingBox.classList.remove('y-player-setting-box-narrow');
                _this2.player.template.settingBox.classList.remove('y-player-setting-box-speed');
            }, 300);

            this.player.controller.disableAutoHide = false;
        }
    }, {
        key: 'show',
        value: function show() {
            this.player.template.settingBox.classList.add('y-player-setting-box-open');
            this.player.template.mask.classList.add('y-player-mask-show');

            this.player.controller.disableAutoHide = true;
        }
    }]);

    return Setting;
}();

exports.default = Setting;

/***/ }),

/***/ "./src/js/template.js":
/*!****************************!*\
  !*** ./src/js/template.js ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _icons = __webpack_require__(/*! ./icons */ "./src/js/icons.js");

var _icons2 = _interopRequireDefault(_icons);

var _player = __webpack_require__(/*! ../templates/player.art */ "./src/templates/player.art");

var _player2 = _interopRequireDefault(_player);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Template = function () {
    function Template(options) {
        _classCallCheck(this, Template);

        this.container = options.container;
        this.options = options.options;
        this.index = options.index;
        this.tran = options.tran;
        this.init();
    }

    _createClass(Template, [{
        key: 'init',
        value: function init() {
            this.container.innerHTML = (0, _player2.default)({
                options: this.options,
                index: this.index,
                tran: this.tran,
                icons: _icons2.default,
                video: {
                    current: true,
                    pic: this.options.video.pic,
                    preload: this.options.preload,
                    url: this.options.video.url
                }
            });

            this.volumeBar = this.container.querySelector('.y-player-volume-bar-inner');
            this.volumeBarWrap = this.container.querySelector('.y-player-volume-bar');
            this.volumeBarWrapWrap = this.container.querySelector('.y-player-volume-bar-wrap');
            this.volumeButton = this.container.querySelector('.y-player-volume');
            this.volumeButtonIcon = this.container.querySelector('.y-player-volume-icon');
            this.volumeIcon = this.container.querySelector('.y-player-volume-icon .y-player-icon-content');
            this.playedBar = this.container.querySelector('.y-player-played');
            this.loadedBar = this.container.querySelector('.y-player-loaded');
            this.playedBarWrap = this.container.querySelector('.y-player-bar-wrap');
            this.playedBarTime = this.container.querySelector('.y-player-bar-time');
            this.video = this.container.querySelector('.y-player-video-current');
            this.bezel = this.container.querySelector('.y-player-bezel-icon');
            this.playButton = this.container.querySelector('.y-player-play-icon');
            this.videoWrap = this.container.querySelector('.y-player-video-wrap');
            this.controllerMask = this.container.querySelector('.y-player-controller-mask');
            this.ptime = this.container.querySelector('.y-player-ptime');
            this.settingButton = this.container.querySelector('.y-player-setting-icon');
            this.settingBox = this.container.querySelector('.y-player-setting-box');
            this.mask = this.container.querySelector('.y-player-mask');
            this.speed = this.container.querySelector('.y-player-setting-speed');
            this.speedItem = this.container.querySelectorAll('.y-player-setting-speed-item');
            this.dtime = this.container.querySelector('.y-player-dtime');
            this.controller = this.container.querySelector('.y-player-controller');
            this.browserFullButton = this.container.querySelector('.y-player-full-icon');
            this.webFullButton = this.container.querySelector('.y-player-full-in-icon');
            this.menu = this.container.querySelector('.y-player-menu');
            this.menuItem = this.container.querySelectorAll('.y-player-menu-item');
            this.qualityList = this.container.querySelector('.y-player-quality-list');
            this.qualityButton = this.container.querySelector('.y-player-quality-icon');
            this.barPreview = this.container.querySelector('.y-player-bar-preview');
            this.barWrap = this.container.querySelector('.y-player-bar-wrap');
            this.notice = this.container.querySelector('.y-player-notice');
            this.infoPanel = this.container.querySelector('.y-player-info-panel');
            this.infoPanelClose = this.container.querySelector('.y-player-info-panel-close');
            this.infoVersion = this.container.querySelector('.y-player-info-panel-item-version .y-player-info-panel-item-data');
            this.infoFPS = this.container.querySelector('.y-player-info-panel-item-fps .y-player-info-panel-item-data');
            this.infoType = this.container.querySelector('.y-player-info-panel-item-type .y-player-info-panel-item-data');
            this.infoUrl = this.container.querySelector('.y-player-info-panel-item-url .y-player-info-panel-item-data');
            this.infoResolution = this.container.querySelector('.y-player-info-panel-item-resolution .y-player-info-panel-item-data');
            this.infoDuration = this.container.querySelector('.y-player-info-panel-item-duration .y-player-info-panel-item-data');
        }
    }]);

    return Template;
}();

exports.default = Template;

/***/ }),

/***/ "./src/js/thumbnails.js":
/*!******************************!*\
  !*** ./src/js/thumbnails.js ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Thumbnails = function () {
    function Thumbnails(options) {
        _classCallCheck(this, Thumbnails);

        this.container = options.container;
        this.barWidth = options.barWidth;
        this.container.style.backgroundImage = 'url(\'' + options.url + '\')';
        this.events = options.events;
    }

    _createClass(Thumbnails, [{
        key: 'resize',
        value: function resize(width, height) {
            this.container.style.width = width + 'px';
            this.container.style.height = height + 'px';
            this.container.style.top = -height + 2 + 'px';
        }
    }, {
        key: 'show',
        value: function show() {
            this.container.style.display = 'block';
            this.events && this.events.trigger('thumbnails_show');
        }
    }, {
        key: 'move',
        value: function move(position) {
            this.container.style.backgroundPosition = '-' + (Math.ceil(position / this.barWidth * 100) - 1) * 160 + 'px 0';
            this.container.style.left = Math.min(Math.max(position - this.container.offsetWidth / 2, -10), this.barWidth - 150) + 'px';
        }
    }, {
        key: 'hide',
        value: function hide() {
            this.container.style.display = 'none';
            this.events && this.events.trigger('thumbnails_hide');
        }
    }]);

    return Thumbnails;
}();

exports.default = Thumbnails;

/***/ }),

/***/ "./src/js/timer.js":
/*!*************************!*\
  !*** ./src/js/timer.js ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Timer = function () {
    function Timer(player) {
        _classCallCheck(this, Timer);

        this.player = player;

        window.requestAnimationFrame = function () {
            return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function (callback) {
                window.setTimeout(callback, 1000 / 60);
            };
        }();

        this.types = ['loading', 'info', 'fps'];

        this.init();
    }

    _createClass(Timer, [{
        key: 'init',
        value: function init() {
            var _this = this;

            this.types.map(function (item) {
                if (item !== 'fps') {
                    _this['init' + item + 'Checker']();
                }
                return item;
            });
        }
    }, {
        key: 'initloadingChecker',
        value: function initloadingChecker() {
            var _this2 = this;

            var lastPlayPos = 0;
            var currentPlayPos = 0;
            var bufferingDetected = false;
            this.loadingChecker = setInterval(function () {
                if (_this2.enableloadingChecker) {
                    // whether the video is buffering
                    currentPlayPos = _this2.player.video.currentTime;
                    if (!bufferingDetected && currentPlayPos === lastPlayPos && !_this2.player.video.paused) {
                        _this2.player.container.classList.add('y-player-loading');
                        bufferingDetected = true;
                    }
                    if (bufferingDetected && currentPlayPos > lastPlayPos && !_this2.player.video.paused) {
                        _this2.player.container.classList.remove('y-player-loading');
                        bufferingDetected = false;
                    }
                    lastPlayPos = currentPlayPos;
                }
            }, 100);
        }
    }, {
        key: 'initfpsChecker',
        value: function initfpsChecker() {
            var _this3 = this;

            window.requestAnimationFrame(function () {
                if (_this3.enablefpsChecker) {
                    _this3.initfpsChecker();
                    if (!_this3.fpsStart) {
                        _this3.fpsStart = new Date();
                        _this3.fpsIndex = 0;
                    } else {
                        _this3.fpsIndex++;
                        var fpsCurrent = new Date();
                        if (fpsCurrent - _this3.fpsStart > 1000) {
                            _this3.player.infoPanel.fps(_this3.fpsIndex / (fpsCurrent - _this3.fpsStart) * 1000);
                            _this3.fpsStart = new Date();
                            _this3.fpsIndex = 0;
                        }
                    }
                } else {
                    _this3.fpsStart = 0;
                    _this3.fpsIndex = 0;
                }
            });
        }
    }, {
        key: 'initinfoChecker',
        value: function initinfoChecker() {
            var _this4 = this;

            this.infoChecker = setInterval(function () {
                if (_this4.enableinfoChecker) {
                    _this4.player.infoPanel.update();
                }
            }, 1000);
        }
    }, {
        key: 'enable',
        value: function enable(type) {
            this['enable' + type + 'Checker'] = true;

            if (type === 'fps') {
                this.initfpsChecker();
            }
        }
    }, {
        key: 'disable',
        value: function disable(type) {
            this['enable' + type + 'Checker'] = false;
        }
    }, {
        key: 'destroy',
        value: function destroy() {
            var _this5 = this;

            this.types.map(function (item) {
                _this5['enable' + item + 'Checker'] = false;
                _this5[item + 'Checker'] && clearInterval(_this5[item + 'Checker']);
                return item;
            });
        }
    }]);

    return Timer;
}();

exports.default = Timer;

/***/ }),

/***/ "./src/js/user.js":
/*!************************!*\
  !*** ./src/js/user.js ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _utils = __webpack_require__(/*! ./utils */ "./src/js/utils.js");

var _utils2 = _interopRequireDefault(_utils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var User = function () {
    function User(player) {
        _classCallCheck(this, User);

        this.storageName = {
            volume: 'y-player-volume'
        };
        this.default = {
            volume: player.options.hasOwnProperty('volume') ? player.options.volume : 0.5
        };
        this.data = {};

        this.init();
    }

    _createClass(User, [{
        key: 'init',
        value: function init() {
            for (var item in this.storageName) {
                var name = this.storageName[item];
                this.data[item] = parseFloat(_utils2.default.storage.get(name) || this.default[item]);
            }
        }
    }, {
        key: 'get',
        value: function get(key) {
            return this.data[key];
        }
    }, {
        key: 'set',
        value: function set(key, value) {
            this.data[key] = value;
            _utils2.default.storage.set(this.storageName[key], value);
        }
    }]);

    return User;
}();

exports.default = User;

/***/ }),

/***/ "./src/js/utils.js":
/*!*************************!*\
  !*** ./src/js/utils.js ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
var isMobile = /mobile/i.test(window.navigator.userAgent);

var utils = {

    /**
     * Parse second to time string
     *
     * @param {Number} second
     * @return {String} 00:00 or 00:00:00
     */
    secondToTime: function secondToTime(second) {
        var add0 = function add0(num) {
            return num < 10 ? '0' + num : '' + num;
        };
        var hour = Math.floor(second / 3600);
        var min = Math.floor((second - hour * 3600) / 60);
        var sec = Math.floor(second - hour * 3600 - min * 60);
        return (hour > 0 ? [hour, min, sec] : [min, sec]).map(add0).join(':');
    },

    /**
     * control play progress
     */
    // get element's view position
    getElementViewLeft: function getElementViewLeft(element) {
        var actualLeft = element.offsetLeft;
        var current = element.offsetParent;
        var elementScrollLeft = document.body.scrollLeft + document.documentElement.scrollLeft;
        if (!document.fullscreenElement && !document.mozFullScreenElement && !document.webkitFullscreenElement) {
            while (current !== null) {
                actualLeft += current.offsetLeft;
                current = current.offsetParent;
            }
        } else {
            while (current !== null && current !== element) {
                actualLeft += current.offsetLeft;
                current = current.offsetParent;
            }
        }
        return actualLeft - elementScrollLeft;
    },

    /**
     * optimize control play progress
     * optimize get element's view position,for float dialog video player
     * getBoundingClientRect 在 IE8 及以下返回的值缺失 width、height 值
     * getBoundingClientRect 在 Firefox 11 及以下返回的值会把 transform 的值也包含进去
     * getBoundingClientRect 在 Opera 10.5 及以下返回的值缺失 width、height 值
     */
    getBoundingClientRectViewLeft: function getBoundingClientRectViewLeft(element) {
        var scrollTop = document.documentElement.scrollTop;

        if (element.getBoundingClientRect) {
            if (typeof this.getBoundingClientRectViewLeft.offset !== 'number') {
                var temp = document.createElement('div');
                temp.style.cssText = 'position:absolute;top:0;left:0;';
                document.body.appendChild(temp);
                this.getBoundingClientRectViewLeft.offset = -temp.getBoundingClientRect().top - scrollTop;
                document.body.removeChild(temp);
                temp = null;
            }
            var rect = element.getBoundingClientRect();
            var offset = this.getBoundingClientRectViewLeft.offset;

            return rect.left + offset;
        } else {
            // not support getBoundingClientRect
            return this.getElementViewLeft(element);
        }
    },
    getScrollPosition: function getScrollPosition() {
        return {
            left: window.pageXOffset || document.documentElement.scrollLeft || document.body.scrollLeft || 0,
            top: window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0
        };
    },
    setScrollPosition: function setScrollPosition(_ref) {
        var _ref$left = _ref.left,
            left = _ref$left === undefined ? 0 : _ref$left,
            _ref$top = _ref.top,
            top = _ref$top === undefined ? 0 : _ref$top;

        if (this.isFirefox) {
            document.documentElement.scrollLeft = left;
            document.documentElement.scrollTop = top;
        } else {
            window.scrollTo(left, top);
        }
    },


    isMobile: isMobile,

    isFirefox: /firefox/i.test(window.navigator.userAgent),

    isChrome: /chrome/i.test(window.navigator.userAgent),

    storage: {
        set: function set(key, value) {
            localStorage.setItem(key, value);
        },

        get: function get(key) {
            return localStorage.getItem(key);
        }
    },

    cumulativeOffset: function cumulativeOffset(element) {
        var top = 0,
            left = 0;
        do {
            top += element.offsetTop || 0;
            left += element.offsetLeft || 0;
            element = element.offsetParent;
        } while (element);

        return {
            top: top,
            left: left
        };
    },

    nameMap: {
        dragStart: isMobile ? 'touchstart' : 'mousedown',
        dragMove: isMobile ? 'touchmove' : 'mousemove',
        dragEnd: isMobile ? 'touchend' : 'mouseup'
    }
};

exports.default = utils;

/***/ }),

/***/ "./src/scss/index.scss":
/*!*****************************!*\
  !*** ./src/scss/index.scss ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(/*! !../../node_modules/css-loader??ref--6-1!../../node_modules/postcss-loader/src??ref--6-2!../../node_modules/sass-loader/lib/loader.js!./index.scss */ "./node_modules/css-loader/index.js?!./node_modules/postcss-loader/src/index.js?!./node_modules/sass-loader/lib/loader.js!./src/scss/index.scss");

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(/*! ../../node_modules/style-loader/lib/addStyles.js */ "./node_modules/style-loader/lib/addStyles.js")(content, options);

if(content.locals) module.exports = content.locals;

if(false) {}

/***/ }),

/***/ "./src/templates/player.art":
/*!**********************************!*\
  !*** ./src/templates/player.art ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var $imports = __webpack_require__(/*! ../../node_modules/art-template/lib/runtime.js */ "./node_modules/art-template/lib/runtime.js");
module.exports = function ($data) {
    'use strict';
    $data = $data || {};
    var $$out = '', $$blocks = arguments[1] || {}, include = function (content) {
            $$out += content;
            return $$out;
        }, video = $data.video, options = $data.options, $escape = $imports.$escape, icons = $data.icons, $each = $imports.$each, $value = $data.$value, $index = $data.$index, tran = $data.tran;
    $$out += '<div class="y-player-mask"></div>\n<div class="y-player-video-wrap">\n    ';
    include(__webpack_require__(/*! ./video.art */ "./src/templates/video.art")(video));
    $$out += '\n    ';
    if (options.logo) {
        $$out += '\n    <div class="y-player-logo">\n        <img src="';
        $$out += $escape(options.logo);
        $$out += '">\n    </div>\n    ';
    }
    $$out += '\n    <div class="y-player-bezel">\n        <span class="y-player-bezel-icon"></span>\n        <span class="y-player-loading-icon">';
    $$out += icons.loading;
    $$out += '</span>\n    </div>\n</div>\n<div class="y-player-controller-mask"></div>\n<div class="y-player-controller">\n    <div class="y-player-icons y-player-icons-left">\n        <button class="y-player-icon y-player-play-icon">\n            <span class="y-player-icon-content">';
    $$out += icons.play;
    $$out += '</span>\n        </button>\n        <div class="y-player-volume">\n            <button class="y-player-icon y-player-volume-icon">\n                <span class="y-player-icon-content">';
    $$out += icons.volumeDown;
    $$out += '</span>\n            </button>\n            <div class="y-player-volume-bar-wrap" data-balloon-pos="up">\n                <div class="y-player-volume-bar">\n                    <div class="y-player-volume-bar-inner" style="background: ';
    $$out += $escape(options.theme.volume);
    $$out += ';">\n                        <span class="y-player-thumb" style="background: ';
    $$out += $escape(options.theme.volume);
    $$out += '"></span>\n                    </div>\n                </div>\n            </div>\n        </div>\n        <span class="y-player-time">\n            <span class="y-player-ptime">00:00</span> / <span class="y-player-dtime">00:00</span>\n        </span>\n    </div>\n    <div class="y-player-icons y-player-icons-right">\n        ';
    if (options.video.quality) {
        $$out += '\n        <div class="y-player-quality">\n            <button class="y-player-icon y-player-quality-icon">';
        $$out += $escape(options.video.quality[options.video.defaultQuality].name);
        $$out += '</button>\n            <div class="y-player-quality-mask">\n                <div class="y-player-quality-list">\n                ';
        $each(options.video.quality, function ($value, $index) {
            $$out += '\n                    <div class="y-player-quality-item" data-index="';
            $$out += $escape($index);
            $$out += '">';
            $$out += $escape($value.name);
            $$out += '</div>\n                ';
        });
        $$out += '\n                </div>\n            </div>\n        </div>\n        ';
    }
    $$out += '\n        <div class="y-player-setting">\n            <button class="y-player-icon y-player-setting-icon" data-balloon="';
    $$out += $escape(tran('Setting'));
    $$out += '" data-balloon-pos="up">\n                <span class="y-player-icon-content">';
    $$out += icons.setting;
    $$out += '</span>\n            </button>\n            <div class="y-player-setting-box">\n                <div class="y-player-setting-origin-panel">\n                    <div class="y-player-setting-item y-player-setting-speed">\n                        <span class="y-player-label">';
    $$out += $escape(tran('Speed'));
    $$out += '</span>\n                        <div class="y-player-toggle">';
    $$out += icons.right;
    $$out += '</div>\n                    </div>\n                </div>\n                <div class="y-player-setting-speed-panel">\n                    <div class="y-player-setting-speed-item" data-speed="0.5">\n                        <span class="y-player-label">0.5</span>\n                    </div>\n                    <div class="y-player-setting-speed-item" data-speed="0.75">\n                        <span class="y-player-label">0.75</span>\n                    </div>\n                    <div class="y-player-setting-speed-item" data-speed="1">\n                        <span class="y-player-label">';
    $$out += $escape(tran('Normal'));
    $$out += '</span>\n                    </div>\n                    <div class="y-player-setting-speed-item" data-speed="1.25">\n                        <span class="y-player-label">1.25</span>\n                    </div>\n                    <div class="y-player-setting-speed-item" data-speed="1.5">\n                        <span class="y-player-label">1.5</span>\n                    </div>\n                    <div class="y-player-setting-speed-item" data-speed="2">\n                        <span class="y-player-label">2</span>\n                    </div>\n                </div>\n            </div>\n        </div>\n        <div class="y-player-full">\n            <button class="y-player-icon y-player-full-in-icon" data-balloon="';
    $$out += $escape(tran('Web full screen'));
    $$out += '" data-balloon-pos="up">\n                <span class="y-player-icon-content">';
    $$out += icons.fullWeb;
    $$out += '</span>\n            </button>\n            <button class="y-player-icon y-player-full-icon" data-balloon="';
    $$out += $escape(tran('Full screen'));
    $$out += '" data-balloon-pos="up">\n                <span class="y-player-icon-content">';
    $$out += icons.full;
    $$out += '</span>\n            </button>\n        </div>\n    </div>\n    <div class="y-player-bar-wrap">\n        <div class="y-player-bar-time hidden">00:00</div>\n        <div class="y-player-bar-preview"></div>\n        <div class="y-player-bar">\n            <div class="y-player-loaded" style="width: 0;"></div>\n            <div class="y-player-played" style="width: 0; background: ';
    $$out += $escape(options.theme.bar);
    $$out += '">\n                <span class="y-player-thumb" style="background: ';
    $$out += $escape(options.theme.bar);
    $$out += '"></span>\n            </div>\n        </div>\n    </div>\n</div>\n<div class="y-player-info-panel y-player-info-panel-hide">\n    <div class="y-player-info-panel-close">[x]</div>\n    <div class="y-player-info-panel-item y-player-info-panel-item-version">\n        <span class="y-player-info-panel-item-title">Player version</span>\n        <span class="y-player-info-panel-item-data"></span>\n    </div>\n    <div class="y-player-info-panel-item y-player-info-panel-item-fps">\n        <span class="y-player-info-panel-item-title">Player FPS</span>\n        <span class="y-player-info-panel-item-data"></span>\n    </div>\n    <div class="y-player-info-panel-item y-player-info-panel-item-type">\n        <span class="y-player-info-panel-item-title">Video type</span>\n        <span class="y-player-info-panel-item-data"></span>\n    </div>\n    <div class="y-player-info-panel-item y-player-info-panel-item-url">\n        <span class="y-player-info-panel-item-title">Video url</span>\n        <span class="y-player-info-panel-item-data"></span>\n    </div>\n    <div class="y-player-info-panel-item y-player-info-panel-item-resolution">\n        <span class="y-player-info-panel-item-title">Video resolution</span>\n        <span class="y-player-info-panel-item-data"></span>\n    </div>\n    <div class="y-player-info-panel-item y-player-info-panel-item-duration">\n        <span class="y-player-info-panel-item-title">Video duration</span>\n        <span class="y-player-info-panel-item-data"></span>\n    </div>\n</div>\n<div class="y-player-menu">\n    ';
    $each(options.contextmenu, function ($value, $index) {
        $$out += '\n        <div class="y-player-menu-item">\n            <a';
        if ($value.link) {
            $$out += ' target="_blank"';
        }
        $$out += ' href="';
        $$out += $escape($value.link || 'javascript:void(0);');
        $$out += '">';
        $$out += $escape(tran($value.text));
        $$out += '</a>\n        </div>\n    ';
    });
    $$out += '\n</div>\n<div class="y-player-notice"></div>';
    return $$out;
};

/***/ }),

/***/ "./src/templates/video.art":
/*!*********************************!*\
  !*** ./src/templates/video.art ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var $imports = __webpack_require__(/*! ../../node_modules/art-template/lib/runtime.js */ "./node_modules/art-template/lib/runtime.js");
module.exports = function ($data) {
    'use strict';
    $data = $data || {};
    var $$out = '', current = $data.current, pic = $data.pic, $escape = $imports.$escape, preload = $data.preload, url = $data.url;
    $$out += '<video class="y-player-video';
    if (current) {
        $$out += ' y-player-video-current';
    }
    $$out += '" webkit-playsinline playsinline';
    if (pic) {
        $$out += ' poster="';
        $$out += $escape(pic);
        $$out += '"';
    }
    if (preload) {
        $$out += ' preload="';
        $$out += $escape(preload);
        $$out += '"';
    }
    if (url) {
        $$out += ' src="';
        $$out += $escape(url);
        $$out += '"';
    }
    $$out += '></video>';
    return $$out;
};

/***/ })

/******/ })["default"];
});
//# sourceMappingURL=player.js.map