function telephoneCheck(str) {
  let numbers = str.match(/\d/g)

  if(numbers.length >= 10) {
    if (str.indexOf('(') >= 0) {
      if(str.indexOf(')') === -1) return false
    }
    if (str.indexOf(')') >= 0) {
      if (str.indexOf('(') === -1) return false
    }

    let regex = /^1?\s?\(?\d{3}\)?[-\s]?\d{3}[-\s]?\d{4}$/
    return regex.test(str)
  } else {
    return false
  }
}

let result = telephoneCheck("1 555)555-5555");
console.log(result)