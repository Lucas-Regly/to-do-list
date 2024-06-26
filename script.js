const btnAddTask = document.querySelector('#btn-new-task');
const localStorageKey = 'to-do-list'

btnAddTask.addEventListener('click', () => {
    let input = document.querySelector('#input-new-task');
    const validateIfExistNewTask = () => {
        let values = JSON.parse(localStorage.getItem(localStorageKey) || "[]");
        let inputValue = input.value;
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
        let values = JSON.parse(localStorage.getItem(localStorageKey) || "[]")
        values.push({
            name: input.value,
            done: false
        })
        localStorage.setItem(localStorageKey, JSON.stringify(values))
        showValues()
        input.value = '';
        input.style.border = '';
    }
})

const showValues = () => {
    let values = JSON.parse(localStorage.getItem(localStorageKey) || "[]")
    let list = document.querySelector('#to-do-list');
    list.innerHTML = '';
    for (let i = 0; i < values.length; i++) {
        let taskClass = values[i].done ? 'done' : '';
        list.innerHTML += `<li class='${taskClass}'>${values[i]['name']} <div><button title='Mark as done' class='marcar-feito' onclick='markItem("${values[i]['name']}")'><i class="fa-solid fa-check"></i></button></button><button title ='Delete' onclick='removeItem("${values[i]['name']}")'><i class="fa-solid fa-trash"></i></button></li></div>`

    }
}

const markItem = (name) => {
    let values = JSON.parse(localStorage.getItem(localStorageKey) || "[]");
    let task = values.find(x => x.name === name);
    if (task) {
        task.done = !task.done; // Inverte o estado da tarefa (feita ou não feita)
        localStorage.setItem(localStorageKey, JSON.stringify(values));
        showValues();
    }
}

const removeItem = (data) => {
    let values = JSON.parse(localStorage.getItem(localStorageKey) || "[]")
    let index = values.findIndex(x => x.name === data);
    values.splice(index, 1)
    localStorage.setItem(localStorageKey, JSON.stringify(values));
    showValues()
}

showValues();