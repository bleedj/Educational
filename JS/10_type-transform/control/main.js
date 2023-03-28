(() => {
  createApp();
  function createApp(){
    const div_Contain = document.createElement('div');
    div_Contain.classList.add('container');
    document.body.append(div_Contain);
    const StudList = []




    createForm();
    createSpreadsheet();
    createFilter();




    function Student(firstname, lastname, patronymic, birthDate, startYear, faculty){
      this.firstname = firstname;
      this.lastname = lastname;
      this.patronymic = patronymic;
      date = new Date(birthDate);
      this.OBJECT_DATE = date;
      if ( (date.getDate()).toString().length == 2) {
        this.birthDate =  + date.getDate() + '.' + parseInt(date.getMonth()+1) + '.' + date.getFullYear();
      } else {
        this.birthDate =  '0' + date.getDate() + '.' + parseInt(date.getMonth()+1) + '.' + date.getFullYear();
      }

      this.startYear = startYear;
      this.faculty = faculty;
    };
    function createForm(){
      const h1_FormTitle = document.createElement('h1');
      h1_FormTitle.textContent = 'Данные о студенте'
      h1_FormTitle.classList.add('title')
      const form_AddStudent = document.createElement('form');
      form_AddStudent.classList.add('mainForm');
      const button_AddStudent = document.createElement('button');
      button_AddStudent.classList.add('mainButton')
      button_AddStudent.textContent = 'Добавить студента'
      const input_AddStudentName = document.createElement('input');
      input_AddStudentName.placeholder = 'ФИО'
      const DescrName = document.createElement('span');
      DescrName.textContent = 'Введите ФИО';
      const input_AddStudentBirthDate = document.createElement('input');
      input_AddStudentBirthDate.type = 'date';
      input_AddStudentBirthDate.placeholder = 'Дата рождения'
      const DescrBirth = document.createElement('span');
      DescrBirth.textContent = 'Введите дату рождения';
      const input_AddStudentStartYear = document.createElement('input');
      input_AddStudentStartYear.type = 'number';
      input_AddStudentStartYear.min = 2000
      const DateToday = new Date();
      input_AddStudentStartYear.max = DateToday.getFullYear();
      input_AddStudentStartYear.placeholder = 'Год поступления (2000  -  . . . )'
      const DescrStart = document.createElement('span');
      DescrStart.textContent = 'Введите год начала обучения'
      const input_AddStudentFaculty = document.createElement('input');
      input_AddStudentFaculty.placeholder = 'Факультет'
      const date1 = new Date('January 1, 1900');

      button_AddStudent.addEventListener('click', function(){
        event.preventDefault();
        const date2 = new Date(input_AddStudentBirthDate.value)
        let warning = [];
        transormname = transformStudentName(input_AddStudentName.value)
        if (transormname[0] == false || transormname[1] == false ||  transormname[2] == false || transformname.length !== 3)  { warning.push('ФИО заполненно некорректно')};
        if (input_AddStudentBirthDate.value == false) {warning.push('\nВведите дату рождения студента')}  else if (date2 < date1) {warning.push('Дата рождения должна находиться в диапазоне от 01.01.1900 до текущей даты')};
        if (input_AddStudentFaculty.value == false) {warning.push('\nВведите факультет студента')};
        if (input_AddStudentStartYear.value == false) {warning.push('\nВведите год начала обучения студента')} else if (input_AddStudentStartYear.value > DateToday.getFullYear() || input_AddStudentStartYear.value < 2000 ) { warning.push('\nГод начала обучения должен находиться в диапазоне от 2000-го до текущего года')};

        if (warning.length != 0) {
          alert(warning);
          return false;
        } else {


        let student = new Student(
          transormname[1],
          transormname[0],
          transormname[2],
          input_AddStudentBirthDate.value,
          input_AddStudentStartYear.value,
          input_AddStudentFaculty.value,
        );
        StudList.push(student);

        ul_student = document.createElement('ul');
        ul_student.classList.add('ul_student');
        li_student_1_column = document.createElement('li');
        li_student_1_column.classList.add('li_student');
        li_student_2_column = document.createElement('li');
        li_student_2_column.classList.add('li_student');
        li_student_3_column = document.createElement('li');
        li_student_3_column.classList.add('li_student');
        li_student_4_column = document.createElement('li');
        li_student_4_column.classList.add('li_student');

        li_student_1_column.textContent = student['lastname'] + ' ' + student['firstname'] + ' ' + student['patronymic'];
        li_student_2_column.textContent = student['birthDate'] + ` (${parseInt((DateToday.getFullYear()-date2.getFullYear()))} лет)`;
        if ((parseInt(parseInt(student['startYear']) + 4) === parseInt(DateToday.getFullYear()) && DateToday.getMonth() >= 9) || parseInt(parseInt(student['startYear']) + 4) < parseInt(DateToday.getFullYear()) ) {column_3_message = '(закончил)'} else {
          column_3_message = `(${parseInt(DateToday.getFullYear() - student['startYear'])} курс)`
        }

        li_student_3_column.textContent = student['startYear'] + ` - ${parseInt(parseInt(student['startYear']) + 4)} ${column_3_message}`;
        li_student_4_column.textContent = student['faculty'];

        ul_student.append(
          li_student_1_column,
          li_student_2_column,
          li_student_3_column,
          li_student_4_column,
        );

        document.getElementById('#1').append(ul_student)
        };

        input_AddStudentBirthDate.value = '';
        input_AddStudentFaculty.value = '';
        input_AddStudentName.value = '';
        input_AddStudentStartYear.value = '';
      });


      form_AddStudent.append(
        input_AddStudentName, DescrName,
        input_AddStudentBirthDate, DescrBirth,
        input_AddStudentStartYear, DescrStart,
        input_AddStudentFaculty,
        button_AddStudent
      );

      div_Contain.append(
        h1_FormTitle,
        form_AddStudent
        );



      return {
        form_AddStudent,
      };
    };
    function createSpreadsheet(){
      const div_SpreadSheet = document.createElement('div')
      div_SpreadSheet.classList.add('SpreadSheet')
      div_SpreadSheet.id = '#1';
      const titlesRow = document.createElement('ul');
      titlesRow.classList.add('titlesRow')
      const titlesRow__StudentFirstName = document.createElement('li');
      titlesRow__StudentFirstName.textContent = 'ФИО'
      titlesRow__StudentFirstName.addEventListener('click', sortstudentbyname)
      const titlesRow__StudentBirthDate = document.createElement('li');
      titlesRow__StudentBirthDate.textContent = 'Дата рождения'
      titlesRow__StudentBirthDate.addEventListener('click', sortstudentbybirth)
      const titlesRow__StudentStartYear = document.createElement('li');
      titlesRow__StudentStartYear.textContent = 'Годы обучения и номер курса'
      titlesRow__StudentStartYear.addEventListener('click', sortstudentbystart)
      const titlesRow__StudentFaculty = document.createElement('li');
      titlesRow__StudentFaculty.textContent = 'Факультет';
      titlesRow__StudentFaculty.addEventListener('click', sortstudentbyfaculty)

      titlesRow.append(
        titlesRow__StudentFirstName,
        titlesRow__StudentBirthDate,
        titlesRow__StudentStartYear,
        titlesRow__StudentFaculty,
      );
      div_SpreadSheet.append(titlesRow)
      div_Contain.append(div_SpreadSheet)


      function sortstudentbyname() {
        DateToday = new Date();
        date1 = new Date('January 1, 1900');

        let sstudent = StudList.sort((a, b) => a['lastname'].toLowerCase()+a['firstname'].toLowerCase()+a['patronymic'].toLowerCase > b['lastname'].toLowerCase()+b['firstname'].toLowerCase()+b['patronymic'].toLowerCase ? 1 : -1);
        removeList = []
        for (rstudent of document.getElementsByClassName('ul_student')) {
          removeList.push(rstudent)
        };
        for (remove of removeList) {
          remove.remove()
        }
        for (let astudent of sstudent) {
          date2 = new Date(astudent['OBJECT_DATE'])
          ul_student = document.createElement('ul');
          ul_student.classList.add('ul_student');
          li_student_1_column = document.createElement('li');
          li_student_1_column.classList.add('li_student');
          li_student_2_column = document.createElement('li');
          li_student_2_column.classList.add('li_student');
          li_student_3_column = document.createElement('li');
          li_student_3_column.classList.add('li_student');
          li_student_4_column = document.createElement('li');
          li_student_4_column.classList.add('li_student');
          if (astudent['?removeName'] == true) {ul_student.classList.add('removeName')};
          if (astudent['?removeFaculty'] == true) {ul_student.classList.add('removeFaculty')};
          if (astudent['?removeStart'] == true) {ul_student.classList.add('removeStart')};
          if (astudent['?removeEnd'] == true) {ul_student.classList.add('removeEnd')};
          li_student_1_column.textContent = astudent['lastname'] + ' ' + astudent['firstname'] + ' ' + astudent['patronymic'];
          li_student_2_column.textContent = astudent['birthDate'] + ` (${parseInt((DateToday.getFullYear()-date2.getFullYear()))} лет)`;
          if ((parseInt(parseInt(astudent['startYear']) + 4) === parseInt(DateToday.getFullYear()) && DateToday.getMonth() >= 9) || parseInt(parseInt(astudent['startYear']) + 4) < parseInt(DateToday.getFullYear()) ) {column_3_message = '(закончил)'} else {
            column_3_message = `(${parseInt(DateToday.getFullYear() - astudent['startYear'])} курс)`
          }

          li_student_3_column.textContent = astudent['startYear'] + ` - ${parseInt(parseInt(astudent['startYear']) + 4)} ${column_3_message}`;
          li_student_4_column.textContent = astudent['faculty'];
          ul_student.append(
            li_student_1_column,
            li_student_2_column,
            li_student_3_column,
            li_student_4_column,
          );

          document.getElementById('#1').append(ul_student)
        };
      };
      function sortstudentbyfaculty() {
        DateToday = new Date();
        date1 = new Date('January 1, 1900');

        let sstudent = StudList.sort((a, b) => a['faculty'] > b['faculty'] ? 1 : -1);
        removeList = []
        for (rstudent of document.getElementsByClassName('ul_student')) {
          removeList.push(rstudent)
        };
        for (remove of removeList) {
          remove.remove()
        }
        for (let astudent of sstudent) {
          date2 = new Date(astudent['OBJECT_DATE'])
          ul_student = document.createElement('ul');
          ul_student.classList.add('ul_student');
          li_student_1_column = document.createElement('li');
          li_student_1_column.classList.add('li_student');
          li_student_2_column = document.createElement('li');
          li_student_2_column.classList.add('li_student');
          li_student_3_column = document.createElement('li');
          li_student_3_column.classList.add('li_student');
          li_student_4_column = document.createElement('li');
          li_student_4_column.classList.add('li_student');
          if (astudent['?removeName'] == true) {ul_student.classList.add('removeName')};
          if (astudent['?removeFaculty'] == true) {ul_student.classList.add('removeFaculty')};
          if (astudent['?removeStart'] == true) {ul_student.classList.add('removeStart')};
          if (astudent['?removeEnd'] == true) {ul_student.classList.add('removeEnd')};
          li_student_1_column.textContent = astudent['lastname'] + ' ' + astudent['firstname'] + ' ' + astudent['patronymic'];
          li_student_2_column.textContent = astudent['birthDate'] + ` (${parseInt((DateToday.getFullYear()-date2.getFullYear()))} лет)`;
          if ((parseInt(parseInt(astudent['startYear']) + 4) === parseInt(DateToday.getFullYear()) && DateToday.getMonth() >= 9) || parseInt(parseInt(astudent['startYear']) + 4) < parseInt(DateToday.getFullYear()) ) {column_3_message = '(закончил)'} else {
            column_3_message = `(${parseInt(DateToday.getFullYear() - astudent['startYear'])} курс)`
          }

          li_student_3_column.textContent = astudent['startYear'] + ` - ${parseInt(parseInt(astudent['startYear']) + 4)} ${column_3_message}`;
          li_student_4_column.textContent = astudent['faculty'];
          ul_student.append(
            li_student_1_column,
            li_student_2_column,
            li_student_3_column,
            li_student_4_column,
          );

          document.getElementById('#1').append(ul_student)
        };
      };
      function sortstudentbybirth() {
        DateToday = new Date();
        date1 = new Date('January 1, 1900');


        function birthDateToInt(birthdate) {
          target = parseInt(DateToday.getFullYear() - birthdate.getFullYear())*365 + parseInt(DateToday.getMonth() - birthdate.getMonth())*12 + parseInt(DateToday.getDate() - birthdate.getDate())
          console.log(target)
          return target;
        }

        let sstudent = StudList.sort((a, b) => birthDateToInt(a['OBJECT_DATE']) > birthDateToInt(b['OBJECT_DATE']) ? 1 : -1);
        removeList = []
        for (rstudent of document.getElementsByClassName('ul_student')) {
          removeList.push(rstudent)
        };
        for (remove of removeList) {
          remove.remove()
        }
        for (let astudent of sstudent) {
          date2 = new Date(astudent['OBJECT_DATE'])
          ul_student = document.createElement('ul');
          ul_student.classList.add('ul_student');
          li_student_1_column = document.createElement('li');
          li_student_1_column.classList.add('li_student');
          li_student_2_column = document.createElement('li');
          li_student_2_column.classList.add('li_student');
          li_student_3_column = document.createElement('li');
          li_student_3_column.classList.add('li_student');
          li_student_4_column = document.createElement('li');
          li_student_4_column.classList.add('li_student');
          if (astudent['?removeName'] == true) {ul_student.classList.add('removeName')};
          if (astudent['?removeFaculty'] == true) {ul_student.classList.add('removeFaculty')};
          if (astudent['?removeStart'] == true) {ul_student.classList.add('removeStart')};
          if (astudent['?removeEnd'] == true) {ul_student.classList.add('removeEnd')};
          li_student_1_column.textContent = astudent['lastname'] + ' ' + astudent['firstname'] + ' ' + astudent['patronymic'];
          li_student_2_column.textContent = astudent['birthDate'] + ` (${parseInt((DateToday.getFullYear()-date2.getFullYear()))} лет)`;
          if ((parseInt(parseInt(astudent['startYear']) + 4) === parseInt(DateToday.getFullYear()) && DateToday.getMonth() >= 9) || parseInt(parseInt(astudent['startYear']) + 4) < parseInt(DateToday.getFullYear()) ) {column_3_message = '(закончил)'} else {
            column_3_message = `(${parseInt(DateToday.getFullYear() - astudent['startYear'])} курс)`
          }

          li_student_3_column.textContent = astudent['startYear'] + ` - ${parseInt(parseInt(astudent['startYear']) + 4)} ${column_3_message}`;
          li_student_4_column.textContent = astudent['faculty'];
          ul_student.append(
            li_student_1_column,
            li_student_2_column,
            li_student_3_column,
            li_student_4_column,
          );

          document.getElementById('#1').append(ul_student)
        };
      };
      function sortstudentbystart() {
        DateToday = new Date();
        date1 = new Date('January 1, 1900');
        console.log(StudList)

        let sstudent = StudList.sort((a, b) => a['startYear'] > b['startYear'] ? 1 : -1);
        removeList = []
        for (rstudent of document.getElementsByClassName('ul_student')) {
          removeList.push(rstudent)
        };
        for (remove of removeList) {
          remove.remove()
        }
        for (let astudent of sstudent) {
          date2 = new Date(astudent['OBJECT_DATE'])
          ul_student = document.createElement('ul');
          ul_student.classList.add('ul_student');
          li_student_1_column = document.createElement('li');
          li_student_1_column.classList.add('li_student');
          li_student_2_column = document.createElement('li');
          li_student_2_column.classList.add('li_student');
          li_student_3_column = document.createElement('li');
          li_student_3_column.classList.add('li_student');
          li_student_4_column = document.createElement('li');
          li_student_4_column.classList.add('li_student');
          if (astudent['?removeName'] == true) {ul_student.classList.add('removeName')};
          if (astudent['?removeFaculty'] == true) {ul_student.classList.add('removeFaculty')};
          if (astudent['?removeStart'] == true) {ul_student.classList.add('removeStart')};
          if (astudent['?removeEnd'] == true) {ul_student.classList.add('removeEnd')};
          li_student_1_column.textContent = astudent['lastname'] + ' ' + astudent['firstname'] + ' ' + astudent['patronymic'];
          li_student_2_column.textContent = astudent['birthDate'] + ` (${parseInt((DateToday.getFullYear()-date2.getFullYear()))} лет)`;
          if ((parseInt(parseInt(astudent['startYear']) + 4) === parseInt(DateToday.getFullYear()) && DateToday.getMonth() >= 9) || parseInt(parseInt(astudent['startYear']) + 4) < parseInt(DateToday.getFullYear()) ) {column_3_message = '(закончил)'} else {
            column_3_message = `(${parseInt(DateToday.getFullYear() - astudent['startYear'])} курс)`
          }

          li_student_3_column.textContent = astudent['startYear'] + ` - ${parseInt(parseInt(astudent['startYear']) + 4)} ${column_3_message}`;
          li_student_4_column.textContent = astudent['faculty'];
          ul_student.append(
            li_student_1_column,
            li_student_2_column,
            li_student_3_column,
            li_student_4_column,
          );

          document.getElementById('#1').append(ul_student)
        };
      };
      return {
        div_SpreadSheet,
        titlesRow,
      };
    };
    function transformStudentName(fullname){
      transformname = fullname.replace(/\s+/g, ' ').trim();
      transformname = transformname.split(' ')
      return (transformname)
    };
    function createFilter() {
      const divFilter = document.createElement('div')
      divFilter.classList.add('divFilter')
      const inputFilterName = document.createElement('input')
      inputFilterName.placeholder = 'Фильтрация по имени'
      const inputFilterFaculty = document.createElement('input')
      inputFilterFaculty.placeholder = 'Фильтрация по факультету'
      const inputFilterEnd = document.createElement('input')
      inputFilterEnd.placeholder = 'Фильтрация по году окончания обучения'
      inputFilterEnd.type = 'number'
      const inputFilterStart = document.createElement('input')
      inputFilterStart.placeholder = 'Фильтрация по году начала обучения'
      inputFilterStart.type = 'number'

      divFilter.append(
        inputFilterName,
        inputFilterFaculty,
        inputFilterStart,
        inputFilterEnd,
      );
      document.body.append(divFilter);

      inputFilterName.addEventListener('input', function(){
        if (inputFilterName.value != '') {
          for (student of StudList) {
            if ((student['lastname'].toLowerCase() + ' ' + student['firstname'].toLowerCase() + ' ' + student['patronymic'].toLowerCase()).indexOf(inputFilterName.value.toLowerCase()) == -1) {
              for (ulstudent of document.getElementsByClassName('ul_student')) {
                if (ulstudent.childNodes[0].innerText.toLowerCase().indexOf(inputFilterName.value.toLowerCase()) == -1) {
                  ulstudent.classList.add('removeName');
                  student['?removeName'] = true;
                }
              }
            } else {
              for (ulstudent of document.getElementsByClassName('ul_student')) {
                if (ulstudent.childNodes[0].innerText.toLowerCase().indexOf(inputFilterName.value.toLowerCase()) != -1) {
                  ulstudent.classList.remove('removeName');
                  student['?removeName'] = false;
                };
              };
            };
          };
        } else {
          for (student of StudList) {
            student['?removeName'] = false
            for (ulstudent of document.getElementsByClassName('ul_student')) {
              ulstudent.classList.remove('removeName')
            }
          }
        }
      });
      inputFilterFaculty.addEventListener('input', function(){
        if (inputFilterFaculty.value != '') {
          for (student of StudList) {
            if ((student['faculty'].toLowerCase()).indexOf(inputFilterFaculty.value.toLowerCase()) == -1) {
              for (ulstudent of document.getElementsByClassName('ul_student')) {
                if (ulstudent.childNodes[3].innerText.toLowerCase().indexOf(inputFilterFaculty.value.toLowerCase()) == -1) {
                  ulstudent.classList.add('removeFaculty');
                  student['?removeFaculty'] = true;
                }
              }
            } else {
              for (ulstudent of document.getElementsByClassName('ul_student')) {
                if (ulstudent.childNodes[3].innerText.toLowerCase().indexOf(inputFilterFaculty.value.toLowerCase()) != -1) {
                  ulstudent.classList.remove('removeFaculty');
                  student['?removeFaculty'] = false;
                };
              };
            };
          };
        } else {
          for (student of StudList) {
            student['?removeFaculty'] = false
            for (ulstudent of document.getElementsByClassName('ul_student')) {
              ulstudent.classList.remove('removeFaculty')
            }
          }
        }
      });
      inputFilterEnd.addEventListener('input', function(){
        if (inputFilterEnd.value != '') {
          for (student of StudList) {
            if ((student['startYear']) !== (parseInt(inputFilterEnd.value - 4)).toString()) {
              for (ulstudent of document.getElementsByClassName('ul_student')) {
                if (ulstudent.childNodes[2].innerText.slice(0,4) !== (parseInt(inputFilterEnd.value - 4)).toString()) {
                  ulstudent.classList.add('removeEnd');
                  student['?removeEnd'] = true;
                }
              }
            } else {
              for (ulstudent of document.getElementsByClassName('ul_student')) {
                if (ulstudent.childNodes[2].innerText.slice(0,4) === (parseInt(inputFilterEnd.value - 4)).toString()) {
                  ulstudent.classList.remove('removeEnd');
                  student['?removeEnd'] = false;
                };
              };
            };
          };
        } else {
          for (student of StudList) {
            student['?removeEnd'] = false
            for (ulstudent of document.getElementsByClassName('ul_student')) {
              ulstudent.classList.remove('removeEnd')
            }
          }
        }
      });
      inputFilterStart.addEventListener('input', function(){
        if (inputFilterStart.value != '') {
          for (student of StudList) {
            if ((student['startYear']) !== (inputFilterStart.value.toString())) {
              for (ulstudent of document.getElementsByClassName('ul_student')) {
                if (ulstudent.childNodes[2].innerText.slice(0,4) !== (inputFilterStart.value)) {
                  ulstudent.classList.add('removeStart');
                  student['?removeStart'] = true;
                }
              }
            } else {
              for (ulstudent of document.getElementsByClassName('ul_student')) {
                if (ulstudent.childNodes[2].innerText.slice(0,4) === (inputFilterStart.value)) {
                  ulstudent.classList.remove('removeStart');
                  student['?removeStart'] = false;
                };
              };
            };
          };
        } else {
          for (student of StudList) {
            student['?removeStart'] = false
            for (ulstudent of document.getElementsByClassName('ul_student')) {
              ulstudent.classList.remove('removeStart')
            }
          }
        }
      });
    };
  };
})();
