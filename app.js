document.addEventListener("DOMContentLoaded", loadTasks);

function addTask() {
    const taskInput = document.getElementById("taskInput").value.trim();
    const taskDate = document.getElementById("taskDate").value;
    const taskPriority = document.getElementById("taskPriority").value;
    
    if (taskInput === "") {
        alert("Введите задачу!");
        return;
    }

    const task = { text: taskInput, date: taskDate, priority: taskPriority, completed: false };
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.push(task);
    localStorage.setItem("tasks", JSON.stringify(tasks));

    renderTasks();
}

function renderTasks() {
    const taskList = document.getElementById("taskList");
    const completedTasks = document.getElementById("completedTasks");
    taskList.innerHTML = "";
    completedTasks.innerHTML = "";

    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];

    tasks.forEach((task, index) => {
        const li = document.createElement("li");
        li.innerHTML = `
            <span class="${task.completed ? 'completed' : ''}">
                ${task.text} (${task.date}) [${task.priority}]
            </span>
            <div>
                <button onclick="toggleComplete(${index})">${task.completed ? "↩" : "✔"}</button>
                <button onclick="confirmDelete(${index})">❌</button>
            </div>
        `;

        if (task.completed) {
            completedTasks.appendChild(li);
        } else {
            taskList.appendChild(li);
        }
    });
}

function toggleComplete(index) {
    let tasks = JSON.parse(localStorage.getItem("tasks"));
    tasks[index].completed = !tasks[index].completed;
    localStorage.setItem("tasks", JSON.stringify(tasks));
    renderTasks();
}

function confirmDelete(index) {
    if (confirm("Удалить задачу?")) {
        deleteTask(index);
    }
}

function deleteTask(index) {
    let tasks = JSON.parse(localStorage.getItem("tasks"));
    tasks.splice(index, 1);
    localStorage.setItem("tasks", JSON.stringify(tasks));
    renderTasks();
}

function loadTasks() {
    renderTasks();
}
