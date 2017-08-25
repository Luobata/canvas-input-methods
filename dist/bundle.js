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
    function Button(conf) {
        classCallCheck(this, Button);

        this.x = conf.x;
        this.y = conf.y;
        this.width = conf.width;
        this.height = conf.height;
        this.borderRadius = conf.borderRadius;
        this.color = conf.color;
        this.background = conf.background;
        this.value = conf.value;
    }

    createClass(Button, [{
        key: 'draw',
        value: function draw(ctx) {
            ctx.fillStyle = this.background;
            ctx.lineCap = 'square';

            // 绘制圆角矩形
            ctx.beginPath();
            drawRoundRect(ctx, this.x, this.y, this.width, this.height, this.borderRadius);
            ctx.fill();
            ctx.closePath();
        }
    }]);
    return Button;
}();

var Canvas = function () {
    function Canvas(canvas, ctx) {
        classCallCheck(this, Canvas);

        this.canvas = canvas;
        this.ctx = ctx;

        this.styleInit();
        this.sizeInit();

        this.draw();
        this.buttonInit();
    }

    createClass(Canvas, [{
        key: 'styleInit',
        value: function styleInit() {
            this.canvas.style.position = 'fixed';
            this.canvas.style.bottom = '0';
            this.canvas.style.left = '0';
            this.canvas.style['box-sizing'] = 'border-box';
        }
    }, {
        key: 'sizeInit',
        value: function sizeInit() {
            // canvas 的宽高用dom api设置 会有盒模型的问题 考虑border
            var width = document.body.offsetWidth;
            var height = width * 0.8;

            this.canvas.width = width;
            this.canvas.height = height;
        }
    }, {
        key: 'buttonInit',


        /*
         * 初始化面板上按钮
         */
        value: function buttonInit() {
            var button = new Button({
                x: 10,
                y: 10,
                width: 20,
                height: 20,
                borderRadius: 5,
                background: '#fff',
                value: 'Q'
            });

            button.draw(this.ctx);
        }
    }, {
        key: 'draw',
        value: function draw() {
            this.ctx.fillStyle = '#d7d8dc';
            this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
            this.ctx.fill();
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
