function setCookie(name, value, days) {
    var expires = "";
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "") + expires + "; path=/";
}

function getCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
}

function eraseCookie(name) {
    document.cookie = name + '=; Max-Age=-99999999;';
}

if (document.getElementById('registerForm')) {
    document.getElementById('registerForm').addEventListener('submit', function (event) {
        event.preventDefault();

        var email = document.getElementById('email').value;
        var username = document.getElementById('username').value;
        var password = document.getElementById('password').value;
        var confirmPassword = document.getElementById('confirm_password').value;
        var rememberMe = document.getElementById('register_remember_me').checked;

        if (!validateEmail(email)) {
            alert('Введіть справжній емейл.');
            return;
        }

        if (password.length < 6) {
            alert('Пароль запалий.');
            return;
        }

        if (password !== confirmPassword) {
            alert('Паролі різні.');
            return;
        }

        var user = {
            email: email,
            username: username,
            password: password
        };

        localStorage.setItem('user', JSON.stringify(user));

        if (rememberMe) {
            setCookie('username', username, 7);
            setCookie('password', password, 7);
        }

        alert('Реєстрація успішна!');
        window.location.href = 'login.html';
    });
}

if (document.getElementById('loginForm')) {
    document.getElementById('loginForm').addEventListener('submit', function (event) {
        event.preventDefault();

        var username = document.getElementById('login_username').value;
        var password = document.getElementById('login_password').value;
        var rememberMe = document.getElementById('login_remember_me').checked;

        if (!username || !password) {
            alert('От не знаю що це.');
            return;
        }

        if (password.length < 6) {
            alert('Пароль запалий.');
            return;
        }

        var storedUser = JSON.parse(localStorage.getItem('user'));

        if (storedUser && username === storedUser.username && password === storedUser.password) {
            if (rememberMe) {
                setCookie('username', username, 7);
                setCookie('password', password, 7);
            }

            alert('Вхід пройшов успішно!');
            setCookie('увійшли в', true, 7);
            window.location.href = 'index.html';
        } else {
            alert('Неправильне імя користувача або пароль');
        }
    });

    window.onload = function () {
        var savedUsername = getCookie('username');
        var savedPassword = getCookie('password');
        if (savedUsername && savedPassword) {
            document.getElementById('login_username').value = savedUsername;
            document.getElementById('login_password').value = savedPassword;
        }
    };
}

window.onload = function () {
    var authLink = document.getElementById('authLink');
    if (getCookie('loggedIn')) {
        authLink.innerHTML = 'Вийти';
        authLink.href = '#';
        authLink.addEventListener('click', function () {
            eraseCookie('loggedIn');
            window.location.href = 'index.html';
        });
    }
};

function validateEmail(email) {
    var re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}
