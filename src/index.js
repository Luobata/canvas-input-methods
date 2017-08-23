import init from 'UI/index';

const inputMethod = (dom) => {
    const canvas = document.getElementById(dom);
    let ctx;

    if (canvas.getContext) {
        ctx = canvas.getContext('2d');
        init(canvas, ctx);
    }
};

inputMethod('canvas-input-method');

// module.exports = inputMethod;
export default inputMethod;
