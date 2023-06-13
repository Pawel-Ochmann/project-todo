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

function removeTask(project, taskRemoved) {
  const projectUpdated = getProject(project.title);
  localStorage.removeItem(project);
  projectUpdated.taskActive = projectUpdated.taskActive.filter((e) => e !== taskRemoved);
  putProject(projectUpdated);
}

function checkTask(project) {}


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
};
