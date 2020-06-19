// Retirement calculation

const name         = "Silvana"
const gender         = "F"
const age        = 48
const contribution = 23

const rule = age + contribution

if (gender === "F") {
    if (contribution >= 30 && rule >= 85) {
        console.log(`${name}, you can retire!`)
    } else {
        console.log(`${name}, you still can not retire!`)
    }
} else {
    if (contribution >= 35 && rule >= 95) {
        console.log(`${name}, you can retire!`)
    } else {
        console.log(`${name}, you still can not retire!`)
    }
}