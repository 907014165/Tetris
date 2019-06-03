
class SquareElement extends TetrisElement {
    constructor(x=-2, y=5, color, nowstatus) {

        super(x, y, nowstatus, elementType);
        this.color = color;
        this.status = [
            [{ offsetX: 0, offsetY: 0 }, { offsetX: 1, offsetY: 0 }, { offsetX: 0, offsetY: 1 }, { offsetX: 1, offsetY: 1 }],
            [{ offsetX: 0, offsetY: 0 }, { offsetX: 1, offsetY: 0 }, { offsetX: 0, offsetY: 1 }, { offsetX: 1, offsetY: 1 }],
            [{ offsetX: 0, offsetY: 0 }, { offsetX: 1, offsetY: 0 }, { offsetX: 0, offsetY: 1 }, { offsetX: 1, offsetY: 1 }],
            [{ offsetX: 0, offsetY: 0 }, { offsetX: 1, offsetY: 0 }, { offsetX: 0, offsetY: 1 }, { offsetX: 1, offsetY: 1 }]
        ];
        for (let i = 0; i < 4; i++) {
            let tempElement = createSquare(this.basePoint.x + this.status[this.nowstatus][i].offsetX, this.basePoint.y + this.status[this.nowstatus][i].offsetY, color);
            this.squareList.push(tempElement);
        }
    }
}
elementType.push(SquareElement);