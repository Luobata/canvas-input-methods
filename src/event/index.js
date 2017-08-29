/**
 * @description 绑定dom
 */
import Input from 'EVENT/input';

export default (dom, canvas) => {
    const input = document.getElementById(dom);
    if (!input) {
        console.error("can't find the binding input dom");
        return;
    }

    new Input(input, canvas);
};
