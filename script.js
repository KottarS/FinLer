document.addEventListener('DOMContentLoaded', () => {
    // Элементы
    const mainText = document.getElementById('main-text');
    const choiceContainer = document.getElementById('choice-container');
    const kops = document.getElementById('kops');
    const ksgo = document.getElementById('ksgo');
    const sound1 = document.getElementById('sound1');
    const sound2 = document.getElementById('sound2');

    // Клик по основной надписи
    mainText.addEventListener('click', () => {
        mainText.classList.remove('active');
        mainText.classList.add('hidden');
        choiceContainer.classList.remove('hidden');
        choiceContainer.classList.add('active');
    });

    // Обработчики для выбора
    kops.addEventListener('click', (e) => {
        e.stopPropagation();
        sound1.currentTime = 0;
        sound1.play();
    });

    ksgo.addEventListener('click', (e) => {
        e.stopPropagation();
        sound2.currentTime = 0;
        sound2.play();
    });

    // Сброс при клике вне элементов
    document.body.addEventListener('click', (e) => {
        if (!e.target.closest('.text-box')) {
            mainText.classList.remove('hidden');
            mainText.classList.add('active');
            choiceContainer.classList.remove('active');
            choiceContainer.classList.add('hidden');
        }
    });
});
