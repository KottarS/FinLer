document.addEventListener('DOMContentLoaded', () => {
    const mainText = document.getElementById('main-text');
    const choiceContainer = document.getElementById('choice-container');
    
    // Звуковые файлы
    const clickSound = new Audio('click.mp3');
    const beepSound = new Audio('beep.mp3');

    // Активация аудио при первом клике
    let audioEnabled = false;
    document.body.addEventListener('click', () => {
        if (!audioEnabled) {
            clickSound.play().then(() => clickSound.pause());
            audioEnabled = true;
        }
    }, { once: true });

    // Основная логика
    mainText.addEventListener('click', (e) => {
        e.stopPropagation();
        mainText.style.display = 'none';
        choiceContainer.style.display = 'flex';
    });

    document.getElementById('kops').addEventListener('click', (e) => {
        e.stopPropagation();
        clickSound.currentTime = 0;
        clickSound.play();
    });

    document.getElementById('ksgo').addEventListener('click', (e) => {
        e.stopPropagation();
        beepSound.currentTime = 0;
        beepSound.play();
    });

    document.body.addEventListener('click', (e) => {
        if (!e.target.closest('#choice-container')) {
            mainText.style.display = 'block';
            choiceContainer.style.display = 'none';
        }
    });
});