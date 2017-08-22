import init from 'UI/index';

export default (dom) => {
    const canvas = document.getElementById(dom);
    let ctx;

    if (canvas.getContext) {
        ctx = canvas.getContext('2d');
        init(canvas, ctx);
    }
};
