(() => {

  createApp()

  function createApp() {
    const div = document.createElement('div');
    div.classList.add('container');
    div.id = '#1'

    const form = document.createElement('form');
    form.classList.add('mainForm');

    const inputCardCount = document.createElement('input');
    inputCardCount.classList.add('mainForm__input')

    inputCardCount.type = 'number';
    inputCardCount.max = 10;
    inputCardCount.min = 2;
    inputCardCount.placeholder = 'Размер поля Х на Х  (четные)'


    const buttonWrapper = document.createElement('div');
    buttonWrapper.classList.add('mainForm__button-wrapper');
    buttonWrapper.classList.add('button-wrapper');

    const buttonStartGame = document.createElement('button');
    buttonStartGame.classList.add('button-wrapper__button');

    buttonStartGame.textContent = 'Сыграем!';
    buttonStartGame.type = 'button'


    const timer = document.createElement('input')
    timer.classList.add('mainForm__timer')

    timer.type = 'number'
    timer.min = 5;
    timer.placeholder = 'Таймер';

    buttonWrapper.append(buttonStartGame);

    form.append(inputCardCount);
    form.append(timer)
    form.append(buttonWrapper);


    div.append(form);

    document.body.append(div);

    buttonStartGame.addEventListener('click', function(){
      document.body.classList.add('wtf')
      if (timer.value != false) {
        let timeVal = parseInt(timer.value)
        const divTimer = document.createElement('div')
        const pTimer = document.createElement('p')
        divTimer.classList.add('divTimer')
        pTimer.classList.add('divTimer__pTimer')
        divTimer.append(pTimer)
        document.body.append(divTimer)

        function timeCome() {
          pTimer.textContent = timeVal - 1;
          timeVal--;
          if (timeVal === 0) {
            divTimer.classList.add('bye')
            alert('Вышло времечко :(')
            location.href=location.href
          } else if (timeVal < 0.5* parseInt(timer.value)) {
            divTimer.classList.add('dangerTimer');
          };
        };
        intoftimer = setInterval(timeCome, 1000)
      };
      form.classList.add('bye')
      let NUMBER_OF_CARDS;
      if (inputCardCount.value % 2 == 1) {
        inputCardCount.value -= 1
        if (inputCardCount.value < 2) {inputCardCount.value=2} else if (inputCardCount.value>10){inputCardCount.value = 10};
        const IsConfirm = confirm(`Так как Вы ввели нечетное число, игра началась с полем ${inputCardCount.value} на ${inputCardCount.value} \nЕсли Вам не нравится, начните заного \n(придется перезагрузить страницу)\n\n\n\nПерезагрузить?`)
        if (IsConfirm) {location.href=location.href}
      };
      if (inputCardCount.value == false || inputCardCount.value <= 2) {
        NUMBER_OF_CARDS = 2
        inputCardCount.value = NUMBER_OF_CARDS
      } else if (inputCardCount.value >= 10) {
        NUMBER_OF_CARDS = 10
        inputCardCount.value = NUMBER_OF_CARDS
      }
      else {
        NUMBER_OF_CARDS = inputCardCount.value
      };
      let cardWrapper = document.createElement('div')
      cardWrapper.classList.add('card-wrapper')
      let cardList = [];
      let card;
      let counter = 0;
      buttonStartGame.disabled = true;
      for (let column = 0; column < NUMBER_OF_CARDS; column++) {
        for (let row = 0; row < NUMBER_OF_CARDS; row++, counter++) {
          if (counter == NUMBER_OF_CARDS) { counter = 0};
          card = document.createElement('div');
          card.classList.add('card-wrapper__card');
          if (NUMBER_OF_CARDS >=6){
            card.classList.add('card-wrapper__card_6');
          }
          if (NUMBER_OF_CARDS >=8) {
            card.classList.add('card-wrapper__card_8');
          };

          card.secret = counter;
          cardList.push(card);
        };
      };
      function shuffle(array) {
        array.sort(() => Math.random() - 0.5);
      }
      shuffle(cardList);
      let pseudo = 0;
      for (let index = 0; index < cardList.length; index++) {
        cardWrapper.append(cardList[index]);
        pseudo++
        if (pseudo == NUMBER_OF_CARDS) {
          div.append(cardWrapper);
          cardWrapper = document.createElement('div');
          cardWrapper.classList.add('card-wrapper');
          pseudo = 0;
        }
      };
      const cards = document.querySelectorAll('.card-wrapper__card')
      let toggleCounter = 0;
      let equvalCards;
      let equvalList = [];
      for (clickCard of cards) {
        clickCard.onclick = function () {
          this.textContent = this.secret;
          this.classList.toggle('transform-card');
          this.classList.add('preDoneCard')
          document.addEventListener('click', function(){
            const divWin = document.createElement('div')
            divWin.classList.add('win')
            const spanWin = document.createElement('span')
            spanWin.textContent = 'Победа!'
            spanWin.classList.add('win__span')
            const btnWin = document.createElement('button')
            btnWin.type = 'button'
            btnWin.textContent = 'Вернуться в главное меню'
            btnWin.classList.add('win__button')
            btnWin.addEventListener('click', function(){
              location.href=location.href
            })
            if (document.querySelectorAll('.doneCard').length == NUMBER_OF_CARDS**2) {
              for (elem of (document.querySelectorAll('.doneCard'))) {
                elem.classList.add('bye')

              }
              document.querySelector('.card-wrapper').remove();
              if (timer.value != false) {clearInterval(intoftimer)
              document.querySelector('.divTimer').classList.add('bye')};
              divWin.append(spanWin);
              divWin.append(btnWin);
              div.append(divWin);
            };

          })
          equvalList.push(this);
          toggleCounter++;
          if (toggleCounter == 2) {
            equvalCards = document.querySelectorAll('.transform-card')
            for (preDone of equvalCards) {
              preDone.classList.remove('preDoneCard')
            }
            if (equvalList[0].secret == equvalList[1].secret) {
              equvalList[0].classList.add('doneCard');
              equvalList[1].classList.add('doneCard');
              equvalList[0].classList.remove('transform-card');
              equvalList[1].classList.remove('transform-card');
              toggleCounter = 0
              equvalList = [];
            } else {
              equvalList[0].classList.add('turnBackCard')
              equvalList[1].classList.add('turnBackCard')
              function turnBackCard(){
                equvalList[0].classList.remove('transform-card');
                equvalList[1].classList.remove('transform-card');
                equvalList[0].textContent = []
                equvalList[1].textContent = []
                toggleCounter = 0
                equvalList[0].classList.remove('turnBackCard')
                equvalList[1].classList.remove('turnBackCard')
                equvalList = [];
              };
              setTimeout(turnBackCard, 750)
            };
          } else if (toggleCounter == 3) {
            equvalCards = document.querySelectorAll('.transform-card')
            toggleCounter = 0
            for (preDone of document.querySelectorAll('.preDoneCard')) {
              preDone.classList.remove('preDoneCard')
            }
            for (noEqual of equvalCards) {
              noEqual.classList.remove('transform-card')
              noEqual.classList.remove('turnBackCard')
            }
          equvalList[0].textContent = ''
          equvalList[1].textContent = ''
          equvalList[2].textContent = ''
          equvalList = [];
          }
        };
      };
    });

    return {
      form,
      div,
      inputCardCount,
      buttonStartGame,
      timer,
    }
  }
})();
