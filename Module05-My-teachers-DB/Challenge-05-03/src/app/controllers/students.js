const { date, grade } = require('../../lib/useful')
const Student = require('../models/Student')

module.exports = {
  index(req, res) {
    Student.all((students) => {
      
      students.forEach(student => {
        student.grade_school = grade(student.grade_school)
      })

      return res.render("students/index", { students })
    })
  },
  create(req, res) {
    Student.teacherSelectOptions(options => {
      return res.render("students/create", {teacherOptions: options})
    })
  },
  post(req, res) {
    const keys = Object.keys(req.body)

    for (key of keys) {
      if (req.body[key] == "") return res.send('Please, fill all fields!')
    }
    
    Student.create(req.body, (student) => {
      return res.redirect(`students/${student.id}`)
    })
  },
  show(req, res) {
    Student.find(req.params.id, (student) => {
      if(!student) return res.send('Student not found!')

      student.birthday = date(student.birth).birthday
      student.grade_school = grade(student.grade_school)

      return res.render('students/show', {student})
    })
  },
  edit(req, res) {
    Student.find(req.params.id, (student) => {
      if(!student) return res.send('Student not found!')

      student.birth = date(student.birth).iso

      Student.teacherSelectOptions(options => {
        return res.render("students/edit", {student, teacherOptions: options})
      })
    })
  },
  put(req, res) {
    const keys = Object.keys(req.body)

    for (key of keys) {
        if (req.body[key] == "") return res.send('Please, fill all fields!')
    }

    Student.update(req.body, () => {
      return res.redirect(`students/${req.body.id}`)
    })
  },
  delete(req, res) {
    Student.delete(req.body.id, () => {
      return res.redirect('/students')
    })
  },
}