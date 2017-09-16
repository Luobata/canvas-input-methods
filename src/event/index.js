/**
 * @description 绑定dom
 */
import Input from 'EVENT/input';

export default (dom, canvas, sendFn) => {
    const input = document.getElementById(dom);
    if (!input) {
        console.error("can't find the binding input dom");
        return;
    }

    new Input(input, canvas, sendFn);
};
