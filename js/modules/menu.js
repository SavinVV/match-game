import {renderAboutGame} from './aboutGame';
import {renderBestScore} from './bestScore';
import {renderSettings} from './settings';
import {renderModal} from './modal';
import {newGame} from './classes';

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
        if (newGame.status === 'run') {
            newGame.status = 'stopped';
            main.style.height = '800px';
            clearInterval(newGame.timeInterval);
            newGame.tougleBtnStartStopGame();
        }
    });

    function renderPage(namePage) {
        switch(namePage) {
            case 'about_game': renderAboutGame();
                break;
            case 'best_score': renderBestScore();
                break;
            case 'settings': renderSettings();
                break;
        }
    }

    const btnRegister = document.querySelector('.registration_btn');
    btnRegister.addEventListener('click', () => {
        renderModal();
    });
}

export default menu;
export {removeNavActive};