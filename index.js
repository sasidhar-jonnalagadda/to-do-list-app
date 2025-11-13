const addBtn = document.getElementById("add-btn");
const taskInput = document.getElementById("task-input");
const tasks = [];

addBtn.addEventListener("click", function () {
  const newTask = taskInput.value;

  if (newTask.length <= 3) {
    alert("Length of the task must be at least 3 characters!");
  } else {
    alert("Task added successfully!");
    tasks.push(newTask.trim());
    taskInput.value = "";
  }
});
