const btnAddTask = document.querySelector('#btn-new-task');
const localStorageKey = 'to-do-list'
let values = JSON.parse(localStorage.getItem(localStorageKey) || "[]")
btnAddTask.addEventListener('click', () => {
    let input = document.querySelector('#input-new-task');
    const validateIfExistNewTask = () => {
        let inputValue = input.value.charAt(0).toUpperCase() + input.value.slice(1);
        let exists = values.find(x => x.name === inputValue)
        return !exists ? false : true;
    }

    if (!input.value) {
        input.style.border = '1px solid red'
        alert('Type something to add in your list!')
    }
    else if (validateIfExistNewTask()) {
        alert('A task with this description already exists!')
        input.style.border = '';
    }
    else {
        values.push({
            name: input.value.charAt(0).toUpperCase() + input.value.slice(1),
            done: false
        })
        localStorage.setItem(localStorageKey, JSON.stringify(values))
        showValues()
        input.value = '';
        input.style.border = '';
    }
})

const showValues = () => {
    let list = document.querySelector('#to-do-list');
    list.innerHTML = '';
    for (let i = 0; i < values.length; i++) {
        let taskClass = values[i].done ? 'done' : '';
        list.innerHTML += `<li class='${taskClass}' draggable="true" data-index="${i}" >${values[i]['name']} <div><button title='Mark as done' class='marcar-feito' onclick='markItem("${values[i].name}")'><i class="fa-solid fa-check"></i></button></button><button title ='Delete' onclick='removeItem("${values[i].name}")'><i class="fa-solid fa-trash"></i></button></div></li>`

    }
    enableDragAndDrop();
}

const markItem = (name) => {
    let task = values.find(x => x.name === name);
    if (task) {
        task.done = !task.done; 
        localStorage.setItem(localStorageKey, JSON.stringify(values));
        showValues();
    }
}

const removeItem = (data) => {
    let index = values.findIndex(x => x.name === data);
    values.splice(index, 1)
    localStorage.setItem(localStorageKey, JSON.stringify(values));
    showValues()
}

let draggedIndex = null;

const enableDragAndDrop = () => {
    const items = document.querySelectorAll('#to-do-list li');

    items.forEach(item => {
        item.addEventListener('dragstart', (e) => {
            draggedIndex = item.getAttribute('data-index');
            item.classList.add('dragging');
        });

        item.addEventListener('dragover', (e) => {
            e.preventDefault();
            item.classList.add('drag-over');
        });

        item.addEventListener('dragleave', () => {
            item.classList.remove('drag-over');
        });

        item.addEventListener('drop', (e) => {
            e.preventDefault();
            const targetIndex = Number(item.getAttribute('data-index'));
            item.classList.remove('drag-over');
            
            if (draggedIndex !== null && draggedIndex !== targetIndex) {
                const draggedItem = values[draggedIndex];
                values.splice(draggedIndex, 1); // Remove do index original
                values.splice(targetIndex, 0, draggedItem); // Insere no novo lugar

                localStorage.setItem(localStorageKey, JSON.stringify(values));
                showValues(); // Atualiza a lista
            }
        });

        item.addEventListener('dragend', () => {
            item.classList.remove('dragging');
        });
    });
}


showValues();
