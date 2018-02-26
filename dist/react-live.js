(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('prismjs/components/prism-core'), require('prismjs/components/prism-clike'), require('prismjs/components/prism-javascript'), require('prismjs/components/prism-markup'), require('prismjs/components/prism-jsx'), require('unescape'), require('dom-iterator'), require('react'), require('core-js/fn/object/assign'), require('prop-types')) :
	typeof define === 'function' && define.amd ? define(['exports', 'prismjs/components/prism-core', 'prismjs/components/prism-clike', 'prismjs/components/prism-javascript', 'prismjs/components/prism-markup', 'prismjs/components/prism-jsx', 'unescape', 'dom-iterator', 'react', 'core-js/fn/object/assign', 'prop-types'], factory) :
	(factory((global.ReactLive = {}),global.prismCore,null,null,null,null,global.unescape,global.iterator,global.React,global.assign,global.PropTypes));
}(this, (function (exports,prismCore,prismClike,prismJavascript,prismMarkup,prismJsx,unescape,iterator,React,assign,PropTypes) { 'use strict';

unescape = unescape && unescape.hasOwnProperty('default') ? unescape['default'] : unescape;
iterator = iterator && iterator.hasOwnProperty('default') ? iterator['default'] : iterator;
var React__default = 'default' in React ? React['default'] : React;
assign = assign && assign.hasOwnProperty('default') ? assign['default'] : assign;
PropTypes = PropTypes && PropTypes.hasOwnProperty('default') ? PropTypes['default'] : PropTypes;

var cn = function cn() {
  for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }

  return args.filter(Boolean).join(' ');
};

var prism = function prism(code) {
  var language = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'jsx';
  return prismCore.highlight(code, prismCore.languages[language]);
};

var indentRe = /^((\t|  )+)/mg;
var tabRe = /\t/g;

var normalizeCode = function normalizeCode(code) {
  return code.replace(indentRe, function (_, indentation) {
    return indentation.replace(tabRe, '  ');
  });
};

var normalizeHtml = function normalizeHtml(html) {
  return html.replace('\n', '<br>');
};

var htmlToPlain = function htmlToPlain(html) {
  return unescape(html.replace(/<br>/gm, '\n').replace(/<\/?[^>]*>/gm, ''));
};

function position(el, pos) {
  var selection = window.getSelection();

  if (1 == arguments.length) {
    if (!selection.rangeCount) return;
    var indexes = {};
    var range = selection.getRangeAt(0);
    var clone = range.cloneRange();
    clone.selectNodeContents(el);
    clone.setEnd(range.endContainer, range.endOffset);
    indexes.end = clone.toString().length;
    clone.setStart(range.startContainer, range.startOffset);
    indexes.start = indexes.end - clone.toString().length;
    indexes.atStart = clone.startOffset === 0;
    indexes.commonAncestorContainer = clone.commonAncestorContainer;
    indexes.endContainer = clone.endContainer;
    indexes.startContainer = clone.startContainer;
    return indexes;
  }

  var setSelection = pos.end && pos.end !== pos.start;
  var length = 0;
  var range = document.createRange();
  var it = iterator(el).select(Node.TEXT_NODE).revisit(false);
  var next;
  var startindex;
  var start = pos.start > el.textContent.length ? el.textContent.length : pos.start;
  var end = pos.end > el.textContent.length ? el.textContent.length : pos.end;
  var atStart = pos.atStart;

  while (next = it.next()) {
    var olen = length;
    length += next.textContent.length;

    // Set start point of selection
    var atLength = atStart ? length > start : length >= start;
    if (!startindex && atLength) {
      startindex = true;
      range.setStart(next, start - olen);
      if (!setSelection) {
        range.collapse(true);
        makeSelection(el, range);
        break;
      }
    }

    // Set end point of selection
    if (setSelection && length >= end) {
      range.setEnd(next, end - olen);
      makeSelection(el, range);
      break;
    }
  }
}

function makeSelection(el, range) {
  var selection = window.getSelection();
  el.focus();
  selection.removeAllRanges();
  selection.addRange(range);
}

var getLine = function getLine(plain, cursorPos) {
  var startSlice = plain.slice(0, cursorPos);
  var lastNewline = startSlice.lastIndexOf('\n') + 1;
  var lineSlice = startSlice.slice(lastNewline);
  return lineSlice;
};

var indentRe$1 = /^\s+/;

var getIndent = function getIndent(plain, cursorPos) {
  var line = getLine(plain, cursorPos);
  var matches = line.match(indentRe$1);
  if (matches === null) {
    return '';
  }

  return matches[0] || '';
};

var deindentSpacesRe = /^(\t|  )*  $/;

var getDeindentLevel = function getDeindentLevel(plain, cursorPos) {
  var line = getLine(plain, cursorPos);
  if (!deindentSpacesRe.test(line)) {
    return 0; // Doesn't match regex, so normal behaviour can apply
  }

  // The line contains only whitespace indentation
  // thus two characters must be deleted
  return 2;
};

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
  return typeof obj;
} : function (obj) {
  return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
};











var classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};









var _extends = Object.assign || function (target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];

    for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }

  return target;
};



var inherits = function (subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
};









var objectWithoutProperties = function (obj, keys) {
  var target = {};

  for (var i in obj) {
    if (keys.indexOf(i) >= 0) continue;
    if (!Object.prototype.hasOwnProperty.call(obj, i)) continue;
    target[i] = obj[i];
  }

  return target;
};

var possibleConstructorReturn = function (self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return call && (typeof call === "object" || typeof call === "function") ? call : self;
};

var Editor = function (_Component) {
  inherits(Editor, _Component);

  function Editor() {
    var _temp, _this, _ret;

    classCallCheck(this, Editor);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = possibleConstructorReturn(this, _Component.call.apply(_Component, [this].concat(args))), _this), _this.undoStack = [], _this.undoOffset = 0, _this.undoTimestamp = 0, _this.compositing = false, _this.state = {
      html: ''
    }, _this.onRef = function (node) {
      _this.ref = node;
    }, _this.getPlain = function () {
      if (_this._innerHTML === _this.ref.innerHTML) {
        return _this._plain;
      }

      var plain = htmlToPlain(normalizeHtml(_this.ref.innerHTML));

      _this._plain = plain;
      _this._innerHTML = _this.ref.innerHTML;

      return _this._plain;
    }, _this.recordChange = function (plain, selection) {
      if (plain === _this.undoStack[_this.undoStack.length - 1]) {
        return;
      }

      if (_this.undoOffset > 0) {
        _this.undoStack = _this.undoStack.slice(0, -_this.undoOffset);
        _this.undoOffset = 0;
      }

      var timestamp = Date.now();
      var record = { plain: plain, selection: selection

        // Overwrite last record if threshold is not crossed
      };if (timestamp - _this.undoTimestamp < 3000) {
        _this.undoStack[_this.undoStack.length - 1] = record;
      } else {
        _this.undoStack.push(record);

        if (_this.undoStack.length > 50) {
          _this.undoStack.shift();
        }
      }

      _this.undoTimestamp = timestamp;
    }, _this.updateContent = function (plain) {
      if (_this.compositing) {
        return;
      }
      _this.setState({ html: prism(plain, _this.props.language) });

      if (_this.props.onChange) {
        _this.props.onChange(plain);
      }
    }, _this.restoreStackState = function (offset) {
      var _this$undoStack = _this.undoStack[_this.undoStack.length - 1 - offset],
          plain = _this$undoStack.plain,
          selection = _this$undoStack.selection;


      _this.selection = selection;
      _this.undoOffset = offset;
      _this.updateContent(plain);
    }, _this.undo = function () {
      var offset = _this.undoOffset + 1;
      if (offset >= _this.undoStack.length) {
        return;
      }

      _this.restoreStackState(offset);
    }, _this.redo = function () {
      var offset = _this.undoOffset - 1;
      if (offset < 0) {
        return;
      }

      _this.restoreStackState(offset);
    }, _this.onKeyDown = function (evt) {
      if (_this.props.onKeyDown) {
        _this.props.onKeyDown(evt);
      }

      if (evt.keyCode === 9 && !_this.props.ignoreTabKey) {
        // Tab Key
        document.execCommand('insertHTML', false, '  ');
        evt.preventDefault();
      } else if (evt.keyCode === 8) {
        // Backspace Key
        var _selectionRange = position(_this.ref),
            cursorPos = _selectionRange.start,
            cursorEndPos = _selectionRange.end;

        if (cursorPos !== cursorEndPos) {
          return; // Bail on selections
        }

        var deindent = getDeindentLevel(_this.getPlain(), cursorPos);
        if (deindent <= 0) {
          return; // Bail when deindent level defaults to 0
        }

        // Delete chars `deindent` times
        for (var i = 0; i < deindent; i++) {
          document.execCommand('delete', false);
        }

        evt.preventDefault();
      } else if (evt.keyCode === 13) {
        // Enter Key
        var _selectionRange2 = position(_this.ref),
            _cursorPos = _selectionRange2.start;

        var indentation = getIndent(_this.getPlain(), _cursorPos);
        document.execCommand('insertHTML', false, '\n' + indentation);
        evt.preventDefault();
      } else if (
      // Undo / Redo
      evt.keyCode === 90 && evt.metaKey !== evt.ctrlKey && !evt.altKey) {
        if (evt.shiftKey) {
          _this.redo();
        } else {
          _this.undo();
        }

        evt.preventDefault();
      }
    }, _this.onKeyUp = function (evt) {
      if (_this.props.onKeyUp) {
        _this.props.onKeyUp(evt);
      }
      if (evt.keyCode === 91 || // left cmd
      evt.keyCode === 93 || // right cmd
      evt.ctrlKey || evt.metaKey) {
        return;
      }

      // Enter key
      if (evt.keyCode === 13) {
        _this.undoTimestamp = 0;
      }

      _this.selection = position(_this.ref);

      if (evt.keyCode !== 37 && // left
      evt.keyCode !== 38 && // up
      evt.keyCode !== 39 && // right
      evt.keyCode !== 40 // down
      ) {
          var plain = _this.getPlain();

          _this.recordChange(plain, _this.selection);
          _this.updateContent(plain);
        } else {
        _this.undoTimestamp = 0;
      }
    }, _this.onCompositionStart = function (evt) {
      if (_this.props.onCompositionStart) {
        _this.props.onCompositionStart(evt);
      }
      _this.compositing = true;
    }, _this.onCompositionEnd = function (evt) {
      if (_this.props.onCompositionEnd) {
        _this.props.onCompositionEnd(evt);
      }
      _this.compositing = false;
    }, _this.onClick = function (evt) {
      if (_this.props.onClick) {
        _this.props.onClick(evt);
      }
      _this.undoTimestamp = 0; // Reset timestamp
      _this.selection = position(_this.ref);
    }, _temp), possibleConstructorReturn(_this, _ret);
  }

  Editor.prototype.componentWillMount = function componentWillMount() {
    var html = prism(normalizeCode(this.props.code), this.props.language);
    this.setState({ html: html });
  };

  Editor.prototype.componentDidMount = function componentDidMount() {
    this.recordChange(this.getPlain());
    this.undoTimestamp = 0; // Reset timestamp
  };

  Editor.prototype.componentWillReceiveProps = function componentWillReceiveProps(_ref) {
    var code = _ref.code,
        language = _ref.language;

    if (code !== this.props.code || language !== this.props.language) {
      var html = prism(normalizeCode(code), language);
      this.setState({ html: html });
    }
  };

  Editor.prototype.componentDidUpdate = function componentDidUpdate() {
    var selection = this.selection;

    if (selection) {
      position(this.ref, selection);
    }
  };

  Editor.prototype.render = function render() {
    var _props = this.props,
        contentEditable = _props.contentEditable,
        className = _props.className,
        style = _props.style,
        code = _props.code,
        ignoreTabKey = _props.ignoreTabKey,
        language = _props.language,
        rest = objectWithoutProperties(_props, ['contentEditable', 'className', 'style', 'code', 'ignoreTabKey', 'language']);
    var html = this.state.html;


    return React__default.createElement('pre', _extends({}, rest, {
      ref: this.onRef,
      className: cn('prism-code', className),
      style: style,
      spellCheck: 'false',
      contentEditable: contentEditable,
      onCompositionEnd: contentEditable ? this.onCompositionEnd : undefined,
      onCompositionStart: contentEditable ? this.onCompositionStart : undefined,
      onKeyDown: contentEditable ? this.onKeyDown : undefined,
      onKeyUp: contentEditable ? this.onKeyUp : undefined,
      onClick: contentEditable ? this.onClick : undefined,
      dangerouslySetInnerHTML: { __html: html }
    }));
  };

  return Editor;
}(React.Component);

Editor.defaultProps = {
  contentEditable: true,
  language: 'jsx'
};

var commonjsGlobal = typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};



function unwrapExports (x) {
	return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
}

function createCommonjsModule(fn, module) {
	return module = { exports: {} }, fn(module, module.exports), module.exports;
}

var buble_deps = createCommonjsModule(function (module, exports) {
	(function (global, factory) {
		factory(exports);
	})(commonjsGlobal, function (exports) {
		var reservedWords = {
			3: "abstract boolean byte char class double enum export extends final float goto implements import int interface long native package private protected public short static super synchronized throws transient volatile",
			5: "class enum extends super const export import",
			6: "enum",
			strict: "implements interface let package private protected public static yield",
			strictBind: "eval arguments"
		};

		// And the keywords

		var ecma5AndLessKeywords = "break case catch continue debugger default do else finally for function if return switch throw try var while with null true false instanceof typeof void delete new in this";

		var keywords = {
			5: ecma5AndLessKeywords,
			6: ecma5AndLessKeywords + " const class extends export import super"
		};

		// ## Character categories

		// Big ugly regular expressions that match characters in the
		// whitespace, identifier, and identifier-start categories. These
		// are only applied when a character is found to actually have a
		// code point above 128.
		// Generated by `bin/generate-identifier-regex.js`.

		var nonASCIIidentifierStartChars = '\xAA\xB5\xBA\xC0-\xD6\xD8-\xF6\xF8-\u02C1\u02C6-\u02D1\u02E0-\u02E4\u02EC\u02EE\u0370-\u0374\u0376\u0377\u037A-\u037D\u037F\u0386\u0388-\u038A\u038C\u038E-\u03A1\u03A3-\u03F5\u03F7-\u0481\u048A-\u052F\u0531-\u0556\u0559\u0561-\u0587\u05D0-\u05EA\u05F0-\u05F2\u0620-\u064A\u066E\u066F\u0671-\u06D3\u06D5\u06E5\u06E6\u06EE\u06EF\u06FA-\u06FC\u06FF\u0710\u0712-\u072F\u074D-\u07A5\u07B1\u07CA-\u07EA\u07F4\u07F5\u07FA\u0800-\u0815\u081A\u0824\u0828\u0840-\u0858\u08A0-\u08B4\u08B6-\u08BD\u0904-\u0939\u093D\u0950\u0958-\u0961\u0971-\u0980\u0985-\u098C\u098F\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09BD\u09CE\u09DC\u09DD\u09DF-\u09E1\u09F0\u09F1\u0A05-\u0A0A\u0A0F\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32\u0A33\u0A35\u0A36\u0A38\u0A39\u0A59-\u0A5C\u0A5E\u0A72-\u0A74\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0\u0AB2\u0AB3\u0AB5-\u0AB9\u0ABD\u0AD0\u0AE0\u0AE1\u0AF9\u0B05-\u0B0C\u0B0F\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32\u0B33\u0B35-\u0B39\u0B3D\u0B5C\u0B5D\u0B5F-\u0B61\u0B71\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99\u0B9A\u0B9C\u0B9E\u0B9F\u0BA3\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BD0\u0C05-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C39\u0C3D\u0C58-\u0C5A\u0C60\u0C61\u0C80\u0C85-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CBD\u0CDE\u0CE0\u0CE1\u0CF1\u0CF2\u0D05-\u0D0C\u0D0E-\u0D10\u0D12-\u0D3A\u0D3D\u0D4E\u0D54-\u0D56\u0D5F-\u0D61\u0D7A-\u0D7F\u0D85-\u0D96\u0D9A-\u0DB1\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0E01-\u0E30\u0E32\u0E33\u0E40-\u0E46\u0E81\u0E82\u0E84\u0E87\u0E88\u0E8A\u0E8D\u0E94-\u0E97\u0E99-\u0E9F\u0EA1-\u0EA3\u0EA5\u0EA7\u0EAA\u0EAB\u0EAD-\u0EB0\u0EB2\u0EB3\u0EBD\u0EC0-\u0EC4\u0EC6\u0EDC-\u0EDF\u0F00\u0F40-\u0F47\u0F49-\u0F6C\u0F88-\u0F8C\u1000-\u102A\u103F\u1050-\u1055\u105A-\u105D\u1061\u1065\u1066\u106E-\u1070\u1075-\u1081\u108E\u10A0-\u10C5\u10C7\u10CD\u10D0-\u10FA\u10FC-\u1248\u124A-\u124D\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288\u128A-\u128D\u1290-\u12B0\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12D6\u12D8-\u1310\u1312-\u1315\u1318-\u135A\u1380-\u138F\u13A0-\u13F5\u13F8-\u13FD\u1401-\u166C\u166F-\u167F\u1681-\u169A\u16A0-\u16EA\u16EE-\u16F8\u1700-\u170C\u170E-\u1711\u1720-\u1731\u1740-\u1751\u1760-\u176C\u176E-\u1770\u1780-\u17B3\u17D7\u17DC\u1820-\u1877\u1880-\u18A8\u18AA\u18B0-\u18F5\u1900-\u191E\u1950-\u196D\u1970-\u1974\u1980-\u19AB\u19B0-\u19C9\u1A00-\u1A16\u1A20-\u1A54\u1AA7\u1B05-\u1B33\u1B45-\u1B4B\u1B83-\u1BA0\u1BAE\u1BAF\u1BBA-\u1BE5\u1C00-\u1C23\u1C4D-\u1C4F\u1C5A-\u1C7D\u1C80-\u1C88\u1CE9-\u1CEC\u1CEE-\u1CF1\u1CF5\u1CF6\u1D00-\u1DBF\u1E00-\u1F15\u1F18-\u1F1D\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D\u1F80-\u1FB4\u1FB6-\u1FBC\u1FBE\u1FC2-\u1FC4\u1FC6-\u1FCC\u1FD0-\u1FD3\u1FD6-\u1FDB\u1FE0-\u1FEC\u1FF2-\u1FF4\u1FF6-\u1FFC\u2071\u207F\u2090-\u209C\u2102\u2107\u210A-\u2113\u2115\u2118-\u211D\u2124\u2126\u2128\u212A-\u2139\u213C-\u213F\u2145-\u2149\u214E\u2160-\u2188\u2C00-\u2C2E\u2C30-\u2C5E\u2C60-\u2CE4\u2CEB-\u2CEE\u2CF2\u2CF3\u2D00-\u2D25\u2D27\u2D2D\u2D30-\u2D67\u2D6F\u2D80-\u2D96\u2DA0-\u2DA6\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE\u2DD0-\u2DD6\u2DD8-\u2DDE\u3005-\u3007\u3021-\u3029\u3031-\u3035\u3038-\u303C\u3041-\u3096\u309B-\u309F\u30A1-\u30FA\u30FC-\u30FF\u3105-\u312D\u3131-\u318E\u31A0-\u31BA\u31F0-\u31FF\u3400-\u4DB5\u4E00-\u9FD5\uA000-\uA48C\uA4D0-\uA4FD\uA500-\uA60C\uA610-\uA61F\uA62A\uA62B\uA640-\uA66E\uA67F-\uA69D\uA6A0-\uA6EF\uA717-\uA71F\uA722-\uA788\uA78B-\uA7AE\uA7B0-\uA7B7\uA7F7-\uA801\uA803-\uA805\uA807-\uA80A\uA80C-\uA822\uA840-\uA873\uA882-\uA8B3\uA8F2-\uA8F7\uA8FB\uA8FD\uA90A-\uA925\uA930-\uA946\uA960-\uA97C\uA984-\uA9B2\uA9CF\uA9E0-\uA9E4\uA9E6-\uA9EF\uA9FA-\uA9FE\uAA00-\uAA28\uAA40-\uAA42\uAA44-\uAA4B\uAA60-\uAA76\uAA7A\uAA7E-\uAAAF\uAAB1\uAAB5\uAAB6\uAAB9-\uAABD\uAAC0\uAAC2\uAADB-\uAADD\uAAE0-\uAAEA\uAAF2-\uAAF4\uAB01-\uAB06\uAB09-\uAB0E\uAB11-\uAB16\uAB20-\uAB26\uAB28-\uAB2E\uAB30-\uAB5A\uAB5C-\uAB65\uAB70-\uABE2\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFA6D\uFA70-\uFAD9\uFB00-\uFB06\uFB13-\uFB17\uFB1D\uFB1F-\uFB28\uFB2A-\uFB36\uFB38-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46-\uFBB1\uFBD3-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFB\uFE70-\uFE74\uFE76-\uFEFC\uFF21-\uFF3A\uFF41-\uFF5A\uFF66-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA-\uFFDC';
		var nonASCIIidentifierChars = '\u200C\u200D\xB7\u0300-\u036F\u0387\u0483-\u0487\u0591-\u05BD\u05BF\u05C1\u05C2\u05C4\u05C5\u05C7\u0610-\u061A\u064B-\u0669\u0670\u06D6-\u06DC\u06DF-\u06E4\u06E7\u06E8\u06EA-\u06ED\u06F0-\u06F9\u0711\u0730-\u074A\u07A6-\u07B0\u07C0-\u07C9\u07EB-\u07F3\u0816-\u0819\u081B-\u0823\u0825-\u0827\u0829-\u082D\u0859-\u085B\u08D4-\u08E1\u08E3-\u0903\u093A-\u093C\u093E-\u094F\u0951-\u0957\u0962\u0963\u0966-\u096F\u0981-\u0983\u09BC\u09BE-\u09C4\u09C7\u09C8\u09CB-\u09CD\u09D7\u09E2\u09E3\u09E6-\u09EF\u0A01-\u0A03\u0A3C\u0A3E-\u0A42\u0A47\u0A48\u0A4B-\u0A4D\u0A51\u0A66-\u0A71\u0A75\u0A81-\u0A83\u0ABC\u0ABE-\u0AC5\u0AC7-\u0AC9\u0ACB-\u0ACD\u0AE2\u0AE3\u0AE6-\u0AEF\u0B01-\u0B03\u0B3C\u0B3E-\u0B44\u0B47\u0B48\u0B4B-\u0B4D\u0B56\u0B57\u0B62\u0B63\u0B66-\u0B6F\u0B82\u0BBE-\u0BC2\u0BC6-\u0BC8\u0BCA-\u0BCD\u0BD7\u0BE6-\u0BEF\u0C00-\u0C03\u0C3E-\u0C44\u0C46-\u0C48\u0C4A-\u0C4D\u0C55\u0C56\u0C62\u0C63\u0C66-\u0C6F\u0C81-\u0C83\u0CBC\u0CBE-\u0CC4\u0CC6-\u0CC8\u0CCA-\u0CCD\u0CD5\u0CD6\u0CE2\u0CE3\u0CE6-\u0CEF\u0D01-\u0D03\u0D3E-\u0D44\u0D46-\u0D48\u0D4A-\u0D4D\u0D57\u0D62\u0D63\u0D66-\u0D6F\u0D82\u0D83\u0DCA\u0DCF-\u0DD4\u0DD6\u0DD8-\u0DDF\u0DE6-\u0DEF\u0DF2\u0DF3\u0E31\u0E34-\u0E3A\u0E47-\u0E4E\u0E50-\u0E59\u0EB1\u0EB4-\u0EB9\u0EBB\u0EBC\u0EC8-\u0ECD\u0ED0-\u0ED9\u0F18\u0F19\u0F20-\u0F29\u0F35\u0F37\u0F39\u0F3E\u0F3F\u0F71-\u0F84\u0F86\u0F87\u0F8D-\u0F97\u0F99-\u0FBC\u0FC6\u102B-\u103E\u1040-\u1049\u1056-\u1059\u105E-\u1060\u1062-\u1064\u1067-\u106D\u1071-\u1074\u1082-\u108D\u108F-\u109D\u135D-\u135F\u1369-\u1371\u1712-\u1714\u1732-\u1734\u1752\u1753\u1772\u1773\u17B4-\u17D3\u17DD\u17E0-\u17E9\u180B-\u180D\u1810-\u1819\u18A9\u1920-\u192B\u1930-\u193B\u1946-\u194F\u19D0-\u19DA\u1A17-\u1A1B\u1A55-\u1A5E\u1A60-\u1A7C\u1A7F-\u1A89\u1A90-\u1A99\u1AB0-\u1ABD\u1B00-\u1B04\u1B34-\u1B44\u1B50-\u1B59\u1B6B-\u1B73\u1B80-\u1B82\u1BA1-\u1BAD\u1BB0-\u1BB9\u1BE6-\u1BF3\u1C24-\u1C37\u1C40-\u1C49\u1C50-\u1C59\u1CD0-\u1CD2\u1CD4-\u1CE8\u1CED\u1CF2-\u1CF4\u1CF8\u1CF9\u1DC0-\u1DF5\u1DFB-\u1DFF\u203F\u2040\u2054\u20D0-\u20DC\u20E1\u20E5-\u20F0\u2CEF-\u2CF1\u2D7F\u2DE0-\u2DFF\u302A-\u302F\u3099\u309A\uA620-\uA629\uA66F\uA674-\uA67D\uA69E\uA69F\uA6F0\uA6F1\uA802\uA806\uA80B\uA823-\uA827\uA880\uA881\uA8B4-\uA8C5\uA8D0-\uA8D9\uA8E0-\uA8F1\uA900-\uA909\uA926-\uA92D\uA947-\uA953\uA980-\uA983\uA9B3-\uA9C0\uA9D0-\uA9D9\uA9E5\uA9F0-\uA9F9\uAA29-\uAA36\uAA43\uAA4C\uAA4D\uAA50-\uAA59\uAA7B-\uAA7D\uAAB0\uAAB2-\uAAB4\uAAB7\uAAB8\uAABE\uAABF\uAAC1\uAAEB-\uAAEF\uAAF5\uAAF6\uABE3-\uABEA\uABEC\uABED\uABF0-\uABF9\uFB1E\uFE00-\uFE0F\uFE20-\uFE2F\uFE33\uFE34\uFE4D-\uFE4F\uFF10-\uFF19\uFF3F';

		var nonASCIIidentifierStart = new RegExp("[" + nonASCIIidentifierStartChars + "]");
		var nonASCIIidentifier = new RegExp("[" + nonASCIIidentifierStartChars + nonASCIIidentifierChars + "]");

		nonASCIIidentifierStartChars = nonASCIIidentifierChars = null;

		// These are a run-length and offset encoded representation of the
		// >0xffff code points that are a valid part of identifiers. The
		// offset starts at 0x10000, and each pair of numbers represents an
		// offset to the next range, and then a size of the range. They were
		// generated by bin/generate-identifier-regex.js

		// eslint-disable-next-line comma-spacing
		var astralIdentifierStartCodes = [0, 11, 2, 25, 2, 18, 2, 1, 2, 14, 3, 13, 35, 122, 70, 52, 268, 28, 4, 48, 48, 31, 17, 26, 6, 37, 11, 29, 3, 35, 5, 7, 2, 4, 43, 157, 19, 35, 5, 35, 5, 39, 9, 51, 157, 310, 10, 21, 11, 7, 153, 5, 3, 0, 2, 43, 2, 1, 4, 0, 3, 22, 11, 22, 10, 30, 66, 18, 2, 1, 11, 21, 11, 25, 71, 55, 7, 1, 65, 0, 16, 3, 2, 2, 2, 26, 45, 28, 4, 28, 36, 7, 2, 27, 28, 53, 11, 21, 11, 18, 14, 17, 111, 72, 56, 50, 14, 50, 785, 52, 76, 44, 33, 24, 27, 35, 42, 34, 4, 0, 13, 47, 15, 3, 22, 0, 2, 0, 36, 17, 2, 24, 85, 6, 2, 0, 2, 3, 2, 14, 2, 9, 8, 46, 39, 7, 3, 1, 3, 21, 2, 6, 2, 1, 2, 4, 4, 0, 19, 0, 13, 4, 159, 52, 19, 3, 54, 47, 21, 1, 2, 0, 185, 46, 42, 3, 37, 47, 21, 0, 60, 42, 86, 25, 391, 63, 32, 0, 449, 56, 264, 8, 2, 36, 18, 0, 50, 29, 881, 921, 103, 110, 18, 195, 2749, 1070, 4050, 582, 8634, 568, 8, 30, 114, 29, 19, 47, 17, 3, 32, 20, 6, 18, 881, 68, 12, 0, 67, 12, 65, 0, 32, 6124, 20, 754, 9486, 1, 3071, 106, 6, 12, 4, 8, 8, 9, 5991, 84, 2, 70, 2, 1, 3, 0, 3, 1, 3, 3, 2, 11, 2, 0, 2, 6, 2, 64, 2, 3, 3, 7, 2, 6, 2, 27, 2, 3, 2, 4, 2, 0, 4, 6, 2, 339, 3, 24, 2, 24, 2, 30, 2, 24, 2, 30, 2, 24, 2, 30, 2, 24, 2, 30, 2, 24, 2, 7, 4149, 196, 60, 67, 1213, 3, 2, 26, 2, 1, 2, 0, 3, 0, 2, 9, 2, 3, 2, 0, 2, 0, 7, 0, 5, 0, 2, 0, 2, 0, 2, 2, 2, 1, 2, 0, 3, 0, 2, 0, 2, 0, 2, 0, 2, 0, 2, 1, 2, 0, 3, 3, 2, 6, 2, 3, 2, 3, 2, 0, 2, 9, 2, 16, 6, 2, 2, 4, 2, 16, 4421, 42710, 42, 4148, 12, 221, 3, 5761, 10591, 541];

		// eslint-disable-next-line comma-spacing
		var astralIdentifierCodes = [509, 0, 227, 0, 150, 4, 294, 9, 1368, 2, 2, 1, 6, 3, 41, 2, 5, 0, 166, 1, 1306, 2, 54, 14, 32, 9, 16, 3, 46, 10, 54, 9, 7, 2, 37, 13, 2, 9, 52, 0, 13, 2, 49, 13, 10, 2, 4, 9, 83, 11, 7, 0, 161, 11, 6, 9, 7, 3, 57, 0, 2, 6, 3, 1, 3, 2, 10, 0, 11, 1, 3, 6, 4, 4, 193, 17, 10, 9, 87, 19, 13, 9, 214, 6, 3, 8, 28, 1, 83, 16, 16, 9, 82, 12, 9, 9, 84, 14, 5, 9, 423, 9, 838, 7, 2, 7, 17, 9, 57, 21, 2, 13, 19882, 9, 135, 4, 60, 6, 26, 9, 1016, 45, 17, 3, 19723, 1, 5319, 4, 4, 5, 9, 7, 3, 6, 31, 3, 149, 2, 1418, 49, 513, 54, 5, 49, 9, 0, 15, 0, 23, 4, 2, 14, 1361, 6, 2, 16, 3, 6, 2, 1, 2, 4, 2214, 6, 110, 6, 6, 9, 792487, 239];

		// This has a complexity linear to the value of the code. The
		// assumption is that looking up astral identifier characters is
		// rare.
		function isInAstralSet(code, set$$1) {
			var pos = 0x10000;
			for (var i = 0; i < set$$1.length; i += 2) {
				pos += set$$1[i];
				if (pos > code) {
					return false;
				}
				pos += set$$1[i + 1];
				if (pos >= code) {
					return true;
				}
			}
		}

		// Test whether a given character code starts an identifier.

		function isIdentifierStart(code, astral) {
			if (code < 65) {
				return code === 36;
			}
			if (code < 91) {
				return true;
			}
			if (code < 97) {
				return code === 95;
			}
			if (code < 123) {
				return true;
			}
			if (code <= 0xffff) {
				return code >= 0xaa && nonASCIIidentifierStart.test(String.fromCharCode(code));
			}
			if (astral === false) {
				return false;
			}
			return isInAstralSet(code, astralIdentifierStartCodes);
		}

		// Test whether a given character is part of an identifier.

		function isIdentifierChar(code, astral) {
			if (code < 48) {
				return code === 36;
			}
			if (code < 58) {
				return true;
			}
			if (code < 65) {
				return false;
			}
			if (code < 91) {
				return true;
			}
			if (code < 97) {
				return code === 95;
			}
			if (code < 123) {
				return true;
			}
			if (code <= 0xffff) {
				return code >= 0xaa && nonASCIIidentifier.test(String.fromCharCode(code));
			}
			if (astral === false) {
				return false;
			}
			return isInAstralSet(code, astralIdentifierStartCodes) || isInAstralSet(code, astralIdentifierCodes);
		}

		// ## Token types

		// The assignment of fine-grained, information-carrying type objects
		// allows the tokenizer to store the information it has about a
		// token in a way that is very cheap for the parser to look up.

		// All token type variables start with an underscore, to make them
		// easy to recognize.

		// The `beforeExpr` property is used to disambiguate between regular
		// expressions and divisions. It is set on all token types that can
		// be followed by an expression (thus, a slash after them would be a
		// regular expression).
		//
		// The `startsExpr` property is used to check if the token ends a
		// `yield` expression. It is set on all token types that either can
		// directly start an expression (like a quotation mark) or can
		// continue an expression (like the body of a string).
		//
		// `isLoop` marks a keyword as starting a loop, which is important
		// to know when parsing a label, in order to allow or disallow
		// continue jumps to that label.

		var TokenType = function TokenType(label, conf) {
			if (conf === void 0) conf = {};

			this.label = label;
			this.keyword = conf.keyword;
			this.beforeExpr = !!conf.beforeExpr;
			this.startsExpr = !!conf.startsExpr;
			this.isLoop = !!conf.isLoop;
			this.isAssign = !!conf.isAssign;
			this.prefix = !!conf.prefix;
			this.postfix = !!conf.postfix;
			this.binop = conf.binop || null;
			this.updateContext = null;
		};

		function binop(name, prec) {
			return new TokenType(name, { beforeExpr: true, binop: prec });
		}
		var beforeExpr = { beforeExpr: true };
		var startsExpr = { startsExpr: true };

		// Map keyword names to token types.

		var keywords$1 = {};

		// Succinct definitions of keyword token types
		function kw(name, options) {
			if (options === void 0) options = {};

			options.keyword = name;
			return keywords$1[name] = new TokenType(name, options);
		}

		var types = {
			num: new TokenType("num", startsExpr),
			regexp: new TokenType("regexp", startsExpr),
			string: new TokenType("string", startsExpr),
			name: new TokenType("name", startsExpr),
			eof: new TokenType("eof"),

			// Punctuation token types.
			bracketL: new TokenType("[", { beforeExpr: true, startsExpr: true }),
			bracketR: new TokenType("]"),
			braceL: new TokenType("{", { beforeExpr: true, startsExpr: true }),
			braceR: new TokenType("}"),
			parenL: new TokenType("(", { beforeExpr: true, startsExpr: true }),
			parenR: new TokenType(")"),
			comma: new TokenType(",", beforeExpr),
			semi: new TokenType(";", beforeExpr),
			colon: new TokenType(":", beforeExpr),
			dot: new TokenType("."),
			question: new TokenType("?", beforeExpr),
			arrow: new TokenType("=>", beforeExpr),
			template: new TokenType("template"),
			invalidTemplate: new TokenType("invalidTemplate"),
			ellipsis: new TokenType("...", beforeExpr),
			backQuote: new TokenType("`", startsExpr),
			dollarBraceL: new TokenType("${", { beforeExpr: true, startsExpr: true }),

			// Operators. These carry several kinds of properties to help the
			// parser use them properly (the presence of these properties is
			// what categorizes them as operators).
			//
			// `binop`, when present, specifies that this operator is a binary
			// operator, and will refer to its precedence.
			//
			// `prefix` and `postfix` mark the operator as a prefix or postfix
			// unary operator.
			//
			// `isAssign` marks all of `=`, `+=`, `-=` etcetera, which act as
			// binary operators with a very low precedence, that should result
			// in AssignmentExpression nodes.

			eq: new TokenType("=", { beforeExpr: true, isAssign: true }),
			assign: new TokenType("_=", { beforeExpr: true, isAssign: true }),
			incDec: new TokenType("++/--", { prefix: true, postfix: true, startsExpr: true }),
			prefix: new TokenType("!/~", { beforeExpr: true, prefix: true, startsExpr: true }),
			logicalOR: binop("||", 1),
			logicalAND: binop("&&", 2),
			bitwiseOR: binop("|", 3),
			bitwiseXOR: binop("^", 4),
			bitwiseAND: binop("&", 5),
			equality: binop("==/!=/===/!==", 6),
			relational: binop("</>/<=/>=", 7),
			bitShift: binop("<</>>/>>>", 8),
			plusMin: new TokenType("+/-", { beforeExpr: true, binop: 9, prefix: true, startsExpr: true }),
			modulo: binop("%", 10),
			star: binop("*", 10),
			slash: binop("/", 10),
			starstar: new TokenType("**", { beforeExpr: true }),

			// Keyword token types.
			_break: kw("break"),
			_case: kw("case", beforeExpr),
			_catch: kw("catch"),
			_continue: kw("continue"),
			_debugger: kw("debugger"),
			_default: kw("default", beforeExpr),
			_do: kw("do", { isLoop: true, beforeExpr: true }),
			_else: kw("else", beforeExpr),
			_finally: kw("finally"),
			_for: kw("for", { isLoop: true }),
			_function: kw("function", startsExpr),
			_if: kw("if"),
			_return: kw("return", beforeExpr),
			_switch: kw("switch"),
			_throw: kw("throw", beforeExpr),
			_try: kw("try"),
			_var: kw("var"),
			_const: kw("const"),
			_while: kw("while", { isLoop: true }),
			_with: kw("with"),
			_new: kw("new", { beforeExpr: true, startsExpr: true }),
			_this: kw("this", startsExpr),
			_super: kw("super", startsExpr),
			_class: kw("class", startsExpr),
			_extends: kw("extends", beforeExpr),
			_export: kw("export"),
			_import: kw("import"),
			_null: kw("null", startsExpr),
			_true: kw("true", startsExpr),
			_false: kw("false", startsExpr),
			_in: kw("in", { beforeExpr: true, binop: 7 }),
			_instanceof: kw("instanceof", { beforeExpr: true, binop: 7 }),
			_typeof: kw("typeof", { beforeExpr: true, prefix: true, startsExpr: true }),
			_void: kw("void", { beforeExpr: true, prefix: true, startsExpr: true }),
			_delete: kw("delete", { beforeExpr: true, prefix: true, startsExpr: true })
		};

		// Matches a whole line break (where CRLF is considered a single
		// line break). Used to count lines.

		var lineBreak = /\r\n?|\n|\u2028|\u2029/;
		var lineBreakG = new RegExp(lineBreak.source, "g");

		function isNewLine(code) {
			return code === 10 || code === 13 || code === 0x2028 || code === 0x2029;
		}

		var nonASCIIwhitespace = /[\u1680\u180e\u2000-\u200a\u202f\u205f\u3000\ufeff]/;

		var skipWhiteSpace = /(?:\s|\/\/.*|\/\*[^]*?\*\/)*/g;

		var ref$1 = Object.prototype;
		var hasOwnProperty = ref$1.hasOwnProperty;
		var toString = ref$1.toString;

		// Checks if an object has a property.

		function has(obj, propName) {
			return hasOwnProperty.call(obj, propName);
		}

		var isArray = Array.isArray || function (obj) {
			return toString.call(obj) === "[object Array]";
		};

		// These are used when `options.locations` is on, for the
		// `startLoc` and `endLoc` properties.

		var Position = function Position(line, col) {
			this.line = line;
			this.column = col;
		};

		Position.prototype.offset = function offset(n) {
			return new Position(this.line, this.column + n);
		};

		var SourceLocation = function SourceLocation(p, start, end) {
			this.start = start;
			this.end = end;
			if (p.sourceFile !== null) {
				this.source = p.sourceFile;
			}
		};

		// The `getLineInfo` function is mostly useful when the
		// `locations` option is off (for performance reasons) and you
		// want to find the line/column position for a given character
		// offset. `input` should be the code string that the offset refers
		// into.

		function getLineInfo(input, offset) {
			for (var line = 1, cur = 0;;) {
				lineBreakG.lastIndex = cur;
				var match = lineBreakG.exec(input);
				if (match && match.index < offset) {
					++line;
					cur = match.index + match[0].length;
				} else {
					return new Position(line, offset - cur);
				}
			}
		}

		// A second optional argument can be given to further configure
		// the parser process. These options are recognized:

		var defaultOptions = {
			// `ecmaVersion` indicates the ECMAScript version to parse. Must
			// be either 3, 5, 6 (2015), 7 (2016), or 8 (2017). This influences support
			// for strict mode, the set of reserved words, and support for
			// new syntax features. The default is 7.
			ecmaVersion: 7,
			// `sourceType` indicates the mode the code should be parsed in.
			// Can be either `"script"` or `"module"`. This influences global
			// strict mode and parsing of `import` and `export` declarations.
			sourceType: "script",
			// `onInsertedSemicolon` can be a callback that will be called
			// when a semicolon is automatically inserted. It will be passed
			// th position of the comma as an offset, and if `locations` is
			// enabled, it is given the location as a `{line, column}` object
			// as second argument.
			onInsertedSemicolon: null,
			// `onTrailingComma` is similar to `onInsertedSemicolon`, but for
			// trailing commas.
			onTrailingComma: null,
			// By default, reserved words are only enforced if ecmaVersion >= 5.
			// Set `allowReserved` to a boolean value to explicitly turn this on
			// an off. When this option has the value "never", reserved words
			// and keywords can also not be used as property names.
			allowReserved: null,
			// When enabled, a return at the top level is not considered an
			// error.
			allowReturnOutsideFunction: false,
			// When enabled, import/export statements are not constrained to
			// appearing at the top of the program.
			allowImportExportEverywhere: false,
			// When enabled, hashbang directive in the beginning of file
			// is allowed and treated as a line comment.
			allowHashBang: false,
			// When `locations` is on, `loc` properties holding objects with
			// `start` and `end` properties in `{line, column}` form (with
			// line being 1-based and column 0-based) will be attached to the
			// nodes.
			locations: false,
			// A function can be passed as `onToken` option, which will
			// cause Acorn to call that function with object in the same
			// format as tokens returned from `tokenizer().getToken()`. Note
			// that you are not allowed to call the parser from the
			// callback—that will corrupt its internal state.
			onToken: null,
			// A function can be passed as `onComment` option, which will
			// cause Acorn to call that function with `(block, text, start,
			// end)` parameters whenever a comment is skipped. `block` is a
			// boolean indicating whether this is a block (`/* */`) comment,
			// `text` is the content of the comment, and `start` and `end` are
			// character offsets that denote the start and end of the comment.
			// When the `locations` option is on, two more parameters are
			// passed, the full `{line, column}` locations of the start and
			// end of the comments. Note that you are not allowed to call the
			// parser from the callback—that will corrupt its internal state.
			onComment: null,
			// Nodes have their start and end characters offsets recorded in
			// `start` and `end` properties (directly on the node, rather than
			// the `loc` object, which holds line/column data. To also add a
			// [semi-standardized][range] `range` property holding a `[start,
			// end]` array with the same numbers, set the `ranges` option to
			// `true`.
			//
			// [range]: https://bugzilla.mozilla.org/show_bug.cgi?id=745678
			ranges: false,
			// It is possible to parse multiple files into a single AST by
			// passing the tree produced by parsing the first file as
			// `program` option in subsequent parses. This will add the
			// toplevel forms of the parsed file to the `Program` (top) node
			// of an existing parse tree.
			program: null,
			// When `locations` is on, you can pass this to record the source
			// file in every node's `loc` object.
			sourceFile: null,
			// This value, if given, is stored in every node, whether
			// `locations` is on or off.
			directSourceFile: null,
			// When enabled, parenthesized expressions are represented by
			// (non-standard) ParenthesizedExpression nodes
			preserveParens: false,
			plugins: {}
		};

		// Interpret and default an options object

		function getOptions(opts) {
			var options = {};

			for (var opt in defaultOptions) {
				options[opt] = opts && has(opts, opt) ? opts[opt] : defaultOptions[opt];
			}

			if (options.ecmaVersion >= 2015) {
				options.ecmaVersion -= 2009;
			}

			if (options.allowReserved == null) {
				options.allowReserved = options.ecmaVersion < 5;
			}

			if (isArray(options.onToken)) {
				var tokens = options.onToken;
				options.onToken = function (token) {
					return tokens.push(token);
				};
			}
			if (isArray(options.onComment)) {
				options.onComment = pushComment(options, options.onComment);
			}

			return options;
		}

		function pushComment(options, array) {
			return function (block, text, start, end, startLoc, endLoc) {
				var comment = {
					type: block ? "Block" : "Line",
					value: text,
					start: start,
					end: end
				};
				if (options.locations) {
					comment.loc = new SourceLocation(this, startLoc, endLoc);
				}
				if (options.ranges) {
					comment.range = [start, end];
				}
				array.push(comment);
			};
		}

		// Registered plugins
		var plugins = {};

		function keywordRegexp(words) {
			return new RegExp("^(?:" + words.replace(/ /g, "|") + ")$");
		}

		var Parser = function Parser(options, input, startPos) {
			this.options = options = getOptions(options);
			this.sourceFile = options.sourceFile;
			this.keywords = keywordRegexp(keywords[options.ecmaVersion >= 6 ? 6 : 5]);
			var reserved = "";
			if (!options.allowReserved) {
				for (var v = options.ecmaVersion;; v--) {
					if (reserved = reservedWords[v]) {
						break;
					}
				}
				if (options.sourceType == "module") {
					reserved += " await";
				}
			}
			this.reservedWords = keywordRegexp(reserved);
			var reservedStrict = (reserved ? reserved + " " : "") + reservedWords.strict;
			this.reservedWordsStrict = keywordRegexp(reservedStrict);
			this.reservedWordsStrictBind = keywordRegexp(reservedStrict + " " + reservedWords.strictBind);
			this.input = String(input);

			// Used to signal to callers of `readWord1` whether the word
			// contained any escape sequences. This is needed because words with
			// escape sequences must not be interpreted as keywords.
			this.containsEsc = false;

			// Load plugins
			this.loadPlugins(options.plugins);

			// Set up token state

			// The current position of the tokenizer in the input.
			if (startPos) {
				this.pos = startPos;
				this.lineStart = this.input.lastIndexOf("\n", startPos - 1) + 1;
				this.curLine = this.input.slice(0, this.lineStart).split(lineBreak).length;
			} else {
				this.pos = this.lineStart = 0;
				this.curLine = 1;
			}

			// Properties of the current token:
			// Its type
			this.type = types.eof;
			// For tokens that include more information than their type, the value
			this.value = null;
			// Its start and end offset
			this.start = this.end = this.pos;
			// And, if locations are used, the {line, column} object
			// corresponding to those offsets
			this.startLoc = this.endLoc = this.curPosition();

			// Position information for the previous token
			this.lastTokEndLoc = this.lastTokStartLoc = null;
			this.lastTokStart = this.lastTokEnd = this.pos;

			// The context stack is used to superficially track syntactic
			// context to predict whether a regular expression is allowed in a
			// given position.
			this.context = this.initialContext();
			this.exprAllowed = true;

			// Figure out if it's a module code.
			this.inModule = options.sourceType === "module";
			this.strict = this.inModule || this.strictDirective(this.pos);

			// Used to signify the start of a potential arrow function
			this.potentialArrowAt = -1;

			// Flags to track whether we are in a function, a generator, an async function.
			this.inFunction = this.inGenerator = this.inAsync = false;
			// Positions to delayed-check that yield/await does not exist in default parameters.
			this.yieldPos = this.awaitPos = 0;
			// Labels in scope.
			this.labels = [];

			// If enabled, skip leading hashbang line.
			if (this.pos === 0 && options.allowHashBang && this.input.slice(0, 2) === "#!") {
				this.skipLineComment(2);
			}

			// Scope tracking for duplicate variable names (see scope.js)
			this.scopeStack = [];
			this.enterFunctionScope();
		};

		// DEPRECATED Kept for backwards compatibility until 3.0 in case a plugin uses them
		Parser.prototype.isKeyword = function isKeyword(word) {
			return this.keywords.test(word);
		};
		Parser.prototype.isReservedWord = function isReservedWord(word) {
			return this.reservedWords.test(word);
		};

		Parser.prototype.extend = function extend(name, f) {
			this[name] = f(this[name]);
		};

		Parser.prototype.loadPlugins = function loadPlugins(pluginConfigs) {
			var this$1 = this;

			for (var name in pluginConfigs) {
				var plugin = plugins[name];
				if (!plugin) {
					throw new Error("Plugin '" + name + "' not found");
				}
				plugin(this$1, pluginConfigs[name]);
			}
		};

		Parser.prototype.parse = function parse() {
			var node = this.options.program || this.startNode();
			this.nextToken();
			return this.parseTopLevel(node);
		};

		var pp = Parser.prototype;

		// ## Parser utilities

		var literal = /^(?:'((?:\\.|[^'])*?)'|"((?:\\.|[^"])*?)"|;)/;
		pp.strictDirective = function (start) {
			var this$1 = this;

			for (;;) {
				skipWhiteSpace.lastIndex = start;
				start += skipWhiteSpace.exec(this$1.input)[0].length;
				var match = literal.exec(this$1.input.slice(start));
				if (!match) {
					return false;
				}
				if ((match[1] || match[2]) == "use strict") {
					return true;
				}
				start += match[0].length;
			}
		};

		// Predicate that tests whether the next token is of the given
		// type, and if yes, consumes it as a side effect.

		pp.eat = function (type) {
			if (this.type === type) {
				this.next();
				return true;
			} else {
				return false;
			}
		};

		// Tests whether parsed token is a contextual keyword.

		pp.isContextual = function (name) {
			return this.type === types.name && this.value === name;
		};

		// Consumes contextual keyword if possible.

		pp.eatContextual = function (name) {
			return this.value === name && this.eat(types.name);
		};

		// Asserts that following token is given contextual keyword.

		pp.expectContextual = function (name) {
			if (!this.eatContextual(name)) {
				this.unexpected();
			}
		};

		// Test whether a semicolon can be inserted at the current position.

		pp.canInsertSemicolon = function () {
			return this.type === types.eof || this.type === types.braceR || lineBreak.test(this.input.slice(this.lastTokEnd, this.start));
		};

		pp.insertSemicolon = function () {
			if (this.canInsertSemicolon()) {
				if (this.options.onInsertedSemicolon) {
					this.options.onInsertedSemicolon(this.lastTokEnd, this.lastTokEndLoc);
				}
				return true;
			}
		};

		// Consume a semicolon, or, failing that, see if we are allowed to
		// pretend that there is a semicolon at this position.

		pp.semicolon = function () {
			if (!this.eat(types.semi) && !this.insertSemicolon()) {
				this.unexpected();
			}
		};

		pp.afterTrailingComma = function (tokType, notNext) {
			if (this.type == tokType) {
				if (this.options.onTrailingComma) {
					this.options.onTrailingComma(this.lastTokStart, this.lastTokStartLoc);
				}
				if (!notNext) {
					this.next();
				}
				return true;
			}
		};

		// Expect a token of a given type. If found, consume it, otherwise,
		// raise an unexpected token error.

		pp.expect = function (type) {
			this.eat(type) || this.unexpected();
		};

		// Raise an unexpected token error.

		pp.unexpected = function (pos) {
			this.raise(pos != null ? pos : this.start, "Unexpected token");
		};

		function DestructuringErrors() {
			this.shorthandAssign = this.trailingComma = this.parenthesizedAssign = this.parenthesizedBind = -1;
		}

		pp.checkPatternErrors = function (refDestructuringErrors, isAssign) {
			if (!refDestructuringErrors) {
				return;
			}
			if (refDestructuringErrors.trailingComma > -1) {
				this.raiseRecoverable(refDestructuringErrors.trailingComma, "Comma is not permitted after the rest element");
			}
			var parens = isAssign ? refDestructuringErrors.parenthesizedAssign : refDestructuringErrors.parenthesizedBind;
			if (parens > -1) {
				this.raiseRecoverable(parens, "Parenthesized pattern");
			}
		};

		pp.checkExpressionErrors = function (refDestructuringErrors, andThrow) {
			var pos = refDestructuringErrors ? refDestructuringErrors.shorthandAssign : -1;
			if (!andThrow) {
				return pos >= 0;
			}
			if (pos > -1) {
				this.raise(pos, "Shorthand property assignments are valid only in destructuring patterns");
			}
		};

		pp.checkYieldAwaitInDefaultParams = function () {
			if (this.yieldPos && (!this.awaitPos || this.yieldPos < this.awaitPos)) {
				this.raise(this.yieldPos, "Yield expression cannot be a default value");
			}
			if (this.awaitPos) {
				this.raise(this.awaitPos, "Await expression cannot be a default value");
			}
		};

		pp.isSimpleAssignTarget = function (expr) {
			if (expr.type === "ParenthesizedExpression") {
				return this.isSimpleAssignTarget(expr.expression);
			}
			return expr.type === "Identifier" || expr.type === "MemberExpression";
		};

		var pp$1 = Parser.prototype;

		// ### Statement parsing

		// Parse a program. Initializes the parser, reads any number of
		// statements, and wraps them in a Program node.  Optionally takes a
		// `program` argument.  If present, the statements will be appended
		// to its body instead of creating a new node.

		pp$1.parseTopLevel = function (node) {
			var this$1 = this;

			var exports = {};
			if (!node.body) {
				node.body = [];
			}
			while (this.type !== types.eof) {
				var stmt = this$1.parseStatement(true, true, exports);
				node.body.push(stmt);
			}
			this.adaptDirectivePrologue(node.body);
			this.next();
			if (this.options.ecmaVersion >= 6) {
				node.sourceType = this.options.sourceType;
			}
			return this.finishNode(node, "Program");
		};

		var loopLabel = { kind: "loop" };
		var switchLabel = { kind: "switch" };

		pp$1.isLet = function () {
			if (this.type !== types.name || this.options.ecmaVersion < 6 || this.value != "let") {
				return false;
			}
			skipWhiteSpace.lastIndex = this.pos;
			var skip = skipWhiteSpace.exec(this.input);
			var next = this.pos + skip[0].length,
			    nextCh = this.input.charCodeAt(next);
			if (nextCh === 91 || nextCh == 123) {
				return true;
			} // '{' and '['
			if (isIdentifierStart(nextCh, true)) {
				var pos = next + 1;
				while (isIdentifierChar(this.input.charCodeAt(pos), true)) {
					++pos;
				}
				var ident = this.input.slice(next, pos);
				if (!this.isKeyword(ident)) {
					return true;
				}
			}
			return false;
		};

		// check 'async [no LineTerminator here] function'
		// - 'async /*foo*/ function' is OK.
		// - 'async /*\n*/ function' is invalid.
		pp$1.isAsyncFunction = function () {
			if (this.type !== types.name || this.options.ecmaVersion < 8 || this.value != "async") {
				return false;
			}

			skipWhiteSpace.lastIndex = this.pos;
			var skip = skipWhiteSpace.exec(this.input);
			var next = this.pos + skip[0].length;
			return !lineBreak.test(this.input.slice(this.pos, next)) && this.input.slice(next, next + 8) === "function" && (next + 8 == this.input.length || !isIdentifierChar(this.input.charAt(next + 8)));
		};

		// Parse a single statement.
		//
		// If expecting a statement and finding a slash operator, parse a
		// regular expression literal. This is to handle cases like
		// `if (foo) /blah/.exec(foo)`, where looking at the previous token
		// does not help.

		pp$1.parseStatement = function (declaration, topLevel, exports) {
			var starttype = this.type,
			    node = this.startNode(),
			    kind;

			if (this.isLet()) {
				starttype = types._var;
				kind = "let";
			}

			// Most types of statements are recognized by the keyword they
			// start with. Many are trivial to parse, some require a bit of
			// complexity.

			switch (starttype) {
				case types._break:case types._continue:
					return this.parseBreakContinueStatement(node, starttype.keyword);
				case types._debugger:
					return this.parseDebuggerStatement(node);
				case types._do:
					return this.parseDoStatement(node);
				case types._for:
					return this.parseForStatement(node);
				case types._function:
					if (!declaration && this.options.ecmaVersion >= 6) {
						this.unexpected();
					}
					return this.parseFunctionStatement(node, false);
				case types._class:
					if (!declaration) {
						this.unexpected();
					}
					return this.parseClass(node, true);
				case types._if:
					return this.parseIfStatement(node);
				case types._return:
					return this.parseReturnStatement(node);
				case types._switch:
					return this.parseSwitchStatement(node);
				case types._throw:
					return this.parseThrowStatement(node);
				case types._try:
					return this.parseTryStatement(node);
				case types._const:case types._var:
					kind = kind || this.value;
					if (!declaration && kind != "var") {
						this.unexpected();
					}
					return this.parseVarStatement(node, kind);
				case types._while:
					return this.parseWhileStatement(node);
				case types._with:
					return this.parseWithStatement(node);
				case types.braceL:
					return this.parseBlock();
				case types.semi:
					return this.parseEmptyStatement(node);
				case types._export:
				case types._import:
					if (!this.options.allowImportExportEverywhere) {
						if (!topLevel) {
							this.raise(this.start, "'import' and 'export' may only appear at the top level");
						}
						if (!this.inModule) {
							this.raise(this.start, "'import' and 'export' may appear only with 'sourceType: module'");
						}
					}
					return starttype === types._import ? this.parseImport(node) : this.parseExport(node, exports);

				// If the statement does not start with a statement keyword or a
				// brace, it's an ExpressionStatement or LabeledStatement. We
				// simply start parsing an expression, and afterwards, if the
				// next token is a colon and the expression was a simple
				// Identifier node, we switch to interpreting it as a label.
				default:
					if (this.isAsyncFunction() && declaration) {
						this.next();
						return this.parseFunctionStatement(node, true);
					}

					var maybeName = this.value,
					    expr = this.parseExpression();
					if (starttype === types.name && expr.type === "Identifier" && this.eat(types.colon)) {
						return this.parseLabeledStatement(node, maybeName, expr);
					} else {
						return this.parseExpressionStatement(node, expr);
					}
			}
		};

		pp$1.parseBreakContinueStatement = function (node, keyword) {
			var this$1 = this;

			var isBreak = keyword == "break";
			this.next();
			if (this.eat(types.semi) || this.insertSemicolon()) {
				node.label = null;
			} else if (this.type !== types.name) {
				this.unexpected();
			} else {
				node.label = this.parseIdent();
				this.semicolon();
			}

			// Verify that there is an actual destination to break or
			// continue to.
			var i = 0;
			for (; i < this.labels.length; ++i) {
				var lab = this$1.labels[i];
				if (node.label == null || lab.name === node.label.name) {
					if (lab.kind != null && (isBreak || lab.kind === "loop")) {
						break;
					}
					if (node.label && isBreak) {
						break;
					}
				}
			}
			if (i === this.labels.length) {
				this.raise(node.start, "Unsyntactic " + keyword);
			}
			return this.finishNode(node, isBreak ? "BreakStatement" : "ContinueStatement");
		};

		pp$1.parseDebuggerStatement = function (node) {
			this.next();
			this.semicolon();
			return this.finishNode(node, "DebuggerStatement");
		};

		pp$1.parseDoStatement = function (node) {
			this.next();
			this.labels.push(loopLabel);
			node.body = this.parseStatement(false);
			this.labels.pop();
			this.expect(types._while);
			node.test = this.parseParenExpression();
			if (this.options.ecmaVersion >= 6) {
				this.eat(types.semi);
			} else {
				this.semicolon();
			}
			return this.finishNode(node, "DoWhileStatement");
		};

		// Disambiguating between a `for` and a `for`/`in` or `for`/`of`
		// loop is non-trivial. Basically, we have to parse the init `var`
		// statement or expression, disallowing the `in` operator (see
		// the second parameter to `parseExpression`), and then check
		// whether the next token is `in` or `of`. When there is no init
		// part (semicolon immediately after the opening parenthesis), it
		// is a regular `for` loop.

		pp$1.parseForStatement = function (node) {
			this.next();
			this.labels.push(loopLabel);
			this.enterLexicalScope();
			this.expect(types.parenL);
			if (this.type === types.semi) {
				return this.parseFor(node, null);
			}
			var isLet = this.isLet();
			if (this.type === types._var || this.type === types._const || isLet) {
				var init$1 = this.startNode(),
				    kind = isLet ? "let" : this.value;
				this.next();
				this.parseVar(init$1, true, kind);
				this.finishNode(init$1, "VariableDeclaration");
				if ((this.type === types._in || this.options.ecmaVersion >= 6 && this.isContextual("of")) && init$1.declarations.length === 1 && !(kind !== "var" && init$1.declarations[0].init)) {
					return this.parseForIn(node, init$1);
				}
				return this.parseFor(node, init$1);
			}
			var refDestructuringErrors = new DestructuringErrors();
			var init = this.parseExpression(true, refDestructuringErrors);
			if (this.type === types._in || this.options.ecmaVersion >= 6 && this.isContextual("of")) {
				this.toAssignable(init);
				this.checkLVal(init);
				this.checkPatternErrors(refDestructuringErrors, true);
				return this.parseForIn(node, init);
			} else {
				this.checkExpressionErrors(refDestructuringErrors, true);
			}
			return this.parseFor(node, init);
		};

		pp$1.parseFunctionStatement = function (node, isAsync) {
			this.next();
			return this.parseFunction(node, true, false, isAsync);
		};

		pp$1.isFunction = function () {
			return this.type === types._function || this.isAsyncFunction();
		};

		pp$1.parseIfStatement = function (node) {
			this.next();
			node.test = this.parseParenExpression();
			// allow function declarations in branches, but only in non-strict mode
			node.consequent = this.parseStatement(!this.strict && this.isFunction());
			node.alternate = this.eat(types._else) ? this.parseStatement(!this.strict && this.isFunction()) : null;
			return this.finishNode(node, "IfStatement");
		};

		pp$1.parseReturnStatement = function (node) {
			if (!this.inFunction && !this.options.allowReturnOutsideFunction) {
				this.raise(this.start, "'return' outside of function");
			}
			this.next();

			// In `return` (and `break`/`continue`), the keywords with
			// optional arguments, we eagerly look for a semicolon or the
			// possibility to insert one.

			if (this.eat(types.semi) || this.insertSemicolon()) {
				node.argument = null;
			} else {
				node.argument = this.parseExpression();this.semicolon();
			}
			return this.finishNode(node, "ReturnStatement");
		};

		pp$1.parseSwitchStatement = function (node) {
			var this$1 = this;

			this.next();
			node.discriminant = this.parseParenExpression();
			node.cases = [];
			this.expect(types.braceL);
			this.labels.push(switchLabel);
			this.enterLexicalScope();

			// Statements under must be grouped (by label) in SwitchCase
			// nodes. `cur` is used to keep the node that we are currently
			// adding statements to.

			var cur;
			for (var sawDefault = false; this.type != types.braceR;) {
				if (this$1.type === types._case || this$1.type === types._default) {
					var isCase = this$1.type === types._case;
					if (cur) {
						this$1.finishNode(cur, "SwitchCase");
					}
					node.cases.push(cur = this$1.startNode());
					cur.consequent = [];
					this$1.next();
					if (isCase) {
						cur.test = this$1.parseExpression();
					} else {
						if (sawDefault) {
							this$1.raiseRecoverable(this$1.lastTokStart, "Multiple default clauses");
						}
						sawDefault = true;
						cur.test = null;
					}
					this$1.expect(types.colon);
				} else {
					if (!cur) {
						this$1.unexpected();
					}
					cur.consequent.push(this$1.parseStatement(true));
				}
			}
			this.exitLexicalScope();
			if (cur) {
				this.finishNode(cur, "SwitchCase");
			}
			this.next(); // Closing brace
			this.labels.pop();
			return this.finishNode(node, "SwitchStatement");
		};

		pp$1.parseThrowStatement = function (node) {
			this.next();
			if (lineBreak.test(this.input.slice(this.lastTokEnd, this.start))) {
				this.raise(this.lastTokEnd, "Illegal newline after throw");
			}
			node.argument = this.parseExpression();
			this.semicolon();
			return this.finishNode(node, "ThrowStatement");
		};

		// Reused empty array added for node fields that are always empty.

		var empty = [];

		pp$1.parseTryStatement = function (node) {
			this.next();
			node.block = this.parseBlock();
			node.handler = null;
			if (this.type === types._catch) {
				var clause = this.startNode();
				this.next();
				this.expect(types.parenL);
				clause.param = this.parseBindingAtom();
				this.enterLexicalScope();
				this.checkLVal(clause.param, "let");
				this.expect(types.parenR);
				clause.body = this.parseBlock(false);
				this.exitLexicalScope();
				node.handler = this.finishNode(clause, "CatchClause");
			}
			node.finalizer = this.eat(types._finally) ? this.parseBlock() : null;
			if (!node.handler && !node.finalizer) {
				this.raise(node.start, "Missing catch or finally clause");
			}
			return this.finishNode(node, "TryStatement");
		};

		pp$1.parseVarStatement = function (node, kind) {
			this.next();
			this.parseVar(node, false, kind);
			this.semicolon();
			return this.finishNode(node, "VariableDeclaration");
		};

		pp$1.parseWhileStatement = function (node) {
			this.next();
			node.test = this.parseParenExpression();
			this.labels.push(loopLabel);
			node.body = this.parseStatement(false);
			this.labels.pop();
			return this.finishNode(node, "WhileStatement");
		};

		pp$1.parseWithStatement = function (node) {
			if (this.strict) {
				this.raise(this.start, "'with' in strict mode");
			}
			this.next();
			node.object = this.parseParenExpression();
			node.body = this.parseStatement(false);
			return this.finishNode(node, "WithStatement");
		};

		pp$1.parseEmptyStatement = function (node) {
			this.next();
			return this.finishNode(node, "EmptyStatement");
		};

		pp$1.parseLabeledStatement = function (node, maybeName, expr) {
			var this$1 = this;

			for (var i$1 = 0, list = this$1.labels; i$1 < list.length; i$1 += 1) {
				var label = list[i$1];

				if (label.name === maybeName) {
					this$1.raise(expr.start, "Label '" + maybeName + "' is already declared");
				}
			}
			var kind = this.type.isLoop ? "loop" : this.type === types._switch ? "switch" : null;
			for (var i = this.labels.length - 1; i >= 0; i--) {
				var label$1 = this$1.labels[i];
				if (label$1.statementStart == node.start) {
					label$1.statementStart = this$1.start;
					label$1.kind = kind;
				} else {
					break;
				}
			}
			this.labels.push({ name: maybeName, kind: kind, statementStart: this.start });
			node.body = this.parseStatement(true);
			if (node.body.type == "ClassDeclaration" || node.body.type == "VariableDeclaration" && node.body.kind != "var" || node.body.type == "FunctionDeclaration" && (this.strict || node.body.generator)) {
				this.raiseRecoverable(node.body.start, "Invalid labeled declaration");
			}
			this.labels.pop();
			node.label = expr;
			return this.finishNode(node, "LabeledStatement");
		};

		pp$1.parseExpressionStatement = function (node, expr) {
			node.expression = expr;
			this.semicolon();
			return this.finishNode(node, "ExpressionStatement");
		};

		// Parse a semicolon-enclosed block of statements, handling `"use
		// strict"` declarations when `allowStrict` is true (used for
		// function bodies).

		pp$1.parseBlock = function (createNewLexicalScope) {
			var this$1 = this;
			if (createNewLexicalScope === void 0) createNewLexicalScope = true;

			var node = this.startNode();
			node.body = [];
			this.expect(types.braceL);
			if (createNewLexicalScope) {
				this.enterLexicalScope();
			}
			while (!this.eat(types.braceR)) {
				var stmt = this$1.parseStatement(true);
				node.body.push(stmt);
			}
			if (createNewLexicalScope) {
				this.exitLexicalScope();
			}
			return this.finishNode(node, "BlockStatement");
		};

		// Parse a regular `for` loop. The disambiguation code in
		// `parseStatement` will already have parsed the init statement or
		// expression.

		pp$1.parseFor = function (node, init) {
			node.init = init;
			this.expect(types.semi);
			node.test = this.type === types.semi ? null : this.parseExpression();
			this.expect(types.semi);
			node.update = this.type === types.parenR ? null : this.parseExpression();
			this.expect(types.parenR);
			this.exitLexicalScope();
			node.body = this.parseStatement(false);
			this.labels.pop();
			return this.finishNode(node, "ForStatement");
		};

		// Parse a `for`/`in` and `for`/`of` loop, which are almost
		// same from parser's perspective.

		pp$1.parseForIn = function (node, init) {
			var type = this.type === types._in ? "ForInStatement" : "ForOfStatement";
			this.next();
			node.left = init;
			node.right = this.parseExpression();
			this.expect(types.parenR);
			this.exitLexicalScope();
			node.body = this.parseStatement(false);
			this.labels.pop();
			return this.finishNode(node, type);
		};

		// Parse a list of variable declarations.

		pp$1.parseVar = function (node, isFor, kind) {
			var this$1 = this;

			node.declarations = [];
			node.kind = kind;
			for (;;) {
				var decl = this$1.startNode();
				this$1.parseVarId(decl, kind);
				if (this$1.eat(types.eq)) {
					decl.init = this$1.parseMaybeAssign(isFor);
				} else if (kind === "const" && !(this$1.type === types._in || this$1.options.ecmaVersion >= 6 && this$1.isContextual("of"))) {
					this$1.unexpected();
				} else if (decl.id.type != "Identifier" && !(isFor && (this$1.type === types._in || this$1.isContextual("of")))) {
					this$1.raise(this$1.lastTokEnd, "Complex binding patterns require an initialization value");
				} else {
					decl.init = null;
				}
				node.declarations.push(this$1.finishNode(decl, "VariableDeclarator"));
				if (!this$1.eat(types.comma)) {
					break;
				}
			}
			return node;
		};

		pp$1.parseVarId = function (decl, kind) {
			decl.id = this.parseBindingAtom(kind);
			this.checkLVal(decl.id, kind, false);
		};

		// Parse a function declaration or literal (depending on the
		// `isStatement` parameter).

		pp$1.parseFunction = function (node, isStatement, allowExpressionBody, isAsync) {
			this.initFunction(node);
			if (this.options.ecmaVersion >= 6 && !isAsync) {
				node.generator = this.eat(types.star);
			}
			if (this.options.ecmaVersion >= 8) {
				node.async = !!isAsync;
			}

			if (isStatement) {
				node.id = isStatement === "nullableID" && this.type != types.name ? null : this.parseIdent();
				if (node.id) {
					this.checkLVal(node.id, "var");
				}
			}

			var oldInGen = this.inGenerator,
			    oldInAsync = this.inAsync,
			    oldYieldPos = this.yieldPos,
			    oldAwaitPos = this.awaitPos,
			    oldInFunc = this.inFunction;
			this.inGenerator = node.generator;
			this.inAsync = node.async;
			this.yieldPos = 0;
			this.awaitPos = 0;
			this.inFunction = true;
			this.enterFunctionScope();

			if (!isStatement) {
				node.id = this.type == types.name ? this.parseIdent() : null;
			}

			this.parseFunctionParams(node);
			this.parseFunctionBody(node, allowExpressionBody);

			this.inGenerator = oldInGen;
			this.inAsync = oldInAsync;
			this.yieldPos = oldYieldPos;
			this.awaitPos = oldAwaitPos;
			this.inFunction = oldInFunc;
			return this.finishNode(node, isStatement ? "FunctionDeclaration" : "FunctionExpression");
		};

		pp$1.parseFunctionParams = function (node) {
			this.expect(types.parenL);
			node.params = this.parseBindingList(types.parenR, false, this.options.ecmaVersion >= 8);
			this.checkYieldAwaitInDefaultParams();
		};

		// Parse a class declaration or literal (depending on the
		// `isStatement` parameter).

		pp$1.parseClass = function (node, isStatement) {
			var this$1 = this;

			this.next();

			this.parseClassId(node, isStatement);
			this.parseClassSuper(node);
			var classBody = this.startNode();
			var hadConstructor = false;
			classBody.body = [];
			this.expect(types.braceL);
			while (!this.eat(types.braceR)) {
				if (this$1.eat(types.semi)) {
					continue;
				}
				var method = this$1.startNode();
				var isGenerator = this$1.eat(types.star);
				var isAsync = false;
				var isMaybeStatic = this$1.type === types.name && this$1.value === "static";
				this$1.parsePropertyName(method);
				method.static = isMaybeStatic && this$1.type !== types.parenL;
				if (method.static) {
					if (isGenerator) {
						this$1.unexpected();
					}
					isGenerator = this$1.eat(types.star);
					this$1.parsePropertyName(method);
				}
				if (this$1.options.ecmaVersion >= 8 && !isGenerator && !method.computed && method.key.type === "Identifier" && method.key.name === "async" && this$1.type !== types.parenL && !this$1.canInsertSemicolon()) {
					isAsync = true;
					this$1.parsePropertyName(method);
				}
				method.kind = "method";
				var isGetSet = false;
				if (!method.computed) {
					var key = method.key;
					if (!isGenerator && !isAsync && key.type === "Identifier" && this$1.type !== types.parenL && (key.name === "get" || key.name === "set")) {
						isGetSet = true;
						method.kind = key.name;
						key = this$1.parsePropertyName(method);
					}
					if (!method.static && (key.type === "Identifier" && key.name === "constructor" || key.type === "Literal" && key.value === "constructor")) {
						if (hadConstructor) {
							this$1.raise(key.start, "Duplicate constructor in the same class");
						}
						if (isGetSet) {
							this$1.raise(key.start, "Constructor can't have get/set modifier");
						}
						if (isGenerator) {
							this$1.raise(key.start, "Constructor can't be a generator");
						}
						if (isAsync) {
							this$1.raise(key.start, "Constructor can't be an async method");
						}
						method.kind = "constructor";
						hadConstructor = true;
					}
				}
				this$1.parseClassMethod(classBody, method, isGenerator, isAsync);
				if (isGetSet) {
					var paramCount = method.kind === "get" ? 0 : 1;
					if (method.value.params.length !== paramCount) {
						var start = method.value.start;
						if (method.kind === "get") {
							this$1.raiseRecoverable(start, "getter should have no params");
						} else {
							this$1.raiseRecoverable(start, "setter should have exactly one param");
						}
					} else {
						if (method.kind === "set" && method.value.params[0].type === "RestElement") {
							this$1.raiseRecoverable(method.value.params[0].start, "Setter cannot use rest params");
						}
					}
				}
			}
			node.body = this.finishNode(classBody, "ClassBody");
			return this.finishNode(node, isStatement ? "ClassDeclaration" : "ClassExpression");
		};

		pp$1.parseClassMethod = function (classBody, method, isGenerator, isAsync) {
			method.value = this.parseMethod(isGenerator, isAsync);
			classBody.body.push(this.finishNode(method, "MethodDefinition"));
		};

		pp$1.parseClassId = function (node, isStatement) {
			node.id = this.type === types.name ? this.parseIdent() : isStatement === true ? this.unexpected() : null;
		};

		pp$1.parseClassSuper = function (node) {
			node.superClass = this.eat(types._extends) ? this.parseExprSubscripts() : null;
		};

		// Parses module export declaration.

		pp$1.parseExport = function (node, exports) {
			var this$1 = this;

			this.next();
			// export * from '...'
			if (this.eat(types.star)) {
				this.expectContextual("from");
				node.source = this.type === types.string ? this.parseExprAtom() : this.unexpected();
				this.semicolon();
				return this.finishNode(node, "ExportAllDeclaration");
			}
			if (this.eat(types._default)) {
				// export default ...
				this.checkExport(exports, "default", this.lastTokStart);
				var isAsync;
				if (this.type === types._function || (isAsync = this.isAsyncFunction())) {
					var fNode = this.startNode();
					this.next();
					if (isAsync) {
						this.next();
					}
					node.declaration = this.parseFunction(fNode, "nullableID", false, isAsync);
				} else if (this.type === types._class) {
					var cNode = this.startNode();
					node.declaration = this.parseClass(cNode, "nullableID");
				} else {
					node.declaration = this.parseMaybeAssign();
					this.semicolon();
				}
				return this.finishNode(node, "ExportDefaultDeclaration");
			}
			// export var|const|let|function|class ...
			if (this.shouldParseExportStatement()) {
				node.declaration = this.parseStatement(true);
				if (node.declaration.type === "VariableDeclaration") {
					this.checkVariableExport(exports, node.declaration.declarations);
				} else {
					this.checkExport(exports, node.declaration.id.name, node.declaration.id.start);
				}
				node.specifiers = [];
				node.source = null;
			} else {
				// export { x, y as z } [from '...']
				node.declaration = null;
				node.specifiers = this.parseExportSpecifiers(exports);
				if (this.eatContextual("from")) {
					node.source = this.type === types.string ? this.parseExprAtom() : this.unexpected();
				} else {
					// check for keywords used as local names
					for (var i = 0, list = node.specifiers; i < list.length; i += 1) {
						var spec = list[i];

						this$1.checkUnreserved(spec.local);
					}

					node.source = null;
				}
				this.semicolon();
			}
			return this.finishNode(node, "ExportNamedDeclaration");
		};

		pp$1.checkExport = function (exports, name, pos) {
			if (!exports) {
				return;
			}
			if (has(exports, name)) {
				this.raiseRecoverable(pos, "Duplicate export '" + name + "'");
			}
			exports[name] = true;
		};

		pp$1.checkPatternExport = function (exports, pat) {
			var this$1 = this;

			var type = pat.type;
			if (type == "Identifier") {
				this.checkExport(exports, pat.name, pat.start);
			} else if (type == "ObjectPattern") {
				for (var i = 0, list = pat.properties; i < list.length; i += 1) {
					var prop = list[i];

					this$1.checkPatternExport(exports, prop.value);
				}
			} else if (type == "ArrayPattern") {
				for (var i$1 = 0, list$1 = pat.elements; i$1 < list$1.length; i$1 += 1) {
					var elt = list$1[i$1];

					if (elt) {
						this$1.checkPatternExport(exports, elt);
					}
				}
			} else if (type == "AssignmentPattern") {
				this.checkPatternExport(exports, pat.left);
			} else if (type == "ParenthesizedExpression") {
				this.checkPatternExport(exports, pat.expression);
			}
		};

		pp$1.checkVariableExport = function (exports, decls) {
			var this$1 = this;

			if (!exports) {
				return;
			}
			for (var i = 0, list = decls; i < list.length; i += 1) {
				var decl = list[i];

				this$1.checkPatternExport(exports, decl.id);
			}
		};

		pp$1.shouldParseExportStatement = function () {
			return this.type.keyword === "var" || this.type.keyword === "const" || this.type.keyword === "class" || this.type.keyword === "function" || this.isLet() || this.isAsyncFunction();
		};

		// Parses a comma-separated list of module exports.

		pp$1.parseExportSpecifiers = function (exports) {
			var this$1 = this;

			var nodes = [],
			    first = true;
			// export { x, y as z } [from '...']
			this.expect(types.braceL);
			while (!this.eat(types.braceR)) {
				if (!first) {
					this$1.expect(types.comma);
					if (this$1.afterTrailingComma(types.braceR)) {
						break;
					}
				} else {
					first = false;
				}

				var node = this$1.startNode();
				node.local = this$1.parseIdent(true);
				node.exported = this$1.eatContextual("as") ? this$1.parseIdent(true) : node.local;
				this$1.checkExport(exports, node.exported.name, node.exported.start);
				nodes.push(this$1.finishNode(node, "ExportSpecifier"));
			}
			return nodes;
		};

		// Parses import declaration.

		pp$1.parseImport = function (node) {
			this.next();
			// import '...'
			if (this.type === types.string) {
				node.specifiers = empty;
				node.source = this.parseExprAtom();
			} else {
				node.specifiers = this.parseImportSpecifiers();
				this.expectContextual("from");
				node.source = this.type === types.string ? this.parseExprAtom() : this.unexpected();
			}
			this.semicolon();
			return this.finishNode(node, "ImportDeclaration");
		};

		// Parses a comma-separated list of module imports.

		pp$1.parseImportSpecifiers = function () {
			var this$1 = this;

			var nodes = [],
			    first = true;
			if (this.type === types.name) {
				// import defaultObj, { x, y as z } from '...'
				var node = this.startNode();
				node.local = this.parseIdent();
				this.checkLVal(node.local, "let");
				nodes.push(this.finishNode(node, "ImportDefaultSpecifier"));
				if (!this.eat(types.comma)) {
					return nodes;
				}
			}
			if (this.type === types.star) {
				var node$1 = this.startNode();
				this.next();
				this.expectContextual("as");
				node$1.local = this.parseIdent();
				this.checkLVal(node$1.local, "let");
				nodes.push(this.finishNode(node$1, "ImportNamespaceSpecifier"));
				return nodes;
			}
			this.expect(types.braceL);
			while (!this.eat(types.braceR)) {
				if (!first) {
					this$1.expect(types.comma);
					if (this$1.afterTrailingComma(types.braceR)) {
						break;
					}
				} else {
					first = false;
				}

				var node$2 = this$1.startNode();
				node$2.imported = this$1.parseIdent(true);
				if (this$1.eatContextual("as")) {
					node$2.local = this$1.parseIdent();
				} else {
					this$1.checkUnreserved(node$2.imported);
					node$2.local = node$2.imported;
				}
				this$1.checkLVal(node$2.local, "let");
				nodes.push(this$1.finishNode(node$2, "ImportSpecifier"));
			}
			return nodes;
		};

		// Set `ExpressionStatement#directive` property for directive prologues.
		pp$1.adaptDirectivePrologue = function (statements) {
			for (var i = 0; i < statements.length && this.isDirectiveCandidate(statements[i]); ++i) {
				statements[i].directive = statements[i].expression.raw.slice(1, -1);
			}
		};
		pp$1.isDirectiveCandidate = function (statement) {
			return statement.type === "ExpressionStatement" && statement.expression.type === "Literal" && typeof statement.expression.value === "string" && (
			// Reject parenthesized strings.
			this.input[statement.start] === "\"" || this.input[statement.start] === "'");
		};

		var pp$2 = Parser.prototype;

		// Convert existing expression atom to assignable pattern
		// if possible.

		pp$2.toAssignable = function (node, isBinding) {
			var this$1 = this;

			if (this.options.ecmaVersion >= 6 && node) {
				switch (node.type) {
					case "Identifier":
						if (this.inAsync && node.name === "await") {
							this.raise(node.start, "Can not use 'await' as identifier inside an async function");
						}
						break;

					case "ObjectPattern":
					case "ArrayPattern":
						break;

					case "ObjectExpression":
						node.type = "ObjectPattern";
						for (var i = 0, list = node.properties; i < list.length; i += 1) {
							var prop = list[i];

							if (prop.kind !== "init") {
								this$1.raise(prop.key.start, "Object pattern can't contain getter or setter");
							}
							this$1.toAssignable(prop.value, isBinding);
						}
						break;

					case "ArrayExpression":
						node.type = "ArrayPattern";
						this.toAssignableList(node.elements, isBinding);
						break;

					case "AssignmentExpression":
						if (node.operator === "=") {
							node.type = "AssignmentPattern";
							delete node.operator;
							this.toAssignable(node.left, isBinding);
							// falls through to AssignmentPattern
						} else {
							this.raise(node.left.end, "Only '=' operator can be used for specifying default value.");
							break;
						}

					case "AssignmentPattern":
						break;

					case "ParenthesizedExpression":
						this.toAssignable(node.expression, isBinding);
						break;

					case "MemberExpression":
						if (!isBinding) {
							break;
						}

					default:
						this.raise(node.start, "Assigning to rvalue");
				}
			}
			return node;
		};

		// Convert list of expression atoms to binding list.

		pp$2.toAssignableList = function (exprList, isBinding) {
			var this$1 = this;

			var end = exprList.length;
			if (end) {
				var last = exprList[end - 1];
				if (last && last.type == "RestElement") {
					--end;
				} else if (last && last.type == "SpreadElement") {
					last.type = "RestElement";
					var arg = last.argument;
					this.toAssignable(arg, isBinding);
					--end;
				}

				if (this.options.ecmaVersion === 6 && isBinding && last && last.type === "RestElement" && last.argument.type !== "Identifier") {
					this.unexpected(last.argument.start);
				}
			}
			for (var i = 0; i < end; i++) {
				var elt = exprList[i];
				if (elt) {
					this$1.toAssignable(elt, isBinding);
				}
			}
			return exprList;
		};

		// Parses spread element.

		pp$2.parseSpread = function (refDestructuringErrors) {
			var node = this.startNode();
			this.next();
			node.argument = this.parseMaybeAssign(false, refDestructuringErrors);
			return this.finishNode(node, "SpreadElement");
		};

		pp$2.parseRestBinding = function () {
			var node = this.startNode();
			this.next();

			// RestElement inside of a function parameter must be an identifier
			if (this.options.ecmaVersion === 6 && this.type !== types.name) {
				this.unexpected();
			}

			node.argument = this.parseBindingAtom();

			return this.finishNode(node, "RestElement");
		};

		// Parses lvalue (assignable) atom.

		pp$2.parseBindingAtom = function () {
			if (this.options.ecmaVersion >= 6) {
				switch (this.type) {
					case types.bracketL:
						var node = this.startNode();
						this.next();
						node.elements = this.parseBindingList(types.bracketR, true, true);
						return this.finishNode(node, "ArrayPattern");

					case types.braceL:
						return this.parseObj(true);
				}
			}
			return this.parseIdent();
		};

		pp$2.parseBindingList = function (close, allowEmpty, allowTrailingComma) {
			var this$1 = this;

			var elts = [],
			    first = true;
			while (!this.eat(close)) {
				if (first) {
					first = false;
				} else {
					this$1.expect(types.comma);
				}
				if (allowEmpty && this$1.type === types.comma) {
					elts.push(null);
				} else if (allowTrailingComma && this$1.afterTrailingComma(close)) {
					break;
				} else if (this$1.type === types.ellipsis) {
					var rest = this$1.parseRestBinding();
					this$1.parseBindingListItem(rest);
					elts.push(rest);
					if (this$1.type === types.comma) {
						this$1.raise(this$1.start, "Comma is not permitted after the rest element");
					}
					this$1.expect(close);
					break;
				} else {
					var elem = this$1.parseMaybeDefault(this$1.start, this$1.startLoc);
					this$1.parseBindingListItem(elem);
					elts.push(elem);
				}
			}
			return elts;
		};

		pp$2.parseBindingListItem = function (param) {
			return param;
		};

		// Parses assignment pattern around given atom if possible.

		pp$2.parseMaybeDefault = function (startPos, startLoc, left) {
			left = left || this.parseBindingAtom();
			if (this.options.ecmaVersion < 6 || !this.eat(types.eq)) {
				return left;
			}
			var node = this.startNodeAt(startPos, startLoc);
			node.left = left;
			node.right = this.parseMaybeAssign();
			return this.finishNode(node, "AssignmentPattern");
		};

		// Verify that a node is an lval — something that can be assigned
		// to.
		// bindingType can be either:
		// 'var' indicating that the lval creates a 'var' binding
		// 'let' indicating that the lval creates a lexical ('let' or 'const') binding
		// 'none' indicating that the binding should be checked for illegal identifiers, but not for duplicate references

		pp$2.checkLVal = function (expr, bindingType, checkClashes) {
			var this$1 = this;

			switch (expr.type) {
				case "Identifier":
					if (this.strict && this.reservedWordsStrictBind.test(expr.name)) {
						this.raiseRecoverable(expr.start, (bindingType ? "Binding " : "Assigning to ") + expr.name + " in strict mode");
					}
					if (checkClashes) {
						if (has(checkClashes, expr.name)) {
							this.raiseRecoverable(expr.start, "Argument name clash");
						}
						checkClashes[expr.name] = true;
					}
					if (bindingType && bindingType !== "none") {
						if (bindingType === "var" && !this.canDeclareVarName(expr.name) || bindingType !== "var" && !this.canDeclareLexicalName(expr.name)) {
							this.raiseRecoverable(expr.start, "Identifier '" + expr.name + "' has already been declared");
						}
						if (bindingType === "var") {
							this.declareVarName(expr.name);
						} else {
							this.declareLexicalName(expr.name);
						}
					}
					break;

				case "MemberExpression":
					if (bindingType) {
						this.raiseRecoverable(expr.start, (bindingType ? "Binding" : "Assigning to") + " member expression");
					}
					break;

				case "ObjectPattern":
					for (var i = 0, list = expr.properties; i < list.length; i += 1) {
						var prop = list[i];

						this$1.checkLVal(prop.value, bindingType, checkClashes);
					}
					break;

				case "ArrayPattern":
					for (var i$1 = 0, list$1 = expr.elements; i$1 < list$1.length; i$1 += 1) {
						var elem = list$1[i$1];

						if (elem) {
							this$1.checkLVal(elem, bindingType, checkClashes);
						}
					}
					break;

				case "AssignmentPattern":
					this.checkLVal(expr.left, bindingType, checkClashes);
					break;

				case "RestElement":
					this.checkLVal(expr.argument, bindingType, checkClashes);
					break;

				case "ParenthesizedExpression":
					this.checkLVal(expr.expression, bindingType, checkClashes);
					break;

				default:
					this.raise(expr.start, (bindingType ? "Binding" : "Assigning to") + " rvalue");
			}
		};

		// A recursive descent parser operates by defining functions for all
		// syntactic elements, and recursively calling those, each function
		// advancing the input stream and returning an AST node. Precedence
		// of constructs (for example, the fact that `!x[1]` means `!(x[1])`
		// instead of `(!x)[1]` is handled by the fact that the parser
		// function that parses unary prefix operators is called first, and
		// in turn calls the function that parses `[]` subscripts — that
		// way, it'll receive the node for `x[1]` already parsed, and wraps
		// *that* in the unary operator node.
		//
		// Acorn uses an [operator precedence parser][opp] to handle binary
		// operator precedence, because it is much more compact than using
		// the technique outlined above, which uses different, nesting
		// functions to specify precedence, for all of the ten binary
		// precedence levels that JavaScript defines.
		//
		// [opp]: http://en.wikipedia.org/wiki/Operator-precedence_parser

		var pp$3 = Parser.prototype;

		// Check if property name clashes with already added.
		// Object/class getters and setters are not allowed to clash —
		// either with each other or with an init property — and in
		// strict mode, init properties are also not allowed to be repeated.

		pp$3.checkPropClash = function (prop, propHash) {
			if (this.options.ecmaVersion >= 6 && (prop.computed || prop.method || prop.shorthand)) {
				return;
			}
			var key = prop.key;
			var name;
			switch (key.type) {
				case "Identifier":
					name = key.name;break;
				case "Literal":
					name = String(key.value);break;
				default:
					return;
			}
			var kind = prop.kind;
			if (this.options.ecmaVersion >= 6) {
				if (name === "__proto__" && kind === "init") {
					if (propHash.proto) {
						this.raiseRecoverable(key.start, "Redefinition of __proto__ property");
					}
					propHash.proto = true;
				}
				return;
			}
			name = "$" + name;
			var other = propHash[name];
			if (other) {
				var redefinition;
				if (kind === "init") {
					redefinition = this.strict && other.init || other.get || other.set;
				} else {
					redefinition = other.init || other[kind];
				}
				if (redefinition) {
					this.raiseRecoverable(key.start, "Redefinition of property");
				}
			} else {
				other = propHash[name] = {
					init: false,
					get: false,
					set: false
				};
			}
			other[kind] = true;
		};

		// ### Expression parsing

		// These nest, from the most general expression type at the top to
		// 'atomic', nondivisible expression types at the bottom. Most of
		// the functions will simply let the function(s) below them parse,
		// and, *if* the syntactic construct they handle is present, wrap
		// the AST node that the inner parser gave them in another node.

		// Parse a full expression. The optional arguments are used to
		// forbid the `in` operator (in for loops initalization expressions)
		// and provide reference for storing '=' operator inside shorthand
		// property assignment in contexts where both object expression
		// and object pattern might appear (so it's possible to raise
		// delayed syntax error at correct position).

		pp$3.parseExpression = function (noIn, refDestructuringErrors) {
			var this$1 = this;

			var startPos = this.start,
			    startLoc = this.startLoc;
			var expr = this.parseMaybeAssign(noIn, refDestructuringErrors);
			if (this.type === types.comma) {
				var node = this.startNodeAt(startPos, startLoc);
				node.expressions = [expr];
				while (this.eat(types.comma)) {
					node.expressions.push(this$1.parseMaybeAssign(noIn, refDestructuringErrors));
				}
				return this.finishNode(node, "SequenceExpression");
			}
			return expr;
		};

		// Parse an assignment expression. This includes applications of
		// operators like `+=`.

		pp$3.parseMaybeAssign = function (noIn, refDestructuringErrors, afterLeftParse) {
			if (this.inGenerator && this.isContextual("yield")) {
				return this.parseYield();
			}

			var ownDestructuringErrors = false,
			    oldParenAssign = -1,
			    oldTrailingComma = -1;
			if (refDestructuringErrors) {
				oldParenAssign = refDestructuringErrors.parenthesizedAssign;
				oldTrailingComma = refDestructuringErrors.trailingComma;
				refDestructuringErrors.parenthesizedAssign = refDestructuringErrors.trailingComma = -1;
			} else {
				refDestructuringErrors = new DestructuringErrors();
				ownDestructuringErrors = true;
			}

			var startPos = this.start,
			    startLoc = this.startLoc;
			if (this.type == types.parenL || this.type == types.name) {
				this.potentialArrowAt = this.start;
			}
			var left = this.parseMaybeConditional(noIn, refDestructuringErrors);
			if (afterLeftParse) {
				left = afterLeftParse.call(this, left, startPos, startLoc);
			}
			if (this.type.isAssign) {
				this.checkPatternErrors(refDestructuringErrors, true);
				if (!ownDestructuringErrors) {
					DestructuringErrors.call(refDestructuringErrors);
				}
				var node = this.startNodeAt(startPos, startLoc);
				node.operator = this.value;
				node.left = this.type === types.eq ? this.toAssignable(left) : left;
				refDestructuringErrors.shorthandAssign = -1; // reset because shorthand default was used correctly
				this.checkLVal(left);
				this.next();
				node.right = this.parseMaybeAssign(noIn);
				return this.finishNode(node, "AssignmentExpression");
			} else {
				if (ownDestructuringErrors) {
					this.checkExpressionErrors(refDestructuringErrors, true);
				}
			}
			if (oldParenAssign > -1) {
				refDestructuringErrors.parenthesizedAssign = oldParenAssign;
			}
			if (oldTrailingComma > -1) {
				refDestructuringErrors.trailingComma = oldTrailingComma;
			}
			return left;
		};

		// Parse a ternary conditional (`?:`) operator.

		pp$3.parseMaybeConditional = function (noIn, refDestructuringErrors) {
			var startPos = this.start,
			    startLoc = this.startLoc;
			var expr = this.parseExprOps(noIn, refDestructuringErrors);
			if (this.checkExpressionErrors(refDestructuringErrors)) {
				return expr;
			}
			if (this.eat(types.question)) {
				var node = this.startNodeAt(startPos, startLoc);
				node.test = expr;
				node.consequent = this.parseMaybeAssign();
				this.expect(types.colon);
				node.alternate = this.parseMaybeAssign(noIn);
				return this.finishNode(node, "ConditionalExpression");
			}
			return expr;
		};

		// Start the precedence parser.

		pp$3.parseExprOps = function (noIn, refDestructuringErrors) {
			var startPos = this.start,
			    startLoc = this.startLoc;
			var expr = this.parseMaybeUnary(refDestructuringErrors, false);
			if (this.checkExpressionErrors(refDestructuringErrors)) {
				return expr;
			}
			return expr.start == startPos && expr.type === "ArrowFunctionExpression" ? expr : this.parseExprOp(expr, startPos, startLoc, -1, noIn);
		};

		// Parse binary operators with the operator precedence parsing
		// algorithm. `left` is the left-hand side of the operator.
		// `minPrec` provides context that allows the function to stop and
		// defer further parser to one of its callers when it encounters an
		// operator that has a lower precedence than the set it is parsing.

		pp$3.parseExprOp = function (left, leftStartPos, leftStartLoc, minPrec, noIn) {
			var prec = this.type.binop;
			if (prec != null && (!noIn || this.type !== types._in)) {
				if (prec > minPrec) {
					var logical = this.type === types.logicalOR || this.type === types.logicalAND;
					var op = this.value;
					this.next();
					var startPos = this.start,
					    startLoc = this.startLoc;
					var right = this.parseExprOp(this.parseMaybeUnary(null, false), startPos, startLoc, prec, noIn);
					var node = this.buildBinary(leftStartPos, leftStartLoc, left, right, op, logical);
					return this.parseExprOp(node, leftStartPos, leftStartLoc, minPrec, noIn);
				}
			}
			return left;
		};

		pp$3.buildBinary = function (startPos, startLoc, left, right, op, logical) {
			var node = this.startNodeAt(startPos, startLoc);
			node.left = left;
			node.operator = op;
			node.right = right;
			return this.finishNode(node, logical ? "LogicalExpression" : "BinaryExpression");
		};

		// Parse unary operators, both prefix and postfix.

		pp$3.parseMaybeUnary = function (refDestructuringErrors, sawUnary) {
			var this$1 = this;

			var startPos = this.start,
			    startLoc = this.startLoc,
			    expr;
			if (this.inAsync && this.isContextual("await")) {
				expr = this.parseAwait();
				sawUnary = true;
			} else if (this.type.prefix) {
				var node = this.startNode(),
				    update = this.type === types.incDec;
				node.operator = this.value;
				node.prefix = true;
				this.next();
				node.argument = this.parseMaybeUnary(null, true);
				this.checkExpressionErrors(refDestructuringErrors, true);
				if (update) {
					this.checkLVal(node.argument);
				} else if (this.strict && node.operator === "delete" && node.argument.type === "Identifier") {
					this.raiseRecoverable(node.start, "Deleting local variable in strict mode");
				} else {
					sawUnary = true;
				}
				expr = this.finishNode(node, update ? "UpdateExpression" : "UnaryExpression");
			} else {
				expr = this.parseExprSubscripts(refDestructuringErrors);
				if (this.checkExpressionErrors(refDestructuringErrors)) {
					return expr;
				}
				while (this.type.postfix && !this.canInsertSemicolon()) {
					var node$1 = this$1.startNodeAt(startPos, startLoc);
					node$1.operator = this$1.value;
					node$1.prefix = false;
					node$1.argument = expr;
					this$1.checkLVal(expr);
					this$1.next();
					expr = this$1.finishNode(node$1, "UpdateExpression");
				}
			}

			if (!sawUnary && this.eat(types.starstar)) {
				return this.buildBinary(startPos, startLoc, expr, this.parseMaybeUnary(null, false), "**", false);
			} else {
				return expr;
			}
		};

		// Parse call, dot, and `[]`-subscript expressions.

		pp$3.parseExprSubscripts = function (refDestructuringErrors) {
			var startPos = this.start,
			    startLoc = this.startLoc;
			var expr = this.parseExprAtom(refDestructuringErrors);
			var skipArrowSubscripts = expr.type === "ArrowFunctionExpression" && this.input.slice(this.lastTokStart, this.lastTokEnd) !== ")";
			if (this.checkExpressionErrors(refDestructuringErrors) || skipArrowSubscripts) {
				return expr;
			}
			var result = this.parseSubscripts(expr, startPos, startLoc);
			if (refDestructuringErrors && result.type === "MemberExpression") {
				if (refDestructuringErrors.parenthesizedAssign >= result.start) {
					refDestructuringErrors.parenthesizedAssign = -1;
				}
				if (refDestructuringErrors.parenthesizedBind >= result.start) {
					refDestructuringErrors.parenthesizedBind = -1;
				}
			}
			return result;
		};

		pp$3.parseSubscripts = function (base, startPos, startLoc, noCalls) {
			var this$1 = this;

			var maybeAsyncArrow = this.options.ecmaVersion >= 8 && base.type === "Identifier" && base.name === "async" && this.lastTokEnd == base.end && !this.canInsertSemicolon();
			for (var computed = void 0;;) {
				if ((computed = this$1.eat(types.bracketL)) || this$1.eat(types.dot)) {
					var node = this$1.startNodeAt(startPos, startLoc);
					node.object = base;
					node.property = computed ? this$1.parseExpression() : this$1.parseIdent(true);
					node.computed = !!computed;
					if (computed) {
						this$1.expect(types.bracketR);
					}
					base = this$1.finishNode(node, "MemberExpression");
				} else if (!noCalls && this$1.eat(types.parenL)) {
					var refDestructuringErrors = new DestructuringErrors(),
					    oldYieldPos = this$1.yieldPos,
					    oldAwaitPos = this$1.awaitPos;
					this$1.yieldPos = 0;
					this$1.awaitPos = 0;
					var exprList = this$1.parseExprList(types.parenR, this$1.options.ecmaVersion >= 8, false, refDestructuringErrors);
					if (maybeAsyncArrow && !this$1.canInsertSemicolon() && this$1.eat(types.arrow)) {
						this$1.checkPatternErrors(refDestructuringErrors, false);
						this$1.checkYieldAwaitInDefaultParams();
						this$1.yieldPos = oldYieldPos;
						this$1.awaitPos = oldAwaitPos;
						return this$1.parseArrowExpression(this$1.startNodeAt(startPos, startLoc), exprList, true);
					}
					this$1.checkExpressionErrors(refDestructuringErrors, true);
					this$1.yieldPos = oldYieldPos || this$1.yieldPos;
					this$1.awaitPos = oldAwaitPos || this$1.awaitPos;
					var node$1 = this$1.startNodeAt(startPos, startLoc);
					node$1.callee = base;
					node$1.arguments = exprList;
					base = this$1.finishNode(node$1, "CallExpression");
				} else if (this$1.type === types.backQuote) {
					var node$2 = this$1.startNodeAt(startPos, startLoc);
					node$2.tag = base;
					node$2.quasi = this$1.parseTemplate({ isTagged: true });
					base = this$1.finishNode(node$2, "TaggedTemplateExpression");
				} else {
					return base;
				}
			}
		};

		// Parse an atomic expression — either a single token that is an
		// expression, an expression started by a keyword like `function` or
		// `new`, or an expression wrapped in punctuation like `()`, `[]`,
		// or `{}`.

		pp$3.parseExprAtom = function (refDestructuringErrors) {
			var node,
			    canBeArrow = this.potentialArrowAt == this.start;
			switch (this.type) {
				case types._super:
					if (!this.inFunction) {
						this.raise(this.start, "'super' outside of function or class");
					}
					node = this.startNode();
					this.next();
					// The `super` keyword can appear at below:
					// SuperProperty:
					//     super [ Expression ]
					//     super . IdentifierName
					// SuperCall:
					//     super Arguments
					if (this.type !== types.dot && this.type !== types.bracketL && this.type !== types.parenL) {
						this.unexpected();
					}
					return this.finishNode(node, "Super");

				case types._this:
					node = this.startNode();
					this.next();
					return this.finishNode(node, "ThisExpression");

				case types.name:
					var startPos = this.start,
					    startLoc = this.startLoc;
					var id = this.parseIdent(this.type !== types.name);
					if (this.options.ecmaVersion >= 8 && id.name === "async" && !this.canInsertSemicolon() && this.eat(types._function)) {
						return this.parseFunction(this.startNodeAt(startPos, startLoc), false, false, true);
					}
					if (canBeArrow && !this.canInsertSemicolon()) {
						if (this.eat(types.arrow)) {
							return this.parseArrowExpression(this.startNodeAt(startPos, startLoc), [id], false);
						}
						if (this.options.ecmaVersion >= 8 && id.name === "async" && this.type === types.name) {
							id = this.parseIdent();
							if (this.canInsertSemicolon() || !this.eat(types.arrow)) {
								this.unexpected();
							}
							return this.parseArrowExpression(this.startNodeAt(startPos, startLoc), [id], true);
						}
					}
					return id;

				case types.regexp:
					var value = this.value;
					node = this.parseLiteral(value.value);
					node.regex = { pattern: value.pattern, flags: value.flags };
					return node;

				case types.num:case types.string:
					return this.parseLiteral(this.value);

				case types._null:case types._true:case types._false:
					node = this.startNode();
					node.value = this.type === types._null ? null : this.type === types._true;
					node.raw = this.type.keyword;
					this.next();
					return this.finishNode(node, "Literal");

				case types.parenL:
					var start = this.start,
					    expr = this.parseParenAndDistinguishExpression(canBeArrow);
					if (refDestructuringErrors) {
						if (refDestructuringErrors.parenthesizedAssign < 0 && !this.isSimpleAssignTarget(expr)) {
							refDestructuringErrors.parenthesizedAssign = start;
						}
						if (refDestructuringErrors.parenthesizedBind < 0) {
							refDestructuringErrors.parenthesizedBind = start;
						}
					}
					return expr;

				case types.bracketL:
					node = this.startNode();
					this.next();
					node.elements = this.parseExprList(types.bracketR, true, true, refDestructuringErrors);
					return this.finishNode(node, "ArrayExpression");

				case types.braceL:
					return this.parseObj(false, refDestructuringErrors);

				case types._function:
					node = this.startNode();
					this.next();
					return this.parseFunction(node, false);

				case types._class:
					return this.parseClass(this.startNode(), false);

				case types._new:
					return this.parseNew();

				case types.backQuote:
					return this.parseTemplate();

				default:
					this.unexpected();
			}
		};

		pp$3.parseLiteral = function (value) {
			var node = this.startNode();
			node.value = value;
			node.raw = this.input.slice(this.start, this.end);
			this.next();
			return this.finishNode(node, "Literal");
		};

		pp$3.parseParenExpression = function () {
			this.expect(types.parenL);
			var val = this.parseExpression();
			this.expect(types.parenR);
			return val;
		};

		pp$3.parseParenAndDistinguishExpression = function (canBeArrow) {
			var this$1 = this;

			var startPos = this.start,
			    startLoc = this.startLoc,
			    val,
			    allowTrailingComma = this.options.ecmaVersion >= 8;
			if (this.options.ecmaVersion >= 6) {
				this.next();

				var innerStartPos = this.start,
				    innerStartLoc = this.startLoc;
				var exprList = [],
				    first = true,
				    lastIsComma = false;
				var refDestructuringErrors = new DestructuringErrors(),
				    oldYieldPos = this.yieldPos,
				    oldAwaitPos = this.awaitPos,
				    spreadStart,
				    innerParenStart;
				this.yieldPos = 0;
				this.awaitPos = 0;
				while (this.type !== types.parenR) {
					first ? first = false : this$1.expect(types.comma);
					if (allowTrailingComma && this$1.afterTrailingComma(types.parenR, true)) {
						lastIsComma = true;
						break;
					} else if (this$1.type === types.ellipsis) {
						spreadStart = this$1.start;
						exprList.push(this$1.parseParenItem(this$1.parseRestBinding()));
						if (this$1.type === types.comma) {
							this$1.raise(this$1.start, "Comma is not permitted after the rest element");
						}
						break;
					} else {
						if (this$1.type === types.parenL && !innerParenStart) {
							innerParenStart = this$1.start;
						}
						exprList.push(this$1.parseMaybeAssign(false, refDestructuringErrors, this$1.parseParenItem));
					}
				}
				var innerEndPos = this.start,
				    innerEndLoc = this.startLoc;
				this.expect(types.parenR);

				if (canBeArrow && !this.canInsertSemicolon() && this.eat(types.arrow)) {
					this.checkPatternErrors(refDestructuringErrors, false);
					this.checkYieldAwaitInDefaultParams();
					if (innerParenStart) {
						this.unexpected(innerParenStart);
					}
					this.yieldPos = oldYieldPos;
					this.awaitPos = oldAwaitPos;
					return this.parseParenArrowList(startPos, startLoc, exprList);
				}

				if (!exprList.length || lastIsComma) {
					this.unexpected(this.lastTokStart);
				}
				if (spreadStart) {
					this.unexpected(spreadStart);
				}
				this.checkExpressionErrors(refDestructuringErrors, true);
				this.yieldPos = oldYieldPos || this.yieldPos;
				this.awaitPos = oldAwaitPos || this.awaitPos;

				if (exprList.length > 1) {
					val = this.startNodeAt(innerStartPos, innerStartLoc);
					val.expressions = exprList;
					this.finishNodeAt(val, "SequenceExpression", innerEndPos, innerEndLoc);
				} else {
					val = exprList[0];
				}
			} else {
				val = this.parseParenExpression();
			}

			if (this.options.preserveParens) {
				var par = this.startNodeAt(startPos, startLoc);
				par.expression = val;
				return this.finishNode(par, "ParenthesizedExpression");
			} else {
				return val;
			}
		};

		pp$3.parseParenItem = function (item) {
			return item;
		};

		pp$3.parseParenArrowList = function (startPos, startLoc, exprList) {
			return this.parseArrowExpression(this.startNodeAt(startPos, startLoc), exprList);
		};

		// New's precedence is slightly tricky. It must allow its argument to
		// be a `[]` or dot subscript expression, but not a call — at least,
		// not without wrapping it in parentheses. Thus, it uses the noCalls
		// argument to parseSubscripts to prevent it from consuming the
		// argument list.

		var empty$1 = [];

		pp$3.parseNew = function () {
			var node = this.startNode();
			var meta = this.parseIdent(true);
			if (this.options.ecmaVersion >= 6 && this.eat(types.dot)) {
				node.meta = meta;
				node.property = this.parseIdent(true);
				if (node.property.name !== "target") {
					this.raiseRecoverable(node.property.start, "The only valid meta property for new is new.target");
				}
				if (!this.inFunction) {
					this.raiseRecoverable(node.start, "new.target can only be used in functions");
				}
				return this.finishNode(node, "MetaProperty");
			}
			var startPos = this.start,
			    startLoc = this.startLoc;
			node.callee = this.parseSubscripts(this.parseExprAtom(), startPos, startLoc, true);
			if (this.eat(types.parenL)) {
				node.arguments = this.parseExprList(types.parenR, this.options.ecmaVersion >= 8, false);
			} else {
				node.arguments = empty$1;
			}
			return this.finishNode(node, "NewExpression");
		};

		// Parse template expression.

		pp$3.parseTemplateElement = function (ref) {
			var isTagged = ref.isTagged;

			var elem = this.startNode();
			if (this.type === types.invalidTemplate) {
				if (!isTagged) {
					this.raiseRecoverable(this.start, "Bad escape sequence in untagged template literal");
				}
				elem.value = {
					raw: this.value,
					cooked: null
				};
			} else {
				elem.value = {
					raw: this.input.slice(this.start, this.end).replace(/\r\n?/g, "\n"),
					cooked: this.value
				};
			}
			this.next();
			elem.tail = this.type === types.backQuote;
			return this.finishNode(elem, "TemplateElement");
		};

		pp$3.parseTemplate = function (ref) {
			var this$1 = this;
			if (ref === void 0) ref = {};
			var isTagged = ref.isTagged;if (isTagged === void 0) isTagged = false;

			var node = this.startNode();
			this.next();
			node.expressions = [];
			var curElt = this.parseTemplateElement({ isTagged: isTagged });
			node.quasis = [curElt];
			while (!curElt.tail) {
				this$1.expect(types.dollarBraceL);
				node.expressions.push(this$1.parseExpression());
				this$1.expect(types.braceR);
				node.quasis.push(curElt = this$1.parseTemplateElement({ isTagged: isTagged }));
			}
			this.next();
			return this.finishNode(node, "TemplateLiteral");
		};

		pp$3.isAsyncProp = function (prop) {
			return !prop.computed && prop.key.type === "Identifier" && prop.key.name === "async" && (this.type === types.name || this.type === types.num || this.type === types.string || this.type === types.bracketL || this.type.keyword) && !lineBreak.test(this.input.slice(this.lastTokEnd, this.start));
		};

		// Parse an object literal or binding pattern.

		pp$3.parseObj = function (isPattern, refDestructuringErrors) {
			var this$1 = this;

			var node = this.startNode(),
			    first = true,
			    propHash = {};
			node.properties = [];
			this.next();
			while (!this.eat(types.braceR)) {
				if (!first) {
					this$1.expect(types.comma);
					if (this$1.afterTrailingComma(types.braceR)) {
						break;
					}
				} else {
					first = false;
				}

				var prop = this$1.parseProperty(isPattern, refDestructuringErrors);
				this$1.checkPropClash(prop, propHash);
				node.properties.push(prop);
			}
			return this.finishNode(node, isPattern ? "ObjectPattern" : "ObjectExpression");
		};

		pp$3.parseProperty = function (isPattern, refDestructuringErrors) {
			var prop = this.startNode(),
			    isGenerator,
			    isAsync,
			    startPos,
			    startLoc;
			if (this.options.ecmaVersion >= 6) {
				prop.method = false;
				prop.shorthand = false;
				if (isPattern || refDestructuringErrors) {
					startPos = this.start;
					startLoc = this.startLoc;
				}
				if (!isPattern) {
					isGenerator = this.eat(types.star);
				}
			}
			this.parsePropertyName(prop);
			if (!isPattern && this.options.ecmaVersion >= 8 && !isGenerator && this.isAsyncProp(prop)) {
				isAsync = true;
				this.parsePropertyName(prop, refDestructuringErrors);
			} else {
				isAsync = false;
			}
			this.parsePropertyValue(prop, isPattern, isGenerator, isAsync, startPos, startLoc, refDestructuringErrors);
			return this.finishNode(prop, "Property");
		};

		pp$3.parsePropertyValue = function (prop, isPattern, isGenerator, isAsync, startPos, startLoc, refDestructuringErrors) {
			if ((isGenerator || isAsync) && this.type === types.colon) {
				this.unexpected();
			}

			if (this.eat(types.colon)) {
				prop.value = isPattern ? this.parseMaybeDefault(this.start, this.startLoc) : this.parseMaybeAssign(false, refDestructuringErrors);
				prop.kind = "init";
			} else if (this.options.ecmaVersion >= 6 && this.type === types.parenL) {
				if (isPattern) {
					this.unexpected();
				}
				prop.kind = "init";
				prop.method = true;
				prop.value = this.parseMethod(isGenerator, isAsync);
			} else if (!isPattern && this.options.ecmaVersion >= 5 && !prop.computed && prop.key.type === "Identifier" && (prop.key.name === "get" || prop.key.name === "set") && this.type != types.comma && this.type != types.braceR) {
				if (isGenerator || isAsync) {
					this.unexpected();
				}
				prop.kind = prop.key.name;
				this.parsePropertyName(prop);
				prop.value = this.parseMethod(false);
				var paramCount = prop.kind === "get" ? 0 : 1;
				if (prop.value.params.length !== paramCount) {
					var start = prop.value.start;
					if (prop.kind === "get") {
						this.raiseRecoverable(start, "getter should have no params");
					} else {
						this.raiseRecoverable(start, "setter should have exactly one param");
					}
				} else {
					if (prop.kind === "set" && prop.value.params[0].type === "RestElement") {
						this.raiseRecoverable(prop.value.params[0].start, "Setter cannot use rest params");
					}
				}
			} else if (this.options.ecmaVersion >= 6 && !prop.computed && prop.key.type === "Identifier") {
				this.checkUnreserved(prop.key);
				prop.kind = "init";
				if (isPattern) {
					prop.value = this.parseMaybeDefault(startPos, startLoc, prop.key);
				} else if (this.type === types.eq && refDestructuringErrors) {
					if (refDestructuringErrors.shorthandAssign < 0) {
						refDestructuringErrors.shorthandAssign = this.start;
					}
					prop.value = this.parseMaybeDefault(startPos, startLoc, prop.key);
				} else {
					prop.value = prop.key;
				}
				prop.shorthand = true;
			} else {
				this.unexpected();
			}
		};

		pp$3.parsePropertyName = function (prop) {
			if (this.options.ecmaVersion >= 6) {
				if (this.eat(types.bracketL)) {
					prop.computed = true;
					prop.key = this.parseMaybeAssign();
					this.expect(types.bracketR);
					return prop.key;
				} else {
					prop.computed = false;
				}
			}
			return prop.key = this.type === types.num || this.type === types.string ? this.parseExprAtom() : this.parseIdent(true);
		};

		// Initialize empty function node.

		pp$3.initFunction = function (node) {
			node.id = null;
			if (this.options.ecmaVersion >= 6) {
				node.generator = false;
				node.expression = false;
			}
			if (this.options.ecmaVersion >= 8) {
				node.async = false;
			}
		};

		// Parse object or class method.

		pp$3.parseMethod = function (isGenerator, isAsync) {
			var node = this.startNode(),
			    oldInGen = this.inGenerator,
			    oldInAsync = this.inAsync,
			    oldYieldPos = this.yieldPos,
			    oldAwaitPos = this.awaitPos,
			    oldInFunc = this.inFunction;

			this.initFunction(node);
			if (this.options.ecmaVersion >= 6) {
				node.generator = isGenerator;
			}
			if (this.options.ecmaVersion >= 8) {
				node.async = !!isAsync;
			}

			this.inGenerator = node.generator;
			this.inAsync = node.async;
			this.yieldPos = 0;
			this.awaitPos = 0;
			this.inFunction = true;
			this.enterFunctionScope();

			this.expect(types.parenL);
			node.params = this.parseBindingList(types.parenR, false, this.options.ecmaVersion >= 8);
			this.checkYieldAwaitInDefaultParams();
			this.parseFunctionBody(node, false);

			this.inGenerator = oldInGen;
			this.inAsync = oldInAsync;
			this.yieldPos = oldYieldPos;
			this.awaitPos = oldAwaitPos;
			this.inFunction = oldInFunc;
			return this.finishNode(node, "FunctionExpression");
		};

		// Parse arrow function expression with given parameters.

		pp$3.parseArrowExpression = function (node, params, isAsync) {
			var oldInGen = this.inGenerator,
			    oldInAsync = this.inAsync,
			    oldYieldPos = this.yieldPos,
			    oldAwaitPos = this.awaitPos,
			    oldInFunc = this.inFunction;

			this.enterFunctionScope();
			this.initFunction(node);
			if (this.options.ecmaVersion >= 8) {
				node.async = !!isAsync;
			}

			this.inGenerator = false;
			this.inAsync = node.async;
			this.yieldPos = 0;
			this.awaitPos = 0;
			this.inFunction = true;

			node.params = this.toAssignableList(params, true);
			this.parseFunctionBody(node, true);

			this.inGenerator = oldInGen;
			this.inAsync = oldInAsync;
			this.yieldPos = oldYieldPos;
			this.awaitPos = oldAwaitPos;
			this.inFunction = oldInFunc;
			return this.finishNode(node, "ArrowFunctionExpression");
		};

		// Parse function body and check parameters.

		pp$3.parseFunctionBody = function (node, isArrowFunction) {
			var isExpression = isArrowFunction && this.type !== types.braceL;
			var oldStrict = this.strict,
			    useStrict = false;

			if (isExpression) {
				node.body = this.parseMaybeAssign();
				node.expression = true;
				this.checkParams(node, false);
			} else {
				var nonSimple = this.options.ecmaVersion >= 7 && !this.isSimpleParamList(node.params);
				if (!oldStrict || nonSimple) {
					useStrict = this.strictDirective(this.end);
					// If this is a strict mode function, verify that argument names
					// are not repeated, and it does not try to bind the words `eval`
					// or `arguments`.
					if (useStrict && nonSimple) {
						this.raiseRecoverable(node.start, "Illegal 'use strict' directive in function with non-simple parameter list");
					}
				}
				// Start a new scope with regard to labels and the `inFunction`
				// flag (restore them to their old value afterwards).
				var oldLabels = this.labels;
				this.labels = [];
				if (useStrict) {
					this.strict = true;
				}

				// Add the params to varDeclaredNames to ensure that an error is thrown
				// if a let/const declaration in the function clashes with one of the params.
				this.checkParams(node, !oldStrict && !useStrict && !isArrowFunction && this.isSimpleParamList(node.params));
				node.body = this.parseBlock(false);
				node.expression = false;
				this.adaptDirectivePrologue(node.body.body);
				this.labels = oldLabels;
			}
			this.exitFunctionScope();

			if (this.strict && node.id) {
				// Ensure the function name isn't a forbidden identifier in strict mode, e.g. 'eval'
				this.checkLVal(node.id, "none");
			}
			this.strict = oldStrict;
		};

		pp$3.isSimpleParamList = function (params) {
			for (var i = 0, list = params; i < list.length; i += 1) {
				var param = list[i];

				if (param.type !== "Identifier") {
					return false;
				}
			}
			return true;
		};

		// Checks function params for various disallowed patterns such as using "eval"
		// or "arguments" and duplicate parameters.

		pp$3.checkParams = function (node, allowDuplicates) {
			var this$1 = this;

			var nameHash = {};
			for (var i = 0, list = node.params; i < list.length; i += 1) {
				var param = list[i];

				this$1.checkLVal(param, "var", allowDuplicates ? null : nameHash);
			}
		};

		// Parses a comma-separated list of expressions, and returns them as
		// an array. `close` is the token type that ends the list, and
		// `allowEmpty` can be turned on to allow subsequent commas with
		// nothing in between them to be parsed as `null` (which is needed
		// for array literals).

		pp$3.parseExprList = function (close, allowTrailingComma, allowEmpty, refDestructuringErrors) {
			var this$1 = this;

			var elts = [],
			    first = true;
			while (!this.eat(close)) {
				if (!first) {
					this$1.expect(types.comma);
					if (allowTrailingComma && this$1.afterTrailingComma(close)) {
						break;
					}
				} else {
					first = false;
				}

				var elt = void 0;
				if (allowEmpty && this$1.type === types.comma) {
					elt = null;
				} else if (this$1.type === types.ellipsis) {
					elt = this$1.parseSpread(refDestructuringErrors);
					if (refDestructuringErrors && this$1.type === types.comma && refDestructuringErrors.trailingComma < 0) {
						refDestructuringErrors.trailingComma = this$1.start;
					}
				} else {
					elt = this$1.parseMaybeAssign(false, refDestructuringErrors);
				}
				elts.push(elt);
			}
			return elts;
		};

		pp$3.checkUnreserved = function (ref) {
			var start = ref.start;
			var end = ref.end;
			var name = ref.name;

			if (this.inGenerator && name === "yield") {
				this.raiseRecoverable(start, "Can not use 'yield' as identifier inside a generator");
			}
			if (this.inAsync && name === "await") {
				this.raiseRecoverable(start, "Can not use 'await' as identifier inside an async function");
			}
			if (this.isKeyword(name)) {
				this.raise(start, "Unexpected keyword '" + name + "'");
			}
			if (this.options.ecmaVersion < 6 && this.input.slice(start, end).indexOf("\\") != -1) {
				return;
			}
			var re = this.strict ? this.reservedWordsStrict : this.reservedWords;
			if (re.test(name)) {
				this.raiseRecoverable(start, "The keyword '" + name + "' is reserved");
			}
		};

		// Parse the next token as an identifier. If `liberal` is true (used
		// when parsing properties), it will also convert keywords into
		// identifiers.

		pp$3.parseIdent = function (liberal, isBinding) {
			var node = this.startNode();
			if (liberal && this.options.allowReserved == "never") {
				liberal = false;
			}
			if (this.type === types.name) {
				node.name = this.value;
			} else if (this.type.keyword) {
				node.name = this.type.keyword;

				// To fix https://github.com/ternjs/acorn/issues/575
				// `class` and `function` keywords push new context into this.context.
				// But there is no chance to pop the context if the keyword is consumed as an identifier such as a property name.
				// If the previous token is a dot, this does not apply because the context-managing code already ignored the keyword
				if ((node.name === "class" || node.name === "function") && (this.lastTokEnd !== this.lastTokStart + 1 || this.input.charCodeAt(this.lastTokStart) !== 46)) {
					this.context.pop();
				}
			} else {
				this.unexpected();
			}
			this.next();
			this.finishNode(node, "Identifier");
			if (!liberal) {
				this.checkUnreserved(node);
			}
			return node;
		};

		// Parses yield expression inside generator.

		pp$3.parseYield = function () {
			if (!this.yieldPos) {
				this.yieldPos = this.start;
			}

			var node = this.startNode();
			this.next();
			if (this.type == types.semi || this.canInsertSemicolon() || this.type != types.star && !this.type.startsExpr) {
				node.delegate = false;
				node.argument = null;
			} else {
				node.delegate = this.eat(types.star);
				node.argument = this.parseMaybeAssign();
			}
			return this.finishNode(node, "YieldExpression");
		};

		pp$3.parseAwait = function () {
			if (!this.awaitPos) {
				this.awaitPos = this.start;
			}

			var node = this.startNode();
			this.next();
			node.argument = this.parseMaybeUnary(null, true);
			return this.finishNode(node, "AwaitExpression");
		};

		var pp$4 = Parser.prototype;

		// This function is used to raise exceptions on parse errors. It
		// takes an offset integer (into the current `input`) to indicate
		// the location of the error, attaches the position to the end
		// of the error message, and then raises a `SyntaxError` with that
		// message.

		pp$4.raise = function (pos, message) {
			var loc = getLineInfo(this.input, pos);
			message += " (" + loc.line + ":" + loc.column + ")";
			var err = new SyntaxError(message);
			err.pos = pos;err.loc = loc;err.raisedAt = this.pos;
			throw err;
		};

		pp$4.raiseRecoverable = pp$4.raise;

		pp$4.curPosition = function () {
			if (this.options.locations) {
				return new Position(this.curLine, this.pos - this.lineStart);
			}
		};

		var pp$5 = Parser.prototype;

		// Object.assign polyfill
		var assign$$1 = Object.assign || function (target) {
			var sources = [],
			    len = arguments.length - 1;
			while (len-- > 0) {
				sources[len] = arguments[len + 1];
			}for (var i = 0, list = sources; i < list.length; i += 1) {
				var source = list[i];

				for (var key in source) {
					if (has(source, key)) {
						target[key] = source[key];
					}
				}
			}
			return target;
		};

		// The functions in this module keep track of declared variables in the current scope in order to detect duplicate variable names.

		pp$5.enterFunctionScope = function () {
			// var: a hash of var-declared names in the current lexical scope
			// lexical: a hash of lexically-declared names in the current lexical scope
			// childVar: a hash of var-declared names in all child lexical scopes of the current lexical scope (within the current function scope)
			// parentLexical: a hash of lexically-declared names in all parent lexical scopes of the current lexical scope (within the current function scope)
			this.scopeStack.push({ var: {}, lexical: {}, childVar: {}, parentLexical: {} });
		};

		pp$5.exitFunctionScope = function () {
			this.scopeStack.pop();
		};

		pp$5.enterLexicalScope = function () {
			var parentScope = this.scopeStack[this.scopeStack.length - 1];
			var childScope = { var: {}, lexical: {}, childVar: {}, parentLexical: {} };

			this.scopeStack.push(childScope);
			assign$$1(childScope.parentLexical, parentScope.lexical, parentScope.parentLexical);
		};

		pp$5.exitLexicalScope = function () {
			var childScope = this.scopeStack.pop();
			var parentScope = this.scopeStack[this.scopeStack.length - 1];

			assign$$1(parentScope.childVar, childScope.var, childScope.childVar);
		};

		/**
   * A name can be declared with `var` if there are no variables with the same name declared with `let`/`const`
   * in the current lexical scope or any of the parent lexical scopes in this function.
   */
		pp$5.canDeclareVarName = function (name) {
			var currentScope = this.scopeStack[this.scopeStack.length - 1];

			return !has(currentScope.lexical, name) && !has(currentScope.parentLexical, name);
		};

		/**
   * A name can be declared with `let`/`const` if there are no variables with the same name declared with `let`/`const`
   * in the current scope, and there are no variables with the same name declared with `var` in the current scope or in
   * any child lexical scopes in this function.
   */
		pp$5.canDeclareLexicalName = function (name) {
			var currentScope = this.scopeStack[this.scopeStack.length - 1];

			return !has(currentScope.lexical, name) && !has(currentScope.var, name) && !has(currentScope.childVar, name);
		};

		pp$5.declareVarName = function (name) {
			this.scopeStack[this.scopeStack.length - 1].var[name] = true;
		};

		pp$5.declareLexicalName = function (name) {
			this.scopeStack[this.scopeStack.length - 1].lexical[name] = true;
		};

		var Node = function Node(parser, pos, loc) {
			this.type = "";
			this.start = pos;
			this.end = 0;
			if (parser.options.locations) {
				this.loc = new SourceLocation(parser, loc);
			}
			if (parser.options.directSourceFile) {
				this.sourceFile = parser.options.directSourceFile;
			}
			if (parser.options.ranges) {
				this.range = [pos, 0];
			}
		};

		// Start an AST node, attaching a start offset.

		var pp$6 = Parser.prototype;

		pp$6.startNode = function () {
			return new Node(this, this.start, this.startLoc);
		};

		pp$6.startNodeAt = function (pos, loc) {
			return new Node(this, pos, loc);
		};

		// Finish an AST node, adding `type` and `end` properties.

		function finishNodeAt(node, type, pos, loc) {
			node.type = type;
			node.end = pos;
			if (this.options.locations) {
				node.loc.end = loc;
			}
			if (this.options.ranges) {
				node.range[1] = pos;
			}
			return node;
		}

		pp$6.finishNode = function (node, type) {
			return finishNodeAt.call(this, node, type, this.lastTokEnd, this.lastTokEndLoc);
		};

		// Finish node at given position

		pp$6.finishNodeAt = function (node, type, pos, loc) {
			return finishNodeAt.call(this, node, type, pos, loc);
		};

		// The algorithm used to determine whether a regexp can appear at a
		// given point in the program is loosely based on sweet.js' approach.
		// See https://github.com/mozilla/sweet.js/wiki/design

		var TokContext = function TokContext(token, isExpr, preserveSpace, override, generator) {
			this.token = token;
			this.isExpr = !!isExpr;
			this.preserveSpace = !!preserveSpace;
			this.override = override;
			this.generator = !!generator;
		};

		var types$1 = {
			b_stat: new TokContext("{", false),
			b_expr: new TokContext("{", true),
			b_tmpl: new TokContext("${", false),
			p_stat: new TokContext("(", false),
			p_expr: new TokContext("(", true),
			q_tmpl: new TokContext("`", true, true, function (p) {
				return p.tryReadTemplateToken();
			}),
			f_stat: new TokContext("function", false),
			f_expr: new TokContext("function", true),
			f_expr_gen: new TokContext("function", true, false, null, true),
			f_gen: new TokContext("function", false, false, null, true)
		};

		var pp$7 = Parser.prototype;

		pp$7.initialContext = function () {
			return [types$1.b_stat];
		};

		pp$7.braceIsBlock = function (prevType) {
			var parent = this.curContext();
			if (parent === types$1.f_expr || parent === types$1.f_stat) {
				return true;
			}
			if (prevType === types.colon && (parent === types$1.b_stat || parent === types$1.b_expr)) {
				return !parent.isExpr;
			}

			// The check for `tt.name && exprAllowed` detects whether we are
			// after a `yield` or `of` construct. See the `updateContext` for
			// `tt.name`.
			if (prevType === types._return || prevType == types.name && this.exprAllowed) {
				return lineBreak.test(this.input.slice(this.lastTokEnd, this.start));
			}
			if (prevType === types._else || prevType === types.semi || prevType === types.eof || prevType === types.parenR || prevType == types.arrow) {
				return true;
			}
			if (prevType == types.braceL) {
				return parent === types$1.b_stat;
			}
			if (prevType == types._var || prevType == types.name) {
				return false;
			}
			return !this.exprAllowed;
		};

		pp$7.inGeneratorContext = function () {
			var this$1 = this;

			for (var i = this.context.length - 1; i >= 1; i--) {
				var context = this$1.context[i];
				if (context.token === "function") {
					return context.generator;
				}
			}
			return false;
		};

		pp$7.updateContext = function (prevType) {
			var update,
			    type = this.type;
			if (type.keyword && prevType == types.dot) {
				this.exprAllowed = false;
			} else if (update = type.updateContext) {
				update.call(this, prevType);
			} else {
				this.exprAllowed = type.beforeExpr;
			}
		};

		// Token-specific context update code

		types.parenR.updateContext = types.braceR.updateContext = function () {
			if (this.context.length == 1) {
				this.exprAllowed = true;
				return;
			}
			var out = this.context.pop();
			if (out === types$1.b_stat && this.curContext().token === "function") {
				out = this.context.pop();
			}
			this.exprAllowed = !out.isExpr;
		};

		types.braceL.updateContext = function (prevType) {
			this.context.push(this.braceIsBlock(prevType) ? types$1.b_stat : types$1.b_expr);
			this.exprAllowed = true;
		};

		types.dollarBraceL.updateContext = function () {
			this.context.push(types$1.b_tmpl);
			this.exprAllowed = true;
		};

		types.parenL.updateContext = function (prevType) {
			var statementParens = prevType === types._if || prevType === types._for || prevType === types._with || prevType === types._while;
			this.context.push(statementParens ? types$1.p_stat : types$1.p_expr);
			this.exprAllowed = true;
		};

		types.incDec.updateContext = function () {
			// tokExprAllowed stays unchanged
		};

		types._function.updateContext = types._class.updateContext = function (prevType) {
			if (prevType.beforeExpr && prevType !== types.semi && prevType !== types._else && !((prevType === types.colon || prevType === types.braceL) && this.curContext() === types$1.b_stat)) {
				this.context.push(types$1.f_expr);
			} else {
				this.context.push(types$1.f_stat);
			}
			this.exprAllowed = false;
		};

		types.backQuote.updateContext = function () {
			if (this.curContext() === types$1.q_tmpl) {
				this.context.pop();
			} else {
				this.context.push(types$1.q_tmpl);
			}
			this.exprAllowed = false;
		};

		types.star.updateContext = function (prevType) {
			if (prevType == types._function) {
				var index = this.context.length - 1;
				if (this.context[index] === types$1.f_expr) {
					this.context[index] = types$1.f_expr_gen;
				} else {
					this.context[index] = types$1.f_gen;
				}
			}
			this.exprAllowed = true;
		};

		types.name.updateContext = function (prevType) {
			var allowed = false;
			if (this.options.ecmaVersion >= 6) {
				if (this.value == "of" && !this.exprAllowed || this.value == "yield" && this.inGeneratorContext()) {
					allowed = true;
				}
			}
			this.exprAllowed = allowed;
		};

		// Object type used to represent tokens. Note that normally, tokens
		// simply exist as properties on the parser object. This is only
		// used for the onToken callback and the external tokenizer.

		var Token = function Token(p) {
			this.type = p.type;
			this.value = p.value;
			this.start = p.start;
			this.end = p.end;
			if (p.options.locations) {
				this.loc = new SourceLocation(p, p.startLoc, p.endLoc);
			}
			if (p.options.ranges) {
				this.range = [p.start, p.end];
			}
		};

		// ## Tokenizer

		var pp$8 = Parser.prototype;

		// Are we running under Rhino?
		var isRhino = (typeof Packages === 'undefined' ? 'undefined' : _typeof(Packages)) == "object" && Object.prototype.toString.call(Packages) == "[object JavaPackage]";

		// Move to the next token

		pp$8.next = function () {
			if (this.options.onToken) {
				this.options.onToken(new Token(this));
			}

			this.lastTokEnd = this.end;
			this.lastTokStart = this.start;
			this.lastTokEndLoc = this.endLoc;
			this.lastTokStartLoc = this.startLoc;
			this.nextToken();
		};

		pp$8.getToken = function () {
			this.next();
			return new Token(this);
		};

		// If we're in an ES6 environment, make parsers iterable
		if (typeof Symbol !== "undefined") {
			pp$8[Symbol.iterator] = function () {
				var this$1 = this;

				return {
					next: function next() {
						var token = this$1.getToken();
						return {
							done: token.type === types.eof,
							value: token
						};
					}
				};
			};
		}

		// Toggle strict mode. Re-reads the next number or string to please
		// pedantic tests (`"use strict"; 010;` should fail).

		pp$8.curContext = function () {
			return this.context[this.context.length - 1];
		};

		// Read a single token, updating the parser object's token-related
		// properties.

		pp$8.nextToken = function () {
			var curContext = this.curContext();
			if (!curContext || !curContext.preserveSpace) {
				this.skipSpace();
			}

			this.start = this.pos;
			if (this.options.locations) {
				this.startLoc = this.curPosition();
			}
			if (this.pos >= this.input.length) {
				return this.finishToken(types.eof);
			}

			if (curContext.override) {
				return curContext.override(this);
			} else {
				this.readToken(this.fullCharCodeAtPos());
			}
		};

		pp$8.readToken = function (code) {
			// Identifier or keyword. '\uXXXX' sequences are allowed in
			// identifiers, so '\' also dispatches to that.
			if (isIdentifierStart(code, this.options.ecmaVersion >= 6) || code === 92 /* '\' */) {
					return this.readWord();
				}

			return this.getTokenFromCode(code);
		};

		pp$8.fullCharCodeAtPos = function () {
			var code = this.input.charCodeAt(this.pos);
			if (code <= 0xd7ff || code >= 0xe000) {
				return code;
			}
			var next = this.input.charCodeAt(this.pos + 1);
			return (code << 10) + next - 0x35fdc00;
		};

		pp$8.skipBlockComment = function () {
			var this$1 = this;

			var startLoc = this.options.onComment && this.curPosition();
			var start = this.pos,
			    end = this.input.indexOf("*/", this.pos += 2);
			if (end === -1) {
				this.raise(this.pos - 2, "Unterminated comment");
			}
			this.pos = end + 2;
			if (this.options.locations) {
				lineBreakG.lastIndex = start;
				var match;
				while ((match = lineBreakG.exec(this.input)) && match.index < this.pos) {
					++this$1.curLine;
					this$1.lineStart = match.index + match[0].length;
				}
			}
			if (this.options.onComment) {
				this.options.onComment(true, this.input.slice(start + 2, end), start, this.pos, startLoc, this.curPosition());
			}
		};

		pp$8.skipLineComment = function (startSkip) {
			var this$1 = this;

			var start = this.pos;
			var startLoc = this.options.onComment && this.curPosition();
			var ch = this.input.charCodeAt(this.pos += startSkip);
			while (this.pos < this.input.length && !isNewLine(ch)) {
				ch = this$1.input.charCodeAt(++this$1.pos);
			}
			if (this.options.onComment) {
				this.options.onComment(false, this.input.slice(start + startSkip, this.pos), start, this.pos, startLoc, this.curPosition());
			}
		};

		// Called at the start of the parse and after every token. Skips
		// whitespace and comments, and.

		pp$8.skipSpace = function () {
			var this$1 = this;

			loop: while (this.pos < this.input.length) {
				var ch = this$1.input.charCodeAt(this$1.pos);
				switch (ch) {
					case 32:case 160:
						// ' '
						++this$1.pos;
						break;
					case 13:
						if (this$1.input.charCodeAt(this$1.pos + 1) === 10) {
							++this$1.pos;
						}
					case 10:case 8232:case 8233:
						++this$1.pos;
						if (this$1.options.locations) {
							++this$1.curLine;
							this$1.lineStart = this$1.pos;
						}
						break;
					case 47:
						// '/'
						switch (this$1.input.charCodeAt(this$1.pos + 1)) {
							case 42:
								// '*'
								this$1.skipBlockComment();
								break;
							case 47:
								this$1.skipLineComment(2);
								break;
							default:
								break loop;
						}
						break;
					default:
						if (ch > 8 && ch < 14 || ch >= 5760 && nonASCIIwhitespace.test(String.fromCharCode(ch))) {
							++this$1.pos;
						} else {
							break loop;
						}
				}
			}
		};

		// Called at the end of every token. Sets `end`, `val`, and
		// maintains `context` and `exprAllowed`, and skips the space after
		// the token, so that the next one's `start` will point at the
		// right position.

		pp$8.finishToken = function (type, val) {
			this.end = this.pos;
			if (this.options.locations) {
				this.endLoc = this.curPosition();
			}
			var prevType = this.type;
			this.type = type;
			this.value = val;

			this.updateContext(prevType);
		};

		// ### Token reading

		// This is the function that is called to fetch the next token. It
		// is somewhat obscure, because it works in character codes rather
		// than characters, and because operator parsing has been inlined
		// into it.
		//
		// All in the name of speed.
		//
		pp$8.readToken_dot = function () {
			var next = this.input.charCodeAt(this.pos + 1);
			if (next >= 48 && next <= 57) {
				return this.readNumber(true);
			}
			var next2 = this.input.charCodeAt(this.pos + 2);
			if (this.options.ecmaVersion >= 6 && next === 46 && next2 === 46) {
				// 46 = dot '.'
				this.pos += 3;
				return this.finishToken(types.ellipsis);
			} else {
				++this.pos;
				return this.finishToken(types.dot);
			}
		};

		pp$8.readToken_slash = function () {
			// '/'
			var next = this.input.charCodeAt(this.pos + 1);
			if (this.exprAllowed) {
				++this.pos;return this.readRegexp();
			}
			if (next === 61) {
				return this.finishOp(types.assign, 2);
			}
			return this.finishOp(types.slash, 1);
		};

		pp$8.readToken_mult_modulo_exp = function (code) {
			// '%*'
			var next = this.input.charCodeAt(this.pos + 1);
			var size = 1;
			var tokentype = code === 42 ? types.star : types.modulo;

			// exponentiation operator ** and **=
			if (this.options.ecmaVersion >= 7 && code == 42 && next === 42) {
				++size;
				tokentype = types.starstar;
				next = this.input.charCodeAt(this.pos + 2);
			}

			if (next === 61) {
				return this.finishOp(types.assign, size + 1);
			}
			return this.finishOp(tokentype, size);
		};

		pp$8.readToken_pipe_amp = function (code) {
			// '|&'
			var next = this.input.charCodeAt(this.pos + 1);
			if (next === code) {
				return this.finishOp(code === 124 ? types.logicalOR : types.logicalAND, 2);
			}
			if (next === 61) {
				return this.finishOp(types.assign, 2);
			}
			return this.finishOp(code === 124 ? types.bitwiseOR : types.bitwiseAND, 1);
		};

		pp$8.readToken_caret = function () {
			// '^'
			var next = this.input.charCodeAt(this.pos + 1);
			if (next === 61) {
				return this.finishOp(types.assign, 2);
			}
			return this.finishOp(types.bitwiseXOR, 1);
		};

		pp$8.readToken_plus_min = function (code) {
			// '+-'
			var next = this.input.charCodeAt(this.pos + 1);
			if (next === code) {
				if (next == 45 && !this.inModule && this.input.charCodeAt(this.pos + 2) == 62 && (this.lastTokEnd === 0 || lineBreak.test(this.input.slice(this.lastTokEnd, this.pos)))) {
					// A `-->` line comment
					this.skipLineComment(3);
					this.skipSpace();
					return this.nextToken();
				}
				return this.finishOp(types.incDec, 2);
			}
			if (next === 61) {
				return this.finishOp(types.assign, 2);
			}
			return this.finishOp(types.plusMin, 1);
		};

		pp$8.readToken_lt_gt = function (code) {
			// '<>'
			var next = this.input.charCodeAt(this.pos + 1);
			var size = 1;
			if (next === code) {
				size = code === 62 && this.input.charCodeAt(this.pos + 2) === 62 ? 3 : 2;
				if (this.input.charCodeAt(this.pos + size) === 61) {
					return this.finishOp(types.assign, size + 1);
				}
				return this.finishOp(types.bitShift, size);
			}
			if (next == 33 && code == 60 && !this.inModule && this.input.charCodeAt(this.pos + 2) == 45 && this.input.charCodeAt(this.pos + 3) == 45) {
				// `<!--`, an XML-style comment that should be interpreted as a line comment
				this.skipLineComment(4);
				this.skipSpace();
				return this.nextToken();
			}
			if (next === 61) {
				size = 2;
			}
			return this.finishOp(types.relational, size);
		};

		pp$8.readToken_eq_excl = function (code) {
			// '=!'
			var next = this.input.charCodeAt(this.pos + 1);
			if (next === 61) {
				return this.finishOp(types.equality, this.input.charCodeAt(this.pos + 2) === 61 ? 3 : 2);
			}
			if (code === 61 && next === 62 && this.options.ecmaVersion >= 6) {
				// '=>'
				this.pos += 2;
				return this.finishToken(types.arrow);
			}
			return this.finishOp(code === 61 ? types.eq : types.prefix, 1);
		};

		pp$8.getTokenFromCode = function (code) {
			switch (code) {
				// The interpretation of a dot depends on whether it is followed
				// by a digit or another two dots.
				case 46:
					// '.'
					return this.readToken_dot();

				// Punctuation tokens.
				case 40:
					++this.pos;return this.finishToken(types.parenL);
				case 41:
					++this.pos;return this.finishToken(types.parenR);
				case 59:
					++this.pos;return this.finishToken(types.semi);
				case 44:
					++this.pos;return this.finishToken(types.comma);
				case 91:
					++this.pos;return this.finishToken(types.bracketL);
				case 93:
					++this.pos;return this.finishToken(types.bracketR);
				case 123:
					++this.pos;return this.finishToken(types.braceL);
				case 125:
					++this.pos;return this.finishToken(types.braceR);
				case 58:
					++this.pos;return this.finishToken(types.colon);
				case 63:
					++this.pos;return this.finishToken(types.question);

				case 96:
					// '`'
					if (this.options.ecmaVersion < 6) {
						break;
					}
					++this.pos;
					return this.finishToken(types.backQuote);

				case 48:
					// '0'
					var next = this.input.charCodeAt(this.pos + 1);
					if (next === 120 || next === 88) {
						return this.readRadixNumber(16);
					} // '0x', '0X' - hex number
					if (this.options.ecmaVersion >= 6) {
						if (next === 111 || next === 79) {
							return this.readRadixNumber(8);
						} // '0o', '0O' - octal number
						if (next === 98 || next === 66) {
							return this.readRadixNumber(2);
						} // '0b', '0B' - binary number
					}
				// Anything else beginning with a digit is an integer, octal
				// number, or float.
				case 49:case 50:case 51:case 52:case 53:case 54:case 55:case 56:case 57:
					// 1-9
					return this.readNumber(false);

				// Quotes produce strings.
				case 34:case 39:
					// '"', "'"
					return this.readString(code);

				// Operators are parsed inline in tiny state machines. '=' (61) is
				// often referred to. `finishOp` simply skips the amount of
				// characters it is given as second argument, and returns a token
				// of the type given by its first argument.

				case 47:
					// '/'
					return this.readToken_slash();

				case 37:case 42:
					// '%*'
					return this.readToken_mult_modulo_exp(code);

				case 124:case 38:
					// '|&'
					return this.readToken_pipe_amp(code);

				case 94:
					// '^'
					return this.readToken_caret();

				case 43:case 45:
					// '+-'
					return this.readToken_plus_min(code);

				case 60:case 62:
					// '<>'
					return this.readToken_lt_gt(code);

				case 61:case 33:
					// '=!'
					return this.readToken_eq_excl(code);

				case 126:
					// '~'
					return this.finishOp(types.prefix, 1);
			}

			this.raise(this.pos, "Unexpected character '" + codePointToString(code) + "'");
		};

		pp$8.finishOp = function (type, size) {
			var str = this.input.slice(this.pos, this.pos + size);
			this.pos += size;
			return this.finishToken(type, str);
		};

		// Parse a regular expression. Some context-awareness is necessary,
		// since a '/' inside a '[]' set does not end the expression.

		function tryCreateRegexp(src, flags, throwErrorAt, parser) {
			try {
				return new RegExp(src, flags);
			} catch (e) {
				if (throwErrorAt !== undefined) {
					if (e instanceof SyntaxError) {
						parser.raise(throwErrorAt, "Error parsing regular expression: " + e.message);
					}
					throw e;
				}
			}
		}

		var regexpUnicodeSupport = !!tryCreateRegexp('\uFFFF', "u");

		pp$8.readRegexp = function () {
			var this$1 = this;

			var escaped,
			    inClass,
			    start = this.pos;
			for (;;) {
				if (this$1.pos >= this$1.input.length) {
					this$1.raise(start, "Unterminated regular expression");
				}
				var ch = this$1.input.charAt(this$1.pos);
				if (lineBreak.test(ch)) {
					this$1.raise(start, "Unterminated regular expression");
				}
				if (!escaped) {
					if (ch === "[") {
						inClass = true;
					} else if (ch === "]" && inClass) {
						inClass = false;
					} else if (ch === "/" && !inClass) {
						break;
					}
					escaped = ch === "\\";
				} else {
					escaped = false;
				}
				++this$1.pos;
			}
			var content = this.input.slice(start, this.pos);
			++this.pos;
			// Need to use `readWord1` because '\uXXXX' sequences are allowed
			// here (don't ask).
			var mods = this.readWord1();
			var tmp = content,
			    tmpFlags = "";
			if (mods) {
				var validFlags = /^[gim]*$/;
				if (this.options.ecmaVersion >= 6) {
					validFlags = /^[gimuy]*$/;
				}
				if (!validFlags.test(mods)) {
					this.raise(start, "Invalid regular expression flag");
				}
				if (mods.indexOf("u") >= 0) {
					if (regexpUnicodeSupport) {
						tmpFlags = "u";
					} else {
						// Replace each astral symbol and every Unicode escape sequence that
						// possibly represents an astral symbol or a paired surrogate with a
						// single ASCII symbol to avoid throwing on regular expressions that
						// are only valid in combination with the `/u` flag.
						// Note: replacing with the ASCII symbol `x` might cause false
						// negatives in unlikely scenarios. For example, `[\u{61}-b]` is a
						// perfectly valid pattern that is equivalent to `[a-b]`, but it would
						// be replaced by `[x-b]` which throws an error.
						tmp = tmp.replace(/\\u\{([0-9a-fA-F]+)\}/g, function (_match, code, offset) {
							code = Number("0x" + code);
							if (code > 0x10FFFF) {
								this$1.raise(start + offset + 3, "Code point out of bounds");
							}
							return "x";
						});
						tmp = tmp.replace(/\\u([a-fA-F0-9]{4})|[\uD800-\uDBFF][\uDC00-\uDFFF]/g, "x");
						tmpFlags = tmpFlags.replace("u", "");
					}
				}
			}
			// Detect invalid regular expressions.
			var value = null;
			// Rhino's regular expression parser is flaky and throws uncatchable exceptions,
			// so don't do detection if we are running under Rhino
			if (!isRhino) {
				tryCreateRegexp(tmp, tmpFlags, start, this);
				// Get a regular expression object for this pattern-flag pair, or `null` in
				// case the current environment doesn't support the flags it uses.
				value = tryCreateRegexp(content, mods);
			}
			return this.finishToken(types.regexp, { pattern: content, flags: mods, value: value });
		};

		// Read an integer in the given radix. Return null if zero digits
		// were read, the integer value otherwise. When `len` is given, this
		// will return `null` unless the integer has exactly `len` digits.

		pp$8.readInt = function (radix, len) {
			var this$1 = this;

			var start = this.pos,
			    total = 0;
			for (var i = 0, e = len == null ? Infinity : len; i < e; ++i) {
				var code = this$1.input.charCodeAt(this$1.pos),
				    val = void 0;
				if (code >= 97) {
					val = code - 97 + 10;
				} // a
				else if (code >= 65) {
						val = code - 65 + 10;
					} // A
					else if (code >= 48 && code <= 57) {
							val = code - 48;
						} // 0-9
						else {
								val = Infinity;
							}
				if (val >= radix) {
					break;
				}
				++this$1.pos;
				total = total * radix + val;
			}
			if (this.pos === start || len != null && this.pos - start !== len) {
				return null;
			}

			return total;
		};

		pp$8.readRadixNumber = function (radix) {
			this.pos += 2; // 0x
			var val = this.readInt(radix);
			if (val == null) {
				this.raise(this.start + 2, "Expected number in radix " + radix);
			}
			if (isIdentifierStart(this.fullCharCodeAtPos())) {
				this.raise(this.pos, "Identifier directly after number");
			}
			return this.finishToken(types.num, val);
		};

		// Read an integer, octal integer, or floating-point number.

		pp$8.readNumber = function (startsWithDot) {
			var start = this.pos,
			    isFloat = false,
			    octal = this.input.charCodeAt(this.pos) === 48;
			if (!startsWithDot && this.readInt(10) === null) {
				this.raise(start, "Invalid number");
			}
			if (octal && this.pos == start + 1) {
				octal = false;
			}
			var next = this.input.charCodeAt(this.pos);
			if (next === 46 && !octal) {
				// '.'
				++this.pos;
				this.readInt(10);
				isFloat = true;
				next = this.input.charCodeAt(this.pos);
			}
			if ((next === 69 || next === 101) && !octal) {
				// 'eE'
				next = this.input.charCodeAt(++this.pos);
				if (next === 43 || next === 45) {
					++this.pos;
				} // '+-'
				if (this.readInt(10) === null) {
					this.raise(start, "Invalid number");
				}
				isFloat = true;
			}
			if (isIdentifierStart(this.fullCharCodeAtPos())) {
				this.raise(this.pos, "Identifier directly after number");
			}

			var str = this.input.slice(start, this.pos),
			    val;
			if (isFloat) {
				val = parseFloat(str);
			} else if (!octal || str.length === 1) {
				val = parseInt(str, 10);
			} else if (this.strict) {
				this.raise(start, "Invalid number");
			} else if (/[89]/.test(str)) {
				val = parseInt(str, 10);
			} else {
				val = parseInt(str, 8);
			}
			return this.finishToken(types.num, val);
		};

		// Read a string value, interpreting backslash-escapes.

		pp$8.readCodePoint = function () {
			var ch = this.input.charCodeAt(this.pos),
			    code;

			if (ch === 123) {
				// '{'
				if (this.options.ecmaVersion < 6) {
					this.unexpected();
				}
				var codePos = ++this.pos;
				code = this.readHexChar(this.input.indexOf("}", this.pos) - this.pos);
				++this.pos;
				if (code > 0x10FFFF) {
					this.invalidStringToken(codePos, "Code point out of bounds");
				}
			} else {
				code = this.readHexChar(4);
			}
			return code;
		};

		function codePointToString(code) {
			// UTF-16 Decoding
			if (code <= 0xFFFF) {
				return String.fromCharCode(code);
			}
			code -= 0x10000;
			return String.fromCharCode((code >> 10) + 0xD800, (code & 1023) + 0xDC00);
		}

		pp$8.readString = function (quote) {
			var this$1 = this;

			var out = "",
			    chunkStart = ++this.pos;
			for (;;) {
				if (this$1.pos >= this$1.input.length) {
					this$1.raise(this$1.start, "Unterminated string constant");
				}
				var ch = this$1.input.charCodeAt(this$1.pos);
				if (ch === quote) {
					break;
				}
				if (ch === 92) {
					// '\'
					out += this$1.input.slice(chunkStart, this$1.pos);
					out += this$1.readEscapedChar(false);
					chunkStart = this$1.pos;
				} else {
					if (isNewLine(ch)) {
						this$1.raise(this$1.start, "Unterminated string constant");
					}
					++this$1.pos;
				}
			}
			out += this.input.slice(chunkStart, this.pos++);
			return this.finishToken(types.string, out);
		};

		// Reads template string tokens.

		var INVALID_TEMPLATE_ESCAPE_ERROR = {};

		pp$8.tryReadTemplateToken = function () {
			this.inTemplateElement = true;
			try {
				this.readTmplToken();
			} catch (err) {
				if (err === INVALID_TEMPLATE_ESCAPE_ERROR) {
					this.readInvalidTemplateToken();
				} else {
					throw err;
				}
			}

			this.inTemplateElement = false;
		};

		pp$8.invalidStringToken = function (position, message) {
			if (this.inTemplateElement && this.options.ecmaVersion >= 9) {
				throw INVALID_TEMPLATE_ESCAPE_ERROR;
			} else {
				this.raise(position, message);
			}
		};

		pp$8.readTmplToken = function () {
			var this$1 = this;

			var out = "",
			    chunkStart = this.pos;
			for (;;) {
				if (this$1.pos >= this$1.input.length) {
					this$1.raise(this$1.start, "Unterminated template");
				}
				var ch = this$1.input.charCodeAt(this$1.pos);
				if (ch === 96 || ch === 36 && this$1.input.charCodeAt(this$1.pos + 1) === 123) {
					// '`', '${'
					if (this$1.pos === this$1.start && (this$1.type === types.template || this$1.type === types.invalidTemplate)) {
						if (ch === 36) {
							this$1.pos += 2;
							return this$1.finishToken(types.dollarBraceL);
						} else {
							++this$1.pos;
							return this$1.finishToken(types.backQuote);
						}
					}
					out += this$1.input.slice(chunkStart, this$1.pos);
					return this$1.finishToken(types.template, out);
				}
				if (ch === 92) {
					// '\'
					out += this$1.input.slice(chunkStart, this$1.pos);
					out += this$1.readEscapedChar(true);
					chunkStart = this$1.pos;
				} else if (isNewLine(ch)) {
					out += this$1.input.slice(chunkStart, this$1.pos);
					++this$1.pos;
					switch (ch) {
						case 13:
							if (this$1.input.charCodeAt(this$1.pos) === 10) {
								++this$1.pos;
							}
						case 10:
							out += "\n";
							break;
						default:
							out += String.fromCharCode(ch);
							break;
					}
					if (this$1.options.locations) {
						++this$1.curLine;
						this$1.lineStart = this$1.pos;
					}
					chunkStart = this$1.pos;
				} else {
					++this$1.pos;
				}
			}
		};

		// Reads a template token to search for the end, without validating any escape sequences
		pp$8.readInvalidTemplateToken = function () {
			var this$1 = this;

			for (; this.pos < this.input.length; this.pos++) {
				switch (this$1.input[this$1.pos]) {
					case "\\":
						++this$1.pos;
						break;

					case "$":
						if (this$1.input[this$1.pos + 1] !== "{") {
							break;
						}
					// falls through

					case "`":
						return this$1.finishToken(types.invalidTemplate, this$1.input.slice(this$1.start, this$1.pos));

					// no default
				}
			}
			this.raise(this.start, "Unterminated template");
		};

		// Used to read escaped characters

		pp$8.readEscapedChar = function (inTemplate) {
			var ch = this.input.charCodeAt(++this.pos);
			++this.pos;
			switch (ch) {
				case 110:
					return "\n"; // 'n' -> '\n'
				case 114:
					return "\r"; // 'r' -> '\r'
				case 120:
					return String.fromCharCode(this.readHexChar(2)); // 'x'
				case 117:
					return codePointToString(this.readCodePoint()); // 'u'
				case 116:
					return "\t"; // 't' -> '\t'
				case 98:
					return "\b"; // 'b' -> '\b'
				case 118:
					return '\x0B'; // 'v' -> '\u000b'
				case 102:
					return "\f"; // 'f' -> '\f'
				case 13:
					if (this.input.charCodeAt(this.pos) === 10) {
						++this.pos;
					} // '\r\n'
				case 10:
					// ' \n'
					if (this.options.locations) {
						this.lineStart = this.pos;++this.curLine;
					}
					return "";
				default:
					if (ch >= 48 && ch <= 55) {
						var octalStr = this.input.substr(this.pos - 1, 3).match(/^[0-7]+/)[0];
						var octal = parseInt(octalStr, 8);
						if (octal > 255) {
							octalStr = octalStr.slice(0, -1);
							octal = parseInt(octalStr, 8);
						}
						if (octalStr !== "0" && (this.strict || inTemplate)) {
							this.invalidStringToken(this.pos - 2, "Octal literal in strict mode");
						}
						this.pos += octalStr.length - 1;
						return String.fromCharCode(octal);
					}
					return String.fromCharCode(ch);
			}
		};

		// Used to read character escape sequences ('\x', '\u', '\U').

		pp$8.readHexChar = function (len) {
			var codePos = this.pos;
			var n = this.readInt(16, len);
			if (n === null) {
				this.invalidStringToken(codePos, "Bad character escape sequence");
			}
			return n;
		};

		// Read an identifier, and return it as a string. Sets `this.containsEsc`
		// to whether the word contained a '\u' escape.
		//
		// Incrementally adds only escaped chars, adding other chunks as-is
		// as a micro-optimization.

		pp$8.readWord1 = function () {
			var this$1 = this;

			this.containsEsc = false;
			var word = "",
			    first = true,
			    chunkStart = this.pos;
			var astral = this.options.ecmaVersion >= 6;
			while (this.pos < this.input.length) {
				var ch = this$1.fullCharCodeAtPos();
				if (isIdentifierChar(ch, astral)) {
					this$1.pos += ch <= 0xffff ? 1 : 2;
				} else if (ch === 92) {
					// "\"
					this$1.containsEsc = true;
					word += this$1.input.slice(chunkStart, this$1.pos);
					var escStart = this$1.pos;
					if (this$1.input.charCodeAt(++this$1.pos) != 117) // "u"
						{
							this$1.invalidStringToken(this$1.pos, 'Expecting Unicode escape sequence \\uXXXX');
						}
					++this$1.pos;
					var esc = this$1.readCodePoint();
					if (!(first ? isIdentifierStart : isIdentifierChar)(esc, astral)) {
						this$1.invalidStringToken(escStart, "Invalid Unicode escape");
					}
					word += codePointToString(esc);
					chunkStart = this$1.pos;
				} else {
					break;
				}
				first = false;
			}
			return word + this.input.slice(chunkStart, this.pos);
		};

		// Read an identifier or keyword token. Will check for reserved
		// words when necessary.

		pp$8.readWord = function () {
			var word = this.readWord1();
			var type = types.name;
			if (this.keywords.test(word)) {
				if (this.containsEsc) {
					this.raiseRecoverable(this.start, "Escape sequence in keyword " + word);
				}
				type = keywords$1[word];
			}
			return this.finishToken(type, word);
		};

		// Acorn is a tiny, fast JavaScript parser written in JavaScript.
		//
		// Acorn was written by Marijn Haverbeke, Ingvar Stepanyan, and
		// various contributors and released under an MIT license.
		//
		// Git repositories for Acorn are available at
		//
		//     http://marijnhaverbeke.nl/git/acorn
		//     https://github.com/ternjs/acorn.git
		//
		// Please use the [github bug tracker][ghbt] to report issues.
		//
		// [ghbt]: https://github.com/ternjs/acorn/issues
		//
		// This file defines the main parser interface. The library also comes
		// with a [error-tolerant parser][dammit] and an
		// [abstract syntax tree walker][walk], defined in other files.
		//
		// [dammit]: acorn_loose.js
		// [walk]: util/walk.js

		var version = "5.2.1";

		// The main exported interface (under `self.acorn` when in the
		// browser) is a `parse` function that takes a code string and
		// returns an abstract syntax tree as specified by [Mozilla parser
		// API][api].
		//
		// [api]: https://developer.mozilla.org/en-US/docs/SpiderMonkey/Parser_API

		function parse$1(input, options) {
			return new Parser(options, input).parse();
		}

		// This function tries to parse a single expression at a given
		// offset in a string. Useful for parsing mixed-language formats
		// that embed JavaScript expressions.

		function parseExpressionAt(input, pos, options) {
			var p = new Parser(options, input, pos);
			p.nextToken();
			return p.parseExpression();
		}

		// Acorn is organized as a tokenizer and a recursive-descent parser.
		// The `tokenizer` export provides an interface to the tokenizer.

		function tokenizer(input, options) {
			return new Parser(options, input);
		}

		// This is a terrible kludge to support the existing, pre-ES6
		// interface where the loose parser module retroactively adds exports
		// to this module.
		var parse_dammit;
		var LooseParser;
		var pluginsLoose; // eslint-disable-line camelcase
		function addLooseExports(parse, Parser$$1, plugins$$1) {
			parse_dammit = parse; // eslint-disable-line camelcase
			LooseParser = Parser$$1;
			pluginsLoose = plugins$$1;
		}

		var acorn = Object.freeze({
			version: version,
			parse: parse$1,
			parseExpressionAt: parseExpressionAt,
			tokenizer: tokenizer,
			get parse_dammit() {
				return parse_dammit;
			},
			get LooseParser() {
				return LooseParser;
			},
			get pluginsLoose() {
				return pluginsLoose;
			},
			addLooseExports: addLooseExports,
			Parser: Parser,
			plugins: plugins,
			defaultOptions: defaultOptions,
			Position: Position,
			SourceLocation: SourceLocation,
			getLineInfo: getLineInfo,
			Node: Node,
			TokenType: TokenType,
			tokTypes: types,
			keywordTypes: keywords$1,
			TokContext: TokContext,
			tokContexts: types$1,
			isIdentifierChar: isIdentifierChar,
			isIdentifierStart: isIdentifierStart,
			Token: Token,
			isNewLine: isNewLine,
			lineBreak: lineBreak,
			lineBreakG: lineBreakG,
			nonASCIIwhitespace: nonASCIIwhitespace
		});

		var xhtml = {
			quot: '"',
			amp: '&',
			apos: '\'',
			lt: '<',
			gt: '>',
			nbsp: '\xA0',
			iexcl: '\xA1',
			cent: '\xA2',
			pound: '\xA3',
			curren: '\xA4',
			yen: '\xA5',
			brvbar: '\xA6',
			sect: '\xA7',
			uml: '\xA8',
			copy: '\xA9',
			ordf: '\xAA',
			laquo: '\xAB',
			not: '\xAC',
			shy: '\xAD',
			reg: '\xAE',
			macr: '\xAF',
			deg: '\xB0',
			plusmn: '\xB1',
			sup2: '\xB2',
			sup3: '\xB3',
			acute: '\xB4',
			micro: '\xB5',
			para: '\xB6',
			middot: '\xB7',
			cedil: '\xB8',
			sup1: '\xB9',
			ordm: '\xBA',
			raquo: '\xBB',
			frac14: '\xBC',
			frac12: '\xBD',
			frac34: '\xBE',
			iquest: '\xBF',
			Agrave: '\xC0',
			Aacute: '\xC1',
			Acirc: '\xC2',
			Atilde: '\xC3',
			Auml: '\xC4',
			Aring: '\xC5',
			AElig: '\xC6',
			Ccedil: '\xC7',
			Egrave: '\xC8',
			Eacute: '\xC9',
			Ecirc: '\xCA',
			Euml: '\xCB',
			Igrave: '\xCC',
			Iacute: '\xCD',
			Icirc: '\xCE',
			Iuml: '\xCF',
			ETH: '\xD0',
			Ntilde: '\xD1',
			Ograve: '\xD2',
			Oacute: '\xD3',
			Ocirc: '\xD4',
			Otilde: '\xD5',
			Ouml: '\xD6',
			times: '\xD7',
			Oslash: '\xD8',
			Ugrave: '\xD9',
			Uacute: '\xDA',
			Ucirc: '\xDB',
			Uuml: '\xDC',
			Yacute: '\xDD',
			THORN: '\xDE',
			szlig: '\xDF',
			agrave: '\xE0',
			aacute: '\xE1',
			acirc: '\xE2',
			atilde: '\xE3',
			auml: '\xE4',
			aring: '\xE5',
			aelig: '\xE6',
			ccedil: '\xE7',
			egrave: '\xE8',
			eacute: '\xE9',
			ecirc: '\xEA',
			euml: '\xEB',
			igrave: '\xEC',
			iacute: '\xED',
			icirc: '\xEE',
			iuml: '\xEF',
			eth: '\xF0',
			ntilde: '\xF1',
			ograve: '\xF2',
			oacute: '\xF3',
			ocirc: '\xF4',
			otilde: '\xF5',
			ouml: '\xF6',
			divide: '\xF7',
			oslash: '\xF8',
			ugrave: '\xF9',
			uacute: '\xFA',
			ucirc: '\xFB',
			uuml: '\xFC',
			yacute: '\xFD',
			thorn: '\xFE',
			yuml: '\xFF',
			OElig: '\u0152',
			oelig: '\u0153',
			Scaron: '\u0160',
			scaron: '\u0161',
			Yuml: '\u0178',
			fnof: '\u0192',
			circ: '\u02C6',
			tilde: '\u02DC',
			Alpha: '\u0391',
			Beta: '\u0392',
			Gamma: '\u0393',
			Delta: '\u0394',
			Epsilon: '\u0395',
			Zeta: '\u0396',
			Eta: '\u0397',
			Theta: '\u0398',
			Iota: '\u0399',
			Kappa: '\u039A',
			Lambda: '\u039B',
			Mu: '\u039C',
			Nu: '\u039D',
			Xi: '\u039E',
			Omicron: '\u039F',
			Pi: '\u03A0',
			Rho: '\u03A1',
			Sigma: '\u03A3',
			Tau: '\u03A4',
			Upsilon: '\u03A5',
			Phi: '\u03A6',
			Chi: '\u03A7',
			Psi: '\u03A8',
			Omega: '\u03A9',
			alpha: '\u03B1',
			beta: '\u03B2',
			gamma: '\u03B3',
			delta: '\u03B4',
			epsilon: '\u03B5',
			zeta: '\u03B6',
			eta: '\u03B7',
			theta: '\u03B8',
			iota: '\u03B9',
			kappa: '\u03BA',
			lambda: '\u03BB',
			mu: '\u03BC',
			nu: '\u03BD',
			xi: '\u03BE',
			omicron: '\u03BF',
			pi: '\u03C0',
			rho: '\u03C1',
			sigmaf: '\u03C2',
			sigma: '\u03C3',
			tau: '\u03C4',
			upsilon: '\u03C5',
			phi: '\u03C6',
			chi: '\u03C7',
			psi: '\u03C8',
			omega: '\u03C9',
			thetasym: '\u03D1',
			upsih: '\u03D2',
			piv: '\u03D6',
			ensp: '\u2002',
			emsp: '\u2003',
			thinsp: '\u2009',
			zwnj: '\u200C',
			zwj: '\u200D',
			lrm: '\u200E',
			rlm: '\u200F',
			ndash: '\u2013',
			mdash: '\u2014',
			lsquo: '\u2018',
			rsquo: '\u2019',
			sbquo: '\u201A',
			ldquo: '\u201C',
			rdquo: '\u201D',
			bdquo: '\u201E',
			dagger: '\u2020',
			Dagger: '\u2021',
			bull: '\u2022',
			hellip: '\u2026',
			permil: '\u2030',
			prime: '\u2032',
			Prime: '\u2033',
			lsaquo: '\u2039',
			rsaquo: '\u203A',
			oline: '\u203E',
			frasl: '\u2044',
			euro: '\u20AC',
			image: '\u2111',
			weierp: '\u2118',
			real: '\u211C',
			trade: '\u2122',
			alefsym: '\u2135',
			larr: '\u2190',
			uarr: '\u2191',
			rarr: '\u2192',
			darr: '\u2193',
			harr: '\u2194',
			crarr: '\u21B5',
			lArr: '\u21D0',
			uArr: '\u21D1',
			rArr: '\u21D2',
			dArr: '\u21D3',
			hArr: '\u21D4',
			forall: '\u2200',
			part: '\u2202',
			exist: '\u2203',
			empty: '\u2205',
			nabla: '\u2207',
			isin: '\u2208',
			notin: '\u2209',
			ni: '\u220B',
			prod: '\u220F',
			sum: '\u2211',
			minus: '\u2212',
			lowast: '\u2217',
			radic: '\u221A',
			prop: '\u221D',
			infin: '\u221E',
			ang: '\u2220',
			and: '\u2227',
			or: '\u2228',
			cap: '\u2229',
			cup: '\u222A',
			'int': '\u222B',
			there4: '\u2234',
			sim: '\u223C',
			cong: '\u2245',
			asymp: '\u2248',
			ne: '\u2260',
			equiv: '\u2261',
			le: '\u2264',
			ge: '\u2265',
			sub: '\u2282',
			sup: '\u2283',
			nsub: '\u2284',
			sube: '\u2286',
			supe: '\u2287',
			oplus: '\u2295',
			otimes: '\u2297',
			perp: '\u22A5',
			sdot: '\u22C5',
			lceil: '\u2308',
			rceil: '\u2309',
			lfloor: '\u230A',
			rfloor: '\u230B',
			lang: '\u2329',
			rang: '\u232A',
			loz: '\u25CA',
			spades: '\u2660',
			clubs: '\u2663',
			hearts: '\u2665',
			diams: '\u2666'
		};

		var hexNumber = /^[\da-fA-F]+$/;
		var decimalNumber = /^\d+$/;

		var inject = function inject(acorn) {
			var tt = acorn.tokTypes;
			var tc = acorn.tokContexts;

			tc.j_oTag = new acorn.TokContext('<tag', false);
			tc.j_cTag = new acorn.TokContext('</tag', false);
			tc.j_expr = new acorn.TokContext('<tag>...</tag>', true, true);

			tt.jsxName = new acorn.TokenType('jsxName');
			tt.jsxText = new acorn.TokenType('jsxText', { beforeExpr: true });
			tt.jsxTagStart = new acorn.TokenType('jsxTagStart');
			tt.jsxTagEnd = new acorn.TokenType('jsxTagEnd');

			tt.jsxTagStart.updateContext = function () {
				this.context.push(tc.j_expr); // treat as beginning of JSX expression
				this.context.push(tc.j_oTag); // start opening tag context
				this.exprAllowed = false;
			};
			tt.jsxTagEnd.updateContext = function (prevType) {
				var out = this.context.pop();
				if (out === tc.j_oTag && prevType === tt.slash || out === tc.j_cTag) {
					this.context.pop();
					this.exprAllowed = this.curContext() === tc.j_expr;
				} else {
					this.exprAllowed = true;
				}
			};

			var pp = acorn.Parser.prototype;

			// Reads inline JSX contents token.

			pp.jsx_readToken = function () {
				var out = '',
				    chunkStart = this.pos;
				for (;;) {
					if (this.pos >= this.input.length) this.raise(this.start, 'Unterminated JSX contents');
					var ch = this.input.charCodeAt(this.pos);

					switch (ch) {
						case 60: // '<'
						case 123:
							// '{'
							if (this.pos === this.start) {
								if (ch === 60 && this.exprAllowed) {
									++this.pos;
									return this.finishToken(tt.jsxTagStart);
								}
								return this.getTokenFromCode(ch);
							}
							out += this.input.slice(chunkStart, this.pos);
							return this.finishToken(tt.jsxText, out);

						case 38:
							// '&'
							out += this.input.slice(chunkStart, this.pos);
							out += this.jsx_readEntity();
							chunkStart = this.pos;
							break;

						default:
							if (acorn.isNewLine(ch)) {
								out += this.input.slice(chunkStart, this.pos);
								out += this.jsx_readNewLine(true);
								chunkStart = this.pos;
							} else {
								++this.pos;
							}
					}
				}
			};

			pp.jsx_readNewLine = function (normalizeCRLF) {
				var ch = this.input.charCodeAt(this.pos);
				var out;
				++this.pos;
				if (ch === 13 && this.input.charCodeAt(this.pos) === 10) {
					++this.pos;
					out = normalizeCRLF ? '\n' : '\r\n';
				} else {
					out = String.fromCharCode(ch);
				}
				if (this.options.locations) {
					++this.curLine;
					this.lineStart = this.pos;
				}

				return out;
			};

			pp.jsx_readString = function (quote) {
				var out = '',
				    chunkStart = ++this.pos;
				for (;;) {
					if (this.pos >= this.input.length) this.raise(this.start, 'Unterminated string constant');
					var ch = this.input.charCodeAt(this.pos);
					if (ch === quote) break;
					if (ch === 38) {
						// '&'
						out += this.input.slice(chunkStart, this.pos);
						out += this.jsx_readEntity();
						chunkStart = this.pos;
					} else if (acorn.isNewLine(ch)) {
						out += this.input.slice(chunkStart, this.pos);
						out += this.jsx_readNewLine(false);
						chunkStart = this.pos;
					} else {
						++this.pos;
					}
				}
				out += this.input.slice(chunkStart, this.pos++);
				return this.finishToken(tt.string, out);
			};

			pp.jsx_readEntity = function () {
				var str = '',
				    count = 0,
				    entity;
				var ch = this.input[this.pos];
				if (ch !== '&') this.raise(this.pos, 'Entity must start with an ampersand');
				var startPos = ++this.pos;
				while (this.pos < this.input.length && count++ < 10) {
					ch = this.input[this.pos++];
					if (ch === ';') {
						if (str[0] === '#') {
							if (str[1] === 'x') {
								str = str.substr(2);
								if (hexNumber.test(str)) entity = String.fromCharCode(parseInt(str, 16));
							} else {
								str = str.substr(1);
								if (decimalNumber.test(str)) entity = String.fromCharCode(parseInt(str, 10));
							}
						} else {
							entity = xhtml[str];
						}
						break;
					}
					str += ch;
				}
				if (!entity) {
					this.pos = startPos;
					return '&';
				}
				return entity;
			};

			// Read a JSX identifier (valid tag or attribute name).
			//
			// Optimized version since JSX identifiers can't contain
			// escape characters and so can be read as single slice.
			// Also assumes that first character was already checked
			// by isIdentifierStart in readToken.

			pp.jsx_readWord = function () {
				var ch,
				    start = this.pos;
				do {
					ch = this.input.charCodeAt(++this.pos);
				} while (acorn.isIdentifierChar(ch) || ch === 45); // '-'
				return this.finishToken(tt.jsxName, this.input.slice(start, this.pos));
			};

			// Transforms JSX element name to string.

			function getQualifiedJSXName(object) {
				if (object.type === 'JSXIdentifier') return object.name;

				if (object.type === 'JSXNamespacedName') return object.namespace.name + ':' + object.name.name;

				if (object.type === 'JSXMemberExpression') return getQualifiedJSXName(object.object) + '.' + getQualifiedJSXName(object.property);
			}

			// Parse next token as JSX identifier

			pp.jsx_parseIdentifier = function () {
				var node = this.startNode();
				if (this.type === tt.jsxName) node.name = this.value;else if (this.type.keyword) node.name = this.type.keyword;else this.unexpected();
				this.next();
				return this.finishNode(node, 'JSXIdentifier');
			};

			// Parse namespaced identifier.

			pp.jsx_parseNamespacedName = function () {
				var startPos = this.start,
				    startLoc = this.startLoc;
				var name = this.jsx_parseIdentifier();
				if (!this.options.plugins.jsx.allowNamespaces || !this.eat(tt.colon)) return name;
				var node = this.startNodeAt(startPos, startLoc);
				node.namespace = name;
				node.name = this.jsx_parseIdentifier();
				return this.finishNode(node, 'JSXNamespacedName');
			};

			// Parses element name in any form - namespaced, member
			// or single identifier.

			pp.jsx_parseElementName = function () {
				var startPos = this.start,
				    startLoc = this.startLoc;
				var node = this.jsx_parseNamespacedName();
				if (this.type === tt.dot && node.type === 'JSXNamespacedName' && !this.options.plugins.jsx.allowNamespacedObjects) {
					this.unexpected();
				}
				while (this.eat(tt.dot)) {
					var newNode = this.startNodeAt(startPos, startLoc);
					newNode.object = node;
					newNode.property = this.jsx_parseIdentifier();
					node = this.finishNode(newNode, 'JSXMemberExpression');
				}
				return node;
			};

			// Parses any type of JSX attribute value.

			pp.jsx_parseAttributeValue = function () {
				switch (this.type) {
					case tt.braceL:
						var node = this.jsx_parseExpressionContainer();
						if (node.expression.type === 'JSXEmptyExpression') this.raise(node.start, 'JSX attributes must only be assigned a non-empty expression');
						return node;

					case tt.jsxTagStart:
					case tt.string:
						return this.parseExprAtom();

					default:
						this.raise(this.start, 'JSX value should be either an expression or a quoted JSX text');
				}
			};

			// JSXEmptyExpression is unique type since it doesn't actually parse anything,
			// and so it should start at the end of last read token (left brace) and finish
			// at the beginning of the next one (right brace).

			pp.jsx_parseEmptyExpression = function () {
				var node = this.startNodeAt(this.lastTokEnd, this.lastTokEndLoc);
				return this.finishNodeAt(node, 'JSXEmptyExpression', this.start, this.startLoc);
			};

			// Parses JSX expression enclosed into curly brackets.


			pp.jsx_parseExpressionContainer = function () {
				var node = this.startNode();
				this.next();
				node.expression = this.type === tt.braceR ? this.jsx_parseEmptyExpression() : this.parseExpression();
				this.expect(tt.braceR);
				return this.finishNode(node, 'JSXExpressionContainer');
			};

			// Parses following JSX attribute name-value pair.

			pp.jsx_parseAttribute = function () {
				var node = this.startNode();
				if (this.eat(tt.braceL)) {
					this.expect(tt.ellipsis);
					node.argument = this.parseMaybeAssign();
					this.expect(tt.braceR);
					return this.finishNode(node, 'JSXSpreadAttribute');
				}
				node.name = this.jsx_parseNamespacedName();
				node.value = this.eat(tt.eq) ? this.jsx_parseAttributeValue() : null;
				return this.finishNode(node, 'JSXAttribute');
			};

			// Parses JSX opening tag starting after '<'.

			pp.jsx_parseOpeningElementAt = function (startPos, startLoc) {
				var node = this.startNodeAt(startPos, startLoc);
				node.attributes = [];
				node.name = this.jsx_parseElementName();
				while (this.type !== tt.slash && this.type !== tt.jsxTagEnd) {
					node.attributes.push(this.jsx_parseAttribute());
				}node.selfClosing = this.eat(tt.slash);
				this.expect(tt.jsxTagEnd);
				return this.finishNode(node, 'JSXOpeningElement');
			};

			// Parses JSX closing tag starting after '</'.

			pp.jsx_parseClosingElementAt = function (startPos, startLoc) {
				var node = this.startNodeAt(startPos, startLoc);
				node.name = this.jsx_parseElementName();
				this.expect(tt.jsxTagEnd);
				return this.finishNode(node, 'JSXClosingElement');
			};

			// Parses entire JSX element, including it's opening tag
			// (starting after '<'), attributes, contents and closing tag.

			pp.jsx_parseElementAt = function (startPos, startLoc) {
				var node = this.startNodeAt(startPos, startLoc);
				var children = [];
				var openingElement = this.jsx_parseOpeningElementAt(startPos, startLoc);
				var closingElement = null;

				if (!openingElement.selfClosing) {
					contents: for (;;) {
						switch (this.type) {
							case tt.jsxTagStart:
								startPos = this.start;startLoc = this.startLoc;
								this.next();
								if (this.eat(tt.slash)) {
									closingElement = this.jsx_parseClosingElementAt(startPos, startLoc);
									break contents;
								}
								children.push(this.jsx_parseElementAt(startPos, startLoc));
								break;

							case tt.jsxText:
								children.push(this.parseExprAtom());
								break;

							case tt.braceL:
								children.push(this.jsx_parseExpressionContainer());
								break;

							default:
								this.unexpected();
						}
					}
					if (getQualifiedJSXName(closingElement.name) !== getQualifiedJSXName(openingElement.name)) {
						this.raise(closingElement.start, 'Expected corresponding JSX closing tag for <' + getQualifiedJSXName(openingElement.name) + '>');
					}
				}

				node.openingElement = openingElement;
				node.closingElement = closingElement;
				node.children = children;
				if (this.type === tt.relational && this.value === "<") {
					this.raise(this.start, "Adjacent JSX elements must be wrapped in an enclosing tag");
				}
				return this.finishNode(node, 'JSXElement');
			};

			// Parses entire JSX element from current position.

			pp.jsx_parseElement = function () {
				var startPos = this.start,
				    startLoc = this.startLoc;
				this.next();
				return this.jsx_parseElementAt(startPos, startLoc);
			};

			acorn.plugins.jsx = function (instance, opts) {
				if (!opts) {
					return;
				}

				if ((typeof opts === 'undefined' ? 'undefined' : _typeof(opts)) !== 'object') {
					opts = {};
				}

				instance.options.plugins.jsx = {
					allowNamespaces: opts.allowNamespaces !== false,
					allowNamespacedObjects: !!opts.allowNamespacedObjects
				};

				instance.extend('parseExprAtom', function (inner) {
					return function (refShortHandDefaultPos) {
						if (this.type === tt.jsxText) return this.parseLiteral(this.value);else if (this.type === tt.jsxTagStart) return this.jsx_parseElement();else return inner.call(this, refShortHandDefaultPos);
					};
				});

				instance.extend('readToken', function (inner) {
					return function (code) {
						var context = this.curContext();

						if (context === tc.j_expr) return this.jsx_readToken();

						if (context === tc.j_oTag || context === tc.j_cTag) {
							if (acorn.isIdentifierStart(code)) return this.jsx_readWord();

							if (code == 62) {
								++this.pos;
								return this.finishToken(tt.jsxTagEnd);
							}

							if ((code === 34 || code === 39) && context == tc.j_oTag) return this.jsx_readString(code);
						}

						if (code === 60 && this.exprAllowed) {
							++this.pos;
							return this.finishToken(tt.jsxTagStart);
						}
						return inner.call(this, code);
					};
				});

				instance.extend('updateContext', function (inner) {
					return function (prevType) {
						if (this.type == tt.braceL) {
							var curContext = this.curContext();
							if (curContext == tc.j_oTag) this.context.push(tc.b_expr);else if (curContext == tc.j_expr) this.context.push(tc.b_tmpl);else inner.call(this, prevType);
							this.exprAllowed = true;
						} else if (this.type === tt.slash && prevType === tt.jsxTagStart) {
							this.context.length -= 2; // do not consider JSX expr -> JSX open tag -> ... anymore
							this.context.push(tc.j_cTag); // reconsider as closing tag context
							this.exprAllowed = false;
						} else {
							return inner.call(this, prevType);
						}
					};
				});
			};

			return acorn;
		};

		var inject$1 = function inject$1(acorn) {
			if (acorn.version.substr(0, 1) !== "5") {
				throw new Error("Unsupported acorn version " + acorn.version + ", please use acorn 5");
			}
			var tt = acorn.tokTypes;
			var pp = acorn.Parser.prototype;

			// this is the same parseObj that acorn has with...
			function parseObj(isPattern, refDestructuringErrors) {
				var node = this.startNode(),
				    first = true,
				    propHash = {};
				node.properties = [];
				this.next();
				while (!this.eat(tt.braceR)) {
					if (!first) {
						this.expect(tt.comma);
						if (this.afterTrailingComma(tt.braceR)) break;
					} else first = false;

					var prop = this.startNode(),
					    isGenerator = void 0,
					    isAsync = void 0,
					    startPos = void 0,
					    startLoc = void 0;
					if (this.options.ecmaVersion >= 6) {
						// ...the spread logic borrowed from babylon :)
						if (this.type === tt.ellipsis) {
							if (isPattern) {
								this.next();
								prop.argument = this.parseIdent();
								this.finishNode(prop, "RestElement");
							} else {
								prop = this.parseSpread(refDestructuringErrors);
							}
							node.properties.push(prop);
							if (this.type === tt.comma) {
								if (isPattern) {
									this.raise(this.start, "Comma is not permitted after the rest element");
								} else if (refDestructuringErrors && refDestructuringErrors.trailingComma < 0) {
									refDestructuringErrors.trailingComma = this.start;
								}
							}
							continue;
						}

						prop.method = false;
						prop.shorthand = false;
						if (isPattern || refDestructuringErrors) {
							startPos = this.start;
							startLoc = this.startLoc;
						}
						if (!isPattern) isGenerator = this.eat(tt.star);
					}
					this.parsePropertyName(prop);
					if (!isPattern && this.options.ecmaVersion >= 8 && !isGenerator && this.isAsyncProp(prop)) {
						isAsync = true;
						this.parsePropertyName(prop, refDestructuringErrors);
					} else {
						isAsync = false;
					}
					this.parsePropertyValue(prop, isPattern, isGenerator, isAsync, startPos, startLoc, refDestructuringErrors);
					if (!isPattern) this.checkPropClash(prop, propHash);
					node.properties.push(this.finishNode(prop, "Property"));
				}
				return this.finishNode(node, isPattern ? "ObjectPattern" : "ObjectExpression");
			}

			var getCheckLVal = function getCheckLVal(origCheckLVal) {
				return function (expr, bindingType, checkClashes) {
					if (expr.type == "ObjectPattern") {
						for (var _iterator = expr.properties, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
							var _ref;

							if (_isArray) {
								if (_i >= _iterator.length) break;
								_ref = _iterator[_i++];
							} else {
								_i = _iterator.next();
								if (_i.done) break;
								_ref = _i.value;
							}

							var prop = _ref;

							this.checkLVal(prop, bindingType, checkClashes);
						}return;
					} else if (expr.type === "Property") {
						// AssignmentProperty has type == "Property"
						return this.checkLVal(expr.value, bindingType, checkClashes);
					}
					return origCheckLVal.apply(this, arguments);
				};
			};

			acorn.plugins.objectSpread = function objectSpreadPlugin(instance) {
				pp.parseObj = parseObj;
				instance.extend("checkLVal", getCheckLVal);
				instance.extend("toAssignable", function (nextMethod) {
					return function (node, isBinding) {
						if (this.options.ecmaVersion >= 6 && node) {
							if (node.type == "ObjectExpression") {
								node.type = "ObjectPattern";
								for (var _iterator2 = node.properties, _isArray2 = Array.isArray(_iterator2), _i2 = 0, _iterator2 = _isArray2 ? _iterator2 : _iterator2[Symbol.iterator]();;) {
									var _ref2;

									if (_isArray2) {
										if (_i2 >= _iterator2.length) break;
										_ref2 = _iterator2[_i2++];
									} else {
										_i2 = _iterator2.next();
										if (_i2.done) break;
										_ref2 = _i2.value;
									}

									var prop = _ref2;

									this.toAssignable(prop, isBinding);
								}return node;
							} else if (node.type === "Property") {
								// AssignmentProperty has type == "Property"
								if (node.kind !== "init") this.raise(node.key.start, "Object pattern can't contain getter or setter");
								return this.toAssignable(node.value, isBinding);
							} else if (node.type === "SpreadElement") {
								node.type = "RestElement";
								return this.toAssignable(node.argument, isBinding);
							}
						}
						return nextMethod.apply(this, arguments);
					};
				});
				instance.extend("checkPatternExport", function (nextMethod) {
					return function (exports, pat) {
						if (pat.type == "ObjectPattern") {
							for (var _iterator3 = pat.properties, _isArray3 = Array.isArray(_iterator3), _i3 = 0, _iterator3 = _isArray3 ? _iterator3 : _iterator3[Symbol.iterator]();;) {
								var _ref3;

								if (_isArray3) {
									if (_i3 >= _iterator3.length) break;
									_ref3 = _iterator3[_i3++];
								} else {
									_i3 = _iterator3.next();
									if (_i3.done) break;
									_ref3 = _i3.value;
								}

								var prop = _ref3;

								this.checkPatternExport(exports, prop);
							}return;
						} else if (pat.type === "Property") {
							return this.checkPatternExport(exports, pat.value);
						} else if (pat.type === "RestElement") {
							return this.checkPatternExport(exports, pat.argument);
						}
						nextMethod.apply(this, arguments);
					};
				});
			};

			return acorn;
		};

		var integerToChar = {};

		'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/='.split('').forEach(function (char, i) {
			integerToChar[i] = char;
		});

		function encode(value) {
			var result;

			if (typeof value === 'number') {
				result = encodeInteger(value);
			} else {
				result = '';
				for (var i = 0; i < value.length; i += 1) {
					result += encodeInteger(value[i]);
				}
			}

			return result;
		}

		function encodeInteger(num) {
			var result = '';

			if (num < 0) {
				num = -num << 1 | 1;
			} else {
				num <<= 1;
			}

			do {
				var clamped = num & 31;
				num >>= 5;

				if (num > 0) {
					clamped |= 32;
				}

				result += integerToChar[clamped];
			} while (num > 0);

			return result;
		}

		function Chunk(start, end, content) {
			this.start = start;
			this.end = end;
			this.original = content;

			this.intro = '';
			this.outro = '';

			this.content = content;
			this.storeName = false;
			this.edited = false;

			// we make these non-enumerable, for sanity while debugging
			Object.defineProperties(this, {
				previous: { writable: true, value: null },
				next: { writable: true, value: null }
			});
		}

		Chunk.prototype = {
			appendLeft: function appendLeft(content) {
				this.outro += content;
			},

			appendRight: function appendRight(content) {
				this.intro = this.intro + content;
			},

			clone: function clone() {
				var chunk = new Chunk(this.start, this.end, this.original);

				chunk.intro = this.intro;
				chunk.outro = this.outro;
				chunk.content = this.content;
				chunk.storeName = this.storeName;
				chunk.edited = this.edited;

				return chunk;
			},

			contains: function contains(index) {
				return this.start < index && index < this.end;
			},

			eachNext: function eachNext(fn) {
				var chunk = this;
				while (chunk) {
					fn(chunk);
					chunk = chunk.next;
				}
			},

			eachPrevious: function eachPrevious(fn) {
				var chunk = this;
				while (chunk) {
					fn(chunk);
					chunk = chunk.previous;
				}
			},

			edit: function edit(content, storeName, contentOnly) {
				this.content = content;
				if (!contentOnly) {
					this.intro = '';
					this.outro = '';
				}
				this.storeName = storeName;

				this.edited = true;

				return this;
			},

			prependLeft: function prependLeft(content) {
				this.outro = content + this.outro;
			},

			prependRight: function prependRight(content) {
				this.intro = content + this.intro;
			},

			split: function split(index) {
				var sliceIndex = index - this.start;

				var originalBefore = this.original.slice(0, sliceIndex);
				var originalAfter = this.original.slice(sliceIndex);

				this.original = originalBefore;

				var newChunk = new Chunk(index, this.end, originalAfter);
				newChunk.outro = this.outro;
				this.outro = '';

				this.end = index;

				if (this.edited) {
					// TODO is this block necessary?...
					newChunk.edit('', false);
					this.content = '';
				} else {
					this.content = originalBefore;
				}

				newChunk.next = this.next;
				if (newChunk.next) {
					newChunk.next.previous = newChunk;
				}
				newChunk.previous = this;
				this.next = newChunk;

				return newChunk;
			},

			toString: function toString() {
				return this.intro + this.content + this.outro;
			},

			trimEnd: function trimEnd(rx) {
				this.outro = this.outro.replace(rx, '');
				if (this.outro.length) {
					return true;
				}

				var trimmed = this.content.replace(rx, '');

				if (trimmed.length) {
					if (trimmed !== this.content) {
						this.split(this.start + trimmed.length).edit('', false);
					}

					return true;
				} else {
					this.edit('', false);

					this.intro = this.intro.replace(rx, '');
					if (this.intro.length) {
						return true;
					}
				}
			},

			trimStart: function trimStart(rx) {
				this.intro = this.intro.replace(rx, '');
				if (this.intro.length) {
					return true;
				}

				var trimmed = this.content.replace(rx, '');

				if (trimmed.length) {
					if (trimmed !== this.content) {
						this.split(this.end - trimmed.length);
						this.edit('', false);
					}

					return true;
				} else {
					this.edit('', false);

					this.outro = this.outro.replace(rx, '');
					if (this.outro.length) {
						return true;
					}
				}
			}
		};

		var _btoa;

		if (typeof window !== 'undefined' && typeof window.btoa === 'function') {
			_btoa = window.btoa;
		} else if (typeof Buffer === 'function') {
			_btoa = function _btoa(str) {
				return new Buffer(str).toString('base64');
			};
		} else {
			_btoa = function _btoa() {
				throw new Error('Unsupported environment: `window.btoa` or `Buffer` should be supported.');
			};
		}

		var btoa = _btoa;

		function SourceMap(properties) {
			this.version = 3;

			this.file = properties.file;
			this.sources = properties.sources;
			this.sourcesContent = properties.sourcesContent;
			this.names = properties.names;
			this.mappings = properties.mappings;
		}

		SourceMap.prototype = {
			toString: function toString() {
				return JSON.stringify(this);
			},

			toUrl: function toUrl() {
				return 'data:application/json;charset=utf-8;base64,' + btoa(this.toString());
			}
		};

		function guessIndent(code) {
			var lines = code.split('\n');

			var tabbed = lines.filter(function (line) {
				return (/^\t+/.test(line)
				);
			});
			var spaced = lines.filter(function (line) {
				return (/^ {2,}/.test(line)
				);
			});

			if (tabbed.length === 0 && spaced.length === 0) {
				return null;
			}

			// More lines tabbed than spaced? Assume tabs, and
			// default to tabs in the case of a tie (or nothing
			// to go on)
			if (tabbed.length >= spaced.length) {
				return '\t';
			}

			// Otherwise, we need to guess the multiple
			var min = spaced.reduce(function (previous, current) {
				var numSpaces = /^ +/.exec(current)[0].length;
				return Math.min(numSpaces, previous);
			}, Infinity);

			return new Array(min + 1).join(' ');
		}

		function getRelativePath(from, to) {
			var fromParts = from.split(/[\/\\]/);
			var toParts = to.split(/[\/\\]/);

			fromParts.pop(); // get dirname

			while (fromParts[0] === toParts[0]) {
				fromParts.shift();
				toParts.shift();
			}

			if (fromParts.length) {
				var i = fromParts.length;
				while (i--) {
					fromParts[i] = '..';
				}
			}

			return fromParts.concat(toParts).join('/');
		}

		var toString$1 = Object.prototype.toString;

		function isObject(thing) {
			return toString$1.call(thing) === '[object Object]';
		}

		function getLocator(source) {
			var originalLines = source.split('\n');

			var start = 0;
			var lineRanges = originalLines.map(function (line, i) {
				var end = start + line.length + 1;
				var range = { start: start, end: end, line: i };

				start = end;
				return range;
			});

			var i = 0;

			function rangeContains(range, index) {
				return range.start <= index && index < range.end;
			}

			function getLocation(range, index) {
				return { line: range.line, column: index - range.start };
			}

			return function locate(index) {
				var range = lineRanges[i];

				var d = index >= range.end ? 1 : -1;

				while (range) {
					if (rangeContains(range, index)) {
						return getLocation(range, index);
					}

					i += d;
					range = lineRanges[i];
				}
			};
		}

		function Mappings(hires) {
			var this$1 = this;

			var offsets = {
				generatedCodeColumn: 0,
				sourceIndex: 0,
				sourceCodeLine: 0,
				sourceCodeColumn: 0,
				sourceCodeName: 0
			};

			var generatedCodeLine = 0;
			var generatedCodeColumn = 0;

			this.raw = [];
			var rawSegments = this.raw[generatedCodeLine] = [];

			var pending = null;

			this.addEdit = function (sourceIndex, content, original, loc, nameIndex) {
				if (content.length) {
					rawSegments.push([generatedCodeColumn, sourceIndex, loc.line, loc.column, nameIndex]);
				} else if (pending) {
					rawSegments.push(pending);
				}

				this$1.advance(content);
				pending = null;
			};

			this.addUneditedChunk = function (sourceIndex, chunk, original, loc, sourcemapLocations) {
				var originalCharIndex = chunk.start;
				var first = true;

				while (originalCharIndex < chunk.end) {
					if (hires || first || sourcemapLocations[originalCharIndex]) {
						rawSegments.push([generatedCodeColumn, sourceIndex, loc.line, loc.column, -1]);
					}

					if (original[originalCharIndex] === '\n') {
						loc.line += 1;
						loc.column = 0;
						generatedCodeLine += 1;
						this$1.raw[generatedCodeLine] = rawSegments = [];
						generatedCodeColumn = 0;
					} else {
						loc.column += 1;
						generatedCodeColumn += 1;
					}

					originalCharIndex += 1;
					first = false;
				}

				pending = [generatedCodeColumn, sourceIndex, loc.line, loc.column, -1];
			};

			this.advance = function (str) {
				if (!str) {
					return;
				}

				var lines = str.split('\n');
				var lastLine = lines.pop();

				if (lines.length) {
					generatedCodeLine += lines.length;
					this$1.raw[generatedCodeLine] = rawSegments = [];
					generatedCodeColumn = lastLine.length;
				} else {
					generatedCodeColumn += lastLine.length;
				}
			};

			this.encode = function () {
				return this$1.raw.map(function (segments) {
					var generatedCodeColumn = 0;

					return segments.map(function (segment) {
						var arr = [segment[0] - generatedCodeColumn, segment[1] - offsets.sourceIndex, segment[2] - offsets.sourceCodeLine, segment[3] - offsets.sourceCodeColumn];

						generatedCodeColumn = segment[0];
						offsets.sourceIndex = segment[1];
						offsets.sourceCodeLine = segment[2];
						offsets.sourceCodeColumn = segment[3];

						if (~segment[4]) {
							arr.push(segment[4] - offsets.sourceCodeName);
							offsets.sourceCodeName = segment[4];
						}

						return encode(arr);
					}).join(',');
				}).join(';');
			};
		}

		var warned = {
			insertLeft: false,
			insertRight: false,
			storeName: false
		};

		function MagicString$1(string, options) {
			if (options === void 0) options = {};

			var chunk = new Chunk(0, string.length, string);

			Object.defineProperties(this, {
				original: { writable: true, value: string },
				outro: { writable: true, value: '' },
				intro: { writable: true, value: '' },
				firstChunk: { writable: true, value: chunk },
				lastChunk: { writable: true, value: chunk },
				lastSearchedChunk: { writable: true, value: chunk },
				byStart: { writable: true, value: {} },
				byEnd: { writable: true, value: {} },
				filename: { writable: true, value: options.filename },
				indentExclusionRanges: { writable: true, value: options.indentExclusionRanges },
				sourcemapLocations: { writable: true, value: {} },
				storedNames: { writable: true, value: {} },
				indentStr: { writable: true, value: guessIndent(string) }
			});

			this.byStart[0] = chunk;
			this.byEnd[string.length] = chunk;
		}

		MagicString$1.prototype = {
			addSourcemapLocation: function addSourcemapLocation(char) {
				this.sourcemapLocations[char] = true;
			},

			append: function append(content) {
				if (typeof content !== 'string') {
					throw new TypeError('outro content must be a string');
				}

				this.outro += content;
				return this;
			},

			appendLeft: function appendLeft(index, content) {
				if (typeof content !== 'string') {
					throw new TypeError('inserted content must be a string');
				}

				this._split(index);

				var chunk = this.byEnd[index];

				if (chunk) {
					chunk.appendLeft(content);
				} else {
					this.intro += content;
				}

				return this;
			},

			appendRight: function appendRight(index, content) {
				if (typeof content !== 'string') {
					throw new TypeError('inserted content must be a string');
				}

				this._split(index);

				var chunk = this.byStart[index];

				if (chunk) {
					chunk.appendRight(content);
				} else {
					this.outro += content;
				}

				return this;
			},

			clone: function clone() {
				var cloned = new MagicString$1(this.original, { filename: this.filename });

				var originalChunk = this.firstChunk;
				var clonedChunk = cloned.firstChunk = cloned.lastSearchedChunk = originalChunk.clone();

				while (originalChunk) {
					cloned.byStart[clonedChunk.start] = clonedChunk;
					cloned.byEnd[clonedChunk.end] = clonedChunk;

					var nextOriginalChunk = originalChunk.next;
					var nextClonedChunk = nextOriginalChunk && nextOriginalChunk.clone();

					if (nextClonedChunk) {
						clonedChunk.next = nextClonedChunk;
						nextClonedChunk.previous = clonedChunk;

						clonedChunk = nextClonedChunk;
					}

					originalChunk = nextOriginalChunk;
				}

				cloned.lastChunk = clonedChunk;

				if (this.indentExclusionRanges) {
					cloned.indentExclusionRanges = this.indentExclusionRanges.slice();
				}

				Object.keys(this.sourcemapLocations).forEach(function (loc) {
					cloned.sourcemapLocations[loc] = true;
				});

				return cloned;
			},

			generateMap: function generateMap(options) {
				var this$1 = this;

				options = options || {};

				var sourceIndex = 0;
				var names = Object.keys(this.storedNames);
				var mappings = new Mappings(options.hires);

				var locate = getLocator(this.original);

				if (this.intro) {
					mappings.advance(this.intro);
				}

				this.firstChunk.eachNext(function (chunk) {
					var loc = locate(chunk.start);

					if (chunk.intro.length) {
						mappings.advance(chunk.intro);
					}

					if (chunk.edited) {
						mappings.addEdit(sourceIndex, chunk.content, chunk.original, loc, chunk.storeName ? names.indexOf(chunk.original) : -1);
					} else {
						mappings.addUneditedChunk(sourceIndex, chunk, this$1.original, loc, this$1.sourcemapLocations);
					}

					if (chunk.outro.length) {
						mappings.advance(chunk.outro);
					}
				});

				var map = new SourceMap({
					file: options.file ? options.file.split(/[\/\\]/).pop() : null,
					sources: [options.source ? getRelativePath(options.file || '', options.source) : null],
					sourcesContent: options.includeContent ? [this.original] : [null],
					names: names,
					mappings: mappings.encode()
				});
				return map;
			},

			getIndentString: function getIndentString() {
				return this.indentStr === null ? '\t' : this.indentStr;
			},

			indent: function indent(indentStr, options) {
				var this$1 = this;

				var pattern = /^[^\r\n]/gm;

				if (isObject(indentStr)) {
					options = indentStr;
					indentStr = undefined;
				}

				indentStr = indentStr !== undefined ? indentStr : this.indentStr || '\t';

				if (indentStr === '') {
					return this;
				} // noop

				options = options || {};

				// Process exclusion ranges
				var isExcluded = {};

				if (options.exclude) {
					var exclusions = typeof options.exclude[0] === 'number' ? [options.exclude] : options.exclude;
					exclusions.forEach(function (exclusion) {
						for (var i = exclusion[0]; i < exclusion[1]; i += 1) {
							isExcluded[i] = true;
						}
					});
				}

				var shouldIndentNextCharacter = options.indentStart !== false;
				var replacer = function replacer(match) {
					if (shouldIndentNextCharacter) {
						return "" + indentStr + match;
					}
					shouldIndentNextCharacter = true;
					return match;
				};

				this.intro = this.intro.replace(pattern, replacer);

				var charIndex = 0;

				var chunk = this.firstChunk;

				while (chunk) {
					var end = chunk.end;

					if (chunk.edited) {
						if (!isExcluded[charIndex]) {
							chunk.content = chunk.content.replace(pattern, replacer);

							if (chunk.content.length) {
								shouldIndentNextCharacter = chunk.content[chunk.content.length - 1] === '\n';
							}
						}
					} else {
						charIndex = chunk.start;

						while (charIndex < end) {
							if (!isExcluded[charIndex]) {
								var char = this$1.original[charIndex];

								if (char === '\n') {
									shouldIndentNextCharacter = true;
								} else if (char !== '\r' && shouldIndentNextCharacter) {
									shouldIndentNextCharacter = false;

									if (charIndex === chunk.start) {
										chunk.prependRight(indentStr);
									} else {
										this$1._splitChunk(chunk, charIndex);
										chunk = chunk.next;
										chunk.prependRight(indentStr);
									}
								}
							}

							charIndex += 1;
						}
					}

					charIndex = chunk.end;
					chunk = chunk.next;
				}

				this.outro = this.outro.replace(pattern, replacer);

				return this;
			},

			insert: function insert() {
				throw new Error('magicString.insert(...) is deprecated. Use prependRight(...) or appendLeft(...)');
			},

			insertLeft: function insertLeft(index, content) {
				if (!warned.insertLeft) {
					console.warn('magicString.insertLeft(...) is deprecated. Use magicString.appendLeft(...) instead'); // eslint-disable-line no-console
					warned.insertLeft = true;
				}

				return this.appendLeft(index, content);
			},

			insertRight: function insertRight(index, content) {
				if (!warned.insertRight) {
					console.warn('magicString.insertRight(...) is deprecated. Use magicString.prependRight(...) instead'); // eslint-disable-line no-console
					warned.insertRight = true;
				}

				return this.prependRight(index, content);
			},

			move: function move(start, end, index) {
				if (index >= start && index <= end) {
					throw new Error('Cannot move a selection inside itself');
				}

				this._split(start);
				this._split(end);
				this._split(index);

				var first = this.byStart[start];
				var last = this.byEnd[end];

				var oldLeft = first.previous;
				var oldRight = last.next;

				var newRight = this.byStart[index];
				if (!newRight && last === this.lastChunk) {
					return this;
				}
				var newLeft = newRight ? newRight.previous : this.lastChunk;

				if (oldLeft) {
					oldLeft.next = oldRight;
				}
				if (oldRight) {
					oldRight.previous = oldLeft;
				}

				if (newLeft) {
					newLeft.next = first;
				}
				if (newRight) {
					newRight.previous = last;
				}

				if (!first.previous) {
					this.firstChunk = last.next;
				}
				if (!last.next) {
					this.lastChunk = first.previous;
					this.lastChunk.next = null;
				}

				first.previous = newLeft;
				last.next = newRight || null;

				if (!newLeft) {
					this.firstChunk = first;
				}
				if (!newRight) {
					this.lastChunk = last;
				}

				return this;
			},

			overwrite: function overwrite(start, end, content, options) {
				var this$1 = this;

				if (typeof content !== 'string') {
					throw new TypeError('replacement content must be a string');
				}

				while (start < 0) {
					start += this$1.original.length;
				}
				while (end < 0) {
					end += this$1.original.length;
				}

				if (end > this.original.length) {
					throw new Error('end is out of bounds');
				}
				if (start === end) {
					throw new Error('Cannot overwrite a zero-length range – use appendLeft or prependRight instead');
				}

				this._split(start);
				this._split(end);

				if (options === true) {
					if (!warned.storeName) {
						console.warn('The final argument to magicString.overwrite(...) should be an options object. See https://github.com/rich-harris/magic-string'); // eslint-disable-line no-console
						warned.storeName = true;
					}

					options = { storeName: true };
				}
				var storeName = options !== undefined ? options.storeName : false;
				var contentOnly = options !== undefined ? options.contentOnly : false;

				if (storeName) {
					var original = this.original.slice(start, end);
					this.storedNames[original] = true;
				}

				var first = this.byStart[start];
				var last = this.byEnd[end];

				if (first) {
					if (end > first.end && first.next !== this.byStart[first.end]) {
						throw new Error('Cannot overwrite across a split point');
					}

					first.edit(content, storeName, contentOnly);

					if (first !== last) {
						var chunk = first.next;
						while (chunk !== last) {
							chunk.edit('', false);
							chunk = chunk.next;
						}

						chunk.edit('', false);
					}
				} else {
					// must be inserting at the end
					var newChunk = new Chunk(start, end, '').edit(content, storeName);

					// TODO last chunk in the array may not be the last chunk, if it's moved...
					last.next = newChunk;
					newChunk.previous = last;
				}

				return this;
			},

			prepend: function prepend(content) {
				if (typeof content !== 'string') {
					throw new TypeError('outro content must be a string');
				}

				this.intro = content + this.intro;
				return this;
			},

			prependLeft: function prependLeft(index, content) {
				if (typeof content !== 'string') {
					throw new TypeError('inserted content must be a string');
				}

				this._split(index);

				var chunk = this.byEnd[index];

				if (chunk) {
					chunk.prependLeft(content);
				} else {
					this.intro = content + this.intro;
				}

				return this;
			},

			prependRight: function prependRight(index, content) {
				if (typeof content !== 'string') {
					throw new TypeError('inserted content must be a string');
				}

				this._split(index);

				var chunk = this.byStart[index];

				if (chunk) {
					chunk.prependRight(content);
				} else {
					this.outro = content + this.outro;
				}

				return this;
			},

			remove: function remove(start, end) {
				var this$1 = this;

				while (start < 0) {
					start += this$1.original.length;
				}
				while (end < 0) {
					end += this$1.original.length;
				}

				if (start === end) {
					return this;
				}

				if (start < 0 || end > this.original.length) {
					throw new Error('Character is out of bounds');
				}
				if (start > end) {
					throw new Error('end must be greater than start');
				}

				this._split(start);
				this._split(end);

				var chunk = this.byStart[start];

				while (chunk) {
					chunk.intro = '';
					chunk.outro = '';
					chunk.edit('');

					chunk = end > chunk.end ? this$1.byStart[chunk.end] : null;
				}

				return this;
			},

			slice: function slice(start, end) {
				var this$1 = this;
				if (start === void 0) start = 0;
				if (end === void 0) end = this.original.length;

				while (start < 0) {
					start += this$1.original.length;
				}
				while (end < 0) {
					end += this$1.original.length;
				}

				var result = '';

				// find start chunk
				var chunk = this.firstChunk;
				while (chunk && (chunk.start > start || chunk.end <= start)) {

					// found end chunk before start
					if (chunk.start < end && chunk.end >= end) {
						return result;
					}

					chunk = chunk.next;
				}

				if (chunk && chunk.edited && chunk.start !== start) {
					throw new Error("Cannot use replaced character " + start + " as slice start anchor.");
				}

				var startChunk = chunk;
				while (chunk) {
					if (chunk.intro && (startChunk !== chunk || chunk.start === start)) {
						result += chunk.intro;
					}

					var containsEnd = chunk.start < end && chunk.end >= end;
					if (containsEnd && chunk.edited && chunk.end !== end) {
						throw new Error("Cannot use replaced character " + end + " as slice end anchor.");
					}

					var sliceStart = startChunk === chunk ? start - chunk.start : 0;
					var sliceEnd = containsEnd ? chunk.content.length + end - chunk.end : chunk.content.length;

					result += chunk.content.slice(sliceStart, sliceEnd);

					if (chunk.outro && (!containsEnd || chunk.end === end)) {
						result += chunk.outro;
					}

					if (containsEnd) {
						break;
					}

					chunk = chunk.next;
				}

				return result;
			},

			// TODO deprecate this? not really very useful
			snip: function snip(start, end) {
				var clone = this.clone();
				clone.remove(0, start);
				clone.remove(end, clone.original.length);

				return clone;
			},

			_split: function _split(index) {
				var this$1 = this;

				if (this.byStart[index] || this.byEnd[index]) {
					return;
				}

				var chunk = this.lastSearchedChunk;
				var searchForward = index > chunk.end;

				while (true) {
					if (chunk.contains(index)) {
						return this$1._splitChunk(chunk, index);
					}

					chunk = searchForward ? this$1.byStart[chunk.end] : this$1.byEnd[chunk.start];
				}
			},

			_splitChunk: function _splitChunk(chunk, index) {
				if (chunk.edited && chunk.content.length) {
					// zero-length edited chunks are a special case (overlapping replacements)
					var loc = getLocator(this.original)(index);
					throw new Error("Cannot split a chunk that has already been edited (" + loc.line + ":" + loc.column + " – \"" + chunk.original + "\")");
				}

				var newChunk = chunk.split(index);

				this.byEnd[index] = chunk;
				this.byStart[index] = newChunk;
				this.byEnd[newChunk.end] = newChunk;

				if (chunk === this.lastChunk) {
					this.lastChunk = newChunk;
				}

				this.lastSearchedChunk = chunk;
				return true;
			},

			toString: function toString() {
				var str = this.intro;

				var chunk = this.firstChunk;
				while (chunk) {
					str += chunk.toString();
					chunk = chunk.next;
				}

				return str + this.outro;
			},

			trimLines: function trimLines() {
				return this.trim('[\\r\\n]');
			},

			trim: function trim(charType) {
				return this.trimStart(charType).trimEnd(charType);
			},

			trimEnd: function trimEnd(charType) {
				var this$1 = this;

				var rx = new RegExp((charType || '\\s') + '+$');

				this.outro = this.outro.replace(rx, '');
				if (this.outro.length) {
					return this;
				}

				var chunk = this.lastChunk;

				do {
					var end = chunk.end;
					var aborted = chunk.trimEnd(rx);

					// if chunk was trimmed, we have a new lastChunk
					if (chunk.end !== end) {
						if (this$1.lastChunk === chunk) {
							this$1.lastChunk = chunk.next;
						}

						this$1.byEnd[chunk.end] = chunk;
						this$1.byStart[chunk.next.start] = chunk.next;
						this$1.byEnd[chunk.next.end] = chunk.next;
					}

					if (aborted) {
						return this$1;
					}
					chunk = chunk.previous;
				} while (chunk);

				return this;
			},

			trimStart: function trimStart(charType) {
				var this$1 = this;

				var rx = new RegExp('^' + (charType || '\\s') + '+');

				this.intro = this.intro.replace(rx, '');
				if (this.intro.length) {
					return this;
				}

				var chunk = this.firstChunk;

				do {
					var end = chunk.end;
					var aborted = chunk.trimStart(rx);

					if (chunk.end !== end) {
						// special case...
						if (chunk === this$1.lastChunk) {
							this$1.lastChunk = chunk.next;
						}

						this$1.byEnd[chunk.end] = chunk;
						this$1.byStart[chunk.next.start] = chunk.next;
						this$1.byEnd[chunk.next.end] = chunk.next;
					}

					if (aborted) {
						return this$1;
					}
					chunk = chunk.next;
				} while (chunk);

				return this;
			}
		};

		var keys = {
			Program: ['body'],
			Literal: []
		};

		// used for debugging, without the noise created by
		// circular references
		function _toJSON(node) {
			var obj = {};

			Object.keys(node).forEach(function (key) {
				if (key === 'parent' || key === 'program' || key === 'keys' || key === '__wrapped') return;

				if (Array.isArray(node[key])) {
					obj[key] = node[key].map(_toJSON);
				} else if (node[key] && node[key].toJSON) {
					obj[key] = node[key].toJSON();
				} else {
					obj[key] = node[key];
				}
			});

			return obj;
		}

		var Node$1 = function () {
			function Node$1(raw, parent) {
				classCallCheck(this, Node$1);

				raw.parent = parent;
				raw.program = parent.program || parent;
				raw.depth = parent.depth + 1;
				raw.keys = keys[raw.type];
				raw.indentation = undefined;

				for (var i = 0, list = keys[raw.type]; i < list.length; i += 1) {
					var key = list[i];

					wrap(raw[key], raw);
				}

				raw.program.magicString.addSourcemapLocation(raw.start);
				raw.program.magicString.addSourcemapLocation(raw.end);
			}

			Node$1.prototype.ancestor = function ancestor(level) {
				var node = this;
				while (level--) {
					node = node.parent;
					if (!node) return null;
				}

				return node;
			};

			Node$1.prototype.contains = function contains(node) {
				while (node) {
					if (node === this) return true;
					node = node.parent;
				}

				return false;
			};

			Node$1.prototype.findLexicalBoundary = function findLexicalBoundary() {
				return this.parent.findLexicalBoundary();
			};

			Node$1.prototype.findNearest = function findNearest(type) {
				if (typeof type === 'string') type = new RegExp('^' + type + '$');
				if (type.test(this.type)) return this;
				return this.parent.findNearest(type);
			};

			Node$1.prototype.unparenthesizedParent = function unparenthesizedParent() {
				var node = this.parent;
				while (node && node.type === 'ParenthesizedExpression') {
					node = node.parent;
				}
				return node;
			};

			Node$1.prototype.unparenthesize = function unparenthesize() {
				var node = this;
				while (node.type === 'ParenthesizedExpression') {
					node = node.expression;
				}
				return node;
			};

			Node$1.prototype.findScope = function findScope(functionScope) {
				return this.parent.findScope(functionScope);
			};

			Node$1.prototype.getIndentation = function getIndentation() {
				return this.parent.getIndentation();
			};

			Node$1.prototype.initialise = function initialise(transforms) {
				for (var i = 0, list = this.keys; i < list.length; i += 1) {
					var key = list[i];

					var value = this[key];

					if (Array.isArray(value)) {
						value.forEach(function (node) {
							return node && node.initialise(transforms);
						});
					} else if (value && (typeof value === 'undefined' ? 'undefined' : _typeof(value)) === 'object') {
						value.initialise(transforms);
					}
				}
			};

			Node$1.prototype.toJSON = function toJSON() {
				return _toJSON(this);
			};

			Node$1.prototype.toString = function toString() {
				return this.program.magicString.original.slice(this.start, this.end);
			};

			Node$1.prototype.transpile = function transpile(code, transforms) {
				for (var i = 0, list = this.keys; i < list.length; i += 1) {
					var key = list[i];

					var value = this[key];

					if (Array.isArray(value)) {
						value.forEach(function (node) {
							return node && node.transpile(code, transforms);
						});
					} else if (value && (typeof value === 'undefined' ? 'undefined' : _typeof(value)) === 'object') {
						value.transpile(code, transforms);
					}
				}
			};

			return Node$1;
		}();

		function isArguments(node) {
			return node.type === 'Identifier' && node.name === 'arguments';
		}

		function spread(code, elements, start, argumentsArrayAlias, isNew) {
			var i = elements.length;
			var firstSpreadIndex = -1;

			while (i--) {
				var _element = elements[i];
				if (_element && _element.type === 'SpreadElement') {
					if (isArguments(_element.argument)) {
						code.overwrite(_element.argument.start, _element.argument.end, argumentsArrayAlias);
					}

					firstSpreadIndex = i;
				}
			}

			if (firstSpreadIndex === -1) return false; // false indicates no spread elements

			if (isNew) {
				for (i = 0; i < elements.length; i += 1) {
					var _element2 = elements[i];
					if (_element2.type === 'SpreadElement') {
						code.remove(_element2.start, _element2.argument.start);
					} else {
						code.prependRight(_element2.start, '[');
						code.prependRight(_element2.end, ']');
					}
				}

				return true; // true indicates some spread elements
			}

			var element = elements[firstSpreadIndex];
			var previousElement = elements[firstSpreadIndex - 1];

			if (!previousElement) {
				code.remove(start, element.start);
				code.overwrite(element.end, elements[1].start, '.concat( ');
			} else {
				code.overwrite(previousElement.end, element.start, ' ].concat( ');
			}

			for (i = firstSpreadIndex; i < elements.length; i += 1) {
				element = elements[i];

				if (element) {
					if (element.type === 'SpreadElement') {
						code.remove(element.start, element.argument.start);
					} else {
						code.appendLeft(element.start, '[');
						code.appendLeft(element.end, ']');
					}
				}
			}

			return true; // true indicates some spread elements
		}

		var ArrayExpression = function (_Node$) {
			inherits(ArrayExpression, _Node$);

			function ArrayExpression() {
				classCallCheck(this, ArrayExpression);
				return possibleConstructorReturn(this, _Node$.apply(this, arguments));
			}

			ArrayExpression.prototype.initialise = function initialise(transforms) {
				if (transforms.spreadRest && this.elements.length) {
					var lexicalBoundary = this.findLexicalBoundary();

					var i = this.elements.length;
					while (i--) {
						var element = this.elements[i];
						if (element && element.type === 'SpreadElement' && isArguments(element.argument)) {
							this.argumentsArrayAlias = lexicalBoundary.getArgumentsArrayAlias();
						}
					}
				}

				_Node$.prototype.initialise.call(this, transforms);
			};

			ArrayExpression.prototype.transpile = function transpile(code, transforms) {
				if (transforms.spreadRest) {
					// erase trailing comma after last array element if not an array hole
					if (this.elements.length) {
						var lastElement = this.elements[this.elements.length - 1];
						if (lastElement && /\s*,/.test(code.original.slice(lastElement.end, this.end))) {
							code.overwrite(lastElement.end, this.end - 1, ' ');
						}
					}

					if (this.elements.length === 1) {
						var element = this.elements[0];

						if (element && element.type === 'SpreadElement') {
							// special case – [ ...arguments ]
							if (isArguments(element.argument)) {
								code.overwrite(this.start, this.end, '[].concat( ' + this.argumentsArrayAlias + ' )'); // TODO if this is the only use of argsArray, don't bother concating
							} else {
								code.overwrite(this.start, element.argument.start, '[].concat( ');
								code.overwrite(element.end, this.end, ' )');
							}
						}
					} else {
						var hasSpreadElements = spread(code, this.elements, this.start, this.argumentsArrayAlias);

						if (hasSpreadElements) {
							code.overwrite(this.end - 1, this.end, ')');
						}
					}
				}

				_Node$.prototype.transpile.call(this, code, transforms);
			};

			return ArrayExpression;
		}(Node$1);

		function removeTrailingComma(code, c) {
			while (code.original[c] !== ')') {
				if (code.original[c] === ',') {
					code.remove(c, c + 1);
					return;
				}

				c += 1;
			}
		}

		var ArrowFunctionExpression = function (_Node$2) {
			inherits(ArrowFunctionExpression, _Node$2);

			function ArrowFunctionExpression() {
				classCallCheck(this, ArrowFunctionExpression);
				return possibleConstructorReturn(this, _Node$2.apply(this, arguments));
			}

			ArrowFunctionExpression.prototype.initialise = function initialise(transforms) {
				this.body.createScope();
				_Node$2.prototype.initialise.call(this, transforms);
			};

			ArrowFunctionExpression.prototype.transpile = function transpile(code, transforms) {
				var naked = this.params.length === 1 && this.start === this.params[0].start;

				if (transforms.arrow || this.needsArguments(transforms)) {
					// remove arrow
					var charIndex = this.body.start;
					while (code.original[charIndex] !== '=') {
						charIndex -= 1;
					}
					code.remove(charIndex, this.body.start);

					_Node$2.prototype.transpile.call(this, code, transforms);

					// wrap naked parameter
					if (naked) {
						code.prependRight(this.params[0].start, '(');
						code.appendLeft(this.params[0].end, ')');
					}

					// add function
					if (this.parent && this.parent.type === 'ExpressionStatement') {
						// standalone expression statement
						code.prependRight(this.start, '!function');
					} else {
						code.prependRight(this.start, 'function ');
					}
				} else {
					_Node$2.prototype.transpile.call(this, code, transforms);
				}

				if (transforms.trailingFunctionCommas && this.params.length && !naked) {
					removeTrailingComma(code, this.params[this.params.length - 1].end);
				}
			};

			// Returns whether any transforms that will happen use `arguments`


			ArrowFunctionExpression.prototype.needsArguments = function needsArguments(transforms) {
				return transforms.spreadRest && this.params.filter(function (param) {
					return param.type === 'RestElement';
				}).length > 0;
			};

			return ArrowFunctionExpression;
		}(Node$1);

		function locate(source, index) {
			var lines = source.split('\n');
			var len = lines.length;

			var lineStart = 0;
			var i;

			for (i = 0; i < len; i += 1) {
				var line = lines[i];
				var lineEnd = lineStart + line.length + 1; // +1 for newline

				if (lineEnd > index) {
					return { line: i + 1, column: index - lineStart, char: i };
				}

				lineStart = lineEnd;
			}

			throw new Error('Could not determine location of character');
		}

		function pad(num, len) {
			var result = String(num);
			return result + repeat(' ', len - result.length);
		}

		function repeat(str, times) {
			var result = '';
			while (times--) {
				result += str;
			}return result;
		}

		function getSnippet(source, loc, length) {
			if (length === void 0) length = 1;

			var first = Math.max(loc.line - 5, 0);
			var last = loc.line;

			var numDigits = String(last).length;

			var lines = source.split('\n').slice(first, last);

			var lastLine = lines[lines.length - 1];
			var offset = lastLine.slice(0, loc.column).replace(/\t/g, '  ').length;

			var snippet = lines.map(function (line, i) {
				return pad(i + first + 1, numDigits) + ' : ' + line.replace(/\t/g, '  ');
			}).join('\n');

			snippet += '\n' + repeat(' ', numDigits + 3 + offset) + repeat('^', length);

			return snippet;
		}

		var CompileError = function (_Error) {
			inherits(CompileError, _Error);

			function CompileError(message, node) {
				classCallCheck(this, CompileError);

				var _this3 = possibleConstructorReturn(this, _Error.call(this, message));

				_this3.name = 'CompileError';
				if (!node) {
					return possibleConstructorReturn(_this3);
				}

				var source = node.program.magicString.original;
				var loc = locate(source, node.start);

				_this3.message = message + (' (' + loc.line + ':' + loc.column + ')');

				_this3.stack = new Error().stack.replace(new RegExp('.+new ' + _this3.name + '.+\\n', 'm'), '');

				_this3.loc = loc;
				_this3.snippet = getSnippet(source, loc, node.end - node.start);
				return _this3;
			}

			CompileError.prototype.toString = function toString() {
				return this.name + ': ' + this.message + '\n' + this.snippet;
			};

			return CompileError;
		}(Error);

		var AssignmentExpression = function (_Node$3) {
			inherits(AssignmentExpression, _Node$3);

			function AssignmentExpression() {
				classCallCheck(this, AssignmentExpression);
				return possibleConstructorReturn(this, _Node$3.apply(this, arguments));
			}

			AssignmentExpression.prototype.initialise = function initialise(transforms) {
				if (this.left.type === 'Identifier') {
					var declaration = this.findScope(false).findDeclaration(this.left.name);
					if (declaration && declaration.kind === 'const') {
						throw new CompileError(this.left.name + ' is read-only', this.left);
					}

					// special case – https://gitlab.com/Rich-Harris/buble/issues/11
					var statement = declaration && declaration.node.ancestor(3);
					if (statement && statement.type === 'ForStatement' && statement.body.contains(this)) {
						statement.reassigned[this.left.name] = true;
					}
				}

				_Node$3.prototype.initialise.call(this, transforms);
			};

			AssignmentExpression.prototype.transpile = function transpile(code, transforms) {
				if (this.operator === '**=' && transforms.exponentiation) {
					this.transpileExponentiation(code, transforms);
				} else if (/Pattern/.test(this.left.type) && transforms.destructuring) {
					this.transpileDestructuring(code, transforms);
				}

				_Node$3.prototype.transpile.call(this, code, transforms);
			};

			AssignmentExpression.prototype.transpileDestructuring = function transpileDestructuring(code) {
				var scope = this.findScope(true);
				var assign$$1 = scope.createIdentifier('assign');
				var temporaries = [assign$$1];

				var start = this.start;

				// We need to pick out some elements from the original code,
				// interleaved with generated code. These helpers are used to
				// easily do that while keeping the order of the output
				// predictable.
				var text = '';
				function use(node) {
					code.prependRight(node.start, text);
					code.move(node.start, node.end, start);
					text = '';
				}
				function write(string) {
					text += string;
				}

				write('(' + assign$$1 + ' = ');
				use(this.right);

				// Walk `pattern`, generating code that assigns the value in
				// `ref` to it. When `mayDuplicate` is false, the function
				// must take care to only output `ref` once.
				function destructure(pattern, ref, mayDuplicate) {
					if (pattern.type === 'Identifier' || pattern.type === 'MemberExpression') {
						write(', ');
						use(pattern);
						write(' = ' + ref);
					} else if (pattern.type === 'AssignmentPattern') {
						if (pattern.left.type === 'Identifier') {
							code.remove(pattern.start, pattern.right.start);

							var _target = pattern.left.name;
							var source = ref;
							if (!mayDuplicate) {
								write(', ' + _target + ' = ' + ref);
								source = _target;
							}
							write(', ' + _target + ' = ' + source + ' === void 0 ? ');
							use(pattern.right);
							write(' : ' + source);
						} else {
							code.remove(pattern.left.end, pattern.right.start);

							var _target2 = scope.createIdentifier('temp');
							var _source = ref;
							temporaries.push(_target2);
							if (!mayDuplicate) {
								write(', ' + _target2 + ' = ' + ref);
								_source = _target2;
							}
							write(', ' + _target2 + ' = ' + _source + ' === void 0 ? ');
							use(pattern.right);
							write(' : ' + _source);
							destructure(pattern.left, _target2, true);
						}
					} else if (pattern.type === 'ArrayPattern') {
						var elements = pattern.elements;
						if (elements.length === 1) {
							code.remove(pattern.start, elements[0].start);
							destructure(elements[0], ref + '[0]', false);
							code.remove(elements[0].end, pattern.end);
						} else {
							if (!mayDuplicate) {
								var temp = scope.createIdentifier('array');
								temporaries.push(temp);
								write(', ' + temp + ' = ' + ref);
								ref = temp;
							}

							var c = pattern.start;
							elements.forEach(function (element, i) {
								if (!element) return;

								code.remove(c, element.start);
								c = element.end;

								if (element.type === 'RestElement') {
									code.remove(element.start, element.argument.start);
									destructure(element.argument, ref + '.slice(' + i + ')', false);
								} else {
									destructure(element, ref + '[' + i + ']', false);
								}
							});

							code.remove(c, pattern.end);
						}
					} else if (pattern.type === 'ObjectPattern') {
						var props = pattern.properties;
						if (props.length == 1) {
							var prop = props[0];
							var value = prop.computed || prop.key.type !== 'Identifier' ? ref + '[' + code.slice(prop.key.start, prop.key.end) + ']' : ref + '.' + prop.key.name;

							code.remove(pattern.start, prop.value.start);
							destructure(prop.value, value, false);
							code.remove(prop.end, pattern.end);
						} else {
							if (!mayDuplicate) {
								var _temp = scope.createIdentifier('obj');
								temporaries.push(_temp);
								write(', ' + _temp + ' = ' + ref);
								ref = _temp;
							}

							var _c = pattern.start;

							props.forEach(function (prop) {
								var value = prop.computed || prop.key.type !== 'Identifier' ? ref + '[' + code.slice(prop.key.start, prop.key.end) + ']' : ref + '.' + prop.key.name;

								code.remove(_c, prop.value.start);
								_c = prop.end;

								destructure(prop.value, value, false);
							});

							code.remove(_c, pattern.end);
						}
					} else {
						throw new Error('Unexpected node type in destructuring assignment (' + pattern.type + ')');
					}
				}

				destructure(this.left, assign$$1, true);
				code.remove(this.left.end, this.right.start);

				if (this.unparenthesizedParent().type === 'ExpressionStatement') {
					// no rvalue needed for expression statement
					code.prependRight(start, text + ')');
				} else {
					// destructuring is part of an expression - need an rvalue
					code.prependRight(start, text + ', ' + assign$$1 + ')');
				}

				var statement = this.findNearest(/(?:Statement|Declaration)$/);
				code.appendLeft(statement.start, 'var ' + temporaries.join(', ') + ';\n' + statement.getIndentation());
			};

			AssignmentExpression.prototype.transpileExponentiation = function transpileExponentiation(code) {
				var scope = this.findScope(false);
				var getAlias = function getAlias(name) {
					var declaration = scope.findDeclaration(name);
					return declaration ? declaration.name : name;
				};

				// first, the easy part – `**=` -> `=`
				var charIndex = this.left.end;
				while (code.original[charIndex] !== '*') {
					charIndex += 1;
				}code.remove(charIndex, charIndex + 2);

				// how we do the next part depends on a number of factors – whether
				// this is a top-level statement, and whether we're updating a
				// simple or complex reference
				var base = void 0;

				var left = this.left.unparenthesize();

				if (left.type === 'Identifier') {
					base = getAlias(left.name);
				} else if (left.type === 'MemberExpression') {
					var object = void 0;
					var needsObjectVar = false;
					var property = void 0;
					var needsPropertyVar = false;

					var statement = this.findNearest(/(?:Statement|Declaration)$/);
					var i0 = statement.getIndentation();

					if (left.property.type === 'Identifier') {
						property = left.computed ? getAlias(left.property.name) : left.property.name;
					} else {
						property = scope.createIdentifier('property');
						needsPropertyVar = true;
					}

					if (left.object.type === 'Identifier') {
						object = getAlias(left.object.name);
					} else {
						object = scope.createIdentifier('object');
						needsObjectVar = true;
					}

					if (left.start === statement.start) {
						if (needsObjectVar && needsPropertyVar) {
							code.prependRight(statement.start, 'var ' + object + ' = ');
							code.overwrite(left.object.end, left.property.start, ';\n' + i0 + 'var ' + property + ' = ');
							code.overwrite(left.property.end, left.end, ';\n' + i0 + object + '[' + property + ']');
						} else if (needsObjectVar) {
							code.prependRight(statement.start, 'var ' + object + ' = ');
							code.appendLeft(left.object.end, ';\n' + i0);
							code.appendLeft(left.object.end, object);
						} else if (needsPropertyVar) {
							code.prependRight(left.property.start, 'var ' + property + ' = ');
							code.appendLeft(left.property.end, ';\n' + i0);
							code.move(left.property.start, left.property.end, this.start);

							code.appendLeft(left.object.end, '[' + property + ']');
							code.remove(left.object.end, left.property.start);
							code.remove(left.property.end, left.end);
						}
					} else {
						var declarators = [];
						if (needsObjectVar) declarators.push(object);
						if (needsPropertyVar) declarators.push(property);

						if (declarators.length) {
							code.prependRight(statement.start, 'var ' + declarators.join(', ') + ';\n' + i0);
						}

						if (needsObjectVar && needsPropertyVar) {
							code.prependRight(left.start, '( ' + object + ' = ');
							code.overwrite(left.object.end, left.property.start, ', ' + property + ' = ');
							code.overwrite(left.property.end, left.end, ', ' + object + '[' + property + ']');
						} else if (needsObjectVar) {
							code.prependRight(left.start, '( ' + object + ' = ');
							code.appendLeft(left.object.end, ', ' + object);
						} else if (needsPropertyVar) {
							code.prependRight(left.property.start, '( ' + property + ' = ');
							code.appendLeft(left.property.end, ', ');
							code.move(left.property.start, left.property.end, left.start);

							code.overwrite(left.object.end, left.property.start, '[' + property + ']');
							code.remove(left.property.end, left.end);
						}

						if (needsPropertyVar) {
							code.appendLeft(this.end, ' )');
						}
					}

					base = object + (left.computed || needsPropertyVar ? '[' + property + ']' : '.' + property);
				}

				code.prependRight(this.right.start, 'Math.pow( ' + base + ', ');
				code.appendLeft(this.right.end, ' )');
			};

			return AssignmentExpression;
		}(Node$1);

		var BinaryExpression = function (_Node$4) {
			inherits(BinaryExpression, _Node$4);

			function BinaryExpression() {
				classCallCheck(this, BinaryExpression);
				return possibleConstructorReturn(this, _Node$4.apply(this, arguments));
			}

			BinaryExpression.prototype.transpile = function transpile(code, transforms) {
				if (this.operator === '**' && transforms.exponentiation) {
					code.prependRight(this.start, 'Math.pow( ');
					code.overwrite(this.left.end, this.right.start, ', ');
					code.appendLeft(this.end, ' )');
				}
				_Node$4.prototype.transpile.call(this, code, transforms);
			};

			return BinaryExpression;
		}(Node$1);

		var loopStatement = /(?:For(?:In|Of)?|While)Statement/;

		var BreakStatement = function (_Node$5) {
			inherits(BreakStatement, _Node$5);

			function BreakStatement() {
				classCallCheck(this, BreakStatement);
				return possibleConstructorReturn(this, _Node$5.apply(this, arguments));
			}

			BreakStatement.prototype.initialise = function initialise() {
				var loop = this.findNearest(loopStatement);
				var switchCase = this.findNearest('SwitchCase');

				if (loop && (!switchCase || loop.depth > switchCase.depth)) {
					loop.canBreak = true;
					this.loop = loop;
				}
			};

			BreakStatement.prototype.transpile = function transpile(code) {
				if (this.loop && this.loop.shouldRewriteAsFunction) {
					if (this.label) throw new CompileError('Labels are not currently supported in a loop with locally-scoped variables', this);
					code.overwrite(this.start, this.start + 5, 'return \'break\'');
				}
			};

			return BreakStatement;
		}(Node$1);

		var CallExpression = function (_Node$6) {
			inherits(CallExpression, _Node$6);

			function CallExpression() {
				classCallCheck(this, CallExpression);
				return possibleConstructorReturn(this, _Node$6.apply(this, arguments));
			}

			CallExpression.prototype.initialise = function initialise(transforms) {
				if (transforms.spreadRest && this.arguments.length > 1) {
					var lexicalBoundary = this.findLexicalBoundary();

					var i = this.arguments.length;
					while (i--) {
						var arg = this.arguments[i];
						if (arg.type === 'SpreadElement' && isArguments(arg.argument)) {
							this.argumentsArrayAlias = lexicalBoundary.getArgumentsArrayAlias();
						}
					}
				}

				_Node$6.prototype.initialise.call(this, transforms);
			};

			CallExpression.prototype.transpile = function transpile(code, transforms) {
				if (transforms.spreadRest && this.arguments.length) {
					var hasSpreadElements = false;
					var context = void 0;

					var firstArgument = this.arguments[0];

					if (this.arguments.length === 1) {
						if (firstArgument.type === 'SpreadElement') {
							code.remove(firstArgument.start, firstArgument.argument.start);
							hasSpreadElements = true;
						}
					} else {
						hasSpreadElements = spread(code, this.arguments, firstArgument.start, this.argumentsArrayAlias);
					}

					if (hasSpreadElements) {
						// we need to handle super() and super.method() differently
						// due to its instance
						var _super = null;
						if (this.callee.type === 'Super') {
							_super = this.callee;
						} else if (this.callee.type === 'MemberExpression' && this.callee.object.type === 'Super') {
							_super = this.callee.object;
						}

						if (!_super && this.callee.type === 'MemberExpression') {
							if (this.callee.object.type === 'Identifier') {
								context = this.callee.object.name;
							} else {
								context = this.findScope(true).createIdentifier('ref');
								var callExpression = this.callee.object;
								var enclosure = callExpression.findNearest(/Function/);
								var block = enclosure ? enclosure.body.body : callExpression.findNearest(/^Program$/).body;
								var lastStatementInBlock = block[block.length - 1];
								var i0 = lastStatementInBlock.getIndentation();
								code.prependRight(callExpression.start, '(' + context + ' = ');
								code.appendLeft(callExpression.end, ')');
								code.appendLeft(lastStatementInBlock.end, '\n' + i0 + 'var ' + context + ';');
							}
						} else {
							context = 'void 0';
						}

						code.appendLeft(this.callee.end, '.apply');

						if (_super) {
							_super.noCall = true; // bit hacky...

							if (this.arguments.length > 1) {
								if (firstArgument.type !== 'SpreadElement') {
									code.prependRight(firstArgument.start, '[ ');
								}

								code.appendLeft(this.arguments[this.arguments.length - 1].end, ' )');
							}
						} else if (this.arguments.length === 1) {
							code.prependRight(firstArgument.start, context + ', ');
						} else {
							if (firstArgument.type === 'SpreadElement') {
								code.appendLeft(firstArgument.start, context + ', ');
							} else {
								code.appendLeft(firstArgument.start, context + ', [ ');
							}

							code.appendLeft(this.arguments[this.arguments.length - 1].end, ' )');
						}
					}
				}

				if (transforms.trailingFunctionCommas && this.arguments.length) {
					removeTrailingComma(code, this.arguments[this.arguments.length - 1].end);
				}

				_Node$6.prototype.transpile.call(this, code, transforms);
			};

			return CallExpression;
		}(Node$1);

		function findIndex(array, fn) {
			for (var i = 0; i < array.length; i += 1) {
				if (fn(array[i], i)) return i;
			}

			return -1;
		}

		var reserved = Object.create(null);
		'do if in for let new try var case else enum eval null this true void with await break catch class const false super throw while yield delete export import public return static switch typeof default extends finally package private continue debugger function arguments interface protected implements instanceof'.split(' ').forEach(function (word) {
			return reserved[word] = true;
		});

		// TODO this code is pretty wild, tidy it up

		var ClassBody = function (_Node$7) {
			inherits(ClassBody, _Node$7);

			function ClassBody() {
				classCallCheck(this, ClassBody);
				return possibleConstructorReturn(this, _Node$7.apply(this, arguments));
			}

			ClassBody.prototype.transpile = function transpile(code, transforms, inFunctionExpression, superName) {
				var _this9 = this;

				if (transforms.classes) {
					var name = this.parent.name;

					var indentStr = code.getIndentString();
					var i0 = this.getIndentation() + (inFunctionExpression ? indentStr : '');
					var i1 = i0 + indentStr;

					var constructorIndex = findIndex(this.body, function (node) {
						return node.kind === 'constructor';
					});
					var _constructor = this.body[constructorIndex];

					var introBlock = '';
					var outroBlock = '';

					if (this.body.length) {
						code.remove(this.start, this.body[0].start);
						code.remove(this.body[this.body.length - 1].end, this.end);
					} else {
						code.remove(this.start, this.end);
					}

					if (_constructor) {
						_constructor.value.body.isConstructorBody = true;

						var previousMethod = this.body[constructorIndex - 1];
						var nextMethod = this.body[constructorIndex + 1];

						// ensure constructor is first
						if (constructorIndex > 0) {
							code.remove(previousMethod.end, _constructor.start);
							code.move(_constructor.start, nextMethod ? nextMethod.start : this.end - 1, this.body[0].start);
						}

						if (!inFunctionExpression) code.appendLeft(_constructor.end, ';');
					}

					var namedFunctions = this.program.options.namedFunctionExpressions !== false;
					var namedConstructor = namedFunctions || this.parent.superClass || this.parent.type !== 'ClassDeclaration';
					if (this.parent.superClass) {
						var inheritanceBlock = 'if ( ' + superName + ' ) ' + name + '.__proto__ = ' + superName + ';\n' + i0 + name + '.prototype = Object.create( ' + superName + ' && ' + superName + '.prototype );\n' + i0 + name + '.prototype.constructor = ' + name + ';';

						if (_constructor) {
							introBlock += '\n\n' + i0 + inheritanceBlock;
						} else {
							var fn = 'function ' + name + ' () {' + (superName ? '\n' + i1 + superName + '.apply(this, arguments);\n' + i0 + '}' : '}') + (inFunctionExpression ? '' : ';') + (this.body.length ? '\n\n' + i0 : '');

							inheritanceBlock = fn + inheritanceBlock;
							introBlock += inheritanceBlock + ('\n\n' + i0);
						}
					} else if (!_constructor) {
						var _fn = 'function ' + (namedConstructor ? name + ' ' : '') + '() {}';
						if (this.parent.type === 'ClassDeclaration') _fn += ';';
						if (this.body.length) _fn += '\n\n' + i0;

						introBlock += _fn;
					}

					var scope = this.findScope(false);

					var prototypeGettersAndSetters = [];
					var staticGettersAndSetters = [];
					var prototypeAccessors = void 0;
					var staticAccessors = void 0;

					this.body.forEach(function (method, i) {
						if (method.kind === 'constructor') {
							var constructorName = namedConstructor ? ' ' + name : '';
							code.overwrite(method.key.start, method.key.end, 'function' + constructorName);
							return;
						}

						if (method.static) {
							var len = code.original[method.start + 6] == ' ' ? 7 : 6;
							code.remove(method.start, method.start + len);
						}

						var isAccessor = method.kind !== 'method';
						var lhs = void 0;

						var methodName = method.key.name;
						if (reserved[methodName] || method.value.body.scope.references[methodName]) {
							methodName = scope.createIdentifier(methodName);
						}

						// when method name is a string or a number let's pretend it's a computed method

						var fake_computed = false;
						if (!method.computed && method.key.type === 'Literal') {
							fake_computed = true;
							method.computed = true;
						}

						if (isAccessor) {
							if (method.computed) {
								throw new Error('Computed accessor properties are not currently supported');
							}

							code.remove(method.start, method.key.start);

							if (method.static) {
								if (!~staticGettersAndSetters.indexOf(method.key.name)) staticGettersAndSetters.push(method.key.name);
								if (!staticAccessors) staticAccessors = scope.createIdentifier('staticAccessors');

								lhs = '' + staticAccessors;
							} else {
								if (!~prototypeGettersAndSetters.indexOf(method.key.name)) prototypeGettersAndSetters.push(method.key.name);
								if (!prototypeAccessors) prototypeAccessors = scope.createIdentifier('prototypeAccessors');

								lhs = '' + prototypeAccessors;
							}
						} else {
							lhs = method.static ? '' + name : name + '.prototype';
						}

						if (!method.computed) lhs += '.';

						var insertNewlines = constructorIndex > 0 && i === constructorIndex + 1 || i === 0 && constructorIndex === _this9.body.length - 1;

						if (insertNewlines) lhs = '\n\n' + i0 + lhs;

						var c = method.key.end;
						if (method.computed) {
							if (fake_computed) {
								code.prependRight(method.key.start, '[');
								code.appendLeft(method.key.end, ']');
							} else {
								while (code.original[c] !== ']') {
									c += 1;
								}c += 1;
							}
						}

						var funcName = method.computed || isAccessor || !namedFunctions ? '' : methodName + ' ';
						var rhs = (isAccessor ? '.' + method.kind : '') + ' = function' + (method.value.generator ? '* ' : ' ') + funcName;
						code.remove(c, method.value.start);
						code.prependRight(method.value.start, rhs);
						code.appendLeft(method.end, ';');

						if (method.value.generator) code.remove(method.start, method.key.start);

						code.prependRight(method.start, lhs);
					});

					if (prototypeGettersAndSetters.length || staticGettersAndSetters.length) {
						var intro = [];
						var outro = [];

						if (prototypeGettersAndSetters.length) {
							intro.push('var ' + prototypeAccessors + ' = { ' + prototypeGettersAndSetters.map(function (name) {
								return name + ': { configurable: true }';
							}).join(',') + ' };');
							outro.push('Object.defineProperties( ' + name + '.prototype, ' + prototypeAccessors + ' );');
						}

						if (staticGettersAndSetters.length) {
							intro.push('var ' + staticAccessors + ' = { ' + staticGettersAndSetters.map(function (name) {
								return name + ': { configurable: true }';
							}).join(',') + ' };');
							outro.push('Object.defineProperties( ' + name + ', ' + staticAccessors + ' );');
						}

						if (_constructor) introBlock += '\n\n' + i0;
						introBlock += intro.join('\n' + i0);
						if (!_constructor) introBlock += '\n\n' + i0;

						outroBlock += '\n\n' + i0 + outro.join('\n' + i0);
					}

					if (_constructor) {
						code.appendLeft(_constructor.end, introBlock);
					} else {
						code.prependRight(this.start, introBlock);
					}

					code.appendLeft(this.end, outroBlock);
				}

				_Node$7.prototype.transpile.call(this, code, transforms);
			};

			return ClassBody;
		}(Node$1);

		// TODO this function is slightly flawed – it works on the original string,
		// not its current edited state.
		// That's not a problem for the way that it's currently used, but it could
		// be in future...


		function deindent(node, code) {
			var start = node.start;
			var end = node.end;

			var indentStr = code.getIndentString();
			var indentStrLen = indentStr.length;
			var indentStart = start - indentStrLen;

			if (!node.program.indentExclusions[indentStart] && code.original.slice(indentStart, start) === indentStr) {
				code.remove(indentStart, start);
			}

			var pattern = new RegExp(indentStr + '\\S', 'g');
			var slice = code.original.slice(start, end);
			var match = void 0;

			while (match = pattern.exec(slice)) {
				var removeStart = start + match.index;
				if (!node.program.indentExclusions[removeStart]) {
					code.remove(removeStart, removeStart + indentStrLen);
				}
			}
		}

		var ClassDeclaration = function (_Node$8) {
			inherits(ClassDeclaration, _Node$8);

			function ClassDeclaration() {
				classCallCheck(this, ClassDeclaration);
				return possibleConstructorReturn(this, _Node$8.apply(this, arguments));
			}

			ClassDeclaration.prototype.initialise = function initialise(transforms) {
				if (this.id) {
					this.name = this.id.name;
					this.findScope(true).addDeclaration(this.id, 'class');
				} else {
					this.name = this.findScope(true).createIdentifier("defaultExport");
				}

				_Node$8.prototype.initialise.call(this, transforms);
			};

			ClassDeclaration.prototype.transpile = function transpile(code, transforms) {
				if (transforms.classes) {
					if (!this.superClass) deindent(this.body, code);

					var superName = this.superClass && (this.superClass.name || 'superclass');

					var i0 = this.getIndentation();
					var i1 = i0 + code.getIndentString();

					// if this is an export default statement, we have to move the export to
					// after the declaration, because `export default var Foo = ...` is illegal
					var isExportDefaultDeclaration = this.parent.type === 'ExportDefaultDeclaration';

					if (isExportDefaultDeclaration) {
						code.remove(this.parent.start, this.start);
					}

					var c = this.start;
					if (this.id) {
						code.overwrite(c, this.id.start, 'var ');
						c = this.id.end;
					} else {
						code.prependLeft(c, 'var ' + this.name);
					}

					if (this.superClass) {
						if (this.superClass.end === this.body.start) {
							code.remove(c, this.superClass.start);
							code.appendLeft(c, ' = (function (' + superName + ') {\n' + i1);
						} else {
							code.overwrite(c, this.superClass.start, ' = ');
							code.overwrite(this.superClass.end, this.body.start, '(function (' + superName + ') {\n' + i1);
						}
					} else {
						if (c === this.body.start) {
							code.appendLeft(c, ' = ');
						} else {
							code.overwrite(c, this.body.start, ' = ');
						}
					}

					this.body.transpile(code, transforms, !!this.superClass, superName);

					var syntheticDefaultExport = isExportDefaultDeclaration ? '\n\n' + i0 + 'export default ' + this.name + ';' : '';
					if (this.superClass) {
						code.appendLeft(this.end, '\n\n' + i1 + 'return ' + this.name + ';\n' + i0 + '}(');
						code.move(this.superClass.start, this.superClass.end, this.end);
						code.prependRight(this.end, '));' + syntheticDefaultExport);
					} else if (syntheticDefaultExport) {
						code.prependRight(this.end, syntheticDefaultExport);
					}
				} else {
					this.body.transpile(code, transforms, false, null);
				}
			};

			return ClassDeclaration;
		}(Node$1);

		var ClassExpression = function (_Node$9) {
			inherits(ClassExpression, _Node$9);

			function ClassExpression() {
				classCallCheck(this, ClassExpression);
				return possibleConstructorReturn(this, _Node$9.apply(this, arguments));
			}

			ClassExpression.prototype.initialise = function initialise(transforms) {
				this.name = (this.id ? this.id.name : this.parent.type === 'VariableDeclarator' ? this.parent.id.name : this.parent.type !== 'AssignmentExpression' ? null : this.parent.left.type === 'Identifier' ? this.parent.left.name : this.parent.left.type === 'MemberExpression' ? this.parent.left.property.name : null) || this.findScope(true).createIdentifier('anonymous');

				_Node$9.prototype.initialise.call(this, transforms);
			};

			ClassExpression.prototype.transpile = function transpile(code, transforms) {
				if (transforms.classes) {
					var superName = this.superClass && (this.superClass.name || 'superclass');

					var i0 = this.getIndentation();
					var i1 = i0 + code.getIndentString();

					if (this.superClass) {
						code.remove(this.start, this.superClass.start);
						code.remove(this.superClass.end, this.body.start);
						code.appendLeft(this.start, '(function (' + superName + ') {\n' + i1);
					} else {
						code.overwrite(this.start, this.body.start, '(function () {\n' + i1);
					}

					this.body.transpile(code, transforms, true, superName);

					var outro = '\n\n' + i1 + 'return ' + this.name + ';\n' + i0 + '}(';

					if (this.superClass) {
						code.appendLeft(this.end, outro);
						code.move(this.superClass.start, this.superClass.end, this.end);
						code.prependRight(this.end, '))');
					} else {
						code.appendLeft(this.end, '\n\n' + i1 + 'return ' + this.name + ';\n' + i0 + '}())');
					}
				} else {
					this.body.transpile(code, transforms, false);
				}
			};

			return ClassExpression;
		}(Node$1);

		var ContinueStatement = function (_Node$10) {
			inherits(ContinueStatement, _Node$10);

			function ContinueStatement() {
				classCallCheck(this, ContinueStatement);
				return possibleConstructorReturn(this, _Node$10.apply(this, arguments));
			}

			ContinueStatement.prototype.transpile = function transpile(code) {
				var loop = this.findNearest(loopStatement);
				if (loop.shouldRewriteAsFunction) {
					if (this.label) throw new CompileError('Labels are not currently supported in a loop with locally-scoped variables', this);
					code.overwrite(this.start, this.start + 8, 'return');
				}
			};

			return ContinueStatement;
		}(Node$1);

		var ExportDefaultDeclaration = function (_Node$11) {
			inherits(ExportDefaultDeclaration, _Node$11);

			function ExportDefaultDeclaration() {
				classCallCheck(this, ExportDefaultDeclaration);
				return possibleConstructorReturn(this, _Node$11.apply(this, arguments));
			}

			ExportDefaultDeclaration.prototype.initialise = function initialise(transforms) {
				if (transforms.moduleExport) throw new CompileError('export is not supported', this);
				_Node$11.prototype.initialise.call(this, transforms);
			};

			return ExportDefaultDeclaration;
		}(Node$1);

		var ExportNamedDeclaration = function (_Node$12) {
			inherits(ExportNamedDeclaration, _Node$12);

			function ExportNamedDeclaration() {
				classCallCheck(this, ExportNamedDeclaration);
				return possibleConstructorReturn(this, _Node$12.apply(this, arguments));
			}

			ExportNamedDeclaration.prototype.initialise = function initialise(transforms) {
				if (transforms.moduleExport) throw new CompileError('export is not supported', this);
				_Node$12.prototype.initialise.call(this, transforms);
			};

			return ExportNamedDeclaration;
		}(Node$1);

		var LoopStatement = function (_Node$13) {
			inherits(LoopStatement, _Node$13);

			function LoopStatement() {
				classCallCheck(this, LoopStatement);
				return possibleConstructorReturn(this, _Node$13.apply(this, arguments));
			}

			LoopStatement.prototype.findScope = function findScope(functionScope) {
				return functionScope || !this.createdScope ? this.parent.findScope(functionScope) : this.body.scope;
			};

			LoopStatement.prototype.initialise = function initialise(transforms) {
				this.body.createScope();
				this.createdScope = true;

				// this is populated as and when reassignments occur
				this.reassigned = Object.create(null);
				this.aliases = Object.create(null);

				_Node$13.prototype.initialise.call(this, transforms);

				if (transforms.letConst) {
					// see if any block-scoped declarations are referenced
					// inside function expressions
					var names = Object.keys(this.body.scope.declarations);

					var i = names.length;
					while (i--) {
						var name = names[i];
						var declaration = this.body.scope.declarations[name];

						var j = declaration.instances.length;
						while (j--) {
							var instance = declaration.instances[j];
							var nearestFunctionExpression = instance.findNearest(/Function/);

							if (nearestFunctionExpression && nearestFunctionExpression.depth > this.depth) {
								this.shouldRewriteAsFunction = true;
								break;
							}
						}

						if (this.shouldRewriteAsFunction) break;
					}
				}
			};

			LoopStatement.prototype.transpile = function transpile(code, transforms) {
				var needsBlock = this.type != 'ForOfStatement' && (this.body.type !== 'BlockStatement' || this.body.type === 'BlockStatement' && this.body.synthetic);

				if (this.shouldRewriteAsFunction) {
					var i0 = this.getIndentation();
					var i1 = i0 + code.getIndentString();

					var argString = this.args ? ' ' + this.args.join(', ') + ' ' : '';
					var paramString = this.params ? ' ' + this.params.join(', ') + ' ' : '';

					var functionScope = this.findScope(true);
					var _loop = functionScope.createIdentifier('loop');

					var before = 'var ' + _loop + ' = function (' + paramString + ') ' + (this.body.synthetic ? '{\n' + i0 + code.getIndentString() : '');
					var after = (this.body.synthetic ? '\n' + i0 + '}' : '') + (';\n\n' + i0);

					code.prependRight(this.body.start, before);
					code.appendLeft(this.body.end, after);
					code.move(this.start, this.body.start, this.body.end);

					if (this.canBreak || this.canReturn) {
						var returned = functionScope.createIdentifier('returned');

						var insert = '{\n' + i1 + 'var ' + returned + ' = ' + _loop + '(' + argString + ');\n';
						if (this.canBreak) insert += '\n' + i1 + 'if ( ' + returned + ' === \'break\' ) break;';
						if (this.canReturn) insert += '\n' + i1 + 'if ( ' + returned + ' ) return ' + returned + '.v;';
						insert += '\n' + i0 + '}';

						code.prependRight(this.body.end, insert);
					} else {
						var callExpression = _loop + '(' + argString + ');';

						if (this.type === 'DoWhileStatement') {
							code.overwrite(this.start, this.body.start, 'do {\n' + i1 + callExpression + '\n' + i0 + '}');
						} else {
							code.prependRight(this.body.end, callExpression);
						}
					}
				} else if (needsBlock) {
					code.appendLeft(this.body.start, '{ ');
					code.prependRight(this.body.end, ' }');
				}

				_Node$13.prototype.transpile.call(this, code, transforms);
			};

			return LoopStatement;
		}(Node$1);

		function extractNames(node) {
			var names = [];
			extractors[node.type](names, node);
			return names;
		}

		var extractors = {
			Identifier: function Identifier(names, node) {
				names.push(node);
			},
			ObjectPattern: function ObjectPattern(names, node) {
				for (var i = 0, list = node.properties; i < list.length; i += 1) {
					var prop = list[i];

					extractors[prop.type](names, prop);
				}
			},
			Property: function Property(names, node) {
				extractors[node.value.type](names, node.value);
			},
			ArrayPattern: function ArrayPattern(names, node) {
				for (var i = 0, list = node.elements; i < list.length; i += 1) {
					var element = list[i];

					if (element) extractors[element.type](names, element);
				}
			},
			RestElement: function RestElement(names, node) {
				extractors[node.argument.type](names, node.argument);
			},
			AssignmentPattern: function AssignmentPattern(names, node) {
				extractors[node.left.type](names, node.left);
			}
		};

		var ForStatement = function (_LoopStatement) {
			inherits(ForStatement, _LoopStatement);

			function ForStatement() {
				classCallCheck(this, ForStatement);
				return possibleConstructorReturn(this, _LoopStatement.apply(this, arguments));
			}

			ForStatement.prototype.findScope = function findScope(functionScope) {
				return functionScope || !this.createdScope ? this.parent.findScope(functionScope) : this.body.scope;
			};

			ForStatement.prototype.transpile = function transpile(code, transforms) {
				var _this17 = this;

				var i1 = this.getIndentation() + code.getIndentString();

				if (this.shouldRewriteAsFunction) {
					// which variables are declared in the init statement?
					var names = this.init.type === 'VariableDeclaration' ? [].concat.apply([], this.init.declarations.map(function (declarator) {
						return extractNames(declarator.id);
					})) : [];

					var aliases = this.aliases;

					this.args = names.map(function (name) {
						return name in _this17.aliases ? _this17.aliases[name].outer : name;
					});
					this.params = names.map(function (name) {
						return name in _this17.aliases ? _this17.aliases[name].inner : name;
					});

					var updates = Object.keys(this.reassigned).map(function (name) {
						return aliases[name].outer + ' = ' + aliases[name].inner + ';';
					});

					if (updates.length) {
						if (this.body.synthetic) {
							code.appendLeft(this.body.body[0].end, '; ' + updates.join(' '));
						} else {
							var lastStatement = this.body.body[this.body.body.length - 1];
							code.appendLeft(lastStatement.end, '\n\n' + i1 + updates.join('\n' + i1));
						}
					}
				}

				_LoopStatement.prototype.transpile.call(this, code, transforms);
			};

			return ForStatement;
		}(LoopStatement);

		var ForInStatement = function (_LoopStatement2) {
			inherits(ForInStatement, _LoopStatement2);

			function ForInStatement() {
				classCallCheck(this, ForInStatement);
				return possibleConstructorReturn(this, _LoopStatement2.apply(this, arguments));
			}

			ForInStatement.prototype.findScope = function findScope(functionScope) {
				return functionScope || !this.createdScope ? this.parent.findScope(functionScope) : this.body.scope;
			};

			ForInStatement.prototype.transpile = function transpile(code, transforms) {
				var _this19 = this;

				if (this.shouldRewriteAsFunction) {
					// which variables are declared in the init statement?
					var names = this.left.type === 'VariableDeclaration' ? [].concat.apply([], this.left.declarations.map(function (declarator) {
						return extractNames(declarator.id);
					})) : [];

					this.args = names.map(function (name) {
						return name in _this19.aliases ? _this19.aliases[name].outer : name;
					});
					this.params = names.map(function (name) {
						return name in _this19.aliases ? _this19.aliases[name].inner : name;
					});
				}

				_LoopStatement2.prototype.transpile.call(this, code, transforms);
			};

			return ForInStatement;
		}(LoopStatement);

		var handlers = {
			Identifier: destructureIdentifier,
			AssignmentPattern: destructureAssignmentPattern,
			ArrayPattern: destructureArrayPattern,
			ObjectPattern: destructureObjectPattern
		};

		function destructure(code, scope, node, ref, inline, statementGenerators) {
			handlers[node.type](code, scope, node, ref, inline, statementGenerators);
		}

		function destructureIdentifier(code, scope, node, ref, inline, statementGenerators) {
			statementGenerators.push(function (start, prefix, suffix) {
				code.prependRight(node.start, inline ? prefix : prefix + 'var ');
				code.appendLeft(node.end, ' = ' + ref + suffix);
				code.move(node.start, node.end, start);
			});
		}

		function destructureAssignmentPattern(code, scope, node, ref, inline, statementGenerators) {
			var isIdentifier = node.left.type === 'Identifier';
			var name = isIdentifier ? node.left.name : ref;

			if (!inline) {
				statementGenerators.push(function (start, prefix, suffix) {
					code.prependRight(node.left.end, prefix + 'if ( ' + name + ' === void 0 ) ' + name);
					code.move(node.left.end, node.right.end, start);
					code.appendLeft(node.right.end, suffix);
				});
			}

			if (!isIdentifier) {
				destructure(code, scope, node.left, ref, inline, statementGenerators);
			}
		}

		function destructureArrayPattern(code, scope, node, ref, inline, statementGenerators) {
			var c = node.start;

			node.elements.forEach(function (element, i) {
				if (!element) return;

				if (element.type === 'RestElement') {
					handleProperty(code, scope, c, element.argument, ref + '.slice(' + i + ')', inline, statementGenerators);
				} else {
					handleProperty(code, scope, c, element, ref + '[' + i + ']', inline, statementGenerators);
				}
				c = element.end;
			});

			code.remove(c, node.end);
		}

		function destructureObjectPattern(code, scope, node, ref, inline, statementGenerators) {
			var _this20 = this;

			var c = node.start;

			var nonRestKeys = [];
			node.properties.forEach(function (prop) {
				var value = void 0;
				var content = void 0;
				if (prop.type === 'Property') {
					var isComputedKey = prop.computed || prop.key.type !== 'Identifier';
					var key = isComputedKey ? code.slice(prop.key.start, prop.key.end) : prop.key.name;
					value = isComputedKey ? ref + '[' + key + ']' : ref + '.' + key;
					content = prop.value;
					nonRestKeys.push(isComputedKey ? key : '"' + key + '"');
				} else if (prop.type === 'RestElement') {
					content = prop.argument;
					value = scope.createIdentifier('rest');
					var n = scope.createIdentifier('n');
					statementGenerators.push(function (start, prefix, suffix) {
						code.overwrite(prop.start, c = prop.argument.start, prefix + 'var ' + value + ' = {}; for (var ' + n + ' in ' + ref + ') if([' + nonRestKeys.join(', ') + '].indexOf(' + n + ') === -1) ' + value + '[' + n + '] = ' + ref + '[' + n + ']' + suffix);
						code.move(prop.start, c, start);
					});
				} else {
					throw new CompileError(_this20, 'Unexpected node of type ' + prop.type + ' in object pattern');
				}
				handleProperty(code, scope, c, content, value, inline, statementGenerators);
				c = prop.end;
			});

			code.remove(c, node.end);
		}

		function handleProperty(code, scope, c, node, value, inline, statementGenerators) {
			switch (node.type) {
				case 'Identifier':
					{
						code.remove(c, node.start);
						destructureIdentifier(code, scope, node, value, inline, statementGenerators);
						break;
					}

				case 'AssignmentPattern':
					{
						var name = void 0;

						var isIdentifier = node.left.type === 'Identifier';

						if (isIdentifier) {
							name = node.left.name;
							var declaration = scope.findDeclaration(name);
							if (declaration) name = declaration.name;
						} else {
							name = scope.createIdentifier(value);
						}

						statementGenerators.push(function (start, prefix, suffix) {
							if (inline) {
								code.prependRight(node.right.start, name + ' = ' + value + ' === undefined ? ');
								code.appendLeft(node.right.end, ' : ' + value);
							} else {
								code.prependRight(node.right.start, prefix + 'var ' + name + ' = ' + value + '; if ( ' + name + ' === void 0 ) ' + name + ' = ');
								code.appendLeft(node.right.end, suffix);
							}

							code.move(node.right.start, node.right.end, start);
						});

						if (isIdentifier) {
							code.remove(c, node.right.start);
						} else {
							code.remove(c, node.left.start);
							code.remove(node.left.end, node.right.start);
							handleProperty(code, scope, c, node.left, name, inline, statementGenerators);
						}

						break;
					}

				case 'ObjectPattern':
					{
						code.remove(c, c = node.start);

						var _ref4 = value;
						if (node.properties.length > 1) {
							_ref4 = scope.createIdentifier(value);

							statementGenerators.push(function (start, prefix, suffix) {
								// this feels a tiny bit hacky, but we can't do a
								// straightforward appendLeft and keep correct order...
								code.prependRight(node.start, prefix + 'var ' + _ref4 + ' = ');
								code.overwrite(node.start, c = node.start + 1, value);
								code.appendLeft(c, suffix);

								code.overwrite(node.start, c = node.start + 1, prefix + 'var ' + _ref4 + ' = ' + value + suffix);
								code.move(node.start, c, start);
							});
						}

						destructureObjectPattern(code, scope, node, _ref4, inline, statementGenerators);

						break;
					}

				case 'ArrayPattern':
					{
						code.remove(c, c = node.start);

						if (node.elements.filter(Boolean).length > 1) {
							var _ref5 = scope.createIdentifier(value);

							statementGenerators.push(function (start, prefix, suffix) {
								code.prependRight(node.start, prefix + 'var ' + _ref5 + ' = ');
								code.overwrite(node.start, c = node.start + 1, value, {
									contentOnly: true
								});
								code.appendLeft(c, suffix);

								code.move(node.start, c, start);
							});

							node.elements.forEach(function (element, i) {
								if (!element) return;

								if (element.type === 'RestElement') {
									handleProperty(code, scope, c, element.argument, _ref5 + '.slice(' + i + ')', inline, statementGenerators);
								} else {
									handleProperty(code, scope, c, element, _ref5 + '[' + i + ']', inline, statementGenerators);
								}
								c = element.end;
							});
						} else {
							var index = findIndex(node.elements, Boolean);
							var element = node.elements[index];
							if (element.type === 'RestElement') {
								handleProperty(code, scope, c, element.argument, value + '.slice(' + index + ')', inline, statementGenerators);
							} else {
								handleProperty(code, scope, c, element, value + '[' + index + ']', inline, statementGenerators);
							}
							c = element.end;
						}

						code.remove(c, node.end);
						break;
					}

				default:
					{
						throw new Error('Unexpected node type in destructuring (' + node.type + ')');
					}
			}
		}

		var ForOfStatement = function (_LoopStatement3) {
			inherits(ForOfStatement, _LoopStatement3);

			function ForOfStatement() {
				classCallCheck(this, ForOfStatement);
				return possibleConstructorReturn(this, _LoopStatement3.apply(this, arguments));
			}

			ForOfStatement.prototype.initialise = function initialise(transforms) {
				if (transforms.forOf && !transforms.dangerousForOf) throw new CompileError("for...of statements are not supported. Use `transforms: { forOf: false }` to skip transformation and disable this error, or `transforms: { dangerousForOf: true }` if you know what you're doing", this);
				_LoopStatement3.prototype.initialise.call(this, transforms);
			};

			ForOfStatement.prototype.transpile = function transpile(code, transforms) {
				_LoopStatement3.prototype.transpile.call(this, code, transforms);
				if (!transforms.dangerousForOf) return;

				// edge case (#80)
				if (!this.body.body[0]) {
					if (this.left.type === 'VariableDeclaration' && this.left.kind === 'var') {
						code.remove(this.start, this.left.start);
						code.appendLeft(this.left.end, ';');
						code.remove(this.left.end, this.end);
					} else {
						code.remove(this.start, this.end);
					}

					return;
				}

				var scope = this.findScope(true);
				var i0 = this.getIndentation();
				var i1 = i0 + code.getIndentString();

				var key = scope.createIdentifier('i');
				var list = scope.createIdentifier('list');

				if (this.body.synthetic) {
					code.prependRight(this.left.start, '{\n' + i1);
					code.appendLeft(this.body.body[0].end, '\n' + i0 + '}');
				}

				var bodyStart = this.body.body[0].start;

				code.remove(this.left.end, this.right.start);
				code.move(this.left.start, this.left.end, bodyStart);

				code.prependRight(this.right.start, 'var ' + key + ' = 0, ' + list + ' = ');
				code.appendLeft(this.right.end, '; ' + key + ' < ' + list + '.length; ' + key + ' += 1');

				// destructuring. TODO non declaration destructuring
				var declarator = this.left.type === 'VariableDeclaration' && this.left.declarations[0];
				if (declarator && declarator.id.type !== 'Identifier') {
					var statementGenerators = [];
					var _ref6 = scope.createIdentifier('ref');
					destructure(code, scope, declarator.id, _ref6, false, statementGenerators);

					var suffix = ';\n' + i1;
					statementGenerators.forEach(function (fn, i) {
						if (i === statementGenerators.length - 1) {
							suffix = ';\n\n' + i1;
						}

						fn(bodyStart, '', suffix);
					});

					code.appendLeft(this.left.start + this.left.kind.length + 1, _ref6);
					code.appendLeft(this.left.end, ' = ' + list + '[' + key + '];\n' + i1);
				} else {
					code.appendLeft(this.left.end, ' = ' + list + '[' + key + '];\n\n' + i1);
				}
			};

			return ForOfStatement;
		}(LoopStatement);

		var FunctionDeclaration = function (_Node$14) {
			inherits(FunctionDeclaration, _Node$14);

			function FunctionDeclaration() {
				classCallCheck(this, FunctionDeclaration);
				return possibleConstructorReturn(this, _Node$14.apply(this, arguments));
			}

			FunctionDeclaration.prototype.initialise = function initialise(transforms) {
				if (this.generator && transforms.generator) {
					throw new CompileError('Generators are not supported', this);
				}

				this.body.createScope();

				if (this.id) {
					this.findScope(true).addDeclaration(this.id, 'function');
				}
				_Node$14.prototype.initialise.call(this, transforms);
			};

			FunctionDeclaration.prototype.transpile = function transpile(code, transforms) {
				_Node$14.prototype.transpile.call(this, code, transforms);
				if (transforms.trailingFunctionCommas && this.params.length) {
					removeTrailingComma(code, this.params[this.params.length - 1].end);
				}
			};

			return FunctionDeclaration;
		}(Node$1);

		var FunctionExpression = function (_Node$15) {
			inherits(FunctionExpression, _Node$15);

			function FunctionExpression() {
				classCallCheck(this, FunctionExpression);
				return possibleConstructorReturn(this, _Node$15.apply(this, arguments));
			}

			FunctionExpression.prototype.initialise = function initialise(transforms) {
				if (this.generator && transforms.generator) {
					throw new CompileError('Generators are not supported', this);
				}

				this.body.createScope();

				if (this.id) {
					// function expression IDs belong to the child scope...
					this.body.scope.addDeclaration(this.id, 'function');
				}

				_Node$15.prototype.initialise.call(this, transforms);

				var parent = this.parent;
				var methodName = void 0;

				if (transforms.conciseMethodProperty && parent.type === 'Property' && parent.kind === 'init' && parent.method && parent.key.type === 'Identifier') {
					// object literal concise method
					methodName = parent.key.name;
				} else if (transforms.classes && parent.type === 'MethodDefinition' && parent.kind === 'method' && parent.key.type === 'Identifier') {
					// method definition in a class
					methodName = parent.key.name;
				} else if (this.id && this.id.type === 'Identifier') {
					// naked function expression
					methodName = this.id.alias || this.id.name;
				}

				if (methodName) {
					for (var i = 0, list = this.params; i < list.length; i += 1) {
						var param = list[i];

						if (param.type === 'Identifier' && methodName === param.name) {
							// workaround for Safari 9/WebKit bug:
							// https://gitlab.com/Rich-Harris/buble/issues/154
							// change parameter name when same as method name

							var scope = this.body.scope;
							var declaration = scope.declarations[methodName];

							var alias = scope.createIdentifier(methodName);
							param.alias = alias;

							for (var i$1 = 0, list$1 = declaration.instances; i$1 < list$1.length; i$1 += 1) {
								var identifier = list$1[i$1];

								identifier.alias = alias;
							}

							break;
						}
					}
				}
			};

			FunctionExpression.prototype.transpile = function transpile(code, transforms) {
				_Node$15.prototype.transpile.call(this, code, transforms);
				if (transforms.trailingFunctionCommas && this.params.length) {
					removeTrailingComma(code, this.params[this.params.length - 1].end);
				}
			};

			return FunctionExpression;
		}(Node$1);

		function isReference(node, parent) {
			if (node.type === 'MemberExpression') {
				return !node.computed && isReference(node.object, node);
			}

			if (node.type === 'Identifier') {
				// the only time we could have an identifier node without a parent is
				// if it's the entire body of a function without a block statement –
				// i.e. an arrow function expression like `a => a`
				if (!parent) return true;

				if (/(Function|Class)Expression/.test(parent.type)) return false;

				if (parent.type === 'VariableDeclarator') return node === parent.init;

				// TODO is this right?
				if (parent.type === 'MemberExpression' || parent.type === 'MethodDefinition') {
					return parent.computed || node === parent.object;
				}

				if (parent.type === 'ArrayPattern') return false;

				// disregard the `bar` in `{ bar: foo }`, but keep it in `{ [bar]: foo }`
				if (parent.type === 'Property') {
					if (parent.parent.type === 'ObjectPattern') return false;
					return parent.computed || node === parent.value;
				}

				// disregard the `bar` in `class Foo { bar () {...} }`
				if (parent.type === 'MethodDefinition') return false;

				// disregard the `bar` in `export { foo as bar }`
				if (parent.type === 'ExportSpecifier' && node !== parent.local) return false;

				return true;
			}
		}

		var Identifier = function (_Node$16) {
			inherits(Identifier, _Node$16);

			function Identifier() {
				classCallCheck(this, Identifier);
				return possibleConstructorReturn(this, _Node$16.apply(this, arguments));
			}

			Identifier.prototype.findScope = function findScope(functionScope) {
				if (this.parent.params && ~this.parent.params.indexOf(this)) {
					return this.parent.body.scope;
				}

				if (this.parent.type === 'FunctionExpression' && this === this.parent.id) {
					return this.parent.body.scope;
				}

				return this.parent.findScope(functionScope);
			};

			Identifier.prototype.initialise = function initialise(transforms) {
				if (transforms.arrow && isReference(this, this.parent)) {
					if (this.name === 'arguments' && !this.findScope(false).contains(this.name)) {
						var lexicalBoundary = this.findLexicalBoundary();
						var arrowFunction = this.findNearest('ArrowFunctionExpression');
						var _loop2 = this.findNearest(loopStatement);

						if (arrowFunction && arrowFunction.depth > lexicalBoundary.depth) {
							this.alias = lexicalBoundary.getArgumentsAlias();
						}

						if (_loop2 && _loop2.body.contains(this) && _loop2.depth > lexicalBoundary.depth) {
							this.alias = lexicalBoundary.getArgumentsAlias();
						}
					}

					this.findScope(false).addReference(this);
				}
			};

			Identifier.prototype.transpile = function transpile(code) {
				if (this.alias) {
					code.overwrite(this.start, this.end, this.alias, {
						storeName: true,
						contentOnly: true
					});
				}
			};

			return Identifier;
		}(Node$1);

		var IfStatement = function (_Node$17) {
			inherits(IfStatement, _Node$17);

			function IfStatement() {
				classCallCheck(this, IfStatement);
				return possibleConstructorReturn(this, _Node$17.apply(this, arguments));
			}

			IfStatement.prototype.initialise = function initialise(transforms) {
				_Node$17.prototype.initialise.call(this, transforms);
			};

			IfStatement.prototype.transpile = function transpile(code, transforms) {
				if (this.consequent.type !== 'BlockStatement' || this.consequent.type === 'BlockStatement' && this.consequent.synthetic) {
					code.appendLeft(this.consequent.start, '{ ');
					code.prependRight(this.consequent.end, ' }');
				}

				if (this.alternate && this.alternate.type !== 'IfStatement' && (this.alternate.type !== 'BlockStatement' || this.alternate.type === 'BlockStatement' && this.alternate.synthetic)) {
					code.appendLeft(this.alternate.start, '{ ');
					code.prependRight(this.alternate.end, ' }');
				}

				_Node$17.prototype.transpile.call(this, code, transforms);
			};

			return IfStatement;
		}(Node$1);

		var ImportDeclaration = function (_Node$18) {
			inherits(ImportDeclaration, _Node$18);

			function ImportDeclaration() {
				classCallCheck(this, ImportDeclaration);
				return possibleConstructorReturn(this, _Node$18.apply(this, arguments));
			}

			ImportDeclaration.prototype.initialise = function initialise(transforms) {
				if (transforms.moduleImport) throw new CompileError('import is not supported', this);
				_Node$18.prototype.initialise.call(this, transforms);
			};

			return ImportDeclaration;
		}(Node$1);

		var ImportDefaultSpecifier = function (_Node$19) {
			inherits(ImportDefaultSpecifier, _Node$19);

			function ImportDefaultSpecifier() {
				classCallCheck(this, ImportDefaultSpecifier);
				return possibleConstructorReturn(this, _Node$19.apply(this, arguments));
			}

			ImportDefaultSpecifier.prototype.initialise = function initialise(transforms) {
				this.findScope(true).addDeclaration(this.local, 'import');
				_Node$19.prototype.initialise.call(this, transforms);
			};

			return ImportDefaultSpecifier;
		}(Node$1);

		var ImportSpecifier = function (_Node$20) {
			inherits(ImportSpecifier, _Node$20);

			function ImportSpecifier() {
				classCallCheck(this, ImportSpecifier);
				return possibleConstructorReturn(this, _Node$20.apply(this, arguments));
			}

			ImportSpecifier.prototype.initialise = function initialise(transforms) {
				this.findScope(true).addDeclaration(this.local, 'import');
				_Node$20.prototype.initialise.call(this, transforms);
			};

			return ImportSpecifier;
		}(Node$1);

		var hasDashes = function hasDashes(val) {
			return (/-/.test(val)
			);
		};

		var formatKey = function formatKey(key) {
			return hasDashes(key) ? '\'' + key + '\'' : key;
		};

		var formatVal = function formatVal(val) {
			return val ? '' : 'true';
		};

		var JSXAttribute = function (_Node$21) {
			inherits(JSXAttribute, _Node$21);

			function JSXAttribute() {
				classCallCheck(this, JSXAttribute);
				return possibleConstructorReturn(this, _Node$21.apply(this, arguments));
			}

			JSXAttribute.prototype.transpile = function transpile(code, transforms) {
				var ref = this.name;
				var start = ref.start;
				var name = ref.name;

				// Overwrite equals sign if value is present.
				var end = this.value ? this.value.start : this.name.end;

				code.overwrite(start, end, formatKey(name) + ': ' + formatVal(this.value));

				_Node$21.prototype.transpile.call(this, code, transforms);
			};

			return JSXAttribute;
		}(Node$1);

		function containsNewLine(node) {
			return node.type === 'Literal' && !/\S/.test(node.value) && /\n/.test(node.value);
		}

		var JSXClosingElement = function (_Node$22) {
			inherits(JSXClosingElement, _Node$22);

			function JSXClosingElement() {
				classCallCheck(this, JSXClosingElement);
				return possibleConstructorReturn(this, _Node$22.apply(this, arguments));
			}

			JSXClosingElement.prototype.transpile = function transpile(code) {
				var spaceBeforeParen = true;

				var lastChild = this.parent.children[this.parent.children.length - 1];

				// omit space before closing paren if
				//   a) this is on a separate line, or
				//   b) there are no children but there are attributes
				if (lastChild && containsNewLine(lastChild) || this.parent.openingElement.attributes.length) {
					spaceBeforeParen = false;
				}

				code.overwrite(this.start, this.end, spaceBeforeParen ? ' )' : ')');
			};

			return JSXClosingElement;
		}(Node$1);

		function normalise(str, removeTrailingWhitespace) {
			if (removeTrailingWhitespace && /\n/.test(str)) {
				str = str.replace(/\s+$/, '');
			}

			str = str.replace(/^\n\r?\s+/, '') // remove leading newline + space
			.replace(/\s*\n\r?\s*/gm, ' '); // replace newlines with spaces

			// TODO prefer single quotes?
			return JSON.stringify(str);
		}

		var JSXElement = function (_Node$23) {
			inherits(JSXElement, _Node$23);

			function JSXElement() {
				classCallCheck(this, JSXElement);
				return possibleConstructorReturn(this, _Node$23.apply(this, arguments));
			}

			JSXElement.prototype.transpile = function transpile(code, transforms) {
				_Node$23.prototype.transpile.call(this, code, transforms);

				var children = this.children.filter(function (child) {
					if (child.type !== 'Literal') return true;

					// remove whitespace-only literals, unless on a single line
					return (/\S/.test(child.raw) || !/\n/.test(child.raw)
					);
				});

				if (children.length) {
					var c = this.openingElement.end;

					var i = void 0;
					for (i = 0; i < children.length; i += 1) {
						var child = children[i];

						if (child.type === 'JSXExpressionContainer' && child.expression.type === 'JSXEmptyExpression') {
							// empty block is a no op
						} else {
							var tail = code.original[c] === '\n' && child.type !== 'Literal' ? '' : ' ';
							code.appendLeft(c, ',' + tail);
						}

						if (child.type === 'Literal') {
							var str = normalise(child.raw, i === children.length - 1);
							code.overwrite(child.start, child.end, str);
						}

						c = child.end;
					}
				}
			};

			return JSXElement;
		}(Node$1);

		var JSXExpressionContainer = function (_Node$24) {
			inherits(JSXExpressionContainer, _Node$24);

			function JSXExpressionContainer() {
				classCallCheck(this, JSXExpressionContainer);
				return possibleConstructorReturn(this, _Node$24.apply(this, arguments));
			}

			JSXExpressionContainer.prototype.transpile = function transpile(code, transforms) {
				code.remove(this.start, this.expression.start);
				code.remove(this.expression.end, this.end);

				_Node$24.prototype.transpile.call(this, code, transforms);
			};

			return JSXExpressionContainer;
		}(Node$1);

		var JSXOpeningElement = function (_Node$25) {
			inherits(JSXOpeningElement, _Node$25);

			function JSXOpeningElement() {
				classCallCheck(this, JSXOpeningElement);
				return possibleConstructorReturn(this, _Node$25.apply(this, arguments));
			}

			JSXOpeningElement.prototype.transpile = function transpile(code, transforms) {
				_Node$25.prototype.transpile.call(this, code, transforms);

				code.overwrite(this.start, this.name.start, this.program.jsx + '( ');

				var html = this.name.type === 'JSXIdentifier' && this.name.name[0] === this.name.name[0].toLowerCase();
				if (html) code.prependRight(this.name.start, '\'');

				var len = this.attributes.length;
				var c = this.name.end;

				if (len) {
					var i = void 0;

					var hasSpread = false;
					for (i = 0; i < len; i += 1) {
						if (this.attributes[i].type === 'JSXSpreadAttribute') {
							hasSpread = true;
							break;
						}
					}

					c = this.attributes[0].end;

					for (i = 0; i < len; i += 1) {
						var attr = this.attributes[i];

						if (i > 0) {
							if (attr.start === c) code.prependRight(c, ', ');else code.overwrite(c, attr.start, ', ');
						}

						if (hasSpread && attr.type !== 'JSXSpreadAttribute') {
							var lastAttr = this.attributes[i - 1];
							var nextAttr = this.attributes[i + 1];

							if (!lastAttr || lastAttr.type === 'JSXSpreadAttribute') {
								code.prependRight(attr.start, '{ ');
							}

							if (!nextAttr || nextAttr.type === 'JSXSpreadAttribute') {
								code.appendLeft(attr.end, ' }');
							}
						}

						c = attr.end;
					}

					var after = void 0;
					var before = void 0;
					if (hasSpread) {
						if (len === 1) {
							before = html ? '\',' : ',';
						} else {
							if (!this.program.options.objectAssign) {
								throw new CompileError("Mixed JSX attributes ending in spread requires specified objectAssign option with 'Object.assign' or polyfill helper.", this);
							}
							before = html ? '\', ' + this.program.options.objectAssign + '({},' : ', ' + this.program.options.objectAssign + '({},';
							after = ')';
						}
					} else {
						before = html ? '\', {' : ', {';
						after = ' }';
					}

					code.prependRight(this.name.end, before);

					if (after) {
						code.appendLeft(this.attributes[len - 1].end, after);
					}
				} else {
					code.appendLeft(this.name.end, html ? '\', null' : ', null');
					c = this.name.end;
				}

				if (this.selfClosing) {
					code.overwrite(c, this.end, this.attributes.length ? ')' : ' )');
				} else {
					code.remove(c, this.end);
				}
			};

			return JSXOpeningElement;
		}(Node$1);

		var JSXSpreadAttribute = function (_Node$26) {
			inherits(JSXSpreadAttribute, _Node$26);

			function JSXSpreadAttribute() {
				classCallCheck(this, JSXSpreadAttribute);
				return possibleConstructorReturn(this, _Node$26.apply(this, arguments));
			}

			JSXSpreadAttribute.prototype.transpile = function transpile(code, transforms) {
				code.remove(this.start, this.argument.start);
				code.remove(this.argument.end, this.end);

				_Node$26.prototype.transpile.call(this, code, transforms);
			};

			return JSXSpreadAttribute;
		}(Node$1);

		var commonjsGlobal$$1 = typeof window !== 'undefined' ? window : typeof commonjsGlobal !== 'undefined' ? commonjsGlobal : typeof self !== 'undefined' ? self : {};

		function commonjsRequire$$1() {
			throw new Error('Dynamic requires are not currently supported by rollup-plugin-commonjs');
		}

		function createCommonjsModule$$1(fn, module) {
			return module = { exports: {} }, fn(module, module.exports), module.exports;
		}

		var regjsgen = createCommonjsModule$$1(function (module, exports) {
			/*!
    * regjsgen 0.3.0
    * Copyright 2014-2016 Benjamin Tan <https://demoneaux.github.io/>
    * Available under MIT license <https://github.com/demoneaux/regjsgen/blob/master/LICENSE>
    */
			(function () {
				var objectTypes = {
					'function': true,
					'object': true
				};

				// Used as a reference to the global object.
				var root = objectTypes[typeof window === 'undefined' ? 'undefined' : _typeof(window)] && window || this;

				// Detect free variable `exports`.
				var freeExports = objectTypes['object'] && exports;

				// Detect free variable `module`.
				var freeModule = objectTypes['object'] && module && !module.nodeType && module;

				// Detect free variable `global` from Node.js or Browserified code and use it as `root`.
				var freeGlobal = freeExports && freeModule && (typeof commonjsGlobal$$1 === 'undefined' ? 'undefined' : _typeof(commonjsGlobal$$1)) == 'object' && commonjsGlobal$$1;
				if (freeGlobal && (freeGlobal.global === freeGlobal || freeGlobal.window === freeGlobal || freeGlobal.self === freeGlobal)) {
					root = freeGlobal;
				}

				// Used to check objects for own properties.
				var hasOwnProperty = Object.prototype.hasOwnProperty;

				/*--------------------------------------------------------------------------*/

				// Generates strings based on the given code points.
				// Based on https://mths.be/fromcodepoint v0.2.0 by @mathias.
				var stringFromCharCode = String.fromCharCode;
				var floor = Math.floor;
				function fromCodePoint() {
					var MAX_SIZE = 0x4000;
					var codeUnits = [];
					var highSurrogate;
					var lowSurrogate;
					var index = -1;
					var length = arguments.length;
					if (!length) {
						return '';
					}
					var result = '';
					while (++index < length) {
						var codePoint = Number(arguments[index]);
						if (!isFinite(codePoint) || // `NaN`, `+Infinity`, or `-Infinity`
						codePoint < 0 || // not a valid Unicode code point
						codePoint > 0x10FFFF || // not a valid Unicode code point
						floor(codePoint) != codePoint // not an integer
						) {
								throw RangeError('Invalid code point: ' + codePoint);
							}
						if (codePoint <= 0xFFFF) {
							// BMP code point
							codeUnits.push(codePoint);
						} else {
							// Astral code point; split in surrogate halves
							// http://mathiasbynens.be/notes/javascript-encoding#surrogate-formulae
							codePoint -= 0x10000;
							highSurrogate = (codePoint >> 10) + 0xD800;
							lowSurrogate = codePoint % 0x400 + 0xDC00;
							codeUnits.push(highSurrogate, lowSurrogate);
						}
						if (index + 1 == length || codeUnits.length > MAX_SIZE) {
							result += stringFromCharCode.apply(null, codeUnits);
							codeUnits.length = 0;
						}
					}
					return result;
				}

				/*--------------------------------------------------------------------------*/

				// Ensures that nodes have the correct types.
				var assertTypeRegexMap = {};
				function assertType(type, expected) {
					if (expected.indexOf('|') == -1) {
						if (type == expected) {
							return;
						}

						throw Error('Invalid node type: ' + type + '; expected type: ' + expected);
					}

					expected = hasOwnProperty.call(assertTypeRegexMap, expected) ? assertTypeRegexMap[expected] : assertTypeRegexMap[expected] = RegExp('^(?:' + expected + ')$');

					if (expected.test(type)) {
						return;
					}

					throw Error('Invalid node type: ' + type + '; expected types: ' + expected);
				}

				/*--------------------------------------------------------------------------*/

				// Generates a regular expression string based on an AST.
				function generate(node) {
					var type = node.type;

					if (hasOwnProperty.call(generators, type)) {
						return generators[type](node);
					}

					throw Error('Invalid node type: ' + type);
				}

				/*--------------------------------------------------------------------------*/

				function generateAlternative(node) {
					assertType(node.type, 'alternative');

					var terms = node.body,
					    i = -1,
					    length = terms.length,
					    result = '';

					while (++i < length) {
						result += generateTerm(terms[i]);
					}

					return result;
				}

				function generateAnchor(node) {
					assertType(node.type, 'anchor');

					switch (node.kind) {
						case 'start':
							return '^';
						case 'end':
							return '$';
						case 'boundary':
							return '\\b';
						case 'not-boundary':
							return '\\B';
						default:
							throw Error('Invalid assertion');
					}
				}

				function generateAtom(node) {
					assertType(node.type, 'anchor|characterClass|characterClassEscape|dot|group|reference|value');

					return generate(node);
				}

				function generateCharacterClass(node) {
					assertType(node.type, 'characterClass');

					var classRanges = node.body,
					    i = -1,
					    length = classRanges.length,
					    result = '';

					if (node.negative) {
						result += '^';
					}

					while (++i < length) {
						result += generateClassAtom(classRanges[i]);
					}

					return '[' + result + ']';
				}

				function generateCharacterClassEscape(node) {
					assertType(node.type, 'characterClassEscape');

					return '\\' + node.value;
				}

				function generateUnicodePropertyEscape(node) {
					assertType(node.type, 'unicodePropertyEscape');

					return '\\' + (node.negative ? 'P' : 'p') + '{' + node.value + '}';
				}

				function generateCharacterClassRange(node) {
					assertType(node.type, 'characterClassRange');

					var min = node.min,
					    max = node.max;

					if (min.type == 'characterClassRange' || max.type == 'characterClassRange') {
						throw Error('Invalid character class range');
					}

					return generateClassAtom(min) + '-' + generateClassAtom(max);
				}

				function generateClassAtom(node) {
					assertType(node.type, 'anchor|characterClassEscape|characterClassRange|dot|value');

					return generate(node);
				}

				function generateDisjunction(node) {
					assertType(node.type, 'disjunction');

					var body = node.body,
					    i = -1,
					    length = body.length,
					    result = '';

					while (++i < length) {
						if (i != 0) {
							result += '|';
						}
						result += generate(body[i]);
					}

					return result;
				}

				function generateDot(node) {
					assertType(node.type, 'dot');

					return '.';
				}

				function generateGroup(node) {
					assertType(node.type, 'group');

					var result = '';

					switch (node.behavior) {
						case 'normal':
							break;
						case 'ignore':
							result += '?:';
							break;
						case 'lookahead':
							result += '?=';
							break;
						case 'negativeLookahead':
							result += '?!';
							break;
						default:
							throw Error('Invalid behaviour: ' + node.behaviour);
					}

					var body = node.body,
					    i = -1,
					    length = body.length;

					while (++i < length) {
						result += generate(body[i]);
					}

					return '(' + result + ')';
				}

				function generateQuantifier(node) {
					assertType(node.type, 'quantifier');

					var quantifier = '',
					    min = node.min,
					    max = node.max;

					if (max == null) {
						if (min == 0) {
							quantifier = '*';
						} else if (min == 1) {
							quantifier = '+';
						} else {
							quantifier = '{' + min + ',}';
						}
					} else if (min == max) {
						quantifier = '{' + min + '}';
					} else if (min == 0 && max == 1) {
						quantifier = '?';
					} else {
						quantifier = '{' + min + ',' + max + '}';
					}

					if (!node.greedy) {
						quantifier += '?';
					}

					return generateAtom(node.body[0]) + quantifier;
				}

				function generateReference(node) {
					assertType(node.type, 'reference');

					return '\\' + node.matchIndex;
				}

				function generateTerm(node) {
					assertType(node.type, 'anchor|characterClass|characterClassEscape|empty|group|quantifier|reference|unicodePropertyEscape|value');

					return generate(node);
				}

				function generateValue(node) {
					assertType(node.type, 'value');

					var kind = node.kind,
					    codePoint = node.codePoint;

					switch (kind) {
						case 'controlLetter':
							return '\\c' + fromCodePoint(codePoint + 64);
						case 'hexadecimalEscape':
							return '\\x' + ('00' + codePoint.toString(16).toUpperCase()).slice(-2);
						case 'identifier':
							return '\\' + fromCodePoint(codePoint);
						case 'null':
							return '\\' + codePoint;
						case 'octal':
							return '\\' + codePoint.toString(8);
						case 'singleEscape':
							switch (codePoint) {
								case 0x0008:
									return '\\b';
								case 0x0009:
									return '\\t';
								case 0x000A:
									return '\\n';
								case 0x000B:
									return '\\v';
								case 0x000C:
									return '\\f';
								case 0x000D:
									return '\\r';
								default:
									throw Error('Invalid codepoint: ' + codePoint);
							}
						case 'symbol':
							return fromCodePoint(codePoint);
						case 'unicodeEscape':
							return '\\u' + ('0000' + codePoint.toString(16).toUpperCase()).slice(-4);
						case 'unicodeCodePointEscape':
							return '\\u{' + codePoint.toString(16).toUpperCase() + '}';
						default:
							throw Error('Unsupported node kind: ' + kind);
					}
				}

				/*--------------------------------------------------------------------------*/

				// Used to generate strings for each node type.
				var generators = {
					'alternative': generateAlternative,
					'anchor': generateAnchor,
					'characterClass': generateCharacterClass,
					'characterClassEscape': generateCharacterClassEscape,
					'characterClassRange': generateCharacterClassRange,
					'unicodePropertyEscape': generateUnicodePropertyEscape,
					'disjunction': generateDisjunction,
					'dot': generateDot,
					'group': generateGroup,
					'quantifier': generateQuantifier,
					'reference': generateReference,
					'value': generateValue
				};

				/*--------------------------------------------------------------------------*/

				// Export regjsgen.
				// Some AMD build optimizers, like r.js, check for condition patterns like the following:
				if (typeof undefined == 'function' && _typeof(undefined.amd) == 'object' && undefined.amd) {
					// Define as an anonymous module so it can be aliased through path mapping.
					undefined(function () {
						return {
							'generate': generate
						};
					});
				}
				// Check for `exports` after `define` in case a build optimizer adds an `exports` object.
				else if (freeExports && freeModule) {
						// Export for CommonJS support.
						freeExports.generate = generate;
					} else {
						// Export to the global object.
						root.regjsgen = {
							'generate': generate
						};
					}
			}).call(commonjsGlobal$$1);
		});

		var parser = createCommonjsModule$$1(function (module) {
			// regjsparser
			//
			// ==================================================================
			//
			// See ECMA-262 Standard: 15.10.1
			//
			// NOTE: The ECMA-262 standard uses the term "Assertion" for /^/. Here the
			//   term "Anchor" is used.
			//
			// Pattern ::
			//      Disjunction
			//
			// Disjunction ::
			//      Alternative
			//      Alternative | Disjunction
			//
			// Alternative ::
			//      [empty]
			//      Alternative Term
			//
			// Term ::
			//      Anchor
			//      Atom
			//      Atom Quantifier
			//
			// Anchor ::
			//      ^
			//      $
			//      \ b
			//      \ B
			//      ( ? = Disjunction )
			//      ( ? ! Disjunction )
			//
			// Quantifier ::
			//      QuantifierPrefix
			//      QuantifierPrefix ?
			//
			// QuantifierPrefix ::
			//      *
			//      +
			//      ?
			//      { DecimalDigits }
			//      { DecimalDigits , }
			//      { DecimalDigits , DecimalDigits }
			//
			// Atom ::
			//      PatternCharacter
			//      .
			//      \ AtomEscape
			//      CharacterClass
			//      ( Disjunction )
			//      ( ? : Disjunction )
			//
			// PatternCharacter ::
			//      SourceCharacter but not any of: ^ $ \ . * + ? ( ) [ ] { } |
			//
			// AtomEscape ::
			//      DecimalEscape
			//      CharacterEscape
			//      CharacterClassEscape
			//
			// CharacterEscape[U] ::
			//      ControlEscape
			//      c ControlLetter
			//      HexEscapeSequence
			//      RegExpUnicodeEscapeSequence[?U] (ES6)
			//      IdentityEscape[?U]
			//
			// ControlEscape ::
			//      one of f n r t v
			// ControlLetter ::
			//      one of
			//          a b c d e f g h i j k l m n o p q r s t u v w x y z
			//          A B C D E F G H I J K L M N O P Q R S T U V W X Y Z
			//
			// IdentityEscape ::
			//      SourceCharacter but not IdentifierPart
			//      <ZWJ>
			//      <ZWNJ>
			//
			// DecimalEscape ::
			//      DecimalIntegerLiteral [lookahead ∉ DecimalDigit]
			//
			// CharacterClassEscape ::
			//      one of d D s S w W
			//
			// CharacterClass ::
			//      [ [lookahead ∉ {^}] ClassRanges ]
			//      [ ^ ClassRanges ]
			//
			// ClassRanges ::
			//      [empty]
			//      NonemptyClassRanges
			//
			// NonemptyClassRanges ::
			//      ClassAtom
			//      ClassAtom NonemptyClassRangesNoDash
			//      ClassAtom - ClassAtom ClassRanges
			//
			// NonemptyClassRangesNoDash ::
			//      ClassAtom
			//      ClassAtomNoDash NonemptyClassRangesNoDash
			//      ClassAtomNoDash - ClassAtom ClassRanges
			//
			// ClassAtom ::
			//      -
			//      ClassAtomNoDash
			//
			// ClassAtomNoDash ::
			//      SourceCharacter but not one of \ or ] or -
			//      \ ClassEscape
			//
			// ClassEscape ::
			//      DecimalEscape
			//      b
			//      CharacterEscape
			//      CharacterClassEscape

			(function () {

				function parse(str, flags, features) {
					if (!features) {
						features = {};
					}
					function addRaw(node) {
						node.raw = str.substring(node.range[0], node.range[1]);
						return node;
					}

					function updateRawStart(node, start) {
						node.range[0] = start;
						return addRaw(node);
					}

					function createAnchor(kind, rawLength) {
						return addRaw({
							type: 'anchor',
							kind: kind,
							range: [pos - rawLength, pos]
						});
					}

					function createValue(kind, codePoint, from, to) {
						return addRaw({
							type: 'value',
							kind: kind,
							codePoint: codePoint,
							range: [from, to]
						});
					}

					function createEscaped(kind, codePoint, value, fromOffset) {
						fromOffset = fromOffset || 0;
						return createValue(kind, codePoint, pos - (value.length + fromOffset), pos);
					}

					function createCharacter(matches) {
						var _char = matches[0];
						var first = _char.charCodeAt(0);
						if (hasUnicodeFlag) {
							var second;
							if (_char.length === 1 && first >= 0xD800 && first <= 0xDBFF) {
								second = lookahead().charCodeAt(0);
								if (second >= 0xDC00 && second <= 0xDFFF) {
									// Unicode surrogate pair
									pos++;
									return createValue('symbol', (first - 0xD800) * 0x400 + second - 0xDC00 + 0x10000, pos - 2, pos);
								}
							}
						}
						return createValue('symbol', first, pos - 1, pos);
					}

					function createDisjunction(alternatives, from, to) {
						return addRaw({
							type: 'disjunction',
							body: alternatives,
							range: [from, to]
						});
					}

					function createDot() {
						return addRaw({
							type: 'dot',
							range: [pos - 1, pos]
						});
					}

					function createCharacterClassEscape(value) {
						return addRaw({
							type: 'characterClassEscape',
							value: value,
							range: [pos - 2, pos]
						});
					}

					function createReference(matchIndex) {
						return addRaw({
							type: 'reference',
							matchIndex: parseInt(matchIndex, 10),
							range: [pos - 1 - matchIndex.length, pos]
						});
					}

					function createGroup(behavior, disjunction, from, to) {
						return addRaw({
							type: 'group',
							behavior: behavior,
							body: disjunction,
							range: [from, to]
						});
					}

					function createQuantifier(min, max, from, to) {
						if (to == null) {
							from = pos - 1;
							to = pos;
						}

						return addRaw({
							type: 'quantifier',
							min: min,
							max: max,
							greedy: true,
							body: null, // set later on
							range: [from, to]
						});
					}

					function createAlternative(terms, from, to) {
						return addRaw({
							type: 'alternative',
							body: terms,
							range: [from, to]
						});
					}

					function createCharacterClass(classRanges, negative, from, to) {
						return addRaw({
							type: 'characterClass',
							body: classRanges,
							negative: negative,
							range: [from, to]
						});
					}

					function createClassRange(min, max, from, to) {
						// See 15.10.2.15:
						if (min.codePoint > max.codePoint) {
							bail('invalid range in character class', min.raw + '-' + max.raw, from, to);
						}

						return addRaw({
							type: 'characterClassRange',
							min: min,
							max: max,
							range: [from, to]
						});
					}

					function flattenBody(body) {
						if (body.type === 'alternative') {
							return body.body;
						} else {
							return [body];
						}
					}

					function incr(amount) {
						amount = amount || 1;
						var res = str.substring(pos, pos + amount);
						pos += amount || 1;
						return res;
					}

					function skip(value) {
						if (!match(value)) {
							bail('character', value);
						}
					}

					function match(value) {
						if (str.indexOf(value, pos) === pos) {
							return incr(value.length);
						}
					}

					function lookahead() {
						return str[pos];
					}

					function current(value) {
						return str.indexOf(value, pos) === pos;
					}

					function next(value) {
						return str[pos + 1] === value;
					}

					function matchReg(regExp) {
						var subStr = str.substring(pos);
						var res = subStr.match(regExp);
						if (res) {
							res.range = [];
							res.range[0] = pos;
							incr(res[0].length);
							res.range[1] = pos;
						}
						return res;
					}

					function parseDisjunction() {
						// Disjunction ::
						//      Alternative
						//      Alternative | Disjunction
						var res = [],
						    from = pos;
						res.push(parseAlternative());

						while (match('|')) {
							res.push(parseAlternative());
						}

						if (res.length === 1) {
							return res[0];
						}

						return createDisjunction(res, from, pos);
					}

					function parseAlternative() {
						var res = [],
						    from = pos;
						var term;

						// Alternative ::
						//      [empty]
						//      Alternative Term
						while (term = parseTerm()) {
							res.push(term);
						}

						if (res.length === 1) {
							return res[0];
						}

						return createAlternative(res, from, pos);
					}

					function parseTerm() {
						// Term ::
						//      Anchor
						//      Atom
						//      Atom Quantifier

						if (pos >= str.length || current('|') || current(')')) {
							return null; /* Means: The term is empty */
						}

						var anchor = parseAnchor();

						if (anchor) {
							return anchor;
						}

						var atom = parseAtom();
						if (!atom) {
							bail('Expected atom');
						}
						var quantifier = parseQuantifier() || false;
						if (quantifier) {
							quantifier.body = flattenBody(atom);
							// The quantifier contains the atom. Therefore, the beginning of the
							// quantifier range is given by the beginning of the atom.
							updateRawStart(quantifier, atom.range[0]);
							return quantifier;
						}
						return atom;
					}

					function parseGroup(matchA, typeA, matchB, typeB) {
						var type = null,
						    from = pos;

						if (match(matchA)) {
							type = typeA;
						} else if (match(matchB)) {
							type = typeB;
						} else {
							return false;
						}

						var body = parseDisjunction();
						if (!body) {
							bail('Expected disjunction');
						}
						skip(')');
						var group = createGroup(type, flattenBody(body), from, pos);

						if (type == 'normal') {
							// Keep track of the number of closed groups. This is required for
							// parseDecimalEscape(). In case the string is parsed a second time the
							// value already holds the total count and no incrementation is required.
							if (firstIteration) {
								closedCaptureCounter++;
							}
						}
						return group;
					}

					function parseAnchor() {
						// Anchor ::
						//      ^
						//      $
						//      \ b
						//      \ B
						//      ( ? = Disjunction )
						//      ( ? ! Disjunction )
						if (match('^')) {
							return createAnchor('start', 1 /* rawLength */);
						} else if (match('$')) {
							return createAnchor('end', 1 /* rawLength */);
						} else if (match('\\b')) {
							return createAnchor('boundary', 2 /* rawLength */);
						} else if (match('\\B')) {
							return createAnchor('not-boundary', 2 /* rawLength */);
						} else {
							return parseGroup('(?=', 'lookahead', '(?!', 'negativeLookahead');
						}
					}

					function parseQuantifier() {
						// Quantifier ::
						//      QuantifierPrefix
						//      QuantifierPrefix ?
						//
						// QuantifierPrefix ::
						//      *
						//      +
						//      ?
						//      { DecimalDigits }
						//      { DecimalDigits , }
						//      { DecimalDigits , DecimalDigits }

						var res,
						    from = pos;
						var quantifier;
						var min, max;

						if (match('*')) {
							quantifier = createQuantifier(0);
						} else if (match('+')) {
							quantifier = createQuantifier(1);
						} else if (match('?')) {
							quantifier = createQuantifier(0, 1);
						} else if (res = matchReg(/^\{([0-9]+)\}/)) {
							min = parseInt(res[1], 10);
							quantifier = createQuantifier(min, min, res.range[0], res.range[1]);
						} else if (res = matchReg(/^\{([0-9]+),\}/)) {
							min = parseInt(res[1], 10);
							quantifier = createQuantifier(min, undefined, res.range[0], res.range[1]);
						} else if (res = matchReg(/^\{([0-9]+),([0-9]+)\}/)) {
							min = parseInt(res[1], 10);
							max = parseInt(res[2], 10);
							if (min > max) {
								bail('numbers out of order in {} quantifier', '', from, pos);
							}
							quantifier = createQuantifier(min, max, res.range[0], res.range[1]);
						}

						if (quantifier) {
							if (match('?')) {
								quantifier.greedy = false;
								quantifier.range[1] += 1;
							}
						}

						return quantifier;
					}

					function parseAtom() {
						// Atom ::
						//      PatternCharacter
						//      .
						//      \ AtomEscape
						//      CharacterClass
						//      ( Disjunction )
						//      ( ? : Disjunction )

						var res;

						// jviereck: allow ']', '}' here as well to be compatible with browser's
						//   implementations: ']'.match(/]/);
						// if (res = matchReg(/^[^^$\\.*+?()[\]{}|]/)) {
						if (res = matchReg(/^[^^$\\.*+?(){[|]/)) {
							//      PatternCharacter
							return createCharacter(res);
						} else if (match('.')) {
							//      .
							return createDot();
						} else if (match('\\')) {
							//      \ AtomEscape
							res = parseAtomEscape();
							if (!res) {
								bail('atomEscape');
							}
							return res;
						} else if (res = parseCharacterClass()) {
							return res;
						} else {
							//      ( Disjunction )
							//      ( ? : Disjunction )
							return parseGroup('(?:', 'ignore', '(', 'normal');
						}
					}

					function parseUnicodeSurrogatePairEscape(firstEscape) {
						if (hasUnicodeFlag) {
							var first, second;
							if (firstEscape.kind == 'unicodeEscape' && (first = firstEscape.codePoint) >= 0xD800 && first <= 0xDBFF && current('\\') && next('u')) {
								var prevPos = pos;
								pos++;
								var secondEscape = parseClassEscape();
								if (secondEscape.kind == 'unicodeEscape' && (second = secondEscape.codePoint) >= 0xDC00 && second <= 0xDFFF) {
									// Unicode surrogate pair
									firstEscape.range[1] = secondEscape.range[1];
									firstEscape.codePoint = (first - 0xD800) * 0x400 + second - 0xDC00 + 0x10000;
									firstEscape.type = 'value';
									firstEscape.kind = 'unicodeCodePointEscape';
									addRaw(firstEscape);
								} else {
									pos = prevPos;
								}
							}
						}
						return firstEscape;
					}

					function parseClassEscape() {
						return parseAtomEscape(true);
					}

					function parseAtomEscape(insideCharacterClass) {
						// AtomEscape ::
						//      DecimalEscape
						//      CharacterEscape
						//      CharacterClassEscape

						var res,
						    from = pos;

						res = parseDecimalEscape();
						if (res) {
							return res;
						}

						// For ClassEscape
						if (insideCharacterClass) {
							if (match('b')) {
								// 15.10.2.19
								// The production ClassEscape :: b evaluates by returning the
								// CharSet containing the one character <BS> (Unicode value 0008).
								return createEscaped('singleEscape', 0x0008, '\\b');
							} else if (match('B')) {
								bail('\\B not possible inside of CharacterClass', '', from);
							}
						}

						res = parseCharacterEscape();

						return res;
					}

					function parseDecimalEscape() {
						// DecimalEscape ::
						//      DecimalIntegerLiteral [lookahead ∉ DecimalDigit]
						//      CharacterClassEscape :: one of d D s S w W

						var res, match;

						if (res = matchReg(/^(?!0)\d+/)) {
							match = res[0];
							var refIdx = parseInt(res[0], 10);
							if (refIdx <= closedCaptureCounter) {
								// If the number is smaller than the normal-groups found so
								// far, then it is a reference...
								return createReference(res[0]);
							} else {
								// ... otherwise it needs to be interpreted as a octal (if the
								// number is in an octal format). If it is NOT octal format,
								// then the slash is ignored and the number is matched later
								// as normal characters.

								// Recall the negative decision to decide if the input must be parsed
								// a second time with the total normal-groups.
								backrefDenied.push(refIdx);

								// Reset the position again, as maybe only parts of the previous
								// matched numbers are actual octal numbers. E.g. in '019' only
								// the '01' should be matched.
								incr(-res[0].length);
								if (res = matchReg(/^[0-7]{1,3}/)) {
									return createEscaped('octal', parseInt(res[0], 8), res[0], 1);
								} else {
									// If we end up here, we have a case like /\91/. Then the
									// first slash is to be ignored and the 9 & 1 to be treated
									// like ordinary characters. Create a character for the
									// first number only here - other number-characters
									// (if available) will be matched later.
									res = createCharacter(matchReg(/^[89]/));
									return updateRawStart(res, res.range[0] - 1);
								}
							}
						}
						// Only allow octal numbers in the following. All matched numbers start
						// with a zero (if the do not, the previous if-branch is executed).
						// If the number is not octal format and starts with zero (e.g. `091`)
						// then only the zeros `0` is treated here and the `91` are ordinary
						// characters.
						// Example:
						//   /\091/.exec('\091')[0].length === 3
						else if (res = matchReg(/^[0-7]{1,3}/)) {
								match = res[0];
								if (/^0{1,3}$/.test(match)) {
									// If they are all zeros, then only take the first one.
									return createEscaped('null', 0x0000, '0', match.length + 1);
								} else {
									return createEscaped('octal', parseInt(match, 8), match, 1);
								}
							} else if (res = matchReg(/^[dDsSwW]/)) {
								return createCharacterClassEscape(res[0]);
							}
						return false;
					}

					function parseCharacterEscape() {
						// CharacterEscape ::
						//      ControlEscape
						//      c ControlLetter
						//      HexEscapeSequence
						//      UnicodeEscapeSequence
						//      IdentityEscape

						var res;
						if (res = matchReg(/^[fnrtv]/)) {
							// ControlEscape
							var codePoint = 0;
							switch (res[0]) {
								case 't':
									codePoint = 0x009;break;
								case 'n':
									codePoint = 0x00A;break;
								case 'v':
									codePoint = 0x00B;break;
								case 'f':
									codePoint = 0x00C;break;
								case 'r':
									codePoint = 0x00D;break;
							}
							return createEscaped('singleEscape', codePoint, '\\' + res[0]);
						} else if (res = matchReg(/^c([a-zA-Z])/)) {
							// c ControlLetter
							return createEscaped('controlLetter', res[1].charCodeAt(0) % 32, res[1], 2);
						} else if (res = matchReg(/^x([0-9a-fA-F]{2})/)) {
							// HexEscapeSequence
							return createEscaped('hexadecimalEscape', parseInt(res[1], 16), res[1], 2);
						} else if (res = matchReg(/^u([0-9a-fA-F]{4})/)) {
							// UnicodeEscapeSequence
							return parseUnicodeSurrogatePairEscape(createEscaped('unicodeEscape', parseInt(res[1], 16), res[1], 2));
						} else if (hasUnicodeFlag && (res = matchReg(/^u\{([0-9a-fA-F]+)\}/))) {
							// RegExpUnicodeEscapeSequence (ES6 Unicode code point escape)
							return createEscaped('unicodeCodePointEscape', parseInt(res[1], 16), res[1], 4);
						} else if (features.unicodePropertyEscape && hasUnicodeFlag && (res = matchReg(/^([pP])\{([^\}]+)\}/))) {
							// https://github.com/jviereck/regjsparser/issues/77
							return addRaw({
								type: 'unicodePropertyEscape',
								negative: res[1] === 'P',
								value: res[2],
								range: [res.range[0] - 1, res.range[1]],
								raw: res[0]
							});
						} else {
							// IdentityEscape
							return parseIdentityEscape();
						}
					}

					// Taken from the Esprima parser.
					function isIdentifierPart(ch) {
						// Generated by `tools/generate-identifier-regex.js`.
						var NonAsciiIdentifierPart = new RegExp('[\xAA\xB5\xBA\xC0-\xD6\xD8-\xF6\xF8-\u02C1\u02C6-\u02D1\u02E0-\u02E4\u02EC\u02EE\u0300-\u0374\u0376\u0377\u037A-\u037D\u037F\u0386\u0388-\u038A\u038C\u038E-\u03A1\u03A3-\u03F5\u03F7-\u0481\u0483-\u0487\u048A-\u052F\u0531-\u0556\u0559\u0561-\u0587\u0591-\u05BD\u05BF\u05C1\u05C2\u05C4\u05C5\u05C7\u05D0-\u05EA\u05F0-\u05F2\u0610-\u061A\u0620-\u0669\u066E-\u06D3\u06D5-\u06DC\u06DF-\u06E8\u06EA-\u06FC\u06FF\u0710-\u074A\u074D-\u07B1\u07C0-\u07F5\u07FA\u0800-\u082D\u0840-\u085B\u08A0-\u08B2\u08E4-\u0963\u0966-\u096F\u0971-\u0983\u0985-\u098C\u098F\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09BC-\u09C4\u09C7\u09C8\u09CB-\u09CE\u09D7\u09DC\u09DD\u09DF-\u09E3\u09E6-\u09F1\u0A01-\u0A03\u0A05-\u0A0A\u0A0F\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32\u0A33\u0A35\u0A36\u0A38\u0A39\u0A3C\u0A3E-\u0A42\u0A47\u0A48\u0A4B-\u0A4D\u0A51\u0A59-\u0A5C\u0A5E\u0A66-\u0A75\u0A81-\u0A83\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0\u0AB2\u0AB3\u0AB5-\u0AB9\u0ABC-\u0AC5\u0AC7-\u0AC9\u0ACB-\u0ACD\u0AD0\u0AE0-\u0AE3\u0AE6-\u0AEF\u0B01-\u0B03\u0B05-\u0B0C\u0B0F\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32\u0B33\u0B35-\u0B39\u0B3C-\u0B44\u0B47\u0B48\u0B4B-\u0B4D\u0B56\u0B57\u0B5C\u0B5D\u0B5F-\u0B63\u0B66-\u0B6F\u0B71\u0B82\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99\u0B9A\u0B9C\u0B9E\u0B9F\u0BA3\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BBE-\u0BC2\u0BC6-\u0BC8\u0BCA-\u0BCD\u0BD0\u0BD7\u0BE6-\u0BEF\u0C00-\u0C03\u0C05-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C39\u0C3D-\u0C44\u0C46-\u0C48\u0C4A-\u0C4D\u0C55\u0C56\u0C58\u0C59\u0C60-\u0C63\u0C66-\u0C6F\u0C81-\u0C83\u0C85-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CBC-\u0CC4\u0CC6-\u0CC8\u0CCA-\u0CCD\u0CD5\u0CD6\u0CDE\u0CE0-\u0CE3\u0CE6-\u0CEF\u0CF1\u0CF2\u0D01-\u0D03\u0D05-\u0D0C\u0D0E-\u0D10\u0D12-\u0D3A\u0D3D-\u0D44\u0D46-\u0D48\u0D4A-\u0D4E\u0D57\u0D60-\u0D63\u0D66-\u0D6F\u0D7A-\u0D7F\u0D82\u0D83\u0D85-\u0D96\u0D9A-\u0DB1\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0DCA\u0DCF-\u0DD4\u0DD6\u0DD8-\u0DDF\u0DE6-\u0DEF\u0DF2\u0DF3\u0E01-\u0E3A\u0E40-\u0E4E\u0E50-\u0E59\u0E81\u0E82\u0E84\u0E87\u0E88\u0E8A\u0E8D\u0E94-\u0E97\u0E99-\u0E9F\u0EA1-\u0EA3\u0EA5\u0EA7\u0EAA\u0EAB\u0EAD-\u0EB9\u0EBB-\u0EBD\u0EC0-\u0EC4\u0EC6\u0EC8-\u0ECD\u0ED0-\u0ED9\u0EDC-\u0EDF\u0F00\u0F18\u0F19\u0F20-\u0F29\u0F35\u0F37\u0F39\u0F3E-\u0F47\u0F49-\u0F6C\u0F71-\u0F84\u0F86-\u0F97\u0F99-\u0FBC\u0FC6\u1000-\u1049\u1050-\u109D\u10A0-\u10C5\u10C7\u10CD\u10D0-\u10FA\u10FC-\u1248\u124A-\u124D\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288\u128A-\u128D\u1290-\u12B0\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12D6\u12D8-\u1310\u1312-\u1315\u1318-\u135A\u135D-\u135F\u1380-\u138F\u13A0-\u13F4\u1401-\u166C\u166F-\u167F\u1681-\u169A\u16A0-\u16EA\u16EE-\u16F8\u1700-\u170C\u170E-\u1714\u1720-\u1734\u1740-\u1753\u1760-\u176C\u176E-\u1770\u1772\u1773\u1780-\u17D3\u17D7\u17DC\u17DD\u17E0-\u17E9\u180B-\u180D\u1810-\u1819\u1820-\u1877\u1880-\u18AA\u18B0-\u18F5\u1900-\u191E\u1920-\u192B\u1930-\u193B\u1946-\u196D\u1970-\u1974\u1980-\u19AB\u19B0-\u19C9\u19D0-\u19D9\u1A00-\u1A1B\u1A20-\u1A5E\u1A60-\u1A7C\u1A7F-\u1A89\u1A90-\u1A99\u1AA7\u1AB0-\u1ABD\u1B00-\u1B4B\u1B50-\u1B59\u1B6B-\u1B73\u1B80-\u1BF3\u1C00-\u1C37\u1C40-\u1C49\u1C4D-\u1C7D\u1CD0-\u1CD2\u1CD4-\u1CF6\u1CF8\u1CF9\u1D00-\u1DF5\u1DFC-\u1F15\u1F18-\u1F1D\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D\u1F80-\u1FB4\u1FB6-\u1FBC\u1FBE\u1FC2-\u1FC4\u1FC6-\u1FCC\u1FD0-\u1FD3\u1FD6-\u1FDB\u1FE0-\u1FEC\u1FF2-\u1FF4\u1FF6-\u1FFC\u200C\u200D\u203F\u2040\u2054\u2071\u207F\u2090-\u209C\u20D0-\u20DC\u20E1\u20E5-\u20F0\u2102\u2107\u210A-\u2113\u2115\u2119-\u211D\u2124\u2126\u2128\u212A-\u212D\u212F-\u2139\u213C-\u213F\u2145-\u2149\u214E\u2160-\u2188\u2C00-\u2C2E\u2C30-\u2C5E\u2C60-\u2CE4\u2CEB-\u2CF3\u2D00-\u2D25\u2D27\u2D2D\u2D30-\u2D67\u2D6F\u2D7F-\u2D96\u2DA0-\u2DA6\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE\u2DD0-\u2DD6\u2DD8-\u2DDE\u2DE0-\u2DFF\u2E2F\u3005-\u3007\u3021-\u302F\u3031-\u3035\u3038-\u303C\u3041-\u3096\u3099\u309A\u309D-\u309F\u30A1-\u30FA\u30FC-\u30FF\u3105-\u312D\u3131-\u318E\u31A0-\u31BA\u31F0-\u31FF\u3400-\u4DB5\u4E00-\u9FCC\uA000-\uA48C\uA4D0-\uA4FD\uA500-\uA60C\uA610-\uA62B\uA640-\uA66F\uA674-\uA67D\uA67F-\uA69D\uA69F-\uA6F1\uA717-\uA71F\uA722-\uA788\uA78B-\uA78E\uA790-\uA7AD\uA7B0\uA7B1\uA7F7-\uA827\uA840-\uA873\uA880-\uA8C4\uA8D0-\uA8D9\uA8E0-\uA8F7\uA8FB\uA900-\uA92D\uA930-\uA953\uA960-\uA97C\uA980-\uA9C0\uA9CF-\uA9D9\uA9E0-\uA9FE\uAA00-\uAA36\uAA40-\uAA4D\uAA50-\uAA59\uAA60-\uAA76\uAA7A-\uAAC2\uAADB-\uAADD\uAAE0-\uAAEF\uAAF2-\uAAF6\uAB01-\uAB06\uAB09-\uAB0E\uAB11-\uAB16\uAB20-\uAB26\uAB28-\uAB2E\uAB30-\uAB5A\uAB5C-\uAB5F\uAB64\uAB65\uABC0-\uABEA\uABEC\uABED\uABF0-\uABF9\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFA6D\uFA70-\uFAD9\uFB00-\uFB06\uFB13-\uFB17\uFB1D-\uFB28\uFB2A-\uFB36\uFB38-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46-\uFBB1\uFBD3-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFB\uFE00-\uFE0F\uFE20-\uFE2D\uFE33\uFE34\uFE4D-\uFE4F\uFE70-\uFE74\uFE76-\uFEFC\uFF10-\uFF19\uFF21-\uFF3A\uFF3F\uFF41-\uFF5A\uFF66-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA-\uFFDC]');

						return ch === 36 || ch === 95 || // $ (dollar) and _ (underscore)
						ch >= 65 && ch <= 90 || // A..Z
						ch >= 97 && ch <= 122 || // a..z
						ch >= 48 && ch <= 57 || // 0..9
						ch === 92 || // \ (backslash)
						ch >= 0x80 && NonAsciiIdentifierPart.test(String.fromCharCode(ch));
					}

					function parseIdentityEscape() {
						// IdentityEscape ::
						//      SourceCharacter but not IdentifierPart
						//      <ZWJ>
						//      <ZWNJ>

						var ZWJ = '\u200C';
						var ZWNJ = '\u200D';

						var tmp;

						if (!isIdentifierPart(lookahead())) {
							tmp = incr();
							return createEscaped('identifier', tmp.charCodeAt(0), tmp, 1);
						}

						if (match(ZWJ)) {
							// <ZWJ>
							return createEscaped('identifier', 0x200C, ZWJ);
						} else if (match(ZWNJ)) {
							// <ZWNJ>
							return createEscaped('identifier', 0x200D, ZWNJ);
						}

						return null;
					}

					function parseCharacterClass() {
						// CharacterClass ::
						//      [ [lookahead ∉ {^}] ClassRanges ]
						//      [ ^ ClassRanges ]

						var res,
						    from = pos;
						if (res = matchReg(/^\[\^/)) {
							res = parseClassRanges();
							skip(']');
							return createCharacterClass(res, true, from, pos);
						} else if (match('[')) {
							res = parseClassRanges();
							skip(']');
							return createCharacterClass(res, false, from, pos);
						}

						return null;
					}

					function parseClassRanges() {
						// ClassRanges ::
						//      [empty]
						//      NonemptyClassRanges

						var res;
						if (current(']')) {
							// Empty array means nothing insinde of the ClassRange.
							return [];
						} else {
							res = parseNonemptyClassRanges();
							if (!res) {
								bail('nonEmptyClassRanges');
							}
							return res;
						}
					}

					function parseHelperClassRanges(atom) {
						var from, to, res;
						if (current('-') && !next(']')) {
							// ClassAtom - ClassAtom ClassRanges
							skip('-');

							res = parseClassAtom();
							if (!res) {
								bail('classAtom');
							}
							to = pos;
							var classRanges = parseClassRanges();
							if (!classRanges) {
								bail('classRanges');
							}
							from = atom.range[0];
							if (classRanges.type === 'empty') {
								return [createClassRange(atom, res, from, to)];
							}
							return [createClassRange(atom, res, from, to)].concat(classRanges);
						}

						res = parseNonemptyClassRangesNoDash();
						if (!res) {
							bail('nonEmptyClassRangesNoDash');
						}

						return [atom].concat(res);
					}

					function parseNonemptyClassRanges() {
						// NonemptyClassRanges ::
						//      ClassAtom
						//      ClassAtom NonemptyClassRangesNoDash
						//      ClassAtom - ClassAtom ClassRanges

						var atom = parseClassAtom();
						if (!atom) {
							bail('classAtom');
						}

						if (current(']')) {
							// ClassAtom
							return [atom];
						}

						// ClassAtom NonemptyClassRangesNoDash
						// ClassAtom - ClassAtom ClassRanges
						return parseHelperClassRanges(atom);
					}

					function parseNonemptyClassRangesNoDash() {
						// NonemptyClassRangesNoDash ::
						//      ClassAtom
						//      ClassAtomNoDash NonemptyClassRangesNoDash
						//      ClassAtomNoDash - ClassAtom ClassRanges

						var res = parseClassAtom();
						if (!res) {
							bail('classAtom');
						}
						if (current(']')) {
							//      ClassAtom
							return res;
						}

						// ClassAtomNoDash NonemptyClassRangesNoDash
						// ClassAtomNoDash - ClassAtom ClassRanges
						return parseHelperClassRanges(res);
					}

					function parseClassAtom() {
						// ClassAtom ::
						//      -
						//      ClassAtomNoDash
						if (match('-')) {
							return createCharacter('-');
						} else {
							return parseClassAtomNoDash();
						}
					}

					function parseClassAtomNoDash() {
						// ClassAtomNoDash ::
						//      SourceCharacter but not one of \ or ] or -
						//      \ ClassEscape

						var res;
						if (res = matchReg(/^[^\\\]-]/)) {
							return createCharacter(res[0]);
						} else if (match('\\')) {
							res = parseClassEscape();
							if (!res) {
								bail('classEscape');
							}

							return parseUnicodeSurrogatePairEscape(res);
						}
					}

					function bail(message, details, from, to) {
						from = from == null ? pos : from;
						to = to == null ? from : to;

						var contextStart = Math.max(0, from - 10);
						var contextEnd = Math.min(to + 10, str.length);

						// Output a bit of context and a line pointing to where our error is.
						//
						// We are assuming that there are no actual newlines in the content as this is a regular expression.
						var context = '    ' + str.substring(contextStart, contextEnd);
						var pointer = '    ' + new Array(from - contextStart + 1).join(' ') + '^';

						throw SyntaxError(message + ' at position ' + from + (details ? ': ' + details : '') + '\n' + context + '\n' + pointer);
					}

					var backrefDenied = [];
					var closedCaptureCounter = 0;
					var firstIteration = true;
					var hasUnicodeFlag = (flags || "").indexOf("u") !== -1;
					var pos = 0;

					// Convert the input to a string and treat the empty string special.
					str = String(str);
					if (str === '') {
						str = '(?:)';
					}

					var result = parseDisjunction();

					if (result.range[1] !== str.length) {
						bail('Could not parse entire input - got stuck', '', result.range[1]);
					}

					// The spec requires to interpret the `\2` in `/\2()()/` as backreference.
					// As the parser collects the number of capture groups as the string is
					// parsed it is impossible to make these decisions at the point when the
					// `\2` is handled. In case the local decision turns out to be wrong after
					// the parsing has finished, the input string is parsed a second time with
					// the total number of capture groups set.
					//
					// SEE: https://github.com/jviereck/regjsparser/issues/70
					for (var i = 0; i < backrefDenied.length; i++) {
						if (backrefDenied[i] <= closedCaptureCounter) {
							// Parse the input a second time.
							pos = 0;
							firstIteration = false;
							return parseDisjunction();
						}
					}

					return result;
				}

				var regjsparser = {
					parse: parse
				};

				if ('object' !== 'undefined' && module.exports) {
					module.exports = regjsparser;
				} else {
					window.regjsparser = regjsparser;
				}
			})();
		});

		var regenerate = createCommonjsModule$$1(function (module, exports) {
			/*! https://mths.be/regenerate v1.3.3 by @mathias | MIT license */
			(function (root) {

				// Detect free variables `exports`.
				var freeExports = 'object' == 'object' && exports;

				// Detect free variable `module`.
				var freeModule = 'object' == 'object' && module && module.exports == freeExports && module;

				// Detect free variable `global`, from Node.js/io.js or Browserified code,
				// and use it as `root`.
				var freeGlobal = (typeof commonjsGlobal$$1 === 'undefined' ? 'undefined' : _typeof(commonjsGlobal$$1)) == 'object' && commonjsGlobal$$1;
				if (freeGlobal.global === freeGlobal || freeGlobal.window === freeGlobal) {
					root = freeGlobal;
				}

				/*--------------------------------------------------------------------------*/

				var ERRORS = {
					'rangeOrder': 'A range\u2019s `stop` value must be greater than or equal ' + 'to the `start` value.',
					'codePointRange': 'Invalid code point value. Code points range from ' + 'U+000000 to U+10FFFF.'
				};

				// https://mathiasbynens.be/notes/javascript-encoding#surrogate-pairs
				var HIGH_SURROGATE_MIN = 0xD800;
				var HIGH_SURROGATE_MAX = 0xDBFF;
				var LOW_SURROGATE_MIN = 0xDC00;
				var LOW_SURROGATE_MAX = 0xDFFF;

				// In Regenerate output, `\0` is never preceded by `\` because we sort by
				// code point value, so let’s keep this regular expression simple.
				var regexNull = /\\x00([^0123456789]|$)/g;

				var object = {};
				var hasOwnProperty = object.hasOwnProperty;
				var extend = function extend(destination, source) {
					var key;
					for (key in source) {
						if (hasOwnProperty.call(source, key)) {
							destination[key] = source[key];
						}
					}
					return destination;
				};

				var forEach = function forEach(array, callback) {
					var index = -1;
					var length = array.length;
					while (++index < length) {
						callback(array[index], index);
					}
				};

				var toString = object.toString;
				var isArray = function isArray(value) {
					return toString.call(value) == '[object Array]';
				};
				var isNumber = function isNumber(value) {
					return typeof value == 'number' || toString.call(value) == '[object Number]';
				};

				// This assumes that `number` is a positive integer that `toString()`s nicely
				// (which is the case for all code point values).
				var zeroes = '0000';
				var pad = function pad(number, totalCharacters) {
					var string = String(number);
					return string.length < totalCharacters ? (zeroes + string).slice(-totalCharacters) : string;
				};

				var hex = function hex(number) {
					return Number(number).toString(16).toUpperCase();
				};

				var slice = [].slice;

				/*--------------------------------------------------------------------------*/

				var dataFromCodePoints = function dataFromCodePoints(codePoints) {
					var index = -1;
					var length = codePoints.length;
					var max = length - 1;
					var result = [];
					var isStart = true;
					var tmp;
					var previous = 0;
					while (++index < length) {
						tmp = codePoints[index];
						if (isStart) {
							result.push(tmp);
							previous = tmp;
							isStart = false;
						} else {
							if (tmp == previous + 1) {
								if (index != max) {
									previous = tmp;
									continue;
								} else {
									isStart = true;
									result.push(tmp + 1);
								}
							} else {
								// End the previous range and start a new one.
								result.push(previous + 1, tmp);
								previous = tmp;
							}
						}
					}
					if (!isStart) {
						result.push(tmp + 1);
					}
					return result;
				};

				var dataRemove = function dataRemove(data, codePoint) {
					// Iterate over the data per `(start, end)` pair.
					var index = 0;
					var start;
					var end;
					var length = data.length;
					while (index < length) {
						start = data[index];
						end = data[index + 1];
						if (codePoint >= start && codePoint < end) {
							// Modify this pair.
							if (codePoint == start) {
								if (end == start + 1) {
									// Just remove `start` and `end`.
									data.splice(index, 2);
									return data;
								} else {
									// Just replace `start` with a new value.
									data[index] = codePoint + 1;
									return data;
								}
							} else if (codePoint == end - 1) {
								// Just replace `end` with a new value.
								data[index + 1] = codePoint;
								return data;
							} else {
								// Replace `[start, end]` with `[startA, endA, startB, endB]`.
								data.splice(index, 2, start, codePoint, codePoint + 1, end);
								return data;
							}
						}
						index += 2;
					}
					return data;
				};

				var dataRemoveRange = function dataRemoveRange(data, rangeStart, rangeEnd) {
					if (rangeEnd < rangeStart) {
						throw Error(ERRORS.rangeOrder);
					}
					// Iterate over the data per `(start, end)` pair.
					var index = 0;
					var start;
					var end;
					while (index < data.length) {
						start = data[index];
						end = data[index + 1] - 1; // Note: the `- 1` makes `end` inclusive.

						// Exit as soon as no more matching pairs can be found.
						if (start > rangeEnd) {
							return data;
						}

						// Check if this range pair is equal to, or forms a subset of, the range
						// to be removed.
						// E.g. we have `[0, 11, 40, 51]` and want to remove 0-10 → `[40, 51]`.
						// E.g. we have `[40, 51]` and want to remove 0-100 → `[]`.
						if (rangeStart <= start && rangeEnd >= end) {
							// Remove this pair.
							data.splice(index, 2);
							continue;
						}

						// Check if both `rangeStart` and `rangeEnd` are within the bounds of
						// this pair.
						// E.g. we have `[0, 11]` and want to remove 4-6 → `[0, 4, 7, 11]`.
						if (rangeStart >= start && rangeEnd < end) {
							if (rangeStart == start) {
								// Replace `[start, end]` with `[startB, endB]`.
								data[index] = rangeEnd + 1;
								data[index + 1] = end + 1;
								return data;
							}
							// Replace `[start, end]` with `[startA, endA, startB, endB]`.
							data.splice(index, 2, start, rangeStart, rangeEnd + 1, end + 1);
							return data;
						}

						// Check if only `rangeStart` is within the bounds of this pair.
						// E.g. we have `[0, 11]` and want to remove 4-20 → `[0, 4]`.
						if (rangeStart >= start && rangeStart <= end) {
							// Replace `end` with `rangeStart`.
							data[index + 1] = rangeStart;
							// Note: we cannot `return` just yet, in case any following pairs still
							// contain matching code points.
							// E.g. we have `[0, 11, 14, 31]` and want to remove 4-20
							// → `[0, 4, 21, 31]`.
						}

						// Check if only `rangeEnd` is within the bounds of this pair.
						// E.g. we have `[14, 31]` and want to remove 4-20 → `[21, 31]`.
						else if (rangeEnd >= start && rangeEnd <= end) {
								// Just replace `start`.
								data[index] = rangeEnd + 1;
								return data;
							}

						index += 2;
					}
					return data;
				};

				var dataAdd = function dataAdd(data, codePoint) {
					// Iterate over the data per `(start, end)` pair.
					var index = 0;
					var start;
					var end;
					var lastIndex = null;
					var length = data.length;
					if (codePoint < 0x0 || codePoint > 0x10FFFF) {
						throw RangeError(ERRORS.codePointRange);
					}
					while (index < length) {
						start = data[index];
						end = data[index + 1];

						// Check if the code point is already in the set.
						if (codePoint >= start && codePoint < end) {
							return data;
						}

						if (codePoint == start - 1) {
							// Just replace `start` with a new value.
							data[index] = codePoint;
							return data;
						}

						// At this point, if `start` is `greater` than `codePoint`, insert a new
						// `[start, end]` pair before the current pair, or after the current pair
						// if there is a known `lastIndex`.
						if (start > codePoint) {
							data.splice(lastIndex != null ? lastIndex + 2 : 0, 0, codePoint, codePoint + 1);
							return data;
						}

						if (codePoint == end) {
							// Check if adding this code point causes two separate ranges to become
							// a single range, e.g. `dataAdd([0, 4, 5, 10], 4)` → `[0, 10]`.
							if (codePoint + 1 == data[index + 2]) {
								data.splice(index, 4, start, data[index + 3]);
								return data;
							}
							// Else, just replace `end` with a new value.
							data[index + 1] = codePoint + 1;
							return data;
						}
						lastIndex = index;
						index += 2;
					}
					// The loop has finished; add the new pair to the end of the data set.
					data.push(codePoint, codePoint + 1);
					return data;
				};

				var dataAddData = function dataAddData(dataA, dataB) {
					// Iterate over the data per `(start, end)` pair.
					var index = 0;
					var start;
					var end;
					var data = dataA.slice();
					var length = dataB.length;
					while (index < length) {
						start = dataB[index];
						end = dataB[index + 1] - 1;
						if (start == end) {
							data = dataAdd(data, start);
						} else {
							data = dataAddRange(data, start, end);
						}
						index += 2;
					}
					return data;
				};

				var dataRemoveData = function dataRemoveData(dataA, dataB) {
					// Iterate over the data per `(start, end)` pair.
					var index = 0;
					var start;
					var end;
					var data = dataA.slice();
					var length = dataB.length;
					while (index < length) {
						start = dataB[index];
						end = dataB[index + 1] - 1;
						if (start == end) {
							data = dataRemove(data, start);
						} else {
							data = dataRemoveRange(data, start, end);
						}
						index += 2;
					}
					return data;
				};

				var dataAddRange = function dataAddRange(data, rangeStart, rangeEnd) {
					if (rangeEnd < rangeStart) {
						throw Error(ERRORS.rangeOrder);
					}
					if (rangeStart < 0x0 || rangeStart > 0x10FFFF || rangeEnd < 0x0 || rangeEnd > 0x10FFFF) {
						throw RangeError(ERRORS.codePointRange);
					}
					// Iterate over the data per `(start, end)` pair.
					var index = 0;
					var start;
					var end;
					var added = false;
					var length = data.length;
					while (index < length) {
						start = data[index];
						end = data[index + 1];

						if (added) {
							// The range has already been added to the set; at this point, we just
							// need to get rid of the following ranges in case they overlap.

							// Check if this range can be combined with the previous range.
							if (start == rangeEnd + 1) {
								data.splice(index - 1, 2);
								return data;
							}

							// Exit as soon as no more possibly overlapping pairs can be found.
							if (start > rangeEnd) {
								return data;
							}

							// E.g. `[0, 11, 12, 16]` and we’ve added 5-15, so we now have
							// `[0, 16, 12, 16]`. Remove the `12,16` part, as it lies within the
							// `0,16` range that was previously added.
							if (start >= rangeStart && start <= rangeEnd) {
								// `start` lies within the range that was previously added.

								if (end > rangeStart && end - 1 <= rangeEnd) {
									// `end` lies within the range that was previously added as well,
									// so remove this pair.
									data.splice(index, 2);
									index -= 2;
									// Note: we cannot `return` just yet, as there may still be other
									// overlapping pairs.
								} else {
									// `start` lies within the range that was previously added, but
									// `end` doesn’t. E.g. `[0, 11, 12, 31]` and we’ve added 5-15, so
									// now we have `[0, 16, 12, 31]`. This must be written as `[0, 31]`.
									// Remove the previously added `end` and the current `start`.
									data.splice(index - 1, 2);
									index -= 2;
								}

								// Note: we cannot return yet.
							}
						} else if (start == rangeEnd + 1) {
							data[index] = rangeStart;
							return data;
						}

						// Check if a new pair must be inserted *before* the current one.
						else if (start > rangeEnd) {
								data.splice(index, 0, rangeStart, rangeEnd + 1);
								return data;
							} else if (rangeStart >= start && rangeStart < end && rangeEnd + 1 <= end) {
								// The new range lies entirely within an existing range pair. No action
								// needed.
								return data;
							} else if (
							// E.g. `[0, 11]` and you add 5-15 → `[0, 16]`.
							rangeStart >= start && rangeStart < end ||
							// E.g. `[0, 3]` and you add 3-6 → `[0, 7]`.
							end == rangeStart) {
								// Replace `end` with the new value.
								data[index + 1] = rangeEnd + 1;
								// Make sure the next range pair doesn’t overlap, e.g. `[0, 11, 12, 14]`
								// and you add 5-15 → `[0, 16]`, i.e. remove the `12,14` part.
								added = true;
								// Note: we cannot `return` just yet.
							} else if (rangeStart <= start && rangeEnd + 1 >= end) {
								// The new range is a superset of the old range.
								data[index] = rangeStart;
								data[index + 1] = rangeEnd + 1;
								added = true;
							}

						index += 2;
					}
					// The loop has finished without doing anything; add the new pair to the end
					// of the data set.
					if (!added) {
						data.push(rangeStart, rangeEnd + 1);
					}
					return data;
				};

				var dataContains = function dataContains(data, codePoint) {
					var index = 0;
					var length = data.length;
					// Exit early if `codePoint` is not within `data`’s overall range.
					var start = data[index];
					var end = data[length - 1];
					if (length >= 2) {
						if (codePoint < start || codePoint > end) {
							return false;
						}
					}
					// Iterate over the data per `(start, end)` pair.
					while (index < length) {
						start = data[index];
						end = data[index + 1];
						if (codePoint >= start && codePoint < end) {
							return true;
						}
						index += 2;
					}
					return false;
				};

				var dataIntersection = function dataIntersection(data, codePoints) {
					var index = 0;
					var length = codePoints.length;
					var codePoint;
					var result = [];
					while (index < length) {
						codePoint = codePoints[index];
						if (dataContains(data, codePoint)) {
							result.push(codePoint);
						}
						++index;
					}
					return dataFromCodePoints(result);
				};

				var dataIsEmpty = function dataIsEmpty(data) {
					return !data.length;
				};

				var dataIsSingleton = function dataIsSingleton(data) {
					// Check if the set only represents a single code point.
					return data.length == 2 && data[0] + 1 == data[1];
				};

				var dataToArray = function dataToArray(data) {
					// Iterate over the data per `(start, end)` pair.
					var index = 0;
					var start;
					var end;
					var result = [];
					var length = data.length;
					while (index < length) {
						start = data[index];
						end = data[index + 1];
						while (start < end) {
							result.push(start);
							++start;
						}
						index += 2;
					}
					return result;
				};

				/*--------------------------------------------------------------------------*/

				// https://mathiasbynens.be/notes/javascript-encoding#surrogate-formulae
				var floor = Math.floor;
				var highSurrogate = function highSurrogate(codePoint) {
					return parseInt(floor((codePoint - 0x10000) / 0x400) + HIGH_SURROGATE_MIN, 10);
				};

				var lowSurrogate = function lowSurrogate(codePoint) {
					return parseInt((codePoint - 0x10000) % 0x400 + LOW_SURROGATE_MIN, 10);
				};

				var stringFromCharCode = String.fromCharCode;
				var codePointToString = function codePointToString(codePoint) {
					var string;
					// https://mathiasbynens.be/notes/javascript-escapes#single
					// Note: the `\b` escape sequence for U+0008 BACKSPACE in strings has a
					// different meaning in regular expressions (word boundary), so it cannot
					// be used here.
					if (codePoint == 0x09) {
						string = '\\t';
					}
					// Note: IE < 9 treats `'\v'` as `'v'`, so avoid using it.
					// else if (codePoint == 0x0B) {
					// 	string = '\\v';
					// }
					else if (codePoint == 0x0A) {
							string = '\\n';
						} else if (codePoint == 0x0C) {
							string = '\\f';
						} else if (codePoint == 0x0D) {
							string = '\\r';
						} else if (codePoint == 0x5C) {
							string = '\\\\';
						} else if (codePoint == 0x24 || codePoint >= 0x28 && codePoint <= 0x2B || codePoint >= 0x2D && codePoint <= 0x2F || codePoint == 0x3F || codePoint >= 0x5B && codePoint <= 0x5E || codePoint >= 0x7B && codePoint <= 0x7D) {
							// The code point maps to an unsafe printable ASCII character;
							// backslash-escape it. Here’s the list of those symbols:
							//
							//     $()*+-./?[\]^{|}
							//
							// See #7 for more info.
							string = '\\' + stringFromCharCode(codePoint);
						} else if (codePoint >= 0x20 && codePoint <= 0x7E) {
							// The code point maps to one of these printable ASCII symbols
							// (including the space character):
							//
							//      !"#%&',/0123456789:;<=>@ABCDEFGHIJKLMNO
							//     PQRSTUVWXYZ_`abcdefghijklmnopqrstuvwxyz~
							//
							// These can safely be used directly.
							string = stringFromCharCode(codePoint);
						} else if (codePoint <= 0xFF) {
							// https://mathiasbynens.be/notes/javascript-escapes#hexadecimal
							string = '\\x' + pad(hex(codePoint), 2);
						} else {
							// `codePoint <= 0xFFFF` holds true.
							// https://mathiasbynens.be/notes/javascript-escapes#unicode
							string = '\\u' + pad(hex(codePoint), 4);
						}

					// There’s no need to account for astral symbols / surrogate pairs here,
					// since `codePointToString` is private and only used for BMP code points.
					// But if that’s what you need, just add an `else` block with this code:
					//
					//     string = '\\u' + pad(hex(highSurrogate(codePoint)), 4)
					//     	+ '\\u' + pad(hex(lowSurrogate(codePoint)), 4);

					return string;
				};

				var codePointToStringUnicode = function codePointToStringUnicode(codePoint) {
					if (codePoint <= 0xFFFF) {
						return codePointToString(codePoint);
					}
					return '\\u{' + codePoint.toString(16).toUpperCase() + '}';
				};

				var symbolToCodePoint = function symbolToCodePoint(symbol) {
					var length = symbol.length;
					var first = symbol.charCodeAt(0);
					var second;
					if (first >= HIGH_SURROGATE_MIN && first <= HIGH_SURROGATE_MAX && length > 1 // There is a next code unit.
					) {
							// `first` is a high surrogate, and there is a next character. Assume
							// it’s a low surrogate (else it’s invalid usage of Regenerate anyway).
							second = symbol.charCodeAt(1);
							// https://mathiasbynens.be/notes/javascript-encoding#surrogate-formulae
							return (first - HIGH_SURROGATE_MIN) * 0x400 + second - LOW_SURROGATE_MIN + 0x10000;
						}
					return first;
				};

				var createBMPCharacterClasses = function createBMPCharacterClasses(data) {
					// Iterate over the data per `(start, end)` pair.
					var result = '';
					var index = 0;
					var start;
					var end;
					var length = data.length;
					if (dataIsSingleton(data)) {
						return codePointToString(data[0]);
					}
					while (index < length) {
						start = data[index];
						end = data[index + 1] - 1; // Note: the `- 1` makes `end` inclusive.
						if (start == end) {
							result += codePointToString(start);
						} else if (start + 1 == end) {
							result += codePointToString(start) + codePointToString(end);
						} else {
							result += codePointToString(start) + '-' + codePointToString(end);
						}
						index += 2;
					}
					return '[' + result + ']';
				};

				var createUnicodeCharacterClasses = function createUnicodeCharacterClasses(data) {
					// Iterate over the data per `(start, end)` pair.
					var result = '';
					var index = 0;
					var start;
					var end;
					var length = data.length;
					if (dataIsSingleton(data)) {
						return codePointToStringUnicode(data[0]);
					}
					while (index < length) {
						start = data[index];
						end = data[index + 1] - 1; // Note: the `- 1` makes `end` inclusive.
						if (start == end) {
							result += codePointToStringUnicode(start);
						} else if (start + 1 == end) {
							result += codePointToStringUnicode(start) + codePointToStringUnicode(end);
						} else {
							result += codePointToStringUnicode(start) + '-' + codePointToStringUnicode(end);
						}
						index += 2;
					}
					return '[' + result + ']';
				};

				var splitAtBMP = function splitAtBMP(data) {
					// Iterate over the data per `(start, end)` pair.
					var loneHighSurrogates = [];
					var loneLowSurrogates = [];
					var bmp = [];
					var astral = [];
					var index = 0;
					var start;
					var end;
					var length = data.length;
					while (index < length) {
						start = data[index];
						end = data[index + 1] - 1; // Note: the `- 1` makes `end` inclusive.

						if (start < HIGH_SURROGATE_MIN) {

							// The range starts and ends before the high surrogate range.
							// E.g. (0, 0x10).
							if (end < HIGH_SURROGATE_MIN) {
								bmp.push(start, end + 1);
							}

							// The range starts before the high surrogate range and ends within it.
							// E.g. (0, 0xD855).
							if (end >= HIGH_SURROGATE_MIN && end <= HIGH_SURROGATE_MAX) {
								bmp.push(start, HIGH_SURROGATE_MIN);
								loneHighSurrogates.push(HIGH_SURROGATE_MIN, end + 1);
							}

							// The range starts before the high surrogate range and ends in the low
							// surrogate range. E.g. (0, 0xDCFF).
							if (end >= LOW_SURROGATE_MIN && end <= LOW_SURROGATE_MAX) {
								bmp.push(start, HIGH_SURROGATE_MIN);
								loneHighSurrogates.push(HIGH_SURROGATE_MIN, HIGH_SURROGATE_MAX + 1);
								loneLowSurrogates.push(LOW_SURROGATE_MIN, end + 1);
							}

							// The range starts before the high surrogate range and ends after the
							// low surrogate range. E.g. (0, 0x10FFFF).
							if (end > LOW_SURROGATE_MAX) {
								bmp.push(start, HIGH_SURROGATE_MIN);
								loneHighSurrogates.push(HIGH_SURROGATE_MIN, HIGH_SURROGATE_MAX + 1);
								loneLowSurrogates.push(LOW_SURROGATE_MIN, LOW_SURROGATE_MAX + 1);
								if (end <= 0xFFFF) {
									bmp.push(LOW_SURROGATE_MAX + 1, end + 1);
								} else {
									bmp.push(LOW_SURROGATE_MAX + 1, 0xFFFF + 1);
									astral.push(0xFFFF + 1, end + 1);
								}
							}
						} else if (start >= HIGH_SURROGATE_MIN && start <= HIGH_SURROGATE_MAX) {

							// The range starts and ends in the high surrogate range.
							// E.g. (0xD855, 0xD866).
							if (end >= HIGH_SURROGATE_MIN && end <= HIGH_SURROGATE_MAX) {
								loneHighSurrogates.push(start, end + 1);
							}

							// The range starts in the high surrogate range and ends in the low
							// surrogate range. E.g. (0xD855, 0xDCFF).
							if (end >= LOW_SURROGATE_MIN && end <= LOW_SURROGATE_MAX) {
								loneHighSurrogates.push(start, HIGH_SURROGATE_MAX + 1);
								loneLowSurrogates.push(LOW_SURROGATE_MIN, end + 1);
							}

							// The range starts in the high surrogate range and ends after the low
							// surrogate range. E.g. (0xD855, 0x10FFFF).
							if (end > LOW_SURROGATE_MAX) {
								loneHighSurrogates.push(start, HIGH_SURROGATE_MAX + 1);
								loneLowSurrogates.push(LOW_SURROGATE_MIN, LOW_SURROGATE_MAX + 1);
								if (end <= 0xFFFF) {
									bmp.push(LOW_SURROGATE_MAX + 1, end + 1);
								} else {
									bmp.push(LOW_SURROGATE_MAX + 1, 0xFFFF + 1);
									astral.push(0xFFFF + 1, end + 1);
								}
							}
						} else if (start >= LOW_SURROGATE_MIN && start <= LOW_SURROGATE_MAX) {

							// The range starts and ends in the low surrogate range.
							// E.g. (0xDCFF, 0xDDFF).
							if (end >= LOW_SURROGATE_MIN && end <= LOW_SURROGATE_MAX) {
								loneLowSurrogates.push(start, end + 1);
							}

							// The range starts in the low surrogate range and ends after the low
							// surrogate range. E.g. (0xDCFF, 0x10FFFF).
							if (end > LOW_SURROGATE_MAX) {
								loneLowSurrogates.push(start, LOW_SURROGATE_MAX + 1);
								if (end <= 0xFFFF) {
									bmp.push(LOW_SURROGATE_MAX + 1, end + 1);
								} else {
									bmp.push(LOW_SURROGATE_MAX + 1, 0xFFFF + 1);
									astral.push(0xFFFF + 1, end + 1);
								}
							}
						} else if (start > LOW_SURROGATE_MAX && start <= 0xFFFF) {

							// The range starts and ends after the low surrogate range.
							// E.g. (0xFFAA, 0x10FFFF).
							if (end <= 0xFFFF) {
								bmp.push(start, end + 1);
							} else {
								bmp.push(start, 0xFFFF + 1);
								astral.push(0xFFFF + 1, end + 1);
							}
						} else {

							// The range starts and ends in the astral range.
							astral.push(start, end + 1);
						}

						index += 2;
					}
					return {
						'loneHighSurrogates': loneHighSurrogates,
						'loneLowSurrogates': loneLowSurrogates,
						'bmp': bmp,
						'astral': astral
					};
				};

				var optimizeSurrogateMappings = function optimizeSurrogateMappings(surrogateMappings) {
					var result = [];
					var tmpLow = [];
					var addLow = false;
					var mapping;
					var nextMapping;
					var highSurrogates;
					var lowSurrogates;
					var nextHighSurrogates;
					var nextLowSurrogates;
					var index = -1;
					var length = surrogateMappings.length;
					while (++index < length) {
						mapping = surrogateMappings[index];
						nextMapping = surrogateMappings[index + 1];
						if (!nextMapping) {
							result.push(mapping);
							continue;
						}
						highSurrogates = mapping[0];
						lowSurrogates = mapping[1];
						nextHighSurrogates = nextMapping[0];
						nextLowSurrogates = nextMapping[1];

						// Check for identical high surrogate ranges.
						tmpLow = lowSurrogates;
						while (nextHighSurrogates && highSurrogates[0] == nextHighSurrogates[0] && highSurrogates[1] == nextHighSurrogates[1]) {
							// Merge with the next item.
							if (dataIsSingleton(nextLowSurrogates)) {
								tmpLow = dataAdd(tmpLow, nextLowSurrogates[0]);
							} else {
								tmpLow = dataAddRange(tmpLow, nextLowSurrogates[0], nextLowSurrogates[1] - 1);
							}
							++index;
							mapping = surrogateMappings[index];
							highSurrogates = mapping[0];
							lowSurrogates = mapping[1];
							nextMapping = surrogateMappings[index + 1];
							nextHighSurrogates = nextMapping && nextMapping[0];
							nextLowSurrogates = nextMapping && nextMapping[1];
							addLow = true;
						}
						result.push([highSurrogates, addLow ? tmpLow : lowSurrogates]);
						addLow = false;
					}
					return optimizeByLowSurrogates(result);
				};

				var optimizeByLowSurrogates = function optimizeByLowSurrogates(surrogateMappings) {
					if (surrogateMappings.length == 1) {
						return surrogateMappings;
					}
					var index = -1;
					var innerIndex = -1;
					while (++index < surrogateMappings.length) {
						var mapping = surrogateMappings[index];
						var lowSurrogates = mapping[1];
						var lowSurrogateStart = lowSurrogates[0];
						var lowSurrogateEnd = lowSurrogates[1];
						innerIndex = index; // Note: the loop starts at the next index.
						while (++innerIndex < surrogateMappings.length) {
							var otherMapping = surrogateMappings[innerIndex];
							var otherLowSurrogates = otherMapping[1];
							var otherLowSurrogateStart = otherLowSurrogates[0];
							var otherLowSurrogateEnd = otherLowSurrogates[1];
							if (lowSurrogateStart == otherLowSurrogateStart && lowSurrogateEnd == otherLowSurrogateEnd) {
								// Add the code points in the other item to this one.
								if (dataIsSingleton(otherMapping[0])) {
									mapping[0] = dataAdd(mapping[0], otherMapping[0][0]);
								} else {
									mapping[0] = dataAddRange(mapping[0], otherMapping[0][0], otherMapping[0][1] - 1);
								}
								// Remove the other, now redundant, item.
								surrogateMappings.splice(innerIndex, 1);
								--innerIndex;
							}
						}
					}
					return surrogateMappings;
				};

				var surrogateSet = function surrogateSet(data) {
					// Exit early if `data` is an empty set.
					if (!data.length) {
						return [];
					}

					// Iterate over the data per `(start, end)` pair.
					var index = 0;
					var start;
					var end;
					var startHigh;
					var startLow;
					var endHigh;
					var endLow;
					var surrogateMappings = [];
					var length = data.length;
					while (index < length) {
						start = data[index];
						end = data[index + 1] - 1;

						startHigh = highSurrogate(start);
						startLow = lowSurrogate(start);
						endHigh = highSurrogate(end);
						endLow = lowSurrogate(end);

						var startsWithLowestLowSurrogate = startLow == LOW_SURROGATE_MIN;
						var endsWithHighestLowSurrogate = endLow == LOW_SURROGATE_MAX;
						var complete = false;

						// Append the previous high-surrogate-to-low-surrogate mappings.
						// Step 1: `(startHigh, startLow)` to `(startHigh, LOW_SURROGATE_MAX)`.
						if (startHigh == endHigh || startsWithLowestLowSurrogate && endsWithHighestLowSurrogate) {
							surrogateMappings.push([[startHigh, endHigh + 1], [startLow, endLow + 1]]);
							complete = true;
						} else {
							surrogateMappings.push([[startHigh, startHigh + 1], [startLow, LOW_SURROGATE_MAX + 1]]);
						}

						// Step 2: `(startHigh + 1, LOW_SURROGATE_MIN)` to
						// `(endHigh - 1, LOW_SURROGATE_MAX)`.
						if (!complete && startHigh + 1 < endHigh) {
							if (endsWithHighestLowSurrogate) {
								// Combine step 2 and step 3.
								surrogateMappings.push([[startHigh + 1, endHigh + 1], [LOW_SURROGATE_MIN, endLow + 1]]);
								complete = true;
							} else {
								surrogateMappings.push([[startHigh + 1, endHigh], [LOW_SURROGATE_MIN, LOW_SURROGATE_MAX + 1]]);
							}
						}

						// Step 3. `(endHigh, LOW_SURROGATE_MIN)` to `(endHigh, endLow)`.
						if (!complete) {
							surrogateMappings.push([[endHigh, endHigh + 1], [LOW_SURROGATE_MIN, endLow + 1]]);
						}

						index += 2;
					}

					// The format of `surrogateMappings` is as follows:
					//
					//     [ surrogateMapping1, surrogateMapping2 ]
					//
					// i.e.:
					//
					//     [
					//       [ highSurrogates1, lowSurrogates1 ],
					//       [ highSurrogates2, lowSurrogates2 ]
					//     ]
					return optimizeSurrogateMappings(surrogateMappings);
				};

				var createSurrogateCharacterClasses = function createSurrogateCharacterClasses(surrogateMappings) {
					var result = [];
					forEach(surrogateMappings, function (surrogateMapping) {
						var highSurrogates = surrogateMapping[0];
						var lowSurrogates = surrogateMapping[1];
						result.push(createBMPCharacterClasses(highSurrogates) + createBMPCharacterClasses(lowSurrogates));
					});
					return result.join('|');
				};

				var createCharacterClassesFromData = function createCharacterClassesFromData(data, bmpOnly, hasUnicodeFlag) {
					if (hasUnicodeFlag) {
						return createUnicodeCharacterClasses(data);
					}
					var result = [];

					var parts = splitAtBMP(data);
					var loneHighSurrogates = parts.loneHighSurrogates;
					var loneLowSurrogates = parts.loneLowSurrogates;
					var bmp = parts.bmp;
					var astral = parts.astral;
					var hasLoneHighSurrogates = !dataIsEmpty(loneHighSurrogates);
					var hasLoneLowSurrogates = !dataIsEmpty(loneLowSurrogates);

					var surrogateMappings = surrogateSet(astral);

					if (bmpOnly) {
						bmp = dataAddData(bmp, loneHighSurrogates);
						hasLoneHighSurrogates = false;
						bmp = dataAddData(bmp, loneLowSurrogates);
						hasLoneLowSurrogates = false;
					}

					if (!dataIsEmpty(bmp)) {
						// The data set contains BMP code points that are not high surrogates
						// needed for astral code points in the set.
						result.push(createBMPCharacterClasses(bmp));
					}
					if (surrogateMappings.length) {
						// The data set contains astral code points; append character classes
						// based on their surrogate pairs.
						result.push(createSurrogateCharacterClasses(surrogateMappings));
					}
					// https://gist.github.com/mathiasbynens/bbe7f870208abcfec860
					if (hasLoneHighSurrogates) {
						result.push(createBMPCharacterClasses(loneHighSurrogates) +
						// Make sure the high surrogates aren’t part of a surrogate pair.
						'(?![\\uDC00-\\uDFFF])');
					}
					if (hasLoneLowSurrogates) {
						result.push(
						// It is not possible to accurately assert the low surrogates aren’t
						// part of a surrogate pair, since JavaScript regular expressions do
						// not support lookbehind.
						'(?:[^\\uD800-\\uDBFF]|^)' + createBMPCharacterClasses(loneLowSurrogates));
					}
					return result.join('|');
				};

				/*--------------------------------------------------------------------------*/

				// `regenerate` can be used as a constructor (and new methods can be added to
				// its prototype) but also as a regular function, the latter of which is the
				// documented and most common usage. For that reason, it’s not capitalized.
				var regenerate = function regenerate(value) {
					if (arguments.length > 1) {
						value = slice.call(arguments);
					}
					if (this instanceof regenerate) {
						this.data = [];
						return value ? this.add(value) : this;
					}
					return new regenerate().add(value);
				};

				regenerate.version = '1.3.3';

				var proto = regenerate.prototype;
				extend(proto, {
					'add': function add(value) {
						var $this = this;
						if (value == null) {
							return $this;
						}
						if (value instanceof regenerate) {
							// Allow passing other Regenerate instances.
							$this.data = dataAddData($this.data, value.data);
							return $this;
						}
						if (arguments.length > 1) {
							value = slice.call(arguments);
						}
						if (isArray(value)) {
							forEach(value, function (item) {
								$this.add(item);
							});
							return $this;
						}
						$this.data = dataAdd($this.data, isNumber(value) ? value : symbolToCodePoint(value));
						return $this;
					},
					'remove': function remove(value) {
						var $this = this;
						if (value == null) {
							return $this;
						}
						if (value instanceof regenerate) {
							// Allow passing other Regenerate instances.
							$this.data = dataRemoveData($this.data, value.data);
							return $this;
						}
						if (arguments.length > 1) {
							value = slice.call(arguments);
						}
						if (isArray(value)) {
							forEach(value, function (item) {
								$this.remove(item);
							});
							return $this;
						}
						$this.data = dataRemove($this.data, isNumber(value) ? value : symbolToCodePoint(value));
						return $this;
					},
					'addRange': function addRange(start, end) {
						var $this = this;
						$this.data = dataAddRange($this.data, isNumber(start) ? start : symbolToCodePoint(start), isNumber(end) ? end : symbolToCodePoint(end));
						return $this;
					},
					'removeRange': function removeRange(start, end) {
						var $this = this;
						var startCodePoint = isNumber(start) ? start : symbolToCodePoint(start);
						var endCodePoint = isNumber(end) ? end : symbolToCodePoint(end);
						$this.data = dataRemoveRange($this.data, startCodePoint, endCodePoint);
						return $this;
					},
					'intersection': function intersection(argument) {
						var $this = this;
						// Allow passing other Regenerate instances.
						// TODO: Optimize this by writing and using `dataIntersectionData()`.
						var array = argument instanceof regenerate ? dataToArray(argument.data) : argument;
						$this.data = dataIntersection($this.data, array);
						return $this;
					},
					'contains': function contains(codePoint) {
						return dataContains(this.data, isNumber(codePoint) ? codePoint : symbolToCodePoint(codePoint));
					},
					'clone': function clone() {
						var set$$1 = new regenerate();
						set$$1.data = this.data.slice(0);
						return set$$1;
					},
					'toString': function toString(options) {
						var result = createCharacterClassesFromData(this.data, options ? options.bmpOnly : false, options ? options.hasUnicodeFlag : false);
						if (!result) {
							// For an empty set, return something that can be inserted `/here/` to
							// form a valid regular expression. Avoid `(?:)` since that matches the
							// empty string.
							return '[]';
						}
						// Use `\0` instead of `\x00` where possible.
						return result.replace(regexNull, '\\0$1');
					},
					'toRegExp': function toRegExp(flags) {
						var pattern = this.toString(flags && flags.indexOf('u') != -1 ? { 'hasUnicodeFlag': true } : null);
						return RegExp(pattern, flags || '');
					},
					'valueOf': function valueOf() {
						// Note: `valueOf` is aliased as `toArray`.
						return dataToArray(this.data);
					}
				});

				proto.toArray = proto.valueOf;

				// Some AMD build optimizers, like r.js, check for specific condition patterns
				// like the following:
				if (typeof undefined == 'function' && _typeof(undefined.amd) == 'object' && undefined.amd) {
					undefined(function () {
						return regenerate;
					});
				} else if (freeExports && !freeExports.nodeType) {
					if (freeModule) {
						// in Node.js, io.js, or RingoJS v0.8.0+
						freeModule.exports = regenerate;
					} else {
						// in Narwhal or RingoJS v0.7.0-
						freeExports.regenerate = regenerate;
					}
				} else {
					// in Rhino or a web browser
					root.regenerate = regenerate;
				}
			})(commonjsGlobal$$1);
		});

		var unicodeCanonicalPropertyNamesEcmascript = new Set([
		// Non-binary properties:
		'General_Category', 'Script', 'Script_Extensions',
		// Binary properties:
		'Alphabetic', 'Any', 'ASCII', 'ASCII_Hex_Digit', 'Assigned', 'Bidi_Control', 'Bidi_Mirrored', 'Case_Ignorable', 'Cased', 'Changes_When_Casefolded', 'Changes_When_Casemapped', 'Changes_When_Lowercased', 'Changes_When_NFKC_Casefolded', 'Changes_When_Titlecased', 'Changes_When_Uppercased', 'Dash', 'Default_Ignorable_Code_Point', 'Deprecated', 'Diacritic', 'Emoji', 'Emoji_Component', 'Emoji_Modifier', 'Emoji_Modifier_Base', 'Emoji_Presentation', 'Extender', 'Grapheme_Base', 'Grapheme_Extend', 'Hex_Digit', 'ID_Continue', 'ID_Start', 'Ideographic', 'IDS_Binary_Operator', 'IDS_Trinary_Operator', 'Join_Control', 'Logical_Order_Exception', 'Lowercase', 'Math', 'Noncharacter_Code_Point', 'Pattern_Syntax', 'Pattern_White_Space', 'Quotation_Mark', 'Radical', 'Regional_Indicator', 'Sentence_Terminal', 'Soft_Dotted', 'Terminal_Punctuation', 'Unified_Ideograph', 'Uppercase', 'Variation_Selector', 'White_Space', 'XID_Continue', 'XID_Start']);

		// Generated using `npm run build`. Do not edit!
		var unicodePropertyAliasesEcmascript = new Map([['scx', 'Script_Extensions'], ['sc', 'Script'], ['gc', 'General_Category'], ['AHex', 'ASCII_Hex_Digit'], ['Alpha', 'Alphabetic'], ['Bidi_C', 'Bidi_Control'], ['Bidi_M', 'Bidi_Mirrored'], ['Cased', 'Cased'], ['CI', 'Case_Ignorable'], ['CWCF', 'Changes_When_Casefolded'], ['CWCM', 'Changes_When_Casemapped'], ['CWKCF', 'Changes_When_NFKC_Casefolded'], ['CWL', 'Changes_When_Lowercased'], ['CWT', 'Changes_When_Titlecased'], ['CWU', 'Changes_When_Uppercased'], ['Dash', 'Dash'], ['Dep', 'Deprecated'], ['DI', 'Default_Ignorable_Code_Point'], ['Dia', 'Diacritic'], ['Ext', 'Extender'], ['Gr_Base', 'Grapheme_Base'], ['Gr_Ext', 'Grapheme_Extend'], ['Hex', 'Hex_Digit'], ['IDC', 'ID_Continue'], ['Ideo', 'Ideographic'], ['IDS', 'ID_Start'], ['IDSB', 'IDS_Binary_Operator'], ['IDST', 'IDS_Trinary_Operator'], ['Join_C', 'Join_Control'], ['LOE', 'Logical_Order_Exception'], ['Lower', 'Lowercase'], ['Math', 'Math'], ['NChar', 'Noncharacter_Code_Point'], ['Pat_Syn', 'Pattern_Syntax'], ['Pat_WS', 'Pattern_White_Space'], ['QMark', 'Quotation_Mark'], ['Radical', 'Radical'], ['RI', 'Regional_Indicator'], ['SD', 'Soft_Dotted'], ['STerm', 'Sentence_Terminal'], ['Term', 'Terminal_Punctuation'], ['UIdeo', 'Unified_Ideograph'], ['Upper', 'Uppercase'], ['VS', 'Variation_Selector'], ['WSpace', 'White_Space'], ['space', 'White_Space'], ['XIDC', 'XID_Continue'], ['XIDS', 'XID_Start']]);

		var matchProperty = function matchProperty(property) {
			if (unicodeCanonicalPropertyNamesEcmascript.has(property)) {
				return property;
			}
			if (unicodePropertyAliasesEcmascript.has(property)) {
				return unicodePropertyAliasesEcmascript.get(property);
			}
			throw new Error('Unknown property: ' + property);
		};

		var unicodeMatchPropertyEcmascript = matchProperty;

		var mappings = new Map([['General_Category', new Map([['C', 'Other'], ['Cc', 'Control'], ['cntrl', 'Control'], ['Cf', 'Format'], ['Cn', 'Unassigned'], ['Co', 'Private_Use'], ['Cs', 'Surrogate'], ['L', 'Letter'], ['LC', 'Cased_Letter'], ['Ll', 'Lowercase_Letter'], ['Lm', 'Modifier_Letter'], ['Lo', 'Other_Letter'], ['Lt', 'Titlecase_Letter'], ['Lu', 'Uppercase_Letter'], ['M', 'Mark'], ['Combining_Mark', 'Mark'], ['Mc', 'Spacing_Mark'], ['Me', 'Enclosing_Mark'], ['Mn', 'Nonspacing_Mark'], ['N', 'Number'], ['Nd', 'Decimal_Number'], ['digit', 'Decimal_Number'], ['Nl', 'Letter_Number'], ['No', 'Other_Number'], ['P', 'Punctuation'], ['punct', 'Punctuation'], ['Pc', 'Connector_Punctuation'], ['Pd', 'Dash_Punctuation'], ['Pe', 'Close_Punctuation'], ['Pf', 'Final_Punctuation'], ['Pi', 'Initial_Punctuation'], ['Po', 'Other_Punctuation'], ['Ps', 'Open_Punctuation'], ['S', 'Symbol'], ['Sc', 'Currency_Symbol'], ['Sk', 'Modifier_Symbol'], ['Sm', 'Math_Symbol'], ['So', 'Other_Symbol'], ['Z', 'Separator'], ['Zl', 'Line_Separator'], ['Zp', 'Paragraph_Separator'], ['Zs', 'Space_Separator'], ['Other', 'Other'], ['Control', 'Control'], ['Format', 'Format'], ['Unassigned', 'Unassigned'], ['Private_Use', 'Private_Use'], ['Surrogate', 'Surrogate'], ['Letter', 'Letter'], ['Cased_Letter', 'Cased_Letter'], ['Lowercase_Letter', 'Lowercase_Letter'], ['Modifier_Letter', 'Modifier_Letter'], ['Other_Letter', 'Other_Letter'], ['Titlecase_Letter', 'Titlecase_Letter'], ['Uppercase_Letter', 'Uppercase_Letter'], ['Mark', 'Mark'], ['Spacing_Mark', 'Spacing_Mark'], ['Enclosing_Mark', 'Enclosing_Mark'], ['Nonspacing_Mark', 'Nonspacing_Mark'], ['Number', 'Number'], ['Decimal_Number', 'Decimal_Number'], ['Letter_Number', 'Letter_Number'], ['Other_Number', 'Other_Number'], ['Punctuation', 'Punctuation'], ['Connector_Punctuation', 'Connector_Punctuation'], ['Dash_Punctuation', 'Dash_Punctuation'], ['Close_Punctuation', 'Close_Punctuation'], ['Final_Punctuation', 'Final_Punctuation'], ['Initial_Punctuation', 'Initial_Punctuation'], ['Other_Punctuation', 'Other_Punctuation'], ['Open_Punctuation', 'Open_Punctuation'], ['Symbol', 'Symbol'], ['Currency_Symbol', 'Currency_Symbol'], ['Modifier_Symbol', 'Modifier_Symbol'], ['Math_Symbol', 'Math_Symbol'], ['Other_Symbol', 'Other_Symbol'], ['Separator', 'Separator'], ['Line_Separator', 'Line_Separator'], ['Paragraph_Separator', 'Paragraph_Separator'], ['Space_Separator', 'Space_Separator']])], ['Script', new Map([['Adlm', 'Adlam'], ['Aghb', 'Caucasian_Albanian'], ['Ahom', 'Ahom'], ['Arab', 'Arabic'], ['Armi', 'Imperial_Aramaic'], ['Armn', 'Armenian'], ['Avst', 'Avestan'], ['Bali', 'Balinese'], ['Bamu', 'Bamum'], ['Bass', 'Bassa_Vah'], ['Batk', 'Batak'], ['Beng', 'Bengali'], ['Bhks', 'Bhaiksuki'], ['Bopo', 'Bopomofo'], ['Brah', 'Brahmi'], ['Brai', 'Braille'], ['Bugi', 'Buginese'], ['Buhd', 'Buhid'], ['Cakm', 'Chakma'], ['Cans', 'Canadian_Aboriginal'], ['Cari', 'Carian'], ['Cham', 'Cham'], ['Cher', 'Cherokee'], ['Copt', 'Coptic'], ['Qaac', 'Coptic'], ['Cprt', 'Cypriot'], ['Cyrl', 'Cyrillic'], ['Deva', 'Devanagari'], ['Dsrt', 'Deseret'], ['Dupl', 'Duployan'], ['Egyp', 'Egyptian_Hieroglyphs'], ['Elba', 'Elbasan'], ['Ethi', 'Ethiopic'], ['Geor', 'Georgian'], ['Glag', 'Glagolitic'], ['Gonm', 'Masaram_Gondi'], ['Goth', 'Gothic'], ['Gran', 'Grantha'], ['Grek', 'Greek'], ['Gujr', 'Gujarati'], ['Guru', 'Gurmukhi'], ['Hang', 'Hangul'], ['Hani', 'Han'], ['Hano', 'Hanunoo'], ['Hatr', 'Hatran'], ['Hebr', 'Hebrew'], ['Hira', 'Hiragana'], ['Hluw', 'Anatolian_Hieroglyphs'], ['Hmng', 'Pahawh_Hmong'], ['Hrkt', 'Katakana_Or_Hiragana'], ['Hung', 'Old_Hungarian'], ['Ital', 'Old_Italic'], ['Java', 'Javanese'], ['Kali', 'Kayah_Li'], ['Kana', 'Katakana'], ['Khar', 'Kharoshthi'], ['Khmr', 'Khmer'], ['Khoj', 'Khojki'], ['Knda', 'Kannada'], ['Kthi', 'Kaithi'], ['Lana', 'Tai_Tham'], ['Laoo', 'Lao'], ['Latn', 'Latin'], ['Lepc', 'Lepcha'], ['Limb', 'Limbu'], ['Lina', 'Linear_A'], ['Linb', 'Linear_B'], ['Lisu', 'Lisu'], ['Lyci', 'Lycian'], ['Lydi', 'Lydian'], ['Mahj', 'Mahajani'], ['Mand', 'Mandaic'], ['Mani', 'Manichaean'], ['Marc', 'Marchen'], ['Mend', 'Mende_Kikakui'], ['Merc', 'Meroitic_Cursive'], ['Mero', 'Meroitic_Hieroglyphs'], ['Mlym', 'Malayalam'], ['Modi', 'Modi'], ['Mong', 'Mongolian'], ['Mroo', 'Mro'], ['Mtei', 'Meetei_Mayek'], ['Mult', 'Multani'], ['Mymr', 'Myanmar'], ['Narb', 'Old_North_Arabian'], ['Nbat', 'Nabataean'], ['Newa', 'Newa'], ['Nkoo', 'Nko'], ['Nshu', 'Nushu'], ['Ogam', 'Ogham'], ['Olck', 'Ol_Chiki'], ['Orkh', 'Old_Turkic'], ['Orya', 'Oriya'], ['Osge', 'Osage'], ['Osma', 'Osmanya'], ['Palm', 'Palmyrene'], ['Pauc', 'Pau_Cin_Hau'], ['Perm', 'Old_Permic'], ['Phag', 'Phags_Pa'], ['Phli', 'Inscriptional_Pahlavi'], ['Phlp', 'Psalter_Pahlavi'], ['Phnx', 'Phoenician'], ['Plrd', 'Miao'], ['Prti', 'Inscriptional_Parthian'], ['Rjng', 'Rejang'], ['Runr', 'Runic'], ['Samr', 'Samaritan'], ['Sarb', 'Old_South_Arabian'], ['Saur', 'Saurashtra'], ['Sgnw', 'SignWriting'], ['Shaw', 'Shavian'], ['Shrd', 'Sharada'], ['Sidd', 'Siddham'], ['Sind', 'Khudawadi'], ['Sinh', 'Sinhala'], ['Sora', 'Sora_Sompeng'], ['Soyo', 'Soyombo'], ['Sund', 'Sundanese'], ['Sylo', 'Syloti_Nagri'], ['Syrc', 'Syriac'], ['Tagb', 'Tagbanwa'], ['Takr', 'Takri'], ['Tale', 'Tai_Le'], ['Talu', 'New_Tai_Lue'], ['Taml', 'Tamil'], ['Tang', 'Tangut'], ['Tavt', 'Tai_Viet'], ['Telu', 'Telugu'], ['Tfng', 'Tifinagh'], ['Tglg', 'Tagalog'], ['Thaa', 'Thaana'], ['Thai', 'Thai'], ['Tibt', 'Tibetan'], ['Tirh', 'Tirhuta'], ['Ugar', 'Ugaritic'], ['Vaii', 'Vai'], ['Wara', 'Warang_Citi'], ['Xpeo', 'Old_Persian'], ['Xsux', 'Cuneiform'], ['Yiii', 'Yi'], ['Zanb', 'Zanabazar_Square'], ['Zinh', 'Inherited'], ['Qaai', 'Inherited'], ['Zyyy', 'Common'], ['Zzzz', 'Unknown'], ['Adlam', 'Adlam'], ['Caucasian_Albanian', 'Caucasian_Albanian'], ['Arabic', 'Arabic'], ['Imperial_Aramaic', 'Imperial_Aramaic'], ['Armenian', 'Armenian'], ['Avestan', 'Avestan'], ['Balinese', 'Balinese'], ['Bamum', 'Bamum'], ['Bassa_Vah', 'Bassa_Vah'], ['Batak', 'Batak'], ['Bengali', 'Bengali'], ['Bhaiksuki', 'Bhaiksuki'], ['Bopomofo', 'Bopomofo'], ['Brahmi', 'Brahmi'], ['Braille', 'Braille'], ['Buginese', 'Buginese'], ['Buhid', 'Buhid'], ['Chakma', 'Chakma'], ['Canadian_Aboriginal', 'Canadian_Aboriginal'], ['Carian', 'Carian'], ['Cherokee', 'Cherokee'], ['Coptic', 'Coptic'], ['Cypriot', 'Cypriot'], ['Cyrillic', 'Cyrillic'], ['Devanagari', 'Devanagari'], ['Deseret', 'Deseret'], ['Duployan', 'Duployan'], ['Egyptian_Hieroglyphs', 'Egyptian_Hieroglyphs'], ['Elbasan', 'Elbasan'], ['Ethiopic', 'Ethiopic'], ['Georgian', 'Georgian'], ['Glagolitic', 'Glagolitic'], ['Masaram_Gondi', 'Masaram_Gondi'], ['Gothic', 'Gothic'], ['Grantha', 'Grantha'], ['Greek', 'Greek'], ['Gujarati', 'Gujarati'], ['Gurmukhi', 'Gurmukhi'], ['Hangul', 'Hangul'], ['Han', 'Han'], ['Hanunoo', 'Hanunoo'], ['Hatran', 'Hatran'], ['Hebrew', 'Hebrew'], ['Hiragana', 'Hiragana'], ['Anatolian_Hieroglyphs', 'Anatolian_Hieroglyphs'], ['Pahawh_Hmong', 'Pahawh_Hmong'], ['Katakana_Or_Hiragana', 'Katakana_Or_Hiragana'], ['Old_Hungarian', 'Old_Hungarian'], ['Old_Italic', 'Old_Italic'], ['Javanese', 'Javanese'], ['Kayah_Li', 'Kayah_Li'], ['Katakana', 'Katakana'], ['Kharoshthi', 'Kharoshthi'], ['Khmer', 'Khmer'], ['Khojki', 'Khojki'], ['Kannada', 'Kannada'], ['Kaithi', 'Kaithi'], ['Tai_Tham', 'Tai_Tham'], ['Lao', 'Lao'], ['Latin', 'Latin'], ['Lepcha', 'Lepcha'], ['Limbu', 'Limbu'], ['Linear_A', 'Linear_A'], ['Linear_B', 'Linear_B'], ['Lycian', 'Lycian'], ['Lydian', 'Lydian'], ['Mahajani', 'Mahajani'], ['Mandaic', 'Mandaic'], ['Manichaean', 'Manichaean'], ['Marchen', 'Marchen'], ['Mende_Kikakui', 'Mende_Kikakui'], ['Meroitic_Cursive', 'Meroitic_Cursive'], ['Meroitic_Hieroglyphs', 'Meroitic_Hieroglyphs'], ['Malayalam', 'Malayalam'], ['Mongolian', 'Mongolian'], ['Mro', 'Mro'], ['Meetei_Mayek', 'Meetei_Mayek'], ['Multani', 'Multani'], ['Myanmar', 'Myanmar'], ['Old_North_Arabian', 'Old_North_Arabian'], ['Nabataean', 'Nabataean'], ['Nko', 'Nko'], ['Nushu', 'Nushu'], ['Ogham', 'Ogham'], ['Ol_Chiki', 'Ol_Chiki'], ['Old_Turkic', 'Old_Turkic'], ['Oriya', 'Oriya'], ['Osage', 'Osage'], ['Osmanya', 'Osmanya'], ['Palmyrene', 'Palmyrene'], ['Pau_Cin_Hau', 'Pau_Cin_Hau'], ['Old_Permic', 'Old_Permic'], ['Phags_Pa', 'Phags_Pa'], ['Inscriptional_Pahlavi', 'Inscriptional_Pahlavi'], ['Psalter_Pahlavi', 'Psalter_Pahlavi'], ['Phoenician', 'Phoenician'], ['Miao', 'Miao'], ['Inscriptional_Parthian', 'Inscriptional_Parthian'], ['Rejang', 'Rejang'], ['Runic', 'Runic'], ['Samaritan', 'Samaritan'], ['Old_South_Arabian', 'Old_South_Arabian'], ['Saurashtra', 'Saurashtra'], ['SignWriting', 'SignWriting'], ['Shavian', 'Shavian'], ['Sharada', 'Sharada'], ['Siddham', 'Siddham'], ['Khudawadi', 'Khudawadi'], ['Sinhala', 'Sinhala'], ['Sora_Sompeng', 'Sora_Sompeng'], ['Soyombo', 'Soyombo'], ['Sundanese', 'Sundanese'], ['Syloti_Nagri', 'Syloti_Nagri'], ['Syriac', 'Syriac'], ['Tagbanwa', 'Tagbanwa'], ['Takri', 'Takri'], ['Tai_Le', 'Tai_Le'], ['New_Tai_Lue', 'New_Tai_Lue'], ['Tamil', 'Tamil'], ['Tangut', 'Tangut'], ['Tai_Viet', 'Tai_Viet'], ['Telugu', 'Telugu'], ['Tifinagh', 'Tifinagh'], ['Tagalog', 'Tagalog'], ['Thaana', 'Thaana'], ['Tibetan', 'Tibetan'], ['Tirhuta', 'Tirhuta'], ['Ugaritic', 'Ugaritic'], ['Vai', 'Vai'], ['Warang_Citi', 'Warang_Citi'], ['Old_Persian', 'Old_Persian'], ['Cuneiform', 'Cuneiform'], ['Yi', 'Yi'], ['Zanabazar_Square', 'Zanabazar_Square'], ['Inherited', 'Inherited'], ['Common', 'Common'], ['Unknown', 'Unknown']])], ['Script_Extensions', new Map([['Adlm', 'Adlam'], ['Aghb', 'Caucasian_Albanian'], ['Ahom', 'Ahom'], ['Arab', 'Arabic'], ['Armi', 'Imperial_Aramaic'], ['Armn', 'Armenian'], ['Avst', 'Avestan'], ['Bali', 'Balinese'], ['Bamu', 'Bamum'], ['Bass', 'Bassa_Vah'], ['Batk', 'Batak'], ['Beng', 'Bengali'], ['Bhks', 'Bhaiksuki'], ['Bopo', 'Bopomofo'], ['Brah', 'Brahmi'], ['Brai', 'Braille'], ['Bugi', 'Buginese'], ['Buhd', 'Buhid'], ['Cakm', 'Chakma'], ['Cans', 'Canadian_Aboriginal'], ['Cari', 'Carian'], ['Cham', 'Cham'], ['Cher', 'Cherokee'], ['Copt', 'Coptic'], ['Qaac', 'Coptic'], ['Cprt', 'Cypriot'], ['Cyrl', 'Cyrillic'], ['Deva', 'Devanagari'], ['Dsrt', 'Deseret'], ['Dupl', 'Duployan'], ['Egyp', 'Egyptian_Hieroglyphs'], ['Elba', 'Elbasan'], ['Ethi', 'Ethiopic'], ['Geor', 'Georgian'], ['Glag', 'Glagolitic'], ['Gonm', 'Masaram_Gondi'], ['Goth', 'Gothic'], ['Gran', 'Grantha'], ['Grek', 'Greek'], ['Gujr', 'Gujarati'], ['Guru', 'Gurmukhi'], ['Hang', 'Hangul'], ['Hani', 'Han'], ['Hano', 'Hanunoo'], ['Hatr', 'Hatran'], ['Hebr', 'Hebrew'], ['Hira', 'Hiragana'], ['Hluw', 'Anatolian_Hieroglyphs'], ['Hmng', 'Pahawh_Hmong'], ['Hrkt', 'Katakana_Or_Hiragana'], ['Hung', 'Old_Hungarian'], ['Ital', 'Old_Italic'], ['Java', 'Javanese'], ['Kali', 'Kayah_Li'], ['Kana', 'Katakana'], ['Khar', 'Kharoshthi'], ['Khmr', 'Khmer'], ['Khoj', 'Khojki'], ['Knda', 'Kannada'], ['Kthi', 'Kaithi'], ['Lana', 'Tai_Tham'], ['Laoo', 'Lao'], ['Latn', 'Latin'], ['Lepc', 'Lepcha'], ['Limb', 'Limbu'], ['Lina', 'Linear_A'], ['Linb', 'Linear_B'], ['Lisu', 'Lisu'], ['Lyci', 'Lycian'], ['Lydi', 'Lydian'], ['Mahj', 'Mahajani'], ['Mand', 'Mandaic'], ['Mani', 'Manichaean'], ['Marc', 'Marchen'], ['Mend', 'Mende_Kikakui'], ['Merc', 'Meroitic_Cursive'], ['Mero', 'Meroitic_Hieroglyphs'], ['Mlym', 'Malayalam'], ['Modi', 'Modi'], ['Mong', 'Mongolian'], ['Mroo', 'Mro'], ['Mtei', 'Meetei_Mayek'], ['Mult', 'Multani'], ['Mymr', 'Myanmar'], ['Narb', 'Old_North_Arabian'], ['Nbat', 'Nabataean'], ['Newa', 'Newa'], ['Nkoo', 'Nko'], ['Nshu', 'Nushu'], ['Ogam', 'Ogham'], ['Olck', 'Ol_Chiki'], ['Orkh', 'Old_Turkic'], ['Orya', 'Oriya'], ['Osge', 'Osage'], ['Osma', 'Osmanya'], ['Palm', 'Palmyrene'], ['Pauc', 'Pau_Cin_Hau'], ['Perm', 'Old_Permic'], ['Phag', 'Phags_Pa'], ['Phli', 'Inscriptional_Pahlavi'], ['Phlp', 'Psalter_Pahlavi'], ['Phnx', 'Phoenician'], ['Plrd', 'Miao'], ['Prti', 'Inscriptional_Parthian'], ['Rjng', 'Rejang'], ['Runr', 'Runic'], ['Samr', 'Samaritan'], ['Sarb', 'Old_South_Arabian'], ['Saur', 'Saurashtra'], ['Sgnw', 'SignWriting'], ['Shaw', 'Shavian'], ['Shrd', 'Sharada'], ['Sidd', 'Siddham'], ['Sind', 'Khudawadi'], ['Sinh', 'Sinhala'], ['Sora', 'Sora_Sompeng'], ['Soyo', 'Soyombo'], ['Sund', 'Sundanese'], ['Sylo', 'Syloti_Nagri'], ['Syrc', 'Syriac'], ['Tagb', 'Tagbanwa'], ['Takr', 'Takri'], ['Tale', 'Tai_Le'], ['Talu', 'New_Tai_Lue'], ['Taml', 'Tamil'], ['Tang', 'Tangut'], ['Tavt', 'Tai_Viet'], ['Telu', 'Telugu'], ['Tfng', 'Tifinagh'], ['Tglg', 'Tagalog'], ['Thaa', 'Thaana'], ['Thai', 'Thai'], ['Tibt', 'Tibetan'], ['Tirh', 'Tirhuta'], ['Ugar', 'Ugaritic'], ['Vaii', 'Vai'], ['Wara', 'Warang_Citi'], ['Xpeo', 'Old_Persian'], ['Xsux', 'Cuneiform'], ['Yiii', 'Yi'], ['Zanb', 'Zanabazar_Square'], ['Zinh', 'Inherited'], ['Qaai', 'Inherited'], ['Zyyy', 'Common'], ['Zzzz', 'Unknown'], ['Adlam', 'Adlam'], ['Caucasian_Albanian', 'Caucasian_Albanian'], ['Arabic', 'Arabic'], ['Imperial_Aramaic', 'Imperial_Aramaic'], ['Armenian', 'Armenian'], ['Avestan', 'Avestan'], ['Balinese', 'Balinese'], ['Bamum', 'Bamum'], ['Bassa_Vah', 'Bassa_Vah'], ['Batak', 'Batak'], ['Bengali', 'Bengali'], ['Bhaiksuki', 'Bhaiksuki'], ['Bopomofo', 'Bopomofo'], ['Brahmi', 'Brahmi'], ['Braille', 'Braille'], ['Buginese', 'Buginese'], ['Buhid', 'Buhid'], ['Chakma', 'Chakma'], ['Canadian_Aboriginal', 'Canadian_Aboriginal'], ['Carian', 'Carian'], ['Cherokee', 'Cherokee'], ['Coptic', 'Coptic'], ['Cypriot', 'Cypriot'], ['Cyrillic', 'Cyrillic'], ['Devanagari', 'Devanagari'], ['Deseret', 'Deseret'], ['Duployan', 'Duployan'], ['Egyptian_Hieroglyphs', 'Egyptian_Hieroglyphs'], ['Elbasan', 'Elbasan'], ['Ethiopic', 'Ethiopic'], ['Georgian', 'Georgian'], ['Glagolitic', 'Glagolitic'], ['Masaram_Gondi', 'Masaram_Gondi'], ['Gothic', 'Gothic'], ['Grantha', 'Grantha'], ['Greek', 'Greek'], ['Gujarati', 'Gujarati'], ['Gurmukhi', 'Gurmukhi'], ['Hangul', 'Hangul'], ['Han', 'Han'], ['Hanunoo', 'Hanunoo'], ['Hatran', 'Hatran'], ['Hebrew', 'Hebrew'], ['Hiragana', 'Hiragana'], ['Anatolian_Hieroglyphs', 'Anatolian_Hieroglyphs'], ['Pahawh_Hmong', 'Pahawh_Hmong'], ['Katakana_Or_Hiragana', 'Katakana_Or_Hiragana'], ['Old_Hungarian', 'Old_Hungarian'], ['Old_Italic', 'Old_Italic'], ['Javanese', 'Javanese'], ['Kayah_Li', 'Kayah_Li'], ['Katakana', 'Katakana'], ['Kharoshthi', 'Kharoshthi'], ['Khmer', 'Khmer'], ['Khojki', 'Khojki'], ['Kannada', 'Kannada'], ['Kaithi', 'Kaithi'], ['Tai_Tham', 'Tai_Tham'], ['Lao', 'Lao'], ['Latin', 'Latin'], ['Lepcha', 'Lepcha'], ['Limbu', 'Limbu'], ['Linear_A', 'Linear_A'], ['Linear_B', 'Linear_B'], ['Lycian', 'Lycian'], ['Lydian', 'Lydian'], ['Mahajani', 'Mahajani'], ['Mandaic', 'Mandaic'], ['Manichaean', 'Manichaean'], ['Marchen', 'Marchen'], ['Mende_Kikakui', 'Mende_Kikakui'], ['Meroitic_Cursive', 'Meroitic_Cursive'], ['Meroitic_Hieroglyphs', 'Meroitic_Hieroglyphs'], ['Malayalam', 'Malayalam'], ['Mongolian', 'Mongolian'], ['Mro', 'Mro'], ['Meetei_Mayek', 'Meetei_Mayek'], ['Multani', 'Multani'], ['Myanmar', 'Myanmar'], ['Old_North_Arabian', 'Old_North_Arabian'], ['Nabataean', 'Nabataean'], ['Nko', 'Nko'], ['Nushu', 'Nushu'], ['Ogham', 'Ogham'], ['Ol_Chiki', 'Ol_Chiki'], ['Old_Turkic', 'Old_Turkic'], ['Oriya', 'Oriya'], ['Osage', 'Osage'], ['Osmanya', 'Osmanya'], ['Palmyrene', 'Palmyrene'], ['Pau_Cin_Hau', 'Pau_Cin_Hau'], ['Old_Permic', 'Old_Permic'], ['Phags_Pa', 'Phags_Pa'], ['Inscriptional_Pahlavi', 'Inscriptional_Pahlavi'], ['Psalter_Pahlavi', 'Psalter_Pahlavi'], ['Phoenician', 'Phoenician'], ['Miao', 'Miao'], ['Inscriptional_Parthian', 'Inscriptional_Parthian'], ['Rejang', 'Rejang'], ['Runic', 'Runic'], ['Samaritan', 'Samaritan'], ['Old_South_Arabian', 'Old_South_Arabian'], ['Saurashtra', 'Saurashtra'], ['SignWriting', 'SignWriting'], ['Shavian', 'Shavian'], ['Sharada', 'Sharada'], ['Siddham', 'Siddham'], ['Khudawadi', 'Khudawadi'], ['Sinhala', 'Sinhala'], ['Sora_Sompeng', 'Sora_Sompeng'], ['Soyombo', 'Soyombo'], ['Sundanese', 'Sundanese'], ['Syloti_Nagri', 'Syloti_Nagri'], ['Syriac', 'Syriac'], ['Tagbanwa', 'Tagbanwa'], ['Takri', 'Takri'], ['Tai_Le', 'Tai_Le'], ['New_Tai_Lue', 'New_Tai_Lue'], ['Tamil', 'Tamil'], ['Tangut', 'Tangut'], ['Tai_Viet', 'Tai_Viet'], ['Telugu', 'Telugu'], ['Tifinagh', 'Tifinagh'], ['Tagalog', 'Tagalog'], ['Thaana', 'Thaana'], ['Tibetan', 'Tibetan'], ['Tirhuta', 'Tirhuta'], ['Ugaritic', 'Ugaritic'], ['Vai', 'Vai'], ['Warang_Citi', 'Warang_Citi'], ['Old_Persian', 'Old_Persian'], ['Cuneiform', 'Cuneiform'], ['Yi', 'Yi'], ['Zanabazar_Square', 'Zanabazar_Square'], ['Inherited', 'Inherited'], ['Common', 'Common'], ['Unknown', 'Unknown']])]]);

		var matchPropertyValue = function matchPropertyValue(property, value) {
			var aliasToValue = mappings.get(property);
			if (!aliasToValue) {
				throw new Error('Unknown property `' + property + '`.');
			}
			var canonicalValue = aliasToValue.get(value);
			if (canonicalValue) {
				return canonicalValue;
			}
			throw new Error('Unknown value `' + value + '` for property `' + property + '`.');
		};

		var unicodeMatchPropertyValueEcmascript = matchPropertyValue;

		var iuMappings = new Map([[0x4B, 0x212A], [0x53, 0x17F], [0x6B, 0x212A], [0x73, 0x17F], [0xB5, 0x39C], [0xC5, 0x212B], [0xDF, 0x1E9E], [0xE5, 0x212B], [0x17F, 0x53], [0x1C4, 0x1C5], [0x1C5, 0x1C4], [0x1C7, 0x1C8], [0x1C8, 0x1C7], [0x1CA, 0x1CB], [0x1CB, 0x1CA], [0x1F1, 0x1F2], [0x1F2, 0x1F1], [0x26A, 0xA7AE], [0x29D, 0xA7B2], [0x345, 0x1FBE], [0x392, 0x3D0], [0x395, 0x3F5], [0x398, 0x3F4], [0x399, 0x1FBE], [0x39A, 0x3F0], [0x39C, 0xB5], [0x3A0, 0x3D6], [0x3A1, 0x3F1], [0x3A3, 0x3C2], [0x3A6, 0x3D5], [0x3A9, 0x2126], [0x3B8, 0x3F4], [0x3C2, 0x3A3], [0x3C9, 0x2126], [0x3D0, 0x392], [0x3D1, 0x3F4], [0x3D5, 0x3A6], [0x3D6, 0x3A0], [0x3F0, 0x39A], [0x3F1, 0x3A1], [0x3F4, [0x398, 0x3D1, 0x3B8]], [0x3F5, 0x395], [0x412, 0x1C80], [0x414, 0x1C81], [0x41E, 0x1C82], [0x421, 0x1C83], [0x422, 0x1C85], [0x42A, 0x1C86], [0x432, 0x1C80], [0x434, 0x1C81], [0x43E, 0x1C82], [0x441, 0x1C83], [0x442, [0x1C84, 0x1C85]], [0x44A, 0x1C86], [0x462, 0x1C87], [0x463, 0x1C87], [0x13A0, 0xAB70], [0x13A1, 0xAB71], [0x13A2, 0xAB72], [0x13A3, 0xAB73], [0x13A4, 0xAB74], [0x13A5, 0xAB75], [0x13A6, 0xAB76], [0x13A7, 0xAB77], [0x13A8, 0xAB78], [0x13A9, 0xAB79], [0x13AA, 0xAB7A], [0x13AB, 0xAB7B], [0x13AC, 0xAB7C], [0x13AD, 0xAB7D], [0x13AE, 0xAB7E], [0x13AF, 0xAB7F], [0x13B0, 0xAB80], [0x13B1, 0xAB81], [0x13B2, 0xAB82], [0x13B3, 0xAB83], [0x13B4, 0xAB84], [0x13B5, 0xAB85], [0x13B6, 0xAB86], [0x13B7, 0xAB87], [0x13B8, 0xAB88], [0x13B9, 0xAB89], [0x13BA, 0xAB8A], [0x13BB, 0xAB8B], [0x13BC, 0xAB8C], [0x13BD, 0xAB8D], [0x13BE, 0xAB8E], [0x13BF, 0xAB8F], [0x13C0, 0xAB90], [0x13C1, 0xAB91], [0x13C2, 0xAB92], [0x13C3, 0xAB93], [0x13C4, 0xAB94], [0x13C5, 0xAB95], [0x13C6, 0xAB96], [0x13C7, 0xAB97], [0x13C8, 0xAB98], [0x13C9, 0xAB99], [0x13CA, 0xAB9A], [0x13CB, 0xAB9B], [0x13CC, 0xAB9C], [0x13CD, 0xAB9D], [0x13CE, 0xAB9E], [0x13CF, 0xAB9F], [0x13D0, 0xABA0], [0x13D1, 0xABA1], [0x13D2, 0xABA2], [0x13D3, 0xABA3], [0x13D4, 0xABA4], [0x13D5, 0xABA5], [0x13D6, 0xABA6], [0x13D7, 0xABA7], [0x13D8, 0xABA8], [0x13D9, 0xABA9], [0x13DA, 0xABAA], [0x13DB, 0xABAB], [0x13DC, 0xABAC], [0x13DD, 0xABAD], [0x13DE, 0xABAE], [0x13DF, 0xABAF], [0x13E0, 0xABB0], [0x13E1, 0xABB1], [0x13E2, 0xABB2], [0x13E3, 0xABB3], [0x13E4, 0xABB4], [0x13E5, 0xABB5], [0x13E6, 0xABB6], [0x13E7, 0xABB7], [0x13E8, 0xABB8], [0x13E9, 0xABB9], [0x13EA, 0xABBA], [0x13EB, 0xABBB], [0x13EC, 0xABBC], [0x13ED, 0xABBD], [0x13EE, 0xABBE], [0x13EF, 0xABBF], [0x13F0, 0x13F8], [0x13F1, 0x13F9], [0x13F2, 0x13FA], [0x13F3, 0x13FB], [0x13F4, 0x13FC], [0x13F5, 0x13FD], [0x13F8, 0x13F0], [0x13F9, 0x13F1], [0x13FA, 0x13F2], [0x13FB, 0x13F3], [0x13FC, 0x13F4], [0x13FD, 0x13F5], [0x1C80, [0x412, 0x432]], [0x1C81, [0x414, 0x434]], [0x1C82, [0x41E, 0x43E]], [0x1C83, [0x421, 0x441]], [0x1C84, [0x1C85, 0x442]], [0x1C85, [0x422, 0x1C84, 0x442]], [0x1C86, [0x42A, 0x44A]], [0x1C87, [0x462, 0x463]], [0x1C88, [0xA64A, 0xA64B]], [0x1E60, 0x1E9B], [0x1E9B, 0x1E60], [0x1E9E, 0xDF], [0x1F80, 0x1F88], [0x1F81, 0x1F89], [0x1F82, 0x1F8A], [0x1F83, 0x1F8B], [0x1F84, 0x1F8C], [0x1F85, 0x1F8D], [0x1F86, 0x1F8E], [0x1F87, 0x1F8F], [0x1F88, 0x1F80], [0x1F89, 0x1F81], [0x1F8A, 0x1F82], [0x1F8B, 0x1F83], [0x1F8C, 0x1F84], [0x1F8D, 0x1F85], [0x1F8E, 0x1F86], [0x1F8F, 0x1F87], [0x1F90, 0x1F98], [0x1F91, 0x1F99], [0x1F92, 0x1F9A], [0x1F93, 0x1F9B], [0x1F94, 0x1F9C], [0x1F95, 0x1F9D], [0x1F96, 0x1F9E], [0x1F97, 0x1F9F], [0x1F98, 0x1F90], [0x1F99, 0x1F91], [0x1F9A, 0x1F92], [0x1F9B, 0x1F93], [0x1F9C, 0x1F94], [0x1F9D, 0x1F95], [0x1F9E, 0x1F96], [0x1F9F, 0x1F97], [0x1FA0, 0x1FA8], [0x1FA1, 0x1FA9], [0x1FA2, 0x1FAA], [0x1FA3, 0x1FAB], [0x1FA4, 0x1FAC], [0x1FA5, 0x1FAD], [0x1FA6, 0x1FAE], [0x1FA7, 0x1FAF], [0x1FA8, 0x1FA0], [0x1FA9, 0x1FA1], [0x1FAA, 0x1FA2], [0x1FAB, 0x1FA3], [0x1FAC, 0x1FA4], [0x1FAD, 0x1FA5], [0x1FAE, 0x1FA6], [0x1FAF, 0x1FA7], [0x1FB3, 0x1FBC], [0x1FBC, 0x1FB3], [0x1FBE, [0x345, 0x399]], [0x1FC3, 0x1FCC], [0x1FCC, 0x1FC3], [0x1FF3, 0x1FFC], [0x1FFC, 0x1FF3], [0x2126, [0x3A9, 0x3C9]], [0x212A, 0x4B], [0x212B, [0xC5, 0xE5]], [0xA64A, 0x1C88], [0xA64B, 0x1C88], [0xA7AE, 0x26A], [0xA7B2, 0x29D], [0xA7B3, 0xAB53], [0xA7B4, 0xA7B5], [0xA7B5, 0xA7B4], [0xA7B6, 0xA7B7], [0xA7B7, 0xA7B6], [0xAB53, 0xA7B3], [0xAB70, 0x13A0], [0xAB71, 0x13A1], [0xAB72, 0x13A2], [0xAB73, 0x13A3], [0xAB74, 0x13A4], [0xAB75, 0x13A5], [0xAB76, 0x13A6], [0xAB77, 0x13A7], [0xAB78, 0x13A8], [0xAB79, 0x13A9], [0xAB7A, 0x13AA], [0xAB7B, 0x13AB], [0xAB7C, 0x13AC], [0xAB7D, 0x13AD], [0xAB7E, 0x13AE], [0xAB7F, 0x13AF], [0xAB80, 0x13B0], [0xAB81, 0x13B1], [0xAB82, 0x13B2], [0xAB83, 0x13B3], [0xAB84, 0x13B4], [0xAB85, 0x13B5], [0xAB86, 0x13B6], [0xAB87, 0x13B7], [0xAB88, 0x13B8], [0xAB89, 0x13B9], [0xAB8A, 0x13BA], [0xAB8B, 0x13BB], [0xAB8C, 0x13BC], [0xAB8D, 0x13BD], [0xAB8E, 0x13BE], [0xAB8F, 0x13BF], [0xAB90, 0x13C0], [0xAB91, 0x13C1], [0xAB92, 0x13C2], [0xAB93, 0x13C3], [0xAB94, 0x13C4], [0xAB95, 0x13C5], [0xAB96, 0x13C6], [0xAB97, 0x13C7], [0xAB98, 0x13C8], [0xAB99, 0x13C9], [0xAB9A, 0x13CA], [0xAB9B, 0x13CB], [0xAB9C, 0x13CC], [0xAB9D, 0x13CD], [0xAB9E, 0x13CE], [0xAB9F, 0x13CF], [0xABA0, 0x13D0], [0xABA1, 0x13D1], [0xABA2, 0x13D2], [0xABA3, 0x13D3], [0xABA4, 0x13D4], [0xABA5, 0x13D5], [0xABA6, 0x13D6], [0xABA7, 0x13D7], [0xABA8, 0x13D8], [0xABA9, 0x13D9], [0xABAA, 0x13DA], [0xABAB, 0x13DB], [0xABAC, 0x13DC], [0xABAD, 0x13DD], [0xABAE, 0x13DE], [0xABAF, 0x13DF], [0xABB0, 0x13E0], [0xABB1, 0x13E1], [0xABB2, 0x13E2], [0xABB3, 0x13E3], [0xABB4, 0x13E4], [0xABB5, 0x13E5], [0xABB6, 0x13E6], [0xABB7, 0x13E7], [0xABB8, 0x13E8], [0xABB9, 0x13E9], [0xABBA, 0x13EA], [0xABBB, 0x13EB], [0xABBC, 0x13EC], [0xABBD, 0x13ED], [0xABBE, 0x13EE], [0xABBF, 0x13EF], [0x10400, 0x10428], [0x10401, 0x10429], [0x10402, 0x1042A], [0x10403, 0x1042B], [0x10404, 0x1042C], [0x10405, 0x1042D], [0x10406, 0x1042E], [0x10407, 0x1042F], [0x10408, 0x10430], [0x10409, 0x10431], [0x1040A, 0x10432], [0x1040B, 0x10433], [0x1040C, 0x10434], [0x1040D, 0x10435], [0x1040E, 0x10436], [0x1040F, 0x10437], [0x10410, 0x10438], [0x10411, 0x10439], [0x10412, 0x1043A], [0x10413, 0x1043B], [0x10414, 0x1043C], [0x10415, 0x1043D], [0x10416, 0x1043E], [0x10417, 0x1043F], [0x10418, 0x10440], [0x10419, 0x10441], [0x1041A, 0x10442], [0x1041B, 0x10443], [0x1041C, 0x10444], [0x1041D, 0x10445], [0x1041E, 0x10446], [0x1041F, 0x10447], [0x10420, 0x10448], [0x10421, 0x10449], [0x10422, 0x1044A], [0x10423, 0x1044B], [0x10424, 0x1044C], [0x10425, 0x1044D], [0x10426, 0x1044E], [0x10427, 0x1044F], [0x10428, 0x10400], [0x10429, 0x10401], [0x1042A, 0x10402], [0x1042B, 0x10403], [0x1042C, 0x10404], [0x1042D, 0x10405], [0x1042E, 0x10406], [0x1042F, 0x10407], [0x10430, 0x10408], [0x10431, 0x10409], [0x10432, 0x1040A], [0x10433, 0x1040B], [0x10434, 0x1040C], [0x10435, 0x1040D], [0x10436, 0x1040E], [0x10437, 0x1040F], [0x10438, 0x10410], [0x10439, 0x10411], [0x1043A, 0x10412], [0x1043B, 0x10413], [0x1043C, 0x10414], [0x1043D, 0x10415], [0x1043E, 0x10416], [0x1043F, 0x10417], [0x10440, 0x10418], [0x10441, 0x10419], [0x10442, 0x1041A], [0x10443, 0x1041B], [0x10444, 0x1041C], [0x10445, 0x1041D], [0x10446, 0x1041E], [0x10447, 0x1041F], [0x10448, 0x10420], [0x10449, 0x10421], [0x1044A, 0x10422], [0x1044B, 0x10423], [0x1044C, 0x10424], [0x1044D, 0x10425], [0x1044E, 0x10426], [0x1044F, 0x10427], [0x104B0, 0x104D8], [0x104B1, 0x104D9], [0x104B2, 0x104DA], [0x104B3, 0x104DB], [0x104B4, 0x104DC], [0x104B5, 0x104DD], [0x104B6, 0x104DE], [0x104B7, 0x104DF], [0x104B8, 0x104E0], [0x104B9, 0x104E1], [0x104BA, 0x104E2], [0x104BB, 0x104E3], [0x104BC, 0x104E4], [0x104BD, 0x104E5], [0x104BE, 0x104E6], [0x104BF, 0x104E7], [0x104C0, 0x104E8], [0x104C1, 0x104E9], [0x104C2, 0x104EA], [0x104C3, 0x104EB], [0x104C4, 0x104EC], [0x104C5, 0x104ED], [0x104C6, 0x104EE], [0x104C7, 0x104EF], [0x104C8, 0x104F0], [0x104C9, 0x104F1], [0x104CA, 0x104F2], [0x104CB, 0x104F3], [0x104CC, 0x104F4], [0x104CD, 0x104F5], [0x104CE, 0x104F6], [0x104CF, 0x104F7], [0x104D0, 0x104F8], [0x104D1, 0x104F9], [0x104D2, 0x104FA], [0x104D3, 0x104FB], [0x104D8, 0x104B0], [0x104D9, 0x104B1], [0x104DA, 0x104B2], [0x104DB, 0x104B3], [0x104DC, 0x104B4], [0x104DD, 0x104B5], [0x104DE, 0x104B6], [0x104DF, 0x104B7], [0x104E0, 0x104B8], [0x104E1, 0x104B9], [0x104E2, 0x104BA], [0x104E3, 0x104BB], [0x104E4, 0x104BC], [0x104E5, 0x104BD], [0x104E6, 0x104BE], [0x104E7, 0x104BF], [0x104E8, 0x104C0], [0x104E9, 0x104C1], [0x104EA, 0x104C2], [0x104EB, 0x104C3], [0x104EC, 0x104C4], [0x104ED, 0x104C5], [0x104EE, 0x104C6], [0x104EF, 0x104C7], [0x104F0, 0x104C8], [0x104F1, 0x104C9], [0x104F2, 0x104CA], [0x104F3, 0x104CB], [0x104F4, 0x104CC], [0x104F5, 0x104CD], [0x104F6, 0x104CE], [0x104F7, 0x104CF], [0x104F8, 0x104D0], [0x104F9, 0x104D1], [0x104FA, 0x104D2], [0x104FB, 0x104D3], [0x10C80, 0x10CC0], [0x10C81, 0x10CC1], [0x10C82, 0x10CC2], [0x10C83, 0x10CC3], [0x10C84, 0x10CC4], [0x10C85, 0x10CC5], [0x10C86, 0x10CC6], [0x10C87, 0x10CC7], [0x10C88, 0x10CC8], [0x10C89, 0x10CC9], [0x10C8A, 0x10CCA], [0x10C8B, 0x10CCB], [0x10C8C, 0x10CCC], [0x10C8D, 0x10CCD], [0x10C8E, 0x10CCE], [0x10C8F, 0x10CCF], [0x10C90, 0x10CD0], [0x10C91, 0x10CD1], [0x10C92, 0x10CD2], [0x10C93, 0x10CD3], [0x10C94, 0x10CD4], [0x10C95, 0x10CD5], [0x10C96, 0x10CD6], [0x10C97, 0x10CD7], [0x10C98, 0x10CD8], [0x10C99, 0x10CD9], [0x10C9A, 0x10CDA], [0x10C9B, 0x10CDB], [0x10C9C, 0x10CDC], [0x10C9D, 0x10CDD], [0x10C9E, 0x10CDE], [0x10C9F, 0x10CDF], [0x10CA0, 0x10CE0], [0x10CA1, 0x10CE1], [0x10CA2, 0x10CE2], [0x10CA3, 0x10CE3], [0x10CA4, 0x10CE4], [0x10CA5, 0x10CE5], [0x10CA6, 0x10CE6], [0x10CA7, 0x10CE7], [0x10CA8, 0x10CE8], [0x10CA9, 0x10CE9], [0x10CAA, 0x10CEA], [0x10CAB, 0x10CEB], [0x10CAC, 0x10CEC], [0x10CAD, 0x10CED], [0x10CAE, 0x10CEE], [0x10CAF, 0x10CEF], [0x10CB0, 0x10CF0], [0x10CB1, 0x10CF1], [0x10CB2, 0x10CF2], [0x10CC0, 0x10C80], [0x10CC1, 0x10C81], [0x10CC2, 0x10C82], [0x10CC3, 0x10C83], [0x10CC4, 0x10C84], [0x10CC5, 0x10C85], [0x10CC6, 0x10C86], [0x10CC7, 0x10C87], [0x10CC8, 0x10C88], [0x10CC9, 0x10C89], [0x10CCA, 0x10C8A], [0x10CCB, 0x10C8B], [0x10CCC, 0x10C8C], [0x10CCD, 0x10C8D], [0x10CCE, 0x10C8E], [0x10CCF, 0x10C8F], [0x10CD0, 0x10C90], [0x10CD1, 0x10C91], [0x10CD2, 0x10C92], [0x10CD3, 0x10C93], [0x10CD4, 0x10C94], [0x10CD5, 0x10C95], [0x10CD6, 0x10C96], [0x10CD7, 0x10C97], [0x10CD8, 0x10C98], [0x10CD9, 0x10C99], [0x10CDA, 0x10C9A], [0x10CDB, 0x10C9B], [0x10CDC, 0x10C9C], [0x10CDD, 0x10C9D], [0x10CDE, 0x10C9E], [0x10CDF, 0x10C9F], [0x10CE0, 0x10CA0], [0x10CE1, 0x10CA1], [0x10CE2, 0x10CA2], [0x10CE3, 0x10CA3], [0x10CE4, 0x10CA4], [0x10CE5, 0x10CA5], [0x10CE6, 0x10CA6], [0x10CE7, 0x10CA7], [0x10CE8, 0x10CA8], [0x10CE9, 0x10CA9], [0x10CEA, 0x10CAA], [0x10CEB, 0x10CAB], [0x10CEC, 0x10CAC], [0x10CED, 0x10CAD], [0x10CEE, 0x10CAE], [0x10CEF, 0x10CAF], [0x10CF0, 0x10CB0], [0x10CF1, 0x10CB1], [0x10CF2, 0x10CB2], [0x118A0, 0x118C0], [0x118A1, 0x118C1], [0x118A2, 0x118C2], [0x118A3, 0x118C3], [0x118A4, 0x118C4], [0x118A5, 0x118C5], [0x118A6, 0x118C6], [0x118A7, 0x118C7], [0x118A8, 0x118C8], [0x118A9, 0x118C9], [0x118AA, 0x118CA], [0x118AB, 0x118CB], [0x118AC, 0x118CC], [0x118AD, 0x118CD], [0x118AE, 0x118CE], [0x118AF, 0x118CF], [0x118B0, 0x118D0], [0x118B1, 0x118D1], [0x118B2, 0x118D2], [0x118B3, 0x118D3], [0x118B4, 0x118D4], [0x118B5, 0x118D5], [0x118B6, 0x118D6], [0x118B7, 0x118D7], [0x118B8, 0x118D8], [0x118B9, 0x118D9], [0x118BA, 0x118DA], [0x118BB, 0x118DB], [0x118BC, 0x118DC], [0x118BD, 0x118DD], [0x118BE, 0x118DE], [0x118BF, 0x118DF], [0x118C0, 0x118A0], [0x118C1, 0x118A1], [0x118C2, 0x118A2], [0x118C3, 0x118A3], [0x118C4, 0x118A4], [0x118C5, 0x118A5], [0x118C6, 0x118A6], [0x118C7, 0x118A7], [0x118C8, 0x118A8], [0x118C9, 0x118A9], [0x118CA, 0x118AA], [0x118CB, 0x118AB], [0x118CC, 0x118AC], [0x118CD, 0x118AD], [0x118CE, 0x118AE], [0x118CF, 0x118AF], [0x118D0, 0x118B0], [0x118D1, 0x118B1], [0x118D2, 0x118B2], [0x118D3, 0x118B3], [0x118D4, 0x118B4], [0x118D5, 0x118B5], [0x118D6, 0x118B6], [0x118D7, 0x118B7], [0x118D8, 0x118B8], [0x118D9, 0x118B9], [0x118DA, 0x118BA], [0x118DB, 0x118BB], [0x118DC, 0x118BC], [0x118DD, 0x118BD], [0x118DE, 0x118BE], [0x118DF, 0x118BF], [0x1E900, 0x1E922], [0x1E901, 0x1E923], [0x1E902, 0x1E924], [0x1E903, 0x1E925], [0x1E904, 0x1E926], [0x1E905, 0x1E927], [0x1E906, 0x1E928], [0x1E907, 0x1E929], [0x1E908, 0x1E92A], [0x1E909, 0x1E92B], [0x1E90A, 0x1E92C], [0x1E90B, 0x1E92D], [0x1E90C, 0x1E92E], [0x1E90D, 0x1E92F], [0x1E90E, 0x1E930], [0x1E90F, 0x1E931], [0x1E910, 0x1E932], [0x1E911, 0x1E933], [0x1E912, 0x1E934], [0x1E913, 0x1E935], [0x1E914, 0x1E936], [0x1E915, 0x1E937], [0x1E916, 0x1E938], [0x1E917, 0x1E939], [0x1E918, 0x1E93A], [0x1E919, 0x1E93B], [0x1E91A, 0x1E93C], [0x1E91B, 0x1E93D], [0x1E91C, 0x1E93E], [0x1E91D, 0x1E93F], [0x1E91E, 0x1E940], [0x1E91F, 0x1E941], [0x1E920, 0x1E942], [0x1E921, 0x1E943], [0x1E922, 0x1E900], [0x1E923, 0x1E901], [0x1E924, 0x1E902], [0x1E925, 0x1E903], [0x1E926, 0x1E904], [0x1E927, 0x1E905], [0x1E928, 0x1E906], [0x1E929, 0x1E907], [0x1E92A, 0x1E908], [0x1E92B, 0x1E909], [0x1E92C, 0x1E90A], [0x1E92D, 0x1E90B], [0x1E92E, 0x1E90C], [0x1E92F, 0x1E90D], [0x1E930, 0x1E90E], [0x1E931, 0x1E90F], [0x1E932, 0x1E910], [0x1E933, 0x1E911], [0x1E934, 0x1E912], [0x1E935, 0x1E913], [0x1E936, 0x1E914], [0x1E937, 0x1E915], [0x1E938, 0x1E916], [0x1E939, 0x1E917], [0x1E93A, 0x1E918], [0x1E93B, 0x1E919], [0x1E93C, 0x1E91A], [0x1E93D, 0x1E91B], [0x1E93E, 0x1E91C], [0x1E93F, 0x1E91D], [0x1E940, 0x1E91E], [0x1E941, 0x1E91F], [0x1E942, 0x1E920], [0x1E943, 0x1E921]]);

		var REGULAR = new Map([['d', regenerate().addRange(0x30, 0x39)], ['D', regenerate().addRange(0x0, 0x2F).addRange(0x3A, 0xFFFF)], ['s', regenerate(0x20, 0xA0, 0x1680, 0x202F, 0x205F, 0x3000, 0xFEFF).addRange(0x9, 0xD).addRange(0x2000, 0x200A).addRange(0x2028, 0x2029)], ['S', regenerate().addRange(0x0, 0x8).addRange(0xE, 0x1F).addRange(0x21, 0x9F).addRange(0xA1, 0x167F).addRange(0x1681, 0x1FFF).addRange(0x200B, 0x2027).addRange(0x202A, 0x202E).addRange(0x2030, 0x205E).addRange(0x2060, 0x2FFF).addRange(0x3001, 0xFEFE).addRange(0xFF00, 0xFFFF)], ['w', regenerate(0x5F).addRange(0x30, 0x39).addRange(0x41, 0x5A).addRange(0x61, 0x7A)], ['W', regenerate(0x60).addRange(0x0, 0x2F).addRange(0x3A, 0x40).addRange(0x5B, 0x5E).addRange(0x7B, 0xFFFF)]]);

		var UNICODE = new Map([['d', regenerate().addRange(0x30, 0x39)], ['D', regenerate().addRange(0x0, 0x2F).addRange(0x3A, 0x10FFFF)], ['s', regenerate(0x20, 0xA0, 0x1680, 0x202F, 0x205F, 0x3000, 0xFEFF).addRange(0x9, 0xD).addRange(0x2000, 0x200A).addRange(0x2028, 0x2029)], ['S', regenerate().addRange(0x0, 0x8).addRange(0xE, 0x1F).addRange(0x21, 0x9F).addRange(0xA1, 0x167F).addRange(0x1681, 0x1FFF).addRange(0x200B, 0x2027).addRange(0x202A, 0x202E).addRange(0x2030, 0x205E).addRange(0x2060, 0x2FFF).addRange(0x3001, 0xFEFE).addRange(0xFF00, 0x10FFFF)], ['w', regenerate(0x5F).addRange(0x30, 0x39).addRange(0x41, 0x5A).addRange(0x61, 0x7A)], ['W', regenerate(0x60).addRange(0x0, 0x2F).addRange(0x3A, 0x40).addRange(0x5B, 0x5E).addRange(0x7B, 0x10FFFF)]]);

		var UNICODE_IGNORE_CASE = new Map([['d', regenerate().addRange(0x30, 0x39)], ['D', regenerate().addRange(0x0, 0x2F).addRange(0x3A, 0x10FFFF)], ['s', regenerate(0x20, 0xA0, 0x1680, 0x202F, 0x205F, 0x3000, 0xFEFF).addRange(0x9, 0xD).addRange(0x2000, 0x200A).addRange(0x2028, 0x2029)], ['S', regenerate().addRange(0x0, 0x8).addRange(0xE, 0x1F).addRange(0x21, 0x9F).addRange(0xA1, 0x167F).addRange(0x1681, 0x1FFF).addRange(0x200B, 0x2027).addRange(0x202A, 0x202E).addRange(0x2030, 0x205E).addRange(0x2060, 0x2FFF).addRange(0x3001, 0xFEFE).addRange(0xFF00, 0x10FFFF)], ['w', regenerate(0x5F, 0x17F, 0x212A).addRange(0x30, 0x39).addRange(0x41, 0x5A).addRange(0x61, 0x7A)], ['W', regenerate(0x60).addRange(0x0, 0x2F).addRange(0x3A, 0x40).addRange(0x5B, 0x5E).addRange(0x7B, 0x17E).addRange(0x180, 0x2129).addRange(0x212B, 0x10FFFF)]]);

		var characterClassEscapeSets = {
			REGULAR: REGULAR,
			UNICODE: UNICODE,
			UNICODE_IGNORE_CASE: UNICODE_IGNORE_CASE
		};

		var rewritePattern_1 = createCommonjsModule$$1(function (module) {
			var generate = regjsgen.generate;
			var parse = parser.parse;

			// Prepare a Regenerate set containing all code points, used for negative
			// character classes (if any).
			var UNICODE_SET = regenerate().addRange(0x0, 0x10FFFF);
			// Without the `u` flag, the range stops at 0xFFFF.
			// https://mths.be/es6#sec-pattern-semantics
			var BMP_SET = regenerate().addRange(0x0, 0xFFFF);

			// Prepare a Regenerate set containing all code points that are supposed to be
			// matched by `/./u`. https://mths.be/es6#sec-atom
			var DOT_SET_UNICODE = UNICODE_SET.clone() // all Unicode code points
			.remove(
			// minus `LineTerminator`s (https://mths.be/es6#sec-line-terminators):
			0x000A, // Line Feed <LF>
			0x000D, // Carriage Return <CR>
			0x2028, // Line Separator <LS>
			0x2029 // Paragraph Separator <PS>
			);
			// Prepare a Regenerate set containing all code points that are supposed to be
			// matched by `/./` (only BMP code points).
			var DOT_SET = DOT_SET_UNICODE.clone().intersection(BMP_SET);

			var getCharacterClassEscapeSet = function getCharacterClassEscapeSet(character, unicode, ignoreCase) {
				if (unicode) {
					if (ignoreCase) {
						return characterClassEscapeSets.UNICODE_IGNORE_CASE.get(character);
					}
					return characterClassEscapeSets.UNICODE.get(character);
				}
				return characterClassEscapeSets.REGULAR.get(character);
			};

			var getDotSet = function getDotSet(unicode, dotAll) {
				if (dotAll) {
					return unicode ? UNICODE_SET : BMP_SET;
				}
				return unicode ? DOT_SET_UNICODE : DOT_SET;
			};

			var getUnicodePropertyValueSet = function getUnicodePropertyValueSet(property, value) {
				var path = value ? property + '/' + value : 'Binary_Property/' + property;
				try {
					return commonjsRequire$$1('regenerate-unicode-properties/' + path + '.js');
				} catch (exception) {
					throw new Error('Failed to recognize value `' + value + '` for property ' + ('`' + property + '`.'));
				}
			};

			var handleLoneUnicodePropertyNameOrValue = function handleLoneUnicodePropertyNameOrValue(value) {
				// It could be a `General_Category` value or a binary property.
				// Note: `unicodeMatchPropertyValue` throws on invalid values.
				try {
					var _property = 'General_Category';
					var category = unicodeMatchPropertyValueEcmascript(_property, value);
					return getUnicodePropertyValueSet(_property, category);
				} catch (exception) {}
				// It’s not a `General_Category` value, so check if it’s a binary
				// property. Note: `unicodeMatchProperty` throws on invalid properties.
				var property = unicodeMatchPropertyEcmascript(value);
				return getUnicodePropertyValueSet(property);
			};

			var getUnicodePropertyEscapeSet = function getUnicodePropertyEscapeSet(value, isNegative) {
				var parts = value.split('=');
				var firstPart = parts[0];
				var set$$1 = void 0;
				if (parts.length == 1) {
					set$$1 = handleLoneUnicodePropertyNameOrValue(firstPart);
				} else {
					// The pattern consists of two parts, i.e. `Property=Value`.
					var property = unicodeMatchPropertyEcmascript(firstPart);
					var _value = unicodeMatchPropertyValueEcmascript(property, parts[1]);
					set$$1 = getUnicodePropertyValueSet(property, _value);
				}
				if (isNegative) {
					return UNICODE_SET.clone().remove(set$$1);
				}
				return set$$1.clone();
			};

			// Given a range of code points, add any case-folded code points in that range
			// to a set.
			regenerate.prototype.iuAddRange = function (min, max) {
				var $this = this;
				do {
					var folded = caseFold(min);
					if (folded) {
						$this.add(folded);
					}
				} while (++min <= max);
				return $this;
			};

			var update = function update(item, pattern) {
				var tree = parse(pattern, config.useUnicodeFlag ? 'u' : '');
				switch (tree.type) {
					case 'characterClass':
					case 'group':
					case 'value':
						// No wrapping needed.
						break;
					default:
						// Wrap the pattern in a non-capturing group.
						tree = wrap(tree, pattern);
				}
				Object.assign(item, tree);
			};

			var wrap = function wrap(tree, pattern) {
				// Wrap the pattern in a non-capturing group.
				return {
					'type': 'group',
					'behavior': 'ignore',
					'body': [tree],
					'raw': '(?:' + pattern + ')'
				};
			};

			var caseFold = function caseFold(codePoint) {
				return iuMappings.get(codePoint) || false;
			};

			var processCharacterClass = function processCharacterClass(characterClassItem, regenerateOptions) {
				var set$$1 = regenerate();
				for (var i = 0, list = characterClassItem.body; i < list.length; i += 1) {
					var item = list[i];

					switch (item.type) {
						case 'value':
							set$$1.add(item.codePoint);
							if (config.ignoreCase && config.unicode && !config.useUnicodeFlag) {
								var folded = caseFold(item.codePoint);
								if (folded) {
									set$$1.add(folded);
								}
							}
							break;
						case 'characterClassRange':
							var min = item.min.codePoint;
							var max = item.max.codePoint;
							set$$1.addRange(min, max);
							if (config.ignoreCase && config.unicode && !config.useUnicodeFlag) {
								set$$1.iuAddRange(min, max);
							}
							break;
						case 'characterClassEscape':
							set$$1.add(getCharacterClassEscapeSet(item.value, config.unicode, config.ignoreCase));
							break;
						case 'unicodePropertyEscape':
							set$$1.add(getUnicodePropertyEscapeSet(item.value, item.negative));
							break;
						// The `default` clause is only here as a safeguard; it should never be
						// reached. Code coverage tools should ignore it.
						/* istanbul ignore next */
						default:
							throw new Error('Unknown term type: ' + item.type);
					}
				}
				if (characterClassItem.negative) {
					set$$1 = (config.unicode ? UNICODE_SET : BMP_SET).clone().remove(set$$1);
				}
				update(characterClassItem, set$$1.toString(regenerateOptions));
				return characterClassItem;
			};

			var processTerm = function processTerm(item, regenerateOptions) {
				switch (item.type) {
					case 'dot':
						update(item, getDotSet(config.unicode, config.dotAll).toString(regenerateOptions));
						break;
					case 'characterClass':
						item = processCharacterClass(item, regenerateOptions);
						break;
					case 'unicodePropertyEscape':
						update(item, getUnicodePropertyEscapeSet(item.value, item.negative).toString(regenerateOptions));
						break;
					case 'characterClassEscape':
						update(item, getCharacterClassEscapeSet(item.value, config.unicode, config.ignoreCase).toString(regenerateOptions));
						break;
					case 'alternative':
					case 'disjunction':
					case 'group':
					case 'quantifier':
						item.body = item.body.map(function (term) {
							return processTerm(term, regenerateOptions);
						});
						break;
					case 'value':
						var codePoint = item.codePoint;
						var set$$1 = regenerate(codePoint);
						if (config.ignoreCase && config.unicode && !config.useUnicodeFlag) {
							var folded = caseFold(codePoint);
							if (folded) {
								set$$1.add(folded);
							}
						}
						update(item, set$$1.toString(regenerateOptions));
						break;
					case 'anchor':
					case 'empty':
					case 'group':
					case 'reference':
						// Nothing to do here.
						break;
					// The `default` clause is only here as a safeguard; it should never be
					// reached. Code coverage tools should ignore it.
					/* istanbul ignore next */
					default:
						throw new Error('Unknown term type: ' + item.type);
				}
				return item;
			};

			var config = {
				'ignoreCase': false,
				'unicode': false,
				'dotAll': false,
				'useUnicodeFlag': false
			};
			var rewritePattern = function rewritePattern(pattern, flags, options) {
				var regjsparserFeatures = {
					'unicodePropertyEscape': options && options.unicodePropertyEscape
				};
				config.ignoreCase = flags && flags.includes('i');
				config.unicode = flags && flags.includes('u');
				var supportDotAllFlag = options && options.dotAllFlag;
				config.dotAll = supportDotAllFlag && flags && flags.includes('s');
				config.useUnicodeFlag = options && options.useUnicodeFlag;
				var regenerateOptions = {
					'hasUnicodeFlag': config.useUnicodeFlag,
					'bmpOnly': !config.unicode
				};
				var tree = parse(pattern, flags, regjsparserFeatures);
				// Note: `processTerm` mutates `tree`.
				processTerm(tree, regenerateOptions);
				return generate(tree);
			};

			module.exports = rewritePattern;
		});

		var Literal = function (_Node$27) {
			inherits(Literal, _Node$27);

			function Literal() {
				classCallCheck(this, Literal);
				return possibleConstructorReturn(this, _Node$27.apply(this, arguments));
			}

			Literal.prototype.initialise = function initialise() {
				if (typeof this.value === 'string') {
					this.program.indentExclusionElements.push(this);
				}
			};

			Literal.prototype.transpile = function transpile(code, transforms) {
				if (transforms.numericLiteral) {
					var leading = this.raw.slice(0, 2);
					if (leading === '0b' || leading === '0o') {
						code.overwrite(this.start, this.end, String(this.value), {
							storeName: true,
							contentOnly: true
						});
					}
				}

				if (this.regex) {
					var _ref7 = this.regex;
					var pattern = _ref7.pattern;
					var flags = _ref7.flags;

					if (transforms.stickyRegExp && /y/.test(flags)) throw new CompileError('Regular expression sticky flag is not supported', this);
					if (transforms.unicodeRegExp && /u/.test(flags)) {
						code.overwrite(this.start, this.end, '/' + rewritePattern_1(pattern, flags) + '/' + flags.replace('u', ''), {
							contentOnly: true
						});
					}
				}
			};

			return Literal;
		}(Node$1);

		var MemberExpression = function (_Node$28) {
			inherits(MemberExpression, _Node$28);

			function MemberExpression() {
				classCallCheck(this, MemberExpression);
				return possibleConstructorReturn(this, _Node$28.apply(this, arguments));
			}

			MemberExpression.prototype.transpile = function transpile(code, transforms) {
				if (transforms.reservedProperties && reserved[this.property.name]) {
					code.overwrite(this.object.end, this.property.start, '[\'');
					code.appendLeft(this.property.end, '\']');
				}

				_Node$28.prototype.transpile.call(this, code, transforms);
			};

			return MemberExpression;
		}(Node$1);

		var NewExpression = function (_Node$29) {
			inherits(NewExpression, _Node$29);

			function NewExpression() {
				classCallCheck(this, NewExpression);
				return possibleConstructorReturn(this, _Node$29.apply(this, arguments));
			}

			NewExpression.prototype.initialise = function initialise(transforms) {
				if (transforms.spreadRest && this.arguments.length) {
					var lexicalBoundary = this.findLexicalBoundary();

					var i = this.arguments.length;
					while (i--) {
						var arg = this.arguments[i];
						if (arg.type === 'SpreadElement' && isArguments(arg.argument)) {
							this.argumentsArrayAlias = lexicalBoundary.getArgumentsArrayAlias();
							break;
						}
					}
				}

				_Node$29.prototype.initialise.call(this, transforms);
			};

			NewExpression.prototype.transpile = function transpile(code, transforms) {
				if (transforms.spreadRest && this.arguments.length) {
					var firstArgument = this.arguments[0];
					var isNew = true;
					var hasSpreadElements = spread(code, this.arguments, firstArgument.start, this.argumentsArrayAlias, isNew);

					if (hasSpreadElements) {
						code.prependRight(this.start + 'new'.length, ' (Function.prototype.bind.apply(');
						code.overwrite(this.callee.end, firstArgument.start, ', [ null ].concat( ');
						code.appendLeft(this.end, ' ))');
					}
				}

				_Node$29.prototype.transpile.call(this, code, transforms);
			};

			return NewExpression;
		}(Node$1);

		var ObjectExpression = function (_Node$30) {
			inherits(ObjectExpression, _Node$30);

			function ObjectExpression() {
				classCallCheck(this, ObjectExpression);
				return possibleConstructorReturn(this, _Node$30.apply(this, arguments));
			}

			ObjectExpression.prototype.transpile = function transpile(code, transforms) {
				_Node$30.prototype.transpile.call(this, code, transforms);

				var firstPropertyStart = this.start + 1;
				var regularPropertyCount = 0;
				var spreadPropertyCount = 0;
				var computedPropertyCount = 0;
				var firstSpreadProperty = null;
				var firstComputedProperty = null;

				for (var i = 0; i < this.properties.length; ++i) {
					var prop = this.properties[i];
					if (prop.type === 'SpreadElement') {
						spreadPropertyCount += 1;
						if (firstSpreadProperty === null) firstSpreadProperty = i;
					} else if (prop.computed) {
						computedPropertyCount += 1;
						if (firstComputedProperty === null) firstComputedProperty = i;
					} else if (prop.type === 'Property') {
						regularPropertyCount += 1;
					}
				}

				if (spreadPropertyCount) {
					if (!this.program.options.objectAssign) {
						throw new CompileError("Object spread operator requires specified objectAssign option with 'Object.assign' or polyfill helper.", this);
					}
					// enclose run of non-spread properties in curlies
					var _i4 = this.properties.length;
					if (regularPropertyCount && !computedPropertyCount) {
						while (_i4--) {
							var _prop = this.properties[_i4];

							if (_prop.type === 'Property' && !_prop.computed) {
								var lastProp = this.properties[_i4 - 1];
								var nextProp = this.properties[_i4 + 1];

								if (!lastProp || lastProp.type !== 'Property' || lastProp.computed) {
									code.prependRight(_prop.start, '{');
								}

								if (!nextProp || nextProp.type !== 'Property' || nextProp.computed) {
									code.appendLeft(_prop.end, '}');
								}
							}
						}
					}

					// wrap the whole thing in Object.assign
					firstPropertyStart = this.properties[0].start;
					if (!computedPropertyCount) {
						code.overwrite(this.start, firstPropertyStart, this.program.options.objectAssign + '({}, ');
						code.overwrite(this.properties[this.properties.length - 1].end, this.end, ')');
					} else if (this.properties[0].type === 'SpreadElement') {
						code.overwrite(this.start, firstPropertyStart, this.program.options.objectAssign + '({}, ');
						code.remove(this.end - 1, this.end);
						code.appendRight(this.end, ')');
					} else {
						code.prependLeft(this.start, this.program.options.objectAssign + '(');
						code.appendRight(this.end, ')');
					}
				}

				if (computedPropertyCount && transforms.computedProperty) {
					var i0 = this.getIndentation();

					var isSimpleAssignment = void 0;
					var name = void 0;

					if (this.parent.type === 'VariableDeclarator' && this.parent.parent.declarations.length === 1 && this.parent.id.type === 'Identifier') {
						isSimpleAssignment = true;
						name = this.parent.id.alias || this.parent.id.name; // TODO is this right?
					} else if (this.parent.type === 'AssignmentExpression' && this.parent.parent.type === 'ExpressionStatement' && this.parent.left.type === 'Identifier') {
						isSimpleAssignment = true;
						name = this.parent.left.alias || this.parent.left.name; // TODO is this right?
					} else if (this.parent.type === 'AssignmentPattern' && this.parent.left.type === 'Identifier') {
						isSimpleAssignment = true;
						name = this.parent.left.alias || this.parent.left.name; // TODO is this right?
					}

					if (spreadPropertyCount) isSimpleAssignment = false;

					// handle block scoping
					var declaration = this.findScope(false).findDeclaration(name);
					if (declaration) name = declaration.name;

					var start = firstPropertyStart;
					var end = this.end;

					if (isSimpleAssignment) {
						// ???
					} else {
						if (firstSpreadProperty === null || firstComputedProperty < firstSpreadProperty) {
							name = this.findLexicalBoundary().declareIdentifier('obj');

							code.prependRight(this.start, '( ' + name + ' = ');
						} else name = null; // We don't actually need this variable
					}

					var len = this.properties.length;
					var lastComputedProp = void 0;
					var sawNonComputedProperty = false;
					var isFirst = true;

					for (var _i5 = 0; _i5 < len; _i5 += 1) {
						var _prop2 = this.properties[_i5];
						var moveStart = _i5 > 0 ? this.properties[_i5 - 1].end : start;

						if (_prop2.type === 'Property' && (_prop2.computed || lastComputedProp && !spreadPropertyCount)) {
							if (_i5 === 0) moveStart = this.start + 1; // Trim leading whitespace
							lastComputedProp = _prop2;

							if (!name) {
								name = this.findLexicalBoundary().declareIdentifier('obj');

								var propId = name + (_prop2.computed ? '' : '.');
								code.appendRight(_prop2.start, '( ' + name + ' = {}, ' + propId);
							} else {
								var _propId = (isSimpleAssignment ? ';\n' + i0 + name : ', ' + name) + (_prop2.computed ? '' : '.');

								if (moveStart < _prop2.start) {
									code.overwrite(moveStart, _prop2.start, _propId);
								} else {
									code.prependRight(_prop2.start, _propId);
								}
							}

							var _c2 = _prop2.key.end;
							if (_prop2.computed) {
								while (code.original[_c2] !== ']') {
									_c2 += 1;
								}_c2 += 1;
							}
							if (_prop2.shorthand) {
								code.overwrite(_prop2.start, _prop2.key.end, code.slice(_prop2.start, _prop2.key.end).replace(/:/, ' ='));
							} else {
								if (_prop2.value.start > _c2) code.remove(_c2, _prop2.value.start);
								code.appendLeft(_c2, ' = ');
							}

							if (_prop2.method && transforms.conciseMethodProperty) {
								code.prependRight(_prop2.value.start, 'function ');
							}
						} else if (_prop2.type === 'SpreadElement') {
							if (name && _i5 > 0) {
								if (!lastComputedProp) {
									lastComputedProp = this.properties[_i5 - 1];
								}
								code.appendLeft(lastComputedProp.end, ', ' + name + ' )');

								lastComputedProp = null;
								name = null;
							}
						} else {
							if (!isFirst && spreadPropertyCount) {
								// We are in an Object.assign context, so we need to wrap regular properties
								code.prependRight(_prop2.start, '{');
								code.appendLeft(_prop2.end, '}');
							}
							sawNonComputedProperty = true;
						}
						if (isFirst && (_prop2.type === 'SpreadElement' || _prop2.computed)) {
							var beginEnd = sawNonComputedProperty ? this.properties[this.properties.length - 1].end : this.end - 1;
							// Trim trailing comma because it can easily become a leading comma which is illegal
							if (code.original[beginEnd] == ',') ++beginEnd;
							var closing = code.slice(beginEnd, end);
							code.prependLeft(moveStart, closing);
							code.remove(beginEnd, end);
							isFirst = false;
						}

						// Clean up some extranous whitespace
						var c = _prop2.end;
						if (_i5 < len - 1 && !sawNonComputedProperty) {
							while (code.original[c] !== ',') {
								c += 1;
							}
						} else if (_i5 == len - 1) c = this.end;
						code.remove(_prop2.end, c);
					}

					// special case
					if (computedPropertyCount === len) {
						code.remove(this.properties[len - 1].end, this.end - 1);
					}

					if (!isSimpleAssignment && name) {
						code.appendLeft(lastComputedProp.end, ', ' + name + ' )');
					}
				}
			};

			return ObjectExpression;
		}(Node$1);

		var Property = function (_Node$31) {
			inherits(Property, _Node$31);

			function Property() {
				classCallCheck(this, Property);
				return possibleConstructorReturn(this, _Node$31.apply(this, arguments));
			}

			Property.prototype.transpile = function transpile(code, transforms) {
				_Node$31.prototype.transpile.call(this, code, transforms);

				if (transforms.conciseMethodProperty && !this.computed && this.parent.type !== 'ObjectPattern') {
					if (this.shorthand) {
						code.prependRight(this.start, this.key.name + ': ');
					} else if (this.method) {
						var name = '';
						if (this.program.options.namedFunctionExpressions !== false) {
							if (this.key.type === 'Literal' && typeof this.key.value === 'number') {
								name = '';
							} else if (this.key.type === 'Identifier') {
								if (reserved[this.key.name] || !/^[a-z_$][a-z0-9_$]*$/i.test(this.key.name) || this.value.body.scope.references[this.key.name]) {
									name = this.findScope(true).createIdentifier(this.key.name);
								} else {
									name = this.key.name;
								}
							} else {
								name = this.findScope(true).createIdentifier(this.key.value);
							}
							name = ' ' + name;
						}

						if (this.value.generator) code.remove(this.start, this.key.start);
						code.appendLeft(this.key.end, ': function' + (this.value.generator ? '*' : '') + name);
					}
				}

				if (transforms.reservedProperties && reserved[this.key.name]) {
					code.prependRight(this.key.start, '\'');
					code.appendLeft(this.key.end, '\'');
				}
			};

			return Property;
		}(Node$1);

		var ReturnStatement = function (_Node$32) {
			inherits(ReturnStatement, _Node$32);

			function ReturnStatement() {
				classCallCheck(this, ReturnStatement);
				return possibleConstructorReturn(this, _Node$32.apply(this, arguments));
			}

			ReturnStatement.prototype.initialise = function initialise(transforms) {
				this.loop = this.findNearest(loopStatement);
				this.nearestFunction = this.findNearest(/Function/);

				if (this.loop && (!this.nearestFunction || this.loop.depth > this.nearestFunction.depth)) {
					this.loop.canReturn = true;
					this.shouldWrap = true;
				}

				if (this.argument) this.argument.initialise(transforms);
			};

			ReturnStatement.prototype.transpile = function transpile(code, transforms) {
				var shouldWrap = this.shouldWrap && this.loop && this.loop.shouldRewriteAsFunction;

				if (this.argument) {
					if (shouldWrap) code.prependRight(this.argument.start, '{ v: ');
					this.argument.transpile(code, transforms);
					if (shouldWrap) code.appendLeft(this.argument.end, ' }');
				} else if (shouldWrap) {
					code.appendLeft(this.start + 6, ' {}');
				}
			};

			return ReturnStatement;
		}(Node$1);

		var SpreadElement = function (_Node$33) {
			inherits(SpreadElement, _Node$33);

			function SpreadElement() {
				classCallCheck(this, SpreadElement);
				return possibleConstructorReturn(this, _Node$33.apply(this, arguments));
			}

			SpreadElement.prototype.transpile = function transpile(code, transforms) {
				if (this.parent.type == 'ObjectExpression') {
					code.remove(this.start, this.argument.start);
					code.remove(this.argument.end, this.end);
				}

				_Node$33.prototype.transpile.call(this, code, transforms);
			};

			return SpreadElement;
		}(Node$1);

		var Super = function (_Node$34) {
			inherits(Super, _Node$34);

			function Super() {
				classCallCheck(this, Super);
				return possibleConstructorReturn(this, _Node$34.apply(this, arguments));
			}

			Super.prototype.initialise = function initialise(transforms) {
				if (transforms.classes) {
					this.method = this.findNearest('MethodDefinition');
					if (!this.method) throw new CompileError(this, 'use of super outside class method');

					var parentClass = this.findNearest('ClassBody').parent;
					this.superClassName = parentClass.superClass && (parentClass.superClass.name || 'superclass');

					if (!this.superClassName) throw new CompileError('super used in base class', this);

					this.isCalled = this.parent.type === 'CallExpression' && this === this.parent.callee;

					if (this.method.kind !== 'constructor' && this.isCalled) {
						throw new CompileError('super() not allowed outside class constructor', this);
					}

					this.isMember = this.parent.type === 'MemberExpression';

					if (!this.isCalled && !this.isMember) {
						throw new CompileError('Unexpected use of `super` (expected `super(...)` or `super.*`)', this);
					}
				}

				if (transforms.arrow) {
					var lexicalBoundary = this.findLexicalBoundary();
					var arrowFunction = this.findNearest('ArrowFunctionExpression');
					var _loop3 = this.findNearest(loopStatement);

					if (arrowFunction && arrowFunction.depth > lexicalBoundary.depth) {
						this.thisAlias = lexicalBoundary.getThisAlias();
					}

					if (_loop3 && _loop3.body.contains(this) && _loop3.depth > lexicalBoundary.depth) {
						this.thisAlias = lexicalBoundary.getThisAlias();
					}
				}
			};

			Super.prototype.transpile = function transpile(code, transforms) {
				if (transforms.classes) {
					var expression = this.isCalled || this.method.static ? this.superClassName : this.superClassName + '.prototype';

					code.overwrite(this.start, this.end, expression, {
						storeName: true,
						contentOnly: true
					});

					var callExpression = this.isCalled ? this.parent : this.parent.parent;

					if (callExpression && callExpression.type === 'CallExpression') {
						if (!this.noCall) {
							// special case – `super( ...args )`
							code.appendLeft(callExpression.callee.end, '.call');
						}

						var thisAlias = this.thisAlias || 'this';

						if (callExpression.arguments.length) {
							code.appendLeft(callExpression.arguments[0].start, thisAlias + ', ');
						} else {
							code.appendLeft(callExpression.end - 1, '' + thisAlias);
						}
					}
				}
			};

			return Super;
		}(Node$1);

		var TaggedTemplateExpression = function (_Node$35) {
			inherits(TaggedTemplateExpression, _Node$35);

			function TaggedTemplateExpression() {
				classCallCheck(this, TaggedTemplateExpression);
				return possibleConstructorReturn(this, _Node$35.apply(this, arguments));
			}

			TaggedTemplateExpression.prototype.initialise = function initialise(transforms) {
				if (transforms.templateString && !transforms.dangerousTaggedTemplateString) {
					throw new CompileError("Tagged template strings are not supported. Use `transforms: { templateString: false }` to skip transformation and disable this error, or `transforms: { dangerousTaggedTemplateString: true }` if you know what you're doing", this);
				}

				_Node$35.prototype.initialise.call(this, transforms);
			};

			TaggedTemplateExpression.prototype.transpile = function transpile(code, transforms) {
				if (transforms.templateString && transforms.dangerousTaggedTemplateString) {
					var ordered = this.quasi.expressions.concat(this.quasi.quasis).sort(function (a, b) {
						return a.start - b.start;
					});

					// insert strings at start
					var templateStrings = this.quasi.quasis.map(function (quasi) {
						return JSON.stringify(quasi.value.cooked);
					});
					code.overwrite(this.tag.end, ordered[0].start, '([' + templateStrings.join(', ') + ']');

					var lastIndex = ordered[0].start;
					ordered.forEach(function (node) {
						if (node.type === 'TemplateElement') {
							code.remove(lastIndex, node.end);
						} else {
							code.overwrite(lastIndex, node.start, ', ');
						}

						lastIndex = node.end;
					});

					code.overwrite(lastIndex, this.end, ')');
				}

				_Node$35.prototype.transpile.call(this, code, transforms);
			};

			return TaggedTemplateExpression;
		}(Node$1);

		var TemplateElement = function (_Node$36) {
			inherits(TemplateElement, _Node$36);

			function TemplateElement() {
				classCallCheck(this, TemplateElement);
				return possibleConstructorReturn(this, _Node$36.apply(this, arguments));
			}

			TemplateElement.prototype.initialise = function initialise() {
				this.program.indentExclusionElements.push(this);
			};

			return TemplateElement;
		}(Node$1);

		var TemplateLiteral = function (_Node$37) {
			inherits(TemplateLiteral, _Node$37);

			function TemplateLiteral() {
				classCallCheck(this, TemplateLiteral);
				return possibleConstructorReturn(this, _Node$37.apply(this, arguments));
			}

			TemplateLiteral.prototype.transpile = function transpile(code, transforms) {
				_Node$37.prototype.transpile.call(this, code, transforms);

				if (transforms.templateString && this.parent.type !== 'TaggedTemplateExpression') {
					var ordered = this.expressions.concat(this.quasis).sort(function (a, b) {
						return a.start - b.start || a.end - b.end;
					}).filter(function (node, i) {
						// include all expressions
						if (node.type !== 'TemplateElement') return true;

						// include all non-empty strings
						if (node.value.raw) return true;

						// exclude all empty strings not at the head
						return !i;
					});

					// special case – we may be able to skip the first element,
					// if it's the empty string, but only if the second and
					// third elements aren't both expressions (since they maybe
					// be numeric, and `1 + 2 + '3' === '33'`)
					if (ordered.length >= 3) {
						var first = ordered[0];
						var third = ordered[2];
						if (first.type === 'TemplateElement' && first.value.raw === '' && third.type === 'TemplateElement') {
							ordered.shift();
						}
					}

					var parenthesise = (this.quasis.length !== 1 || this.expressions.length !== 0) && this.parent.type !== 'TemplateLiteral' && this.parent.type !== 'AssignmentExpression' && this.parent.type !== 'AssignmentPattern' && this.parent.type !== 'VariableDeclarator' && (this.parent.type !== 'BinaryExpression' || this.parent.operator !== '+');

					if (parenthesise) code.appendRight(this.start, '(');

					var lastIndex = this.start;

					ordered.forEach(function (node, i) {
						var prefix = i === 0 ? parenthesise ? '(' : '' : ' + ';

						if (node.type === 'TemplateElement') {
							code.overwrite(lastIndex, node.end, prefix + JSON.stringify(node.value.cooked));
						} else {
							var _parenthesise = node.type !== 'Identifier'; // TODO other cases where it's safe

							if (_parenthesise) prefix += '(';

							code.remove(lastIndex, node.start);

							if (prefix) code.prependRight(node.start, prefix);
							if (_parenthesise) code.appendLeft(node.end, ')');
						}

						lastIndex = node.end;
					});

					if (parenthesise) code.appendLeft(lastIndex, ')');
					code.remove(lastIndex, this.end);
				}
			};

			return TemplateLiteral;
		}(Node$1);

		var ThisExpression = function (_Node$38) {
			inherits(ThisExpression, _Node$38);

			function ThisExpression() {
				classCallCheck(this, ThisExpression);
				return possibleConstructorReturn(this, _Node$38.apply(this, arguments));
			}

			ThisExpression.prototype.initialise = function initialise(transforms) {
				if (transforms.arrow) {
					var lexicalBoundary = this.findLexicalBoundary();
					var arrowFunction = this.findNearest('ArrowFunctionExpression');
					var _loop4 = this.findNearest(loopStatement);

					if (arrowFunction && arrowFunction.depth > lexicalBoundary.depth || _loop4 && _loop4.body.contains(this) && _loop4.depth > lexicalBoundary.depth || _loop4 && _loop4.right && _loop4.right.contains(this)) {
						this.alias = lexicalBoundary.getThisAlias();
					}
				}
			};

			ThisExpression.prototype.transpile = function transpile(code) {
				if (this.alias) {
					code.overwrite(this.start, this.end, this.alias, {
						storeName: true,
						contentOnly: true
					});
				}
			};

			return ThisExpression;
		}(Node$1);

		var UpdateExpression = function (_Node$39) {
			inherits(UpdateExpression, _Node$39);

			function UpdateExpression() {
				classCallCheck(this, UpdateExpression);
				return possibleConstructorReturn(this, _Node$39.apply(this, arguments));
			}

			UpdateExpression.prototype.initialise = function initialise(transforms) {
				if (this.argument.type === 'Identifier') {
					var declaration = this.findScope(false).findDeclaration(this.argument.name);
					if (declaration && declaration.kind === 'const') {
						throw new CompileError(this.argument.name + ' is read-only', this);
					}

					// special case – https://gitlab.com/Rich-Harris/buble/issues/150
					var statement = declaration && declaration.node.ancestor(3);
					if (statement && statement.type === 'ForStatement' && statement.body.contains(this)) {
						statement.reassigned[this.argument.name] = true;
					}
				}

				_Node$39.prototype.initialise.call(this, transforms);
			};

			return UpdateExpression;
		}(Node$1);

		var VariableDeclaration = function (_Node$40) {
			inherits(VariableDeclaration, _Node$40);

			function VariableDeclaration() {
				classCallCheck(this, VariableDeclaration);
				return possibleConstructorReturn(this, _Node$40.apply(this, arguments));
			}

			VariableDeclaration.prototype.initialise = function initialise(transforms) {
				this.scope = this.findScope(this.kind === 'var');
				this.declarations.forEach(function (declarator) {
					return declarator.initialise(transforms);
				});
			};

			VariableDeclaration.prototype.transpile = function transpile(code, transforms) {
				var _this49 = this;

				var i0 = this.getIndentation();
				var kind = this.kind;

				if (transforms.letConst && kind !== 'var') {
					kind = 'var';
					code.overwrite(this.start, this.start + this.kind.length, kind, {
						storeName: true
					});
				}

				if (transforms.destructuring && this.parent.type !== 'ForOfStatement') {
					var c = this.start;
					var lastDeclaratorIsPattern = void 0;

					this.declarations.forEach(function (declarator, i) {
						declarator.transpile(code, transforms);

						if (declarator.id.type === 'Identifier') {
							if (i > 0 && _this49.declarations[i - 1].id.type !== 'Identifier') {
								code.overwrite(c, declarator.id.start, 'var ');
							}
						} else {
							var inline = loopStatement.test(_this49.parent.type);

							if (i === 0) {
								code.remove(c, declarator.id.start);
							} else {
								code.overwrite(c, declarator.id.start, ';\n' + i0);
							}

							var simple = declarator.init.type === 'Identifier' && !declarator.init.rewritten;

							var name = simple ? declarator.init.name : declarator.findScope(true).createIdentifier('ref');

							c = declarator.start;

							var statementGenerators = [];

							if (simple) {
								code.remove(declarator.id.end, declarator.end);
							} else {
								statementGenerators.push(function (start, prefix, suffix) {
									code.prependRight(declarator.id.end, 'var ' + name);
									code.appendLeft(declarator.init.end, '' + suffix);
									code.move(declarator.id.end, declarator.end, start);
								});
							}

							destructure(code, declarator.findScope(false), declarator.id, name, inline, statementGenerators);

							var prefix = inline ? 'var ' : '';
							var suffix = inline ? ', ' : ';\n' + i0;
							statementGenerators.forEach(function (fn, j) {
								if (i === _this49.declarations.length - 1 && j === statementGenerators.length - 1) {
									suffix = inline ? '' : ';';
								}

								fn(declarator.start, j === 0 ? prefix : '', suffix);
							});
						}

						c = declarator.end;
						lastDeclaratorIsPattern = declarator.id.type !== 'Identifier';
					});

					if (lastDeclaratorIsPattern && this.end > c) {
						code.overwrite(c, this.end, '', { contentOnly: true });
					}
				} else {
					this.declarations.forEach(function (declarator) {
						declarator.transpile(code, transforms);
					});
				}
			};

			return VariableDeclaration;
		}(Node$1);

		var VariableDeclarator = function (_Node$41) {
			inherits(VariableDeclarator, _Node$41);

			function VariableDeclarator() {
				classCallCheck(this, VariableDeclarator);
				return possibleConstructorReturn(this, _Node$41.apply(this, arguments));
			}

			VariableDeclarator.prototype.initialise = function initialise(transforms) {
				var kind = this.parent.kind;
				if (kind === 'let' && this.parent.parent.type === 'ForStatement') {
					kind = 'for.let'; // special case...
				}

				this.parent.scope.addDeclaration(this.id, kind);
				_Node$41.prototype.initialise.call(this, transforms);
			};

			VariableDeclarator.prototype.transpile = function transpile(code, transforms) {
				if (!this.init && transforms.letConst && this.parent.kind !== 'var') {
					var inLoop = this.findNearest(/Function|^For(In|Of)?Statement|^(?:Do)?WhileStatement/);
					if (inLoop && !/Function/.test(inLoop.type) && !this.isLeftDeclaratorOfLoop()) {
						code.appendLeft(this.id.end, ' = (void 0)');
					}
				}

				if (this.id) this.id.transpile(code, transforms);
				if (this.init) this.init.transpile(code, transforms);
			};

			VariableDeclarator.prototype.isLeftDeclaratorOfLoop = function isLeftDeclaratorOfLoop() {
				return this.parent && this.parent.type === 'VariableDeclaration' && this.parent.parent && (this.parent.parent.type === 'ForInStatement' || this.parent.parent.type === 'ForOfStatement') && this.parent.parent.left && this.parent.parent.left.declarations[0] === this;
			};

			return VariableDeclarator;
		}(Node$1);

		var types$1$1 = {
			ArrayExpression: ArrayExpression,
			ArrowFunctionExpression: ArrowFunctionExpression,
			AssignmentExpression: AssignmentExpression,
			BinaryExpression: BinaryExpression,
			BreakStatement: BreakStatement,
			CallExpression: CallExpression,
			ClassBody: ClassBody,
			ClassDeclaration: ClassDeclaration,
			ClassExpression: ClassExpression,
			ContinueStatement: ContinueStatement,
			DoWhileStatement: LoopStatement,
			ExportNamedDeclaration: ExportNamedDeclaration,
			ExportDefaultDeclaration: ExportDefaultDeclaration,
			ForStatement: ForStatement,
			ForInStatement: ForInStatement,
			ForOfStatement: ForOfStatement,
			FunctionDeclaration: FunctionDeclaration,
			FunctionExpression: FunctionExpression,
			Identifier: Identifier,
			IfStatement: IfStatement,
			ImportDeclaration: ImportDeclaration,
			ImportDefaultSpecifier: ImportDefaultSpecifier,
			ImportSpecifier: ImportSpecifier,
			JSXAttribute: JSXAttribute,
			JSXClosingElement: JSXClosingElement,
			JSXElement: JSXElement,
			JSXExpressionContainer: JSXExpressionContainer,
			JSXOpeningElement: JSXOpeningElement,
			JSXSpreadAttribute: JSXSpreadAttribute,
			Literal: Literal,
			MemberExpression: MemberExpression,
			NewExpression: NewExpression,
			ObjectExpression: ObjectExpression,
			Property: Property,
			ReturnStatement: ReturnStatement,
			SpreadElement: SpreadElement,
			Super: Super,
			TaggedTemplateExpression: TaggedTemplateExpression,
			TemplateElement: TemplateElement,
			TemplateLiteral: TemplateLiteral,
			ThisExpression: ThisExpression,
			UpdateExpression: UpdateExpression,
			VariableDeclaration: VariableDeclaration,
			VariableDeclarator: VariableDeclarator,
			WhileStatement: LoopStatement
		};

		var statementsWithBlocks = {
			IfStatement: 'consequent',
			ForStatement: 'body',
			ForInStatement: 'body',
			ForOfStatement: 'body',
			WhileStatement: 'body',
			DoWhileStatement: 'body',
			ArrowFunctionExpression: 'body'
		};

		function wrap(raw, parent) {
			if (!raw) return;

			if ('length' in raw) {
				var i = raw.length;
				while (i--) {
					wrap(raw[i], parent);
				}return;
			}

			// with e.g. shorthand properties, key and value are
			// the same node. We don't want to wrap an object twice
			if (raw.__wrapped) return;
			raw.__wrapped = true;

			if (!keys[raw.type]) {
				keys[raw.type] = Object.keys(raw).filter(function (key) {
					return _typeof(raw[key]) === 'object';
				});
			}

			// special case – body-less if/for/while statements. TODO others?
			var bodyType = statementsWithBlocks[raw.type];
			if (bodyType && raw[bodyType].type !== 'BlockStatement') {
				var expression = raw[bodyType];

				// create a synthetic block statement, otherwise all hell
				// breaks loose when it comes to block scoping
				raw[bodyType] = {
					start: expression.start,
					end: expression.end,
					type: 'BlockStatement',
					body: [expression],
					synthetic: true
				};
			}

			new Node$1(raw, parent);

			var type = (raw.type === 'BlockStatement' ? BlockStatement : types$1$1[raw.type]) || Node$1;
			raw.__proto__ = type.prototype;
		}

		function Scope(options) {
			options = options || {};

			this.parent = options.parent;
			this.isBlockScope = !!options.block;

			var scope = this;
			while (scope.isBlockScope) {
				scope = scope.parent;
			}this.functionScope = scope;

			this.identifiers = [];
			this.declarations = Object.create(null);
			this.references = Object.create(null);
			this.blockScopedDeclarations = this.isBlockScope ? null : Object.create(null);
			this.aliases = this.isBlockScope ? null : Object.create(null);
		}

		Scope.prototype = {
			addDeclaration: function addDeclaration(node, kind) {
				for (var i = 0, list = extractNames(node); i < list.length; i += 1) {
					var identifier = list[i];

					var name = identifier.name;

					var declaration = { name: name, node: identifier, kind: kind, instances: [] };
					this.declarations[name] = declaration;

					if (this.isBlockScope) {
						if (!this.functionScope.blockScopedDeclarations[name]) this.functionScope.blockScopedDeclarations[name] = [];
						this.functionScope.blockScopedDeclarations[name].push(declaration);
					}
				}
			},
			addReference: function addReference(identifier) {
				if (this.consolidated) {
					this.consolidateReference(identifier);
				} else {
					this.identifiers.push(identifier);
				}
			},
			consolidate: function consolidate() {
				for (var i = 0; i < this.identifiers.length; i += 1) {
					// we might push to the array during consolidation, so don't cache length
					var identifier = this.identifiers[i];
					this.consolidateReference(identifier);
				}

				this.consolidated = true; // TODO understand why this is necessary... seems bad
			},
			consolidateReference: function consolidateReference(identifier) {
				var declaration = this.declarations[identifier.name];
				if (declaration) {
					declaration.instances.push(identifier);
				} else {
					this.references[identifier.name] = true;
					if (this.parent) this.parent.addReference(identifier);
				}
			},
			contains: function contains(name) {
				return this.declarations[name] || (this.parent ? this.parent.contains(name) : false);
			},
			createIdentifier: function createIdentifier(base) {
				if (typeof base === 'number') base = base.toString();

				base = base.replace(/\s/g, '').replace(/\[([^\]]+)\]/g, '_$1').replace(/[^a-zA-Z0-9_$]/g, '_').replace(/_{2,}/, '_');

				var name = base;
				var counter = 1;

				while (this.declarations[name] || this.references[name] || this.aliases[name] || name in reserved) {
					name = base + '$' + counter++;
				}

				this.aliases[name] = true;
				return name;
			},
			findDeclaration: function findDeclaration(name) {
				return this.declarations[name] || this.parent && this.parent.findDeclaration(name);
			}
		};

		function isUseStrict(node) {
			if (!node) return false;
			if (node.type !== 'ExpressionStatement') return false;
			if (node.expression.type !== 'Literal') return false;
			return node.expression.value === 'use strict';
		}

		var BlockStatement = function (_Node$42) {
			inherits(BlockStatement, _Node$42);

			function BlockStatement() {
				classCallCheck(this, BlockStatement);
				return possibleConstructorReturn(this, _Node$42.apply(this, arguments));
			}

			BlockStatement.prototype.createScope = function createScope() {
				var _this52 = this;

				this.parentIsFunction = /Function/.test(this.parent.type);
				this.isFunctionBlock = this.parentIsFunction || this.parent.type === 'Root';
				this.scope = new Scope({
					block: !this.isFunctionBlock,
					parent: this.parent.findScope(false)
				});

				if (this.parentIsFunction) {
					this.parent.params.forEach(function (node) {
						_this52.scope.addDeclaration(node, 'param');
					});
				}
			};

			BlockStatement.prototype.initialise = function initialise(transforms) {
				this.thisAlias = null;
				this.argumentsAlias = null;
				this.defaultParameters = [];
				this.createdDeclarations = [];

				// normally the scope gets created here, during initialisation,
				// but in some cases (e.g. `for` statements), we need to create
				// the scope early, as it pertains to both the init block and
				// the body of the statement
				if (!this.scope) this.createScope();

				this.body.forEach(function (node) {
					return node.initialise(transforms);
				});

				this.scope.consolidate();
			};

			BlockStatement.prototype.findLexicalBoundary = function findLexicalBoundary() {
				if (this.type === 'Program') return this;
				if (/^Function/.test(this.parent.type)) return this;

				return this.parent.findLexicalBoundary();
			};

			BlockStatement.prototype.findScope = function findScope(functionScope) {
				if (functionScope && !this.isFunctionBlock) return this.parent.findScope(functionScope);
				return this.scope;
			};

			BlockStatement.prototype.getArgumentsAlias = function getArgumentsAlias() {
				if (!this.argumentsAlias) {
					this.argumentsAlias = this.scope.createIdentifier('arguments');
				}

				return this.argumentsAlias;
			};

			BlockStatement.prototype.getArgumentsArrayAlias = function getArgumentsArrayAlias() {
				if (!this.argumentsArrayAlias) {
					this.argumentsArrayAlias = this.scope.createIdentifier('argsArray');
				}

				return this.argumentsArrayAlias;
			};

			BlockStatement.prototype.getThisAlias = function getThisAlias() {
				if (!this.thisAlias) {
					this.thisAlias = this.scope.createIdentifier('this');
				}

				return this.thisAlias;
			};

			BlockStatement.prototype.getIndentation = function getIndentation() {
				if (this.indentation === undefined) {
					var source = this.program.magicString.original;

					var useOuter = this.synthetic || !this.body.length;
					var c = useOuter ? this.start : this.body[0].start;

					while (c && source[c] !== '\n') {
						c -= 1;
					}this.indentation = '';

					// eslint-disable-next-line no-constant-condition
					while (true) {
						c += 1;
						var char = source[c];

						if (char !== ' ' && char !== '\t') break;

						this.indentation += char;
					}

					var indentString = this.program.magicString.getIndentString();

					// account for dedented class constructors
					var parent = this.parent;
					while (parent) {
						if (parent.kind === 'constructor' && !parent.parent.parent.superClass) {
							this.indentation = this.indentation.replace(indentString, '');
						}

						parent = parent.parent;
					}

					if (useOuter) this.indentation += indentString;
				}

				return this.indentation;
			};

			BlockStatement.prototype.transpile = function transpile(code, transforms) {
				var _this53 = this;

				var indentation = this.getIndentation();

				var introStatementGenerators = [];

				if (this.argumentsAlias) {
					introStatementGenerators.push(function (start, prefix, suffix) {
						var assignment = prefix + 'var ' + _this53.argumentsAlias + ' = arguments' + suffix;
						code.appendLeft(start, assignment);
					});
				}

				if (this.thisAlias) {
					introStatementGenerators.push(function (start, prefix, suffix) {
						var assignment = prefix + 'var ' + _this53.thisAlias + ' = this' + suffix;
						code.appendLeft(start, assignment);
					});
				}

				if (this.argumentsArrayAlias) {
					introStatementGenerators.push(function (start, prefix, suffix) {
						var i = _this53.scope.createIdentifier('i');
						var assignment = prefix + 'var ' + i + ' = arguments.length, ' + _this53.argumentsArrayAlias + ' = Array(' + i + ');\n' + indentation + 'while ( ' + i + '-- ) ' + _this53.argumentsArrayAlias + '[' + i + '] = arguments[' + i + ']' + suffix;
						code.appendLeft(start, assignment);
					});
				}

				if (/Function/.test(this.parent.type)) {
					this.transpileParameters(code, transforms, indentation, introStatementGenerators);
				}

				if (transforms.letConst && this.isFunctionBlock) {
					this.transpileBlockScopedIdentifiers(code);
				}

				_Node$42.prototype.transpile.call(this, code, transforms);

				if (this.createdDeclarations.length) {
					introStatementGenerators.push(function (start, prefix, suffix) {
						var assignment = prefix + 'var ' + _this53.createdDeclarations.join(', ') + suffix;
						code.appendLeft(start, assignment);
					});
				}

				if (this.synthetic) {
					if (this.parent.type === 'ArrowFunctionExpression') {
						var expr = this.body[0];

						if (introStatementGenerators.length) {
							code.appendLeft(this.start, '{').prependRight(this.end, this.parent.getIndentation() + '}');

							code.prependRight(expr.start, '\n' + indentation + 'return ');
							code.appendLeft(expr.end, ';\n');
						} else if (transforms.arrow) {
							code.prependRight(expr.start, '{ return ');
							code.appendLeft(expr.end, '; }');
						}
					} else if (introStatementGenerators.length) {
						code.prependRight(this.start, '{').appendLeft(this.end, '}');
					}
				}

				var start = void 0;
				if (isUseStrict(this.body[0])) {
					start = this.body[0].end;
				} else if (this.synthetic || this.parent.type === 'Root') {
					start = this.start;
				} else {
					start = this.start + 1;
				}

				var prefix = '\n' + indentation;
				var suffix = ';';
				introStatementGenerators.forEach(function (fn, i) {
					if (i === introStatementGenerators.length - 1) suffix = ';\n';
					fn(start, prefix, suffix);
				});
			};

			BlockStatement.prototype.declareIdentifier = function declareIdentifier(name) {
				var id = this.scope.createIdentifier(name);
				this.createdDeclarations.push(id);
				return id;
			};

			BlockStatement.prototype.transpileParameters = function transpileParameters(code, transforms, indentation, introStatementGenerators) {
				var _this54 = this;

				var params = this.parent.params;

				params.forEach(function (param) {
					if (param.type === 'AssignmentPattern' && param.left.type === 'Identifier') {
						if (transforms.defaultParameter) {
							introStatementGenerators.push(function (start, prefix, suffix) {
								var lhs = prefix + 'if ( ' + param.left.name + ' === void 0 ) ' + param.left.name;

								code.prependRight(param.left.end, lhs).move(param.left.end, param.right.end, start).appendLeft(param.right.end, suffix);
							});
						}
					} else if (param.type === 'RestElement') {
						if (transforms.spreadRest) {
							introStatementGenerators.push(function (start, prefix, suffix) {
								var penultimateParam = params[params.length - 2];

								if (penultimateParam) {
									code.remove(penultimateParam ? penultimateParam.end : param.start, param.end);
								} else {
									var _start = param.start,
									    end = param.end; // TODO https://gitlab.com/Rich-Harris/buble/issues/8

									while (/\s/.test(code.original[_start - 1])) {
										_start -= 1;
									}while (/\s/.test(code.original[end])) {
										end += 1;
									}code.remove(_start, end);
								}

								var name = param.argument.name;
								var len = _this54.scope.createIdentifier('len');
								var count = params.length - 1;

								if (count) {
									code.prependRight(start, prefix + 'var ' + name + ' = [], ' + len + ' = arguments.length - ' + count + ';\n' + indentation + 'while ( ' + len + '-- > 0 ) ' + name + '[ ' + len + ' ] = arguments[ ' + len + ' + ' + count + ' ]' + suffix);
								} else {
									code.prependRight(start, prefix + 'var ' + name + ' = [], ' + len + ' = arguments.length;\n' + indentation + 'while ( ' + len + '-- ) ' + name + '[ ' + len + ' ] = arguments[ ' + len + ' ]' + suffix);
								}
							});
						}
					} else if (param.type !== 'Identifier') {
						if (transforms.parameterDestructuring) {
							var _ref8 = _this54.scope.createIdentifier('ref');
							destructure(code, _this54.scope, param, _ref8, false, introStatementGenerators);
							code.prependRight(param.start, _ref8);
						}
					}
				});
			};

			BlockStatement.prototype.transpileBlockScopedIdentifiers = function transpileBlockScopedIdentifiers(code) {
				var _this55 = this;

				Object.keys(this.scope.blockScopedDeclarations).forEach(function (name) {
					var declarations = _this55.scope.blockScopedDeclarations[name];

					for (var i = 0, list = declarations; i < list.length; i += 1) {
						var declaration = list[i];

						var cont = false; // TODO implement proper continue...

						if (declaration.kind === 'for.let') {
							// special case
							var forStatement = declaration.node.findNearest('ForStatement');

							if (forStatement.shouldRewriteAsFunction) {
								var outerAlias = _this55.scope.createIdentifier(name);
								var innerAlias = forStatement.reassigned[name] ? _this55.scope.createIdentifier(name) : name;

								declaration.name = outerAlias;
								code.overwrite(declaration.node.start, declaration.node.end, outerAlias, { storeName: true });

								forStatement.aliases[name] = {
									outer: outerAlias,
									inner: innerAlias
								};

								for (var i$1 = 0, list$1 = declaration.instances; i$1 < list$1.length; i$1 += 1) {
									var identifier = list$1[i$1];

									var alias = forStatement.body.contains(identifier) ? innerAlias : outerAlias;

									if (name !== alias) {
										code.overwrite(identifier.start, identifier.end, alias, {
											storeName: true
										});
									}
								}

								cont = true;
							}
						}

						if (!cont) {
							var _alias = _this55.scope.createIdentifier(name);

							if (name !== _alias) {
								declaration.name = _alias;
								code.overwrite(declaration.node.start, declaration.node.end, _alias, { storeName: true });

								for (var i$2 = 0, list$2 = declaration.instances; i$2 < list$2.length; i$2 += 1) {
									var _identifier = list$2[i$2];

									_identifier.rewritten = true;
									code.overwrite(_identifier.start, _identifier.end, _alias, {
										storeName: true
									});
								}
							}
						}
					}
				});
			};

			return BlockStatement;
		}(Node$1);

		function Program(source, ast, transforms, options) {
			this.type = 'Root';

			// options
			this.jsx = options.jsx || 'React.createElement';
			this.options = options;

			this.source = source;
			this.magicString = new MagicString$1(source);

			this.ast = ast;
			this.depth = 0;

			wrap(this.body = ast, this);
			this.body.__proto__ = BlockStatement.prototype;

			this.indentExclusionElements = [];
			this.body.initialise(transforms);

			this.indentExclusions = Object.create(null);
			for (var i = 0, list = this.indentExclusionElements; i < list.length; i += 1) {
				var node = list[i];

				for (var _i6 = node.start; _i6 < node.end; _i6 += 1) {
					this.indentExclusions[_i6] = true;
				}
			}

			this.body.transpile(this.magicString, transforms);
		}

		Program.prototype = {
			export: function _export(options) {
				if (options === void 0) options = {};

				return {
					code: this.magicString.toString(),
					map: this.magicString.generateMap({
						file: options.file,
						source: options.source,
						includeContent: options.includeContent !== false
					})
				};
			},
			findNearest: function findNearest() {
				return null;
			},
			findScope: function findScope() {
				return null;
			}
		};

		var matrix = {
			chrome: {
				48: 1333689725,
				49: 1342078975,
				50: 1610514431,
				51: 1610514431,
				52: 2147385343
			},
			firefox: {
				43: 1207307741,
				44: 1207307741,
				45: 1207307741,
				46: 1476267485,
				47: 1476296671,
				48: 1476296671
			},
			safari: {
				8: 1073741824,
				9: 1328940894
			},
			ie: {
				8: 0,
				9: 1073741824,
				10: 1073741824,
				11: 1073770592
			},
			edge: {
				12: 1591620701,
				13: 1608399967
			},
			node: {
				'0.10': 1075052608,
				'0.12': 1091830852,
				4: 1327398527,
				5: 1327398527,
				6: 1610514431
			}
		};

		var features = ['arrow', 'classes', 'collections', 'computedProperty', 'conciseMethodProperty', 'constLoop', 'constRedef', 'defaultParameter', 'destructuring', 'extendNatives', 'forOf', 'generator', 'letConst', 'letLoop', 'letLoopScope', 'moduleExport', 'moduleImport', 'numericLiteral', 'objectProto', 'objectSuper', 'oldOctalLiteral', 'parameterDestructuring', 'spreadRest', 'stickyRegExp', 'symbol', 'templateString', 'unicodeEscape', 'unicodeIdentifier', 'unicodeRegExp',

		// ES2016
		'exponentiation',

		// additional transforms, not from
		// https://featuretests.io
		'reservedProperties', 'trailingFunctionCommas'];

		var version$1 = "0.18.0";

		var ref = [inject$1, inject].reduce(function (final, plugin) {
			return plugin(final);
		}, acorn);
		var parse = ref.parse;

		var dangerousTransforms = ['dangerousTaggedTemplateString', 'dangerousForOf'];

		function target(target) {
			var targets = Object.keys(target);
			var bitmask = targets.length ? 4294967295 : 1073741824;

			Object.keys(target).forEach(function (environment) {
				var versions = matrix[environment];
				if (!versions) throw new Error('Unknown environment \'' + environment + '\'. Please raise an issue at https://github.com/Rich-Harris/buble/issues');

				var targetVersion = target[environment];
				if (!(targetVersion in versions)) throw new Error('Support data exists for the following versions of ' + environment + ': ' + Object.keys(versions).join(', ') + '. Please raise an issue at https://github.com/Rich-Harris/buble/issues');
				var support = versions[targetVersion];

				bitmask &= support;
			});

			var transforms = Object.create(null);
			features.forEach(function (name, i) {
				transforms[name] = !(bitmask & 1 << i);
			});

			dangerousTransforms.forEach(function (name) {
				transforms[name] = false;
			});

			return transforms;
		}

		function transform(source, options) {
			if (options === void 0) options = {};

			var ast = void 0;
			var jsx$$1 = null;

			try {
				ast = parse(source, {
					ecmaVersion: 8,
					preserveParens: true,
					sourceType: 'module',
					onComment: function onComment(block, text) {
						if (!jsx$$1) {
							var match = /@jsx\s+([^\s]+)/.exec(text);
							if (match) jsx$$1 = match[1];
						}
					},
					plugins: {
						jsx: true,
						objectSpread: true
					}
				});
				options.jsx = jsx$$1 || options.jsx;
			} catch (err) {
				err.snippet = getSnippet(source, err.loc);
				err.toString = function () {
					return err.name + ': ' + err.message + '\n' + err.snippet;
				};
				throw err;
			}

			var transforms = target(options.target || {});
			Object.keys(options.transforms || {}).forEach(function (name) {
				if (name === 'modules') {
					if (!('moduleImport' in options.transforms)) transforms.moduleImport = options.transforms.modules;
					if (!('moduleExport' in options.transforms)) transforms.moduleExport = options.transforms.modules;
					return;
				}

				if (!(name in transforms)) throw new Error('Unknown transform \'' + name + '\'');
				transforms[name] = options.transforms[name];
			});

			return new Program(source, ast, transforms, options).export(options);
		}

		exports.target = target;
		exports.transform = transform;
		exports.VERSION = version$1;

		Object.defineProperty(exports, '__esModule', { value: true });
	});
	
});

unwrapExports(buble_deps);
var buble_deps_1 = buble_deps.transform;

var _poly = { assign: assign };

var opts = {
  objectAssign: '_poly.assign',
  transforms: {
    dangerousForOf: true,
    dangerousTaggedTemplateString: true
  }
};

var transform$$1 = (function (code) {
  return buble_deps_1(code, opts).code;
});

var errorBoundary = function errorBoundary(Element, errorCallback) {
  return function (_React$Component) {
    inherits(ErrorBoundary, _React$Component);

    function ErrorBoundary() {
      classCallCheck(this, ErrorBoundary);
      return possibleConstructorReturn(this, _React$Component.apply(this, arguments));
    }

    ErrorBoundary.prototype.componentDidCatch = function componentDidCatch(error) {
      errorCallback(error);
    };

    ErrorBoundary.prototype.render = function render() {
      return typeof Element === 'function' ? React__default.createElement(Element, null) : Element;
    };

    return ErrorBoundary;
  }(React__default.Component);
};

var evalCode = function evalCode(code, scope) {
  var scopeKeys = Object.keys(scope);
  var scopeValues = scopeKeys.map(function (key) {
    return scope[key];
  });
  var res = new (Function.prototype.bind.apply(Function, [null].concat(['_poly', 'React'], scopeKeys, [code])))();
  return res.apply(undefined, [_poly, React__default].concat(scopeValues));
};

var generateElement = function generateElement(_ref, errorCallback) {
  var _ref$code = _ref.code,
      code = _ref$code === undefined ? '' : _ref$code,
      _ref$scope = _ref.scope,
      scope = _ref$scope === undefined ? {} : _ref$scope;

  // NOTE: Remove trailing semicolon to get an actual expression.
  var codeTrimmed = code.trim().replace(/;$/, '');

  // NOTE: Workaround for classes and arrow functions.
  var transformed = transform$$1('(' + codeTrimmed + ')').trim();

  return errorBoundary(evalCode('return ' + transformed, scope), errorCallback);
};

var renderElementAsync = function renderElementAsync(_ref2, resultCallback, errorCallback) {
  var _ref2$code = _ref2.code,
      code = _ref2$code === undefined ? '' : _ref2$code,
      _ref2$scope = _ref2.scope,
      scope = _ref2$scope === undefined ? {} : _ref2$scope;

  var render = function render(element) {
    resultCallback(errorBoundary(element, errorCallback));
  };

  if (!/render\s*\(/.test(code)) {
    return errorCallback(new SyntaxError('No-Inline evaluations must call `render`.'));
  }

  evalCode(transform$$1(code), _extends({}, scope, { render: render }));
};

var css = "\n.prism-code {\n  display: block;\n  white-space: pre;\n\n  background-color: #1D1F21;\n  color: #C5C8C6;\n\n  padding: 0.5rem;\n  margin: 0;\n\n  box-sizing: border-box;\n  vertical-align: baseline;\n  outline: none;\n  text-shadow: none;\n  -webkit-hyphens: none;\n  -ms-hyphens: none;\n  hyphens: none;\n  word-wrap: normal;\n  word-break: normal;\n  text-align: left;\n  word-spacing: normal;\n  -moz-tab-size: 2;\n  -o-tab-size: 2;\n  tab-size: 2;\n}\n\n.token.comment,\n.token.prolog,\n.token.doctype,\n.token.cdata {\n  color: hsl(30, 20%, 50%);\n}\n\n.token.punctuation {\n  opacity: .7;\n}\n\n.namespace {\n  opacity: .7;\n}\n\n.token.property,\n.token.tag,\n.token.boolean,\n.token.number,\n.token.constant,\n.token.symbol {\n  color: hsl(350, 40%, 70%);\n}\n\n.token.selector,\n.token.attr-name,\n.token.string,\n.token.char,\n.token.builtin,\n.token.inserted {\n  color: hsl(75, 70%, 60%);\n}\n\n.token.operator,\n.token.entity,\n.token.url,\n.language-css .token.string,\n.style .token.string,\n.token.variable {\n  color: hsl(40, 90%, 60%);\n}\n\n.token.atrule,\n.token.attr-value,\n.token.keyword {\n  color: hsl(350, 40%, 70%);\n}\n\n.token.regex,\n.token.important {\n  color: #e90;\n}\n\n.token.important,\n.token.bold {\n  font-weight: bold;\n}\n.token.italic {\n  font-style: italic;\n}\n\n.token.entity {\n  cursor: help;\n}\n\n.token.deleted {\n  color: red;\n}\n";

var prismStyling = React__default.createElement('style', { dangerouslySetInnerHTML: { __html: css } });

var Style = (function () {
  return prismStyling;
});

var LiveContextTypes = {
  live: PropTypes.shape({
    code: PropTypes.string,
    error: PropTypes.string,

    onError: PropTypes.func,
    onChange: PropTypes.func,

    element: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.element, PropTypes.func])
  })
};

var LiveProvider = function (_Component) {
  inherits(LiveProvider, _Component);

  function LiveProvider() {
    var _temp, _this, _ret;

    classCallCheck(this, LiveProvider);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = possibleConstructorReturn(this, _Component.call.apply(_Component, [this].concat(args))), _this), _this.onChange = function (code) {
      var _this$props = _this.props,
          scope = _this$props.scope,
          transformCode = _this$props.transformCode,
          noInline = _this$props.noInline;

      _this.transpile({ code: code, scope: scope, transformCode: transformCode, noInline: noInline });
    }, _this.onError = function (error) {
      _this.setState({ error: error.toString() });
    }, _this.transpile = function (_ref) {
      var code = _ref.code,
          scope = _ref.scope,
          transformCode = _ref.transformCode,
          _ref$noInline = _ref.noInline,
          noInline = _ref$noInline === undefined ? false : _ref$noInline;

      // Transpilation arguments
      var input = {
        code: transformCode ? transformCode(code) : code,
        scope: scope
      };
      var errorCallback = function errorCallback(err) {
        return _this.setState({ element: undefined, error: err.toString() });
      };
      var renderElement = function renderElement(element) {
        return _this.setState(_extends({}, state, { element: element }));
      };

      // State reset object
      var state = { unsafeWrapperError: undefined, error: undefined };

      try {
        if (noInline) {
          _this.setState(_extends({}, state, { element: null })); // Reset output for async (no inline) evaluation
          renderElementAsync(input, renderElement, errorCallback);
        } else {
          renderElement(generateElement(input, errorCallback));
        }
      } catch (error) {
        _this.setState(_extends({}, state, { error: error.toString() }));
      }
    }, _this.getChildContext = function () {
      return {
        live: _extends({}, _this.state, {
          code: _this.props.code,
          onError: _this.onError,
          onChange: _this.onChange
        })
      };
    }, _temp), possibleConstructorReturn(_this, _ret);
  }

  LiveProvider.prototype.componentWillMount = function componentWillMount() {
    var _props = this.props,
        code = _props.code,
        scope = _props.scope,
        transformCode = _props.transformCode,
        noInline = _props.noInline;


    this.transpile({ code: code, scope: scope, transformCode: transformCode, noInline: noInline });
  };

  LiveProvider.prototype.componentWillReceiveProps = function componentWillReceiveProps(_ref2) {
    var code = _ref2.code,
        scope = _ref2.scope,
        noInline = _ref2.noInline,
        transformCode = _ref2.transformCode;

    if (code !== this.props.code || scope !== this.props.scope || noInline !== this.props.noInline || transformCode !== this.props.transformCode) {
      this.transpile({ code: code, scope: scope, transformCode: transformCode, noInline: noInline });
    }
  };

  LiveProvider.prototype.render = function render() {
    var _props2 = this.props,
        children = _props2.children,
        className = _props2.className,
        code = _props2.code,
        mountStylesheet = _props2.mountStylesheet,
        noInline = _props2.noInline,
        transformCode = _props2.transformCode,
        scope = _props2.scope,
        rest = objectWithoutProperties(_props2, ['children', 'className', 'code', 'mountStylesheet', 'noInline', 'transformCode', 'scope']);


    return React__default.createElement(
      'div',
      _extends({
        className: cn('react-live', className)
      }, rest),
      mountStylesheet && React__default.createElement(Style, null),
      children
    );
  };

  return LiveProvider;
}(React.Component);

LiveProvider.childContextTypes = LiveContextTypes;
LiveProvider.defaultProps = {
  code: '',
  mountStylesheet: true,
  noInline: false
};

var LiveEditor = function LiveEditor(props, _ref) {
  var live = _ref.live;
  return React__default.createElement(Editor, _extends({}, props, {
    code: live.code,
    onChange: function onChange(code) {
      live.onChange(code);

      if (typeof props.onChange === 'function') {
        props.onChange(code);
      }
    }
  }));
};

LiveEditor.contextTypes = LiveContextTypes;

var LiveError = function LiveError(_ref, _ref2) {
  var live = _ref2.live;
  var className = _ref.className,
      rest = objectWithoutProperties(_ref, ['className']);
  return live.error ? React__default.createElement(
    'div',
    _extends({}, rest, {
      className: cn('react-live-error', className)
    }),
    live.error
  ) : null;
};

LiveError.contextTypes = LiveContextTypes;

var LivePreview = function LivePreview(_ref, _ref2) {
  var element = _ref2.live.element;
  var className = _ref.className,
      rest = objectWithoutProperties(_ref, ['className']);

  var Element = element;

  return React__default.createElement(
    'div',
    _extends({}, rest, {
      className: cn('react-live-preview', className)
    }),
    Element && React__default.createElement(Element, null)
  );
};

LivePreview.contextTypes = LiveContextTypes;

var withLive = function withLive(WrappedComponent) {
  var WithLive = function (_Component) {
    inherits(WithLive, _Component);

    function WithLive() {
      classCallCheck(this, WithLive);
      return possibleConstructorReturn(this, _Component.apply(this, arguments));
    }

    WithLive.prototype.render = function render() {
      var live = this.context.live;

      return React__default.createElement(WrappedComponent, _extends({ live: live }, this.props));
    };

    return WithLive;
  }(React.Component);

  WithLive.contextTypes = LiveContextTypes;


  return WithLive;
};

exports.Editor = Editor;
exports.LiveProvider = LiveProvider;
exports.LiveEditor = LiveEditor;
exports.LiveError = LiveError;
exports.LivePreview = LivePreview;
exports.withLive = withLive;
exports.generateElement = generateElement;
exports.renderElementAsync = renderElementAsync;

Object.defineProperty(exports, '__esModule', { value: true });

})));
