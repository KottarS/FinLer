class PhysicsEngine {
    constructor() {
        this.circles = [];
        this.gravity = 0.5;
        this.bounce = 0.7;
        this.airResistance = 0.99;
    }

    addCircle(x, y, size) {
        const circle = {
            element: document.createElement('div'),
            x: x,
            y: y,
            size: size,
            radius: size/2,
            mass: Math.PI * Math.pow(size/2, 2),
            velocityX: 0,
            velocityY: 0,
            dragging: false
        };
        
        circle.element.className = 'circle';
        circle.element.style.width = circle.element.style.height = `${size}px`;
        circle.element.style.backgroundColor = `hsl(${Math.random()*360}, 70%, 60%)`;
        document.body.appendChild(circle.element);
        this.circles.push(circle);
        return circle;
    }

    update() {
        this.circles.forEach(circle => {
            if (!circle.dragging) {
                circle.velocityY += this.gravity;
                circle.velocityX *= this.airResistance;
                circle.velocityY *= this.airResistance;
                
                circle.x += circle.velocityX;
                circle.y += circle.velocityY;

                this.handleBoundaries(circle);
                this.handleGameCollision(circle);
            }
            circle.element.style.left = `${circle.x}px`;
            circle.element.style.top = `${circle.y}px`;
        });
        this.handleCircleCollisions();
    }

    handleBoundaries(circle) {
        const maxX = window.innerWidth - circle.radius;
        const maxY = window.innerHeight - circle.radius - 20;
        const min = circle.radius;
        
        if (circle.x < min) {
            circle.x = min;
            circle.velocityX *= -this.bounce;
        }
        if (circle.x > maxX) {
            circle.x = maxX;
            circle.velocityX *= -this.bounce;
        }
        if (circle.y < min) {
            circle.y = min;
            circle.velocityY *= -this.bounce;
        }
        if (circle.y > maxY) {
            circle.y = maxY;
            circle.velocityY *= -this.bounce;
        }
    }

    handleGameCollision(circle) {
        const gameRect = document.getElementById('game-container').getBoundingClientRect();
        const buffer = 15;
        
        const left = gameRect.left - buffer;
        const right = gameRect.right + buffer;
        const top = gameRect.top - buffer;
        const bottom = gameRect.bottom + buffer;

        if (circle.x + circle.radius > left && 
            circle.x - circle.radius < right && 
            circle.y + circle.radius > top && 
            circle.y - circle.radius < bottom) {
            
            const dx = circle.x - (gameRect.left + gameRect.width/2);
            const dy = circle.y - (gameRect.top + gameRect.height/2);
            const angle = Math.atan2(dy, dx);
            
            circle.velocityX = Math.cos(angle) * 6;
            circle.velocityY = Math.sin(angle) * 6;
        }
    }

    handleCircleCollisions() {
        for (let i = 0; i < this.circles.length; i++) {
            for (let j = i + 1; j < this.circles.length; j++) {
                const c1 = this.circles[i];
                const c2 = this.circles[j];
                
                const dx = c2.x - c1.x;
                const dy = c2.y - c1.y;
                const distance = Math.sqrt(dx*dx + dy*dy);
                const minDistance = c1.radius + c2.radius;
                
                if (distance < minDistance) {
                    const angle = Math.atan2(dy, dx);
                    const overlap = (minDistance - distance) * 0.5;
                    
                    c1.x -= Math.cos(angle) * overlap;
                    c1.y -= Math.sin(angle) * overlap;
                    c2.x += Math.cos(angle) * overlap;
                    c2.y += Math.sin(angle) * overlap;
                    
                    const u1 = this.rotate(c1.velocityX, c1.velocityY, angle);
                    const u2 = this.rotate(c2.velocityX, c2.velocityY, angle);
                    
                    const m1 = c1.mass;
                    const m2 = c2.mass;
                    const v1x = (u1.x * (m1 - m2) + 2 * m2 * u2.x) / (m1 + m2);
                    const v2x = (u2.x * (m2 - m1) + 2 * m1 * u1.x) / (m1 + m2);
                    
                    const finalV1 = this.rotate(v1x, u1.y, -angle);
                    const finalV2 = this.rotate(v2x, u2.y, -angle);
                    
                    c1.velocityX = finalV1.x * this.bounce;
                    c1.velocityY = finalV1.y * this.bounce;
                    c2.velocityX = finalV2.x * this.bounce;
                    c2.velocityY = finalV2.y * this.bounce;
                }
            }
        }
    }

    rotate(x, y, angle) {
        return {
            x: x * Math.cos(angle) - y * Math.sin(angle),
            y: x * Math.sin(angle) + y * Math.cos(angle)
        };
    }
}

