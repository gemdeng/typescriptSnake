export default class Snake {
    //获取蛇的容器
    element: HTMLElement
    //蛇的头部
    head: HTMLElement
    //蛇的身体(包括蛇头)，HTMLCollection是一个集合，集合会实时刷新，补充添加的新元素
    bodies: HTMLCollection

    constructor() {
        this.element = document.getElementById('snake')!
        this.head = document.querySelector('#snake >div')!
        this.bodies = this.element.getElementsByTagName('div')

    }

    //获取蛇的X坐标（蛇头的X坐标）
    get X() {
        return this.head.offsetLeft
    }
    //获取蛇的Y坐标（蛇头的Y坐标）
    get Y() {
        return this.head.offsetTop
    }
    //设置蛇的X坐标（蛇头的X坐标）
    set X(value: number) {
        //如果新值和旧值相同，则直接返回不再修改
        if (this.X === value) {
            return
        }
        //X的合法范围0-290之间
        if (value < 0 || value > 290) {
            if (value < 0) {
                value = 290
            }
            if (value > 290) {
                value = 0
            }
            // throw new Error('蛇撞墙了')
        }
        //修改x时，是在修改水平坐标，蛇在左右移动，蛇在向左移动的时候不能向右掉头，反之亦然
        if (this.bodies[1] && (this.bodies[1] as HTMLElement).offsetLeft === value) {

            //禁止掉头，即向反方向继续移动
            if (value > this.X) {
                //如果新值value大于旧值X,则说明蛇在向右走，此时发生掉头应该使蛇继续向左走
                value = this.X - 10
            } else {
                value = this.X + 10
            }

        }
        //移动身体
        this.moveBody()

        this.head.style.left = value + 'px'

        //检查有没有撞自己
        this.checkHeadBody()
    }
    //设置蛇的Y坐标（蛇头的Y坐标）
    set Y(value: number) {
        //如果新值和旧值相同，则直接返回不再修改
        if (this.Y === value) {
            return
        }
        //Y的合法范围0-290之间
        if (value < 0 || value > 290) {
            if (value < 0) {
                value = 290
            }
            if (value > 290) {
                value = 0
            }
            // throw new Error('蛇撞墙了,游戏结束!')
        }

        //修改y时，是在修改垂直坐标，蛇在上下移动，蛇在向上移动的时候不能向下掉头，反之亦然
        if (this.bodies[1] && (this.bodies[1] as HTMLElement).offsetTop === value) {

            //禁止掉头，即向反方向继续移动
            if (value > this.Y) {
                //如果新值value大于旧值Y,则说明蛇在向下走，此时发生掉头应该使蛇继续向上走
                value = this.Y - 10
            } else {
                value = this.Y + 10
            }

        }

        //移动身体
        this.moveBody()

        this.head.style.top = value + 'px'

        //检查有没有撞自己
        this.checkHeadBody()
    }

    //蛇增加身体的方法
    addBody() {
        //向element中添加div
        this.element.insertAdjacentHTML("beforeend", "<div></div>")
    }

    //蛇身体移动的方法
    moveBody() {
        //将后边的身体设置为前边身体的位置，从后往前变
        //遍历所有身体，从后往前
        for (let i = this.bodies.length - 1; i > 0; i--) {
            //获取前边身体的位置
            let X = (this.bodies[i - 1] as HTMLElement).offsetLeft
            let Y = (this.bodies[i - 1] as HTMLElement).offsetTop;


            //将值设置到当前身体上
            (this.bodies[i] as HTMLElement).style.left = X + 'px';
            (this.bodies[i] as HTMLElement).style.top = Y + 'px'
        }
    }

    //检查蛇头是否撞到自己身体的方法
    checkHeadBody() {
        //获取所有的身体，检查其是否和蛇头的坐标发生重叠
        for (let i = 1; i < this.bodies.length; i++) {
            let bd = this.bodies[i] as HTMLElement
            if (this.X === bd.offsetLeft && this.Y === bd.offsetTop) {
                //进入判断说明蛇头撞到了身体，游戏结束
                throw new Error('撞到自己了')
            }
        }
    }
}