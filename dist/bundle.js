(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global.canvasInputMethod = factory());
}(this, (function () { 'use strict';

/**
 * @description 画布公用方法
 */

// 圆角矩形
var drawRoundRect = function drawRoundRect(ctx, x, // 端点1x
y, // 端点1y
w, // 端点2x
h, // 端点2y
r // 半径
) {
    ctx.moveTo(x + r, y);
    ctx.arcTo(x + w, y, x + w, y + h, r); // 绘制1/4
    ctx.arcTo(x + w, y + h, x, y + h, r);
    ctx.arcTo(x, y + h, x, y, r);
    ctx.arcTo(x, y, x + w, y, r);
};

var drawShadow = function drawShadow(ctx, blur, offsetX, offsetY, color) {
    ctx.shadowColor = color;
    ctx.shadowBlur = blur;
    ctx.shadowOffsetX = offsetX;
    ctx.shadowOffsetY = offsetY;
};

var classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

var createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();



























var slicedToArray = function () {
  function sliceIterator(arr, i) {
    var _arr = [];
    var _n = true;
    var _d = false;
    var _e = undefined;

    try {
      for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
        _arr.push(_s.value);

        if (i && _arr.length === i) break;
      }
    } catch (err) {
      _d = true;
      _e = err;
    } finally {
      try {
        if (!_n && _i["return"]) _i["return"]();
      } finally {
        if (_d) throw _e;
      }
    }

    return _arr;
  }

  return function (arr, i) {
    if (Array.isArray(arr)) {
      return arr;
    } else if (Symbol.iterator in Object(arr)) {
      return sliceIterator(arr, i);
    } else {
      throw new TypeError("Invalid attempt to destructure non-iterable instance");
    }
  };
}();

var Button = function () {

    // txt


    // 按钮类型 只有功能键有

    function Button(conf, ctx) {
        classCallCheck(this, Button);

        this.ctx = ctx;
        this.x = conf.x;
        this.y = conf.y;
        this.width = conf.width;
        this.height = conf.height;
        this.borderRadius = conf.borderRadius;
        this.touchBackground = conf.touchBackground;
        this.untouchBackground = conf.untouchBackground;

        this.value = conf.value;
        this.touchColor = conf.touchColor;
        this.untouchColor = conf.untouchColor;
        this.size = conf.size;
        this.family = conf.family;
        this.weight = conf.weight;
        this.type = conf.type || '';

        this.untouch();
    }

    createClass(Button, [{
        key: 'draw',
        value: function draw() {
            this.ctx.save();
            this.ctx.fillStyle = this.background;
            this.ctx.lineCap = 'square';

            this.ctx.beginPath();

            // 绘制圆角矩形
            drawRoundRect(this.ctx, this.x, this.y, this.width, this.height, this.borderRadius);
            // 绘制阴影
            drawShadow(this.ctx, 3, 1, 1, '#000');
            this.ctx.closePath();
            this.ctx.fill();
            // 绘制文字

            this.ctx.restore();
            this.ctx.fillStyle = this.color;
            this.ctx.font = this.size + ' ' + this.family;
            this.ctx.textAlign = 'center';
            this.ctx.textBaseline = 'middle';
            this.ctx.fillText(this.value, this.x + this.width / 2, this.y + this.height / 2);
        }
    }, {
        key: 'touch',
        value: function touch() {
            this.color = this.touchColor;
            this.background = this.touchBackground;
        }
    }, {
        key: 'untouch',
        value: function untouch() {
            this.color = this.untouchColor;
            this.background = this.untouchBackground;
        }

        /**
         * 判断是否被点击事件
         */

    }, {
        key: 'isTouched',
        value: function isTouched(x, y) {
            return x >= this.x && x <= this.x + this.width && y >= this.y && y <= this.y + this.height;
        }
    }]);
    return Button;
}();

/**
 * @description class canvas 与 class button 中间层
 */
var generateArr = Symbol('generateArr');
var generate = Symbol('generate');
var generateButton = Symbol('generateButton');

var Alpha = function () {

    // 小写字母面板
    // 大写字母面板
    // 数字面板
    // 符号面板
    // 功能区面板
    // 比例

    /**
     * @param {number} prop.layoutWidth         整个画布宽度
     * @param {number} prop.width               alpha宽度
     * @param {number} prop.height              alpha高度
     * @param {number} prop.funcWidth           alpha功能型按键宽度
     * @param {number} prop.borderRadius        alpha圆角
     * @param {string} prop.size                字体大小(带px)
     * @param {string} prop.family              字体类型
     * @param {string} prop.weight              字体粗细
     * @param {string} prop.untouchBackground   非选中态背景色
     * @param {string} prop.untouchColor        非选中态字体颜色
     * @param {string} prop.touchBackground     选中态背景色
     * @param {string} prop.touchColor          选中态字体颜色
     * @param {number} prop.paddingWidth        每个button的左右距离
     * @param {number} prop.paddingHeight       每个button的上下距离
     * @param {number} prop.startX              canvas布局的左上角位置x
     * @param {number} prop.startY              canvas布局的左上角位置y
     * @param {string} prop.type                输入内容的类型 只有功能型按钮才有
     */

    function Alpha(alpha, rate, ctx) {
        classCallCheck(this, Alpha);

        this.ctx = ctx;
        this.rate = rate;
        this.prop = alpha;

        this.init();
    }

    createClass(Alpha, [{
        key: 'init',
        value: function init() {
            this.lowInit();
            this.prop.startX = (this.prop.layoutWidth - this.low.get(1).length * this.prop.width - (this.low.get(1).length - 1) * this.prop.paddingWidth) / 2;
            this.upInit();
            this.numberInit();
            this.symbolInit();

            this.functionInit();
        }
    }, {
        key: 'lowInit',
        value: function lowInit() {
            this.low = new Map();

            this.low.set(1, this[generateArr](['q', 'w', 'e', 'r', 'y', 't', 'u', 'i', 'o', 'p']));

            this.low.set(2, this[generateArr](['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l']));

            this.low.set(3, this[generateArr](['z', 'x', 'c', 'v', 'b', 'n', 'm']));

            this.low.set('buttons', this[generateButton]('low'));
        }
    }, {
        key: 'upInit',
        value: function upInit() {
            this.up = new Map();

            this.up.set(1, this[generateArr](['Q', 'W', 'E', 'R', 'Y', 'T', 'U', 'I', 'O', 'P']));

            this.up.set(2, this[generateArr](['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L']));

            this.up.set(3, this[generateArr](['Z', 'X', 'C', 'V', 'B', 'N', 'M']));

            this.up.set('buttons', this[generateButton]('up'));
        }
    }, {
        key: 'numberInit',
        value: function numberInit() {
            this.number = new Map();

            this.number.set(1, this[generateArr](['1', '2', '3', '4', '5', '6', '7', '8', '9', '0']));

            this.number.set(2, this[generateArr](['-', '/', ':', ';', '(', ')', '$', '&', '@', '"']));

            this.number.set(3, this[generateArr](['.', ',', '?', '!', "'"]));

            this.number.set('buttons', this[generateButton]('number'));
        }
    }, {
        key: 'symbolInit',
        value: function symbolInit() {
            this.symbol = new Map();

            this.symbol.set(1, this[generateArr](['[', ']', '{', '}', '#', '%', '^', '*', '+', '=']));

            this.symbol.set(2, this[generateArr](['_', '\\', '|', '~', '<', '>', '€', '£', '¥', '•']));

            this.symbol.set(3, this[generateArr](['.', ',', '?', '!', "'"]));

            this.symbol.set('buttons', this[generateButton]('symbol'));
        }
    }, {
        key: 'functionInit',


        // 功能区初始化
        value: function functionInit() {
            var _this = this;

            this.func = new Map();

            var gen = function gen(v, x, y, type) {
                var color = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : {};
                var width = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : _this.prop.funcWidth;

                return new Button(Object.assign(_this[generate](v), {
                    x: x,
                    y: y,
                    width: width,
                    type: type,
                    untouchBackground: color.untouchBackground || _this.prop.untouchBackground,
                    untouchColor: color.untouchColor || _this.prop.touchBackground,
                    touchBackground: color.touchBackground || _this.prop.touchBackground,
                    touchColor: color.touchColor || _this.prop.touchColor
                }), _this.ctx);
            };

            var shiftBtn = gen('↑', this.prop.startX, this.getLineHeight(3), 'shift');

            var deleteBtn = gen('←', this.prop.layoutWidth - this.prop.paddingWidth - this.prop.funcWidth, this.getLineHeight(3), 'delete', {
                untouchBackground: this.prop.funcColor.normal
            });

            var numberBtn = gen('123', this.prop.startX, this.getLineHeight(4), 'number', {
                untouchBackground: this.prop.funcColor.normal
            });

            var sendX = this.low.get(3).slice(-1)[0].x;
            var sendWid = this.prop.width - sendX - (this.prop.width - deleteBtn.x - deleteBtn.width);
            var sendBtn = gen('Send', sendX, this.getLineHeight(4), 'send', {
                untouchBackground: this.prop.funcColor.special,
                untouchColor: this.prop.touchColor,
                touchBackground: this.prop.touchColor,
                touchColor: this.prop.funcColor.special
            }, sendWid);

            var spaceX = numberBtn.x + numberBtn.width + this.prop.paddingWidth;
            var spaceWid = sendX - this.prop.paddingWidth - spaceX;
            var spaceBtn = gen('space', spaceX, this.getLineHeight(4), 'space', {}, spaceWid);

            this.func.set('low', [shiftBtn, deleteBtn, numberBtn, spaceBtn, sendBtn]);

            this.func.set('up', [shiftBtn, deleteBtn, numberBtn, spaceBtn, sendBtn]);
        }
    }, {
        key: 'getLineHeight',


        /**
         * 获取某行起始高度
         * @param {number} line 行数 从 1 开始
         */
        value: function getLineHeight(line) {
            return this.prop.startY + (line - 1) * (this.prop.height + this.prop.paddingHeight);
        }
    }, {
        key: generate,
        value: function value(_value) {
            return {
                value: _value,
                width: this.prop.width,
                height: this.prop.height,
                borderRadius: this.prop.borderRadius,
                size: this.prop.size,
                family: this.prop.family,
                weight: this.prop.weight,
                untouchColor: this.prop.untouchColor,
                untouchBackground: this.prop.untouchBackground,
                touchColor: this.prop.touchColor,
                touchBackground: this.prop.touchBackground
            };
        }
    }, {
        key: generateArr,
        value: function value(arr) {
            var _this2 = this;

            return arr.map(function (v) {
                return _this2[generate](v);
            });
        }
    }, {
        key: generateButton,
        value: function value(name) {
            var buttonArr = [];

            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
                for (var _iterator = this[name][Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                    var _step$value = slicedToArray(_step.value, 2),
                        key = _step$value[0],
                        value = _step$value[1];

                    for (var i = 0; i < value.length; i++) {
                        var item = value[i];
                        var alphaStartX = (this.prop.layoutWidth - value.length * this.prop.width - (value.length - 1) * this.prop.paddingWidth) / 2;
                        item.x = alphaStartX + i * (this.prop.paddingWidth + this.prop.width);
                        item.y = this.prop.startY + (key - 1) * (this.prop.paddingHeight + this.prop.height);
                        var button = new Button(item, this.ctx);
                        buttonArr.push(button);
                    }
                }
            } catch (err) {
                _didIteratorError = true;
                _iteratorError = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion && _iterator.return) {
                        _iterator.return();
                    }
                } finally {
                    if (_didIteratorError) {
                        throw _iteratorError;
                    }
                }
            }

            return buttonArr;
        }
    }]);
    return Alpha;
}();

