/**
 * @description input class
 */

export default class Input {
    value: string;

    constructor (el, canvas) {
        this.canvas = canvas;
        this.el = el;

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
            this.canvas.show();
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
        this.el.innerHTML += val;
    };
};
