const addBtn = document.getElementById("add-btn");
const taskInput = document.getElementById("task-input");
const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
const table = document.getElementById("taskTable").querySelector("tbody");

function addTaskToTable(taskText) {
  const row = table.insertRow();
  const taskCell = row.insertCell();
  const actionCell = row.insertCell();

  taskCell.textContent = taskText;

  const btn = document.createElement("button");
  btn.textContent = "Done";

  btn.addEventListener("click", function () {
    const taskText = row.cells[0].textContent;
    const taskIndex = tasks.indexOf(taskText);

    if (taskIndex > -1) {
      tasks.splice(taskIndex, 1);
    }

    localStorage.setItem("tasks", JSON.stringify(tasks));
    row.remove();
  });

  actionCell.appendChild(btn);
}

addBtn.addEventListener("click", function () {
  const newTask = taskInput.value.trim();

  if (newTask.length <= 3) {
    alert("Length of the task must be at least 3 characters!");
    return;
  }

  tasks.push(newTask);
  localStorage.setItem("tasks", JSON.stringify(tasks));

  addTaskToTable(newTask);

  taskInput.value = "";
});

function renderInitialTasks() {
  for (let i = 0; i < tasks.length; i++) {
    addTaskToTable(tasks[i]);
  }
}

renderInitialTasks();
