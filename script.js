const field = document.querySelector('.field');
let figures = [];
let whoseMove = 'white'

class Figure {
    constructor(name, color, x, y) {
        this.name = name;
        this.color = color;
        this.death = false;
        this.x = x;
        this.y = y;
        this.src = 'img/' + this.name + '_' + this.color + '.png';
        this.alt = this.name + ' ' + this.color;
        this.cellFigure = this.searchCellFigure(this.x, this.y);
        this.move = 0;

    }

    render() {
        const figure = document.createElement('img');
        figure.classList.add('figure');
        figure.src = this.src;
        figure.alt = this.alt;
        document.querySelector(`[data-x="${this.x}"][data-y="${this.y}"]`).append(figure);
    }

    searchCellFigure(x, y) {
        return document.querySelector(`[data-x="${x}"][data-y="${y}"]`);
    }

    searchFigure(x, y) {
        for (let figure of figures) {
            if (figure.x === x && figure.y === y) {
                return figure;
            }
        }
    }

    activeFigure() {
        this.cellFigure.firstChild.classList.add('active_figure');
    }



}

class FigurePawn extends Figure {
    constructor(name, color, x, y) {
        super(name, color, x, y)
    }

    replacementPawn() {
        if (this.y === 1 || this.y === 8) {
            if (this.color === 'white') {
                const cemetery = document.querySelector('[data-x="101"][data-y="101"]');
            }
        }
    }

    searchMove() {
        let k = 0;
        let counterElse = 0;
        if (this.color === 'white') {
            k = 2;
        }
        if (this.searchCellFigure(this.x + 1, this.y + 1 - k)  &&
            this.searchCellFigure(this.x + 1, this.y + 1 - k).firstChild  &&
            this.searchFigure(this.x + 1, this.y + 1 - k).color !== this.color ||
            this.searchCellFigure(this.x - 1, this.y + 1 - k)  &&
            this.searchCellFigure(this.x - 1, this.y + 1 - k).firstChild  &&
            this.searchFigure(this.x - 1, this.y + 1 - k).color !== this.color) {

            if (this.searchCellFigure(this.x + 1, this.y + 1 - k)  &&
                this.searchCellFigure(this.x + 1, this.y + 1 - k).firstChild  &&
                this.searchFigure(this.x + 1, this.y + 1 - k).color !== this.color &&
                this.searchCellFigure(this.x - 1, this.y + 1 - k)  &&
                this.searchCellFigure(this.x - 1, this.y + 1 - k).firstChild  &&
                this.searchFigure(this.x - 1, this.y + 1 - k).color !== this.color) {

                this.searchCellFigure(this.x + 1, this.y + 1 - k).classList.add('active');
                this.searchCellFigure(this.x - 1, this.y + 1 - k).classList.add('active');

            } else if (this.searchCellFigure(this.x + 1, this.y + 1 - k)  &&
                this.searchCellFigure(this.x + 1, this.y + 1 - k).firstChild  &&
                this.searchFigure(this.x + 1, this.y + 1 - k).color !== this.color) {

                this.searchCellFigure(this.x + 1, this.y + 1 - k).classList.add('active');

            } else if (this.searchFigure(this.x - 1, this.y + 1 - k).color !== this.color) {
                this.searchCellFigure(this.x - 1, this.y + 1 - k).classList.add('active');
            }
        } else {
            counterElse++
        }
        if (this.searchCellFigure(this.x, this.y + 1 - k)  &&
            this.searchCellFigure(this.x, this.y + 1 - k).firstChild === null) {
            this.searchCellFigure(this.x, this.y + 1 - k).classList.add('active');
            if (this.move === 0) {
                if (this.color === 'white' && this.move === 0) {
                    k = 4;
                }
                if (this.searchCellFigure(this.x, this.y + 2 - k)  &&
                    this.searchCellFigure(this.x, this.y + 2 - k).firstChild === null) {
                    this.searchCellFigure(this.x, this.y + 2 - k).classList.add('active');
                }

            }
        } else {
            counterElse++
        }
        if (counterElse >= 2) {
            return false;
        }
        this.cellFigure.firstChild.classList.add('active_figure');
    }

}

