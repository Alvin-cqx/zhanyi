/*
** Create by 张晓坤 on 2018/9/9
*/

/**
 * 1.匀速动画
 * @param ele  要移动的元素
 * @param target  要移动的目标位置
 */
function animationMove ( ele,target ) {
    //1.清除之前的定时器，以本次移动为准
    clearInterval ( ele.timeID );
    //2.开始动画
    ele.timeID = setInterval ( function () {
        //2.1 获取当前位置
        var currentLeft = ele.offsetLeft;
        //2.2 开始移动
        //判断移动方向
        var isLeft = target > currentLeft ? true : false;
        isLeft ? currentLeft += 10 : currentLeft -= 15;
        ele.style.left = currentLeft + 'px';
        //2.3 边界检测： （1）停止移动  （2）元素复位
        if ( isLeft ? currentLeft >= target : currentLeft <= target ) {
            //(1)停止移动
            clearInterval ( ele.timeID );
            //(2)元素复位
            ele.style.left = target + 'px';
        }

    }, 10)
};


/**
 * 3.缓动动画封装
 * @param obj 要移动的元素
 * @param attrs 要移动的属性对象
 * @param fn （回调函数）一段代码，  如果调用者传了，动画执行完毕之后就执行这段代码，没有传就不执行
 */
function animationSlow ( obj, attrs,fn ) {
    //1.清除之前的定时器，以本次动画为准
    clearInterval ( obj.timeID )

    //2.开始动画：开启定时器
    obj.timeID = setInterval ( function () {

        /*开关思想：当某种操作产生的结果只有两种，可以用一个布尔类型表示开关 isAllOk
        1.提出假设：  isAllOk = true    （每一次移动之前假设这是最后一次移动，所有的属性都到达终点）
        2.验证假设：只要有任何一个属性没有到达终点，假设被推翻 修改开关状态为false
        3.根据开关的状态实现需求  为true就清除定时器，否则不清除
         */
        //一。开关思想第一步：提出假设  每一次移动之前都假设本次移动之后所有属性都到达终点
        var isAllOk = true;

        for (var key in  attrs){
            if (key == 'zIndex' || key == 'backgroundColor'){//层级或者颜色，直接修改
                //层级没有动画，直接修改即可
                obj.style[key] = attrs[key];
            }else if (key == 'opacity'){
                var target = attrs[key] * 100;//声明一个target局部变量来存储本次修改的目标值
                var attr = key;//声明一个attr局部变量存储本次要修改的属性名
                //2.1. 获取元素当前属性值 :
                //（1）透明度是小数，需要用parseFloat来将字符串转成小数  （2）小数计算会有误差，放大一百倍计算
                var current = parseFloat( getStyle ( obj, attr ) ) * 100;
                //2.2 计算本次移动的距离  (目标位置-当前位置)/10
                var step = ( target - current ) / 10
                //2.3.取整 step>0: 向上取整  step<0:向下取整
                step = step > 0 ? Math.ceil ( step ) : Math.floor ( step )
                //2.4.开始移动
                current += step
                obj.style[ attr ] = current/100
                //2.5.终点检测:到达终点清除定时器
                //二：开关思想第二步，验证假设   只要有任何一个属性没有到达终点，假设被推翻
                if ( current != target ) {
                    isAllOk = false;
                }
            }else{
                var target = attrs[key];//声明一个target局部变量来存储本次修改的目标值
                var attr = key;//声明一个attr局部变量存储本次要修改的属性名
                //2.1. 获取元素当前属性值 : 这里需要转成number，因为getCumputendStyle方式获取的属性值是一个字符串
                var current = parseInt ( getStyle ( obj, attr ) )
                //2.2 计算本次移动的距离  (目标位置-当前位置)/10
                var step = ( target - current ) / 10
                //2.3.取整 step>0: 向上取整  step<0:向下取整
                step = step > 0 ? Math.ceil ( step ) : Math.floor ( step )
                //2.4.开始移动
                current += step
                obj.style[ attr ] = current + "px"
                //2.5.终点检测:到达终点清除定时器
                //二：开关思想第二步，验证假设   只要有任何一个属性没有到达终点，假设被推翻
                if ( current != target ) {
                    isAllOk = false;
                }
            }

        }
        //三：根据开关状态实现需求
        if (isAllOk){
            //所有属性到达终点：清除定时器
            clearInterval ( obj.timeID )

            if(typeof  fn == 'function'){
                //如果调用者传递了第三个参数，就帮调用者来执行这个fn变量中的代码
                fn();
            }

        }

    }, 50 )


}


/**IE8获取元素样式属性兼容性封装
 * @param obj 要获取的元素
 * @param attr 要获取的属性
 */
function getStyle ( obj, attr ) {
    //能力检测
    if ( window.getComputedStyle ) {//非IE8
        //这里不能用点语法取值，只能用字符串语法
        return window.getComputedStyle ( obj, null )[ attr ]
    } else {//IE8
        return obj.currentStyle[ attr ]
    }
}


