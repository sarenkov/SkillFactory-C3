//элементы страницы
const city = document.querySelector(".city"); //город
const hello = document.querySelector(".greeting"); //приветствие
const buttons = document.querySelector(".buttons"); //блок, где будет ссылка на очистку куки
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
    let _city = getCity();
    if (checkValue(_city)) {
        document.cookie = `city=${_city}`;
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
    buttons.innerHTML = "<a href='' class='clear-city'>Выбрать другой город</a>";
    clearButton = document.querySelector(".clear-city");
    clearButton.addEventListener("click", () => {
        document.cookie = 'city=;max-age=-1;';
        city.style.cssText = "display: true";
        hello.style.cssText = "display: none";
        //Этот блок сбрасывал бы куки для чек-боксов, но по заданию это вроде не надо
        // ["1", "2", "3", "4", "5", "6"].forEach(element => {
        //     document.cookie = `${element}=`;
        // }) 
        removeButtonForClearCookie();
    })
}

//убираем ссылку для очистки куки
const removeButtonForClearCookie = () => {
    buttons.innerHTML = "";
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
}

const isSaved = () => {
    return getCookie("saved");
}

if (getCookie("city") && (getCookie("city") !== '' && getCookie("city") !== undefined)) {
    greeting();
    addButtonForClearCookie();
}

city.addEventListener("input", cityAddToCookie);
city.addEventListener("change", greeting);
addListenerForCheckboxes();
saveButton.addEventListener("click", () => {
    document.cookie = "saved=true";
    checked();
});

checked();