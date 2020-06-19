// Sum of expenses and revenues

const users = [
    {
        name: 'Salvio',
        revenues: [ 115.3, 48.7, 98.3, 14.5 ],
        expenses: [ 85.3, 13.5, 19.9 ]
    },
    {
        name: 'Marcio',
        revenues: [ 24.6, 214.3, 45.3 ],
        expenses: [ 185.3, 12.1, 120.0 ]
    },
    {
        name: 'Lucia',
        revenues: [ 9.8, 120.3, 340.2, 45.3 ],
        expenses: [ 450.2, 29.9 ]
    }
]

function calculateBalance(revenues, expenses) {
    const sumRevenues = sumNumbers(revenues)
    const sumExpenses = sumNumbers(expenses)
    const balance = sumRevenues - sumExpenses

    return balance
}

function sumNumbers(numbers) {
    let sumNumbers = 0
    for (let number of numbers) {
        sumNumbers += number
    }

    return sumNumbers
}

for (let i = 0; i < users.length; i++) {
    let balanceUser = calculateBalance(users[i].revenues, users[i].expenses)
    let statusBalance = ""

    if (balanceUser < 0) {
        statusBalance = 'NEGATIVE'
    } else {
        statusBalance = 'POSITIVE'
    }

    console.log(`${users[i].name} has a balance ${statusBalance} of ${balanceUser.toFixed(2)}.`)
}