/**
 * @description 字母区域相关内容
 */

export default class Alpha {

    low: Map; // 小写字母面板
    up: Map; // 大写字母面板
    number: Map; // 数字面板
    symbol: Map; // 符号面板
    rate: number; // 比例

    prop: object;

    constructor (alpha, rate) {
        this.rate = rate;
        this.prop = alpha;

        this.init();
    };

    init () {
        this.lowInit();
        this.upInit();
        this.numberInit();
        this.symbolInit();
    };

    lowInit () {
        this.low = new Map();

        this.low.set(1, this.generateArr([
            'q', 'w', 'e', 'r', 'y', 't', 'u', 'i', 'o', 'p' 
        ]));

        this.low.set(2, this.generateArr([
            'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'
        ]));

        this.low.set(3, this.generateArr([
            'z', 'x', 'c', 'v', 'b', 'n', 'm'
        ]));
    };

    upInit () {
        this.up = new Map();

        this.up.set(1, this.generateArr([
            'Q', 'W', 'E', 'R', 'Y', 'T', 'U', 'I', 'O', 'P' 
        ]));

        this.up.set(2, this.generateArr([
            'A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'
        ]));

        this.up.set(3, this.generateArr([
            'Z', 'X', 'C', 'V', 'B', 'N', 'M'
        ]));
    };

    numberInit () {
        this.number = new Map();

        this.number.set(1, this.generateArr([
            '1', '2', '3', '4', '5', '6', '7', '8', '9', '0'
        ]));

        this.number.set(2, this.generateArr([
            '-', '/', ':', ';', '(', ')', '$', '&', '@', '"'
        ]));

        this.number.set(3, this.generateArr([
            '.', ',', '?', '!', "'"
        ]));
    };

    symbolInit () {
        this.symbol = new Map();

        this.symbol.set(1, this.generateArr([
            '[', ']', '{', '}', '#', '%', '^', '*', '+', '='
        ]));

        this.symbol.set(2, this.generateArr([
            '_', '\\', '|', '~', '<', '>', '€', '£', '¥', '•'
        ]));

        this.symbol.set(3, this.generateArr([
            '.', ',', '?', '!', "'"
        ]));
    };

    generate (value) {
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

    generateArr (arr) {
        return arr.map((v) => this.generate(v));
    };
};
