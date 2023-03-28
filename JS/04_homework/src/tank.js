// это функция, внутри которой нужно написать ваш код
// roadMines (массив ячеек поля) будет задаваться в момент вызова функции, как в примере кода под ней
function moveTank(roadMines) {
  let position ;
    let gameStop = false ;
    let couter = 0 ;
    function checkMine(){
        let j = roadMines[i] ;
        if (j === true){
            if (couter === 0){
                console.log('Танк поврежден') ;
                couter++ ;
            }
            else {
                console.log('Танк уничтожен') ;
                gameStop = true ;
            }
        }
    }
    for (i in roadMines){
        position = parseInt(i)+1 ;
        console.log(`Танк переместился на позицию ${position}`) ;
        checkMine() ;
        if(gameStop === true){
            return('Танк прекратил движение') ;
        }
    }
  return('Танк прекратил движение') ;
}

// вызов функции
moveTank([false, false, false, false, false, false, false, false, false, false]); // танк проедет по полю без мин
// можете вызывать функцию сколько угодно раз подряд с различными параметрами

// строка ниже необходима, чтобы работало автоматическое тестирование
// не изменяйте этот код!
export default moveTank;
