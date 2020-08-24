const db = require('../../config/db')
const { date } = require('../../lib/useful')

module.exports = {
  all(callback) {
    const query = `
      SELECT teachers.*, count(students) AS total_students
      FROM teachers
      LEFT JOIN students ON (students.teacher_id = teachers.id)
      GROUP BY teachers.id
      ORDER BY total_students DESC
    `

    db.query(query, (err, results) => {
      if(err) throw `Database Error! ${err}`

      callback(results.rows)
    })
  },
  create(data, callback) {
    const query = `
      INSERT INTO teachers (
        avatar_url,
        name,
        birth,
        graduation,
        class_type,
        expertise,
        created_at
      ) VALUES ($1, $2, $3, $4, $5, $6, $7)
      RETURNING id
    `

    const values = [
      data.avatar_url,
      data.name,
      date(data.birth).iso,
      data.graduation,
      data.class_type,
      data.expertise,
      date(Date.now()).iso
    ]

    db.query(query, values, (err, results) => {
      if(err) throw `Database Error! ${err}`

      callback(results.rows[0])
    })
  },
  find(id, callback) {
    const query = `
      SELECT * 
      FROM teachers
      WHERE id = $1
    `

    db.query(query, [id], (err, results) => {
      if(err) throw `Database Error! ${err}`

      callback(results.rows[0])
    })
  },
  findBy(filter, callback) {
    const query = `
      SELECT teachers.*, count(students) AS total_students
      FROM teachers
      LEFT JOIN students ON (students.teacher_id = teachers.id)
      WHERE teachers.name ILIKE '%${filter}%'
      OR teachers.expertise ILIKE '%${filter}%'
      GROUP BY teachers.id
      ORDER BY total_students DESC
    `

    db.query(query, (err, results) => {
      if(err) throw `Database Error! ${err}`

      callback(results.rows)
    })
  },
  update(data, callback) {
    const query = `
      UPDATE teachers SET
        avatar_url=($1),
        name=($2),
        birth=($3),
        graduation=($4),
        class_type=($5),
        expertise=($6)
      WHERE id = $7
    `

    const values = [
      data.avatar_url,
      data.name,
      date(data.birth).iso,
      data.graduation,
      data.class_type,
      data.expertise,
      data.id
    ]

    db.query(query, values, (err, results) => {
      if(err) throw `Database Error! ${err}`

      callback()
    })
  },
  delete(id, callback) {
    const query = `DELETE FROM teachers WHERE id = $1`

    db.query(query, [id], function(err, results) {
      if(err) throw `Database Error! ${err}`

      callback()
    })
  },
}