class FigureRook extends Figure {
    constructor(name, color, x, y) {
        super(name, color, x, y)
    }

    searchMove() {
        let counterElse = 0;
        for (let i = 1; i < 8; i++) {
            if (this.searchCellFigure(this.x, this.y - i) ) {
                this.searchCellFigure(this.x, this.y - i).classList.add('active');
                if (this.searchCellFigure(this.x, this.y - i).firstChild ) {
                    if (this.searchFigure(this.x, this.y - i).color === this.color) {
                        this.searchCellFigure(this.x, this.y - i).classList.remove('active');
                        counterElse += 8 - i;
                    }
                    i = 8;
                }
            } else {
                counterElse++;
            }
        }
        for (let i = 1; i < 8; i++) {
            if (this.searchCellFigure(this.x, this.y + i) ) {
                this.searchCellFigure(this.x, this.y + i).classList.add('active');
                if (this.searchCellFigure(this.x, this.y + i).firstChild ) {
                    if (this.searchFigure(this.x, this.y + i).color === this.color) {
                        this.searchCellFigure(this.x, this.y + i).classList.remove('active');
                        counterElse += 8 - i;
                    }
                    i = 8;
                }
            } else {
                counterElse++;
            }
        }
        for (let i = 1; i < 8; i++) {
            if (this.searchCellFigure(this.x - i, this.y) ) {
                this.searchCellFigure(this.x - i, this.y).classList.add('active');
                if (this.searchCellFigure(this.x - i, this.y).firstChild ) {
                    if (this.searchFigure(this.x - i, this.y).color === this.color) {
                        this.searchCellFigure(this.x - i, this.y).classList.remove('active');
                        counterElse += 8 - i;
                    }
                    i = 8;
                }
            } else {
                counterElse++;
            }
        }
        for (let i = 1; i < 8; i++) {
            if (this.searchCellFigure(this.x + i, this.y) ) {
                this.searchCellFigure(this.x + i, this.y).classList.add('active');
                if (this.searchCellFigure(this.x + i, this.y).firstChild ) {
                    if (this.searchFigure(this.x + i, this.y).color === this.color) {
                        this.searchCellFigure(this.x + i, this.y).classList.remove('active');
                        counterElse += 8 - i;
                    }
                    i = 8;
                }
            } else {
                counterElse++;
            }
        }
        if (counterElse >= 28) {
            return false;
        }
        this.activeFigure();
        return true;
    }
}
class FigureElephant extends Figure {
    constructor(name, color, x, y) {
        super(name, color, x, y)
    }

