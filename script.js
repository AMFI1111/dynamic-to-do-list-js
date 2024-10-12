// Wait for the DOM content to fully load before executing the script
document.addEventListener('DOMContentLoaded', function () {

    // Select DOM elements
    const addButton = document.getElementById('add-task-btn');  // Button to add tasks
    const taskInput = document.getElementById('task-input');    // Input field for entering tasks
    const taskList = document.getElementById('task-list');      // Unordered list where tasks will be displayed

    // Function to load tasks from localStorage and populate the task list
    function loadTasks() {
        // Retrieve tasks from localStorage, parse them from JSON (or use an empty array if none exist)
        const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        
        // Populate the task list with tasks from localStorage
        storedTasks.forEach(taskText => addTask(taskText, false)); // 'false' means don't save again
    }

    // Function to add a new task to the list
    function addTask(taskText, save = true) {
        if (taskText.trim() === "") {
            alert("Please enter a task.");
            return;
        }

        // Create a new li element for the task
        const taskItem = document.createElement('li');
        taskItem.textContent = taskText;  // Set the text content to the input value

        // Create a button to remove the task
        const removeButton = document.createElement('button');
        removeButton.textContent = 'Remove';  // Set button text to "Remove"
        removeButton.className = 'remove-btn';  // Add a class to the button for styling

        // Add event listener to the remove button to remove the task when clicked
        removeButton.addEventListener('click', function () {
            taskList.removeChild(taskItem);  // Remove the task from the list
            removeTaskFromLocalStorage(taskText);  // Remove the task from localStorage
        });

        // Append the remove button to the task item
        taskItem.appendChild(removeButton);

        // Append the task item to the task list
        taskList.appendChild(taskItem);

        // Save the task to localStorage if the 'save' flag is true
        if (save) {
            saveTaskToLocalStorage(taskText);
        }

        // Clear the input field after adding the task
        taskInput.value = '';
    }

    // Function to save a task to localStorage
    function saveTaskToLocalStorage(taskText) {
        // Retrieve existing tasks from localStorage, or initialize as an empty array if none exist
        const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        // Add the new task to the array
        storedTasks.push(taskText);
        // Save the updated array back to localStorage
        localStorage.setItem('tasks', JSON.stringify(storedTasks));
    }

    // Function to remove a task from localStorage
    function removeTaskFromLocalStorage(taskText) {
        // Retrieve the current tasks from localStorage
        const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        // Remove the task from the array
        const updatedTasks = storedTasks.filter(task => task !== taskText);
        // Save the updated array back to localStorage
        localStorage.setItem('tasks', JSON.stringify(updatedTasks));
    }

    // Add event listener to the "Add Task" button
    addButton.addEventListener('click', function () {
        addTask(taskInput.value);  // Call addTask with the input value
    });

    // Add event listener to allow adding tasks when the "Enter" key is pressed
    taskInput.addEventListener('keypress', function (event) {
        if (event.key === 'Enter') {
            addTask(taskInput.value);  // Call addTask when "Enter" key is pressed
        }
    });

    // Load saved tasks when the page is loaded
    loadTasks();
});
