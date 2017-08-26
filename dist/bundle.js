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

        this.value = conf.value;
        this.color = conf.color;
        this.size = conf.size;
        this.family = conf.family;
        this.weight = conf.weight;
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
            console.log(this.value);
        }
    }, {
        key: 'isTouched',


        /**
         * 判断是否被点击事件
         */
        value: function isTouched(x, y) {
            return x >= this.x && x <= this.x + this.width && y >= this.y && y <= this.y + this.height;
        }
    }]);
    return Button;
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

    function Canvas(canvas, ctx) {
        classCallCheck(this, Canvas);

        this.canvas = canvas;
        this.ctx = ctx;

        this.alphaInit();
        this.windowInit();
        this.styleInit();
        this.sizeInit();

        this.draw();
        this.buttonInit();
        this.eventInit();
    }

    createClass(Canvas, [{
        key: 'alphaInit',


        /**
         * 初始化字母区
         */
        value: function alphaInit() {
            this.alphas = [];

            // 第一行
            this.alphas.push(['q', 'w', 'e', 'r', 'y', 't', 'u', 'i', 'o', 'p']);

            // 第二行
            this.alphas.push(['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l']);

            // 第三行
            this.alphas.push(['z', 'x', 'c', 'v', 'b', 'n', 'm']);
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
            this.alphaPaddingWidth = 4 * this.rate;
            this.alphaPaddingHeight = 8 * this.rate;
            this.alphaWidth = 27.5 * this.rate;
            this.alphaHeight = 36 * this.rate;

            this.alphaStartX = (width - this.alphas[0].length * this.alphaWidth - (this.alphas[0].length - 1) * this.alphaPaddingWidth) / 2;
            this.alphaStartY = 10;
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
            var screenY = window.screen.height;
            var that = this;
            this.canvas.addEventListener('touchstart', function (e) {
                var targetX = e.touches[0].clientX;
                var targetY = e.touches[0].clientY - (screenY - this.height);

                var _iteratorNormalCompletion = true;
                var _didIteratorError = false;
                var _iteratorError = undefined;

                try {
                    for (var _iterator = that.buttons[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                        var i = _step.value;

                        if (i.isTouched(targetX, targetY)) {
                            i.touch(that.ctx);
                            break;
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
                        background: '#fff',
                        value: this.alphas[j][i],
                        size: '16px',
                        family: 'Microsoft yahei',
                        weight: 'bold',
                        color: '#000'
                    }, this.ctx);
                    this.buttons.push(button);
                    button.draw();
                }
            }
        }
    }, {
        key: 'draw',
        value: function draw() {
            this.ctx.fillStyle = '#d7d8dc';
            this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
            this.ctx.fill();
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