    searchMove() {
        let counterElse = 0;
        for (let i = 1; i < 8; i++) {
            if (this.searchCellFigure(this.x - i, this.y - i) ) {
                this.searchCellFigure(this.x - i, this.y - i).classList.add('active');
                if (this.searchCellFigure(this.x - i, this.y - i).firstChild ) {
                    if (this.searchFigure(this.x - i, this.y - i).color === this.color) {
                        this.searchCellFigure(this.x - i, this.y - i).classList.remove('active');
                        counterElse += 8 - i;
                    }
                    i = 8;
                }
            } else {
                counterElse++;
            }
        }
        for (let i = 1; i < 8; i++) {
            if (this.searchCellFigure(this.x - i, this.y + i) ) {
                this.searchCellFigure(this.x - i, this.y + i).classList.add('active');
                if (this.searchCellFigure(this.x - i, this.y + i).firstChild ) {
                    if (this.searchFigure(this.x - i, this.y + i).color === this.color) {
                        this.searchCellFigure(this.x - i, this.y + i).classList.remove('active');
                        counterElse += 8 - i;
                    }
                    i = 8;
                }
            } else {
                counterElse++;
            }
        }
        for (let i = 1; i < 8; i++) {
            if (this.searchCellFigure(this.x + i, this.y + i) ) {
                this.searchCellFigure(this.x + i, this.y + i).classList.add('active');
                if (this.searchCellFigure(this.x + i, this.y + i).firstChild ) {
                    if (this.searchFigure(this.x + i, this.y + i).color === this.color) {
                        this.searchCellFigure(this.x + i, this.y + i).classList.remove('active');
                        counterElse += 8 - i;
                    }
                    i = 8;
                }
            } else {
                counterElse++;
            }
        }
        for (let i = 1; i < 8; i++) {
            if (this.searchCellFigure(this.x + i, this.y - i) ) {
                this.searchCellFigure(this.x + i, this.y - i).classList.add('active');
                if (this.searchCellFigure(this.x + i, this.y - i).firstChild ) {
                    if (this.searchFigure(this.x + i, this.y - i).color === this.color) {
                        this.searchCellFigure(this.x + i, this.y - i).classList.remove('active');
                        counterElse += 8 - i;
                    }
                    i = 8;
                }
            } else {
                counterElse++;
            }
        }
        if (counterElse >= 28) {
            return false;
        }
        this.activeFigure();
        return true;
    }
}
class FigureQueen extends Figure {
    constructor(name, color, x, y) {
        super(name, color, x, y);
    }

    searchMove() {
        let counterElse = 0;
        for (let i = 1; i < 8; i++) {
            if (this.searchCellFigure(this.x, this.y - i)) {
                this.searchCellFigure(this.x, this.y - i).classList.add('active');
                if (this.searchCellFigure(this.x, this.y - i).firstChild) {
                    if (this.searchFigure(this.x, this.y - i).color === this.color) {
                        this.searchCellFigure(this.x, this.y - i).classList.remove('active');
                        counterElse += 8 - i;
                    }
                    i = 8;
                }
            } else {
                counterElse++;
            }
        }
        for (let i = 1; i < 8; i++) {
            if (this.searchCellFigure(this.x, this.y + i)) {
                this.searchCellFigure(this.x, this.y + i).classList.add('active');
                if (this.searchCellFigure(this.x, this.y + i).firstChild) {
                    if (this.searchFigure(this.x, this.y + i).color === this.color) {
                        this.searchCellFigure(this.x, this.y + i).classList.remove('active');
                        counterElse += 8 - i;
                    }
                    i = 8;
                }
            } else {
                counterElse++;
            }
        }
        for (let i = 1; i < 8; i++) {
            if (this.searchCellFigure(this.x - i, this.y)) {
                this.searchCellFigure(this.x - i, this.y).classList.add('active');
                if (this.searchCellFigure(this.x - i, this.y).firstChild) {
                    if (this.searchFigure(this.x - i, this.y).color === this.color) {
                        this.searchCellFigure(this.x - i, this.y).classList.remove('active');
                        counterElse += 8 - i;
                    }
                    i = 8;
                }
            } else {
                counterElse++;
            }
        }
        for (let i = 1; i < 8; i++) {
            if (this.searchCellFigure(this.x + i, this.y)) {
                this.searchCellFigure(this.x + i, this.y).classList.add('active');
                if (this.searchCellFigure(this.x + i, this.y).firstChild ) {
                    if (this.searchFigure(this.x + i, this.y).color === this.color) {
                        this.searchCellFigure(this.x + i, this.y).classList.remove('active');
                        counterElse += 8 - i;
                    }
                    i = 8;
                }
            } else {
                counterElse++;
            }
        }
        for (let i = 1; i < 8; i++) {
            if (this.searchCellFigure(this.x - i, this.y - i) ) {
                this.searchCellFigure(this.x - i, this.y - i).classList.add('active');
                if (this.searchCellFigure(this.x - i, this.y - i).firstChild ) {
                    if (this.searchFigure(this.x - i, this.y - i).color === this.color) {
                        this.searchCellFigure(this.x - i, this.y - i).classList.remove('active');
                        counterElse += 8 - i;
                    }
                    i = 8;
                }
            } else {
                counterElse++;
            }
        }
        for (let i = 1; i < 8; i++) {
            if (this.searchCellFigure(this.x - i, this.y + i) ) {
                this.searchCellFigure(this.x - i, this.y + i).classList.add('active');
                if (this.searchCellFigure(this.x - i, this.y + i).firstChild ) {
                    if (this.searchFigure(this.x - i, this.y + i).color === this.color) {
                        this.searchCellFigure(this.x - i, this.y + i).classList.remove('active');
                        counterElse += 8 - i;
                    }
                    i = 8;
                }
            } else {
                counterElse++;
            }
        }
        for (let i = 1; i < 8; i++) {
            if (this.searchCellFigure(this.x + i, this.y + i) ) {
                this.searchCellFigure(this.x + i, this.y + i).classList.add('active');
                if (this.searchCellFigure(this.x + i, this.y + i).firstChild ) {
                    if (this.searchFigure(this.x + i, this.y + i).color === this.color) {
                        this.searchCellFigure(this.x + i, this.y + i).classList.remove('active');
                        counterElse += 8 - i;
                    }
                    i = 8;
                }
            } else {
                counterElse++;
            }
        }
        for (let i = 1; i < 8; i++) {
            if (this.searchCellFigure(this.x + i, this.y - i) ) {
                this.searchCellFigure(this.x + i, this.y - i).classList.add('active');
                if (this.searchCellFigure(this.x + i, this.y - i).firstChild ) {
                    if (this.searchFigure(this.x + i, this.y - i).color === this.color) {
                        this.searchCellFigure(this.x + i, this.y - i).classList.remove('active');
                        counterElse += 8 - i;
                    }
                    i = 8;
                }
            } else {
                counterElse++;
            }
        }
        if (counterElse >= 56) {
            return false;
        }
        this.activeFigure();
        return true;
    }
}
class FigureHorse extends Figure {
    constructor(name, color, x, y) {
        super(name, color, x, y)
    }

