document
  .getElementById('addTaskForm')
  .addEventListener('submit', function (event) {
    event.preventDefault();

    const taskInput = document.getElementById('taskInput');
    const todoList = document.getElementById('todoList');

    const newTask = document.createElement('li');

    const taskText = document.createElement('span');
    taskText.textContent = taskInput.value;
    newTask.appendChild(taskText);

    const doneButton = document.createElement('button');
    doneButton.textContent = 'Done';
    doneButton.classList.add('done-btn');
    doneButton.addEventListener('click', function () {
      taskText.classList.toggle('completed');
      if (taskText.classList.contains('completed')) {
        todoList.appendChild(newTask);
      }
    });
    newTask.appendChild(doneButton);

    const editButton = document.createElement('button');
    editButton.textContent = 'Edit';
    editButton.classList.add('edit-btn');
    editButton.addEventListener('click', function () {
      const newTaskText = prompt('Edit task:', taskText.textContent);
      if (newTaskText) {
        taskText.textContent = newTaskText;
      }
    });
    newTask.appendChild(editButton);

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.classList.add('delete-btn');
    deleteButton.addEventListener('click', function () {
      todoList.removeChild(newTask);
    });
    newTask.appendChild(deleteButton);

    todoList.appendChild(newTask);
    taskInput.value = '';
  });
