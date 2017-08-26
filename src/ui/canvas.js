import Button from 'UI/button';

export default class Canvas {

    rate: number; // 屏幕对于320的倍率
    width: number; // 屏幕宽度
    height: number; // 屏幕高度
    alphaPaddingWidth: number; // 字母区的左右间隔
    alphaPaddingHeight: number; // 字母区的上下间隔
    alphaWidth: number; // 字母宽度
    alphaHeight: number; // 字母高度
    alphaStartX: number; // 字母初始位置X
    alphaStartY: number; // 字母初始位置Y
    alphas: Array; // 字母数组

    buttons: Array<Button>; // button 数组

    constructor (canvas, ctx) {
        this.canvas = canvas;
        this.ctx = ctx;

        this.alphaInit();
        this.windowInit();
        this.styleInit();
        this.sizeInit();

        this.buttonInit();
        this.eventInit();

        this.draw();
    };

    /**
     * 初始化字母区
     */
    alphaInit () {
        this.alphas = [];

        // 第一行
        this.alphas.push([
            'q', 'w', 'e', 'r', 'y', 't', 'u', 'i', 'o', 'p' 
        ]);

        // 第二行
        this.alphas.push([
            'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'
        ]);

        // 第三行
        this.alphas.push([
            'z', 'x', 'c', 'v', 'b', 'n', 'm'
        ]);
    };

    /**
     * 初始化布局相关参数
     */
    windowInit () {
        const width = document.body.clientWidth;
        const rate = parseInt(width * 12 / 320, 10);
        this.rate = rate / 12;
        this.width = width;
        this.height = width * 0.8;
        this.alphaPaddingWidth = 4 * this.rate;
        this.alphaPaddingHeight = 8 * this.rate;
        this.alphaWidth = 27.5 * this.rate;
        this.alphaHeight = 36 * this.rate;

        this.alphaStartX = (width - this.alphas[0].length * this.alphaWidth - (this.alphas[0].length - 1) * this.alphaPaddingWidth) / 2;
        this.alphaStartY = 10;
    };

    /*
     * 调整canvas初始样式
     */
    styleInit () {
        this.canvas.style.position = 'fixed';
        this.canvas.style.bottom = '0';
        this.canvas.style.left = '0';
        this.canvas.style['box-sizing'] = 'border-box';
    };

    /**
     * 调整画布大小
     */
    sizeInit () {
        // canvas 的宽高用dom api设置 会有盒模型的问题 考虑border
        const width = this.width;
        const height = this.height;

        this.canvas.width = width;
        this.canvas.height = height;
    };

    /**
     * 给canvas绑定事件
     */
    eventInit () {
        const screenY = window.screen.height;
        this.canvas.addEventListener('touchstart', (e) => {
            let targetX = e.touches[0].clientX;
            let targetY = e.touches[0].clientY - (screenY - this.height);

            for (let i of this.buttons) {
                i.untouch();
                if (i.isTouched(targetX, targetY)) {
                    i.touch(this.ctx);
                }
            }
            this.draw();
        });
        this.canvas.addEventListener('touchmove', (e) => {
            console.log(e);
        });
    };

    /*
     * 初始化面板上按钮
     */
    buttonInit () {
        this.buttons = [];

        for (let j = 0; j < this.alphas.length; j++) {
            for (let i = 0; i < this.alphas[j].length; i++) {
                let item = this.alphas[i];
                let alphaStartX = (this.width - this.alphas[j].length * this.alphaWidth - (this.alphas[j].length - 1) * this.alphaPaddingWidth) / 2;
                let button = new Button({
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
    };

    draw () {
        this.clear();
        this.ctx.fillStyle = '#d7d8dc';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.fill();

        for (let i of this.buttons) {
            i.draw();
        }
    };

    /**
     * 清空画布
     */
    clear () {
        this.canvas.height = this.canvas.height;
    }
};