    searchMove() {
        let counterElse = 0;
        if (this.searchCellFigure(this.x + 1, this.y - 2) ) {
            this.searchCellFigure(this.x + 1, this.y - 2).classList.add('active');
            if (this.searchCellFigure(this.x + 1, this.y - 2).firstChild ) {
                if (this.searchFigure(this.x + 1, this.y - 2).color === this.color) {
                    this.searchCellFigure(this.x + 1, this.y - 2).classList.remove('active');
                    counterElse++;
                }
            }
        } else {
            counterElse++;
        }
        if (this.searchCellFigure(this.x - 1, this.y - 2) ) {
            this.searchCellFigure(this.x - 1, this.y - 2).classList.add('active');
            if (this.searchCellFigure(this.x - 1, this.y - 2).firstChild ) {
                if (this.searchFigure(this.x - 1, this.y - 2).color === this.color) {
                    this.searchCellFigure(this.x - 1, this.y - 2).classList.remove('active');
                    counterElse++;
                }
            }
        } else {
            counterElse++;
        }
        if (this.searchCellFigure(this.x - 1, this.y + 2) ) {
            this.searchCellFigure(this.x - 1, this.y + 2).classList.add('active');
            if (this.searchCellFigure(this.x - 1, this.y + 2).firstChild ) {
                if (this.searchFigure(this.x - 1, this.y + 2).color === this.color) {
                    this.searchCellFigure(this.x - 1, this.y + 2).classList.remove('active');
                    counterElse++;
                }
            }
        } else {
            counterElse++;
        }
        if (this.searchCellFigure(this.x + 1, this.y + 2) ) {
            this.searchCellFigure(this.x + 1, this.y + 2).classList.add('active');
            if (this.searchCellFigure(this.x + 1, this.y + 2).firstChild ) {
                if (this.searchFigure(this.x + 1, this.y + 2).color === this.color) {
                    this.searchCellFigure(this.x + 1, this.y + 2).classList.remove('active');
                    counterElse++;
                }
            }
        } else {
            counterElse++;
        }
        if (this.searchCellFigure(this.x + 2, this.y - 1) ) {
            this.searchCellFigure(this.x + 2, this.y - 1).classList.add('active');
            if (this.searchCellFigure(this.x + 2, this.y - 1).firstChild ) {
                if (this.searchFigure(this.x + 2, this.y - 1).color === this.color) {
                    this.searchCellFigure(this.x + 2, this.y - 1).classList.remove('active');
                    counterElse++;
                }
            }
        } else {
            counterElse++;
        }
        if (this.searchCellFigure(this.x - 2, this.y - 1) ) {
            this.searchCellFigure(this.x - 2, this.y - 1).classList.add('active');
            if (this.searchCellFigure(this.x - 2, this.y - 1).firstChild ) {
                if (this.searchFigure(this.x - 2, this.y - 1).color === this.color) {
                    this.searchCellFigure(this.x - 2, this.y - 1).classList.remove('active');
                    counterElse++;
                }
            }
        } else {
            counterElse++;
        }
        if (this.searchCellFigure(this.x - 2, this.y + 1) ) {
            this.searchCellFigure(this.x - 2, this.y + 1).classList.add('active');
            if (this.searchCellFigure(this.x - 2, this.y + 1).firstChild ) {
                if (this.searchFigure(this.x - 2, this.y + 1).color === this.color) {
                    this.searchCellFigure(this.x - 2, this.y + 1).classList.remove('active');
                    counterElse++;
                }
            }
        } else {
            counterElse++;
        }
        if (this.searchCellFigure(this.x + 2, this.y + 1) ) {
            this.searchCellFigure(this.x + 2, this.y + 1).classList.add('active');
            if (this.searchCellFigure(this.x + 2, this.y + 1).firstChild ) {
                if (this.searchFigure(this.x + 2, this.y + 1).color === this.color) {
                    this.searchCellFigure(this.x + 2, this.y + 1).classList.remove('active');
                    counterElse++;
                }
            }
        } else {
            counterElse++;
        }

        if (counterElse >= 16) {
            return false;
        }
        this.activeFigure();
        return true;
    }
}
class FigureKing extends Figure {
    constructor(name, color, x, y) {
        super(name, color, x, y)
    }

