// это функция, внутри которой нужно написать ваш код
// str (входная строка) будет задаваться в момент вызова функции, как в примере кода под ней
function reverseString(str) {
  rowLen = row.length;
    let newRow = '';
    for (i in row){
        if(i !== rowLen) {
            newRow += row[rowLen-1-i];
        }
        else {
            break;
        }
    }
  return(newRow);
}

// вызов функции
reverseString('abc'); // cba
reverseString('12345'); // 54321
// можете вызывать функцию сколько угодно раз подряд с различными параметрами

// строка ниже необходима, чтобы работало автоматическое тестирование
// не изменяйте этот код!
export default reverseString;
