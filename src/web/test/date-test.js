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