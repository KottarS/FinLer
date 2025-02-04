// Получаем ссылку на canvas и его контекст
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Устанавливаем размеры холста
function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

// Вызываем функцию при загрузке страницы и при изменении размера окна
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

// Толщина границы
const borderWidth = 60;

// Игрок
const player = {
    x: canvas.width / 2,
    y: canvas.height - 100,
    width: 50,
    height: 50,
    color: 'blue',
    speed: 5,
};

// Препятствие
const obstacle = {
    x: Math.random() * (canvas.width - 50),
    y: 0,
    width: 50,
    height: 50,
    color: 'red',
    speed: 2,
};

// Состояние клавиш
const keys = {
    ArrowLeft: false,
    ArrowRight: false,
    ArrowUp: false,
    ArrowDown: false,
};

// Обработка нажатия клавиш
window.addEventListener('keydown', (event) => {
    if (keys.hasOwnProperty(event.key)) {
        keys[event.key] = true;
    }
});

// Обработка отпускания клавиш
window.addEventListener('keyup', (event) => {
    if (keys.hasOwnProperty(event.key)) {
        keys[event.key] = false;
    }
});

// Обновление позиции игрока с учётом границ
function updatePlayer() {
    // Левая граница (учитываем ширину границы)
    if (keys.ArrowLeft && player.x > borderWidth) player.x -= player.speed;
    // Правая граница (учитываем ширину границы и размер игрока)
    if (keys.ArrowRight && player.x + player.width < canvas.width - borderWidth) player.x += player.speed;
    // Верхняя граница (учитываем высоту границы)
    if (keys.ArrowUp && player.y > borderWidth) player.y -= player.speed;
    // Нижняя граница (учитываем высоту границы и размер игрока)
    if (keys.ArrowDown && player.y + player.height < canvas.height - borderWidth) player.y += player.speed;
}

// Функция для отрисовки игрока
function drawPlayer() {
    ctx.fillStyle = player.color;
    ctx.fillRect(player.x, player.y, player.width, player.height);
}

// Обновление позиции препятствия
function updateObstacle() {
    obstacle.y += obstacle.speed;

    // Если препятствие выходит за пределы экрана, возвращаем его вверх
    if (obstacle.y > canvas.height) {
        obstacle.y = 0;
        obstacle.x = Math.random() * (canvas.width - obstacle.width);
    }
}

// Функция для отрисовки препятствия
function drawObstacle() {
    ctx.fillStyle = obstacle.color;
    ctx.fillRect(obstacle.x, obstacle.y, obstacle.width, obstacle.height);
}

// Функция для отрисовки границ игрового поля
function drawBorders() {
    ctx.strokeStyle = 'black'; // Цвет границ
    ctx.lineWidth = borderWidth; // Толщина границ

    // Рисуем прямоугольник по периметру холста
    ctx.strokeRect(0, 0, canvas.width, canvas.height);
}

// Очистка холста
function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

// Главная функция игры
function gameLoop() {
    clearCanvas(); // Очищаем холст
    drawBorders(); // Рисуем границы
    updatePlayer(); // Обновляем позицию игрока
    drawPlayer(); // Рисуем игрока
    updateObstacle(); // Обновляем препятствие
    drawObstacle(); // Рисуем препятствие
    requestAnimationFrame(gameLoop); // Запускаем следующую итерацию цикла
}

// Запускаем игру
gameLoop();