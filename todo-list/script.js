document.addEventListener('DOMContentLoaded', () => {
    const todoInput = document.getElementById('todo-input');
    const addTodoButton = document.getElementById('add-todo');
    const todoList = document.getElementById('todo-list');
  
    // Function to add a new todo item
    function addTodo() {
      const todoText = todoInput.value.trim();
      if (todoText !== '') {
        const li = document.createElement('li');
        li.className = 'flex justify-between items-center bg-gray-200 p-2 my-2 rounded';
  
        const span = document.createElement('span');
        span.textContent = todoText;
        span.className = 'flex-grow';
  
        const completeButton = document.createElement('button');
        completeButton.textContent = 'Complete';
        completeButton.className = 'bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-2 mx-1 rounded';
        completeButton.addEventListener('click', () => {
          span.classList.toggle('line-through');
          span.classList.toggle('text-gray-500');
        });
  
        const editButton = document.createElement('button');
        editButton.textContent = 'Edit';
        editButton.className = 'bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-1 px-2 mx-1 rounded';
        editButton.addEventListener('click', () => {
          const newText = prompt('Edit your task:', span.textContent);
          if (newText !== null && newText.trim() !== '') {
            span.textContent = newText.trim();
          }
        });
  
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.className = 'bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded';
        deleteButton.addEventListener('click', () => {
          li.remove();
        });
  
        li.appendChild(span);
        li.appendChild(completeButton);
        li.appendChild(editButton);
        li.appendChild(deleteButton);
        todoList.appendChild(li);
        todoInput.value = '';
      }
    }
  
    // Add event listeners
    addTodoButton.addEventListener('click', addTodo);
    todoInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        addTodo();
      }
    });
  });
  