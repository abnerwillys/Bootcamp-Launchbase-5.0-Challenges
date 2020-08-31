//Part1 of challenge - Double
//2 - Promise

function printDoubleOf(number) {
  return new Promise(resolve => {
    setTimeout(
      () => {
        resolve(console.log(number * 2))
      }, 
      Math.floor(Math.random() * 100) + 1
    ) 
  })
}

async function printAll(){
  await printDoubleOf(1)
  await printDoubleOf(2)
  await printDoubleOf(3)
  await printDoubleOf(4)
  await printDoubleOf(5)
}

printAll()