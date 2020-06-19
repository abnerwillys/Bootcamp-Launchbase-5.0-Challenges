// BMI calculation

const name   = "Carlos"
const weight = 84
const height = 1.88

const BMI    = weight / (height * height)

if (BMI >= 30) {
    console.log(`Carlos your BMI is ${BMI} and you are overweight!`)
} else {
    console.log(`Carlos your BMI is ${BMI} and you aren't overweight!`)
}