/**
 * @description input class
 */

var Input = function () {
    function Input(el, canvas) {
        classCallCheck(this, Input);

        this.canvas = canvas;
        this.el = el;

        this.init();
    }

    createClass(Input, [{
        key: 'init',
        value: function init() {
            this.value = '';

            this.attributeInit();
            this.eventInit();
            this.bindCanvas();
        }
    }, {
        key: 'attributeInit',
        value: function attributeInit() {
            this.el.setAttribute('readonly', true);
        }
    }, {
        key: 'eventInit',
        value: function eventInit() {
            var _this = this;

            this.el.addEventListener('touchstart', function (e) {
                _this.canvas.show();
            });

            this.el.addEventListener('blur', function (e) {
                if (_this.canvas.active()) {
                    _this.el.focus();
                } else {
                    _this.canvas.hide();
                }
            });
        }
    }, {
        key: 'bindCanvas',
        value: function bindCanvas() {
            this.canvas.setInput(this);
        }
    }, {
        key: 'input',
        value: function input(val) {
            this.el.value += val;
        }
    }]);
    return Input;
}();

/**
 * @description 大键位功能区功能函数
 */

// 大键位函数入口，this 指向Canvas 通过call方法调用 不能写成箭头函数
var functionInput = function functionInput(type) {
    if (type === 'shift') {
        this.changeLowUp();
    }

    if (type === 'delete') {}

    if (type === 'space') {}

    if (type === 'number') {}

    if (type === 'symbol') {}

    if (type === 'send') {}
};

