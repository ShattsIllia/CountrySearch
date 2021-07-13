const appRoot = document.getElementById('app-root');

// write your code here
let h1 = document.createElement('h1');
h1.innerHTML = 'Countries Search';
h1.classList.add('title');
appRoot.append(h1);

let form = document.createElement('form');
form.classList.add('form');
appRoot.append(form);

let typeOfSearchDiv = document.createElement('div');
typeOfSearchDiv.classList.add('type-of-search');
form.append(typeOfSearchDiv);
let searchQueryDiv = document.createElement('div');
searchQueryDiv.classList.add('search-query');
form.append(searchQueryDiv);

let typeOfSearchTitle = document.createElement('p');
typeOfSearchTitle.innerHTML = 'Please choose type of search';
typeOfSearchDiv.append(typeOfSearchTitle);

let radioButtondiv = document.createElement('div');
radioButtondiv.classList.add('radio-buttons');
typeOfSearchDiv.append(radioButtondiv);
createDiv('div', 'region-input-wrapper', radioButtondiv);

const regionInputWrapper = document.querySelector('.region-input-wrapper');

let regionRadioInput = document.createElement('input');
regionRadioInput.setAttribute('type', 'radio');
regionRadioInput.setAttribute('value', 'byregion');
regionRadioInput.setAttribute('id', 'region');
regionRadioInput.setAttribute('name', 'same-name');
regionInputWrapper.append(regionRadioInput);
let labelForRegionInput = document.createElement('label');
labelForRegionInput.setAttribute('for', 'region');
labelForRegionInput.innerHTML = 'By Region';
regionInputWrapper.append(labelForRegionInput);

const languageInputWrapper = createDiv('div', 'language-input-wrapper', radioButtondiv);
let languageRadioInput = document.createElement('input');
languageRadioInput.setAttribute('type', 'radio');
languageRadioInput.setAttribute('value', 'bylanguage');
languageRadioInput.setAttribute('id', 'language');
languageRadioInput.setAttribute('name', 'same-name');
languageInputWrapper.append(languageRadioInput);
let labelForLanguageInput = document.createElement('label');
labelForLanguageInput.setAttribute('for', 'region');
labelForLanguageInput.innerHTML = 'By Language';
languageInputWrapper.append(labelForLanguageInput);

function createDiv(el, className, parentElement) {
    let element = document.createElement(el);
    if (className) {
        element.classList.add(className);
    }
    parentElement.append(element);
    return element;
}
let searchQueryTitle = document.createElement('p');
searchQueryTitle.innerHTML = 'Please choose search query';
searchQueryDiv.append(searchQueryTitle);

let searchQuerySelect = document.createElement('select');
searchQuerySelect.classList.add('selection');
searchQueryDiv.append(searchQuerySelect);


let regionRadioBtn = document.querySelector('#region');
regionRadioBtn.addEventListener('click', createRegionOptions);
let regionList = externalService.getRegionsList();

function createRegionOptions() {
    searchQuerySelect.innerHTML = '';
    for (let i = 0; i < regionList.length; i++) {
        let option = document.createElement('option');
        option.innerHTML = regionList[i];
        searchQuerySelect.append(option);
    }
}

let languageRadioBtn = document.querySelector('#language');
languageRadioBtn.addEventListener('click', createLanguageOptions);
let languageList = externalService.getLanguagesList();

function createLanguageOptions() {
    searchQuerySelect.innerHTML = '';
    for (let i = 0; i < languageList.length; i++) {
        let option = document.createElement('option');
        option.innerHTML = languageList[i];
        searchQuerySelect.append(option);
    }
}

let optionValue = document.querySelector('.selection');
optionValue.addEventListener('change', getSelectionValue);

let table = createDiv('div', 'table-wrapper', appRoot);

function checkRegionRadioButton() {
    if (regionRadioBtn.type === 'radio' && regionRadioBtn.checked) {
        return regionRadioBtn.value
    }
}

function checkLanguageRadioButton() {
    if (languageRadioBtn.type === 'radio' && languageRadioBtn.checked) {
        return languageRadioBtn.value
    }
}

function getSelectionValue(event) {
    let value = event.target.value;
    let getCountryByRegion = externalService.getCountryListByRegion(value);
    let getCountryByLanguage = externalService.getCountryListByLanguage(value);
    if (checkRegionRadioButton() === 'byregion') {
        createTable(getCountryByRegion);
    } else if (checkLanguageRadioButton() === 'bylanguage') {
        createTable(getCountryByLanguage);
    }
}

