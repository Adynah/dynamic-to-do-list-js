// Wait for the DOM to fully load
document.addEventListener('DOMContentLoaded', function () {
    // Select DOM elements
    const addButton = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    // Load existing tasks from Local Storage on page load
    loadTasks();

    // Add task on button click
    addButton.addEventListener('click', function () {
        const taskText = taskInput.value.trim();
        if (taskText !== "") {
            addTask(taskText); // save = true by default
            taskInput.value = "";
        } else {
            alert("Please enter a task.");
        }
    });

    // Add task on Enter key press
    taskInput.addEventListener('keypress', function (event) {
        if (event.key === 'Enter') {
            const taskText = taskInput.value.trim();
            if (taskText !== "") {
                addTask(taskText); // save = true by default
                taskInput.value = "";
            } else {
                alert("Please enter a task.");
            }
        }
    });

    // Define the addTask function
    function addTask() {
        // Get and trim the input value
        const taskText = taskInput.value.trim();

        // If empty, alert the user
        if (taskText === "") {
            alert("Please enter a task.");
            return;
        }

        // Create <li> element and set text
        const li = document.createElement('li');
        li.textContent = taskText;

        // Create remove button
        const removeBtn = document.createElement('button');
        removeBtn.textContent = "Remove";
        removeBtn.classList.add('remove-btn');

        // Remove task on click
        removeBtn.onclick = function () {
            taskList.removeChild(li);
            removeTaskFromStorage(taskText);
        };

        // Append button to <li> and <li> to list
        li.appendChild(removeBtn);
        taskList.appendChild(li);

        // Save to Local Storage if needed
        if (save) {
            const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
            storedTasks.push(taskText);
            localStorage.setItem('tasks', JSON.stringify(storedTasks));
        }
    }
    // Remove task from Local Storage
    function removeTaskFromStorage(taskText) {
        let storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        storedTasks = storedTasks.filter(task => task !== taskText);
        localStorage.setItem('tasks', JSON.stringify(storedTasks));
    }

    // ✅ Load tasks from Local Storage and populate the list
    function loadTasks() {
        const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        storedTasks.forEach(taskText => addTask(taskText, false)); // false = don’t save again
    }
    // Remove a task from Local Storage
    function removeTaskFromLocalStorage(taskText) {
        let tasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        tasks = tasks.filter(task => task !== taskText);
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }
});
