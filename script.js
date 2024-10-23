// Load tasks from localStorage on page load
document.addEventListener('DOMContentLoaded', loadTasks);

function addTask() {
    var taskInput = document.getElementById('taskInput');
    var taskText = taskInput.value;

    if (taskText === '') {
        alert('Please enter a task.');
        return;
    }

    var taskList = document.getElementById('taskList');
    var li = document.createElement('li');
    li.appendChild(document.createTextNode(taskText));
    
    // Add delete button
    var deleteBtn = document.createElement('button');
    deleteBtn.appendChild(document.createTextNode('Delete'));
    deleteBtn.onclick = function() {
        li.remove();
        saveTasks();
    };
    li.appendChild(deleteBtn);

    // Add event listener for single-time crossing
    li.addEventListener('click', function() {
        li.classList.toggle('completed');
        saveTasks();
    }, { once: false });

    taskList.appendChild(li);
    saveTasks();
    taskInput.value = '';  // Clear the input after adding
}

// Save tasks to localStorage
function saveTasks() {
    var tasks = [];
    var taskList = document.getElementById('taskList').getElementsByTagName('li');
    for (var i = 0; i < taskList.length; i++) {
        tasks.push({
            text: taskList[i].firstChild.textContent,
            completed: taskList[i].classList.contains('completed')
        });
    }
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Load tasks from localStorage
function loadTasks() {
    var tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    var taskList = document.getElementById('taskList');
    tasks.forEach(function(task) {
        var li = document.createElement('li');
        li.appendChild(document.createTextNode(task.text));

        // Add delete button
        var deleteBtn = document.createElement('button');
        deleteBtn.appendChild(document.createTextNode('Delete'));
        deleteBtn.onclick = function() {
            li.remove();
            saveTasks();
        };
        li.appendChild(deleteBtn);

        if (task.completed) {
            li.classList.add('completed');
        }

        li.addEventListener('click', function() {
            li.classList.toggle('completed');
            saveTasks();
        }, { once: false });

        taskList.appendChild(li);
    });
}

// Clear completed tasks
function clearCompleted() {
    var taskList = document.getElementById('taskList');
    var tasks = taskList.getElementsByClassName('completed');
    while (tasks.length > 0) {
        tasks[0].remove();  // Remove the first completed task
    }
    saveTasks();
}