function createTable(arr) {
    table.innerHTML = '';
    let tableHead = createDiv('div', 'table-head', table);
    let tableHeadElem1 = createDiv('div', 'table-head-element', tableHead);
    let tableHeadElem2 = createDiv('div', 'table-head-element', tableHead);
    let tableHeadElem3 = createDiv('div', 'table-head-element', tableHead);
    let tableHeadElem4 = createDiv('div', 'table-head-element', tableHead);
    let tableHeadElem5 = createDiv('div', 'table-head-element', tableHead);
    let tableHeadElem6 = createDiv('div', 'table-head-element', tableHead);
    tableHeadElem1.insertAdjacentHTML('beforeend', `<div class="country-name"><p>Country Name</p>
    <input type='button' class='country-button' value='&#8597'></div>`);
    tableHeadElem2.innerHTML = 'Capital';
    tableHeadElem3.innerHTML = 'Word Region';
    tableHeadElem4.innerHTML = 'Languages';
    tableHeadElem5.insertAdjacentHTML('beforeend', `<div class="area"><p>Area</p>
    <input type='button' class='area-button' value='&#8597'></div>`);
    tableHeadElem6.innerHTML = 'Flag';
    createTableContent(arr);
    let countryNameButton = document.querySelector('.country-button');
    let areaButton = document.querySelector('.area-button');
    countryNameButton.addEventListener('click', sortByName);
    areaButton.addEventListener('click', sortByArea);
    localStorage.setItem('arr', JSON.stringify(arr));
}

function createTableContent(arr) {
    [...document.getElementsByClassName('table-element-wrapper')].map(n => n && n.remove());
    for (let i = 0; i < arr.length; i++) {
        let wrapperElement = createDiv('div', 'table-element-wrapper', table);
        let tableElem1 = createDiv('div', 'table-element', wrapperElement);
        let tableElem2 = createDiv('div', 'table-element', wrapperElement);
        let tableElem3 = createDiv('div', 'table-element', wrapperElement);
        let tableElem4 = createDiv('div', 'table-element', wrapperElement);
        let tableElem5 = createDiv('div', 'table-element', wrapperElement);
        let tableElem6 = createDiv('div', 'table-element', wrapperElement);
        tableElem1.innerHTML = arr[i].name;
        tableElem2.innerHTML = arr[i].capital;
        tableElem3.innerHTML = arr[i].region;
        tableElem4.innerHTML = Object.values(arr[i].languages);
        tableElem5.innerHTML = arr[i].area;
        tableElem6.insertAdjacentHTML('beforeEnd', `<img src=${arr[i].flagURL}>`);
    }
}

function sortByName() {
    let countryNameButton = document.querySelector('.country-button');
    const sortOrder = countryNameButton.getAttribute('sort-order');
    if (sortOrder === null || sortOrder === 'desc') {
        countryNameButton.setAttribute('sort-order', 'asc');
        let arr = JSON.parse(localStorage['arr']);
        sortAsc(arr, 'name');
        createTableContent(arr);
    } else {
        countryNameButton.setAttribute('sort-order', 'desc');
        let arr = JSON.parse(localStorage['arr']);
        sortDesc(arr, 'name');
        createTableContent(arr);
    }
};

function sortByArea() {
    let areaButton = document.querySelector('.area-button');
    const sortOrder = areaButton.getAttribute('sort-order');
    if (sortOrder === null || sortOrder === 'desc') {
        areaButton.setAttribute('sort-order', 'asc');
        let arr = JSON.parse(localStorage['arr']);
        sortAsc(arr, 'area');
        createTableContent(arr);
    } else {
        areaButton.setAttribute('sort-order', 'desc');
        let arr = JSON.parse(localStorage['arr']);
        sortDesc(arr, 'area');
        createTableContent(arr);
    }
};

function sortAsc(arr, sortArgument) {
    const minusOne = -1;
    arr.sort(function(a, b) {
        if (a[sortArgument] > b[sortArgument]) {
            return 1;
        }
        if (a[sortArgument] < b[sortArgument]) {
            return minusOne;
        }
        return 0;
    });
}

function sortDesc(arr, sortArgument) {
    const minusOne = -1;
    arr.sort(function(a, b) {
        if (a[sortArgument] < b[sortArgument]) {
            return 1;
        }
        if (a[sortArgument] > b[sortArgument]) {
            return minusOne;
        }
        return 0;
    });
}