/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./js/modules/aboutGame.js":
/*!*********************************!*\
  !*** ./js/modules/aboutGame.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "renderAboutGame": () => (/* binding */ renderAboutGame)
/* harmony export */ });
/* harmony import */ var _settings__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./settings */ "./js/modules/settings.js");


const main = document.querySelector('main');

// about Game

function renderAboutGame() {
    (0,_settings__WEBPACK_IMPORTED_MODULE_0__.delSettings)();
    const aboutGame = document.createElement('div');
    aboutGame.classList.add('about_game');
    aboutGame.innerHTML = 
        `<h1 class="title">How to play?</h1>
        <div class="content">
            <div class="content__row">
                <div class="content__item">
                    <p class="content__item_number">1</p>
                    <p class="content__item_description">Register new player in game</p>
                </div>
                <img src="assets/image/about_game/image-1.jpg" alt="image">
            </div>
            <div class="content__row">
                <div class="content__item">
                    <p class="content__item_number">2</p>
                    <p class="content__item_description">Configure your game settings</p>
                </div>
                <img src="assets/image/about_game/image-2.jpg" alt="image">
            </div>
            <div class="content__row">
                <div class="content__item">
                    <p class="content__item_number">3</p>
                    <p class="content__item_description">Start you new game! Remember card positions 
                    and match it before times up.</p>
                </div>
                <img src="assets/image/about_game/image-3.jpg" alt="image">
            </div>
        </div>`;
        
        main.append(aboutGame);
}

// renderAboutGame();




/***/ }),

/***/ "./js/modules/bestScore.js":
/*!*********************************!*\
  !*** ./js/modules/bestScore.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "renderBestScore": () => (/* binding */ renderBestScore)
/* harmony export */ });
/* harmony import */ var _settings__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./settings */ "./js/modules/settings.js");
/* harmony import */ var _indexDB__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./indexDB */ "./js/modules/indexDB.js");



const main = document.querySelector('main');

// Best score

function renderBestScore() {
    (0,_settings__WEBPACK_IMPORTED_MODULE_0__.delSettings)();
    const bestScore = document.createElement('div');
    bestScore.classList.add('best_score');
    main.innerHTML = '';
    bestScore.innerHTML = `
        <h1 class="title">Best players</h1>
        <div class="users_list">

        </div>
    `;
    main.append(bestScore);
    (0,_indexDB__WEBPACK_IMPORTED_MODULE_1__.createUsersInBestScore)(bestScore.querySelector('.users_list'));
}



/***/ }),

/***/ "./js/modules/classes.js":
/*!*******************************!*\
  !*** ./js/modules/classes.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "newGame": () => (/* binding */ newGame),
/* harmony export */   "User": () => (/* binding */ User),
/* harmony export */   "Card": () => (/* binding */ Card)
/* harmony export */ });
/* harmony import */ var _settings__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./settings */ "./js/modules/settings.js");
/* harmony import */ var _menu__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./menu */ "./js/modules/menu.js");
/* harmony import */ var _bestScore__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./bestScore */ "./js/modules/bestScore.js");
/* harmony import */ var _indexDB__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./indexDB */ "./js/modules/indexDB.js");





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
        (0,_menu__WEBPACK_IMPORTED_MODULE_1__.removeNavActive)();
        (0,_settings__WEBPACK_IMPORTED_MODULE_0__.delSettings)();
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
                (0,_bestScore__WEBPACK_IMPORTED_MODULE_2__.renderBestScore)();
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
        (0,_indexDB__WEBPACK_IMPORTED_MODULE_3__.checkUserInDB)(newGame.user);
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




/***/ }),

/***/ "./js/modules/indexDB.js":
/*!*******************************!*\
  !*** ./js/modules/indexDB.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "db": () => (/* binding */ db),
/* harmony export */   "checkUserInDB": () => (/* binding */ checkUserInDB),
/* harmony export */   "createUsersInBestScore": () => (/* binding */ createUsersInBestScore)
/* harmony export */ });
/* harmony import */ var _classes__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./classes */ "./js/modules/classes.js");


