function passwordCheck(password){
  console.log('Задание 1') ;
  let importantSymbol = ['-', '_'];
  if ((password.length >3) && (password.indexOf(importantSymbol[0]) + password.indexOf(importantSymbol[1]) !== -2 ))  {
      return 'Надежный пароль' ;
  }
  else {
      return 'Пароль недостаточно надёжный' ;
  }
}

function nameTransform(name, surname){
  console.log('Задание 2');
  newName = name.slice(0,1).toUpperCase() + name.slice(1).toLowerCase();
  newSurname = surname.slice(0,1).toUpperCase() + surname.slice(1).toLowerCase();
  let result = (newName !== name) || (newSurname !== surname) ?  'Имя было преобразовано' : 'Имя осталось без измененний';
  console.log(newName, newSurname);
  console.log( result ) ;
  return ''
}
console.log(passwordCheck('password'));
console.log(`\n`)
console.log(nameTransform('ЛеХа', 'ГрОмов')) ;
