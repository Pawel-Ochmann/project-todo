import './scss/main.scss';

const body = document.querySelector('body');
const testDiv = document.createElement('span');
testDiv.classList.add('fa-solid', 'fa-plus');
body.appendChild(testDiv);