let db;
let openRequest = window.indexedDB.open('match-game', 1);
openRequest.onupgradeneeded = function() {
    let thisDB = openRequest.result;
    if (!thisDB.objectStoreNames.contains('users')) {
        thisDB.createObjectStore('users', { keyPath: "email" });
    }
};

openRequest.onsuccess = function(e) {
    db = e.target.result;
};

function checkUserInDB(user) {
    let transaction = db.transaction("users", "readwrite");
    let users = transaction.objectStore("users");

    let request = users.getAll();

    request.onsuccess = function() {
        let usersArr = request.result.sort((a, b) =>  b.score - a.score);
        request.result.forEach(obj => {
            if (obj.email === user.email && obj.score < user.score) {
                users.delete(obj.email);
            }
        });
        if (usersArr.length < 10) {
            addUserInDB(users, user);
        } else {
            if (user.score > usersArr[usersArr.length-1].score) {
                users.delete(usersArr[usersArr.length-1].email);
                addUserInDB(users, user);
            }
        }
    };

    request.onerror = function() {
        console.log("Ошибка", request.error);
    };
}

function addUserInDB(usersStore, user) {

    let request = usersStore.add(user);

    request.onsuccess = function() {
        console.log(`${request.result} добавлен в базу данных`);
    };

    request.onerror = function() {
        console.log("Ошибка", request.error);
    };
}

function createUsersInBestScore(bestScore) {
    let transaction = db.transaction("users", "readwrite");
    let users = transaction.objectStore("users");

    let request = users.getAll();

    request.onsuccess = function() {
        let usersArr = request.result.sort((a, b) =>  b.score - a.score);
        usersArr.forEach(obj => {
            const user = new _classes__WEBPACK_IMPORTED_MODULE_0__.User(obj.fname, obj.lname, obj.email);
            user.avatar = obj.avatar;
            user.score = obj.score;
            user.render(bestScore);
        });
    };

    request.onerror = function() {
        console.log("Ошибка", request.error);
    };
}



/***/ }),

/***/ "./js/modules/menu.js":
/*!****************************!*\
  !*** ./js/modules/menu.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   "removeNavActive": () => (/* binding */ removeNavActive)
/* harmony export */ });
/* harmony import */ var _aboutGame__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./aboutGame */ "./js/modules/aboutGame.js");
/* harmony import */ var _bestScore__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./bestScore */ "./js/modules/bestScore.js");
/* harmony import */ var _settings__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./settings */ "./js/modules/settings.js");
/* harmony import */ var _modal__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./modal */ "./js/modules/modal.js");
/* harmony import */ var _classes__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./classes */ "./js/modules/classes.js");






function removeNavActive() {
    const navItemList = document.querySelectorAll('.nav__item');
    navItemList.forEach(item => {item.classList.remove('active');});
}

const main = document.querySelector('main'),
      header = document.querySelector('header');

function menu() {

    // Header
    
    header.innerHTML = `
        <div class="header__icon">
            <h3>match</h3>
            <h3>match</h3>
        </div>
        <nav>
            <a class="nav__item active" id="about_game" href="#">
                <p class="nav__icon">?</p>
                <h4>About Game</h4>
            </a>
            <a class="nav__item" id="best_score" href="#">
                <img class="nav__icon" src="assets/image/icon/stars.png" alt="icon">
                <h4>Best Score</h4>
            </a>
            <a class="nav__item" id="settings" href="#">
                <img class="nav__icon" src="assets/image/icon/settings.png" alt="icon">
                <h4>Game Settings</h4>
            </a>
        </nav>
        <div class="header__right">
            <button class="registration_btn white_btn">register new player</button>
        </div>
    `;

    // Menu

    function switchPage(target) {
        removeNavActive();
            target.classList.add('active');
            main.innerHTML = '';
            renderPage(target.id);
    }

    const nav = document.querySelector('nav');
    nav.addEventListener('click', e => {
        if (e.target.classList.contains('nav__item')) {
            switchPage(e.target);
        } else if (e.target.parentElement.classList.contains('nav__item')) {
            switchPage(e.target.parentElement);
        }
        if (_classes__WEBPACK_IMPORTED_MODULE_4__.newGame.status === 'run') {
            _classes__WEBPACK_IMPORTED_MODULE_4__.newGame.status = 'stopped';
            main.style.height = '800px';
            clearInterval(_classes__WEBPACK_IMPORTED_MODULE_4__.newGame.timeInterval);
            _classes__WEBPACK_IMPORTED_MODULE_4__.newGame.tougleBtnStartStopGame();
        }
    });

    function renderPage(namePage) {
        switch(namePage) {
            case 'about_game': (0,_aboutGame__WEBPACK_IMPORTED_MODULE_0__.renderAboutGame)();
                break;
            case 'best_score': (0,_bestScore__WEBPACK_IMPORTED_MODULE_1__.renderBestScore)();
                break;
            case 'settings': (0,_settings__WEBPACK_IMPORTED_MODULE_2__.renderSettings)();
                break;
        }
    }

    const btnRegister = document.querySelector('.registration_btn');
    btnRegister.addEventListener('click', () => {
        (0,_modal__WEBPACK_IMPORTED_MODULE_3__.renderModal)();
    });
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (menu);


/***/ }),

