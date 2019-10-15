const userAgent =require('./../lib/UserAgent')

// for(let i=0;i<1000 ; i++){
//   console.log(userAgent())
// }

let now = new Date();

console.log(now)
console.log(now.getTime())
console.log(now.getMilliseconds())
console.log(new Date(now.getTime() + 90 * 1000))


