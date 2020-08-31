//Part2 of challenge - Double and sum
//1 - Callback

function doubleAndSum(number1, number2) {
  const operation = (number1 * 2) + number2
  return operation
}

function showResult(number1, number2, callback) {
  setTimeout(
    () => {
      const result = doubleAndSum(number1, number2)
      callback(result)
    }, 
    Math.floor(Math.random() * 100) + 1
  ) 
}

showResult(5, 0, (result) => {
  console.log(result)
  showResult(12, result, (result) => {
    console.log(result)
    showResult(2, result, (result) => {
      console.log(result)
      showResult(4,result, (result) => {
        console.log(result)
        showResult(51,result, (result) => {
          console.log(result)
          console.log("Finish")
        })
      })
    })
  })
})