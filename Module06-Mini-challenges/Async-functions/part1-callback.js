//Part1 of challenge - Double
//1 - Callback

function getDouble(number) {
  console.log(number * 2)
}

function showResult(number, callback) {
  setTimeout(
    () => {
      getDouble(number)
      callback()
    }, 
    Math.floor(Math.random() * 100) + 1
  ) 
}

showResult(1, () => {
  showResult(2, () => {
    showResult(3, () => {
      showResult(4, () => {
        showResult(5, () => {
          console.log("Finish")
        })
      })
    })
  })
})