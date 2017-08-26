/**
 * @description 字母区域相关内容
 */

export default class Alpha {

    low: Array; // 小写字母面板
    up: Array; // 大写字母面板
    number: Array; // 数字面板
    symbol: Array; // 符号面板
    rate: number; // 比例

    alpha: object;

    constructor (alpha, rate) {
        this.rate = rate;
        this.alpha = alpha;

        this.init();
    };

    init () {
        this.lowInit();
        this.upInit();
        this.numberInit();
        this.symbolInit();
    };

    lowInit () {
        this.low = [];

        this.low.push(this.generateArr([
            'q', 'w', 'e', 'r', 'y', 't', 'u', 'i', 'o', 'p' 
        ]));

        this.low.push(this.generateArr([
            'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'
        ]));

        this.low.push(this.generateArr([
            'z', 'x', 'c', 'v', 'b', 'n', 'm'
        ]));
    };

    upInit () {
        this.up = [];

        this.up.push(this.generateArr([
            'Q', 'W', 'E', 'R', 'Y', 'T', 'U', 'I', 'O', 'P' 
        ]));

        this.up.push(this.generateArr([
            'A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'
        ]));

        this.up.push(this.generateArr([
            'Z', 'X', 'C', 'V', 'B', 'N', 'M'
        ]));
    };

    numberInit () {
        this.number = [];

        this.number.push(this.generateArr([
            '1', '2', '3', '4', '5', '6', '7', '8', '9', '0'
        ]));

        this.number.push(this.generateArr([
            '-', '/', ':', ';', '(', ')', '$', '&', '@', '"'
        ]));

        this.number.push(this.generateArr([
            '.', ',', '?', '!', "'"
        ]));
    };

    symbolInit () {
        this.symbol = [];

        this.symbol.push(this.generateArr([
            '[', ']', '{', '}', '#', '%', '^', '*', '+', '='
        ]));

        this.symbol.push(this.generateArr([
            '_', '\\', '|', '~', '<', '>', '€', '£', '¥', '•'
        ]));

        this.symbol.push(this.generateArr([
            '.', ',', '?', '!', "'"
        ]));
    };

    generate (value) {
        return {
            value: value,
            width: this.alpha.width,
            height: this.alpha.height,
            size: this.alpha.size,
            family: this.alpha.family,
            weight: this.alpha.weight,
            untouchColor: this.alpha.untouchColor,
            untouchBackground: this.alpha.untouchBackground,
            touchColor: this.alpha.touchColor,
            touchBackground: this.alpha.touchBackground
        }
    };

    generateArr (arr) {
        return arr.map((v) => this.generate(v));
    };
};
