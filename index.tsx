class Student {
  fullName: string
  constructor(public firstName, public middleName, public lastName) {
    this.fullName = firstName + middleName + lastName
  }
}

interface Person {
  firstName: string
  lastName: string
}


class Lesson {
  category: [{
    
  }]
}

export {Lesson, Person, Student}
