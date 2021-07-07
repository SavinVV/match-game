import {delSettings} from './settings';
import {createUsersInBestScore} from './indexDB';

const main = document.querySelector('main');

// Best score

function renderBestScore() {
    delSettings();
    const bestScore = document.createElement('div');
    bestScore.classList.add('best_score');
    main.innerHTML = '';
    bestScore.innerHTML = `
        <h1 class="title">Best players</h1>
        <div class="users_list">

        </div>
    `;
    main.append(bestScore);
    createUsersInBestScore(bestScore.querySelector('.users_list'));
}

export {renderBestScore};