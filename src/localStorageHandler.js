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

function changeDate(project, newDate) {
  const projectUpdated = getProject(project);
  localStorage.removeItem(project);
  projectUpdated.date = newDate;
  putProject(project);
}

export default { putProject, getProject, clearProject, removeProject, changeDate };
