(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global.canvasInputMethod = factory());
}(this, (function () { 'use strict';

var classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

var Canvas = function Canvas(canvas, ctx) {
    classCallCheck(this, Canvas);

    this.canvas = canvas;
    this.ctx = ctx;
};

var global_canvas = void 0;

var styleInit = function styleInit() {
    var canvas = global_canvas.canvas;
    canvas.style.position = 'fixed';
    canvas.style.bottom = '0';
    canvas.style.left = '0';
    canvas.style['box-sizing'] = 'border-box';
};

var sizeInit = function sizeInit() {
    // canvas 的宽高用dom api设置 会有盒模型的问题 考虑border
    var canvas = global_canvas.canvas;
    var width = document.body.offsetWidth - 2;
    var height = width * 1.2;

    canvas.width = width;
    canvas.height = height;
};

var init = (function (canvas, ctx) {
    global_canvas = new Canvas(canvas, ctx);

    styleInit();
    sizeInit();
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
