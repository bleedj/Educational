(function() {
  window.rememberList = [];
  function createAppTitle(title) {
    let appTitle = document.createElement('h2')
    appTitle.innerHTML = title
    return appTitle
  };
  function createTodoItemForm() {
    let form = document.createElement('form');
    let input = document.createElement('input');
    let buttonWrapper = document.createElement('div');
    let button = document.createElement('button');

    form.classList.add('input-group', 'mb-3');
    input.classList.add('form-control');
    input.placeholder = 'Введите название нового дела';
    buttonWrapper.classList.add('input-group-append');
    button.classList.add('btn', 'btn-primary');
    button.textContent = 'Добавить дело';

    buttonWrapper.append(button);
    form.append(input);
    form.append(buttonWrapper);

    return {
      form,
      input,
      button,
    };
  };
  function createTodoList() {
    let list = document.createElement('ul');
    list.classList.add('list-group');
    return list;
  };
  function createTodoItem(name, done=false) {
    let item = document.createElement('li');
    let buttonGroup = document.createElement('div');
    let doneButton = document.createElement('button');
    let deleteButton = document.createElement('button');

    item.classList.add('list-group-item', 'd-flex', 'justify-content-between','align-items-center');
    item.textContent = name;
    buttonGroup.classList.add('btn-group', 'btn-group-sm');
    doneButton.classList.add('btn', 'btn-success');
    doneButton.textContent = 'Готово';
    deleteButton.classList.add('btn', 'btn-danger');
    deleteButton.textContent = 'Удалить';

    if (done == true) {
      item.classList.add('list-group-item-success');
    }

    buttonGroup.append(doneButton);
    buttonGroup.append(deleteButton);
    item.append(buttonGroup);
    //
    let rememberItem = {
      name: name,
      done: done,
    };
    rememberList.push(rememberItem);

    window.jsonRememberList = JSON.stringify(rememberList);
    localStorage.pageKey = [];
    localStorage.setItem(pageKey, jsonRememberList);

    return {
      item,
      doneButton,
      deleteButton,
      jsonRememberList,
    };
  };
  function createTodoApp(pageKey, container, title='Список дел', optionalToDo = []) {
    if (localStorage.length !== 0) {optionalToDo = JSON.parse(localStorage.getItem(pageKey))}

    let todoAppTitle = createAppTitle(title);
    let todoItemForm = createTodoItemForm();
    let todoList = createTodoList();

    if (localStorage.getItem(pageKey)){
      if (optionalToDo !== []) {
        for (thing of optionalToDo) {
          let todoItem = createTodoItem(thing['name'], thing['done']);
          todoItem.doneButton.addEventListener('click', function() {
            todoItem.item.classList.toggle('list-group-item-success');
            for(var i = 0; i < window.rememberList.length ; i++){
              if (rememberList[i].name === todoItem.item.childNodes[0].nodeValue) {
                if (todoItem.item.classList.contains('list-group-item-success')) {
                  rememberList[i].done = true;
                  window.jsonRememberList = JSON.stringify(rememberList);
                  localStorage.pageKey = [];
                  localStorage.setItem(pageKey, jsonRememberList);
                  }
                else {
                  rememberList[i].done = false;
                  window.jsonRememberList = JSON.stringify(rememberList);
                  localStorage.pageKey = [];
                  localStorage.setItem(pageKey, jsonRememberList);
                }
              }};
          });
          todoItem.deleteButton.addEventListener('click', function() {
            if (confirm('Вы уверены?')) {
              todoItem.item.remove();
              for(var i = 0; i < window.rememberList.length ; i++){
                if (rememberList[i].name === todoItem.item.childNodes[0].nodeValue) {
                  rememberList.splice(i, 1);
                  window.jsonRememberList = JSON.stringify(rememberList);
                  localStorage.pageKey = [];
                  localStorage.setItem(pageKey, jsonRememberList);
                };
              };
            };
          });
          todoList.append(todoItem.item);
        };
      };
    }


    todoItemForm.button.disabled = true;
    todoItemForm.input.addEventListener('input', function() {
      if (!todoItemForm.input.value) {
        todoItemForm.button.disabled = true;
      }
      else {
        todoItemForm.button.disabled = false;
      }
    });

    container.append(todoAppTitle);
    container.append(todoItemForm.form);
    container.append(todoList);

    todoItemForm.form.addEventListener('submit', function(e){
      e.preventDefault();
      if (!todoItemForm.input.value) {
        return;
      };

      let todoItem = createTodoItem(todoItemForm.input.value);
      todoItem.doneButton.addEventListener('click', function(){
        todoItem.item.classList.toggle('list-group-item-success');
      });
      todoItem.deleteButton.addEventListener('click', function(){
        if (confirm('Вы уверены?')) {
          todoItem.item.remove();
          for(var i = 0; i < window.rememberList.length ; i++){
            if (rememberList[i].name === todoItem.item.childNodes[0].nodeValue) {
              rememberList.splice(i, 1);
              window.jsonRememberList = JSON.stringify(rememberList);
              localStorage.pageKey = [];
              localStorage.setItem(pageKey, jsonRememberList);
            }
          }

        };
      });
      todoList.append(todoItem.item);
      todoItemForm.input.value = '';
      todoItemForm.button.disabled = true;
    });
  };



  window.createTodoApp = createTodoApp;

})();
