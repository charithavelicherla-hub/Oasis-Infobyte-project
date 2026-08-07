const taskInput = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");

const pendingList = document.getElementById("pendingList");
const completedList = document.getElementById("completedList");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

addBtn.addEventListener("click", addTask);

function addTask() {
  const text = taskInput.value.trim();

  if (text === "") return;

  tasks.push({
    text: text,

    completed: false,

    created: new Date().toLocaleString(),

    completedTime: "",
  });

  taskInput.value = "";

  saveTasks();

  render();
}

function render() {
  pendingList.innerHTML = "";
  completedList.innerHTML = "";

  let pending = 0;
  let completed = 0;

  tasks.forEach((task, index) => {
    const li = document.createElement("li");

    const title = document.createElement("span");
    title.className = "task-text";
    title.textContent = task.text;

    const time = document.createElement("span");
    time.className = "time";

    if (task.completed) {
      time.textContent = "Completed: " + task.completedTime;
    } else {
      time.textContent = "Added: " + task.created;
    }

    li.appendChild(title);
    li.appendChild(time);

    const btns = document.createElement("div");
    btns.className = "buttons";

    const complete = document.createElement("button");
    complete.className = "action complete";
    complete.textContent = task.completed ? "Undo" : "Complete";

    complete.addEventListener("click", () => {
      task.completed = !task.completed;

      if (task.completed) {
        task.completedTime = new Date().toLocaleString();
      }

      saveTasks();

      render();
    });

    const edit = document.createElement("button");
    edit.className = "action edit";
    edit.textContent = "Edit";

    edit.addEventListener("click", () => {
      const updated = prompt("Edit Task", task.text);

      if (updated !== null && updated.trim() !== "") {
        task.text = updated;

        saveTasks();

        render();
      }
    });

    const del = document.createElement("button");
    del.className = "action delete";
    del.textContent = "Delete";

    del.addEventListener("click", () => {
      tasks.splice(index, 1);

      saveTasks();

      render();
    });

    btns.appendChild(complete);
    btns.appendChild(edit);
    btns.appendChild(del);

    li.appendChild(btns);

    if (task.completed) {
      completed++;

      completedList.appendChild(li);
    } else {
      pending++;

      pendingList.appendChild(li);
    }
  });

  document.getElementById("pendingCount").textContent = pending;

  document.getElementById("completedCount").textContent = completed;

  document.getElementById("pendingEmpty").style.display =
    pending === 0 ? "block" : "none";

  document.getElementById("completedEmpty").style.display =
    completed === 0 ? "block" : "none";
}

function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

render();
