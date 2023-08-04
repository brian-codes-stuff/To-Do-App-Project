// Select elements
let taskInput = document.getElementById('taskInput');
let addButton = document.getElementById('addButton');
let taskList = document.getElementById('taskList');

// Check if there is any data in localStorage
if(localStorage.getItem('tasks')) {
    // Parse the data to JSON and store it in tasks
    let tasks = JSON.parse(localStorage.getItem('tasks'));

    // Loop through tasks
    for(let i = 0; i < tasks.length; i++) {
        // Create a new list item
        let newTask = document.createElement('li');

        // Add the task text to the list item
        newTask.textContent = tasks[i];

        // Add the list item to the task list
        taskList.appendChild(newTask);
    }
}

// Define the addTask function to handle adding new tasks
function addTask() {
    // Get the task text from the input
    let taskText = taskInput.value;

    // If the task is not empty
    if(taskText) {
        // Create a new list item
        let newTask = document.createElement('li');
        
        // Add the task text to the list item
        newTask.textContent = taskText;
        
        // Add the list item to the task list
        taskList.appendChild(newTask);

        // Store the task in localStorage
        // Check if 'tasks' is null
        if(localStorage.getItem('tasks') === null) {
            // Initialize an empty array
            let tasks = [];
            // Add the task to array
            tasks.push(taskText);
            // Store the array in localStorage
            localStorage.setItem('tasks', JSON.stringify(tasks));
        } else {
            // Get the existing tasks from localStorage
            let tasks = JSON.parse(localStorage.getItem('tasks'));
            // Add the new task to array
            tasks.push(taskText);
            // Re-store the array in localStorage
            localStorage.setItem('tasks', JSON.stringify(tasks));
        }

        // Clear the input field
        taskInput.value = '';
    }
}

// Attach an event listener to the add button to call the addTask function when clicked
addButton.addEventListener('click', addTask);
