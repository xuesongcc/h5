const Check ={
    // 手机号正则
    checkPhone(p) {
        var reg = /^1([3456789])\d{9}$/
        let f = ''
        reg.test(p) ? (f = true) : (f = false)
        return f
    },
//    校验输入框只能输入数字
    checkNumber(p){
        var reg = /^[0-9]*$/;
        let f = '';
        reg.test(p) ? (f = true) : (f = false);
        return f
    },
//    校验中文
    checkZW(p){
        var reg = /[\u4e00-\u9fa5]/
        let f = '';
        reg.test(p) ? (f = true) : (f = false);
        return f
    }
}
export { Check }
