const addNewTodo = document.querySelector('#add-new-todo');

addNewTodo.addEventListener('click', () => {
  const valueNewTodo = document.querySelector('#value-new-todo').value;
  if (valueNewTodo != '') {
    const inCompleteTodo = document.querySelector('#incomplete-todo');
    createTodo(inCompleteTodo, valueNewTodo);
    document.querySelector('#value-new-todo').value = '';
  } else {
    alert('登録したいTODOを入力してください');
  }
});

// const checkboxs = document.querySelectorAll('input[type="checkbox"]');
// checkboxs.forEach((checkbox) => {
//   checkbox.addEventListener('click', () => {
//     const incompleteList = moveCheckbox();
//   });
// });
function moveCheckbox() {
  const checkboxs = document.querySelectorAll('input[type="checkbox"]');
  const incompleteList = [];
  const completeList = [];
  for (let i = 0; i < checkboxs.length; i++) {
    if (checkboxs[i].checked) {
      completeList.push(checkboxs[i].nextElementSibling.innerText);
    } else {
      incompleteList.push(checkboxs[i].nextElementSibling.innerText);
    }
  }
  console.log(incompleteList);
  const inCompleteTodo = document.querySelector('#incomplete-todo');
  while (inCompleteTodo.firstChild) {
    inCompleteTodo.removeChild(inCompleteTodo.firstChild);
  }
  const completeTodo = document.querySelector('#complete-todo');
  while (completeTodo.firstChild) {
    completeTodo.removeChild(completeTodo.firstChild);
  }
  for (let i = 0; i < incompleteList.length; i++) {
    createTodo(inCompleteTodo, incompleteList[i]);
  }
  for (let i = 0; i < completeList.length; i++) {
    createTodo(completeTodo, completeList[i]);
  }
}

let todoNumber = 1;
function createTodo(todo, todoContent) {
  const li = document.createElement('li');

  const input = document.createElement('input');
  input.type = 'checkbox';
  input.id = 'check' + todoNumber;
  input.addEventListener('click', () => {
    moveCheckbox();
  });
  if (todo.id == 'complete-todo') {
    input.checked = true;
  }

  const label = document.createElement('label');
  label.setAttribute('for', `check${todoNumber}`);
  label.innerText = todoContent;

  todoNumber++;

  li.appendChild(input);
  li.appendChild(label);
  todo.appendChild(li);
}
