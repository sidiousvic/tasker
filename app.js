// define UI variables
const form = document.querySelector("#task-form");
const taskList = document.querySelector(".collection");
const clearBtn = document.querySelector(".clear-tasks");
const filter = document.querySelector("#filter");
const taskInput = document.querySelector("#task");

// load all event listeners
loadEventListerners();

function loadEventListerners() {
  // DOM load event
  document.addEventListener("DOMContentLoaded", getTasks);
  // add task event
  form.addEventListener("submit", addTask);
  // remove task event
  taskList.addEventListener("click", removeTask);
  // clear task event
  clearBtn.addEventListener("click", clearTasks);
  // filter tasks
  filter.addEventListener("keyup", filterTasks);
}

// get tasks from LS
function getTasks() {
  let tasks;
  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }
  tasks.forEach(x => {
    // create li element and add class
    const li = document.createElement("li");
    li.className = "collection-item";
    // create text node
    li.appendChild(document.createTextNode(x));
    // create new link element adn add class
    const link = document.createElement("a");
    link.className = "delete-item secondary-content";
    // add icon html and append link to li
    link.innerHTML =
      '<div class="delete-icons"><i class="fa fa-remove delete-item"></i><i class="fa fa-trash-o red-text"></i></div>';
    li.appendChild(link);
    // append li to ul
    taskList.appendChild(li);
  });
}

// add task
function addTask(e) {
  if (taskInput.value === "") {
    return;
  }

  // create li element and add class
  const li = document.createElement("li");
  li.className = "collection-item";
  // create text node
  li.appendChild(document.createTextNode(taskInput.value));
  // create new link element adn add class
  const link = document.createElement("a");
  link.className = "delete-item secondary-content";
  // add icon html and append link to li
  link.innerHTML =
    '<div class="delete-icons"><i class="fa fa-remove delete-item"></i><i class="fa fa-trash-o red-text"></i></div>';
  li.appendChild(link);
  // append li to ul
  taskList.appendChild(li);

  // store in local storage
  storeTaskInLocalStorage(taskInput.value);

  // clear input
  taskInput.value = "";

  e.preventDefault();
}

// store task
function storeTaskInLocalStorage(task) {
  let tasks;
  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }

  tasks.push(task);
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// remove task
function removeTask(e) {
  if (e.target.parentElement.parentElement.classList.contains("delete-item")) {
    // if (confirm("Are you sure?")) {
    e.target.parentElement.parentElement.parentElement.remove();

    // remove from LS
    removeTaskFromLocalStorage(
      e.target.parentElement.parentElement.parentElement
    );
    // }
  }
}

function removeTaskFromLocalStorage(task) {
  let tasks;
  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }

  // remove from LS (avoids removing duplicates)
  for (let i in tasks) {
    if (task.textContent === tasks[i]) {
      tasks.splice(i, 1);
      break;
    }
  }

  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// clear tasks
function clearTasks() {
  if (confirm("Are you sure?")) {
    while (taskList.firstChild) {
      taskList.removeChild(taskList.firstChild);
    }
    // clear from LS
    clearTasksFromLocalStorage();
  }
}

// clear tasks from LS
function clearTasksFromLocalStorage() {
  localStorage.removeItem("tasks");
}

// filter tasks
function filterTasks(e) {
  const text = e.target.value.toLowerCase();
  document.querySelectorAll(".collection-item").forEach(x => {
    if (x.firstChild.textContent.toLowerCase().indexOf(text) != -1) {
      x.style.display = "block";
    } else {
      x.style.display = "none";
    }
  });
}
