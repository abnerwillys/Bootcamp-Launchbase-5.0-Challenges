// Search for technology

const users = [
    { name: 'Carlos', technologies: ['HTML', 'CSS' ] },
    { name: 'Jasmine', technologies: ['JavaScript', 'CSS' ] },
    { name: 'Tuane', technologies: ['HTML', 'Node.js' ] }
]

function checkIfUserWorkCSS(user) {
    for (let technology of user.technologies) {
        if (technology == 'CSS') return true      
    }
    
    return false
}

for (let i = 0; i < users.length; i++) {
    const userWorkWithCSS = checkIfUserWorkCSS(users[i])

    if (userWorkWithCSS) {
        console.log(`The user ${users[i].name} works with CSS.`)
    }
}