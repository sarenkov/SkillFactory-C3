//элементы страницы
const city = document.querySelector(".city"); //город
const hello = document.querySelector(".greeting"); //приветствие
const clearLinkContainer = document.querySelector(".clear-link"); //блок, где будет ссылка на очистку куки
const saveButton = document.querySelector(".save"); //кнопка сохранения отмеченных чекбоксов

//чек-боксы
const checkboxList = document.querySelectorAll("[type='checkbox']")

//получаем значение, введенное пользователем
const getCity = () => {
    return city.value
}

//проверяем, что введенное пользователем значение не пустое
const checkValue = (value) => {
    if (value.replace(/\s+/g, "").length !== 0) {
        return true;
    }
    return false;
}

//добавляем пользовательское значение в куки
const cityAddToCookie = () => {
    if (checkValue(getCity())) {
        document.cookie = `city=${getCity()}`;
    } else {
        document.cookie = `city=`;
    }
}

//получаем значение города из куки
const getCookie = (name) => {
    let matches = document.cookie.match(new RegExp(
        "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
    ));
    return matches ? decodeURIComponent(matches[1]).trim() : undefined;
}

//выводим приветственную надпись
const greeting = () => {
    if (checkValue(getCookie("city"))) {
        city.style.cssText = "display: none";
        hello.innerHTML = `<h3>Твой город - ${getCookie("city")}!`
        addButtonForClearCookie();
    }
}

//добавляем сслыку для очистки и следим за ее нажатием - при нажатии чистим куки
const addButtonForClearCookie = () => {
    clearLinkContainer.innerHTML = "<a href='' class='clear-city'>Выбрать другой город</a>";
    clearButton = document.querySelector(".clear-city");
    clearButton.addEventListener("click", () => {
        document.cookie = 'city=;max-age=-1;';
        document.cookie = 'changeCity=false;max-age=-1;';
        removeButtonForClearCookie();
    })
}

//убираем ссылку для очистки куки
const removeButtonForClearCookie = () => {
    clearLinkContainer.innerHTML = "";
}

//запоминаем в куки отмеченные чекбоксы
const addListenerForCheckboxes = () => {
    checkboxList.forEach(element => {
        element.addEventListener('input', () => {
            document.cookie = `${element.getAttribute("name")}=${element.checked}`;
        })
    })
}

//чекаем уже отмеченные ранее чекбоксы
const checked = () => {
    if (isSaved() == "true") {
        saveButton.style.cssText = "display: none";
        checkboxList.forEach(element => {
            element.setAttribute("disabled", "");

            number = element.getAttribute("name")
            if (getCookie(number) == "true") {
                element.setAttribute("checked", "");
            }
        })
    }

    if (getCookie("changeCity") == "true" && checkValue(getCookie("city"))) {
        greeting();
        addButtonForClearCookie();
    }
}

const isSaved = () => {
    return getCookie("saved");
}

city.addEventListener("input", cityAddToCookie);
city.addEventListener("change", () => {
    document.cookie = "changeCity=true";
    checked();
});
addListenerForCheckboxes();
saveButton.addEventListener("click", () => {
    document.cookie = "saved=true";
    checked();
});

checked();