function palindrome(str) {
  str = str.replace(/[^a-zA-Z0-9]/g, '')
  let arr1 = str.split('')
  let arr2 = str.split('').reverse()
  
  function compareArr(arr1, arr2) {
    for(let i=0; i<arr1.length; i++) {
      if(arr1[i].toLowerCase() !== arr2[i].toLowerCase()) {
        return false
      }
    }
    return true
  }

  return (compareArr(arr1, arr2))
}

let result = palindrome("1 eye for of 1 eye.");
console.log(result)