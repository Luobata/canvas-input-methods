import Button from 'UI/button';
import Alpha from 'UI/alpha';

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

    buttons: Array<Button>; // button 数组
    touching: Button; // 选中的元素

    constructor (canvas, ctx) {
        this.canvas = canvas;
        this.ctx = ctx;

        this.windowInit();
        this.alphaInit();
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
            touchColor: '#fff',
            paddingWidth: 4 * this.rate,
            paddingHeight: 8 * this.rate,
            startY: 10
        }, this.rate);
        this.alpha.startX = (this.width - this.alpha.low.get(1).length * this.alphaWidth - (this.alpha.low.get(1).length - 1) * this.alpha.paddingWidth) / 2;
        console.log(this.alpha);
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
        const moveIn = (e) => {
            let targetX = e.touches[0].clientX;
            let targetY = e.touches[0].clientY - (screenY - this.height);

            for (let i of this.buttons) {
                if (i.isTouched(targetX, targetY)) {
                    i.touch(this.ctx);
                    this.touching = i;
                } else {
                    i.untouch();
                }
            }
            this.draw();
        };
        this.canvas.addEventListener('touchstart', (e) => {
            moveIn(e);
        });
        this.canvas.addEventListener('touchend', (e) => {
            for (let i of this.buttons) {
                i.untouch();
            }
            this.draw();
            this.input();
        });
        this.canvas.addEventListener('touchmove', (e) => {
            moveIn(e);
        });
    };

    /*
     * 初始化面板上按钮
     */
    buttonInit () {
        this.buttons = [];

        for (const [key, value] of this.alpha.low) {
            for (let i = 0; i < value.length; i++) {
                let item = value[i];
                let alphaStartX = (this.width - value.length * this.alpha.prop.width - (value.length - 1) * this.alpha.prop.paddingWidth) / 2;
                let button = new Button(
                        Object.assign({
                            x: alphaStartX + i * (this.alpha.prop.paddingWidth + this.alpha.prop.width),
                            y: this.alpha.prop.startY + (key - 1) * (this.alpha.prop.paddingHeight + this.alpha.prop.height),
                        }, item),
                        this.ctx
                        );
                this.buttons.push(button);
            }
        }
    };

    /**
     * 输出事件
     */
    input () {
        console.log(this.touching.value);
        this.touching = null;
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
