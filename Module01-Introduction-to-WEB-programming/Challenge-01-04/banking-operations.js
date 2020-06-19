//Banking operations

const user = {
    name: 'Mariana',
    transactions: [],
    balance: 0
}

// Add transaction

function createTransaction(transaction) {
    user.transactions.push(transaction)

    if (transaction.type === 'credit') {
        user.balance += transaction.value
    } else if (transaction.type === 'debit') {
        user.balance -= transaction.value
    }
}

//Reports

function getHigherTransactionByType (typeTransaction) {
    let higherTransaction = 0
    let objectHigherTransaction = {}
    for (let transaction of user.transactions) {
        if (transaction.type === typeTransaction && transaction.value > higherTransaction) {
            higherTransaction = transaction.value
            objectHigherTransaction = transaction
        }
    }

    return console.log(objectHigherTransaction)
}

function getAverageTransactionValue () {
    let sumValues = 0
    
    for (let i = 0; i < user.transactions.length; i ++) {
        sumValues += user.transactions[i].value
    }

    let averageValues = sumValues / user.transactions.length
    return console.log(averageValues.toFixed(2))
}

function getTransactionsCount () {
    let numberOfCredit = 0
    let numberOfDebit  = 0
    
    for (let transaction of user.transactions) {
        if ( transaction.type === 'credit') {
            numberOfCredit ++
        } else if ( transaction.type === 'debit') {
            numberOfDebit ++
        }
    }

    let transactionsCount = { credit: numberOfCredit, debit: numberOfDebit }

    return console.log(transactionsCount)
}

// Requests

createTransaction({ type: 'credit', value: 50 })
createTransaction({ type: 'credit', value: 120 })
createTransaction({ type: 'debit', value: 80 })
createTransaction({ type: 'debit', value: 30 })

console.table(user.transactions)
console.log(`The balance of ${user.name} is ${user.balance}!`) //60

getHigherTransactionByType('credit') // { type: 'credit', value: 120 }
getHigherTransactionByType('debit')  // { type: 'debit', value: 80 }

getAverageTransactionValue() // 70

getTransactionsCount() // { credit: 2, debit: 2 }