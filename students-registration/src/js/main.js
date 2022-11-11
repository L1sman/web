import Student from './form.js'

(() => {
  const studentsList = document.getElementById('studentsList'),
    allBtn = document.querySelectorAll('.table__head button'),
    filterInputs = document.querySelectorAll('.input__filter'),
    addInputs = document.querySelectorAll('.add__form .input'),
    birthDateV = document.getElementById('birthDate'),
    studyStartV = document.getElementById('studyStart'),
    nameV = document.getElementById('name'),
    surenameV = document.getElementById('surename'),
    lastnameV = document.getElementById('lastname'),
    facultyV = document.getElementById('faculty')



  let column = 'fullName',
    columnDIr = true


  const students = [
    new Student('Ислам', 'Сабиров', 'Ленарович', 'Информационная безопасность', new Date('2002, 3, 27'), 2020, 2024),
    new Student('Эрих', 'Мария', 'Ремарк', 'Иностранная литература', new Date('1989, 3, 27'), 2016, 2020),
    new Student('Ландыш', 'Кашапова', 'Эльмаровна', 'Журналисика', new Date('2003, 1, 17'), 2020, 2024),
    new Student('Эвелина', 'Демидова', 'Федотовна', 'Логопедия', new Date('2002, 11, 1'), 2021, 2025)
  ];

  function newStudent(student) {
    const studentCell = document.createElement('tr'),
      fioT = document.createElement('td'),
      facultyT = document.createElement('td'),
      birthDateT = document.createElement('td'),
      studyCourseT = document.createElement('td');

    fioT.textContent = student.fullName;
    birthDateT.textContent = student.getBirthDateString() + ' (' + student.getAge() + 'years)';
    facultyT.textContent = student.faculty;
    studyCourseT.textContent = student.studyStart + '-' + student.getStudyEnd() + '' + ' (' + student.getStudyCourse() + 'курс)';

    const today = new Date()
    const datetest = new Date(student.getStudyEnd(),8,1)
    if (today > datetest) {
      studyCourseT.textContent = student.studyStart + '-' + student.getStudyEnd() + ' ' + ' (Закончил)';
    }

    studentCell.append(fioT)
    studentCell.append(facultyT)
    studentCell.append(birthDateT)
    studentCell.append(studyCourseT)

    return studentCell
  }

  function filterStudents(students, prop, value) {
    let filteredArr = [],
      studentsCopy = [...students]

    for (const item of studentsCopy) {
      if (String(item[prop]).trim().toLowerCase().includes(value) === true) filteredArr.push(item)
    }
    return filteredArr
  }


  function sortStudents(prop, dir) {
    let studentsCopy = [...students]
    return studentsCopy.sort(function (studentA, studentB) {
      if ((!dir === false ? studentA[prop] < studentB[prop] : studentA[prop] > studentB[prop]))
        return -1;
    })
  }


  function fillTable() {
    let studentsCopy = [...students]

    const fioFilter = String (document.getElementById('fio_filter').value).trim().toLowerCase(),
      facultyFilter = String (document.getElementById('faculty_filter').value).trim().toLowerCase(),
      studyStartFilter = document.getElementById('studyStart__filter').value,
      studyEndFilter = document.getElementById('studyEnd_filter').value

    studentsCopy = sortStudents(column, columnDIr)


    if (fioFilter !== '') {
      studentsCopy = filterStudents(studentsCopy, 'fullName', fioFilter)
    }

    if (facultyFilter !== '') {
      studentsCopy = filterStudents(studentsCopy, 'faculty', facultyFilter)
    }

    if (studyStartFilter !== '') {
      studentsCopy = filterStudents(studentsCopy, 'studyStart', studyStartFilter)
    }

    if (studyEndFilter !== '') {
      studentsCopy = filterStudents(studentsCopy, 'studyEnd', studyEndFilter)
    }

    studentsList.innerHTML = '';

    for (const student of studentsCopy) {
      studentsList.append(newStudent(student))
    }
  }

  filterInputs.forEach(function (input) {
    input.addEventListener('keyup', function (e) {
      fillTable()
    })
  })


  allBtn.forEach(function (btn) {
    btn.addEventListener('click', function (e) {
      column = this.dataset.column;
      columnDIr = !columnDIr
      fillTable()
    })
  })

  function setErrorFor(input, message) {

    const inputCover = input.parentElement;
    const  small = inputCover.querySelector('small')

    small.innerText = message;
    inputCover.className = 'input__cover error'
  }


  function setSuccessFor(input) {
    const inputCover = input.parentElement
    inputCover.className = 'input__cover success'
  }


  document.getElementById('form').addEventListener('submit', function (e) {
    e.preventDefault();
    let validsteps = 0

      const nameValue = nameV.value.trim()
      const surenameValue = surenameV.value.trim()
      const lastnameValue = lastnameV.value.trim()
      const birthdateValue = new Date(birthDateV.value)
      const facultyValue = facultyV.value.trim()
      const studystartValue = studyStartV.value.trim()
      const today = new Date();
      const exactYear = today.getFullYear();
      const minbirthdate = new Date('1900-1-2')


      if(nameValue === '') {
        setErrorFor(nameV, 'Укажите имя')
      } else {
        setSuccessFor(nameV)
        validsteps++
      }

      if(surenameValue === '') {
        setErrorFor(surenameV, 'Укажите фамилию')
      } else {
        setSuccessFor(surenameV)
        validsteps++
      }

      if(lastnameValue === '') {
        setErrorFor(lastnameV, 'Укажите отчество')
      } else {
        setSuccessFor(lastnameV)
        validsteps++
      }

      if(facultyValue === '') {
        setErrorFor(facultyV, 'Укажите факультет')
      } else {
        setSuccessFor(facultyV)
        validsteps++
      }

      if(birthDateV.value.trim() === '') {
        setErrorFor(birthDateV, 'Укажите дату')
      } else if (birthdateValue < minbirthdate || birthdateValue > today) {
        setErrorFor(birthDateV, 'Дата не подходит, укажите другую')
      }
       else {
        setSuccessFor(birthDateV)
        validsteps++
      }

      if(studyStartV.value.trim() === '') {
        setErrorFor(studyStartV, 'Укажите дату')
      } else if (studystartValue < 2000|| studystartValue > exactYear) {
        setErrorFor(studyStartV, 'Дата не подходит, укажите другую')
      }
       else {
        setSuccessFor(studyStartV)
        validsteps++
      }


    let studyEnd

    if (validsteps < 6 ) {
      return false
    } else {
      students.push(new Student(
        document.getElementById('name').value,
        document.getElementById('surename').value,
        document.getElementById('lastname').value,
        document.getElementById('faculty').value,
        new Date(document.getElementById('birthDate').value),
        Number(document.getElementById('studyStart').value),
        Number(studyEnd = Number(document.getElementById('studyStart').value) + 4),
      ))
      e.target.reset();
    }
    fillTable()
  })

  fillTable();
})();
