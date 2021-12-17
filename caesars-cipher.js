function rot13(str) {
  let letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.repeat(2)

  let output = ''
  for(let each of str) {
    if(letters.indexOf(each) >= 0) {
      output += letters[letters.indexOf(each, 26) - 13]
      console.log(each, letters[letters.indexOf(each, 26) - 13])
    } else {
      output += each
    }
  }

  return output
}

rot13("SERR CVMMN!");