document.addEventListener('DOMContentLoaded', () => {
    const backgrounds = ['bg1.jpg', 'bg2.jpg']; // Добавьте свои изображения
    let currentBgIndex = 0;
    let currentNumber = 1;
    const grid = document.getElementById('gameGrid');
    const winPopup = document.getElementById('winPopup');
    const bgMusic = document.getElementById('backgroundMusic');
    const winSound = document.getElementById('winMusic');

    // Генерация игрового поля
    function generateGrid() {
        const numbers = Array.from({length: 24}, (_, i) => i + 1);
        numbers.sort(() => Math.random() - 0.5);
        
        grid.innerHTML = '';
        numbers.forEach(num => {
            const div = document.createElement('div');
            div.className = 'grid-item';
            div.textContent = num;
            div.addEventListener('click', () => checkNumber(num, div));
            grid.appendChild(div);
        });
    }

    // Проверка клика
    function checkNumber(num, element) {
        if (num === currentNumber) {
            element.classList.add('hidden');
            currentNumber++;
            if (currentNumber > 24) {
                winPopup.style.display = 'flex';
                bgMusic.pause();
                winSound.play();
            }
        } else {
            alert('Ошибка! Нажимай по порядку!');
        }
    }

    // Смена фона
    document.getElementById('changeBg').addEventListener('click', () => {
        currentBgIndex = (currentBgIndex + 1) % backgrounds.length;
        document.body.style.backgroundImage = `url('${backgrounds[currentBgIndex]}')`;
    });

    // Рестарт игры
    document.getElementById('restart').addEventListener('click', () => {
        winPopup.style.display = 'none';
        currentNumber = 1;
        generateGrid();
        bgMusic.play();
    });

    // Автовоспроизведение музыки
    bgMusic.play().catch(() => {
        // Если браузер блокирует автовоспроизведение
        document.addEventListener('click', () => bgMusic.play(), {once: true});
    });

    generateGrid();
});
