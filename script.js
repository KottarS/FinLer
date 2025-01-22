const words = [
    {fin: 'talo', rus: 'дом'},
    {fin: 'koti', rus: 'дом'},
    {fin: 'ihminen', rus: 'человек'},
    // ... Все остальные слова из предыдущего варианта
];

class Game {
    constructor() {
        this.score = 0;
        this.currentWord = null;
        this.musicPlayer = document.getElementById('musicPlayer');
        this.wordCard = document.getElementById('wordCard');
        this.answerInput = document.getElementById('answerInput');
        this.scoreBox = document.getElementById('scoreBox');
        
        this.init();
    }

    init() {
        this.createParticles();
        this.setupEventListeners();
        this.musicPlayer.volume = 0.3;
        this.newWord();
        this.answerInput.focus();
    }

    createParticles() {
        const container = document.querySelector('.decorative-elements');
        for(let i = 0; i < 20; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.style.cssText = `
                width: ${Math.random() * 20 + 5}px;
                height: ${Math.random() * 20 + 5}px;
                left: ${Math.random() * 100}%;
                animation-delay: ${Math.random() * 20}s;
            `;
            container.appendChild(particle);
        }
    }

    getRandomWord() {
        const randomWord = words[Math.floor(Math.random() * words.length)];
        const isFinnish = Math.random() > 0.5;
        
        return {
            word: isFinnish ? randomWord.fin : randomWord.rus,
            answer: isFinnish ? randomWord.rus : randomWord.fin,
            direction: isFinnish ? 'fin' : 'rus'
        };
    }

    animateCard(success) {
        this.wordCard.style.transform = success 
            ? 'rotateY(360deg) scale(1.05)' 
            : 'rotateX(15deg) translateY(20px)';
        
        this.wordCard.style.backgroundColor = success 
            ? 'rgba(46, 204, 113, 0.1)' 
            : 'rgba(231, 76, 60, 0.1)';
        
        setTimeout(() => {
            this.wordCard.style.transform = 'none';
            this.wordCard.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
        }, 500);
    }

    showFeedback(success) {
        const messages = success ? [
            '🔥 Идеально!',
            '🚀 Космический результат!',
            '🎯 В точку!',
            '💎 Бриллиантовый ответ!'
        ] : [
            '💥 Эпик фейл!',
            '🤯 Мозг взорвался?',
            '🌀 Попробуй ещё!',
            '❌ Неа, думай лучше!'
        ];
        
        const message = messages[Math.floor(Math.random() * messages.length)];
        this.wordCard.textContent = message;
        
        setTimeout(() => {
            this.wordCard.textContent = this.currentWord.word.toUpperCase();
        }, 1000);
    }

    checkAnswer() {
        const userAnswer = this.answerInput.value.trim().toLowerCase();
        const isCorrect = userAnswer === this.currentWord.answer.toLowerCase();

        if(isCorrect) {
            this.score++;
            this.scoreBox.textContent = `Счёт: ${this.score}`;
            this.animateCard(true);
            this.showFeedback(true);
        } else {
            this.animateCard(false);
            this.showFeedback(false);
        }

        this.answerInput.value = '';
        setTimeout(() => this.newWord(), isCorrect ? 800 : 1200);
    }

    newWord() {
        this.currentWord = this.getRandomWord();
        this.wordCard.textContent = this.currentWord.word.toUpperCase();
        this.answerInput.focus();
    }

    setupEventListeners() {
        this.answerInput.addEventListener('keypress', (e) => {
            if(e.key === 'Enter') this.checkAnswer();
        });
        
        this.wordCard.addEventListener('click', () => {
            this.answerInput.focus();
        });
    }
}

// Запуск игры
window.addEventListener('DOMContentLoaded', () => new Game());
