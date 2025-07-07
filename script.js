const inputBox = document.getElementById("input-box");
const dueDate = document.getElementById("due-date");
const inputBtn = document.getElementById("input-button");
const listContainer = document.getElementById("list-container");
const completedCounter = document.getElementById("completed-counter");
const uncompletedCounter = document.getElementById("uncompleted-counter");
const darkToggle = document.getElementById("dark-mode-toggle");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
let darkMode = localStorage.getItem("darkMode") === "true";

if (darkMode) {
    document.body.classList.add("dark");
}

function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function renderTasks() {
    listContainer.innerHTML = "";
    let completed = 0;

    tasks.forEach((task, index) => {
        const li = document.createElement("li");
        if (task.completed) li.classList.add("completed");

        const taskInfo = document.createElement("div");
        taskInfo.className = "task-info";
        taskInfo.innerHTML = `
      <strong>${task.text}</strong>
      <div class="task-due">${task.date ? "Due: " + task.date : ""}</div>
    `;

        const actions = document.createElement("div");
        actions.className = "task-actions";

        const completeBtn = document.createElement("button");
        completeBtn.className = "complete-btn";
        completeBtn.textContent = "✔";
        completeBtn.onclick = () => {
            task.completed = !task.completed;
            saveTasks();
            renderTasks();
        };

        const editBtn = document.createElement("button");
        editBtn.className = "edit-btn";
        editBtn.textContent = "✏";
        editBtn.onclick = () => {
            const newText = prompt("Edit task:", task.text);
            if (newText) {
                task.text = newText;
                saveTasks();
                renderTasks();
            }
        };

        const deleteBtn = document.createElement("button");
        deleteBtn.className = "delete-btn";
        deleteBtn.textContent = "🗑";
        deleteBtn.onclick = () => {
            tasks.splice(index, 1);
            saveTasks();
            renderTasks();
        };

        actions.appendChild(completeBtn);
        actions.appendChild(editBtn);
        actions.appendChild(deleteBtn);

        li.appendChild(taskInfo);
        li.appendChild(actions);
        listContainer.appendChild(li);

        if (task.completed) completed++;
    });

    completedCounter.textContent = completed;
    uncompletedCounter.textContent = tasks.length - completed;
}

inputBtn.onclick = () => {
    const text = inputBox.value.trim();
    const date = dueDate.value;
    if (text === "") return alert("Please enter a task.");

    tasks.push({ text, date, completed: false });
    inputBox.value = "";
    dueDate.value = "";
    saveTasks();
    renderTasks();
};

darkToggle.onclick = () => {
    document.body.classList.toggle("dark");
    localStorage.setItem("darkMode", document.body.classList.contains("dark"));
};
document.getElementById('enable-due-date').addEventListener('change', function () {
    const dateInput = document.getElementById('due-date');
    if (this.checked) {
        dateInput.style.display = 'block';

        const today = new Date().toISOString().split("T")[0];
        dateInput.setAttribute("min", today);
        dateInput.value = today;
    } else {
        dateInput.style.display = 'none';
        dateInput.value = "";
    }
});

document.getElementById('enable-due-date').addEventListener('change', function () {
    const dateInput = document.getElementById('due-date');
    if (this.checked) {
        dateInput.style.display = 'block';

        const today = new Date().toISOString().split("T")[0];
        dateInput.setAttribute("min", today);
        dateInput.value = today;
    } else {
        dateInput.style.display = 'none';
        dateInput.value = "";
    }
});

renderTasks();
