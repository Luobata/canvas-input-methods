export default class Canvas {
    constructor (canvas, ctx) {
        this.canvas = canvas;
        this.ctx = ctx;

        this.styleInit();
        this.sizeInit();

        this.draw();
    };

    styleInit () {
        this.canvas.style.position = 'fixed';
        this.canvas.style.bottom = '0';
        this.canvas.style.left = '0';
        this.canvas.style['box-sizing'] = 'border-box';
    };

    sizeInit () {
        // canvas 的宽高用dom api设置 会有盒模型的问题 考虑border
        const width = document.body.offsetWidth;
        const height = width * 0.8;

        this.canvas.width = width;
        this.canvas.height = height;
    };

    draw () {
        this.ctx.fillStyle = '#d7d8dc';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.fill();
    };
};
