export default class Student {
  constructor(name, surname, lastname, faculty, birthDate, studyStart,studyEnd) {
    this.name = name
    this.surname = surname
    this.lastname = lastname
    this.faculty = faculty
    this.birthDate = birthDate
    this.studyStart = studyStart
    this.studyEnd = studyEnd
  }


  getStudyEnd() {
    return this.studyStart + 4
  }

  get fullName() {
    return this.surname + ' ' + this.name + ' ' + this.lastname
  }

  getStudyCourse() {
    let currentTime = new Date();
    return currentTime.getFullYear() - this.studyStart
  }


  getBirthDateString() {
    const year = this.birthDate.getFullYear();
    let month = this.birthDate.getMonth() + 1;
    let day = this.birthDate.getDate();

    if (day < 10) day = '0' + day;
    if (month < 10) month = '0' + month;
    return day + '-' + month + '-' + year;
  }

  getAge() {
    const today = new Date();
    let age = today.getFullYear() - this.birthDate.getFullYear();
    let m = today.getMonth() - this.birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < this.birthDate.getDate())) {
      age--;
    }
    return age;
  }
}
