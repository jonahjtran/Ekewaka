/*
Each arr is an array of objects, containing information on the purchases, deposits, or Bills
Categories is a map, that is used only for the arrPurchases
Returns: A map

*/


export function handleData() {
    const amt = "amount"; //Purchases and Deposits Use Amount
    const amt2 = "payment_amount"; // Bills use payment_amount
    const purch = "merchant_id"; // Purchases use merchant_id
    const bill = "payee"; // Bills use payee

    if (!localStorage.getItem('purchases') || 
        !localStorage.getItem('bills') ||
        !localStorage.getItem('deposits') ||
        !localStorage.getItem('categories')) {
        console.warn("Missing data in localStorage!");
        return new Map(); 
    }

    const arrPurchases = JSON.parse(localStorage.getItem('purchases'));
    const arrBills = JSON.parse(localStorage.getItem('bills'));
    const arrDeposits = JSON.parse(localStorage.getItem('deposits'));
    const categories = JSON.parse(localStorage.getItem('categories'));


    let overallMap = new Map();
    for(let i = 0; i < Object.keys(arrBills).length; i++){
        let dict = arrBills[i];
        let type = dict[bill];
        if(type == "Credit Card"){
            continue;
        }
        if(!overallMap.has(type)){
            overallMap.set(type, dict[amt2]);
        }
        else{
            overallMap.set(type, overallMap.get(type) + dict[amt2]);
        }
    }
    let depositTotal = 0.0;
    for(let i = 0; i < Object.keys(arrDeposits).length; i++){
        let dict = arrDeposits[i];
        depositTotal += dict[amt];
    }

    for(let i = 0; i < Object.keys(arrPurchases).length; i++){
        let dict = arrPurchases[i];
        let type = dict[purch];
        if(type == undefined){
            let tempKey = "N/A Purchases";
            if(!overallMap.has(tempKey)){
                overallMap.set(tempKey, dict[amt]);
            }
            else{
                overallMap.set(tempKey, overallMap.get(tempKey) + dict[amt]);
            }
            continue;
        }

        let findKey2 = findKey(type, categories);
        if(findKey2 == null){
            continue;
        }
        if(!overallMap.has(findKey2)){
            overallMap.set(findKey2, dict[amt]);
        }
        else{
            overallMap.set(findKey2, overallMap.get(findKey2) + dict[amt]);
        }
    }

    // overallMap.set("Deposits", depositTotal);
    return overallMap;
}

export function sumOfList(list){
    let sum = 0.0;
    for(var i = 0; i < list.length; i++){
        sum += list[i];
    }
    let newList = []
    for(let j = 0; j < list.length; j++){
        let temp = Math.round(list[j] * 100.0);
        let temp2 = ((1.0 * temp) / 100.0) / sum;
        let temp3 = temp2.toFixed(2);
        newList.push(Math.floor(temp3 * 100));
    }
    return newList;
}


// Returns the key associated with the value
function findKey(value, categories){
    for(const key of Object.keys(categories)){
        if(categories[key].includes(value)){
            return key;
        }
    }
    return null;
}