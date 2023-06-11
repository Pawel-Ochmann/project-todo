export default function(title, description, date, priority) {
 class Project {
    constructor(title, description, date, priority) {
        this.title = title;
        this.description = description;
        this.date = date;
        this.priority = priority;
        this.taskActive = [];
        this.taskDone = [];
    }
 }

 return new Project(title, description, date, priority);
}