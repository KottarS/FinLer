document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('todo-form');
    const input = document.getElementById('todo-input');
    const todoList = document.getElementById('todo-list');
    const filterBtns = document.querySelectorAll('.filter-btn');
    let currentFilter = 'all';

    // Загрузка задач из localStorage
    let todos = JSON.parse(localStorage.getItem('todos')) || [];

    // Рендер задач
    function renderTodos() {
        todoList.innerHTML = '';
        const filteredTodos = todos.filter(todo => {
            if (currentFilter === 'active') return !todo.completed;
            if (currentFilter === 'completed') return todo.completed;
            return true;
        });

        filteredTodos.forEach((todo, index) => {
            const li = document.createElement('li');
            li.className = `todo-item ${todo.completed ? 'completed' : ''}`;
            li.innerHTML = `
                <input type="checkbox" ${todo.completed ? 'checked' : ''}>
                <span>${todo.text}</span>
                <button class="delete-btn">Удалить</button>
            `;
            todoList.appendChild(li);

            // Отметка выполнения
            const checkbox = li.querySelector('input');
            checkbox.addEventListener('change', () => toggleTodo(index));

            // Удаление задачи
            const deleteBtn = li.querySelector('.delete-btn');
            deleteBtn.addEventListener('click', () => deleteTodo(index));
        });
    }

    // Добавление задачи
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        if (input.value.trim()) {
            todos.push({ text: input.value.trim(), completed: false });
            input.value = '';
            saveTodos();
            renderTodos();
        }
    });

    // Переключение статуса задачи
    function toggleTodo(index) {
        todos[index].completed = !todos[index].completed;
        saveTodos();
        renderTodos();
    }

    // Удаление задачи
    function deleteTodo(index) {
        todos.splice(index, 1);
        saveTodos();
        renderTodos();
    }

    // Фильтрация задач
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            currentFilter = btn.dataset.filter;
            renderTodos();
        });
    });

    // Сохранение в localStorage
    function saveTodos() {
        localStorage.setItem('todos', JSON.stringify(todos));
    }

    // Первый рендер
    renderTodos();
});
