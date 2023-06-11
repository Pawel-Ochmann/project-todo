function putProject(project) {
  window.localStorage.setItem(project.title, JSON.stringify(project));
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

export default { putProject, getProject, clearProject, removeProject };
