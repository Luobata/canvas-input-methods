import Canvas from 'UI/canvas';

let global_canvas;

export default (canvas, ctx) => {
    global_canvas = new Canvas(canvas, ctx);
};
