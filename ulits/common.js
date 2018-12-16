/*
** Create by 张晓坤 on 2018/9/4
* 本文件主要解决浏览器兼容性函数封装
*/

function id ( str ) {
    return document.getElementById(str);
}

/**1. 获取元素的文本
 * @param ele 要获取的元素
 */
function getText ( ele ) {
    //浏览器能力检测
    if (ele.innerText){//支持innerText
        return ele.innerText;
    }else{//不支持innerText
        return ele.textContent;
    }
}

/**
 * 2.设置元素的文本
 * @param ele 元素
 * @param text 文本
 */
function setText ( ele ,text) {
    if (ele.innerText){
        ele.innerText  = text;
    }else{
        ele.textContent = text;
    }
}

/**3.获取元素的上一个兄弟元素
 * @param ele  :元素
 * @return node:上一个兄弟元素
 */
function getPreviousElementSibling ( ele ) {
    if (ele.previousElementSibling){//谷歌火狐
        return ele.previousElementSibling;
    }else{//IE8浏览器
        //1.获取上一个兄弟节点
        var node = ele.previousSibling;
        /*node获得是哪些东西：文本  注释  元素 null
        循环继续的条件：（1）能找到  （2）节点类型不是1
         */
        //2.如果上一个节点存在  并且  节点类型不是1   继续往上找
        while(node && node.nodeType != 1){//只要node存在（不是null），并且节点类型不是1（不是元素），继续往上找
            node = node.previousSibling;
        };
        //循环结束条件： （1）node是null（找到顶了还是没有找到）  （2）nodeType == 1：找到了
        //3.返回找到的结果
        return node;
    }
}

/**4.获取元素的下一个兄弟元素
 * @param ele：元素
 * @return node :下一个兄弟元素
 */
function getNextElementSibling ( ele ) {
    //能力检测
    if (ele.nextElementSibling){//谷歌火狐
        return ele.nextElementSibling;
    }else{//IE8
        //1.获取下一个兄弟节点(文本  注释  元素  null)
        var node = ele.nextSibling;
        //2.继续往下找：（1）能找到  （2）节点类型不是1
        while(node && node.nodeType != 1){
            node = node.nextSibling;
        }
        //3.循环结束之后返回node
        return node;

    }
}

/**5.获取元素的第一个子元素
 *
 * @param ele 父元素
 * @return node  第一个子元素
 */
function getFirstElementChild ( ele ) {
    //能力检测
    if (ele.firstElementChild){//谷歌火狐
        return ele.firstElementChild;
    }else{//IE8
        //1.获取第一个子节点
        var node = ele.firstChild;
        //2.继续往下找条件  （1）能找到  （2）节点类型 != 1
        while(node && node.nodeType != 1){
            node = node.nextSibling
        };
        //3.返回node
        return node;
    }
}

/**6.获取元素的最后一个子元素
 *
 * @param ele 父元素
 * @return node 最后一个子元素
 */
function getlastElementChild ( ele ) {
    if (ele.lastElementChild){//谷歌火狐
        return ele.lastElementChild;
    }else{//IE8
        //1.获取最后一个子节点
        var node = ele.lastChild;
        //2.往上找条件  （1）节点存在  （2）节点类型 不是 1
        while(node && node.nodeType != 1){
            node = node.previousSibling;
        }
        //3.返回node
        return node;
    }
}

/**7.IE8获取元素样式属性兼容性封装
 * @param obj 要获取的元素
 * @param attr 要获取的属性
 */
function getStyle ( obj,attr ) {
    //能力检测
    if (window.getComputedStyle){//非IE8
        //这里不能用点语法取值，只能用字符串语法
        return window.getComputedStyle(obj,null)[attr];
    }else{//IE8
        return obj.currentStyle[attr];
    }
}

/**8.获取页面滚动出去的距离
 *
 * @return {{scrollLeft: number, scrollTop: number}}
 */
function getScroll (  ) {

    //使用逻辑或的短路运算解决兼容性封装
    //一真则真: 找真 ：只要左边式子的值能转为true，则无条件返回左边式子的值，否则无条件返回右边式子的值
    //最后面那个0是因为某些特殊情况下，页面没有滚动前面三个属性可能获取的是0或者undefined，都是false
    //手动写一个0可以提高代码阅读性
    var x = window.pageXOffset || document.documentElement.scrollLeft || document.body.scrollLeft || 0;
    var y = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;

    return {
        scrollLeft : x,
        scrollTop: y
    };
}

/**9.获取页面可视区域大小
 *
 * @return {{clientWidth: number, clientHeight: number}}
 */
function getClient (  ) {
    return {
        clientWidth : window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth || 0,
        clientHeight : window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight || 0
    }
}

/**10.获取事件触发点相对于页面左上角距离
 *
 * @param e 当前事件的事件对象
 * @return {{pageX: number, pageY: number}}
 */
function getPagePoint ( e ) {
    e = e || window.event;
    return {
        pageX : e.clientX + getScroll().scrollLeft,
        pageY : e.clientY + getScroll().scrollTop
    }
}

/**
 * 11.给元素添加多个同名事件
 * @param ele 元素
 * @param type  事件类型   去掉on   click mouseover
 * @param fn 事件处理函数
 */
function addEvent ( ele,type,fn ) {
    if (ele.addEventListener){//谷歌火狐
        ele.addEventListener(type,fn, false);
    }else if (ele.attachEvent){//IE8
        ele.attachEvent('on' + type, fn);
    }else{//某些浏览器，都不支持上面两种方法，使用点语法添加
        ele['on' + type] = fn;
    }
}


/**
 * 12.移除事件
 * @param ele 元素
 * @param type 事件类型  不要on
 * @param fn  事件处理函数
 */
function removeEvent (  ele,type,fn) {
    if(ele.removeEventListener){//谷歌火狐
        ele.removeEventListener(type,fn);
    }else if (ele.detachEvent){//IE8
        ele.detachEvent('on' + type,fn);
    }else{//某些浏览器都不支持，点语法
        ele['on' + type] = null;
    }
}