class Game2048 {
    constructor() {
        this.grid = document.getElementById('grid');
        this.scoreElement = document.getElementById('score');
        this.bestElement = document.getElementById('best');
        this.cells = Array(4).fill().map(() => Array(4).fill(0));
        this.score = 0;
        this.best = localStorage.getItem('best2048') || 0;
        this.initGrid();
        this.addNewTile();
        this.addNewTile();
        this.setupControls();
        this.setupMobileControls();
        this.setupSwipeControls();
    }

    initGrid() {
        this.grid.innerHTML = '';
        for (let i = 0; i < 16; i++) {
            const cell = document.createElement('div');
            cell.className = 'cell';
            this.grid.appendChild(cell);
        }
        this.updateScore();
    }

    addNewTile() {
        const emptyCells = [];
        for (let i = 0; i < 4; i++) {
            for (let j = 0; j < 4; j++) {
                if (this.cells[i][j] === 0) emptyCells.push({x: i, y: j});
            }
        }
        if (emptyCells.length > 0) {
            const {x, y} = emptyCells[Math.floor(Math.random() * emptyCells.length)];
            this.cells[x][y] = Math.random() < 0.9 ? 2 : 4;
            this.updateDisplay();
        }
    }

    move(direction) {
        let moved = false;
        const prevState = JSON.stringify(this.cells);

        switch(direction) {
            case 'ArrowLeft': moved = this.moveLeft(); break;
            case 'ArrowRight': moved = this.moveRight(); break;
            case 'ArrowUp': moved = this.moveUp(); break;
            case 'ArrowDown': moved = this.moveDown(); break;
        }

        if (JSON.stringify(this.cells) !== prevState) {
            this.addNewTile();
            this.updateScore();
            if (this.isGameOver()) alert('Игра окончена! Счёт: ' + this.score);
        }
    }

    moveLeft() {
        let moved = false;
        for (let i = 0; i < 4; i++) {
            let row = this.cells[i].filter(x => x !== 0);
            for (let j = 0; j < row.length - 1; j++) {
                if (row[j] === row[j + 1]) {
                    row[j] *= 2;
                    this.score += row[j];
                    row.splice(j + 1, 1);
                    moved = true;
                }
            }
            const newRow = row.concat(Array(4 - row.length).fill(0));
            if (JSON.stringify(this.cells[i]) !== JSON.stringify(newRow)) moved = true;
            this.cells[i] = newRow;
        }
        return moved;
    }

    moveRight() {
        let moved = false;
        for (let i = 0; i < 4; i++) {
            let row = this.cells[i].filter(x => x !== 0);
            for (let j = row.length - 1; j > 0; j--) {
                if (row[j] === row[j - 1]) {
                    row[j] *= 2;
                    this.score += row[j];
                    row.splice(j - 1, 1);
                    moved = true;
                }
            }
            const newRow = Array(4 - row.length).fill(0).concat(row);
            if (JSON.stringify(this.cells[i]) !== JSON.stringify(newRow)) moved = true;
            this.cells[i] = newRow;
        }
        return moved;
    }

    moveUp() {
        let moved = false;
        for (let j = 0; j < 4; j++) {
            let column = [this.cells[0][j], this.cells[1][j], this.cells[2][j], this.cells[3][j]];
            let newColumn = this.mergeColumn(column);
            if (JSON.stringify(column) !== JSON.stringify(newColumn)) moved = true;
            for (let i = 0; i < 4; i++) {
                this.cells[i][j] = newColumn[i];
            }
        }
        return moved;
    }

    moveDown() {
        let moved = false;
        for (let j = 0; j < 4; j++) {
            let column = [this.cells[0][j], this.cells[1][j], this.cells[2][j], this.cells[3][j]];
            let newColumn = this.mergeColumn(column.reverse()).reverse();
            if (JSON.stringify(column.reverse()) !== JSON.stringify(newColumn)) moved = true;
            for (let i = 0; i < 4; i++) {
                this.cells[i][j] = newColumn[i];
            }
        }
        return moved;
    }

    mergeColumn(column) {
        let arr = column.filter(x => x !== 0);
        for (let i = 0; i < arr.length - 1; i++) {
            if (arr[i] === arr[i + 1]) {
                arr[i] *= 2;
                this.score += arr[i];
                arr.splice(i + 1, 1);
            }
        }
        return arr.concat(Array(4 - arr.length).fill(0));
    }

