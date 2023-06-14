import reload from './index.js';

function triggerStorageEvent() {
  const storageEvent = new Event('storage');
  window.dispatchEvent(storageEvent);
}

function putProject(project) {
  window.localStorage.setItem(project.title, JSON.stringify(project));
  triggerStorageEvent();
  reload.loadProjects();
}

function getProject(title) {
  return JSON.parse(window.localStorage.getItem(title));
}

function clearProject() {
  window.localStorage.clear();
}

function removeProject(title) {
  window.localStorage.removeItem(title);
  window.location.reload();
}

function changeDate(project, newDate) {
  const projectUpdated = getProject(project.title);
  localStorage.removeItem(project);
  projectUpdated.date = newDate;
  putProject(projectUpdated);
}

function changePriority(project, newPriority) {
  const projectUpdated = getProject(project.title);
  localStorage.removeItem(project);
  projectUpdated.priority = newPriority;
  putProject(projectUpdated);
}
function addTask(project, newTask) {
  const projectUpdated = getProject(project.title);
  localStorage.removeItem(project);
  projectUpdated.taskActive.push(newTask);
  putProject(projectUpdated);
}

function removeTask(project, index) {
  const projectUpdated = getProject(project.title);
  localStorage.removeItem(project);
  projectUpdated.taskActive.splice(index, 1);
  putProject(projectUpdated);
}

function checkTask(project, index) {
  const projectUpdated = getProject(project.title);
  localStorage.removeItem(project);
  projectUpdated.taskDone.unshift(projectUpdated.taskActive.splice(index, 1));
  putProject(projectUpdated);
}

function changeNotes(project, newNote) {
  const projectUpdated = getProject(project.title);
  localStorage.removeItem(project);
  projectUpdated.description = newNote;
  putProject(projectUpdated);
}

export default {
  putProject,
  getProject,
  clearProject,
  removeProject,
  changeDate,
  changePriority,
  addTask,
  removeTask,
  checkTask,
  changeNotes,
};
