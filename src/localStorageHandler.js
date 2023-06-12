function triggerStorageEvent() {
  const storageEvent = new Event('storage');
  window.dispatchEvent(storageEvent);
}

function putProject(project) {
  window.localStorage.setItem(project.title, JSON.stringify(project));
  triggerStorageEvent();
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

export default {
  putProject,
  getProject,
  clearProject,
  removeProject,
  changeDate,
  changePriority
};
