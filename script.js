const taskInput = document.querySelector("#newTask");
const formsubmit = document.querySelector(".form");
const addTaskBtn = document.querySelector("#addTaskBtn");
const filterTask = document.querySelector("#filter-func-input");
const clearTasks = document.querySelector("#clearTasks");
const taskItem = document.querySelector(".collection");
loadAllEventListeners();
function loadAllEventListeners() {
  document.addEventListener("DOMContentLoaded", showTasks);
  formsubmit.addEventListener("submit", addTask);
  taskItem.addEventListener("click", removeTask);
  filterTask.addEventListener("keyup", filterTasks);
  clearTasks.addEventListener("click", clearAllTasks);
}

function addTask(e) {
  e.preventDefault();
  if (taskInput.value == "") {
    alert("Enter a task");
  }
  const li = document.createElement("li");
  li.className = "collection-item";
  let val = document.createTextNode(taskInput.value);
  li.appendChild(val);
  const link = document.createElement("a");
  link.innerHTML = '<i class="fa fa-remove"></i>';
  link.className = "delete-item";
  li.appendChild(link);
  taskItem.appendChild(li);

  storeTaskInLocalStorage(taskInput.value);
  taskInput.value = "";
}

function removeTask(e) {
  if (e.target.parentElement.classList.contains("delete-item")) {
    if (confirm("Are you sure to remove this task?")) {
      e.target.parentElement.parentElement.remove();
      removeTaskfromLocalStorage(e.target.parentElement.parentElement);
    }
  }
}

function filterTasks(e) {
  console.log(e.target.value);
  const filterInputVal = e.target.value.toLowerCase();
  const listItems = document.querySelectorAll(".collection-item");
  listItems.forEach(function (task) {
    const item = task.firstChild.textContent;
    if (item.toLowerCase().indexOf(filterInputVal) != -1) {
      task.style.display = "block";
    } else {
      task.style.display = "none";
    }
  });
}

function clearAllTasks(e) {
  while (taskItem.firstChild) {
    taskItem.removeChild(taskItem.firstChild);
  }
  removeAllTasksfromlocalStorage();
}
function storeTaskInLocalStorage(taskInputVal) {
  let tasks;
  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }
  tasks.push(taskInputVal);
  localStorage.setItem("tasks", JSON.stringify(tasks));
}
function removeTaskfromLocalStorage(taskItem) {
  let tasks;
  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }
  tasks.forEach(function (task, index) {
    if (task == taskItem) {
      tasks.splice(index, 1);
    }
  });
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function removeAllTasksfromlocalStorage() {
  localStorage.clear();
}

function showTasks() {
  //console.log("called");
  let tasks;
  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }
  //console.log(tasks);
  tasks.forEach(function (task) {
    const li = document.createElement("li");
    li.className = "collection-item";
    let val = document.createTextNode(task);
    li.appendChild(val);
    const link = document.createElement("a");
    link.innerHTML = '<i class="fa fa-remove"></i>';
    link.className = "delete-item";
    li.appendChild(link);
    taskItem.appendChild(li);
  });
}