    searchMove() {
        let counterElse = 0;
        if (this.searchCellFigure(this.x, this.y - 1) ) {
            this.searchCellFigure(this.x, this.y - 1).classList.add('active');
            if (this.searchCellFigure(this.x, this.y - 1).firstChild ) {
                if (this.searchFigure(this.x, this.y - 1).color === this.color) {
                    this.searchCellFigure(this.x, this.y - 1).classList.remove('active');
                    counterElse++;
                }
            }
        } else {
            counterElse++;
        }
        if (this.searchCellFigure(this.x, this.y + 1) ) {
            this.searchCellFigure(this.x, this.y + 1).classList.add('active');
            if (this.searchCellFigure(this.x, this.y + 1).firstChild ) {
                if (this.searchFigure(this.x, this.y + 1).color === this.color) {
                    this.searchCellFigure(this.x, this.y + 1).classList.remove('active');
                    counterElse++;
                }
            }
        } else {
            counterElse++;
        }
        if (this.searchCellFigure(this.x - 1, this.y) ) {
            this.searchCellFigure(this.x - 1, this.y).classList.add('active');
            if (this.searchCellFigure(this.x - 1, this.y).firstChild ) {
                if (this.searchFigure(this.x - 1, this.y).color === this.color) {
                    this.searchCellFigure(this.x - 1, this.y).classList.remove('active');
                    counterElse++;
                }
            }
        } else {
            counterElse++;
        }
        if (this.searchCellFigure(this.x + 1, this.y) ) {
            this.searchCellFigure(this.x + 1, this.y).classList.add('active');
            if (this.searchCellFigure(this.x + 1, this.y).firstChild ) {
                if (this.searchFigure(this.x + 1, this.y).color === this.color) {
                    this.searchCellFigure(this.x + 1, this.y).classList.remove('active');
                    counterElse++;
                }
            }
        } else {
            counterElse++;
        }
        if (this.searchCellFigure(this.x - 1, this.y - 1) ) {
            this.searchCellFigure(this.x - 1, this.y - 1).classList.add('active');
            if (this.searchCellFigure(this.x - 1, this.y - 1).firstChild ) {
                if (this.searchFigure(this.x - 1, this.y - 1).color === this.color) {
                    this.searchCellFigure(this.x - 1, this.y - 1).classList.remove('active');
                    counterElse++;
                }
            }
        } else {
            counterElse++;
        }

        if (this.searchCellFigure(this.x - 1, this.y + 1) ) {
            this.searchCellFigure(this.x - 1, this.y + 1).classList.add('active');
            if (this.searchCellFigure(this.x - 1, this.y + 1).firstChild ) {
                if (this.searchFigure(this.x - 1, this.y + 1).color === this.color) {
                    this.searchCellFigure(this.x - 1, this.y + 1).classList.remove('active');
                    counterElse++;
                }
            }
        } else {
            counterElse++;
        }
        if (this.searchCellFigure(this.x + 1, this.y + 1) ) {
            this.searchCellFigure(this.x + 1, this.y + 1).classList.add('active');
            if (this.searchCellFigure(this.x + 1, this.y + 1).firstChild ) {
                if (this.searchFigure(this.x + 1, this.y + 1).color === this.color) {
                    this.searchCellFigure(this.x + 1, this.y + 1).classList.remove('active');
                    counterElse++;
                }
            }
        } else {
            counterElse++;
        }
        if (this.searchCellFigure(this.x + 1, this.y - 1) ) {
            this.searchCellFigure(this.x + 1, this.y - 1).classList.add('active');
            if (this.searchCellFigure(this.x + 1, this.y - 1).firstChild ) {
                if (this.searchFigure(this.x + 1, this.y - 1).color === this.color) {
                    this.searchCellFigure(this.x + 1, this.y - 1).classList.remove('active');
                    counterElse++;
                }
            }
        } else {
            counterElse++;
        }

        if (counterElse >= 8) {
            return false;
        }
        this.activeFigure();
        return true;
    }
}

