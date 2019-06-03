
class LineElement extends TetrisElement {
    constructor(x =-2, y=6, color, nowstatus) {

        super(x, y, nowstatus, elementType);
        this.color = color;
        this.status = [
            [{ offsetX: 0, offsetY: -1 }, { offsetX: 0, offsetY: 0 }, { offsetX: 0, offsetY: 1 }, { offsetX: 0, offsetY: 2 }],
            [{ offsetX: 0, offsetY: 2 }, { offsetX: 1, offsetY: 2 }, { offsetX: 2, offsetY: 2 }, { offsetX: 3, offsetY: 2 }],
            [{ offsetX: 0, offsetY: -1 }, { offsetX: 0, offsetY: 0 }, { offsetX: 0, offsetY: 1 }, { offsetX: 0, offsetY: 2 }],
            [{ offsetX: 0, offsetY: 2 }, { offsetX: 1, offsetY: 2 }, { offsetX: 2, offsetY: 2 }, { offsetX: 3, offsetY: 2 }]
        ];
        for (let i = 0; i < 4; i++) {
            let tempElement = createSquare(this.basePoint.x + this.status[this.nowstatus][i].offsetX, this.basePoint.y + this.status[this.nowstatus][i].offsetY, color);
            this.squareList.push(tempElement);
        }
    }
}
elementType.push(LineElement);