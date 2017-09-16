/**
 * @description canvas 画布容器
 */

import Button from 'UI/button';
import Alpha from 'UI/alpha';
import Input from 'EVENT/input';

import { functionInput } from 'UI/function';
import { bodyLock } from 'UTIL/index';

export default class Canvas {

    rate: number; // 屏幕对于320的倍率
    width: number; // 屏幕宽度
    height: number; // 屏幕高度

    buttonLayer: Function; // buttons 面板够赞函数
    buttons: Array<Button>; // button 数组
    touching: Button; // 选中的元素
    layerName: string; // 当前面板名称

    isShow: Boolean;

    inputEl: Input;
    windowMouse: Touch;

    constructor (canvas, ctx) {
        this.canvas = canvas;
        this.ctx = ctx;


        this.windowInit();
        this.alphaInit();
        this.styleInit();
        this.sizeInit();

        this.buttonLayer = this.buttonInit();
        this.buttons = this.buttonLayer('low');
        this.eventInit();

        this.hide();
        // this.show();
        this.draw();
    };

    /**
     * 初始化字母区
     */
    alphaInit () {
        this.alpha = new Alpha({
            layoutWidth: this.width,
            width: 27.5 * this.rate,
            height: 36 * this.rate,
            funcWidth: 40 * this.rate,
            borderRadius: 5,
            size: 20 * this.rate + 'px',
            family: 'Microsoft yahei',
            family: 'consolas',
            weight: 'bold',
            untouchBackground: '#fff',
            untouchColor: '#000',
            touchBackground: '#000',
            touchColor: '#fff',
            paddingWidth: 4 * this.rate,
            paddingHeight: 8 * this.rate,
            startY: 10,
            funcColor: {
                normal: '#aab2bd',
                special: '#007aff'
            }
        }, this.rate, this.ctx);

        this.height = this.alpha.prop.height * 4 + this.alpha.prop.paddingHeight * 3 + this.alpha.prop.startY * 2;
        console.log(this.alpha);
    };

    /**
     * 初始化布局相关参数
     */
    windowInit () {
        const width = document.body.clientWidth;
        const rate = parseInt(width * 12 / 320, 10);
        const backingStoreRatio = this.ctx.webkitBackingStorePixelRatio ||
            this.ctx.mozBackingStorePixelRatio ||
            this.ctx.msBackingStorePixelRatio ||
            this.ctx.oBackingStorePixelRatio ||
            this.ctx.backingStorePixelRatio || 1;
        const devicePixelRatio = window.devicePixelRatio || 1;

        this.rate = rate / 12 * 2;
        this.width = width * 2;
        this.height = width * 0.8 * 2;
    };

    /*
     * 调整canvas初始样式
     */
    styleInit () {
        this.canvas.style.position = 'fixed';
        this.canvas.style.bottom = '0';
        this.canvas.style.left = '0';
        this.canvas.style['box-sizing'] = 'border-box';

        this.canvas.style['width'] = this.width / 2 + 'px';
        this.canvas.style['height'] = this.height / 2 + 'px';
    };

    /**
     * 调整画布大小
     */
    sizeInit () {
        // canvas 的宽高用dom api设置 会有盒模型的问题 考虑border
        const width = this.width;
        const height = this.height;

        this.canvas.width = width;
        this.canvas.height = height;
    };

    /**
     * 给canvas绑定事件
     */
    eventInit () {
        const screenY = window.innerHeight;
        const moveIn = (e) => {
            let targetX = e.touches[0].clientX;
            let targetY = e.touches[0].clientY - (screenY - parseInt(this.canvas.style['height'], 10));

            for (let i of this.buttons) {
                if (i.isTouched(targetX * 2, targetY * 2)) {
                    i.touch(this.ctx);
                    this.touching = i;
                } else {
                    i.untouch();
                }
            }
            this.draw();
        };
        this.canvas.addEventListener('touchstart', (e) => {
            moveIn(e);
        });
        this.canvas.addEventListener('touchend', (e) => {
            for (let i of this.buttons) {
                i.untouch();
            }
            this.draw();
            this.input();
        });
        this.canvas.addEventListener('touchmove', (e) => {
            moveIn(e);
        });

        window.addEventListener('touchstart', (e) => {
            this.windowMouse = e.touches[0];
        });
    };

    /*
     * 初始化面板上按钮
     */
    buttonInit () {
        return (name) => {
            this.layerName = name;

            return this.alpha[name].get('buttons').concat(this.alpha.func.get(name));
        }
    };

    /**
     * 输出事件
     */
    input () {
        if (!this.touching) return;

        if (this.touching.type) {
            functionInput.call(this, this.touching.type);
        } else {
            console.log(this.touching.value);
            this.inputEl.input(this.touching.value);
        }
        this.touching = null;
    };

    draw () {
        this.clear();
        if (!this.isShow) return;

        this.ctx.fillStyle = '#d7d8dc';
        this.ctx.fillRect(0, 0, this.canvas.width * this.rate, this.canvas.height * this.rate);
        this.ctx.fill();

        for (let i of this.buttons) {
            i.draw();
        }
    };

    changeLowUp () {
        this.buttons = 
            this.layerName === 'low' ? this.buttonLayer('up') : this.buttonLayer('low');
        this.draw();
    };

    changeLayer (layer) {
        this.buttons = this.buttonLayer(layer);
        this.draw();
    };

    hide () {
        bodyLock.unlock();
        this.isShow = false;
        this.canvas.style['display'] = 'none';
    };

    show () {
        bodyLock.lock();
        this.isShow = true;
        this.canvas.height = this.height;
        this.canvas.style['display'] = 'block';
        this.draw();
    };

    setInput (input) {
        this.inputEl = input;
    };

    active () {
        return this.isShow && (this.windowMouse.clientY >= (window.innerHeight - this.height / 2));
    };

    /**
     * 清空画布
     */
    clear () {
        this.canvas.height = this.canvas.height;
    }
};
