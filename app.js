// Variables
var taskInput = document.getElementById("new-task"); // new task input
var addButton = document.getElementsByTagName("button")[0]; // add new task button
var incompleteTaskHolder = document.getElementById("incomplete-tasks"); // ul of #incomplete-tasks
var completedTasksHolder = document.getElementById("completed-tasks"); // ul of #completed-tasks

// Functions
var createNewTaskElement = function(taskString) {
  var listItem = document.createElement("li");
  var checkBox = document.createElement("input");
  var label = document.createElement("label");
  var editInput = document.createElement("input");
  var editButton = document.createElement("button");
  var deleteButton = document.createElement("button");
  var deleteButtonImg = document.createElement("img");

  listItem.className = 'section__list-item';

  label.innerText = taskString;
  label.className = 'section__task-label';

  checkBox.type = "checkbox";
  checkBox.className = "section__input-checkbox";

  editInput.type = "text";
  editInput.className = "section__input-text";

  editButton.innerText = "Edit";
  editButton.className = "section__btn section__btn_edit";

  deleteButton.className = "section__btn section__btn_delete";
  deleteButtonImg.src = './remove.svg';
  deleteButtonImg.className = 'section__btn-icon';
  deleteButtonImg.alt = '';
  deleteButton.appendChild(deleteButtonImg);

  listItem.appendChild(checkBox);
  listItem.appendChild(label);
  listItem.appendChild(editInput);
  listItem.appendChild(editButton);
  listItem.appendChild(deleteButton);
  
  return listItem;
}

var addTask = function() {
  if (!taskInput.value) return;
  var listItem = createNewTaskElement(taskInput.value);
  incompleteTaskHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskCompleted);
  taskInput.value = "";
}

var editTask = function() {
  var listItem = this.parentNode;
  var editInput = listItem.querySelector('input[type=text]');
  var label = listItem.querySelector("label");
  var editBtn = listItem.querySelector(".section__btn_edit");
  var containsClass = listItem.classList.contains("section__list-item_edit-mode");
  if (containsClass) {
    label.innerText = editInput.value;
    editBtn.innerText = "Edit";
  } else {
    editInput.value = label.innerText;
    editBtn.innerText = "Save";
  }
  listItem.classList.toggle("section__list-item_edit-mode");
}

var deleteTask = function() {
  var listItem = this.parentNode;
  var ul = listItem.parentNode;
  ul.removeChild(listItem);
}

var taskCompleted = function() {
  var listItem = this.parentNode;
  completedTasksHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskIncomplete);
}

var taskIncomplete = function() {
  var listItem = this.parentNode;
  incompleteTaskHolder.appendChild(listItem);
  bindTaskEvents(listItem,taskCompleted);
}

var ajaxRequest = function() {
  console.log("AJAX Request");
}

// Event Listeners

addButton.onclick = addTask;
addButton.addEventListener("click", addTask);
addButton.addEventListener("click", ajaxRequest);

var bindTaskEvents = function(taskListItem, checkBoxEventHandler) {
  var checkBox = taskListItem.querySelector("input[type=checkbox]");
  var editButton = taskListItem.querySelector("button.section__btn_edit");
  var deleteButton = taskListItem.querySelector("button.section__btn_delete");

  editButton.onclick = editTask;
  deleteButton.onclick = deleteTask;
  checkBox.onchange = checkBoxEventHandler;
}

for (let i = 0; i < incompleteTaskHolder.children.length; i++) {
  bindTaskEvents(incompleteTaskHolder.children[i], taskCompleted);
}

for (let i = 0; i < completedTasksHolder.children.length; i++) {
  bindTaskEvents(completedTasksHolder.children[i], taskIncomplete);
}