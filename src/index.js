import './scss/main.scss';

const body = document.querySelector('body');
const header = document.querySelector('header');
window.addEventListener('scroll', () => {
  if (window.pageYOffset > 100) {
    header.classList.add('sticky');
  } else {
    header.classList.remove('sticky');
  }
});

function createProject() {
  const addProjectForm = document.createElement('dialog');
  addProjectForm.textContent = 'This is a project form!';
  body.appendChild(addProjectForm);
  addProjectForm.showModal();
}
const addProjectButton = document.querySelector('.projectHeader>button');
addProjectButton.addEventListener('click', createProject);
