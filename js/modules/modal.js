import {newGame, User} from './classes';

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

        const user = new User(firstName, lastName, email);

        newGame.user = user;
        newGame.user.avatar = document.querySelector('.avatar_container img').src;

        closeModal();

        const btnRegister = document.querySelector('.registration_btn');
        btnRegister.remove();

        newGame.createBtnStarStoptGame();
        newGame.createUserIcon();
        const btnStarStoptGame = document.querySelector('button');

        btnStarStoptGame.addEventListener('click', () => {

            switch (btnStarStoptGame.textContent) {
                case 'start game': newGame.render();
                break;
                case 'stop game': 
                newGame.status = 'stopped';
                newGame.stopGame();
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

export {renderModal, closeModal};