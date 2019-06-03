var elementType = [];
var squareSet = [];
var squareWidth = 45;
var squareCol = 10;
var squareRow = 18;
var squareColor = ["#49bdff", "#fe8602", "#26e552", "#f71d30", "#ffdb01"];
var timer = null;
var nextElement = null;
var nowElement = null;
var tetris = document.getElementById('map');
var renderNextElement = document.getElementById('shape');
function initSquareSet() {
    for (let i = 0; i < squareRow; i++) {
        squareSet[i] = new Array(squareCol);
    }
}
function createSquare(x, y, color) {
    let square = document.createElement('div');
    square.x = x;
    square.y = y;
    square.style.height = squareWidth + 'px';
    square.style.width = squareWidth + 'px';
    square.classList.add("square");
    square.style.backgroundColor = color;
    square.style.left = squareWidth * square.y + "px";
    square.style.top = squareWidth * square.x + "px";
    return square;
}
class TetrisElement {
    constructor(x, y, nowstatus, elementType) {
        this.basePoint = { x: x, y: y };//元素基准点
        this.nowstatus = nowstatus;//当前的元素状态
        this.status = [];//存放所有元素的状态数组
        this.elementType = elementType;//元素类型
        this.squareList = [];//保存元素成型的元素数组
    }
    rotate(val = 1) {
        this.nowstatus = (this.nowstatus + val) % 4;
        this.refresh();
    }
    show(parent) {//渲染元素
        for (let i = 0; i < this.squareList.length; i++) {
            parent.appendChild(this.squareList[i]);
        }
    }
    drop() {//下落
        this.basePoint.x++;
        this.refresh();
    }
    refresh() {
        for (let i = 0; i < this.squareList.length; i++) {
            this.squareList[i].x = this.basePoint.x + this.status[this.nowstatus][i].offsetX;
            this.squareList[i].y = this.basePoint.y + this.status[this.nowstatus][i].offsetY;
        }
        for (let i = 0; i < this.squareList.length; i++) {
            this.squareList[i].style.left = squareWidth * this.squareList[i].y + 'px';
            this.squareList[i].style.top = squareWidth * this.squareList[i].x + 'px';
        }
        this.show(tetris);
    }
    leftShift() {
        //this.basePoint.y <= 0 ? 0 : --this.basePoint.y;
        --this.basePoint.y
        this.refresh();
    }
    rightShift() {
        //this.basePoint.y >= 8 ? 8 : ++this.basePoint.y;
        ++this.basePoint.y
        this.refresh();
    }
}
function isDrop(nowElement) {

    if (nowElement != null) {
        let flag = true;
        for (let i = 0; i < nowElement.squareList.length; i++) {
            let x = nowElement.squareList[i].x;
            let y = nowElement.squareList[i].y;
            console.log(x + '---' + y)
            if (squareSet[x + 1]
                && squareSet[x + 1][y] //下个位置有小方块，需要停止
                || x >= 17) {//到达最后一行需要停止
                fixed(nowElement);
                return false;
            }
        }
        return flag;
    } else {
        return false;
    }

}
function fixed(element) {
    for (let i = 0; i < element.squareList.length; i++) {
        let x = element.squareList[i].x;
        let y = element.squareList[i].y;
        squareSet[x][y] = element.squareList[i];
        squareSet[x][y].x = x;
        squareSet[x][y].y = y;
    }
    nowElement = null;
    checkClear();
}
function render() {
    if (nowElement) {
        for (let i = 0; i < nowElement.squareList.length; i++) {
            nowElement.squareList[i].style.left = squareWidth * nowElement.squareList[i].y + 'px';
            nowElement.squareList[i].style.top = squareWidth * nowElement.squareList[i].x + 'px';
        }
    }
    for (let i = 0; i < squareSet.length; i++) {
        for (let j = 0; j < squareSet[i].length; j++) {
            if (!squareSet[i][j]) {
                continue;
            }
            squareSet[i][j].x = i;
            squareSet[i][j].y = j
            squareSet[i][j].style.left = squareWidth * squareSet[i][j].y + 'px';
            squareSet[i][j].style.top = squareWidth * squareSet[i][j].x + 'px';
            tetris.appendChild(squareSet[i][j]);
        }
    }
}
function randomGenerateElement() {
    let elementNum = Math.floor(Math.random() * elementType.length);
    let colorNum = Math.floor(Math.random() * squareColor.length);
    let statusNum = Math.floor(Math.random() * 4);

    return new elementType[elementNum](undefined, undefined, squareColor[colorNum], statusNum);
}
function checkOutOfRange() {//检查出界
    var max = 0;
    for (var i = 0; i < nowElement.squareList.length; i++) {
        if ((nowElement.squareList[i].y < 0 || nowElement.squareList[i].y > 9) //有小方块出界
            && Math.abs(nowElement.squareList[i].y - 5) - 4 > Math.abs(max)) {//记录出界最大的那个小方块
            max = nowElement.squareList[i].y < 0 ? 0 - nowElement.squareList[i].y : 9 - nowElement.squareList[i].y;
        }
    }
    nowElement.basePoint.y += max;//将基准点校正
    nowElement.refresh();
}
function checkClear() {//检查哪些行是需要被消除的
    let result = [];
    for (var i = 0; i < squareSet.length; i++) {
        var flag = true;
        for (var j = 0; j < squareSet[i].length; j++) {
            if (!squareSet[i][j]) {//任何一个位置是空位就不能消除
                flag = false;
                break;
            }
        }
        if (flag) {
            result.unshift(i);
        }
    }
    for (let i = 0; i < result.length; i++) {//消除删除的行
        for (let j = 0; j < squareSet[result[i]].length; j++) {
            tetris.removeChild(squareSet[result[i]][j]);
        }
        squareSet.splice(result[i], 1);
    }
    for (let i = 0; i < result.length; i++) {//补回被删除的行
        let tmp = new Array(10);
        squareSet.unshift(tmp);
    }
    render();//删除后要重新渲染页面
}

