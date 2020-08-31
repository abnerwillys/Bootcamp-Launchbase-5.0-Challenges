// Parte 2 of challenge
// Promise
function printDoubleAndSum(number1, number2) {
  return new Promise(resolve => {
    setTimeout(
      () => {
        resolve((number1 * 2) + number2)
      }, 
      Math.floor(Math.random() * 100) + 1
    ) 
  })
}

async function printAll(){
  let result
  result = await printDoubleAndSum(5, 0)
  console.log(result)
  result = await printDoubleAndSum(12, result)
  console.log(result)
  result = await printDoubleAndSum(2, result)
  console.log(result)
  result = await printDoubleAndSum(4, result)
  console.log(result)
  result = await printDoubleAndSum(51, result)
  console.log(result)
}

printAll() 