createField();
createMenu();

function createMenu() {
    const menu = document.createElement('div');
    menu.classList.add('menu');
    field.append(menu);

    const btnResumeGame = document.createElement('button');
    btnResumeGame.classList.add('btn', 'resume_game');
    btnResumeGame.textContent = 'Продолжить';
    btnResumeGame.disabled = true;
    menu.append(btnResumeGame);

    btnResumeGame.addEventListener('click', toggleMenu);

    const btnNewGame = document.createElement('button');
    btnNewGame.classList.add('btn', 'new_game');
    btnNewGame.textContent = 'Новая игра';
    menu.append(btnNewGame);

    btnNewGame.addEventListener('click', newGame)

    const btnSaveGame = document.createElement('button');
    btnSaveGame.classList.add('btn', 'save_game');
    btnSaveGame.textContent = 'Сохранить';
    menu.append(btnSaveGame);

    const btnLoadGame = document.createElement('button');
    btnLoadGame.classList.add('btn', 'load_game');
    btnLoadGame.textContent = 'Загрузить';
    menu.append(btnLoadGame);
}

function toggleMenu() {
    document.querySelector('.menu').classList.toggle('show');
    document.querySelector('.blocking').classList.toggle('show');
}

function newGame() {
    figures = [];
    whoseMove = 'white';
    createArrFigures();
    clearField();
    renderFigures();
    toggleMenu();
    field.addEventListener('mouseover', activeEventFigure);
    field.addEventListener('mouseout', offActiveFigure);
    document.addEventListener('keydown', stopGame);
    document.querySelector('.resume_game').disabled = false;

}

