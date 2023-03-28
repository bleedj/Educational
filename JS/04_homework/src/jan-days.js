// это функция, внутри которой нужно написать ваш код
// firstWeekDay будет задаваться в момент вызова функции, как в примере кода под ней
function januaryDays(firstWeekDay) {
  function whatIsRightWeek(){
    let week = ['понедельник','вторник','среда','четверг','пятница','суббота','воскресенье'] ;
    let firstDay = week.indexOf(day) ;
    let newWeek = [] ;
    let startNew = 0 ;
    for (dayINdex in week) {
        if ((parseInt(dayINdex) + parseInt(firstDay)) < 7){
            newWeek.push(week[parseInt(dayINdex)+parseInt(firstDay)]) ;
        }
        else if ((parseInt(dayINdex) + parseInt(firstDay)) >= 7) {
            newWeek.push(week[startNew]) ;
            startNew++ ;
        }
    }
    return(newWeek) ;
}
function calendar(rightWeek=whatIsRightWeek(), month='января', days='31') {
    let daysList = [] ;
    for (let i=1 ; i <= parseInt(days); i++) {
        daysList.push(i) ;
    }
    let counter = 0 ;
    for (somethingDay in daysList){
        console.log(`${parseInt(somethingDay)+1} ${month}, ${whatIsRightWeek()[counter]}`) ;
        if (counter < 6){
            counter++ ;
        }
        else {
            counter = 0 ;
        }
    }
    return('') ;
}
return(calendar()) ;
}

// выполнение кода внутри функции
januaryDays('понедельник'); // вывести все дни недели января, если 1-я января - понедельник
januaryDays('среда'); // вывести все дни недели января, если 1-я января - среда
januaryDays('воскресенье'); // вывести все дни недели января, если 1-я января - воскресенье
// можете вызывать функцию сколько угодно раз подряд с различными параметрами

// строка ниже необходима, чтобы работало автоматическое тестирование
// не изменяйте этот код!
export default januaryDays;
