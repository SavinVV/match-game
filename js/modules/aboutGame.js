import {delSettings} from './settings';

const main = document.querySelector('main');

// about Game

function renderAboutGame() {
    delSettings();
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


export {renderAboutGame};