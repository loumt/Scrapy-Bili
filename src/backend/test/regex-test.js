

console.log(/^\d{1,15}$/.test("1"))
console.log(/^\d{1,15}$/.test("167"))
console.log(/^\d{1,15}$/.test("167643"))
console.log(/^\d{1,15}$/.test("167643614123"))
console.log(/^\d{1,16}$/.test("1676436141231321"))

console.log(/^\d{1,9}$/.test("是的"))
console.log(/^\d{1,9}$/.test("a"))
console.log(/^\d{1,9}$/.test("1a"))
console.log(/^\d{1,9}$/.test("16764361a"))
console.log(/^\d{1,9}$/.test("16764361a"))
console.log(/^\d{1,9}$/.test("a6764361a"))
console.log(/^\d{1,9}$/.test("a6764361123"))
console.log(/^\d{1,9}$/.test("6764a4361123"))