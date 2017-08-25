/**
 * @description 画布公用方法
 */

// 圆角矩形
export const drawRoundRect = (
    ctx,
    x, // 端点1x
    y, // 端点1y
    w, // 端点2x
    h, // 端点2y
    r // 半径
) => {
    ctx.moveTo(x + r, y);
    ctx.arcTo(x + w, y, x + w, y + h, r); // 绘制1/4
    ctx.arcTo(x + w, y + h, x, y + h, r);
    ctx.arcTo(x, y + h, x, y, r);
    ctx.arcTo(x, y, x + w, y, r);
};
