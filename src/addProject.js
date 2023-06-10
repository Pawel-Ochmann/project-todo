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
  dateInput.type = 'date';
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
  addProjectForm.appendChild(buttonCancel);
  addProjectForm.appendChild(buttonAdd);
  body.appendChild(addProjectForm);
  addProjectForm.showModal();

  // handle closing dialog function
  function closingDialog(event) {
    event.stopPropagation();
    body.removeChild(addProjectForm);
    addProjectForm.open = false;
    overlay.classList.remove('dialogOpen');
  }
  closeMark.addEventListener('click', closingDialog);
  buttonCancel.addEventListener('click', closingDialog);
}
