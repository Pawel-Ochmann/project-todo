import endOfToday from 'date-fns/endOfToday';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import projectHandler from './projectHandler';
import storage from './localStorageHandler';

export default function () {
  const existingDialog = document.querySelector('dialog');
  if (existingDialog) {
    return;
  }
  const body = document.querySelector('body');
  const addProjectForm = document.createElement('dialog');
  const overlay = document.querySelector('.overlay');
  overlay.classList.add('dialogOpen');

  const header = document.createElement('h2');
  header.textContent = 'Create new Project!';
  addProjectForm.appendChild(header);
  const closeMark = document.createElement('i');
  closeMark.classList.add('fa-solid', 'fa-xmark');
  addProjectForm.appendChild(closeMark);
  const form = document.createElement('form');
  const titleLabel = document.createElement('label');
  titleLabel.setAttribute('for', 'title');
  titleLabel.textContent = 'Title:';
  const titleInput = document.createElement('input');
  titleInput.name = 'title';
  form.appendChild(titleLabel);
  form.appendChild(titleInput);
  const descriptionLabel = document.createElement('label');
  descriptionLabel.setAttribute('for', 'description');
  descriptionLabel.textContent = 'Description';
  const descriptionInput = document.createElement('textarea');
  descriptionInput.setAttribute('name', 'description');
  form.appendChild(descriptionLabel);
  form.appendChild(descriptionInput);
  const dateContainer = document.createElement('div');
  const dateLabel = document.createElement('label');
  dateLabel.setAttribute('for', 'date');
  dateLabel.textContent = 'Date';
  const dateInput = document.createElement('input');
  dateInput.type = 'datetime-local';
  dateInput.value = endOfToday();
  dateInput.name = 'date';
  dateContainer.appendChild(dateLabel);
  dateContainer.appendChild(dateInput);
  form.appendChild(dateContainer);
  const priorityContainer = document.createElement('div');
  const priorityLabel = document.createElement('label');
  priorityLabel.textContent = 'Priority';
  priorityLabel.setAttribute('for', 'priority');
  const priorityInput = document.createElement('input');
  priorityInput.type = 'range';
  priorityInput.setAttribute('max', '2');
  priorityInput.name = 'priority';
  priorityContainer.appendChild(priorityLabel);
  priorityContainer.appendChild(priorityInput);
  form.appendChild(priorityContainer);
  addProjectForm.appendChild(form);
  const buttonCancel = document.createElement('button');
  buttonCancel.textContent = 'Cancel';
  const buttonAdd = document.createElement('button');
  buttonAdd.textContent = 'Add';
  buttonAdd.disabled = true;
  addProjectForm.appendChild(buttonCancel);
  addProjectForm.appendChild(buttonAdd);
  body.appendChild(addProjectForm);
  addProjectForm.showModal();

  // handle closing dialog function
  function closingDialog() {
    body.removeChild(addProjectForm);
    addProjectForm.open = false;
    overlay.classList.remove('dialogOpen');
  }
  closeMark.addEventListener('click', closingDialog);
  buttonCancel.addEventListener('click', closingDialog);

  function enableAddButton() {
    if (titleInput.value && dateInput.value) {
      buttonAdd.disabled = false;
    } else buttonAdd.disabled = true;
  }

  titleInput.addEventListener('change', enableAddButton);
  dateInput.addEventListener('change', enableAddButton);

  function appendNewProject(project) {
    console.log(project);
    const projectContainer = document.querySelector('.projectContainer');
    const box = document.createElement('div');
    const projectHeader = document.createElement('h3');
    projectHeader.textContent = project.title;
    const priority = document.createElement('p');
    if (project.priority === 0) {
      priority.textContent = `Priority: low`;
    } else if (project.priority === 1) {
      priority.textContent = `Priority: medium`;
    } else priority.textContent = 'Priority: important';
    const timeLeft = document.createElement('p');

    timeLeft.textContent = `Time left: ${formatDistanceToNow(
      Date.parse(project.date)
    )}`;
    const description = document.createElement('p');
    description.textContent = project.description;
    box.appendChild(projectHeader);
    box.appendChild(priority);
    box.appendChild(timeLeft);
    box.appendChild(description);
    projectContainer.appendChild(box);
  }
  function addNewProject() {
    const title = titleInput.value;
    const description = descriptionInput.value;
    const date = dateInput.value;
    const priority = priorityInput.value;

    storage.putProject(projectHandler(title, description, date, priority));
    appendNewProject(storage.getProject(title));
    closingDialog();
  }

  buttonAdd.addEventListener('click', addNewProject);
}
