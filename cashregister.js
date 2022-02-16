function checkCashRegister(price, cash, cid) {
  console.log("----------------------------------------")
  
  //makes a copy of the cid array
  let register = cid.slice()
  //i will modify this object, and the final result will be in here, it is set to insufficient by default
  let changeObj = {status:"INSUFFICIENT_FUNDS", change:[]};
  //i can use this instead of the money array I have there
  //this is basically used to compare against the cash in the drawer, i need to know how much to subtract by and what type it is
  let moneyUnit = {"PENNY": 0.01, "NICKEL":0.05, "DIME":0.1, "QUARTER": 0.25, "ONE": 1, "FIVE": 5, "TEN":10, "TWENTY":20, "ONE HUNDRED": 100}
  //i put them all as floats to make it easier to subtract
  let moneyArr = [["PENNY", 0.01], 
 ["NICKEL", 0.05], 
 ["DIME", 0.1], 
 ["QUARTER", 0.25], 
 ["ONE", 1.00], 
 ["FIVE", 5.00], 
 ["TEN", 10.00], 
 ["TWENTY", 20.00], 
 ["ONE HUNDRED", 100.00]]
  console.log("This is the amount of change to match: ")

  //this is the change that I need to match up with, idk why its called remainder
  let remainder = cash - price
  console.log(remainder)

  //calculates the total so I can check if I should make it closed or open
  let registerTotal = cid.reduce(function(total, curr){
    total = Math.round((parseFloat(total) + parseFloat(curr[1]))*100)/100;
    return total;
  }, 0);
  console.log("Register Total: ")
  console.log(registerTotal)
  //adds the register total to CID
  cid["Total"] = registerTotal

  //if the amount in the cash drawer is equal to the change, then do this
  if(cid["Total"] == remainder){
    changeObj.status = "CLOSED"
    changeObj.change = register
    //if I don't have enough cash in the drawer to give as change
    //then return insufficient funds
  }else if(cid["Total"] < remainder){
    changeObj.status = "INSUFFICIENT_FUNDS"
    changeObj.change = [];
    //if I do have enough cash to give as change, then find out how much change i need to give
  }else if(cid["Total"] > remainder){
    changeObj.status = "OPEN"

    //this is the total i use to compare against the remainder (change)
    let leftover = 0.0

  //cycle through the cash in drawer, and give me the change I need. start from the biggest values (hundreds, tens, 20s) and go down.
    for(let i = register.length - 1; i >= 0; i--){
      //used for testign to see how much was added in the last round
      console.log("1)Leftover Before: ")
      console.log(leftover)
      //this is the value that shows how MUCH of WHAT was taken to be given as change
      //eg, if the index is at QUARTERS, then this will keep going up by .25, THEN it will update the changeObj.change value to show how many dollars/cents were given as change.
      //eg [QUARTER, 0.5] two quarters were taken out of the cahs drawer and given out as change.
      let temp = 0.0
      //checks if there is money in each category
      if(register[i][1] - moneyArr[i][1] >= 0){
        //if the coin/dollar type is less than the change owed, then execute the code underneath
        //eg, if remainder is 50 cents, then the highest type to use would be quarter
        if(moneyArr[i][1] < remainder && leftover < remainder){
          //so by now we should loop through the category (quarter, penny, whatever)
          //and then we should exhaust as many as possible before running out
          for(let j = leftover; j < remainder && register[i][1] >= moneyArr[i][1]; j+=moneyArr[i][1]){
            //keep on adding until it reaches the amount required for the remainder...?
            temp += moneyArr[i][1]
            //so this is just for testing, it is not the end result
            register[i][1] = register[i][1] - moneyArr[i][1]
            //keep on adding until it equals remainder, OR, if there is no money left to take from each category
            leftover += moneyArr[i][1]
            console.log("Temp: ")
            console.log(temp)
            //if it somehow goes over the remainder, then just subtract it by itself by one.
            if(leftover > remainder){
              leftover -= moneyArr[i][1]
              temp -= moneyArr[i][1]
            }
          }
          //this should show how much change was given out, and of which type
          changeObj.change.push([moneyArr[i][0], temp])
        }
        
      }
      console.log("2)Leftover After: ")
      console.log(leftover)
      //shows how much is left in the register. its unnecssary to know but also a bit helpful as a reference
      console.log("3)Register [i]")
      console.log(register[i])
      //breaks the array if the correct amount has been found
      if(leftover == remainder){
        i = -1
      }else if(leftover > remainder){
        i = -1
      }
    }
  }

  console.log("Change to give: ")
  console.log(changeObj)

  return changeObj;
}

checkCashRegister(19.5, 20,
 [["PENNY", 1.01], 
 ["NICKEL", 2.05], 
 ["DIME", 3.1], 
 ["QUARTER", 4.25], 
 ["ONE", 90], 
 ["FIVE", 55], 
 ["TEN", 20], 
 ["TWENTY", 60], 
 ["ONE HUNDRED", 100]]);
