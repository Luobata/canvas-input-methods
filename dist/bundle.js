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

var Button = function () {

    // txt


    function Button(conf, ctx) {
        classCallCheck(this, Button);

        this.ctx = ctx;
        this.x = conf.x;
        this.y = conf.y;
        this.width = conf.width;
        this.height = conf.height;
        this.borderRadius = conf.borderRadius;
        this.background = conf.background;
        this.touchBackground = conf.touchBackground;
        this.untouchBackground = conf.untouchBackground;

        this.value = conf.value;
        this.touchColor = conf.touchColor;
        this.untouchColor = conf.untouchColor;
        this.size = conf.size;
        this.family = conf.family;
        this.weight = conf.weight;

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
 * @description 字母区域相关内容
 */

var Alpha = function () {

    // 小写字母面板
    // 大写字母面板
    // 数字面板
    // 符号面板
    // 比例


    function Alpha(alpha, rate) {
        classCallCheck(this, Alpha);

        this.rate = rate;
        this.alpha = alpha;

        this.init();
    }

    createClass(Alpha, [{
        key: 'init',
        value: function init() {
            this.lowInit();
            this.upInit();
            this.numberInit();
            this.symbolInit();
        }
    }, {
        key: 'lowInit',
        value: function lowInit() {
            this.low = [];

            this.low.push(this.generateArr(['q', 'w', 'e', 'r', 'y', 't', 'u', 'i', 'o', 'p']));

            this.low.push(this.generateArr(['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l']));

            this.low.push(this.generateArr(['z', 'x', 'c', 'v', 'b', 'n', 'm']));
        }
    }, {
        key: 'upInit',
        value: function upInit() {
            this.up = [];

            this.up.push(this.generateArr(['Q', 'W', 'E', 'R', 'Y', 'T', 'U', 'I', 'O', 'P']));

            this.up.push(this.generateArr(['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L']));

            this.up.push(this.generateArr(['Z', 'X', 'C', 'V', 'B', 'N', 'M']));
        }
    }, {
        key: 'numberInit',
        value: function numberInit() {
            this.number = [];

            this.number.push(this.generateArr(['1', '2', '3', '4', '5', '6', '7', '8', '9', '0']));

            this.number.push(this.generateArr(['-', '/', ':', ';', '(', ')', '$', '&', '@', '"']));

            this.number.push(this.generateArr(['.', ',', '?', '!', "'"]));
        }
    }, {
        key: 'symbolInit',
        value: function symbolInit() {
            this.symbol = [];

            this.symbol.push(this.generateArr(['[', ']', '{', '}', '#', '%', '^', '*', '+', '=']));

            this.symbol.push(this.generateArr(['_', '\\', '|', '~', '<', '>', '€', '£', '¥', '•']));

            this.symbol.push(this.generateArr(['.', ',', '?', '!', "'"]));
        }
    }, {
        key: 'generate',
        value: function generate(value) {
            return {
                value: value,
                width: this.alpha.width,
                height: this.alpha.height,
                size: this.alpha.size,
                family: this.alpha.family,
                weight: this.alpha.weight,
                untouchColor: this.alpha.untouchColor,
                untouchBackground: this.alpha.untouchBackground,
                touchColor: this.alpha.touchColor,
                touchBackground: this.alpha.touchBackground
            };
        }
    }, {
        key: 'generateArr',
        value: function generateArr(arr) {
            var _this = this;

            return arr.map(function (v) {
                return _this.generate(v);
            });
        }
    }]);
    return Alpha;
}();

var Canvas = function () {

    // 屏幕对于320的倍率
    // 屏幕宽度
    // 屏幕高度
    // 字母区的左右间隔
    // 字母区的上下间隔
    // 字母宽度
    // 字母高度
    // 字母初始位置X
    // 字母初始位置Y
    // 字母数组

    // button 数组
    // 选中的元素

    function Canvas(canvas, ctx) {
        classCallCheck(this, Canvas);

        this.canvas = canvas;
        this.ctx = ctx;

        this.windowInit();
        this.alphaInit();
        this.styleInit();
        this.sizeInit();

        this.buttonInit();
        this.eventInit();

        this.draw();
    }

    createClass(Canvas, [{
        key: 'alphaInit',


        /**
         * 初始化字母区
         */
        value: function alphaInit() {
            this.alpha = new Alpha({
                width: 27.5 * this.rate,
                height: 36 * this.rate,
                borderRadius: 5,
                size: '16px',
                family: 'Microsoft yahei',
                weight: 'bold',
                untouchBackground: '#fff',
                untouchColor: '#000',
                touchBackground: '#000',
                touchColor: '#fff'
            }, this.rate);
            console.log(this.alpha);
            this.alphas = [];

            // 第一行
            this.alphas.push(['q', 'w', 'e', 'r', 'y', 't', 'u', 'i', 'o', 'p']);

            // 第二行
            this.alphas.push(['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l']);

            // 第三行
            this.alphas.push(['z', 'x', 'c', 'v', 'b', 'n', 'm']);

            this.alphaPaddingWidth = 4 * this.rate;
            this.alphaPaddingHeight = 8 * this.rate;
            this.alphaWidth = 27.5 * this.rate;
            this.alphaHeight = 36 * this.rate;
            this.alphaStartX = (this.width - this.alpha.low[0].length * this.alphaWidth - (this.alpha.low[0].length - 1) * this.alphaPaddingWidth) / 2;
            this.alphaStartY = 10;
        }
    }, {
        key: 'windowInit',


        /**
         * 初始化布局相关参数
         */
        value: function windowInit() {
            var width = document.body.clientWidth;
            var rate = parseInt(width * 12 / 320, 10);
            this.rate = rate / 12;
            this.width = width;
            this.height = width * 0.8;
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
        }
    }, {
        key: 'buttonInit',


        /*
         * 初始化面板上按钮
         */
        value: function buttonInit() {
            this.buttons = [];

            for (var j = 0; j < this.alphas.length; j++) {
                for (var i = 0; i < this.alphas[j].length; i++) {
                    var item = this.alphas[i];
                    var alphaStartX = (this.width - this.alphas[j].length * this.alphaWidth - (this.alphas[j].length - 1) * this.alphaPaddingWidth) / 2;
                    var button = new Button({
                        x: alphaStartX + i * (this.alphaPaddingWidth + this.alphaWidth),
                        y: this.alphaStartY + j * (this.alphaPaddingHeight + this.alphaHeight),
                        width: this.alphaWidth,
                        height: this.alphaHeight,
                        borderRadius: 5,
                        value: this.alphas[j][i],
                        size: '16px',
                        family: 'Microsoft yahei',
                        weight: 'bold',
                        untouchBackground: '#fff',
                        untouchColor: '#000',
                        touchBackgroundColor: '#000',
                        touchColor: '#fff'
                    }, this.ctx);
                    this.buttons.push(button);
                }
            }
        }
    }, {
        key: 'input',


        /**
         * 输出事件
         */
        value: function input() {
            console.log(this.touching.value);
            this.touching = null;
        }
    }, {
        key: 'draw',
        value: function draw() {
            this.clear();
            this.ctx.fillStyle = '#d7d8dc';
            this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
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

var global_canvas = void 0;

var init = (function (canvas, ctx) {
    global_canvas = new Canvas(canvas, ctx);
});

var inputMethod = function inputMethod(dom) {
    var canvas = document.getElementById(dom);
    var ctx = void 0;

    if (canvas.getContext) {
        ctx = canvas.getContext('2d');
        init(canvas, ctx);
    }
};

inputMethod('canvas-input-method');

// module.exports = inputMethod;

return inputMethod;

})));
//# sourceMappingURL=bundle.js.map
