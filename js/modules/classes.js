import {delSettings} from './settings';
import {removeNavActive} from './menu';
import {renderBestScore} from './bestScore';
import {checkUserInDB} from './indexDB';

const main = document.querySelector('main');

class Game {
    constructor() {
        this.cardsType = 1;
        this.difficulty = 12;
        this.status = 'stopped';
        this.user = false;
        this.prevCard = false;
        this.curCard = false;
        this.step = 0;
        this.rightStep = 0;
        this.EndTime = 0;
        this.timeInterval = false;
        this.time = 0;
        this.cardBack = 1;
    }

    render() {
        this.updateGema();
        this.status = 'run';
        removeNavActive();
        delSettings();
        this.tougleBtnStartStopGame();

        const cardsField = this.createCardsField();
        this.createCards(cardsField, this.difficulty);
        main.innerHTML = '';
        this.runTimer();
        main.append(cardsField);

        const cards = document.querySelectorAll('.card');

        setTimeout(() => {
            cards.forEach(card => card.classList.remove('flipped'));
        }, 4000);

        cardsField.addEventListener('click', e => {
            if (e.target.classList.contains('card__back')) {
                this.flipCard(e.target.parentElement);
                e.target.parentElement.classList.remove('card__hover');
            }
        });

        cardsField.addEventListener('mouseover', e => {
            if (e.target.classList.contains('card__back')) {
                e.target.parentElement.classList.add('card__hover');
            }
        });
        
    }

    updateGema() {
        this.prevCard = false;
        this.curCard = false;
        this.step = 0;
        this.rightStep = 0;
        this.EndTime = 0;
        this.time = 0;
        this.cardBack = 1;
    }

    createCardsField() {
        const cardsField = document.createElement('div');
        cardsField.classList.add('cards_field');
        if (this.difficulty === 12) {
            cardsField.style.height = '590px';
        } else {
            cardsField.style.height = '790px';
            main.style.height = '950px';
        }
        return cardsField;
    }

    createCards(cardsField, n) {
        let numFrontBG = getRandomIntArr(1, 9, n/2);
        numFrontBG = mixCards(numFrontBG);
        for (let i = 0; i < n; i++) {
            const front = `assets/image/card/front/${numFrontBG[i]}.jpg`,
                    back = `assets/image/card/back/back-${this.cardBack}.jpg`,
                    number = numFrontBG[i],
                    card = (new Card(front, back, number)).renderCard();
            cardsField.append(card);
        }
    }

    flipCard(card) {
        let color = 'red';
        this.step++;
        card.classList.add('flipped');
        if (!this.prevCard) {
            this.prevCard = card;
        } else {
            this.curCard = card;
            if (this.prevCard.dataset.number === this.curCard.dataset.number) {
                this.rightStep++;
                color = 'green';
            }
            this.paintCard([this.prevCard, this.curCard], color);
            this.prevCard = false;
        }
        this.checkStatus();
    }

    paintCard(cards, color) {
        cards.forEach(card => {
            const colorContainer = document.createElement('div');
            colorContainer.classList.add(`card__${color}`);
            card.append(colorContainer);
        });
    }

    checkStatus() {
        if (this.step === this.difficulty) {
            this.status = 'win';
            this.user.score = this.rightStep * 100 - this.time * 5;
            if (this.user.score < 0) {
                this.user.score = 0;
            }
            setTimeout(() => this.stopGame(), 1000);
        }
    }

    createFinishMessage() {
        let messege;
        if (this.status === 'win') {
            messege = `Congratulations! You successfully found all matches on ${this.EndTime} seconds.`;
        } else {
            messege = 'You lose';
        }
        const finishMessage = document.createElement('div');
        finishMessage.classList.add('congratulations', 'modal');
        finishMessage.innerHTML = `
            <div class="congratulations__inner">
                <p>${messege}</p>
                <button>OK</button>
            </div>
            `;
            main.append(finishMessage);
            const btnOK = document.querySelector('.congratulations button');
            btnOK.addEventListener('click', () => {
                finishMessage.remove();
                renderBestScore();
                document.querySelector('#best_score').classList.add('active');
            });
    }

