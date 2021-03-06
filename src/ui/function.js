/**
 * @description 大键位功能区功能函数
 */

// 大键位函数入口，this 指向Canvas 通过call方法调用 不能写成箭头函数
export const functionInput = function (type) {
    if (type === 'shift') {
        this.changeLowUp();
    }

    if (type === 'delete') {
        this.inputEl.deleteOne();
    }

    if (type === 'space') {
        this.touching = {
            value: ' '
        }
        this.input();
    }

    if (type === 'number') {
        this.changeLayer('number');
    }

    if (type === 'symbol') {
        this.changeLayer('symbol');
    }

    if (type === 'alpha') {
        this.changeLayer('low');
    }

    if (type === 'send') {
        this.inputEl.sendFn();
    }
};
