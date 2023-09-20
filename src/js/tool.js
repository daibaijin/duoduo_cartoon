// 封装获取dom对象的函数
function $(cssSelector) {
    var dom = document.querySelectorAll(cssSelector);
    if (dom.length === 0) {
        return null;
    }
    if (dom.length === 1) {
        return dom[0];
    }
    return dom;
}


// 封装获取计算以后样式属性值的函数
function getStyle(dom, attr) {
    return window.getComputedStyle(dom)[attr];
}

/* 
            dom参数表示要做动画dom对象
            obj参数表示要做动画的CSS属性名与CSS属性目标值
            callback可选参数, 表示动画完成以后的回调函数
        */
function animate(dom, obj, callback) {
    // 清除之前的定时器
    window.clearInterval(dom.interID);

    // 开启定时器
    dom.interID = window.setInterval(function () {
        // 定义一个变量,假设所有属性都达到了目标值
        var flag = true;

        // for...in遍历obj对象
        for (var attr in obj) {
            // 获取属性的目标值
            var target = obj[attr];
            // 获取当前属性值
            var currentVal = parseInt(getStyle(dom, attr));
            // 判断当前属性值是否达到目标值
            if (currentVal != target) { // 没有达到目标值
                // 修改flag变量的值 改为flag
                flag = false;
            }

            // 动画运动速度
            // 缓慢速度的计算公式:  (目标值-当前值) / 10
            var speed = (target - currentVal) / 10;
            // 速度为正值时,我们进行向上取整
            // 速度为负值时,我们进行向下取整
            speed = speed >= 0 ? Math.ceil(speed) : Math.floor(speed);
            // 设置属性值
            dom.style[attr] = currentVal + speed + "px";
        }

        // 判断flag变量的值是否为true
        if (flag) { // 如果为true,代表所有属性都已经达到了目标值
            // 清除定时器
            clearInterval(dom.interID);

            // 如果callback参数存在,并且callback是一个函数,我们才需要调用回调函数
            if (callback !== undefined && typeof (callback) == "function") {
                // 如果所有属性都达到了目标值, 表示动画完成了, 我们就调用回调函数
                callback();
            }
        }
    }, 15);
}