let todoItemsContainer = document.getElementById("todoItemsContainer");
let addTodoButton = document.getElementById("addTodoButton");
let saveTodoButton = document.getElementById("saveTodoButton");

function getTodoListFromLocalStorage() {
    let stringfiedTodoList = localStorage.getItem("todoList");
    let parsedTodoList = JSON.parse(stringfiedTodoList);
    if (parsedTodoList === null) {
        return [];
    } else {
        return parsedTodoList;
    }
}
let todoList = getTodoListFromLocalStorage();

function onSaveTodo() {
    localStorage.setItem("todoList", JSON.stringify(todoList));
}
saveTodoButton.onclick = function() {
    onSaveTodo();
}

function onDeleteTodo(todoId) {
    let todoElementId = document.getElementById(todoId);
    todoItemsContainer.removeChild(todoElementId);
    let deleteElementIndex = todoList.findIndex(function(eachTodo) {
        let eachTodoId = "todo" + eachTodo.uniqueNo;
        if (eachTodoId === todoId) {
            return true;
        } else {
            return false;
        }
    });
    todoList.splice(deleteElementIndex, 1);
}

function onTodoStatusChange(checkboxId, labelElementId, todoId) {
    let checkboxElement = document.getElementById(checkboxId);
    console.log(checkboxElement.checked);
    let labelElement = document.getElementById(labelElementId);
    if (checkboxElement.checked === true) {
        labelElement.classList.add("checked");
    } else {
        labelElement.classList.remove("checked");
    }
    //labelElement.classList.toggle("checked");
    let todoObjectIndex = todoList.findIndex(function(eachTodo) {
        let eachTodoId = "todo" + eachTodo.uniqueNo;
        if (eachTodoId === todoId) {
            return true;
        } else {
            return false;
        }
    });
    let todoObject = todoList[todoObjectIndex];
    console.log(todoObject);
    if (todoObject.ischecked === true) {
        todoObject.ischecked = false;
    } else {
        todoObject.ischecked = true;
    }
    console.log(todoObject);
}

function createAndAppendTodo(todo) {
    let todoId = "todo" + todo.uniqueNo;
    let checkboxId = "checkbox" + todo.uniqueNo;
    let labelId = "label" + todo.uniqueNo;
    let todoElement = document.createElement("li");
    todoElement.classList.add("todos-item-container", "d-flex", "flex-row");
    todoElement.id = todoId;
    todoItemsContainer.appendChild(todoElement);

    let inputElement = document.createElement("input");
    inputElement.type = "checkbox";
    inputElement.id = checkboxId;
    inputElement.checked = todo.ischecked;
    inputElement.classList.add("checkbox-input");
    inputElement.onclick = function() {
        onTodoStatusChange(checkboxId, labelId, todoId);
    };
    todoElement.appendChild(inputElement);

    let labelContainer = document.createElement("div");
    labelContainer.classList.add("label-container", "d-flex", "flex-row");
    todoElement.appendChild(labelContainer);

    let labelElement = document.createElement("label");
    labelElement.setAttribute("for", checkboxId);
    labelElement.id = labelId;
    if (todo.ischecked === true) {
        labelElement.classList.add("checked");
    }
    labelElement.classList.add("checkbox-label");
    labelElement.textContent = todo.text;
    labelContainer.appendChild(labelElement);

    let deleteIconContainer = document.createElement("div");
    deleteIconContainer.classList.add("delete-icon-container");
    labelContainer.appendChild(deleteIconContainer);

    let deleteIcon = document.createElement("i");
    deleteIcon.classList.add("far", "fa-trash-alt", "delete-icon");
    deleteIcon.onclick = function() {
        if (inputElement.checked === true) {
            onDeleteTodo(todoId);
        } else {
            alert("please tick the checkbox");
        }
    };
    deleteIconContainer.appendChild(deleteIcon);
}
let todosCount = todoList.length;

function onAddTodo() {
    let userInputElement = document.getElementById("todoUserInput");
    let userInputValue = userInputElement.value;
    if (userInputValue === "") {
        alert("Enter valid Text");
        return;
    }
    todosCount = todosCount + 1;
    let newTodo = {
        text: userInputValue,
        uniqueNo: todosCount
    };
    todoList.push(newTodo);
    createAndAppendTodo(newTodo);
    userInputElement.value = "";
}
addTodoButton.onclick = function() {
    onAddTodo();
};
for (let todo of todoList) {
    createAndAppendTodo(todo);
}