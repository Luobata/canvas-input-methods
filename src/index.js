import init from 'UI/index';
import input from 'EVENT/index';

let global_canvas;

const inputMethod = {
    init (dom) {
        const canvas = document.getElementById(dom);
        let ctx;

        if (canvas.getContext) {
            ctx = canvas.getContext('2d');
            global_canvas = init(canvas, ctx);
        }
    },
    bind (dom) {
        if (!global_canvas) {
            console.error('init canvas first');
        }
        input(dom, global_canvas);
    }
};

inputMethod.init('canvas-input-method');
inputMethod.bind('input');

// module.exports = inputMethod;
export default inputMethod;
