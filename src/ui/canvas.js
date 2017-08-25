import Button from 'UI/button';

export default class Canvas {
    rate: number; // 屏幕对于320的倍率
    alphaPaddingWidth: number; // 字母区的左右间隔
    alphaPaddingHeight: number; // 字母区的上下间隔
    alphaWidth: number; // 字母宽度
    alphaHeight: number; // 字母高度
    alphaStartX: number; // 字母初始位置X
    alphaStartY: number; // 字母初始位置Y
    alphas: Array; // 字母数组

    constructor (canvas, ctx) {
        this.canvas = canvas;
        this.ctx = ctx;

        this.alphaInit();
        this.windowInit();
        this.styleInit();
        this.sizeInit();

        this.draw();
        this.buttonInit();
    };

    alphaInit () {
        this.alphas = [];

        this.alphas.push([
            'q', 'w', 'e', 'r', 'y', 't', 'u', 'i', 'o', 'p' 
        ]);
    };

    windowInit () {
        const width = document.body.clientWidth;
        const rate = parseInt(width * 12 / 320, 10);
        this.rate = rate / 12;
        this.alphaPaddingWidth = 4 * this.rate;
        this.alphaPaddingHeight = 8 * this.rate;
        this.alphaWidth = 27.5 * this.rate;
        this.alphaHeight = 36 * this.rate;

        this.alphaStartX = (width - this.alphas[0].length * this.alphaWidth - (this.alphas[0].length - 1) * this.alphaPaddingWidth) / 2;
        this.alphaStartY = 10;
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
        for (let i = 0; i < this.alphas[0].length; i++) {
            let item = this.alphas[i];
            let button = new Button({
                x: this.alphaStartX + i * (this.alphaPaddingWidth + this.alphaWidth),
                y: 10,
                width: this.alphaWidth,
                height: this.alphaHeight,
                borderRadius: 5,
                background: '#fff',
                value: this.alphas[0][i],
                size: '16px',
                family: 'Microsoft yahei',
                weight: 'bold',
                color: '#000'
            });
            button.draw(this.ctx);
        }
    };

    draw () {
        this.ctx.fillStyle = '#d7d8dc';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.fill();
    };
};
