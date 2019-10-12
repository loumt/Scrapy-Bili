function test(){

  let date = new Date(1568436060000)


  handler1()


  console.log("+++++++++++++++++++++")


  handler2()

}

function handler1(){
  console.log("***************")
  console.log("***************")
  console.log("***************")
  console.log("***************")
  return console.log("111111")
  console.log("***************")
  console.log("***************")
}


function handler2(){
  console.log("***************")
  console.log("***************")
  console.log("***************")
  console.log("***************")
  return console.log("22222")
  console.log("***************")
  console.log("***************")
}


test()




let  arr1 = [1,2,3,4,5]


console.log(arr1.shift())
console.log(arr1.shift())
console.log(arr1.shift())
console.log(arr1.shift())
console.log(arr1.shift())
console.log(arr1.shift())

console.log(Boolean.of(null))
console.log(Boolean.of(1))