import Button from 'UI/button';

export default class Canvas {
    constructor (canvas, ctx) {
        this.canvas = canvas;
        this.ctx = ctx;

        this.styleInit();
        this.sizeInit();

        this.draw();
        this.buttonInit();
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

    /*
     * 初始化面板上按钮
     */
    buttonInit () {
        let button = new Button({
            x: 10,
            y: 10,
            width: 32,
            height: 40,
            borderRadius: 5,
            background: '#fff',
            value: 'Q',
            size: '16px',
            family: 'Microsoft yahei',
            weight: 'bold',
            color: '#000'
        });

        button.draw(this.ctx);
    };

    draw () {
        this.ctx.fillStyle = '#d7d8dc';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.fill();
    };
};
