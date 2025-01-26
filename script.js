document.addEventListener('DOMContentLoaded', () => {
    const questionBox = document.getElementById('questionBox');
    const imagesContainer = document.getElementById('imagesContainer');

    // Обработчик клика на надпись
    questionBox.addEventListener('click', () => {
        // Скрываем надпись
        questionBox.style.display = 'none';
        
        // Показываем контейнер с изображениями
        imagesContainer.style.display = 'block';
        
        // Генерируем 10 изображений
        for (let i = 1; i <= 10; i++) {
            const imageFrame = document.createElement('div');
            imageFrame.className = 'image-frame';
            
            const img = document.createElement('img');
            img.src = `h${i}.JPG`; // Путь к изображениям
            img.alt = `Фото ${i}`;
            
            imageFrame.appendChild(img);
            imagesContainer.appendChild(imageFrame);
        }
    });
});