function renderNext(element){
    if(nextElement==null){
        return ;
    }
    element.innerHTML = '';
    let div = document.createElement('div');
    div.style.position = 'relative';
    div.style.height = '180px';
    div.style.width = '180px';
    div.style.alignItems = 'center';
    for(let i=0;i<4;i++){
        let tmp = createSquare(nextElement.status[nextElement.nowstatus][i].offsetX,nextElement.status[nextElement.nowstatus][i].offsetY,nextElement.color);
        div.appendChild(tmp);
    }
    element.appendChild(div);
}

function checkCollide() {
    let flag = false;
    for (let i = 0; i < nowElement.squareList.length; i++) {
        let x = nowElement.squareList[i].x;
        let y = nowElement.squareList[i].y;
        if (squareSet[x][y] != null) {
            return true;
        }
    }
    return flag;
}

function start() {
    return setInterval(function () {
        if (nextElement == null) {
            nextElement = randomGenerateElement();
        }
        if (nowElement == null) {
            nowElement = nextElement;
            nextElement = randomGenerateElement();
            renderNext(renderNextElement);
            nowElement.show(tetris);
        } else {
            if (isDrop(nowElement)) {
                nowElement.drop();
            }
        }
        render();
    }, 1000);
}
window.onload = function () {
    init();
}
function init() {
    initSquareSet();

    timer = start();


    window.addEventListener('keydown', function (event) {

        if (event.key == "ArrowDown") {
            if (isDrop(nowElement)) {
                nowElement.drop();
               
            }
        } else if (event.key == "ArrowUp") {

            nowElement.rotate();
            checkOutOfRange();
            if (checkCollide()) {
                nowElement.rotate(-1);
            }

        } else if (event.key == "ArrowLeft") {
            nowElement.leftShift();
            checkOutOfRange();
            if (checkCollide()) {
                nowElement.rightShift();
            }

        } else if (event.key == "ArrowRight") {
            nowElement.rightShift();
            checkOutOfRange();
            if (checkCollide()) {
                nowElement.leftShift();
            }
        }
    })
}
