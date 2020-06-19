// Construction and priting of objects

const enterprise = {
    property: "Diego Fernandes",
    company: {
        name: "Rocketseat",
        color: "Purple",
        focus: "Development",
        address: {
            street: "Guilherme Gembala",
            number: 260
        }    
    }
}

console.log(`
    The company ${enterprise.company.name} is located at ${enterprise.company.address.number} 
    ${enterprise.company.address.street} street.
    `)

console.log(`
    ${enterprise.company.name} is a company that teaches ${enterprise.company.focus} 
    and has in your flag the color ${enterprise.company.color}. 
    Your CEO is ${enterprise.property} who looks like Michel Teló. His twin brother is called Filipe Dechamps.
    `)