/***/ "./js/modules/modal.js":
/*!*****************************!*\
  !*** ./js/modules/modal.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "renderModal": () => (/* binding */ renderModal),
/* harmony export */   "closeModal": () => (/* binding */ closeModal)
/* harmony export */ });
/* harmony import */ var _classes__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./classes */ "./js/modules/classes.js");


const body = document.querySelector('body');

function renderModal() {
    const modal = document.createElement('div');
    modal.classList.add('modal');
    modal.innerHTML = `
        <div class="modal__inner">
        <div class="modal__container">
            <h1 class="title">Registr new Player</h1>
            <div class="modal__content">
                <form class="registration" action="#">
                    <div class="form__item">
                        <p>First Name</p>
                        <input type="text" name="firstName" placeholder="Enter your first name">
                    </div>
                    <div class="form__item">
                        <p>Last Name</p>
                        <input type="text" name="lastName" placeholder="Enter your last name">
                    </div>
                    <div class="form__item">
                        <p>E-mail</p>
                        <input type="email" name="email" placeholder="Enter your email">
                    </div>
                </form>
                <div class="avatar_container">
                    <input class="avatar_input" id="btnInput" name="upload" type="file"/>
                    <img src="assets/image/icon/avatar.png" alt="avatar" class="default_avatar">
                </div>
            </div>
            <div class="modal__button_container">
                <button class="add_user_button">Add user</button>
                <button class="cancel_btn">cancel</button>
            </div>
        </div>
    `;

    body.append(modal);

    document.querySelector('.cancel_btn').addEventListener('click', e => {
        closeModal();
    });

    document.addEventListener('keydown', (e) => {
        if (e.code === 'Escape' && document.querySelector('.modal')) {
            closeModal();
        }
    });

    modal.addEventListener('click', (e) =>{
        if (e.target === modal) {
            closeModal();
        }
    });

    const avatarContainer = document.querySelector('.avatar_container');

    avatarContainer.addEventListener('mouseover', e => {
        if (e.target.classList.contains('default_avatar')) {
            e.target.src = 'assets/image/icon/add_avatar.png';
        }
    });

    avatarContainer.addEventListener('mouseout', e => {
        if (e.target.classList.contains('default_avatar')) {
            e.target.src = 'assets/image/icon/avatar.png';
        }
    });

    const fileInput = document.querySelector('.avatar_input');

    fileInput.addEventListener('change', () => {
        avatarContainer.querySelector('img').remove();
        const file = fileInput.files[0];
        const reader = new FileReader();
        reader.onload = () => {
            const img = new Image();
            img.src = reader.result;
            avatarContainer.append(img);
        };
        reader.readAsDataURL(file);
        fileInput.value = '';
    });

    avatarContainer.addEventListener('click', () => {fileInput.click();});


    let firstName, lastName, email;

    registerUser();

    document.querySelector('.add_user_button').addEventListener('click', () => {
        if (!firstName || !lastName || !email) { return;}

        const user = new _classes__WEBPACK_IMPORTED_MODULE_0__.User(firstName, lastName, email);

        _classes__WEBPACK_IMPORTED_MODULE_0__.newGame.user = user;
        _classes__WEBPACK_IMPORTED_MODULE_0__.newGame.user.avatar = document.querySelector('.avatar_container img').src;

        closeModal();

        const btnRegister = document.querySelector('.registration_btn');
        btnRegister.remove();

        _classes__WEBPACK_IMPORTED_MODULE_0__.newGame.createBtnStarStoptGame();
        _classes__WEBPACK_IMPORTED_MODULE_0__.newGame.createUserIcon();
        const btnStarStoptGame = document.querySelector('button');

        btnStarStoptGame.addEventListener('click', () => {

            switch (btnStarStoptGame.textContent) {
                case 'start game': _classes__WEBPACK_IMPORTED_MODULE_0__.newGame.render();
                break;
                case 'stop game': 
                _classes__WEBPACK_IMPORTED_MODULE_0__.newGame.status = 'stopped';
                _classes__WEBPACK_IMPORTED_MODULE_0__.newGame.stopGame();
                break;
            }
        });
    });


    // Проверка формы регистрации

    function getUserValue(input, value) {
        switch(input.attributes.name.value) {
            case 'firstName': firstName = value;
            break;
            case 'lastName': lastName = value;
            break;
            case 'email': email = value;
            break;
        }
    }

    function registerUser() {
        const inputs = document.querySelectorAll('input');
        inputs.forEach(input => {
            input.addEventListener('input', () => {
                let reg;
                input.attributes.name.value === 'email' ? reg = /.+@.+\..+/i : reg = /^[a-zа-я]{1,15}$/gi;
                if (input.value.match(reg)) {
                    input.style.border = '2px solid green';
                    getUserValue(input, input.value);
                } else {
                    input.style.border = '2px solid red';
                    getUserValue(input, '');
                }
            });
        });
    }
}

