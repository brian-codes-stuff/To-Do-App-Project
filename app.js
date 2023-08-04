// Once upon a time in a far away browser...
document.getElementById("addButton").addEventListener("click", addTask); // When the "Add" button hears a click, it calls upon addTask
document.getElementById("sortOption").addEventListener("change", loadTasks); // When "Sort By" dropdown hears a change, it wakes up loadTasks

// Our journey begins when the page has fully loaded
window.onload = function() {
    // The date picker fairy sprinkles some magic to make selecting dates enchanting!
    flatpickr("#taskDate", {
        altInput: true,
        altFormat: "m/d/Y",
        dateFormat: "Y-m-d"
    });

    // We summon all tasks from the non-persistent realm
    loadTasks();
};

let tasks = []; // Our trusty steed, a gallant array that will carry our tasks on its back

// A magical scroll known as addTask
function addTask() {
    // It captures the words of the user from the mysterious taskInput field
    var task = document.getElementById("taskInput").value;

    // It even knows the date when the user wishes the task to be done!
    var taskDate = document.getElementById("taskDate").value;

    // But the scroll refuses to work on empty words and alerts the user
    if (task.trim() === '') return alert("The scroll can't work on empty tasks!");

    // It sends the new task on a quest, setting its completion status to false
    tasks.push({ task, taskDate, completed: false });

    // A sorting spell to order tasks by date or alphabet, as per the user's wish
    tasks.sort(function(a, b) {
        var sortOption = document.getElementById("sortOption").value;
        if (sortOption === "date") {
            return new Date(a.taskDate) - new Date(b.taskDate);
        } else if (sortOption === "alphabet") {
            return a.task.localeCompare(b.task);
        }
    });

    // With the new tasks added, we summon the loadTasks scroll once more
    loadTasks();

    // Clear the input fields, ready for the user's next task
    document.getElementById("taskInput").value = '';
    document.getElementById("taskDate").value = '';
}

// Another magical scroll named loadTasks
function loadTasks() {
    // It clears the path for the new tasks to be displayed
    document.getElementById("taskList").innerHTML = '';
    document.getElementById("completedTaskList").innerHTML = '';

    // It applies the sorting spell on the loaded tasks
    tasks.sort(function(a, b) {
        var sortOption = document.getElementById("sortOption").value;
        if (sortOption === "date") {
            return new Date(a.taskDate) - new Date(b.taskDate);
        } else if (sortOption === "alphabet") {
            return a.task.localeCompare(b.task);
        }
    });

    // One by one, it presents each task to the user
    tasks.forEach(function(task, i) {
        var li = document.createElement('li');
        // Here the formatDate spell changes the date format to "MM/DD/YYYY"
        li.innerHTML = '<input type="checkbox" class="form-check-input" id="task' + i + '"' + (task.completed ? ' checked' : '') + '><label class="form-check-label' + (task.completed ? ' completed' : '') + '" for="task' + i + '">' + task.task + ' - ' + formatDate(task.taskDate) + '</label>';
        li.addEventListener("change", function() {
            completeTask(i);
        });

        // If the task is completed, it proudly displays it in the completed tasks list, otherwise in the existing tasks list
        if (task.completed) {
            document.getElementById("completedTaskList").appendChild(li);
        } else {
            document.getElementById("taskList").appendChild(li);
        }
    });
}

// The final spell called completeTask
function completeTask(i) {
    // It changes the destiny of the task at index i
    tasks[i].completed = !tasks[i].completed;

    // And finally, it makes a call to the loadTasks scroll to update the task list
    loadTasks();
}

// Helper function to format the date
function formatDate(date) {
    // If there's no date, the spell doesn't need to work its magic
    if (!date) return '';
    // The spell changes the date from the 'YYYY-MM-DD' format to 'MM/DD/YYYY'
    const [year, month, day] = date.split('-');
    return `${month}/${day}/${year}`;
}