function stopGame(e) {
    if (e.key === 'Escape') {
        toggleMenu();
    }
}

function offActiveFigure() {
    clearField();
    renderFigures();
}

function activeEventFigure(e) {
    if (e.target.classList.contains('figure')) {
        let x = e.target.parentElement.dataset.x,
            y = e.target.parentElement.dataset.y;
        for (let figure of figures) {
            if (figure.x === Number(x) && figure.y === Number(y)) {
                if (figure.color === whoseMove && figure.searchMove() !== false) {
                    field.addEventListener('click', selectionFigure);
                    field.addEventListener('click', moveFigure);
                } else {
                    offActiveFigure();
                }
            }
        }
    }
}

function moveFigure(e) {

    if (e.target.classList.contains('active') === false &&
        e.target.classList.contains('figure') === false) {
        clearField();
        renderFigures();
        field.addEventListener('mouseover', activeEventFigure);
        field.addEventListener('mouseout', offActiveFigure);
        return;
    } else if (e.target.classList.contains('figure')) {
        if (e.target.parentElement.classList.contains('active')) {
            let figureSelctor = document.querySelector('.active_figure');
            let x = figureSelctor.parentElement.dataset.x,
                y = figureSelctor.parentElement.dataset.y;
            for (let figure of figures) {
                if (figure.x === Number(x) && figure.y === Number(y)) {
                    figure.x = Number(e.target.parentElement.dataset.x);
                    figure.y = Number(e.target.parentElement.dataset.y);
                    figure.move++;
                    figure.cellFigure = figure.searchCellFigure(e.target.parentElement.dataset.x, e.target.parentElement.dataset.y)
                }
            }
            deathFigure();
            clearField();
            renderFigures();
            win();
            changeMove();
            field.removeEventListener('click', moveFigure);
            field.addEventListener('mouseover', activeEventFigure);
            field.addEventListener('mouseout', offActiveFigure);
        }
    } else {
        let figureSelctor = document.querySelector('.active_figure');
        let x = figureSelctor.parentElement.dataset.x,
            y = figureSelctor.parentElement.dataset.y;
        for (let figure of figures) {
            if (figure.x === Number(x) && figure.y === Number(y)) {
                figure.x = Number(e.target.dataset.x);
                figure.y = Number(e.target.dataset.y);
                figure.move++;
                figure.cellFigure = figure.searchCellFigure(e.target.dataset.x, e.target.dataset.y);
            }
        }
        deathFigure();
        clearField();
        renderFigures();
        win();
        changeMove();
        field.removeEventListener('click', moveFigure);
        field.addEventListener('mouseover', activeEventFigure);
        field.addEventListener('mouseout', offActiveFigure);
    }
}

function selectionFigure(e) {
    if (e.target.classList.contains('figure')) {
        e.target.parentElement.classList.add('red');
        field.removeEventListener('mouseout', offActiveFigure);
        field.removeEventListener('mouseover', activeEventFigure);
        field.removeEventListener('click', selectionFigure);
    }
}

function renderFigures() {
    for (let figure of figures) {
        figure.render();
    }
}

function deathFigure() {
    const cells = document.querySelectorAll('.cell');
    for (let cell of cells) {
        if (cell.firstChild ) {
            let x = Number(cell.dataset.x),
                y = Number(cell.dataset.y);
            let arr = []
            for (let figure of figures) {
                if (figure.x === x && figure.y === y && figure.death === false) {
                    arr.push(figure);
                }
            }
            if (arr.length > 1) {
                for (let figure of arr) {
                    if (figure.color !== whoseMove) {
                        if (figure.color === 'black') {
                            figure.death = true;
                            figure.x = 100;
                            figure.y = 100;
                        } else {
                            figure.death = true;
                            figure.x = 101;
                            figure.y = 101;
                        }
                    }
                }
            }
        }
    }
}

