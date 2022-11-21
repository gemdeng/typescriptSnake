//定义食物Food类
export default class Food {
    //定义一个属性表示食物所对应的元素
    element: HTMLElement
    constructor() {
        //获取页面中的food元素并将其赋值给element,!为非空断言符号
        this.element = document.getElementById('food')!
    }
    //定义一个获取食物X轴坐标的方法
    get X() {
        return this.element.offsetLeft
    }
    //定义一个获取食物Y轴坐标的方法
    get Y() {
        return this.element.offsetTop
    }

    //修改食物的位置
    change() {
        //生成一个随机的位置
        //食物的位置最小是0，最大是290
        //蛇移动一次就是一格，一格的大小就是10，能让蛇吃到，即蛇的偏移量与食物相同。且不能与蛇重合
        let top = Math.floor(Math.random() * 30) * 10
        let left = Math.floor(Math.random() * 30) * 10
        this.element.style.left = left + 'px'
        this.element.style.top = top + 'px'
    }
}
