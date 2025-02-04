// �������� ������ �� canvas � ��� ��������
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// ������������� ������� ������
function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

// �������� ������� ��� �������� �������� � ��� ��������� ������� ����
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

// ������� �������
const borderWidth = 60;

// �����
const player = {
    x: canvas.width / 2,
    y: canvas.height - 100,
    width: 50,
    height: 50,
    color: 'blue',
    speed: 5,
};

// �����������
const obstacle = {
    x: Math.random() * (canvas.width - 50),
    y: 0,
    width: 50,
    height: 50,
    color: 'red',
    speed: 2,
};

// ��������� ������
const keys = {
    ArrowLeft: false,
    ArrowRight: false,
    ArrowUp: false,
    ArrowDown: false,
};

// ��������� ������� ������
window.addEventListener('keydown', (event) => {
    if (keys.hasOwnProperty(event.key)) {
        keys[event.key] = true;
    }
});

// ��������� ���������� ������
window.addEventListener('keyup', (event) => {
    if (keys.hasOwnProperty(event.key)) {
        keys[event.key] = false;
    }
});

// ���������� ������� ������ � ������ ������
function updatePlayer() {
    // ����� ������� (��������� ������ �������)
    if (keys.ArrowLeft && player.x > borderWidth) player.x -= player.speed;
    // ������ ������� (��������� ������ ������� � ������ ������)
    if (keys.ArrowRight && player.x + player.width < canvas.width - borderWidth) player.x += player.speed;
    // ������� ������� (��������� ������ �������)
    if (keys.ArrowUp && player.y > borderWidth) player.y -= player.speed;
    // ������ ������� (��������� ������ ������� � ������ ������)
    if (keys.ArrowDown && player.y + player.height < canvas.height - borderWidth) player.y += player.speed;
}

// ������� ��� ��������� ������
function drawPlayer() {
    ctx.fillStyle = player.color;
    ctx.fillRect(player.x, player.y, player.width, player.height);
}

// ���������� ������� �����������
function updateObstacle() {
    obstacle.y += obstacle.speed;

    // ���� ����������� ������� �� ������� ������, ���������� ��� �����
    if (obstacle.y > canvas.height) {
        obstacle.y = 0;
        obstacle.x = Math.random() * (canvas.width - obstacle.width);
    }
}

// ������� ��� ��������� �����������
function drawObstacle() {
    ctx.fillStyle = obstacle.color;
    ctx.fillRect(obstacle.x, obstacle.y, obstacle.width, obstacle.height);
}

// ������� ��� ��������� ������ �������� ����
function drawBorders() {
    ctx.strokeStyle = 'black'; // ���� ������
    ctx.lineWidth = borderWidth; // ������� ������

    // ������ ������������� �� ��������� ������
    ctx.strokeRect(0, 0, canvas.width, canvas.height);
}

// ������� ������
function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

// ������� ������� ����
function gameLoop() {
    clearCanvas(); // ������� �����
    drawBorders(); // ������ �������
    updatePlayer(); // ��������� ������� ������
    drawPlayer(); // ������ ������
    updateObstacle(); // ��������� �����������
    drawObstacle(); // ������ �����������
    requestAnimationFrame(gameLoop); // ��������� ��������� �������� �����
}

// ��������� ����
gameLoop();