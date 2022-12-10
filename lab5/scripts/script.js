"use strict";

function switchTextes(first, second)
{
    const tempString = first.textContent;
    const tempFontSize = getComputedStyle(first).fontSize;
    const tempFontWeight = getComputedStyle(first).fontWeight;
    first.textContent = second.textContent;
    first.style.fontSize = getComputedStyle(second).fontSize;
    first.style.fontWeight = getComputedStyle(second).fontWeight;
    second.textContent = tempString;
    second.style.fontSize = tempFontSize;
    second.style.fontWeight = tempFontWeight;
}

const countSquare = (a, b) => 
{
    if (typeof(a) != "number" || typeof(b) != "number" || a <= 0 || b <= 0)
    {
        document.getElementById("dscrp").textContent += " Площа овалу не знайдена.";
        return;
    }
    let square = " Площа овалу дорівнює = " + (a * b * Math.PI ).toString();
    document.getElementById("dscrp").textContent += square;
}

function valid(form)
{
    let inputNum = Number(form.NaturNum.value);
    if (inputNum == "" || isNaN(inputNum) || inputNum < 0) 
    {
        alert("Введені некоректні дані");
    }
    else 
    { 
        findDividers(inputNum);
        changeShowElement(document.getElementById("formBlock"), 0);
    }
}

function findDividers(number)
{
    let dividers = Array();
    for (let i = 1; i <= Math.floor(number / 2); i++)
    {
        if (number % i == 0)
            dividers.push(i);
    }
    dividers.push(number);
    alert(`Дільники числа ${dividers[dividers.length - 1]}:\n` + dividers);
    setCookie('dividers', dividers.join('@'));
}

function getCookie(name) 
{
    let matches = document.cookie.match(new RegExp(
        "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
    ));
    return matches ? decodeURIComponent(matches[1]) : undefined;
}

function setCookie(name, value, options = {}) 
{
    options = { path: '/', ...options };
    if (options.expires instanceof Date) 
    {
        options.expires = options.expires.toUTCString();
    }
    let updatedCookie = encodeURIComponent(name) + "=" + encodeURIComponent(value);
    for (let optionKey in options) 
    {
        updatedCookie += "; " + optionKey;
        let optionValue = options[optionKey];
        if (optionValue !== true) 
        {
            updatedCookie += "=" + optionValue;
        }
    }
    document.cookie = updatedCookie;
}

function deleteCookie(name) 
{
    setCookie(name, "", { 'max-age': -1 });
}

function changeShowElement(element, status)
{
    if (status == 0)
        element.style.display = 'none';
    else
        element.style.display = 'block';
}


function cookieScenario()
{
    if (getCookie('useCookie') == '1')
    {
        changeShowElement(document.getElementById("formBlock"), 0);
        return;
    }
    let dividers = getCookie('dividers');
    if (typeof(dividers) != 'undefined')
    {
        dividers = dividers.split('@');
        if (confirm(`Збережені дільники числа ${dividers[dividers.length - 1]}:\n` + dividers + "\nВидалити наявні кукі?"))
        {
            deleteCookie('dividers');
        }
        else
        {
            alert("Сайт буде використовувати наявні кукі. Сторінка оновиться автоматично");
            changeShowElement(document.getElementById("formBlock"), 0);
            setCookie('useCookie', '1');
            location.reload();
        }
    }
    else
    {
        changeShowElement(document.getElementById("formBlock"), 1);
        alert("Куків нема");
    }
}

function parseMoveCheckboxes()
{
    if (document.getElementById("mouseover1").checked)
    {
        localStorage.setItem('mouseover1', '1');
    }
    else
    {
        localStorage.setItem('mouseover1', '0');
    }
    if (document.getElementById("mouseover2").checked)
    {
        localStorage.setItem('mouseover2', '1');
    }
    else
    {
        localStorage.setItem('mouseover2', '0');
    }
    moveBasedLocalStorage();
}

function eventAction(event)
{
    event.target.style.justifyContent = "end"
    setTimeout(() => {event.target.style.justifyContent = "start";}, 500)
}

function moveBasedLocalStorage()
{
    if (localStorage.getItem('mouseover1') === '1')
    {
        document.getElementById("mouseover1").checked = true;
        let block1 = document.querySelector('.left-side_menu>nav');
        block1.addEventListener('mouseover', eventAction, false);
    }
    else
    {
        document.getElementById("mouseover1").checked = false;
        let block1 = document.querySelector('.left-side_menu>nav');
        block1.removeEventListener("mouseover", eventAction, false);
    }
    if (localStorage.getItem('mouseover2') === '1')
    {
        document.getElementById("mouseover2").checked = true;
        let block2 = document.querySelector('.right-side_title>.images');
        block2.addEventListener('mouseover', eventAction, false);
    }
    else
    {
        document.getElementById("mouseover2").checked = false;
        let block2 = document.querySelector('.right-side_title>.images');
        block2.removeEventListener("mouseover", eventAction, false);
    }
}

function createForm()
{
    if (!localStorage.getItem('formCreated') == '1') 
    {
        addFormToHTML();
    }
}

function addFormToHTML()
{
    document.querySelector('.left-side>.left-side_menu').insertAdjacentHTML
    ("beforeend", '<div id="formOfNameBlock"><form action="" method="post" name="username" id="usernameForm">'+
    '<p>Введіть ім\'я<br></p><input placeholder="Ім\'я" type="text" name="name" value="">' +
    '<input placeholder="Прізвище" type="text" name="surname" value="">' +
    '<input type="button" onclick="parseUsernameForm(document.getElementById(\'usernameForm\'))" name="submit" value="Відправити">'+
    '<input type="button" onclick="clearUsernameFromStorage()" name="submit" value="Видалити"></form></div>');
    let newForm = document.getElementById("usernameForm");
    newForm.style.display = 'flex';
    newForm.style.flexDirection = 'column';
    newForm.style.justifyContent = 'center';
    newForm.style.padding = '0 10px 5px 10px';
    newForm.querySelector('p').style.fontSize = "24px";
    newForm.querySelector('p').style.textAlign = 'center';
    localStorage.setItem('formCreated', '1');
}

function parseUsernameForm(form)
{
    let name = form.name.value;
    let surname = form.surname.value;
    if (name === '' || surname === '')
        alert("Введені некоректні дані");
    else
    {
        localStorage.setItem('name', name);
        localStorage.setItem('surname', surname);
    }
}

function clearUsernameFromStorage()
{
    localStorage.removeItem('name');
    localStorage.removeItem('surname');
    localStorage.removeItem('formCreated');
}

switchTextes(document.querySelector(".titles>h1"), document.getElementById("add"));
countSquare(5, 10);
cookieScenario();
moveBasedLocalStorage();
if (localStorage.getItem('formCreated') == '1') 
    addFormToHTML();