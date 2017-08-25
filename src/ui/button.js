import { drawRoundRect } from 'UI/util';

export default class Button {
    x: number;
    y: number;
    width: number;
    height: number;
    borderRadius: number;
    color: string;
    background: string;
    value: string;

    constructor (conf) {
        this.x = conf.x;
        this.y = conf.y;
        this.width = conf.width;
        this.height = conf.height;
        this.borderRadius = conf.borderRadius;
        this.color = conf.color;
        this.background = conf.background;
        this.value = conf.value;
    };

    draw (ctx) {
        ctx.fillStyle = this.background;
        ctx.lineCap = 'square';

        // 绘制圆角矩形
        ctx.beginPath();
        drawRoundRect(ctx, this.x, this.y, this.width, this.height, this.borderRadius);
        ctx.fill();
        ctx.closePath();
    };
};
