/**
 * @description input class
 */

export default class Input {
    value: string;
    sendFn: Function;

    constructor (el, canvas, sendFn) {
        this.canvas = canvas;
        this.el = el;
        this.sendFn = sendFn;

        this.init();
    };

    init () {
        this.value = '';

        this.attributeInit();
        this.eventInit();
        this.bindCanvas();
    };

    attributeInit () {
        this.el.setAttribute('readonly', true);
    };

    eventInit () {
        this.el.addEventListener('touchstart', (e) => {
        });
        this.el.addEventListener('focus', (e) => {
            this.canvas.show();
            //this.el.blur();
        });

        this.el.addEventListener('blur', (e) => {
            if (this.canvas.active()) {
                this.el.focus();
            } else {
                this.canvas.hide();
            }
        });
    };

    bindCanvas () {
        this.canvas.setInput(this);
    };

    input (val) {
        this.el.value += val;
    };

    deleteOne () {
        this.el.value = this.el.value.substr(0, this.el.value.length - 1);
    };
};
