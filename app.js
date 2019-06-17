// define UI variables
const form = document.querySelector("#task-form");
const taskList = document.querySelector(".collection");
const clearBtn = document.querySelector("#clear-tasks");
const filter = document.querySelector("#filter");
const taskInput = document.querySelector("#task");

// load all event listeners
loadEventListerners();

function loadEventListerners() {
  // add task event
  form.addEventListener("submit", addTask);
  // remove task event
  taskList.addEventListener("click", removeTask);
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
  // Clear input
  taskInput.value = "";

  e.preventDefault();
}

// remove task
function removeTask(e) {
  if (e.target.parentElement.classList.contains("delete-item")) {
    e.target.parentElement.parentElement.remove();
  }
}
