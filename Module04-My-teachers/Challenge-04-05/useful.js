module.exports = {
    age: function(timestamp) {
        const today = new Date()
        const birthDate = new Date(timestamp)

        let age = today.getFullYear() - birthDate.getFullYear()
        const month = today.getMonth() - birthDate.getMonth()

        if (month < 0 || month == 0 
            && today.getDate() < birthDate.getDate()) {
            age = age - 1
        }

        return age
    },
    graduation: function(graduation) {
        
        const levelEducation = {
            Hs: "High School",
            Cl: "Associate's Degree",
            Un: "Bachelor's Degree",
            Ma: "Master's",
            PHD: "Doctorate"
        }

        const keys = Object.keys(levelEducation)

        for (key of keys) {
            if (key == graduation) return levelEducation[key]
        }
                
        return "Graduation  not Found!"
    },
    date: function(timestamp) {
        const date = new Date(timestamp)

        const year  = date.getUTCFullYear()
        const month = `0${date.getUTCMonth() + 1}`.slice(-2)
        const day   = `0${date.getUTCDate()}`.slice(-2)

        return `${year}-${month}-${day}`
    }
}