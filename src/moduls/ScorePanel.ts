//定义表示记分牌的类
export default class ScorePanel {
    //score和level用来记录分数和等级
    score = 0
    level = 1
    //分数和等级所在的元素，在构造函数中进行初始化
    scoreELe: HTMLElement
    levelEle: HTMLElement
    //设置一个变量限制等级
    maxLevel: number
    //设置一个变量表示多少分时升级
    upScore: number
    constructor(maxLevel: number = 10, upScore: number = 10) {
        this.scoreELe = document.getElementById('score')!
        this.levelEle = document.getElementById('level')!
        this.maxLevel = maxLevel
        this.upScore = upScore
    }
    //加分的方法
    addScore() {
        //分数自增
        this.scoreELe.innerHTML = ++this.score + ''
        //判断分数是多少
        if (this.score % this.upScore === 0) {
            this.levelUp()
        }
    }
    //升级的方法
    levelUp() {
        //等级自增,有最大值
        if (this.level < this.maxLevel) {
            this.levelEle.innerHTML = ++this.level + ''
        }
    }
}