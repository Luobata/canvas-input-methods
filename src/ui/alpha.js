/**
 * @description class canvas 与 class button 中间层
 */
import Button from 'UI/button';

// 定义私有方法symbol
const generateArr = Symbol('generateArr');
const generate = Symbol('generate');
const generateButton = Symbol('generateButton');

export default class Alpha {

    low: Map; // 小写字母面板
    up: Map; // 大写字母面板
    number: Map; // 数字面板
    symbol: Map; // 符号面板
    func: Map; // 功能区面板
    rate: number; // 比例

    /**
     * @param {number} prop.layoutWidth         整个画布宽度
     * @param {number} prop.width               alpha宽度
     * @param {number} prop.height              alpha高度
     * @param {number} prop.funcWidth           alpha功能型按键宽度
     * @param {number} prop.borderRadius        alpha圆角
     * @param {string} prop.size                字体大小(带px)
     * @param {string} prop.family              字体类型
     * @param {string} prop.weight              字体粗细
     * @param {string} prop.untouchBackground   非选中态背景色
     * @param {string} prop.untouchColor        非选中态字体颜色
     * @param {string} prop.touchBackground     选中态背景色
     * @param {string} prop.touchColor          选中态字体颜色
     * @param {number} prop.paddingWidth        每个button的左右距离
     * @param {number} prop.paddingHeight       每个button的上下距离
     * @param {number} prop.startX              canvas布局的左上角位置x
     * @param {number} prop.startY              canvas布局的左上角位置y
     * @param {string} prop.type                输入内容的类型 只有功能型按钮才有
     */
    prop: object;

    constructor (alpha, rate, ctx) {
        this.ctx = ctx;
        this.rate = rate;
        this.prop = alpha;

        this.init();
    };

    init () {
        this.lowInit();
        this.prop.startX = (this.prop.layoutWidth - this.low.get(1).length * this.prop.width - (this.low.get(1).length - 1) * this.prop.paddingWidth) / 2;
        this.upInit();
        this.numberInit();
        this.symbolInit();

        this.functionInit();
    };

    lowInit () {
        this.low = new Map();

        this.low.set(1, this[generateArr]([
            'q', 'w', 'e', 'r', 'y', 't', 'u', 'i', 'o', 'p' 
        ]));

        this.low.set(2, this[generateArr]([
            'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'
        ]));

        this.low.set(3, this[generateArr]([
            'z', 'x', 'c', 'v', 'b', 'n', 'm'
        ]));

        this.low.set('buttons', this[generateButton]('low'));
    };

    upInit () {
        this.up = new Map();

        this.up.set(1, this[generateArr]([
            'Q', 'W', 'E', 'R', 'Y', 'T', 'U', 'I', 'O', 'P' 
        ]));

        this.up.set(2, this[generateArr]([
            'A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'
        ]));

        this.up.set(3, this[generateArr]([
            'Z', 'X', 'C', 'V', 'B', 'N', 'M'
        ]));

        this.low.set('buttons', this[generateButton]('up'));
    };

    numberInit () {
        this.number = new Map();

        this.number.set(1, this[generateArr]([
            '1', '2', '3', '4', '5', '6', '7', '8', '9', '0'
        ]));

        this.number.set(2, this[generateArr]([
            '-', '/', ':', ';', '(', ')', '$', '&', '@', '"'
        ]));

        this.number.set(3, this[generateArr]([
            '.', ',', '?', '!', "'"
        ]));

        this.low.set('buttons', this[generateButton]('number'));
    };

    symbolInit () {
        this.symbol = new Map();

        this.symbol.set(1, this[generateArr]([
            '[', ']', '{', '}', '#', '%', '^', '*', '+', '='
        ]));

        this.symbol.set(2, this[generateArr]([
            '_', '\\', '|', '~', '<', '>', '€', '£', '¥', '•'
        ]));

        this.symbol.set(3, this[generateArr]([
            '.', ',', '?', '!', "'"
        ]));

        this.low.set('buttons', this[generateButton]('symbol'));
    };

    // 功能区初始化
    functionInit () {
        this.func = [];

        const gen = (v, x, y, type) => {
            return new Button(
                Object.assign(
                    this[generate](v),
                    {
                        x: x,
                        y: y,
                        width: this.prop.funcWidth,
                        type: type
                    }
                ),
                this.ctx
            );
        };

        this.func.push(gen(
            '↑',
            this.prop.startX,
            this.low.get(3)[0].y,
            'shift'
        ));

        this.func.push(gen(
            '←',
            this.prop.layoutWidth - this.prop.paddingWidth - this.prop.funcWidth,
            this.low.get(3)[0].y,
            'delete'
        ));
    };

    [generate] (value) {
        return {
            value: value,
            width: this.prop.width,
            height: this.prop.height,
            borderRadius: this.prop.borderRadius,
            size: this.prop.size,
            family: this.prop.family,
            weight: this.prop.weight,
            untouchColor: this.prop.untouchColor,
            untouchBackground: this.prop.untouchBackground,
            touchColor: this.prop.touchColor,
            touchBackground: this.prop.touchBackground
        }
    };

    [generateArr] (arr) {
        return arr.map((v) => this[generate](v));
    };

    [generateButton] (name) {
        let buttonArr = [];

        for (const [key, value] of this[name]) {
            for (let i = 0; i < value.length; i++) {
                let item = value[i];
                let alphaStartX = (this.prop.layoutWidth - value.length * this.prop.width - (value.length - 1) * this.prop.paddingWidth) / 2;
                item.x = alphaStartX + i * (this.prop.paddingWidth + this.prop.width);
                item.y = this.prop.startY + (key - 1) * (this.prop.paddingHeight + this.prop.height);
                let button = new Button(
                    item,
                    this.ctx
                );
                buttonArr.push(button);
            }
        }

        return buttonArr;
    };
};
