// define UI variables
const form = document.querySelector("#task-form");
const taskList = document.querySelector(".collection");
const clearBtn = document.querySelector(".clear-tasks");
const filter = document.querySelector("#filter");
const taskInput = document.querySelector("#task");

// load all event listeners
loadEventListerners();

function loadEventListerners() {
  // add task event
  form.addEventListener("submit", addTask);
  // remove task event
  taskList.addEventListener("click", removeTask);
  // clear task event
  clearBtn.addEventListener("click", clearTasks);
  // filter tasks
  filter.addEventListener("keyup", filterTasks);
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
  link.innerHTML = '<i class="fa fa-remove red-text"></li>';
  li.appendChild(link);
  // append li to ul
  taskList.appendChild(li);
  // clear input
  taskInput.value = "";

  e.preventDefault();
}

// remove task
function removeTask(e) {
  if (e.target.parentElement.classList.contains("delete-item")) {
    if (confirm("Are you sure?")) {
      e.target.parentElement.parentElement.remove();
    }
  }
}

// clear tasks
function clearTasks() {
  while (taskList.firstChild) {
    taskList.removeChild(taskList.firstChild);
  }
}

// filter tasks
function filterTasks(e) {
  const text = e.target.value.toLowerCase();
  document.querySelectorAll(".collection-item").forEach(task => {
    if (task.firstChild.textContent.toLowerCase().indexOf(text) != -1) {
      task.style.display = "block";
    } else {
      task.style.display = "none";
    }
  });
}
