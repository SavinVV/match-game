import {User} from './classes';

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
            const user = new User(obj.fname, obj.lname, obj.email);
            user.avatar = obj.avatar;
            user.score = obj.score;
            user.render(bestScore);
        });
    };

    request.onerror = function() {
        console.log("Ошибка", request.error);
    };
}

export {db, checkUserInDB, createUsersInBestScore};