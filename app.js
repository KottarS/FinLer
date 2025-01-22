class Game {
    constructor() {
        // Инициализация элементов
        this.elements = {
            word: document.getElementById('currentWord'),
            input: document.getElementById('answerInput'),
            score: document.getElementById('score'),
            card: document.getElementById('wordCard'),
            music: document.getElementById('music')
        };

        this.score = 0;
        this.currentWord = null;
        this.init();
    }

    init() {
        // Настройка музыки
        this.elements.music.volume = 0.3;
        this.elements.music.play().catch(() => {});
        
        // Обработчики событий
        this.elements.input.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.checkAnswer();
        });

        this.startGame();
    }

    startGame() {
        this.newWord();
        this.elements.input.focus({ preventScroll: true });
    }

    getRandomWord() {
        // Выбор случайного слова и направления перевода
        const wordPair = words[Math.floor(Math.random() * words.length)];
        return Math.random() > 0.5 
            ? { question: wordPair.fin, answer: wordPair.rus }
            : { question: wordPair.rus, answer: wordPair.fin };
    }

    animateCard(isCorrect) {
        // Анимация карточки
        this.elements.card.style.transform = isCorrect
            ? 'rotateY(360deg) scale(1.05)'
            : 'rotateX(20deg) translateY(15px)';

        this.elements.card.style.backgroundColor = isCorrect
            ? 'rgba(78, 205, 196, 0.15)'
            : 'rgba(255, 107, 107, 0.15)';

        setTimeout(() => {
            this.elements.card.style.transform = 'none';
            this.elements.card.style.backgroundColor = 'var(--bg-blur)';
        }, 600);
    }

    checkAnswer() {
        const userAnswer = this.elements.input.value.trim().toLowerCase();
        const correctAnswer = this.currentWord.answer.toLowerCase();

        if (userAnswer === correctAnswer) {
            this.handleCorrectAnswer();
        } else {
            this.handleWrongAnswer();
        }

        this.elements.input.value = '';
    }

    handleCorrectAnswer() {
        this.score++;
        this.elements.score.textContent = this.score;
        this.animateCard(true);
        setTimeout(() => this.newWord(), 400);
    }

    handleWrongAnswer() {
        this.animateCard(false);
        this.elements.word.textContent = `${this.currentWord.question} → ${this.currentWord.answer}`;
        setTimeout(() => this.newWord(), 1500);
    }

    newWord() {
        this.currentWord = this.getRandomWord();
        this.elements.word.textContent = this.currentWord.question.toUpperCase();
        this.elements.input.focus({ preventScroll: true });
    }
}

// Инициализация игры после полной загрузки
window.addEventListener('DOMContentLoaded', () => new Game());
