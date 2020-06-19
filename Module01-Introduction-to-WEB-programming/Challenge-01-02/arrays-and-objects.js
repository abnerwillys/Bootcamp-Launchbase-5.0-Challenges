// Array and Objects

const developers = [
    {
        name: "Carlos",
        age: 32,
        technology: [
            { name: "C++", specialty: "Games" },
            { name: "Python", specialty: "Data Science" },
            { name: "JavaScript", specialty: "Web/Mobile" },
        ]
    },
    {
        name: "Abner",
        age: 25,
        technology: [
            { name: "Kotlin", specialty: "Mobile" },
            { name: "JavaScript", specialty: "Web/Mobile" }
        ]
    }
]

console.log(`
    The developer ${developers[0].name} is ${developers[0].age} years old and works with 
    technology ${developers[0].technology[0].name} with specialty in ${developers[0].technology[0].specialty}.
    `)

console.log(`
    The developer ${developers[1].name} is ${developers[1].age} years old and study 
    ${developers[1].technology[1].name} with specialty in ${developers[1].technology[1].specialty}.
    `)