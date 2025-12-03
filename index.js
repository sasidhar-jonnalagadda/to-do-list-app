const addBtn = document.getElementById("add-btn");
const taskInput = document.getElementById("task-input");
const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
const table = document.getElementById("taskTable").querySelector("tbody");
const emptyMsg = document.getElementById("empty-msg");
const taskTable = document.getElementById("taskTable");

function addTaskToTable(taskObj) {
  const row = table.insertRow();
  const taskCell = row.insertCell();
  const actionCell = row.insertCell();

  taskCell.textContent = taskObj.text;

  const btn = document.createElement("button");
  btn.textContent = "Done";

  btn.addEventListener("click", function () {
    const taskIndex = tasks.findIndex((t) => t.id === taskObj.id);

    if (taskIndex > -1) {
      tasks.splice(taskIndex, 1);
    }

    localStorage.setItem("tasks", JSON.stringify(tasks));
    row.remove();

    toggleEmptyState();
  });

  actionCell.appendChild(btn);
}

function toggleEmptyState() {
  if (tasks.length === 0) {
    emptyMsg.classList.remove("hidden");
    taskTable.classList.add("hidden");
  } else {
    emptyMsg.classList.add("hidden");
    taskTable.classList.remove("hidden");
  }
}

addBtn.addEventListener("click", function () {
  const newTaskText = taskInput.value.trim();

  if (newTaskText.length <= 3) {
    alert("Length of the task must be at least 3 characters!");
    return;
  }

  const taskObj = {
    id: Date.now(),
    text: newTaskText,
  };

  tasks.push(taskObj);
  localStorage.setItem("tasks", JSON.stringify(tasks));

  addTaskToTable(taskObj);

  toggleEmptyState();

  taskInput.value = "";
});

taskInput.addEventListener("keypress", function (event) {
  if (event.key === "Enter") {
    addBtn.click();
  }
});

function renderInitialTasks() {
  for (let i = 0; i < tasks.length; i++) {
    addTaskToTable(tasks[i]);
  }

  toggleEmptyState();
}

const clearBtn = document.getElementById("clear-btn");

clearBtn.addEventListener("click", function () {
  if (tasks.length === 0) {
    alert("No tasks to clear!");
    return;
  }

  if (confirm("Are you sure you want to delete ALL tasks?")) {
    tasks.length = 0;

    localStorage.setItem("tasks", JSON.stringify(tasks));

    table.innerHTML = "";

    toggleEmptyState();
  }
});

renderInitialTasks();
