/*
 * @Author: xuesong 
 * @Date: 2019-09-10 10:48:23 
 * @Last Modified by: xuesong
 * @Last Modified time: 2019-09-10 15:16:46
 */
// 加减乘除避免精度问题封装

 function add(a, b) {
    var x, y, z;
    try {
        x = a.toString().split(".")[1].length;
    } catch (f) {
        x = 0;
    }
    try {
        y = b.toString().split(".")[1].length;
    } catch (f) {
        y = 0;
    }
    return z = Math.pow(10, Math.max(x, y)), (mul(a, z) + mul(b, z)) / z;
}

 function subtract(a, b) {
    var x, y, z;
    try {
        x = a.toString().split(".")[1].length;
    } catch (f) {
        x = 0;
    }
    try {
        y = b.toString().split(".")[1].length;
    } catch (f) {
        y = 0;
    }
    return z = Math.pow(10, Math.max(x, y)), (mul(a, z) - mul(b, z)) / z;
}

 function multiply(a, b) {
    var c = 0,
        d = a.toString(),
        e = b.toString();
    try {
        c += d.split(".")[1].length;
    } catch (f) {}
    try {
        c += e.split(".")[1].length;
    } catch (f) {}
    return Number(d.replace(".", "")) * Number(e.replace(".", "")) / Math.pow(10, c);
}

 function divide(a, b) {
    var c, d, e = 0,
        f = 0;
    try {
        e = a.toString().split(".")[1].length;
    } catch (g) {}
    try {
        f = b.toString().split(".")[1].length;
    } catch (g) {}
    return c = Number(a.toString().replace(".", "")), d = Number(b.toString().replace(".", "")), mul(c / d, Math.pow(10, f - e));
}

export {add,subtract,multiply,divide}