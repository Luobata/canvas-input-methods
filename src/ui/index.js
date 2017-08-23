import Canvas from 'UI/canvas';

let global_canvas;

const styleInit = () => {
    const canvas = global_canvas.canvas;
    canvas.style.position = 'fixed';
    canvas.style.bottom = '0';
    canvas.style.left = '0';
    canvas.style['box-sizing'] = 'border-box';
};

const sizeInit = () => {
    // canvas 的宽高用dom api设置 会有盒模型的问题 考虑border
    const canvas = global_canvas.canvas;
    const width = document.body.offsetWidth - 2;
    const height = width * 1.2;

    canvas.width = width;
    canvas.height = height;
};

export default (canvas, ctx) => {
    global_canvas = new Canvas(canvas, ctx);

    styleInit();
    sizeInit();
};