function closeModal() {
    document.querySelector('.modal').remove();
}



/***/ }),

/***/ "./js/modules/settings.js":
/*!********************************!*\
  !*** ./js/modules/settings.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "renderSettings": () => (/* binding */ renderSettings),
/* harmony export */   "delSettings": () => (/* binding */ delSettings)
/* harmony export */ });
/* harmony import */ var _classes__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./classes */ "./js/modules/classes.js");


const body = document.querySelector('body'),
      main = document.querySelector('main');

// Settings

function renderSettings() {
    let settings = document.querySelector('.settings');
    if (settings) {settings.remove();}
    settings = document.createElement('div');
    settings.classList.add('settings');
    settings.innerHTML = `
        <form class="settings__form" action="#">
            <div class="settings__item">
                <h1 class="title">Game cards</h1>
                <select name="" id="cards_type">
                    <option hidden>select game cards type</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                </select>
            </div>
            <div class="settings__item">
                <h1 class="title">Difficulty</h1>
                <select name="" id="difficulty">
                    <option value="" hidden>select game type</option>
                    <option value="12">4x3</option>
                    <option value="16">4x4</option>
                </select>
            </div>
        </form>
    `;
    main.style.display = 'none';
    body.append(settings);

    const cardsType = document.querySelector('#cards_type');
    cardsType.addEventListener('change', e => {
        _classes__WEBPACK_IMPORTED_MODULE_0__.newGame.cardBack = e.target.value;
    });

    const difficulty = document.querySelector('#difficulty');
    difficulty.addEventListener('change', e => {
        _classes__WEBPACK_IMPORTED_MODULE_0__.newGame.difficulty = +e.target.value;
    });
}

function delSettings() {
    const settings = document.querySelector('.settings');
    if (settings) {
        settings.remove();
        main.style.display = 'block';
    }
}




/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./js/script.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modules_aboutGame__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/aboutGame */ "./js/modules/aboutGame.js");
/* harmony import */ var _modules_menu__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/menu */ "./js/modules/menu.js");





document.addEventListener('DOMContentLoaded', () => {

    (0,_modules_menu__WEBPACK_IMPORTED_MODULE_1__.default)();
    (0,_modules_aboutGame__WEBPACK_IMPORTED_MODULE_0__.renderAboutGame)();

});
})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map