function createArrFigures() {
    createObjPawn();
    createObjRook();
    createObjHorse();
    createObjElephant();
    createObjQueen();
    createObjKing();
}

function createObjPawn() {
    for (let i = 1; i < 9; i++) {
        let pawn = new FigurePawn('pawn', 'black', i, 2)
        figures.push(pawn)
    }
    for (let i = 1; i < 9; i++) {
        let pawn = new FigurePawn('pawn', 'white', i, 7)
        figures.push(pawn);
    }
}

function createObjRook() {
    figures.push(new FigureRook('rook', 'black', 1, 1));
    figures.push(new FigureRook('rook', 'black', 8, 1));
    figures.push(new FigureRook('rook', 'white', 1, 8));
    figures.push(new FigureRook('rook', 'white', 8, 8));
}

function createObjHorse() {
    figures.push(new FigureHorse('horse', 'black', 2, 1));
    figures.push(new FigureHorse('horse', 'black', 7, 1));
    figures.push(new FigureHorse('horse', 'white', 2, 8));
    figures.push(new FigureHorse('horse', 'white', 7, 8));
}

function createObjElephant() {
    figures.push(new FigureElephant('elephant', 'black', 3, 1));
    figures.push(new FigureElephant('elephant', 'black', 6, 1));
    figures.push(new FigureElephant('elephant', 'white', 3, 8));
    figures.push(new FigureElephant('elephant', 'white', 6, 8));
}

function createObjQueen() {
    figures.push(new FigureQueen('queen', 'black', 5, 1));
    figures.push(new FigureQueen('queen', 'white', 4, 8));
}

function createObjKing() {
    figures.push(new FigureKing('king', 'black', 4, 1));
    figures.push(new FigureKing('king', 'white', 5, 8));
}

function clearField() {
    document.querySelectorAll('.cell').forEach((cell) => {
        cell.innerHTML = '';
        cell.classList.remove('active', 'red');
        document.querySelector('.cemetery_figurs_black').innerHTML = '';
        document.querySelector('.cemetery_figurs_white').innerHTML = '';
    })
}

function createField() {
    let x = 0,
        y = 0;

    let k = 2;

    for (let i = 0; i < 64; i++) {
        const cell = document.createElement('div');

        if (k % 2 === 0) {
            cell.classList.add('white')
        } else {
            cell.classList.add('gray')
        }
        if (k % 9 === 0) {
            k++
        }
        k++;

        if (i % 8 === 0) {
            y++;
        }
        if (x === 8) {
            x = 0;
            x++;
        } else {
            x++;
        }
        cell.dataset.y = y;
        cell.dataset.x = x;

        cell.classList.add('cell')
        field.append(cell);

    }
    const cemeteryFigursBlack = document.createElement('div');
    cemeteryFigursBlack.dataset.y = 100;
    cemeteryFigursBlack.dataset.x = 100;
    cemeteryFigursBlack.classList.add('cemetery_figurs_black');
    document.querySelector('body').append(cemeteryFigursBlack);

    const cemeteryFigursWhite = document.createElement('div');
    cemeteryFigursWhite.dataset.y = 101;
    cemeteryFigursWhite.dataset.x = 101;
    cemeteryFigursWhite.classList.add('cemetery_figurs_white');
    document.querySelector('body').append(cemeteryFigursWhite);
}

function changeMove() {
    if (whoseMove === 'white') {
        whoseMove = 'black'
    } else {
        whoseMove = 'white'
    }
}

function win() {
    for (let figure of figures) {
        if (figure.name === 'king' && figure.death) {
            figures = [];
            clearField();
            toggleMenu();
            document.querySelector('.resume_game').disabled = true;
            alert(whoseMove + ' победили')

        }
    }
}