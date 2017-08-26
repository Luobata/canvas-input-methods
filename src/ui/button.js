import { drawRoundRect, drawShadow } from 'UI/util';

export default class Button {

    x: number;
    y: number;
    width: number;
    height: number;
    borderRadius: number;
    background: string;

    // txt
    value: string;
    color: string;
    size: string;
    family: string;
    weight: number;

    constructor (conf, ctx) {
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
    };

    draw () {
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
        this.ctx.font =  `${this.size} ${this.family}`;
        this.ctx.textAlign = 'center';
        this.ctx.textBaseline = 'middle';
        this.ctx.fillText(this.value, this.x + this.width / 2, this.y + this.height / 2);
    };

    touch () {
        console.log(this.value);
        this.color = this.touchColor;
        this.background = this.touchBackground;
    };

    untouch () {
        this.color = this.untouchColor;
        this.background = this.untouchBackground;
    }

    /**
     * 判断是否被点击事件
     */
    isTouched (x, y) {
        return x >= this.x &&
            x <= this.x + this.width &&
            y >= this.y &&
            y <= this.y + this.height;
    }
};