    stopGame() {
        const time = document.querySelector('.timer__inner span');
        let seconds = +time.textContent.split(':')[1],
            minuts = +time.textContent.split(':')[0];
        this.EndTime = seconds + minuts * 60;
        clearInterval(this.timeInterval);
        this.tougleBtnStartStopGame();
        this.createFinishMessage();
        checkUserInDB(newGame.user);
    }

    // Start Stop button

    createBtnStarStoptGame() {
        const btnStartGame = document.createElement('button');
        btnStartGame.classList.add('white_btn');
        btnStartGame.textContent = 'start game';

        document.querySelector('.header__right').append(btnStartGame);
    }

    tougleBtnStartStopGame() {
        const btnStartStop = document.querySelector('.header__right button');
        switch (btnStartStop.textContent) {
            case 'start game': btnStartStop.textContent = 'stop game';
            break;
            case 'stop game': btnStartStop.textContent = 'start game';
            break;
        } 
    }

    createUserIcon() {
        const userIcon = document.createElement('div');
        userIcon.classList.add('user_icon');
        userIcon.innerHTML = `
            <img src="${this.user.avatar}" alt="user">
        `;
        document.querySelector('.header__right').append(userIcon);
    }

    // Timer

    createTimer() {
        const timer = document.createElement('div');
        timer.classList.add('timer');
        timer.innerHTML = `
            <div class="timer__inner">
                <span>00:-1</span>
            </div>
        `;
        main.append(timer);
    }

    runTimer() {
        this.createTimer();
        this.timeInterval = setInterval(() => this.updateTimer(), 1000);
        this.updateTimer();   
    } 

    updateTimer() {
        const time = document.querySelector('.timer__inner span');
        let seconds = +time.textContent.split(':')[1],
            minuts = +time.textContent.split(':')[0];
        seconds++;
        this.time = seconds + minuts * 60;
        if (seconds > 59) {
            seconds = 0;
            minuts++;
        }
        time.textContent = `${this.getZero(minuts)}:${this.getZero(seconds)}`;
    }

    getZero(num) {
        if (num >= 0 && num < 10) {
            return `0${num}`;
        } else {
            return num;
        }
    }
}

const newGame = new Game();

function mixCards(arr){
    return arr.map(i=>[Math.random(), i]).sort().map(i=>i[1]);
}

function getRandomIntArr(min, max, n) {
    const arr = [];
    while (arr.length < n) {
        const num = Math.floor(Math.random() * (max - min)) + min;
        if (arr.indexOf(num) < 0) {
            arr.push(num);
        }
    }
    return [...arr, ...arr];
}


class User {
    constructor(fname, lname, email) {
        this.fname = fname;
        this.lname = lname;
        this.email = email;
        this.avatar = 'assets/image/icon/avatar.png';
        this.score = 0;
    }

    render(bestScore) {
        const userDIV = document.createElement('div');
        userDIV.classList.add('user');
        userDIV.innerHTML = `
            <div class="avatar_container">
                <img src=${this.avatar} alt="avatar">
            </div>
            <div class="user__information">
                <p class="user__full_name">${this.fname + ' ' + this.lname}</p>
                <p class="user__email">${this.email}</p>
            </div>
            <p class="user__score">Score: <span>${this.score}</span></p>
        `;
        bestScore.append(userDIV);
    }
}


class Card {
    constructor(front, back, number) {
        this.front = front;
        this.back = back;
        this.number = number;
    }

    renderCard() {
        const card = document.createElement('div');
        card.classList.add('card_container');
        card.innerHTML = `
            <div class="card flipped" data-number="${this.number}">
                <div class="card__front" style="background-image: url(${this.front});"></div>
                <div class="card__back" style="background-image: url(${this.back});"></div>
            </div>
        `;
        return card;
    }
}


export {newGame, User, Card};