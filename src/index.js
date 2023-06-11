import './scss/main.scss';
import createProject from './addProject';
import storage from './localStorageHandler';

const header = document.querySelector('header');
window.addEventListener('scroll', () => {
  if (window.pageYOffset > 100) {
    header.classList.add('sticky');
  } else {
    header.classList.remove('sticky');
  }
});

const addProjectButton = document.querySelector('.projectHeader>button');
addProjectButton.addEventListener('click', () => createProject.createProject());

function loadProjects() {
  Object.keys(localStorage).forEach((key) => {

  })
}

