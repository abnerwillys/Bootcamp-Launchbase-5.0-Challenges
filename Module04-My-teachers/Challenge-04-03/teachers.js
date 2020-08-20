const fs   = require('fs')
const data = require('./data.json')

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
        
        return res.redirect('/teachers')
    })

    // return res.send(req.body)
}