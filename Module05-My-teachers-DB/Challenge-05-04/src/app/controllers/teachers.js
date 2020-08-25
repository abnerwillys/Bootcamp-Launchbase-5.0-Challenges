const { transformExpertise, age, date, graduation } = require('../../lib/useful')
const Teacher = require('../models/Teacher')

module.exports = {
  index(req, res) {
    let { filter, page, limit } = req.query

    page  = page  || 1
    limit = limit || 2
    let offset = limit * (page - 1)

    const params = {
      filter,
      page,
      limit,
      offset,
      callback(teachers) {
        try {
          teachers.forEach(teacher => {
            teacher.expertise = transformExpertise(teacher)
          })
  
          const pagination = {
            totalPages: Math.ceil(teachers[0].total / limit),
            page
          }
  
          return res.render("teachers/index", { teachers, pagination, filter })

        } catch (error) {
          const messageErrorFilter = "Not found any register!"

          if (error) {
            console.log(error)
            return res.render("teachers/index", { messageErrorFilter })
          }
        }
      }
    }

    Teacher.paginate(params)
  },
  create(req, res) {
    return res.render("teachers/create")
  },
  post(req, res) {
    const keys = Object.keys(req.body)

    for (key of keys) {
      if (req.body[key] == "") return res.send('Please, fill all fields!')
    }
    
    Teacher.create(req.body, (teacher) => {
      return res.redirect(`teachers/${teacher.id}`)
    })
  },
  show(req, res) {
    Teacher.find(req.params.id, (teacher) => {
      if(!teacher) return res.send('Teacher not found!')

      teacher.age = age(teacher.birth)
      teacher.expertise  = transformExpertise(teacher)
      teacher.graduation = graduation(teacher.graduation)
      teacher.created_at = date(teacher.created_at).format

      return res.render('teachers/show', {teacher})
    })
  },
  edit(req, res) {
    Teacher.find(req.params.id, (teacher) => {
      if(!teacher) return res.send('Teacher not found!')

      teacher.birth = date(teacher.birth).iso

      return res.render(`teachers/edit`, {teacher})
    })
  },
  put(req, res) {
    const keys = Object.keys(req.body)

    for (key of keys) {
        if (req.body[key] == "") return res.send('Please, fill all fields!')
    }

    Teacher.update(req.body, () => {
      return res.redirect(`teachers/${req.body.id}`)
    })
  },
  delete(req, res) {
    Teacher.delete(req.body.id, () => {
      return res.redirect('/teachers')
    })
  },
}