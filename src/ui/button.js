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

    constructor (conf) {
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
    };

    draw (ctx) {
        ctx.save();
        ctx.fillStyle = this.background;
        ctx.lineCap = 'square';

        ctx.beginPath();

        // 绘制圆角矩形
        drawRoundRect(ctx, this.x, this.y, this.width, this.height, this.borderRadius);
        // 绘制阴影
        drawShadow(ctx, 3, 1, 1, '#000');
        ctx.closePath();
        ctx.fill();
        // 绘制文字

        ctx.restore();
        ctx.fillStyle = this.color;
        ctx.font =  `${this.size} ${this.family}`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(this.value, this.x + this.width / 2, this.y + this.height / 2);
    };
};
