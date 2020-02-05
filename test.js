foo = [
  {
    "a":1,
    "b":3,
    "d":4
  },
  {
    "a":2,
    "c":4
  }
]
function bar (foo) {
  console.log(Object.assign({}, ...foo))
}

bar(foo);