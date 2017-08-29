/**
 * @description input class
 */

export default class Input {
    constructor (el, canvas) {
        this.canvas = canvas;
        this.el = el;

        this.init();
    };

    init () {
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
            this.canvas.hide();
        });
    };

    bindCanvas () {
        this.canvas.setInput(this);
    };
};
