import {newGame} from './classes';

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
        newGame.cardBack = e.target.value;
    });

    const difficulty = document.querySelector('#difficulty');
    difficulty.addEventListener('change', e => {
        newGame.difficulty = +e.target.value;
    });
}

function delSettings() {
    const settings = document.querySelector('.settings');
    if (settings) {
        settings.remove();
        main.style.display = 'block';
    }
}

export {renderSettings};
export {delSettings};