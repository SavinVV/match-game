'use strict';

import {renderAboutGame} from './modules/aboutGame';
import menu from './modules/menu';

document.addEventListener('DOMContentLoaded', () => {

    menu();
    renderAboutGame();

});