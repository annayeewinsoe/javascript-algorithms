


function checkCashRegister(price, cash, cid) {
  let initial_cid = JSON.stringify(cid)
  let currency = {
    100: 'ONE HUNDRED',
    20: 'TWENTY',
    10: 'TEN',
    5: 'FIVE',
    1: 'ONE',
    0.25: 'QUARTER',
    0.1: 'DIME',
    0.05: 'NICKEL',
    0.01: 'PENNY'
  }

  function subFromCID(key, curr) {
    for(let item of cid) {
      if(item[0] === key) {
        item[1] -= parseFloat(curr)
        item[1] = parseFloat(item[1]).toFixed(2)
      }
    }
  }

  let currency_list = Object.keys(currency).sort((a, b) => a - b).reverse()
  
  let change_val = cash - price
  let initial_change_val = change_val
  console.log('change_val', change_val)

  function getCIDmoney(cid) {
    let cid_money = 0
    for (let money of cid) {
      cid_money += money[1]
    }
    return parseFloat(cid_money).toFixed(2)
  }

  let cid_money = getCIDmoney(cid)
  console.log('cid_money', cid_money)
  if(cid_money < change_val) {
    return { status: "INSUFFICIENT_FUNDS", change: [] }
  }
  let change_list = {}

  while(change_val >= 0.01) {
    for(let curr of currency_list) {
      if(change_val / curr >= 1) {
        // console.log(curr)
        let found;
        if(curr == 0.01) {
          found = cid[0]
        } else {
          found = cid.find((item, i) => {
            if (item[0] === currency[curr]) {
              // console.log('what is i', i)
              return i
            }
          })
        }

        // console.log('found', found)
        if(found[1] < parseFloat(curr)) {
          continue
        } else {
          if(!change_list.hasOwnProperty(currency[curr])) {
            change_list[currency[curr]] = parseFloat(curr).toFixed(2)
          } else {
            change_list[currency[curr]] = parseFloat(parseFloat(change_list[currency[curr]]) + parseFloat(curr)).toFixed(2)
          }
          change_val -= parseFloat(curr)
          change_val = parseFloat(change_val.toFixed(2))
          subFromCID(currency[curr], parseFloat(curr))
        }

        // console.log('change_list', change_list)
        // console.log('change_val', change_val)
        // console.log('\n')
        break // break curr
      }
    }
    if(cid[0][1] == 0) {
      return { status: "INSUFFICIENT_FUNDS", change: [] }
    }
  }


  let change_arr = []
  for(let pairs in change_list) {
    change_arr.push([pairs, parseFloat(change_list[pairs])])
  }
  // console.log(change_arr)
  if(initial_change_val == cid_money) {
    console.log(initial_cid)
    return { status: "CLOSED", change: JSON.parse(initial_cid)}
  }

  return { status: "OPEN", change: change_arr}
}

let result = checkCashRegister(19.5, 20, [["PENNY", 0.5], ["NICKEL", 0], ["DIME", 0], ["QUARTER", 0], ["ONE", 0], ["FIVE", 0], ["TEN", 0], ["TWENTY", 0], ["ONE HUNDRED", 0]]);

console.log(result)