/**
 * @description canvas 画布容器
 */

var Canvas = function () {

    // 屏幕对于320的倍率
    // 屏幕宽度
    // 屏幕高度

    // buttons 面板够赞函数
    // button 数组
    // 选中的元素
    // 当前面板名称


    function Canvas(canvas, ctx) {
        classCallCheck(this, Canvas);

        this.canvas = canvas;
        this.ctx = ctx;

        this.windowInit();
        this.alphaInit();
        this.styleInit();
        this.sizeInit();

        this.buttonLayer = this.buttonInit();
        this.buttons = this.buttonLayer('low');
        this.eventInit();

        //this.hide();
        this.show();
        this.draw();
    }

    createClass(Canvas, [{
        key: 'alphaInit',


        /**
         * 初始化字母区
         */
        value: function alphaInit() {
            this.alpha = new Alpha({
                layoutWidth: this.width,
                width: 27.5 * this.rate,
                height: 36 * this.rate,
                funcWidth: 40 * this.rate,
                borderRadius: 5,
                size: 16 * this.rate + 'px',
                family: 'Microsoft yahei',
                weight: 'bold',
                untouchBackground: '#fff',
                untouchColor: '#000',
                touchBackground: '#000',
                touchColor: '#fff',
                paddingWidth: 4 * this.rate,
                paddingHeight: 8 * this.rate,
                startY: 10,
                funcColor: {
                    normal: '#aab2bd',
                    special: '#007aff'
                }
            }, this.rate, this.ctx);
            console.log(this.alpha);
        }
    }, {
        key: 'windowInit',


        /**
         * 初始化布局相关参数
         */
        value: function windowInit() {
            var width = document.body.clientWidth;
            var rate = parseInt(width * 12 / 320, 10);
            var backingStoreRatio = this.ctx.webkitBackingStorePixelRatio || this.ctx.mozBackingStorePixelRatio || this.ctx.msBackingStorePixelRatio || this.ctx.oBackingStorePixelRatio || this.ctx.backingStorePixelRatio || 1;
            var devicePixelRatio = window.devicePixelRatio || 1;

            this.rate = rate / 12 * 2;
            this.width = width * 2;
            this.height = width * 0.8 * 2;
        }
    }, {
        key: 'styleInit',


        /*
         * 调整canvas初始样式
         */
        value: function styleInit() {
            this.canvas.style.position = 'fixed';
            this.canvas.style.bottom = '0';
            this.canvas.style.left = '0';
            this.canvas.style['box-sizing'] = 'border-box';

            this.canvas.style['width'] = this.width / 2 + 'px';
            this.canvas.style['height'] = this.height / 2 + 'px';
        }
    }, {
        key: 'sizeInit',


        /**
         * 调整画布大小
         */
        value: function sizeInit() {
            // canvas 的宽高用dom api设置 会有盒模型的问题 考虑border
            var width = this.width;
            var height = this.height;

            this.canvas.width = width;
            this.canvas.height = height;
        }
    }, {
        key: 'eventInit',


        /**
         * 给canvas绑定事件
         */
        value: function eventInit() {
            var _this = this;

            var screenY = window.screen.height;
            var moveIn = function moveIn(e) {
                var targetX = e.touches[0].clientX;
                var targetY = e.touches[0].clientY - (screenY - _this.height);

                var _iteratorNormalCompletion = true;
                var _didIteratorError = false;
                var _iteratorError = undefined;

                try {
                    for (var _iterator = _this.buttons[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                        var i = _step.value;

                        if (i.isTouched(targetX, targetY)) {
                            i.touch(_this.ctx);
                            _this.touching = i;
                        } else {
                            i.untouch();
                        }
                    }
                } catch (err) {
                    _didIteratorError = true;
                    _iteratorError = err;
                } finally {
                    try {
                        if (!_iteratorNormalCompletion && _iterator.return) {
                            _iterator.return();
                        }
                    } finally {
                        if (_didIteratorError) {
                            throw _iteratorError;
                        }
                    }
                }

                _this.draw();
            };
            this.canvas.addEventListener('touchstart', function (e) {
                moveIn(e);
            });
            this.canvas.addEventListener('touchend', function (e) {
                var _iteratorNormalCompletion2 = true;
                var _didIteratorError2 = false;
                var _iteratorError2 = undefined;

                try {
                    for (var _iterator2 = _this.buttons[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                        var i = _step2.value;

                        i.untouch();
                    }
                } catch (err) {
                    _didIteratorError2 = true;
                    _iteratorError2 = err;
                } finally {
                    try {
                        if (!_iteratorNormalCompletion2 && _iterator2.return) {
                            _iterator2.return();
                        }
                    } finally {
                        if (_didIteratorError2) {
                            throw _iteratorError2;
                        }
                    }
                }

                _this.draw();
                _this.input();
            });
            this.canvas.addEventListener('touchmove', function (e) {
                moveIn(e);
            });

            window.addEventListener('touchstart', function (e) {
                _this.windowMouse = e.touches[0];
            });
        }
    }, {
        key: 'buttonInit',


        /*
         * 初始化面板上按钮
         */
        value: function buttonInit() {
            var _this2 = this;

            return function (name) {
                _this2.layerName = name;

                return _this2.alpha[name].get('buttons').concat(_this2.alpha.func.get(name));
            };
        }
    }, {
        key: 'input',


        /**
         * 输出事件
         */
        value: function input() {
            if (!this.touching) return;

            if (this.touching.type) {
                functionInput.call(this, this.touching.type);
            } else {
                console.log(this.touching.value);
                this.inputEl.input(this.touching.value);
            }
            this.touching = null;
        }
    }, {
        key: 'draw',
        value: function draw() {
            this.clear();
            if (!this.isShow) return;

            this.ctx.fillStyle = '#d7d8dc';
            this.ctx.fillRect(0, 0, this.canvas.width * this.rate, this.canvas.height * this.rate);
            this.ctx.fill();

            var _iteratorNormalCompletion3 = true;
            var _didIteratorError3 = false;
            var _iteratorError3 = undefined;

            try {
                for (var _iterator3 = this.buttons[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
                    var i = _step3.value;

                    i.draw();
                }
            } catch (err) {
                _didIteratorError3 = true;
                _iteratorError3 = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion3 && _iterator3.return) {
                        _iterator3.return();
                    }
                } finally {
                    if (_didIteratorError3) {
                        throw _iteratorError3;
                    }
                }
            }
        }
    }, {
        key: 'changeLowUp',
        value: function changeLowUp() {
            this.buttons = this.layerName === 'low' ? this.buttonLayer('up') : this.buttonLayer('low');
            this.draw();
        }
    }, {
        key: 'hide',
        value: function hide() {
            this.isShow = false;
            this.canvas.height = 0;
        }
    }, {
        key: 'show',
        value: function show() {
            this.isShow = true;
            this.canvas.height = this.height;
            this.draw();
        }
    }, {
        key: 'setInput',
        value: function setInput(input) {
            this.inputEl = input;
        }
    }, {
        key: 'active',
        value: function active() {
            return this.isShow && this.windowMouse.clientY >= screen.height - this.height;
        }
    }, {
        key: 'clear',


        /**
         * 清空画布
         */
        value: function clear() {
            this.canvas.height = this.canvas.height;
        }
    }]);
    return Canvas;
}();

var global_canvas$1 = void 0;

var _init = (function (canvas, ctx) {
    global_canvas$1 = new Canvas(canvas, ctx);

    return global_canvas$1;
});

/**
 * @description 绑定dom
 */
var input = (function (dom, canvas) {
    var input = document.getElementById(dom);
    if (!input) {
        console.error("can't find the binding input dom");
        return;
    }

    new Input(input, canvas);
});

var global_canvas = void 0;

var inputMethod = {
    init: function init(dom) {
        var canvas = document.getElementById(dom);
        var ctx = void 0;

        if (canvas.getContext) {
            ctx = canvas.getContext('2d');
            global_canvas = _init(canvas, ctx);
        }
    },
    bind: function bind(dom) {
        if (!global_canvas) {
            console.error('init canvas first');
        }
        input(dom, global_canvas);
    }
};

inputMethod.init('canvas-input-method');
inputMethod.bind('input');

// module.exports = inputMethod;

return inputMethod;

})));
//# sourceMappingURL=bundle.js.map
