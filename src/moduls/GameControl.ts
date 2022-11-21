import Snake from "./Snake";
import ScorePanel from "./ScorePanel";
import Food from "./Food";

//游戏控制器，控制其他的所有类
export default class GameControl {
    //定义三个属性,蛇，食物，记分牌
    snake: Snake
    food: Food
    scorePanel: ScorePanel
    //创建一个属性来存储蛇的移动方向，按键方向
    direction: String = ''
    //创建一个属性用来记录游戏是否结束
    isLive: boolean = true

    constructor() {
        this.snake = new Snake()
        this.food = new Food()
        this.scorePanel = new ScorePanel()
        this.init()
    }
    //游戏初始化方法，调用后游戏即开始
    init() {
        //绑定键盘按键按下的事件,注意this指向问题，不能为document,加bind将this指向GameControl
        document.addEventListener("keydown", this.keydownHandler.bind(this))
        //调用run方法，使蛇移动
        this.run()
    }
    //键盘按下的响应函数
    keydownHandler(event: KeyboardEvent) {
        /*
       控制方向 ArrowUp/w   ArrowDown/s   ArrowLeft/a   ArrowRight/d    
       功能键  i o p 
        */
        //检查event.key是否合法
        console.log(event.key);

        let target = ["ArrowUp", "w", "ArrowDown", "s", "ArrowLeft", "a", "ArrowRight", "ArrowRight", "d", "p", "!"]
        if (target.includes(event.key)) {

            if (event.key === "p") {
                alert('游戏暂停')
            }
            else if (event.key === "!") {
                let i = 0
                while (i < 10) {
                    //分数增加
                    this.scorePanel.addScore()
                    //蛇要增加一节
                    this.snake.addBody()
                    i++
                }
            }
            //修改direction属性
            else { this.direction = event.key }
        }


    }
    //控制蛇移动的方法
    run() {
        /*
            根据方向（this.direction）使蛇位置发生变化
            向上 top减少
            向下 top增加
            向左 left减少
            向右 left增加
        */
        //获取蛇现在的坐标
        let X = this.snake.X
        let Y = this.snake.Y
        switch (this.direction) {

            //向上移动
            case "ArrowUp":
            case "w":
                Y -= 10
                break

            //向下移动
            case "ArrowDown":
            case "s":
                Y += 10
                break

            //向左移动
            case "ArrowLeft":
            case "a":
                X -= 10
                break

            //向右移动
            case "ArrowRight":
            case "d":
                X += 10
                break
        }

        //检查蛇是否吃到了食物
        this.checkEat(X, Y)

        //修改蛇的X和Y值
        try {
            this.snake.X = X
            this.snake.Y = Y
        } catch (error: any) {
            //进入到catch，说明出现了异常，游戏结束了，弹出一个提示信息
            alert(error.message)
            this.isLive = false
        }

        //开启定时调用
        this.isLive && setTimeout(this.run.bind(this), 300 - (this.scorePanel.level - 1) * 30)
    }

    //定义一个方法，用来检查蛇是否吃到食物
    checkEat(X: number, Y: number) {
        if (X === this.food.X && Y === this.food.Y) {
            //食物的位置要进行重置
            this.food.change()
            //分数增加
            this.scorePanel.addScore()
            //蛇要增加一节
            this.snake.addBody()
        }
    }
}