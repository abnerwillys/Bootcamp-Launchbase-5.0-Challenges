const fs   = require('fs')
const data = require('../data.json')
const {age, date, grade} = require('../useful')

exports.index = (req, res) => {
    data.students.forEach(student => {
        student.grade = grade(student.grade_school)
    })
    return res.render("students/index", { students: data.students })
}

exports.create = (req, res) => {
    return res.render("students/create")
}

exports.post = (req, res) => {
    //Validation process
    const keys = Object.keys(req.body)

    for (key of keys) {
        if (req.body[key] == "") return res.send('Please, fill all fields!')
    }
    
    //Data treatment
    birth = Date.parse(req.body.birth)
    
    let id = 1
    const lastStudent = data.students[data.students.length - 1]

    if (lastStudent) {
        id = lastStudent.id + 1
    }

    data.students.push({
        id,
        ...req.body,
        birth
    })

    //Recording data process
    fs.writeFile("data.json", JSON.stringify(data, null, 2), (err) => {
        if (err) return res.send('Error in writing datas.')
        
        return res.redirect(`/students/${id}`)
    })
}

exports.show = (req, res) => {
    //Take the student
    const {id} = req.params

    const foundStudent = data.students.find((student) => {
        return student.id == id
    })

    if (!foundStudent) return res.send("Student not found!")

    //Data treatment
    const student = {
        ...foundStudent,
        birthday: date(foundStudent.birth).birthday,
        grade: grade(foundStudent.grade_school)
    }

    return res.render('students/show', { student })
}

exports.edit = (req, res) => {
    //Take the student
    const {id} = req.params

    const foundStudent = data.students.find((student) => {
        return student.id == id
    })

    if (!foundStudent) return res.send("Student not found!")

    //Data treatment
    const student = {
        ...foundStudent,
        birth: date(foundStudent.birth).iso
    }

    return res.render('students/edit', { student })
}

exports.put = (req, res) => {
    //Take the student
    const { id } = req.body
    let index = 0

    const foundStudent = data.students.find((student, foundIndex) => {
        if (student.id == id) {
            index = foundIndex
            return true
        }
    })

    if (!foundStudent) return res.send("Student not found!")

    // Data treatment
    const student = {
        ...foundStudent,
        ...req.body,
        birth: Date.parse(req.body.birth),
        id: Number(req.body.id)
    }

    data.students[index] = student

    fs.writeFile('data.json', JSON.stringify(data, null, 2), (err) => {
        if (err) return res.send('Write file error!')

        return res.redirect(`/students/${id}`)
    })
}

exports.delete = (req, res) => {
    const { id } = req.body

    const filteredStudents = data.students.filter((student) => {
        return student.id != id
    })

    data.students = filteredStudents

    fs.writeFile('data.json', JSON.stringify(data, null, 2), (err) => {
        if (err) return res.send('Database error!')

        return res.redirect(`/students`)
    })
}