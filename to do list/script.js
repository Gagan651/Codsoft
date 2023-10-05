document.addEventListener('DOMContentLoaded', function () {
    const taskInput = document.getElementById('taskInput');
    const addTaskButton = document.getElementById('addTask');
    const taskList = document.getElementById('taskList');

    
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    function updateLocalStorage() {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    function renderTasks() {
        taskList.innerHTML = '';
        tasks.forEach((task, index) => {
            const listItem = document.createElement('li');
            listItem.innerHTML = `
                <span>${task}</span>
                <button class="delete-button" data-index="${index}">Delete</button>
            `;
            taskList.appendChild(listItem);
        });
    }

    function addTask() {
        const newTask = taskInput.value.trim();
        if (newTask !== '') {
            tasks.push(newTask);
            updateLocalStorage();
            renderTasks();
            taskInput.value = '';
        }
    }

    function deleteTask(index) {
        tasks.splice(index, 1);
        updateLocalStorage();
        renderTasks();
    }

    addTaskButton.addEventListener('click', addTask);

    taskInput.addEventListener('keydown', function (e) {
        if (e.key === 'Enter') {
            addTask();
        }
    });

    taskList.addEventListener('click', function (e) {
        if (e.target.classList.contains('delete-button')) {
            const index = e.target.getAttribute('data-index');
            deleteTask(index);
        }
    });

    renderTasks();
});