    updateDisplay() {
        const cells = document.getElementsByClassName('cell');
        for (let i = 0; i < 4; i++) {
            for (let j = 0; j < 4; j++) {
                const idx = i * 4 + j;
                const value = this.cells[i][j];
                cells[idx].innerHTML = value 
                    ? `<div class="tile" style="${this.getTileStyle(value)}">${value}</div>`
                    : '';
            }
        }
    }

    getTileStyle(value) {
        const colors = {
            2: '#666666', 
            4: '#808080', 
            8: '#999999',
            16: '#b3b3b3', 
            32: '#cccccc', 
            64: '#e6e6e6',
            128: '#ffffff', 
            256: '#f0f0f0', 
            512: '#e0e0e0',
            1024: '#d0d0d0', 
            2048: '#c0c0c0'
        };
        const textColor = value >= 128 ? '#2d2d2d' : 'white';
        return `background: ${colors[value] || '#404040'}; 
                font-size: ${value < 100 ? 35 : 28}px;
                color: ${textColor};`;
    }

    updateScore() {
        this.scoreElement.textContent = this.score;
        if (this.score > this.best) {
            this.best = this.score;
            localStorage.setItem('best2048', this.best);
            this.bestElement.textContent = this.best;
        }
    }

    isGameOver() {
        for (let i = 0; i < 4; i++) {
            for (let j = 0; j < 4; j++) {
                if (this.cells[i][j] === 0) return false;
                if (i < 3 && this.cells[i][j] === this.cells[i + 1][j]) return false;
                if (j < 3 && this.cells[i][j] === this.cells[i][j + 1]) return false;
            }
        }
        return true;
    }

    setupControls() {
        document.addEventListener('keydown', (e) => {
            if (['ArrowUp','ArrowDown','ArrowLeft','ArrowRight'].includes(e.key)) {
                e.preventDefault();
                this.move(e.key);
            }
        });
    }

    setupMobileControls() {
        const controls = {
            'arrow-up': 'ArrowUp',
            'arrow-down': 'ArrowDown',
            'arrow-left': 'ArrowLeft',
            'arrow-right': 'ArrowRight'
        };

        for (const [id, key] of Object.entries(controls)) {
            document.getElementById(id).addEventListener('touchstart', (e) => {
                e.preventDefault();
                this.move(key);
            });
        }
    }

    setupSwipeControls() {
        let touchStartX = 0;
        let touchStartY = 0;
        const minSwipeDistance = 30;

        document.addEventListener('touchstart', (e) => {
            touchStartX = e.touches[0].clientX;
            touchStartY = e.touches[0].clientY;
        });

        document.addEventListener('touchend', (e) => {
            const touchEndX = e.changedTouches[0].clientX;
            const touchEndY = e.changedTouches[0].clientY;
            
            const dx = touchEndX - touchStartX;
            const dy = touchEndY - touchStartY;
            const absDx = Math.abs(dx);
            const absDy = Math.abs(dy);

            if (Math.max(absDx, absDy) < minSwipeDistance) return;

            if (absDx > absDy) {
                this.move(dx > 0 ? 'ArrowRight' : 'ArrowLeft');
            } else {
                this.move(dy > 0 ? 'ArrowDown' : 'ArrowUp');
            }
        });
    }
}

// Инициализация системы
const physics = new PhysicsEngine();
const game2048 = new Game2048();

// Обработка мыши для шаров
document.addEventListener('mousedown', (e) => {
    const circle = physics.addCircle(e.clientX, e.clientY, Math.random()*50 + 30);
    
    const wheelListener = (e) => {
        e.preventDefault();
        const delta = e.deltaY < 0 ? 10 : -10;
        const newSize = Math.max(20, Math.min(circle.size + delta, 200));
        
        circle.size = newSize;
        circle.radius = newSize / 2;
        circle.mass = Math.PI * Math.pow(circle.radius, 2);
        circle.element.style.width = circle.element.style.height = `${newSize}px`;
    };

    const moveListener = (e) => {
        circle.x = e.clientX;
        circle.y = e.clientY;
    };

    const upListener = () => {
        document.removeEventListener('mousemove', moveListener);
        document.removeEventListener('mouseup', upListener);
        document.removeEventListener('wheel', wheelListener);
        circle.dragging = false;
    };

    circle.dragging = true;
    document.addEventListener('mousemove', moveListener);
    document.addEventListener('mouseup', upListener);
    document.addEventListener('wheel', wheelListener);
});

// Игровой цикл
function gameLoop() {
    physics.update();
    requestAnimationFrame(gameLoop);
}
gameLoop();