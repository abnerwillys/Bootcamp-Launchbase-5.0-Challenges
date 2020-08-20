const fs   = require('fs')
const data = require('../data.json')
const Intl = require('intl')
const {age, graduation, date, transformExpertise} = require('../useful')

exports.index = (req, res) => {
    data.teachers.forEach(teacher => {
        teacher.expertise = transformExpertise(teacher)
    })
    return res.render("teachers/index", { teachers: data.teachers })
}

exports.create = (req, res) => {
    return res.render("teachers/create")
}

exports.post = (req, res) => {
    //Validation process
    const keys = Object.keys(req.body)

    for (key of keys) {
        if (req.body[key] == "") return res.send('Please, fill all fields!')
    }
    
    //Data treatment
    let { avatar_url, name, birth, degree, type_class, expertise} = req.body

    birth = Date.parse(birth)
    const create_at = Date.now()
    const id = Number(data.teachers.length + 1)

    data.teachers.push({
        id,
        avatar_url,
        name,
        birth,
        degree,
        type_class,
        expertise,
        create_at
    })

    //Recording data process
    fs.writeFile("data.json", JSON.stringify(data, null, 2), (err) => {
        if (err) return res.send('Error in writing datas.')
        
        return res.redirect(`/teachers/${id}`)
    })
}

exports.show = (req, res) => {
    //Take the teacher
    const {id} = req.params

    const foundTeacher = data.teachers.find((teacher) => {
        return teacher.id == id
    })

    if (!foundTeacher) return res.send("Teacher not found!")

    //Data treatment
    const teacher = {
        ...foundTeacher,
        age: age(foundTeacher.birth),
        graduation: graduation(foundTeacher.degree),
        expertise: transformExpertise(foundTeacher),
        create_at: new Intl.DateTimeFormat("pt-BR").format(foundTeacher.create_at),
    }

    return res.render('teachers/show', { teacher })
}

exports.edit = (req, res) => {
    //Take the teacher
    const {id} = req.params

    const foundTeacher = data.teachers.find((teacher) => {
        return teacher.id == id
    })

    if (!foundTeacher) return res.send("Teacher not found!")

    //Data treatment
    const teacher = {
        ...foundTeacher,
        birth: date(foundTeacher.birth).iso,
    }

    return res.render('teachers/edit', { teacher })
}

exports.put = (req, res) => {
    //Take the teacher
    const { id } = req.body
    let index = 0

    const foundTeacher = data.teachers.find((teacher, foundIndex) => {
        if (teacher.id == id) {
            index = foundIndex
            return true
        }
    })

    if (!foundTeacher) return res.send("Teacher not found!")

    // Data treatment
    const teacher = {
        ...foundTeacher,
        ...req.body,
        birth: Date.parse(req.body.birth),
        id: Number(req.body.id)
    }

    data.teachers[index] = teacher

    fs.writeFile('data.json', JSON.stringify(data, null, 2), (err) => {
        if (err) return res.send('Write file error!')

        return res.redirect(`/teachers/${id}`)
    })
}

exports.delete = (req, res) => {
    const { id } = req.body

    const filteredTeachers = data.teachers.filter((teacher) => {
        return teacher.id != id
    })

    data.teachers = filteredTeachers

    fs.writeFile('data.json', JSON.stringify(data, null, 2), (err) => {
        if (err) return res.send('Database error!')

        return res.redirect(`/teachers`)
    })
}