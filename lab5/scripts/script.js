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

switchTextes(document.querySelector(".titles>h1"), document.getElementById("add"));
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
countSquare(5, 10);