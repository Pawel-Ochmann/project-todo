import endOfToday from 'date-fns/endOfToday';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import projectHandler from './projectHandler';
import storage from './localStorageHandler';

function changeDateFunction(project) {
  const existingDialog = document.querySelector('dialog');
  if (existingDialog) {
    return;
  }
  const body = document.querySelector('body');
  const dateDialog = document.createElement('dialog');
  const overlay = document.querySelector('.overlay');
  overlay.classList.add('dialogOpen');
  const closeMark = document.createElement('i');
  closeMark.classList.add('fa-solid', 'fa-xmark');
  function closingDialog() {
    body.removeChild(dateDialog);
    dateDialog.open = false;
    overlay.classList.remove('dialogOpen');
  }
  closeMark.addEventListener('click', closingDialog);
  dateDialog.appendChild(closeMark);
  const dateInput = document.createElement('input');
  dateInput.type = 'date';
  dateInput.value = project.date;
  dateDialog.appendChild(dateInput);
  const changeButton = document.createElement('button');
  changeButton.textContent = 'Change';
  changeButton.addEventListener('click', () => {
    storage.changeDate(project);
    closingDialog();
  });
  dateDialog.appendChild(changeButton);
  body.appendChild(dateDialog);
  dateDialog.showModal();
}

function displayProject(project) {
  const container = document.querySelector('.displayProject');
  container.innerHTML = '';
  const projectHeader = document.createElement('h1');
  projectHeader.textContent = project.title;
  container.appendChild(projectHeader);
  const dateContainer = document.createElement('fieldset');
  const deadline = document.createElement('p');
  deadline.textContent = project.date;
  dateContainer.appendChild(deadline);
  const changeDate = document.createElement('button');
  changeDate.textContent = 'change';
  changeDate.addEventListener('click', () => {
    changeDateFunction(project);
  });
  dateContainer.appendChild(changeDate);
  const timeLeft = document.createElement('p');
  timeLeft.textContent = `Time left: ${formatDistanceToNow(
    Date.parse(project.date)
  )}`;
  dateContainer.appendChild(timeLeft);
  container.appendChild(dateContainer);
}

function appendNewProject(project) {
  const projectContainer = document.querySelector('.projectContainer');
  const box = document.createElement('div');
  const projectHeader = document.createElement('h3');
  projectHeader.textContent = project.title;
  const priority = document.createElement('p');
  if (+project.priority === 0) {
    priority.textContent = `Priority: low`;
  } else if (+project.priority === 1) {
    priority.textContent = `Priority: medium`;
  } else priority.textContent = 'Priority: high';
  const timeLeft = document.createElement('p');

  timeLeft.textContent = `Time left: ${formatDistanceToNow(
    Date.parse(project.date)
  )}`;
  const taskCounter = document.createElement('p');
  taskCounter.textContent = `Tasks done: ${project.taskDone.length}/${project.taskActive.length}`;
  const description = document.createElement('p');
  description.textContent = `Notes: ${project.description}`;
  box.appendChild(projectHeader);
  box.appendChild(priority);
  box.appendChild(timeLeft);
  box.appendChild(taskCounter);
  box.appendChild(description);
  projectContainer.appendChild(box);
  box.addEventListener('click', () => {
    displayProject(storage.getProject(project.title));
  });
}

function addNewProject(titleValue, descriptionValue, dateValue, priorityValue) {
  const title = titleValue;
  const description = descriptionValue;
  const date = dateValue;
  const priority = priorityValue;

  storage.putProject(projectHandler(title, description, date, priority));
  appendNewProject(storage.getProject(title));
}

function createProject() {
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

  buttonAdd.addEventListener('click', () => {
    addNewProject(
      titleInput.value,
      descriptionInput.value,
      dateInput.value,
      priorityInput.value
    );
    closingDialog();
  });
}

export default {
  createProject,
  addNewProject,
  appendNewProject,
  displayProject,
};
