const imgLoader = document.createElement("img");
const recepiesContainer = document.querySelector('#recipes');
const btnSubmit = document.getElementById("btnSubmit");
const searchInput = document.getElementById("searchInput");
const healt = document.getElementById("health");
const diet = document.getElementById("diet");
const div = document.getElementById('conteiner_pagination');
const pages = document.getElementsByClassName('pages');
const arrowUp = document.getElementById('arrow_up');
const arrowDown = document.getElementById('arrow_down');
const arrowButton = document.getElementsByClassName('butt');
let recepiesCount = document.querySelector('.recipe-count-number');
const inputMinCal = document.querySelector('#conteinerCalories :first-child');
const inputMaxCal = document.querySelector('#conteinerCalories :nth-child(2)');
let startNumberOfRecepies = "&from=" + 0;
const enter = 13;

export {imgLoader, recepiesContainer, btnSubmit, searchInput, healt, diet, div, pages, arrowUp, arrowDown, arrowButton, recepiesCount, inputMinCal, inputMaxCal, startNumberOfRecepies, enter};